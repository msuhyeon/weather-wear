"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { getWeatherData } from "@/app/utils/weather";

interface WeatherCondition {
  icon: string;
}

interface CurrentData {
  temp: number;
  humidity: number;
  weather: WeatherCondition[];
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchWeatherData = async (lat: number, lon: number) => {
      try {
        const { current, daily } = await getWeatherData(coordinates);
        setWeatherData({ current, daily });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (coordinates.lat !== 0 && coordinates.lon !== 0) {
      fetchWeatherData(coordinates.lat, coordinates.lon);
    }
  }, [coordinates]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={`${styles.weatherCard} ${styles.skeletonWrapper}`}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingText}>날씨 정보를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.weatherCard}>
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData?.current?.weather[0].icon}@2x.png`}
          alt="weather icon"
          width={100}
          height={100}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
          placeholder="blur"
          unoptimized
        />
        <div className={styles.weatherInfo}>
          <h2 className={styles.title}>현재 날씨</h2>
          <p className={styles.info}>
            {weatherData && Math.round(weatherData.current?.temp ?? 0)} °C
          </p>
          <p className={styles.info}>맑음</p>
          <p className={styles.info}>
            {weatherData?.daily &&
              Math.round(weatherData.daily[0]?.temp?.max ?? 0)}{" "}
            °C /{" "}
            {weatherData?.daily &&
              Math.round(weatherData.daily[0]?.temp?.min ?? 0)}{" "}
            °C
          </p>
          <p className={styles.info}>
            <span>체감</span>
            {weatherData?.daily &&
              Math.round(weatherData.daily[0]?.feels_like?.morn ?? 0)}{" "}
            °C /{" "}
            {weatherData?.daily &&
              Math.round(weatherData.daily[0]?.feels_like?.night ?? 0)}{" "}
            °C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
