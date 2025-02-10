import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // ✅ 기본 스타일 불러오기
import styles from "./styles.module.css";

const SplideCarousel = ({ slides }) => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 3,
        autoplay: false,
        interval: 3000,
        transition: "transform 800ms cubic-bezier(.44,.65,.07,1.01)",
        gap: "10px",
        focus: "center",
      }}
    >
      {slides.map((item, index) => (
        <SplideSlide className={styles.card} key={index}>
          <span className={styles.category}>{item.category}</span>
          <div>{item.imageKey}</div>
          <p className={styles.desc}>{item.description}</p>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideCarousel;
