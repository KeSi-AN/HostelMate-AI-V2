### Problem Statement: Designing a Hybrid Roommate Matching Algorithm for HostelMate AI

#### **1. Objective**

Design and implement a comprehensive roommate matching algorithm for the "HostelMate AI" application. The algorithm must produce a numerical **compatibility score** (from 0 to 100) and a qualitative **match analysis** for any two given user profiles. The goal is to create matches that are not only compatible on a practical level (e.g., sleep schedules) but also on a personal level (e.g., values, personality).

#### **2. Input Data Structure**

The algorithm will receive two user profiles as input, `userA` (the primary user) and `userB` (a potential match). Each profile adheres to the `UserProfile` interface defined in `src/lib/types.ts`. The key fields for matching are:

*   **`dailyRoutine`**: Object with wake-up time, sleep time, etc.
*   **`studyPreferences`**: Object with preferred location, style, etc.
*   **`lifestyle`**: Object with cleanliness level, visitor frequency, etc.
*   **`socialActivities`**: Object with sports involvement, weekend plans, etc.
*   **`aboutYourself`**: (string) A free-text description of the user.
*   **`idealRoommate`**: (string) A free-text description of what the user is looking for.
*   **`matchingPriority`**: (string[]) An array of up to 3 factors the user deems most important (e.g., 'Lifestyle', 'Daily Routine').

#### **3. Core Requirements for the Algorithm**

The matching algorithm should be a hybrid system, combining two distinct methods of analysis:

**A. Structured Data Scoring:**
This component calculates a score based on direct comparison of the enumerated preferences (from the multiple-choice and selection questions).

*   **Categorical Comparison:** For each shared preference field (e.g., `lifestyle.cleanliness`), devise a scoring system. A direct match ('Very Tidy' and 'Very Tidy') should yield a high score, a near match ('Very Tidy' and 'Moderate') a medium score, and a mismatch ('Very Tidy' and 'Relaxed') a low or zero score.
*   **Weighted Scoring:** The score for each category must be weighted according to the `matchingPriority` array for **both** `userA` and `userB`. If `userA` prioritizes 'Lifestyle' and there is a high lifestyle compatibility with `userB`, this match should contribute more to the final score than a category neither user prioritized. How should the priorities of both users be combined? (e.g., average, sum, maximum?).
*   **Final Aggregation:** How should the weighted scores from all structured categories be normalized and aggregated into a single score component (e.g., out of 50 points)?

**B. Semantic Compatibility Analysis (AI-Powered):**
This component uses a Genkit AI flow to analyze the unstructured text fields for deeper, more nuanced compatibility.

*   **Ideal-Self Match (`userA.idealRoommate` vs. `userB.aboutYourself`):** The primary analysis. The algorithm must assess how well `userB`'s self-description aligns with the qualities `userA` is looking for in a roommate.
*   **Reciprocal Match (`userB.idealRoommate` vs. `userA.aboutYourself`):** The algorithm must also perform the reverse comparison to ensure the match is mutually beneficial.
*   **Output:** The AI flow should return two things:
    1.  A numerical **semantic score** (e.g., out of 50 points).
    2.  A brief, human-readable **match analysis summary**. This summary should highlight key points of compatibility (e.g., "High personality match based on shared interest in startups") and potential areas of conflict (e.g., "Potential conflict: Different wake-up times on weekends may need discussion.").

#### **4. Final Score Combination**

The final compatibility score (0-100) will be the sum of the **Structured Data Score** and the **Semantic Compatibility Score**.

#### **5. Key Research Questions**

1.  What is the optimal scoring matrix for comparing categorical preference data?
2.  What is the most effective and fair methodology for weighting scores based on the `matchingPriority` of both users?
3.  What is the best prompt engineering strategy for the Genkit AI flow to accurately evaluate semantic compatibility and generate a useful, concise analysis from the text descriptions? The prompt should instruct the model to perform both the ideal-self and reciprocal match analysis.
4.  How should the final `match analysis` summary be structured to be most helpful to the user? What are the key elements it must contain (e.g., strengths, weaknesses, suggested discussion points)?