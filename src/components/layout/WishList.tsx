import { useRecipeStore } from "@/app/store";
import styles from "./WishList.module.scss";

import { useShallow } from "zustand/shallow";
import type { Recipe } from "@/features/recipes/types";

function Wishlist({ recipes }: { recipes: Recipe[] }) {
  const { setShowWishList, updateRecipe } = useRecipeStore(
    useShallow(({ setShowWishList, updateRecipe }) => ({
      setShowWishList,
      updateRecipe,
    })),
  );
  return (
    <div onClick={() => setShowWishList(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.wishlist}>
        <h4 className="mb-20">Wishlist</h4>
        <ul>
          {recipes.length > 0 &&
            recipes.map((r) => (
              <li key={r._id} className="d-flex align-items-center mb-10">
                <span className="flex-fill mr-15">{r.title}</span>
                <button
                  onClick={() => updateRecipe({ ...r, liked: false })}
                  className="btn btn-danger"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
