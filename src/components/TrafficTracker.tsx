'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function detectInAppBrowser(): string | null {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent
  if (/KAKAOTALK/i.test(ua)) return 'kakao'
  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV/i.test(ua)) return 'facebook'
  if (/NAVER/i.test(ua)) return 'naver_app'
  if (/Twitter/i.test(ua)) return 'twitter'
  return null
}

function detectChannel(referrer: string, utmSource: string): string {
  if (utmSource) return utmSource

  const inApp = detectInAppBrowser()
  if (inApp) return inApp

  const r = referrer.toLowerCase()

  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  if (r.includes('instagram.com') || r.includes('l.instagram.com')) return 'instagram'
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  if (r.includes('naver.com') || r.includes('search.naver')) return 'naver'
  if (r.includes('google.com') || r.includes('google.co.kr')) return 'google'
  if (r.includes('lawtalk.co.kr')) return 'lawtalk'
  if (r.includes('kakao.com') || r.includes('kakaotalk')) return 'kakao'
  if (r.includes('facebook.com') || r.includes('fb.com') || r.includes('l.facebook.com')) return 'facebook'
  if (!r || r === '') return 'direct'

  return 'other'
}

export default function TrafficTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 관리자 페이지는 추적 제외
    if (pathname.startsWith('/admin')) return

    // 같은 세션에서 중복 기록 방지
    const sessionKey = `_visited_${pathname}`
    if (sessionStorage.getItem(sessionKey)) return
    sessionStorage.setItem(sessionKey, '1')

    const referrer = document.referrer
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source') || ''
    const utmMedium = params.get('utm_medium') || ''
    const utmCampaign = params.get('utm_campaign') || ''
    const channel = detectChannel(referrer, utmSource)

    const isLanding = !sessionStorage.getItem('_landing')
    if (isLanding) sessionStorage.setItem('_landing', pathname)
    const landingPage = sessionStorage.getItem('_landing') || pathname

    supabase
      .from('visits')
      .insert({
        page: pathname,
        referrer: referrer || null,
        channel,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
        landing_page: landingPage,
        user_agent: navigator.userAgent || null,
      })
      .then(({ error }) => {
        if (error) console.error('[TrafficTracker] insert failed:', error.message)
      })
  }, [pathname])

  return null
}
