import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/financial-fraud', {
    title: '금융사기 피해자 전담센터 | 투자사기·보이스피싱·전세사기',
    description: '금융사기 피해자만을 대리합니다. 투자사기, 유사수신, 보이스피싱, 전세사기 등 피해 사건에서 형사고소부터 가압류, 손해배상, 강제집행까지 통합 대응합니다. 상담 032-207-8788',
    keywords: '금융사기 피해자 변호사, 금융사기 전문 변호사, 사기 피해자 변호사, 투자사기 피해자 변호사, 보이스피싱 피해자 변호사, 전세사기 피해자 변호사, 유사수신 피해자 변호사, 재산범죄 피해자 변호사, 횡령 고소, 배임 고소, 법률사무소 로앤이',
    ogTitle: '금융사기 피해자 전담센터 | 투자사기·보이스피싱·전세사기',
    ogDescription: '금융사기 피해자만을 대리합니다. 형사고소부터 가압류, 손해배상, 강제집행까지 통합 대응. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '금융사기를 당하면 형사고소와 민사소송을 동시에 해야 하나요?', acceptedAnswer: { '@type': 'Answer', text: '동시에 진행하는 것이 가장 효과적입니다. 형사고소로 가해자를 압박하면서 민사소송으로 손해배상을 청구하고, 가압류로 재산을 먼저 동결시킵니다. 로앤이는 이 세 가지를 한 팀에서 동시에 진행합니다.' } },
    { '@type': 'Question', name: '투자사기 피해금도 가압류가 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '가능합니다. 가해자의 부동산, 예금, 차량, 매출채권 등에 가압류를 신청할 수 있습니다. 소송 전에 가압류를 먼저 진행하여 가해자가 재산을 빼돌리지 못하게 하는 것이 핵심입니다.' } },
    { '@type': 'Question', name: '보이스피싱 피해도 변호사가 고소부터 재산회수까지 도와줄 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 보이스피싱 피해도 형사고소, 계좌 동결, 피해금 환급 신청, 민사 손해배상 소송까지 전 과정을 대리합니다.' } },
    { '@type': 'Question', name: '전세사기 피해도 금융사기 피해자 전담센터에서 다루나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전세사기도 금융사기의 한 유형으로 전담센터에서 다룹니다. 보증금 반환 소송, 가압류, 형사 고소를 동시에 진행합니다.' } },
    { '@type': 'Question', name: '가해자가 재산을 숨기기 전에 할 수 있는 조치는 무엇인가요?', acceptedAnswer: { '@type': 'Answer', text: '가압류가 가장 효과적입니다. 소송 전에도 법원에 가압류를 신청하여 가해자의 부동산, 예금, 차량 등을 동결시킬 수 있습니다.' } },
    { '@type': 'Question', name: '이미 형사고소를 했는데 돈을 돌려받지 못한 경우에도 도움을 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '가능합니다. 형사 절차와 별도로 민사 손해배상 소송을 제기할 수 있습니다. 가해자의 재산을 조회하고 강제집행을 통해 피해금을 회수합니다.' } },
  ],
}

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 금융사기 피해자 전담센터',
  description: '금융사기 피해자만을 대리합니다. 투자사기, 유사수신, 보이스피싱, 전세사기, 횡령, 배임 등 금융사기를 포함한 주요 재산범죄 피해 사건에서 형사고소부터 가압류, 손해배상, 강제집행까지 통합 대응.',
  url: 'https://lawfirmrohandlee.com/centers/financial-fraud',
  telephone: '032-207-8788',
  areaServed: { '@type': 'Country', name: 'KR' },
  serviceType: ['투자사기', '유사수신', '보이스피싱', '전세사기', '횡령', '배임', '대여금 사기', '가상자산 사기', '다단계 사기'],
  provider: { '@type': 'LegalService', name: '법률사무소 로앤이', url: 'https://lawfirmrohandlee.com' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />
      <CenterPage />
    </>
  )
}
