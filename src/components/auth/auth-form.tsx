'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { ConfirmationResult } from 'firebase/auth';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-65.7 64.9C337 97 294.6 80 248 80c-82.3 0-149.3 67-149.3 149.3S165.7 398.7 248 398.7c47.1 0 89.6-19.8 119.9-53.5l66.2 65.5C402.2 468.2 331.6 504 248 504zM354.9 288.5c0-10.7-.9-21.3-2.5-31.5H248v-63.4h111.8c4.8 26.5 7.6 54.4 7.6 83.9 0 33.1-9.9 63.4-26.2 87.9l-67.9-52.4c14.6-13.8 23.3-33.7 23.3-56.5z"></path>
    </svg>
  );

export function AuthForm() {
    const { signInWithGoogle, signUpWithEmail, signInWithEmail, signInWithPhone, verifyOtp } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [loading, setLoading] = useState(false);

    const hostelId = params.hostelId;

    const handleSuccess = () => {
      // This will eventually check if a profile exists and redirect accordingly.
      // For now, it always goes to the create profile page.
      router.push(`/${hostelId}/profile/create`);
    };
    
    const handleGoogleSignIn = async () => {
        setLoading(true);
        await signInWithGoogle();
        handleSuccess();
        setLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const result = await signInWithEmail(loginEmail, loginPassword);
      if (!result.error) {
        handleSuccess();
      }
      setLoading(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const result = await signUpWithEmail(signupEmail, signupPassword);
      if (!result.error) {
        handleSuccess();
      }
      setLoading(false);
    }

    const handlePhoneSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await signInWithPhone(phone);
        if (result) {
            setConfirmationResult(result);
            toast({ title: "OTP Sent", description: "Please check your phone for the verification code." });
        }
        setLoading(false);
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (confirmationResult) {
            const result = await verifyOtp(confirmationResult, otp);
             if (!result.error) {
                handleSuccess();
            }
        }
        setLoading(false);
    }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="phone">Phone</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4 py-4">
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn} disabled={loading}>
                <GoogleIcon />
                {loading ? 'Signing in...' : 'Sign in with Google'}
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
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn} disabled={loading}>
                <GoogleIcon />
                {loading ? 'Signing up...' : 'Sign up with Google'}
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
                <Input id="signup-email" type="email" placeholder="m@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
        </form>
      </TabsContent>
      <TabsContent value="phone">
        {!confirmationResult ? (
            <form onSubmit={handlePhoneSignIn} className="space-y-4 py-4">
                 <div id="recaptcha-container"></div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 XXXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</Button>
            </form>
        ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input id="otp" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</Button>
            </form>
        )}
      </TabsContent>
    </Tabs>
  );
}
