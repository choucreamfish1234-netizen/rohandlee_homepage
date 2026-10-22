import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageSeo } from '@/lib/seo'
import { getArea, getAreaPage } from '@/data/practice'
import PracticeDetail from '@/components/practice/PracticeDetail'

interface Props {
  params: Promise<{ slug: string }>
}

const area = getArea('defense')

export const dynamicParams = false

export function generateStaticParams() {
  return area.pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getAreaPage('defense', slug)
  if (!page) return {}
  return getPageSeo(`${area.base}/${slug}`, {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords.join(', '),
    ogTitle: page.metaTitle,
    ogDescription: page.metaDescription,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = getAreaPage('defense', slug)
  if (!page) notFound()
  return <PracticeDetail area={area} page={page} />
}
