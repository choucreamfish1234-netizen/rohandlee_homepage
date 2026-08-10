import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/it-security', {
    title: '디지털성범죄·딥페이크·리벤지포르노 피해자 변호사 | 로앤이',
    description: '불법촬영, 몰카, 딥페이크, 리벤지포르노, 온라인 성착취 피해 전문. 유포 차단, 삭제 요청, 가해자 처벌, 손해배상까지. 디지털 증거 보존 전문. 첫 상담 무료.',
    keywords: '디지털성범죄 변호사, 딥페이크 변호사, 리벤지포르노 변호사, 불법촬영 변호사, 몰카 변호사, 온라인 성착취, 유포 차단, IT 보안 법률',
    ogTitle: '디지털성범죄·딥페이크·리벤지포르노 피해자 변호사 | 로앤이',
    ogDescription: '불법촬영, 딥페이크, 리벤지포르노 피해 전문. 유포 차단, 삭제 요청, 가해자 처벌까지. 첫 상담 무료.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '개인정보보호법 위반 시 처벌이 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '매출액의 3% 이하 과징금, 5년 이하 징역 또는 5천만 원 이하 벌금이 부과될 수 있습니다. 2024년 개정법 시행 후 처벌이 대폭 강화되었으므로 사전 대비가 필수입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '해킹을 당했는데 어떻게 해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '즉시 증거를 보전하고 수사기관에 신고해야 합니다. 로앤이는 디지털 포렌식 전문 업체와 협력하여 증거 확보부터 수사 협력, 손해배상 청구까지 원스톱으로 진행합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '우리 회사도 개인정보보호법 대상인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '직원 1명이라도 고용하거나 고객 정보를 수집하는 모든 기업이 대상입니다. 규모와 관계없이 개인정보 처리방침과 내부 관리계획을 수립해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'DPO(개인정보 보호책임자)를 외부에 맡길 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 로앤이가 외부 DPO 역할을 수행할 수 있습니다. 법적 요건을 충족하면서도 비용 효율적으로 개인정보 보호 체계를 운영할 수 있습니다.',
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
