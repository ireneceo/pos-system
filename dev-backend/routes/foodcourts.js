const express = require('express');
const router = express.Router();
const { Foodcourt, Restaurant, User } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Get all foodcourts (filtered by owner for Foodcourt General)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/foodcourts - User: ${req.user.email} (${req.user.role})`);

    const whereClause = {};

    // Foodcourt General/Foodcourt Manager only see their own foodcourts
    if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      whereClause.owner_id = req.user.id;
      console.log(`🔐 Filtering foodcourts for ${req.user.role}: owner_id = ${req.user.id}`);
    } else if (req.user.role === 'System Admin') {
      console.log(`👑 System Admin: Returning all foodcourts`);
    } else {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const foodcourts = await Foodcourt.findAll({
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

    console.log(`📊 Found ${foodcourts.length} foodcourts`);
    res.json(foodcourts);
  } catch (error) {
    console.error('Error fetching foodcourts:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourts' });
  }
});

// Get single foodcourt by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id, {
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

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    res.json(foodcourt);
  } catch (error) {
    console.error('Error fetching foodcourt:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourt' });
  }
});

// Create new foodcourt
router.post('/', authenticateToken, requireRole('Foodcourt General', 'System Admin'), async (req, res) => {
  try {
    console.log(`🆕 POST /api/foodcourts - User: ${req.user.email}`);
    console.log('📝 Foodcourt data:', req.body);

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    // Set owner_id to current user if Foodcourt General
    const owner_id = req.user.role === 'Foodcourt General' ? req.user.id : req.body.owner_id;

    const foodcourt = await Foodcourt.create({
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

    console.log(`✅ Foodcourt created: ${foodcourt.name} (ID: ${foodcourt.id})`);

    // Fetch with associations
    const createdFoodcourt = await Foodcourt.findByPk(foodcourt.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        }
      ]
    });

    res.status(201).json(createdFoodcourt);
  } catch (error) {
    console.error('Error creating foodcourt:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Foodcourt code already exists' });
    }

    res.status(500).json({ error: 'Failed to create foodcourt' });
  }
});

// Update foodcourt
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 PUT /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    await foodcourt.update({
      name: name || foodcourt.name,
      code: code || foodcourt.code,
      description,
      logo_url,
      email,
      phone,
      address,
      website,
      currency: currency || foodcourt.currency,
      status: status || foodcourt.status
    });

    console.log(`✅ Foodcourt updated: ${foodcourt.name}`);

    // Fetch with associations
    const updatedFoodcourt = await Foodcourt.findByPk(id, {
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

    res.json(updatedFoodcourt);
  } catch (error) {
    console.error('Error updating foodcourt:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Foodcourt code already exists' });
    }

    res.status(500).json({ error: 'Failed to update foodcourt' });
  }
});

// Get restaurants for a foodcourt
router.get('/:id/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🏪 GET /api/foodcourts/${id}/restaurants - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: id },
      attributes: ['id', 'name', 'status', 'address', 'phone'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching foodcourt restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourt restaurants' });
  }
});

// Delete foodcourt
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ DELETE /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurants'
      }]
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    // Check if foodcourt has restaurants
    if (foodcourt.restaurants && foodcourt.restaurants.length > 0) {
      return res.status(400).json({
        error: `Cannot delete foodcourt with ${foodcourt.restaurants.length} restaurant(s). Please remove or reassign restaurants first.`
      });
    }

    await foodcourt.destroy();
    console.log(`✅ Foodcourt deleted: ${foodcourt.name}`);

    res.json({ message: 'Foodcourt deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt:', error);
    res.status(500).json({ error: 'Failed to delete foodcourt' });
  }
});

// Get company info for foodcourt owner
router.get('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/foodcourts/company-info - User: ${req.user.email} (${req.user.role})`);

    // Foodcourt General/Manager는 자신이 소유한 푸드코트의 회사정보를 가져옴
    if (req.user.role !== 'Foodcourt General' && req.user.role !== 'Foodcourt Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const foodcourt = await Foodcourt.findOne({
      where: { owner_id: req.user.id }
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    res.json({
      company_name: foodcourt.company_name || foodcourt.name,
      registration_no: foodcourt.registration_no,
      trade_name: foodcourt.trade_name,
      address: foodcourt.address,
      city: foodcourt.city,
      state: foodcourt.state,
      postal_code: foodcourt.postal_code,
      country: foodcourt.country || 'MY',
      phone: foodcourt.phone,
      email: foodcourt.email,
      website: foodcourt.website,
      tax_no: foodcourt.tax_no,
      bank_name: foodcourt.bank_name,
      bank_account: foodcourt.bank_account,
      bank_account_name: foodcourt.bank_account_name,
      logo_url: foodcourt.logo_url,
      operation_settings: foodcourt.operation_settings
    });
  } catch (error) {
    console.error('Error fetching foodcourt company info:', error);
    res.status(500).json({ error: 'Failed to fetch company info' });
  }
});

// Update company info for foodcourt owner
router.put('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 PUT /api/foodcourts/company-info - User: ${req.user.email}`);

    if (req.user.role !== 'Foodcourt General' && req.user.role !== 'Foodcourt Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const foodcourt = await Foodcourt.findOne({
      where: { owner_id: req.user.id }
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    const updateData = {
      company_name: req.body.company_name,
      registration_no: req.body.registration_no,
      trade_name: req.body.trade_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      tax_no: req.body.tax_no,
      bank_name: req.body.bank_name,
      bank_account: req.body.bank_account,
      bank_account_name: req.body.bank_account_name,
      logo_url: req.body.logo_url,
      operation_settings: req.body.operation_settings
    };

    await foodcourt.update(updateData);
    console.log(`✅ Foodcourt company info updated: ${foodcourt.name}`);

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating foodcourt company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

module.exports = router;
