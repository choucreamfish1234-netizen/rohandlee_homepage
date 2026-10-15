import { getCuratedMetadata } from '@/lib/page-metadata'
import type { Metadata } from 'next'
import RohChaeeunProfile from './RohChaeeunProfile'

const baseUrl = 'https://lawfirmrohandlee.com'

const profileMetadata = getCuratedMetadata('/lawyers/roh-chaeeun')!
export const metadata: Metadata = {
  ...profileMetadata,
  openGraph: { ...profileMetadata.openGraph, type: 'profile' },
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
  '@id': `${baseUrl}/lawyers/roh-chaeeun`,
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: '중앙대학교' },
    { '@type': 'CollegeOrUniversity', name: '경북대학교 법학전문대학원' },
  ],
  memberOf: [
    { '@type': 'Organization', name: '인천지방변호사회' },
    { '@type': 'Organization', name: '대법원 국선변호인' },
    { '@type': 'Organization', name: '한국소비자원 소송지원 변호사' },
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
