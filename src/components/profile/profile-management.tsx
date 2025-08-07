'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/lib/types";
import { ProfileCreationWizard } from "./profile-creation-wizard";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

function ViewProfileTab({ user }: { user: UserProfile }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{user.name}</CardTitle>
                <CardDescription>{user.yearOfStudy} - {user.branch}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">Email:</span> {user.email}</div>
                    <div><span className="font-semibold">WhatsApp:</span> {user.whatsapp}</div>
                    <div><span className="font-semibold">Location:</span> {user.hostelBlock}, Room {user.roomNumber}</div>
                    <div><span className="font-semibold">Roll Number:</span> {user.rollNumber}</div>
                </div>
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Developer Note</AlertTitle>
                    <AlertDescription>
                        This is a read-only view. A full implementation would display all the user's profile information in a well-formatted way.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}

function SettingsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Settings</CardTitle>
                <CardDescription>Manage your account and notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div>
                        <Label htmlFor="search-status" className="font-semibold">Roommate Search Status</Label>
                        <p className="text-sm text-muted-foreground">Set to active to appear in searches.</p>
                    </div>
                    <Switch id="search-status" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div>
                        <Label htmlFor="profile-visibility" className="font-semibold">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Public profiles are visible to everyone in the hostel.</p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                </div>
                 <div className="border-t pt-6">
                    <Button variant="destructive">Delete Account</Button>
                     <p className="text-sm text-muted-foreground mt-2">This action is irreversible and will permanently delete your profile.</p>
                </div>
            </CardContent>
        </Card>
    )
}

export function ProfileManagement({ user }: { user: UserProfile }) {
  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="view">View Profile</TabsTrigger>
        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="view" className="mt-6">
        <ViewProfileTab user={user} />
      </TabsContent>
      <TabsContent value="edit" className="mt-6">
        <Alert className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Developer Note</AlertTitle>
            <AlertDescription>
                This form reuses the profile creation wizard. In a real app, it would be pre-filled with the user's existing data from Firestore.
            </AlertDescription>
        </Alert>
        <ProfileCreationWizard />
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}
