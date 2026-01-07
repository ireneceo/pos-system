/**
 * Manual Migration Runner
 * Runs the performance indexes migration directly
 * MySQL 5.7 compatible version
 */

const { sequelize } = require('../config/database');

/**
 * Add index if not exists (MySQL 5.7 compatible)
 */
async function addIndex(tableName, indexName, columns) {
  try {
    const [result] = await sequelize.query(`
      SELECT COUNT(1) as cnt
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = '${tableName}'
        AND INDEX_NAME = '${indexName}'
    `);

    if (result[0].cnt > 0) {
      console.log(`  - ${indexName}: already exists, skipping`);
      return;
    }

    const columnList = Array.isArray(columns) ? columns.join(', ') : columns;
    await sequelize.query(`CREATE INDEX ${indexName} ON ${tableName} (${columnList})`);
    console.log(`  - ${indexName}: created`);
  } catch (e) {
    console.log(`  - ${indexName}: ${e.message}`);
  }
}

async function runMigration() {
  console.log('Starting performance indexes migration...\n');

  try {
    // ====== ORDERS TABLE ======
    console.log('Adding indexes to orders table...');
    await addIndex('orders', 'idx_orders_restaurant_status_date', ['restaurant_id', 'status', 'order_date']);
    await addIndex('orders', 'idx_orders_restaurant_date', ['restaurant_id', 'order_date']);
    await addIndex('orders', 'idx_orders_status', 'status');
    await addIndex('orders', 'idx_orders_customer', 'customer_id');
    await addIndex('orders', 'idx_orders_table', 'table_number');
    console.log('  Orders indexes done.\n');

    // ====== INVOICES TABLE ======
    console.log('Adding indexes to invoices table...');
    await addIndex('invoices', 'idx_invoices_restaurant_status_created', ['restaurant_id', 'status', 'created_at']);
    await addIndex('invoices', 'idx_invoices_status_due', ['status', 'due_date']);
    console.log('  Invoices indexes done.\n');

    // ====== INVENTORY_TRANSACTIONS TABLE ======
    console.log('Adding indexes to inventory_transactions table...');
    await addIndex('inventory_transactions', 'idx_inv_trans_restaurant_ingredient_date', ['restaurant_id', 'ingredient_id', 'created_at']);
    await addIndex('inventory_transactions', 'idx_inv_trans_type', 'transaction_type');
    console.log('  Inventory transactions indexes done.\n');

    // ====== STOCK_TAKES TABLE ======
    console.log('Adding indexes to stock_takes table...');
    await addIndex('stock_takes', 'idx_stock_takes_restaurant_date', ['restaurant_id', 'stock_take_date']);
    await addIndex('stock_takes', 'idx_stock_takes_status', 'status');
    console.log('  Stock takes indexes done.\n');

    // ====== INGREDIENTS TABLE ======
    console.log('Adding indexes to ingredients table...');
    await addIndex('ingredients', 'idx_ingredients_restaurant_owner', ['restaurant_id', 'owner_type']);
    await addIndex('ingredients', 'idx_ingredients_brand_owner', ['brand_id', 'owner_type']);
    await addIndex('ingredients', 'idx_ingredients_active', 'is_active');
    await addIndex('ingredients', 'idx_ingredients_category', 'ingredient_category_id');
    console.log('  Ingredients indexes done.\n');

    // ====== PRODUCTS TABLE ======
    console.log('Adding indexes to products table...');
    await addIndex('products', 'idx_products_restaurant_category', ['restaurant_id', 'category']);
    await addIndex('products', 'idx_products_soldout', 'soldOut');
    await addIndex('products', 'idx_products_recipe', 'recipe_id');
    console.log('  Products indexes done.\n');

    // ====== INVENTORY_BATCHES TABLE ======
    console.log('Adding indexes to inventory_batches table...');
    await addIndex('inventory_batches', 'idx_inv_batches_ingredient_status', ['ingredient_id', 'status']);
    await addIndex('inventory_batches', 'idx_inv_batches_expiry', 'expiry_date');
    console.log('  Inventory batches indexes done.\n');

    // ====== STOCK_ALERTS TABLE ======
    console.log('Adding indexes to stock_alerts table...');
    await addIndex('stock_alerts', 'idx_stock_alerts_restaurant_resolved', ['restaurant_id', 'resolved']);
    await addIndex('stock_alerts', 'idx_stock_alerts_type', 'alert_type');
    console.log('  Stock alerts indexes done.\n');

    // ====== RECIPE_INGREDIENTS TABLE ======
    console.log('Adding indexes to recipe_ingredients table...');
    await addIndex('recipe_ingredients', 'idx_recipe_ingredients_recipe', 'recipe_id');
    await addIndex('recipe_ingredients', 'idx_recipe_ingredients_ingredient', 'ingredient_id');
    console.log('  Recipe ingredients indexes done.\n');

    // ====== USERS TABLE ======
    console.log('Adding indexes to users table...');
    await addIndex('users', 'idx_users_restaurant', 'restaurant_id');
    await addIndex('users', 'idx_users_role', 'role');
    console.log('  Users indexes done.\n');

    // ====== CATEGORIES TABLE ======
    console.log('Adding indexes to categories table...');
    await addIndex('categories', 'idx_categories_restaurant', 'restaurant_id');
    console.log('  Categories indexes done.\n');

    console.log('=============================================');
    console.log('Performance indexes migration completed!');
    console.log('=============================================');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  await sequelize.close();
  process.exit(0);
}

runMigration();
