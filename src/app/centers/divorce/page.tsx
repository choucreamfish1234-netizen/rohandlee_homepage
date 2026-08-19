import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import DivorcePage from './DivorcePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/divorce', {
    title: '이혼·가사 전담센터 | 최초의 종합 피해자 중심 로펌 로앤이',
    description: '이혼 소송, 양육권, 재산분할, 위자료, 가정폭력 이혼, 국제이혼. 피해자 중심의 이혼 전문 변호. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '이혼 변호사, 이혼 소송 비용, 양육권 변호사, 재산분할 방법, 위자료 청구, 협의이혼 절차, 가정폭력 이혼, 국제이혼, 양육비 청구, 이혼 전 재산 보전',
    ogTitle: '이혼·가사 전담센터 | 로앤이',
    ogDescription: '이혼 소송, 양육권, 재산분할, 위자료, 가정폭력 이혼. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '이혼 소송 비용은 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '이혼 소송 비용은 사건의 복잡도, 재산분할 규모에 따라 달라집니다. 상담 시 예상 비용을 투명하게 안내해드립니다.' } },
    { '@type': 'Question', name: '배우자가 이혼에 동의하지 않아도 이혼할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '민법 제840조의 재판상 이혼 사유에 해당하면 재판을 통해 이혼할 수 있습니다.' } },
    { '@type': 'Question', name: '가정폭력을 당하고 있는데 이혼하지 않고도 보호받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 가정폭력처벌법에 따라 이혼 여부와 관계없이 접근금지, 퇴거, 피해자 보호명령을 받을 수 있습니다.' } },
    { '@type': 'Question', name: '재산분할 비율은 어떻게 정해지나요?', acceptedAnswer: { '@type': 'Answer', text: '혼인 기간, 각자의 기여도, 양육 부담 등을 종합적으로 고려합니다. 전업주부의 경우에도 가사노동의 기여가 인정됩니다.' } },
    { '@type': 'Question', name: '양육비를 안 주면 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '양육비 이행명령을 신청하고, 불이행 시 감치, 급여 압류, 재산 강제집행이 가능합니다.' } },
    { '@type': 'Question', name: '외도 증거가 없어도 위자료를 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '직접적인 증거가 없더라도 정황 증거(카톡, 신용카드 내역, 위치 기록 등)로 입증 가능합니다.' } },
    { '@type': 'Question', name: '전업주부인데 재산분할을 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네. 대법원은 전업주부의 가사노동도 재산 형성에 대한 기여로 인정합니다. 통상 30~50%를 인정받습니다.' } },
    { '@type': 'Question', name: '상간자 위자료는 얼마나 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '판례상 통상 1,000만 원에서 3,000만 원 사이이며, 교제 기간, 혼인 파탄 기여도 등에 따라 달라집니다.' } },
    { '@type': 'Question', name: '전국에서 상담받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전화·화상·온라인 상담이 가능합니다. 로앤이는 전국 어디든 출장 대응합니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DivorcePage />
    </>
  )
}
