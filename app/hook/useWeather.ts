import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "../store/useLocationStore";
import { fetchWeather } from "../api/weather";

export function useWeather() {
  const { lat, lon } = useLocationStore();

  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather({ lat, lon }),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 유지
    retry: 5,
    retryDelay: (retryCnt) => Math.min(1000 * 2 ** retryCnt, 30000),
  });
}
