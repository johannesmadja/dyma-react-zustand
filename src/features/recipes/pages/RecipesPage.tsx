import { useMemo, useState } from "react";
import styles from "./RecipesPage.module.scss";
import Recipe from "../components/Recipe";
import type { Recipe as RecipeType } from "../types";
import Loading from "@/components/ui/Loading";
import SearchBar from "@/components/ui/SearchBar";
import { useRecipeStore } from "@/app/store";
import { useShallow } from "zustand/shallow";
import Wishlist from "@/components/layout/WishList";

function RecipesPage() {
  const [filter, setFilter] = useState("");
  // const { recipes, isLoading, error, hasMore, updateRecipe, deleteRecipe } =
  //   useRecipes(page, PAGE_SIZE);

  const {
    recipes,
    loading,
    hasMore,
    updateRecipe,
    deleteRecipe,
    incPage,
    showWishList,
  } = useRecipeStore(
    useShallow(
      ({
        recipes,
        loading,
        hasMore,
        showWishList,
        updateRecipe,
        deleteRecipe,
        incPage,
      }) => ({
        recipes,
        loading,
        hasMore,
        showWishList,
        updateRecipe,
        deleteRecipe,
        incPage,
      }),
    ),
  );

  const wishedRecipes = useMemo(
    () => recipes.filter(({ liked }) => liked),
    [recipes],
  );

  async function handleLoadMore() {
    try {
      await incPage();
    } catch (error) {
      console.error(error);
    }
  }

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
    <>
      <div className="flex-fill d-flex flex-column  container p-20">
        <h1 className="my-30">Découvrez nos nouvelles recettes</h1>

        <div
          className={`p-20 flex-fill d-flex flex-column card ${styles.contentCard} `}
        >
          <SearchBar
            onSearch={(value) => setFilter(value.trim().toLowerCase())}
          />

          {loading && !recipes.length ? (
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

          {hasMore && (
            <div className="flex-row-center p-20">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn btn-primary"
              >
                Charger plus de recette
              </button>
            </div>
          )}
        </div>
      </div>

      {showWishList && <Wishlist recipes={wishedRecipes} />}
    </>
  );
}

export default RecipesPage;
