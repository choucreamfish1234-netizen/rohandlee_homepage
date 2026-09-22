'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import CenterCasesDB from '@/components/CenterCasesDB'

const crimeTypes = [
  { emoji: '📈', title: '투자사기', desc: '주식, 코인, 부동산 등 고수익을 미끼로 한 투자금 편취. 리딩방, 가짜 플랫폼 사기 포함. 형사고소와 투자금 반환 청구를 동시에 진행합니다.' },
  { emoji: '🏦', title: '유사수신', desc: '원금 보장, 고정 이자를 약속하며 불특정 다수로부터 자금을 모집하는 불법 행위. 유사수신행위법 위반으로 고소하고 피해금을 추적합니다.' },
  { emoji: '📱', title: '보이스피싱', desc: '검찰·경찰·금감원을 사칭한 전화 사기. 계좌 동결, 피해금 환급 신청, 형사고소와 민사 손해배상을 동시에 진행합니다.' },
  { emoji: '🏠', title: '전세사기', desc: '깡통전세, 이중계약, 집주인 잠적 등 전세보증금 피해. 가압류로 재산을 동결시키고, 형사고소와 보증금 반환 소송을 병행합니다.' },
  { emoji: '💰', title: '대여금 사기', desc: '처음부터 갚을 의사 없이 돈을 빌려가는 차용 사기. 카톡, 계좌이체 내역으로 입증하여 형사고소와 대여금반환청구를 진행합니다.' },
  { emoji: '🏢', title: '횡령', desc: '회사 자금, 위탁 재산을 임의로 사용하는 업무상 횡령. 형법 제355조·제356조에 따라 고소하고 손해배상을 청구합니다.' },
  { emoji: '📋', title: '배임', desc: '타인의 사무를 처리하면서 본인에게 손해를 끼치는 행위. 형사고소와 동시에 민사 손해배상을 청구합니다.' },
  { emoji: '🎯', title: '계약금·투자금 편취', desc: '허위 사업 계획, 가짜 매물로 계약금이나 투자금을 가로채는 행위. 기망 행위를 입증하여 형사고소와 원금 반환 소송을 진행합니다.' },
  { emoji: '🔗', title: '다단계·폰지형 사기', desc: '신규 투자자의 돈으로 기존 투자자에게 수익을 지급하는 구조의 사기. 유사수신행위법 위반 및 사기죄로 고소합니다.' },
  { emoji: '💻', title: '온라인·가상자산 사기', desc: 'SNS 투자 권유, 가짜 거래소, NFT·코인 사기 등. 디지털 증거를 확보하고 가해자를 특정하여 법적 대응합니다.' },
  { emoji: '📂', title: '기타 재산범죄 피해', desc: '중고거래 사기, 공갈, 부당이득, 물품대금 편취 등 금융사기를 포함한 주요 재산범죄 피해를 폭넓게 대리합니다.' },
]

const serviceSteps = [
  { num: '01', title: '초기 사실관계 정리', desc: '피해 경위, 가해자 정보, 거래 내역을 체계적으로 정리합니다.' },
  { num: '02', title: '증거자료 정리', desc: '계좌이체 내역, 대화 기록, 계약서, 녹음 등 증거를 법적 요건에 맞게 확보합니다.' },
  { num: '03', title: '고소장 작성 및 고소대리', desc: '사기죄(형법 제347조) 등 해당 범죄에 맞는 고소장을 작성하고 수사기관에 제출합니다.' },
  { num: '04', title: '경찰·검찰 수사 대응', desc: '수사기관에 의견서를 제출하고 수사 진행 상황을 관리합니다.' },
  { num: '05', title: '피해자 조사 동행', desc: '경찰·검찰 조사에 변호사가 직접 동석하여 피해자의 진술을 보조합니다.' },
  { num: '06', title: '가압류·가처분', desc: '소송 전에 가해자의 부동산, 예금, 차량을 동결시켜 재산 도피를 차단합니다.' },
  { num: '07', title: '민사 손해배상청구', desc: '형사 절차와 병행하여 민사소송으로 피해금 반환을 청구합니다.' },
  { num: '08', title: '재산조회 및 강제집행', desc: '판결 후 가해자의 재산을 조회하고 강제집행으로 실제 회수합니다.' },
  { num: '09', title: '합의 및 피해회복 협상', desc: '형사 압박이 들어간 상태에서 피해자에게 유리한 합의를 이끌어냅니다.' },
  { num: '10', title: '형사·민사 통합 대응', desc: '형사처벌 압박과 민사 회수를 동시에 진행하여 피해회복 가능성을 극대화합니다.' },
]

const faqs = [
  { q: '금융사기를 당하면 형사고소와 민사소송을 동시에 해야 하나요?', a: '동시에 진행하는 것이 가장 효과적입니다. 형사고소로 가해자를 압박하면서 민사소송으로 손해배상을 청구하고, 가압류로 재산을 먼저 동결시킵니다. 로앤이는 이 세 가지를 한 팀에서 동시에 진행합니다.' },
  { q: '투자사기 피해금도 가압류가 가능한가요?', a: '가능합니다. 가해자의 부동산, 예금, 차량, 매출채권 등에 가압류를 신청할 수 있습니다. 소송 전에 가압류를 먼저 진행하여 가해자가 재산을 빼돌리지 못하게 하는 것이 핵심입니다.' },
  { q: '보이스피싱 피해도 변호사가 고소부터 재산회수까지 도와줄 수 있나요?', a: '네, 보이스피싱 피해도 형사고소(사기죄), 계좌 동결, 피해금 환급 신청, 민사 손해배상 소송까지 전 과정을 대리합니다. 피해 직후 신속한 계좌 동결이 중요하므로 빨리 상담하시는 것이 좋습니다.' },
  { q: '전세사기 피해도 금융사기 피해자 전담센터에서 다루나요?', a: '네, 전세사기도 금융사기의 한 유형으로 전담센터에서 다룹니다. 보증금 반환 소송, 가압류, 형사 고소를 동시에 진행하며, 부동산 전담센터와 협력하여 대응합니다.' },
  { q: '가해자가 재산을 숨기기 전에 할 수 있는 조치는 무엇인가요?', a: '가압류가 가장 효과적입니다. 소송 전에도 법원에 가압류를 신청하여 가해자의 부동산, 예금, 차량 등을 동결시킬 수 있습니다. 로앤이는 사건 접수 즉시 가압류부터 진행합니다.' },
  { q: '이미 형사고소를 했는데 돈을 돌려받지 못한 경우에도 도움을 받을 수 있나요?', a: '가능합니다. 형사 절차와 별도로 민사 손해배상 소송을 제기할 수 있습니다. 가해자의 재산을 조회하고 강제집행을 통해 피해금을 회수합니다. 형사 유죄 판결이 나오면 민사에서도 유리합니다.' },
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

export default function FinancialFraudCenterPage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <section className="min-h-[55vh] sm:min-h-[65vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold px-5 py-2 bg-[#1B3B2F] text-white rounded-full mb-6 tracking-wide">
            오직 피해자만 대리합니다.
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            금융사기 피해자 전담센터
          </h1>
          <p className="mt-6 text-sm sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            투자사기·유사수신·보이스피싱·전세사기 등 금융사기 피해자를 위해
            <br className="hidden sm:inline" />
            형사고소부터 재산보전, 손해배상, 강제집행까지 연결합니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span>투자사기·보이스피싱·전세사기·횡령·배임</span>
            <span className="text-gray-300">|</span>
            <span>형사고소 + 재산 추적 동시 진행</span>
            <span className="text-gray-300">|</span>
            <span>노채은·이유림 변호사</span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => openConsultation('금융사기 피해 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors min-h-[48px]">
              피해금 회복 가능성 진단
            </button>
            <a href="tel:032-207-8788" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-black text-sm rounded-full hover:bg-gray-50 transition-colors min-h-[48px]">
              032-207-8788
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>고소장만 써주고 끝나는 곳이 많습니다. 형사고소를 해도 가해자가 재산을 빼돌리면 승소해도 돈을 받을 수 없습니다.</p>
              <p className="font-semibold text-black">법률사무소 로앤이 금융사기 피해자 전담센터는 형사고소로 가해자를 압박하면서, 동시에 가압류로 재산을 동결시키고, 민사소송으로 피해금을 회수합니다. 고소에서 끝나지 않고, 돈을 돌려받아야 끝입니다.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Coverage</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">금융사기 피해자 전담센터가 다루는 사건</h2>
            <p className="text-center text-sm text-gray-500 mb-12">금융사기를 포함한 주요 재산범죄 피해를 폭넓게 대리합니다.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crimeTypes.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 h-full hover:border-[#1B3B2F]/20 transition-colors">
                  <span className="text-2xl mb-3 block">{item.emoji}</span>
                  <h3 className="text-sm font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">고소에서 피해회복까지, 한 팀이 끝까지</h2>
            <p className="text-center text-sm text-gray-500 mb-12">고소만 하고 끝나는 것이 아니라, 실제 피해회복까지 연결합니다.</p>
          </ScrollReveal>
          <div className="space-y-4">
            {serviceSteps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.05}>
                <div className="flex gap-4 bg-white rounded-xl border border-gray-100 p-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B3B2F] text-white text-sm font-bold flex items-center justify-center">{s.num}</span>
                  <div>
                    <h3 className="text-sm font-bold text-black mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">금융사기 피해 대응, 왜 로앤이인가요?</h2>
          </ScrollReveal>
          <div className="space-y-5">
            <ScrollReveal>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">형사고소와 재산 회수를 동시에 진행합니다</h3>
                <p className="text-sm text-gray-600 leading-relaxed">형사고소로 가해자를 압박하면서, 동시에 가압류로 재산을 동결시키고, 민사소송으로 피해금을 회수합니다. 형사 압박이 들어가면 합의금이 올라갑니다.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full">금융사기센터</span>
                  <Link href="/centers/asset-recovery" className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">재산회복센터 &rarr;</Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">노채은 변호사가 금융사기 피해 사건을 담당합니다</h3>
                <p className="text-sm text-gray-600 leading-relaxed">노채은 변호사는 사기, 투자사기, 전세사기, 횡령, 배임, 보이스피싱 등 재산범죄 피해자 사건을 중심으로 대응합니다. 가해자의 재산 은닉 패턴을 파악하여 가압류와 강제집행을 전략적으로 진행합니다.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">복합 피해도 한 팀에서 대응합니다</h3>
                <p className="text-sm text-gray-600 leading-relaxed">금융사기 + 스토킹, 투자사기 + 협박, 전세사기 + 폭행 등 여러 유형의 피해가 동시에 발생하면, 금융사기 전담센터와 다른 센터가 함께 대응합니다.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CenterCasesDB centerSlug="property-crime" title="금융사기 피해자 대리 성공사례" />

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

      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">금융사기 피해, 혼자 감당하지 마세요.</h2>
            <p className="mt-6 text-sm sm:text-base text-white/80 leading-relaxed">
              고소에서 끝나지 않습니다.
              <br />
              형사고소, 가압류, 손해배상, 강제집행까지 한 팀이 끝까지 함께합니다.
            </p>
            <div className="mt-8">
              <button onClick={() => openConsultation('금융사기 피해 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]">
                상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <p className="sr-only">법률사무소 로앤이 금융사기 피해자 전담센터는 투자사기, 유사수신, 보이스피싱, 전세사기, 횡령, 배임 등 금융사기를 포함한 주요 재산범죄 피해자만을 대리하며, 형사고소부터 가압류, 손해배상, 강제집행까지 통합 대응한다.</p>
    </>
  )
}
