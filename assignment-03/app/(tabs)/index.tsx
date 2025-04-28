import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	TextInput,
	Button,
} from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Cards from '@/components/Cards';
import recipes from '../../data/recipes.json';
import filter from 'lodash.filter';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';

export default function HomeScreen() {
	const [searchInput, setSearchInput] = useState('');
	const [filteredData, setFilteredData] = useState(recipes.recipes);

	const handleSearch = () => {
		if (!searchInput.trim()) {
			setFilteredData(recipes.recipes);
			return;
		}
		const formattedQuery = searchInput.toLowerCase();
		const filtered = filter(recipes.recipes, (recipe: { name: string }) =>
			recipe.name.toLowerCase().includes(formattedQuery)
		);
		setFilteredData(filtered);
	};

	const contains = (recipeName: string, query: string) => {
		return recipeName.includes(query);
	};

	const color = useThemeColor({}, 'text');
	const shadowColor = useThemeColor({}, 'shadowColor');

	return (
		<Box className="flex-1 p-4">
			<Heading className="text-3xl self-center font-bold mb-4">
				Recipes
			</Heading>
			<View
				style={[
					{ shadowColor, borderColor: shadowColor },
					styles.titleContainer,
				]}
			>
				<TextInput
					style={styles.searchInput}
					placeholder="Search for recipes..."
					clearButtonMode="always"
					placeholderTextColor="#888"
					autoCapitalize="none"
					autoCorrect={false}
					value={searchInput}
					onChangeText={(query) => {
						setSearchInput(query);
						// Handle search input
						if (query.trim() === '') {
							setFilteredData(recipes.recipes);
						}
					}}
				/>
				<View
					style={[
						{ shadowColor, borderColor: shadowColor },
						styles.button,
					]}
				>
					<Button
						onPress={handleSearch}
						title="Search"
						color="#fff"
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
			</View>

			<View style={{ flex: 1 }}>
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => <Cards {...item} />}
					ListEmptyComponent={
						<Text
							style={{
								...styles.emptyState,
								color,
							}}
						>
							Oops, no recipes found.
						</Text>
					}
					contentContainerStyle={{ paddingBottom: 100 }}
				/>
			</View>
		</Box>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 20,
		padding: 12,
	},
	// container: {
	// 	flex: 1,
	// 	padding: 16,
	// },
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	// subtitle: {
	// 	fontSize: 25,
	// 	fontWeight: '600',
	// 	marginBottom: 8,
	// 	alignItems: 'center',
	// 	textAlign: 'center',
	// },
	searchInput: {
		height: 40,
		width: '80%',
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		backgroundColor: '#f9f9f9',
	},
	button: {
		backgroundColor: '#7777d1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		shadowColor: '#b1b1cc',
	},

	emptyState: {
		textAlign: 'center',
		margin: 20,
		fontSize: 18,
		fontWeight: '600',
	},
});
