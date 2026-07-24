import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import SchoolViolencePage from './SchoolViolencePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/school-violence', {
    title: '학교폭력 전문센터 | 피해학생 전문 변호사',
    description: '학교폭력 피해학생 전문 법률 대응. 학폭위·심의위 대리, 민사 손해배상, 형사 고소 병행. 반복되는 학폭, 신고를 미루지 마세요. 무료 상담 032-207-8788.',
    keywords: '학교폭력 변호사, 학폭 변호사, 학폭위, 피해학생, 학교폭력 신고, 학폭 처분, 학교폭력 손해배상, 학생 성범죄',
    ogTitle: '학교폭력 전문센터 | 법률사무소 로앤이',
    ogDescription: '피해학생의 권리 회복을 위한 학폭위·민사·형사 병행 대응 전문.',
  })
}

export default function Page() {
  return <SchoolViolencePage />
}
