import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import '@/global.css';
import {
	GluestackUIProvider,
	ModeType,
} from '@/components/ui/gluestack-ui-provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

type ThemeContextType = {
	colorMode: ModeType;
	toggleColorMode: (mode: ModeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
	colorMode: 'light',
	toggleColorMode: () => {},
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [colorMode, setColorMode] = useState<ModeType>('light');

	const toggleColorMode = async () => {
		setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GluestackUIProvider mode={colorMode}>
			<ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeContext.Provider>
		</GluestackUIProvider>
	);
}
