import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import RealEstatePage from './RealEstatePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/real-estate', {
    title: '부동산 피해 전담센터 | 법률사무소 로앤이',
    description: '전세 사기·보증금 미반환·토지 매매 사기·권리금 분쟁. 민사 가압류와 형사 고소 동시 진행. 오직 피해자만 대리합니다. 무료 상담 032-207-8788',
    keywords: '부동산 사기 변호사, 전세사기, 보증금 미반환, 토지 매매 사기, 권리금 분쟁, 임대차 분쟁, 가압류, 부동산 피해',
    ogTitle: '부동산 피해 전담센터 | 법률사무소 로앤이',
    ogDescription: '전세 사기·보증금 미반환·토지 매매 사기·권리금 분쟁. 민사 가압류와 형사 고소 동시 진행. 오직 피해자만 대리합니다.',
  })
}

export default function Page() {
  return <RealEstatePage />
}
