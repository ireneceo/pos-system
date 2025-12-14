# Purple POS - 개발 진행 현황

> **최종 업데이트:** 2025-12-14
> **데이터베이스:** purple_dev_db (MySQL)
> **프로젝트:** 구독 기반 POS 시스템 with 모듈 관리

---

## 📋 목차
1. [시스템 구조](#시스템-구조)
2. [완료된 작업](#완료된-작업)
3. [진행 중인 작업](#진행-중인-작업)
4. [예정된 작업](#예정된-작업)
5. [데이터베이스 스키마](#데이터베이스-스키마)
6. [주요 파일 목록](#주요-파일-목록)
7. [트러블슈팅 히스토리](#트러블슈팅-히스토리)

---

## 🏗️ 시스템 구조

### 사용자 계층 구조
```
시스템 관리자 (Admin)
├─ Restaurant Owners
│  ├─ 레스토랑 소유자
│  └─ 구독: Restaurant Plans (Basic/Professional/Enterprise)
│
├─ Foodcourt General (구독 관리)
│  ├─ Foodcourt Manager들 생성/관리
│  └─ 구독: Foodcourt Plans (Basic/Professional/Enterprise)
│
└─ Brand General (구독 관리)
   ├─ Brand Manager들 생성/관리
   └─ 구독: Brand Plans (Basic/Professional/Enterprise)
```

### 플랜 구조
```
Restaurant Plans (레스토랑 소유자용)
├─ Basic Plan (RM 29/month)
├─ Professional Plan (RM 59/month)
└─ Enterprise Plan (RM 99/month)

Brand Plans (브랜드 관리용)
├─ Brand Basic (RM 149/month)
├─ Brand Professional (RM 299/month)
└─ Brand Enterprise (RM 499/month)

Foodcourt Plans (푸드코트 관리용)
├─ Foodcourt Basic (RM 149/month)
├─ Foodcourt Professional (RM 299/month)
└─ Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 체계
```
Restaurant Modules (target_user_type: 'restaurant')
├─ Basic: POS Terminal, Menu Management, Customer Management, etc.
└─ Advanced: Mobile Ordering, Recipe Management, Advanced Inventory

Brand Modules (target_user_type: 'brand')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Brand Management, User Management, Subscription Management

Foodcourt Modules (target_user_type: 'foodcourt')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Foodcourt Management, User Management, Subscription Management

Shared Modules (target_user_type: 'all')
└─ Restaurant Management (multi-restaurant management)
```

---

## ✅ 완료된 작업

### Phase 1: 데이터베이스 구조 개선 (2025-11-18 ~ 2025-11-19)

#### 1.1 Plan Template 모델 재구조화
**파일:** `/var/www/dev-backend/models/PlanTemplate.js`

**변경사항:**
- `plan_target` ENUM 추가: `'restaurant'`, `'brand'`, `'foodcourt'`
- Manager Plans를 Brand/Foodcourt Plans로 분리
- 기존 Manager Plans 삭제 후 재생성

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE plan_templates
MODIFY COLUMN plan_target ENUM('restaurant', 'brand', 'foodcourt');

-- 기존 Manager Plans 삭제
DELETE FROM plan_templates WHERE id IN (4, 5, 6);

-- Brand Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('brand_basic', 'Brand Basic', 149.00, 1490.00, ..., 'brand'),
('brand_professional', 'Brand Professional', 299.00, 2990.00, ..., 'brand'),
('brand_enterprise', 'Brand Enterprise', 499.00, 4990.00, ..., 'brand');

-- Foodcourt Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('foodcourt_basic', 'Foodcourt Basic', 149.00, 1490.00, ..., 'foodcourt'),
('foodcourt_professional', 'Foodcourt Professional', 299.00, 2990.00, ..., 'foodcourt'),
('foodcourt_enterprise', 'Foodcourt Enterprise', 499.00, 4990.00, ..., 'foodcourt');
```

#### 1.2 Addon Module 모델 재구조화
**파일:** `/var/www/dev-backend/models/AddonModule.js`

**변경사항:**
- `target_user_type` ENUM 변경: `'restaurant'`, `'brand'`, `'foodcourt'`, `'all'`
- 모듈 분류 재정의
- Restaurant 전용 모듈과 Manager 전용 모듈 명확히 분리

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE addon_modules
MODIFY COLUMN target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all');

-- Restaurant 전용 모듈 설정
UPDATE addon_modules
SET target_user_type = 'restaurant'
WHERE module_code IN ('mobile_ordering', 'recipe_management', 'advanced_inventory');

-- Brand/Foodcourt 공통 모듈 설정
UPDATE addon_modules
SET target_user_type = 'all'
WHERE module_code IN ('brand_management', 'foodcourt_management');

-- 카테고리 재분류
UPDATE addon_modules SET category = 'basic'
WHERE module_code IN ('manager_dashboard', 'operation_inquiry');
```

#### 1.3 모듈 설명 개선
**변경사항:**
- Brand Management 상세 설명 추가
- Foodcourt Management 상세 설명 추가

**SQL 실행:**
```sql
UPDATE addon_modules
SET description = 'Manage multiple restaurant brands, standardize menus across locations, control brand-wide pricing and promotions, enforce brand guidelines, track brand performance metrics'
WHERE module_code = 'brand_management';

UPDATE addon_modules
SET description = 'Manage foodcourt operations, coordinate multiple vendors and restaurants, shared payment processing, unified customer queue system, foodcourt-wide promotions and events'
WHERE module_code = 'foodcourt_management';
```

### Phase 2: Admin 페이지 UI 개선 (2025-11-19)

#### 2.1 Plans Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/PlansPage.tsx`

**완료 항목:**
1. ✅ Plan Target 드롭다운을 3개로 확장 (Restaurant/Brand/Foodcourt)
2. ✅ 모듈 선택 시 target_user_type 기반 필터링
3. ✅ 체크박스 UI 정렬 개선 (align-items: flex-start)
4. ✅ Plan Name 필드 단순화 (Display Name만 입력, 내부 이름 자동 생성)
5. ✅ Features 필드를 Modules 아래로 이동
6. ✅ 리스트 카드 순서 변경 (Limits → Modules → Features)
7. ✅ 섹션 여백 축소 (12px → 8px)
8. ✅ Edit Plan JSON 파싱 에러 수정

#### 2.2 Restaurants Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/RestaurantsPage.tsx`

**완료 항목:**
1. ✅ Restaurant Plans만 표시되도록 필터링
2. ✅ Add Restaurant 모달에 동적 플랜 로딩
3. ✅ Edit Restaurant 모달에 기존 플랜 데이터 유지
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

#### 2.3 Managers Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/ManagersPage.tsx`

**완료 항목:**
1. ✅ Manager Role을 General만 선택 가능하도록 제한 (Foodcourt General, Brand General)
2. ✅ 구독 설정 필드 추가 (Subscription Plan, Billing Cycle, Dates, Auto-renew)
3. ✅ Role 변경 시 플랜 자동 업데이트
4. ✅ Edit Manager 기능 추가 (Edit 버튼 ✎ 추가)
5. ✅ Edit Manager 모달에 구독 설정 필드 추가
6. ✅ 기본 Role을 Foodcourt General로 변경

**Manager 계층 구조:**
- 시스템 관리자는 **General만** 추가/관리
- General은 자신의 Manager들을 별도 페이지에서 관리 (향후 구현)

#### 2.4 Subscriptions Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`

**완료 항목:**
1. ✅ User Type 선택기 추가 (Restaurant/Brand Manager/Foodcourt Manager)
2. ✅ User Type별 플랜 동적 필터링
3. ✅ User Type 변경 시 검색 대상 자동 변경 (Restaurant ↔ Manager)
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

### Phase 3: 모달 UI/UX 개선 (2025-11-19)

#### 3.1 모든 페이지 모달 기본값 설정
**완료 항목:**
1. ✅ Plans API 응답 확인 (9개 플랜 정상 반환)
2. ✅ Restaurants Page 모달 기본값 설정
3. ✅ Managers Page 모달 기본값 설정
4. ✅ Subscriptions Page 모달 기본값 설정

---

## ✅ 완료된 작업 (최근)

### Phase 2: Recipe Management (2025-11-20 ~ 2025-12-10) - 완료

**상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 최종 구현된 권한 구조 (owner_type 기반)

```javascript
// 레시피/재료의 소유권은 owner_type으로 구분
if (recipe.owner_type === 'brand') {
  // Brand General/Manager: CRUD 가능
  // Restaurant Admin: 조회만 가능 (수정 불가)
} else {
  // Restaurant Admin: CRUD 가능
  // Brand General/Manager: 접근 불가 (표시 안됨)
}
```

**핵심 구현사항:**
- `recipe_manager_type` 방식 → `owner_type` 방식으로 단순화
- 브랜드 레시피: Brand General/Manager만 수정, Restaurant Admin은 조회만
- 레스토랑 레시피: Restaurant Admin만 수정, Brand에는 표시 안됨

#### 구현 완료 항목:

**Phase 2.1: 기본 인프라 구축**
1. [x] DB 스키마 생성 (recipes, ingredients, recipe_ingredients, recipe_categories, ingredient_categories)
2. [x] Backend Models 구현 (Recipe, Ingredient, RecipeIngredient)
3. [x] owner_type ENUM('brand', 'restaurant') 기반 소유권 구분
4. [x] 권한 체크 미들웨어 구현 (isBrandManager, checkRestaurantAccess)

**Phase 2.2: Backend APIs 구현**
5. [x] Brand Recipe CRUD API (`/api/brands/:brandId/recipes`)
6. [x] Restaurant Recipe CRUD API (`/api/restaurants/:restaurantId/recipes`)
7. [x] Brand-recipes 조회 API (`/api/restaurants/:restaurantId/brand-recipes`)
8. [x] Ingredient CRUD API
9. [x] Recipe/Ingredient Category API
10. [x] Recipe → Product 변환 API

**Phase 2.3: Frontend UI 구현**
11. [x] RecipeManagementPage (Brand General용 - 4개 탭)
12. [x] RecipesTab - 레시피 CRUD
13. [x] IngredientsTab - 재료 CRUD
14. [x] RecipeCategoriesTab, IngredientCategoriesTab - 카테고리 관리
15. [x] RecipesPage (Restaurant Admin용)
16. [x] IngredientsPage (Restaurant Admin용)

**Phase 2.4: UI 기능 추가 (2025-12-10)**
17. [x] 리스트 카드에 요리시간(prep_time, cook_time) 표시
18. [x] 리스트 카드에 조리방법(instructions) 미리보기 표시
19. [x] 리스트 카드에 재료명 태그(IngredientTags) 표시
20. [x] 카드 클릭 시 Recipe Details 팝업 (View 모드)
21. [x] View 모드에서 Edit 전환 기능

### 버그 수정 및 개선 (2025-12-11)

#### Reports 페이지 필터 버그 수정
**파일:** `/var/www/dev-frontend/src/pages/Reports/ReportsPage.tsx`

**문제:**
- Month 필터 선택 시 그래프가 지난 달 1일~30일 데이터를 잘못 표시
- 30일 범위가 두 달에 걸쳐있을 때 일자(day number)만으로 그룹화되어 데이터 혼합

**해결:**
- 그래프 데이터를 `MM/DD` 형식(예: `11/10`, `12/09`)으로 표시
- 두 달에 걸친 30일 데이터가 올바르게 구분되어 표시

**변경 코드:**
```typescript
// Before: day number만 사용 (11월9일, 10월9일 모두 "9"로 표시)
const day = getOrderDate(order).getDate().toString();

// After: MM/DD 형식으로 구분
const dateKey = `${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getDate().toString().padStart(2, '0')}`;
```

#### 환경변수 관리 개선
**파일:** `/var/www/dev-backend/.env`, `/var/www/dev-frontend/package.json`

**변경사항:**
- SUDO_PASSWORD를 .env 파일에서 중앙 관리
- 빌드 스크립트에서 .env 파일 읽어서 사용
- 하드코딩된 비밀번호 제거

#### Claude 명령어 추가
**파일:** `/var/www/.claude/commands/개발완료.md`

**기능:**
- 개발 세션 종료 시 사용하는 명령어
- 문서 자동 업데이트 (DEVELOPMENT_PLAN.md 등)
- Git 커밋 및 푸시 자동화

---

## 🚧 진행 중인 작업

현재 진행 중인 작업 없음

---

## 📅 예정된 작업 (Supply Chain Management 로드맵)

### 전체 흐름도
```
[Brand General/Manager]
        │
        ▼
 Brand Products 등록 (제품 관리)
 ├── 제품 카테고리
 └── 제품 옵션 (옵션 그룹 + 옵션)
        │
        ▼ (brand_id 연결된 레스토랑에 자동 노출)
        │
[Restaurant Admin]
        │
        ├─→ 레시피 생성 시 재료로 선택
        │   ├── 브랜드 재료 (View & Select만)
        │   └── 자체 재료 (CRUD 가능)
        │
        ├─→ 주문 발생 → 재고 차감
        │
        └─→ 발주 관리
              ├── 브랜드로 발주 (Brand Products)
              └── 외부 공급업체 발주 (자체 재료)
```

### 핵심 개념
- **Brand Product = Ingredient**: 브랜드 제품은 연결된 레스토랑에서 레시피 재료로 사용
- **제품 수정은 제품에서만**: Brand General/Manager가 제품을 수정하면 재료 정보도 자동 반영
- **이중 발주 경로**: 브랜드 제품 → 브랜드 발주 / 자체 재료 → 외부 공급업체 발주

---

### Phase 3: 브랜드 제품 관리 시스템 (다음 개발)

**목적:** Brand General/Manager가 레스토랑에 판매할 제품(원재료)을 등록/관리

#### 3.1 데이터베이스 설계
```sql
-- 브랜드 제품 카테고리
CREATE TABLE brand_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 브랜드 제품
CREATE TABLE brand_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),                    -- 제품 코드
  unit VARCHAR(50),                    -- 기본 단위 (kg, L, 개 등)
  unit_price DECIMAL(10, 2) NOT NULL,  -- 단가
  min_order_quantity INT DEFAULT 1,    -- 최소 주문 수량
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES brand_product_categories(id)
);

-- 브랜드 제품 옵션 그룹 (포장 단위, 등급 등)
CREATE TABLE brand_product_option_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "포장 단위", "등급"
  is_required BOOLEAN DEFAULT FALSE,
  min_selections INT DEFAULT 0,
  max_selections INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES brand_products(id) ON DELETE CASCADE
);

-- 브랜드 제품 옵션
CREATE TABLE brand_product_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "1kg", "5kg", "프리미엄"
  price_adjustment DECIMAL(10, 2) DEFAULT 0,  -- 추가 금액
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (option_group_id) REFERENCES brand_product_option_groups(id) ON DELETE CASCADE
);
```

#### 3.2 Backend 구현
1. [ ] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
2. [ ] Routes: `/api/brands/:brandId/products` (CRUD)
3. [ ] Routes: `/api/brands/:brandId/product-categories` (CRUD)
4. [ ] Routes: `/api/brands/:brandId/products/:productId/option-groups` (CRUD)
5. [ ] 권한 체크: Brand General/Manager만 수정 가능

#### 3.3 Frontend 구현
1. [ ] Brand General 메뉴에 "제품 관리" 추가
2. [ ] BrandProductsPage - 제품 목록/CRUD
3. [ ] BrandProductCategoriesPage - 카테고리 관리
4. [ ] 제품 상세 모달 - 옵션 그룹/옵션 관리

**산출물:**
- Brand General/Manager가 제품 등록/수정/삭제
- 제품 카테고리로 분류
- 제품별 옵션(포장 단위, 등급 등) 설정

---

### Phase 4: 제품-재료 연동 시스템

**목적:** 브랜드 제품이 연결된 레스토랑의 레시피 재료로 자동 노출

#### 4.1 연동 로직
```
Brand Product (브랜드 제품)
       │
       ▼ brand_id로 연결된 레스토랑에서
       │
Ingredient로 자동 표시 (owner_type = 'brand')
       │
       └── Restaurant Admin: View & Select만 가능
```

#### 4.2 Backend 구현
1. [ ] 기존 ingredients 테이블에 `brand_product_id` FK 추가
2. [ ] Brand Product 생성 시 자동으로 Ingredient 레코드 생성 (트리거 또는 서비스 로직)
3. [ ] Brand Product 수정 시 연결된 Ingredient 자동 업데이트
4. [ ] Restaurant의 재료 조회 API에서 브랜드 제품 포함

#### 4.3 Frontend 구현
1. [ ] RecipesPage 재료 선택에서 브랜드 재료 구분 표시
2. [ ] 브랜드 재료는 View만 가능 (수정 버튼 숨김)
3. [ ] 재료 출처 표시 (브랜드명 또는 "자체 재료")

**산출물:**
- 브랜드 제품 → 재료 자동 연동
- Restaurant Admin이 레시피에서 브랜드 재료 선택 가능
- 제품 정보 변경 시 재료 정보 자동 반영

---

### Phase 5: 재고 관리 시스템

**목적:** 실시간 재고 추적 및 자동 차감

#### 5.1 데이터베이스 설계
```sql
-- 레스토랑별 재고
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  current_quantity DECIMAL(10, 2) DEFAULT 0,
  unit VARCHAR(50),
  min_quantity DECIMAL(10, 2) DEFAULT 0,  -- 최소 재고량 (알림 기준)
  max_quantity DECIMAL(10, 2),             -- 최대 재고량
  last_stock_take_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (restaurant_id, ingredient_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 재고 거래 내역
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  transaction_type ENUM('in', 'out', 'adjustment', 'stock_take') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  reference_type VARCHAR(50),    -- 'order', 'purchase_order', 'manual'
  reference_id INT,              -- order_id, purchase_order_id 등
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- 재고 알림
CREATE TABLE stock_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  alert_type ENUM('low_stock', 'out_of_stock', 'expiring') NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

#### 5.2 Backend 구현
1. [ ] Models: Inventory, InventoryTransaction, StockAlert
2. [ ] APIs: 재고 조회, 조정, 재고 실사
3. [ ] 주문 완료 시 Recipe → Ingredient → Inventory 자동 차감
4. [ ] 최소 재고 도달 시 알림 생성

#### 5.3 Frontend 구현
1. [ ] `/pos/inventory` - 재고 현황 페이지
2. [ ] `/pos/inventory/transactions` - 거래 내역
3. [ ] `/pos/inventory/stock-take` - 재고 실사
4. [ ] `/pos/inventory/alerts` - 재고 알림

**산출물:**
- 실시간 재고 추적
- 주문 시 자동 재고 차감
- 재고 부족 알림

---

### Phase 6: 발주 관리 시스템

**목적:** 브랜드 제품 및 외부 공급업체 발주 관리

#### 6.1 데이터베이스 설계
```sql
-- 공급업체 (브랜드 + 외부)
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  supplier_type ENUM('brand', 'external') NOT NULL,
  brand_id INT,                  -- supplier_type = 'brand'인 경우
  contact_name VARCHAR(100),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(100),
  address TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 공급업체-재료 매핑
CREATE TABLE supplier_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  unit_price DECIMAL(10, 2),
  min_order_quantity INT DEFAULT 1,
  lead_days INT DEFAULT 1,       -- 배송 소요일
  is_preferred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, ingredient_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 발주서
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,
  status ENUM('draft', 'pending', 'approved', 'ordered', 'partial_received', 'received', 'cancelled') DEFAULT 'draft',
  order_date DATE,
  expected_date DATE,
  received_date DATE,
  total_amount DECIMAL(15, 2) DEFAULT 0,
  notes TEXT,
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- 발주 상세
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  brand_product_id INT,          -- 브랜드 제품인 경우
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (brand_product_id) REFERENCES brand_products(id)
);
```

#### 6.2 Backend 구현
1. [ ] Models: Supplier, SupplierIngredient, PurchaseOrder, PurchaseOrderItem
2. [ ] APIs: 공급업체 CRUD, 발주서 CRUD, 입고 처리
3. [ ] 브랜드 연결 시 자동 공급업체 생성
4. [ ] 입고 처리 → 재고 증가 연동

#### 6.3 Frontend 구현
1. [ ] `/pos/suppliers` - 공급업체 관리
2. [ ] `/pos/purchase-orders` - 발주서 목록
3. [ ] `/pos/purchase-orders/create` - 발주서 생성
4. [ ] `/pos/purchase-orders/:id` - 발주 상세/입고 처리

**산출물:**
- 공급업체 관리 (브랜드 자동 + 외부 수동)
- 발주서 생성/승인/입고 프로세스
- 입고 시 재고 자동 증가

---

### Phase 7: AI 재고 예측 (향후)

**목적:** 주문 통계 기반 재고 예측 및 자동 발주 제안

#### 구현 예정
- 과거 주문 데이터 분석
- 요일/시간/계절별 패턴 분석
- 재고 예측 알고리즘
- 자동 발주량 계산
- 낭비 분석

---

### 개발 우선순위 요약

| 순서 | Phase | 내용 | 의존성 |
|------|-------|------|--------|
| 1 | Phase 3 | 브랜드 제품 관리 | - |
| 2 | Phase 4 | 제품-재료 연동 | Phase 3 |
| 3 | Phase 5 | 재고 관리 | Phase 4 |
| 4 | Phase 6 | 발주 관리 | Phase 5 |
| 5 | Phase 7 | AI 재고 예측 | Phase 6 |

---

## 📅 기타 예정된 작업

### 브랜드 통합 고객 포인트/등급 시스템 (보류)

**목적:** Brand General이 소속 레스토랑들의 고객 포인트/등급을 통합 또는 분리 관리

*(상세 내용은 별도 문서로 분리 예정)*

### General 사용자 페이지 구현 (보류)

- Foodcourt/Brand General 전용 대시보드
- Manager 관리 페이지
- 권한 관리 시스템

### 구독 관리 시스템 (보류)

- 구독 활성화/비활성화
- UI Routes 제어
- 결제 연동

---

## 🗄️ 데이터베이스 스키마

### plan_templates
```sql
CREATE TABLE plan_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  base_price_monthly DECIMAL(10, 2) NOT NULL,
  base_price_annual DECIMAL(10, 2) NOT NULL,
  order_limit INT DEFAULT 1000 COMMENT '-1 for unlimited',
  menu_item_limit INT DEFAULT 50 COMMENT '-1 for unlimited',
  staff_limit INT DEFAULT 5 COMMENT '-1 for unlimited',
  category ENUM('basic', 'custom') DEFAULT 'basic',
  plan_target ENUM('restaurant', 'brand', 'foodcourt') DEFAULT 'restaurant',
  features TEXT,
  included_modules JSON,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### addon_modules
```sql
CREATE TABLE addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('basic', 'advanced', 'revenue', 'operation', 'analytics') NOT NULL,
  target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all') DEFAULT 'restaurant',
  base_price_monthly DECIMAL(10, 2) DEFAULT 0.00,
  base_price_annual DECIMAL(10, 2) DEFAULT 0.00,
  ui_routes JSON COMMENT 'Array of allowed UI routes',
  features JSON COMMENT 'Feature descriptions for display',
  dependencies JSON COMMENT 'Required module codes',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 현재 플랜 목록 (9개)
```
Restaurant Plans:
1. Basic Plan (RM 29/month)
2. Professional Plan (RM 59/month)
3. Enterprise Plan (RM 99/month)

Brand Plans:
10. Brand Basic (RM 149/month)
11. Brand Professional (RM 299/month)
12. Brand Enterprise (RM 499/month)

Foodcourt Plans:
13. Foodcourt Basic (RM 149/month)
14. Foodcourt Professional (RM 299/month)
15. Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 (target_user_type 기준)

**Restaurant Modules:**
- pos_terminal, menu_management, customer_management
- table_management, kitchen_display, customer_display
- staff_management, reports_analytics, invoice_management
- promotions, support_tickets, activity_logs
- mobile_ordering, recipe_management, advanced_inventory

**Brand Modules:**
- brand_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Foodcourt Modules:**
- foodcourt_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Shared Modules (all):**
- restaurant_management

---

## 📁 주요 파일 목록

### Backend Models
```
/var/www/dev-backend/models/
├── PlanTemplate.js           # 구독 플랜 모델
├── AddonModule.js            # 애드온 모듈 모델
├── Restaurant.js             # 레스토랑 모델
├── User.js                   # 사용자 모델 (Manager 포함)
└── index.js                  # 모델 연관관계 정의
```

### Backend Routes
```
/var/www/dev-backend/routes/
├── plans.js                  # 플랜 관리 API
├── restaurants.js            # 레스토랑 관리 API
└── managers.js               # 매니저 관리 API (향후 확장 예정)
```

### Frontend Pages
```
/var/www/dev-frontend/src/pages/Admin/
├── PlansPage.tsx             # 플랜 관리 페이지
├── RestaurantsPage.tsx       # 레스토랑 관리 페이지
├── ManagersPage.tsx          # 매니저 관리 페이지 (General만)
└── SubscriptionsPage.tsx     # 구독 관리 페이지
```

### Frontend Hooks
```
/var/www/dev-frontend/src/hooks/
└── useAllowedRoutes.ts       # 라우트 권한 체크 Hook
```

---

## 🔗 관련 페이지

### 개발 환경
- **Admin Plans:** https://dev.purplehere.com/pos/admin/plans
- **Admin Restaurants:** https://dev.purplehere.com/pos/admin/restaurants
- **Admin Managers:** https://dev.purplehere.com/pos/admin/managers
- **Admin Subscriptions:** https://dev.purplehere.com/pos/admin/subscriptions

### 프로덕션 환경
- **URL:** https://orderhere.wor-pro.com

---

## 📝 개발 노트

### 주요 설계 결정사항

1. **General vs Manager 구분**
   - General: 구독 관리, Manager 생성/관리
   - Manager: 실무 작업, 구독 공유

2. **플랜 분리 이유**
   - Restaurant Plans: 개별 레스토랑 소유자용
   - Brand Plans: 다중 브랜드 관리용
   - Foodcourt Plans: 푸드코트 관리용
   - 각각 다른 가격 책정 및 기능 제공

3. **모듈 분류 기준**
   - target_user_type으로 명확히 구분
   - 'all'은 여러 타입이 공통으로 사용하는 모듈

4. **UI/UX 개선 원칙**
   - 기본값 자동 설정으로 사용자 편의성 증대
   - Role 변경 시 관련 필드 자동 업데이트
   - 동적 필터링으로 혼란 최소화

---

## 🔧 트러블슈팅 히스토리

### 문제 1: Brand General 사용자 레스토랑 필터링 미작동 (2025-11-20 해결)

**증상:**
- Brand General 사용자가 연결된 2개 레스토랑만 봐야 하는데 전체 9개 레스토랑 표시
- URL: https://dev.purplehere.com/pos/manager/restaurants
- DB `restaurant_managers` 테이블에는 정상적으로 연결되어 있음

**근본 원인:**
```typescript
// 문제 코드: RestaurantsPage.tsx:462
const token = localStorage.getItem('token'); // ❌ null 반환
// 실제 사용: 'auth_token' 키 사용 중
```
- localStorage 키 불일치로 인해 Authorization 헤더가 `Bearer null`로 전송됨
- 백엔드가 익명 사용자로 인식하여 role-based 필터링 미작동

**해결 방법:**
```typescript
// 수정: RestaurantsPage.tsx:462
const token = localStorage.getItem('auth_token'); // ✅ 정상 작동
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/Manager/RestaurantsPage.tsx` (Line 462)
- `/var/www/production-backend/routes/restaurants.js` (optionalAuth 미들웨어 추가)

**디버깅 팁:**
1. 백엔드 로그에서 Authorization header 확인
2. localStorage 키 이름 일치 여부 확인
3. 빌드 파일에서 실제 사용 키 검증: `grep 'localStorage.getItem' build/static/js/main.*.js`
4. 네트워크 탭에서 실제 헤더 값 확인

**예방책:**
- localStorage 키를 상수로 관리
- API 헬퍼 함수로 인증 헤더 통일
- 타입스크립트 유틸리티 함수 사용

---

## 🐛 알려진 이슈

**현재 알려진 이슈 없음**

---

## 📞 연락처

**프로젝트:** Purple POS System
**개발 환경:** Development Server
**데이터베이스:** purple_dev_db (MySQL)
**마지막 업데이트:** 2025-12-14
