const { parseMinOrderQty } = require('./quantity');
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

const UNIT_ENUM = require('./stockUnits').STOCK_UNIT_ENUM; // 단일 소스 utils/stockUnits.js

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
function mappingAttrs({ seller, unitConversion, isPreferred, targetKey, targetId, buyerRestaurantId = null }) {
  // 2026-09-01: 타깃 컬럼이 4개(재료 2 + 프로덕트 2)로 늘었다. 여기서 손으로 분기하면
  // 새 타깃이 추가될 때 한 곳이 빠진다 → 넷 중 정확히 하나를 보장하는 공용 함수를 통과시킨다.
  const { stockTargetAttrs } = require('./stockTarget');
  return {
    ...stockTargetAttrs(targetKey, targetId),
    // 브랜드 재료에 매장이 붙인 연결이면 그 매장 id (2026-10-04 — utils/brandStockAccess.sellerLinkWritable)
    buyer_restaurant_id: buyerRestaurantId,
    seller_type: seller.sellerType,
    seller_entity_id: seller.sellerEntityId,
    seller_product_id: seller.sellerProductRow.id,
    unit_price: parseFloat(seller.productPrice) || 0,
    unit_conversion: unitConversion,
    // 최소주문은 소수를 허용한다 (measure 모드의 "최소 0.5kg").
    //   그전까지 `parseInt(...) || 1` 이었다 — 0.5 가 0 으로 잘리고 `|| 1` 이 1 로 되살려
    //   **판매자가 0.5kg 로 등록해도 링크에는 1 이 박혔다**(컬럼은 DECIMAL 로 넓혔는데
    //   4벌 공통 쓰기 경로가 잘라내면 확폭이 무의미하다 — 2026-08-30).
    //   폴백 1 은 유지한다: 값이 없거나(NaN/null) 0 이하면 종전대로 1.
    //   ⚠ `|| 1` 만으로는 부족하다 — 0.5 는 truthy 라 통과하지만 parseInt 가 먼저 죽인다.
    //     그래서 절삭(parseInt) 자체를 없애고 유한 양수만 통과시킨다.
    min_order_quantity: parseMinOrderQty(seller.productMinQty),
    lead_time_days: 0,
    is_preferred: isPreferred,
    is_active: true
  };
}

/**
 * connect 모드 — 기존 재고 항목에 매핑만 추가한다.
 * @returns {{ok:true, status, body}} | {ok:false, status, body}
 */
async function connectExisting({ target, seller, unitConversion, targetKey, transaction, buyerRestaurantId = null }) {
  const IngredientSellerProduct = require('../models/IngredientSellerProduct');
  // 중복·우선 판정은 같은 범위(공용 / 이 매장 연결) 안에서만 — 형제 매장 연결과 섞이지 않는다.
  const dupWhere = {
    [targetKey]: target.id,
    buyer_restaurant_id: buyerRestaurantId,
    seller_type: seller.sellerType,
    seller_entity_id: seller.sellerEntityId,
    seller_product_id: seller.sellerProductRow.id
  };
  const dup = await IngredientSellerProduct.findOne({ where: dupWhere, transaction });
  if (dup) {
    return { ok: true, status: 200, body: { success: true, data: { ingredient: target, mapping: dup, created: false, connected: true } } };
  }
  const otherCount = await IngredientSellerProduct.count({
    where: { [targetKey]: target.id, buyer_restaurant_id: buyerRestaurantId, is_active: true }, transaction
  });
  const mapping = await IngredientSellerProduct.create(
    mappingAttrs({ seller, unitConversion, isPreferred: otherCount === 0, targetKey, targetId: target.id, buyerRestaurantId }),
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

/**
 * «재고아이템으로 저장»(from-catalog 신규 생성) — 판매 상품 다섯 칸을 새 재고 행으로 옮기는 **단일 규칙**
 *   (2026-10-15 Fable 설계 D4 · Irene «재고아이템으로 저장해도 공급업체상품에 등록한 수량단위팩킹수랑팩킹단위들 안가져오네»)
 *   예전엔 4벌 모두 `base_quantity: 1` · 포장단위 없음 · `unit_cost = 판매가` 라 «10 kg/BOX RM 48» 이
 *   «1 kg 에 RM 48» 로 저장됐다(원가식 costSync.convertPrice 와 10배 어긋남).
 * 규칙 (docs/TRADE_STRUCTURE.md §2-2 — 항등식 base_quantity × unit = 1 package_unit = unit_cost):
 *   - measure(무게·부피로 주문): base 1 · 포장단위 = 판매자 포장단위(정규화, 없으면 null) · 원가 = 단위당 가격
 *   - pack: 판매자 내용물 단위 = 행 단위면 base = 판매자 기준숫자, kg↔g·L↔ml 이면 × costSync.FACTOR, 환산 불가면 1.
 *           포장단위 = 판매자 포장단위(utils/stockUnits.normalizeStockPackageUnit) → 없고 base≠1 이면 'pack'
 *           (화면 sellerOrderUnitOf 가 수량 단위를 pack 으로 접는 것과 같은 모양) · 없고 base=1 이면 null(배포 수렴 마이그에 맡김)
 *   - package_quantity 1 · unit_cost = 판매가(= 포장 1개 값). 연결 환산은 deriveLinkConversion 이 따로 낸다(행 base 를 보지 않는다).
 * @param {object} sellerRow 판매 상품 행(supplier/brand/foodcourt) — unit · base_quantity · package_unit · order_mode · unit_price
 * @param {{unit: string}} o  새 행의 취급단위(resolveUnit 결과)
 * @returns {{unit, base_quantity, package_unit, package_quantity, unit_cost}}
 */
function stockFieldsFromSellerProduct(sellerRow, { unit }) {
  const { normalizeStockPackageUnit } = require('./stockUnits');
  const sp = sellerRow || {};
  const price = parseFloat(sp.unit_price) || 0;
  const pkg = normalizeStockPackageUnit(sp.package_unit);
  if (sp.order_mode === 'measure') {
    return { unit, base_quantity: 1, package_unit: pkg, package_quantity: 1, unit_cost: price };
  }
  const sBase = parseFloat(sp.base_quantity);
  let base = 1;
  if (Number.isFinite(sBase) && sBase > 0) {
    const su = normalizeUnit(sp.unit).toLowerCase();
    const mu = String(unit || '').toLowerCase();
    if (su === mu) base = sBase;
    else {
      const { FACTOR } = require('../services/costSync');
      const f = FACTOR[`${su}->${mu}`];
      if (f != null) base = sBase * f;
    }
  }
  base = Math.round(base * 100) / 100 || 1;   // DECIMAL(10,2)
  const packageUnit = pkg || (base !== 1 ? 'pack' : null);
  return { unit, base_quantity: base, package_unit: packageUnit, package_quantity: 1, unit_cost: price };
}

/**
 * «이 판매자 상품을 이미 담았나» — 구매자의 네 연결 칸을 모두 보는 판정 하나 (2026-10-15 Fable 설계 D2).
 *   재고아이템(ingredient_id / product_ingredient_id) · 자체재고 메뉴(product_id) · 자체재고 브랜드 프로덕트(brand_product_id).
 * 전에는 카탈로그가 ingredient_id 만 봤다 → 메뉴로 담은 것·브랜드 재고아이템은 늘 «안 담음»(같은 물건 두 줄의 문).
 * 매장은 부모 브랜드 재료에 붙인 자기 연결과, 브랜드가 붙인 «출처 연결»(판매자 = 그 브랜드)도 담음으로 본다(2026-10-04·10-11 규칙 그대로).
 * @returns {Promise<{supplier:Object, brand:Object, foodcourt:Object}>} 각 seller_product_id → {kind, id}
 *   kind: 'ingredient' | 'product_ingredient' | 'product' | 'brand_product'. 한 상품에 여럿이면 재고아이템이 이긴다.
 */
async function linkedSellerProductMap(buyerEntity, { transaction } = {}) {
  const out = { supplier: {}, brand: {}, foodcourt: {} };
  if (!buyerEntity) return out;
  const { Op } = require('sequelize');
  const Ingredient = require('../models/Ingredient');
  const IngredientSellerProduct = require('../models/IngredientSellerProduct');
  const or = [];
  let brandSourceIngIds = new Set();

  if (buyerEntity.type === 'restaurant') {
    const rid = buyerEntity.id;
    const myIngIds = (await Ingredient.findAll({ where: { restaurant_id: rid }, attributes: ['id'], transaction })).map((i) => i.id);
    if (myIngIds.length) or.push({ ingredient_id: { [Op.in]: myIngIds } });
    or.push({ buyer_restaurant_id: rid });
    const { parentBrandIdOf } = require('./brandStockAccess');
    const parentBrandId = await parentBrandIdOf(rid);
    if (parentBrandId) {
      const brandIngs = (await Ingredient.findAll({
        where: { owner_type: 'brand', brand_id: parentBrandId, is_active: true }, attributes: ['id'], transaction
      })).map((i) => i.id);
      if (brandIngs.length) {
        brandSourceIngIds = new Set(brandIngs);
        or.push({ ingredient_id: { [Op.in]: brandIngs }, buyer_restaurant_id: null, seller_type: 'brand', seller_entity_id: parentBrandId });
      }
    }
    const Product = require('../models/Product');
    const myProdIds = (await Product.findAll({ where: { restaurant_id: rid }, attributes: ['id'], transaction })).map((p) => p.id);
    if (myProdIds.length) or.push({ product_id: { [Op.in]: myProdIds } });
  } else if (buyerEntity.type === 'brand') {
    const myIngIds = (await Ingredient.findAll({ where: { brand_id: buyerEntity.id }, attributes: ['id'], transaction })).map((i) => i.id);
    if (myIngIds.length) or.push({ ingredient_id: { [Op.in]: myIngIds } });
    // 브랜드 구매자의 재고아이템·프로덕트는 소유자(owner_user_id) 기준 — product-ingredients 의 req.bgOwnerId 와 같은 사람들
    const { brandOwnerUserIds } = require('./managerBrandScope');
    const owners = await brandOwnerUserIds(buyerEntity.id);
    if (owners.length) {
      const ProductIngredient = require('../models/ProductIngredient');
      const BrandProduct = require('../models/BrandProduct');
      const piIds = (await ProductIngredient.findAll({ where: { owner_user_id: { [Op.in]: owners } }, attributes: ['id'], transaction })).map((x) => x.id);
      if (piIds.length) or.push({ product_ingredient_id: { [Op.in]: piIds } });
      const bpIds = (await BrandProduct.findAll({ where: { owner_user_id: { [Op.in]: owners } }, attributes: ['id'], transaction })).map((x) => x.id);
      if (bpIds.length) or.push({ brand_product_id: { [Op.in]: bpIds } });
    }
  } else if (buyerEntity.type === 'foodcourt') {
    const myIngIds = (await Ingredient.findAll({ where: { foodcourt_id: buyerEntity.id }, attributes: ['id'], transaction })).map((i) => i.id);
    if (myIngIds.length) or.push({ ingredient_id: { [Op.in]: myIngIds } });
  }
  if (!or.length) return out;

  const rows = await IngredientSellerProduct.findAll({
    where: { [Op.or]: or, is_active: true },
    attributes: ['ingredient_id', 'product_ingredient_id', 'product_id', 'brand_product_id', 'seller_type', 'seller_product_id', 'buyer_restaurant_id'],
    transaction
  });
  const targetOf = (m) => (m.ingredient_id ? { kind: 'ingredient', id: m.ingredient_id }
    : m.product_ingredient_id ? { kind: 'product_ingredient', id: m.product_ingredient_id }
    : m.product_id ? { kind: 'product', id: m.product_id }
    : m.brand_product_id ? { kind: 'brand_product', id: m.brand_product_id } : null);
  // 덮어쓰기 순서(뒤가 이긴다): 자체재고 프로덕트 → 브랜드 출처 연결 → 자기 재고아이템 연결
  const rank = (m) => (!m.ingredient_id && !m.product_ingredient_id ? 0
    : (m.buyer_restaurant_id == null && brandSourceIngIds.has(m.ingredient_id) ? 1 : 2));
  rows.sort((a, b) => rank(a) - rank(b));
  for (const m of rows) {
    const bucket = out[m.seller_type];
    const target = targetOf(m);
    if (bucket && target) bucket[m.seller_product_id] = target;
  }
  return out;
}

module.exports = {
  normalizeName,
  stockFieldsFromSellerProduct,
  UNIT_ENUM,
  UNIT_MAP,
  normalizeUnit,
  resolveUnit,
  resolveUnitConversion,
  resolveSellerProduct,
  connectExisting,
  findAlreadyLinked,
  createMappingFor,
  linkedSellerProductMap,
  mappingAttrs
};
