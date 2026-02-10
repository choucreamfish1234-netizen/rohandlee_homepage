-- 방문자 분석 테이블

-- 1) page_views: 페이지 조회 기록
CREATE TABLE IF NOT EXISTS page_views (
  id bigint generated always as identity primary key,
  visitor_id text not null,
  session_id text not null,
  page_path text not null,
  page_title text,
  referrer text,
  referrer_type text, -- naver, google, daum, kakao, lawtalk, instagram, threads, youtube, direct, other
  search_keyword text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  device_type text, -- desktop, mobile, tablet
  device_brand text,
  browser text,
  os text,
  screen_resolution text,
  language text,
  country text,
  scroll_depth integer default 0,
  time_on_page integer default 0, -- seconds
  click_count integer default 0,
  is_bounce boolean default true,
  created_at timestamptz default now()
);

-- 2) consultation_events: 상담/전환 이벤트
CREATE TABLE IF NOT EXISTS consultation_events (
  id bigint generated always as identity primary key,
  visitor_id text not null,
  session_id text not null,
  event_type text not null, -- form_open, form_submit, kakao_click, phone_click, blog_read, case_view, center_view, cta_click
  event_label text,
  page_path text not null,
  referrer_type text,
  device_type text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 3) visitor_sessions: 방문 세션
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id bigint generated always as identity primary key,
  visitor_id text not null,
  session_id text unique not null,
  started_at timestamptz default now(),
  ended_at timestamptz,
  page_count integer default 0,
  total_duration integer default 0, -- seconds
  landing_page text,
  exit_page text,
  referrer_type text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device_type text,
  browser text,
  os text,
  is_new_visitor boolean default true,
  is_bounce boolean default true
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views (visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_referrer_type ON page_views (referrer_type);

CREATE INDEX IF NOT EXISTS idx_consultation_events_created ON consultation_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_events_type ON consultation_events (event_type);
CREATE INDEX IF NOT EXISTS idx_consultation_events_visitor ON consultation_events (visitor_id);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_started ON visitor_sessions (started_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor ON visitor_sessions (visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session ON visitor_sessions (session_id);

-- RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for anon" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service_role" ON page_views FOR SELECT USING (true);

CREATE POLICY "Allow insert for anon" ON consultation_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service_role" ON consultation_events FOR SELECT USING (true);

CREATE POLICY "Allow insert for anon" ON visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service_role" ON visitor_sessions FOR SELECT USING (true);
CREATE POLICY "Allow update for anon" ON visitor_sessions FOR UPDATE USING (true);
