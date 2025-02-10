import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // ✅ 기본 스타일 불러오기
import styles from "./styles.module.css";

const SplideCarousel = ({ slides }) => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 1,
        autoplay: false,
        interval: 3000,
        transition: "transform 800ms cubic-bezier(.44,.65,.07,1.01)",
        gap: "10px",
      }}
    >
      {slides.map((item, index) => (
        <SplideSlide className={styles.card}>
          <div>{item.category}</div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideCarousel;
