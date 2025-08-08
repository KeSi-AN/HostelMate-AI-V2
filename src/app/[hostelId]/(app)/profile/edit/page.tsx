
'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ProfileCreationWizard } from "@/components/profile/profile-creation-wizard";
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';


export default function EditProfilePage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const hostelId = params.hostelId;
    
    const methods = useForm<UserProfile>({
    });

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!currentUser || !currentUser.emailVerified) {
            router.push(`/${hostelId}/auth`);
            return;
        }

        const fetchProfileData = async () => {
            setLoading(true);
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
        };
        fetchProfileData();
    }, [currentUser, authLoading, methods, router, hostelId]);

    if (authLoading || loading) {
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
