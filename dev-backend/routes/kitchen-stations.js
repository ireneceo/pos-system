const express = require('express');
const router = express.Router();
const { KitchenStation, Category, Product, Restaurant } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Op } = require('sequelize');

// Middleware: verify user has access to the restaurant
const verifyRestaurantAccess = async (req, res, next) => {
  try {
    const restaurantId = parseInt(req.query.restaurant_id || req.body.restaurant_id || req.params.restaurantId);
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    }

    req.restaurantId = restaurantId;

    // System Admin can access everything
    if (req.user.role === 'System Admin') return next();

    // Restaurant Admin / Staff can only access their own restaurant
    if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
      if (parseInt(req.user.restaurant_id) !== restaurantId) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      return next();
    }

    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  } catch (error) {
    console.error('[KitchenStations] Access check error:', error.message);
    return res.status(500).json({ success: false, message: 'Access check failed' });
  }
};

// GET /api/kitchen-stations?restaurant_id=5
// Station 목록 (배정된 카테고리/메뉴 포함)
router.get('/', authenticateToken, verifyRestaurantAccess, async (req, res) => {
  try {
    const stations = await KitchenStation.findAll({
      where: { restaurant_id: req.restaurantId },
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'category', 'kitchen_station_id']
        }
      ],
      order: [['display_order', 'ASC'], ['id', 'ASC']]
    });

    // Get restaurant assignment mode
    const restaurant = await Restaurant.findByPk(req.restaurantId, {
      attributes: ['kitchen_assignment_mode']
    });

    res.json({
      success: true,
      data: {
        assignment_mode: restaurant?.kitchen_assignment_mode || 'category',
        stations
      }
    });
  } catch (error) {
    console.error('[KitchenStations] GET error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch kitchen stations' });
  }
});

// GET /api/kitchen-stations/unassigned?restaurant_id=5
// 미배정 카테고리/메뉴 목록
router.get('/unassigned', authenticateToken, verifyRestaurantAccess, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.restaurantId, {
      attributes: ['kitchen_assignment_mode']
    });
    const mode = restaurant?.kitchen_assignment_mode || 'category';

    const unassignedCategories = await Category.findAll({
      where: {
        restaurant_id: req.restaurantId,
        kitchen_station_id: null
      },
      attributes: ['id', 'name', 'emoji'],
      order: [['displayOrder', 'ASC']]
    });

    const unassignedProducts = await Product.findAll({
      where: {
        restaurant_id: req.restaurantId,
        kitchen_station_id: null
      },
      attributes: ['id', 'name', 'category', 'emoji'],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        assignment_mode: mode,
        categories: unassignedCategories,
        products: unassignedProducts
      }
    });
  } catch (error) {
    console.error('[KitchenStations] GET unassigned error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch unassigned items' });
  }
});

// POST /api/kitchen-stations
// Station 생성
router.post('/', authenticateToken, requireRole('System Admin', 'Restaurant Admin'), verifyRestaurantAccess, async (req, res) => {
  try {
    const { name, display_order, category_ids, product_ids, alert_sound } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Station name is required' });
    }

    // Check duplicate name within same restaurant
    const existing = await KitchenStation.findOne({
      where: { restaurant_id: req.restaurantId, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A station with this name already exists' });
    }

    // Get next display_order if not provided
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await KitchenStation.max('display_order', {
        where: { restaurant_id: req.restaurantId }
      });
      order = (maxOrder || 0) + 1;
    }

    const station = await KitchenStation.create({
      restaurant_id: req.restaurantId,
      name: name.trim(),
      display_order: order,
      alert_sound: alert_sound || 'bell'
    });

    // Assign categories if provided
    if (category_ids && category_ids.length > 0) {
      await Category.update(
        { kitchen_station_id: station.id },
        { where: { id: category_ids, restaurant_id: req.restaurantId } }
      );
    }

    // Assign products if provided (menu item mode or override)
    if (product_ids && product_ids.length > 0) {
      await Product.update(
        { kitchen_station_id: station.id },
        { where: { id: product_ids, restaurant_id: req.restaurantId } }
      );
    }

    // Fetch created station with associations
    const created = await KitchenStation.findByPk(station.id, {
      include: [
        { model: Category, as: 'categories', attributes: ['id', 'name', 'emoji'] },
        { model: Product, as: 'products', attributes: ['id', 'name', 'category'] }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('[KitchenStations] POST error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create kitchen station' });
  }
});

// PUT /api/kitchen-stations/:id
// Station 수정 (이름, 순서, 배정 변경)
router.put('/:id', authenticateToken, requireRole('System Admin', 'Restaurant Admin'), async (req, res) => {
  try {
    const station = await KitchenStation.findByPk(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    // Access check
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== station.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { name, display_order, is_active, category_ids, product_ids, alert_sound } = req.body;

    // Check duplicate name if name changed
    if (name && name.trim() !== station.name) {
      const existing = await KitchenStation.findOne({
        where: {
          restaurant_id: station.restaurant_id,
          name: name.trim(),
          id: { [Op.ne]: station.id }
        }
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A station with this name already exists' });
      }
    }

    // Update station fields
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (display_order !== undefined) updateData.display_order = display_order;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (alert_sound !== undefined) updateData.alert_sound = alert_sound;

    if (Object.keys(updateData).length > 0) {
      await station.update(updateData);
    }

    // Update category assignments if provided
    if (category_ids !== undefined) {
      // Remove current assignments for this station
      await Category.update(
        { kitchen_station_id: null },
        { where: { kitchen_station_id: station.id, restaurant_id: station.restaurant_id } }
      );
      // Assign new categories
      if (category_ids.length > 0) {
        await Category.update(
          { kitchen_station_id: station.id },
          { where: { id: category_ids, restaurant_id: station.restaurant_id } }
        );
      }
    }

    // Update product assignments if provided
    if (product_ids !== undefined) {
      // Remove current assignments for this station
      await Product.update(
        { kitchen_station_id: null },
        { where: { kitchen_station_id: station.id, restaurant_id: station.restaurant_id } }
      );
      // Assign new products
      if (product_ids.length > 0) {
        await Product.update(
          { kitchen_station_id: station.id },
          { where: { id: product_ids, restaurant_id: station.restaurant_id } }
        );
      }
    }

    // Fetch updated station with associations
    const updated = await KitchenStation.findByPk(station.id, {
      include: [
        { model: Category, as: 'categories', attributes: ['id', 'name', 'emoji'] },
        { model: Product, as: 'products', attributes: ['id', 'name', 'category'] }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('[KitchenStations] PUT error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update kitchen station' });
  }
});

// DELETE /api/kitchen-stations/:id
// Station 삭제 (연결된 카테고리/메뉴 배정 해제)
router.delete('/:id', authenticateToken, requireRole('System Admin', 'Restaurant Admin'), async (req, res) => {
  try {
    const station = await KitchenStation.findByPk(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    // Access check
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== station.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Unassign categories and products before deleting
    await Category.update(
      { kitchen_station_id: null },
      { where: { kitchen_station_id: station.id } }
    );
    await Product.update(
      { kitchen_station_id: null },
      { where: { kitchen_station_id: station.id } }
    );

    await station.destroy();

    res.json({ success: true, message: 'Kitchen station deleted' });
  } catch (error) {
    console.error('[KitchenStations] DELETE error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete kitchen station' });
  }
});

module.exports = router;
