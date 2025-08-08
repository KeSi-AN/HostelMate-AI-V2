'use client';

import { useContext } from 'react';
import { AuthContext, AuthContextType } from './auth-provider';

export const useAuth = (): Omit<AuthContextType, 'signInWithGoogle'> => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
