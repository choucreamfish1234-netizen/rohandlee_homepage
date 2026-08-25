import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import DamagesPage from './DamagesPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/damages', {
    title: '교통사고·의료사고·산재·손해배상 전담센터',
    description: '교통사고 합의금 적정성 검토, 의료사고 소송, 산재 신청 대리, 제조물 결함, 공사 피해 손해배상. 보험사 저가 합의 거부, 가해자 형사 고소 병행. 모든 피해를 한곳에서. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '교통사고 합의금, 교통사고 변호사, 의료사고 소송 방법, 의료과실 변호사, 산재 신청 방법, 산재 불승인 불복, 산업재해 변호사, 제조물 책임 소송, 공사 피해 손해배상, 층간소음 손해배상, 반려동물 피해 보상, 보험사 합의금 적정성, 후유장해 등급, 법률사무소 로앤이',
    ogTitle: '교통사고·의료사고·산재·손해배상 전담센터',
    ogDescription: '교통사고·의료사고·산재·제조물. 보험사 합의금 적정성 검토, 형사 고소 병행. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '교통사고 합의금이 적은 것 같은데, 더 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '보험사는 자체 기준으로 최소한의 합의금을 제시합니다. 실제 치료비, 휴업손해, 위자료, 후유장해 보상을 정확하게 산정하면 보험사 제시액의 2~3배 이상 받는 경우도 많습니다.' } },
    { '@type': 'Question', name: '의료사고인지 아닌지 어떻게 알 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '치료 결과가 예상과 크게 다르거나, 설명 없이 추가 시술을 받았거나, 수술 후 비정상적인 합병증이 발생한 경우 의료 과실이 있을 수 있습니다. 의료 기록을 분석하여 과실 여부를 판단합니다.' } },
    { '@type': 'Question', name: '산재 신청을 회사가 안 해줘요.', acceptedAnswer: { '@type': 'Answer', text: '산재 신청은 근로자 본인이 직접 할 수 있습니다. 회사 동의가 필요 없습니다. 근로복지공단에 직접 산재 신청서를 제출하면 됩니다.' } },
    { '@type': 'Question', name: '산재 불승인 결정을 받았는데 방법이 있나요?', acceptedAnswer: { '@type': 'Answer', text: '산재 불승인 결정에 대해 심사 청구(90일 이내) → 재심사 청구 → 행정소송으로 다툴 수 있습니다. 불승인 사유를 분석하고 추가 증거를 보강하여 재도전합니다.' } },
    { '@type': 'Question', name: '뺑소니 사고를 당했는데 가해자를 못 찾으면 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '가해자를 찾지 못하더라도 정부 보장사업을 통해 치료비와 위자료를 보상받을 수 있습니다.' } },
    { '@type': 'Question', name: '제조물 결함으로 다쳤는데 어디에 책임을 물어야 하나요?', acceptedAnswer: { '@type': 'Answer', text: '제조물책임법에 따라 제조사, 판매사, 수입사 모두에게 손해배상을 청구할 수 있습니다. 소비자는 결함과 손해 사이의 인과관계만 증명하면 됩니다.' } },
    { '@type': 'Question', name: '전국에서 상담받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전화·화상·온라인 상담이 가능합니다. 사고 발생지 관할 법원에 소송을 제기해야 하지만, 로앤이는 전국 어디든 출장 대응합니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DamagesPage />
    </>
  )
}
