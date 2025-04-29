import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, ScrollView, Text, View } from 'react-native';

export default function DetailsScreen() {
	const router = useRouter();
	const {
		title,
		description,
		ingredients,
		instructions,
		prepTime,
		cookTime,
	} = useLocalSearchParams<{
		title?: string;
		description?: string;
		ingredients?: string;
		instructions?: string;
		prepTime?: string;
		cookTime?: string;
	}>();

	const ingredientsArray = ingredients ? JSON.parse(ingredients) : [];
	const instructionsArray = instructions ? JSON.parse(instructions) : [];
	const instructionsList =
		instructionsArray.length > 0
			? instructionsArray
					.map(
						(instruction: any, index: number) =>
							`${index + 1}. ${instruction}`
					)
					.join('\n')
			: 'No instructions provided';

	return (
		<Box className="flex-1 bg-gray-50 p-4">
			<ScrollView className="flex-1">
				<Heading size="xl" className="self-center mb-6">
					{title || 'No Title Provided'}
				</Heading>
				<Box className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Description:
					</Heading>
					<Text className="mb-3">{description}</Text>
					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Ingredients:
					</Heading>
					<Text className="mb-3">{ingredientsArray.join(', ')}</Text>
					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Istructions:
					</Heading>
					<Text className="mb-3">{instructionsList}</Text>
					<Heading
						size="md"
						className="text-gray-700 font-semibold mb-3"
					>
						Time:
					</Heading>
					<Text>
						Prep {prepTime} mins, Cook {cookTime} mins
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
