import { Outlet } from "react-router";
import AdminNav from "../components/AdminNav";

function AdminPage() {
  return (
    <div className="d-flex flex-fill p-20">
      <AdminNav />
      <div className="d-flex flex-column flex-fill">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
