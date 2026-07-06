/**
 * ui-layout-sweep.js — 렌더된 레이아웃/반응형 인스펙션 (Playwright).
 * DB 하니스가 못 잡는 UI 클래스를 잡는다:
 *  - 반응형 가로 오버플로우(모바일/태블릿/데스크탑) = 객관적 실패
 *  - 화면 밖으로 삐져나간 요소 = 실패 (오버플로우 원인 지목)
 *  - 2열 그리드 홀수 트레일링 + 전폭혼합 갭 = 휴리스틱 플래그(오탐 가능, 눈 확인용)
 *
 * Usage:
 *   RA_TOKEN=... RA_RID=5 [PAGES='/a,/b'] [BASE_URL=...] node scripts/ui-layout-sweep.js
 * exit≠0 = 오버플로우(객관적 실패) 발생. 그리드 플래그는 리포트만(게이트 아님).
 */
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const RA_TOKEN = process.env.RA_TOKEN;
const RID = process.env.RA_RID || '5';
const WIDTHS = [1280, 768, 375];
const PAGES = (process.env.PAGES || [
  `/restaurant/${RID}/settings?tab=operations`,
  `/restaurant/${RID}/settings?tab=general`,
  `/restaurant/${RID}/settings?tab=payment`,
  `/restaurant/${RID}/pos`,
  `/restaurant/${RID}/floor-plan`,
].join(',')).split(',').map(s => s.trim()).filter(Boolean);

async function evalLayout(page, w) {
  return page.evaluate((width) => {
    const iw = window.innerWidth;
    const overflowX = document.documentElement.scrollWidth > iw + 2;
    const offenders = [];
    if (overflowX) {
      const els = document.querySelectorAll('body *');
      for (let i = 0; i < els.length && offenders.length < 5; i++) {
        const r = els[i].getBoundingClientRect();
        if (r.right > iw + 2 && r.width > 4 && r.width <= iw * 2.5) {
          offenders.push({ tag: els[i].tagName.toLowerCase(), cls: String(els[i].className || '').slice(0, 32), right: Math.round(r.right) });
        }
      }
    }
    const gridFlags = [];
    if (width >= 1000) {
      let scanned = 0;
      for (const el of document.querySelectorAll('div')) {
        if (scanned > 600) break;
        const cs = getComputedStyle(el);
        if (cs.display !== 'grid') continue;
        scanned++;
        const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
        if (cols !== 2) continue;
        const kids = [...el.children];
        if (kids.length < 3) continue;
        const elW = el.getBoundingClientRect().width || 1;
        const ws = kids.map(k => Math.round(k.getBoundingClientRect().width));
        const full = ws.filter(x => x > elW * 0.9).length;
        const partial = kids.length - full;
        if (partial % 2 === 1 && full > 0) {
          gridFlags.push({ cols, kids: kids.length, partial, full });
        }
      }
    }
    return { overflowX, sw: document.documentElement.scrollWidth, iw, offenders, gridFlags };
  }, w);
}

(async () => {
  if (!RA_TOKEN) { console.error('RA_TOKEN 필요'); process.exit(2); }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true, serviceWorkers: 'block', viewport: { width: 1280, height: 900 },
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: RA_TOKEN }, { name: 'currentUserRole', value: 'Restaurant Admin' },
    ] }] },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  let overflowFails = 0, gridFlagCount = 0;
  for (const route of PAGES) {
    console.log(`\n── ${route} ──`);
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(2500);
    } catch (e) { console.log(`  ⚠ load fail: ${e.message.slice(0, 80)}`); continue; }
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.waitForTimeout(350);
      let r;
      try { r = await evalLayout(page, w); } catch (e) { console.log(`  ${w}px ⚠ eval fail`); continue; }
      const of = r.overflowX;
      if (of) overflowFails++;
      const flags = (w >= 1000 ? r.gridFlags.length : 0);
      gridFlagCount += flags;
      const parts = [`${of ? '❌ overflowX' : '✓'} (sw${r.sw}/iw${r.iw})`];
      if (w >= 1000 && flags) parts.push(`⚠ 그리드 홀수갭 ${flags}`);
      console.log(`  ${String(w).padStart(4)}px  ${parts.join(' | ')}`);
      if (of) r.offenders.forEach(o => console.log(`         ↳ ${o.tag}.${o.cls} right=${o.right}`));
    }
  }
  await browser.close();
  console.log(`\n=== 오버플로우 실패 ${overflowFails} · 그리드 갭 플래그 ${gridFlagCount} (플래그=눈 확인) ===`);
  process.exit(overflowFails > 0 ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
