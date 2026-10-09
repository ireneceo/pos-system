/**
 * 판매 중지된 판매자 상품은 구매자가 발주할 수 없다 — 서버 단일 규칙 (2026-10-09 Irene «권고대로»)
 *
 * Irene 원문: 「브랜드제너럴이 활성화/비활성화하는 모든 프로덕트가 제대로 레스토랑관리자 발주할 때 반영돼?
 *   마이스톡에서 검색되지만 브랜드제너럴이 비활성화했으면 어떻게 되는거야?」
 *
 * 그전: 판매자가 상품을 끄면 Supplier Catalog 에서만 빠졌다. 매장이 재료에 이미 붙여 둔 연결
 *   (ingredient_seller_products)은 켜진 채 남아서, My Stock 에서 그 재료를 담으면 꺼진 상품으로
 *   발주가 만들어지고 제출까지 됐다(개발서버 재현: 상품 44 끔 → 발주 201).
 *
 * 뜻: «판매 중지» = 판매자 상품 행이 `is_active=false` 이거나 소프트삭제(deleted_at)된 것.
 *   상품 행을 못 찾는 연결(외부 공급업체 자유 입력 등)은 판정하지 않는다 — 모르는 것을 막지 않는다.
 *   ⛔ 연결 행은 지우지도 끄지도 않는다. 판매자가 다시 켜면 그대로 다시 주문된다.
 *
 * 호출하는 곳 = 구매자 경로만(poMinOrder 와 같은 자리): 발주 생성(POST·bulk 공유 core) · 수정(PUT) ·
 *   제출(submit) · 외부업체 수동전송(mark-sent-external).
 * ⛔ 판매자 경로(seller-orders 대리주문)는 호출하지 않는다 — 자기 상품이라 판매자가 판단한다.
 *
 * 화면 쪽: 재고 목록 응답의 공급처 줄에 `seller_product_active` 를 싣는다(`sellerProductOff` 로 판정).
 */

/** 상품 행 하나가 판매 중지인가 — 목록 응답과 발주 검사가 같은 판정을 쓴다. */
function sellerProductOff(row) {
  if (!row) return false;
  const active = row.is_active;
  if (active === false || active === 0 || active === '0') return true;
  return row.deleted_at != null;
}

class InactiveSellerProductError extends Error {
  constructor(lines) {
    super('Seller product is no longer for sale');
    this.name = 'InactiveSellerProductError';
    this.code = 'SELLER_PRODUCT_INACTIVE';
    this.status = 400;
    this.lines = lines;
  }
}

/** 400 응답 본문 — 화면이 줄 이름을 그대로 보여줄 수 있게. */
function inactiveSellerProductErrorBody(err) {
  const names = (err.lines || []).map(l => l.description || l.seller_product_name).filter(Boolean);
  return {
    success: false,
    code: 'SELLER_PRODUCT_INACTIVE',
    message: names.length
      ? `No longer sold by the seller: ${names.join(', ')}. Remove these items to continue.`
      : 'An item is no longer sold by the seller. Remove it to continue.',
    data: { lines: err.lines || [] }
  };
}

/**
 * 발주 줄들의 판매자 상품이 판매 중인지 본다. 하나라도 꺼져 있으면 InactiveSellerProductError 를 던진다.
 *
 * @param {Array<{id?, description?, ingredient_seller_product_id?}>} items
 * @param {{transaction?}} opts
 */
async function assertLinesSellerProductActive(items, { transaction } = {}) {
  const lines = (items || []).filter(it => it && it.ingredient_seller_product_id);
  if (!lines.length) return;
  const mapIds = [...new Set(lines.map(it => parseInt(it.ingredient_seller_product_id, 10)).filter(Number.isFinite))];
  if (!mapIds.length) return;
  const { sequelize } = require('../config/database');

  // seller_product_id 는 다형 참조 — poMinOrder 와 같은 조인. 삭제된 상품도 잡아야 하므로 deleted_at 을 거르지 않는다.
  const [rows] = await sequelize.query(`
    SELECT isp.id map_id, isp.seller_type,
           sp.id sp_id, sp.name sp_name, sp.is_active sp_active, sp.deleted_at sp_deleted,
           bp.id bp_id, bp.name bp_name, bp.is_active bp_active,
           fp.id fp_id, fp.name fp_name, fp.is_active fp_active, fp.deleted_at fp_deleted
      FROM ingredient_seller_products isp
      LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
      LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
      LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
     WHERE isp.id IN (:ids)`, { replacements: { ids: mapIds }, transaction });

  const offByMap = {};
  for (const r of rows) {
    let prod = null;
    if (r.seller_type === 'supplier' && r.sp_id) prod = { name: r.sp_name, is_active: r.sp_active, deleted_at: r.sp_deleted };
    else if (r.seller_type === 'brand' && r.bp_id) prod = { name: r.bp_name, is_active: r.bp_active };
    else if (r.seller_type === 'foodcourt' && r.fp_id) prod = { name: r.fp_name, is_active: r.fp_active, deleted_at: r.fp_deleted };
    if (sellerProductOff(prod)) offByMap[r.map_id] = prod.name || null;
  }

  const off = [];
  for (const it of lines) {
    const key = parseInt(it.ingredient_seller_product_id, 10);
    if (!(key in offByMap)) continue;
    off.push({ item_id: it.id || null, description: it.description || null, seller_product_name: offByMap[key] });
  }
  if (off.length) throw new InactiveSellerProductError(off);
}

/**
 * 화면용 — 공급처 줄들({seller_type, seller_product_id})에 `seller_product_active` 를 싣는다(제자리 수정).
 * 상품 행을 못 찾으면 true(판정하지 않음 — 발주 검사와 같은 규칙).
 */
async function attachSellerProductActive(sources) {
  const list = (sources || []).filter(s => s && s.seller_product_id && ['supplier', 'brand', 'foodcourt'].includes(s.seller_type));
  for (const s of sources || []) if (s) s.seller_product_active = true;
  if (!list.length) return;
  const { SupplierProduct, BrandProduct, FoodcourtProduct } = require('../models');
  const idsOf = (t) => [...new Set(list.filter(s => s.seller_type === t).map(s => parseInt(s.seller_product_id, 10)).filter(Number.isFinite))];
  const load = async (Model, ids, paranoid) => (ids.length && Model
    ? await Model.findAll({ where: { id: ids }, attributes: ['id', 'is_active', ...(paranoid ? ['deleted_at'] : [])], paranoid: false })
    : []);
  const [sp, bp, fp] = await Promise.all([
    load(SupplierProduct, idsOf('supplier'), true),
    load(BrandProduct, idsOf('brand'), false),
    load(FoodcourtProduct, idsOf('foodcourt'), true)
  ]);
  const off = new Set();
  for (const [t, rows] of [['supplier', sp], ['brand', bp], ['foodcourt', fp]]) {
    for (const r of rows) if (sellerProductOff(r.get ? r.get({ plain: true }) : r)) off.add(`${t}:${r.id}`);
  }
  for (const s of list) s.seller_product_active = !off.has(`${s.seller_type}:${parseInt(s.seller_product_id, 10)}`);
}

module.exports = {
  sellerProductOff,
  attachSellerProductActive,
  assertLinesSellerProductActive,
  InactiveSellerProductError,
  inactiveSellerProductErrorBody
};
