import Link from "next/link";
import styles from "./styles.module.css";
import WeatherInfo from "@/components/weatherInfo/WeatherInfo";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <WeatherInfo />
        <Link href="/recommendation" className={styles.recommendButton}>
          날씨에 맞는 옷차림 추천 받기 👀
        </Link>
      </main>
    </div>
  );
}
