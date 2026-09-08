/**
 * 읽기 전용 진단 (2026-09-08) — 발주 메일에 찍히는 단위가 왜 갈리는가.
 *
 * Irene 신고: 메일에 1kg 들이 소스가 "2 g / 6 g" 로 나오고, 같은 소스인데 K-Kimchi 만 "6 kg".
 * 총액 MYR 1338.40 · 9줄.
 *
 * ⛔ SELECT 만 돈다. 쓰기 없음.
 */
const { sequelize } = require('../config/database');
const q = (sql, r) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  console.log(`\n=== DB: ${(await q('SELECT DATABASE() db'))[0].db} ===\n`);

  const pos = await q(
    `SELECT id, po_number, status, total_amount, created_at, updated_at, submitted_at,
            entity_type, entity_id, seller_type, seller_entity_id
       FROM purchase_orders
      WHERE deleted_at IS NULL AND ROUND(total_amount,2) = 1338.40
      ORDER BY id DESC`);
  console.log(`총액 1338.40 발주: ${pos.length}건`);
  for (const po of pos) {
    console.log(`\n[PO ${po.id}] ${po.po_number} ${po.status} ${po.total_amount} 생성=${String(po.created_at).slice(0,19)} 제출=${po.submitted_at ? String(po.submitted_at).slice(0,19) : '-'}`);
    const items = await q(
      `SELECT poi.id, poi.description, poi.quantity_ordered, poi.unit, poi.unit_price, poi.line_total,
              poi.unit_conversion, poi.ingredient_seller_product_id map_id,
              isp.unit_price map_price, isp.unit_conversion map_conv,
              sp.name sp_name, sp.unit sp_unit, sp.base_quantity sp_base, sp.order_mode, sp.unit_price sp_price,
              i.name ing_name, i.unit ing_unit, i.base_quantity ing_base, i.package_unit, i.package_quantity
         FROM purchase_order_items poi
         LEFT JOIN ingredient_seller_products isp ON isp.id = poi.ingredient_seller_product_id
         LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type='supplier'
         LEFT JOIN ingredients i ON i.id = isp.ingredient_id
        WHERE poi.purchase_order_id = :p ORDER BY poi.id`, { p: po.id });
    console.log('  라인별 — 발주에 저장된 단위 vs 판매자 상품 단위 vs 우리 재료 단위');
    for (const it of items) {
      console.log(`   · ${String(it.description || it.sp_name || '').slice(0,52)}`);
      console.log(`       발주라인: qty=${it.quantity_ordered} unit=${it.unit} price=${it.unit_price} total=${it.line_total} conv=${it.unit_conversion}`);
      console.log(`       판매자상품: ${it.sp_name || '-'} unit=${it.sp_unit || '-'} base=${it.sp_base || '-'} mode=${it.order_mode || '-'} price=${it.sp_price || '-'}`);
      console.log(`       우리재료  : ${it.ing_name || '-'} unit=${it.ing_unit || '-'} base=${it.ing_base || '-'} pkg=${it.package_unit || '-'}/${it.package_quantity || '-'} · 매핑conv=${it.map_conv}`);
    }
  }
  process.exit(0);
})().catch(e => { console.error('진단 실패:', e.message); process.exit(1); });
