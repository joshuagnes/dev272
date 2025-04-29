import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, ScrollView, Text } from 'react-native';
import { useRecipes } from '@/context/RecipesContext';

export default function DetailsScreen() {
	const router = useRouter();
	const { title } = useLocalSearchParams<{ title?: string }>();
	const { recipes } = useRecipes();

	const recipe = recipes.find((r) => r.name === title);

	if (!recipe) {
		return (
			<Box className="flex-1 justify-center items-center">
				<Heading size="lg">Recipe Not Found</Heading>
				<Button title="Go Back" onPress={() => router.back()} />
			</Box>
		);
	}

	const instructionsList =
		recipe.instructions.length > 0
			? recipe.instructions
					.map((step, index) => `${index + 1}. ${step}`)
					.join('\n')
			: 'No instructions provided';

	return (
		<Box className="flex-1 bg-gray-50 p-4">
			<ScrollView className="flex-1">
				<Heading size="xl" className="self-center mb-6">
					{recipe.name}
				</Heading>
				<Box className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Description:
					</Heading>
					<Text className="mb-3">{recipe.description}</Text>

					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Ingredients:
					</Heading>
					<Text className="mb-3">
						{recipe.ingredients.join(', ')}
					</Text>

					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Instructions:
					</Heading>
					<Text className="mb-3">{instructionsList}</Text>

					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Time:
					</Heading>
					<Text>
						Prep {recipe.time.prep} mins, Cook {recipe.time.cook}{' '}
						mins
					</Text>

					<Button
						color="#7777d1"
						title="Go Back"
						onPress={() => router.back()}
					/>
				</Box>
			</ScrollView>
		</Box>
	);
}
