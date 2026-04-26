/**
 * Supplier Inventory Routes — Sprint 1 (Supply Chain Design 1)
 *
 * Tracks Supplier Admin's own product stock via SupplierProduct.current_stock.
 *
 * Sprint 1 scope:
 *   - Direct mutations of SupplierProduct.current_stock (no batches, no PO yet)
 *   - Manual adjust + manual receive only
 *   - Transaction history endpoint returns empty array
 *     (Sprint 3 will introduce InventoryBatch + a supplier_inventory_transactions
 *     table tied to PO receipts)
 *
 * Security: authenticateToken + requireSupplierScope + requireSupplierModule
 *           IDOR enforced via supplier_company_id match. SA bypass when
 *           req.supplierIsAdmin === true.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  SupplierProduct,
  SupplierProductCategory
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireSupplierScope } = require('../middleware/supplierScope');
const { requireSupplierModule } = require('../middleware/requireModule');
const { sanitizeString } = require('../middleware/validation');

// All routes require auth + supplier scope + supplier_inventory module
router.use(authenticateToken);
router.use(requireSupplierScope);
router.use(requireSupplierModule('supplier_inventory'));

// Helper: build supplier_company_id filter (SA without override = no filter)
function supplierWhere(req, extra = {}) {
  if (req.supplierIsAdmin && !req.supplierCompany) return { ...extra };
  return { ...extra, supplier_company_id: req.supplierCompany.id };
}

// Helper: load product with IDOR check
async function loadProductWithIdor(req, productId) {
  const product = await SupplierProduct.findByPk(productId);
  if (!product) return { product: null, error: { status: 404, message: 'Product not found' } };
  if (!req.supplierIsAdmin) {
    if (product.supplier_company_id !== req.supplierCompany.id) {
      return { product: null, error: { status: 403, message: 'Forbidden' } };
    }
  }
  return { product, error: null };
}

/**
 * GET /api/supplier-inventory/summary
 * Aggregate KPIs: total products, low stock count, out of stock count, total stock value
 */
router.get('/summary', async (req, res) => {
  try {
    const where = supplierWhere(req, { is_active: true });
    const products = await SupplierProduct.findAll({
      where,
      attributes: ['id', 'current_stock', 'low_stock_threshold', 'unit_price']
    });

    let total_products = products.length;
    let low_stock_count = 0;
    let out_of_stock_count = 0;
    let total_stock_value = 0;

    for (const p of products) {
      const stock = parseFloat(p.current_stock) || 0;
      const threshold = parseFloat(p.low_stock_threshold) || 0;
      const price = parseFloat(p.unit_price) || 0;
      total_stock_value += stock * price;
      if (stock <= 0) {
        out_of_stock_count += 1;
      } else if (threshold > 0 && stock <= threshold) {
        low_stock_count += 1;
      }
    }

    res.json({
      success: true,
      data: {
        total_products,
        low_stock_count,
        out_of_stock_count,
        total_stock_value: Number(total_stock_value.toFixed(2))
      }
    });
  } catch (err) {
    console.error('[supplier-inventory] summary error:', err);
    res.status(500).json({ success: false, message: 'Failed to load summary' });
  }
});

/**
 * GET /api/supplier-inventory
 * List products with stock info.
 * Query: ?category_id=&low_stock=true&search=
 */
router.get('/', async (req, res) => {
  try {
    const { category_id, low_stock, search } = req.query;
    const where = supplierWhere(req, {});

    if (category_id) {
      where.category_id = parseInt(category_id, 10);
    }
    if (search && typeof search === 'string') {
      const term = `%${sanitizeString(search)}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { sku: { [Op.like]: term } }
      ];
    }

    const products = await SupplierProduct.findAll({
      where,
      include: [
        {
          model: SupplierProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'emoji']
        }
      ],
      order: [['name', 'ASC']]
    });

    let result = products.map(p => {
      const stock = parseFloat(p.current_stock) || 0;
      const threshold = parseFloat(p.low_stock_threshold) || 0;
      const is_out_of_stock = stock <= 0;
      const is_low_stock = !is_out_of_stock && threshold > 0 && stock <= threshold;
      return {
        product_id: p.id,
        sku: p.sku,
        name: p.name,
        category_id: p.category_id,
        category_name: p.category ? p.category.name : null,
        unit: p.unit,
        current_stock: stock,
        low_stock_threshold: threshold,
        unit_price: parseFloat(p.unit_price) || 0,
        is_low_stock,
        is_out_of_stock
      };
    });

    if (low_stock === 'true') {
      result = result.filter(r => r.is_low_stock || r.is_out_of_stock);
    }

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('[supplier-inventory] list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load inventory' });
  }
});

/**
 * GET /api/supplier-inventory/products/:productId
 * Single product stock detail. Sprint 1 returns transactions: [].
 */
router.get('/products/:productId', async (req, res) => {
  try {
    const { product, error } = await loadProductWithIdor(req, req.params.productId);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    let category = null;
    if (product.category_id) {
      category = await SupplierProductCategory.findByPk(product.category_id, {
        attributes: ['id', 'name', 'emoji']
      });
    }

    const stock = parseFloat(product.current_stock) || 0;
    const threshold = parseFloat(product.low_stock_threshold) || 0;
    const is_out_of_stock = stock <= 0;
    const is_low_stock = !is_out_of_stock && threshold > 0 && stock <= threshold;

    res.json({
      success: true,
      data: {
        product_id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        category_name: category ? category.name : null,
        unit: product.unit,
        current_stock: stock,
        low_stock_threshold: threshold,
        lead_time_days: product.lead_time_days,
        unit_price: parseFloat(product.unit_price) || 0,
        is_low_stock,
        is_out_of_stock,
        // Sprint 1: transaction history not yet implemented (TODO Sprint 3)
        transactions: []
      }
    });
  } catch (err) {
    console.error('[supplier-inventory] detail error:', err);
    res.status(500).json({ success: false, message: 'Failed to load product' });
  }
});

/**
 * POST /api/supplier-inventory/adjust
 * Body: { product_id, quantity_delta, reason, notes? }
 * Sprint 1: directly mutates current_stock; transaction log deferred to Sprint 3.
 */
router.post('/adjust', async (req, res) => {
  try {
    const { product_id, quantity_delta, reason, notes } = req.body || {};
    if (!product_id || quantity_delta === undefined || quantity_delta === null) {
      return res.status(400).json({ success: false, message: 'product_id and quantity_delta required' });
    }
    const delta = parseFloat(quantity_delta);
    if (Number.isNaN(delta)) {
      return res.status(400).json({ success: false, message: 'quantity_delta must be a number' });
    }
    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'reason is required' });
    }

    const { product, error } = await loadProductWithIdor(req, product_id);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    const currentStock = parseFloat(product.current_stock) || 0;
    const newStock = currentStock + delta;
    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: `Adjustment would result in negative stock (current ${currentStock}, delta ${delta})`
      });
    }

    product.current_stock = newStock;
    await product.save();

    res.json({
      success: true,
      data: {
        product_id: product.id,
        previous_stock: currentStock,
        quantity_delta: delta,
        current_stock: newStock,
        reason: sanitizeString(reason),
        notes: notes ? sanitizeString(notes) : null
      },
      message: 'Stock adjusted'
      // TODO Sprint 3: persist InventoryTransaction record (type='adjustment')
    });
  } catch (err) {
    console.error('[supplier-inventory] adjust error:', err);
    res.status(500).json({ success: false, message: 'Failed to adjust stock' });
  }
});

/**
 * POST /api/supplier-inventory/receive
 * Body: { product_id, quantity, batch_no?, expiry_date?, unit_cost?, notes? }
 * Sprint 1: only current_stock is persisted; batch fields echoed back but ignored.
 */
router.post('/receive', async (req, res) => {
  try {
    const { product_id, quantity, batch_no, expiry_date, unit_cost, notes } = req.body || {};
    if (!product_id || quantity === undefined || quantity === null) {
      return res.status(400).json({ success: false, message: 'product_id and quantity required' });
    }
    const qty = parseFloat(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'quantity must be a positive number' });
    }

    const { product, error } = await loadProductWithIdor(req, product_id);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    const currentStock = parseFloat(product.current_stock) || 0;
    const newStock = currentStock + qty;
    product.current_stock = newStock;
    await product.save();

    res.json({
      success: true,
      data: {
        product_id: product.id,
        previous_stock: currentStock,
        quantity_received: qty,
        current_stock: newStock,
        // Echo batch fields back to UI; not persisted in Sprint 1.
        batch_no: batch_no || null,
        expiry_date: expiry_date || null,
        unit_cost: unit_cost !== undefined && unit_cost !== null ? parseFloat(unit_cost) : null,
        notes: notes ? sanitizeString(notes) : null
      },
      message: 'Stock received'
      // TODO Sprint 3: create InventoryBatch row + InventoryTransaction (type='in', reference_type='manual_receive')
    });
  } catch (err) {
    console.error('[supplier-inventory] receive error:', err);
    res.status(500).json({ success: false, message: 'Failed to receive stock' });
  }
});

/**
 * GET /api/supplier-inventory/transactions
 * Query: ?product_id=&type=&from=&to=&page=
 *
 * Sprint 1: returns empty paginated payload.
 * TODO Sprint 3: query supplier_inventory_transactions or per-batch movements.
 */
router.get('/transactions', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
    res.json({
      success: true,
      data: [],
      pagination: { total: 0, page, limit, totalPages: 0 }
      // Sprint 1: transaction history not implemented; Sprint 3 will populate this endpoint.
    });
  } catch (err) {
    console.error('[supplier-inventory] transactions error:', err);
    res.status(500).json({ success: false, message: 'Failed to load transactions' });
  }
});

module.exports = router;
