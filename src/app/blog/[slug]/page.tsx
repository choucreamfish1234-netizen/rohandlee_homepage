import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Metadata } from 'next'
import type { BlogPost } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'
import ViewCounter from '@/components/ViewCounter'

const baseUrl = 'https://lawfirmrohandlee.com'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')

  return (posts || []).map((post) => ({
    slug: post.slug,
  }))
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
      images: post.thumbnail_url ? [post.thumbnail_url] : [`${baseUrl}/og-image.png`],
      url: `${baseUrl}/blog/${decodedSlug}`,
      siteName: '법률사무소 로앤이',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail_url ? [post.thumbnail_url] : [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
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

  // Author info mapping for JSON-LD
  const authorName = post?.author || '이유림 변호사'
  const isLeeYurim = authorName.includes('이유림')
  const authorJsonLd = {
    '@type': 'Person' as const,
    name: isLeeYurim ? '이유림' : '노채은',
    jobTitle: isLeeYurim ? '성범죄 피해자 전문 변호사' : '재산범죄 피해자 전문 변호사',
    affiliation: {
      '@type': 'LegalService' as const,
      name: '법률사무소 로앤이',
    },
    knowsAbout: isLeeYurim
      ? ['성범죄 피해자 변호', '디지털 포렌식', '피해자 국선변호', '불법촬영', '스토킹']
      : ['보이스피싱 피해 구제', '전세사기', '개인회생', '개인파산'],
  }

  // Extract FAQ from markdown content for FAQPage schema
  function extractFaqFromContent(content: string): { question: string; answer: string }[] {
    const faqs: { question: string; answer: string }[] = []
    const lines = content.split('\n')
    let currentQ = ''
    for (const line of lines) {
      const qMatch = line.match(/\*?\*?Q:\s*(.+?)[\*]*$/)
      const aMatch = line.match(/\*?\*?A:\*?\*?\s*(.+)$/)
      if (qMatch) {
        currentQ = qMatch[1].replace(/\*+/g, '').trim()
      } else if (aMatch && currentQ) {
        const answer = aMatch[1].replace(/\*+/g, '').replace(/\(.+?감수\)/g, '').trim()
        if (answer) {
          faqs.push({ question: currentQ, answer })
        }
        currentQ = ''
      }
    }
    return faqs
  }

  // Determine about topic based on category
  const aboutTopic = post ? (() => {
    switch (post.category) {
      case '성범죄': return '성범죄 피해자 법률 상담'
      case '재산범죄': return '재산범죄 피해 법률 상담'
      case '회생파산': return '개인회생·파산 법률 상담'
      default: return '법률 상담'
    }
  })() : null

  // JSON-LD Article structured data (GEO-enhanced)
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: authorJsonLd,
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
    about: {
      '@type': 'Thing',
      name: aboutTopic,
    },
    isAccessibleForFree: true,
    inLanguage: 'ko',
  } : null

  // FAQPage schema (if content has Q&A section)
  const faqs = post ? extractFaqFromContent(post.content || '') : []
  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {post && <ViewCounter postId={post.id} />}
      <BlogPostContent slug={decodedSlug} initialPost={post as BlogPost | null} />
    </>
  )
}
