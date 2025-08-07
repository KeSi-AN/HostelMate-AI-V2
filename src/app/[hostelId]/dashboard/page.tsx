
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
        // If no user is logged in, show mock data for demonstration.
        setUsers(getMockUsers(6));
        setLoading(false);
        return;
      };

      try {
        const usersRef = collection(db, "users");
        // Fetch all users except the current one
        const q = query(usersRef, where("uid", "!=", currentUser.uid), where("isLookingForRoommate", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedUsers: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ uid: doc.id, ...doc.data() } as UserProfile);
        });
        
        if (fetchedUsers.length === 0) {
            // If no real users are found, fallback to mock data.
            setUsers(getMockUsers(6));
        } else {
            setUsers(fetchedUsers);
        }

      } catch (error) {
        console.error("Error fetching users:", error);
        // If there's an error (like a missing index), show mock data.
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
