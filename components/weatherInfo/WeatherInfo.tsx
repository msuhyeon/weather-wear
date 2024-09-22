"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface WeatherCondition {
  icon: string;
  description: string;
}

interface CurrentData {
  temp: number;
  humidity: number;
  weather: WeatherCondition[];
  feels_like: number;
}

interface WeatherData {
  current: CurrentData | null;
}

interface WeatherInfoProps {
  initialWeatherData: WeatherData;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ initialWeatherData }) => {
  const weatherData = initialWeatherData;

  return (
    // <div className={styles.container}>
    <>
      <div className={styles.weatherCard}>
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData.current?.weather[0].icon}@2x.png`}
          alt="weather icon"
          width={130}
          height={130}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
          placeholder="blur"
          unoptimized
        />
        <div className={styles.weatherInfoWrap}>
          <h2 className={styles.title}>현재 날씨</h2>
          <p className={styles.currentTemp}>
            {weatherData.current && Math.round(weatherData.current.temp ?? 0)}{" "}
            °C
          </p>
          <p className={styles.info}>
            {weatherData.current?.weather[0].description}
          </p>
          <p className={styles.info}>
            <span>체감온도 </span>
            {weatherData.current &&
              Math.round(weatherData.current.feels_like ?? 0)}
            °C
          </p>
        </div>
      </div>
    </>
    // </div>
  );
};

export default WeatherInfo;
