/**
 * Foodcourt Inventory — Sprint 1 (simplified, batch tracking deferred to Sprint 3 PO)
 *
 * Routes prefixed with `/foodcourts/:foodcourtId/inventory/...`.
 * Backed by FoodcourtProduct.current_stock for now; InventoryBatch + transactions
 * arrive in Sprint 3.
 *
 * Scope rules:
 *   - System Admin: any foodcourt
 *   - Foodcourt General/Manager: req.user.foodcourt_id must equal :foodcourtId
 *
 * Module gate: fc_inventory.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  FoodcourtProduct,
  FoodcourtProductCategory
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { resolveEntityModules } = require('../middleware/requireModule');

router.use(authenticateToken);

/**
 * Verify the caller can access :foodcourtId. Sets req.foodcourtId on success.
 */
async function checkFoodcourtAccess(req, res, next) {
  try {
    const foodcourtId = parseInt(req.params.foodcourtId);
    if (!foodcourtId) {
      return res.status(400).json({ success: false, message: 'foodcourtId is required' });
    }

    const role = req.user?.role;
    if (role === 'System Admin') {
      req.foodcourtId = foodcourtId;
      req.fcIsAdmin = true;
      return next();
    }

    if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      if (parseInt(req.user.foodcourt_id) !== foodcourtId) {
        return res.status(403).json({ success: false, message: 'Access denied to this foodcourt' });
      }
      req.foodcourtId = foodcourtId;
      req.fcIsAdmin = false;
      return next();
    }

    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  } catch (err) {
    console.error('checkFoodcourtAccess:', err);
    res.status(500).json({ success: false, message: 'Failed to verify access' });
  }
}

/**
 * Module gate: fc_inventory. SA bypass.
 */
async function requireInventoryModule(req, res, next) {
  try {
    if (req.fcIsAdmin) return next();
    const { planType, modules } = await resolveEntityModules('foodcourt', req.foodcourtId);
    if (!modules.includes('fc_inventory')) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (fc_inventory) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: 'fc_inventory'
      });
    }
    next();
  } catch (err) {
    console.error('requireInventoryModule:', err);
    res.status(500).json({ success: false, message: 'Failed to verify module access' });
  }
}

/**
 * GET /api/foodcourts/:foodcourtId/inventory/summary
 */
router.get('/foodcourts/:foodcourtId/inventory/summary', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    const products = await FoodcourtProduct.findAll({
      where: { foodcourt_id: req.foodcourtId, is_active: true }
    });

    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalStockValue = 0;

    for (const p of products) {
      const stock = parseFloat(p.current_stock) || 0;
      const threshold = parseFloat(p.low_stock_threshold) || 0;
      const price = parseFloat(p.unit_price) || 0;

      if (stock <= 0) {
        outOfStockCount++;
      } else if (threshold > 0 && stock <= threshold) {
        lowStockCount++;
      }
      totalStockValue += stock * price;
    }

    res.json({
      success: true,
      data: {
        total_products: products.length,
        low_stock_count: lowStockCount,
        out_of_stock_count: outOfStockCount,
        total_stock_value: Math.round(totalStockValue * 100) / 100
      }
    });
  } catch (err) {
    console.error('GET /api/foodcourts/:foodcourtId/inventory/summary:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
});

/**
 * GET /api/foodcourts/:foodcourtId/inventory
 */
router.get('/foodcourts/:foodcourtId/inventory', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    const { category_id, low_stock, search } = req.query;

    const where = { foodcourt_id: req.foodcourtId };
    if (category_id) where.category_id = category_id;
    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { sku: { [Op.like]: term } }
      ];
    }

    const products = await FoodcourtProduct.findAll({
      where,
      include: [
        { model: FoodcourtProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }
      ],
      order: [['name', 'ASC']]
    });

    let data = products.map(p => {
      const stock = parseFloat(p.current_stock) || 0;
      const threshold = parseFloat(p.low_stock_threshold) || 0;
      const price = parseFloat(p.unit_price) || 0;

      let stockStatus = 'normal';
      if (stock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (threshold > 0 && stock <= threshold) {
        stockStatus = 'low_stock';
      }

      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        unit: p.unit,
        unit_price: price,
        current_stock: stock,
        low_stock_threshold: threshold,
        stock_status: stockStatus,
        stock_value: Math.round(stock * price * 100) / 100,
        category_id: p.category_id,
        category: p.category || null,
        is_active: p.is_active,
        lead_time_days: p.lead_time_days
      };
    });

    if (low_stock === 'true') {
      data = data.filter(d => d.stock_status === 'low_stock' || d.stock_status === 'out_of_stock');
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /api/foodcourts/:foodcourtId/inventory:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
  }
});

/**
 * GET /api/foodcourts/:foodcourtId/inventory/expiring
 * Sprint 1: empty array. Sprint 3 will integrate InventoryBatch.expiry_date.
 */
router.get('/foodcourts/:foodcourtId/inventory/expiring', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    res.json({ success: true, data: [] });
  } catch (err) {
    console.error('GET /api/foodcourts/:foodcourtId/inventory/expiring:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch expiring items' });
  }
});

/**
 * POST /api/foodcourts/:foodcourtId/inventory/adjust
 * body: { product_id, quantity_delta, reason, notes? }
 */
router.post('/foodcourts/:foodcourtId/inventory/adjust', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    const { product_id, quantity_delta, reason } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, message: 'product_id is required' });
    }
    if (quantity_delta === undefined || quantity_delta === null || isNaN(Number(quantity_delta))) {
      return res.status(400).json({ success: false, message: 'quantity_delta must be a number' });
    }
    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'reason is required' });
    }

    const product = await FoodcourtProduct.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    // IDOR check
    if (product.foodcourt_id !== req.foodcourtId) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const currentStock = parseFloat(product.current_stock) || 0;
    const newStock = currentStock + Number(quantity_delta);

    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: `Adjustment would result in negative stock (current: ${currentStock}, delta: ${quantity_delta})`
      });
    }

    await product.update({ current_stock: newStock });

    res.json({
      success: true,
      data: {
        product_id: product.id,
        previous_stock: currentStock,
        quantity_delta: Number(quantity_delta),
        current_stock: newStock,
        reason: sanitizeString(reason).trim()
      },
      message: 'Stock adjusted'
    });
  } catch (err) {
    console.error('POST /api/foodcourts/:foodcourtId/inventory/adjust:', err);
    res.status(500).json({ success: false, message: 'Failed to adjust stock' });
  }
});

/**
 * POST /api/foodcourts/:foodcourtId/inventory/receive
 * body: { product_id, quantity, batch_no?, expiry_date?, unit_cost?, notes? }
 * Sprint 1: ignores batch_no, expiry_date, unit_cost (Sprint 3 will persist them).
 */
router.post('/foodcourts/:foodcourtId/inventory/receive', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, message: 'product_id is required' });
    }
    if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return res.status(400).json({ success: false, message: 'quantity must be > 0' });
    }

    const product = await FoodcourtProduct.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.foodcourt_id !== req.foodcourtId) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const currentStock = parseFloat(product.current_stock) || 0;
    const newStock = currentStock + Number(quantity);

    await product.update({ current_stock: newStock });

    res.json({
      success: true,
      data: {
        product_id: product.id,
        previous_stock: currentStock,
        received_quantity: Number(quantity),
        current_stock: newStock
      },
      message: 'Stock received'
    });
  } catch (err) {
    console.error('POST /api/foodcourts/:foodcourtId/inventory/receive:', err);
    res.status(500).json({ success: false, message: 'Failed to receive stock' });
  }
});

/**
 * GET /api/foodcourts/:foodcourtId/inventory/transactions
 * Sprint 1: empty paginated. Sprint 3 will return InventoryTransaction history.
 */
router.get('/foodcourts/:foodcourtId/inventory/transactions', checkFoodcourtAccess, requireInventoryModule, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit) || 50));

    res.json({
      success: true,
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0
      }
    });
  } catch (err) {
    console.error('GET /api/foodcourts/:foodcourtId/inventory/transactions:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
