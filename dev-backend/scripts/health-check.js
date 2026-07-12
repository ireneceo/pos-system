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
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
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
    const { compareManifest } = require('./check-print-guard');
    const r = compareManifest();
    if (!r.hasBaseline) {
      throw new Error('기준 미등록 — node scripts/check-print-guard.js --bless 먼저 실행');
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

  const allPass = await runTests(tests, opts.category);
  process.exit(allPass ? 0 : 1);
})().catch((e) => {
  console.error(c.red('\n✗ Health check 실행 중 에러:'), e.message);
  console.error(c.gray(e.stack));
  process.exit(1);
});
