import { Suspense } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import WeatherInfo from "@/components/weatherInfo/WeatherInfo";
import { getWeatherData } from "@/app/utils/weather";

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

async function WeatherData() {
  // default: 서울 중구
  const coordinates: Coordinates = {
    lat: 37.5665,
    lon: 126.978,
  };

  try {
    const weatherData = await getWeatherData(coordinates);
    return <WeatherInfo initialWeatherData={weatherData} />;
  } catch (error) {
    return <div>Error loading weather data</div>;
  }
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
          <WeatherData />
        </Suspense>
        <Link href="/recommendation" className={styles.recommendButton}>
          날씨에 맞는 옷차림 추천 받기 👀
        </Link>
      </main>
    </div>
  );
}
