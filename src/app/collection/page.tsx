import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import { getArea } from '@/data/practice'
import PracticeHub from '@/components/practice/PracticeHub'

const area = getArea('collection')

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo(area.base, {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords.join(', '),
    ogTitle: area.metaTitle,
    ogDescription: area.metaDescription,
  })
}

export default function Page() {
  return <PracticeHub area={area} />
}
