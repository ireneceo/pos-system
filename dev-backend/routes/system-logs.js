const express = require('express');
const router = express.Router();
const SystemLog = require('../models/SystemLog');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// All routes require System Admin (auth applied at mount level in server.js)

// GET / - List logs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      level,
      category,
      service,
      search,
      start_date,
      end_date
    } = req.query;

    const where = {};

    if (level && level !== 'all') {
      where.level = level;
    }
    if (category && category !== 'all') {
      where.category = category;
    }
    if (service && service !== 'all') {
      where.service = service;
    }
    if (search) {
      where[Op.or] = [
        { message: { [Op.like]: `%${search}%` } },
        { service: { [Op.like]: `%${search}%` } },
        { user_name: { [Op.like]: `%${search}%` } }
      ];
    }
    if (start_date) {
      where.timestamp = { ...where.timestamp, [Op.gte]: new Date(start_date) };
    }
    if (end_date) {
      const endDateTime = new Date(end_date);
      endDateTime.setHours(23, 59, 59, 999);
      where.timestamp = { ...where.timestamp, [Op.lte]: endDateTime };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await SystemLog.findAndCountAll({
      where,
      order: [['timestamp', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: {
        logs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching system logs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch system logs' });
  }
});

// GET /stats - 24h statistics
router.get('/stats', async (req, res) => {
  try {
    const now = new Date();
    const h24 = new Date(now - 24 * 60 * 60 * 1000);
    const h1 = new Date(now - 60 * 60 * 1000);

    const [total24h, errors, warnings, recent1h] = await Promise.all([
      SystemLog.count({ where: { timestamp: { [Op.gte]: h24 } } }),
      SystemLog.count({ where: { timestamp: { [Op.gte]: h24 }, level: { [Op.in]: ['error', 'critical'] } } }),
      SystemLog.count({ where: { timestamp: { [Op.gte]: h24 }, level: 'warning' } }),
      SystemLog.count({ where: { timestamp: { [Op.gte]: h1 } } })
    ]);

    res.json({
      success: true,
      data: { total24h, errors, warnings, recent1h }
    });
  } catch (error) {
    console.error('Error fetching log stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch log stats' });
  }
});

// GET /alerts-summary - 24h critical/error summary for dashboard
router.get('/alerts-summary', async (req, res) => {
  try {
    const h24 = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [criticalCount, errorCount] = await Promise.all([
      SystemLog.count({ where: { timestamp: { [Op.gte]: h24 }, level: 'critical' } }),
      SystemLog.count({ where: { timestamp: { [Op.gte]: h24 }, level: 'error' } })
    ]);

    res.json({
      success: true,
      data: { criticalCount, errorCount, total: criticalCount + errorCount }
    });
  } catch (error) {
    console.error('Error fetching alerts summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch alerts summary' });
  }
});


// DELETE / - Clear logs
router.delete('/', async (req, res) => {
  try {
    const { before_date } = req.query;
    const where = {};

    if (before_date) {
      where.timestamp = { [Op.lt]: new Date(before_date) };
    }

    const deleted = await SystemLog.destroy({ where });
    res.json({ success: true, message: `Deleted ${deleted} log entries` });
  } catch (error) {
    console.error('Error clearing system logs:', error);
    res.status(500).json({ success: false, message: 'Failed to clear logs' });
  }
});

module.exports = router;
