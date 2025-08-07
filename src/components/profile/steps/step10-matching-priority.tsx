'use client'

import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';

const priorityItems = [
    { id: 'dailyRoutine', label: 'Daily Routine' },
    { id: 'studyPreferences', label: 'Study Preferences' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'socialActivities', label: 'Social Activities' },
    { id: 'cleanliness', label: 'Cleanliness' },
    { id: 'branch', label: 'Same Branch' },
]

export const Step10_MatchingPriority = () => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="matchingPriority"
            render={({ field }) => (
                <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base font-semibold">Matching Priority</FormLabel>
                        <FormDescription>Select your top 3 most important factors for a roommate match.</FormDescription>
                    </div>
                    {priorityItems.map((item) => (
                        <FormField
                            key={item.id}
                            control={control}
                            name="matchingPriority"
                            render={({ field }) => {
                                const isChecked = field.value?.includes(item.label);
                                const isDisabled = !isChecked && field.value?.length >= 3;
                                return (
                                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 my-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={isChecked}
                                                disabled={isDisabled}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), item.label])
                                                        : field.onChange(field.value?.filter((value) => value !== item.label))
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                    </FormItem>
                                )
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
