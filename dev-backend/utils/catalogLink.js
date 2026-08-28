/**
 * catalogLink.js — from-catalog(카탈로그에서 재고 항목 담기) 공통 로직의 단일 소스.
 *
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §12-1
 *
 * 왜 있나: 같은 로직이 4벌 복사돼 있었다.
 *   routes/ingredients.js(brand :202 / foodcourt :1086) · routes/restaurants-ingredients.js(:274)
 *   · routes/product-ingredients.js(:176)
 * 이 파일은 **동작 불변 추출**이다 — 계약(입출력·상태코드·메시지)을 바꾸지 않는다.
 *
 * ⚠⚠ 패밀리별 `seller_entity_id`(seller_type='brand') 의 **의미가 서로 다르다** — 의도적 보존이다.
 *   - brand buyer     : 원래 코드가 `bp.owner_user_id ? bid : bid` 라는 **죽은 삼항**이었다(두 분기 동일).
 *                       동작 등가라 `bid` 로 단순화. 의미 = **구매자 자기 brand id**
 *   - foodcourt buyer : `bp.owner_user_id || 0` — **user id 를 넣는다(brand id 아님)**. 잠복 결함.
 *                       이렇게 만들어진 행은 `verifySellerRelation`(brand id 비교)과 어긋나 **발주 불가**
 *   - restaurant buyer: `rest.brand_id` — **부모 brand id**. `verifySellerRelation` 과 정합하는 **유일한** 경로
 *   - BG stock items  : `Brand.findOne({owner_id})` — **정렬 미지정이라 비결정적**.
 *                       다브랜드 소유자(예: 브랜드 2개)면 판매자가 임의로 정해진다
 *
 *   2026-08-28 실측(dev, brand_product_id=4 / owner_user_id=6): 같은 입력에서
 *   brand=1 · foodcourt=6 · BG=1 로 **서로 다른 값**이 저장된다.
 *   운영 데이터는 아직 일관적이다 — brand 매핑 19행 전부 restaurant 경로산(brand_id 의미), 불일치 행 0.
 *
 *   ⛔ **새 코드는 restaurant 의미(brand_id)만 따를 것.** 아래 전략들을 정본으로 복사하지 말 것.
 *   통일은 별건이다 — 설계문서 §7 참조. 여기서 조용히 "고치면" 다른 패밀리 동작이 바뀐다.
 */

const UNIT_ENUM = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];

const UNIT_MAP = {
  kg: 'kg', kgs: 'kg', kilogram: 'kg', kilograms: 'kg',
  g: 'g', gram: 'g', grams: 'g', gr: 'g',
  l: 'L', liter: 'L', liters: 'L', litre: 'L', litres: 'L',
  ml: 'ml',
  piece: 'piece', pcs: 'piece', pc: 'piece', ea: 'piece', each: 'piece', unit: 'piece',
  pack: 'pack', pkt: 'pack', packet: 'pack', bag: 'pack', sack: 'pack',
  box: 'pack', case: 'pack', carton: 'pack', ctn: 'pack',
  can: 'can', tin: 'can',
  bottle: 'bottle', btl: 'bottle'
};

/** 자유 입력 단위를 ENUM 으로. 알 수 없으면 'piece'. (4벌이 쓰던 매핑 그대로) */
function normalizeUnit(u) {
  if (!u) return 'piece';
  if (UNIT_ENUM.includes(u)) return u;
  return UNIT_MAP[String(u).toLowerCase().trim()] || 'piece';
}

/** body.unit 이 ENUM 이면 그대로, 아니면 판매자 상품 단위를 정규화. */
function resolveUnit(bodyUnit, productUnit) {
  return bodyUnit && UNIT_ENUM.includes(bodyUnit) ? bodyUnit : normalizeUnit(productUnit);
}

/** body.unit_conversion → 양수만 채택, 아니면 1. */
function resolveUnitConversion(raw) {
  const v = parseFloat(raw);
  return v > 0 ? v : 1;
}

/**
 * 판매자 상품을 식별하고 접근을 판정한다.
 *
 * @param {object} o
 * @param {object} o.body               요청 본문
 * @param {object} o.transaction
 * @param {function} o.supplierContract  async (supplierCompanyId) => contract|null  (null 이면 403)
 * @param {function} o.brandSellerEntityId async (brandProduct) => number|null
 *                                       ⚠ 패밀리마다 의미가 다르다(파일 상단 경고 참조)
 * @param {function} [o.brandAccessCheck] async (brandProduct) => boolean  (false 면 403). 없으면 검사 안 함
 * @returns {{ok:true, sellerType, sellerProductRow, sellerEntityId, productName, productUnit, productPrice, productMinQty}}
 *        | {ok:false, status, body}
 */
async function resolveSellerProduct({ body, transaction, supplierContract, brandSellerEntityId, brandAccessCheck }) {
  const SupplierProduct = require('../models/SupplierProduct');
  const BrandProduct = require('../models/BrandProduct');
  const FoodcourtProduct = require('../models/FoodcourtProduct');

  const supplierProductId = parseInt(body.supplier_product_id, 10);
  const brandProductId = parseInt(body.brand_product_id, 10);
  const foodcourtProductId = parseInt(body.foodcourt_product_id, 10);

  if (Number.isFinite(supplierProductId)) {
    const sp = await SupplierProduct.findByPk(supplierProductId, { transaction });
    if (!sp) return { ok: false, status: 404, body: { success: false, message: 'Supplier product not found' } };
    const contract = await supplierContract(sp.supplier_company_id);
    if (!contract) {
      return {
        ok: false, status: 403,
        body: { success: false, code: 'NO_ACTIVE_CONTRACT', message: 'No active contract with this supplier' }
      };
    }
    return {
      ok: true, sellerType: 'supplier', sellerProductRow: sp, sellerEntityId: sp.supplier_company_id,
      productName: sp.name, productUnit: sp.unit, productPrice: sp.unit_price, productMinQty: sp.min_order_quantity
    };
  }

  if (Number.isFinite(brandProductId)) {
    const bp = await BrandProduct.findByPk(brandProductId, { transaction });
    if (!bp) return { ok: false, status: 404, body: { success: false, message: 'Brand product not found' } };
    if (brandAccessCheck) {
      const allowed = await brandAccessCheck(bp);
      if (!allowed) {
        return {
          ok: false, status: 403,
          body: { success: false, message: 'This brand product is not available for your restaurant' }
        };
      }
    }
    return {
      ok: true, sellerType: 'brand', sellerProductRow: bp, sellerEntityId: await brandSellerEntityId(bp),
      productName: bp.name, productUnit: bp.unit, productPrice: bp.unit_price, productMinQty: bp.min_order_quantity
    };
  }

  if (Number.isFinite(foodcourtProductId)) {
    const fp = await FoodcourtProduct.findByPk(foodcourtProductId, { transaction });
    if (!fp) return { ok: false, status: 404, body: { success: false, message: 'Foodcourt product not found' } };
    return {
      ok: true, sellerType: 'foodcourt', sellerProductRow: fp, sellerEntityId: fp.foodcourt_id,
      productName: fp.name, productUnit: fp.unit, productPrice: fp.unit_price, productMinQty: fp.min_order_quantity
    };
  }

  return {
    ok: false, status: 400,
    body: { success: false, message: 'supplier_product_id, brand_product_id, or foodcourt_product_id is required' }
  };
}

/** 매핑 1건 생성에 쓰는 필드 (4벌 공통). */
function mappingAttrs({ seller, unitConversion, isPreferred, targetKey, targetId }) {
  return {
    ingredient_id: targetKey === 'ingredient_id' ? targetId : null,
    ...(targetKey === 'product_ingredient_id' ? { product_ingredient_id: targetId } : {}),
    seller_type: seller.sellerType,
    seller_entity_id: seller.sellerEntityId,
    seller_product_id: seller.sellerProductRow.id,
    unit_price: parseFloat(seller.productPrice) || 0,
    unit_conversion: unitConversion,
    min_order_quantity: parseInt(seller.productMinQty, 10) || 1,
    lead_time_days: 0,
    is_preferred: isPreferred,
    is_active: true
  };
}

/**
 * connect 모드 — 기존 재고 항목에 매핑만 추가한다.
 * @returns {{ok:true, status, body}} | {ok:false, status, body}
 */
async function connectExisting({ target, seller, unitConversion, targetKey, transaction }) {
  const IngredientSellerProduct = require('../models/IngredientSellerProduct');
  const dupWhere = {
    [targetKey]: target.id,
    seller_type: seller.sellerType,
    seller_entity_id: seller.sellerEntityId,
    seller_product_id: seller.sellerProductRow.id
  };
  const dup = await IngredientSellerProduct.findOne({ where: dupWhere, transaction });
  if (dup) {
    return { ok: true, status: 200, body: { success: true, data: { ingredient: target, mapping: dup, created: false, connected: true } } };
  }
  const otherCount = await IngredientSellerProduct.count({
    where: { [targetKey]: target.id, is_active: true }, transaction
  });
  const mapping = await IngredientSellerProduct.create(
    mappingAttrs({ seller, unitConversion, isPreferred: otherCount === 0, targetKey, targetId: target.id }),
    { transaction }
  );
  return { ok: true, status: 201, body: { success: true, data: { ingredient: target, mapping, created: false, connected: true } } };
}

/**
 * 멱등 조회 — 이 판매자 상품이 이미 담겨 있고, 그 대상이 이 구매자 소유면 그대로 돌려준다.
 * @param {function} ownsTarget (targetRow) => boolean
 */
async function findAlreadyLinked({ seller, targetKey, findTarget, ownsTarget, extraWhere, transaction }) {
  const IngredientSellerProduct = require('../models/IngredientSellerProduct');
  const existing = await IngredientSellerProduct.findOne({
    where: {
      seller_type: seller.sellerType,
      seller_entity_id: seller.sellerEntityId,
      seller_product_id: seller.sellerProductRow.id,
      ...(extraWhere || {})
    },
    transaction
  });
  if (!existing) return null;
  const target = await findTarget(existing[targetKey]);
  if (target && ownsTarget(target)) {
    return { ok: true, status: 200, body: { success: true, data: { ingredient: target, mapping: existing, created: false } } };
  }
  return null;
}

/** create 모드의 매핑 생성 (신규 대상이므로 is_preferred=true). */
async function createMappingFor({ target, seller, unitConversion, targetKey, transaction }) {
  const IngredientSellerProduct = require('../models/IngredientSellerProduct');
  return IngredientSellerProduct.create(
    mappingAttrs({ seller, unitConversion, isPreferred: true, targetKey, targetId: target.id }),
    { transaction }
  );
}


/**
 * 이름 매칭 정규화 (설계문서 §6 — 매칭용).
 * NFKC → 모든 유니코드 공백을 일반 공백으로 → 연속 공백 축약 → trim → 소문자.
 * ⚠ 매칭 제안 전용이다. **저장 데이터를 이걸로 덮어쓰지 말 것**(저장용 규칙은 따로다).
 */
function normalizeName(v) {
  return String(v == null ? '' : v)
    .normalize('NFKC')
    .replace(/[\s\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000\uFEFF]+/g, ' ')
    .trim()
    .toLowerCase();
}

module.exports = {
  normalizeName,
  UNIT_ENUM,
  UNIT_MAP,
  normalizeUnit,
  resolveUnit,
  resolveUnitConversion,
  resolveSellerProduct,
  connectExisting,
  findAlreadyLinked,
  createMappingFor,
  mappingAttrs
};
