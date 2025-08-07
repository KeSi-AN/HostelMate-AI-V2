'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-65.7 64.9C337 97 294.6 80 248 80c-82.3 0-149.3 67-149.3 149.3S165.7 398.7 248 398.7c47.1 0 89.6-19.8 119.9-53.5l66.2 65.5C402.2 468.2 331.6 504 248 504zM354.9 288.5c0-10.7-.9-21.3-2.5-31.5H248v-63.4h111.8c4.8 26.5 7.6 54.4 7.6 83.9 0 33.1-9.9 63.4-26.2 87.9l-67.9-52.4c14.6-13.8 23.3-33.7 23.3-56.5z"></path>
    </svg>
  );

export function AuthForm() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div className="space-y-4 py-4">
            <Button variant="outline" className="w-full">
                <GoogleIcon />
                Sign in with Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" />
            </div>
            <Button className="w-full">Login</Button>
        </div>
      </TabsContent>
      <TabsContent value="signup">
        <div className="space-y-4 py-4">
            <Button variant="outline" className="w-full">
                <GoogleIcon />
                Sign up with Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
            </div>
            <Button className="w-full">Sign Up</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
