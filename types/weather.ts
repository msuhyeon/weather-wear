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

export interface WeatherData {
  current: CurrentData | null;
  error: Error | null;
  isError: boolean;
}

type Gender = "male" | "female";

export interface RecommendationData {
  gender: Gender;
  currentTemperature: number;
  min_temp: number;
  max_temp: number;
  clothing: Record<Gender, string[]>;
}
