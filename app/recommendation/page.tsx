"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Gender, Sensitivity } from "../../types/weather";

const Recommendation: React.FC = () => {
  const router = useRouter();
  const [gender, setGender] = useState<Gender | null>(null);
  const [coldSensitivity, setColdSensitivity] = useState<Sensitivity | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!gender || !coldSensitivity) {
      alert("성별 혹은 추위 민감도를 선택해주세요");
      return;
    }

    router.push(`/result?gender=${gender}&sensitivity=${coldSensitivity}`);
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
            onClick={() => setColdSensitivity(Sensitivity.High)}
          >
            추위를 잘 타요
          </button>
          <button
            type="button"
            className={coldSensitivity === "medium" ? styles.selected : ""}
            onClick={() => setColdSensitivity(Sensitivity.Medium)}
          >
            보통이에요
          </button>
          <button
            type="button"
            className={coldSensitivity === "low" ? styles.selected : ""}
            onClick={() => setColdSensitivity(Sensitivity.Low)}
          >
            추위를 덜 타요
          </button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "추천 중" : "코디 추천 받기"}
      </button>
    </form>
  );
};

export default Recommendation;
