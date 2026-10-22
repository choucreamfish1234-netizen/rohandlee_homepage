import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import CentersSection from '@/components/sections/CentersSection'
import { PracticeHero, ConsultationCTA, JsonLd } from '@/components/practice/shared'
import { victimCenters } from '@/data/practice'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers', {
    title: '피해자 전문센터',
    description: '법률사무소 로앤이 11대 피해자 전문센터 — 성범죄, 금융사기, 신체범죄, 이혼·가사, 부동산, 재산회복, 손해배상, 기업법무, 학교폭력, 외국인 범죄피해, 성소수자 범죄피해. 032-207-8788',
    keywords: '피해자 전문 변호사, 범죄 피해자 변호사, 성범죄 피해자 변호사, 사기피해 변호사, 피해자 전문센터',
    ogTitle: '피해자 전문센터 | 법률사무소 로앤이',
    ogDescription: '범죄 피해 구제의 모든 것 — 11대 피해자 전문센터',
  })
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '법률사무소 로앤이 피해자 전문센터',
  itemListElement: victimCenters.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    url: `https://lawfirmrohandlee.com${c.href}`,
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <PracticeHero
        eyebrow="국내최초 종합 피해자 중심 로펌"
        title={'범죄 피해 구제의 모든 것,\n11대 피해자 전문센터'}
        subtitle="성범죄, 재산범죄, 신체범죄부터 학교폭력, 외국인·성소수자 범죄피해까지 — 피해 유형별 전문센터에서 고소부터 손해배상, 재산 회복까지 대표변호사가 직접 수행합니다."
      />
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '피해자 전문센터' }]} />
      <CentersSection />
      <ConsultationCTA text="어떤 피해든, 첫 상담이 결과를 바꿉니다." />
    </>
  )
}
