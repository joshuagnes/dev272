import { Recipe } from '@/context/RecipesContext';
import { supabase } from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useAddRecipe = () => {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newRecipe: Recipe): Promise<Recipe> => {
            const { data, error } = await supabase
                .from('recipes')
                .insert(newRecipe)
                .select()
                .single()

            if (error) throw new Error(error.message);
            return data;
        },

        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ['recipes'] })
        }
    })
}