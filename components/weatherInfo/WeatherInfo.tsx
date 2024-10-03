"use client";

import React, { useEffect, useState, Suspense } from "react";
import { fetchWeatherData } from "@/app/api/weather";
import Image from "next/image";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

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

const WeatherDisplay = ({
  coordinates,
}: {
  coordinates: { lat: number; lon: number };
}) => {
  const { data: weatherData } = useQuery<WeatherData>({
    queryKey: ["weather", coordinates],
    queryFn: () => fetchWeatherData(coordinates),
    suspense: true,
    enabled: coordinates.lat !== 0 && coordinates.lon !== 0,
  });

  if (!weatherData || !weatherData.current) {
    return <div>날씨 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.weatherCard}>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
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
          {Math.round(weatherData.current.temp)} °C
        </p>
        <p className={styles.info}>
          {weatherData.current.weather[0].description}
        </p>
        <p className={styles.info}>
          <span>체감온도 </span>
          {Math.round(weatherData.current.feels_like)} °C
        </p>
      </div>
    </div>
  );
};

const WeatherInfo: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
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

  return (
    <ErrorBoundary
      fallback={<div>에러가 발생했습니다. 다시 시도해 주세요.</div>}
    >
      <Suspense
        fallback={
          <div className={`${styles.weatherCard} ${styles.skeletonWrapper}`}>
            <div className={styles.loadingContent}>
              <div className={styles.loadingText}>
                날씨 정보를 불러오는 중...
              </div>
            </div>
          </div>
        }
      >
        <WeatherDisplay coordinates={coordinates} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default WeatherInfo;
