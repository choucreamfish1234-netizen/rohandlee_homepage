import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const baseline = JSON.parse(readFileSync('docs/center-ui/baseline.json', 'utf8'))
for (const [center, old] of Object.entries(baseline)) {
  const html = readFileSync(`public/renewal/pages/${center}/index.html`, 'utf8')
  const matches = re => [...html.matchAll(re)].map(m => m[1] ?? m[0])
  const main = html.match(/<main>[\s\S]*?<\/main>/)[0]
  assert.equal(createHash('sha256').update(main).digest('hex'), old.mainSha256, `${center}: main content changed`)
  assert.deepEqual(matches(/<title>(.*?)<\/title>/g), [old.title])
  assert.deepEqual(matches(/<meta[^>]*>/g), old.meta)
  assert.deepEqual(matches(/<link[^>]*canonical[^>]*>/g), old.canonical)
  assert.deepEqual(matches(/<script type="application\/ld\+json">(.*?)<\/script>/g), old.jsonLd)
  assert.deepEqual(matches(/<h1[^>]*>(.*?)<\/h1>/g), old.h1)
  assert.equal(old.h1.length, 1)
  assert.deepEqual(matches(/<img[^>]*>/g), old.images)
  const links = matches(/href="([^"]+)"/g)
  for (const href of old.links) assert(links.includes(href), `${center}: removed ${href}`)
  assert.equal(matches(/<header\b/g).length, 1)
  assert.equal(matches(/<footer\b/g).length, 1)
  assert.equal(matches(/aria-current="page"/g).length, 1)
  console.log(`${center}: SEO, main HTML, image attributes and all existing links preserved`)
}
