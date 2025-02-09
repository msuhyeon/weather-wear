export async function getAIRecommendation(
  temperature: number,
  gender: string,
  sensitivity: string,
  style: string[]
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) throw new Error("API Key가 설정되지 않았습니다.");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 패션 스타일리스트야. 사용자의 날씨 정보,성별, 추위 민감도, 추구하는 스타일을 바탕으로 최적의 코디를 추천해줘. 처음엔 날씨에 대해 짧게 어드바이스 해줘 예를 들어 '추우니까 감기 조심하세요!' or '이런 날씨엔 목도리 필수!' or '날씨가 너무 덥네요 수분 보충 꼭 잊지말기!' 이렇게. 그리고 대답은 json 형식으로 해주고 key는 영어로 value는 한국어로 해줘.",
        },
        {
          role: "user",
          content: `현재 기온이 ${temperature}도야. 성별은 ${gender}이고, 추위 민감도는 ${sensitivity}야. 난 ${style}한 옷을 좋아해. 어떤 옷을 입어야 할까?`,
        },
      ],
      max_tokens: 150,
    }),
  });

  const result = await response.json();
  return result.choices[0].message.content.trim();
}
