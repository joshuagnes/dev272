import React, { createContext, useContext, useState, ReactNode } from 'react';
import recipesData from '../data/recipes.json';

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
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
	addRecipe: (recipe: Recipe) => void;
	updateRecipe: (name: string, updatedRecipe: Partial<Recipe>) => void;
	toggleFavorite: (name: string) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
	const [recipes, setRecipes] = useState<Recipe[]>(recipesData.recipes);

	// Add a new recipe
	const addRecipe = (recipe: Recipe) => {
		setRecipes((prev) => [...prev, recipe]);
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

	return (
		<RecipesContext.Provider
			value={{
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
