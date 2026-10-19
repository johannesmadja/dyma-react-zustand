import { Outlet, useLocation } from "react-router";
import AdminRecipesNav from "../components/AdminRecipesNav";

function AdminRecipesPage() {
  const { key } = useLocation();

  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des recettes</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminRecipesNav />
        <div className="flex-fill d-flex flex-column">
          <Outlet key={key} />
        </div>
      </div>
    </div>
  );
}

export default AdminRecipesPage;
