/**
 * Migration: purchase_orders.status ENUM 에 'pending_approval' 추가.
 *
 * 배경 (2026-08-24 실측):
 *   오너 승인 게이트(utils/poOwnerApproval.js `applySubmitGate`)는 **매장 발주 + 그 매장에
 *   ownership 연결 + operation_settings.requirePoOwnerApproval !== false** 일 때 PO 를
 *   `status: 'pending_approval'` 로 쓴다. 그런데 **운영 ENUM 에 그 값이 없었다** —
 *   이 값을 추가하는 마이그레이션이 애초에 작성된 적이 없어서, 배포가 마이그 55/55 를 다 돌려도
 *   채워지지 않았다(스키마 비교에는 "type changes 1" 로만 뜨고 배포는 통과).
 *   sync-database 는 ENUM 을 안 바꾼다([[reference_deploy_schema_drift]]).
 *   → 그 조건의 매장이 발주를 제출하면 MySQL 이 값을 거부해 발주가 실패한다.
 *
 * 안전:
 *   - ENUM 에 **값을 추가만** 한다. 기존 값 순서·이름 유지, row 데이터 미수정, 컬럼 드롭 없음.
 *   - 멱등: 이미 있으면 skip. 재배포마다 재실행돼도 no-op.
 *   - 현재 ENUM 을 information_schema 에서 읽어 **거기에 더하는** 방식이라, 다른 곳에서 값이
 *     더 늘어나 있어도 그걸 지우지 않는다(목록 하드코딩 금지 — 그게 값을 날리는 사고의 원인).
 *   - 인쇄/주문 무관. process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-po-status-pending-approval.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const TABLE = 'purchase_orders';
const COLUMN = 'status';
const NEW_VALUE = 'pending_approval';
// 승인 대기는 제출 직후 상태다 — 'draft' 다음, 'submitted' 앞에 둔다(읽는 사람 기준 흐름 순서).
const INSERT_AFTER = 'draft';

/** 현재 ENUM 값 목록을 실제 스키마에서 읽는다(하드코딩 금지). */
async function readEnumValues() {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: TABLE, c: COLUMN } }
  );
  if (!rows.length) throw new Error(`${TABLE}.${COLUMN} not found`);
  const type = rows[0].COLUMN_TYPE; // enum('a','b',...)
  const inner = type.replace(/^enum\(/i, '').replace(/\)$/, '');
  // MySQL 은 ENUM 안의 홑따옴표를 '' 로 이스케이프한다
  return inner.split(',').map(v => v.trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'"));
}

/** 컬럼의 NULL 허용/기본값을 그대로 보존해 ALTER 를 만든다. */
async function readColumnMeta() {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM \`${TABLE}\` LIKE '${COLUMN}'`);
  if (!rows.length) throw new Error(`${TABLE}.${COLUMN} not found`);
  return { nullable: rows[0].Null === 'YES', dflt: rows[0].Default };
}

(async () => {
  try {
    console.log('[migrate-po-status-pending-approval] Starting...');

    const values = await readEnumValues();
    if (values.includes(NEW_VALUE)) {
      console.log(`  ✓ ${TABLE}.${COLUMN} already has '${NEW_VALUE}' — skip (${values.length} values)`);
      process.exit(0);
    }

    const meta = await readColumnMeta();
    const next = [...values];
    const at = next.indexOf(INSERT_AFTER);
    if (at >= 0) next.splice(at + 1, 0, NEW_VALUE);
    else next.push(NEW_VALUE);

    const enumList = next.map(v => `'${String(v).replace(/'/g, "''")}'`).join(',');
    const nullClause = meta.nullable ? 'NULL' : 'NOT NULL';
    const defaultClause = meta.dflt === null || meta.dflt === undefined
      ? '' : ` DEFAULT '${String(meta.dflt).replace(/'/g, "''")}'`;

    await sequelize.query(
      `ALTER TABLE \`${TABLE}\` MODIFY COLUMN \`${COLUMN}\` ENUM(${enumList}) ${nullClause}${defaultClause}`
    );

    const after = await readEnumValues();
    if (!after.includes(NEW_VALUE)) throw new Error(`ALTER ran but '${NEW_VALUE}' is still missing`);
    // 값이 사라지지 않았는지 확인 — 추가만 해야 한다
    const lost = values.filter(v => !after.includes(v));
    if (lost.length) throw new Error(`ENUM values lost: ${lost.join(', ')}`);

    console.log(`  ✓ '${NEW_VALUE}' added (${values.length} → ${after.length} values, none lost)`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
