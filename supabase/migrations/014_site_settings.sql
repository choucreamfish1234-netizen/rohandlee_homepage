create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
alter table site_settings enable row level security;
create policy "누구나 읽기" on site_settings for select using (true);
create policy "서비스롤 수정" on site_settings for all using (true);
