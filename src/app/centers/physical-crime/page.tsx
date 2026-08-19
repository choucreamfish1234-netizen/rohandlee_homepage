import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import PhysicalCrimePage from './PhysicalCrimePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/physical-crime', {
    title: '스토킹·데이트폭력·폭행·협박 피해 전담센터 | 최초의 종합 피해자 중심 로펌 로앤이',
    description: '스토킹 접근금지, 데이트폭력 고소, 폭행 합의금, 협박 고소, 가정폭력 보호명령. 접근금지 가처분·형사 고소·민사 손해배상 원스톱 해결. 《피해자 감별사회》 저자 이유림 변호사. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '스토킹 변호사, 스토킹 접근금지, 데이트폭력 고소, 폭행 합의금, 상해 합의금, 협박 고소 방법, 가정폭력 변호사, 가정폭력 접근금지, 공갈 고소, 감금 고소, 학교폭력 변호사, 법률사무소 로앤이',
    ogTitle: '스토킹·데이트폭력·폭행·협박 피해 전담센터 | 로앤이',
    ogDescription: '스토킹·데이트폭력·폭행·협박. 접근금지·형사 고소·손해배상 원스톱. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '스토킹으로 경찰에 신고하면 바로 접근금지가 되나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 경찰은 스토킹처벌법에 따라 즉시 긴급응급조치를 내릴 수 있습니다. 접근금지, 연락금지, 100미터 이내 접근 금지 등이 포함됩니다.' } },
    { '@type': 'Question', name: '데이트폭력인데 연인 사이에도 고소가 되나요?', acceptedAnswer: { '@type': 'Answer', text: '당연히 됩니다. 연인 관계는 폭력의 면책 사유가 아닙니다. 폭행, 상해, 협박, 감금, 공갈, 강요 등 모든 범죄가 연인 사이에서도 동일하게 적용됩니다.' } },
    { '@type': 'Question', name: '폭행 합의금은 보통 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '피해 정도, 치료 기간, 후유증 유무, 가해자 전과 여부에 따라 달라집니다. 단순 폭행은 수백만 원부터, 중상해의 경우 수천만 원 이상입니다.' } },
    { '@type': 'Question', name: '스토킹 접근금지를 위반하면 어떻게 되나요?', acceptedAnswer: { '@type': 'Answer', text: '스토킹처벌법상 잠정조치 위반 시 2년 이하 징역 또는 2천만 원 이하 벌금에 처해집니다.' } },
    { '@type': 'Question', name: '가정폭력인데 이혼하지 않고도 보호받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 가정폭력처벌법에 따라 이혼 여부와 관계없이 접근금지, 퇴거, 피해자 보호명령을 받을 수 있습니다.' } },
    { '@type': 'Question', name: '협박 증거를 어떻게 확보하나요?', acceptedAnswer: { '@type': 'Answer', text: '대화 당사자의 녹음은 합법입니다. 전화 통화를 녹음하거나, 카카오톡, 문자, SNS DM은 전후 맥락이 포함되도록 넓은 범위로 캡처하세요.' } },
    { '@type': 'Question', name: '전국에서 상담받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전화·화상·온라인 상담이 가능합니다. 수사기관 동행, 법원 출석까지 전국 어디든 직접 갑니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PhysicalCrimePage />
    </>
  )
}
