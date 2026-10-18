// Marketing tracking — single source (docs/MARKETING_TRACKING.md · 2026-10-17 Fable 설계).
// 코드는 dataLayer 에 «사실» 만 올린다. GA4·Meta Pixel 은 전부 GTM 안의 태그다.
// 마케팅 경로 판정은 여기 하나 — 쿠키 배너 표시 · GTM 로드 · page_view 가 같은 함수를 쓴다.
import i18n from '../i18n';

// Irene 발급 값으로 교체. 코드에 들어가는 외부 ID 는 이것 하나.
// 교체할 때 같은 커밋에서 public/index.html 의 gtag.js 직접 삽입 블록을 지운다(GTM 이 GA4 를 대신 싣는다).
// 그 전까지는 GA4 가 지금처럼 index.html 로 돈다 — GTM 게시 전에 운영에 나가도 GA4 가 끊기지 않게.
export const GTM_CONTAINER_ID = 'GTM-XXXXXXX';
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
  // GTM 이 Meta 픽셀을 이 이벤트로 다시 평가한다(ad_storage granted 뒤에만 로드)
  track('cookie_consent', { consent_choice: choice });
}

export function restoreConsent(): void {
  if (getStoredConsent() === 'true') updateConsent('granted');
}
