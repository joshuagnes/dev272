import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';
import { Card } from '@/components/ui/card';

interface CardProps {
	name: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	time: {
		prep: number;
		cook: number;
	};
	link: string;
}

const RecipeCards: React.FC<CardProps> = ({
	name,
	description,
	ingredients,
	instructions,
	time,
	link,
}) => {
	const color = useThemeColor({}, 'text');
	const router = useRouter();

	const handleLinkPress = () => {
		router.push({
			pathname: '/(tabs)/(home)/[title]',
			params: {
				title: name,
				description,
				ingredients: JSON.stringify(ingredients),
				instructions: JSON.stringify(instructions),
				prepTime: time.prep.toString(),
				cookTime: time.cook.toString(),
			},
		});
	};

	return (
		<Card size="md" variant="elevated" className="m-2 rounded-lg">
			<Text style={[styles.name, { color }]}>{name}</Text>
			<Text style={[styles.description, { color }]}>
				Description: {description}
			</Text>

			<Text style={[styles.time, { color }]}>
				Time: Prep {time.prep} mins, Cook {time.cook} mins
			</Text>
			<Text style={[styles.ingredients, { color }]}>
				{/* Ingredients: {ingredients.join(', ')} */}
			</Text>

			<Link
				className="flex-row self-center justify-center"
				onPress={handleLinkPress}
			>
				<LinkText className="bg-indigo-400 text-gray-50 rounded-xl p-2 no-underline">
					See Details
				</LinkText>
			</Link>
		</Card>
	);
};

export default RecipeCards;

const styles = StyleSheet.create({
	card: {
		padding: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
		marginBottom: 10,
		flexShrink: 1,
		flexWrap: 'wrap',
	},
	ingredients: {
		fontSize: 16,
		marginBottom: 12,
	},
	button: {
		backgroundColor: '#7777d1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 8,
		marginTop: 8,
		shadowColor: '#b1b1cc',
	},
	time: {
		fontSize: 16,
		marginBottom: 12,
	},

	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
});
