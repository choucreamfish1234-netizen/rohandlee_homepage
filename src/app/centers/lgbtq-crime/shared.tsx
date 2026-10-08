import Link from 'next/link'
import { type Faq, findPage } from '@/data/lgbtq-crime'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function articleJsonLd(headline: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    author: {
      '@type': 'Person',
      '@id': 'https://lawfirmrohandlee.com/lawyers/lee-yurim',
      name: '이유림',
      jobTitle: '대표변호사',
      url: 'https://lawfirmrohandlee.com/lawyers/lee-yurim',
    },
    publisher: { '@type': 'Organization', name: '법률사무소 로앤이', url: 'https://lawfirmrohandlee.com' },
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    mainEntityOfPage: `https://lawfirmrohandlee.com${path}`,
  }
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-3">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-10">자주 묻는 질문</h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm sm:text-base font-medium text-black">
                {f.q}
                <span className="mt-0.5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ConsultCta({ note }: { note?: string }) {
  return (
    <section className="py-14 sm:py-20 bg-[#1B3B2F] text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">비밀이 보장되는 상담을 신청하세요</h2>
        <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed">
          상담 내용은 담당 대표변호사 외 누구에게도 전달되지 않습니다.
          {note && <><br />{note}</>}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
          >
            상담 신청하기
          </Link>
          <a
            href="tel:+82322078788"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors min-h-[48px]"
          >
            전화 상담 032-207-8788
          </a>
        </div>
      </div>
    </section>
  )
}

export function RelatedLinks({ paths, title = '관련 법률서비스' }: { paths: string[]; title?: string }) {
  const links = paths.map(findPage).filter((p): p is { title: string; href: string } => p !== null)
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h3 className="text-base font-bold text-black mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-xl border border-gray-100 p-4 text-sm font-medium text-black hover:border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors"
            >
              {l.title} &rarr;
            </Link>
          ))}
          <Link
            href="/centers/sexual-crime"
            className="block rounded-xl border border-gray-100 p-4 text-sm font-medium text-black hover:border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors"
          >
            성범죄 피해 전문센터 &rarr;
          </Link>
          <Link
            href="/centers/lgbtq-crime"
            className="block rounded-xl border border-gray-100 p-4 text-sm font-medium text-black hover:border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors"
          >
            성소수자 범죄피해 지원센터 &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
