import React, { createContext, useContext, useMemo } from 'react';
import { useIsAuthenticated, useStoredUser, useLogout, useRefreshToken } from '../hooks/queries/auth.queries';
import type { User } from '../types/auth.types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  logout: () => void;
  refreshToken: () => void;
  isLoggingOut: boolean;
  isRefreshing: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Queries
  const { 
    data: isAuthenticated = false, 
    isLoading: isCheckingAuth,
    isError: authCheckError 
  } = useIsAuthenticated();

  const { 
    data: user = null, 
    isLoading: isLoadingUser 
  } = useStoredUser();

  // Mutations
  const { 
    mutate: logout, 
    isPending: isLoggingOut 
  } = useLogout();

  const { 
    mutate: refreshToken, 
    isPending: isRefreshing 
  } = useRefreshToken();

  // Combine loading states
  const isLoading = isCheckingAuth || isLoadingUser;
  const isError = authCheckError;

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      isError,
      logout: () => logout(),
      refreshToken: () => refreshToken(),
      isLoggingOut,
      isRefreshing,
    }),
    [user, isAuthenticated, isLoading, isError, logout, refreshToken, isLoggingOut, isRefreshing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to access auth context
 * Throws error if used outside AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

/**
 * Hook to get authenticated user or null
 */
export const useAuthUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook to check if user is authenticated
 */
export const useIsUserAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};