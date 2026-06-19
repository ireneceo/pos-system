/**
 * Support Ticket (System Inquiry) 라우터
 * - 시스템 문의 CRUD 및 상태 관리
 * - System Admin: 모든 티켓 조회/관리
 * - 기타 역할: 자기 티켓만 조회
 */

const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { sendNotification, sendNotificationBatch, getSystemAdminIds } = require('../utils/notificationService');
const { inquiryReceivedEmail, ticketStatusChangedEmail } = require('../utils/notificationTemplates');

// Get all support tickets (filtered by role)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, priority, category, search, customerId } = req.query;
    const user = req.user;

    const where = {};

    // System Admin sees all tickets; others see only their own
    if (user.role === 'System Admin') {
      if (customerId) where.customerId = customerId;
    } else {
      where.customerId = String(user.id);
    }

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;
    // Merchants never see QZ diagnostic tickets (admin-only channel). Admin sees all.
    if (user.role !== 'System Admin' && !category) where.category = { [Op.ne]: 'diagnostic' };

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
    res.status(500).json({ success: false, error: { message: 'Failed to fetch support tickets', code: 'INTERNAL_ERROR' } });
  }
});

// Get ticket by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    // Non-admin can only view their own tickets
    if (req.user.role !== 'System Admin' && ticket.customerId !== String(req.user.id)) {
      return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
    }

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Create new support ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const ticketNumber = `SUPP-${new Date().getFullYear()}-${String(timestamp % 10000)}-${String(random).padStart(3, '0')}`;

    // Determine the ticket creator: System Admin can create on behalf of another user
    let customerId = String(req.user.id);
    let customerName = req.user.full_name || req.user.email;
    let customerEmail = req.user.email;
    let customerRole = req.user.role;

    if (req.user.role === 'System Admin' && req.body.customerId && req.body.customerId !== String(req.user.id)) {
      const targetUser = await User.findByPk(req.body.customerId);
      if (targetUser) {
        customerId = String(targetUser.id);
        customerName = targetUser.full_name || targetUser.username || targetUser.email;
        customerEmail = targetUser.email;
        customerRole = targetUser.role;
      }
    }

    const ticket = await SupportTicket.create({
      ...req.body,
      customerId,
      customerName,
      customerEmail,
      customerRole,
      ticketNumber,
      id: `ticket-${timestamp}-${random}`
    });

    // Email notification to System Admins (non-blocking)
    (async () => {
      try {
        const adminIds = await getSystemAdminIds();
        const filteredIds = adminIds.filter(id => id !== req.user.id);
        if (filteredIds.length > 0) {
          const mail = inquiryReceivedEmail(
            { title: ticket.subject, subject: ticket.subject, category: ticket.category, priority: ticket.priority, description: ticket.description },
            customerName
          );
          await sendNotificationBatch(filteredIds, 'inquiry_received', mail);
        }
      } catch (e) {
        console.error('[SupportTicket notification error]', e.message);
      }
    })();

    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to create support ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Update support ticket status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    const updateData = {};
    if (req.body.status) {
      updateData.status = req.body.status;
    }

    await ticket.update(updateData);

    // Email notification on status change (non-blocking)
    if (req.body.status && ticket.customerId) {
      (async () => {
        try {
          const mail = ticketStatusChangedEmail(
            { title: ticket.subject, subject: ticket.subject },
            req.body.status
          );
          await sendNotification(parseInt(ticket.customerId), 'ticket_status_changed', mail);
        } catch (e) {
          console.error('[SupportTicket status notification error]', e.message);
        }
      })();
    }

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to update support ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Delete support ticket
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    // Only System Admin or ticket creator can delete
    if (req.user.role !== 'System Admin' && ticket.customerId !== String(req.user.id)) {
      return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
    }

    await ticket.destroy();

    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to delete support ticket', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
