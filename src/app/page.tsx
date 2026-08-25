import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPageSeo } from '@/lib/seo'
import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import DeclarationSection from '@/components/sections/DeclarationSection'
import CentersSection from '@/components/sections/CentersSection'
import FirstMoverSection from '@/components/sections/FirstMoverSection'
import OneStopSection from '@/components/sections/OneStopSection'
import TagsSection from '@/components/sections/TagsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import DifferenceSection from '@/components/sections/DifferenceSection'
import LawyersSection from '@/components/sections/LawyersSection'
import NationwideSection from '@/components/sections/NationwideSection'
import HomeFaqSection from '@/components/sections/HomeFaqSection'
import CtaSection from '@/components/sections/CtaSection'

const CasesSection = dynamic(() => import('@/components/sections/CasesSection'), { ssr: true })
const PressSection = dynamic(() => import('@/components/sections/PressSection'), { ssr: true })
const WebtoonSection = dynamic(() => import('@/components/sections/WebtoonSection'), { ssr: true })
const BlogHighlights = dynamic(() => import('@/components/BlogHighlights'), { ssr: true })
const AppSection = dynamic(() => import('@/components/sections/AppSection'), { ssr: true })

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/', {
    title: '국내최초 종합 피해자 전문 로펌',
    description: '국내최초 종합 피해자 전문 로펌. 성범죄·재산범죄·신체범죄·부동산·손해배상·강제집행까지 모든 피해를 한 곳에서. 대표변호사 이유림·노채은. 9대 전문센터 운영. 민형사 동시 타격 입체 전략. 상담 032-207-8788',
    ogTitle: '국내최초 종합 피해자 전문 로펌',
    ogDescription: '성범죄·재산범죄·신체범죄·부동산·손해배상·강제집행. 모든 피해를 한 곳에서. 9대 전문센터, 민형사 동시 타격. 상담 032-207-8788',
  })
}

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '피해자 전문 로펌이 뭔가요?', acceptedAnswer: { '@type': 'Answer', text: '피해자 전문 로펌은 범죄나 사고의 피해자만을 전문으로 대리하는 법률사무소입니다. 법률사무소 로앤이는 성범죄, 재산범죄, 신체범죄, 부동산 분쟁, 손해배상, 강제집행 등 모든 분야의 피해자를 종합적으로 대리하는 국내최초 종합 피해자 전문 로펌입니다.' } },
    { '@type': 'Question', name: '성범죄 피해를 당했는데 어디에 상담해야 하나요?', acceptedAnswer: { '@type': 'Answer', text: '법률사무소 로앤이 성범죄 피해자 전담센터에서 무료 상담을 받으실 수 있습니다. 전화 032-207-8788 또는 온라인 상담을 이용하세요.' } },
    { '@type': 'Question', name: '사기를 당했는데 돈을 돌려받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 가능합니다. 법률사무소 로앤이 재산범죄센터와 재산회복센터가 협력하여, 사기죄 형사 고소와 동시에 가압류·강제집행으로 피해 금액을 회수합니다.' } },
    { '@type': 'Question', name: '변호사 비용이 부담되는데 무료 상담이 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 법률사무소 로앤이는 첫 상담을 무료로 제공합니다.' } },
    { '@type': 'Question', name: '전국에서 상담받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전화 상담과 온라인 상담이 가능합니다. 사건에 따라 전국 어디든 대리합니다.' } },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <HeroSection />
      <StatsBar />
      <DeclarationSection />
      <FirstMoverSection />
      <CentersSection />
      <OneStopSection />
      <TagsSection />
      <ProcessSection />
      <TestimonialsSection />
      <LawyersSection />
      <NationwideSection />
      <DifferenceSection />
      <CasesSection />
      <PressSection />
      <WebtoonSection />
      <BlogHighlights />
      <AppSection />
      <HomeFaqSection />
      <CtaSection />
    </>
  )
}
