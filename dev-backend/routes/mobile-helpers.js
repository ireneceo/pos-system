// 모바일 공개/주문 라우트 공유 헬퍼
// mobile-public.js, mobile-orders.js 에서 require

const Order = require('../models/Order');
const TableQRSession = require('../models/TableQRSession');
const { Op } = require('sequelize');
const { getTodayBounds, getOrderDatePrefix } = require('../utils/dateTimeHelper');

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
      if (listOnly) {
        const thumb = parsed.thumbnail;
        if (!thumb || thumb.startsWith('data:')) return null;
        return { thumbnail: thumb };
      }
      return parsed;
    } catch {
      return listOnly ? null : { thumbnail: imageStr, medium: imageStr, original: imageStr };
    }
  }

  // Legacy base64 — exclude from list views to keep payload small (emoji fallback)
  if (listOnly) return null;
  return { thumbnail: imageStr, medium: imageStr, original: imageStr };
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

module.exports = {
  parseImageData,
  generateOrderNumber,
  getProductEmoji,
  getPreparationTime,
  getProductOptions,
  TableQRSession,
};
