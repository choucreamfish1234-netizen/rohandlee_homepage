// 상담 유입 추적 — 방문자가 처음 들어온 페이지와 경로를 기억했다가 상담 신청에 함께 보낸다.
// 이번 방문(세션)의 진입 정보와, 30일 안의 최초 방문 정보를 따로 둔다.

export interface Touch {
  page: string
  referrer: string
  at: string
}

export interface Attribution {
  entry?: Touch
  first?: Touch
}

const SESSION_KEY = 'rl_entry_touch'
const FIRST_KEY = 'rl_first_touch'
const FIRST_TTL_MS = 30 * 24 * 60 * 60 * 1000

function current(): Touch {
  return {
    page: (location.pathname + location.search).slice(0, 300),
    referrer: (document.referrer || '').slice(0, 500),
    at: new Date().toISOString(),
  }
}

function read(storage: Storage, key: string): Touch | undefined {
  try {
    const raw = storage.getItem(key)
    return raw ? (JSON.parse(raw) as Touch) : undefined
  } catch {
    return undefined
  }
}

/** 페이지 진입 시 호출 — 세션 첫 진입과 최초 방문을 한 번만 기록한다. */
export function recordTouch() {
  if (typeof window === 'undefined' || location.pathname.startsWith('/admin')) return
  const touch = current()
  try {
    if (!sessionStorage.getItem(SESSION_KEY)) sessionStorage.setItem(SESSION_KEY, JSON.stringify(touch))
    const first = read(localStorage, FIRST_KEY)
    if (!first || Date.now() - new Date(first.at).getTime() > FIRST_TTL_MS) {
      localStorage.setItem(FIRST_KEY, JSON.stringify(touch))
    }
  } catch {
    // 저장소를 쓸 수 없는 브라우저에서는 기록하지 않는다.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    return { entry: read(sessionStorage, SESSION_KEY), first: read(localStorage, FIRST_KEY) }
  } catch {
    return {}
  }
}

/** 검색엔진 유입이면 리퍼러에서 검색어를 뽑는다(네이버·다음·빙 등은 전달되는 경우가 있다). */
export function searchQueryFromReferrer(referrer: string | undefined | null): string | null {
  if (!referrer) return null
  try {
    const url = new URL(referrer)
    const host = url.hostname
    const param =
      /naver\.com$/.test(host) ? 'query' :
      /daum\.net$/.test(host) ? 'q' :
      /(google|bing)\./.test(host) ? 'q' :
      /zum\.com$/.test(host) ? 'query' : null
    const q = param ? url.searchParams.get(param) : null
    return q ? q.slice(0, 200) : null
  } catch {
    return null
  }
}
