# Purchase Order System - 발주 관리 시스템

**작성일:** 2026-01-06
**프로젝트:** Purple POS System
**Phase:** Phase 4 - Purchase Order System
**상태:** 설계 완료

---

## 목차

1. [개요](#개요)
2. [핵심 워크플로우](#핵심-워크플로우)
3. [2가지 발주 경로](#2가지-발주-경로)
4. [발주서 공유 기능](#발주서-공유-기능)
5. [입고 및 재고 연동](#입고-및-재고-연동)
6. [데이터베이스 설계](#데이터베이스-설계)
7. [API 설계](#api-설계)
8. [Frontend 설계](#frontend-설계)
9. [빠뜨리기 쉬운 기능 체크리스트](#빠뜨리기-쉬운-기능-체크리스트)
10. [구현 우선순위](#구현-우선순위)

---

## 개요

### 목적
- 재고 부족 시 쉽고 빠르게 발주
- 발주서를 메신저(WhatsApp, Telegram, KakaoTalk 등)로 간편 공유
- 입고 시 자동 재고 반영 및 이력 기록

### 핵심 원칙
1. **간편함**: 최소 클릭으로 발주 완료
2. **유연함**: 2가지 발주 경로 (재고관리 → 발주 / 발주관리에서 직접 검색)
3. **실용적**: 메신저 공유 (실제 업무 방식 반영)
4. **추적 가능**: 모든 발주-입고 이력 기록

---

## 핵심 워크플로우

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         발주 관리 전체 흐름                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [재고관리 Stock List]                    [발주관리 Purchase Orders]      │
│         │                                          │                     │
│         ▼                                          ▼                     │
│  ┌──────────────────┐                    ┌──────────────────┐           │
│  │ 재료 카드에서      │                    │ 재료 검색해서     │           │
│  │ 수량 입력 → Order │                    │ 직접 추가        │           │
│  └────────┬─────────┘                    └────────┬─────────┘           │
│           │                                        │                     │
│           └──────────────┬─────────────────────────┘                     │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │  발주 대기 목록  │  (Draft Orders / Order Cart)         │
│                 │  - 공급업체별   │                                       │
│                 │  - 수량 편집    │                                       │
│                 │  - 삭제 가능    │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │   발주 확정     │                                       │
│                 │  (Create PO)   │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│           ┌──────────────┼──────────────┐                                │
│           ▼              ▼              ▼                                │
│    ┌───────────┐  ┌───────────┐  ┌───────────┐                          │
│    │  메신저    │  │   PDF     │  │  이메일   │                          │
│    │  공유     │  │  다운로드  │  │   발송    │                          │
│    └───────────┘  └───────────┘  └───────────┘                          │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │  발주 상태 관리  │                                       │
│                 │  pending →     │                                       │
│                 │  ordered →     │                                       │
│                 │  received      │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │   입고 처리     │                                       │
│                 │  - 전체 입고   │                                       │
│                 │  - 부분 입고   │                                       │
│                 │  - 수량 검증   │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │  자동 재고 반영  │                                       │
│                 │  - current_stock 증가                                  │
│                 │  - inventory_transactions 기록                         │
│                 │  - inventory_batches 생성 (로트/유통기한)               │
│                 └────────────────┘                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2가지 발주 경로

### 경로 1: 재고관리에서 발주 (Quick Order)

**사용 시나리오:** 재고 목록을 보다가 부족한 재료를 바로 발주

```
[Stock List 페이지]

┌─────────────────────────────────────────────────────────────┐
│ 토마토                                          LOW STOCK   │
│ 현재고: 1.2kg  |  안전재고: 3kg  |  단가: RM 5/kg           │
│ 일평균: 2kg    |  공급업체: Fresh Farm                      │
│                                                              │
│  발주 수량: [10     ] kg      [+ Order]  [입고] [폐기]       │
│  제안 수량: 15kg (7일치)                                     │
└─────────────────────────────────────────────────────────────┘

→ [+ Order] 클릭 시:
  - 발주 대기 목록(Order Cart)에 추가
  - 공급업체별로 자동 그룹핑
  - Badge로 카트 아이템 수 표시
```

**UI 요소:**
- 각 재료 카드에 발주 수량 입력 필드
- 제안 수량 표시 (PAR level 기반)
- [+ Order] 버튼 → 발주 대기 목록에 추가
- Header에 Order Cart 아이콘 (뱃지로 아이템 수 표시)

### 경로 2: 발주관리에서 직접 검색 (Manual Order)

**사용 시나리오:** 특정 재료를 찾아서 발주하거나, 재고 외 품목 발주

```
[Purchase Orders 페이지]

┌─────────────────────────────────────────────────────────────┐
│  Purchase Orders                                             │
│                                                              │
│  [+ New Order]  [Order Cart (3)]                            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Pending Orders                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PO-2026-0001 | Fresh Farm | 5 items | RM 250           ││
│  │ Created: 2026-01-05 | Status: Ordered                  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Recent Orders                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PO-2025-0120 | Fresh Farm | 3 items | RM 180           ││
│  │ Received: 2025-12-30 | Status: Completed               ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘

→ [+ New Order] 클릭 시:

┌─────────────────────────────────────────────────────────────┐
│  Add Items to Order                                    [X]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Search: [tomato                    ]  [🔍]                  │
│                                                              │
│  Results:                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 토마토 (Fresh Farm)                                   │  │
│  │ 단가: RM 5/kg | 현재고: 1.2kg | MOQ: 5kg             │  │
│  │ 수량: [10    ] kg              [Add to Cart]         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 토마토 소스 (Kitchen Supplies)                        │  │
│  │ 단가: RM 12/can | 현재고: 5 can | MOQ: 1 can         │  │
│  │ 수량: [      ] can             [Add to Cart]         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Filter by Supplier: [All Suppliers        ▼]               │
│  Filter by Category: [All Categories       ▼]               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 발주서 공유 기능

### 공유 옵션

```
┌─────────────────────────────────────────────────────────────┐
│  Share Purchase Order                                  [X]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PO-2026-0001 | Fresh Farm | 5 items | RM 250.00            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  📱 메신저로 공유                                     │  │
│  │     [WhatsApp]  [Telegram]  [KakaoTalk]  [Copy Text] │  │
│  │                                                       │  │
│  │  📄 문서로 저장                                       │  │
│  │     [PDF 다운로드]  [이미지 저장]                      │  │
│  │                                                       │  │
│  │  📧 이메일 발송                                       │  │
│  │     [Send Email] (to: supplier@freshfarm.com)        │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 메신저 공유 형식

**텍스트 형식 (Copy Text / 메신저 공유용):**
```
[발주서] OrderHere POS
---
발주번호: PO-2026-0001
발주일: 2026-01-06
업체: Fresh Farm

품목:
1. 토마토 10kg x RM5.00 = RM50.00
2. 양파 5kg x RM3.00 = RM15.00
3. 당근 8kg x RM4.00 = RM32.00
---
합계: RM97.00

배송희망일: 2026-01-08
비고: 냉장 배송 부탁드립니다

From: ABC Restaurant
Tel: 010-1234-5678
```

**이미지 형식 (카드 스타일):**
- Canvas로 발주서 카드 이미지 생성
- 로고, 테이블 형식, QR 코드(발주 확인용) 포함
- PNG/JPEG 다운로드 또는 직접 공유

### 기술 구현

```javascript
// 메신저 공유 URL 생성
const shareToWhatsApp = (orderText) => {
  const encoded = encodeURIComponent(orderText);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
};

const shareToTelegram = (orderText) => {
  const encoded = encodeURIComponent(orderText);
  window.open(`https://t.me/share/url?text=${encoded}`, '_blank');
};

const shareToKakao = (orderText) => {
  // Kakao SDK 사용 또는 clipboard copy 후 안내
  navigator.clipboard.writeText(orderText);
  alert('클립보드에 복사되었습니다. 카카오톡에 붙여넣기 해주세요.');
};

// 이미지 생성 (html2canvas)
const generateOrderImage = async (orderElement) => {
  const canvas = await html2canvas(orderElement);
  return canvas.toDataURL('image/png');
};
```

---

## 입고 및 재고 연동

### 입고 처리 워크플로우

```
[발주 상세 페이지]

┌─────────────────────────────────────────────────────────────┐
│  PO-2026-0001                                    [Receive]   │
│  Fresh Farm | Ordered: 2026-01-06                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Status: Ordered → [Mark as Received]                        │
│                                                              │
│  Items:                                                      │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 품목     │ 주문  │ 입고  │ 단가    │ 금액    │ 상태   ││
│  ├──────────┼───────┼───────┼─────────┼─────────┼────────┤│
│  │ 토마토   │ 10kg  │ [10 ] │ RM 5.00 │ RM50.00 │ ✓      ││
│  │ 양파     │ 5kg   │ [5  ] │ RM 3.00 │ RM15.00 │ ✓      ││
│  │ 당근     │ 8kg   │ [6  ] │ RM 4.00 │ RM24.00 │ 부분   ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  Batch Info (선택):                                          │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 로트번호: [LOT-2026-001    ]                           ││
│  │ 유통기한: [2026-01-20      ]                           ││
│  │ 메모:     [                                   ]         ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  [부분 입고 저장]  [전체 입고 완료]  [취소]                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 입고 시 자동 처리

1. **재고 업데이트**
   ```javascript
   // ingredients.current_stock 증가
   await Ingredient.increment('current_stock', {
     by: receivedQuantity,
     where: { id: ingredientId }
   });
   ```

2. **거래 내역 기록**
   ```javascript
   await InventoryTransaction.create({
     restaurant_id,
     ingredient_id,
     transaction_type: 'purchase',  // 구매 입고
     quantity_change: +receivedQuantity,
     stock_after: newStockLevel,
     purchase_order_id: orderId,
     notes: `PO-${orderNumber}에서 입고`
   });
   ```

3. **배치 생성 (선택적)**
   ```javascript
   await InventoryBatch.create({
     restaurant_id,
     ingredient_id,
     batch_number: lotNumber,
     initial_quantity: receivedQuantity,
     remaining_quantity: receivedQuantity,
     unit: ingredient.unit,
     unit_cost: unitCost,
     expiry_date: expiryDate,
     received_date: new Date(),
     purchase_order_id: orderId,
     supplier_id: supplierId
   });
   ```

4. **알림 해제**
   ```javascript
   // Low Stock 알림이 있었다면 해제
   await StockAlert.update(
     { is_resolved: true, resolved_at: new Date() },
     { where: { ingredient_id, is_resolved: false } }
   );
   ```

---

## 데이터베이스 설계

### 기존 테이블 (이미 구현됨)

- `suppliers` - 공급업체 정보 ✅
- `ingredients` - 재료 (supplier_id FK 있음) ✅
- `inventory_transactions` - 재고 거래 내역 ✅
- `inventory_batches` - 배치/로트 관리 (purchase_order_id FK 있음) ✅

### 신규 테이블

#### `purchase_orders` (발주서)

```sql
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,

  -- 발주 정보
  order_number VARCHAR(50) NOT NULL UNIQUE,

  status ENUM(
    'draft',           -- 발주 대기 (장바구니)
    'pending',         -- 발주 확정 대기
    'ordered',         -- 발주 완료 (공급업체에 전달됨)
    'partial_received', -- 부분 입고
    'received',        -- 전체 입고 완료
    'cancelled'        -- 취소
  ) DEFAULT 'draft',

  -- 날짜
  order_date DATE,                    -- 발주일
  expected_date DATE,                 -- 배송 예정일
  received_date DATE,                 -- 실제 입고일

  -- 금액
  subtotal DECIMAL(12, 2) DEFAULT 0,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) DEFAULT 0,

  -- 공유 기록
  shared_via JSON,                    -- {"whatsapp": "2026-01-06T10:00:00Z", "email": "..."}

  -- 메모
  notes TEXT,
  internal_notes TEXT,                -- 내부용 메모

  -- 메타
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),

  INDEX idx_restaurant_status (restaurant_id, status),
  INDEX idx_order_date (order_date),
  INDEX idx_order_number (order_number)
);
```

#### `purchase_order_items` (발주 상세)

```sql
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- 수량
  ordered_quantity DECIMAL(10, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  unit VARCHAR(20) NOT NULL,

  -- 금액
  unit_price DECIMAL(10, 4) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,

  -- 입고 정보 (부분 입고 지원)
  receive_status ENUM('pending', 'partial', 'received', 'cancelled') DEFAULT 'pending',

  -- 배치 정보 (입고 시)
  batch_number VARCHAR(50),
  expiry_date DATE,

  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),

  INDEX idx_order_id (purchase_order_id),
  INDEX idx_ingredient_id (ingredient_id)
);
```

#### `order_cart_items` (발주 대기 목록 / 장바구니)

```sql
CREATE TABLE order_cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  supplier_id INT NOT NULL,

  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  unit_price DECIMAL(10, 4) NOT NULL,

  added_from ENUM('stock_list', 'manual', 'suggestion') DEFAULT 'manual',

  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),

  UNIQUE KEY (restaurant_id, ingredient_id),  -- 같은 재료는 하나만
  INDEX idx_restaurant (restaurant_id)
);
```

---

## API 설계

### 발주 대기 목록 (Order Cart)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/order-cart` | 장바구니 목록 (공급업체별 그룹핑) |
| POST | `/api/restaurants/:id/order-cart` | 장바구니에 추가 |
| PUT | `/api/restaurants/:id/order-cart/:itemId` | 수량 수정 |
| DELETE | `/api/restaurants/:id/order-cart/:itemId` | 장바구니에서 제거 |
| DELETE | `/api/restaurants/:id/order-cart` | 장바구니 비우기 |

### 발주서

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/purchase-orders` | 발주서 목록 |
| POST | `/api/restaurants/:id/purchase-orders` | 발주서 생성 (장바구니에서) |
| GET | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 상세 |
| PUT | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 수정 |
| DELETE | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 삭제/취소 |
| PUT | `/api/restaurants/:id/purchase-orders/:orderId/status` | 상태 변경 |

### 입고 처리

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/restaurants/:id/purchase-orders/:orderId/receive` | 입고 처리 |
| POST | `/api/restaurants/:id/purchase-orders/:orderId/receive-partial` | 부분 입고 |

### 발주서 공유

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/purchase-orders/:orderId/share-text` | 메신저용 텍스트 생성 |
| GET | `/api/restaurants/:id/purchase-orders/:orderId/pdf` | PDF 생성 |
| POST | `/api/restaurants/:id/purchase-orders/:orderId/send-email` | 이메일 발송 |

### 재료 검색 (발주용)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/ingredients/search?q=tomato` | 재료 검색 |
| GET | `/api/restaurants/:id/ingredients/by-supplier/:supplierId` | 공급업체별 재료 |

---

## Frontend 설계

### 페이지 구조

```
/restaurant/:id/purchase-orders
├── (기본) - 발주서 목록 + 대기 목록
├── /create - 발주서 생성 (장바구니 → 발주 확정)
├── /:orderId - 발주서 상세
└── /:orderId/receive - 입고 처리

/restaurant/:id/inventory (기존 페이지 수정)
├── Stock List 탭 - 각 재료에 [+ Order] 버튼 추가
└── Header에 Order Cart 아이콘 추가
```

### 컴포넌트 구조

```
components/
├── PurchaseOrder/
│   ├── OrderCartButton.tsx        # Header의 장바구니 버튼
│   ├── OrderCartDrawer.tsx        # 장바구니 슬라이드 패널
│   ├── OrderCartItem.tsx          # 장바구니 아이템
│   ├── CreateOrderModal.tsx       # 발주 확정 모달
│   ├── OrderDetailCard.tsx        # 발주서 카드
│   ├── OrderItemsTable.tsx        # 발주 품목 테이블
│   ├── ReceiveOrderModal.tsx      # 입고 처리 모달
│   ├── ShareOrderModal.tsx        # 공유 모달
│   └── OrderShareText.tsx         # 메신저용 텍스트 컴포넌트
│
pages/
├── PurchaseOrders/
│   ├── PurchaseOrdersPage.tsx     # 목록 페이지
│   ├── PurchaseOrderDetailPage.tsx # 상세 페이지
│   └── ReceiveOrderPage.tsx       # 입고 처리 페이지
```

### 상태 관리

```typescript
// OrderCartContext.tsx
interface OrderCartItem {
  id: number;
  ingredient_id: number;
  ingredient_name: string;
  supplier_id: number;
  supplier_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
}

interface OrderCartContextType {
  items: OrderCartItem[];
  itemCount: number;
  totalAmount: number;
  groupedBySupplier: Map<number, OrderCartItem[]>;

  addToCart: (item: Partial<OrderCartItem>) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  createOrder: (supplierId: number) => Promise<PurchaseOrder>;

  isLoading: boolean;
  error: string | null;
}
```

---

## 빠뜨리기 쉬운 기능 체크리스트

### 필수 (MVP)

- [x] 2가지 발주 경로 (재고관리 → 발주 / 발주관리에서 검색)
- [x] 발주 대기 목록 (장바구니)
- [x] 공급업체별 발주서 생성
- [x] 메신저 공유 (WhatsApp, Telegram, Copy Text)
- [x] PDF 다운로드
- [x] 입고 처리 → 재고 자동 반영
- [x] 부분 입고 지원
- [x] 거래 내역 기록

### 권장 (Phase 4.1)

- [ ] **MOQ (최소주문수량) 검증** - 공급업체 최소 주문량 체크
- [ ] **가격 변동 알림** - 이전 단가 대비 변동 시 경고
- [ ] **배송 예정일 설정** - 리드타임 기반 자동 계산
- [ ] **발주 템플릿** - 자주 하는 발주 저장
- [ ] **이메일 발송** - 공급업체 이메일로 직접 발송
- [ ] **공급업체별 마지막 발주** - 이전 발주 내역 참조

### 고급 (향후)

- [ ] **발주 승인 워크플로우** - 관리자 승인 필요 설정
- [ ] **자동 발주 제안** - PAR level 기반 자동 생성
- [ ] **공급업체 성과 관리** - 납기 준수율, 품질 평가
- [ ] **반품 관리** - 불량품/오배송 반품 처리
- [ ] **송장 매칭** - 발주서와 공급업체 송장 비교
- [ ] **다중 매장 발주 통합** - 여러 매장 발주 합산

### 재고관리 연계 기능

- [ ] **로트/유통기한 관리** - 입고 시 배치 정보 기록
- [ ] **FEFO 알림** - 유통기한 임박 재고 우선 사용 안내
- [ ] **폐기 연동** - 유통기한 만료 자동 폐기 처리
- [ ] **직원 식사/샘플 분류** - Comp/R&D 사용량 별도 추적
- [ ] **조리 손실률** - 수축률 반영한 원가 계산

### UX 개선 사항

- [ ] **오프라인 지원** - 네트워크 없이 장바구니 관리
- [ ] **바코드 스캔** - 모바일 카메라로 재료 검색
- [ ] **음성 입력** - 핸즈프리 수량 입력
- [ ] **퀵 오더** - 이전 발주 그대로 재주문

---

## 구현 우선순위

### Week 1: 기본 구조

1. DB 스키마 생성 (`purchase_orders`, `purchase_order_items`, `order_cart_items`)
2. Backend Models 생성
3. 기본 CRUD API 구현
4. 장바구니 API 구현

### Week 2: Frontend 기본

5. OrderCartContext 구현
6. PurchaseOrdersPage (목록)
7. Stock List에 [+ Order] 버튼 추가
8. OrderCartDrawer (장바구니 패널)

### Week 3: 발주 처리

9. CreateOrderModal (발주 확정)
10. PurchaseOrderDetailPage (상세)
11. ShareOrderModal (공유 - 텍스트, PDF)
12. 메신저 공유 기능

### Week 4: 입고 연동

13. ReceiveOrderModal (입고 처리)
14. 재고 자동 반영 로직
15. inventory_transactions 기록
16. inventory_batches 생성 (로트/유통기한)

### Week 5: 테스트 및 개선

17. 통합 테스트
18. 버그 수정
19. UX 개선
20. 문서화

---

## UI 스타일 가이드

### 발주 상태 색상

| 상태 | 색상 | Badge |
|------|------|-------|
| draft | Gray | `bg-gray-100 text-gray-600` |
| pending | Yellow | `bg-yellow-100 text-yellow-700` |
| ordered | Blue | `bg-blue-100 text-blue-700` |
| partial_received | Orange | `bg-orange-100 text-orange-700` |
| received | Green | `bg-green-100 text-green-700` |
| cancelled | Red | `bg-red-100 text-red-600` |

### 장바구니 버튼

```css
.order-cart-button {
  position: relative;
  padding: 8px 12px;
}

.order-cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #DC2626;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 참고 자료

- 기존 Inventory 시스템: `/var/www/docs/INVENTORY_MANAGEMENT_SYSTEM.md`
- Supplier Model: `/var/www/dev-backend/models/Supplier.js`
- Ingredient Model: `/var/www/dev-backend/models/Ingredient.js`
- InventoryBatch Model: `/var/www/dev-backend/models/InventoryBatch.js`

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2026-01-06 | 1.0 | 초안 작성 | Claude |

---

**문서 끝**
