const BASE_URL = 'https://lawfirmrohandlee.com'

export function getAlternateLanguages(subpath: string) {
  return {
    'ko': `${BASE_URL}/centers/foreign-victim${subpath}`,
    'en': `${BASE_URL}/en/foreign-victim${subpath}`,
    'zh-CN': `${BASE_URL}/zh/foreign-victim${subpath}`,
    'vi': `${BASE_URL}/vi/foreign-victim${subpath}`,
    'x-default': `${BASE_URL}/centers/foreign-victim${subpath}`,
  }
}
