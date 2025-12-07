const express = require('express');
const router = express.Router();
const { Brand, Restaurant, User } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Get all brands (filtered by owner for Brand General)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/brands - User: ${req.user.email} (${req.user.role})`);

    const whereClause = {};

    // Brand General/Brand Manager only see their own brands
    if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      whereClause.owner_id = req.user.id;
      console.log(`🔐 Filtering brands for ${req.user.role}: owner_id = ${req.user.id}`);
    } else if (req.user.role === 'System Admin') {
      console.log(`👑 System Admin: Returning all brands`);
    } else {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const brands = await Brand.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    console.log(`📊 Found ${brands.length} brands`);
    res.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// Get single brand by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status', 'address', 'phone']
        }
      ]
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
});

// Create new brand
router.post('/', authenticateToken, requireRole('Brand General', 'System Admin'), async (req, res) => {
  try {
    console.log(`🆕 POST /api/brands - User: ${req.user.email}`);
    console.log('📝 Brand data:', req.body);

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    // Set owner_id to current user if Brand General
    const owner_id = req.user.role === 'Brand General' ? req.user.id : req.body.owner_id;

    const brand = await Brand.create({
      name,
      code,
      description,
      logo_url,
      owner_id,
      email,
      phone,
      address,
      website,
      currency: currency || 'RM',
      status: status || 'active'
    });

    console.log(`✅ Brand created: ${brand.name} (ID: ${brand.id})`);

    // Fetch with associations
    const createdBrand = await Brand.findByPk(brand.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        }
      ]
    });

    res.status(201).json(createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Brand code already exists' });
    }

    res.status(500).json({ error: 'Failed to create brand' });
  }
});

// Update brand
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 PUT /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    await brand.update({
      name: name || brand.name,
      code: code || brand.code,
      description,
      logo_url,
      email,
      phone,
      address,
      website,
      currency: currency || brand.currency,
      status: status || brand.status
    });

    console.log(`✅ Brand updated: ${brand.name}`);

    // Fetch with associations
    const updatedBrand = await Brand.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ]
    });

    res.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Brand code already exists' });
    }

    res.status(500).json({ error: 'Failed to update brand' });
  }
});

// Get restaurants for a brand
router.get('/:id/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🏪 GET /api/brands/${id}/restaurants - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'status', 'address', 'phone'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching brand restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch brand restaurants' });
  }
});

// Delete brand
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ DELETE /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurants'
      }]
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    // Check if brand has restaurants
    if (brand.restaurants && brand.restaurants.length > 0) {
      return res.status(400).json({
        error: `Cannot delete brand with ${brand.restaurants.length} restaurant(s). Please remove or reassign restaurants first.`
      });
    }

    await brand.destroy();
    console.log(`✅ Brand deleted: ${brand.name}`);

    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
});

module.exports = router;
