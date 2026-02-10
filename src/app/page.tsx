import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import DeclarationSection from '@/components/sections/DeclarationSection'
import CentersSection from '@/components/sections/CentersSection'
import TagsSection from '@/components/sections/TagsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import DifferenceSection from '@/components/sections/DifferenceSection'
import CasesSection from '@/components/sections/CasesSection'
import LawyersSection from '@/components/sections/LawyersSection'
import AppSection from '@/components/sections/AppSection'
import CtaSection from '@/components/sections/CtaSection'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/', {
    title: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '법률사무소 로앤이는 성범죄·재산범죄 피해자만을 변호합니다. 부천 소재, 이유림·노채은 변호사가 피해자의 권리를 끝까지 지켜드립니다. 무료 상담 032-207-8788',
    keywords: '성범죄 변호사, 성범죄 피해자 변호사, 재산범죄 변호사, 부천 변호사, 법률사무소 로앤이',
    ogTitle: '법률사무소 로앤이 | 오직 피해자만 변호합니다',
    ogDescription: '성범죄·재산범죄 피해자 전문 법률사무소. 무료 상담 032-207-8788',
  })
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <DeclarationSection />
      <CentersSection />
      <TagsSection />
      <ProcessSection />
      <TestimonialsSection />
      <DifferenceSection />
      <CasesSection />
      <LawyersSection />
      <AppSection />
      <CtaSection />
    </>
  )
}
