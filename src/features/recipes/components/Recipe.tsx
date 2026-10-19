import type { MouseEvent } from "react";
import styles from "./Recipe.module.scss";
import type { Recipe as RecipeType } from "../types";

interface RecipeProps {
  recipe: RecipeType;
  onToggleLike: () => void;
  onDelete: () => void;
}

function Recipe({ recipe, onToggleLike, onDelete }: RecipeProps) {
  function handleClickDelete(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <div onClick={onToggleLike} className={styles.recipe}>
      <span
        onClick={handleClickDelete}
        className={`material-symbols-outlined ${styles.close}`}
      >
        close
      </span>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>

      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <span
          className={`material-symbols-outlined ${recipe.liked ? "text-primary" : ""}`}
        >
          favorite
        </span>
      </div>
    </div>
  );
}

export default Recipe;
