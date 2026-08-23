import { supabase } from './supabase'
import { getRandomImage, getImagePool } from '@/data/random-images'

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  category: string
  tags: string[]
  thumbnail_url: string | null
  author: string
  status: 'draft' | 'published' | 'scheduled'
  view_count: number
  is_featured: boolean
  published_at: string | null
  scheduled_at: string | null
  naver_content: string | null
  naver_published: boolean
  created_at: string
  updated_at: string
}

export const CATEGORIES = [
  '전체',
  '성범죄',
  '재산범죄',
  '신체범죄',
  '명예훼손',
  '개인정보보호',
  '부동산',
  '재산회복',
  '손해배상',
  '학교폭력',
  '법률정보',
] as const

export const CATEGORY_THUMBNAILS: Record<string, string> = {
  '성범죄': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=450&fit=crop&q=80',
  '재산범죄': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop&q=80',
  '신체범죄': 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&h=450&fit=crop&q=80',
  '명예훼손': 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&h=450&fit=crop&q=80',
  '개인정보보호': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop&q=80',
  '부동산': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&q=80',
  '재산회복': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&q=80',
  '손해배상': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=450&fit=crop&q=80',
  '학교폭력': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop&q=80',
  '법률정보': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80'

export function getCategoryThumbnail(category: string): string {
  return CATEGORY_THUMBNAILS[category] || FALLBACK_IMAGE
}

export function getRandomThumbnail(category: string, usedUrls: string[] = []): string {
  return getRandomImage(category, usedUrls)
}

export function getCategoryImagePool(category: string): string[] {
  return getImagePool(category)
}

export function getReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.length / 500))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const POSTS_PER_PAGE = 9

export async function getPublishedPosts({
  page = 1,
  category,
  search,
}: {
  page?: number
  category?: string
  search?: string
} = {}) {
  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })

  if (category && category !== '전체') {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  const from = (page - 1) * POSTS_PER_PAGE
  const to = from + POSTS_PER_PAGE - 1
  query = query.range(from, to)

  const { data, count, error } = await query
  return {
    posts: (data as BlogPost[]) || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / POSTS_PER_PAGE),
    error,
  }
}

export async function getFeaturedPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('view_count', { ascending: false })
    .limit(3)

  return (data as BlogPost[]) || []
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  return { post: data as BlogPost | null, error }
}

export async function getAdjacentPosts(publishedAt: string) {
  const [prev, next] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('title, slug')
      .eq('status', 'published')
      .lt('published_at', publishedAt)
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('blog_posts')
      .select('title, slug')
      .eq('status', 'published')
      .gt('published_at', publishedAt)
      .order('published_at', { ascending: true })
      .limit(1)
      .maybeSingle(),
  ])

  return {
    prev: prev.data as { title: string; slug: string } | null,
    next: next.data as { title: string; slug: string } | null,
  }
}

export async function getRelatedPosts(category: string, excludeId: number) {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, thumbnail_url, published_at')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(3)

  return (data as BlogPost[]) || []
}

export async function incrementViewCount(postId: number) {
  await supabase.rpc('increment_view_count', { post_id: postId })
}

// Admin functions
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return { posts: (data as BlogPost[]) || [], error }
}

export async function getPostById(id: number) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  return { post: data as BlogPost | null, error }
}

export async function createPost(post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  return { post: data as BlogPost | null, error }
}

export async function updatePost(id: number, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  return { post: data as BlogPost | null, error }
}

export async function deletePost(id: number) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  return { error }
}

export async function getAdminStats() {
  const { data } = await supabase
    .from('blog_posts')
    .select('status, view_count')

  const posts = data || []
  return {
    total: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    totalViews: posts.reduce((sum, p) => sum + (p.view_count || 0), 0),
  }
}
