import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import AssetRecoveryPage from './AssetRecoveryPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/asset-recovery', {
    title: '가압류·가처분·강제집행·압류추심 전담센터',
    description: '가압류 신청, 가처분 신청, 강제집행 방법, 급여 압류, 부동산 경매, 채권추심. 판결 받고 못 받고 있는 돈, 로앤이가 회수합니다. 상담 032-207-8788',
    keywords: '가압류 신청 방법, 가처분 신청, 강제집행 방법, 급여 압류, 예금 압류, 부동산 강제경매, 채권추심 변호사, 판결금 회수, 재산명시 신청, 재산조회, 법률사무소 로앤이',
    ogTitle: '가압류·가처분·강제집행·압류추심 전담센터',
    ogDescription: '판결 받고 못 받고 있는 돈, 로앤이가 회수합니다. 상담 032-207-8788',
  })
}

export default function Page() {
  return <AssetRecoveryPage />
}
