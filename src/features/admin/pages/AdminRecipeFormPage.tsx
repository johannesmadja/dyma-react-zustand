import styles from "./AdminRecipeFormPage.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLoaderData, useNavigate } from "react-router";
import { useRecipeStore } from "@/app/store";
import type { Recipe } from "@/features/recipes/types";
import { useShallow } from "zustand/shallow";

// Defined once, outside the component, so it is not rebuilt on every render
const recipeSchema = yup.object({
  title: yup
    .string()
    .required("Le titre la de la recette est obligatoire")
    .min(10, "Le titre est trop court")
    .max(30, "Le titre est trop long"),
  image: yup.string().required("L'image est obligatoire").url(),
});

type RecipeFormValues = yup.InferType<typeof recipeSchema>;

function AdminRecipeFormPage() {
  // Provided by the route loader in edit mode, undefined in add mode
  const recipe: Recipe | undefined = useLoaderData();
  const { updateRecipe, createRecipe } = useRecipeStore(
    useShallow(({ updateRecipe, createRecipe }) => ({
      updateRecipe,
      createRecipe,
    })),
  );
  const navigate = useNavigate();

  const defaultValues: RecipeFormValues = {
    title: recipe ? recipe.title : "",
    image: recipe ? recipe.image : "",
  };

  const {
    handleSubmit,
    register,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(recipeSchema) });

  async function submit(values: RecipeFormValues) {
    clearErrors();
    try {
      if (recipe) {
        await updateRecipe({ ...values, _id: recipe._id });
        navigate("/admin/recipes/list");
      } else {
        await createRecipe(values);
        reset();
      }
    } catch (e) {
      // "root.*" is the react-hook-form key for errors not tied to a field
      setError("root.generic", {
        type: "generic",
        message: `Une erreur est survenue : ${e instanceof Error ? e.message : e}`,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">
        {recipe ? "Modifier la recette" : "Ajouter une recette"}
      </h2>

      <div className="d-flex flex-column mb-20">
        <label className="mb-10" htmlFor="title">
          Titre de la recette
        </label>
        <input {...register("title")} type="text" id="title" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      <div className="d-flex flex-column mb-20">
        <label className="mb-10" htmlFor="image">
          Image pour la recette
        </label>
        <input {...register("image")} type="text" id="image" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>

      {errors.root?.generic && (
        <p className="form-error">{errors.root.generic.message}</p>
      )}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default AdminRecipeFormPage;
