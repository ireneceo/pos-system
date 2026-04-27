const express = require('express');
const router = express.Router();
const AddonModule = require('../models/AddonModule');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Get all addon modules
// active_only=true: public (Pricing/Landing 카탈로그용, 활성 모듈만)
// otherwise: 인증 필요 (Admin)
router.get('/', async (req, res, next) => {
  if (req.query.active_only === 'true') return next();
  return authenticateToken(req, res, next);
}, async (req, res) => {
  try {
    const whereCondition = {};
    if (req.query.active_only === 'true') {
      whereCondition.is_active = true;
    }

    const modules = await AddonModule.findAll({
      where: whereCondition,
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    res.json(modules);
  } catch (error) {
    console.error('Error fetching addon modules:', error);
    res.status(500).json({ error: 'Failed to fetch addon modules' });
  }
});

// Get addon module by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const module = await AddonModule.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error fetching addon module:', error);
    res.status(500).json({ error: 'Failed to fetch addon module' });
  }
});

// Get addon module by code
router.get('/code/:code', authenticateToken, async (req, res) => {
  try {
    const module = await AddonModule.findOne({
      where: { module_code: req.params.code }
    });

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error fetching addon module:', error);
    res.status(500).json({ error: 'Failed to fetch addon module' });
  }
});

// Create new addon module (Admin only)
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const module = await AddonModule.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    console.error('Error creating addon module:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Module code already exists'
      });
    }

    res.status(500).json({ error: 'Failed to create addon module' });
  }
});

// Update addon module (Admin only)
router.put('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const module = await AddonModule.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    await module.update(req.body);
    res.json(module);
  } catch (error) {
    console.error('Error updating addon module:', error);
    res.status(500).json({ error: 'Failed to update addon module' });
  }
});

// Delete addon module (Admin only)
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const module = await AddonModule.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    await module.destroy();
    res.json({ success: true, message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting addon module:', error);
    res.status(500).json({ error: 'Failed to delete addon module' });
  }
});

module.exports = router;
