'use client'

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';

export const Step7_PreviousRoommate = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-4">
            <FormField control={control} name="previousRoommate.name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Previous Roommate's Name (Optional)</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormDescription>
                        This information is kept confidential and only used to improve our matching algorithm.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    );
}
