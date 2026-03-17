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
  RestaurantManager,
  Brand,
  Foodcourt
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
      pendingOrders: 0,
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
    }
    // Restaurant Admin/Staff: badge only for unread replies (calculated below in unreadComments)

    // --- Operation Inquiry ---
    if (role === 'Restaurant Admin' || role === 'Staff') {
      // Restaurant users: badge only for unread replies (calculated below in unreadComments)
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
      if (restaurantId) {
        counts.notices = await NoticeRecipient.count({
          where: { restaurant_id: restaurantId, read_at: null }
        });
      }
    } else if (role === 'Brand General' || role === 'Brand Manager') {
      // Count unread notices for brand restaurants + direct user recipients
      const noticeConditions = [{ user_id: userId, read_at: null }];
      const brand = await Brand.findOne({ where: { owner_id: userId } });
      if (brand) {
        const brandRestaurants = await Restaurant.findAll({ where: { brand_id: brand.id }, attributes: ['id'] });
        const brIds = brandRestaurants.map(r => r.id);
        if (brIds.length > 0) {
          noticeConditions.push({ restaurant_id: { [Op.in]: brIds }, read_at: null });
        }
      }
      // Count unique notice_ids with unread recipients
      const unreadRecipients = await NoticeRecipient.findAll({
        where: { [Op.or]: noticeConditions },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('notice_id')), 'notice_id']]
      });
      counts.notices = unreadRecipients.length;
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      const noticeConditions = [{ user_id: userId, read_at: null }];
      const foodcourt = await Foodcourt.findOne({ where: { owner_id: userId } });
      if (foodcourt) {
        const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id'] });
        const fcIds = fcRestaurants.map(r => r.id);
        if (fcIds.length > 0) {
          noticeConditions.push({ restaurant_id: { [Op.in]: fcIds }, read_at: null });
        }
      }
      const unreadRecipients = await NoticeRecipient.findAll({
        where: { [Op.or]: noticeConditions },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('notice_id')), 'notice_id']]
      });
      counts.notices = unreadRecipients.length;
    } else if (role === 'Restaurant Owner') {
      const noticeConditions = [{ user_id: userId, read_at: null }];
      const owned = await RestaurantManager.findAll({
        where: { manager_id: userId, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const ownedIds = owned.map(r => r.restaurant_id);
      if (ownedIds.length > 0) {
        noticeConditions.push({ restaurant_id: { [Op.in]: ownedIds }, read_at: null });
      }
      const unreadRecipients = await NoticeRecipient.findAll({
        where: { [Op.or]: noticeConditions },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('notice_id')), 'notice_id']]
      });
      counts.notices = unreadRecipients.length;
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

    // --- Pending Orders (Restaurant Admin / Staff only) ---
    if ((role === 'Restaurant Admin' || role === 'Staff') && restaurantId) {
      const today = new Date().toISOString().split('T')[0];
      counts.pendingOrders = await Order.count({
        where: {
          restaurant_id: restaurantId,
          status: { [Op.in]: ['pending', 'awaiting_payment'] },
          order_date: { [Op.gte]: today }
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

    // System Inquiry (SupportTicket): unread comments on my tickets
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
