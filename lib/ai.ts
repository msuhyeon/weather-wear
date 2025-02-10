export async function getAIRecommendation(
  temperature: number,
  gender: string,
  sensitivity: string,
  styles: string[]
) {
  const response = await fetch("/api/recommendation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ temperature, gender, sensitivity, styles }),
  });

  if (!response.ok) {
    throw new Error("추천 데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
}
