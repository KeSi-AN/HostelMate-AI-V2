
'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ProfileCreationWizard } from "@/components/profile/profile-creation-wizard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';


export default function EditProfilePage() {
    const { user: currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const methods = useForm<UserProfile>({
        // Default values will be populated by the fetch effect
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        methods.reset(docSnap.data() as UserProfile);
                    }
                } catch (e) {
                    console.error("Failed to fetch profile data:", e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [currentUser, methods]);

    if (loading) {
        return (
            <div className="container mx-auto max-w-4xl py-8">
                <h1 className="text-3xl font-bold font-headline mb-2">Edit Your Profile</h1>
                <p>Loading your profile...</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="text-3xl font-bold font-headline mb-2">Edit Your Profile</h1>
            <p className="text-muted-foreground mb-8">
                Update your information to keep your matches relevant.
            </p>
            <FormProvider {...methods}>
                <ProfileCreationWizard />
            </FormProvider>
        </div>
    );
}
