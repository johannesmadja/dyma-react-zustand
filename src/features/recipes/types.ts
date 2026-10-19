// A recipe as returned by the API
export interface Recipe {
  _id: string;
  title: string;
  image: string;
  liked?: boolean;
  createdAt?: string;
}

// Data sent to create a recipe (the API generates _id and createdAt)
export type RecipeInput = Omit<Recipe, "_id" | "createdAt">;

// Data sent to update a recipe: the _id plus only the fields to change
export type RecipeUpdate = Pick<Recipe, "_id"> & Partial<RecipeInput>;
