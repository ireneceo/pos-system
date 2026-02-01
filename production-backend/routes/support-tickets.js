/**
 * What and Why: Support Ticket 라우터
 * - 고객 지원 티켓 CRUD 및 상태 관리
 * - 응답 형식: { success: true/false, data/error: ... }
 */

const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { Op } = require('sequelize');

// Get all support tickets
router.get('/', async (req, res) => {
  try {
    const { status, priority, category, search } = req.query;

    const where = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;

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
    // What and Why: timestamp + random으로 유니크 티켓 번호 생성
    // - 동시 요청 시 충돌 방지
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

// Update support ticket (full update)
router.put('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    // What and Why: 상태 변경 시 응답/해결 시간 자동 계산
    // - open에서 다른 상태로 변경 시 responseTime 기록
    if (ticket.status === 'open' && req.body.status && req.body.status !== 'open') {
      const createdTime = new Date(ticket.createdAt).getTime();
      const currentTime = Date.now();
      const responseTimeMinutes = Math.floor((currentTime - createdTime) / 60000);
      req.body.responseTime = responseTimeMinutes;
    }

    // What and Why: resolved/closed로 변경 시 resolutionTime 기록
    if ((req.body.status === 'resolved' || req.body.status === 'closed') &&
        (ticket.status !== 'resolved' && ticket.status !== 'closed')) {
      const createdTime = new Date(ticket.createdAt).getTime();
      const currentTime = Date.now();
      const resolutionTimeMinutes = Math.floor((currentTime - createdTime) / 60000);
      req.body.resolutionTime = resolutionTimeMinutes;
      req.body.resolvedAt = new Date();
    }

    await ticket.update(req.body);

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update support ticket' });
  }
});

// Patch support ticket (partial update)
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    // What and Why: 상태 변경 시 응답/해결 시간 자동 계산
    if (ticket.status === 'open' && req.body.status && req.body.status !== 'open') {
      const createdTime = new Date(ticket.createdAt).getTime();
      const currentTime = Date.now();
      const responseTimeMinutes = Math.floor((currentTime - createdTime) / 60000);
      req.body.responseTime = responseTimeMinutes;
    }

    if ((req.body.status === 'resolved' || req.body.status === 'closed') &&
        (ticket.status !== 'resolved' && ticket.status !== 'closed')) {
      const createdTime = new Date(ticket.createdAt).getTime();
      const currentTime = Date.now();
      const resolutionTimeMinutes = Math.floor((currentTime - createdTime) / 60000);
      req.body.resolutionTime = resolutionTimeMinutes;
      req.body.resolvedAt = new Date();
    }

    await ticket.update(req.body);

    res.json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to patch support ticket' });
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

// Initialize with sample data
router.post('/initialize', async (req, res) => {
  try {
    const count = await SupportTicket.count();

    if (count > 0) {
      return res.json({ success: true, message: 'Support tickets already exist' });
    }

    const sampleTickets = [
      {
        id: 'ticket-001',
        ticketNumber: 'SUPP-2025-001',
        customerId: 'mgr-001',
        customerName: 'Ahmad Rahman',
        customerEmail: 'ahmad@sunwayfoodcourt.com',
        customerRole: 'manager',
        restaurantId: 7,
        restaurantName: '맛있는 음식점',
        subject: 'POS Terminal not syncing with kitchen display',
        description: 'Our POS terminal has stopped syncing orders with the kitchen display system. Orders are being placed but kitchen staff cannot see them. This is affecting our service speed significantly.',
        status: 'in-progress',
        priority: 'high',
        category: 'technical',
        assignedTo: 'Technical Support Team',
        responseTime: 45
      },
      {
        id: 'ticket-002',
        ticketNumber: 'SUPP-2025-002',
        customerId: 'mgr-002',
        customerName: 'Sarah Lim',
        customerEmail: 'sarah@ioimallfood.com',
        customerRole: 'manager',
        restaurantId: 8,
        restaurantName: '행복한 카페',
        subject: 'Invoice billing issue - charged incorrectly',
        description: 'We were charged for the Enterprise plan but we are on Professional. Please review our billing and issue a refund for the difference.',
        status: 'open',
        priority: 'medium',
        category: 'billing',
        responseTime: 0
      },
      {
        id: 'ticket-003',
        ticketNumber: 'SUPP-2025-003',
        customerId: 'mgr-003',
        customerName: 'David Tan',
        customerEmail: 'david@pavilionfoodhub.com',
        customerRole: 'manager',
        restaurantId: 9,
        restaurantName: '즐거운 레스토랑',
        subject: 'Feature Request: Custom receipt templates',
        description: 'We would like to request a feature to customize receipt templates with our restaurant branding and additional fields for promotional messages.',
        status: 'open',
        priority: 'low',
        category: 'feature-request',
        responseTime: 0
      },
      {
        id: 'ticket-004',
        ticketNumber: 'SUPP-2025-004',
        customerId: 'mgr-004',
        customerName: 'Lisa Wong',
        customerEmail: 'lisa@midvalleydining.com',
        customerRole: 'manager',
        subject: 'Mobile app crashes when processing large orders',
        description: 'The mobile ordering app crashes consistently when customers try to place orders with more than 10 items. This is affecting our high-volume customers.',
        status: 'resolved',
        priority: 'urgent',
        category: 'bug-report',
        assignedTo: 'Development Team',
        responseTime: 30,
        resolutionTime: 1850,
        resolvedAt: new Date('2025-01-19 15:20:00')
      },
      {
        id: 'ticket-005',
        ticketNumber: 'SUPP-2025-005',
        customerId: 'mgr-005',
        customerName: 'John Doe',
        customerEmail: 'john@singlerestaurant.com',
        customerRole: 'manager',
        subject: 'General inquiry about upgrading plan',
        description: 'We are considering upgrading from Basic to Professional plan. Can you provide more details about the differences and migration process?',
        status: 'closed',
        priority: 'low',
        category: 'general',
        assignedTo: 'Sales Team',
        responseTime: 120,
        resolutionTime: 1215,
        resolvedAt: new Date('2025-01-18 10:30:00')
      },
      {
        id: 'ticket-006',
        ticketNumber: 'SUPP-2025-006',
        customerId: 'mgr-006',
        customerName: 'Manager User',
        customerEmail: 'manager@company.com',
        customerRole: 'manager',
        subject: 'System performance issues across multiple restaurants',
        description: 'We are experiencing slow response times across multiple restaurant locations during peak hours. This is affecting customer service and order processing efficiency.',
        status: 'open',
        priority: 'medium',
        category: 'general',
        responseTime: 0
      }
    ];

    await SupportTicket.bulkCreate(sampleTickets);

    res.json({ success: true, message: 'Sample support tickets created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to initialize support tickets' });
  }
});

module.exports = router;
