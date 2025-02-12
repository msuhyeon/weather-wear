import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `좌표 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const coordinates = await response.json();

    return NextResponse.json(coordinates);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
