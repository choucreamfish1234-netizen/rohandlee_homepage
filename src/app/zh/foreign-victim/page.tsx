import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'
import { getAlternateLanguages } from '@/lib/i18n/hreflang'

export const metadata: Metadata = {
  title: '在韩国受到犯罪侵害怎么办？外国人犯罪受害者支援 | Ro&Lee律所',
  description: '在韩国遭受性犯罪、诈骗、暴力、跟踪骚扰的外国人，也受到韩国法律保护。代表律师亲自负责案件。支持中文咨询。电话032-207-8788。',
  keywords: '韩国律师, 中文律师, 外国人犯罪, 韩国报警, 韩国被骗, 韩国性骚扰, 韩国律师中文, 韩国律师 微信, 在韩国被骗了怎么办',
  openGraph: {
    title: '在韩国受到犯罪侵害怎么办？| Ro&Lee律所',
    description: '韩国首家综合受害者专业律所。支持中文咨询，代表律师亲自负责案件全流程。',
    locale: 'zh_CN',
    type: 'website',
    url: 'https://lawfirmrohandlee.com/zh/foreign-victim',
    siteName: 'Law Firm Ro&Lee (法律事务所Ro&Lee)',
  },
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/zh/foreign-victim',
    languages: getAlternateLanguages(''),
  },
}

export default function Page() {
  return <ForeignVictimHub locale="zh" />
}
