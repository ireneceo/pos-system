#!/usr/bin/env node
/**
 * Demo Data Seed Script
 *
 * Two modes:
 *   node seed-demo-data.js              → Full initial seed (run once)
 *   node seed-demo-data.js --reset      → Daily reset: orders + invoices only
 *
 * seedDemoData()    — Creates everything from scratch (users, brand, restaurants, menus, etc.)
 * resetDemoOrders() — Deletes only orders + invoices, then re-creates with fresh dates
 */

require('dotenv/config');
const bcrypt = require('bcrypt');
const { sequelize } = require('./config/database');
const { Op } = require('sequelize');

// Demo account credentials (matches DemoPage.tsx)
const DEMO_BRAND_EMAIL = 'demo-brand@purplehere.com';
const DEMO_RESTAURANT_EMAIL = 'demo-restaurant@purplehere.com';
const DEMO_PASSWORD = 'Demo@2024';

// Demo entity identifiers
const DEMO_BRAND_CODE = 'DEMO-BRAND';
const DEMO_RESTAURANT_SLUGS = ['demo-korean-bbq', 'demo-noodle-house'];

// ================================================================
// SHARED: Order & Invoice generation helpers
// ================================================================

function generateOrders(restaurant1Id, restaurant2Id) {
  const now = new Date();
  const orderStatuses = ['pending', 'preparing', 'ready', 'completed', 'completed', 'completed', 'cancelled', 'served'];
  const orderTypes = ['dine_in', 'dine_in', 'dine_in', 'takeaway', 'takeaway', 'delivery'];
  const paymentMethods = ['cash', 'card', 'e_wallet', 'qr_payment'];

  // Restaurant 1: 30 days of orders
  const r1Orders = [];
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const orderDate = new Date(now);
    orderDate.setDate(orderDate.getDate() - dayOffset);

    const orderCount = dayOffset < 3 ? 5 : dayOffset < 7 ? 3 : dayOffset < 14 ? 2 : 1;

    for (let i = 0; i < orderCount; i++) {
      const status = dayOffset === 0 && i < 3
        ? ['pending', 'preparing', 'ready'][i]
        : orderStatuses[Math.floor(Math.random() * orderStatuses.length)];

      const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const isCompleted = ['completed', 'served'].includes(status);
      const isCancelled = status === 'cancelled';

      const itemCount = Math.floor(Math.random() * 4) + 1;
      const items = [];
      const menuPrices = [12.90, 15.90, 28.90, 24.90, 16.90, 14.90, 13.90, 18.90, 12.00, 10.00];
      const menuNames = ['Kimchi Pancake', 'Korean Fried Chicken', 'Bulgogi Beef', 'Samgyeopsal', 'Bibimbap', 'Kimchi Fried Rice', 'Sundubu Jjigae', 'Galbitang', 'Soju', 'Korean Beer'];

      let subtotal = 0;
      for (let j = 0; j < itemCount; j++) {
        const idx = Math.floor(Math.random() * menuNames.length);
        const qty = Math.floor(Math.random() * 2) + 1;
        const itemTotal = menuPrices[idx] * qty;
        subtotal += itemTotal;
        items.push({ name: menuNames[idx], quantity: qty, price: menuPrices[idx], total: itemTotal });
      }

      const taxRate = 6;
      const serviceChargeRate = 10;
      const tax = Math.round(subtotal * taxRate) / 100;
      const serviceCharge = Math.round(subtotal * serviceChargeRate) / 100;
      const totalAmount = Math.round((subtotal + tax + serviceCharge) * 100) / 100;

      const datePrefix = `${orderDate.getFullYear().toString().slice(-2)}${(orderDate.getMonth()+1).toString().padStart(2,'0')}${orderDate.getDate().toString().padStart(2,'0')}`;

      // Set createdAt to order time (randomized hour) so orders appear as "recent"
      const orderCreatedAt = new Date(orderDate);
      orderCreatedAt.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

      r1Orders.push({
        restaurant_id: restaurant1Id,
        order_number: `${datePrefix}-${(i+1).toString().padStart(3, '0')}`,
        customer_name: ['', 'Alex Wong', 'Lisa Chen', 'David Tan', 'Michelle Lee'][Math.floor(Math.random() * 5)] || null,
        table_number: orderType === 'dine_in' ? String(Math.floor(Math.random() * 20) + 1) : null,
        total_amount: totalAmount,
        subtotal: subtotal,
        tax: tax,
        tax_rate: taxRate,
        service_charge: serviceCharge,
        service_charge_rate: serviceChargeRate,
        status: status,
        order_type: orderType,
        source: 'pos',
        payment_method: isCompleted ? paymentMethod : null,
        card_type: isCompleted && paymentMethod === 'card' ? ['visa', 'master', 'amex'][Math.floor(Math.random() * 3)] : null,
        payment_status: isCompleted ? 'completed' : (isCancelled ? 'failed' : 'pending'),
        kitchen_ready: ['preparing', 'ready', 'completed', 'served'].includes(status),
        order_date: orderDate,
        order_items: JSON.stringify(items),
        createdAt: orderCreatedAt
      });
    }
  }

  // Restaurant 2: 14 days of orders
  const r2Orders = [];
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const orderDate = new Date(now);
    orderDate.setDate(orderDate.getDate() - dayOffset);
    const orderCount = dayOffset < 3 ? 3 : 1;

    for (let i = 0; i < orderCount; i++) {
      const status = dayOffset === 0 && i === 0 ? 'preparing' : 'completed';
      const subtotal = Math.round((Math.random() * 30 + 10) * 100) / 100;
      const tax = Math.round(subtotal * 6) / 100;
      const totalAmount = Math.round((subtotal + tax) * 100) / 100;

      const datePrefix = `${orderDate.getFullYear().toString().slice(-2)}${(orderDate.getMonth()+1).toString().padStart(2,'0')}${orderDate.getDate().toString().padStart(2,'0')}`;

      const orderCreatedAt2 = new Date(orderDate);
      orderCreatedAt2.setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

      r2Orders.push({
        restaurant_id: restaurant2Id,
        order_number: `${datePrefix}-${(i+1).toString().padStart(3, '0')}`,
        total_amount: totalAmount,
        subtotal: subtotal,
        tax: tax,
        tax_rate: 6,
        status: status,
        order_type: 'dine_in',
        source: 'pos',
        payment_method: status === 'completed' ? 'cash' : null,
        payment_status: status === 'completed' ? 'completed' : 'pending',
        kitchen_ready: status !== 'pending',
        order_date: orderDate,
        order_items: JSON.stringify([{ name: 'Spicy Ramyeon', quantity: 1, price: subtotal, total: subtotal }]),
        createdAt: orderCreatedAt2
      });
    }
  }

  return { r1Orders, r2Orders };
}

function generateInvoices(restaurant1Id, restaurant2Id, demoBrandId, demoBrandUserId, systemAdminId) {
  const now = new Date();
  const invoices = [];
  let invoiceIdx = 0;

  const addInvoice = (data) => {
    invoiceIdx++;
    const issuedBy = data.issuer_type === 'brand' ? demoBrandUserId : systemAdminId;
    invoices.push({ ...data, invoice_number: `INV-DEMO-${invoiceIdx.toString().padStart(3, '0')}`, issued_by: issuedBy });
  };

  // Restaurant 1 - System Admin subscription invoices (3 months)
  for (let m = 0; m < 3; m++) {
    const billingStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const billingEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0);
    const dueDate = new Date(billingEnd);
    dueDate.setDate(dueDate.getDate() + 14);
    const status = m === 0 ? 'pending_payment' : 'paid';

    addInvoice({
      restaurant_id: restaurant1Id,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: 199.00,
      subtotal: 199.00,
      currency: 'MYR',
      paid_amount: status === 'paid' ? 199.00 : 0,
      status: status,
      issuer_type: 'system_admin',
      payer_type: 'restaurant',
      payer_id: restaurant1Id,
      issued_at: billingStart,
      paid_at: status === 'paid' ? new Date(dueDate.getTime() - 86400000 * 3) : null,
      payment_method: status === 'paid' ? 'bank_transfer' : null,
      invoice_category: 'pos_subscription',
      category_display_name: 'POS Subscription',
      service_description: 'Professional Plan - Monthly subscription'
    });
  }

  // Restaurant 1 - Brand invoices (royalty)
  for (let m = 0; m < 3; m++) {
    const billingStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const billingEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0);
    const dueDate = new Date(billingEnd);
    dueDate.setDate(dueDate.getDate() + 30);
    const status = m === 0 ? 'pending_payment' : m === 1 ? 'overdue' : 'paid';

    addInvoice({
      restaurant_id: restaurant1Id,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: 500.00,
      subtotal: 500.00,
      currency: 'MYR',
      paid_amount: status === 'paid' ? 500.00 : 0,
      status: status,
      issuer_type: 'brand',
      issuer_id: demoBrandId,
      payer_type: 'restaurant',
      payer_id: restaurant1Id,
      issued_at: billingStart,
      paid_at: status === 'paid' ? new Date(dueDate.getTime() - 86400000 * 5) : null,
      payment_method: status === 'paid' ? 'bank_transfer' : null,
      invoice_category: 'brand_royalty',
      category_display_name: 'Brand Royalty Fee',
      service_description: 'Monthly brand royalty fee'
    });
  }

  // Restaurant 2 - System Admin subscription (2 months)
  for (let m = 0; m < 2; m++) {
    const billingStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const billingEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0);
    const dueDate = new Date(billingEnd);
    dueDate.setDate(dueDate.getDate() + 14);

    addInvoice({
      restaurant_id: restaurant2Id,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: 99.00,
      subtotal: 99.00,
      currency: 'MYR',
      paid_amount: m === 0 ? 0 : 99.00,
      status: m === 0 ? 'pending_payment' : 'paid',
      issuer_type: 'system_admin',
      payer_type: 'restaurant',
      payer_id: restaurant2Id,
      issued_at: billingStart,
      paid_at: m === 1 ? billingEnd : null,
      payment_method: m === 1 ? 'card' : null,
      invoice_category: 'pos_subscription',
      category_display_name: 'POS Subscription',
      service_description: 'Basic Plan - Monthly subscription'
    });
  }

  // Manual invoice (cancelled)
  addInvoice({
    restaurant_id: restaurant1Id,
    type: 'manual',
    due_date: new Date(now.getFullYear(), now.getMonth(), 15),
    total_amount: 150.00,
    subtotal: 150.00,
    currency: 'MYR',
    paid_amount: 0,
    status: 'cancelled',
    issuer_type: 'system_admin',
    payer_type: 'restaurant',
    payer_id: restaurant1Id,
    issued_at: new Date(now.getFullYear(), now.getMonth(), 1),
    invoice_category: 'others',
    category_display_name: 'Others',
    custom_description: 'Setup fee (waived)',
    service_description: 'One-time setup and configuration fee - WAIVED'
  });

  // Payment submitted status
  addInvoice({
    restaurant_id: restaurant1Id,
    type: 'automatic',
    billing_period_start: new Date(now.getFullYear(), now.getMonth(), 1),
    billing_period_end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    due_date: new Date(now.getFullYear(), now.getMonth() + 1, 14),
    total_amount: 299.00,
    subtotal: 299.00,
    currency: 'MYR',
    paid_amount: 0,
    status: 'payment_submitted',
    issuer_type: 'brand',
    issuer_id: demoBrandId,
    payer_type: 'restaurant',
    payer_id: restaurant1Id,
    issued_at: new Date(now.getFullYear(), now.getMonth(), 1),
    payment_submitted_at: new Date(),
    invoice_category: 'brand_marketing',
    category_display_name: 'Brand Marketing Fee',
    service_description: 'Monthly marketing contribution'
  });

  return invoices;
}

// ================================================================
// FULL INITIAL SEED (run once)
// ================================================================

async function seedDemoData() {
  const t = await sequelize.transaction();

  try {
    console.log('🎭 [DEMO SEED] Starting full demo data seed...');

    // Load models
    const User = require('./models/User');
    const Brand = require('./models/Brand');
    const Restaurant = require('./models/Restaurant');
    const Category = require('./models/Category');
    const Product = require('./models/Product');
    const Order = require('./models/Order');
    const Invoice = require('./models/Invoice');
    const RestaurantManager = require('./models/RestaurantManager');
    const Notice = require('./models/Notice');
    const NoticeRecipient = require('./models/NoticeRecipient');
    const SupportTicket = require('./models/SupportTicket');
    const OperationTicket = require('./models/OperationTicket');
    const Customer = require('./models/Customer');
    const RestaurantCustomer = require('./models/RestaurantCustomer');
    const Coupon = require('./models/Coupon');
    const Supplier = require('./models/Supplier');
    const Recipe = require('./models/Recipe');
    const RecipeCategory = require('./models/RecipeCategory');
    const RecipeIngredient = require('./models/RecipeIngredient');
    const Ingredient = require('./models/Ingredient');
    const IngredientCategory = require('./models/IngredientCategory');
    const EntityPlan = require('./models/EntityPlan');
    const EntityPlanPrice = require('./models/EntityPlanPrice');
    const EntityPlanRestaurant = require('./models/EntityPlanRestaurant');
    const InvoiceSettings = require('./models/InvoiceSettings');

    // ========================================
    // STEP 1: Clean up existing demo data
    // ========================================
    console.log('🧹 [DEMO SEED] Cleaning existing demo data...');

    const existingDemoBrand = await Brand.findOne({
      where: { code: DEMO_BRAND_CODE },
      transaction: t
    });

    const existingDemoRestaurants = await Restaurant.findAll({
      where: { slug: { [Op.in]: DEMO_RESTAURANT_SLUGS } },
      transaction: t
    });
    const demoRestaurantIds = existingDemoRestaurants.map(r => r.id);

    if (demoRestaurantIds.length > 0) {
      // Recipe ingredients → Recipes → Recipe categories
      const demoRecipes = await Recipe.findAll({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, attributes: ['id'], transaction: t });
      const demoRecipeIds = demoRecipes.map(r => r.id);
      if (demoRecipeIds.length > 0) {
        await RecipeIngredient.destroy({ where: { recipe_id: { [Op.in]: demoRecipeIds } }, transaction: t });
      }
      await Recipe.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await RecipeCategory.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Ingredient.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await IngredientCategory.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Supplier.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Coupon.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

      // Customers
      const demoCustomerLinks = await RestaurantCustomer.findAll({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, attributes: ['customer_id'], transaction: t });
      const demoCustomerIds = demoCustomerLinks.map(c => c.customer_id);
      await RestaurantCustomer.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      if (demoCustomerIds.length > 0) {
        for (const cid of demoCustomerIds) {
          const otherLinks = await RestaurantCustomer.count({ where: { customer_id: cid }, transaction: t });
          if (otherLinks === 0) await Customer.destroy({ where: { id: cid }, transaction: t });
        }
      }

      // Tickets
      await SupportTicket.destroy({ where: { restaurantId: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await OperationTicket.destroy({ where: { restaurantId: { [Op.in]: demoRestaurantIds } }, transaction: t });

      // Orders
      await Order.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

      // Invoices (with invoice_items)
      const demoInvoices = await Invoice.findAll({
        where: { restaurant_id: { [Op.in]: demoRestaurantIds } },
        attributes: ['id'],
        transaction: t
      });
      const demoInvoiceIds = demoInvoices.map(i => i.id);
      if (demoInvoiceIds.length > 0) {
        await sequelize.query('DELETE FROM invoice_items WHERE invoice_id IN (?)', {
          replacements: [demoInvoiceIds],
          transaction: t
        });
      }
      await Invoice.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

      // Invoice settings
      await InvoiceSettings.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

      await Product.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Category.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await NoticeRecipient.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await EntityPlanRestaurant.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await RestaurantManager.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Restaurant.destroy({ where: { id: { [Op.in]: demoRestaurantIds } }, transaction: t });
    }

    // Clean demo notices (by brand)
    if (existingDemoBrand) {
      // Entity plans
      const demoPlans = await EntityPlan.findAll({ where: { entity_type: 'brand', entity_id: existingDemoBrand.id }, attributes: ['id'], transaction: t });
      const demoPlanIds = demoPlans.map(p => p.id);
      if (demoPlanIds.length > 0) {
        await EntityPlanRestaurant.destroy({ where: { entity_plan_id: { [Op.in]: demoPlanIds } }, transaction: t });
        await EntityPlanPrice.destroy({ where: { entity_plan_id: { [Op.in]: demoPlanIds } }, transaction: t });
        await EntityPlan.destroy({ where: { id: { [Op.in]: demoPlanIds } }, transaction: t });
      }

      const demoNotices = await Notice.findAll({ where: { brand_id: existingDemoBrand.id }, attributes: ['id'], transaction: t });
      const demoNoticeIds = demoNotices.map(n => n.id);
      if (demoNoticeIds.length > 0) {
        await NoticeRecipient.destroy({ where: { notice_id: { [Op.in]: demoNoticeIds } }, transaction: t });
      }
      await Notice.destroy({ where: { brand_id: existingDemoBrand.id }, transaction: t });

      // Unlink any non-demo restaurants
      const brandRestaurants = await Restaurant.findAll({
        where: { brand_id: existingDemoBrand.id, slug: { [Op.notIn]: DEMO_RESTAURANT_SLUGS } },
        transaction: t
      });
      for (const r of brandRestaurants) {
        await r.update({ brand_id: null }, { transaction: t });
      }
      await Brand.destroy({ where: { id: existingDemoBrand.id }, transaction: t });
    }

    console.log('✓ [DEMO SEED] Existing demo data cleaned');

    // ========================================
    // STEP 2: Hash password
    // ========================================
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    // ========================================
    // STEP 3: Create/Update demo users
    // ========================================
    console.log('👤 [DEMO SEED] Creating demo users...');

    let demoBrandUser = await User.findOne({ where: { email: DEMO_BRAND_EMAIL }, transaction: t });
    if (demoBrandUser) {
      await demoBrandUser.update({
        password: hashedPassword, is_demo: true, role: 'Brand General',
        full_name: 'Sarah Kim (Demo)', username: 'demo-brand',
        restaurant_id: null, brand_id: null, foodcourt_id: null
      }, { transaction: t });
    } else {
      demoBrandUser = await User.create({
        email: DEMO_BRAND_EMAIL, username: 'demo-brand', password: hashedPassword,
        role: 'Brand General', full_name: 'Sarah Kim (Demo)', is_demo: true
      }, { transaction: t });
    }

    let demoRestaurantUser = await User.findOne({ where: { email: DEMO_RESTAURANT_EMAIL }, transaction: t });
    if (demoRestaurantUser) {
      await demoRestaurantUser.update({
        password: hashedPassword, is_demo: true, role: 'Restaurant Admin',
        full_name: 'James Park (Demo)', username: 'demo-restaurant',
        restaurant_id: null, brand_id: null, foodcourt_id: null
      }, { transaction: t });
    } else {
      demoRestaurantUser = await User.create({
        email: DEMO_RESTAURANT_EMAIL, username: 'demo-restaurant', password: hashedPassword,
        role: 'Restaurant Admin', full_name: 'James Park (Demo)', is_demo: true
      }, { transaction: t });
    }

    console.log(`✓ [DEMO SEED] Demo users: Brand(id:${demoBrandUser.id}), Restaurant(id:${demoRestaurantUser.id})`);

    // ========================================
    // STEP 4: Create demo brand
    // ========================================
    console.log('🏢 [DEMO SEED] Creating demo brand...');

    const demoBrand = await Brand.create({
      name: 'K-Taste Group',
      code: DEMO_BRAND_CODE,
      description: 'Premium Korean dining franchise with authentic recipes',
      owner_id: demoBrandUser.id,
      status: 'active',
      company_name: 'K-Taste Holdings Sdn Bhd',
      email: 'brand@demo.purplehere.com',
      phone: '+60-12-345-6789',
      address: '123 Jalan Bukit Bintang',
      city: 'Kuala Lumpur',
      state: 'WP Kuala Lumpur',
      postal_code: '55100',
      country: 'Malaysia',
      currency: 'RM',
      operation_settings: JSON.stringify({
        timezone: 'Asia/Kuala_Lumpur',
        opening_time: '10:00',
        closing_time: '22:00'
      }),
      invoice_settings: JSON.stringify({
        prefix: 'INV-DEMO',
        payment_terms: 30,
        tax_rate: 0,
        auto_generate: true
      }),
      payment_settings: JSON.stringify({
        defaultCurrency: 'MYR',
        bankTransfer: {
          enabled: true,
          bankName: 'Maybank',
          accountName: 'K-Taste Holdings Sdn Bhd',
          accountNumber: '5123-4567-8901',
          swiftCode: 'MBBEMYKL'
        },
        qrPayment: {
          enabled: true,
          provider: 'DuitNow'
        },
        additionalCharges: {
          royaltyFee: { enabled: true, type: 'percentage', value: 5, label: 'Royalty Fee' },
          marketingFee: { enabled: true, type: 'fixed', value: 299, label: 'Marketing Contribution' }
        }
      })
    }, { transaction: t });

    await demoBrandUser.update({ brand_id: demoBrand.id }, { transaction: t });

    console.log(`✓ [DEMO SEED] Demo brand: ${demoBrand.name} (id:${demoBrand.id})`);

    // ========================================
    // STEP 5: Create demo restaurants
    // ========================================
    console.log('🍽️ [DEMO SEED] Creating demo restaurants...');

    const restaurant1 = await Restaurant.create({
      name: 'Seoul Garden BBQ',
      slug: DEMO_RESTAURANT_SLUGS[0],
      admin_id: demoRestaurantUser.id,
      admin_name: demoRestaurantUser.full_name,
      email: 'bbq@demo.purplehere.com',
      phone: '+60-12-111-2222',
      address: '45 Jalan Alor, Bukit Bintang',
      city: 'Kuala Lumpur',
      state: 'WP Kuala Lumpur',
      postal_code: '50200',
      country: 'Malaysia',
      brand_id: demoBrand.id,
      plan_type: 'Professional Plan',
      plan_amount: 199.00,
      billing_cycle: 'monthly',
      status: 'active',
      currency: 'RM',
      payment_model: 'restaurant',
      subscription_start: new Date('2025-01-01'),
      operation_settings: JSON.stringify({
        timezone: 'Asia/Kuala_Lumpur',
        opening_time: '11:00',
        closing_time: '23:00',
        tax_rate: 6,
        service_charge_rate: 10,
        order_types: ['dine_in', 'takeaway', 'delivery']
      }),
      payment_settings: JSON.stringify({
        cash: { enabled: true },
        card: { enabled: true },
        e_wallet: { enabled: true, providers: ['Touch n Go', 'GrabPay'] },
        qr_payment: { enabled: true }
      })
    }, { transaction: t });

    await demoRestaurantUser.update({ restaurant_id: restaurant1.id }, { transaction: t });

    const restaurant2 = await Restaurant.create({
      name: 'Gangnam Noodle House',
      slug: DEMO_RESTAURANT_SLUGS[1],
      email: 'noodle@demo.purplehere.com',
      phone: '+60-12-333-4444',
      address: '78 Pavilion KL, Jalan Bukit Bintang',
      city: 'Kuala Lumpur',
      state: 'WP Kuala Lumpur',
      postal_code: '55100',
      country: 'Malaysia',
      brand_id: demoBrand.id,
      plan_type: 'Basic Plan',
      plan_amount: 99.00,
      billing_cycle: 'monthly',
      status: 'active',
      currency: 'RM',
      payment_model: 'brand_manager',
      subscription_start: new Date('2025-06-01'),
      operation_settings: JSON.stringify({
        timezone: 'Asia/Kuala_Lumpur',
        opening_time: '10:00',
        closing_time: '22:00',
        tax_rate: 6,
        service_charge_rate: 0,
        order_types: ['dine_in', 'takeaway']
      })
    }, { transaction: t });

    await RestaurantManager.bulkCreate([
      { restaurant_id: restaurant1.id, manager_id: demoBrandUser.id, is_primary: true, relationship_type: 'oversight' },
      { restaurant_id: restaurant2.id, manager_id: demoBrandUser.id, is_primary: true, relationship_type: 'oversight' }
    ], { transaction: t });

    console.log(`✓ [DEMO SEED] Restaurants: ${restaurant1.name} (id:${restaurant1.id}), ${restaurant2.name} (id:${restaurant2.id})`);

    // ========================================
    // STEP 6: Brand subscription plans (EntityPlan)
    // ========================================
    console.log('📋 [DEMO SEED] Creating brand subscription plans...');

    const plan1 = await EntityPlan.create({
      entity_type: 'brand',
      entity_id: demoBrand.id,
      name: 'Standard Franchise Plan',
      description: 'Monthly franchise fee for standard outlets with basic support',
      auto_generate: true,
      currency: 'MYR',
      is_active: true,
      category: 'custom',
      is_popular: true,
      charge_type: 'fixed',
      billing_day: 1,
      features: ['Brand menu access', 'Marketing materials', 'Staff training guide', 'Monthly performance report'],
      included_modules: ['pos', 'kitchen_display', 'menu_management', 'reports'],
      menu_item_limit: -1,
      order_limit: -1,
      staff_limit: 10,
      created_by: demoBrandUser.id
    }, { transaction: t });

    await EntityPlanPrice.create({
      entity_plan_id: plan1.id,
      currency: 'MYR',
      monthly_price: 500.00,
      annual_price: 5400.00,
      is_active: true
    }, { transaction: t });

    const plan2 = await EntityPlan.create({
      entity_type: 'brand',
      entity_id: demoBrand.id,
      name: 'Premium Franchise Plan',
      description: 'Premium franchise package with priority support and advanced features',
      auto_generate: true,
      currency: 'MYR',
      is_active: true,
      category: 'custom',
      is_popular: false,
      charge_type: 'fixed',
      billing_day: 1,
      features: ['All Standard features', 'Priority support', 'Custom menu design', 'Advanced analytics', 'Dedicated account manager'],
      included_modules: ['pos', 'kitchen_display', 'menu_management', 'reports', 'customer_display', 'mobile_order', 'inventory'],
      menu_item_limit: -1,
      order_limit: -1,
      staff_limit: -1,
      created_by: demoBrandUser.id
    }, { transaction: t });

    await EntityPlanPrice.create({
      entity_plan_id: plan2.id,
      currency: 'MYR',
      monthly_price: 800.00,
      annual_price: 8640.00,
      is_active: true
    }, { transaction: t });

    const plan3 = await EntityPlan.create({
      entity_type: 'brand',
      entity_id: demoBrand.id,
      name: 'Revenue Share Plan',
      description: 'No fixed fee - pay 5% of monthly revenue',
      auto_generate: true,
      currency: 'MYR',
      is_active: true,
      category: 'custom',
      charge_type: 'percentage',
      percentage_value: 5.00,
      revenue_base: 'previous_month',
      billing_day: 5,
      features: ['No upfront cost', 'All Standard features', 'Revenue-based pricing'],
      included_modules: ['pos', 'kitchen_display', 'menu_management', 'reports'],
      created_by: demoBrandUser.id
    }, { transaction: t });

    // Assign plans to restaurants
    await EntityPlanRestaurant.bulkCreate([
      { entity_plan_id: plan1.id, restaurant_id: restaurant1.id, activation_date: '2025-01-01', is_active: true, discount_type: 'none', discount_value: 0 },
      { entity_plan_id: plan2.id, restaurant_id: restaurant2.id, activation_date: '2025-06-01', is_active: true, discount_type: 'percentage', discount_value: 10, discount_reason: 'New outlet promotion' }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Brand plans created: 3 (2 assigned to restaurants)');

    // ========================================
    // STEP 7: Invoice settings per restaurant
    // ========================================
    console.log('⚙️ [DEMO SEED] Creating invoice settings...');

    await InvoiceSettings.bulkCreate([
      {
        restaurant_id: restaurant1.id,
        auto_generate: true,
        generation_day: 1,
        payment_terms: 14,
        solution_fee_enabled: true,
        solution_fee_amount: 199.00,
        rent_enabled: false,
        tax_rate: 0,
        invoice_prefix: 'INV-SG',
        notes_template: 'Thank you for being part of K-Taste Group. Payment is due within 14 days.'
      },
      {
        restaurant_id: restaurant2.id,
        auto_generate: true,
        generation_day: 1,
        payment_terms: 14,
        solution_fee_enabled: true,
        solution_fee_amount: 99.00,
        rent_enabled: false,
        tax_rate: 0,
        invoice_prefix: 'INV-GN',
        notes_template: 'Thank you for being part of K-Taste Group.'
      }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Invoice settings created: 2');

    // ========================================
    // STEP 8: Create categories & products
    // ========================================
    console.log('📋 [DEMO SEED] Creating menu categories & products...');

    // --- Restaurant 1: Seoul Garden BBQ ---
    const r1Categories = await Category.bulkCreate([
      { name: 'Appetizers', restaurant_id: restaurant1.id },
      { name: 'BBQ Grills', restaurant_id: restaurant1.id },
      { name: 'Rice & Noodles', restaurant_id: restaurant1.id },
      { name: 'Soups & Stews', restaurant_id: restaurant1.id },
      { name: 'Beverages', restaurant_id: restaurant1.id },
      { name: 'Desserts', restaurant_id: restaurant1.id }
    ], { transaction: t });

    const r1CatMap = {};
    r1Categories.forEach(c => { r1CatMap[c.name] = c.id.toString(); });

    await Product.bulkCreate([
      { name: 'Kimchi Pancake', price: 12.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: 'Crispy Korean pancake with kimchi', is_active: true },
      { name: 'Korean Fried Chicken', price: 15.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: '6 pcs crispy double-fried chicken', is_active: true },
      { name: 'Japchae', price: 10.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: 'Stir-fried glass noodles with vegetables', is_active: true },
      { name: 'Premium Wagyu Set', price: 68.00, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'A5 Wagyu beef 200g with sides', is_active: true },
      { name: 'Bulgogi Beef', price: 28.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Marinated sliced beef', is_active: true },
      { name: 'Samgyeopsal', price: 24.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Thick-cut pork belly', is_active: true },
      { name: 'Spicy Chicken BBQ', price: 22.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Gochujang marinated chicken', is_active: true, soldOut: true },
      { name: 'Bibimbap', price: 16.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Mixed rice bowl with vegetables and egg', is_active: true },
      { name: 'Kimchi Fried Rice', price: 14.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Fried rice with aged kimchi', is_active: true },
      { name: 'Cold Naengmyeon', price: 15.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Icy buckwheat noodles', is_active: true, soldOut: true },
      { name: 'Kimchi Jjigae', price: 14.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Spicy kimchi stew with pork', is_active: true },
      { name: 'Sundubu Jjigae', price: 13.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Soft tofu stew', is_active: true },
      { name: 'Galbitang', price: 18.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Short rib soup', is_active: true },
      { name: 'Soju (Original)', price: 12.00, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Korean Beer', price: 10.00, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Yuzu Tea', price: 6.90, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Sikhye', price: 5.90, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, description: 'Sweet rice drink', is_active: true },
      { name: 'Bingsu (Red Bean)', price: 16.90, category: r1CatMap['Desserts'], restaurant_id: restaurant1.id, description: 'Korean shaved ice', is_active: true },
      { name: 'Hotteok', price: 8.90, category: r1CatMap['Desserts'], restaurant_id: restaurant1.id, description: 'Sweet filled pancake', is_active: true }
    ], { transaction: t });

    // --- Restaurant 2: Gangnam Noodle House ---
    const r2Categories = await Category.bulkCreate([
      { name: 'Noodle Soups', restaurant_id: restaurant2.id },
      { name: 'Dry Noodles', restaurant_id: restaurant2.id },
      { name: 'Side Dishes', restaurant_id: restaurant2.id },
      { name: 'Drinks', restaurant_id: restaurant2.id }
    ], { transaction: t });

    const r2CatMap = {};
    r2Categories.forEach(c => { r2CatMap[c.name] = c.id.toString(); });

    await Product.bulkCreate([
      { name: 'Spicy Ramyeon', price: 12.90, category: r2CatMap['Noodle Soups'], restaurant_id: restaurant2.id, is_active: true },
      { name: 'Kalguksu', price: 14.90, category: r2CatMap['Noodle Soups'], restaurant_id: restaurant2.id, description: 'Handmade knife-cut noodles', is_active: true },
      { name: 'Seafood Jjamppong', price: 16.90, category: r2CatMap['Noodle Soups'], restaurant_id: restaurant2.id, description: 'Spicy seafood noodle soup', is_active: true },
      { name: 'Jajangmyeon', price: 13.90, category: r2CatMap['Dry Noodles'], restaurant_id: restaurant2.id, description: 'Black bean noodles', is_active: true },
      { name: 'Bibim Guksu', price: 11.90, category: r2CatMap['Dry Noodles'], restaurant_id: restaurant2.id, description: 'Spicy mixed noodles', is_active: true },
      { name: 'Mandu (6 pcs)', price: 8.90, category: r2CatMap['Side Dishes'], restaurant_id: restaurant2.id, description: 'Korean dumplings', is_active: true },
      { name: 'Iced Barley Tea', price: 3.90, category: r2CatMap['Drinks'], restaurant_id: restaurant2.id, is_active: true },
      { name: 'Coca-Cola', price: 3.50, category: r2CatMap['Drinks'], restaurant_id: restaurant2.id, is_active: true }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Menu categories & products created');

    // ========================================
    // STEP 9: Create orders (date-sensitive → also reset daily)
    // ========================================
    console.log('📦 [DEMO SEED] Creating demo orders...');

    const { r1Orders, r2Orders } = generateOrders(restaurant1.id, restaurant2.id);
    await Order.bulkCreate(r1Orders, { transaction: t });
    await Order.bulkCreate(r2Orders, { transaction: t });

    console.log(`✓ [DEMO SEED] Orders: R1(${r1Orders.length}), R2(${r2Orders.length})`);

    // ========================================
    // STEP 10: Create invoices (date-sensitive → also reset daily)
    // ========================================
    console.log('📄 [DEMO SEED] Creating demo invoices...');

    const systemAdmin = await User.findOne({ where: { role: 'System Admin' }, attributes: ['id'], transaction: t });
    const systemAdminId = systemAdmin ? systemAdmin.id : 1;

    const invoices = generateInvoices(restaurant1.id, restaurant2.id, demoBrand.id, demoBrandUser.id, systemAdminId);
    await Invoice.bulkCreate(invoices, { transaction: t });

    console.log(`✓ [DEMO SEED] Invoices: ${invoices.length}`);

    // ========================================
    // STEP 11: Create notices
    // ========================================
    console.log('📢 [DEMO SEED] Creating notices...');

    const notice1 = await Notice.create({
      title: 'Welcome to K-Taste Group!',
      content: 'Welcome to the K-Taste Group family! Please review our brand guidelines and quality standards. All outlets must maintain consistent food quality and presentation.\n\nKey points:\n- Follow standard recipes for all signature dishes\n- Maintain cleanliness score above 95%\n- Weekly inventory reports due every Monday\n- Monthly sales targets will be communicated via this channel',
      author_id: demoBrandUser.id,
      author_name: demoBrandUser.full_name,
      author_role: 'Brand General',
      target_type: 'brand',
      brand_id: demoBrand.id,
      category: 'general',
      priority: 'important',
      status: 'published'
    }, { transaction: t });

    const notice2 = await Notice.create({
      title: 'March Promotion: Spring BBQ Festival',
      content: 'We are launching our Spring BBQ Festival promotion from March 15 to April 15.\n\nPromotion details:\n- 20% off all BBQ sets for dine-in\n- Free side dish with any order above RM50\n- Special combo set at RM88 (regular RM120)\n\nPlease update your POS with the new promotion prices and train staff on the promotion details.',
      author_id: demoBrandUser.id,
      author_name: demoBrandUser.full_name,
      author_role: 'Brand General',
      target_type: 'brand',
      brand_id: demoBrand.id,
      category: 'general',
      priority: 'normal',
      status: 'published'
    }, { transaction: t });

    const notice3 = await Notice.create({
      title: 'Updated Health & Safety Guidelines',
      content: 'Please review the updated health and safety guidelines effective immediately.\n\n1. Temperature checks for all incoming ingredients must be logged\n2. Kitchen staff must wear gloves when handling ready-to-eat food\n3. Daily sanitization checklist must be completed and signed\n4. Fire extinguisher inspection monthly\n\nNon-compliance will result in review by management.',
      author_id: demoBrandUser.id,
      author_name: demoBrandUser.full_name,
      author_role: 'Brand General',
      target_type: 'brand',
      brand_id: demoBrand.id,
      category: 'guide',
      priority: 'urgent',
      status: 'published'
    }, { transaction: t });

    await NoticeRecipient.bulkCreate([
      { notice_id: notice1.id, restaurant_id: restaurant1.id },
      { notice_id: notice1.id, restaurant_id: restaurant2.id },
      { notice_id: notice2.id, restaurant_id: restaurant1.id },
      { notice_id: notice2.id, restaurant_id: restaurant2.id },
      { notice_id: notice3.id, restaurant_id: restaurant1.id },
      { notice_id: notice3.id, restaurant_id: restaurant2.id }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Notices: 3');

    // ========================================
    // STEP 12: Create tickets
    // ========================================
    console.log('🎫 [DEMO SEED] Creating tickets...');

    await SupportTicket.bulkCreate([
      {
        id: `demo-ticket-${Date.now()}-1`,
        ticketNumber: 'DEMO-ST-001',
        customerId: String(demoRestaurantUser.id),
        customerName: demoRestaurantUser.full_name,
        customerEmail: DEMO_RESTAURANT_EMAIL,
        customerRole: 'restaurant',
        restaurantId: restaurant1.id,
        restaurantName: restaurant1.name,
        subject: 'POS terminal freezing during peak hours',
        description: 'The POS terminal occasionally freezes when processing multiple orders simultaneously during lunch rush (12-2pm). Need to restart the app to fix.',
        status: 'in-progress',
        priority: 'high',
        category: 'technical'
      },
      {
        id: `demo-ticket-${Date.now()}-2`,
        ticketNumber: 'DEMO-ST-002',
        customerId: String(demoRestaurantUser.id),
        customerName: demoRestaurantUser.full_name,
        customerEmail: DEMO_RESTAURANT_EMAIL,
        customerRole: 'restaurant',
        restaurantId: restaurant1.id,
        restaurantName: restaurant1.name,
        subject: 'Request for QR code table ordering feature',
        description: 'We would like to enable QR code ordering for our dine-in tables. Can you help set this up?',
        status: 'open',
        priority: 'medium',
        category: 'feature-request'
      },
      {
        id: `demo-ticket-${Date.now()}-3`,
        ticketNumber: 'DEMO-ST-003',
        customerId: String(demoRestaurantUser.id),
        customerName: demoRestaurantUser.full_name,
        customerEmail: DEMO_RESTAURANT_EMAIL,
        customerRole: 'restaurant',
        restaurantId: restaurant1.id,
        restaurantName: restaurant1.name,
        subject: 'Invoice payment method not showing',
        description: 'When I try to pay an invoice, the bank transfer option is not appearing. Only card payment is shown.',
        status: 'resolved',
        priority: 'medium',
        category: 'billing'
      }
    ], { transaction: t });

    await OperationTicket.bulkCreate([
      {
        ticketNumber: 'DEMO-OT-001',
        managerId: demoBrandUser.id,
        managerName: demoBrandUser.full_name,
        requesterId: demoRestaurantUser.id,
        requesterName: demoRestaurantUser.full_name,
        requesterEmail: DEMO_RESTAURANT_EMAIL,
        requesterRole: 'Restaurant Admin',
        restaurantId: restaurant1.id,
        restaurantName: restaurant1.name,
        subject: 'Need to update operating hours for Ramadan',
        description: 'We need to change our operating hours during Ramadan. New hours: 3pm-12am (was 11am-11pm). Please update the brand-wide settings.',
        status: 'open',
        priority: 'medium',
        category: 'schedule',
        inquiryType: 'brand'
      },
      {
        ticketNumber: 'DEMO-OT-002',
        managerId: demoBrandUser.id,
        managerName: demoBrandUser.full_name,
        requesterId: demoRestaurantUser.id,
        requesterName: demoRestaurantUser.full_name,
        requesterEmail: DEMO_RESTAURANT_EMAIL,
        requesterRole: 'Restaurant Admin',
        restaurantId: restaurant1.id,
        restaurantName: restaurant1.name,
        subject: 'Shortage of kimchi supply',
        description: 'Our regular kimchi supplier has delivery delays. We need an alternative supplier urgently or brand approval to use a local supplier.',
        status: 'in-progress',
        priority: 'high',
        category: 'inventory',
        inquiryType: 'brand'
      }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Tickets: 3 support + 2 operation');

    // ========================================
    // STEP 13: Create customers
    // ========================================
    console.log('👥 [DEMO SEED] Creating customers...');

    const customers = await Customer.bulkCreate([
      { phone: '+60-11-1111-0001', name: 'Alex Wong', email: 'alex.wong@demo.com', type: 'member' },
      { phone: '+60-11-1111-0002', name: 'Lisa Chen', email: 'lisa.chen@demo.com', type: 'member' },
      { phone: '+60-11-1111-0003', name: 'David Tan', type: 'member' },
      { phone: '+60-11-1111-0004', name: 'Michelle Lee', email: 'michelle@demo.com', type: 'member' },
      { phone: '+60-11-1111-0005', name: 'Ryan Kim', type: 'guest' },
      { phone: '+60-11-1111-0006', name: 'Sarah Lim', type: 'guest' },
      { phone: '+60-11-1111-0007', name: 'James Park', type: 'member' },
      { phone: '+60-11-1111-0008', type: 'guest' }
    ], { transaction: t });

    await RestaurantCustomer.bulkCreate(
      customers.map((c, i) => ({
        customer_id: c.id,
        restaurant_id: i < 6 ? restaurant1.id : restaurant2.id,
        visit_count: Math.floor(Math.random() * 20) + 1,
        total_spent: Math.round((Math.random() * 500 + 50) * 100) / 100,
        loyalty_points: Math.floor(Math.random() * 500)
      })),
      { transaction: t }
    );

    console.log(`✓ [DEMO SEED] Customers: ${customers.length}`);

    // ========================================
    // STEP 14: Create coupons
    // ========================================
    console.log('🎟️ [DEMO SEED] Creating coupons...');

    const now = new Date();

    await Coupon.bulkCreate([
      {
        restaurant_id: restaurant1.id,
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: '10% off for first-time customers',
        type: 'percentage',
        value: 10,
        min_order: 30,
        max_discount: 20,
        usage_limit: 100,
        usage_count: 23,
        valid_from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        valid_until: new Date(now.getFullYear(), now.getMonth() + 2, 0),
        is_active: true,
        applicable_order_types: JSON.stringify(['dine_in', 'takeaway'])
      },
      {
        restaurant_id: restaurant1.id,
        code: 'BBQ20',
        name: 'BBQ Festival Special',
        description: 'RM20 off BBQ sets',
        type: 'fixed',
        value: 20,
        min_order: 80,
        usage_limit: 50,
        usage_count: 8,
        valid_from: new Date(now.getFullYear(), now.getMonth(), 15),
        valid_until: new Date(now.getFullYear(), now.getMonth() + 1, 15),
        is_active: true,
        applicable_order_types: JSON.stringify(['dine_in'])
      },
      {
        restaurant_id: restaurant1.id,
        code: 'LUNAR2025',
        name: 'Lunar New Year',
        description: '15% off entire bill',
        type: 'percentage',
        value: 15,
        min_order: 50,
        max_discount: 30,
        usage_limit: 200,
        usage_count: 200,
        valid_from: new Date(2025, 0, 20),
        valid_until: new Date(2025, 1, 15),
        is_active: false,
        applicable_order_types: JSON.stringify(['dine_in', 'takeaway', 'delivery'])
      }
    ], { transaction: t });

    console.log('✓ [DEMO SEED] Coupons: 3');

    // ========================================
    // STEP 15: Create suppliers
    // ========================================
    console.log('🚚 [DEMO SEED] Creating suppliers...');

    const suppliers = await Supplier.bulkCreate([
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id, code: 'SUP-001',
        name: 'Fresh Farms KL', contact_name: 'Ahmad bin Hassan',
        phone: '+60-12-555-0001', email: 'order@freshfarms.demo',
        address: 'Lot 45, Pasar Borong Selayang, Selangor',
        payment_terms: 'Net 14', is_active: true
      },
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id, code: 'SUP-002',
        name: 'Korea Import Trading', contact_name: 'Park Joon',
        phone: '+60-12-555-0002', email: 'supply@koreaimport.demo',
        address: '12 Jalan Ipoh, Kuala Lumpur',
        payment_terms: 'Net 30', is_active: true
      },
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id, code: 'SUP-003',
        name: 'Ocean Seafood Supply', contact_name: 'Tan Wei Ming',
        phone: '+60-12-555-0003', email: 'sales@oceansea.demo',
        address: 'Pelabuhan Klang, Selangor',
        payment_terms: 'COD', is_active: true
      }
    ], { transaction: t });

    console.log(`✓ [DEMO SEED] Suppliers: ${suppliers.length}`);

    // ========================================
    // STEP 16: Create ingredients & recipes
    // ========================================
    console.log('🧪 [DEMO SEED] Creating ingredients & recipes...');

    const ingCats = await IngredientCategory.bulkCreate([
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Meat & Poultry', display_order: 1 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Vegetables', display_order: 2 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Sauces & Seasonings', display_order: 3 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Rice & Noodles', display_order: 4 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Beverages', display_order: 5 }
    ], { transaction: t });

    const ingCatMap = {};
    ingCats.forEach(c => { ingCatMap[c.name] = c.id; });

    const ingredients = await Ingredient.bulkCreate([
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Meat & Poultry'], name: 'Beef Brisket', category: 'meat', unit: 'kg', unit_cost: 45.00, current_stock: 15, min_stock: 5, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Meat & Poultry'], name: 'Pork Belly', category: 'meat', unit: 'kg', unit_cost: 32.00, current_stock: 12, min_stock: 4, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Meat & Poultry'], name: 'Chicken Thigh', category: 'meat', unit: 'kg', unit_cost: 18.00, current_stock: 20, min_stock: 8, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Vegetables'], name: 'Napa Cabbage (Kimchi)', category: 'produce', unit: 'kg', unit_cost: 8.50, current_stock: 25, min_stock: 10, supplier_id: suppliers[1].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Vegetables'], name: 'Bean Sprouts', category: 'produce', unit: 'kg', unit_cost: 4.00, current_stock: 8, min_stock: 3, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Vegetables'], name: 'Spinach', category: 'produce', unit: 'kg', unit_cost: 6.00, current_stock: 5, min_stock: 2, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Vegetables'], name: 'Tofu (Soft)', category: 'produce', unit: 'piece', unit_cost: 2.50, current_stock: 30, min_stock: 10, supplier_id: suppliers[0].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Sauces & Seasonings'], name: 'Gochujang (Red Pepper Paste)', category: 'spices', unit: 'kg', unit_cost: 25.00, current_stock: 5, min_stock: 2, supplier_id: suppliers[1].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Sauces & Seasonings'], name: 'Soy Sauce', category: 'spices', unit: 'L', unit_cost: 12.00, current_stock: 8, min_stock: 3, supplier_id: suppliers[1].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Sauces & Seasonings'], name: 'Sesame Oil', category: 'spices', unit: 'L', unit_cost: 35.00, current_stock: 3, min_stock: 1, supplier_id: suppliers[1].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Rice & Noodles'], name: 'Short Grain Rice', category: 'dry_goods', unit: 'kg', unit_cost: 5.50, current_stock: 50, min_stock: 20, supplier_id: suppliers[1].id, track_stock: true },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, ingredient_category_id: ingCatMap['Rice & Noodles'], name: 'Glass Noodles', category: 'dry_goods', unit: 'kg', unit_cost: 12.00, current_stock: 10, min_stock: 3, supplier_id: suppliers[1].id, track_stock: true }
    ], { transaction: t });

    const ingMap = {};
    ingredients.forEach(i => { ingMap[i.name] = i.id; });

    const recCats = await RecipeCategory.bulkCreate([
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'BBQ Recipes', display_order: 1 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Stew & Soup', display_order: 2 },
      { owner_type: 'restaurant', restaurant_id: restaurant1.id, name: 'Rice Dishes', display_order: 3 }
    ], { transaction: t });

    const recCatMap = {};
    recCats.forEach(c => { recCatMap[c.name] = c.id; });

    const recipes = await Recipe.bulkCreate([
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id,
        recipe_category_id: recCatMap['BBQ Recipes'],
        name: 'Bulgogi Beef Marinade',
        description: 'Traditional Korean bulgogi marinade with soy sauce, sesame oil, and pear juice',
        yield_amount: 1, yield_unit: 'portion',
        prep_time: 30, cook_time: 10,
        total_ingredient_cost: 12.50, suggested_price: 28.90,
        instructions_summary: 'Marinate sliced beef for 2 hours. Grill on high heat.',
        instructions_detail: '1. Slice beef brisket thinly against the grain\n2. Mix soy sauce, sesame oil, gochujang, minced garlic, and pear juice\n3. Marinate beef for minimum 2 hours (overnight preferred)\n4. Grill on high heat for 2-3 minutes per side\n5. Garnish with sesame seeds and spring onions',
        is_active: true
      },
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id,
        recipe_category_id: recCatMap['BBQ Recipes'],
        name: 'Samgyeopsal Prep',
        description: 'Thick-cut pork belly with salt and pepper, served with lettuce wraps',
        yield_amount: 1, yield_unit: 'portion',
        prep_time: 10, cook_time: 15,
        total_ingredient_cost: 8.50, suggested_price: 24.90,
        instructions_summary: 'Slice pork belly thick. Season and grill until crispy.',
        is_active: true
      },
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id,
        recipe_category_id: recCatMap['Stew & Soup'],
        name: 'Kimchi Jjigae',
        description: 'Spicy kimchi stew with pork and tofu',
        yield_amount: 1, yield_unit: 'portion',
        prep_time: 15, cook_time: 25,
        total_ingredient_cost: 6.80, suggested_price: 14.90,
        instructions_summary: 'Sauté aged kimchi with pork, add broth, simmer with tofu.',
        instructions_detail: '1. Dice pork belly into small cubes\n2. Sauté pork in pot until fat renders\n3. Add chopped aged kimchi, stir-fry 3 minutes\n4. Add water/broth, gochugaru, and gochujang\n5. Simmer 20 minutes\n6. Add cubed soft tofu, cook 3 more minutes\n7. Serve bubbling in stone pot',
        is_active: true
      },
      {
        owner_type: 'restaurant', restaurant_id: restaurant1.id,
        recipe_category_id: recCatMap['Rice Dishes'],
        name: 'Bibimbap',
        description: 'Mixed rice bowl with vegetables, beef, and gochujang',
        yield_amount: 1, yield_unit: 'portion',
        prep_time: 20, cook_time: 15,
        total_ingredient_cost: 8.20, suggested_price: 16.90,
        instructions_summary: 'Prepare toppings separately. Assemble over hot rice with egg.',
        is_active: true
      }
    ], { transaction: t });

    await RecipeIngredient.bulkCreate([
      { recipe_id: recipes[0].id, ingredient_id: ingMap['Beef Brisket'], quantity: 0.2, unit: 'kg', cost: 9.00 },
      { recipe_id: recipes[0].id, ingredient_id: ingMap['Soy Sauce'], quantity: 0.03, unit: 'L', cost: 0.36 },
      { recipe_id: recipes[0].id, ingredient_id: ingMap['Sesame Oil'], quantity: 0.01, unit: 'L', cost: 0.35 },
      { recipe_id: recipes[0].id, ingredient_id: ingMap['Gochujang (Red Pepper Paste)'], quantity: 0.01, unit: 'kg', cost: 0.25 },
      { recipe_id: recipes[1].id, ingredient_id: ingMap['Pork Belly'], quantity: 0.25, unit: 'kg', cost: 8.00 },
      { recipe_id: recipes[1].id, ingredient_id: ingMap['Sesame Oil'], quantity: 0.005, unit: 'L', cost: 0.18 },
      { recipe_id: recipes[2].id, ingredient_id: ingMap['Napa Cabbage (Kimchi)'], quantity: 0.15, unit: 'kg', cost: 1.28 },
      { recipe_id: recipes[2].id, ingredient_id: ingMap['Pork Belly'], quantity: 0.1, unit: 'kg', cost: 3.20 },
      { recipe_id: recipes[2].id, ingredient_id: ingMap['Tofu (Soft)'], quantity: 1, unit: 'piece', cost: 2.50 },
      { recipe_id: recipes[2].id, ingredient_id: ingMap['Gochujang (Red Pepper Paste)'], quantity: 0.015, unit: 'kg', cost: 0.38 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Short Grain Rice'], quantity: 0.2, unit: 'kg', cost: 1.10 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Beef Brisket'], quantity: 0.08, unit: 'kg', cost: 3.60 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Bean Sprouts'], quantity: 0.05, unit: 'kg', cost: 0.20 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Spinach'], quantity: 0.05, unit: 'kg', cost: 0.30 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Gochujang (Red Pepper Paste)'], quantity: 0.02, unit: 'kg', cost: 0.50 },
      { recipe_id: recipes[3].id, ingredient_id: ingMap['Sesame Oil'], quantity: 0.01, unit: 'L', cost: 0.35 }
    ], { transaction: t });

    console.log(`✓ [DEMO SEED] Recipes: ${recipes.length}, Ingredients: ${ingredients.length}`);

    // ========================================
    // COMMIT
    // ========================================
    await t.commit();

    console.log('');
    console.log('🎉 [DEMO SEED] Full demo data seeded successfully!');
    console.log('');
    console.log('   Demo Brand General:');
    console.log(`     Email: ${DEMO_BRAND_EMAIL}`);
    console.log(`     Password: ${DEMO_PASSWORD}`);
    console.log(`     Brand: ${demoBrand.name} (id:${demoBrand.id})`);
    console.log(`     Restaurants: ${restaurant1.name}, ${restaurant2.name}`);
    console.log('');
    console.log('   Demo Restaurant Admin:');
    console.log(`     Email: ${DEMO_RESTAURANT_EMAIL}`);
    console.log(`     Password: ${DEMO_PASSWORD}`);
    console.log(`     Restaurant: ${restaurant1.name} (id:${restaurant1.id})`);
    console.log('');

  } catch (error) {
    await t.rollback();
    console.error('✗ [DEMO SEED] Failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ================================================================
// DAILY RESET: Orders + Invoices only
// ================================================================

async function resetDemoOrders() {
  const t = await sequelize.transaction();

  try {
    console.log('🔄 [DEMO RESET] Resetting orders & invoices...');

    const Restaurant = require('./models/Restaurant');
    const Order = require('./models/Order');
    const Invoice = require('./models/Invoice');
    const Brand = require('./models/Brand');
    const User = require('./models/User');

    // Find demo restaurants
    const demoRestaurants = await Restaurant.findAll({
      where: { slug: { [Op.in]: DEMO_RESTAURANT_SLUGS } },
      attributes: ['id'],
      transaction: t
    });
    const demoRestaurantIds = demoRestaurants.map(r => r.id);

    if (demoRestaurantIds.length === 0) {
      console.log('⚠️ [DEMO RESET] No demo restaurants found. Run full seed first.');
      await t.rollback();
      return;
    }

    // Find demo brand
    const demoBrand = await Brand.findOne({ where: { code: DEMO_BRAND_CODE }, attributes: ['id', 'owner_id'], transaction: t });
    if (!demoBrand) {
      console.log('⚠️ [DEMO RESET] No demo brand found. Run full seed first.');
      await t.rollback();
      return;
    }

    // Delete existing orders
    const deletedOrders = await Order.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

    // Delete existing invoices (with invoice_items)
    const demoInvoices = await Invoice.findAll({
      where: { restaurant_id: { [Op.in]: demoRestaurantIds } },
      attributes: ['id'],
      transaction: t
    });
    const demoInvoiceIds = demoInvoices.map(i => i.id);
    if (demoInvoiceIds.length > 0) {
      await sequelize.query('DELETE FROM invoice_items WHERE invoice_id IN (?)', {
        replacements: [demoInvoiceIds],
        transaction: t
      });
    }
    const deletedInvoices = await Invoice.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

    // Re-create orders
    const { r1Orders, r2Orders } = generateOrders(demoRestaurantIds[0], demoRestaurantIds[1]);
    await Order.bulkCreate(r1Orders, { transaction: t });
    await Order.bulkCreate(r2Orders, { transaction: t });

    // Re-create invoices
    const systemAdmin = await User.findOne({ where: { role: 'System Admin' }, attributes: ['id'], transaction: t });
    const systemAdminId = systemAdmin ? systemAdmin.id : 1;

    const invoices = generateInvoices(demoRestaurantIds[0], demoRestaurantIds[1], demoBrand.id, demoBrand.owner_id, systemAdminId);
    await Invoice.bulkCreate(invoices, { transaction: t });

    await t.commit();

    console.log(`✓ [DEMO RESET] Done! Deleted ${deletedOrders} orders + ${deletedInvoices} invoices → Created ${r1Orders.length + r2Orders.length} orders + ${invoices.length} invoices`);

  } catch (error) {
    await t.rollback();
    console.error('✗ [DEMO RESET] Failed:', error.message);
    console.error(error.stack);
    throw error;
  }
}

// ================================================================
// CLI
// ================================================================

if (require.main === module) {
  const isReset = process.argv.includes('--reset');
  const fn = isReset ? resetDemoOrders : seedDemoData;
  const label = isReset ? 'Daily reset (orders+invoices)' : 'Full initial seed';

  console.log(`Running: ${label}`);
  fn()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedDemoData, resetDemoOrders };
