import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { detentionGuides, GUIDE_BASE, GUIDE_DATE, type DetentionGuide } from '@/lib/detention-guides'

export default function DetentionGuideArticle({ guide }: { guide: DetentionGuide }) {
  const related = detentionGuides.filter(g => g.city === guide.city && g.slug !== guide.slug)
  const url = `${GUIDE_BASE}/blog/${guide.slug}`
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
    description: guide.excerpt, datePublished: GUIDE_DATE, dateModified: GUIDE_DATE,
    author: { '@type': 'Organization', name: '법률사무소 로앤이', url: GUIDE_BASE },
    publisher: { '@type': 'Organization', name: '법률사무소 로앤이', url: GUIDE_BASE },
    mainEntityOfPage: url, inLanguage: 'ko-KR', image: `${GUIDE_BASE}${guide.cover}`,
    citation: guide.sources.map(s => s.url),
  }
  return <article className="bg-[#f7f7f2] text-[#263c30] px-5 py-12 sm:py-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <div className="max-w-3xl mx-auto">
      <nav aria-label="현재 위치" className="text-sm text-[#526559] mb-10"><Link href="/">홈</Link> / <Link href="/blog">법률상식</Link> / <Link href="/blog/detention-family-guides">구속 가족 안내</Link></nav>
      <p className="text-sm tracking-widest mb-4">{guide.city} · 가족을 위한 안내</p>
      <h1 className="text-[2rem] sm:text-5xl font-semibold leading-[1.35] tracking-tight break-keep">{guide.title}</h1>
      <p className="mt-6 text-lg leading-8 text-[#46594d]">{guide.excerpt}</p>
      <p className="text-sm text-[#59695d] mt-6">법률사무소 로앤이 · <time dateTime={GUIDE_DATE}>2026. 10. 15.</time></p>
      <img src={guide.cover} alt={`${guide.city} 가족 안내: ${guide.title}`} width="1200" height="630" className="w-full h-auto my-10" />
      <div className="prose prose-lg max-w-none prose-headings:text-[#263c30] prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-[1.9] prose-li:leading-[1.9] prose-strong:text-[#183b29] text-[#384c40] break-keep">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{guide.body}</ReactMarkdown>
      </div>
      <aside className="mt-12 border-t border-[#ced6cc] pt-8 text-sm leading-7 text-[#526559]">
        <h2 className="font-semibold text-base mb-3">공식 자료와 확인 기준</h2>
        <ul>{guide.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{s.label} ↗</a></li>)}</ul>
        <p className="mt-4">2026년 10월 15일 확인한 공식 안내를 바탕으로 정리했습니다. 운영 조건은 변경될 수 있으므로 방문·신청 전 기관의 최신 안내를 확인하세요. 사건별 법률 판단은 구체적인 기록과 상황에 따라 달라집니다.</p>
      </aside>
      <section className="my-12 bg-[#253f31] p-7 sm:p-10 text-[#f7f7f2]">
        <h2 className="text-2xl font-medium">가족의 상황을 함께 정리하겠습니다.</h2>
        <p className="mt-4 leading-7">현재 수용기관과 사건 단계, 예정된 조사·재판 일정을 알려주세요.</p>
        <a href={`?consult=1`} className="inline-block mt-6 border-b border-white/60 py-2">문의·상담예약 안내 ↗</a>
      </section>
      <section aria-label="함께 읽을 글"><h2 className="text-2xl mb-5">{guide.city} 관련 안내</h2><ul className="divide-y divide-[#d7ded3]">{related.slice(0, 4).map(g => <li key={g.slug}><Link href={`/blog/${g.slug}`} className="block py-4 leading-7">{g.title} ↗</Link></li>)}</ul><Link href="/blog/detention-family-guides" className="inline-block mt-6 underline underline-offset-4">세 구치소 안내 30편 모두 보기</Link></section>
    </div>
  </article>
}
