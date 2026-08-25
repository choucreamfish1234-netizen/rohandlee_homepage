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

const AI_CHANNELS = ['gemini', 'chatgpt', 'perplexity', 'copilot', 'claude', 'kakao_ai', 'clova_x'] as const
const SEARCH_CHANNELS = ['google', 'naver', 'daum', 'bing', 'yahoo']

function detectChannel(referrer: string, utmSource: string): string {
  if (utmSource) return utmSource

  const inApp = detectInAppBrowser()
  if (inApp) return inApp

  const r = referrer.toLowerCase()

  // AI 검색 (최우선)
  if (r.includes('gemini.google') || r.includes('bard.google')) return 'gemini'
  if (r.includes('chat.openai') || r.includes('chatgpt')) return 'chatgpt'
  if (r.includes('perplexity')) return 'perplexity'
  if (r.includes('copilot.microsoft') || r.includes('bing.com/chat')) return 'copilot'
  if (r.includes('claude.ai')) return 'claude'
  if (r.includes('search.daum.net/ai') || r.includes('ai.kakao')) return 'kakao_ai'
  if (r.includes('clova') || r.includes('clovax')) return 'clova_x'

  // 네이버 세부 (일반 naver 검색보다 먼저)
  if (r.includes('blog.naver')) return 'naver_blog'
  if (r.includes('cafe.naver')) return 'naver_cafe'
  if (r.includes('kin.naver')) return 'naver_kin'
  if (r.includes('map.naver')) return 'naver_map'

  // 검색엔진
  if (r.includes('google')) return 'google'
  if (r.includes('naver')) return 'naver'
  if (r.includes('daum') || r.includes('search.kakao')) return 'daum'
  if (r.includes('bing')) return 'bing'
  if (r.includes('yahoo')) return 'yahoo'

  // SNS
  if (r.includes('threads.net') || r.includes('threads.meta')) return 'threads'
  if (r.includes('instagram.com') || r.includes('l.instagram.com')) return 'instagram'
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('t.co')) return 'twitter'
  if (r.includes('youtube')) return 'youtube'
  if (r.includes('facebook.com') || r.includes('fb.com') || r.includes('l.facebook.com')) return 'facebook'
  if (r.includes('tiktok')) return 'tiktok'
  if (r.includes('kakao.com') || r.includes('kakaotalk')) return 'kakao'

  // 법률 플랫폼
  if (r.includes('lawtalk')) return 'lawtalk'
  if (r.includes('lawpeople')) return 'lawpeople'

  // 직접 / 내부
  if (!r || r === '' || r.includes('lawfirmrohandlee')) return 'direct'

  // 기타 — hostname 추출
  try {
    return 'other:' + new URL(referrer).hostname
  } catch {
    return 'other'
  }
}

function getSource(channel: string): string {
  if ((AI_CHANNELS as readonly string[]).includes(channel)) return 'ai_search'
  if (channel === 'direct') return 'direct'
  if (SEARCH_CHANNELS.includes(channel)) return 'search'
  if (channel.startsWith('other')) return 'other'
  return 'referral'
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
        source: getSource(channel),
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
