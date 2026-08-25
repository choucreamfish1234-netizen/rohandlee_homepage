'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import CenterCasesDB from '@/components/CenterCasesDB'
import Script from 'next/script'

const crimeTypes = [
  { emoji: '🏠', title: '부동산 강제경매', keywords: '부동산 강제경매 신청, 경매 배당, 임의경매', desc: '판결 후 상대방이 돈을 안 주면 부동산을 경매에 넣어 회수합니다. 경매 신청부터 배당까지 전 과정을 대리합니다.' },
  { emoji: '💳', title: '예금·급여 압류', keywords: '예금 압류 방법, 급여 압류 신청, 통장 압류', desc: '상대방의 은행 예금이나 급여를 압류하여 채권을 회수합니다. 재산조회로 계좌를 파악하고 즉시 압류를 진행합니다.' },
  { emoji: '🚗', title: '동산·차량 압류', keywords: '자동차 압류, 동산 압류, 유체동산 강제집행', desc: '자동차, 기계, 재고 등 동산을 압류·매각하여 채권을 회수합니다.' },
  { emoji: '🔒', title: '가압류 (소송 전 재산 보전)', keywords: '가압류 신청 방법, 가압류 비용, 부동산 가압류', desc: '소송 전에 상대방 재산을 동결시키는 보전처분입니다. 가압류를 안 하면 소송 중에 재산을 빼돌릴 수 있습니다. 부동산, 예금, 차량, 매출채권 등에 가압류가 가능합니다.' },
  { emoji: '⚡', title: '가처분 (접근금지·처분금지)', keywords: '접근금지 가처분, 처분금지 가처분, 임시지위 가처분', desc: '접근금지, 부동산 처분금지, 직위 보전 등 긴급한 권리 보호가 필요할 때. 스토킹 접근금지 가처분은 신체범죄센터와 동시 대응합니다.' },
  { emoji: '🔍', title: '재산조회·재산명시', keywords: '재산명시 신청, 재산조회 방법, 숨긴 재산 찾기', desc: '상대방이 재산을 숨기면 법원을 통한 재산조회·재산명시로 부동산, 금융자산, 자동차, 보험 등을 파악합니다. 재산명시에 불출석하면 감치(구금)가 가능합니다.' },
  { emoji: '📋', title: '채권추심', keywords: '채권추심 방법, 미수금 회수, 공사대금 추심', desc: '판결금, 합의금, 대여금, 공사대금, 물품대금 등 받지 못한 돈을 법적으로 추심합니다. 내용증명부터 강제집행까지 전 과정.' },
  { emoji: '🏦', title: '개인회생·파산 (채무자인 경우)', keywords: '개인회생 신청 방법, 파산 신청, 면책', desc: '피해로 인해 빚이 쌓인 경우, 개인회생이나 파산으로 재기할 수 있습니다. 채무 조정부터 면책까지 대리합니다.' },
]

const whyPoints = [
  { title: '판결 받았는데 돈을 안 줍니다? 강제로 받아냅니다', desc: '소송에서 이겨도 돈은 자동으로 안 옵니다. 가압류 → 재산조회 → 강제집행 → 배당까지 한 팀이 끝까지 추적합니다.', centers: [] },
  { title: '사기 고소와 재산 회수를 동시에', desc: '재산범죄센터에서 사기 형사 고소로 가해자를 압박하고, 재산회복센터에서 동시에 가압류와 강제집행을 진행합니다. 형사 압박이 들어가면 돈이 나옵니다.', centers: [{ name: '재산범죄센터', path: '/centers/property-crime' }] },
  { title: '숨긴 재산, 추적합니다', desc: '가해자가 가족에게 명의를 옮기고, 계좌를 비우고, 부동산을 처분해도 법원 재산조회와 데이터 분석으로 추적합니다. 사해행위 취소소송으로 빼돌린 재산을 원상복구시킵니다.', centers: [] },
]

const faqs = [
  { q: '판결 받았는데 상대방이 돈을 안 주면 어떻게 하나요?', a: '강제집행을 신청합니다. 상대방의 부동산, 예금, 급여, 차량 등을 압류하여 강제로 회수합니다. 재산이 어디 있는지 모르면 법원에 재산조회를 신청합니다.' },
  { q: '가압류는 언제 해야 하나요?', a: '소송 전에 해야 합니다. 소송 중에 상대방이 재산을 빼돌리면 이겨도 받을 수 없습니다. 가압류로 먼저 재산을 동결시키고 소송을 진행하는 것이 정석입니다.' },
  { q: '가압류 비용은 얼마인가요?', a: '법원에 납부하는 담보금(청구 금액의 10~30%)과 변호사 비용이 듭니다. 담보금은 본안 소송 승소 후 돌려받습니다.' },
  { q: '상대방이 재산을 숨기면 어떻게 찾나요?', a: '법원을 통한 재산조회로 부동산, 금융자산, 자동차, 보험 등을 조회할 수 있습니다. 재산명시 신청으로 상대방을 법원에 출석시켜 재산을 신고하게 할 수도 있습니다. 불출석하면 감치(구금)됩니다.' },
  { q: '급여를 압류할 수 있나요?', a: '가능합니다. 다만 급여 전액을 압류할 수는 없고, 월 급여 중 일정 금액을 초과하는 부분만 압류됩니다. 최저 생계비는 보호됩니다.' },
  { q: '가해자가 재산을 가족에게 옮겼으면 어떻게 하나요?', a: '사해행위 취소소송을 제기하면 빼돌린 재산을 원상복구시킬 수 있습니다. 채무를 면탈하기 위해 재산을 이전한 경우 강제집행면탈죄(형법 제327조)로 형사 고소도 가능합니다.' },
  { q: '전국에서 상담받을 수 있나요?', a: '네, 전화·화상·온라인 상담이 가능합니다. 강제집행은 재산 소재지 관할이지만, 로앤이는 전국 어디든 대응합니다.' },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 재산회복 전담센터',
  description: '가압류·가처분·강제집행·압류추심·재산조회·재산명시·부동산경매·채권추심. 판결 받고 못 받는 돈을 강제로 회수하는 피해자 전문 로펌.',
  url: 'https://lawfirmrohandlee.com/centers/asset-recovery',
  telephone: '032-207-8788',
  areaServed: { '@type': 'Country', name: 'KR' },
  serviceType: ['가압류', '가처분', '강제집행', '압류추심', '재산조회', '재산명시', '부동산 강제경매', '채권추심', '개인회생', '개인파산'],
  provider: { '@type': 'LegalService', name: '법률사무소 로앤이', url: 'https://lawfirmrohandlee.com' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium text-black pr-4">{q}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function AssetRecoveryPage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script id="asset-recovery-ls" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />
      <Script id="asset-recovery-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 히어로 */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3B2F]/5 border border-[#1B3B2F]/10 mb-6">
            <span className="text-[10px] font-semibold tracking-wider text-[#1B3B2F] uppercase">최초의 종합 피해자 중심 로펌</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            재산회복 전담센터
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            판결에서 이겼는데 돈을 안 줍니다.
            <br />
            합의했는데 약속을 안 지킵니다.
            <br />
            로앤이는 숨긴 재산을 찾아내고, 강제로 회수합니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span>가압류·가처분·강제집행·압류추심</span>
            <span className="text-gray-300">|</span>
            <span>재산 추적 + 강제 회수</span>
            <span className="text-gray-300">|</span>
            <span>노채은·이유림 변호사</span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openConsultation('재산회복 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              상담 신청하기
            </button>
            <a
              href="tel:032-207-8788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1B3B2F]/20 text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-[#1B3B2F]/5 transition-colors min-h-[48px]"
            >
              032-207-8788
            </a>
          </div>
        </motion.div>
      </section>

      {/* 설립 배경 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                승소했는데 돈을 못 받고 있습니다. 판결문을 받았지만 상대방은 재산을 숨기고 연락을 끊습니다.
                소송에서 이기는 것은 절반일 뿐, 실제로 돈을 회수하는 것이 진짜 승리입니다.
              </p>
              <p className="font-semibold text-black">
                법률사무소 로앤이 재산회복 전담센터는 판결을 받아내는 것에서 끝나지 않습니다.
                상대방의 재산을 추적하고, 압류하고, 추심하여 실제로 돈을 받아내는 것까지가 저희의 일입니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 유형별 카드 8개 */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Coverage</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">이런 업무를 다룹니다</h2>
            <p className="text-center text-sm text-gray-500 mb-12">가압류부터 강제경매까지, 판결을 돈으로 바꾸는 모든 절차.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crimeTypes.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="bg-white border border-gray-100 rounded-xl p-5 h-full hover:border-[#1B3B2F]/20 transition-colors">
                  <span className="text-2xl mb-3 block">{item.emoji}</span>
                  <h3 className="text-sm font-bold text-black mb-1">{item.title}</h3>
                  <p className="text-[10px] text-[#1B3B2F]/60 mb-2">{item.keywords}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 차별점 */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">재산 회수, 왜 로앤이인가요?</h2>
            <p className="text-center text-sm text-gray-500 mb-12">판결만 받아주는 곳이 많습니다. 로앤이는 돈까지 받아냅니다.</p>
          </ScrollReveal>
          <div className="space-y-5">
            {whyPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-bold text-black mb-3">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  {p.centers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full">재산회복센터</span>
                      {p.centers.map(c => (
                        <Link key={c.name} href={c.path} className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">{c.name} &rarr;</Link>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 성공사례 (DB) */}
      <CenterCasesDB centerSlug="asset-recovery" title="재산회복 성공사례" />

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">자주 묻는 질문</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>{faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">판결문만 가지고 계신가요?</h2>
            <p className="mt-6 text-sm sm:text-base text-white/80 leading-relaxed">
              이긴 소송인데 돈을 못 받고 계신가요?
              <br />
              로앤이 재산회복센터가 판결을 실제 돈으로 바꿔드리겠습니다.
            </p>
            <div className="mt-8">
              <button
                onClick={() => openConsultation('재산회복 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <p className="sr-only">법률사무소 로앤이 재산회복 전담센터는 가압류, 가처분, 강제집행, 예금 압류, 급여 압류, 부동산 경매, 채권추심, 재산조회, 재산명시를 수행하며, 최초의 종합 피해자 중심 로펌으로서 사기 형사 고소와 재산 강제 회수를 동시에 진행한다.</p>
    </>
  )
}
