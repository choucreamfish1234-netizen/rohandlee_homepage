-- Roh&Lee China Desk 상담신청 테이블
-- Supabase SQL Editor 에서 한 번 실행. (RO-ZIC 과 같은 프로젝트를 써도 되고 별도 프로젝트도 가능)

create table if not exists public.klh_consultations (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  status         text not null default 'new'
                 check (status in ('new','contacted','scheduled','retained','closed','spam')),
  urgent         boolean not null default false,
  name           text not null,
  contact_method text not null,
  contact_value  text not null,          -- 답변 채널의 ID (reply_via 기준)
  wechat_id      text,
  kakao_id       text,
  phone          text,
  reply_via      text,                    -- wechat | kakaotalk
  country        text,
  case_type      text not null,
  role           text not null,
  stage          text,
  description    text,
  locale         text,
  page           text,
  memo           text
);

create index if not exists klh_consultations_created_idx on public.klh_consultations (created_at desc);
create index if not exists klh_consultations_status_idx  on public.klh_consultations (status);

-- RLS 켜고 정책은 만들지 않는다 → 브라우저(anon 키)로는 읽기·쓰기 불가.
-- 서버(API·관리자 페이지)만 service_role 키로 접근한다.
alter table public.klh_consultations enable row level security;

-- ─────────────────────────────────────────────
-- 사이트 설정 (변호사 사진 등) — 관리자 페이지에서 수정
create table if not exists public.klh_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.klh_settings enable row level security;

-- 변호사 사진 저장용 공개 버킷 (사이트에서 이미지를 바로 보여 주기 위해 public)
insert into storage.buckets (id, name, public)
values ('klh-media', 'klh-media', true)
on conflict (id) do nothing;

-- ─────────────────────────────────────────────
-- (이미 테이블을 만든 경우) 위챗·카카오톡 답변 채널 컬럼 추가
alter table public.klh_consultations add column if not exists wechat_id text;
alter table public.klh_consultations add column if not exists kakao_id  text;
alter table public.klh_consultations add column if not exists phone     text;
alter table public.klh_consultations add column if not exists reply_via text;
