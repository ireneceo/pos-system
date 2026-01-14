# Order Management Improvements - 주문 관리 개선 기획서

> **작성일:** 2026-01-14
> **상태:** 개발 대기
> **우선순위:** Phase 3.5 (Phase 4 Purchase Order 전)

---

## 1. 개요

주문 관리 기능 개선을 통해 운영 효율성을 높이고 실제 매장 운영 시나리오를 더 잘 지원합니다.

### 개발 범위

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| Auto-merge | 같은 테이블/조건의 주문 자동 통합 | HIGH |
| Manual Merge | 선택한 주문들 수동 병합 | HIGH |
| Add Items | 기존 주문에 메뉴 추가 | HIGH |
| Kitchen Display 개선 | Pending 컬럼 아이템별 Done 버튼 | MEDIUM |
| Coupon System | 쿠폰 백엔드 구현 | MEDIUM |
| Printer Settings | 빌/키친 프린터 분리 설정 | MEDIUM |

### 제외 범위 (별도 기획 필요)

- Table View (테이블 뷰 UI) - 별도 기획 후 개발

---

## 2. Auto-merge (자동 병합)

### 2.1 동작 조건

새 주문 생성 시 다음 조건을 **모두** 만족하는 기존 주문이 있으면 자동으로 해당 주문에 아이템 추가:

```
1. restaurant_id 동일
2. table_number 동일 (NULL이 아닌 경우만)
3. order_type 동일
4. payment_status = 'pending'
5. status NOT IN ('served', 'completed', 'cancelled')
```

### 2.2 적용 위치

| 진입점 | 파일 | 라인 |
|--------|------|------|
| POS Terminal | `dev-backend/routes/orders.js` | 81-290 |
| Mobile Order | `dev-backend/routes/mobile.js` | 503-643 |

### 2.3 로직 플로우

```
[새 주문 요청]
      │
      ▼
[Auto-merge 조건 검색]
      │
      ├─ 대상 없음 ──► [새 주문 생성] ──► Socket: order-created
      │
      └─ 대상 있음 (복수인 경우 최신 주문)
            │
            ▼
      [기존 주문에 아이템 추가]
            │
            ├─ order_items 배열에 추가 (added_at 타임스탬프)
            ├─ total_amount 재계산
            ├─ status → 'pending' (키친으로 재전송)
            │
            ▼
      [Socket: order-updated] ──► 응답: merged order 정보
```

### 2.4 아이템 데이터 구조

```javascript
// order_items 배열 내 각 아이템
{
  name: "Nasi Lemak",
  quantity: 1,
  price: 12.00,
  options: [...],
  status: "pending",        // 키친 디스플레이용
  added_at: "2026-01-14T10:30:00Z"  // 추가 시점 (신규 필드)
}
```

- `added_at`이 없는 아이템 = 최초 주문 시 포함된 아이템
- `added_at`이 있는 아이템 = 나중에 추가된 아이템

---

## 3. Manual Merge (수동 병합)

### 3.1 UI 플로우

```
[Live Orders 페이지]
      │
      ▼
[Select Mode 진입] ──► 체크박스 표시
      │
      ▼
[2개 이상 주문 선택]
      │
      ▼
[Merge 버튼 클릭]
      │
      ▼
[확인 모달] ──► "주문 #001, #002, #003을 병합합니다"
      │
      ▼
[API 호출: POST /api/orders/merge]
```

### 3.2 API 스펙

```
POST /api/orders/merge
Authorization: Bearer {token}

Request Body:
{
  "orderIds": [101, 102, 103],
  "targetOrderId": 101  // optional - 지정하지 않으면 가장 오래된 주문
}

Response:
{
  "success": true,
  "data": {
    "mergedOrder": { ... },
    "deletedOrderIds": [102, 103]
  }
}
```

### 3.3 병합 규칙

| 필드 | 처리 방식 |
|------|----------|
| order_items | 모든 아이템 합침 (added_at으로 구분) |
| total_amount | 재계산 |
| table_number | 첫 번째 주문 값 유지 |
| customer_id | 첫 번째 주문 값 유지 |
| customer_name | 첫 번째 주문 값 유지 |
| order_number | 첫 번째 주문 번호 유지 |
| status | 'pending'으로 변경 |
| payment_status | 'pending' 유지 |
| 피흡수 주문 | is_deleted=true 처리 |

### 3.4 병합 제한

다음 경우 병합 불가 (API에서 에러 반환):

- 결제 완료된 주문 포함
- 서빙 완료/취소된 주문 포함
- 서로 다른 restaurant_id
- 1개 주문만 선택

---

## 4. Add Items (메뉴 추가)

### 4.1 UI 플로우

```
[Live Orders 페이지]
      │
      ▼
[주문 카드에서 "Add Items" 버튼 클릭]
      │
      ▼
[메뉴 선택 모달 표시] (POS Terminal 메뉴 선택과 유사)
      │
      ▼
[아이템 선택 및 추가]
      │
      ▼
[API 호출: POST /api/orders/:id/add-items]
      │
      ▼
[키친 티켓 출력] (추가된 아이템만)
```

### 4.2 API 스펙

```
POST /api/orders/:id/add-items
Authorization: Bearer {token}

Request Body:
{
  "items": [
    {
      "name": "Teh Tarik",
      "quantity": 2,
      "price": 3.50,
      "options": []
    }
  ],
  "printKitchenTicket": true  // 키친 티켓 출력 여부
}

Response:
{
  "success": true,
  "data": {
    "order": { ... },
    "addedItems": [...],  // added_at 포함
    "newTotal": 45.00
  }
}
```

### 4.3 기존 버그 수정 필요

현재 `PATCH /api/orders/:id/items` 엔드포인트가 `total_amount`를 재계산하지 않음.

**위치:** `dev-backend/routes/orders.js:448-472`

```javascript
// 현재 코드 (버그)
await order.update({
  order_items: JSON.stringify(order_items)
});

// 수정 필요
const newTotal = order_items.reduce((sum, item) =>
  sum + (item.price * item.quantity), 0);
await order.update({
  order_items: JSON.stringify(order_items),
  total_amount: newTotal
});
```

---

## 5. Kitchen Display 개선

### 5.1 현재 구조

- Pending → Preparing → Ready 3컬럼
- Preparing 컬럼에서만 아이템별 Done 버튼 존재
- 주문 단위로 컬럼 이동

### 5.2 개선 사항

**Pending 컬럼에 아이템별 Done 버튼 추가:**

```
┌─────────────────────────────────┐
│ Order #001                      │
│ ─────────────────────────────── │
│ [Done] Nasi Lemak x1           │  ← 완료된 아이템
│ [Done] Teh Tarik x2            │
│ ─────────────────────────────── │
│ [    ] Roti Canai x1 (신규)     │  ← 추가된 아이템 (하이라이트)
│ ─────────────────────────────── │
│ [Start Preparing]               │
└─────────────────────────────────┘
```

### 5.3 아이템 상태 관리

```javascript
// order_items 배열 내 각 아이템
{
  name: "...",
  status: "pending" | "completed",
  added_at: "..." // optional
}
```

- Pending 컬럼: 모든 주문 표시
- 완료된 아이템: 취소선 또는 체크 표시
- 추가된 아이템: 하이라이트 배경색

---

## 6. Coupon System (쿠폰 시스템)

### 6.1 현재 상태

- Frontend에 Mock 데이터로 하드코딩됨
- 위치:
  - `dev-frontend/src/mobile/pages/PaymentPage.tsx:488-492`
  - `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx:1638-1644`

### 6.2 데이터 모델

```javascript
// models/Coupon.js
{
  id: INTEGER,
  restaurant_id: INTEGER,
  code: STRING(50),           // 'SAVE10', 'WELCOME'
  type: ENUM('percentage', 'fixed'),
  value: DECIMAL(10, 2),      // 10 (10%) or 5.00 (RM 5)
  min_order: DECIMAL(10, 2),  // 최소 주문 금액
  max_discount: DECIMAL(10, 2), // 최대 할인 금액 (percentage용)
  usage_limit: INTEGER,       // 총 사용 가능 횟수
  usage_count: INTEGER,       // 현재 사용 횟수
  per_user_limit: INTEGER,    // 사용자당 사용 가능 횟수
  valid_from: DATE,
  valid_until: DATE,
  is_active: BOOLEAN,
  created_at: DATE,
  updated_at: DATE
}
```

### 6.3 API 엔드포인트

```
GET    /api/coupons                    - 쿠폰 목록 (Settings용)
POST   /api/coupons                    - 쿠폰 생성
PUT    /api/coupons/:id                - 쿠폰 수정
DELETE /api/coupons/:id                - 쿠폰 삭제
POST   /api/coupons/validate           - 쿠폰 유효성 검증 (주문 시)
```

### 6.4 쿠폰 검증 API

```
POST /api/coupons/validate

Request Body:
{
  "code": "SAVE10",
  "restaurantId": 1,
  "customerId": 123,  // optional
  "orderTotal": 50.00
}

Response (성공):
{
  "success": true,
  "data": {
    "valid": true,
    "coupon": {
      "code": "SAVE10",
      "type": "percentage",
      "value": 10,
      "discountAmount": 5.00
    }
  }
}

Response (실패):
{
  "success": false,
  "error": "Minimum order amount is RM 30"
}
```

---

## 7. Printer Settings (프린터 설정)

### 7.1 현재 구조

- RawBT 사용 (Android Intent Scheme)
- 단일 프린터만 지원
- 프린터 이름 파라미터 미사용

### 7.2 개선 사항

`operation_settings`에 `printer_settings` 추가:

```javascript
// restaurants.operation_settings JSON
{
  "timeZone": "Asia/Kuala_Lumpur",
  "openingTime": "09:00",
  "closingTime": "22:00",
  // ... 기존 설정 ...
  "printer_settings": {
    "bill_printer": "BillPrinter",      // 영수증 프린터 이름
    "kitchen_printer": "KitchenPrinter", // 키친 프린터 이름
    "use_separate_printers": true        // 분리 사용 여부
  }
}
```

### 7.3 RawBT Intent URL 수정

**현재:**
```javascript
const intentUrl = `intent:#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;S.msg=${encodedContent};end`;
```

**수정 후:**
```javascript
const printerName = settings?.printer_settings?.kitchen_printer || '';
const printerParam = printerName ? `S.printer=${encodeURIComponent(printerName)};` : '';
const intentUrl = `intent:#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;${printerParam}S.msg=${encodedContent};end`;
```

### 7.4 Settings UI

Settings 페이지에 "Printer Settings" 섹션 추가:

```
┌─────────────────────────────────────────────┐
│ Printer Settings                            │
├─────────────────────────────────────────────┤
│ [x] Use separate printers                   │
│                                             │
│ Bill Printer Name:                          │
│ ┌─────────────────────────────────────────┐ │
│ │ BillPrinter                             │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Kitchen Printer Name:                       │
│ ┌─────────────────────────────────────────┐ │
│ │ KitchenPrinter                          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ * Printer names must match RawBT settings   │
└─────────────────────────────────────────────┘
```

---

## 8. 추가 아이템 키친 티켓

### 8.1 목적

기존 주문에 메뉴 추가 시, 추가된 메뉴만 키친에 출력

### 8.2 구현 방식

```javascript
// utils/billPrint.js
export const printAdditionalItemsTicket = async (order, addedItems, printerName) => {
  // addedItems = order_items에서 added_at이 특정 시간 이후인 아이템들

  const content = `
================================
      ** ADDITIONAL ITEMS **
      Order #${order.order_number}
      Table: ${order.table_number || 'N/A'}
================================
${addedItems.map(item => `
${item.name} x${item.quantity}
${item.options?.map(o => `  - ${o}`).join('\n') || ''}
`).join('')}
================================
      Added at: ${formatTime(new Date())}
================================
`;

  await printKitchenTicketViaRawBT(content, printerName);
};
```

### 8.3 호출 시점

- `POST /api/orders/:id/add-items` 성공 후
- Frontend에서 `printKitchenTicket: true` 옵션 시

---

## 9. Database Migration

### 9.1 Coupon 테이블 생성

```javascript
// migrations/20260114000000-create-coupons.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('percentage', 'fixed'),
        allowNull: false
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      min_order: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      max_discount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      usage_limit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      per_user_limit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      valid_from: {
        type: Sequelize.DATE,
        allowNull: true
      },
      valid_until: {
        type: Sequelize.DATE,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('coupons', ['restaurant_id', 'code'], {
      unique: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('coupons');
  }
};
```

### 9.2 order_items 필드

- 변경 없음 (JSON 내부 구조만 확장)
- `added_at` 필드 추가는 JSON 내부이므로 migration 불필요

### 9.3 operation_settings 필드

- 변경 없음 (JSON 내부 구조만 확장)
- `printer_settings` 추가는 JSON 내부이므로 migration 불필요

---

## 10. Socket.IO 이벤트

### 10.1 기존 이벤트 (변경 없음)

| 이벤트 | 발생 시점 |
|--------|----------|
| `order-created` | 새 주문 생성 (auto-merge 아닌 경우) |
| `order-updated` | 주문 수정/상태변경/아이템추가/auto-merge |
| `order-deleted` | 주문 삭제/manual-merge 피흡수 주문 |

### 10.2 리스너 위치

| 페이지 | 파일 |
|--------|------|
| Live Orders | `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx:1189-1207` |
| Kitchen Display | `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx:618-738` |
| Customer Display | `dev-frontend/src/pages/CustomerDisplay/CustomerDisplayPage.tsx:259-272` |

---

## 11. 리스크 및 완화 전략

### 11.1 식별된 리스크

| 리스크 | 심각도 | 완화 전략 |
|--------|--------|----------|
| 동시 주문 처리 충돌 | HIGH | 트랜잭션 + Row Lock 사용 |
| total_amount 불일치 | HIGH | 아이템 수정 시 항상 재계산 |
| 기존 데이터 호환성 | MEDIUM | added_at 없으면 최초 아이템으로 처리 |
| 프린터 설정 누락 | LOW | 기본값으로 fallback |

### 11.2 롤백 전략

```
[Backend 롤백]
1. git revert <commit>
2. pm2 restart dev-backend

[Frontend 롤백]
1. cp -r nginx-build.backup/* nginx-build/
2. 또는 git checkout 이전 버전 후 npm run build:dev

[Database 롤백]
1. Coupon 테이블만 신규 → DROP TABLE coupons;
2. order_items, operation_settings는 JSON이라 롤백 불필요
```

---

## 12. 개발 순서

### Phase 1: Backend Core

1. `PATCH /:id/items` total_amount 재계산 버그 수정
2. Auto-merge 로직 구현 (orders.js, mobile.js)
3. Manual merge API 구현 (`POST /api/orders/merge`)
4. Add items API 구현 (`POST /api/orders/:id/add-items`)

### Phase 2: Coupon System

1. Coupon 모델 생성
2. Migration 실행
3. Coupon CRUD API
4. Coupon validate API

### Phase 3: Frontend

1. Live Orders - Select Mode + Merge 버튼
2. Live Orders - Add Items 모달
3. Kitchen Display - Pending 컬럼 Done 버튼
4. Settings - Printer Settings UI
5. Mobile PaymentPage - 쿠폰 API 연동
6. POS Terminal - 쿠폰 API 연동

### Phase 4: Printer

1. billPrint.js - 프린터 이름 파라미터 추가
2. Additional items ticket 함수 구현
3. Settings에서 저장된 프린터 이름 사용

---

## 13. 테스트 체크리스트

### Backend

- [ ] Auto-merge: 같은 테이블 + 같은 order_type → 병합됨
- [ ] Auto-merge: 다른 테이블 → 새 주문 생성
- [ ] Auto-merge: 결제 완료된 주문 → 새 주문 생성
- [ ] Manual merge: 2개 이상 선택 → 병합 성공
- [ ] Manual merge: 결제 완료 포함 → 에러
- [ ] Add items: total_amount 재계산 확인
- [ ] Add items: added_at 타임스탬프 추가 확인
- [ ] Coupon validate: 정상 쿠폰 → 할인금액 반환
- [ ] Coupon validate: 만료 쿠폰 → 에러
- [ ] Coupon validate: 최소금액 미달 → 에러

### Frontend

- [ ] Live Orders: Select Mode 진입/해제
- [ ] Live Orders: 체크박스 선택/해제
- [ ] Live Orders: Merge 버튼 동작
- [ ] Live Orders: Add Items 모달 표시
- [ ] Kitchen Display: Pending 컬럼 Done 버튼
- [ ] Settings: Printer Settings 저장
- [ ] Mobile: 쿠폰 적용 (API 연동)
- [ ] POS: 쿠폰 적용 (API 연동)

### 프린터

- [ ] 분리 프린터: 키친 티켓 → Kitchen Printer
- [ ] 분리 프린터: 영수증 → Bill Printer
- [ ] 단일 프린터: 둘 다 같은 프린터
- [ ] Additional items ticket 출력

---

## 14. 관련 문서

- [DEVELOPMENT_PLAN.md](/DEVELOPMENT_PLAN.md) - 전체 개발 현황
- [MEMBERSHIP_SYSTEM_PLAN.md](/docs/MEMBERSHIP_SYSTEM_PLAN.md) - 멤버십/포인트 시스템
- [PURCHASE_ORDER_SYSTEM.md](/docs/PURCHASE_ORDER_SYSTEM.md) - Phase 4 Purchase Order (다음 개발)
