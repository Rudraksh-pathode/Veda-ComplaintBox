'use server';

/**
 * @fileOverview Summarizes a complaint using AI to quickly understand the main issues.
 *
 * - summarizeComplaint - A function that handles the complaint summarization process.
 * - SummarizeComplaintInput - The input type for the summarizeComplaint function.
 * - SummarizeComplaintOutput - The return type for the summarizeComplaint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeComplaintInputSchema = z.object({
  complaintText: z.string().describe('The text of the complaint to summarize.'),
});
export type SummarizeComplaintInput = z.infer<typeof SummarizeComplaintInputSchema>;

const SummarizeComplaintOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the complaint.'),
});
export type SummarizeComplaintOutput = z.infer<typeof SummarizeComplaintOutputSchema>;

export async function summarizeComplaint(input: SummarizeComplaintInput): Promise<SummarizeComplaintOutput> {
  return summarizeComplaintFlow(input);
}

const summarizeComplaintPrompt = ai.definePrompt({
  name: 'summarizeComplaintPrompt',
  input: {schema: SummarizeComplaintInputSchema},
  output: {schema: SummarizeComplaintOutputSchema},
  prompt: `Summarize the following complaint in a concise manner:

Complaint: {{{complaintText}}}`,
});

const summarizeComplaintFlow = ai.defineFlow(
  {
    name: 'summarizeComplaintFlow',
    inputSchema: SummarizeComplaintInputSchema,
    outputSchema: SummarizeComplaintOutputSchema,
  },
  async input => {
    const {output} = await summarizeComplaintPrompt(input);
    return output!;
  }
);
