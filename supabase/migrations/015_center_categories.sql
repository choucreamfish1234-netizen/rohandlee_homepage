ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS center_categories jsonb DEFAULT '[]'::jsonb;
