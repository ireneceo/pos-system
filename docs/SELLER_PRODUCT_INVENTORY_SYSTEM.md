# Design 1: Seller Product & Inventory System

> **Created:** 2026-04-07
> **Status:** Design Confirmed (verified 2026-04-07)
> **Scale:** Large
> **Dependency:** None
> **Parent:** Supply Chain System (docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md)

---

## 1. Current State Analysis

### 1-1. What Exists vs What's Needed

| Component | System Admin | Brand General | Foodcourt General | Supplier |
|-----------|:-----------:|:------------:|:-----------------:|:--------:|
| **User Role** | O | O | O | X (ENUM에 없음) |
| **Business Entity** | CompanySettings (전역) | Brand 모델 | Foodcourt 모델 | Supplier 모델 (연락처 수준) |
| **Signup** | 불가 (수동 생성) | O | O | X |
| **Product Model** | SystemProduct (하드웨어) | BrandProduct (식자재) | X | X |
| **Product CRUD** | O (11 endpoints) | O | X | X |
| **Inventory** | X | O (brand-inventory) | X | X |
| **Dashboard** | O | O | O | X |
| **Company Info** | O (CompanySettings) | O | O | X |

### 1-2. Supplier Model Gap

**현재 Supplier:**
```
name, contact_name, phone, email, address
business_number, bank_name, bank_account, payment_terms
owner_type (brand/restaurant), brand_id, restaurant_id
→ "Brand/Restaurant가 관리하는 거래처 연락처"
```

**필요한 Supplier (Brand/Foodcourt 수준):**
```
회사 정보: company_name, registration_no, trade_name, tax_no
연락처: email, phone, address, city, state, postal_code, country, website
금융: bank_name, bank_account, bank_account_name, currency
운영: operation_settings (영업시간 등)
결제: payment_settings
인보이스: invoice_settings (prefix, terms, tax rate)
구독: subscription_status, plan_type, plan_amount, billing_cycle
소유자: owner_id (User FK — Supplier Admin)
상태: status (active/inactive), is_demo, is_test
```

### 1-3. Key Decision: Supplier Model Approach

**기존 Supplier 모델**: 거래처 연락처로 계속 유지 (Brand/Restaurant에서 관리)
**신규 모델 필요**: Supplier를 독립 사업체로 만드는 건 기존 Supplier 모델을 확장하는 게 아니라, Brand/Foodcourt처럼 **별도의 사업체 모델이 필요**

하지만 기존 Supplier 모델을 완전히 버릴 수는 없음 (이미 Ingredient.supplier_id, InventoryBatch.supplier_id 등에서 참조 중).

**해결: 2단계 접근**
1. 기존 Supplier 모델은 "거래처 연락처"로 유지 (기존 참조 안 깨뜨림)
2. 새 SupplierCompany 모델 생성 (Brand/Foodcourt와 동일 패턴의 사업체)
3. Supplier Admin User → SupplierCompany 소유 (owner_id)
4. SupplierCompany 아래에 SupplierProduct, 재고 관리
5. 기존 Supplier(연락처)와 SupplierCompany(사업체)는 선택적 연결 (나중에 설계 2에서)

---

## 2. Scope

### 2-1. Supplier Admin — Full Role & Dashboard Build

**User Role 확장:**
- User.role ENUM에 'Supplier Admin' 추가
- 가입(signup) 허용 역할에 추가
- AuthContext: ROLE_PERMISSIONS, ROLE_ROUTES 정의
- ProtectedRoute: supplierLevelRoutes 추가

**SupplierCompany 모델 (신규 — Brand/Foodcourt 패턴):**
```
id, name, code (unique), description, logo_url
owner_id (FK → users.id, Supplier Admin)
status (active/inactive)

-- Company info (Brand/Foodcourt 동일)
company_name, registration_no, trade_name, tax_no
email, phone, address, city, state, postal_code, country
website
bank_name, bank_account, bank_account_name
currency (STRING 10, default 'MYR' — 단일 통화)

-- Settings (Brand/Foodcourt 동일 패턴)
operation_settings (JSON)
payment_settings (JSON)
invoice_settings (JSON)

-- Subscription (Brand/Foodcourt 동일)
subscription_status, subscription_start, subscription_end
trial_end_date, grace_period_start
plan_type, plan_amount, billing_cycle

-- Flags
is_demo, is_test
```

**가입 흐름 (auth.js 확장):**
```
POST /api/auth/signup
  role: 'Supplier Admin'
  필수 정보: full_name, email, password, supplier_name, plan_id
  → User 생성 (role: 'Supplier Admin')
  → SupplierCompany 생성 (name: supplier_name, owner_id: user.id, status: 'trial')
  → 7일 트라이얼 시작
  → 구독 인보이스 발행 (기존 패턴)
```

**Supplier Admin 대시보드 페이지:**

| 메뉴 | 경로 | 설명 |
|------|------|------|
| Dashboard | /pos/supplier/dashboard | 주요 지표 (상품 수, 재고 현황) |
| Products | /pos/supplier/products | 상품 CRUD + 카테고리 |
| Inventory | /pos/supplier/inventory | 재고 관리 (입고/출고/실사) |
| Company Info | /pos/supplier/company-info | 회사 정보 (AutoSaveField) |
| Profile | /pos/profile | 개인 정보 |

(Order Management, Customer List, Invoices는 설계 2~4에서 추가)

**MainLayout 사이드바 (기존 Coming Soon → 실제 메뉴로 교체):**
```
[Supplier Admin]
  Dashboard
  ── Products ──
  Products
  ── Inventory ──
  Inventory
  ── Account ──
  Company Info
  Profile
```

### 2-2. FoodcourtProduct — Foodcourt General 상품 관리

**FoodcourtProduct 모델 (BrandProduct 패턴 참고, 레시피 제외):**
```
id, category_id (FK → foodcourt_product_categories)
name, description, sku (자동 생성: FCP-001, FCP-002...)
image_url, emoji
unit (kg, g, L, ml, piece, pack, box, etc.)
base_quantity (DECIMAL 10,2, default: 1)
unit_price (DECIMAL 10,2 — 판매가)
min_order_quantity (INTEGER, default: 1)
is_active (BOOLEAN, default: true)
sort_order (INTEGER, default: 0)
sync_to_ingredients (BOOLEAN, default: true) — 입점 레스토랑 재료에 동기화

-- BrandProduct과 달리 레시피 관련 필드 없음 (recipe_id, product_recipe_id 없음)
-- set_menu 관련 필드 없음 (식자재 판매이므로)
```

**FoodcourtProductCategory 모델:**
```
id, foodcourt_id (FK)
name, description, emoji
display_order, is_active
```

**sync_to_ingredients 동작 (BrandProduct과 동일 패턴):**
```
FoodcourtProduct 생성/수정 시:
  → sync_to_ingredients = true이면
  → 해당 Foodcourt 소속 모든 Restaurant에 Ingredient 레코드 생성
  → Ingredient.owner_type = 'foodcourt'  (신규 ENUM 값)
  → Ingredient.foodcourt_product_id = product.id  (신규 필드)
```

**Ingredient 모델 변경:**
```
owner_type ENUM: 'brand' | 'restaurant' → 'brand' | 'restaurant' | 'foodcourt' | 'supplier' 추가
foodcourt_product_id (INTEGER, nullable, 신규 필드)
supplier_product_id (INTEGER, nullable, 신규 필드)
```

**Foodcourt General 사이드바 추가:**
```
[Foodcourt General]
  Dashboard
  ── Management ──
  Restaurants
  Tenancy Management       (Contract Management에서 추가)
  Floor Plan                (Entity Floor Plan에서 추가)
  ── Products ──            ← NEW
  Products                  ← NEW
  ── Inventory ──           ← NEW
  Inventory                 ← NEW
  ── Operations ──
  Plans & Subscriptions
  Invoices
  ...
```

**API:**
```
GET    /api/foodcourts/:id/products              상품 목록
GET    /api/foodcourts/:id/products/:productId   상품 상세
POST   /api/foodcourts/:id/products              상품 생성
PUT    /api/foodcourts/:id/products/:productId   상품 수정
DELETE /api/foodcourts/:id/products/:productId   상품 삭제
POST   /api/foodcourts/:id/products/:id/copy     상품 복제
PUT    /api/foodcourts/:id/products/:id/toggle   활성/비활성

GET    /api/foodcourts/:id/product-categories         카테고리 목록
POST   /api/foodcourts/:id/product-categories         카테고리 생성
PUT    /api/foodcourts/:id/product-categories/:id      카테고리 수정
DELETE /api/foodcourts/:id/product-categories/:id      카테고리 삭제

GET    /api/foodcourts/:id/inventory             재고 현황
GET    /api/foodcourts/:id/inventory/summary      재고 요약
POST   /api/foodcourts/:id/inventory/transaction  재고 트랜잭션 (입고/출고/조정)
```

### 2-3. SupplierProduct — Supplier 상품 관리

**SupplierProduct 모델 (BrandProduct 패턴):**
```
id, category_id (FK → supplier_product_categories)
supplier_company_id (FK → supplier_companies)
name, description, sku (자동 생성: SUP-001, SUP-002...)
image_url, emoji
unit (kg, g, L, ml, piece, pack, box, can, bottle, etc.)
base_quantity (DECIMAL 10,2, default: 1)
unit_price (DECIMAL 10,2 — 판매가)
unit_cost (DECIMAL 10,2 — 원가, 내부 관리용)
min_order_quantity (INTEGER, default: 1)
lead_time_days (INTEGER, default: 1)
is_active (BOOLEAN, default: true)
sort_order (INTEGER, default: 0)
```

**SupplierProductCategory 모델:**
```
id, supplier_company_id (FK)
name, description, emoji
display_order, is_active
```

**API:**
```
GET    /api/supplier-companies/:id/products              상품 목록
GET    /api/supplier-companies/:id/products/:productId   상품 상세
POST   /api/supplier-companies/:id/products              상품 생성
PUT    /api/supplier-companies/:id/products/:productId   상품 수정
DELETE /api/supplier-companies/:id/products/:productId   상품 삭제
POST   /api/supplier-companies/:id/products/:id/copy     상품 복제
PUT    /api/supplier-companies/:id/products/:id/toggle   활성/비활성

GET    /api/supplier-companies/:id/product-categories         카테고리 목록
POST   /api/supplier-companies/:id/product-categories         카테고리 생성
PUT    /api/supplier-companies/:id/product-categories/:id      카테고리 수정
DELETE /api/supplier-companies/:id/product-categories/:id      카테고리 삭제
```

### 2-4. SystemProduct 확장 — SA 식자재/소모품 판매

**현재 SystemProduct**: 하드웨어/POS 패키지 전용 (shipping, set_tier 등)

**식자재/소모품 판매를 위한 필드 추가:**
```
-- 기존 필드에 추가 (nullable, 하드웨어 상품에는 null)
product_type (ENUM: 'hardware' / 'consumable', default: 'hardware')  ← 신규
unit (STRING 50, nullable)           ← 신규
base_quantity (DECIMAL 10,2)         ← 신규
unit_price (DECIMAL 10,2)           ← 신규 (기존 SystemProductPrice는 통화별 가격)
min_order_quantity (INTEGER)         ← 신규
lead_time_days (INTEGER)             ← 신규
sync_to_ingredients (BOOLEAN)        ← 신규
```

기존 하드웨어 상품: product_type = 'hardware', 기존 필드 사용
신규 소모품 상품: product_type = 'consumable', 식자재 필드 사용

**SystemProduct 프론트엔드:**
- 기존 SystemProductManagementPage에 탭 추가 또는 필터: Hardware / Consumables
- Consumable 상품은 BrandProduct UI 패턴 (unit, price, min_order 등)
- Hardware 상품은 기존 UI 유지 (shipping, sets 등)

### 2-5. Inventory Management — Foodcourt & Supplier

**Foodcourt Inventory (Brand Inventory 패턴 참고):**
- FoodcourtProduct 기반 재고 관리
- sync_to_ingredients로 생성된 Ingredient 레코드 사용
- Ingredient.current_stock 추적
- InventoryBatch (FIFO)
- InventoryTransaction (입고/출고/조정/폐기)
- StockAlert (재고 부족 알림)

**Supplier Inventory:**
- SupplierProduct 기반 자체 재고 관리
- 별도 Ingredient 생성 불필요 (Supplier는 자기 상품 재고를 직접 관리)
- SupplierProduct.current_stock 필드 추가 (또는 별도 SupplierInventory 모델)
- 심플한 재고 추적: 입고/출고/조정

**Supplier 재고 접근 — 2가지 방안:**

방안 A: SupplierProduct에 재고 필드 직접 추가
```
SupplierProduct에 추가:
  current_stock, min_stock, track_stock
  → 심플, 별도 모델 불필요
  → 배치(FIFO) 추적 필요 없으면 충분
```

방안 B: 기존 Ingredient/InventoryBatch 패턴 재사용
```
SupplierProduct → Ingredient 동기화 (owner_type: 'supplier')
  → 기존 InventoryBatch, InventoryTransaction 재사용
  → FIFO, 유통기한, 배치 추적 가능
  → 구조 복잡하지만 기능 완전
```

**추천: 방안 A** (Phase 1 — 심플 시작)
- Supplier는 자기 재고를 간단히 관리하면 됨
- 발주 수신 시 current_stock 차감만
- 나중에 배치 추적이 필요하면 확장

---

## 3. UI Design

### 3-1. Supplier Admin Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  Supplier Dashboard                                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Products │ │ Low Stock│ │ Out of   │ │ Total    │        │
│  │    24    │ │    3     │ │ Stock  2 │ │ Value    │        │
│  │ active   │ │ items    │ │ items    │ │ RM45,200 │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                               │
│  (설계 2~4 이후 추가될 영역)                                    │
│  │ Pending Orders: 5 │ This Month Revenue: RM 125,000 │     │
│                                                               │
│  Setup Guide                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  ☐ Add your first product                              │   │
│  │  ☐ Set up company information                          │   │
│  │  ☐ Configure payment settings                          │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 3-2. Product Management (공통 패턴 — Supplier/Foodcourt/SA Consumable)

```
┌──────────────────────────────────────────────────────────────┐
│  Products                                    [+ Add Product]  │
│                                                               │
│  [Products]  [Categories]                                     │
│                                                               │
│  Search: [________]  Category: [All ▾]  Status: [All ▾]      │
│                                                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ [Image]     │ │ [Image]     │ │ [Image]     │            │
│  │ Chicken     │ │ Soy Sauce   │ │ Rice (25kg) │            │
│  │ Breast      │ │ (1L)        │ │             │            │
│  │             │ │             │ │             │            │
│  │ RM 12.50/kg │ │ RM 8.90/bot │ │ RM 45.00/bag│            │
│  │ MOQ: 5kg    │ │ MOQ: 6      │ │ MOQ: 1      │            │
│  │ Lead: 2 days│ │ Lead: 3 days│ │ Lead: 1 day │            │
│  │ Stock: 150kg│ │ Stock: 48   │ │ Stock: 20   │            │
│  │ [Active]    │ │ [Active]    │ │ [Low Stock] │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                               │
│  카드 클릭 → 상세/수정 모달                                     │
│  Compact/Image 뷰모드 토글 (기존 Ingredients 패턴)              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**상품 생성/수정 모달:**
```
┌──────────── Add Product ──────────────────────────────────────┐
│                                                                │
│  Product Name *    [Chicken Breast                          ]  │
│  Category          [Meat & Poultry ▾]                          │
│  SKU               [SUP-024] (auto-generated)                  │
│  Description       [Fresh chicken breast, boneless          ]  │
│                                                                │
│  Image             [Upload] or [Current image]                 │
│                                                                │
│  ── Pricing & Unit ──                                          │
│  Unit              [kg ▾]                                      │
│  Base Quantity     [1        ]                                 │
│  Unit Price        [RM 12.50 ]                                 │
│  Min Order Qty     [5        ]                                 │
│  Lead Time         [2        ] days                            │
│                                                                │
│  ── Stock (Supplier only) ──                                   │
│  Current Stock     [150      ]                                 │
│  Min Stock         [50       ]                                 │
│  Track Stock       [Toggle ON]                                 │
│                                                                │
│  {formError && <ErrorMessage>}                                 │
│                     [Cancel]    [Save Product]                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Foodcourt/SA Consumable: Stock 섹션 없음 (sync_to_ingredients로 재고 관리)
Supplier: Stock 섹션 있음 (자체 재고 관리)
```

### 3-3. Inventory Management (Foodcourt — Brand Inventory 패턴)

```
┌──────────────────────────────────────────────────────────────┐
│  Inventory                                                    │
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Total    │ │ Low Stock│ │ Out of   │ │ Total    │        │
│  │ Items 24 │ │    3     │ │ Stock  2 │ │ Value    │        │
│  │          │ │          │ │          │ │ RM 45,200│        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                               │
│  Search: [________]  Category: [All ▾]  Status: [All ▾]      │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Product       Category    Stock    Min    Status       │   │
│  │ Chicken Breast  Meat      150 kg   50 kg  Normal      │   │
│  │ Soy Sauce      Sauce       8 bot   10     Low Stock   │   │
│  │ Rice (25kg)    Grain       0 bag    5     Out of Stock│   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  행 클릭 → 재고 조정 패널 (입고/출고/조정/폐기)                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 3-4. Supplier Company Info (AutoSaveField 패턴)

```
┌──────────────────────────────────────────────────────────────┐
│  Company Information                                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Company Details                                              │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Company Name     [ABC Supplies Sdn Bhd     ] Saved   │   │
│  │  Trade Name       [ABC Supplies             ] Saved   │   │
│  │  Registration No  [202601234567             ] Saved   │   │
│  │  Tax No           [SST-12345                ] Saved   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Contact                                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Email            [info@abc.com             ] Saved   │   │
│  │  Phone            [+60-12-345-6789          ] Saved   │   │
│  │  Address          [123 Jalan ABC            ] Saved   │   │
│  │  City             [Kuala Lumpur             ] Saved   │   │
│  │  State            [Selangor                 ] Saved   │   │
│  │  Postal Code      [50000                    ] Saved   │   │
│  │  Country          [Malaysia                 ] (fixed) │   │
│  │  Website          [www.abc-supplies.com     ] Saved   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Banking                                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Bank Name        [Maybank                  ] Saved   │   │
│  │  Account Number   [1234567890               ] Saved   │   │
│  │  Account Name     [ABC Supplies Sdn Bhd     ] Saved   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Technical Design

### 4-1. New Models

**SupplierCompany** (Brand/Foodcourt 패턴):
```
id (PK), name, code (unique), description, logo_url
owner_id (FK → users.id)
status (ENUM: active/inactive)

company_name, registration_no, trade_name, tax_no
email, phone, address, city, state, postal_code
country (default 'MY'), website
bank_name, bank_account, bank_account_name
currency (STRING 10, default 'MYR')

operation_settings (JSON)
payment_settings (JSON)
invoice_settings (JSON)

subscription_status, subscription_start, subscription_end
trial_end_date, grace_period_start
plan_type, plan_amount, billing_cycle

is_demo, is_test
```

**SupplierProduct:**
```
id (PK), supplier_company_id (FK)
category_id (FK → supplier_product_categories)
name, description, sku, image_url, emoji
unit, base_quantity, unit_price, unit_cost
min_order_quantity, lead_time_days
current_stock, min_stock, track_stock
is_active, sort_order
```

**SupplierProductCategory:**
```
id (PK), supplier_company_id (FK)
name, description, emoji, display_order, is_active
```

**FoodcourtProduct:**
```
id (PK), foodcourt_id (FK)
category_id (FK → foodcourt_product_categories)
name, description, sku, image_url, emoji
unit, base_quantity, unit_price
min_order_quantity
sync_to_ingredients (BOOLEAN, default true)
is_active, sort_order
```

**FoodcourtProductCategory:**
```
id (PK), foodcourt_id (FK)
name, description, emoji, display_order, is_active
```

### 4-2. Existing Model Changes

**User.js:**
```
role ENUM: add 'Supplier Admin'
supplier_company_id (INTEGER, nullable) — like brand_id, foodcourt_id
```

**Ingredient.js:**
```
owner_type ENUM: add 'foodcourt', 'supplier'
foodcourt_product_id (INTEGER, nullable)
supplier_product_id (INTEGER, nullable)
```

**SystemProduct.js:**
```
product_type (ENUM: 'hardware'/'consumable', default 'hardware')
unit (STRING 50, nullable)
base_quantity (DECIMAL 10,2, nullable)
unit_price (DECIMAL 10,2, nullable)
min_order_quantity (INTEGER, nullable)
lead_time_days (INTEGER, nullable)
sync_to_ingredients (BOOLEAN, default false)
```

### 4-3. Auth Changes

**auth.js signup:**
```
allowedRoles: add 'Supplier Admin'
Supplier Admin signup:
  → User.create(role: 'Supplier Admin')
  → SupplierCompany.create(name: supplier_name, owner_id: user.id)
  → subscriptionScheduler.startTrial()
  → invoiceScheduler.createEntitySubscriptionInvoice()
```

**authService.js login:**
```
Supplier Admin: check SupplierCompany.subscription_status
  → suspended → block login (ACCOUNT_SUSPENDED)
  → 기존 Brand/Foodcourt 패턴 동일
```

**invoiceScheduler:**
```
issuer_type: 'system_admin' (SA가 Supplier에게 POS 구독 인보이스 발행)
payer_type: 'supplier_admin' 추가 필요 (또는 기존 'external' 활용)
```

### 4-4. API Endpoints

**Supplier Company:**
```
GET    /api/supplier-companies/company-info     내 회사 정보
PUT    /api/supplier-companies/company-info     회사 정보 수정
```

**Supplier Products:**
```
GET    /api/supplier-companies/:id/products
GET    /api/supplier-companies/:id/products/:productId
POST   /api/supplier-companies/:id/products
PUT    /api/supplier-companies/:id/products/:productId
DELETE /api/supplier-companies/:id/products/:productId
POST   /api/supplier-companies/:id/products/:id/copy
PUT    /api/supplier-companies/:id/products/:id/toggle
```

**Supplier Product Categories:**
```
GET    /api/supplier-companies/:id/product-categories
POST   /api/supplier-companies/:id/product-categories
PUT    /api/supplier-companies/:id/product-categories/:id
DELETE /api/supplier-companies/:id/product-categories/:id
```

**Supplier Inventory:**
```
GET    /api/supplier-companies/:id/inventory
GET    /api/supplier-companies/:id/inventory/summary
POST   /api/supplier-companies/:id/inventory/adjust    재고 조정 (입고/출고/조정)
```

**Foodcourt Products:** (2-2 섹션 참조)
**Foodcourt Inventory:** (2-2 섹션 참조)

**System Product extension:**
```
기존 /api/system-products API에 product_type 필터 추가
GET /api/system-products?product_type=consumable
```

### 4-5. Existing Code Changes

| File | Change | Risk |
|------|--------|:----:|
| **User.js** | role ENUM + supplier_company_id 필드 | Low |
| **Ingredient.js** | owner_type ENUM 확장 + 2 FK 필드 | Low |
| **SystemProduct.js** | 6개 필드 추가 (all nullable) | Low |
| **auth.js** | signup에 Supplier Admin 분기 | Low |
| **authService.js** | signup + login에 Supplier Admin 처리 | Medium |
| **invoiceScheduler.js** | Supplier 구독 인보이스 발행 지원 | Medium |
| **MainLayout.tsx** | Supplier Admin 메뉴 Coming Soon → 실제 NavItem | Low |
| **AuthContext.tsx** | ROLE_PERMISSIONS + ROLE_ROUTES + Supplier Admin | Low |
| **ProtectedRoute.tsx** | supplierLevelRoutes 추가 | Low |
| **App.tsx** | Supplier Admin + Foodcourt 라우트 추가 | Low |
| **models/index.js** | 신규 모델 associations | Low |
| **server.js** | 라우트 등록 | Low |

**변경 없음:** Brand, BrandProduct, Foodcourt (floor_plan 외), Restaurant, Invoice, 기존 Supplier 모델, 기존 InventoryBatch/Transaction

### 4-6. New Files

```
Backend:
  models/SupplierCompany.js
  models/SupplierProduct.js
  models/SupplierProductCategory.js
  models/FoodcourtProduct.js
  models/FoodcourtProductCategory.js
  routes/supplier-companies.js
  routes/supplier-products.js
  routes/foodcourt-products.js

Frontend:
  pages/Supplier/SupplierDashboard.tsx
  pages/Supplier/SupplierProductsPage.tsx
  pages/Supplier/SupplierInventoryPage.tsx
  pages/Supplier/SupplierCompanyInfoPage.tsx
  pages/FoodcourtGeneral/FoodcourtProductsPage.tsx
  pages/FoodcourtGeneral/FoodcourtInventoryPage.tsx
```

---

## 5. Existing Code Conflict Prevention

### Conflict 1: 기존 Supplier 모델과 SupplierCompany 충돌
- **해결:** 완전 별개 모델. 기존 Supplier는 "거래처 연락처"로 유지. SupplierCompany는 "사업체". 이름이 다르므로 혼동 없음. 기존 Ingredient.supplier_id, InventoryBatch.supplier_id 등 모든 참조 유지.

### Conflict 2: Ingredient.owner_type ENUM 확장
- **해결:** 'foodcourt', 'supplier' 추가. 기존 'brand', 'restaurant' 쿼리에 영향 없음 (WHERE owner_type = 'brand' 등 기존 쿼리는 새 값을 반환하지 않음).

### Conflict 3: SystemProduct 필드 추가
- **해결:** 모든 신규 필드 nullable. 기존 하드웨어 상품은 이 필드가 null → 기존 로직 영향 없음. product_type 기본값 'hardware' → 기존 상품 자동 분류.

### Conflict 4: MainLayout Supplier Admin 메뉴
- **해결:** 기존 DisabledNavItem 블록을 실제 NavItem으로 교체. 다른 역할 메뉴에 영향 없음 (독립 조건부 렌더링).

### Conflict 5: Invoice payer_type — Supplier 구독 인보이스
- **해결:** 기존 payer_type에 Supplier 관련 값이 없음. createEntitySubscriptionInvoice에 'supplier' entityType 지원 추가 필요. 기존 brand/foodcourt/owner 처리 영향 없음.

### Conflict 6: PlanTemplate.plan_target — 'supplier' 누락
- **해결:** plan_target ENUM에 'supplier' 추가. 기존 값('restaurant','brand','foodcourt','owner') 영향 없음.

---

## 6. Verification Results (2026-04-07)

### 검증 후 수정 사항

| # | 원래 설계 | 수정 |
|---|----------|------|
| 1 | FoodcourtInventoryPage 새로 만듦 | **InventoryManager mode="foodcourt" 확장** — 기존 공통 컴포넌트 활용 (InventoryPage, BrandInventoryPage 모두 이 패턴) |
| 2 | PlanTemplate 변경 누락 | **plan_target ENUM에 'supplier' 추가** (기존 코드 변경 목록에 추가) |
| 3 | SignupPage 변경 누락 | **SignupPage.tsx: AccountRole + ROLE_CONFIG + Step 3 Supplier 폼** (기존 코드 변경 목록에 추가) |
| 4 | SupplierCompanyInfoPage 별도 생성 | **EntityCompanyInfoPage 공통 컴포넌트** 생성 → Brand/Foodcourt/Supplier 3곳에서 재사용 (기존 중복 해소) |
| 5 | Supplier 재고 방안 | Phase 1: SupplierProduct.current_stock 심플 시작 유지, 필요 시 InventoryManager 확장 |

### 기존 코드 중복 감사 결과 (참고 — 신규 개발에서 반복 금지)

| 중복 | 심각도 | 현재 조치 | 향후 |
|------|:-----:|---------|------|
| ProductIngredient ≈ Ingredient (95% 동일) | 심각 | 건드리지 않음 | 별도 리팩토링 |
| ProductRecipe ≈ Recipe (100% 동일) | 심각 | 건드리지 않음 | 별도 리팩토링 |
| ProductIngredientCategory ≈ IngredientCategory | 높음 | 건드리지 않음 | 별도 리팩토링 |
| BrandCompanyInfoPage ≈ FoodcourtCompanyInfoPage | 중간 | **이번 설계에서 해소** (EntityCompanyInfoPage) | - |
| stock status 계산 로직 중복 | 낮음 | 건드리지 않음 | 유틸 함수 추출 |

### 수정 반영된 기존 코드 변경 목록

| File | Change | Risk |
|------|--------|:----:|
| **User.js** | role ENUM + supplier_company_id 필드 | Low |
| **Ingredient.js** | owner_type ENUM 확장 + 2 FK 필드 | Low |
| **SystemProduct.js** | 6개 필드 추가 (all nullable) | Low |
| **PlanTemplate.js** | plan_target ENUM에 'supplier' 추가 | Low |
| **auth.js** | signup에 Supplier Admin 분기 | Low |
| **authService.js** | signup + login에 Supplier Admin 처리 | Medium |
| **invoiceScheduler.js** | Supplier 구독 인보이스 발행 지원 | Medium |
| **MainLayout.tsx** | Supplier Admin 메뉴 Coming Soon → 실제 NavItem | Low |
| **AuthContext.tsx** | ROLE_PERMISSIONS + ROLE_ROUTES + Supplier Admin | Low |
| **ProtectedRoute.tsx** | supplierLevelRoutes 추가 | Low |
| **App.tsx** | Supplier Admin + Foodcourt 라우트 추가 | Low |
| **SignupPage.tsx** | AccountRole + ROLE_CONFIG + Step 3 Supplier 폼 | Low |
| **models/index.js** | 신규 모델 associations | Low |
| **server.js** | 라우트 등록 | Low |

### 수정 반영된 신규 파일 목록

```
Backend:
  models/SupplierCompany.js
  models/SupplierProduct.js
  models/SupplierProductCategory.js
  models/FoodcourtProduct.js
  models/FoodcourtProductCategory.js
  routes/supplier-companies.js
  routes/supplier-products.js
  routes/foodcourt-products.js

Frontend:
  components/Common/EntityCompanyInfoPage.tsx    ← 공통 (Brand/FC/Supplier 재사용)
  pages/Supplier/SupplierDashboard.tsx
  pages/Supplier/SupplierProductsPage.tsx
  pages/Supplier/SupplierInventoryPage.tsx
  pages/FoodcourtGeneral/FoodcourtProductsPage.tsx
  pages/FoodcourtGeneral/FoodcourtInventoryPage.tsx
    → InventoryManager mode="foodcourt" 활용 (20줄 래퍼)
```

---

## 7. Implementation Plan

### Phase 1: Supplier Admin 기반
| # | Task |
|---|------|
| 1 | SupplierCompany 모델 + sync-database |
| 2 | User.role ENUM에 'Supplier Admin' 추가 |
| 3 | PlanTemplate.plan_target에 'supplier' 추가 + SA가 Supplier 플랜 생성 |
| 4 | auth.js/authService.js: Supplier Admin 가입/로그인 |
| 5 | SignupPage.tsx: Supplier Admin 역할 추가 (AccountRole + ROLE_CONFIG + Step 3) |
| 6 | invoiceScheduler: Supplier 구독 인보이스 발행 지원 |
| 7 | SupplierProduct + SupplierProductCategory 모델 |
| 8 | routes/supplier-companies.js + supplier-products.js |
| 9 | AuthContext + ProtectedRoute + App.tsx 라우트 |
| 10 | MainLayout Supplier Admin 메뉴 활성화 |
| 11 | EntityCompanyInfoPage 공통 컴포넌트 (Brand/FC/Supplier 재사용) |
| 12 | SupplierDashboard |
| 13 | SupplierProductsPage (CRUD + Categories) |
| 14 | SupplierInventoryPage (SupplierProduct.current_stock 기반) |

### Phase 2: Foodcourt Products & Inventory
| # | Task |
|---|------|
| 15 | FoodcourtProduct + FoodcourtProductCategory 모델 |
| 16 | Ingredient.owner_type ENUM 확장 + FK 필드 |
| 17 | routes/foodcourt-products.js |
| 18 | syncProductToIngredients for Foodcourt (Brand 패턴) |
| 19 | FoodcourtProductsPage (CRUD + Categories) |
| 20 | FoodcourtInventoryPage (InventoryManager mode="foodcourt") |
| 21 | Foodcourt 사이드바 Products/Inventory 메뉴 추가 |

### Phase 3: SystemProduct Consumable Extension
| # | Task |
|---|------|
| 22 | SystemProduct 모델 필드 추가 (product_type 등) |
| 23 | SystemProductManagementPage에 Consumable 탭/필터 |
| 24 | SA sync_to_ingredients for consumable products |
| 25 | SA Inventory 페이지 (consumable 재고 관리, InventoryManager mode="system" 활용) |

---

# 📌 Sprint 1 Implementation Spec (2026-04-26 — /기능설계)

> 위 원본 설계(2026-04-07)를 베이스로 Irene 결정사항 반영하여 Sprint 1 구현 스펙 확정.
> Sprint 2~4 (SupplierContract/PO/Trade Invoice/Order Mgmt)은 별도 Sprint로 진행. 이 섹션은 Sprint 1만 다룸.

## A. 확정된 결정사항

### A-1. Supplier 가입 진입점 (둘 다 지원)
- **방법 A (SA Invitation):** SA가 `Suppliers` 페이지에서 invitation 발송 → 7일 유효 토큰 → 이메일 링크 → 수신자 가입
- **방법 B (Open Signup):** Landing 페이지 `/signup` 에서 "Supplier" 역할 선택 → 일반 가입 흐름

### A-2. 모듈 13개 (Basic 9 + Advanced 4)
- **Basic (전 플랜 포함):** `supplier_products`, `supplier_inventory`, `supplier_directory`, `supplier_contracts`, `supplier_customers`, `supplier_orders`, `supplier_shipping`, `supplier_trade_invoices`, `supplier_soa`
- **Advanced (`supplier_advanced` 플랜만):** `supplier_admin_staff`, `supplier_performance`, `supplier_activity_logs`, `supplier_multi_warehouse`
- **Sprint 1 활성:** `supplier_products`, `supplier_inventory` 만 실제 페이지/UI. 나머지 11개는 모듈 등록만 (Sprint 2~4에서 활성).

### A-3. Plan Template 2개 + 한도
| Plan | category | 모듈 | product_limit | customer_limit | order_limit | staff_limit |
|------|----------|------|:---:|:---:|:---:|:---:|
| `supplier_basic` | basic | 기본자격 + Basic 9 | 100 | 50 | 1000 | 1 |
| `supplier_advanced` | basic | 기본자격 + Basic 9 + Advanced 4 | -1 | -1 | -1 | 10 |

`-1` = 무제한 (기존 컨벤션). 가격은 Irene이 운영에서 직접 설정 (시드 스크립트 0 원 또는 임의값).

### A-4. ENUM 확장 6개 + 컬럼 추가 2개
- `users.role` ENUM + `'Supplier Admin'`
- `plan_templates.plan_target` ENUM + `'supplier'`
- `invoices.issuer_type` ENUM + `'supplier'`
- `invoices.invoice_category` ENUM + `'trade'` (Sprint 1 등록만, 사용은 Sprint 4)
- `ingredients.owner_type` ENUM + `'foodcourt'`, `'supplier'`
- `addon_modules.target_user_type` ENUM + `'supplier'`
- `plan_templates` 테이블 + `product_limit INT NULL DEFAULT NULL`, `customer_limit INT NULL DEFAULT NULL`

---

## B. DB 스키마 (Stage 3)

### B-1. 신규 테이블 11개

#### `supplier_companies` (Brand 패턴 미러)
```sql
CREATE TABLE supplier_companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE,
  description TEXT,
  logo_url TEXT,
  owner_id INT NULL COMMENT 'Supplier Admin user',
  status ENUM('active','inactive','suspended') DEFAULT 'active',

  -- Company info
  company_name VARCHAR(255), registration_no VARCHAR(100), trade_name VARCHAR(255), tax_no VARCHAR(100),

  -- Contact / Address (formatAddress 표준)
  email VARCHAR(100), phone VARCHAR(20),
  address TEXT, address_line_2 VARCHAR(255),
  city VARCHAR(100), state VARCHAR(100), postal_code VARCHAR(20),
  country CHAR(2) DEFAULT 'MY',
  website VARCHAR(255),
  latitude DECIMAL(10,7), longitude DECIMAL(10,7),

  -- Banking
  bank_name VARCHAR(100), bank_account VARCHAR(50), bank_account_name VARCHAR(255),
  currency VARCHAR(10) NOT NULL DEFAULT 'MYR',
  supported_currencies TEXT COMMENT 'JSON array',

  -- Settings (Brand 패턴 동일 JSON)
  operation_settings TEXT COMMENT 'JSON',
  payment_settings MEDIUMTEXT COMMENT 'JSON',
  invoice_settings TEXT COMMENT 'JSON',

  -- Subscription (Brand/Foodcourt 패턴 동일)
  subscription_status ENUM('trial','active','past_due','cancelled','suspended','overdue') DEFAULT 'trial',
  subscription_start_date DATE, subscription_end_date DATE,
  trial_end_date DATE,
  grace_period_start DATE,
  last_trial_reminder_day INT NULL COMMENT 'Trial reminder dedup',
  plan_id INT NULL COMMENT 'FK to plan_templates',
  plan_amount DECIMAL(10,2),
  billing_cycle ENUM('monthly','annual') DEFAULT 'monthly',

  -- Flags
  is_demo TINYINT(1) DEFAULT 0,
  is_test TINYINT(1) DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,

  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (plan_id) REFERENCES plan_templates(id) ON DELETE SET NULL,
  INDEX idx_owner (owner_id),
  INDEX idx_status (status),
  INDEX idx_subscription_status (subscription_status),
  INDEX idx_deleted (deleted_at)
);
```

#### `supplier_product_categories` (BrandProductCategory 미러)
```sql
CREATE TABLE supplier_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_company_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_company_id) REFERENCES supplier_companies(id) ON DELETE CASCADE,
  INDEX idx_company (supplier_company_id),
  INDEX idx_company_active (supplier_company_id, is_active)
);
```

#### `supplier_products` (BrandProduct 미러, recipe-related 제외)
```sql
CREATE TABLE supplier_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_company_id INT NOT NULL,
  category_id INT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100) COMMENT 'Product code',
  unit VARCHAR(50) COMMENT 'kg, L, piece, etc.',
  base_quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  min_order_quantity INT DEFAULT 1,
  image_url MEDIUMTEXT,
  image_thumbnail TEXT,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  -- Inventory fields (own stock tracking, no PO yet in Sprint 1)
  current_stock DECIMAL(10,2) DEFAULT 0 COMMENT 'Owned stock quantity',
  low_stock_threshold DECIMAL(10,2) DEFAULT 0,
  lead_time_days INT DEFAULT 0,
  emoji VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (supplier_company_id) REFERENCES supplier_companies(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES supplier_product_categories(id) ON DELETE SET NULL,
  INDEX idx_company (supplier_company_id),
  INDEX idx_company_active (supplier_company_id, is_active),
  INDEX idx_category (category_id),
  INDEX idx_low_stock (supplier_company_id, low_stock_threshold)
);
```

#### `supplier_product_option_groups` (BrandProductOptionGroup 미러)
```sql
CREATE TABLE supplier_product_option_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_company_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  is_required TINYINT(1) DEFAULT 0,
  min_selections INT DEFAULT 0,
  max_selections INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_company_id) REFERENCES supplier_companies(id) ON DELETE CASCADE,
  INDEX idx_company (supplier_company_id)
);
```

#### `supplier_product_options` (BrandProductOption 미러)
```sql
CREATE TABLE supplier_product_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (option_group_id) REFERENCES supplier_product_option_groups(id) ON DELETE CASCADE,
  INDEX idx_group (option_group_id)
);
```

#### `supplier_product_option_group_products` (junction N:M)
```sql
CREATE TABLE supplier_product_option_group_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  option_group_id INT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES supplier_products(id) ON DELETE CASCADE,
  FOREIGN KEY (option_group_id) REFERENCES supplier_product_option_groups(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_product_group (product_id, option_group_id),
  INDEX idx_group (option_group_id)
);
```

#### `foodcourt_product_categories`, `foodcourt_products`, `foodcourt_product_option_groups`, `foodcourt_product_options`, `foodcourt_product_option_group_products`
→ Supplier 5개 모델 1:1 미러. `supplier_company_id` 대신 `foodcourt_id INT NOT NULL` (foodcourts FK).

#### `supplier_invitations` (SA invitation 토큰 관리)
```sql
CREATE TABLE supplier_invitations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  supplier_name VARCHAR(255),
  plan_id INT NULL,
  message TEXT,
  invited_by INT NOT NULL COMMENT 'SA user id',
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  used_by_user_id INT NULL,
  status ENUM('pending','used','expired','revoked') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (invited_by) REFERENCES users(id),
  FOREIGN KEY (used_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (plan_id) REFERENCES plan_templates(id) ON DELETE SET NULL,
  INDEX idx_token (token),
  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

### B-2. 기존 테이블 ALTER

```sql
-- ENUM 확장
ALTER TABLE users MODIFY role ENUM(... existing ..., 'Supplier Admin');
ALTER TABLE plan_templates MODIFY plan_target ENUM('restaurant','brand','foodcourt','owner','supplier');
ALTER TABLE invoices MODIFY issuer_type ENUM(... existing ..., 'supplier');
ALTER TABLE invoices MODIFY invoice_category ENUM(... existing ..., 'trade');
ALTER TABLE ingredients MODIFY owner_type ENUM('brand','restaurant','foodcourt','supplier');
ALTER TABLE addon_modules MODIFY target_user_type ENUM('restaurant','brand','foodcourt','owner','all','supplier');

-- 컬럼 추가
ALTER TABLE plan_templates
  ADD COLUMN product_limit INT NULL DEFAULT NULL COMMENT '-1 unlimited, NULL not applicable',
  ADD COLUMN customer_limit INT NULL DEFAULT NULL COMMENT '-1 unlimited, NULL not applicable';

-- ingredients FK 확장 (Sprint 3 PO 시 사용)
ALTER TABLE ingredients
  ADD COLUMN supplier_product_id INT NULL,
  ADD COLUMN foodcourt_product_id INT NULL,
  ADD CONSTRAINT fk_ing_sup_prod FOREIGN KEY (supplier_product_id) REFERENCES supplier_products(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_ing_fc_prod FOREIGN KEY (foodcourt_product_id) REFERENCES foodcourt_products(id) ON DELETE SET NULL;
```

### B-3. Sequelize Model + index.js association

11 신규 모델 파일:
- `models/SupplierCompany.js`, `SupplierProduct.js`, `SupplierProductCategory.js`, `SupplierProductOption.js`, `SupplierProductOptionGroup.js`, `SupplierProductOptionGroupProduct.js`
- `models/FoodcourtProduct.js`, `FoodcourtProductCategory.js`, `FoodcourtProductOption.js`, `FoodcourtProductOptionGroup.js`, `FoodcourtProductOptionGroupProduct.js`
- `models/SupplierInvitation.js`

`models/index.js` association 추가:
```javascript
// Supplier
SupplierCompany.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasOne(SupplierCompany, { foreignKey: 'owner_id', as: 'supplierCompany' });
SupplierCompany.belongsTo(PlanTemplate, { foreignKey: 'plan_id', as: 'plan' });
SupplierCompany.hasMany(SupplierProduct, { foreignKey: 'supplier_company_id', as: 'products' });
SupplierCompany.hasMany(SupplierProductCategory, { foreignKey: 'supplier_company_id', as: 'categories' });
SupplierCompany.hasMany(SupplierProductOptionGroup, { foreignKey: 'supplier_company_id', as: 'optionGroups' });
SupplierProductCategory.hasMany(SupplierProduct, { foreignKey: 'category_id', as: 'products' });
SupplierProduct.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'company' });
SupplierProduct.belongsTo(SupplierProductCategory, { foreignKey: 'category_id', as: 'category' });
SupplierProduct.belongsToMany(SupplierProductOptionGroup, { through: SupplierProductOptionGroupProduct, foreignKey: 'product_id', otherKey: 'option_group_id', as: 'optionGroups' });
SupplierProductOptionGroup.belongsToMany(SupplierProduct, { through: SupplierProductOptionGroupProduct, foreignKey: 'option_group_id', otherKey: 'product_id', as: 'products' });
SupplierProductOptionGroup.hasMany(SupplierProductOption, { foreignKey: 'option_group_id', as: 'options' });
SupplierProductOption.belongsTo(SupplierProductOptionGroup, { foreignKey: 'option_group_id', as: 'group' });

// Foodcourt Products (mirror)
Foodcourt.hasMany(FoodcourtProduct, { foreignKey: 'foodcourt_id', as: 'products' });
Foodcourt.hasMany(FoodcourtProductCategory, { foreignKey: 'foodcourt_id', as: 'productCategories' });
// ... (동일 패턴)

// Supplier Invitation
SupplierInvitation.belongsTo(User, { foreignKey: 'invited_by', as: 'inviter' });
SupplierInvitation.belongsTo(User, { foreignKey: 'used_by_user_id', as: 'usedBy' });
SupplierInvitation.belongsTo(PlanTemplate, { foreignKey: 'plan_id', as: 'plan' });

// Ingredient FK 확장
Ingredient.belongsTo(SupplierProduct, { foreignKey: 'supplier_product_id', as: 'supplierProduct' });
Ingredient.belongsTo(FoodcourtProduct, { foreignKey: 'foodcourt_product_id', as: 'foodcourtProduct' });
```

### B-4. Migration 전략

`scripts/sprint1-supply-chain-migration.js` 신규:
1. ENUM 확장 (ALTER TABLE MODIFY)
2. plan_templates 컬럼 2개 추가
3. ingredients FK 컬럼 2개 추가
4. CREATE TABLE (11개 신규)
5. 기본 SupplierCompany 시드 (운영 미실행 옵션)
6. AddonModule 13개 시드
7. PlanTemplate 2개 시드 (`supplier_basic`, `supplier_advanced`)
8. Idempotent (재실행 안전)

---

## C. UI 흐름 (Stage 4)

### C-1. 신규 페이지 16개

#### Supplier Admin 영역 (8 페이지)
| 경로 | 컴포넌트 | 기능 |
|------|----------|------|
| `/pos/supplier/dashboard` | `pages/Supplier/SupplierDashboard.tsx` | 카드 4개 (상품수/저재고/재고가치/구독상태) |
| `/pos/supplier/products` | `pages/Supplier/SupplierProductsPage.tsx` | 상품 CRUD + 카테고리 + 옵션그룹 (BG `BrandProductManagementPage` 패턴 미러) |
| `/pos/supplier/inventory` | `pages/Supplier/SupplierInventoryPage.tsx` | 재고 리스트 + adjust/receive 모달 + 거래내역 |
| `/pos/supplier/company-info` | `pages/Supplier/SupplierCompanyInfoPage.tsx` | AutoSaveField + AddressFields (BG `BrandCompanyInfoPage` 패턴 미러) |
| `/pos/supplier/payment-settings` | `pages/Supplier/SupplierPaymentSettingsPage.tsx` | BG `BrandPaymentSettingsPage` 패턴 미러 |
| `/pos/supplier/invoice-settings` | `pages/Supplier/SupplierInvoiceSettingsPage.tsx` | InvoiceSettings 패턴 |
| `/pos/supplier/invoices` | `pages/Supplier/SupplierInvoicesPage.tsx` | 자기 구독 인보이스 보기 (Owner `OwnerInvoicesPage` 패턴 미러) |
| `/pos/supplier/notices` | `pages/Notices/NoticesPage.tsx` (재사용) | 공지 수신 |

#### Foodcourt General 신규 (2 페이지)
| 경로 | 컴포넌트 |
|------|----------|
| `/pos/foodcourt/general/products` | `pages/FoodcourtGeneral/FoodcourtProductsPage.tsx` (BG `BrandProductManagementPage` 패턴) |
| `/pos/foodcourt/general/inventory` | `pages/FoodcourtGeneral/FoodcourtInventoryPage.tsx` (BG inventory 패턴) |

#### System Admin 신규 (2 페이지 + Landing 변경)
| 경로 | 컴포넌트 | 기능 |
|------|----------|------|
| `/pos/admin/supplier-companies` | `pages/Admin/SupplierCompaniesPage.tsx` | SA가 SupplierCompany 전수 관리 |
| `/pos/admin/supplier-invitations` | `pages/Admin/SupplierInvitationsPage.tsx` | SA가 invitation 발송/관리 |
| `/signup` (확장) | 기존 `pages/Login/SignupPage.tsx` | "Supplier" 역할 옵션 추가 + invitation_token 처리 |

### C-2. 사이드바 (`MainLayout.tsx`)

**Supplier Admin 메뉴 (신규):**
```
Dashboard       (icon: home)
Products        (icon: box, requireSupplierModule('supplier_products'))
Inventory       (icon: warehouse, requireSupplierModule('supplier_inventory'))
─────
Customers       (Coming Soon, supplier_customers, Sprint 2)
Contracts       (Coming Soon, supplier_contracts, Sprint 2)
Orders          (Coming Soon, supplier_orders, Sprint 4)
─────
Company Info
Payment Settings
Invoice Settings
Invoices
Notices
System Inquiry
```

**Foodcourt General 메뉴 추가 (Management 섹션 하단):**
```
... 기존 ...
Products        (신규, requireFoodcourtModule('fc_products'))
Inventory       (신규, requireFoodcourtModule('fc_inventory'))
```
(주: FC도 모듈 등록 필요 — `fc_products`, `fc_inventory`)

**System Admin 메뉴 추가 (Suppliers 섹션):**
```
Supplier Companies  (신규)
Supplier Invitations (신규)
```

### C-3. 라우트 (`App.tsx`) + ProtectedRoute

**App.tsx React.lazy:**
```tsx
const SupplierDashboard = lazy(() => import('./pages/Supplier/SupplierDashboard'));
const SupplierProductsPage = lazy(() => import('./pages/Supplier/SupplierProductsPage'));
const SupplierInventoryPage = lazy(() => import('./pages/Supplier/SupplierInventoryPage'));
const SupplierCompanyInfoPage = lazy(() => import('./pages/Supplier/SupplierCompanyInfoPage'));
const SupplierPaymentSettingsPage = lazy(() => import('./pages/Supplier/SupplierPaymentSettingsPage'));
const SupplierInvoiceSettingsPage = lazy(() => import('./pages/Supplier/SupplierInvoiceSettingsPage'));
const SupplierInvoicesPage = lazy(() => import('./pages/Supplier/SupplierInvoicesPage'));
const FoodcourtProductsPage = lazy(() => import('./pages/FoodcourtGeneral/FoodcourtProductsPage'));
const FoodcourtInventoryPage = lazy(() => import('./pages/FoodcourtGeneral/FoodcourtInventoryPage'));
const SupplierCompaniesPage = lazy(() => import('./pages/Admin/SupplierCompaniesPage'));
const SupplierInvitationsPage = lazy(() => import('./pages/Admin/SupplierInvitationsPage'));
```

**ProtectedRoute** 화이트리스트 확장:
- `supplierLevelRoutes` 신규 (Supplier Admin 전용)
- `MODULE_GATED_ROUTES` 에 `/pos/supplier/products` `/pos/supplier/inventory` 추가

### C-4. 기존 컴포넌트 재사용 (절대 새로 만들지 않음)

| 컴포넌트 | 위치 | 재사용 페이지 |
|----------|------|-------------|
| `<AddressFields>` | `components/Form/AddressFields.tsx` | SupplierCompanyInfoPage |
| `<AutoSaveField>` | `components/Common/AutoSaveField.tsx` | SupplierCompanyInfoPage, SupplierInvoiceSettingsPage |
| `<AutoSaveAddressFields>` | `components/Form/AutoSaveAddressFields.tsx` | SupplierCompanyInfoPage |
| Modal/CommonModal | `components/UI/` | All CRUD modals |
| FormAccordion | `components/UI/FormAccordion.tsx` | Detail 페이지 |
| DataTable, FilterBar | `components/UI/` | List 페이지 |
| Button | `components/Button/` | All 액션 |
| `<DateField>`, `<DateRangeField>` | `components/Common/` | Date 입력 |
| `formatAddress`, `formatDateTime`, `formatDate` | `utils/` | Display |
| `<InvoiceHistoryModal>` | `components/Invoice/` | SupplierInvoicesPage |
| LoadingContainer, EmptyState, ErrorBanner | `components/UI/` | All |

### C-5. i18n (4개 언어)

**신규 namespace:** `public/locales/{en,ko,zh,ms}/supplier.json` (50+ 키)
**확장:** `common.json` (`role.supplier_admin` 등), `signup.json` (Supplier 옵션), `admin.json` (SupplierCompanies 페이지)

---

## D. 보안 + Plan Limit (구현 표준)

### D-1. 미들웨어 3개 신규

`middleware/auth.js` 확장:
```javascript
const requireSupplierScope = async (req, res, next) => {
  if (req.user.role !== 'Supplier Admin') {
    return res.status(403).json({ success: false, message: 'Supplier Admin only' });
  }
  const supplierCompany = await SupplierCompany.findOne({ where: { owner_id: req.user.id, deleted_at: null } });
  if (!supplierCompany) {
    return res.status(404).json({ success: false, message: 'No supplier company found for this user' });
  }
  req.supplierCompany = supplierCompany;
  next();
};
```

`middleware/requirePlanLimit.js` 신규:
```javascript
const requirePlanLimit = (limitField) => async (req, res, next) => {
  const company = req.supplierCompany || req.foodcourt;
  const plan = await PlanTemplate.findByPk(company.plan_id);
  const limit = plan?.[limitField];
  if (limit === null || limit === undefined || limit === -1) return next();

  // 카운트 (모델별 분기)
  let currentCount = 0;
  if (limitField === 'product_limit') {
    currentCount = await SupplierProduct.count({ where: { supplier_company_id: company.id, deleted_at: null } });
  } else if (limitField === 'customer_limit') { /* Sprint 2 */ }

  if (currentCount >= limit) {
    return res.status(400).json({
      success: false,
      message: 'Plan limit reached. Upgrade to Advanced.',
      data: { limit, current: currentCount }
    });
  }
  next();
};
```

`middleware/requireSupplierModule.js` 신규:
```javascript
const requireSupplierModule = (moduleCode) => async (req, res, next) => {
  const plan = await PlanTemplate.findByPk(req.supplierCompany.plan_id);
  const modules = plan?.included_modules || [];
  if (!modules.includes(moduleCode)) {
    return res.status(403).json({ success: false, message: `Module ${moduleCode} not included in your plan` });
  }
  next();
};
```

### D-2. 보안 체크리스트 (모든 신규 endpoint)

- [x] `authenticateToken` (공개 endpoint 제외)
- [x] 역할 가드 (`requireRole` 또는 scope 미들웨어)
- [x] IDOR 방어 (`:id` 파라미터 owner 검증)
- [x] 입력 검증 (`validation.js` + `sanitizeString`)
- [x] Rate limit (express-rate-limit 글로벌 1000/15min, 가입 20/15min)
- [x] CORS 화이트리스트
- [x] SQL Injection (Sequelize ORM)
- [x] Cookie 보안 (HttpOnly + Secure + SameSite=strict)

---

## E. 검증 (Stage 6 미리 명세)

### E-1. health-check 신규 케이스 (43 → 49)
1. `Supplier Admin login (auth)` — 토큰 발급 성공
2. `Supplier Admin can access /api/supplier/dashboard` — 200
3. `Supplier Admin cannot access /api/admin/supplier-companies` — 403
4. `Anonymous on /api/supplier-products → 401`
5. `Supplier Admin POST product hits plan limit (basic 100 max) → 400`
6. `IDOR: other supplier's product PUT → 404`

### E-2. API 라운드트립 테스트 (`test-supplier.js`)

```
1. Signup B (Landing): Supplier Admin 가입 → SupplierCompany 생성 → trial 7일 → 구독 인보이스 1건
2. Login → 토큰
3. POST /api/supplier-product-categories → 카테고리 1건
4. POST /api/supplier-products → 상품 5건
5. GET /api/supplier-products → 5건 일치
6. PUT /api/supplier-products/:id → 가격 수정
7. POST /api/supplier-inventory/receive → 입고 100
8. GET /api/supplier-inventory → 현재고 100
9. POST /api/supplier-inventory/adjust { delta: -20 } → 80
10. 다른 Supplier Admin 로그인 → :id 접근 시도 → 404 (IDOR)
11. POST /api/supplier-products 100건 → 101번째 400 plan_limit
12. SA Login → POST /api/admin/supplier-invitations → 토큰 생성
13. GET /api/auth/invitation/:token → prefill 확인
14. POST /api/auth/signup with invitation_token → SupplierCompany 생성
15. SA → DELETE supplier-companies/:id → soft delete
16. 클린업
```

### E-3. UI 검증
- 4개 언어 (en/ko/zh/ms) 각 페이지 렌더 확인
- 빈 상태/로딩/에러
- 반응형 (데스크톱/태블릿/모바일)
- AutoSaveField indicator 동작 (Setting 페이지)
- Modal close + refresh 패턴 (성공 시 alert 안 띄움)

### E-4. 회귀 검증
- BrandProduct/BG flow 무영향 확인
- 기존 Supplier (거래처 연락처) 모델 무영향 (BG의 SuppliersPage 작동)
- 기존 Ingredient 차감 로직 무영향 (recipe-driven inventory deduction)
- health-check 43/43 → 49/49 PASS

---

## F. 구현 순서 (Stage 5)

### Phase 5A: DB 기반 (Sequential, 30분)
1. ENUM/컬럼 ALTER 스크립트 작성 + 실행 (`scripts/sprint1-migration.js`)
2. 11개 신규 모델 파일
3. `models/index.js` association 추가
4. `sync-database.js` 실행 (테이블 생성)

### Phase 5B: 시드 (Sequential, 15분)
5. AddonModule 13개 시드 (`scripts/seed-supplier-modules.js`)
6. PlanTemplate 2개 시드 (`scripts/seed-supplier-plans.js`)
7. fc_products / fc_inventory 모듈 추가 시드

### Phase 5C: 미들웨어 (Sequential, 15분)
8. `middleware/auth.js` 에 `requireSupplierScope` 추가
9. `middleware/requirePlanLimit.js` 신규
10. `middleware/requireSupplierModule.js` 신규

### Phase 5D: Backend Routes (Parallel via agent, 60분)
11. `routes/supplier.js` (11 endpoints)
12. `routes/supplier-products.js` (16 endpoints)
13. `routes/supplier-inventory.js` (6 endpoints)
14. `routes/supplier-companies.js` (5 endpoints)
15. `routes/admin-supplier-invitations.js` (4 endpoints)
16. `routes/foodcourt-products.js` (16 endpoints, BG 패턴 미러)
17. `routes/foodcourt-inventory.js` (6 endpoints, BG 패턴 미러)
18. `routes/auth.js` 확장 (signup + invitation flow)
19. `server.js` 라우트 마운트
20. `routes/plans.js` 확장 (?target=supplier)

### Phase 5E: Frontend Auth/Layout (Sequential, 30분)
21. `AuthContext` ROLE_PERMISSIONS / ROLE_ROUTES + Supplier Admin
22. `ProtectedRoute` `supplierLevelRoutes` + MODULE_GATED_ROUTES
23. `MainLayout` 사이드바 메뉴 (Supplier 12개 + FG 추가 2개 + SA 추가 2개)
24. `App.tsx` 16개 lazy import + Route 등록
25. `SignupPage` 확장 (Supplier 역할 옵션 + invitation_token 처리)

### Phase 5F: Frontend Pages (Parallel via agent, 90분)
26. SupplierDashboard
27. SupplierProductsPage (CRUD + Categories + OptionGroups)
28. SupplierInventoryPage
29. SupplierCompanyInfoPage
30. SupplierPaymentSettingsPage
31. SupplierInvoiceSettingsPage
32. SupplierInvoicesPage
33. FoodcourtProductsPage
34. FoodcourtInventoryPage
35. Admin/SupplierCompaniesPage
36. Admin/SupplierInvitationsPage

### Phase 5G: i18n (Parallel via agent, 20분)
37. 4개 언어 번역 파일 (`supplier.json` 신규 + 기존 namespace 확장)

### Phase 5H: 검증 (Sequential, 30분)
38. 빌드 확인 (`npm run build:dev`)
39. State hydration check
40. health-check 신규 6 케이스 추가
41. `test-supplier.js` 실행 (16 시나리오)
42. UI 4언어 + 반응형 + 회귀 확인

**예상 총시간:** 약 5시간 (병렬화로 단축 가능)

---

