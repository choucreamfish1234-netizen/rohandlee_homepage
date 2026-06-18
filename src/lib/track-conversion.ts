import { supabase } from '@/lib/supabase'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function detectChannel(): string {
  if (typeof navigator === 'undefined') return 'direct'
  const ua = navigator.userAgent

  if (/KAKAOTALK/i.test(ua)) return 'kakao'
  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV/i.test(ua)) return 'facebook'
  if (/NAVER/i.test(ua)) return 'naver_app'
  if (/Twitter/i.test(ua)) return 'twitter'

  const r = document.referrer.toLowerCase()
  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  if (r.includes('instagram.com')) return 'instagram'
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  if (r.includes('facebook.com') || r.includes('fb.com')) return 'facebook'
  if (r.includes('naver.com')) return 'naver'
  if (r.includes('google.')) return 'google'
  if (r.includes('daum.net')) return 'daum'
  if (r.includes('kakao')) return 'kakao'
  if (r.includes('lawtalk.co.kr')) return 'lawtalk'
  if (r.includes('youtube.com') || r.includes('youtu.be')) return 'youtube'
  if (!r) return 'direct'
  return 'other'
}

export function trackConversion(eventType: string) {
  if (typeof window === 'undefined') return

  const page = window.location.pathname
  const referrer = document.referrer || null
  const channel = detectChannel()

  supabase
    .from('conversion_events')
    .insert({ event_type: eventType, page, referrer, channel })
    .then(({ error }) => {
      if (error) console.error('[Conversion] insert failed:', error.message)
    })

  if (window.gtag) {
    window.gtag('event', eventType, { event_category: 'conversion', page_location: page })
  }
}
