-- 페이지 콘텐츠 저장 테이블
CREATE TABLE IF NOT EXISTS site_content (
  id bigint generated always as identity primary key,
  page text not null,
  section text not null,
  field_key text not null,
  field_type text not null check (field_type in ('text', 'image', 'link')),
  value text not null,
  updated_at timestamptz default now(),
  UNIQUE(page, section, field_key)
);

-- RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거
DROP POLICY IF EXISTS "Public read" ON site_content;
DROP POLICY IF EXISTS "Admin write" ON site_content;

-- 누구나 읽기 가능
CREATE POLICY "Public read" ON site_content
  FOR SELECT TO anon USING (true);

-- 쓰기도 허용 (관리자 인증은 프론트에서 처리)
CREATE POLICY "Admin write" ON site_content
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- updated_at 자동 갱신 함수 (없으면 생성)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거
DROP TRIGGER IF EXISTS site_content_updated_at ON site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Supabase Storage: site-images 버킷 (공개)
-- Supabase Dashboard > Storage에서 수동으로 생성하거나 아래 SQL 사용:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);
