'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ContentMap {
  [key: string]: string
}

const cache: Record<string, { data: ContentMap; ts: number }> = {}
const CACHE_TTL = 60_000 // 1 minute

export function useSiteContent(page: string) {
  const [content, setContent] = useState<ContentMap>(() => cache[page]?.data || {})
  const [loading, setLoading] = useState(!cache[page])

  useEffect(() => {
    const cached = cache[page]
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setContent(cached.data)
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('site_content')
        .select('section, field_key, value')
        .eq('page', page)

      if (cancelled) return

      const map: ContentMap = {}
      if (data) {
        for (const row of data) {
          map[`${row.section}.${row.field_key}`] = row.value
        }
      }
      cache[page] = { data: map, ts: Date.now() }
      setContent(map)
      setLoading(false)
    })()

    return () => { cancelled = true }
  }, [page])

  function getValue(section: string, fieldKey: string, defaultValue: string): string {
    return content[`${section}.${fieldKey}`] || defaultValue
  }

  function invalidate() {
    delete cache[page]
  }

  return { content, loading, getValue, invalidate }
}
