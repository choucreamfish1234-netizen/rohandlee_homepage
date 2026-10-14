import raw from '@/data/detention/guides.json'
import type { BlogPost } from '@/lib/blog'

export const GUIDE_DATE = '2026-10-15T01:30:00+09:00'
export const GUIDE_BASE = 'https://lawfirmrohandlee.com'
export const detentionGuides = raw.map((guide, index) => ({
  ...guide, id: -1000 - index,
  cover: `/blog/detention-covers/${guide.slug}.svg`,
}))
export type DetentionGuide = typeof detentionGuides[number]
export const findDetentionGuide = (slug: string) => detentionGuides.find(g => g.slug === slug)
export function guideAsPost(g: DetentionGuide): BlogPost {
  return {
    id: g.id, title: g.title, slug: g.slug, content: g.body,
    excerpt: g.excerpt, meta_description: g.excerpt, category: '법률정보',
    tags: [g.city, '접견', '구속 가족 안내'], thumbnail_url: g.cover,
    author: '법률사무소 로앤이', status: 'published', view_count: 0,
    is_featured: false, published_at: GUIDE_DATE, scheduled_at: null,
    naver_content: null, naver_published: false, created_at: GUIDE_DATE, updated_at: GUIDE_DATE,
  }
}
