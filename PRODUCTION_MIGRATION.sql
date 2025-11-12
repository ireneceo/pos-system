-- ============================================
-- Production Migration Script
-- Date: 2025-11-12
-- Purpose: Add Pager System support
-- ============================================

-- IMPORTANT: This is a SAFE migration
-- - Only ADDS a new column (no data modification)
-- - Column is nullable (no impact on existing data)
-- - No existing columns are changed
-- - Rollback is simple (just drop the column)

-- ============================================
-- Step 1: Backup Check (run this first!)
-- ============================================
-- Run this BEFORE migration:
-- mysqldump -u [user] -p [database] > backup_$(date +%Y%m%d_%H%M%S).sql

-- ============================================
-- Step 2: Pre-Migration Verification
-- ============================================

-- Check current orders count (to verify after migration)
SELECT
    'Pre-migration check' as stage,
    COUNT(*) as total_orders,
    COUNT(DISTINCT order_number) as unique_orders
FROM orders;

-- Check if pager_number column already exists
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'orders'
  AND COLUMN_NAME = 'pager_number';

-- If above query returns a row, the column already exists - SKIP migration

-- ============================================
-- Step 3: Add pager_number column
-- ============================================

-- This is the ONLY change to the database schema
ALTER TABLE orders
ADD COLUMN pager_number VARCHAR(10) NULL
COMMENT 'Pager device number for order notification'
AFTER table_number;

-- ============================================
-- Step 4: Post-Migration Verification
-- ============================================

-- Verify column was added
DESCRIBE orders;

-- Verify all existing orders still have their data
SELECT
    'Post-migration check' as stage,
    COUNT(*) as total_orders,
    COUNT(DISTINCT order_number) as unique_orders,
    COUNT(pager_number) as orders_with_pager
FROM orders;

-- Check that pager_number is nullable and has correct type
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'orders'
  AND COLUMN_NAME = 'pager_number';

-- Expected result:
-- COLUMN_NAME: pager_number
-- DATA_TYPE: varchar
-- IS_NULLABLE: YES
-- COLUMN_DEFAULT: NULL
-- CHARACTER_MAXIMUM_LENGTH: 10

-- ============================================
-- Step 5: Rollback (if needed)
-- ============================================

-- If you need to rollback this migration:
-- ALTER TABLE orders DROP COLUMN pager_number;

-- Or restore from backup:
-- mysql -u [user] -p [database] < backup_[timestamp].sql

-- ============================================
-- Migration Summary
-- ============================================

-- ✅ Safe Changes:
--    - New column: pager_number (VARCHAR(10), NULLABLE)
--    - Position: After table_number column
--    - Default: NULL (no impact on existing rows)

-- ✅ Data Safety:
--    - No existing data modified
--    - No existing columns changed
--    - All existing orders remain intact
--    - Existing queries continue to work

-- ✅ Rollback Strategy:
--    - Simple: DROP COLUMN pager_number
--    - Or: Restore from backup
--    - No data loss risk

-- ============================================
-- End of Migration Script
-- ============================================
