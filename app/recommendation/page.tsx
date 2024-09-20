"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";

type Gender = "male" | "female" | "";
type ColdSensitivity = "high" | "medium" | "low" | "";

const Recommendation: React.FC = () => {
  const [gender, setGender] = useState<Gender>("");
  const [coldSensitivity, setColdSensitivity] = useState<ColdSensitivity>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ gender, coldSensitivity });
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
        <div className={styles.buttonGroup}>
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
        옷차림 추천 받기
      </button>
    </form>
  );
};

export default Recommendation;
