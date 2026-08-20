# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/context-switch.spec.js >> 멀티 컨텍스트 로그인 >> ① 무회귀 — 모자가 없으면 픽커가 뜨지 않고 기존 대시보드로 간다
- Location: e2e/context-switch.spec.js:36:3

# Error details

```
Error: [demo-guard] E2E 는 dev(dev.purplehere.com) 에서만 실행 가능. 현재 baseURL=undefined — 운영/기타 도메인 차단.
```

# Test source

```ts
  1  | // @ts-check
  2  | /**
  3  |  * demo-guard.js — E2E 운영 데이터 오염 방지 안전 레일 (단일 소스)
  4  |  * ------------------------------------------------------------------
  5  |  * CLAUDE.md 절대 규칙: E2E 는 demo restaurant(dev id=38) 만 사용. 운영 매장 주문/결제/재고
  6  |  * 변경 절대 금지. 이 모듈이 모든 시나리오의 공통 전제 가드다 —
  7  |  *   1) baseURL 이 dev 인지 (운영 도메인이면 즉시 throw)
  8  |  *   2) 로그인 토큰의 restaurant_id 가 DEMO_RESTAURANT_ID 인지 (아니면 mutation 금지)
  9  |  * 어떤 시나리오든 DB 를 바꾸기(주문 생성 등) 전에 assertDemoContext() 를 반드시 통과시킨다.
  10 |  */
  11 | const DEMO_RESTAURANT_ID = 38;               // demo-korean-bbq (CLAUDE.md /검증)
  12 | const DEV_HOST = 'dev.purplehere.com';
  13 | 
  14 | // demo-login 키 → 역할 (LoginPage 의 Test Accounts 와 동기화). admin/manager 는 demo 계정 없음.
  15 | const DEMO_KEYS = {
  16 |   brand:      'test_brand_general',
  17 |   foodcourt:  'test_foodcourt_general',
  18 |   owner:      'test_restaurant_owner',
  19 |   restaurant: 'test_restaurant_admin',    // rid=38 아님(K-DINE rid=5) — 읽기 시나리오 전용
  20 |   staff:      'test_staff',
  21 |   demoStore:  'demo_restaurant_admin',    // rid=38 — mutation 시나리오는 반드시 이 키
  22 |   supplier:   'demo_supplier_admin',
  23 | };
  24 | 
  25 | function apiBase(baseURL) {
  26 |   // dev 프론트와 같은 오리진의 /api (nginx 프록시)
  27 |   return baseURL.replace(/\/$/, '') + '/api';
  28 | }
  29 | 
  30 | function assertDevBaseURL(baseURL) {
  31 |   if (!baseURL || !baseURL.includes(DEV_HOST)) {
> 32 |     throw new Error(`[demo-guard] E2E 는 dev(${DEV_HOST}) 에서만 실행 가능. 현재 baseURL=${baseURL} — 운영/기타 도메인 차단.`);
     |           ^ Error: [demo-guard] E2E 는 dev(dev.purplehere.com) 에서만 실행 가능. 현재 baseURL=undefined — 운영/기타 도메인 차단.
  33 |   }
  34 | }
  35 | 
  36 | /** demo-login 으로 토큰 획득. @returns {Promise<{token, user}>} */
  37 | async function demoLogin(request, baseURL, key) {
  38 |   assertDevBaseURL(baseURL);
  39 |   const res = await request.post(apiBase(baseURL) + '/auth/demo-login', { data: { key } });
  40 |   if (!res.ok()) throw new Error(`[demo-guard] demo-login 실패 (${key}): HTTP ${res.status()}`);
  41 |   const body = await res.json();
  42 |   const token = body.token || (body.data && body.data.token);
  43 |   const user = body.user || (body.data && body.data.user) || {};
  44 |   if (!token) throw new Error(`[demo-guard] 토큰 없음 (${key})`);
  45 |   return { token, user };
  46 | }
  47 | 
  48 | /** mutation 전 필수 게이트: 컨텍스트가 demo(id=38) 인지 확인. 아니면 throw. */
  49 | function assertDemoContext(baseURL, user) {
  50 |   assertDevBaseURL(baseURL);
  51 |   if (Number(user && user.restaurant_id) !== DEMO_RESTAURANT_ID) {
  52 |     throw new Error(`[demo-guard] mutation 차단 — restaurant_id=${user && user.restaurant_id} ≠ demo(${DEMO_RESTAURANT_ID}). 데이터 변경 시나리오는 demo_restaurant_admin 키(rid=38)만 허용.`);
  53 |   }
  54 | }
  55 | 
  56 | /** 로그인 상태를 localStorage 로 주입한 브라우저 컨텍스트 storageState 생성 */
  57 | function storageStateFor(baseURL, token, role) {
  58 |   return {
  59 |     cookies: [],
  60 |     origins: [{
  61 |       origin: baseURL.replace(/\/$/, ''),
  62 |       localStorage: [
  63 |         { name: 'auth_token', value: token },
  64 |         { name: 'currentUserRole', value: role },
  65 |       ],
  66 |     }],
  67 |   };
  68 | }
  69 | 
  70 | /** 브라우저 컨텍스트에 토큰 주입(mount 진입 전). 시나리오 a 의 inline 패턴을 공용화. */
  71 | async function injectAuth(context, token, role) {
  72 |   await context.addInitScript(([t, r]) => {
  73 |     localStorage.setItem('auth_token', t);
  74 |     localStorage.setItem('currentUserRole', r);
  75 |   }, [token, role]);
  76 | }
  77 | 
  78 | /** API 인증 헤더 */
  79 | function authHeaders(token) {
  80 |   return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  81 | }
  82 | 
  83 | // ErrorBoundary/크래시 마커(시나리오 a 와 동일 기준) — mount 무크래시 판정 단일 소스.
  84 | const CRASH_MARKERS = ['Something went wrong', 'ErrorBoundary', 'Application error', 'TypeError:'];
  85 | function bodyLooksCrashed(text) {
  86 |   return CRASH_MARKERS.some((m) => String(text || '').includes(m));
  87 | }
  88 | 
  89 | module.exports = { DEMO_RESTAURANT_ID, DEMO_KEYS, demoLogin, assertDemoContext, assertDevBaseURL, storageStateFor, apiBase, injectAuth, authHeaders, CRASH_MARKERS, bodyLooksCrashed };
  90 | 
```