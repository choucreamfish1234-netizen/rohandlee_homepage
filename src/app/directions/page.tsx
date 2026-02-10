import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import DirectionsContent from './DirectionsContent'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/directions', {
    title: '오시는 길',
    description: '법률사무소 로앤이 오시는 길. 경기도 부천시 부일로205번길 54, 205호(14544). 7호선 부천시청역 2번 출구 도보 5분. 무료 주차 가능.',
    ogTitle: '오시는 길 | 법률사무소 로앤이',
    ogDescription: '경기도 부천시 부일로205번길 54, 205호. 7호선 부천시청역 2번 출구 도보 5분.',
  })
}

export default function Page() {
  return <DirectionsContent />
}
