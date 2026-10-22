import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageSeo } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import { FIRM_STATS } from '@/lib/firm-stats'
import {
  crimePages,
  guidePages,
  fears,
  hubIntro,
  crimeSummaries,
  firstSteps,
  legalProtections,
  processSteps,
  tracks,
  hubFaqs,
  LGBTQ_BASE,
} from '@/data/lgbtq-crime'
import { JsonLd, ConsultCta, FaqList, faqJsonLd } from './shared'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo(LGBTQ_BASE, {
    title: '성소수자 범죄피해 지원센터 | 남성 성범죄·혐오범죄 전문',
    description: '남성 성범죄 피해자 변호사. 동성간 성폭력, 데이팅앱 범죄, 약물 성범죄, 불법촬영 유포, 혐오범죄, 아웃팅 협박 피해를 대표변호사가 직접 대리합니다. 비밀 보장 상담 032-207-8788.',
    keywords: '남성 성범죄 피해자 변호사, 남성 성범죄, 동성간 성폭력, 남성 강제추행, 게이 성범죄, 성소수자 변호사, 성소수자 법률 지원, 혐오범죄, 아웃팅 협박, 데이팅앱 성범죄, 약물 성범죄, GHB 성범죄, 남성 불법촬영 피해',
    ogTitle: '성소수자 범죄피해 지원센터',
    ogDescription: '남성 성범죄·동성간 성폭력·혐오범죄·아웃팅 협박. 대표변호사가 직접 수행해 비밀을 보장합니다.',
  })
}

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': 'https://lawfirmrohandlee.com/centers/lgbtq-crime#organization',
  name: '성소수자 범죄피해 지원센터',
  alternateName: '법률사무소 로앤이 성소수자 범죄피해 전담',
  url: 'https://lawfirmrohandlee.com/centers/lgbtq-crime',
  description: '남성 성범죄 피해, 동성간 성폭력, 혐오범죄, 아웃팅 협박 등 성소수자 커뮤니티 내 범죄 피해를 전문적으로 대리하는 법률서비스',
  telephone: '+82-32-207-8788',
  parentOrganization: { '@type': 'LegalService', name: '법률사무소 로앤이', url: 'https://lawfirmrohandlee.com' },
  knowsAbout: [
    '남성 성범죄', '동성간 성폭력', '남성 강제추행', '혐오범죄', '아웃팅 협박', '데이팅앱 성범죄',
    '약물 이용 성범죄', 'GHB 성범죄', '불법촬영물 유포', '성소수자 법률 지원', '남성 성폭력 피해자',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '성소수자 범죄피해 법률서비스',
    itemListElement: [
      '동성간 성폭력 고소 대리', '혐오범죄 법적 대응', '아웃팅 협박·공갈 대응',
      '불법촬영·유포 피해 대응', '약물 이용 성범죄 대응', '데이팅앱 범죄 피해 대응',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
}

const whyBlocks = [
  {
    title: '대표변호사 직접 수행, 비밀 보장',
    body: '사건의 모든 과정을 대표변호사 이유림·노채은이 직접 수행합니다. 다른 변호사나 사무장에게 위임하지 않으므로, 사건 내용을 아는 사람은 담당 대표변호사 1인뿐입니다. 변호사의 비밀유지의무는 변호사법으로 보장됩니다.',
  },
  {
    title: '피해자 중심 전문성',
    body: `로앤이는 국내최초 종합 피해자 중심 로펌으로, ${FIRM_STATS.totalCasesDate} 기준 누적 ${FIRM_STATS.totalCases}건의 피해자 대리 실적을 보유하고 있습니다. 대표변호사 이유림은 《피해자 감별사회》(박영사) 공동저자이며, 피해자 권리 옹호에 특화된 법률 서비스를 제공합니다.`,
  },
  {
    title: '2차 피해 없는 상담 구조',
    body: '"왜 그런 곳에 갔어요?", "왜 거부하지 않았어요?" 같은 질문을 하지 않습니다. 피해자의 상황을 있는 그대로 듣고, 법적 보호를 위한 방법을 찾습니다. 상담 과정에서 성정체성에 대한 판단이나 평가를 하지 않습니다.',
  },
]

const heading = 'text-2xl sm:text-3xl font-bold text-black'
const eyebrow = 'text-xs tracking-[0.3em] text-gray-400 uppercase mb-3'

export default function Page() {
  return (
    <>
      <JsonLd data={legalServiceJsonLd} />
      <JsonLd data={faqJsonLd(hubFaqs)} />
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '성소수자 범죄피해 지원센터' }]} />

      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="inline-block text-xs sm:text-sm font-semibold px-5 py-2 bg-[#1B3B2F] text-white rounded-full mb-6 tracking-wide">
            성소수자 범죄피해 지원센터
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            &ldquo;남자니까 참아야 한다&rdquo;는 말,
            <br />
            <span className="text-[#1B3B2F]">법적 근거가 없습니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-lg text-gray-600 leading-relaxed">
            성별, 성정체성에 관계없이 모든 범죄 피해자는 법의 보호를 받습니다.
            <br className="hidden sm:inline" />
            법률사무소 로앤이는 성소수자 범죄피해를 전문적으로 대리합니다.
            <br className="hidden sm:inline" />
            대표변호사가 상담부터 사건 종결까지 직접 수행합니다.
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#1B3B2F] font-medium">
            {FIRM_STATS.totalCasesDate} 기준 누적 피해자 대리 {FIRM_STATS.totalCases}건
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              상담 신청하기
            </Link>
            <a
              href="tel:+82322078788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1B3B2F]/20 text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-[#1B3B2F]/5 transition-colors min-h-[48px]"
            >
              전화 상담 032-207-8788
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className={`${heading} text-center mb-8`}>남성 성범죄 피해, 혼자 감당하지 않아도 됩니다</h2>
          <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed">
            {hubIntro.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className={`${heading} text-center mb-10`}>이런 이유로 참고 계신가요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fears.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-base font-bold text-black mb-3">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-center`}>Practice Areas</p>
          <h2 className={`${heading} text-center mb-3`}>성소수자 범죄피해 지원센터가 다루는 사건</h2>
          <p className="text-center text-sm text-gray-500 mb-10">유형을 선택하면 적용 법률, 대응 절차, 자주 묻는 질문을 자세히 볼 수 있습니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crimePages.map((c) => (
              <Link
                key={c.slug}
                href={`${LGBTQ_BASE}/${c.slug}`}
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 hover:border-[#1B3B2F]/30 hover:shadow-md transition-all"
              >
                <span className="text-3xl flex-shrink-0" aria-hidden>{c.icon}</span>
                <span>
                  <span className="block text-base font-bold text-black group-hover:text-[#1B3B2F]">{c.cardTitle}</span>
                  <span className="block mt-1 text-xs text-[#1B3B2F]/70">{c.cardDesc}</span>
                  <span className="block mt-2 text-sm text-gray-600 leading-relaxed">{crimeSummaries[c.slug]}</span>
                  <span className="block mt-3 text-xs font-medium text-[#1B3B2F]">자세히 보기 &rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#f7faf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-center`}>First Steps</p>
          <h2 className={`${heading} text-center mb-3`}>피해 직후, 이것부터 하세요</h2>
          <p className="text-center text-sm text-gray-500 mb-10">처음 몇 시간의 대응이 증거와 결과를 좌우합니다.</p>
          <ol className="space-y-4">
            {firstSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-white border border-gray-100 p-5">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1B3B2F] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="text-base font-bold text-black">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm text-gray-500">
            자세한 방법은{' '}
            <Link href={`${LGBTQ_BASE}/guide/evidence`} className="text-[#1B3B2F] underline">증거 보존 가이드</Link>
            에서 확인하세요.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-center`}>Legal Protection</p>
          <h2 className={`${heading} text-center mb-3`}>남성·성소수자 피해자를 보호하는 법</h2>
          <p className="text-center text-sm text-gray-500 mb-10">피해자의 성별과 성정체성은 법의 보호를 받는 데 아무런 조건이 되지 않습니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalProtections.map((l) => (
              <div key={l.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="text-base font-bold text-[#1B3B2F] mb-2">{l.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-400 text-center">법정형은 조문 기준의 일반 안내이며, 실제 적용 죄명과 처벌은 사건의 구체적 사정에 따라 달라집니다.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-center`}>Why ROH&amp;LEE</p>
          <h2 className={`${heading} text-center mb-10`}>왜 로앤이인가</h2>
          <div className="space-y-4">
            {whyBlocks.map((b) => (
              <div key={b.title} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-center`}>Process</p>
          <h2 className={`${heading} text-center mb-3`}>상담부터 해결까지, 대표변호사가 직접</h2>
          <p className="text-center text-sm text-gray-500 mb-10">모든 단계를 같은 변호사가 맡아, 사건을 처음부터 다시 설명할 필요가 없습니다.</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {processSteps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-gray-100 p-6">
                <span className="text-3xl font-light text-gray-300">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold text-black">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#f7faf9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className={`${heading} text-center mb-3`}>처벌, 배상, 보호를 함께 진행합니다</h2>
          <p className="text-center text-sm text-gray-500 mb-10">고소장 제출로 끝나지 않고 피해 회복까지 이어갑니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tracks.map((t) => (
              <div key={t.title} className="rounded-2xl bg-white border border-gray-100 p-6">
                <h3 className="text-base font-bold text-black mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqList faqs={hubFaqs} />

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className={`${heading} text-center mb-10`}>피해자 가이드</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {guidePages.map((g) => (
              <Link
                key={g.slug}
                href={`${LGBTQ_BASE}/guide/${g.slug}`}
                className="block rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-[#1B3B2F]/30 transition-colors"
              >
                <span className="block text-base font-bold text-black">{g.cardTitle}</span>
                <span className="block mt-2 text-sm text-gray-600 leading-relaxed">{g.heroSubtitle}</span>
                <span className="block mt-3 text-xs font-medium text-[#1B3B2F]">자세히 보기 &rarr;</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            일반 성범죄 피해 정보는{' '}
            <Link href="/centers/sexual-crime" className="text-[#1B3B2F] underline">성범죄 피해 전문센터</Link>
            , 사진·대화 유포가 걱정된다면{' '}
            <Link href={`${LGBTQ_BASE}/revenge-porn`} className="text-[#1B3B2F] underline">불법촬영·유포 대응</Link>
            을 확인하세요.
          </p>
        </div>
      </section>

      <ConsultCta />
    </>
  )
}
