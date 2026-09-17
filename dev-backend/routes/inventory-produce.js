/**
 * 준비된 재고 «만들기» (생산 기록) — 2026-09-17 Fable 판정 «차감 시점 = 만들 때 한 번»
 *   docs/RECIPE_MANAGEMENT_SYSTEM.md §6
 *
 * Irene: 「불고기를 재어 두는데 소고기를 이용해서 재 놓는 거지 … 3kg을 재면 실제 2.5kg이 되는 거고」
 *
 * 한 번 누르면 **한 트랜잭션**에서 전부 일어난다:
 *   ① 준비 레시피의 원재료가 빠진다(FIFO 배치 + 재고)
 *   ② 준비 재료가 «실제로 나온 양» 만큼 늘고 배치 1건이 생긴다
 *   ③ 장부에 'production' 두 줄(원재료 −, 준비 재료 +)이 남는다
 *   ④ 매장 원가층이 «실제 쓴 돈 ÷ 실제로 나온 양» 으로 갱신된다
 *
 * ⛔ 판매 시 차감은 **이 파일과 무관하다** — 팔릴 때는 준비 재료만 빠진다(기존 코드 그대로).
 *
 * Mount: /api/restaurants  (inventory-core 와 같은 자리, :restaurantId 가드 동일)
 */
const express = require('express');
const router = express.Router();
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { checkRestaurantAccess } = require('../middleware/auth');
const {
  Recipe, RecipeIngredient, Ingredient, InventoryBatch, InventoryTransaction, StockAlert
} = require('../models');
const { stockFor, applyStock } = require('../utils/brandStockAccess');
const { deductStockFIFO } = require('../services/inventoryDeductionService');
const { writeStoreCost } = require('../services/storeCost');
const { getPrepIngredient } = require('../services/prepIngredientSync');

router.use(authenticateToken);
router.use('/:restaurantId', checkRestaurantAccess);

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

/** 준비 재료 + 그 레시피 + 원재료 줄을 한 번에 읽는다 */
async function loadPrep(ingredientId, restaurantId, transaction) {
  const ingredient = await Ingredient.findByPk(ingredientId, { transaction });
  if (!ingredient || !ingredient.source_recipe_id) return { error: 'NOT_PREP' };
  // 매장 소유이거나, 매장이 속한 브랜드 소유여야 한다(브랜드 준비 재료도 매장이 «만든다»)
  const { Restaurant } = require('../models');
  const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'], transaction });
  const owned = (ingredient.owner_type === 'restaurant' && String(ingredient.restaurant_id) === String(restaurantId))
    || (ingredient.owner_type === 'brand' && restaurant && String(ingredient.brand_id) === String(restaurant.brand_id));
  if (!owned) return { error: 'FORBIDDEN' };

  const recipe = await Recipe.findByPk(ingredient.source_recipe_id, { transaction });
  if (!recipe) return { error: 'RECIPE_MISSING' };

  const lines = await RecipeIngredient.findAll({
    where: { recipe_id: recipe.id },
    include: [{ model: Ingredient, as: 'ingredient' }],
    transaction
  });
  return { ingredient, recipe, lines };
}

/** 몇 판 만들 때 무엇이 얼마나 빠지는지 — 화면이 확인창에 그대로 그린다 */
async function buildPreview(prep, batches, restaurantId, transaction) {
  const rows = [];
  for (const l of prep.lines) {
    const ing = l.ingredient;
    if (!ing) continue;
    const need = round2((Number(l.quantity) || 0) * batches);
    const have = round2(await stockFor(ing, restaurantId, transaction));
    rows.push({
      ingredient_id: ing.id,
      name: ing.name,
      unit: ing.unit,
      needed: need,
      current_stock: have,
      short_by: have < need ? round2(need - have) : 0
    });
  }
  return rows;
}

/**
 * GET /api/restaurants/:restaurantId/inventory/produce-preview?ingredient_id=&batches=
 * 아무것도 바꾸지 않는다.
 */
router.get('/:restaurantId/inventory/produce-preview', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredientId = parseInt(req.query.ingredient_id, 10);
    const batches = Math.max(0, Number(req.query.batches) || 1);

    const prep = await loadPrep(ingredientId, restaurantId, null);
    if (prep.error === 'NOT_PREP') return res.status(400).json({ success: false, message: '준비 재료가 아닙니다', error: { code: 'NOT_PREP_INGREDIENT' } });
    if (prep.error === 'FORBIDDEN') return res.status(403).json({ success: false, message: 'Access denied' });
    if (prep.error) return res.status(404).json({ success: false, message: '준비 레시피를 찾을 수 없습니다' });

    const consumes = await buildPreview(prep, batches, restaurantId, null);
    const expectedYield = round2((Number(prep.recipe.yield_amount) || 0) * batches);
    res.json({
      success: true,
      data: {
        ingredient: { id: prep.ingredient.id, name: prep.ingredient.name, unit: prep.ingredient.unit },
        recipe: { id: prep.recipe.id, name: prep.recipe.name, yield_amount: prep.recipe.yield_amount, yield_unit: prep.recipe.yield_unit },
        batches,
        expected_yield: expectedYield,
        consumes,
        // 부족해도 «만들기»는 막지 않는다 — 실제로는 만들어졌는데 화면이 거부하면 장부가 더 틀어진다.
        //   대신 부족분을 표시하고, 기록에 남긴다.
        has_shortage: consumes.some(c => c.short_by > 0)
      }
    });
  } catch (e) {
    console.error('[produce-preview] error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

/**
 * POST /api/restaurants/:restaurantId/inventory/produce
 * body: { ingredient_id, batches = 1, actual_yield?, expiry_date?, notes? }
 */
router.post('/:restaurantId/inventory/produce', async (req, res) => {
  const transaction = await database.sequelize.transaction();
  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const ingredientId = parseInt(req.body.ingredient_id, 10);
    const batches = Math.max(0, Number(req.body.batches) || 1);
    if (!(batches > 0)) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: '몇 판 만들지 알려 주세요 (0보다 커야 합니다)' });
    }

    const prep = await loadPrep(ingredientId, restaurantId, transaction);
    if (prep.error) {
      await transaction.rollback();
      const map = { NOT_PREP: [400, '준비 재료가 아닙니다'], FORBIDDEN: [403, 'Access denied'], RECIPE_MISSING: [404, '준비 레시피를 찾을 수 없습니다'] };
      const [status, message] = map[prep.error] || [400, 'Bad request'];
      return res.status(status).json({ success: false, message });
    }

    const expectedYield = round2((Number(prep.recipe.yield_amount) || 0) * batches);
    // «실제로 나온 양» — 사람이 고칠 수 있다(3kg 재서 2.4kg 나오는 날이 있다). 없으면 수율 × 판수.
    const actualYield = req.body.actual_yield === undefined || req.body.actual_yield === null || req.body.actual_yield === ''
      ? expectedYield : round2(req.body.actual_yield);
    if (!(actualYield > 0)) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: '실제로 나온 양은 0보다 커야 합니다' });
    }

    // ① 원재료 차감 — 소비 원가를 함께 모은다(준비 재료 1단위 원가를 내는 데 쓴다)
    const consumed = [];
    let consumedCost = 0;
    const shortages = [];
    for (const l of prep.lines) {
      const ing = l.ingredient;
      if (!ing) continue;
      const need = round2((Number(l.quantity) || 0) * batches);
      if (!(need > 0)) continue;

      const have = round2(await stockFor(ing, restaurantId, transaction));
      const take = Math.min(need, Math.max(0, have));   // 없는 재고를 음수로 만들지 않는다
      if (have < need) shortages.push({ ingredient_id: ing.id, name: ing.name, needed: need, had: have });

      let costOfTake = 0;
      if (take > 0) {
        const fifo = await deductStockFIFO(ing.id, take, transaction, restaurantId);
        // deductStockFIFO 는 «어느 배치에서 얼마» 만 돌려준다(단가는 안 준다) — 배치 단가를 읽어 값을 낸다.
        //   서비스 반환 모양을 바꾸지 않는 이유: 그 함수는 주문 차감이 쓰는 생명선이다.
        for (const b of (fifo && fifo.batches) || []) {
          const row = await InventoryBatch.findByPk(b.batch_id, { attributes: ['id', 'unit_cost'], transaction });
          costOfTake += (Number(row && row.unit_cost) || 0) * (Number(b.quantity_deducted) || 0);
        }
        // 배치가 없거나 모자라면 값이 안 나온다 — 재료 단가로 메운다(기존 차감 서비스와 같은 규칙).
        if (!(costOfTake > 0)) {
          const base = Number(ing.base_quantity) || 1;
          costOfTake = ((Number(ing.unit_cost) || 0) / base) * take;
        }
        const newStock = round2(have - take);
        await applyStock(ing, restaurantId, newStock, transaction, { stockTake: true });
        await InventoryTransaction.create({
          restaurant_id: restaurantId,
          ingredient_id: ing.id,
          transaction_type: 'production',
          quantity_change: -take,
          unit: ing.unit,
          stock_after: newStock,
          notes: `만들기 — ${prep.recipe.name} ${batches}판`,
          created_by: userId
        }, { transaction });
      }
      consumedCost += costOfTake;
      consumed.push({ ingredient_id: ing.id, name: ing.name, unit: ing.unit, used: take, needed: need });
    }

    // ② 준비 재료 증가 + 배치 1건
    const prepHave = round2(await stockFor(prep.ingredient, restaurantId, transaction));
    const prepNew = round2(prepHave + actualYield);
    await applyStock(prep.ingredient, restaurantId, prepNew, transaction, { stockTake: true });

    const unitCost = Math.round((consumedCost / actualYield) * 10000) / 10000;
    const batch = await InventoryBatch.create({
      restaurant_id: restaurantId,
      ingredient_id: prep.ingredient.id,
      batch_number: null,
      initial_quantity: actualYield,
      remaining_quantity: actualYield,
      unit: prep.ingredient.unit,
      unit_cost: unitCost,
      manufacture_date: new Date(),
      expiry_date: req.body.expiry_date || null,
      received_date: new Date(),
      status: 'active',
      notes: req.body.notes || `만들기 — ${prep.recipe.name} ${batches}판`,
      created_by: userId
    }, { transaction });

    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: prep.ingredient.id,
      transaction_type: 'production',
      quantity_change: actualYield,
      unit: prep.ingredient.unit,
      stock_after: prepNew,
      notes: `만들기 — ${prep.recipe.name} ${batches}판${shortages.length ? ' (원재료 부족분 있음)' : ''}`,
      created_by: userId
    }, { transaction });

    // ③ 매장 원가층 — 실제 쓴 돈 ÷ 실제로 나온 양 (브랜드 준비 재료도 매장 원가는 매장 것)
    if (unitCost > 0) {
      await writeStoreCost(restaurantId, prep.ingredient, unitCost, {
        transaction, userId, notes: `만들기 — ${prep.recipe.name}`
      });
    }

    // ④ 저재고 경보 해제 — «만들 때» 신호였으므로 만들었으면 푼다
    await StockAlert.update(
      { is_resolved: true, resolved_at: new Date() },
      { where: { ingredient_id: prep.ingredient.id, restaurant_id: restaurantId, is_resolved: false }, transaction }
    );

    await transaction.commit();
    res.json({
      success: true,
      message: `${prep.ingredient.name} ${actualYield}${prep.ingredient.unit} 를 만들었습니다`,
      data: {
        ingredient_id: prep.ingredient.id,
        produced: actualYield,
        unit: prep.ingredient.unit,
        new_stock: prepNew,
        unit_cost: unitCost,
        batch_id: batch.id,
        consumed,
        shortages   // 부족했던 원재료 — 화면이 그대로 알려 준다(숨기지 않는다)
      }
    });
  } catch (e) {
    await transaction.rollback();
    console.error('[produce] error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
module.exports.getPrepIngredient = getPrepIngredient;
