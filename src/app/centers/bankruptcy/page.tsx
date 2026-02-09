import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: '회생·파산 전문센터 리셋',
  description:
    '채무 문제로 고통받고 계신가요? 개인회생·파산 전문 변호사가 새로운 시작을 도와드립니다. 자동화 EDI 서류수집 시스템으로 빠르고 정확하게. 무료 상담 032-207-8788.',
  keywords: ['회생 변호사', '파산 변호사', '개인회생', '개인파산', '부천 회생파산', '채무 상담'],
  openGraph: {
    title: '회생·파산 전문센터 리셋 | 법률사무소 로앤이',
    description: '새로운 시작을 위한 법적 리셋 시스템. 자동화 EDI 서류수집으로 빠르고 정확하게.',
  },
}

export default function Page() {
  return <CenterPage />
}
