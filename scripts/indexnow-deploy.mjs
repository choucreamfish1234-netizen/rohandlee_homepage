// 프로덕션 배포 때 최근 7일 안에 공개된 기획 글을 IndexNow로 알린다(실패해도 빌드는 계속).
import { readFileSync } from 'node:fs'

if (process.env.VERCEL_ENV !== 'production') {
  console.log('IndexNow: skipped (not production)')
  process.exit(0)
}
const HOST = 'lawfirmrohandlee.com'
const key = readFileSync('src/lib/indexnow.ts', 'utf8').match(/INDEXNOW_KEY = '([0-9a-f]+)'/)?.[1]
const now = Date.now()
const week = now - 7 * 24 * 60 * 60 * 1000
const urls = ['collection', 'defense']
  .flatMap((s) => JSON.parse(readFileSync(`src/data/${s}/guides.json`, 'utf8')))
  .filter((g) => g.publishedAt && Date.parse(g.publishedAt) <= now && Date.parse(g.publishedAt) >= week)
  .map((g) => `https://${HOST}/blog/${g.slug}`)
if (!key || !urls.length) {
  console.log('IndexNow: nothing to submit')
  process.exit(0)
}
urls.push(`https://${HOST}/blog`, `https://${HOST}/llms.txt`)
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }),
  })
  console.log(`IndexNow: submitted ${urls.length} urls, status ${res.status}`)
} catch (err) {
  console.log('IndexNow: failed', err instanceof Error ? err.message : err)
}
