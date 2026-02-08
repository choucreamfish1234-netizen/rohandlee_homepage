import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: '회생·파산 전문센터 리셋',
  description:
    '법률사무소 로앤이 회생·파산 전문센터 리셋. 새로운 시작을 위한 법적 리셋 시스템. 자동화 EDI 서류수집.',
  openGraph: {
    title: '회생·파산 전문센터 리셋 | 법률사무소 로앤이',
    description: '새로운 시작을 위한 법적 리셋 시스템',
  },
}

export default function Page() {
  return <CenterPage />
}
