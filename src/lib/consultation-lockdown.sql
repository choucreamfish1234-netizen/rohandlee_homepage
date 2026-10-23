-- 상담 테이블 공개 접근 차단
-- 반드시 서버 접수·관리자 API가 배포된 뒤에 실행한다.
-- RLS를 켜고 정책을 모두 지우면 anon(공개 키)은 읽기·쓰기·수정·삭제가 모두 막히고,
-- 서버의 service role 키만 접근할 수 있다.

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE paid_consultations ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public' AND tablename IN ('consultations', 'paid_consultations')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- 확인: 아래 결과가 0건이어야 한다.
SELECT tablename, policyname FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('consultations', 'paid_consultations');
