const express = require('express');
const router = express.Router();
const { SystemProduct, SystemProductCategory, SystemProductPrice, SystemProductAddon } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

/**
 * Generate unique SKU: SYS-001, SYS-002...
 */
const generateSKU = async () => {
  const count = await SystemProduct.count();
  return `SYS-${String(count + 1).padStart(3, '0')}`;
};

// ============================================
// Products CRUD
// ============================================

/**
 * GET /api/system-products
 */
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { category_id, is_active, is_set } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (is_set !== undefined) where.is_set = is_set === 'true';

    const products = await SystemProduct.findAll({
      where,
      include: [
        { model: SystemProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] },
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons', include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }] }
      ],
      order: [
        ['is_set', 'DESC'],
        ['set_display_order', 'ASC'],
        ['sort_order', 'ASC'],
        ['name', 'ASC']
      ]
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get system products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

/**
 * GET /api/system-products/:id
 */
router.get('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const product = await SystemProduct.findByPk(req.params.id, {
      include: [
        { model: SystemProductCategory, as: 'category' },
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons', include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }] }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

/**
 * POST /api/system-products
 */
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const {
      name, description, sku, category_id, image_url, emoji, is_active,
      is_set, set_items, set_display_order, set_group, set_tier, set_use_case,
      set_setup_items, is_recommended, shipping_countries, shipping_settings,
      prices, addons
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Product name is required' });
    }

    // Set validation
    if (is_set) {
      if (!set_items || !Array.isArray(set_items) || set_items.length === 0) {
        return res.status(400).json({ success: false, message: 'Set must have at least 1 item' });
      }
      for (const item of set_items) {
        if (!item.productId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ success: false, message: 'Each set item must have productId, name, and quantity >= 1' });
        }
      }
      // No nested sets
      const referencedIds = set_items.map(i => i.productId);
      const referenced = await SystemProduct.findAll({ where: { id: referencedIds }, attributes: ['id', 'is_set'] });
      if (referenced.some(p => p.is_set)) {
        return res.status(400).json({ success: false, message: 'Set cannot contain other sets' });
      }
    }

    const finalSku = sku || await generateSKU();

    const product = await SystemProduct.create({
      category_id: category_id || null,
      name: name.trim(),
      description: description || null,
      sku: finalSku,
      image_url: image_url || null,
      emoji: emoji || null,
      is_active: is_active !== false,
      is_set: is_set || false,
      set_items: is_set ? set_items : null,
      set_display_order: set_display_order || 0,
      set_group: set_group || null,
      set_tier: set_tier || null,
      set_use_case: set_use_case || null,
      set_setup_items: set_setup_items || null,
      is_recommended: is_recommended || false,
      shipping_countries: shipping_countries || [],
      shipping_settings: shipping_settings || {}
    });

    // Create prices
    if (prices && Array.isArray(prices)) {
      for (const p of prices) {
        if (p.currency && (p.price !== undefined && p.price !== null)) {
          await SystemProductPrice.create({
            product_id: product.id,
            currency: p.currency,
            price: p.price,
            is_active: p.is_active !== false
          });
        }
      }
    }

    // Create addons (only for set products)
    if (is_set && addons && Array.isArray(addons)) {
      for (let i = 0; i < addons.length; i++) {
        const addon = addons[i];
        await SystemProductAddon.create({
          set_product_id: product.id,
          addon_product_id: addon.addon_product_id,
          addon_label: addon.addon_label || null,
          max_quantity: addon.max_quantity || 0,
          is_inquiry_only: addon.is_inquiry_only || false,
          sort_order: addon.sort_order !== undefined ? addon.sort_order : i
        });
      }
    }

    // Fetch with associations
    const created = await SystemProduct.findByPk(product.id, {
      include: [
        { model: SystemProductCategory, as: 'category' },
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons', include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }] }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Create system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

/**
 * PUT /api/system-products/:id
 */
router.put('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, sku, category_id, image_url, emoji, is_active,
      is_set, set_items, set_display_order, set_group, set_tier, set_use_case,
      set_setup_items, is_recommended, shipping_countries, shipping_settings,
      prices, addons
    } = req.body;

    const product = await SystemProduct.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const finalIsSet = is_set !== undefined ? is_set : product.is_set;
    if (finalIsSet && set_items !== undefined) {
      if (!Array.isArray(set_items) || set_items.length === 0) {
        return res.status(400).json({ success: false, message: 'Set must have at least 1 item' });
      }
      for (const item of set_items) {
        if (!item.productId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ success: false, message: 'Each set item must have productId, name, and quantity >= 1' });
        }
      }
      const referencedIds = set_items.map(i => i.productId);
      const referenced = await SystemProduct.findAll({ where: { id: referencedIds }, attributes: ['id', 'is_set'] });
      if (referenced.some(p => p.is_set)) {
        return res.status(400).json({ success: false, message: 'Set cannot contain other sets' });
      }
    }

    await product.update({
      name: name !== undefined ? name.trim() : product.name,
      description: description !== undefined ? description : product.description,
      sku: sku !== undefined ? sku : product.sku,
      category_id: category_id !== undefined ? category_id : product.category_id,
      image_url: image_url !== undefined ? image_url : product.image_url,
      emoji: emoji !== undefined ? emoji : product.emoji,
      is_active: is_active !== undefined ? is_active : product.is_active,
      is_set: is_set !== undefined ? is_set : product.is_set,
      set_items: set_items !== undefined ? (finalIsSet ? set_items : null) : product.set_items,
      set_display_order: set_display_order !== undefined ? set_display_order : product.set_display_order,
      set_group: set_group !== undefined ? set_group : product.set_group,
      set_tier: set_tier !== undefined ? set_tier : product.set_tier,
      set_use_case: set_use_case !== undefined ? set_use_case : product.set_use_case,
      set_setup_items: set_setup_items !== undefined ? set_setup_items : product.set_setup_items,
      is_recommended: is_recommended !== undefined ? is_recommended : product.is_recommended,
      shipping_countries: shipping_countries !== undefined ? shipping_countries : product.shipping_countries,
      shipping_settings: shipping_settings !== undefined ? shipping_settings : product.shipping_settings
    });

    // Update prices (replace all)
    if (prices !== undefined) {
      await SystemProductPrice.destroy({ where: { product_id: id } });
      if (prices && Array.isArray(prices)) {
        for (const p of prices) {
          if (p.currency && (p.price !== undefined && p.price !== null)) {
            await SystemProductPrice.create({
              product_id: id,
              currency: p.currency,
              price: p.price,
              is_active: p.is_active !== false
            });
          }
        }
      }
    }

    // Update addons (replace all)
    if (addons !== undefined) {
      await SystemProductAddon.destroy({ where: { set_product_id: id } });
      if (finalIsSet && addons && Array.isArray(addons)) {
        for (let i = 0; i < addons.length; i++) {
          const addon = addons[i];
          await SystemProductAddon.create({
            set_product_id: id,
            addon_product_id: addon.addon_product_id,
            addon_label: addon.addon_label || null,
            max_quantity: addon.max_quantity || 0,
            is_inquiry_only: addon.is_inquiry_only || false,
            sort_order: addon.sort_order !== undefined ? addon.sort_order : i
          });
        }
      }
    }

    const updated = await SystemProduct.findByPk(id, {
      include: [
        { model: SystemProductCategory, as: 'category' },
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons', include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }] }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

/**
 * DELETE /api/system-products/:id
 */
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await SystemProduct.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete related data
    await SystemProductPrice.destroy({ where: { product_id: id } });
    await SystemProductAddon.destroy({ where: { set_product_id: id } });
    await SystemProductAddon.destroy({ where: { addon_product_id: id } });
    await product.destroy();

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

/**
 * POST /api/system-products/:id/copy
 */
router.post('/:id/copy', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const original = await SystemProduct.findByPk(req.params.id, {
      include: [
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons' }
      ]
    });

    if (!original) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const newSku = await generateSKU();
    const copy = await SystemProduct.create({
      category_id: original.category_id,
      name: `${original.name} (Copy)`,
      description: original.description,
      sku: newSku,
      image_url: original.image_url,
      emoji: original.emoji,
      is_active: true,
      is_set: original.is_set,
      set_items: original.set_items,
      set_display_order: original.set_display_order,
      set_group: original.set_group,
      set_tier: original.set_tier,
      set_use_case: original.set_use_case,
      set_setup_items: original.set_setup_items,
      is_recommended: false,
      shipping_countries: original.shipping_countries,
      shipping_settings: original.shipping_settings,
      sort_order: original.sort_order
    });

    // Copy prices
    if (original.prices) {
      for (const p of original.prices) {
        await SystemProductPrice.create({
          product_id: copy.id,
          currency: p.currency,
          price: p.price,
          is_active: p.is_active
        });
      }
    }

    // Copy addons
    if (original.addons) {
      for (const a of original.addons) {
        await SystemProductAddon.create({
          set_product_id: copy.id,
          addon_product_id: a.addon_product_id,
          addon_label: a.addon_label,
          max_quantity: a.max_quantity,
          is_inquiry_only: a.is_inquiry_only,
          sort_order: a.sort_order
        });
      }
    }

    const created = await SystemProduct.findByPk(copy.id, {
      include: [
        { model: SystemProductCategory, as: 'category' },
        { model: SystemProductPrice, as: 'prices' },
        { model: SystemProductAddon, as: 'addons', include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }] }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Copy system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to copy product' });
  }
});

/**
 * PUT /api/system-products/:id/toggle-active
 */
router.put('/:id/toggle-active', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const product = await SystemProduct.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update({ is_active: !product.is_active });

    res.json({
      success: true,
      data: { id: product.id, is_active: product.is_active },
      message: product.is_active ? 'Product activated' : 'Product deactivated'
    });
  } catch (error) {
    console.error('Toggle system product error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle product' });
  }
});

// ============================================
// Prices (separate endpoints)
// ============================================

/**
 * GET /api/system-products/:id/prices
 */
router.get('/:id/prices', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const prices = await SystemProductPrice.findAll({
      where: { product_id: req.params.id },
      order: [['currency', 'ASC']]
    });
    res.json({ success: true, data: prices });
  } catch (error) {
    console.error('Get system product prices error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch prices' });
  }
});

/**
 * PUT /api/system-products/:id/prices
 */
router.put('/:id/prices', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { prices } = req.body;

    const product = await SystemProduct.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await SystemProductPrice.destroy({ where: { product_id: id } });

    if (prices && Array.isArray(prices)) {
      for (const p of prices) {
        if (p.currency && (p.price !== undefined && p.price !== null)) {
          await SystemProductPrice.create({
            product_id: id,
            currency: p.currency,
            price: p.price,
            is_active: p.is_active !== false
          });
        }
      }
    }

    const updated = await SystemProductPrice.findAll({
      where: { product_id: id },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update system product prices error:', error);
    res.status(500).json({ success: false, message: 'Failed to update prices' });
  }
});

// ============================================
// Addons (separate endpoints)
// ============================================

/**
 * GET /api/system-products/:id/addons
 */
router.get('/:id/addons', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const addons = await SystemProductAddon.findAll({
      where: { set_product_id: req.params.id },
      include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }],
      order: [['sort_order', 'ASC']]
    });
    res.json({ success: true, data: addons });
  } catch (error) {
    console.error('Get system product addons error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch addons' });
  }
});

/**
 * PUT /api/system-products/:id/addons
 */
router.put('/:id/addons', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { addons } = req.body;

    const product = await SystemProduct.findByPk(id);
    if (!product || !product.is_set) {
      return res.status(400).json({ success: false, message: 'Product not found or is not a set' });
    }

    await SystemProductAddon.destroy({ where: { set_product_id: id } });

    if (addons && Array.isArray(addons)) {
      for (let i = 0; i < addons.length; i++) {
        const addon = addons[i];
        await SystemProductAddon.create({
          set_product_id: id,
          addon_product_id: addon.addon_product_id,
          addon_label: addon.addon_label || null,
          max_quantity: addon.max_quantity || 0,
          is_inquiry_only: addon.is_inquiry_only || false,
          sort_order: addon.sort_order !== undefined ? addon.sort_order : i
        });
      }
    }

    const updated = await SystemProductAddon.findAll({
      where: { set_product_id: id },
      include: [{ model: SystemProduct, as: 'addonProduct', attributes: ['id', 'name', 'sku', 'emoji', 'image_url'] }],
      order: [['sort_order', 'ASC']]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update system product addons error:', error);
    res.status(500).json({ success: false, message: 'Failed to update addons' });
  }
});

module.exports = router;
