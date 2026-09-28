import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'

export const metadata: Metadata = {
  title: 'Trung tâm Hỗ trợ Nạn nhân Nước ngoài | Luật sư Hàn Quốc tiếng Việt',
  description: 'Dù là người nước ngoài, bạn không cần phải chịu đựng. Nạn nhân tội phạm tại Hàn Quốc được pháp luật bảo vệ đầy đủ. Luật sư đại diện trực tiếp tư vấn và đảm nhận vụ việc. Hỗ trợ tiếng Việt. 032-207-8788',
  keywords: 'luật sư Hàn Quốc tiếng Việt, nạn nhân tội phạm Hàn Quốc, luật sư hình sự Hàn Quốc, bị lừa đảo ở Hàn Quốc, người nước ngoài báo cảnh sát Hàn Quốc',
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    languages: {
      ko: 'https://lawfirmrohandlee.com/centers/foreign-victim',
      en: 'https://lawfirmrohandlee.com/en/foreign-victim',
      zh: 'https://lawfirmrohandlee.com/zh/foreign-victim',
      vi: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    },
  },
}

export default function Page() {
  return <ForeignVictimHub locale="vi" />
}
