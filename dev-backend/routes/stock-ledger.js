/**
 * stock-ledger.js — 재고 장부 정렬(이관) + 재고·업체상품 일괄 링크.
 *
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §9-2 / §10
 *
 * 원칙 (전부 설계 확정 사항):
 *   - 경로의 :brandId/:restaurantId 를 **신뢰하지 않는다.** 스코프는 requireBuyerRole 이 서버에서 확정하고,
 *     경로 값과 다르면 403.
 *   - 쓰기는 **항목별 트랜잭션 + 부분성공 리포트** — 한 행 실패가 나머지를 막지 않는다.
 *   - **멱등**: (target, seller_type, seller_entity_id, seller_product_id) 재제출 시 생성 0.
 *   - `apply_cost` 기본 false(원가 자동 덮어쓰기 금지). 재고 추적 스위치는 폐기(Q5 2026-09-01 — 항상 추적).
 *   - 모든 쓰기 1건 = `stock_ledger_batch_items` 1행. **롤백은 이 기록만 보고 한다**(현재 상태로 추론 금지).
 *   - ⛔ `product_ingredients.linked_ingredient_id` 쓰기 금지(반쪽 구현 — 채우면 숫자가 안 움직인다).
 *   - ⛔ 원본 `ingredient_seller_products`(product_ingredient 경유) 행은 **삭제하지 않는다**
 *        — 과거 발주(`purchase_order_items.product_ingredient_id`) 조회가 깨진다.
 */
const express = require('express');
const crypto = require('crypto');
const { Op } = require('sequelize');
const router = express.Router();

const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const {
  Ingredient, ProductIngredient, IngredientSellerProduct, StockLedgerBatchItem,
  Brand, Restaurant, RecipeIngredient, SupplierProduct, SupplierContract,
  BrandProduct, BrandProductBrand, BrandProductRestaurant, FoodcourtProduct
} = require('../models');
const catalogLink = require('../utils/catalogLink');

/**
 * ⚠ 이 라우터는 `app.use('/api', ...)` 로 마운트된다.
 *   따라서 `router.use(...)` 로 전역 미들웨어를 걸면 `/api` 아래 **모든 요청**이 그것을 통과하게 되어
 *   무관한 라우트(예: /api/supplier/orders)가 403 을 받는다. 실제로 그렇게 만들었다가
 *   mount sweep 이 잡았다(2026-08-28). **미들웨어는 라우트마다 붙인다.**
 */
const GATES = [authenticateToken, requireBuyerRole];

/** 경로 파라미터가 서버가 확정한 스코프와 일치하는지. 다르면 403. */
function scopeGuard(paramName, expectedType) {
  return (req, res, next) => {
    const want = parseInt(req.params[paramName], 10);
    const be = req.buyerEntity;
    if (req.buyerIsAdmin && !be) {          // System Admin 이 override 안 했으면 경로를 스코프로 채택
      req.buyerEntity = { type: expectedType, id: want };
      return next();
    }
    if (!be || be.type !== expectedType || be.id !== want) {
      return res.status(403).json({ success: false, message: 'Not your scope' });
    }
    next();
  };
}

/** 이 브랜드를 소유한 사용자 id (BG Stock Items 는 user 기준 컬럼이라 필요). */
async function brandOwnerId(brandId) {
  const b = await Brand.findByPk(brandId, { attributes: ['id', 'owner_id'] });
  return b ? b.owner_id : null;
}

/** 구매자 소유 ingredients 를 정규화 이름으로 색인. */
async function ingredientIndexFor(buyer) {
  const where = buyer.type === 'brand' ? { owner_type: 'brand', brand_id: buyer.id }
    : buyer.type === 'restaurant' ? { owner_type: 'restaurant', restaurant_id: buyer.id }
      : { owner_type: 'foodcourt', foodcourt_id: buyer.id };
  const rows = await Ingredient.findAll({ where, attributes: ['id', 'name', 'unit', 'unit_cost'] });
  const byName = new Map();
  for (const r of rows) {
    const k = catalogLink.normalizeName(r.name);
    if (!byName.has(k)) byName.set(k, r);      // 동명이 여럿이면 첫 행만 제안(병합 금지)
  }
  return { rows, byName };
}

/** ingredient id 별 레시피 사용 건수. */
async function recipeUsageCount(ingredientIds) {
  if (!ingredientIds.length) return {};
  const rows = await RecipeIngredient.findAll({
    where: { ingredient_id: ingredientIds },
    attributes: ['ingredient_id']
  });
  const m = {};
  for (const r of rows) m[r.ingredient_id] = (m[r.ingredient_id] || 0) + 1;
  return m;
}

/** 배치 이력 1행 기록. */
function logItem(t, { batchId, buyer, userId, action, targetTable, targetId, sourceRef, before, after, status, error }) {
  return StockLedgerBatchItem.create({
    batch_id: batchId,
    entity_type: buyer.type,
    entity_id: buyer.id,
    action,
    target_table: targetTable,
    target_id: targetId || null,
    source_ref: sourceRef || null,
    payload_before: before || null,
    payload_after: after || null,
    status: status || 'applied',
    error: error || null,
    created_by_user_id: userId
  }, { transaction: t });
}

// ============================================================
// 1. GET /api/brands/:brandId/stock-ledger/migration-preview
//    BG Stock Items(288) → 브랜드 재료 이관 제안
// ============================================================
/**
 * BG Stock Items 의 소유자(user id)를 구매자 스코프에서 찾는다.
 *  - brand 구매자      → 그 브랜드의 owner_id
 *  - restaurant 구매자 → 부모 브랜드의 owner_id (매장은 본사 창고에서 가져온다)
 *
 * ⚠ 2026-08-28 Irene 정정: 이관 목적지는 **매장 자기 재고**다.
 *   처음엔 브랜드 장부에 넣고 매장이 공유로 보게 했는데, 매장 화면에서 읽기 전용이라
 *   "남의 것"으로 보였다. 소유자 의도는 "각각 서로의 재고"였다.
 */
async function stockItemOwnerFor(buyer) {
  if (buyer.type === 'brand') return brandOwnerId(buyer.id);
  if (buyer.type === 'restaurant') {
    const r = await Restaurant.findByPk(buyer.id, { attributes: ['id', 'brand_id'] });
    if (!r || !r.brand_id) return null;
    return brandOwnerId(r.brand_id);
  }
  return null;
}

async function migrationPreviewHandler(req, res) {
    try {
      const buyer = req.buyerEntity;
      const ownerId = await stockItemOwnerFor(buyer);
      if (ownerId == null) return res.status(404).json({ success: false, message: 'No parent brand / stock item owner found' });

      const limit = Math.min(500, Math.max(1, parseInt(req.query.limit, 10) || 100));
      const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
      const filter = ['auto', 'review', 'all'].includes(req.query.filter) ? req.query.filter : 'all';

      const all = await ProductIngredient.findAll({
        where: { owner_user_id: ownerId },
        order: [['id', 'ASC']]
      });
      const { byName } = await ingredientIndexFor(buyer);
      const matchedIds = [];
      const enriched = all.map(pi => {
        const hit = byName.get(catalogLink.normalizeName(pi.name)) || null;
        if (hit) matchedIds.push(hit.id);
        return { pi, hit };
      });
      const usage = await recipeUsageCount([...new Set(matchedIds)]);

      // 각 Stock Item 의 공급처 매핑 (이관 시 복제 대상)
      const srcMaps = await IngredientSellerProduct.findAll({
        where: { product_ingredient_id: all.map(p => p.id), is_active: true }
      });
      const mapsByPi = {};
      for (const m of srcMaps) (mapsByPi[m.product_ingredient_id] ||= []).push(m);

      let items = enriched.map(({ pi, hit }) => ({
        source_ref: `product_ingredient:${pi.id}`,
        source_id: pi.id,
        name: pi.name,
        unit: pi.unit,
        unit_cost: pi.unit_cost,
        seller_sources: (mapsByPi[pi.id] || []).map(m => ({
          seller_type: m.seller_type, seller_entity_id: m.seller_entity_id,
          seller_product_id: m.seller_product_id, unit_price: m.unit_price,
          unit_conversion: m.unit_conversion, min_order_quantity: m.min_order_quantity,
          lead_time_days: m.lead_time_days, is_preferred: m.is_preferred
        })),
        match: hit
          ? { type: 'exact', ingredient_id: hit.id, ingredient_name: hit.name, recipe_usage_count: usage[hit.id] || 0 }
          : { type: 'none', ingredient_id: null, ingredient_name: null, recipe_usage_count: 0 },
        suggested_mode: hit ? 'connect' : 'create'
      }));

      const summary = {
        total: items.length,
        auto: items.filter(i => i.match.type === 'none').length,
        review: items.filter(i => i.match.type === 'exact').length
      };
      if (filter === 'auto') items = items.filter(i => i.match.type === 'none');
      if (filter === 'review') items = items.filter(i => i.match.type === 'exact');

      res.json({ success: true, data: { items: items.slice(offset, offset + limit), summary } });
    } catch (err) {
      console.error('GET stock-ledger/migration-preview error:', err);
      res.status(500).json({ success: false, message: 'Failed to build migration preview' });
    }
}

router.get('/brands/:brandId/stock-ledger/migration-preview', ...GATES, scopeGuard('brandId', 'brand'), migrationPreviewHandler);
router.get('/restaurants/:restaurantId/stock-ledger/migration-preview', ...GATES, checkRestaurantAccess, scopeGuard('restaurantId', 'restaurant'), migrationPreviewHandler);

// ============================================================
// 2. POST /api/brands/:brandId/stock-ledger/migrate
// ============================================================
async function migrateHandler(req, res) {
    const buyer = req.buyerEntity;
    const decisions = Array.isArray(req.body?.decisions) ? req.body.decisions : null;
    const dryRun = req.body?.dry_run === true;
    if (!decisions || decisions.length === 0) {
      return res.status(400).json({ success: false, message: 'decisions[] is required' });
    }
    if (decisions.length > 500) {
      return res.status(400).json({ success: false, message: 'Too many decisions (max 500)' });
    }

    try {
      const ownerId = await stockItemOwnerFor(buyer);
      if (ownerId == null) return res.status(404).json({ success: false, message: 'No parent brand / stock item owner found' });

      // 동시 배치 방지 — 60초 내 같은 스코프의 진행 흔적이 있으면 409
      const recent = await StockLedgerBatchItem.findOne({
        where: {
          entity_type: buyer.type, entity_id: buyer.id,
          created_at: { [Op.gt]: new Date(Date.now() - 60 * 1000) }
        },
        order: [['id', 'DESC']]
      });
      if (recent && req.body?.force !== true && !dryRun) {
        return res.status(409).json({
          success: false, code: 'BATCH_IN_PROGRESS',
          message: 'Another stock ledger batch ran moments ago. Retry shortly.'
        });
      }

      const batchId = crypto.randomUUID();
      const result = { batch_id: batchId, dry_run: dryRun, created: 0, connected: 0, skipped: 0, held: 0, failed: [] };

      for (const d of decisions) {
        const srcId = parseInt(d.source_id, 10);
        const mode = d.mode;
        if (!Number.isFinite(srcId) || !['connect', 'create', 'skip', 'hold'].includes(mode)) {
          result.failed.push({ source_id: d.source_id, reason: 'INVALID_DECISION' });
          continue;
        }
        if (mode === 'skip' || mode === 'hold') {
          if (!dryRun) {
            await logItem(null, {
              batchId, buyer, userId: req.user.id,
              action: mode, targetTable: 'ingredients', targetId: null,
              sourceRef: `product_ingredient:${srcId}`
            });
          }
          result[mode === 'skip' ? 'skipped' : 'held']++;
          continue;
        }

        const t = await Ingredient.sequelize.transaction();
        try {
          const pi = await ProductIngredient.findByPk(srcId, { transaction: t });
          if (!pi || pi.owner_user_id !== ownerId) {
            await t.rollback();
            result.failed.push({ source_id: srcId, reason: 'SOURCE_NOT_IN_SCOPE' });
            continue;
          }

          let target;
          if (mode === 'connect') {
            const tid = parseInt(d.existing_ingredient_id, 10);
            target = Number.isFinite(tid) ? await Ingredient.findByPk(tid, { transaction: t }) : null;
            const ownsTarget = target && target.owner_type === buyer.type && (
              buyer.type === 'brand' ? target.brand_id === buyer.id
              : buyer.type === 'restaurant' ? target.restaurant_id === buyer.id
              : target.foodcourt_id === buyer.id);
            if (!ownsTarget) {
              await t.rollback();
              result.failed.push({ source_id: srcId, reason: 'TARGET_NOT_IN_SCOPE' });
              continue;
            }
          } else {
            // ⛔ F5 (2026-09-04): 브랜드 구매자는 여기서 재료 행을 만들지 않는다.
            //   재료를 만드는 길은 Stock Items 하나뿐 — 출처 없는 브랜드 행이 생기면
            //   인스펙션 ING-UNI-002 가 배포를 막는다. 매장·푸드코트는 그대로 진행.
            if (buyer.type === 'brand') {
              await t.rollback();
              result.failed.push({ source_id: srcId, reason: 'USE_STOCK_ITEMS' });
              continue;
            }
            if (dryRun) { await t.rollback(); result.created++; continue; }
            target = await Ingredient.create({
              owner_type: buyer.type,
              brand_id: buyer.type === 'brand' ? buyer.id : null,
              restaurant_id: buyer.type === 'restaurant' ? buyer.id : null,
              foodcourt_id: buyer.type === 'foodcourt' ? buyer.id : null,
              name: pi.name,
              unit: catalogLink.resolveUnit(null, pi.unit),
              base_quantity: pi.base_quantity || 1,
              unit_cost: parseFloat(pi.unit_cost) || 0,
              min_stock: 0, current_stock: 0,
              is_active: true, code: ''
            }, { transaction: t });
            await logItem(t, {
              batchId, buyer, userId: req.user.id,
              action: 'create_ingredient', targetTable: 'ingredients', targetId: target.id,
              sourceRef: `product_ingredient:${pi.id}`,
              after: { name: target.name, unit: target.unit, unit_cost: target.unit_cost }
            });
            result.created++;
          }

          if (mode === 'connect' && dryRun) { await t.rollback(); result.connected++; continue; }

          // 공급처 매핑 복제 — 원본은 남긴다
          const sources = await IngredientSellerProduct.findAll({
            where: { product_ingredient_id: pi.id, is_active: true }, transaction: t
          });
          for (const src of sources) {
            const dup = await IngredientSellerProduct.findOne({
              where: {
                ingredient_id: target.id, seller_type: src.seller_type,
                seller_entity_id: src.seller_entity_id, seller_product_id: src.seller_product_id
              },
              transaction: t
            });
            if (dup) continue;                                   // 멱등
            const others = await IngredientSellerProduct.count({
              where: { ingredient_id: target.id, is_active: true }, transaction: t
            });
            const created = await IngredientSellerProduct.create({
              ingredient_id: target.id,
              product_ingredient_id: null,
              seller_type: src.seller_type,
              seller_entity_id: src.seller_entity_id,
              seller_product_id: src.seller_product_id,
              unit_price: src.unit_price,
              unit_conversion: src.unit_conversion,
              min_order_quantity: src.min_order_quantity,
              lead_time_days: src.lead_time_days,
              is_preferred: others === 0,
              is_active: true
            }, { transaction: t });
            await logItem(t, {
              batchId, buyer, userId: req.user.id,
              action: 'link_seller', targetTable: 'ingredient_seller_products', targetId: created.id,
              sourceRef: `ingredient_seller_product:${src.id}`,
              after: { ingredient_id: target.id, seller_type: src.seller_type, seller_entity_id: src.seller_entity_id, seller_product_id: src.seller_product_id }
            });
          }

          // 원가 반영은 명시 선택일 때만
          if (d.apply_cost === true && mode === 'connect') {
            const before = target.unit_cost;
            await target.update({ unit_cost: parseFloat(pi.unit_cost) || 0 }, { transaction: t });
            await logItem(t, {
              batchId, buyer, userId: req.user.id,
              action: 'update_cost', targetTable: 'ingredients', targetId: target.id,
              sourceRef: `product_ingredient:${pi.id}`,
              before: { unit_cost: before }, after: { unit_cost: target.unit_cost }
            });
          }

          await t.commit();
          if (mode === 'connect') result.connected++;
        } catch (e) {
          if (!t.finished) await t.rollback();
          result.failed.push({ source_id: srcId, reason: e.message });
        }
      }

      res.json({ success: true, data: result });
    } catch (err) {
      console.error('POST stock-ledger/migrate error:', err);
      res.status(500).json({ success: false, message: 'Migration failed' });
    }
}

router.post('/brands/:brandId/stock-ledger/migrate', ...GATES, scopeGuard('brandId', 'brand'), migrateHandler);
router.post('/restaurants/:restaurantId/stock-ledger/migrate', ...GATES, checkRestaurantAccess, scopeGuard('restaurantId', 'restaurant'), migrateHandler);


// ============================================================
// 판매자 카탈로그 (모드 2) — 구매자가 실제로 살 수 있는 것만 노출
//   판매 관계 규칙은 purchase-orders-crud.verifySellerRelation 과 같은 기준을 따른다:
//     supplier  → 계약(부모 브랜드 상속 포함)
//     brand/foodcourt → **매장 구매자만** (BG_FG_RESTAURANT_ONLY)
//   ⚠ 새 코드라 brand 판매자 식별은 **restaurant 의미(brand_id)만** 쓴다.
//     (기존 4패밀리는 의미가 제각각이다 — utils/catalogLink.js 상단 · 설계문서 §7)
// ============================================================
const VALID_SELLER_TYPES = ['supplier', 'brand', 'foodcourt'];

async function loadSellerCatalog({ buyer, sellerType, sellerEntityId, search }) {
  const term = search ? `%${String(search).trim()}%` : null;
  const like = (fields) => term ? { [Op.or]: fields.map(f => ({ [f]: { [Op.like]: term } })) } : {};

  if (sellerType === 'supplier') {
    const { findEffectiveContract } = require('../utils/supplierAccess');
    const contract = await findEffectiveContract(sellerEntityId, buyer);
    if (!contract) return { error: { status: 403, code: 'NO_ACTIVE_CONTRACT', message: 'No active contract with this supplier' } };
    const rows = await SupplierProduct.findAll({
      where: { supplier_company_id: sellerEntityId, is_active: true, ...like(['name', 'sku', 'description']) },
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    return { rows: rows.map(r => ({ row: r, blocked: null })) };
  }

  if (buyer.type !== 'restaurant') {
    return { error: { status: 403, code: 'BG_FG_RESTAURANT_ONLY', message: 'Only restaurants can buy from brand/foodcourt sellers' } };
  }
  const rest = await Restaurant.findByPk(buyer.id, { attributes: ['id', 'brand_id', 'foodcourt_id'] });

  if (sellerType === 'brand') {
    if (!rest || parseInt(rest.brand_id, 10) !== sellerEntityId) {
      return { error: { status: 403, code: 'NOT_OWN_BRAND', message: 'Not your brand' } };
    }
    const owner = await brandOwnerId(sellerEntityId);
    const products = await BrandProduct.findAll({
      where: { owner_user_id: owner, is_active: true, ...like(['name', 'sku', 'description']) },
      order: [['name', 'ASC']]
    });
    const specificIds = products.filter(p => p.distribution_mode === 'specific_brands').map(p => p.id);
    const links = specificIds.length
      ? await BrandProductBrand.findAll({ where: { product_id: specificIds, brand_id: sellerEntityId }, attributes: ['product_id'] })
      : [];
    const linked = new Set(links.map(l => l.product_id));
    const restIds = products.filter(p => p.distribution_mode === 'specific_restaurants').map(p => p.id);
    const rlinks = restIds.length
      ? await BrandProductRestaurant.findAll({ where: { product_id: restIds, restaurant_id: buyer.id }, attributes: ['product_id'] })
      : [];
    const rlinked = new Set(rlinks.map(l => l.product_id));

    return {
      rows: products.map(p => {
        let blocked = null;
        if (p.distribution_mode === 'specific_brands' && !linked.has(p.id)) blocked = 'NO_DISTRIBUTION_LINK';
        else if (p.distribution_mode === 'specific_restaurants' && !rlinked.has(p.id)) blocked = 'NO_DISTRIBUTION_LINK';
        return { row: p, blocked };
      })
    };
  }

  if (sellerType === 'foodcourt') {
    if (!rest || parseInt(rest.foodcourt_id, 10) !== sellerEntityId) {
      return { error: { status: 403, code: 'NOT_OWN_FOODCOURT', message: 'Not your foodcourt' } };
    }
    const rows = await FoodcourtProduct.findAll({
      where: { foodcourt_id: sellerEntityId, is_active: true, ...like(['name', 'sku', 'description']) },
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    return { rows: rows.map(r => ({ row: r, blocked: null })) };
  }

  return { error: { status: 400, message: 'Invalid seller_type' } };
}

/** 이 구매자가 이미 담은 (seller_type, seller_entity_id, seller_product_id) 집합. */
async function alreadyLinkedSet(buyer, sellerType, sellerEntityId) {
  const { rows } = await ingredientIndexFor(buyer);
  const ids = rows.map(r => r.id);
  if (!ids.length) return new Map();
  const maps = await IngredientSellerProduct.findAll({
    where: { ingredient_id: ids, seller_type: sellerType, seller_entity_id: sellerEntityId, is_active: true }
  });
  return new Map(maps.map(m => [m.seller_product_id, m.ingredient_id]));
}

async function catalogPreviewHandler(req, res) {
  try {
    const buyer = req.buyerEntity;
    const sellerType = req.query.seller_type;
    const sellerEntityId = parseInt(req.query.seller_entity_id, 10);
    if (!VALID_SELLER_TYPES.includes(sellerType)) {
      return res.status(400).json({ success: false, message: 'Invalid seller_type' });
    }
    if (!Number.isFinite(sellerEntityId)) {
      return res.status(400).json({ success: false, message: 'seller_entity_id is required' });
    }
    const limit = Math.min(500, Math.max(1, parseInt(req.query.limit, 10) || 100));
    const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);

    const cat = await loadSellerCatalog({ buyer, sellerType, sellerEntityId, search: req.query.search });
    if (cat.error) return res.status(cat.error.status).json({ success: false, code: cat.error.code, message: cat.error.message });

    const { byName } = await ingredientIndexFor(buyer);
    const linked = await alreadyLinkedSet(buyer, sellerType, sellerEntityId);
    const matchedIds = [];
    const built = cat.rows.map(({ row, blocked }) => {
      const hit = byName.get(catalogLink.normalizeName(row.name)) || null;
      if (hit) matchedIds.push(hit.id);
      return { row, blocked, hit };
    });
    const usage = await recipeUsageCount([...new Set(matchedIds)]);

    const items = built.map(({ row, blocked, hit }) => ({
      seller_product_id: row.id,
      name: row.name,
      sku: row.sku || null,
      unit: row.unit,
      unit_price: row.unit_price,
      min_order_quantity: row.min_order_quantity,
      // 담기 불가 항목도 **숨기지 않는다** — 사유와 함께 보여준다(설계 §9-4.4)
      blocked_reason: blocked,
      already_linked_ingredient_id: linked.get(row.id) || null,
      match: hit
        ? { type: 'exact', ingredient_id: hit.id, ingredient_name: hit.name, recipe_usage_count: usage[hit.id] || 0 }
        : { type: 'none', ingredient_id: null, ingredient_name: null, recipe_usage_count: 0 },
      suggested_mode: blocked ? 'skip' : (linked.has(row.id) ? 'skip' : (hit ? 'connect' : 'create'))
    }));

    const summary = {
      total: items.length,
      auto: items.filter(i => !i.blocked_reason && !i.already_linked_ingredient_id && i.match.type === 'none').length,
      review: items.filter(i => !i.blocked_reason && !i.already_linked_ingredient_id && i.match.type === 'exact').length,
      already_linked: items.filter(i => i.already_linked_ingredient_id).length,
      blocked: items.filter(i => i.blocked_reason).length
    };
    res.json({ success: true, data: { items: items.slice(offset, offset + limit), summary } });
  } catch (err) {
    console.error('GET catalog-link/preview error:', err);
    res.status(500).json({ success: false, message: 'Failed to build catalog preview' });
  }
}

async function catalogBulkHandler(req, res) {
  const buyer = req.buyerEntity;
  const sellerType = req.body?.seller_type;
  const sellerEntityId = parseInt(req.body?.seller_entity_id, 10);
  const items = Array.isArray(req.body?.items) ? req.body.items : null;
  if (!VALID_SELLER_TYPES.includes(sellerType) || !Number.isFinite(sellerEntityId)) {
    return res.status(400).json({ success: false, message: 'seller_type and seller_entity_id are required' });
  }
  if (!items || items.length === 0) return res.status(400).json({ success: false, message: 'items[] is required' });
  if (items.length > 500) return res.status(400).json({ success: false, message: 'Too many items (max 500)' });

  try {
    const cat = await loadSellerCatalog({ buyer, sellerType, sellerEntityId, search: null });
    if (cat.error) return res.status(cat.error.status).json({ success: false, code: cat.error.code, message: cat.error.message });
    const byId = new Map(cat.rows.map(r => [r.row.id, r]));

    const batchId = crypto.randomUUID();
    const result = { batch_id: batchId, created: 0, connected: 0, skipped: 0, failed: [] };
    const ownerKey = buyer.type === 'brand' ? 'brand_id' : buyer.type === 'restaurant' ? 'restaurant_id' : 'foodcourt_id';

    for (const it of items) {
      const spId = parseInt(it.seller_product_id, 10);
      const mode = it.mode;
      if (!Number.isFinite(spId) || !['connect', 'create', 'skip'].includes(mode)) {
        result.failed.push({ seller_product_id: it.seller_product_id, reason: 'INVALID_ITEM' });
        continue;
      }
      if (mode === 'skip') { result.skipped++; continue; }

      const entry = byId.get(spId);
      if (!entry) { result.failed.push({ seller_product_id: spId, reason: 'NOT_IN_CATALOG' }); continue; }
      if (entry.blocked) { result.failed.push({ seller_product_id: spId, reason: entry.blocked }); continue; }

      const t = await Ingredient.sequelize.transaction();
      try {
        const row = entry.row;
        const seller = {
          sellerType,
          sellerEntityId,     // brand 면 restaurant 의미(=구매자 brand_id). loadSellerCatalog 이 이미 검증함
          sellerProductRow: row,
          productName: row.name, productUnit: row.unit,
          productPrice: row.unit_price, productMinQty: row.min_order_quantity
        };
        const conv = catalogLink.resolveUnitConversion(it.unit_conversion);

        let target, wasCreated = false;
        if (mode === 'connect') {
          const tid = parseInt(it.existing_ingredient_id, 10);
          target = Number.isFinite(tid) ? await Ingredient.findByPk(tid, { transaction: t }) : null;
          if (!target || String(target[ownerKey]) !== String(buyer.id)) {
            await t.rollback();
            result.failed.push({ seller_product_id: spId, reason: 'TARGET_NOT_IN_SCOPE' });
            continue;
          }
        } else {
          // ⛔ F5 (2026-09-04): 브랜드 구매자는 여기서 재료 행을 만들지 않는다(위와 같은 이유).
          if (buyer.type === 'brand') {
            await t.rollback();
            result.failed.push({ seller_product_id: spId, reason: 'USE_STOCK_ITEMS' });
            continue;
          }
          target = await Ingredient.create({
            owner_type: buyer.type,
            brand_id: buyer.type === 'brand' ? buyer.id : null,
            restaurant_id: buyer.type === 'restaurant' ? buyer.id : null,
            foodcourt_id: buyer.type === 'foodcourt' ? buyer.id : null,
            name: row.name,
            unit: catalogLink.resolveUnit(null, row.unit),
            base_quantity: 1,
            unit_cost: parseFloat(row.unit_price) || 0,
            min_stock: 0, current_stock: 0,
            is_active: true, code: ''
          }, { transaction: t });
          wasCreated = true;
          await logItem(t, {
            batchId, buyer, userId: req.user.id,
            action: 'create_ingredient', targetTable: 'ingredients', targetId: target.id,
            sourceRef: `${sellerType}_product:${spId}`,
            after: { name: target.name, unit: target.unit }
          });
        }

        const dup = await IngredientSellerProduct.findOne({
          where: { ingredient_id: target.id, seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: spId },
          transaction: t
        });
        if (!dup) {
          const others = await IngredientSellerProduct.count({ where: { ingredient_id: target.id, is_active: true }, transaction: t });
          const mapping = await IngredientSellerProduct.create(
            catalogLink.mappingAttrs({ seller, unitConversion: conv, isPreferred: others === 0, targetKey: 'ingredient_id', targetId: target.id }),
            { transaction: t }
          );
          await logItem(t, {
            batchId, buyer, userId: req.user.id,
            action: 'link_seller', targetTable: 'ingredient_seller_products', targetId: mapping.id,
            sourceRef: `${sellerType}_product:${spId}`,
            after: { ingredient_id: target.id, seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: spId }
          });
        }

        if (it.apply_cost === true && !wasCreated) {
          const before = target.unit_cost;
          await target.update({ unit_cost: parseFloat(row.unit_price) || 0 }, { transaction: t });
          await logItem(t, {
            batchId, buyer, userId: req.user.id,
            action: 'update_cost', targetTable: 'ingredients', targetId: target.id,
            sourceRef: `${sellerType}_product:${spId}`,
            before: { unit_cost: before }, after: { unit_cost: target.unit_cost }
          });
        }

        await t.commit();
        if (wasCreated) result.created++; else result.connected++;
      } catch (e) {
        if (!t.finished) await t.rollback();
        result.failed.push({ seller_product_id: spId, reason: e.message });
      }
    }

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('POST catalog-link/bulk error:', err);
    res.status(500).json({ success: false, message: 'Bulk link failed' });
  }
}

// ============================================================
// 5. 커버리지 리포트
//    ⚠ 동명 레시피는 **recipe.id 기준 별개 행**으로 낸다(이름 병합 금지 — 설계 §9-0 ②)
// ============================================================
async function coverageHandler(req, res) {
  try {
    const buyer = req.buyerEntity;
    const { rows } = await ingredientIndexFor(buyer);
    const ids = rows.map(r => r.id);
    const mapped = ids.length
      ? new Set((await IngredientSellerProduct.findAll({
          where: { ingredient_id: ids, is_active: true }, attributes: ['ingredient_id']
        })).map(m => m.ingredient_id))
      : new Set();

    const usage = await recipeUsageCount(ids);
    const unmapped = rows
      .filter(r => !mapped.has(r.id))
      .map(r => ({ ingredient_id: r.id, name: r.name, unit: r.unit, recipe_usage_count: usage[r.id] || 0 }));

    const { Recipe } = require('../models');
    const recipeWhere = buyer.type === 'brand' ? { owner_type: 'brand', brand_id: buyer.id }
      : buyer.type === 'restaurant' ? { owner_type: 'restaurant', restaurant_id: buyer.id }
        : { owner_type: 'foodcourt', foodcourt_id: buyer.id };
    const recipes = await Recipe.findAll({ where: recipeWhere, attributes: ['id', 'name'] });
    const withIng = new Set((await RecipeIngredient.findAll({
      where: { recipe_id: recipes.map(r => r.id) }, attributes: ['recipe_id']
    })).map(r => r.recipe_id));
    const recipesWithout = recipes.filter(r => !withIng.has(r.id)).map(r => ({ recipe_id: r.id, name: r.name }));

    res.json({
      success: true,
      data: {
        unmapped_ingredients: unmapped,
        recipes_without_ingredients: recipesWithout,
        summary: {
          ingredients_total: rows.length,
          ingredients_unmapped: unmapped.length,
          ingredients_unmapped_used_in_recipes: unmapped.filter(u => u.recipe_usage_count > 0).length,
          recipes_total: recipes.length,
          recipes_without_ingredients: recipesWithout.length
        }
      }
    });
  } catch (err) {
    console.error('GET stock-ledger/coverage error:', err);
    res.status(500).json({ success: false, message: 'Failed to build coverage report' });
  }
}

// 브랜드·매장 두 스코프로 연다 (설계 §9-4.3)
router.get('/brands/:brandId/catalog-link/preview', ...GATES, scopeGuard('brandId', 'brand'), catalogPreviewHandler);
router.get('/restaurants/:restaurantId/catalog-link/preview', ...GATES, checkRestaurantAccess, scopeGuard('restaurantId', 'restaurant'), catalogPreviewHandler);
router.post('/brands/:brandId/catalog-link/bulk', ...GATES, scopeGuard('brandId', 'brand'), catalogBulkHandler);
router.post('/restaurants/:restaurantId/catalog-link/bulk', ...GATES, checkRestaurantAccess, scopeGuard('restaurantId', 'restaurant'), catalogBulkHandler);
router.get('/brands/:brandId/stock-ledger/coverage', ...GATES, scopeGuard('brandId', 'brand'), coverageHandler);
router.get('/restaurants/:restaurantId/stock-ledger/coverage', ...GATES, checkRestaurantAccess, scopeGuard('restaurantId', 'restaurant'), coverageHandler);

module.exports = router;
