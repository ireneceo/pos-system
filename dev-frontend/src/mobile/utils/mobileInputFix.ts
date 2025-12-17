/**
 * iOS Safari에서 input focus 시 zoom되었다가 blur 후에도
 * 원래 viewport로 돌아가지 않는 문제를 해결합니다.
 *
 * 사용법:
 * 1. 개별 input에 onBlur={resetViewportOnBlur} 추가
 * 2. 또는 useEffect에서 setupMobileInputHandlers() 호출
 */

/**
 * input blur 시 viewport를 리셋하는 핸들러
 * onBlur 이벤트에 직접 사용
 */
export const resetViewportOnBlur = () => {
  // iOS Safari에서 zoom 리셋
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    // 약간의 딜레이 후 스크롤로 viewport 리셋
    setTimeout(() => {
      window.scrollTo(0, window.scrollY);
    }, 100);
  }
};

/**
 * 모든 input/textarea에 자동으로 blur 핸들러를 추가
 * useEffect에서 한 번 호출하면 됨
 */
export const setupMobileInputHandlers = () => {
  if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    return () => {}; // cleanup 함수
  }

  const handleBlur = () => {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY);
    }, 100);
  };

  // 이벤트 위임으로 모든 input/textarea 처리
  const handleFocusOut = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      handleBlur();
    }
  };

  document.addEventListener('focusout', handleFocusOut);

  return () => {
    document.removeEventListener('focusout', handleFocusOut);
  };
};
