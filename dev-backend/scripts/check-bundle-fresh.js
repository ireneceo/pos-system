#!/usr/bin/env node
/**
 * 🧱 번들 신선도 — 프론트 소스가 서빙 번들보다 새로우면 실패한다.
 *
 * 왜 있는가 (2026-09-06·09-07 같은 사고 두 번):
 *   빌드가 실패했는데(폴더를 잘못 잡거나 메모리 게이트에 막혀서) mount sweep 은
 *   "번들 지문이 직전과 같다"며 캐시를 재사용해 **18/18 통과**를 냈다.
 *   프론트 수정을 한 번도 검증하지 않은 채 통과로 보인 것이다.
 *   sweep 캐시는 번들 내용만 보므로, "빌드가 아예 안 돌았다"를 스스로 알 수 없다.
 *   그 구멍을 이 게이트가 막는다 — 소스가 번들보다 새로우면 fail-closed.
 *
 * ⛔ 이 게이트를 통과시키려고 파일 시각을 만지지 말 것. 답은 빌드를 다시 도는 것이다.
 */
const fs = require('fs');
const path = require('path');

const BUILD = '/var/www/dev-frontend-build';
const SRC_ROOTS = ['/var/www/dev-frontend/src', '/var/www/dev-frontend/public'];
const SKIP_DIR = new Set(['node_modules', '.git', 'build']);

function newestIn(root) {
  let newest = { mtime: 0, file: null };
  const walk = (dir) => {
    let ents;
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) { if (!SKIP_DIR.has(e.name)) walk(path.join(dir, e.name)); continue; }
      const f = path.join(dir, e.name);
      let st; try { st = fs.statSync(f); } catch { continue; }
      if (st.mtimeMs > newest.mtime) newest = { mtime: st.mtimeMs, file: f };
    }
  };
  walk(root);
  return newest;
}

function bundleTime() {
  try {
    const jsDir = path.join(BUILD, 'static', 'js');
    const js = fs.readdirSync(jsDir).filter(f => /^main\..*\.js$/.test(f));
    if (!js.length) return null;
    let newest = 0, file = null;
    for (const f of js.concat([])) {
      const st = fs.statSync(path.join(jsDir, f));
      if (st.mtimeMs > newest) { newest = st.mtimeMs; file = f; }
    }
    return { mtime: newest, file };
  } catch { return null; }
}

const b = bundleTime();
if (!b) {
  console.error('✗ 서빙 번들을 찾을 수 없습니다 (/var/www/dev-frontend-build/static/js/main.*.js)');
  console.error('  → cd /var/www/dev-frontend && npm run build:dev');
  process.exit(1);
}

const stale = [];
for (const root of SRC_ROOTS) {
  const n = newestIn(root);
  if (n.file && n.mtime > b.mtime + 1000) stale.push(n);   // 1초 여유(빌드 중 복사 오차)
}

const fmt = (ms) => new Date(ms).toISOString().replace('T', ' ').slice(0, 19);

if (stale.length) {
  console.error(`✗ 프론트 소스가 서빙 번들보다 새롭습니다 — 빌드가 안 돌았거나 실패했습니다.`);
  console.error(`   번들 : ${b.file}  (${fmt(b.mtime)})`);
  for (const s of stale) console.error(`   소스 : ${s.file}  (${fmt(s.mtime)})`);
  console.error(`   → cd /var/www/dev-frontend && npm run build:dev  후 다시 실행하세요.`);
  console.error(`   (빌드가 메모리 게이트에 막히면 기다립니다 — 우회하지 않습니다.)`);
  process.exit(1);
}

console.log(`✓ 번들 신선도 OK — ${b.file} (${fmt(b.mtime)}) 가 프론트 소스보다 최신`);
process.exit(0);
