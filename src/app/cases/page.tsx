import type { Metadata } from 'next'
import CasesList from './CasesList'

export const metadata: Metadata = {
  title: '성공사례',
  description:
    '법률사무소 로앤이의 성공사례. 보이스피싱 불송치, 성범죄 엄벌, 회생인가 등 실제 사건 결과로 증명합니다. 600건 이상 의뢰인 후기.',
  openGraph: {
    title: '성공사례 | 법률사무소 로앤이',
    description: '보이스피싱 불송치, 성범죄 엄벌, 회생인가 등 실제 사건 결과로 증명합니다.',
  },
}

export default function Page() {
  return <CasesList />
}
