'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import { EditableImage } from '@/components/Editable'

interface CaseResult {
  case_name: string
  result: string
}

interface LawyerData {
  key: string
  name: string
  role: string
  specialtyTag: string
  description: string
  image: string
  alt: string
  cases: string[]
  results: CaseResult[]
  education: string[]
  current: string[]
  previous: string[]
}

interface LawyerDB {
  id: string
  name: string
  title: string
  specialties: string | null
  description: string | null
  image_url: string | null
  is_representative: boolean
  display_order: number
  visible: boolean
}

const fallbackLawyers: LawyerData[] = [
  {
    key: 'lee',
    name: '이유림',
    role: '대표변호사',
    specialtyTag: '성범죄 전문',
    description: '끝까지 당신의 편에 서겠습니다. 피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: '/images/lawyers/lawyer-lee.svg',
    alt: '이유림 대표변호사 프로필',
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
    education: [
      '분당대진고등학교 졸업',
      '한국외국어대학교 프랑스어/경제학전공 졸업',
      '충북대학교 법학전문대학원 법학과 전문석사 졸업',
    ],
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
  },
  {
    key: 'noh',
    name: '노채은',
    role: '대표변호사',
    specialtyTag: '재산범죄 전문',
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는 마음이 있습니다.',
    image: '/images/lawyers/lawyer-noh.svg',
    alt: '노채은 대표변호사 프로필',
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
    education: [
      '옥련여자고등학교 졸업',
      '중앙대학교 정치국제학/경제학 복수전공 졸업',
      '경북대학교 법학전문대학원 법학과 전문석사 졸업',
    ],
    current: [
      '법률사무소 로앤이 대표변호사',
      '대법원 국선변호인',
      '부천도시공사인사위원',
      '인천지방법원 부천지원 마을변호사',
      '한국소비자원 소송지원 변호사',
      '경기도소방재난본부 법률자문 변호사',
      '모노옵틱스, 듀이랩스, 제이원소프트, 밀키트래블, 한국데이터소프트 등 자문변호사',
    ],
    previous: [
      '법률사무소 청인',
    ],
  },
]

const FALLBACK_IMAGE_MAP: Record<string, string> = {
  '이유림': '/images/lawyers/lawyer-lee.svg',
  '노채은': '/images/lawyers/lawyer-noh.svg',
}

const FALLBACK_DESC_MAP: Record<string, string> = {
  '이유림': '끝까지 당신의 편에 서겠습니다. 피해자의 시간 앞에서 겸허히 걷겠습니다.',
  '노채은': '무뎌진 언어 뒤에도 도저히 묻혀지지 않는 마음이 있습니다.',
}

function PreviousCareer({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="text-center">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-500 transition-colors"
      >
        <span>이전 경력</span>
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
            <div className="mt-3 space-y-1">
              {items.map((item) => (
                <p key={item} className="text-sm text-gray-400">{item}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LawyerCard({ lawyer }: { lawyer: LawyerData }) {
  return (
    <div className="max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-8"
      >
        <EditableImage
          page="home"
          section="lawyers"
          fieldKey={`lawyer-${lawyer.key}-photo`}
          defaultSrc={lawyer.image}
          alt={lawyer.alt}
          width={600}
          height={800}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      >
        <h3 className="text-2xl font-medium text-gray-900">{lawyer.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{lawyer.role}</p>
        <div className="mt-3">
          <span className="inline-flex border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
            {lawyer.specialtyTag}
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        className="mt-5 text-sm italic text-gray-500 leading-relaxed"
      >
        {lawyer.description}
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {lawyer.cases.map((tag, idx) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + idx * 0.05, ease: 'easeOut' }}
            className="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        className="mt-8"
      >
        <p className="text-xs tracking-widest text-gray-300 uppercase mb-2">학력</p>
        <div className="space-y-1">
          {lawyer.education.map((item) => (
            <p key={item} className="text-sm text-gray-500">{item}</p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        className="mt-8"
      >
        <p className="text-xs tracking-widest text-gray-300 uppercase mb-2">현직</p>
        <div className="space-y-1">
          {lawyer.current.map((item) => (
            <p key={item} className="text-sm text-gray-700">{item}</p>
          ))}
        </div>
      </motion.div>

      <div className="mt-8">
        <PreviousCareer items={lawyer.previous} />
      </div>

      <div className="mt-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
          className="text-xs tracking-widest text-gray-300 uppercase mb-3"
        >
          성공 사례
        </motion.p>
        <div>
          {lawyer.results.map((r, idx) => (
            <motion.div
              key={r.case_name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 + idx * 0.1, ease: 'easeOut' }}
              className={`flex items-center justify-between gap-4 py-2.5 ${
                idx < lawyer.results.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm text-gray-600">{r.case_name}</span>
              <span className="text-sm text-[#1B3B2F] font-medium whitespace-nowrap">{r.result}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AssociateCard({ lawyer }: { lawyer: LawyerDB }) {
  const imageUrl = lawyer.image_url || FALLBACK_IMAGE_MAP[lawyer.name]
  const initial = lawyer.name.charAt(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 mb-4 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${lawyer.name} ${lawyer.title}`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1B3B2F] flex items-center justify-center">
            <span className="text-white text-4xl font-semibold">{initial}</span>
          </div>
        )}
      </div>
      <h4 className="text-lg font-semibold text-gray-900">{lawyer.name}</h4>
      <p className="text-sm text-gray-500">{lawyer.title}</p>
      {lawyer.specialties && (
        <p className="mt-1 text-sm text-gray-400">{lawyer.specialties}</p>
      )}
    </motion.div>
  )
}

const lawyerJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '이유림',
    jobTitle: '대표변호사',
    worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    knowsAbout: ['성범죄 피해자 변호', '디지털 포렌식', 'IT 법률', '피해자 국선변호', '불법촬영', '스토킹'],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: '한국외국어대학교' },
      { '@type': 'CollegeOrUniversity', name: '충북대학교 법학전문대학원' },
    ],
    memberOf: [
      { '@type': 'Organization', name: '서울지방변호사회' },
      { '@type': 'Organization', name: '대한난민지원변호사단' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '노채은',
    jobTitle: '대표변호사',
    worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' },
    knowsAbout: ['재산범죄 피해자 변호', '보이스피싱', '전세사기', '개인회생', '개인파산', '기업자문'],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: '중앙대학교' },
      { '@type': 'CollegeOrUniversity', name: '경북대학교 법학전문대학원' },
    ],
    memberOf: [
      { '@type': 'Organization', name: '대법원 국선변호인' },
      { '@type': 'Organization', name: '한국소비자원 소송지원 변호사' },
    ],
  },
]

export default function LawyersSection() {
  const [representativeLawyers, setRepresentativeLawyers] = useState<LawyerData[]>(fallbackLawyers)
  const [associateLawyers, setAssociateLawyers] = useState<LawyerDB[]>([])

  useEffect(() => {
    async function fetchLawyers() {
      try {
        const res = await fetch('/api/lawyers')
        const data: LawyerDB[] = await res.json()
        if (!Array.isArray(data) || data.length === 0) return

        const visibleLawyers = data.filter((l) => l.visible)

        const reps = visibleLawyers.filter((l) => l.is_representative)
        if (reps.length > 0) {
          const mapped = reps.map((db) => {
            const existing = fallbackLawyers.find((f) => f.name === db.name)
            if (existing) {
              return {
                ...existing,
                description: db.description || existing.description,
                image: db.image_url || existing.image,
                role: db.title || existing.role,
                specialtyTag: db.specialties || existing.specialtyTag,
              }
            }
            return {
              key: db.id,
              name: db.name,
              role: db.title,
              specialtyTag: db.specialties || '',
              description: db.description || FALLBACK_DESC_MAP[db.name] || '',
              image: db.image_url || FALLBACK_IMAGE_MAP[db.name] || '',
              alt: `${db.name} ${db.title} 프로필`,
              cases: [],
              results: [],
              education: [],
              current: [],
              previous: [],
            }
          })
          setRepresentativeLawyers(mapped)
        }

        const associates = visibleLawyers.filter((l) => !l.is_representative)
        setAssociateLawyers(associates)
      } catch {
        // fallback data already set
      }
    }
    fetchLawyers()
  }, [])

  return (
    <section id="lawyers" className="py-12 sm:py-20 bg-[#f5f8f6]">
      {lawyerJsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Our Lawyers
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            변호사 소개
          </h2>
        </ScrollReveal>

        {/* 대표변호사 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {representativeLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.key} lawyer={lawyer} />
          ))}
        </div>

        {/* 어소시에이트 변호사 */}
        {associateLawyers.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-500 mb-3">함께하는 변호사</p>
              <div className="w-16 border-t border-gray-300 mx-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {associateLawyers.map((lawyer) => (
                <AssociateCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
