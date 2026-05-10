# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-10 (Irene 자리 비움 — 2시간 후 재개)
**버전:** v3.27 + WIP v3.28 (PWA push notifications 80% 구현)
**작업 상태:** 중단 (PWA push 시스템 구현 중, 빌드/검증 전)

---

## ⚡ 빠른 재개 (새 세션에서 이것만 붙여넣기)

```
session-state.md 읽고 이어서 개발해.
```

---

## 🔖 지금 중단 지점 — PWA Push Notifications (v3.28 신규 sprint)

**진행 단계:** 6단계 중 5단계(코드 구현) 80% 완료. 빌드 + 검증 미수행.

**완료된 것 (커밋 `6bc3d3ee`):**

Backend (모두 작동, pm2 재시작 + DB sync 완료):
- `models/PushSubscription.js` 신규 (endpoint UNIQUE prefix(255) 포함)
- `models/PushLog.js` 신규 (90일 보존 가정 / cron 정리는 별도)
- `models/User.js` 컬럼 3개 추가: `push_enabled` BOOLEAN, `push_preferences` JSON, `push_muted_hours` JSON
- `models/index.js` association 추가
- `services/pushService.js` 신규 — sendPushToUser/Role/Restaurant/Brand/Foodcourt/Supplier + emitInApp 통합 + 410/404 expired_at + isValidEndpoint 4 push service host whitelist
- `routes/push.js` 신규 — 8 endpoints (vapid-public-key, subscribe, unsubscribe, preferences GET/PUT, test, admin/stats, admin/logs) + per-user rate-limit (5/min for /test)
- `services/socketService.js` 에 `/notifications` namespace 추가 + JWT auth middleware + room join (user/restaurant/brand/foodcourt/supplier/system_admin)
- `routes/notification-settings.js` 에 push-only 카테고리 5개 추가 (order_new/order_status/kitchen_alert/inventory_low/staff_call)
- `server.js` push router 등록 + `module.exports.io = io` (pushService 가 io 참조)
- `.env` VAPID_PUBLIC_KEY/PRIVATE_KEY/SUBJECT 추가 (생성됨)
- npm: `web-push` 설치
- DB: push_subscriptions / push_logs 테이블 sync 완료, users 컬럼 추가 완료. `GET /api/push/vapid-public-key` 200 검증됨

Frontend:
- `public/manifest.json` 갱신 (icons 192/512 + start_url + scope + maskable)
- `public/sw.js` 신규 — push event + same-origin notificationclick + Badge API + pushsubscriptionchange
- `src/services/push.ts` 신규 — register/subscribe/unsubscribe/reconcilePermissionState/getPreferences/updatePreferences/sendTestPush
- `src/contexts/PwaInstallContext.tsx` 신규 — beforeinstallprompt + isStandalone + iOS UA + localStorage 7일 dismiss
- `src/components/Common/PwaInstallBanner.tsx` 신규 — Android 설치 CTA + iOS 가이드 분기
- `src/components/Common/NotificationToaster.tsx` 신규 — Socket.IO `/notifications` 연결 + 200ms ping debounce + Web Audio chime + 권한 reconcile on focus
- `src/pages/Landing/InstallPage.tsx` 신규 — UA 분기 (android/ios/macos/windows/desktop) + iOS 16 미만 푸시 경고
- `src/index.tsx` SW 등록 추가
- `src/App.tsx` PwaInstallProvider + NotificationToaster + PwaInstallBanner mount + `/install` 라우트 + import 추가
- `src/components/Landing/LandingHeader.tsx` GNB + 모바일 메뉴에 Install App 추가
- `public/locales/en/landing.json` installPage.* 키 28개 추가 (영어만)

**남은 작업 (재개 시 순서대로):**

1. **i18n 3 언어** — `public/locales/{ko,zh,ms}/landing.json` 에 영어와 동일 28 키 번역 추가
2. **i18n common.json (4 언어)** — `pwa.installBanner.{title,iosGuide,iosOldGuide,androidDesktopGuide,installButton,dismissButton}` 6 키 + `nav.install` 1 키
3. **Settings 페이지에 Push 토글** — 기존 NotificationSettings 페이지에 master toggle + 카테고리 on/off + muted hours 설정 + Test 버튼 (subscribeToPush/sendTestPush 호출)
4. **빌드** — `cd /var/www/dev-frontend && npm run build:dev` (run_in_background, CRA 빌드)
5. **검증 (10단계 /검증)**:
   - 0. state-hydration-check
   - 1. 빌드 성공
   - 2. pm2 dev-backend 재시작 + 에러로그
   - 3. API 실호출 — VAPID/subscribe (mock endpoint test) + preferences GET/PUT + /test rate-limit (6번째 요청 429 확인) + admin/stats/logs
   - 4. 프론트 SW 등록 확인 (curl /sw.js 200 + manifest.json + chunk 안 push.ts/Toaster/Banner 키 포함)
   - 5. 5 역할 socket 연결 + room join 검증 (token 위조 시 connect_error)
   - 6. 요구사항 대조 (PlanQ 개선 7개 모두 반영 — rate-limit / form dirty reload / ping debounce / endpoint host 검증 / endpoint reassign cleanup / PushLog / 권한 회수 자동)
   - 7. 연관 영향 (기존 socket.io /orders namespace 영향 없음)
   - 8. UI/UX (banner + toaster 디자인 토큰 일치)
   - 9. SPA 라우팅 /install 200
   - 10. health-check 73/73
6. **설계 문서 작성** — `docs/PWA_PUSH_NOTIFICATIONS.md` (1~6단계 산출물)
7. **session-state + DEVELOPMENT_PLAN 업데이트** — backstage cleanup? 아니면 신규 기능이라 v3.28 버전 상승? **신규 기능이라 v3.28 상승이 맞음** — 기존 사용자 영향 없는 선택적 기능이므로 CHANGELOG `[v3.28]` 추가 + 운영 배포 시 VAPID 키 운영 .env 따로 생성 필요 (dev 키 절대 운영 사용 X)

**맥락 유지할 것:**
- PlanQ 코드 절대 수정 X (메모리 [PlanQ 서버 정보])
- PlanQ 에서 발견한 7개 개선사항 모두 반영 — rate-limit ✓ / endpoint host whitelist ✓ / endpoint reassign soft-delete ✓ / PushLog ✓ / 권한 회수 자동 ✓ / 200ms ping debounce ✓ / form dirty reload skip = 아직 미적용 (BUILD_ID 자동 무효화 자체를 이번 sprint 에서 안 만들었음 — POS 는 CRA 라 PlanQ Vite 패턴 다름. 별도 sprint)
- /install 페이지 헤더에서 진입, beforeinstallprompt 받으면 Banner 자동 표시
- iOS 16.4 미만은 PWA 설치 OK + 푸시 X — InstallPage 와 Banner 모두 안내
- Subscription.payer_type ENUM 'supplier' 도 모델만 추가 (DB 레거시 — 별도 sprint)

**WIP commit:** `6bc3d3ee`

---

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-05-10 세션)

**Self-managed Restaurant 모드 (backstage cleanup, 버전 미상승)**
- POST `/api/restaurants` 에서 `activate_subscription:false` 시 plan_type/plan_amount/billing_cycle/subscription_start/subscription_end/subscription_snapshot/limits 모두 NULL 명시 저장 (Restaurant 모델 default 자동 할당 회피)
- PUT 핸들러에 `wipeSubscription` 분기 추가 — 활성 → self-managed 전환 시 plan/billing/period + pending_* + plan_change_* 모두 NULL wipe + divertToPending 우회
- Frontend RestaurantsPage Add/Edit 모달의 plan/billing/period/auto-renew/trial 토글 섹션을 `activateSubscription` conditional 로 hide. Self-managed banner (회색 info box) 추가. 토글 텍스트에서 ⚠️ 이모지 제거
- Edit 모달에 `activateSubscription` 토글 추가 + plan_type 없는 매장 진입 시 OFF 자동 표시
- 목록 매장 row 에 `Self-managed` 배지 (plan_type IS NULL 일 때 회색 배지)
- i18n 4언어 6개 키 추가 (`restaurantsPage.activateSubscription.*`, `restaurantsPage.selfManaged.*`)
- 검증: API 실호출 18/18 통과 (POST/GET/PUT 활성↔self-managed 양방향 + invoice 자동 생성↔skip + DB raw NULL 확인). health-check 73/73 통과
- 의도: BG/FG/Owner 가 본인 산하 매장을 시스템에 등록할 때 POS 구독 강제 없이 데이터 관리 전용으로 등록 가능. 추후 Edit 으로 구독 활성화

### 이전 세션 완료 작업 (v3.27, 2026-05-08)

**Sprint 1 — FG 온보딩 + Walkthrough 시스템 신규**
- User.tutorial_progress JSON 컬럼 + GET/PUT API
- `<Walkthrough>` overlay/spotlight/tooltip 자체 구현 + `<TourTrigger>` 헤더 버튼
- useSetupStatus FG path 정합 + SetupGuide locked 클릭 차단
- FG 5 페이지 EmptyState 통일 + steps 가이드
- i18n 4언어 walkthrough.json
- 설계 문서 `docs/FG_ONBOARDING_v3.26.md`

**Sprint 2 — 트랙 C 데모 데이터 시드**
- FC44 12 units + 2 tenants + 6 contracts
- Owner 4 매장 cats/prods/orders
- BG B10/B1 brandProducts 시드
- R38 30일 시계열 주문 + 모든 회사정보 정합
- 5 idempotent seed scripts

**Sprint 3 — 5 역할 Walkthrough 확장**
- MainLayout 17개 NavItem data-tour 부착
- 5 dashboard (RA/BG/Owner/Admin/Supplier) Walkthrough mount + step 정의
- i18n 4언어 27 step entries

**Sprint 4 — Subscription Form 통일 (v3.27)**
- User 모델에 discount_type/value/reason 컬럼 추가
- routes/users.js POST/PUT discount 처리 + SUBSCRIBING_ROLES 에 Supplier Admin
- `<SubscriptionFormFields>` 9-필드 통합 컴포넌트
- SubscriptionsPage / ManagersPage Add modal 통일
- i18n 4언어 subscription.json
- 설계 문서 `docs/SUBSCRIPTION_FORM_UNIFY_v3.27.md`

**v3.27 운영 배포**
- 운영 sites 7/7 200 + DB 자동 sync (tutorial_progress / discount_*)
- CHANGELOG `[Unreleased]` → `[v3.27] — 2026-05-08 배포` 이동
- 버전 v3.24 → v3.27 일괄 점프
- 랜딩 블로그 `/blog/release-v3.27` + System Admin 공지 자동 등록

### 다음 할 일

1. **운영 demo 시드 ID 파라미터화** (트랙 C 운영 적용)
   - 운영 demo 계정 ID 가 dev 와 다름 (FC44→FC1, B10→B4, R38→R13, SC20→SC1)
   - 시드 스크립트를 환경변수/인자로 ID 받게 리팩터 후 운영 적용
2. **RestaurantsPage Add/Edit 의 SubscriptionFormFields 통합** (현재 잘 동작하는 분리 form 을 통일된 컴포넌트로 교체)
3. **SubscriptionsPage / ManagersPage 의 Edit modal** 도 SubscriptionFormFields 사용으로 교체 (이번 sprint 는 Add 만)
4. **Walkthrough 적용 페이지 확장** — 메뉴 / 설정 등 dashboard 외 페이지에도 step-by-step 안내 (사용자 요청 시)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
