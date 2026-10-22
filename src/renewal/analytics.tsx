import { createRoot } from 'react-dom/client'
import Analytics, { trackEvent } from '@/components/Analytics'
import TrafficTracker from '@/components/TrafficTracker'

// Reuse the existing analytics contract on the presentation pages.
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  const mount = document.createElement('div')
  mount.hidden = true
  document.body.append(mount)
  createRoot(mount).render(<><Analytics /><TrafficTracker /></>)
  document.addEventListener('click', event => {
    const a = (event.target as Element)?.closest?.('a')
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('tel:')) trackEvent('phone_click', '전화 상담')
    else if (href.startsWith('/consultation')) trackEvent('consultation_click', '상담 신청')
  })
}
const gaId = process.env.NEXT_PUBLIC_GA_ID
if (gaId) {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId)
  document.head.append(script)
  const w = window as unknown as { dataLayer: unknown[] }
  w.dataLayer = w.dataLayer || []
  // gtag uses its documented Arguments queue format.
  // eslint-disable-next-line prefer-rest-params
  const gtag: (...args: unknown[]) => void = function () { w.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', gaId)
}

import { initConsultation } from './consultation'
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initConsultation, { once: true })
else initConsultation()
