import { recipes } from "./recipes";
import { createRecipe } from "../services/recipeService";

export async function seeds() {
  await createRecipe(recipes);
}
