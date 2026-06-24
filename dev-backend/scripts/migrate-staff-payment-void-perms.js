/**
 * 2026-06-24 — access_pos 에서 결제(access_payment)·취소void(access_void) 권한 분리 하위호환 마이그레이션.
 *
 * 배경: 기존엔 access_pos 하나가 주문+결제+취소/void 를 모두 의미했다. 서버(홀) 역할을
 * 만들기 위해 결제/취소를 별도 키로 분리했으므로, 기존 access_pos 보유 직원이 결제·취소
 * 능력을 잃지 않도록 access_payment + access_void 를 함께 부여한다.
 *
 * 멱등: 이미 키가 있으면 건너뜀. 여러 번 돌려도 안전. Admin/RA/Owner 는 역할로 항상 허용이라
 * 대상 아님(permissions 배열은 Staff/RestaurantAdmin 직원에만 의미). access_pos 없는 직원
 * (서빙/주방 전용, 신규 서버)은 건드리지 않음 → 그들이 곧 "결제·취소 못하는" 역할이 된다.
 */
const { sequelize } = require('../config/database');
const User = require('../models/User');

async function run() {
  await sequelize.authenticate();
  // access_pos 를 가진 직원만 (permissions JSON 문자열에 포함)
  const users = await User.findAll({
    where: sequelize.where(
      sequelize.fn('JSON_SEARCH', sequelize.col('permissions'), 'one', 'access_pos'),
      { [require('sequelize').Op.ne]: null }
    ),
    attributes: ['id', 'full_name', 'role', 'permissions']
  });
  let changed = 0, skipped = 0;
  for (const u of users) {
    let perms = Array.isArray(u.permissions) ? [...u.permissions] : [];
    if (!perms.includes('access_pos')) { skipped++; continue; }
    let added = [];
    if (!perms.includes('access_payment')) { perms.push('access_payment'); added.push('access_payment'); }
    if (!perms.includes('access_void')) { perms.push('access_void'); added.push('access_void'); }
    if (added.length === 0) { skipped++; continue; }
    await u.update({ permissions: perms });
    changed++;
    console.log(`  +${added.join(',')} → #${u.id} ${u.full_name} (${u.role})`);
  }
  console.log(`\n✓ migrate-staff-payment-void complete: ${changed} granted, ${skipped} skipped (of ${users.length} access_pos staff). migrated`);
  await sequelize.close();
  process.exit(0);
}

run().catch(e => { console.error('마이그레이션 실패:', e.message); process.exit(1); });
