import { apiFetch } from "@/services/api";
import type { Recipe, RecipeInput, RecipeUpdate } from "../types";

// Get recipes (paginated when pageIndex and pageSize are provided)
export async function getRecipes(
  pageIndex?: number,
  pageSize?: number,
): Promise<Recipe[]> {
  let url = "/recipes";

  if (pageIndex && pageSize) {
    const queryParams = new URLSearchParams();
    queryParams.append("skip", String((pageIndex - 1) * pageSize));
    queryParams.append("limit", String(pageSize));
    queryParams.append("sort", "createdAt:-1");

    url = `/recipes?${queryParams}`;
  }

  const data = await apiFetch<Recipe | Recipe[]>(url);
  return Array.isArray(data) ? data : [data];
}

// Get recipe by id
export async function getRecipe(id: string): Promise<Recipe> {
  return apiFetch<Recipe>(`/recipes/${id}`);
}

// Create new recipe(s)
export async function createRecipe(
  recipe: RecipeInput | RecipeInput[],
): Promise<Recipe | Recipe[]> {
  return apiFetch("/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
}

// Update recipe (only the provided fields are sent)
export async function updateRecipe(recipe: RecipeUpdate): Promise<Recipe> {
  const { _id, ...restRecipe } = recipe;
  return apiFetch<Recipe>(`/recipes/${_id}`, {
    method: "PATCH",
    body: JSON.stringify(restRecipe),
  });
}

// Delete recipe
export async function deleteRecipe(id: string): Promise<void> {
  await apiFetch(`/recipes/${id}`, {
    method: "DELETE",
  });
}
