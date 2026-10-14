import { practiceCaseImage } from '@/lib/practice-case-image'
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
    image: `https://lawfirmrohandlee.com${practiceCaseImage(c).src}`,
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

      <section className="records-hero bg-[#F6F2EA] pt-10 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">CASE RECORDS</p>
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl font-semibold text-[#1C1C1A] tracking-tight">결과에 이르는<br />과정.</h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">
              형사 사건 대응 · 채권추심 · 가상자산 · 기업자문 · 피해자 구제. 분야마다 다른 쟁점에 로앤이가 어떻게 대응했는지 기록했습니다.
            </p>
            <CaseDisclaimer className="mt-4" />
          </div>
        </div>
      </section>

      <section className="records-list pt-10 pb-20 sm:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <nav aria-label="사례 분야 필터" className="mb-12 -mx-5 px-5 overflow-x-auto scrollbar-hide border-b border-[#1C1C1A]/10">
            <ul className="flex gap-6 sm:gap-7 min-w-max">
              {[null, ...CASE_CATEGORIES].map((cat) => {
                const isActive = cat === active
                return (
                  <li key={cat ?? 'all'}>
                    <Link
                      href={cat ? `/cases?category=${encodeURIComponent(cat)}` : '/cases'}
                      scroll={false}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-block py-4 text-sm border-b-2 -mb-px transition-colors ${
                        isActive
                          ? 'border-[#1B3B2F] text-[#1B3B2F] font-semibold'
                          : 'border-transparent text-[#1C1C1A]/55 hover:text-[#1C1C1A]'
                      }`}
                    >
                      {cat ?? '전체'}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
