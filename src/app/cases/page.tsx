import type { Metadata } from 'next'
import CasesList from './CasesList'

export const metadata: Metadata = {
  title: '성공사례 | 법률사무소 로앤이',
  description: '법률사무소 로앤이의 성공사례. 보이스피싱 불송치, 성범죄 엄벌 등 실제 사건 결과로 증명합니다.',
}

export default function Page() {
  return <CasesList />
}
