'use client'

import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Step6_RoomPreferences = () => {
    const { control } = useFormContext();
    const options = {
        floor: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', 'Any Floor'],
        orientation: ['East Facing', 'West Facing', 'North Facing', 'South Facing', 'Any Direction'],
        nearBathroom: ['Yes, Prefer', 'No, Avoid', "Doesn't Matter"],
        nearCommon: ['Yes, Prefer', 'No, Avoid', "Doesn't Matter"],
        corner: ['Prefer Corner', 'Avoid Corner', "Doesn't Matter"]
    };

    return (
        <div className="space-y-8">
            <FormField
                control={control}
                name="roomPreferences.floor"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Floor Preference</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.floor.map(option => (
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
                name="roomPreferences.orientation"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Room Orientation</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.orientation.map(option => (
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
                name="roomPreferences.nearBathroom"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Room near Bathroom</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.nearBathroom.map(option => (
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
                name="roomPreferences.nearCommon"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Room near Common Room</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.nearCommon.map(option => (
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
                name="roomPreferences.corner"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="font-semibold">Corner Room</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                {options.corner.map(option => (
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
