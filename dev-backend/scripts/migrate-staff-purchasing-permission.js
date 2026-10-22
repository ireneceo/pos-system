/**
 * 직원 «발주(purchasing)» 권한 백필 — 2026-10-22 Fable 설계 owner-supplier-management §3-C · Irene «권고대로»(컨펌 ②).
 *
 * 발주가 «Stock Management»(inventory) 에서 «Purchase Orders»(purchasing) 로 나뉘었다(middleware/buyerScope).
 * 오늘 발주하던 직원이 배포 다음 날 못 하면 안 되므로 inventory 를 가진 직원 권한에 purchasing 을 더한다.
 * 직원 권한이 사는 곳 3개: users.permissions(Staff 계정) · user_contexts.permissions(Staff 모자) ·
 * user_context_requests.permissions(대기 중 요청·초대 — 승인되면 이 값이 모자로 간다).
 *
 * 멱등: purchasing 이 이미 있으면 건드리지 않는다(두 번째 실행 0건). --dry-run 은 건수만 센다.
 * 사용: node scripts/migrate-staff-purchasing-permission.js [--dry-run]
 */
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

function parse(raw) {
  let v = raw;
  for (let i = 0; i < 5 && typeof v === 'string'; i++) {
    try { v = JSON.parse(v); } catch { return null; }
  }
  return Array.isArray(v) ? v.filter(x => typeof x === 'string') : null;
}

const TARGETS = [
  { table: 'users', where: "role = 'Staff'" },
  { table: 'user_contexts', where: "role = 'Staff'" },
  { table: 'user_context_requests', where: "status = 'pending'" },
];

(async () => {
  const summary = {};
  const t = DRY ? null : await sequelize.transaction();
  try {
    for (const { table, where } of TARGETS) {
      const [rows] = await sequelize.query(
        `SELECT id, permissions FROM ${table} WHERE ${where} AND permissions LIKE '%inventory%'`, { transaction: t });
      let n = 0;
      for (const r of rows) {
        const arr = parse(r.permissions);
        if (!arr || !arr.includes('inventory') || arr.includes('purchasing')) continue;
        n++;
        if (DRY) continue;
        const [res] = await sequelize.query(`UPDATE ${table} SET permissions = :p WHERE id = :id`,
          { replacements: { p: JSON.stringify([...arr, 'purchasing']), id: r.id }, transaction: t });
        if (res.affectedRows !== 1) throw new Error(`${table} #${r.id}: expected 1 row, got ${res.affectedRows}`);
      }
      summary[table] = n;
    }
    if (t) await t.commit();
    console.log(`[migrate-staff-purchasing-permission] ${DRY ? 'DRY-RUN ' : ''}added purchasing: ${JSON.stringify(summary)}`);
    process.exit(0);
  } catch (err) {
    if (t) await t.rollback();
    console.error('[migrate-staff-purchasing-permission] FAILED — rolled back:', err.message);
    process.exit(1);
  }
})();
