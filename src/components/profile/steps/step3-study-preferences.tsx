'use client'

import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Step3_StudyPreferences = () => {
    const { control } = useFormContext();
    const options = {
        location: ['Room', 'Library', 'Common Room', 'Reading Hall', "Doesn't Matter"],
        style: ['Complete Silence', 'Light Music', 'Group Study', "Doesn't Matter"],
        projectWork: ['Solo', 'Collaborative', "Doesn't Matter"]
    };

    return (
        <div className="space-y-8">
            <FormField
                control={control}
                name="studyPreferences.location"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Preferred Study Location</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="flex flex-col space-y-1">
                                {options.location.map(option => (
                                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value={option} /></FormControl>
                                        <FormLabel className="font-normal">{option}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="studyPreferences.style"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Preferred Study Style</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="flex flex-col space-y-1">
                                {options.style.map(option => (
                                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value={option} /></FormControl>
                                        <FormLabel className="font-normal">{option}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="studyPreferences.projectWork"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Approach to Project Work</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="flex flex-col space-y-1">
                                {options.projectWork.map(option => (
                                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value={option} /></FormControl>
                                        <FormLabel className="font-normal">{option}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
