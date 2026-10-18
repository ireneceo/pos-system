import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../../i18n';
import { ensureGtm, isMarketingPath, track } from '../../utils/tracking';

// 마케팅 경로의 page_view (SPA 이동 포함) — docs/MARKETING_TRACKING.md §3-3.
// 앱 화면에서는 GTM 을 로드하지도, 페이지뷰를 올리지도 않는다.
const PageViewTracker: React.FC = () => {
  const { pathname } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isMarketingPath(pathname)) {
      lastPath.current = null;
      return;
    }
    if (lastPath.current === pathname) return;
    ensureGtm();
    // Helmet 이 제목을 바꾼 뒤 읽는다
    const timer = setTimeout(() => {
      lastPath.current = pathname;
      track('page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
        page_language: (i18n.language || 'en').slice(0, 2),
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default PageViewTracker;
