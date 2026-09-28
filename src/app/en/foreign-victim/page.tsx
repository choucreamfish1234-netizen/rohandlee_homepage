import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'

export const metadata: Metadata = {
  title: 'Foreign Victim Support Center | English Speaking Lawyer Korea',
  description: 'Being a foreigner doesn\'t mean you have to endure it. Foreign crime victims in Korea are fully protected under Korean law. Our lead attorneys personally handle every case. Sexual crime, stalking, fraud, assault, rental fraud, wage theft. Call 032-207-8788',
  keywords: 'English speaking lawyer Korea, crime victim lawyer Korea, foreigner lawyer Seoul, sexual assault lawyer Korea, fraud lawyer Korea, stalking victim lawyer Korea, report crime Korea foreigner',
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/en/foreign-victim',
    languages: {
      ko: 'https://lawfirmrohandlee.com/centers/foreign-victim',
      en: 'https://lawfirmrohandlee.com/en/foreign-victim',
      zh: 'https://lawfirmrohandlee.com/zh/foreign-victim',
      vi: 'https://lawfirmrohandlee.com/vi/foreign-victim',
    },
  },
}

export default function Page() {
  return <ForeignVictimHub locale="en" />
}
