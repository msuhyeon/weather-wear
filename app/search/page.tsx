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

  const handleSearch = async () => {
    const response = await getCoordinates(cityInput);
    setCityList(Array.isArray(response) ? response : []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleReset = () => {
    setCityInput("");
  };

  return (
    <div>
      <fieldset className={styles.innerForm}>
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
      </fieldset>
      {cityList.length > 0 && (
        <ul className={styles.locationList}>
          {cityList.map((item, index) => (
            <li className={styles.location} key={index}>
              <button type="button">{item.local_names?.ko || item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
