import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ConsultationProvider from '@/components/ConsultationProvider'

const baseUrl = 'https://rohandlee-homepage.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    template: '%s | 법률사무소 로앤이',
  },
  description:
    '법률사무소 로앤이는 성범죄·재산범죄 피해자만을 변호합니다. 부천 소재, 이유림·노채은 변호사가 피해자의 권리를 끝까지 지켜드립니다. 무료 상담 032-207-8788',
  keywords: [
    '성범죄 변호사',
    '성범죄 피해자 변호사',
    '재산범죄 변호사',
    '부천 변호사',
    '법률사무소 로앤이',
    '회생파산 변호사',
    '피해자 전문 변호사',
    '이유림 변호사',
    '노채은 변호사',
  ],
  authors: [{ name: '법률사무소 로앤이' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: baseUrl,
    siteName: '법률사무소 로앤이',
    title: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '성범죄·재산범죄 피해자 전문 법률사무소. 무료 상담 032-207-8788',
  },
  twitter: {
    card: 'summary_large_image',
    title: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '성범죄·재산범죄 피해자 전문 법률사무소. 무료 상담 032-207-8788',
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
  alternates: {
    canonical: baseUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이',
  alternateName: 'ROH & LEE LAW FIRM',
  description: '성범죄·재산범죄 피해자 전문 법률사무소',
  url: baseUrl,
  telephone: '032-207-8788',
  email: 'roandlee@roandlee.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '부일로205번길 54, 205호',
    addressLocality: '부천시',
    addressRegion: '경기도',
    postalCode: '14544',
    addressCountry: 'KR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
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
        <ConsultationProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <FloatingButtons />
        </ConsultationProvider>
      </body>
    </html>
  )
}
