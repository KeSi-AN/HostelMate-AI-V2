
'use client';

import Link from "next/link";
import {
  Bell,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "../logo";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type HeaderProps = {
    hostelName: string;
}

export function Header({ hostelName }: HeaderProps) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user: currentUser, logout } = useAuth();
  const hostelId = params.hostelId;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  const getProfileLink = (segment: string) => `/${hostelId}/${segment}`;

  if (!currentUser) {
    return null;
  }
  
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={getProfileLink('dashboard')}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo />
        </Link>
        <h2 className="text-muted-foreground transition-colors hover:text-foreground">
          {hostelName}
        </h2>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Image 
                src="https://placehold.co/40x40.png"
                width={40}
                height={40}
                alt="User Avatar"
                className="rounded-full"
                data-ai-hint="profile picture"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={getProfileLink('profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href={getProfileLink('profile/edit')}>
                 <Settings className="mr-2 h-4 w-4" />
                 <span>Edit Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
