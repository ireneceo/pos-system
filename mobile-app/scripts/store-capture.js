#!/usr/bin/env node
'use strict';
/**
 * Google Play 스토어 스크린샷 — 개발서버 데모 매장(38)에서만 찍는다 (2026-10-12 Play 등록 · Fable 게이트 조건 B)
 *   node mobile-app/scripts/store-capture.js
 * 산출물 mobile-app/store/screenshots/{phone,tab7,tab10}-NN-<이름>.png
 *   phone 1080×1920(세로) · tab7 1920×1200 · tab10 2560×1600(가로 — 태블릿 POS 는 가로로 쓴다)
 * 운영 주소로는 돌지 않는다(실매장 화면 유출 차단). 로그인은 공개 데모 카드와 같은 /api/auth/demo-login.
 */
const path = require('path');
const fs = require('fs');
const { chromium, request } = require('/var/www/dev-frontend/node_modules/playwright');

const BASE = 'https://dev.purplehere.com';
const RID = 38;
const OUT = path.join(__dirname, '..', 'store', 'screenshots');
const DEVICES = [
  { key: 'phone', width: 540, height: 960, scale: 2 },    // → 1080×1920
  { key: 'tab7', width: 960, height: 600, scale: 2 },     // → 1920×1200
  { key: 'tab10', width: 1280, height: 800, scale: 2 },   // → 2560×1600
];
// 2026-10-15 실측으로 고른 세 화면. POS 계산 화면은 데모 메뉴에 다른 작업의 «[확인용]» 시험 메뉴가 섞이고 서버에 그림 글자
// 글꼴이 없어 아이콘이 네모로 깨진다 · 대시보드는 데모 매장의 «Subscription expired» 표시가 붙는다 → 둘 다 스토어용 아님.
const SCREENS = [
  { name: 'floor-plan', url: `/restaurant/${RID}/floor-plan` },
  { name: 'live-orders', url: `/restaurant/${RID}/live-orders` },
  { name: 'kitchen', url: `/restaurant/${RID}/kitchen` },
];

(async () => {
  if (!/^https:\/\/dev\./.test(BASE)) throw new Error('개발서버에서만 찍는다');
  fs.mkdirSync(OUT, { recursive: true });
  const api = await request.newContext({ ignoreHTTPSErrors: true });
  const res = await api.post(`${BASE}/api/auth/demo-login`, { data: { key: 'demo_restaurant_admin' } });
  if (!res.ok()) throw new Error(`demo-login ${res.status()}`);
  const body = await res.json();
  const data = body.data || body;
  const token = data.token || data.accessToken;
  const user = data.user || {};
  if (!token) throw new Error('토큰 없음');
  if (Number(user.restaurant_id) !== RID) throw new Error(`데모 매장 ${RID} 이 아님: ${user.restaurant_id}`);

  const browser = await chromium.launch();
  try {
    for (const d of DEVICES) {
      const ctx = await browser.newContext({
        viewport: { width: d.width, height: d.height }, deviceScaleFactor: d.scale, ignoreHTTPSErrors: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 16; Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
      });
      await ctx.addInitScript(([t, role]) => {
        localStorage.setItem('auth_token', t);
        localStorage.setItem('currentUserRole', role);
        localStorage.setItem('i18nextLng', 'en');
        localStorage.setItem('cookie_consent_accepted', 'true');
        localStorage.setItem('pos.pwa-install.dismissed_until', String(Date.now() + 864e5));
        // 스토어 사진은 «앱 안» 화면 — 앱 내려받기 안내·업데이트 카드가 끼지 않게
        window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
      }, [token, user.role]);
      const page = await ctx.newPage();
      let n = 0;
      for (const s of SCREENS) {
        n += 1;
        await page.goto(BASE + s.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
        await page.waitForTimeout(2500);
        const file = path.join(OUT, `${d.key}-${String(n).padStart(2, '0')}-${s.name}.png`);
        await page.screenshot({ path: file });
        console.log('✓', path.relative(path.join(__dirname, '..'), file));
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
    await api.dispose();
  }
})().catch((e) => { console.error('✗', e.message); process.exit(1); });
