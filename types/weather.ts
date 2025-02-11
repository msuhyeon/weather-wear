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

type Coordination = {
  category: string;
  imageKey: string;
  description: string;
};

export interface RecommendationData {
  advice: string;
  recommendations: [
    outerwear: Coordination,
    top: Coordination,
    bottom: Coordination,
    footwear: Coordination,
    accessories: Coordination
  ];
  stylingTips: string;
}

export interface Options {
  id: string;
  label: string;
}
