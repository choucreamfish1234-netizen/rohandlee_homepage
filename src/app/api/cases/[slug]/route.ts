import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { DEFAULT_CASES } from '@/lib/cases'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{ slug: string }>
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  const decodedSlug = decodeURIComponent(slug)

  try {
    // 1. slug로 검색
    const { data: bySlug } = await supabaseAdmin
      .from('success_cases')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle()

    if (bySlug) {
      return NextResponse.json({ case: bySlug, source: 'database' })
    }

    // 2. id로 검색 (숫자인 경우)
    const numId = parseInt(decodedSlug)
    if (!isNaN(numId)) {
      const { data: byId } = await supabaseAdmin
        .from('success_cases')
        .select('*')
        .eq('id', numId)
        .maybeSingle()

      if (byId) {
        return NextResponse.json({ case: byId, source: 'database' })
      }
    }
  } catch {
    // DB not available
  }

  // 3. DEFAULT_CASES 폴백
  const fallbackCase = DEFAULT_CASES.find(c => c.slug === decodedSlug || String(c.id) === decodedSlug)
  if (fallbackCase) {
    return NextResponse.json({ case: fallbackCase, source: 'hardcoded' })
  }

  return NextResponse.json({ case: null }, { status: 404 })
}
