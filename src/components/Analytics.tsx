'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// ─── 유틸 함수 ────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let vid = localStorage.getItem('_vid')
  if (!vid) {
    vid = uuid()
    localStorage.setItem('_vid', vid)
  }
  return vid
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sid = sessionStorage.getItem('_sid')
  if (!sid) {
    sid = uuid()
    sessionStorage.setItem('_sid', sid)
  }
  return sid
}

function isBot(): boolean {
  if (typeof navigator === 'undefined') return true
  return /bot|crawl|spider|slurp|baidu|yandex|duckduck|facebookexternalhit|twitterbot|linkedinbot|googlebot/i.test(
    navigator.userAgent
  )
}

// ─── Referrer 감지 ──────────────────────────────────
function detectReferrerType(ref: string): string {
  if (!ref) return 'direct'
  const r = ref.toLowerCase()
  if (r.includes('naver.com')) return 'naver'
  if (r.includes('google.')) return 'google'
  if (r.includes('daum.net') || r.includes('search.daum')) return 'daum'
  if (r.includes('kakao')) return 'kakao'
  if (r.includes('lawtalk.co.kr')) return 'lawtalk'
  if (r.includes('instagram.com')) return 'instagram'
  if (r.includes('threads.net')) return 'threads'
  if (r.includes('youtube.com') || r.includes('youtu.be')) return 'youtube'
  if (r.includes(window.location.hostname)) return 'internal'
  return 'other'
}

function extractSearchKeyword(ref: string): string | null {
  if (!ref) return null
  try {
    const url = new URL(ref)
    return url.searchParams.get('query') || url.searchParams.get('q') || url.searchParams.get('keyword') || null
  } catch {
    return null
  }
}

// ─── UTM 파라미터 ───────────────────────────────────
function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  }
}

// ─── 디바이스 감지 ──────────────────────────────────
function detectDevice() {
  if (typeof navigator === 'undefined') return { type: 'desktop', brand: '', browser: '', os: '' }
  const ua = navigator.userAgent

  // Device type
  let type = 'desktop'
  if (/tablet|ipad/i.test(ua)) type = 'tablet'
  else if (/mobile|iphone|android.*mobile/i.test(ua)) type = 'mobile'

  // Brand
  let brand = ''
  if (/samsung/i.test(ua)) brand = 'Samsung'
  else if (/iphone|ipad|mac/i.test(ua)) brand = 'Apple'
  else if (/huawei/i.test(ua)) brand = 'Huawei'
  else if (/xiaomi/i.test(ua)) brand = 'Xiaomi'
  else if (/lg/i.test(ua)) brand = 'LG'

  // Browser
  let browser = 'Other'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/whale/i.test(ua)) browser = 'Whale'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'

  // OS
  let os = 'Other'
  if (/windows/i.test(ua)) os = 'Windows'
  else if (/mac os/i.test(ua)) os = 'macOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad/i.test(ua)) os = 'iOS'
  else if (/linux/i.test(ua)) os = 'Linux'

  return { type, brand, browser, os }
}

function getScreenRes(): string {
  if (typeof window === 'undefined') return ''
  return `${window.screen.width}x${window.screen.height}`
}

// ─── 메인 컴포넌트 ──────────────────────────────────
export default function Analytics() {
  const pathname = usePathname()
  const startTime = useRef(Date.now())
  const scrollMax = useRef(0)
  const clicks = useRef(0)
  const sessionCreated = useRef(false)
  const currentPath = useRef(pathname)

  // Flush page view data on page leave
  const flush = useCallback(async () => {
    const elapsed = Math.round((Date.now() - startTime.current) / 1000)
    const vid = getVisitorId()
    const sid = getSessionId()
    if (!vid || !sid) return

    // Update page_views with final scroll/time/click data
    await supabase
      .from('page_views')
      .update({
        scroll_depth: scrollMax.current,
        time_on_page: elapsed,
        click_count: clicks.current,
        is_bounce: clicks.current <= 1 && elapsed < 10,
      })
      .eq('session_id', sid)
      .eq('page_path', currentPath.current)
      .order('created_at', { ascending: false })
      .limit(1)

    // Update session
    await supabase
      .from('visitor_sessions')
      .update({
        ended_at: new Date().toISOString(),
        exit_page: currentPath.current,
        is_bounce: clicks.current <= 1 && elapsed < 10,
      })
      .eq('session_id', sid)
  }, [])

  // Ensure session exists
  const ensureSession = useCallback(async () => {
    if (sessionCreated.current) return
    sessionCreated.current = true

    const vid = getVisitorId()
    const sid = getSessionId()
    const ref = document.referrer
    const refType = detectReferrerType(ref)
    const utm = getUtmParams()
    const device = detectDevice()

    // Check if this is a new visitor
    const { count } = await supabase
      .from('visitor_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('visitor_id', vid)

    await supabase.from('visitor_sessions').upsert(
      {
        visitor_id: vid,
        session_id: sid,
        started_at: new Date().toISOString(),
        landing_page: pathname,
        referrer_type: refType,
        utm_source: utm.utm_source || null,
        utm_medium: utm.utm_medium || null,
        utm_campaign: utm.utm_campaign || null,
        device_type: device.type,
        browser: device.browser,
        os: device.os,
        is_new_visitor: (count || 0) === 0,
        page_count: 1,
      },
      { onConflict: 'session_id' }
    )
  }, [pathname])

  // Track page view
  useEffect(() => {
    if (isBot()) return
    if (pathname.startsWith('/admin')) return

    const vid = getVisitorId()
    const sid = getSessionId()
    if (!vid || !sid) return

    currentPath.current = pathname
    startTime.current = Date.now()
    scrollMax.current = 0
    clicks.current = 0

    const ref = document.referrer
    const refType = detectReferrerType(ref)
    const keyword = extractSearchKeyword(ref)
    const utm = getUtmParams()
    const device = detectDevice()

    // Track page view asynchronously
    const trackPageView = async () => {
      await ensureSession()

      // Insert page view
      const { error } = await supabase.from('page_views').insert({
        visitor_id: vid,
        session_id: sid,
        page_path: pathname,
        page_title: document.title,
        referrer: ref || null,
        referrer_type: refType === 'internal' ? null : refType,
        search_keyword: keyword,
        ...utm,
        device_type: device.type,
        device_brand: device.brand || null,
        browser: device.browser,
        os: device.os,
        screen_resolution: getScreenRes(),
        language: navigator.language || null,
      })

      if (error) {
        console.error('[Analytics] page_views insert failed:', error.message)
      }

      // Update session page_count
      const { data } = await supabase
        .from('visitor_sessions')
        .select('page_count')
        .eq('session_id', sid)
        .single()

      if (data) {
        await supabase
          .from('visitor_sessions')
          .update({ page_count: (data.page_count || 0) + 1 })
          .eq('session_id', sid)
      }
    }

    trackPageView()

    // Scroll tracking
    const onScroll = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      if (scrollH > 0) {
        const pct = Math.round((window.scrollY / scrollH) * 100)
        if (pct > scrollMax.current) scrollMax.current = pct
      }
    }

    // Click tracking
    const onClick = () => {
      clicks.current++
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', onClick, { passive: true })

    // Flush on page leave
    const onBeforeUnload = () => flush()
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      flush()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [pathname, ensureSession, flush])

  return null
}

// ─── 이벤트 추적 함수 (export) ────────────────────────
export function trackEvent(
  eventType: string,
  eventLabel?: string,
  metadata?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return
  if (isBot()) return

  const vid = getVisitorId()
  const sid = getSessionId()
  if (!vid || !sid) return

  const device = detectDevice()
  const refType = detectReferrerType(document.referrer)

  supabase.from('consultation_events').insert({
    visitor_id: vid,
    session_id: sid,
    event_type: eventType,
    event_label: eventLabel || null,
    page_path: window.location.pathname,
    referrer_type: refType === 'internal' ? null : refType,
    device_type: device.type,
    metadata: metadata || {},
  }).then(({ error }) => {
    if (error) console.error('[Analytics] event insert failed:', error.message)
  })
}
