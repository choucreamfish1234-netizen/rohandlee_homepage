create table if not exists lawyers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  title text not null,
  specialties text,
  description text,
  image_url text,
  is_representative boolean default false,
  display_order int default 0,
  visible boolean default true,
  created_at timestamptz default now()
);

alter table lawyers enable row level security;
create policy "누구나 읽기" on lawyers for select using (true);
create policy "인증 사용자 전체 권한" on lawyers for all using (auth.role() = 'authenticated');

-- 스토리지 버킷
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lawyer-images', 'lawyer-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'lawyer-images 누구나 읽기') then
    create policy "lawyer-images 누구나 읽기" on storage.objects for select using (bucket_id = 'lawyer-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'lawyer-images 누구나 업로드') then
    create policy "lawyer-images 누구나 업로드" on storage.objects for insert with check (bucket_id = 'lawyer-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'lawyer-images 누구나 수정') then
    create policy "lawyer-images 누구나 수정" on storage.objects for update using (bucket_id = 'lawyer-images');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'lawyer-images 누구나 삭제') then
    create policy "lawyer-images 누구나 삭제" on storage.objects for delete using (bucket_id = 'lawyer-images');
  end if;
end $$;

-- 기존 대표변호사 데이터 삽입
insert into lawyers (name, title, specialties, description, image_url, is_representative, display_order) values
('이유림', '대표변호사', '성범죄·디지털성범죄·스토킹', '끝까지 당신의 편에 서겠습니다. 피해자의 시간 앞에서 겸허히 걷겠습니다.', null, true, 1),
('노채은', '대표변호사', '재산범죄·사기·횡령', '무뎌진 언어 뒤에도 도저히 묻혀지지 않는 마음이 있습니다.', null, true, 2),
('김주은', '변호사', '고소대리·이의신청', null, null, false, 3);
