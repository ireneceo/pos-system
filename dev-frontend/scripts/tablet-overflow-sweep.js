// 태블릿 폭 가로넘침 실측 (읽기 전용)
//
// 무엇을 재는가: 페이지(document) 넘침이 아니라 **내부 가로 스트립**의 넘침.
// 매장 태블릿 "좌우 흔들림"의 정체가 그것이다 — 탭줄·칩줄·통계줄이 overflow-x:auto 로
// 넘쳐 잘리는 것. document.scrollWidth 만 보면 0 이라 못 잡는다.
// (근거: 메모리 reference_tablet_responsive_audit / 2026-06-13 점검)
//
// 사용: RA_TOKEN=… BG_TOKEN=… RA_RID=38 node scripts/tablet-overflow-sweep.js
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const RA_RID = process.env.RA_RID || '38';

// 태블릿 실물 폭. 세로(768)가 09-08 헤더 작업 전까지 규칙이 통째로 빠져 있던 구간이다.
const VIEWPORTS = [
  { name: '768×1024 세로(iPad)', w: 768, h: 1024 },
  { name: '820×1180 세로(iPad Air)', w: 820, h: 1180 },
  { name: '1024×600 가로(9인치)', w: 1024, h: 600 },
  { name: '1024×768 가로(현장)', w: 1024, h: 768 },
  { name: '1280×800 가로(10인치)', w: 1280, h: 800 },
];

const routesFor = (rid) => [
  { r: `/restaurant/${rid}/dashboard`, role: 'RA' },
  { r: `/restaurant/${rid}/live-orders`, role: 'RA' },
  { r: `/restaurant/${rid}/reservations`, role: 'RA' },
  { r: `/restaurant/${rid}/pos-terminal`, role: 'RA' },
  { r: `/restaurant/${rid}/floor-plan`, role: 'RA' },
  { r: `/restaurant/${rid}/floor-plan?view=items`, role: 'RA' },
  { r: `/restaurant/${rid}/kitchen`, role: 'RA' },
  { r: `/restaurant/${rid}/menu`, role: 'RA' },
  { r: `/restaurant/${rid}/recipe-management?tab=ingredients`, role: 'RA' },
  { r: `/restaurant/${rid}/inventory`, role: 'RA' },
  { r: `/restaurant/${rid}/invoices`, role: 'RA' },
  { r: `/restaurant/${rid}/cash-management`, role: 'RA' },
  { r: `/restaurant/${rid}/reports?tab=sales`, role: 'RA' },
  { r: `/restaurant/${rid}/staff`, role: 'RA' },
  { r: `/restaurant/${rid}/customers`, role: 'RA' },
  { r: `/restaurant/${rid}/settings?tab=store`, role: 'RA' },
  { r: `/restaurant/${rid}/settings?tab=printer`, role: 'RA' },
  // 2026-09-10 Irene 지시로 추가 — 이 두 화면이 목록에서 빠져 있어 **한 번도 측정된 적이 없었다.**
  { r: `/restaurant/${rid}/notification-settings`, role: 'RA' },   // 메일 알림 설정 폼
  { r: `/pos/purchase-orders`, role: 'RA', note: '발주 목록(결제 버튼 추가됨)' },
  { r: `/pos/purchase-orders`, role: 'RA' },
  { r: `/pos/suppliers`, role: 'RA' },
  { r: '/pos/brand/general/dashboard', role: 'BG' },
  { r: '/pos/brand/general/incoming-orders', role: 'BG' },
  { r: '/pos/brand-products', role: 'BG' },
  { r: '/pos/brand-menus', role: 'BG' },
  { r: '/pos/brand/trade-invoices', role: 'BG' },
  { r: '/pos/brand/general/reports', role: 'BG' },
];

// 넘치는 컨테이너를 찾아 «누구인지» 식별 가능한 형태로 돌려준다.
const PROBE = () => {
  const out = [];
  const seen = new Set();
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const over = el.scrollWidth - el.clientWidth;
    if (over <= 8) return;
    // overflow-x 가 visible 이면 부모가 처리 — 잘림/흔들림의 주체가 아니다.
    if (cs.overflowX === 'visible') return;
    // **의도된 말줄임은 결함이 아니다.** `white-space:nowrap + text-overflow:ellipsis` 는
    // 긴 값을 "…" 로 줄여 보여주는 설계다(예: 사이드바 이메일). 이걸 넘침으로 세면
    // 전 페이지가 거짓 양성으로 뜬다 — 2026-09-09 1차 측정에서 실제로 그랬다.
    if (cs.textOverflow === 'ellipsis' && cs.whiteSpace === 'nowrap') return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 8) return;
    const cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/).slice(0, 3).join('.');
    const key = el.tagName + '|' + cls + '|' + over;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: cls.slice(0, 80),
      over,
      w: Math.round(rect.width),
      overflowX: cs.overflowX,
      text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    });
  });
  return {
    pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
    containers: out.sort((a, b) => b.over - a.over).slice(0, 6),
  };
};

async function run(role, token, routes) {
  const browser = await chromium.launch({ headless: true });
  const findings = [];
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      serviceWorkers: 'block',
      viewport: { width: vp.w, height: vp.h },
      hasTouch: true,
      storageState: {
        cookies: [],
        origins: [{
          origin: BASE,
          localStorage: [
            { name: 'auth_token', value: token },
            { name: 'currentUserRole', value: role === 'RA' ? 'Restaurant Admin' : 'Brand General' },
          ],
        }],
      },
    });
    for (const { r } of routes) {
      const page = await context.newPage();
      try {
        // networkidle 은 쓰지 않는다 — 이 앱은 소켓을 유지해 절대 idle 이 되지 않고
        // 라우트마다 타임아웃(25s)을 다 쓴다. 레이아웃 측정에는 DOM + 데이터 정착 대기면 충분.
        await page.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(3000);
        const res = await page.evaluate(PROBE);
        if (res.pageOverflow > 8 || res.containers.length) {
          findings.push({ role, route: r, vp: vp.name, ...res });
          console.log(`✗ [${role}] ${vp.name} ${r}` +
            (res.pageOverflow > 8 ? `  ⚠페이지넘침 ${res.pageOverflow}px` : ''));
          res.containers.forEach(cc =>
            console.log(`     └ ${cc.tag}.${cc.cls} — ${cc.over}px 넘침 (폭 ${cc.w}, overflow-x:${cc.overflowX}) "${cc.text}"`));
        } else {
          console.log(`✓ [${role}] ${vp.name} ${r}`);
        }
      } catch (e) {
        console.log(`… [${role}] ${vp.name} ${r} → ${e.message.slice(0, 60)}`);
      }
      await page.close();
    }
    await context.close();
  }
  await browser.close();
  return findings;
}

(async () => {
  const all = [];
  const routes = routesFor(RA_RID);
  if (process.env.RA_TOKEN) all.push(...await run('RA', process.env.RA_TOKEN, routes.filter(x => x.role === 'RA')));
  if (process.env.BG_TOKEN) all.push(...await run('BG', process.env.BG_TOKEN, routes.filter(x => x.role === 'BG')));

  console.log(`\n=== 요약 — 넘침 발견 ${all.length}건 ===`);
  const byRoute = {};
  all.forEach(f => { (byRoute[f.route] ||= []).push(f); });
  Object.entries(byRoute)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([route, fs]) => {
      const worst = Math.max(...fs.flatMap(f => f.containers.map(c => c.over).concat(f.pageOverflow)));
      console.log(`  ${route} — ${fs.length}개 폭에서 넘침 (최대 ${worst}px)`);
      const names = new Set(fs.flatMap(f => f.containers.map(c => `${c.tag}.${c.cls}`)));
      [...names].slice(0, 4).forEach(n => console.log(`      ${n}`));
    });
  require('fs').writeFileSync('/tmp/claude-1000/-var-www/tablet-overflow.json', JSON.stringify(all, null, 2));
  console.log('\n상세: /tmp/claude-1000/-var-www/tablet-overflow.json');
})();
