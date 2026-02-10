'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { EditableText, EditableImage } from '@/components/Editable'

interface CaseResult {
  case_name: string
  result: string
}

interface LawyerData {
  key: string
  name: string
  role: string
  specialty: string
  specialtyTag: string
  description: string
  image: string
  alt: string
  education: string[]
  current: string[]
  cases: string[]
  results: CaseResult[]
  previous: string[]
}

const lawyers: LawyerData[] = [
  {
    key: 'lee',
    name: '이유림',
    role: '대표변호사',
    specialty: '성범죄 피해자 전문 변호사',
    specialtyTag: '성범죄 전문',
    description: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: '/lawyer-lee.svg',
    alt: '이유림 대표변호사 프로필',
    education: [
      '한국외국어대학교 프랑스어/경제학',
      '충북대학교 법학전문대학원',
    ],
    current: [
      '법률사무소 로앤이 대표변호사',
      '대한변호사협회 등록 성범죄 전문 변호사',
      '인천지방법원 국선변호인',
      '법률구조공단 성범죄 피해자 국선변호사',
    ],
    cases: [
      '강간·준강간', '카메라이용촬영', '협박', '성범죄피해 형사고소',
      '관련 민사소송', '학교폭력', '프랜차이즈·공정거래', '개인정보보호', '가사',
    ],
    results: [
      { case_name: '강도강간 등 고소대리', result: '징역 8년 선고' },
      { case_name: '카메라이용촬영물', result: '압수수색 및 디지털 포렌식 다수 진행' },
      { case_name: '재산범죄 고소대리', result: '다수 송치' },
      { case_name: '민사 손해배상소송', result: '다수 승소' },
    ],
    previous: [
      '법무법인 세민',
      '법무법인 율본',
      '법무법인(유한) 바른',
    ],
  },
  {
    key: 'noh',
    name: '노채은',
    role: '대표변호사',
    specialty: '재산범죄 피해자 전문 변호사',
    specialtyTag: '재산범죄 전문',
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
    image: '/lawyer-noh.svg',
    alt: '노채은 대표변호사 프로필',
    education: [
      '중앙대학교 정치국제학/경제학',
      '경북대학교 법학전문대학원',
    ],
    current: [
      '법률사무소 로앤이 대표변호사',
      '대한변호사협회 등록 재산범죄 전문 변호사',
      '인천지방법원 국선변호인',
    ],
    cases: [
      '사기·횡령·배임', '재산범죄 민사소송', '학교폭력',
      '기업자문', '동물권', '가사', '압류·추심',
    ],
    results: [
      { case_name: '보이스피싱 수거책', result: '불송치' },
      { case_name: '폭처법상 공동상해 (정식재판청구)', result: '무죄' },
      { case_name: '재산범죄 고소대리', result: '다수 송치' },
      { case_name: '민사 손해배상소송', result: '다수 승소' },
    ],
    previous: [
      '법무법인 세민',
      '법무법인(유한) 바른',
    ],
  },
]

function PreviousCareer({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-500 transition-colors"
      >
        <span>이전 경력 보기</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-[10px]"
        >
          &#9660;
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LawyersSection() {
  return (
    <section id="lawyers" className="py-12 sm:py-20 bg-[#f5f8f6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Our Lawyers
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            변호사 소개
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
          {lawyers.map((lawyer, i) => (
            <ScrollReveal key={lawyer.key} delay={i * 0.15}>
              <div>
                {/* Photo */}
                <div className="text-center">
                  <div className="w-full max-w-sm mx-auto mb-8">
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm">
                      <EditableImage
                        page="home"
                        section="lawyers"
                        fieldKey={`lawyer-${lawyer.key}-photo`}
                        defaultSrc={lawyer.image}
                        alt={lawyer.alt}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>

                  {/* Name + role + tag */}
                  <h3 className="text-xl font-bold text-black flex items-center justify-center gap-2">
                    <EditableText
                      page="home"
                      section="lawyers"
                      fieldKey={`lawyer-${lawyer.key}-name`}
                      defaultValue={lawyer.name}
                      tag="span"
                    />
                    <span className="font-sans text-base font-normal text-gray-400">{lawyer.role}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium bg-[#1B3B2F] text-white rounded-full">
                      {lawyer.specialtyTag}
                    </span>
                  </h3>
                  <EditableText
                    page="home"
                    section="lawyers"
                    fieldKey={`lawyer-${lawyer.key}-specialty`}
                    defaultValue={lawyer.specialty}
                    tag="p"
                    className="mt-1 text-sm text-accent font-medium"
                  />
                  <EditableText
                    page="home"
                    section="lawyers"
                    fieldKey={`lawyer-${lawyer.key}-description`}
                    defaultValue={lawyer.description}
                    tag="p"
                    className="mt-5 text-sm text-gray-400 leading-relaxed whitespace-pre-line"
                  />
                </div>

                {/* Categorized career info */}
                <div className="mt-8 text-left space-y-6">
                  {/* 학력 */}
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">학력</p>
                    <ul className="space-y-1">
                      {lawyer.education.map((item) => (
                        <li key={item} className="text-sm text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 현직 */}
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">현직</p>
                    <ul className="space-y-1.5">
                      {lawyer.current.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3B2F] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 주요 사건 */}
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">주요 사건</p>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.cases.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 성공 사례 */}
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">성공 사례</p>
                    <div className="space-y-2">
                      {lawyer.results.map((r) => (
                        <div key={r.case_name} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-3">
                          <span className="text-sm text-gray-600">{r.case_name}</span>
                          <span className="text-sm text-[#1B3B2F] font-medium whitespace-nowrap">{r.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 전직 (아코디언) */}
                  <PreviousCareer items={lawyer.previous} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
