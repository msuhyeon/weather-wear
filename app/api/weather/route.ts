import { NextRequest, NextResponse } from "next/server";
const GEO_BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      {
        error: "위도 및 경도 값이 존재하지 않습니다.",
      },
      {
        status: 500,
      }
    );
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API키가 존재하지 않습니다." },
      { status: 500 }
    );
  }

  try {
    if (city) {
      // 도시명으로 위도, 경도 가져오기
      const response = await fetch(
        `${GEO_BASE_URL}?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("좌표를 가져오는데 실패했습니다.");

      const geoData = await response.json();
      if (!geoData.length) throw new Error("도시를 찾지 못했습니다.");

      return NextResponse.json({ lat: geoData[0].lat, lon: geoData[0].lon });
    }

    if (lat && lon) {
      // 위도, 경도로 날씨 데이터 가져오기
      const response = await fetch(
        `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&lang=kr&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(
          `날씨 데이터 요청 실패: ${response.status} ${response.statusText}`
        );
      }
      const weatherData = await response.json();

      // CORS issue
      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

      return NextResponse.json(weatherData);
    }

    return NextResponse.json({ error: "호출 파라미터 오류" }, { status: 400 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "알 수 없는 오류 발생" },
      { status: 500 }
    );
  }
}
