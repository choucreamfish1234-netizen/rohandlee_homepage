import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/property-crime', {
    title: '보이스피싱·전세사기·투자사기 피해자 전문 변호사 | 로앤이',
    description: '재산범죄 피해자 전문 노채은 변호사. 보이스피싱 피해금 환급, 전세사기 특별법 활용, 투자사기 민형사 대응. 피해금 회수 전문. 로톡 평점 4.9. 첫 상담 무료.',
    keywords: '재산범죄 변호사, 보이스피싱 변호사, 전세사기 변호사, 투자사기 변호사, 횡령 변호사, 배임 변호사, 피해금 환급, 재산범죄 피해자 변호사',
    ogTitle: '보이스피싱·전세사기·투자사기 피해자 전문 변호사 | 로앤이',
    ogDescription: '재산범죄 피해자 전문 노채은 변호사. 보이스피싱 피해금 환급, 전세사기 특별법 활용. 피해금 회수 전문. 첫 상담 무료.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '사기 피해를 당했는데 돈을 돌려받을 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '가능합니다. 가해자의 재산을 추적하고 가압류를 통해 재산 은닉을 차단한 후, 민사소송과 강제집행으로 피해금을 회수합니다. 신속한 대응이 회수율을 높이는 핵심입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가해자가 재산을 숨기면 어떻게 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '재산조회 신청, 금융거래 추적, 부동산 등기 확인 등을 통해 은닉 재산을 추적합니다. 필요시 사해행위취소 소송으로 빼돌린 재산도 원상회복시킵니다.',
      },
    },
    {
      '@type': 'Question',
      name: '고소와 민사소송을 동시에 진행할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 동시에 진행하는 것이 가장 효과적입니다. 형사 고소로 처벌 압박을 가하면서 민사소송으로 손해배상을 청구하면 합의 가능성과 회수율이 모두 높아집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '보이스피싱 피해도 돈을 돌려받을 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피해 즉시 은행에 지급정지를 요청하고, 피해구제 신청을 통해 동결된 금액을 환급받을 수 있습니다. 로앤이는 추가적인 민사적 구제 방안까지 함께 진행합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '횡령·배임은 어떻게 대응하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '회사 내부 자료, 회계 기록, 이메일 등 증거를 확보한 후 고소장을 접수합니다. 동시에 횡령금에 대한 가압류를 진행하여 재산 회수의 실효성을 확보합니다.',
      },
    },
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
