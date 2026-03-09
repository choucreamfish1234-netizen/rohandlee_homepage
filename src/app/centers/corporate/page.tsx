import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/corporate', {
    title: '기업경영 법무센터',
    description: '스타트업·중소기업 법인설립, 계약서 검토, 주주 간 분쟁 해결. 기업 운영의 법적 리스크를 사전에 차단합니다. 무료 상담 032-207-8788.',
    keywords: '기업 변호사, 법인설립, 계약서 검토, 주주분쟁, 스타트업 변호사, 기업법무',
    ogTitle: '기업경영 법무센터 | 법률사무소 로앤이',
    ogDescription: '스타트업·중소기업 법인설립, 계약서 검토, 주주 간 분쟁 해결.',
  })
}

export default function Page() {
  return <CenterPage />
}
