// 남은 «무반응» 3건이 «이미 선택된 탭/모드» 인지 확인한다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  for (const [route, names] of [[`/restaurant/${T.ra_demo_rid}/pos-terminal`, ['Image', 'Compact']],
                                [`/restaurant/${T.ra_demo_rid}/kitchen`, ['Order', 'Item', 'All']]]) {
    const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await p.waitForTimeout(3500);
    console.log(`\n--- ${route}`);
    for (const n of names) {
      const info = await p.getByRole('button', { name: n, exact: true }).first().evaluate(el => ({
        ariaSelected: el.getAttribute('aria-selected'), ariaPressed: el.getAttribute('aria-pressed'),
        cls: String(el.className).slice(0, 60),
        bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color,
        bold: getComputedStyle(el).fontWeight,
      }), undefined, { timeout: 3000 }).catch(e => ({ err: e.message.slice(0, 40) }));
      console.log(`  ${n.padEnd(9)} ${JSON.stringify(info)}`);
    }
    await p.close();
  }
  await b.close();
})();
