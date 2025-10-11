import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/src/services/auth.service';
import type { User } from '@/src/types/auth.types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  status: () => [...authKeys.all, 'status'] as const,
};

/**
 * Hook to get current user
 */
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => AuthService.getStoredUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
};

/**
 * Hook to check authentication status
 */
export const useAuthStatus = () => {
  return useQuery({
    queryKey: authKeys.status(),
    queryFn: () => AuthService.isAuthenticated(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to handle login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const result = await AuthService.authenticateUser(token);
      
      if (!result.status || !result.user) {
        throw new Error(result.message || 'Authentication failed');
      }
      
      return result.user;
    },
    onSuccess: (user: User) => {
      // Update user cache
      queryClient.setQueryData(authKeys.user(), user);
      // Update auth status
      queryClient.setQueryData(authKeys.status(), true);
    },
    onError: () => {
      // Clear cache on error
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.status(), false);
    },
  });
};

/**
 * Hook to handle logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AuthService.clearAuth();
    },
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.status(), false);
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
};

/**
 * Hook to refresh authentication
 */
export const useRefreshAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const tokens = await AuthService.getStoredTokens();
      
      if (!tokens.refreshToken) {
        throw new Error('No refresh token available');
      }

      const accessTokenResult = await AuthService.getAccessToken(tokens.refreshToken);
      
      if (!accessTokenResult.status || !accessTokenResult.access_token) {
        throw new Error(accessTokenResult.message || 'Failed to refresh token');
      }

      const verifyResult = await AuthService.verifyAccessToken(accessTokenResult.access_token);
      
      if (!verifyResult.status || !verifyResult.user) {
        throw new Error(verifyResult.message || 'Failed to verify token');
      }

      return verifyResult.user;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(authKeys.user(), user);
      queryClient.setQueryData(authKeys.status(), true);
    },
    onError: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.status(), false);
    },
  });
};