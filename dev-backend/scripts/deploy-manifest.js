#!/usr/bin/env node
/**
 * deploy-manifest.js — "운영에 마지막으로 배포된 코드" 앵커 (model-agnostic 안전망)
 * ------------------------------------------------------------------
 * 문제: 이 repo 는 깔끔 커밋 없이 working tree 전체를 rsync 로 배포한다
 * ([[reference_selective_deploy_isolation]]). 그래서 "지금 dev 가 운영과 뭐가 다른가"를
 * 아는 방법이 사람(모델)의 기억뿐이었다. 이 스크립트가 배포 성공 시점의 소스 지문을
 * 남겨, 이후 어떤 세션/모델이든 `check-sensitive-diff.js` 로 배포 델타를 기계로 알 수 있게 한다.
 *
 * 사용법:
 *   node scripts/deploy-manifest.js --snapshot    # 배포 직후 자동 실행 (deploy-to-production.sh)
 *   node scripts/deploy-manifest.js --diff        # 현재 tree vs 마지막 배포 스냅샷 차이 목록
 *
 * 저장 위치: /var/www/.claude/deploy-manifest.json (운영 rsync 대상 밖 — dev 전용 기록)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '../..'); // /var/www
const MANIFEST = path.join(ROOT, '.claude', 'deploy-manifest.json');

// 배포 rsync 가 실제로 운영에 보내는 소스 범위와 일치시킨다 (deploy-to-production.sh 참조).
// dev-backend: --exclude node_modules/.env/uploads/*.log
// dev-frontend: build 산출물 대신 그 소스(src/public/scripts/package.json)를 추적
// desktop-pos: 피드 배포 소스 (node_modules/release 제외)
const SCOPES = [
  { base: 'dev-backend', exclude: /(^|\/)(node_modules|uploads|logs|\.git)(\/|$)|\.log$|^\.env/ },
  { base: 'dev-frontend/src', exclude: /(^|\/)\.git(\/|$)/ },
  { base: 'dev-frontend/public', exclude: /(^|\/)\.git(\/|$)/ },
  { base: 'dev-frontend/scripts', exclude: /(^|\/)(node_modules|\.git)(\/|$)/ },
  { base: 'desktop-pos', exclude: /(^|\/)(node_modules|release|dist|\.git)(\/|$)/ },
];
const ROOT_FILES = ['deploy-to-production.sh', 'CLAUDE.md', 'dev-frontend/package.json', 'dev-frontend/config-overrides.js'];

function walk(dir, exclude, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs);
    if (exclude && (exclude.test(rel) || exclude.test(e.name))) continue;
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) walk(abs, exclude, out);
    else if (e.isFile()) out.push(rel);
  }
}

function collectFiles() {
  const files = [];
  for (const s of SCOPES) {
    const abs = path.join(ROOT, s.base);
    if (fs.existsSync(abs)) walk(abs, s.exclude, files);
  }
  for (const rf of ROOT_FILES) {
    if (fs.existsSync(path.join(ROOT, rf)) && !files.includes(rf)) files.push(rf);
  }
  return files.sort();
}

function hashTree() {
  const map = {};
  for (const rel of collectFiles()) {
    try { map[rel] = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex'); }
    catch { /* 읽기 불가 파일은 스킵 */ }
  }
  return map;
}

function loadManifest() {
  try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch { return null; }
}

/** 현재 tree vs 마지막 배포 스냅샷. @returns {null | {changed:[], added:[], removed:[], snappedAt}} */
function diffAgainstLastDeploy() {
  const m = loadManifest();
  if (!m || !m.files) return null;
  const cur = hashTree();
  const changed = [], added = [], removed = [];
  for (const [rel, h] of Object.entries(cur)) {
    if (!(rel in m.files)) added.push(rel);
    else if (m.files[rel] !== h) changed.push(rel);
  }
  for (const rel of Object.keys(m.files)) if (!(rel in cur)) removed.push(rel);
  return { changed, added, removed, snappedAt: m.created_at };
}

module.exports = { hashTree, diffAgainstLastDeploy, loadManifest, MANIFEST };

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.includes('--snapshot')) {
    const files = hashTree();
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
    fs.writeFileSync(MANIFEST, JSON.stringify({
      note: '운영 배포 시점 소스 지문 — deploy-to-production.sh 성공 후 자동 기록. 수동 편집 금지.',
      created_at: new Date().toISOString(),
      file_count: Object.keys(files).length,
      files,
    }, null, 1) + '\n');
    console.log(`✓ 배포 스냅샷 기록: ${Object.keys(files).length}개 파일 → ${MANIFEST}`);
    process.exit(0);
  }
  // --diff (기본)
  const d = diffAgainstLastDeploy();
  if (!d) {
    console.log('⚠ 배포 스냅샷 없음 — 다음 /배포 성공 시 자동 생성됨. (지금 기준선을 만들려면: --snapshot 은 배포 직후에만)');
    process.exit(0);
  }
  console.log(`마지막 배포 스냅샷: ${d.snappedAt}`);
  console.log(`변경 ${d.changed.length} · 신규 ${d.added.length} · 삭제 ${d.removed.length}`);
  const show = (label, arr) => { if (arr.length) { console.log(`\n${label}:`); arr.slice(0, 60).forEach((f) => console.log('  ' + f)); if (arr.length > 60) console.log(`  … 외 ${arr.length - 60}개`); } };
  show('변경', d.changed); show('신규', d.added); show('삭제', d.removed);
  process.exit(0);
}
