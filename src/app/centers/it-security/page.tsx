import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import CenterPage from './CenterPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/it-security', {
    title: '디지털성범죄·딥페이크·리벤지포르노 피해자 변호사 | 로앤이',
    description: '불법촬영, 몰카, 딥페이크, 리벤지포르노, 온라인 성착취 피해 전문. 유포 차단, 삭제 요청, 가해자 처벌, 손해배상까지. 디지털 증거 보존 전문. 첫 상담 무료.',
    keywords: '디지털성범죄 변호사, 딥페이크 변호사, 리벤지포르노 변호사, 불법촬영 변호사, 몰카 변호사, 온라인 성착취, 유포 차단, IT 보안 법률',
    ogTitle: '디지털성범죄·딥페이크·리벤지포르노 피해자 변호사 | 로앤이',
    ogDescription: '불법촬영, 딥페이크, 리벤지포르노 피해 전문. 유포 차단, 삭제 요청, 가해자 처벌까지. 첫 상담 무료.',
  })
}

export default function Page() {
  return <CenterPage />
}
