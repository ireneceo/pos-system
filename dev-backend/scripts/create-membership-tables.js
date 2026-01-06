/**
 * Create Membership Tables Migration
 * Creates membership_settings and point_transactions tables
 */

const { sequelize } = require('../config/database');

async function createMembershipTables() {
  console.log('Creating membership tables...\n');

  try {
    // 1. membership_settings 테이블
    console.log('1. Creating membership_settings table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS membership_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        restaurant_id INT NOT NULL UNIQUE,

        -- 포인트 적립 설정
        is_active TINYINT(1) DEFAULT 1 COMMENT '멤버십 활성화 여부',
        points_per_currency DECIMAL(10,2) DEFAULT 1.00 COMMENT '통화 1단위당 적립 포인트',
        points_to_currency DECIMAL(10,2) DEFAULT 100.00 COMMENT '포인트 사용 비율 (100포인트 = 1통화)',
        min_points_to_use INT DEFAULT 100 COMMENT '최소 사용 가능 포인트',
        max_points_per_order_percent DECIMAL(5,2) DEFAULT 50.00 COMMENT '주문당 최대 포인트 사용률 (%)',

        -- 등급 기준 (총 지출액 기준)
        silver_threshold DECIMAL(10,2) DEFAULT 500.00 COMMENT 'Silver 승급 기준 금액',
        gold_threshold DECIMAL(10,2) DEFAULT 2000.00 COMMENT 'Gold 승급 기준 금액',
        vip_threshold DECIMAL(10,2) DEFAULT 5000.00 COMMENT 'VIP 승급 기준 금액',

        -- 등급별 보너스 적립률 (배수)
        bronze_bonus_rate DECIMAL(3,2) DEFAULT 1.00 COMMENT 'Bronze 적립 배수 (1.0x)',
        silver_bonus_rate DECIMAL(3,2) DEFAULT 1.20 COMMENT 'Silver 적립 배수 (1.2x)',
        gold_bonus_rate DECIMAL(3,2) DEFAULT 1.50 COMMENT 'Gold 적립 배수 (1.5x)',
        vip_bonus_rate DECIMAL(3,2) DEFAULT 2.00 COMMENT 'VIP 적립 배수 (2.0x)',

        -- 등급별 할인율 (%)
        bronze_discount_percent DECIMAL(5,2) DEFAULT 0.00 COMMENT 'Bronze 할인율',
        silver_discount_percent DECIMAL(5,2) DEFAULT 0.00 COMMENT 'Silver 할인율',
        gold_discount_percent DECIMAL(5,2) DEFAULT 5.00 COMMENT 'Gold 할인율',
        vip_discount_percent DECIMAL(5,2) DEFAULT 10.00 COMMENT 'VIP 할인율',

        -- 포인트 유효 기간 (일, 0 = 무제한)
        points_expiry_days INT DEFAULT 0 COMMENT '포인트 유효 기간 (일), 0=무제한',

        -- 환영 포인트
        welcome_points INT DEFAULT 0 COMMENT '회원가입 시 지급 포인트',

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
        INDEX idx_restaurant (restaurant_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   membership_settings created.\n');

    // 2. point_transactions 테이블
    console.log('2. Creating point_transactions table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS point_transactions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        customer_id INT NOT NULL,
        order_id INT DEFAULT NULL COMMENT '연결된 주문 ID',

        type ENUM('earn', 'use', 'expire', 'adjust', 'welcome', 'refund') NOT NULL COMMENT '거래 유형',
        points INT NOT NULL COMMENT '변동 포인트 (+적립/-사용)',
        balance_after INT NOT NULL COMMENT '거래 후 잔액',

        description VARCHAR(255) COMMENT '거래 설명',
        bonus_rate DECIMAL(3,2) DEFAULT 1.00 COMMENT '적용된 보너스 배수',

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,

        INDEX idx_restaurant_customer (restaurant_id, customer_id),
        INDEX idx_customer (customer_id),
        INDEX idx_order (order_id),
        INDEX idx_type (type),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   point_transactions created.\n');

    // 3. restaurant_customers 테이블에 컬럼 추가
    console.log('3. Adding columns to restaurant_customers...');

    // points_expiring 컬럼 확인 및 추가
    const [expiringCol] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'restaurant_customers'
      AND COLUMN_NAME = 'points_expiring'
    `);

    if (expiringCol.length === 0) {
      await sequelize.query(`
        ALTER TABLE restaurant_customers
        ADD COLUMN points_expiring INT DEFAULT 0 COMMENT '곧 만료될 포인트'
      `);
      console.log('   points_expiring column added.');
    } else {
      console.log('   points_expiring column already exists.');
    }

    // points_expiry_date 컬럼 확인 및 추가
    const [expiryDateCol] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'restaurant_customers'
      AND COLUMN_NAME = 'points_expiry_date'
    `);

    if (expiryDateCol.length === 0) {
      await sequelize.query(`
        ALTER TABLE restaurant_customers
        ADD COLUMN points_expiry_date DATE DEFAULT NULL COMMENT '포인트 만료 예정일'
      `);
      console.log('   points_expiry_date column added.');
    } else {
      console.log('   points_expiry_date column already exists.');
    }

    console.log('\n=============================================');
    console.log('Membership tables created successfully!');
    console.log('=============================================');

  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }

  await sequelize.close();
  process.exit(0);
}

createMembershipTables();
