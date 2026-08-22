#!/usr/bin/env node
/**
 * Purple POS — Health Check
 *
 * 핵심 기능 + 보안 정책의 영구 자동 검증 스크립트
 *
 * 사용법:
 *   node scripts/health-check.js                    # 전체 검증
 *   node scripts/health-check.js --category=auth    # 특정 카테고리만
 *   node scripts/health-check.js --verbose          # 상세 출력 (응답 본문)
 *   node scripts/health-check.js --quiet            # 통과는 숨김, 실패만
 *   node scripts/health-check.js --host=https://purplehere.com  # 운영서버 검증
 *
 * Exit code: 0 = 모두 통과, 1 = 하나라도 실패
 *
 * 카테고리:
 *   auth      — 인증 시스템 (admin JWT, customer JWT 발급)
 *   security  — 보안 가드 (익명 차단, IDOR 방어)
 *   pos       — POS 핵심 API (주문/메뉴/인보이스/대시보드)
 *   mobile    — 모바일 공개 + 자가서비스
 *   payment   — 결제 라우트 (시간 윈도우 + 위변조 방어)
 *
 * 작성: Phase D-2 (2026-04-10)
 * 목적: 신규 개발이 기존 기능을 망가뜨리지 않도록 영구 안전망 구축
 */

require('dotenv').config();
const http = require('http');
const https = require('https');
const jwt = require('jsonwebtoken');

// ============================================
// CLI 옵션 파싱
// ============================================
const args = process.argv.slice(2);
const opts = {
  category: null,
  verbose: false,
  quiet: false,
  host: 'http://localhost:3001',
};
for (const arg of args) {
  if (arg.startsWith('--category=')) opts.category = arg.split('=')[1];
  else if (arg === '--verbose') opts.verbose = true;
  else if (arg === '--quiet') opts.quiet = true;
  else if (arg.startsWith('--host=')) opts.host = arg.split('=')[1];
  else if (arg === '--help' || arg === '-h') {
    console.log(`Usage: node scripts/health-check.js [options]

Options:
  --category=NAME   특정 카테고리만 실행 (auth, security, pos, mobile, payment, referral)
  --verbose         응답 본문까지 출력
  --quiet           통과는 숨기고 실패만
  --host=URL        대상 호스트 (기본: http://localhost:3001)
  --help, -h        도움말
`);
    process.exit(0);
  }
}

const BASE = `${opts.host}/api`;

// ============================================
// HTTP 헬퍼
// ============================================
function request(method, path, body, headers = {}) {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;
    const reqOpts = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
    };
    const req = lib.request(reqOpts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        // headers 도 함께 반환 — 응답 헤더로 계약을 표현하는 케이스가 있다
        // (예: 멀티 컨텍스트 폴백 `X-Context-Fallback`). 기존 케이스에는 영향 없는 추가 필드.
        try { resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, headers: res.headers, body: data }); }
      });
    });
    req.on('error', (e) => resolve({ status: 0, body: e.message }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ============================================
// 색상 출력
// ============================================
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

// ============================================
// 테스트 케이스 정의
// ============================================
const tests = [];
function test(category, name, fn) {
  tests.push({ category, name, fn });
}

// ============================================
// 사전 준비: 토큰 발급
// ============================================
async function setup() {
  if (!process.env.JWT_SECRET) {
    console.error(c.red('✗ JWT_SECRET 환경변수가 없습니다. dev-backend/.env 확인 필요.'));
    process.exit(1);
  }

  // 1. POS Admin JWT (DB의 첫 System Admin 사용)
  let adminUser, member, restId;
  try {
    const { User, Customer, RestaurantCustomer } = require('../models');
    adminUser = await User.findOne({ where: { role: 'System Admin' } });
    if (!adminUser) throw new Error('System Admin 계정이 없습니다');

    // 2. Customer 토큰 (DB의 첫 member)
    member = await Customer.findOne({ where: { type: 'member' } });
    if (!member) throw new Error('member 타입 customer가 없습니다');

    const rc = await RestaurantCustomer.findOne({ where: { customer_id: member.id } });
    restId = rc ? rc.restaurant_id : 1;
  } catch (e) {
    console.error(c.red(`✗ DB 조회 실패: ${e.message}`));
    console.error(c.gray('   백엔드가 실행 중이고 DB 접근 가능한지 확인하세요.'));
    process.exit(1);
  }

  const adminToken = jwt.sign({ userId: adminUser.id }, process.env.JWT_SECRET, { expiresIn: '5m' });

  let customerToken;
  try {
    const { signCustomerToken } = require('../utils/customerJwt');
    customerToken = signCustomerToken(member);
  } catch (e) {
    console.error(c.red(`✗ Customer JWT 발급 실패: ${e.message}`));
    process.exit(1);
  }

  // Optional: a Restaurant Admin user, used by referral tests to verify RBAC
  // (admin endpoints must reject non-System-Admin roles).
  let restaurantAdminUser = null;
  let restaurantAdminToken = null;
  try {
    const { User } = require('../models');
    restaurantAdminUser = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (restaurantAdminUser) {
      restaurantAdminToken = jwt.sign({ userId: restaurantAdminUser.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    }
  } catch { /* optional — tests that need it will gracefully skip */ }

  return { adminUser, adminToken, member, customerToken, restId, restaurantAdminUser, restaurantAdminToken };
}

// ============================================
// 카테고리 1: 인증 시스템
// ============================================
function defineAuthTests({ adminToken, customerToken, member, restId }) {
  test('auth', 'admin /auth/me 정상 응답', async () => {
    const r = await request('GET', '/auth/me', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && r.body?.success === true && r.body?.data?.role;
  });

  test('auth', 'customer JWT로 본인 stats 조회', async () => {
    const r = await request('GET', `/customers/stats/${member.id}?restaurant_id=${restId}`, null, {
      Authorization: `Bearer ${customerToken}`,
    });
    return r.status === 200 && r.body?.success === true;
  });

  test('auth', 'admin token으로 customer route cross-access', async () => {
    const r = await request('GET', `/customers/stats/${member.id}?restaurant_id=${restId}`, null, {
      Authorization: `Bearer ${adminToken}`,
    });
    return r.status === 200;
  });

  test('auth', '잘못된 토큰 → 401/403', async () => {
    const r = await request('GET', '/auth/me', null, { Authorization: 'Bearer invalid.token.here' });
    return r.status === 401 || r.status === 403;
  });

  // ── 멀티 컨텍스트 로그인 (docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4) ─────────────
  // 영구 회귀 케이스. 부여 행을 만들지 않고 **위조/거부 경로만** 검사하므로 DB 를 안 건드린다.
  const jwtLib = require('jsonwebtoken');

  test('auth', '컨텍스트 목록 — 부여 0건이어도 본래 정체 1개는 항상 있다', async () => {
    const r = await request('GET', '/auth/contexts', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && Array.isArray(r.body?.data?.contexts) &&
      r.body.data.contexts.length >= 1 && r.body.data.contexts[0].kind === 'default';
  });

  test('auth', '위조 ctx 토큰 → 401 아니라 네이티브 폴백 + X-Context-Fallback', async () => {
    // 401 이면 프론트 httpClient 가 전역 로그아웃 → 픽커 복귀 불가(설계 §4.3 F5).
    const decoded = jwtLib.decode(adminToken) || {};
    const forged = jwtLib.sign(
      { userId: decoded.userId, role: 'Restaurant Admin', restaurant_id: 999999,
        ctx: { v: 1, t: 'restaurant', id: 999999, r: 'Restaurant Admin' } },
      process.env.JWT_SECRET, { expiresIn: '2m' }
    );
    // 두 경로를 **모두** 검사한다. `/auth/me` 는 라우트가 직접 투영하고, `/auth/contexts` 는
    // authenticateToken(초크포인트)이 투영한다 — 한쪽만 보면 다른 쪽 방어가 사라져도 통과한다
    // (실측: 초크포인트 헤더를 제거하는 고장주입이 /me 만 보던 케이스를 통과시켰다).
    const me = await request('GET', '/auth/me', null, { Authorization: `Bearer ${forged}` });
    const ctxList = await request('GET', '/auth/contexts', null, { Authorization: `Bearer ${forged}` });
    return me.status === 200 && me.headers?.['x-context-fallback'] === 'revoked' &&
      me.body?.data?.role !== 'Restaurant Admin' &&
      ctxList.status === 200 && ctxList.headers?.['x-context-fallback'] === 'revoked';
  });

  test('auth', '전환 — 지수표기 entity_id 위조 → 400 (parseInt 우회 차단)', async () => {
    const r = await request('POST', '/auth/switch-context',
      { entity_type: 'restaurant', entity_id: '1.16e2', role: 'Restaurant Admin' },
      { Authorization: `Bearer ${adminToken}` });
    return r.status === 400;
  });

  test('auth', '전환 — v1 비허용 조합(브랜드 모자) → 400', async () => {
    const r = await request('POST', '/auth/switch-context',
      { entity_type: 'brand', entity_id: 1, role: 'Brand General' },
      { Authorization: `Bearer ${adminToken}` });
    return r.status === 400;
  });

  test('auth', '전환 — 부여받지 않은 매장 → 403', async () => {
    const r = await request('POST', '/auth/switch-context',
      { entity_type: 'restaurant', entity_id: restId, role: 'Restaurant Admin' },
      { Authorization: `Bearer ${adminToken}` });
    return r.status === 403;
  });

  test('auth', '무회귀 — ctx 없는 토큰의 /auth/me 에는 폴백 헤더가 없다', async () => {
    const r = await request('GET', '/auth/me', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && !r.headers?.['x-context-fallback'];
  });
}

// ============================================
// 카테고리 2: 보안 가드 (회귀 방지)
// ============================================
function defineSecurityTests({ customerToken, member, restId }) {
  // 익명 차단
  test('security', '익명 customers/:rid → 401', async () => (await request('GET', '/customers/1')).status === 401);
  test('security', '익명 customers/stats/:cid → 401', async () => (await request('GET', '/customers/stats/1')).status === 401);
  test('security', '익명 customers/:cid/orders → 401', async () => (await request('GET', '/customers/1/orders')).status === 401);
  test('security', '익명 inventory-routes/:rid → 401', async () => (await request('GET', '/inventory-routes/1/inventory')).status === 401);
  test('security', '익명 restaurants → 401 (admin email/businessReg/taxId 보호)', async () => (await request('GET', '/restaurants')).status === 401);
  test('security', '익명 restaurants/:id → 401', async () => (await request('GET', '/restaurants/1')).status === 401);
  test('security', '익명 restaurants/:id/company-info → 401 (사업자정보 보호)', async () => (await request('GET', '/restaurants/1/company-info')).status === 401);
  test('security', '익명 addon-modules → 401', async () => (await request('GET', '/addon-modules')).status === 401);
  test('security', '익명 mobile/orders 필터없이 → 400 (전체 덤프 방지)', async () => (await request('GET', '/mobile/orders')).status === 400);
  test('security', '익명 membership/customer/:rid/:cid → 401', async () => (await request('GET', '/membership/customer/1/1')).status === 401);
  // PIN 로그인(P1-4)은 익명 1차 로그인 → 인증 게이트 뒤에 숨으면 안 됨(=auth 401 금지). 누락 body → 핸들러 400.
  // (2026-06-20 회귀: staff.js router.use(authenticateToken) 가 verify-pin 로그인을 막아 모든 PIN 로그인 401.)
  test('security', '익명 staff/verify-pin 로그인 라우트 공개(누락 PIN → 400, auth 401 아님)', async () => {
    const r = await request('POST', '/staff/verify-pin', { restaurant_id: 1 });
    return r.status === 400;
  });
  test('security', '익명 staff (직원목록 PIN 노출) → 401 (목록은 보호 유지)', async () => (await request('GET', '/staff')).status === 401);
  test('security', '익명 staff/verify-pin-permission(승인) → 401 (승인은 인증 유지)', async () => (await request('POST', '/staff/verify-pin-permission', { pin_code: '0000', restaurant_id: 1 })).status === 401);

  // IDOR 방어
  test('security', 'customer가 다른사람 stats → 403 (IDOR 방어)', async () => {
    const r = await request('GET', `/customers/stats/${member.id + 1}`, null, {
      Authorization: `Bearer ${customerToken}`,
    });
    return r.status === 403;
  });
  test('security', 'customer가 다른사람 membership → 403 (IDOR 방어)', async () => {
    const r = await request('GET', `/membership/customer/1/${member.id + 1}`, null, {
      Authorization: `Bearer ${customerToken}`,
    });
    return r.status === 403;
  });

  // Cross-token 차단
  test('security', 'customer 토큰으로 admin route → 401', async () => {
    const r = await request('GET', '/customers/1', null, { Authorization: `Bearer ${customerToken}` });
    return r.status === 401;
  });

  // Role gate: Restaurant Admin must not create restaurants
  test('security', 'Restaurant Admin이 POST /restaurants → 403 (역할 가드)', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra) return true; // skip if no fixture
    const raToken = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('POST', '/restaurants', { name: 'x' }, { Authorization: `Bearer ${raToken}` });
    return r.status === 403 && /Insufficient permissions/i.test(JSON.stringify(r.body));
  });

  // Manager-tier roles must not create restaurants either (must request General).
  // Closes the v3.18+ pre-existing gap.
  test('security', 'Brand Manager가 POST /restaurants → 403', async () => {
    const User = require('../models/User');
    const bm = await User.findOne({ where: { role: 'Brand Manager' } });
    if (!bm) return true;
    const tk = jwt.sign({ userId: bm.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('POST', '/restaurants', { name: 'x' }, { Authorization: `Bearer ${tk}` });
    return r.status === 403 && /Insufficient permissions/i.test(JSON.stringify(r.body));
  });

  test('security', 'Foodcourt Manager가 POST /restaurants → 403', async () => {
    const User = require('../models/User');
    const fm = await User.findOne({ where: { role: 'Foodcourt Manager' } });
    if (!fm) return true;
    const tk = jwt.sign({ userId: fm.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('POST', '/restaurants', { name: 'x' }, { Authorization: `Bearer ${tk}` });
    return r.status === 403 && /Insufficient permissions/i.test(JSON.stringify(r.body));
  });

  test('security', 'Staff가 POST /restaurants → 403', async () => {
    const User = require('../models/User');
    const st = await User.findOne({ where: { role: 'Staff' } });
    if (!st) return true;
    const tk = jwt.sign({ userId: st.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('POST', '/restaurants', { name: 'x' }, { Authorization: `Bearer ${tk}` });
    return r.status === 403 && /Insufficient permissions/i.test(JSON.stringify(r.body));
  });

  // Cross-tenant IDOR — RA must not access another restaurant's scoped endpoints.
  // Closes the gap discovered during v3.21 verification on /orders, /activity-logs,
  // /invoices/settings, /membership/settings (checkRestaurantAccess was missing).
  // Uses any RA whose restaurant_id differs from `restId` (= member's restaurant).
  test('security', '다른 RA가 cross-tenant /orders/restaurant/:rid → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/orders/restaurant/${otherRid}?limit=3`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /orders/restaurant/:rid/counts → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/orders/restaurant/${otherRid}/counts`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /activity-logs/restaurant/:rid → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/activity-logs/restaurant/${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /invoices/settings/:rid → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/invoices/settings/${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant PUT /membership/settings/:rid → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('PUT', `/membership/settings/${otherRid}`, { is_active: true }, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  // Cross-tenant IDOR — 2026-06-20 감사로 발견·수정 (?restaurantId 무검증). 영구 가드.
  test('security', '다른 RA가 cross-tenant /staff?restaurantId → 403 (직원명단+PIN 유출 차단)', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/staff?restaurantId=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /categories?restaurantId → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/categories?restaurantId=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /import/history?restaurant_id → 403 (대량입력 IDOR)', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/import/history?restaurant_id=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });

  // Cross-tenant IDOR — 2026-07-25 감사로 발견·수정. `/api/restaurants/*` 계열이
  // authenticateToken 만 달고 있어 아무 인증 계정이나 남의 매장 전 컬럼(payment_settings 의
  // stripeSecretKey/paypalClientSecret, printer_settings, bank_*, tax_id 포함)을 읽고, 심지어
  // status 를 'suspended' 로 밀어 그 매장 로그인을 차단할 수 있었다. 영구 가드.
  test('security', '다른 매장 Staff가 /restaurants/:id → 403 (매장 전컬럼 유출 차단)', async () => {
    const User = require('../models/User');
    const { Op } = require('sequelize');
    const staff = await User.findOne({ where: { role: 'Staff', restaurant_id: { [Op.ne]: null } } });
    if (!staff) return true;
    const otherRid = staff.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: staff.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/restaurants/${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', 'Supplier가 /restaurants/manager/:managerId → 403 (관할매장 벌크 유출 차단)', async () => {
    const User = require('../models/User');
    const sup = await User.findOne({ where: { role: 'Supplier Admin' } });
    const mgr = await User.findOne({ where: { role: 'Brand General' } });
    if (!sup || !mgr) return true;
    const tk = jwt.sign({ userId: sup.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/restaurants/manager/${mgr.id}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 매장 Staff가 PATCH /restaurants/:id/status → 403 (임의 테넌트 영업정지 차단)', async () => {
    const User = require('../models/User');
    const Restaurant = require('../models/Restaurant');
    const { Op } = require('sequelize');
    const staff = await User.findOne({ where: { role: 'Staff', restaurant_id: { [Op.ne]: null } } });
    if (!staff) return true;
    const otherRid = staff.restaurant_id === restId ? restId + 1 : restId;
    const target = await Restaurant.findByPk(otherRid, { attributes: ['id', 'status'] });
    if (!target) return true;
    // 게이트가 회귀해 통과되더라도 데이터가 바뀌지 않도록 "현재값과 동일한 값"을 보낸다.
    const tk = jwt.sign({ userId: staff.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('PATCH', `/restaurants/${otherRid}/status`, { status: target.status }, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '익명 /restaurants/slug/:slug 에 printer_settings·게이트웨이 비밀키 없음', async () => {
    const Restaurant = require('../models/Restaurant');
    const { Op } = require('sequelize');
    const withSlug = await Restaurant.findOne({ where: { slug: { [Op.ne]: null } }, attributes: ['id', 'slug'] });
    if (!withSlug || !withSlug.slug) return true;
    const r = await request('GET', `/restaurants/slug/${withSlug.slug}`);   // 토큰 없음 = 익명
    if (r.status !== 200) return false;
    const d = (r.body && r.body.data) || {};
    if (d.printer_settings !== undefined) return false;
    if (d.business_registration !== undefined || d.tax_id !== undefined || d.bank_account !== undefined) return false;
    // payment_settings 는 손님 결제화면이 쓰므로 유지되어야 하고, config(비밀키)만 없어야 한다.
    if (!d.payment_settings) return false;
    return !Object.values(d.payment_settings).some(m => m && typeof m === 'object' && m.config !== undefined);
  });

  test('security', '다른 매장 Staff가 /restaurants/:id/table-status → 403 (손님 개인정보 유출 차단)', async () => {
    const User = require('../models/User');
    const { Op } = require('sequelize');
    const staff = await User.findOne({ where: { role: 'Staff', restaurant_id: { [Op.ne]: null } } });
    if (!staff) return true;
    const otherRid = staff.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: staff.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/restaurants/${otherRid}/table-status`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });

  // 🔴 id 정규화 우회 (2026-07-25 Fable 적대검증 실증). `parseInt('1.16e2')===1` 인데 MySQL 은
  // 문자열 '1.16e2' 를 float 로 캐스팅해 116 으로 읽는다 → 권한판정과 실제조회가 다른 매장을
  // 가리켜 게이트가 통째로 무력화됐다. 정수 id 로만 테스트하면 이 클래스를 영영 못 잡으므로
  // 지수표기 id 를 명시적으로 박아 둔다.
  test('security', 'id 정규화: 지수표기(1.16e2) 로 게이트 우회 불가', async () => {
    const User = require('../models/User');
    const Restaurant = require('../models/Restaurant');
    const { Op } = require('sequelize');
    // parseInt 로는 자기 매장, float 로는 남의 매장이 되는 (계정, 대상) 쌍을 실제 데이터에서 찾는다.
    // 예: 자기=1, 대상=116 → '1.16e2' (parseInt 1 / Number 116). 대상 id 문자열이 자기 id 문자열로
    // 시작해야 표기를 만들 수 있으므로, 그 조건으로 직접 짝을 찾는다(휴리스틱 금지 — 못 찾으면
    // 테스트가 조용히 무의미해진다).
    const ras = await User.findAll({
      where: { role: 'Restaurant Admin', restaurant_id: { [Op.ne]: null } },
      attributes: ['id', 'restaurant_id'], limit: 40
    });
    const allIds = (await Restaurant.findAll({ attributes: ['id'] })).map(r => r.id);
    let ra = null, tid = null;
    for (const cand of ras) {
      const m = String(parseInt(cand.restaurant_id));
      const hit = allIds.find(i => String(i) !== m && String(i).startsWith(m));
      if (hit) { ra = cand; tid = String(hit); break; }
    }
    if (!ra) {
      console.log('      ↳ 경고: 지수표기 우회를 만들 수 있는 (계정,매장) 짝이 dev 데이터에 없음 — 검사 미수행');
      return true;
    }
    const mine = String(parseInt(ra.restaurant_id));
    const rest = tid.slice(mine.length);
    const exp = `${mine}.${rest}e${rest.length}`;   // parseInt → mine, Number → tid
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/restaurants/${exp}`, null, { Authorization: `Bearer ${tk}` });
    if (r.status === 200) {
      console.log(`      ↳ 우회 성공: /restaurants/${exp} → 200 (매장 ${tid} 노출)`);
      return false;
    }
    // ⚠ 빈 body 로 보낸다. 게이트가 회귀했을 때 이 요청이 실제로 통과하면 **피해 매장에 쓰기**가
    // 일어나므로, 어떤 필드도 싣지 않아 통과하더라도 덮어쓸 값이 없게 한다(검출력은 동일 —
    // 판정 기준은 200 여부).
    const s = await request('PUT', `/store/settings?restaurantId=${exp}`, {}, { Authorization: `Bearer ${tk}` });
    if (s.status === 200) {
      console.log(`      ↳ 우회 성공: PUT /store/settings?restaurantId=${exp} → 200 (매장 ${tid} 쓰기)`);
      return false;
    }
    return true;
  });

  // 불변식: **상세 게이트는 목록 스코핑보다 엄격하면 안 된다.**
  // 목록(GET /restaurants)이 보여준 매장을 클릭했을 때 상세가 403 이면 매니저 콘솔이 죽는다.
  // 2026-07-25 에 실제로 이 구멍이 있었다(Foodcourt Manager·비소유 Foodcourt General 이
  // 목록엔 뜨는데 상세 403). dev 에서는 그 FM 의 branch_id 가 우연히 안 맞아 목록이 0건이라
  // 안 드러났다 — 데이터 우연에 기대지 않도록 "목록에 뜬 것은 전부 열려야 한다"를 직접 검사한다.
  test('security', '불변식: 목록에 보이는 매장은 상세도 열림 (list⊆detail)', async () => {
    const User = require('../models/User');
    const { Op } = require('sequelize');
    // 감독역할 + 저권한역할 둘 다 본다. 저권한역할은 목록이 자기 매장(또는 0건)으로
    // 좁혀졌는지까지 이 불변식으로 자동 검증된다(전 매장이 실리면 상세 403 → 실패).
    const supervisors = await User.findAll({
      where: { role: { [Op.in]: ['Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager',
                                 'Supplier Admin', 'Staff', 'Restaurant Admin', 'Restaurant Owner'] } },
      attributes: ['id', 'role'], limit: 40
    });
    for (const u of supervisors) {
      const tk = jwt.sign({ userId: u.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
      const list = await request('GET', '/restaurants', null, { Authorization: `Bearer ${tk}` });
      if (list.status !== 200 || !Array.isArray(list.body)) continue;
      for (const r of list.body.slice(0, 5)) {
        const d = await request('GET', `/restaurants/${r.id}`, null, { Authorization: `Bearer ${tk}` });
        if (d.status === 403) {
          console.log(`      ↳ 불변식 위반: ${u.role}(id=${u.id}) 목록엔 매장 ${r.id} 이 보이는데 상세는 403`);
          return false;
        }
      }
    }
    return true;
  });

  // Cross-tenant IDOR — Phase 1 (2026-06-08): query-param scoped endpoints that
  // previously trusted ?restaurantId blindly (coupons / option-groups / store).
  test('security', '다른 RA가 cross-tenant /coupons?restaurantId → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/coupons?restaurantId=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /option-groups?restaurantId → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/option-groups?restaurantId=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  test('security', '다른 RA가 cross-tenant /store/settings?restaurantId → 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra || !ra.restaurant_id) return true;
    const otherRid = ra.restaurant_id === restId ? restId + 1 : restId;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', `/store/settings?restaurantId=${otherRid}`, null, { Authorization: `Bearer ${tk}` });
    return r.status === 403;
  });
  // 설정 wipe 계열 방어 — 프론트가 "일부 키만" PUT 해도(예: 예약 토글이 enabled 만 보냄,
  // 현재 설정 GET 이 실패해 병합 원본이 비어 있을 때) 나머지 키가 살아남아야 한다.
  // 2026-05-31 프린터설정 wipe 사고와 동일 계열 — 실 HTTP 왕복으로 박제한다.
  test('security', '부분 PUT 이 reservation_settings 나머지 키를 지우지 않는다 (설정 wipe 방어)', async () => {
    const Restaurant = require('../models/Restaurant');
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: restId } });
    if (!ra) return true;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const before = await Restaurant.findByPk(restId);
    const original = before.reservation_settings ? JSON.parse(JSON.stringify(before.reservation_settings)) : null;
    try {
      // 다른 키가 있는 상태를 만든 뒤, enabled 만 보내는 부분 PUT
      await request('PUT', `/store/settings?restaurantId=${restId}`,
        { reservation_settings: { enabled: false, slot: { max_party: 20 }, hcMarker: 'keep-me' } },
        { Authorization: `Bearer ${tk}` });
      await request('PUT', `/store/settings?restaurantId=${restId}`,
        { reservation_settings: { enabled: true } },
        { Authorization: `Bearer ${tk}` });
      const after = await Restaurant.findByPk(restId);
      const rs = after.reservation_settings || {};
      return rs.enabled === true && rs.hcMarker === 'keep-me' && rs.slot?.max_party === 20;
    } finally {
      // 원복 — 운영/데모 설정을 테스트가 바꾼 채 두지 않는다
      await Restaurant.update({ reservation_settings: original }, { where: { id: restId } });
    }
  });

  // 멤버십(로열티) 크로스테넌트 — 2026-07-26 실측 결함.
  // customerSelfOrAdmin 의 admin 경로가 authenticateToken 만이라 아무 매장 직원이나
  // 타 매장 손님의 이름·전화·이메일·포인트 이력을 읽을 수 있었다(200 실증).
  // 포인트 쓰기는 body.restaurant_id 무검증 → 타 매장 손님 포인트 조작 가능.
  const MEMBERSHIP_READS = [
    (rid) => `/membership/customer/${rid}/1`,
    (rid) => `/membership/points/history/${rid}/1`,
    (rid) => `/membership/tier/info/${rid}/1`,
  ];
  test('security', '다른 매장 RA 가 멤버십 손님 조회 3경로 → 전부 403 (손님 PII 유출 차단)', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: restId } });
    if (!ra) return true;
    const otherRid = restId === 5 ? 8 : 5;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    for (const mk of MEMBERSHIP_READS) {
      const r = await request('GET', mk(otherRid), null, { Authorization: `Bearer ${tk}` });
      if (r.status !== 403) {
        console.log(`      ↳ 유출: GET ${mk(otherRid)} → ${r.status}`);
        return false;
      }
    }
    return true;
  });
  test('security', '다른 매장 RA 가 포인트 쓰기(earn/use/adjust/refund/welcome) → 전부 403', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: restId } });
    if (!ra) return true;
    const otherRid = restId === 5 ? 8 : 5;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    // customer_id = 존재하지 않는 id — 게이트가 회귀해도 실데이터를 건드리지 않는다.
    // (게이트 있으면 403, 없으면 404 → 어느 쪽이든 이 테스트가 회귀를 잡는다)
    const ghostCid = 99999999;
    const writes = [
      ['/membership/points/earn', { restaurant_id: otherRid, customer_id: ghostCid, amount: 10 }],
      ['/membership/points/use', { restaurant_id: otherRid, customer_id: ghostCid, points: 10 }],
      ['/membership/points/adjust', { restaurant_id: otherRid, customer_id: ghostCid, points: 10 }],
      ['/membership/points/refund', { restaurant_id: otherRid, customer_id: ghostCid, points: 10 }],
      ['/membership/points/welcome', { restaurant_id: otherRid, customer_id: ghostCid }],
    ];
    for (const [p, body] of writes) {
      const r = await request('POST', p, body, { Authorization: `Bearer ${tk}` });
      if (r.status !== 403) {
        console.log(`      ↳ 쓰기 통과: POST ${p} → ${r.status}`);
        return false;
      }
    }
    return true;
  });
  test('security', '익명 멤버십 설정 GET 이 없는 매장에 행을 만들지 않는다 (무인증 쓰기 차단)', async () => {
    const MembershipSettings = require('../models/MembershipSettings');
    const ghostRid = 99991;
    const r = await request('GET', `/membership/settings/${ghostRid}`, null, {});
    const created = await MembershipSettings.findOne({ where: { restaurant_id: ghostRid } });
    if (created) {
      await MembershipSettings.destroy({ where: { restaurant_id: ghostRid } });
      return false;
    }
    return r.status === 404;
  });

  // 소켓 인증 관측 엔드포인트 — 강제 전환(SOCKET_AUTH_ENFORCE) 판단의 근거 데이터.
  // 전 매장 접속 패턴이 담기므로 System Admin 전용이어야 한다.
  test('security', '익명 /socket-auth-monitor → 401 (전 매장 소켓 관측치 차단)', async () => {
    return (await request('GET', '/socket-auth-monitor', null, {})).status === 401;
  });
  test('security', 'RA 토큰 /socket-auth-monitor → 403 (SA 전용)', async () => {
    const User = require('../models/User');
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    if (!ra) return true;
    const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    return (await request('GET', '/socket-auth-monitor', null, { Authorization: `Bearer ${tk}` })).status === 403;
  });
  test('security', 'SA /socket-auth-monitor → 카운터 4종 노출 (강제 전환 판단 근거 생존)', async () => {
    const User = require('../models/User');
    const sa = await User.findOne({ where: { role: 'System Admin' } });
    if (!sa) return true;
    const tk = jwt.sign({ userId: sa.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const r = await request('GET', '/socket-auth-monitor', null, { Authorization: `Bearer ${tk}` });
    if (r.status !== 200) return false;
    const total = r.body?.data?.total || r.body?.total;
    return !!total && ['withToken', 'withoutToken', 'invalidToken', 'crossRestaurant'].every((k) => k in total);
  });

  // 폐기된 미인증 레거시 대시보드 라우트는 더 이상 전 매장 집계를 200으로 누출하면 안 됨
  // (기존: 익명 200 → 폐기 후: 401 차단). recent-orders / stats / order-status 표본.
  test('security', '익명 /dashboard/recent-orders → 200 아님 (집계 누출 차단)', async () => {
    const r = await request('GET', '/dashboard/recent-orders', null, {});
    return r.status === 401 || r.status === 404;
  });
  test('security', '익명 /dashboard/stats → 200 아님 (집계 누출 차단)', async () => {
    const r = await request('GET', '/dashboard/stats?restaurant_id=1', null, {});
    return r.status === 401 || r.status === 404;
  });

  // Tier gate (P0-3, 2026-06-08) — Advanced restaurant features must be paywalled
  // at the API layer, not just hidden in the UI. Find a non-demo RA whose effective
  // module set (own plan ∪ brand/foodcourt plan) lacks inventory_management and
  // assert the inventory API returns 403. (Skips/passes if no such restaurant.)
  test('security', 'tier gate — 모듈없는 매장 재고 API → 403', async () => {
    const Restaurant = require('../models/Restaurant');
    const User = require('../models/User');
    const { resolveRestaurantModules } = require('../middleware/requireModule');
    const ras = await User.findAll({ where: { role: 'Restaurant Admin' }, limit: 40 });
    for (const ra of ras) {
      if (!ra.restaurant_id) continue;
      const rest = await Restaurant.findByPk(ra.restaurant_id);
      if (!rest || rest.is_demo) continue;
      const mods = await resolveRestaurantModules(rest);
      if (mods.includes('inventory_management')) continue; // need a non-holder
      const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
      const r = await request('GET', `/restaurants/${rest.id}/inventory`, null, { Authorization: `Bearer ${tk}` });
      return r.status === 403;
    }
    return true; // no suitable restaurant available → pass
  });
  // The brand-pushed read path (brand-ingredients) must NOT be tier-gated — a
  // franchise branch always sees HQ-provided ingredients regardless of its tier.
  // 공개 quick-login 카드가 **실매장에 닿지 못한다**는 영구 계약.
  // 코드가 아니라 **데이터**가 무너뜨리는 종류의 사고라(계정에 매장 부여가 새로 생기면 즉시 재발)
  // 고장주입 1회가 아니라 상시 검사로 둔다. 판정 집합은 로그인 가드와 같은 단일소스를 쓴다.
  // 운영 실측 근거: `admin@kdine.com`(is_test=1) 이 실주문 335건 매장의 Restaurant Admin 이었다.
  test('security', 'demo-login 통과 키는 실매장(is_demo=0)에 닿지 않는다', async () => {
    const { DEMO_KEY_TO_EMAIL } = require('../services/authService');
    const { findReachableRestaurants } = require('../utils/demoReachableRestaurants');
    const { sequelize } = require('../config/database');
    const User = require('../models/User');

    for (const [key, email] of Object.entries(DEMO_KEY_TO_EMAIL)) {
      const res = await request('POST', '/auth/demo-login', { key });
      if (res.status !== 200) continue; // 차단된 카드는 이 계약의 대상이 아니다
      const u = await User.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('email')),
          String(email).toLowerCase()
        )
      });
      if (!u) return false; // 200 인데 계정을 못 찾으면 검사기 고장 — 통과시키지 않는다
      const rows = await findReachableRestaurants(sequelize, u);
      const real = (rows || []).filter((r) => !r.is_demo);
      if (real.length) {
        console.log(c.red(`      ↳ ${key} → 실매장 ${real.length}건 (예: ${real[0].id})`));
        return false;
      }
    }
    return true;
  });

  test('security', 'tier gate — brand-ingredients 읽기는 비차단', async () => {
    const Restaurant = require('../models/Restaurant');
    const User = require('../models/User');
    const { resolveRestaurantModules } = require('../middleware/requireModule');
    const ras = await User.findAll({ where: { role: 'Restaurant Admin' }, limit: 40 });
    for (const ra of ras) {
      if (!ra.restaurant_id) continue;
      const rest = await Restaurant.findByPk(ra.restaurant_id);
      if (!rest || rest.is_demo) continue;
      const mods = await resolveRestaurantModules(rest);
      if (mods.includes('inventory_management') || mods.includes('ingredients')) continue;
      const tk = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
      const r = await request('GET', `/restaurants/${rest.id}/brand-ingredients`, null, { Authorization: `Bearer ${tk}` });
      return r.status !== 403; // not tier-blocked (200 or other non-403)
    }
    return true;
  });
}

// ============================================
// 카테고리 3: POS 핵심 API
// ============================================
function definePosTests({ adminToken }) {
  const auth = { Authorization: `Bearer ${adminToken}` };

  test('pos', 'admin /dashboard/restaurant/1/stats → 200', async () => (await request('GET', '/dashboard/restaurant/1/stats', null, auth)).status === 200);
  test('pos', 'admin /orders/restaurant/1 → 200', async () => (await request('GET', '/orders/restaurant/1', null, auth)).status === 200);
  test('pos', 'admin /menu → 200', async () => (await request('GET', '/menu?restaurantId=1', null, auth)).status === 200);
  test('pos', 'admin /invoices → 200', async () => (await request('GET', '/invoices', null, auth)).status === 200);
  test('pos', 'admin /restaurants → 200', async () => (await request('GET', '/restaurants', null, auth)).status === 200);
  test('pos', 'admin /customers/:rid → 200', async () => (await request('GET', '/customers/1', null, auth)).status === 200);
  test('pos', 'admin /coupons → 200', async () => (await request('GET', '/coupons?restaurantId=1', null, auth)).status === 200);
  test('pos', 'admin /membership/settings/:rid → 200', async () => (await request('GET', '/membership/settings/1', null, auth)).status === 200);
  test('pos', 'admin /staff → 200', async () => (await request('GET', '/staff?restaurantId=1', null, auth)).status === 200);
  test('pos', 'admin /addon-modules → 200', async () => (await request('GET', '/addon-modules', null, auth)).status === 200);
  test('pos', 'admin /activity-logs/restaurant/:id → 200', async () => (await request('GET', '/activity-logs/restaurant/1', null, auth)).status === 200);
  test('pos', 'admin /activity-logs/restaurant/:id/stats → 200 (sequelize import 회귀 방지)', async () => {
    const r = await request('GET', '/activity-logs/restaurant/1/stats', null, auth);
    return r.status === 200 && r.body?.success === true && r.body?.data?.byActionType !== undefined;
  });

  test('pos', '익명 /manager/sales-summary → 401 (매출 노출 차단)', async () => {
    return (await request('GET', '/manager/sales-summary')).status === 401;
  });

  // 주문 목록 스코프 계약 (2026-07-11 회귀 박제).
  // 매장 소유 경로는 3가지 — 링크(Owner) / 브랜드 소유(BG) / 푸드코트 소속(FG). 예전엔 링크만 봐서
  // **푸드코트 총괄이 주문 0건**이었고(리포트가 통째로 비어 Math.random 가짜 지표가 그 자리를 채웠다),
  // 동시에 타 테넌트 주문이 새면 안 된다. 두 방향(누락 0 · 유출 0)을 함께 못 박는다.
  // 임대료 청구 계약 (2026-07-11 신규 기능, docs/TENANT_RENT_BILLING.md).
  // ① 한 달에 정확히 1장(중복 발행 0 — 스케줄러가 하루에 여러 번 돌아도, 수동 발행을 눌러도)
  // ② 임대사업자 스코프(누락 0 · 유출 0) ③ 계약 종료 시 청구 중단.
  test('pos', '임대료 청구: 한 달 정확히 1장 + 계약 종료 시 중단 (중복발행 회귀)', async () => {
    const { User, Contract, Invoice, InvoiceItem, Restaurant } = require('../models');
    const { Op } = require('sequelize');
    const rentBilling = require('../services/rentBilling');

    const fc = await User.findOne({ where: { role: 'Foodcourt General', foodcourt_id: { [Op.ne]: null } } });
    if (!fc) return true; // 푸드코트 총괄 계정 없으면 검증 불가 → skip
    const tenant = await Restaurant.findOne({ where: { foodcourt_id: fc.foodcourt_id } });
    if (!tenant) return true;

    const contract = await Contract.create({
      entity_type: 'foodcourt', entity_id: fc.foodcourt_id, restaurant_id: tenant.id,
      stage: 'active', currency: 'MYR', applicant_company_name: '__HC_RENT_TEST__',
      financial_terms: { base_rent: 1000, maintenance_fee: 100, billing_day: 1, grace_days: 5 },
    });

    try {
      const month = rentBilling.currentMonth();

      // 두 번 발행 → 인보이스는 1장이어야 한다 (멱등)
      const first = await rentBilling.generateRentInvoices({ month, contractId: contract.id });
      const second = await rentBilling.generateRentInvoices({ month, contractId: contract.id });
      const count = await Invoice.count({ where: { contract_id: contract.id, invoice_category: 'rent' } });
      const idempotent = first.generated === 1 && second.generated === 0 && count === 1;

      // 금액 = 기본 임대료 + 관리비
      const inv = await Invoice.findOne({ where: { contract_id: contract.id, invoice_category: 'rent' } });
      const amountOk = inv && Math.abs(Number(inv.total_amount) - 1100) < 0.01;

      // 임대사업자 스코프 — 발행자/수취자가 계약에서 도출돼야 한다
      const partiesOk = inv && inv.issuer_type === 'foodcourt'
        && String(inv.issuer_id) === String(fc.foodcourt_id)
        && inv.payer_type === 'restaurant' && String(inv.payer_id) === String(tenant.id);

      // 계약 종료 → 청구 중단
      await contract.update({ stage: 'terminated' });
      const nextMonth = `${month.slice(0, 4)}-${String(Math.min(12, Number(month.slice(5)) + 1)).padStart(2, '0')}`;
      const afterEnd = await rentBilling.generateRentInvoices({ month: nextMonth, contractId: contract.id });
      const stopped = afterEnd.generated === 0;

      return idempotent && amountOk && partiesOk && stopped;
    } finally {
      const invs = await Invoice.findAll({ where: { contract_id: contract.id }, attributes: ['id'], raw: true });
      if (invs.length) await InvoiceItem.destroy({ where: { invoice_id: invs.map((i) => i.id) } });
      await Invoice.destroy({ where: { contract_id: contract.id }, force: true });
      await Contract.destroy({ where: { id: contract.id }, force: true });
    }
  });

  // 재료 ↔ 공급업체 제품 연결 해제 (2026-07-12 회귀 박제).
  // 연결은 되는데 **끊을 수가 없어** 잘못 연결하면 되돌릴 방법이 없었다(백엔드 DELETE 는
  // 있었고 UI 만 없었다). 해제는 **매핑만** 지우고 공급업체 상품 자체는 보존해야 한다.
  test('pos', '재료-공급업체 연결 해제: 매핑만 삭제 + 상품 보존 + 익명 401', async () => {
    const { Ingredient, IngredientSellerProduct, SupplierProduct, User } = require('../models');
    const { Op } = require('sequelize');
    const jwtLib = require('jsonwebtoken');

    const ing = await Ingredient.findOne({ where: { restaurant_id: { [Op.ne]: null } } });
    const sp = await SupplierProduct.findOne();
    if (!ing || !sp) return true; // 검증 대상 데이터 없음 → skip

    const owner = await User.findOne({ where: { restaurant_id: ing.restaurant_id, role: 'Restaurant Admin' } });
    if (!owner) return true;

    const mapping = await IngredientSellerProduct.create({
      ingredient_id: ing.id,
      seller_type: 'supplier',
      seller_entity_id: sp.supplier_company_id || sp.supplier_id || 1,
      seller_product_id: sp.id,
      unit_price: sp.unit_price || 0,
    });

    try {
      // 익명은 해제 불가
      const anon = await request('DELETE', `/ingredient-seller-products/${mapping.id}`);
      if (anon.status !== 401) return false;

      const token = jwtLib.sign({ userId: owner.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
      const del = await request('DELETE', `/ingredient-seller-products/${mapping.id}`, null,
        { Authorization: `Bearer ${token}` });
      if (del.status !== 200) return false;

      const gone = await IngredientSellerProduct.findByPk(mapping.id);
      const productKept = await SupplierProduct.findByPk(sp.id);
      return !gone && !!productKept;   // 매핑만 사라지고 상품은 남아야 한다
    } finally {
      await IngredientSellerProduct.destroy({ where: { id: mapping.id }, force: true }).catch(() => {});
    }
  });

  test('pos', '익명 /rent/tenants → 401 (임대 데이터 노출 차단)', async () => {
    return (await request('GET', '/rent/tenants')).status === 401;
  });

  test('pos', '주문 스코프: 푸드코트 총괄이 자기 푸드코트 주문을 본다 + 남의 것은 못 본다', async () => {
    const { User, Restaurant } = require('../models');
    const Order = require('../models/Order');
    const jwtLib = require('jsonwebtoken');

    const fc = await User.findOne({ where: { role: 'Foodcourt General', foodcourt_id: { [require('sequelize').Op.ne]: null } } });
    if (!fc) return true; // 푸드코트 총괄 계정 없으면 검증 불가 → skip
    const token = jwtLib.sign({ userId: fc.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const fcAuth = { Authorization: `Bearer ${token}` };

    const RestaurantManager = require('../models/RestaurantManager');
    const mine = await Restaurant.findAll({ where: { foodcourt_id: fc.foodcourt_id }, attributes: ['id'], raw: true });
    const fcIds = mine.map((r) => r.id);
    if (!fcIds.length) return true;

    // 허용 범위 = 푸드코트 소속 ∪ 직접 관리 링크 (둘 다 정당한 소유 경로)
    const links = await RestaurantManager.findAll({ where: { manager_id: fc.id }, attributes: ['restaurant_id'], raw: true });
    const allowed = new Set([...fcIds, ...links.map((l) => l.restaurant_id)]);

    const r = await request('GET', '/orders?limit=5000', null, fcAuth);
    if (r.status !== 200) return false;
    const rows = Array.isArray(r.body?.data) ? r.body.data : (Array.isArray(r.body) ? r.body : []);

    // 유출 0: 허용 범위 밖 매장의 주문이 섞이면 안 된다
    const noLeak = rows.every((o) => allowed.has(o.restaurant_id));

    // 누락 0: 푸드코트 소속 매장에 주문이 있으면 목록에도 나와야 한다 (예전엔 0건이었다)
    const fcOrderCount = await Order.count({ where: { restaurant_id: fcIds } });
    const seesFcOrders = rows.some((o) => fcIds.includes(o.restaurant_id));
    const noMiss = fcOrderCount === 0 || seesFcOrders;

    return noLeak && noMiss;
  });

  // 발주 판매자 이름은 supplier/brand/foodcourt 3종 모두 해석돼야 한다. 목록 API 가 supplier 만
  // 조회해서 브랜드 발주(=BG 가 자기 매장에 파는 것)의 공급업체 이름이 '—' 로 비어 있었다
  // (2026-07-12 with MIN). 해석기를 다시 supplier 전용으로 좁히면 여기서 깨진다.
  test('pos', '발주 판매자 이름: 브랜드 발주도 이름이 내려온다 (supplier 전용 회귀)', async () => {
    const { User } = require('../models');
    const PurchaseOrder = require('../models/PurchaseOrder');
    const jwtLib = require('jsonwebtoken');

    const brandPO = await PurchaseOrder.findOne({
      where: { seller_type: 'brand', entity_type: 'restaurant' },
      order: [['id', 'DESC']]
    });
    if (!brandPO) return true; // 브랜드 발주 데이터 없으면 검증 불가 → skip

    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: brandPO.entity_id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    // 상세: 이름 + seller 객체(스테이징/공유 텍스트가 읽는 것) 둘 다 있어야 한다
    const detail = await request('GET', `/purchase-orders/${brandPO.id}`, null, auth);
    if (detail.status !== 200) return false;
    const d = detail.body?.data || {};
    if (!d.seller_name || !d.seller?.name) return false;
    // 브랜드는 플랫폼 계정 = 자동발송(외부 수동발송 아님)
    if (d.is_external !== false) return false;

    // 목록: 같은 PO 가 목록에서도 이름을 갖는다 (비어 있던 화면이 여기였다)
    const list = await request('GET', `/purchase-orders?status=${brandPO.status}&limit=200`, null, auth);
    if (list.status !== 200) return false;
    const row = (list.body?.data || []).find((p) => p.id === brandPO.id);
    if (!row) return true; // 페이지 밖이면 판정 불가
    return !!row.seller_name && row.seller_name === d.seller_name;
  });

  // ── 브랜드 재고 공유 (docs/BRAND_STOCK_SHARING_DESIGN.md) ──────────────────────
  // 브랜드 재료(ingredients.owner_type='brand')는 프랜차이즈 표준 재료 마스터다:
  // 매장은 읽고·발주하고·입고하지만 **정의는 못 고친다**. 재고는 매장별 오버레이가 단일 소스 —
  // 브랜드 공유 행의 current_stock 을 매장이 갱신하면 형제 매장 재고가 오염된다.
  test('pos', '브랜드 재고: 매장은 브랜드 재료를 읽기전용으로 본다 (수정/삭제 4xx)', async () => {
    const { Restaurant, Ingredient, User } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    const list = await request('GET', `/restaurants/${rest.id}/brand-ingredients?include=sellers`, null, auth);
    if (list.status !== 200) return false;
    const rows = list.body?.data || [];
    if (!rows.length || !rows.every((r) => r.is_brand_shared && r.read_only && Array.isArray(r.sellerSources))) return false;

    // 재료 **정의**(이름·삭제)는 브랜드 소유 → 매장이 고치면 4xx
    const put = await request('PUT', `/restaurants/${rest.id}/ingredients/${ing.id}`, { name: 'REGRESSION' }, auth);
    const del = await request('DELETE', `/restaurants/${rest.id}/ingredients/${ing.id}`, null, auth);
    if (!(put.status >= 400 && del.status >= 400)) return false;

    // 반면 **PAR 설정은 매장별**(2026-07-13) — 저장되되 브랜드 행은 불변이어야 한다.
    // 지점마다 회전율이 달라 발주점이 같을 수 없다(프랜차이즈 표준).
    const { RestaurantIngredientStock } = require('../models');
    const before = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    const beforeMin = before ? before.min_stock : null;
    const brandMinBefore = String(ing.min_stock);

    const par = await request('PUT', `/restaurants/${rest.id}/inventory/${ing.id}/settings`, { min_stock: 999 }, auth);
    const overlay = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    const brandAfter = await Ingredient.findByPk(ing.id);
    const savedToOverlay = par.status === 200 && overlay && Number(overlay.min_stock) === 999;
    const brandUntouched = String(brandAfter.min_stock) === brandMinBefore;

    // 원복 (검증이 데이터를 남기지 않는다)
    if (before) await overlay.update({ min_stock: beforeMin });
    else if (overlay) await overlay.destroy();

    return savedToOverlay && brandUntouched;
  });

  test('pos', '브랜드 재고: 공급처 연결은 브랜드만 (매장 쓰기 403, 읽기 200)', async () => {
    const { Restaurant, Ingredient, User, IngredientSellerProduct } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    const read = await request('GET', `/ingredients/${ing.id}/seller-sources`, null, auth);
    if (read.status !== 200) return false; // 매장은 브랜드가 붙여둔 공급처를 읽어야 발주할 수 있다
    const write = await request('POST', `/ingredients/${ing.id}/seller-sources`, {
      seller_type: 'supplier', seller_entity_id: 1, seller_product_id: 1, unit_price: 1
    }, auth);
    return write.status === 403; // 매장이 브랜드 공급망을 바꾸면 형제 매장까지 바뀐다 → 금지
  });

  test('pos', '브랜드 재고: 매장 재고는 오버레이가 단일 소스 (브랜드 행 불변 + 형제 격리)', async () => {
    const { Restaurant, Ingredient, User, RestaurantIngredientStock } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true, track_stock: true } })
      || await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    const brandRowBefore = parseFloat((await Ingredient.findByPk(ing.id)).current_stock) || 0;
    const before = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    const qtyBefore = before ? parseFloat(before.current_stock) : 0;

    const recv = await request('POST', `/restaurants/${rest.id}/inventory/receive`, { ingredient_id: ing.id, quantity: 3 }, auth);
    if (recv.status !== 200) return false;

    const after = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    const qtyAfter = after ? parseFloat(after.current_stock) : 0;
    const brandRowAfter = parseFloat((await Ingredient.findByPk(ing.id)).current_stock) || 0;

    // 원복 (멱등 — 검증이 재고를 남기지 않는다)
    await request('POST', `/restaurants/${rest.id}/inventory/adjust`, { ingredient_id: ing.id, new_quantity: qtyBefore }, auth);
    if (!before) await RestaurantIngredientStock.destroy({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });

    return qtyAfter === qtyBefore + 3 && brandRowAfter === brandRowBefore;
  });

  test('pos', '브랜드 재고: 남의 재료 id 로 입고·차감 불가 (IDOR)', async () => {
    const { Restaurant, Ingredient, User } = require('../models');
    const { Op } = require('sequelize');
    const jwtLib = require('jsonwebtoken');
    const rest = await Restaurant.findOne({ where: { brand_id: { [Op.ne]: null } } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    // 이 매장 것도, 이 매장의 부모 브랜드 것도 아닌 재료
    const foreign = await Ingredient.findOne({
      where: {
        [Op.and]: [
          { [Op.or]: [{ restaurant_id: { [Op.ne]: rest.id } }, { restaurant_id: null }] },
          { [Op.or]: [{ brand_id: { [Op.ne]: rest.brand_id } }, { brand_id: null }] }
        ]
      }
    });
    if (!foreign) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };
    const recv = await request('POST', `/restaurants/${rest.id}/inventory/receive`, { ingredient_id: foreign.id, quantity: 1 }, auth);
    const ded = await request('POST', `/restaurants/${rest.id}/inventory/deduct`, { ingredient_id: foreign.id, quantity: 1 }, auth);
    return recv.status === 404 && ded.status === 404;
  });

  test('pos', '브랜드 재고: 주문 차감도 오버레이를 깎는다 (브랜드 행 불변)', async () => {
    const src = require('fs').readFileSync(require('path').join(__dirname, '../services/inventoryDeductionService.js'), 'utf8');
    // 차감이 Ingredient.update({current_stock}) 로 돌아가면 입고(오버레이)와 장부가 갈라진다
    const usesOverlay = /applyStock\(/.test(src) && /stockFor\(/.test(src);
    const directWrite = /Ingredient\.update\(\s*\{\s*current_stock/.test(src);
    // FIFO 배치도 매장 스코프여야 형제 매장 배치를 소진하지 않는다
    const scopedFifo = /restaurant_id: restaurantId/.test(src);
    return usesOverlay && !directWrite && scopedFifo;
  });

  // ── 브랜드 재료 실사 · 발주 제안 · 매장별 PAR (2026-07-13) ───────────────────
  // 실사·발주제안은 브랜드 표준 재료를 포함해야 하고, 결과는 **이 매장에만** 반영돼야 한다.
  // (브랜드 공유 행을 갱신하면 형제 매장 재고·사용량이 통째로 오염된다.)
  test('pos', '브랜드 재고: 실사에 브랜드 재료 포함 + 오버레이만 갱신 (브랜드 행 불변)', async () => {
    const { Restaurant, Ingredient, User, RestaurantIngredientStock, StockTake, StockTakeItem, InventoryTransaction, StockAlert } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true, track_stock: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    // 실제 진행 중인 실사가 있으면 방해하지 않는다
    const busy = await StockTake.findOne({ where: { restaurant_id: rest.id, status: 'in_progress' } });
    if (busy) return true;

    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };
    const brandStockBefore = String(ing.current_stock);
    const overlayBefore = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });

    // ⚠ 정리는 **이 테스트가 만든 행만** 지운다. health-check 는 `--host=https://purplehere.com`
    //   으로 운영에서도 도는 스크립트라, ingredient/restaurant 조건만으로 destroy 하면
    //   실매장의 실사 이력·미해소 알림이 통째로 날아간다. (Fable 2026-07-13)
    //   참고: 완료 시 그 매장 **자기 소유 재료**에도 last_stock_take_at/last_actual_stock 스탬프가
    //   찍힌다(수량은 actual=theoretical 이라 불변) — 스탬프는 원복하지 않는다.
    const { Op: OpHC } = require('sequelize');
    const txBefore = (await InventoryTransaction.findAll({
      where: { restaurant_id: rest.id, ingredient_id: ing.id }, attributes: ['id'], raw: true
    })).map((r) => r.id);
    const alertBefore = (await StockAlert.findAll({
      where: { restaurant_id: rest.id, ingredient_id: ing.id }, attributes: ['id'], raw: true
    })).map((r) => r.id);

    const create = await request('POST', `/restaurants/${rest.id}/stock-takes`, {}, auth);
    const st = create.body?.data;
    if (create.status !== 200 || !st) return false;
    const items = st.items || [];
    const brandItem = items.find((i) => i.ingredient_id === ing.id);

    let verdict = !!brandItem; // 실사 대상에 브랜드 재료가 있어야 한다
    if (verdict) {
      const payload = items.map((i) => ({
        id: i.id,
        actual_stock: i.ingredient_id === ing.id ? 7 : Number(i.theoretical_stock) || 0
      }));
      await request('PUT', `/restaurants/${rest.id}/stock-takes/${st.id}/items`, { items: payload }, auth);
      const done = await request('POST', `/restaurants/${rest.id}/stock-takes/${st.id}/complete`, {}, auth);
      const overlay = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
      const brandAfter = await Ingredient.findByPk(ing.id);
      verdict = done.status === 200
        && overlay && Number(overlay.current_stock) === 7 && Number(overlay.last_actual_stock) === 7
        && String(brandAfter.current_stock) === brandStockBefore; // 브랜드 행 불변
    }

    // 원복 — 테스트가 만든 행만 (기존 이력·알림 보존)
    await StockTakeItem.destroy({ where: { stock_take_id: st.id } });
    await StockTake.destroy({ where: { id: st.id }, force: true });
    await InventoryTransaction.destroy({
      where: {
        restaurant_id: rest.id, ingredient_id: ing.id,
        ...(txBefore.length ? { id: { [OpHC.notIn]: txBefore } } : {})
      }
    });
    await StockAlert.destroy({
      where: {
        restaurant_id: rest.id, ingredient_id: ing.id,
        ...(alertBefore.length ? { id: { [OpHC.notIn]: alertBefore } } : {})
      }
    });
    if (overlayBefore) {
      await RestaurantIngredientStock.update(
        { current_stock: overlayBefore.current_stock, last_actual_stock: overlayBefore.last_actual_stock },
        { where: { restaurant_id: rest.id, ingredient_id: ing.id } }
      );
    } else {
      await RestaurantIngredientStock.destroy({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    }
    return verdict;
  });

  test('pos', '브랜드 재고: 발주 제안에 브랜드 재료 + 매장별 PAR 반영', async () => {
    const { Restaurant, Ingredient, User, RestaurantIngredientStock } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true, track_stock: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    const before = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    // 재고 0 + 매장 min_stock 5 → 제안 대상이 되어야 한다 (min 0·usage 0 이면 제안수량 0 이라 안 뜬다)
    const [row] = await RestaurantIngredientStock.findOrCreate({
      where: { restaurant_id: rest.id, ingredient_id: ing.id },
      defaults: { restaurant_id: rest.id, ingredient_id: ing.id, current_stock: 0 }
    });
    await row.update({ current_stock: 0, min_stock: 5 });

    const sug = await request('GET', `/restaurants/${rest.id}/inventory/reorder-suggestions`, null, auth);
    const hit = (sug.body?.data || []).find((x) => x.ingredient?.id === ing.id);
    const verdict = sug.status === 200 && !!hit && hit.is_brand_shared === true && Number(hit.min_stock) === 5;

    // 원복
    if (before) await row.update({ current_stock: before.current_stock, min_stock: before.min_stock });
    else await row.destroy();
    return verdict;
  });

  // 발주 제안은 **두 곳**이다: 대시보드 제안(/inventory/reorder-suggestions)과
  // 재고화면 Bulk Order 체크박스·발주 페이지 제안 패널(/purchase-orders/suggestions).
  // 후자만 브랜드 재료를 빼면 "부족하다고 뜨는데 담을 수가 없는" 반쪽이 된다(Fable 2026-07-13).
  test('pos', '브랜드 재고: Bulk Order 제안(/purchase-orders/suggestions)에도 브랜드 재료', async () => {
    const { Restaurant, Ingredient, User, RestaurantIngredientStock } = require('../models');
    const jwtLib = require('jsonwebtoken');
    const ing = await Ingredient.findOne({ where: { owner_type: 'brand', is_active: true, track_stock: true } });
    if (!ing) return true;
    const rest = await Restaurant.findOne({ where: { brand_id: ing.brand_id } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    const before = await RestaurantIngredientStock.findOne({ where: { restaurant_id: rest.id, ingredient_id: ing.id } });
    const [row] = await RestaurantIngredientStock.findOrCreate({
      where: { restaurant_id: rest.id, ingredient_id: ing.id },
      defaults: { restaurant_id: rest.id, ingredient_id: ing.id, current_stock: 0 }
    });
    await row.update({ current_stock: 0, min_stock: 5 });   // 브랜드 행 min_stock 은 0 이라 SQL 필터로는 안 잡힌다

    const sug = await request('GET', '/purchase-orders/suggestions', null, auth);
    const items = (sug.body?.data?.groups || []).flatMap((g) => g.items || []);
    const hit = items.find((i) => i.ingredient?.id === ing.id);
    const verdict = sug.status === 200 && !!hit && hit.is_brand_shared === true && Number(hit.ingredient.min_stock) === 5;

    if (before) await row.update({ current_stock: before.current_stock, min_stock: before.min_stock });
    else await row.destroy();
    return verdict;
  });

  test('pos', '브랜드 재고: 남의 매장 실사 조작 불가 (stockTakeId IDOR)', async () => {
    const { Restaurant, User, StockTake } = require('../models');
    const { Op } = require('sequelize');
    const jwtLib = require('jsonwebtoken');
    const rest = await Restaurant.findOne({ where: { id: { [Op.ne]: null } } });
    if (!rest) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: rest.id } });
    if (!ra) return true;
    const other = await Restaurant.findOne({ where: { id: { [Op.ne]: rest.id } } });
    if (!other) return true;

    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };
    const foreign = await StockTake.create({
      restaurant_id: other.id, stock_take_date: new Date(), status: 'in_progress', created_by: ra.id
    });

    const g = await request('GET', `/restaurants/${rest.id}/stock-takes/${foreign.id}`, null, auth);
    const p = await request('PUT', `/restaurants/${rest.id}/stock-takes/${foreign.id}/items`, { items: [] }, auth);
    const c = await request('POST', `/restaurants/${rest.id}/stock-takes/${foreign.id}/complete`, {}, auth);
    const x = await request('POST', `/restaurants/${rest.id}/stock-takes/${foreign.id}/cancel`, {}, auth);

    await StockTake.destroy({ where: { id: foreign.id }, force: true });
    return g.status === 404 && p.status === 404 && c.status === 404 && x.status === 404;
  });

  // ── 발주 오너 승인 게이트 (2026-07-13) ──────────────────────────────────────
  // 발주가 판매자에게 나가는 경로는 **세 곳**이다: submit / bulk auto_submit / mark-sent-external.
  // 셋 다 오너 승인 게이트(utils/poOwnerApproval.applySubmitGate)를 타야 한다 —
  // 실제로 bulk·external 두 경로가 승인 없이 발주를 내보내고 있었다(Fable 2026-07-13 적발).
  // ── FG 출고 차감 · BG/FG 구매자 반품 (2026-07-13, Fable B1·B2) ──────────────
  // FG 판매자는 **출고 때 재고를 아예 안 깎으면서** 반품 때만 늘렸다(반대 비대칭 = 재고 인플레).
  // BG 가 구매자면 반품 생성이 **500**(ingredient_id NOT NULL 인데 BG 라인은 product_ingredient_id).
  test('pos', '반품: 라인 FK 스키마 (BG 재고아이템 라인도 반품 가능)', async () => {
    const { sequelize } = require('../config/database');
    const [cols] = await sequelize.query(
      "SELECT column_name AS name, is_nullable AS nullable FROM information_schema.columns " +
      "WHERE table_schema = DATABASE() AND table_name = 'purchase_order_returns'"
    );
    const by = Object.fromEntries(cols.map((c) => [String(c.name || c.COLUMN_NAME).toLowerCase(), c]));
    const hasPi = !!by['product_ingredient_id'];
    const ingNullable = by['ingredient_id']
      && String(by['ingredient_id'].nullable || by['ingredient_id'].IS_NULLABLE).toUpperCase() === 'YES';
    return hasPi && ingNullable;   // 마이그 누락 시 fail-closed
  });

  // 소스 grep 이 아니라 **실제 동작**으로 잡는다 — 식별자만 지키고 로직이 망가지면 grep 은 통과한다.
  test('pos', '반품: BG 구매자 반품이 본사 재고를 줄인다 (예전엔 생성부터 500)', async () => {
    const { Op: OpB2 } = require('sequelize');
    const {
      PurchaseOrder, PurchaseOrderItem, PurchaseOrderReturn, ProductIngredient,
      Brand, User, InventoryTransaction, Invoice, InvoiceItem
    } = require('../models');
    const jwtLib = require('jsonwebtoken');

    const bg = await User.findOne({ where: { role: 'Brand General', brand_id: { [OpB2.ne]: null } } });
    const sa = await User.findOne({ where: { role: 'System Admin' } });
    const pIng = bg ? await ProductIngredient.findOne({ where: { owner_user_id: bg.id } }) : null;
    if (!bg || !sa || !pIng) return true;

    const stockBefore = pIng.current_stock;
    const trackBefore = pIng.track_stock;
    let po = null, cn = null;
    try {
      await pIng.update({ current_stock: 40, track_stock: true });
      po = await PurchaseOrder.create({
        po_number: `HC-B2-${Date.now()}`, entity_type: 'brand', entity_id: bg.brand_id,
        seller_type: 'supplier', seller_entity_id: 1, status: 'delivered', currency: 'MYR',
        subtotal: 100, total_amount: 100, created_by_user_id: bg.id
      });
      const item = await PurchaseOrderItem.create({
        purchase_order_id: po.id, product_ingredient_id: pIng.id,
        description: pIng.name, quantity_ordered: 10, quantity_received: 10,
        unit_price: 10, unit_conversion: 2, line_total: 100   // conv≠1 로 환산까지 검증
      });

      const bgAuth = { Authorization: `Bearer ${jwtLib.sign({ userId: bg.id }, process.env.JWT_SECRET, { expiresIn: '5m' })}` };
      const saAuth = { Authorization: `Bearer ${jwtLib.sign({ userId: sa.id }, process.env.JWT_SECRET, { expiresIn: '5m' })}` };

      const created = await request('POST', `/purchase-orders/${po.id}/returns`,
        { items: [{ purchase_order_item_id: item.id, quantity: 2, reason: 'damaged' }] }, bgAuth);
      if (created.status !== 201) return false;   // 예전엔 500 (ingredient_id NOT NULL)
      const retId = created.body?.data?.[0]?.id;
      const retRow = await PurchaseOrderReturn.findByPk(retId);
      if (!retRow || retRow.product_ingredient_id !== pIng.id || retRow.ingredient_id !== null) return false;

      const appr = await request('POST', `/seller-orders/${po.id}/returns/${retId}/approve`, {}, saAuth);
      if (appr.status !== 200) return false;

      const after = await ProductIngredient.findByPk(pIng.id);
      const stockOk = Number(after.current_stock) === 36;   // 40 − (2 × conv 2)
      const tx = await InventoryTransaction.findOne({
        where: { purchase_order_id: po.id, transaction_type: 'return_out' }
      });
      const ledgerOk = !!tx && tx.product_ingredient_id === pIng.id && Number(tx.quantity_change) === -4;

      const brand = await Brand.findByPk(bg.brand_id);
      cn = await Invoice.findOne({ where: { invoice_number: { [OpB2.like]: `CN-${po.po_number}%` } } });
      const payerOk = !!cn && cn.payer_type === 'brand_manager' && Number(cn.payer_id) === Number(brand.owner_id);

      return stockOk && ledgerOk && payerOk;
    } finally {
      if (cn) { await InvoiceItem.destroy({ where: { invoice_id: cn.id }, force: true }); await Invoice.destroy({ where: { id: cn.id }, force: true }); }
      if (po) {
        await PurchaseOrderReturn.destroy({ where: { purchase_order_id: po.id }, force: true });
        await InventoryTransaction.destroy({ where: { purchase_order_id: po.id } });
        await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id } });
        await PurchaseOrder.destroy({ where: { id: po.id }, force: true });
      }
      await pIng.update({ current_stock: stockBefore, track_stock: trackBefore });
    }
  });

  test('pos', '반품: FG 출고 차감 ↔ 반품 환원 대칭 (재고 인플레 금지)', async () => {
    const { Op: OpB1 } = require('sequelize');
    const {
      PurchaseOrder, PurchaseOrderItem, PurchaseOrderReturn, Ingredient, IngredientSellerProduct,
      FoodcourtProduct, Foodcourt, Restaurant, User, InventoryTransaction, Invoice, InvoiceItem
    } = require('../models');
    const jwtLib = require('jsonwebtoken');

    const fc = await Foodcourt.findOne();
    const fcOwner = fc ? await User.findByPk(fc.owner_id) : null;
    const rest = await Restaurant.findOne({ where: { foodcourt_id: fc ? fc.id : -1 } })
      || await Restaurant.findOne({ where: { is_demo: true } });
    const ra = rest ? await User.findOne({ where: { restaurant_id: rest.id, role: 'Restaurant Admin' } }) : null;
    const ing = rest ? await Ingredient.findOne({ where: { restaurant_id: rest.id, is_active: true } }) : null;
    if (!fc || !fcOwner || !ra || !ing) return true;

    let fp = null, mapping = null, po = null, cn = null;
    try {
      fp = await FoodcourtProduct.create({
        foodcourt_id: fc.id, name: '__HC_FP__', unit: 'kg', unit_price: 5, current_stock: 50, is_active: true
      });
      mapping = await IngredientSellerProduct.create({
        ingredient_id: ing.id, seller_type: 'foodcourt', seller_entity_id: fc.id,
        seller_product_id: fp.id, unit_price: 5, unit_conversion: 1, is_active: true
      });
      po = await PurchaseOrder.create({
        po_number: `HC-B1-${Date.now()}`, entity_type: 'restaurant', entity_id: rest.id,
        seller_type: 'foodcourt', seller_entity_id: fc.id, status: 'confirmed', currency: 'MYR',
        subtotal: 30, total_amount: 30, created_by_user_id: ra.id
      });
      const item = await PurchaseOrderItem.create({
        purchase_order_id: po.id, ingredient_id: ing.id, ingredient_seller_product_id: mapping.id,
        description: ing.name, quantity_ordered: 6, quantity_received: 6,
        unit_price: 5, unit_conversion: 1, line_total: 30
      });

      const fgAuth = { Authorization: `Bearer ${jwtLib.sign({ userId: fcOwner.id }, process.env.JWT_SECRET, { expiresIn: '5m' })}` };
      const raAuth = { Authorization: `Bearer ${jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' })}` };

      // 출고 → FG 재고가 줄어야 한다 (예전엔 아무것도 안 깎았다)
      const ship = await request('POST', `/seller-orders/${po.id}/ship`, { tracking_number: 'HC' }, fgAuth);
      const afterShip = await FoodcourtProduct.findByPk(fp.id);
      const shipOk = ship.status === 200 && Number(afterShip.current_stock) === 44;

      // 반품 승인 → 원래대로 복귀해야 한다 (출고와 대칭 = 인플레 없음)
      await po.update({ status: 'delivered' });
      const created = await request('POST', `/purchase-orders/${po.id}/returns`,
        { items: [{ purchase_order_item_id: item.id, quantity: 6, reason: 'damaged' }] }, raAuth);
      const retId = created.body?.data?.[0]?.id;
      const appr = await request('POST', `/seller-orders/${po.id}/returns/${retId}/approve`, {}, fgAuth);
      const afterReturn = await FoodcourtProduct.findByPk(fp.id);
      const symmetryOk = appr.status === 200 && Number(afterReturn.current_stock) === 50;

      cn = await Invoice.findOne({ where: { invoice_number: { [OpB1.like]: `CN-${po.po_number}%` } } });
      return shipOk && symmetryOk;
    } finally {
      if (cn) { await InvoiceItem.destroy({ where: { invoice_id: cn.id }, force: true }); await Invoice.destroy({ where: { id: cn.id }, force: true }); }
      if (po) {
        await PurchaseOrderReturn.destroy({ where: { purchase_order_id: po.id }, force: true });
        await InventoryTransaction.destroy({ where: { purchase_order_id: po.id } });
        await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id } });
        await PurchaseOrder.destroy({ where: { id: po.id }, force: true });
      }
      if (mapping) await IngredientSellerProduct.destroy({ where: { id: mapping.id }, force: true });
      if (fp) await FoodcourtProduct.destroy({ where: { id: fp.id }, force: true });
    }
  });

  // ── 배포 스크립트 안전 계약 (2026-07-13) ────────────────────────────────────
  // 배포 게이트는 **fail-closed 는 맞지만 fail-silent 는 안 된다.** 실제로 스키마 export 가
  // 실패했을 때 stderr 를 버려서 아무 말 없이 exit 2 로 죽었고(반품 배포 1차 시도),
  // 백업 cp 는 실패해도 `|| true` 로 넘어가며 "Backup created" 를 찍고 있었다(롤백 불가).
  test('pos', '배포 스크립트: 스키마 export·백업 실패가 조용히 넘어가지 않는다', async () => {
    const fs = require('fs');
    const path = require('path');
    const shPath = path.join(__dirname, '../../deploy-to-production.sh');
    if (!fs.existsSync(shPath)) return true;
    const sh = fs.readFileSync(shPath, 'utf8');
    // 이 계약은 **개발기의 배포 스크립트**에 대한 것이다. 운영 서버(/var/www)에는 동기화되지 않는
    // 옛 껍데기 파일이 남아 있어서(2025-11), 운영에서 health-check 를 돌리면 그걸 읽고 실패했다.
    // 현행 스크립트인지("Safety gate" 마커)로 판별해, 아니면 이 환경의 검사 대상이 아니다 → skip.
    if (!/Safety gate/.test(sh)) return true;

    // 스키마 export: stderr 를 버리지 않고, 재시도하고, 실패하면 error 로 죽는다
    const schemaLoud = /export_dev_schema\(\)/.test(sh)
      && /dev 스키마 export 3회 실패/.test(sh)
      && !/node compare-schema\.js --export --out \/tmp\/deploy_dev_schema\.json 2>\/dev\/null/.test(sh);

    // 백업: 실패 시 error, 그리고 실제로 만들어졌는지 검증한 뒤에만 진행
    const backupVerified = /백엔드 백업 실패/.test(sh)
      && /백업이 비어 있다/.test(sh)
      && !/cp -r \$REMOTE_PROD_BACKEND [^\n]*2>\/dev\/null \|\| true/.test(sh);

    return schemaLoud && backupVerified;
  });

  // ── 반품 재고 환원 (2026-07-13) ─────────────────────────────────────────────
  // 반품 승인은 **입고의 정확한 역방향**이어야 한다: 구매자 재고 차감 + 판매자 자기 재고 환원.
  // 브랜드 판매자 분기가 판매자 재고가 아니라 **구매자의 재료 행**을 올려서, 1단계 차감과
  // 상쇄돼 net 0 이었다(반품해도 매장 재고가 안 줄고 본사 재고는 복구 안 됨 — 실증 후 수정).
  test('pos', '반품: 브랜드 판매자 환원이 구매자 재료를 되올리지 않는다 (net 0 회귀)', async () => {
    const fs = require('fs');
    const path = require('path');
    const raw = fs.readFileSync(path.join(__dirname, '../routes/po-returns.js'), 'utf8');
    // 주석은 제외하고 **실제 코드**만 본다 (주석이 옛 코드를 인용하고 있어 오탐 났다)
    const src = raw.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');
    // 브랜드 분기가 BOM(ProductRecipeIngredient → ProductIngredient) 으로 환원하는가
    const brandBranch = src.slice(src.indexOf("seller_type === 'brand'"), src.indexOf("seller_type === 'foodcourt'"));
    const usesBom = /ProductRecipeIngredient\.findAll/.test(brandBranch) && /ProductIngredient\.findByPk/.test(brandBranch);
    // 구매자 재료 행(ret.ingredient_id)을 다시 올리면 안 된다 (net 0 의 원인)
    const reRaisesBuyer = /[^t]Ingredient\.findByPk\(ret\.ingredient_id/.test(brandBranch);
    // 구매자 차감이 unit_conversion 을 반영하고 원장을 남기는가
    const buyerScoped = /unit_conversion/.test(src) && /'return_out'/.test(src);
    return usesBom && !reRaisesBuyer && buyerScoped;
  });

  test('pos', '반품: 이중 승인·누적 초과 차단 (재고·크레딧노트 이중 발행 금지)', async () => {
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(path.join(__dirname, '../routes/po-returns.js'), 'utf8');
    // 승인/반려가 행을 잠그는가 (동시 승인 2발 → 재고 2번 환원 + CN 2장 방지)
    const locks = /loadAndCheckReturn\(req, t\)/.test(src) && /lock: t\.LOCK\.UPDATE, transaction: t/.test(src);
    // 생성·승인 모두 기존 반품 합산을 본다 (5개 입고에 5개 반품을 세 번 요청해도 통과하던 구멍)
    const sums = (src.match(/PurchaseOrderReturn\.sum\('quantity'/g) || []).length >= 2;
    return locks && sums;
  });

  test('pos', '발주 승인: 게이트가 3경로(submit·bulk·외부전송) 모두에 적용', async () => {
    const src = require('fs');
    const path = require('path');
    const crud = src.readFileSync(path.join(__dirname, '../routes/purchase-orders-crud.js'), 'utf8');
    const wf = src.readFileSync(path.join(__dirname, '../routes/purchase-orders-workflow.js'), 'utf8');
    // bulk auto_submit 과 mark-sent-external 이 게이트를 호출하는가 (직접 submitted 직행 금지)
    const bulkGated = /applySubmitGate\(/.test(crud);
    const wfGated = (wf.match(/applySubmitGate\(/g) || []).length >= 2; // submit + mark-sent-external
    // mark-received 는 화이트리스트(pending_approval 수령 금지)
    const receiveGuarded = /RECEIVABLE\s*=\s*\[/.test(wf) && !/po\.status === 'received' \|\| po\.status === 'cancelled'/.test(wf);
    return bulkGated && wfGated && receiveGuarded;
  });

  test('pos', '발주 승인: 오너 연결+ON 이면 일괄발주도 pending_approval (우회 금지)', async () => {
    const { Restaurant, User, PurchaseOrder, PurchaseOrderItem, Ingredient, IngredientSellerProduct } = require('../models');
    const { QueryTypes, Op: OpPO } = require('sequelize');
    const { sequelize } = require('../config/database');
    const jwtLib = require('jsonwebtoken');

    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    if (!demo) return true;
    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: demo.id } });
    // 데모/테스트 오너만 — 임의 실계정을 오너로 붙이지 않는다
    const owner = await User.findOne({
      where: { role: 'Restaurant Owner', [OpPO.or]: [{ username: { [OpPO.like]: '%demo%' } }, { username: { [OpPO.like]: '%test%' } }] }
    });
    if (!ra || !owner) return true;
    const mapping = await IngredientSellerProduct.findOne({
      include: [{ model: Ingredient, as: 'ingredient', where: { restaurant_id: demo.id }, required: true }]
    });
    if (!mapping) return true;

    // ⚠ bulk 는 **같은 판매자의 기존 draft 에 병합(mergeDraft)** 한다. 기존 draft 가 있으면
    //   테스트가 그 실주문을 통째로 삼켜 삭제하게 된다(실제로 dev 에서 draft 1건 소실 사고).
    //   → 기존 draft 가 있으면 이 케이스는 건너뛴다.
    const existingDraft = await PurchaseOrder.findOne({
      where: {
        entity_type: 'restaurant', entity_id: demo.id, status: 'draft',
        seller_type: mapping.seller_type, seller_entity_id: mapping.seller_entity_id
      }
    });
    if (existingDraft) return true;

    const settingsBefore = JSON.parse(JSON.stringify(demo.operation_settings || {}));
    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };
    let po = null;

    try {
      await sequelize.query(
        `INSERT INTO restaurant_managers (restaurant_id, manager_id, relationship_type, assigned_at, createdAt, updatedAt)
         VALUES (:rid, :uid, 'ownership', NOW(), NOW(), NOW())`,
        { replacements: { rid: demo.id, uid: owner.id }, type: QueryTypes.INSERT }
      );
      await demo.update({ operation_settings: { ...settingsBefore, requirePoOwnerApproval: true } });

      const res = await request('POST', '/purchase-orders/bulk', {
        groups: [{
          seller_type: mapping.seller_type, seller_entity_id: mapping.seller_entity_id,
          items: [{ ingredient_id: mapping.ingredient_id, quantity_ordered: 1, ingredient_seller_product_id: mapping.id }]
        }],
        auto_submit: true
      }, auth);
      po = res.body?.data?.orders?.[0] || null;
      const gated = res.status === 201 && po?.status === 'pending_approval';

      // 승인 대기 발주는 입고로 끝낼 수 없다
      let receiveBlocked = true;
      if (po) {
        const recv = await request('POST', `/purchase-orders/${po.id}/mark-received`, {}, auth);
        receiveBlocked = recv.status === 400;
      }
      return gated && receiveBlocked;
    } finally {
      // 예외가 나도 ownership 행·설정이 데모 매장에 남으면 안 된다
      if (po?.id) {
        await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id } });
        await PurchaseOrder.destroy({ where: { id: po.id }, force: true });
      }
      await sequelize.query(
        `DELETE FROM restaurant_managers WHERE restaurant_id = :rid AND manager_id = :uid AND relationship_type = 'ownership'`,
        { replacements: { rid: demo.id, uid: owner.id }, type: QueryTypes.DELETE }
      );
      await demo.update({ operation_settings: settingsBefore });
    }
  });

  // 승인 전 발주는 **판매자에게 존재하지 않는 주문**이다. draft(장바구니)·pending_approval 이
  // 판매자 포털 목록·상세에 그대로 보이고 있었다(Fable 2026-07-13) — 이 기능의 계약을 정면으로 깨는 결함.
  test('pos', '발주 승인: 판매자에게 draft/pending_approval 미노출 (승인 전 유출 금지)', async () => {
    const { PurchaseOrder, User } = require('../models');
    const { Op: OpSL } = require('sequelize');
    const jwtLib = require('jsonwebtoken');

    const supAdmin = await User.findOne({ where: { role: 'Supplier Admin', supplier_company_id: { [OpSL.ne]: null } } });
    if (!supAdmin) return true;
    const token = jwtLib.sign({ userId: supAdmin.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };

    // 목록: 숨김 상태가 하나도 없어야 한다 (status 를 강제로 요청해도 마찬가지)
    const list = await request('GET', '/seller-orders?limit=100', null, auth);
    if (list.status !== 200) return false;
    const leaked = (list.body?.data || []).some((p) => ['draft', 'pending_approval'].includes(p.status));
    const forcedDraft = await request('GET', '/seller-orders?status=draft&limit=100', null, auth);
    const forcedLeak = (forcedDraft.body?.data || []).some((p) => p.status === 'draft');

    // 상세: 이 판매자의 draft/pending PO 가 실제로 있으면 404 여야 한다
    let detailBlocked = true;
    const hidden = await PurchaseOrder.findOne({
      where: {
        seller_type: 'supplier', seller_entity_id: supAdmin.supplier_company_id,
        status: { [OpSL.in]: ['draft', 'pending_approval'] }
      }
    });
    if (hidden) {
      const d = await request('GET', `/seller-orders/${hidden.id}`, null, auth);
      detailBlocked = d.status === 404;
    }
    return !leaked && !forcedLeak && detailBlocked;
  });

  test('pos', '발주 승인: 오너 미연결 매장은 설정과 무관하게 즉시 submitted (기존 동작 보존)', async () => {
    const { Restaurant, User, PurchaseOrder, PurchaseOrderItem, Ingredient, IngredientSellerProduct } = require('../models');
    const { QueryTypes } = require('sequelize');
    const { sequelize } = require('../config/database');
    const jwtLib = require('jsonwebtoken');

    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    if (!demo) return true;
    // 오너 연결이 실제로 없는지 확인 (있으면 이 케이스는 판정 불가 → skip)
    const owners = await sequelize.query(
      `SELECT 1 AS x FROM restaurant_managers WHERE restaurant_id = :rid AND relationship_type = 'ownership' LIMIT 1`,
      { replacements: { rid: demo.id }, type: QueryTypes.SELECT }
    );
    if (owners.length) return true;

    const ra = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: demo.id } });
    const mapping = await IngredientSellerProduct.findOne({
      include: [{ model: Ingredient, as: 'ingredient', where: { restaurant_id: demo.id }, required: true }]
    });
    if (!ra || !mapping) return true;

    // bulk 의 mergeDraft 가 기존 draft 를 삼키지 않도록 — 있으면 skip
    const existingDraft = await PurchaseOrder.findOne({
      where: {
        entity_type: 'restaurant', entity_id: demo.id, status: 'draft',
        seller_type: mapping.seller_type, seller_entity_id: mapping.seller_entity_id
      }
    });
    if (existingDraft) return true;

    const token = jwtLib.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const auth = { Authorization: `Bearer ${token}` };
    const res = await request('POST', '/purchase-orders/bulk', {
      groups: [{
        seller_type: mapping.seller_type, seller_entity_id: mapping.seller_entity_id,
        items: [{ ingredient_id: mapping.ingredient_id, quantity_ordered: 1, ingredient_seller_product_id: mapping.id }]
      }],
      auto_submit: true
    }, auth);
    const po = res.body?.data?.orders?.[0];
    const verdict = res.status === 201 && po?.status === 'submitted';

    if (po) {
      await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id } });
      await PurchaseOrder.destroy({ where: { id: po.id }, force: true });
    }
    return verdict;
  });

  test('pos', '브랜드 재고: 본사 구매 체인(product_ingredients) 무접촉', async () => {
    const { ProductIngredient, IngredientSellerProduct } = require('../models');
    const { Op } = require('sequelize');
    // BG 본사 재고와 그 공급처 매핑은 이번 기능이 건드리지 않는다(평행 체인 유지).
    // 스키마가 사라지면(=통합 시도) 여기서 깨진다.
    const piCount = await ProductIngredient.count();
    const piMappings = await IngredientSellerProduct.count({ where: { product_ingredient_id: { [Op.ne]: null } } });
    return Number.isInteger(piCount) && Number.isInteger(piMappings);
  });

  // 구독 가격의 단일 소스 = 서버(PlanTemplate/PlanPrice). 프론트·라우트에 박아둔 가격표
  // (basic29/pro99/ent199)는 실제 값(49/99/179)과 달랐다 — 다시 하드코딩되면 여기서 깨진다.
  test('pos', '구독 플랜 가격 = 서버 PlanTemplate 기준 (하드코딩 가격표 금지)', async () => {
    const { Restaurant } = require('../models');
    const PlanTemplate = require('../models/PlanTemplate');
    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    if (!demo) return true;

    const r = await request('GET', `/subscriptions/manager/restaurant/${demo.id}/plan-options`, null, auth);
    if (r.status !== 200) return false;
    const plans = r.body?.data?.available_plans || [];
    if (!plans.length) return false;

    for (const p of plans) {
      const tpl = await PlanTemplate.findByPk(p.id);
      if (!tpl) return false;                 // 응답의 플랜이 DB 에 실재해야 함
      if (!(p.monthly_price > 0)) return false; // 가격이 실수치(0/누락 아님)
    }

    // 플랜 목록 화면(/api/plans)과 구독 변경(plan-options)이 **같은 값**을 줘야 한다.
    // 두 화면이 다른 가격을 보이면 사용자는 본 가격과 다른 금액으로 청구된다
    // (2026-07-11 이전: 플랜 페이지에 29/99/199 하드코딩 ↔ 실제 청구 49/99/179).
    const lp = await request('GET', '/plans');
    if (lp.status !== 200) return false;
    const listed = (Array.isArray(lp.body) ? lp.body : (lp.body?.data || []))
      .filter((p) => p.plan_target === 'restaurant' && p.is_active);
    if (!listed.length) return false;

    const currency = r.body?.data?.current?.currency || 'MYR';  // 그 매장의 청구 통화 기준
    for (const p of plans) {
      const l = listed.find((x) => x.id === p.id);
      if (!l) continue;                       // 목록에 없는 플랜은 대조 대상 아님
      const listPrice = l.currency_prices?.[currency]?.monthly;
      if (listPrice == null) continue;        // 해당 통화 가격 미설정 → 폴백(대조 생략)
      if (Math.abs(Number(listPrice) - Number(p.monthly_price)) > 0.01) return false;
    }
    return true;
  });

  // 구독 계약 (2026-07-11 회귀 박제): 매니저 플랜 변경은 목업이 아니라 DB 에 저장돼야 하고,
  // 다운그레이드는 즉시가 아니라 "미래 날짜" 예약이어야 한다. 과거엔 ① 화면이 목업 파일을
  // 가리켜 저장이 아예 안 됐고 ② lapsed subscription_end 를 그대로 써서 예약일이 과거였다.
  test('pos', '매니저 다운그레이드 = 미래 예약 저장 + 취소 가능 (목업/과거날짜 회귀)', async () => {
    const { Restaurant } = require('../models');
    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    if (!demo) return true;

    const opts = async () => {
      const r = await request('GET', `/subscriptions/manager/restaurant/${demo.id}/plan-options`, null, auth);
      if (r.status !== 200) throw new Error(`plan-options ${r.status}`);
      return r.body.data;
    };

    const start = await opts();
    const before = start.current;
    const downgrade = (start.available_plans || []).find((p) => p.change_type === 'downgrade');
    if (!downgrade || !before.can_change) return true; // 데모 플랜 구성상 검증 불가 → skip

    const snapshot = {
      pending_plan_type: before.pending_plan_type,
      pending_plan_amount: before.pending_plan_amount,
      pending_billing_cycle: before.pending_billing_cycle,
      plan_change_date: before.plan_change_date,
      plan_change_type: before.plan_change_type,
    };

    try {
      const chg = await request('POST', '/subscriptions/change-plan', {
        restaurant_id: String(demo.id), new_plan_id: downgrade.id, new_billing_cycle: before.billing_cycle,
      }, auth);
      if (chg.status !== 200) return false;

      const after = (await opts()).current;
      const scheduled = after.pending_plan_type === downgrade.display_name;
      const planUnchanged = after.plan_type === before.plan_type; // 다운그레이드는 즉시 반영 금지
      const futureDate = !!after.plan_change_date && new Date(after.plan_change_date).getTime() > Date.now();

      const del = await request('DELETE', `/subscriptions/change-plan?restaurant_id=${demo.id}`, null, auth);
      const cleared = (await opts()).current.pending_plan_type === null;

      return scheduled && planUnchanged && futureDate && del.status === 200 && cleared;
    } finally {
      await Restaurant.update(snapshot, { where: { id: demo.id } });
    }
  });

  // 매니저 매출 계약 (2026-07-11 회귀 박제):
  //  ① 대시보드/세일즈 숫자는 실제 주문 집계여야 한다 (과거 Math.random 이었음)
  //  ② 주문 삭제는 소프트삭제(is_deleted=true)라 status 가 completed 로 남는다 →
  //     매출 쿼리가 is_deleted 를 안 거르면 삭제한 주문이 계속 매출로 잡혔다.
  // 데모 매장 + 인쇄 테스트와 동일 마커(orphan sweep 가 청소) → 멱등·운영 무영향.
  test('pos', '매니저 매출 = 실주문 반영 + 삭제주문 제외 (is_deleted 회귀)', async () => {
    const { Restaurant } = require('../models');
    const Order = require('../models/Order');
    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    if (!demo) return true; // 데모 매장 없으면 의미있는 검증 불가 → skip

    const AMOUNT = 33.33;
    const salesOf = async () => {
      const r = await request('GET', '/manager/sales-summary', null, auth);
      if (r.status !== 200) throw new Error(`sales-summary ${r.status}`);
      const row = (r.body?.data || []).find((x) => String(x.id) === String(demo.id));
      return { sales: row ? row.todaySales : 0, orders: row ? row.todayOrders : 0 };
    };

    const before = await salesOf();
    const order = await Order.create({
      restaurant_id: demo.id,
      customer_name: '__HC_PRINT_TEST__',
      table_number: 'HC-MGR',
      order_type: 'dine_in',
      status: 'completed',
      total_amount: AMOUNT,
      order_items: [{ id: 'hc-mgr-1', name: 'HC Manager Item', quantity: 1, price: AMOUNT }],
    });

    try {
      const after = await salesOf();
      const counted = Math.abs(after.sales - (before.sales + AMOUNT)) < 0.01 && after.orders === before.orders + 1;

      await order.update({ is_deleted: true, deleted_at: new Date() });
      const gone = await salesOf();
      const excluded = Math.abs(gone.sales - before.sales) < 0.01 && gone.orders === before.orders;

      return counted && excluded;
    } finally {
      await Order.destroy({ where: { id: order.id }, force: true });
    }
  });
}

// ============================================
// 카테고리 4: 모바일 흐름
// ============================================
function defineMobileTests({ customerToken, member, restId }) {
  // 모바일은 실제 slug가 필요 — 첫 restaurant slug 동적 조회
  let testSlug = 'seoul-bbq-house'; // 기본값

  test('mobile', '익명 restaurants/slug/:slug → 200 (모바일 메뉴 진입)', async () => {
    const r = await request('GET', `/restaurants/slug/${testSlug}`);
    if (r.status === 200) {
      // PaymentPage가 필요로 하는 필드 확인
      return r.body?.data?.payment_settings !== undefined && r.body?.data?.operation_settings !== undefined;
    }
    return false;
  });

  test('mobile', '익명 mobile/store/:slug → 200', async () => (await request('GET', `/mobile/store/${testSlug}`)).status === 200);
  test('mobile', '익명 mobile/menu/:slug → 200', async () => (await request('GET', `/mobile/menu/${testSlug}`)).status === 200);
  test('mobile', '익명 membership/settings/:rid → 200 (멤버십 정책 공개)', async () => (await request('GET', '/membership/settings/1')).status === 200);
  test('mobile', '익명 customers/auth (잘못된 자격) → 404 (계정없음)', async () => {
    const r = await request('POST', '/customers/auth', { identifier: 'nobody@nowhere.test', password: 'wrong' });
    return r.status === 404;
  });

  // Customer self-service
  const customerAuth = { Authorization: `Bearer ${customerToken}` };
  test('mobile', 'customer 본인 stats → 200', async () => {
    const r = await request('GET', `/customers/stats/${member.id}?restaurant_id=${restId}`, null, customerAuth);
    return r.status === 200;
  });
  test('mobile', 'customer 본인 orders → 200', async () => {
    const r = await request('GET', `/customers/${member.id}/orders?restaurant_id=${restId}`, null, customerAuth);
    return r.status === 200;
  });
  test('mobile', 'customer 본인 membership → 200', async () => {
    const r = await request('GET', `/membership/customer/${restId}/${member.id}`, null, customerAuth);
    return r.status === 200;
  });
}

// ============================================
// 카테고리 5: 결제 라우트 (위변조 방어)
// ============================================
// ============================================
// 카테고리: 예약 시스템 (R1 customer_id 회귀 가드)
// ============================================
function defineReservationTests({ customerToken }) {
  // R1 결함 회귀 가드: 신규 mobile 예약은 항상 customer_id NOT NULL 이어야 한다.
  // 첫 예약(RestaurantCustomer 없음)에서도 trans 안에서 findOrCreate → /me 에 보여야 한다.
  test('reservation', '신규 customer 예약 → customer_id NOT NULL + /me 포함', async () => {
    const Reservation = require('../models/Reservation');
    const RestaurantCustomer = require('../models/RestaurantCustomer');
    const { Restaurant } = require('../models');

    const all = await Restaurant.findAll({ limit: 200 });
    const enabled = all.find((r) => r.reservation_settings && r.reservation_settings.enabled);
    if (!enabled) return true; // 활성화된 매장 없으면 skip (의미 있는 회귀 검증 불가)

    const future = new Date(Date.now() + 7 * 86400000);
    future.setHours(20, 30, 0, 0);
    const phone = 'HC-' + Date.now();

    const createRes = await request(
      'POST',
      '/reservations',
      {
        restaurant_id: enabled.id,
        reserved_at: future.toISOString(),
        party_size: 2,
        guest_name: 'Health-Check',
        guest_phone: phone,
        notes: 'health-check'
      },
      { Authorization: `Bearer ${customerToken}` }
    );
    if (createRes.status !== 200 || !createRes.body?.success) return false;
    const id = createRes.body.data.id;

    let pass = false;
    try {
      const row = await Reservation.findByPk(id);
      const customerIdSet = !!(row && row.customer_id);

      const listRes = await request('GET', '/reservations/me', null, { Authorization: `Bearer ${customerToken}` });
      const listIncludes = listRes.status === 200 && Array.isArray(listRes.body?.data) && listRes.body.data.some((r) => r.id === id);

      pass = customerIdSet && listIncludes;
    } finally {
      // 트랜잭션 일관성 확인 후 정리. RestaurantCustomer 는 보존 (기존 데이터 가능성).
      await Reservation.destroy({ where: { id }, force: true });
    }
    return pass;
  });

  // 익명 차단 가드
  test('reservation', '익명 POST /reservations → 401', async () => {
    return (await request('POST', '/reservations', { restaurant_id: 1, reserved_at: new Date().toISOString(), party_size: 2, guest_name: 'x', guest_phone: 'x' })).status === 401;
  });

  // Cross-token 차단 가드 (admin token 으로 customer 엔드포인트 호출 → 401)
  test('reservation', 'admin token 으로 POST /reservations → 401 (customer 엔드포인트)', async () => {
    const { User } = require('../models');
    const admin = await User.findOne({ where: { role: 'System Admin' } });
    if (!admin) return true;
    const adminTok = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    return (await request('POST', '/reservations', { restaurant_id: 1, reserved_at: new Date().toISOString(), party_size: 2, guest_name: 'x', guest_phone: 'x' }, { Authorization: `Bearer ${adminTok}` })).status === 401;
  });

  // R1 후속 결함: completed 시 reservation_count 가 이중 증가하던 버그
  test('reservation', 'completed 후 reservation_count 정확히 1 (이중계산 차단)', async () => {
    const Reservation = require('../models/Reservation');
    const RestaurantCustomer = require('../models/RestaurantCustomer');
    const { Restaurant, User } = require('../models');

    const all = await Restaurant.findAll({ limit: 200 });
    const enabled = all.find((r) => r.reservation_settings && r.reservation_settings.enabled);
    if (!enabled) return true;
    const admin = await User.findOne({ where: { role: 'System Admin' } });
    if (!admin) return true;
    const adminTok = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '5m' });

    const future = new Date(Date.now() + 7 * 86400000);
    future.setHours(15, 30, 0, 0);
    const createRes = await request(
      'POST', '/reservations',
      { restaurant_id: enabled.id, reserved_at: future.toISOString(), party_size: 2, guest_name: 'HC-cnt', guest_phone: 'HC-cnt-' + Date.now() },
      { Authorization: `Bearer ${customerToken}` }
    );
    if (createRes.status !== 200) return false;
    const id = createRes.body.data.id;
    const rcAfterPost = await RestaurantCustomer.findByPk(createRes.body.data.customer_id);
    const countAfterPost = rcAfterPost.reservation_count;

    let pass = false;
    try {
      // confirmed → arrived → seated → completed
      for (const s of ['confirmed', 'arrived', 'seated', 'completed']) {
        await request('PATCH', `/reservations/${id}/status`, { status: s }, { Authorization: `Bearer ${adminTok}` });
      }
      await rcAfterPost.reload();
      // 이중계산이 없으면 카운트 변화 없음 (POST 시 이미 +1)
      pass = rcAfterPost.reservation_count === countAfterPost;
    } finally {
      await Reservation.destroy({ where: { id }, force: true });
    }
    return pass;
  });

  // R1 후속 결함: PATCH /me/:id 가 party_size 검증/슬롯 캐파 무시하던 버그
  test('reservation', 'PATCH /me/:id party_size > max_party 차단', async () => {
    const Reservation = require('../models/Reservation');
    const { Restaurant } = require('../models');

    const all = await Restaurant.findAll({ limit: 200 });
    const enabled = all.find((r) => r.reservation_settings && r.reservation_settings.enabled);
    if (!enabled) return true;
    const maxParty = enabled.reservation_settings?.slot?.max_party || 20;

    const future = new Date(Date.now() + 7 * 86400000);
    future.setHours(14, 0, 0, 0);
    const createRes = await request(
      'POST', '/reservations',
      { restaurant_id: enabled.id, reserved_at: future.toISOString(), party_size: 2, guest_name: 'HC-cap', guest_phone: 'HC-cap-' + Date.now() },
      { Authorization: `Bearer ${customerToken}` }
    );
    if (createRes.status !== 200) return false;
    const id = createRes.body.data.id;

    let pass = false;
    try {
      const patchRes = await request(
        'PATCH', `/reservations/me/${id}`,
        { party_size: maxParty + 50 },
        { Authorization: `Bearer ${customerToken}` }
      );
      const reloaded = await Reservation.findByPk(id);
      pass = patchRes.status >= 400 && reloaded.party_size === 2; // 차단 + DB 안 변함
    } finally {
      await Reservation.destroy({ where: { id }, force: true });
    }
    return pass;
  });
}

// DB 무결성 — Sequelize sync 가 누적 추가하는 중복 unique index 조기 감지.
// 한 컬럼당 unique 인덱스가 2 개 이상 쌓이면 MySQL 64-key 한도가 임박.
// ==========================================================================
// 카테고리: 재고 (inventory) — 판매↔재고 계약
// --------------------------------------------------------------------------
// 이 계약들이 없던 동안 "판매로 인한 재고 차감이 전 기간 0건"인 상태가 아무 게이트에도
// 걸리지 않았다. 코드가 아니라 **연결(레시피)과 배치 유무** 같은 데이터 조건이
// 무너뜨리는 종류라, 한 번 고치고 끝낼 수 없어 상시 검사로 둔다.
// 쓰기가 필요한 검사는 **트랜잭션 안에서 하고 롤백**한다 — 잔재를 남기지 않는다.
// ==========================================================================
function defineInventoryTests() {
  const svc = require('../services/inventoryDeductionService');

  // ① 판매 완료 → 재고 차감이 **실제로 일어나고**, 배치가 없어도 판매분만큼 줄어야 한다.
  //    FIFO 는 배치(입고 로트)에서만 빼므로, 배치 없는 매장에서 예전 코드는 0 을 뺐다 —
  //    음식은 나갔는데 장부만 그대로였다. 임시 재료·상품·레시피를 **데모 매장에** 만들어
  //    실제 차감 경로를 태우고, 끝나면 지운다(운영 매장에는 쓰지 않는다).
  test('inventory', '판매 완료 → 배치 0 재료도 판매분만큼 차감된다', async () => {
    const { sequelize } = require('../config/database');
    const { Ingredient, Product, Recipe, RecipeIngredient, InventoryTransaction } = require('../models');
    const demo = (await sequelize.query(
      'SELECT id FROM restaurants WHERE is_demo = 1 LIMIT 1',
      { type: sequelize.QueryTypes.SELECT }
    ))[0];
    if (!demo) return true;
    // products.category 는 categories.name 을 참조하는 FK 다 — 임의 문자열을 못 쓴다.
    const cat = (await sequelize.query(
      'SELECT name FROM categories WHERE restaurant_id = :r LIMIT 1',
      { replacements: { r: demo.id }, type: sequelize.QueryTypes.SELECT }
    ))[0];
    if (!cat) return true;

    let ing, prod, recipe, ri;
    try {
      ing = await Ingredient.create({
        restaurant_id: demo.id, name: 'ZZ-HC-DEDUCT-PROBE',
        // track_stock 을 **명시**한다. 2026-08-22 부터 기본값이 꺼짐이고,
        // `applyStock` 은 꺼진 재료에 재고를 쓰지 않는다(재고를 안 세기로 한 품목이므로 정상).
        // 이 계약이 검증하려는 것은 "관리 켜진 재료가 배치 없이도 줄어드는가" 다.
        unit: 'kg', current_stock: 10, min_stock: 0, is_active: true, track_stock: true
      });
      recipe = await Recipe.create({ restaurant_id: demo.id, name: 'ZZ-HC-DEDUCT-PROBE' });
      ri = await RecipeIngredient.create({ recipe_id: recipe.id, ingredient_id: ing.id, quantity: 2, unit: 'kg' });
      prod = await Product.create({
        restaurant_id: demo.id, name: 'ZZ-HC-DEDUCT-PROBE', category: cat.name,
        price: 1, recipe_id: recipe.id, is_active: true
      });

      // 배치를 만들지 않았다 → FIFO 가 덮는 양은 0 이다(이 검사의 핵심 조건)
      const r = await svc.deductInventoryForOrder(
        demo.id, [{ id: prod.id, product_id: prod.id, name: prod.name, quantity: 3 }], 0
      );
      const after = await Ingredient.findByPk(ing.id);
      const stock = parseFloat(after.current_stock);
      // 2(레시피) × 3(주문) = 6 이 줄어야 한다. 옛 코드였다면 10 그대로였다.
      if (Math.abs(stock - 4) > 0.001) return false;
      const d = (r.deductions || [])[0];
      return !!d && d.batch_shortfall === 6;
    } catch {
      return false;
    } finally {
      // 잔재를 남기지 않는다 — 실패해도 지운다
      try { if (ing) await InventoryTransaction.destroy({ where: { ingredient_id: ing.id } }); } catch {}
      try { if (ri) await ri.destroy({ force: true }); } catch {}
      try { if (prod) await prod.destroy({ force: true }); } catch {}
      try { if (recipe) await recipe.destroy({ force: true }); } catch {}
      try { if (ing) await ing.destroy({ force: true }); } catch {}
    }
  });

  // ①-2 반대편 계약: **재고 관리를 끈 품목은 판매해도 재고가 움직이지 않는다.**
  //     끄기는 "목록에서 숨기기"가 아니라 "이 품목은 세지 않는다"는 뜻이다. 끈 품목까지
  //     차감되면 안 쓰기로 한 재료가 조용히 마이너스로 흘러간다.
  test('inventory', '재고 관리 끈 품목은 판매해도 재고가 안 변한다', async () => {
    const { sequelize } = require('../config/database');
    const { Ingredient, Product, Recipe, RecipeIngredient, InventoryTransaction } = require('../models');
    const demo = (await sequelize.query('SELECT id FROM restaurants WHERE is_demo = 1 LIMIT 1',
      { type: sequelize.QueryTypes.SELECT }))[0];
    if (!demo) return true;
    const cat = (await sequelize.query('SELECT name FROM categories WHERE restaurant_id = :r LIMIT 1',
      { replacements: { r: demo.id }, type: sequelize.QueryTypes.SELECT }))[0];
    if (!cat) return true;

    let ing, prod, recipe, ri;
    try {
      ing = await Ingredient.create({
        restaurant_id: demo.id, name: 'ZZ-HC-UNTRACKED-PROBE',
        unit: 'kg', current_stock: 10, min_stock: 0, is_active: true, track_stock: false
      });
      recipe = await Recipe.create({ restaurant_id: demo.id, name: 'ZZ-HC-UNTRACKED-PROBE' });
      ri = await RecipeIngredient.create({ recipe_id: recipe.id, ingredient_id: ing.id, quantity: 2, unit: 'kg' });
      prod = await Product.create({
        restaurant_id: demo.id, name: 'ZZ-HC-UNTRACKED-PROBE', category: cat.name,
        price: 1, recipe_id: recipe.id, is_active: true
      });
      await svc.deductInventoryForOrder(
        demo.id, [{ id: prod.id, product_id: prod.id, name: prod.name, quantity: 3 }], 0
      );
      const after = await Ingredient.findByPk(ing.id);
      return Math.abs(parseFloat(after.current_stock) - 10) < 0.001;
    } catch {
      return false;
    } finally {
      try { if (ing) await InventoryTransaction.destroy({ where: { ingredient_id: ing.id } }); } catch {}
      try { if (ri) await ri.destroy({ force: true }); } catch {}
      try { if (prod) await prod.destroy({ force: true }); } catch {}
      try { if (recipe) await recipe.destroy({ force: true }); } catch {}
      try { if (ing) await ing.destroy({ force: true }); } catch {}
    }
  });

  // ② 차감 계산이 "배치가 덮은 양"을 쓰지 않는다는 것을 코드로 고정한다.
  //    (①은 데이터가 없으면 통과하므로, 규칙 자체를 잠그는 검사를 따로 둔다.)
  test('inventory', '차감 계산이 배치량이 아니라 소비량 기준이다 (코드 계약)', async () => {
    const fs = require('fs');
    const raw = fs.readFileSync(require.resolve('../services/inventoryDeductionService'), 'utf8');
    // 주석은 뺀다 — 이 파일 주석은 옛 계산식을 **설명하려고 인용**하고 있어서,
    // 그대로 훑으면 고쳐 놓고도 실패한다(검사기가 자기 문서를 결함으로 읽는 함정).
    const src = raw.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');
    if (/currentStock\s*-\s*fifoResult\.deducted_quantity/.test(src)) return false;
    if (/oiCurrentStock\s*-\s*oiFifo\.deducted_quantity/.test(src)) return false;
    return /batch_shortfall/.test(src);
  });

  // ③ 레시피가 없으면 차감이 아예 일어나지 않는다 — 그 사실이 **세어져야** 한다.
  //    예전에는 경고 더미에 묻혀, 상품 754개 중 1개만 레시피가 걸린 상태를 아무도 몰랐다.
  test('inventory', '레시피 미연결 건수가 집계된다 (조용한 0 차감 방지)', async () => {
    const { sequelize } = require('../config/database');
    const t = await sequelize.transaction();
    try {
      // 시그니처: (restaurantId, orderItems, orderId)
      const r = await svc.deductInventoryForOrder(
        1,
        [{ id: 999999999, product_id: 999999999, name: 'no-recipe-probe', quantity: 1 }],
        0
      );
      return typeof r.skipped_no_recipe === 'number' && r.skipped_no_recipe >= 1;
    } catch {
      return false;
    } finally {
      await t.rollback();
    }
  });

  // ④ 브랜드 상품 중복 등록은 막힌다(하드) / 변형은 물어본다(소프트).
  //    같은 물건이 이름만 바꿔 여러 번 등록되면 재고가 쪼개져 어느 칸도 안 맞는다.
  test('inventory', '브랜드 상품 이름 완전일치 → 409 (중복 등록 차단)', async () => {
    const { sequelize } = require('../config/database');
    const { BrandProduct } = require('../models');
    const owner = (await sequelize.query(
      'SELECT owner_user_id FROM brand_products GROUP BY owner_user_id ORDER BY COUNT(*) DESC LIMIT 1',
      { type: sequelize.QueryTypes.SELECT }
    ))[0];
    if (!owner) return true;
    const sample = await BrandProduct.findOne({ where: { owner_user_id: owner.owner_user_id } });
    if (!sample) return true;
    const u = (await sequelize.query('SELECT id, email, role, brand_id FROM users WHERE id = :i',
      { replacements: { i: owner.owner_user_id }, type: sequelize.QueryTypes.SELECT }))[0];
    if (!u) return true;
    const tk = jwt.sign({ userId: u.id, email: u.email, role: u.role, brand_id: u.brand_id },
      process.env.JWT_SECRET, { expiresIn: '5m' });
    const res = await request('POST', '/brand-products',
      { name: sample.name, unit: 'pcs', unit_price: 1 }, { Authorization: `Bearer ${tk}` });
    // 409 여야 하고, 그 요청으로 새 상품이 생기면 안 된다.
    // 가드가 회귀하면(≠409) 이 요청이 **실브랜드 카탈로그에 진짜 중복 상품을 만든다** —
    // 검사는 실패로 알리되, 자기가 만든 행은 자기가 지운다(실브랜드 잔재 금지, Fable 게이트 지적 2026-08-22).
    if (res.status !== 409) {
      const createdId = res.body?.data?.id || null;
      if (createdId) {
        try { await BrandProduct.destroy({ where: { id: createdId, owner_user_id: owner.owner_user_id } }); } catch {}
      }
      return false;
    }
    const after = await BrandProduct.count({ where: { owner_user_id: owner.owner_user_id, name: sample.name } });
    return after === 1;
  });

  // ④-2 변형(괄호 설명만 다른 이름)은 소프트 409 로 **물어봐야** 한다 — 사전조건이 요구한
  //     "하드·소프트" 중 소프트 쪽 영구 계약. HTTP 로 변형 등록을 실제로 만들면 매 검사마다
  //     실브랜드에 쓰기가 생기므로, 판별 단일소스(utils/brandProductDuplicate)를 직접 태워
  //     읽기 전용으로 잠그고, 라우트의 "소프트=409+force 통과" 코드는 정적 계약으로 고정한다.
  //     (일회성 HTTP 주입 증명은 2026-08-20 게이트에서 완료 — 이건 그 규칙이 계속 사는지 감시.)
  test('inventory', '브랜드 상품 괄호 변형 → 소프트 중복 검출 + force 통과 계약', async () => {
    const { sequelize } = require('../config/database');
    const { BrandProduct } = require('../models');
    const { findDuplicateBrandProducts } = require('../utils/brandProductDuplicate');
    const owner = (await sequelize.query(
      'SELECT owner_user_id FROM brand_products GROUP BY owner_user_id ORDER BY COUNT(*) DESC LIMIT 1',
      { type: sequelize.QueryTypes.SELECT }
    ))[0];
    if (!owner) return true;
    const sample = await BrandProduct.findOne({ where: { owner_user_id: owner.owner_user_id } });
    if (!sample) return true;
    // 같은 이름에 괄호 설명만 덧붙인 변형 → 변형 키가 같아져 소프트 검출돼야 한다
    const dup = await findDuplicateBrandProducts({
      ownerUserId: owner.owner_user_id, name: `${sample.name} (ZZ-HC-VARIANT-PROBE)`, sku: null
    });
    const detected = !!dup.exact || (dup.similar || []).some((r) => r.id === sample.id);
    if (!detected) return false;
    // 라우트 계약: 소프트 검출을 SIMILAR_EXISTS 409 로 돌려주되 force 로 통과시킨다
    const fs = require('fs');
    const src = fs.readFileSync(require.resolve('../routes/brand-products'), 'utf8');
    return /SIMILAR_EXISTS/.test(src) && /force\s*!==\s*true/.test(src);
  });

  // ⑤ 임계치를 안 정한 품목(min_stock=0)은 부족/품절 알림 대상이 아니다.
  //    재고를 애초에 안 세는 품목이 경고 목록을 채우면 진짜 부족이 묻힌다.
  test('inventory', 'min_stock=0 품목은 재고 알림에서 제외된다 (프론트 계약)', async () => {
    const fs = require('fs');
    const path = require('path');
    const p = path.join(__dirname, '..', '..', 'dev-frontend', 'src', 'components',
      'Inventory', 'hooks', 'useInventoryData.ts');
    if (!fs.existsSync(p)) return true;
    const src = fs.readFileSync(p, 'utf8');
    return /if\s*\(minStock\s*>\s*0\)/.test(src);
  });
}

function defineDbTests() {
  test('db', 'users 테이블 인덱스 수 ≤ 15 (중복 unique 누적 차단)', async () => {
    const { sequelize } = require('../config/database');
    const [rows] = await sequelize.query(`
      SELECT COUNT(*) AS n FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME <> 'PRIMARY'
    `);
    return rows[0]?.n <= 15;
  });

  test('db', '동일 컬럼·uniqueness 중복 인덱스 0건', async () => {
    const { sequelize } = require('../config/database');
    const [rows] = await sequelize.query(`
      SELECT TABLE_NAME, INDEX_NAME, NON_UNIQUE,
             GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
      FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME <> 'PRIMARY'
      GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
    `);
    const seen = new Map();
    for (const r of rows) {
      const key = `${r.TABLE_NAME}::${r.cols}::${r.NON_UNIQUE}`;
      seen.set(key, (seen.get(key) || 0) + 1);
    }
    for (const [, n] of seen) {
      if (n > 1) return false;
    }
    return true;
  });
}

function definePaymentTests() {
  test('payment', '없는 주문 create-payment-intent → 404', async () => {
    return (await request('POST', '/orders/99999999/create-payment-intent', {})).status === 404;
  });
  test('payment', '없는 주문 create-paypal-order → 404', async () => {
    return (await request('POST', '/orders/99999999/create-paypal-order', {})).status === 404;
  });
  test('payment', '없는 주문 capture-paypal-order → 404', async () => {
    return (await request('POST', '/orders/99999999/capture-paypal-order', { orderId: 'xxx' })).status === 404;
  });
  // P0-4: 서명 안 된 PayPal webhook 은 절대 처리되면 안 됨 (fail-closed).
  // 위조 PAYMENT.CAPTURE.COMPLETED 를 invoice_id 만 넣어 보내도 paid 처리/200 'received' 금지.
  test('payment', 'P0-4 위조 PayPal webhook → 거부(미처리)', async () => {
    const r = await request('POST', '/webhooks/paypal', {
      id: 'WH-HC-FORGED', event_type: 'PAYMENT.CAPTURE.COMPLETED',
      resource: { custom_id: '99999999', amount: { value: '0.01', currency_code: 'MYR' } }
    });
    return r.status >= 400 && r.body?.received !== true;
  });
}

// ============================================
// 카테고리 6: 리퍼럴 시스템
// ============================================
function defineReferralTests({ adminToken, customerToken, restaurantAdminToken }) {
  // ── Public surface ────────────────────────────────────────
  test('referral', '익명 validate-code 잘못된 형식 → 200 valid:false', async () => {
    const r = await request('GET', '/referrals/validate-code?code=NOT-A-CODE');
    return r.status === 200 && r.body?.success === true && r.body?.data?.valid === false;
  });

  test('referral', '익명 validate-code 미존재 코드 → 200 valid:false', async () => {
    const r = await request('GET', '/referrals/validate-code?code=PURPLE-ZZZZ');
    return r.status === 200 && r.body?.success === true && r.body?.data?.valid === false;
  });

  test('referral', '익명 track-click 잘못된 코드 → 200 tracked:false', async () => {
    const r = await request('POST', '/referrals/track-click', { referral_code: 'BAD' });
    return r.status === 200 && r.body?.success === true && r.body?.data?.tracked === false;
  });

  // ── Auth-required partner self-service ────────────────────
  test('referral', '익명 my-code → 401', async () => (await request('GET', '/referrals/my-code')).status === 401);
  test('referral', '익명 dashboard → 401', async () => (await request('GET', '/referrals/dashboard')).status === 401);
  test('referral', '익명 wallet → 401', async () => (await request('GET', '/referrals/wallet')).status === 401);
  test('referral', '익명 wallet/transactions → 401', async () => (await request('GET', '/referrals/wallet/transactions')).status === 401);
  test('referral', '익명 wallet/apply-credit → 401', async () => (await request('POST', '/referrals/wallet/apply-credit', {})).status === 401);
  test('referral', '익명 payouts(GET) → 401', async () => (await request('GET', '/referrals/payouts')).status === 401);
  test('referral', '익명 payouts(POST) → 401', async () => (await request('POST', '/referrals/payouts', {})).status === 401);
  test('referral', '익명 profile(GET) → 401', async () => (await request('GET', '/referrals/profile')).status === 401);
  test('referral', '익명 profile(PATCH) → 401', async () => (await request('PATCH', '/referrals/profile', {})).status === 401);

  test('referral', 'admin token으로 my-code → 200 (lazy generation)', async () => {
    const r = await request('GET', '/referrals/my-code', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && r.body?.success === true && /^PURPLE-[A-Z2-9]{4}$/.test(r.body?.data?.referral_code || '');
  });

  test('referral', 'admin token으로 dashboard → 200', async () => {
    const r = await request('GET', '/referrals/dashboard', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && r.body?.success === true;
  });

  test('referral', 'admin token으로 wallet → 200 + array', async () => {
    const r = await request('GET', '/referrals/wallet', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && Array.isArray(r.body?.data);
  });

  // ── Customer (mobile) JWT must NOT pass POS-side authenticateToken ─
  test('referral', 'customer token으로 dashboard → 401 (격리)', async () => {
    const r = await request('GET', '/referrals/dashboard', null, { Authorization: `Bearer ${customerToken}` });
    return r.status === 401;
  });

  // ── Admin endpoints — System Admin only ───────────────────
  test('referral', '익명 admin/overview → 401', async () => (await request('GET', '/referrals/admin/overview')).status === 401);
  test('referral', '익명 admin/partners → 401', async () => (await request('GET', '/referrals/admin/partners')).status === 401);
  test('referral', '익명 admin/payouts → 401', async () => (await request('GET', '/referrals/admin/payouts')).status === 401);
  test('referral', '익명 admin/settings → 401', async () => (await request('GET', '/referrals/admin/settings')).status === 401);

  test('referral', 'admin/overview → 200 + funnel + 시계열', async () => {
    const r = await request('GET', '/referrals/admin/overview', null, { Authorization: `Bearer ${adminToken}` });
    if (r.status !== 200 || !r.body?.success) return false;
    const d = r.body.data;
    return d.conversion_funnel && Array.isArray(d.monthly_signups) && Array.isArray(d.monthly_commissions)
      && d.monthly_signups.length === 12 && Array.isArray(d.commission_currencies);
  });

  test('referral', 'admin/settings → 200', async () => {
    const r = await request('GET', '/referrals/admin/settings', null, { Authorization: `Bearer ${adminToken}` });
    return r.status === 200 && r.body?.success === true && typeof r.body.data?.commission_rate !== 'undefined';
  });

  if (restaurantAdminToken) {
    test('referral', 'Restaurant Admin이 admin/overview → 403 (RBAC)', async () => {
      const r = await request('GET', '/referrals/admin/overview', null, { Authorization: `Bearer ${restaurantAdminToken}` });
      return r.status === 403;
    });
    test('referral', 'Restaurant Admin이 admin/settings → 403 (RBAC)', async () => {
      const r = await request('GET', '/referrals/admin/settings', null, { Authorization: `Bearer ${restaurantAdminToken}` });
      return r.status === 403;
    });
  }
}

// ============================================
// 카테고리: 인쇄/주문 파이프라인 (매장 생명선 회귀 가드)
// ============================================
// 🔒 매장 인쇄는 영업 생명선 (CLAUDE.md 최우선). 하루 종일 싸운 두 계약을
// 데모 매장(is_demo)에서 실제 API 로 검증하고 끝나면 정리한다. The Fire 등
// 운영 매장 데이터는 절대 건드리지 않는다.
//   계약 1 — 티켓 정확히 1번: /printed 찍으면 pending-print 에서 사라진다(재인쇄 0).
//   계약 2 — +Round 는 새 품목만: 추가 시 kitchen_items=새 품목만, order_items(빌용)=전체.
//   계약 3 — 금액 공식: 세금 없던 주문에 세금 안 붙고, 세금은 할인후 기준.
// ── 설정 무결성 (2026-06-01) — 결제/프린터 설정 wipe·라벨누락 자동 감지 ──
// 배경: dev 레스토랑 5 결제설정이 cash+staffMeal 2개로 줄고 첫 항목 라벨 누락.
// 가드(settingsGuard)는 wipe 를 막지만, 그게 실제로 작동하는지 + 설정 데이터
// 무결성(모든 결제수단 label 존재)을 매 검증/배포마다 자동 확인한다.
function defineSettingsTests() {
  const { Restaurant } = require('../models');
  const guard = require('../utils/settingsGuard');

  test('settings', '결제설정 — 모든 결제수단에 label 존재 (첫 항목 이름 누락 방지)', async () => {
    const rows = await Restaurant.findAll({ attributes: ['id', 'payment_settings'], limit: 50 });
    for (const r of rows) {
      if (!r.payment_settings) continue;
      const ps = typeof r.payment_settings === 'string' ? JSON.parse(r.payment_settings) : r.payment_settings;
      const keys = Object.keys(ps).filter(k => k !== '_order');
      for (const k of keys) {
        const m = ps[k];
        if (!m || typeof m !== 'object' || typeof m.label !== 'string' || m.label.length === 0) {
          console.log(`    ↳ restaurant ${r.id} payment method '${k}' label 누락`);
          return false;
        }
      }
    }
    return true;
  });

  test('settings', '설정 가드 — 부분 wipe(절반 미만) reject (결제설정 소실 방지)', async () => {
    const existing = { cash:{enabled:true}, card:{enabled:false}, ewallet:{enabled:true}, bankTransfer:{enabled:false}, counter:{enabled:false}, online:{enabled:false}, staffMeal:{enabled:false} };
    const r = guard.guardPaymentSettings({ cash:{enabled:true}, staffMeal:{enabled:false} }, existing, 'HC');
    return r.action === 'reject';
  });

  test('settings', '설정 가드 — 빈/null payload reject', async () => {
    const existing = { cash:{enabled:true}, card:{enabled:false}, ewallet:{enabled:true} };
    return guard.guardPaymentSettings({}, existing, 'HC').action === 'reject'
        && guard.guardPaymentSettings(null, existing, 'HC').action === 'reject';
  });

  test('settings', '설정 가드 — 누락 method merge 보존 (1개 빠져도 기존 유지)', async () => {
    const existing = { cash:{enabled:true}, card:{enabled:false}, ewallet:{enabled:true}, _order:['cash','card','ewallet'] };
    const r = guard.guardPaymentSettings({ cash:{enabled:true}, card:{enabled:false} }, existing, 'HC');
    return r.action !== 'reject' && r.value && ('ewallet' in r.value);
  });

  test('settings', '프린터설정 가드 — 빈 payload reject (printer 소실 방지)', async () => {
    const existing = { kitchenPrinter:{enabled:true,name:'KITCHEN'}, billPrinter:{enabled:true,name:'POS-80C'} };
    return guard.guardPrinterSettings({}, existing, 'HC').action === 'reject';
  });
}

function definePrintTests({ adminToken }) {
  const adminAuth = { Authorization: `Bearer ${adminToken}` };
  // 테스트 주문 고정 마커. 프로세스가 create~finally 사이에서 죽어도(파이프
  // 조기종료/크래시) 다음 실행의 sweep 가 orphan 을 쓸어담아 데모 매장에
  // 누적되지 않게 한다 (idempotent). 운영 주문엔 이 customer_name 이 없다.
  const TEST_MARKER = '__HC_PRINT_TEST__';

  async function demoRestaurantId() {
    const { Restaurant } = require('../models');
    // 운영 매장 오염 방지 — 반드시 데모 매장만.
    const demo = await Restaurant.findOne({ where: { is_demo: true } });
    return demo ? demo.id : null;
  }

  // 사전 정리: 이전 실행이 중단되어 남은 테스트 주문 orphan 을 먼저 쓸어담는다.
  // 마커 기반이라 운영 데이터는 절대 건드리지 않는다. (멱등성 보장)
  test('print', '테스트 주문 orphan sweep (멱등성 — 데모 매장 누적 방지)', async () => {
    const Order = require('../models/Order');
    const seq = Order.sequelize;
    // 소프트삭제분까지 포함(paranoid:false). E2E 생애주기 주문은 단계이동/결제로 자식행
    // (order_actions/order_payments/point_transactions)이 생겨 raw force-destroy 가 FK 로 막힌다
    // → 자식을 먼저 cascade 삭제 후 주문 삭제. 마커 기반이라 운영 데이터는 절대 안 건드린다(멱등).
    const ids = (await Order.findAll({ where: { customer_name: TEST_MARKER }, attributes: ['id'], raw: true, paranoid: false })).map((o) => o.id);
    if (ids.length) {
      const idList = ids.map(Number).filter(Number.isInteger).join(',');
      for (const tbl of ['order_actions', 'order_payments', 'point_transactions']) {
        try { await seq.query(`DELETE FROM \`${tbl}\` WHERE order_id IN (${idList})`); } catch (e) { /* 테이블 없거나 무참조 */ }
      }
      await Order.destroy({ where: { id: ids }, force: true });
    }
    const remaining = await Order.count({ where: { customer_name: TEST_MARKER }, paranoid: false });
    return remaining === 0;
  });

  // 계약 1: 인쇄 후 재인쇄 0 (printed_at 히스토리)
  test('print', '인쇄 후 pending-print 에서 사라짐 (티켓 정확히 1번)', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true; // 데모 매장 없으면 의미있는 검증 불가 → skip

    const order = await Order.create({
      restaurant_id: rid,
      customer_name: TEST_MARKER,
      total_amount: 30,
      status: 'pending',
      source: 'pos',
      order_type: 'dine_in',
      needs_print: true,
      order_items: [
        { id: 'hc-1', name: 'HealthCheck Item A', quantity: 1, price: 15 },
        { id: 'hc-2', name: 'HealthCheck Item B', quantity: 1, price: 15 },
      ],
    });

    let pass = false;
    try {
      // 인쇄 전: pending-print 에 잡히고 kitchen_items 2개
      const before = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const found = (before.body?.data || []).find((o) => o.id === order.id);
      const hasTwo = found && Array.isArray(found.kitchen_items) && found.kitchen_items.length === 2;

      // 인쇄 완료 도장
      const printed = await request('PATCH', `/orders/${order.id}/printed`, {}, adminAuth);

      // 인쇄 후: pending-print 에서 사라짐 (needs_print=false) → 재인쇄 0
      const after = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const gone = !(after.body?.data || []).some((o) => o.id === order.id);

      pass = hasTwo && printed.status === 200 && gone;
    } finally {
      await Order.destroy({ where: { id: order.id }, force: true });
    }
    return pass;
  });

  // 계약 1-b (2026-07-23): pending-print 신선도 경계 24h.
  //   자동인쇄를 안 켠 매장은 needs_print 를 지우는 주체(폴러)가 없어 플래그가 무한 누적된다
  //   (운영 실측: K-DINE 1,616건). 창은 oldest-20 이라 옛 행이 20칸을 점유하면 신규 주문이 창 밖으로
  //   밀려 자동인쇄가 통째로 멈춘다. 서버가 "창 = 신선한 주문만" 을 보장하는지 박제한다.
  //   ⚠ 되돌리면(경계 제거) 정확히 (a) 가 실패한다 = 회귀 감지.
  test('print', '신선도 경계: 25시간 지난 미인쇄 주문은 pending-print 창에서 제외', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true;

    const stale = new Date(Date.now() - 25 * 3600 * 1000);
    const fresh = new Date(Date.now() - 60 * 1000);
    const mk = async (createdAt, extra = {}) => {
      const o = await Order.create({
        restaurant_id: rid, customer_name: TEST_MARKER, total_amount: 10, status: 'pending',
        source: 'pos', order_type: 'dine_in', needs_print: true,
        order_items: [{ id: 'hc-f1', name: 'HealthCheck Fresh', quantity: 1, price: 10 }],
        ...extra,
      });
      // createdAt 은 생성 시 자동 스탬프 → 과거로 강제 이동(silent: updatedAt 오염 방지)
      await Order.update({ createdAt }, { where: { id: o.id }, silent: true });
      return o;
    };

    const oldOrder = await mk(stale);
    const freshOrder = await mk(fresh);
    // (b) 오래된 주문이라도 "지금" 취소/이동한 재발행은 반드시 인쇄돼야 한다 (2026-06-24 취소표 분실 사고)
    const oldReprint = await mk(stale, {
      pending_reprint: { type: 'cancel', notice: { title: '** CANCELLED **', lines: ['HealthCheck'] } },
    });

    let pass = false;
    try {
      const res = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const ids = (res.body?.data || []).map((o) => o.id);
      const aExcluded = !ids.includes(oldOrder.id);    // (a) 오래된 일반 미인쇄 → 창 밖
      const bIncluded = ids.includes(oldReprint.id);   // (b) 오래된 재발행 → 창 안 (경계 예외)
      const cIncluded = ids.includes(freshOrder.id);   // (c) 신선한 주문 → 창 안
      pass = aExcluded && bIncluded && cIncluded;
    } finally {
      await Order.destroy({ where: { id: [oldOrder.id, freshOrder.id, oldReprint.id] }, force: true });
    }
    return pass;
  });

  // 계약 1-c (2026-07-24): 신선도 기준 = "인쇄 필요가 발생한 시각"(print_needed_at), 주문 생일 아님.
  //   최초 구현(1-b)은 orders.createdAt 으로 판정해서, 24h 넘게 열려 있던 테이블에 +Round 를 넣으면
  //   needs_print 가 "지금" 켜지는데도 창에서 탈락 → 그 라운드 주방티켓이 무음 유실됐다(실호출 실증).
  //   ⚠ 되돌리면(COALESCE 제거 또는 스탬프 누락) 이 테스트가 실패한다 = 회귀 감지.
  //   실 API(POST /add-items)로 검증한다 — DB 직접 세팅으로는 스탬프 배선을 증명할 수 없기 때문.
  test('print', '신선도 기준: 25시간 열린 주문의 +Round 는 창에 포함(라운드 티켓 유실 방지)', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true;

    const stale = new Date(Date.now() - 25 * 3600 * 1000);
    // 어제부터 열려 있고 1라운드는 이미 인쇄된 주문(기존 행 재현 = print_needed_at NULL)
    const order = await Order.create({
      restaurant_id: rid, customer_name: TEST_MARKER, total_amount: 10, status: 'preparing',
      source: 'pos', order_type: 'dine_in', needs_print: false, print_needed_at: null,
      order_items: [{ id: 'hc-old-1', name: 'Yesterday Round1', quantity: 1, price: 10, printed_at: stale.toISOString() }],
    });
    await Order.update({ createdAt: stale }, { where: { id: order.id }, silent: true });

    let pass = false;
    try {
      // 실 API: 오늘 이 테이블에 라운드 추가 (mergeItemsIntoOrder 스탬프 배선을 실제로 태운다)
      const add = await request('POST', `/orders/${order.id}/add-items`,
        { items: [{ id: 'hc-old-r2', name: 'Round2 NEW', quantity: 1, price: 10 }] }, adminAuth);

      const res = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const found = (res.body?.data || []).find((o) => o.id === order.id);
      const inWindow = !!found;                                   // (a) 창 포함 — 수정 전엔 여기서 실패
      const onlyNew = !!found && Array.isArray(found.kitchen_items)
        && found.kitchen_items.length === 1
        && found.kitchen_items[0].name === 'Round2 NEW';           // (b) +Round 계약 불변(새 품목만)

      const reloaded = await Order.findByPk(order.id);
      const stamped = !!reloaded.print_needed_at
        && (Date.now() - new Date(reloaded.print_needed_at).getTime()) < 60 * 1000;  // (c) 스탬프 실증

      pass = add.status === 200 && inWindow && onlyNew && stamped;
    } finally {
      // 실 API(add-items)가 order_actions 자식행을 만들므로 cascade 후 삭제(orphan sweep 과 동일 관행)
      try { await Order.sequelize.query(`DELETE FROM \`order_actions\` WHERE order_id = ${Number(order.id)}`); } catch (e) { /* 무참조 */ }
      await Order.destroy({ where: { id: order.id }, force: true });
    }
    return pass;
  });

  // 계약 1-d (2026-07-24): 재시도(죽은-claim 자동복구)는 신선도를 갱신하지 않는다 = 옛 행 영구부활 없음.
  //   복구 UPDATE 는 나이 상한 없이 re-arm 하므로, 여기서 print_needed_at 을 스탬프하면 인쇄가 고장난
  //   매장에서 claim↔re-arm 핑퐁이 옛 행을 영원히 신선하게 만들어 누적 방어(1-b 원목적)가 붕괴한다.
  //   ⚠ 되돌리면(복구 경로에 스탬프 추가) 이 테스트가 실패한다 = 누적 사고 재발 감지.
  test('print', '재시도 경로(죽은-claim 복구)는 신선도 스탬프를 찍지 않는다', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true;

    const stale = new Date(Date.now() - 25 * 3600 * 1000);
    const order = await Order.create({
      restaurant_id: rid, customer_name: TEST_MARKER, total_amount: 10, status: 'pending',
      source: 'pos', order_type: 'dine_in',
      needs_print: false, print_claimed_at: stale, print_needed_at: null,
      order_items: [{ id: 'hc-rearm-1', name: 'Stale Claimed', quantity: 1, price: 10 }],
    });
    await Order.update({ createdAt: stale }, { where: { id: order.id }, silent: true });

    let pass = false;
    try {
      // 1회 호출 = 핸들러 진입부의 죽은-claim 복구 UPDATE 가 이 행을 re-arm 한다
      await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const reloaded = await Order.findByPk(order.id);
      const reArmed = reloaded.needs_print === true;          // (a) 복구는 작동했고
      const notStamped = reloaded.print_needed_at === null;   // (b) 스탬프는 안 찍혔고

      const res2 = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const stillOut = !(res2.body?.data || []).some((o) => o.id === order.id);  // (c) 그래도 창 밖 = 부활 없음

      pass = reArmed && notStamped && stillOut;
    } finally {
      await Order.destroy({ where: { id: order.id }, force: true });
    }
    return pass;
  });

  // 계약 2: +Round 추가분만 인쇄, 빌은 전체 유지
  test('print', '+Round 추가 시 kitchen_items=새 품목만, order_items=전체', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true;

    // 1라운드 2품목 — 이미 인쇄된 상태(printed_at 도장)로 생성
    const stamp = new Date().toISOString();
    const order = await Order.create({
      restaurant_id: rid,
      customer_name: TEST_MARKER,
      total_amount: 45,
      status: 'preparing',
      source: 'pos',
      order_type: 'dine_in',
      needs_print: false,
      order_items: [
        { id: 'hc-r1a', name: 'Round1 A', quantity: 1, price: 15, printed_at: stamp },
        { id: 'hc-r1b', name: 'Round1 B', quantity: 1, price: 15, printed_at: stamp },
      ],
    });

    let pass = false;
    try {
      // +Round: 새 품목 1개 추가 (printed_at 없음) + needs_print 재발사
      const items = [...order.order_items, { id: 'hc-r2a', name: 'Round2 NEW', quantity: 1, price: 15 }];
      await order.update({ order_items: items, needs_print: true, total_amount: 45 });

      const res = await request('GET', `/orders/restaurant/${rid}/pending-print`, null, adminAuth);
      const found = (res.body?.data || []).find((o) => o.id === order.id);

      const kitchenOnlyNew = found
        && Array.isArray(found.kitchen_items)
        && found.kitchen_items.length === 1
        && found.kitchen_items[0].name === 'Round2 NEW';
      const billHasAll = found && Array.isArray(found.order_items) && found.order_items.length === 3;

      pass = !!(kitchenOnlyNew && billHasAll);
    } finally {
      await Order.destroy({ where: { id: order.id }, force: true });
    }
    return pass;
  });

  // 계약 1-b: 동시 인쇄 돌진 → 정확히 1대만 claim (티켓 3장 방지의 진짜 메커니즘)
  // POS 직접 / KDS 소켓 / poller 2곳이 같은 주문을 동시에 인쇄하려 해도
  // 조건부 UPDATE(needs_print true→false)로 첫 1대만 claimed:true 를 받는다.
  test('print', '동시 print-claim N개 → 정확히 1개만 claimed (티켓 중복 방지)', async () => {
    const Order = require('../models/Order');
    const rid = await demoRestaurantId();
    if (!rid) return true;

    const order = await Order.create({
      restaurant_id: rid,
      customer_name: TEST_MARKER,
      total_amount: 15,
      status: 'pending',
      source: 'pos',
      order_type: 'dine_in',
      needs_print: true,
      order_items: [{ id: 'hc-claim', name: 'Claim Race Item', quantity: 1, price: 15 }],
    });

    let pass = false;
    try {
      // 5대가 동시에 claim 시도
      const claims = await Promise.all(
        Array.from({ length: 5 }, () => request('PATCH', `/orders/${order.id}/print-claim`, {}, adminAuth))
      );
      const wonCount = claims.filter((r) => r.status === 200 && r.body?.claimed === true).length;
      pass = wonCount === 1; // 정확히 1대만 인쇄, 나머지 4대 skip
    } finally {
      await Order.destroy({ where: { id: order.id }, force: true });
    }
    return pass;
  });

  // 계약 3: 금액 공식 핵심 불변식 (배포 게이트에 포함)
  test('print', '세금 없던 주문은 추가해도 세금 0 (computeOrderTotals)', async () => {
    const { computeOrderTotals } = require('../utils/orderTotals');
    const r = computeOrderTotals({ newSubtotal: 150, oldSubtotal: 100, taxRate: 6, serviceChargeRate: 10 });
    return r.tax === 0 && r.serviceCharge === 0 && r.total === 150;
  });

  test('print', '세금은 할인 후 금액 기준 (computeOrderTotals)', async () => {
    const { computeOrderTotals } = require('../utils/orderTotals');
    // 소계 100, 고정할인 20 → afterDiscount 80, 세금 6% = 4.8
    const r = computeOrderTotals({ newSubtotal: 100, oldSubtotal: 100, discount: 20, oldTax: 6, taxRate: 6 });
    return r.afterDiscount === 80 && r.tax === 4.8 && r.total === 84.8;
  });

  // 보호 엔드포인트 — 익명 차단 가드 (인쇄 큐 노출 방지)
  test('print', '익명 pending-print → 401', async () => {
    return (await request('GET', '/orders/restaurant/1/pending-print')).status === 401;
  });

  // 🔒 보호 파일 무결성 — 배포 의무 게이트가 자동으로 생명선 코드 변경을 감지.
  // 인쇄 무관 작업이 실수로 인쇄/주문 코드를 건드렸으면 여기서 빨간불.
  test('print', '🔒 인쇄/주문 보호 파일 무결성 (변경 0건)', async () => {
    const { compareManifest, PROTECTED_FILES } = require('./check-print-guard');
    const r = compareManifest();
    if (!r.hasBaseline) {
      throw new Error('기준 미등록 — node scripts/check-print-guard.js --bless 먼저 실행');
    }
    // 운영 서버에는 dev-frontend/dev-backend 소스 트리가 없다(빌드 결과물만 배포된다).
    // 매니페스트가 그 소스 경로를 가리키므로 운영에서 이 검사는 대상 자체가 없다 →
    // **전부** 없을 때만 skip. 하나라도 있는데 나머지가 사라졌으면 그건 진짜 삭제 →
    // 그대로 실패시킨다 (dev 에서 생명선 파일이 지워지는 사고를 놓치면 안 된다).
    // 같은 판례: 배포 스크립트 검사(위 '현행 스크립트인지' 마커) — 이 환경의 대상이 아니면 skip.
    if (r.missing.length === PROTECTED_FILES.length && r.changed.length === 0 && r.added.length === 0) {
      return true; // 소스 트리 없는 환경(운영) → 검사 대상 아님
    }
    if (r.ok) return true;
    const lines = [
      ...r.changed.map((f) => `${f.tier === 'dedicated' ? '변경·전용' : '변경·공유'}:${f.rel}`),
      ...r.added.map((f) => `신규:${f.rel}`),
      ...r.removed.map((f) => `삭제:${f.rel}`),
      ...r.missing.map((f) => `누락:${f.rel}`),
    ];
    throw new Error(`보호 파일 변경 ${lines.length}건 → ${lines.join(', ')} (의도한 인쇄 변경이면 --bless)`);
  });

  // ── ai: AI 카메라 서빙(Track B) 계약 (데모 매장, 무보존·제약매칭·모듈게이트) ──
  const AI_MARK = '__HC_AI__';
  const AI_PIDS = [900011, 900012];
  async function aiCleanup() {
    const Order = require('../models/Order');
    const { MenuReferencePhoto, RecognitionLog } = require('../models');
    const rid = await demoRestaurantId();
    await Order.destroy({ where: { customer_name: AI_MARK }, force: true }).catch(() => {});
    await MenuReferencePhoto.destroy({ where: { product_id: AI_PIDS }, force: true }).catch(() => {});
    if (rid) await RecognitionLog.destroy({ where: { restaurant_id: rid, provider: 'local-color-v1' } }).catch(() => {});
  }

  test('ai', '익명 ai-serving/ready-items → 401', async () => {
    const rid = await demoRestaurantId(); if (!rid) return true;
    return (await request('GET', `/ai-serving/${rid}/ready-items`)).status === 401;
  });

  test('ai', 'recognize: 색 임베딩 제약매칭 top1 + 무보존 + outcome', async () => {
    const rid = await demoRestaurantId(); if (!rid) return true;
    const sharp = require('sharp');
    const { Order, MenuReferencePhoto, RecognitionLog } = require('../models');
    const ai = require('../services/ai'); const prov = ai.getProvider();
    await aiCleanup();
    const fsm = require('fs');
    let pass = false;
    try {
      const red = await sharp({ create: { width: 160, height: 160, channels: 3, background: { r: 220, g: 30, b: 30 } } }).jpeg().toBuffer();
      const blue = await sharp({ create: { width: 160, height: 160, channels: 3, background: { r: 30, g: 30, b: 220 } } }).jpeg().toBuffer();
      const redVec = await prov.embedImage(red), blueVec = await prov.embedImage(blue);
      await MenuReferencePhoto.create({ restaurant_id: rid, product_id: AI_PIDS[0], image_url: '/uploads/test/hcred.jpg', source: 'menu_image', embedding: redVec, embedding_model: prov.model, embedding_dim: redVec.length, is_active: true });
      await MenuReferencePhoto.create({ restaurant_id: rid, product_id: AI_PIDS[1], image_url: '/uploads/test/hcblue.jpg', source: 'menu_image', embedding: blueVec, embedding_model: prov.model, embedding_dim: blueVec.length, is_active: true });
      const order = await Order.create({ restaurant_id: rid, customer_name: AI_MARK, table_number: '9', total_amount: 20, status: 'ready', order_type: 'dine_in', source: 'pos',
        order_items: [{ id: 'a', product_id: AI_PIDS[0], name: 'HC Red', quantity: 1, price: 10, status: 'ready' }, { id: 'b', product_id: AI_PIDS[1], name: 'HC Blue', quantity: 1, price: 10, status: 'ready' }] });
      const recogDirBefore = fsm.existsSync('/var/www/uploads/recognition');
      const rec = await multipartRecognize(rid, red, adminAuth);
      const top = rec.body?.data?.candidates?.[0];
      const recogDirAfter = fsm.existsSync('/var/www/uploads/recognition');
      const matched = top && top.product_id === AI_PIDS[0] && rec.body.data.mode !== 'no_candidates';
      const noRetain = !recogDirBefore && !recogDirAfter;
      // outcome
      const oc = await request('POST', `/ai-serving/${rid}/logs/${rec.body?.data?.log_id}/outcome`, { decision: 'recommend_confirmed', chosen_order_id: order.id, chosen_item_index: 0, chosen_product_id: AI_PIDS[0] }, adminAuth);
      const logRow = await RecognitionLog.findByPk(rec.body?.data?.log_id);
      pass = !!matched && noRetain && oc.status === 200 && logRow?.was_top1_correct === true;
    } finally { await aiCleanup(); }
    return pass;
  });

  test('ai', 'ready 없으면 no_candidates', async () => {
    const rid = await demoRestaurantId(); if (!rid) return true;
    await aiCleanup();
    const sharp = require('sharp');
    const red = await sharp({ create: { width: 120, height: 120, channels: 3, background: { r: 200, g: 40, b: 40 } } }).jpeg().toBuffer();
    const rec = await multipartRecognize(rid, red, adminAuth);
    return rec.body?.data?.mode === 'no_candidates';
  });
}

// multipart recognize 호출 헬퍼 (health-check 전용)
function multipartRecognize(rid, buf, auth) {
  return new Promise((resolve) => {
    const http = require('http'); const https = require('https');
    const url = new URL(`${BASE}/ai-serving/${rid}/recognize`);
    const isHttps = url.protocol === 'https:'; const lib = isHttps ? https : http;
    const boundary = '----hc' + Math.random().toString(16).slice(2);
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="photo"; filename="p.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`),
      buf, Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);
    const r = lib.request({ hostname: url.hostname, port: url.port || (isHttps ? 443 : 80), path: url.pathname, method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length, ...auth } }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode, body: d }); } });
    });
    r.on('error', e => resolve({ status: 0, body: e.message })); r.write(body); r.end();
  });
}

// ============================================
// 실행기
// ============================================
async function runTests(allTests, category) {
  const filtered = category ? allTests.filter((t) => t.category === category) : allTests;
  if (filtered.length === 0) {
    console.error(c.red(`카테고리 '${category}'에 해당하는 테스트가 없습니다.`));
    process.exit(1);
  }

  // 카테고리별 그룹화
  const byCategory = {};
  for (const t of filtered) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }

  let totalPass = 0;
  let totalFail = 0;
  const failures = [];

  for (const [cat, tests] of Object.entries(byCategory)) {
    if (!opts.quiet) {
      console.log(`\n${c.cyan(c.bold('▶ ' + cat.toUpperCase()))} ${c.gray(`(${tests.length} tests)`)}`);
    }
    for (const t of tests) {
      let ok = false;
      let err = null;
      try { ok = await t.fn(); }
      catch (e) { err = e; }

      if (ok) {
        totalPass++;
        if (!opts.quiet) console.log(`  ${c.green('✓')} ${t.name}`);
      } else {
        totalFail++;
        const msg = err ? `${t.name} (예외: ${err.message})` : t.name;
        failures.push(`[${cat}] ${msg}`);
        console.log(`  ${c.red('✗')} ${t.name}${err ? c.gray(' (' + err.message + ')') : ''}`);
      }
    }
  }

  // 결과 요약
  console.log('\n' + '─'.repeat(60));
  const total = totalPass + totalFail;
  if (totalFail === 0) {
    console.log(c.green(c.bold(`✓ 모든 테스트 통과 (${totalPass}/${total})`)));
  } else {
    console.log(c.red(c.bold(`✗ ${totalFail}건 실패 / ${totalPass}건 통과 / 총 ${total}건`)));
    console.log('\n' + c.red('실패 목록:'));
    failures.forEach((f) => console.log(c.red('  - ' + f)));
  }
  console.log('─'.repeat(60));
  return totalFail === 0;
}

// ============================================
// 메인
// ============================================
(async () => {
  console.log(c.bold('\n🩺 Purple POS Health Check'));
  console.log(c.gray(`   대상: ${opts.host}`));
  if (opts.category) console.log(c.gray(`   카테고리: ${opts.category}`));
  console.log();

  // 백엔드 살아있는지 먼저 ping
  const ping = await request('GET', '/health');
  if (ping.status === 0) {
    console.error(c.red(`✗ 백엔드 응답 없음 (${opts.host})`));
    console.error(c.gray('   pm2 status로 dev-backend 확인하세요.'));
    process.exit(1);
  }

  const ctx = await setup();

  defineAuthTests(ctx);
  defineSecurityTests(ctx);
  definePosTests(ctx);
  defineMobileTests(ctx);
  defineReservationTests(ctx);
  definePaymentTests();
  defineReferralTests(ctx);
  definePrintTests(ctx);
  defineSettingsTests();
  // defineMatrixTests 는 아직 미정의(09:05 스텁) — health-check 전체 크래시 방지 가드.
  // §9 주문루트×설정 매트릭스 테스트가 정의되면 자동 활성화 (Phase 3 예정).
  if (typeof defineMatrixTests === 'function') defineMatrixTests(ctx);
  defineDbTests();
  defineInventoryTests();

  const allPass = await runTests(tests, opts.category);
  process.exit(allPass ? 0 : 1);
})().catch((e) => {
  console.error(c.red('\n✗ Health check 실행 중 에러:'), e.message);
  console.error(c.gray(e.stack));
  process.exit(1);
});
