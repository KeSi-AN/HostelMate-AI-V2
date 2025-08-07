
import { ProfileCreationWizard } from "@/components/profile/profile-creation-wizard";

export default function CreateProfilePage() {
    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="text-3xl font-bold font-headline mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground mb-8">
                Complete all steps to start matching with potential roommates. Your detailed profile helps our AI find the best fit for you.
            </p>
            <ProfileCreationWizard />
        </div>
    );
}
