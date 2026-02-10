import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Metadata } from 'next'
import type { BlogPost } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('title, excerpt, meta_description')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .maybeSingle()

  return {
    title: post?.title || '블로그',
    description: post?.meta_description || post?.excerpt || '법률사무소 로앤이 블로그',
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  // 1차: published 필터로 조회
  let { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .maybeSingle()

  // 2차: published 필터 실패 시 status 필터 없이 재시도
  if (!post) {
    const fallback = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle()

    if (fallback.data) {
      console.log('Blog post found without status filter:', {
        slug: decodedSlug,
        status: fallback.data.status,
        published_at: fallback.data.published_at,
      })
      post = fallback.data
    }
    if (fallback.error) {
      error = fallback.error
    }
  }

  if (error) {
    console.error('Blog post fetch error:', error.message, '| slug:', decodedSlug)
  }

  return <BlogPostContent slug={decodedSlug} initialPost={post as BlogPost | null} />
}
