import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: 'IT보안 법률센터',
  description:
    '법률사무소 로앤이 IT보안 법률센터. 디지털 시대의 법적 보호막. 해킹, 개인정보 유출, 랜섬웨어 대응.',
  openGraph: {
    title: 'IT보안 법률센터 | 법률사무소 로앤이',
    description: '디지털 시대의 법적 보호막이 되겠습니다.',
  },
}

export default function Page() {
  return <CenterPage />
}
