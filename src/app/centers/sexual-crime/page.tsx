import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/sexual-crime', {
    title: '성범죄 피해자 전담센터',
    description: '강간·강제추행·불법촬영·딥페이크·스토킹. 형사 고소부터 민사 손해배상, 접근금지 가처분, 파생 피해까지 원스톱 해결. 이유림 변호사, 《피해자 감별사회》 저자. 상담 032-207-8788',
    keywords: '성범죄 변호사, 성범죄 피해자 변호사, 성폭행 변호사, 성추행 변호사, 강제추행 변호사, 불법촬영 변호사, 몰카 변호사, 디지털성범죄, 리벤지포르노, 딥페이크, 스토킹 변호사, 피해자 국선변호사',
    ogTitle: '성범죄 피해자 전담센터',
    ogDescription: '강간·강제추행·불법촬영·딥페이크·스토킹. 형사 고소부터 손해배상까지 원스톱. 《피해자 감별사회》 저자 이유림 변호사.',
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
        text: '네, 변호사가 증거 수집을 도와드립니다. 직접적인 증거가 없더라도 정황 증거, 카카오톡 대화, CCTV 등을 활용하고, 필요 시 전문 포렌식 업체와 협업하여 사건을 입증할 수 있습니다.',
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
