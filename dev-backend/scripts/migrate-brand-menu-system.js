/**
 * v3.32 Migration — Brand Menu System
 *
 * Creates 5 new tables + ALTERs products + option_groups.
 * Idempotent: checks existence before creating/altering.
 *
 * Usage: node scripts/migrate-brand-menu-system.js [--dry-run]
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

async function tableExists(name) {
  const [rows] = await sequelize.query(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    { replacements: [name] }
  );
  return rows.length > 0;
}

async function columnExists(table, col) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, col] }
  );
  return rows.length > 0;
}

async function indexExists(table, idx) {
  const [rows] = await sequelize.query(
    `SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    { replacements: [table, idx] }
  );
  return rows.length > 0;
}

async function run(sql, label) {
  console.log(`  ${DRY ? '[dry] ' : ''}${label}`);
  if (!DRY) await sequelize.query(sql);
}

async function createBrandMenuCategories() {
  if (await tableExists('brand_menu_categories')) { console.log('  ✓ brand_menu_categories exists — skip'); return; }
  await run(`CREATE TABLE brand_menu_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10) NULL,
    image_url TEXT NULL,
    color VARCHAR(20) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    KEY idx_brand (brand_id),
    CONSTRAINT fk_bmc_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`, 'CREATE brand_menu_categories');
}

async function createBrandMenuOptionGroups() {
  if (await tableExists('brand_menu_option_groups')) { console.log('  ✓ brand_menu_option_groups exists — skip'); return; }
  await run(`CREATE TABLE brand_menu_option_groups (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    min_select INT NOT NULL DEFAULT 0,
    max_select INT NOT NULL DEFAULT 1,
    is_required TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    version INT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    KEY idx_brand (brand_id),
    CONSTRAINT fk_bmog_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`, 'CREATE brand_menu_option_groups');
}

async function createBrandMenuOptions() {
  if (await tableExists('brand_menu_options')) { console.log('  ✓ brand_menu_options exists — skip'); return; }
  await run(`CREATE TABLE brand_menu_options (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    extra_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    KEY idx_group (group_id),
    CONSTRAINT fk_bmo_group FOREIGN KEY (group_id) REFERENCES brand_menu_option_groups(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`, 'CREATE brand_menu_options');
}

async function createBrandMenus() {
  if (await tableExists('brand_menus')) { console.log('  ✓ brand_menus exists — skip'); return; }
  await run(`CREATE TABLE brand_menus (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand_id INT NOT NULL,
    category_id INT NULL,
    product_recipe_id INT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url TEXT NULL,
    emoji VARCHAR(10) NULL,
    recommended_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'MYR',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 1,
    distribution_mode ENUM('auto','manual') NOT NULL DEFAULT 'manual',
    lock_name TINYINT(1) NOT NULL DEFAULT 0,
    lock_price TINYINT(1) NOT NULL DEFAULT 0,
    lock_category TINYINT(1) NOT NULL DEFAULT 0,
    lock_image TINYINT(1) NOT NULL DEFAULT 0,
    lock_options TINYINT(1) NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    KEY idx_brand (brand_id),
    KEY idx_brand_category (brand_id, category_id),
    CONSTRAINT fk_bm_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
    CONSTRAINT fk_bm_category FOREIGN KEY (category_id) REFERENCES brand_menu_categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_bm_recipe FOREIGN KEY (product_recipe_id) REFERENCES product_recipes(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`, 'CREATE brand_menus');
}

async function createBrandMenuOptionGroupLinks() {
  if (await tableExists('brand_menu_option_group_links')) { console.log('  ✓ brand_menu_option_group_links exists — skip'); return; }
  await run(`CREATE TABLE brand_menu_option_group_links (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand_menu_id INT NOT NULL,
    option_group_id INT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE KEY uq_menu_group (brand_menu_id, option_group_id),
    KEY idx_menu (brand_menu_id),
    KEY idx_group (option_group_id),
    CONSTRAINT fk_bmogl_menu FOREIGN KEY (brand_menu_id) REFERENCES brand_menus(id) ON DELETE CASCADE,
    CONSTRAINT fk_bmogl_group FOREIGN KEY (option_group_id) REFERENCES brand_menu_option_groups(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`, 'CREATE brand_menu_option_group_links');
}

async function alterProducts() {
  const adds = [
    { col: 'brand_menu_id',            ddl: 'INT NULL' },
    { col: 'brand_menu_synced_version', ddl: 'INT NULL' },
    { col: 'brand_menu_synced_at',     ddl: 'DATETIME NULL' },
    { col: 'brand_menu_locks_snapshot', ddl: 'JSON NULL' },
    { col: 'brand_menu_link_status',   ddl: "ENUM('in_sync','pending_update','unlinked') NULL" }
  ];
  for (const { col, ddl } of adds) {
    if (await columnExists('products', col)) { console.log(`  ✓ products.${col} exists — skip`); continue; }
    await run(`ALTER TABLE products ADD COLUMN ${col} ${ddl}`, `ADD products.${col}`);
  }
  if (!(await indexExists('products', 'idx_brand_menu'))) {
    await run(`ALTER TABLE products ADD INDEX idx_brand_menu (brand_menu_id)`, 'ADD INDEX idx_brand_menu');
  }
  if (!(await indexExists('products', 'idx_link_status'))) {
    await run(`ALTER TABLE products ADD INDEX idx_link_status (restaurant_id, brand_menu_link_status)`, 'ADD INDEX idx_link_status');
  }
  // FK constraint
  const [fkRows] = await sequelize.query(
    `SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'brand_menu_id' AND REFERENCED_TABLE_NAME IS NOT NULL`
  );
  if (fkRows.length === 0) {
    await run(`ALTER TABLE products ADD CONSTRAINT fk_p_brand_menu FOREIGN KEY (brand_menu_id) REFERENCES brand_menus(id) ON DELETE SET NULL`, 'ADD FK p → brand_menus');
  } else {
    console.log('  ✓ FK products.brand_menu_id exists — skip');
  }
}

async function alterOptionGroups() {
  const adds = [
    { col: 'brand_menu_option_group_id', ddl: 'INT NULL' },
    { col: 'brand_menu_synced_version',  ddl: 'INT NULL' }
  ];
  for (const { col, ddl } of adds) {
    if (await columnExists('option_groups', col)) { console.log(`  ✓ option_groups.${col} exists — skip`); continue; }
    await run(`ALTER TABLE option_groups ADD COLUMN ${col} ${ddl}`, `ADD option_groups.${col}`);
  }
  if (!(await indexExists('option_groups', 'idx_brand_menu_option_group'))) {
    await run(`ALTER TABLE option_groups ADD INDEX idx_brand_menu_option_group (brand_menu_option_group_id)`, 'ADD INDEX idx_brand_menu_option_group');
  }
}

(async () => {
  try {
    console.log(`=== v3.32 Brand Menu System migration ${DRY ? '(dry-run)' : ''} ===`);
    await createBrandMenuCategories();
    await createBrandMenuOptionGroups();
    await createBrandMenuOptions();
    await createBrandMenus();
    await createBrandMenuOptionGroupLinks();
    await alterProducts();
    await alterOptionGroups();
    console.log('Done.');
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e);
    await sequelize.close();
    process.exit(1);
  }
})();
