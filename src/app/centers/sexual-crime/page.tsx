import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: '성범죄 피해 전문센터',
  description:
    '법률사무소 로앤이 성범죄 피해 전문센터. 가해자는 변호하지 않습니다. 오로지 성범죄 피해자만을 변호합니다. 대표변호사 이유림.',
  openGraph: {
    title: '성범죄 피해 전문센터 | 법률사무소 로앤이',
    description: '오로지 성범죄 피해자만을 변호합니다.',
  },
}

export default function Page() {
  return <CenterPage />
}
