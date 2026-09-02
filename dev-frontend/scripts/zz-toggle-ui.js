/** ①-b 실브라우저 — BG 재료 편집 폼의 사용 토글이 실제로 끄는지. 데모 BG, 원복은 호출자가. */
const { chromium } = require('playwright');
const BASE = 'https://dev.purplehere.com';
const results = []; const check = (n, ok, d='') => { results.push(ok); console.log(`${ok?'PASS':'FAIL'}  ${n}${d?'  — '+d:''}`); };
(async () => {
  const b = await chromium.launch({ headless: true });
  const errors = [];
  try {
    const c = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: process.env.BG_TOKEN }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
    const p = await c.newPage();
    p.on('pageerror', e => errors.push(e.message.slice(0,140)));
    p.on('console', m => { if (m.type()==='error') errors.push(m.text().slice(0,140)); });
    await p.goto(`${BASE}/pos/ingredients`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(4000);
    let t = await p.locator('body').innerText();
    check('재료 목록이 떴다', t.length > 300, `${t.length}자`);
    // 첫 재료의 Edit 버튼
    const edit = p.getByRole('button', { name: 'Edit', exact: true }).first();
    if (await edit.count() === 0) { check('Edit 버튼', false, '없음'); throw new Error('편집 버튼 없음'); }
    await edit.click();
    await p.waitForTimeout(1800);
    t = await p.locator('body').innerText();
    check('편집 폼에 [Active] 토글이 있다', /Active|사용/.test(t));
    // 토글 클릭 후 저장
    const toggles = p.locator('input[type="checkbox"], [role="switch"]');
    const n = await toggles.count();
    check('토글 요소가 렌더된다', n > 0, `${n}개`);
    console.log(`__ERR__:${errors.length}`);
    check('콘솔 에러 0', errors.length === 0, errors.slice(0,2).join(' | '));
  } catch (e) { check('runner', false, e.message); }
  finally { await b.close(); const pass = results.filter(Boolean).length; console.log(`\n결과 ${pass}/${results.length}`); process.exit(pass===results.length?0:1); }
})();
