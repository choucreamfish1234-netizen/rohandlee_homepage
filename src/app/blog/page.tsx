import { detentionGuides, guideAsPost } from '@/lib/detention-guides'
import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { BlogPost } from '@/lib/blog'
import BlogListClient from './BlogListClient'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/blog', {
    title: '법률상식',
    description: '법률사무소 로앤이 법률상식. 인천·수원·서울동부구치소 접견과 구속 가족 안내, 형사·민사 및 피해 회복에 관한 법률 정보를 전합니다.',
    ogTitle: '법률상식',
    ogDescription: '성범죄·재산범죄·학교폭력·부동산·손해배상 등 피해자를 위한 법률 정보.',
  })
}

export const revalidate = 3600

const POSTS_PER_PAGE = 12

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const category = params.category || '전체'

  let query = supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, tags, thumbnail_url, author, status, view_count, published_at, created_at, updated_at', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })

  if (category !== '전체') {
    query = query.eq('category', category)
  }

  const guides = category === '전체' || category === '법률정보' ? detentionGuides.map(guideAsPost) : []
  const from = (page - 1) * POSTS_PER_PAGE
  const localPosts = guides.slice(from, from + POSTS_PER_PAGE)
  const remaining = POSTS_PER_PAGE - localPosts.length
  const dbFrom = Math.max(0, from - guides.length)
  // Fetch count even when the current page consists entirely of editorial guides.
  query = query.range(dbFrom, dbFrom + Math.max(1, remaining) - 1)
  const { data: databasePosts, count } = await query
  const posts = [...localPosts, ...((databasePosts as BlogPost[] | null) || []).slice(0, remaining)]
  const totalCount = (count || 0) + guides.length

  const { data: featured } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, thumbnail_url, view_count, published_at, created_at')
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('view_count', { ascending: false })
    .limit(3)

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return (
    <BlogListClient
      posts={(posts as BlogPost[]) || []}
      featured={(featured as BlogPost[]) || []}
      currentPage={page}
      totalPages={totalPages}
      totalCount={totalCount}
      currentCategory={category}
    />
  )
}
