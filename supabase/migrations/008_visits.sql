-- 유입 채널 추적 테이블
create table if not exists visits (
  id uuid default gen_random_uuid() primary key,
  page text not null,
  referrer text,
  channel text,
  utm_source text,
  utm_medium text,
  user_agent text,
  created_at timestamptz default now()
);

alter table visits enable row level security;

create policy "누구나 삽입" on visits for insert with check (true);
create policy "인증 사용자 읽기" on visits for select using (auth.role() = 'authenticated');

create index if not exists idx_visits_created on visits (created_at desc);
create index if not exists idx_visits_channel on visits (channel);
create index if not exists idx_visits_page on visits (page);
