'use server';

import { z } from 'zod';
import { categorizeComplaint } from '@/ai/flows/categorize-complaint';
import { suggestSolutions } from '@/ai/flows/suggest-solutions';
import type { Complaint, ComplaintCategory } from '@/lib/types';

const complaintSchema = z.object({
  complaintText: z.string().min(10, 'Complaint must be at least 10 characters long.'),
});

export async function submitComplaintAction(prevState: any, formData: FormData) {
  const validatedFields = complaintSchema.safeParse({
    complaintText: formData.get('complaintText'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await categorizeComplaint({ complaintText: validatedFields.data.complaintText });
    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      name: 'Anonymous', // Submitted complaints are anonymous
      text: validatedFields.data.complaintText,
      // The AI model can sometimes return values outside the defined enum, so we cast and handle it gracefully on the frontend.
      category: result.category as ComplaintCategory,
      summary: result.summary,
      timestamp: new Date(),
    };
    return { data: newComplaint };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process complaint. Please try again.' };
  }
}

export async function suggestSolutionsAction(complaints: Complaint[]): Promise<{ data: string | null; error: string | null }> {
  if (complaints.length === 0) {
    return { data: "No complaints have been submitted yet. There's nothing to analyze.", error: null };
  }

  const complaintSummary = complaints.map((c) => `- ${c.summary}`).join('\n');

  try {
    const result = await suggestSolutions({ complaintSummary });
    return { data: result.suggestedSolutions, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to generate solutions. Please try again.' };
  }
}
