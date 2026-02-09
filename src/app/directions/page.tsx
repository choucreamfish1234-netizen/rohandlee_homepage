import type { Metadata } from 'next'
import DirectionsContent from './DirectionsContent'

export const metadata: Metadata = {
  title: '오시는 길',
  description:
    '법률사무소 로앤이 오시는 길. 경기도 부천시 부일로205번길 54, 205호(14544). 7호선 부천시청역 2번 출구 도보 5분. 무료 주차 가능.',
  openGraph: {
    title: '오시는 길 | 법률사무소 로앤이',
    description: '경기도 부천시 부일로205번길 54, 205호. 7호선 부천시청역 2번 출구 도보 5분.',
  },
}

export default function Page() {
  return <DirectionsContent />
}
