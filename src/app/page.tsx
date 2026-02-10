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
    title: '부천 성범죄 피해자 전문 변호사 | 법률사무소 로앤이 | 오직 피해자만 변호합니다',
    description: '성범죄 피해자 전문 변호사 이유림, 재산범죄 전문 변호사 노채은. 로톡 평점 4.9, 후기 600건 이상. 성폭행, 성추행, 불법촬영, 디지털성범죄, 스토킹, 보이스피싱, 전세사기 피해자를 위한 전문 법률 서비스. 부천시 원미구 소재.',
    keywords: '성범죄 변호사, 성범죄 피해자 변호사, 부천 변호사, 피해자 전문 변호사, 성폭행 변호사, 성추행 변호사, 불법촬영 변호사, 디지털성범죄 변호사, 스토킹 변호사, 보이스피싱 변호사, 전세사기 변호사, 개인회생 변호사, 법률사무소 로앤이, 이유림 변호사, 노채은 변호사',
    ogTitle: '부천 성범죄 피해자 전문 변호사 | 법률사무소 로앤이',
    ogDescription: '성범죄 피해자 전문 변호사 이유림, 재산범죄 전문 변호사 노채은. 로톡 평점 4.9, 후기 600건 이상. 무료 상담 032-207-8788',
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
