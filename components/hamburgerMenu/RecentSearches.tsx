// import { useSearchStore } from "@/store/useSearchStore";
import styles from "./styles.module.css";

export default function RecentSearches() {
  //   const recentSearches =useSearchStore((state) => state.recentSearches);
  // const recentSearches = [{}];

  return (
    <div className={styles.recentSearches}>
      <h3>최근 검색한 지역</h3>
      <ul>
        {/* {recentSearches.length === 0 ? (
          <li>최근 검색 기록이 없습니다.</li>
        ) : (
          recentSearches.map((city, index) => (
            <li key={index} className={styles.cityItem}>
              {city}
            </li>
          ))
        )} */}
      </ul>
    </div>
  );
}
