import Link from "next/link";
import styles from "./styles.module.css";
import WeatherInfo from "@/components/weatherInfo/WeatherInfo";

export default function Home() {
  return (
    <>
      <WeatherInfo />
      <Link href="/recommendation" className={styles.recommendButton}>
        날씨에 맞는 옷차림 추천 받기 👀
      </Link>
      <button className={styles.recommendButton}>
        다른 지역의 날씨도 알아볼까요? 🌍
      </button>
    </>
  );
}
