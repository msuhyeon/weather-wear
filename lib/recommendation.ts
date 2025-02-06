export async function getRecommendation(
  temperature: number,
  sensitivity: string
) {
  const response = await fetch(
    `/api/recommendation?temperature=${temperature}&sensitivity=${sensitivity}`
  );

  if (!response.ok) {
    throw new Error("추천 데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
}
