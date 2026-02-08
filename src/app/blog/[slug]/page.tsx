import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import BlogPostContent from './BlogPostContent'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()

  return {
    title: post?.title || '블로그',
    description: post?.excerpt || '법률사무소 로앤이 블로그',
  }
}

export default function Page({ params }: Props) {
  return <BlogPostContent slug={params.slug} />
}
