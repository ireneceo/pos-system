/**
 * Support Ticket (System Inquiry) 라우터
 * - 시스템 문의 CRUD 및 상태 관리
 */

const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { Op } = require('sequelize');

// Get all support tickets
router.get('/', async (req, res) => {
  try {
    const { status, priority, category, search, customerId } = req.query;

    const where = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;
    if (customerId) where.customerId = customerId;

    if (search) {
      where[Op.or] = [
        { subject: { [Op.like]: `%${search}%` } },
        { customerName: { [Op.like]: `%${search}%` } },
        { ticketNumber: { [Op.like]: `%${search}%` } }
      ];
    }

    const tickets = await SupportTicket.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch support tickets' });
  }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch ticket' });
  }
});

// Create new support ticket
router.post('/', async (req, res) => {
  try {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const ticketNumber = `SUPP-${new Date().getFullYear()}-${String(timestamp % 10000)}-${String(random).padStart(3, '0')}`;

    const ticket = await SupportTicket.create({
      ...req.body,
      ticketNumber,
      id: `ticket-${timestamp}-${random}`
    });

    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create support ticket' });
  }
});

// Update support ticket status
router.put('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    const updateData = {};
    if (req.body.status) {
      updateData.status = req.body.status;
    }

    await ticket.update(updateData);

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update support ticket' });
  }
});

// Delete support ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    await ticket.destroy();

    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete support ticket' });
  }
});

module.exports = router;
