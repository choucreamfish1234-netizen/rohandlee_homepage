import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

interface Suggestion {
  page_path: string
  suggested_title?: string
  suggested_description?: string
  current_title?: string
  current_description?: string
  reason?: string
  target_keywords?: string[]
}

export async function POST(req: NextRequest) {
  try {
    const { suggestions } = await req.json() as { suggestions: Suggestion[] }

    if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
      return NextResponse.json({ error: '적용할 제안이 없습니다.' }, { status: 400 })
    }

    const results: { page_path: string; success: boolean }[] = []
    const changes: { page_path: string; field_changed: string; old_value: string | null; new_value: string | null; reason: string }[] = []

    for (const s of suggestions) {
      const updates: Record<string, string | null> = {}

      if (s.suggested_title) {
        updates.title = s.suggested_title
        updates.og_title = s.suggested_title
      }
      if (s.suggested_description) {
        updates.description = s.suggested_description
        updates.og_description = s.suggested_description
      }
      if (s.target_keywords?.length) {
        updates.keywords = s.target_keywords.join(', ')
      }

      updates.updated_at = new Date().toISOString()

      const { error } = await supabaseAdmin
        .from('page_seo')
        .upsert({ page_path: s.page_path, ...updates }, { onConflict: 'page_path' })

      results.push({ page_path: s.page_path, success: !error })

      if (!error) {
        if (s.suggested_title) {
          changes.push({
            page_path: s.page_path,
            field_changed: 'title',
            old_value: s.current_title || null,
            new_value: s.suggested_title,
            reason: s.reason || 'AI 최적화 제안 적용',
          })
        }
        if (s.suggested_description) {
          changes.push({
            page_path: s.page_path,
            field_changed: 'description',
            old_value: s.current_description || null,
            new_value: s.suggested_description,
            reason: s.reason || 'AI 최적화 제안 적용',
          })
        }
      }
    }

    if (changes.length > 0) {
      await supabaseAdmin.from('seo_changes').insert(changes)
    }

    return NextResponse.json({ results, applied: changes.length })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
