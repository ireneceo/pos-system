const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

// GET /api/subscriptions - Get all subscriptions (dashboard용)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const rows = await sequelize.query(
      `SELECT s.*, r.name as restaurant_name
       FROM subscriptions s
       LEFT JOIN restaurants r ON s.restaurant_id = r.id
       ORDER BY s.created_at DESC`,
      { type: QueryTypes.SELECT }
    );
    res.json({ data: rows });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.json({ data: [] });
  }
});

module.exports = router;
