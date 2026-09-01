# Design 3: Purchase Order & Receiving

> **Created:** 2026-04-07
> **Status:** Design Confirmed (verified 2026-04-07)
> **Scale:** Large
> **Dependency:** Design 2 (Supplier Contract System)
> **Parent:** Supply Chain System (docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md)
> **Absorbs:** PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md (PO section)

---

## 1. Purpose

구매자(Restaurant, Brand General, Foodcourt General)가 계약된/연결된 판매자에게 발주하고, 수령하여 재고에 반영한다.

---

## 2. Current State

### 이미 존재하는 것 (활용)

| 항목 | 위치 | 활용 |
|------|------|------|
| InventoryBatch 모델 | models/InventoryBatch.js | 입고 시 배치 자동 생성 — **purchase_order_id FK 준비됨** |
| InventoryTransaction (type: 'purchase') | models/InventoryTransaction.js | 입고 트랜잭션 기록 |
| StockAlert (suggested_order_qty) | models/StockAlert.js | 발주 제안 수량 — **필드 존재, 로직 미구현** |
| PAR Level 필드 (lead_time_days 등) | Ingredient 모델 | 자동 발주 수량 계산 |
| Manual Receive 엔드포인트 | inventory-routes.js:266-356 | 패턴 참고 (Batch 생성 + Transaction + Alert 해제) |
| FIFO 차감 로직 | inventoryDeductionService.js:23-73 | 기존 그대로 유지 |
| Ingredient.supplier_id | Ingredient 모델 | 기본 공급업체 (1:1) |
| RestaurantIngredientCost | 모델 존재 | 레스토랑별 원가 오버라이드 |
| 기존 PO 스키마 설계 | PETTY_CASH doc:251-360 | PO/POItem 스키마 흡수 |

### 없는 것 (신규)

| 항목 | 설명 |
|------|------|
| PurchaseOrder 모델 | 발주서 |
| PurchaseOrderItem 모델 | 발주 항목 |
| IngredientSellerProduct 모델 | 재료 ↔ 판매자 상품 연결 (1:N) |
| 발주 생성/관리 UI | 구매자 페이지 |
| 자동 발주 제안 로직 | PAR Level 기반 |

---

## 3. Seller-Product → Ingredient 연결 구조

### 현재 (1:1 — 단순)
```
Ingredient.supplier_id → Supplier (연락처)
  = "이 재료의 기본 공급업체는 A"
  = 가격/최소주문 정보는 Ingredient에 직접 저장
```

### 변경 (1:N — 다중 공급업체)
```
Ingredient ←→ IngredientSellerProduct (N:M)
  = "이 재료를 공급하는 상품이 여러 개 있음"
  = 각 상품의 가격/단위/최소주문/리드타임은 판매자 상품에서 가져옴
  = is_preferred로 기본 발주 상품 지정
```

### IngredientSellerProduct 모델
```
id (PK)
ingredient_id (FK → ingredients.id)
seller_type (ENUM: 'system_admin' / 'brand' / 'foodcourt' / 'supplier')
seller_product_id (INTEGER — SystemProduct/BrandProduct/FoodcourtProduct/SupplierProduct의 id)
seller_entity_id (INTEGER — brand.id / foodcourt.id / supplier_company.id / null for SA)

unit_price (DECIMAL 10,2 — 이 상품의 현재 가격, 판매자 상품에서 초기값 가져오되 오버라이드 가능)
unit_conversion (DECIMAL 10,4, default 1 — 단위 변환 비율)
  예: 재료 단위 = kg, 상품 단위 = 25kg bag → conversion = 25
min_order_quantity (INTEGER — 이 상품의 최소 주문)
lead_time_days (INTEGER)
is_preferred (BOOLEAN, default false — 기본 발주 상품)
is_active (BOOLEAN, default true)
notes (STRING 255)
```

**기존 Ingredient.supplier_id**: 유지 (하위 호환). 새 연결은 IngredientSellerProduct로 관리. 기존 supplier_id는 레거시로 남겨두되, 발주 시에는 IngredientSellerProduct를 우선 참조.

---

## 4. Purchase Order 흐름

### 4-1. 발주 생성

```
구매자가 Purchase Orders 페이지에서 [+ New Order]
  │
  ├─ Step 1: 판매자 선택
  │   → 연결된 판매자 목록 표시 (SupplierContract active + SA/Brand/FC 자동)
  │   → 판매자 선택
  │
  ├─ Step 2: 상품 선택
  │   → 선택한 판매자의 상품 목록 (IngredientSellerProduct 기반)
  │   → 각 상품: 현재 재고, PAR Level, 추천 수량 표시
  │   → 수량 입력 (추천 수량 자동 입력, 수정 가능)
  │   → 단가 표시 (IngredientSellerProduct.unit_price)
  │
  ├─ Step 3: 확인
  │   → 항목 요약, 총 금액, 예상 배송일
  │   → [Save as Draft] 또는 [Submit Order]
  │
  └─ PurchaseOrder 생성
```

### 4-2. 자동 발주 제안 (PAR Level 기반)

```
재고 화면에서 [Auto Suggest Order]
  │
  ├─ 계산:
  │   daily_usage = avg_daily_usage || manual_daily_usage
  │   reorder_point = daily_usage × lead_time_days
  │   safety_stock = reorder_point × (safety_stock_percent / 100)
  │   par_level = reorder_point + safety_stock
  │   suggested_qty = par_level - current_stock (음수면 0)
  │
  ├─ PAR 이하인 재료 자동 선택
  │   → 각 재료의 preferred 상품으로 자동 구성
  │   → 판매자별로 PO 자동 분리
  │
  └─ Draft PO 생성 → 구매자가 검토 후 Submit
```

### 4-3. PO 라이프사이클

```
Draft → Submitted → Confirmed → Shipped → Received (또는 Partial Received)
                                          → Cancelled (어느 단계에서든)

Draft:     구매자가 작성 중 (수정/삭제 가능)
Submitted: 판매자에게 전송됨 (구매자 수정 불가)
Confirmed: 판매자가 확인 (출고 준비)
Shipped:   판매자가 출고/배송 시작
Partial:   일부 항목만 수령 (나머지 대기)
Received:  전체 수령 완료 → 재고 반영
Cancelled: 취소 (Draft/Submitted에서만 구매자 취소 가능, 이후는 양측 합의)
```

### 4-4. 수령 (Receiving)

```
PO status가 Shipped 또는 Confirmed일 때 [Receive] 가능
  │
  ├─ 항목별 수령 수량 입력
  │   → 주문 수량 vs 실수령 수량
  │   → 배치 정보: batch_number, expiry_date (선택)
  │   → 단가 확인 (PO 단가 기본, 변경 가능)
  │
  ├─ [Confirm Receive]
  │   → 각 항목에 대해:
  │     1. InventoryBatch 생성 (purchase_order_id 연결)
  │     2. Ingredient.current_stock += received_qty
  │     3. InventoryTransaction 생성 (type: 'purchase')
  │     4. StockAlert 해제 (기존 로직 재사용)
  │     5. PurchaseOrderItem.received_quantity 업데이트
  │
  ├─ 전체 수령 완료 → PO status: 'received'
  │   부분 수령 → PO status: 'partial_received'
  │
  └─ 기존 inventory-routes.js의 receive 로직을 서비스 함수로 추출하여 재사용
```

### 🔒 입고 가능 상태 = `RECEIVABLE_STATUSES` 단일 상수 (2026-08-30)

`routes/purchase-orders-workflow.js` 의 모듈 상수 하나를 **두 입고 라우트가 공유**한다:
`['submitted','confirmed','shipped','in_transit','delivered','partial_received']`
- `POST /purchase-orders/:id/mark-received` — 전량 정상 수령 lite
- `POST /purchase-orders/:id/receive` — splits(정상/short/damaged/wrong_item/pending) 정식
- ⛔ `draft`·`pending_approval` 은 계속 막는다 — **오너 승인 우회 방지**(2026-07-13 판정, 번복 아님)

**왜 확대했나:** 예전엔 상세가 `shipped|delivered|partial_received` 에서만 입고 버튼을 띄웠는데,
**운영 발주 전건이 `submitted` 에 머물러 있었다**(판매자가 배송 상태를 눌러주지 않는다).
즉 운영에서 입고 기능이 한 번도 쓰인 적이 없었다. 목록은 이미 submitted 부터 버튼을 띄우고 있어
**리스트/상세 비대칭**이기도 했다. 한쪽만 넓히면 우회 경로가 생기므로 한 상수로 묶었다.

### 🔒 재고 화면 입고 ↔ 발주 수령 동기화 (이중 가산 방지, 2026-08-30)

**문제:** 재고 화면 입고와 발주 수령이 서로를 몰라, 같은 물건을 양쪽에서 처리하면 재고가 두 번 더해졌다
(고장주입 실증: 물건 6개 입고 → 재고 **+12**).

**설계:** 입고 창이 그 품목의 진행 중 발주를 **보여주고 사용자가 고른다.**
- 조회 전용 API — RA: `GET /restaurants/:id/inventory/open-po-lines?ingredient_id=N`
  / BG: `GET /product-ingredients/:id/open-po-lines` (대칭, `product_ingredient_id` 기준)
- "발주 입고로 처리" 선택 → **PO `/receive` 경로 호출.** 재고 가산 로직을 복제하지 않는다 —
  **입고의 단일 소스는 PO 수령 경로 하나다.**
- "일반 입고" → 기존 동작 그대로(발주와 무관한 입고는 실제로 존재하므로 막지 않는다)
- ⛔ **자동 매칭 금지** — 수량·품목 자동 추정은 오귀속 사고 경로다. 사람이 고른다.
- 이미 다 받은 라인은 목록에서 사라진다(재수령 이중가산 차단 지점).

**나머지 입고 경로는 실측으로 "적용 불가" 확정** — 억지로 만들면 헛코드에 가짜 안심이 얹힌다:
| 경로 | 이유 |
|---|---|
| `supplier-inventory/receive` | 공급업체는 **판매자** — 구매자 화이트리스트(`buyerScope.js`: restaurant/brand/foodcourt) 밖 |
| `general-stock/:id/receive` | `purchase_order_items` 에 general_stock 참조 컬럼이 **없다** |
| `foodcourts/:id/inventory/receive` | `FoodcourtProduct.current_stock` 을 올린다 — PO 라인(Ingredient/ProductIngredient)과 **다른 객체** |

---

## 5. 화면 설계

### 5-1. Purchase Orders 목록 (구매자)

```
┌──────────────────────────────────────────────────────────────┐
│  Purchase Orders                          [+ New Order]       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [All] [Draft] [Submitted] [Confirmed] [Shipped] [Received]  │
│                                                               │
│  Search: [________]  Supplier: [All ▾]  Period: [This Month] │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ PO Number    Supplier       Items  Amount   Status     │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ PO-260407001 ABC Supplies   5      RM 1,250 Submitted │   │
│  │ PO-260405002 Fresh Farm     3      RM 680   Received  │   │
│  │ PO-260404001 ABC Supplies   8      RM 2,100 Draft     │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  행 클릭 → PO 상세                                            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-2. PO 생성 — Step 1: 판매자 선택

```
┌──────────────────────────────────────────────────────────────┐
│  New Purchase Order                                           │
│                                                               │
│  ── Step 1: Select Supplier ──                                │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ○ ABC Supplies     Meat, Seafood    12 products        │   │
│  │ ○ Fresh Farm       Produce          18 products        │   │
│  │ ○ PackCo           Packaging         8 products        │   │
│  │ ── Auto-connected ──                                    │   │
│  │ ○ Seoul BBQ Brand  Brand Products   24 products        │   │
│  │ ○ Purple POS       System Products   6 products        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  ※ Supplier = 계약 active인 공급업체                           │
│  ※ Brand = 자기 브랜드 (brand_id 매칭)                         │
│  ※ SA = 전체 자동                                             │
│  ※ FC = 자기 푸드코트 (foodcourt_id 매칭)                      │
│                                                               │
│                                        [Next →]              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-3. PO 생성 — Step 2: 상품 선택 + 수량

```
┌──────────────────────────────────────────────────────────────┐
│  New Purchase Order — ABC Supplies                            │
│                                                               │
│  ── Step 2: Select Items ──                                   │
│                                                               │
│  [Auto Suggest]  ← PAR Level 기반 자동 제안                    │
│                                                               │
│  Search: [________]  Category: [All ▾]                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ □ Product        Unit    Price   Stock  PAR   Suggest  │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ ✓ Chicken Breast kg      12.50   15    50    35   [35]│   │
│  │ ✓ Salmon Fillet  kg      45.00    2    10     8   [ 8]│   │
│  │ □ Tiger Prawn    kg      38.00   20    15     -   [  ]│   │
│  │ ✓ Soy Sauce      bottle   8.90    3    12     9   [ 9]│   │
│  │ □ Cooking Oil    L       15.00   10    10     -   [  ]│   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Stock: 현재 재고 │ PAR: PAR Level │ Suggest: 추천 수량        │
│  수량 칸 직접 수정 가능                                         │
│  PAR 이하 항목 하이라이트 (노랑 배경)                            │
│                                                               │
│  Selected: 3 items   Total: RM 1,048.60                      │
│                                                               │
│                     [← Back]  [Review Order →]                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-4. PO 생성 — Step 3: 확인

```
┌──────────────────────────────────────────────────────────────┐
│  New Purchase Order — Review                                  │
│                                                               │
│  Supplier: ABC Supplies                                       │
│  Expected Delivery: 2026-04-09 (2 days lead time)            │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Product          Qty    Unit   Price    Total          │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ Chicken Breast   35     kg     12.50    437.50        │   │
│  │ Salmon Fillet     8     kg     45.00    360.00        │   │
│  │ Soy Sauce         9     bottle  8.90     80.10        │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │                              Subtotal   877.60        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Notes: [________________________________]                    │
│                                                               │
│          [← Back]  [Save as Draft]  [Submit Order]           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-5. PO 상세 (구매자)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Purchase Orders                                    │
│                                                               │
│  PO-260407001                              Status: Shipped   │
│  Supplier: ABC Supplies                                       │
│  Ordered: 2026-04-07   Expected: 2026-04-09                  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Product          Ordered  Received  Unit   Total       │   │
│  │ ─────────────────────────────────────────────────────  │   │
│  │ Chicken Breast   35 kg    -         kg     437.50     │   │
│  │ Salmon Fillet     8 kg    -         kg     360.00     │   │
│  │ Soy Sauce         9 bot   -         bottle  80.10     │   │
│  │                                     Total   877.60     │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Notes: Fresh delivery preferred                              │
│                                                               │
│  (Shipped 이상일 때)                                           │
│  [Receive Order]                                              │
│                                                               │
│  (Draft일 때)                                                 │
│  [Edit]  [Submit]  [Delete]                                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 5-6. Receive 모달

```
┌────────────── Receive Order ──────────────────────────────────┐
│                                                                │
│  PO-260407001 — ABC Supplies                                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Product          Ordered  Receive  Batch#   Expiry      │  │
│  │ ─────────────────────────────────────────────────────    │  │
│  │ Chicken Breast   35 kg    [35  ]   [BT001]  [2026-04-14]│  │
│  │ Salmon Fillet     8 kg    [ 8  ]   [BT002]  [2026-04-12]│  │
│  │ Soy Sauce         9 bot   [ 9  ]   [     ]  [         ]│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ※ Receive 수량은 주문 수량 이하                                │
│  ※ 부분 수령 가능 (나머지는 다음에)                              │
│  ※ Batch#, Expiry는 선택                                      │
│                                                                │
│                        [Cancel]    [Confirm Receive]           │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Confirm 시:
  → InventoryBatch 생성 (purchase_order_id 연결)
  → Ingredient.current_stock 업데이트
  → InventoryTransaction (type: 'purchase')
  → StockAlert 해제
  → PO status 업데이트 (received / partial_received)
```

### 5-7. Ingredient ↔ Seller Product 연결 UI (재료 상세에서)

```
기존 Ingredient 상세 팝업에 "Linked Products" 섹션 추가:

┌──────────── Ingredient: Chicken Breast ───────────────────────┐
│                                                                │
│  (기존 재료 정보 — 이름, 단위, 재고 등)                          │
│                                                                │
│  Linked Products                          [+ Link Product]    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Product           Supplier      Price   MOQ   Preferred  │  │
│  │ ─────────────────────────────────────────────────────     │  │
│  │ Chicken Breast    ABC Supplies  12.50/kg  5kg  ★         │  │
│  │ Chicken (25kg)    Fresh Farm    11.80/kg  25kg            │  │
│  │ Boneless Chicken  MeatWorld     13.20/kg  3kg             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ★ = Preferred (기본 발주 시 이 상품으로)                        │
│  ※ [+ Link Product] → 연결된 판매자의 상품 검색 + 선택           │
│  ※ 가격/단위 변환 비율 설정 가능                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 5-8. 사이드바 메뉴

```
[Restaurant Admin]
  ...
  ── Procurement ──
  My Suppliers                (설계 2)
  Supplier Directory          (설계 2)
  Purchase Orders             ← NEW
  ...

[Brand General]
  ...
  ── Procurement ──
  My Suppliers                (설계 2)
  Supplier Directory          (설계 2)
  Purchase Orders             ← NEW
  ...

[Foodcourt General]
  ...
  ── Procurement ──
  My Suppliers                (설계 2)
  Supplier Directory          (설계 2)
  Purchase Orders             ← NEW
  ...
```

---

## 6. Technical Design

### 6-1. New Models

**PurchaseOrder:**
```
id (PK)
order_number (STRING, unique — "PO-YYMMDDNNN")

-- 구매자 (polymorphic)
buyer_type (ENUM: 'restaurant' / 'brand' / 'foodcourt')
buyer_id (INTEGER)

-- 판매자 (polymorphic)
seller_type (ENUM: 'system_admin' / 'brand' / 'foodcourt' / 'supplier')
seller_entity_id (INTEGER — brand.id / foodcourt.id / supplier_company.id / null for SA)

-- 상태
status (ENUM: 'draft' / 'submitted' / 'confirmed' / 'shipped' / 'partial_received' / 'received' / 'cancelled')

-- 날짜
order_date (DATE)
expected_date (DATE — lead_time 기반 자동 계산)
received_date (DATE — 전체 수령 시)
cancelled_at (DATE)

-- 인보이스 연결 (설계 4에서 사용)
invoice_id (FK → invoices.id, nullable)

-- 금액
subtotal (DECIMAL 10,2)
total_amount (DECIMAL 10,2)
currency (STRING 3, default 'MYR')

-- 기타
notes (TEXT)
created_by (FK → users.id)
```

**PurchaseOrderItem:**
```
id (PK)
purchase_order_id (FK → purchase_orders.id)
ingredient_id (FK → ingredients.id)
seller_product_id (INTEGER — 판매자 상품 ID)
seller_product_type (STRING — 'SystemProduct' / 'BrandProduct' / 'FoodcourtProduct' / 'SupplierProduct')

quantity (DECIMAL 10,2 — 주문 수량)
unit (STRING 20)
unit_price (DECIMAL 10,2)
total_price (DECIMAL 10,2 — quantity × unit_price)
received_quantity (DECIMAL 10,2, default 0 — 수령 수량)

notes (STRING 255)
```

**IngredientSellerProduct (재료 ↔ 판매자 상품 연결):**
```
(섹션 3에서 정의한 모델 그대로)
```

### 6-2. PurchaseOrder 추가 필드 (denormalized)

```
seller_name (STRING 255) — 생성 시 판매자 이름 저장 (목록 조회 시 JOIN 불필요)
buyer_name (STRING 255) — 생성 시 구매자 이름 저장
```

### 6-3. IngredientSellerProduct 추가 필드

```
ingredient_type (ENUM: 'ingredient' / 'product_ingredient')
  → Restaurant/Foodcourt: 'ingredient' (Ingredient 모델)
  → Brand: 'product_ingredient' (ProductIngredient 모델)
ingredient_id (INTEGER — 해당 모델의 id)
```

### 6-4. Existing Model Changes

| Model | Change |
|-------|--------|
| **InventoryBatch** | 변경 없음 — purchase_order_id FK 이미 존재 |
| **InventoryTransaction** | 변경 없음 — type: 'purchase' 이미 존재 |
| **StockAlert** | 변경 없음 — suggested_order_qty 이미 존재 |
| **Ingredient** | 변경 없음 — supplier_id 유지 (레거시), 새 연결은 IngredientSellerProduct |

### 6-5. Existing Code Reuse

| 기존 코드 | 재사용 방법 |
|----------|-----------|
| inventory-routes.js receive 로직 (266-356) | **건드리지 않음**. PO receive는 purchaseOrderService.js에서 독립 구현 (같은 패턴 참고) |
| StockAlert 해제 로직 (333-342) | PO receive 서비스에서 같은 로직 독립 구현 |
| PAR Level 필드 (Ingredient 모델) | 자동 발주 제안에 활용 |
| RestaurantIngredientCost | 단가 조회에 활용 (기존 getRestaurantCostMap) |
| PO 넘버링 패턴 | HardwareQuote/Invoice 패턴 참고: "PO-YYMMDDNNN" |
| FilterComponents | PO 목록 필터 |
| DatePeriodFilter | PO 기간 필터 |

### 6-4. API Endpoints

**Purchase Orders (구매자):**
```
GET    /api/purchase-orders                    내 PO 목록 (buyer 기준)
GET    /api/purchase-orders/:id                PO 상세
POST   /api/purchase-orders                    PO 생성 (Draft)
PUT    /api/purchase-orders/:id                PO 수정 (Draft만)
PUT    /api/purchase-orders/:id/submit         Draft → Submitted
POST   /api/purchase-orders/:id/receive        수령 처리 (항목별 수량)
DELETE /api/purchase-orders/:id                PO 삭제 (Draft만)
PUT    /api/purchase-orders/:id/cancel         PO 취소

GET    /api/purchase-orders/suggest            PAR Level 기반 자동 제안
```

**Ingredient-Product 연결:**
```
GET    /api/ingredients/:id/seller-products         연결된 판매자 상품 목록
POST   /api/ingredients/:id/seller-products         상품 연결
PUT    /api/ingredients/:id/seller-products/:linkId  연결 수정 (가격, preferred 등)
DELETE /api/ingredients/:id/seller-products/:linkId  연결 해제
```

**Available Products (발주 시 상품 조회):**
```
GET    /api/purchase-orders/available-sellers        연결된 판매자 목록
GET    /api/purchase-orders/available-products/:sellerType/:sellerId
         → 해당 판매자의 상품 + 내 재료와의 연결 정보 + 현재 재고/PAR
```

### 6-5. Existing Code Changes

| File | Change | Risk |
|------|--------|:----:|
| **inventory-routes.js** | 변경 없음 — PO receive는 독립 구현 | None |
| **MainLayout.tsx** | Procurement 섹션에 "Purchase Orders" 추가 (RA/BG/FG) | Low |
| **AuthContext.tsx** | 구매자 3역할 ROLE_ROUTES에 purchase-orders 추가 | Low |
| **ProtectedRoute.tsx** | 라우트 추가 | Low |
| **App.tsx** | 라우트 추가 | Low |
| **server.js** | 라우트 등록 | Low |
| **models/index.js** | PO + IngredientSellerProduct associations | Low |
| **Ingredient 상세 UI** | "Linked Products" 섹션 추가 | Low |

### 6-6. New Files

```
Backend:
  models/PurchaseOrder.js
  models/PurchaseOrderItem.js
  models/IngredientSellerProduct.js
  routes/purchase-orders.js
  services/purchaseOrderService.js   (receive 로직, PAR 계산, PO 생성)

Frontend:
  pages/Procurement/PurchaseOrdersPage.tsx       (PO 목록)
  pages/Procurement/PurchaseOrderDetailPage.tsx   (PO 상세)
  pages/Procurement/NewPurchaseOrderPage.tsx      (PO 생성 3-step)
  components/Procurement/ReceiveModal.tsx         (수령 모달)
  components/Procurement/LinkedProductsSection.tsx (재료 상세 내 연결 상품)
```

---

## 7. Conflict Prevention

### Conflict 1: inventory-routes.js receive 로직
- **원래:** 서비스 함수로 추출 계획
- **수정:** 기존 코드 건드리지 않음. PO receive는 purchaseOrderService.js에서 독립 구현 (같은 4단계 로직 참고: stock update → batch create → transaction create → alert resolve)
- 의도적 중복 — 기존 안정성 보장. 향후 리팩토링 때 통합

### Conflict 2: InventoryBatch.purchase_order_id 활용
- **현재:** 필드 존재하지만 항상 null
- **변경:** PO 수령 시 값 설정
- **기존 코드 영향:** 없음 (기존 코드는 이 필드를 조회하지 않음)

### Conflict 3: buyer_type/seller_type polymorphic 참조
- 직접 FK가 아닌 type + id 조합 → JOIN 시 분기 필요
- **해결:** purchaseOrderService에서 type별 include/join 로직 처리. 프론트에서는 API 응답에 resolved된 seller 정보 포함.

---

## 8. Edge Cases

| Situation | Handling |
|-----------|---------|
| 부분 수령 후 나머지 취소 | PO status: partial_received 유지, 개별 항목 received_quantity 확정, 미수령분 notes 기록 |
| 수령 수량 > 주문 수량 | 허용 (추가 배송 등). received_quantity가 quantity 초과 가능 |
| 판매자 상품 가격 변경 | PO 생성 시점 가격 기록 (PurchaseOrderItem.unit_price). 이후 상품 가격 변경에 영향 없음 |
| PAR Level 미설정 재료 | 자동 제안에서 제외, 수동 발주만 가능 |
| Supplier 계약 terminated 후 미수령 PO | 기존 PO는 계속 처리 가능 (신규 PO만 차단) |
| 같은 판매자에 여러 PO | 허용 (각각 독립) |
| Brand가 구매자이면서 같은 상품을 레스토랑에 판매 | Brand의 Ingredient(구매용)과 BrandProduct(판매용)는 별개. 발주→입고→Brand 재고 반영→레스토랑에 재판매 시 별도 PO |

---

## 9. Implementation Plan

### Phase 1: Core PO
| # | Task |
|---|------|
| 1 | PurchaseOrder + PurchaseOrderItem + IngredientSellerProduct 모델 + sync |
| 2 | inventory-routes.js receive 로직 → purchaseOrderService.js 추출 |
| 3 | routes/purchase-orders.js (CRUD + submit + cancel) |
| 4 | PurchaseOrdersPage (목록 + 상태 탭) |
| 5 | NewPurchaseOrderPage (3-step 생성) |
| 6 | PurchaseOrderDetailPage |

### Phase 2: Receiving + Product Linking
| # | Task |
|---|------|
| 7 | ReceiveModal (수령 처리 → InventoryBatch + Transaction + Alert) |
| 8 | LinkedProductsSection (재료 상세에 추가) |
| 9 | Ingredient ↔ SellerProduct CRUD API |
| 10 | Available Sellers/Products API |

### Phase 3: Auto Suggest
| # | Task |
|---|------|
| 11 | PAR Level 계산 로직 구현 |
| 12 | Auto Suggest API + UI ([Auto Suggest] 버튼) |
| 13 | StockAlert.suggested_order_qty 자동 계산 |
| 14 | 사이드바 메뉴 + 라우트 등록 |

---

## 10. Verification Results (2026-04-07)

### 수정 반영

| # | 원래 설계 | 수정 |
|---|----------|------|
| 1 | inventory-routes.js receive 서비스 추출 | **추출 안 함**. PO receive 독립 구현 (기존 코드 안 건드림) |
| 2 | polymorphic JOIN으로 seller 이름 조회 | PO에 **seller_name, buyer_name denormalized 필드** 추가 |
| 3 | IngredientSellerProduct.ingredient_id만 | **ingredient_type 필드 추가** ('ingredient' / 'product_ingredient' — Brand의 ProductIngredient 지원) |
| 4 | 3-step 생성만 | **Quick Reorder 추가** (이전 PO 기반 재주문 — PO 상세에 [Reorder] 버튼) |
| 5 | Auto Suggest → 바로 분리 PO 생성 | 판매자별 그룹 한 화면 표시 + **[Create All POs] 일괄 생성** |
| 6 | 수령 시 단가 변경 가능 | **단가 변경 불가** (PO 기록 가격 고정) |

### 기존 코드 충돌 없음 확인
- inventory-routes.js: 건드리지 않음 (PO receive 독립 구현)
- InventoryBatch.purchase_order_id: 기존에 WHERE 조건으로 사용하는 코드 없음
- Ingredient 상세 UI: 아래에 섹션 추가만 (기존 변경 없음)
- Procurement 사이드바: 설계 2에서 만든 섹션에 메뉴 항목 추가만

### 중복 인지 (의도적)
- PO receive 로직 ≈ 기존 inventory receive 로직: 기존 안 건드리기 위한 의도적 중복
- PO 넘버링 ≈ Invoice/HardwareQuote 넘버링: 공통 유틸 아닌 개별 구현 유지

---

# 📌 Sprint 3 Implementation Spec (2026-04-26 — /기능설계)

> Sprint 1+2 완료 후 진입. Irene 자율 위임 (모든 결정 confirmed).

## A. 확정 결정사항

1. **PO Buyer/Seller 폴리모픽**: `entity_type` (buyer) + `seller_type`(seller) ENUM. Sprint 2 패턴 미러.
2. **PAR Level → `Ingredient.min_stock` 재사용** (par_level 컬럼 추가 없음). 추천 = `(min_stock × 1.5) - current_stock` when `current_stock < min_stock`.
3. **활성 SupplierContract 게이트** — supplier seller PO 생성 시 검증.
4. **재고 트랜잭션 + lock** — receive 시 `Ingredient.findByPk(id, { lock, transaction })` + Batch + Transaction + Update 모두 같은 transaction.
5. **PO 상태 머신 (Sprint 3)**: draft → submitted → confirmed → shipped → partial_received → received → closed. cancelled (draft 만). Sprint 3 임시: buyer 가 셀프로 confirmed/shipped 진행 (Sprint 4 에서 supplier 측 분리).
6. **IngredientSellerProduct 폴리모픽**: seller_type 4종 (system_admin/brand/foodcourt/supplier).

## B. DB 스키마 (Stage 3)

### B-1. 신규 테이블 3개

#### `ingredient_seller_products` (1 ingredient : N seller products N:M)
```sql
CREATE TABLE ingredient_seller_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ingredient_id INT NOT NULL,
  seller_type ENUM('system_admin','brand','foodcourt','supplier') NOT NULL,
  seller_entity_id INT NULL COMMENT 'brand_id / foodcourt_id / supplier_company_id (system_admin=null)',
  seller_product_id INT NOT NULL COMMENT 'SystemProduct/BrandProduct/FoodcourtProduct/SupplierProduct id',

  unit_price DECIMAL(10,2) NOT NULL,
  unit_conversion DECIMAL(10,4) DEFAULT 1 COMMENT 'recipe unit -> seller product unit ratio',
  min_order_quantity INT DEFAULT 1,
  lead_time_days INT DEFAULT 0,
  is_preferred TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  notes VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
  INDEX idx_ingredient (ingredient_id),
  INDEX idx_seller (seller_type, seller_entity_id),
  INDEX idx_preferred (ingredient_id, is_preferred)
);
```

#### `purchase_orders`
```sql
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  po_number VARCHAR(50) UNIQUE,

  -- Buyer (polymorphic, mirror Sprint 2 SupplierContract)
  entity_type ENUM('restaurant','brand','foodcourt') NOT NULL,
  entity_id INT NOT NULL,

  -- Seller (polymorphic)
  seller_type ENUM('system_admin','brand','foodcourt','supplier') NOT NULL,
  seller_entity_id INT NULL,

  contract_id INT NULL COMMENT 'SupplierContract FK when seller_type=supplier',

  status ENUM('draft','submitted','confirmed','shipped','partial_received','received','cancelled','closed')
    NOT NULL DEFAULT 'draft',

  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'MYR',

  expected_delivery_date DATE NULL,
  actual_delivery_date DATE NULL,
  delivery_address TEXT,
  notes TEXT,

  created_by_user_id INT NOT NULL,
  submitted_at DATETIME NULL,
  confirmed_at DATETIME NULL,
  shipped_at DATETIME NULL,
  received_at DATETIME NULL,
  cancelled_at DATETIME NULL,
  cancelled_reason TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,

  FOREIGN KEY (contract_id) REFERENCES supplier_contracts(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by_user_id) REFERENCES users(id),
  INDEX idx_buyer (entity_type, entity_id),
  INDEX idx_seller (seller_type, seller_entity_id),
  INDEX idx_status (status),
  INDEX idx_buyer_status (entity_type, entity_id, status),
  INDEX idx_po_number (po_number)
);
```

#### `purchase_order_items`
```sql
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  ingredient_seller_product_id INT NULL COMMENT 'snapshot of which seller product was used',

  description VARCHAR(255) COMMENT 'snapshot of seller product name',
  quantity_ordered DECIMAL(10,2) NOT NULL,
  quantity_received DECIMAL(10,2) DEFAULT 0,
  unit VARCHAR(50),
  unit_price DECIMAL(10,2) NOT NULL,
  line_total DECIMAL(10,2) NOT NULL,
  unit_conversion DECIMAL(10,4) DEFAULT 1,
  notes VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (ingredient_seller_product_id) REFERENCES ingredient_seller_products(id) ON DELETE SET NULL,
  INDEX idx_po (purchase_order_id),
  INDEX idx_ingredient (ingredient_id)
);
```

### B-2. Sequelize 모델 + Association

```javascript
// models/IngredientSellerProduct.js — 1 ingredient : N seller products
IngredientSellerProduct.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
Ingredient.hasMany(IngredientSellerProduct, { foreignKey: 'ingredient_id', as: 'sellerSources' });

// models/PurchaseOrder.js
PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchase_order_id', as: 'items' });
PurchaseOrder.belongsTo(SupplierContract, { foreignKey: 'contract_id', as: 'contract' });
PurchaseOrder.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'createdBy' });

// models/PurchaseOrderItem.js
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id', as: 'order' });
PurchaseOrderItem.belongsTo(Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
PurchaseOrderItem.belongsTo(IngredientSellerProduct, { foreignKey: 'ingredient_seller_product_id', as: 'sellerSource' });
```

## C. API (Stage 2)

### C-1. Buyer Side (`routes/purchase-orders.js` 신규)

`authenticateToken + requireBuyerRole`. 모듈 게이트 `requireModule('buyer_purchase_orders')` (신규).

| # | METHOD 경로 | 설명 |
|---|------------|------|
| 1 | `GET /api/purchase-orders` | 자기 PO 목록 (paginated, filter status) |
| 2 | `GET /api/purchase-orders/:id` | PO 상세 + items |
| 3 | `POST /api/purchase-orders` | PO 생성 (draft) — body: `{ seller_type, seller_entity_id, items: [{ ingredient_id, ingredient_seller_product_id, quantity_ordered, unit_price?, notes? }], expected_delivery_date?, delivery_address?, notes? }` |
| 4 | `PUT /api/purchase-orders/:id` | draft 만 수정 가능 |
| 5 | `POST /api/purchase-orders/:id/submit` | draft → submitted (Sprint 3 임시: 자동 confirmed) |
| 6 | `POST /api/purchase-orders/:id/mark-shipped` | confirmed → shipped (Sprint 3 buyer self) |
| 7 | `POST /api/purchase-orders/:id/receive` | body: `{ items: [{ item_id, quantity_received, batch_no?, expiry_date?, unit_cost? }] }` → InventoryBatch + Transaction + Ingredient.current_stock += → status='partial_received' or 'received' |
| 8 | `POST /api/purchase-orders/:id/cancel` | draft 만 가능 |
| 9 | `GET /api/purchase-orders/suggestions` | PAR 기반 자동 추천 (Ingredient.current_stock < min_stock 인 항목 + 추천 수량) |

### C-2. Ingredient Seller Sources (`routes/ingredient-seller-products.js` 신규)

`authenticateToken + requireBuyerRole`.

| # | METHOD 경로 | 설명 |
|---|------------|------|
| 10 | `GET /api/ingredients/:ingredientId/seller-sources` | ingredient 의 모든 연결 (자기 ingredient 만) |
| 11 | `POST /api/ingredients/:ingredientId/seller-sources` | 연결 추가 |
| 12 | `PUT /api/ingredient-seller-products/:id` | 단가/preferred/active 수정 |
| 13 | `DELETE /api/ingredient-seller-products/:id` | 연결 제거 |
| 14 | `GET /api/seller-catalog?seller_type=&seller_entity_id=` | 연결 가능한 상품 검색 (active contract 필요) |

## D. UI (Stage 4)

### D-1. 페이지 4개 신규

| 경로 | 컴포넌트 | 기능 |
|------|----------|------|
| `/pos/purchase-orders` | `pages/PurchaseOrders/PurchaseOrdersPage.tsx` | PO 목록 + 필터 + Stat cards (Draft/Pending/Shipped/Received) |
| `/pos/purchase-orders/new` | `pages/PurchaseOrders/NewPurchaseOrderPage.tsx` | 3-step wizard (Seller → Items → Review) |
| `/pos/purchase-orders/:id` | `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx` | 상세 + Status timeline + Receive 모달 + Cancel 모달 |
| (Ingredient 페이지 확장) | 기존 IngredientsPage 에 `[Add Supplier Source]` 모달 | IngredientSellerProduct CRUD |

### D-2. 사이드바 추가
- Restaurant Admin / Restaurant Owner / BG / FG 4 buyer 역할 모두 `/pos/purchase-orders` 추가 (Inventory 섹션 인근).

### D-3. i18n
신규 namespace: `purchaseOrders.json` (4 언어). 60+ 키.

### D-4. 모듈 시드 추가
- `buyer_purchase_orders` AddonModule (target='all', basic 카테고리). 모든 buyer 플랜에 자동 포함.

## E. 검증 (Stage 6)

### E-1. test-sprint3.js 시나리오 (목표 25+)
1. Setup: Supplier active contract + Ingredient 연결
2. POST seller-source → 201
3. GET ingredient seller-sources → 1건
4. POST purchase-order (draft) → 201, items 검증
5. PUT 수정 (draft) → 200
6. PUT (submitted) → 400 (state lock)
7. POST submit → submitted (Sprint 3 임시 confirmed)
8. POST mark-shipped → shipped
9. GET suggestions → low-stock ingredient 추천
10. POST receive (전량) → InventoryBatch 1 + Transaction 1 + Ingredient stock 정확
11. status=received 검증
12. POST receive (부분) → partial_received
13. Cancel (draft) → cancelled
14. Cancel (submitted) → 400
15. IDOR: 다른 buyer PO GET → 404
16. Active contract 없는 supplier PO → 400
17. Anon → 401
18. Cross-role → 403

---

# 📌 Phase 2 — Contract Gate + Cost Sync (2026-04-27)

## 배경
Sprint 1~4 완료 후 점검 결과, **Restaurant 가 buyer 일 때 BG/FG 발주에 대해 계약(소속) 검증이 누락** + **Receive 시 RestaurantIngredientCost 갱신 누락** + **Seller product↔Ingredient 매핑이 optional fallback** 인 갭 발견. 직전 Supplier 측 흐름은 이미 구현돼 있고, 본 Phase 는 buyer-side 검증 + cost 동기화만 보강.

## A. 확정 정책

### A-1. Seller 별 발주 가능 조건 (Irene 확정 2026-04-27)
| seller_type | Restaurant 발주 가능 조건 | 모델 참조 |
|---|---|---|
| `supplier` | `SupplierContract` status='active' 존재 | 기존 그대로 |
| `brand` (BG) | `Restaurant.brand_id === seller_entity_id` | **소속 자체가 계약** (Brand-Restaurant Contract 별도 관리되므로 PO 시점 검증 불필요) |
| `foodcourt` (FG) | `Restaurant.foodcourt_id === seller_entity_id` | 동일 (입점 자체가 계약) |
| `system_admin` (SA) | 항상 가능 | POS 자체 카탈로그 |

### A-2. Cost 모델
**가중평균** — Receive 시 `RestaurantIngredientCost` upsert:
```
new_cost = (old_stock × old_cost + incoming × incoming_cost_per_ingredient_unit) / new_stock
```
- `incoming_cost_per_ingredient_unit = item.unit_price / item.unit_conversion`
- InventoryBatch 별 `unit_cost` 는 그대로 유지 (FIFO 출고 시 사용)
- Restaurant 가 buyer 일 때만 적용 (Brand/Foodcourt buyer 는 Phase 3 범위)

### A-3. Seller Product 매핑 강제
- `seller_type ∈ {supplier, brand, foodcourt}` → `IngredientSellerProduct` (`is_active=true`) 매핑 필수. 없으면 400 거부
- `seller_type === 'system_admin'` → 매핑 없이 발주 허용 (SA 카탈로그)

## B. Backend 변경

### B-1. `routes/purchase-orders.js`
**`findActiveSupplierContract` → `verifySellerRelation(sellerType, sellerId, buyerEntity)` 통합 헬퍼:**
- `supplier` → SupplierContract status='active' 조회 → `{ allowed, contractId }`
- `brand` → Restaurant.brand_id === sellerId 검증 → `{ allowed, contractId: null }`
- `foodcourt` → Restaurant.foodcourt_id === sellerId 검증 → `{ allowed, contractId: null }`
- `system_admin` → `{ allowed: true, contractId: null }`
- buyer.type !== 'restaurant' 인데 brand/foodcourt seller 발주 시도 → 거부 (Restaurant buyer 만 BG/FG 발주 가능)

**POST `/purchase-orders` 변경:**
- 기존 `seller_type === 'supplier'` 분기 제거 → 모든 seller_type 에 대해 `verifySellerRelation` 호출
- Item 매핑 검증: seller≠system_admin 시 `IngredientSellerProduct` 활성 매핑 필수, 없으면 400 `MAPPING_REQUIRED`

**POST `/purchase-orders/:id/receive` 변경:**
- Receive 루프 안에 RestaurantIngredientCost upsert 추가 (Restaurant buyer 한정):
  ```js
  if (po.entity_type === 'restaurant') {
    const incomingCostPerIng = (item.unit_price || 0) / (item.unit_conversion || 1);
    const newAvg = oldStock > 0
      ? (oldStock * oldCost + stockDelta * incomingCostPerIng) / newStock
      : incomingCostPerIng;
    await RestaurantIngredientCost.upsert({
      restaurant_id: po.entity_id,
      ingredient_id: item.ingredient_id,
      unit_cost: round(newAvg, 4),
      notes: `PO ${po.po_number}`,
      updated_by: req.user.id
    }, { transaction: t });
  }
  ```
- Ingredient master 의 `unit_cost` 는 건드리지 않음 (brand-shared ingredient 는 brand cost 가 master, restaurant override 만 갱신)

### B-2. 신규 `routes/buyer-sellers.js`
`GET /api/buyer/sellers` — Restaurant buyer 한정 (BG/FG buyer 는 supplier 만):
- Supplier: SupplierContract status='active' 의 SupplierCompany 목록
- Brand: Restaurant.brand_id 의 Brand (있으면 1건)
- Foodcourt: Restaurant.foodcourt_id 의 Foodcourt (있으면 1건)
- System Admin: 항상 1건 (POS 카탈로그)

응답 형식:
```json
{ "success": true, "data": [
  { "seller_type": "supplier", "seller_id": 17, "name": "ABC Supplies", "logo_url": "..." },
  { "seller_type": "brand", "seller_id": 5, "name": "My Brand", "logo_url": "..." },
  { "seller_type": "foodcourt", "seller_id": 2, "name": "Mall Foodcourt", "logo_url": "..." },
  { "seller_type": "system_admin", "seller_id": null, "name": "POS Catalog" }
]}
```

`server.js` 에 `app.use('/api/buyer', authenticateToken, requireBuyerRole, buyerSellersRouter)` path-level mount.

## C. Frontend 변경

### C-1. `pages/PurchaseOrders/NewPurchaseOrderPage.tsx`
- 기존 supplier-directory fetch 를 `/api/buyer/sellers` 로 교체
- Seller picker 카드에 BG/FG 도 동일 UI 로 노출 (TypeBadge 4 variant)
- "발주 가능한 seller 가 0건" 빈 상태 처리 (계약된 supplier 없고 brand/foodcourt 미소속)

### C-2. i18n
`purchaseOrders.json` 4 언어 — 신규 키:
- `new.seller.type.system_admin`
- `new.seller.empty` ("발주 가능한 거래처가 없습니다. Supplier 와 계약하거나 Brand/Foodcourt 에 입점해 주세요.")

## D. 검증 (Phase 2)

### D-1. test-phase2-po-integration.js (신규)
1. Setup: Restaurant#R 이 brand#B 소속, foodcourt#F 입점, supplier#S 와 active contract
2. R → S 발주 (active contract) → 201
3. R → S 발주 (계약 종료된 supplier) → 400 NO_ACTIVE_CONTRACT
4. R → B (Restaurant.brand_id 일치) 발주 → 201
5. R → 다른 brand B' 발주 → 400 NO_ACTIVE_CONTRACT
6. R → F (Restaurant.foodcourt_id 일치) 발주 → 201
7. R → 다른 foodcourt F' 발주 → 400 NO_ACTIVE_CONTRACT
8. R → SA 발주 → 201 (항상 허용)
9. Mapping 없는 ingredient × supplier 발주 → 400 MAPPING_REQUIRED
10. SA 발주는 매핑 없어도 → 201
11. Receive 시 RestaurantIngredientCost upsert 가중평균 검증:
    - 첫 PO: stock=0 → cost = incomingCost
    - 두 번째 PO 다른 단가: cost = 가중평균 (수동 계산값과 일치)
12. GET /api/buyer/sellers (Restaurant) → supplier(active 만) + brand(있으면) + foodcourt(있으면) + system_admin
13. Health-check 회귀 통과

### D-2. 회귀 (기존 흐름 깨지지 않음)
- 기존 supplier PO → 정상 (active contract 검증 동일)
- BG/FG seller-side incoming-orders → 정상 (변경 없음)
- Trade Invoice 자동 발행 → 정상 (서비스 로직 변경 없음)

## E. 배포 마이그레이션
없음 (DB 스키마 변경 없음, 시드 변경 없음). 코드 변경만으로 적용.

---

## F. 비-Restaurant Buyer Audit Trail (2026-04-28 추가)

### F-1. 문제
PO `/receive` 흐름에서 `InventoryTransaction` 모델이 `restaurant_id` NOT NULL이라, **Brand/Foodcourt buyer의 PO 수령은 audit row가 생성되지 않음** — 재고 stock_qty는 갱신되지만 거래 내역 추적 불가.

### F-2. 해결
`routes/purchase-orders.js` receive loop에서 `entity_type !== 'restaurant'` 분기에 `ActivityLog.create({ entity_type: 'po_receipt', ... })` 추가. ActivityLog는 `restaurant_id` nullable이라 cross-entity audit에 적합. changes JSON에 buyer_entity_type/buyer_entity_id/ingredient_id/quantity_change/unit/stock_after/unit_cost 모두 기록.

### F-3. 향후 (스키마 마이그레이션 후)
`InventoryTransaction` 에 `entity_type` / `entity_id` 컬럼 추가 + `restaurant_id` nullable 변경 시 ActivityLog fallback 제거하고 모델 통합. 현재는 마이그레이션 비용 회피하고 ActivityLog로 audit trail 회복.

### F-4. ✅ Sprint 7 정식 해결 (2026-04-28)

F-3에서 예고한 마이그레이션이 Sprint 7에서 완료됨:
- `inventory_transactions` / `inventory_batches` 모두 `entity_type` / `entity_id` 컬럼 추가, `restaurant_id` nullable
- Sequelize `beforeCreate` hook으로 legacy/신규 코드 양방향 backward-compat
- `transaction_type` ENUM 확장: `return_in`, `return_out`
- `purchase_order_id` FK 추가
- 백필 script (`scripts/sprint7-migration.js`): inventory_transactions 61 + batches 25
- ActivityLog fallback 제거 → receive 흐름 통합

**Sprint 7 추가 작업**:
- Receive splits: `items[].splits[]` (정상/damaged/wrong_item/short/pending) + auto-returns
- Returns 양방향 환원: brand/foodcourt seller도 stock 환원 + Currency invariant 검증
- PO.status ENUM 확장: `in_transit`, `delivery_failed`
- 사후 discrepancy PUT endpoint
- Carrier webhook 인프라 (HMAC + 2단계 처리 + idempotency)

**상세 설계**: `docs/SUPPLY_CHAIN_SPRINT_7.md`


---

## G. 오너 승인 워크플로우 (2026-06-21, with MIN Cafe 발주관리 추가요청 #2)

> 운영 피드백(IOI Mall Food Court, ticket 6/21 05:32): "레스토랑 발주를 오너가 확인·승인하고 발주완료 처리하는 과정. 오너 연결 시 기본 ON, 설정으로 on/off." 🔒 인쇄·결제 코드 무접촉.

### G-1. 단일소스 감사 (요청 #1 결과)
레스토랑·BG·FG 발주는 **이미 단일 컴포넌트/단일 백엔드**다 — "작은 거 하나 고치면 같이 수정"은 구조적으로 보장됨:
- 프론트: `pages/PurchaseOrders/{NewPurchaseOrderPage,PurchaseOrdersPage,PurchaseOrderDetailPage}.tsx` 한 세트. 역할 분기는 *구매자 엔티티 resolve*(`NewPurchaseOrderPage:506~516`)와 *인보이스 리다이렉트*(`DetailPage:432~435`)뿐, 발주 기능 자체엔 분기 없음.
- 백엔드: `purchase-orders-crud.js`/`-workflow.js` 전부 `req.buyerEntity`(역할→entity_type 단일 resolve, `buyerScope` 미들웨어) 기반. PO 모델 `entity_type`(restaurant/brand/foodcourt)로 통합. BG 전용 생성·제출 분기 없음(감사 완료).
- 차이는 BG가 브랜드제품을 발주처로 갖는 것뿐(데이터), 코드 아님.

### G-2. 승인 흐름
```
draft ──submit──▶ (오너승인 ON & 오너연결) pending_approval ──오너 승인──▶ submitted(→판매자)
                                              └──오너 반려──▶ draft (rejected_reason)
        (OFF 또는 오너 미연결) ───────────────────────────────▶ submitted (기존 동작)
```
- 오너 연결 = `restaurant_managers.relationship_type='ownership'` 행 존재. 승인 주체 = 그 `manager_id`(Restaurant Owner). 다수 오너면 누구나 승인 가능.
- BG/FG 발주(brand/foodcourt buyer)는 오너 개념 없음 → 항상 기존 즉시 submit.

### G-3. 설정
- `operation_settings.requirePoOwnerApproval ∈ true|false`. **오너 연결 시 기본 ON**(키 미설정이면 오너 연결 여부로 effective 결정), 미연결이면 무효.
- `utils/settingsGuard.js` `OPERATION_SETTINGS_ALLOWED_KEYS` 에 `requirePoOwnerApproval` 추가(anti-wipe 필수).
- 위치: SettingsPage 발주/운영 섹션 토글(세그먼트, 표준 컴포넌트).

### G-4. 모델 변경 (멱등 마이그 + deploy 9a-2 등록)
- `purchase_orders.status` ENUM 에 `pending_approval` 추가(draft 다음 논리 위치).
- 신규 컬럼: `approval_required`(BOOLEAN, 제출 시점 스냅샷), `approved_by_user_id`(INT null), `approved_at`(DATE null), `rejected_reason`(TEXT null), `rejected_by_user_id`(INT null), `rejected_at`(DATE null).

### G-5. API
- `POST /purchase-orders/:id/submit` — 레스토랑 buyer + 오너연결 + 설정 ON 이면 `pending_approval`(판매자 통지 보류, 오너 통지). 그 외 기존대로 `submitted`.
- `POST /purchase-orders/:id/approve` — 오너 전용(ownership 검증). pending_approval→submitted + 판매자 통지(기존 fireSellerSubmittedNotification 재사용). approved_by/at 기록.
- `POST /purchase-orders/:id/reject` — 오너 전용. pending_approval→draft + rejected_reason + 레스토랑 통지.
- 알림 카테고리 추가: `po_approval_pending`(→오너), `po_approval_result`(→레스토랑 작성자).

### G-6. 프론트
- 레스토랑: 발주 리스트/상세에 `pending_approval` 상태 배지("오너 승인 대기") + 작성자에게 반려 사유 표시.
- 오너: 발주 승인 큐(표준 DataTable) + 승인(ConfirmModal)/반려(사유 Modal). 사이드바 배지(badgeCounts) 선택.
- 통일 컴포넌트 전면 사용(Modal/ConfirmModal/FormGroup/DataTable/StatusBadge/ActionButton).

---

## H. 발주 카트·Staging 흐름 정리 (2026-06-22, Irene 연쇄 피드백)

### H-1. 개념 모델 (확정)
- **`/pos/purchase-orders` = "Planned Order"(담는 곳)**. 우측 패널은 담기용(이전 "Cart" → "Planned Order"로 개명). 카트는 **buyer 별 localStorage**(`po-cart:{type}:{id}`)로 영속화 — 제출 안 하고 이동해도 유지(로드-가드+skipSave 로 user 늦은 로딩 시 wipe 방지). **제출 시에만** 비워짐(중복 제출 방지).
- **`/pos/purchase-orders/staging` (Pending POs) = 실질 카트**. 제출하면 공급업체별 draft PO 로 쌓이고, 검토 후 **Submit All** 로 최종 발송.
- 카트 페이지 상단에 **"Pending POs (N) →"** 링크(staging 바로가기, draft 수 표시).

### H-2. 같은 공급업체 = 한 PO (합치기)
- **bulk 제출(mergeDraft)**: `createPurchaseOrderCore` 가 같은 `entity+seller_type+seller_entity_id` 의 draft 가 있으면 새로 안 만들고 거기에 품목 합치고 총액 누적(가장 오래된 draft 기준).
- **staging 자동 통합**: staging 진입(fetchDrafts)마다 `POST /api/purchase-orders/consolidate-drafts` 호출 — 같은 공급업체 draft 들을 oldest 로 합치고 나머지 soft-delete. 항상 공급업체당 1 PO 유지.
- ⚠️ **PurchaseOrder 는 paranoid(soft-delete)** — destroy 는 deleted_at 세팅. raw SQL count 는 deleted_at 필터 안 하면 오해 유발(모델 쿼리로 확인).

### H-3. 삭제
- **PO 폐기**: `DELETE /api/purchase-orders/:id` — draft 전용·owner-scoped·라인아이템 함께 삭제. cancel(기록 남김)과 달리 완전 제거. staging 각 PO "Discard".
- **아이템별 삭제**: `DELETE /api/purchase-orders/:id/items/:itemId` — draft·owner·총액 재계산. 마지막 품목 삭제 시 PO 도 삭제. staging 각 품목 행 "×".

### H-4. 품목 이름 / 외부발송 내용
- draft 조회(`?status=draft`)가 품목에 `product_name`(description snapshot || ingredient.name) 동봉 — 이전 "Item #id" 대신 실제 이름.
- 외부공급업체 PO: **WhatsApp/Email 내용에 실제 품목 목록(이름×수량@단가)+총액**. WhatsApp 번호 미등록 시 `wa.me/?text=` (번호 생략)으로 열어 연락처 선택 발송.

### H-5. 수정 파일
- 백엔드: `routes/purchase-orders-crud.js`(bulk mergeDraft, draft 품목 product_name), `routes/purchase-orders-workflow.js`(DELETE PO / DELETE item / consolidate-drafts)
- 프론트: `pages/PurchaseOrders/NewPurchaseOrderPage.tsx`(카트 영속화·Planned Order 개명·Pending POs 링크), `PurchaseOrderStagingPage.tsx`(자동통합·Discard·아이템 × 삭제·품목명·WhatsApp/Email 내용·헤더 80px), `public/sw.js`(3.89)

---

## §G-5. 승인 게이트는 **발주가 나가는 3경로 전부**에 적용된다 (2026-07-13, Fable)

발주가 판매자에게 나가는 길은 하나가 아니다. **세 곳 전부**가 `utils/poOwnerApproval.applySubmitGate` 를 타야 한다:

| 경로 | 라우트 | 화면 |
|---|---|---|
| 일반 제출 | `POST /purchase-orders/:id/submit` | 발주 확정(Staging) Submit |
| **일괄발주** | `POST /purchase-orders/bulk` (`auto_submit:true`) | **재고관리 Bulk Order 체크박스** |
| **외부업체 수동전송** | `POST /purchase-orders/:id/mark-sent-external` | Staging 의 Mark as Sent |

⚠ **게이트를 라우트에 복붙하지 말 것.** 실제로 submit 에만 게이트가 있고 **bulk·외부전송 두 경로는 승인 없이 발주를 내보내고 있었다**(Fable 2026-07-13 적발). 새 발주 경로를 만들면 반드시 `applySubmitGate` 를 태운다.

승인 대기(`pending_approval`) 상태의 취급:
- **수령 불가** — `mark-received` 는 화이트리스트(`submitted`/`confirmed`/`shipped`/`in_transit`/`delivered`/`partial_received`)만 허용. 예전엔 `received`/`cancelled` 만 막아서 **승인 대기 발주를 입고로 끝낼 수** 있었다. 정식 `/receive` 는 원래부터 안전.
- **철회 가능** — 작성자가 `cancel` 할 수 있다(오너 반려를 기다리며 묶이지 않는다).
- **입고예정(on-order)에 포함** — `inventory-core.js` `ACTIVE_PO_STATUSES` 에 포함. 안 그러면 승인 대기 중인 수량을 못 보고 같은 재료를 또 발주하게 된다.
- 승인 대기 시 **판매자 통지·`seller-order-created` 이벤트를 내보내면 안 된다**(오너 승인 후에만).

브랜드 표준 재료로 만든 발주도 동일하게 게이트를 탄다 — 재고 오버레이 로직은 승인 상태와 무관(`docs/BRAND_STOCK_SHARING_DESIGN.md`).

### §G-6. 승인 전 발주는 **판매자에게 존재하지 않는다** (2026-07-13, Fable 적발)

`draft`(구매자 장바구니 — 아직 보내지도 않음)와 `pending_approval`(오너 승인 대기)은 **판매자 포털에 절대 노출되면 안 된다.** 실제로는 상태 필터가 아예 없어 **둘 다 그대로 보이고 있었다.**

봉인 지점 3곳:
1. `routes/seller-orders.js` — 목록: `SELLER_HIDDEN = ['draft','pending_approval']` 를 `Op.notIn` 으로 강제. **`?status=draft` 로 요청해도 뚫리지 않는다**(예전엔 쿼리가 필터를 덮어썼다).
2. 같은 파일 — 상세: 숨김 상태면 **404**(소유권 통과해도).
3. `services/poRealtimeService.js` `emitPoEvent` — 숨김 상태면 **seller 룸 emit 생략**(buyer 룸은 유지). 여기가 단일 지점이라 새 발주 경로가 생겨도 판매자 유출은 여기서 걸린다.

승인 후 발송(외부공급업체): 승인 필요 매장은 Staging 의 WhatsApp/Email 이 **잠기고**(승인 전 발송 유도 금지), 승인된 뒤 **발주 상세 페이지**에서 보낸다. 메시지 빌더는 `utils/poShare.ts` 단일 소스(두 화면 공유).

### 공유 메시지 형식 (2026-08-31 확정 · 운영 실사용 피드백)

Irene 이 실제로 발주를 보내며 세 번 고친 끝의 형태다. **한 줄 = 한 품목**:

```
*PURCHASE ORDER*
PO-R10-20260831-004
TaiYangFresh

*Items (22)*
- *Korean Leek*  5 kg × 10.00 = 50.00
- *F&N Club Soda Water (Can)*  [1080-046]  1 ctn × 33.50 = 33.50

*TOTAL: MYR 206.47*
```

규칙 4가지 — 각각 Irene 의 실제 지적에서 나왔다:
1. **공급업체 상품명만.** *"공급업체에게 보내는 건데 우리 이름 저장한 것까지 보낼 필요 있어?"*
   내부명 병기(`(ref: …)` / 인쇄본 `Buyer ref`)는 **제거**. 매핑 없는 라인만 내부명 폴백.
2. **품목명만 굵게, 한 줄 유지.** *"이름만 굵게하는 건 어때?"* → 번호·줄바꿈까지 얹었다가
   *"이럴거면 그냥 한줄이 낫겠어"* 로 철회. 📌 **요청한 것만 바꾼다** — 더 얹어 두 번 헛돌았다.
3. **SKU 는 실제 공급업체 코드만** — `utils/poShare.isRealSupplierSku()` 단일 소스.
   `SP-<n>-<n>` 은 우리 자동채번이라 받는 쪽이 모르는 번호다. 실측: LSH 61개 중 57개만 실제코드
   (`1080-046` 등), TaiYangFresh 36 / AIM 11 / Guan Kee 10 / Hokkaido 1 은 **실제코드 0개**.
   같은 규칙을 화면 5곳에 적용(왓츠앱·메일·staging 목록·인쇄본·발주 상세).
4. **단위와 줄별 소계를 싣는다.** 수량만 있으면 받는 쪽이 5개인지 5kg인지 모른다.

WhatsApp 은 `*텍스트*` 를 굵게 렌더한다. 메일(mailto 평문)은 굵게가 없어 `bold()` 를 항등함수로 넘긴다.


---

## 장바구니 수량 병합 (2026-08-28 배포 v3.80)

**같은 품목을 다시 담으면 줄이 늘지 않고 수량이 합쳐진다.**

이전 동작: 어제 담은 draft 에 오늘 같은 품목을 담으면 **줄이 하나 더 생겼다.**
실제 사고 — PO-R10-20260827-001 에서 같은 3품목(갈색 천끈·Glass Noddle·컵덮개)이
`08-27 08:50:06` 과 `08-27 09:48:03` 에 두 번 담겨 **각각 2줄**이 됐고 그대로 제출됐다
(Irene: "내가 주문을 이렇게 지금 다 안넣었는데 왜 글라스누들이 들어있어?").

**구현** — `routes/purchase-orders-crud.js` `createPurchaseOrderCore()` 의 `mergeDraft` 분기:
- 병합 키 = `(ingredient_id, product_ingredient_id, ingredient_seller_product_id)`
- 기존 라인이 있으면 `quantity_ordered` 합산 + `line_total` 재계산, 없으면 새 줄
- 총액은 **누적 가산이 아니라 라인에서 재계산**(`computeTotals(freshItems)`) — 중복 가산 방지
- ⚠ **draft 한정**: 이 분기는 `PurchaseOrder.findOne({ ..., status: 'draft' })` 안에서만 도달한다.
  제출된 PO 에는 병합이 개입하지 않고 **새 draft 가 따로 생긴다.**

**검증**: demo 매장(38) 실호출 10/10 PASS. 고장주입(`const hit = prevByKey.get(...)` → `null`) 시 4건 FAIL 로 반증 성립.

---

## 발주 알림 메일 품목표 (2026-08-28 배포 v3.80)

**메일 본문에 주문 내역이 다 나온다** — Irene: "이메일에 내역이 다 나와야지. 굳이 들어가야만 보이면 불편하지."
그전에는 발주번호·구매자·총액·상태만 있어서 받는 쪽이 화면에 들어가야 뭘 주문했는지 알 수 있었다.

- `utils/poEmailItems.js` (신규) — 알림 경로 전용 로더. **절대 throw 하지 않는다**(실패 시 빈 배열).
  ~~표시명 = `ingredient.name` → `productIngredient.name` → `description`~~ **(2026-08-31 뒤집힘)**

  🔴 **2026-08-31 변경 — 공급업체에 나가는 문서는 공급업체 상품명을 쓴다.**
  Irene: *"공급업체에 보내는 건 우리 표시이름은 없어도 되지 않아? … 인보이스는 모두 공급업체에
  보내는 건 모두 공급업체 상품표시"*
  메일은 **공급업체가 받는 문서**라 그쪽 판매품목명이 주인공이다. 우리 내부 재고명은 싣지 않는다.
  표시명 = **`seller_product_name`** → (매핑 없을 때만) `ingredient.name` → `productIngredient.name` → `description`.
  해석은 단일 소스 `utils/sellerProductIdentity` 경유 — 화면·인쇄본·인보이스와 같은 답을 내야 한다.
  (위 괄호의 "판매자 상품명은 못 쓴다"는 **틀린 서술이었다** — 이름 컬럼이 링크 테이블에 없을 뿐,
  `ingredient_seller_product_id` → `seller_type` 으로 다리를 나눠 `supplier_products`/`brand_products`
  에서 read-time 조인하면 나온다. 이름은 실제로 다르다: 우리 `Beef Rib` ↔ 공급업체 `Australian Beef Rib`.)
  같은 라인의 **단위**(`purchase_order_items.unit`)도 함께 실린다.
- `utils/notificationTemplates.js` `poItemsTable(items, currency, poTotal)` —
  `sellerOrderReceivedEmail` · `poApprovalPendingEmail` 에 **`items` optional** 인자.
  **안 넘기면 기존과 동일 출력**(계약 불변, 실측 확인).
  20줄 상한 + `+ N more item(s)`. 표 하단 합계는 **PO 총액 우선**(헤더 `infoRow('Total')` 과 어긋나면 안 됨). HTML 이스케이프 적용.
- 호출부 3곳: `routes/purchase-orders-crud.js` · `services/poNotifications.js` ×2.
  `routes/seller-orders.js:327` 은 **구매자용 "Order Confirmed" 메일을 자체 html 로 조립**하는 곳이라 대상 아님(후속 후보).
- 라벨은 영어 하드코딩 — 기존 템플릿(`wrapTemplate(..., 'en')`, 'PO Number'/'Buyer'/'Status')과 같은 관례.

---

## 백로그 — 서버가 최소주문(min_order_quantity)을 강제하지 않음 (2026-08-30 관측, 미착수)

**실측**: 최소주문 0.5 로 등록된 판매상품을 **0.3 으로 발주하니 `201` 통과**했다.
화면(`NewPurchaseOrderPage`)은 "Min 0.5" 로 안내하지만 **서버 차단은 없다.** 기존 동작이며 단위주문 작업이 만든 것이 아니다.

**왜 이번(2단계) 범위가 아닌가 (Fable 판정)**:
- 재고 무결성과 무관하다 — 0.3 발주도 환산·입고·재고 반영은 정확히 돈다. **상거래 제약이지 정합성 구멍이 아니다.**
- 강제 방식이 **사업 결정 선행 사안**이다: 경고냐 차단이냐 / 담기에서 막느냐 제출에서 막느냐 / 판매자별 예외를 두느냐.
- 회귀 위험: `min_order_quantity > 1` 인 기존 행이 supplier_products 15 · ingredient_seller_products 11 (총 26건).
  서버 강제를 넣으면 **기존 pack 발주가 어디서 걸리는지 미측정**이다.

**착수 시 선행 조건**: ①경고 vs 차단 결정 ②적용 시점(담기·제출) 결정 ③기존 26건 영향 실측.
**현재 Fable 권고**: 안내만 유지. 실사용에서 문제가 생기면 그때 차단 도입.

---

## 백로그 — 판매자 라인 단위 품절/문제 처리 (2026-08-28 실측, 미착수)

**현재 실측**: 구매자는 `PurchaseOrderDetailPage` 에서 **주문 전체 취소**(사유 입력)만 가능하고 라인 단위 삭제 UI 가 없다.
판매자(`routes/seller-orders.js`)는 `confirm`·`ship`·`reject`(전체)·`deliver`·`tracking` 뿐 —
**라인 하나를 빼며 사유를 보내는 경로가 없다.**
백엔드 `PUT /purchase-orders/:id` 는 `draft`·`submitted` 편집을 허용하나(items 전체 교체) 화면 진입점이 없다.

**요구 (Irene 2026-08-28)**: "관리자가 다시 주문취소를 한개씩 못 빼나? 품절이나 문제 있을 때" ·
"판매자가 삭제하고 이유 보내야 하는 거 아니야?"
→ 같은 대화에서 **"지금 방식 문제 없어"** 로 닫혀 **백로그**로 둔다.

**착수 시 설계 방침 (예약)**
- ⛔ `purchase_order_items.discrepancy_*`(`short`·`damaged`·`wrong_item`·`pending`) **재사용 금지** —
  그건 **구매자가 입고 시 차이를 보고**하는 필드다. 판매자의 발송 전 처리와 의미가 다르다.
- 라인 상태 신설(예: `removed_by_seller` + 사유) + 구매자 알림 + **총액은 표준 재계산 경로로만**.
- 구매자 쪽 라인 단위 빼기 UI 도 같은 묶음으로.

---

# 📌 단위 주문(UoM) · 다중 공급업체 오더 방향 — 설계 (2026-08-30, Fable 점검)

> ## ⛔ Irene 컨펌 대기 3건 — 컨펌 전 구현 착수 금지
> 1. **팩 규격이 여러 개인 품목은 옵션이 아니라 판매상품을 따로 등록** (25kg 포대 / 5kg 백 각각). *Fable 권고: 이 방식으로.*
> 2. **`order_mode='measure'`(kg/g 직접 주문) 신설.** *Fable 권고: 도입.*
> 3. **다중 공급업체는 현 구조 유지 + 3곳 보완.** *Fable 권고: 유지+보완.*
> 4. **"RA 먼저" 3단계 진행** (2026-08-30 Irene 질문 "일단 레스토랑관리자에서 하고 나서 볼까?" → Fable 찬성). *Fable 권고: 아래 §4 순서로.*

## 배경 — Irene 질문 (2026-08-30 원문)

> 공급업체 상품이나 우리 재료 아이템에서 이름을 1kg라고 단위로 지정 안하고 주문을 kg이나 g으로 주문할 수 있을까?
> 수량으로 주문하는게 어려운 품목들이 있는데 이걸 어떻게 해야 할까? 옵션으로 가격을 넣어야 하지 않을까?
> 그리고 주문을 갯수로 할지 단위로 할지도 왔다갔다 하기도 해. 공급업체별로나 우리 운영별로 다르기도 하고
> 같은 재고인데 업체가 여러 개 연결된 경우 어떻게 주문되는 거야? 해당 공급업체별로 같은 아이템이 다 나오는 거야?

## 0. 결론 — 구조는 이미 준비돼 있다. 문제는 UX 미사용 + 정수 제약 + 모드 부재

| 이미 있는 것 | 위치 |
|---|---|
| 발주 수량 소수 저장 | `PurchaseOrderItem.quantity_ordered/received` **DECIMAL(10,2)** |
| 연결별 환산비 | `IngredientSellerProduct.unit_conversion` DECIMAL(10,4) — 입고·반품·미착 계산에 **실제 사용 중** |
| 판매자 단위·규격 | `SupplierProduct.unit` STRING(50) + `base_quantity` DECIMAL(10,2) |
| 프론트 소수 입력 | `utils/unitConversion.ts:62` `qtyStepForUnit()` — 연속 단위에 step 0.01 |

## 1. 실측 (dev, 2026-08-30 · ⚠ 운영 미확인 — classifier 로 운영 DB 조회 차단)

| 항목 | 값 |
|---|---|
| 활성 판매자 링크 | 58건 (conv=1: 53 / ≠1: 5) |
| **단위 불일치인데 conv=1** | **4건** — Black Pepper(g↔kg) · Egg(kg↔tray) · Test Oil(kg↔L) · Soy Sauce(g↔L)<br>⚠ 8/30 재측정에서 보고된 "6건" 은 **계측 오류**였다 — `seller_type` 미필터 조인이 brand 링크 id 를 `supplier_products` 와 **ID 충돌**로 오결합했다(51·52 는 실제로는 piece↔pcs 동의어). **실측은 4건 불변.** |
| `supplier_products.base_quantity <> 1` | **0건 / 38행** — 규격 필드 사용 이력 **0** |
| PO 라인 소수 수량 | **0건 / 127행** |
| `min_order_quantity > 1` | supplier_products 15 · ingredient_seller_products 11 |
| 공급업체 옵션 실사용 | 그룹 5 · 옵션 15 · 상품연결 6 |
| 다중 판매자 재료 | 1개=36종 / 2개=2종 / 3개=1종 / **5개=1종** |
| 이름에 규격 박은 흔적 | 2건 (`Premium Coffee Beans 1kg`, `Tiger Beer 338ml`) |

→ **기존 데이터 마이그 부담 없음.** 규격·소수 주문 모두 신설이라 깨끗하게 시작 가능.

## 2. 절단면 (Fable 확정, 7항목)

### ① 규격 표시 통일 — 이름 오염 종료
규격은 `SupplierProduct.unit + base_quantity` 가 담는다. 표시는 **"품목명 — {base_quantity}{unit}/{판매단위}"**.
이름에 "1kg" 을 박는 것은 카탈로그·카트가 `base_quantity` 를 표시하지 않아 생긴 **우회**였다.

### ② `order_mode` 2종 (판매상품 단위)
| 모드 | 수량 의미 | 가격 | 용도 |
|---|---|---|---|
| `pack` (기본, 현행) | 팩 갯수 | 팩당 | 현재 전부 |
| `measure` (신설) | **kg/g/L/ml 직접 입력(소수)** | 단위당 | 고기·생선·채소 등 갯수가 무의미한 품목 |

재고 환산은 기존 공식 그대로 `수량 × unit_conversion`. 입고는 `quantity_received` 가 이미 DECIMAL 이라 **실중량 입고가 그대로 된다**(업계 catch-weight 방식).
**모드는 판매상품에 붙는다** → 같은 재고아이템이라도 업체 A 는 팩, 업체 B 는 kg 주문이 자연히 공존한다("업체별로 다르다" 요구가 모델에서 그대로 수용됨).

#### ②-a 구현 결과 (2026-08-30 완료) — 어디까지 손댔고 어디를 남겼나

**응답에 규격·주문방식을 싣는 지점 (실측으로 필요를 확인한 곳만):**
- `routes/restaurants-ingredients.js` seller 직렬화 — **발주 화면이 실제로 쓰는 경로**
- `routes/ingredients.js` seller 직렬화 2곳
- `routes/supplier-directory.js` `/supplier-catalog` — 옵션 모달의 소수 수량 판정에 필요

**⛔ 미확장 1곳 (확인 불가 명시):** `routes/ingredients.js` 3번째 직렬화(라인 621 부근, `prod?.name` 사용).
발주 화면을 경유하지 않아 **필요를 실측으로 확인하지 못했다.** 혹시 몰라 확장하는 것은 최소범위 위반이므로 두었다.
→ **규격 표시가 비는 화면이 발견되면 이 지점부터 본다.**

**PO 라인 스냅샷 (2026-08-30 실측):** `purchase_order_items` 는 주문 시점의
`unit` · `unit_price` · `unit_conversion` · `quantity_ordered` · `description` 을 **스냅샷한다.**
`order_mode` · `base_quantity` 는 **스냅샷하지 않는다(컬럼 없음).**
→ 판매자가 나중에 주문방식·규격을 바꿔도 **과거 라인의 금액·수량·환산은 흔들리지 않는다.**
`specTextOf()`/`perUnitPriceOf()` 는 현재 판매자 값을 읽지만 **발주 화면(담기 전)에서만** 쓰이고
확정된 PO 라인 표시에는 쓰이지 않는다.

**판정 (2026-08-30 Fable): `order_mode`·`base_quantity` 스냅샷 컬럼을 추가하지 않는다.**
확정 라인을 그리는 세 표면(상세·인쇄·메일)이 판매자 현재값을 읽지 않으므로 **무결성 무영향**이고,
담기 전 화면이 현재값을 읽는 것은 "지금 팔리는 조건"을 보여주는 **맞는** 동작이다.
지금 아무 표면도 요구하지 않는 구조 확장이라 기각.
→ **확정된 발주 라인에 규격을 그리는 화면을 새로 만들 때만 재검토한다.**

**수량 표시 포매터 단일화 (2026-08-30):** 카트·staging·상세·인쇄 전부 `utils/unitConversion.ts` 의
`formatQuantity` 하나를 쓴다(`1.5` / `3` / `0.01` — 정수는 소수점 없음, 소수는 잔여 0 제거).
그전엔 카트만 로컬 포매터라 같은 수가 `1.5` / `1.50` 로 갈렸다. ⛔ 로컬 포매터를 새로 만들지 말 것.
⛔ 이 함수에서 **반올림 금지** — 1.5 를 2 로 만들면 입고·청구가 틀려 보인다.

### ③ 옵션으로 규격/가격 넣기 — **비권고 (채택 금지)**
옵션(`price_adjustment`)은 **`unit_conversion` 을 못 문다.** "1kg 옵션 / 5kg 옵션"으로 규격을 흉내내면 같은 카트행의 환산비 하나로 다른 규격이 입고돼 **재고 수치가 깨진다.**
→ **팩 규격이 여러 개면 판매상품을 여러 개 등록**한다(각자 가격·`base_quantity`·링크 환산비). 발주 라인이 상품이 아니라 **연결(`ingredient_seller_product_id`)** 을 무는 현 구조와 정확히 맞물린다.
옵션은 원래 용도(등급·브랜드·손질 방식 등 품질 변형)로만 유지.

### ④ 다중 공급업체 — 현 구조가 정석. 유지한다
현재 동작(실측):
- **재료 1개 = 화면 1행.** 판매자는 그 행 안의 배열(`MyIngredientRow.sellers`). **업체별로 같은 아이템이 여러 줄 나오지 않는다.**
- 카드 표시: 판매자 1개면 이름, 2개 이상이면 **"N vendors"** (`NewPurchaseOrderPage.tsx:1855`)
- 담을 때 기본 판매자: ①공급업체 필터 → ②`is_preferred` → ③`sellers[0]` (1321~1323행)
- 카트에서 드롭다운 변경 (2165행), 제출 시 **판매자별 PO 자동 분리** (`/purchase-orders/bulk`)
- 백엔드 자동 제안: `is_preferred DESC, unit_price ASC` 로 재료당 1판매자 (`purchase-orders-crud.js:415-427`)

**보완 3곳:**
1. `NewPurchaseOrderPage.tsx:1854` — 최소주문을 여러 판매자 **`Math.max`** 로 잡는다. **버그.** → **선택된 판매자의 `min_order_quantity` 기준**으로.
2. `min_order_quantity` **INTEGER → DECIMAL(10,2)** (`SupplierProduct`·`IngredientSellerProduct` 2곳). measure 모드의 "최소 0.5kg" 을 담으려면 필수.
3. 판매자 선택 시 **공통 단위 환산가(`unit_price ÷ base_quantity`, per-kg)** 를 나란히 표시 → 규격이 다른 업체 간 가격 비교가 가능해진다. 판매자 전환 시 기존 `conversionModal` 로 수량·환산 재확인.

### ⑤ 🔴 conv=1 생성 버그 + 불일치 감지 (지뢰)
`routes/restaurants-ingredients.js:381` 주석 원문: *"생성 흐름의 매핑은 원래 unit_conversion 을 **1 로 고정**했다(body 값 무시). 보존."*
→ 단위가 다른 링크가 conv=1 로 박히면 **1kg 입고가 재고 1g 으로 기록된다.** dev 에서 4건 실증.
- 조치 ①: 생성 흐름이 `unit_conversion` 을 **받게** 수정
- 조치 ②: 단위 불일치인데 conv=1 인 링크를 **감지·표시만** 하는 멱등 점검
- ⛔ **자동 백필 금지** — `tray→kg` 같은 건 기계가 추측할 수 없다. 사람이 값을 넣어야 한다.

### ⑥ `min_order_quantity` DECIMAL 확폭 (④-2 와 동일 작업)

#### ⑥-a 쓰기·읽기 경로 전수 (2026-08-30 발굴 · 백엔드 완료)

**컬럼만 DECIMAL 로 넓히면 소용없다** — `min_order_quantity` 를 만지는 지점이 **15곳**이었고 전부 `parseInt` 로 잘랐다.
그중 3곳은 절삭에 더해 `Number.isInteger` 검증으로 **0.5 를 400 으로 거부**하고 있었다(= 판매자가 입력 자체를 못 함).

**공용 헬퍼로 일원화한다. 삼항식 복붙 금지** — 다음 사람이 16번째 쓰기 경로를 또 잘라 넣는다.
- 백엔드: `dev-backend/utils/quantity.js` 의 `parseMinOrderQty(v, fallback = 1)`
- 프론트: `dev-frontend/src/utils/unitConversion.ts` (단위 유틸의 집 — 새 파일 만들지 말 것)
- 경계: `0.5→0.5 · 0.01→0.01 · 0→fallback · 음수/NaN/''/null→fallback`

| # | 위치 | 성격 | 상태 |
|---|---|---|---|
| 1 | `utils/catalogLink.js` mappingAttrs | 4벌 공통 쓰기 | ✅ 헬퍼 |
| 2 | `routes/ingredient-seller-products.js` POST | 쓰기 | ✅ 헬퍼 |
| 3 | `routes/ingredient-seller-products.js` PUT | 쓰기 | ✅ 헬퍼 |
| 4 | `routes/product-ingredients.js` | 쓰기 | ✅ 헬퍼 |
| 5·6·7 | `routes/supplier-directory.js` ×3 | 직렬화(읽기) | ✅ 헬퍼 — DB 0.5 를 1 로 보여주는 것도 데이터 거짓말 |
| 8 | `routes/supplier-directory.js` 쓰기 검증 | 쓰기 + 정수거부 | ✅ 헬퍼 + `> 0` 검증 |
| 9 | `routes/supplier-products.js` POST | 쓰기 + 정수거부 | ✅ 헬퍼 + `> 0` 검증 |
| 10 | `routes/supplier-products.js` PUT | 쓰기 + 정수거부 | ✅ 헬퍼 + `> 0` 검증 |
| 11 | `pages/Supplier/SupplierProductsTab.tsx` | 판매자 등록폼 | 2단계(2-1) |
| 12 | `pages/SupplierDirectory/SupplierProfilePage.tsx` | 폼 | 2단계(2-7) |
| 13 | `pages/FoodcourtGeneral/FoodcourtProductsTab.tsx` | 폼 (FG) | 2단계(2-7) — **절삭 제거만**, measure 개념 미도입 |
| 14 | `pages/BrandProductManagement/BrandProductsTab.tsx` | 폼 (BG) | 2단계(2-7) — **절삭 제거만** |
| 15 | `pages/RecipeManagement/IngredientsTab.tsx` | 외부 공급업체 등록 | 2단계(2-7) |

**층 절단과의 관계(Fable 확정):** 층은 *기능 노출(measure UI)* 을 가르는 것이지 *공용 컬럼의 쓰기 정합성* 을 가르지 않는다.
BG/FG 폼의 절삭 제거는 "measure 기능을 여는 것"이 아니라 "입력값을 자르지 않고 저장하는 것" — 3단계 침범이 아니다.

**참고:** `base_quantity` 에는 `parseInt` 절삭이 **한 곳도 없다**(전부 parseFloat) — 규격 쪽은 원래 소수 안전.

**옛 코드 소거 증명:** 백엔드에서 `parseInt` × `min_order` 조합 전수 grep **0건**.

### ⑦ `dev-frontend/src/pages/PurchaseOrders/SupplierOptionModal.tsx:268` 정수 강제 해제
> ⚠ 경로 정정(2026-08-30 실측): 이 파일은 `components/Suppliers/` 가 **아니라** `pages/PurchaseOrders/` 아래에 있다.
```js
onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
```
→ measure 모드에서 소수가 잘린다. **이 설계에 묶어서** 처리(단독 수정 금지 — 최소범위·묶음 원칙).

## 3. 착수 조건
- **Irene 컨펌 3건 회신** (문서 머리 참조). 회신 전 구현 착수 금지.
- 컨펌 후 DB 변경(`order_mode` 신설·`min_order_quantity` 확폭)은 **`expandEnum`/멱등 마이그 + `migrations.registry.json` 등록** 필수 (2026-08-30 ENUM 소거 사고 교훈).

## 4. 진행 순서 — 역할이 아니라 **층**으로 가른다 (2026-08-30 Fable 확정)

Irene 원문: **"설계가 완벽하게 할 수 있어? 일단 레스토랑관리자에서 하고 나서 볼까?"**

**왜 순수 역할 절단은 기각인가** — `SupplierProduct.order_mode`·`base_quantity`·`min_order_quantity` 는 **판매자(공급업체)가 등록하는 데이터**다.
공급업체 상품 하나를 RA·BG·FG 가 함께 산다. 역할별로 다른 값을 두려면 판매자 데이터를 이중화해야 하고,
그러면 **재고 환산(`수량 × unit_conversion`)이 깨진다.** 그래서 절단면은 역할이 아니라 층이다.

| 단계 | 범위 | 내용 | 화면 변화 |
|---|---|---|---|
| **1** | 전 역할 공용 기반 | `min_order_quantity` INTEGER→DECIMAL(2곳) · `order_mode` 신설(**기본 `'pack'` = 현행**) · conv=1 생성 버그 수정(§2-⑤) · 단위 불일치 감지 점검 | **없음** (기본값이 현재 동작) |
| **2** | 구매 UI = **RA 한정** + 판매자 등록 폼 | measure 수량 입력 · per-kg 비교 표시 · 규격 표시 통일 → `buyerEntity.type === 'restaurants'` 게이트. 공급업체 상품 등록에 규격·주문방식 입력 추가(공급업체가 설정해야 RA 가 쓴다) | RA 만 |
| **3** | BG/FG 확장 | RA 실사용으로 익은 뒤 **게이트 제거만** | BG·FG |

**게이트 방식**: 새 구조 도입 없이 기존 분기 패턴을 그대로 쓴다 — `NewPurchaseOrderPage.tsx` 의 1091행(`!== 'brands'`) · 1104행(`=== 'restaurants'`) · 1142행(`=== 'brands'`) · 1428행(`isBG`) 와 동일 형태.

**FG 발주 실사용 여부 미측정**은 이 순서 덕에 지금 알 필요가 없다(3단계에서 판단).

### 3단계 진행 상황 (2026-08-30, 물결 C 부분 완료 — 중단)

| 물결 | 내용 | 상태 |
|---|---|---|
| **C-1** | `brand_products.order_mode` ENUM('pack','measure') 신설 + `min_order_quantity` 확폭 (`scripts/migrate-brand-unit-order.js`, registry `deploy`) | ✅ dev 적용 · 운영 미적용 |
| **C-2** | 브랜드 링크 **직렬화** — 브랜드 상품의 `unit`/`base_quantity`/`order_mode` 를 판매자 항목에 실어 보내기 | ✅ 완료 |
| **D** | BG 상품 폼 라디오 + API `order_mode` 수용 | ✅ 완료 |

**C-2 가 왜 필요했는가**: 브랜드 판매자 항목이 무조건 `seller_unit=null · base_quantity=1 ·
order_mode='pack'` 으로 나갔다 — 세 곳이 브랜드 상품의 규격을 **읽고도 버렸다**.
`routes/restaurants-ingredients.js` 146행 · `routes/ingredients.js` 138행(BG 자기 재료) ·
624행(브랜드 공유 재료). 셋 다 공급업체와 같은 모양으로 맞췄다.
반증: 파일별로 되돌리면 해당 경로만 옛 증상으로 실패하고 공급업체 경로는 무영향 —
그 과정에서 `/restaurants/:id/ingredients` 의 **실제 핸들러가 `restaurants-ingredients.js`** 임도 확정했다.

**D 에서 나온 실결함**: `routes/brand-products.js` 가 `order_mode` 를 **아예 받지 않았다.**
폼에서 '무게로 주문'을 골라도 조용히 `'pack'` 으로 저장됐다. POST/PUT 구조분해 + `ORDER_MODES`
검증 + 모델 필드로 수정.

> **📌 3단계 전제 정정 (2026-08-30 실측)**
> 위 표의 3단계는 "**게이트 제거만**"이라고 적었으나 **제거할 게이트가 없었다.**
> 구매 UI 의 measure 수량 입력·규격 표시·per-unit 비교는 처음부터 **`seller.order_mode` 만 보고**
> 동작하며 `buyerEntity.type` 분기가 걸려 있지 않다(`NewPurchaseOrderPage.tsx` 실측).
> 즉 3단계의 실체는 **판매자 데이터(브랜드 2컬럼) + 직렬화**였고, 화면은 데이터가 오는 순간 열렸다.
> 1091·1104·1142·1428행의 `buyerEntity` 분기는 **장바구니 구성·구매자 축**에 관한 것이지
> 단위주문 게이트가 아니다.

**왕복 검증 (Fable 게이트 조건)**: BG measure 상품(kg) → 매장 재고(g) 연결 환산 1000 →
매장이 **2.5kg** 발주(금액 RM75, 소수 무손실) → 입고 → **재고 +2500g = 2.5 × 1000**. 6/6 통과·잔재 0.

🔴 **C-1 이 함께 없앤 지뢰**: `routes/ingredients.js` 두 곳이 이미 `attributes: [... 'order_mode']`
로 `BrandProduct` 를 조회하고 있었다. 컬럼이 없어서 **브랜드 재료에 브랜드 판매자를 연결하는
순간 그 화면이 500** 이었다(실측 `Unknown column 'order_mode' in 'field list'`).
dev·운영 모두 그런 연결이 0건이라 안 터졌을 뿐이다 — **운영은 배포 전까지 그대로 남아 있다.**

## 5. 설계 완성도에 대한 Fable 답변 (Irene 질문 "완벽하게 할 수 있어?")

"완벽"을 약속하지 않는다. 대신 근거를 든다:
- **규격 필드 사용 이력 0 · 소수 주문 이력 0** → 옮길 기존 데이터가 없다(마이그 부담 사실상 없는 신설)
- 스키마의 80%(소수 수량 DECIMAL · 링크 환산비 · 판매상품 단위)가 **이미 존재**한다
- 모든 변경이 **기본값 = 현재 동작**인 추가형이다
- 가장 위험한 지점(입고 시 재고 환산)은 **이미 검증된 공식**(`수량 × unit_conversion`, 반품 대칭 포함)을 그대로 탄다

약속하는 것은 **"단계마다 반증(고장주입) 포함 검증을 통과해야만 다음으로 가는 진행"** 이다.

---

# 📌 다음 섹션 설계 대상 — 수령·배송 양방향 확인 + 결제/현금 연결 + 판매자 재고 차감 (2026-09-01 Irene 지시, 미착수)

> Irene 원문(2026-09-01):
> - *"GIT에서 배송했다고 누르면 레스토랑에서 주문한 곳에서 업체가 배송완료했다고 한다고 표시하고 받은거 승인시켜야지."*
> - *"반대로 레스토랑관리자가 받았다고 누르면 브랜드제너럴이나 공급업체에서 받았다고 한다 배송완료로 할거냐고 안내해야지."*
> - *"주문할 때 `/pos/purchase-orders/staging` 여기에서 레스토랑관리자는 결제완료&배송완료 둘다 한번에 되게 처리할 수 있어야지."*
> - *"현금쓴거면 현금쓴거라고 알리게 구성해서 현금관리랑 연결해야지."*
> - *"배송완료할테니 제대로 적용되게 하라고."* / *"재고추적은 항상되는 거 아니야?"*

## 0. 현재 상태 실측 (2026-09-01, 운영)

| 요구 | 지금 |
|---|---|
| 판매자 배송 → 구매자 안내 | **절반.** 알림은 감(`seller_order_received`, `seller-orders.js:612`). 구매자 화면에 **"확인해서 수령 승인하라"는 안내가 없음** — 목록의 상태만 바뀐다 |
| 구매자 수령 → 판매자 안내 | **없음.** `purchase-orders-workflow.js` 에 알림 코드 **0곳**. 판매자는 구매자가 받았는지 모른다 |
| staging 결제·수령 한번에 | **없음.** staging 액션은 `Mark as Sent` 하나뿐 |
| 결제 정보 | **없음.** `purchase_orders` 에 결제 컬럼이 하나도 없다(`payment_status`/`payment_method`/`paid_at` 부재) |
| 현금관리 연결 | **없음.** `cash_movements.source` ENUM = `manual`/`settlement` 뿐이고 발주를 가리킬 `reference_id` 도 없다 |

### 🔴 0-1. 판매자(브랜드) 재고가 안 빠지는 근본 — **연결은 있다. 수량이 다른 목록에 있다**

> ⚠ 내 1차 진단("연결이 아예 없다")은 **틀렸다.** Irene 정정:
> *"깃 프로덕트를 팔았으면 당연히 깃의 재고에서 나가야지. 재고관리가 프로덕트랑 연결되는 거잖아.
> 레스토랑관리자는 메뉴랑 레시피랑 연결되는 거고 브랜드제너럴은 프로덕트랑 레시피랑 연결되는 거고
> 레시피 있고 없고에 따라 다르고 레시피 연결은 재료 연결된 것에서 빼는 거고"*

**Irene 확정 모델**

| 역할 | 체인 |
|---|---|
| 레스토랑 관리자 | 메뉴 → 레시피 → 재료 |
| 브랜드 제너럴 | **프로덕트 → 레시피 → 재료** |
| 레시피 **있으면** | 레시피에 **연결된 재료**에서 뺀다 |
| 레시피 **없으면** | **프로덕트에 연결된 재고**에서 뺀다 |

**연결 장치는 실재한다** — `syncProductToIngredients()`(`routes/brand-products.js`)가 판매상품을
`ingredients` 로 미러하면서 **`ingredients.brand_product_id`** 를 채운다.
실측: **brand 1 의 브랜드 재료 63건 중 63건 전부 `brand_product_id` 연결됨.**

**그런데 수량이 그 행에 없다.**

| 재고가 사는 곳 | 판매상품과 연결 | 실제 수량 |
|---|---|---|
| `ingredients` (brand_id, `brand_product_id` 연결) | **있음 (63/63)** | **전부 0.00** |
| `product_ingredients` (BG 재고, 발주 입고가 쌓이는 곳) | **참조 컬럼 자체가 없음** | 투명컵 #307 **18 pack** · 뚜껑 #308 **18 pack** |

- GIT 이 UGS 에서 발주 → 입고는 **`product_ingredients`** 로 들어간다(`mark-received`/`receive` 의 `product_ingredient_id` 분기).
- GIT 이 팔 때(ship) 보는 곳은 `brand_products.current_stock`(미사용, 0) — 또는 Irene 모델대로면
  연결된 `ingredients` 행(0). **어느 쪽이든 0이라 차감이 안 된다.**
- ⇒ **입고 버킷과 출고 버킷이 다르다.** 이것이 [[project_brand_stock_two_lists_split]]
  (브랜드 재고 목록 2개로 갈라짐 — 식자재 vs Stock Items)와 같은 뿌리다.

**추가 결함: 미러 행이 아예 없는 상품이 있다.**
PO-R10-20260827-001 의 6품목 중 **4개**(#192 사각통 · #199 소스통 · #223 비닐봉투 · #241 SC-800)는
`ingredients` 미러 행이 **0건**이다. 2026-08-28 UGS 일괄 등록 스크립트가 `syncProductToIngredients()` 를
부르지 않고 `brand_products` 행만 만들어서다([[reference_supplier_cost_copied_as_price]] 와 같은 사고 계열).
`sync_to_ingredients` 는 8개 전부 `1` 로 켜져 있는데도 미러가 없다 = **플래그와 실제가 어긋나 있다.**

## 1. 절단면 (설계 시 결정할 것)

### A. 판매자 재고 차감 — **버킷을 하나로 모은다** (연결을 새로 만드는 게 아니다)
1. **출고 차감 규칙을 Irene 모델대로 확정**
   - 레시피 **있으면** → 레시피에 연결된 재료에서 차감
   - 레시피 **없으면** → **프로덕트에 연결된 재고**에서 차감 (`ingredients.brand_product_id`)
   - ⛔ `brand_products.current_stock` 은 **재판매 경로에서 쓰지 않는다** (같은 물건 재고가 두 개 된다)
2. **입고와 출고가 같은 행을 보게 한다** — 지금은 입고가 `product_ingredients`, 출고가 `ingredients` 로 갈라져 있다.
   둘 중 **어느 쪽을 브랜드 재고의 단일 소스로 삼을지**가 이 설계의 핵심 결정.
   (⚠ `product_ingredients` 통합은 과거 Fable 이 기각한 적 있음 — [[reference_brand_stock_sharing]] 대조 필수)
3. **미러 누락 복구** — `sync_to_ingredients=1` 인데 미러 행이 없는 판매상품을 찾아 재동기화.
   등록 경로(스크립트 포함)가 반드시 `syncProductToIngredients()` 를 거치도록 강제.
4. **연결이 없거나 재고가 0인 상품은 출고 시 경고** — 지금은 조용히 0건 차감된다.
   📌 Irene: *"재고추적은 항상되는 거 아니야?"* → 사용자에게 켜고 끄는 스위치를 노출할 이유가 없다.
   `track_stock` 판정은 **재고 행의 값**을 따르고 판매상품 쪽 플래그는 재판매 경로에서 쓰지 않는다.

### B. 양방향 확인 UX
- **판매자 배송 → 구매자**: 목록·상세에 `업체가 배송완료로 표시했습니다` 띠 + **[수령 확인]** 강조 버튼
- **구매자 수령 → 판매자**: 알림 신설(`buyer_marked_received`) + 판매자 화면에 `구매자가 수령 확인했습니다 — 배송완료로 처리할까요?` 안내
  (현재 `RECEIVABLE_STATUSES` 에 `submitted` 가 포함돼 **판매자가 배송을 누르기 전에도 구매자가 먼저 받을 수 있다** → 이 안내가 실제로 필요)

### C. staging 즉시완료
발주 카드에 **[결제·수령 한번에]** 액션. 매장이 직접 사 오는 경우 `submitted → 수령완료 + 결제완료` 를 한 동작으로.
⚠ 되돌릴 수 없는 동작이라 확인창 필수(Submit All 과 같은 규율).

### D. 결제 정보 + 현금관리 연결
- `purchase_orders` 컬럼 신설: `payment_status` · `payment_method`(현금/계좌이체/카드/외상) · `paid_at`
- **현금 선택 시 `cash_movements` 출금(type=`out`) 자동 생성** → 열린 시프트에 귀속
  - `cash_movements.source` ENUM 에 `purchase_order` **추가**(⛔ expand-only — 기존 값 나열 금지, `expandEnum()` 사용)
  - 발주를 가리킬 `reference_id` 컬럼 추가
- **취소·환불 시 되돌리는 경로를 같이 만든다.** 없으면 현금이 어긋난다(마감 기대금액 갭 재발).

## 2. 규모 / 게이트
- **중~대.** DB 컬럼 4개 + ENUM 확장 + 알림 1종 + 화면 3곳 + 판매자 재고 연결 신설
- **운영 마이그레이션 포함** → 배포 안전 게이트(ENUM parity·migration registry) 대상
- 돈(현금관리) 접촉 → 검증 규율 4조항 전부 적용(고장주입 반증 포함)
