'use client'

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Sparkles } from 'lucide-react';
import { generateProfileDescription } from '@/ai/flows/generate-profile-description';
import { Label } from '@/components/ui/label';

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
