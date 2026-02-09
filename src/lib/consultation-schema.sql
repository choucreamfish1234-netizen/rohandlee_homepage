-- 기존 consultations 테이블에 컬럼 추가
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS status text default 'new' check (status in ('new', 'analyzed', 'sent', 'called'));
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS grade text check (grade in ('A', 'B', 'C', 'D'));
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS ai_analysis jsonb;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS email_draft text;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS email_sent_at timestamptz;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS assigned_to text;

-- ai_analysis 구조 예시:
-- {
--   "case_category": "성범죄",
--   "case_subcategory": "디지털성범죄",
--   "urgency": "높음",
--   "statute_of_limitations": "7년 (잔여 약 5년)",
--   "estimated_fee_range": "300만~500만원",
--   "key_issues": ["증거 확보 시급", "피해자 보호명령 필요"],
--   "recommended_action": "대면 상담 권유",
--   "grade_reason": "증거 충분, 피해 심각, 수임 가능성 높음"
-- }

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_grade ON consultations(grade);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

-- RLS 정책 (이미 활성화되어 있을 수 있음)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access" ON consultations
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow insert access" ON consultations
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow update access" ON consultations
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
