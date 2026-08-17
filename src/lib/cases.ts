export interface SuccessCase {
  id: number
  slug: string
  tag: string
  category: string
  title: string
  summary: string
  content: string | null
  badge: string
  badge_color: string
  tag_color: string
  image_url: string
  sort_order: number
  published: boolean
  featured?: boolean
  created_at?: string
  updated_at?: string

  practice_area?: string
  representation_side?: 'victim' | 'defendant'
  offense_types?: string[]
  procedure_stages?: string[]
  services_provided?: string[]
  outcome_types?: string[]
  lawyer_ids?: string[]
  challenge?: string
  strategy?: string
  result_detail?: string
  seo_title?: string
  seo_description?: string
  anonymization_reviewed?: boolean
  status?: 'draft' | 'privacy_review' | 'approved' | 'published'
}

export const PRACTICE_AREAS = [
  { value: 'sexual_crime', label: '성범죄' },
  { value: 'stalking', label: '스토킹' },
  { value: 'digital_sex_crime', label: '디지털성범죄' },
  { value: 'property_crime', label: '재산범죄' },
  { value: 'school_violence', label: '학교폭력' },
  { value: 'real_estate', label: '부동산' },
  { value: 'physical_crime', label: '신체범죄' },
  { value: 'damages', label: '손해배상' },
  { value: 'other', label: '기타' },
] as const

export const OFFENSE_TYPE_OPTIONS = [
  '강간', '준강간', '강제추행', '준강제추행',
  '업무상위력에 의한 추행', '업무상위력에 의한 간음',
  '친족관계 성폭력', '아동·청소년 대상 성범죄',
  '불법촬영', '촬영물 유포', '유포 협박',
  '딥페이크', '온라인 성적 괴롭힘',
  '스토킹', '데이트폭력', '가정폭력',
  '사기', '횡령', '배임', '보이스피싱', '전세사기',
  '폭행', '상해', '협박', '명예훼손',
  '학교폭력',
  '기타',
] as const

export const PROCEDURE_STAGE_OPTIONS = [
  '고소 전 상담', '증거 정리', '고소장 작성 및 제출',
  '경찰 수사', '피해자 조사 동석', '검찰 수사',
  '불송치 이의신청', '재정신청',
  '형사재판', '피해자 의견 제출', '증인신문 대비',
  '합의', '손해배상', '항소심', '학폭위·심의위',
] as const

export const SERVICE_OPTIONS = [
  '고소장 작성', '법률의견서 제출', '피해자 조사 동석',
  '진술 정리', '증거 정리 및 제출', '디지털 증거 보전 조력',
  '수사기관 의견 제출', '피해자 의견서 제출',
  '합의 협상 대리', '가해자 연락 차단·대리',
  '공판 피해자 대리', '손해배상 청구',
  '2차 가해 대응', '무고·명예훼손 역공 대응',
  '접근금지 가처분', '보호조치 확보',
] as const

export const OUTCOME_OPTIONS = [
  '입건', '송치', '기소', '구속',
  '유죄', '실형', '집행유예', '벌금',
  '불송치', '무죄',
  '합의', '손해배상 인정', '접근금지 등 보호조치',
  '보호처분',
] as const

// Case image pools - law/court themed ONLY, NO face closeups
export const CASE_IMAGE_POOLS: Record<string, string[]> = {
  '성범죄': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&q=80',
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  ],
  '보이스피싱': [
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
  ],
  '전세사기': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  ],
  '스토킹': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80',
    'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
  ],
  '재산범죄': [
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  ],
  '일반': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80',
    'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  ],
}

export const DEFAULT_CASES: SuccessCase[] = [
  {
    id: 1,
    slug: 'voicephishing-not-guilty',
    tag: '보이스피싱',
    category: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    summary:
      '의뢰인은 보이스피싱 현금 수거책으로 지목되어 수사를 받았습니다. 로앤이는 치밀한 무죄 변론을 통해 경찰 단계에서 불송치(무죄) 결정을 이끌어냈습니다.',
    content: null,
    badge: '불송치(무죄)',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-emerald-50 text-emerald-600',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    sort_order: 0,
    published: true,
    practice_area: 'property_crime',
    representation_side: 'defendant',
    offense_types: ['보이스피싱'],
    procedure_stages: ['경찰 수사'],
    services_provided: [],
    outcome_types: ['불송치'],
    lawyer_ids: [],
    seo_title: '보이스피싱 수거책 불송치(무죄) 사례',
    seo_description: '보이스피싱 현금 수거책으로 지목된 의뢰인을 대리하여 경찰 단계에서 불송치(무죄) 결정을 이끌어낸 사례입니다.',
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 2,
    slug: 'sexual-crime-8years',
    tag: '성범죄',
    category: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    summary:
      '특수강간, 감금 등 9개 혐의로 기소된 가해자에 대해, 로앤이는 피해자를 대리하여 구속 수사를 관철하고 집요한 서면 제출로 징역 8년이라는 엄벌을 이끌어냈습니다.',
    content: null,
    badge: '징역 8년 선고',
    badge_color: 'bg-red-50 text-red-700 border-red-200',
    tag_color: 'bg-red-50 text-red-600',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    sort_order: 1,
    published: true,
    practice_area: 'sexual_crime',
    representation_side: 'victim',
    offense_types: ['강간'],
    procedure_stages: ['경찰 수사', '검찰 수사', '형사재판'],
    services_provided: ['피해자 의견서 제출'],
    outcome_types: ['기소', '구속', '유죄', '실형'],
    lawyer_ids: [],
    seo_title: '특수강간 피해자 대리 · 징역 8년 선고 사례',
    seo_description: '법률사무소 로앤이가 특수강간·감금 피해자를 대리하여 구속 수사를 관철하고 가해자에게 징역 8년을 선고받은 사례입니다.',
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 3,
    slug: 'jeonse-full-recovery',
    tag: '전세사기',
    category: '전세사기',
    title: '전세보증금 2억 원 반환 소송, 전액 회수 성공',
    summary:
      '전세사기 피해자를 대리하여 가압류 및 민사소송을 진행, 보증금 전액을 회수하였습니다.',
    content: null,
    badge: '전액 회수',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-emerald-50 text-emerald-600',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    sort_order: 2,
    published: true,
    practice_area: 'real_estate',
    representation_side: 'victim',
    offense_types: ['전세사기'],
    procedure_stages: ['손해배상'],
    services_provided: ['손해배상 청구'],
    outcome_types: ['손해배상 인정'],
    lawyer_ids: [],
    seo_title: '전세사기 피해자 대리 · 보증금 전액 회수 사례',
    seo_description: '법률사무소 로앤이가 전세사기 피해자를 대리하여 가압류 및 민사소송으로 보증금 2억 원 전액을 회수한 사례입니다.',
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 4,
    slug: 'stalking-imprisonment',
    tag: '스토킹',
    category: '스토킹',
    title: '직장 내 지속적 스토킹, 접근금지 명령 및 실형 선고',
    summary:
      '피해자의 일상 회복을 위해 접근금지 가처분과 형사 고소를 병행, 가해자에게 실형을 이끌어냈습니다.',
    content: null,
    badge: '실형 선고',
    badge_color: 'bg-red-50 text-red-700 border-red-200',
    tag_color: 'bg-red-50 text-red-600',
    image_url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
    sort_order: 3,
    published: true,
    practice_area: 'stalking',
    representation_side: 'victim',
    offense_types: ['스토킹'],
    procedure_stages: ['고소장 작성 및 제출', '경찰 수사', '형사재판'],
    services_provided: ['고소장 작성', '접근금지 가처분'],
    outcome_types: ['유죄', '실형', '접근금지 등 보호조치'],
    lawyer_ids: [],
    seo_title: '스토킹 피해자 대리 · 접근금지 명령 및 실형 사례',
    seo_description: '법률사무소 로앤이가 스토킹 피해자를 대리하여 접근금지 가처분과 형사 고소를 병행해 가해자에게 실형을 선고받은 사례입니다.',
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 5,
    slug: 'voicephishing-7cases-dismissed',
    tag: '보이스피싱',
    category: '보이스피싱',
    title: "보이스피싱 '수거책'으로 몰린 의뢰인, 7건 전부 불송치 — '합의'가 아니라 '혐의없음'을 택한 이유",
    summary: '보이스피싱 현금 수거책으로 지목되어 7건의 사건에서 수사를 받은 의뢰인을 대리하여, 합의가 아닌 혐의없음(불송치)을 목표로 변론하여 7건 전부 불송치 결정을 이끌어냈습니다.',
    content: null,
    badge: '7건 전부 불송치',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-emerald-50 text-emerald-600',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    sort_order: 4,
    published: true,
    featured: true,
    practice_area: 'property_crime',
    representation_side: 'defendant',
    offense_types: ['보이스피싱'],
    procedure_stages: ['경찰 수사'],
    services_provided: [],
    outcome_types: ['불송치'],
    lawyer_ids: [],
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 6,
    slug: 'self-defense-dismissed',
    tag: '신체범죄',
    category: '재산범죄',
    title: '쌍방폭행 사건 정당방위 인정 불송치 성공사례',
    summary: '쌍방폭행으로 수사를 받은 의뢰인을 대리하여 정당방위를 입증, 불송치 결정을 이끌어낸 사례입니다.',
    content: null,
    badge: '정당방위 불송치',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-amber-50 text-amber-600',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    sort_order: 5,
    published: true,
    featured: true,
    practice_area: 'physical_crime',
    representation_side: 'defendant',
    offense_types: ['폭행'],
    procedure_stages: ['경찰 수사'],
    services_provided: [],
    outcome_types: ['불송치'],
    lawyer_ids: [],
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 7,
    slug: 'sexual-crime-settlement-revoked',
    tag: '성범죄',
    category: '성범죄',
    title: '성범죄 가해자에게 합의서를 써준 상황, 합의서/처벌불원서 철회하고 처벌된 사례',
    summary: '성범죄 피해자가 가해자 측의 회유로 합의서와 처벌불원서를 작성한 상황에서, 이를 철회하고 가해자를 처벌받게 한 사례입니다.',
    content: null,
    badge: '처벌불원서 철회·처벌',
    badge_color: 'bg-red-50 text-red-700 border-red-200',
    tag_color: 'bg-red-50 text-red-600',
    image_url: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80',
    sort_order: 6,
    published: true,
    featured: true,
    practice_area: 'sexual_crime',
    representation_side: 'victim',
    offense_types: [],
    procedure_stages: [],
    services_provided: [],
    outcome_types: ['유죄'],
    lawyer_ids: [],
    anonymization_reviewed: true,
    status: 'published',
  },
  {
    id: 8,
    slug: 'school-violence-counter-report',
    tag: '학교폭력',
    category: '학교폭력',
    title: '학교폭력 맞신고 사건, 반복 피해와 대응행위를 구분해 조치 차이를 이끌어낸 사례',
    summary: '학교폭력 맞신고 사건에서 피해학생의 반복 피해와 대응행위를 구분하여 가해학생에게는 강한 조치, 피해학생에게는 경미한 조치를 이끌어낸 사례입니다.',
    content: null,
    badge: '조치 차이 확보',
    badge_color: 'bg-violet-50 text-violet-700 border-violet-200',
    tag_color: 'bg-violet-50 text-violet-600',
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    sort_order: 7,
    published: true,
    featured: true,
    practice_area: 'school_violence',
    representation_side: 'victim',
    offense_types: ['학교폭력'],
    procedure_stages: ['학폭위·심의위'],
    services_provided: [],
    outcome_types: ['보호처분'],
    lawyer_ids: [],
    anonymization_reviewed: true,
    status: 'published',
  },
]

export function getRandomCaseImage(category: string, currentUrl?: string): string {
  const pool = CASE_IMAGE_POOLS[category] || CASE_IMAGE_POOLS['일반']
  const candidates = currentUrl ? pool.filter(url => url !== currentUrl) : pool
  const source = candidates.length > 0 ? candidates : pool
  return source[Math.floor(Math.random() * source.length)]
}
