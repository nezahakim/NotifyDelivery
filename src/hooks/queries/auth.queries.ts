// src/hooks/queries/auth.queries.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import type { User } from '../../types/auth.types';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  isAuthenticated: () => [...authKeys.all, 'is-authenticated'] as const,
  tokens: () => [...authKeys.all, 'tokens'] as const,
};

/**
 * Query to check authentication status
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authKeys.isAuthenticated(),
    queryFn: () => authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Query to get stored user data
 */
export const useStoredUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getStoredUser(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/**
 * Mutation for callback authentication flow
 */
export const useAuthCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url: string) => authService.authenticateWithCallback(url),
    onSuccess: (data: { status: any; user?: any; }) => {
      if (data.status && data.user) {
        // Update user cache
        queryClient.setQueryData(authKeys.user(), data.user);
        // Update auth status
        queryClient.setQueryData(authKeys.isAuthenticated(), true);
        // Invalidate to refetch fresh data
        queryClient.invalidateQueries({ queryKey: authKeys.all });
      }
    },
    onError: (error: any) => {
      console.error('Authentication error:', error);
      queryClient.setQueryData(authKeys.isAuthenticated(), false);
    },
  });
};

/**
 * Mutation for token refresh
 */
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = await authService.getStoredRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      return authService.getAccessToken(refreshToken);
    },
    onSuccess: (data: { status: any; }) => {
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: authKeys.tokens() });
      }
    },
  });
};

/**
 * Mutation for logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.isAuthenticated(), false);
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
    onError: (error: any) => {
      console.error('Logout error:', error);
    },
  });
};

/**
 * Query to verify current access token
 */
export const useVerifyToken = (enabled: boolean = false) => {
  const queryClient = useQueryClient();

  return useQuery<{ status: any; user?: any }>({
    queryKey: [...authKeys.tokens(), 'verify'],
    queryFn: async () => {
      const accessToken = await authService.getStoredAccessToken();
      if (!accessToken) {
        throw new Error('No access token available');
      }
      return authService.verifyAccessToken(accessToken);
    },
    enabled,
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data: { status: any; user?: any }) => {
      if (data.status && data.user) {
        queryClient.setQueryData(authKeys.user(), data.user);
      }
      return data;
    },
  });
};