import { View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import RecipeCards from '@/components/RecipeCards';
import filter from 'lodash.filter';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useRecipes } from '@/context/RecipesContext';
import { InputField, InputIcon, Input } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import 'react-native-get-random-values';

export default function HomeScreen() {
	const [searchInput, setSearchInput] = useState('');
	const { recipes } = useRecipes();
	const [filteredData, setFilteredData] = useState(recipes);

	const handleSearch = () => {
		if (!searchInput.trim()) {
			setFilteredData(recipes);
			return;
		}
		const formattedQuery = searchInput.toLowerCase();
		const filtered = filter(recipes, (recipe: { name: string }) =>
			recipe.name.toLowerCase().includes(formattedQuery)
		);
		setFilteredData(filtered);
	};

	// Listen for changes in restaurant data
	useEffect(() => {
		if (searchInput === '') {
			setFilteredData(recipes);
		} else {
			const filtered = filter(recipes, (recipe: { name: string }) =>
				recipe.name.toLowerCase().includes(searchInput)
			);
			setFilteredData(filtered);
		}
	}, [recipes]);

	return (
		<Box className="flex-1 p-4 dark:bg-zinc-800">
			<Heading className="text-3xl self-center mb-4">Recipes</Heading>
			<View className="flex-row items-center space-x-2 mb-4">
				<Input
					variant="outline"
					size="md"
					className="bg-white dark:bg-zinc-900 w-80"
				>
					<InputField
						className="text-lg"
						placeholder="Search for recipes..."
						value={searchInput}
						onChangeText={(query) => {
							setSearchInput(query);
							if (query.trim() === '') {
								setFilteredData(recipes);
							}
						}}
					/>
				</Input>

				<Button
					onPress={handleSearch}
					accessibilityLabel="Search recipes"
					className="px-4 mx-2 bg-indigo-500"
				>
					<ButtonText>Search</ButtonText>
				</Button>
			</View>

			<View>
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => <RecipeCards {...item} />}
					ListEmptyComponent={
						<Text className="text-center text-2xl p-4 text-gray-600 font-semibold">
							Oops, no recipes found.
						</Text>
					}
					contentContainerStyle={{ paddingBottom: 200 }}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</Box>
	);
}
