import React, { useEffect, useReducer, useContext } from 'react';
import { Linking, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth_login, get_access_token, verify_access_token } from '@/src/contexts/use-auth';

// Type definitions for AuthContext
interface AuthState {
  loading: boolean;
  user: any | null; // Replace `any` with a more specific type for the user
  error: string | null;
}

interface AuthAction {
  type: 'START_AUTH' | 'SUCCESS' | 'FAILURE';
  user?: any; // User data
  error?: string; // Error message
}

const AuthContext = React.createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

// Reducer function for handling state changes
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'START_AUTH':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, user: action.user, error: null };
    case 'FAILURE':
      return { ...state, loading: false, error: action.error || 'An unknown error occurred' };
    default:
      return state;
  }
};

interface AuthProviderProps {
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: false,
    user: null,
    error: null,
  });

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

const AuthCallbackScreen: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext)!;

  useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
      const { url } = event;
      dispatch({ type: 'START_AUTH' });

      try {
        // Handle login
        const data = auth_login({ url });
        if (!data.status) throw new Error('Login failed.');

        // Retrieve access token
        const accessData = await get_access_token({ token: data.refresh_token });
        if (!accessData.status) throw new Error('Failed to retrieve access token.');

        // Verify access token and retrieve user data
        const userData = await verify_access_token({ access_token: accessData.access_token });
        if (!userData.status) throw new Error('Failed to verify user.');

        dispatch({ type: 'SUCCESS', user: userData.user });

        // Navigate to the main screen
        router.replace('/(tabs)');
      } catch (error: any) {
        dispatch({ type: 'FAILURE', error: error.message });
      }
    };

    // Add the URL listener
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      // Clean up listener
      subscription.remove();
    };
  }, [router, dispatch]);

  return (
    <View className="flex-1 justify-center items-center p-4">
      {state.loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : state.error ? (
        <FailedBanner message={state.error} />
      ) : (
        <Text className="text-lg font-bold text-green-500">All set! Redirecting...</Text>
      )}
    </View>
  );
};

// FailedBanner component type
const FailedBanner: React.FC<{ message: string }> = ({ message }) => (
  <View className="bg-red-500 rounded-lg p-4">
    <Text className="text-white font-bold">{message}. Please try again!</Text>
  </View>
);
