import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { EditIcon } from "@/components/ui/icon";

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Box className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="heart.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <Fab
        size="lg"
        className="bottom-32 dark:bg-zinc-700"
        onPress={() => router.navigate("/add-recipe")}
      >
        <FabIcon as={EditIcon} color="white" />
      </Fab>
    </Box>
  );
}
