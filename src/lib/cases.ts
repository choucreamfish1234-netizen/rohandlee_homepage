export interface SuccessCase {
  id: number
  tag: string
  category: string
  title: string
  summary: string
  badge: string
  badge_color: string
  tag_color: string
  image_url: string
  sort_order: number
}

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
    tag: '보이스피싱',
    category: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    summary:
      '의뢰인은 보이스피싱 현금 수거책으로 지목되어 수사를 받았습니다. 로앤이는 치밀한 무죄 변론을 통해 경찰 단계에서 불송치(무죄) 결정을 이끌어냈습니다.',
    badge: '불송치(무죄)',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-emerald-50 text-emerald-600',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    sort_order: 0,
  },
  {
    id: 2,
    tag: '성범죄',
    category: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    summary:
      '특수강간, 감금 등 9개 혐의로 기소된 가해자에 대해, 로앤이는 구속 수사를 관철하고 집요한 서면 제출로 징역 8년이라는 엄벌을 이끌어냈습니다.',
    badge: '징역 8년 선고',
    badge_color: 'bg-red-50 text-red-700 border-red-200',
    tag_color: 'bg-red-50 text-red-600',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    sort_order: 1,
  },
  {
    id: 3,
    tag: '전세사기',
    category: '전세사기',
    title: '전세보증금 2억 원 반환 소송, 전액 회수 성공',
    summary:
      '전세사기 피해자를 대리하여 가압류 및 민사소송을 진행, 보증금 전액을 회수하였습니다.',
    badge: '전액 회수',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tag_color: 'bg-emerald-50 text-emerald-600',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    sort_order: 2,
  },
  {
    id: 4,
    tag: '스토킹',
    category: '스토킹',
    title: '직장 내 지속적 스토킹, 접근금지 명령 및 실형 선고',
    summary:
      '피해자의 일상 회복을 위해 접근금지 가처분과 형사 고소를 병행, 가해자에게 실형을 이끌어냈습니다.',
    badge: '실형 선고',
    badge_color: 'bg-red-50 text-red-700 border-red-200',
    tag_color: 'bg-red-50 text-red-600',
    image_url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
    sort_order: 3,
  },
]

export function getRandomCaseImage(category: string, currentUrl?: string): string {
  const pool = CASE_IMAGE_POOLS[category] || CASE_IMAGE_POOLS['일반']
  const candidates = currentUrl ? pool.filter(url => url !== currentUrl) : pool
  const source = candidates.length > 0 ? candidates : pool
  return source[Math.floor(Math.random() * source.length)]
}
