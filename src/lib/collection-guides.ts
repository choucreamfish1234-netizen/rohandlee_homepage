import rawGuides from '@/data/collection/guides.json'
import type { BlogPost } from '@/lib/blog'

// 채권추심 카테고리 기획 글 — 저장소에서 버전 관리하고 블로그 목록·상세·사이트맵에 함께 노출한다.
export const COLLECTION_DATE = '2026-11-02T09:00:00+09:00'
export const COLLECTION_CATEGORY = '채권추심'

interface RawCollectionGuide {
  slug: string
  keyword: string
  title: string
  excerpt: string
  body: string
  sources: { label: string; url: string }[]
}
const raw = rawGuides as RawCollectionGuide[]

export const collectionGuides = raw.map((guide, index) => ({
  ...guide,
  id: -2000 - index,
  cover: `/blog/collection-covers/${guide.slug}.svg`,
}))
export type CollectionGuide = (typeof collectionGuides)[number]
export const findCollectionGuide = (slug: string) => collectionGuides.find((g) => g.slug === slug)

export function collectionGuideAsPost(g: CollectionGuide): BlogPost {
  return {
    id: g.id, title: g.title, slug: g.slug, content: g.body,
    excerpt: g.excerpt, meta_description: g.excerpt, category: COLLECTION_CATEGORY,
    tags: [g.keyword, COLLECTION_CATEGORY, '법률사무소 로앤이'], thumbnail_url: g.cover,
    author: '법률사무소 로앤이', status: 'published', view_count: 0,
    is_featured: false, published_at: COLLECTION_DATE, scheduled_at: null,
    naver_content: null, naver_published: false, created_at: COLLECTION_DATE, updated_at: COLLECTION_DATE,
  }
}

/** 본문의 "### Q. 질문" / "A. 답변" 형식에서 FAQ를 뽑는다. */
export function collectionFaqs(body: string) {
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
