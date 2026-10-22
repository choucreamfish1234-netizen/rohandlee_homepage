import { readFileSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const pages = JSON.parse(readFileSync('src/data/page-metadata.json', 'utf8'))
const routes = JSON.parse(readFileSync('src/data/renewal-routes.json', 'utf8'))
const check = process.argv.includes('--check')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const meta = (head, key, value, property = false) => {
  const attribute = property ? 'property' : 'name'
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${key.replaceAll(':', '\\:')}["'])[^>]*>`, 'g')
  const tag = `<meta ${attribute}="${key}" content="${escape(value)}"/>`
  assert.ok((head.match(pattern) || []).length <= 1, `Duplicate ${key}`)
  return pattern.test(head) ? head.replace(pattern, () => tag) : head + tag
}

let count = 0
for (const { source, destination } of routes) {
  const copy = pages[source]
  if (!copy) continue
  const file = `public${destination}`
  const original = readFileSync(file, 'utf8')
  const boundary = original.indexOf('</head>')
  assert.ok(boundary > 0, `Missing head: ${source}`)
  let head = original.slice(0, boundary)
  assert.equal((head.match(/<title>/g) || []).length, 1, source)
  head = head.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escape(copy.title)}</title>`)
  head = meta(head, 'description', copy.description)
  for (const prefix of ['og', 'twitter']) {
    head = meta(head, `${prefix}:title`, copy.title, prefix === 'og')
    head = meta(head, `${prefix}:description`, copy.description, prefix === 'og')
  }
  // Keep the existing entities, URLs, images and any FAQ schema intact.
  head = head.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (all, start, raw, end) => {
    const data = JSON.parse(raw)
    let changed = false
    const visit = node => {
      if (!node || typeof node !== 'object') return
      if (node['@type'] === 'WebPage') {
        node.name = copy.title
        node.description = copy.description
        changed = true
      }
      Object.values(node).forEach(value => Array.isArray(value) ? value.forEach(visit) : visit(value))
    }
    visit(data)
    return changed ? start + JSON.stringify(data).replaceAll('<', '\\u003c') + end : all
  })
  const updated = head + original.slice(boundary)
  if (check) assert.equal(original, updated, `Run npm run seo:sync for ${source}`)
  else if (original !== updated) writeFileSync(file, updated)
  count++
}
assert.equal(new Set(Object.values(pages).map(p => p.title)).size, Object.keys(pages).length, 'Duplicate curated titles')
assert.equal(new Set(Object.values(pages).map(p => p.description)).size, Object.keys(pages).length, 'Duplicate curated descriptions')
console.log(`${check ? 'Checked' : 'Synced'} ${count} static routes; ${Object.keys(pages).length} unique curated metadata entries.`)
