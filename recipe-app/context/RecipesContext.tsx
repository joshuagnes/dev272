import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
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

const STORAGE_KEY = 'recipes';

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
	const { data, isFetching } = useGetRecipes();
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	// Load recipes from local storage on first mount
	useEffect(() => {
		const loadRecipes = async () => {
			try {
				const storedRecipes = await AsyncStorage.getItem(STORAGE_KEY);
				if (storedRecipes) {
					setRecipes(JSON.parse(storedRecipes));
				}
			} catch (err) {
				console.error('Failed to load recipes from storage:', err);
			}
		};

		loadRecipes();
	}, []);

	// Update local storage when Supabase data is fetched
	useEffect(() => {
		const updateRecipesFromSupabase = async () => {
			if (data && !isFetching) {
				console.log("Fetched data from Supabase: ", data);
				setRecipes(data as Recipe[]);
				try {
					await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
				} catch (err) {
					console.error('Failed to cache Supabase recipes:', err);
				}
			}
		};

		updateRecipesFromSupabase();
	}, [data, isFetching]);

	// Add a new recipe and cache it
	const addRecipe = async (newRecipe: Recipe) => {
		const updatedRecipes = [...recipes, newRecipe];
		setRecipes(updatedRecipes);
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
		} catch (err) {
			console.error('Failed to save new recipe:', err);
		}
	};

	// Update an existing recipe
	const updateRecipe = async (name: string, updatedRecipe: Partial<Recipe>) => {
		const updatedRecipes = recipes.map((recipe) =>
			recipe.name === name ? { ...recipe, ...updatedRecipe } : recipe
		);
		setRecipes(updatedRecipes);
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
		} catch (err) {
			console.error('Failed to update recipe:', err);
		}
	};

	// Toggle favorite and persist
	const toggleFavorite = async (name: string) => {
		const updatedRecipes = recipes.map((recipe) =>
			recipe.name === name
				? { ...recipe, isFavorite: !recipe.isFavorite }
				: recipe
		);
		setRecipes(updatedRecipes);
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
		} catch (err) {
			console.error('Failed to toggle favorite:', err);
		}
	};

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
