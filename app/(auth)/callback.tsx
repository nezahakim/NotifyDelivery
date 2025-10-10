// import React, { useEffect, useReducer, useContext } from 'react';
// import { Linking, Text, View, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router';
// import { auth_login, get_access_token, verify_access_token } from '@/src/contexts/use-auth';

// // Type definitions for AuthContext
// interface AuthState {
//   loading: boolean;
//   user: any | null; // Replace `any` with a more specific type for the user
//   error: string | null;
// }

// interface AuthAction {
//   type: 'START_AUTH' | 'SUCCESS' | 'FAILURE';
//   user?: any; // User data
//   error?: string; // Error message
// }

// const AuthContext = React.createContext<{
//   state: AuthState;
//   dispatch: React.Dispatch<AuthAction>;
// } | null>(null);

// // Reducer function for handling state changes
// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'START_AUTH':
//       return { ...state, loading: true, error: null };
//     case 'SUCCESS':
//       return { ...state, loading: false, user: action.user, error: null };
//     case 'FAILURE':
//       return { ...state, loading: false, error: action.error || 'An unknown error occurred' };
//     default:
//       return state;
//   }
// };

// interface AuthProviderProps {
//     children: React.ReactNode;
//   }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     loading: false,
//     user: null,
//     error: null,
//   });

//   return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
// };

// const AuthCallbackScreen: React.FC = () => {
//   const router = useRouter();
//   const { state, dispatch } = useContext(AuthContext)!;

//   useEffect(() => {
//     const handleUrl = async (event: { url: string }) => {
//       const { url } = event;
//       dispatch({ type: 'START_AUTH' });

//       try {
//         // Handle login
//         const data = await auth_login({ url });
//         if (!data.status) throw new Error('Login failed.');

//         // Retrieve access token
//         const accessData = await get_access_token({ token: data.refresh_token });
//         if (!accessData.status) throw new Error('Failed to retrieve access token.');

//         // Verify access token and retrieve user data
//         const userData = await verify_access_token({ access_token: accessData.access_token });
//         if (!userData.status) throw new Error('Failed to verify user.');

//         dispatch({ type: 'SUCCESS', user: userData.user });

//         // Navigate to the main screen
//         // router.replace('/(tabs)');
//         router.push('/(tabs)')
//       } catch (error: any) {
//         dispatch({ type: 'FAILURE', error: error.message });
//       }
//     };

//     // Add the URL listener
//     const subscription = Linking.addEventListener('url', handleUrl);

//     return () => {
//       // Clean up listener
//       subscription.remove();
//     };
//   }, [router, dispatch]);

//   return (
//     <View className="flex-1 justify-center items-center p-4">
//       {state.loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : state.error ? (
//         <FailedBanner message={state.error} />
//       ) : (
//         <Text className="text-lg font-bold text-green-500">All set! Redirecting...</Text>
//       )}
//     </View>
//   );
// };

// // FailedBanner component type
// const FailedBanner: React.FC<{ message: string }> = ({ message }) => (
//   <View className="bg-red-500 rounded-lg p-4">
//     <Text className="text-white font-bold">{message}. Please try again!</Text>
//   </View>
// );

// export default AuthCallbackScreen;


// app/(auth)/callback.tsx

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthCallback } from '@/src/hooks/queries/auth.queries';
import { withRequireGuest } from '@/src/hoc/withAuth';

const AuthCallbackScreen: React.FC = () => {
  const router = useRouter();
  const { mutate: authenticate, isPending, isError, error } = useAuthCallback();

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { url } = event;
      console.log('Deep link received:', url);

      // Trigger authentication flow
      authenticate(url, {
        onSuccess: (data: { status: any; user?: any; message?: string; }) => {
          if (data.status && data.user) {
            console.log('Authentication successful:', data.user);
            // Small delay for better UX
            setTimeout(() => {
              router.replace('/(tabs)');
            }, 500);
          } else {
            console.error('Authentication failed:', data.message);
          }
        },
        onError: (err: any) => {
          console.error('Authentication error:', err);
        },
      });
    };

    // Get initial URL (if app was opened via deep link)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Listen for deep links while app is open
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [authenticate, router]);

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white dark:bg-gray-900">
      {isPending ? (
        <View className="items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Authenticating...
          </Text>
          <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please wait while we verify your credentials
          </Text>
        </View>
      ) : isError ? (
        <ErrorBanner 
          message={error instanceof Error ? error.message : 'Authentication failed'} 
          onRetry={() => router.replace('/(auth)')}
        />
      ) : (
        <View className="items-center">
          <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-2xl font-bold">✓</Text>
          </View>
          <Text className="text-xl font-bold text-green-600 dark:text-green-400">
            Success!
          </Text>
          <Text className="mt-2 text-gray-600 dark:text-gray-400">
            Redirecting to your dashboard...
          </Text>
        </View>
      )}
    </View>
  );
};

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry }) => (
  <View className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 max-w-md w-full border border-red-200 dark:border-red-800">
    <View className="items-center mb-4">
      <View className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full items-center justify-center mb-3">
        <Text className="text-red-600 dark:text-red-400 text-2xl font-bold">✕</Text>
      </View>
      <Text className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">
        Authentication Failed
      </Text>
    </View>
    
    <Text className="text-sm text-red-700 dark:text-red-400 text-center mb-4">
      {message}
    </Text>
    
    <View 
      className="bg-red-600 rounded-lg py-3 px-4 active:opacity-80"
      onTouchEnd={onRetry}
    >
      <Text className="text-white font-semibold text-center">
        Try Again
      </Text>
    </View>
  </View>
);

export default withRequireGuest(AuthCallbackScreen);