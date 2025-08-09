
'use server';

/**
 * @fileOverview A comprehensive roommate matching algorithm for HostelMate AI.
 * This file defines a Genkit flow that calculates a compatibility score and generates
 * a qualitative match analysis for any two given user profiles.
 *
 * - matchProfiles - The main function to initiate the matching process.
 * - MatchProfilesInput - The input type, containing two user profiles.
 * - MatchProfilesOutput - The output type, containing the compatibility score and analysis.
 */

import { ai } from '@/ai/genkit';
import { UserProfile } from '@/lib/types';
import { z } from 'zod';

// Zod schema for the UserProfile, making nested objects and their properties optional
const UserProfileSchema = z.object({
    uid: z.string(),
    dailyRoutine: z.object({
        wakeUp: z.string().nullable().optional(),
        sleep: z.string().nullable().optional(),
    }).optional().default({}),
    studyPreferences: z.object({
        location: z.string().nullable().optional(),
        style: z.string().nullable().optional(),
    }).optional().default({}),
    lifestyle: z.object({
        cleanliness: z.string().nullable().optional(),
        visitors: z.string().nullable().optional(),
    }).optional().default({}),
    socialActivities: z.object({
        sports: z.string().nullable().optional(),
        weekend: z.string().nullable().optional(),
    }).optional().default({}),
    aboutYourself: z.string().optional().default(''),
    idealRoommate: z.string().optional().default(''),
    matchingPriority: z.array(z.string()).optional().default([]),
});

// Zod schema for the flow's input
const MatchProfilesInputSchema = z.object({
    userA: UserProfileSchema,
    userB: UserProfileSchema,
});
export type MatchProfilesInput = z.infer<typeof MatchProfilesInputSchema>;

// Zod schema for the flow's output
const MatchProfilesOutputSchema = z.object({
    compatibilityScore: z.number().describe('The final combined compatibility score, from 0 to 100.'),
    matchAnalysis: z.string().describe('A human-readable summary of the match, highlighting strengths and potential conflicts.'),
    structuredScore: z.number().describe('The score from structured data comparison, out of 50.'),
    semanticScore: z.number().describe('The score from AI-powered semantic analysis, out of 50.'),
    strengths: z.array(z.string()).describe('List of categories where users are highly compatible.'),
    conflicts: z.array(z.string()).describe('List of categories where users may have conflicts.'),
    aiStrengths: z.array(z.string()).describe("A list of positive compatibility points based on their text descriptions."),
    aiConflicts: z.array(z.string()).describe("A list of potential conflicts or discussion points based on their text descriptions."),
});
export type MatchProfilesOutput = z.infer<typeof MatchProfilesOutputSchema>;


// Main exported function to be called from the application
export async function matchProfiles(input: { userA: UserProfile, userB: UserProfile }): Promise<MatchProfilesOutput> {
    const validatedInput = MatchProfilesInputSchema.parse(input);
    return matchProfilesFlow(validatedInput);
}


// Structured Data Scoring Logic (adapted from provided reference)
const ordinalMap = {
    // Daily Routine
    '5-6 AM': 1, '6-7 AM': 2, '7-8 AM': 3, 'After 8 AM': 4,
    'Before 10 PM': 1, '10-11 PM': 2, '11-12 AM': 3, 'After 12 AM': 4,
    // Lifestyle
    'Very Tidy': 1, 'Moderate': 2, 'Relaxed': 3,
};

const scoreField = (valA: string | null, valB: string | null, isOrdinal: boolean): number => {
    if (valA === null || valB === null || valA === "Doesn't Matter" || valB === "Doesn't Matter") return 0.5; // Neutral score for missing/indifferent answers
    if (isOrdinal) {
        const numA = (ordinalMap as any)[valA];
        const numB = (ordinalMap as any)[valB];
        if (numA === undefined || numB === undefined) return 0.5;
        const diff = Math.abs(numA - numB);
        if (diff === 0) return 1.0;
        if (diff === 1) return 0.7;
        return 0.2;
    } else {
        // Nominal scoring
        return valA === valB ? 1.0 : 0.2;
    }
};

const calculateStructuredScore = (userA: Partial<UserProfile>, userB: Partial<UserProfile>): { structuredScore: number, strengths: string[], conflicts: string[] } => {
    const categories = {
        'Daily Routine': {
            fields: { wakeUp: 'wakeUp', sleep: 'sleep' },
            isOrdinal: true
        },
        'Lifestyle': {
            fields: { cleanliness: 'cleanliness', visitors: 'visitors' },
            isOrdinal: false, // Mixed, handle per field
        },
        'Study Preferences': {
            fields: { location: 'location', style: 'style' },
            isOrdinal: false
        },
        'Social Activities': {
            fields: { sports: 'sports', weekend: 'weekend' },
            isOrdinal: false
        }
    };

    const categoryScores: Record<string, number> = {};
    
    // Calculate raw scores for each category
    for (const catName in categories) {
        const catDetails = (categories as any)[catName];
        let totalScore = 0;
        let fieldCount = 0;

        for (const fieldName in catDetails.fields) {
            const path = `${catDetails.fields[fieldName]}`;
            const valA = (userA as any)[catName.toLowerCase().replace(' ', '')]?.[fieldName] ?? null;
            const valB = (userB as any)[catName.toLowerCase().replace(' ', '')]?.[fieldName] ?? null;
            
            // Override isOrdinal for specific fields
            const isFieldOrdinal = fieldName === 'cleanliness' || fieldName === 'wakeUp' || fieldName === 'sleep';
            
            totalScore += scoreField(valA, valB, isFieldOrdinal);
            fieldCount++;
        }
        categoryScores[catName] = fieldCount > 0 ? totalScore / fieldCount : 0;
    }

    // Weight scores based on user priorities
    const priorityPoints = (priorityArray: string[]) => {
        const points: Record<string, number> = { 'Daily Routine': 1, 'Lifestyle': 1, 'Study Preferences': 1, 'Social Activities': 1 };
        priorityArray.forEach((p, i) => {
            if (points[p] !== undefined) points[p] = 4 - i; // 1st=4, 2nd=3, 3rd=2
        });
        return points;
    };

    const pointsA = priorityPoints(userA.matchingPriority || []);
    const pointsB = priorityPoints(userB.matchingPriority || []);

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const catName in categoryScores) {
        const combinedWeight = (pointsA[catName] || 1) + (pointsB[catName] || 1);
        totalWeightedScore += categoryScores[catName] * combinedWeight;
        totalWeight += combinedWeight;
    }
    
    // Normalize to 0-50
    const finalScore = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 50 : 25;

    const strengths: string[] = [];
    const conflicts: string[] = [];
    for (const cat in categoryScores) {
        if (categoryScores[cat] > 0.8) strengths.push(cat);
        if (categoryScores[cat] < 0.4) conflicts.push(cat);
    }

    return { structuredScore: Math.round(finalScore), strengths, conflicts };
};


// Genkit AI prompt for Semantic Analysis
const semanticPrompt = ai.definePrompt({
    name: 'semanticMatchPrompt',
    input: { schema: MatchProfilesInputSchema },
    output: {
        schema: z.object({
            semanticScore: z.number().min(0).max(50).describe("A score from 0-50 indicating semantic compatibility."),
            matchAnalysis: z.string().describe("A one-sentence summary of the overall match."),
            aiStrengths: z.array(z.string()).describe("A list of 2-3 specific, positive compatibility points based on their text descriptions."),
            aiConflicts: z.array(z.string()).describe("A list of 1-2 potential conflicts or discussion points based on their text descriptions."),
        })
    },
    prompt: `You are a roommate matching AI. Your task is to analyze the self-descriptions of two students to determine their compatibility.

    **Your Profile:**
    - About me: "{{userA.aboutYourself}}"
    - Looking for: "{{userA.idealRoommate}}"

    **Potential Roommate's Profile:**
    - About them: "{{userB.aboutYourself}}"
    - Looking for: "{{userB.idealRoommate}}"

    Analyze their compatibility based on their self-descriptions and what they are looking for.

    Based on your analysis, provide a semantic compatibility score from 0 to 50.

    Then, generate the following:
    1.  'matchAnalysis': A single, friendly sentence summarizing the overall compatibility.
    2.  'aiStrengths': An array of 2-3 strings, each highlighting a specific positive alignment (e.g., "You both value a clean and organized living space.").
    3.  'aiConflicts': An array of 1-2 strings, each highlighting a potential conflict or a point for discussion (e.g., "Your different sleep schedules might require some coordination.").

    Do NOT use "User A" or "User B". Phrase it from the perspective of "Your profile" vs. "Their profile".
    Be friendly, helpful, and concise.`,
});


// The main Genkit Flow
const matchProfilesFlow = ai.defineFlow(
    {
        name: 'matchProfilesFlow',
        inputSchema: MatchProfilesInputSchema,
        outputSchema: MatchProfilesOutputSchema,
    },
    async (input) => {
        // 1. Calculate the structured data score (max 50 points)
        const { structuredScore, strengths, conflicts } = calculateStructuredScore(input.userA, input.userB);

        // 2. Get the semantic analysis from the AI (max 50 points)
        const { output: semanticResult } = await semanticPrompt(input);
        const semanticScore = semanticResult?.semanticScore || 25; // Default score if AI fails
        const matchAnalysis = semanticResult?.matchAnalysis || "Could not generate AI analysis.";
        const aiStrengths = semanticResult?.aiStrengths || [];
        const aiConflicts = semanticResult?.aiConflicts || [];


        // 3. Combine scores and analysis
        const finalScore = Math.min(100, structuredScore + semanticScore);
        
        return {
            compatibilityScore: finalScore,
            matchAnalysis: matchAnalysis,
            structuredScore: structuredScore,
            semanticScore: semanticScore,
            strengths: strengths,
            conflicts: conflicts,
            aiStrengths: aiStrengths,
            aiConflicts: aiConflicts
        };
    }
);
