"use client";

import React from "react";
import Image from "next/image";
import CompassIcon from "@/app/utils/CompassIcon";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useWeather } from "@/app/hook/useWeather";
import { useGeolocation } from "@/app/hook/useGeolocation";

const WeatherInfo = () => {
  useGeolocation();

  const { data, error, isError } = useWeather();

  if (isError) {
    throw error;
  }

  if (!data) {
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
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        width={130}
        height={130}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        placeholder="blur"
        unoptimized
      />
      <div className={styles.weatherInfoWrap}>
        {/* <h2 className={styles.title}>현재 날씨</h2> */}
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>{data?.cityName[0]?.local_names?.ko}</h2>
          <CompassIcon />
        </div>
        <p className={styles.currentTemp}>{Math.round(data.main.temp)} °C</p>
        <p className={styles.info}>{data.weather[0].description}</p>
        <p className={styles.info}>
          <span>체감온도 </span>
          {Math.round(data.main.feels_like)} °C
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
