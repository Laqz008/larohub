// Authentication store using Zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';
import { authService, apiClient } from '@/lib/api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds from now
  expiresAt?: number; // timestamp when token expires
  tokenType?: string;
}

interface AuthState {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearAuth: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user: User) => {
        set({ user, isAuthenticated: true, error: null });
      },

      setTokens: (tokens: AuthTokens) => {
        // Calculate expiry timestamp
        const expiresAt = Date.now() + (tokens.expiresIn * 1000);
        const tokensWithExpiry = { ...tokens, expiresAt };

        set({ tokens: tokensWithExpiry });
        // Set the token in the API client
        apiClient.setAuthToken(tokens.accessToken);
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      login: async (email: string, password: string) => {
        const { setUser, setTokens, setLoading, setError } = get();

        try {
          setLoading(true);
          setError(null);

          const response = await authService.login({ email, password });

          if (response.success && response.data) {
            setUser(response.data.user);
            setTokens(response.data.tokens);
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          setError(error.message || 'Login failed');
          throw error;
        } finally {
          setLoading(false);
        }
      },

      register: async (userData: any) => {
        const { setUser, setTokens, setLoading, setError } = get();

        try {
          setLoading(true);
          setError(null);

          const response = await authService.register(userData);

          if (response.success && response.data) {
            setUser(response.data.user);
            setTokens(response.data.tokens);
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: any) {
          setError(error.message || 'Registration failed');
          throw error;
        } finally {
          setLoading(false);
        }
      },

      logout: async () => {
        const { clearAuth, setLoading, setError } = get();

        try {
          setLoading(true);
          setError(null);

          await authService.logout();
        } catch (error: any) {
          console.error('Logout error:', error);
          // Continue with local logout even if server logout fails
        } finally {
          clearAuth();
          setLoading(false);
        }
      },

      refreshToken: async () => {
        const { tokens, setTokens, clearAuth, setError } = get();

        if (!tokens?.refreshToken) {
          clearAuth();
          return;
        }

        try {
          const response = await authService.refreshToken(tokens.refreshToken);

          if (response.success && response.data) {
            const newTokens = {
              ...tokens,
              accessToken: response.data.accessToken,
              expiresIn: response.data.expiresIn,
            };
            setTokens(newTokens);
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error: any) {
          console.error('Token refresh error:', error);
          setError('Session expired. Please login again.');
          clearAuth();
          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const { user, setUser, setLoading, setError } = get();

        if (!user) {
          throw new Error('No user logged in');
        }

        try {
          setLoading(true);
          setError(null);

          const response = await authService.updateProfile(data);

          if (response.success && response.data) {
            setUser(response.data);
          } else {
            throw new Error(response.message || 'Profile update failed');
          }
        } catch (error: any) {
          setError(error.message || 'Profile update failed');
          throw error;
        } finally {
          setLoading(false);
        }
      },

      clearAuth: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          error: null,
        });
        apiClient.clearAuthToken();
      },

      initializeAuth: async () => {
        const { tokens, refreshToken, clearAuth, setLoading } = get();

        if (!tokens?.accessToken) {
          return;
        }

        try {
          setLoading(true);

          // Set the token in the API client
          apiClient.setAuthToken(tokens.accessToken);

          // Check if token is expired
          const now = Date.now();
          const tokenExpiry = tokens.expiresAt || 0;

          if (now >= tokenExpiry) {
            // Token is expired, try to refresh
            await refreshToken();
          } else {
            // Token is still valid, get current user
            try {
              const response = await authService.getCurrentUser();
              if (response.success && response.data) {
                set({ user: response.data, isAuthenticated: true });
              } else {
                clearAuth();
              }
            } catch (error) {
              console.error('Failed to get current user:', error);
              clearAuth();
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          clearAuth();
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'laro-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Auto-refresh token before expiry
let refreshTimer: NodeJS.Timeout | null = null;

export const setupTokenRefresh = () => {
  const { tokens, refreshToken } = useAuthStore.getState();

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  if (tokens?.expiresAt) {
    const now = Date.now();
    const expiryTime = tokens.expiresAt;
    const refreshTime = expiryTime - now - 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (refreshTime > 0) {
      refreshTimer = setTimeout(() => {
        refreshToken().catch(console.error);
      }, refreshTime);
    }
  }
};

// Subscribe to token changes to setup auto-refresh
useAuthStore.subscribe(
  (state) => state.tokens,
  (tokens) => {
    if (tokens) {
      setupTokenRefresh();
    } else if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  }
);
