
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function AuthForm() {
    const { user, signUpWithEmail, signInWithEmail } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const hostelId = params.hostelId;
    const requiredDomain = 'students.iiserpune.ac.in';

    const handleSuccess = async (currentUser: User, isNewUser: boolean = false) => {
      // For new email signups, always go to verification page.
      if (isNewUser && !currentUser.emailVerified) {
        router.push(`/${hostelId}/auth/verify-email`);
        return;
      }

      // For all other logins (Google, or existing email user) check for verification.
      if (!currentUser.emailVerified) {
        // This case should be handled by signInWithEmail which logs them out,
        // but as a fallback, we prevent proceeding.
        toast({ variant: "destructive", title: "Email Not Verified", description: "Please verify your email before logging in." });
        return;
      }
      
      setLoading(true);
      try {
        const profileRef = doc(db, 'users', currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          router.push(`/${hostelId}/dashboard`);
        } else {
          router.push(`/${hostelId}/profile/create`);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not verify profile. Please try again." });
        router.push(`/${hostelId}/profile/create`);
      } finally {
        setLoading(false);
      }
    };
    
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const result = await signInWithEmail(loginEmail, loginPassword);
      if (result.user) {
        await handleSuccess(result.user);
      }
      setLoading(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!signupEmail.endsWith(`@${requiredDomain}`)) {
        toast({
          variant: "destructive",
          title: "Invalid Email Domain",
          description: `You must sign up with a @${requiredDomain} email address.`,
        });
        return;
      }
      setLoading(true);
      const result = await signUpWithEmail(signupEmail, signupPassword);
       if (result.user) {
        // Pass `true` to indicate this is a new user signup
        await handleSuccess(result.user, true);
      }
      setLoading(false);
    }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </form>
      </TabsContent>
      <TabsContent value="signup">
        <form onSubmit={handleSignup} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder={`yourname@${requiredDomain}`} value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
