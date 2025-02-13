export async function getCoordinates(city?: string) {
  const response = await fetch(`/api/geocode?${city}`);

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
