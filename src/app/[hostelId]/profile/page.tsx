
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Edit, Phone, MapPin, Clock, Book, Users, Home, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, logout } = useAuth();
  const { toast } = useToast();
  const hostelId = params.hostelId as string;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<UserProfile, 'uid'>;
          setProfile({ ...data, uid: currentUser.uid });
        } else {
          console.log('No such document!');
          // Optionally redirect to create profile page
          router.push(`/${hostelId}/profile/create`);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser, hostelId, router]);

  const handleToggleLooking = async (checked: boolean) => {
    if (!profile) return;
    try {
        const docRef = doc(db, 'users', profile.uid);
        await updateDoc(docRef, {
            isLookingForRoommate: checked
        });
        setProfile(prev => prev ? { ...prev, isLookingForRoommate: checked } : null);
        toast({ title: "Success", description: "Your status has been updated." });
    } catch(e) {
        console.error("Error updating status: ", e);
        toast({ variant: "destructive", title: "Error", description: "Could not update your status." });
    }
  };

  const handleDeleteProfile = async () => {
    if (!currentUser) return;
    try {
        await deleteDoc(doc(db, "users", currentUser.uid));
        // We can also delete the auth user, but that is a more sensitive operation.
        // For now we just delete the profile data and log them out.
        toast({ title: "Profile Deleted", description: "Your profile has been successfully deleted." });
        await logout();
        router.push('/');
    } catch (e) {
        console.error("Error deleting profile: ", e);
        toast({ variant: "destructive", title: "Error", description: "Could not delete your profile." });
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Could not load profile.</div>;
  }

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href={`/${hostelId}/dashboard`} className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-headline">{profile.name}</CardTitle>
                  <p className="text-muted-foreground">
                    {profile.yearOfStudy} • {profile.branch}
                  </p>
                  <p className="text-sm text-muted-foreground">Roll: {profile.rollNumber}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch checked={profile.isLookingForRoommate} onCheckedChange={handleToggleLooking} />
                    <span className="text-sm">Looking for roommate</span>
                  </div>
                  <Link href={`/${hostelId}/profile/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Contact & Room Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{profile.whatsapp}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Current Room
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {profile.hostelBlock} - {profile.roomNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  This info is from your initial profile creation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Routine */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Daily Routine
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Wake Up</p>
                  <p className="font-medium">{profile.dailyRoutine.wakeUp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sleep</p>
                  <p className="font-medium">{profile.dailyRoutine.sleep}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                  <p className="font-medium">{profile.dailyRoutine.classSchedule}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Hours</p>
                  <p className="font-medium">{profile.dailyRoutine.studyHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Study Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{profile.studyPreferences.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Style</p>
                  <p className="font-medium">{profile.studyPreferences.style}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project Work</p>
                  <p className="font-medium">{profile.studyPreferences.projectWork}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle */}
          <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Lifestyle
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cleanliness</p>
                  <p className="font-medium">{profile.lifestyle.cleanliness}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">{profile.lifestyle.organization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visitors</p>
                  <p className="font-medium">{profile.lifestyle.visitors}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Music</p>
                  <p className="font-medium">{profile.lifestyle.music}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lights Out</p>
                  <p className="font-medium">{profile.lifestyle.lights}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Activities */}
          <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Social Activities
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sports</p>
                    <p className="font-medium">{profile.socialActivities.sports}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weekend Plans</p>
                    <p className="font-medium">{profile.socialActivities.weekend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mess Timing</p>
                    <p className="font-medium">{profile.socialActivities.mess}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Club Memberships</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.socialActivities.clubs.map((club, index) => (
                      <Badge key={index} variant="secondary">
                        {club}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{profile.aboutYourself}</p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
                <CardTitle className="text-lg">Looking for...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{profile.idealRoommate}</p>
            </CardContent>
          </Card>

          {/* Matching Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Matching Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.matchingPriority.map((priority, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span>{priority}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Profile
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your profile and remove all your data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProfile}>
                      Delete Profile
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
