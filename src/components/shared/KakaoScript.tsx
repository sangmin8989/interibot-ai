"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export default function KakaoScript() {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (
          typeof window !== "undefined" &&
          window.Kakao &&
          !window.Kakao.isInitialized()
        ) {
          const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
          if (key) window.Kakao.init(key);
        }
      }}
    />
  );
}
