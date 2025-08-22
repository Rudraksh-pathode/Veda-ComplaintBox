'use server';

import { z } from 'zod';
import type { Complaint } from '@/lib/types';
import { summarizeComplaints } from '@/ai/flows/summarize-complaints';

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

    // Create a simple summary from the complaint text
    const summary = complaintText.split(' ').slice(0, 10).join(' ') + '...';

    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      name: 'Anonymous',
      text: complaintText,
      category: category,
      summary: summary,
      timestamp: new Date(),
    };
    return { data: newComplaint, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to submit complaint. Please try again later.' };
  }
}

export async function summarizeComplaintsAction(complaints: Complaint[]): Promise<{ data: string | null; error: string | null }> {
  if (complaints.length === 0) {
    return { data: 'There are no complaints to analyze.', error: null };
  }
  
  try {
    const complaintTexts = complaints.map(c => `[${c.category}] ${c.text}`);
    const { summary } = await summarizeComplaints({ complaintTexts });
    return { data: summary, error: null };
  } catch (error) {
    console.error('Error summarizing complaints:', error);
    return { data: null, error: 'Failed to generate AI summary. Please try again later.' };
  }
}
