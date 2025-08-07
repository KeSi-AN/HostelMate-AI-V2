'use client'

import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Step2_DailyRoutine = () => {
    const { control } = useFormContext();
    const routineOptions = {
        wakeUp: ['5-6 AM', '6-7 AM', '7-8 AM', 'After 8 AM'],
        sleep: ['Before 10 PM', '10-11 PM', '11-12 AM', 'After 12 AM'],
        classSchedule: ['Morning', 'Afternoon', 'Evening', 'Flexible'],
        studyHours: ['Early Morning', 'Afternoon', 'Late Night', 'Flexible']
    };

    return (
        <div className="space-y-8">
            <FormField
                control={control}
                name="dailyRoutine.wakeUp"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Wake-up Time</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {routineOptions.wakeUp.map(option => (
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
                name="dailyRoutine.sleep"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Sleep Time</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {routineOptions.sleep.map(option => (
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
                name="dailyRoutine.classSchedule"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Class Schedule</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {routineOptions.classSchedule.map(option => (
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
                name="dailyRoutine.studyHours"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Study Hours</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {routineOptions.studyHours.map(option => (
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
