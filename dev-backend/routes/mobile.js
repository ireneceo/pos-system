const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');

// Helper function to parse image data (supports URL format, old JSON format, and legacy base64)
// listOnly=true: returns only thumbnail URL for list views (excludes base64 to reduce payload)
function parseImageData(imageStr, imageThumbnail = null, listOnly = false) {
  if (!imageStr) return null;

  // New URL format (starts with /uploads/)
  if (imageStr.startsWith('/uploads/')) {
    const thumbnail = imageThumbnail || imageStr.replace('/products/', '/products/thumbnails/');
    return listOnly ? { thumbnail } : { thumbnail, medium: imageStr, original: imageStr };
  }

  // Old JSON format with multiple sizes
  if (imageStr.startsWith('{')) {
    try {
      const parsed = JSON.parse(imageStr);
      return listOnly ? { thumbnail: parsed.thumbnail } : parsed;
    } catch {
      return listOnly ? null : { thumbnail: imageStr, medium: imageStr, original: imageStr };
    }
  }

  // Legacy base64 — include in list views (until migrated to file URLs)
  return listOnly ? { thumbnail: imageStr } : { thumbnail: imageStr, medium: imageStr, original: imageStr };
}

// Generate order number per restaurant with transaction support
// Returns null - order number will be generated during transaction
const generateOrderNumber = async (restaurantId, transaction = null, timezone = 'Asia/Kuala_Lumpur') => {
  const datePrefix = getOrderDatePrefix(timezone);
  const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timezone);

  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      order_number: {
        [Op.like]: `${datePrefix}-%`
      },
      createdAt: {
        [Op.between]: [todayStart, todayEnd]
      }
    },
    order: [['order_number', 'DESC']],
    limit: 1
  };

  // Add lock if transaction provided
  if (transaction) {
    queryOptions.lock = transaction.LOCK.UPDATE;
    queryOptions.transaction = transaction;
  }

  const existingOrders = await Order.findAll(queryOptions);

  let nextCounter = 1;
  if (existingOrders.length > 0) {
    const lastOrderNumber = existingOrders[0].order_number;
    const parts = lastOrderNumber.split('-');
    if (parts.length > 1) {
      const lastCounter = parseInt(parts[1]) || 0;
      nextCounter = lastCounter + 1;
    }
  }

  const orderNumber = `${datePrefix}-${nextCounter.toString().padStart(3, '0')}`;
  const pickupNumber = nextCounter.toString().padStart(3, '0');

  return { orderNumber, pickupNumber };
};

// Helper functions
function getProductEmoji(category) {
  const emojis = {
    'Burgers': '🍔',
    'Pizza': '🍕',
    'Drinks': '🥤',
    'Desserts': '🍰'
  };
  return emojis[category] || '🍽️';
}

function getPreparationTime(category) {
  const times = {
    'Burgers': 15,
    'Pizza': 20,
    'Drinks': 2,
    'Desserts': 10
  };
  return times[category] || 15;
}

function getProductOptions(category) {
  if (category === 'Burgers') {
    return [
      {
        id: 'size',
        name: 'Size',
        required: true,
        multiple: false,
        options: [
          { id: 'regular', name: 'Regular', price: 0 },
          { id: 'large', name: 'Large', price: 3 }
        ]
      },
      {
        id: 'extras',
        name: 'Extra Toppings',
        required: false,
        multiple: true,
        options: [
          { id: 'cheese', name: 'Extra Cheese', price: 2 },
          { id: 'bacon', name: 'Bacon', price: 3 },
          { id: 'mushroom', name: 'Mushrooms', price: 1.5 }
        ]
      }
    ];
  } else if (category === 'Pizza') {
    return [
      {
        id: 'size',
        name: 'Size',
        required: true,
        multiple: false,
        options: [
          { id: 'personal', name: 'Personal (9")', price: 0 },
          { id: 'medium', name: 'Medium (12")', price: 5 },
          { id: 'large', name: 'Large (15")', price: 10 }
        ]
      }
    ];
  } else if (category === 'Drinks') {
    return [
      {
        id: 'size',
        name: 'Size',
        required: true,
        multiple: false,
        options: [
          { id: 'small', name: 'Small', price: 0 },
          { id: 'medium', name: 'Medium', price: 1 },
          { id: 'large', name: 'Large', price: 2 }
        ]
      }
    ];
  }
  return [];
}

// QR Token Verification
const TableQRSession = require('../models/TableQRSession');

/**
 * GET /api/mobile/verify-qr?token=xxx
 * Verify QR token validity (public, no auth)
 */
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

// Cart & Order endpoints
router.post('/cart/validate', async (req, res) => {
  try {
    const { items } = req.body;
    
    const validation = {
      isValid: true,
      items: items.map(item => ({
        ...item,
        isAvailable: true,
        currentPrice: item.price,
        priceChanged: false
      })),
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    res.json({ success: true, data: validation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper: Find mergeable order for auto-merge (mobile)
// Only merges orders from the same day (based on createdAt) with payment_status = 'pending'
async function findMergeableOrderMobile(restaurantId, tableNumber, orderType, transaction = null, timezone = 'Asia/Kuala_Lumpur') {
  if (!restaurantId || !tableNumber) return null;

  // Get today's date range in restaurant's timezone
  const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timezone);

  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      table_number: tableNumber,
      order_type: orderType || 'dine_in',
      payment_status: 'pending',
      status: {
        [Op.notIn]: ['served', 'completed', 'cancelled']
      },
      // Only merge orders from today (same date condition)
      createdAt: {
        [Op.between]: [todayStart, todayEnd]
      },
      [Op.or]: [
        { is_deleted: false },
        { is_deleted: null }
      ]
    },
    order: [['createdAt', 'DESC']],
    limit: 1
  };

  if (transaction) {
    queryOptions.lock = transaction.LOCK.UPDATE;
    queryOptions.transaction = transaction;
  }

  const existingOrders = await Order.findAll(queryOptions);
  return existingOrders.length > 0 ? existingOrders[0] : null;
}

router.post('/order', async (req, res) => {
  try {
    const { items, paymentMethod, customerInfo, orderType, tableNumber, storeId, scheduledPickupTime, skipAutoMerge } = req.body;

    // Debug logging
    console.log('📝 Mobile order received:');
    console.log('  - storeId (raw):', storeId, typeof storeId);
    console.log('  - items:', items);
    console.log('  - orderType:', orderType);
    console.log('  - paymentMethod:', paymentMethod);
    console.log('  - customerInfo:', customerInfo);
    console.log('  - tableNumber:', tableNumber);

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Convert storeId to integer, default to 1 if not provided
    const restaurantId = storeId ? parseInt(storeId, 10) : 1;
    console.log('  - restaurantId (parsed):', restaurantId, typeof restaurantId);

    const actualTableNumber = tableNumber || customerInfo?.tableNumber || null;
    const actualOrderType = orderType || 'dine_in';

    // Get restaurant timezone for date calculations
    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'operation_settings'] });
    const tz = getRestaurantTimezone(restaurant);

    // Auto-merge: Check if there's an existing order to merge into
    if (!skipAutoMerge && actualTableNumber) {
      const mergeableOrder = await findMergeableOrderMobile(restaurantId, actualTableNumber, actualOrderType, null, tz);

      if (mergeableOrder) {
        console.log(`🔀 [MOBILE AUTO-MERGE] Found mergeable order ${mergeableOrder.id} for table ${actualTableNumber}`);

        const now = new Date().toISOString();

        // Get current items
        let currentItems = mergeableOrder.order_items || [];
        if (typeof currentItems === 'string') {
          currentItems = JSON.parse(currentItems);
        }

        // Ensure existing items have order_group preserved
        currentItems = currentItems.map(item => ({
          ...item,
          order_group: item.order_group !== undefined ? item.order_group : 0
        }));

        // Calculate next order_group number
        const existingGroups = currentItems.map(item => item.order_group || 0);
        const maxGroup = existingGroups.length > 0 ? Math.max(...existingGroups) : 0;
        const nextGroup = maxGroup + 1;

        // Add new items with added_at timestamp and order_group
        const newItemsWithTimestamp = items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          options: item.options || [],
          status: 'pending',
          added_at: now,
          order_group: nextGroup
        }));

        const mergedItems = [...currentItems, ...newItemsWithTimestamp];

        // Recalculate total
        const newTotal = mergedItems.reduce((sum, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQty = parseInt(item.quantity) || 1;
          return sum + (itemPrice * itemQty);
        }, 0);

        // Update order - pass array directly, model setter will handle stringify
        await mergeableOrder.update({
          order_items: mergedItems,
          total_amount: newTotal,
          status: 'pending' // Reset to pending for kitchen
        });
        await mergeableOrder.reload();

        console.log(`✅ [MOBILE AUTO-MERGE] Merged ${newItemsWithTimestamp.length} items into order ${mergeableOrder.id} (group: ${nextGroup})`);

        // Emit socket events for real-time update
        const io = req.app.get('io');
        if (io) {
          const room = `restaurant_${restaurantId}`;
          // Regular order update
          io.of('/orders').to(room).emit('order-updated', mergeableOrder);
          // Special event for new items added (for notification sound)
          io.of('/orders').to(room).emit('order-items-added', {
            orderId: mergeableOrder.id,
            orderNumber: mergeableOrder.order_number,
            tableNumber: mergeableOrder.table_number,
            orderGroup: nextGroup,
            addedItems: newItemsWithTimestamp,
            itemCount: newItemsWithTimestamp.length
          });
        }

        const orderResponse = {
          id: mergeableOrder.id,
          orderNumber: mergeableOrder.order_number,
          pickupNumber: mergeableOrder.order_number ? mergeableOrder.order_number.split('-')[1] : '000',
          items: mergedItems,
          total: newTotal,
          status: mergeableOrder.status,
          createdAt: mergeableOrder.createdAt,
          estimatedPickupTime: new Date(Date.now() + 20 * 60000),
          scheduledPickupTime: mergeableOrder.scheduled_pickup_time || null,
          paymentStatus: mergeableOrder.payment_status,
          orderType: mergeableOrder.order_type,
          orderSource: 'mobile',
          tableNumber: actualTableNumber,
          merged: true,
          addedItems: newItemsWithTimestamp
        };

        return res.json({ success: true, data: orderResponse });
      }
    }

    // Create order with transaction and retry logic
    let order;
    let orderNumber;
    let pickupNumber;
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        order = await sequelize.transaction(async (t) => {
          // Generate order number within transaction (with row lock)
          const generated = await generateOrderNumber(restaurantId, t, tz);
          orderNumber = generated.orderNumber;
          pickupNumber = generated.pickupNumber;

          console.log('  - Generated orderNumber:', orderNumber);
          console.log('  - Generated pickupNumber:', pickupNumber);

          // Create order in database
          console.log('  - Creating order with data:');
          const orderData = {
            restaurant_id: restaurantId,
            table_number: actualTableNumber,
            customer_name: customerInfo?.name || 'Mobile Guest',
            customer_phone: customerInfo?.phone || null,
            total_amount: total,
            status: 'pending',
            order_type: actualOrderType,
            payment_method: paymentMethod || 'counter',
            payment_status: 'pending',
            order_number: orderNumber,
            scheduled_pickup_time: scheduledPickupTime ? new Date(scheduledPickupTime) : null,
            order_items: items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              options: item.options || []
            }))
          };
          console.log('    restaurant_id:', orderData.restaurant_id);
          console.log('    order_number:', orderData.order_number);
          console.log('    customer_name:', orderData.customer_name);
          console.log('    total_amount:', orderData.total_amount);
          console.log('    order_items:', JSON.stringify(orderData.order_items, null, 2));

          return await Order.create(orderData, { transaction: t });
        });

        console.log('✅ Order created successfully:', order.id);
        break; // Success - exit retry loop

      } catch (error) {
        // Check if it's a duplicate key error
        if (error.name === 'SequelizeUniqueConstraintError' ||
            (error.parent && error.parent.code === 'ER_DUP_ENTRY')) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(`Failed to generate unique order number after ${maxRetries} attempts`);
          }
          console.log(`⚠️ Duplicate order number detected, retrying (${retryCount}/${maxRetries})...`);
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 50 * retryCount));
          continue;
        }
        // Other errors - rethrow immediately
        throw error;
      }
    }

    const orderResponse = {
      id: order.id,
      orderNumber: orderNumber,
      pickupNumber: pickupNumber,
      items: items,
      total: total,
      status: 'pending',
      createdAt: order.createdAt,
      estimatedPickupTime: new Date(Date.now() + 20 * 60000),
      scheduledPickupTime: scheduledPickupTime || null,
      paymentStatus: 'pending',
      orderType: actualOrderType,
      orderSource: 'mobile',
      tableNumber: actualTableNumber || undefined
    };

    // Emit Socket.IO event for live orders
    const io = req.app.get('io');
    if (io) {
      io.of('/orders').to(`restaurant_${restaurantId}`).emit('order-created', {
        id: order.id,
        restaurant_id: restaurantId,
        order_number: orderNumber,
        customer_name: customerInfo?.name || 'Mobile Guest',
        customer_phone: customerInfo?.phone || null,
        table_number: actualTableNumber,
        total_amount: total,
        status: 'pending',
        order_type: actualOrderType,
        payment_method: paymentMethod || 'counter',
        payment_status: 'pending',
        order_date: new Date().toISOString(),
        scheduled_pickup_time: scheduledPickupTime || null,
        order_items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          options: item.options || []
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      });
    }

    res.json({ success: true, data: orderResponse });
    console.log('📤 Order response sent to client');
  } catch (error) {
    console.error('❌ Order creation error:', error);
    console.error('   Error stack:', error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all orders (for live order display)
router.get('/orders', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let whereCondition = {};
    if (status) {
      if (status.includes(',')) {
        whereCondition.status = { [Op.in]: status.split(',') };
      } else {
        whereCondition.status = status;
      }
    }
    
    const orders = await Order.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });
    
    const formattedOrders = orders.map(order => {
      // Parse order_items - it's stored as an array of items
      let items = [];
      if (order.order_items) {
        items = typeof order.order_items === 'string' ?
          JSON.parse(order.order_items) : order.order_items;

        // If it's not an array, try to extract items property
        if (!Array.isArray(items)) {
          items = items.items || [];
        }
      }

      return {
        id: 'ORD' + order.id,
        orderNumber: order.order_number || 'ORD' + order.id,
        pickupNumber: order.order_number ? order.order_number.split('-')[1] : '000',
        status: order.status,
        items: items,
        total: parseFloat(order.total_amount),
        createdAt: order.createdAt,
        estimatedPickupTime: new Date(order.createdAt.getTime() + 20 * 60000),
        paymentStatus: order.payment_status || 'pending',
        orderType: order.order_type || 'dine-in',
        orderSource: 'mobile',
        tableNumber: order.table_number > 0 ? `T${String(order.table_number).padStart(3, '0')}` : undefined
      };
    });
    
    res.json({ success: true, data: formattedOrders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Extract numeric ID from orderId (format: ORD123)
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;

    const order = await Order.findByPk(numericId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Parse order_items - it's stored as an array of items
    let items = [];
    if (order.order_items) {
      items = typeof order.order_items === 'string' ?
        JSON.parse(order.order_items) : order.order_items;

      // If it's not an array, try to extract items property
      if (!Array.isArray(items)) {
        items = items.items || [];
      }
    }

    const orderData = {
      id: 'ORD' + order.id,
      orderNumber: order.order_number || 'ORD' + order.id,
      pickupNumber: order.order_number ? order.order_number.split('-')[1] : '000',
      status: order.status,
      items: items,
      total: parseFloat(order.total_amount),
      total_amount: parseFloat(order.total_amount),
      createdAt: order.createdAt,
      estimatedPickupTime: new Date(order.createdAt.getTime() + 20 * 60000),
      paymentStatus: order.payment_status || 'pending',
      payment_status: order.payment_status || 'pending',
      paymentMethod: order.payment_method || 'counter',
      payment_method: order.payment_method || 'counter',
      currency: order.currency || 'MYR',
      orderType: order.order_type || 'dine-in',
      orderSource: 'mobile',
      table_number: order.table_number || null,
      tableNumber: order.table_number ? order.table_number : null,
      payment_proof: order.payment_proof || null
    };

    res.json({ success: true, data: orderData });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Retry payment proof (모바일 전용 - 인증 불필요)
// rejected 상태의 주문에 대해서만 새 결제증빙 제출 허용
router.patch('/order/:orderId/retry-payment', async (req, res) => {
  try {
    const { orderId } = req.params;
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;
    const { payment_proof } = req.body;

    if (!payment_proof) {
      return res.status(400).json({ success: false, error: 'Payment proof is required' });
    }

    const order = await Order.findByPk(numericId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // rejected 상태에서만 retry 허용
    if (order.payment_status !== 'rejected') {
      return res.status(400).json({ success: false, error: 'Order is not in rejected state' });
    }

    // 기존 proof history 보존 + 새 proof를 current에 저장
    let existingProof = order.payment_proof
      ? (typeof order.payment_proof === 'string' ? JSON.parse(order.payment_proof) : order.payment_proof)
      : null;

    if (existingProof && !existingProof.hasOwnProperty('current')) {
      existingProof = { current: existingProof, history: [] };
    }

    const newProof = {
      current: payment_proof,
      history: existingProof ? (existingProof.history || []) : []
    };

    await order.update({
      payment_status: 'payment_verification_pending',
      payment_proof: newProof
    });

    // Socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plainOrder = order.get({ plain: true });
      if (typeof plainOrder.order_items === 'string') {
        try { plainOrder.order_items = JSON.parse(plainOrder.order_items); } catch(e) {}
      }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plainOrder);
    }

    res.json({ success: true, data: { id: order.id, payment_status: 'payment_verification_pending' } });
  } catch (error) {
    console.error('Retry payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/order/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;
    
    const order = await Order.findByPk(numericId);
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        error: 'Order cannot be cancelled',
        message: `Order is already ${order.status}`
      });
    }
    
    await order.update({ status: 'cancelled' });
    
    const orderItems = typeof order.order_items === 'string' ? 
      JSON.parse(order.order_items) : order.order_items || {};
    const refundStatus = orderItems.paymentStatus === 'completed' ? 'processing' : 'not_required';
    
    res.json({ 
      success: true, 
      message: 'Order cancelled successfully',
      refundStatus: refundStatus
    });
  } catch (error) {
    console.error('Order cancellation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Payment endpoints
router.post('/payment/intent', async (req, res) => {
  try {
    const { amount, currency = 'MYR' } = req.body;
    
    const paymentIntent = {
      id: 'pi_' + Date.now(),
      clientSecret: 'pi_secret_' + Date.now(),
      amount: amount,
      currency: currency,
      status: 'requires_payment_method'
    };
    
    res.json({ success: true, data: paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/payment/confirm', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    res.json({ 
      success: true, 
      message: 'Payment confirmed',
      orderId: orderId
    });
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

// Guest auth endpoint
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

// GET /api/mobile/featured/:slug — Featured menu items
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

// GET /api/mobile/popular/:slug — Popular menu items (last 30 days)
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
      const excludedStrIds = excludedIds.map(id => id.toString());
      productWhere.category = { [Op.notIn]: excludedStrIds };
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