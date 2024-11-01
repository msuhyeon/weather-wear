"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useWeatherData } from "@/app/providers/WeatherDataContext";
import { useQueryClient } from "@tanstack/react-query";

const WeatherDisplay = () => {
  const { weatherData, error, isError } = useWeatherData();

  if (isError) {
    throw error;
  }

  if (!weatherData || !weatherData.current) {
    return (
      <div className={styles.weatherCard}>
        <Skeleton height={130} width={130} />
        <div className={styles.weatherInfoWrap}>
          <h2 className={styles.title}>
            <Skeleton height={20} />
          </h2>
          <p className={styles.currentTemp}>
            <Skeleton height={30} />
          </p>
          <p className={styles.info}>
            <Skeleton height={16} />
          </p>
          <p className={styles.info}>
            <Skeleton height={16} />
          </p>
        </div>
      </div>
    );
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
  const queryClient = useQueryClient();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={async () => {
        // 캐시 된 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ["weather"] });
      }}
    >
      <WeatherDisplay />
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    // 별도의 async 함수로 분리
    setIsRetrying(true);
    try {
      resetErrorBoundary();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className={styles.errorContainer}>
      <p>날씨 정보를 가져오는데 실패했습니다.</p>
      <p>{error.message}</p>
      <button onClick={handleRetry} disabled={isRetrying}>
        {isRetrying ? "재시도 중..." : "다시 시도"}
      </button>
    </div>
  );
};

export default WeatherInfo;
