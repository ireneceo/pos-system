/** ①-b 화면(공유 표준 재료) + ② 표시 실브라우저 확인. 데모 BG. */
const { chromium } = require('playwright');
const BASE = 'https://dev.purplehere.com';
const R = []; const ck = (n, ok, d='') => { R.push(ok); console.log(`${ok?'PASS':'FAIL'}  ${n}${d?'  — '+d:''}`); };
(async () => {
  const b = await chromium.launch({ headless: true });
  const errs = [];
  try {
    const c = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: process.env.BG_TOKEN }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
    const p = await c.newPage();
    p.on('pageerror', e => errs.push(e.message.slice(0,140)));
    p.on('console', m => { if (m.type()==='error') errs.push(m.text().slice(0,140)); });

    // ① 사이드바 항목이 보이고, 클릭하면 리다이렉트 없이 열린다
    await p.goto(`${BASE}/pos/brand/general/dashboard`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(3500);
    const nav = await p.locator('body').innerText();
    ck('① 사이드바에 "Shared Ingredients" 항목이 있다', /Shared Ingredients|공유 표준 재료/.test(nav));

    await p.goto(`${BASE}/pos/brand/general/ingredients`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(4500);
    ck('① 리다이렉트 없이 열린다', /\/pos\/brand\/general\/ingredients/.test(p.url()), p.url());
    const t = await p.locator('body').innerText();
    ck('① 재료 목록이 렌더된다', t.length > 800, `${t.length}자`);

    // ② 원가 0 이면 "원가 미설정" 으로 보인다 (있으면)
    const hasNotSet = /Cost not set|원가 미설정|No price set|가격 미입력/.test(t);
    console.log(`   (참고) 원가/가격 미설정 표시 등장: ${hasNotSet}`);

    // ①-b 편집 폼의 Active 토글
    const edit = p.getByRole('button', { name: 'Edit', exact: true }).first();
    const hasEdit = await edit.count() > 0;
    ck('①-b 편집 버튼이 있다', hasEdit);
    if (hasEdit) {
      await edit.click(); await p.waitForTimeout(1800);
      const f = await p.locator('body').innerText();
      ck('①-b 편집 폼에 Active 토글이 있다', /Active|사용/.test(f) && /(In use|사용 중|Turned off|꺼짐)/.test(f));
    }
    ck('콘솔 에러 0', errs.length === 0, errs.slice(0,2).join(' | '));
  } catch (e) { ck('runner', false, e.message); }
  finally { await b.close(); const pass = R.filter(Boolean).length; console.log(`\n결과 ${pass}/${R.length}`); process.exit(pass===R.length?0:1); }
})();
