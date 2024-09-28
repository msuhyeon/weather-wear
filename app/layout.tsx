import type { Metadata } from "next";
import Head from "next/head";
import styles from "./layout.module.css";
import "./globals.css";
import HamburgerMenu from "@/components/hamburgerMenu/HamburgerMenu";

export const metadata: Metadata = {
  title: "WeatherWear",
  description:
    "오늘의 날씨에 딱 맞는 옷차림을 추천해드립니다. 기온, 강수 확률, 자외선 지수 등을 고려한 맞춤형 스타일링으로 편안하고 스타일리시한 하루를 보내세요.",
  keywords: ["날씨", "코디", "패션", "추천"],
  authors: [{ name: "msh" }],
  openGraph: {
    title: "WeatherWear",
    description:
      "오늘의 날씨에 딱 맞는 옷차림을 추천해드립니다. 기온, 강수 확률, 자외선 지수 등을 고려한 맞춤형 스타일링으로 편안하고 스타일리시한 하루를 보내세요.",
    url: "",
    siteName: "WeatherWear",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>WeatherWear</h1>
            <HamburgerMenu />
          </header>
          <main className={styles.content}>{children}</main>
        </div>
      </body>
    </html>
  );
}
