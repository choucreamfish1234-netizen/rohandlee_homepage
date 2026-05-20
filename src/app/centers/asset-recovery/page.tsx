import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import AssetRecoveryPage from './AssetRecoveryPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/asset-recovery', {
    title: '재산회복 전담센터 | 법률사무소 로앤이',
    description: '가압류·가처분·강제집행·압류추심. 판결문을 실제 돈으로 바꾸는 마지막 단계. 피해자 전문 로펌 법률사무소 로앤이. 무료 상담 032-207-8788',
    keywords: '가압류 변호사, 가처분 변호사, 강제집행 변호사, 압류추심, 재산조회, 재산명시, 채권추심, 접근금지 가처분',
    ogTitle: '재산회복 전담센터 | 법률사무소 로앤이',
    ogDescription: '가압류·가처분·강제집행·압류추심. 판결문을 실제 돈으로 바꾸는 마지막 단계.',
  })
}

export default function Page() {
  return <AssetRecoveryPage />
}
