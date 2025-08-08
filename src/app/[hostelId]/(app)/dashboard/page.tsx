

'use client';

import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { UserProfile } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { matchProfiles, MatchProfilesOutput } from "@/ai/flows/match-profiles";

export type UserWithMatchData = UserProfile & Partial<MatchProfilesOutput>;

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [usersWithMatches, setUsersWithMatches] = useState<UserWithMatchData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const hostelId = params.hostelId as string;
  const hostelName = hostelId === 'hostel1_boys' ? 'Hostel 1 - BS Boys' : 'Hostel 3 - BSMS Girls';

  useEffect(() => {
    const fetchAndMatchUsers = async () => {
      setLoading(true);

      if (!currentUser || !currentUser.emailVerified) {
        router.push(`/${hostelId}/auth`);
        return;
      }

      // Check for cached data first
      const cachedData = sessionStorage.getItem(`matchData_${currentUser.uid}`);
      if (cachedData) {
        setUsersWithMatches(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
      
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnap = await getDoc(currentUserDocRef);

      if (!currentUserDocSnap.exists()) {
        setLoading(false);
        router.push(`/${hostelId}/profile/create`);
        return;
      }
      const currentUserProfileData = currentUserDocSnap.data();
      const currentUserProfile = { 
        uid: currentUser.uid, 
        ...currentUserProfileData,
        matchingPriority: currentUserProfileData.matchingPriority || [],
      } as UserProfile;
      
      if (currentUserProfile.hostelId !== hostelId) {
        router.replace(`/${currentUserProfile.hostelId}/dashboard`);
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(
        usersRef, 
        where("hostelId", "==", hostelId),
        where("uid", "!=", currentUser.uid)
      );
      
      let fetchedUsers: UserProfile[] = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedUsers.push({ 
            uid: doc.id, 
            ...data,
            matchingPriority: data.matchingPriority || [],
          } as UserProfile);
        });
      } catch (error) {
        console.error("Error fetching users. This likely means you need to create a composite index in Firestore.", error);
      }
      
      const matchPromises = fetchedUsers.map(otherUser => {
        const plainUserA = JSON.parse(JSON.stringify(currentUserProfile));
        const plainUserB = JSON.parse(JSON.stringify(otherUser));

        return matchProfiles({ userA: plainUserA, userB: plainUserB })
          .then(matchResult => ({ ...otherUser, ...matchResult }))
          .catch(err => {
            console.error(`Failed to match with ${otherUser.name}:`, err);
            return { 
              ...otherUser, 
              compatibilityScore: 0,
              matchAnalysis: "Could not calculate match score.",
            };
          });
      });
      
      const matchedUsers = await Promise.all(matchPromises);
      
      // Cache the new results
      sessionStorage.setItem(`matchData_${currentUser.uid}`, JSON.stringify(matchedUsers));

      setUsersWithMatches(matchedUsers);
      setLoading(false);
    };

    if (currentUser) {
      fetchAndMatchUsers();
    }
  }, [currentUser, hostelId, router]);

  if (loading || !currentUser) {
    return <div className="p-8">Finding your best matches...</div>;
  }
  
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <DashboardClient users={usersWithMatches} hostelName={hostelName} />
    </div>
  );
}
