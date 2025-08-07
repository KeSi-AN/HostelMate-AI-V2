'use client'

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Sparkles, Lightbulb } from 'lucide-react';
import { generateProfileDescription } from '@/ai/flows/generate-profile-description';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const Step8_About = () => {
    const { control, setValue, getValues } = useFormContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [keywords, setKeywords] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generateProfileDescription({ aboutMeKeywords: keywords, idealRoommateKeywords: '' });
            if (result.aboutMeDescription) {
                setValue('aboutYourself', result.aboutMeDescription, { shouldValidate: true });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="space-y-4">
             <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tips for better matches:</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Mention your academic goals and study habits</li>
                        <li>Share your hobbies and interests</li>
                        <li>Describe your personality traits</li>
                        <li>Mention what you value in a roommate</li>
                    </ul>
                </AlertDescription>
            </Alert>
            <div className="space-y-2">
                <Label>Keywords about you</Label>
                <Input placeholder="e.g. night owl, coding, gaming, organized, fitness" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                <Button type="button" size="sm" onClick={handleGenerate} disabled={isGenerating || !keywords}>
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
