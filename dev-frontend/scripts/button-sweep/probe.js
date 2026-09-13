// 1계층 탐지기 자가시험 (읽기 전용 · 클릭하지 않는다).
// 목적: React 19 DOM 노드에서 onClick 존재 여부를 읽을 수 있는지 «반증 포함» 확인.
//   양성 대조 = 실제 onClick 달린 버튼이 detected 로 나오는가
//   음성 대조 = 핸들러 없는 요소가 not-detected 로 나오는가
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';

const TOKENS = require(process.env.TOKENS_FILE || '/tmp/tokens.json');

(async () => {
  const token = TOKENS.ra_demo;
  const rid = TOKENS.ra_demo_rid;
  if (!token) { console.error('데모매장 RA 토큰 없음'); process.exit(1); }
  console.log(`토큰 OK · 데모매장 restaurant_id=${rid}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: token }, { name: 'currentUserRole', value: 'Restaurant Admin' } ] }] },
  });
  const page = await ctx.newPage();
  const route = process.env.PROBE_ROUTE || `/restaurant/${rid}/menu`;
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const res = await page.evaluate(() => {
    const propsKeyOf = (el) => Object.keys(el).find(k => k.startsWith('__reactProps$'));
    const nodes = Array.from(document.querySelectorAll('button, a, [role="button"], input, select, textarea, div, span'));
    let withKey = 0, withOnClick = 0, buttons = 0, buttonsWithOnClick = 0, plainDivs = 0, plainDivsWithOnClick = 0;
    const samples = [];
    for (const el of nodes) {
      const k = propsKeyOf(el);
      if (k) withKey++;
      const p = k ? el[k] : null;
      const hasClick = !!(p && typeof p.onClick === 'function');
      if (hasClick) withOnClick++;
      if (el.tagName === 'BUTTON') {
        buttons++;
        if (hasClick) { buttonsWithOnClick++; if (samples.length < 5) samples.push({ text: (el.innerText||'').trim().slice(0,30), hasClick: true, type: el.type, disabled: el.disabled }); }
        else if (samples.length < 8) samples.push({ text: (el.innerText||'').trim().slice(0,30), hasClick: false, type: el.type, disabled: el.disabled });
      }
      if (el.tagName === 'DIV') { plainDivs++; if (hasClick) plainDivsWithOnClick++; }
    }
    return { total: nodes.length, withKey, withOnClick, buttons, buttonsWithOnClick, plainDivs, plainDivsWithOnClick, samples,
             reactVersion: (window.React && window.React.version) || 'n/a' };
  });

  console.log('\n=== 탐지기 자가시험 결과 ===');
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})();
