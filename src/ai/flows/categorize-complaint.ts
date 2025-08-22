'use server';

/**
 * @fileOverview An AI agent for categorizing complaints.
 *
 * - categorizeComplaint - A function that categorizes the complaint based on keywords and content.
 * - CategorizeComplaintInput - The input type for the categorizeComplaint function.
 * - CategorizeComplaintOutput - The return type for the categorizeComplaint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeComplaintInputSchema = z.object({
  complaintText: z.string().describe('The text content of the complaint.'),
});
export type CategorizeComplaintInput = z.infer<typeof CategorizeComplaintInputSchema>;

const CategorizeComplaintOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the complaint, chosen from: Infrastructure, Harassment, Academics, Ragging, Other.'
    ),
  summary: z.string().describe('A short summary of the complaint.'),
});
export type CategorizeComplaintOutput = z.infer<typeof CategorizeComplaintOutputSchema>;

export async function categorizeComplaint(input: CategorizeComplaintInput): Promise<CategorizeComplaintOutput> {
  return categorizeComplaintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeComplaintPrompt',
  input: {schema: CategorizeComplaintInputSchema},
  output: {schema: CategorizeComplaintOutputSchema},
  prompt: `You are an AI assistant that categorizes user complaints.

  Given the following complaint text, determine the most appropriate category and provide a short summary.

  The available categories are: Infrastructure, Harassment, Academics, Ragging, Other.

  Complaint Text: {{{complaintText}}}
  `,
});

const categorizeComplaintFlow = ai.defineFlow(
  {
    name: 'categorizeComplaintFlow',
    inputSchema: CategorizeComplaintInputSchema,
    outputSchema: CategorizeComplaintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
