-- 경쟁 로펌 정보
CREATE TABLE competitors (
  id bigint generated always as identity primary key,
  name text not null,
  url text not null,
  lawtalk_url text,
  speciality text,
  notes text,
  created_at timestamptz default now()
);

-- SEO 분석 기록
CREATE TABLE seo_analyses (
  id bigint generated always as identity primary key,
  analysis_type text not null check (analysis_type in ('competitor', 'keyword', 'our_site', 'full_report')),
  data jsonb not null,
  recommendations jsonb,
  auto_applied boolean default false,
  created_at timestamptz default now()
);

-- 키워드 트래킹
CREATE TABLE keyword_tracking (
  id bigint generated always as identity primary key,
  keyword text not null,
  category text,
  our_google_rank integer,
  our_naver_rank integer,
  search_volume text,
  difficulty text,
  trend text check (trend in ('up', 'down', 'stable', 'new')),
  checked_at timestamptz default now()
);

-- 메타태그 변경 이력
CREATE TABLE seo_changes (
  id bigint generated always as identity primary key,
  page_path text not null,
  field_changed text not null,
  old_value text,
  new_value text,
  reason text,
  applied_at timestamptz default now()
);

-- RLS
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE keyword_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON competitors FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON seo_analyses FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON keyword_tracking FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON seo_changes FOR ALL TO anon USING (true) WITH CHECK (true);
