import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: '기업경영 법무센터',
  description:
    '법률사무소 로앤이 기업경영 법무센터. 기업 운영의 법적 리스크를 사전 차단합니다.',
  openGraph: {
    title: '기업경영 법무센터 | 법률사무소 로앤이',
    description: '기업 운영의 법적 리스크를 사전 차단합니다.',
  },
}

export default function Page() {
  return <CenterPage />
}
