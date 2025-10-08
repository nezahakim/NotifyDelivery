import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

// Simple authentication context (you can expand this)
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulate checking authentication status
      // In production, check AsyncStorage or secure storage
      checkAuthStatus();
    }, []);
  
    const checkAuthStatus = async () => {
      try {
        // Simulate API call or storage check
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock: Check if user token exists
        // const token = await AsyncStorage.getItem('userToken');
        const token = null; // Set to null to show auth screen first
        
        setIsAuthenticated(!!token);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    const signIn = async () => {
      // Mock sign in - in production, call your API
      await new Promise(resolve => setTimeout(resolve, 500));
      // await AsyncStorage.setItem('userToken', 'mock-token-123');
      setIsAuthenticated(true);
    };
  
    const signOut = async () => {
      // Mock sign out
      // await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    };
  
    return { isAuthenticated, isLoading, signIn, signOut };
  };
  
  // Protected route wrapper
  function useProtectedRoute(isAuthenticated: boolean | null) {
    const segments = useSegments();
    const router = useRouter();
  
    useEffect(() => {
      if (isAuthenticated === null) return; // Still checking
  
      const inAuthGroup = segments[0] === '(auth)';
  
      if (isAuthenticated && inAuthGroup) {
        // Redirect to auth if not authenticated
        router.replace('/(auth)');
      } else if (isAuthenticated && inAuthGroup) {
        // Redirect to home if authenticated and trying to access auth
        router.replace('/(tabs)');
      }
    }, [isAuthenticated, segments]);
  }