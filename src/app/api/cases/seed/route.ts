import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { DEFAULT_CASES } from '@/lib/cases'

export async function POST() {
  try {
    const now = new Date().toISOString()
    const rows = DEFAULT_CASES.map(c => ({
      ...c,
      created_at: now,
      updated_at: now,
    }))

    const { error } = await supabaseAdmin
      .from('success_cases')
      .upsert(rows, { onConflict: 'id' })

    if (error) {
      return NextResponse.json({
        error: `DB 초기화 실패: ${error.message}`,
        sql: `-- Supabase SQL Editor에서 실행해주세요:
CREATE TABLE IF NOT EXISTS success_cases (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  tag TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  badge TEXT NOT NULL,
  badge_color TEXT NOT NULL,
  tag_color TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기존 테이블에 컬럼 추가 시:
-- ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
-- ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS content TEXT;
-- ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;

ALTER TABLE success_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON success_cases FOR SELECT USING (true);
CREATE POLICY "Allow service role all" ON success_cases FOR ALL USING (true);`,
      }, { status: 500 })
    }

    return NextResponse.json({ success: true, count: DEFAULT_CASES.length })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
