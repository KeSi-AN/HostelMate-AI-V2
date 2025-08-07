'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating profile descriptions based on user-provided keywords.
 *
 * The flow takes keywords about the user and their ideal roommate as input, and generates a compelling profile description.
 * - generateProfileDescription - A function that handles the profile description generation process.
 * - GenerateProfileDescriptionInput - The input type for the generateProfileDescription function.
 * - GenerateProfileDescriptionOutput - The return type for the generateProfileDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileDescriptionInputSchema = z.object({
  aboutMeKeywords: z
    .string()
    .describe('Keywords describing the user, their personality, interests, hobbies, and lifestyle.'),
  idealRoommateKeywords: z
    .string()
    .describe('Keywords describing the user\'s ideal roommate.'),
});
export type GenerateProfileDescriptionInput = z.infer<typeof GenerateProfileDescriptionInputSchema>;

const GenerateProfileDescriptionOutputSchema = z.object({
  aboutMeDescription: z
    .string()
    .describe('A compelling profile description generated from the user\'s keywords.'),
  idealRoommateDescription: z
    .string()
    .describe('A description of the user\'s ideal roommate, generated from the user\'s keywords.'),
});
export type GenerateProfileDescriptionOutput = z.infer<typeof GenerateProfileDescriptionOutputSchema>;

export async function generateProfileDescription(
  input: GenerateProfileDescriptionInput
): Promise<GenerateProfileDescriptionOutput> {
  return generateProfileDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfileDescriptionPrompt',
  input: {schema: GenerateProfileDescriptionInputSchema},
  output: {schema: GenerateProfileDescriptionOutputSchema},
  prompt: `You are an AI assistant designed to help students create compelling profile descriptions for a roommate matching application.

  Given a set of keywords about the user and their ideal roommate, generate two descriptions:
  1.  A description of the user, highlighting their personality, interests, hobbies, and lifestyle.
  2.  A description of the user\'s ideal roommate, focusing on the qualities and characteristics they are looking for.

  Use a friendly, engaging, and concise tone.
  Limit each description to 500 characters.

  User Keywords: {{{aboutMeKeywords}}}
  Ideal Roommate Keywords: {{{idealRoommateKeywords}}}
  Output:
  {
    "aboutMeDescription": "",
    "idealRoommateDescription": ""
  }
`,
});

const generateProfileDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProfileDescriptionFlow',
    inputSchema: GenerateProfileDescriptionInputSchema,
    outputSchema: GenerateProfileDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
