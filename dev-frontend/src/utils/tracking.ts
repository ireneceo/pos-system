// Marketing tracking — single source (docs/MARKETING_TRACKING.md · 2026-10-17 Fable 설계 · 2026-11-15 §11-3).
// 코드는 dataLayer 에 «사실» 만 올린다. GTM 이 없을 때(지금)는 track() 이 같은 이벤트를 gtag 로 GA4 에 바로 보낸다.
// 마케팅 경로 판정은 여기 하나 — 쿠키 배너 표시 · GTM 로드 · page_view 가 같은 함수를 쓴다.
import i18n from '../i18n';

// PurpleHere 전용 GTM 컨테이너는 없다(2026-11-15). 예전에 넣었던 번호는 PlanQ 컨테이너라 지웠다 — PlanQ 번호를 넣지 말 것.
// GA4 는 public/index.html 의 gtag.js(구글 태그 G-63F78ZL72X)가 싣는다. GTM 을 쓰게 되면 PurpleHere 전용 컨테이너 번호로.
export const GTM_CONTAINER_ID: string = 'GTM-XXXXXXX';
const GTM_PLACEHOLDER = 'GTM-XXXXXXX';

type DataLayerEntry = Record<string, unknown> | IArguments;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackingEnv = 'production' | 'development';

export function getTrackingEnv(): TrackingEnv {
  const host = window.location.hostname;
  return host === 'purplehere.com' || host === 'www.purplehere.com' ? 'production' : 'development';
}

// 공개 라우트(App.tsx PUBLIC ROUTES) 중 마케팅 사이트. 앱 화면(/pos·/restaurant·/kitchen·/mobile·
// /referral/dashboard 등·/dev-login·/login)은 넣지 않는다 — 허용목록.
export const MARKETING_PATHS = {
  exact: ['/', '/install', '/about', '/features', '/service', '/pricing', '/packages', '/contact', '/demo',
    '/signup', '/forgot-password', '/reset-password', '/company', '/privacy', '/account-deletion',
    '/terms', '/faq', '/referral-program', '/blog', '/docs', '/download', '/news',
    '/verify-email', '/referral/signup', '/referral/login'],
  prefix: ['/blog/', '/news/', '/docs/', '/shop/'],
};

export function isMarketingPath(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return MARKETING_PATHS.exact.includes(path) || MARKETING_PATHS.prefix.some(p => path.startsWith(p));
}

function dataLayer(): DataLayerEntry[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

let gtmLoaded = false;

export function ensureGtm(): void {
  if (gtmLoaded) return;
  gtmLoaded = true;
  dataLayer().push({
    environment: getTrackingEnv(),
    site_language: (i18n.language || 'en').slice(0, 2),
  });
  if (GTM_CONTAINER_ID === GTM_PLACEHOLDER) return;
  dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}

// 개인정보는 dataLayer 에 절대 올리지 않는다 — 호출부가 실수해도 여기서 한 번 더 뺀다.
const PII_KEYS = ['email', 'name', 'full_name', 'first_name', 'last_name', 'phone', 'address',
  'company_name', 'username', 'password', 'message'];

export type TrackParams = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, params: TrackParams = {}): void {
  const entry: Record<string, unknown> = { event };
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (PII_KEYS.includes(key.toLowerCase())) return;
    entry[key] = value;
  });
  dataLayer().push(entry);
  // GTM 이 없으면 dataLayer 의 이벤트 객체는 아무도 안 읽는다 → gtag 로 직접. page_view 는 index.html 의
  // gtag config + GA4 향상된 측정(페이지 변경)이 이미 보내므로 빼야 두 번이 안 된다.
  if (GTM_CONTAINER_ID === GTM_PLACEHOLDER && event !== 'page_view' && typeof window.gtag === 'function') {
    const { event: _event, ...eventParams } = entry;
    window.gtag('event', event, eventParams);
  }
}

const ROLE_KEYS: Record<string, string> = {
  'Restaurant Admin': 'restaurant',
  'Brand General': 'brand',
  'Foodcourt General': 'foodcourt',
  'Restaurant Owner': 'owner',
  'Supplier Admin': 'supplier',
};

export function roleKey(role: string | undefined): string | undefined {
  return role ? ROLE_KEYS[role] || role : undefined;
}

// 쿠키 동의 — localStorage 키·값은 예전 그대로(기존 방문자 선택 유지).
export const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';
export type ConsentChoice = 'accept_all' | 'essential_only';

function updateConsent(state: 'granted' | 'denied'): void {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function getStoredConsent(): string | null {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice === 'accept_all' ? 'true' : 'essential_only');
  } catch {
    // 저장 못 해도 이번 방문의 동의는 적용한다
  }
  updateConsent(choice === 'accept_all' ? 'granted' : 'denied');
  // 동의 선택률 측정(GTM 을 쓰게 되면 Meta 픽셀도 이 이벤트로 다시 평가)
  track('cookie_consent', { consent_choice: choice });
}

export function restoreConsent(): void {
  if (getStoredConsent() === 'true') updateConsent('granted');
}
