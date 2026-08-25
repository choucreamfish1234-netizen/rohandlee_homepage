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
  // AI 검색 (최우선)
  if (r.includes('gemini.google') || r.includes('bard.google')) return 'gemini'
  if (r.includes('chat.openai') || r.includes('chatgpt')) return 'chatgpt'
  if (r.includes('perplexity')) return 'perplexity'
  if (r.includes('copilot.microsoft') || r.includes('bing.com/chat')) return 'copilot'
  if (r.includes('claude.ai')) return 'claude'
  if (r.includes('search.daum.net/ai') || r.includes('ai.kakao')) return 'kakao_ai'
  if (r.includes('clova') || r.includes('clovax')) return 'clova_x'
  // 네이버 세부
  if (r.includes('blog.naver')) return 'naver_blog'
  if (r.includes('cafe.naver')) return 'naver_cafe'
  if (r.includes('kin.naver')) return 'naver_kin'
  if (r.includes('map.naver')) return 'naver_map'
  // SNS
  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  if (r.includes('instagram.com')) return 'instagram'
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  if (r.includes('facebook.com') || r.includes('fb.com')) return 'facebook'
  if (r.includes('tiktok')) return 'tiktok'
  if (r.includes('youtube.com') || r.includes('youtu.be')) return 'youtube'
  // 검색엔진
  if (r.includes('google.')) return 'google'
  if (r.includes('naver')) return 'naver'
  if (r.includes('daum') || r.includes('search.kakao')) return 'daum'
  if (r.includes('bing')) return 'bing'
  if (r.includes('yahoo')) return 'yahoo'
  if (r.includes('kakao')) return 'kakao'
  // 법률 플랫폼
  if (r.includes('lawtalk')) return 'lawtalk'
  if (r.includes('lawpeople')) return 'lawpeople'
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
