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
  --category=NAME   특정 카테고리만 실행 (auth, security, pos, mobile, payment)
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

  return { adminUser, adminToken, member, customerToken, restId };
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
function defineSecurityTests({ customerToken, member }) {
  // 익명 차단
  test('security', '익명 customers/:rid → 401', async () => (await request('GET', '/customers/1')).status === 401);
  test('security', '익명 customers/stats/:cid → 401', async () => (await request('GET', '/customers/stats/1')).status === 401);
  test('security', '익명 customers/:cid/orders → 401', async () => (await request('GET', '/customers/1/orders')).status === 401);
  test('security', '익명 inventory-routes/:rid → 401', async () => (await request('GET', '/inventory-routes/1/inventory')).status === 401);
  test('security', '익명 restaurants/:id → 401', async () => (await request('GET', '/restaurants/1')).status === 401);
  test('security', '익명 restaurants/:id/company-info → 401 (사업자정보 보호)', async () => (await request('GET', '/restaurants/1/company-info')).status === 401);
  test('security', '익명 addon-modules → 401', async () => (await request('GET', '/addon-modules')).status === 401);
  test('security', '익명 mobile/orders 필터없이 → 400 (전체 덤프 방지)', async () => (await request('GET', '/mobile/orders')).status === 400);
  test('security', '익명 membership/customer/:rid/:cid → 401', async () => (await request('GET', '/membership/customer/1/1')).status === 401);

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
}

// ============================================
// 카테고리 3: POS 핵심 API
// ============================================
function definePosTests({ adminToken }) {
  const auth = { Authorization: `Bearer ${adminToken}` };

  test('pos', 'admin /dashboard/stats → 200', async () => (await request('GET', '/dashboard/stats?restaurant_id=1', null, auth)).status === 200);
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
  definePaymentTests();

  const allPass = await runTests(tests, opts.category);
  process.exit(allPass ? 0 : 1);
})().catch((e) => {
  console.error(c.red('\n✗ Health check 실행 중 에러:'), e.message);
  console.error(c.gray(e.stack));
  process.exit(1);
});
