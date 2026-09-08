/**
 * 대조 화면을 **실제 브라우저로 재는** 도구 (2026-09-08)
 *
 * Irene 신고 두 가지를 숫자로 확인한다:
 *   ① 올린 인보이스 미리보기가 안 뜬다 ("이 브라우저에서는 미리보기가 열리지 않습니다")
 *   ② 반응형이 여전히 엉망이다
 *
 * 재는 것: 가로 스크롤 발생 여부 · 화면 밖으로 나간 요소 · 미리보기 요소의 실제 크기.
 * 사용: node scripts/measure-reconcile-page.js <poId> [baseUrl]
 */
const { chromium } = require('playwright');

const PO_ID = process.argv[2] || '32';
const BASE = process.argv[3] || 'https://dev.purplehere.com';
const TOKEN = process.env.MEASURE_TOKEN;
const WIDTHS = [1440, 1280, 1024, 820, 768, 390];

(async () => {
  if (!TOKEN) { console.error('MEASURE_TOKEN 환경변수가 필요합니다'); process.exit(1); }
  const browser = await chromium.launch();
  let worst = 0;

  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [{ name: 'auth_token', value: TOKEN }] }] }
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 120)));

    try {
      await page.goto(`${BASE}/pos/purchase-orders/${PO_ID}/reconcile`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);

      const m = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflowX = doc.scrollWidth - doc.clientWidth;
        // 화면 오른쪽 밖으로 나간 요소
        const over = [];
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > doc.clientWidth + 1) {
            const txt = (el.innerText || '').trim().slice(0, 28).replace(/\n/g, ' ');
            over.push(`${el.tagName.toLowerCase()}[+${Math.round(r.right - doc.clientWidth)}px]"${txt}"`);
          }
        });
        // 대조 화면의 미리보기만 본다 — 사이드바 로고를 잡으면 엉뚱한 숫자가 나온다
        const viewer = Array.from(document.querySelectorAll('div')).find((d) => d.querySelector(':scope > iframe, :scope > img, :scope > object'));
        const obj = viewer ? viewer.querySelector('iframe, img, object') : null;
        const objBox = obj ? obj.getBoundingClientRect() : null;
        const fallbackVisible = !!Array.from(document.querySelectorAll('object div'))
          .find((d) => d.offsetParent !== null);
        const rows = document.querySelectorAll('input[type="number"]').length;
        return {
          overflowX,
          overflowing: over.slice(0, 5),
          preview: obj ? { tag: obj.tagName.toLowerCase(), w: Math.round(objBox.width), h: Math.round(objBox.height) } : null,
          fallbackVisible,
          numberInputs: rows,
          bodyText: (document.body.innerText || '').slice(0, 120).replace(/\n/g, ' | ')
        };
      });

      worst = Math.max(worst, m.overflowX);
      console.log(`\n[${width}px] 가로넘침 ${m.overflowX}px · 미리보기 ${m.preview ? `${m.preview.tag} ${m.preview.w}×${m.preview.h}` : '없음'} · 폴백문구 ${m.fallbackVisible ? '보임(❌)' : '안보임'} · 입력칸 ${m.numberInputs}`);
      if (m.overflowing.length) console.log(`         밖으로 나간 것: ${m.overflowing.join(', ')}`);
      if (errors.length) console.log(`         JS 오류: ${errors.slice(0, 2).join(' / ')}`);
      if (width === WIDTHS[0]) console.log(`         화면 첫 문구: ${m.bodyText}`);
    } catch (e) {
      console.log(`\n[${width}px] 측정 실패: ${e.message.slice(0, 120)}`);
    }
    await ctx.close();
  }

  await browser.close();
  console.log(`\n최대 가로넘침 ${worst}px ${worst > 1 ? '❌ 반응형 문제 있음' : '✅ 가로 스크롤 없음'}`);
  process.exit(0);
})();
