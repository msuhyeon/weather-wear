"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "../../types/weather";
import { fetchWeatherData } from "@/app/api/weather";
import { useState, useEffect } from "react";

type WeatherContextType = {
  weatherData: WeatherData | undefined;
  error: object | null;
  isError: boolean;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const getGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.error(`Error in geolocation API ${err}`);
        }
      );
    };

    getGeolocation();
  }, []);

  const {
    data: weatherData,
    error,
    isError,
  } = useQuery<WeatherData>({
    queryKey: ["weather", coordinates],
    queryFn: () => fetchWeatherData(coordinates),
    enabled: coordinates.lat !== 0 && coordinates.lon !== 0,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    console.error(error);
    // return <div>날씨 정보를 찾을 수 없습니다. {error.message}</div>;
  }

  return (
    <WeatherContext.Provider value={{ weatherData, error, isError }}>
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeatherData = () => {
  const context = useContext(WeatherContext);

  if (!context) throw new Error("Error in context!");

  return context;
};
