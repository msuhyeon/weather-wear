"use client";

import styles from "./styles.module.css";
import WeatherInfo from "@/components/weatherInfo/WeatherInfo";
import UserPreferencesForm from "@/components/userInput/UserInput";
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {!showForm ? (
          <>
            <WeatherInfo />
            <button
              className={styles.recommendButton}
              onClick={handleButtonClick}
            >
              날씨에 맞는 옷차림 추천 받기 👀
            </button>
          </>
        ) : (
          <UserPreferencesForm />
        )}
      </main>
    </div>
  );
}
