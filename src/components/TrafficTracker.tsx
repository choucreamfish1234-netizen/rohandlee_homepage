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

const AI_SEARCH_CHANNELS = ['gemini', 'chatgpt', 'perplexity', 'copilot', 'claude'] as const

function detectChannel(referrer: string, utmSource: string): string {
  if (utmSource) return utmSource

  const inApp = detectInAppBrowser()
  if (inApp) return inApp

  const r = referrer.toLowerCase()

  // AI 검색 (최우선 — google보다 먼저 판별)
  if (r.includes('gemini.google') || r.includes('bard.google')) return 'gemini'
  if (r.includes('chat.openai') || r.includes('chatgpt')) return 'chatgpt'
  if (r.includes('perplexity')) return 'perplexity'
  if (r.includes('copilot.microsoft') || r.includes('bing.com/chat')) return 'copilot'
  if (r.includes('claude.ai')) return 'claude'

  // 일반 검색
  if (r.includes('google')) return 'google'
  if (r.includes('naver.com') || r.includes('search.naver')) return 'naver'
  if (r.includes('daum') || r.includes('search.daum')) return 'daum'
  if (r.includes('bing')) return 'bing'

  // SNS
  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  if (r.includes('instagram.com') || r.includes('l.instagram.com')) return 'instagram'
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  if (r.includes('youtube')) return 'youtube'
  if (r.includes('facebook.com') || r.includes('fb.com') || r.includes('l.facebook.com')) return 'facebook'
  if (r.includes('kakao.com') || r.includes('kakaotalk')) return 'kakao'
  if (r.includes('blog.naver')) return 'naver_blog'
  if (r.includes('cafe.naver')) return 'naver_cafe'

  // 법률 플랫폼
  if (r.includes('lawtalk')) return 'lawtalk'

  // 직접 / 내부
  if (!r || r === '' || r.includes('lawfirmrohandlee')) return 'direct'

  return 'other'
}

function isAiSearch(channel: string): boolean {
  return (AI_SEARCH_CHANNELS as readonly string[]).includes(channel)
}

export default function TrafficTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return

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
        source: isAiSearch(channel) ? 'ai_search' : (channel === 'direct' ? 'direct' : (channel === 'other' ? 'other' : (['google', 'naver', 'daum', 'bing'].includes(channel) ? 'search' : 'referral'))),
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
