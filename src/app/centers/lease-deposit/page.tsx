import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import LeaseDepositPage from './LeaseDepositPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/lease-deposit', {
    title: '임대차·보증금 피해 전담센터 | 법률사무소 로앤이',
    description: '전세 사기·보증금 미반환 피해자 전문. 민사 가압류와 형사 고소를 동시에 진행하는 입체 전략. 오직 임차인 피해자만 대리합니다. 무료 상담 032-207-8788',
    keywords: '전세사기 변호사, 보증금 미반환, 임대차 분쟁, 보증금 반환 소송, 임차권등기명령, 가압류, 전세보증금, 임대인 사기, 보증금 회수',
    ogTitle: '임대차·보증금 피해 전담센터 | 법률사무소 로앤이',
    ogDescription: '전세 사기·보증금 미반환 피해자 전문. 민사 가압류와 형사 고소를 동시에 진행하는 입체 전략. 오직 임차인 피해자만 대리합니다.',
  })
}

export default function Page() {
  return <LeaseDepositPage />
}
