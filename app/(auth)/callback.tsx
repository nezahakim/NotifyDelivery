import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

const AuthCallbackScreen: React.FC = () => {
  const params = useLocalSearchParams<{ token?: string }>();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleAuthentication = async () => {
      // Prevent multiple executions
      if (isProcessing) return;

      const token = params.token;

      if (!token) {
        router.replace('/(auth)');
        setError('No authentication token provided');
        return;
      }

      setIsProcessing(true);

      try {

        await login(token);
        router.replace('/(tabs)');

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthentication();
  }, [params.token]);

  if (error) {
    return <ErrorBanner message={error} onRetry={() => router.replace('/(auth)')} />;
  }

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white dark:bg-gray-900">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Authenticating...
      </Text>
      <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please wait while we complete your login
      </Text>
    </View>
  );
};

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry }) => (
  <View className="flex-1 justify-center items-center p-6 bg-white dark:bg-gray-900">
    <View className="bg-red-500 rounded-lg p-6 max-w-md">
      <Text className="text-white font-bold text-lg mb-2">Authentication Failed</Text>
      <Text className="text-white mb-4">{message}</Text>
      <Text 
        onPress={onRetry} 
        className="text-white font-semibold text-center py-2 bg-red-600 rounded"
      >
        Return to Login
      </Text>
    </View>
  </View>
);

export default AuthCallbackScreen;