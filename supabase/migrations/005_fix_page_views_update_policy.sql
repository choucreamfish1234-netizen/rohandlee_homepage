-- page_views 테이블에 UPDATE RLS 정책 추가
-- flush() 함수에서 scroll_depth, time_on_page, click_count, is_bounce 업데이트 시 필요
CREATE POLICY "Allow update for anon" ON page_views FOR UPDATE USING (true);
