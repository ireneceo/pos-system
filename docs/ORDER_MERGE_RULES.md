# Order Auto-Merge Rules

## 개요

같은 테이블에서 여러 주문이 들어올 때 자동으로 합치는(merge) 규칙.
백엔드 `routes/orders.js`의 `findMergeableOrder()` 함수에서 처리.

## Merge 조건 (모든 조건 충족 시에만 merge)

### 공통 조건
| 조건 | 설명 |
|------|------|
| 같은 restaurant_id | 같은 레스토랑 |
| 같은 table_number | 같은 테이블 (NULL이면 merge 안 함) |
| 같은 order_type | dine_in, takeaway 등 |
| 같은 payment_method | counter, bankTransfer, ewallet, online, card |
| 기존 주문 payment_status = 'pending' | 미결제 주문에만 merge |
| 새 주문 payment_status = 'pending' | 결제완료 주문은 merge 시도 안 함 |
| 기존 주문 status ≠ served/completed/cancelled | 활성 주문만 |
| 당일 (오늘 00:00~23:59) | 어제 주문에는 merge 안 함 |

### Source별 추가 조건

#### POS → POS (관리자)
- 공통 조건만 충족하면 merge
- 고객 정보 체크 없음 (캐셔가 통제)

#### Mobile → Mobile (고객)
- 공통 조건 + **같은 고객** 필수
- 고객 매칭 기준:
  - 둘 다 Member → `customer_id` 일치
  - 둘 다 Guest → `customer_phone` 일치
  - Member + Guest 혼합 → **merge 안 함**
  - Guest에 phone 없음 → **merge 안 함**

#### POS ↔ Mobile (교차)
- **절대 merge 안 함**
- POS 주문은 POS끼리만, Mobile 주문은 Mobile끼리만

## 시나리오 매트릭스

### POS → POS

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 1 | 미결제 counter | 미결제 counter | ✅ MERGE |
| 2 | 미결제 counter | 미결제 bankTransfer | ❌ 별도 |
| 3 | 미결제 counter | 미결제 online | ❌ 별도 |
| 4 | 미결제 counter | 미결제 ewallet | ❌ 별도 |
| 5 | 미결제 counter | 미결제 card | ❌ 별도 |
| 6 | 결제완료 | 미결제 | ❌ 별도 |
| 7 | 미결제 | 결제완료 | ❌ 별도 |

### Mobile → Mobile (같은 고객)

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 8 | Guest A (phone 111) counter | Guest A (phone 111) counter | ✅ MERGE |
| 9 | Member A (id 13) counter | Member A (id 13) counter | ✅ MERGE |

### Mobile → Mobile (다른 고객)

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 10 | Guest A (phone 111) | Guest B (phone 222) | ❌ 별도 |
| 11 | Member A (id 13) | Member B (id 20) | ❌ 별도 |
| 12 | Member (id 13) | Guest (phone 333) | ❌ 별도 |
| 13 | Guest (phone 333) | Member (id 13) | ❌ 별도 |

### Mobile → Mobile (같은 고객, 다른 결제방법)

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 14 | Guest A counter | Guest A bankTransfer | ❌ 별도 |
| 15 | Guest A counter | Guest A ewallet | ❌ 별도 |
| 16 | Guest A counter | Guest A online | ❌ 별도 |
| 17 | Member A counter | Member A bankTransfer | ❌ 별도 |

### Mobile → Mobile (결제상태 다름)

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 18 | Guest pending | Guest paid (같은 phone) | ❌ 별도 |
| 19 | Guest paid | Guest pending (같은 phone) | ❌ 별도 |

### Cross-source (POS ↔ Mobile)

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 20 | POS 미결제 | Mobile 미결제 | ❌ 별도 |
| 21 | Mobile 미결제 | POS 미결제 | ❌ 별도 |

### Edge Cases

| # | 기존 주문 | 새 주문 | 결과 |
|---|-----------|---------|------|
| 22 | Mobile Guest (no phone) | Mobile Guest (no phone) | ❌ 별도 (phone 없으면 매칭 불가) |
| 23 | POS (no customer info) | POS (no customer info) | ✅ MERGE (캐셔 통제) |

## 결제방법 목록

| payment_method | 설명 |
|---------------|------|
| counter | 카운터 결제 (후불) |
| bankTransfer | 은행 송금 |
| ewallet | QR 결제 (전자지갑) |
| online | 온라인 결제 (Stripe/PayPal) |
| card | 카드 결제 |

## Guest 정보 localStorage 관리

### 저장 위치
- `mobile_guest`: 게스트 고객 정보 (name, phone, email)
- `mobile_customer`: 멤버 로그인 정보
- `customerOrderIds`: 주문 ID 목록 (게스트/멤버 무관)

### 동작
- 게스트 주문 시 `mobile_guest`에 정보 저장
- 재방문 시 PaymentPage 폼에 자동 복원 (이름, 전화번호, 이메일)
- Member 탭 전환 시 폼은 비우지만 localStorage는 유지 → Guest 탭 복귀 시 복원
- 주문 히스토리: `customerOrderIds`로 로그인 없이도 주문 확인 가능

### 왜 필요한가
- 고객이 매번 이름을 다르게 입력하면 (Irene Kim → irene → IRENE) merge 매칭 실패
- 이전 입력값을 자동 복원하여 일관된 고객 정보 유지
- phone이 merge 매칭 기준이므로 phone 복원이 핵심

## 관련 코드

| 파일 | 함수/위치 |
|------|----------|
| `dev-backend/routes/orders.js` | `findMergeableOrder()` — merge 대상 검색 |
| `dev-backend/routes/orders.js` | `mergeItemsIntoOrder()` — 아이템 합치기 + 금액 재계산 |
| `dev-backend/routes/orders.js` | `router.post('/')` — 주문 생성 시 auto-merge 호출 |
| `dev-frontend/src/contexts/CustomerContext.tsx` | `mobile_guest` localStorage 저장/복원 |
| `dev-frontend/src/mobile/pages/PaymentPage.tsx` | Guest 폼 초기값 복원 + 탭 전환 로직 |
| `dev-backend/routes/restaurants.js` | `GET /:id/table-status` — 테이블당 멀티주문 배열 반환 |
| `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx` | 주문 탭 전환 UI |
| `dev-frontend/src/pages/FloorPlan/TableNode.tsx` | 멀티주문 뱃지 |

## Floor Plan 멀티주문 표시

### 표시 조건
- 당일 (오늘 00:00~23:59)
- status ≠ completed, served, cancelled
- 같은 테이블에 위 조건 주문이 2개 이상이면 멀티주문

### UI
- **테이블 타일**: 좌상단에 보라색 숫자 뱃지 (예: `2`)
- **상세 패널**: 헤더 아래에 주문번호 pill 탭. 클릭하면 해당 주문 상세로 전환
- **결제완료 표시**: 탭에서 결제완료 주문은 `✓` 표시

### API 응답 구조
```json
{
  "T5": {
    "tableNumber": "T5",
    "status": "occupied",
    "orderCount": 2,
    "orders": [
      { "orderId": 100, "orderNumber": "260316-001", ... },
      { "orderId": 101, "orderNumber": "260316-005", ... }
    ],
    // 첫 번째 주문 기준 (하위 호환)
    "orderId": 100,
    "orderNumber": "260316-001",
    ...
  }
}
```

## 2026-05-27 — v3.42 변경 (Mobile status override + Auto-merge 정책 완화)

### A. 모바일 주문 status override (서버측 강제)

**배경**: 모바일 PaymentPage 가 `status: 'outstanding'` 을 하드코딩한 채 `/api/orders` (`orders-crud.js` POST `/`) 로 호출. 백엔드에 source 분기가 없어서 매장 설정 (`requirePaymentBeforeKitchen`) 이 무시됐음.

**Fix**: `dev-backend/routes/orders-crud.js:386` 의 분기 직후, `isMobileSource` 일 때 매장 setting 을 보고 status 를 강제 override.

- 매장 Settings → Mobile Order 토글 **ON** → backend `requirePaymentBeforeKitchen = false` → status **`pending`** (즉시 KDS 진입)
- 매장 Settings → Mobile Order 토글 **OFF** → backend `requirePaymentBeforeKitchen = true` → status **`outstanding`** (결제 후 KDS)

> 토글 의미 반전 주의: **UI ON = DB false**, **UI OFF = DB true**. i18n 4언어 (en/ko/zh/ms) 라벨 "Send mobile orders to kitchen immediately" 로 통일.

### B. Auto-merge 정책 완화 (orders-crud.js + mobile-orders.js)

기존 § "Merge 조건" 의 일부 항목이 완화됨. 해당 조항은 **이 § 가 우선** (위 표는 2026-03-15 기준 스냅샷).

**현행 머지 조건 (2026-05-27)**:

| 조건 | 설명 |
|------|------|
| 같은 restaurant_id | 동일 |
| 같은 table_number | 동일 (NULL 머지 안 함) |
| 기존 주문 payment_status = 'pending' | 동일 |
| 기존 주문 status notIn (`served`, `completed`, `cancelled`) | 동일 |
| 당일 (오늘 00:00~23:59) | 동일 |
| 같은 source family | POS↔POS, Mobile↔Mobile (cross 금지 유지) |
| ~~같은 order_type~~ | **제거** — dine_in ↔ takeaway 무관하게 머지 |
| ~~같은 payment_method~~ | **제거** — counter/bankTransfer/ewallet/online/card 무관 |
| ~~Mobile→Mobile customer 매칭~~ | **제거** — guest/no-phone 도 머지 (phone/customer_id 일치 불요) |

**머지 시 status preservation (`preserveOutstanding`)**:
- 기존 `order.status === 'outstanding'` → 머지 후에도 **outstanding 유지** (결제 보호)
- 그 외 → **pending**

**머지된 신규 아이템 마킹**:
- 신규 item 에 `order_group: nextGroup` + `added_at: now` 첨부
- `nextGroup = Math.max(...existingGroups) + 1`. 최초 추가 라운드 = `1`, 두 번째 = `2`, …
- KDS 의 `+ ROUND N` divider + 자동 additional-items ticket 인쇄가 이 필드를 사용 (`docs/KITCHEN_DISPLAY_RULES.md` § B/C, `docs/PRINT_RULES_MATRIX.md` § C 참조)

### 관련 코드 (B)

| 파일 | 함수/위치 |
|------|----------|
| `dev-backend/routes/orders-crud.js` | `findMergeableOrder()` — 완화된 조건 적용 + `preserveOutstanding` |
| `dev-backend/routes/orders-crud.js` | `mergeItemsIntoOrder()` — `order_group` + `added_at` 신규 필드 첨부 |
| `dev-backend/routes/orders-crud.js:386` | mobile source status override 분기 |
| `dev-backend/routes/mobile-orders.js` | mobile 측 머지 진입점 (동일 정책) |
| `dev-frontend/src/mobile/pages/PaymentPage.tsx` | `status: 'outstanding'` 하드코딩 (백엔드가 override) |

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-03-15 | Auto-merge 규칙 강화: payment_method, source, customer 매칭 추가 |
| 2026-03-15 | Guest 정보 localStorage 복원 로직 추가 |
| 2026-03-15 | Floor Plan 멀티주문 표시: table-status API 배열 반환 + 주문 탭 UI + 테이블 뱃지 |
| 2026-05-27 | Mobile status override (`requirePaymentBeforeKitchen` 적용) + Auto-merge 완화 (order_type / payment_method / customer 매칭 제거) + 머지 아이템에 `order_group` / `added_at` 추가, `preserveOutstanding` 도입 |
