import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { BlogPost } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'
import ViewCounter from '@/components/ViewCounter'

const baseUrl = 'https://lawfirmrohandlee.com'

function extractPlainText(content: string): string {
  return content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.+?)\]\(.*?\)/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^(\d+)\.\s+/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/---+/g, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildDescription(post: { seo_description?: string | null; meta_description?: string | null; excerpt?: string | null; content?: string | null; title?: string }): string {
  const candidates = [
    post.seo_description,
    post.meta_description,
    post.excerpt,
  ]

  for (const c of candidates) {
    if (c && c.trim().length >= 40) return c.trim().substring(0, 160)
  }

  if (post.content) {
    let plain = extractPlainText(post.content)
    if (post.title) {
      const titleEscaped = post.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      plain = plain.replace(new RegExp('^' + titleEscaped + '\\s*'), '')
    }
    const sentences = plain.split(/(?<=[.!?다요죠니까])\s+/)
    let desc = ''
    for (const s of sentences) {
      if (s.trim().length < 10) continue
      if ((desc + ' ' + s).trim().length > 160) break
      desc = (desc + ' ' + s).trim()
      if (desc.length >= 80) break
    }
    if (desc.length >= 40) return desc
    if (plain.length > 0) return plain.substring(0, 160)
  }

  return '법률사무소 로앤이 법률 블로그에서 자세한 내용을 확인하세요.'
}

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
  let { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .maybeSingle()

  if (!post) {
    const fallback = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle()
    post = fallback.data
  }

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
      robots: { index: false, follow: false },
    }
  }

  const description = buildDescription(post)
  const suffix = ' | 법률사무소 로앤이'
  const maxTitleLen = 60 - suffix.length
  let title = post.title
  if (title.length > maxTitleLen) {
    title = title.substring(0, maxTitleLen - 1).replace(/[,\s·\-—]+$/, '') + '…'
  }

  const pageUrl = `${baseUrl}/blog/${decodedSlug}`
  const ogImage = post.thumbnail_url
    ? { url: post.thumbnail_url, width: 1200, height: 630, alt: post.title }
    : { url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: '법률사무소 로앤이' }

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: pageUrl,
      siteName: '법률사무소 로앤이',
      locale: 'ko_KR',
      publishedTime: post.created_at,
      authors: [post.author || '이유림 변호사'],
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage.url],
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

  let { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .maybeSingle()

  if (!post) {
    const fallback = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle()
    post = fallback.data
  }

  if (!post) {
    notFound()
  }

  const postDescription = buildDescription(post)

  // Author info mapping for JSON-LD
  const authorName = post.author || '이유림 변호사'
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

  const aboutTopic = (() => {
    switch (post.category) {
      case '성범죄': return '성범죄 피해자 법률 상담'
      case '재산범죄': return '재산범죄 피해 법률 상담'
      case '신체범죄': return '신체범죄 피해 법률 상담'
      case '부동산': return '부동산 피해 법률 상담'
      case '학교폭력': return '학교폭력 피해 법률 상담'
      case '손해배상': return '손해배상 법률 상담'
      case '재산회복': return '재산회복 법률 상담'
      case '개인정보보호': return '개인정보보호 법률 상담'
      default: return '법률 상담'
    }
  })()

  const pageUrl = `${baseUrl}/blog/${decodedSlug}`

  const jsonLd = {
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
    description: postDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    about: {
      '@type': 'Thing',
      name: aboutTopic,
    },
    isAccessibleForFree: true,
    inLanguage: 'ko',
  }

  const faqs = extractFaqFromContent(post.content || '')
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ViewCounter postId={post.id} />
      <BlogPostContent slug={decodedSlug} initialPost={post as BlogPost} />
    </>
  )
}
