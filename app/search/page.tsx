"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { getCoordinates } from "@/lib/geoUtils";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

interface City {
  name: string;
  local_names: { ko?: string };
  lat: number;
  lon: number;
  country: string;
}

export default function Search() {
  const [cityInput, setCityInput] = useState("");
  const [cityList, setCityList] = useState<City[]>([]);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const response = await getCoordinates(cityInput);
    setCityList(Array.isArray(response) ? response : []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleReset = () => {
    setCityInput("");
  };

  const handleSelectCity = () => {};

  return (
    <div>
      <form className={styles.innerForm} onSubmit={handleSearch}>
        <input
          type="text"
          className={styles.inputForm}
          placeholder="어느 도시의 날씨가 궁금하세요?"
          title="도시 이름 검색"
          value={cityInput}
          onChange={handleChange}
        />
        {cityInput.length > 0 && (
          <button
            className={styles.resetButton}
            type="button"
            onClick={handleReset}
          >
            <CancelIcon />
          </button>
        )}
        <button className={styles.searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>
      {cityList.length > 0 && (
        <ul className={styles.locationList}>
          {cityList.map((item, index) => (
            <li className={styles.location} key={index}>
              <button
                className={styles.locationButton}
                type="button"
                onClick={handleSelectCity}
              >
                {item.local_names?.ko || item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
