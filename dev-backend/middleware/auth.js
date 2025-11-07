const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    // Get user information from database
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      restaurant_id: user.restaurant_id
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Check if user has required role(s)
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Check if Restaurant Admin/Staff can access the restaurant
const checkRestaurantAccess = async (req, res, next) => {
  try {
    const { restaurantId, id } = req.params;
    const targetRestaurantId = restaurantId || id;

    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // System Admin can access everything
    if (req.user.role === 'System Admin') {
      return next();
    }

    // Restaurant Admin and Staff can only access their own restaurant
    if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
      if (!req.user.restaurant_id) {
        return res.status(403).json({ error: 'User not assigned to any restaurant' });
      }

      if (parseInt(req.user.restaurant_id) !== parseInt(targetRestaurantId)) {
        return res.status(403).json({ error: 'Access denied to this restaurant' });
      }

      return next();
    }

    // Managers can access restaurants they manage
    if (req.user.role.includes('Manager') || req.user.role.includes('General')) {
      const restaurant = await Restaurant.findByPk(targetRestaurantId, {
        include: [{
          model: User,
          as: 'managers',
          where: { id: req.user.id },
          required: false
        }]
      });

      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }

      const hasAccess = restaurant.managers && restaurant.managers.length > 0;
      if (!hasAccess && restaurant.manager_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied to this restaurant' });
      }

      return next();
    }

    return res.status(403).json({ error: 'Insufficient permissions' });
  } catch (error) {
    console.error('Restaurant access check error:', error);
    return res.status(500).json({ error: 'Failed to verify access' });
  }
};

module.exports = {
  authenticateToken,
  requireRole,
  checkRestaurantAccess
};