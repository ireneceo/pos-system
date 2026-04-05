const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Get activity logs for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const {
      page = 1,
      limit = 50,
      entity_type,
      action_type,
      user_id,
      start_date,
      end_date
    } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = { restaurant_id: restaurantId };

    if (entity_type) {
      where.entity_type = entity_type;
    }

    if (action_type) {
      where.action_type = action_type;
    }

    if (user_id) {
      where.user_id = user_id;
    }

    if (start_date || end_date) {
      where.created_at = {};
      if (start_date) {
        where.created_at[Op.gte] = new Date(start_date);
      }
      if (end_date) {
        where.created_at[Op.lte] = new Date(end_date);
      }
    }

    // Get logs with pagination
    const { count, rows } = await ActivityLog.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        logs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs',
      error: error.message
    });
  }
});

// Get activity logs for a user (Brand General, Foodcourt General, Owner, System Admin)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 50, entity_type, action_type, start_date, end_date } = req.query;
    const offset = (page - 1) * limit;

    const where = { user_id: userId };
    if (entity_type) where.entity_type = entity_type;
    if (action_type) where.action_type = action_type;
    if (start_date || end_date) {
      where.created_at = {};
      if (start_date) where.created_at[Op.gte] = new Date(start_date);
      if (end_date) where.created_at[Op.lte] = new Date(end_date);
    }

    const { count, rows } = await ActivityLog.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        logs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user activity logs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs' });
  }
});

// Get activity log statistics
router.get('/restaurant/:restaurantId/stats', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get total logs
    const totalLogs = await ActivityLog.count({
      where: {
        restaurant_id: restaurantId,
        created_at: { [Op.gte]: startDate }
      }
    });

    // Get logs by action type
    const byActionType = await ActivityLog.findAll({
      attributes: [
        'action_type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        restaurant_id: restaurantId,
        created_at: { [Op.gte]: startDate }
      },
      group: ['action_type'],
      raw: true
    });

    // Get logs by entity type
    const byEntityType = await ActivityLog.findAll({
      attributes: [
        'entity_type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        restaurant_id: restaurantId,
        created_at: { [Op.gte]: startDate }
      },
      group: ['entity_type'],
      limit: 10,
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true
    });

    // Get most active users
    const topUsers = await ActivityLog.findAll({
      attributes: [
        'user_id',
        'username',
        'full_name',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        restaurant_id: restaurantId,
        created_at: { [Op.gte]: startDate }
      },
      group: ['user_id', 'username', 'full_name'],
      limit: 5,
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true
    });

    res.json({
      success: true,
      data: {
        totalLogs,
        byActionType,
        byEntityType,
        topUsers,
        period: `Last ${days} days`
      }
    });
  } catch (error) {
    console.error('Error fetching activity log stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// Create activity log (used by other routes)
router.post('/', async (req, res) => {
  try {
    const log = await ActivityLog.createLog({
      ...req.body,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create activity log',
      error: error.message
    });
  }
});

module.exports = router;
