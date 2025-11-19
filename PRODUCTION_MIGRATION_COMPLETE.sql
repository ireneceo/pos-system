-- ============================================
-- Complete Production Migration Script
-- Date: 2025-11-12
-- Purpose: Synchronize dev and production database schemas
-- ============================================

-- IMPORTANT: This is a SAFE migration
-- - Only ADDS missing columns (no data modification)
-- - All columns are nullable or have defaults (no impact on existing data)
-- - No existing columns are changed
-- - Rollback is simple (just drop the columns)

-- ============================================
-- Step 1: Backup Check (run this first!)
-- ============================================
-- REQUIRED: Create backup BEFORE running this migration!
-- mysqldump -u prod_admin -p purple_production_db > /var/www/backups/backup_$(date +%Y%m%d_%H%M%S).sql

-- ============================================
-- Step 2: Pre-Migration Verification
-- ============================================

-- Check current orders count (to verify after migration)
SELECT
    'Pre-migration check' as stage,
    COUNT(*) as total_orders,
    COUNT(DISTINCT order_number) as unique_orders
FROM orders;

-- Check current schema
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'orders'
ORDER BY ORDINAL_POSITION;

-- ============================================
-- Step 3: Add Missing Columns
-- ============================================

-- 3.1 Add takeaway_charge column (if not exists)
-- This column stores additional charges for takeaway orders
SET @col_exists = (SELECT COUNT(*)
                   FROM INFORMATION_SCHEMA.COLUMNS
                   WHERE TABLE_SCHEMA = DATABASE()
                   AND TABLE_NAME = 'orders'
                   AND COLUMN_NAME = 'takeaway_charge');

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE orders ADD COLUMN takeaway_charge DECIMAL(10,2) DEFAULT 0.00 COMMENT ''Additional charge for takeaway orders'' AFTER coupon_discount',
    'SELECT ''takeaway_charge column already exists'' AS message');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3.2 Add served_at column (if not exists)
-- This column records when order was served to customer
SET @col_exists = (SELECT COUNT(*)
                   FROM INFORMATION_SCHEMA.COLUMNS
                   WHERE TABLE_SCHEMA = DATABASE()
                   AND TABLE_NAME = 'orders'
                   AND COLUMN_NAME = 'served_at');

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE orders ADD COLUMN served_at DATETIME NULL COMMENT ''Timestamp when order was served to customer'' AFTER kitchen_ready',
    'SELECT ''served_at column already exists'' AS message');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================
-- Step 4: Post-Migration Verification
-- ============================================

-- Verify all columns now match dev schema
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    CHARACTER_MAXIMUM_LENGTH,
    NUMERIC_PRECISION,
    NUMERIC_SCALE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'orders'
  AND COLUMN_NAME IN ('takeaway_charge', 'served_at', 'pager_number')
ORDER BY ORDINAL_POSITION;

-- Verify all existing orders still have their data
SELECT
    'Post-migration check' as stage,
    COUNT(*) as total_orders,
    COUNT(DISTINCT order_number) as unique_orders,
    COUNT(pager_number) as orders_with_pager,
    COUNT(served_at) as orders_with_served_at,
    SUM(takeaway_charge) as total_takeaway_charges
FROM orders;

-- Show full current schema
DESCRIBE orders;

-- ============================================
-- Step 5: Expected Results
-- ============================================

-- Expected columns after migration:
-- 1. pager_number: VARCHAR(10), YES, NULL
-- 2. takeaway_charge: DECIMAL(10,2), YES, 0.00
-- 3. served_at: DATETIME, YES, NULL

-- ============================================
-- Step 6: Rollback (if needed)
-- ============================================

-- If you need to rollback this migration, run:
-- ALTER TABLE orders DROP COLUMN takeaway_charge;
-- ALTER TABLE orders DROP COLUMN served_at;

-- Or restore from backup:
-- mysql -u prod_admin -p purple_production_db < /var/www/backups/backup_[timestamp].sql

-- ============================================
-- Migration Summary
-- ============================================

-- ✅ Safe Changes:
--    - New column: takeaway_charge (DECIMAL(10,2), DEFAULT 0.00)
--    - New column: served_at (DATETIME, NULLABLE)
--    - Existing column: pager_number (already exists from previous migration)

-- ✅ Data Safety:
--    - No existing data modified
--    - No existing columns changed
--    - All existing orders remain intact
--    - Existing queries continue to work
--    - New columns have safe defaults (0.00 for takeaway_charge, NULL for served_at)

-- ✅ Rollback Strategy:
--    - Simple: DROP COLUMN for each new column
--    - Or: Restore from backup
--    - No data loss risk

-- ✅ What This Fixes:
--    - Deployment script will no longer fail with "Unknown column 'takeaway_charge'"
--    - "Served at" time will display correctly in Live Orders
--    - Dev and Production schemas are now synchronized

-- ============================================
-- End of Migration Script
-- ============================================
