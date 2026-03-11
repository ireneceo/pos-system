import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * React Router로 페이지 전환 시 자동으로 스크롤을 최상단으로 이동시킵니다.
 *
 * 모바일(768px 이하)에서는 index.css에서 html=fixed, body=overflow-y:auto로
 * body가 스크롤 컨테이너이므로 document.body.scrollTop도 함께 초기화합니다.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
