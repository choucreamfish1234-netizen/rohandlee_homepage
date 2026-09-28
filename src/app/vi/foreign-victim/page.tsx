import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'
import { getAlternateLanguages } from '@/lib/i18n/hreflang'

export const metadata: Metadata = {
  title: 'Bị hại tại Hàn Quốc? Trung tâm Hỗ trợ Nạn nhân Nước ngoài | Ro&Lee',
  description: 'Người nước ngoài bị hại tại Hàn Quốc được pháp luật bảo vệ. Luật sư đại diện trực tiếp xử lý vụ việc. Hỗ trợ tư vấn bằng tiếng Việt, tiếng Trung, tiếng Anh. ĐT: 032-207-8788.',
  keywords: 'luật sư Hàn Quốc, người nước ngoài bị hại, luật sư tiếng Việt, tội phạm Hàn Quốc, bị lừa đảo ở Hàn Quốc, luật sư hình sự Hàn Quốc',
  openGraph: {
    title: 'Hỗ trợ nạn nhân tội phạm nước ngoài tại Hàn Quốc | Ro&Lee',
    description: 'Công ty luật đầu tiên tại Hàn Quốc chuyên về nạn nhân. Luật sư đại diện trực tiếp tư vấn và xử lý vụ việc.',
    locale: 'vi_VN',
    type: 'website',
    url: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    siteName: 'Công ty Luật Ro&Lee',
  },
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    languages: getAlternateLanguages(''),
  },
}

export default function Page() {
  return <ForeignVictimHub locale="vi" />
}
