# 푸드코트 포스시스템 데이터베이스 ERD

## 📋 문서 정보
- **문서명**: 데이터베이스 ERD (Entity Relationship Diagram)
- **버전**: v1.0
- **최종수정**: 2025-07-08
- **작성목적**: 클로드 코드 개발 가이드용

## 🗄️ 데이터베이스 구조 개요

### 핵심 테이블 9개 (옵션 시스템 포함)

```
📊 데이터베이스 구조:
1. stores (업체 정보)
2. menu_categories (메뉴 카테고리)
3. menu_items (메뉴)
4. option_groups (옵션 그룹)
5. option_items (옵션 항목)
6. menu_option_groups (메뉴-옵션그룹 연결)
7. orders (주문)
8. order_items (주문 상세)
9. order_item_options (주문된 옵션 상세)
```

## 📝 테이블 정의

### 1. stores (업체 정보)

```sql
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT '업체명',
    business_number VARCHAR(50) UNIQUE COMMENT '사업자등록번호',
    owner_name VARCHAR(100) COMMENT '대표자명',
    phone VARCHAR(20) COMMENT '전화번호',
    email VARCHAR(255) COMMENT '이메일',
    address TEXT COMMENT '주소',
    logo_url VARCHAR(500) COMMENT '로고 이미지 URL',

    -- 브랜딩 설정
    primary_color VARCHAR(7) DEFAULT '#2563EB' COMMENT '메인 컬러 (HEX)',
    secondary_color VARCHAR(7) DEFAULT '#EF4444' COMMENT '보조 컬러',

    -- 운영 정보
    open_time TIME DEFAULT '09:00:00' COMMENT '오픈 시간',
    close_time TIME DEFAULT '22:00:00' COMMENT '마감 시간',
    is_open BOOLEAN DEFAULT true COMMENT '영업 중 여부',

    -- 구독 정보
    subscription_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    subscription_end_date DATE COMMENT '구독 만료일',
    monthly_fee DECIMAL(8,2) DEFAULT 70.00 COMMENT '월 구독료 (링깃)',

    -- 회원가입 관련
    admin_user_id INT NULL COMMENT '관리자 계정 ID',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='업체 정보';
```

### 2. menu_categories (메뉴 카테고리)

```sql
CREATE TABLE menu_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,

    name VARCHAR(255) NOT NULL COMMENT '카테고리명 (한식, 중식, 일식 등)',
    description TEXT COMMENT '카테고리 설명',
    sort_order INT DEFAULT 0 COMMENT '정렬 순서',
    is_active BOOLEAN DEFAULT true COMMENT '활성화 여부',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='메뉴 카테고리';
```

### 3. menu_items (메뉴)

```sql
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    category_id INT NOT NULL,

    name VARCHAR(255) NOT NULL COMMENT '메뉴명',
    description TEXT COMMENT '메뉴 설명',
    base_price DECIMAL(10,2) NOT NULL COMMENT '기본 가격',
    image_url VARCHAR(500) COMMENT '메뉴 이미지 URL',

    -- 상태 관리
    is_available BOOLEAN DEFAULT true COMMENT '판매 가능 여부',
    is_popular BOOLEAN DEFAULT false COMMENT '인기 메뉴 여부',

    -- 정렬 순서
    sort_order INT DEFAULT 0 COMMENT '메뉴 정렬 순서',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='메뉴';
```

### 4. option_groups (옵션 그룹)

```sql
CREATE TABLE option_groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,

    name VARCHAR(255) NOT NULL COMMENT '옵션 그룹명 (관리자가 입력: 맵기정도, 크기선택, 추가재료 등)',
    description TEXT COMMENT '옵션 그룹 설명',

    -- 선택 방식
    selection_type ENUM('single', 'multiple') DEFAULT 'single' COMMENT '단일선택/다중선택',
    is_required BOOLEAN DEFAULT false COMMENT '필수 선택 여부',

    -- 가격 영향
    affects_price BOOLEAN DEFAULT true COMMENT '가격에 영향을 주는지',

    sort_order INT DEFAULT 0 COMMENT '정렬 순서',
    is_active BOOLEAN DEFAULT true COMMENT '활성화 여부',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='옵션 그룹';
```

### 5. option_items (옵션 항목)

```sql
CREATE TABLE option_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    option_group_id INT NOT NULL,

    name VARCHAR(255) NOT NULL COMMENT '옵션명 (관리자가 입력: 안맵게, 적당히맵게, 아주맵게 등)',
    description TEXT COMMENT '옵션 설명 (고객에게 보여줄 상세 설명)',

    -- 가격 정보
    price_adjustment DECIMAL(10,2) DEFAULT 0 COMMENT '가격 조정 (+1000, -500, 0 등)',
    price_type ENUM('add', 'multiply') DEFAULT 'add' COMMENT '가격 적용 방식 (더하기/곱하기)',

    sort_order INT DEFAULT 0 COMMENT '정렬 순서',
    is_available BOOLEAN DEFAULT true COMMENT '선택 가능 여부',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (option_group_id) REFERENCES option_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='옵션 항목';
```

### 6. menu_option_groups (메뉴-옵션그룹 연결)

```sql
CREATE TABLE menu_option_groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_item_id INT NOT NULL,
    option_group_id INT NOT NULL,

    is_required BOOLEAN DEFAULT false COMMENT '이 메뉴에서 필수 선택인지',
    sort_order INT DEFAULT 0 COMMENT '정렬 순서',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
    FOREIGN KEY (option_group_id) REFERENCES option_groups(id) ON DELETE CASCADE,
    UNIQUE KEY unique_menu_option (menu_item_id, option_group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='메뉴-옵션그룹 연결';
```

### 7. orders (주문)

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    customer_id INT NULL COMMENT '고객 ID (회원이면 저장)',

    -- 픽업 번호 시스템
    pickup_number VARCHAR(10) NOT NULL COMMENT '픽업 번호 (001, 002...)',

    -- 주문 정보
    total_amount DECIMAL(10,2) NOT NULL COMMENT '총 주문 금액',
    tax_amount DECIMAL(10,2) DEFAULT 0 COMMENT '세금',
    discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '할인 금액',
    points_used INT DEFAULT 0 COMMENT '사용한 포인트',
    points_earned INT DEFAULT 0 COMMENT '적립된 포인트',
    final_amount DECIMAL(10,2) NOT NULL COMMENT '최종 결제 금액',

    -- 상태 관리
    status ENUM('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled')
           DEFAULT 'pending' COMMENT '주문 상태',

    -- 주문 구분
    order_source ENUM('pos', 'mobile') NOT NULL COMMENT '주문 출처 (포스/모바일)',
    staff_user_id INT NULL COMMENT '처리한 직원 ID (포스 주문시)',

    -- 결제 구분
    payment_method ENUM('cash', 'card', 'mobile_card', 'mobile_pay') NOT NULL COMMENT '결제 방법',
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',

    -- 고객 정보 (비회원도 주문 가능)
    customer_phone VARCHAR(20) COMMENT '고객 전화번호',
    customer_name VARCHAR(100) COMMENT '고객 이름',

    -- 할인 정보 (포스에서만 가능)
    staff_discount_reason VARCHAR(255) COMMENT '직원 할인 사유',

    -- 시간 관리
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '주문 시간',
    paid_at TIMESTAMP NULL COMMENT '결제 완료 시간',
    ready_at TIMESTAMP NULL COMMENT '조리 완료 시간',
    completed_at TIMESTAMP NULL COMMENT '픽업 완료 시간',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (staff_user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_pickup_number (store_id, pickup_number),
    INDEX idx_status (status),
    INDEX idx_order_source (order_source),
    INDEX idx_customer (customer_id),
    INDEX idx_ordered_at (ordered_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='주문';
```

### 8. order_items (주문 상세)

```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,

    -- 주문 정보
    quantity INT NOT NULL DEFAULT 1 COMMENT '수량',
    base_price DECIMAL(10,2) NOT NULL COMMENT '메뉴 기본 가격',
    options_price DECIMAL(10,2) DEFAULT 0 COMMENT '옵션 추가 가격',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '최종 단가 (기본가격 + 옵션가격)',
    total_price DECIMAL(10,2) NOT NULL COMMENT '총 가격 (단가 × 수량)',

    -- 특이사항
    special_notes TEXT COMMENT '특이사항 (알레르기 등)',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='주문 상세';
```

### 9. order_item_options (주문된 옵션 상세)

```sql
CREATE TABLE order_item_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_item_id INT NOT NULL,
    option_group_id INT NOT NULL,
    option_item_id INT NOT NULL,

    -- 주문 당시 정보 저장 (나중에 옵션이 변경되어도 주문 기록 유지)
    option_group_name VARCHAR(255) NOT NULL COMMENT '옵션 그룹명 (주문 당시)',
    option_item_name VARCHAR(255) NOT NULL COMMENT '옵션명 (주문 당시)',
    price_adjustment DECIMAL(10,2) DEFAULT 0 COMMENT '가격 조정 (주문 당시)',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
    FOREIGN KEY (option_group_id) REFERENCES option_groups(id),
    FOREIGN KEY (option_item_id) REFERENCES option_items(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='주문된 옵션 상세';
```

## 🔗 관계도 (ERD)

### 테이블 관계 구조

```
stores (업체)
├── 1:N → menu_categories (카테고리)
├── 1:N → menu_items (메뉴)
├── 1:N → option_groups (옵션그룹)
└── 1:N → orders (주문)

menu_items (메뉴)
├── N:1 → menu_categories (카테고리)
├── N:M → option_groups (메뉴-옵션그룹 연결테이블)
└── 1:N → order_items (주문상세)

option_groups (옵션그룹)
├── 1:N → option_items (옵션항목)
├── N:M → menu_items (메뉴-옵션그룹 연결테이블)
└── 1:N → order_item_options (주문된옵션)

orders (주문)
└── 1:N → order_items (주문상세)
    └── 1:N → order_item_options (주문된옵션상세)
```

## 📊 옵션 시스템 예시

### 한식집 옵션 설정 예시

```sql
-- 1. 옵션 그룹 생성 (관리자가 직접 입력)
INSERT INTO option_groups (store_id, name, selection_type, is_required) VALUES
(1, '맵기 정도', 'single', true),
(1, '밥 양', 'single', false),
(1, '추가 반찬', 'multiple', false);

-- 2. 옵션 항목들 생성 (관리자가 직접 입력)
-- 맵기 정도 옵션들
INSERT INTO option_items (option_group_id, name, price_adjustment) VALUES
(1, '안 맵게', 0),
(1, '적당히 맵게', 0),
(1, '많이 맵게', 500),
(1, '엄청 맵게', 1000);

-- 밥 양 옵션들
INSERT INTO option_items (option_group_id, name, price_adjustment) VALUES
(2, '보통', 0),
(2, '곱빼기', 1000),
(2, '반공기', -500);

-- 추가 반찬 옵션들
INSERT INTO option_items (option_group_id, name, price_adjustment) VALUES
(3, '김치 추가', 1000),
(3, '계란후라이', 1500),
(3, '치즈 추가', 2000);
```

### 중식집 옵션 설정 예시

```sql
INSERT INTO option_groups (store_id, name, selection_type, is_required) VALUES
(2, '소스 종류', 'single', true),
(2, '면 종류', 'single', true),
(2, '매운 정도', 'single', false);

INSERT INTO option_items (option_group_id, name, price_adjustment) VALUES
-- 소스 종류
(4, '간짜장', 0),
(4, '일반짜장', 0),
(4, '삼선짜장', 2000),
-- 면 종류
(5, '일반면', 0),
(5, '쫄면', 500),
(5, '우동면', 1000),
-- 매운 정도
(6, '순한맛', 0),
(6, '중간맛', 0),
(6, '매운맛', 0);
```

### 양식집 옵션 설정 예시

```sql
INSERT INTO option_groups (store_id, name, selection_type, is_required) VALUES
(3, '파스타 종류', 'single', true),
(3, '치즈 추가', 'single', false),
(3, '음료 선택', 'single', true);

INSERT INTO option_items (option_group_id, name, price_adjustment) VALUES
-- 파스타 종류
(7, '스파게티', 0),
(7, '펜네', 500),
(7, '링귀니', 1000),
-- 치즈 추가
(8, '치즈 없음', 0),
(8, '모짜렐라', 1500),
(8, '파마산', 2000),
-- 음료 선택
(9, '콜라', 1500),
(9, '사이다', 1500),
(9, '오렌지주스', 2000);
```

## 🔍 인덱스 전략

### 성능 최적화를 위한 인덱스

```sql
-- stores 테이블
ALTER TABLE stores ADD INDEX idx_subscription_status (subscription_status);
ALTER TABLE stores ADD INDEX idx_is_open (is_open);

-- menu_categories 테이블
ALTER TABLE menu_categories ADD INDEX idx_store_active (store_id, is_active);
ALTER TABLE menu_categories ADD INDEX idx_sort_order (sort_order);

-- menu_items 테이블
ALTER TABLE menu_items ADD INDEX idx_store_category (store_id, category_id);
ALTER TABLE menu_items ADD INDEX idx_available (is_available);
ALTER TABLE menu_items ADD INDEX idx_popular (is_popular);

-- option_groups 테이블
ALTER TABLE option_groups ADD INDEX idx_store_active (store_id, is_active);

-- option_items 테이블
ALTER TABLE option_items ADD INDEX idx_group_available (option_group_id, is_available);

-- orders 테이블 (이미 정의됨)
-- order_items 테이블
ALTER TABLE order_items ADD INDEX idx_order_menu (order_id, menu_item_id);

-- order_item_options 테이블
ALTER TABLE order_item_options ADD INDEX idx_order_item (order_item_id);
```

## 💾 데이터 무결성 규칙

### 비즈니스 로직 제약사항

```sql
-- 1. 주문 금액 검증
ALTER TABLE orders ADD CONSTRAINT chk_final_amount_positive 
CHECK (final_amount >= 0);

-- 2. 수량 검증
ALTER TABLE order_items ADD CONSTRAINT chk_quantity_positive 
CHECK (quantity > 0);

-- 3. 가격 검증
ALTER TABLE menu_items ADD CONSTRAINT chk_base_price_positive 
CHECK (base_price >= 0);

-- 4. 정렬 순서 검증
ALTER TABLE menu_categories ADD CONSTRAINT chk_sort_order_non_negative 
CHECK (sort_order >= 0);

-- 5. 픽업 번호 형식 검증
ALTER TABLE orders ADD CONSTRAINT chk_pickup_number_format 
CHECK (pickup_number REGEXP '^[0-9]{3}$');
```

## 🔄 트리거 및 프로시저

### 자동화된 비즈니스 로직

```sql
-- 1. 주문 생성 시 픽업 번호 자동 생성
DELIMITER //
CREATE TRIGGER generate_pickup_number 
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE next_number INT;
    
    SELECT COALESCE(MAX(CAST(pickup_number AS UNSIGNED)), 0) + 1 
    INTO next_number
    FROM orders 
    WHERE store_id = NEW.store_id 
    AND DATE(created_at) = CURDATE();
    
    SET NEW.pickup_number = LPAD(next_number, 3, '0');
END//
DELIMITER ;

-- 2. 주문 상품 가격 계산
DELIMITER //
CREATE TRIGGER calculate_order_item_price 
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    SET NEW.unit_price = NEW.base_price + NEW.options_price;
    SET NEW.total_price = NEW.unit_price * NEW.quantity;
END//
DELIMITER ;
```

---

## 📝 클로드 코드 개발 가이드

### 데이터베이스 구현 시 주의사항

1. **외래 키 제약조건 준수**
   - CASCADE 삭제 규칙 적용
   - 참조 무결성 유지

2. **인덱스 최적화**
   - 자주 조회되는 컬럼 인덱스
   - 복합 인덱스 활용

3. **트랜잭션 처리**
   - 주문 생성 시 원자성 보장
   - 롤백 시나리오 고려

4. **데이터 타입 최적화**
   - DECIMAL 사용 (가격)
   - ENUM 사용 (상태값)
   - TEXT vs VARCHAR 적절한 선택

### 구현 우선순위

1. **1단계**: 기본 테이블 생성 (stores, menu_categories, menu_items)
2. **2단계**: 옵션 시스템 (option_groups, option_items, menu_option_groups)
3. **3단계**: 주문 시스템 (orders, order_items, order_item_options)
4. **4단계**: 인덱스 및 제약조건 추가
5. **5단계**: 트리거 및 프로시저 구현