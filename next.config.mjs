/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/centers/lease-deposit',
        destination: '/centers/real-estate',
        permanent: true,
      },
      {
        source: '/centers/bankruptcy',
        destination: '/centers/asset-recovery',
        permanent: true,
      },
      {
        source: '/blog/%EB%B2%95%EC%9D%B8-%ED%8C%8C%EC%82%B0-vs-%EA%B0%9C%EC%9D%B8-%ED%8C%8C%EC%82%B0-%EC%82%AC%EC%97%85-%EC%8B%A4%ED%8C%A8-%ED%9B%84-%EC%84%A0%ED%83%9D-%EA%B8%B0%EC%A4%80',
        destination: '/blog/corporate-vs-personal-bankruptcy',
        permanent: true,
      },
      {
        source: '/centers/it-security',
        destination: '/centers/corporate',
        permanent: true,
      },
      // 중복 블로그 글 통합 리다이렉트
      {
        source: '/blog/:slug(.*중고거래.*사기.*환불.*|.*secondhand.*fraud.*refund.*)',
        destination: '/blog/secondhand-trade-fraud-prosecution',
        permanent: true,
      },
      {
        source: '/blog/:slug(.*국선변호사.*활용.*|.*public-defender-usage.*)',
        destination: '/blog/sexual-violence-victim-public-defender',
        permanent: true,
      },
      {
        source: '/blog/:slug(.*개인회생.*신청.*자격.*가능.*|.*personal-rehabilitation-eligibility.*)',
        destination: '/blog/personal-rehabilitation-procedure',
        permanent: true,
      },
      {
        source: '/blog/:slug(.*보이스피싱.*환급.*늦지.*|.*voice-phishing.*refund.*not-late.*)',
        destination: '/blog/voice-phishing-cash-collector-punishment',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
