
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';

// Define the shape of the context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email:string, password:string) => Promise<any>;
  signInWithEmail: (email:string, password:string) => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email
      await sendEmailVerification(userCredential.user);
      toast({ title: "Verification Email Sent", description: "Please check your inbox to verify your email address." });
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
      if (!userCredential.user.emailVerified) {
        toast({ variant: "destructive", title: "Email Not Verified", description: "Please verify your email address before logging in. Check your inbox." });
        await signOut(auth); // Sign out the user
        return { error: { message: "Email not verified." } };
      }
      return userCredential;
    } catch (error: any) {
      console.error("Error signing in: ", error);
      toast({ variant: "destructive", title: "Sign-in Error", description: error.message });
      return { error };
    }
  };

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
    signUpWithEmail,
    signInWithEmail,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
