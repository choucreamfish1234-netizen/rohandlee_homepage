// AEO(답변 엔진) 보강 — 리뉴얼 정적 문서의 화면 디자인은 건드리지 않는다.
// 1) 기존 FAQ 아코디언(.rich-faq)에 scripts/aeo/faq-additions.json 항목을 같은 마크업으로 추가
// 2) 화면에 보이는 FAQ·브레드크럼·제목으로 FAQPage·BreadcrumbList·Service JSON-LD 생성
// 3) LegalService 구조화 데이터에 사무소 설명과 대표변호사 정보(사이트에 공개된 약력) 보강
// 여러 번 실행해도 결과가 같다(data-aeo 표시로 이전 결과를 지우고 다시 만든다).
// 사용: node scripts/sync-aeo.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs'

const BASE = 'https://lawfirmrohandlee.com'
const LEGAL_ID = `${BASE}/#legalservice`
const BING_VERIFICATION = 'A0ED0FC2A7C12594BB1D24ED91052900'
const check = process.argv.includes('--check')
const routes = JSON.parse(readFileSync('src/data/renewal-routes.json', 'utf8'))
const additions = JSON.parse(readFileSync('scripts/aeo/faq-additions.json', 'utf8'))

const FIRM_DESCRIPTION =
  '법률사무소 로앤이는 경기도 부천시의 법률사무소로, 형사사건, 민사·가사, 채권추심, 가상자산·코인, 보이스피싱, 기업법무와 범죄 피해자 지원을 수행합니다. 대표변호사 이유림·노채은이 상담부터 사건 수행까지 직접 함께합니다.'

const FOUNDERS = [
  {
    '@type': 'Person',
    '@id': `${BASE}/lawyers/lee-yurim`,
    name: '이유림',
    jobTitle: '대표변호사',
    url: `${BASE}/lawyers/lee-yurim`,
    worksFor: { '@id': LEGAL_ID },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: '한국외국어대학교' },
      { '@type': 'CollegeOrUniversity', name: '충북대학교 법학전문대학원' },
    ],
    knowsAbout: ['성범죄 피해자 대리', '형사사건', '스토킹', '디지털성범죄', '난민 사건'],
    sameAs: ['https://www.lawtalk.co.kr/directory/profile/8292-%EC%9D%B4%EC%9C%A0%EB%A6%BC'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE}/lawyers/roh-chaeeun`,
    name: '노채은',
    jobTitle: '대표변호사',
    url: `${BASE}/lawyers/roh-chaeeun`,
    worksFor: { '@id': LEGAL_ID },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: '중앙대학교' },
      { '@type': 'CollegeOrUniversity', name: '경북대학교 법학전문대학원' },
    ],
    knowsAbout: ['재산범죄', '금융사기', '보이스피싱', '채권추심', '기업자문'],
    sameAs: ['https://www.lawtalk.co.kr/directory/profile/7587-%EB%85%B8%EC%B1%84%EC%9D%80'],
  },
]

const decode = (s) =>
  s
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
const escapeHtml = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const ld = (data) => JSON.stringify(data).replaceAll('<', '\\u003c')

function addFaqItems(html, items) {
  html = html.replace(/<details data-aeo="">[\s\S]*?<\/details>/g, '')
  if (!items?.length) return html
  const start = html.indexOf('<div class="rich-faq">')
  if (start < 0) return html
  const end = html.indexOf('</div>', start)
  const block = items
    .map((f) => `<details data-aeo=""><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`)
    .join('')
  return html.slice(0, end) + block + html.slice(end)
}

function visibleFaqs(html) {
  const main = html.slice(html.indexOf('<main'))
  const out = []
  for (const m of main.matchAll(/<details(?: data-aeo="")?>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    const q = decode(m[1])
    const a = decode(m[2])
    if (q && a) out.push({ q, a })
  }
  return out
}

function breadcrumb(html, canonical) {
  const m = html.match(/<div class="breadcrumb">([\s\S]*?)<\/div>/)
  if (!m) return null
  const items = []
  const re = /<a href="([^"]+)">([\s\S]*?)<\/a>/g
  let last = 0
  let a
  while ((a = re.exec(m[1]))) {
    items.push({ name: decode(a[2]), url: new URL(a[1], BASE).href.replace(/\/$/, '') || BASE })
    last = re.lastIndex
  }
  const current = decode(m[1].slice(last).replace(/^\s*\/\s*/, ''))
  if (current) items.push({ name: current, url: canonical })
  if (items.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}

function enrichLegalService(html) {
  return html.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (all, open, raw, close) => {
    if (open.includes('data-aeo')) return all
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return all
    }
    let changed = false
    const visit = (node) => {
      if (!node || typeof node !== 'object') return
      if (node['@type'] === 'LegalService') {
        node.description = FIRM_DESCRIPTION
        node.founder = FOUNDERS
        changed = true
        return
      }
      Object.values(node).forEach((v) => (Array.isArray(v) ? v.forEach(visit) : visit(v)))
    }
    Array.isArray(data) ? data.forEach(visit) : visit(data)
    return changed ? open + ld(data) + close : all
  })
}

let count = 0
for (const { source, destination } of routes) {
  const file = `public${destination}`
  const original = readFileSync(file, 'utf8')
  let html = addFaqItems(original, additions[source])
  // Bing 웹마스터 도구 사이트 인증 (네이버 인증 태그가 있는 문서에 함께 둔다)
  if (!html.includes('name="msvalidate.01"')) {
    html = html.replace(/(<meta[^>]*name="naver-site-verification"[^>]*>)/, `$1<meta content="${BING_VERIFICATION}" name="msvalidate.01"/>`)
  }
  html = html.replace(/<script type="application\/ld\+json" data-aeo="">[\s\S]*?<\/script>/g, '')
  html = enrichLegalService(html)

  const canonical = html.match(/<link href="([^"]+)" rel="canonical"/)?.[1] || `${BASE}${source}`
  const nodes = []
  const faqs = visibleFaqs(html)
  // 문서가 이미 자체 FAQPage를 갖고 있으면 중복 생성하지 않는다.
  const ownFaq = /<script\b(?![^>]*data-aeo)[^>]*application\/ld\+json[^>]*>[^<]*"FAQPage"/.test(html)
  if (faqs.length && !ownFaq) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  const crumbs = breadcrumb(html, canonical)
  if (crumbs) nodes.push(crumbs)
  if (source !== '/') {
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
    const description = html.match(/<meta (?:name="description" content="([^"]*)"|content="([^"]*)" name="description")/)
    if (h1) {
      nodes.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: decode(h1[1]),
        ...(description ? { description: decode(description[1] || description[2]) } : {}),
        url: canonical,
        areaServed: { '@type': 'Country', name: 'KR' },
        provider: { '@type': 'LegalService', '@id': LEGAL_ID, name: '법률사무소 로앤이', url: BASE },
      })
    }
  }
  if (nodes.length) {
    const boundary = html.indexOf('</head>')
    html = html.slice(0, boundary) + `<script type="application/ld+json" data-aeo="">${ld(nodes)}</script>` + html.slice(boundary)
  }

  if (html !== original) {
    if (check) throw new Error(`AEO data out of date: ${source} — run node scripts/sync-aeo.mjs`)
    writeFileSync(file, html)
  }
  count++
}
console.log(`${check ? 'Checked' : 'Synced'} AEO data for ${count} static routes.`)
