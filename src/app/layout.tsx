import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import FilmGrain from "@/components/shared/FilmGrain";
import Preloader from "@/components/shared/Preloader";
import ScrollProgress from "@/components/shared/ScrollProgress";
import AmbientSound from "@/components/shared/AmbientSound";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "인테리봇 AI — 당신의 인테리어에 확신을",
  description: "121,515건 시장 데이터 기반. 견적서 감사, 성향분석, 집값 분석.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full`}>
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;400;700;900&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-white font-pretendard text-black antialiased">
        <Preloader />
        <LenisProvider>
          <CustomCursor />
          <FilmGrain />
          <ScrollProgress />
          <AmbientSound />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
