import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

interface WithAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * HOC to protect routes that require authentication
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = '/(auth)/index', requireAuth = true } = options;

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
      if (isLoading) return;

      const inAuthGroup = segments[0] === '(auth)';

      if (requireAuth && !isAuthenticated && !inAuthGroup) {
        // Redirect to auth if not authenticated and not already in auth
        router.replace(redirectTo as any);
      } else if (!requireAuth && isAuthenticated && inAuthGroup) {
        // Redirect to main app if authenticated and in auth group
        router.replace('/(tabs)' as any);
      }
    }, [isAuthenticated, isLoading, segments]);

    if (isLoading) {
      return (
        <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">Loading...</Text>
        </View>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * HOC for protected routes (requires authentication)
 */
export const withProtectedRoute = <P extends object>(Component: React.ComponentType<P>) =>
  withAuth(Component, { requireAuth: true });

/**
 * HOC for public routes (redirects if authenticated)
 */
export const withPublicRoute = <P extends object>(Component: React.ComponentType<P>) =>
  withAuth(Component, { requireAuth: false });