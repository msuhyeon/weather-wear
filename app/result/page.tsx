"use client";

import React from "react";
import styles from "./styles.module.css";
import { useRecommendationData } from "../providers/RecommendationDataContext";

const Result = () => {
  const { recommendationData } = useRecommendationData();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>오늘의 추천 의상</h2>
      <div className={styles.card}>
        <div className={styles.weatherInfo}>
          <span className={styles.temperature}>
            {recommendationData?.currentTemperature}°C
          </span>
          <span className={styles.description}>
            날씨에 대한 코멘트 추가 예정
            {/* {recommendationData?.description} */}
          </span>
        </div>
        <ul className={styles.recommendations}>
          {recommendationData?.clothing[recommendationData.gender]?.map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Result;
