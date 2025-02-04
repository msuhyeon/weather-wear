import { useEffect } from "react";
import { useLocationStore } from "../store/useLocationStore";

export function useGeolocation() {
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation(coords.latitude, coords.longitude);
      },
      (err) => console.error("위치 정보를 조회하는데 실패했습니다.", err)
    );
  }, [setLocation]);
}
