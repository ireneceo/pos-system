/**
 * 같은 재료가 **같은 판매자 상품**에 두 번 연결된 복사본 링크를 끈다 (2026-09-08)
 *
 * ## 왜 기존 도구로 안 됐나
 * `cleanup-ugs-duplicate-products.js` 는 [옛1+오늘1] 형태를 기대하는데, 운영 실측은 달랐다:
 *   중복 그룹 54개 중 **18개는 서로 다른 프로덕트**를 가리킨다 — 그건 중복이 아니라
 *   **복수 공급처**다(같은 재료를 여러 곳에서 살 수 있는 것이 정상). 끄면 안 된다.
 *   비선호 링크 3개에는 **발주 라인이 실제로 붙어** 있다 — 끄면 과거 발주의 출처가 끊긴다.
 *
 * ## 그래서 이 스크립트가 끄는 것 (셋 다 만족할 때만)
 *   ① 같은 (재료, 판매자종류) 그룹의 링크가 **모두 같은 seller_product_id** 를 가리킨다
 *   ② 그 링크가 `is_preferred = 0` 이다 (선호 줄은 그룹마다 정확히 1개인 것을 실측 확인)
 *   ③ 그 링크에 붙은 **발주 라인이 0건**이다
 *
 * ⛔ 행을 지우지 않는다 — `is_active = 0` 으로 끄기만 한다. 되돌리려면 다시 1로 올리면 된다.
 * ⛔ 기본은 미리보기. 쓰기는 `--apply` 를 줄 때만.
 * 멱등: 이미 꺼진 행은 대상에서 빠진다.
 *
 * 사용:
 *   node scripts/cleanup-duplicate-seller-links.js           # 미리보기
 *   node scripts/cleanup-duplicate-seller-links.js --apply   # 적용
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });
const APPLY = process.argv.includes('--apply');

(async () => {
  const db = (await q('SELECT DATABASE() db'))[0].db;
  console.log(`\n=== 중복 판매처 링크 정리 — ${APPLY ? '적용(--apply)' : '미리보기'} · ${db} ===\n`);

  const targets = await q(`
    SELECT isp.id, isp.ingredient_id, isp.seller_type, isp.seller_product_id, isp.unit_price,
           i.name ingredient_name, i.restaurant_id, i.brand_id,
           keep.id keep_id, keep.unit_price keep_price
      FROM ingredient_seller_products isp
      JOIN (
        SELECT ingredient_id, seller_type
          FROM ingredient_seller_products
         WHERE is_active = 1 AND ingredient_id IS NOT NULL
         GROUP BY ingredient_id, seller_type
        HAVING COUNT(*) > 1 AND COUNT(DISTINCT seller_product_id) = 1
      ) d ON d.ingredient_id = isp.ingredient_id AND d.seller_type = isp.seller_type
      JOIN ingredient_seller_products keep
        ON keep.ingredient_id = isp.ingredient_id AND keep.seller_type = isp.seller_type
       AND keep.is_active = 1 AND keep.is_preferred = 1
      LEFT JOIN ingredients i ON i.id = isp.ingredient_id
     WHERE isp.is_active = 1 AND isp.is_preferred = 0
       AND NOT EXISTS (SELECT 1 FROM purchase_order_items poi WHERE poi.ingredient_seller_product_id = isp.id)
     ORDER BY isp.ingredient_id, isp.id`);

  if (!targets.length) { console.log('끌 대상 없음 — 이미 정리돼 있습니다.'); process.exit(0); }

  console.log(`끌 대상 ${targets.length}개 (전부 «같은 상품을 가리키는 복사본» · 발주 사용 0건)\n`);
  for (const t of targets) {
    console.log(`  링크 ${t.id} 끔  <- 재료 ${t.ingredient_id} "${String(t.ingredient_name || '').slice(0, 40)}" ` +
      `(매장 ${t.restaurant_id ?? '-'}/브랜드 ${t.brand_id ?? '-'}) ` +
      `상품 ${t.seller_product_id} · 남는 링크 ${t.keep_id}(가격 ${t.keep_price})`);
  }

  if (!APPLY) {
    console.log('\n○ 미리보기였습니다 — 아무것도 바꾸지 않았습니다. 적용하려면 --apply');
    process.exit(0);
  }

  const ids = targets.map((t) => t.id);
  await sequelize.query(
    'UPDATE ingredient_seller_products SET is_active = 0 WHERE id IN (:ids) AND is_active = 1',
    { replacements: { ids } });
  console.log(`\n✓ ${ids.length}개 링크를 껐습니다 (is_active = 0). 되돌리려면 해당 id 를 1 로 올리면 됩니다.`);

  const left = await q(`
    SELECT COUNT(*) n FROM (
      SELECT ingredient_id, seller_type FROM ingredient_seller_products
       WHERE is_active = 1 AND ingredient_id IS NOT NULL
       GROUP BY ingredient_id, seller_type
      HAVING COUNT(*) > 1 AND COUNT(DISTINCT seller_product_id) = 1) x`);
  console.log(`남은 «같은 상품 중복» 그룹: ${left[0].n}개 (0 이면 정리 완료)`);
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
