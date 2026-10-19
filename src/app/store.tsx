import type {
  Recipe,
  RecipeInput,
  RecipeUpdate,
} from "@/features/recipes/types";
import { create } from "zustand";
import * as recipeService from "@/features/recipes/services/recipeService";

type RecipesData = {
  recipes: Recipe[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  showWishList : boolean;
};

type RecipeActions = {
  fetchRecipe: () => Promise<void>;
  incPage: () => Promise<void>;
  updateRecipe: (recipe: RecipeUpdate) => Promise<void>;
  deleteRecipe: (_id: string) => Promise<void>;
  createRecipe: (recipe: RecipeInput) => Promise<void>;
  setShowWishList : (show : boolean) => void;
};

type RecipeState = RecipesData & RecipeActions;

export const useRecipeStore = create<RecipeState>()((set, get) => ({
  recipes: [],
  page: 1,
  hasMore: true,
  loading: false,
  showWishList : false,

  fetchRecipe: async () => {
    const page = get().page;
    set({ loading: true });
    const fetchRecipe = await recipeService.getRecipes(page, 18);
    set(({ recipes }) => ({
      recipes: [...recipes, ...fetchRecipe],
      loading: false,
      hasMore: fetchRecipe.length === 18,
    }));
  },
  incPage: async() => {
    set(({ page }) => ({ page: page + 1 }));
    await get().fetchRecipe();
  },
  updateRecipe: async (recipe: RecipeUpdate) => {
    set({ loading: true });
    const updatedRecipe = await recipeService.updateRecipe(recipe);
    set(({ recipes }) => ({
      recipes: recipes.map((r) =>
        r._id === updatedRecipe._id ? updatedRecipe : r,
      ),
      loading: false,
    }));
  },
  deleteRecipe: async (_id: string) => {
    set({ loading: true });
    await recipeService.deleteRecipe(_id);
    set(({ recipes }) => ({
      recipes: recipes.filter((r) => r._id !== _id),
      loading: false,
    }));
  },
  createRecipe: async (recipe) => {
    set({ loading: true });
    const newRecipe = await recipeService.createRecipe(recipe);
    set(({ recipes }) => ({
      recipes: [...recipes, newRecipe],
      loading: false,
    }));
  },
  setShowWishList : (showWishList) => set(({showWishList}))
}));
