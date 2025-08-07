'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';

// Define the shape of the context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | null>;
  signUpWithEmail: (email:string, password:string) => Promise<any>;
  signInWithEmail: (email:string, password:string) => Promise<any>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult | null>;
  verifyOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate Recaptcha
const generateRecaptcha = () => {
  if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({ variant: "destructive", title: "Sign-in Error", description: "Could not sign in with Google. Please try again." });
      return null;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error: any) {
      console.error("Error signing up: ", error);
      toast({ variant: "destructive", title: "Sign-up Error", description: error.message });
      return { error };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error: any) {
      console.error("Error signing in: ", error);
      toast({ variant: "destructive", title: "Sign-in Error", description: error.message });
      return { error };
    }
  };

  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
    try {
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error: any) {
      console.error("Error sending OTP: ", error);
      toast({ variant: "destructive", title: "SMS Error", description: error.message });
      // Reset reCAPTCHA
       if(window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then(function(widgetId) {
          // @ts-ignore
          grecaptcha.reset(widgetId);
        });
      }
      return null;
    }
  };

  const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
    try {
      const result = await confirmationResult.confirm(otp);
      return result;
    } catch (error: any) {
       console.error("Error verifying OTP: ", error);
       toast({ variant: "destructive", title: "OTP Error", description: error.message });
       return { error };
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
        toast({ variant: "destructive", title: "Logout Error", description: "Could not log out. Please try again." });
    }
  };


  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signInWithPhone,
    verifyOtp,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

// Extend the Window interface
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
