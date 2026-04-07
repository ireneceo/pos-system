# Design 2: Supplier Contract System

> **Created:** 2026-04-07
> **Status:** Design Confirmed (verified 2026-04-07)
> **Scale:** Medium-Large
> **Dependency:** Design 1 (Seller Product & Inventory System)
> **Parent:** Supply Chain System (docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md)

---

## 1. Purpose

구매자(Restaurant, Brand General, Foodcourt General)가 공급업체(Supplier)를 검색하고 계약을 맺어야 해당 공급업체의 상품이 발주 화면에 노출된다. SA/Brand/Foodcourt → Restaurant 관계는 자동(계약 불필요), **Supplier만 계약 필요.**

---

## 2. Current State

### 기존에 있는 것

| 항목 | 상태 | 활용 |
|------|------|------|
| Supplier 모델 (연락처) | O | 참조만 — 계약은 SupplierContract 별도 |
| SupplierBrand N:M | O | 기존 유지 — 계약과 별개 |
| SupplierCategory | O | Supplier Directory 필터에 활용 |
| HardwareQuote 패턴 (request→review→approve) | O | 계약 신청 워크플로우 참고 |
| ContactInquiry 패턴 | O | 상태 워크플로우 참고 |
| sendNotification / sendNotificationBatch | O | 알림 발송에 재사용 |
| Op.or 검색 패턴 | O | Directory 검색에 재사용 |
| /api/upload/files | O | 계약서 업로드에 재사용 |

### 기존에 없는 것

| 항목 | 필요 |
|------|------|
| Supplier Directory (공개 검색) | 신규 |
| SupplierContract (계약 관리) | 신규 |
| Contract Request 워크플로우 | 신규 |
| Customer List + 결제 조건 설정 | 신규 |

---

## 3. Seller-Buyer 관계별 접근 방식

| 판매자 → 구매자 | 계약 필요? | 상품 노출 방식 |
|---------------|:---------:|:----------:|
| SA → 모든 Restaurant/Brand/FC | X (자동) | SA 상품 전체 노출 |
| Brand → 자기 브랜드 Restaurant | X (자동) | brand_id 매칭으로 자동 노출 |
| Foodcourt → 자기 입점 Restaurant | X (자동) | foodcourt_id 매칭으로 자동 노출 |
| **Supplier → 누구든** | **O (계약 필수)** | **SupplierContract 존재 시에만 노출** |

---

## 4. 계약 흐름

### 4-1. 구매자 → 공급업체 계약 신청

```
구매자 (Restaurant Admin / Brand General / Foodcourt General)
  │
  ├─ Supplier Directory에서 공급업체 검색
  │   → 카테고리, 상품, 이름, 지역으로 필터
  │   → 공급업체 프로필 + 상품 카탈로그 조회
  │
  ├─ [Request Contract] 클릭
  │   → 모달: 메시지 입력 (선택)
  │   → SupplierContract 생성 (status: 'requested')
  │   → 공급업체에 이메일 + 대시보드 알림
  │
  └─ 대기 (Pending 상태)
```

### 4-2. 공급업체 → 계약 검토/승인

```
공급업체 (Supplier Admin)
  │
  ├─ Contract Requests 목록에서 신청 확인
  │   → 신청자 정보 (회사명, 연락처, 역할)
  │   → 메시지 확인
  │
  ├─ [Approve] → 계약 승인
  │   → status: 'active'
  │   → 결제 조건 설정 (Immediate / Monthly SOA + 결제일)
  │   → 구매자에게 승인 알림
  │   → 구매자의 발주 화면에 이 공급업체 상품 노출 시작
  │
  └─ [Reject] → 거절
      → status: 'rejected'
      → 거절 사유 입력 (필수)
      → 구매자에게 거절 알림
```

### 4-3. 계약 종료

```
어느 쪽이든 [Terminate] 가능:
  → 사유 입력
  → status: 'terminated'
  → 상대방에게 알림
  → 구매자의 발주 화면에서 해당 공급업체 상품 비노출
```

---

## 5. 화면 설계

### 5-1. Supplier Directory (구매자 측)

모든 구매자(Restaurant, Brand, Foodcourt)가 접근하는 공급업체 검색 페이지.

```
┌──────────────────────────────────────────────────────────────┐
│  Supplier Directory                                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Search: [____________________]   Category: [All ▾]          │
│                                                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ [Logo]      │ │ [Logo]      │ │ [Logo]      │            │
│  │ ABC Supplies│ │ Fresh Farm  │ │ MeatWorld   │            │
│  │             │ │             │ │             │            │
│  │ Meat, Seafood│ │ Produce    │ │ Meat        │            │
│  │ KL, Selangor│ │ Johor      │ │ Nationwide  │            │
│  │ 24 products │ │ 18 products│ │ 31 products │            │
│  │             │ │             │ │             │            │
│  │ [View Profile]│ │ [View Profile]│ │ [View Profile]│       │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-2. Supplier Profile (공급업체 상세 — 구매자가 조회)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Directory                                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Logo]  ABC Supplies Sdn Bhd                          │   │
│  │          Meat & Seafood Supplier                        │   │
│  │          KL, Selangor · Since 2020                     │   │
│  │                                                         │   │
│  │          [Request Contract]    (계약 없을 때)             │   │
│  │          [Contract Active]     (active — 초록 뱃지)      │   │
│  │          [Pending Review]      (requested — 비활성)      │   │
│  │          [Request Again]       (rejected/terminated)     │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  About                                                        │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Fresh meat and seafood supplier serving restaurants     │   │
│  │  in Klang Valley since 2020.                            │   │
│  │                                                         │   │
│  │  Categories: Meat, Seafood, Frozen                      │   │
│  │  Delivery Area: KL, Selangor, Putrajaya                │   │
│  │  Lead Time: 1-3 days                                    │   │
│  │  Min Order: RM 200                                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Product Catalog                                              │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Search: [________]  Category: [All ▾]                  │   │
│  │                                                         │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ Chicken  │ │ Salmon   │ │ Tiger    │               │   │
│  │  │ Breast   │ │ Fillet   │ │ Prawn    │               │   │
│  │  │ RM12.50  │ │ RM45.00  │ │ RM38.00  │               │   │
│  │  │ /kg      │ │ /kg      │ │ /kg      │               │   │
│  │  │ MOQ: 5kg │ │ MOQ: 2kg │ │ MOQ: 3kg │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘               │   │
│  │                                                         │   │
│  │  (계약 전: 가격만 보임, 발주 불가)                         │   │
│  │  (계약 후: 발주 화면에서 이 상품들로 발주 가능)             │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-3. Contract Request 모달 (구매자)

```
┌────────────── Request Contract ───────────────────────────────┐
│                                                                │
│  Supplier: ABC Supplies Sdn Bhd                                │
│                                                                │
│  Message (optional)                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  We're interested in your meat and seafood products for   │  │
│  │  our restaurant in Bangsar.                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Your company info will be shared with the supplier:           │
│  Restaurant: Kim's Cafe                                        │
│  Contact: Kim Irene (irene@example.com)                        │
│                                                                │
│  {formError && <ErrorMessage>}                                 │
│                                                                │
│                        [Cancel]    [Send Request]              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 5-4. My Suppliers (구매자 — 계약된 공급업체 목록)

```
┌──────────────────────────────────────────────────────────────┐
│  My Suppliers                           [Find Suppliers →]    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Status: [All ▾]   Search: [________]                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Supplier       Category    Products  Terms     Status  │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ ABC Supplies   Meat        24        Net 30    Active  │   │
│  │ Fresh Farm     Produce     18        COD       Active  │   │
│  │ PackCo         Packaging   12        Net 15    Active  │   │
│  │ New Supplier   -           -         -         Pending │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  행 클릭 → 계약 상세 (조건, 상품 목록, 발주 이력)               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-5. Contract Requests (공급업체 측)

```
┌──────────────────────────────────────────────────────────────┐
│  Contract Requests                                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [Pending (3)]  [Rejected (1)]                               │
│                                                               │
│  ── Pending ──                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ From              Type          Requested    Action     │   │
│  │ ──────────────────────────────────────────────────     │   │
│  │ Kim's Cafe        Restaurant    2026-04-07             │   │
│  │ (Restaurant Admin)              "Interested in meat..."│   │
│  │                                  [Approve] [Reject]    │   │
│  │                                                         │   │
│  │ Seoul BBQ Brand   Brand         2026-04-06             │   │
│  │ (Brand General)                 "Supply for 5 stores"  │   │
│  │                                  [Approve] [Reject]    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-6. Approve 모달 (공급업체 — 승인 시 결제 조건 설정)

```
┌────────────── Approve Contract ───────────────────────────────┐
│                                                                │
│  Customer: Kim's Cafe (Restaurant)                             │
│                                                                │
│  Payment Terms                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Terms          [Net 30 ▾]                                │  │
│  │                  COD / Net 15 / Net 30 / Net 60           │  │
│  │                                                           │  │
│  │  Invoice Cycle   [Monthly SOA ▾]                          │  │
│  │                   Immediate / Monthly SOA                  │  │
│  │                                                           │  │
│  │  Payment Due Day  [15] of next month                      │  │
│  │  (Monthly SOA 선택 시만 표시)                                │  │
│  │                                                           │  │
│  │  Credit Limit     [RM 50,000    ] (optional)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Notes (optional)                                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│                        [Cancel]    [Approve & Activate]        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 5-7. Customer Management (공급업체 — 계약 고객 관리)

```
┌──────────────────────────────────────────────────────────────┐
│  Customers                                                    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│  │ Active   │ │ Total    │ │ Credit   │                     │
│  │   12     │ │ Orders   │ │ Used     │                     │
│  │ customers│ │ RM 45,200│ │ RM 12,300│                     │
│  └──────────┘ └──────────┘ └──────────┘                     │
│                                                               │
│  Search: [________]  Type: [All ▾]                           │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Customer      Type         Terms    Cycle    Credit    │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ Kim's Cafe    Restaurant   Net 30   Monthly  50,000   │   │
│  │ Seoul BBQ     Brand        Net 30   Monthly  100,000  │   │
│  │ FC Central    Foodcourt    Net 15   Immediate -       │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  행 클릭 → 고객 상세 (결제 조건 수정, 거래 내역, 미결 금액)     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-8. Customer Detail (공급업체 — 고객 상세)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Customers                                          │
│                                                               │
│  Kim's Cafe                                    [Active]       │
│  Restaurant · Contract since 2026-04-07                       │
│                                                               │
│  Payment Settings (AutoSaveField)                             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Terms          [Net 30 ▾]                    Saved    │   │
│  │  Invoice Cycle  [Monthly SOA ▾]               Saved    │   │
│  │  Due Day        [15]                          Saved    │   │
│  │  Credit Limit   [RM 50,000]                   Saved    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  (설계 4에서 추가: 거래 내역, 미결 인보이스, SOA 등)            │
│                                                               │
│  [Terminate Contract]                                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-9. 사이드바 메뉴 변경

```
[구매자 — Restaurant Admin]
  ...
  ── Procurement ──          ← NEW 섹션
  My Suppliers               ← NEW (계약된 공급업체 목록)
  Supplier Directory         ← NEW (공급업체 검색)
  ...

[구매자 — Brand General]
  ...
  ── Procurement ──          ← NEW
  My Suppliers               ← NEW
  Supplier Directory         ← NEW
  ...

[구매자 — Foodcourt General]
  ...
  ── Procurement ──          ← NEW
  My Suppliers               ← NEW
  Supplier Directory         ← NEW
  ...

[판매자 — Supplier Admin]
  Dashboard
  ── Products ──
  Products
  ── Inventory ──
  Inventory
  ── Customers ──            ← NEW
  Contract Requests          ← NEW
  Customers                  ← NEW
  ── Account ──
  Company Info
  Profile
```

---

## 6. Technical Design

### 6-1. New Models

**SupplierContract:**
```
id (PK)
contract_number (STRING, unique — "SCT-YYMMDDNNN" 패턴, HardwareQuote 참고)

-- 관계
supplier_company_id (FK → supplier_companies.id)
customer_type (ENUM: 'restaurant' / 'brand' / 'foodcourt')
customer_id (INTEGER — restaurant.id / brand.id / foodcourt.id)
requested_by (FK → users.id — 신청한 유저)

-- 상태
status (ENUM: 'requested' / 'active' / 'rejected' / 'terminated')
requested_at (DATE)
approved_at (DATE)
rejected_at (DATE)
terminated_at (DATE)
rejection_reason (STRING 255)
termination_reason (STRING 255)
terminated_by (ENUM: 'supplier' / 'customer')

-- 결제 조건 (공급업체가 승인 시 설정)
payment_terms (STRING 50 — 'COD' / 'Net 15' / 'Net 30' / 'Net 60')
invoice_cycle (ENUM: 'immediate' / 'monthly_soa')
payment_due_day (INTEGER — SOA 시 결제일, 예: 15 = 익월 15일)
credit_limit (DECIMAL 10,2 — nullable, 0 = 무제한)

-- 기타
message (TEXT — 신청 시 메시지)
notes (TEXT — 공급업체 메모)

-- UNIQUE 제약 없음 (rejected/terminated 후 재신청 허용)
-- 비즈니스 로직으로 중복 방지: status가 'requested' 또는 'active'인 건이 있으면 신규 신청 차단
```

**SupplierProfile (공급업체 공개 프로필 — SupplierCompany 확장):**
```
SupplierCompany 모델에 필드 추가:
  public_description (TEXT) — 공개 소개글
  delivery_areas (STRING 255) — 배달 가능 지역
  min_order_amount (DECIMAL 10,2) — 최소 주문 금액
  avg_lead_time_days (INTEGER) — 평균 리드타임
  is_public (BOOLEAN, default true) — Directory에 노출 여부
```

SupplierCompany 모델에 이 필드들을 직접 추가 (별도 모델 불필요 — BrandProduct/Brand 패턴처럼 같은 테이블에 공개 정보 포함).

### 6-2. API Endpoints

**Supplier Directory (구매자 측 — authenticateToken):**
```
GET  /api/supplier-directory
     ?search=&category=&page=1&limit=20
     → 공개 프로필 목록 (is_public=true인 SupplierCompany)
     → 각 공급업체의 상품 수, 카테고리, 배달 지역 포함

GET  /api/supplier-directory/:supplierCompanyId
     → 공급업체 프로필 상세 + 상품 카탈로그
     → 계약 상태 포함 (현재 유저 기준)

GET  /api/supplier-directory/:supplierCompanyId/products
     ?search=&category=&page=1&limit=20
     → 공급업체 상품 목록 (공개)
```

**Contract (구매자 측 — authenticateToken):**
```
POST /api/supplier-contracts
     Body: { supplier_company_id, message }
     → customer_type/customer_id는 서버에서 req.user 기반 자동 결정
     → 공급업체에 알림 발송

GET  /api/supplier-contracts/my-suppliers
     → 내 계약 목록 (customer = 나)
     → 필터: status

GET  /api/supplier-contracts/:id
     → 계약 상세

POST /api/supplier-contracts/:id/terminate
     Body: { reason }
     → 구매자가 종료
```

**Contract (공급업체 측 — authenticateToken, Supplier Admin):**
```
GET  /api/supplier-contracts/requests
     → 수신된 신청 목록 (supplier_company = 나)
     → 필터: status

PUT  /api/supplier-contracts/:id/approve
     Body: { payment_terms, invoice_cycle, payment_due_day, credit_limit, notes }
     → 승인 + 결제 조건 설정

PUT  /api/supplier-contracts/:id/reject
     Body: { rejection_reason }
     → 거절

POST /api/supplier-contracts/:id/terminate
     Body: { reason }
     → 공급업체가 종료
```

**Customer Management (공급업체 측 — authenticateToken, Supplier Admin):**
```
GET  /api/supplier-contracts/customers
     → 계약 active인 고객 목록 + 결제 조건

GET  /api/supplier-contracts/customers/:contractId
     → 고객 상세 (결제 조건 + 거래 내역은 설계 4에서)

PUT  /api/supplier-contracts/customers/:contractId/terms
     Body: { payment_terms, invoice_cycle, payment_due_day, credit_limit }
     → 결제 조건 수정 (AutoSaveField)
```

### 6-3. Existing Code Changes

| File | Change | Risk |
|------|--------|:----:|
| **SupplierCompany.js** (설계 1에서 생성) | 5개 공개 프로필 필드 추가 | Low |
| **MainLayout.tsx** | 구매자 3역할에 Procurement 섹션 추가, Supplier Admin에 Customers 섹션 추가 | Low |
| **AuthContext.tsx** | 구매자 3역할 ROLE_ROUTES에 supplier-directory, my-suppliers 추가 | Low |
| **ProtectedRoute.tsx** | 구매자/공급업체 라우트 추가 | Low |
| **App.tsx** | 6개 라우트 추가 | Low |
| **server.js** | supplier-contracts, supplier-directory 라우트 등록 | Low |
| **models/index.js** | SupplierContract associations | Low |

**변경 없음:** 기존 Supplier 모델, suppliers.js 라우트, Brand, Foodcourt, Restaurant, Invoice

### 6-4. New Files

```
Backend:
  models/SupplierContract.js
  routes/supplier-directory.js
  routes/supplier-contracts.js

Frontend:
  pages/Procurement/SupplierDirectoryPage.tsx     (구매자 공통)
  pages/Procurement/SupplierProfilePage.tsx        (구매자 공통)
  pages/Procurement/MySuppliersPage.tsx            (구매자 공통)
  pages/Supplier/ContractRequestsPage.tsx          (공급업체)
  pages/Supplier/CustomersPage.tsx                 (공급업체)
```

### 6-5. Reuse

| 기존 | 활용 |
|------|------|
| HardwareQuote 넘버링 패턴 ("QUO-YYMMDDNNN") | contract_number 생성: "SCT-YYMMDDNNN" |
| Op.or 검색 패턴 | Directory 검색 |
| sendNotification | 신청/승인/거절/종료 알림 |
| /api/upload/files | 계약서 업로드 (필요 시) |
| FilterComponents (FilterBar, SearchInput, FilterSelect) | Directory + 목록 페이지 필터 |
| AutoSaveField | 결제 조건 수정 (Customer Detail) |
| ProductCard 패턴 (BrandProductsTab) | 상품 카탈로그 카드 UI |

---

## 7. Conflict Prevention

### Conflict 1: 기존 Supplier 모델과의 관계
- **기존 Supplier**: 연락처 (Brand/Restaurant가 관리) — 변경 없음
- **SupplierCompany** (설계 1): 사업체 (Supplier Admin이 소유) — 별도 모델
- **SupplierContract** (이 설계): SupplierCompany와 구매자 간 계약 — 신규
- 3개 모두 독립. 기존 Supplier.supplier_id FK들 영향 없음.

### Conflict 2: 기존 SupplierBrand N:M
- 기존 SupplierBrand: Brand가 관리하는 거래처 연결 (기존 용도)
- SupplierContract: Supplier Admin이 관리하는 계약 (신규 용도)
- 별개 목적. 둘 다 유지.

### Conflict 3: Directory에서 계약 전 상품 가격 노출
- 가격은 공개 (공급업체가 상품 등록 시 결정)
- 발주는 계약 후에만 가능 (SupplierContract.status = 'active')
- Directory에서는 보기만, 주문은 불가

### Conflict 4: 한 공급업체에 동일 고객 중복 계약
- UNIQUE 제약 없음 — 비즈니스 로직으로 방지
- 신청 시: status가 'requested' 또는 'active'인 기존 계약 있으면 차단
- rejected/terminated 건은 무시 → 재신청 가능

---

## 8. Email Notifications

| Event | Recipient | Content |
|-------|-----------|---------|
| Contract requested | Supplier Admin | "{Customer}이 계약을 신청했습니다" |
| Contract approved | Requesting user | "{Supplier}이 계약을 승인했습니다. 이제 발주 가능합니다." |
| Contract rejected | Requesting user | "{Supplier}이 계약을 거절했습니다. 사유: {reason}" |
| Contract terminated (by supplier) | Customer | "{Supplier}이 계약을 종료했습니다." |
| Contract terminated (by customer) | Supplier Admin | "{Customer}이 계약을 종료했습니다." |

기존 sendNotification 패턴 사용. NOTIFICATION_CATEGORIES에 'supplier_contract' 추가.

---

## 9. Edge Cases

| Situation | Handling |
|-----------|---------|
| 같은 공급업체에 재신청 (이전 rejected) | 허용 — rejected 건 무시하고 새 신청 |
| 같은 공급업체에 재신청 (이전 terminated) | 허용 — terminated 건 무시하고 새 신청 |
| 공급업체가 is_public=false로 변경 | Directory에서 미노출, 기존 계약은 유지 |
| 공급업체 구독 만료 | 상품 비노출, 기존 계약은 유지 (구독 재개 시 복원) |
| Brand General이 신청 → 소속 Restaurant도 발주 가능? | Brand 계약은 Brand 전용. Restaurant는 별도 계약 필요. |
| Restaurant가 Brand 소속이고 Brand가 이미 같은 Supplier와 계약 | 별개 계약. 각 역할이 독립적으로 계약. |

---

## 10. Implementation Plan

### Phase 1: Contract Core
| # | Task |
|---|------|
| 1 | SupplierContract 모델 + SupplierCompany 프로필 필드 추가 + sync-database |
| 2 | routes/supplier-contracts.js (신청/승인/거절/종료/고객 관리) |
| 3 | routes/supplier-directory.js (검색/프로필/상품 카탈로그) |
| 4 | SupplierDirectoryPage + SupplierProfilePage (구매자) |
| 5 | MySuppliersPage (구매자 — 계약 목록) |
| 6 | ContractRequestsPage (공급업체 — 신청 목록 + 승인/거절) |
| 7 | 사이드바 메뉴 추가 (구매자 3역할 + Supplier Admin) |
| 8 | App.tsx 라우트 + ProtectedRoute + AuthContext |

### Phase 2: Customer Management + Polish
| # | Task |
|---|------|
| 9 | CustomersPage (공급업체 — 고객 목록 + 결제 조건) |
| 10 | Customer Detail (결제 조건 AutoSaveField 수정) |
| 11 | 이메일 알림 5종 |
| 12 | Supplier Admin 대시보드에 "Pending Requests" 알림 카드 |

---

## 11. Verification Results (2026-04-07)

### 수정 반영

| # | 원래 설계 | 수정 |
|---|----------|------|
| 1 | UNIQUE(supplier_company_id, customer_type, customer_id) 제약 | **제거** — 비즈니스 로직으로 중복 방지 (rejected/terminated 후 재신청 허용) |
| 2 | Profile 버튼: 3가지 상태만 | rejected/terminated 후 **[Request Again]** 버튼 추가 |
| 3 | Contract Requests 탭: Pending+Active+Rejected+Terminated | **Pending+Rejected만** (Active/Terminated는 Customers 페이지에서 관리) |

### 기존 코드 충돌 없음 확인
- suppliers.js ↔ supplier-contracts.js: 경로 완전 분리
- SupplierBrand ↔ SupplierContract: 목적 다름 (데이터 관계 vs 비즈니스 계약)
- SuppliersPage ↔ MySuppliersPage: 데이터 소스 다름 (Supplier vs SupplierContract)
- MainLayout 구매자 Procurement 섹션: 독립 추가, 기존 메뉴 영향 없음

### 중복 개발 없음 확인
- Directory 검색: Op.or 패턴 재사용
- 알림: sendNotification 재사용
- 업로드: /api/upload/files 재사용
- 필터: FilterComponents 재사용
- AutoSaveField: 결제 조건 수정에 재사용
- 넘버링: HardwareQuote 패턴 참고 (공통 유틸 아닌 개별 구현 — 현상 유지)
