const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all staff for a restaurant
router.get('/', async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Get staff members for this restaurant
    const staff = await User.findAll({
      where: {
        restaurant_id: restaurantId,
        role: ['Restaurant Admin', 'Staff']
      },
      attributes: ['id', 'username', 'email', 'full_name', 'role', 'createdAt']
    });

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Staff login (for POS terminal)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // This is a placeholder - implement actual authentication
    res.status(501).json({
      success: false,
      message: 'Staff login not implemented - use regular auth/login'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Staff logout
router.post('/logout', async (req, res) => {
  try {
    // Placeholder for staff logout
    res.json({
      success: true,
      message: 'Logged out'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
