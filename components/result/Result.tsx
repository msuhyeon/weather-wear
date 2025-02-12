"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { Sensitivity, RecommendationData, Gender } from "@/types/weather";
import { useWeather } from "../../app/hook/useWeather";
import { getAIRecommendation } from "@/lib/ai";
import SplideCarousel from "@/components/carousel/SplideCarousel";
import styles from "./styles.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const Result = () => {
  const [coordination, setCoordination] = useState<RecommendationData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useWeather();
  const searchParams = useSearchParams();
  const isFetched = useRef(false);

  useEffect(() => {
    if (!data) return;

    fetchRecommendation();
    isFetched.current = true;
  }, [data]);

  const fetchRecommendation = async () => {
    try {
      const gender = searchParams.get("gender") as Gender;
      const sensitivity = searchParams.get("sensitivity") as Sensitivity;
      const stylesParam = searchParams.get("styles");
      const styles = stylesParam ? stylesParam.split(",") : [];

      if (!sensitivity) throw new Error("민감도 값이 없음 오류!");

      const res = await getAIRecommendation(
        data?.current?.temp,
        gender,
        sensitivity,
        styles
      );

      setCoordination(res);
    } catch (error) {
      console.error(`추천 데이터를 가져오는 중 오류가 발생했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // debugging code
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Updated coordination:", coordination);
    }
  }, [coordination]);

  return (
    <>
      <h2 className={styles.title}>오늘의 추천🧚‍♂️ </h2>
      <div className={styles.recommendation}>
        {loading && !coordination ? (
          <div>
            <Skeleton height={30} width="100%" />
            <br />
            <Skeleton height={285} width="100%" />
            <br />
            <Skeleton className={styles.tipTitle} height={110} width="100%" />
          </div>
        ) : (
          <>
            <div className={styles.weatherInfo}>
              <p className={styles.description}>{coordination?.advice}</p>
            </div>
            {coordination && (
              <>
                <SplideCarousel slides={coordination.recommendations} />
                <div>
                  <span className={styles.tipTitle}>Tips!</span>
                  <p className={styles.tipContents}>
                    {coordination.stylingTips}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Result;
