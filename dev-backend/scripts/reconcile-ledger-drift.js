/**
 * 장부 합 ≠ 현재고 어긋남을 장부 줄로 맞춘다 (2026-10-08 · Fable 판정 Ⅱ-2-F · manual 일회성)
 *
 * 왜: 장부 단일 함수(services/stockLedger) 이전에는 장부를 안 거치고 수량을 바꾸는 문이 있었고(인라인 수정·
 *   수정 창·푸드코트 조정 등), 초기재고는 «새 값» 을 변화량으로 적었다. 그래서 «Σ 장부 = 현재고» 가 어긋난 대상이 있다.
 * 무엇을: 어긋난 대상마다 `adjustment` 장부 1줄(reason_code='ledger_reconcile', 변화 = 현재고 − 장부 합,
 *   stock_after = 현재고, 금액 = 그 순간 원가)을 **추가만** 한다. **현재고는 바꾸지 않는다** — 화면에 보이는 수량이
 *   사람이 마지막으로 맞춘 값이고, 장부가 그것을 따라간다.
 * 찾는 SQL = 인스펙션 LEDGER-001 과 같은 utils/ledgerDrift (검사와 수정의 WHERE 가 같아야 한다).
 *
 * 사용: node scripts/reconcile-ledger-drift.js            # 드라이런(표만)
 *       node scripts/reconcile-ledger-drift.js --apply    # 적용(한 트랜잭션) — Irene 표 승인 뒤에만
 *       node scripts/reconcile-ledger-drift.js --undo     # 이 스크립트가 넣은 줄 삭제
 * ⛔ 이 스크립트는 stockLedger.record() 를 쓰지 않는다 — record 는 재고를 바꾸는 함수이고, 여기는 재고를 그대로 두고
 *    장부만 맞추는 일이라 성격이 다르다. 그래서 줄을 직접 넣고 notes 에 표시를 남긴다(--undo 의 열쇠).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { findLedgerDrift } = require('../utils/ledgerDrift');
const { costBasisOf } = require('../services/stockLedger');

const MARK = '[ledger_reconcile 2026-10-08]';
const apply = process.argv.includes('--apply');
const undo = process.argv.includes('--undo');
const q = (sql) => sequelize.query(sql, { type: QueryTypes.SELECT });

const MODEL = {
  restaurant_ingredient: ['Ingredient', 'ingredient_id'],
  brand_overlay: ['Ingredient', 'ingredient_id'],
  product_ingredient: ['ProductIngredient', 'product_ingredient_id'],
  product: ['Product', 'product_id'],
  brand_product: ['BrandProduct', 'brand_product_id'],
  foodcourt_product: ['FoodcourtProduct', 'product_id'],
};

async function main() {
  if (undo) {
    const [r] = await sequelize.query(`DELETE FROM inventory_transactions WHERE reason_code = 'ledger_reconcile' AND notes LIKE :m`, { replacements: { m: `${MARK}%` } });
    console.log(`[reconcile-ledger] 되돌림 — 삭제 ${r.affectedRows}줄`);
    return;
  }
  const drift = await findLedgerDrift(q);
  console.log(`[reconcile-ledger] 어긋남 ${drift.length}건 ${apply ? '(적용)' : '(드라이런)'}`);
  console.table(drift.map(d => ({ kind: d.kind, id: d.id, entity: `${d.entity_type}:${d.entity_id ?? '-'}`, name: String(d.name || '').slice(0, 30), 현재고: d.current_stock, 장부합: d.ledger_sum, 차이: d.diff })));
  if (!apply || !drift.length) return;

  const models = require('../models');
  let added = 0;
  await sequelize.transaction(async (t) => {
    for (const d of drift) {
      const [modelName, col] = MODEL[d.kind];
      const row = await models[modelName].findByPk(d.id, { transaction: t });
      if (!row) continue;
      const kind = d.kind === 'brand_overlay' || d.kind === 'restaurant_ingredient' ? 'ingredient' : d.kind;
      const restaurantId = d.entity_type === 'restaurant' && d.entity_id ? d.entity_id : null;
      const basis = await costBasisOf({ kind, row }, restaurantId, t);
      const known = Number.isFinite(basis.unit_cost) && basis.unit_cost > 0;
      await models.InventoryTransaction.create({
        ...(d.entity_type ? { entity_type: d.entity_type, entity_id: d.entity_id } : {}),
        ...(restaurantId ? { restaurant_id: restaurantId } : {}),
        [col]: d.id,
        transaction_type: 'adjustment',
        quantity_change: d.diff,
        unit: row.unit || row.stock_unit || 'ea',
        stock_after: d.current_stock,
        unit_cost: known ? basis.unit_cost : null,
        cost_value: known ? Math.round((d.diff / (basis.base_quantity || 1)) * basis.unit_cost * 100) / 100 : null,
        base_quantity: known ? basis.base_quantity : null,
        reason_code: 'ledger_reconcile',
        notes: `${MARK} 장부 합 ${d.ledger_sum} → 현재고 ${d.current_stock}`,
        created_by: null,
      }, { transaction: t });
      added++;
    }
  });
  const after = await findLedgerDrift(q);
  console.log(`[reconcile-ledger] 추가 ${added}줄 · 남은 어긋남 ${after.length}건`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[reconcile-ledger] 실패:', e.message); process.exit(1); });
