/**
 * rollback-stock-ledger-batch.js — 재고 장부 이관/일괄링크 배치 되돌리기.
 *
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §10-5
 * 사용: node scripts/rollback-stock-ledger-batch.js --batch=<uuid> [--apply]
 *       --apply 없으면 dry-run(무엇을 되돌릴지 출력만). **기본이 dry-run 이다.**
 *
 * 🔒 계약 (Fable 2026-08-28 — 오늘 실제로 저지른 실수의 재발 방지):
 *   1) 되돌림 대상은 **오직 `stock_ledger_batch_items` 에 기록된 행**이다.
 *      현재 상태(매핑이 붙어 있다 등)에서 "내가 만들었다"를 **추론하는 코드 금지**.
 *      — 실제 사고: 캡처 스크립트가 "새 매핑이 붙은 재고 = 내가 만든 것"으로 추론해
 *        기존 dev 재고를 지울 뻔했다(FK 가 막아 손실 0).
 *   2) `action='link_seller'` 는 **매핑 행만** 지운다. 그 매핑이 붙어 있던 **기존 재고 행은 절대 건드리지 않는다.**
 *   3) `action='create_ingredient'` 로 만든 재고라도 **다른 곳에서 참조되면 삭제하지 않고 skip** 하고 사유를 남긴다.
 *   4) 되돌린 이력 행은 삭제하지 않고 `status='reverted'` 로 표시한다(감사 흔적 보존).
 */
require('dotenv').config();
const { Op } = require('sequelize');
const {
  StockLedgerBatchItem, Ingredient, IngredientSellerProduct,
  RecipeIngredient, PurchaseOrderItem
} = require('../models');

const args = process.argv.slice(2);
const batchArg = args.find(a => a.startsWith('--batch='));
const APPLY = args.includes('--apply');
const BATCH = batchArg ? batchArg.split('=')[1] : null;

(async () => {
  try {
    if (!BATCH) {
      console.error('사용: node scripts/rollback-stock-ledger-batch.js --batch=<uuid> [--apply]');
      process.exit(1);
    }
    const rows = await StockLedgerBatchItem.findAll({
      where: { batch_id: BATCH, status: 'applied' },
      order: [['created_at', 'DESC'], ['id', 'DESC']]   // 역순
    });
    if (!rows.length) {
      console.log(`batch ${BATCH}: 되돌릴 applied 행이 없습니다.`);
      process.exit(0);
    }
    console.log(`[rollback] batch=${BATCH} · applied ${rows.length}행 · ${APPLY ? 'APPLY' : 'DRY-RUN(기본)'}`);

    let reverted = 0, skipped = 0;
    for (const r of rows) {
      // ── 매핑 되돌리기: 매핑 행만 지운다. 재고 행은 손대지 않는다(계약 2)
      if (r.action === 'link_seller') {
        const m = r.target_id ? await IngredientSellerProduct.findByPk(r.target_id) : null;
        if (!m) { console.log(`  - skip  매핑 #${r.target_id} 이미 없음`); skipped++; continue; }
        console.log(`  ${APPLY ? '↩ 삭제' : '· 삭제예정'} 매핑 #${m.id} (ingredient ${m.ingredient_id})`);
        if (APPLY) { await m.destroy(); await r.update({ status: 'reverted' }); }
        reverted++;
        continue;
      }

      // ── 원가 되돌리기
      if (r.action === 'update_cost') {
        const ing = r.target_id ? await Ingredient.findByPk(r.target_id) : null;
        const before = r.payload_before && r.payload_before.unit_cost;
        if (!ing || before == null) { console.log(`  - skip  원가 복원 대상 없음 (#${r.target_id})`); skipped++; continue; }
        console.log(`  ${APPLY ? '↩ 복원' : '· 복원예정'} 재고 #${ing.id} 원가 ${ing.unit_cost} → ${before}`);
        if (APPLY) { await ing.update({ unit_cost: before }); await r.update({ status: 'reverted' }); }
        reverted++;
        continue;
      }

      // ── 이 배치가 **만든** 재고만 삭제 후보. 참조가 있으면 skip(계약 3)
      if (r.action === 'create_ingredient') {
        const ing = r.target_id ? await Ingredient.findByPk(r.target_id) : null;
        if (!ing) { console.log(`  - skip  재고 #${r.target_id} 이미 없음`); skipped++; continue; }
        const refs = [];
        if (await RecipeIngredient.count({ where: { ingredient_id: ing.id } })) refs.push('recipe_ingredients');
        if (await PurchaseOrderItem.count({ where: { ingredient_id: ing.id } })) refs.push('purchase_order_items');
        const otherMaps = await IngredientSellerProduct.count({
          where: {
            ingredient_id: ing.id,
            id: { [Op.notIn]: rows.filter(x => x.action === 'link_seller' && x.target_id).map(x => x.target_id).concat([0]) }
          }
        });
        if (otherMaps) refs.push('ingredient_seller_products(이 배치 밖)');
        if (refs.length) {
          console.log(`  - skip  재고 #${ing.id} "${ing.name}" — 참조 있음: ${refs.join(', ')}`);
          skipped++;
          continue;
        }
        console.log(`  ${APPLY ? '↩ 삭제' : '· 삭제예정'} 재고 #${ing.id} "${ing.name}"`);
        if (APPLY) { await ing.destroy(); await r.update({ status: 'reverted' }); }
        reverted++;
        continue;
      }

      // skip / hold 는 쓰기가 없었으므로 되돌릴 것이 없다
      console.log(`  - skip  action=${r.action} (쓰기 없음)`);
      skipped++;
    }

    console.log(`\n${APPLY ? '되돌림' : '되돌릴 예정'}: ${reverted} · 건너뜀: ${skipped}`);
    if (!APPLY) console.log('실제로 되돌리려면 --apply 를 붙이세요.');
    process.exit(0);
  } catch (e) {
    console.error('✗ rollback 실패:', e.message);
    process.exit(1);
  }
})();
