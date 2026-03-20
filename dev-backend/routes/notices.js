const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Notice = require('../models/Notice');
const NoticeRecipient = require('../models/NoticeRecipient');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const RestaurantManager = require('../models/RestaurantManager');
const Comment = require('../models/Comment');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { sendNotification, sendNotificationBatch } = require('../utils/notificationService');
const { noticeReceivedEmail } = require('../utils/notificationTemplates');

// Helper: Get restaurants linked to a Brand General or Foodcourt General
async function getLinkedRestaurants(user) {
  if (user.role === 'Brand General') {
    const brands = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
    if (brands.length === 0) return [];
    const brandIds = brands.map(b => b.id);
    return Restaurant.findAll({ where: { brand_id: brandIds }, attributes: ['id', 'name'], order: [['name', 'ASC']] });
  }
  if (user.role === 'Foodcourt General') {
    const foodcourt = await Foodcourt.findOne({ where: { owner_id: user.id } });
    if (!foodcourt) return [];
    return Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id', 'name'] });
  }
  if (user.role === 'Restaurant Owner') {
    const links = await RestaurantManager.findAll({
      where: { manager_id: user.id, relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    const ids = links.map(l => l.restaurant_id);
    if (ids.length === 0) return [];
    return Restaurant.findAll({ where: { id: ids }, attributes: ['id', 'name'] });
  }
  return [];
}

// Helper: Get brands for Brand General
async function getBrandsForUser(user) {
  if (user.role === 'Brand General') {
    return Brand.findAll({ where: { owner_id: user.id }, attributes: ['id', 'name'] });
  }
  return [];
}

// Helper: Get foodcourts for Foodcourt General
async function getFoodcourtsForUser(user) {
  if (user.role === 'Foodcourt General') {
    return Foodcourt.findAll({ where: { owner_id: user.id }, attributes: ['id', 'name'] });
  }
  return [];
}

// GET /api/notices/metadata - Get sending options (restaurants, brands, foodcourts) for the current user
router.get('/metadata', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    let restaurants;
    if (user.role === 'System Admin') {
      restaurants = await Restaurant.findAll({ attributes: ['id', 'name'], order: [['name', 'ASC']] });
    } else {
      restaurants = await getLinkedRestaurants(user);
    }
    const brands = await getBrandsForUser(user);
    const foodcourts = await getFoodcourtsForUser(user);

    const canSend = ['System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'].includes(user.role);

    const targetOptions = [];
    if (user.role === 'System Admin') {
      targetOptions.push({ value: 'all', label: 'All Users' });
      targetOptions.push({ value: 'role', label: 'By Role' });
    }
    if (brands.length > 0) {
      targetOptions.push({ value: 'brand', label: 'By Brand' });
    }
    if (foodcourts.length > 0) {
      targetOptions.push({ value: 'foodcourt', label: 'By Foodcourt' });
    }
    if (restaurants.length > 0) {
      targetOptions.push({ value: 'select_restaurants', label: 'Select Restaurants' });
    }

    res.json({
      success: true,
      data: {
        canSend,
        targetOptions,
        restaurants,
        brands,
        foodcourts
      }
    });
  } catch (error) {
    console.error('Error fetching notice metadata:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch metadata' });
  }
});

// GET /api/notices/sent - Get notices sent by the current user
router.get('/sent', authenticateToken, async (req, res) => {
  try {
    const notices = await Notice.findAll({
      where: { author_id: req.user.id },
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: Brand, as: 'brand', attributes: ['id', 'name'] },
        { model: Foodcourt, as: 'foodcourt', attributes: ['id', 'name'] },
        {
          model: NoticeRecipient,
          as: 'recipients',
          include: [
            { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
            { model: User, as: 'user', attributes: ['id', 'full_name', 'role'] }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Attach comment count
    const noticeIds = notices.map(n => n.id);
    let commentCounts = {};
    if (noticeIds.length > 0) {
      const counts = await Comment.findAll({
        where: { entity_type: 'notice', entity_id: noticeIds.map(String) },
        attributes: ['entity_id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['entity_id']
      });
      counts.forEach(c => { commentCounts[c.entity_id] = parseInt(c.getDataValue('count')); });
    }

    const result = notices.map(n => ({
      ...n.toJSON(),
      commentCount: commentCounts[String(n.id)] || 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching sent notices:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch sent notices' });
  }
});

// GET /api/notices/received - Get notices received by the current user
router.get('/received', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    let recipientConditions = [];

    // 1) Notices where user is a direct user_id recipient
    recipientConditions.push({ user_id: user.id });

    // 2) Notices where user's restaurant is a recipient
    if (user.restaurant_id) {
      recipientConditions.push({ restaurant_id: user.restaurant_id });
    }

    // 3) For Restaurant Owner: notices to any owned restaurant
    if (user.role === 'Restaurant Owner') {
      const ownedLinks = await RestaurantManager.findAll({
        where: { manager_id: user.id, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const ownedIds = ownedLinks.map(l => l.restaurant_id);
      if (ownedIds.length > 0) {
        recipientConditions.push({ restaurant_id: { [Op.in]: ownedIds } });
      }
    }

    // 4) For Brand General: notices targeted to ALL their brands
    if (user.role === 'Brand General') {
      const brands = await Brand.findAll({ where: { owner_id: user.id } });
      for (const brand of brands) {
        const brandRestaurants = await Restaurant.findAll({ where: { brand_id: brand.id }, attributes: ['id'] });
        const brIds = brandRestaurants.map(r => r.id);
        if (brIds.length > 0) {
          recipientConditions.push({ restaurant_id: { [Op.in]: brIds } });
        }
      }
    }

    // 5) For Foodcourt General: notices targeted to ALL their foodcourts
    if (user.role === 'Foodcourt General') {
      const foodcourts = await Foodcourt.findAll({ where: { owner_id: user.id } });
      for (const foodcourt of foodcourts) {
        const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id'] });
        const fcIds = fcRestaurants.map(r => r.id);
        if (fcIds.length > 0) {
          recipientConditions.push({ restaurant_id: { [Op.in]: fcIds } });
        }
      }
    }

    // Find all notice IDs where user is a recipient
    const recipientRows = await NoticeRecipient.findAll({
      where: { [Op.or]: recipientConditions },
      attributes: ['notice_id', 'read_at'],
      group: ['notice_id', 'read_at']
    });

    const noticeIds = [...new Set(recipientRows.map(r => r.notice_id))];
    if (noticeIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Build read status map (notice_id → read_at)
    // If any recipient row for a notice has read_at, consider it read
    const readMap = {};
    recipientRows.forEach(r => {
      if (!readMap[r.notice_id] && r.read_at) {
        readMap[r.notice_id] = r.read_at;
      }
    });

    const notices = await Notice.findAll({
      where: { id: { [Op.in]: noticeIds }, status: 'published' },
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: Brand, as: 'brand', attributes: ['id', 'name'] },
        { model: Foodcourt, as: 'foodcourt', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Attach comment count
    let commentCounts = {};
    if (noticeIds.length > 0) {
      const counts = await Comment.findAll({
        where: { entity_type: 'notice', entity_id: noticeIds.map(String) },
        attributes: ['entity_id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['entity_id']
      });
      counts.forEach(c => { commentCounts[c.entity_id] = parseInt(c.getDataValue('count')); });
    }

    const result = notices.map(n => ({
      ...n.toJSON(),
      read_at: readMap[n.id] || null,
      commentCount: commentCounts[String(n.id)] || 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching received notices:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch received notices' });
  }
});

// GET /api/notices/:id - Get a single notice with details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: Brand, as: 'brand', attributes: ['id', 'name'] },
        { model: Foodcourt, as: 'foodcourt', attributes: ['id', 'name'] },
        {
          model: NoticeRecipient,
          as: 'recipients',
          include: [
            { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
            { model: User, as: 'user', attributes: ['id', 'full_name', 'role'] }
          ]
        }
      ]
    });

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    // Mark as read for current user
    const user = req.user;
    const updateConditions = [];
    if (user.restaurant_id) {
      updateConditions.push({ notice_id: notice.id, restaurant_id: user.restaurant_id, read_at: null });
    }
    updateConditions.push({ notice_id: notice.id, user_id: user.id, read_at: null });

    if (user.role === 'Restaurant Owner') {
      const ownedLinks = await RestaurantManager.findAll({
        where: { manager_id: user.id, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      ownedLinks.forEach(l => {
        updateConditions.push({ notice_id: notice.id, restaurant_id: l.restaurant_id, read_at: null });
      });
    }

    // Brand General: mark as read for ALL brand restaurant recipients
    if (user.role === 'Brand General') {
      const brands = await Brand.findAll({ where: { owner_id: user.id } });
      for (const brand of brands) {
        const brandRestaurants = await Restaurant.findAll({ where: { brand_id: brand.id }, attributes: ['id'] });
        brandRestaurants.forEach(r => {
          updateConditions.push({ notice_id: notice.id, restaurant_id: r.id, read_at: null });
        });
      }
    }

    // Foodcourt General: mark as read for ALL foodcourt restaurant recipients
    if (user.role === 'Foodcourt General') {
      const foodcourts = await Foodcourt.findAll({ where: { owner_id: user.id } });
      for (const foodcourt of foodcourts) {
        const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id'] });
        fcRestaurants.forEach(r => {
          updateConditions.push({ notice_id: notice.id, restaurant_id: r.id, read_at: null });
        });
      }
    }

    if (updateConditions.length > 0) {
      await NoticeRecipient.update(
        { read_at: new Date(), read_by: user.id },
        { where: { [Op.or]: updateConditions } }
      );
    }

    // Get comments
    const comments = await Comment.findAll({
      where: { entity_type: 'notice', entity_id: String(notice.id) },
      include: [{ model: User, as: 'author', attributes: ['id', 'full_name', 'role'] }],
      order: [['createdAt', 'ASC']]
    });

    res.json({ success: true, data: { ...notice.toJSON(), comments } });
  } catch (error) {
    console.error('Error fetching notice:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notice' });
  }
});

// POST /api/notices - Create a new notice
router.post('/', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const allowedRoles = ['System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Not authorized to create notices' });
    }

    const { title, content, target_type, target_roles, brand_id, foodcourt_id, restaurant_ids, priority, attachments, category } = req.body;

    if (!title || !content || !target_type) {
      return res.status(400).json({ success: false, message: 'title, content, and target_type are required' });
    }

    const notice = await Notice.create({
      title,
      content,
      author_id: user.id,
      author_name: user.full_name,
      author_role: user.role,
      target_type,
      target_roles: target_type === 'role' ? target_roles : null,
      brand_id: target_type === 'brand' ? brand_id : null,
      foodcourt_id: target_type === 'foodcourt' ? foodcourt_id : null,
      category: category || 'general',
      priority: priority || 'normal',
      status: 'published',
      attachments: attachments || null
    });

    // Create recipients based on target_type
    const recipients = [];

    if (target_type === 'all' && user.role === 'System Admin') {
      // All restaurants
      const allRestaurants = await Restaurant.findAll({ attributes: ['id'] });
      allRestaurants.forEach(r => {
        recipients.push({ notice_id: notice.id, restaurant_id: r.id });
      });
      // All System Admins (so they can track read status)
      const systemAdmins = await User.findAll({ where: { role: 'System Admin' }, attributes: ['id'] });
      systemAdmins.forEach(u => {
        recipients.push({ notice_id: notice.id, user_id: u.id });
      });
      // All Brand Generals
      const brandGenerals = await User.findAll({ where: { role: 'Brand General' }, attributes: ['id'] });
      brandGenerals.forEach(u => {
        recipients.push({ notice_id: notice.id, user_id: u.id });
      });
      // All Foodcourt Generals
      const fcGenerals = await User.findAll({ where: { role: 'Foodcourt General' }, attributes: ['id'] });
      fcGenerals.forEach(u => {
        recipients.push({ notice_id: notice.id, user_id: u.id });
      });
      // All Restaurant Owners
      const owners = await User.findAll({ where: { role: 'Restaurant Owner' }, attributes: ['id'] });
      owners.forEach(u => {
        recipients.push({ notice_id: notice.id, user_id: u.id });
      });
    } else if (target_type === 'role' && user.role === 'System Admin') {
      // By role selection
      if (target_roles && Array.isArray(target_roles)) {
        for (const role of target_roles) {
          if (['Brand General', 'Foodcourt General', 'Restaurant Owner'].includes(role)) {
            const users = await User.findAll({ where: { role }, attributes: ['id'] });
            users.forEach(u => {
              recipients.push({ notice_id: notice.id, user_id: u.id });
            });
          }
          if (['Restaurant Admin', 'Staff'].includes(role)) {
            const users = await User.findAll({ where: { role, restaurant_id: { [Op.ne]: null } }, attributes: ['id', 'restaurant_id'] });
            users.forEach(u => {
              recipients.push({ notice_id: notice.id, restaurant_id: u.restaurant_id });
            });
          }
        }
      }
    } else if (target_type === 'brand') {
      // All restaurants in a brand
      const brandRestaurants = await Restaurant.findAll({ where: { brand_id }, attributes: ['id'] });
      brandRestaurants.forEach(r => {
        recipients.push({ notice_id: notice.id, restaurant_id: r.id });
      });
    } else if (target_type === 'foodcourt') {
      // All restaurants in a foodcourt
      const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id }, attributes: ['id'] });
      fcRestaurants.forEach(r => {
        recipients.push({ notice_id: notice.id, restaurant_id: r.id });
      });
    } else if (target_type === 'restaurant' || target_type === 'select_restaurants' || target_type === 'individual') {
      // Individual restaurant selection
      if (restaurant_ids && Array.isArray(restaurant_ids)) {
        restaurant_ids.forEach(rId => {
          recipients.push({ notice_id: notice.id, restaurant_id: rId });
        });
      }
    }

    // Bulk create recipients (deduplicate)
    const uniqueRecipients = [];
    const seen = new Set();
    for (const r of recipients) {
      const key = `${r.restaurant_id || ''}-${r.user_id || ''}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueRecipients.push(r);
      }
    }

    if (uniqueRecipients.length > 0) {
      await NoticeRecipient.bulkCreate(uniqueRecipients);
    }

    // Return full notice
    const fullNotice = await Notice.findByPk(notice.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        {
          model: NoticeRecipient,
          as: 'recipients',
          include: [
            { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
            { model: User, as: 'user', attributes: ['id', 'full_name', 'role'] }
          ]
        }
      ]
    });

    // Email notification to recipients (non-blocking)
    (async () => {
      try {
        const mail = noticeReceivedEmail(fullNotice, fullNotice.author?.full_name || user.full_name);
        const recipientUserIds = new Set();

        for (const r of (fullNotice.recipients || [])) {
          if (r.user_id && r.user_id !== user.id) {
            recipientUserIds.add(r.user_id);
          }
          if (r.restaurant_id && r.restaurant?.id) {
            // Notify restaurant admin
            const rest = await Restaurant.findByPk(r.restaurant_id, { attributes: ['admin_id'] });
            if (rest?.admin_id && rest.admin_id !== user.id) {
              recipientUserIds.add(rest.admin_id);
            }
          }
        }

        if (recipientUserIds.size > 0) {
          await sendNotificationBatch([...recipientUserIds], 'notice_received', mail);
        }
      } catch (e) {
        console.error('[Notice notification error]', e.message);
      }
    })();

    res.status(201).json({ success: true, data: fullNotice });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ success: false, message: 'Failed to create notice' });
  }
});

// DELETE /api/notices/:id - Delete a notice (author only)
// Update notice (author only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    if (notice.author_id !== req.user.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this notice' });
    }

    const { title, content, priority } = req.body;
    if (title !== undefined) notice.title = title;
    if (content !== undefined) notice.content = content;
    if (priority !== undefined) notice.priority = priority;
    await notice.save();

    res.json({ success: true, data: notice });
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ success: false, message: 'Failed to update notice' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    if (notice.author_id !== req.user.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this notice' });
    }

    // Delete recipients, comments, then notice
    await NoticeRecipient.destroy({ where: { notice_id: notice.id } });
    await Comment.destroy({ where: { entity_type: 'notice', entity_id: String(notice.id) } });
    await notice.destroy();

    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ success: false, message: 'Failed to delete notice' });
  }
});

module.exports = router;
