import { NavLink } from "react-router";
import styles from "./HeaderMenu.module.scss";

interface HeaderMenuProps {
  onClose: () => void;
}

function HeaderMenu({ onClose }: HeaderMenuProps) {
  return (
    <ul onClick={onClose} className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
      <li>Wishlist</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenu;
