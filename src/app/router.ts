import type { ComponentType } from "react";
import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Loading from "@/components/ui/Loading";
import { getRecipe } from "@/features/recipes/services/recipeService";

// Lazy-load a page: the router downloads its code only when the route is visited
const lazyPage =
  (importPage: () => Promise<{ default: ComponentType }>) => async () => ({
    Component: (await importPage()).default,
  });

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Loading,
    children: [
      {
        index: true,
        lazy: lazyPage(() => import("@/features/recipes/pages/RecipesPage")),
      },
      {
        path: "admin",
        lazy: lazyPage(() => import("@/features/admin/pages/AdminPage")),
        children: [
          {
            path: "recipes",
            lazy: lazyPage(
              () => import("@/features/admin/pages/AdminRecipesPage"),
            ),
            children: [
              {
                path: "list",
                lazy: lazyPage(
                  () => import("@/features/admin/pages/AdminRecipeListPage"),
                ),
              },
              {
                path: "add",
                lazy: lazyPage(
                  () => import("@/features/admin/pages/AdminRecipeFormPage"),
                ),
              },
              {
                path: "edit/:recipeId",
                // recipeId is always defined here: it is part of the route path
                loader: ({ params }) => getRecipe(params.recipeId!),
                lazy: lazyPage(
                  () => import("@/features/admin/pages/AdminRecipeFormPage"),
                ),
              },
              {
                index: true,
                loader: () => redirect("/admin/recipes/list"),
              },
            ],
          },
          {
            path: "users",
            lazy: lazyPage(() => import("@/features/admin/pages/AdminUsersPage")),
          },
          {
            index: true,
            loader: () => redirect("/admin/recipes"),
          },
        ],
      },
    ],
  },
]);
