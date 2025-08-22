'use server';

import { z } from 'zod';
import type { Complaint, ComplaintCategory } from '@/lib/types';
import { categorizeComplaint } from '@/ai/flows/categorize-complaint';
import { suggestSolutions } from '@/ai/flows/suggest-solutions';

const complaintSchema = z.object({
  complaintText: z.string().min(10, 'Complaint must be at least 10 characters long.'),
  category: z.enum(["Infrastructure", "Harassment", "Academics", "Ragging", "Other"]),
});

export async function submitComplaintAction(prevState: any, formData: FormData) {
  const validatedFields = complaintSchema.safeParse({
    complaintText: formData.get('complaintText'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const complaintText = validatedFields.data.complaintText;
    const category = validatedFields.data.category;

    // Call the AI to categorize and summarize the complaint.
    const aiResponse = await categorizeComplaint({ complaintText });

    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      name: 'Anonymous',
      text: complaintText,
      // Use the AI-determined category, or fallback to user's selection
      category: aiResponse.category as ComplaintCategory || category,
      summary: aiResponse.summary,
      timestamp: new Date(),
    };
    return { data: newComplaint };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process complaint with AI. Please try again later.' };
  }
}

export async function suggestSolutionsAction(complaints: Complaint[]): Promise<{ data: string | null; error: string | null }> {
  if (complaints.length === 0) {
    return { data: 'There are no complaints to analyze.', error: null };
  }
  
  try {
    const complaintSummary = complaints.map(c => `- ${c.summary}`).join('\n');
    const { suggestedSolutions } = await suggestSolutions({ complaintSummary });
    return { data: suggestedSolutions, error: null };
  } catch (error) {
    console.error('Error suggesting solutions:', error);
    return { data: null, error: 'Failed to generate AI suggestions. Please try again later.' };
  }
}
