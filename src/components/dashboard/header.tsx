'use client';

import Link from "next/link";
import {
  Bell,
  Home,
  Package2,
  Settings,
  User,
  LogOut,
  UserPlus
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { useParams } from "next/navigation";

type HeaderProps = {
    hostelName: string;
}

export function Header({ hostelName }: HeaderProps) {
  const params = useParams();
  const hostelId = params.hostelId;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={`/${hostelId}/dashboard`}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo />
        </Link>
        <h2 className="text-muted-foreground transition-colors hover:text-foreground">
          {hostelName}
        </h2>
      </nav>
      {/* Mobile menu could be added here */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search bar can be added here */}
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${hostelId}/profile`}>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href={`/${hostelId}/profile/edit`}>
                 <Settings className="mr-2 h-4 w-4" />
                 <span>Edit Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${hostelId}/profile/create`}>
                 <UserPlus className="mr-2 h-4 w-4" />
                 <span>Create Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
