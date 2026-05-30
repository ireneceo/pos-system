// 레거시 set_items → set_groups(단일 fixed 그룹) 무손실 백필. 멱등(이미 set_groups 있으면 skip).
// 실행: node scripts/migrate-set-items-to-groups.js
// 배포 스크립트 sprint migration 목록에도 등록 가능.
const db = require('../models');
const sequelize = db.sequelize || (db.Product && db.Product.sequelize);
const { Product } = db;

(async () => {
  let migrated = 0, skipped = 0, empty = 0;
  try {
    const sets = await Product.findAll({ where: { is_set_menu: true } });
    for (const p of sets) {
      if (Array.isArray(p.set_groups) && p.set_groups.length > 0) { skipped++; continue; }
      const si = p.set_items;
      if (!Array.isArray(si) || si.length === 0) { empty++; continue; }
      const items = si.map(i => ({
        product_id: i.product_id != null ? i.product_id : i.menuItemId,
        qty: i.qty != null ? i.qty : (i.quantity != null ? i.quantity : 1)
      })).filter(it => it.product_id != null);
      if (items.length === 0) { empty++; continue; }
      p.set_groups = [{ id: 'g-legacy', label: 'Set', type: 'fixed', items }];
      p.changed('set_groups', true);
      await p.save();
      migrated++;
    }
    console.log(`✓ set_items → set_groups 백필 완료: migrated=${migrated}, skipped(이미 set_groups)=${skipped}, empty(변환대상없음)=${empty}`);
  } catch (e) {
    console.error('✗ 마이그 실패:', e.message);
    process.exitCode = 1;
  } finally {
    try { await sequelize.close(); } catch {}
  }
})();
