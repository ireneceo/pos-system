import { useEffect, useState } from 'react';
import type { Customer, GuestInfo } from './types';

// 현재 URL이 모바일 슬러그 경로일 때만 slug 반환 (예: /mobile/downtown-pizza/... → 'downtown-pizza')
function getCurrentMobileSlug(): string | null {
  if (typeof window === 'undefined') return null;
  const m = window.location.pathname.match(/\/mobile\/([^/]+)/);
  return m ? m[1] : null;
}

function customerKey(slug: string | null): string {
  return slug ? `mobile_customer:${slug}` : 'mobile_customer';
}

function guestKey(slug: string | null): string {
  return slug ? `mobile_guest:${slug}` : 'mobile_guest';
}

function readJson<T>(key: string): T | null {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// 최초 로드 시 레거시(스코프 없는) 모바일 세션 정리
// slug URL에 진입한 경우에만 수행 — cross-restaurant 세션 오염 방지
function cleanupLegacySessionOnce() {
  if (typeof window === 'undefined') return;
  if (!getCurrentMobileSlug()) return;
  try {
    localStorage.removeItem('mobile_customer');
    localStorage.removeItem('mobile_guest');
    localStorage.removeItem('mobile_token');
  } catch {
    /* ignore */
  }
}

// history.pushState/replaceState 패치 — SPA 네비게이션 시 locationchange 이벤트 발생
// (react-router의 내부 pushState는 popstate를 발화하지 않기 때문)
if (typeof window !== 'undefined' && !(window as any).__locationChangePatched) {
  (window as any).__locationChangePatched = true;
  const origPushState = window.history.pushState;
  window.history.pushState = function (...args: Parameters<typeof window.history.pushState>) {
    (origPushState as any).apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
  };
  const origReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args: Parameters<typeof window.history.replaceState>) {
    (origReplaceState as any).apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
  };
  window.addEventListener('popstate', () => window.dispatchEvent(new Event('locationchange')));
}

// 모바일 고객 로그인 상태 훅 (레스토랑 slug별 스코프)
// - slug 단위로 localStorage 키 분리 → 레스토랑 간 세션 격리
// - SPA 네비게이션 시 slug 변경을 감지하여 상태 재로드
// - 첫 로드 시 레거시(스코프 없는) 세션 자동 정리
export function useMobileCustomerState() {
  // 첫 렌더에만 레거시 정리 실행
  useState(() => {
    cleanupLegacySessionOnce();
    return true;
  });

  const [currentSlug, setCurrentSlug] = useState<string | null>(getCurrentMobileSlug);

  const [currentCustomer, setCurrentCustomerState] = useState<Customer | null>(() =>
    readJson<Customer>(customerKey(getCurrentMobileSlug()))
  );

  const [guestInfo, setGuestInfoState] = useState<GuestInfo | null>(() =>
    readJson<GuestInfo>(guestKey(getCurrentMobileSlug()))
  );

  // SPA 네비게이션 시 slug가 바뀌면 해당 slug의 저장된 세션을 재로드
  useEffect(() => {
    const onLocationChange = () => {
      const newSlug = getCurrentMobileSlug();
      if (newSlug !== currentSlug) {
        setCurrentSlug(newSlug);
        setCurrentCustomerState(readJson<Customer>(customerKey(newSlug)));
        setGuestInfoState(readJson<GuestInfo>(guestKey(newSlug)));
      }
    };
    window.addEventListener('locationchange', onLocationChange);
    return () => window.removeEventListener('locationchange', onLocationChange);
  }, [currentSlug]);

  const setCurrentCustomer = (customer: Customer | null) => {
    setCurrentCustomerState(customer);
    const key = customerKey(getCurrentMobileSlug());
    if (customer) {
      localStorage.setItem(key, JSON.stringify(customer));
    } else {
      localStorage.removeItem(key);
    }
  };

  const setGuestInfo = (guest: GuestInfo | null) => {
    setGuestInfoState(guest);
    const key = guestKey(getCurrentMobileSlug());
    if (guest) {
      localStorage.setItem(key, JSON.stringify(guest));
    } else {
      localStorage.removeItem(key);
    }
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    setGuestInfo(null);
    try {
      const slug = getCurrentMobileSlug();
      localStorage.removeItem(slug ? `mobile_token:${slug}` : 'mobile_token');
    } catch {
      /* ignore */
    }
  };

  const isGuest = !currentCustomer && !!guestInfo;

  return {
    currentCustomer,
    guestInfo,
    isGuest,
    setCurrentCustomer,
    setGuestInfo,
    logoutCustomer,
  };
}
