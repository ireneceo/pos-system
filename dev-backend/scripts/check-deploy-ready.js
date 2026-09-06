#!/usr/bin/env node
/**
 * 배포 준비 상태 — **배포를 누르기 전에** 배포가 막힐 이유를 전부 한 번에 보여준다.
 *
 * 왜 만들었나 (Irene 2026-09-04: "자꾸 배포 실패하는데 케이스 정리해서 다시 이런 일 없게 해야지"):
 *   배포 스크립트의 10번째 게이트(배포 기록)는 **파일 하나 읽는 정적 검사**인데 **맨 마지막**에 돈다.
 *   앞 9개(인쇄 계약·디자인·IDOR·health-check·인쇄 라우트 33초 …)를 다 돌고 42초 뒤에야
 *   "JSON 파일이 없습니다" 를 알려준다. 고치고 다시 돌리면 또 42초. 오늘 이것만 반복했다.
 *
 *   더 나쁜 것은 **한 번에 하나씩만** 알려준다는 것이다. 실제로 겪은 순서(2026-09-03~04):
 *     ① 기록 파일 없음 → 만들었더니
 *     ② verification.fable_note 없음 → 넣었더니
 *     ③ verification.sw_version 없음(SW 미상승) → 올렸더니
 *     ④ 스키마 차이 확인 프롬프트에서 조용히 취소(백그라운드 실행이라 EOF) → --auto 필요
 *     ⑤ 다음 배포에서 ① 재발
 *   전부 **배포를 눌러야만 알 수 있는 것들**이었다. 그게 문제의 본질이다.
 *
 * 이 스크립트는 그 정적 조건을 **전부 모아 한 번에** 검사한다. 실패해도 첫 항목에서 멈추지 않고
 * 끝까지 본 뒤 목록으로 보여준다 — 왕복을 없애는 것이 목적이라 조기 종료가 오히려 해롭다.
 *
 * 어디서 도는가:
 *   - `verify-all` 에 포함 → **개발완료 시점**에 걸린다(배포 며칠 전).
 *   - 배포 직전 수동: `node scripts/check-deploy-ready.js`
 *
 * 이 검사가 통과했다고 배포가 보장되는 것은 아니다 — 인쇄/디자인/health 같은 **동적** 게이트는
 * 그대로 배포 스크립트가 본다. 여기서 잡는 것은 "눌러봐야 아는 정적 산출물" 뿐이다.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const REPO = path.resolve(ROOT, '..');
const REL_DIR = path.join(ROOT, 'releases');
const SW_PATH = path.resolve(REPO, 'dev-frontend/public/sw.js');
const MANIFEST = path.resolve(REPO, '.claude/deploy-manifest.json');

const c = {
  red: s => `\x1b[31m${s}\x1b[0m`, green: s => `\x1b[32m${s}\x1b[0m`,
  gray: s => `\x1b[90m${s}\x1b[0m`, yellow: s => `\x1b[33m${s}\x1b[0m`, bold: s => `\x1b[1m${s}\x1b[0m`,
};

const problems = [];   // 배포를 막을 것
const notes = [];      // 알아두면 좋은 것(막지 않음)
const add = (what, how) => problems.push({ what, how });

const sh = (cmd) => { try { return execSync(cmd, { cwd: REPO, encoding: 'utf8' }).trim(); } catch { return ''; } };

// ── ① 배포 기록 파일 (게이트 10 이 보는 것과 같은 규칙) ──────────────────
const REQUIRED = ['in_progress', 'completed', 'issues', 'upcoming', 'behavior_changes', 'check_areas', 'verification'];
const LABEL = {
  in_progress: '작업중', completed: '완료', issues: '이슈', upcoming: '앞으로 할 것',
  behavior_changes: '변경 후 바뀌는 현상', check_areas: '추가로 체크할 영역', verification: '검증 내역',
};
let rec = null, recFile = null;
if (!fs.existsSync(REL_DIR)) {
  add('배포 기록 폴더(releases/)가 없습니다', 'dev-backend/releases/<날짜>-<태그>.json 을 만드세요.');
} else {
  const files = fs.readdirSync(REL_DIR).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    add('이번 배포의 기록 파일이 없습니다',
      `dev-backend/releases/${new Date().toISOString().slice(0, 10)}-<태그>.json 에 7칸(${REQUIRED.join(', ')})을 채우세요. 지난 기록은 releases/archive/ 에 있으니 형식은 거기서 보세요.`);
  } else if (files.length > 1) {
    add(`기록 파일이 ${files.length}개 — 어느 배포인지 모호합니다`, `발견: ${files.join(', ')} / 이미 나간 기록은 releases/archive/ 로 옮기세요.`);
  } else {
    recFile = files[0];
    try {
      rec = JSON.parse(fs.readFileSync(path.join(REL_DIR, recFile), 'utf8'));
    } catch (e) {
      add(`기록 파일 JSON 오류: ${recFile}`, e.message);
    }
  }
}

if (rec) {
  for (const k of REQUIRED) {
    const v = rec[k];
    if (v === undefined || v === null) { add(`기록에 '${LABEL[k]}'(${k}) 칸이 없습니다`, '없으면 "none" 이라고 명시하세요.'); continue; }
    if (v === 'none') continue;
    if (Array.isArray(v) && v.length === 0) add(`기록의 '${LABEL[k]}'(${k}) 가 빈 배열입니다`, '없으면 "none" 이라고 적으세요 — 빈 배열은 "안 적었다"와 구분되지 않습니다.');
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) add(`기록의 '${LABEL[k]}'(${k}) 가 빈 객체입니다`, '내용을 채우세요.');
  }
}

// ── ② 민감 변경이면 Fable 판정 기록 필요 ────────────────────────────────
// ⚠ 배포 델타의 단일 소스는 `check-sensitive-diff.js` 다. 그 스크립트가
//   운영 배포 스냅샷(.claude/deploy-manifest.json, **파일 지문** 목록 — 커밋 해시가 아니다)과
//   git working 을 합쳐 변경 파일을 뽑는다. 여기서 따로 git 으로 재려 하면
//   manifest 에 commit 필드가 없어 미커밋 변경만 보이고 **프론트 변경을 통째로 놓친다**
//   (2026-09-04 실측: 프론트를 고쳤는데 "변경 없음" 으로 나왔다).
let sensitive = false;
let deltaOut = '';
try {
  deltaOut = execSync(`node ${path.join(ROOT, 'scripts/check-sensitive-diff.js')} 2>&1 || true`, { cwd: ROOT, encoding: 'utf8' });
  sensitive = /FABLE 게이트 대상/.test(deltaOut);
} catch { notes.push('민감영역 판정을 실행하지 못했습니다 — 배포 스크립트가 다시 봅니다.'); }

if (rec) {
  const v = rec.verification || {};
  if (sensitive && !v.fable_note) {
    add('민감 영역(돈·보안·스키마·🔒보호파일) 변경인데 기록에 verification.fable_note 가 없습니다',
      'Fable 판정 요지를 기록의 verification.fable_note 에 넣으세요. 이건 배포 게이트가 막습니다.');
  }
  if (!sensitive && !v.fable_note) {
    notes.push('민감 변경이 아니라 fable_note 는 필수가 아닙니다.');
  }
}

// ── ③ 프론트가 바뀌었으면 SW 버전 상승 + 기록과 일치 ─────────────────────
const swSrc = fs.existsSync(SW_PATH) ? fs.readFileSync(SW_PATH, 'utf8') : '';
const swNow = (swSrc.match(/const SW_VERSION\s*=\s*['"]([^'"]+)['"]/) || [])[1] || null;

// 델타에 프론트가 있는가 — **파일 내용 지문**으로 판정한다 (2026-09-05).
// ⚠ `check-sensitive-diff` 출력은 못 쓴다 — 민감 카테고리만 파일명을 찍고 나머지는 "일반 변경 N건"
//   이라 프론트 파일이 이름으로 안 나온다(2026-09-04 실측: 프론트를 고쳤는데 "변경 없음").
// ⛔ **커밋 시각 기준도 못 쓴다** (2026-09-05 실측 — 이게 직전 방식이었고 오탐을 냈다):
//   배포된 것은 그 시점의 **워킹트리**지 커밋이 아니다. 배포 기록 커밋은 스냅샷보다 **뒤에** 찍히므로
//   (v3.84: 스냅샷 18:39:53 · 커밋 9dbc6ae27 18:42:26) `스냅샷 직전 커밋 → HEAD` 에
//   **이미 운영에 올라간 프론트 파일이 통째로 들어온다.** 그러면 백엔드만 고친 다음 배포마다
//   "SW 를 올려라"가 뜬다. 시각으로는 못 고친다 — 커밋을 기록해도 그 시점 HEAD 가 여전히 기록 커밋 이전이다.
//   그래서 스냅샷이 이미 갖고 있는 **파일별 sha256**(`manifest.files`, dev-frontend/src·public 포함
//   — 배포 rsync 범위와 같은 목록)과 **현재 트리의 같은 해시**를 비교한다. 커밋 여부와 무관하다.
// ⚠ `dev-frontend/` 아래라고 **다 번들에 들어가는 건 아니다**(2026-09-06). Playwright 스펙
//   (`dev-frontend/e2e/`)은 테스트 파일이라 빌드 산출물에 포함되지 않는데도 "프론트 변경"으로
//   잡혀 SW 버전을 올리라고 했다 — 올리면 전 매장이 이유 없이 번들을 다시 받는다.
//   09-05 에 "커밋 시각 → 파일 내용 지문"으로 고친 것과 같은 부류(판정 기준이 실제와 다름)다.
//   ⛔ 좁히는 건 최소로 — 빌드에 확실히 안 들어가는 것만 뺀다. 애매하면 프론트 변경으로 본다.
const NON_BUNDLE_FRONT = /^dev-frontend\/e2e\//;
const isFrontBundle = (f) => f.startsWith('dev-frontend/') && !NON_BUNDLE_FRONT.test(f);
let frontendChanged = sh('git status --porcelain')
  .split('\n')
  .map((l) => l.slice(3).trim())          // "?? path" / " M path" → path
  .filter(Boolean)
  .some(isFrontBundle);
if (!frontendChanged) {
  try {
    const { diffAgainstLastDeploy } = require('./deploy-manifest');
    const d = diffAgainstLastDeploy();
    if (d) {
      frontendChanged = [...d.changed, ...d.added, ...d.removed].some(isFrontBundle);
    } else {
      notes.push('배포 스냅샷(.claude/deploy-manifest.json)이 없어 프론트 변경 판정이 미커밋 기준뿐입니다.');
    }
  } catch (e) { notes.push('프론트 변경 판정 중 오류 — 배포 스크립트가 다시 봅니다: ' + e.message); }
}

if (!swNow) {
  add('sw.js 에서 SW_VERSION 을 못 읽었습니다', `${SW_PATH} 의 const SW_VERSION 을 확인하세요.`);
} else if (frontendChanged) {
  if (rec && rec.verification && rec.verification.sw_version !== swNow) {
    add(`기록의 sw_version 과 실제 sw.js 가 다릅니다 (기록 "${(rec.verification || {}).sw_version || '없음'}" ≠ 실제 "${swNow}")`,
      '프론트가 바뀐 배포는 SW 버전을 올리고, 같은 값을 기록의 verification.sw_version 에 적어야 합니다. 안 올리면 매장이 옛 번들을 계속 씁니다.');
  }
  // 이전 배포와 같은 값이면 안 올린 것이다.
  // 배포 스냅샷에는 sw_version 이 없으므로(파일 지문만 있다) **직전 배포 기록**에서 읽는다.
  try {
    const ARCH = path.join(REL_DIR, 'archive');
    if (fs.existsSync(ARCH)) {
      const past = fs.readdirSync(ARCH).filter(f => f.endsWith('.json')).sort();
      const last = past[past.length - 1];
      if (last) {
        const prev = (JSON.parse(fs.readFileSync(path.join(ARCH, last), 'utf8')).verification || {}).sw_version;
        if (prev && prev === swNow) {
          add(`SW 버전이 지난 배포(${last})와 같습니다 ("${swNow}")`,
            '프론트가 바뀌었으니 올리세요 — 안 올리면 매장 브라우저가 옛 번들을 계속 씁니다(SW 캐시).');
        }
      }
    }
  } catch { /* 지난 기록을 못 읽으면 건너뛴다 — 기록↔실제 일치 검사는 위에서 이미 한다 */ }
} else {
  notes.push('프론트 변경이 없어 SW 버전 상승은 필요하지 않습니다.');
}

// ── ④ 마이그레이션 레지스트리 ──────────────────────────────────────────
try {
  execSync(`node ${path.join(ROOT, 'scripts/check-migration-registry.js')}`, { cwd: ROOT, stdio: 'pipe' });
} catch {
  add('마이그레이션이 레지스트리에 분류되지 않았습니다',
    'scripts/migrations.registry.json 의 deploy(매 배포 재실행·멱등) 또는 manual(일회성·이유 명시) 에 넣으세요. 자세한 것은 `node scripts/check-migration-registry.js`.');
}

// ── ⑤ 새 마이그레이션이 인자 없이 실행돼도 실제로 적용되는가 ──────────────
// 배포 루프는 레지스트리의 deploy 목록을 `node <파일>` 로 **인자 없이** 실행한다.
// 기본이 드라이런인 스크립트를 deploy 로 등록하면 운영에서 아무 일도 안 하고 "성공" 으로 끝난다.
// 2026-09-04 실제로 그 상태로 배포 직전까지 갔다(Fable 이 잡음) — 컬럼이 안 생긴 채 재시작하면
// 모델에 그 컬럼이 있어 전 조회가 Unknown column 으로 죽는다(POS·모바일 전면 장애).
try {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/migrations.registry.json'), 'utf8'));
  for (const f of (reg.deploy || [])) {
    const p = path.join(ROOT, 'scripts', f);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    // "--apply 가 있어야 적용" 형태 = 인자 없이 돌리면 드라이런
    if (/includes\(['"]--apply['"]\)/.test(src) && !/!process\.argv\.includes/.test(src)) {
      add(`배포 마이그 '${f}' 는 --apply 가 있어야 적용됩니다 — 배포는 인자 없이 실행합니다`,
        "기본을 적용으로 바꾸고 미리보기를 --dry-run 으로 뒤집으세요: `const APPLY = !process.argv.includes('--dry-run')`.");
    }
    if (!/process\.exit\(/.test(src)) {
      notes.push(`마이그 '${f}' 에 process.exit 가 없습니다 — DB 연결이 남아 배포가 멈출 수 있습니다.`);
    }
  }
} catch { /* 레지스트리를 못 읽으면 ④ 가 이미 잡는다 */ }

// ── ⑤-2 배포 마이그를 **dev DB 에서 실제로 돌려 본다** ─────────────────────
// 정적 검사(⑤)는 "인자 없이 적용되는가 / process.exit 이 있는가" 만 본다. 그건 **실행이 아니다.**
// 2026-09-05 실제 사고: `migrate-backfill-unit-cost.js` 가 `supplier_products`(utf8mb4_0900_ai_ci)와
//   `product_ingredients`(utf8mb4_unicode_ci)를 비교해 `Illegal mix of collations` 로 **매번 즉사**하고
//   있었다. deploy 목록에 등록돼 있었고 ⑤ 를 통과했다 — 한 번도 실행된 적이 없어서다.
// deploy 마이그는 멱등이 규칙이므로 dev 에서 먼저 돌리는 것이 엄격히 더 안전하다.
// 매번 76개를 다 돌리면 게이트가 못 쓸 만큼 느려지므로 **내용이 바뀐 것만** 돌리고 통과를 기억한다.
//   (전수 강제는 `--all-migrations`. 배포 스크립트는 어차피 운영에서 전수를 돈다.)
const MIG_TIMEOUT_MS = 180000;
// 배포 스크립트는 이 검사만 따로, **전수로** 부른다 (`--migrations-only --all-migrations`).
//   개발 루프(verify-all)는 바뀐 것만 돌려 빠르게, 배포는 76개 25초를 아끼지 않는다.
const MIG_ONLY = process.argv.includes('--migrations-only');
const migCachePath = path.join(ROOT, '.deploy-migration-run.json');
try {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/migrations.registry.json'), 'utf8'));
  const forceAll = process.argv.includes('--all-migrations');
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(migCachePath, 'utf8')); } catch { cache = {}; }
  const crypto = require('crypto');
  let ran = 0, skipped = 0;
  for (const f of (reg.deploy || [])) {
    const p2 = path.join(ROOT, 'scripts', f);
    if (!fs.existsSync(p2)) continue;
    const h = crypto.createHash('sha256').update(fs.readFileSync(p2)).digest('hex');
    if (!forceAll && cache[f] === h) { skipped += 1; continue; }
    try {
      execSync(`node ${JSON.stringify(p2)}`, { cwd: ROOT, stdio: 'pipe', timeout: MIG_TIMEOUT_MS });
      cache[f] = h;
      ran += 1;
    } catch (e) {
      const out = String((e.stdout || '') + (e.stderr || '')).trim().split('\n').slice(-6).join('\n   ');
      delete cache[f];
      add(`배포 마이그 '${f}' 가 dev 에서 실행 실패했습니다 — 운영에서도 같은 자리에서 죽습니다`,
        `직접 돌려 원인을 보세요: \`node scripts/${f}\`\n   마지막 출력:\n   ${out || '(출력 없음)'}`);
    }
  }
  try { fs.writeFileSync(migCachePath, JSON.stringify(cache, null, 2)); } catch { /* 캐시는 없어도 된다 */ }
  if (ran || forceAll) notes.push(`배포 마이그 실행: 새로/바뀐 것 ${ran}개 실행 · ${skipped}개 변경 없음(기억된 통과)`);
  if (MIG_ONLY) {
    const migFails = problems.filter((b) => /배포 마이그/.test(b.what));
    if (migFails.length) {
      console.error(c.red(`\n❌ 배포 마이그 ${migFails.length}개가 dev 에서 실행 실패했습니다 — 운영에서도 같은 자리에서 죽습니다\n`));
      migFails.forEach((b) => console.error(`   · ${b.what}\n     ${b.how}`));
      process.exit(1);
    }
    console.log(`✓ 배포 마이그 실전 실행 통과 — 실행 ${ran}개 · 기억된 통과 ${skipped}개`);
    process.exit(0);
  }
} catch { /* 레지스트리를 못 읽으면 ④ 가 이미 잡는다 */ }

// ── ⑥ 커밋 상태 ────────────────────────────────────────────────────────
const dirty = sh('git status --porcelain');
if (dirty) {
  notes.push(`미커밋 변경 ${dirty.split('\n').length}건 — 배포는 워킹트리를 그대로 올립니다(커밋 여부와 무관). 다만 Fable 게이트 마커는 트리가 바뀌면 무효가 됩니다.`);
}

// ── 출력 ───────────────────────────────────────────────────────────────
console.log(c.bold('\n🚀 배포 준비 상태 — 배포를 누르기 전에 막힐 것을 미리 본다\n'));
if (recFile) console.log(c.gray(`   기록 파일: releases/${recFile}`));
console.log(c.gray(`   SW 버전  : ${swNow || '(못 읽음)'}${frontendChanged ? ' · 프론트 변경 있음' : ' · 프론트 변경 없음'}`));
console.log(c.gray(`   민감 판정: ${sensitive ? 'Fable 게이트 대상' : '일반 변경'}`));
console.log('');

if (problems.length === 0) {
  notes.forEach(n => console.log(c.gray(`   · ${n}`)));
  console.log(c.green(c.bold('\n✓ 정적 준비 완료 — 배포가 이것 때문에 막히지 않습니다.')));
  console.log(c.gray('  (인쇄·디자인·health-check 같은 동적 게이트는 배포 스크립트가 봅니다)\n'));
  process.exit(0);
}

console.log(c.red(c.bold(`✗ 배포가 막힐 것 ${problems.length}건 — 지금 다 고치면 왕복이 없습니다\n`)));
problems.forEach((p, i) => {
  console.log(c.red(`  ${i + 1}. ${p.what}`));
  console.log(c.gray(`     → ${p.how}`));
});
if (notes.length) {
  console.log('');
  notes.forEach(n => console.log(c.gray(`   · ${n}`)));
}
console.log('');
process.exit(1);
