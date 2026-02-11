import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { BlogPost } from '@/lib/blog'
import BlogListClient from './BlogListClient'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/blog', {
    title: '법률 블로그',
    description: '법률사무소 로앤이 법률 블로그. 성범죄·재산범죄·회생파산 등 법률 정보와 판례 분석, 법률 상식을 알기 쉽게 전달합니다.',
    ogTitle: '법률 블로그 | 법률사무소 로앤이',
    ogDescription: '성범죄·재산범죄·회생파산 등 법률 정보와 판례 분석.',
  })
}

export const revalidate = 3600

export default async function Page() {
  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  const { data: featured } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('is_featured', { ascending: false })
    .order('view_count', { ascending: false })
    .limit(3)

  return (
    <BlogListClient
      initialPosts={(posts as BlogPost[]) || []}
      initialFeatured={(featured as BlogPost[]) || []}
    />
  )
}
