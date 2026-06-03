/**
 * Backfill `pos_counter` capability for existing Staff (2026-06-03).
 *
 * 배경: 서빙 전용 뷰 도입으로 카운터 액션(결제/취소/void/현금박스/정산)을 `pos_counter`
 * 권한으로 게이트한다. **게이트 전에는 인증된 모든 Staff 가 카운터 액션을 할 수 있었으므로**,
 * 권한 없이 갑자기 차단되면 회귀다. → 기존 Staff 전원에게 `pos_counter` 를 자동 부여(현 동작
 * 100% 보존). 순수 서빙 직원은 이후 직원 관리 화면에서 토글을 명시적으로 끈다.
 *
 * 멱등: 이미 `pos_counter` 가 있으면 건너뜀. --dry 로 미리보기.
 * 실행: node scripts/backfill-pos-counter.js [--dry]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { User } = require('../models');

const DRY = process.argv.includes('--dry');

async function run() {
  await sequelize.authenticate();
  const staff = await User.findAll({ where: { role: 'Staff' } });
  let added = 0, already = 0;

  for (const u of staff) {
    const perms = Array.isArray(u.permissions) ? u.permissions : [];
    if (perms.includes('pos_counter')) { already++; continue; }
    // 게이트 전 모든 Staff 가 카운터 액션 가능했음 → 전원 부여(현 동작 보존). 서빙 전용은 이후 끈다.
    const next = [...perms, 'pos_counter'];
    console.log(`  + user#${u.id} ${u.username || u.email} : pos_counter 부여`);
    if (!DRY) await u.update({ permissions: next });
    added++;
  }

  console.log(`\n${DRY ? '[DRY] ' : ''}Staff ${staff.length}명 — 부여 ${added} / 이미보유 ${already}`);
  await sequelize.close();
}

run().catch(e => { console.error('backfill 실패:', e); process.exit(1); });
