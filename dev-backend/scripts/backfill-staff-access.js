/**
 * Backfill staff work-access keys (2026-06-03).
 *
 * 배경: 직원 접근을 주방/포스/서빙으로 분리(access_kitchen/access_pos/access_serving)하면서,
 * 기존 Staff 는 그동안 모든 운영 메뉴를 봤고 카운터 액션도 했다. 권한 키가 없으면 갑자기
 * 아무 화면도 못 보거나 결제가 막히는 회귀가 난다. → 기존 Staff 전원에게 **3개 접근 키 모두**
 * 부여(현 동작 100% 보존). 이전 `pos_counter` 보유분은 `access_pos` 로 치환(중복 제거).
 * 매장은 이후 직원 관리 화면에서 서빙/주방 전용으로 좁힌다.
 *
 * 멱등: 이미 3키 보유 시 건너뜀. --dry 로 미리보기.
 * 실행: node scripts/backfill-staff-access.js [--dry]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { User } = require('../models');

const DRY = process.argv.includes('--dry');
const ACCESS = ['access_pos', 'access_serving', 'access_kitchen'];

async function run() {
  await sequelize.authenticate();
  const staff = await User.findAll({ where: { role: 'Staff' } });
  let changed = 0, already = 0;

  for (const u of staff) {
    let perms = Array.isArray(u.permissions) ? [...u.permissions] : [];
    // 레거시 pos_counter → access_pos
    if (perms.includes('pos_counter')) perms = perms.filter(p => p !== 'pos_counter');
    const before = new Set(Array.isArray(u.permissions) ? u.permissions : []);
    // 3개 접근 키 보장(현 동작 보존)
    ACCESS.forEach(k => { if (!perms.includes(k)) perms.push(k); });
    // 변경 여부 판정
    const after = new Set(perms);
    const same = before.size === after.size && [...after].every(p => before.has(p));
    if (same) { already++; continue; }
    console.log(`  ~ user#${u.id} ${u.username || u.email || '(no-email)'} : [${[...before].join(',')}] → [${perms.join(',')}]`);
    if (!DRY) await u.update({ permissions: perms });
    changed++;
  }

  console.log(`\n${DRY ? '[DRY] ' : ''}Staff ${staff.length}명 — 갱신 ${changed} / 이미정상 ${already}`);
  await sequelize.close();
}

run().catch(e => { console.error('backfill 실패:', e); process.exit(1); });
