
'use client';

import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { UserProfile } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getMockUsers } from "@/lib/mock-data";

export default function DashboardPage() {
  const params = useParams();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const hostelId = params.hostelId as string;
  const hostelName = hostelId === 'hostel1_boys' ? 'Hostel 1 - BS Boys' : 'Hostel 3 - BSMS Girls';

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) {
        setUsers(getMockUsers(6));
        setLoading(false);
        return;
      };

      let fetchedUsers: UserProfile[] = [];
      try {
        const usersRef = collection(db, "users");
        // Query for users who are looking for a roommate and are not the current user.
        // This query requires a composite index in Firestore.
        const q = query(usersRef, where("isLookingForRoommate", "==", true), where("uid", "!=", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ uid: doc.id, ...doc.data() } as UserProfile);
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        // This error is often caused by a missing Firestore index.
        // Check the browser console for a link to create the required index.
      } finally {
        // Combine fetched users with mock data to ensure the list is populated.
        const mockUsers = getMockUsers(6);
        const combinedUsers = [...fetchedUsers];
        
        const existingUids = new Set(fetchedUsers.map(u => u.uid));
        for (const mockUser of mockUsers) {
            if (combinedUsers.length >= 6) break;
            if (!existingUids.has(mockUser.uid)) {
                combinedUsers.push(mockUser);
            }
        }
        
        setUsers(combinedUsers);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, hostelId]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }
  
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <DashboardClient users={users} hostelName={hostelName} />
    </div>
  );
}
