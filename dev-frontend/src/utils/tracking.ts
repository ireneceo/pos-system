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
  sendMetaEvent(event, entry);
}

// ── Meta 픽셀 (2026-11-15 §11-4) ─────────────────────────────────────────────
// GTM 이 없으므로 GTM 가져오기 파일의 Meta 태그 5개와 같은 일을 여기서 한다(GTM 을 쓰게 되면 여기는 저절로 꺼짐).
// 조건(§1 결정 3·4·5): 운영 사이트(개발은 ?meta_debug=1 일 때만) · 쿠키 «모두 수락» 뒤에만 로드 ·
// 마케팅 화면의 page_view/전환만(page_view 는 PageViewTracker 가 마케팅 경로에서만 올림) · 고급 매칭·자동 수집 끔.
export const META_PIXEL_ID = '2307431686720469';

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[];
  push?: unknown; loaded?: boolean; version?: string; disablePushState?: boolean;
  allowDuplicatePageViews?: boolean };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let metaLoaded = false;

function metaDebugOn(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get('meta_debug') === '1') sessionStorage.setItem('meta_debug', '1');
    return sessionStorage.getItem('meta_debug') === '1';
  } catch {
    return false;
  }
}

function metaAllowed(): boolean {
  if (GTM_CONTAINER_ID !== GTM_PLACEHOLDER) return false; // GTM 이 맡으면 두 번 보내지 않는다
  if (getStoredConsent() !== 'true') return false; // ad_storage 동의(모두 수락) 전에는 로드도 안 함
  return getTrackingEnv() === 'production' || metaDebugOn();
}

function ensureMetaPixel(): Fbq | null {
  if (metaLoaded) return window.fbq || null;
  if (!metaAllowed()) return null;
  metaLoaded = true;
  if (!window.fbq) {
    // Meta 표준 기본 코드(fbevents.js) — 원문과 같은 동작
    const n: Fbq = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    } as Fbq;
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    // fbevents.js 는 화면 이동(history)마다 PageView 를 스스로 보낸다 → 끈다. 안 끄면 마케팅 화면은 두 번,
    // 앱 화면(/pos 등)에서도 PageView 가 나간다(2026-11-15 실측). PageView 는 PageViewTracker 하나만.
    n.disablePushState = true;
    // 대신 한 페이지(SPA)에서 PageView 를 한 번만 받는 기본값을 풀어 화면마다 1번(중복은 PageViewTracker 가 막음).
    n.allowDuplicatePageViews = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  window.fbq('set', 'autoConfig', false, META_PIXEL_ID); // 자동 이벤트·자동 고급 매칭 끔
  window.fbq('init', META_PIXEL_ID); // 사용자 정보(고급 매칭) 안 넘김
  return window.fbq;
}

function compact(params: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''));
}

function sendMetaEvent(event: string, entry: Record<string, unknown>): void {
  if (event === 'cookie_consent' && entry.consent_choice === 'essential_only') {
    if (window.fbq) window.fbq('consent', 'revoke');
    return;
  }
  let call: unknown[] | null = null;
  if (event === 'page_view') call = ['track', 'PageView'];
  else if (event === 'cookie_consent') {
    // «모두 수락» 직후 지금 화면의 PageView 1회(그 전 page_view 는 동의 전이라 안 보냈다)
    if (entry.consent_choice === 'accept_all' && isMarketingPath(window.location.pathname)) call = ['track', 'PageView'];
  } else if (event === 'sign_up') {
    call = ['track', 'CompleteRegistration', compact({ content_name: entry.account_type, status: 'pending_verification' })];
  } else if (event === 'generate_lead') {
    call = ['track', 'Lead', compact({ content_category: entry.lead_type, value: entry.value, currency: entry.currency })];
  } else if (event === 'try_demo') {
    call = ['trackCustom', 'TryDemo', compact({ content_name: entry.demo_account })];
  }
  if (!call) return;
  const fbq = ensureMetaPixel();
  if (!fbq) return;
  if (event === 'cookie_consent') fbq('consent', 'grant');
  fbq(...call);
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
  // 동의 선택률 측정 + Meta 픽셀이 이 이벤트로 다시 평가(수락=로드·PageView / 필수만=revoke)
  track('cookie_consent', { consent_choice: choice });
}

export function restoreConsent(): void {
  if (getStoredConsent() === 'true') updateConsent('granted');
}
