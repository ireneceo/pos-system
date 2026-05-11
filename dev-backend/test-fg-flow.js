#!/usr/bin/env node
// Foodcourt General 신규 사용자 전체 흐름 검증 (테스터 첫 사용 시나리오)
require('dotenv').config();
const { chromium } = require('/var/www/dev-frontend/node_modules/playwright-core');
const jwt = require('jsonwebtoken');
const U = require('./models/User');
const Foodcourt = require('./models/Foodcourt');
const http = require('http');

const req = (m, p, b, h) => new Promise((rs, rj) => {
  const body = b ? JSON.stringify(b) : null;
  const r = http.request({ hostname:'localhost', port:3001, path:p, method:m,
    headers:{ 'Content-Type':'application/json', ...(body?{'Content-Length':Buffer.byteLength(body)}:{}), ...(h||{}) }
  }, res => { let buf=''; res.on('data',c=>buf+=c); res.on('end',()=>{ try { rs({status:res.statusCode, data:JSON.parse(buf)}); } catch { rs({status:res.statusCode, data:buf}); } }); });
  r.on('error', rj); if (body) r.write(body); r.end();
});

let p=0, f=0;
const ok = (l, c, e) => { if (c) { console.log(`  ✓ ${l}`); p++; } else { console.log(`  ✗ ${l}`, e || ''); f++; } };

(async () => {
  // 테스트 user: dev #288 (demo-foodcourt). plan_type='Foodcourt Pro' 저장 완료. foodcourt_id=null
  const fgUser = await U.findByPk(288);
  if (!fgUser) { console.log('user 288 없음'); process.exit(1); }
  console.log(`테스터 시뮬레이션: #${fgUser.id} ${fgUser.email}`);
  console.log(`  plan_type: ${fgUser.plan_type}, subscription_status: ${fgUser.subscription_status}, foodcourt_id: ${fgUser.foodcourt_id}\n`);

  const fgToken = jwt.sign({ userId: fgUser.id, email: fgUser.email, role: fgUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const headers = { Authorization: `Bearer ${fgToken}` };

  // ── [A] API endpoint 응답 검증
  console.log('[A] API endpoint 응답 (테스터가 접근할 endpoint)');
  const apis = [
    ['/api/auth/me',                       200, 'self profile'],
    ['/api/foodcourts',                    200, 'foodcourt list'],
    ['/api/foodcourts/owner',              200, 'own foodcourts'],
    ['/api/restaurants',                   200, 'restaurant list'],
    ['/api/notification-settings/preferences', 200, 'notification settings'],
    ['/api/invoices?page=1&limit=10',      200, 'invoices'],
    ['/api/notices',                       200, 'notices'],
  ];
  const results = {};
  for (const [path, expect, label] of apis) {
    const r = await req('GET', path, null, headers);
    results[path] = r;
    ok(`${label} (${path}) → ${r.status}`, r.status === expect, r.data?.message || JSON.stringify(r.data).slice(0,100));
  }

  // ── [B] /api/auth/me 응답에 핵심 필드
  console.log('\n[B] /api/auth/me 응답 무결성 (frontend AuthContext 가 받는 필드)');
  const me = results['/api/auth/me'].data?.data;
  ok('id 있음', !!me?.id);
  ok('role=Foodcourt General', me?.role === 'Foodcourt General');
  ok('subscription_status=active', me?.subscription_status === 'active');
  ok('plan_type 있음', !!me?.plan_type, `actual: ${me?.plan_type}`);

  // ── [C] /api/foodcourts/:id/allowed-routes (foodcourt_id 가 있는 경우만)
  console.log('\n[C] allowed-routes / sidebar 메뉴');
  if (fgUser.foodcourt_id) {
    const ar = await req('GET', `/api/foodcourts/${fgUser.foodcourt_id}/allowed-routes`, null, headers);
    ok('allowed-routes 200', ar.status === 200);
    ok('plan_type 응답', !!ar.data?.plan_type);
    ok('allowed_routes array', Array.isArray(ar.data?.allowed_routes));
  } else {
    console.log('  (foodcourt_id 없음 — entity 미연결. user 자체 subscription_status 로 통과 검증)');
  }

  // ── [D] Foodcourt entity 없을 때 — 핵심 기능 페이지 진입 가능 여부
  console.log('\n[D] entity 없는 FG 의 페이지 접근');

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--ignore-certificate-errors'] });
  try {
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(t => localStorage.setItem('auth_token', t), fgToken);
    const page = await ctx.newPage();

    const consoleErrors = [];
    page.on('pageerror', err => consoleErrors.push('PAGE: ' + err.message));
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push('CONSOLE: ' + msg.text().slice(0, 200)); });

    // FG 진입 시 redirect 되는 default page
    await page.goto('https://dev.purplehere.com/pos/foodcourt/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3500);

    const url1 = page.url();
    const body1 = (await page.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 400);
    const blocked = /No Active Subscription/i.test(body1);
    ok('dashboard 접근 시 No Active Subscription 차단 X', !blocked, blocked ? body1.slice(0,200) : '');
    console.log('  URL:', url1);
    console.log('  body 앞부분:', body1.slice(0, 200));

    // 사이드바 메뉴 추출
    const navItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a, [class*="NavItem"]'))
        .map(a => (a.textContent || '').replace(/\s+/g, ' ').trim())
        .filter(t => t && t.length < 50 && t.length > 2)
        .slice(0, 50);
    });
    console.log('  사이드바 menu 후보:', [...new Set(navItems)].slice(0, 20).join(' | '));
    ok('사이드바 렌더 (menu 항목 > 0)', navItems.length > 0);

    // /pos/foodcourt/restaurants — 매장 관리
    await page.goto('https://dev.purplehere.com/pos/foodcourt/restaurants', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500);
    const body2 = (await page.locator('body').innerText().catch(() => '')).slice(0, 400);
    const blocked2 = /No Active Subscription/i.test(body2);
    ok('/pos/foodcourt/restaurants 차단 X', !blocked2);

    // /pos/foodcourt/invoices — domcontentloaded 로 짧게
    try {
      await page.goto('https://dev.purplehere.com/pos/foodcourt/invoices', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(4000);
    } catch (e) { console.log('  invoices goto error:', e.message.slice(0, 80)); }
    const url3 = page.url();
    const body3 = (await page.locator('body').innerText().catch(() => '')).slice(0, 400);
    const hasInvoiceUi = /Invoice|invoice/i.test(body3);
    ok('/pos/foodcourt/invoices 페이지 표시 (텍스트 매칭)', hasInvoiceUi, body3.slice(0, 200));

    // 4초 추가 후 network 요청 카운트 (무한 fetch 감지)
    let lastReqCount = 0;
    const reqCounts = [];
    page.on('request', () => lastReqCount++);
    lastReqCount = 0;
    await page.waitForTimeout(3000);
    const c1 = lastReqCount;
    lastReqCount = 0;
    await page.waitForTimeout(3000);
    const c2 = lastReqCount;
    console.log(`  네트워크 요청 (3초 단위 2회): ${c1}, ${c2}`);
    ok('invoices 페이지 무한 요청 X (3초 단위 < 20개)', c1 < 20 && c2 < 20, `c1=${c1} c2=${c2}`);

    // /pos/foodcourt/management — 매장 추가/관리
    await page.goto('https://dev.purplehere.com/pos/foodcourt/general/management', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const body4 = (await page.locator('body').innerText().catch(() => '')).slice(0, 300);
    ok('management 페이지 차단 X', !/No Active Subscription/i.test(body4));

    if (consoleErrors.length > 0) {
      console.log('\n  ⚠ 콘솔 에러:');
      consoleErrors.slice(0, 10).forEach(e => console.log('   ', e));
    }

    await ctx.close();
  } finally {
    await browser.close();
  }

  console.log(`\n→ ${p} passed, ${f} failed`);
  process.exit(f ? 1 : 0);
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
