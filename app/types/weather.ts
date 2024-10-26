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
  error: Object | null;
  isError: boolean;
}
