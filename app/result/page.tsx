"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useWeather } from "../hook/useWeather";
import { useSearchParams } from "next/navigation";
import { Sensitivity, RecommendationData, Gender } from "@/types/weather";
import { getAIRecommendation } from "@/lib/ai";
import SplideCarousel from "@/components/carousel/SplideCarousel";

const Result = () => {
  // const [recommendation, setRecommendation] =
  //   useState<RecommendationData | null>(null);
  // const [recommendation, setRecommendation] = useState(null);
  const [coordination, setCoordination] = useState({
    advice:
      "차가운 바람이 옷깃을 스치는 계절, 보온과 스타일을 동시에 챙기는 것이 중요해요. 따뜻한 레이어링으로 겨울에도 세련된 룩을 연출해보세요.",
    recommendations: [
      {
        category: "outerwear",
        imageKey: "puffer",
        description:
          "도톰한 패딩 코트는 겨울철 필수 아이템이에요. 풍성한 실루엣이 보온성을 높이면서도 감각적인 스타일을 연출해 줍니다.",
      },
      {
        category: "top",
        imageKey: "sweater",
        description:
          "터틀넥 스웨터는 목을 감싸면서도 자연스러운 레이어링을 연출할 수 있어요. 포근한 촉감이 몸을 따뜻하게 감싸준답니다.",
      },
      {
        category: "bottom",
        imageKey: "jeans",
        description:
          "기모 청바지는 한겨울에도 따뜻한 스타일링을 가능하게 해줘요. 슬림한 핏의 데님은 깔끔한 실루엣을 연출하기에도 좋아요.",
      },
      {
        category: "footwear",
        imageKey: "boots",
        description:
          "첼시 부츠는 보온성과 스타일을 동시에 잡아주는 아이템이에요. 톤온톤 스타일링과 매치하면 더욱 세련된 분위기를 완성할 수 있어요.",
      },
      {
        category: "accessories",
        imageKey: "scarf",
        description:
          "니트 머플러로 스타일링에 포인트를 더해보세요. 부드러운 촉감과 따뜻한 감촉이 겨울철 패션을 더욱 감각적으로 만들어줍니다.",
      },
    ],
    stylingTips:
      "전체적으로 뉴트럴 톤의 아이템을 매치하고, 비비드 컬러의 악세서리로 포인트를 주면 따뜻하면서도 세련된 겨울룩을 완성할 수 있어요.",
  });

  //TODO: loading 활용 방안 찾기
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useWeather();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!data || !data.current) return;
    // fetchRecommendation();
  }, [data]);

  const fetchRecommendation = async () => {
    try {
      const gender = searchParams.get("gender") as Gender;
      const sensitivity = searchParams.get("sensitivity") as Sensitivity;
      const stylesParam = searchParams.get("styles");
      const styles = stylesParam ? stylesParam.split(",") : [];

      if (!sensitivity) throw new Error("민감도 값이 없음 오류!");

      // const res = await getAIRecommendation(
      //   data?.current?.temp,
      //   gender,
      //   sensitivity,
      //   styles
      // );

      const res = {
        advice:
          "차가운 바람이 옷깃을 스치는 계절, 보온과 스타일을 동시에 챙기는 것이 중요해요. 따뜻한 레이어링으로 겨울에도 세련된 룩을 연출해보세요.",
        recommendations: [
          {
            category: "outerwear",
            imageKey: "puffer",
            description:
              "도톰한 패딩 코트는 겨울철 필수 아이템이에요. 풍성한 실루엣이 보온성을 높이면서도 감각적인 스타일을 연출해 줍니다.",
          },
          {
            category: "top",
            imageKey: "sweater",
            description:
              "터틀넥 스웨터는 목을 감싸면서도 자연스러운 레이어링을 연출할 수 있어요. 포근한 촉감이 몸을 따뜻하게 감싸준답니다.",
          },
          {
            category: "bottom",
            imageKey: "jeans",
            description:
              "기모 청바지는 한겨울에도 따뜻한 스타일링을 가능하게 해줘요. 슬림한 핏의 데님은 깔끔한 실루엣을 연출하기에도 좋아요.",
          },
          {
            category: "footwear",
            imageKey: "boots",
            description:
              "첼시 부츠는 보온성과 스타일을 동시에 잡아주는 아이템이에요. 톤온톤 스타일링과 매치하면 더욱 세련된 분위기를 완성할 수 있어요.",
          },
          {
            category: "accessories",
            imageKey: "scarf",
            description:
              "니트 머플러로 스타일링에 포인트를 더해보세요. 부드러운 촉감과 따뜻한 감촉이 겨울철 패션을 더욱 감각적으로 만들어줍니다.",
          },
        ],
        stylingTips:
          "전체적으로 뉴트럴 톤의 아이템을 매치하고, 비비드 컬러의 악세서리로 포인트를 주면 따뜻하면서도 세련된 겨울룩을 완성할 수 있어요.",
      };

      setCoordination(res);
    } catch (error) {
      console.error(`추천 데이터를 가져오는 중 오류가 발생했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>오늘의 추천 의상</h2>
      <div className={styles.card}>
        <div className={styles.weatherInfo}>
          <p className={styles.description}>{coordination?.advice}</p>
          {/* <span className={styles.temperature}>{data?.current?.temp}°C</span> */}
        </div>
        {coordination && (
          <SplideCarousel slides={coordination.recommendations} />
        )}
        <p>스타일링 Tip!</p>
        <p>{coordination.stylingTips}</p>
      </div>
    </div>
  );
};

export default Result;
