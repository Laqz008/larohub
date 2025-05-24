'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { apiClient } from '@/lib/api';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initializeAuth, tokens } = useAuthStore();

  useEffect(() => {
    // Initialize authentication on app start
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Set up API client with token when available
    if (tokens?.accessToken) {
      apiClient.setAuthToken(tokens.accessToken);
    }
  }, [tokens]);

  return <>{children}</>;
}
