'use client'

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Step1_BasicInfo = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-4">
            <FormField control={control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="whatsapp" render={({ field }) => (
                <FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input {...field} placeholder="+91 XXXXXXXXXX" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="yearOfStudy" render={({ field }) => (
                <FormItem><FormLabel>Year of Study</FormLabel><Select onValueChange={field.onChange} value={field.value ?? undefined} >
                    <FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Freshman">Freshman</SelectItem><SelectItem value="Sophomore">Sophomore</SelectItem><SelectItem value="Junior">Junior</SelectItem><SelectItem value="Senior">Senior</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="branch" render={({ field }) => (
                <FormItem><FormLabel>Branch/Department</FormLabel><Select onValueChange={field.onChange} value={field.value ?? undefined}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="ECS">ECS</SelectItem><SelectItem value="HSS">HSS</SelectItem><SelectItem value="Mathematics">Mathematics</SelectItem><SelectItem value="Physics">Physics</SelectItem><SelectItem value="Biology">Biology</SelectItem><SelectItem value="Chemistry">Chemistry</SelectItem><SelectItem value="Data Science">Data Science</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="rollNumber" render={({ field }) => (
                <FormItem><FormLabel>Roll Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="isLookingForRoommate" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5"><FormLabel>Looking for roommate change?</FormLabel><FormDescription>Must be ON to find matches.</FormDescription></div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
            )} />
        </div>
    );
}
