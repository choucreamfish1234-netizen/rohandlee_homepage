import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/bankruptcy', {
    title: '개인회생·개인파산 전문 변호사 | 부천 회생파산 상담 | 로앤이',
    description: '개인회생 신청부터 면책까지 전 과정 대행. 개인회생 vs 개인파산 비교 상담. 월 변제금 최소화. 채무 탕감 전문. 부천시 소재 법률사무소 로앤이.',
    keywords: '개인회생 변호사, 개인파산 변호사, 회생 변호사, 파산 변호사, 부천 회생파산, 채무 탕감, 면책, 월 변제금',
    ogTitle: '개인회생·개인파산 전문 변호사 | 법률사무소 로앤이',
    ogDescription: '개인회생 신청부터 면책까지 전 과정 대행. 월 변제금 최소화, 채무 탕감 전문. 부천시 소재.',
  })
}

export default function Page() {
  return <CenterPage />
}
