import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/sexual-crime', {
    title: '성범죄 피해자 전담 센터',
    description: '성폭력·디지털성범죄·스토킹·몰카 피해자 전담. 이유림 대표변호사가 직접 수임합니다. 가해자 변호는 하지 않습니다. 무료 상담 032-207-8788.',
    keywords: '성범죄 변호사, 성폭력 피해자 변호사, 디지털성범죄, 스토킹 변호사, 몰카 변호사, 부천 성범죄 변호사',
    ogTitle: '성범죄 피해자 전담 센터 | 법률사무소 로앤이',
    ogDescription: '성폭력·디지털성범죄·스토킹·몰카 피해자 전담. 가해자 변호는 하지 않습니다.',
  })
}

export default function Page() {
  return <CenterPage />
}
