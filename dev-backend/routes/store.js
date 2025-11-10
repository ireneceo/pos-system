const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

// Get store settings
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Get restaurant settings
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    // Parse settings
    let paymentSettings = {};
    let operationSettings = {};

    try {
      if (restaurant.payment_settings) {
        paymentSettings = typeof restaurant.payment_settings === 'string'
          ? JSON.parse(restaurant.payment_settings)
          : restaurant.payment_settings;
      }
    } catch (e) {
      console.error('Error parsing payment_settings:', e);
    }

    try {
      if (restaurant.operation_settings) {
        operationSettings = typeof restaurant.operation_settings === 'string'
          ? JSON.parse(restaurant.operation_settings)
          : restaurant.operation_settings;
      }
    } catch (e) {
      console.error('Error parsing operation_settings:', e);
    }

    res.json({
      success: true,
      data: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        postal_code: restaurant.postal_code,
        country: restaurant.country,
        business_registration: restaurant.business_registration,
        tax_id: restaurant.tax_id,
        website: restaurant.website,
        logo_url: restaurant.logo_url,
        payment_settings: paymentSettings,
        operation_settings: operationSettings,
        plan_type: restaurant.plan_type,
        status: restaurant.status
      }
    });
  } catch (error) {
    console.error('Error fetching store settings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update store settings
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    console.log('🔧 [STORE UPDATE] Starting settings update...');
    console.log('📋 Request Query:', req.query);
    console.log('👤 User Info:', { userId: req.user?.id, restaurantId: req.user?.restaurant_id });
    console.log('📦 Request Body Keys:', Object.keys(req.body));

    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    console.log('🎯 Target Restaurant ID:', restaurantId);

    if (!restaurantId) {
      console.error('❌ No restaurant ID provided');
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Access control: Only allow users to update their own restaurant
    // System Admin can update any restaurant
    if (req.user.role !== 'System Admin') {
      if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
        if (parseInt(req.user.restaurant_id) !== parseInt(restaurantId)) {
          console.error('❌ Access denied: User restaurant_id does not match target');
          return res.status(403).json({
            success: false,
            error: 'Access denied to this restaurant'
          });
        }
      }
    }
    console.log('✅ Access control passed');

    console.log('🔍 Finding restaurant with ID:', restaurantId);
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      console.error('❌ Restaurant not found:', restaurantId);
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    console.log('✅ Restaurant found:', restaurant.name);

    // Update allowed fields
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'city', 'state',
      'postal_code', 'country', 'website', 'logo_url',
      'payment_settings', 'operation_settings'
    ];

    console.log('🔄 Updating fields...');
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        console.log(`  ✏️  ${field}:`, field === 'payment_settings' || field === 'operation_settings'
          ? `[JSON ${typeof req.body[field]}]`
          : req.body[field]);

        if (field === 'payment_settings' || field === 'operation_settings') {
          const value = typeof req.body[field] === 'string'
            ? req.body[field]
            : JSON.stringify(req.body[field]);
          console.log(`  📝 ${field} stringified length:`, value.length);
          restaurant[field] = value;
        } else {
          restaurant[field] = req.body[field];
        }
      }
    });

    console.log('💾 Saving to database...');
    await restaurant.save();
    console.log('✅ Settings saved successfully!');

    res.json({
      success: true,
      data: restaurant,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('❌ [STORE UPDATE ERROR]:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
