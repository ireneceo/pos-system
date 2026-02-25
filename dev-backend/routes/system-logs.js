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

// GET /server-health - Latest production server health data
router.get('/server-health', async (req, res) => {
  try {
    // Get latest health check
    const latest = await SystemLog.findOne({
      where: { service: 'server-health', category: 'system' },
      order: [['timestamp', 'DESC']]
    });

    // Get 24h trend data (one entry per 30-min interval)
    const h24 = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const trendLogs = await SystemLog.findAll({
      where: {
        service: 'server-health',
        category: 'system',
        timestamp: { [Op.gte]: h24 }
      },
      order: [['timestamp', 'ASC']],
      attributes: ['timestamp', 'level', 'details']
    });

    const trend = trendLogs.map(log => {
      const d = typeof log.details === 'string' ? JSON.parse(log.details) : log.details;
      return {
        timestamp: log.timestamp,
        level: log.level,
        cpu: d?.cpu?.usage || 0,
        memory: d?.memory?.usagePercent || 0,
        disk: d?.disk?.usagePercent || 0
      };
    });

    // Count alerts in last 24h
    const alertCount = await SystemLog.count({
      where: {
        service: 'server-health',
        timestamp: { [Op.gte]: h24 },
        level: { [Op.in]: ['warning', 'error', 'critical'] }
      }
    });

    res.json({
      success: true,
      data: {
        current: latest ? (typeof latest.details === 'string' ? JSON.parse(latest.details) : latest.details) : null,
        lastCheck: latest?.timestamp || null,
        lastLevel: latest?.level || null,
        trend,
        alertCount
      }
    });
  } catch (error) {
    console.error('Error fetching server health:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch server health' });
  }
});

// POST /server-health/check-now - Trigger immediate health check
let lastManualCheck = 0;
router.post('/server-health/check-now', async (req, res) => {
  try {
    // Rate limit: 1 per minute
    const now = Date.now();
    if (now - lastManualCheck < 60000) {
      const waitSec = Math.ceil((60000 - (now - lastManualCheck)) / 1000);
      return res.status(429).json({ success: false, message: `Please wait ${waitSec} seconds before next check` });
    }
    lastManualCheck = now;

    const serverHealthMonitor = require('../services/serverHealthMonitor');
    const result = await serverHealthMonitor.runHealthCheck();

    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(500).json({ success: false, message: 'Health check failed - check system logs' });
    }
  } catch (error) {
    console.error('Error running manual health check:', error);
    res.status(500).json({ success: false, message: 'Failed to run health check' });
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
