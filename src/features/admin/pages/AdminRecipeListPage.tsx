import { Link } from "react-router";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import Loading from "@/components/ui/Loading";
import styles from "./AdminRecipeListPage.module.scss";

function AdminRecipeListPage() {
  const { recipes, isLoading, error, deleteRecipe } = useRecipes();

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="form-error">Impossible de charger les recettes.</p>;
  }

  return (
    <ul className={styles.list}>
      {recipes.map((r) => (
        <li key={r._id} className="d-flex align-items-center">
          <span className="flex-fill">{r.title}</span>
          <Link to={`../edit/${r._id}`} className="btn btn-primary mr-15">
            Editer
          </Link>
          <button onClick={() => handleDelete(r._id)} className="btn btn-danger">
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

export default AdminRecipeListPage;
