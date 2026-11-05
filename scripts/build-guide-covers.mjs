// 기획 글 시리즈 표지(SVG) 생성 — 구속 가족 안내 표지와 같은 형식.
// 사용: node scripts/build-guide-covers.mjs collection | defense
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const SERIES = {
  collection: { eyebrow: 'DEBT RECOVERY', label: '채권추심', team: '채권추심센터' },
  defense: { eyebrow: 'CRIMINAL DEFENSE', label: '형사대응', team: '형사 사건 대응팀' },
}
const key = process.argv[2]
const series = SERIES[key]
if (!series) throw new Error('usage: node scripts/build-guide-covers.mjs collection|defense')

const guides = JSON.parse(readFileSync(`src/data/${key}/guides.json`, 'utf8'))
const dir = `public/blog/${key}-covers`
mkdirSync(dir, { recursive: true })

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// 목록 썸네일(16:10)에서 좌우가 약 100px씩 잘리므로 글자는 x=150부터 둔다.
// 제목을 한 줄 최대 약 18자로, 단어 단위로 나눈다(최대 3줄).
function wrap(title, max = 18) {
  const lines = []
  let line = ''
  for (const word of title.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line)
      line = word
    } else line = (line + ' ' + word).trim()
  }
  if (line) lines.push(line)
  if (lines.length > 3) lines.splice(2, lines.length - 2, lines.slice(2).join(' '))
  return lines
}

guides.forEach((g, i) => {
  const lines = wrap(g.title)
  const size = lines.length > 2 ? 42 : 46
  const step = lines.length > 2 ? 62 : 70
  const tspans = lines.map((l, n) => `<tspan x="150" dy="${n ? step : 0}">${esc(l)}</tspan>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><title>${esc(g.title)}</title><rect width="1200" height="630" fill="#f4f5ee"/><rect x="0" width="22" height="630" fill="#294934"/><path d="M900 0H1200V630H1060Z" fill="#e4eadf"/><text x="150" y="110" fill="#486248" font-family="sans-serif" font-size="23" letter-spacing="5">ROH &amp; LEE · ${series.eyebrow}</text><text x="150" y="182" fill="#556b56" font-family="sans-serif" font-size="28">${series.label} / ${String(i + 1).padStart(2, '0')}</text><text x="150" y="270" fill="#243d2e" font-family="sans-serif" font-weight="700" font-size="${size}">${tspans}</text><line x1="150" y1="519" x2="1050" y2="519" stroke="#bccbb7"/><text x="150" y="574" fill="#486248" font-family="sans-serif" font-size="24">법률사무소 로앤이 · ${series.team}</text></svg>`
  writeFileSync(`${dir}/${g.slug}.svg`, svg)
})
console.log(`Wrote ${guides.length} ${key} covers.`)
