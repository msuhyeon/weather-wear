"use client";

import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.css";
import RecentSearches from "./RecentSearches";

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

  const handleClose = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div onClick={handleHamburgerClick} className={styles.hamburgerBtn}>
        <MenuIcon className={styles.menuIcon} />
      </div>
      <nav
        ref={navRef}
        className={`${styles.sideNav} ${isNavOpen ? styles.open : ""}`}
      >
        <div className={styles.navHeader}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>
        {/* <fieldset className={styles.innerForm}>
          <input
            type="text"
            className={styles.inputForm}
            placeholder="어느 도시의 날씨가 궁금하세요?"
            title="도시 이름 검색  "
            value={cityInput}
            onChange={handleChange}
          />
          {cityInput.length > 0 && (
            <button className={styles.resetButton} onClick={handleReset}>
              <CancelIcon />
            </button>
          )}
          <button className={styles.searchButton} onClick={handleSearch}>
            <SearchIcon />
          </button>
        </fieldset> */}

        {/* 최근 검색한 지역 리스트 */}
        <RecentSearches />
        <ul className={styles.locationList}>
          <li className={styles.location}>
            {/* <span>location</span> */}
            <span>{/* <i>icon</i> temperature */}</span>
          </li>
          {/* <li>추가된 지역</li> */}
        </ul>
      </nav>
    </>
  );
}
