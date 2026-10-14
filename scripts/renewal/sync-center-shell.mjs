import { readFileSync, writeFileSync } from 'node:fs'

// The live route map serves static documents, not the legacy React hubs.
// Limit this shell to the five main centers; victim pages are intentionally excluded.
const centers = ['defense', 'civil', 'collection', 'crypto', 'voice-phishing']
const header = readFileSync('scripts/renewal/partials/center-header.html', 'utf8').trim()
const footer = readFileSync('scripts/renewal/partials/center-footer.html', 'utf8').trim()
for (const center of centers) {
  const path = `public/renewal/pages/${center}/index.html`
  const original = readFileSync(path, 'utf8')
  const activeHeader = header.replace(`class="mega-title" href="/${center}"`, `class="mega-title" aria-current="page" href="/${center}"`)
  let next = original.replace(/<header\b[^>]*>[\s\S]*?<\/header>/, activeHeader)
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/, footer)
    .replace(/<body class="([^"]*)"/, (_, classes) => `<body class="${[...new Set([...classes.split(' ').filter(Boolean), 'center-hub'])].join(' ')}"`)
  if (!next.includes('/renewal/center-shell.css')) next = next.replace('</head>', '<link rel="stylesheet" href="/renewal/center-shell.css"/><script defer src="/renewal/center-shell.js"></script></head>')
  if (process.argv.includes('--check')) {
    if (next !== original) throw new Error(`Stale center shell: ${path}`)
  } else writeFileSync(path, next)
}
