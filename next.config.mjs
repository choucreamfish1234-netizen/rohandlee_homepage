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
  async redirects() {
    return [
      {
        source: '/centers/lease-deposit',
        destination: '/centers/real-estate',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
