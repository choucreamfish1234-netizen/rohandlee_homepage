import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/property-crime', {
    title: '재산범죄 피해 전문센터',
    description: '보이스피싱·전세사기·투자사기·횡령·배임 피해 전담 구제. 노채은 대표변호사가 직접 수임합니다. 범인이 돈을 쓰기 전에 막아야 합니다. 무료 상담 032-207-8788.',
    keywords: '재산범죄 변호사, 보이스피싱 변호사, 전세사기 변호사, 투자사기 변호사, 횡령 변호사, 부천 재산범죄',
    ogTitle: '재산범죄 피해 전문센터 | 법률사무소 로앤이',
    ogDescription: '보이스피싱·전세사기·투자사기·횡령·배임 피해 전담 구제. 범인이 돈을 쓰기 전에 막아야 합니다.',
  })
}

export default function Page() {
  return <CenterPage />
}
