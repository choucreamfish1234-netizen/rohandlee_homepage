import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/property-crime', {
    title: '보이스피싱·전세사기·투자사기 피해자 전문 변호사 | 로앤이',
    description: '재산범죄 피해자 전문 노채은 변호사. 보이스피싱 피해금 환급, 전세사기 특별법 활용, 투자사기 민형사 대응. 피해금 회수 전문. 로톡 평점 4.9. 첫 상담 무료.',
    keywords: '재산범죄 변호사, 보이스피싱 변호사, 전세사기 변호사, 투자사기 변호사, 횡령 변호사, 배임 변호사, 피해금 환급, 부천 재산범죄 변호사',
    ogTitle: '보이스피싱·전세사기·투자사기 피해자 전문 변호사 | 로앤이',
    ogDescription: '재산범죄 피해자 전문 노채은 변호사. 보이스피싱 피해금 환급, 전세사기 특별법 활용. 피해금 회수 전문. 첫 상담 무료.',
  })
}

export default function Page() {
  return <CenterPage />
}
