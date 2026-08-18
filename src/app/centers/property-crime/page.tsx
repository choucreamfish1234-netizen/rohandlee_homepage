import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/property-crime', {
    title: '사기·횡령·배임 피해자 전담센터 | 최초의 종합 피해자 중심 로펌 로앤이',
    description: '사기 피해 변호사, 횡령 고소, 배임 고소, 보이스피싱 피해 구제, 투자사기 피해 변호사. 형사 고소부터 가압류·강제집행까지 원스톱 해결. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '사기 피해 변호사, 횡령 고소, 배임 고소 방법, 보이스피싱 피해 변호사, 투자사기 피해, 중고거래 사기 고소, 코인 사기 피해, 사기죄 고소장, 횡령죄 성립요건, 배임죄 처벌, 법률사무소 로앤이',
    ogTitle: '사기·횡령·배임 피해자 전담센터 | 최초의 종합 피해자 중심 로펌 로앤이',
    ogDescription: '사기·횡령·배임·보이스피싱·투자사기. 형사 고소부터 가압류·강제집행까지 원스톱. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '사기죄 고소장은 어떻게 쓰나요?', acceptedAnswer: { '@type': 'Answer', text: '사기죄 고소장에는 가해자의 기망 행위, 피해자의 착오, 재산상 피해를 구체적으로 기재해야 합니다. 계좌이체 내역, 대화 기록, 계약서 등 증거를 함께 제출하면 수사가 빨라집니다. 법률사무소 로앤이는 고소장 작성부터 수사기관 동행까지 전 과정을 함께합니다.' } },
    { '@type': 'Question', name: '보이스피싱 당했는데 돈을 돌려받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '보이스피싱 피해금은 계좌 동결과 피해금 환급 제도를 통해 일부 회수가 가능합니다. 피해 직후 즉시 경찰 신고와 은행 계좌 동결을 요청하는 것이 핵심입니다. 시간이 지났더라도 가해자 특정 후 민사 손해배상으로 추가 회수가 가능합니다.' } },
    { '@type': 'Question', name: '횡령죄와 배임죄의 차이가 뭔가요?', acceptedAnswer: { '@type': 'Answer', text: '횡령은 맡겨진 재물을 임의로 사용하는 것이고, 배임은 타인의 사무를 처리하면서 본인에게 손해를 끼치는 것입니다. 둘 다 형법 제355조~356조에 따라 처벌됩니다.' } },
    { '@type': 'Question', name: '중고거래 사기인데 금액이 작아도 고소 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '금액과 관계없이 사기죄 고소가 가능합니다. 소액 사기는 같은 가해자에게 당한 다른 피해자를 찾아 공동 고소하면 수사 효율이 높아지고 처벌도 무거워집니다.' } },
    { '@type': 'Question', name: '차용증 없이 빌려준 돈도 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '차용증이 없어도 카카오톡 대화, 계좌이체 내역, 목격자 증언 등으로 대여 사실을 입증할 수 있습니다. 처음부터 갚을 의사 없이 빌린 경우 사기죄에 해당하며, 형사 고소와 민사 대여금반환청구를 동시에 진행할 수 있습니다.' } },
    { '@type': 'Question', name: '투자사기 피해인데 계약서에 서명했으면 구제가 안 되나요?', acceptedAnswer: { '@type': 'Answer', text: '계약서에 서명했더라도 가해자가 허위 정보를 제공하거나 중요한 사실을 숨긴 경우 사기죄가 성립합니다. 계약 당시의 기망 행위를 입증하면 형사 고소와 투자금 반환 청구가 가능합니다.' } },
    { '@type': 'Question', name: '사기 가해자가 재산을 숨기면 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '법원을 통한 재산조회·재산명시 제도로 가해자의 부동산, 금융자산, 자동차 등을 파악할 수 있습니다. 로앤이는 고소와 동시에 가압류를 진행하여 재산이 빠져나가기 전에 먼저 확보합니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CenterPage />
    </>
  )
}
