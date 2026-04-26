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

