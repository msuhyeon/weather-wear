export interface WeatherCondition {
  icon: string;
  description: string;
}

export interface CurrentData {
  temp: number;
  humidity: number;
  weather: WeatherCondition[];
  feels_like: number;
}

interface ClothingRecommendation {
  min_temp: number;
  max_temp: number;
  clothing: string;
}

export enum Sensitivity {
  High = "high",
  Medium = "medium",
  Low = "low",
}

export interface WeatherData {
  current: CurrentData | null;
  error: Error | null;
  isError: boolean;
}

export type Gender = "male" | "female";

export interface RecommendationData {
  gender: Gender;
  currentTemperature: number;
  min_temp: number;
  max_temp: number;
  clothing: Record<Gender, string[]>;
}

export interface Options {
  id: string;
  label: string;
}
