/**
 * Migration: products.takeaway_charge nullable
 *
 * v3.43 — per-item-individual UI를 Default + Override 패턴으로 전환.
 * - NULL = override 없음 (defaultPerItemCharge 사용)
 * - 숫자 (0 포함) = 명시적 override
 *
 * 이 스크립트:
 *  1) takeaway_charge 컬럼을 NULL 허용으로 변경
 *  2) 기존 0 값을 모두 NULL 로 변환 (default 0 마이그 흔적 — 의도된 override 아님)
 *
 * Idempotent — 재실행 안전.
 */
const db = require('../config/database');

(async () => {
  try {
    const [col] = await db.sequelize.query(
      "SHOW COLUMNS FROM products LIKE 'takeaway_charge'"
    );
    if (!col[0]) {
      console.log('✓ takeaway_charge column not found — nothing to migrate (skip)');
      await db.sequelize.close();
      return;
    }

    const isNullable = col[0].Null === 'YES';
    if (!isNullable) {
      await db.sequelize.query(
        'ALTER TABLE products MODIFY takeaway_charge DECIMAL(10,2) NULL DEFAULT NULL'
      );
      console.log('✓ ALTER TABLE products MODIFY takeaway_charge NULL — done');
    } else {
      console.log('✓ takeaway_charge already nullable — skip ALTER');
    }

    const [r] = await db.sequelize.query(
      'UPDATE products SET takeaway_charge = NULL WHERE takeaway_charge = 0'
    );
    console.log(`✓ Reset zero values to NULL — ${r.affectedRows ?? 0} rows`);

    const [cnt] = await db.sequelize.query(
      "SELECT COUNT(*) total, SUM(takeaway_charge IS NULL) nul, SUM(takeaway_charge > 0) positive FROM products"
    );
    console.log('📊 Distribution:', cnt[0]);

    console.log('Migration complete.');
    await db.sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('ERR:', e.message);
    process.exit(1);
  }
})();
