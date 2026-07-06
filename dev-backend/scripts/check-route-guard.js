#!/usr/bin/env node
/**
 * 🛡️ ROUTE GUARD — IDOR(cross-tenant) 정적 안전망
 * ------------------------------------------------------------------
 * 문서화된 규칙(메모리 reference_idor_sweep): `/restaurant/:param` 류 보호 라우트는
 * cross-tenant 유출을 막기 위해 매장 소유권 확인이 반드시 있어야 한다. v3.21에서 7개
 * 엔드포인트가 `authenticateToken` 만 있고 매장검사 누락으로 타매장 데이터가 샜다.
 *
 * 이 체커는 그 sweep 을 print-guard / design-guard 와 동일한 baseline 방식으로 상시화한다:
 * 기존(알려진) 상태는 baseline, **신규 무방비 라우트만 fail-closed**. health-check 의 라이브
 * 403 테스트가 1차 백스톱이고, 이건 배포 전에 잡는 2차 정적 그물이다.
 *
 * 판정: `/restaurant/:param` 라우트가 아래 중 하나라도 있으면 SAFE, 없으면 위반.
 *   ① 미들웨어: checkRestaurantAccess
 *   ② 미들웨어: requireRole('System Admin') / requireSystemAdmin / adminGuard  (SA=전매장 접근)
 *   ③ 핸들러 인라인: ensureRestaurant(...)  또는  (req.user.* restaurant_id + 403/Access denied/Forbidden)
 *      — 다수 라우트가 미들웨어 대신 핸들러서 직접 `req.user.restaurant_id !== restaurantId → 403`
 *        을 하는 정당한 패턴. 이걸 놓치면 naive sweep 처럼 오탐(현재 5건 전부 인라인검사 있음).
 *
 * 사용법:
 *   node scripts/check-route-guard.js           # 검사 — 신규 위반 시 exit 1
 *   node scripts/check-route-guard.js --bless    # 현재 상태를 baseline 으로 등록
 *   node scripts/check-route-guard.js --summary  # 요약만
 *
 * Exit: 0 = 신규 위반 0(안전), 1 = 신규 위반.
 *
 * ⚠️ 이 체커는 감지만 한다 — 🔒 인쇄 보호파일(orders-crud 등)을 수정하지 않는다.
 *
 * 스코프 한계(Fable B-2 — 명시):
 *   - 이 스캔은 **라우트 문자열에 literal `/restaurant/:` 를 가진 라우트**만 본다(약 40개).
 *   - `app.use('/api/restaurants', router)` / `app.use('/api/restaurant/:restaurantId', router)`
 *     처럼 **마운트 프리픽스**로 매장 스코프가 붙는 하위 라우터(inventory-core/extra,
 *     recommendations, restaurants-ingredients 등 45+ 라우트)는 라우트 문자열이 `/:restaurantId/…`
 *     라 이 정규식에 안 걸린다 = **미검사**. 그들은 현재 배럴 `router.use('/:restaurantId',
 *     checkRestaurantAccess)` 로 라우터 레벨 보호됨(실측). 이 체커는 그 배럴을 검증하지 않는다.
 *   - 즉 이 가드는 "직접 `/restaurant/:` 라우트"의 신규 무방비만 잡는 **부분 그물**이다.
 *     전 표면 계약검증은 health-check 의 라이브 403(1차 백스톱)이 담당.
 * 한계2: 정적 grep 휴리스틱이라 인라인검사를 특이 형태로 하면 false-SAFE 가능(안전측 실패). B-3 참조.
 */

const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.resolve(__dirname, '../routes');
const baselineFile = path.resolve(__dirname, 'route-guard-baseline.json');
const args = process.argv.slice(2);

// /restaurant/: 를 포함하는 라우트 정의를 찾는다. (:restaurantId / :rid / :id 등 모든 파라미터)
const ROUTE_RE = /router\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]*\/restaurant\/:[^'"`]*)['"`]\s*,([^\n]*)/g;

// 주석 제거 — 주석에만 restaurant_id/403 를 언급하고 실제 강제는 안 하는 false-SAFE 방지(Fable B-3 V1).
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

// 핸들러 본문(라우트 시작 ~ 다음 router. 정의 전)에서 인라인 매장검사 신호.
// ⚠️ 정적 휴리스틱 — false-SAFE 잔여(Fable B-3): req.user.restaurant_id 를 "읽기만"하고 비교 안 하거나
// 무관한 403 이 같은 body 에 있으면 통과할 수 있다. 진짜 계약검증은 health-check 라이브 403(1차 백스톱).
function bodyHasInlineOwnershipCheck(rawBody) {
  const body = stripComments(rawBody);
  if (/ensureRestaurant\s*\(/.test(body)) return true;
  if (/checkRestaurantAccess/.test(body)) return true;
  // req.user 의 restaurant_id 를 실제 비교(=/!==/!=/등)해 403/거부하는 패턴만 SAFE 로 인정.
  const comparesUserRid = /req\.user[^\n;]*restaurant_id[^\n;]*[!=<>]=|restaurant_id[^\n;]*[!=<>]=[^\n;]*req\.user/.test(body);
  const denies = /403|Access denied|Forbidden|권한\s*(없|거부)|접근\s*거부/.test(body);
  if (comparesUserRid && denies) return true;
  return false;
}

function middlewareIsSafe(mw) {
  if (/checkRestaurantAccess/.test(mw)) return true;
  if (/requireRole\(\s*['"`]System Admin['"`]/.test(mw)) return true;
  if (/requireSystemAdmin|adminGuard/.test(mw)) return true;
  return false;
}

function scanFile(file, text) {
  const violations = [];
  let m;
  ROUTE_RE.lastIndex = 0;
  while ((m = ROUTE_RE.exec(text)) !== null) {
    const routePath = m[2];
    const mw = m[3];
    // 핸들러 본문 = 이 매치 시작부터 다음 "router." 정의 직전까지(없으면 파일 끝).
    const startIdx = m.index;
    const nextRouter = text.indexOf('\nrouter.', startIdx + 1);
    const body = text.slice(startIdx, nextRouter === -1 ? undefined : nextRouter);
    if (middlewareIsSafe(mw) || bodyHasInlineOwnershipCheck(body)) continue;
    const line = text.slice(0, startIdx).split('\n').length;
    violations.push({ fp: `${path.basename(file)} ${routePath}`, line });
  }
  return violations;
}

// ── 스캔 ──
const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.js'));
let violations = [];
for (const f of files) {
  const full = path.join(ROUTES_DIR, f);
  let text; try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
  violations = violations.concat(scanFile(full, text));
}

let baseline = [];
try { baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8')); } catch {}
const baseSet = new Set(baseline);
const summary = args.includes('--summary');

console.log('🛡️ ROUTE GUARD — IDOR(cross-tenant) 정적 안전망');
console.log(`  스코프 검사(literal '/restaurant/:') 무방비 라우트: ${violations.length}건 (baseline: ${baseline.length})`);
if (!summary) {
  for (const v of violations) {
    const known = baseSet.has(v.fp) ? ' (baseline)' : '';
    console.log(`    ${v.fp}:${v.line}${known}`);
  }
}

if (args.includes('--bless')) {
  const fps = [...new Set(violations.map(v => v.fp))];
  fs.writeFileSync(baselineFile, JSON.stringify(fps, null, 0));
  console.log(`\n✓ baseline 등록: ${fps.length} 라우트. 이후 신규 무방비 라우트만 fail.`);
  process.exit(0);
}

// ── 판정 (--summary 여부와 무관하게 항상 실행 — fail-closed) ──
// ⚠️ Fable B-1 교훈: --summary 가 판정을 건너뛰고 exit 0 하면 게이트가 fail-open 이 된다.
// --summary 는 오직 위반 목록 출력만 억제하고, exit code 결정은 동일하게 수행한다.
const newOnes = violations.filter(v => !baseSet.has(v.fp));
if (newOnes.length > 0) {
  console.log(`\n✗ 신규 무방비 라우트 ${newOnes.length}건 — /restaurant/:param 에 checkRestaurantAccess 또는 인라인 매장검사(req.user.restaurant_id≠param→403) 필수. IDOR(타매장 유출) 위험. (정식/예외면 --bless)`);
  for (const v of newOnes) console.log(`    → ${v.fp}:${v.line}`);
  process.exit(1);
}
if (violations.length === 0) {
  console.log('\n✓ 스코프 검사 대상 라우트 전부 매장 소유권 검사 있음 (무방비 0).');
} else {
  console.log('\n✓ 신규 무방비 라우트 0 (기존 baseline 은 추적 대상).');
}
process.exit(0);
