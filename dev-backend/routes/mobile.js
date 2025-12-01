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

// Generate order number per restaurant with transaction support
// Returns null - order number will be generated during transaction
const generateOrderNumber = async (restaurantId, transaction = null) => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;

  // Get today's last order number for this specific restaurant (with lock if transaction provided)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

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
      order: [['name', 'ASC']]
    });

    // Get products for this restaurant (exclude sold out items)
    const products = await Product.findAll({
      where: {
        restaurant_id: restaurantId,
        soldOut: false  // Only show available items
      }
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
    const categories = dbCategories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: cat.emoji || getProductEmoji(cat.name)  // Use DB emoji first, fallback to generated
    }));

    // Create category map for quick lookup
    const categoryMap = {};
    dbCategories.forEach(cat => {
      categoryMap[cat.id] = cat.name;
    });

    // Format items for mobile app
    const items = products.map(product => {
      // Parse optionGroups if it's a string
      let productOptionGroupIds = [];
      if (product.optionGroups) {
        try {
          productOptionGroupIds = typeof product.optionGroups === 'string'
            ? JSON.parse(product.optionGroups)
            : product.optionGroups;
        } catch (e) {
          console.error('Failed to parse optionGroups for product', product.id, e);
          productOptionGroupIds = [];
        }
      }

      // Find option groups for this product
      const productOptionGroups = optionGroups
        .filter(og => {
          // Check if product has this option group assigned
          return productOptionGroupIds.includes(og.id) || productOptionGroupIds.includes(og.id.toString());
        })
        .map(og => ({
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
        }));

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

      return {
        id: product.id.toString(),
        categoryId: categoryId,
        categoryName: categoryName,
        name: product.name,
        price: parseFloat(product.price),
        description: product.description || '',
        emoji: product.emoji || getProductEmoji(categoryName),  // Use DB emoji first, fallback to generated
        image: product.image || undefined,  // Only use actual image from DB, no fallback
        isAvailable: !product.soldOut,  // Available if not sold out
        preparationTime: product.preparation_time || 15,
        calories: product.calories || 0,
        isPopular: product.isPopular || false,
        optionGroups: productOptionGroups,
        is_set_menu: product.is_set_menu || false,
        set_items: product.set_items || undefined,
        set_display_order: product.set_display_order || 0
      };
    });

    res.json({ success: true, data: { categories, items } });
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

    // Parse optionGroups if it's a string
    let productOptionGroupIds = [];
    if (product.optionGroups) {
      try {
        productOptionGroupIds = typeof product.optionGroups === 'string'
          ? JSON.parse(product.optionGroups)
          : product.optionGroups;
      } catch (e) {
        console.error('Failed to parse optionGroups:', e);
        productOptionGroupIds = [];
      }
    }

    // Find option groups assigned to this product
    const productOptionGroups = optionGroups
      .filter(og => {
        // Check if product has this option group assigned
        return productOptionGroupIds.includes(og.id) || productOptionGroupIds.includes(og.id.toString());
      })
      .map(og => ({
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
      }));

    const item = {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      description: product.description || '',
      emoji: product.emoji || getProductEmoji(product.category),  // Use DB emoji first, fallback to generated
      image: product.image || undefined,  // Only use actual image from DB, no fallback
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

router.post('/order', async (req, res) => {
  try {
    const { items, paymentMethod, customerInfo, orderType, tableNumber, storeId, scheduledPickupTime } = req.body;

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
          const generated = await generateOrderNumber(restaurantId, t);
          orderNumber = generated.orderNumber;
          pickupNumber = generated.pickupNumber;

          console.log('  - Generated orderNumber:', orderNumber);
          console.log('  - Generated pickupNumber:', pickupNumber);

          // Create order in database
          console.log('  - Creating order with data:');
          const orderData = {
            restaurant_id: restaurantId,
            table_number: tableNumber || customerInfo?.tableNumber || null,
            customer_name: customerInfo?.name || 'Mobile Guest',
            customer_phone: customerInfo?.phone || null,
            total_amount: total,
            status: 'pending',
            order_type: orderType || 'dine_in',
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
      orderType: orderType || 'dine-in',
      orderSource: 'mobile',
      tableNumber: tableNumber || undefined
    };

    // Emit Socket.IO event for live orders
    const io = req.app.get('io');
    if (io) {
      io.of('/orders').emit('order-created', {
        id: order.id,
        restaurant_id: restaurantId,
        order_number: orderNumber,
        customer_name: customerInfo?.name || 'Mobile Guest',
        customer_phone: customerInfo?.phone || null,
        table_number: tableNumber || null,
        total_amount: total,
        status: 'pending',
        order_type: orderType || 'dine_in',
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
      createdAt: order.createdAt,
      estimatedPickupTime: new Date(order.createdAt.getTime() + 20 * 60000),
      paymentStatus: order.payment_status || 'pending',
      orderType: order.order_type || 'dine-in',
      orderSource: 'mobile',
      table_number: order.table_number || null,
      tableNumber: order.table_number ? order.table_number : null
    };

    res.json({ success: true, data: orderData });
  } catch (error) {
    console.error('Order fetch error:', error);
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

module.exports = router;