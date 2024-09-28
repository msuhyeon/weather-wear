"use client";

import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.css";

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleHamburgerClick = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNavOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavOpen]);

  return (
    <>
      <div onClick={handleHamburgerClick} className={styles.hamburgerBtn}>
        <MenuIcon className={styles.menuIcon} />
      </div>
      <nav
        ref={navRef}
        className={`${styles.sideNav} ${isNavOpen ? styles.open : ""}`}
      >
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
        <ul className={styles.locationList}>
          <li className={styles.location}>
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
