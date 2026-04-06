-- 인스타툰 테이블
create table if not exists webtoons (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  link_url text,
  display_order int default 0,
  visible boolean default true,
  created_at timestamptz default now()
);

alter table webtoons enable row level security;
create policy "누구나 읽기" on webtoons for select using (true);
create policy "인증 사용자 전체 권한" on webtoons for all using (auth.role() = 'authenticated');

-- 스토리지 버킷
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'webtoon-images',
  'webtoon-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set public = true;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'webtoon-images 누구나 읽기') then
    create policy "webtoon-images 누구나 읽기" on storage.objects
      for select using (bucket_id = 'webtoon-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'webtoon-images 누구나 업로드') then
    create policy "webtoon-images 누구나 업로드" on storage.objects
      for insert with check (bucket_id = 'webtoon-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'webtoon-images 누구나 수정') then
    create policy "webtoon-images 누구나 수정" on storage.objects
      for update using (bucket_id = 'webtoon-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'webtoon-images 누구나 삭제') then
    create policy "webtoon-images 누구나 삭제" on storage.objects
      for delete using (bucket_id = 'webtoon-images');
  end if;
end $$;
