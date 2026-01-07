const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const PlanTemplate = require('../models/PlanTemplate');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AddonModule = require('../models/AddonModule');
const { Recipe, Ingredient, RecipeIngredient } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Optional authentication middleware
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token && process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          restaurant_id: user.restaurant_id
        };
      }
    }
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

// Get all restaurants (with role-based filtering)
router.get('/', optionalAuth, async (req, res) => {
  try {
    console.log(`🏢 GET /api/restaurants - User: ${req.user ? req.user.email : 'anonymous'} (${req.user ? req.user.role : 'no auth'})`);

    const { brand_id } = req.query;
    console.log(`🔍 Query params - brand_id: ${brand_id}`);

    // Build include options for managers
    const managersInclude = {
      model: User,
      as: 'managers',
      attributes: ['id', 'full_name', 'username', 'email', 'role'],
      through: { attributes: ['is_primary'] }
    };

    // Build where clause
    const whereClause = {};

    // Filter by brand_id if provided
    if (brand_id) {
      whereClause.brand_id = brand_id;
      console.log(`🏢 Filtering by brand_id: ${brand_id}`);
    }

    // Filter restaurants based on user role
    if (req.user && (req.user.role === 'Brand General' || req.user.role === 'Brand Manager')) {
      // Brand General/Manager: Only see assigned restaurants
      managersInclude.where = { id: req.user.id };
      managersInclude.required = true;
      console.log(`🔐 Filtering restaurants for ${req.user.role}: manager_id = ${req.user.id}`);
    } else {
      // System Admin or no auth: See all restaurants
      console.log(`👑 ${req.user ? req.user.role : 'No auth'}: Returning all restaurants`);
    }

    const restaurants = await Restaurant.findAll({
      where: whereClause,
      include: [
        managersInclude,
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'code', 'logo_url']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log(`📊 Found ${restaurants.length} restaurants`);

    // Transform data to match frontend interface
    const transformedRestaurants = restaurants.map(restaurant => {
      const restaurantData = restaurant.toJSON();

      // Get all managers for this restaurant
      const managers = restaurantData.managers || [];
      const primaryManager = managers.find(m => m.RestaurantManager?.is_primary) || managers[0];

      return {
        id: restaurantData.id.toString(),
        name: restaurantData.name,
        managerId: restaurantData.manager_id ? restaurantData.manager_id.toString() : (primaryManager ? primaryManager.id.toString() : ''),
        managerName: restaurantData.manager_name || (primaryManager ? primaryManager.full_name || primaryManager.username : 'Unassigned'),
        managers: managers.map(m => ({
          id: m.id.toString(),
          name: m.full_name || m.username,
          email: m.email,
          role: m.role,
          isPrimary: m.RestaurantManager?.is_primary || false
        })),
        brandId: restaurantData.brand_id ? restaurantData.brand_id.toString() : null,
        brand_id: restaurantData.brand_id || null,
        brand: restaurantData.brand ? {
          id: restaurantData.brand.id.toString(),
          name: restaurantData.brand.name,
          code: restaurantData.brand.code,
          logoUrl: restaurantData.brand.logo_url
        } : null,
        location: restaurantData.address || '',
        cuisine: restaurantData.cuisine || 'Various',
        status: restaurantData.status === 'active' ? 'active' : 'inactive',
        todaySales: 0, // Would need to calculate from orders
        todayOrders: 0, // Would need to calculate from orders
        staffCount: 0, // Would need to count from user assignments
        rating: 4.5, // Default value
        createdAt: restaurantData.createdAt,
        lastOrder: restaurantData.updatedAt,
        email: restaurantData.email || '',
        phone: restaurantData.phone || '',
        address: restaurantData.address || '',
        planType: restaurantData.plan_type || 'Basic Plan',
        planAmount: restaurantData.plan_amount ? restaurantData.plan_amount.toString() : '29.00',
        subscriptionStart: restaurantData.subscription_start ? restaurantData.subscription_start.toISOString().split('T')[0] : null,
        subscriptionEnd: restaurantData.subscription_end ? restaurantData.subscription_end.toISOString().split('T')[0] : null
      };
    });

    console.log('📝 Transformed restaurants:', transformedRestaurants.length);
    res.json(transformedRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get restaurants for a specific manager
router.get('/manager/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;
    console.log(`🏢 🔥 UPDATED CODE 🔥 GET /api/restaurants/manager/${managerId} - Request received`);
    console.log('📋 Request headers:', req.headers);

    // Find restaurants where user is manager through restaurant_managers table
    console.log('🔍 Executing query with include...');
    const restaurants = await Restaurant.findAll({
      include: [{
        model: User,
        as: 'managers',
        where: { id: managerId },
        attributes: [],
        through: { attributes: [] }
      }],
      order: [['createdAt', 'DESC']]
    });

    console.log(`🏪 Found ${restaurants.length} restaurants for manager ${managerId}`);
    console.log('📝 Restaurant details:', restaurants.map(r => ({ id: r.id, name: r.name })));
    res.json(restaurants);
  } catch (error) {
    console.error('❌ ERROR fetching manager restaurants:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ error: 'Failed to fetch manager restaurants', details: error.message });
  }
});

// Get restaurant details
// Get restaurant by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { slug: req.params.slug },
      include: [{
        model: User,
        as: 'managers',
        attributes: ['id', 'full_name', 'username', 'email', 'role', 'company_name', 'phone'],
        through: { attributes: ['is_primary'] }
      }]
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Transform restaurant data to include managers array
    const restaurantData = restaurant.toJSON();
    const managers = restaurantData.managers || [];

    const response = {
      ...restaurantData,
      managers: managers.map(m => ({
        id: m.id.toString(),
        name: m.full_name || m.username,
        email: m.email,
        role: m.role,
        company: m.company_name || '',
        phone: m.phone || '',
        isPrimary: m.RestaurantManager?.is_primary || false
      }))
    };

    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error fetching restaurant by slug:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'managers',
          attributes: ['id', 'full_name', 'username', 'email', 'role', 'company_name', 'phone'],
          through: { attributes: ['is_primary'] }
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'logo_url']
        }
      ]
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Transform restaurant data to include managers array
    const restaurantData = restaurant.toJSON();
    const managers = restaurantData.managers || [];

    const response = {
      ...restaurantData,
      managers: managers.map(m => ({
        id: m.id.toString(),
        name: m.full_name || m.username,
        email: m.email,
        role: m.role,
        company: m.company_name || '',
        phone: m.phone || '',
        isPrimary: m.RestaurantManager?.is_primary || false
      }))
    };

    // Debug logging for payment_settings
    console.log(`🔍 GET /restaurants/${req.params.id} - payment_settings included:`, !!response.payment_settings);
    if (response.payment_settings) {
      const enabledMethods = Object.entries(response.payment_settings)
        .filter(([_, config]) => config.enabled)
        .map(([key, _]) => key);
      console.log(`   Enabled payment methods: ${enabledMethods.join(', ')}`);
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
});

// Helper function to validate brand_id permission
// Brand General/Manager can only set brand_id to their own brand
const validateBrandPermission = async (brandId, userId, userRole) => {
  if (!brandId) return { valid: true };

  // System Admin can set any brand
  if (userRole === 'System Admin') return { valid: true };

  // Brand General/Manager must own the brand
  if (userRole === 'Brand General' || userRole === 'Brand Manager') {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return { valid: false, error: 'Brand not found' };
    }
    if (brand.owner_id !== userId) {
      return { valid: false, error: 'You can only assign restaurants to your own brand' };
    }
    return { valid: true };
  }

  return { valid: false, error: 'Unauthorized to set brand' };
};

// Create new restaurant
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('📥 Received restaurant creation request:', req.body);

    // Validate brand_id permission if provided
    if (req.body.brand_id) {
      const brandCheck = await validateBrandPermission(req.body.brand_id, req.user.id, req.user.role);
      if (!brandCheck.valid) {
        console.log(`❌ Brand permission denied: ${brandCheck.error}`);
        return res.status(403).json({ error: brandCheck.error });
      }
    }

    // Get plan template if specified
    let planSnapshot = null;
    let planLimits = {
      order_limit: 1000,
      menu_item_limit: 50,
      staff_limit: 5
    };

    if (req.body.planType) {
      // Try to find plan template
      const planName = req.body.planType.toLowerCase().replace(' plan', '');
      const planTemplate = await PlanTemplate.findOne({ where: { name: planName } });

      if (planTemplate) {
        planSnapshot = {
          plan_id: planTemplate.id,
          name: planTemplate.name,
          display_name: planTemplate.display_name,
          base_price_monthly: planTemplate.base_price_monthly,
          base_price_annual: planTemplate.base_price_annual,
          features: planTemplate.features,
          limits: {
            order_limit: planTemplate.order_limit,
            menu_item_limit: planTemplate.menu_item_limit,
            staff_limit: planTemplate.staff_limit
          },
          captured_at: new Date()
        };
        planLimits = {
          order_limit: planTemplate.order_limit,
          menu_item_limit: planTemplate.menu_item_limit,
          staff_limit: planTemplate.staff_limit
        };
      }
    }

    // Map frontend fields to database fields
    const restaurantData = {
      name: req.body.name,
      manager_id: req.body.managerId,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city || null,
      state: req.body.state || null,
      postal_code: req.body.postal_code || null,
      country: req.body.country || 'MY',
      business_registration: req.body.business_registration || null,
      tax_id: req.body.tax_id || null,
      plan_type: req.body.planType || 'Basic Plan',
      plan_amount: parseFloat(req.body.planAmount) || (planSnapshot ? planSnapshot.base_price_monthly : 29.00),
      status: req.body.status === 'active' ? 'active' : 'inactive',
      subscription_start: req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : new Date(),
      subscription_end: req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null,
      subscription_snapshot: planSnapshot,
      brand_id: req.body.brand_id || null,
      ...planLimits
    };

    // Get manager name for the restaurant if managerId is provided
    if (restaurantData.manager_id) {
      const manager = await User.findByPk(restaurantData.manager_id);
      if (manager) {
        restaurantData.manager_name = manager.full_name || manager.username;
      }
    }

    console.log('📤 Creating restaurant with data:', restaurantData);

    const restaurant = await Restaurant.create(restaurantData);

    // Handle multiple managers if managerIds array is provided
    if (req.body.managerIds && Array.isArray(req.body.managerIds) && req.body.managerIds.length > 0) {
      const RestaurantManager = require('../models/RestaurantManager');

      // Create restaurant-manager associations
      const managerAssociations = req.body.managerIds.map((managerId, index) => ({
        restaurant_id: restaurant.id,
        manager_id: managerId,
        is_primary: index === 0 // First manager is primary
      }));

      await RestaurantManager.bulkCreate(managerAssociations);
      console.log(`✅ Created ${managerAssociations.length} manager associations for restaurant ${restaurant.id}`);
    }

    console.log('✅ Restaurant created successfully:', restaurant.toJSON());
    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    console.error('❌ Error creating restaurant:', error);
    res.status(500).json({ error: 'Failed to create restaurant', details: error.message });
  }
});

// Update restaurant
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('🔄 PUT /api/restaurants/:id - Restaurant ID:', req.params.id);

    // Validate brand_id permission if being changed
    if (req.body.brand_id !== undefined && req.body.brand_id) {
      const brandCheck = await validateBrandPermission(req.body.brand_id, req.user.id, req.user.role);
      if (!brandCheck.valid) {
        console.log(`❌ Brand permission denied: ${brandCheck.error}`);
        return res.status(403).json({ error: brandCheck.error });
      }

      // Also verify user is a manager of this restaurant (for Brand General/Manager)
      if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
        const RestaurantManager = require('../models/RestaurantManager');
        const isManager = await RestaurantManager.findOne({
          where: {
            restaurant_id: req.params.id,
            manager_id: req.user.id
          }
        });
        if (!isManager) {
          console.log(`❌ User ${req.user.id} is not a manager of restaurant ${req.params.id}`);
          return res.status(403).json({ error: 'You can only set brand for restaurants you manage' });
        }
      }
    }
    console.log('📥 Received restaurant update request body:', JSON.stringify(req.body).substring(0, 500));

    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      console.log('❌ Restaurant not found:', req.params.id);
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    console.log('✅ Restaurant found, proceeding to update...');

    // Map frontend fields to database fields - only include fields that are explicitly provided
    const updateData = {};

    // Basic info fields
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.managerId !== undefined) updateData.manager_id = req.body.managerId ? parseInt(req.body.managerId) : null;
    if (req.body.email !== undefined) updateData.email = req.body.email;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.location !== undefined || req.body.address !== undefined) {
      updateData.address = req.body.location || req.body.address;
    }
    if (req.body.city !== undefined) updateData.city = req.body.city;
    if (req.body.state !== undefined) updateData.state = req.body.state;
    if (req.body.postal_code !== undefined) updateData.postal_code = req.body.postal_code;
    if (req.body.country !== undefined) updateData.country = req.body.country;
    if (req.body.business_registration !== undefined) updateData.business_registration = req.body.business_registration;
    if (req.body.trade_name !== undefined) updateData.trade_name = req.body.trade_name;
    if (req.body.tax_id !== undefined) updateData.tax_id = req.body.tax_id;
    if (req.body.website !== undefined) updateData.website = req.body.website;
    if (req.body.bank_name !== undefined) updateData.bank_name = req.body.bank_name;
    if (req.body.bank_account !== undefined) updateData.bank_account = req.body.bank_account;
    if (req.body.bank_account_name !== undefined) updateData.bank_account_name = req.body.bank_account_name;
    if (req.body.logo_url !== undefined) updateData.logo_url = req.body.logo_url;

    // Subscription fields - only update if explicitly provided (prevents accidental overwrites)
    if (req.body.planType !== undefined) updateData.plan_type = req.body.planType;
    if (req.body.planAmount !== undefined) updateData.plan_amount = parseFloat(req.body.planAmount);
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.subscriptionStart !== undefined) {
      updateData.subscription_start = req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : null;
    }
    if (req.body.subscriptionEnd !== undefined) {
      updateData.subscription_end = req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null;
    }

    // Settings objects
    if (req.body.payment_settings !== undefined) updateData.payment_settings = req.body.payment_settings;
    if (req.body.operation_settings !== undefined) updateData.operation_settings = req.body.operation_settings;
    if (req.body.table_settings !== undefined) updateData.table_settings = req.body.table_settings;

    // Brand association
    if (req.body.brand_id !== undefined) {
      updateData.brand_id = req.body.brand_id ? parseInt(req.body.brand_id) : null;
      console.log(`🏢 Updating brand_id to: ${updateData.brand_id}`);
    }

    // Cuisine field
    if (req.body.cuisine !== undefined) updateData.cuisine = req.body.cuisine;

    // Get manager name if managerId is being updated
    if (updateData.manager_id) {
      const User = require('../models/User');
      const manager = await User.findByPk(updateData.manager_id);
      if (manager) {
        updateData.manager_name = manager.full_name || manager.username;
        console.log('✅ Found manager:', manager.username, 'Setting manager_name to:', updateData.manager_name);
      } else {
        console.log('❌ Manager not found for ID:', updateData.manager_id);
      }
    } else {
      // Clear manager if no managerId provided
      updateData.manager_name = null;
      console.log('🔄 Clearing manager assignment');
    }

    console.log('📤 Updating restaurant with data:', updateData);

    await restaurant.update(updateData);

    // Handle multiple managers if managerIds array is provided
    if (req.body.managerIds && Array.isArray(req.body.managerIds)) {
      const RestaurantManager = require('../models/RestaurantManager');

      // Remove existing manager associations
      await RestaurantManager.destroy({
        where: { restaurant_id: restaurant.id }
      });
      console.log(`🗑️ Removed existing manager associations for restaurant ${restaurant.id}`);

      // Create new manager associations
      if (req.body.managerIds.length > 0) {
        const managerAssociations = req.body.managerIds.map((managerId, index) => ({
          restaurant_id: restaurant.id,
          manager_id: managerId,
          is_primary: index === 0 // First manager is primary
        }));

        await RestaurantManager.bulkCreate(managerAssociations);
        console.log(`✅ Created ${managerAssociations.length} new manager associations for restaurant ${restaurant.id}`);
      }
    }

    console.log('✅ Restaurant updated successfully:', restaurant.toJSON());
    res.json({ success: true, restaurant });
  } catch (error) {
    console.error('❌ Error updating restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
  }
});

// Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    console.log('📥 Received restaurant delete request for ID:', req.params.id);

    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    console.log('📤 Deleting restaurant:', restaurant.name);

    await restaurant.destroy();

    console.log('✅ Restaurant deleted successfully');
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant', details: error.message });
  }
});

// Update restaurant status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    await restaurant.update({ status });
    res.json({ success: true, restaurant });
  } catch (error) {
    console.error('Error updating restaurant status:', error);
    res.status(500).json({ error: 'Failed to update restaurant status' });
  }
});

// Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    await restaurant.destroy();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// Get subscription data for manager
router.get('/subscriptions/manager/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;
    
    // Get restaurants managed by this manager with invoice and order data
    const restaurants = await Restaurant.findAll({
      where: { manager_id: managerId },
      include: [
        {
          model: Invoice,
          as: 'invoices',
          attributes: ['id', 'status', 'paid_at', 'total_amount', 'due_date', 'billing_period_start', 'billing_period_end'],
          required: false
        },
        {
          model: Order,
          as: 'orders',
          attributes: ['id', 'total_amount', 'status', 'order_date'],
          required: false,
          where: {
            order_date: {
              [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // This month
            }
          }
        }
      ]
    });

    // Transform data to match frontend RestaurantSubscription interface
    const subscriptions = restaurants.map(restaurant => {
      const invoices = restaurant.invoices || [];
      const orders = restaurant.orders || [];
      
      // Get latest paid invoice for last payment info
      const lastPaidInvoice = invoices
        .filter(inv => inv.status === 'paid' && inv.paid_at)
        .sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at))[0];
        
      // Get next unpaid invoice for next payment
      const nextInvoice = invoices
        .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];

      // Calculate current month orders
      const currentOrders = orders.filter(order => order.status === 'completed').length;
      
      // Determine order limit based on plan
      const orderLimits = {
        'Basic Plan': 1000,
        'Professional Plan': 10000,
        'Enterprise Plan': -1 // Unlimited
      };

      // Calculate fees based on plan
      const planFees = {
        'Basic Plan': { monthly: 29, annual: 290 },
        'Professional Plan': { monthly: 99, annual: 990 },
        'Enterprise Plan': { monthly: 199, annual: 2190 }
      };

      const fees = planFees[restaurant.plan_type] || planFees['Basic Plan'];

      return {
        id: `sub-${restaurant.id}`,
        restaurantId: restaurant.id.toString(),
        restaurantName: restaurant.name,
        managerId: restaurant.manager_id.toString(),
        managerName: restaurant.manager_name,
        planType: restaurant.plan_type.toLowerCase().replace(' plan', ''),
        status: restaurant.status,
        startDate: restaurant.subscription_start?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        endDate: restaurant.subscription_end?.toISOString().split('T')[0] || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
        monthlyFee: fees.monthly,
        annualFee: fees.annual,
        billingCycle: 'monthly', // Default to monthly
        paymentModel: 'manager', // Default to manager pays
        payerId: restaurant.manager_id.toString(),
        payerName: restaurant.manager_name,
        orderLimit: orderLimits[restaurant.plan_type] || 1000,
        currentOrders: currentOrders,
        features: [], // Will be filled by frontend based on plan
        lastPayment: lastPaidInvoice ? lastPaidInvoice.paid_at.toISOString().split('T')[0] : '-',
        nextPayment: nextInvoice ? nextInvoice.due_date.toISOString().split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        autoRenew: restaurant.status === 'active',
        location: restaurant.address || 'No address provided'
      };
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching manager subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch manager subscriptions' });
  }
});

// Add new subscription for restaurant
router.post('/subscriptions', async (req, res) => {
  try {
    const { restaurantId, managerId, planType, billingCycle, paymentModel } = req.body;
    
    // Get restaurant
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Get manager
    const manager = await User.findByPk(managerId);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    // Plan pricing
    const planPrices = {
      'basic': { monthly: 29, annual: 290 },
      'professional': { monthly: 99, annual: 990 },
      'enterprise': { monthly: 199, annual: 2190 }
    };

    const fees = planPrices[planType] || planPrices['basic'];

    // Update restaurant with subscription info
    await restaurant.update({
      manager_id: managerId,
      manager_name: manager.full_name || manager.username,
      plan_type: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
      plan_amount: fees.monthly,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });

    // Create first invoice
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); // 30 days from now

    const invoice = await Invoice.create({
      restaurant_id: restaurantId,
      invoice_number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      type: 'manual',
      billing_period_start: new Date(),
      billing_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      due_date: dueDate,
      total_amount: billingCycle === 'annual' ? fees.annual * 1.06 : fees.monthly * 1.06, // Including 6% tax
      status: 'sent',
      notes: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle} subscription`,
      issued_by: managerId,
      issued_at: new Date()
    });

    // Create invoice item
    await require('../models/InvoiceItem').create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle} Subscription`,
      calculation_method: 'fixed',
      fixed_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      calculated_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      tax_rate: 6.0,
      tax_amount: (billingCycle === 'annual' ? fees.annual : fees.monthly) * 0.06,
      total_amount: (billingCycle === 'annual' ? fees.annual : fees.monthly) * 1.06
    });

    res.json({ success: true, message: 'Subscription added successfully' });
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).json({ error: 'Failed to add subscription' });
  }
});

// Get available restaurants for manager (restaurants without active subscriptions)
router.get('/available/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;
    
    // Get all restaurants that are either unassigned or inactive
    const availableRestaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { manager_id: null },
          { status: 'inactive' }
        ]
      },
      attributes: ['id', 'name', 'address', 'status']
    });
    
    res.json(availableRestaurants.map(restaurant => ({
      id: restaurant.id.toString(),
      name: restaurant.name,
      location: restaurant.address || 'No address provided'
    })));
  } catch (error) {
    console.error('Error fetching available restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch available restaurants' });
  }
});

// Get categories for a specific restaurant
router.get('/:id/categories', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📂 GET /api/restaurant/${id}/categories - Request received`);

    // Verify restaurant exists
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    // Get categories from categories table filtered by restaurant
    const categories = await Category.findAll({
      where: {
        isActive: true,
        restaurant_id: id
      },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Get product counts for each category
    const categoryData = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.count({
          where: {
            category: cat.name,
            restaurant_id: id
          }
        });
        return {
          id: cat.id,
          name: cat.name,
          emoji: cat.emoji || '🍽️',
          description: cat.description,
          displayOrder: cat.displayOrder,
          isActive: cat.isActive,
          productCount: count
        };
      })
    );

    console.log(`✅ Found ${categoryData.length} categories for restaurant ${id}`);
    res.json({ success: true, data: categoryData });
  } catch (error) {
    console.error('Error fetching restaurant categories:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get allowed routes for a restaurant based on their plan
router.get('/:id/allowed-routes', async (req, res) => {
  try {
    const { id } = req.params;

    // Find restaurant
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Find plan
    const plan = await PlanTemplate.findOne({
      where: { display_name: restaurant.plan_type }
    });

    if (!plan) {
      // If no plan found, return empty routes (restricted access)
      return res.json({
        restaurant_id: restaurant.id,
        plan_type: restaurant.plan_type,
        included_modules: [],
        allowed_routes: []
      });
    }

    // Get included modules from plan
    const includedModuleCodes = plan.included_modules || [];

    if (includedModuleCodes.length === 0) {
      // No modules included, return empty routes
      return res.json({
        restaurant_id: restaurant.id,
        plan_type: restaurant.plan_type,
        included_modules: [],
        allowed_routes: []
      });
    }

    // Find all modules with these codes
    const modules = await AddonModule.findAll({
      where: {
        module_code: includedModuleCodes,
        is_active: true
      }
    });

    // Collect all UI routes from modules
    const allowedRoutes = modules.reduce((routes, module) => {
      const moduleRoutes = module.ui_routes || [];
      return [...routes, ...moduleRoutes];
    }, []);

    // Remove duplicates
    const uniqueRoutes = [...new Set(allowedRoutes)];

    res.json({
      restaurant_id: restaurant.id,
      plan_type: restaurant.plan_type,
      included_modules: includedModuleCodes,
      allowed_routes: uniqueRoutes,
      modules: modules.map(m => ({
        code: m.module_code,
        name: m.name,
        category: m.category
      }))
    });
  } catch (error) {
    console.error('Error fetching allowed routes:', error);
    res.status(500).json({ error: 'Failed to fetch allowed routes' });
  }
});

// ============================================
// Restaurant Ingredients Routes
// ============================================

router.get('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId },
      order: [['name', 'ASC']]
    });
    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

router.post('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;
    const ingredient = await Ingredient.create({
      brand_id: null,
      restaurant_id: restaurantId,
      code, name, category, unit, unit_cost, supplier_name,
      min_stock: min_stock || 0,
      current_stock: 0
    });
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 생성 실패' });
  }
});

router.put('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock, image_url, ingredient_category_id, base_quantity, supplier_id, track_stock } = req.body;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ error: '재료를 찾을 수 없습니다' });

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (unit !== undefined) updateData.unit = unit;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    await ingredient.update(updateData);
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 수정 실패' });
  }
});

router.delete('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    await ingredient.destroy();
    res.json({ success: true, message: '재료가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 삭제 실패' });
  }
});

// ============================================
// Restaurant Recipes Routes - MOVED TO /routes/recipes.js
// ============================================

// ============================================
// Inventory Routes - Mount inventory router
// ============================================
const inventoryRoutes = require('./inventory-routes');
router.use('/', inventoryRoutes);

module.exports = router;