import { BedDouble } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BedDouble className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold font-headline text-primary">HostelMate AI</h1>
    </div>
  );
}
