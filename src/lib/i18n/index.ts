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
  return `/${locale}/foreign-victim${subpath}`
}
