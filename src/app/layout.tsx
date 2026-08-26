import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ConsultationProvider from '@/components/ConsultationProvider'
import AdminMode from '@/components/AdminMode'
import Analytics from '@/components/Analytics'
import TrafficTracker from '@/components/TrafficTracker'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const baseUrl = 'https://lawfirmrohandlee.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '국내최초 종합 피해자 중심 로펌, 법률사무소 로앤이',
    template: '%s | 법률사무소 로앤이',
  },
  description:
    '국내최초 종합 피해자 중심 로펌. 성범죄·재산범죄·신체범죄·부동산·손해배상·강제집행까지 모든 피해를 한 곳에서. 대표변호사 이유림·노채은. 9대 전문센터 운영. 민형사 동시 타격 입체 전략. 상담 032-207-8788',
  keywords: [
    '국내최초 종합 피해자 중심 로펌',
    '피해자 전문 변호사',
    '성범죄 피해자 변호사',
    '재산범죄 피해자 변호사',
    '신체범죄 피해자 변호사',
    '부동산 피해 변호사',
    '손해배상 변호사',
    '강제집행 변호사',
    '가압류 변호사',
    '스토킹 변호사',
    '보이스피싱 변호사',
    '전세사기 변호사',
    '법률사무소 로앤이',
    '이유림 변호사',
    '노채은 변호사',
    '부천 변호사',
  ],
  applicationName: '법률사무소 로앤이',
  authors: [{ name: '법률사무소 로앤이' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: baseUrl,
    siteName: '법률사무소 로앤이',
    title: '국내최초 종합 피해자 중심 로펌, 법률사무소 로앤이',
    description: '성범죄·재산범죄·신체범죄·부동산·손해배상·강제집행. 모든 피해를 한 곳에서. 9대 전문센터, 민형사 동시 타격. 상담 032-207-8788',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '국내최초 종합 피해자 중심 로펌, 법률사무소 로앤이',
    description: '모든 피해를 한 곳에서. 9대 전문센터 운영. 민형사 동시 타격 입체 전략.',
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
  alternateName: 'ROH&LEE',
  description: '국내최초 종합 피해자 중심 로펌. 성범죄·재산범죄·신체범죄·부동산·손해배상·강제집행까지 모든 분야의 피해자를 전문으로 대리합니다.',
  url: baseUrl,
  telephone: '+82-32-207-8788',
  email: 'rohetlee@naver.com',
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
    latitude: 37.5044,
    longitude: 126.7660,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  slogan: '국내최초 종합 피해자 중심 로펌',
  areaServed: [
    { '@type': 'Country', name: '대한민국' },
    { '@type': 'City', name: '서울' },
    { '@type': 'City', name: '인천' },
    { '@type': 'City', name: '부천' },
    { '@type': 'City', name: '수원' },
    { '@type': 'City', name: '대전' },
    { '@type': 'City', name: '대구' },
    { '@type': 'City', name: '부산' },
    { '@type': 'City', name: '광주' },
  ],
  founder: [
    { '@type': 'Person', name: '이유림', jobTitle: '대표변호사' },
    { '@type': 'Person', name: '노채은', jobTitle: '대표변호사' },
  ],
  knowsAbout: ['성범죄 피해자 변호', '재산범죄 피해자 변호', '신체범죄 피해자 변호', '부동산 피해', '손해배상', '강제집행', '디지털성범죄', '스토킹', '학교폭력'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '9대 전문센터',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '성범죄 피해자 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '재산범죄 피해자 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '신체범죄 피해 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '이혼·가사 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '부동산 피해 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '재산회복 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '손해배상 전담센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '기업법무·개인정보보호센터' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '학교폭력 전문센터' } },
    ],
  },
  employee: [
    {
      '@type': 'Person',
      '@id': `${baseUrl}/lawyers/lee-yurim`,
      name: '이유림',
      jobTitle: '대표변호사',
      url: `${baseUrl}/lawyers/lee-yurim`,
      knowsAbout: ['성폭력 피해자 대리', '스토킹 피해자 대리', '디지털성범죄 피해자 대리', '피해자 권리', 'LegalTech'],
      affiliation: { '@type': 'Organization', name: '법률사무소 로앤이' },
      author: [
        { '@type': 'Book', name: '피해자 감별사회', publisher: { '@type': 'Organization', name: '박영사' }, url: 'https://product.kyobobook.co.kr/detail/S000220843163' },
        { '@type': 'Book', name: '바이브코딩 바이블' },
      ],
      creator: { '@type': 'SoftwareApplication', name: '진심의무게', applicationCategory: 'LegalService', url: 'https://lawfirmrohandlee.com/apps/sincerity' },
    },
    {
      '@type': 'Person',
      '@id': `${baseUrl}/lawyers/roh-chaeeun`,
      name: '노채은',
      jobTitle: '대표변호사',
      url: `${baseUrl}/lawyers/roh-chaeeun`,
      knowsAbout: ['재산범죄 피해자 변호', '보이스피싱', '전세사기', '개인회생', '개인파산', '기업자문'],
      affiliation: { '@type': 'Organization', name: '법률사무소 로앤이' },
      author: { '@type': 'Book', name: '피해자 감별사회', publisher: { '@type': 'Organization', name: '박영사' }, url: 'https://product.kyobobook.co.kr/detail/S000220843163' },
    },
  ],
  sameAs: [
    'https://www.lawtalk.co.kr/directory/profile/8292-이유림/review',
    'https://pf.kakao.com/_YxgWxcn',
    'https://www.instagram.com/lawfirm_rohandlee/',
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
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': '법률사무소 로앤이',
            'alternateName': ['로앤이', 'ROH&LEE'],
            'url': 'https://lawfirmrohandlee.com',
          }) }}
        />
        <AdminMode>
          <ConsultationProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
            <FloatingButtons />
          </ConsultationProvider>
        </AdminMode>
        <Analytics />
        <TrafficTracker />
      </body>
    </html>
  )
}
