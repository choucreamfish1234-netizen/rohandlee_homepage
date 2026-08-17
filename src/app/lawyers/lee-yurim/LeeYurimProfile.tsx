'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import { type SuccessCase } from '@/lib/cases'

const PRACTICE_AREAS = [
  '성폭력 피해자 대리',
  '강간·준강간 피해자 대리',
  '강제추행 피해자 대리',
  '스토킹 피해자 대리',
  '불법촬영 등 디지털성범죄 피해자 대리',
  '피해자 고소 및 수사절차 대리',
  '피해자 조사 동석',
  '형사재판 피해자 대리',
  '합의 및 손해배상',
]

const CAREER = {
  current: [
    '법률사무소 로앤이 대표변호사',
    '서울지방변호사회 국선변호사',
    '대한난민지원변호사단',
    '서울이문초등학교 명예교사',
    '부천오정경찰서 집시자문위원회 위원',
    '인천광역시 교육소청심사위원회 위원',
    '인천가정법원 양성평등심의위원회 위원',
  ],
  previous: [
    '법무법인 로웨이 파트너변호사',
    '법무법인 심앤이 소속변호사',
  ],
  education: [
    '충북대학교 법학전문대학원 법학과 전문석사 졸업',
    '한국외국어대학교 프랑스어/경제학전공 졸업',
  ],
}

export default function LeeYurimProfile() {
  const { openConsultation } = useConsultation()
  const [cases, setCases] = useState<SuccessCase[]>([])
  const [blogPosts, setBlogPosts] = useState<{ id: number; title: string; slug: string; category: string }[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const casesRes = await fetch('/api/cases')
        const casesData = await casesRes.json()
        const allCases: SuccessCase[] = casesData.cases || []
        const filtered = allCases.filter(c =>
          c.published !== false &&
          c.representation_side === 'victim' &&
          (c.practice_area === 'sexual_crime' || c.practice_area === 'stalking' || c.practice_area === 'digital_sex_crime' ||
           c.category === '성범죄' || c.category === '스토킹')
        )
        setCases(filtered.slice(0, 4))
      } catch { /* keep empty */ }

      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        )
        const { data } = await supabase
          .from('blog_posts')
          .select('id, title, slug, category, author')
          .eq('status', 'published')
          .in('category', ['성범죄', '신체범죄', '학교폭력'])
          .order('published_at', { ascending: false })
          .limit(4)
        if (data) setBlogPosts(data)
      } catch { /* keep empty */ }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-5 bg-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src="/images/lawyers/lawyer-lee.svg"
              alt="이유림 대표변호사"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">이유림</h1>
          <p className="mt-3 text-lg text-gray-400">ROH&LEE 대표변호사</p>
          <p className="mt-4 text-base text-[#1B3B2F] font-medium">
            성범죄·스토킹·디지털성범죄 피해자 대리
          </p>
          <p className="mt-2 text-sm text-gray-500">
            베스트셀러 《피해자 감별사회》 공동저자
          </p>
          <div className="mt-8">
            <button
              onClick={() => openConsultation('성범죄 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors min-h-[48px]"
            >
              상담 예약
            </button>
          </div>
        </motion.div>
      </section>

      {/* Professional Identity */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-gray-700 text-[17px] leading-8 whitespace-pre-line">
              이유림 변호사는 법률사무소 ROH&LEE의 대표변호사로서 성폭력·스토킹·디지털성범죄 등 범죄피해자를 대리한다.

              고소 단계부터 피해자 조사, 경찰·검찰 수사, 형사재판, 합의 및 손해배상 등 피해 이후의 법적 절차에서 피해자 측을 대리한다.

              사건을 수행하며 피해 사실 자체보다 피해자의 표정, 말투, 사건 전후 행동 등이 평가되고 피해자가 자신이 &lsquo;진짜 피해자&rsquo;임을 설명해야 하는 현실에 문제의식을 가져왔다. 이러한 피해자다움과 강간 신화에 대한 문제의식은 노채은 변호사와 함께 쓴 베스트셀러 《피해자 감별사회》(박영사)로 이어졌다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-gray-500 text-sm leading-relaxed">
              이유림 변호사는 성범죄·스토킹·디지털성범죄 피해자 대리를 담당하며, 서로 다른 피해영역을 하나의 피해자 중심 법률서비스 체계로 연결하는 ROH&LEE의 종합 피해자 대리 모델을 함께 구성하고 있다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Practice Areas</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">주요 피해자 대리 영역</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRACTICE_AREAS.map((area, i) => (
              <ScrollReveal key={area} delay={i * 0.05}>
                <div className="px-5 py-4 bg-white border border-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">{area}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      {cases.length > 0 && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Cases</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">피해자 대리 사례</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 0.1}>
                  <Link href={`/cases/${c.slug || c.id}`} className="group block">
                    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 ${c.tag_color}`}>{c.tag}</span>
                          {c.representation_side === 'victim' && (
                            <span className="text-[10px] font-medium px-2 py-0.5 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded">피해자 대리</span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-black group-hover:text-[#1B3B2F] transition-colors mb-2">{c.title}</h3>
                        {c.procedure_stages && c.procedure_stages.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {c.procedure_stages.slice(0, 3).map(s => (
                              <span key={s} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{s}</span>
                            ))}
                          </div>
                        )}
                        <div className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 border ${c.badge_color}`}>
                          {c.badge}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-10">
                <Link href="/cases" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors">
                  피해자 대리 사례 전체 보기 &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Publication: 피해자 감별사회 */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Publication</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">저서</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 mt-10">
              <p className="text-xs text-[#1B3B2F] font-semibold mb-2">베스트셀러</p>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">《피해자 감별사회》</h3>
              <p className="text-sm text-gray-500 mb-6">이유림 · 노채은 공저 | 박영사</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                피해자 사건을 대리하는 과정에서 마주한 피해자다움, 강간 신화, 그리고 피해자가 수사와 재판 과정에서 자신의 피해를 끊임없이 설명하고 증명해야 하는 구조를 다룬 책이다.
              </p>
              <a
                href="https://product.kyobobook.co.kr/detail/S000220843163"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#1B3B2F] font-medium hover:underline"
              >
                교보문고에서 보기 &rarr;
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 mt-6">
              <h3 className="text-xl font-bold text-black mb-2">《바이브코딩 바이블》</h3>
              <p className="text-sm text-gray-500 mb-4">이유림 저</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI를 활용하여 비전공자도 자신의 아이디어를 실제 소프트웨어와 서비스로 구현하는 방법을 다룬 저작이다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LegalTech */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">LegalTech</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">법률과 기술</h2>
            <p className="text-center text-gray-500 text-sm mb-12">법률을 실무에서 끝내지 않고, 기술로 구현합니다.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-8 sm:p-10">
              <h3 className="text-xl font-bold text-black mb-2">《진심의 무게》</h3>
              <p className="text-sm text-gray-500 mb-4">이유림 변호사가 직접 개발한 피해자 지원 서비스</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                범죄피해자가 자신의 엄벌 의사를 보다 체계적으로 표현할 수 있도록 돕는 무료 엄벌탄원서 생성 애플리케이션이다. AI를 활용한 소프트웨어 개발 경험을 바탕으로 《바이브코딩 바이블》을 출간했다.
              </p>
              <Link
                href="/apps/sincerity"
                className="text-sm text-[#1B3B2F] font-medium hover:underline"
              >
                진심의 무게 바로가기 &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles */}
      {blogPosts.length > 0 && (
        <section className="py-20 sm:py-28" style={{ backgroundColor: '#f7faf9' }}>
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Insights</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">이유림 변호사의 글</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="group block p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-300 transition-colors">
                    <span className="text-xs text-[#1B3B2F] font-medium">{post.category}</span>
                    <h3 className="mt-1.5 text-sm font-medium text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-2">{post.title}</h3>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-8">
                <Link href="/blog" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors">
                  블로그 전체 보기 &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Career */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Career</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">주요 경력</h2>
          </ScrollReveal>

          <div className="space-y-10">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-xs tracking-widest text-gray-300 uppercase mb-3">현직</p>
                <div className="space-y-1.5">
                  {CAREER.current.map(item => (
                    <p key={item} className="text-sm text-gray-700">{item}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-xs tracking-widest text-gray-300 uppercase mb-3">이전 경력</p>
                <div className="space-y-1.5">
                  {CAREER.previous.map(item => (
                    <p key={item} className="text-sm text-gray-700">{item}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <p className="text-xs tracking-widest text-gray-300 uppercase mb-3">학력</p>
                <div className="space-y-1.5">
                  {CAREER.education.map(item => (
                    <p key={item} className="text-sm text-gray-700">{item}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Center */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-sm text-gray-500 mb-4">관련 전문센터</p>
            <Link
              href="/centers/sexual-crime"
              className="text-lg font-semibold text-[#1B3B2F] hover:underline"
            >
              성범죄 피해자 전문센터 &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">혼자 앓지 마세요.</h2>
            <p className="mt-4 text-gray-400 text-sm">이유림 변호사에게 직접 상담하세요.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => openConsultation('성범죄 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                무료 상담 신청
              </button>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors min-h-[48px]"
              >
                032-207-8788
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
