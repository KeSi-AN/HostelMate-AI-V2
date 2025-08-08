
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { useDebounce } from '@/hooks/use-debounce';

export type FilterState = {
    search: string;
    years: string[];
    branches: string[];
    matchPercentage: number;
    sortBy: string;
};

type FilterSidebarProps = {
    onFilterChange: (filters: FilterState) => void;
};

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        years: [],
        branches: [],
        matchPercentage: 50,
        sortBy: 'match-desc',
    });
    
    const debouncedSearch = useDebounce(filters.search, 300);

    useEffect(() => {
        // We use a debounced search term to avoid excessive re-renders on every keystroke
        onFilterChange({...filters, search: debouncedSearch});
    }, [debouncedSearch, filters.years, filters.branches, filters.matchPercentage, filters.sortBy, onFilterChange]);


    const handleYearChange = (year: UserProfile['yearOfStudy'], checked: boolean) => {
        if (!year) return;
        setFilters(prev => ({
            ...prev,
            years: checked ? [...prev.years, year] : prev.years.filter(y => y !== year),
        }));
    };

    const handleBranchChange = (branch: UserProfile['branch'], checked: boolean) => {
        if (!branch) return;
        setFilters(prev => ({
            ...prev,
            branches: checked ? [...prev.branches, branch] : prev.branches.filter(b => b !== branch),
        }));
    };
    
    const handleSliderChange = (value: number[]) => {
        setFilters(prev => ({ ...prev, matchPercentage: value[0] }));
    }
    
    const handleSortChange = (value: string) => {
        setFilters(prev => ({ ...prev, sortBy: value }));
    }
    
    const handleReset = () => {
        setFilters({
            search: '',
            years: [],
            branches: [],
            matchPercentage: 0,
            sortBy: 'match-desc',
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name..." 
                        className="pl-8" 
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                </div>

                <div>
                    <Label className="font-semibold">Year of Study</Label>
                    <div className="space-y-2 mt-2">
                        {['Freshman', 'Sophomore', 'Junior', 'Senior'].map(year => (
                            <div key={year} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`year-${year}`} 
                                    checked={filters.years.includes(year)}
                                    onCheckedChange={(checked) => handleYearChange(year as UserProfile['yearOfStudy'], !!checked)}
                                />
                                <Label htmlFor={`year-${year}`} className="font-normal">{year}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <Label className="font-semibold">Branch</Label>
                    <div className="space-y-2 mt-2">
                        {['ECS', 'HSS', 'Mathematics', 'Physics', 'Biology', 'Data Science', 'Interdisciplinary'].map(branch => (
                            <div key={branch} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`branch-${branch}`} 
                                    checked={filters.branches.includes(branch)}
                                    onCheckedChange={(checked) => handleBranchChange(branch as UserProfile['branch'], !!checked)}
                                />
                                <Label htmlFor={`branch-${branch}`} className="font-normal">{branch}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <Label htmlFor="match-percentage" className="font-semibold">Min. Match: {filters.matchPercentage}%</Label>
                    <Slider 
                        id="match-percentage" 
                        value={[filters.matchPercentage]} 
                        max={100} 
                        step={1} 
                        className="mt-2" 
                        onValueChange={handleSliderChange}
                    />
                </div>

                <div>
                    <Label className="font-semibold">Sort By</Label>
                    <Select value={filters.sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select sort option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="match-desc">Highest Match %</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="same-year">Same Year</SelectItem>
                            <SelectItem value="same-branch">Same Branch</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" onClick={handleReset}>
                        <X className="mr-2 h-4 w-4" />
                        Reset All Filters
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
