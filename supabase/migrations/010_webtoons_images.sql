-- 인스타툰 다중 이미지 지원: images jsonb 컬럼 추가
ALTER TABLE webtoons ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;

-- 기존 image_url 데이터를 images 배열로 마이그레이션
UPDATE webtoons
SET images = jsonb_build_array(image_url)
WHERE image_url IS NOT NULL AND (images IS NULL OR images = '[]'::jsonb);
