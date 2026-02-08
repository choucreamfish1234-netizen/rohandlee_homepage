import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata: Metadata = {
  metadataBase: new URL('https://roandlee.com'),
  title: {
    default: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    template: '%s | 법률사무소 로앤이',
  },
  description:
    '법률사무소 로앤이는 성범죄·재산범죄 피해자 전담, 회생파산, 기업경영 법무, IT보안 법률 전문 법률사무소입니다. 부산 변호사 이유림, 노채은이 끝까지 함께합니다.',
  keywords: [
    '법률사무소 로앤이',
    '부산 변호사',
    '성범죄 피해자 변호사',
    '재산범죄 변호사',
    '회생파산',
    '기업법무',
    'IT보안 법률',
    '이유림 변호사',
    '노채은 변호사',
    '피해자 전담',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://roandlee.com',
    siteName: '법률사무소 로앤이',
    title: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description:
      '성범죄·재산범죄 피해자 전담, 회생파산, 기업경영, IT보안 전문 법률사무소. 부산 법원 앞.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '법률사무소 로앤이',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '성범죄·재산범죄 피해자 전담, 회생파산, 기업경영, IT보안 전문 법률사무소',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://roandlee.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이',
  description: '오직 피해자만 변호합니다. 성범죄·재산범죄 피해자 전담, 회생파산, 기업경영 법무, IT보안 법률 전문.',
  url: 'https://roandlee.com',
  telephone: '055-261-8788',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '법원로13번길 24 3층',
    addressLocality: '부산광역시',
    addressRegion: '연제구',
    postalCode: '47590',
    addressCountry: 'KR',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  employee: [
    {
      '@type': 'Person',
      name: '이유림',
      jobTitle: '대표변호사',
    },
    {
      '@type': 'Person',
      name: '노채은',
      jobTitle: '파트너 대표변호사',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard (본문) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Noto Serif KR (한글 제목) + Playfair Display (영문/숫자) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Serif+KR:wght@400;500;600;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
