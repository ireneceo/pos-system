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

# 📌 다음 섹션 — 발주·재고 정합 개편 (2026-09-01 총정리 · 미착수)

> **설계·판단·결정은 Fable 이 한다** (Irene 지시 2026-09-01: *"설계 및 판단은 fable이 할게"*).
> 이 문서는 Opus 가 모은 **사실과 운영 실측**이다. §5 의 결정 항목은 **비워 둔 채** Fable 판정을 기다린다.

## 1. 어떻게 시작됐나

Irene 질문: *"위드민이 이거 주문했는데 GIT consulting 에서는 언제 재고가 빠져? 리시브 누르면?
아님 GIT에서 배송했다고 하면? 그럼 위드민이 자동으로 받은게 돼?"*

실측 답 → **안 빠진다.** 그 지점에서 재고·발주 구조 문제가 드러났고, Irene 이 요구사항을 추가했다.

대상 발주: **`PO-R10-20260827-001`** (with MIN Cafe rid 10 → GIT Consulting brand 1, `submitted`, RM195.70, 포장재 6품목)

## 2. Irene 확정 모델 (원문)

| # | 확정 내용 | 원문 |
|---|---|---|
| M1 | **"브랜드 재고"라는 개념은 없다. 재고는 각자 관리.** | *"브랜드 재고라는 건 없어!!! 재고는 각자 관리야."* |
| M2 | **BG 재고 = 프로덕트 + 프로덕트 레시피의 재료.** 브랜드 메뉴·레시피·재료는 **어떤 상관도 없다**(매장에 내려보내는 것) | *"브랜드 재료는 브랜드제너럴의 재고와 상관없어. … 상관있는 건 프로덕트와 프로덕트 레시피의 재료야."* / *"브랜드관련 레시피 메뉴 등등은 브랜드제너럴 재고와 어떤 상관도 없다고"* |
| M3 | **재고관리 루트는 2개. RA·BG 동일** | *"레시피가 있는 경우와 없는 경우 2가지 재고관리 루트가 있잖아. 이건 레스토랑 관리자랑 브랜드제너럴이랑 같은데?"* |
| M4 | 레시피 **있음** → 레시피 재료 = **재고아이템 여러 개**에서 차감 | *"프로덕트 레시피 재료나 메뉴 레시피 재료 = 재고아이템들(여러 개)"* |
| M5 | 레시피 **없음** → 프로덕트/메뉴 **자체가 재고아이템**이고 **수량이 거기 그대로 있어야 한다** | *"프로덕트나 메뉴 = 재고아이템 … 이런 경우에는 재고수량이 프로덕트나 메뉴에 수량이 그대로 있어야지"* |
| M6 | **재고추적은 항상 되는 것** — 켜고 끄는 스위치를 사용자에게 노출할 이유가 없다 | *"재고추적은 항상되는 거 아니야? 뭘 킨다는 거야?"* |
| M7 | **재고아이템 등록 입구 3개**(아래 §4-A) | *"재고 아이템은 이런 루트에서 등록되어야 해 …"* |
| M8 | 배송/수령은 **양방향 확인**이어야 한다 | *"GIT에서 배송했다고 누르면 … 받은거 승인시켜야지. 반대로 레스토랑관리자가 받았다고 누르면 … 배송완료로 할거냐고 안내해야지."* |
| M9 | staging 에서 **결제완료+배송완료 한 번에** | *"레스토랑관리자는 결제완료&배송완료 둘다 한번에 되게 처리할 수 있어야지"* |
| M10 | **현금 사용을 표시하고 현금관리와 연결** | *"현금쓴거면 현금쓴거라고 알리게 구성해서 현금관리랑 연결해야지"* |

## 3. 운영 실측 (2026-09-01)

### 3-1. 발주 상태 흐름과 재고가 움직이는 지점

```
submitted ──판매자 confirm──> confirmed ──판매자 ship──> shipped ──구매자 receive──> received
                                              │                          │
                                    판매자 재고 차감              구매자 재고 증가
```

| 동작 | 재고 | 근거 |
|---|---|---|
| 판매자 **ship** — 공급업체 | `SupplierProduct.current_stock` 차감 ✓ | `seller-orders.js` ship, `seller_type='supplier'` 분기 |
| 판매자 **ship** — 브랜드, 레시피 **있음** | 레시피(BOM)로 `ProductIngredient` 차감 ✓ | 같은 파일 `seller_type='brand'` 분기 |
| 판매자 **ship** — 브랜드, 레시피 **없음** | `brand_products.current_stock` 차감, **`track_stock` 꺼져 있으면 건너뜀** | 같은 분기 |
| 구매자 **receive / mark-received** | 구매자 재고 증가 (`product_ingredient_id` 또는 `ingredient_id`) | `purchase-orders-workflow.js` |
| 구매자 **mark-shipped** | **재고 변화 없음** (상태만) | 같은 파일 |

- **`RECEIVABLE_STATUSES = ['submitted','confirmed','shipped','in_transit','delivered','partial_received']`**
  → **판매자가 배송을 누르기 전에도 구매자가 먼저 수령할 수 있다.**
- 판매자 ship 은 상태만 바꾼다. **구매자가 자동으로 "받은 것"이 되지 않는다.**

### 3-2. GIT 포장재 6품목 — 차감 0건

| 품목 | 프로덕트 | 레시피 | track_stock | 프로덕트 수량 |
|---|---|---|---|---|
| MTP 플랫 뚜껑 | #186 | 없음 | **0** | 0 |
| MTP 360 투명컵 | #185 | 없음 | **0** | 0 |
| TK 1000 사각통 | #192 | 없음 | **0** | 0 |
| 3.25OZ 소스통 | #199 | 없음 | **0** | 0 |
| PE 비닐봉투 | #223 | 없음 | **0** | 0 |
| SC-800 원형 대 | #241 | 없음 | **0** | 0 |

**실제 수량은 별도로 만든 재고아이템에 있다** — `product_ingredients`(owner 23):
투명컵 **#307 18 pack** · 뚜껑 **#308 18 pack** (`track_stock=1`).
GIT 이 UGS 에서 **재고아이템으로 사서** 거기에 쌓였고, **파는 프로덕트는 별개 객체**라 수량이 0이다.
⇒ **같은 포장재가 물건 두 개로 갈라져 있다.**

- 프로덕트명 ↔ 재고아이템명 일치: **6개 중 2개뿐**(나머지는 프로덕트가 공급업체식 이름) → **자동 이름매칭 불가**
- `product_ingredients` 에 프로덕트를 가리키는 컬럼 **없음**
- **프로덕트·메뉴를 저장해도 재고아이템이 생성되지 않는다** — `ProductIngredient.create` 는 재고 라우트에만,
  `routes/menu.js` 에는 `Ingredient.create` 자체가 없다 ⇒ **프로덕트 ↔ 재고아이템 1:1 이 성립한 적이 없다**

> 참고: `inventoryDeductionService.js:194` 의 *"⛔ 확장 금지(레거시). `products.current_stock` 는
> 재고아이템과 별도 저장소라 이원화된다"* 는 **같은 물건을 별도 재고아이템으로도 만들면 이원화된다**는
> 경고다. M5 에 따르면 **저장 위치(프로덕트 자체 수량) 자체는 맞다.**

### 3-3. 같은 재고아이템에 공급처 여러 개

| | 공급처 1개 | **2개 이상** |
|---|---|---|
| BG 재고아이템 | 272건 | **13건 (4.6%)** |
| 매장 재고 | 329건 | **55건 (14.3%)** |

- 공급처 2개 이상인 55건 중 **43건(78%)은 가격이 서로 다르다**
- 실제 사례(전부 with MIN): 새우 IQF 31/40 **공급처 5개 `13.90~33.00`** · 꼬막살 4개 `0.00~10.00` ·
  양파 3개 `3.20~9.00` · 오징어링 3개 `0.30~13.00`
- **`is_preferred` 가 이미 쓰이고 있다** — 활성 링크 `is_preferred=1` **611건** / `0` 141건.
  다중 공급처 항목들은 **전부 선호 1개씩** 지정돼 있다
- ⚠ 가격 `0.00` 인 링크가 여럿 섞여 있다

### 3-4. 배송·수령 안내

| 방향 | 알림 | 화면 안내 |
|---|---|---|
| 판매자 → 구매자 (confirm/reject/ship/deliver) | **있음** (`seller_order_received`, `seller-orders.js` 4곳) | **없음** — 목록 상태만 바뀐다 |
| 구매자 → 판매자 (receive) | **없음** — `purchase-orders-workflow.js` 에 알림 코드 **0곳** | 없음 |

### 3-5. 결제 / 현금관리

- `purchase_orders` 에 **결제 관련 컬럼 0개** (`payment_status`/`payment_method`/`paid_at` 전부 없음)
- `cash_movements` = `shift_id, restaurant_id, type(in|out), amount, reason, source, created_by…`
  - `source` **ENUM = `manual` | `settlement`** — 발주를 가리킬 값이 없다
  - 발주를 참조할 `reference_id` **없음**
  - 실사용: `manual/in` 6건 · `manual/out` 4건
- staging 페이지 액션: **`Mark as Sent` 하나뿐**

### 3-6. 부수 관찰

- 판매상품을 매장 공유 목록으로 미러하는 `syncProductToIngredients()` 가 있고 `ingredients.brand_product_id` 로 잇는다.
  brand 1 은 63/63 연결돼 있으나, PO 6품목 중 **4개는 미러 행이 아예 없다**
  (`sync_to_ingredients=1` 인데 미러 0 — 2026-08-28 UGS 일괄 등록 스크립트가 sync 를 호출하지 않았다).
  ⚠ 단 이 미러는 **BG 재고가 아니다**(M2). 매장 노출 문제로만 다룬다.
- SKU·재고 코드 채번이 **건수 기반**이라 삭제 후 재등록 시 번호가 재발급된다 → [[reference_count_based_code_numbering]]

### 3-7. P0 실측 결과 (2026-09-01 21시 · 운영 읽기 전용 · Opus 실행)

측정 스크립트는 운영에 아무것도 쓰지 않았고 `process.exit(0)` 로 끝났다(좀비 방지).
⚠ **`products` 테이블에는 `deleted_at` 컬럼이 없다** — §6-A-1 의 `deleted_at NULL` 조건은 적용 불가라 뺐다.

**6-A-1. 레시피 없는 비세트 프로덕트 (운영)**

| 범위 | 건수 | `track_stock=1` | `current_stock>0` |
|---|---|---|---|
| RA `products` 11개 매장 합계 | **721** | **0** | **0** |
| BG `brand_products` 오너 2명 합계 | **89** | **0** | **0** |

매장별 상위: with MIN Cafe(rid10) 227 · The Fire(16/24/25) 각 117 · K-DINE IPC(rid8) 87 · Seoul Garden BBQ(rid13) 32.
BG: help@gitconsulting.group(user23) **85** · demo-brand(user24) 4.
⇒ **레시피 없는 프로덕트 810개 전부가 재고추적 꺼짐·수량 0.** 프로덕트 쪽에 수량이 산 적이 없다는 뜻이고,
Q1 의 "수량은 재고아이템에" 는 기존 데이터를 옮길 일이 사실상 없다.

**6-A-2. 이름+단위 일치 후보 / 충돌**

| 범위 | 후보 0개 | 정확히 1개 | 2개 이상 |
|---|---|---|---|
| RA 프로덕트 ↔ `ingredients` | 720 | **1** | 0 |
| BG 프로덕트 ↔ `product_ingredients` | 85 | **4** | 0 |

**양쪽 다 수량>0 인 충돌: 0건.** ⇒ 자동 이관에서 이중계상이 날 행이 운영에 없다.
자동으로 이을 수 있는 것은 5건뿐이고, 나머지는 짝이 아예 없다(= 재고아이템으로 등록된 적 없는 프로덕트).

**6-A-3. GIT 짝 후보표 — GIT 은 매장이 아니라 브랜드다**

`restaurants` 에 GIT 이름은 없다. GIT 계정은 `users` 11(irene@gitconsulting.group)·**23(help@gitconsulting.group)**,
브랜드는 `brands` 1 `with MIN` · 2 `K-DINE with MIN`(둘 다 owner_id=23). 실물은 owner 23 쪽에만 있다
(브랜드 프로덕트 145건 중 레시피 없음 85 / 재고아이템 288건).

**자동으로 이을 수 있는 4건 (이름·단위 완전 일치, 프로덕트 수량 0 이라 충돌 없음)**

| 브랜드 프로덕트 | 재고아이템 | 수량 |
|---|---|---|
| P#181 (SC-450) 450ML Round Container (국물판매용 원형 소) | #304 동일명 | 5 pack |
| P#182 (SC-800) 800ML Round Container (국물판매용 원형 대) | #305 동일명 | 7 pack |
| P#185 MTP 360 (12OZ) PP Plastic Cup (플라스틱 투명컵) | #307 동일명 | 18 pack |
| P#186 MTP 12/16/22 FL5 PET Flat Lid (플라스틱 투명컵 뚜껑) | #308 동일명 | 18 pack |

**짝이 없는 포장재 프로덕트 (Irene 확인 필요 후보)** — P#44 RECLOSABLE LID 12OZ BLACK (50PCS/PKT) ·
P#187 GOODMAID DISH WASH 900ML · P#188 THERMAL ROLL 80MM · P#189 KITCHEN TOWEL V/P 2PLY ·
P#190 PLASTIC PERFORATED ROLL BAG. 전부 프로덕트 단위가 `null` 이거나 재고아이템에 같은 이름이 없다.
GIT 재고아이템 중 수량이 있는 것은 23종(64 pack 종이밥그릇 ~ 4 pack 밥그릇(S))이고 **전부 `track_stock=1`**.
⇒ 갈라짐의 실체는 "재고아이템에는 있고 프로덕트에는 0" 이며, 이름이 다른 짝은 사람이 찍어야 한다.

**6-A-4. `track_stock=0` 인데 수량>0 (게이트 제거 시 차감이 시작될 행)**

운영 전체에서 **`ingredients` 1건뿐**(#65 Bean Sprouts 10kg, rid13) · `product_ingredients` 0 · `products` 0.
⇒ Q5(스위치 제거)로 갑자기 차감이 시작되어 놀랄 행이 사실상 없다.

**6-A-5. 공급처 링크**

활성 링크가 있는 품목 **670** · 링크 2개 이상 **68**(10.1%) · 그중 **선호 개수 ≠ 1 인 것 0건**.
**선호 링크인데 단가 0/NULL: 60건** (예: isp#48~54 등 supplier:13 다수, isp#18 supplier:5).
⇒ Q3 의 "선호 정확히 1개" 는 이미 지켜지고 있고, Q4 의 "가격 0 은 원가 미입력으로 표시" 가 걸릴 대상이 60건이다.

**6-A-6. 열린 시프트**

`closed_at IS NULL` 인 시프트가 있는 매장 **3개**(rid 10 · 13 · 25), **매장당 정확히 1개**(위반 0).

**6-A-7. 선수령 (판매자 출고 누락 의심)**

`status='received' AND shipped_at IS NULL` = **8건**, `received` **전체가 8건**이므로 **100%**.
판매자별: supplier:35 2건 / brand:1 · supplier:13 · supplier:41 · supplier:7 · supplier:10 · supplier:15 각 1건.
⇒ 운영에서 수령된 발주는 **하나도 판매자 출고를 거치지 않았다.** Q6 는 예외 처리가 아니라 현재의 유일한 경로다.


## 4. Irene 요구사항 (구현 대상)

### A. 재고아이템 등록 루트 — 입구 3개, 결과는 하나 (M7)

| 시작점 | 함께 등록 | 그 자리에서 추가로 받는 정보 |
|---|---|---|
| **① 프로덕트 / 메뉴 등록** | → **재고아이템** 함께 등록 | 재고 단위·기준수량 |
| **② 공급업체 상품 등록** | → **재고아이템** 으로도 등록 | 우리 쪽 재고명·단위 |
| **③ 재고아이템 등록** | → **공급업체 상품** + **프로덕트/메뉴** 로도 등록 | **공급업체 선택, 없으면 그 자리에서 신규 등록** · 프로덕트/메뉴 연결 시 **판매가 등** |

대상 테이블

| 역할 | 재고아이템 | 판매물 | 공급업체 상품 | 연결 |
|---|---|---|---|---|
| BG | `product_ingredients` | `brand_products` | `supplier_products` | `ingredient_seller_products` |
| RA | `ingredients`(restaurant) | `products` | `supplier_products` | `ingredient_seller_products` |

⛔ 공급업체 원가를 판매가 자리에 복사 금지 ([[reference_supplier_cost_copied_as_price]])

### B. 재고 차감 정합 (→ 판정은 §5 Q1·Q5 참조)
- 레시피 **있음** → 레시피 재료(재고아이템들)에서 차감 *(현행 유지)*
- 레시피 **없음** → 프로덕트/메뉴 **자체 수량**에서 차감 *(현행 유지)* +
  **입고가 그 수량으로 들어가게** 고친다 *(현재 별도 재고아이템으로 들어간다 — 이것이 결함)*
- 기존에 재고아이템으로 쌓인 수량을 **해당 프로덕트로 이관** 후 중복 정리
- `track_stock` 게이트 재검토 (M6)

### C. 배송·수령 양방향 확인 (M8)
- 판매자 배송 → 구매자 화면에 *"업체가 배송완료로 표시했습니다"* + **[수령 확인]**
- 구매자 수령 → 판매자에게 알림 + *"구매자가 수령 확인했습니다 — 배송완료로 처리할까요?"*

### D. staging 결제·수령 한번에 (M9)
`/pos/purchase-orders/staging` 에서 `submitted → 수령완료 + 결제완료` 를 한 동작으로. 되돌릴 수 없으므로 확인창 필수.

### E. 결제 정보 + 현금관리 연결 (M10)
- `purchase_orders` 에 `payment_status` · `payment_method`(현금/계좌이체/카드/외상) · `paid_at`
- 현금 선택 시 `cash_movements` 출금(`type='out'`) 자동 생성 → 열린 시프트 귀속
  - `source` ENUM 에 `purchase_order` **추가** (⛔ **expand-only** — `expandEnum()` 사용, 목록 하드코딩 금지)
  - 발주 참조 `reference_id` 추가
- **취소·환불 시 되돌리는 경로 필수** (없으면 마감 기대금액이 어긋난다)

## 5. Fable 판정 (2026-09-01 · Irene 승인 대기 · P0 실측 및 Irene 반박 반영 v2)

> 판정자 Fable. Irene 이 승인하면 §6 순서로 착수한다. Irene 이 뒤집으면 그 항목만 다시 판정한다.
> **v1 판정(수량을 별도 재고아이템으로 옮기고 링크로 잇는 안)은 철회.** Irene 반박 *"제대로 구조자체는 되어 있던 거 아니야?"* 가 맞다 —
> 코드에 M3·M5 구조가 이미 있다(`inventoryDeductionService.js:194~` · `seller-orders.js:435~`). v1 은 같은 물건을 두 행으로 두는 이원화를 구조로 굳히는 과설계였다.
> §4-B 의 *"레시피 없음 → 프로덕트 자체 수량에서 차감(현행 유지)"* 는 **그대로 맞다.** 고칠 것은 **입고**와 **스위치** 둘이다.

### 5-1. 결정 요약

| # | 결정 | 근거 |
|---|---|---|
| **Q1** | **구조 유지.** 레시피 없는 프로덕트/메뉴는 **자기 자신이 재고아이템, 수량은 프로덕트에**(`products.current_stock` / `brand_products.current_stock`). 링크 컬럼·별도 재고아이템 행 **만들지 않는다.** 고칠 것은 입고: 발주 라인(`purchase_order_items`)과 공급처 링크(`ingredient_seller_products`)에 **프로덕트를 가리키는 자리가 없어서** 사온 수량이 프로덕트에 못 들어가고 별도 재고아이템으로 갔다. → 두 테이블에 `product_id`(RA)·`brand_product_id`(BG) 추가, **수령이 프로덕트 수량을 올리고**, 발주 화면 "My Stock Items"·재고 목록에 **레시피 없는 프로덕트를 재고아이템으로 보여** 공급처를 붙이고 살 수 있게 한다. | 판매 차감·판매자 출고 차감 둘 다 이미 M5 대로다. 안 빠진 원인은 ①`track_stock` 스위치(Q5) ②입고가 프로덕트로 못 들어감 — 둘뿐. |
| **Q1-부속** | 한 물건이 **재료이면서 그대로도 파는** 경우(병음료를 칵테일 재료로도, 낱개로도)는 새 개념 없이 **재료 ×1 레시피**로 푼다 — 수량은 재료 한 곳에만 산다. 입구 ③ "재고아이템을 프로덕트로도 등록"이 만드는 것이 이것이다. | M4·M5 두 루트만으로 닫힌다. |
| **Q2** | **이관 = 합치기(merge).** GIT 자동 짝 4건(P#181←#304 5 pack · P#182←#305 7 pack · P#185←#307 18 · P#186←#308 18)은 재고아이템 수량을 **프로덕트 수량으로 옮기고**, 그 재고아이템의 공급처 링크(UGS)를 프로덕트로 옮기고, 재고아이템은 **비활성(삭제 아님)**. 과거 발주 라인 이력은 손대지 않는다(스냅샷). 짝 없는 5건(P#44·#187·#188·#189·#190)은 옮길 수량이 없으니 **단위만 채운다**(Irene 확정, 미답이면 pack). 그 외 800여 개는 손대지 않는다 — 프로덕트가 곧 재고아이템이고 수량 0 이 사실이다. | P0: 충돌 0, 짝 5. 합치면 "같은 물건 두 개"가 실제로 하나가 된다. |
| **Q3** | **다중 공급처 유지.** 등록 입구(②③)에서는 공급처 **하나만** 고르고, 추가는 지금처럼 재고아이템/프로덕트의 공급처 목록에서 붙인다. **선호 공급처는 항상 정확히 1개**(하나를 선호로 찍으면 나머지 자동 해제, 서비스 함수 한 곳). | 매장 재고 14%(55건)가 쓰고 새우 13.90~33.00 처럼 가격 비교가 존재 이유. 복잡함은 등록 입구에 있고 입구는 하나만 고르게 하면 단순하다. P0: 링크 2개 이상 68건 전부 선호 1개 — 이미 지켜지고 있다. |
| **Q4** | **원가 = 선호 공급처 링크 가격.** 평균가·최근가 없음. 가격 0 링크는 **"원가 미입력"으로 표시**(0 으로 조용히 계산하지 않는다) — 재고 목록·레시피 원가 합계에 "미입력 N개". 링크는 지우지 않는다. | [[reference_cost_two_paths]] 그대로. P0: 대상 60건(supplier:13 다수). |
| **Q5** | **`track_stock` 게이트 제거 — 재고추적은 항상.** 차감·출고·입고 4곳의 `if (!track_stock) skip` 삭제. 컬럼은 남기되(드롭 금지) 마이그로 전부 1, UI 토글 숨김, 발주 화면 `showUntracked` 필터 제거. 안 쓰는 품목은 `is_active` 로 끈다. "관리 대상만 보기"는 목록 필터(수량>0·최소치 설정)이지 스위치가 아니다. | M6. 저재고 알림은 이미 `min_stock>0` 일 때만 뜬다(`inventory-core.js:134`). GIT 포장재가 안 빠진 직접 원인. P0: 제거로 차감이 새로 시작되는 행은 운영 전체 **1건**(#65 Bean Sprouts 10kg, rid13). |
| **Q6** | **구매자 선수령 허용 유지 + 판매자 쪽 구멍 봉합.** 구매자가 배송 전에 수령하면 판매자에게 알림 + *"구매자가 수령 확인했습니다 — 출고(배송완료) 처리할까요?"* 표시, **판매자 출고 처리는 `shipped_at` 이 비어 있는 동안 상태와 무관하게 1회 허용**(재고 차감은 그때 1번). 상태는 뒤로 안 돌린다. 과거 8건 소급 차감 안 함. | 판매자 재고 차감이 ship 에만 붙어 있어 선수령이면 영영 안 빠진다. **P0: 운영 수령 8건 중 8건(100%)이 판매자 출고 없이 수령** — 예외가 아니라 유일한 경로. M8 원문이 정확히 이 처리. |
| **Q7** | **이 개편에서 제외 — 별건(K-DINE 메뉴).** 정식 해법은 **주문 조건 가격 규칙**(주문에 식사가 있으면 음료 RM3 자동). 그때까지 임시는 **메뉴 2줄(같은 레시피 연결)**. | 2줄은 직원이 골라야 해 실수, 옵션은 주문 전체를 못 본다. 임시 2줄은 재고가 같은 레시피로 빠져서. 수동 할인은 PIN 을 탄다. |

### 5-2. 정합 절단면 (Q1·Q5 — 구조 유지, 결함 2개 수정)

- **컬럼 추가(입고 타깃)** — `purchase_order_items.product_id`·`brand_product_id`, `ingredient_seller_products.product_id`·`brand_product_id`. 기존 `ingredient_id`/`product_ingredient_id` 와 **넷 중 정확히 하나**(서비스 계층 검증 + 인스펙션 불변식).
- **수령이 프로덕트 수량을 올린다** — `purchase-orders-workflow.js` receive·mark-received 에 product/brand_product 분기(수량 += quantity × unit_conversion; `InventoryTransaction` 은 이미 `product_id`/`brand_product_id` 를 받는다). 반품·차이(discrepancy) 도 같은 분기.
- **`track_stock` 게이트 제거(4곳)** — `inventoryDeductionService` 프로덕트 분기 · `seller-orders.js:440` · receive 2곳. 수량이 이미 0 이면 부족분만 세고 0 짜리 거래 행은 쓰지 않는다(노이즈 방지).
- **재고아이템으로 보이기** — 발주 화면 "My Stock Items" 와 재고 목록에 **레시피 없는 프로덕트 탭/구분** 추가(재료와 섞지 않고, **숨기지도 않는다** — 8/28 숨김 사고 재발 금지). 여기서 공급처를 붙이고 담아서 산다.
- **원가** — 레시피 없는 프로덕트 원가 = 선호 공급처 링크 가격(Q4). `products.unit_cost` 는 그 값을 읽어 채운다(쓰기 소스는 링크 하나).
- **원가 복사 금지** — 입구 ③에서 프로덕트를 같이 만들 때 **판매가는 필수 입력·원가로 미리 채우지 않는다**([[reference_supplier_cost_copied_as_price]]).
- **입구 ①** — 레시피 없는 프로덕트는 저장 즉시 재고아이템(추가 행 없음). 폼의 재고 단위·기준수량 필드(BG 는 8/22 에 있음 `brand-products.js:853`, RA 폼은 P3 에서 확인·보강)가 "함께 등록"이다.
- **입구 ②** — 공급업체 상품 등록/연결 때 우리 쪽 재고아이템을 **재료 또는 판매 프로덕트** 중 하나로 만들거나 고른다(`catalogLink.connectExisting` 에 product 타깃 추가).
- **입구 ③** — 재료 폼에서 공급업체 선택/즉석 신규(`POST /external-suppliers` 있음) + "프로덕트로도 등록"(판매가 필수) → 프로덕트 + **재료 ×1 레시피** 자동 생성(Q1-부속).

### 5-3. 결제·현금관리 절단면 (M9·M10)

- `purchase_orders` +`payment_status ENUM('unpaid','paid','refunded')` 기본 unpaid · `payment_method ENUM('cash','bank_transfer','card')` · `paid_at` · `paid_by_user_id` · `cash_movement_id`(되돌리기용). **"외상"은 별도 방법이 아니라 unpaid 상태**(나중에 `/pay`).
- `cash_movements` — `source` 에 `purchase_order` **expandEnum 으로 추가** · `purchase_order_id` 컬럼 추가(범용 reference_id 대신 명시 FK).
- **현금 규칙** — 구매자가 **매장(restaurant)** 이고 **열린 시프트가 있을 때만** 드로어 출금(`type=out`) 을 그 시프트에 만든다. 시프트가 없으면 결제는 기록하되 드로어 출금은 안 만들고 *"시프트가 열려 있지 않아 드로어 출금으로 기록되지 않았습니다"* 안내(막지 않는다 — 시프트 밖 지출은 드로어 돈이 아니다). BG 구매자는 드로어가 없으니 결제 기록만.
- **되돌리기** — 발주 취소(또는 명시 결제취소)는 **삭제가 아니라 반대 방향 `in` 이동을 그 시점의 열린 시프트에** 만든다(감사 기록 유지). 열린 시프트가 없으면 `refunded` 만 기록 + 안내. 마감 기대금액 공식(개시+현금매출+Σ입금−Σ출금)이 그대로 맞는다.
- **한 번에 처리(D)** — `POST /purchase-orders/:id/receive-and-pay` **단일 트랜잭션**. 프론트가 receive → pay 두 번 부르는 방식 금지(중간 실패 = 받았는데 미결제). receive 본체를 `services/purchaseOrderReceive.js` 로 빼서 `/receive` 와 공유(복제 금지). 결제 본체 `services/purchaseOrderPayment.js`(`recordPayment`/`reversePayment`) 한 곳.
- **화면** — staging(현재 `?status=draft` 만 조회) 에 "받을 발주(수령 가능 상태)" 블록 추가 → [수령+결제 완료] / [수령만]. 발주 상세에도 같은 버튼. 확인창은 재고 증가·결제 기록·드로어 출금(해당 시) 세 효과를 명시.

### 5-4. 양방향 확인 절단면 (M8 · Q6)

- 판매자 → 구매자: 알림은 있으니 **화면 단서만** — 구매자 발주 목록 행에 *"업체가 배송완료로 표시"* 배지 + [수령 확인].
- 구매자 → 판매자: 알림 카테고리 `buyer_received` 신설(NOTIFICATION_CATEGORIES) + 판매자 주문 목록에 *"구매자 수령 확인 — 출고 처리할까요?"* 강조 + [출고 처리](`shipped_at IS NULL` 동안 1회, 재고 차감 그때).

## 6. 규모 · 착수 순서 · 게이트 (Fable 확정 v2)

**대.** 입고 타깃 컬럼 4(PO 라인 2 + 공급처 링크 2) + 결제 컬럼 5 + cash_movements 컬럼 1 + ENUM 확장 1 + 등록 흐름 3화면 + 알림 1종 + 수령/반품/차이 프로덕트 분기 + 게이트 제거 4곳 + GIT 합치기 이관. 운영 마이그레이션 포함, 돈·재고 무결성 접촉.

### 착수 순서 — 단계마다 따로 배포, 따로 게이트

| 단계 | 내용 | 왜 이 순서 | 게이트 |
|---|---|---|---|
| **P0 실측** | 완료(§3-7) | — | — |
| **P1 정합** | 입고 타깃 컬럼 4 · 수령/반품/차이 프로덕트 분기 · `track_stock` 게이트 제거(+전부 1) · 발주 화면/재고 목록 "레시피 없는 프로덕트" 탭 · 마이그(GIT 합치기 4 + 단위 5, 나머지 미접촉) · 인스펙션(넷 중 하나 불변식) | **GIT 이 팔아도 안 빠지는 결함 자체.** 구조는 그대로, 막힌 입고와 스위치만 연다 | Fable 전체 게이트(재고 무결성·운영 마이그). 고장주입: 게이트 제거를 되돌리면 데모 매장 판매 차감 테스트가 실패해야 한다 |
| **P2 양방향** | `buyer_received` 알림 · 판매자 [출고 처리](`shipped_at` 1회) · 구매자 배지+[수령 확인] | 운영 수령 100% 가 판매자 출고 없이 일어난다 — 판매자 차감이 한 번도 안 도는 경로가 현재의 정상 경로라 P1 다음으로 급하다 | 경량 + 출고 2회 눌러도 1회만 차감 반증 |
| **P3 입구 3개** ✅ 2026-09-02 개발서버 | ① RA 프로덕트 폼 재고 필드 확인·보강 · ② 공급업체 상품 → 재료/프로덕트 선택 · ③ 재료 폼에서 공급업체(즉석 신규)+프로덕트(판매가 필수, 재료×1 레시피 자동) | P1 이 연 입고 경로를 화면에서 닫는다 | 경량(UI) + 원가→판매가 복사 금지 반증 1회 |
| **P4 결제·현금** | 결제 컬럼·ENUM 확장·`receive-and-pay` 단일 트랜잭션·드로어 출금·되돌리기·staging 블록 | 돈은 마지막에, 자기 게이트로 | Fable 전체 게이트(돈·ENUM parity·registry). 고장주입: 되돌리기를 빼면 취소 후 마감 기대금액 테스트가 실패해야 한다 |

### P4 착수 전 확인 1건
- `cashier_shifts` "매장당 열린 시프트 1개"가 **코드로 강제되는지**(open 라우트 중복 방지) 확인. 없으면 `recordPayment` 가 열린 시프트 2개를 만나면 400 으로 거절(임의 선택 금지). P0: 현재 열린 시프트 매장 3개(rid 10·13·25), 각 1개.

### 게이트 공통
- 매 단계 `verify-all` + `check-sensitive-diff` + 인쇄 보호파일 무접촉(이 개편은 인쇄 파일을 열 이유가 없다).
- 마이그는 전부 멱등 + `migrations.registry.json` 등록(P1 GIT 합치기 = `manual`, 컬럼·ENUM = `deploy`). ENUM 은 `expandEnum()` 만.
- 설계와 다른 판단이 필요해지면 **즉시 중단하고 Fable**.


---

## 7. P3 구현 결과 (2026-09-02 · 개발서버)

설계 §5-2 의 "입구 ①②③" 을 화면까지 닫았다. **구조 변경 없음** — P1 이 연 입고 경로에
화면 입구만 붙였다. 마이그레이션 0건, 운영 DB 변경 0건.

### 입구 ① 프로덕트/메뉴 폼 (2026-09-02 커밋 `2f902220`)
메뉴 폼에 `min_stock` 이 없어 **메뉴로 만든 프로덕트는 저재고 알림을 받을 방법이 아예 없었다**
(알림 조건이 `min_stock > 0`). 추가·수정 폼 2벌 + i18n 4언어.

### 입구 ② 공급업체 상품 → 재료 **또는 프로덕트**
- 서버(`from-catalog`): `existing_product_id` · `existing_brand_product_id` · `new_product` 분기.
  링크는 `stockTargetAttrs` 를 지나 **넷 중 하나만** 채운다. 레시피 있는 프로덕트를 고르면 400.
- 목록: `GET /restaurants/:rid/stock-products` · `GET /product-ingredients/stock-products`
  (재료 목록과 **같은 모양** + `kind`) → 발주 화면 *My Stock Items* 가 재료와 한 목록에 섞어 보여준다.
  프로덕트 행에는 *Product* 배지가 붙고, 카트 키는 `prod-`/`bprod-` 로 네임스페이스한다
  (재료 3번과 프로덕트 3번이 한 줄로 합쳐지면 엉뚱한 물건을 주문한다).
- 발주 제출이 `product_id`/`brand_product_id` 라인으로 나가고, 수령이 그 프로덕트 수량을 올린다(P1 경로).
- 카탈로그 행 **[Add as product]** → 판매가 필수 모달. **공급가는 안내로만 보여주고 채우지 않는다.**

### 입구 ③ 재고아이템 → 공급업체 상품 / 프로덕트
- `POST /restaurants/:rid/ingredients/:id/register-as-product` (RA)
  `POST /product-ingredients/:id/register-as-product` (BG, `brand_id` 필요)
  → **재료 ×1 레시피**를 만들어 프로덕트에 건다. 수량은 재고아이템 한 곳에만 산다(Q1-부속).
  판매가 필수(400) · 이미 그렇게 파는 프로덕트가 있으면 409(데이터로 판정 — 마커 컬럼 아님) · 한 트랜잭션.
  BG 는 소유 브랜드가 둘 이상이면 `brand_id` 없이는 400 — 임의 선택은 남의 브랜드에 만드는 사고다.
- 화면: 공유 부품 2개 신설 — `RegisterAsProductModal` · `RegisterExternalSupplierModal`.
  후자는 RA 재료 화면 안에만 있던 코드를 뺀 것이고, 그 덕에 **BG 재고 화면에 없던 외부공급업체
  등록 입구가 생겼다**(같은 코드를 복사하면 곧 갈라진다).

### 잡은 결함 (구현 중 실측)
- `products.category` 는 **NOT NULL(기본값 없음)** 인데 ②의 `new_product` 분기가 `null` 을 넣고 있었다
  → 카테고리 칸이 없는 이 화면에서는 **항상 500**. `'Uncategorized'`(기존 관행값)로 떨어뜨리고
  길이도 컬럼(varchar 50)에 맞췄다.

### 검증
- 계약: `health-check --category=inventory` **19/19** (P3 2건을 **영구 안전망으로 추가** — RA·BG 대칭).
- 고장주입 2회(영구 테스트 대상): 판매가 가드 제거 → 실패 / 중복 409 제거 → 실패. 원복 후 복귀, 주입 흔적 0.
- 실호출 22/22(데모 매장·데모 BG, 만든 행 전부 원복) · `verify-all --full` · 인쇄 보호파일 8/8 무변경 ·
  디자인 신규 위반 0 · i18n 4언어 통과.


---

## 8. P4 결제·현금관리 구현 결과 (2026-09-02 · P4-1~3 운영 배포 / P4-4~5 개발서버)

§5-3 절단면 그대로. **마감 기대금액 공식은 한 줄도 건드리지 않았다** —
`routes/cash-management.js:258` 이 `shift_id` 로만 묶고 `source` 를 보지 않으므로
발주 출금·환불 입금이 **자동으로** 그 공식에 잡힌다(실측·계약으로 증명).

| 단계 | 내용 | 상태 |
|---|---|---|
| P4-1 | 결제 컬럼 5(`payment_status`/`payment_method`/`paid_at`/`paid_by_user_id`/`cash_movement_id`) + `cash_movements.purchase_order_id` + `source` expandEnum. 멱등·추가형·**백필 0** | 운영 배포 |
| P4-2 | 수령 시 재고 반영을 `services/purchaseOrderReceive.js` 단일 소스로(라우트 -255/+45). **응답 diff 0** | 운영 배포 |
| P4-3 | `services/purchaseOrderPayment.js` + 라우트 3개 | 운영 배포 |
| P4-4 | 돈 계약 8건을 health-check **`cash` 카테고리**로 영구화 + 고장주입 2회 | 개발서버 |
| P4-5 | 화면(공용 `ReceivePayModal` · staging "받을 발주" 블록 · 상세 버튼 · 4언어) | 개발서버 |

### 라우트 4개
- `POST /purchase-orders/:id/pay` — 결제만 기록
- `POST /purchase-orders/:id/receive-and-pay` — **단일 트랜잭션**. 수령 본체는 `markAllReceived` 공유(복제 0).
  결제가 실패하면 **수령까지 롤백**된다(실측: 재고 1 그대로·상태 shipped·원장 0).
- `POST /purchase-orders/:id/refund-payment` — **명시 결제취소**
- `cancel` 에 `reversePayment` 연결(paid 일 때만)

### `refund-payment` 이 왜 생겼나 (Fable 적발)
주 결제 순간은 `receive-and-pay`(**받으면서 지불**)인데 `cancel` 은 `draft·submitted·pending_approval`
만 허용한다 → 이 라우트가 없으면 **가장 흔한 결제를 잘못 눌러도 되돌릴 길이 없었다**
(드로어 `out` 만 남고 발주는 `paid` 로 굳는다). 설계 §5-3 의 "(또는 명시 결제취소)"가 이것이다.

### 현금 규칙 (실측으로 확인)
- 열린 시프트 **정확히 1개**일 때만 드로어 `out`. **2개 이상이면 400** — 임의로 고르면 그 시프트의
  마감 기대금액이 조용히 틀어진다(앱은 1개를 강제하지만 DB 유니크가 아니다).
- 0개면 결제는 기록하되 이동 없음 + `drawerSkipped` 안내(막지 않는다).
- BG·푸드코트 구매자는 드로어가 없다 → 기록만.
- 되돌리기는 **삭제가 아니라 반대 방향 `in`**. 드로어에서 나간 적 없는 결제는 되돌려도 입금이 없다.

### 남은 백로그 (P4 뒤)
- **재고아이템을 지우면 과거 발주 라인의 포인터가 사라진다** — FK `poi_product_ingredient_fk`
  가 `ON DELETE SET NULL`. 라인의 수량·단가·판매품목명은 남으므로 "무엇을 샀는지"가 완전히
  사라지진 않는다. 운영 사고로 관측된 바 없어 마지막 순위. (2026-09-02 P4-2 중 실측으로 발견)

---

## 9. 판매 차감 계약 불일치 (2026-09-02 · 발견·수정·4차 배포)

> P1~P4 가 전제하던 **"팔면 재고가 빠진다"가 실제로는 한 번도 성립한 적이 없었다.**
> K-DINE IPC 매장에 브랜드 레시피를 연결하기 전, "이미 연결된 1건이 정말 깎는가"를
> 먼저 재라는 게이트에서 드러났다. 연결을 먼저 했으면 그대로 묻혔을 결함이다.

### 무엇이 잘못됐나
`services/inventoryDeductionService.js` 단품 라인 경로가 상품 id 를 이렇게 집었다:
```js
: [{ pid: item.product_id || item.id, qty: orderQty, name: item.name }];   // 옛 코드
```
그런데 **POS 가 저장하는 주문 라인에는 `product_id` 가 없다.** 상품은 `menuItem.id` 에 있고,
`id` 에는 카트 임시값(`order-<timestamp>`)이 들어 있다(`POSTerminalPage.tsx:2000` 외 5곳).
→ 폴백이 `'order-1788352827589'` 를 상품 id 로 집어 `Product.findByPk()` 가 못 찾고,
**"레시피 없음"으로 조용히 넘어갔다.**

### 범위 (운영 실측)
```
완료 주문 라인 1,444건 중 product_id 를 가진 라인      0건
  rid8 dine_in 1190 / takeaway 64 · rid10 dine_in 174 / takeaway 6 …
운영 로그 "Deducted N ingredients"                    38건 전부 N=0
       "No recipe or stock link"                      56건
매장8 inventory_transactions 의 order_deduct           0건 (전 기간)
  ↳ 그 사이 매장8 완료 주문 13,833건
```
**한 매장의 문제가 아니라 POS 로 들어온 모든 주문·모든 매장이었다.**

### 세트 경로는 정상이었다 (의심했으나 기각)
`set_components` 는 숫자 `product_id` 를 **103/103** 전부 갖고 있다. 그래서 세트 구성품은
정상 차감돼 왔고, 로그의 `Insufficient stock` 4건(상품 364·32)이 그 증거다.
표시용 `set_items` 는 `menuItemId` 를 쓰지만 서비스가 읽지 않는다 — **폴백을 만들지 않았다**
(관측되지 않은 모양을 위한 방어는 규칙을 두 벌로 만든다. 오늘 결함이 정확히 "두 벌"에서 났다).

### 수정 — 새 규칙을 만들지 않고 단일 소스를 재사용
인쇄(스테이션 라우팅)가 이미 쓰던 해석기를 그대로 쓴다:
```js
const { resolveProductId } = require('../utils/stationEnrichment');
// 후보 순서: menu_item_id → product_id → menuItem.id → id, 숫자만 인정
```
- `inventoryDeductionService.js` **182·416행** 교체, 세트 경로(181·415행) 무접촉
- `unresolved_line` 카운터 신설 — **"상품 식별 불가" ≠ "레시피 없음"**. 섞으면 계기판이 또 거짓말한다
- `utils/stationEnrichment.js` 는 🔒 보호파일 — **export 한 줄만**(`+1/-1`) 추가하고
  인쇄 계약 10/10 통과로 동작 무변화를 증명한 뒤 Fable bless

### 기존 테스트가 왜 못 잡았나
`health-check.js` 의 inventory 계약 3건(2106·2149·2180)이 **서비스를 직접** 호출하면서
`{ id: prod.id, product_id: prod.id }` 로 **상품 id 를 손으로 넣어** 줬다. POS 가 만드는 모양으로
부른 테스트가 0건이었다. → ⓪ 신설: 데모 매장에 재료·레시피·상품을 만들고 **POS 라인 모양 그대로**
주문 생성 → `PATCH /orders/:id/status completed` **실호출** → 재료 10→6 + `order_deduct` 원장 확인.
고장주입으로 옛 코드로 되돌리면 이 계약만 실패함을 확인했다.

### 소급하지 않는다
과거 주문을 되돌려 깎지 않는다. 해당 매장들의 재고가 전부 0 이라 전부 부족분이 될 뿐이고,
**원장은 사실의 기록이지 재구성이 아니다.**

### 남은 별건 — 부족분이 어디에도 안 남는다
재고 0 인 상태에서 팔리면 `actualDeductQty=0` 이라 원장 행이 안 생기고 콘솔 경고로만 끝난다
(P1 의 "0 에서 0 빼는 줄은 안 남긴다" 결정과 한 세트). `StockAlert` 모델 필드는
`restaurant_id · ingredient_id · alert_type · current_stock · min_stock · suggested_order_qty ·
is_resolved · resolved_at` 로 **`product_id`·`order_id`·부족수량 자리가 없다.**
→ "팔렸는데 못 깎은 사실"을 남기려면 설계가 먼저다. 반응 패치 금지.

---

## 10. 브랜드 공유 재료 순환 닫기 — 수령과 차감이 같은 행을 보게 (Fable 설계 · 2026-09-03)

> 배경: 2026-09-03 K-DINE IPC(매장 8) 메뉴 62건을 브랜드 레시피에 연결해 판매 차감이 브랜드 g 재료의
> **매장 오버레이**(`restaurant_ingredient_stocks`)에서 빠지게 됐다. 그 오버레이를 **채우는** 정상 경로가
> 발주 수령인데, 브랜드 공유 재료는 발주 제출에서 막힌다. 이 절은 그 한 자리를 여는 설계다.

### 10-1. 실측으로 확정된 사실 (2026-09-03 M7·M8)
| 항목 | 사실 | 근거 |
|---|---|---|
| 차감 행 | 레시피 → 브랜드 g 재료 → `restaurant_ingredient_stocks(rid)` 오버레이 | `inventoryDeductionService.js:284 stockFor` → `brandStockAccess` |
| 수령 행 | `applyReceipt → applyStock(ingredient, rid)` 이 `owner_type='brand'` 면 **같은 오버레이**에 씀 | `brandStockAccess.js:113-121` (findOrCreate → update) |
| 라인 타깃 허용 | 매장은 자기 재료 ∪ 부모 브랜드 재료를 PO 라인 `ingredient_id` 로 담을 수 있음 | `purchase-orders-crud.js:777 ingredientBelongsToBuyer` = `readableIngredient` |
| UI | 발주 담기 목록이 `brand-ingredients?include=sellers` 를 이미 가져옴(`is_brand_shared` 플래그) | `NewPurchaseOrderPage.tsx:1224` |
| **막는 것** | 제출 게이트 `MAPPING_REQUIRED` — `ingredient_seller_products` 매핑 필수인데 **브랜드 소유 재료를 가리키는 매핑이 전 브랜드 0건** | `purchase-orders-crud.js:786-796` |
| 우회 흔적 | GIT 구매자(매장 10)는 자기 재료 385개를 따로 만들어 매핑을 붙여 발주해 왔음. IPC 는 9개 | 매핑 134건 전수: 재료 `brand_id` 전부 null |
| 환산 | `unit_conversion` 은 매핑에 살고, 라인이 복사하고, 수령이 곱한다. **운영 증명**: 5 kg 주문 → 재고 +5000 | `PO-R10-20260831-004` 라인 66-68 |
| 두 벌 (A) | 브랜드 2 의 `ING-`(g, 레시피가 씀) ↔ `PRD-`(piece, 브랜드 프로덕트 미러) 11묶음. 미러는 `brand_products.sync_to_ingredients` 토글 산물(149건 전부 ON) | `brand-products.js:44 syncProductToIngredients` |
| 발주 이력 | 브랜드 2 소스는 시스템으로 발주된 적 0건. 미러 행·g 행 모두 IPC 오버레이 0 | `purchase_order_items` 전수 |

두 축을 분리한다: **(B) 수령 행 ≠ 차감 행** 이 순환을 끊는 실제 원인이고 이 절의 대상이다.
**(A) g/piece 두 벌**은 토글의 산물로, (B) 가 닫히면 발주·차감 어느 경로에서도 쓰이지 않는 잔존물이 된다(10-4).

### 10-2. 결정
- **D1. 정체성은 브랜드 g 행(`ING-`) 하나.** 레시피·차감·`base_quantity` 원가가 전부 거기 있다. 재료 행 변경 0.
- **D2. 브랜드 공유 재료 발주는 코드가 아니라 매핑 데이터로 연다.** `ingredient_seller_products` 에
  `{ ingredient_id = g 행, seller = 그 브랜드, seller_product = 해당 브랜드 프로덕트(1kg 봉), unit_conversion = 봉 1개당 재료 단위 수, unit_price = 브랜드 판매가 }`.
  브랜드 2 의 K-소스 **10묶음**부터(뚜껑 쌍 제외 — 레시피·공급처 둘 다 없고 원가 한쪽 0, GIT 포장재 건과 묶는다).
  이 매핑 하나로 제출 게이트 통과 → 수령이 오버레이 +1000 → 차감이 같은 오버레이 −40. **코드 변경 0 이 목표.**
- **D3. 브랜드 1(GIT)은 건드리지 않는다.** 매장 10 의 "자기 재료 385 + 매핑" 체계가 운영 중이고 정상 작동한다(9/9 수령 원장 정확). 그쪽을 브랜드 공유로 옮기는 것은 별도 결정.
- **D4. 매핑 생성 주체는 브랜드 관리자 화면**(공급처 연결은 브랜드 전용이라는 기존 규칙 그대로). 화면·API 가 브랜드 소유 재료에 매핑을 만들 수 있는지는 **게이트 G1**(10-5). 못 만들면 허용 조건 1곳만 고친다 — 그 경우 코드 변경이 생기므로 Fable 게이트.
- **D5. (A) PRD 미러 11행은 이번에 끄지 않는다.** 토글 OFF 의 영향(브랜드 프로덕트 판매·발주·BOM)이 미확인이고, 149건 전부 ON 인 관행에서 11건만 끄는 것은 관행 이탈이다. (B) 가 닫히면 이 행들은 레시피 0·매핑 0·오버레이 0 으로 **무해한 잔존물**이다. 정리는 동기화 덮어쓰기(D-sync) 설계와 함께(10-7).
- **D6. 이동할 재고가 없다.** IPC 오버레이는 g 행·piece 행 모두 0 → 이관 스크립트 불필요. 8/24 식 수동 이동은 다시 하지 않는다.
- **D7. 환산값은 추측하지 않는다.** 10묶음 전부 프로덕트 이름에 `1kg` 이 명시돼 있고 g 행 `base_quantity=1000` 과 일치하므로 `unit_conversion=1000` 이 Fable 판단이다. 단 `K-Yukgaejang`(g 행 6 ↔ 57 은 **kg** 단위·원가 불일치 30/34.9)은 모양이 달라 **브랜드 프로덕트 실물 확인 후** 넣는다 — 9묶음 먼저, 1묶음 보류.

### 10-3. 절단면 (Irene 컨펌 대상)
1. 데이터: 브랜드 2 매핑 **9건 생성**(K-Yukgaejang 보류) — `unit_conversion 1000`, `unit_price` = 브랜드 프로덕트 현재 판매가 그대로 복사, 매장 소유 재료 무접촉, 스냅샷·전후 지문(날짜 epoch 정규화) 형식.
2. 코드: **0** (G1 결과에 따라 최대 1곳 — 매핑 생성 API 의 소유권 허용 조건).
3. 화면: 변경 없음. IPC 발주 화면의 기존 `is_brand_shared` 목록이 그대로 쓰인다.
4. 하지 않는 것: 재료 합치기 / 미러 끄기 / 브랜드 1 변경 / 재고 이동 / `product_ingredients.linked_ingredient_id`(다른 축, 쓰기 금지 유지).

### 10-4. 검증 (게이트 — 통과 전 운영 쓰기 없음)
- **계약 ⑤ 신설(영구, health-check `po`)**: 데모 브랜드+데모 매장에 공유 재료(g, base 1000)·브랜드 프로덕트(1kg)·매핑(conv 1000)·레시피(40g)·메뉴를 만들고 →
  PO 제출 **통과** → 수령 → 오버레이 **+1000** → POS 주문 완료 → 오버레이 **960** + `order_deduct` 원장 1행. 픽스처는 `finally` 정리.
  (dev 에 브랜드 2 가 없으므로 픽스처가 브랜드까지 만든다. 만들 수 없으면 "확인 불가"로 명시 — 조용한 스킵 금지.)
- **고장주입 2건**: ⓐ 매핑 제거 → 제출 `400 MAPPING_REQUIRED`(게이트가 진짜 막는지) ⓑ `unit_conversion 1` → 오버레이 +1 (환산이 진짜 곱하는지). 둘 다 계약 ⑤가 **실패**해야 한다.
- 운영 무접촉 증명: 매핑 INSERT 9행 외 변경 컬럼 0, 재료·프로덕트·오버레이 지문 동일.
- 최종 증명은 운영에서만 가능: **IPC 의 첫 실제 발주 1건**(시험 발주 금지) → 수령 로그 오버레이 증가 → 첫 판매 `Deducted N ingredients` + `order_deduct` 1행. 이것으로 9/3 "확인 불가"(오버레이 분기 실제 차감)가 닫힌다.

### 10-5. 착수 순서
0. (독립) 대기 중인 PO 수령 수정 배포 + 과거 9건 백필.
1. **G1 실측(읽기)**: 브랜드 관리자 화면에서 공급처 매핑을 만드는 경로(`routes/ingredients.js:245·1071 catalogLink.resolveUnitConversion` 부근)가 `owner_type='brand'` 재료를 허용하는지, seller = 자기 브랜드를 허용하는지, 그리고 그 API 가 `unit_conversion` 을 입력받는지.
2. G1 통과 → 매핑 9건을 **화면과 같은 API** 로 만든다(직접 INSERT 금지 — 9/3 원가 0 사고의 교훈: 라우트를 우회하면 파생 컬럼이 빈다). API 가 브랜드 소유를 거부하면 허용 조건 1곳 수정 → Fable 게이트 → 배포 → 그 뒤 매핑.
3. 계약 ⑤ + 고장주입 2건 → Fable 게이트.
4. 운영 매핑 생성(드라이런 → 승인 → apply → 대조).
5. Irene 안내: IPC 가 브랜드 소스를 **시스템으로 발주**하고 수령하면 재고가 g 로 쌓이고 팔릴 때 빠진다. 첫 발주 1건 로그로 종결 보고.

### 10-6. 이 설계가 답하지 않는 것 (다음 절 대상)
- **D-sync**: 브랜드 재료 동기화가 매장의 수동 결정(is_active·원가)을 덮어씀 / 끄기 입구 / `all` 배포 모드에서 매장 제외 불가. (A) 미러 정리도 여기서.
- 브랜드 1(GIT) 을 공유 재료 체계로 옮길지.
- 부족분 기록(StockAlert 자리 없음) — §9 마지막 항목 그대로.

### 10-7. 백로그 (스키마·구조, 이번 아님)
- `inventory_transactions` 에 `purchase_order_item_id` 추가 — 원장이 PO 만 참조해 같은 재료 두 라인이면 라인 대조 불가(9/3 M9).
- 차감 서비스 "레시피 있음·재료 0줄" 을 "레시피 없음" 과 동일 취급 vs 편집 화면 "recipe_id 있음 = 자체재고 안 씀" — 정의 불일치(9/3). 실해는 재료 0줄 레시피 메뉴에 한정.
- health-check 프레임워크에 SKIP 개념 없음(준비물 없으면 초록) — 카운터·요약 집계 신설.
