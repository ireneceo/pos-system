/**
 * store-cost-base-quantity.test.js — 매장 원가층 = **기준양(base_quantity)의 가격** (2026-10-04 Fable 판정 E)
 *
 * 운영 실측(2026-09-29): 매장 8 K-소스 5행이 브랜드값 ÷ 1000(0.0279) — 수령이 «취급단위 1 의 가격» 을 썼고
 * 레시피 원가가 그걸 또 ÷ 기준양 해 1000배 작게 나왔다. 이 테스트가 박제하는 계약:
 *   ① 기준양 1000 g 재료를 1 봉(=1000 g) RM 27.90 에 받으면 매장 원가층 = 27.90 (0.0279 아님)
 *   ② 기준양 1 재료는 종전과 같다 (RM 5.00 → 5.00)
 *   ③ 두 번째 수령은 같은 단위(기준양 가격)끼리 가중평균한다
 * 전부 한 트랜잭션 안에서 만들고 끝에 되돌린다 — DB 잔재 0.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const { sequelize } = require('../config/database');
const { Ingredient, RestaurantIngredientCost } = require('../models');
const { receiveIntoIngredient } = require('../services/purchaseOrderReceive');

const RID = 38;          // demo 매장 (brand 17)
const BRAND = 17;
let t;

beforeEach(async () => { t = await sequelize.transaction(); });
afterEach(async () => { if (t && !t.finished) await t.rollback(); });
afterAll(async () => { await sequelize.close(); });

const mkIng = (attrs) => Ingredient.create({
  owner_type: 'brand', brand_id: BRAND, restaurant_id: null, name: `TEST-E-${Date.now()}-${Math.random()}`,
  unit: 'g', category: 'other', min_stock: 0, current_stock: 0, is_active: true, code: '', ...attrs,
}, { transaction: t });
const po = { id: null, entity_type: 'restaurant', entity_id: RID };
const receive = (ing, price, conv, qty) => receiveIntoIngredient({
  item: { ingredient_id: ing.id, unit_conversion: conv, unit_price: price, invoiced_unit_price: null },
  po, quantity: qty, unitCost: null, userId: null, t, note: 'test E', ingredient: ing, currentStock: 0,
});
const overlay = async (ing) => {
  const row = await RestaurantIngredientCost.findOne({ where: { restaurant_id: RID, ingredient_id: ing.id }, transaction: t });
  return row ? parseFloat(row.unit_cost) : null;
};

test('① 기준양 1000 g · 1 봉 RM 27.90 수령 → 매장 원가층 27.90 (기준양 가격)', async () => {
  const ing = await mkIng({ base_quantity: 1000, unit_cost: 27.9 });
  const r = await receive(ing, 27.9, 1000, 1);
  expect(r.ok).toBe(true);
  expect(await overlay(ing)).toBeCloseTo(27.9, 4);
});

test('② 기준양 1 재료는 종전과 같다', async () => {
  const ing = await mkIng({ base_quantity: 1, unit: 'pack', unit_cost: 5 });
  await receive(ing, 5, 1, 2);
  expect(await overlay(ing)).toBeCloseTo(5, 4);
});

test('③ 두 번째 수령은 기준양 가격끼리 가중평균 (27.90 × 1000 g + 31.90 × 1000 g → 29.90)', async () => {
  const ing = await mkIng({ base_quantity: 1000, unit_cost: 27.9 });
  await receive(ing, 27.9, 1000, 1);
  const { stockFor } = require('../utils/brandStockAccess');
  const before = await stockFor(ing, RID, t);
  await receiveIntoIngredient({
    item: { ingredient_id: ing.id, unit_conversion: 1000, unit_price: 31.9, invoiced_unit_price: null },
    po, quantity: 1, unitCost: null, userId: null, t, note: 'test E2', ingredient: ing, currentStock: before,
  });
  expect(await overlay(ing)).toBeCloseTo(29.9, 4);
});
