import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/corporate', {
    title: '기업법무·개인정보보호센터',
    description: '기업 법률자문, 계약 분쟁, 개인정보 침해, 정보보호 컨설팅. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '기업 변호사, 법인설립, 계약서 검토, 주주분쟁, 스타트업 변호사, 기업법무, 개인정보보호법, 개인정보 침해, 정보보호 컨설팅',
    ogTitle: '기업법무·개인정보보호센터',
    ogDescription: '기업 법률자문, 계약 분쟁, 개인정보 침해, 정보보호 컨설팅.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '소규모 기업도 법무 서비스가 필요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 오히려 소규모일수록 초기 법적 리스크 관리가 중요합니다. 계약서 하나의 문제가 기업 존폐를 좌우할 수 있습니다. 스타트업 패키지로 부담 없이 시작하실 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '기존 고문 변호사가 있는데 추가로 필요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '로앤이는 기존 고문 변호사와 병행 가능합니다. 특히 IT·지식재산권, 노무 등 전문 분야에서 보완적 역할을 할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '계약 기간과 해지 조건은 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '최소 계약 기간은 3개월이며, 이후 월 단위로 연장됩니다. 해지는 1개월 전 통보로 자유롭게 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '비대면으로도 법무 서비스를 받을 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 화상회의와 메신저를 통한 비대면 자문이 가능합니다. 계약서 검토, 법률 의견서 등 대부분의 업무를 비대면으로 처리합니다.',
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
