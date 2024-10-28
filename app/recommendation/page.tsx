"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import {
  getClothingRecommendation,
  adjustTemperature,
} from "../../lib/recommendation";
import { useWeatherData } from "../providers/WeatherDataContext";
import { useRecommendationData } from "../providers/RecommendationContext";

type Gender = "male" | "female" | "";
type ColdSensitivity = "high" | "medium" | "low" | "";

const Recommendation: React.FC = () => {
  const router = useRouter();
  const [gender, setGender] = useState<Gender>("");
  const [coldSensitivity, setColdSensitivity] = useState<ColdSensitivity>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const { weatherData } = useWeatherData();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!weatherData?.current?.temp) {
      alert("날씨 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
      return;
    }

    if (gender === "" || coldSensitivity === "") {
      alert("성별 혹은 추위 민감도를 선택해주세요");
      return;
    }

    try {
      const currentTemperature = Math.round(weatherData.current.temp);
      const adjustedTemperature = adjustTemperature(
        currentTemperature,
        coldSensitivity as "high" | "medium" | "low"
      );

      const clothingRecommendation = await getClothingRecommendation(
        adjustedTemperature
      );

      const recommendationData = {
        ...clothingRecommendation,
        gender,
        currentTemperature,
      };

      const { setRecommendationData } = useRecommendationData();
      setRecommendationData(recommendationData);

      router.push("/result");
      // router.push(
      //   `/result?data=${encodeURIComponent(JSON.stringify(recommendationData))}`
      // );
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      alert("추천을 가져오는 데 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.questionGroup}>
        <h2>당신의 성별은?</h2>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={gender === "male" ? styles.selected : ""}
            onClick={() => setGender("male")}
          >
            남성
          </button>
          <button
            type="button"
            className={gender === "female" ? styles.selected : ""}
            onClick={() => setGender("female")}
          >
            여성
          </button>
        </div>
      </div>
      <div className={styles.questionGroup}>
        <h2>추위에 얼마나 민감하세요?</h2>
        <div className={`${styles.buttonGroup} ${styles.row}`}>
          <button
            type="button"
            className={coldSensitivity === "high" ? styles.selected : ""}
            onClick={() => setColdSensitivity("high")}
          >
            추위를 잘 타요
          </button>
          <button
            type="button"
            className={coldSensitivity === "medium" ? styles.selected : ""}
            onClick={() => setColdSensitivity("medium")}
          >
            보통이에요
          </button>
          <button
            type="button"
            className={coldSensitivity === "low" ? styles.selected : ""}
            onClick={() => setColdSensitivity("low")}
          >
            추위를 덜 타요
          </button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        코디 추천 받기
      </button>
    </form>
  );
};

export default Recommendation;
