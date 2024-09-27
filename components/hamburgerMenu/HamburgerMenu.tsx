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
        <div>search button</div>
        <ul>
          <li>
            추가된 지역
            <span>location</span>
            <span>
              <i>icon</i> temperature
            </span>
          </li>
          <li>추가된 지역</li>
        </ul>
      </nav>
    </>
  );
}
