'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function FilterSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name..." className="pl-8" />
        </div>

        <div>
          <Label className="font-semibold">Year of Study</Label>
          <div className="space-y-2 mt-2">
            {['Freshman', 'Sophomore', 'Junior', 'Senior'].map(year => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox id={`year-${year}`} />
                <Label htmlFor={`year-${year}`} className="font-normal">{year}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="font-semibold">Branch</Label>
          <div className="space-y-2 mt-2">
            {['ECS', 'HSS', 'Mathematics', 'Physics', 'Biology'].map(branch => (
              <div key={branch} className="flex items-center space-x-2">
                <Checkbox id={`branch-${branch}`} />
                <Label htmlFor={`branch-${branch}`} className="font-normal">{branch}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="match-percentage" className="font-semibold">Match Percentage</Label>
          <Slider id="match-percentage" defaultValue={[50]} max={100} step={1} className="mt-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <Label className="font-semibold">Sort By</Label>
          <Select defaultValue="match-desc">
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

        <div className="flex flex-col space-y-2">
            <Button>Apply Filters</Button>
            <Button variant="ghost">Reset All</Button>
        </div>
      </CardContent>
    </Card>
  );
}
