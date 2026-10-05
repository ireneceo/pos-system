/**
 * 발주 최소주문 수량(MOQ) — 서버 단일 규칙 (2026-10-05 Fable 설계 §4-A)
 *
 * Irene 원문: 「강제하는 거 아니야? … 안되어야지」 — 2026-08-30 백로그의 «안내만» 판정을 대체한다.
 *
 * 뜻: `min_order_quantity` = **주문 단위의 하한.** 그 이상은 자유(배수 아님).
 *   기준은 **판매자 상품의 현재 값**이다. 연결(ingredient_seller_products)의 MOQ 는 연결 시점 사본이고
 *   costSync 가 따라가지 않는다(판매자가 1→22 로 바꿔도 연결은 1 로 남는다). 판매자 상품을 못 찾을 때만
 *   연결 사본을 쓴다(외부 공급업체 등).
 *
 * ⚠ 값 1 은 «정하지 않음» 으로 본다 — 검사하지 않는다.
 *   칸 기본값이 1 이라 «1 이상이어야 한다» 와 «아직 안 정함» 을 값으로 구분할 수 없다.
 *   운영 실측(2026-10-05): 무게·부피 주문(measure) 판매 상품 114개 중 110개가 기본값 1 이고,
 *   매장은 0.5 kg 같은 소수 주문을 정상으로 넣는다(미제출 발주 18줄 · 전체 이력 66줄).
 *   1 을 하한으로 읽으면 그 주문이 전부 막힌다. 판매자가 1 이 아닌 값(22 · 5 · 0.5)을 적었을 때만 강제한다.
 *
 * 호출하는 곳 = 구매자 경로만: 발주 생성(POST·bulk 공유 core) · 수정(PUT) · 제출(submit).
 * ⛔ 판매자 경로(seller-orders 대리주문·품목수정)는 호출하지 않는다 — 판매자가 규칙의 주인이다.
 *   (core 를 판매자 대리주문도 쓰므로 core 는 `enforceMinOrder:false` 로 끈다.)
 *
 * 화면 쪽 같은 규칙: dev-frontend/src/utils/unitConversion.ts `minQtyOf`.
 */

const { parseMinOrderQty } = require('./quantity');
const { sellerOrderLine } = require('./poLineSpec');

/** 값 1(칸 기본값) = 정하지 않음 → 하한 없음(null). 그 밖의 유한 양수 = 하한. */
function effectiveMinOrder(raw) {
  const n = parseMinOrderQty(raw, NaN);
  if (!Number.isFinite(n) || n === 1) return null;
  return n;
}

const round2 = (x) => Math.round(Number(x) * 100) / 100;

class MinOrderError extends Error {
  constructor(violations) {
    super('Below minimum order quantity');
    this.name = 'MinOrderError';
    this.code = 'BELOW_MIN_ORDER';
    this.status = 400;
    this.violations = violations;
  }
}

/** 400 응답 본문 — 화면이 줄 이름과 «최소 22 pack» 을 그대로 보여줄 수 있게. */
function minOrderErrorBody(err) {
  return {
    success: false,
    code: 'BELOW_MIN_ORDER',
    message: 'Below minimum order quantity',
    data: { violations: err.violations || [] }
  };
}

/**
 * 발주 줄들을 판매자 상품 현재 MOQ 와 비교한다. 미달이 하나라도 있으면 MinOrderError 를 던진다.
 *
 * @param {Array<{id?, description?, quantity_ordered, ingredient_seller_product_id?}>} items
 * @param {{transaction?}} opts
 * @returns {Promise<void>}
 */
async function assertLinesMeetMinOrder(items, { transaction } = {}) {
  const lines = (items || []).filter(it => it && it.ingredient_seller_product_id);
  if (!lines.length) return;
  const { sequelize } = require('../config/database');
  const mapIds = [...new Set(lines.map(it => parseInt(it.ingredient_seller_product_id, 10)).filter(Number.isFinite))];
  if (!mapIds.length) return;

  // seller_product_id 는 다형 참조다 — seller_type 별로 따로 붙인다(refresh-prices·costSync 와 같은 조인).
  const [rows] = await sequelize.query(`
    SELECT isp.id map_id, isp.seller_type, isp.min_order_quantity link_moq,
           sp.id sp_id, sp.min_order_quantity sp_moq, sp.unit sp_unit, sp.base_quantity sp_base, sp.package_unit sp_pkg, sp.order_mode sp_mode,
           bp.id bp_id, bp.min_order_quantity bp_moq, bp.unit bp_unit, bp.base_quantity bp_base, bp.package_unit bp_pkg, bp.order_mode bp_mode,
           fp.id fp_id, fp.min_order_quantity fp_moq, fp.unit fp_unit, fp.base_quantity fp_base, fp.package_unit fp_pkg
      FROM ingredient_seller_products isp
      LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
      LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
      LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
     WHERE isp.id IN (:ids)`, { replacements: { ids: mapIds }, transaction });

  const byMap = {};
  for (const r of rows) {
    let sp = null;
    if (r.seller_type === 'supplier' && r.sp_id) sp = { moq: r.sp_moq, unit: r.sp_unit, base_quantity: r.sp_base, package_unit: r.sp_pkg, order_mode: r.sp_mode };
    else if (r.seller_type === 'brand' && r.bp_id) sp = { moq: r.bp_moq, unit: r.bp_unit, base_quantity: r.bp_base, package_unit: r.bp_pkg, order_mode: r.bp_mode };
    else if (r.seller_type === 'foodcourt' && r.fp_id) sp = { moq: r.fp_moq, unit: r.fp_unit, base_quantity: r.fp_base, package_unit: r.fp_pkg, order_mode: 'pack' };
    // system_admin 판매자는 MOQ 칸이 없다 — 검사 대상 아님
    if (r.seller_type === 'system_admin') continue;
    const min = effectiveMinOrder(sp ? sp.moq : r.link_moq);
    if (min === null) continue;
    byMap[r.map_id] = { min, unit: sp ? sellerOrderLine(sp, null).unit : null };
  }

  const violations = [];
  for (const it of lines) {
    const rule = byMap[parseInt(it.ingredient_seller_product_id, 10)];
    if (!rule) continue;
    const qty = round2(it.quantity_ordered);
    if (qty < round2(rule.min)) {
      violations.push({
        item_id: it.id || null,
        description: it.description || null,
        quantity: qty,
        min: round2(rule.min),
        unit: rule.unit || it.unit || null
      });
    }
  }
  if (violations.length) throw new MinOrderError(violations);
}

module.exports = { assertLinesMeetMinOrder, effectiveMinOrder, MinOrderError, minOrderErrorBody };
