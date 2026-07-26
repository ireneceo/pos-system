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
 *     recommendations, restaurants-crud, restaurants-ingredients 등 45+ 라우트)는 라우트 문자열이
 *     `/:id` · `/:restaurantId/…` 라 이 정규식에 안 걸린다 = **미검사**.
 *
 *   ⚠ 2026-07-25 정정: 이전 주석은 "그들은 배럴 `router.use('/:restaurantId', checkRestaurantAccess)`
 *     로 라우터 레벨 보호됨(실측)" 이라고 적었으나 **사실과 다르다**. 그 배럴은 `inventory-core.js:46`
 *     **하나뿐**이고, `routes/restaurants.js` 배럴에는 스코프 가드가 없다. 그 잘못된 문장 때문에
 *     `/api/restaurants/:id` 표면이 "이미 안전"으로 넘어갔고, 실제로는 authenticateToken 만 달린 채
 *     아무 인증 계정이나 남의 매장 전 컬럼(payment_settings 의 게이트웨이 비밀키 포함)을 읽고
 *     PATCH /:id/status 로 임의 매장을 정지시킬 수 있었다(2026-07-25 수정).
 *     ⇒ 이 스캐너는 프리픽스 마운트 라우터를 **여전히 안 본다**. "미검사"를 "안전"으로 읽지 말 것.
 *     그 표면의 회귀는 health-check security 의 라이브 403 케이스가 잡는다(restaurants/:id,
 *     manager/:managerId, PATCH /:id/status, 익명 slug 축소 — 고장주입 3/3 검출 실증).
 *   - 즉 이 가드는 "직접 `/restaurant/:` 라우트"의 신규 무방비만 잡는 **부분 그물**이다.
 *     전 표면 계약검증은 health-check 의 라이브 403(1차 백스톱)이 담당.
 *
 *   ✅ 2026-07-26 해소: **패스 B 신설로 프리픽스 마운트 표면도 스캔한다**(아래 참조).
 *     그때 드러난 50건을 전수 라이브 실측(무관한 RA·BG·FG 3신원 × GET/POST/PUT/DELETE)한 결과:
 *       - 무관한 신원(다른 매장 RA)에게는 **전부 401/403** — 실제 유출 0.
 *       - 200 이 나온 건은 전부 **정당한 권한**이었다(BG=그 매장 브랜드 소유주 / FG=그 매장 oversight 배정).
 *       - 단, 이 보호의 실체는 `/api/restaurants/:rid/*` 를 지나가는 **inventory-core 배럴 가드가
 *         마운트 순서 덕에 우산처럼 덮는 것**이다(server.js 라인 순서 의존) = 구조적 취약.
 *         라우터 마운트 순서를 바꾸면 조용히 열릴 수 있으므로, 그 표면의 계약은 health-check
 *         라이브 403 케이스로 별도 고정해 두었다.
 *     ⇒ baseline 50건은 "측정으로 안전 확인됨(2026-07-26)" 상태의 기록이다. **신규는 fail.**
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
  if (/checkRestaurantAccess|requireRestaurantScope|userCanAccessRestaurant/.test(body)) return true;
  const denies = /403|Access denied|Forbidden|권한\s*(없|거부)|접근\s*거부/.test(body);
  if (!denies) return false;
  // req.user 의 restaurant_id 를 실제 비교(=/!==/!=/등)해 403/거부하는 패턴.
  const comparesUserRid = /req\.user[^\n;]*restaurant_id[^\n;]*[!=<>]=|restaurant_id[^\n;]*[!=<>]=[^\n;]*req\.user/.test(body);
  if (comparesUserRid) return true;
  // 2026-07-26 확장: 매장 스코프를 restaurant_id 비교가 아닌 **다른 정당한 신원 축**으로
  // 강제하는 라우트가 많다(실측 후 오탐 제거). 아래를 SAFE 로 인정한다:
  //   - System Admin 전용 인라인 검사   (예: restaurants-subscription restore/generate-invoice)
  //   - 소유 브랜드/푸드코트 대조        (예: DELETE /restaurants/:id — ownedBrandIds 포함 여부)
  //   - 호출자 자신(req.user.id)로 스코프 (예: owner claim/unclaim — manager_id: req.user.id)
  const saOnly = /req\.user[^\n;]*role[^\n;]*(!==|===|!=|==)[^\n;]*['"`]System Admin['"`]|['"`]System Admin['"`][^\n;]*(!==|===|!=|==)[^\n;]*req\.user[^\n;]*role/.test(body);
  if (saOnly) return true;
  const ownedEntity = /owned(Brand|Foodcourt)Ids|(brand|foodcourt)_id[^\n;]*(includes|indexOf|===|!==)/.test(body) &&
                      /req\.user[^\n;]*(id|brand_id|foodcourt_id)/.test(body);
  if (ownedEntity) return true;
  const selfScoped = /(manager_id|owner_id|user_id|admin_id)\s*:\s*req\.user\.id/.test(body);
  if (selfScoped) return true;
  return false;
}

function middlewareIsSafe(mw, fileText) {
  if (/checkRestaurantAccess/.test(mw)) return true;
  if (/requireRestaurantScope/.test(mw)) return true;   // 2026-07-25 신설 게이트(BG/FG 소유 폴백 포함)
  if (/requireRole\(\s*['"`]System Admin['"`]/.test(mw)) return true;
  if (/requireSystemAdmin|adminGuard/.test(mw)) return true;
  // spread 미들웨어 상수 해석 — `const common = [authenticateToken, checkRestaurantAccess, gate]`
  // 를 `router.get('/:restaurantId/x', ...common, handler)` 로 쓰는 패턴(ai-serving 등).
  // 이걸 못 읽으면 정당히 보호된 라우트가 오탐으로 잡힌다.
  if (fileText) {
    const spreads = mw.match(/\.\.\.(\w+)/g) || [];
    for (const s of spreads) {
      const name = s.slice(3);
      const def = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\[([^\\]]*)\\]`).exec(fileText);
      if (def && /checkRestaurantAccess|requireRestaurantScope/.test(def[1])) return true;
    }
    // 같은 파일에 정의된 **로컬 미들웨어 함수**를 1단계 따라간다.
    // 예: membership.js 의 `customerSelfOrAdmin` / `requireBodyRestaurantScope` 는 내부에서
    // userCanAccessRestaurant 로 매장 소유권을 확인한다. 이름만 보고 오탐하면 안 된다.
    const names = (mw.match(/\b([a-z][A-Za-z0-9_]*)\b/g) || []).filter((n) => !['async', 'req', 'res', 'next'].includes(n));
    for (const n of new Set(names)) {
      const fn = new RegExp(`(?:async\\s+)?function\\s+${n}\\s*\\(([\\s\\S]{0,2500}?)\\n\\}`).exec(fileText) ||
                 new RegExp(`(?:const|let|var)\\s+${n}\\s*=\\s*(?:async\\s*)?\\(?[^=]*=>([\\s\\S]{0,2500}?)\\n\\}`).exec(fileText);
      if (fn && /userCanAccessRestaurant|checkRestaurantAccess|requireRestaurantScope|ensureAdminRestaurantScope/.test(fn[1])) return true;
    }
  }
  return false;
}

// 파일 자체가 라우터 레벨로 매장 가드를 걸어 두었는지 (`router.use('/:restaurantId', checkRestaurantAccess)`)
function fileHasRouterLevelScopeGuard(text) {
  return /router\.use\(\s*['"`]\/:[\w]+(?:\/[\w-]+)?['"`]\s*,[^\n]*(checkRestaurantAccess|requireRestaurantScope)/.test(text);
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
    if (middlewareIsSafe(mw, text) || bodyHasInlineOwnershipCheck(body)) continue;
    const line = text.slice(0, startIdx).split('\n').length;
    violations.push({ fp: `${path.basename(file)} ${routePath}`, line });
  }
  return violations;
}

// ────────────────────────────────────────────────────────────────────────────
// 패스 B (2026-07-26 신설) — **프리픽스 마운트 표면**.
//
// 위 패스 A 는 라우트 문자열에 literal `/restaurant/:` 가 있는 것만 본다. 그런데
// 2026-07-25 사고가 난 표면은 `app.use('/api/restaurants', router)` 로 마운트돼 라우트
// 문자열이 `/:id` · `/:id/table-status` 라서 **스캐너가 아예 안 보던 곳**이었다
// (authenticateToken 만 달린 채 남의 매장 전 컬럼·게이트웨이 비밀키가 열려 있었음).
// 그 사각을 정적으로도 덮는다.
//
// 대상 선정(오탐 억제): 매장 스코프가 확실한 것만.
//   ① server.js 에서 `/api/restaurant(s)` 프리픽스로 마운트된 라우터 파일의,
//      **첫 세그먼트가 매장 파라미터**인 라우트 (`/:id`, `/:restaurantId`, `/:rid/...`)
//   ② 파일 위치와 무관하게 경로에 literal `:restaurantId` 가 들어간 라우트
// `/api/menu` 의 `/:id`(=상품) 같은 건 대상이 아니다 — 프리픽스가 매장이 아니므로.
// ────────────────────────────────────────────────────────────────────────────
const SERVER_FILE = path.resolve(__dirname, '../server.js');
const ROUTE_ANY_RE = /router\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]*)['"`]\s*,([^\n]*)/g;
const RID_PARAM = /^(id|rid|restaurantId|restaurant_id)$/;

function restaurantScopedMountFiles() {
  const files = new Set();
  let text; try { text = fs.readFileSync(SERVER_FILE, 'utf8'); } catch { return files; }
  const mountRe = /app\.use\(\s*['"`](\/api\/restaurants?[^'"`]*)['"`]\s*,[^\n]*require\(\s*['"`]\.\/routes\/([\w.-]+)['"`]/g;
  let m;
  while ((m = mountRe.exec(text)) !== null) {
    files.add(m[2].endsWith('.js') ? m[2] : `${m[2]}.js`);
  }
  return files;
}

// 배럴 라우터(routes/restaurants.js 처럼 하위 라우터를 다시 use 하는 파일)도 따라간다.
function expandBarrels(fileSet) {
  const out = new Set(fileSet);
  for (const f of fileSet) {
    let text; try { text = fs.readFileSync(path.join(ROUTES_DIR, f), 'utf8'); } catch { continue; }
    const re = /require\(\s*['"`]\.\/([\w.-]+)['"`]\s*\)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const child = m[1].endsWith('.js') ? m[1] : `${m[1]}.js`;
      if (fs.existsSync(path.join(ROUTES_DIR, child))) out.add(child);
    }
  }
  return out;
}

function scanFilePrefixMounted(file, text, isRestaurantMount) {
  const violations = [];
  let m;
  ROUTE_ANY_RE.lastIndex = 0;
  while ((m = ROUTE_ANY_RE.exec(text)) !== null) {
    const routePath = m[2];
    const mw = m[3];
    if (/\/restaurant\/:/.test(routePath)) continue; // 패스 A 담당 (중복 계상 방지)

    const segs = routePath.split('/').filter(Boolean);
    const firstIsRid = segs.length > 0 && segs[0].startsWith(':') && RID_PARAM.test(segs[0].slice(1));
    const hasRidParam = /:restaurant_?[iI]d\b/.test(routePath);
    const inScope = (isRestaurantMount && firstIsRid) || hasRidParam;
    if (!inScope) continue;

    const startIdx = m.index;
    const nextRouter = text.indexOf('\nrouter.', startIdx + 1);
    const body = text.slice(startIdx, nextRouter === -1 ? undefined : nextRouter);
    if (middlewareIsSafe(mw, text) || bodyHasInlineOwnershipCheck(body)) continue;

    // 라우터 레벨 배럴 가드(`router.use('/:restaurantId', checkRestaurantAccess)`)가 있으면 안전
    if (fileHasRouterLevelScopeGuard(text)) continue;

    const line = text.slice(0, startIdx).split('\n').length;
    violations.push({ fp: `[mount] ${path.basename(file)} ${routePath}`, line });
  }
  return violations;
}

// ── 스캔 ──
const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.js'));
const mountFiles = expandBarrels(restaurantScopedMountFiles());
let violations = [];
for (const f of files) {
  const full = path.join(ROUTES_DIR, f);
  let text; try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
  violations = violations.concat(scanFile(full, text));
  violations = violations.concat(scanFilePrefixMounted(full, text, mountFiles.has(f)));
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
