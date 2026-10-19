import styles from "./App.module.scss";
import { Outlet } from "react-router";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { seeds } from "@/features/recipes/data/seeds";

seeds();

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="flex-fill d-flex flex-column">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
