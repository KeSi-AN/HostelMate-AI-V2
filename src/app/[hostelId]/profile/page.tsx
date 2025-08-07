import { ProfileManagement } from "@/components/profile/profile-management";
import { getMockUsers } from "@/lib/mock-data";

export default function ProfilePage() {
  const user = getMockUsers(1)[0]; // Get a single mock user

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Your Profile</h1>
      <ProfileManagement user={user} />
    </div>
  );
}
