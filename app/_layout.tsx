// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import "react-native-reanimated";
// import "@/src/global.css";

// import { useColorScheme } from "@/src/hooks/use-color-scheme";
// import { AuthProvider } from "./(auth)/callback";
// import { useEffect, useState } from "react";
// import { is_user_authenticated } from "@/src/contexts/use-auth";


// export const unstable_settings = {
//   anchor: "(tabs)",
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [auth, setAuth] = useState<boolean>(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const isAuthenticated = await is_user_authenticated();
//       setAuth(isAuthenticated);
//     };
  
//     checkAuth();
//   }, [setAuth, is_user_authenticated]);


//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <AuthProvider>
//       <Stack
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         {auth ? (
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         ) : (
//           <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
//         )}
//       </Stack>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }


import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import 'react-native-reanimated';
import '@/src/global.css';

import { AuthProvider } from '@/src/contexts/AuthContext';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {

  // Create QueryClient instance with optimized config
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/callback" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
    </QueryClientProvider>
  );
}