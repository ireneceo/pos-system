# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-01 (The Fire 3-이슈 데이터 무결성 fix — **운영 배포 완료**)
**버전:** v3.45 운영 (backstage 성격 — 버전 미상승, 보안/안정성 fix)
**작업 상태:** 운영 배포 완료 + 운영 검증 완료. **남은 것 = Issue 1(티켓 2장) 실프린터 눈 확인만.**

---

## 2026-06-01 운영 배포 완료 — The Fire 3 이슈 근본 fix (Backup 20260601_031208 + 20260601_032829)

> Irene: "더파이어 기준으로 모든 솔루션 문제 해결, 다시 안 생기게 + 배포 후 모든 주문루트 직접 검증 + The Fire 동일설정 테스트매장으로 결제완료까지." 인쇄 방식(method/routing) 무변경, 데이터 무결성 버그만 수정.

### 배포된 fix (2회 배포)
1. **오더티켓 2장 중복** — Floor Plan iframe POS 오버레이가 부모와 중복 poller 실행 → 오버레이는 poller off (POSTerminalPage `!isFloorPlanOverlay`). 인쇄 타이밍만, 방식 무변경. ⚠️ **실프린터 눈 확인 미완** (코드/headless 로는 종이 확인 불가).
2. **테이블번호 누락** — orders-crud TABLE_REQUIRED 가드: order_type 누락/빈문자열도 차단. PATCH `/:id` anti-wipe (dine-in table_number null/'' 무시, table_cleared 플래그로만).
3. **모바일↔POS 미매칭** — orders-crud POST 에 floor_plan_table_id derive 이식(PaymentPage 경로가 FPTI 안 보내 멀티존 미바인딩이 근본). PaymentPage `restaurant_id: currentStore?.id||1` 폴백 제거(미로드시 제출차단).
4. **라벨 불일치 머지** — "1"↔"T001"↔"Table 1" normalizeTableLabel 정규화 머지 (orders-crud + mobile-orders). **모호성 가드**: 정규화 후보 2+ 충돌(멀티존)이면 머지 안 함(유일 매칭만). 't' 접두는 숫자 앞만 제거(TEA1/A20 보존).
5. **(검증 중 발견) IDOR** — GET /orders/:id 에 소유권 검사 없어 타 매장 주문 조회 가능 → 인-핸들러 소유권 체크 추가(orders-payment.js 패턴).
6. i18n storeNotLoaded 4언어.

### 검증 (전부 실제 API)
- `/검증` 정식 10단계: state-hydration 0, build, health 88/88(bless 후), i18n Errors 0, 실브라우저 mount(pos-terminal/floor-plan/settings-payment/mobile-payment) 크래시 0.
- **운영 데모 r13 18 루트** 17/18 (1 = 내 테스트 데이터 버그, 코드 정상).
- **The Fire 100% 동일설정 테스트매장(is_test)** 모바일/POS/플로어플랜 **결제완료까지**: DEV 21/21, 운영 21/22(1=테스트데이터 버그) → 운영 재확인 3/3. 결제는 counter/card/ewallet 기록방식(실 게이트웨이 과금 X).
- 테스트매장: `[TEST] Fire Clone`, email `@test.invalid`(전송 3중 차단=.invalid/unverified/is_test), 검증 후 FK까지 완전삭제(잔여 0 확인).

### ⚠️ 다음: Issue 1 실프린터 확인 (Irene/매장)
The Fire 에서 **Floor Plan 으로 테이블 POS 열고 주문 → 키친 티켓 정확히 1장** 눈 확인. 문제 시 즉시 핫픽스.

---

## 2026-06-01 완료(DEV, 미배포) — The Fire 3 이슈 근본 fix

> Irene: "더파이어 기준으로 모든 솔루션 문제 해결, 다시는 안 생기게." 인쇄 방식(method/routing) 은 안 건드리고 **데이터 무결성 버그**만 수정. 새 빌드 main.02eeb8dd.js, autoprint regression 44 PASS, health-check 87/88(1 = 보호파일 무결성 플래그=의도한 2 edit), demo r38 실API 7/7.

### Issue 2 — 테이블번호 누락 (백엔드 구멍 2개)
- `orders-crud.js` TABLE_REQUIRED 가드: `order_type` 누락 시 dine-in 으로 간주 → 우회 차단 (기존엔 order_type 빠지면 통과)
- `orders-crud.js` PATCH `/:id` anti-wipe: dine-in 주문에 `table_number:null/''` 오면 무시(보존). table 비우기는 `table_cleared` 플래그로만. (5/31 settings-wipe 와 동일 클래스 차단). 명시적 table 변경은 허용.

### Issue 3 — 모바일↔POS 미매칭/미표시 (근본원인)
- **근본**: 모바일 실결제 경로 PaymentPage → `POST /api/orders`(source:mobile) 가 `floor_plan_table_id` 를 안 보냈고 orders-crud 도 derive 안 함 → 모든 모바일 주문 FPTI=null → multi-zone(The Fire) 에서 테이블 바인딩 실패("missing")
- fix: `orders-crud.js` POST 에 FPTI derive 이식 (label/tableNumber→canvas id). mobile-orders.js 와 동일 로직.
- `PaymentPage.tsx`: `restaurant_id: currentStore?.id || 1` 폴백 제거(3곳) → currentStore 미로드 시 제출 차단(잘못된 매장 1 로 가던 버그). resolvedRestaurantId 사용.

### Issue 1 — 오더티켓 2장 (가끔)
- **근본**: Floor Plan iframe POS 오버레이일 때 부모 FloorPlan + iframe POS **둘 다** useAutoPrintPoller 실행. 별도 JS realm → `__autoPrintInflight` dedupe 미공유 → 5초 폴 위상 겹치면 2장.
- fix: `POSTerminalPage.tsx` poller `enabled: ... && !isFloorPlanOverlay` (오버레이는 폴 안 함, 부모가 커버). **인쇄 방식/라우팅 무변경 — 타이밍만.**

### ⚠️ 배포 전 필수
1. **Issue 1 실프린터 확인**: Floor Plan 오버레이로 테이블 POS 열고 주문 → 키친 티켓 **정확히 1장** 확인 (Irene 눈). 확인 후에만 `node scripts/check-print-guard.js --bless` (POSTerminal+orders-crud 지문 재등록).
2. bless 안 하면 deploy fail-closed (보호파일 무결성 게이트). Irene 승인 + 실프린터 확인이 전제.

### 수정 파일
- 백엔드: `routes/orders-crud.js`🔒 (POST 가드+FPTI derive, PATCH anti-wipe)
- 프론트: `pages/POSTerminal/POSTerminalPage.tsx`🔒 (poller overlay 차단), `mobile/pages/PaymentPage.tsx` (restaurant_id 폴백 제거)

---

## 2026-06-01 완료(DEV, 미배포) — 테이블 이동 + 아이템 취소표 (풀버전)

> 설계+구현 완료. 문서: `docs/TABLE_MOVE_AND_VOID_TICKET.md`. **배포는 Irene 만.**
> Irene 결정: 점유시 물어보기(merge/cancel) / 권한 Staff포함 모두 / 취소사유 빠른버튼.

### 구현
1. **테이블 이동** — `POST /orders/:id/move-table` (트랜잭션+lock, table_number+FPTI 원자갱신, IDOR, onOccupied block(409+요약)/merge, 완료주문 차단, station변경시 printedItems 반환, 감사로그 table_moved). OrderAction ENUM 에 table_moved 추가(모델+DB). 프론트: TableDetailPanel [Move]버튼 + FloorPlanPage 목적지 picker 모달 + 점유시 merge/cancel + 🔒 station변경시 옛VOID/새재발행(호출만).
2. **아이템 취소표** — DELETE /items 가 removedItem 에 kitchen_station_id/was_printed 반환 + item-voided payload 보강. LiveOrders 삭제를 사유 빠른버튼 모달로 교체 → was_printed+wasInKitchen+설정 게이트시 취소아이템만 station 취소표.

### 검증: move 백엔드 14/14, mount 2/2, 인쇄계약 7/7, build main.d4ba91db.js, i18n 0err, autoprint 44.

### ⚠️ 배포 시 (Irene): `--bless` + The Fire 실프린터 확인 (이동 station변경 취소표/재발행, 아이템취소 취소표).

### (이전) 미배포 The Fire 3-이슈 fix — 별도 배포됨 (위 v3.45-hotfix 참조)

---

## 🔔 다음 세션 (이전 미해결 — 보류 중)
> 아래는 5/31 이월. The Fire 3-이슈 fix + 테이블이동/취소표가 우선이라 뒤로 밀림.

## 🔔 다음 세션 진입 시 이어서 할 것

### 1. BG dashboard 의 자동 trial 판정 (사용자 호소 미해결)
사용자 (Park Eun Jin, user 29) 가 https://purplehere.com/pos/brand/general/dashboard 에 "Brand Professional suspended" 로 표시되는 것 호소. 의도: 구독 시작일 (subscription_start) 미래면 그 전까지 자동 trial 표시.

**남은 작업**:
- BrandGeneralDashboard.tsx:756 의 status 표시 로직에 자동 trial 분기 추가
  ```
  if (subscription_start > now()) → SubscriptionBadge variant="trial" 표시
  ```
- Restaurant / Foodcourt / Owner / Supplier dashboard 도 같은 패턴 적용
- 사용자 의도 확인 필요: subscription_start **7/1** vs DB **8/1** (1개월 차이 — 사용자 입력 오류 또는 timezone) → 데이터 정정도 함께

### 2. user 29 (BG) 의 데이터 진단
운영 DB 상태:
- subscription_status = **suspended** (왜 자동 set 됐는지 scheduler 추적)
- grace_period_start = **2026-05-01** (오늘 31일째 — 누가 set?)
- subscription_start = 2026-08-01, trial_end_date = 2026-07-31

### 3. K-DINE IPC Branch (매장 8) QZ Tray 인쇄 실패 반복
오늘 이메일 폭주의 source. 매장 8 에서 QZ Tray diagnostic 반복 보고. 가드는 새 알림 차단했지만 매장의 실 인쇄 문제는 별도 진단 필요.

### 4. 매장 16 (The Fire) is_test=true
운영 영업 중인 매장인데 is_test=true. 새 가드 (`데모/테스트 매장 user 알림 skip`) 적용 후 The Fire user 한테는 영업 알림 안 감. **is_test=false 로 변경 필요** — 사용자 결정.

---

## 오늘 (2026-05-31) 완료 — 운영 배포됨 (Backup 20260531_150300)

### A. 설정 anti-wipe 가드 (5/31 The Fire 설정 소실 사고 영구 차단)
- 신규: `utils/settingsGuard.js` — printer/payment/operation/shallow 4 함수 + OPERATION_SETTINGS_ALLOWED_KEYS
- 적용: `routes/store.js:97~` (5/31 사고 직접 경로) + `routes/restaurants-crud.js:1611~` (기존 가드 교체)
- 규칙: null/`{}`/parse-error reject + deep merge + 부분 손실 보존
- 검증: unit 25/25 + API integration 10/10
- 메모: [[project_settings_guard_analysis]]

### B. 이메일 발송 invalid-recipient 가드
- 위치: `utils/notificationService.js:sendNotification` 1-a/1-b/1-c 가드 추가
- 1-a: `email_verified === false` → skip
- 1-b: placeholder 도메인 (pos-system.com, example.com, test.com, mailinator.com, .test/.local/.invalid 등) → skip
- 1-c: 데모/테스트 매장 (`is_demo OR is_test`) user → skip
- PLACEHOLDER_EMAIL_DOMAINS set + `_emailLooksValid()` + `_restaurantIsDemoOrTest()` helpers
- 검증: validator unit 16/16
- 5/31 메일 폭주 원인: System Admin (id=1) email=`admin@pos-system.com` (placeholder). 가드가 reject

### C. SubscriptionsPage Admin Edit modal 분기
- 위치: `pages/Admin/SubscriptionsPage.tsx:1554~` (라벨) + 1655~ (userType + hidePaymentModel)
- editingSubscription.entityType 기반 분기:
  - brand → "Brand" + Payment Model 숨김
  - foodcourt → "Foodcourt" + 숨김
  - owner → "Restaurant Owner" + 숨김
  - supplier → "Supplier" + 숨김
  - 그 외 (restaurant) → "Restaurant" + Payment Model 표시

### 운영 배포
- Backup: 20260531_150300
- Smoke: 10/10
- 운영 user 1 (legacy System Admin) email = `admin@pos-system.com` 그대로. 코드 가드가 reject. notNull 제약으로 null 변경 불가
- 진짜 System Admin = user 4 (`irene@irenewp.com`)
- Gmail outgoing queue 의 기존 retry 메일은 47시간 자동 종료. Irene 가 Gmail "보낸편지함" 에서 직접 삭제 가능

---

### 진행 중인 작업
- 없음 (컴퓨터 이동)

### 다음 확정 작업
- 위 #1 (BG dashboard 자동 trial 판정 + user 29 데이터 정정) 부터

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- subscription_status 자동 결정 scheduler 검토 (grace_period_start trigger)
- 매장 8 (K-DINE IPC) QZ Tray 인쇄 문제 진단
- 매장 16 is_test → false 변경 (사용자 결정 후)
- hydration marker (서버 가드 99% 차단 후 1% 추가 안전망 — 클라 변경 동반)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
