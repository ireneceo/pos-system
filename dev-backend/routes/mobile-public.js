// 모바일 공개 조회 라우트 (인증 불필요)
// 마운트: /api/mobile

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const { Op } = require('sequelize');
const { parseImageData, getProductEmoji, TableQRSession } = require('./mobile-helpers');

router.get('/verify-qr', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.json({ success: true, data: { valid: true, mode: 'static' } });
    }

    const session = await TableQRSession.findOne({
      where: { token },
      include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] }]
    });

    if (!session) {
      return res.json({ success: true, data: { valid: false, reason: 'invalid_token' } });
    }

    // Check time expiration
    if (new Date() > new Date(session.expires_at)) {
      if (session.status === 'active') {
        await session.update({ status: 'expired', expired_by: 'time' });
      }
      return res.json({ success: true, data: { valid: false, reason: 'expired', table_number: session.table_number } });
    }

    if (session.status === 'expired') {
      return res.json({ success: true, data: { valid: false, reason: 'expired', expired_by: session.expired_by, table_number: session.table_number } });
    }

    const remainingMs = new Date(session.expires_at).getTime() - Date.now();
    const remainingMinutes = Math.floor(remainingMs / 60000);

    res.json({
      success: true,
      data: {
        valid: true,
        mode: 'session',
        table_number: session.table_number,
        restaurant_id: session.restaurant_id,
        remaining_minutes: remainingMinutes,
        expires_at: session.expires_at
      }
    });
  } catch (error) {
    console.error('Verify QR token error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify QR token' });
  }
});

// Store & Menu endpoints
router.get('/store/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Find restaurant by slug
    const restaurant = await Restaurant.findOne({
      where: { slug: slug }
    });

    if (!restaurant) {
      return res.status(404).json({ success: false, error: 'Restaurant not found' });
    }

    // Get operation settings with defaults
    const operationSettings = restaurant.operation_settings || {};

    const store = {
      id: restaurant.id.toString(),
      slug: restaurant.slug,
      name: restaurant.name,
      description: restaurant.trade_name || restaurant.name,
      logo: restaurant.logo_url || '/images/store-logo.png',
      isOpen: restaurant.status === 'active',
      address: restaurant.address,
      phone: restaurant.phone,
      openingTime: operationSettings.openingTime || '09:00',
      closingTime: operationSettings.closingTime || '22:00',
      timeZone: operationSettings.timeZone || 'Asia/Kuala_Lumpur',
      // Order type settings
      orderTypes: operationSettings.orderTypes || {
        dineIn: true,
        takeaway: true,
        pickup: false,
        delivery: false
      },
      // Break times
      breakTimes: operationSettings.breakTimes || [],
      // Takeaway pricing for charge calculation
      takeawayPricing: operationSettings.takeawayPricing || {
        enabled: false,
        pricingType: 'per-item',
        perItemCharge: 0.50
      },
      openingHours: operationSettings.hours || {
        monday: '10:00 - 22:00',
        tuesday: '10:00 - 22:00',
        wednesday: '10:00 - 22:00',
        thursday: '10:00 - 22:00',
        friday: '10:00 - 23:00',
        saturday: '10:00 - 23:00',
        sunday: '10:00 - 22:00'
      }
    };

    res.json({ success: true, data: store });
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/menu/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 20, categoryId } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Find restaurant by slug
    const restaurant = await Restaurant.findOne({
      where: { slug: slug }
    });

    if (!restaurant) {
      return res.status(404).json({ success: false, error: 'Restaurant not found' });
    }

    const restaurantId = restaurant.id;

    // Get categories for this restaurant
    const dbCategories = await Category.findAll({
      where: { restaurant_id: restaurantId, isActive: true },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Filter categories by time schedule (mobile_settings.category_schedules)
    const mobileCfg = restaurant.mobile_settings || {};
    const schedules = mobileCfg.category_schedules || [];
    const hiddenCategoryIds = new Set();
    if (schedules.length > 0) {
      const now = new Date();
      const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
      const localTime = now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false });
      for (const sched of schedules) {
        const catId = sched.category_id?.toString();
        if (!catId || !sched.start_time || !sched.end_time) continue;
        const { start_time, end_time } = sched;
        let isInRange;
        if (start_time <= end_time) {
          isInRange = localTime >= start_time && localTime < end_time;
        } else {
          isInRange = localTime >= start_time || localTime < end_time;
        }
        if (!isInRange) hiddenCategoryIds.add(catId);
      }
    }

    const visibleCategories = dbCategories.filter(cat => !hiddenCategoryIds.has(cat.id.toString()));

    // Build product query with pagination
    const productWhere = {
      restaurant_id: restaurantId,
      soldOut: false
    };

    // Filter by category if specified
    if (categoryId) {
      productWhere.category = categoryId;
    }

    // Exclude hidden categories from product results
    if (hiddenCategoryIds.size > 0 && !categoryId) {
      productWhere.category = { [Op.notIn]: Array.from(hiddenCategoryIds) };
    }

    // Get total count for pagination
    const totalCount = await Product.count({ where: productWhere });

    // Get products with pagination
    const products = await Product.findAll({
      where: productWhere,
      limit: parseInt(limit),
      offset: offset,
      order: [['id', 'ASC']]
    });

    // Get option groups for this restaurant
    const optionGroups = await OptionGroup.findAll({
      where: { restaurant_id: restaurantId, isActive: true },
      include: [{
        model: Option,
        as: 'options',
        attributes: ['id', 'name', 'price', 'isActive', 'displayOrder']
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    // Create categories array for mobile app
    const categories = visibleCategories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: cat.emoji || getProductEmoji(cat.name)  // Use DB emoji first, fallback to generated
    }));

    // Create category map for quick lookup (use all categories for item mapping)
    const categoryMap = {};
    dbCategories.forEach(cat => {
      categoryMap[cat.id] = cat.name;
    });

    // Format items for mobile app
    const items = products.map(product => {
      // Parse optionGroups if it's a string (handle double-encoded JSON)
      let productOptionGroupIds = [];
      if (product.optionGroups) {
        try {
          let parsed = typeof product.optionGroups === 'string'
            ? JSON.parse(product.optionGroups)
            : product.optionGroups;
          // Handle double-encoded JSON string
          if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
          }
          productOptionGroupIds = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error('Failed to parse optionGroups for product', product.id, e);
          productOptionGroupIds = [];
        }
      }

      // Find option groups for this product - 메뉴에서 설정한 순서대로 정렬
      const productOptionGroups = productOptionGroupIds
        .map(groupId => {
          const og = optionGroups.find(g => g.id === groupId || g.id.toString() === groupId.toString());
          if (!og) return null;
          return {
            id: og.id.toString(),
            name: og.name,
            required: og.required,
            multiple: og.multiple,
            options: (og.options || [])
              .filter(opt => opt.isActive)
              .map(opt => ({
                id: opt.id.toString(),
                name: opt.name,
                price: parseFloat(opt.price || 0)
              }))
          };
        })
        .filter(og => og !== null);

      // Find matching category by ID or name
      let categoryId = null;
      let categoryName = '';

      // Try to match by ID first (if category is a number)
      const categoryById = dbCategories.find(cat => cat.id.toString() === product.category);
      if (categoryById) {
        categoryId = categoryById.id.toString();
        categoryName = categoryById.name;
      } else {
        // Try to match by name (if category is a string)
        const categoryByName = dbCategories.find(cat =>
          cat.name.toLowerCase().replace(/\s+/g, '_') === product.category ||
          cat.name === product.category
        );
        if (categoryByName) {
          categoryId = categoryByName.id.toString();
          categoryName = categoryByName.name;
        } else {
          // Fallback: use the category value as-is
          categoryId = product.category || '';
          categoryName = '';
        }
      }

      // Parse image — list view: thumbnail URL only, skip base64
      const imageData = parseImageData(product.image, product.image_thumbnail, true);

      return {
        id: product.id.toString(),
        categoryId: categoryId,
        categoryName: categoryName,
        name: product.name,
        price: parseFloat(product.price),
        description: product.description || '',
        emoji: product.emoji || getProductEmoji(categoryName),
        image: imageData?.thumbnail || undefined,
        isAvailable: !product.soldOut,  // Available if not sold out
        preparationTime: product.preparation_time || 15,
        calories: product.calories || 0,
        isPopular: product.isPopular || false,
        optionGroups: productOptionGroups,
        is_set_menu: product.is_set_menu || false,
        set_items: product.set_items || undefined,
        set_display_order: product.set_display_order || 0,
        is_featured: product.is_featured || false
      };
    });

    // Pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasMore = parseInt(page) < totalPages;

    // Mobile display settings
    const mobileSettings = restaurant.mobile_settings || { show_featured: true, show_popular: true };

    res.json({
      success: true,
      data: { categories, items, mobile_settings: mobileSettings },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems: totalCount,
        totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/menu/item/:itemId', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.itemId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Get option groups for this product from DB
    const optionGroups = await OptionGroup.findAll({
      where: { restaurant_id: product.restaurant_id, isActive: true },
      include: [{
        model: Option,
        as: 'options',
        attributes: ['id', 'name', 'price', 'isActive', 'displayOrder']
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    // Parse optionGroups if it's a string (handle double-encoded JSON)
    let productOptionGroupIds = [];
    if (product.optionGroups) {
      try {
        let parsed = typeof product.optionGroups === 'string'
          ? JSON.parse(product.optionGroups)
          : product.optionGroups;
        // Handle double-encoded JSON string
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        productOptionGroupIds = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse optionGroups:', e);
        productOptionGroupIds = [];
      }
    }

    // Find option groups assigned to this product - 메뉴에서 설정한 순서대로 정렬
    const productOptionGroups = productOptionGroupIds
      .map(groupId => {
        const og = optionGroups.find(g => g.id === groupId || g.id.toString() === groupId.toString());
        if (!og) return null;
        return {
          id: og.id.toString(),
          name: og.name,
          required: og.required,
          multiple: og.multiple,
          options: (og.options || [])
            .filter(opt => opt.isActive)
            .map(opt => ({
              id: opt.id.toString(),
              name: opt.name,
              price: parseFloat(opt.price || 0)
            }))
        };
      })
      .filter(og => og !== null);

    // Parse image data for detail view (use medium size)
    const imageData = parseImageData(product.image, product.image_thumbnail);

    const item = {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      description: product.description || '',
      emoji: product.emoji || getProductEmoji(product.category),  // Use DB emoji first, fallback to generated
      image: imageData?.medium || imageData?.original || undefined,  // Use medium for detail view
      imageThumbnail: imageData?.thumbnail || undefined,
      imageOriginal: imageData?.original || undefined,
      isAvailable: true,
      preparationTime: product.preparation_time || getPreparationTime(product.category),
      calories: Math.floor(Math.random() * 400) + 200,
      ingredients: ['Fresh ingredients', 'Made to order'],
      allergens: ['May contain gluten'],
      nutritionInfo: {
        calories: Math.floor(Math.random() * 400) + 200,
        protein: '20g',
        carbs: '30g',
        fat: '15g'
      },
      optionGroups: productOptionGroups  // Use real DB option groups
    };

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/payment/methods', async (req, res) => {
  try {
    const methods = [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: '💳',
        enabled: true
      },
      {
        id: 'fpx',
        name: 'FPX Online Banking',
        icon: '🏦',
        enabled: true
      },
      {
        id: 'ewallet',
        name: 'E-Wallet',
        icon: '📱',
        enabled: false,
        comingSoon: true
      }
    ];
    
    res.json({ success: true, data: methods });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/auth/guest', async (req, res) => {
  try {
    const guestToken = 'guest_' + Date.now() + '_' + Math.random().toString(36);
    
    res.json({ 
      success: true, 
      data: {
        token: guestToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/featured/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ where: { slug: req.params.slug } });
    if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });

    const products = await Product.findAll({
      where: { restaurant_id: restaurant.id, is_featured: true, soldOut: false },
      order: [['id', 'ASC']]
    });

    const items = products.map(p => {
      const imageData = parseImageData(p.image, p.image_thumbnail, true);
      return {
        id: p.id.toString(),
        name: p.name,
        price: parseFloat(p.price),
        emoji: p.emoji || '🍽️',
        image: imageData?.thumbnail || undefined,
        is_set_menu: p.is_set_menu || false,
        set_items: p.set_items || undefined,
        code: p.code || undefined
      };
    });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/popular/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ where: { slug: req.params.slug } });
    if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });

    // Get orders from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurant.id,
        status: { [Op.notIn]: ['cancelled'] },
        createdAt: { [Op.gte]: thirtyDaysAgo }
      },
      attributes: ['order_items'],
      raw: true
    });

    // Count item frequency
    const itemCounts = {};
    orders.forEach(order => {
      let items = order.order_items;
      if (typeof items === 'string') {
        try { items = JSON.parse(items); } catch { items = []; }
      }
      if (!Array.isArray(items)) return;
      items.forEach(item => {
        const productId = item.product_id || item.productId || item.menuItem?.id;
        if (!productId) return;
        const parsed = parseInt(productId);
        if (isNaN(parsed)) return;
        const key = parsed.toString();
        itemCounts[key] = (itemCounts[key] || 0) + (item.quantity || 1);
      });
    });

    // Sort by count, take top 8
    const topIds = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id]) => parseInt(id));

    if (topIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Fetch product details
    const productWhere = { id: topIds, soldOut: false };

    // Exclude categories from popular (mobile_settings.popular_excluded_category_ids)
    const mobileSettings = restaurant.mobile_settings || {};
    const excludedIds = mobileSettings.popular_excluded_category_ids || [];
    if (excludedIds.length > 0) {
      // product.category stores category ID as string (e.g. "14") or category name (legacy)
      // Match both formats: ID as string + category names for legacy data
      const excludedStrIds = excludedIds.map(id => id.toString());
      const excludedCats = await Category.findAll({ where: { id: excludedIds }, attributes: ['id', 'name'] });
      const excludedNames = excludedCats.map(c => c.name);
      productWhere.category = { [Op.notIn]: [...excludedStrIds, ...excludedNames] };
    }

    const products = await Product.findAll({ where: productWhere });

    const items = topIds
      .map(id => {
        const p = products.find(prod => prod.id === id);
        if (!p) return null;
        const imageData = parseImageData(p.image, p.image_thumbnail, true);
        return {
          id: p.id.toString(),
          name: p.name,
          price: parseFloat(p.price),
          emoji: p.emoji || '🍽️',
          image: imageData?.thumbnail || undefined,
          is_set_menu: p.is_set_menu || false,
          set_items: p.set_items || undefined,
          code: p.code || undefined,
          orderCount: itemCounts[id.toString()] || 0
        };
      })
      .filter(Boolean);

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching popular items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
