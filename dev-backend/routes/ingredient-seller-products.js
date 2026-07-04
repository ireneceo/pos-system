/**
 * Ingredient ↔ Seller-Product mapping + seller catalog search
 * Sprint 3 (Supply Chain Design 3)
 *
 * 5 endpoints — all require authenticateToken + requireBuyerRole
 *
 *   GET    /api/ingredients/:ingredientId/seller-sources
 *   POST   /api/ingredients/:ingredientId/seller-sources
 *   PUT    /api/ingredient-seller-products/:id
 *   DELETE /api/ingredient-seller-products/:id
 *   GET    /api/seller-catalog
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  IngredientSellerProduct,
  Ingredient,
  SupplierContract,
  SupplierProduct,
  SupplierProductCategory,
  SystemProduct,
  BrandProduct,
  FoodcourtProduct
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');

router.use(['/ingredients', '/ingredient-seller-products', '/seller-catalog'], authenticateToken, requireBuyerRole);

const VALID_SELLER_TYPES = ['system_admin', 'brand', 'foodcourt', 'supplier'];

/** Verify ingredient is owned by the buyer entity. */
async function ingredientBelongsToBuyer(ingredientId, buyerEntity) {
  const ing = await Ingredient.findByPk(ingredientId);
  if (!ing) return null;
  if (!buyerEntity) return ing; // SA bypass
  if (buyerEntity.type === 'restaurant') {
    if (parseInt(ing.restaurant_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'brand') {
    if (parseInt(ing.brand_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'foodcourt') {
    return null; // No foodcourt_id on Ingredient
  }
  return null;
}

async function findActiveSupplierContract(supplierCompanyId, buyerEntity) {
  if (!buyerEntity) return null;
  return SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
      status: 'active'
    }
  });
}

// ============================================
// 10. GET /api/ingredients/:ingredientId/seller-sources
// ============================================
router.get('/ingredients/:ingredientId/seller-sources', async (req, res) => {
  try {
    const ingredientId = parseInt(req.params.ingredientId, 10);
    if (!Number.isFinite(ingredientId)) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }
    const ing = await ingredientBelongsToBuyer(ingredientId, req.buyerEntity);
    if (!ing) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const sources = await IngredientSellerProduct.findAll({
      where: { ingredient_id: ingredientId },
      order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
    });

    // Attach the supplier's own sale-product identity (name + SKU) alongside our
    // internal ingredient name/code. paranoid:false keeps historical products
    // resolvable. Design P0-1 (RA parallel to BG product-ingredients).
    const SupplierProduct = require('../models/SupplierProduct');
    const spIds = [...new Set(sources.filter(r => r.seller_type === 'supplier' && r.seller_product_id).map(r => r.seller_product_id))];
    const spMap = spIds.length
      ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: spIds }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(s => [s.id, s]))
      : {};
    const data = sources.map(r => {
      const j = r.toJSON();
      const sp = r.seller_type === 'supplier' ? spMap[r.seller_product_id] : null;
      return { ...j, seller_product_name: sp?.name || null, seller_product_sku: sp?.sku || null };
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /seller-sources error:', err);
    res.status(500).json({ success: false, message: 'Failed to load seller sources' });
  }
});

// ============================================
// 11. POST /api/ingredients/:ingredientId/seller-sources
// ============================================
router.post('/ingredients/:ingredientId/seller-sources', async (req, res) => {
  try {
    const ingredientId = parseInt(req.params.ingredientId, 10);
    if (!Number.isFinite(ingredientId)) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }
    const ing = await ingredientBelongsToBuyer(ingredientId, req.buyerEntity);
    if (!ing) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const {
      seller_type,
      seller_entity_id,
      seller_product_id,
      unit_price,
      unit_conversion,
      min_order_quantity,
      lead_time_days,
      is_preferred,
      notes
    } = req.body;

    if (!VALID_SELLER_TYPES.includes(seller_type)) {
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

    if (seller_type === 'supplier') {
      const supplierId = parseInt(seller_entity_id, 10);
      if (!Number.isFinite(supplierId)) {
        return res.status(400).json({ success: false, message: 'seller_entity_id is required for supplier' });
      }
      const contract = await findActiveSupplierContract(supplierId, req.buyerEntity);
      if (!contract) {
        return res.status(400).json({
          success: false,
          code: 'NO_ACTIVE_CONTRACT',
          message: 'No active contract with this supplier'
        });
      }
    }

    // If preferred=true, demote others
    if (is_preferred) {
      await IngredientSellerProduct.update(
        { is_preferred: false },
        { where: { ingredient_id: ingredientId } }
      );
    }

    const created = await IngredientSellerProduct.create({
      ingredient_id: ingredientId,
      seller_type,
      seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null,
      seller_product_id: sellerProductId,
      unit_price: price,
      unit_conversion: parseFloat(unit_conversion) || 1,
      min_order_quantity: parseInt(min_order_quantity, 10) || 1,
      lead_time_days: parseInt(lead_time_days, 10) || 0,
      is_preferred: !!is_preferred,
      is_active: true,
      notes: notes ? sanitizeString(String(notes)).slice(0, 255) : null
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('POST /seller-sources error:', err);
    res.status(500).json({ success: false, message: 'Failed to create seller source' });
  }
});

// ============================================
// 12. PUT /api/ingredient-seller-products/:id
// ============================================
router.put('/ingredient-seller-products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }
    const isp = await IngredientSellerProduct.findByPk(id);
    if (!isp) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }
    // IDOR via ingredient ownership
    const ing = await ingredientBelongsToBuyer(isp.ingredient_id, req.buyerEntity);
    if (!ing) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }

    const { unit_price, is_preferred, is_active, notes, unit_conversion, min_order_quantity, lead_time_days } = req.body;
    const updates = {};
    if (unit_price !== undefined) {
      const p = parseFloat(unit_price);
      if (!(p >= 0)) {
        return res.status(400).json({ success: false, message: 'unit_price must be >= 0' });
      }
      updates.unit_price = p;
    }
    if (unit_conversion !== undefined) updates.unit_conversion = parseFloat(unit_conversion) || 1;
    if (min_order_quantity !== undefined) updates.min_order_quantity = parseInt(min_order_quantity, 10) || 1;
    if (lead_time_days !== undefined) updates.lead_time_days = parseInt(lead_time_days, 10) || 0;
    if (is_active !== undefined) updates.is_active = !!is_active;
    if (notes !== undefined) updates.notes = notes ? sanitizeString(String(notes)).slice(0, 255) : null;

    if (is_preferred !== undefined) {
      updates.is_preferred = !!is_preferred;
      if (is_preferred) {
        await IngredientSellerProduct.update(
          { is_preferred: false },
          { where: { ingredient_id: isp.ingredient_id, id: { [Op.ne]: id } } }
        );
      }
    }

    await isp.update(updates);
    res.json({ success: true, data: isp });
  } catch (err) {
    console.error('PUT /ingredient-seller-products/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update seller source' });
  }
});

// ============================================
// 13. DELETE /api/ingredient-seller-products/:id
// ============================================
router.delete('/ingredient-seller-products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }
    const isp = await IngredientSellerProduct.findByPk(id);
    if (!isp) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }
    const ing = await ingredientBelongsToBuyer(isp.ingredient_id, req.buyerEntity);
    if (!ing) {
      return res.status(404).json({ success: false, message: 'Seller source not found' });
    }

    await isp.destroy();
    res.json({ success: true, message: 'Seller source deleted' });
  } catch (err) {
    console.error('DELETE /ingredient-seller-products/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete seller source' });
  }
});

// ============================================
// 14. GET /api/seller-catalog
// ============================================
router.get('/seller-catalog', async (req, res) => {
  try {
    const sellerType = req.query.seller_type;
    const sellerEntityId = req.query.seller_entity_id ? parseInt(req.query.seller_entity_id, 10) : null;
    const search = req.query.search ? String(req.query.search).trim() : '';
    if (!VALID_SELLER_TYPES.includes(sellerType)) {
      return res.status(400).json({ success: false, message: 'Invalid seller_type' });
    }

    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const term = search ? `%${search}%` : null;

    if (sellerType === 'supplier') {
      if (!Number.isFinite(sellerEntityId)) {
        return res.status(400).json({ success: false, message: 'seller_entity_id required for supplier' });
      }
      const contract = await findActiveSupplierContract(sellerEntityId, req.buyerEntity);
      if (!contract) {
        return res.status(400).json({
          success: false,
          code: 'NO_ACTIVE_CONTRACT',
          message: 'No active contract with this supplier'
        });
      }
      const where = { supplier_company_id: sellerEntityId, is_active: true };
      if (term) {
        where[Op.or] = [
          { name: { [Op.like]: term } },
          { sku: { [Op.like]: term } },
          { description: { [Op.like]: term } }
        ];
      }
      const products = await SupplierProduct.findAll({
        where,
        include: [{ model: SupplierProductCategory, as: 'category', attributes: ['id', 'name'], required: false }],
        order: [['sort_order', 'ASC'], ['name', 'ASC']],
        limit
      });
      return res.json({ success: true, data: products });
    }

    if (sellerType === 'brand') {
      if (!Number.isFinite(sellerEntityId)) {
        return res.status(400).json({ success: false, message: 'seller_entity_id required for brand' });
      }
      const where = { owner_user_id: sellerEntityId, is_active: true };
      if (term) {
        where[Op.or] = [
          { name: { [Op.like]: term } },
          { sku: { [Op.like]: term } },
          { description: { [Op.like]: term } }
        ];
      }
      const products = await BrandProduct.findAll({ where, limit, order: [['name', 'ASC']] });
      return res.json({ success: true, data: products });
    }

    if (sellerType === 'foodcourt') {
      if (!Number.isFinite(sellerEntityId)) {
        return res.status(400).json({ success: false, message: 'seller_entity_id required for foodcourt' });
      }
      const where = { foodcourt_id: sellerEntityId, is_active: true };
      if (term) {
        where[Op.or] = [
          { name: { [Op.like]: term } },
          { sku: { [Op.like]: term } },
          { description: { [Op.like]: term } }
        ];
      }
      const products = await FoodcourtProduct.findAll({ where, limit, order: [['sort_order', 'ASC'], ['name', 'ASC']] });
      return res.json({ success: true, data: products });
    }

    if (sellerType === 'system_admin') {
      const where = { is_active: true };
      if (term) {
        where[Op.or] = [
          { name: { [Op.like]: term } },
          { sku: { [Op.like]: term } },
          { description: { [Op.like]: term } }
        ];
      }
      const products = await SystemProduct.findAll({ where, limit, order: [['name', 'ASC']] });
      return res.json({ success: true, data: products });
    }

    res.status(400).json({ success: false, message: 'Unsupported seller_type' });
  } catch (err) {
    console.error('GET /api/seller-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to load seller catalog' });
  }
});

module.exports = router;
