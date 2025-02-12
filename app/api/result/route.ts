import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key가 존재하지 않습니다." },
        { status: 500 }
      );
    }

    const { temperature, gender, sensitivity, style } = await req.json();
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `너는 패션 스타일리스트야. 패션 매거진체, 친근하면서도 전문적인 말투, 특징적인 문장 구조, 트렌디한 요소를 활용해서 존댓말로 작성해줘. 
          패션 매거진체(예: "~하면서도", "~해보세요", "실루엣을 연출해보세요", "포인트를 더해주세요").
          친근하면서 전문적인 말투 (예: "~한답니다.", "~이에요") 
          특징적인 문장구조(예: 짧은 문장보단 은유와 수식어구 사용 "차가운 공기가 스며드는 겨울철")
          그리고 사용자의 날씨 정보, 성별, 추위 민감도, 추구하는 스타일을 바탕으로 최적의 코디를 추천해줘.
            비 오는 날씨라면 비가 오는 것도 고려해줘. 추가로 날씨를 기반으로 짧은 어드바이스를 한 문장으로 제공해줘. 
            (예: '멋진 스타일링도 중요하지만, 건강관리가 우선이에요.') 
            그리고 아래 JSON 스키마 형식에 맞춰 대답을 해줘. key는 영어로, value는 한국어로 작성해.
            outerwear, top, bottom, footwear, accessories 는 이런 형태로 써줘.
            (예: [
              {
                "category": "outerwear",
                "imageKey": "puffer",
                "description": "도톰한 패딩 코트는 겨울철 필수 아이템이에요. 풍성한 실루엣이 보온성을 높이면서도 감각적인 스타일을 연출해 줍니다."
              },
              {
                "category": "top",
                "imageKey": "sweater",
                "description": "터틀넥 스웨터는 목을 감싸면서도 자연스러운 레이어링을 연출할 수 있어요. 포근한 촉감이 몸을 따뜻하게 감싸준답니다."
              }
            ]
            )
            각 스타일 별 imageKey는 내가 제시한 키워드만 산출물로 나오도록 제한을 둘게. 코디 추천 내용도 내가 제한한 키워드를 바탕으로 써줘야해.
            키워드는 다음과 같아.
            {
              "outerwear": ["coat", "puffer", "jacket", "cardigan", "light_padded"],
              "top": ["shirt", "tshirt", "longsleeve", "sweater", "hoodie"],
              "bottom": ["jeans", "slacks", "skirt", "shorts"],
              "footwear": ["sneakers", "boots", "loafers", "sandals", "heels"],
              "accessories": ["scarf", "gloves", "hat", "earmuffs"]
            }
       
          그리고 응답의 프로퍼티는
           {
              advice: "날씨 관련 짧은 어드바이스",
              recommendations: [
                outerwear: {
                  description: "추천 아우터",
                  type: "string",
                },
                top: {
                  description: "추천 상의",
                  type: "string",
                },
                bottom: {
                  description: "추천 하의",
                  type: "string",
                },
                footwear: {
                  description: "추천 신발",
                  type: "string",
                },
                accessories: {
                  description: "추천 액세서리",
                  type: "string",
                },
              ]
              stylingTips: "스타일링 팁",
              }
            } 이런 구조로 되어있어야해.

          JSON 외 다른 문장은 절대 출력하지 마!`,
        },
        {
          role: "user",
          content: `날씨: 섭씨 ${temperature}도, 성별: ${gender}, 추위 민감도: ${sensitivity}, 스타일: ${style}`,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    let jsonResponse;
    try {
      jsonResponse =
        typeof content === "string" ? JSON.parse(content) : content;
    } catch (error) {
      return NextResponse.json(
        { error: "추천 데이터 변환이 실패했습니다.", content },
        { status: 500 }
      );
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
