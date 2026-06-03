# 서빙(홀 직원) 뷰 + 아이템별 리스트 — 설계

> 작성 2026-06-03 (Irene 요청). 상태: **DEV 구현 완료(2026-06-03), 미배포. 실브라우저 눈 확인 대기.**
> 결정: 별도 페이지 복사 ✗ → **Floor Plan 확장**(뷰 탭 + 단일 포스 capability 게이트). 인쇄 방식 무변경(🔒 보호).

## 0. 구현 상태 (2026-06-03)

**완료**: #1~#9 전부 구현. 빌드 main.2378a53e.js (타입에러 0).
- 백엔드: `middleware/auth.js`(requirePosCounter + userCanOperatePosCounter + req.user.permissions) / `orders-payment.js`(POST payments 게이트) / `orders-crud.js`🔒(items DELETE 게이트 + status cancelled 인라인 게이트) / `users.js`(신규 Staff pos_counter 기본) / `scripts/backfill-pos-counter.js`(신규, dev 11/11 적용).
- 프론트: `contexts/AuthContext.tsx`(canOperatePOS + Staff 기본권한) / `pages/Admin/StaffManagementPage.tsx`(Counter 토글) / `pages/FloorPlan/FloorPlanPage.tsx`(items 뷰·칩·게이트·기본뷰) / `TableDetailPanel.tsx`(결제/취소/void 게이트) / `ItemListView.tsx`(신규 Expo 리스트) / i18n floorplan·admin 4언어.

**검증 완료**:
- 백엔드 enforcement 실토큰 테스트 **6/6** (서빙 void/payment→403, 단계이동/서빙토글→비403, 카운터→비403).
- 빌드 타입0 / i18n verify 통과 / health-check 92/93(1=orders-crud🔒 지문 변경, 의도된 것) / RA mount 47/47 크래시0.
- backfill dry-run + 적용(11/11).

**남은 검증 (Irene 눈)**: 서빙 전용 Staff 로 **실 브라우저 로그인** → Items 탭 렌더/서빙 토글/카운터 버튼 숨김 시각 확인. (헤드리스는 이 환경에서 /auth/me fetch 가 막혀 세션 부트스트랩 불가 — 실로그인 필요.)
- ⚠️ 배포 시: orders-crud🔒 지문 변경 → `check-print-guard --bless`(Irene 승인) + 운영 backfill 스크립트 실행.

---

## 1. 요구사항 (Irene 확정)

- 홀에서 서빙 직원이 보는 화면. Floor Plan 과 동일하되 **카운터 전용 기능 제거**.
- **숨길 것(카운터 전용)**: 결제(Payment), 주문 취소(Cancel), 아이템 삭제/void, 현금박스 열기, 고객 디스플레이, Daily Settlement.
- **서버 허용**: 주문 넣기, 단계 이동(상태 진행), 필요한 프린트(주방 티켓 재발행), 품목별 서빙 완료.
- **신규 뷰 — 아이템별 리스트(Expo/Runner)**: 주문 순서대로 **아이템마다 한 줄**. 옵션·테이블번호 표시. 음식 나오면 바로 서빙 인지.
  - 행 탭 = **그 아이템 서빙 완료 토글**(Irene 확정).
  - **전체(조리중+준비됨) 표시, 준비됨 위로**(Irene 확정).
  - "주문 전체보기" → 기존 우측 패널(TableDetailPanel) 오픈(테이블/테이크웨이).
- 아이템 리스트 = 상단 뷰 탭의 하나 `[테이블 | 테이크웨이 | 아이템]`. 서버는 가장 많이 봄 → **기본 진입 = 아이템 탭**.

## 2. 아키텍처 결정 — 복사 ✗, 확장 ○

| 안 | 판정 | 이유 |
|----|------|------|
| 별도 페이지 복사 | ✗ | FloorPlanPage+TableDetailPanel ≈4,000줄. 복사 시 모든 미래 수정 2회 + 🔒 인쇄코드 2곳 → 반드시 drift. |
| **Floor Plan 확장 + 권한 게이트** | ○ | 뷰 탭(`activeView`)·Staff `permissions[]`·PIN 전환 인프라 이미 존재. 업계 표준(Toast/Square: 단일 테이블뷰 + 역할별 액션 노출 + Expo 리스트). |

## 3. 권한 모델 — 단일 capability (Irene 확정: 단일 토글)

- **새 권한 문자열: `pos_counter`** (카운터 운영 권한).
- 헬퍼: `canOperatePOS = (role === 'Restaurant Admin') || hasPermission('pos_counter')`.
  - Restaurant Admin = 항상 true. Staff = `pos_counter` 보유 시만.
- **부여 위치**: `StaffManagementPage` 직원 편집에 **"Counter (POS) operations" 토글** → `permissions` 배열에 `pos_counter` 추가/제거 (PUT `/api/users/:id`).
- **🔴 백워드 호환(중요)**: 현재 Staff 기본 권한에 `process_payment`/`use_pos` 포함 → 그냥 게이트하면 기존 직원 결제 상실(회귀).
  - **백필**: 기존 Staff 중 `process_payment` 또는 `use_pos` 보유자에게 `pos_counter` 자동 추가(현 동작 유지). 일회성 마이그레이션 스크립트.
  - 신규 Staff 기본 = `pos_counter` 포함. **순수 서빙 직원만 토글을 끈다.**
- **🔴 백엔드 enforcement(필수)**: UI 숨김만은 보안 구멍. 아래 엔드포인트에 capability 검사 추가(없으면 403):
  - 결제: `POST /orders/:id/create-payment-intent`, `capture-paypal-order` (orders-payment.js)
  - 주문 취소: `PATCH /orders/:id/status` 에서 **`status==='cancelled'` 만** 차단(단계 이동은 허용)
  - 아이템 void: `DELETE /orders/:id/items/:idx` (orders-crud.js:2040)
  - 정산: `GET /dashboard/:rid/sales-summary` (dashboard.js)
  - **허용 유지**: `PATCH /orders/:id/items`(서빙 토글), `PATCH status`(cancelled 외 단계), `POST /orders`(주문), 주방 프린트.
  - 검사 = `req.user.role === 'Restaurant Admin' || (req.user.permissions||[]).includes('pos_counter')`. 미들웨어 `requirePosCounter` 신설(middleware/auth.js).

## 4. 화면/UX

### 뷰 탭 (FloorPlanPage)
- `activeView: 'floor' | 'takeaway' | 'items'` (URL `?view=items`).
- 칩: `[존 필터들 | 테이크웨이 | 아이템]`. (FloorPlanPage:1542~1583 패턴 그대로.)
- `canOperatePOS=false` 면 진입 기본 view=`items`(없으면 floor).

### 게이트되는 UI (canOperatePOS=false → 미렌더)
- FloorPlanPage gear 메뉴: 현금박스 열기, 고객 디스플레이, (정산 링크 있으면).
- TableDetailPanel: **Payment 버튼**, **Cancel Order 버튼**, **아이템 DeleteItemBtn**(void).
- 유지: New Order, 단계 이동(Status 버튼), 주방 프린트, 품목 서빙 토글.

### 아이템별 리스트 뷰 (신규 `ItemListView.tsx`)
- 소스: 이미 Floor Plan 이 fetch 하는 `table-status data` + takeaway orders → **클라이언트에서 flat화**.
  - 각 주문의 `order_items` 펼침 → 행 = `{orderId, orderNumber, table/takeaway/pager, item, status, options, kitchen_station_id, added_at}`.
  - 제외: cancelled/완료 주문. 아이템 status `served`/`completed` 는 흐리게 or 하단(기본 제외 가능 — 전체 흐름 표시 위해 표시하되 dimmed).
  - 표시 status: `pending(queued)/preparing(cooking)/ready`. **정렬: ready 우선 → 그다음 added_at asc(주문순).**
- 행 내용: `수량 × 메뉴명` + 옵션/모디파이어 + **테이블#(또는 TAKEAWAY/PAGER)** + 상태칩 + 경과(분).
- 행 탭 = **서빙 완료 토글**(`handleToggleItemServed` 로직 재사용 — PATCH `/orders/:id/items`). served 처리 후 dimmed/제거.
- 행의 "주문 전체보기" → `setSelectedTableId`(dine-in) 또는 `setSelectedTakeawayOrderId`(takeaway) → 기존 우측 패널 오픈.
- 테마: 기존 `--pos-*` 토큰 사용(밝게/고대비/어둡게 일관).

## 5. 구현 touch points

| 영역 | 파일 | 변경 |
|------|------|------|
| 권한 문자열·헬퍼 | `contexts/AuthContext.tsx` | `canOperatePOS` 헬퍼/노출 (hasPermission 재사용) |
| 직원 토글 | `pages/Admin/StaffManagementPage.tsx` | "Counter (POS) operations" 토글 → permissions 갱신 |
| 백필 | `dev-backend/scripts/backfill-pos-counter.js`(신규) | 기존 Staff process_payment/use_pos→pos_counter |
| 백엔드 게이트 | `middleware/auth.js`(requirePosCounter) + `orders-payment.js`/`orders-crud.js`(status cancelled, items DELETE)/`dashboard.js` | capability 검사 403 |
| 뷰 탭 | `pages/FloorPlan/FloorPlanPage.tsx` | activeView 'items' + 칩 + 분기 + 기본뷰 + gear 게이트 |
| 패널 게이트 | `pages/FloorPlan/TableDetailPanel.tsx` | Payment/Cancel/Delete 버튼 `canOperatePOS` 게이트 |
| 신규 컴포넌트 | `pages/FloorPlan/ItemListView.tsx`(신규) | Expo/Runner 아이템 리스트 |
| i18n | `public/locales/{en,ko,zh,ms}/floorplan.json` | 탭·라벨·빈상태 4언어 |

**DB 스키마 변경 없음** (권한은 기존 User.permissions JSON 배열 재사용). 신규 모델 0.

## 6. 검증 계획
- 백엔드 enforcement: `pos_counter` 없는 Staff 토큰으로 결제/취소/void/정산 호출 → **403**. 단계이동/서빙토글/주문 → 200.
- 아이템 리스트 flat 정확성(주문순·ready 우선·옵션/테이블 표시), 서빙 토글 왕복.
- canOperatePOS=false 로 mount → 카운터 버튼 0개 렌더(headless).
- 백필 스크립트 dry-run + 적용 후 기존 직원 동작 동일.
- mount 47/47, i18n verify, health-check.

## 7. API / Enforcement 계약 (기능설계 — 백엔드)

| 액션 | 메서드·경로 | pos_counter 필요? | enforcement |
|------|------------|:----------------:|-------------|
| **카운터 결제 기록** | `POST /orders/:id/payments` | ✅ | `requirePosCounter` (인증된 직원 수납) |
| 모바일 게스트 결제 | `POST /orders/:id/create-payment-intent`, `capture-paypal-order` | ❌ | **게이트 안 함**(게스트 공개 경로) — UI 숨김만 |
| 주문 취소 | `PATCH /orders/:id/status` (status==='cancelled') | ✅ | 인라인: cancelled 면 capability 검사 |
| 단계 이동 | `PATCH /orders/:id/status` (그 외 status) | ❌ | 통과 |
| 아이템 void | `DELETE /orders/:id/items/:idx` | ✅ | `requirePosCounter` |
| 서빙 토글 | `PATCH /orders/:id/items` | ❌ | 통과 |
| 주문 생성 | `POST /orders` | ❌ | 통과 |
| 정산 조회 | `GET /restaurant/:rid/reports-summary` | ❌ | **게이트 안 함**(Owner/Manager 도 리포트 조회) — UI(gear 메뉴) 숨김만 |

- `requirePosCounter` (middleware/auth.js 신설): `req.user.role ∈ {System Admin, Restaurant Admin} || (req.user.permissions||[]).includes('pos_counter')` → 아니면 403 `code:'POS_COUNTER_REQUIRED'`. `userCanOperatePosCounter(user)` 헬퍼도 export(인라인 분기용).
- **인증 미들웨어 `req.user` 에 `permissions` 추가**(auth.js) — 기존엔 미포함이라 capability 검사 위해 필요.
- 권한 저장: `PUT /users/:id` 가 `permissions` 배열 passthrough 영속(User.permissions JSON setter). 신규 backend 영속 코드 불필요.
- **결제 intent/capture·정산은 다중 역할/게스트 공유 경로라 백엔드 게이트 불가 → UI 숨김으로 처리**(서버는 그 트리거에 도달 안 함). 직원-인증 카운터 경로(payments 기록·void·cancel)만 하드 게이트.

## 8. UI 컴포넌트 스펙 (기능설계 — 통일 디자인)

> 전부 기존 디자인 시스템 재사용: `--pos-*` 테마 토큰(밝게/고대비/어둡게), LiveOrders 상태색(#10B981 ready / #F59E0B preparing / #9CA3AF queued), Card/Modal 표준, 이모지 ✗, `+` prefix ✗, 터치 44px+.

### 뷰 탭 칩 (ZoneChip 재사용)
`[ 존필터들 | Takeaway | Items (n) ]` — 동일 ZoneChip 컴포넌트, active 토큰 동일.

### ItemListView (신규) — Expo/Runner
- 컨테이너: `--pos-menu-bg`, 카드 그리드 아님(리스트). 행 높이 ≥ 56px(터치).
- 행(ItemRow): 좌측 상태칩(원형/색) · `수량 × 메뉴명`(17px/700, `--pos-text`) · 옵션(13px, `--pos-text-muted`) · 우측 **테이블 배지**(굵게) + 경과(분).
  - 정렬: status `ready` 우선 → `added_at` asc. served/완료 = 하단 dimmed(opacity .5) or 토글로 숨김.
  - 탭 = 서빙 완료 토글(낙관적 업데이트 + PATCH items). ready→served 시 행 dimmed.
  - 행 우측 끝 보조 액션 "주문 전체보기"(IconButton, 패널 오픈).
- 빈 상태: 텍스트만(이모지 금지) "활성 아이템 없음".
- 헤더 작은 요약: 총 n개 · ready m개.

### 게이트 표현
- 버튼 자체를 렌더 안 함(disabled 회색 아님 — 서버에게 보일 이유 없음). 레이아웃 빈자리 없게 조건부 렌더.

## 9. 6-단계 매핑 (기능설계 체크)
1. **기능 정의** = §1 요구사항. 2. **API** = §7 계약. 3. **DB** = 변경 없음(User.permissions JSON 재사용). 4. **UI** = §4+§8. 5. **코드** = §5 touch points. 6. **테스트** = §6.

## 10. 비범위(이번 아님)
- 모달 다크화/KDS 테마(별도 Phase C 잔여).
- 정산 페이지 자체 UI(서빙뷰엔 링크만 게이트).
