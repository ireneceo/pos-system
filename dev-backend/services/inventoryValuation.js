/**
 * 재고 총액 · 원가 측정 준비도 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-3-A·F)
 *
 * 재고 총액 = Σ (지금 수량 ÷ 기준양 × 그 매장이 보는 원가). 원가는 services/storeCost 단일 소스(새 원가 소스 금지).
 *   원가 0·NULL 재료는 합계에서 빼고 uncosted 로 센다(0 = «모름», TRADE_STRUCTURE §5-1).
 * 준비도 = 원가를 «잴 수 있는 상태» 인가 — 메뉴가 레시피/재료에 이어졌나 · 재료에 원가가 있나 · 공급처가 이어졌나 · 마지막 실사.
 *   연결이 없는 메뉴는 팔려도 재고가 안 빠지고 이론 원가도 0 이라, 숫자보다 이걸 먼저 보여 준다(운영 실측: 활성 메뉴 758 중 75 연결).
 */
const { Op } = require('sequelize');
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const LIST_MAX = 20;

/** 이 매장이 보는 재료(매장 소유 + 부모 브랜드 공유) — 재고 요약(inventory/summary)과 같은 범위 */
async function storeIngredients(restaurantId) {
  const { Restaurant, Ingredient, IngredientCategory } = require('../models');
  const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'] });
  const or = [{ restaurant_id: restaurantId }];
  if (restaurant && restaurant.brand_id) or.push({ brand_id: restaurant.brand_id, owner_type: 'brand' });
  return Ingredient.findAll({
    where: { [Op.or]: or, is_active: true },
    include: [{ model: IngredientCategory, as: 'ingredientCategory', attributes: ['id', 'name'], required: false }],
  });
}

function summarize(items) {
  const byCat = new Map();
  let total = 0;
  let uncosted = 0;
  for (const it of items) {
    if (it.value === null) { if (it.qty > 0) uncosted++; continue; }
    total += it.value;
    const k = it.category || '—';
    byCat.set(k, round2((byCat.get(k) || 0) + it.value));
  }
  return {
    total_value: round2(total),
    uncosted_count: uncosted,
    by_category: [...byCat.entries()].map(([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value),
  };
}

/** 매장 재고 총액 */
async function restaurantValuation(restaurantId) {
  const { stockMapFor } = require('../utils/brandStockAccess');
  const { loadOverlayMap, effectiveStoreCost } = require('./storeCost');
  const ings = await storeIngredients(restaurantId);
  const brandIds = ings.filter(i => i.owner_type === 'brand').map(i => i.id);
  const stockMap = await stockMapFor(restaurantId, brandIds);
  const overlay = await loadOverlayMap(restaurantId, ings.map(i => i.id));
  const items = ings.map((i) => {
    const qty = i.owner_type === 'brand' ? (stockMap[i.id] || 0) : (parseFloat(i.current_stock) || 0);
    const cost = effectiveStoreCost(i, overlay.get(Number(i.id)), restaurantId);
    const base = parseFloat(i.base_quantity) || 1;
    const known = Number.isFinite(cost) && cost > 0;
    return {
      id: i.id, name: i.name, unit: i.unit, qty: round2(qty), base_quantity: base,
      unit_cost: known ? cost : null,
      value: known ? round2((qty / base) * cost) : null,
      category: i.ingredientCategory ? i.ingredientCategory.name : (i.category || null),
    };
  });
  return { ...summarize(items), items: items.sort((a, b) => (b.value || 0) - (a.value || 0)) };
}

/** BG 재고아이템(본사 창고) 재고 총액 — BG 재고 화면과 같은 소유 범위(owner_user_id) */
async function stockItemValuation(ownerUserId) {
  const { ProductIngredient, ProductIngredientCategory } = require('../models');
  const rows = await ProductIngredient.findAll({
    where: { owner_user_id: ownerUserId, is_active: true },
    include: [{ model: ProductIngredientCategory, as: 'category', attributes: ['id', 'name'], required: false }],
  });
  const items = rows.map((p) => {
    const qty = parseFloat(p.current_stock) || 0;
    const cost = parseFloat(p.unit_cost);
    const base = parseFloat(p.base_quantity) || 1;
    const known = Number.isFinite(cost) && cost > 0;
    return {
      id: p.id, name: p.name, unit: p.unit, qty: round2(qty), base_quantity: base,
      unit_cost: known ? cost : null, value: known ? round2((qty / base) * cost) : null,
      category: p.category ? p.category.name : null,
    };
  });
  return { ...summarize(items), items: items.sort((a, b) => (b.value || 0) - (a.value || 0)) };
}

/** 매장 원가 측정 준비도 */
async function restaurantReadiness(restaurantId) {
  const { sequelize } = require('../config/database');
  const { QueryTypes } = require('sequelize');
  const sel = (sql, rep) => sequelize.query(sql, { replacements: rep, type: QueryTypes.SELECT });

  const menus = await sel(`SELECT id, name, (recipe_id IS NOT NULL OR ingredient_id IS NOT NULL) linked
      FROM products WHERE restaurant_id = ? AND is_active = 1 ORDER BY name`, [restaurantId]);
  const val = await restaurantValuation(restaurantId);
  const ingIds = val.items.map(i => i.id);
  const mapped = ingIds.length ? await sel(`SELECT DISTINCT ingredient_id FROM ingredient_seller_products
      WHERE ingredient_id IN (:ids) AND is_active = 1 AND (buyer_restaurant_id IS NULL OR buyer_restaurant_id = :rid)`,
    { ids: ingIds, rid: restaurantId }) : [];
  const mappedSet = new Set(mapped.map(m => Number(m.ingredient_id)));
  const [lastTake] = await sel(`SELECT MAX(completed_at) at FROM stock_takes WHERE restaurant_id = ? AND status = 'completed'`, [restaurantId]);
  const [deduct] = await sel(`SELECT COUNT(*) n FROM inventory_transactions
      WHERE entity_type = 'restaurant' AND entity_id = ? AND transaction_type = 'order_deduct' AND created_at >= NOW() - INTERVAL 30 DAY`, [restaurantId]);

  const unlinked = menus.filter(m => !Number(m.linked));
  const uncosted = val.items.filter(i => i.unit_cost === null);
  const unmapped = val.items.filter(i => !mappedSet.has(Number(i.id)));
  return {
    menus_total: menus.length,
    menus_linked: menus.length - unlinked.length,
    menus_unlinked: unlinked.slice(0, LIST_MAX).map(m => ({ id: m.id, name: m.name })),
    ingredients_total: val.items.length,
    ingredients_costed: val.items.length - uncosted.length,
    ingredients_uncosted: uncosted.slice(0, LIST_MAX).map(i => ({ id: i.id, name: i.name })),
    ingredients_mapped: val.items.length - unmapped.length,
    ingredients_unmapped: unmapped.slice(0, LIST_MAX).map(i => ({ id: i.id, name: i.name })),
    last_stock_take_at: lastTake && lastTake.at ? lastTake.at : null,
    deduct_rows_30d: Number(deduct.n) || 0,
  };
}

module.exports = { restaurantValuation, stockItemValuation, restaurantReadiness, storeIngredients };
