import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that protects routes based on authentication status
 * Automatically redirects users to appropriate screens
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Redirect authenticated users away from auth screens
    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }

    // Redirect unauthenticated users to auth screens
    if (!isAuthenticated && inTabsGroup) {
      router.replace('/(auth)');
    }
  }, [isAuthenticated, segments, isLoading, router]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Loading...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};