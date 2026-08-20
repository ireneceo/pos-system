const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  Brand,
  Restaurant,
  Ingredient,
  InventoryBatch,
  InventoryTransaction,
  PurchaseOrder,
  GeneralStock,
  GeneralStockCategory,
  Supplier
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope } = require('../middleware/brandScope');
const { requireBrandModule } = require('../middleware/requireModule');

// All routes require authentication. Per-route ownership is enforced by
// requireBrandScope below — the previous implementation only had
// authenticateToken, which let any logged-in user read inventory of any
// :brandId (IDOR). System Admin still has god access via requireBrandScope's
// admin branch.
//
// Sprint 7 (2026-04-28): path-level use로 좁힘. 이전 router.use(authenticateToken)이
// path-less로 모든 fall-through를 차단했음 (carrier-webhooks public endpoint 401 사고).
// brand-inventory의 모든 endpoint가 /brands prefix이므로 안전하게 좁힐 수 있음.
router.use('/brands', authenticateToken);
// P0-3 Wave B: 브랜드 재고는 Advanced(brand_inventory). /brands/:brandId/inventory* 만 게이트
// (/brands/:brandId/restaurants 목록은 비차단). requireBrandScope 가 소유권/데모 별도 처리.
router.use('/brands/:brandId/inventory', requireBrandModule('brand_inventory', 'brandId'));

// Get brand's restaurants
router.get('/brands/:brandId/restaurants', requireBrandScope(), async (req, res) => {
  try {
    const { brandId } = req.params;

    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name', 'brand_id'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching brand restaurants:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
  }
});

// Get brand-wide inventory summary
router.get('/brands/:brandId/inventory/summary', requireBrandScope(), async (req, res) => {
  try {
    const { brandId } = req.params;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id']
    });

    const restaurantIds = restaurants.map(r => r.id);

    if (restaurantIds.length === 0) {
      return res.json({
        success: true,
        data: {
          total_restaurants: 0,
          total_ingredients: 0,
          low_stock_count: 0,
          out_of_stock_count: 0,
          expiring_count: 0
        }
      });
    }

    // Count ingredients across all restaurants
    const ingredients = await Ingredient.findAll({
      where: {
        [Op.or]: [
          { restaurant_id: { [Op.in]: restaurantIds } },
          { brand_id: brandId }
        ],
        is_active: true
      }
    });

    let lowStockCount = 0;
    let outOfStockCount = 0;

    ingredients.forEach(ing => {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      if (currentStock <= 0) {
        outOfStockCount++;
      } else if (currentStock <= minStock) {
        lowStockCount++;
      }
    });

    // Count expiring items (within 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const expiringBatches = await InventoryBatch.count({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'active',
        remaining_quantity: { [Op.gt]: 0 },
        expiry_date: {
          [Op.and]: [
            { [Op.not]: null },
            { [Op.lte]: sevenDaysFromNow }
          ]
        }
      }
    });

    res.json({
      success: true,
      data: {
        total_restaurants: restaurantIds.length,
        total_ingredients: ingredients.length,
        low_stock_count: lowStockCount,
        out_of_stock_count: outOfStockCount,
        expiring_count: expiringBatches
      }
    });
  } catch (error) {
    console.error('Error fetching brand inventory summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
});

// Get all inventory across brand's restaurants
router.get('/brands/:brandId/inventory', requireBrandScope(), async (req, res) => {
  try {
    const { brandId } = req.params;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name']
    });

    const restaurantIds = restaurants.map(r => r.id);
    const restaurantMap = {};
    restaurants.forEach(r => {
      restaurantMap[r.id] = r.name;
    });

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Get all ingredients for these restaurants
    const ingredients = await Ingredient.findAll({
      where: {
        [Op.or]: [
          { restaurant_id: { [Op.in]: restaurantIds } },
          { brand_id: brandId }
        ],
        is_active: true
      },
      order: [['name', 'ASC']]
    });

    const inventoryData = ingredients.map(ing => {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      let stockStatus = 'normal';
      if (currentStock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (currentStock <= minStock) {
        stockStatus = 'low_stock';
      }

      return {
        id: ing.id,
        name: ing.name,
        unit: ing.unit,
        unit_cost: parseFloat(ing.unit_cost) || 0,
        category: ing.category,
        current_stock: currentStock,
        min_stock: minStock,
        avg_daily_usage: parseFloat(ing.avg_daily_usage) || 0,
        prediction_confidence: ing.prediction_confidence || 'none',
        stock_status: stockStatus,
        restaurant_id: ing.restaurant_id,
        restaurant_name: restaurantMap[ing.restaurant_id] || 'Brand Level'
      };
    });

    res.json({ success: true, data: inventoryData });
  } catch (error) {
    console.error('Error fetching brand inventory:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
  }
});

// Get expiring items across brand's restaurants
router.get('/brands/:brandId/inventory/expiring', requireBrandScope(), async (req, res) => {
  try {
    const { brandId } = req.params;
    const { days = 14 } = req.query;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name']
    });

    const restaurantIds = restaurants.map(r => r.id);
    const restaurantMap = {};
    restaurants.forEach(r => {
      restaurantMap[r.id] = r.name;
    });

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + parseInt(days));

    const expiringBatches = await InventoryBatch.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'active',
        remaining_quantity: { [Op.gt]: 0 },
        expiry_date: {
          [Op.and]: [
            { [Op.not]: null },
            { [Op.lte]: targetDate }
          ]
        }
      },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit']
      }],
      order: [['expiry_date', 'ASC']]
    });

    const now = new Date();
    const data = expiringBatches.map(batch => {
      const expiryDate = new Date(batch.expiry_date);
      const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

      let urgency = 'normal';
      if (daysUntilExpiry <= 0) {
        urgency = 'expired';
      } else if (daysUntilExpiry <= 3) {
        urgency = 'critical';
      } else if (daysUntilExpiry <= 7) {
        urgency = 'warning';
      }

      return {
        id: batch.id,
        batch_number: batch.batch_number,
        ingredient_id: batch.ingredient_id,
        ingredient_name: batch.ingredient?.name || 'Unknown',
        remaining_quantity: parseFloat(batch.remaining_quantity),
        unit: batch.unit,
        expiry_date: batch.expiry_date,
        days_until_expiry: daysUntilExpiry,
        urgency,
        restaurant_id: batch.restaurant_id,
        restaurant_name: restaurantMap[batch.restaurant_id] || 'Unknown'
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching expiring items:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch expiring items' });
  }
});

// ─── Sprint 7 — Brand inventory transactions ──────────────
// GET /api/brands/:brandId/inventory/transactions
//   query: ingredient_id?, transaction_type?, from?, to?, limit=50, offset=0
router.get('/brands/:brandId/inventory/transactions', requireBrandScope(), async (req, res) => {
  try {
    const brandId = parseInt(req.params.brandId, 10);

    // ── 산하 매장의 움직임까지 포함한다 ──────────────────────────────────────
    // 예전에는 `entity_type='brand'` 행만 봤다. 그런데 브랜드 재료의 실제 소비는
    // **매장에서** 일어나고(판매 차감·수동 차감·폐기), 그 거래는 restaurant 스코프로 쌓인다.
    // 그래서 브랜드 History 화면이 "입고만 있고 나간 적 없는" 그림을 보여줬다.
    // 브랜드 자신 + 산하 매장을 합쳐 보여주고, 각 행이 어디서 난 것인지 `source_scope` 로 구분한다.
    const brandRestaurants = await Restaurant.findAll({
      where: { brand_id: brandId },
      attributes: ['id', 'name']
    });
    const brandRestaurantIds = brandRestaurants.map((r) => r.id);
    const restaurantNameById = Object.fromEntries(brandRestaurants.map((r) => [r.id, r.name]));

    const where = brandRestaurantIds.length
      ? {
          [Op.or]: [
            { entity_type: 'brand', entity_id: brandId },
            { restaurant_id: { [Op.in]: brandRestaurantIds } }
          ]
        }
      : { entity_type: 'brand', entity_id: brandId };

    if (req.query.ingredient_id) where.ingredient_id = parseInt(req.query.ingredient_id, 10);
    if (req.query.transaction_type) where.transaction_type = String(req.query.transaction_type);
    if (req.query.from) where.created_at = { ...(where.created_at || {}), [Op.gte]: new Date(req.query.from) };
    if (req.query.to) where.created_at = { ...(where.created_at || {}), [Op.lte]: new Date(req.query.to) };

    const limit = Math.min(200, parseInt(req.query.limit, 10) || 50);
    const offset = parseInt(req.query.offset, 10) || 0;

    const { rows, count } = await InventoryTransaction.findAndCountAll({
      where,
      include: [
        { model: Ingredient, as: 'ingredient', attributes: ['id', 'name', 'unit'] },
        { model: PurchaseOrder, as: 'purchaseOrder', attributes: ['id', 'po_number'], required: false }
      ],
      order: [['created_at', 'DESC']],
      limit, offset
    });

    // 행마다 출처를 붙인다 — 같은 재료의 입고(브랜드)와 소비(매장)가 한 표에 섞이므로
    // 어느 쪽인지 구분되지 않으면 읽는 사람이 수량 부호를 오해한다.
    const transactions = rows.map((t) => {
      const row = t.toJSON();
      const isStore = !!row.restaurant_id && brandRestaurantIds.includes(row.restaurant_id);
      return {
        ...row,
        source_scope: isStore ? 'restaurant' : 'brand',
        source_name: isStore ? (restaurantNameById[row.restaurant_id] || null) : null
      };
    });

    res.json({ success: true, data: { transactions, total: count } });
  } catch (err) {
    console.error('[brand-inventory] transactions error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
