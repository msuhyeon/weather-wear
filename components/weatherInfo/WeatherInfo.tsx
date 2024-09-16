"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getWeatherData } from "@/app/utils/weather";

interface CurrentData {
  temp: number;
  humidity: number;
  weather: Object;
}

interface DailyData {
  temp: {
    min: number;
    max: number;
  };
  feels_like: {
    morn: number;
    night: number;
  };
}

interface DailyData extends Array<DailyData> {}

interface WeatherData {
  current: CurrentData | null;
  daily: DailyData | null;
}

const WeatherInfo = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. geolocation API를 호출하여 현재 위치 조회
    const getGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.error(`Error in geolocation API ${err}`);
        }
      );
    };

    getGeolocation();
  }, []);

  useEffect(() => {
    // 2. 가져온 현재 위치를 바탕으로 날씨 조회 API 호출
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const { current, daily } = await getWeatherData(coordinates);
        setWeather({ current, daily });
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (coordinates.lat !== 0 && coordinates.lon !== 0) {
      fetchWeather(coordinates.lat, coordinates.lon);
    }
  }, [coordinates]);

  return (
    <div className={styles.container}>
      <div className={styles.weatherCard}>
        <div className={styles.weatherIcon}>icon</div>
        <div className={styles.weatherInfo}>
          <h2 className={styles.title}>현재 날씨</h2>
          <p className={styles.info}>
            {weather && Math.round(weather.current?.temp ?? 0)} °C
          </p>
          <p className={styles.info}>맑음</p>
          <p className={styles.info}>
            {weather?.daily && Math.round(weather.daily[0]?.temp?.max ?? 0)} °C
            / {weather?.daily && Math.round(weather.daily[0]?.temp?.min ?? 0)}{" "}
            °C
          </p>
          <p className={styles.info}>
            <span>체감</span>
            {weather?.daily &&
              Math.round(weather.daily[0]?.feels_like?.morn ?? 0)}{" "}
            °C /{" "}
            {weather?.daily &&
              Math.round(weather.daily[0]?.feels_like?.night ?? 0)}{" "}
            °C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
