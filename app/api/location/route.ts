import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locationName = searchParams.get("location");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `좌표 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const geocode = await response.json();

    return NextResponse.json(geocode);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
