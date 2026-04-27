/**
 * Carriers — Sprint 5 (2026-04-27)
 *
 * Public catalog endpoint (auth required) + System Admin CRUD.
 *   GET  /api/carriers              — active carriers list
 *   GET  /api/admin/carriers        — full list (admin)
 *   POST /api/admin/carriers
 *   PUT  /api/admin/carriers/:id
 *   DELETE /api/admin/carriers/:id  — soft via is_active=false
 */

const express = require('express');
const router = express.Router();
const { Carrier } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');

router.get('/carriers', authenticateToken, async (req, res) => {
  try {
    const items = await Carrier.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load carriers' });
  }
});

router.get('/admin/carriers', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const items = await Carrier.findAll({
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/admin/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load carriers' });
  }
});

function sanitizePayload(body) {
  return {
    code: body.code ? sanitizeString(String(body.code)).slice(0, 50).toLowerCase().replace(/[^a-z0-9_]/g, '_') : null,
    name: body.name ? sanitizeString(String(body.name)).slice(0, 100) : null,
    tracking_url_template: body.tracking_url_template ? sanitizeString(String(body.tracking_url_template)).slice(0, 500) : null,
    logo_url: body.logo_url ? String(body.logo_url).slice(0, 2000) : null,
    country: body.country ? String(body.country).toUpperCase().slice(0, 2) : null,
    is_active: body.is_active !== undefined ? !!body.is_active : true,
    sort_order: Number.isFinite(parseInt(body.sort_order, 10)) ? parseInt(body.sort_order, 10) : 0
  };
}

router.post('/admin/carriers', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const data = sanitizePayload(req.body);
    if (!data.code || !data.name) {
      return res.status(400).json({ success: false, message: 'code and name are required' });
    }
    const created = await Carrier.create(data);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Carrier code already exists' });
    }
    console.error('POST /api/admin/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to create carrier' });
  }
});

router.put('/admin/carriers/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const data = sanitizePayload(req.body);
    await carrier.update(data);
    res.json({ success: true, data: carrier });
  } catch (err) {
    console.error('PUT /api/admin/carriers/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update carrier' });
  }
});

router.delete('/admin/carriers/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });
    await carrier.update({ is_active: false });
    res.json({ success: true, message: 'Carrier deactivated' });
  } catch (err) {
    console.error('DELETE /api/admin/carriers/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to deactivate carrier' });
  }
});

module.exports = router;
