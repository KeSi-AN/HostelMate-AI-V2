

'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ProfileCreationWizard } from "@/components/profile/profile-creation-wizard";
import { FormProvider, useForm } from "react-hook-form";
import type { UserProfile } from "@/lib/types";

export default function CreateProfilePage() {
    const methods = useForm<UserProfile>({
        mode: 'onChange',
        defaultValues: {
            isLookingForRoommate: true,
            name: '',
            whatsapp: '',
            yearOfStudy: null,
            branch: null,
            rollNumber: '',
            hostelBlock: '',
            roomNumber: '',
            dailyRoutine: {
                wakeUp: null,
                sleep: null,
                classSchedule: null,
                studyHours: null,
            },
            studyPreferences: {
                location: null,
                style: null,
                projectWork: null,
            },
            lifestyle: {
                cleanliness: null,
                organization: null,
                visitors: null,
                music: null,
                lights: null,
            },
            socialActivities: {
                sports: null,
                weekend: null,
                mess: null,
                commonRoom: null,
                clubs: [],
            },
            roomPreferences: {
                floor: null,
                orientation: null,
                nearBathroom: null,
                nearCommon: null,
                corner: null,
            },
            previousRoommate: {
                name: '',
            },
            aboutYourself: '',
            idealRoommate: '',
            matchingPriority: [],
        }
    });

    const { user: currentUser, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const hostelId = params.hostelId;

    useEffect(() => {
        if (!loading && (!currentUser || !currentUser.emailVerified)) {
            router.push(`/${hostelId}/auth`);
        }
    }, [currentUser, loading, router, hostelId]);

    if (loading || !currentUser) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="text-3xl font-bold font-headline mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground mb-8">
                Complete all steps to start matching with potential roommates. Your detailed profile helps our AI find the best fit for you.
            </p>
            <FormProvider {...methods}>
                <ProfileCreationWizard />
            </FormProvider>
        </div>
    );
}
