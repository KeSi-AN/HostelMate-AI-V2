'use client'

import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';

const clubItems = [
    { id: 'technical', label: 'Technical Club' },
    { id: 'cultural', label: 'Cultural Club' },
    { id: 'sports', label: 'Sports Club' },
    { id: 'literary', label: 'Literary Club' },
    { id: 'social', label: 'Social Service Group' },
    { id: 'entrepreneurship', label: 'Entrepreneurship Cell' },
]

export const Step5_SocialActivities = () => {
    const { control } = useFormContext();
    const options = {
        sports: ['Active Athlete', 'Casual Player', 'Not Interested', "Doesn't Matter"],
        weekend: ['Stay In Hostel', 'Go Home', 'Explore City', "Doesn't Matter"],
        mess: ['Early Batch', 'Regular Batch', 'Late Batch', "Doesn't Matter"],
        commonRoom: ['Frequently', 'Sometimes', 'Rarely', "Doesn't Matter"]
    };

    return (
        <div className="space-y-8">
            <FormField
                control={control}
                name="socialActivities.sports"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Involvement in Sports</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.sports.map(option => (
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
                name="socialActivities.weekend"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Weekend Plans</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.weekend.map(option => (
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
                name="socialActivities.mess"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Mess Timing Preference</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.mess.map(option => (
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
                name="socialActivities.commonRoom"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">How often do you visit the common room?</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.commonRoom.map(option => (
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
            <Controller
                control={control}
                name="socialActivities.clubs"
                render={({ field }) => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base font-semibold">Club Memberships</FormLabel>
                            <FormDescription>Select all clubs you are a part of.</FormDescription>
                        </div>
                        {clubItems.map((item) => (
                            <FormField
                                key={item.id}
                                control={control}
                                name="socialActivities.clubs"
                                render={({ field }) => {
                                    return (
                                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.label)}
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
        </div>
    )
}
