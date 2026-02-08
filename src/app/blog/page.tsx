import type { Metadata } from 'next'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: '블로그',
  description: '법률사무소 로앤이 법률 블로그. 성범죄, 재산범죄, 회생파산 등 법률 정보와 판례 분석.',
}

export default function Page() {
  return <BlogList />
}
