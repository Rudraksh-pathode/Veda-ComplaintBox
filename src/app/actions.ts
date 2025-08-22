'use server';

import { z } from 'zod';
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
    // AI features are disabled. Defaulting category to 'Other' and using truncated text as summary.
    const complaintText = validatedFields.data.complaintText;
    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      name: 'Anonymous',
      text: complaintText,
      category: 'Other',
      summary: complaintText.length > 50 ? complaintText.substring(0, 47) + '...' : complaintText,
      timestamp: new Date(),
    };
    return { data: newComplaint };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to submit complaint. Please try again later.' };
  }
}

export async function suggestSolutionsAction(complaints: Complaint[]): Promise<{ data: string | null; error: string | null }> {
    return { data: "AI-powered suggestions are currently disabled.", error: null };
}
