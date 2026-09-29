/**
 * 매장 «카탈로그에서 담기» — 단일 소스 (2026-09-30 route 에서 추출, 동작 불변).
 *
 * 매장이 판매자 상품(공급업체·브랜드·푸드코트)을 자기 재고아이템(또는 레시피 없는 프로덕트)에 연결한다.
 * 재고아이템 + 판매 연결(ingredient_seller_products)을 만들거나, 이미 연결돼 있으면 그대로 돌려준다(멱등).
 *
 * 쓰는 곳:
 *   - POST /api/restaurants/:restaurantId/ingredients/from-catalog (매장 화면 — checkRestaurantAccess 뒤)
 *   - POST /api/seller-orders (판매자가 매장 대신 주문을 넣을 때, 아직 연결 안 된 배포 상품 — 2026-09-30 Irene A안)
 *     «배포한 상품은 연결 없이 바로 주문» 을 새 경로 없이 이 함수로 한다 — 매장이 누를 버튼을 대신 누르는 것.
 *
 * ⚠ 권한 검사는 호출부 몫이다(매장 접근 / 판매자=그 매장의 브랜드). 이 함수는 판매자 상품이 그 매장에
 *   보이는지(배포 범위)만 본다 — 원래 라우트와 같다.
 * @returns {Promise<{status:number, body:object}>}
 */
const { sanitizeString } = require('../middleware/validation');
const { Ingredient } = require('../models');
const Restaurant = require('../models/Restaurant');

const __r = (status, body) => ({ status, body });

/**
 * 이 브랜드 프로덕트가 이 매장에 «보이는가» (배포 범위) — 담기 권한과 판매자 주문 추가 목록이 같은 판정을 쓴다.
 * 카탈로그 노출과 **같은 판정** — 브랜드의 소유자 ∪ 배정된 BG/BM (utils/managerBrandScope, 2026-09-21).
 * external_buyers 도 가맹점에는 그대로 보인다(supplier-directory 카탈로그 (4)) — 보이는데 연결이 403 이면 안 된다.
 */
async function brandProductVisibleToRestaurant(bp, rid, transaction) {
  const BrandProductBrand = require('../models/BrandProductBrand');
  const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'brand_id'], transaction });
  if (!rest || !rest.brand_id || !bp) return false;
  if (bp.distribution_mode === 'all' || bp.distribution_mode === 'external_buyers') {
    const { brandOwnerUserIds } = require('../utils/managerBrandScope');
    return (await brandOwnerUserIds(rest.brand_id)).includes(Number(bp.owner_user_id));
  }
  if (bp.distribution_mode === 'specific_brands') {
    return !!(await BrandProductBrand.findOne({ where: { product_id: bp.id, brand_id: rest.brand_id }, transaction }));
  }
  if (bp.distribution_mode === 'specific_restaurants') {
    const BrandProductRestaurant = require('../models/BrandProductRestaurant');
    return !!(await BrandProductRestaurant.findOne({ where: { product_id: bp.id, restaurant_id: rid }, transaction }));
  }
  return false;
}

async function linkCatalogProductToRestaurant(rid, body = {}) {
  const t = await Ingredient.sequelize.transaction();
  try {
    const SupplierContract = require('../models/SupplierContract');
    const FoodcourtProduct = require('../models/FoodcourtProduct');
    const catalogLink = require('../utils/catalogLink');

    const seller = await catalogLink.resolveSellerProduct({
      body,
      transaction: t,
      supplierContract: (supplierCompanyId) => SupplierContract.findOne({
        where: { entity_type: 'restaurant', entity_id: rid, supplier_company_id: supplierCompanyId, status: 'active' },
        transaction: t
      }),
      // ✅ 이 패밀리만 verifySellerRelation(restaurant.brand_id === seller_entity_id)과 정합한다.
      //    새 코드는 이 의미를 따를 것. 다른 패밀리는 다르다 — utils/catalogLink.js 상단 참조.
      brandSellerEntityId: async () => {
        const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'brand_id'], transaction: t });
        return rest && rest.brand_id ? rest.brand_id : null;
      },
      // distribution_mode 별 가맹 관계 검증 (원래 로직 그대로 — 아래 함수로 옮김)
      brandAccessCheck: (bp) => brandProductVisibleToRestaurant(bp, rid, t)
    });
    if (!seller.ok) { await t.rollback(); return __r(seller.status, seller.body); }

    // 부모 브랜드가 없으면 brand seller 를 해석할 수 없다 (원래 403 계약 유지)
    if (seller.sellerType === 'brand' && !seller.sellerEntityId) {
      await t.rollback();
      return __r(403, { success: false, message: 'Restaurant has no parent brand' });
    }

    // foodcourt 판매자 추가 검증 (원래 로직 그대로 — 공용 함수 밖의 패밀리 고유 규칙)
    if (seller.sellerType === 'foodcourt') {
      const fp = seller.sellerProductRow;
      const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'foodcourt_id'], transaction: t });
      if (!rest?.foodcourt_id || rest.foodcourt_id !== fp.foodcourt_id) {
        await t.rollback();
        return __r(403, { success: false, message: 'This foodcourt product is not available for your foodcourt' });
      }
      if (fp.distribution_mode === 'specific_restaurants') {
        const FoodcourtProductRestaurant = require('../models/FoodcourtProductRestaurant');
        const flink = await FoodcourtProductRestaurant.findOne({ where: { product_id: fp.id, restaurant_id: rid }, transaction: t });
        if (!flink) {
          await t.rollback();
          return __r(403, { success: false, message: 'This foodcourt product is not available for your restaurant' });
        }
      }
    }

    // Connect mode — body.unit_conversion 우선, 기본 1
    const bodyConversion = catalogLink.resolveUnitConversion(body.unit_conversion);
    // 2026-09-02(P3-②): 레시피 없는 프로덕트도 "우리 쪽 항목"이 될 수 있다.
    //   P1 에서 서버·컬럼은 열렸는데 입구(화면·라우트)가 재료만 받아 프로덕트를 고를 수 없었다.
    //   ⛔ 판매가를 공급가로 채우지 않는다 — 예전에 스크립트로 원가를 판매가에 복사해
    //      마진 0 을 운영에 박은 사고가 있었다([[reference_supplier_cost_copied_as_price]]).
    const existingProductId = parseInt(body.existing_product_id, 10);
    if (Number.isFinite(existingProductId)) {
      const { Product } = require('../models');
      const prod = await Product.findByPk(existingProductId, { transaction: t });
      if (!prod || parseInt(prod.restaurant_id, 10) !== rid) {
        await t.rollback();
        return __r(404, { success: false, message: 'Target product not found in this restaurant' });
      }
      if (prod.recipe_id || prod.product_recipe_id || prod.is_set_menu) {
        await t.rollback();
        return __r(400, {
          success: false, code: 'PRODUCT_HAS_RECIPE',
          message: 'This product has a recipe — its stock comes from ingredients, not from purchases'
        });
      }
      const r = await catalogLink.connectExisting({
        target: prod, seller, unitConversion: bodyConversion, targetKey: 'product_id', transaction: t
      });
      await t.commit();
      return __r(r.status, r.body);
    }

    // 새 프로덕트로 등록 — 판매가는 **사람이 넣어야 한다**(빈 값·0 이하면 400)
    if (body.new_product && typeof body.new_product === 'object') {
      const np = body.new_product;
      const price = parseFloat(np.price);
      if (!Number.isFinite(price) || price <= 0) {
        await t.rollback();
        return __r(400, {
          success: false, code: 'PRICE_REQUIRED',
          message: 'Selling price is required for a new product (supplier cost is never copied into it)'
        });
      }
      const { Product } = require('../models');
      const prod = await Product.create({
        restaurant_id: rid,
        name: sanitizeString(String(np.name || seller.productName || '')).slice(0, 255),
        // products.category 는 NOT NULL(기본값 없음) — null 로 넣으면 통째로 500 이 난다.
        // 이 화면엔 카테고리 칸이 없으므로 기존 관행값으로 떨어뜨린다(운영·dev 공통 'Uncategorized').
        category: np.category ? sanitizeString(String(np.category)).slice(0, 50) : 'Uncategorized',
        price,
        is_active: true,
        current_stock: 0,
        min_stock: parseFloat(np.min_stock) || 0,
        stock_unit: catalogLink.resolveUnit(np.unit, seller.productUnit),
      }, { transaction: t });
      const mapping = await catalogLink.createMappingFor({
        target: prod, seller, unitConversion: bodyConversion, targetKey: 'product_id', transaction: t
      });
      await t.commit();
      return __r(201, { success: true, data: { product: prod, mapping, created: true } });
    }

    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.restaurant_id !== rid) {
        await t.rollback();
        return __r(404, { success: false, message: 'Target ingredient not found in this restaurant' });
      }
      const r = await catalogLink.connectExisting({
        target: targetIng, seller, unitConversion: bodyConversion, targetKey: 'ingredient_id', transaction: t
      });
      await t.commit();
      return __r(r.status, r.body);
    }

    const already = await catalogLink.findAlreadyLinked({
      seller, targetKey: 'ingredient_id',
      findTarget: (id) => Ingredient.findByPk(id, { transaction: t }),
      ownsTarget: (ing) => ing.restaurant_id === rid,
      transaction: t
    });
    if (already) { await t.commit(); return __r(already.status, already.body); }

    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      restaurant_id: rid,
      brand_id: null,
      name: body.name || seller.productName,
      unit: catalogLink.resolveUnit(body.unit, seller.productUnit),
      base_quantity: 1,
      unit_cost: parseFloat(seller.productPrice) || 0,
      supplier_name: null,
      supplier_id: null,
      min_stock: 0,
      current_stock: 0,
      // ⚠ 이 패밀리만 true 다(다른 3벌은 false). 동작 보존 — 임의로 맞추지 말 것.
      is_active: true,
      code: ''
    }, { transaction: t });

    // 생성 흐름도 body 의 unit_conversion 을 받는다 (2026-08-30 수정).
    //   그전까지 여기만 **1 로 고정**돼 있었다 — 나머지 3벌(ingredients.js 2곳·product-ingredients.js)은
    //   원래부터 body 값을 넘기고 있었고, 이 패밀리만 예외였다.
    //   결과: 판매자 kg ↔ 재고 g 처럼 단위가 다른 링크가 환산비 1 로 만들어져
    //   **1kg 입고가 1g 으로 기록**됐다. 2026-08-30 실측으로 그런 링크 6건 확인
    //   (측정 사이에 4→6 으로 증가 = 이 버그가 계속 새 불량 링크를 만들고 있었다).
    //   bodyConversion 은 connect 모드가 쓰던 것과 **같은 값**이다(위에서 이미 해석됨) —
    //   `resolveUnitConversion` 이 양수만 통과시키고 그 외에는 1 로 떨어뜨린다.
    //   ⛔ 기존 6건 자동 백필은 하지 않는다 — tray→kg 는 기계가 추측할 수 없다(사람이 입력).
    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion: bodyConversion, targetKey: 'ingredient_id', transaction: t
    });

    await t.commit();
    return __r(201, { success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /restaurants/:restaurantId/ingredients/from-catalog error:', err);
    return __r(500, { success: false, message: 'Failed to create ingredient from catalog' });
  }
}

module.exports = { linkCatalogProductToRestaurant, brandProductVisibleToRestaurant };
