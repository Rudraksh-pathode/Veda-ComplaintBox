'use server';

/**
 * @fileOverview Summarizes a collection of complaints into a single report.
 *
 * - summarizeComplaints - A function that handles the complaint summarization process.
 * - SummarizeComplaintsInput - The input type for the summarizeComplaints function.
 * - SummarizeComplaintsOutput - The return type for the summarizeComplaints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeComplaintsInputSchema = z.object({
  complaintTexts: z.array(z.string()).describe('A list of complaint texts to summarize.'),
});
export type SummarizeComplaintsInput = z.infer<typeof SummarizeComplaintsInputSchema>;

const SummarizeComplaintsOutputSchema = z.object({
  summary: z.string().describe('A comprehensive summary of all the provided complaints.'),
});
export type SummarizeComplaintsOutput = z.infer<typeof SummarizeComplaintsOutputSchema>;

export async function summarizeComplaints(input: SummarizeComplaintsInput): Promise<SummarizeComplaintsOutput> {
  return summarizeComplaintsFlow(input);
}

const summarizeComplaintsPrompt = ai.definePrompt({
  name: 'summarizeComplaintsPrompt',
  input: {schema: SummarizeComplaintsInputSchema},
  output: {schema: SummarizeComplaintsOutputSchema},
  prompt: `You are an AI assistant for a university administrator. Your task is to analyze a list of student complaints and provide a clear, structured summary.

  Based on the following complaints, identify the key themes, group similar issues, and provide a high-level overview. Start with a general summary, then break down the main categories of complaints with specific examples.

  Complaints:
  {{#each complaintTexts}}
  - {{{this}}}
  {{/each}}
  
  Please generate a summary that is easy to read and action-oriented.
  `,
});

const summarizeComplaintsFlow = ai.defineFlow(
  {
    name: 'summarizeComplaintsFlow',
    inputSchema: SummarizeComplaintsInputSchema,
    outputSchema: SummarizeComplaintsOutputSchema,
  },
  async input => {
    const {output} = await summarizeComplaintsPrompt(input);
    return output!;
  }
);
