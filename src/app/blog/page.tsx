import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import BlogList from './BlogList'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/blog', {
    title: '법률 블로그',
    description: '법률사무소 로앤이 법률 블로그. 성범죄·재산범죄·회생파산 등 법률 정보와 판례 분석, 법률 상식을 알기 쉽게 전달합니다.',
    ogTitle: '법률 블로그 | 법률사무소 로앤이',
    ogDescription: '성범죄·재산범죄·회생파산 등 법률 정보와 판례 분석.',
  })
}

export default function Page() {
  return <BlogList />
}
