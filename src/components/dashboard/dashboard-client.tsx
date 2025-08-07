'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterSidebar } from './filter-sidebar';
import { RoommateCard } from './roommate-card';
import type { UserProfile } from '@/lib/types';
import { BarChart, Users, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';


export function DashboardClient({ users, hostelName }: { users: UserProfile[], hostelName: string }) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Looking for a roommate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Your Avg. Match</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Average compatibility score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Views today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:flex">
          <FilterSidebar />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between md:hidden mb-4">
            <h2 className="text-lg font-semibold">Matches</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <RoommateCard key={user.uid} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
