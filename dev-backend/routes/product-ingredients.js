const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope, applyBGFilter, assertBGOwnsRow } = require('../middleware/brandScope');
const {
  ProductIngredient,
  ProductIngredientCategory,
  ProductRecipeIngredient
} = require('../models');
const { Op } = require('sequelize');

router.use(authenticateToken);
router.use(requireBGScope);

// ==================== 프로덕트 재료 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category_id, search, is_active, track_stock } = req.query;

    const where = {};
    applyBGFilter(where, req);
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (track_stock !== undefined) where.track_stock = track_stock === 'true';
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
    const linkedIds = [...new Set(data.map((i) => i.linked_ingredient_id).filter(Boolean))];
    if (linkedIds.length) {
      const { Ingredient, RestaurantIngredientStock, Restaurant } = require('../models');
      const linked = await Ingredient.findAll({
        where: { id: linkedIds },
        attributes: ['id', 'name', 'unit', 'current_stock']
      });
      const linkedMap = Object.fromEntries(linked.map((g) => [g.id, g]));
      const stocks = await RestaurantIngredientStock.findAll({
        where: { ingredient_id: linkedIds },
        attributes: ['ingredient_id', 'restaurant_id', 'current_stock'],
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name'], required: false }]
      });
      const byIngredient = {};
      stocks.forEach((st) => {
        (byIngredient[st.ingredient_id] = byIngredient[st.ingredient_id] || []).push({
          restaurant_id: st.restaurant_id,
          restaurant_name: st.restaurant?.name || null,
          current_stock: parseFloat(st.current_stock) || 0
        });
      });
      data = data.map((i) => {
        const row = i.toJSON ? i.toJSON() : i;
        const g = row.linked_ingredient_id ? linkedMap[row.linked_ingredient_id] : null;
        if (!g) return { ...row, linked_stock: null, linked_store_total: null, linked_stores: [], linked_unit: null };
        const perStore = byIngredient[g.id] || [];
        return {
          ...row,
          linked_stock: parseFloat(g.current_stock) || 0,
          linked_store_total: perStore.reduce((a, b) => a + b.current_stock, 0),
          linked_stores: perStore,
          linked_unit: g.unit || null
        };
      });
    } else {
      data = data.map((i) => ({ ...(i.toJSON ? i.toJSON() : i), linked_stock: null, linked_store_total: null, linked_stores: [], linked_unit: null }));
    }

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
    const supplierProductId = parseInt(body.supplier_product_id, 10);
    const brandProductId = parseInt(body.brand_product_id, 10);
    const foodcourtProductId = parseInt(body.foodcourt_product_id, 10);
    const SupplierProduct = require('../models/SupplierProduct');
    const SupplierContract = require('../models/SupplierContract');
    const IngredientSellerProduct = require('../models/IngredientSellerProduct');
    const BrandProduct = require('../models/BrandProduct');
    const FoodcourtProduct = require('../models/FoodcourtProduct');
    const { Brand } = require('../models');

    let sellerType, sellerProductRow, sellerEntityId, productName, productUnit, productPrice, productMinQty;
    if (Number.isFinite(supplierProductId)) {
      const sp = await SupplierProduct.findByPk(supplierProductId, { transaction: t });
      if (!sp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Supplier product not found' }); }
      // BG 소유 브랜드 중 하나라도 이 공급업체와 active 계약 필요 (seller-sources POST 와 동일 검증)
      const brandIds = (await Brand.findAll({ where: { owner_id: req.bgOwnerId }, attributes: ['id'], transaction: t })).map(b => b.id);
      const contract = brandIds.length
        ? await SupplierContract.findOne({
            where: { entity_type: 'brand', entity_id: brandIds, supplier_company_id: sp.supplier_company_id, status: 'active' },
            transaction: t
          })
        : null;
      if (!contract) { await t.rollback(); return res.status(403).json({ success: false, code: 'NO_ACTIVE_CONTRACT', message: 'No active contract with this supplier' }); }
      sellerType = 'supplier'; sellerProductRow = sp; sellerEntityId = sp.supplier_company_id;
      productName = sp.name; productUnit = sp.unit; productPrice = sp.unit_price; productMinQty = sp.min_order_quantity;
    } else if (Number.isFinite(brandProductId)) {
      const bp = await BrandProduct.findByPk(brandProductId, { transaction: t });
      if (!bp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Brand product not found' }); }
      // 카탈로그는 brand seller 를 seller_entity_id=brand.id 로 노출 → product owner 의 brand 로 해석
      const sellerBrand = bp.owner_user_id
        ? await Brand.findOne({ where: { owner_id: bp.owner_user_id }, attributes: ['id'], transaction: t })
        : null;
      sellerType = 'brand'; sellerProductRow = bp; sellerEntityId = sellerBrand ? sellerBrand.id : null;
      productName = bp.name; productUnit = bp.unit; productPrice = bp.unit_price; productMinQty = bp.min_order_quantity;
    } else if (Number.isFinite(foodcourtProductId)) {
      const fp = await FoodcourtProduct.findByPk(foodcourtProductId, { transaction: t });
      if (!fp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Foodcourt product not found' }); }
      sellerType = 'foodcourt'; sellerProductRow = fp; sellerEntityId = fp.foodcourt_id;
      productName = fp.name; productUnit = fp.unit; productPrice = fp.unit_price; productMinQty = fp.min_order_quantity;
    } else {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'supplier_product_id, brand_product_id, or foodcourt_product_id is required' });
    }

    // unit 정규화 (routes/ingredients.js from-catalog 와 동일 매핑)
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
    const normalizeUnit = (u) => {
      if (!u) return 'piece';
      if (UNIT_ENUM.includes(u)) return u;
      const mapped = UNIT_MAP[String(u).toLowerCase().trim()];
      return mapped || 'piece';
    };
    const finalUnit = body.unit && UNIT_ENUM.includes(body.unit) ? body.unit : normalizeUnit(productUnit);
    const unitConversion = parseFloat(body.unit_conversion) > 0 ? parseFloat(body.unit_conversion) : 1;

    // Connect mode — 기존 BG 소유 ProductIngredient 에 매핑만 추가
    const existingPiId = parseInt(body.existing_product_ingredient_id, 10);
    if (Number.isFinite(existingPiId)) {
      const targetPi = await ProductIngredient.findByPk(existingPiId, { transaction: t });
      if (!targetPi || targetPi.owner_user_id !== req.bgOwnerId) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target stock item not found' });
      }
      const dup = await IngredientSellerProduct.findOne({
        where: {
          product_ingredient_id: targetPi.id, seller_type: sellerType,
          seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id
        },
        transaction: t
      });
      if (dup) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: targetPi, mapping: dup, created: false, connected: true } });
      }
      const otherCount = await IngredientSellerProduct.count({
        where: { product_ingredient_id: targetPi.id, is_active: true }, transaction: t
      });
      const mapping = await IngredientSellerProduct.create({
        ingredient_id: null,
        product_ingredient_id: targetPi.id,
        seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id,
        unit_price: parseFloat(productPrice) || 0,
        unit_conversion: unitConversion,
        min_order_quantity: parseInt(productMinQty, 10) || 1,
        lead_time_days: 0,
        is_preferred: otherCount === 0,
        is_active: true
      }, { transaction: t });
      await t.commit();
      return res.status(201).json({ success: true, data: { ingredient: targetPi, mapping, created: false, connected: true } });
    }

    // Idempotent — 이미 매핑된 ProductIngredient 가 이 BG 소유면 그대로 반환
    const existing = await IngredientSellerProduct.findOne({
      where: { seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id, product_ingredient_id: { [Op.ne]: null } },
      transaction: t
    });
    if (existing) {
      const pi = await ProductIngredient.findByPk(existing.product_ingredient_id, { transaction: t });
      if (pi && pi.owner_user_id === req.bgOwnerId) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: pi, mapping: existing, created: false } });
      }
    }

    // 새 ProductIngredient + 매핑 생성
    const scopedCount = await ProductIngredient.count({ where: { owner_user_id: req.bgOwnerId }, transaction: t });
    const code = `PI-${String(scopedCount + 1).padStart(3, '0')}`;
    const ingredient = await ProductIngredient.create({
      owner_user_id: req.bgOwnerId,
      code,
      name: body.name || productName,
      unit: finalUnit,
      base_quantity: 1,
      unit_cost: parseFloat(productPrice) || 0,
      min_stock: 0,
      min_order: 0,
      current_stock: 0,
      lead_time_days: 1,
      safety_stock_percent: 20,
      track_stock: true,
      is_active: true
    }, { transaction: t });

    const mapping = await IngredientSellerProduct.create({
      ingredient_id: null,
      product_ingredient_id: ingredient.id,
      seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id,
      unit_price: parseFloat(productPrice) || 0,
      unit_conversion: unitConversion,
      min_order_quantity: parseInt(productMinQty, 10) || 1,
      lead_time_days: 0,
      is_preferred: true,
      is_active: true
    }, { transaction: t });

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
      manual_daily_usage, track_stock
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
      track_stock: track_stock !== false,
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
      'unit_cost',
      'min_stock', 'min_order', 'current_stock',
      'lead_time_days', 'safety_stock_percent',
      'manual_daily_usage', 'track_stock', 'is_active'
    ];

    const updateData = {};
    for (const field of updateFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    await ingredient.update(updateData);

    const updatedIngredient = await ProductIngredient.findByPk(ingredient.id, {
      include: [{ model: ProductIngredientCategory, as: 'category' }]
    });

    res.json({
      success: true,
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
      min_order_quantity: parseInt(min_order_quantity, 10) || 1,
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
