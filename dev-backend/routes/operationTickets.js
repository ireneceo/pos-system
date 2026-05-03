const express = require('express');
const router = express.Router();
const { OperationTicket, User, Restaurant, RestaurantManager } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { sendNotification } = require('../utils/notificationService');
const { inquiryReceivedEmail, ticketStatusChangedEmail } = require('../utils/notificationTemplates');

// All routes require authentication
router.use(authenticateToken);

// Get operation tickets for manager or staff/admin
router.get('/', async (req, res) => {
  try {
    const { userId, userRole, restaurantId, managerId } = req.query;
    let whereClause = {};

    if (userRole === 'Foodcourt General' || userRole === 'Foodcourt Manager') {
      // Foodcourt managers see all foodcourt inquiries from their restaurants
      const restaurants = await Restaurant.findAll({
        include: [{
          model: User,
          as: 'managers',
          where: { id: userId },
          attributes: []
        }],
        attributes: ['id']
      });
      const restaurantIds = restaurants.map(r => r.id);
      whereClause = {
        restaurantId: { [Op.in]: restaurantIds },
        inquiryType: 'foodcourt'
      };
    } else if (userRole === 'Brand General' || userRole === 'Brand Manager') {
      // Brand managers see all brand inquiries from their restaurants
      const restaurants = await Restaurant.findAll({
        include: [{
          model: User,
          as: 'managers',
          where: { id: userId },
          attributes: []
        }],
        attributes: ['id']
      });
      const restaurantIds = restaurants.map(r => r.id);
      whereClause = {
        restaurantId: { [Op.in]: restaurantIds },
        inquiryType: 'brand'
      };
    } else if (userRole === 'Restaurant Owner') {
      // Restaurant Owner sees all tickets from their owned restaurants
      const ownedRestaurants = await RestaurantManager.findAll({
        where: { manager_id: userId, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const restaurantIds = ownedRestaurants.map(r => r.restaurant_id);
      if (restaurantId) {
        // If specific restaurant requested, filter to that one (if owned)
        whereClause.restaurantId = restaurantId;
      } else {
        whereClause.restaurantId = { [Op.in]: restaurantIds };
      }
    } else if (userRole === 'Restaurant Admin' || userRole === 'Staff') {
      // Restaurant Admin and Staff see their own tickets
      whereClause.requesterId = userId;
    } else {
      // Super Admin can see all operation tickets
      // No filter needed
    }

    const tickets = await OperationTicket.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching operation tickets:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch operation tickets', code: 'INTERNAL_ERROR' } });
  }
});

// Get single operation ticket
router.get('/:id', async (req, res) => {
  try {
    const ticket = await OperationTicket.findByPk(req.params.id, {
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching operation ticket:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch operation ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Create new operation ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const ticketNumber = `OPT-${Date.now()}`;

    // Get user information from JWT token
    const user = req.user;
    const { managerId, managerName, restaurantId, restaurantName, inquiryType } = req.body;

    // If frontend provides managerId/restaurantId, use them directly
    // Otherwise fallback to user's restaurant_id
    let finalRestaurantId = restaurantId || user.restaurant_id;
    let finalRestaurantName = restaurantName;
    let finalManagerId = managerId;
    let finalManagerName = managerName;

    if (!finalRestaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // If managerId not provided from frontend, look up from restaurant
    if (!finalManagerId) {
      const restaurant = await Restaurant.findByPk(finalRestaurantId, {
        include: [{ model: User, as: 'admin', attributes: ['id', 'full_name'] }]
      });

      if (!restaurant) {
        return res.status(400).json({ success: false, error: { message: 'Restaurant not found', code: 'VALIDATION_ERROR' } });
      }

      finalRestaurantName = finalRestaurantName || restaurant.name;

      if (restaurant.admin) {
        finalManagerId = restaurant.admin.id;
        finalManagerName = restaurant.admin.full_name;
      } else {
        return res.status(400).json({ success: false, error: { message: 'No admin assigned to this restaurant', code: 'VALIDATION_ERROR' } });
      }
    }

    const ticketData = {
      ...req.body,
      ticketNumber,
      managerId: finalManagerId,
      managerName: finalManagerName,
      requesterId: user.id,
      requesterName: user.full_name || user.email,
      requesterEmail: user.email,
      requesterRole: user.role,
      restaurantId: finalRestaurantId,
      restaurantName: finalRestaurantName
    };

    const ticket = await OperationTicket.create(ticketData);

    const createdTicket = await OperationTicket.findByPk(ticket.id, {
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    // Email notification to manager (non-blocking)
    (async () => {
      try {
        if (createdTicket.managerId && createdTicket.managerId !== user.id) {
          const mail = inquiryReceivedEmail(
            { title: createdTicket.title || createdTicket.subject, subject: createdTicket.subject, category: createdTicket.inquiryType || createdTicket.category, priority: createdTicket.priority, description: createdTicket.description },
            createdTicket.requesterName || user.full_name
          );
          await sendNotification(createdTicket.managerId, 'inquiry_received', mail);
        }
      } catch (e) {
        console.error('[OpTicket notification error]', e.message);
      }
    })();

    res.status(201).json(createdTicket);
  } catch (error) {
    console.error('Error creating operation ticket:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create operation ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Update operation ticket status
router.put('/:id', async (req, res) => {
  try {
    const ticket = await OperationTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    const updateData = {};
    if (req.body.status) {
      updateData.status = req.body.status;
    }

    await ticket.update(updateData);

    const updatedTicket = await OperationTicket.findByPk(ticket.id, {
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    // Email notification on status change (non-blocking)
    if (req.body.status) {
      (async () => {
        try {
          const mail = ticketStatusChangedEmail(
            { title: updatedTicket.title || updatedTicket.subject, subject: updatedTicket.subject },
            req.body.status
          );
          if (updatedTicket.requesterId) {
            await sendNotification(updatedTicket.requesterId, 'ticket_status_changed', mail);
          }
        } catch (e) {
          console.error('[OpTicket status notification error]', e.message);
        }
      })();
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating operation ticket:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update operation ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Delete operation ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await OperationTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: { message: 'Ticket not found', code: 'NOT_FOUND' } });
    }

    await ticket.destroy();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting operation ticket:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete operation ticket', code: 'INTERNAL_ERROR' } });
  }
});

// Get statistics for operation tickets
router.get('/stats/summary', async (req, res) => {
  try {
    const { managerId } = req.query;
    const whereClause = managerId ? { managerId } : {};

    const totalTickets = await OperationTicket.count({ where: whereClause });
    const openTickets = await OperationTicket.count({ where: { ...whereClause, status: 'open' } });
    const inProgressTickets = await OperationTicket.count({ where: { ...whereClause, status: 'in-progress' } });
    const resolvedTickets = await OperationTicket.count({ where: { ...whereClause, status: 'resolved' } });

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets
    });
  } catch (error) {
    console.error('Error fetching operation ticket stats:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch statistics', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;