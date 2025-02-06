const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

interface Coordinates {
  lat: number;
  lon: number;
}

export const getLocation = (coordinates: Coordinates) => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coordinates.lat}&y=${coordinates.lon}`;
  const repsonse = fetch(url, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));

  return repsonse;
};
