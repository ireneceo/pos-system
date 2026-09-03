/**
 * 배포 기록 적재 — `releases/<tag>.json` 을 운영 DB(deploy_records)에 넣는다.
 * 배포 스크립트가 **백엔드 재시작·헬스 확인 뒤** 실행한다.
 *
 * 실패는 fail-loud: 코드는 이미 나갔으므로 롤백이 아니라 **크게 알리고 수동 재적재**를 안내한다.
 * 멱등: 같은 tag 는 upsert(재배포·재실행해도 중복 행이 생기지 않는다).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { sequelize } = require('../config/database');
const { DeployRecord } = require('../models');

const file = process.argv[2];
if (!file) { console.error('사용법: node scripts/load-deploy-record.js <releases/xxx.json>'); process.exit(1); }

(async () => {
  try {
    const abs = path.isAbsolute(file) ? file : path.resolve(__dirname, '..', file);
    const rec = JSON.parse(fs.readFileSync(abs, 'utf8'));
    const tag = rec.tag || path.basename(abs, '.json');
    const v = rec.verification || {};

    let commit = null;
    try { commit = execSync('git rev-parse --short HEAD', { cwd: path.resolve(__dirname, '../..'), encoding: 'utf8' }).trim(); } catch { /* 배포본에 .git 이 없을 수 있다 */ }

    const sections = {
      in_progress: rec.in_progress, completed: rec.completed, issues: rec.issues,
      upcoming: rec.upcoming, behavior_changes: rec.behavior_changes,
      check_areas: rec.check_areas, verification: v,
    };
    const payload = {
      tag,
      deployed_at: new Date(),
      git_commit: commit,
      sw_version: v.sw_version || null,
      public_release: rec.public_release || null,
      sections,
      fable_note: v.fable_note || null,
      deployed_by: process.env.USER || null,
    };

    const existing = await DeployRecord.findOne({ where: { tag } });
    if (existing) { await existing.update(payload); console.log(`✓ 배포 기록 갱신: ${tag}`); }
    else { await DeployRecord.create(payload); console.log(`✓ 배포 기록 적재: ${tag}`); }

    const n = k => (sections[k] === 'none' ? 0 : (sections[k] || []).length);
    console.log(`  완료 ${n('completed')} · 이슈 ${n('issues')} · 앞으로 ${n('upcoming')} · 바뀌는현상 ${n('behavior_changes')} · 체크영역 ${n('check_areas')}`);
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('✗ 배포 기록 적재 실패:', e.message);
    console.error('  코드는 이미 배포됐습니다. 아래로 다시 적재하세요:');
    console.error(`    ssh <prod> "cd /var/www/production-backend && node scripts/load-deploy-record.js ${file}"`);
    await sequelize.close().catch(() => {});
    process.exit(1);
  }
})();
