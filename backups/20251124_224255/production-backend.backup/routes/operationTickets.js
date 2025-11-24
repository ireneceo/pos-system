const express = require('express');
const router = express.Router();
const { OperationTicket, User, Restaurant } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

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
    res.status(500).json({ error: 'Failed to fetch operation tickets' });
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
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching operation ticket:', error);
    res.status(500).json({ error: 'Failed to fetch operation ticket' });
  }
});

// Create new operation ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const ticketNumber = `OPT-${Date.now()}`;

    // Get user information from JWT token
    const user = req.user;

    if (!user || !user.restaurant_id) {
      return res.status(400).json({ error: 'User not assigned to any restaurant' });
    }

    // Get manager information for the restaurant
    const restaurant = await Restaurant.findByPk(user.restaurant_id, {
      include: [{ model: User, as: 'manager', attributes: ['id', 'full_name'] }]
    });

    if (!restaurant || !restaurant.manager) {
      return res.status(400).json({ error: 'No manager assigned to this restaurant' });
    }

    const ticketData = {
      ...req.body,
      ticketNumber,
      managerId: restaurant.manager.id,
      managerName: restaurant.manager.full_name,
      requesterId: user.id,
      requesterName: user.full_name || user.email,
      requesterEmail: user.email,
      requesterRole: user.role,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    };

    const ticket = await OperationTicket.create(ticketData);

    const createdTicket = await OperationTicket.findByPk(ticket.id, {
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json(createdTicket);
  } catch (error) {
    console.error('Error creating operation ticket:', error);
    res.status(500).json({ error: 'Failed to create operation ticket' });
  }
});

// Update operation ticket (Manager response or internal notes)
router.put('/:id', async (req, res) => {
  try {
    const ticket = await OperationTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Calculate response/resolution times if status changes
    const updateData = { ...req.body };

    if (req.body.status === 'resolved' && ticket.status !== 'resolved') {
      updateData.resolvedAt = new Date();
      updateData.resolutionTime = Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60));
    }

    if (req.body.response && !ticket.response) {
      updateData.responseTime = Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60));
    }

    await ticket.update(updateData);

    const updatedTicket = await OperationTicket.findByPk(ticket.id, {
      include: [
        { model: User, as: 'manager', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'requester', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating operation ticket:', error);
    res.status(500).json({ error: 'Failed to update operation ticket' });
  }
});

// Delete operation ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await OperationTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    await ticket.destroy();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting operation ticket:', error);
    res.status(500).json({ error: 'Failed to delete operation ticket' });
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

    const avgResponseTime = await OperationTicket.findOne({
      where: { ...whereClause, responseTime: { [Op.gt]: 0 } },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('responseTime')), 'avgResponseTime']
      ]
    });

    const avgResolutionTime = await OperationTicket.findOne({
      where: { ...whereClause, resolutionTime: { [Op.gt]: 0 } },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('resolutionTime')), 'avgResolutionTime']
      ]
    });

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      avgResponseTime: avgResponseTime?.dataValues?.avgResponseTime || 0,
      avgResolutionTime: avgResolutionTime?.dataValues?.avgResolutionTime || 0
    });
  } catch (error) {
    console.error('Error fetching operation ticket stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;