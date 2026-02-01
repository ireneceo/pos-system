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
        currency: restaurant.currency,
        cash_rounding: restaurant.cash_rounding,
        rounding_apply_to: restaurant.rounding_apply_to,
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
      'business_registration', 'tax_id',
      'payment_settings', 'operation_settings', 'table_settings',
      'currency', 'cash_rounding', 'rounding_apply_to'
    ];

    console.log('🔄 Updating fields...');
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        console.log(`  ✏️  ${field}:`, field === 'payment_settings' || field === 'operation_settings'
          ? `[JSON ${typeof req.body[field]}]`
          : req.body[field]);

        if (field === 'payment_settings' || field === 'operation_settings' || field === 'table_settings') {
          // Model setter will handle JSON.stringify, just pass the object
          restaurant[field] = req.body[field];
        } else {
          restaurant[field] = req.body[field];
        }
      }
    });

    // Sync operation_settings with individual currency columns
    // This ensures both locations have the same values
    if (req.body.operation_settings) {
      const opSettings = req.body.operation_settings;

      // Sync currency values: individual columns take priority
      if (req.body.currency !== undefined) {
        opSettings.currency = req.body.currency;
      }
      if (req.body.cash_rounding !== undefined) {
        opSettings.cashRounding = req.body.cash_rounding;
      }
      if (req.body.rounding_apply_to !== undefined) {
        opSettings.roundingApplyTo = req.body.rounding_apply_to;
      }

      // Update operation_settings with synced values
      restaurant.operation_settings = opSettings;
      console.log('✅ Synced currency settings in operation_settings:', {
        currency: opSettings.currency,
        cashRounding: opSettings.cashRounding,
        roundingApplyTo: opSettings.roundingApplyTo
      });
    }

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
