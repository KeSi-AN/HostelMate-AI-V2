
'use client'

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Step1_BasicInfo } from './steps/step1-basic-info';
import { Step2_DailyRoutine } from './steps/step2-daily-routine';
import { Step3_StudyPreferences } from './steps/step3-study-preferences';
import { Step4_Lifestyle } from './steps/step4-lifestyle';
import { Step5_SocialActivities } from './steps/step5-social-activities';
import { Step6_RoomPreferences } from './steps/step6-room-preferences';
import { Step7_PreviousRoommate } from './steps/step7-previous-roommate';
import { Step8_About } from './steps/step8-about';
import { Step9_IdealRoommate } from './steps/step9-ideal-roommate';
import { Step10_MatchingPriority } from './steps/step10-matching-priority';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';


const totalSteps = 10;

const steps = [
  { id: 1, title: 'Basic Information', component: Step1_BasicInfo },
  { id: 2, title: 'Daily Routine', component: Step2_DailyRoutine },
  { id: 3, title: 'Study Preferences', component: Step3_StudyPreferences },
  { id: 4, title: 'Lifestyle', component: Step4_Lifestyle },
  { id: 5, title: 'Social Activities', component: Step5_SocialActivities },
  { id: 6, title: 'Room Preferences', component: Step6_RoomPreferences },
  { id: 7, title: 'Previous Roommate', component: Step7_PreviousRoommate },
  { id: 8, title: 'About Yourself', component: Step8_About },
  { id: 9, title: 'Ideal Roommate', component: Step9_IdealRoommate },
  { id: 10, title: 'Matching Priority', component: Step10_MatchingPriority },
];

export function ProfileCreationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const CurrentStepComponent = steps[currentStep].component;
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const hostelId = params.hostelId as string;

  const methods = useForm<UserProfile>({
    mode: 'onChange',
    // You can prefill with existing data here if needed
    defaultValues: {
        isLookingForRoommate: true,
        // Initialize other fields as empty strings or default values
    }
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    // This can be improved to trigger validation for the current step's fields
    const isValid = true;
    if (isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: UserProfile) => {
    if (!currentUser) {
        toast({ variant: "destructive", title: "Not authenticated", description: "You must be logged in to create a profile."});
        return;
    }

    setIsSubmitting(true);
    try {
        const profileData = {
            ...data,
            uid: currentUser.uid,
            email: currentUser.email,
            hostelId: hostelId,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            lastActive: serverTimestamp(),
            profileCompleteness: 100, // Or calculate based on fields filled
        };

        await setDoc(doc(db, "users", currentUser.uid), profileData);

        toast({ title: "Profile Created!", description: "Your profile has been saved successfully."});
        router.push(`/${hostelId}/dashboard`);
    } catch (error) {
        console.error("Error creating profile:", error);
        toast({ variant: "destructive", title: "Error", description: "There was an issue saving your profile."});
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <p className="text-sm font-medium text-primary">Step {currentStep + 1} of {totalSteps}</p>
              <Progress value={((currentStep + 1) / totalSteps) * 100} className="mt-2" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{steps[currentStep].title}</CardTitle>
                    <CardDescription>Please fill out all the required fields.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                      >
                         <CurrentStepComponent />
                      </motion.div>
                  </AnimatePresence>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                {currentStep < totalSteps - 1 ? (
                    <Button type="button" onClick={handleNext}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving Profile...' : 'Finish & Submit Profile'}
                    </Button>
                )}
            </div>
        </form>
      </Form>
    </FormProvider>
  );
}
