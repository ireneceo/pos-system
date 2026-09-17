/**
 * 「이 업체에서 1 단위를 받으면 내 재고가 몇 단위 느는가」 를 고칠 때의 단일 경로
 *   (2026-09-17 Fable 설계 판정 B1·B2·B3)
 *
 * 왜 한 파일인가
 *   고치는 입구가 둘이다 — 매장 재료(PUT /api/ingredient-seller-products/:id)와
 *   BG 재고아이템(PUT /api/product-ingredients/:id/seller-sources/:mappingId).
 *   검증과 전파가 두 벌로 복제되면 곧 갈라진다. 값 규칙도 화면 규칙도 여기 하나뿐이다.
 *
 * 이 값이 닿는 곳
 *   입고 = 수량 × 값, 입고 원가 = 단가 ÷ 값 (`services/purchaseOrderReceive.js`).
 *   **앞으로의 입고에만** 작용한다 — 현재고·과거 원장·재료 원가는 건드리지 않는다.
 *   (원가식 `costSync.convertPrice` 는 이 값이 아니라 base_quantity 로 계산한다 — 별개 사안.)
 *
 * 발주 줄로의 전파
 *   발주를 만들 때 이 값이 줄에 **복사**되고 입고·반품은 줄의 사본을 쓴다. 그래서 연결만 고치면
 *   이미 만들어 둔 발주는 옛 값으로 들어온다. 아직 받지 않은 줄만 새 값으로 맞춘다 —
 *   허용 판정은 `utils/catalogSpecParser.js` 의 `poLineWritableFields`/`assertPoLineWrite` 하나뿐이고
 *   (draft·pending_approval·submitted 이면서 받은 수량 0), 여기서 그것을 그대로 부른다.
 *   ⛔ 입고가 시작된 줄·취소된 줄·이미 보낸(shipped) 줄은 무접촉 — 재고가 그 값으로 이미 들어갔고
 *      반품(`routes/po-returns.js`)이 같은 값으로 되돌린다.
 */

const { Op } = require('sequelize');
const { assertPoLineWrite } = require('../utils/catalogSpecParser');
const { conversionPair } = require('../utils/unitConversionRule');

/** 허용 범위 — `utils/unitConversionRule.js` 의 derived() 범위와 같은 기준이어야 한다. */
const MAX_CONVERSION = 100000;

class ConversionError extends Error {
  constructor(message) { super(message); this.name = 'ConversionError'; this.status = 400; }
}

/**
 * 들어온 값을 검증해 숫자로 돌려준다.
 * ⛔ `parseFloat(x) || 1` 로 읽지 않는다 — 0·빈값·글자를 조용히 1 로 저장해 버리면
 *    「1 박스 = 1 개」라는 **틀린 사실**이 소리 없이 들어간다(이번 정리의 273건이 그 자리다).
 */
function parseConversion(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) {
    throw new ConversionError('conversion must be a number greater than 0');
  }
  if (n >= MAX_CONVERSION) {
    throw new ConversionError(`conversion must be less than ${MAX_CONVERSION}`);
  }
  // 저장 칸이 DECIMAL(10,4) 다 — 저장될 자리로 먼저 맞춰야 되읽을 때 값이 달라지지 않는다.
  return Math.round(n * 10000) / 10000;
}

/**
 * 아직 받지 않은 발주 줄에 새 값을 전파한다.
 *
 * 줄을 찾는 열쇠는 `purchase_order_items.ingredient_seller_product_id`(= 이 연결 자체) 다.
 *   Fable 설계는 「타깃 + seller_product_id + seller_type」 로 찾으라 했는데, 그 조합은
 *   seller_product_id 가 다형 참조라 타입까지 맞춰야 하는 함정이 있다. 연결 id 는 그 함정이 없고
 *   **정확히 이 연결에서 나온 줄만** 집는다. 운영 실측으로 발주 줄 204개 전부 이 칸이 차 있다
 *   (비어 있는 줄은 그냥 대상이 아니다 — 엉뚱한 줄을 고치는 것보다 안 고치는 쪽이 안전하다).
 *
 * @returns {Promise<number>} 실제로 바뀐 줄 수
 */
async function propagateToOpenPoLines({ models, linkId, conversion, transaction }) {
  const { PurchaseOrderItem, PurchaseOrder } = models;
  const lines = await PurchaseOrderItem.findAll({
    where: {
      ingredient_seller_product_id: linkId,
      unit_conversion: { [Op.ne]: conversion }
    },
    include: [{ model: PurchaseOrder, as: 'order', attributes: ['id', 'status'], required: true }],
    transaction
  });

  let changed = 0;
  for (const line of lines) {
    const status = line.order?.status;
    const fields = { unit_conversion: conversion };
    // 쓰기 직전 한 번 더 막는다 — 위 where 가 상태를 거르지 않으므로 이 줄이 유일한 문지기다.
    try {
      assertPoLineWrite(status, line.quantity_received, fields);
    } catch (e) {
      continue; // 받기 시작했거나 취소·발송된 줄 — 설계상 무접촉
    }
    await line.update(fields, { transaction });
    changed += 1;
  }
  return changed;
}

/** seller_type → 판매 상품 모델. ENUM 은 models/IngredientSellerProduct.js 의 4값과 같아야 한다. */
const SELLER_MODEL_BY_TYPE = {
  supplier: 'SupplierProduct',
  brand: 'BrandProduct',
  foodcourt: 'FoodcourtProduct',
  system_admin: 'SystemProduct'
};

/**
 * 이 연결의 «판매자 단위» 와 «내 재고 단위» 를 읽어 확인 기록용 쌍을 만든다.
 *
 * 쌍을 서버가 만드는 이유 — 화면이 보내온 단위를 믿으면, 화면이 낡은 값을 들고 있을 때
 *   「지금은 kg 인데 piece 로 확인함」이 저장된다. 확인은 **저장 시점의 사실**이어야 한다.
 *
 * @returns {Promise<{sellerUnit:string, stockUnit:string, pair:string}>}
 * @throws {ConversionError} 판매 상품이나 재고 대상을 찾을 수 없을 때 — 없는 것에 대한 확인은 무의미하다.
 */
async function resolveUnitsForConfirmation({ models, link }) {
  const sellerModelName = SELLER_MODEL_BY_TYPE[link.seller_type];
  const SellerModel = sellerModelName && models[sellerModelName];
  if (!SellerModel) throw new ConversionError(`Unknown seller_type: ${link.seller_type}`);
  const sellerProduct = await SellerModel.findByPk(link.seller_product_id, { attributes: ['id', 'unit'] });
  if (!sellerProduct) throw new ConversionError('Seller product not found — cannot record the confirmation');

  const { Ingredient, ProductIngredient } = models;
  let target = null;
  if (link.ingredient_id) target = await Ingredient.findByPk(link.ingredient_id, { attributes: ['id', 'unit'] });
  else if (link.product_ingredient_id) target = await ProductIngredient.findByPk(link.product_ingredient_id, { attributes: ['id', 'unit'] });
  if (!target) throw new ConversionError('Stock item not found — cannot record the confirmation');

  return {
    sellerUnit: sellerProduct.unit || '',
    stockUnit: target.unit || '',
    pair: conversionPair(sellerProduct.unit, target.unit)
  };
}

/**
 * 저장 = 확인. 두 PUT 이 같은 칸을 같은 방법으로 채우도록 여기서 한 번에 만든다.
 * ⛔ 값이 1 이어도 확인이다 — 「업체의 «개»와 우리 «팩»이 같은 물건」인 경우가 운영 273건 중 125건이다.
 */
async function buildConfirmationFields({ models, link, userId }) {
  const { pair } = await resolveUnitsForConfirmation({ models, link });
  return {
    conversion_confirmed_at: new Date(),
    conversion_confirmed_by: userId || null,
    conversion_confirmed_pair: pair
  };
}

/**
 * 목록 응답에 「이 연결은 확인이 필요한가」를 실어 준다 (설계 GET 절).
 *
 * 판정은 서버에서 한 번만 한다 — 규칙(`utils/unitConversionRule.js`)을 화면에 복제하면
 * 두 벌이 갈라지고, 화면이 «확인됨»이라 하는데 검사는 계속 잡는 상태가 된다.
 *
 * @param {object} link   {unit_conversion, seller_unit, base_quantity, order_mode, conversion_confirmed_at, conversion_confirmed_pair}
 * @param {object} stock  {unit, base_quantity, package_unit, package_quantity}
 * @returns {{conversion_status: 'ok'|'needs_confirm', conversion_reason: string}}
 */
function conversionStatusFor(link, stock) {
  const { classifyConversion } = require('../utils/unitConversionRule');
  // 한쪽 단위를 모르면 판정하지 않는다 — 인스펙션 R-SC-007 도 두 단위가 다 있는 행만 본다.
  //   모르는 것을 «확인 필요»로 띄우면 고칠 수도 없는 경고가 화면에 쌓인다.
  if (!link || !link.seller_unit || !stock || !stock.unit) {
    return { conversion_status: 'ok', conversion_reason: '' };
  }
  const verdict = classifyConversion({
    conv: link.unit_conversion,
    seller_unit: link.seller_unit,
    seller_base: link.base_quantity,
    order_mode: link.order_mode,
    stock_unit: stock?.unit,
    stock_base: stock?.base_quantity,
    stock_package_unit: stock?.package_unit,
    stock_package_quantity: stock?.package_quantity,
    confirmed_at: link.conversion_confirmed_at,
    confirmed_pair: link.conversion_confirmed_pair
  });
  // N 만 «정해짐» 이다. H(사람 몫)뿐 아니라 D(데이터로는 값이 나오는데 지금 1)도 화면에는
  //   「확인 필요」로 보여야 한다 — 「1 kg → 1 g」처럼 **지금 값이 틀린 것**이 D 이기 때문이다.
  //   (D 는 정리 스크립트가 일괄로 고칠 수도 있지만, 화면에서 사람이 먼저 봐도 된다.)
  return {
    conversion_status: verdict.kind === 'N' ? 'ok' : 'needs_confirm',
    conversion_reason: verdict.why || '',
    // 데이터로 값이 나오면 창에 미리 제안한다 — 사람이 계산하지 않게.
    conversion_suggested: verdict.want != null ? verdict.want : null
  };
}

module.exports = {
  parseConversion, propagateToOpenPoLines, buildConfirmationFields, resolveUnitsForConfirmation,
  conversionStatusFor,
  ConversionError, MAX_CONVERSION, SELLER_MODEL_BY_TYPE
};
