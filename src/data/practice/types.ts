export type AreaKey = 'defense' | 'collection' | 'crypto' | 'business'

export interface PracticeFaq {
  q: string
  a: string
}

export interface PracticeStep {
  title: string
  desc: string
}

export interface PracticeSection {
  title: string
  paragraphs?: string[]
  items?: PracticeStep[]
}

export interface RelatedArea {
  title: string
  desc: string
  href: string
}

export interface PracticePage {
  slug: string
  /** 네비·탭에 노출되는 짧은 이름 */
  name: string
  oneLiner: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
  /** 줄바꿈은 \n */
  heroTitle: string
  heroSubtitle: string
  situations: string[]
  /** 법률 해설 — 완전한 문장으로 서술 (GEO) */
  legalTitle: string
  legal: string[]
  legalNote?: string
  sections?: PracticeSection[]
  strategy: PracticeStep[]
  faqs: PracticeFaq[]
  related: RelatedArea[]
}

export interface PracticeArea {
  key: AreaKey
  base: string
  name: string
  shortName: string
  icon: string
  oneLiner: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTitle: string
  heroSubtitle: string
  intro: string[]
  /** 허브 하단 절차 안내 */
  processTitle?: string
  process?: PracticeStep[]
  faqs: PracticeFaq[]
  pages: PracticePage[]
}
