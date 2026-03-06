# Feature-Based Subscription System - 개발 계획서

**작성일:** 2025-01-19
**수정일:** 2025-12-15
**프로젝트:** OrderHere POS System
**목표:** 모듈형 구독 시스템 + 레시피-재고-발주 통합 관리

---

## 📋 목차

1. [개요](#개요)
2. [현재 시스템 현황](#현재-시스템-현황)
3. [개발 범위](#개발-범위)
4. [Phase별 상세 계획](#phase별-상세-계획)
5. [데이터베이스 설계](#데이터베이스-설계)
6. [API 명세](#api-명세)
7. [타임라인](#타임라인)

---

## 개요

### 목적
기존 단일 구독 플랜 방식을 **모듈형 구독 시스템**으로 전환하여:
- 고객이 필요한 기능만 선택적으로 구독
- 기능별 독립적 가격 책정
- 유연한 업셀링 전략
- 레시피-재고-발주 통합 관리 시스템 구축

### 핵심 가치
- **유연성**: 고객이 필요한 모듈만 선택
- **확장성**: 새로운 모듈 쉽게 추가 가능
- **수익성**: 모듈별 독립 과금으로 ARPU 증가
- **효율성**: 재고-발주-레시피 통합으로 운영 최적화

---

## 현재 시스템 현황

### ✅ 완료된 기능
1. **구독 시스템**
   - `plan_templates` 테이블 존재
   - PlansPage (시스템 관리자) 구현 완료
   - 3가지 기본 플랜: Basic, Professional, Enterprise

2. **모바일 오더**
   - 모바일 메뉴 페이지 완성
   - QR 주문 기능 작동
   - 결제 통합

3. **POS 시스템**
   - Product, Category, Order 관리
   - OptionGroup, Option 시스템
   - 실시간 주문 관리

### ❌ 없는 기능
1. 모듈별 기능 선택 시스템
2. 권한 기반 메뉴 표시/숨김
3. 레시피 관리
4. 재고 관리
5. 발주 시스템
6. AI 재고 예측

---

## 개발 범위

### Part 1: 구독 시스템 확장 (모듈 선택) - 완료
- [x] Add-on 모듈 정의 시스템
- [x] Plan별 포함 모듈 설정
- [x] Restaurant별 활성 모듈 관리
- [x] 권한 기반 UI 라우팅

### Part 2: Supply Chain Management (신규 기능)
- [x] Recipe Management (레시피 관리) - 완료
- [x] Brand Product Management (브랜드 제품 관리) - 2025-12-15 완료
- [x] Product-Ingredient Sync (제품-재료 연동) - 2025-12-15 완료
- [x] Advanced Inventory (재고 관리) - 2025-12-19 완료
- [ ] Purchase Order System (발주 관리)
- [ ] AI Stock Prediction (재고 예측)

---

## Phase별 상세 계획

### ✅ Phase 1: 모듈 선택 시스템 (완료)

**목표:** Feature-based 구독 기반 구축

#### 작업 목록

**1.1 DB 스키마 설계**
- [x] `addon_modules` 테이블 생성
- [x] `plan_templates`에 `included_modules` 필드 추가
- [x] 기본 모듈 데이터 삽입

**1.2 Backend Models**
- [x] `models/AddonModule.js` 생성
- [x] `routes/addon-modules.js` 생성
- [x] `routes/restaurants.js`에 allowed-routes API 추가

**1.3 Frontend - PlansPage 수정**
- [x] Available Modules fetch
- [x] Create Plan Modal에 모듈 체크박스 추가
- [x] Edit Plan Modal에 모듈 체크박스 추가
- [x] included_modules 저장 로직

**1.4 Frontend - 권한 제어**
- [x] AuthContext에 allowedRoutes 추가
- [x] Sidebar 메뉴 동적 표시
- [x] ProtectedRoute 컴포넌트 (optional)

**1.5 테스트**
- [x] 플랜 생성 시 모듈 선택 테스트
- [x] Restaurant 로그인 시 메뉴 표시/숨김 확인
- [x] 모듈 변경 시 즉시 반영 확인

**산출물:**
- ✅ 시스템 관리자가 플랜별 모듈 선택 가능
- ✅ Restaurant별 활성 모듈 기반 메뉴 표시
- ✅ 권한 없는 페이지 접근 제어

---

### ✅ Phase 2: Recipe Management (완료 - 2025-12-10)

**목표:** 브랜드 매니저가 레시피 생성 및 공유

**📄 상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 최종 구현된 권한 구조 (owner_type 기반)
```javascript
// 브랜드 레시피 (owner_type = 'brand')
Brand General/Manager: CRUD 가능
Restaurant Admin: 조회만 (수정 불가)

// 레스토랑 레시피 (owner_type = 'restaurant')
Restaurant Admin: CRUD 가능
Brand General/Manager: 접근 불가 (표시 안됨)
```

#### 작업 목록

**2.1 DB 스키마**
```sql
- recipes (레시피 마스터)
  - owner_type ENUM('brand', 'restaurant')
  - brand_id OR restaurant_id
  - recipe_category_id (카테고리 FK)
  - prep_time, cook_time, instructions (조리 정보)
  - total_ingredient_cost (자동 계산)

- ingredients (재료 마스터)
  - owner_type, brand_id OR restaurant_id
  - ingredient_category_id (카테고리 FK)

- recipe_ingredients (레시피-재료 매핑)
- recipe_categories, ingredient_categories (카테고리 테이블)
```

**2.2 Backend**
- [x] Models: Recipe, Ingredient, RecipeIngredient
- [x] Routes: `/api/brands/:id/recipes`, `/api/restaurants/:id/recipes`
- [x] APIs: CRUD for recipes, ingredients, categories
- [x] 권한 체크 미들웨어 (isBrandManager, checkRestaurantAccess)
- [x] 원가 자동 계산 로직

**2.3 Frontend - Brand General**
- [x] `/recipe-management` - 4개 탭 (Recipes, Ingredients, Categories)
- [x] RecipesTab - 레시피 CRUD
- [x] IngredientsTab - 재료 CRUD
- [x] RecipeCategoriesTab, IngredientCategoriesTab

**2.4 Frontend - Restaurant Admin**
- [x] `/recipes` - 레시피 관리 (브랜드 + 자체)
- [x] `/ingredients` - 재료 관리
- [x] 브랜드 레시피는 View만, 자체 레시피는 CRUD
- [x] **[+ Menu]** 버튼 → 레시피를 Products로 등록

**2.5 UI 기능 (2025-12-10 추가)**
- [x] 리스트 카드에 요리시간, 조리방법, 재료명 표시
- [x] 카드 클릭 시 Recipe Details 팝업 (View 모드)
- [x] View 모드에서 Edit 전환 기능

**산출물:**
- ✅ 레시피 생성/수정/삭제 (권한별)
- ✅ 재료 관리 + 카테고리 관리
- ✅ 레시피 → 메뉴 등록
- ✅ 원가 자동 계산
- ✅ 상세 뷰 팝업

---

### ✅ Phase 2.5: Brand Product Management (완료 - 2025-12-15)

**목표:** 브랜드 제품 관리 및 재료 자동 연동

#### 작업 목록

**2.5.1 DB 스키마**
- [x] `brand_product_categories` 테이블 생성
- [x] `brand_products` 테이블 생성 (base_quantity, sync_to_ingredients 포함)
- [x] `brand_product_option_groups` 테이블 생성
- [x] `brand_product_options` 테이블 생성
- [x] `brand_product_brands` N:M 연결 테이블
- [x] `brand_product_option_group_products` N:M 연결 테이블
- [x] `ingredients` 테이블에 `brand_product_id`, `image_url`, `base_quantity` 추가

**2.5.2 Backend**
- [x] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
- [x] Routes: `/api/brand-products` (통합 관리 CRUD)
- [x] Routes: `/api/brand-product-categories` (CRUD)
- [x] Routes: `/api/brand-product-option-groups` (CRUD)
- [x] `syncProductToIngredients()` 자동 연동 함수
- [x] `isBrandManager` 미들웨어 개선

**2.5.3 Frontend**
- [x] `/pos/brand-general/products` - Brand Product Management
- [x] BrandProductCategoriesTab - 카테고리 관리
- [x] BrandProductsTab - 제품 CRUD (이미지, 옵션, 브랜드 연결)
- [x] BrandProductOptionsTab - 옵션 그룹 관리
- [x] IngredientsTab - 이미지, base_quantity UI 추가

**산출물:**
- ✅ 브랜드 제품 등록/수정/삭제
- ✅ 제품 → 재료 자동 연동
- ✅ sync_to_ingredients 플래그로 비재료 제품 지원
- ✅ 재료에 이미지, 기준수량 표시

---

### ✅ Phase 3: Advanced Inventory (완료 - 2025-12-19)

**목표:** 이론재고/실사재고 기반 재고 관리 및 Loss 분석

**📄 상세 설계 문서:** `/var/www/docs/INVENTORY_MANAGEMENT_SYSTEM.md`

#### 핵심 개념
- **이론 재고**: 초기재고 + 입고 - 판매차감 (시스템 자동 계산)
- **실사 재고**: 정기적 재고 실사로 측정 (수동 입력)
- **Loss(로스)**: 이론재고 - 실사재고 (차이 분석)

#### 작업 목록

**3.1 DB 스키마**
- [x] `inventory_transactions` 테이블 (입출고 내역)
- [x] `stock_takes` 테이블 (재고 실사)
- [x] `stock_take_items` 테이블 (실사 상세)
- [x] `stock_alerts` 테이블 (재고 알림)
- [x] `ingredients` 테이블 필드 추가 (current_stock, min_stock 등)

**3.2 Backend**
- [x] Models: InventoryTransaction, StockTake, StockTakeItem, StockAlert
- [x] APIs: 재고 현황, 입출고, 실사, 알림
- [x] 입고/폐기/조정 로직
- [x] 발주 제안 계산 로직

**3.3 Frontend**
- [x] `/restaurant/:id/inventory` - 재고 현황 대시보드 (Dashboard 탭)
- [x] `/restaurant/:id/inventory` - 재고 목록 (Stock List 탭, 입고/폐기)
- [x] `/restaurant/:id/inventory/stock-take` - 재고 실사
- [x] `/restaurant/:id/inventory` - 거래 내역 (History 탭)

**3.4 Integration**
- [ ] Order → Recipe → Inventory 자동 차감 (향후 구현)
- [x] 최소 재고 도달 시 알림 생성
- [x] 발주 필요 수량 자동 계산

**산출물:**
- ✅ 초기 재고 설정 및 수동 입출고
- ✅ 정기 재고 실사 및 Loss 분석
- ✅ Low Stock 알림 및 발주 제안
- 📋 주문 시 레시피 기반 자동 재고 차감 (향후 구현 예정)

---

### 🛒 Phase 4 이후: 재료/재고/발주 시스템 (v3.0)

> **이 문서의 Phase 4, 5는 더 이상 사용하지 않습니다.**
> **통합 개발 계획은 `/var/www/DEVELOPMENT_PLAN.md`의 8단계 Phase 체계를 참조하세요.**

---

## Phase 6: Addon Module Reorganization (2026-03-06)

**목표:** 사이드바 메뉴와 모듈 1:1 매칭, Basic/Advanced 명확 분리, 불필요 모듈 삭제

### 설계 원칙

1. **모듈 = 비즈니스 기능 단위** (세팅/프로필은 모듈이 아님)
2. **사이드바 메뉴 순서대로 1:1 매칭** (본질적으로 하나인 것만 묶음)
3. **묶는 기준:** Menu+Categories+Options, Inventory+Suppliers, Floor Plan+Editor
4. **Dashboard = Basic, 항상 포함 (체크박스 없이 해제 불가)**
5. **모듈이 아닌 것 (항상 표시):** My Profile, Store Settings, Company Info, Notification Settings, Logout

### Basic vs Advanced 분류 기준 (일반 POS 솔루션 기준)

- **Basic:** POS 도입 시 당연히 필요한 핵심 운영 기능
- **Advanced:** 규모가 커지거나 특수 니즈가 있을 때 필요한 부가 기능

### 6.1 Restaurant Modules

| # | module_code | Display Name | Category | Sidebar Menu |
|---|-------------|--------------|----------|--------------|
| **Basic** | | | | |
| 1 | `dashboard` | Dashboard | basic | Dashboard (always included, no checkbox) |
| 2 | `live_orders` | Live Orders | basic | Live Orders |
| 3 | `pos_terminal` | POS Terminal | basic | POS Terminal |
| 4 | `kitchen_display` | Kitchen Display | basic | Kitchen Display |
| 5 | `customer_display` | Customer Display | basic | Customer Display |
| 6 | `menu_management` | Menu Management | basic | Menu, Categories, Options |
| 7 | `invoice_billing` | Invoice & Billing | basic | Invoices |
| 8 | `reports` | Reports & Analytics | basic | Reports |
| 9 | `staff_management` | Staff & Permission Management | basic | Staff |
| 10 | `customer_crm` | Customer Management | basic | Customers |
| 11 | `coupons` | Coupon Management | basic | Coupons |
| 12 | `notices` | Notices | basic | Notices |
| **Advanced** | | | | |
| 13 | `system_inquiry` | System Inquiry | advanced | System Inquiry |
| 14 | `operation_inquiry` | Operation Inquiry | advanced | Operation Inquiry (*) |
| 15 | `activity_logs` | Change History | advanced | Change History |
| 16 | `floor_plan` | Floor Plan & Table Management | advanced | Floor Plan, Floor Plan Editor |
| 17 | `mobile_ordering` | Mobile Ordering | advanced | Mobile Order |
| 18 | `recipe_management` | Recipe Management | advanced | Recipe |
| 19 | `inventory_management` | Inventory & Supplier Management | advanced | Inventory, Suppliers |
| 20 | `advanced_inventory` | Advanced Inventory | advanced | (Inventory upgrade) |

(*) **Operation Inquiry 조건부 노출:**
- Brand/Foodcourt 소속 레스토랑만 사용 가능
- 독립 레스토랑은 모듈 ON이어도 메뉴 숨김
- 모듈 설명에 안내 문구 포함: "This feature is available for restaurants affiliated with a Brand or Foodcourt. Independent restaurants will not see this menu."

**Not modules (always visible):** My Profile, Store Settings, Company Info, Notification Settings, Logout

### 6.2 Brand General Modules

| # | module_code | Display Name | Category | Sidebar Menu |
|---|-------------|--------------|----------|--------------|
| **Basic** | | | | |
| 1 | `brand_dashboard` | Dashboard | basic | Dashboard (always included, no checkbox) |
| 2 | `brand_management` | Brand Management | basic | Brands |
| 3 | `brand_restaurant_mgmt` | Restaurant Management | basic | Restaurants |
| 4 | `brand_restaurant_admin` | Restaurant Admin Management | basic | Restaurant Admins |
| 5 | `brand_manager_mgmt` | Manager Management | basic | Managers |
| 6 | `brand_invoices` | Invoice & Billing | basic | Invoices |
| 7 | `brand_reports` | Reports | basic | Reports |
| 8 | `brand_notices` | Notice Management | basic | Notices |
| **Advanced** | | | | |
| 9 | `brand_system_inquiry` | System Inquiry | advanced | System Inquiry |
| 10 | `brand_operation_inquiry` | Inquiry Management | advanced | Inquiry Management |
| 11 | `brand_products` | Product Management | advanced | Products |
| 12 | `brand_recipes` | Recipe Management | advanced | Recipes |
| 13 | `brand_product_recipes` | Product Recipe Management | advanced | Product Recipes |
| 14 | `brand_inventory` | Inventory & Supplier Management | advanced | Inventory, Suppliers |
| 15 | `brand_performance` | Performance Analytics | advanced | Performance |
| 16 | `brand_plans` | Subscription Plans | advanced | Subscription Plans |
| 17 | `brand_subscriptions` | Subscription Management | advanced | Subscriptions |
| 18 | `brand_payment_settings` | Payment Settings | advanced | Payment Settings |

**Not modules:** My Profile, Company Info, Notifications, Logout

### 6.3 Foodcourt General Modules

| # | module_code | Display Name | Category | Sidebar Menu |
|---|-------------|--------------|----------|--------------|
| **Basic** | | | | |
| 1 | `fc_dashboard` | Dashboard | basic | Dashboard (always included, no checkbox) |
| 2 | `fc_management` | Foodcourt Management | basic | Foodcourts |
| 3 | `fc_restaurant_mgmt` | Restaurant Management | basic | Restaurants |
| 4 | `fc_admin_mgmt` | Restaurant Admin Management | basic | Restaurant Admins |
| 5 | `fc_manager_mgmt` | Manager Management | basic | Managers |
| 6 | `fc_invoices` | Invoice & Billing | basic | Invoices |
| 7 | `fc_notices` | Notice Management | basic | Notices |
| **Advanced** | | | | |
| 8 | `fc_system_inquiry` | System Inquiry | advanced | System Inquiry |
| 9 | `fc_operation_inquiry` | Inquiry Management | advanced | Inquiry Management |
| 10 | `fc_stats` | Statistics & Analytics | advanced | Statistics |
| 11 | `fc_customers` | Customer Management | advanced | Customers |
| 12 | `fc_coupons` | Coupon Management | advanced | Coupons |
| 13 | `fc_plans` | Subscription Plans | advanced | Subscription Plans |
| 14 | `fc_subscriptions` | Subscription Management | advanced | Subscriptions |
| 15 | `fc_payment_settings` | Payment Settings | advanced | Payment Settings |

**Not modules:** My Profile, Company Info, Notifications, Logout

### 6.4 Restaurant Owner Modules

| # | module_code | Display Name | Category | Sidebar Menu |
|---|-------------|--------------|----------|--------------|
| **Basic** | | | | |
| 1 | `owner_dashboard` | Dashboard | basic | Dashboard (always included, no checkbox) |
| 2 | `owner_restaurants` | Restaurant Portfolio | basic | Restaurants |
| 3 | `owner_invoices` | Invoice & Billing | basic | Invoices |
| 4 | `owner_notices` | Notices | basic | Notices |
| **Advanced** | | | | |
| 5 | `owner_system_inquiry` | System Inquiry | advanced | System Inquiry |
| 6 | `owner_operation_inquiry` | Operation Inquiry | advanced | Operation Inquiry |
| 7 | `owner_performance` | Performance Analytics | advanced | Performance |
| 8 | `owner_reports` | Financial Reports | advanced | Reports |

**Not modules:** My Profile, Logout

### 6.5 Modules to Delete (from current DB)

| module_code | Reason |
|-------------|--------|
| `support_tickets` | No sidebar menu. Replaced by System/Operation Inquiry |
| `sales` | No sidebar menu. Merged into Reports |
| `bill_print` | Internal POS Terminal feature, not independent module |
| `user_management` | No sidebar menu |
| `system_settings` | No sidebar menu (inactive) |
| `subscription_management` | No sidebar menu (inactive, duplicate) |
| `rent_management` | No sidebar menu |
| `tenant_support` | No sidebar menu (replaced by Inquiry) |
| `notification_settings` | Settings (not a module) |
| `invoice_settings` | Settings (not a module) |
| `store_settings` | Settings (not a module) |
| `company_info` | Settings (not a module) |
| `promotions` | No sidebar menu |
| `purchase_order` | No sidebar menu (inactive) |
| `ai_prediction` | No sidebar menu (inactive) |

### 6.6 Summary

| Role | Basic | Advanced | Total |
|------|-------|----------|-------|
| Restaurant | 13 | 7 | **20** |
| Brand General | 10 | 8 | **18** |
| Foodcourt General | 9 | 6 | **15** |
| Owner | 6 | 2 | **8** |
| **Delete** | | | **15** |

---

## 데이터베이스 설계

### Phase 1: 모듈 시스템

#### `addon_modules` (Add-on 모듈 정의)
```sql
CREATE TABLE addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('revenue', 'operation', 'analytics') NOT NULL,

  -- 가격
  base_price_monthly DECIMAL(10,2) NOT NULL,
  base_price_annual DECIMAL(10,2) NOT NULL,

  -- UI 제어
  ui_routes JSON,  -- ["/pos/recipes", "/pos/inventory"]

  -- 메타
  features JSON,  -- 설명용 기능 목록
  dependencies JSON,  -- 의존하는 모듈 코드
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_module_code ON addon_modules(module_code);
CREATE INDEX idx_category ON addon_modules(category);
```

#### `plan_templates` 수정
```sql
ALTER TABLE plan_templates
ADD COLUMN included_modules JSON DEFAULT NULL
COMMENT 'Array of included addon module codes ["mobile_ordering", "recipe_management"]';
```

#### 기본 데이터
```sql
INSERT INTO addon_modules (module_code, name, category, base_price_monthly, base_price_annual, ui_routes, features, dependencies) VALUES

('mobile_ordering', 'Mobile Ordering', 'revenue', 35.00, 350.00,
  '[]',
  '["QR Code Table Ordering", "Mobile App", "Online Payment", "Queue Management"]',
  '[]'),

('recipe_management', 'Recipe Management', 'operation', 15.00, 150.00,
  '["/pos/recipes", "/pos/ingredients"]',
  '["Recipe Creation", "Ingredient Mapping", "Cost Calculation", "Recipe Versioning"]',
  '[]'),

('advanced_inventory', 'Advanced Inventory', 'operation', 20.00, 200.00,
  '["/pos/inventory", "/pos/inventory/transactions", "/pos/inventory/stock-take"]',
  '["Real-time Stock Tracking", "Stock Alerts", "Stock Take", "Expiry Management"]',
  '["recipe_management"]'),

('purchase_order', 'Purchase Order System', 'operation', 25.00, 250.00,
  '["/pos/purchase-orders", "/pos/suppliers"]',
  '["Purchase Order Management", "Supplier Management", "Receiving", "Auto-ordering"]',
  '["advanced_inventory"]'),

('ai_prediction', 'AI Stock Prediction', 'analytics', 30.00, 300.00,
  '["/pos/analytics/forecast"]',
  '["AI Stock Forecasting", "Auto Order Suggestions", "Demand Analysis", "Waste Reduction"]',
  '["advanced_inventory", "purchase_order"]');

-- 기본 플랜 업데이트
UPDATE plan_templates SET included_modules = '[]' WHERE name = 'basic';
UPDATE plan_templates SET included_modules = '["recipe_management"]' WHERE name = 'professional';
UPDATE plan_templates SET included_modules = '["recipe_management", "advanced_inventory"]' WHERE name = 'enterprise';
```

### Phase 2-5: Supply Chain Management

*(별도 문서로 분리 예정)*

---

## API 명세

### Phase 1 APIs

#### GET `/api/addon-modules`
**설명:** 사용 가능한 모든 모듈 목록 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "module_code": "recipe_management",
      "name": "Recipe Management",
      "description": "브랜드 매니저가 레시피를 생성하고 공유합니다",
      "category": "operation",
      "base_price_monthly": 15.00,
      "base_price_annual": 150.00,
      "features": ["Recipe Creation", "Ingredient Mapping"],
      "ui_routes": ["/pos/recipes", "/pos/ingredients"],
      "dependencies": []
    }
  ]
}
```

#### GET `/api/restaurants/:id/allowed-routes`
**설명:** Restaurant의 구독 플랜에 따라 허용된 UI 라우트 반환

**Response:**
```json
{
  "success": true,
  "data": {
    "restaurant_id": 1,
    "plan_type": "Professional Plan",
    "included_modules": ["recipe_management"],
    "allowed_routes": ["/pos/recipes", "/pos/ingredients"]
  }
}
```

#### PUT `/api/plans/:id`
**설명:** Plan 수정 (included_modules 포함)

**Request:**
```json
{
  "name": "professional",
  "display_name": "Professional Plan",
  "base_price_monthly": 59.00,
  "included_modules": ["recipe_management", "advanced_inventory"]
}
```

---

## 타임라인

### 전체 일정 (12주)

```
Week 1       │ Phase 1: 모듈 선택 시스템
             │ - DB 스키마
             │ - Backend API
             │ - PlansPage 수정
             │ - Sidebar 권한 제어
─────────────┼─────────────────────────────────
Week 2-3     │ Phase 2: Recipe Management
             │ - 레시피/재료 CRUD
             │ - Product 연동
─────────────┼─────────────────────────────────
Week 4-6     │ Phase 3: Advanced Inventory
             │ - 재고 추적
             │ - 자동 차감
             │ - 알림 시스템
─────────────┼─────────────────────────────────
Week 7-9     │ Phase 4: Purchase Order
             │ - 공급업체 관리
             │ - 발주서 시스템
             │ - 입고 처리
─────────────┼─────────────────────────────────
Week 10-11   │ Phase 5: AI Prediction
             │ - 예측 알고리즘
             │ - Analytics 대시보드
─────────────┼─────────────────────────────────
Week 12      │ 통합 테스트 & 버그 수정
             │ - E2E 테스트
             │ - 성능 최적화
             │ - 문서화
```

### Milestone

**M1: 모듈 시스템 완성 (Week 1)**
- ✅ 플랜별 모듈 선택 가능
- ✅ 메뉴 동적 표시
- 💰 기존 고객 업셀링 시작 가능

**M2: Recipe + Inventory (Week 6)**
- ✅ 레시피 관리 완성
- ✅ 재고 추적 시작
- 💰 Recipe ($15) + Inventory ($20) 판매 시작

**M3: Full SCM (Week 9)**
- ✅ 발주 시스템 완성
- 💰 Complete Bundle ($60 → $48) 판매

**M4: AI 기능 (Week 11)**
- ✅ 재고 예측 완성
- 💰 Premium Features 판매

**M5: Production (Week 12)**
- ✅ 전체 시스템 안정화
- 💰 대규모 마케팅

---

## 가격 전략

### 모듈별 가격

| 모듈 | 월간 | 연간 | 타겟 |
|------|------|------|------|
| Mobile Ordering | $35-80 | $350-800 | 모든 레스토랑 |
| Recipe Management | $15 | $150 | 체인점, 프랜차이즈 |
| Advanced Inventory | $20 | $200 | 재고 관리 필요 매장 |
| Purchase Order | $25 | $250 | 체계적 발주 필요 |
| AI Prediction | $30 | $300 | 대형 매장 |

### 번들 할인

**Full Suite Bundle**
- 정가: $145/월
- 번들가: $116/월 (20% 할인)
- 포함: Recipe + Inventory + PO + AI

---

## 리스크 및 대응

### 기술적 리스크
1. **DB 마이그레이션 실패**
   - 대응: 철저한 백업, 개발 환경 선행 테스트

2. **성능 저하**
   - 대응: 인덱싱, 쿼리 최적화, 캐싱

3. **데이터 일관성 문제**
   - 대응: 트랜잭션 사용, 검증 로직

### 비즈니스 리스크
1. **고객 혼란**
   - 대응: 명확한 문서, 온보딩 가이드

2. **가격 저항**
   - 대응: 무료 체험, 단계적 마이그레이션

---

## 참고 자료

- `/var/www/dev-backend/models/PlanTemplate.js` - 기존 구독 모델
- `/var/www/dev-frontend/src/pages/Admin/PlansPage.tsx` - 플랜 관리 UI
- `/var/www/dev-backend/routes/mobile.js` - 모바일 오더 API

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2025-01-19 | 1.0 | 초안 작성 | Claude |
| 2025-12-15 | 1.1 | Phase 2.5 (Brand Product Management) 완료 추가 | Claude |
| 2026-03-06 | 2.0 | Phase 6: Addon Module Reorganization 기획 추가 - 사이드바 1:1 매칭, Basic/Advanced 분리, 15개 모듈 삭제 | Claude |

---

**문서 끝**
