"use client";

import React from "react";
import Image from "next/image";
import CompassIcon from "@/app/utils/CompassIcon";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useWeather } from "@/app/hook/useWeather";
import { useGeolocation } from "@/app/hook/useGeolocation";

const WeatherInfo = () => {
  useGeolocation();

  const { data, error, isError } = useWeather();

  console.log("data-", data);

  if (isError) {
    throw error;
  }

  if (!data) {
    return (
      <div className={styles.weatherCard}>
        <Skeleton height={130} width={130} />
        <div className={styles.weatherInfoWrap}>
          <h2 className={styles.title}>
            <Skeleton height={20} />
          </h2>
          <p className={styles.currentTemp}>
            <Skeleton height={30} />
          </p>
          <p className={styles.info}>
            <Skeleton height={16} />
          </p>
          <p className={styles.info}>
            <Skeleton height={16} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.weatherCard}>
      <Image
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        width={130}
        height={130}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        placeholder="blur"
        unoptimized
      />
      <div className={styles.weatherInfoWrap}>
        {/* <h2 className={styles.title}>현재 날씨</h2> */}
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>{data.name}</h2>
          <CompassIcon />
        </div>
        <p className={styles.currentTemp}>{Math.round(data.main.temp)} °C</p>
        <p className={styles.info}>{data.weather[0].description}</p>
        <p className={styles.info}>
          <span>체감온도 </span>
          {Math.round(data.main.feels_like)} °C
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;

// const WeatherInfo: React.FC = () => {
//   const queryClient = useQueryClient();

//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onReset={async () => {
//         // 캐시 된 쿼리 무효화
//         await queryClient.invalidateQueries({ queryKey: ["weather"] });
//       }}
//     >
//       <WeatherDisplay />
//     </ErrorBoundary>
//   );
// };

// const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
//   const [isRetrying, setIsRetrying] = useState(false);

//   const handleRetry = async () => {
//     // 별도의 async 함수로 분리
//     setIsRetrying(true);
//     try {
//       resetErrorBoundary();
//     } finally {
//       setIsRetrying(false);
//     }
//   };

//   return (
//     <div className={styles.errorContainer}>
//       {/* <p className={styles.errorText}>날씨 정보를 가져오는데 실패했습니다.</p> */}
//       <p className={styles.errorMessage}>{error.message}</p>
//       <button
//         onClick={handleRetry}
//         disabled={isRetrying}
//         className={styles.retryButton}
//       >
//         {isRetrying ? "재시도 중..." : "날씨 정보 다시 가져오기"}
//       </button>
//     </div>
//   );
// };
