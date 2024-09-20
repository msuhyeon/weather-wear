import React from "react";

type ResultProps = {
  searchParams: {
    data: string;
    // data: {
    //   clothing: {
    //     male: string[];
    //     female: string[];
    //   };
    //   currentTemperature: number;
    //   gender: string;
    // };
  };
};

const Result: React.FC<ResultProps> = ({ searchParams }) => {
  const data = JSON.parse(decodeURIComponent(searchParams.data));

  console.log("data-", data);

  return (
    <div>
      <h2>오늘의 추천 의상 (기온: {data.currentTemperature}°C)</h2>
      <div>{data.clothing[data.gender]}</div>
    </div>
  );
};

export default Result;
