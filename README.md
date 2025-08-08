# HostelMate AI

HostelMate AI is a modern, AI-powered application designed to help college students find their ideal roommates. Built with Next.js and Firebase, it uses Google's Gemini models via Genkit to perform nuanced, multi-faceted compatibility analysis between student profiles, going beyond simple preference matching.

## Overview

The core of HostelMate AI is its intelligent matching system. Students create detailed profiles covering their daily routines, study habits, lifestyle, social activities, and more. They also describe themselves and their ideal roommate in their own words.

The application then combines two forms of analysis:
1.  **Structured Scoring**: A weighted algorithm scores compatibility based on categorical data (e.g., cleanliness, sleep schedules).
2.  **Semantic Analysis**: A Genkit AI flow analyzes the free-text descriptions to uncover deeper personality and value alignments, providing a qualitative summary of the match.

The result is a comprehensive compatibility score and a detailed breakdown of strengths and potential conflicts, empowering students to make informed decisions.

## Tech Stack

*   **Framework**: Next.js (with App Router)
*   **AI Integration**: Google Gemini via Genkit
*   **Backend & Database**: Firebase (Authentication, Firestore)
*   **UI**: React, ShadCN UI, Tailwind CSS
*   **Deployment**: Configured for Vercel (recommended) or Firebase App Hosting

## Current Progress & Key Changes

This project was bootstrapped in Firebase Studio and developed iteratively. Here is a summary of the key features and improvements implemented so far:

*   **Initial Setup**: Project initialized with Next.js, Firebase, Genkit, and ShadCN UI components.
*   **Core AI Matching Flow**: Implemented the `matchProfiles` Genkit flow, which performs a hybrid analysis of structured and semantic user data to generate a compatibility score.
*   **User Profile System**: A multi-step profile creation and editing wizard was built to capture detailed user preferences.
*   **Dashboard UI**: A central dashboard was created to display potential roommate matches in a card-based layout, complete with filtering and sorting capabilities.
*   **Deployment Configuration**:
    *   Guided through deployment options, with a primary recommendation for **Vercel**.
    *   Updated `firebase.ts` to use environment variables for secure and flexible configuration, essential for deployment.
    *   Provided detailed steps for connecting the local project to a GitHub repository and deploying on Vercel.
*   **Critical Bug Fixes**:
    *   Resolved a `ZodError` crash by making the `matchingPriority` field in user profiles more robust and resilient to missing data.
*   **Performance & Cost Optimization**:
    *   Implemented a `sessionStorage` caching strategy for match results. This drastically reduces redundant API calls to Genkit, saving costs and significantly speeding up dashboard load times after the initial calculation.
*   **UI/UX Enhancements**:
    *   **Dynamic Avatars**: Replaced static placeholders with dynamically generated, colored avatars based on user initials (similar to Google Contacts), improving personalization at no cost.
    *   **Visual AI Analysis**: Redesigned the AI compatibility section on roommate cards to be more engaging, using green checkmarks for strengths and orange warning signs for conflicts.
    *   **UI Cleanup**: Removed non-functional UI elements like the "Profile Views" card and the notification bell to create a cleaner, more focused interface.
    *   **Filter Defaults**: Adjusted the default match filter to 0% to ensure all potential matches are visible on first load.
    
