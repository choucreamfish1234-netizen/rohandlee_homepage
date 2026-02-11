import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Metadata } from 'next'
import type { BlogPost } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

const baseUrl = 'https://rohandlee-homepage.vercel.app'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('title, excerpt, meta_description, seo_description, thumbnail_url, author, created_at, content')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .maybeSingle()

  if (!post) {
    return { title: '블로그 | 법률사무소 로앤이' }
  }

  const description = post.seo_description || post.meta_description || post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '법률사무소 로앤이 블로그'
  const title = `${post.title} | 법률사무소 로앤이`

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog/${decodedSlug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author || '이유림 변호사'],
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
      url: `${baseUrl}/blog/${decodedSlug}`,
      siteName: '법률사무소 로앤이',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    },
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

  // JSON-LD Article structured data
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author || '이유림 변호사',
    },
    publisher: {
      '@type': 'Organization',
      name: '법률사무소 로앤이',
      url: baseUrl,
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    image: post.thumbnail_url || undefined,
    description: post.seo_description || post.meta_description || post.excerpt || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${decodedSlug}`,
    },
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostContent slug={decodedSlug} initialPost={post as BlogPost | null} />
    </>
  )
}
