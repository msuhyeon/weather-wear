import { supabase } from "./supabase";

export async function getClothingRecommendation(temperature: number) {
  const { data, error } = await supabase
    .from("clothing_by_temperature")
    .select("min_temp, max_temp, clothing")
    .gte("max_temp", temperature)
    .lte("min_temp", temperature)
    .single();

  if (error) throw error;
  return data;
}

export function adjustTemperature(
  actualTemp: number,
  sensitivity: "high" | "medium" | "low"
): number {
  switch (sensitivity) {
    case "high":
      return actualTemp - 2;
    case "low":
      return actualTemp + 2;
    default:
      return actualTemp;
  }
}
