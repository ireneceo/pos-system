#!/usr/bin/env node
/**
 * check-migration-registry.js — 마이그레이션 레지스트리 가드 (schema drift 방지)
 * ------------------------------------------------------------------
 * 문제: 배포 스크립트가 실행할 마이그레이션 목록이 deploy-to-production.sh 안에 하드코딩돼 있었다.
 * 새 migrate-*.js 를 만들고 그 목록에 넣는 걸 잊으면 → 운영 DB 스키마 드리프트
 * ([[reference_deploy_schema_drift]]: "DB 안 맞아 오류" 잦던 근본).
 *
 * 해결: scripts/migrations.registry.json 을 단일 소스로 삼는다.
 *   - `deploy`: 매 배포 재실행되는 멱등 마이그 목록(순서 = FK 의존성). 배포 스크립트가 이걸 읽어 실행.
 *   - `manual`: 일회성/레거시/의도적 제외. 각 항목에 이유 필수.
 * 이 가드는 디스크의 모든 마이그 파일이 둘 중 하나로 **분류돼 있는지** 검사한다.
 * 새 마이그가 미분류면 fail-closed → 작성자가 등록을 잊을 수 없다.
 *
 * 사용법:
 *   node scripts/check-migration-registry.js            # 검사 (미분류/유령/중복 시 exit 1)
 *   node scripts/check-migration-registry.js --list-deploy   # deploy 목록만 개행 출력 (배포 스크립트 소비용)
 *   node scripts/check-migration-registry.js --json
 *
 * 마이그 파일 명명 규칙(자동 발견 대상): migrate-*.js · YYYYMMDD_*.js · sprintN-*.js
 * (deploy 목록엔 이 규칙 밖의 멱등 배포 스크립트 — cleanup-*·register-*·promote-* — 도 포함될 수 있다.)
 */
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const REGISTRY = path.join(SCRIPTS_DIR, 'migrations.registry.json');

// 마이그레이션 "이름"으로 인식하는 파일 = 반드시 분류돼 있어야 하는 대상.
const MIGRATION_NAME = /^(migrate-.*|\d{8}_.*|sprint\d+.*)\.js$/;

function loadRegistry() {
  const r = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));
  return { deploy: r.deploy || [], manual: r.manual || {} };
}

function discoverMigrationFiles() {
  return fs.readdirSync(SCRIPTS_DIR).filter((f) => MIGRATION_NAME.test(f)).sort();
}

/** @returns {{ok, unclassified:[], dangling:[], duplicates:[], deployList:[]}} */
function check() {
  const { deploy, manual } = loadRegistry();
  const classified = new Set([...deploy, ...Object.keys(manual)]);
  const onDisk = new Set(fs.readdirSync(SCRIPTS_DIR));

  // 1) 미분류: 마이그 명명 파일인데 레지스트리에 없음 (드리프트 위험의 핵심)
  const unclassified = discoverMigrationFiles().filter((f) => !classified.has(f));

  // 2) 유령: 레지스트리에 있는데 파일이 없음
  const dangling = [...classified].filter((f) => !onDisk.has(f));

  // 3) 중복: deploy 와 manual 양쪽에, 또는 deploy 안에서 2번
  const seen = new Map();
  const duplicates = [];
  for (const f of deploy) { seen.set(f, (seen.get(f) || 0) + 1); }
  for (const [f, n] of seen) if (n > 1) duplicates.push(`${f} (deploy 목록 ${n}회)`);
  for (const f of Object.keys(manual)) if (deploy.includes(f)) duplicates.push(`${f} (deploy+manual 중복)`);

  return { ok: !unclassified.length && !dangling.length && !duplicates.length, unclassified, dangling, duplicates, deployList: deploy };
}

module.exports = { check, loadRegistry, discoverMigrationFiles, getDeployList: () => loadRegistry().deploy };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const r = check();

  if (argv.includes('--list-deploy')) {
    // 배포 스크립트가 소비: 검사 실패 시 목록을 내지 않아 배포가 빈 루프로 넘어가지 않게 exit 1
    if (!r.ok) { process.stderr.write('registry check failed — see check-migration-registry.js\n'); process.exit(1); }
    process.stdout.write(r.deployList.join('\n') + '\n');
    process.exit(0);
  }
  if (argv.includes('--json')) {
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.ok ? 0 : 1);
  }

  const c = { green: (s) => `\x1b[32m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`, gray: (s) => `\x1b[90m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m` };
  console.log(c.bold('\n🗄️ MIGRATION REGISTRY — 배포 마이그 단일 소스 무결성'));
  console.log(c.gray(`   deploy ${r.deployList.length}개 · manual ${Object.keys(loadRegistry().manual).length}개 · 디스크 마이그 ${discoverMigrationFiles().length}개`));

  if (r.ok) {
    console.log(c.green(c.bold('\n✓ 모든 마이그 파일이 분류됨 (미분류·유령·중복 0) — 드리프트 안전\n')));
    process.exit(0);
  }
  if (r.unclassified.length) {
    console.log(c.red(c.bold(`\n✗ 미분류 마이그 ${r.unclassified.length}건 — 배포목록 누락 위험(schema drift):`)));
    r.unclassified.forEach((f) => console.log(c.red(`   - ${f}`)));
    console.log(c.yellow('   → migrations.registry.json 의 "deploy"(매 배포 재실행·멱등 필수) 또는 "manual"(일회성/레거시, 이유 명시) 에 추가할 것.'));
  }
  if (r.dangling.length) {
    console.log(c.red(c.bold(`\n✗ 유령 항목 ${r.dangling.length}건 (레지스트리엔 있으나 파일 없음):`)));
    r.dangling.forEach((f) => console.log(c.red(`   - ${f}`)));
  }
  if (r.duplicates.length) {
    console.log(c.red(c.bold(`\n✗ 중복 ${r.duplicates.length}건:`)));
    r.duplicates.forEach((f) => console.log(c.red(`   - ${f}`)));
  }
  console.log('');
  process.exit(1);
}
