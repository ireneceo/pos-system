#!/usr/bin/env node
/**
 * 읽기 전용 보고서 — «재고아이템으로 저장» 옛 결함(base 1 고정)으로 생긴 것으로 보이는 재고 행 (2026-10-15 Fable 설계 §5 · 쓰기 0)
 *   조건: 재고 행 base_quantity 1 · 연결된 공급업체 상품 base ≠ 1 · 같은 취급단위 · pack 주문
 *   (가) unit_cost = 판매가 그대로 → 규격을 판매 상품대로 맞추면 단위원가가 바로 맞아진다(Irene 결정 대기)
 *   (나) unit_cost ≠ 판매가 → 손으로 고친 흔적, 목록만
 * 사용: node scripts/report-stock-base-vs-seller.js          (개발 DB)
 *       node scripts/report-stock-base-vs-seller.js --prod   (운영 — scripts/prod-query.js 읽기 전용 경로)
 */
const SQL = (table, fk) => `SELECT '${table}' AS tbl, x.id, x.name, x.unit, x.base_quantity, x.package_unit, x.unit_cost,
  sp.id AS sp_id, sp.name AS sp_name, sp.base_quantity AS sp_base, sp.package_unit AS sp_pkg, sp.unit_price,
  isp.unit_conversion, IF(ABS(x.unit_cost - sp.unit_price) < 0.005, 'ga', 'na') AS grp
  FROM ${table} x
  JOIN ingredient_seller_products isp ON isp.${fk} = x.id AND isp.seller_type = 'supplier' AND isp.is_active = 1
  JOIN supplier_products sp ON sp.id = isp.seller_product_id AND sp.deleted_at IS NULL
  WHERE x.is_active = 1 AND x.base_quantity = 1 AND sp.base_quantity <> 1 AND sp.order_mode = 'pack' AND x.unit = sp.unit`;
const sql = `${SQL('ingredients', 'ingredient_id')} UNION ALL ${SQL('product_ingredients', 'product_ingredient_id')} ORDER BY grp, tbl, id`;

(async () => {
  if (process.argv.includes('--prod')) {
    const { execFileSync } = require('child_process');
    process.stdout.write(execFileSync('node', [require('path').join(__dirname, 'prod-query.js'), sql], { encoding: 'utf8' }));
    process.exit(0);
  }
  require('dotenv/config');
  const { sequelize } = require('../config/database');
  const rows = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
  console.table(rows);
  console.log(`(가) ${rows.filter(r => r.grp === 'ga').length} · (나) ${rows.filter(r => r.grp === 'na').length}`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
