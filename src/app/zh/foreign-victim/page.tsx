import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'

export const metadata: Metadata = {
  title: '外国人犯罪受害者支援中心 | 韩国律师中文咨询',
  description: '在韩国受到犯罪侵害的外国人也受到韩国法律的保护。代表律师亲自咨询并直接负责案件。支持中文·英文·越南语咨询。性犯罪、跟踪骚扰、诈骗、暴力、租房诈骗、欠薪。电话 032-207-8788',
  keywords: '韩国律师 中文, 韩国刑事律师, 韩国性骚扰律师, 韩国诈骗律师, 韩国被骗怎么办, 韩国报警 外国人, 韩国律师 微信, 在韩国被骗了怎么办, 外国人在韩国被跟踪, 在韩国被性骚扰了怎么办',
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/zh/foreign-victim',
    languages: {
      ko: 'https://lawfirmrohandlee.com/centers/foreign-victim',
      en: 'https://lawfirmrohandlee.com/en/foreign-victim',
      zh: 'https://lawfirmrohandlee.com/zh/foreign-victim',
      vi: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    },
  },
}

export default function Page() {
  return <ForeignVictimHub locale="zh" />
}
