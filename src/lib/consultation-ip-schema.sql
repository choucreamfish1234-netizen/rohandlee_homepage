-- 상담 신청 접속 기록 (IP 등)
-- 서버(service role)만 읽고 쓸 수 있도록 RLS를 켜고 anon 정책은 만들지 않는다.
CREATE TABLE IF NOT EXISTS consultation_ip_logs (
  id bigserial PRIMARY KEY,
  consultation_id text,
  ip text,
  user_agent text,
  referer text,
  country text,
  city text,
  blocked boolean NOT NULL DEFAULT false,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consultation_ip_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_consultation_ip_logs_ip_created ON consultation_ip_logs(ip, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_ip_logs_consultation ON consultation_ip_logs(consultation_id);

-- 보유 기간(1년)이 지난 접속 기록 삭제 — 주기적으로 실행하거나 pg_cron에 등록
-- DELETE FROM consultation_ip_logs WHERE created_at < now() - interval '1 year';
