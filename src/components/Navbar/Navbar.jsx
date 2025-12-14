import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";

import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      {/* Botón hamburguesa visible solo en móvil */}
      <button className={styles.hamburgerIcon} onClick={toggleMenu}>
        <FaBars size={24} />
      </button>

      <ul ref={menuRef}  className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" end onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : "")}>
            WEATHER
          </NavLink>
        </li>
        <li>
          <NavLink to="/findcity" onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : "")}>
            <FaSearch style={{ marginRight: "6px" }} />
            <span>ADD CITY</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : "")}>
            HELP
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : "")}>
            LOGIN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
