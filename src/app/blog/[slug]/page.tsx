import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import BlogPostContent from './BlogPostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, meta_description')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  return {
    title: post?.title || '블로그',
    description: post?.meta_description || post?.excerpt || '법률사무소 로앤이 블로그',
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <BlogPostContent slug={slug} />
}
