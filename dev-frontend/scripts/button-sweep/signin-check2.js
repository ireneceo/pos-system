// Sign In 이 «아무 반응 없음» 인지, 브라우저 기본 필수검사가 도는지 구분한다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/restaurant/${T.ra_demo_rid}/pos-terminal`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(3000);
  await p.evaluate(() => {
    window.__invalid = 0; window.__submit = 0;
    document.addEventListener('invalid', () => { window.__invalid++; }, true);
    document.addEventListener('submit', () => { window.__submit++; }, true);
    const btn = Array.from(document.querySelectorAll('button')).find(b => /^sign in$/i.test((b.innerText||'').trim()));
    window.__btnInfo = btn ? { type: btn.type, inForm: !!btn.closest('form'), disabled: btn.disabled } : null;
  });
  await p.getByRole('button', { name: /^Sign In$/i }).first().click({ timeout: 4000 }).catch(() => {});
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => ({ invalid: window.__invalid, submit: window.__submit, btn: window.__btnInfo }));
  console.log('버튼 정보:', JSON.stringify(r.btn));
  console.log('필수검사(invalid) 발생 횟수:', r.invalid, ' / submit 발생:', r.submit);
  console.log(r.invalid > 0 ? '→ 브라우저가 «칸을 채우세요» 를 띄운다 = 무반응 아님'
                            : '→ 아무 것도 안 일어남 = 진짜 무반응');
  await b.close();
})();
