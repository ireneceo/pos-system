/**
 * scripts/migrate-mirror-source-links-backfill.js — GIT 상품 출처 브랜드 재료 줄에 «GIT 판매» 연결 채우기 (deploy · 멱등)
 *
 * ## 왜 (2026-10-11 Fable 판정 `fable-verdict-20261011-kdine-ingredient-tidy` §4-1 · 9-29 판정 D3′ · Irene 10-04 «권고대로 해»)
 * Irene 2026-10-11: «K-DINE IPC 기준으로 왜 브랜드 공급업체 연결이 되지 않았어? … 우리 납품 브랜드로 공급업체 연결 제대로 해줄 수는 없는 거야??»
 * 매장은 브랜드 재료의 공급처 중 «브랜드 자신이 판매자인 출처 연결»(공용·buyer NULL)만 본다(utils/brandStockAccess.sellerLinkVisible).
 * 그 연결은 10-04 부터 **새로 생기는 줄에만** 자동으로 붙었고(stockItemMirror.ensureSourceSellerLink), 이미 있던 줄은
 * 비어 있었다(운영 10-11 실측 K-DINE 상품 출처 85줄 중 77줄 — 인스펙션 ING-UNI-032). 그래서 매장이 GIT 에서 발주할 수 없었다.
 *
 * ## 하는 일 (한 트랜잭션)
 *   대상 = 활성 브랜드 재료 · source_brand_product_id 있음 · 그 상품이 활성이고 **그 브랜드 주인이 파는 것** ·
 *          같은 판매자·상품의 공용 연결이 **하나도 없음**(꺼진 연결이 있으면 사람이 끈 것 — 되살리지 않는다).
 *   각 줄에 ensureSourceSellerLink — 환산 = 상품 규격을 거울 단위로 센 값(sourceLinkConversion). 환산 불가면 거울 기준숫자.
 *   환산값이 거울 기준숫자와 다르면 **채우되 «규격 불일치» 목록으로 출력**(사람이 상품 규격 또는 거울을 맞춘다 — 운영 #119 쌀).
 *
 * ⛔ 하지 않는 것: 거울 생성·비활성 · 레시피·재고·원가 변경 · 매장이 붙인 연결 · 꺼진 연결 되살리기.
 *
 * 사용: node scripts/migrate-mirror-source-links-backfill.js [--dry-run]
 *   기본 = 적용(배포 루프는 인자 없이 부른다). --dry-run = 적용 + 증명 + 무조건 롤백.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });

// 검사와 채우기가 **같은 조건**을 쓴다(검사와 수정은 같은 SQL — 다르면 «수정이 덜 고친다»).
const TARGET_SQL = `SELECT i.id, i.name, i.brand_id, i.unit, i.base_quantity, i.source_brand_product_id
    FROM ingredients i
    JOIN brands b ON b.id = i.brand_id
    JOIN brand_products bp ON bp.id = i.source_brand_product_id AND bp.is_active = 1 AND bp.owner_user_id = b.owner_id
   WHERE i.owner_type = 'brand' AND i.is_active = 1 AND i.source_brand_product_id IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM ingredient_seller_products s
                      WHERE s.ingredient_id = i.id AND s.buyer_restaurant_id IS NULL
                        AND s.seller_type = 'brand' AND s.seller_entity_id = i.brand_id
                        AND s.seller_product_id = i.source_brand_product_id)
   ORDER BY i.id`;

(async () => {
  const { Ingredient, BrandProduct } = require('../models');
  const { ensureSourceSellerLink, sourceLinkConversion } = require('../services/stockItemMirror');
  const t = await sequelize.transaction();
  try {
    const targets = await q(TARGET_SQL, {}, t);
    const mismatches = [];
    let filled = 0;
    for (const row of targets) {
      const mirror = await Ingredient.findByPk(row.id, { transaction: t });
      const product = await BrandProduct.findByPk(row.source_brand_product_id, { transaction: t });
      const conv = sourceLinkConversion(mirror, product);
      const r = await ensureSourceSellerLink(mirror, product, { transaction: t });
      if (!r.created) throw new Error(`ing#${row.id} 연결 생성 안 됨 — 대상 조건과 함수 조건이 어긋남, 중단`);
      filled += 1;
      if (conv.mismatch) {
        mismatches.push(`ing#${row.id} «${row.name}» 거울 ${row.base_quantity} ${row.unit} ↔ 상품 bp#${product.id} ${product.base_quantity} ${product.unit} → 환산 ${conv.value}`);
      }
    }
    // 증명: 같은 조건으로 다시 세면 0
    const left = (await q(TARGET_SQL, {}, t)).length;
    console.log(`[mirror-source-links-backfill] 대상 ${targets.length} · 채움 ${filled} · 남음 ${left}${DRY ? ' (드라이런 — 롤백)' : ''}`);
    if (mismatches.length) {
      console.log(`  규격 불일치 ${mismatches.length}건(채웠음 · 사람이 상품 규격 또는 거울을 맞출 것):`);
      mismatches.forEach((m) => console.log('   - ' + m));
    }
    if (left !== 0) throw new Error(`증명 실패 — 채운 뒤에도 ${left}줄 남음`);
    if (DRY) await t.rollback(); else await t.commit();
    process.exit(0);
  } catch (e) {
    if (!t.finished) await t.rollback();
    console.error('[mirror-source-links-backfill] 실패 — 롤백:', e.message);
    process.exit(1);
  }
})();
