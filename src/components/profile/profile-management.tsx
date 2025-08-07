'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

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

export function ProfileManagement() {
  return (
    <Tabs defaultValue="settings" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="settings" className="mt-6">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}
