"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getRecommendation } from "../../lib/recommendation";
import { useWeather } from "../hook/useWeather";
import { useSearchParams } from "next/navigation";
import { Sensitivity, RecommendationData } from "@/types/weather";

const Result = () => {
  const [recommendation, setRecommendation] =
    useState<RecommendationData | null>(null);
  //TODO: loading 활용 방안 찾기
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useWeather();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!data || !data.current) return;
    fetchRecommendation();
  }, [data]);

  const fetchRecommendation = async () => {
    try {
      const sensitivity = searchParams.get("sensitivity") as Sensitivity;
      const stylesParam = searchParams.get("styles");
      const styles = stylesParam ? stylesParam.split(",") : [];

      if (!sensitivity) throw new Error("민감도 값이 없음 오류!");

      // const recommendationData = await getRecommendation(
      //   Math.round(data.current.temp),
      //   sensitivity,
      //   styles
      // );
      setRecommendation(recommendationData);
    } catch (error) {
      console.error(`추천 데이터를 가져오는 중 오류가 발생했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>오늘의 추천 의상</h2>
      <div className={styles.card}>
        <div className={styles.weatherInfo}>
          <span className={styles.temperature}>{data?.current?.temp}°C</span>
          <span className={styles.description}>
            날씨에 대한 코멘트 추가 예정
            {/* {recommendationData?.description} */}
          </span>
        </div>
        <ul className={styles.recommendations}>
          {recommendation?.clothing[recommendation.gender]?.map(
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
