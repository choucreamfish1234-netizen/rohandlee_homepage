import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import DamagesPage from './DamagesPage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/damages', {
    title: '손해배상 전담센터 | 법률사무소 로앤이',
    description: '교통사고·의료사고·산업재해·제조물결함. 정당한 보상을 받을 권리, 법률사무소 로앤이가 끝까지 싸웁니다. 무료 상담 032-207-8788',
    keywords: '교통사고 변호사, 의료사고 변호사, 산업재해 변호사, 산재 변호사, 손해배상, 제조물책임, 보험사 합의금',
    ogTitle: '손해배상 전담센터 | 법률사무소 로앤이',
    ogDescription: '교통사고·의료사고·산업재해·제조물결함. 정당한 보상을 받을 권리, 끝까지 싸웁니다.',
  })
}

export default function Page() {
  return <DamagesPage />
}
