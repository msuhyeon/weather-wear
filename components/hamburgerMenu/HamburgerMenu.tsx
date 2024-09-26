"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleHamburgerClick = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div onClick={handleHamburgerClick} className={styles.hamburgerBtn}>
        <span className="material-icons">menu</span>
      </div>
      <nav className={`${styles.sideNav} ${isNavOpen ? styles.open : ""}`}>
        Side Nav Here!
      </nav>
    </>
  );
}
