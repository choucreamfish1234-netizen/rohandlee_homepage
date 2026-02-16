-- consultations: 상담 접수 테이블
CREATE TABLE IF NOT EXISTS consultations (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text,
  category text,
  content text,
  privacy_consent boolean default true,
  status text default 'new',
  grade text,
  ai_analysis jsonb,
  email_draft text,
  assigned_to text,
  email_sent_at timestamptz,
  notes text,
  created_at timestamptz default now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations (status);
CREATE INDEX IF NOT EXISTS idx_consultations_grade ON consultations (grade);

-- RLS
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for anon" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for anon" ON consultations FOR SELECT USING (true);
CREATE POLICY "Allow update for anon" ON consultations FOR UPDATE USING (true);
