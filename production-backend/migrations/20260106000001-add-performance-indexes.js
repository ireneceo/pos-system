'use strict';

/**
 * Performance Optimization Indexes Migration
 *
 * This migration adds indexes for frequently queried columns
 * to improve query performance across the application.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('Adding performance indexes...');

    // ====== ORDERS TABLE ======
    // Most common queries: by restaurant + status + date
    await queryInterface.addIndex('orders', ['restaurant_id', 'status', 'order_date'], {
      name: 'idx_orders_restaurant_status_date'
    }).catch(e => console.log('Index idx_orders_restaurant_status_date may already exist:', e.message));

    await queryInterface.addIndex('orders', ['restaurant_id', 'order_date'], {
      name: 'idx_orders_restaurant_date'
    }).catch(e => console.log('Index idx_orders_restaurant_date may already exist:', e.message));

    await queryInterface.addIndex('orders', ['status'], {
      name: 'idx_orders_status'
    }).catch(e => console.log('Index idx_orders_status may already exist:', e.message));

    await queryInterface.addIndex('orders', ['customer_id'], {
      name: 'idx_orders_customer'
    }).catch(e => console.log('Index idx_orders_customer may already exist:', e.message));

    await queryInterface.addIndex('orders', ['table_number'], {
      name: 'idx_orders_table'
    }).catch(e => console.log('Index idx_orders_table may already exist:', e.message));

    // ====== INVOICES TABLE ======
    await queryInterface.addIndex('invoices', ['restaurant_id', 'status', 'created_at'], {
      name: 'idx_invoices_restaurant_status_created'
    }).catch(e => console.log('Index idx_invoices_restaurant_status_created may already exist:', e.message));

    await queryInterface.addIndex('invoices', ['status', 'due_date'], {
      name: 'idx_invoices_status_due'
    }).catch(e => console.log('Index idx_invoices_status_due may already exist:', e.message));

    // ====== INVENTORY_TRANSACTIONS TABLE ======
    await queryInterface.addIndex('inventory_transactions', ['restaurant_id', 'ingredient_id', 'created_at'], {
      name: 'idx_inv_trans_restaurant_ingredient_date'
    }).catch(e => console.log('Index idx_inv_trans_restaurant_ingredient_date may already exist:', e.message));

    await queryInterface.addIndex('inventory_transactions', ['transaction_type'], {
      name: 'idx_inv_trans_type'
    }).catch(e => console.log('Index idx_inv_trans_type may already exist:', e.message));

    // ====== STOCK_TAKES TABLE ======
    await queryInterface.addIndex('stock_takes', ['restaurant_id', 'stock_take_date'], {
      name: 'idx_stock_takes_restaurant_date'
    }).catch(e => console.log('Index idx_stock_takes_restaurant_date may already exist:', e.message));

    await queryInterface.addIndex('stock_takes', ['status'], {
      name: 'idx_stock_takes_status'
    }).catch(e => console.log('Index idx_stock_takes_status may already exist:', e.message));

    // ====== INGREDIENTS TABLE ======
    await queryInterface.addIndex('ingredients', ['restaurant_id', 'owner_type'], {
      name: 'idx_ingredients_restaurant_owner'
    }).catch(e => console.log('Index idx_ingredients_restaurant_owner may already exist:', e.message));

    await queryInterface.addIndex('ingredients', ['brand_id', 'owner_type'], {
      name: 'idx_ingredients_brand_owner'
    }).catch(e => console.log('Index idx_ingredients_brand_owner may already exist:', e.message));

    await queryInterface.addIndex('ingredients', ['is_active'], {
      name: 'idx_ingredients_active'
    }).catch(e => console.log('Index idx_ingredients_active may already exist:', e.message));

    await queryInterface.addIndex('ingredients', ['ingredient_category_id'], {
      name: 'idx_ingredients_category'
    }).catch(e => console.log('Index idx_ingredients_category may already exist:', e.message));

    // ====== PRODUCTS TABLE ======
    await queryInterface.addIndex('products', ['restaurant_id', 'category'], {
      name: 'idx_products_restaurant_category'
    }).catch(e => console.log('Index idx_products_restaurant_category may already exist:', e.message));

    await queryInterface.addIndex('products', ['soldOut'], {
      name: 'idx_products_soldout'
    }).catch(e => console.log('Index idx_products_soldout may already exist:', e.message));

    await queryInterface.addIndex('products', ['recipe_id'], {
      name: 'idx_products_recipe'
    }).catch(e => console.log('Index idx_products_recipe may already exist:', e.message));

    // ====== INVENTORY_BATCHES TABLE ======
    await queryInterface.addIndex('inventory_batches', ['ingredient_id', 'status'], {
      name: 'idx_inv_batches_ingredient_status'
    }).catch(e => console.log('Index idx_inv_batches_ingredient_status may already exist:', e.message));

    await queryInterface.addIndex('inventory_batches', ['expiry_date'], {
      name: 'idx_inv_batches_expiry'
    }).catch(e => console.log('Index idx_inv_batches_expiry may already exist:', e.message));

    // ====== STOCK_ALERTS TABLE ======
    await queryInterface.addIndex('stock_alerts', ['restaurant_id', 'resolved'], {
      name: 'idx_stock_alerts_restaurant_resolved'
    }).catch(e => console.log('Index idx_stock_alerts_restaurant_resolved may already exist:', e.message));

    await queryInterface.addIndex('stock_alerts', ['alert_type'], {
      name: 'idx_stock_alerts_type'
    }).catch(e => console.log('Index idx_stock_alerts_type may already exist:', e.message));

    // ====== RECIPE_INGREDIENTS TABLE ======
    await queryInterface.addIndex('recipe_ingredients', ['recipe_id'], {
      name: 'idx_recipe_ingredients_recipe'
    }).catch(e => console.log('Index idx_recipe_ingredients_recipe may already exist:', e.message));

    await queryInterface.addIndex('recipe_ingredients', ['ingredient_id'], {
      name: 'idx_recipe_ingredients_ingredient'
    }).catch(e => console.log('Index idx_recipe_ingredients_ingredient may already exist:', e.message));

    // ====== USERS TABLE ======
    await queryInterface.addIndex('users', ['restaurant_id'], {
      name: 'idx_users_restaurant'
    }).catch(e => console.log('Index idx_users_restaurant may already exist:', e.message));

    await queryInterface.addIndex('users', ['role'], {
      name: 'idx_users_role'
    }).catch(e => console.log('Index idx_users_role may already exist:', e.message));

    // ====== CATEGORIES TABLE ======
    await queryInterface.addIndex('categories', ['restaurant_id'], {
      name: 'idx_categories_restaurant'
    }).catch(e => console.log('Index idx_categories_restaurant may already exist:', e.message));

    console.log('Performance indexes added successfully!');
  },

  async down(queryInterface, Sequelize) {
    console.log('Removing performance indexes...');

    // Orders
    await queryInterface.removeIndex('orders', 'idx_orders_restaurant_status_date').catch(() => {});
    await queryInterface.removeIndex('orders', 'idx_orders_restaurant_date').catch(() => {});
    await queryInterface.removeIndex('orders', 'idx_orders_status').catch(() => {});
    await queryInterface.removeIndex('orders', 'idx_orders_customer').catch(() => {});
    await queryInterface.removeIndex('orders', 'idx_orders_table').catch(() => {});

    // Invoices
    await queryInterface.removeIndex('invoices', 'idx_invoices_restaurant_status_created').catch(() => {});
    await queryInterface.removeIndex('invoices', 'idx_invoices_status_due').catch(() => {});

    // Inventory transactions
    await queryInterface.removeIndex('inventory_transactions', 'idx_inv_trans_restaurant_ingredient_date').catch(() => {});
    await queryInterface.removeIndex('inventory_transactions', 'idx_inv_trans_type').catch(() => {});

    // Stock takes
    await queryInterface.removeIndex('stock_takes', 'idx_stock_takes_restaurant_date').catch(() => {});
    await queryInterface.removeIndex('stock_takes', 'idx_stock_takes_status').catch(() => {});

    // Ingredients
    await queryInterface.removeIndex('ingredients', 'idx_ingredients_restaurant_owner').catch(() => {});
    await queryInterface.removeIndex('ingredients', 'idx_ingredients_brand_owner').catch(() => {});
    await queryInterface.removeIndex('ingredients', 'idx_ingredients_active').catch(() => {});
    await queryInterface.removeIndex('ingredients', 'idx_ingredients_category').catch(() => {});

    // Products
    await queryInterface.removeIndex('products', 'idx_products_restaurant_category').catch(() => {});
    await queryInterface.removeIndex('products', 'idx_products_soldout').catch(() => {});
    await queryInterface.removeIndex('products', 'idx_products_recipe').catch(() => {});

    // Inventory batches
    await queryInterface.removeIndex('inventory_batches', 'idx_inv_batches_ingredient_status').catch(() => {});
    await queryInterface.removeIndex('inventory_batches', 'idx_inv_batches_expiry').catch(() => {});

    // Stock alerts
    await queryInterface.removeIndex('stock_alerts', 'idx_stock_alerts_restaurant_resolved').catch(() => {});
    await queryInterface.removeIndex('stock_alerts', 'idx_stock_alerts_type').catch(() => {});

    // Recipe ingredients
    await queryInterface.removeIndex('recipe_ingredients', 'idx_recipe_ingredients_recipe').catch(() => {});
    await queryInterface.removeIndex('recipe_ingredients', 'idx_recipe_ingredients_ingredient').catch(() => {});

    // Users
    await queryInterface.removeIndex('users', 'idx_users_restaurant').catch(() => {});
    await queryInterface.removeIndex('users', 'idx_users_role').catch(() => {});

    // Categories
    await queryInterface.removeIndex('categories', 'idx_categories_restaurant').catch(() => {});

    console.log('Performance indexes removed.');
  }
};
