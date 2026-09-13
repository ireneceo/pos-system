const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/restaurant/${T.ra_demo_rid}/cash-management`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(3500);
  await p.getByRole('button', { name: /Today's Cash Drawer/i }).first().click({ timeout: 4000 }).catch(() => {});
  await p.waitForTimeout(1800);
  const snap = () => p.evaluate(() => {
    const ov = Array.from(document.body.children).find(el => { const cs = getComputedStyle(el);
      return cs.position === 'fixed' && (parseInt(cs.zIndex || '0', 10) || 0) >= 900; });
    return { text: (ov ? ov.innerText : document.body.innerText).replace(/\s+/g, ' ').trim().slice(0, 260),
             inputs: Array.from((ov || document).querySelectorAll('input')).map(i => `${i.type}:${i.value}`).join(' | ') };
  });
  const a = await snap();
  console.log('누르기 전 :', a.text.slice(0, 150));
  console.log('  입력칸  :', a.inputs);
  for (const key of ['1', '2', '3']) {
    await p.getByRole('button', { name: key, exact: true }).first().click({ timeout: 3000 }).catch(e => console.log(`  «${key}» 클릭 실패`));
    await p.waitForTimeout(500);
  }
  const c = await snap();
  console.log('\n1,2,3 누른 뒤:', c.text.slice(0, 150));
  console.log('  입력칸  :', c.inputs);
  console.log('\n변화:', a.text === c.text && a.inputs === c.inputs ? '없음 — 키패드가 아무 일도 안 한다' : '있음 — 정상 동작');
  await b.close();
})();
