# Restaurant Reservation System (R1 MVP)

> **상태:** 설계 + 구현 진행
> **버전:** v3.29 후보
> **작성:** 2026-05-10
> **시장 base:** 말레이시아 (메모리 [Market base])
> **관련 문서:** `EMAIL_NOTIFICATION_MATRIX.md` / `PWA_PUSH_NOTIFICATIONS.md` / `ORDER_NOTIFICATION_SOUND.md`

---

## 1. 기능 정의 (확정)

| 항목 | 내용 |
|---|---|
| 기능명 | Restaurant Reservation System (R1 MVP) |
| 사용자 | Customer (모바일) / Restaurant Admin / Staff |
| 핵심 흐름 | 고객 예약 → 직원 승인 → 도착 체크인 → POS 주문 → 결제 |
| state machine | pending → confirmed → arrived → seated → completed / cancelled / no_show |
| 시장 base | MY. 외부 메시지 = WhatsApp `wa.me` + navigator.share (ReceiptShare 패턴 재사용) |
| 인프라 재사용 | payment_settings.availableIn / SettingsPage 11탭 / table_settings JSON / RestaurantCustomer / pushService v3.28 / Socket.IO /notifications / ReceiptShare / AutoSaveField / emailService 4언어 |

R1 비범위: WaitingList / Calendar monthly view / 좌석 평면도 / 보증금 자동 환불 cron / BG/FG/Owner 분석 / WhatsApp Business API / SMS / Google Maps / `.ics`

---

## 2. API 엔드포인트

신규 라우트 파일 2개:
- `dev-backend/routes/reservations-public.js` — 고객 모바일
- `dev-backend/routes/reservations-staff.js` — 매장 직원/관리자

### 2-A. Customer (모바일)

| Method | Path | 인증 | 설명 |
|---|---|---|---|
| GET | `/api/reservations/availability/:restaurant_id?date=YYYY-MM-DD&party=N` | (없음 — 공개) | 슬롯 가용성 조회. status=open / few_left / full 표시 |
| POST | `/api/reservations` | `customers-auth` (customer JWT) | 예약 생성. 응답에 deposit_required + payment_intent (옵션) |
| GET | `/api/reservations/me` | customer JWT | 본인 예약 list (upcoming + past) |
| GET | `/api/reservations/me/:id` | customer JWT | 본인 예약 단건 |
| PATCH | `/api/reservations/me/:id` | customer JWT | 변경 (시간/인원). 정책에 따라 가능 시간 제한 |
| DELETE | `/api/reservations/me/:id` | customer JWT | 취소. 환불 정책 자동 적용 |

### 2-B. Restaurant Staff / Admin

| Method | Path | 인증 | 설명 |
|---|---|---|---|
| GET | `/api/reservations/restaurant/:restaurant_id?date=&status=` | `authenticateToken` + `checkRestaurantAccess` | 오늘 또는 날짜 예약 list. status 필터 |
| GET | `/api/reservations/restaurant/:restaurant_id/pending` | 동일 | Pending 큐 (승인 대기) |
| POST | `/api/reservations/restaurant/:restaurant_id` | 동일 | 직원 직접 예약 생성 (전화 받은 경우) |
| PATCH | `/api/reservations/:id/status` | 동일 | status 전이 (confirmed/cancelled/arrived/seated/completed) |
| PATCH | `/api/reservations/:id/table` | 동일 | 좌석 배정 (table_number 매핑) |
| DELETE | `/api/reservations/:id` | 동일 (System Admin / Restaurant Admin) | 강제 삭제 (예외 케이스) |

### 2-C. Settings (Restaurant Admin Only)

기존 `/api/restaurants/:id` PUT 라우트로 처리. body 에 `reservation_settings` JSON 전달:

```javascript
PATCH /api/restaurants/:id  (기존 라우트)
body: { reservation_settings: {...}, table_settings: {...} }
```

### 응답 표준

성공: `{ success: true, data: ... }`
실패: `{ success: false, message: "..." }` (CLAUDE.md 표준)

### 에러 매트릭스

| 상황 | code | 응답 |
|---|---|---|
| 인증 없음 (customer JWT 필요) | 401 | `Customer authentication required` |
| 직원 라우트에 customer 토큰 | 403 | `Staff role required` |
| 다른 매장 예약 접근 (IDOR) | 403 | `checkRestaurantAccess` 차단 |
| 시간 슬롯 무효 (캐파 초과) | 400 | `Slot fully booked at this time` |
| 인원 초과 (max_party) | 400 | `Party size exceeds restaurant max` |
| 노쇼 3회 차단된 고객 | 403 | `Reservation blocked due to no-show history` |
| 정책상 변경 불가 (24h 미만) | 400 | `Cannot modify within 24h of reservation` |

---

## 3. DB 스키마

### 3-A. 신규 모델 1개: `Reservation`

| 컬럼 | 타입 | NULL | Default | FK / Index |
|---|---|---|---|---|
| id | INT PK auto | — | — | PK |
| restaurant_id | INT | NO | — | FK restaurants.id, index |
| customer_id | INT | YES | NULL | FK restaurant_customers.id ON DELETE SET NULL |
| guest_name | VARCHAR(100) | NO | — | 비회원 예약 fallback |
| guest_phone | VARCHAR(30) | NO | — | WhatsApp 알림용 |
| guest_email | VARCHAR(255) | YES | NULL | 이메일 알림용 |
| reserved_at | DATETIME | NO | — | index (날짜별 조회) |
| party_size | INT | NO | — | 인원수 |
| turn_minutes | INT | NO | 90 | 점유 예상 시간 (Restaurant.reservation_settings 의 default 값) |
| status | ENUM | NO | 'pending' | 8 값 (아래) |
| table_number | VARCHAR(20) | YES | NULL | 도착 시 매핑 |
| notes | TEXT | YES | NULL | 메모 (알레르기/생일/요청) |
| deposit_order_id | INT | YES | NULL | FK orders.id (보증금 주문) |
| source | ENUM | NO | 'customer_mobile' | customer_mobile / staff_phone / walk_in |
| confirmation_sent_at | DATETIME | YES | NULL | 확정 알림 발송 시각 |
| reminder_24h_sent_at | DATETIME | YES | NULL | 24시간 전 리마인드 발송 |
| reminder_2h_sent_at | DATETIME | YES | NULL | 2시간 전 리마인드 발송 |
| arrived_at | DATETIME | YES | NULL | 체크인 시각 |
| seated_at | DATETIME | YES | NULL | 좌석 배정 시각 |
| completed_at | DATETIME | YES | NULL | POS 주문 완료 시각 |
| cancelled_at | DATETIME | YES | NULL | 취소 시각 |
| cancelled_by | ENUM | YES | NULL | customer / staff / system |
| cancel_reason | TEXT | YES | NULL | 취소 사유 |
| no_show_at | DATETIME | YES | NULL | 노쇼 자동 판정 시각 |
| created_at / updated_at | DATETIME | NO | NOW | timestamps |

**status ENUM**: `'pending'`, `'confirmed'`, `'arrived'`, `'seated'`, `'completed'`, `'cancelled'`, `'no_show'`

**복합 인덱스**:
- `(restaurant_id, reserved_at)` — 날짜별 조회
- `(restaurant_id, status, reserved_at)` — 상태 필터
- `(customer_id, reserved_at)` — 고객 본인 예약 조회

### 3-B. 기존 모델 컬럼 확장 (모델 신규 X)

#### `Restaurant`
- `reservation_settings` JSON ALLOW NULL — **신규**
- `table_settings` JSON 의 `tables[]` 배열 — set/get 패턴 그대로, 안의 구조 확장

#### `RestaurantCustomer`
- `reservation_count` INT DEFAULT 0 — 누적 예약 수
- `no_show_count` INT DEFAULT 0 — 누적 노쇼
- `last_reservation_at` DATETIME NULL
- `allergies` TEXT NULL — 알레르기 정보
- `birthday` DATE NULL
- `vip_notes` TEXT NULL — 매장이 작성하는 VIP 메모

#### `Order`
- `reservation_id` INT NULL — FK reservations.id
- `order_type` ENUM 에 `'reservation_deposit'` 추가 (기존 dine_in / takeout / delivery 등에 추가)

### 3-C. `Restaurant.reservation_settings` JSON 구조

```json
{
  "enabled": false,
  "auto_confirm": false,
  "slot": {
    "duration_minutes": 30,
    "turn_time_minutes": 90,
    "advance_booking_days": 60,
    "min_advance_hours": 1,
    "min_party": 1,
    "max_party": 20,
    "max_covers_per_slot": 40
  },
  "deposit": {
    "enabled": false,
    "type": "fixed",
    "amount": 0,
    "min_party_for_deposit": 6
  },
  "cancellation_policy": {
    "free_until_hours": 24,
    "partial_refund_pct": 50,
    "no_refund_after_hours": 2
  },
  "no_show_policy": {
    "grace_minutes": 15,
    "auto_cancel_after_minutes": 30,
    "block_after_count": 3
  },
  "closed_dates": []
}
```

### 3-D. `Restaurant.table_settings.tables[]` 확장

기존 + 신규 배열:
```json
{
  "enableTableNumbers": true,
  "tablePrefix": "T",
  "totalTables": 20,
  "tables": [                            // 신규 (옵션 — 없으면 capacity 매핑 없이 운영)
    { "number": "T-1", "capacity": 2, "zone": "window" },
    { "number": "T-2", "capacity": 4, "zone": "hall" }
  ]
}
```

### 3-E. Sequelize 모델 + association

```javascript
// models/Reservation.js (신규)
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
Reservation.belongsTo(RestaurantCustomer, { foreignKey: 'customer_id', as: 'customer' });
Reservation.belongsTo(Order, { foreignKey: 'deposit_order_id', as: 'depositOrder', constraints: false });
Restaurant.hasMany(Reservation, { foreignKey: 'restaurant_id', as: 'reservations' });
RestaurantCustomer.hasMany(Reservation, { foreignKey: 'customer_id', as: 'reservations' });
Order.hasOne(Reservation, { foreignKey: 'deposit_order_id', as: 'reservation', constraints: false });
```

### 3-F. 마이그레이션 전략

`sync-database.js` 자동 — Reservation 테이블 신규 생성 + Restaurant/Order/RestaurantCustomer 컬럼 자동 추가. ENUM 추가는 별도 ALTER 필요할 수도 (운영 배포 전 점검).

---

## 4. UI 흐름

### 4-A. 페이지 매트릭스

| 페이지 | 위치 | 사용자 | 신규 / 기존 확장 |
|---|---|---|---|
| Settings 'reservation' 탭 | `pages/Settings/SettingsPage.tsx` (12번째 탭) | Restaurant Admin | 기존 페이지 확장 |
| ReservationsTimelinePage | `pages/Reservations/ReservationsTimelinePage.tsx` | RA / Staff | 신규 |
| 모바일 ReservationPage (단일 stepper) | `mobile/pages/ReservationPage.tsx` | Customer | 신규 |
| 모바일 ReservationsListPage | `mobile/pages/ReservationsListPage.tsx` | Customer | 신규 |
| ReservationShare 컴포넌트 | `mobile/components/common/ReservationShare.tsx` | Customer | 신규 (ReceiptShare 패턴 100%) |

### 4-B. 사이드바 / 라우트

`MainLayout.tsx` — 5 역할 dashboard 의 사이드바 안 'Reservations' NavItem 신규 (RA + Staff 만 노출, BG/FG/Owner 는 R3 이후 확장).

`App.tsx` 신규 lazy 라우트:
- `/pos/reservations/timeline` — ReservationsTimelinePage (RA/Staff)
- 모바일 (`/restaurant/:slug/reservation`, `/restaurant/:slug/reservations/me`) — 메뉴 페이지에서 진입

### 4-C. 모바일 ReservationPage (단일 stepper)

```
Step 1: 인원 선택 (2/3/4/5/6/7+ 큰 버튼)
Step 2: 날짜 선택 (캘린더 inline, 휴무일/풀부킹 회색)
Step 3: 시간 슬롯 (30min grid, 가능한 시간만 활성)
Step 4: 정보 + 메모 (이름/폰/알레르기·생일·요청 옵션)
Step 5: (옵션) 보증금 결제 — 활성 시 stripeCheckoutService 호출
Step 6: 확정 → ReservationShare (wa.me + navigator.share) + 푸시 + 이메일
```

빈 상태 / 로딩 / 에러: 각 step 의 표준 패턴 (skeleton / 빈 상태 메시지 / 에러 배너 — `UI_DESIGN_GUIDE.md`).

### 4-D. ReservationsTimelinePage (운영)

```
┌─ Pending 큐 (sticky 상단) ──────────────────────┐
│ [예약 대기 3건]                                  │
│ ┌─ 김철수 / 4명 / 19:00 / "VIP" ────────[승인][거절] ┐
│ ┌─ ...                                           ┘
└─────────────────────────────────────────────────┘
┌─ 오늘 timeline (시간순) ────────────────────────┐
│ 17:00  ──────────────────────────────           │
│   김미나 / 2명 / T-3 / arrived  [seated]        │
│ 18:00  ──────────────────────────────           │
│   박지훈 / 6명 / 미배정 / confirmed [check-in] │
└─────────────────────────────────────────────────┘
```

상태 색상: pending=노랑 / confirmed=초록 / arrived=파랑 / seated=보라 / no_show=회색.

### 4-E. Settings 'reservation' 탭

`AutoSaveField` 패턴 (NotificationSettings 와 동일):
- 활성화 토글
- 슬롯 / 턴타임 / 인원 limit (number input + AutoSave)
- auto_confirm 토글
- 보증금 활성/금액 (활성 시 payment_settings 의 'reservation_deposit' 채널 자동 등장 메시지)
- 취소 정책 3 필드 (free_until_hours / partial_refund_pct / no_refund_after_hours)
- 노쇼 정책 3 필드 (grace / auto_cancel / block_after_count)
- 휴무일 (DateField multi)

### 4-F. i18n namespace

신규: `public/locales/{en,ko,zh,ms}/reservation.json` — 4 언어. NotificationSettings / installPage 패턴 따라.

키 영역:
- `reservation.settings.*` — Settings 탭
- `reservation.timeline.*` — 운영 페이지
- `reservation.mobile.*` — 모바일 페이지
- `reservation.email.*` — 이메일 템플릿 4종
- `reservation.push.*` — 푸시 메시지 4 카테고리
- `reservation.share.*` — ReservationShare

### 4-G. 반응형

- ReservationsTimelinePage: 1024px 이하 카드 변환 (DataTable 패턴 비슷)
- ReservationPage 모바일: 풀스크린 stepper
- Settings 'reservation' 탭: SettingsPage 의 기존 반응형 그대로

### 4-H. 기존 기능 영향

| 영역 | 영향 |
|---|---|
| Order 모델 | reservation_id FK + order_type ENUM 'reservation_deposit' 추가 — 기존 주문 흐름 무관 |
| MainLayout | NavItem 1개 추가 (역할 가드) — 기존 메뉴 영향 0 |
| SettingsPage | 12번째 탭 추가 — 기존 11탭 영향 0 |
| pushService | 카테고리 4개 추가 — 기존 카테고리 영향 0 |
| Socket.IO `/notifications` | 이벤트 추가만 — namespace 변경 0 |
| ReceiptShare | 그대로 (ReservationShare 는 별도 컴포넌트) |

---

## 5. 코드 구현 (5단계)

5단계 파일 list — 실제 구현은 코드 작성 시 본문 채움.

| # | 파일 | 작업 |
|---|---|---|
| 1 | `models/Reservation.js` | 신규 |
| 2 | `models/Restaurant.js` | reservation_settings JSON 컬럼 |
| 3 | `models/RestaurantCustomer.js` | 컬럼 5개 추가 |
| 4 | `models/Order.js` | reservation_id + order_type ENUM |
| 5 | `models/index.js` | association 5개 |
| 6 | `routes/reservations-public.js` | 신규 (고객 6 endpoint) |
| 7 | `routes/reservations-staff.js` | 신규 (직원 6 endpoint) |
| 8 | `services/reservationScheduler.js` | 신규 (24h/2h 리마인드 + 노쇼 자동) |
| 9 | `services/reservationEmailTemplates.js` | 4 템플릿 (i18n 통합) |
| 10 | `routes/notification-settings.js` | 카테고리 4개 추가 |
| 11 | `services/socketService.js` | `/notifications` 이벤트 4개 emit |
| 12 | `server.js` | 라우트 2개 등록 + 스케줄러 start |
| 13 | `pages/Settings/SettingsPage.tsx` | 'reservation' 탭 추가 |
| 14 | `pages/Reservations/ReservationsTimelinePage.tsx` | 신규 |
| 15 | `mobile/pages/ReservationPage.tsx` | 신규 |
| 16 | `mobile/pages/ReservationsListPage.tsx` | 신규 |
| 17 | `mobile/components/common/ReservationShare.tsx` | 신규 (ReceiptShare 패턴) |
| 18 | `App.tsx` | 라우트 lazy import + path |
| 19 | `components/Layout/MainLayout.tsx` | NavItem (Reservations) |
| 20 | `public/locales/{en,ko,zh,ms}/reservation.json` | 4 언어 신규 |
| 21 | `services/i18n.ts` | namespace 등록 |

---

## 6. 테스트 시나리오

`docs/RESERVATION_SYSTEM_TESTS.md` (별도) + `dev-backend/test-reservation.js` 임시 스크립트.

핵심 케이스:
1. Customer POST /reservations (auto_confirm=false) → status=pending
2. Staff PATCH /:id/status (confirmed) → 고객에게 푸시 + 이메일
3. Customer PATCH /me/:id (시간 변경, 24h 미만) → 400 (정책 차단)
4. Customer DELETE /me/:id (24h 전) → status=cancelled, 보증금 환불
5. 노쇼 자동: 예약 시간 + 15분 + 도착 X → status=no_show
6. 직원 PATCH /:id/status (arrived → seated → table_number=T-3)
7. POS 주문 시 Order.reservation_id 자동 매핑 → 결제 완료 시 Reservation.status=completed
8. 권한: 다른 매장 예약 접근 → 403
9. 익명 customer 토큰 없이 POST → 401
10. ReservationShare WhatsApp 텍스트 빌드 + 운영 검증

`/검증` 10단계 + health-check 73/73.
