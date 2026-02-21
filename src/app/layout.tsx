import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ConsultationProvider from '@/components/ConsultationProvider'
import AdminMode from '@/components/AdminMode'
import Analytics from '@/components/Analytics'

const baseUrl = 'https://lawfirmrohandlee.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '로앤이 법률사무소 | 성범죄·재산범죄 피해자 전문 변호사 | 오직 피해자만 변호합니다',
    template: '%s | 법률사무소 로앤이',
  },
  description:
    '성범죄 피해자 전문 변호사 이유림, 재산범죄 전문 변호사 노채은. 로톡 평점 4.9, 후기 600건 이상. 성폭행, 성추행, 불법촬영, 디지털성범죄, 스토킹, 보이스피싱, 전세사기 피해자를 위한 전문 법률 서비스.',
  keywords: [
    '성범죄 변호사',
    '성범죄 피해자 변호사',
    '피해자 전문 변호사',
    '성폭행 변호사',
    '성추행 변호사',
    '불법촬영 변호사',
    '디지털성범죄 변호사',
    '스토킹 변호사',
    '보이스피싱 변호사',
    '전세사기 변호사',
    '개인회생 변호사',
    '법률사무소 로앤이',
    '이유림 변호사',
    '노채은 변호사',
  ],
  authors: [{ name: '법률사무소 로앤이' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: baseUrl,
    siteName: '법률사무소 로앤이',
    title: '로앤이 법률사무소 | 성범죄·재산범죄 피해자 전문 변호사 | 오직 피해자만 변호합니다',
    description: '성범죄·재산범죄 피해자 전문. 로톡 평점 4.9, 후기 600+',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '성범죄·재산범죄 피해자 전문 변호사 | 법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '성범죄·재산범죄 피해자 전문. 로톡 평점 4.9, 후기 600+',
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'y8B4tXoCgV9DVJRsVV5PJAj0PiSnD2oe6etWwNUriUg',
    other: {
      'naver-site-verification': '5995d5d81d20805936e25878f764b2917885455a',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이',
  alternateName: 'ROH & LEE LAW FIRM',
  description: '성범죄·재산범죄 피해자 전문 법률사무소. 가해자는 변호하지 않습니다.',
  url: baseUrl,
  telephone: '032-207-8788',
  email: 'rohandlee@naver.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '부일로205번길 54, 205호',
    addressLocality: '부천시',
    addressRegion: '경기도',
    postalCode: '14544',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.4848,
    longitude: 126.7834,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '첫 상담 무료',
  openingHours: 'Mo-Fr 09:00-18:00',
  slogan: '오직 피해자만 변호합니다',
  areaServed: ['부천시', '인천', '서울', '경기도'],
  knowsAbout: ['성범죄 피해자 변호', '재산범죄 피해자 변호', '개인회생', '개인파산', '디지털성범죄', '스토킹'],
  employee: [
    {
      '@type': 'Person',
      name: '이유림',
      jobTitle: '대표변호사',
      knowsAbout: ['성범죄 피해자 변호', '디지털 포렌식', '피해자 국선변호', '불법촬영', '스토킹', 'IT 법률'],
      affiliation: { '@type': 'Organization', name: '법률사무소 로앤이' },
    },
    {
      '@type': 'Person',
      name: '노채은',
      jobTitle: '대표변호사',
      knowsAbout: ['재산범죄 피해자 변호', '보이스피싱', '전세사기', '개인회생', '개인파산', '기업자문'],
      affiliation: { '@type': 'Organization', name: '법률사무소 로앤이' },
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '600',
    bestRating: '5',
  },
  sameAs: [
    'https://www.lawtalk.co.kr/directory/profile/8292-이유림/review',
    'https://pf.kakao.com/_YxgWxcn',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AdminMode>
          <ConsultationProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
            <FloatingButtons />
          </ConsultationProvider>
        </AdminMode>
        <Analytics />
      </body>
    </html>
  )
}
