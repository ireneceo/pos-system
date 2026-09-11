/**
 * Migration: 발주 줄 «용량 · 포장단위 × 수량» (2026-09-11 · Fable 판정 · Irene 「권고대로 해」)
 *
 * 설계: docs/TRADE_STRUCTURE.md §2-2 «단위 다섯 칸» 을 판매 상품·발주 줄까지 연장.
 *
 * 무엇을 하나:
 *   1) supplier_products / brand_products / foodcourt_products
 *        package_unit VARCHAR(50) NULL — 기준단위(포장). 자유 문자열(BOX·Btl·PKT·Tin …)
 *   2) purchase_order_items
 *        base_quantity DECIMAL(10,2) NULL · base_unit VARCHAR(50) NULL — 주문 시점 용량 스냅샷
 *   3) 이행: 판매 상품 중 unit 칸에 pack/piece/bottle/can 이 들어 있고 base_quantity = 1 인 행은
 *      그 값이 사실상 포장단위이므로 **비어 있는 package_unit 에만** 복사한다. unit 칸은 건드리지 않는다.
 *
 * 왜 안전한가:
 *   - 전부 NULL 허용 추가 칸. 읽는 코드가 없으면 동작이 바뀌지 않는다(추가형).
 *   - 이행은 package_unit IS NULL 행만 — 사람이 넣은 값을 덮지 않는다. 매 배포 재실행 멱등.
 *   - 금액·수량·재고 환산(unit_conversion) 칸 무접촉. ENUM 아님. 컬럼 드롭 없음.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-seller-package-unit.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const SELLER_TABLES = ['supplier_products', 'brand_products', 'foodcourt_products'];
const PACK_LIKE = ['pack', 'piece', 'bottle', 'can'];

async function tableExists(t) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
    { replacements: { t } });
  return rows.length > 0;
}
async function columnExists(t, c) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t, c } });
  return rows.length > 0;
}
async function addColumn(t, c, ddl, after) {
  if (await columnExists(t, c)) { console.log(`  ✓ ${t}.${c} already exists — skip`); return; }
  const afterClause = after && await columnExists(t, after) ? ` AFTER \`${after}\`` : '';
  await sequelize.query(`ALTER TABLE \`${t}\` ADD COLUMN \`${c}\` ${ddl}${afterClause}`);
  console.log(`  ✓ ${t}.${c} 신설`);
}

(async () => {
  try {
    console.log('[migrate-seller-package-unit] Starting...');

    for (const t of SELLER_TABLES) {
      if (!(await tableExists(t))) { console.log(`  – ${t} 없음 — skip`); continue; }
      await addColumn(t, 'package_unit', 'VARCHAR(50) NULL', 'base_quantity');
    }

    if (await tableExists('purchase_order_items')) {
      await addColumn('purchase_order_items', 'base_quantity', 'DECIMAL(10,2) NULL', 'unit');
      await addColumn('purchase_order_items', 'base_unit', 'VARCHAR(50) NULL', 'base_quantity');
    }

    // 이행 — 빈 칸만. 전후 건수로 자가검증(unit 칸 무변화).
    for (const t of SELLER_TABLES) {
      if (!(await tableExists(t)) || !(await columnExists(t, 'package_unit'))) continue;
      const [[before]] = await sequelize.query(`SELECT COUNT(*) n, COALESCE(SUM(CRC32(COALESCE(unit,''))),0) h FROM \`${t}\``);
      const [res] = await sequelize.query(
        `UPDATE \`${t}\` SET package_unit = unit
          WHERE package_unit IS NULL AND base_quantity = 1 AND LOWER(TRIM(unit)) IN (:packLike)`,
        { replacements: { packLike: PACK_LIKE } });
      const [[after]] = await sequelize.query(`SELECT COUNT(*) n, COALESCE(SUM(CRC32(COALESCE(unit,''))),0) h FROM \`${t}\``);
      if (String(before.n) !== String(after.n) || String(before.h) !== String(after.h)) {
        throw new Error(`${t}: unit 칸이 바뀌었다 — 이행 중단 (${before.n}/${before.h} → ${after.n}/${after.h})`);
      }
      const changed = res && res.affectedRows !== undefined ? res.affectedRows : (res && res.changedRows) || 0;
      console.log(`  ✓ ${t}: package_unit ← unit (pack/piece/bottle/can · base_quantity=1 · 빈 칸만) ${changed}행`);
    }

    console.log('[migrate-seller-package-unit] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[migrate-seller-package-unit] FAILED:', err.message);
    process.exit(1);
  }
})();
