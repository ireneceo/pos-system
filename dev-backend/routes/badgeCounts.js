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
  Foodcourt,
  PurchaseOrder
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
      livePoCount: 0,  // Sprint 6: Live Orders (incoming PO submissions)
      brandMenuPending: 0,  // v3.32: Brand Menu sync updates awaiting restaurant action
      unreadComments: {
        notices: 0,
        systemInquiry: 0,
        operationInquiry: 0
      }
    };

    // --- Brand Menu pending updates ---
    // Restaurant-side count of Products with link_status='pending_update', plus
    // brand menus that have no local product yet (first-time push).
    if (restaurantId && (role === 'Restaurant Admin' || role === 'Staff' || role === 'Restaurant Owner')) {
      try {
        const Product = require('../models/Product');
        const BrandMenu = require('../models/BrandMenu');
        const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'] });
        if (restaurant?.brand_id) {
          const pending = await Product.count({
            where: { restaurant_id: restaurantId, brand_menu_link_status: 'pending_update' }
          });
          // Count brand menus with no local product (new menus)
          const allBrandMenus = await BrandMenu.findAll({
            where: { brand_id: restaurant.brand_id, is_active: true },
            attributes: ['id']
          });
          const linked = await Product.findAll({
            where: { restaurant_id: restaurantId, brand_menu_id: { [Op.in]: allBrandMenus.map(m => m.id) } },
            attributes: ['brand_menu_id']
          });
          const linkedIds = new Set(linked.map(p => p.brand_menu_id));
          const newOnes = allBrandMenus.filter(m => !linkedIds.has(m.id)).length;
          counts.brandMenuPending = pending + newOnes;
        }
      } catch (e) { /* silent — non-critical */ }
    }

    // --- System Inquiry ---
    // 배지: open 상태 티켓만 카운트 (in-progress는 이미 처리 중이므로 제외)
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
          status: { [Op.in]: ['open', 'in-progress'] }
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
          status: { [Op.in]: ['open', 'in-progress'] }
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
          status: { [Op.in]: ['open', 'in-progress'] }
        }
      });
      // 발주 오너 승인 대기 (2026-06-21)
      counts.poApprovals = rIds.length ? await PurchaseOrder.count({
        where: { entity_type: 'restaurant', entity_id: { [Op.in]: rIds }, status: 'pending_approval' }
      }) : 0;
    }

    // --- Notices (exclude self-authored notices from badge count) ---
    const countUnreadNotices = async (recipientConditions) => {
      // Get candidate notice_ids from unread recipients
      const unreadRows = await NoticeRecipient.findAll({
        where: { [Op.or]: recipientConditions },
        attributes: ['notice_id'],
        group: ['notice_id'],
        raw: true
      });
      if (unreadRows.length === 0) return 0;
      const noticeIds = unreadRows.map(r => r.notice_id);
      // Exclude self-authored
      const validNotices = await Notice.count({
        where: { id: { [Op.in]: noticeIds }, author_id: { [Op.ne]: userId }, status: 'published' }
      });
      return validNotices;
    };

    if (role === 'System Admin') {
      counts.notices = await countUnreadNotices([{ user_id: userId, read_at: null }]);
    } else if (role === 'Restaurant Admin' || role === 'Staff') {
      if (restaurantId) {
        counts.notices = await countUnreadNotices([{ restaurant_id: restaurantId, read_at: null }]);
      }
    } else if (role === 'Brand General' || role === 'Brand Manager') {
      const noticeConditions = [{ user_id: userId, read_at: null }];
      const brands = await Brand.findAll({ where: { owner_id: userId } });
      for (const brand of brands) {
        const brandRestaurants = await Restaurant.findAll({ where: { brand_id: brand.id }, attributes: ['id'] });
        const brIds = brandRestaurants.map(r => r.id);
        if (brIds.length > 0) {
          noticeConditions.push({ restaurant_id: { [Op.in]: brIds }, read_at: null });
        }
      }
      counts.notices = await countUnreadNotices(noticeConditions);
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      const noticeConditions = [{ user_id: userId, read_at: null }];
      const foodcourts = await Foodcourt.findAll({ where: { owner_id: userId } });
      for (const foodcourt of foodcourts) {
        const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id'] });
        const fcIds = fcRestaurants.map(r => r.id);
        if (fcIds.length > 0) {
          noticeConditions.push({ restaurant_id: { [Op.in]: fcIds }, read_at: null });
        }
      }
      counts.notices = await countUnreadNotices(noticeConditions);
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
      counts.notices = await countUnreadNotices(noticeConditions);
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

    // --- Live Orders (Sprint 6): incoming PO submissions for sellers ---
    try {
      const { PurchaseOrder, SupplierCompany } = require('../models');
      let sellerWhere = null;
      if (role === 'Supplier Admin') {
        const company = await SupplierCompany.findOne({ where: { owner_id: userId }, attributes: ['id'] });
        if (company) sellerWhere = { seller_type: 'supplier', seller_entity_id: company.id };
      } else if (role === 'Brand General' || role === 'Brand Manager') {
        const brandId = user.brand_id || user.brandId;
        if (brandId) sellerWhere = { seller_type: 'brand', seller_entity_id: parseInt(brandId, 10) };
      } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
        const foodcourtId = user.foodcourt_id || user.foodcourtId;
        if (foodcourtId) sellerWhere = { seller_type: 'foodcourt', seller_entity_id: parseInt(foodcourtId, 10) };
      } else if (role === 'System Admin') {
        // SA can see all submitted POs
        sellerWhere = {};
      }
      if (sellerWhere !== null) {
        counts.livePoCount = await PurchaseOrder.count({
          where: { ...sellerWhere, status: 'submitted' }
        });
      }
    } catch (e) {
      console.error('[badge-counts] livePoCount error:', e.message);
    }

    res.json({ success: true, data: counts });
  } catch (error) {
    console.error('Error fetching badge counts:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch badge counts', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
