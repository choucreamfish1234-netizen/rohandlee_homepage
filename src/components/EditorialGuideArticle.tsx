import GuideConsultationButton from './GuideConsultationButton'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GUIDE_BASE } from '@/lib/detention-guides'
import { guideFaqs, type EditorialGuide, type EditorialSeries } from '@/lib/editorial-guides'

// 저장소에서 관리하는 기획 글(채권추심·형사대응 등) 공용 상세 화면
export default function EditorialGuideArticle({
  guide,
  related,
  series,
}: {
  guide: EditorialGuide
  related: EditorialGuide[]
  series: EditorialSeries
}) {
  const url = `${GUIDE_BASE}/blog/${guide.slug}`
  const faqs = guideFaqs(guide.body)
  const listUrl = `/blog?category=${encodeURIComponent(series.category)}`
  const published = guide.publishedAt
  const dateLabel = new Date(published).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
  const schema = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
      description: guide.excerpt, datePublished: published, dateModified: published,
      author: { '@type': 'Organization', name: '법률사무소 로앤이', url: GUIDE_BASE },
      publisher: { '@type': 'Organization', name: '법률사무소 로앤이', url: GUIDE_BASE },
      mainEntityOfPage: url, inLanguage: 'ko-KR', image: `${GUIDE_BASE}${guide.cover}`,
      keywords: guide.keyword, articleSection: series.category,
      citation: guide.sources.map((s) => s.url),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: GUIDE_BASE },
        { '@type': 'ListItem', position: 2, name: '법률상식', item: `${GUIDE_BASE}/blog` },
        { '@type': 'ListItem', position: 3, name: series.category, item: `${GUIDE_BASE}${listUrl}` },
        { '@type': 'ListItem', position: 4, name: guide.title, item: url },
      ],
    },
    ...(faqs.length
      ? [{
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }]
      : []),
  ]

  return <article className="bg-[#f7f7f2] text-[#263c30] px-5 py-12 sm:py-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <div className="max-w-3xl mx-auto">
      <nav aria-label="현재 위치" className="text-sm text-[#526559] mb-10"><Link href="/">홈</Link> / <Link href="/blog">법률상식</Link> / <Link href={listUrl}>{series.category}</Link></nav>
      <p className="text-sm tracking-widest mb-4">{series.category} · {guide.keyword}</p>
      <h1 className="text-[2rem] sm:text-5xl font-semibold leading-[1.35] tracking-tight break-keep">{guide.title}</h1>
      <p className="mt-6 text-lg leading-8 text-[#46594d]">{guide.excerpt}</p>
      <p className="text-sm text-[#59695d] mt-6">법률사무소 로앤이 {series.team} · <time dateTime={published}>{dateLabel}</time></p>
      <img src={guide.cover} alt={guide.title} width="1200" height="630" className="w-full h-auto my-10" />
      <div className="prose prose-lg max-w-none prose-headings:text-[#263c30] prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-p:leading-[1.9] prose-li:leading-[1.9] prose-a:text-[#1B3B2F] prose-a:underline-offset-4 text-[#384c40] break-keep">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{guide.body}</ReactMarkdown>
      </div>
      <aside className="mt-12 border-t border-[#ced6cc] pt-8 text-sm leading-7 text-[#526559]">
        <h2 className="font-semibold text-base mb-3">근거 법령과 공식 자료</h2>
        <ul>{guide.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{s.label} ↗</a></li>)}</ul>
        <p className="mt-4">{series.sourceNote}</p>
      </aside>
      <section className="my-12 bg-[#253f31] p-7 sm:p-10 text-[#f7f7f2]">
        <h2 className="text-2xl font-medium">{series.ctaTitle}</h2>
        <p className="mt-4 leading-7">{series.ctaText}</p>
        <GuideConsultationButton />
      </section>
      <section aria-label="함께 읽을 글">
        <h2 className="text-2xl mb-5">{series.category} 관련 글</h2>
        <ul className="divide-y divide-[#d7ded3]">{related.map((g) => <li key={g.slug}><Link href={`/blog/${g.slug}`} className="block py-4 leading-7">{g.title} ↗</Link></li>)}</ul>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={listUrl} className="underline underline-offset-4">{series.category} 글 모두 보기</Link>
          <Link href={guide.link || series.centerHref} className="underline underline-offset-4">{series.centerLabel}</Link>
        </div>
      </section>
    </div>
  </article>
}
