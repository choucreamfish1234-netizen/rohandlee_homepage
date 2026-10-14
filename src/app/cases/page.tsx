import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageSeo } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import { CaseCard, CaseDisclaimer, ConsultationCTA, JsonLd } from '@/components/practice/shared'
import { CASE_CATEGORIES, practiceCases } from '@/data/practice/cases'
import CasesList from './CasesList'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/cases', {
    title: '대응 사례',
    description: '법률사무소 로앤이의 형사 사건 대응, 채권추심, 가상자산, 기업자문, 피해자 구제 분야 대응 사례를 확인하세요.',
    ogTitle: '대응 사례 | 법률사무소 로앤이',
    ogDescription: '형사 사건 대응 · 채권추심 · 가상자산 · 기업자문 · 피해자 구제 분야 대응 사례',
  })
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '법률사무소 로앤이 대응 사례',
  itemListElement: practiceCases.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: `https://lawfirmrohandlee.com/cases/${c.slug}`,
  })),
}

export default async function Page({ searchParams }: Props) {
  const { category } = await searchParams
  const active = category && (CASE_CATEGORIES as readonly string[]).includes(category) ? category : null
  const filtered = active ? practiceCases.filter((c) => c.category === active) : practiceCases

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '대응 사례' }]} />

      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Case Results</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">대응 사례</h1>
            <p className="mt-5 text-gray-500 text-sm">
              형사 사건 대응 · 채권추심 · 가상자산 · 기업자문 · 피해자 구제
            </p>
            <CaseDisclaimer className="mt-4 max-w-2xl mx-auto" />
          </div>

          <nav aria-label="사례 분야 필터" className="mb-8 -mx-4 px-4 overflow-x-auto">
            <ul className="flex sm:flex-wrap sm:justify-center gap-2 min-w-max sm:min-w-0">
              {[null, ...CASE_CATEGORIES].map((cat) => {
                const isActive = cat === active
                return (
                  <li key={cat ?? 'all'}>
                    <Link
                      href={cat ? `/cases?category=${encodeURIComponent(cat)}` : '/cases'}
                      scroll={false}
                      className={`inline-block text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
                        isActive
                          ? 'bg-[#1B3B2F] border-[#1B3B2F] text-white'
                          : 'border-gray-200 text-gray-600 hover:border-[#1B3B2F]/40'
                      }`}
                    >
                      {cat ?? '전체'}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {!active && <CasesList />}

      <ConsultationCTA text="비슷한 상황이시라면, 초기 대응이 결과를 바꿉니다." />
    </>
  )
}
