
'use client';

import { useState } from 'react';
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
import { getMockUsers } from '@/lib/mock-data';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const hostelId = params.hostelId as string;

  const [profile] = useState<UserProfile>(getMockUsers(1)[0]);
  const [isLooking, setIsLooking] = useState(profile.isLookingForRoommate);

  const handleToggleLooking = (checked: boolean) => {
    setIsLooking(checked);
    // In a real app, you would update this in Firebase
  };

  const handleDeleteProfile = () => {
    // In a real app, you would delete the profile from Firebase
    console.log('Deleting profile...');
    router.push('/');
  };

  if (!profile) {
    return <div>Loading profile...</div>;
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
                    <Switch checked={isLooking} onCheckedChange={handleToggleLooking} />
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
                  Roommate: {profile.currentRoommate.name} ({profile.currentRoommate.year})
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
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
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
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  Study Preferences
                </CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Lifestyle
                </CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Social Activities
                </CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">About Me</CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{profile.aboutYourself}</p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Looking for...</CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{profile.idealRoommate}</p>
            </CardContent>
          </Card>

          {/* Matching Priority */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Matching Priority</CardTitle>
                <Link href={`/${hostelId}/profile/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
