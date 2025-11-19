const express = require('express');
const router = express.Router();
const AddonModule = require('../models/AddonModule');

// Get all addon modules
router.get('/', async (req, res) => {
  try {
    const { active_only } = req.query;

    const whereCondition = {};
    if (active_only === 'true') {
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
router.get('/:id', async (req, res) => {
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
router.get('/code/:code', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
