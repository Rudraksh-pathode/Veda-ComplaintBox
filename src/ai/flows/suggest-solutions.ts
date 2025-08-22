'use server';

/**
 * @fileOverview AI-powered solution suggestion based on complaint summaries.
 *
 * - suggestSolutions - A function that suggests solutions based on summarized complaints.
 * - SuggestSolutionsInput - The input type for the suggestSolutions function.
 * - SuggestSolutionsOutput - The return type for the suggestSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSolutionsInputSchema = z.object({
  complaintSummary: z
    .string()
    .describe('A summary of the complaints received.'),
});
export type SuggestSolutionsInput = z.infer<typeof SuggestSolutionsInputSchema>;

const SuggestSolutionsOutputSchema = z.object({
  suggestedSolutions: z
    .string()
    .describe('A list of suggested solutions to address the complaints.'),
});
export type SuggestSolutionsOutput = z.infer<typeof SuggestSolutionsOutputSchema>;

export async function suggestSolutions(input: SuggestSolutionsInput): Promise<SuggestSolutionsOutput> {
  return suggestSolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSolutionsPrompt',
  input: {schema: SuggestSolutionsInputSchema},
  output: {schema: SuggestSolutionsOutputSchema},
  prompt: `You are an AI assistant designed to provide solutions to user complaints.

  Based on the following summary of complaints, suggest a list of potential solutions that an administrator could implement.

  Complaint Summary: {{{complaintSummary}}}

  Solutions:`,
});

const suggestSolutionsFlow = ai.defineFlow(
  {
    name: 'suggestSolutionsFlow',
    inputSchema: SuggestSolutionsInputSchema,
    outputSchema: SuggestSolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
