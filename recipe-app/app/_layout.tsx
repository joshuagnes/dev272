import "@/global.css";
import {
  GluestackUIProvider,
  ModeType,
} from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, createContext } from "react";
import "react-native-reanimated";
import { RecipesProvider } from "@/context/RecipesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { AppState } from "react-native";

// prevent splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type ThemeContextType = {
  colorMode: ModeType;
  toggleColorMode: (mode: ModeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => { },
});

const queryClient = new QueryClient();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ModeType>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // handel initial supabase auth
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const autoSignin = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@dev.com",
        password: "testtest",
      });
      if (error) {
        console.log("Error signing in: ", error);
      } else {
        setIsAuthenticated(true);
        console.log("Signed in use: ", data);
      }
    };
    autoSignin();
  }, [isAuthenticated]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorMode}>
        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
          <RecipesProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </RecipesProvider>
        </ThemeContext.Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
