const express = require('express');
const router = express.Router();
const PlanTemplate = require('../models/PlanTemplate');
const Restaurant = require('../models/Restaurant');
const { Op } = require('sequelize');

// Get all plans
router.get('/', async (req, res) => {
  try {
    // Fetch all plans (not just active ones) for admin interface
    const plans = await PlanTemplate.findAll({
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

// Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await PlanTemplate.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
});

// Create new plan (Admin only)
router.post('/', async (req, res) => {
  try {
    console.log('🔄 POST /api/plans - Request received');
    console.log('📝 Request body:', req.body);

    const plan = await PlanTemplate.create(req.body);
    console.log('✅ Plan created successfully:', plan);
    res.status(201).json(plan);
  } catch (error) {
    console.error('❌ Error creating plan:', error);
    console.error('Error details:', error.message);

    // Handle unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.fields?.name ? 'Plan name' : 'field';
      return res.status(409).json({
        error: `${field} already exists. Please use a different ${field.toLowerCase()}.`
      });
    }

    res.status(500).json({ error: 'Failed to create plan' });
  }
});

// Update plan (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const plan = await PlanTemplate.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    await plan.update(req.body);
    res.json(plan);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

// Delete plan (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const plan = await PlanTemplate.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Check if any restaurants are using this plan
    const restaurantsUsingPlan = await Restaurant.count({
      where: {
        plan_type: `${plan.display_name}`
      }
    });

    if (restaurantsUsingPlan > 0) {
      return res.status(400).json({
        error: 'Cannot delete plan that is currently in use',
        restaurantsCount: restaurantsUsingPlan
      });
    }

    await plan.destroy();
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

// Get subscription statistics by plan
router.get('/stats/subscriptions', async (req, res) => {
  try {
    // Query restaurants grouped by plan_type to get subscription counts
    const stats = await Restaurant.findAll({
      attributes: [
        'plan_type',
        [Restaurant.sequelize.fn('COUNT', Restaurant.sequelize.col('id')), 'count']
      ],
      where: {
        plan_type: {
          [Op.ne]: null // Only count restaurants with valid plan types
        }
      },
      group: ['plan_type'],
      raw: true
    });

    // Transform the data to include plan_name for frontend compatibility
    const transformedStats = stats.map(stat => ({
      plan_name: stat.plan_type,
      count: parseInt(stat.count) || 0
    }));

    console.log('📊 Subscription stats:', transformedStats);
    res.json(transformedStats);
  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({ error: 'Failed to fetch subscription statistics' });
  }
});

// Export plans to CSV
router.get('/export/csv', async (req, res) => {
  try {
    const plans = await PlanTemplate.findAll({
      order: [['sort_order', 'ASC']]
    });

    // Create CSV content
    const headers = [
      'Plan Name',
      'Display Name',
      'Category',
      'Monthly Price (RM)',
      'Annual Price (RM)',
      'Order Limit',
      'Menu Item Limit',
      'Staff Limit',
      'Features',
      'Active',
      'Sort Order'
    ];

    const rows = plans.map(plan => [
      plan.name,
      plan.display_name,
      plan.category || 'basic',
      plan.base_price_monthly,
      plan.base_price_annual,
      plan.order_limit === -1 ? 'Unlimited' : plan.order_limit,
      plan.menu_item_limit === -1 ? 'Unlimited' : plan.menu_item_limit,
      plan.staff_limit === -1 ? 'Unlimited' : plan.staff_limit,
      Array.isArray(plan.features) ? plan.features.join('; ') : '',
      plan.is_active ? 'Yes' : 'No',
      plan.sort_order
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Set response headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="subscription-plans-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('Error exporting plans:', error);
    res.status(500).json({ error: 'Failed to export plans' });
  }
});

module.exports = router;