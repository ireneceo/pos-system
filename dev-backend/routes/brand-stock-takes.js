// 본사 창고(BG 재고아이템) 실사 (2026-10-08 · Fable 판정 Ⅱ-3-E)
//   매장 실사(routes/inventory-core.js)와 같은 표·같은 규칙 — 대상만 product_ingredients(소유 계정 범위)다.
//   센 항목만 반영 · 실사 시작 뒤 움직임 보정 · 재고 반영은 services/stockLedger(장부 수량 = 실측 − 지금 재고).
//   /api/product-ingredients/stock-takes 로 마운트 — BG 재고 화면(product-ingredients)과 같은 소유 범위(requireBGScope).
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope } = require('../middleware/brandScope');
const { StockTake, StockTakeItem, ProductIngredient } = require('../models');
const stockLedger = require('../services/stockLedger');
const { perBaseCost } = require('../utils/recipeCost');

router.use(authenticateToken, requireBGScope);
// 본사 실사는 소유 계정이 있어야 한다(System Admin 은 ?owner_user_id=N 으로 대신)
router.use((req, res, next) => (req.bgOwnerId == null
  ? res.status(400).json({ success: false, message: 'owner_user_id required' }) : next()));

const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
// 화면(StockTakePage)은 매장 실사와 같은 모양을 읽는다 — 줄의 대상(재고아이템)을 «ingredient» 자리에 실어 준다
const shape = (st) => {
  if (!st) return st;
  const j = st.toJSON ? st.toJSON() : st;
  j.items = (j.items || []).map(it => ({ ...it, ingredient_id: it.product_ingredient_id, ingredient: it.productIngredient || null }));
  return j;
};
const loadFull = (id) => StockTake.findByPk(id, {
  include: [{ model: StockTakeItem, as: 'items', include: [{ model: ProductIngredient, as: 'productIngredient', attributes: ['id', 'name', 'unit', 'base_quantity', 'category_id'] }] }],
});
const ownedTake = async (id, ownerId) => {
  const st = await StockTake.findByPk(id);
  return st && st.owner_user_id != null && Number(st.owner_user_id) === Number(ownerId) ? st : null;
};

router.get('/', async (req, res) => {
  try {
    const rows = await StockTake.findAll({ where: { owner_user_id: req.bgOwnerId }, order: [['created_at', 'DESC']], limit: 30 });
    res.json({ success: true, data: rows });
  } catch (e) { console.error('BG stock takes list:', e); res.status(500).json({ success: false, message: 'Failed to load stock takes' }); }
});

router.get('/:id', async (req, res) => {
  try {
    if (!(await ownedTake(req.params.id, req.bgOwnerId))) return res.status(404).json({ success: false, message: 'Stock take not found' });
    res.json({ success: true, data: shape(await loadFull(req.params.id)) });
  } catch (e) { console.error('BG stock take get:', e); res.status(500).json({ success: false, message: 'Failed to load stock take' }); }
});

router.post('/', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const busy = await StockTake.findOne({ where: { owner_user_id: req.bgOwnerId, status: 'in_progress' }, transaction: t });
    if (busy) { await t.rollback(); return res.status(400).json({ success: false, message: 'There is already an in-progress stock take', existing_id: busy.id }); }
    const categoryIds = Array.isArray(req.body && req.body.category_ids) ? req.body.category_ids.map(Number).filter(n => Number.isInteger(n) && n > 0) : [];
    const items = await ProductIngredient.findAll({
      where: { owner_user_id: req.bgOwnerId, is_active: true, ...(categoryIds.length ? { category_id: categoryIds } : {}) }, transaction: t,
    });
    if (!items.length) { await t.rollback(); return res.status(400).json({ success: false, code: 'NO_ITEMS', message: 'No stock items to count' }); }
    const st = await StockTake.create({ owner_user_id: req.bgOwnerId, restaurant_id: null, stock_take_date: new Date(), status: 'in_progress', notes: req.body?.notes || null, created_by: req.user.id }, { transaction: t });
    for (const p of items) {
      await StockTakeItem.create({ stock_take_id: st.id, product_ingredient_id: p.id, ingredient_id: null, theoretical_stock: parseFloat(p.current_stock) || 0, unit_cost: parseFloat(p.unit_cost) || 0 }, { transaction: t });
    }
    await StockTake.update({ total_items: items.length }, { where: { id: st.id }, transaction: t });
    await t.commit();
    res.json({ success: true, data: shape(await loadFull(st.id)) });
  } catch (e) { await t.rollback(); console.error('BG stock take create:', e); res.status(500).json({ success: false, message: 'Failed to create stock take' }); }
});

router.put('/:id/items', async (req, res) => {
  try {
    const st = await ownedTake(req.params.id, req.bgOwnerId);
    if (!st || st.status !== 'in_progress') return res.status(404).json({ success: false, message: 'Stock take not found or not in progress' });
    for (const item of (req.body.items || [])) {
      const actual = parseFloat(item.actual_stock);
      if (isNaN(actual)) continue;
      const row = await StockTakeItem.findByPk(item.id, { include: [{ model: ProductIngredient, as: 'productIngredient', attributes: ['base_quantity'] }] });
      if (!row || Number(row.stock_take_id) !== Number(st.id)) continue; // 남의 실사 줄 섞기 금지
      const variance = r2(parseFloat(row.theoretical_stock) - actual);
      await row.update({ actual_stock: actual, variance, variance_value: r2(variance * perBaseCost(row.unit_cost, row.productIngredient && row.productIngredient.base_quantity)),
        variance_reason: item.variance_reason || null, notes: item.notes || null, counted_at: new Date() });
    }
    res.json({ success: true, data: shape(await loadFull(st.id)) });
  } catch (e) { console.error('BG stock take items:', e); res.status(500).json({ success: false, message: 'Failed to save items' }); }
});

router.post('/:id/complete', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const st = await ownedTake(req.params.id, req.bgOwnerId);
    if (!st || st.status !== 'in_progress') { await t.rollback(); return res.status(404).json({ success: false, message: 'Stock take not found or not in progress' }); }
    const items = await StockTakeItem.findAll({ where: { stock_take_id: st.id, actual_stock: { [Op.ne]: null } }, transaction: t });
    const total = await StockTakeItem.count({ where: { stock_take_id: st.id }, transaction: t });
    if (!items.length) { await t.rollback(); return res.status(400).json({ success: false, code: 'NOTHING_COUNTED', message: 'No items have been counted yet' }); }
    const moves = await database.sequelize.query(
      `SELECT product_ingredient_id k, SUM(quantity_change) q FROM inventory_transactions
        WHERE product_ingredient_id IN (:ids) AND created_at >= :since AND transaction_type <> 'stock_take' GROUP BY product_ingredient_id`,
      { replacements: { ids: items.map(i => i.product_ingredient_id), since: st.created_at }, type: database.sequelize.QueryTypes.SELECT, transaction: t });
    const moved = new Map(moves.map(m => [Number(m.k), Number(m.q) || 0]));
    let totalVar = 0; let withVar = 0; let totalTheo = 0; const movement = [];
    for (const it of items) {
      const p = await ProductIngredient.findByPk(it.product_ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!p) continue;
      const per = perBaseCost(it.unit_cost, p.base_quantity);
      const mv = r2(moved.get(Number(p.id)) || 0);
      const expected = r2(parseFloat(it.theoretical_stock) + mv);
      const variance = r2(expected - parseFloat(it.actual_stock));
      const value = r2(variance * per);
      if (mv) movement.push({ item_id: it.id, product_ingredient_id: p.id, movement: mv, expected });
      await it.update({ variance, variance_value: value }, { transaction: t });
      totalTheo += expected * per;
      if (variance) { withVar++; totalVar += value; }
      await stockLedger.record({
        target: { kind: 'product_ingredient', row: p }, entity: { type: 'brand', id: req.user?.brand_id || null },
        type: 'stock_take', setTo: parseFloat(it.actual_stock), cost: { unit_cost: it.unit_cost, base_quantity: p.base_quantity },
        refs: { stock_take_id: st.id }, notes: `Stock take adjustment - Reason: ${it.variance_reason || 'not specified'}`,
        userId: req.user.id, transaction: t,
      });
      await p.update({ last_actual_stock: parseFloat(it.actual_stock), last_stock_take_at: new Date() }, { transaction: t });
    }
    await st.update({ status: 'completed', items_with_variance: withVar, total_variance_value: r2(totalVar),
      variance_percentage: totalTheo > 0 ? (totalVar / totalTheo) * 100 : 0, completed_at: new Date() }, { transaction: t });
    await t.commit();
    res.json({ success: true, data: shape(await loadFull(st.id)), skipped_count: total - items.length, movement_since_start: movement });
  } catch (e) { await t.rollback(); console.error('BG stock take complete:', e); res.status(500).json({ success: false, message: 'Failed to complete stock take' }); }
});

router.post('/:id/cancel', async (req, res) => {
  try {
    const st = await ownedTake(req.params.id, req.bgOwnerId);
    if (!st || st.status !== 'in_progress') return res.status(404).json({ success: false, message: 'Stock take not found or not in progress' });
    await st.update({ status: 'cancelled' });
    res.json({ success: true, message: 'Stock take cancelled' });
  } catch (e) { console.error('BG stock take cancel:', e); res.status(500).json({ success: false, message: 'Failed to cancel stock take' }); }
});

module.exports = router;
