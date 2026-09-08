/**
 * 읽기 전용 (2026-09-08) — 중복 정리 도구가 멈춘 이유를 데이터로 본다.
 * cleanup-ugs-duplicate-products.js 가 기대한 형태는 [옛1+오늘1] 인데
 * 운영 41개 중 36개가 [옛2] 형태라 중단했다. **어느 줄을 남길지** 판단할 근거를 모은다.
 * ⛔ SELECT 만.
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  console.log(`\n=== DB: ${(await q('SELECT DATABASE() db'))[0].db} ===\n`);
  const groups = await q(`
    SELECT isp.ingredient_id, COUNT(*) n,
           GROUP_CONCAT(isp.id ORDER BY isp.id) link_ids,
           GROUP_CONCAT(isp.seller_product_id ORDER BY isp.id) sp_ids
      FROM ingredient_seller_products isp
     WHERE isp.seller_type = 'brand' AND isp.is_active = 1
     GROUP BY isp.ingredient_id HAVING n > 1
     ORDER BY isp.ingredient_id LIMIT 8`);
  console.log(`중복 그룹 표본 ${groups.length}개 (브랜드 판매자 기준)\n`);

  for (const g of groups) {
    const ing = (await q('SELECT id, name, unit, unit_cost, restaurant_id, brand_id FROM ingredients WHERE id = :i', { i: g.ingredient_id }))[0];
    console.log(`■ 재료 ${g.ingredient_id} "${ing ? ing.name : '?'}" (매장 ${ing?.restaurant_id ?? '-'} / 브랜드 ${ing?.brand_id ?? '-'}) 원가 ${ing?.unit_cost}`);
    const links = await q(`
      SELECT isp.id, isp.seller_product_id, isp.unit_price, isp.is_preferred, isp.created_at,
             bp.name product_name, bp.unit_price product_price, bp.is_active product_active,
             (SELECT COUNT(*) FROM purchase_order_items poi WHERE poi.ingredient_seller_product_id = isp.id) po_lines,
             (SELECT MAX(po.created_at) FROM purchase_order_items poi
                JOIN purchase_orders po ON po.id = poi.purchase_order_id
               WHERE poi.ingredient_seller_product_id = isp.id) last_used
        FROM ingredient_seller_products isp
        LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id
       WHERE isp.id IN (:ids) ORDER BY isp.id`, { ids: g.link_ids.split(',') });
    for (const l of links) {
      console.log(`    링크 ${l.id} → 프로덕트 ${l.seller_product_id} "${l.product_name || '(없음)'}" ` +
        `가격 ${l.unit_price}/${l.product_price} 선호=${l.is_preferred} 활성=${l.product_active} ` +
        `발주라인 ${l.po_lines}건 마지막사용 ${l.last_used ? String(l.last_used).slice(0,10) : '없음'} 생성 ${String(l.created_at).slice(0,10)}`);
    }
    console.log('');
  }
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
