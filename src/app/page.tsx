import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPageSeo } from '@/lib/seo'
import HomePopup from '@/components/HomePopup'
import HeroSection from '@/components/sections/HeroSection'
import PracticeAreasSection from '@/components/sections/home/PracticeAreasSection'
import FeaturedCasesSection, { type FeaturedCase } from '@/components/sections/home/FeaturedCasesSection'
import AboutSection from '@/components/sections/home/AboutSection'
import AreaShortcutsSection from '@/components/sections/home/AreaShortcutsSection'
import FirmFactsSection from '@/components/sections/home/FirmFactsSection'
import CentersSection from '@/components/sections/CentersSection'
import LawyersSection from '@/components/sections/LawyersSection'
import HomeFaqSection from '@/components/sections/HomeFaqSection'
import CtaSection from '@/components/sections/CtaSection'
import { CASE_DISCLAIMER, FEATURED_CASE_SLUGS, AREA_LABEL, findPracticeCase } from '@/data/practice/cases'
import { homeFaqs } from '@/data/practice/home-faqs'

const PressSection = dynamic(() => import('@/components/sections/PressSection'), { ssr: true })
const BlogHighlights = dynamic(() => import('@/components/BlogHighlights'), { ssr: true })

const HOME_TITLE = '법률사무소 로앤이 | 형사 사건 대응 · 피해자 구제 · 채권추심 · 가상자산'
const HOME_DESCRIPTION =
  '법률사무소 로앤이는 형사 사건 대응, 범죄 피해자 구제, 채권추심, 가상자산 법률자문, 기업 법률자문을 수행하는 종합 법률사무소입니다. 대표변호사가 직접 상담하고 사건을 수행합니다. 032-207-8788'

export async function generateMetadata(): Promise<Metadata> {
  const base = await getPageSeo('/', {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    keywords: '변호사, 법률사무소, 형사변호사, 부천변호사, 채권추심, 가상자산변호사, 코인변호사, 피해자변호사',
    ogTitle: '법률사무소 로앤이',
    ogDescription: '형사 사건 대응 · 피해자 구제 · 채권추심 · 가상자산 · 기업 자문',
  })
  return { ...base, title: { absolute: HOME_TITLE } }
}

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const featuredCases: FeaturedCase[] = FEATURED_CASE_SLUGS.map(findPracticeCase)
  .filter((c): c is NonNullable<typeof c> => c !== null)
  .map((c) => ({
    slug: c.slug,
    label: c.area === 'defense' ? AREA_LABEL.defense : c.category === '가상자산' ? '가상자산' : AREA_LABEL[c.area],
    title: c.title,
    summary: c.summary,
    result: c.result,
  }))

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <HomePopup />
      <HeroSection />
      <PracticeAreasSection />
      <FeaturedCasesSection cases={featuredCases} disclaimer={CASE_DISCLAIMER} />
      <AboutSection />
      <LawyersSection />
      <CentersSection />
      <AreaShortcutsSection />
      <PressSection />
      <BlogHighlights />
      <FirmFactsSection />
      <HomeFaqSection />
      <CtaSection />
    </>
  )
}
