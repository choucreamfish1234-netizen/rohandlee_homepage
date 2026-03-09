import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import ConsultationForm from './ConsultationForm'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/consultation', {
    title: '무료 상담 예약',
    description: '법률사무소 로앤이 무료 상담 예약. 성범죄·재산범죄·회생파산·기업법무·IT보안 전문 변호사가 직접 상담합니다. 전화 032-207-8788 또는 온라인 예약.',
    ogTitle: '무료 상담 예약 | 법률사무소 로앤이',
    ogDescription: '전문 변호사가 직접 상담합니다. 전화 032-207-8788 또는 온라인 예약.',
  })
}

export default function Page() {
  return <ConsultationForm />
}
