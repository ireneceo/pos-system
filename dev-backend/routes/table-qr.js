const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { TableQRSession, Restaurant } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { Op } = require('sequelize');

/**
 * POST /api/restaurants/:restaurantId/tables/:tableNumber/qr
 * Generate new QR session (expires previous active sessions)
 */
router.post('/:restaurantId/tables/:tableNumber/qr', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.params;

    // Get restaurant settings for expiration time
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const tableSettings = restaurant.table_settings || {};
    const expirationMinutes = tableSettings.qrExpirationMinutes || 180; // default 3 hours

    // Expire all previous active sessions for this table
    await TableQRSession.update(
      { status: 'expired', expired_by: 'new_qr' },
      { where: { restaurant_id: restaurantId, table_number: tableNumber, status: 'active' } }
    );

    // Generate new session
    const token = uuidv4().replace(/-/g, '').substring(0, 16); // 16-char token
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

    const session = await TableQRSession.create({
      restaurant_id: restaurantId,
      table_number: tableNumber,
      token,
      status: 'active',
      expires_at: expiresAt
    });

    // Build QR URL
    const slug = restaurant.slug || restaurantId;
    const baseUrl = process.env.BASE_URL || 'https://dev.purplehere.com';
    const qrUrl = `${baseUrl}/mobile/${slug}?table=${tableNumber}&token=${token}`;

    res.status(201).json({
      success: true,
      data: {
        id: session.id,
        token,
        table_number: tableNumber,
        qr_url: qrUrl,
        expires_at: expiresAt,
        expiration_minutes: expirationMinutes,
        restaurant_name: restaurant.name
      }
    });
  } catch (error) {
    console.error('Generate QR session error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate QR session' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/tables/:tableNumber/qr
 * Get current active QR session for a table
 */
router.get('/:restaurantId/tables/:tableNumber/qr', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.params;

    const session = await TableQRSession.findOne({
      where: {
        restaurant_id: restaurantId,
        table_number: tableNumber,
        status: 'active',
        expires_at: { [Op.gt]: new Date() }
      },
      order: [['created_at', 'DESC']]
    });

    if (!session) {
      return res.json({ success: true, data: null });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    const slug = restaurant?.slug || restaurantId;
    const baseUrl = process.env.BASE_URL || 'https://dev.purplehere.com';
    const qrUrl = `${baseUrl}/mobile/${slug}?table=${tableNumber}&token=${session.token}`;

    const remainingMs = new Date(session.expires_at).getTime() - Date.now();
    const remainingMinutes = Math.max(0, Math.floor(remainingMs / 60000));

    res.json({
      success: true,
      data: {
        id: session.id,
        token: session.token,
        table_number: tableNumber,
        qr_url: qrUrl,
        expires_at: session.expires_at,
        remaining_minutes: remainingMinutes,
        created_at: session.created_at
      }
    });
  } catch (error) {
    console.error('Get QR session error:', error);
    res.status(500).json({ success: false, message: 'Failed to get QR session' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/tables/:tableNumber/qr
 * Manually expire QR session
 */
router.delete('/:restaurantId/tables/:tableNumber/qr', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.params;

    const updated = await TableQRSession.update(
      { status: 'expired', expired_by: 'manual' },
      { where: { restaurant_id: restaurantId, table_number: tableNumber, status: 'active' } }
    );

    res.json({
      success: true,
      message: updated[0] > 0 ? 'QR session expired' : 'No active session found'
    });
  } catch (error) {
    console.error('Expire QR session error:', error);
    res.status(500).json({ success: false, message: 'Failed to expire QR session' });
  }
});

module.exports = router;
