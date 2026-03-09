import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/sexual-crime', {
    title: '성범죄 피해자 전문 변호사 | 성폭행·성추행·불법촬영 피해 상담 | 로앤이',
    description: '성범죄 피해자만 변호하는 이유림 변호사. 성폭행, 성추행, 강제추행, 불법촬영, 몰카, 디지털성범죄, 리벤지포르노, 딥페이크 피해 전문 상담. 로톡 평점 4.9, 후기 600건 이상. 경찰 조사부터 재판까지 전 과정 동행. 첫 상담 무료.',
    keywords: '성범죄 변호사, 성범죄 피해자 변호사, 성폭행 변호사, 성추행 변호사, 강제추행 변호사, 불법촬영 변호사, 몰카 변호사, 디지털성범죄, 리벤지포르노, 딥페이크, 스토킹 변호사, 피해자 국선변호사',
    ogTitle: '성범죄 피해자 전문 변호사 | 법률사무소 로앤이',
    ogDescription: '성범죄 피해자만 변호하는 이유림 변호사. 성폭행, 성추행, 불법촬영, 디지털성범죄 피해 전문. 로톡 평점 4.9. 첫 상담 무료.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '성범죄 피해 상담은 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 첫 상담은 무료입니다. 전화, 카카오톡, 방문 상담 모두 가능하며 사건 개요를 파악한 후 대응 방향을 안내해 드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '경찰 조사에 변호사가 동행할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 피해자 국선변호사 또는 사선변호사가 경찰 조사에 동행합니다. 로앤이는 수사 단계부터 변호사가 동석하여 진술을 조력하고 심리적 안정을 지원합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상담 내용은 비밀이 보장되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '변호사는 법적으로 비밀유지 의무가 있습니다. 상담 내용은 절대 외부에 공개되지 않으며, 의뢰인의 프라이버시를 최우선으로 보호합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '증거가 없어도 고소할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 변호사가 증거 수집을 도와드립니다. 직접적인 증거가 없더라도 정황 증거, 카카오톡 대화, CCTV, 디지털 포렌식 등을 활용하여 사건을 입증할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가해자와 합의해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피해자의 의사에 따라 결정합니다. 합의 여부는 전적으로 피해자의 선택이며, 로앤이는 합의가 피해자에게 유리한지 면밀히 분석하고, 합의할 경우 최대한의 금액과 조건을 이끌어냅니다.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CenterPage />
    </>
  )
}
