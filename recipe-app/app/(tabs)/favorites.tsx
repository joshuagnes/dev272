import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
// import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

// const initialState = { favorites: [] as string[] };

// function favoritesReducer(
//   state: { favorites: string[] },
//   action: { type: "add" | "remove" | "reset"; payload?: string },
// ) {
//   switch (action.type) {
//     case "add":
//       if (action.payload && !state.favorites.includes(action.payload)) {
//         return { favorites: [...state.favorites, action.payload] };
//       }
//       return state;

//     case "remove":
//       return {
//         favorites: state.favorites.filter((item) => item !== action.payload),
//       };

//     case "reset":
//       return { favorites: [] };

//     default:
//       throw new Error("Unknown action type");
//   }
// }

export default function FavoritesScreen() {
  // use the useReducer hook
  // const [state, dispatch] = useReducer(favoritesReducer, initialState);
  // const sampleItems = ["React", " Expo", "NativeWind", "Gluestack"];
  // const router = useRouter();
  // const { title } = useLocalSearchParams<{ title: string }>();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-700">
      <Box className="flex-1 p-4 m-4 items-center dark:bg-[#151718] bg-white max-h-screen-safe rounded-none">
        <VStack className="items-center space-y-4">
          <Heading size="xl">Manage Favorites</Heading>
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Favorites
          </Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
