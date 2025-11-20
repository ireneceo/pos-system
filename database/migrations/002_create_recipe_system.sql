-- Phase 2: Recipe Management System
-- Created: 2025-11-20

USE purple_dev_db;

-- ============================================
-- 1. recipes 테이블 (레시피 마스터)
-- ============================================
CREATE TABLE IF NOT EXISTS recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 (브랜드 OR 레스토랑, 둘 중 하나만)
  brand_id INT NULL COMMENT 'Brand General이 생성한 레시피',
  restaurant_id INT NULL COMMENT 'Restaurant Admin이 생성한 레시피',

  -- 레시피 정보 (Products와 동일한 구조)
  code VARCHAR(20) COMMENT '레시피 코드',
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,

  -- 이미지/이모지
  image TEXT,
  emoji VARCHAR(10),

  -- 옵션 (Products와 동일한 optionGroups 구조)
  option_groups JSON COMMENT '동일한 옵션 시스템',

  -- 세트 메뉴
  is_set_menu BOOLEAN DEFAULT FALSE,
  set_items JSON COMMENT '세트 구성 아이템',
  set_display_order INT DEFAULT 0,

  -- 원가 정보
  total_ingredient_cost DECIMAL(10, 2) DEFAULT 0.00 COMMENT '재료 원가 합계 (자동 계산)',
  suggested_price DECIMAL(10, 2) COMMENT '권장 판매가',

  -- 조리 정보
  prep_time INT COMMENT '준비 시간 (분)',
  cook_time INT COMMENT '조리 시간 (분)',
  instructions TEXT COMMENT '조리 방법',

  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  version INT DEFAULT 1 COMMENT '레시피 버전',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- 브랜드 레시피 OR 레스토랑 레시피 (하나만)
  CONSTRAINT check_recipe_owner
    CHECK ((brand_id IS NOT NULL AND restaurant_id IS NULL) OR
           (brand_id IS NULL AND restaurant_id IS NOT NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_brand_recipes ON recipes(brand_id);
CREATE INDEX idx_restaurant_recipes ON recipes(restaurant_id);
CREATE INDEX idx_recipe_category ON recipes(category);
CREATE INDEX idx_recipe_active ON recipes(is_active);

-- ============================================
-- 2. ingredients 테이블 (재료 마스터)
-- ============================================
CREATE TABLE IF NOT EXISTS ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 (브랜드 OR 레스토랑)
  brand_id INT NULL,
  restaurant_id INT NULL,

  -- 재료 정보
  code VARCHAR(50) COMMENT '재료 코드',
  name VARCHAR(100) NOT NULL,
  category ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other') DEFAULT 'other',

  -- 재고 단위
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,

  -- 가격
  unit_cost DECIMAL(10, 4) NOT NULL DEFAULT 0.0000 COMMENT '단위당 원가',
  supplier_name VARCHAR(100) COMMENT '공급업체명',

  -- 재고 관련 (Phase 3: Advanced Inventory에서 사용)
  min_stock DECIMAL(10, 2) DEFAULT 0 COMMENT '최소 재고량',
  current_stock DECIMAL(10, 2) DEFAULT 0 COMMENT '현재 재고량',

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT check_ingredient_owner
    CHECK ((brand_id IS NOT NULL AND restaurant_id IS NULL) OR
           (brand_id IS NULL AND restaurant_id IS NOT NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_brand_ingredients ON ingredients(brand_id);
CREATE INDEX idx_restaurant_ingredients ON ingredients(restaurant_id);
CREATE INDEX idx_ingredient_category ON ingredients(category);
CREATE INDEX idx_ingredient_active ON ingredients(is_active);
CREATE INDEX idx_ingredient_name ON ingredients(name);

-- ============================================
-- 3. recipe_ingredients 테이블 (레시피-재료 매핑)
-- ============================================
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- 사용량
  quantity DECIMAL(10, 4) NOT NULL,
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,

  -- 원가 (자동 계산: quantity * ingredient.unit_cost)
  cost DECIMAL(10, 4) DEFAULT 0.0000 COMMENT '해당 재료의 원가',

  -- 메모
  notes TEXT COMMENT '준비 방법이나 팁',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE RESTRICT,

  UNIQUE KEY unique_recipe_ingredient (recipe_id, ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_ingredient ON recipe_ingredients(ingredient_id);

-- ============================================
-- 4. products 테이블 수정 (메뉴-레시피 연결)
-- ============================================
-- Check if column exists before adding
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'purple_dev_db' AND TABLE_NAME = 'products' AND COLUMN_NAME = 'recipe_id');

SET @sql = IF(@col_exists = 0,
  'ALTER TABLE products ADD COLUMN recipe_id INT NULL COMMENT ''연결된 레시피'' AFTER set_display_order',
  'SELECT ''Column recipe_id already exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add foreign key if not exists
SET @fk_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = 'purple_dev_db' AND TABLE_NAME = 'products' AND CONSTRAINT_NAME = 'fk_product_recipe');

SET @sql = IF(@fk_exists = 0,
  'ALTER TABLE products ADD CONSTRAINT fk_product_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL',
  'SELECT ''Foreign key fk_product_recipe already exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add index if not exists
SET @idx_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
  WHERE TABLE_SCHEMA = 'purple_dev_db' AND TABLE_NAME = 'products' AND INDEX_NAME = 'idx_product_recipe');

SET @sql = IF(@idx_exists = 0,
  'CREATE INDEX idx_product_recipe ON products(recipe_id)',
  'SELECT ''Index idx_product_recipe already exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================
-- 완료
-- ============================================
