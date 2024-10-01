import { Suspense } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import WeatherInfo from "@/components/weatherInfo/WeatherInfo";

interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherCondition {
  icon: string;
  description: string;
}

interface CurrentData {
  temp: number;
  humidity: number;
  weather: WeatherCondition[];
  feels_like: number;
}

interface WeatherData {
  current: CurrentData | null;
}

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Suspense
          fallback={
            <div className={`${styles.weatherCard} ${styles.skeletonWrapper}`}>
              <div className={styles.loadingContent}>
                <div className={styles.loadingText}>
                  날씨 정보를 불러오는 중...
                </div>
              </div>
            </div>
          }
        >
          {/* <WeatherData /> */}
          <WeatherInfo />
        </Suspense>
        <Link href="/recommendation" className={styles.recommendButton}>
          날씨에 맞는 옷차림 추천 받기 👀
        </Link>
      </main>
    </div>
  );
}
