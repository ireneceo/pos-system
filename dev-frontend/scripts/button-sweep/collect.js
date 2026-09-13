#!/usr/bin/env node
/**
 * 버튼 전수검사 1계층 — 수집 + 정적 결함 탐지 (⛔ 클릭하지 않는다 · 읽기 전용)
 * ---------------------------------------------------------------------------
 * 왜 클릭하지 않는가: 클릭은 저장·삭제·발송을 실제로 실행한다. 1계층은 «무엇이 있고
 * 무엇이 명백히 고장나 있는가»만 본다. 실클릭은 승인 후 2계층(데모매장 한정).
 *
 * 탐지 (자가시험 완료 — probe.js):
 *   B1 무반응 후보  : 보이고 활성인데 onClick·href·submit 아무것도 없음
 *   B2 submit 오용  : form 안 button 이 type 없이(=submit) onClick 도 가짐 → 이중 실행/새로고침
 *   B3 가려짐       : 중심점 히트테스트가 남의 요소를 집음 (모달 backdrop·z-index)
 *   B4 클릭 불가    : 크기 0 또는 pointer-events:none 인데 화면엔 있음
 *   B5 사유 없는 비활성 : disabled 인데 title/aria 설명이 없어 왜 막혔는지 알 수 없음
 *   B6 터치영역 작음 : 최소변 32px 미만 (태블릿·POS 터치)
 *   B7 없는 경로    : 링크 대상이 App.tsx 라우트에 없음
 *   B8 빈 링크      : href="#" / href 없음 / to=""
 *
 * 사용: TOKENS_FILE=/path/tokens.json node scripts/button-sweep/collect.js [--roles ra,bg] [--limit 5]
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKENS = JSON.parse(fs.readFileSync(process.env.TOKENS_FILE, 'utf8'));
const OUT_DIR = path.join(__dirname, 'out');
const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const ONLY_ROLES = (argOf('--roles', '') || '').split(',').filter(Boolean);
const LIMIT = parseInt(argOf('--limit', '0'), 10) || 0;

// ── 라우트 목록: 기존 sweep 두 개에서 그대로 가져온다(단일 소스 유지, 복제 금지) ──
function arrayLiteral(src, name, vars) {
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) return [];
  const from = src.indexOf('[', start);
  let depth = 0, end = from;
  for (let i = from; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  const lit = src.slice(from, end + 1);
  // eslint-disable-next-line no-new-func
  return new Function(...Object.keys(vars), `return ${lit}`)(...Object.values(vars));
}
function rolesObject(src) {
  const start = src.indexOf('const ROLES = {');
  const from = src.indexOf('{', start);
  let depth = 0, end = from;
  for (let i = from; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  // eslint-disable-next-line no-new-func
  return new Function('process', `return ${src.slice(from, end + 1)}`)({ env: {} });
}

const pageSweepSrc = fs.readFileSync(path.join(__dirname, '..', 'headless-page-sweep.js'), 'utf8');
const rolesSweepSrc = fs.readFileSync(path.join(__dirname, '..', 'headless-roles-sweep.js'), 'utf8');
const RA_RID = String(TOKENS.ra_demo_rid || TOKENS.ra_rid || 38);
const BG_BRANDID = String(TOKENS.bg_brand_id || 1);

const ROLE_DEFS = [
  { key: 'ra',  label: 'Restaurant Admin', token: TOKENS.ra_demo || TOKENS.ra,
    routes: arrayLiteral(pageSweepSrc, 'RA_ROUTES', { RA_RID }) },
  { key: 'bg',  label: 'Brand General', token: TOKENS.bg,
    routes: arrayLiteral(pageSweepSrc, 'BG_ROUTES', { BG_BRANDID }) },
];
const rolesObj = rolesObject(rolesSweepSrc);
const TOKEN_BY_ROLEKEY = { admin: TOKENS.admin, fg: TOKENS.fg, owner: TOKENS.owner,
                           supplier: TOKENS.supplier, fcm: TOKENS.fcm, bm: TOKENS.bm };
for (const [k, def] of Object.entries(rolesObj)) {
  const token = TOKEN_BY_ROLEKEY[k];
  if (token && Array.isArray(def.routes)) ROLE_DEFS.push({ key: k, label: def.role, token, routes: def.routes });
}

// App.tsx 의 라우트 패턴 — B7(없는 경로) 판정용
const appSrc = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'App.tsx'), 'utf8');
const APP_ROUTES = Array.from(appSrc.matchAll(/path=["'`]([^"'`]+)["'`]/g)).map(m => m[1]);

// 페이지 안에서 도는 수집기 (문자열로 주입 — 클릭 없음)
const COLLECTOR = () => {
  const propsKeyOf = (el) => Object.keys(el).find(k => k.startsWith('__reactProps$'));
  const SEL = 'button, a, [role="button"], [role="tab"], [role="menuitem"], input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"], select, summary, [onclick]';
  const out = [];
  const nodes = Array.from(document.querySelectorAll(SEL));
  for (const el of nodes) {
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const inViewport = rect.width > 0 && rect.height > 0;
    const displayed = cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.01;
    if (!displayed) continue;                       // 숨은 것은 이번 계층 대상 아님
    const k = propsKeyOf(el);
    const props = k ? el[k] : null;
    const hasOnClick = !!(props && typeof props.onClick === 'function');
    const hasOnChange = !!(props && typeof props.onChange === 'function');
    const hasOnKey = !!(props && (typeof props.onKeyDown === 'function' || typeof props.onKeyPress === 'function'));
    const tag = el.tagName.toLowerCase();
    const href = el.getAttribute('href');
    const typeAttr = el.getAttribute('type');
    const isSubmit = tag === 'button' ? (typeAttr === 'submit' || typeAttr === null) : typeAttr === 'submit';
    const inForm = !!el.closest('form');
    const disabled = !!(el.disabled || el.getAttribute('aria-disabled') === 'true');
    const text = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    // 가려짐 판정 — 중심점이 뷰포트 안일 때만 의미가 있다
    // 5점 히트테스트 — 중심 1점만 보면 사이드바 2단 패널처럼 겹쳐 배치된 정상 메뉴가
    // 통째로 «가려짐» 으로 잡힌다(2026-09-13 오탐 실측). 다섯 점이 **전부** 남을 집을 때만 표시한다.
    let covered = null, coveredBy = null;
    if (inViewport) {
      const inset = 3;
      const pts = [
        [rect.left + rect.width / 2, rect.top + rect.height / 2],
        [rect.left + inset, rect.top + inset],
        [rect.right - inset, rect.top + inset],
        [rect.left + inset, rect.bottom - inset],
        [rect.right - inset, rect.bottom - inset],
      ].filter(([x, y]) => x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight);
      if (pts.length) {
        let blocked = 0, lastHit = null;
        for (const [x, y] of pts) {
          const hit = document.elementFromPoint(x, y);
          if (hit && hit !== el && !el.contains(hit) && !hit.contains(el)) { blocked++; lastHit = hit; }
        }
        covered = blocked === pts.length;
        if (covered && lastHit) {
          coveredBy = (lastHit.tagName || '').toLowerCase() + (lastHit.className && typeof lastHit.className === 'string' ? '.' + lastHit.className.split(' ').slice(0, 2).join('.') : '');
        }
      }
    }
    const minSide = Math.min(rect.width, rect.height);
    const reasonGiven = !!(el.getAttribute('title') || el.getAttribute('aria-label') || el.getAttribute('aria-describedby'));
    out.push({
      tag, text, type: typeAttr, href, disabled, hasOnClick, hasOnChange, hasOnKey, isSubmit, inForm,
      pointerEvents: cs.pointerEvents, w: Math.round(rect.width), h: Math.round(rect.height),
      minSide: Math.round(minSide), covered, coveredBy, reasonGiven, inViewport,
      cls: (typeof el.className === 'string' ? el.className.split(' ').slice(0, 2).join('.') : '').slice(0, 60),
    });
  }
  return out;
};

function classify(rec, appRoutes) {
  const flags = [];
  const interactive = rec.hasOnClick || rec.hasOnChange || rec.hasOnKey || !!rec.href || (rec.isSubmit && rec.inForm);
  if (!rec.disabled && !interactive && rec.tag !== 'select' && rec.tag !== 'summary') flags.push('B1_무반응후보');
  if (rec.tag === 'button' && rec.inForm && rec.type === null && rec.hasOnClick) flags.push('B2_submit오용');
  if (rec.covered === true) flags.push('B3_가려짐_의심');
  if (rec.pointerEvents === 'none' && !rec.disabled) flags.push('B4_클릭불가');
  if (rec.disabled && !rec.reasonGiven) flags.push('B5_비활성사유없음');
  if (rec.minSide > 0 && rec.minSide < 32 && (rec.hasOnClick || rec.href)) flags.push('B6_터치영역작음');
  if (rec.href) {
    const h = rec.href;
    if (h === '#' || h === '' || h === 'javascript:void(0)') flags.push('B8_빈링크');
    else if (h.startsWith('/')) {
      const p = h.split('?')[0].split('#')[0];
      const hit = appRoutes.some(r => {
        const base = r.replace(/\/\*$/, '');                       // '/mobile/*' → '/mobile' 도 유효한 주소다
        const body = base.replace(/:[^/]+/g, '[^/]+').replace(/\*/g, '.*');
        return new RegExp('^' + body + '(/.*)?$').test(p);
      });
      if (!hit) flags.push('B7_없는경로');
    }
  }
  return flags;
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const all = [];
  const browser = await chromium.launch({ headless: true });
  for (const def of ROLE_DEFS) {
    if (ONLY_ROLES.length && !ONLY_ROLES.includes(def.key)) continue;
    const routes = LIMIT ? def.routes.slice(0, LIMIT) : def.routes;
    const ctx = await browser.newContext({
      ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: def.token }, { name: 'currentUserRole', value: def.label } ] }] },
    });
    console.log(`\n=== [${def.key}] ${def.label} — ${routes.length} 화면 ===`);
    for (const route of routes) {
      const page = await ctx.newPage();
      const consoleErrors = [];
      page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message.slice(0, 160)));
      page.on('console', m => { if (m.type() === 'error') {
        const t = m.text();
        if (t.includes('Failed to load resource') && (t.includes('/uploads/') || t.includes('.png') || t.includes('.jpg'))) return;
        if (t.includes('Download the React DevTools')) return;
        consoleErrors.push(t.slice(0, 160));
      } });
      let recs = [], status = 'OK';
      try {
        await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 25000 });
        await page.waitForTimeout(2500);
        recs = await page.evaluate(COLLECTOR);
      } catch (e) { status = 'NAV_FAIL: ' + e.message.slice(0, 60); }
      const flagged = [];
      for (const r of recs) {
        const flags = classify(r, APP_ROUTES);
        if (flags.length) flagged.push({ ...r, flags });
      }
      all.push({ role: def.key, roleLabel: def.label, route, status, total: recs.length, flagged, consoleErrors });
      const marks = flagged.length ? ` ⚠ ${flagged.length}건` : '';
      console.log(`  ${status === 'OK' ? '·' : '✗'} ${route} → 클릭요소 ${recs.length}${marks}${consoleErrors.length ? ` | 콘솔오류 ${consoleErrors.length}` : ''}`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const file = path.join(OUT_DIR, `collect-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify({ base: BASE, at: new Date().toISOString(), pages: all }, null, 1));

  const tally = {};
  let totalEls = 0, totalFlagged = 0;
  all.forEach(p => { totalEls += p.total; p.flagged.forEach(f => { totalFlagged++; f.flags.forEach(fl => tally[fl] = (tally[fl] || 0) + 1); }); });
  console.log(`\n=== 요약 ===`);
  console.log(`화면 ${all.length} · 수집한 클릭요소 ${totalEls} · 표시된 요소 ${totalFlagged}`);
  Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log(`\n기록: ${file}`);
}
run().catch(e => { console.error(e); process.exit(1); });
