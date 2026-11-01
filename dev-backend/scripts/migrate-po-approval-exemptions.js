/**
 * 오너 발주 승인 예외 규칙 표 — 2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7-3.
 * 멱등: CREATE TABLE IF NOT EXISTS · 색인은 있는지 보고 더한다 · 기존 ENUM 무접촉.
 * 사용: node scripts/migrate-po-approval-exemptions.js
 */
const { sequelize } = require('../config/database');

async function hasIndex(table, name) {
  const [r] = await sequelize.query(
    'SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?',
    { replacements: [table, name] });
  return r.length > 0;
}

(async () => {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS po_approval_exemptions (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        scope ENUM('seller','ingredient_category','ingredient','product') NOT NULL,
        seller_type ENUM('none','system_admin','brand','foodcourt','supplier') NOT NULL DEFAULT 'none',
        target_id INT NOT NULL,
        note VARCHAR(255) NULL,
        created_by_user_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        INDEX po_approval_exemptions_restaurant_id (restaurant_id),
        UNIQUE KEY uq_po_approval_exemption (restaurant_id, scope, seller_type, target_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    if (!(await hasIndex('po_approval_exemptions', 'uq_po_approval_exemption'))) {
      await sequelize.query('ALTER TABLE po_approval_exemptions ADD UNIQUE KEY uq_po_approval_exemption (restaurant_id, scope, seller_type, target_id)');
    }
    if (!(await hasIndex('po_approval_exemptions', 'po_approval_exemptions_restaurant_id'))) {
      await sequelize.query('ALTER TABLE po_approval_exemptions ADD INDEX po_approval_exemptions_restaurant_id (restaurant_id)');
    }
    console.log('✅ po_approval_exemptions ready');
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('❌ migrate-po-approval-exemptions failed:', e.message);
    try { await sequelize.close(); } catch (_) {}
    process.exit(1);
  }
})();
