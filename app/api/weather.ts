const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const GEO_BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

interface Coordinates {
  lat: number;
  lon: number;
}

export const getCoordinates = async (city: string) => {
  const response = await fetch(
    `${GEO_BASE_URL}?q=${city}&limit=1&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("City not found");
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

export const fetchWeatherData = async (coordinates: Coordinates) => {
  const { lat, lon } = coordinates;
  const response = await fetch(
    `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&lang=kr&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  console.log(response);

  return response.json();
};
