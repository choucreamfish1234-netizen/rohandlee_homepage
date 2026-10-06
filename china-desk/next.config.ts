import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 상위 폴더(본 홈페이지)의 lockfile 을 루트로 오인하지 않도록 고정
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  experimental: {
    // 변호사 사진 업로드(5MB) 용 server action 본문 한도
    serverActions: { bodySizeLimit: "6mb" },
  },
  async redirects() {
    return [{ source: "/", destination: "/cn", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
