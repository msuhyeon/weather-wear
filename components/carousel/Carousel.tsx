import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import styles from "./styles.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface RecommendationItem {
  category: string;
  imageKey: string;
  description: string;
}

interface CarouselProps {
  slides: RecommendationItem[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{ nextEl: prevRef.current, prevEl: nextRef.current }}
        onSwiper={(swiper) => {
          if (swiperRef.current) {
            swiperRef.current.swiper = swiper;
          }
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((item, index) => (
          <SwiperSlide
            className={`${styles.card} ${
              activeIndex === index ? styles.active : styles.inactive
            }`}
            key={index}
          >
            <span className={styles.category}>{item.category}</span>
            {/* TODO: imageKey는 이미지로 변경 예정 */}
            <div className={styles.imageKey}>{item.imageKey}</div>
            <p className={styles.desc}>{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiperNavigation}>
        <button ref={prevRef} className={styles.swiperButtonPrev}>
          <KeyboardArrowLeftIcon />
        </button>
        <button ref={nextRef} className={styles.swiperButtonNext}>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
