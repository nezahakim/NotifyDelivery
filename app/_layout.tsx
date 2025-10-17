import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/src/contexts/AuthContext';
import '@/src/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/callback" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
    </QueryClientProvider>
  );
}