import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

// 온도 보정
function adjustTemperature(
  actualTemp: number,
  sensitivity: Sensitivity
): number {
  switch (sensitivity) {
    case Sensitivity.High:
      return actualTemp - 2;
    case Sensitivity.Low:
      return actualTemp + 2;
    default:
      return actualTemp;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { gender, sensitivity } = await req.json();

    const { error } = await supabase
      .from("recommendations")
      .insert([{ gender, sensitivity }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const temperature = Number(searchParams.get("temperature"));
    const sensitivity = searchParams.get("sensitivity") as Sensitivity;

    if (isNaN(temperature) || !sensitivity) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const adjustedTemp = adjustTemperature(temperature, sensitivity);

    const { data, error } = await supabase
      .from("clothing_by_temperature")
      .select("min_temp, max_temp, clothing")
      .gte("max_temp", temperature)
      .lte("min_temp", temperature)
      .single();

    if (error) {
      console.error("추천 데이터 가져오기 실패:", error);
      return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }

    return NextResponse.json(data ?? { error: "추천 데이터를 찾을 수 없음" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
