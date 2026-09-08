/**
 * 읽기 전용 (2026-09-08) — 중복 링크에 "안전한 규칙"이 성립하는지 전수 확인.
 * 가설: 그룹마다 ①같은 seller_product_id 를 가리키고 ②살릴 줄은 정확히 1개(is_preferred=1)
 *       ③끌 줄은 발주 라인 0건. 셋이 다 맞으면 «복사본 끄기»는 기계적으로 안전하다.
 * ⛔ SELECT 만.
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  console.log(`\n=== DB: ${(await q('SELECT DATABASE() db'))[0].db} ===\n`);
  const groups = await q(`
    SELECT ingredient_id, seller_type, COUNT(*) n,
           COUNT(DISTINCT seller_product_id) distinct_products,
           SUM(is_preferred = 1) preferred_n
      FROM ingredient_seller_products
     WHERE is_active = 1 AND ingredient_id IS NOT NULL
     GROUP BY ingredient_id, seller_type HAVING n > 1`);
  console.log(`중복 그룹 총 ${groups.length}개`);

  const multiProduct = groups.filter(g => Number(g.distinct_products) > 1);
  const notOnePreferred = groups.filter(g => Number(g.preferred_n) !== 1);
  console.log(`  ① 서로 다른 프로덕트를 가리키는 그룹: ${multiProduct.length}개  ← 0 이어야 기계적 처리 가능`);
  console.log(`  ② 선호 줄이 정확히 1개가 아닌 그룹: ${notOnePreferred.length}개  ← 0 이어야 함`);
  for (const g of multiProduct.slice(0, 5)) console.log(`     · 재료 ${g.ingredient_id} (${g.seller_type}) 프로덕트 ${g.distinct_products}종`);
  for (const g of notOnePreferred.slice(0, 5)) console.log(`     · 재료 ${g.ingredient_id} (${g.seller_type}) 선호 ${g.preferred_n}개`);

  // ③ 끌 후보(비선호)에 발주 라인이 붙어 있나
  const used = await q(`
    SELECT isp.ingredient_id, isp.id link_id, COUNT(poi.id) po_lines
      FROM ingredient_seller_products isp
      JOIN (SELECT ingredient_id, seller_type FROM ingredient_seller_products
             WHERE is_active=1 AND ingredient_id IS NOT NULL
             GROUP BY ingredient_id, seller_type HAVING COUNT(*)>1) d
        ON d.ingredient_id = isp.ingredient_id AND d.seller_type = isp.seller_type
      JOIN purchase_order_items poi ON poi.ingredient_seller_product_id = isp.id
     WHERE isp.is_active = 1 AND isp.is_preferred = 0
     GROUP BY isp.ingredient_id, isp.id`);
  console.log(`  ③ 끌 후보(비선호)인데 발주 라인이 붙은 링크: ${used.length}개  ← 0 이어야 안전`);
  for (const u of used.slice(0, 8)) console.log(`     · 재료 ${u.ingredient_id} 링크 ${u.link_id} — 발주 라인 ${u.po_lines}건`);

  const offCount = await q(`
    SELECT COUNT(*) n FROM ingredient_seller_products isp
      JOIN (SELECT ingredient_id, seller_type FROM ingredient_seller_products
             WHERE is_active=1 AND ingredient_id IS NOT NULL
             GROUP BY ingredient_id, seller_type HAVING COUNT(*)>1) d
        ON d.ingredient_id = isp.ingredient_id AND d.seller_type = isp.seller_type
     WHERE isp.is_active = 1 AND isp.is_preferred = 0`);
  console.log(`\n끌 대상 후보(비선호 링크): ${offCount[0].n}개`);
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
