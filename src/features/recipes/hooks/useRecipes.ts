import { useEffect, useState } from "react";
import * as recipeService from "../services/recipeService";
import type { Recipe, RecipeUpdate } from "../types";

export function useRecipes(pageIndex?: number, pageSize?: number) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchRecipes() {
      try {
        setIsLoading(true);
        setError(null);
        const newRecipes = await recipeService.getRecipes(pageIndex, pageSize);
        if (!ignore) {
          setRecipes((x) => [...x, ...newRecipes]);
          // A page shorter than pageSize means it was the last one
          setHasMore(Boolean(pageSize) && newRecipes.length === pageSize);
        }
      } catch (e) {
        console.error(e);
        if (!ignore) {
          setError(e instanceof Error ? e : new Error(String(e)));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchRecipes();
    return () => {
      ignore = true;
    };
  }, [pageIndex, pageSize]);

  // Call the API, then sync the local list. Errors are thrown to the caller.
  async function updateRecipe(recipe: RecipeUpdate) {
    const updatedRecipe = await recipeService.updateRecipe(recipe);
    setRecipes((x) =>
      x.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r)),
    );
  }

  async function deleteRecipe(id: string) {
    await recipeService.deleteRecipe(id);
    setRecipes((x) => x.filter((r) => r._id !== id));
  }

  return { recipes, isLoading, error, hasMore, updateRecipe, deleteRecipe };
}
