"use client";

import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./styles.module.css";

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [cityInput, setCityInput] = useState("");

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

  const handleChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    // 검색 api 호출
  };

  const handleReset = () => {
    setCityInput("");
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
        <fieldset className={styles.innerForm}>
          <input
            type="text"
            className={styles.inputForm}
            placeholder="어느 도시의 날씨가 궁금한가요?"
            title="도시 이름 검색  "
            onChange={handleChange}
          />
          <button className={styles.resetButton} onClick={handleReset}>
            <CancelIcon />
          </button>
          <button className={styles.searchButton} onClick={handleSearch}>
            <SearchIcon />
          </button>
        </fieldset>
        <ul className={styles.locationList}>
          <li className={styles.location}>
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
