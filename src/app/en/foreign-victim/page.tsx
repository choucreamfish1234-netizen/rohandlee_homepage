import type { Metadata } from 'next'
import ForeignVictimHub from '@/app/centers/foreign-victim/ForeignVictimHub'
import { getAlternateLanguages } from '@/lib/i18n/hreflang'

export const metadata: Metadata = {
  title: 'Crime Victim in Korea? Foreign Victim Support Center | Ro&Lee Law Firm',
  description: 'Foreign crime victims in Korea are protected under Korean law. Lead attorneys personally handle every case. Consultations available in English, Chinese, and Vietnamese. Call 032-207-8788.',
  keywords: 'Korea lawyer English, foreigner lawyer Korea, crime victim Korea, English speaking lawyer Seoul, sexual assault lawyer Korea, fraud lawyer Korea, stalking victim lawyer Korea',
  openGraph: {
    title: 'Foreign Crime Victim Support in Korea | Ro&Lee Law Firm',
    description: "Korea's first comprehensive victim-centered law firm. Lead attorneys personally handle your case from consultation to courtroom.",
    locale: 'en_US',
    type: 'website',
    url: 'https://lawfirmrohandlee.com/en/foreign-victim',
    siteName: 'Law Firm Ro&Lee',
  },
  alternates: {
    canonical: 'https://lawfirmrohandlee.com/en/foreign-victim',
    languages: getAlternateLanguages(''),
  },
}

export default function Page() {
  return <ForeignVictimHub locale="en" />
}
