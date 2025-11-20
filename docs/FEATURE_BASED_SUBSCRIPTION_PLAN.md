# Feature-Based Subscription System - 개발 계획서

**작성일:** 2025-01-19
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

### Part 1: 구독 시스템 확장 (모듈 선택)
- [ ] Add-on 모듈 정의 시스템
- [ ] Plan별 포함 모듈 설정
- [ ] Restaurant별 활성 모듈 관리
- [ ] 권한 기반 UI 라우팅

### Part 2: Supply Chain Management (신규 기능)
- [ ] Recipe Management (레시피 관리)
- [ ] Advanced Inventory (재고 관리)
- [ ] Purchase Order System (발주 관리)
- [ ] AI Stock Prediction (재고 예측)

---

## Phase별 상세 계획

### 🔧 Phase 1: 모듈 선택 시스템 (3-5일)

**목표:** Feature-based 구독 기반 구축

#### 작업 목록

**1.1 DB 스키마 설계**
- [ ] `addon_modules` 테이블 생성
- [ ] `plan_templates`에 `included_modules` 필드 추가
- [ ] 기본 모듈 데이터 삽입

**1.2 Backend Models**
- [ ] `models/AddonModule.js` 생성
- [ ] `routes/addon-modules.js` 생성
- [ ] `routes/restaurants.js`에 allowed-routes API 추가

**1.3 Frontend - PlansPage 수정**
- [ ] Available Modules fetch
- [ ] Create Plan Modal에 모듈 체크박스 추가
- [ ] Edit Plan Modal에 모듈 체크박스 추가
- [ ] included_modules 저장 로직

**1.4 Frontend - 권한 제어**
- [ ] AuthContext에 allowedRoutes 추가
- [ ] Sidebar 메뉴 동적 표시
- [ ] ProtectedRoute 컴포넌트 (optional)

**1.5 테스트**
- [ ] 플랜 생성 시 모듈 선택 테스트
- [ ] Restaurant 로그인 시 메뉴 표시/숨김 확인
- [ ] 모듈 변경 시 즉시 반영 확인

**산출물:**
- ✅ 시스템 관리자가 플랜별 모듈 선택 가능
- ✅ Restaurant별 활성 모듈 기반 메뉴 표시
- ✅ 권한 없는 페이지 접근 제어

---

### 📖 Phase 2: Recipe Management (2주)

**목표:** 브랜드 매니저가 레시피 생성 및 공유

**📄 상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 권한 구조
```javascript
if (restaurant.brand_id !== null) {
  // 브랜드 가맹점
  레시피 관리: Brand General/Manager
  Restaurant Admin: 읽기만 (메뉴 등록 시 가격만 설정)
} else {
  // 독립 레스토랑
  레시피 관리: Restaurant Admin (생성/수정/삭제 모두 가능)
}

// Foodcourt는 레시피와 무관 (임대 관리만)
```

#### 작업 목록

**2.1 DB 스키마 (1일)**
```sql
- recipes (레시피 마스터, Products와 동일한 구조)
  - brand_id OR restaurant_id (둘 중 하나만)
  - option_groups, is_set_menu (Products와 동일)
  - total_ingredient_cost (자동 계산)

- ingredients (재료 마스터)
  - brand_id OR restaurant_id
  - unit_cost (단위당 원가)

- recipe_ingredients (레시피-재료 매핑)
  - quantity, unit, cost (자동 계산)

- products 테이블 수정
  - recipe_id 추가 (연결)
```

**2.2 Backend (3-4일)**
- [ ] Models: Recipe, Ingredient, RecipeIngredient
- [ ] Routes: `/api/brands/:id/recipes`, `/api/restaurants/:id/recipes`
- [ ] APIs: CRUD for recipes, ingredients
- [ ] 권한 체크 미들웨어 (canEditRecipe, canViewRecipe)
- [ ] 원가 자동 계산 로직

**2.3 Frontend - Brand General (3일)**
- [ ] `/brand-general/recipes` - 브랜드 레시피 목록
- [ ] `/brand-general/recipes/create` - 레시피 생성
- [ ] `/brand-general/recipes/:id/edit` - 레시피 수정
- [ ] `/brand-general/ingredients` - 재료 마스터

**2.4 Frontend - Restaurant Admin (3일)**
- [ ] `/restaurant/:id/recipes` - 레시피 조회
  - 브랜드 가맹점: 브랜드 레시피 조회만
  - 독립 레스토랑: 레시피 CRUD
- [ ] **[메뉴로 등록]** 버튼 → 레시피를 Products로 복사
- [ ] 독립 레스토랑 레시피 생성/수정 페이지
- [ ] 재료 관리 페이지

**2.5 Integration (2일)**
- [ ] 레시피 → 메뉴 등록 API (create-from-recipe)
- [ ] 원가 자동 계산 및 권장가 제안
- [ ] 브랜드 레시피 업데이트 시 알림 시스템

**산출물:**
- ✅ 레시피 생성/수정/삭제 (권한별)
- ✅ 재료 관리
- ✅ 레시피 → 메뉴 등록 (가격만 설정)
- ✅ 원가 자동 계산

---

### 📦 Phase 3: Advanced Inventory (2-3주)

**목표:** 실시간 재고 추적 및 자동 차감

#### 작업 목록

**3.1 DB 스키마**
```sql
- inventory (레스토랑별 재고)
- inventory_transactions (입출고 내역)
- stock_alerts (재고 알림)
```

**3.2 Backend**
- [ ] Models: Inventory, InventoryTransaction, StockAlert
- [ ] APIs: 재고 조회, 조정, 실사
- [ ] 자동 재고 차감 (Order 생성 시)

**3.3 Frontend**
- [ ] `/pos/inventory` - 재고 현황
- [ ] `/pos/inventory/transactions` - 거래 내역
- [ ] `/pos/inventory/stock-take` - 재고 실사
- [ ] `/pos/inventory/alerts` - 알림

**3.4 Integration**
- [ ] Order → Recipe → Inventory 자동 차감
- [ ] 최소 재고 도달 시 알림

**산출물:**
- ✅ 실시간 재고 추적
- ✅ 주문 시 자동 재고 차감
- ✅ 재고 알림 시스템

---

### 🛒 Phase 4: Purchase Order System (2-3주)

**목표:** 체계적 발주 관리

#### 작업 목록

**4.1 DB 스키마**
```sql
- suppliers (공급업체)
- supplier_ingredients (공급업체-재료 매핑)
- purchase_orders (발주서)
- purchase_order_items (발주 상세)
```

**4.2 Backend**
- [ ] Models: Supplier, PurchaseOrder, PurchaseOrderItem
- [ ] APIs: 공급업체 관리, 발주서 CRUD
- [ ] 입고 처리 로직

**4.3 Frontend**
- [ ] `/pos/suppliers` - 공급업체 관리
- [ ] `/pos/purchase-orders` - 발주서 목록
- [ ] `/pos/purchase-orders/create` - 발주서 생성
- [ ] `/pos/purchase-orders/:id/receive` - 입고 처리

**4.4 Integration**
- [ ] 재고 알림 → 발주 제안
- [ ] 입고 처리 → 재고 증가

**산출물:**
- ✅ 발주서 생성/승인/입고
- ✅ 공급업체 관리
- ✅ 자동 발주 제안

---

### 🤖 Phase 5: AI Stock Prediction (2주)

**목표:** AI 기반 재고 예측 및 최적화

#### 작업 목록

**5.1 데이터 분석**
- [ ] 과거 주문 데이터 수집
- [ ] 패턴 분석 (요일, 시간, 계절)

**5.2 예측 알고리즘**
- [ ] 이동 평균 (Moving Average)
- [ ] 계절성 조정
- [ ] 향후 ML 모델 (TensorFlow.js)

**5.3 Frontend**
- [ ] `/pos/analytics/forecast` - 재고 예측
- [ ] 발주량 자동 계산
- [ ] 낭비 분석

**산출물:**
- ✅ 재고 예측 기능
- ✅ 자동 발주량 계산
- ✅ 낭비 최소화 제안

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

---

**문서 끝**
