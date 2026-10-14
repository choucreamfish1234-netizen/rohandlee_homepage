import type { PracticeCase } from '@/data/practice/cases'

// Stable editorial images, shared by cards, articles and search metadata.
// These illustrate the field; they are not photographs of the actual case.
export function practiceCaseImage(c: PracticeCase) {
  const categories: Record<string, string> = {
    '음주운전': 'dui', '마약': 'drugs', '성범죄': 'sexual-offense',
    '교통사고': 'traffic', '폭행·상해': 'assault', '사기·횡령': 'fraud',
    '명예훼손': 'defamation', '도박': 'gambling', '보이스피싱': 'voice',
    '의료': 'medical', '구속영장': 'warrant',
  }
  const areas = { defense: 'warrant', collection: 'collection', crypto: 'crypto', business: 'corporate', victim: 'support' }
  const key = categories[c.category] || areas[c.area]
  return { src: `/renewal/assets/green-centers/${key}.webp`, alt: `${c.category} 대응 사례를 소개하는 분야별 이미지`, caption: '사건 이해를 돕기 위한 분야별 이미지입니다.' }
}
