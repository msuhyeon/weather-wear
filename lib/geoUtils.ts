export async function getCoordinates(query: { city?: string; name?: string }) {
  const searchParams = new URLSearchParams();

  if (query.city) {
    searchParams.append("city", query.city);
  }

  const response = await fetch(`/api/geocode?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("도시 검색을 실패했습니다.");
  }

  return response.json();
}

export async function getLocationName(lat: number, lon: number, name: string) {
  const response = await fetch(
    `/api/location?lat=${lat}&lon=${lon}&location=${name}`
  );

  if (!response.ok) {
    throw new Error("지역의 이름을 가져오는데 실패했습니다.");
  }

  return response.json();
}
