const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope, applyBGFilter, assertBGOwnsRow, requireBrandScope } = require('../middleware/brandScope');
const { sanitizeString } = require('../middleware/validation');
const {
  ProductIngredient,
  ProductIngredientCategory,
  ProductRecipeIngredient,
  PurchaseOrder,
  PurchaseOrderItem
} = require('../models');
const { Op } = require('sequelize');
const { parseMinOrderQty } = require('../utils/quantity');

router.use(authenticateToken);
router.use(requireBGScope);

// ==================== 프로덕트 재료 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category_id, search, is_active } = req.query;

    const where = {};
    applyBGFilter(where, req);
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } }
      ];
    }

    const ingredients = await ProductIngredient.findAll({
      where,
      include: [
        { model: ProductIngredientCategory, as: 'category' }
      ],
      order: [['name', 'ASC']]
    });

    // include=sellers — 발주 화면용: 각 재고아이템의 공급업체상품 매핑(SellerOpt) 첨부
    let data = ingredients;
    if (String(req.query.include || '').includes('sellers') && ingredients.length) {
      const { IngredientSellerProduct, SupplierCompany, SupplierProduct, BrandProduct, Brand, Foodcourt } = require('../models');
      const ids = ingredients.map(i => i.id);
      const maps = await IngredientSellerProduct.findAll({ where: { product_ingredient_id: ids, is_active: true } });
      // 판매품목 정체성(name/sku) 해석 — 공급업체/브랜드 판매품목명·SKU를 내부 재고와 함께 표시(P0-1 + 브랜드 확장 2026-07-05)
      const spIds = [...new Set(maps.filter(m => m.seller_type === 'supplier' && m.seller_product_id).map(m => m.seller_product_id))];
      const spMap = spIds.length ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: spIds }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(s => [s.id, s])) : {};
      const bpIds = [...new Set(maps.filter(m => m.seller_type === 'brand' && m.seller_product_id).map(m => m.seller_product_id))];
      const bpMap = bpIds.length ? Object.fromEntries((await BrandProduct.findAll({ where: { id: bpIds }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(b => [b.id, b])) : {};
      // 판매자 이름 해석
      const supIds = [...new Set(maps.filter(m => m.seller_type === 'supplier' && m.seller_entity_id).map(m => m.seller_entity_id))];
      const brIds = [...new Set(maps.filter(m => m.seller_type === 'brand' && m.seller_entity_id).map(m => m.seller_entity_id))];
      const fcIds = [...new Set(maps.filter(m => m.seller_type === 'foodcourt' && m.seller_entity_id).map(m => m.seller_entity_id))];
      const supMap = supIds.length ? Object.fromEntries((await SupplierCompany.findAll({ where: { id: supIds }, attributes: ['id', 'name'] })).map(s => [s.id, s.name])) : {};
      const brMap = brIds.length ? Object.fromEntries((await Brand.findAll({ where: { id: brIds }, attributes: ['id', 'name'] })).map(b => [b.id, b.name])) : {};
      const fcMap = fcIds.length ? Object.fromEntries((await Foodcourt.findAll({ where: { id: fcIds }, attributes: ['id', 'name'] })).map(f => [f.id, f.name])) : {};
      const byIng = {};
      for (const m of maps) {
        const name = m.seller_type === 'supplier' ? (supMap[m.seller_entity_id] || 'Supplier')
          : m.seller_type === 'brand' ? (brMap[m.seller_entity_id] || 'Brand')
          : m.seller_type === 'foodcourt' ? (fcMap[m.seller_entity_id] || 'Foodcourt')
          : 'System';
        const sp = m.seller_type === 'supplier' ? spMap[m.seller_product_id]
          : m.seller_type === 'brand' ? bpMap[m.seller_product_id] : null;
        (byIng[m.product_ingredient_id] = byIng[m.product_ingredient_id] || []).push({
          id: m.id, seller_product_id: m.seller_product_id, seller_type: m.seller_type,
          seller_entity_id: m.seller_entity_id, seller_name: name,
          seller_product_name: sp?.name || null, seller_product_sku: sp?.sku || null,
          unit_price: m.unit_price, unit_conversion: m.unit_conversion, is_preferred: m.is_preferred
        });
      }
      data = ingredients.map(i => ({ ...i.toJSON(), sellers: byIng[i.id] || [] }));
    }

    // ── 연결된 판매 재료의 실재고 첨부 (읽기 전용) ────────────────────────────
    // `current_stock`(매입 계층 자체 수량)은 **건드리지 않는다.** 두 계층은 세는 대상이
    // 다르므로 하나로 덮어쓰면 어느 쪽도 못 믿게 된다. 대신 "이 자재와 같은 물건인 판매
    // 재료가 실제로 얼마나 있는가"를 별도 필드로 얹어, 화면이 둘을 나란히 보여줄 수 있게 한다.
    //   linked_stock       : 판매 계층(ingredients) 재고
    //   linked_store_total : 매장 오버레이(restaurant_ingredient_stocks) 합계 = 진짜 현물
    //   linked_stores      : 매장별 내역
    // 연결이 없으면 **null** 이다(0 이 아니다) — "연결 안 됨"과 "재고 0"은 다른 사실이다.
    // F7 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md): 열쇠를 **거울 쪽**으로 바꾼다.
    //   구 `product_ingredients.linked_ingredient_id` 는 Stock Item 1 → 재료 1 밖에 못 담아
    //   한 Stock Item 을 여러 브랜드에 공유하면 담지 못했고, 코드 주석이 쓰기를 금지해
    //   **운영 데이터가 0건이라 이 표시가 항상 null 이었다.** 이제 `ingredients.source_product_ingredient_id`
    //   로 역조회하므로 처음으로 값이 나온다. 거울이 여럿이면 **합산**한다(브랜드별 거울 각각의 몫).
    const { Ingredient, RestaurantIngredientStock, Restaurant } = require('../models');
    const { Op } = require('sequelize');
    const stockIds = data.map((i) => (i.toJSON ? i.toJSON() : i).id).filter(Boolean);
    const mirrors = stockIds.length
      ? await Ingredient.findAll({
          where: { source_product_ingredient_id: { [Op.in]: stockIds } },
          attributes: ['id', 'name', 'unit', 'current_stock', 'brand_id', 'is_active', 'source_product_ingredient_id']
        })
      : [];
    const mirrorsBySource = {};
    mirrors.forEach((m) => { (mirrorsBySource[m.source_product_ingredient_id] = mirrorsBySource[m.source_product_ingredient_id] || []).push(m); });

    const mirrorIds = mirrors.map((m) => m.id);
    const overlays = mirrorIds.length
      ? await RestaurantIngredientStock.findAll({
          where: { ingredient_id: { [Op.in]: mirrorIds } },
          attributes: ['ingredient_id', 'restaurant_id', 'current_stock'],
          include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name'], required: false }]
        })
      : [];
    const overlayByMirror = {};
    overlays.forEach((st) => {
      (overlayByMirror[st.ingredient_id] = overlayByMirror[st.ingredient_id] || []).push({
        restaurant_id: st.restaurant_id,
        restaurant_name: st.restaurant?.name || null,
        current_stock: parseFloat(st.current_stock) || 0
      });
    });

    data = data.map((i) => {
      const row = i.toJSON ? i.toJSON() : i;
      const ms = mirrorsBySource[row.id] || [];
      // 연결이 없으면 **null** 이다(0 이 아니다) — "연결 안 됨"과 "재고 0"은 다른 사실이다.
      if (!ms.length) return { ...row, shared_brand_ids: [], linked_stock: null, linked_store_total: null, linked_stores: [], linked_unit: null };
      const perStore = [];
      ms.forEach((m) => (overlayByMirror[m.id] || []).forEach((x) => perStore.push(x)));
      return {
        ...row,
        // F1: 이 Stock Item 이 지금 어느 브랜드에 공유돼 있는가 = **활성 거울이 있는 브랜드**.
        //     별도 플래그를 두지 않는다 — 두면 플래그와 실제 거울이 어긋나는 날이 온다.
        shared_brand_ids: ms.filter((m) => m.is_active !== false).map((m) => m.brand_id),
        linked_stock: ms.reduce((a, m) => a + (parseFloat(m.current_stock) || 0), 0),
        linked_store_total: perStore.reduce((a, b) => a + b.current_stock, 0),
        linked_stores: perStore,
        linked_unit: ms[0].unit || null
      };
    });

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching product ingredients:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== 재고 거래내역 (History) ====================
// GET /api/product-ingredients/transactions
// BG 재고아이템(ProductIngredient)의 InventoryTransaction 목록. 브랜드모드 History 탭.
// brandId 를 경로로 받지 않고 토큰(BGScope)로 소유 재고아이템을 좁힌 뒤 그 거래만 반환.
// ⚠️ 반드시 '/:id' 라우트보다 먼저 등록 (안 그러면 id='transactions' 로 매칭됨).
router.get('/transactions', async (req, res) => {
  try {
    const { InventoryTransaction } = require('../models');
    const where = {};
    applyBGFilter(where, req);
    const owned = await ProductIngredient.findAll({ where, attributes: ['id'] });
    const ids = owned.map(i => i.id);
    if (!ids.length) return res.json({ success: true, data: [] });

    const limit = Math.min(200, parseInt(req.query.limit, 10) || 50);
    const rows = await InventoryTransaction.findAll({
      where: { product_ingredient_id: ids },
      include: [{ model: ProductIngredient, as: 'productIngredient', attributes: ['id', 'name', 'unit'] }],
      order: [['created_at', 'DESC']],
      limit
    });
    // Shape to match TransactionHistorySection (expects `ingredient.name`).
    const data = rows.map(r => {
      const j = r.toJSON();
      return { ...j, ingredient: j.productIngredient || null };
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching product ingredient transactions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET /api/product-ingredients/stock-products
// 레시피 없는 브랜드 프로덕트 = 그 자체가 재고아이템 (RA /stock-products 와 같은 모양).
// 2026-09-02(P3): 화면이 프로덕트를 고를 수 있게 하는 목록.
router.get('/stock-products', async (req, res) => {
  try {
    const { BrandProduct, IngredientSellerProduct } = require('../models');
    const rows = await BrandProduct.findAll({
      where: {
        owner_user_id: req.bgOwnerId,
        is_active: true,
        is_set_menu: false,
        product_recipe_id: null,
      },
      attributes: ['id', 'name', 'unit', 'stock_unit', 'current_stock', 'min_stock', 'category_id', 'created_at'],
      order: [['name', 'ASC']],
    });
    const ids = rows.map((r) => r.id);
    const links = ids.length
      ? await IngredientSellerProduct.findAll({ where: { brand_product_id: ids, is_active: true } })
      : [];
    const bySource = links.reduce((m2, l) => {
      (m2[l.brand_product_id] = m2[l.brand_product_id] || []).push(l);
      return m2;
    }, {});
    const data = rows.map((r) => ({
      id: r.id,
      kind: 'brand_product',
      name: r.name,
      unit: r.stock_unit || r.unit || null,
      current_stock: r.current_stock != null ? Number(r.current_stock) : null,
      min_stock: r.min_stock != null ? Number(r.min_stock) : null,
      category_id: r.category_id || null,
      created_at: r.created_at || null,
      sellerSources: (bySource[r.id] || []).map((s) => ({
        id: s.id,
        seller_product_id: s.seller_product_id,
        seller_type: s.seller_type,
        seller_entity_id: s.seller_entity_id,
        unit_price: Number(s.unit_price) || 0,
        unit_conversion: Number(s.unit_conversion) || 1,
        min_order_quantity: Number(s.min_order_quantity) || 1,
        lead_time_days: Number(s.lead_time_days) || 0,
        is_preferred: !!s.is_preferred,
      })),
    }));
    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /product-ingredients/stock-products error:', err);
    res.status(500).json({ success: false, message: 'Failed to load stock products' });
  }
});

// POST /api/product-ingredients/from-catalog
// — 발주 화면 "Supplier Catalog" 탭에서 catalog product 클릭 시 호출 (BG 용).
//   ProductIngredient(owner_user_id) + IngredientSellerProduct(product_ingredient_id) 매핑 자동 생성. idempotent.
//   routes/ingredients.js 의 brand from-catalog 와 동일 로직이나 ProductIngredient 패밀리로 생성.
// ============================================
router.post('/from-catalog', async (req, res) => {
  const t = await ProductIngredient.sequelize.transaction();
  try {
    if (req.bgOwnerId == null) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }
    const body = req.body || {};
    const SupplierContract = require('../models/SupplierContract');
    const { Brand } = require('../models');
    const catalogLink = require('../utils/catalogLink');

    const seller = await catalogLink.resolveSellerProduct({
      body,
      transaction: t,
      // BG 소유 브랜드 중 하나라도 이 공급업체와 active 계약 필요 (seller-sources POST 와 동일 검증)
      supplierContract: async (supplierCompanyId) => {
        const brandIds = (await Brand.findAll({ where: { owner_id: req.bgOwnerId }, attributes: ['id'], transaction: t })).map(b => b.id);
        if (!brandIds.length) return null;
        return SupplierContract.findOne({
          where: { entity_type: 'brand', entity_id: brandIds, supplier_company_id: supplierCompanyId, status: 'active' },
          transaction: t
        });
      },
      // ⚠ 정렬 미지정 findOne — 다브랜드 소유자면 **비결정적**이다(잠복 결함, 설계문서 §7).
      //    동작 보존 대상이라 그대로 둔다. 새 코드는 restaurant 의미(brand_id)를 따를 것.
      brandSellerEntityId: async (bp) => {
        const sellerBrand = bp.owner_user_id
          ? await Brand.findOne({ where: { owner_id: bp.owner_user_id }, attributes: ['id'], transaction: t })
          : null;
        return sellerBrand ? sellerBrand.id : null;
      }
    });
    if (!seller.ok) { await t.rollback(); return res.status(seller.status).json(seller.body); }

    const finalUnit = catalogLink.resolveUnit(body.unit, seller.productUnit);
    const unitConversion = catalogLink.resolveUnitConversion(body.unit_conversion);

    // 2026-09-02(P3-②): 레시피 없는 브랜드 프로덕트도 "우리 쪽 항목"이 될 수 있다(RA 와 대칭).
    //   ⛔ 판매가를 공급가로 채우지 않는다 — 마진 0 사고 재발 방지.
    const existingBpId = parseInt(body.existing_brand_product_id, 10);
    if (Number.isFinite(existingBpId)) {
      const { BrandProduct } = require('../models');
      const bp = await BrandProduct.findByPk(existingBpId, { transaction: t });
      if (!bp || bp.owner_user_id !== req.bgOwnerId) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target product not found' });
      }
      if (bp.product_recipe_id || bp.is_set_menu) {
        await t.rollback();
        return res.status(400).json({
          success: false, code: 'PRODUCT_HAS_RECIPE',
          message: 'This product has a recipe — its stock comes from ingredients, not from purchases'
        });
      }
      const r = await catalogLink.connectExisting({
        target: bp, seller, unitConversion, targetKey: 'brand_product_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    // 새 브랜드 프로덕트로 등록 — 판매가 필수(빈 값·0 이하면 400)
    if (body.new_product && typeof body.new_product === 'object') {
      const np = body.new_product;
      const price = parseFloat(np.price);
      if (!Number.isFinite(price) || price <= 0) {
        await t.rollback();
        return res.status(400).json({
          success: false, code: 'PRICE_REQUIRED',
          message: 'Selling price is required for a new product (supplier cost is never copied into it)'
        });
      }
      const { BrandProduct } = require('../models');
      const unitForProduct = catalogLink.resolveUnit(np.unit, seller.productUnit);
      const bp = await BrandProduct.create({
        owner_user_id: req.bgOwnerId,
        category_id: np.category_id || null,
        name: sanitizeString(String(np.name || seller.productName || '')).slice(0, 255),
        unit: unitForProduct,
        // 레시피 없는 프로덕트는 판매 단위 = 재고 단위여야 한다(환산 필드가 없다 — R-SC-012)
        stock_unit: unitForProduct,
        base_quantity: 1,
        unit_price: price,
        min_order_quantity: 1,
        is_active: true,
        current_stock: 0,
        min_stock: parseFloat(np.min_stock) || 0,
      }, { transaction: t });
      const mapping = await catalogLink.createMappingFor({
        target: bp, seller, unitConversion, targetKey: 'brand_product_id', transaction: t
      });
      await t.commit();
      return res.status(201).json({ success: true, data: { product: bp, mapping, created: true } });
    }

    // Connect mode — 기존 BG 소유 ProductIngredient 에 매핑만 추가
    const existingPiId = parseInt(body.existing_product_ingredient_id, 10);
    if (Number.isFinite(existingPiId)) {
      const targetPi = await ProductIngredient.findByPk(existingPiId, { transaction: t });
      if (!targetPi || targetPi.owner_user_id !== req.bgOwnerId) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target stock item not found' });
      }
      const r = await catalogLink.connectExisting({
        target: targetPi, seller, unitConversion, targetKey: 'product_ingredient_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    // Idempotent — 이미 매핑된 ProductIngredient 가 이 BG 소유면 그대로 반환
    const already = await catalogLink.findAlreadyLinked({
      seller, targetKey: 'product_ingredient_id',
      findTarget: (id) => ProductIngredient.findByPk(id, { transaction: t }),
      ownsTarget: (pi) => pi.owner_user_id === req.bgOwnerId,
      extraWhere: { product_ingredient_id: { [Op.ne]: null } },
      transaction: t
    });
    if (already) { await t.commit(); return res.status(already.status).json(already.body); }

    // 새 ProductIngredient + 매핑 생성
    const scopedCount = await ProductIngredient.count({ where: { owner_user_id: req.bgOwnerId }, transaction: t });
    const code = `PI-${String(scopedCount + 1).padStart(3, '0')}`;
    const ingredient = await ProductIngredient.create({
      owner_user_id: req.bgOwnerId,
      code,
      name: body.name || seller.productName,
      unit: finalUnit,
      base_quantity: 1,
      unit_cost: parseFloat(seller.productPrice) || 0,
      min_stock: 0,
      min_order: 0,
      current_stock: 0,
      lead_time_days: 1,
      safety_stock_percent: 20,
      // 재고 관리는 사람이 켠다(모델 기본값과 동일 규칙)
      is_active: true
    }, { transaction: t });

    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion, targetKey: 'product_ingredient_id', transaction: t
    });

    await t.commit();
    res.status(201).json({ success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/product-ingredients/from-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create stock item from catalog' });
  }
});

// Usage: linked recipes and products
router.get('/:id/usage', async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductRecipe, BrandProduct } = require('../models');

    const ingredient = await ProductIngredient.findByPk(id);
    if (!assertBGOwnsRow(ingredient, req, res)) return;

    // Recipes using this ingredient
    const recipeLinks = await ProductRecipeIngredient.findAll({
      where: { ingredient_id: id },
      include: [{ model: ProductRecipe, as: 'recipe', attributes: ['id', 'name'] }]
    });
    const recipes = recipeLinks.filter(rl => rl.recipe).map(rl => ({ id: rl.recipe.id, name: rl.recipe.name }));

    // Products linked via product_recipe_id
    const recipeIds = recipes.map(r => r.id);
    let products = [];
    if (recipeIds.length > 0) {
      products = await BrandProduct.findAll({
        where: { product_recipe_id: { [Op.in]: recipeIds } },
        attributes: ['id', 'name', 'unit_price']
      });
      products = products.map(p => p.get({ plain: true }));
    }

    res.json({ success: true, data: { recipes, products } });
  } catch (error) {
    console.error('Get product ingredient usage error:', error);
    res.status(500).json({ success: false, message: 'Failed to get usage' });
  }
});

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id, {
      include: [
        { model: ProductIngredientCategory, as: 'category' }
      ]
    });

    if (!assertBGOwnsRow(ingredient, req, res)) return;

    res.json({
      success: true,
      data: ingredient
    });
  } catch (error) {
    console.error('Error fetching product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 생성
router.post('/', async (req, res) => {
  try {
    const {
      name, category_id, image_url, unit, base_quantity,
      unit_cost, supplier_name, supplier_id,
      min_stock, min_order, current_stock,
      lead_time_days, safety_stock_percent,
      manual_daily_usage
    } = req.body;

    // 코드 자동 생성 (BG 소유 내 카운트)
    const scopedCount = await ProductIngredient.count({
      where: req.bgOwnerId != null ? { owner_user_id: req.bgOwnerId } : {}
    });
    const code = `PI-${String(scopedCount + 1).padStart(3, '0')}`;

    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    const ingredient = await ProductIngredient.create({
      owner_user_id: req.bgOwnerId,
      code,
      name,
      category_id,
      image_url,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost: unit_cost || 0,
      // 레거시 단일공급 컬럼 쓰기 중단 (2026-07-04). 공급처=seller-source 매핑(ingredient_seller_products, product_ingredient_id).
      supplier_name: null,
      supplier_id: null,
      min_stock: min_stock || 0,
      min_order: min_order || 0,
      current_stock: current_stock || 0,
      lead_time_days: lead_time_days || 1,
      safety_stock_percent: safety_stock_percent || 20,
      manual_daily_usage,
      // 재고 관리는 **사람이 켠다**. 예전엔 값을 안 보내면 켜진 채로 만들어져,
      // 만든 것이 전부 관리 대상이 됐다(운영 실측 289/289 켜짐, 수량 있는 건 3개).
      is_active: true
    });

    const createdIngredient = await ProductIngredient.findByPk(ingredient.id, {
      include: [{ model: ProductIngredientCategory, as: 'category' }]
    });

    res.status(201).json({
      success: true,
      data: createdIngredient,
      message: 'Product ingredient created successfully'
    });
  } catch (error) {
    console.error('Error creating product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ingredient, req, res)) return;

    // 부분 업데이트 지원 - undefined가 아닌 필드만 업데이트
    // 레거시 supplier_name/supplier_id 는 목록에서 제외 = API 로 더는 수정 안 함(기존 값 보존). 공급처=seller-source 매핑.
    const updateFields = [
      'name', 'category_id', 'image_url', 'unit', 'base_quantity',
      // 단위 다섯 칸 (docs/TRADE_STRUCTURE.md §2-2): 취급단위 unit · 취급 기준숫자 base_quantity
      //   · 기준단위 package_unit · 기준양 package_quantity · 가격 unit_cost
      'package_unit', 'package_quantity',
      'unit_cost',
      'min_stock', 'min_order', 'current_stock',
      'lead_time_days', 'safety_stock_percent',
      'manual_daily_usage', 'is_active'
    ];

    const updateData = {};
    for (const field of updateFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // 단위 변경 보호 (2026-09-04): 거울에 레시피 줄이 붙어 있는데 단위를 바꾸면
    //   레시피 수량의 의미가 말없이 바뀐다(예: 5 g → 5 kg). 거부하고 사람이 결정하게 한다.
    if (updateData.unit !== undefined && String(updateData.unit) !== String(ingredient.unit)) {
      // ⚠ 거울 경유(recipe_ingredients)**와** 직접 연결(product_recipe_ingredients) **둘 다** 센다.
      //   직접 연결을 빼면 그쪽 줄의 의미가 조용히 바뀐다(2026-09-05 Fable 지적).
      const [{ n: recipeLines }] = await ProductIngredient.sequelize.query(
        `SELECT (SELECT COUNT(*) FROM recipe_ingredients ri
                   JOIN ingredients i ON i.id = ri.ingredient_id
                  WHERE i.source_product_ingredient_id = :id)
              + (SELECT COUNT(*) FROM product_recipe_ingredients pri
                  WHERE pri.ingredient_id = :id) n`,
        { replacements: { id: ingredient.id }, type: ProductIngredient.sequelize.QueryTypes.SELECT }
      );
      if (Number(recipeLines) > 0) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'UNIT_LOCKED_BY_RECIPES',
            message: `Unit is used by ${recipeLines} recipe line(s). Change the recipes first.`,
            recipe_lines: Number(recipeLines)
          }
        });
      }
    }

    await ingredient.update(updateData);

    // F1: 공유 브랜드 체크 반영 — 켠 브랜드엔 거울 생성(있으면 살림), 끈 브랜드는 해제.
    //   해제는 참조가 있으면 **거부되고 사유가 돌아온다**(카테고리 삭제와 같은 규칙).
    //   거부된 브랜드는 응답 `share_blocked` 로 알려 화면이 조용히 실패하지 않게 한다.
    let shareBlocked = [];
    if (Array.isArray(req.body.shared_brand_ids)) {
      const { Ingredient } = require('../models');
      const { shareToBrand, unshareFromBrand } = require('../services/stockItemMirror');
      const want = new Set(req.body.shared_brand_ids.map(Number).filter(Number.isFinite));
      const existing = await Ingredient.findAll({
        where: { source_product_ingredient_id: ingredient.id },
        attributes: ['id', 'brand_id', 'is_active']
      });
      const have = new Set(existing.filter((m) => m.is_active !== false).map((m) => Number(m.brand_id)));
      for (const b of want) if (!have.has(b)) await shareToBrand(ingredient, b);
      for (const b of have) {
        if (want.has(b)) continue;
        const r = await unshareFromBrand(ingredient, b);
        if (!r.changed && r.reason === 'in-use') shareBlocked.push({ brand_id: b, ...r.detail });
      }
    }

    // F2 (docs/INGREDIENT_UNIFICATION_DESIGN.md): Stock Item 의 정체성 변경을 거울에 흘려보낸다.
    //   방향은 Stock Item → 거울 한 방향뿐. 실패해도 본 저장을 되돌리지 않되 조용히 삼키지 않는다.
    try {
      const { syncMirrors } = require('../services/stockItemMirror');
      const r = await syncMirrors(ingredient);
      if (r.updated) console.log(`[mirror] Stock Item ${ingredient.id} → 거울 ${r.updated}건 동기화`);
    } catch (e) {
      console.error(`[mirror] Stock Item ${ingredient.id} 거울 동기화 실패:`, e.message);
    }

    const updatedIngredient = await ProductIngredient.findByPk(ingredient.id, {
      include: [{ model: ProductIngredientCategory, as: 'category' }]
    });

    res.json({
      success: true,
      // 해제가 거부된 브랜드가 있으면 조용히 넘기지 않는다 — 화면이 사유를 보여줘야 한다.
      share_blocked: shareBlocked,
      data: updatedIngredient,
      message: 'Product ingredient updated successfully'
    });
  } catch (error) {
    console.error('Error updating product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ingredient, req, res)) return;

    // 레시피에서 사용 중인지 확인
    const usageCount = await ProductRecipeIngredient.count({
      where: { ingredient_id: ingredient.id }
    });
    if (usageCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete ingredient. It is used in ${usageCount} recipe(s).`
      });
    }

    // 거울 정리 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
    //   이 Stock Item 을 공유받은 브랜드 거울이 있으면 먼저 해제한다.
    //   참조(레시피 줄·매장 덧씌우기·공급처 연결)가 하나라도 있으면 **삭제하지 않는다** —
    //   그냥 지우면 인스펙션 ING-UNI-003 이 사후에 잡을 고아를 우리가 사전에 만드는 꼴이다.
    {
      const { Ingredient } = require('../models');
      const { unshareFromBrand } = require('../services/stockItemMirror');
      const mirrors = await Ingredient.findAll({
        where: { source_product_ingredient_id: ingredient.id },
        attributes: ['id', 'brand_id', 'name']
      });
      const blocked = [];
      for (const m of mirrors) {
        const r = await unshareFromBrand(ingredient, m.brand_id);
        if (!r.changed && r.reason === 'in-use') blocked.push({ brand_id: m.brand_id, ...r.detail });
      }
      if (blocked.length) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MIRROR_IN_USE',
            message: 'This Stock Item is shared and still in use. Remove those uses first.',
            blocked
          }
        });
      }
      // 참조가 없어 비활성된 거울은 출처를 끊어 고아 참조를 남기지 않는다(행은 이력으로 보존).
      if (mirrors.length) {
        await Ingredient.update(
          { source_product_ingredient_id: null },
          { where: { source_product_ingredient_id: ingredient.id } }
        );
      }
    }

    await ingredient.destroy();

    res.json({
      success: true,
      message: 'Product ingredient deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 재고 조정
// GET /api/product-ingredients/:id/open-po-lines
// 이 브랜드 재고아이템이 담긴 "입고 가능한" 발주 라인을 돌려준다.
// RA 쪽 `GET /restaurants/:id/inventory/open-po-lines` 와 **대칭**이다 —
// 다른 점은 PO 라인을 ingredient_id 가 아니라 product_ingredient_id 로 찾는다는 것뿐.
//
// 왜 필요한가: 브랜드 입고(POST /:id/adjust-stock)와 발주 수령(PO /receive 의
// product_ingredient_id 분기)이 **같은 ProductIngredient.current_stock 을 각각 올린다.**
// 서로를 모르므로 같은 물건을 양쪽에서 처리하면 재고가 두 번 더해진다.
// 그래서 입고 화면이 진행 중 발주를 보여주고, 사용자가 고르면 발주 경로로 태운다.
// ⚠ 조회 전용 — 상태를 바꾸지 않는다. 실제 입고는 POST /purchase-orders/:id/receive 가 유일한 경로.
router.get('/:id/open-po-lines', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    // 남의 브랜드 재고아이템으로 남의 발주를 들여다보지 못하게 소유권부터 본다.
    if (!assertBGOwnsRow(ingredient, req, res)) return;

    // purchase-orders-workflow.js 의 RECEIVABLE_STATUSES 와 같은 집합.
    // pending_approval 은 제외 — 승인 전에는 입고할 수 없다.
    const RECEIVABLE = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received'];

    const pos = await PurchaseOrder.findAll({
      where: { status: { [Op.in]: RECEIVABLE } },
      attributes: ['id', 'po_number', 'status', 'entity_type', 'entity_id', 'expected_delivery_date', 'submitted_at'],
      include: [{
        model: PurchaseOrderItem,
        as: 'items',
        attributes: ['id', 'product_ingredient_id', 'quantity_ordered', 'quantity_received', 'unit_conversion', 'unit_price'],
        where: { product_ingredient_id: ingredient.id },
        required: true
      }],
      order: [['submitted_at', 'ASC']]
    });

    // 남의 발주가 섞이지 않게 구매자를 좁힌다.
    // ⚠ ProductIngredient 에는 brand_id 가 없다 — 소유는 `owner_user_id`(BG 사용자) 다.
    //    그래서 "이 재고아이템의 브랜드"를 행에서 직접 못 읽고, 요청자의 BG 스코프로 판정한다.
    //    (assertBGOwnsRow 가 이미 owner_user_id === req.bgOwnerId 를 통과시킨 뒤다.)
    const myBrandId = req.user?.brand_id != null ? parseInt(req.user.brand_id, 10) : null;

    const lines = [];
    for (const po of pos) {
      if (po.entity_type !== 'brand') continue;
      // SA(bgOwnerIsAdmin)는 브랜드 한정이 없으므로 통과시킨다.
      if (!req.bgOwnerIsAdmin) {
        if (myBrandId == null || parseInt(po.entity_id, 10) !== myBrandId) continue;
      }
      for (const it of (po.items || [])) {
        const remaining = Math.round(((parseFloat(it.quantity_ordered) || 0) - (parseFloat(it.quantity_received) || 0)) * 100) / 100;
        if (remaining <= 0) continue; // 이미 다 받은 줄은 제안하지 않는다
        lines.push({
          purchase_order_id: po.id,
          po_number: po.po_number,
          po_status: po.status,
          expected_delivery_date: po.expected_delivery_date,
          item_id: it.id,
          quantity_ordered: parseFloat(it.quantity_ordered) || 0,
          quantity_received: parseFloat(it.quantity_received) || 0,
          quantity_remaining: remaining,
          unit_conversion: parseFloat(it.unit_conversion) || 1,
          unit_price: parseFloat(it.unit_price) || 0,
          ingredient_unit: ingredient.unit
        });
      }
    }

    res.json({ success: true, data: lines });
  } catch (error) {
    console.error('product-ingredients open-po-lines error:', error);
    res.status(500).json({ success: false, message: 'Failed to load open purchase order lines' });
  }
});

// POST /api/product-ingredients/:id/register-as-product
// 재고아이템을 **그대로 파는 브랜드 프로덕트**로도 등록한다 (P3-③ · RA 대칭).
// 수량은 재고아이템 한 곳에만 산다 — 프로덕트에는 **재료 ×1 레시피**를 걸어
// 출고(판매) 때 재고아이템에서 빠지게 한다(seller-orders 의 BOM 차감 경로).
// ⛔ 판매가 필수(공급가 복사 금지) · 중복이면 409 · 전부 한 트랜잭션.
router.post('/:id/register-as-product', requireBrandScope(), async (req, res) => {
  const { sequelize } = require('../config/database');
  const t = await sequelize.transaction();
  try {
    const { BrandProduct, ProductRecipe } = require('../models');
    const price = parseFloat(req.body?.price);
    if (!Number.isFinite(price) || price <= 0) {
      await t.rollback();
      return res.status(400).json({
        success: false, code: 'PRICE_REQUIRED',
        message: 'Selling price is required (supplier cost is never copied into it)'
      });
    }

    // 브랜드 결정 — 명시된 brand_id, 없으면 소유 브랜드가 하나일 때만 자동.
    // 둘 이상이면 **고르게 한다**(임의 선택은 남의 브랜드에 프로덕트를 만드는 사고가 된다).
    let brandId = req.brandScope.brandId;
    if (brandId == null && !req.brandScope.isAdmin && req.brandScope.ownedBrandIds?.length === 1) {
      brandId = req.brandScope.ownedBrandIds[0];
    }
    if (brandId == null) {
      await t.rollback();
      return res.status(400).json({ success: false, code: 'BRAND_REQUIRED', message: 'brand_id required' });
    }

    const ing = await ProductIngredient.findByPk(parseInt(req.params.id, 10), { transaction: t });
    if (!ing || (ing.owner_user_id != null && ing.owner_user_id !== req.bgOwnerId)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Stock item not found' });
    }

    // 중복 — 이 재고아이템 하나만 쓰는 레시피에 걸린 내 브랜드 프로덕트가 이미 있으면 그것이 답이다.
    const linksOfIngredient = await ProductRecipeIngredient.findAll({
      where: { ingredient_id: ing.id }, attributes: ['recipe_id'], transaction: t
    });
    const candidateRecipeIds = [...new Set(linksOfIngredient.map((l) => l.recipe_id))];
    let soloRecipeIds = [];
    if (candidateRecipeIds.length) {
      const allLinks = await ProductRecipeIngredient.findAll({
        where: { recipe_id: candidateRecipeIds }, attributes: ['recipe_id', 'ingredient_id'], transaction: t
      });
      const countByRecipe = allLinks.reduce((m, l) => { m[l.recipe_id] = (m[l.recipe_id] || 0) + 1; return m; }, {});
      soloRecipeIds = candidateRecipeIds.filter((id) => countByRecipe[id] === 1);
    }
    if (soloRecipeIds.length) {
      const dup = await BrandProduct.findOne({
        where: { owner_user_id: req.bgOwnerId, product_recipe_id: soloRecipeIds, is_active: true },
        attributes: ['id', 'name'], transaction: t
      });
      if (dup) {
        await t.rollback();
        return res.status(409).json({
          success: false, code: 'ALREADY_A_PRODUCT',
          message: `Already sold as a product: ${dup.name}`,
          data: { product_id: dup.id, product_name: dup.name }
        });
      }
    }

    const name = sanitizeString(String(req.body?.name || ing.name)).slice(0, 255);
    // 코드는 기존 화면과 같은 방식(브랜드 스코프 내 카운트) — 형식을 여기서 새로 만들지 않는다.
    const scopedCount = await ProductRecipe.count({ where: { brand_id: brandId }, transaction: t });
    const recipe = await ProductRecipe.create({
      brand_id: brandId,
      code: `PR-${String(scopedCount + 1).padStart(3, '0')}`,
      name: name.slice(0, 100),
      yield_amount: 1,
      yield_unit: ing.unit || 'piece',
      is_active: true,
    }, { transaction: t });

    await ProductRecipeIngredient.create({
      recipe_id: recipe.id,
      ingredient_id: ing.id,
      quantity: 1,
      unit: ing.unit || 'piece',
      cost: parseFloat(ing.unit_cost) || 0,
    }, { transaction: t });

    const product = await BrandProduct.create({
      owner_user_id: req.bgOwnerId,
      category_id: req.body?.category_id || null,
      name,
      unit: ing.unit || null,
      // 레시피가 걸린 프로덕트는 자기 수량을 쓰지 않는다 — 재고는 재고아이템에 산다.
      stock_unit: ing.unit || null,
      base_quantity: 1,
      unit_price: price,
      min_order_quantity: 1,
      product_recipe_id: recipe.id,
      is_active: true,
      current_stock: 0,
      min_stock: 0,
    }, { transaction: t });

    // 브랜드 귀속 — 브랜드 프로덕트는 owner 소유이고, 어느 브랜드가 파는지는 별도 링크 테이블에 있다.
    try {
      const { BrandProductBrand } = require('../models');
      if (BrandProductBrand) {
        // 컬럼명은 product_id (brand_product_id 가 아니다 — 중간테이블 실제 스키마)
        await BrandProductBrand.findOrCreate({
          where: { product_id: product.id, brand_id: brandId },
          defaults: { product_id: product.id, brand_id: brandId },
          transaction: t,
        });
      }
    } catch (linkErr) {
      await t.rollback();
      console.error('register-as-product (BG) brand link failed:', linkErr);
      return res.status(500).json({ success: false, message: 'Failed to link product to brand' });
    }

    await t.commit();
    res.status(201).json({ success: true, data: { product, recipe } });
  } catch (error) {
    await t.rollback().catch(() => {});
    console.error('register-as-product (BG) error:', error);
    res.status(500).json({ success: false, message: 'Failed to register stock item as a product' });
  }
});

router.post('/:id/adjust-stock', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ingredient, req, res)) return;

    const { adjustment, reason, transaction_type } = req.body;
    const prevStock = parseFloat(ingredient.current_stock) || 0;
    const adj = parseFloat(adjustment) || 0;
    const newStock = Math.max(0, prevStock + adj);

    await ingredient.update({ current_stock: newStock });

    // Record history so the brand Inventory History tab reflects the movement. Audit #36.
    // Filtered/displayed by product_ingredient_id, so a null entity_id (brand_id absent)
    // never hides the row.
    try {
      const { InventoryTransaction } = require('../models');
      const VALID_TYPES = ['initial', 'purchase', 'order_deduct', 'stock_take', 'waste', 'adjustment', 'return_in', 'return_out'];
      const txType = VALID_TYPES.includes(transaction_type)
        ? transaction_type
        : (adj >= 0 ? 'adjustment' : 'waste');
      await InventoryTransaction.create({
        entity_type: 'brand',
        entity_id: req.user?.brand_id || null,
        product_ingredient_id: ingredient.id,
        transaction_type: txType,
        quantity_change: adj,
        unit: ingredient.unit,
        stock_after: newStock,
        notes: reason || null,
        created_by: req.user?.id || null
      });
    } catch (txErr) {
      console.error('adjust-stock transaction record failed:', txErr.message);
    }

    res.json({
      success: true,
      data: {
        previous_stock: prevStock,
        adjustment: adj,
        new_stock: newStock,
        reason
      },
      message: 'Stock adjusted successfully'
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== 재고아이템 ↔ 공급업체 상품 매핑 (발주 연결) ====================
// RA 의 ingredient-seller-products 를 ProductIngredient(BG 재고아이템)용으로 미러.
// 이 매핑이 있어야 발주(PO)에서 해당 공급업체 상품으로 주문 가능.

// 매핑 목록
router.get('/:id/seller-sources', async (req, res) => {
  try {
    const ing = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ing, req, res)) return;
    const { IngredientSellerProduct, SupplierProduct } = require('../models');
    const rows = await IngredientSellerProduct.findAll({
      where: { product_ingredient_id: ing.id, is_active: true },
      order: [['is_preferred', 'DESC'], ['id', 'ASC']]
    });
    // Attach the supplier's own sale-product identity (name + SKU) so the UI can show
    // it alongside our internal stock-item name/code. paranoid:false keeps historical
    // (soft-deleted) products resolvable. Design P0-1.
    const spIds = [...new Set(rows.filter(r => r.seller_type === 'supplier' && r.seller_product_id).map(r => r.seller_product_id))];
    const spMap = spIds.length
      ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: spIds }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(s => [s.id, s]))
      : {};
    const data = rows.map(r => {
      const j = r.toJSON();
      const sp = r.seller_type === 'supplier' ? spMap[r.seller_product_id] : null;
      return { ...j, seller_product_name: sp?.name || null, seller_product_sku: sp?.sku || null };
    });
    res.json({ success: true, data });
  } catch (e) {
    console.error('Error listing seller-sources:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 매핑 생성
router.post('/:id/seller-sources', async (req, res) => {
  try {
    const ing = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ing, req, res)) return;
    const { IngredientSellerProduct, SupplierContract, Brand } = require('../models');
    const {
      seller_type, seller_entity_id, seller_product_id,
      unit_price, unit_conversion, min_order_quantity, lead_time_days, is_preferred
    } = req.body;

    const VALID = ['system_admin', 'brand', 'foodcourt', 'supplier'];
    if (!VALID.includes(seller_type)) {
      return res.status(400).json({ success: false, message: 'Invalid seller_type' });
    }
    const sellerProductId = parseInt(seller_product_id, 10);
    if (!Number.isFinite(sellerProductId)) {
      return res.status(400).json({ success: false, message: 'seller_product_id is required' });
    }
    const price = parseFloat(unit_price);
    if (!(price >= 0)) {
      return res.status(400).json({ success: false, message: 'unit_price must be >= 0' });
    }

    // 공급업체면 BG 소유 브랜드 중 하나라도 active 계약 필요
    if (seller_type === 'supplier') {
      const supplierId = parseInt(seller_entity_id, 10);
      if (!Number.isFinite(supplierId)) {
        return res.status(400).json({ success: false, message: 'seller_entity_id is required for supplier' });
      }
      const brandIds = (await Brand.findAll({ where: { owner_id: req.bgOwnerId }, attributes: ['id'] })).map(b => b.id);
      const contract = brandIds.length
        ? await SupplierContract.findOne({ where: { supplier_company_id: supplierId, entity_type: 'brand', entity_id: brandIds, status: 'active' } })
        : null;
      if (!contract) {
        return res.status(400).json({ success: false, code: 'NO_ACTIVE_CONTRACT', message: 'No active contract with this supplier' });
      }
    }

    if (is_preferred) {
      await IngredientSellerProduct.update({ is_preferred: false }, { where: { product_ingredient_id: ing.id } });
    }
    const created = await IngredientSellerProduct.create({
      ingredient_id: null,
      product_ingredient_id: ing.id,
      seller_type,
      seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null,
      seller_product_id: sellerProductId,
      unit_price: price,
      unit_conversion: parseFloat(unit_conversion) || 1,
      // 소수 보존 — parseInt 절삭 금지(utils/quantity 참조)
      min_order_quantity: parseMinOrderQty(min_order_quantity),
      lead_time_days: parseInt(lead_time_days, 10) || 0,
      is_preferred: !!is_preferred,
      is_active: true
    });
    res.json({ success: true, data: created });
  } catch (e) {
    console.error('Error creating seller-source:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 매핑 삭제
router.delete('/:id/seller-sources/:mappingId', async (req, res) => {
  try {
    const ing = await ProductIngredient.findByPk(req.params.id);
    if (!assertBGOwnsRow(ing, req, res)) return;
    const { IngredientSellerProduct } = require('../models');
    const row = await IngredientSellerProduct.findOne({ where: { id: req.params.mappingId, product_ingredient_id: ing.id } });
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    await row.destroy();
    res.json({ success: true });
  } catch (e) {
    console.error('Error deleting seller-source:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
