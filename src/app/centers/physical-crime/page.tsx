import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import PhysicalCrimePage from './PhysicalCrimePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/physical-crime', {
    title: '신체범죄 피해 전담센터 | 법률사무소 로앤이',
    description: '폭행·상해·스토킹·협박·공갈·감금·가정폭력 피해자 전문. 민사 손해배상과 형사 고소를 동시 진행. 피해자 전문 로펌 법률사무소 로앤이. 무료 상담 032-207-8788',
    keywords: '폭행 변호사, 상해 변호사, 스토킹 변호사, 협박 변호사, 가정폭력 변호사, 신체범죄 피해자, 폭행 손해배상, 접근금지 가처분, 데이트폭력, 학교폭력',
    ogTitle: '신체범죄 피해 전담센터 | 법률사무소 로앤이',
    ogDescription: '폭행·상해·스토킹·협박·공갈·감금·가정폭력 피해자 전문. 민사 손해배상과 형사 고소를 동시 진행.',
  })
}

export default function Page() {
  return <PhysicalCrimePage />
}
