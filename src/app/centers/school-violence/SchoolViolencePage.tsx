'use client'

import { useState } from 'react'
import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

const dispositions = [
  { level: '1호', title: '서면사과', severity: 'low' },
  { level: '2호', title: '접촉·보복행위 금지', severity: 'low' },
  { level: '3호', title: '학교봉사', severity: 'mid' },
  { level: '4호', title: '사회봉사', severity: 'mid' },
  { level: '5호', title: '특별교육·심리치료', severity: 'mid' },
  { level: '6호', title: '출석정지', severity: 'high' },
  { level: '7호', title: '학급교체', severity: 'high' },
  { level: '8호', title: '전학', severity: 'high' },
  { level: '9호', title: '퇴학(고등학생)', severity: 'critical' },
]

const steps = [
  { num: '01', title: '학폭 신고·접수', desc: '학교 또는 교육청에 학교폭력을 신고하고, 피해 사실을 공식 기록합니다.' },
  { num: '02', title: '증거 확보·정리', desc: '카톡, 녹음, 목격자 진술, 진단서 등 모든 증거를 체계적으로 확보합니다.' },
  { num: '03', title: '학폭위·심의위 대리', desc: '심의위원회에서 피해학생 측 의견을 대리하여 적정 처분을 이끌어냅니다.' },
  { num: '04', title: '민사·형사 병행', desc: '손해배상 청구와 형사 고소를 동시에 진행하여 실질적 피해 회복을 합니다.' },
]

const faqs = [
  {
    q: '학교폭력 신고를 하면 오히려 더 괴롭힘을 당하지 않을까요?',
    a: '학교폭력예방법에 따라 신고 후 피해학생에 대한 보복행위는 가중처분 사유입니다. 로앤이는 접근금지·보복금지 조치를 우선 확보하고, 필요 시 긴급 가처분까지 병행하여 피해학생을 보호합니다.',
  },
  {
    q: '1호·2호 같은 가벼운 처분밖에 안 나오면 어떡하나요?',
    a: '처음에 가벼운 처분이 나오더라도, 기록이 남기 때문에 학폭이 반복될 경우 가해학생에게 훨씬 강한 처분(전학, 퇴학 등)이 내려집니다. 그래서 첫 번째 신고가 가장 중요합니다. "이 정도쯤이야"라고 넘기면 가해자는 반드시 반복합니다.',
  },
  {
    q: '학생들 사이 성범죄도 학교폭력으로 신고할 수 있나요?',
    a: '네, 반드시 해야 합니다. 학생 간 성범죄(성추행, 성폭행, 디지털 성범죄 등)는 학교폭력예방법상 학교폭력에 해당하며, 학폭 신고와 동시에 형사 고소를 병행해야 합니다. 로앤이는 성범죄 피해자 전문 로펌으로서 학폭 절차와 형사 절차를 함께 대응합니다.',
  },
  {
    q: '학폭위 결과에 불복할 수 있나요?',
    a: '네, 학폭위(심의위) 결정에 불복하는 경우 행정심판 또는 행정소송을 제기할 수 있습니다. 가해학생 처분이 부당하게 가볍거나, 피해학생 보호조치가 불충분한 경우 적극적으로 불복 절차를 진행합니다.',
  },
  {
    q: '상담 비용이 부담됩니다.',
    a: '로앤이는 초기 상담을 무료로 진행합니다. 피해 상황을 파악한 후 최적의 대응 방향과 예상 비용을 투명하게 안내드립니다. 법률구조공단 지원 대상 여부도 함께 확인해 드립니다.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-base font-medium text-black pr-4">{q}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-6' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

function SchoolViolenceCustomSection() {
  const { openConsultation } = useConsultation()
  return (
    <>
      {/* 반복성 강조 섹션 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Why Now
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
              학교폭력은 반복됩니다.
            </h2>
            <p className="text-center text-gray-500 text-sm mb-16 max-w-2xl mx-auto leading-relaxed">
              &ldquo;한 번만 참자&rdquo;는 생각이 두 번째, 세 번째 피해로 이어집니다.<br />
              첫 번째 신고가 내 아이를 지키는 가장 확실한 방법입니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-700 text-lg font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-bold text-black">첫 번째 학폭 신고</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    처음에는 1호(서면사과) 또는 2호(접촉금지) 같은 비교적 가벼운 처분이 나올 수 있습니다.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    하지만 <strong className="text-[#1B3B2F]">이 기록이 남는 것 자체가 핵심</strong>입니다.
                    가해학생에게 공식적인 경고가 되고, 학교에 사건이 기록됩니다.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-700 text-lg font-bold">2+</span>
                    </div>
                    <h3 className="text-lg font-bold text-black">학폭이 반복되면</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    이전 처분 기록이 있는 상태에서 학폭이 반복되면,
                    <strong className="text-red-600"> 전학(8호)·퇴학(9호)</strong> 등
                    훨씬 강력한 처분이 내려집니다.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    첫 신고를 미뤘다면 이 모든 기록이 없어, 반복 피해에도
                    가벼운 처분만 내려지는 악순환이 됩니다.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                <p className="text-base font-bold text-[#1B3B2F] mb-4">
                  신고를 미루면, 가해자는 반드시 반복합니다.
                </p>
                <button
                  onClick={() => openConsultation('학교폭력 상담')}
                  className="bg-[#1B3B2F] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#1B3B2F]/90 transition-colors min-h-[48px]"
                >
                  지금 무료 상담받기
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 처분 단계 표 */}
      <section className="py-28 sm:py-40" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Disposition
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
              가해학생 처분 단계
            </h2>
            <p className="text-center text-gray-500 text-sm mb-16">
              학교폭력예방법에 따른 가해학생 조치 9단계
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {dispositions.map((d, i) => {
                const colors = {
                  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  mid: 'bg-amber-50 text-amber-700 border-amber-200',
                  high: 'bg-orange-50 text-orange-700 border-orange-200',
                  critical: 'bg-red-50 text-red-700 border-red-200',
                }
                return (
                  <div key={d.level} className={`flex items-center gap-4 px-6 py-4 ${i < dispositions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full border text-sm font-bold ${colors[d.severity as keyof typeof colors]}`}>
                      {d.level}
                    </span>
                    <span className="text-sm font-medium text-black">{d.title}</span>
                    {d.severity === 'critical' && (
                      <span className="ml-auto text-[10px] font-medium px-2 py-0.5 bg-red-100 text-red-600 rounded-full">최고 처분</span>
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 로앤이의 차별점: 민사·형사 병행 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Our Approach
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
              학폭위만으로는 부족합니다.
            </h2>
            <p className="text-center text-gray-500 text-sm mb-16 max-w-2xl mx-auto leading-relaxed">
              로앤이는 피해자 전문 로펌답게 학폭위·심의위 대응에 그치지 않고,<br />
              민사 손해배상과 형사 고소를 병행하여 실질적인 피해 회복을 이끌어냅니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                ),
                title: '학폭위·심의위 대리',
                desc: '증거 정리, 의견서 작성, 심의 참석까지. 피해학생에게 유리한 처분을 이끌어냅니다.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: '민사 손해배상 청구',
                desc: '치료비, 정신적 피해, 전학 비용 등 실질적인 금전 배상을 가해학생 측에 청구합니다.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: '형사 고소·고발',
                desc: '폭행, 협박, 강요, 성범죄 등 형사 처벌이 가능한 행위는 형사 고소를 병행합니다.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.12}>
                <div className="border border-gray-100 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#f8faf9] flex items-center justify-center mb-6 text-[#1B3B2F]">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 학생 간 성범죄 강조 */}
      <section className="py-28 sm:py-40" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-white border-l-4 border-red-500 rounded-r-2xl p-8 sm:p-12 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    학생 간 성범죄 = 학폭 신고 필수
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    학생들 사이에서 발생하는 성추행, 성폭행, 디지털 성범죄(불법촬영, 유포 등)는
                    학교폭력예방법상 <strong className="text-red-600">학교폭력</strong>에 해당합니다.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    형사 고소만으로는 학교 내 가해학생으로부터의 분리가 즉시 이루어지지 않습니다.
                    <strong className="text-[#1B3B2F]"> 학폭 신고를 반드시 병행</strong>해야
                    접근금지, 전학 등 피해학생 보호조치를 확보할 수 있습니다.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    로앤이는 <strong className="text-[#1B3B2F]">성범죄 피해자 전문 로펌</strong>으로서,
                    학폭 신고·심의위 대응과 형사 고소·민사 손해배상을 모두 하나의 팀에서 대응합니다.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 프로세스 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-20">
              학교폭력 대응 절차
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-sm font-bold text-[#1B3B2F] mb-5">
                    {step.num}
                  </div>
                  <h3 className="text-base font-semibold text-black">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 sm:py-40 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
              자주 묻는 질문
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default function SchoolViolenceCenterPage() {
  return (
    <CenterPageTemplate
      pagePath="centers/school-violence"
      centerName="학교폭력 전문센터"
      subtitle="학교폭력 전문센터"
      ctaLabel="학교폭력 상담 예약"
      ctaHref="/consultation"
      defaultCaseType="학교폭력 상담"
      services={[
        {
          title: '학폭위·심의위 대리',
          description: '피해학생 측 의견서 작성, 증거 정리, 심의 참석까지 전 과정을 대리합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '학교폭력 형사 고소',
          description: '폭행, 협박, 강요, 명예훼손 등 형사 처벌이 가능한 행위에 대해 고소를 진행합니다.',
          image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '민사 손해배상 청구',
          description: '치료비, 정신적 피해 보상, 전학 비용 등 실질적인 금전 배상을 청구합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '학생 간 성범죄 대응',
          description: '학교 내 성추행·성폭행·디지털 성범죄에 대해 학폭 신고와 형사 고소를 병행합니다.',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '접근금지·보호조치 확보',
          description: '가해학생으로부터의 즉시 분리와 접근금지 조치를 확보하여 피해학생을 보호합니다.',
          image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '행정심판·행정소송',
          description: '학폭위 결정에 불복하는 경우, 행정심판 또는 행정소송을 통해 바로잡습니다.',
          image: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '내 아이의 학교생활,\n더 이상 참지 마세요.',
        description:
          '한 번의 용기가 반복되는 피해를 끊습니다.\n로앤이 학교폭력 전문센터가 끝까지 함께합니다.',
      }}
      customSection={<SchoolViolenceCustomSection />}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '피해자 전문 변호사',
          quote: '피해학생이 다시 안전하게\n학교생활을 할 수 있도록 끝까지 싸웁니다.',
          image: '/images/lawyers/lawyer-lee.svg',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '피해자 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/images/lawyers/lawyer-noh.svg',
        },
      ]}
      ctaTitle="학교폭력, 더 이상 혼자 견디지 마세요."
      ctaDescription="피해학생 전문 변호사가 끝까지 함께합니다."
    />
  )
}
