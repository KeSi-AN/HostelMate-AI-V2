
'use client';

import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { UserProfile } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getMockUsers } from "@/lib/mock-data";
import { matchProfiles, MatchProfilesOutput } from "@/ai/flows/match-profiles";

export type UserWithMatchData = UserProfile & Partial<MatchProfilesOutput>;

export default function DashboardPage() {
  const params = useParams();
  const { user: currentUser } = useAuth();
  const [usersWithMatches, setUsersWithMatches] = useState<UserWithMatchData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const hostelId = params.hostelId as string;
  const hostelName = hostelId === 'hostel1_boys' ? 'Hostel 1 - BS Boys' : 'Hostel 3 - BSMS Girls';

  useEffect(() => {
    const fetchAndMatchUsers = async () => {
      setLoading(true);

      if (!currentUser) {
        const mockUsers = getMockUsers(6).map(u => ({
          ...u,
          compatibilityScore: Math.floor(Math.random() * 61) + 40,
          matchAnalysis: "Log in to see a real AI-powered match analysis.",
        }));
        setUsersWithMatches(mockUsers);
        setLoading(false);
        return;
      }

      // Fetch current user's full profile
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnap = await getDoc(currentUserDocRef);

      if (!currentUserDocSnap.exists()) {
        setLoading(false);
        // Maybe redirect to profile creation if they are logged in but have no profile
        return;
      }
      const currentUserProfile = { uid: currentUser.uid, ...currentUserDocSnap.data() } as UserProfile;

      // Fetch potential roommates from the same hostel
      const usersRef = collection(db, "users");
      // This query requires a composite index in Firestore.
      const q = query(
        usersRef, 
        where("hostelId", "==", hostelId),
        where("isLookingForRoommate", "==", true), 
        where("uid", "!=", currentUser.uid)
      );
      
      let fetchedUsers: UserProfile[] = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ uid: doc.id, ...doc.data() } as UserProfile);
        });
      } catch (error) {
        console.error("Error fetching users. This likely means you need to create a composite index in Firestore.", error);
        // You might want to show a more user-friendly error message here
      }
      
      // Perform matching
      const matchPromises = fetchedUsers.map(otherUser => 
        matchProfiles({ userA: currentUserProfile, userB: otherUser })
          .then(matchResult => ({ ...otherUser, ...matchResult }))
          .catch(err => {
            console.error(`Failed to match with ${otherUser.name}:`, err);
            // Return user with a default score on failure
            return { 
              ...otherUser, 
              compatibilityScore: 0,
              matchAnalysis: "Could not calculate match score.",
            };
          })
      );
      
      const matchedUsers = await Promise.all(matchPromises);
      
      // Combine with mock data if needed to reach a minimum count
      const combinedUsers: UserWithMatchData[] = [...matchedUsers];
      if (combinedUsers.length < 6) {
        const mockUsers = getMockUsers(6);
        const existingUids = new Set(matchedUsers.map(u => u.uid));

        for (const mockUser of mockUsers) {
            if (combinedUsers.length >= 6) break;
            if (!existingUids.has(mockUser.uid)) {
              combinedUsers.push({
                 ...mockUser,
                 compatibilityScore: Math.floor(Math.random() * 61) + 40,
                 matchAnalysis: "This is a mock user profile for demonstration.",
              });
            }
        }
      }

      setUsersWithMatches(combinedUsers);
      setLoading(false);
    };

    fetchAndMatchUsers();
  }, [currentUser, hostelId]);

  if (loading) {
    return <div className="p-8">Finding your best matches...</div>;
  }
  
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <DashboardClient users={usersWithMatches} hostelName={hostelName} />
    </div>
  );
}
