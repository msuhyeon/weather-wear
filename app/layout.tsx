import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ClientProviders from "@/components/ClientProvider";
// import { Playfair_Display } from "next/font/google";

import HamburgerMenu from "@/components/hamburgerMenu/HamburgerMenu";
import "./globals.css";
import styles from "./layout.module.css";

// const playfiarDisplay = Playfair_Display({
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "WeatherWear",
  description:
    "오늘의 날씨에 딱 맞는 옷차림을 추천해드립니다. 기온, 강수 확률, 자외선 지수 등을 고려한 맞춤형 스타일링으로 편안하고 스타일리시한 하루를 보내세요.",
  keywords: ["날씨", "코디", "패션", "추천"],
  authors: [{ name: "msh" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "WeatherWear",
    description:
      "오늘의 날씨에 딱 맞는 옷차림을 추천해드립니다. 기온, 강수 확률, 자외선 지수 등을 고려한 맞춤형 스타일링으로 편안하고 스타일리시한 하루를 보내세요.",
    url: "",
    siteName: "WeatherWear",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeatherWear 대표 이미지",
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
      {/* <body className={playfiarDisplay.className}> */}
      <body>
        <React.StrictMode>
          <ClientProviders>
            <div className={styles.container}>
              <header className={styles.header}>
                <HamburgerMenu />
                <Link className={styles.headerLogo} href="/">
                  <h1>WeatherWear</h1>
                </Link>
              </header>
              <main className={styles.content}>{children}</main>
            </div>
          </ClientProviders>
        </React.StrictMode>
      </body>
    </html>
  );
}
