import React, { createContext, useContext, useState, ReactNode } from 'react';
import recipesData from '../data/recipes.json';

type Recipe = {
	name: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	time: {
		prep: number;
		cook: number;
	};
	link: string;
};

type RecipesContextType = {
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
	const [recipes, setRecipes] = useState<Recipe[]>(recipesData.recipes);

	return (
		<RecipesContext.Provider value={{ recipes, setRecipes }}>
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
