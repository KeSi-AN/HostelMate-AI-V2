
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
        // If no user is logged in, show only mock data.
        setUsers(getMockUsers(6));
        setLoading(false);
        return;
      };

      try {
        const usersRef = collection(db, "users");
        // Fetch all users except the current one who are looking for a roommate.
        const q = query(usersRef, where("uid", "!=", currentUser.uid), where("isLookingForRoommate", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedUsers: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ uid: doc.id, ...doc.data() } as UserProfile);
        });
        
        // Combine fetched users with mock data, ensuring no duplicates from mock data if real users exist.
        const mockUsers = getMockUsers(6);
        const combinedUsers = [...fetchedUsers];
        
        // Add mock users if the total count is less than the desired number, avoiding duplicates.
        const existingUids = new Set(fetchedUsers.map(u => u.uid));
        for (const mockUser of mockUsers) {
            if (combinedUsers.length >= 6) break;
            if (!existingUids.has(mockUser.uid)) {
                combinedUsers.push(mockUser);
            }
        }
        
        setUsers(combinedUsers);

      } catch (error) {
        console.error("Error fetching users, falling back to mock data:", error);
        // If there's an error (like a missing index), show only mock data.
        setUsers(getMockUsers(6));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }
  
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <DashboardClient users={users} hostelName={hostelName} />
    </div>
  );
}
