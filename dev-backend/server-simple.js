const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL, // Your production URL
      /\.yourdomainhere\.com$/ // Replace with your actual domain
    ];
    
    const allowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Mobile routes
app.post('/api/mobile/auth/guest', (req, res) => {
  res.json({
    success: true,
    data: {
      token: 'guest_' + Date.now(),
      expiresIn: 3600
    }
  });
});

app.get('/api/mobile/store/:qrCode', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      name: 'FoodCourt Central',
      description: 'Your favorite food court',
      logo: '/images/store-logo.png',
      isOpen: true,
      openingHours: {
        monday: '10:00 - 22:00',
        tuesday: '10:00 - 22:00',
        wednesday: '10:00 - 22:00',
        thursday: '10:00 - 22:00',
        friday: '10:00 - 23:00',
        saturday: '10:00 - 23:00',
        sunday: '10:00 - 22:00'
      }
    }
  });
});

app.get('/api/mobile/menu/:storeId', (req, res) => {
  res.json({
    success: true,
    data: {
      categories: [
        { id: '1', name: 'Burgers', emoji: '🍔' },
        { id: '2', name: 'Pizza', emoji: '🍕' },
        { id: '3', name: 'Drinks', emoji: '🥤' },
        { id: '4', name: 'Desserts', emoji: '🍰' }
      ],
      items: [
        {
          id: '1',
          categoryId: '1',
          name: 'Classic Burger',
          price: 15.90,
          description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
          emoji: '🍔',
          image: '/images/classic-burger.jpg',
          isAvailable: true,
          preparationTime: 15,
          calories: 650,
          isPopular: true,
          optionGroups: [
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
          ]
        },
        {
          id: '2',
          categoryId: '1',
          name: 'Chicken Burger',
          price: 14.90,
          description: 'Crispy chicken breast with coleslaw and mayo',
          emoji: '🍗',
          image: '/images/chicken-burger.jpg',
          isAvailable: true,
          preparationTime: 12,
          calories: 580,
          optionGroups: [
            {
              id: 'spice',
              name: 'Spice Level',
              required: false,
              multiple: false,
              options: [
                { id: 'mild', name: 'Mild', price: 0 },
                { id: 'medium', name: 'Medium', price: 0 },
                { id: 'hot', name: 'Hot 🌶️', price: 0 }
              ]
            }
          ]
        },
        {
          id: '3',
          categoryId: '2',
          name: 'Margherita Pizza',
          price: 18.90,
          description: 'Fresh mozzarella, tomato sauce, and basil',
          emoji: '🍕',
          image: '/images/margherita-pizza.jpg',
          isAvailable: true,
          preparationTime: 20,
          calories: 800,
          isPopular: true,
          optionGroups: [
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
          ]
        },
        {
          id: '4',
          categoryId: '3',
          name: 'Cola',
          price: 3.90,
          description: 'Refreshing cola drink',
          emoji: '🥤',
          image: '/images/cola.jpg',
          isAvailable: true,
          preparationTime: 0,
          calories: 150,
          optionGroups: [
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
          ]
        }
      ]
    }
  });
});

app.post('/api/mobile/cart/validate', (req, res) => {
  res.json({
    success: true,
    data: {
      isValid: true,
      items: req.body.items.map(item => ({
        ...item,
        isAvailable: true,
        currentPrice: item.price,
        priceChanged: false
      })),
      total: req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  });
});

app.post('/api/mobile/order', (req, res) => {
  const { items, orderType } = req.body;
  const orderId = 'ORD' + Date.now();
  
  // Generate order number with date format YYMMDD-NNN
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '');
  
  // Get today's order count (simplified for demo)
  const orderCount = Math.floor(Math.random() * 50) + 1;
  const orderNumber = `${dateStr}-${String(orderCount).padStart(3, '0')}`;
  const pickupNumber = String(orderCount).padStart(3, '0');
  
  res.json({
    success: true,
    data: {
      id: orderId,
      orderNumber: orderNumber,
      pickupNumber: pickupNumber,
      items: items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date(),
      estimatedPickupTime: new Date(Date.now() + 20 * 60000),
      paymentStatus: 'pending',
      orderType: orderType || 'dine-in',
      orderSource: 'mobile'
    }
  });
});

app.get('/api/mobile/order/:orderId', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.orderId,
      pickupNumber: '042',
      status: 'preparing',
      items: [
        {
          name: 'Classic Burger',
          quantity: 2,
          price: 15.90,
          options: ['Large', 'Extra Cheese']
        }
      ],
      total: 35.80,
      createdAt: new Date(Date.now() - 10 * 60000),
      estimatedPickupTime: new Date(Date.now() + 10 * 60000),
      paymentStatus: 'completed'
    }
  });
});

app.post('/api/mobile/payment/intent', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'pi_' + Date.now(),
      clientSecret: 'pi_secret_' + Date.now(),
      amount: req.body.amount,
      currency: req.body.currency || 'MYR',
      status: 'requires_payment_method'
    }
  });
});

app.post('/api/mobile/payment/confirm', (req, res) => {
  res.json({
    success: true,
    message: 'Payment confirmed',
    orderId: req.body.orderId
  });
});

app.get('/api/mobile/payment/methods', (req, res) => {
  res.json({
    success: true,
    data: [
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
      }
    ]
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Mobile API Server running on port ${PORT}`);
});