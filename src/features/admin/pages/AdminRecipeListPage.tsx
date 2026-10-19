import { Link } from "react-router";
import Loading from "@/components/ui/Loading";
import styles from "./AdminRecipeListPage.module.scss";
import { useRecipeStore } from "@/app/store";
import { useShallow } from "zustand/shallow";

function AdminRecipeListPage() {
  const { recipes, loading, deleteRecipe } = useRecipeStore(
    useShallow(({ recipes, loading, deleteRecipe }) => ({
      recipes,
      loading,
      deleteRecipe,
    })),
  );

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return <p className="form-error">Impossible de charger les recettes.</p>;
  // }

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
