import chinaDesk from './china-desk.json'

/** Roh&Lee China Desk — 중국어·외국인 상담 사이트 */
export const CHINA_DESK_URL = chinaDesk.url

/** 옛 /zh/foreign-victim<subpath> 에 해당하는 China Desk 주소 */
export function chinaDeskZhUrl(subpath: string): string {
  const map = chinaDesk.zhRedirects as Record<string, string>
  return CHINA_DESK_URL + (map[subpath] ?? '/cn')
}
