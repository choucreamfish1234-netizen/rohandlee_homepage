import collectionRaw from '@/data/collection/guides.json'
import defenseRaw from '@/data/defense/guides.json'
import type { BlogPost } from '@/lib/blog'

// 저장소에서 버전 관리하는 기획 글 시리즈(채권추심·형사대응).
// 글마다 공개 시각(publishedAt)이 있어, 그 시각이 지나야 목록·상세·사이트맵에 나타난다.
// 블로그 페이지와 사이트맵은 1시간마다 재생성되므로 추가 배포 없이 순차 공개된다.

interface RawGuide {
  slug: string
  keyword: string
  title: string
  excerpt: string
  body: string
  sources: { label: string; url: string }[]
  link?: string
  publishedAt?: string
}

export type SeriesKey = 'collection' | 'defense'

export interface EditorialSeries {
  key: SeriesKey
  category: string
  team: string
  coverDir: string
  centerHref: string
  centerLabel: string
  ctaTitle: string
  ctaText: string
  sourceNote: string
  idBase: number
}

export interface EditorialGuide extends RawGuide {
  id: number
  series: SeriesKey
  cover: string
  publishedAt: string
}

export const SERIES: Record<SeriesKey, EditorialSeries> = {
  collection: {
    key: 'collection',
    category: '채권추심',
    team: '채권추심센터',
    coverDir: '/blog/collection-covers',
    centerHref: '/collection',
    centerLabel: '채권추심센터 안내',
    ctaTitle: '받아야 할 돈, 회수 순서부터 함께 정리하겠습니다.',
    ctaText: '채권 금액과 발생 경위, 갖고 계신 자료, 상대방에 대해 알고 있는 정보를 알려주세요.',
    sourceNote: '2026년 11월 기준 법령과 공식 안내를 바탕으로 정리했습니다. 법령과 실무 기준은 바뀔 수 있으며, 사건별 판단은 채권 자료와 상대방 재산 상황에 따라 달라집니다.',
    idBase: -2000,
  },
  defense: {
    key: 'defense',
    category: '형사대응',
    team: '형사 사건 대응팀',
    coverDir: '/blog/defense-covers',
    centerHref: '/defense',
    centerLabel: '형사 사건 대응 안내',
    ctaTitle: '조사 전에, 지금 상황부터 함께 정리하겠습니다.',
    ctaText: '받은 연락이나 서류, 조사 일정, 현재 사건 단계를 알려주세요. 대표변호사가 직접 검토합니다.',
    sourceNote: '2026년 11월 기준 법령과 공식 안내를 바탕으로 정리했습니다. 법정형과 절차는 일반 안내이며, 실제 처분은 사건의 사실관계와 증거에 따라 달라집니다.',
    idBase: -3000,
  },
}

const COLLECTION_DATE = '2026-11-02T09:00:00+09:00'

function build(raw: RawGuide[], key: SeriesKey, fallbackDate: string): EditorialGuide[] {
  const s = SERIES[key]
  return raw.map((g, i) => ({
    ...g,
    id: s.idBase - i,
    series: key,
    cover: `${s.coverDir}/${g.slug}.svg`,
    publishedAt: g.publishedAt || fallbackDate,
  }))
}

export const allGuides: EditorialGuide[] = [
  ...build(collectionRaw as RawGuide[], 'collection', COLLECTION_DATE),
  ...build(defenseRaw as RawGuide[], 'defense', COLLECTION_DATE),
]

const isLive = (g: EditorialGuide, now: number) => new Date(g.publishedAt).getTime() <= now

/** 지금 공개된 글만, 최신 공개 순 */
export function publishedGuides(series?: SeriesKey, now = Date.now()) {
  return allGuides
    .filter((g) => (!series || g.series === series) && isLive(g, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id)
}

export function findPublishedGuide(slug: string, now = Date.now()) {
  const g = allGuides.find((x) => x.slug === slug)
  return g && isLive(g, now) ? g : undefined
}

export function categorySeries(category: string): SeriesKey | undefined {
  return (Object.values(SERIES).find((s) => s.category === category) || undefined)?.key
}

/** 같은 시리즈에서 함께 읽을 글 */
export function relatedGuides(guide: EditorialGuide, count = 4) {
  const pool = publishedGuides(guide.series).filter((g) => g.slug !== guide.slug)
  const sameLink = pool.filter((g) => guide.link && g.link === guide.link)
  const rest = pool.filter((g) => !sameLink.includes(g))
  return [...sameLink, ...rest].slice(0, count)
}

export function guideAsPost(g: EditorialGuide): BlogPost {
  const category = SERIES[g.series].category
  return {
    id: g.id, title: g.title, slug: g.slug, content: g.body,
    excerpt: g.excerpt, meta_description: g.excerpt, category,
    tags: [g.keyword, category, '법률사무소 로앤이'], thumbnail_url: g.cover,
    author: '법률사무소 로앤이', status: 'published', view_count: 0,
    is_featured: false, published_at: g.publishedAt, scheduled_at: null,
    naver_content: null, naver_published: false, created_at: g.publishedAt, updated_at: g.publishedAt,
  }
}

/** 본문의 "### Q. 질문" / "A. 답변" 형식에서 FAQ를 뽑는다. */
export function guideFaqs(body: string) {
  const faqs: { q: string; a: string }[] = []
  let q = ''
  for (const line of body.split('\n')) {
    const qm = line.match(/^###\s*Q\.\s*(.+)$/)
    const am = line.match(/^A\.\s*(.+)$/)
    if (qm) q = qm[1].trim()
    else if (am && q) {
      faqs.push({ q, a: am[1].trim() })
      q = ''
    }
  }
  return faqs
}
