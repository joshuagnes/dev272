import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import recipesData from '../data/recipes.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetRecipes } from '@/hooks/useGetRecipes';

export type Recipe = {
	name: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	time: {
		prep: number;
		cook: number;
	};
	isFavorite?: boolean;
	rating: number;
};

type RecipesContextType = {
	isLoading: boolean;
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
	addRecipe: (recipe: Recipe) => void;
	updateRecipe: (name: string, updatedRecipe: Partial<Recipe>) => void;
	toggleFavorite: (name: string) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
	const { data, isFetching } = useGetRecipes();
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const loadRecipes = async () => {
			try {
				const storedRecipes = await AsyncStorage.getItem('recipes');
				if (storedRecipes) {
					setRecipes(JSON.parse(storedRecipes));
				}
			} catch (err) {
				console.error('Failed to load recipes:', err);
			}
		};

		loadRecipes();
	}, []);

	// Add a new recipe
	// const addRecipe = (newRecipe: Recipe) => {
	// 	setRecipes((prev) => [...prev, newRecipe]);
	// };

	const addRecipe = async (newRecipe: Recipe) => {
		const updatedRecipes = [...recipes, newRecipe];
		setRecipes((prev) => [...prev, newRecipe]);

		try {
			await AsyncStorage.setItem(
				'recipes',
				JSON.stringify(updatedRecipes)
			);
		} catch (err) {
			console.error('Failed to save recipe:', err);
		}
	};

	// Update an existing recipe by name
	const updateRecipe = (name: string, updatedRecipe: Partial<Recipe>) => {
		setRecipes((prev) =>
			prev.map((recipe) =>
				recipe.name === name ? { ...recipe, ...updatedRecipe } : recipe
			)
		);
	};

	// Toggle a recipe's favorite status
	const toggleFavorite = (name: string) => {
		setRecipes((prev) =>
			prev.map((recipe) =>
				recipe.name === name
					? { ...recipe, isFavorite: !recipe.isFavorite }
					: recipe
			)
		);
	};

	useEffect(() => {
		if (data && !isFetching) {
			console.log("Fetched data: ", data);
			setRecipes(data as Recipe[])
		}
		if (isFetching) {
			console.log("Fetching data...");
		}

	}, [data, isFetching])

	return (
		<RecipesContext.Provider
			value={{
				isLoading: isFetching,
				recipes,
				setRecipes,
				addRecipe,
				updateRecipe,
				toggleFavorite,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
};

export const useRecipes = () => {
	const context = useContext(RecipesContext);
	if (!context) {
		throw new Error('useRecipes must be used within a RecipesProvider');
	}
	return context;
};
