/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ]
  },
};

export default nextConfig;
