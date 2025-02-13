import { getLocationName } from "./geoUtils";

interface Coordinates {
  lat: number;
  lon: number;
}

const API_BASE_URL = "/api/weather";

export const getCoordinates = async (city: string) => {
  const response = await fetch(
    `${API_BASE_URL}?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("좌표를 가져오는데 실패했습니다.");
  }

  const data = await response.json();
  if (!data.lat || !data.lon) {
    throw new Error("도시를 찾지 못했어요!");
  }
  return { lat: data.lat, lon: data.lon };
};

export const fetchWeather = async ({ lat, lon }: Coordinates) => {
  const response = await fetch(`${API_BASE_URL}?lat=${lat}&lon=${lon}`);

  if (!response.ok) {
    throw new Error("날씨를 불러오는데 실패했어요..😭");
  }

  const data = await response.json();
  const cityName = await getLocationName(lat, lon, data.name);

  return { ...data, cityName };
};
