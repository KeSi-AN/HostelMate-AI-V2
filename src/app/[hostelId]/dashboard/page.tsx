import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { getMockUsers } from "@/lib/mock-data";

export default function DashboardPage({ params }: { params: { hostelId: string } }) {
  // In a real app, you'd fetch users based on the hostelId
  const users = getMockUsers(20);
  const hostelName = params.hostelId === 'hostel1_boys' ? 'Hostel 1 - BS Boys' : 'Hostel 3 - BSMS Girls';
  
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <DashboardClient users={users} hostelName={hostelName} />
    </div>
  );
}
