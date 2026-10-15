// 개발 데모 공급업체 14 의 «틀린 옵션 예시» 정리 — 규격은 옵션이 아니라 판매 상품 행 (2026-10-15 Fable 설계 D7
//   .claude/fable-design-20261015-supplier-product-options.md)
//
//   «Pack Size: Small(1 kg) / Medium(5 kg) +8 / Large(10 kg) +18»(Fresh Tomato·Yellow Onion) 와
//   «Container Size: 250 ml / 500 ml +12 / 1 L +20»(Olive Oil) 는 양을 바꾸는 옵션이라 입고·원가가 틀어진다.
//   → 두 그룹·연결을 지우고, 규격마다 판매 상품 행을 하나씩 둔다(가격 = 옛 기본가 + 조정액).
//   손질·등급·숙성 옵션(Aging·Cut·Trim)과 옛 발주(PO 82)는 그대로.
//
// ⛔ 개발 DB 전용 — 이름이 migrate-* 가 아니라 배포가 실행하지 않는다. 운영 데이터는 건드리지 않는다.
// 멱등 — 그룹이 이미 없고 새 행(SKU)이 이미 있으면 아무것도 하지 않는다.
// Usage: node scripts/dev-demo-split-size-options.js          (미리보기)
//        node scripts/dev-demo-split-size-options.js --apply  (적용)

const { sequelize } = require('../config/database');

const COMPANY_ID = 14;
const SIZE_GROUP_NAMES = ['Pack Size', 'Container Size'];
// 기존 1 kg 행(31·32)은 그대로 두고 5 kg·10 kg 행을 더한다. Olive Oil(36)은 1 L 28.00 그대로(포장 bottle 만) 두고 250·500 ml 행을 더한다
//   — 옛 «250 ml +0» 은 1 L 상품에 붙어 뜻이 안 맞았다. 작은 병이 ml 당 더 비싸게(9.00 / 16.00).
const NEW_ROWS = [
  { from: 31, sku: 'TMT-005', unit: 'kg', base_quantity: 5, package_unit: 'bag', unit_price: 16.50 },
  { from: 31, sku: 'TMT-010', unit: 'kg', base_quantity: 10, package_unit: 'bag', unit_price: 26.50 },
  { from: 32, sku: 'ONI-005', unit: 'kg', base_quantity: 5, package_unit: 'bag', unit_price: 13.20 },
  { from: 32, sku: 'ONI-010', unit: 'kg', base_quantity: 10, package_unit: 'bag', unit_price: 23.20 },
  { from: 36, sku: 'OIL-250', unit: 'ml', base_quantity: 250, package_unit: 'bottle', unit_price: 9.00 },
  { from: 36, sku: 'OIL-500', unit: 'ml', base_quantity: 500, package_unit: 'bottle', unit_price: 16.00 },
];
const OLIVE_1L = { id: 36, unit: 'L', base_quantity: 1, package_unit: 'bottle', unit_price: 28.00 };

(async () => {
  const apply = process.argv.includes('--apply');
  const [[db]] = await sequelize.query('SELECT DATABASE() AS name');
  if (process.env.NODE_ENV === 'production' || !/dev/i.test(String(db.name))) {
    console.error(`⛔ 개발 DB 전용 — 지금 DB: ${db.name} · NODE_ENV=${process.env.NODE_ENV}`);
    process.exit(1);
  }
  const [groups] = await sequelize.query(
    'SELECT id, name FROM supplier_product_option_groups WHERE supplier_company_id = :c AND name IN (:n)',
    { replacements: { c: COMPANY_ID, n: SIZE_GROUP_NAMES } }
  );
  const [existing] = await sequelize.query(
    'SELECT sku FROM supplier_products WHERE supplier_company_id = :c AND sku IN (:s) AND deleted_at IS NULL',
    { replacements: { c: COMPANY_ID, s: NEW_ROWS.map(r => r.sku) } }
  );
  const have = new Set(existing.map(r => r.sku));
  const toAdd = NEW_ROWS.filter(r => !have.has(r.sku));
  console.log(`지울 크기 옵션 그룹: ${groups.map(g => `${g.id} ${g.name}`).join(', ') || '없음'}`);
  console.log(`더할 상품 행: ${toAdd.map(r => r.sku).join(', ') || '없음'}`);
  if (!apply) { console.log('(미리보기 — 적용하려면 --apply)'); process.exit(0); }

  await sequelize.transaction(async (t) => {
    const gids = groups.map(g => g.id);
    if (gids.length) {
      await sequelize.query('DELETE FROM supplier_product_option_group_products WHERE option_group_id IN (:g)', { replacements: { g: gids }, transaction: t });
      await sequelize.query('DELETE FROM supplier_product_options WHERE option_group_id IN (:g)', { replacements: { g: gids }, transaction: t });
      await sequelize.query('DELETE FROM supplier_product_option_groups WHERE id IN (:g)', { replacements: { g: gids }, transaction: t });
    }
    for (const r of toAdd) {
      await sequelize.query(
        `INSERT INTO supplier_products (supplier_company_id, category_id, name, description, sku, unit, base_quantity, package_unit,
           order_mode, unit_price, min_order_quantity, image_url, image_thumbnail, is_active, sort_order, current_stock,
           low_stock_threshold, lead_time_days, emoji, created_at, updated_at)
         SELECT supplier_company_id, category_id, name, description, :sku, :unit, :bq, :pu,
           order_mode, :price, 1, image_url, image_thumbnail, 1, sort_order, 0, 0, lead_time_days, emoji, NOW(), NOW()
           FROM supplier_products WHERE id = :from`,
        { replacements: { sku: r.sku, unit: r.unit, bq: r.base_quantity, pu: r.package_unit, price: r.unit_price, from: r.from }, transaction: t }
      );
    }
    await sequelize.query(
      'UPDATE supplier_products SET unit = :unit, base_quantity = :bq, package_unit = :pu, unit_price = :price WHERE id = :id AND supplier_company_id = :c',
      { replacements: { ...OLIVE_1L, bq: OLIVE_1L.base_quantity, pu: OLIVE_1L.package_unit, price: OLIVE_1L.unit_price, c: COMPANY_ID }, transaction: t }
    );
    // 1 L 행을 사던 연결의 사본 단가도 맞춘다(환산은 그대로 — 단위 L 유지)
    await sequelize.query(
      "UPDATE ingredient_seller_products SET unit_price = :price WHERE seller_type = 'supplier' AND seller_entity_id = :c AND seller_product_id = :id",
      { replacements: { price: OLIVE_1L.unit_price, c: COMPANY_ID, id: OLIVE_1L.id }, transaction: t }
    );
  });
  const [after] = await sequelize.query(
    `SELECT id, name, sku, unit, base_quantity, package_unit, unit_price FROM supplier_products
      WHERE supplier_company_id = :c AND id IN (31, 32, 36) OR (supplier_company_id = :c AND sku IN (:s)) ORDER BY name, base_quantity`,
    { replacements: { c: COMPANY_ID, s: NEW_ROWS.map(r => r.sku) } }
  );
  console.table(after);
  process.exit(0);
})().catch(err => { console.error('실패:', err); process.exit(1); });
