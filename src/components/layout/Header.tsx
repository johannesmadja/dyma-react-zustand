import styles from "./Header.module.scss";
import cookchef from "@/assets/images/cookchef.png";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";
import { NavLink } from "react-router";
import { useRecipeStore } from "@/app/store";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const setShowWishList = useRecipeStore(({setShowWishList}) => setShowWishList);


  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      {/* <span className="material-symbols-outlined mr-15">menu</span> */}
      <div className="flex-fill">
        <NavLink to="/">
          <img src={cookchef} alt="logo" />
        </NavLink>
      </div>

      <nav className={styles.headerList}>
        <NavLink to="/admin" className="btn btn-primary mr-15">
          Admin
        </NavLink>

        <button className="mr-15 btn btn-primary-reverse" onClick={() => setShowWishList(true)} >
          {/* <span class="material-symbols-outlined">shopping_basket</span> */}
          Wishlist
        </button>
        <button className="btn btn-primary">Connexion</button>
      </nav>

      <span
        onClick={() => setShowMenu(true)}
        className={`material-symbols-outlined ${styles.headerXs}`}
      >
        menu
      </span>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className={styles.overlay}></div>
          <HeaderMenu onClose={() => setShowMenu(false)} />
        </>
      )}
    </header>
  );
}

export default Header;
