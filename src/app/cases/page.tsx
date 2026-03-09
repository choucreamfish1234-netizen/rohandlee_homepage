import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CasesList from './CasesList'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/cases', {
    title: '성공사례',
    description: '법률사무소 로앤이의 성공사례. 보이스피싱 불송치, 성범죄 엄벌, 회생인가 등 실제 사건 결과로 증명합니다. 600건 이상 의뢰인 후기.',
    ogTitle: '성공사례 | 법률사무소 로앤이',
    ogDescription: '보이스피싱 불송치, 성범죄 엄벌, 회생인가 등 실제 사건 결과로 증명합니다.',
  })
}

const casesJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    name: '강도강간 등 고소대리 - 징역 8년 선고',
    description: '성범죄 피해자 고소대리를 통해 가해자에게 징역 8년이 선고된 사례',
    author: { '@type': 'Organization', name: '법률사무소 로앤이' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    name: '보이스피싱 수거책 불송치',
    description: '보이스피싱 수거책 혐의를 받은 의뢰인의 불송치 결정을 이끌어낸 사례',
    author: { '@type': 'Organization', name: '법률사무소 로앤이' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    name: '카메라이용촬영물 압수수색 및 디지털 포렌식',
    description: '불법촬영 피해 사건에서 압수수색 및 디지털 포렌식을 통해 증거를 확보한 사례',
    author: { '@type': 'Organization', name: '법률사무소 로앤이' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    name: '폭처법상 공동상해 정식재판청구 무죄',
    description: '폭력행위등처벌에관한법률 공동상해 혐의에 대해 무죄 판결을 이끌어낸 사례',
    author: { '@type': 'Organization', name: '법률사무소 로앤이' },
  },
]

export default function Page() {
  return (
    <>
      {casesJsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <CasesList />
    </>
  )
}
