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

export const Step9_IdealRoommate = () => {
    const { control, setValue, getValues } = useFormContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [keywords, setKeywords] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generateProfileDescription({ aboutMeKeywords: '', idealRoommateKeywords: keywords });
            if (result.idealRoommateDescription) {
                setValue('idealRoommate', result.idealRoommateDescription, { shouldValidate: true });
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
                <Label>Keywords for your ideal roommate</Label>
                <Input placeholder="e.g. clean, respectful, early bird, studious" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                <Button type="button" size="sm" onClick={handleGenerate} disabled={isGenerating || !keywords}>
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
