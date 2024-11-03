"use client";

import { createContext, useContext, useState } from "react";
import { RecommendationData } from "@/app/types/weather";

type RecommendationContextType = {
  recommendationData: RecommendationData | null;
  setRecommendationData: (data: RecommendationData) => void;
};

// provider 없이 접근되는걸 막기위해 undefined로 초기화
const RecommendationContext = createContext<
  RecommendationContextType | undefined
>(undefined);

export function RecommendationDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recommendationData, setRecommendationData] =
    useState<RecommendationData | null>(null);

  return (
    <RecommendationContext.Provider
      value={{ recommendationData, setRecommendationData }}
    >
      {children}
    </RecommendationContext.Provider>
  );
}

export const useRecommendationData = () => {
  const context = useContext(RecommendationContext);

  if (!context) throw new Error("Error in RecommendationContext");

  return context;
};
