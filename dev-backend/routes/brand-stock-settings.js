'use strict';
/**
 * 브랜드 재고 설정 한 창 — GET/PUT /api/brands/:brandId/stock-settings
 *   (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §4)
 *
 * Irene: «막을지 안막을지는 설정으로 할 수 있게 … 재고관리 관련 설정 어딘가에 같이 묶어서 알기 쉽게»
 *
 * 저장 = brands.operation_settings.stock { short_order_policy, morning_alert{enabled,hour}, include_soon_default }
 *   행 잠금으로 원문을 읽고 그 칸만 바꿔 통째로 쓴다(profitability.js 와 같은 방식 — 부분 저장이 다른 칸을 지우지 않게).
 *   재고가 주인 단위 한 덩어리라 **그 사용자 범위 브랜드 전부**에 같은 값을 쓴다.
 * 가드(파일 안 · server.js 는 정확한 경로 마운트):
 *   GET = Brand General · Brand Manager · System Admin — 범위 밖 브랜드는 404(존재를 알리지 않는다)
 *   PUT = Brand General · System Admin (Brand Manager 403)
 */
const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { sequelize } = require('../config/database');
const { stockSettingsOf, validateStockSettingsInput } = require('../utils/brandStockPolicy');
const { brandIdsForUser } = require('../utils/managerBrandScope');
const { logActivity } = require('../utils/activityLogger');

const router = express.Router({ mergeParams: true });
const fail = (res, status, message) => res.status(status).json({ success: false, message });

/** 이 사용자가 이 브랜드 설정을 볼 수 있나 · 함께 저장될 범위 브랜드 */
async function scopeFor(req) {
  const brandId = parseInt(req.params.brandId, 10);
  if (!Number.isFinite(brandId)) return { brandId: null, ids: [] };
  if (req.user.role === 'System Admin') {
    // 시스템 관리자는 그 브랜드 주인의 브랜드 전부(같은 재고)
    const [[b]] = await sequelize.query('SELECT owner_id FROM brands WHERE id = :id', { replacements: { id: brandId } });
    if (!b) return { brandId, ids: [] };
    const [rows] = b.owner_id
      ? await sequelize.query('SELECT id FROM brands WHERE owner_id = :o', { replacements: { o: b.owner_id } })
      : [[{ id: brandId }]];
    return { brandId, ids: rows.map(r => Number(r.id)) };
  }
  const ids = (await brandIdsForUser(req.user)).map(Number);
  return { brandId, ids: ids.includes(brandId) ? ids : [] };
}

const viewRoles = requireRole('Brand General', 'Brand Manager', 'System Admin');
const editRoles = requireRole('Brand General', 'System Admin');

router.get('/', authenticateToken, viewRoles, async (req, res) => {
  try {
    const { brandId, ids } = await scopeFor(req);
    if (!brandId || !ids.length) return fail(res, 404, 'Brand not found');
    const [rows] = await sequelize.query('SELECT id, name, operation_settings FROM brands WHERE id IN (:ids) ORDER BY id', { replacements: { ids } });
    const me = rows.find(r => Number(r.id) === brandId);
    if (!me) return fail(res, 404, 'Brand not found');
    let tz = 'Asia/Kuala_Lumpur';
    try { const os = typeof me.operation_settings === 'string' ? JSON.parse(me.operation_settings) : me.operation_settings; if (os && os.timeZone) tz = os.timeZone; } catch { /* 기본 시간대 */ }
    res.json({
      success: true,
      data: {
        settings: stockSettingsOf(me.operation_settings),
        applies_to: rows.map(r => ({ id: Number(r.id), name: r.name })),
        timezone: tz,
        can_edit: ['Brand General', 'System Admin'].includes(req.user.role),
      }
    });
  } catch (e) {
    console.error('[brand-stock-settings] GET error:', e.message);
    fail(res, 500, 'Failed to load stock settings');
  }
});

router.put('/', authenticateToken, editRoles, async (req, res) => {
  try {
    let next;
    try { next = validateStockSettingsInput(req.body); } catch (e) { return fail(res, e.status || 400, e.message); }
    const { brandId, ids } = await scopeFor(req);
    if (!brandId || !ids.length) return fail(res, 404, 'Brand not found');

    let before = null, after = null;
    await sequelize.transaction(async (transaction) => {
      for (const id of ids) {
        const [[row]] = await sequelize.query('SELECT operation_settings FROM brands WHERE id = :id FOR UPDATE', { replacements: { id }, transaction });
        if (!row) continue;
        let os = {};
        if (row.operation_settings) {
          try { os = (typeof row.operation_settings === 'string' ? JSON.parse(row.operation_settings) : row.operation_settings) || {}; }
          catch { throw new Error('operation_settings parse error — refusing to overwrite'); }
        }
        const cur = stockSettingsOf(os);
        const merged = {
          ...cur, ...next,
          morning_alert: { ...cur.morning_alert, ...(next.morning_alert || {}) },
        };
        if (id === brandId) { before = cur; after = merged; }
        os.stock = merged;
        await sequelize.query('UPDATE brands SET operation_settings = :v WHERE id = :id', { replacements: { v: JSON.stringify(os), id }, transaction });
      }
    });

    // «막기» 를 켜고 끈 기록은 남아야 한다 — 매장이 «왜 못 보냈나» 를 물을 때
    await logActivity(req, {
      action_type: 'update', entity_type: 'brand_settings', entity_id: brandId,
      entity_name: 'brand_stock_settings', changes: { stock: { from: before, to: after }, brands: ids },
      description: `Brand stock settings updated (blocking ${after && after.short_order_policy === 'block' ? 'on' : 'off'})`
    });
    res.json({ success: true, data: { settings: after, applies_to_ids: ids } });
  } catch (e) {
    console.error('[brand-stock-settings] PUT error:', e.message);
    fail(res, 500, 'Failed to save stock settings');
  }
});

module.exports = router;
