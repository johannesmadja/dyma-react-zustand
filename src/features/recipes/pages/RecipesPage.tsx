import { useState } from "react";
import styles from "./RecipesPage.module.scss";
import Recipe from "../components/Recipe";
import { useRecipes } from "../hooks/useRecipes";
import type { Recipe as RecipeType } from "../types";
import Loading from "@/components/ui/Loading";
import SearchBar from "@/components/ui/SearchBar";

const PAGE_SIZE = 18;

function RecipesPage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const { recipes, isLoading, error, hasMore, updateRecipe, deleteRecipe } =
    useRecipes(page, PAGE_SIZE);

  async function handleToggleLike(recipe: RecipeType) {
    try {
      await updateRecipe({ _id: recipe._id, liked: !recipe.liked });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex-fill d-flex flex-column  container p-20">
      <h1 className="my-30">Découvrez nos nouvelles recettes</h1>

      <div
        className={`p-20 flex-fill d-flex flex-column card ${styles.contentCard} `}
      >
        <SearchBar onSearch={(value) => setFilter(value.trim().toLowerCase())} />

        {error && (
          <p className="form-error">Impossible de charger les recettes.</p>
        )}

        {isLoading && !recipes.length ? (
          <Loading />
        ) : (
          <div className={`${styles.grid}`}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  onToggleLike={() => handleToggleLike(r)}
                  onDelete={() => handleDelete(r._id)}
                />
              ))}
          </div>
        )}

        {hasMore && !error && (
          <div className="flex-row-center p-20">
            <button
              onClick={() => setPage(page + 1)}
              disabled={isLoading}
              className="btn btn-primary"
            >
              Charger plus de recette
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;
