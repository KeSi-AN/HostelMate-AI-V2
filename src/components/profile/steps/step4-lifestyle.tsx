'use client'

import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Step4_Lifestyle = () => {
    const { control } = useFormContext();
    const options = {
        cleanliness: ['Very Tidy', 'Moderate', 'Relaxed', "Doesn't Matter"],
        organization: ['Everything in Place', 'Organized Chaos', 'Flexible', "Doesn't Matter"],
        visitors: ['Rarely', 'Weekends', 'Often', "Doesn't Matter"],
        music: ['Headphones Only', 'Low Speaker Volume', 'No Music', "Doesn't Matter"],
        lights: ['Early (by 10 PM)', 'Late (after midnight)', "Doesn't Matter"]
    };

    return (
        <div className="space-y-8">
            <FormField
                control={control}
                name="lifestyle.cleanliness"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Cleanliness</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.cleanliness.map(option => (
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
                name="lifestyle.organization"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Room Organization</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.organization.map(option => (
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
                name="lifestyle.visitors"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Having Visitors Over</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.visitors.map(option => (
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
                name="lifestyle.music"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Music in the Room</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.music.map(option => (
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
                name="lifestyle.lights"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Lights Out Time</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.lights.map(option => (
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
