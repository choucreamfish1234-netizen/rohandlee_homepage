-- 언론보도 테이블
create table press_articles (
  id uuid default gen_random_uuid() primary key,
  outlet text not null,           -- 매체명 (스타데일리뉴스 등)
  title text not null,            -- 기사 제목
  url text not null,              -- 클릭 시 이동할 링크 (블로그 내부 링크 또는 외부 링크)
  date text not null,             -- 보도일 (2026.03.19)
  image_url text,                 -- 대표 이미지 URL (관리자가 직접 업로드)
  display_order int default 0,    -- 표시 순서 (낮을수록 앞)
  visible boolean default true,   -- 노출 여부
  created_at timestamptz default now()
);

-- RLS 정책
alter table press_articles enable row level security;
create policy "누구나 읽기 가능" on press_articles for select using (true);
create policy "인증된 사용자 수정 가능" on press_articles for all using (auth.role() = 'authenticated');

-- 초기 데이터
insert into press_articles (outlet, title, url, date, display_order, visible)
values (
  '스타데일리뉴스',
  '피해자 전담 법률사무소 로앤이, 드라마 ''아너''와 닮은 현실 이야기',
  '/blog/honor-drama-real-story-lawfirm-rohandlee',
  '2026.03.19',
  1,
  true
);
