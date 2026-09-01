// 반응형 실측 — 표/목록이 가로로 넘치거나 잘리는지 실브라우저로 잰다.
//
// 왜 필요한가: 공용 DataTableContainer 는 데스크탑에서 overflow:hidden 이라
// 표가 컨테이너보다 넓어지면 "스크롤"이 아니라 "잘린다". 열이 많은 목록(발주 8열 등)에서
// 1024px 바로 위 구간이 특히 위험하다. 정적 분석으로는 잡히지 않아 실측이 유일한 방법이다.
//
// Usage: RA_TOKEN=... BG_TOKEN=... node scripts/responsive-audit.js [--routes a,b] [--widths 1280,1024]
//   토큰은 verify-all 의 fetchDemoToken 과 같은 것을 쓰면 된다.
//
// 판정:
//   PAGE_OVERFLOW  — 문서가 뷰포트보다 넓다(좌우로 흔들린다)
//   TABLE_CLIPPED  — 표가 컨테이너보다 넓은데 컨테이너가 스크롤을 안 준다(내용이 잘려 못 본다)
//   CELL_SQUEEZE   — 표는 안 넘치지만 특정 셀이 과도하게 눌렸다(가독성 경고)
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const RA_TOKEN = process.env.RA_TOKEN;
const BG_TOKEN = process.env.BG_TOKEN;
const RA_RID = process.env.RA_RID || '8';

const VERBOSE = process.argv.includes('--verbose');

const arg = (name) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : null;
};

// 노트북·태블릿 가로/세로·폰. 1024 바로 위(1025~1280)가 가장 의심스러운 구간이라 촘촘히 잰다.
const WIDTHS = (arg('widths') || '1440,1280,1180,1100,1025,1024,900,820,768,430')
  .split(',').map((n) => parseInt(n, 10)).filter(Boolean);

// 표가 있는 목록 페이지 위주. incoming-orders 는 기존 mount sweep 에 없던 페이지다.
const BG_ROUTES = [
  '/pos/brand/general/incoming-orders',
  // 2026-09-01 추가: 이 두 라우트(BrandStaffPage/FoodcourtStaffPage)는 **고쳐 놓고 재보지 않았다.**
  // 94건 스윕의 어느 역할 목록에도 없어서, 수정 대상 화면 자체가 측정에서 빠져 있었다.
  // 수정한 화면이 측정 목록에 없으면 "0건"은 통과가 아니라 검사 누락이다.
  '/pos/brand/manager',
  '/pos/brand/trade-invoices',
  '/pos/brand/invoices',
  '/pos/brand-products',
  '/pos/brand-product-recipes',
  '/pos/brand-menus',
  '/pos/brand/general/subscriptions',
  '/pos/admin/restaurants',
  '/pos/brand/franchise',
  // /pos/manager/* — BG·FG·Manager 4역할 공용 화면. 2026-09-01 이전 어떤 반응형 측정에도
  // 없어서(커버리지 갭) 로컬 overflow:hidden 컨테이너 3개가 검사되지 않고 있었다.
  '/pos/manager/sales',
  '/pos/manager/admins',
  '/pos/manager/subscriptions',
];
// 나머지 6개 역할 — headless-roles-sweep.js 의 역할 정의와 같은 축이되,
// 표가 있는 목록/대시보드 화면만 골랐다(반응형 결함은 표에서만 난다).
const EXTRA_ROLES = [
  { key: 'ADMIN', role: 'System Admin', routes: [
    '/pos/admin/dashboard', '/pos/admin/restaurants', '/pos/admin/staff', '/pos/admin/managers',
    '/pos/admin/supplier-companies', '/pos/admin/subscriptions', '/pos/admin/invoices', '/pos/admin/referrals',
    '/pos/admin/logs', '/pos/admin/history',
  ] },
  { key: 'FG', role: 'Foodcourt General', routes: [
    '/pos/foodcourt/general/dashboard', '/pos/foodcourt/general/incoming-orders',
    '/pos/foodcourt/general/products', '/pos/foodcourt/branches', '/pos/foodcourt/tenancy',
    '/pos/foodcourt/invoices', '/pos/foodcourt/trade-invoices',
    '/pos/foodcourt/manager', // 위 BG_ROUTES 의 '/pos/brand/manager' 와 같은 이유 — 고쳐 놓고 안 재던 화면
  ] },
  { key: 'OWNER', role: 'Restaurant Owner', routes: [
    '/pos/owner/dashboard', '/pos/owner/restaurants', '/pos/owner/performance', '/pos/owner/invoices',
  ] },
  { key: 'SUPPLIER', role: 'Supplier Admin', routes: [
    '/pos/supplier/dashboard', '/pos/supplier/products', '/pos/supplier/orders',
    '/pos/supplier/customers', '/pos/supplier/invoices', '/pos/supplier/trade-invoices', '/pos/supplier/staff',
  ] },
  { key: 'BM', role: 'Brand Manager', routes: [
    '/pos/brand/general/dashboard', '/pos/brand/general/restaurants',
  ] },
  { key: 'FCM', role: 'Foodcourt Manager', routes: [
    '/pos/foodcourt/general/dashboard', '/pos/foodcourt/general/products',
  ] },
];

const RA_ROUTES = [
  '/pos/purchase-orders',
  '/pos/purchase-orders/history',
  `/restaurant/${RA_RID}/invoices`,
  `/restaurant/${RA_RID}/inventory`,
  `/restaurant/${RA_RID}/ingredients`,
  `/restaurant/${RA_RID}/customers`,
  `/restaurant/${RA_RID}/staff`,
  '/pos/suppliers',
  `/restaurant/${RA_RID}/sales`,
  // 그리드형 공용 Table 을 쓰는 화면 — <table> 이 아니라서 예전 탐지기로는 안 보였다
  `/restaurant/${RA_RID}/inventory?tab=dashboard`,
];

const MEASURE = () => {
  const out = { page: null, tables: [], wide: [], grids: [], auth: null };
  // 로그인 화면을 "결함 없는 페이지"로 세지 않기 위한 징후.
  // 토큰이 무효하면 앱이 /pos(로그인)로 튕기는데, 그 화면엔 표가 없어 조용히 "0건"이 된다.
  out.auth = {
    path: location.pathname,
    hasPassword: !!document.querySelector('input[type=password]'),
    loginText: /Sign In|Quick Login|Demo Accounts/.test(document.body.innerText || ''),
  };
  const de = document.documentElement;
  const vw = de.clientWidth;
  out.page = { scrollWidth: de.scrollWidth, clientWidth: vw, overflow: de.scrollWidth - vw };

  // 뷰포트보다 넓은 요소 상위 5개 — 원인 지목용
  const all = document.querySelectorAll('body *');
  const offenders = [];
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1 && r.height > 0) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && String(el.className).slice(0, 40)) || '',
        w: Math.round(r.width),
      });
    }
  }
  out.wide = offenders.slice(0, 5);

  // 그리드형 표 — 이 프로젝트의 공용 TableComponents 는 <table> 이 아니라
  // styled.div + 자식이 display:grid 다. <table> 만 보면 이 화면들은 **검사 자체가 안 된다**.
  // (재고 대시보드의 Incoming Stock·Reorder Suggestions 가 여기 해당)
  const gridSeen = new Set();
  for (const g of document.querySelectorAll('*')) {
    const gs = getComputedStyle(g);
    if (gs.display !== 'grid') continue;
    const cols = (gs.gridTemplateColumns || '').split(' ').filter(Boolean).length;
    if (cols < 3) continue;                      // 2열 이하는 표가 아니라 레이아웃
    const r = g.getBoundingClientRect();
    if (r.width < 200 || r.height < 10) continue;
    if (g.scrollWidth <= g.clientWidth + 1) continue; // 안 넘침
    // 가로 스크롤을 주는 조상이 있으면 볼 수 있다 = 결함 아님
    let scrollable = false, a = g.parentElement, hops = 0;
    while (a && hops < 6) {
      const ox = getComputedStyle(a).overflowX;
      if (ox === 'auto' || ox === 'scroll') { scrollable = true; break; }
      a = a.parentElement; hops++;
    }
    if (scrollable) continue;
    const kk = cols + ':' + g.scrollWidth;
    if (gridSeen.has(kk)) continue;
    gridSeen.add(kk);
    out.grids.push({ cols, scrollWidth: g.scrollWidth, clientWidth: g.clientWidth,
      cls: String(g.className || '').slice(0, 40) });
  }

  for (const t of document.querySelectorAll('table')) {
    const parent = t.parentElement;
    if (!parent) continue;
    const cs = getComputedStyle(parent);
    const tw = t.scrollWidth;
    const pw = parent.clientWidth;
    const scrollable = cs.overflowX === 'auto' || cs.overflowX === 'scroll';
    // 가장 눌린 셀 — 헤더 기준
    let minCell = null;
    for (const th of t.querySelectorAll('thead th')) {
      const r = th.getBoundingClientRect();
      if (r.width > 0 && (minCell === null || r.width < minCell.w)) {
        minCell = { text: (th.textContent || '').trim().slice(0, 18), w: Math.round(r.width) };
      }
    }
    out.tables.push({
      cols: t.querySelectorAll('thead th').length,
      rows: t.querySelectorAll('tbody tr').length,
      tableWidth: tw,
      parentWidth: pw,
      overflowX: cs.overflowX,
      scrollable,
      clipped: tw > pw + 1 && !scrollable,
      minCell,
      display: getComputedStyle(t).display,
    });
  }
  return out;
};

async function auditRole(label, token, routes, roleName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    serviceWorkers: 'block', // SW 가 헤드리스 네비를 가로채 로그인으로 튕기는 것 방지 (page-sweep 과 동일)
    storageState: {
      cookies: [],
      origins: [{
        origin: BASE,
        localStorage: [
          { name: 'auth_token', value: token },
          { name: 'currentUserRole', value: roleName || (label === 'RA' ? 'Restaurant Admin' : 'Brand General') },
        ],
      }],
    },
  });

  const findings = [];
  for (const route of routes) {
    const page = await context.newPage();
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      try {
        // networkidle 은 쓰지 않는다 — 라이브 목록은 소켓/폴링이 계속 열려 있어 절대 idle 이 안 된다.
        if (page.url().includes(route)) await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
        else await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // 표가 그려질 때까지 기다린다. 표가 없는 화면일 수도 있으므로 실패해도 계속 간다.
        await page.waitForSelector('table, [data-empty], h1, h2', { timeout: 15000 }).catch(() => {});
      } catch (e) {
        findings.push({ label, route, w, kind: 'NAV_FAIL', detail: e.message.slice(0, 60) });
        continue;
      }
      await page.waitForTimeout(1200); // 표 렌더 안정화 (데이터 fetch 후 재레이아웃)
      let m;
      try { m = await page.evaluate(MEASURE); } catch (e) {
        findings.push({ label, route, w, kind: 'EVAL_FAIL', detail: e.message.slice(0, 60) });
        continue;
      }

      if (VERBOSE) {
        console.log(`  · [${label}] ${route} @${w}px — 문서 ${m.page.scrollWidth}/${m.page.clientWidth}, 표 ${m.tables.length}개` +
          m.tables.map((t) => ` [${t.cols}열 ${t.tableWidth}/${t.parentWidth} ${t.display} ox:${t.overflowX}${t.clipped ? ' CLIPPED' : ''}]`).join('') +
          (m.grids || []).map((g) => ` [grid ${g.cols}열 ${g.scrollWidth}/${g.clientWidth} GRID_CLIPPED]`).join(''));
      }
      // 인증 실패 판정 — 측정 자체가 무효다. 결함 0건과 절대 같은 출력이 되면 안 된다.
      if (m.auth && (m.auth.hasPassword || m.auth.loginText) && !route.startsWith('/pos/login')) {
        findings.push({
          label, route, w, kind: 'AUTH_FAIL',
          detail: `로그인 화면이 떴다(착지 ${m.auth.path}) — 토큰이 무효하거나 권한이 없다. 이 라우트는 검사되지 않았다`,
        });
        continue; // 로그인 화면의 표를 재봐야 의미 없다
      }
      if (m.page.overflow > 1) {
        findings.push({
          label, route, w, kind: 'PAGE_OVERFLOW',
          detail: `문서 ${m.page.scrollWidth}px > 뷰포트 ${m.page.clientWidth}px (+${m.page.overflow})`,
          wide: m.wide,
        });
      }
      for (const g of (m.grids || [])) {
        findings.push({
          label, route, w, kind: 'GRID_CLIPPED',
          detail: `그리드 표 ${g.scrollWidth}px > 표시영역 ${g.clientWidth}px · ${g.cols}열 · 가로 스크롤 조상 없음 → 잘려서 못 봄`,
        });
      }
      for (const t of m.tables) {
        if (t.display === 'block') continue; // 모바일 카드 모드 — 표가 아니다
        if (t.clipped) {
          findings.push({
            label, route, w, kind: 'TABLE_CLIPPED',
            detail: `표 ${t.tableWidth}px > 컨테이너 ${t.parentWidth}px · overflow-x:${t.overflowX} · ${t.cols}열/${t.rows}행 → 잘려서 못 봄`,
          });
        } else if (t.minCell && t.minCell.w < 48 && t.cols >= 6) {
          findings.push({
            label, route, w, kind: 'CELL_SQUEEZE',
            detail: `가장 좁은 열 "${t.minCell.text}" ${t.minCell.w}px (${t.cols}열)`,
          });
        }
      }
    }
    await page.close();
  }
  await browser.close();
  return findings;
}

(async () => {
  const routesArg = arg('routes');
  const all = [];
  // --routes 는 **주어진 토큰 전부**에 적용된다.
  // 예전엔 --routes 가 BG 에만 걸려, RA 라우트를 지정하면 아무것도 재지 않고 "0건"을 냈다.
  // 측정 0건과 결함 0건이 같은 출력이 되는 것이 가장 위험한 고장이라, 잰 개수를 항상 찍는다.
  let measured = 0;
  if (BG_TOKEN) {
    const routes = routesArg ? routesArg.split(',') : BG_ROUTES;
    console.log(`\n=== BG 반응형 실측 (${routes.length} routes × ${WIDTHS.length} widths) ===`);
    all.push(...await auditRole('BG', BG_TOKEN, routes));
    measured += routes.length * WIDTHS.length;
  }
  if (RA_TOKEN) {
    const routes = routesArg ? routesArg.split(',') : RA_ROUTES;
    console.log(`\n=== RA 반응형 실측 (${routes.length} routes × ${WIDTHS.length} widths) ===`);
    all.push(...await auditRole('RA', RA_TOKEN, routes));
    measured += routes.length * WIDTHS.length;
  }
  if (!routesArg) {
    for (const r of EXTRA_ROLES) {
      const token = process.env[r.key + '_TOKEN'];
      if (!token) { console.log(`\n=== ${r.key} 건너뜀 — ${r.key}_TOKEN 없음 (검사 못 함, 결함 0 아님) ===`); continue; }
      console.log(`\n=== ${r.key} 반응형 실측 (${r.routes.length} routes × ${WIDTHS.length} widths) ===`);
      all.push(...await auditRole(r.key, token, r.routes, r.role));
      measured += r.routes.length * WIDTHS.length;
    }
  }

  if (measured === 0) {
    console.error('✗ 측정 0건 — 토큰이 없다(RA_TOKEN/BG_TOKEN). 결함 0건이 아니라 검사 자체를 못 한 것이다.');
    process.exit(2);
  }

  // 라우트별로 묶어서 출력 — 같은 결함이 폭마다 반복되므로 폭은 범위로 접는다
  const key = (f) => `${f.label}|${f.route}|${f.kind}`;
  const grouped = new Map();
  for (const f of all) {
    if (!grouped.has(key(f))) grouped.set(key(f), { ...f, widths: [] });
    grouped.get(key(f)).widths.push(f.w);
  }

  console.log(`\n=== 측정 ${measured}건 (라우트×폭) · 결과 ${grouped.size}건 ===\n`);
  const order = { AUTH_FAIL: 0, PAGE_OVERFLOW: 1, TABLE_CLIPPED: 2, GRID_CLIPPED: 3, NAV_FAIL: 4, EVAL_FAIL: 5, CELL_SQUEEZE: 6 };
  const rows = [...grouped.values()].sort((a, b) => (order[a.kind] ?? 9) - (order[b.kind] ?? 9));
  for (const f of rows) {
    console.log(`[${f.kind}] [${f.label}] ${f.route}`);
    console.log(`   폭 ${f.widths.join(', ')}px`);
    console.log(`   ${f.detail}`);
    if (f.wide && f.wide.length) {
      f.wide.forEach((o) => console.log(`     ↳ 넘치는 요소: <${o.tag}> ${o.w}px  ${o.cls}`));
    }
    console.log('');
  }
  const blocking = rows.filter((f) => ['AUTH_FAIL', 'PAGE_OVERFLOW', 'TABLE_CLIPPED', 'GRID_CLIPPED'].includes(f.kind));
  console.log(`=== 차단성 ${blocking.length}건 · 경고 ${rows.length - blocking.length}건 ===`);
  process.exit(blocking.length ? 1 : 0);
})();
