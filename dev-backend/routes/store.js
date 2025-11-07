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
router.put('/settings', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    // Update allowed fields
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'city', 'state',
      'postal_code', 'country', 'website', 'logo_url',
      'payment_settings', 'operation_settings'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'payment_settings' || field === 'operation_settings') {
          restaurant[field] = typeof req.body[field] === 'string'
            ? req.body[field]
            : JSON.stringify(req.body[field]);
        } else {
          restaurant[field] = req.body[field];
        }
      }
    });

    await restaurant.save();

    res.json({
      success: true,
      data: restaurant,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating store settings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
