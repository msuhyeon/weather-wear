import React from "react";
import styles from "./styles.module.css";

const WeatherInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.weatherCard}>
        <div className={styles.weatherIcon}>icon</div>
        <div className={styles.weatherInfo}>
          <h2 className={styles.title}>현재 날씨</h2>
          <p className={styles.info}>-- °C</p>
          <p className={styles.info}>맑음</p>
          <p className={styles.info}>34°C / 24°C 체감 33°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
