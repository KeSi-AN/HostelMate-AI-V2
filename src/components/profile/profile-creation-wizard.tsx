'use client'

import { useState } from 'react';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { generateProfileDescription } from '@/ai/flows/generate-profile-description';

const totalSteps = 10;

const stepSchemas = [
  z.object({
    name: z.string().min(2, "Name is required"),
    whatsapp: z.string().regex(/^\+91\s?\d{10}$/, "Invalid WhatsApp number"),
    yearOfStudy: z.string().nonempty("Year of study is required"),
    branch: z.string().nonempty("Branch is required"),
    rollNumber: z.string().min(5, "Roll number is required"),
    currentFloor: z.string().nonempty("Floor is required"),
    hostelBlock: z.string().min(1, "Hostel block is required"),
    roomNumber: z.string().min(1, "Room number is required"),
    currentRoommateName: z.string().min(2, "Roommate name is required"),
    currentRoommateYear: z.string().nonempty("Roommate year is required"),
    isLookingForRoommate: z.boolean().refine(val => val, "You must be looking for a change"),
  }),
  // Add schemas for other steps as needed for full validation
];


const Step_1 = () => (
    <div className="space-y-4">
      <FormField name="name" render={({ field }) => (
          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField name="whatsapp" render={({ field }) => (
          <FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input {...field} placeholder="+91 XXXXXXXXXX" /></FormControl><FormMessage /></FormItem>
      )} />
      {/* Shortened for brevity, other fields follow this pattern */}
      <FormField name="yearOfStudy" render={({ field }) => (
        <FormItem><FormLabel>Year of Study</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl>
          <SelectContent><SelectItem value="Freshman">Freshman</SelectItem><SelectItem value="Sophomore">Sophomore</SelectItem><SelectItem value="Junior">Junior</SelectItem><SelectItem value="Senior">Senior</SelectItem></SelectContent>
        </Select><FormMessage /></FormItem>
      )}/>
      <FormField name="branch" render={({ field }) => (
        <FormItem><FormLabel>Branch/Department</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl><SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger></FormControl>
          <SelectContent><SelectItem value="ECS">ECS</SelectItem><SelectItem value="HSS">HSS</SelectItem><SelectItem value="Mathematics">Mathematics</SelectItem></SelectContent>
        </Select><FormMessage /></FormItem>
      )}/>
       <FormField name="rollNumber" render={({ field }) => (
          <FormItem><FormLabel>Roll Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
      )} />
       <FormField name="isLookingForRoommate" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5"><FormLabel>Looking for roommate change?</FormLabel><FormDescription>Must be ON to find matches.</FormDescription></div>
              <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
       )} />
    </div>
);


const Step_8_About = () => {
    const { control, setValue } = useFormContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [keywords, setKeywords] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generateProfileDescription({ aboutMeKeywords: keywords, idealRoommateKeywords: '' });
            setValue('aboutYourself', result.aboutMeDescription, { shouldValidate: true });
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Keywords about you</Label>
                <Input placeholder="e.g. night owl, coding, gaming, organized, fitness" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                <Button type="button" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
            </div>
            <FormField
                control={control}
                name="aboutYourself"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tell Us About Yourself</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Describe your personality, interests, hobbies, and lifestyle..."
                                className="min-h-[120px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>500 character limit. Current: {field.value?.length || 0}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

const Step_9_IdealRoommate = () => {
    const { control, setValue } = useFormContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [keywords, setKeywords] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generateProfileDescription({ aboutMeKeywords: '', idealRoommateKeywords: keywords });
            setValue('idealRoommate', result.idealRoommateDescription, { shouldValidate: true });
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Keywords for your ideal roommate</Label>
                <Input placeholder="e.g. clean, respectful, early bird, studious" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                <Button type="button" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
            </div>
            <FormField
                control={control}
                name="idealRoommate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Describe Your Ideal Roommate</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="What qualities are you looking for in a roommate?"
                                className="min-h-[120px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>500 character limit. Current: {field.value?.length || 0}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

const steps = [
  { id: 1, title: 'Basic Information', component: Step_1 },
  { id: 2, title: 'Daily Routine', component: () => <div>Step 2 Content</div> },
  { id: 3, title: 'Study Preferences', component: () => <div>Step 3 Content</div> },
  { id: 4, title: 'Lifestyle', component: () => <div>Step 4 Content</div> },
  { id: 5, title: 'Social Activities', component: () => <div>Step 5 Content</div> },
  { id: 6, title: 'Room Preferences', component: () => <div>Step 6 Content</div> },
  { id: 7, title: 'Previous Roommate', component: () => <div>Step 7 Content</div> },
  { id: 8, title: 'About Yourself', component: Step_8_About },
  { id: 9, title: 'Ideal Roommate', component: Step_9_IdealRoommate },
  { id: 10, title: 'Matching Priority', component: () => <div>Step 10 Content</div> },
];

export function ProfileCreationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const CurrentStepComponent = steps[currentStep].component;

  const methods = useForm({
    // resolver: zodResolver(stepSchemas[currentStep]),
    mode: 'onChange',
    defaultValues: {
        aboutYourself: '',
        idealRoommate: '',
    }
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    // const isValid = await trigger();
    const isValid = true; // Bypassing validation for demo
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

  const onSubmit = (data:any) => {
    console.log('Profile submitted:', data);
    // Handle final submission to Firebase
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
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
                    <Button type="submit">Finish & Submit Profile</Button>
                )}
            </div>
        </div>
      </form>
    </FormProvider>
  );
}
