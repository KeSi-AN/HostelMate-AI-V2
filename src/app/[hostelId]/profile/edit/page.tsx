
import { ProfileCreationWizard } from "@/components/profile/profile-creation-wizard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


export default function EditProfilePage() {
    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="text-3xl font-bold font-headline mb-2">Edit Your Profile</h1>
            <p className="text-muted-foreground mb-8">
                Update your information to keep your matches relevant.
            </p>
            <Alert className="mb-6">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Developer Note</AlertTitle>
                <AlertDescription>
                    This form reuses the profile creation wizard. In a real app, it would be pre-filled with the user's existing data from Firestore.
                </AlertDescription>
            </Alert>
            <ProfileCreationWizard />
        </div>
    );
}
