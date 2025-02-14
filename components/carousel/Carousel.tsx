import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import styles from "./styles.module.css";

interface RecommendationItem {
  category: string;
  imageKey: string;
  description: string;
}

interface CarouselProps {
  slides: RecommendationItem[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperType | null>(null); // 메인 Swiper 참조
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation = {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      };
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((item, index) => (
          <SwiperSlide className={styles.card} key={index}>
            <span className={styles.category}>{item.category}</span>
            <div>{item.imageKey}</div>
            <p className={styles.desc}>{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiperNavigation}>
        <button ref={prevRef} className={styles.swiperButtonPrev}>
          Prev
        </button>
        <button ref={nextRef} className={styles.swiperButtonNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
