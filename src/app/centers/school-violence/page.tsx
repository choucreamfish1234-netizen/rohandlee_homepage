import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import SchoolViolencePage from './SchoolViolencePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/school-violence', {
    title: '학교폭력 전문센터 | 피해학생 전문 변호사',
    description: '학교폭력 피해학생 전문 법률 대응. 학폭위·심의위 대리, 민사 손해배상, 형사 고소 병행. 반복되는 학폭, 신고를 미루지 마세요. 무료 상담 032-207-8788.',
    keywords: '학교폭력 변호사, 학폭 변호사, 학폭위, 피해학생, 학교폭력 신고, 학폭 처분, 학교폭력 손해배상, 학생 성범죄',
    ogTitle: '학교폭력 전문센터',
    ogDescription: '피해학생의 권리 회복을 위한 학폭위·민사·형사 병행 대응 전문.',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '학교폭력 신고를 하면 오히려 더 괴롭힘을 당하지 않을까요?', acceptedAnswer: { '@type': 'Answer', text: '학교폭력예방법에 따라 신고 후 피해학생에 대한 보복행위는 가중처분 사유입니다. 로앤이는 접근금지·보복금지 조치를 우선 확보하고, 필요 시 긴급 가처분까지 병행하여 피해학생을 보호합니다.' } },
    { '@type': 'Question', name: '1호·2호 같은 가벼운 처분밖에 안 나오면 어떡하나요?', acceptedAnswer: { '@type': 'Answer', text: '처음에 가벼운 처분이 나오더라도 기록이 남기 때문에 학폭이 반복될 경우 가해학생에게 훨씬 강한 처분(전학, 퇴학 등)이 내려집니다. 첫 번째 신고가 가장 중요합니다.' } },
    { '@type': 'Question', name: '학생들 사이 성범죄도 학교폭력으로 신고할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 반드시 해야 합니다. 학생 간 성범죄는 학교폭력예방법상 학교폭력에 해당하며, 학폭 신고와 동시에 형사 고소를 병행해야 합니다.' } },
    { '@type': 'Question', name: '학폭위 결과에 불복할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 학폭위(심의위) 결정에 불복하는 경우 행정심판 또는 행정소송을 제기할 수 있습니다.' } },
    { '@type': 'Question', name: '상담 비용이 부담됩니다.', acceptedAnswer: { '@type': 'Answer', text: '로앤이는 초기 상담을 무료로 진행합니다. 피해 상황을 파악한 후 최적의 대응 방향과 예상 비용을 투명하게 안내드립니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SchoolViolencePage />
    </>
  )
}
