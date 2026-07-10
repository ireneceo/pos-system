// @ts-check
/**
 * demo-guard.js — E2E 운영 데이터 오염 방지 안전 레일 (단일 소스)
 * ------------------------------------------------------------------
 * CLAUDE.md 절대 규칙: E2E 는 demo restaurant(dev id=38) 만 사용. 운영 매장 주문/결제/재고
 * 변경 절대 금지. 이 모듈이 모든 시나리오의 공통 전제 가드다 —
 *   1) baseURL 이 dev 인지 (운영 도메인이면 즉시 throw)
 *   2) 로그인 토큰의 restaurant_id 가 DEMO_RESTAURANT_ID 인지 (아니면 mutation 금지)
 * 어떤 시나리오든 DB 를 바꾸기(주문 생성 등) 전에 assertDemoContext() 를 반드시 통과시킨다.
 */
const DEMO_RESTAURANT_ID = 38;               // demo-korean-bbq (CLAUDE.md /검증)
const DEV_HOST = 'dev.purplehere.com';

// demo-login 키 → 역할 (LoginPage 의 Test Accounts 와 동기화). admin/manager 는 demo 계정 없음.
const DEMO_KEYS = {
  brand:      'test_brand_general',
  foodcourt:  'test_foodcourt_general',
  owner:      'test_restaurant_owner',
  restaurant: 'test_restaurant_admin',    // rid=38 아님(K-DINE rid=5) — 읽기 시나리오 전용
  staff:      'test_staff',
  demoStore:  'demo_restaurant_admin',    // rid=38 — mutation 시나리오는 반드시 이 키
  supplier:   'demo_supplier_admin',
};

function apiBase(baseURL) {
  // dev 프론트와 같은 오리진의 /api (nginx 프록시)
  return baseURL.replace(/\/$/, '') + '/api';
}

function assertDevBaseURL(baseURL) {
  if (!baseURL || !baseURL.includes(DEV_HOST)) {
    throw new Error(`[demo-guard] E2E 는 dev(${DEV_HOST}) 에서만 실행 가능. 현재 baseURL=${baseURL} — 운영/기타 도메인 차단.`);
  }
}

/** demo-login 으로 토큰 획득. @returns {Promise<{token, user}>} */
async function demoLogin(request, baseURL, key) {
  assertDevBaseURL(baseURL);
  const res = await request.post(apiBase(baseURL) + '/auth/demo-login', { data: { key } });
  if (!res.ok()) throw new Error(`[demo-guard] demo-login 실패 (${key}): HTTP ${res.status()}`);
  const body = await res.json();
  const token = body.token || (body.data && body.data.token);
  const user = body.user || (body.data && body.data.user) || {};
  if (!token) throw new Error(`[demo-guard] 토큰 없음 (${key})`);
  return { token, user };
}

/** mutation 전 필수 게이트: 컨텍스트가 demo(id=38) 인지 확인. 아니면 throw. */
function assertDemoContext(baseURL, user) {
  assertDevBaseURL(baseURL);
  if (Number(user && user.restaurant_id) !== DEMO_RESTAURANT_ID) {
    throw new Error(`[demo-guard] mutation 차단 — restaurant_id=${user && user.restaurant_id} ≠ demo(${DEMO_RESTAURANT_ID}). 데이터 변경 시나리오는 demo_restaurant_admin 키(rid=38)만 허용.`);
  }
}

/** 로그인 상태를 localStorage 로 주입한 브라우저 컨텍스트 storageState 생성 */
function storageStateFor(baseURL, token, role) {
  return {
    cookies: [],
    origins: [{
      origin: baseURL.replace(/\/$/, ''),
      localStorage: [
        { name: 'auth_token', value: token },
        { name: 'currentUserRole', value: role },
      ],
    }],
  };
}

/** 브라우저 컨텍스트에 토큰 주입(mount 진입 전). 시나리오 a 의 inline 패턴을 공용화. */
async function injectAuth(context, token, role) {
  await context.addInitScript(([t, r]) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('currentUserRole', r);
  }, [token, role]);
}

/** API 인증 헤더 */
function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

// ErrorBoundary/크래시 마커(시나리오 a 와 동일 기준) — mount 무크래시 판정 단일 소스.
const CRASH_MARKERS = ['Something went wrong', 'ErrorBoundary', 'Application error', 'TypeError:'];
function bodyLooksCrashed(text) {
  return CRASH_MARKERS.some((m) => String(text || '').includes(m));
}

module.exports = { DEMO_RESTAURANT_ID, DEMO_KEYS, demoLogin, assertDemoContext, assertDevBaseURL, storageStateFor, apiBase, injectAuth, authHeaders, CRASH_MARKERS, bodyLooksCrashed };
