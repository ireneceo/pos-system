# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-31 (컴퓨터 이동 임시 저장)
**버전:** v3.45 운영 (오늘 backstage 가드 fix 운영 배포 완료 — 버전 미상승)
**작업 상태:** 진행 중 (컴퓨터 이동 — 다음 세션 이어서)

---

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
