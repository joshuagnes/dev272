import {
	StyleSheet,
	Image,
	Platform,
	ScrollView,
	View,
	Text,
} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.subtitle}>Your favorite recipes</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	subtitle: {
		fontSize: 25,
		fontWeight: '600',
		marginBottom: 8,
		alignItems: 'center',
		textAlign: 'center',
	},
});
