// src/hoc/withAuth.tsx

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

interface WithAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  showLoader?: boolean;
}

/**
 * Higher-Order Component for authentication protection
 * Redirects unauthenticated users and shows loading states
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = '/(auth)/index',
    requireAuth = true,
    showLoader = true,
  } = options;

  const WithAuthComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    // Show loading state
    if (isLoading && showLoader) {
      return (
        <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">
            Loading...
          </Text>
        </View>
      );
    }

    // Redirect if authentication required but user not authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo as any);
      return null;
    }

    // Redirect authenticated users away from auth pages
    if (!requireAuth && isAuthenticated) {
      router.replace('/(tabs)' as any);
      return null;
    }

    // Render the wrapped component
    return <Component {...props} user={user} />;
  };

  WithAuthComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return WithAuthComponent;
}

/**
 * HOC variant that requires authentication
 */
export function withRequireAuth<P extends object>(Component: React.ComponentType<P>) {
  return withAuth(Component, { requireAuth: true });
}

/**
 * HOC variant that requires guest (not authenticated)
 */
export function withRequireGuest<P extends object>(Component: React.ComponentType<P>) {
  return withAuth(Component, { requireAuth: false });
}