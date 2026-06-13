# 삭제/취소 PIN 승인 게이트 — 설계

> 작성 2026-06-13 (Irene 요청). 상태: **설계 완료, 미구현.**
> **진짜 목적 = 손실 방지(anti-theft).** 관리가 느슨한 매장에서 **직원이 (현금 결제된) 주문을 삭제/취소해 매출에서 지우고 현금을 횡령**하는 사고를 사장이 막고 **감시**하려는 요청 (Irene 2026-06-13). 따라서 ①삭제/취소를 권한 PIN 없이 못 하게 막고 ②**누가 무엇을 얼마짜리를 지웠는지 사장이 검토**할 수 있어야 한다 — **②(감사·리포트)가 설계의 핵심.**
> **로그인 세션 전환 아님** — 아이디는 그대로 두고 제한만 추가하려는 매장이 켜는 옵션. 연관: [STAFF_ACCESS_AND_IDENTITY_DESIGN.md](./STAFF_ACCESS_AND_IDENTITY_DESIGN.md), [ROLES_AND_PERMISSIONS.md](./ROLES_AND_PERMISSIONS.md).

## 1. 요구사항

- POS에 로그인한 사용자가 **삭제 권한이 있어도**, 설정이 켜져 있으면 삭제/취소 전에 **권한 있는 스탭(관리자급)의 PIN**을 입력해야 진행 → 직원 단독으로 삭제 불가.
- PIN은 **신원·권한 확인용일 뿐 세션을 바꾸지 않는다** (현재 로그인 계정 유지).
- 매장별 ON/OFF (기본 OFF). 끈 매장은 기존과 100% 동일.
- **사장 감시용 리포트**: 삭제·취소 내역(시각/주문/금액/결제상태/실행자/승인자/사유)을 Owner·Admin이 검토. 특히 **결제완료(현금) 주문의 void/cancel**을 눈에 띄게.
- 핵심 = 예방(PIN 게이트) + 추적(감사 리포트) 두 축.

## 2. 적용 범위 (Irene 2026-06-13 확정)

| 액션 | API | 게이트 |
|------|-----|:---:|
| 생성된 주문의 아이템 삭제(void) | `DELETE /api/orders/:id/items/:itemIndex` | ✓ |
| 주문 전체 취소(cancelled) | `PATCH /api/orders/:id/status` (status=cancelled) | ✓ |
| 주문 soft-delete (목록에서 삭제) | `DELETE /api/orders/:id` | ✗ (이미 Admin/Owner 전용) |
| POS 장바구니(미생성) 아이템 제거 | API 없음 (로컬 상태) | ✗ (마찰 과다) |

진입 화면: **Live Orders** + **Floor Plan TableDetailPanel** (둘 다 위 동일 API 사용). KDS는 삭제 UI 없음.

## 3. 기존 재사용 자산 (신규 발명 최소화)

이미 **할인 승인 PIN**이 정확히 같은 방식으로 동작 중 — 그대로 본뜬다.

| 자산 | 위치 | 재사용 |
|------|------|--------|
| 세션 전환 없는 PIN 검증 | `POST /api/staff/verify-pin-permission` (`routes/staff.js:119-160`) | 그대로 (permission만 'void_authorize'로) |
| PIN 모달(세션 무변경) | `components/POSTerminal/DiscountPinModal.tsx` | 복제 → `VoidPinModal` |
| 매장별 PIN namespace | `User.pin_code`(STRING4, restaurant_id 격리) | 그대로 |
| 권한 판정 패턴 | privilegedRoles + `permissions.includes(permission)` | 'void_authorize' 추가 |
| 설정 가드 | `utils/settingsGuard.js` OPERATION_SETTINGS_ALLOWED_KEYS | 키 추가 |

> 반대로 `POST /api/staff/verify-pin`(카운터 전환)은 **세션을 바꾸므로 쓰지 않는다.**

## 4. 기술 설계

### 4.1 설정 토글
- `operation_settings.requireVoidPin` (boolean, 기본 false).
- `settingsGuard.js`의 `OPERATION_SETTINGS_ALLOWED_KEYS`에 `requireVoidPin` 추가 → `store.js` PUT /settings 가 자동 보호(anti-wipe).
- 설정 UI: 매장 설정 operation 패널에 토글 1개 (라벨 "삭제/취소 시 PIN 요구", 힌트 "권한 있는 스탭의 PIN 입력. 로그인은 바뀌지 않습니다").

### 4.2 승인 권한 (Irene 확정: void 권한 스탭 + 관리자급)
- `verify-pin-permission`의 권한 판정에 `permission: 'void_authorize'` 추가.
- 통과 조건 = `role ∈ {Restaurant Admin, Restaurant Manager, Restaurant Owner, System Admin}` **또는** `permissions.includes('void_authorize')`.
- `void_authorize` 권한을 스탭 권한 목록(StaffManagementPage WorkAccessPicker 인접)에 노출 → 매장이 특정 스탭에게 부여 가능.

### 4.3 흐름 (프론트)
1. 삭제/취소 버튼 클릭 → `operation_settings.requireVoidPin` 확인.
2. OFF → 기존대로 즉시 진행.
3. ON → `VoidPinModal` 오픈 → PIN 입력 → `verify-pin-permission({ pin_code, permission:'void_authorize', restaurant_id })`.
4. `authorized:false` → 모달에 "권한 없는 PIN" 표시, 진행 차단.
5. `authorized:true` → 실제 삭제/취소 API 호출 (현재 세션·계정 그대로, 응답의 승인자명 `by`를 같이 전송).

### 4.4 백엔드 2단 방어 (프론트 우회 차단)
- 토글 ON인 매장의 `DELETE /items/:idx` 와 `PATCH /status`(cancelled)는 **body의 `void_pin`을 재검증**:
  - `void_pin` 없음 → 400 `{ code:'VOID_PIN_REQUIRED' }`.
  - `restaurant_id + void_pin` 으로 스탭 resolve → 권한 미달/미존재 → 403 `{ code:'VOID_PIN_INVALID' }`.
  - 통과 → 기존 삭제 로직 진행.
- 토글 OFF → 검증 건너뜀(기존 동작 100% 유지).
- 🔒 **인쇄 주의:** 이 검증은 삭제 핸들러 **진입부**(인쇄/취소표 발행 블록 이전)에 추가 — 인쇄 방식/라우팅/취소표 로직 무접촉. `routes/orders-crud.js` 변경이라 print-guard가 의도적 변경으로 플래그됨 → **배포→매장 실프린터 확인 후 `check-print-guard.js --bless`** (실프린터 확인은 배포해야 가능).

### 4.5 감사 기록 (예방만큼 중요)
- 이미 삭제/취소 시 `OrderAction` + `ActivityLog` 기록 중. 여기에 캡처 보강:
  - **실행자**(로그인 계정), **승인자**(approved_by_pin: PIN 스탭 id/name), **사유**(reason).
  - **금액**(지운 아이템가 또는 취소 주문 총액), **결제상태**(payment_status: 현금결제 완료분이 핵심 위험), **결제수단**.
  - 시각(매장 타임존), 주문번호, 테이블/주문타입.
- → "누가 / 언제 / 얼마짜리를 / 누구 승인으로 지웠는지" 한 줄로 추적.

## 5. 사장 감시 리포트 (Owner/Admin 전용) — 손실방지 핵심

> 직원 횡령 감시가 이 기능의 진짜 목적이므로, 기록을 **사장이 검토하는 화면**이 반드시 있어야 한다. (PIN 게이트만으로는 사후 적발 불가.)

- **Void & Cancellation Log** 화면 (Owner/Restaurant Admin 접근). 기존 OrderAction/ActivityLog 데이터를 조회.
- 컬럼: 시각 / 주문번호 / 금액 / **결제상태(현금완료 강조 배지)** / 실행자 / 승인 PIN 스탭 / 사유 / 테이블.
- 필터: 기간(DateRangeField), 직원, 결제상태, 액션종류(아이템삭제·주문취소). 합계(건수·금액) 표시.
- **현금 결제 완료 주문의 void/cancel**은 빨간 강조 — 사장이 가장 의심해야 할 패턴.
- 위치: 기존 리포트 영역(Reports 탭)에 "삭제/취소 감사" 추가. 사이드바는 Owner/Admin만.
- (선택) 일/주 단위 삭제 과다 직원 요약을 Owner 대시보드 또는 이메일 알림으로 — 2차.

## 6. 보안

- PIN 평문 흐름(현 할인 PIN과 동일 수준). 별도 강화는 범위 밖(기존 정책 따름).
- 백엔드 재검증으로 프론트 게이트 우회 차단 (게이트가 UX, 백엔드가 진짜 enforcement).
- IDOR: 기존 `restaurant_id` 일치 가드 유지 + PIN resolve도 `restaurant_id` 격리.
- 감사 리포트는 Owner/Admin 전용(checkRestaurantAccess) — 직원이 자기 삭제 이력 못 가리게.

## 7. 영향/파일 touch list (구현 시)

| 영역 | 파일 | 변경 |
|------|------|------|
| 설정 가드 | `dev-backend/utils/settingsGuard.js` | 화이트리스트 `requireVoidPin` |
| PIN 권한 | `dev-backend/routes/staff.js` | verify-pin-permission 'void_authorize' 분기 |
| 삭제/취소 enforce 🔒 | `dev-backend/routes/orders-crud.js` | DELETE/items·PATCH/status(cancelled) 진입부 PIN 재검증 + 감사 캡처 보강(금액·결제상태·실행자·승인자) (인쇄 블록 무접촉) |
| 감사 리포트 API | `dev-backend/routes/` (reports 또는 orders) | void/cancel 로그 조회(기간·직원·결제상태 필터, Owner/Admin) |
| PIN 모달 | `dev-frontend/.../POSTerminal/VoidPinModal.tsx` | DiscountPinModal 복제 |
| 진입점 | `dev-frontend/.../LiveOrders/LiveOrdersPage.tsx`, `FloorPlan/TableDetailPanel.tsx` | 삭제/취소 전 토글 체크 + 모달 |
| 감사 리포트 화면 | `dev-frontend/.../Reports/` | Void & Cancellation Log (현금완료 강조) |
| 설정 UI | 매장 설정 operation 패널 | 토글 1개 + i18n 4언어 |
| 권한 노출 | `StaffManagementPage` | 'void_authorize' 체크박스 |

## 8. 검증 시나리오 (구현 후)

1. 토글 OFF → 삭제/취소 기존대로 즉시 (회귀 0).
2. 토글 ON + 권한 PIN → 통과, 세션·계정 **안 바뀜** 확인.
3. 토글 ON + 권한 없는 PIN → 403, 차단.
4. 토글 ON + PIN 누락(프론트 우회) → 백엔드 400.
5. 감사 리포트에 시각·금액·결제상태·실행자·승인자 정확 기록 + 현금완료 void 강조 확인.
6. 직원 계정으로 감사 리포트 접근 → 차단(403).
7. 인쇄 계약 회귀(health print 8/8) + print-guard 의도 변경 1건만.
