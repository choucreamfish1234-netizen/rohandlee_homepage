import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import ForeignVictimHub from './ForeignVictimHub'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/foreign-victim', {
    title: '외국인 범죄피해 지원센터 | 중국어·영어·베트남어 상담',
    description: '한국에서 범죄 피해를 입은 외국인도 한국법의 보호를 받습니다. 성범죄, 스토킹, 사기, 폭행, 전세사기, 임금체불 피해 외국인 전문 법률 지원. 중국어·영어·베트남어 상담 가능. 대표변호사 직접 수행. 032-207-8788',
    keywords: '외국인 범죄피해 변호사, 외국인 변호사 한국, foreigner lawyer Korea, English speaking lawyer Korea, 韩国律师 中文, 韩国刑事律师, luật sư Hàn Quốc tiếng Việt, crime victim lawyer Korea, 외국인 성범죄 피해, 외국인 사기 피해, 외국인 임금체불',
    ogTitle: '외국인 범죄피해 지원센터 | 법률사무소 로앤이',
    ogDescription: '한국에서 범죄 피해를 입은 외국인을 위한 다국어 법률 지원. 중국어·영어·베트남어 상담. 032-207-8788',
  })
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 외국인 범죄피해 지원센터',
  alternateName: [
    'Law Firm Ro&Lee Foreign Victim Support Center',
    '法律事务所Ro&Lee 外国人犯罪受害者支援中心',
    'Công ty Luật Ro&Lee Trung tâm Hỗ trợ Nạn nhân Nước ngoài',
  ],
  description: '한국에서 범죄 피해를 입은 외국인을 위한 다국어 법률 지원. 대표변호사 직접 상담 및 사건 수행.',
  url: 'https://lawfirmrohandlee.com/centers/foreign-victim',
  telephone: '+82-32-207-8788',
  email: 'rohetlee@naver.com',
  address: { '@type': 'PostalAddress', addressLocality: '부천시', addressRegion: '경기도', addressCountry: 'KR' },
  availableLanguage: [
    { '@type': 'Language', name: 'Korean', alternateName: 'ko' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
    { '@type': 'Language', name: 'Chinese', alternateName: 'zh' },
    { '@type': 'Language', name: 'Vietnamese', alternateName: 'vi' },
  ],
  areaServed: { '@type': 'Country', name: 'South Korea' },
  knowsAbout: ['외국인 범죄피해 대리', 'Foreign crime victim representation in Korea', '外国人犯罪受害者法律代理', '성범죄', '스토킹', '사기', '폭행', '전세사기', '임금체불'],
  founder: [
    { '@type': 'Person', name: '이유림', jobTitle: '대표변호사' },
    { '@type': 'Person', name: '노채은', jobTitle: '대표변호사' },
  ],
  parentOrganization: { '@type': 'LegalService', name: '법률사무소 로앤이', url: 'https://lawfirmrohandlee.com' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <link rel="alternate" hrefLang="ko" href="https://lawfirmrohandlee.com/centers/foreign-victim" />
      <link rel="alternate" hrefLang="en" href="https://lawfirmrohandlee.com/en/foreign-victim" />
      <link rel="alternate" hrefLang="zh" href="https://lawfirmrohandlee.com/zh/foreign-victim" />
      <link rel="alternate" hrefLang="vi" href="https://lawfirmrohandlee.com/vi/foreign-victim" />
      <link rel="alternate" hrefLang="x-default" href="https://lawfirmrohandlee.com/centers/foreign-victim" />
      <ForeignVictimHub locale="ko" />
    </>
  )
}
