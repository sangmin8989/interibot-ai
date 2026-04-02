import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp 사용 금지 (Vercel 50MB 제한)
  images: {
    unoptimized: true,
  },
  // Vercel serverless function 최적화
  serverExternalPackages: ["pdf-parse", "xlsx"],
};

export default nextConfig;
