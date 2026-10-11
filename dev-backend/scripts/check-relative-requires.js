#!/usr/bin/env node
/**
 * check-relative-requires.js — 백엔드의 상대경로 require 가 전부 실제 파일을 가리키는지 (2026-10-11)
 * ------------------------------------------------------------------
 * 왜: 운영 배포는 이제 «마지막 커밋의 깨끗한 사본» 에서 나간다(scripts/make-clean-source.sh).
 *   그러면 새 실패 하나가 생긴다 — 커밋된 코드가 **아직 커밋 안 된 파일**을 require 하면,
 *   작업 폴더(개발 서버)에선 멀쩡한데 사본엔 그 파일이 없어 운영 백엔드가 기동 중 죽는다.
 *   프론트는 빌드가 «Module not found» 로 잡지만 백엔드엔 빌드가 없다 → 배포 전에 여기서 잡는다.
 *
 * 범위: 이 스크립트가 놓인 백엔드 폴더(= 사본에서 돌리면 사본)의 .js 전부.
 *   require('./x') · require('../x') 꼴의 **문자열 상수**만 본다(변수 경로는 못 본다 — 정직한 한계).
 *   node_modules · tests · logs · uploads · backups · tmp 는 제외. 운영에서 돌릴 코드를 문자열로 든
 *   파일 2개(EMBEDDED_REMOTE_CODE)는 제외 — 그 require 는 운영 폴더 기준이다.
 *
 * 사용: node scripts/check-relative-requires.js      # 0 = 전부 해석됨, 1 = 없는 파일 있음
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', 'tests', 'logs', 'uploads', 'backups', 'tmp', '.git']);
// 운영에 보내 실행할 코드를 **문자열(템플릿)로** 들고 있는 파일 — 그 안의 require 는 운영 폴더 기준이라 여기서 못 푼다.
const EMBEDDED_REMOTE_CODE = new Set(['scripts/create-release-post.js', 'scripts/sync-contents-to-prod.js']);
const RE = /require\(\s*(['"])(\.{1,2}\/[^'"]*)\1\s*\)/g;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const abs = path.join(dir, e.name);
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) walk(abs, out);
    else if (e.isFile() && e.name.endsWith('.js')) out.push(abs);
  }
}

function resolves(base) {
  const cands = [base, base + '.js', base + '.json', base + '.node', path.join(base, 'index.js'), path.join(base, 'index.json')];
  for (const c of cands) {
    try { if (fs.statSync(c).isFile()) return true; } catch { /* 없음 */ }
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(base, 'package.json'), 'utf8'));
    if (pkg.main && fs.existsSync(path.resolve(base, pkg.main))) return true;
  } catch { /* 없음 */ }
  return false;
}

const files = [];
walk(ROOT, files);
const missing = [];
for (const f of files) {
  if (EMBEDDED_REMOTE_CODE.has(path.relative(ROOT, f))) continue;
  const src = fs.readFileSync(f, 'utf8');
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(src))) {
    // 주석 줄은 건너뛴다 (예시 코드)
    const lineStart = src.lastIndexOf('\n', m.index) + 1;
    const lineHead = src.slice(lineStart, m.index).trim();
    if (lineHead.startsWith('//') || lineHead.startsWith('*')) continue;
    const target = path.resolve(path.dirname(f), m[2]);
    if (!resolves(target)) {
      const line = src.slice(0, m.index).split('\n').length;
      missing.push(`${path.relative(ROOT, f)}:${line} → ${m[2]}`);
    }
  }
}

if (missing.length) {
  console.error(`✗ 없는 파일을 불러오는 코드 ${missing.length}곳 (${files.length}개 파일 검사):`);
  missing.slice(0, 40).forEach((s) => console.error('  ' + s));
  console.error('  → 그 파일이 아직 커밋 안 됐으면, 커밋된 코드만 배포될 때 운영 백엔드가 기동 중 죽는다.');
  process.exit(1);
}
console.log(`✓ 상대경로 require 전부 해석됨 (${files.length}개 파일)`);
