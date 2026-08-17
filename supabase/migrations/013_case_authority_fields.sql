-- Case Authority Database: taxonomy fields for structured case data
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS practice_area TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS representation_side TEXT DEFAULT 'victim';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS offense_types TEXT[] DEFAULT '{}';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS procedure_stages TEXT[] DEFAULT '{}';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS services_provided TEXT[] DEFAULT '{}';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS outcome_types TEXT[] DEFAULT '{}';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS lawyer_ids TEXT[] DEFAULT '{}';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS strategy TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS result_detail TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS anonymization_reviewed BOOLEAN DEFAULT false;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
