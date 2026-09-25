# Design 2: Supplier Contract System

> **Created:** 2026-04-07
> **Status:** Design Confirmed (verified 2026-04-07)
> **Scale:** Medium-Large
> **Dependency:** Design 1 (Seller Product & Inventory System)
> **Parent:** Supply Chain System (docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md)
> **Sibling (2026-05-04):** [BG_FG_TRADE_BILLING.md](./BG_FG_TRADE_BILLING.md) — same `payment_terms` JSON shape extended to Brand/Foodcourt → Restaurant trade billing. `utils/paymentTerms.js` shared validator/builder.

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

---

# 📌 Sprint 2 Implementation Spec (2026-04-26 — /기능설계)

> Sprint 1 (Design 1) 완료 후 진입. Irene 결정사항 반영 + 자율 검증 후 작성.

## A. 확정 결정사항

1. **활성 계약 1건 원칙**: 한 (supplier_company_id, entity_type, entity_id) 쌍에 대해 status='active' 인 SupplierContract 최대 1건. 어플리케이션 레벨 검증 (POST 시 활성 contract 존재 시 400).
2. **신규 모듈 등록**: `buyer_supplier_directory`, `buyer_supplier_contracts` (target_user_type='all'). 기존 `brand_suppliers` 와 충돌 회피 (그건 legacy 거래처 메뉴).
3. **양방향 종료 + 사유 필수**: `terminated_by` ENUM('buyer','supplier','system')으로 누가 종료했는지 추적.
4. **Buyer 폴리모픽**: `entity_type` ENUM('restaurant','brand','foodcourt') + `entity_id`. Sprint 1 Contract 패턴 미러.
5. **Payment Terms JSON**: 승인 시 설정. `{ terms, invoice_cycle, payment_due_day, credit_limit, currency, notes }`.

## B. API 엔드포인트 (Stage 2)

### B-1. Buyer Side (`routes/supplier-directory.js` 신규)

`authenticateToken + requireBuyerRole` (Restaurant Admin / Restaurant Owner / Brand General / Brand Manager / Foodcourt General / Foodcourt Manager / System Admin).

| # | METHOD 경로 | 역할 | Body | 응답 | 비고 |
|---|------------|------|------|------|------|
| 1 | `GET /api/supplier-directory` | Buyer | query: `?category_id=&country=&state=&search=&page=&limit=` | paginated cards | active SupplierCompany 만 |
| 2 | `GET /api/supplier-directory/:supplierCompanyId` | Buyer | - | 프로필 + 카탈로그 + my_contract_status | catalog products = is_active 만 |
| 3 | `GET /api/supplier-contracts` | Buyer | query: `?status=&supplier_id=&page=` | 자기 계약 리스트 | entity_type/id 자동 매칭 |
| 4 | `GET /api/supplier-contracts/:contractId` | Buyer | - | 계약 상세 | IDOR 방어 |
| 5 | `POST /api/supplier-contracts` | Buyer | `{ supplier_company_id, message? }` | 201 + 계약 row | 활성 1건 검증, sanitize, Inbox 알림 |
| 6 | `POST /api/supplier-contracts/:contractId/terminate` | Buyer | `{ reason }` | 200 | status='active' + 본인이 buyer 검증 |

### B-2. Supplier Side (`routes/supplier.js` 확장)

`authenticateToken + requireSupplierScope`.

| # | METHOD 경로 | Body | 응답 | 비고 |
|---|------------|------|------|------|
| 7 | `GET /api/supplier/contracts` | query: `?status=&page=` | paginated | requireSupplierModule('supplier_contracts') |
| 8 | `GET /api/supplier/contracts/:contractId` | - | 단건 | IDOR (내 supplier_company_id 일치) |
| 9 | `POST /api/supplier/contracts/:contractId/approve` | `{ payment_terms: {...} }` | 200 | status='requested' 검증 |
| 10 | `POST /api/supplier/contracts/:contractId/reject` | `{ reason }` | 200 | reason 필수 |
| 11 | `POST /api/supplier/contracts/:contractId/terminate` | `{ reason }` | 200 | status='active' 검증 |
| 12 | `PUT /api/supplier/contracts/:contractId/payment-terms` | `{ payment_terms }` | 200 | status='active' 만 가능 |
| 13 | `GET /api/supplier/customers` | query: `?status=&search=` | active 계약 + buyer 정보 + payment_terms 요약 | requireSupplierModule('supplier_customers') |

**총 13 endpoints.**

### B-3. 신규 미들웨어

`middleware/buyerScope.js`:
- `requireBuyerRole` — 위 buyer 역할 7종 통과
- `resolveBuyerEntity(req)` 헬퍼: 역할 기반 (entity_type, entity_id) 도출
  - Restaurant Admin/Owner: `('restaurant', user.restaurant_id)`
  - Brand General/Manager: `('brand', user.brand_id)`
  - Foodcourt General/Manager: `('foodcourt', user.foodcourt_id)`
  - System Admin: 옵션 query param 으로 override

## C. DB 스키마 (Stage 3)

### C-1. 신규 테이블 1개

```sql
CREATE TABLE supplier_contracts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_company_id INT NOT NULL,
  entity_type ENUM('restaurant','brand','foodcourt') NOT NULL,
  entity_id INT NOT NULL,

  status ENUM('requested','active','rejected','terminated') NOT NULL DEFAULT 'requested',

  -- Request
  requested_by_user_id INT NOT NULL,
  request_message TEXT,
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- Approval
  approved_by_user_id INT NULL,
  approved_at DATETIME NULL,
  payment_terms JSON COMMENT 'Set on approval, editable later',

  -- Reject
  rejected_by_user_id INT NULL,
  rejected_at DATETIME NULL,
  rejection_reason TEXT,

  -- Terminate
  terminated_by ENUM('buyer','supplier','system') NULL,
  terminated_by_user_id INT NULL,
  terminated_at DATETIME NULL,
  termination_reason TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,

  FOREIGN KEY (supplier_company_id) REFERENCES supplier_companies(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by_user_id) REFERENCES users(id),
  FOREIGN KEY (approved_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (rejected_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (terminated_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_supplier (supplier_company_id),
  INDEX idx_supplier_status (supplier_company_id, status),
  INDEX idx_buyer (entity_type, entity_id),
  INDEX idx_buyer_status (entity_type, entity_id, status),
  INDEX idx_status (status)
);
```

### C-2. Sequelize 모델 + Association

`models/SupplierContract.js` 신규.

`models/index.js` 추가:
```javascript
SupplierContract.belongsTo(SupplierCompany, { foreignKey: 'supplier_company_id', as: 'supplierCompany' });
SupplierCompany.hasMany(SupplierContract, { foreignKey: 'supplier_company_id', as: 'contracts' });
SupplierContract.belongsTo(User, { foreignKey: 'requested_by_user_id', as: 'requestedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'approved_by_user_id', as: 'approvedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'rejected_by_user_id', as: 'rejectedBy' });
SupplierContract.belongsTo(User, { foreignKey: 'terminated_by_user_id', as: 'terminatedBy' });
// Polymorphic buyer 관계는 컬럼 직접 조회 (entity_type / entity_id)
```

### C-3. AddonModule + Plan 시드 추가

```js
const NEW_MODULES = [
  { module_code: 'buyer_supplier_directory', name: 'Supplier Directory', category: 'basic', target_user_type: 'all' },
  { module_code: 'buyer_supplier_contracts', name: 'Supplier Contracts', category: 'basic', target_user_type: 'all' }
];
```

기존 buyer 플랜 (Restaurant basic / Brand basic / Foodcourt basic 모두) 에 자동 포함 (basic 모듈은 모든 플랜 default 포함).

## D. UI 흐름 (Stage 4)

### D-1. 신규 페이지 4개 (Buyer side)

| 경로 | 컴포넌트 | 기능 |
|------|----------|------|
| `/pos/suppliers/directory` | `pages/SupplierDirectory/SupplierDirectoryPage.tsx` | 공급업체 검색/카드 그리드 + 필터 |
| `/pos/suppliers/directory/:supplierId` | `pages/SupplierDirectory/SupplierProfilePage.tsx` | 프로필 + 상품 카탈로그 + Request 버튼 |
| `/pos/suppliers/contracts` | `pages/SupplierDirectory/MySuppliersPage.tsx` | 자기 계약 리스트 |
| `/pos/suppliers/contracts/:contractId` | `pages/SupplierDirectory/ContractDetailPage.tsx` (또는 모달) | 계약 상세 + Terminate |

### D-2. 페이지 2개 (Supplier side, 기존 placeholder 교체)

| 경로 | 컴포넌트 | 기능 |
|------|----------|------|
| `/pos/supplier/contracts` | `pages/Supplier/SupplierContractsPage.tsx` (REPLACE) | Pending/Active 탭 + Approve/Reject 모달 |
| `/pos/supplier/customers` | `pages/Supplier/SupplierCustomersPage.tsx` (REPLACE) | 활성 buyer 리스트 + payment_terms 표시 + 편집 |

### D-3. 사이드바 추가

**Restaurant Admin 사이드바:**
- `Find Suppliers` → `/pos/suppliers/directory`
- `My Suppliers` → `/pos/suppliers/contracts`

**Brand General / Foodcourt General 사이드바:**
- 동일 2개 항목 추가

**Supplier Admin:**
- 기존 placeholder "Customers" / "Contracts" → 활성화 (disabled 제거)

### D-4. 모달 / Form

- **Request Contract 모달**: message textarea + 신청자 정보 미리보기 + Send
- **Approve 모달**: Payment Terms (terms / invoice_cycle / payment_due_day / credit_limit / currency / notes) → POST + 알림
- **Reject 모달**: reason textarea (required) → POST
- **Terminate 모달**: reason textarea (required) → POST

### D-5. i18n 4 언어

신규 namespace: `supplierDirectory.json` (en/ko/zh/ms) + 기존 `supplier.json` 확장 (`contracts.*`, `customers.*`)

### D-6. 알림 (이메일 + Inbox)

`utils/notificationTemplates.js` 신규 4 templates:
- `supplierContractRequested` (to Supplier)
- `supplierContractApproved` (to Buyer)
- `supplierContractRejected` (to Buyer)
- `supplierContractTerminated` (to opposite party)

`NOTIFICATION_CATEGORIES` 신규: `supplier_contract`

## E. 구현 순서 (Stage 5)

| Phase | 작업 | 예상 |
|-------|------|------|
| 5A | Migration 스크립트 + supplier_contracts 테이블 + 모듈 시드 | 10분 |
| 5B | SupplierContract 모델 + association | 10분 |
| 5C | requireBuyerRole 미들웨어 + 헬퍼 | 10분 |
| 5D | Backend 라우트 (supplier-directory.js + supplier.js 확장) | 30분 |
| 5E | server.js 마운트 | 5분 |
| 5F | 알림 템플릿 + NOTIFICATION_CATEGORIES | 10분 |
| 5G | Frontend 6 페이지 (병렬 agent) | 60분 |
| 5H | 사이드바 + AuthContext + App.tsx 확장 | 20분 |
| 5I | i18n 4 언어 (병렬 agent) | 15분 |

## F. 검증 (Stage 6)

### F-1. test-supplier-contract.js

```
1. Restaurant Admin 로그인 → /supplier-directory 검색 → 공급업체 N건 확인
2. Profile 조회 → 카탈로그 N건 + my_contract_status='none' 확인
3. POST /supplier-contracts → status='requested' + 알림 발송
4. 동일 (supplier, buyer) 활성 계약 시도 → 400 (활성 1건 원칙)
5. Supplier 로그인 → /supplier/contracts → 신청 1건 확인
6. POST /supplier/contracts/:id/approve { payment_terms } → status='active'
7. Buyer Profile 재조회 → my_contract_status='active' 확인
8. PUT /supplier/contracts/:id/payment-terms → 200 (수정)
9. Buyer POST /supplier-contracts/:id/terminate { reason } → status='terminated'
10. Buyer 재신청 (POST) → 새 row 201 (이전 terminated 와 별개)
11. Supplier reject → status='rejected'
12. IDOR: 다른 buyer 의 계약 GET → 404
13. IDOR: 다른 supplier 의 계약 approve → 403/404
14. Anon → 401
```

### F-2. health-check 확장 (43 → 49)

- `Anon /supplier-directory → 401`
- `Buyer /supplier-directory → 200`
- `Supplier /supplier/contracts → 200`
- `IDOR: cross-supplier approve → 404`
- `Approve invalid status → 400`

### F-3. UI 검증
- 4 언어 + 빈 상태 + 로딩 + 반응형 + 회귀


---

## G. 구매자별 공급업체 활성/비활성 (2026-09-11 · Fable 절단면 · Irene 요청)

> Irene: 「브랜드에서 넣어준 공급업체여도 사용 안하는 경우 비활성 가능하게 해주고 공급업체 활성/비활성 기능 넣어줘.」

### G-1. 실측 (dev)
- 「활성」을 표현하는 자리가 이미 셋: `supplier_companies.status`(회사 행 1칸·전역) · `supplier_contracts.status`(**구매자별**) · `ingredient_seller_products.is_active`(매핑별).
- 발주 가능 판정의 단일 소스 `utils/supplierAccess.js findEffectiveContract`: ①구매자 자기 active 계약 → ②없으면 **외부 공급업체에 한해** 부모 브랜드 active 계약 상속.
- 매장이 브랜드가 넣어준 외부 공급업체를 끄는 칸·표·라우트는 **없다.** 외부 공급업체 «삭제»는 회사 행 `status='inactive'`(등록자만) — 브랜드가 지우면 전 매장이 잃는다.

### G-2. 결정 — 새 표·새 칸·새 ENUM 없음
**활성/비활성 = 그 구매자의 `supplier_contracts` 행 상태.** 구매자×공급업체 관계를 담는 표는 이미 이것 하나다(CLAUDE.md 「기존 개념에 새 목록을 만들지 않는다」).

| 공급업체 | 끄기 | 켜기 |
|---|---|---|
| 가입 공급업체 | 기존 `POST /supplier-contracts/:id/terminate` | 기존 계약 요청(공급업체 승인 필요) — 화면 문구만 「다시 요청」 |
| 내가 등록한 외부 | 내 자동계약 행 `status='terminated'`, `terminated_by='buyer'` | 같은 행 `status='active'` |
| **브랜드가 넣어준 외부(상속)** | 내 행이 없으므로 **내 행을 만들어** `terminated`/`buyer` 로 둔다 — 상속을 막는 스위치 | 브랜드 계약이 아직 active 면 **내 행을 지워 상속으로 돌아간다**(브랜드 결제조건을 그대로 다시 받기 위해). 브랜드 계약이 없으면 `active` 로 |

- `findEffectiveContract` 규칙 1줄 추가: **자기 행이 있으면(어떤 status 든) 자기 행이 답이다. 상속은 자기 행이 아예 없을 때만.** 지금은 자기 행이 active 가 아니면 상속으로 떨어진다 — 그래서 끌 수 없었다.
- 회사 행 `supplier_companies.status` 는 손대지 않는다(삭제는 삭제, 비활성은 관계). 매핑 `is_active` 도 무변경.
- 브랜드가 자기 외부 공급업체를 끄면(브랜드 행 terminated) 상속이 끊겨 전 매장에서 사라진다 — 기존 동작, 브랜드의 권리.

### G-3. API
- `PUT /api/external-suppliers/:id/active` `{ is_active: boolean }` — 권한은 **볼 수 있는 구매자**(자기 등록 ∪ 부모 브랜드 등록). 지금의 `loadOwnedExternalSupplier`(등록자만)로는 상속분을 못 끄므로 조회 스코프(`GET /external-suppliers` 의 scopes)와 같은 판정을 쓴다.
- `GET /api/external-suppliers` 응답에 `is_active_for_me`(자기 행 기준, 행 없으면 상속 = true) 추가. 꺼진 것도 목록에 남긴다(다시 켜야 하니까).
- 발주 판매자 선택·발주 생성은 `findEffectiveContract` 를 이미 쓰므로 **무변경으로 따라온다** — 팀원이 판매자 목록 API 가 이 함수를 쓰는지 1회 확인.

### G-4. 화면
- RA 공급업체 화면(팀원이 RA 가 외부 공급업체를 보는 실제 페이지를 확인해 그 한 곳): 행마다 **활성/비활성 토글**, 브랜드 제공 행은 「브랜드 제공」 표시 + 「이 매장에서만 꺼집니다」 문구. 꺼진 행은 회색. 가입 공급업체 행은 기존 종료/요청 버튼이 그 토글이다(새 버튼 없음).
- BG 공급업체 화면: 자기 외부 공급업체 토글(브랜드 행). 끄면 「전 매장에서 사라집니다」 확인창.
- i18n 4언어.

### G-5. 게이트
health-check `supplier` 3건: ①매장이 상속 외부 공급업체를 끄면 `findEffectiveContract` null → 발주 생성 400 `NO_ACTIVE_CONTRACT` ②다시 켜면 자기 행 0 + 상속 복귀 + 발주 생성 200 ③같은 브랜드의 다른 매장은 영향 0. 고장주입 1(「자기 행이 있으면 자기 행」 검사 제거 → ① 실패).
**묶음: 「K-DINE 레시피 원가 정합」 묶음과 별도**(파일 안 겹침). RA 다 끝난 뒤 BG 인보이스 Pay 사안과 함께 가도 된다.

## §H. 브랜드 공급업체는 «원할 때만 공유» — `shared_with_stores` (2026-09-22 · SW 5.51)

Irene 원문: 「공급업체는 브랜드제너럴에서 브랜드에 공유해주고 싶으면 해주고 대신 수정 등록 모두 독립적으로 각각 운영하는 거야」.
- §G 의 «브랜드 등록 외부 업체 = 산하 매장 자동 상속» 에 문을 하나 달았다: `supplier_companies.shared_with_stores` (기본 1).
  - **기존 행은 전부 1** — 매장이 지금 쓰는 상속 발주가 끊기지 않게(운영 54행 전부 1 확인).
  - **BG 가 새로 등록·예전 방식(OWN)에서 이관하는 업체는 0** → 매장 목록·발주 자격·켜기/끄기 어디에도 안 나온다.
- 상속 판정 3곳이 이 칸을 본다: `utils/supplierAccess.findEffectiveContract` · `GET /api/external-suppliers`(브랜드 scope) · `loadVisibleExternalSupplier`. 고장주입: 첫 번째 확인 제거 → 비공유 업체에 매장 발주 자격 true.
- 예전 방식 `suppliers`(OWN) → 외부 업체 연결 단일 소스 `utils/legacySupplierBridge` (Products 버튼 = 이관 스크립트 `migrate-legacy-suppliers-to-external.js`, deploy·멱등). BG 가 만든 행(brand_id=null)은 그 BG 계정 소유. 운영 이관: 매장·FC 3건(5.50) + BG 2건(5.51, 비공유).
- ⏸ **2단계 (Fable 판정 대기)**: «매장에 공유» 버튼 = **복사본**을 만들어 주고 이후 각자 독립 수정. 이미 공유(1) 중인 업체의 정리 방침.

### §H-2. 2단계 확정 — «매장에 공유» = 복사본 · 브랜드 → 매장 상속 종료 (2026-09-24 · Fable 판정 1~3회차 · SW 5.60 · **운영 배포 2026-09-24 21:38Z**)

> 운영 결과: 사본 23(꺼진 채 2) · 안 만듦 6 · 실패 0 · 연결 301 · 발주 31 · 청구서 20 · 원가이력 20 · S-SUP-004 0. **매장 연결이 가리키는 지워진(soft delete) 원본 상품은 사본에도 지워진 채 복사**한다(Fable 게이트 판정 2 — New Seoul Mart 4건). 상품 행 자체가 없는 연결만 `UNMAPPED_LINKS` 로 막는다(`findUnmappedLinks`/`findDeletedLinkedProducts`).

Irene 원문: 「공급업체는 브랜드제너럴에서 브랜드에 공유해주고 싶으면 해주고 대신 수정 등록 모두 독립적으로 각각 운영하는 거야」 · 「전체 구조 문제 만들지 않고 제대로 보완하고 구현해. 그리고 다시 말하지만 공급업체를 관리하는 건 브랜드라고 해도 서로 연동하지 않아.」

- **공유 = 복사본.** 브랜드가 고른 산하 매장마다 매장 소유 업체 행 + 상품 전체(비활성 포함, 분류 매핑) + 매장 계약 1행을 만든다. 이후 **서로 영향 없음** — 브랜드가 가격·연락처를 바꿔도 매장 사본에 안 퍼지고, 매장이 고친 것도 돌아오지 않는다. 재공유는 갱신이 아니라 `already_shared`.
  - 단일 함수 `utils/supplierShare.copySupplierToStore` — 라우트와 이전 마이그가 같이 쓴다. `code`·`shop_slug` 는 null(고유 칸).
  - 출처 칸 `supplier_companies.copied_from_supplier_company_id/copied_at/copied_by_user_id` · `supplier_products.copied_from_supplier_product_id` — **추적용, 동기화 아님.**
  - 살아 있는 사본은 (매장, 원본)당 하나 — 생성 칸 `copy_live_key` + `UNIQUE(registered_by_entity_type, registered_by_entity_id, copy_live_key)`(지운 사본은 NULL 이라 재공유 가능). ⚠ 모델에 없는 칸이라 `sync-database.js --alter` 금지.
  - 옵션 그룹이 있는 업체는 복사하지 않고 `OPTIONS_NOT_COPIED`(조용한 누락 없음).
- **API** (브랜드 계정만, 매장 소속은 서버가 `restaurants.brand_id` 로 확인): `GET /api/external-suppliers/:id/shares` · `POST /api/external-suppliers/:id/share { restaurant_ids }` → 매장별 `created | already_shared | forbidden | error`.
- **상속 종료**: `utils/supplierAccess.findEffectiveContract` 의 브랜드 상속 분기 제거 — «부모 계약 조회» 자리(`findParentContract`, 지금 null)는 남긴다(Fable «오너=슈퍼바이저» 판정: 다음 사안에서 오너 부모를 끼움). `GET /api/external-suppliers` · `loadVisibleExternalSupplier` · 켜기/끄기는 **자기가 등록한 업체만.** `shared_with_stores` 는 더 이상 읽지 않는 칸(이전 완료 표시) — 다음 정리에서 드롭.
- **사본을 만들 때 같은 트랜잭션에서 옮기는 것**(그 매장 것만): 매장 재료·상품 연결(ISP, 행 id 유지 → 발주 줄 안 깨짐) · 매장 발주 헤더 `seller_entity_id`(상태 무관) · **매장이 지불자인 거래 청구서 `issuer_id`**(금액·상태·결제 기록 무접촉 — Fable 3회차: 청구서가 발행자 id 를 직접 든다, `purchaseOrderService.js:221`) · 매장 범위 원가 변경 이력. **무접촉**: 브랜드 재고아이템 연결·브랜드 발주·브랜드 지불 청구서·레거시 `suppliers`·고아 연결.
- **이전 마이그** `scripts/migrate-share-brand-suppliers-to-stores.js`(registry deploy, `--dry-run`): 공유(1) 브랜드 업체 × 산하 매장마다 «쓴 매장»에만 사본 — 매장 발주 ≥1 · 매장 연결 ≥1 · 마지막 자기 켜기 active. 이력이 있는데 매장이 꺼 두었으면 **꺼진 사본**. 이력 없고 켜 둔 적 없으면 만들지 않음(브랜드가 «매장에 공유» 로 복구). 실패가 있으면 그 업체는 공유(1) 로 남기고 종료 코드 1.
  - 운영 예상(2026-09-24 실측): 공유 29곳(브랜드 1 · 매장 10 하나) → 사본 **23**(꺼진 채 2: JASMINE·UGS) · 안 만듦 6(KK Mart·Village Grocer·Kraft Nation·Hero Market·Mr. DIY·GIT Consult) · 매장 청구서 20건(미납 9·완납 11, RM 4,745.47) 발행자 이전 · 고아 연결 1 무접촉.
- **영구 안전망**: 인스펙션 `S-SUP-004`(발주 ↔ 거래 청구서 발행자 일치 — `ISSUER_MISMATCH_SQL` 하나를 복사 함수 사후 확인과 공유) · health-check security «브랜드 공급업체 공유».
- **브랜드 재료의 매장 발주 경로 종료**: 매장이 브랜드 소유 재료를 브랜드 계약(상속)으로 발주하던 길은 닫혔다 — Irene 「서로 연동하지 않아」. 매장은 자기 업체(사본)에서 연결해야 한다. 매장이 브랜드 재료에 연결을 못 다는 `writableIngredient` 제약은 이 사안에서 풀지 않는다(풀면 새 경로 — 필요 시 별도 사안). 운영 실사용 0(브랜드 재료 연결 0).
- 다음(별건, Fable 판정): **오너 공급업체 = 상속**(오너가 넣은 업체를 소유 매장이 같이 씀) — `findParentContract` 자리에 부모 owner.


### §H-3. 오너 공급업체 = 상속 · 오너 발주 전체 표 (2026-09-24 · Fable «오너=슈퍼바이저» 판정 §1-A·§2-B · SW 5.62 · 개발)

Irene 원문: 「오너가 공급업체를 같이 관리하면 레스토랑마다 같은 공급업체 있어도 다 여러 개 나오잖아. … 오너가 넣는 공급업체만 레스토랑들이 동기화되는 건 어때? … 오너는 슈퍼바이저 같은 거지. 브랜드 회사랑은 다르고 자기 가게들이니까.」 → 「마저 해」

- **브랜드 = 복사(§H-2), 오너 = 상속.** 브랜드는 남의 회사라 건네주고 각자 운영, 오너는 같은 사람이라 **업체 한 행을 소유 매장들이 같이 쓴다.**
- **등록자·계약 주체 `owner`**: `supplier_companies.registered_by_entity_type` · `supplier_contracts.entity_type` 에 `'owner'`(expand-only, `scripts/migrate-owner-supplier-enum.js`, deploy). `entity_id` = 오너 계정 `users.id`. `purchase_orders.entity_type` 은 그대로 — **발주 주인은 항상 매장.**
- **구매자 실체** (`middleware/buyerScope.js`): 소속 매장 없는 오너(`restaurant_id` null)가 매장 지정 없이 부르면
  - `/api/external-suppliers*` · `GET /api/supplier-directory/:id` → `{ type:'owner', id:user.id }` (등록·수정·상품·끄기·삭제)
  - `GET /api/purchase-orders`(목록만) → 소유 매장 전체(`req.buyerOwnerRestaurantIds`, `?restaurant_id=` 는 그 안에서만 좁힘) · 행마다 `restaurant_name`
  - 그 밖의 구매자 라우트(발주 작성·수령·재료 연결·계약·재고)는 오너 실체를 받지 않는다 → 403(fail-closed). 상세·인쇄는 기존 매장 전환(`?entity_type=restaurant&entity_id=N`, GET 만)으로.
- **상속 판정** (`utils/supplierAccess.js`): `findEffectiveContract` 2단계 `findParentContract` — 매장 구매자 · 업체가 오너 등록 외부 업체(가입 공급업체는 상속 안 함) · 그 업체 등록 오너가 이 매장 `restaurant_managers(ownership)` · 오너 계약 active. 매장이 자기 행(끄기 = terminated)을 가지면 1단계에서 이미 결정.
  - 목록·카탈로그는 `inheritedOwnerSupplierIds(restaurantId)` 한 곳에서 같은 조건으로 뽑는다.
- **매장 쪽**: 목록에 `scope:'owner'`(«오너 등록» 카드) · 상품 **보기**만(`GET /external-suppliers/:id/products`) · 발주·재료 연결 가능 · **이 매장만 끄기**(자기 terminated 행) · **다시 켜기 = 자기 행 삭제**(오너 설정을 다시 따름 — 자기 active 행이 남으면 오너가 끄거나 지워도 그 매장만 계속 발주하게 된다). 수정·상품 등록·삭제는 403.
- **오너 삭제**: 업체 inactive + 그 업체의 **모든** active 계약 terminated(매장 쪽 포함). 이미 만든 발주는 남는다.
- **오너 끄기**: 오너 계약 terminated → 자기 행 없는 소유 매장 전부에서 빠진다.
- **원가 대조**: 매장이 대조해도 오너 업체 상품 정가는 안 바뀐다(`cost-reconciliation.js` `ownedExternal` — 등록자 ≠ 발주 구매자). 매장 원가는 매장 층에.
- **자동 병합 없음**(판정 §1-C): 매장이 이미 따로 넣은 같은 업체는 그대로 — 필요하면 매장이 옛 행을 끈다.
- **화면**: 오너 = `/pos/suppliers`(외부 업체만, 계약·찾기 탭 없음, 카드에 «매장 N곳 중 M곳이 사용») · 발주 목록 «내 매장 전체» 선택(기본)·행에 매장 이름·«내 공급업체» 버튼. 매장 = «오너 등록» 카드(상품 보기·끄기).
  - ⚠ 오너 사이드바 «공급업체» 메뉴는 아직 없다 — 사이드바가 🔒 인쇄 보호 파일(`MainLayout.tsx`)이라 Irene 승인·bless 뒤 한 줄. 그때까지 발주 화면의 «내 공급업체» 버튼으로 들어간다.
- **검증**: health-check security «오너 공급업체 — 소유 매장만 상속 …» (고장주입: 상속 보기 소유 확인 제거 → ✗).
