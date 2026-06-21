const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Op, fn, col } = require('sequelize');
const Coupon = require('../models/Coupon');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');
const { authenticateToken, userCanAccessRestaurant } = require('../middleware/auth');

// ──────────────────────────────────────────────────────────────────────────────
// Coupon groups — FG/BG "전 매장 / 선택 매장" 다매장 쿠폰 발행.
// 쿠폰은 매장당 1행으로 materialize(restaurant_id+code 유니크) → 결제/검증 로직(orders-crud /
// mobile-orders / coupons validate)은 무변경(인쇄 인접 코드 접촉 0). 형제 행은 scope_group_id 로 묶어
// 목록/수정/삭제를 묶음 단위로 처리. 단일매장 쿠폰(scope_group_id NULL)은 여기 안 잡힘.
// ──────────────────────────────────────────────────────────────────────────────

// 발행 주체(brand/foodcourt) 소유 검증 + 산하 매장 목록 반환. 권한 없으면 null.
async function resolveOwnerScope(user, ownerType, ownerId) {
  const id = parseInt(ownerId, 10);
  if (!id || (ownerType !== 'brand' && ownerType !== 'foodcourt')) return null;
  if (ownerType === 'brand') {
    const brand = await Brand.findByPk(id, { attributes: ['id', 'owner_id'] });
    if (!brand) return null;
    if (user.role !== 'System Admin' && brand.owner_id !== user.id) return null;
    const rests = await Restaurant.findAll({ where: { brand_id: id }, attributes: ['id', 'name'], order: [['name', 'ASC']] });
    return { ownerType, ownerId: id, restaurants: rests };
  }
  const fc = await Foodcourt.findByPk(id, { attributes: ['id', 'owner_id'] });
  if (!fc) return null;
  if (user.role !== 'System Admin' && fc.owner_id !== user.id) return null;
  const rests = await Restaurant.findAll({ where: { foodcourt_id: id }, attributes: ['id', 'name'], order: [['name', 'ASC']] });
  return { ownerType, ownerId: id, restaurants: rests };
}

// 쿠폰 정의 필드만 추출(스코프/식별 제외). create/update 공통.
function definitionFields(body) {
  const toJSON = (v) => (Array.isArray(v) ? v : (v == null ? null : v));
  return {
    name: body.name || null,
    description: body.description || null,
    type: body.type,
    value: body.value,
    min_order: body.min_order || 0,
    max_discount: body.max_discount != null ? body.max_discount : null,
    usage_limit: body.usage_limit != null && body.usage_limit !== '' ? parseInt(body.usage_limit, 10) : null,
    per_user_limit: body.per_user_limit != null && body.per_user_limit !== '' ? parseInt(body.per_user_limit, 10) : null,
    valid_from: body.valid_from || null,
    valid_until: body.valid_until || null,
    is_active: body.is_active !== false,
    applicable_order_types: toJSON(body.applicable_order_types),
    target_type: body.target_type || 'all',
    target_customer_ids: toJSON(body.target_customer_ids),
    target_loyalty_tiers: toJSON(body.target_loyalty_tiers)
  };
}

// 한 그룹의 형제 행들 → UI용 단일 묶음 객체(대표값 + 대상 매장 목록).
function groupRows(rows, restaurantNameById) {
  const head = rows[0];
  return {
    scope_group_id: head.scope_group_id,
    scope_owner_type: head.scope_owner_type,
    scope_owner_id: head.scope_owner_id,
    scope_mode: head.scope_mode,
    code: head.code,
    name: head.name,
    description: head.description,
    type: head.type,
    value: head.value,
    min_order: head.min_order,
    max_discount: head.max_discount,
    usage_limit: head.usage_limit,
    per_user_limit: head.per_user_limit,
    valid_from: head.valid_from,
    valid_until: head.valid_until,
    is_active: head.is_active,
    applicable_order_types: head.applicable_order_types,
    target_type: head.target_type,
    target_customer_ids: head.target_customer_ids,
    target_loyalty_tiers: head.target_loyalty_tiers,
    restaurant_ids: rows.map(r => r.restaurant_id),
    restaurant_names: rows.map(r => restaurantNameById[r.restaurant_id] || `#${r.restaurant_id}`),
    restaurant_count: rows.length,
    usage_count_total: rows.reduce((s, r) => s + (Number(r.usage_count) || 0), 0)
  };
}

// GET /api/coupon-groups?ownerType=brand&ownerId=1 — 발행 주체의 쿠폰 묶음 목록
router.get('/', authenticateToken, async (req, res) => {
  try {
    const scope = await resolveOwnerScope(req.user, req.query.ownerType, req.query.ownerId);
    if (!scope) return res.status(403).json({ success: false, message: 'Not authorized for this brand/foodcourt' });

    const nameById = {};
    scope.restaurants.forEach(r => { nameById[r.id] = r.name; });

    const rows = await Coupon.findAll({
      where: { scope_owner_type: scope.ownerType, scope_owner_id: scope.ownerId, scope_group_id: { [Op.ne]: null } },
      order: [['scope_group_id', 'ASC'], ['restaurant_id', 'ASC']]
    });
    const byGroup = new Map();
    for (const r of rows) {
      if (!byGroup.has(r.scope_group_id)) byGroup.set(r.scope_group_id, []);
      byGroup.get(r.scope_group_id).push(r);
    }
    const groups = Array.from(byGroup.values()).map(g => groupRows(g, nameById));
    // 최신순(시간 컬럼 없이 group id 역순 — id 에 timestamp 포함)
    groups.sort((a, b) => (a.scope_group_id < b.scope_group_id ? 1 : -1));
    res.json({ success: true, data: groups, restaurants: scope.restaurants });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// 대상 매장 결정: all → 산하 전체, selected → 교집합(소유 매장으로 제한)
function resolveTargets(scope, scopeMode, restaurantIds) {
  const owned = new Set(scope.restaurants.map(r => r.id));
  if (scopeMode === 'all') return scope.restaurants.map(r => r.id);
  const req = (Array.isArray(restaurantIds) ? restaurantIds : []).map(n => parseInt(n, 10)).filter(Boolean);
  return req.filter(id => owned.has(id));
}

// POST /api/coupon-groups — 묶음 생성(매장별 fan-out)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const scope = await resolveOwnerScope(req.user, req.body.ownerType, req.body.ownerId);
    if (!scope) return res.status(403).json({ success: false, message: 'Not authorized for this brand/foodcourt' });

    const code = (req.body.code || '').trim().toUpperCase();
    const scopeMode = req.body.scope_mode === 'selected' ? 'selected' : 'all';
    if (!code || !req.body.type || req.body.value === undefined || req.body.value === null || req.body.value === '') {
      return res.status(400).json({ success: false, message: 'code, type and value are required' });
    }
    const targets = resolveTargets(scope, scopeMode, req.body.restaurant_ids);
    if (targets.length === 0) {
      return res.status(400).json({ success: false, message: 'Select at least one restaurant to apply the coupon.' });
    }
    // 소유권 방어(컬럼 신뢰 X — userCanAccessRestaurant 로 재확인)
    for (const rid of targets) {
      if (!(await userCanAccessRestaurant(req.user, rid))) {
        return res.status(403).json({ success: false, message: `No access to restaurant ${rid}` });
      }
    }
    // 코드 충돌(대상 매장 중 같은 코드가 이미 있으면 거부)
    const conflict = await Coupon.findOne({ where: { restaurant_id: { [Op.in]: targets }, code }, attributes: ['restaurant_id'] });
    if (conflict) {
      return res.status(400).json({ success: false, code: 'CODE_EXISTS', message: `Coupon code "${code}" already exists in one of the selected restaurants.` });
    }

    const groupId = `cg_${scope.ownerType[0]}${scope.ownerId}_${Date.now().toString(36)}_${crypto.randomBytes(3).toString('hex')}`;
    const def = definitionFields(req.body);
    const rows = [];
    for (const rid of targets) {
      rows.push(await Coupon.create({
        ...def,
        restaurant_id: rid,
        code,
        scope_group_id: groupId,
        scope_owner_type: scope.ownerType,
        scope_owner_id: scope.ownerId,
        scope_mode: scopeMode
      }));
    }
    const nameById = {}; scope.restaurants.forEach(r => { nameById[r.id] = r.name; });
    res.status(201).json({ success: true, data: groupRows(rows, nameById) });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// 그룹 로드 + 소유권 검증. 반환 { rows, scope } 또는 null.
async function loadGroup(user, groupId) {
  const rows = await Coupon.findAll({ where: { scope_group_id: groupId }, order: [['restaurant_id', 'ASC']] });
  if (rows.length === 0) return null;
  const scope = await resolveOwnerScope(user, rows[0].scope_owner_type, rows[0].scope_owner_id);
  if (!scope) return null;
  return { rows, scope };
}

// PUT /api/coupon-groups/:groupId — 정의 일괄 수정 + 대상 매장 reconcile
router.put('/:groupId', authenticateToken, async (req, res) => {
  try {
    const loaded = await loadGroup(req.user, req.params.groupId);
    if (!loaded) return res.status(404).json({ success: false, message: 'Coupon group not found or not authorized' });
    const { rows, scope } = loaded;

    const code = (req.body.code || rows[0].code || '').trim().toUpperCase();
    const scopeMode = req.body.scope_mode === 'selected' ? 'selected' : (req.body.scope_mode === 'all' ? 'all' : rows[0].scope_mode);
    if (!code || !req.body.type || req.body.value === undefined || req.body.value === null || req.body.value === '') {
      return res.status(400).json({ success: false, message: 'code, type and value are required' });
    }
    const targets = resolveTargets(scope, scopeMode, req.body.restaurant_ids);
    if (targets.length === 0) {
      return res.status(400).json({ success: false, message: 'Select at least one restaurant to apply the coupon.' });
    }
    for (const rid of targets) {
      if (!(await userCanAccessRestaurant(req.user, rid))) {
        return res.status(403).json({ success: false, message: `No access to restaurant ${rid}` });
      }
    }
    const existingByRid = new Map(rows.map(r => [r.restaurant_id, r]));
    const targetSet = new Set(targets);

    // 코드 충돌 검사 — 다른 그룹/단일 쿠폰이 같은 코드를 쓰는 대상 매장 거부
    const conflict = await Coupon.findOne({
      where: { restaurant_id: { [Op.in]: targets }, code, scope_group_id: { [Op.ne]: req.params.groupId } },
      attributes: ['restaurant_id']
    });
    if (conflict) {
      return res.status(400).json({ success: false, code: 'CODE_EXISTS', message: `Coupon code "${code}" already exists in one of the selected restaurants.` });
    }

    const def = definitionFields(req.body);
    // 1) 유지/추가 매장 upsert
    for (const rid of targets) {
      const cur = existingByRid.get(rid);
      if (cur) {
        await cur.update({ ...def, code, scope_mode: scopeMode });
      } else {
        await Coupon.create({
          ...def, restaurant_id: rid, code,
          scope_group_id: req.params.groupId, scope_owner_type: scope.ownerType, scope_owner_id: scope.ownerId, scope_mode: scopeMode
        });
      }
    }
    // 2) 빠진 매장 삭제
    for (const r of rows) {
      if (!targetSet.has(r.restaurant_id)) await r.destroy();
    }
    const refreshed = await Coupon.findAll({ where: { scope_group_id: req.params.groupId }, order: [['restaurant_id', 'ASC']] });
    const nameById = {}; scope.restaurants.forEach(rr => { nameById[rr.id] = rr.name; });
    res.json({ success: true, data: groupRows(refreshed, nameById) });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// DELETE /api/coupon-groups/:groupId — 형제 행 일괄 삭제
router.delete('/:groupId', authenticateToken, async (req, res) => {
  try {
    const loaded = await loadGroup(req.user, req.params.groupId);
    if (!loaded) return res.status(404).json({ success: false, message: 'Coupon group not found or not authorized' });
    await Coupon.destroy({ where: { scope_group_id: req.params.groupId } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
