import { chinaDeskZhUrl } from '@/data/china-desk'

export type Locale = 'ko' | 'en' | 'zh' | 'vi'

export const locales: Locale[] = ['ko', 'en', 'zh', 'vi']

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  vi: 'Tiếng Việt',
}

export function getLocaleFromPath(path: string): Locale {
  const seg = path.split('/')[1]
  if (seg === 'en' || seg === 'zh' || seg === 'vi') return seg
  return 'ko'
}

export function buildLocalePath(locale: Locale, subpath: string): string {
  if (locale === 'ko') return `/centers/foreign-victim${subpath}`
  // 중국어는 Roh&Lee China Desk 로 통합 (옛 /zh 경로는 301)
  if (locale === 'zh') return chinaDeskZhUrl(subpath)
  return `/${locale}/foreign-victim${subpath}`
}
