ALTER TABLE visits ADD COLUMN IF NOT EXISTS source text;
CREATE INDEX IF NOT EXISTS idx_visits_source ON visits (source);
