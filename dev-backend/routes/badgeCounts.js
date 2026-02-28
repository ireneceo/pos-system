const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const {
  SupportTicket,
  OperationTicket,
  NoticeRecipient,
  Notice,
  Invoice,
  Order,
  Restaurant,
  RestaurantManager
} = require('../models');

// Helper: count unread comments on entities authored by this user
async function countUnreadComments(userId, entityType, entityIds) {
  if (!entityIds || entityIds.length === 0) return 0;

  const [results] = await sequelize.query(`
    SELECT COUNT(*) as cnt FROM comments c
    LEFT JOIN comment_reads cr
      ON cr.user_id = :userId
      AND cr.entity_type = c.entity_type
      AND cr.entity_id = c.entity_id
    WHERE c.entity_type = :entityType
      AND c.entity_id IN (:entityIds)
      AND c.author_id != :userId
      AND c.createdAt > COALESCE(cr.last_read_at, '1970-01-01')
  `, {
    replacements: { userId, entityType, entityIds: entityIds.map(String) }
  });

  return results[0]?.cnt || 0;
}

router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const role = user.role;
    const restaurantId = user.restaurant_id;

    const counts = {
      systemInquiry: 0,
      operationInquiry: 0,
      notices: 0,
      invoices: 0,
      unreadComments: {
        notices: 0,
        systemInquiry: 0,
        operationInquiry: 0
      }
    };

    // --- System Inquiry ---
    if (role === 'System Admin') {
      counts.systemInquiry = await SupportTicket.count({
        where: { status: 'open' }
      });
    } else {
      counts.systemInquiry = await SupportTicket.count({
        where: {
          customerId: userId.toString(),
          status: { [Op.in]: ['open', 'in-progress'] }
        }
      });
    }

    // --- Operation Inquiry ---
    if (role === 'Restaurant Admin' || role === 'Staff') {
      // Creator: tickets with response they haven't seen
      counts.operationInquiry = await OperationTicket.count({
        where: {
          requesterId: userId,
          status: { [Op.in]: ['open', 'in-progress'] }
        }
      });
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      const restaurants = await Restaurant.findAll({
        include: [{ model: require('../models/User'), as: 'managers', where: { id: userId }, attributes: [] }],
        attributes: ['id']
      });
      const rIds = restaurants.map(r => r.id);
      counts.operationInquiry = await OperationTicket.count({
        where: {
          restaurantId: { [Op.in]: rIds },
          inquiryType: 'foodcourt',
          status: 'open'
        }
      });
    } else if (role === 'Brand General' || role === 'Brand Manager') {
      const restaurants = await Restaurant.findAll({
        include: [{ model: require('../models/User'), as: 'managers', where: { id: userId }, attributes: [] }],
        attributes: ['id']
      });
      const rIds = restaurants.map(r => r.id);
      counts.operationInquiry = await OperationTicket.count({
        where: {
          restaurantId: { [Op.in]: rIds },
          inquiryType: 'brand',
          status: 'open'
        }
      });
    } else if (role === 'Restaurant Owner') {
      const owned = await RestaurantManager.findAll({
        where: { manager_id: userId, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const rIds = owned.map(r => r.restaurant_id);
      counts.operationInquiry = await OperationTicket.count({
        where: {
          restaurantId: { [Op.in]: rIds },
          inquiryType: 'owner',
          status: 'open'
        }
      });
    }

    // --- Notices ---
    if (role === 'Restaurant Admin' || role === 'Staff') {
      // Count unread notices for this restaurant
      if (restaurantId) {
        counts.notices = await NoticeRecipient.count({
          where: { restaurant_id: restaurantId, read_at: null }
        });
      }
    } else if (role === 'Brand General' || role === 'Brand Manager' ||
               role === 'Foodcourt General' || role === 'Foodcourt Manager' ||
               role === 'Restaurant Owner') {
      // Count unread notices addressed directly to this user
      counts.notices = await NoticeRecipient.count({
        where: { user_id: userId, read_at: null }
      });
    }

    // --- Invoices ---
    if (role === 'Restaurant Admin' || role === 'Staff') {
      if (restaurantId) {
        counts.invoices = await Invoice.count({
          where: {
            restaurant_id: restaurantId,
            status: { [Op.in]: ['pending_payment', 'overdue'] }
          }
        });
      }
    } else if (role === 'Restaurant Owner') {
      const owned = await RestaurantManager.findAll({
        where: { manager_id: userId, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const rIds = owned.map(r => r.restaurant_id);
      counts.invoices = await Invoice.count({
        where: {
          restaurant_id: { [Op.in]: rIds },
          status: { [Op.in]: ['pending_payment', 'overdue'] }
        }
      });
    }

    // --- Unread Comments on MY posts ---
    // Notices: authored by me
    const myNotices = await Notice.findAll({
      where: { author_id: userId },
      attributes: ['id']
    });
    if (myNotices.length > 0) {
      counts.unreadComments.notices = await countUnreadComments(
        userId, 'notice', myNotices.map(n => n.id)
      );
    }

    // System Inquiry (SupportTicket): customerId stores userId as string
    const myTickets = await SupportTicket.findAll({
      where: { customerId: userId.toString() },
      attributes: ['id']
    });
    if (myTickets.length > 0) {
      counts.unreadComments.systemInquiry = await countUnreadComments(
        userId, 'support_ticket', myTickets.map(t => t.id)
      );
    }

    // Operation Inquiry (OperationTicket): requesterId is integer
    const myOpTickets = await OperationTicket.findAll({
      where: { requesterId: userId },
      attributes: ['id']
    });
    if (myOpTickets.length > 0) {
      counts.unreadComments.operationInquiry = await countUnreadComments(
        userId, 'operation_ticket', myOpTickets.map(t => t.id)
      );
    }

    res.json({ success: true, data: counts });
  } catch (error) {
    console.error('Error fetching badge counts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch badge counts' });
  }
});

module.exports = router;
