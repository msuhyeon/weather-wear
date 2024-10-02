"use client";

import React, { useEffect, useState, Suspense } from "react";
import { fetchWeatherData } from "@/app/api/weather";
import Image from "next/image";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";

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

const WeatherInfo: React.FC = () => {
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
    const fetchData = async (coordinates: { lat: number; lon: number }) => {
      try {
        const {
          data: weatherData,
          isLoading,
          error,
        } = useQuery({
          queryKey: ["weather", coordinates],
          queryFn: () => fetchWeatherData(coordinates),
        });

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (coordinates.lat !== 0 && coordinates.lon !== 0) {
      fetchData(coordinates);
    }
  }, [coordinates]);

  if (!weatherData || !weatherData.current) {
    return;
  }

  const { data: weatherData, isLoading } = useQuery<WeatherData>({
    queryKey: ["weather", coordinates],
    queryFn: () => fetchWeatherData(coordinates),
  });

  if (isLoading) {
    return <div>날씨 정보를 불러오는 중...</div>;
  }

  if (!weatherData || !weatherData.current) {
    return <div>날씨 정보가 없습니다.</div>;
  }

  return (
    <>
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
        {/* <div className={styles.weatherCard}>
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
        </div> */}
      </Suspense>
    </>
  );
};

export default WeatherInfo;
