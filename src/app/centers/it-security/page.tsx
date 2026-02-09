import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: 'IT·보안 법률센터',
  description:
    '개인정보보호법·정보통신망법 위반 대응, 해킹·랜섬웨어·개인정보 유출 피해 구제. 디지털 시대의 법적 보호막. 무료 상담 032-207-8788.',
  keywords: ['IT 변호사', '개인정보보호법', '정보통신망법', '해킹 변호사', '랜섬웨어', '개인정보 유출'],
  openGraph: {
    title: 'IT·보안 법률센터 | 법률사무소 로앤이',
    description: '개인정보보호법·정보통신망법 위반 대응. 디지털 시대의 법적 보호막.',
  },
}

export default function Page() {
  return <CenterPage />
}
