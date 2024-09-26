"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleHamburgerClick = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div onClick={handleHamburgerClick} className={styles.hamburgerBtn}>
        <MenuIcon className={styles.menuIcon} />
      </div>
      <nav className={`${styles.sideNav} ${isNavOpen ? styles.open : ""}`}>
        Side Nav Here!
      </nav>
    </>
  );
}
