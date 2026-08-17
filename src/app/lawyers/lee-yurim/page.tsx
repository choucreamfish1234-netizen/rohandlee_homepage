import type { Metadata } from 'next'
import LeeYurimProfile from './LeeYurimProfile'

const baseUrl = 'https://lawfirmrohandlee.com'

export const metadata: Metadata = {
  title: '이유림 변호사 | 성범죄 피해자 대리 · 《피해자 감별사회》 저자',
  description: 'ROH&LEE 이유림 대표변호사는 성폭력·스토킹·디지털성범죄 피해자를 대리하며, 박영사 베스트셀러 《피해자 감별사회》 공동저자이자 피해자 지원 앱 《진심의 무게》 개발자입니다.',
  alternates: { canonical: `${baseUrl}/lawyers/lee-yurim` },
  openGraph: {
    type: 'profile',
    title: '이유림 변호사 | ROH&LEE 대표변호사',
    description: '성폭력·스토킹·디지털성범죄 피해자 대리. 《피해자 감별사회》 공동저자. 《진심의 무게》 개발자.',
    url: `${baseUrl}/lawyers/lee-yurim`,
    siteName: '법률사무소 로앤이',
    locale: 'ko_KR',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이유림 변호사 | ROH&LEE 대표변호사',
    description: '성폭력·스토킹·디지털성범죄 피해자 대리. 《피해자 감별사회》 공동저자.',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '이유림',
  jobTitle: '대표변호사',
  worksFor: {
    '@type': 'LegalService',
    name: '법률사무소 로앤이',
    alternateName: 'ROH&LEE',
    url: baseUrl,
  },
  knowsAbout: [
    '성폭력 피해자 대리',
    '스토킹 피해자 대리',
    '디지털성범죄 피해자 대리',
    '피해자 권리',
    'LegalTech',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: '한국외국어대학교' },
    { '@type': 'CollegeOrUniversity', name: '충북대학교 법학전문대학원' },
  ],
  memberOf: [
    { '@type': 'Organization', name: '서울지방변호사회' },
    { '@type': 'Organization', name: '대한난민지원변호사단' },
  ],
  author: [
    {
      '@type': 'Book',
      name: '피해자 감별사회',
      author: [
        { '@type': 'Person', name: '이유림' },
        { '@type': 'Person', name: '노채은' },
      ],
      publisher: { '@type': 'Organization', name: '박영사' },
      url: 'https://product.kyobobook.co.kr/detail/S000220843163',
      inLanguage: 'ko',
    },
    {
      '@type': 'Book',
      name: '바이브코딩 바이블',
      author: { '@type': 'Person', name: '이유림' },
      inLanguage: 'ko',
    },
  ],
  creator: {
    '@type': 'SoftwareApplication',
    name: '진심의무게',
    applicationCategory: 'LegalService',
    operatingSystem: 'Web',
    description: '범죄피해자의 엄벌탄원서 작성을 돕는 무료 생성 애플리케이션',
    url: `${baseUrl}/apps/sincerity`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  },
  url: `${baseUrl}/lawyers/lee-yurim`,
  sameAs: [
    'https://www.lawtalk.co.kr/directory/profile/8292-이유림/review',
    'https://product.kyobobook.co.kr/detail/S000220843163',
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LeeYurimProfile />
    </>
  )
}
