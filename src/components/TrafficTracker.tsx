'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function detectChannel(referrer: string, utmSource: string): string {
  if (utmSource) return utmSource

  const r = referrer.toLowerCase()

  // 스레드
  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  // 인스타그램
  if (r.includes('instagram.com') || r.includes('l.instagram.com')) return 'instagram'
  // 트위터/X
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  // 네이버
  if (r.includes('naver.com') || r.includes('search.naver')) return 'naver'
  // 구글
  if (r.includes('google.com') || r.includes('google.co.kr')) return 'google'
  // 로톡
  if (r.includes('lawtalk.co.kr')) return 'lawtalk'
  // 카카오
  if (r.includes('kakao.com') || r.includes('kakaotalk')) return 'kakao'
  // 페이스북
  if (r.includes('facebook.com') || r.includes('fb.com') || r.includes('l.facebook.com')) return 'facebook'
  // 직접 방문
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
    const channel = detectChannel(referrer, utmSource)

    supabase
      .from('visits')
      .insert({
        page: pathname,
        referrer: referrer || null,
        channel,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        user_agent: navigator.userAgent || null,
      })
      .then(({ error }) => {
        if (error) console.error('[TrafficTracker] insert failed:', error.message)
      })
  }, [pathname])

  return null
}
