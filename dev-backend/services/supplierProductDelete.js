/**
 * 공급업체 상품 삭제 — «연결된 것이 있으면 다른 상품으로 바꾸고 삭제» (2026-10-23 Fable 설계)
 *   설계: /var/www/.claude/fable-design-20261023-supplier-product-delete.md
 *   Irene: «역할마다 공급업체 상품보는 곳 있으면 삭제도 되게 해. 지울 수가 없잖아. 지울 때 연결된 거 있으면 바꾸게 하고. 스톡아이템 처럼»
 *
 * «연결» = ingredient_seller_products 에서 seller_type='supplier' AND seller_product_id = 이 상품인 줄 전부
 *   (켜짐·꺼짐·매장이 브랜드 재료에 붙인 것 포함). 다른 참조표(supplier_inventory_transactions 등)는
 *   외부 업체에 뜻이 없어 세지 않는다(설계 S5).
 *
 * DELETE · replace · unlink 세 라우트와 health-check 가 **이 함수들만** 쓴다 — 검사와 수정은 같은 술어.
 * 함수는 «외부 업체» 를 가정하지 않는다(권한은 라우트가 본다).
 *
 * ⛔ 발주 줄은 건드리지 않는다. 연결 줄 id 를 보존하므로 발주 이력(FK)·정기 발주(line_items)가 그대로 따라간다.
 */
const { QueryTypes } = require('sequelize');
const { resolveStockTarget } = require('../utils/stockTarget');

const OPEN_PO_STATUSES = ['draft', 'pending_approval', 'submitted', 'confirmed'];

const TARGET_TABLE = {
  ingredient: 'ingredients',
  product_ingredient: 'product_ingredients',
  product: 'products',
  brand_product: 'brand_products',
};

async function q(sequelize, sql, replacements, transaction) {
  return sequelize.query(sql, { replacements, type: QueryTypes.SELECT, transaction });
}

/** 재고 대상 행(이름·단위·주인) — 환산 판정과 화면 표시가 같은 행을 쓴다. */
async function loadTarget(sequelize, kind, id, transaction) {
  const table = TARGET_TABLE[kind];
  const cols = {
    ingredient: 'id, name, unit, base_quantity, package_unit, package_quantity, restaurant_id, brand_id, owner_type',
    product_ingredient: 'id, name, unit, base_quantity, package_unit, package_quantity, owner_user_id',
    product: 'id, name, stock_unit, restaurant_id',
    brand_product: 'id, name, stock_unit, base_quantity, package_unit, owner_user_id',
  }[kind];
  const [row] = await q(sequelize, `SELECT ${cols} FROM ${table} WHERE id = :id`, { id }, transaction);
  if (!row) return null;
  let owner_name = null;
  if (row.restaurant_id) {
    const [r] = await q(sequelize, 'SELECT name FROM restaurants WHERE id = :id', { id: row.restaurant_id }, transaction);
    owner_name = r ? r.name : null;
  } else if (row.brand_id) {
    const [b] = await q(sequelize, 'SELECT name FROM brands WHERE id = :id', { id: row.brand_id }, transaction);
    owner_name = b ? b.name : null;
  }
  return { ...row, owner_name };
}

/** 그 연결 줄을 쓰는 열린 발주 수 · 정기 발주 수 · 이력(발주 줄 전부) 유무. */
async function linkHistory(sequelize, linkId, transaction) {
  const [po] = await q(sequelize,
    `SELECT COUNT(DISTINCT po.id) AS open_po,
            (SELECT COUNT(*) FROM purchase_order_items x WHERE x.ingredient_seller_product_id = :id) AS any_line
       FROM purchase_order_items poi
       JOIN purchase_orders po ON po.id = poi.purchase_order_id AND po.deleted_at IS NULL
      WHERE poi.ingredient_seller_product_id = :id AND po.status IN (:open)`,
    { id: linkId, open: OPEN_PO_STATUSES }, transaction);
  const schedules = await q(sequelize,
    'SELECT id, line_items FROM purchase_order_schedules WHERE deleted_at IS NULL', {}, transaction);
  const { parseLines } = require('./poScheduleService');
  const scheduleCount = schedules.filter((s) =>
    parseLines(s.line_items).some((l) => Number(l.ingredient_seller_product_id) === Number(linkId))).length;
  return { open_po_count: Number(po.open_po) || 0, schedule_count: scheduleCount, has_history: Number(po.any_line) > 0 || scheduleCount > 0 };
}

/**
 * 이 상품을 가리키는 연결 전부.
 * @returns {Promise<Array<{type:'seller_link', link_id, target:{kind,id,name,owner_name}, buyer_restaurant_id, is_active, is_preferred, unit_price, unit_conversion, open_po_count, schedule_count, has_history}>>}
 */
async function collectSupplierProductUses(productId, { sequelize, transaction } = {}) {
  const links = await q(sequelize,
    `SELECT * FROM ingredient_seller_products WHERE seller_type = 'supplier' AND seller_product_id = :pid ORDER BY id`,
    { pid: productId }, transaction);
  const out = [];
  for (const l of links) {
    const t = resolveStockTarget(l);
    const target = await loadTarget(sequelize, t.kind, t.id, transaction);
    const h = await linkHistory(sequelize, l.id, transaction);
    out.push({
      type: 'seller_link',
      link_id: l.id,
      target: { kind: t.kind, id: t.id, name: target ? target.name : null, owner_name: target ? target.owner_name : null },
      buyer_restaurant_id: l.buyer_restaurant_id,
      is_active: !!l.is_active,
      is_preferred: !!l.is_preferred,
      unit_price: Number(l.unit_price),
      unit_conversion: Number(l.unit_conversion),
      ...h,
    });
  }
  return out;
}

const sameSpec = (a, b) => String(a.unit || '').toLowerCase() === String(b.unit || '').toLowerCase()
  && Number(a.base_quantity || 0) === Number(b.base_quantity || 0)
  && (a.order_mode || 'pack') === (b.order_mode || 'pack');

/**
 * 연결들을 같은 업체의 다른 상품(target)으로 옮긴다 — 호출한 트랜잭션 안에서. 커밋·롤백은 부르는 쪽.
 *   막힘이 하나라도 있으면 아무것도 쓰지 않고 { blocked:[…] } 를 돌려준다.
 * @returns {Promise<{blocked?:Array, moved?:Array}>}
 */
async function replaceSupplierProductLinks({ product, target, actor, user, sequelize, transaction }) {
  const { IngredientSellerProduct } = require('../models');
  const { sellerCopiedLinkFields } = require('../utils/catalogLink');
  const { deriveLinkConversion, linkConversionOf } = require('./sellerLinkConversion');
  const { recomputeUnitCost } = require('./costSync');

  const uses = await collectSupplierProductUses(product.id, { sequelize, transaction });
  const keep = sameSpec(product, target);
  const blocked = [];
  const plan = [];
  for (const u of uses) {
    const stock = await loadTarget(sequelize, u.target.kind, u.target.id, transaction);
    const key = { ingredient: 'ingredient_id', product_ingredient: 'product_ingredient_id', product: 'product_id', brand_product: 'brand_product_id' }[u.target.kind];
    // ① 같은 대상(같은 매장 범위)에 대상 상품 연결이 이미 있다 — 합치기는 사람 몫
    const dup = await IngredientSellerProduct.findOne({
      where: { [key]: u.target.id, buyer_restaurant_id: u.buyer_restaurant_id, seller_type: 'supplier', seller_product_id: target.id },
      transaction,
    });
    if (dup) { blocked.push({ ...u, reason: 'already_linked' }); continue; }
    // ② 대상 상품 단위와 재고 단위가 환산 불가(질량↔부피 등) — 틀린 환산 1 을 조용히 넣지 않는다
    if (!keep && !linkConversionOf({ stock, sellerProduct: target }).compatible) {
      blocked.push({ ...u, reason: 'unit_incompatible', target_unit: target.unit, stock_unit: stock && (stock.unit || stock.stock_unit) });
      continue;
    }
    plan.push({ u, stock, conv: keep ? u.unit_conversion : deriveLinkConversion({ raw: undefined, stock, sellerProduct: target }) });
  }
  if (blocked.length) return { blocked };

  const copied = sellerCopiedLinkFields({ productPrice: target.unit_price, productMinQty: target.min_order_quantity });
  const ctx = {
    // 출처 칸은 ENUM — 새 값을 넣으면 마이그가 필요하다. 외부 상품 가격 PUT 과 같은 'seller_edit' + note 로 구분한다.
    source: 'seller_edit',
    entity_type: actor && actor.entity_type,
    entity_id: actor && actor.entity_id,
    seller_type: 'supplier',
    seller_entity_id: target.supplier_company_id,
    changed_by_user_id: user && user.id,
    changed_by_name: user && (user.name || user.email),
    note: `공급업체 상품 교체 ${product.name} → ${target.name}`,
    actor,
  };
  const moved = [];
  for (const { u, conv } of plan) {
    const patch = { seller_product_id: target.id, ...copied, unit_conversion: conv };
    // 단위 규격이 바뀌면 옛 단위쌍에 대한 사람 확인은 무효 — 재고 목록이 «확인 필요» 로 보여 준다
    if (!keep) Object.assign(patch, { conversion_confirmed_at: null, conversion_confirmed_by: null, conversion_confirmed_pair: null });
    await IngredientSellerProduct.update(patch, { where: { id: u.link_id }, transaction });
    let cost = { skip: 'no cost on this kind' };
    if (u.target.kind === 'ingredient' || u.target.kind === 'product_ingredient') {
      cost = await recomputeUnitCost(u.target.kind, u.target.id, { transaction, sequelize, ctx });
    }
    moved.push({
      link_id: u.link_id,
      target: u.target,
      price: { from: u.unit_price, to: copied.unit_price },
      conversion: { from: u.unit_conversion, to: Number(conv), needs_confirm: !keep },
      cost: cost && cost.skip ? { skip: cost.skip } : { from: cost.from, to: cost.to },
      open_po_count: u.open_po_count,
      schedule_count: u.schedule_count,
    });
  }
  return { moved };
}

/**
 * 연결 끊기 — 이력(발주 줄·정기 발주) 없는 연결은 행 삭제, 이력 있는 연결은 끈 채(is_active=0) 남긴다.
 *   FK SET NULL 로 발주 줄을 끊거나 정기 발주를 조용히 바꾸지 않기 위해서다(설계 D4).
 */
async function unlinkSupplierProductLinks({ product, sequelize, transaction }) {
  const { IngredientSellerProduct } = require('../models');
  const uses = await collectSupplierProductUses(product.id, { sequelize, transaction });
  const removed = [], deactivated = [];
  for (const u of uses) {
    if (u.has_history) {
      await IngredientSellerProduct.update({ is_active: false }, { where: { id: u.link_id }, transaction });
      deactivated.push(u);
    } else {
      await IngredientSellerProduct.destroy({ where: { id: u.link_id }, transaction });
      removed.push(u);
    }
  }
  return { removed, deactivated };
}

module.exports = { collectSupplierProductUses, replaceSupplierProductLinks, unlinkSupplierProductLinks, OPEN_PO_STATUSES };
