-- ================================================
-- Phase 1: Feature-Based Subscription System
-- Migration: Add-on Modules & Plan Modules
-- Date: 2025-01-19
-- ================================================

USE purple_dev_db;

-- ================================================
-- 1. Create addon_modules table
-- ================================================

CREATE TABLE IF NOT EXISTS addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('revenue', 'operation', 'analytics') NOT NULL,

  -- Pricing
  base_price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  base_price_annual DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  -- UI Control
  ui_routes JSON DEFAULT NULL COMMENT 'Array of allowed UI routes ["/pos/recipes", "/pos/inventory"]',

  -- Metadata
  features JSON DEFAULT NULL COMMENT 'Feature descriptions for display',
  dependencies JSON DEFAULT NULL COMMENT 'Required module codes ["recipe_management"]',

  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_module_code (module_code),
  INDEX idx_category (category),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- 2. Alter plan_templates table
-- ================================================

-- Check if column exists before adding
SET @dbname = DATABASE();
SET @tablename = 'plan_templates';
SET @columnname = 'included_modules';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' JSON DEFAULT NULL COMMENT ''Array of included addon module codes''')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ================================================
-- 3. Insert default addon modules
-- ================================================

INSERT INTO addon_modules (
  module_code,
  name,
  description,
  category,
  base_price_monthly,
  base_price_annual,
  ui_routes,
  features,
  dependencies,
  sort_order
) VALUES

-- Mobile Ordering (이미 개발 완료)
(
  'mobile_ordering',
  'Mobile Ordering',
  'QR 주문, 모바일 앱, 온라인 결제, 대기열 관리',
  'revenue',
  35.00,
  350.00,
  '[]',
  '["QR Code Table Ordering", "Mobile App Interface", "Online Payment Integration", "Queue Management", "Order Tracking"]',
  '[]',
  10
),

-- Recipe Management
(
  'recipe_management',
  'Recipe Management',
  '브랜드 매니저가 레시피를 생성하고 레스토랑과 공유',
  'operation',
  15.00,
  150.00,
  '["/pos/recipes", "/pos/ingredients"]',
  '["Recipe Creation & Management", "Ingredient Mapping", "Cost Calculation", "Recipe Versioning", "Multi-restaurant Sharing"]',
  '[]',
  20
),

-- Advanced Inventory
(
  'advanced_inventory',
  'Advanced Inventory',
  '실시간 재고 추적, 알림, 재고 실사 기능',
  'operation',
  20.00,
  200.00,
  '["/pos/inventory", "/pos/inventory/transactions", "/pos/inventory/stock-take", "/pos/inventory/alerts"]',
  '["Real-time Stock Tracking", "Automatic Stock Deduction", "Stock Alerts", "Stock Take", "Expiry Management", "Location-based Inventory"]',
  '["recipe_management"]',
  30
),

-- Purchase Order System
(
  'purchase_order',
  'Purchase Order System',
  '발주서 생성, 공급업체 관리, 입고 처리',
  'operation',
  25.00,
  250.00,
  '["/pos/purchase-orders", "/pos/suppliers"]',
  '["Purchase Order Management", "Supplier Management", "Receiving Process", "Auto-ordering Suggestions", "Price Comparison"]',
  '["advanced_inventory"]',
  40
),

-- AI Stock Prediction
(
  'ai_prediction',
  'AI Stock Prediction',
  'AI 기반 재고 예측 및 발주량 자동 제안',
  'analytics',
  30.00,
  300.00,
  '["/pos/analytics/forecast", "/pos/analytics/stock-prediction"]',
  '["AI Stock Forecasting", "Auto Order Quantity Suggestions", "Demand Trend Analysis", "Seasonal Pattern Detection", "Waste Reduction Analysis"]',
  '["advanced_inventory", "purchase_order"]',
  50
)

ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  base_price_monthly = VALUES(base_price_monthly),
  base_price_annual = VALUES(base_price_annual),
  ui_routes = VALUES(ui_routes),
  features = VALUES(features),
  dependencies = VALUES(dependencies),
  updated_at = CURRENT_TIMESTAMP;

-- ================================================
-- 4. Update existing plans with default modules
-- ================================================

-- Basic Plan: 모듈 없음 (기본 POS만)
UPDATE plan_templates
SET included_modules = '[]'
WHERE name = 'basic'
AND (included_modules IS NULL OR included_modules = '');

-- Professional Plan: Recipe Management 포함
UPDATE plan_templates
SET included_modules = '["recipe_management"]'
WHERE name = 'professional'
AND (included_modules IS NULL OR included_modules = '');

-- Enterprise Plan: Recipe + Inventory 포함
UPDATE plan_templates
SET included_modules = '["recipe_management", "advanced_inventory"]'
WHERE name = 'enterprise'
AND (included_modules IS NULL OR included_modules = '');

-- ================================================
-- 5. Verification queries (commented out)
-- ================================================

-- SELECT * FROM addon_modules ORDER BY sort_order;
-- SELECT name, included_modules FROM plan_templates;

-- ================================================
-- Migration Complete
-- ================================================
