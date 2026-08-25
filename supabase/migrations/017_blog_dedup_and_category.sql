-- 1. 중복 블로그 글 통합: 삭제되는 글을 unpublish (slug은 리다이렉트용으로 유지)
-- 각 쌍에서 더 상세한(긴) 글을 남기고, 나머지를 unpublish

-- 중고거래 사기: "secondhand-trade-fraud-prosecution"을 남기고 다른 것 unpublish
UPDATE blog_posts SET status = 'draft'
WHERE slug LIKE '%중고거래-사기-환불%' OR slug LIKE '%secondhand-fraud-refund%'
AND status = 'published';

-- 국선변호사: 더 상세한 글을 남기고
UPDATE blog_posts SET status = 'draft'
WHERE slug LIKE '%국선변호사-활용%' OR slug LIKE '%public-defender-usage%'
AND status = 'published';

-- 개인회생 신청 자격: 더 상세한 "총정리" 글을 남기고
UPDATE blog_posts SET status = 'draft'
WHERE slug LIKE '%개인회생-신청-자격-가능%' OR slug LIKE '%personal-rehabilitation-eligibility%'
AND status = 'published';

-- 보이스피싱 환급: "총정리" 글을 남기고
UPDATE blog_posts SET status = 'draft'
WHERE slug LIKE '%보이스피싱-환급-늦지%' OR slug LIKE '%voice-phishing-refund-not-late%'
AND status = 'published';

-- 2. "채무구제" 카테고리 생성 및 개인회생/파산 글 재분류
UPDATE blog_posts SET category = '채무구제'
WHERE (
  title LIKE '%개인회생%'
  OR title LIKE '%개인파산%'
  OR title LIKE '%파산 신청%'
  OR title LIKE '%채무%'
  OR title LIKE '%면책%'
  OR title LIKE '%회생 신청%'
)
AND category IN ('재산회복', '재산범죄', '법률정보')
AND status = 'published';

-- 3. 학교폭력 글 제목 개선 (기계적 "총정리"/"완벽 가이드" 제거)
-- 실제 slug/제목은 관리자가 확인 후 수동 실행 권장
-- UPDATE blog_posts SET title = '학교폭력 가해자 처벌과 신고, 부모가 알아야 할 모든 것'
-- WHERE slug = 'school-violence-perpetrator-punishment-report' AND title LIKE '%총정리%';
