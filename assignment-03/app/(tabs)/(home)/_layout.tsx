import { Stack } from 'expo-router';
import { RecipesProvider } from '@/context/RecipesContext';

export default function HomeLayout() {
	return (
		<RecipesProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" options={{ title: 'Home' }} />
				<Stack.Screen name="[title]" options={{ title: 'Details' }} />
			</Stack>
		</RecipesProvider>
	);
}
