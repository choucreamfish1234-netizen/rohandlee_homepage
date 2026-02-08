import type { Metadata } from 'next'
import CenterPage from './CenterPage'

export const metadata: Metadata = {
  title: '재산범죄 피해 전문센터',
  description:
    '법률사무소 로앤이 재산범죄 피해 전문센터. 사기·횡령·배임 피해 전담 구제. 대표변호사 노채은.',
  openGraph: {
    title: '재산범죄 피해 전문센터 | 법률사무소 로앤이',
    description: '재산범죄는 속도가 생명입니다. 범인이 돈을 쓰기 전에 막아야 합니다.',
  },
}

export default function Page() {
  return <CenterPage />
}
