import React, { createContext, useContext, useMemo } from 'react';
import { useLogin, useLogout, useRefreshAuth, useUser } from '@/src/hooks/queries/auth.queries';
import type { AuthContextType } from '@/src/types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: user, isLoading: isUserLoading, error } = useUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshMutation = useRefreshAuth();

  const isLoading = isUserLoading || loginMutation.isPending || logoutMutation.isPending;
  const isAuthenticated = !!user;

  const login = async (token: string): Promise<void> => {
    await loginMutation.mutateAsync(token);
  };

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
  };

  const refreshAuth = async (): Promise<void> => {
    await refreshMutation.mutateAsync();
  };

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user: user || null,
      isAuthenticated,
      isLoading,
      error: (error || loginMutation.error || logoutMutation.error || refreshMutation.error) as Error | null,
      login,
      logout,
      refreshAuth,
    }),
    [user, isAuthenticated, isLoading, error, loginMutation.error, logoutMutation.error, refreshMutation.error]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};