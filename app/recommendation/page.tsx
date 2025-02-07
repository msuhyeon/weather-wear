"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Gender, Options, Sensitivity } from "../../types/weather";
import Button from "@/components/button/Button";

const Recommendation: React.FC = () => {
  const router = useRouter();
  const [gender, setGender] = useState<Gender | "">("");
  const [coldSensitivity, setColdSensitivity] = useState<Sensitivity | "">("");
  const [loading, setLoading] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const styleOptions: Options[] = [
    {
      id: "casual",
      label: "캐쥬얼",
    },
    {
      id: "street",
      label: "스트릿",
    },
    {
      id: "romantic",
      label: "로맨틱",
    },
    {
      id: "feminine",
      label: "페미닌",
    },
    {
      id: "dandy",
      label: "댄디",
    },
    {
      id: "chic",
      label: "시크",
    },
    {
      id: "sporty",
      label: "스포티",
    },
    {
      id: "retro",
      label: "레트로",
    },
    {
      id: "normcore",
      label: "놈코어",
    },
    {
      id: "gorpcore",
      label: "고프코어",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!gender || !coldSensitivity || selectedStyles.length < 1) {
      alert("성별, 추위 민감도, 스타일을 모두 선택해주세요.");
      setLoading(false);
      return;
    }

    router.push(
      `/result?gender=${gender}&sensitivity=${coldSensitivity}&styles=${selectedStyles}`
    );
  };

  const handleStyleChange = (id: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      console.log("prev-", prev);
      return prev;
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.questionGroup}>
        <h2 className={styles.question}>성별을 선택 해 주세요.</h2>
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
        <h2 className={styles.question}>추위를 얼마나 타세요?</h2>
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
      <ul>
        <li></li>
      </ul>
      <div className={styles.questionGroup}>
        <h2 className={styles.question}>
          어떤 스타일로 추천받고 싶으세요? (최대 3개)
        </h2>
        <div className={`${styles.checkboxGroup} ${styles.row}`}>
          {styleOptions.map((item) => (
            <div
              key={item.id}
              className={`${styles.checkboxItem} ${
                selectedStyles.includes(item.id) ? styles.selected : ""
              }`}
            >
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  onChange={() => handleStyleChange(item.id)}
                  disabled={
                    selectedStyles.length >= 3 &&
                    !selectedStyles.includes(item.id)
                  }
                />
                <span className={styles.checkmark}></span>
                <span className={styles.label}>{item.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "추천 중" : "코디 추천 받기"}
      </Button>
    </form>
  );
};

export default Recommendation;
