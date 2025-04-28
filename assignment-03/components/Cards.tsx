import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { HoverEffect } from 'react-native-gesture-handler';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';

interface CardProps {
	name: string;
	description: string;
	ingredients: string[];
	time: {
		prep: number;
		cook: number;
	};
	link: string;
}

const Card: React.FC<CardProps> = ({
	name,
	description,
	ingredients,
	time,
	link,
}) => {
	const backgroundColor = useThemeColor({}, 'background');
	const color = useThemeColor({}, 'text');
	const shadowColor = useThemeColor({}, 'shadowColor');
	const router = useRouter();

	const handleLinkPress = () => {
		router.push({
			pathname: '/(tabs)/(home)/[title]',
			params: { title: link },
		});
	};

	return (
		<View
			style={[
				{ backgroundColor, shadowColor, borderColor: shadowColor },
				styles.card,
			]}
		>
			<Text style={[styles.name, { color }]}>{name}</Text>
			<Text style={[styles.description, { color }]}>
				Description: {description}
			</Text>
			<Text style={[styles.ingredients, { color }]}>
				Ingredients: {ingredients.join(', ')}
			</Text>
			<Text style={[styles.time, { color }]}>
				Time: Prep {time.prep} mins, Cook {time.cook} mins
			</Text>
			<Link
				className="flex-row self-center justify-center"
				onPress={handleLinkPress}
			>
				<LinkText>See Details</LinkText>
			</Link>
			{/* <TouchableOpacity
				style={styles.button}
				onPress={() => console.log("Let's Cook!")}
			>
				<Text style={styles.buttonText}>Instructions</Text>
			</TouchableOpacity> */}
		</View>
	);
};

export default Card;

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
		marginBottom: 14,
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
