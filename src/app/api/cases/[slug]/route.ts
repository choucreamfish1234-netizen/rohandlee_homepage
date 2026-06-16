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
    const { data, error } = await supabaseAdmin
      .from('success_cases')
      .select('*')
      .eq('slug', decodedSlug)
      .eq('published', true)
      .maybeSingle()

    if (data) {
      return NextResponse.json({ case: data, source: 'database' })
    }

    if (!data) {
      const fallback = await supabaseAdmin
        .from('success_cases')
        .select('*')
        .eq('slug', decodedSlug)
        .maybeSingle()

      if (fallback.data) {
        return NextResponse.json({ case: fallback.data, source: 'database' })
      }
    }

    if (error) {
      console.error('Case fetch error:', error.message)
    }
  } catch {
    // DB not available, try fallback
  }

  const fallbackCase = DEFAULT_CASES.find(c => c.slug === decodedSlug)
  if (fallbackCase) {
    return NextResponse.json({ case: fallbackCase, source: 'hardcoded' })
  }

  return NextResponse.json({ case: null }, { status: 404 })
}
