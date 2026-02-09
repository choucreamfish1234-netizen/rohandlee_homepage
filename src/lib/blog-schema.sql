-- 블로그 포스트 테이블
CREATE TABLE blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  meta_description text,
  category text not null default '일반',
  tags text[] default '{}',
  thumbnail_url text,
  author text not null default '이유림 변호사',
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  view_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 인덱스
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_view_count ON blog_posts(view_count DESC);

-- RLS 활성화
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 읽기 정책: 모든 글 읽기 허용 (앱 코드에서 status 필터링)
-- 기존 정책 제거 후 재생성:
-- DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
-- DROP POLICY IF EXISTS "Admin full access" ON blog_posts;
CREATE POLICY "Allow read access" ON blog_posts
  FOR SELECT TO anon
  USING (true);

-- 쓰기 정책
CREATE POLICY "Allow insert access" ON blog_posts
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow update access" ON blog_posts
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete access" ON blog_posts
  FOR DELETE TO anon
  USING (true);

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_view_count(post_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- 네이버 블로그 연동 컬럼
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS naver_content text;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS naver_published boolean default false;

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
