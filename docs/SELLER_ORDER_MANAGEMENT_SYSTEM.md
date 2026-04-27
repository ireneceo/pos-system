# Design 4: Seller Order Management & Trade Invoice

> **Created:** 2026-04-07
> **Status:** Design Confirmed (verified 2026-04-07)
> **Scale:** Large
> **Dependency:** Design 3 (Purchase Order & Receiving)
> **Parent:** Supply Chain System (docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md)

---

## 1. Purpose

판매자(SA, Brand, Foodcourt, Supplier)가 수신한 발주를 처리하고, 거래 인보이스를 발행한다. 구매자는 수신 인보이스를 확인하고 결제한다.

---

## 2. Current State

### 기존 활용

| 항목 | 위치 | 활용 |
|------|------|------|
| LiveOrders UI 패턴 | pages/LiveOrders/ | 주문 관리 UI 참고 (상태 탭, 통계 바, 실시간) |
| Invoice 모델 + CRUD | models/Invoice.js, routes/invoices.js | 거래 인보이스에 **기존 Invoice 모델 재사용** |
| InvoiceItem 모델 | models/InvoiceItem.js | PO 항목을 인보이스 항목으로 변환 |
| Invoice 넘버링 | invoices.js:39-82 | 기존 generateInvoiceNumber() 재사용 |
| Invoice 이메일 | invoices.js:2955-3095 | 기존 sendIssuerEmail 패턴 재사용 |
| Invoice 결제 흐름 | invoices.js:2477-2742 | submit-payment → confirm/reject 흐름 그대로 |
| NOTIFICATION_CATEGORIES | notification-settings.js | 신규 카테고리 추가 |
| Socket.IO /orders | LiveOrders | 참고만 (PO는 실시간 필수 아님) |

### 필요한 변경

| 항목 | 변경 |
|------|------|
| Invoice.issuer_type ENUM | 'supplier' 추가 |
| Invoice.payer_type ENUM | 변경 없음 ('brand_manager', 'foodcourt_manager', 'restaurant' 이미 있음) |
| InvoiceCategory | 'trade' 카테고리 추가 |
| NOTIFICATION_CATEGORIES | 'trade_invoice_created', 'trade_invoice_paid' 추가 |

---

## 3. 역할별 주문 관리 특성

| | System Admin | Brand General | Foodcourt General | Supplier |
|--|:-----------:|:------------:|:-----------------:|:--------:|
| **고객** | 전체 자동 | 자기 브랜드 자동 | 자기 입점 자동 | 계약 고객 |
| **상품 성격** | 장비+소모품 | 식자재+원재료 | 식자재+소모품 | 전문 공급 |
| **주문 빈도** | 낮음 (비정기) | 중간 (주 1-2회) | 중간 (주 1-2회) | 높음 (매일) |
| **결제 조건** | 주문별 즉시 | 브랜드 정책 | 푸드코트 정책 | 고객별 개별 설정 |
| **인보이스 주기** | 즉시 | 즉시 or 월 SOA | 즉시 or 월 SOA | 고객별 (Immediate/Monthly SOA) |
| **배송 추적** | O (장비 배송) | X (내부 분배) | X (내부 분배) | O (외부 배송) |

### 결제 조건 설정 주체

| 판매자 | 결제 조건 설정 |
|--------|:----------:|
| System Admin | SA가 전역 설정 (기본: Immediate) |
| Brand General | Brand가 브랜드 정책으로 설정 (전 레스토랑 동일) |
| Foodcourt General | Foodcourt가 정책 설정 (전 입점 동일) |
| Supplier | 고객별 개별 설정 (SupplierContract.payment_terms/invoice_cycle — 설계 2) |

---

## 4. PO 상태 전환 (판매자 측)

설계 3에서 구매자가 PO를 Submitted하면, 판매자가 나머지를 처리:

```
[구매자]                    [판매자]
Draft → Submitted ───────→  New Order 수신
                             │
                             ├─ [Confirm] → Confirmed (출고 준비)
                             │
                             ├─ [Ship] → Shipped (배송 시작)
                             │              + tracking info (optional)
                             │
                             ├─ [구매자 Receive] → Received
                             │    → 인보이스 자동 발행 트리거
                             │
                             └─ [Reject/Cancel] → Cancelled
                                  + 사유 입력
```

**인보이스 발행 시점:** PO status가 'received'로 변경될 때 자동 발행.
- 구매자가 [Receive]하면 → purchaseOrderService에서 invoice 자동 생성
- 판매자가 수동으로 발행하는 게 아님

---

## 5. Trade Invoice 구조

### 5-1. 기존 Invoice 모델 재사용

**새 모델 생성 안 함.** 기존 Invoice + InvoiceItem 그대로 사용.

```
Invoice 생성 시:
  type: 'automatic' (PO 기반 자동)
  invoice_category: 'trade'
  category_display_name: 'Purchase Order'

  issuer_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin'
  issuer_id: seller_entity_id

  payer_type: 결정 로직 →
    구매자가 Restaurant → 'restaurant'
    구매자가 Brand → 'brand_manager'
    구매자가 Foodcourt → 'foodcourt_manager'
  payer_id: buyer_id

  restaurant_id: 구매자가 Restaurant이면 restaurant.id, 아니면 null

  currency: PO의 currency
  total_amount: PO의 total_amount
  due_date: 결제 조건에 따라 계산
    Immediate → 발행일 + 7일
    Monthly SOA → 익월 payment_due_day

  notes: "Purchase Order: PO-260407001"
  custom_description: "Supply order delivery"
```

**InvoiceItem 생성 (PO 항목 기반):**
```
PO의 각 PurchaseOrderItem → InvoiceItem:
  item_type: 'product'
  description: "{product_name} × {quantity} {unit}"
  calculation_method: 'fixed'
  fixed_amount: total_price (quantity × unit_price)
  calculated_amount: total_price
  tax_rate: 0 (기본, 설정에 따라)
  tax_amount: 0
  total_amount: total_price
```

### 5-2. Invoice 넘버링

기존 패턴 확장:
```
System Admin:  INV-YYMMDDNNN     (기존)
Brand:         INV-BR{id}YYMMDDNNN  (기존)
Foodcourt:     INV-FC{id}YYMMDDNNN  (기존)
Supplier:      INV-SP{id}YYMMDDNNN  (신규)
```

기존 `generateInvoiceNumber(issuerType, issuerId)` 함수에 'supplier' 분기 추가.

### 5-3. Invoice.issuer_type ENUM 변경

```
기존: 'system_admin' | 'brand' | 'foodcourt'
변경: 'system_admin' | 'brand' | 'foodcourt' | 'supplier'
```

이 1개 ENUM 변경이 기존 Invoice 시스템에 영향:
- 기존 쿼리: `WHERE issuer_type = 'system_admin'` → 'supplier' 반환 안 함 → **영향 없음**
- 기존 인보이스 목록 페이지: issuer_type별 필터링 → 'supplier' 추가 시 Supplier 인보이스도 표시 가능
- **주의:** 기존 BrandInvoicesPage 등에서 issuer_type 필터링이 정확한지 확인 필요

---

## 6. SOA (Statement of Account)

### 6-1. SOA = 별도 모델 아님

SOA는 **기존 Invoice 테이블의 필터링 뷰 + 이메일 안내**:

```
SOA 조회 API:
  GET /api/invoices/soa?issuer_type=supplier&issuer_id=5&customer_type=restaurant&customer_id=10&month=2026-04

  → WHERE:
    issuer_type = 'supplier'
    issuer_id = 5
    (payer_type = 'restaurant' AND restaurant_id = 10)
    invoice_category = 'trade'
    status IN ('pending_payment', 'payment_submitted', 'overdue')
    billing_period 또는 issued_at이 2026-04 범위

  → 반환:
    {
      period: "2026-04",
      customer: "Kim's Cafe",
      invoices: [...미결 인보이스 목록],
      total_outstanding: 2450.00,
      due_date: "2026-05-15",
      currency: "MYR"
    }
```

### 6-2. SOA 월말 자동 발송

```
invoiceScheduler에 cron 추가 (매월 말일 또는 1일):
  → invoice_cycle = 'monthly_soa'인 SupplierContract 조회
  → 각 계약의 해당 월 미결 인보이스 집계
  → SOA 이메일 발송 (구매자에게)
  → 이메일 내용: 인보이스 목록 + 총 미결 금액 + 결제 링크
```

### 6-3. SOA 페이지 (구매자 측)

```
┌──────────────────────────────────────────────────────────────┐
│  Statement of Account                                         │
│  ABC Supplies — April 2026                                   │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Total Outstanding: RM 2,450.00                              │
│  Due Date: May 15, 2026                                      │
│  Payment Terms: Net 30                                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ □ Invoice       Date       PO           Amount  Status │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ ✓ INV-SP5260401 04/01  PO-260401001  RM 877.60  Due  │   │
│  │ ✓ INV-SP5260408 04/08  PO-260408002  RM 650.00  Due  │   │
│  │ ✓ INV-SP5260415 04/15  PO-260415001  RM 922.40  Due  │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Selected: 3 invoices  Total: RM 2,450.00                    │
│                                                               │
│  [Pay Selected]  [Pay All]                                    │
│                                                               │
│  ※ 개별 체크 → [Pay Selected] 선택 결제                        │
│  ※ [Pay All] 전체 일괄 결제                                    │
│  ※ 결제 흐름: 기존 Invoice 결제 흐름 재사용                      │
│    (submit-payment → confirm/reject)                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. 화면 설계

### 7-1. Seller Order Management (판매자 공통 — LiveOrders 참고)

```
┌──────────────────────────────────────────────────────────────┐
│  Order Management                                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [All] [New (3)] [Confirmed] [Shipped] [Delivered] [Cancelled]│
│                                                               │
│  Search: [________]  Customer: [All ▾]  Period: [This Month] │
│                                                               │
│  ── Stats Bar ──                                              │
│  New: 3 │ Processing: 5 │ This Month: RM 45,200 │ Avg: RM 890│
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ PO Number     Customer      Items  Amount  Status      │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ PO-260407001  Kim's Cafe    5      1,250   New        │   │
│  │               Restaurant    ordered 2h ago             │   │
│  │                              [Confirm] [Reject]        │   │
│  │                                                         │   │
│  │ PO-260406003  Seoul BBQ Br  8      2,100   Confirmed  │   │
│  │               Brand         confirmed yesterday        │   │
│  │                              [Ship]                     │   │
│  │                                                         │   │
│  │ PO-260405002  FC Central    3        680   Shipped     │   │
│  │               Foodcourt     shipped 04/06              │   │
│  │                              (awaiting delivery)        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**상태 탭 (PO status 기준):**

| Tab | PO Status | 판매자 Action |
|-----|-----------|:----------:|
| New | submitted | [Confirm] [Reject] |
| Confirmed | confirmed | [Ship] (SA/Supplier만) |
| Shipped | shipped | (구매자 수령 대기) |
| Delivered | received | (완료 — 인보이스 발행됨) |
| Cancelled | cancelled | (취소됨) |

**Brand/Foodcourt는 [Ship] 없음** (내부 분배이므로 Confirmed → 구매자가 바로 Receive 가능)

**Stats Bar:**

| 판매자 | 표시 항목 |
|--------|---------|
| 공통 | New orders, Processing (confirmed+shipped), This month revenue, Avg order |
| Supplier 추가 | Outstanding invoices, Credit used |

### 7-2. Order Detail (판매자)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Orders                                             │
│                                                               │
│  PO-260407001                              Status: New       │
│  Customer: Kim's Cafe (Restaurant)                            │
│  Ordered: 2026-04-07                                          │
│  Expected: 2026-04-09                                         │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Product          Qty    Unit   Price    Total          │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ Chicken Breast   35     kg     12.50    437.50        │   │
│  │ Salmon Fillet     8     kg     45.00    360.00        │   │
│  │ Soy Sauce         9     bottle  8.90     80.10        │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │                              Total      877.60        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Customer Notes: Fresh delivery preferred                     │
│                                                               │
│  (New)       [Confirm Order]  [Reject]                        │
│  (Confirmed) [Mark as Shipped]  (SA/Supplier만)               │
│  (Delivered) Invoice: INV-SP5260407 [View Invoice]            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 7-3. Trade Invoices 목록 (판매자 — 발행한 인보이스)

```
┌──────────────────────────────────────────────────────────────┐
│  Trade Invoices                                               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [All] [Pending] [Submitted] [Paid] [Overdue]                │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Invoice         Customer     PO           Amount Status│   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ INV-SP5260407   Kim's Cafe   PO-260407001 877.60 Pending│  │
│  │ INV-SP5260401   Kim's Cafe   PO-260401001 650.00 Paid  │   │
│  │ INV-SP5260408   Seoul BBQ    PO-260408002 2,100  Pending│  │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  ※ 기존 Invoice 목록 UI 패턴 재사용                             │
│  ※ 필터: invoice_category = 'trade' AND issuer_type/id = 나    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 7-4. Purchase Invoices (구매자 — 수신한 인보이스)

```
┌──────────────────────────────────────────────────────────────┐
│  Purchase Invoices                                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [All] [Pending] [Submitted] [Paid] [Overdue]                │
│                                                               │
│  Supplier: [All ▾]   Period: [This Month]                    │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Invoice         Supplier      PO          Amount Status│   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ INV-SP5260407   ABC Supplies  PO-260407001 877.60 Due │   │
│  │ INV-BR6260405   Seoul Brand   PO-260405001 450.00 Paid│   │
│  │ INV-260403001   Purple POS    PO-260403001 120.00 Due │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  [View SOA by Supplier]                                       │
│                                                               │
│  ※ 기존 Invoice 결제 흐름 재사용                                │
│  ※ 필터: invoice_category = 'trade' AND payer = 나             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 7-5. 사이드바 메뉴

```
[System Admin]
  ...
  ── Sales ──                 ← NEW 섹션
  Sales Orders               ← NEW (수신 PO 관리)
  Trade Invoices             ← NEW (발행 인보이스)
  ...

[Brand General]
  ...
  ── Sales ──                 ← NEW
  Sales Orders               ← NEW
  Trade Invoices             ← NEW
  ...

[Foodcourt General]
  ...
  ── Sales ──                 ← NEW
  Sales Orders               ← NEW
  Trade Invoices             ← NEW
  ...

[Supplier Admin]
  Dashboard
  ── Products ──
  Products
  ── Inventory ──
  Inventory
  ── Customers ──            (설계 2)
  Contract Requests
  Customers
  ── Sales ──                ← NEW
  Sales Orders              ← NEW
  Trade Invoices            ← NEW
  ── Account ──
  Company Info
  Profile

[구매자 — Restaurant / Brand(구매) / Foodcourt(구매)]
  ...
  ── Procurement ──
  My Suppliers               (설계 2)
  Supplier Directory         (설계 2)
  Purchase Orders            (설계 3)
  Purchase Invoices          ← NEW
  ...
```

---

## 8. Technical Design

### 8-1. Model Changes

**Invoice.js:**
```
issuer_type ENUM: 'system_admin' | 'brand' | 'foodcourt' | 'supplier' (add 'supplier')
```

**InvoiceCategory (DB seed):**
```
INSERT: { code: 'trade', name: 'Trade Invoice', is_system: true }
```

### 8-2. Invoice 자동 발행 로직

```javascript
// purchaseOrderService.js에 추가 (PO received 시 호출)

async function createTradeInvoice(purchaseOrder) {
  // 1. PO 정보로 Invoice 데이터 구성
  const invoiceData = {
    type: 'automatic',
    invoice_category: 'trade',
    category_display_name: 'Purchase Order',
    
    issuer_type: mapSellerType(po.seller_type),  // 'supplier' | 'brand' | 'foodcourt' | 'system_admin'
    issuer_id: po.seller_entity_id,
    
    payer_type: mapBuyerToPayer(po.buyer_type),  // 'restaurant' | 'brand_manager' | 'foodcourt_manager'
    payer_id: po.buyer_id,
    restaurant_id: po.buyer_type === 'restaurant' ? po.buyer_id : null,
    
    total_amount: po.total_amount,
    currency: po.currency,
    due_date: calculateDueDate(po),  // 결제 조건에 따라
    
    status: 'pending_payment',
    notes: `Purchase Order: ${po.order_number}`,
    issued_by: 0,  // system-generated
    issued_at: new Date()
  };
  
  // 2. 기존 generateInvoiceNumber 재사용
  invoiceData.invoice_number = await generateInvoiceNumber(
    invoiceData.issuer_type, invoiceData.issuer_id
  );
  
  // 3. Invoice + InvoiceItems 생성
  const invoice = await Invoice.create(invoiceData);
  
  for (const item of po.items) {
    await InvoiceItem.create({
      invoice_id: invoice.id,
      item_type: 'product',
      description: `${item.product_name} × ${item.quantity} ${item.unit}`,
      calculation_method: 'fixed',
      fixed_amount: item.total_price,
      calculated_amount: item.total_price,
      total_amount: item.total_price
    });
  }
  
  // 4. PO에 invoice_id 연결
  await purchaseOrder.update({ invoice_id: invoice.id });
  
  // 5. 구매자에게 알림
  sendNotification(buyerUserId, 'trade_invoice_created', emailContent);
  
  return invoice;
}
```

### 8-3. Due Date 계산

```javascript
function calculateDueDate(purchaseOrder) {
  const now = new Date();
  
  // Supplier → 고객별 설정 (SupplierContract)
  if (po.seller_type === 'supplier') {
    const contract = await SupplierContract.findOne({
      where: { supplier_company_id: po.seller_entity_id, customer_type: po.buyer_type, customer_id: po.buyer_id, status: 'active' }
    });
    
    if (contract.invoice_cycle === 'monthly_soa') {
      // 익월 payment_due_day
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, contract.payment_due_day);
      return nextMonth;
    }
    // Immediate: payment_terms 기반 (Net 30 → 30일 후)
    const days = parsePaymentTermsDays(contract.payment_terms); // COD=0, Net15=15, Net30=30, Net60=60
    return addDays(now, days || 7);
  }
  
  // SA/Brand/Foodcourt → 기본 7일
  return addDays(now, 7);
}
```

### 8-4. SOA 월말 발송

```javascript
// invoiceScheduler.js에 cron 추가
// 매월 1일 오전 3시 실행

async function generateMonthlySoaEmails() {
  // monthly_soa인 SupplierContract 조회
  const contracts = await SupplierContract.findAll({
    where: { invoice_cycle: 'monthly_soa', status: 'active' }
  });
  
  for (const contract of contracts) {
    // 전월 미결 인보이스 조회
    const invoices = await Invoice.findAll({
      where: {
        issuer_type: 'supplier',
        issuer_id: contract.supplier_company_id,
        invoice_category: 'trade',
        // payer 매칭
        status: { [Op.in]: ['pending_payment', 'overdue'] },
        issued_at: { [Op.gte]: prevMonthStart, [Op.lt]: thisMonthStart }
      }
    });
    
    if (invoices.length === 0) continue;
    
    // SOA 이메일 발송
    const total = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
    await sendNotification(buyerUserId, 'soa_generated', {
      subject: `Statement of Account — ${supplierName} — ${monthLabel}`,
      html: soaEmailTemplate(invoices, total, dueDate, paymentLink)
    });
  }
}
```

### 8-5. API Endpoints

**판매자 주문 관리:**
```
GET  /api/seller-orders                    내 수신 PO 목록 (seller 기준)
     ?status=&customer=&period=
GET  /api/seller-orders/:poId              PO 상세 (판매자 뷰)
PUT  /api/seller-orders/:poId/confirm      Submitted → Confirmed
PUT  /api/seller-orders/:poId/ship         Confirmed → Shipped (tracking info optional)
PUT  /api/seller-orders/:poId/reject       Submitted → Cancelled (사유 필수)
```

**거래 인보이스 (판매자 — 기존 invoices.js 활용):**
```
GET  /api/invoices?invoice_category=trade&issuer_type=supplier&issuer_id=X
     → 기존 Invoice 목록 API에 필터 추가만
     → 신규 엔드포인트 불필요
```

**구매 인보이스 (구매자):**
```
GET  /api/invoices/purchase
     → invoice_category = 'trade' AND payer = 나
     → 또는 기존 /api/invoices?invoice_category=trade 필터

GET  /api/invoices/soa
     ?issuer_type=supplier&issuer_id=X&month=2026-04
     → SOA 뷰 (미결 인보이스 목록 + 총액)
```

**결제 (기존 엔드포인트 그대로):**
```
POST /api/invoices/:id/submit-payment      (기존)
POST /api/invoices/:id/confirm-payment     (기존)
POST /api/invoices/:id/reject-payment      (기존)
```

### 8-6. Existing Code Changes

| File | Change | Risk |
|------|--------|:----:|
| **Invoice.js** | issuer_type ENUM에 'supplier' 추가 | Low |
| **invoices.js** | generateInvoiceNumber에 'supplier' → 'SP' prefix 분기 | Low |
| **invoiceScheduler.js** | SOA 월말 cron 추가 | Low |
| **notification-settings.js** | NOTIFICATION_CATEGORIES에 2개 추가 | Low |
| **MainLayout.tsx** | 판매자 4역할에 Sales 섹션 + 구매자 3역할에 Purchase Invoices | Low |
| **AuthContext.tsx** | ROLE_ROUTES에 seller-orders, purchase invoices 추가 | Low |
| **App.tsx** | 라우트 추가 | Low |
| **ProtectedRoute.tsx** | 라우트 추가 | Low |
| **server.js** | seller-orders 라우트 등록 | Low |
| **purchaseOrderService.js** (설계 3) | createTradeInvoice 로직 추가 | Low |

**변경 없음:** 기존 Invoice CRUD, 결제 흐름, 이메일 발송, InvoiceItem

### 8-7. New Files

```
Backend:
  routes/seller-orders.js              (판매자 주문 관리 API)

Frontend:
  pages/Sales/SellerOrdersPage.tsx      (판매자 공통 — 역할별 분기 내부)
  pages/Sales/SellerOrderDetailPage.tsx
  pages/Sales/TradeInvoicesPage.tsx      (판매자 발행 인보이스 — 기존 Invoice UI 패턴)
  pages/Procurement/PurchaseInvoicesPage.tsx  (구매자 수신 인보이스)
  pages/Procurement/SoaPage.tsx              (SOA 뷰 + 일괄 결제)
```

---

## 9. Conflict Prevention

### Conflict 1: Invoice.issuer_type 'supplier' 추가
- 기존 쿼리: `WHERE issuer_type = 'system_admin'` 등 → 'supplier' 반환 안 함 → **영향 없음**
- 기존 인보이스 목록: `WHERE issuer_type = 'brand'` → Supplier 인보이스 미포함 → **영향 없음**
- generateInvoiceNumber: switch/if 분기에 'supplier' case 추가 → 기존 case 영향 없음

### Conflict 2: 기존 Invoice 결제 흐름과 Trade Invoice
- Trade Invoice도 같은 결제 흐름 (submit → confirm/reject)
- **완전히 동일한 API 사용** — 신규 엔드포인트 불필요
- invoice_category로 구분 가능 (기존: 'service'/'subscription', 신규: 'trade')

### Conflict 3: SOA cron과 기존 invoiceScheduler cron
- 기존: 매일 2AM (구독 인보이스)
- 신규: 매월 1일 3AM (SOA 발송)
- **시간 다름, 충돌 없음**

### Conflict 4: 기존 Invoice 목록 페이지에 Trade Invoice 혼입
- 기존 BrandInvoicesPage: `WHERE issuer_type = 'brand'` → Brand가 발행한 거래 인보이스도 포함됨
- **의도된 동작:** Brand가 발행한 인보이스는 구독이든 거래든 보여야 함
- invoice_category 필터 추가로 구분 가능 → 탭으로 "Subscription" / "Trade" 분리 가능 (선택)

---

## 10. Edge Cases

| Situation | Handling |
|-----------|---------|
| PO 부분 수령 → 인보이스 | 수령된 부분만 인보이스 발행. 나머지 수령 시 추가 인보이스 |
| PO 취소 후 이미 발행된 인보이스 | 인보이스 status: cancelled 처리 |
| SOA 기간에 인보이스 0건 | SOA 이메일 미발송 |
| 구매자가 SOA에서 일부만 결제 | 각 Invoice 개별 결제 — 선택된 것만 submit-payment |
| Supplier 구독 만료 | 기존 인보이스는 유지, 신규 PO 수신 차단 (설계 2 계약 상태 체크) |
| 같은 PO에 대해 인보이스 중복 발행 | PO.invoice_id FK로 방지. 이미 인보이스 있으면 생성 차단 |
| Brand가 판매자이면서 구매자 | Sales 섹션과 Procurement 섹션이 모두 표시됨. 각각 독립 동작 |

---

## 11. Implementation Plan

### Phase 1: Order Management
| # | Task |
|---|------|
| 1 | routes/seller-orders.js (수신 PO 목록/상세/confirm/ship/reject) |
| 2 | SellerOrdersPage (상태 탭 + 통계 바 + 목록) |
| 3 | SellerOrderDetailPage (상세 + 액션 버튼) |
| 4 | 사이드바 Sales 섹션 (4개 판매자 역할) |

### Phase 2: Trade Invoice
| # | Task |
|---|------|
| 5 | Invoice.issuer_type에 'supplier' 추가 + InvoiceCategory 'trade' seed |
| 6 | generateInvoiceNumber 'supplier' 분기 추가 |
| 7 | purchaseOrderService.createTradeInvoice (PO received → 자동 발행) |
| 8 | TradeInvoicesPage (판매자 — 발행 인보이스, 기존 Invoice UI 재사용) |
| 9 | PurchaseInvoicesPage (구매자 — 수신 인보이스) |

### Phase 3: SOA + Polish
| # | Task |
|---|------|
| 10 | SoaPage (구매자 — 공급업체별 월간 미결 + Pay All/Pay Selected) |
| 11 | SOA 월말 cron (invoiceScheduler 확장) |
| 12 | SOA 이메일 템플릿 |
| 13 | NOTIFICATION_CATEGORIES 추가 (trade_invoice_created, trade_invoice_paid, soa_generated) |
| 14 | 이메일 알림 연동 |

---

## 12. Verification Results (2026-04-07)

### 수정 반영

| # | 원래 설계 | 수정 |
|---|----------|------|
| 1 | 부분 수령 시 인보이스 여러 개 | **PO당 인보이스 1개**. 부분 수령 시 같은 인보이스에 InvoiceItem 추가, 전체 수령 후 pending_payment |
| 2 | PO.invoice_id 미정의 | **설계 3 PurchaseOrder에 invoice_id FK 추가 필요** (cross-design dependency) |
| 3 | Trade Invoice 기존 페이지 혼입 방치 | 기존 Invoice 페이지에 **[Subscription] [Trade] 카테고리 탭** 추가 (기본: Subscription → 기존 경험 유지) |
| 4 | [Pay All] 구현 미정의 | **POST /api/invoices/batch-submit-payment** 신규 API (기존 개별 결제 안 건드림) |
| 5 | TradeInvoicesPage 신규 생성 | **불필요** — 기존 InvoicesPage에 Trade 탭 추가로 통합 |
| 6 | PurchaseInvoicesPage 신규 생성 | **불필요** — 기존 InvoicesPage에 [Issued] [Received] 탭 추가로 통합 |

### 수정된 신규 파일 목록

```
Backend:
  routes/seller-orders.js

Frontend:
  pages/Sales/SellerOrdersPage.tsx         (판매자 공통 — 역할별 조건부 렌더링)
  pages/Sales/SellerOrderDetailPage.tsx
  pages/Procurement/SoaPage.tsx            (SOA 뷰 + 일괄 결제)
```

**삭제된 항목:**
- ~~TradeInvoicesPage~~ → 기존 InvoicesPage에 Trade 탭 추가
- ~~PurchaseInvoicesPage~~ → 기존 InvoicesPage에 Received 탭 추가

### 수정된 기존 코드 변경 목록

| File | Change | Risk |
|------|--------|:----:|
| **Invoice.js** | issuer_type ENUM에 'supplier' 추가 | Low |
| **invoices.js** | generateInvoiceNumber에 'supplier'→'SP' 분기 + batch-submit-payment API 추가 | Low |
| **invoiceScheduler.js** | SOA 월말 cron 추가 | Low |
| **notification-settings.js** | NOTIFICATION_CATEGORIES 3개 추가 | Low |
| **MainLayout.tsx** | 판매자 4역할에 Sales 섹션 + 구매자 Procurement에 Purchase Invoices 미추가 (기존 Invoices 탭으로 대체) | Low |
| **BrandInvoicesPage.tsx** | [Subscription] [Trade] 카테고리 탭 추가 | Low |
| **FoodcourtInvoicesPage.tsx** | [Subscription] [Trade] 카테고리 탭 추가 | Low |
| **AdminInvoicesPage (SA)** | [Subscription] [Trade] 카테고리 탭 추가 | Low |
| **RestaurantInvoicesPage** | [Issued] [Received] 탭 또는 invoice_category 필터 | Low |
| **AuthContext.tsx** | ROLE_ROUTES에 seller-orders 추가 | Low |
| **App.tsx** | 라우트 추가 | Low |
| **ProtectedRoute.tsx** | 라우트 추가 | Low |
| **server.js** | seller-orders 라우트 등록 | Low |
| **purchaseOrderService.js** (설계 3) | createTradeInvoice + PO received 시 호출 | Low |

### Cross-Design Dependency
- **설계 3 PurchaseOrder 모델에 invoice_id FK 추가 필요** — 설계 3 문서 업데이트 필요

### 기존 코드 충돌 없음 확인
- Invoice.issuer_type 'supplier' 추가: 기존 쿼리에 영향 없음 (존재하지 않는 값)
- generateInvoiceNumber: 기존 case 영향 없음 (신규 case 추가만)
- SOA cron: 기존 cron과 시간/목적 다름
- Invoice 페이지 탭 추가: 기존 기본 탭 = Subscription → 기존 경험 유지
- batch-submit-payment: 기존 개별 결제 API 독립

### 중복 개발 해소
- TradeInvoicesPage → 기존 InvoicesPage 탭 추가로 대체 (신규 페이지 불필요)
- PurchaseInvoicesPage → 기존 InvoicesPage 탭 추가로 대체 (신규 페이지 불필요)
- batch 결제: 기존 개별 결제 안 건드림, 독립 구현

---

# 📌 Sprint 4 Implementation Spec (2026-04-26 — /기능설계)

> Sprint 1+2+3 완료 후 진입. Sprint 4 마지막 단계. Irene 자율 위임 (전 결정 confirmed).

## A. 확정 결정사항

1. **Buyer 구조 (Irene 명시):**
   - Restaurant → 발주: BG/FG/Supplier 3종
   - BG → 발주: Supplier 만 (자기 ingredient 용)
   - FG → 발주: Supplier 만 (자기 ingredient 용)
2. **Seller 구조:**
   - Supplier — 외부, 계약 필수 (Sprint 2)
   - BG → Restaurant 자동 (brand_id 매칭)
   - FG → Restaurant 자동 (foodcourt_id 매칭)
   - SA → Restaurant 자동 (장비/소모품)
3. **Sprint 4 활성 페이지 4종 (Sprint 1 placeholder 교체)** + 신규 4종:
   - **Supplier 측**: SupplierOrdersPage / SupplierShippingPage(통합 가능) / SupplierTradeInvoicesPage / SupplierSoaPage
   - **BG/FG 측**: BrandIncomingOrdersPage / FoodcourtIncomingOrdersPage (산하 Restaurant 의 PO 처리)
   - **SA 측**: SystemIncomingOrdersPage (장비 PO 처리, optional Sprint 4 minimal)
   - **Buyer 측**: PurchaseInvoicesPage (받은 trade invoice 조회/결제)
4. **PaymentTerms default**: Supplier seller = SupplierContract.payment_terms / BG/FG/SA seller = Immediate (post-MVP 에서 per-entity 정책)
5. **Sprint 3 buyer-self progression 보존** (POS 미사용 seller fallback)

## B. API (Stage 2)

### B-1. Seller-side (`routes/seller-orders.js` 신규)

`authenticateToken + requireSellerRole`. 신규 미들웨어 `requireSellerRole` (Supplier Admin / Brand General / Brand Manager / Foodcourt General / Foodcourt Manager / System Admin) — 자기 seller scope 자동 도출.

| # | METHOD 경로 | 설명 |
|---|------------|------|
| 1 | `GET /api/seller-orders` | 자기 앞으로 온 PO list (filter status, date) |
| 2 | `GET /api/seller-orders/:id` | 단건 상세 |
| 3 | `POST /api/seller-orders/:id/confirm` | submitted → confirmed |
| 4 | `POST /api/seller-orders/:id/ship` | confirmed → shipped, body: `{ tracking_info? }` (JSON) |
| 5 | `POST /api/seller-orders/:id/reject` | submitted → cancelled, body: `{ reason }` 필수 |
| 6 | `GET /api/seller-orders/stats` | dashboard 카드 (pending/confirmed/shipped/received this month) |

### B-2. Trade Invoice 자동 발행 (`services/purchaseOrderService.js` 신규)

```javascript
// 내부 헬퍼, Sprint 3 receive endpoint 끝에서 호출
async function createTradeInvoice(po, opts = {}) {
  // Idempotent: 이미 trade invoice 있으면 skip
  // Issuer/Payer mapping (Stage 1 명시)
  // Due date 계산 (Immediate=+7days, Monthly SOA=익월 due_day)
  // generateInvoiceNumber: TRD-{prefix}{id}-{date}-{seq}
  // finalizeInvoice() 호출 (v3.18 패턴)
  // 이메일 발송 (entity 브랜딩, non-blocking)
  // Inbox 알림
  return invoice;
}
```

### B-3. Monthly SOA Cron (`services/soaScheduler.js` 신규)

```javascript
// 매월 1일 00:30 cron
// SupplierContract WHERE status='active' AND payment_terms.invoice_cycle='monthly_soa'
// 각 계약별 지난 달 발행된 trade invoice 그룹 → SOA 이메일 발송
// SchedulerRun 기록 (Sprint 1 monitoring 자동 노출)
```

API endpoint:
- `GET /api/supplier/soa` — supplier 측 월별 buyer SOA 요약
- `GET /api/supplier/soa/:contractId/:month` — 특정 계약/월의 SOA 상세

### B-4. Buyer Purchase Invoices (`routes/purchase-invoices.js` 신규)

`authenticateToken + requireBuyerRole`.

| # | METHOD 경로 | 설명 |
|---|------------|------|
| 7 | `GET /api/purchase-invoices` | 받은 trade invoice list (filter status) |
| 8 | `GET /api/purchase-invoices/:id` | 단건 (기존 invoice 응답 형식) |
| 9 | `GET /api/purchase-invoices/soa/current` | 이번 달 monthly_soa 결제조건 invoice 묶음 |

결제 flow 는 기존 invoice 결제 API (`POST /api/invoices/:id/submit-payment` 등) 활용.

## C. DB (Stage 3)

### C-1. PurchaseOrder 컬럼 추가
```sql
ALTER TABLE purchase_orders
  ADD COLUMN tracking_info JSON NULL COMMENT 'Sprint 4: shipping carrier/tracking number',
  ADD COLUMN trade_invoice_id INT NULL COMMENT 'FK to invoices.id (auto-issued)';
```

### C-2. 신규 모델 0개 (Invoice 모델 재사용)

### C-3. AddonModule 시드 추가

```js
// buyer 측 신규
{ module_code: 'buyer_purchase_invoices', name: 'Purchase Invoices', category: 'basic', target_user_type: 'all' }

// seller 측 신규 (Restaurant Admin 은 seller 안 됨 — supplier/BG/FG/SA 만)
// Sprint 1 에서 등록한 supplier_orders/shipping/trade_invoices/soa 는 이미 존재 → 사이드바 활성만
```

## D. UI (Stage 4)

### D-1. 페이지

**Supplier 측 (Sprint 1 placeholder 교체 + 신규):**
- `/pos/supplier/orders` (REPLACE) — Incoming PO 관리, Tabs: Pending/Confirmed/Shipped/Received/Cancelled
- `/pos/supplier/trade-invoices` (REPLACE) — 발행한 trade invoice 리스트 + 결제 상태
- `/pos/supplier/soa` (NEW) — buyer 별 월별 SOA, 결제 현황

**BG/FG/SA 측 (NEW):**
- `/pos/brand/general/incoming-orders` (BG)
- `/pos/foodcourt/general/incoming-orders` (FG)
- `/pos/admin/incoming-orders` (SA, optional Sprint 4 minimal)

**Buyer 측 (NEW):**
- `/pos/purchase-invoices` — 받은 trade invoice 리스트 + 상세 모달 + 결제 흐름
- `/pos/purchase-invoices/soa` — Monthly SOA buyer 의 이번 달 미결제 묶음 + Pay All

### D-2. 사이드바
- Supplier: orders/trade-invoices/soa 활성화 (placeholder 교체)
- BG: "Incoming Orders" 추가 (Suppliers 섹션 아래)
- FG: 동일
- Buyer 4 역할: "Purchase Invoices" 추가 (Suppliers 섹션 아래, /pos/suppliers/contracts 옆)

### D-3. i18n
- `purchaseInvoices.json` 신규 namespace (4 언어)
- `supplier.json` 확장 (orders/tradeInvoices/soa 키)

### D-4. 알림 카테고리 신규 4종
- `seller_order_received` (Supplier/BG/FG seller 에게 — PO submitted 시점)
- `trade_invoice_created` (Buyer 에게 — receive 시 자동 발행)
- `trade_invoice_paid` (Seller 에게 — buyer 결제 시)
- `monthly_soa` (Monthly SOA buyer 에게)

### D-5. 이메일 템플릿 신규
- `tradeInvoiceCreatedEmail` (entity 브랜딩 적용)
- `monthlySoaEmail` (월말 요약, invoice 리스트 + 합계)

## E. 검증 (Stage 6)

### E-1. test-sprint4.js 시나리오
1. Setup: SupplierContract active + PO submitted (Sprint 3 활용)
2. Seller: GET /seller-orders → submitted PO 1건 보임
3. Seller: POST /confirm → confirmed
4. Buyer (Sprint 3): mark-shipped 또는 Seller: ship → shipped
5. Buyer (Sprint 3): receive → status=received + **Trade Invoice 자동 발행**
6. Trade Invoice 검증: issuer_type='supplier', payer_type, total_amount, due_date, contract_id
7. Buyer: GET /purchase-invoices → 1건 보임
8. Buyer: 결제 흐름 (기존 API)
9. Seller reject: submitted → cancelled
10. IDOR: 다른 supplier 의 PO confirm → 404
11. Anon → 401
12. Cross-role: Buyer → /seller-orders → 403


---

# 📌 Sprint 5 — Smart Reorder + Live Sales Order + Delivery Tracking (2026-04-27)

## 배경
Sprint 4 후 점검 결과:
1. **Inventory list 의 Order 버튼이 UI 만 있고 실제 발주 미구현** (`useOrderModal.handleSend` TODO/alert)
2. **Seller IncomingOrdersView 가 단순 테이블** — Restaurant LiveOrdersPage 의 Socket.IO/사운드/카드 패턴 미적용
3. **`tracking_info` JSON 필드는 있으나 timeline 시각화 부족 + carrier 카탈로그 부재**

본 Sprint 가 위 3가지를 한 번에 해결. Restaurant LiveOrders 의 카드/탭/Socket.IO/사운드 패턴을 **추출 → 공유 hook + 컴포넌트** 로 만들고, Seller 측 Live Sales Order 가 동일 패턴 사용. Buyer-Seller 양쪽이 같은 Delivery Timeline 공유.

## A. 확정 정책 (Irene 2026-04-27)

| # | 결정 | 정책 |
|---|------|------|
| Q1 | 다중 발주 (Cart) | ✓ 추가 — checkbox + sticky bottom CTA + seller 자동 그룹화 |
| Q2 | IncomingOrdersView | **deprecated → Live Sales Order 로 대체**. 사이드바 라벨 통일 ("Live Orders") |
| Q3 | Carrier 카탈로그 | ✓ system_admin 마스터 + free input fallback |
| Q4 | 작업 범위 | 3 모듈 (Reorder + LiveSalesOrder + DeliveryTracking) 통째 1 sprint |

## B. API (Stage 2)

### B-1. 신규 endpoints

| Method | Path | 권한 | 용도 |
|--------|------|------|------|
| GET | /api/carriers | optionalAuth | 활성 carrier 카탈로그 (Seller ship 시 select) |
| GET | /api/admin/carriers | System Admin | CRUD list (비활성 포함) |
| POST | /api/admin/carriers | System Admin | Create |
| PUT | /api/admin/carriers/:id | System Admin | Update |
| DELETE | /api/admin/carriers/:id | System Admin | Soft delete |
| **POST** | **/api/purchase-orders/bulk** | Buyer | 다중 PO 일괄 생성 (seller 별 그룹화). req.body.groups: `[{ seller_type, seller_entity_id, items, expected_delivery_date?, notes? }, ...]` |
| GET | /api/seller-orders/live-stream | Seller | (선택) Polling fallback for clients without Socket.IO. 마지막 30초 변경 PO ID 목록 |

### B-2. 보강 endpoints (기존)
- `POST /purchase-orders/:id/submit`: 성공 후 `io.of('/orders').to(sellerRoom).emit('seller-order-created', { id, status, seller_type, seller_entity_id })`. tracking_info.events 에 `{ at, status: 'submitted', note }` push
- `POST /seller-orders/:id/confirm`: 성공 후 양쪽 room 에 `seller-order-updated` emit. events push
- `POST /seller-orders/:id/ship`: 동일 + tracking_info 의 carrier_code 에서 carrier 마스터 join 해서 tracking_url 자동 생성
- `POST /seller-orders/:id/reject`: 동일 (status=cancelled)
- `POST /purchase-orders/:id/receive`: 동일 + receive 시 events push

### B-3. Socket.IO 이벤트 정리

**Namespace:** `/orders` (이미 존재 — Restaurant Live Orders 와 공용)

**신규 join 이벤트:**
- `join-seller` — `{ seller_type, seller_id }` → room `seller_${type}_${id}` (system_admin 은 `seller_system_admin_0`)
- `join-buyer` — `{ buyer_type, buyer_id }` → room `buyer_${type}_${id}`

**Emit 이벤트 (server → client):**
- `seller-order-created` — buyer submit 시 → seller room
- `seller-order-updated` — confirm/ship/reject/receive 시 → seller room + buyer room

**Payload 형식:**
```json
{
  "id": 31, "po_number": "PO-R38-...", "status": "shipped",
  "seller_type": "supplier", "seller_entity_id": 20,
  "buyer_type": "restaurant", "buyer_id": 38,
  "total_amount": "31.50", "currency": "MYR",
  "tracking_info": { ... }
}
```

## C. DB (Stage 3)

### C-1. 신규 모델 — `Carrier`

```js
{
  id: INTEGER PK AI,
  code: STRING(50) UNIQUE NOT NULL,        // 'lalamove', 'grab_express', 'jnt', 'pos_laju'
  name: STRING(100) NOT NULL,              // display name
  tracking_url_template: STRING(500),      // e.g. 'https://www.lalamove.com/track/{tracking_number}'
  logo_url: TEXT,
  country: CHAR(2),                        // 'MY' / null=global
  is_active: BOOLEAN DEFAULT true,
  sort_order: INTEGER DEFAULT 0,
  created_at, updated_at
}
```

테이블: `carriers`. Seed 5건: Lalamove / Grab Express / J&T Express / Ninja Van / Pos Laju (MY)

### C-2. tracking_info JSON 표준 (PurchaseOrder.tracking_info)

```js
{
  carrier_code: 'lalamove',         // FK to Carrier.code (선택)
  carrier_name: 'Lalamove',         // 자유 입력 fallback
  tracking_number: 'LA12345',
  tracking_url: 'https://...',      // 서버가 carrier 마스터에서 자동 생성
  estimated_arrival: '2026-05-01',  // ISO date
  events: [
    { at: '2026-04-27T10:00:00Z', status: 'submitted', note: 'Order placed by buyer' },
    { at: '2026-04-27T11:00:00Z', status: 'confirmed', note: 'Confirmed by seller' },
    { at: '2026-04-28T09:30:00Z', status: 'shipped', note: 'Picked up by Lalamove' },
    { at: '2026-04-29T14:00:00Z', status: 'received', note: 'Delivered to buyer' }
  ]
}
```

이벤트는 서버가 status 전환 시점에 자동 push (frontend 가 수동으로 events 배열 보낼 필요 없음).

### C-3. 마이그레이션 — 신규 테이블 1개만, 기존 데이터 무영향
- `node scripts/sprint5-migration.js` — Carrier 테이블 생성 + 5건 seed

## D. UI (Stage 4)

### D-1. Inventory `tab=list` 보강

**StockListSection (`components/Inventory/sections/StockListSection.tsx`):**
- 컬럼 추가: `Supplier` 영역에 preferred IngredientSellerProduct 의 seller name 자동 표시 + "🟢 Mapped" / "⚠️ No Source" badge
- 행 머리에 `<Checkbox />` 추가 (다중 선택)
- 행 우측 `Order` 버튼: 매핑이 있으면 활성, 없으면 disabled + tooltip
- 페이지 상단 stat strip 옆에 "재고 부족 N개" CTA → suggestions 모달 열어서 일괄 발주
- 다중 선택 시 sticky bottom 바: `[3 items selected] [Clear] [Order Selected →]`

**OrderModal (`components/Inventory/modals/OrderModal.tsx`):**
- props 추가: `restaurantId`, `mappedSellers` (preferred + alternative)
- seller select dropdown (preferred 가 default)
- "Send Order" → `useOrderModal.handleSend` 가 `/api/purchase-orders` POST + `/submit` 자동 → success 토스트 + 모달 close + 행에 "PO-XXX submitted" badge

**BulkOrderModal (신규 `components/Inventory/modals/BulkOrderModal.tsx`):**
- 선택된 ingredients → seller 별 자동 그룹 (Supplier/BG/FG/SA 각 그룹)
- 각 그룹별 fold/unfold 카드 + 수량 조정 + seller 선택
- "Send All" → `/api/purchase-orders/bulk` POST → seller 별 PO 여러 건 생성

### D-2. Live Sales Order (Seller-side, LiveOrders 패턴 재활용)

**파일 구조 (신규):**
```
src/pages/LiveSalesOrders/
  LiveSalesOrderView.tsx        ← 메인 (LiveOrders 패턴 추출)
  styles.ts                     ← Card/Tab 스타일
  helpers.ts                    ← TimeAgoDisplay 재활용
src/hooks/
  useSellerLiveSync.ts          ← Socket.IO + sound + state hook
src/pages/Supplier/SupplierLiveOrdersPage.tsx     ← wrapper
src/pages/IncomingOrders/BrandIncomingOrdersPage.tsx (수정 — LiveSalesOrderView 사용)
src/pages/IncomingOrders/FoodcourtIncomingOrdersPage.tsx (수정)
src/pages/Admin/AdminLiveOrdersPage.tsx (신규 — SA 용)
```

**LiveSalesOrderView 구조:**
- 상단 4 KPI stat cards (today_submitted / pending / shipped / month_revenue)
- 탭: submitted / confirmed / shipped / received / cancelled (count badge)
- 카드 grid: PO 번호 + Buyer 배지 + 시간 + items 미리보기 (최대 3개) + 총액 + 다음 액션 버튼
- 카드 클릭 → 상세 drawer 열림 (DeliveryTimeline + items 전체 + 액션)
- 사운드 toggle 헤더 (`seller_sound_enabled` localStorage)
- 카드 hover: 약간 lift + shadow

**Sidebar 라벨 통일:**
- Supplier: `Orders` → `Live Orders`
- Brand General: `Incoming Orders` → `Live Orders`
- Foodcourt General: 동일

### D-3. DeliveryTimeline 공유 컴포넌트

`components/Inventory/DeliveryTimeline.tsx`:
- props: `events: TrackingEvent[]`, `tracking_url?: string`, `compact?: boolean`
- 5단계 dot (submitted → confirmed → shipped → in_transit → received)
- 각 dot 아래 시간 + note
- shipped 인 경우 carrier 로고 + "Track →" link (tracking_url)
- buyer 측 PurchaseOrderDetailPage + seller 측 LiveSalesOrder drawer 양쪽 사용

### D-4. CarrierAdminPage (System Admin)

`/pos/admin/carriers` 신규:
- DataTable (이름 / 코드 / 트래킹 URL 템플릿 / 로고 / 활성 / 정렬 / 액션)
- + Add Carrier 모달 (CRUD)
- 사이드바 — Admin > "Carriers" 메뉴 추가

### D-5. i18n 4 언어 (en/ko/zh/ms)
신규 keys (필수):
- `purchaseOrders.json`: `inventory.order.success`, `inventory.order.bulk.title`, `inventory.order.bulk.send`, `inventory.order.notMapped`
- `supplier.json` / `brand.json` / `foodcourt.json`: `liveOrders.title`, `liveOrders.subtitle`, `liveOrders.kpi.*`, `liveOrders.tabs.*`, `liveOrders.action.*`, `liveOrders.sound.on/off`
- `admin.json`: `carriers.title`, `carriers.add`, `carriers.fields.*`
- `inventory.json` (또는 기존 namespace): `list.checkbox`, `list.bulkBar.selected`, `list.bulkBar.clear`, `list.bulkBar.send`

## E. 코드 단계 (Stage 5) — 7 단위 PR 흐름

| 단위 | 변경 | 파일 (대표) |
|---|---|---|
| **U1** Carrier 인프라 | 모델 + 라우트 + seed + server.js mount | models/Carrier.js, routes/carriers.js, scripts/sprint5-migration.js |
| **U2** Bulk PO + Socket.IO + tracking events | 신규 라우트 + emit + 자동 push | routes/purchase-orders.js (bulk + submit emit), routes/seller-orders.js (confirm/ship/reject emit + events) |
| **U3** useSellerLiveSync hook | Socket.IO + sound + tab counts + state | src/hooks/useSellerLiveSync.ts |
| **U4** LiveSalesOrderView | 카드 + 탭 + 액션 모달 + drawer | src/pages/LiveSalesOrders/* |
| **U5** Inventory list 보강 + OrderModal 동작 + BulkOrderModal | StockListSection / OrderModal / BulkOrderModal / useOrderModal | components/Inventory/* |
| **U6** DeliveryTimeline + Carrier admin | components/Inventory/DeliveryTimeline + pages/Admin/CarriersPage | (multiple) |
| **U7** Sidebar 라벨 + 라우트 + i18n + 검증 | MainLayout + App.tsx + 4언어 + test-sprint5.js | (multiple) |

## F. 검증 (Stage 6) — test-sprint5.js (E2E)

### F-1. 시나리오 (15+ 항목)

1. Setup: R#38 + supplier#20 active contract + brand#10 + 2 ingredient with mapping
2. **Inventory→Order 단일**: R 의 ingredient#46 행 Order 클릭 → POST /purchase-orders → 201 → submit → submitted
3. **다중 발주**: 5 ingredients 선택 (3 supplier#20 + 2 brand#10) → POST /purchase-orders/bulk → PO 2건 생성
4. **bulk 응답 형식**: `{ success: true, data: { orders: [...] } }` — 각 PO 의 ID 배열
5. **GET /api/carriers** → 5 carrier (active 만)
6. **System Admin POST /api/admin/carriers** → 201 → updated → DELETE → soft delete
7. Cross-role: Buyer → /api/admin/carriers → 403
8. **Supplier login → Socket.IO connect /orders → join-seller** → confirmed
9. **R submit PO** → Socket.IO seller-order-created event 도착 (server log)
10. **Seller confirm** → seller-order-updated event 양쪽 room 도착
11. **Seller ship + carrier_code='lalamove' + tracking_number** → tracking_info.tracking_url 자동 생성 (template 치환) + events 배열 4개
12. **Buyer receive** → events 5개 (submitted/confirmed/shipped/in_transit/received) + Trade Invoice 자동 발행 (Sprint 4)
13. **Tracking event 자동 push 검증**: 각 status 전환 시 events 배열에 정확한 timestamp + status + note 추가
14. IDOR 검증: 다른 seller PO confirm → 404
15. Anon Socket.IO connect → join-seller 실패 (ack 없음)
16. health-check 회귀 통과

### F-2. UI/UX 통일성 검증
- LiveSalesOrderView 카드 = LiveOrders OrdersCard 동일 시각 언어 (radius/shadow/spacing)
- 사운드 toggle = Restaurant LiveOrders 와 동일 (localStorage `seller_sound_enabled`)
- DeliveryTimeline = buyer/seller 양쪽 동일 컴포넌트
- 사이드바 4 역할 모두 "Live Orders" 일치


---

# 📌 Sprint 6 — Lifecycle Completion (Delivered/Cancel/Returns/Print) (2026-04-27)

## 배경
Sprint 1~5 완료 후 발주/주문 라이프사이클 정합성 갭 9개 일괄 마무리. Irene 정책: "발주/주문관리 모두 완료할 때까지 배포 안한다 — 완성도 있게."

## A. 정책 확정

| # | 항목 | 결정 |
|---|------|------|
| T1-1 | Delivered status | shipped → **delivered** (seller 능동) → received (buyer 수령). DeliveryTimeline 5단계 (`in_transit` → `delivered` 명칭 통일) |
| T1-2 | Supplier stock 차감 | seller_type='supplier' 시 ship endpoint 에서 SupplierProduct.current_stock -= qty (× conv) + SupplierInventoryTransaction record (`transaction_type='po_shipped'`) |
| T1-3 | Buyer cancel | `draft` + **`submitted`** (seller confirm 전) 허용. confirmed 이후는 returns 흐름 |
| T1-4 | Partial Receive | UI: receive modal 에 per-item qty + max=ordered 검증. 백엔드는 이미 partial_received 지원 |
| T1-5 | Trade Invoice paid → revenue | Dashboard 가 invoices live aggregate (확인 필요). **No-op if true** |
| T1-6 | Tracking edit | PUT /api/seller-orders/:id/tracking — status='shipped'/'delivered' 시 carrier_code/name/tracking_number 변경 가능 (events 추가 push: 'tracking_updated') |
| T2-1 | Returns / Credit Notes | 신규 모델 PurchaseOrderReturn. Buyer initiate → 'requested' → Seller approve → 'approved' + Credit Note Invoice 자동. Stock 양쪽 reversal (buyer ingredient -=, supplier += 만약 supplier seller) |
| T2-2 | PO Print | Frontend `/pos/purchase-orders/:id/print` window.print() route. PDF 라이브러리 X |
| T2-3 | PO edit submitted | PUT /api/purchase-orders/:id `submitted` 까지 허용 (seller confirm 전 buyer 수정) |

## B. API (Stage 2)

### B-1. 신규 endpoints
- `POST /api/seller-orders/:id/deliver` — status='shipped' → 'delivered' (Sprint 6)
- `PUT /api/seller-orders/:id/tracking` — carrier/tracking 정보 사후 수정
- `POST /api/purchase-orders/:id/returns` — buyer initiate
- `GET /api/purchase-orders/:id/returns` — buyer/seller 양쪽 list
- `POST /api/seller-orders/:id/returns/:returnId/approve` — seller approve + Credit Note 자동 발행
- `POST /api/seller-orders/:id/returns/:returnId/reject` — seller reject

### B-2. 보강 endpoints (기존)
- `POST /api/purchase-orders/:id/cancel` — `submitted` 까지 허용 (현재는 `draft`만)
- `PUT /api/purchase-orders/:id` — `submitted` 까지 허용
- `POST /api/seller-orders/:id/ship` — Sprint 6: SupplierProduct.current_stock 차감 + Inventory Transaction
- DeliveryTimeline 컴포넌트 — 단계 명명 `in_transit` → `delivered` 통일

## C. DB (Stage 3)

### C-1. 신규 모델 — `PurchaseOrderReturn`
```js
{
  id: INTEGER PK AI,
  purchase_order_id: INTEGER NOT NULL,
  purchase_order_item_id: INTEGER NOT NULL,
  ingredient_id: INTEGER NOT NULL,
  quantity: DECIMAL(10,2) NOT NULL,
  reason: TEXT,
  status: ENUM('requested','approved','rejected') DEFAULT 'requested',
  requested_by_user_id: INTEGER NOT NULL,
  approved_by_user_id: INTEGER,
  rejected_by_user_id: INTEGER,
  resolved_at: DATE,
  rejection_reason: TEXT,
  credit_invoice_id: INTEGER,  // FK to invoices
  created_at, updated_at
}
```

### C-2. PurchaseOrder.status enum 확장
- 'draft','submitted','confirmed','shipped','**delivered**','partial_received','received','cancelled','closed'
- ALTER TABLE 실행 필요 — `node scripts/sprint6-migration.js`

## D. 코드 단위

| 단위 | 변경 |
|------|------|
| **U1** PO 상태 머신 | status='delivered' 추가, /deliver endpoint, /tracking PUT, cancel/edit 허용 확장, DeliveryTimeline 명명 통일 |
| **U2** Supplier 정합성 | services/purchaseOrderService 의 ship 후 stock 차감, T1-5 dashboard 검증 |
| **U3** Returns | PurchaseOrderReturn 모델 + 4 endpoints + Credit Note 자동 + buyer/seller UI |
| **U4** PO Print | `pages/PurchaseOrders/PurchaseOrderPrintPage.tsx` + window.print() + @media print CSS |
| **U5** 검증 | E2E 30+ |

## E. 검증 시나리오 (Stage 6)

1. Buyer cancel on submitted PO → cancelled
2. Seller deliver shipped PO → delivered (events 5단계)
3. Buyer receive delivered PO → received (Trade Invoice 자동)
4. Supplier ship → SupplierProduct.current_stock 차감 + transaction record
5. Tracking 사후 수정 (carrier_code 'lalamove' → 'grab_express') → tracking_url 재계산
6. Buyer edit submitted PO (qty 변경) → 정상
7. Buyer edit confirmed PO → 400 (locked)
8. Buyer initiate return on received PO line → 'requested'
9. Seller approve return → 'approved' + Credit Note Invoice + stock reversal
10. Seller reject return → 'rejected' (no stock change)
11. PO print page renders + window.print() trigger
12. health-check 회귀 통과

