import styles from "./styles.module.css";
import WeatherInfo from "@/components/WeatherInfo/WeatherInfo";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>WeatherWear</h1>
      </header>
      <main className={styles.content}>
        <WeatherInfo />
        <button className={styles.recommendButton}>
          날씨에 맞는 옷차림 추천 받기 👀
        </button>
      </main>
    </div>
  );
}
