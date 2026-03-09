#!/usr/bin/env node
/**
 * Demo Data Seed Script
 *
 * Creates/resets demo data for Brand General and Restaurant Admin demo accounts.
 * Run: node seed-demo-data.js
 *
 * What it does:
 * 1. Creates dedicated demo brand + 2 restaurants (if not exists)
 * 2. Sets up demo users with is_demo=true
 * 3. Seeds diverse demo data: categories, products, orders, invoices
 * 4. Full reset mode: deletes all demo data then re-creates
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

async function seedDemoData() {
  const t = await sequelize.transaction();

  try {
    console.log('🎭 [DEMO SEED] Starting demo data seed...');

    // Load models
    const User = require('./models/User');
    const Brand = require('./models/Brand');
    const Restaurant = require('./models/Restaurant');
    const Category = require('./models/Category');
    const Product = require('./models/Product');
    const Order = require('./models/Order');
    const Invoice = require('./models/Invoice');
    const RestaurantManager = require('./models/RestaurantManager');

    // ========================================
    // STEP 1: Clean up existing demo data
    // ========================================
    console.log('🧹 [DEMO SEED] Cleaning existing demo data...');

    // Find existing demo brand
    const existingDemoBrand = await Brand.findOne({
      where: { code: DEMO_BRAND_CODE },
      transaction: t
    });

    // Find existing demo restaurants
    const existingDemoRestaurants = await Restaurant.findAll({
      where: { slug: { [Op.in]: DEMO_RESTAURANT_SLUGS } },
      transaction: t
    });
    const demoRestaurantIds = existingDemoRestaurants.map(r => r.id);

    // Delete demo data in order (foreign key safe)
    if (demoRestaurantIds.length > 0) {
      await Order.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });

      // Delete invoices (invoice_items cascade or clean separately via raw query)
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

      await Product.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Category.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await RestaurantManager.destroy({ where: { restaurant_id: { [Op.in]: demoRestaurantIds } }, transaction: t });
      await Restaurant.destroy({ where: { id: { [Op.in]: demoRestaurantIds } }, transaction: t });
    }

    if (existingDemoBrand) {
      // Also clean restaurants that might be linked to demo brand but not by slug
      const brandRestaurants = await Restaurant.findAll({
        where: { brand_id: existingDemoBrand.id, slug: { [Op.notIn]: DEMO_RESTAURANT_SLUGS } },
        transaction: t
      });
      // Unlink them from demo brand
      for (const r of brandRestaurants) {
        await r.update({ brand_id: null }, { transaction: t });
      }
      await Brand.destroy({ where: { id: existingDemoBrand.id }, transaction: t });
    }

    console.log('✅ [DEMO SEED] Existing demo data cleaned');

    // ========================================
    // STEP 2: Hash password
    // ========================================
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    // ========================================
    // STEP 3: Create/Update demo users
    // ========================================
    console.log('👤 [DEMO SEED] Creating demo users...');

    // Demo Brand General user
    let demoBrandUser = await User.findOne({ where: { email: DEMO_BRAND_EMAIL }, transaction: t });
    if (demoBrandUser) {
      await demoBrandUser.update({
        password: hashedPassword,
        is_demo: true,
        role: 'Brand General',
        full_name: 'Sarah Kim (Demo)',
        username: 'demo-brand',
        restaurant_id: null,
        brand_id: null, // Will set after brand creation
        foodcourt_id: null
      }, { transaction: t });
    } else {
      demoBrandUser = await User.create({
        email: DEMO_BRAND_EMAIL,
        username: 'demo-brand',
        password: hashedPassword,
        role: 'Brand General',
        full_name: 'Sarah Kim (Demo)',
        is_demo: true
      }, { transaction: t });
    }

    // Demo Restaurant Admin user
    let demoRestaurantUser = await User.findOne({ where: { email: DEMO_RESTAURANT_EMAIL }, transaction: t });
    if (demoRestaurantUser) {
      await demoRestaurantUser.update({
        password: hashedPassword,
        is_demo: true,
        role: 'Restaurant Admin',
        full_name: 'James Park (Demo)',
        username: 'demo-restaurant',
        restaurant_id: null, // Will set after restaurant creation
        brand_id: null,
        foodcourt_id: null
      }, { transaction: t });
    } else {
      demoRestaurantUser = await User.create({
        email: DEMO_RESTAURANT_EMAIL,
        username: 'demo-restaurant',
        password: hashedPassword,
        role: 'Restaurant Admin',
        full_name: 'James Park (Demo)',
        is_demo: true
      }, { transaction: t });
    }

    console.log(`✅ [DEMO SEED] Demo users: Brand(id:${demoBrandUser.id}), Restaurant(id:${demoRestaurantUser.id})`);

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
      })
    }, { transaction: t });

    // Link brand user to brand
    await demoBrandUser.update({ brand_id: demoBrand.id }, { transaction: t });

    console.log(`✅ [DEMO SEED] Demo brand created: ${demoBrand.name} (id:${demoBrand.id})`);

    // ========================================
    // STEP 5: Create demo restaurants
    // ========================================
    console.log('🍽️ [DEMO SEED] Creating demo restaurants...');

    // Restaurant 1: Korean BBQ (managed by demo-restaurant user)
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

    // Link demo restaurant user
    await demoRestaurantUser.update({ restaurant_id: restaurant1.id }, { transaction: t });

    // Restaurant 2: Noodle House (brand's second restaurant, no dedicated admin demo)
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

    // Brand oversight for both restaurants
    await RestaurantManager.bulkCreate([
      { restaurant_id: restaurant1.id, manager_id: demoBrandUser.id, is_primary: true, relationship_type: 'oversight' },
      { restaurant_id: restaurant2.id, manager_id: demoBrandUser.id, is_primary: true, relationship_type: 'oversight' }
    ], { transaction: t });

    console.log(`✅ [DEMO SEED] Restaurants: ${restaurant1.name} (id:${restaurant1.id}), ${restaurant2.name} (id:${restaurant2.id})`);

    // ========================================
    // STEP 6: Create categories & products
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
      // Appetizers
      { name: 'Kimchi Pancake', price: 12.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: 'Crispy Korean pancake with kimchi', is_active: true },
      { name: 'Korean Fried Chicken', price: 15.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: '6 pcs crispy double-fried chicken', is_active: true },
      { name: 'Japchae', price: 10.90, category: r1CatMap['Appetizers'], restaurant_id: restaurant1.id, description: 'Stir-fried glass noodles with vegetables', is_active: true },
      // BBQ Grills
      { name: 'Premium Wagyu Set', price: 68.00, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'A5 Wagyu beef 200g with sides', is_active: true },
      { name: 'Bulgogi Beef', price: 28.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Marinated sliced beef', is_active: true },
      { name: 'Samgyeopsal', price: 24.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Thick-cut pork belly', is_active: true },
      { name: 'Spicy Chicken BBQ', price: 22.90, category: r1CatMap['BBQ Grills'], restaurant_id: restaurant1.id, description: 'Gochujang marinated chicken', is_active: true, soldOut: true },
      // Rice & Noodles
      { name: 'Bibimbap', price: 16.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Mixed rice bowl with vegetables and egg', is_active: true },
      { name: 'Kimchi Fried Rice', price: 14.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Fried rice with aged kimchi', is_active: true },
      { name: 'Cold Naengmyeon', price: 15.90, category: r1CatMap['Rice & Noodles'], restaurant_id: restaurant1.id, description: 'Icy buckwheat noodles', is_active: true, soldOut: true },
      // Soups & Stews
      { name: 'Kimchi Jjigae', price: 14.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Spicy kimchi stew with pork', is_active: true },
      { name: 'Sundubu Jjigae', price: 13.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Soft tofu stew', is_active: true },
      { name: 'Galbitang', price: 18.90, category: r1CatMap['Soups & Stews'], restaurant_id: restaurant1.id, description: 'Short rib soup', is_active: true },
      // Beverages
      { name: 'Soju (Original)', price: 12.00, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Korean Beer', price: 10.00, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Yuzu Tea', price: 6.90, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, is_active: true },
      { name: 'Sikhye', price: 5.90, category: r1CatMap['Beverages'], restaurant_id: restaurant1.id, description: 'Sweet rice drink', is_active: true },
      // Desserts
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

    console.log('✅ [DEMO SEED] Menu categories & products created');

    // ========================================
    // STEP 7: Create demo orders (diverse statuses)
    // ========================================
    console.log('📦 [DEMO SEED] Creating demo orders...');

    const now = new Date();
    const orderStatuses = ['pending', 'preparing', 'ready', 'completed', 'completed', 'completed', 'cancelled', 'served'];
    const orderTypes = ['dine_in', 'dine_in', 'dine_in', 'takeaway', 'takeaway', 'delivery'];
    const paymentMethods = ['cash', 'card', 'e_wallet', 'qr_payment'];

    // Generate 30 days of orders for Restaurant 1
    const r1Orders = [];
    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      const orderDate = new Date(now);
      orderDate.setDate(orderDate.getDate() - dayOffset);

      // More orders for recent days, fewer for older
      const orderCount = dayOffset < 3 ? 5 : dayOffset < 7 ? 3 : dayOffset < 14 ? 2 : 1;

      for (let i = 0; i < orderCount; i++) {
        const status = dayOffset === 0 && i < 3
          ? ['pending', 'preparing', 'ready'][i]  // Today: active orders
          : orderStatuses[Math.floor(Math.random() * orderStatuses.length)];

        const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const isCompleted = ['completed', 'served'].includes(status);
        const isCancelled = status === 'cancelled';

        // Random items from menu
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

        r1Orders.push({
          restaurant_id: restaurant1.id,
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
          payment_method: isCompleted ? paymentMethod : (isCancelled ? null : null),
          payment_status: isCompleted ? 'completed' : (isCancelled ? 'failed' : 'pending'),
          kitchen_ready: ['preparing', 'ready', 'completed', 'served'].includes(status),
          order_date: orderDate,
          order_items: JSON.stringify(items)
        });
      }
    }

    await Order.bulkCreate(r1Orders, { transaction: t });

    // Restaurant 2: fewer orders (newer restaurant)
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

        r2Orders.push({
          restaurant_id: restaurant2.id,
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
          order_items: JSON.stringify([{ name: 'Spicy Ramyeon', quantity: 1, price: subtotal, total: subtotal }])
        });
      }
    }

    await Order.bulkCreate(r2Orders, { transaction: t });

    console.log(`✅ [DEMO SEED] Orders created: Restaurant1(${r1Orders.length}), Restaurant2(${r2Orders.length})`);

    // ========================================
    // STEP 8: Create demo invoices (diverse statuses)
    // ========================================
    console.log('📄 [DEMO SEED] Creating demo invoices...');

    const invoices = [];
    let invoiceIdx = 0;

    // System Admin user id for issued_by
    const systemAdmin = await User.findOne({ where: { role: 'System Admin' }, attributes: ['id'], transaction: t });
    const systemAdminId = systemAdmin ? systemAdmin.id : 1;

    // Helper to create invoice
    const addInvoice = (data) => {
      invoiceIdx++;
      // Set issued_by based on issuer_type
      const issuedBy = data.issuer_type === 'brand' ? demoBrandUser.id : systemAdminId;
      invoices.push({ ...data, invoice_number: `INV-DEMO-${invoiceIdx.toString().padStart(3, '0')}`, issued_by: issuedBy });
    };

    // Restaurant 1 - System Admin subscription invoices (3 months)
    for (let m = 0; m < 3; m++) {
      const billingStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const billingEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0);
      const dueDate = new Date(billingEnd);
      dueDate.setDate(dueDate.getDate() + 14);

      const status = m === 0 ? 'pending_payment' : m === 1 ? 'paid' : 'paid';

      addInvoice({
        restaurant_id: restaurant1.id,
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
        payer_id: restaurant1.id,
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
        restaurant_id: restaurant1.id,
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
        issuer_id: demoBrand.id,
        payer_type: 'restaurant',
        payer_id: restaurant1.id,
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
        restaurant_id: restaurant2.id,
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
        payer_id: restaurant2.id,
        issued_at: billingStart,
        paid_at: m === 1 ? billingEnd : null,
        payment_method: m === 1 ? 'card' : null,
        invoice_category: 'pos_subscription',
        category_display_name: 'POS Subscription',
        service_description: 'Basic Plan - Monthly subscription'
      });
    }

    // One manual invoice (cancelled)
    addInvoice({
      restaurant_id: restaurant1.id,
      type: 'manual',
      due_date: new Date(now.getFullYear(), now.getMonth(), 15),
      total_amount: 150.00,
      subtotal: 150.00,
      currency: 'MYR',
      paid_amount: 0,
      status: 'cancelled',
      issuer_type: 'system_admin',
      payer_type: 'restaurant',
      payer_id: restaurant1.id,
      issued_at: new Date(now.getFullYear(), now.getMonth(), 1),
      invoice_category: 'others',
      category_display_name: 'Others',
      custom_description: 'Setup fee (waived)',
      service_description: 'One-time setup and configuration fee - WAIVED'
    });

    // One with payment_submitted status
    addInvoice({
      restaurant_id: restaurant1.id,
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
      issuer_id: demoBrand.id,
      payer_type: 'restaurant',
      payer_id: restaurant1.id,
      issued_at: new Date(now.getFullYear(), now.getMonth(), 1),
      payment_submitted_at: new Date(),
      invoice_category: 'brand_marketing',
      category_display_name: 'Brand Marketing Fee',
      service_description: 'Monthly marketing contribution'
    });

    await Invoice.bulkCreate(invoices, { transaction: t });

    console.log(`✅ [DEMO SEED] Invoices created: ${invoices.length}`);

    // ========================================
    // STEP 9: Commit
    // ========================================
    await t.commit();

    console.log('');
    console.log('🎉 [DEMO SEED] Demo data seeded successfully!');
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
    console.error('❌ [DEMO SEED] Failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Export for use by scheduler, or run directly
if (require.main === module) {
  seedDemoData()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedDemoData };
