/**
 * routes/profitability.js — 수익성 분석 1단계 (설계 .claude/fable-design-20261029-brand-profitability.md §5)
 *
 * 두 라우터:
 *   store  → /api/restaurants/:restaurantId/profitability/...  (매장 1개 — 매장·오너·브랜드가 같은 길)
 *   scope  → /api/profitability/...                            (오너 소유 매장 · 브랜드 매장 비교)
 * 계산은 services/profitability 한 곳 — 역할마다 다른 것은 매장 id 목록뿐.
 *
 * 가드(파일 안에서 건다 — server.js 는 정확한 경로에 마운트, 경로 없는 router.use 금지 [[reference_router_use_leaks_to_api_root]]):
 *   보기 = authenticateToken + checkRestaurantAccess + 역할(VIEW_ROLES) + requireRestaurantModule('profit_analysis')
 *   설정·운영비·시뮬레이터 = + 역할(MANAGE_ROLES: 매장·오너·시스템 관리자) — 운영비(임대료 등)는 Q1-A 에 따라 브랜드에 기본 비공개
 *   Brand Manager = 금액 칸을 응답에서 뺀다(financial_redacted — 기존 프랜차이즈 대시보드와 같은 선). 비율·수량은 보인다.
 *   Staff·푸드코트 역할 = 이번 범위 밖(§0 · §11).
 */
const express = require('express');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { requireRestaurantModule, resolveRestaurantModules } = require('../middleware/requireModule');
const { sequelize } = require('../config/database');
const svc = require('../services/profitability');

const VIEW_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner', 'Brand General', 'Brand Manager'];
const MANAGE_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner'];
const COST_CATEGORIES = ['rent', 'royalty', 'marketing_fund', 'utilities', 'other_fixed'];
const COST_RULES = ['fixed', 'pct', 'max'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 금액 칸 — Brand Manager 응답에서 키째 뺀다(null 이 아니라 없음)
const MONEY_KEYS = new Set([
  'gross_sales', 'discounts', 'net_sales', 'fees', 'avg_ticket', 'contribution', 'contribution_per_order',
  'unit_cost', 'cost', 'unit_contribution', 'avg_price', 'other_income', 'staff_meal', 'monthly_net_sales',
  'contribution_line',
]);
function redactMoney(v) {
  if (Array.isArray(v)) return v.map(redactMoney);
  if (!v || typeof v !== 'object') return v;
  const out = {};
  for (const [k, val] of Object.entries(v)) if (!MONEY_KEYS.has(k)) out[k] = redactMoney(val);
  return out;
}
const shape = (req, data) => (req.user.role === 'Brand Manager' ? { ...redactMoney(data), financial_redacted: true } : data);

const fail = (res, status, message, code) => res.status(status).json({ success: false, message, ...(code ? { code } : {}) });
function serverError(res, e, where) {
  if (e.status === 400 || e.status === 404) return fail(res, e.status, e.message);
  console.error(`[profitability] ${where}:`, e.message);
  return fail(res, 500, 'Internal server error');
}

// ───────────────────────── 매장 1개 ─────────────────────────
const store = express.Router({ mergeParams: true });
const rid = (req) => parseInt(req.params.restaurantId, 10);
/**
 * 매장 접근 — 브랜드 사람(BG·BM)은 «내 브랜드의 매장»(utils/managerBrandScope.brandRestaurantIdsForUser, 비교 표와 같은 규칙 · 설계 §5),
 * 나머지 역할은 기존 checkRestaurantAccess. checkRestaurantAccess 는 BG 에게 매니저 행·admin_id 만 봐서
 * «비교 표엔 보이는데 눌러 들어가면 403» 이 났다(2026-10-29 Fable 게이트 실측: 소유 브랜드 매장 4개 중 3개).
 * 남의 브랜드 매장은 404 — 비교 라우트와 같은 답(있는지 없는지 알려 주지 않는다).
 */
const BRAND_ROLES = ['Brand General', 'Brand Manager'];
async function storeAccess(req, res, next) {
  if (!req.user || !BRAND_ROLES.includes(req.user.role)) return checkRestaurantAccess(req, res, next);
  try {
    const { brandRestaurantIdsForUser } = require('../utils/managerBrandScope');
    const ids = await brandRestaurantIdsForUser(req.user);
    if (!ids.map(Number).includes(rid(req))) return fail(res, 404, 'Restaurant not found');
    return next();
  } catch (e) { return serverError(res, e, 'store access'); }
}
const view = [authenticateToken, storeAccess, requireRole(...VIEW_ROLES), requireRestaurantModule('profit_analysis', 'restaurantId')];
const manage = [authenticateToken, checkRestaurantAccess, requireRole(...MANAGE_ROLES), view[3]];

store.get('/summary', ...view, async (req, res) => {
  try { res.json({ success: true, data: shape(req, await svc.storeSummary(rid(req), req.query.start, req.query.end)) }); }
  catch (e) { serverError(res, e, 'summary'); }
});

store.get('/menus', ...view, async (req, res) => {
  try { res.json({ success: true, data: shape(req, await svc.storeMenus(rid(req), req.query.start, req.query.end)) }); }
  catch (e) { serverError(res, e, 'menus'); }
});

store.get('/order-mix', ...view, async (req, res) => {
  try { res.json({ success: true, data: shape(req, await svc.storeOrderMix(rid(req), req.query.start, req.query.end)) }); }
  catch (e) { serverError(res, e, 'order-mix'); }
});

store.get('/sim-baseline', ...manage, async (req, res) => {
  try { res.json({ success: true, data: await svc.storeSimBaseline(rid(req), req.query.end) }); }
  catch (e) { serverError(res, e, 'sim-baseline'); }
});

store.get('/settings', ...manage, async (req, res) => {
  try {
    const [[row]] = await sequelize.query('SELECT operation_settings FROM restaurants WHERE id = :id', { replacements: { id: rid(req) } });
    if (!row) return fail(res, 404, 'Restaurant not found');
    res.json({ success: true, data: { ...svc.readSettings(row.operation_settings), fee_keys: svc.FEE_KEYS, channel_fee_keys: svc.CHANNEL_FEE_KEYS } });
  } catch (e) { serverError(res, e, 'settings get'); }
});

/** 0~100 숫자 사전만 통과 — 모르는 키는 버린다 */
function pctMap(input, keys, label) {
  if (input === undefined) return undefined;
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw Object.assign(new Error(`${label} must be an object`), { status: 400 });
  const out = {};
  for (const k of keys) {
    if (!(k in input) || input[k] === '' || input[k] === null) continue;
    const n = Number(input[k]);
    if (!Number.isFinite(n) || n < 0 || n > 100) throw Object.assign(new Error(`${label}.${k} must be 0–100`), { status: 400 });
    out[k] = Math.round(n * 100) / 100;
  }
  return out;
}

/**
 * 설정 저장 — operation_settings 의 profitability 칸만 바꾼다. DB 원문을 행 잠금으로 읽고 그 칸만 바꿔 통째로 쓴다
 * (부분 저장이 다른 칸을 지우는 사고 [[reference_partial_save_overwrites_unsent]] 방지 · 출퇴근 설정과 같은 방식).
 * 매장 설정 화면 저장이 이 칸을 지우지 않게 settingsGuard 허용 키에 'profitability' 를 넣었다.
 */
store.put('/settings', ...manage, async (req, res) => {
  try {
    const b = req.body || {};
    const next = {};
    const fees = pctMap(b.fees, svc.FEE_KEYS, 'fees');
    if (fees) next.fees = fees;
    const ch = pctMap(b.channel_fees, svc.CHANNEL_FEE_KEYS, 'channel_fees');
    if (ch) next.channel_fees = ch;
    if (b.targets !== undefined) {
      const t = pctMap(b.targets, ['food_cost_pct', 'prime_cost_pct', 'variance_alert_pct'], 'targets');
      for (const [k, v] of Object.entries(t)) if (v < 1) return fail(res, 400, `targets.${k} must be 1–100`);
      next.targets = t;
    }
    if (b.quadrant_baseline !== undefined) {
      if (!['median', 'avg70'].includes(b.quadrant_baseline)) return fail(res, 400, 'quadrant_baseline must be median or avg70');
      next.quadrant_baseline = b.quadrant_baseline;
    }
    if (b.share_with_brand !== undefined) {
      if (!['operations', 'full'].includes(b.share_with_brand)) return fail(res, 400, 'share_with_brand must be operations or full');
      next.share_with_brand = b.share_with_brand;
    }
    const saved = await sequelize.transaction(async (transaction) => {
      const [[row]] = await sequelize.query('SELECT operation_settings FROM restaurants WHERE id = :id FOR UPDATE', { replacements: { id: rid(req) }, transaction });
      if (!row) return null;
      let os = {};
      if (row.operation_settings) {
        try { os = (typeof row.operation_settings === 'string' ? JSON.parse(row.operation_settings) : row.operation_settings) || {}; }
        catch { throw new Error('operation_settings parse error — refusing to overwrite'); }
      }
      const cur = os.profitability || {};
      os.profitability = {
        ...cur, ...next,
        targets: next.targets ? { ...(cur.targets || {}), ...next.targets } : cur.targets,
      };
      await sequelize.query('UPDATE restaurants SET operation_settings = :v WHERE id = :id', { replacements: { v: JSON.stringify(os), id: rid(req) }, transaction });
      return os;
    });
    if (!saved) return fail(res, 404, 'Restaurant not found');
    res.json({ success: true, data: { ...svc.readSettings(saved), fee_keys: svc.FEE_KEYS, channel_fee_keys: svc.CHANNEL_FEE_KEYS } });
  } catch (e) { serverError(res, e, 'settings put'); }
});

/** 운영비 규칙 입력 검사 — 규칙에 필요한 숫자가 있어야 한다 */
function costEntryInput(b, existing) {
  const v = { ...(existing || {}) };
  const err = (m) => Object.assign(new Error(m), { status: 400 });
  if (b.category !== undefined) { if (!COST_CATEGORIES.includes(b.category)) throw err('category is invalid'); v.category = b.category; }
  if (b.rule !== undefined) { if (!COST_RULES.includes(b.rule)) throw err('rule must be fixed, pct or max'); v.rule = b.rule; }
  if (b.label !== undefined) { const l = String(b.label || '').trim(); if (l.length > 60) throw err('label is too long (max 60)'); v.label = l || null; }
  if (b.note !== undefined) { const n = String(b.note || '').trim(); if (n.length > 255) throw err('note is too long'); v.note = n || null; }
  for (const k of ['fixed_amount', 'pct']) {
    if (b[k] === undefined) continue;
    if (b[k] === null || b[k] === '') { v[k] = null; continue; }
    const n = Number(b[k]);
    if (!Number.isFinite(n) || n < 0 || (k === 'pct' && n > 100) || (k === 'fixed_amount' && n > 1e9)) throw err(`${k} is out of range`);
    v[k] = Math.round(n * 100) / 100;
  }
  for (const k of ['effective_from', 'effective_to']) {
    if (b[k] === undefined) continue;
    if (b[k] === null || b[k] === '') { v[k] = null; continue; }
    if (!DATE_RE.test(b[k])) throw err(`${k} must be YYYY-MM-DD`);
    v[k] = b[k];
  }
  if (!v.category) throw err('category is required');
  const rule = v.rule || 'fixed';
  if ((rule === 'fixed' || rule === 'max') && !(Number(v.fixed_amount) > 0)) throw err('fixed_amount is required for this rule');
  if ((rule === 'pct' || rule === 'max') && !(Number(v.pct) > 0)) throw err('pct is required for this rule');
  if (v.effective_from && v.effective_to && v.effective_to < v.effective_from) throw err('effective_to is before effective_from');
  return v;
}

store.get('/cost-entries', ...manage, async (req, res) => {
  try {
    const { RestaurantCostEntry } = require('../models');
    const rows = await RestaurantCostEntry.findAll({ where: { restaurant_id: rid(req), period_month: null }, order: [['effective_to', 'ASC'], ['category', 'ASC'], ['id', 'ASC']] });
    res.json({ success: true, data: rows.map(svc.costEntryView) });
  } catch (e) { serverError(res, e, 'cost-entries list'); }
});

store.post('/cost-entries', ...manage, async (req, res) => {
  try {
    const { RestaurantCostEntry } = require('../models');
    const v = costEntryInput(req.body || {});
    const row = await RestaurantCostEntry.create({
      restaurant_id: rid(req), category: v.category, label: v.label || null, rule: v.rule || 'fixed',
      fixed_amount: v.fixed_amount ?? null, pct: v.pct ?? null, period_month: null,
      effective_from: v.effective_from || null, effective_to: v.effective_to || null, note: v.note || null,
      created_by: req.user.id,
    });
    res.status(201).json({ success: true, data: svc.costEntryView(row) });
  } catch (e) { serverError(res, e, 'cost-entries create'); }
});

/** 고치기·닫기(effective_to) — 지우는 길은 없다(지난 달 손익이 흔들리지 않게 §4-2) */
store.patch('/cost-entries/:id', ...manage, async (req, res) => {
  try {
    const { RestaurantCostEntry } = require('../models');
    const row = await RestaurantCostEntry.findOne({ where: { id: parseInt(req.params.id, 10), restaurant_id: rid(req) } });
    if (!row) return fail(res, 404, 'Cost entry not found');
    const v = costEntryInput(req.body || {}, svc.costEntryView(row));
    await row.update({
      category: v.category, label: v.label, rule: v.rule, fixed_amount: v.fixed_amount ?? null, pct: v.pct ?? null,
      effective_from: v.effective_from || null, effective_to: v.effective_to || null, note: v.note || null,
    });
    res.json({ success: true, data: svc.costEntryView(row) });
  } catch (e) { serverError(res, e, 'cost-entries update'); }
});

// ───────────────────────── 범위(오너·브랜드) ─────────────────────────
const scope = express.Router();

/** 매장 묶음 → 비교 행 · 모듈 없는 매장은 숫자 없이 표시만 */
async function compareStores(ids, start, end) {
  const { Restaurant } = require('../models');
  const rows = await Restaurant.findAll({ where: { id: { [Op.in]: ids } }, attributes: ['id', 'name', 'brand_id', 'plan_type', 'is_demo'] });
  const allowed = [];
  const missing = [];
  for (const r of rows) {
    if (r.is_demo) { allowed.push(r.id); continue; }
    const mods = await resolveRestaurantModules(r);
    if (mods.includes('profit_analysis')) allowed.push(r.id); else missing.push({ restaurant_id: r.id, name: r.name, module_missing: true });
  }
  const stores = await svc.storesComparison(allowed.sort((a, b) => a - b), start, end);
  return [...stores, ...missing];
}

scope.get('/owner/stores', authenticateToken, requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const [owned] = await sequelize.query(
      "SELECT restaurant_id FROM restaurant_managers WHERE manager_id = :uid AND relationship_type = 'ownership'",
      { replacements: { uid: req.user.id } }
    );
    const ids = [...new Set(owned.map(r => Number(r.restaurant_id)))];
    res.json({ success: true, data: { stores: await compareStores(ids, req.query.start, req.query.end) } });
  } catch (e) { serverError(res, e, 'owner stores'); }
});

scope.get('/brands', authenticateToken, requireRole('Brand General', 'Brand Manager'), async (req, res) => {
  try {
    const { brandIdsForUser } = require('../utils/managerBrandScope');
    const { Brand } = require('../models');
    const ids = await brandIdsForUser(req.user);
    const brands = ids.length ? await Brand.findAll({ where: { id: { [Op.in]: ids } }, attributes: ['id', 'name'], order: [['name', 'ASC']] }) : [];
    res.json({ success: true, data: brands.map(b => ({ id: b.id, name: b.name })) });
  } catch (e) { serverError(res, e, 'brands'); }
});

scope.get('/brands/:brandId/stores', authenticateToken, requireRole('Brand General', 'Brand Manager'), async (req, res) => {
  try {
    const { brandIdsForUser } = require('../utils/managerBrandScope');
    const { Restaurant } = require('../models');
    const brandId = parseInt(req.params.brandId, 10);
    const mine = await brandIdsForUser(req.user);
    // 형제 브랜드·남의 브랜드는 «없음» 으로 — 있는지 없는지도 알려 주지 않는다
    if (!mine.includes(brandId)) return fail(res, 404, 'Brand not found');
    const rs = await Restaurant.findAll({ where: { brand_id: brandId }, attributes: ['id'] });
    const stores = await compareStores(rs.map(r => r.id), req.query.start, req.query.end);
    res.json({ success: true, data: shape(req, { brand_id: brandId, stores }) });
  } catch (e) { serverError(res, e, 'brand stores'); }
});

module.exports = { store, scope };
