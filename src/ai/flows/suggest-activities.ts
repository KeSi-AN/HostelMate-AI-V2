'use server';

/**
 * @fileOverview Suggests common activities for roommates based on their profiles.
 *
 * - suggestActivities - A function that suggests activities for roommates.
 * - SuggestActivitiesInput - The input type for the suggestActivities function.
 * - SuggestActivitiesOutput - The return type for the suggestActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActivitiesInputSchema = z.object({
  user1Profile: z
    .string()
    .describe('The profile of the first user, containing their interests and preferences.'),
  user2Profile: z
    .string()
    .describe('The profile of the second user, containing their interests and preferences.'),
});
export type SuggestActivitiesInput = z.infer<typeof SuggestActivitiesInputSchema>;

const SuggestActivitiesOutputSchema = z.object({
  suggestedActivities: z
    .string()
    .describe('A list of suggested activities that both roommates might enjoy.'),
});
export type SuggestActivitiesOutput = z.infer<typeof SuggestActivitiesOutputSchema>;

export async function suggestActivities(input: SuggestActivitiesInput): Promise<SuggestActivitiesOutput> {
  return suggestActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActivitiesPrompt',
  input: {schema: SuggestActivitiesInputSchema},
  output: {schema: SuggestActivitiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest common activities for college roommates to foster bonding and a more enjoyable living experience.

  Based on the two roommate profiles provided, suggest a list of activities they can do together.

  Profile 1: {{{user1Profile}}}
  Profile 2: {{{user2Profile}}}

  Consider their interests, preferences, and lifestyles to identify activities that both roommates are likely to enjoy. Suggest specific activities, rather than something generic.

  Output a string describing a numbered list of activities, preceded by the text "Suggested Activities:".`,
});

const suggestActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestActivitiesFlow',
    inputSchema: SuggestActivitiesInputSchema,
    outputSchema: SuggestActivitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
