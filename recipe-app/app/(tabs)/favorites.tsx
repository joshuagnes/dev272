import { StyleSheet, Image, Platform, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Box } from '@/components/ui/box';

export default function TabTwoScreen() {
	return (
		<ScrollView>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Explore</ThemedText>
			</ThemedView>
			<ThemedText>
				This app includes example code to help you get started.
			</ThemedText>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
