import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/bankruptcy', {
    title: '개인회생·개인파산 전문 변호사 | 재산회복 상담',
    description: '개인회생 신청부터 면책까지 전 과정 대행. 개인회생 vs 개인파산 비교 상담. 월 변제금 최소화. 채무 탕감 전문. 법률사무소 로앤이.',
    keywords: '개인회생 변호사, 개인파산 변호사, 회생 변호사, 파산 변호사, 재산회복, 채무 탕감, 면책, 월 변제금',
    ogTitle: '개인회생·개인파산 전문 변호사',
    ogDescription: '개인회생 신청부터 면책까지 전 과정 대행. 월 변제금 최소화, 채무 탕감 전문.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '개인회생과 개인파산의 차이가 뭔가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '개인회생은 소득이 있는 경우 3~5년간 일부를 변제하고 나머지를 탕감받는 제도입니다. 개인파산은 갚을 능력이 없는 경우 채무 전액을 면책받는 제도입니다. 상담을 통해 어떤 제도가 유리한지 정확히 진단해드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '회생·파산하면 직장을 잃나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반 직장인은 영향이 없습니다. 다만 금융기관, 법무사, 공인중개사 등 일부 자격 제한 직종은 파산 시 제한이 있을 수 있으며, 이 경우 회생을 권유드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '집이나 차를 뺏기나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '개인회생의 경우 재산을 유지하면서 진행 가능합니다. 파산의 경우에도 생활에 필수적인 재산은 보호됩니다. 구체적인 재산 보전 방안을 상담 시 안내해드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '신용이 회복되기까지 얼마나 걸리나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '개인회생 인가 후 변제 완료 시, 개인파산 면책 결정 후 약 5년 이내에 신용이 회복됩니다. 로앤이는 면책 후 신용 회복 절차까지 안내해드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '빚독촉 전화가 너무 힘든데 바로 멈출 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '회생·파산 신청서가 접수되면 법원의 금지명령으로 모든 채권 추심이 즉시 중단됩니다. 접수 전이라도 변호사 선임 사실을 통보하면 직접 연락을 차단할 수 있습니다.',
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
