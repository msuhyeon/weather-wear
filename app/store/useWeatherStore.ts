import { create } from "zustand";
import { Sensitivity } from "@/types/weather";

interface WeatherState {
  temperature: number;
  sensitivity: Sensitivity;
  setWeather: (temperature: number, sensitivity: string) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  temperature: 0,
  sensitivity: Sensitivity.Medium,
  setWeather: (temperature, sensitivity) =>
    set({ temperature, sensitivity: sensitivity as Sensitivity }),
}));
