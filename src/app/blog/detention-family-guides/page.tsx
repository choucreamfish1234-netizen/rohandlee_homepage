import Link from 'next/link'
import type { Metadata } from 'next'
import { detentionGuides } from '@/lib/detention-guides'

export const metadata: Metadata = {
  title: '인천·수원·서울동부구치소 접견과 구속 가족 안내 30편',
  description: '가족이 구속되었을 때 먼저 할 일부터 일반접견 예약, 변호인접견, 녹음 여부, 보관금과 생활 지원까지. 세 구치소를 중심으로 질문별 안내를 확인하세요.',
  alternates: { canonical: 'https://lawfirmrohandlee.com/blog/detention-family-guides' },
}
export default function Page() {
  return <section className="bg-[#f7f7f2] text-[#294332] py-14 sm:py-24 px-5"><div className="max-w-5xl mx-auto">
    <Link href="/blog" className="text-sm underline underline-offset-4">법률상식으로 돌아가기</Link>
    <p className="mt-12 text-xs tracking-[.2em]">ROH &amp; LEE · FAMILY GUIDES</p>
    <h1 className="mt-5 text-3xl sm:text-5xl leading-snug tracking-tight font-semibold break-keep">가족이 구속되었다면.<br />지금 필요한 정보부터.</h1>
    <p className="mt-6 text-lg leading-8 max-w-2xl">인천·수원·서울동부구치소를 중심으로 접견과 생활 지원, 사건 대응 준비를 30개의 질문으로 정리했습니다. 각 글에서 공식 출처와 확인일을 함께 살펴보세요.</p>
    <nav aria-label="구치소별 바로가기" className="flex flex-wrap gap-3 mt-8">{['인천구치소','수원구치소','서울동부구치소'].map((city,i) => <a key={city} href={`#facility-${i}`} className="border border-[#adbeaa] px-4 py-3 rounded-full text-sm">{city} ↓</a>)}</nav>
    {['인천구치소','수원구치소','서울동부구치소'].map((city,i) => <section key={city} id={`facility-${i}`} className="mt-16 scroll-mt-28"><h2 className="text-3xl font-semibold pb-6 border-b border-[#c3cdbf]">{city} <span className="text-sm font-normal ml-3">10편</span></h2><ol className="divide-y divide-[#d8ded3]">{detentionGuides.filter(g => g.city===city).map((g,j) => <li key={g.slug}><Link href={`/blog/${g.slug}`} className="flex gap-4 py-6 group"><span className="text-sm text-[#788b75] pt-1">{String(j+1).padStart(2,'0')}</span><div><h3 className="text-xl leading-8 font-medium group-hover:underline">{g.title}</h3><p className="text-sm leading-7 text-[#52664f] mt-2">{g.excerpt}</p></div></Link></li>)}</ol></section>)}
  </div></section>
}
