create table if not exists conversion_events (
  id uuid default gen_random_uuid() primary key,
  event_type text not null,
  page text,
  referrer text,
  channel text,
  created_at timestamptz default now()
);

create index if not exists idx_conversion_events_created_at on conversion_events(created_at desc);
create index if not exists idx_conversion_events_event_type on conversion_events(event_type);
create index if not exists idx_conversion_events_channel on conversion_events(channel);

alter table conversion_events enable row level security;
create policy "Allow anonymous insert" on conversion_events for insert with check (true);
create policy "Allow service role select" on conversion_events for select using (true);

-- visits 테이블에 utm_campaign, landing_page 컬럼 추가
alter table visits add column if not exists utm_campaign text;
alter table visits add column if not exists landing_page text;
