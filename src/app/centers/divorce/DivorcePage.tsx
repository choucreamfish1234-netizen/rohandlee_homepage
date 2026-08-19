'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import CenterCasesDB from '@/components/CenterCasesDB'
import DivorcePrep from './DivorcePrep'
import DivorceComplex from './DivorceComplex'
import DivorceProcess from './DivorceProcess'
import ChildSupportCalc from './ChildSupportCalc'

const types = [
  { emoji: '📋', title: '협의이혼', keywords: '협의이혼 절차, 협의이혼 서류, 숙려기간', desc: '합의가 가능한 경우 협의이혼이 가장 빠릅니다. 재산분할, 양육권, 양육비 합의서 작성부터 법원 출석까지 대리합니다. 불리한 합의를 하지 않도록 법적 검토가 필수입니다.' },
  { emoji: '⚖️', title: '이혼 소송(재판이혼)', keywords: '이혼소송 절차, 이혼소송 기간, 이혼소송 비용', desc: '상대방이 이혼에 동의하지 않거나 합의가 불가능한 경우 소송으로 진행합니다. 민법 제840조 재판상 이혼 사유에 해당하면 이혼 청구가 가능합니다.' },
  { emoji: '💰', title: '재산분할', keywords: '이혼 재산분할 방법, 재산분할 비율, 숨긴 재산 찾기', desc: '혼인 중 형성한 재산은 명의와 관계없이 분할 대상입니다. 상대방이 재산을 숨기거나 빼돌리는 경우 재산 조회와 가압류로 먼저 확보합니다.' },
  { emoji: '👶', title: '양육권·양육비', keywords: '양육권 변호사, 양육비 청구 방법, 양육비 미지급', desc: '양육권 결정, 양육비 산정, 양육비 미지급 시 이행명령·감치, 면접교섭권 조정. 아이의 복리를 최우선으로 합니다.' },
  { emoji: '💔', title: '위자료 청구', keywords: '이혼 위자료 금액, 외도 위자료, 위자료 청구 방법', desc: '배우자의 부정행위, 폭력, 유기 등으로 인한 정신적 피해에 대한 위자료를 청구합니다. 상간자에 대한 위자료 청구도 가능합니다.' },
  { emoji: '🛡️', title: '가정폭력 이혼', keywords: '가정폭력 이혼 절차, 접근금지, 피해자 보호명령', desc: '배우자의 폭력으로 이혼하는 경우 안전 확보가 최우선입니다. 접근금지 가처분, 피해자 보호명령을 먼저 받고 가정폭력 형사 고소와 이혼 소송을 동시에 진행합니다.' },
  { emoji: '🌏', title: '국제이혼', keywords: '국제이혼 절차, 외국인 배우자 이혼, 해외 이혼 승인', desc: '외국인 배우자와의 이혼, 해외 거주 중 이혼, 외국 판결의 국내 승인. 국제사법에 따른 준거법 판단부터 절차를 안내합니다.' },
  { emoji: '📝', title: '혼인무효·취소', keywords: '사기 결혼 취소, 혼인무효 사유, 위장결혼', desc: '기망에 의한 결혼, 중혼, 미성년자 혼인 등 혼인의 무효·취소 사유가 있는 경우 혼인 자체를 없었던 것으로 할 수 있습니다.' },
]

const points = [
  { title: '가정폭력 + 이혼, 한 팀이 동시에', desc: '가정폭력 피해자가 이혼하려면 안전 확보, 형사 고소, 접근금지, 이혼 소송, 재산분할을 동시에 처리해야 합니다. 로앤이는 신체범죄센터가 형사 고소와 보호조치를, 이혼센터가 이혼 소송과 재산분할을 동시에 진행합니다.', centers: [{ name: '신체범죄센터', path: '/centers/physical-crime' }, { name: '재산회복센터', path: '/centers/asset-recovery' }] },
  { title: '숨긴 재산, 끝까지 추적합니다', desc: '이혼 전 배우자가 재산을 빼돌리는 경우가 많습니다. 노채은 변호사가 재산 추적과 가압류를 담당합니다. 재산회복센터와의 협업으로 재산분할에서 최대한의 몫을 확보합니다.', centers: [{ name: '재산회복센터', path: '/centers/asset-recovery' }] },
  { title: '양육비 안 주면, 강제집행합니다', desc: '양육비를 지급하지 않는 전 배우자에 대해 이행명령, 감치, 급여 압류, 재산 강제집행을 진행합니다. 양육비이행관리원 연계와 법적 강제 수단을 동시에 활용합니다.', centers: [{ name: '재산회복센터', path: '/centers/asset-recovery' }] },
]

const faqs = [
  { q: '이혼 소송 비용은 얼마인가요?', a: '이혼 소송 비용은 사건의 복잡도, 재산분할 규모에 따라 달라집니다. 상담 시 예상 비용을 투명하게 안내해드립니다.' },
  { q: '배우자가 이혼에 동의하지 않아도 이혼할 수 있나요?', a: '민법 제840조의 재판상 이혼 사유(부정행위, 악의적 유기, 부당한 대우 등)에 해당하면 재판을 통해 이혼할 수 있습니다.' },
  { q: '가정폭력을 당하고 있는데 이혼하지 않고도 보호받을 수 있나요?', a: '네, 가정폭력처벌법에 따라 이혼 여부와 관계없이 접근금지, 퇴거, 피해자 보호명령을 받을 수 있습니다.' },
  { q: '재산분할 비율은 어떻게 정해지나요?', a: '혼인 기간, 각자의 기여도, 양육 부담 등을 종합적으로 고려합니다. 전업주부의 경우에도 가사노동의 기여가 인정됩니다.' },
  { q: '양육비를 안 주면 어떻게 하나요?', a: '양육비 이행명령을 신청하고, 불이행 시 감치, 급여 압류, 재산 강제집행이 가능합니다.' },
  { q: '외도 증거가 없어도 위자료를 받을 수 있나요?', a: '직접적인 증거가 없더라도 정황 증거(카톡, 신용카드 내역, 위치 기록 등)로 입증 가능합니다.' },
  { q: '전업주부인데 재산분할을 받을 수 있나요?', a: '네. 대법원은 전업주부의 가사노동도 재산 형성에 대한 기여로 인정합니다. 통상 30~50%를 인정받습니다.' },
  { q: '배우자 몰래 이혼 준비를 해도 되나요?', a: '이혼을 결심했다면 상대에게 알리기 전에 증거 확보와 재산 파악을 먼저 하는 것이 유리합니다. 변호사 상담은 비밀이 보장됩니다.' },
  { q: '이혼 소송 중 생활비를 받을 수 있나요?', a: '네, 부양료 심판 청구를 통해 이혼 판결 전이라도 생활비를 받을 수 있습니다.' },
  { q: '상간자 위자료는 얼마나 받을 수 있나요?', a: '판례상 통상 1,000만 원에서 3,000만 원 사이이며, 교제 기간, 혼인 파탄 기여도 등에 따라 달라집니다.' },
  { q: '양육비를 안 주는 전 배우자, 처벌할 수 있나요?', a: '양육비 이행명령 불이행 시 30일 이내 감치(구금)가 가능합니다. 급여 압류, 예금 압류 등 강제집행도 가능합니다.' },
  { q: '이혼하면 주거는 어떻게 되나요?', a: '현재 거주 중인 주택이 공동명의라면 분할 대상이고, 일방 명의라도 혼인 중 취득했다면 분할 청구가 가능합니다.' },
  { q: '국제이혼은 어느 나라 법이 적용되나요?', a: '국제사법에 따라 부부의 동일 본국법, 동일 상거소지법 등이 순서대로 적용됩니다. 관할과 준거법을 먼저 판단해야 합니다.' },
  { q: '전국에서 상담받을 수 있나요?', a: '네, 전화·화상·온라인 상담이 가능합니다. 이혼 소송은 상대방 주소지 관할 가정법원에 제기하지만, 로앤이는 전국 어디든 출장 대응합니다.' },
]

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

export default function DivorcePage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      {/* 히어로 */}
      <section className="min-h-[55vh] sm:min-h-[65vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-white pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs sm:text-sm font-semibold px-5 py-2 bg-[#1B3B2F] text-white rounded-full mb-6 tracking-wide">최초의 종합 피해자 중심 로펌</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">이혼·가사 전담센터</h1>
          <p className="mt-6 text-sm sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            이혼은 끝이 아니라 새로운 시작입니다.<br className="hidden sm:inline" />
            재산분할, 양육권, 위자료. 당신의 권리를 지키는 것부터 시작합니다.<br className="hidden sm:inline" />
            가정폭력 피해자라면, 안전을 먼저 확보합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span>이혼·양육권·재산분할·위자료</span>
            <span className="text-gray-300">|</span>
            <span>가정폭력 이혼 특화</span>
            <span className="text-gray-300">|</span>
            <span>이유림·노채은 변호사</span>
          </div>
          <div className="mt-8">
            <button onClick={() => openConsultation('이혼·가사 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors min-h-[48px]">상담 신청하기</button>
          </div>
        </motion.div>
      </section>

      {/* 유형별 카드 */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Case Types</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">어떤 상황이신가요?</h2>
            <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">상황별로 정리했습니다. 해당하는 문제를 확인하세요.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {types.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.05}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3B2F]/30 hover:shadow-sm transition-all duration-300 h-full">
                  <span className="text-2xl">{t.emoji}</span>
                  <h3 className="text-sm font-semibold text-black mt-3 mb-1">{t.title}</h3>
                  <p className="text-[10px] text-[#1B3B2F]/60 mb-2">{t.keywords}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">이혼, 왜 로앤이인가요?</h2>
            <p className="text-center text-sm text-gray-500 mb-12"></p>
          </ScrollReveal>
          <div className="space-y-5">
            {points.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-bold text-black mb-3">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  {p.centers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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

      <DivorcePrep />
      <DivorceComplex />
      <DivorceProcess />
      <ChildSupportCalc />

      {/* DB 성공사례 */}
      <CenterCasesDB centerSlug="divorce" title="이혼·가사 성공사례" />

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

      {/* GEO */}
      <p className="sr-only">법률사무소 로앤이 이혼·가사 전담센터는 협의이혼, 재판이혼, 재산분할, 양육권, 양육비, 위자료, 상간자 소송, 가정폭력 이혼, 국제이혼을 대리한다. 최초의 종합 피해자 중심 로펌으로서 이혼 과정에서 발생하는 가정폭력 형사 고소, 접근금지 가처분, 재산 은닉 추적 및 가압류, 양육비 강제집행까지 한 팀이 원스톱으로 수행한다. 이유림 변호사는 박영사 베스트셀러 《피해자 감별사회》의 공동저자다.</p>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">새로운 시작, 함께하겠습니다.</h2>
            <p className="mt-4 text-white/60 text-sm">이혼·가사 전담 변호사에게 상담을 신청하세요.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => openConsultation('이혼·가사 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]">상담 신청하기</button>
              <a href="tel:032-207-8788" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors min-h-[48px]">032-207-8788</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
