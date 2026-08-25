import type { Metadata } from 'next'
import RohChaeeunProfile from './RohChaeeunProfile'

const baseUrl = 'https://lawfirmrohandlee.com'

export const metadata: Metadata = {
  title: '노채은 변호사 | 재산범죄 피해자 대리 · 《피해자 감별사회》 공동저자',
  description: 'ROH&LEE 노채은 대표변호사는 사기·횡령·배임·보이스피싱 피해자를 대리하며, 박영사 베스트셀러 《피해자 감별사회》 공동저자입니다.',
  alternates: { canonical: `${baseUrl}/lawyers/roh-chaeeun` },
  openGraph: {
    type: 'profile',
    title: '노채은 변호사 | ROH&LEE 대표변호사',
    description: '사기·횡령·배임·보이스피싱 피해자 대리. 《피해자 감별사회》 공동저자.',
    url: `${baseUrl}/lawyers/roh-chaeeun`,
    siteName: '법률사무소 로앤이',
    locale: 'ko_KR',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '노채은',
  jobTitle: '대표변호사',
  worksFor: {
    '@type': 'LegalService',
    name: '법률사무소 로앤이',
    alternateName: 'ROH&LEE',
    url: baseUrl,
  },
  knowsAbout: [
    '사기 피해자 대리',
    '횡령·배임 피해자 대리',
    '보이스피싱 피해자 대리',
    '전세사기 피해자 대리',
    '재산범죄',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: '충북대학교 법학전문대학원' },
  ],
  memberOf: [
    { '@type': 'Organization', name: '인천지방변호사회' },
  ],
  author: {
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
  url: `${baseUrl}/lawyers/roh-chaeeun`,
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <RohChaeeunProfile />
    </>
  )
}
