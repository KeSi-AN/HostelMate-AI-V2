
'use client';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterSidebar, FilterState } from './filter-sidebar';
import { RoommateCard } from './roommate-card';
import { BarChart, Users, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserWithMatchData } from '@/app/[hostelId]/dashboard/page';


export function DashboardClient({ users, hostelName }: { users: UserWithMatchData[], hostelName: string }) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    years: [],
    branches: [],
    matchPercentage: 0,
    sortBy: 'match-desc',
  });

  useEffect(() => {
    let newFilteredUsers = [...users];

    // Apply search filter
    if (filters.search) {
      newFilteredUsers = newFilteredUsers.filter(user =>
        user.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply year filter
    if (filters.years.length > 0) {
      newFilteredUsers = newFilteredUsers.filter(user =>
        filters.years.includes(user.yearOfStudy || '')
      );
    }

    // Apply branch filter
    if (filters.branches.length > 0) {
      newFilteredUsers = newFilteredUsers.filter(user =>
        filters.branches.includes(user.branch || '')
      );
    }
    
    // Apply match percentage filter
    newFilteredUsers = newFilteredUsers.filter(user => (user.compatibilityScore || 0) >= filters.matchPercentage);

    // Apply sorting
    switch (filters.sortBy) {
        case 'match-desc':
            newFilteredUsers.sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
            break;
        case 'newest':
            // @ts-ignore
            newFilteredUsers.sort((a, b) => new Date(b.createdAt?.seconds * 1000 || 0).getTime() - new Date(a.createdAt?.seconds * 1000 || 0).getTime());
            break;
        case 'same-year':
            // This would be more effective if we knew the current user's year.
            // For now, it will just group them by year.
            newFilteredUsers.sort((a, b) => (a.yearOfStudy || '').localeCompare(b.yearOfStudy || ''));
            break;
        case 'same-branch':
            newFilteredUsers.sort((a, b) => (a.branch || '').localeCompare(b.branch || ''));
            break;
    }


    setFilteredUsers(newFilteredUsers);
  }, [filters, users]);
  
  const avgMatch = useMemo(() => {
    if (users.length === 0) return 0;
    const total = users.reduce((acc, user) => acc + (user.compatibilityScore || 0), 0);
    return Math.round(total / users.length);
  }, [users]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Looking for a roommate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Your Avg. Match</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMatch}%</div>
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
          <FilterSidebar onFilterChange={setFilters} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between md:hidden mb-4">
            <h2 className="text-lg font-semibold">Matches ({filteredUsers.length})</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <FilterSidebar onFilterChange={setFilters} />
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
