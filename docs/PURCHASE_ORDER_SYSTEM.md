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
4. [발주서 구조 (공급업체별 그룹핑)](#발주서-구조-공급업체별-그룹핑)
5. [실 단가 관리 및 가격 히스토리](#실-단가-관리-및-가격-히스토리)
6. [인보이스 연동](#인보이스-연동)
7. [발주서 공유 기능](#발주서-공유-기능)
8. [입고 및 재고 연동](#입고-및-재고-연동)
9. [데이터베이스 설계](#데이터베이스-설계)
10. [API 설계](#api-설계)
11. [Frontend 설계](#frontend-설계)
12. [빠뜨리기 쉬운 기능 체크리스트](#빠뜨리기-쉬운-기능-체크리스트)
13. [구현 우선순위](#구현-우선순위)

---

## 개요

### 목적
- 재고 부족 시 쉽고 빠르게 발주
- **공급업체별로 발주서 그룹핑** (같은 날 + 같은 공급업체 = 1개 발주서)
- **실 단가 관리** 및 **가격 변동 히스토리** 추적
- 발주서를 메신저로 간편 공유
- 입고 시 자동 재고 반영 및 인보이스 연결

### 핵심 원칙
1. **간편함**: 최소 클릭으로 발주 완료
2. **유연함**: 2가지 발주 경로 (재고관리 → 발주 / 발주관리에서 직접 검색)
3. **정확함**: 실 단가 관리, 가격 변동 추적
4. **추적 가능**: 모든 가격 변동, 발주-입고 이력 기록

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
│                 │  발주 대기 목록  │  (Order Cart)                        │
│                 │  공급업체별 그룹 │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │   발주 확정     │  공급업체별로 발주서 생성               │
│                 │  (Create PO)   │  PO-2026-0001 (Fresh Farm)            │
│                 └────────┬───────┘  PO-2026-0002 (Kitchen Supply)        │
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
│                 │  입고 처리      │                                       │
│                 │  - 실 단가 확인 │  ← 인보이스 기준으로 검증              │
│                 │  - 실 수량 확인 │                                       │
│                 └────────┬───────┘                                       │
│                          │                                               │
│           ┌──────────────┼──────────────┐                                │
│           ▼              ▼              ▼                                │
│    ┌───────────┐  ┌───────────┐  ┌───────────┐                          │
│    │ 재고 반영  │  │ 단가 업데이트│  │ 인보이스  │                          │
│    │ current_  │  │ unit_cost  │  │ 정보 저장 │                          │
│    │ stock +   │  │ 변경 시    │  │           │                          │
│    └───────────┘  └───────────┘  └───────────┘                          │
│                          │                                               │
│                          ▼                                               │
│                 ┌────────────────┐                                       │
│                 │  가격 히스토리  │  어디서 바꿨든 기록됨                   │
│                 │  ingredient_   │  - 발주에서 수정                       │
│                 │  price_history │  - 재고관리에서 수정                    │
│                 └────────────────┘  - 입고 시 수정                        │
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
│ 현재고: 1.2kg  |  안전재고: 3kg                              │
│ 단가: RM 5.00/kg  [가격 히스토리 📈]                         │
│ 공급업체: Fresh Farm                                         │
│                                                              │
│  발주 수량: [10     ] kg      [+ Order]  [입고] [폐기]       │
│  제안 수량: 15kg (7일치)                                     │
└─────────────────────────────────────────────────────────────┘

→ [+ Order] 클릭 시:
  - 발주 대기 목록(Order Cart)에 추가
  - 공급업체별로 자동 그룹핑
  - Badge로 카트 아이템 수 표시
```

### 경로 2: 발주관리에서 직접 검색 (Manual Order)

**사용 시나리오:** 특정 재료를 찾아서 발주하거나, 여러 재료 한번에 추가

```
[Purchase Orders 페이지 - Add Items 모달]

┌─────────────────────────────────────────────────────────────┐
│  Add Items to Order                                    [X]   │
├─────────────────────────────────────────────────────────────┤
│  Search: [tomato                    ]  [🔍]                  │
│                                                              │
│  Filter: [All Suppliers ▼]  [All Categories ▼]              │
│                                                              │
│  Results:                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 토마토 (Fresh Farm)                     [가격 📈]     │  │
│  │ 단가: RM 5.00/kg | 현재고: 1.2kg | MOQ: 5kg          │  │
│  │ 수량: [10    ] kg                    [Add to Cart]   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 체리토마토 (Fresh Farm)                 [가격 📈]     │  │
│  │ 단가: RM 12.00/kg | 현재고: 0.5kg | MOQ: 2kg         │  │
│  │ 수량: [      ] kg                    [Add to Cart]   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 발주서 구조 (공급업체별 그룹핑)

### 그룹핑 규칙

```
같은 날 + 같은 공급업체 = 1개의 발주서

예시:
2026-01-06에 발주 확정 시:
├── Fresh Farm에서 주문한 품목들 → PO-2026-0001
│   ├── 토마토 10kg
│   ├── 양파 5kg
│   └── 당근 8kg
│
└── Kitchen Supply에서 주문한 품목들 → PO-2026-0002
    ├── 식용유 5L
    └── 소금 2kg
```

### 발주 대기 목록 (Order Cart) UI

```
┌─────────────────────────────────────────────────────────────┐
│  Order Cart                                          [X]     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Fresh Farm (3 items)                    Total: RM 97.00    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 토마토     10kg  x  RM 5.00  =  RM 50.00    [x]      │  │
│  │ 양파       5kg   x  RM 3.00  =  RM 15.00    [x]      │  │
│  │ 당근       8kg   x  RM 4.00  =  RM 32.00    [x]      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                      [Create Order]         │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Kitchen Supply (2 items)                Total: RM 45.00    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 식용유     5L    x  RM 8.00  =  RM 40.00    [x]      │  │
│  │ 소금       2kg   x  RM 2.50  =  RM  5.00    [x]      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                      [Create Order]         │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  Total: RM 142.00              [Create All Orders]          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**버튼 동작:**
- `[Create Order]`: 해당 공급업체만 발주서 생성
- `[Create All Orders]`: 모든 공급업체 발주서 일괄 생성

---

## 실 단가 관리 및 가격 히스토리

### 핵심 개념

```
┌─────────────────────────────────────────────────────────────┐
│                      단가 흐름                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [재고관리/재료카드]                                          │
│  ingredients.unit_cost = RM 5.00                            │
│         │                                                    │
│         │ 발주 시 불러오기                                    │
│         ▼                                                    │
│  [발주 대기 → 발주서]                                         │
│  order_item.unit_price = RM 5.00  (예상 단가)               │
│         │                                                    │
│         │ 입고 시 실제 인보이스 확인                           │
│         ▼                                                    │
│  [입고 처리]                                                  │
│  order_item.actual_unit_price = RM 5.50  (실 단가)          │
│         │                                                    │
│         │ 단가가 다르면?                                      │
│         ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  "단가가 변경되었습니다. 재료 원가를 업데이트할까요?"  │   │
│  │                                                       │   │
│  │  기존: RM 5.00  →  신규: RM 5.50                      │   │
│  │                                                       │   │
│  │  [업데이트]  [이번만 적용]  [취소]                     │   │
│  └─────────────────────────────────────────────────────┘   │
│         │                                                    │
│         │ [업데이트] 선택 시                                  │
│         ▼                                                    │
│  [재료 원가 업데이트]                                         │
│  ingredients.unit_cost = RM 5.50                            │
│         │                                                    │
│         │ 자동 기록                                          │
│         ▼                                                    │
│  [가격 히스토리]                                              │
│  ingredient_price_history 테이블에 기록                      │
│  - old_price: 5.00                                          │
│  - new_price: 5.50                                          │
│  - source: 'purchase_order'                                 │
│  - purchase_order_id: 123                                   │
│  - changed_at: 2026-01-06 14:30:00                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 가격 변경 소스 (어디서 바꿨는지)

| source | 설명 |
|--------|------|
| `purchase_order` | 발주/입고 시 변경 |
| `inventory` | 재고관리 페이지에서 변경 |
| `ingredient` | 재료 관리 페이지에서 변경 |
| `import` | 데이터 import |
| `system` | 시스템 자동 조정 |

### 가격 히스토리 팝업 UI

```
┌─────────────────────────────────────────────────────────────┐
│  Price History - 토마토                                [X]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Current Price: RM 5.50/kg                                  │
│                                                              │
│  History:                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Date        │ Price   │ Change  │ Source    │ By     │  │
│  ├─────────────┼─────────┼─────────┼───────────┼────────┤  │
│  │ 2026-01-06  │ RM 5.50 │ +10%    │ 입고 처리  │ Admin  │  │
│  │ 2025-12-15  │ RM 5.00 │ -       │ 재료 등록  │ Admin  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Price Trend (최근 6개월):                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     5.50 ┤                                    ●       │  │
│  │     5.25 ┤                              ●            │  │
│  │     5.00 ┤  ●────●────●────●────●────●              │  │
│  │     4.75 ┤                                           │  │
│  │          └───────────────────────────────────────────│  │
│  │            Jul  Aug  Sep  Oct  Nov  Dec  Jan         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Related POs:                                                │
│  • PO-2026-0001 (2026-01-06) - RM 5.50                      │
│  • PO-2025-0089 (2025-12-20) - RM 5.00                      │
│  • PO-2025-0075 (2025-11-15) - RM 5.00                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 재고관리에서 단가 수정

```
[재료 카드 - Edit 모드]

┌─────────────────────────────────────────────────────────────┐
│  Edit Ingredient - 토마토                              [X]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Name: [토마토                    ]                          │
│  Category: [Produce              ▼]                          │
│  Unit: [kg                       ▼]                          │
│                                                              │
│  Unit Cost: [5.50     ] RM/kg    [가격 히스토리 📈]          │
│             ⚠️ 변경 시 가격 히스토리에 기록됩니다              │
│                                                              │
│  Supplier: [Fresh Farm           ▼]                          │
│  Min Stock: [3        ] kg                                   │
│  Lead Time: [2        ] days                                 │
│                                                              │
│                              [Cancel]  [Save]                │
└─────────────────────────────────────────────────────────────┘
```

---

## 인보이스 연동

### 입고 시 인보이스 정보 입력

```
[입고 처리 - Receive Order]

┌─────────────────────────────────────────────────────────────┐
│  Receive Order - PO-2026-0001                               │
│  Fresh Farm | Ordered: 2026-01-06                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Invoice Info:                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Invoice No:   [INV-2026-0456        ]                 │  │
│  │ Invoice Date: [2026-01-08           ]                 │  │
│  │ Invoice File: [Upload]  invoice.pdf ✓                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Items:                                                      │
│  ┌────────────────────────────────────────────────────────┐│
│  │품목   │주문수량│입고수량│예상단가 │실단가   │금액     ││
│  ├───────┼───────┼───────┼────────┼────────┼─────────┤│
│  │토마토 │ 10kg  │[10   ]│RM 5.00 │[5.50  ]│RM 55.00 ││
│  │       │       │       │        │ ⚠️+10% │         ││
│  │양파   │ 5kg   │[5    ]│RM 3.00 │[3.00  ]│RM 15.00 ││
│  │당근   │ 8kg   │[6    ]│RM 4.00 │[4.00  ]│RM 24.00 ││
│  │       │       │부분입고│        │        │         ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  Order Total: RM 97.00                                       │
│  Invoice Total: [94.00    ] RM   (실제 인보이스 금액)         │
│                                                              │
│  Price Changes:                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⚠️ 토마토: RM 5.00 → RM 5.50 (+10%)                   │  │
│  │    [ ] 재료 원가 업데이트 (체크하면 ingredients 반영)  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Batch Info (선택):                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Batch No:    [LOT-2026-001         ]                  │  │
│  │ Expiry Date: [2026-01-20           ]                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Notes: [                                              ]     │
│                                                              │
│  [부분 입고 저장]  [전체 입고 완료]  [Cancel]                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 발주서에서 인보이스 조회

```
[발주 상세 페이지]

┌─────────────────────────────────────────────────────────────┐
│  PO-2026-0001                                               │
│  Fresh Farm | Status: Received                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Order Info           │  Invoice Info                        │
│  ────────────────────│────────────────────                  │
│  Order Date: 01/06    │  Invoice No: INV-2026-0456          │
│  Order Total: RM 97   │  Invoice Date: 01/08                │
│  Items: 3             │  Invoice Total: RM 94.00            │
│                       │  [View Invoice PDF]                  │
│                                                              │
│  Items:                                                      │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 품목    │ 주문   │ 입고   │ 예상단가  │ 실단가    │ 차이 ││
│  ├─────────┼────────┼────────┼──────────┼──────────┼──────┤│
│  │ 토마토  │ 10kg   │ 10kg   │ RM 5.00  │ RM 5.50  │ +10% ││
│  │ 양파    │ 5kg    │ 5kg    │ RM 3.00  │ RM 3.00  │ -    ││
│  │ 당근    │ 8kg    │ 6kg    │ RM 4.00  │ RM 4.00  │ -    ││
│  │         │        │ ⚠️부분 │          │          │      ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│  Summary:                                                    │
│  • 예상 금액: RM 97.00                                       │
│  • 실제 금액: RM 94.00                                       │
│  • 차이: -RM 3.00 (부분 입고로 인한 차이)                     │
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
│  PO-2026-0001 | Fresh Farm | 3 items | RM 97.00             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Messenger                                            │  │
│  │  [WhatsApp]  [Telegram]  [KakaoTalk]  [Copy Text]    │  │
│  │                                                       │  │
│  │  Document                                             │  │
│  │  [PDF Download]  [Save as Image]                      │  │
│  │                                                       │  │
│  │  Email                                                │  │
│  │  [Send Email] (to: order@freshfarm.com)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 메신저 공유 텍스트 형식

```
[발주서] OrderHere POS
───────────────────
발주번호: PO-2026-0001
발주일: 2026-01-06
업체: Fresh Farm

품목:
1. 토마토 10kg × RM5.00 = RM50.00
2. 양파 5kg × RM3.00 = RM15.00
3. 당근 8kg × RM4.00 = RM32.00
───────────────────
합계: RM97.00

배송희망일: 2026-01-08
비고: 냉장 배송 부탁드립니다

From: ABC Restaurant
Tel: 010-1234-5678
```

---

## 입고 및 재고 연동

### 입고 처리 시 자동 처리 항목

```javascript
// 입고 처리 시 실행되는 로직

async function processReceiving(orderId, receivedItems, invoiceInfo) {
  const transaction = await sequelize.transaction();

  try {
    for (const item of receivedItems) {
      // 1. 재고 증가
      await Ingredient.increment('current_stock', {
        by: item.received_quantity,
        where: { id: item.ingredient_id }
      });

      // 2. 거래 내역 기록
      await InventoryTransaction.create({
        restaurant_id,
        ingredient_id: item.ingredient_id,
        transaction_type: 'purchase',
        quantity_change: +item.received_quantity,
        stock_after: newStockLevel,
        purchase_order_id: orderId,
        unit_cost: item.actual_unit_price,
        notes: `PO-${orderNumber} 입고`
      });

      // 3. 배치 생성 (로트/유통기한 입력 시)
      if (item.batch_number || item.expiry_date) {
        await InventoryBatch.create({
          restaurant_id,
          ingredient_id: item.ingredient_id,
          batch_number: item.batch_number,
          initial_quantity: item.received_quantity,
          remaining_quantity: item.received_quantity,
          unit_cost: item.actual_unit_price,
          expiry_date: item.expiry_date,
          purchase_order_id: orderId,
          supplier_id
        });
      }

      // 4. 단가 변경 시 히스토리 기록 + 재료 업데이트
      if (item.update_ingredient_cost &&
          item.actual_unit_price !== item.unit_price) {

        // 가격 히스토리 기록
        await IngredientPriceHistory.create({
          ingredient_id: item.ingredient_id,
          old_price: item.unit_price,
          new_price: item.actual_unit_price,
          source: 'purchase_order',
          purchase_order_id: orderId,
          changed_by: userId
        });

        // 재료 단가 업데이트
        await Ingredient.update(
          { unit_cost: item.actual_unit_price },
          { where: { id: item.ingredient_id } }
        );
      }

      // 5. Low Stock 알림 해제
      await StockAlert.update(
        { is_resolved: true, resolved_at: new Date() },
        { where: { ingredient_id: item.ingredient_id, is_resolved: false } }
      );
    }

    // 6. 인보이스 정보 저장
    await PurchaseOrder.update({
      invoice_number: invoiceInfo.invoice_number,
      invoice_date: invoiceInfo.invoice_date,
      invoice_total: invoiceInfo.invoice_total,
      invoice_file_url: invoiceInfo.file_url,
      status: allReceived ? 'received' : 'partial_received',
      received_date: new Date()
    }, { where: { id: orderId } });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

---

## 데이터베이스 설계

### 기존 테이블 (이미 구현됨)

- `suppliers` - 공급업체 정보 ✅
- `ingredients` - 재료 (supplier_id, unit_cost 있음) ✅
- `inventory_transactions` - 재고 거래 내역 ✅
- `inventory_batches` - 배치/로트 관리 ✅

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
    'draft',            -- 발주 대기 (장바구니)
    'pending',          -- 발주 확정 대기
    'ordered',          -- 발주 완료 (공급업체에 전달됨)
    'partial_received', -- 부분 입고
    'received',         -- 전체 입고 완료
    'cancelled'         -- 취소
  ) DEFAULT 'draft',

  -- 날짜
  order_date DATE,                     -- 발주일
  expected_date DATE,                  -- 배송 예정일
  received_date DATE,                  -- 실제 입고일

  -- 금액 (예상)
  subtotal DECIMAL(12, 2) DEFAULT 0,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) DEFAULT 0,

  -- 인보이스 정보 (입고 시 업데이트)
  invoice_number VARCHAR(100),
  invoice_date DATE,
  invoice_total DECIMAL(12, 2),        -- 실제 인보이스 금액
  invoice_file_url VARCHAR(500),       -- 인보이스 파일 (PDF/이미지)

  -- 공유 기록
  shared_via JSON,                     -- {"whatsapp": "2026-01-06T10:00:00Z", "email": "..."}

  -- 메모
  notes TEXT,                          -- 공급업체에게 전달할 메모
  internal_notes TEXT,                 -- 내부용 메모

  -- 메타
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),

  INDEX idx_restaurant_status (restaurant_id, status),
  INDEX idx_supplier (supplier_id),
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

  -- 주문 수량/단가 (발주 시점)
  ordered_quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  unit_price DECIMAL(10, 4) NOT NULL,       -- 예상 단가 (발주 시점)
  total_price DECIMAL(12, 2) NOT NULL,

  -- 입고 수량/단가 (입고 시점)
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  actual_unit_price DECIMAL(10, 4),          -- 실 단가 (인보이스 기준)
  actual_total_price DECIMAL(12, 2),

  -- 입고 상태
  receive_status ENUM('pending', 'partial', 'received', 'cancelled') DEFAULT 'pending',

  -- 배치 정보 (입고 시)
  batch_number VARCHAR(50),
  expiry_date DATE,

  -- 단가 업데이트 여부
  cost_updated BOOLEAN DEFAULT FALSE,        -- 재료 원가에 반영했는지

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
  unit_price DECIMAL(10, 4) NOT NULL,        -- 장바구니 담을 때 단가

  added_from ENUM('stock_list', 'manual', 'suggestion') DEFAULT 'manual',

  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),

  UNIQUE KEY (restaurant_id, ingredient_id),  -- 같은 재료는 하나만
  INDEX idx_restaurant_supplier (restaurant_id, supplier_id)
);
```

#### `ingredient_price_history` (가격 변동 히스토리) ⭐ 새로 추가

```sql
CREATE TABLE ingredient_price_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ingredient_id INT NOT NULL,

  -- 가격 변동
  old_price DECIMAL(10, 4) NOT NULL,
  new_price DECIMAL(10, 4) NOT NULL,
  price_change_percent DECIMAL(5, 2),        -- 계산: ((new-old)/old)*100

  -- 변경 출처
  source ENUM(
    'purchase_order',   -- 발주/입고에서 변경
    'inventory',        -- 재고관리에서 변경
    'ingredient',       -- 재료 관리에서 변경
    'import',           -- 데이터 import
    'system'            -- 시스템 자동
  ) NOT NULL,

  -- 참조 (선택)
  purchase_order_id INT,                     -- 발주에서 변경한 경우
  purchase_order_item_id INT,

  -- 메타
  notes TEXT,
  changed_by INT,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),

  INDEX idx_ingredient (ingredient_id),
  INDEX idx_changed_at (changed_at)
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
| POST | `/api/restaurants/:id/purchase-orders` | 발주서 생성 (공급업체 ID 지정) |
| POST | `/api/restaurants/:id/purchase-orders/create-all` | 모든 공급업체 일괄 발주 |
| GET | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 상세 |
| PUT | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 수정 |
| DELETE | `/api/restaurants/:id/purchase-orders/:orderId` | 발주서 삭제/취소 |
| PUT | `/api/restaurants/:id/purchase-orders/:orderId/status` | 상태 변경 |

### 입고 처리

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/restaurants/:id/purchase-orders/:orderId/receive` | 입고 처리 (인보이스 포함) |

**Request Body:**
```json
{
  "invoice": {
    "invoice_number": "INV-2026-0456",
    "invoice_date": "2026-01-08",
    "invoice_total": 94.00,
    "file_url": "https://..."
  },
  "items": [
    {
      "item_id": 1,
      "received_quantity": 10,
      "actual_unit_price": 5.50,
      "update_ingredient_cost": true,
      "batch_number": "LOT-2026-001",
      "expiry_date": "2026-01-20"
    }
  ],
  "notes": ""
}
```

### 발주서 공유

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/purchase-orders/:orderId/share-text` | 메신저용 텍스트 |
| GET | `/api/restaurants/:id/purchase-orders/:orderId/pdf` | PDF 생성 |
| POST | `/api/restaurants/:id/purchase-orders/:orderId/send-email` | 이메일 발송 |
| PUT | `/api/restaurants/:id/purchase-orders/:orderId/shared` | 공유 기록 업데이트 |

### 가격 히스토리

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/ingredients/:id/price-history` | 재료별 가격 히스토리 |
| GET | `/api/restaurants/:id/price-changes` | 레스토랑 전체 가격 변동 |

---

## Frontend 설계

### 페이지 구조

```
/restaurant/:id/purchase-orders
├── (기본) - 발주서 목록 + Order Cart
├── /:orderId - 발주서 상세 (인보이스 포함)
└── /:orderId/receive - 입고 처리

/restaurant/:id/inventory
├── Stock List 탭 - [+ Order] 버튼, 가격 히스토리 버튼
└── Header에 Order Cart 아이콘
```

### 컴포넌트 구조

```
components/
├── PurchaseOrder/
│   ├── OrderCartButton.tsx           # Header 장바구니 버튼 (Badge)
│   ├── OrderCartDrawer.tsx           # 장바구니 슬라이드 패널
│   ├── OrderCartSupplierGroup.tsx    # 공급업체별 그룹
│   ├── CreateOrderModal.tsx          # 발주 확정 모달
│   ├── ShareOrderModal.tsx           # 공유 모달
│   ├── ReceiveOrderModal.tsx         # 입고 처리 모달
│   └── InvoiceSection.tsx            # 인보이스 정보 섹션
│
├── PriceHistory/
│   ├── PriceHistoryButton.tsx        # 📈 버튼
│   ├── PriceHistoryModal.tsx         # 히스토리 팝업
│   └── PriceChart.tsx                # 가격 추이 차트
│
pages/
├── PurchaseOrders/
│   ├── PurchaseOrdersPage.tsx        # 목록
│   ├── PurchaseOrderDetailPage.tsx   # 상세 (인보이스 포함)
│   └── ReceiveOrderPage.tsx          # 입고 처리
```

### Context

```typescript
// OrderCartContext.tsx
interface OrderCartContextType {
  items: OrderCartItem[];
  groupedBySupplier: Map<number, {
    supplier: Supplier;
    items: OrderCartItem[];
    total: number;
  }>;
  totalItems: number;
  totalAmount: number;

  addToCart: (item: AddToCartInput) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  createOrder: (supplierId: number) => Promise<PurchaseOrder>;
  createAllOrders: () => Promise<PurchaseOrder[]>;
}
```

---

## 빠뜨리기 쉬운 기능 체크리스트

### 필수 (MVP)

- [x] 2가지 발주 경로 (재고관리/발주관리)
- [x] 공급업체별 발주서 그룹핑
- [x] 발주 대기 목록 (장바구니)
- [x] 메신저 공유 (WhatsApp, Telegram, Copy Text)
- [x] PDF 다운로드
- [x] **실 단가 입력** (입고 시)
- [x] **가격 변동 히스토리** (어디서든 기록)
- [x] **인보이스 정보 저장**
- [x] 입고 처리 → 재고 자동 반영
- [x] 부분 입고 지원

### 권장 (Phase 4.1)

- [ ] MOQ (최소주문수량) 검증
- [ ] 가격 변동 알림 (발주 시 이전 단가 대비 경고)
- [ ] 배송 예정일 자동 계산 (리드타임 기반)
- [ ] 발주 템플릿 (자주 하는 발주 저장)
- [ ] 이메일 발송
- [ ] 가격 추이 차트

### 고급 (향후)

- [ ] 발주 승인 워크플로우
- [ ] 자동 발주 제안 (PAR level 기반)
- [ ] 공급업체 성과 관리 (납기 준수율)
- [ ] 반품 관리
- [ ] 송장 매칭 (발주 vs 인보이스 자동 비교)
- [ ] 다중 매장 발주 통합

---

## 구현 우선순위

### Week 1: 기본 구조

1. DB 스키마 생성 (4개 테이블)
2. Backend Models 생성
3. 기본 CRUD API 구현
4. 장바구니 API 구현

### Week 2: Frontend 기본

5. OrderCartContext 구현
6. PurchaseOrdersPage (목록)
7. Stock List에 [+ Order] 버튼 추가
8. OrderCartDrawer (공급업체별 그룹)

### Week 3: 발주 처리 + 공유

9. CreateOrderModal (발주 확정)
10. PurchaseOrderDetailPage (상세)
11. ShareOrderModal (메신저, PDF)
12. 공유 기록 저장

### Week 4: 입고 + 가격 관리

13. ReceiveOrderModal (입고 처리)
14. 인보이스 정보 입력/저장
15. 실 단가 입력 + 재료 원가 업데이트
16. 가격 히스토리 API + 팝업

### Week 5: 재고 연동 + 마무리

17. 재고 자동 반영 로직
18. inventory_transactions 기록
19. 통합 테스트
20. 버그 수정 및 문서화

---

## UI 스타일 가이드

### 발주 상태 Badge

| 상태 | 색상 | 텍스트 |
|------|------|--------|
| draft | Gray | Draft |
| pending | Yellow | Pending |
| ordered | Blue | Ordered |
| partial_received | Orange | Partial |
| received | Green | Received |
| cancelled | Red | Cancelled |

### 가격 변동 표시

```css
/* 가격 상승 */
.price-up {
  color: #DC2626; /* red */
}
.price-up::before {
  content: "▲ ";
}

/* 가격 하락 */
.price-down {
  color: #16A34A; /* green */
}
.price-down::before {
  content: "▼ ";
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
| 2026-01-06 | 1.1 | 실 단가, 가격 히스토리, 인보이스 연동 추가 | Claude |

---

**문서 끝**
