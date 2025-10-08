import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "@/src/global.css";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { AuthProvider } from "./(auth)/callback";
import { useEffect, useState } from "react";
import { is_user_authenticated } from "@/src/contexts/use-auth";


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await is_user_authenticated();
      setAuth(isAuthenticated);
    };
  
    checkAuth();
  }, [setAuth, is_user_authenticated]);


  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {auth ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
