# PWA Push Notifications (v3.28+)

> **상태:** 구현 완료, 검증 진행 중
> **작성일:** 2026-05-10
> **관련 문서:** `EMAIL_NOTIFICATION_MATRIX.md` (병렬 채널), `ORDER_NOTIFICATION_SOUND.md` (in-app 사운드)

Purple POS 를 데스크탑/모바일 모두 PWA 로 설치 가능하게 하고, OS 레벨 푸시 알림 + Socket.IO in-app 알림 + 매장 운영 카테고리/muted hours 설정까지 통합. PlanQ 의 PWA 패턴을 차용하되 PlanQ 코드 리뷰에서 발견된 7개 개선사항을 처음부터 반영.

---

## 1. 기능 정의

| 항목 | 내용 |
|------|------|
| 핵심 사용자 | 5 역할 모두 (Restaurant Admin/Staff, BG, FG, Owner, Supplier Admin) |
| 핵심 시나리오 | 매장 영업 중 Restaurant Admin/Staff 가 PWA 데스크탑 설치 → 백그라운드에서도 새 주문 푸시 + 사이렌 + Badge 카운트 |
| 성공 기준 | 새 주문 5초 이내 OS 푸시 도달, 5 역할 모두 자기 도메인 핵심 이벤트 1개+ 푸시 수신, iOS 16.4+ 푸시 작동 |
| 비범위 | Native 앱(Electron/Capacitor), App Store, FCM/OneSignal 외부 SaaS, 알림 히스토리 페이지, A/B 테스트 |

## 2. API 엔드포인트

신규 라우트 파일: `routes/push.js`

| Method | Path | 인증 | 응답 |
|---|---|---|---|
| GET | `/api/push/vapid-public-key` | 공개 | `{ success, data: { publicKey } }` |
| POST | `/api/push/subscribe` | `authenticateToken` + endpoint host whitelist | `{ success, data: { id, created } }` |
| DELETE | `/api/push/subscribe` | `authenticateToken` | `{ success }` |
| GET | `/api/push/preferences` | `authenticateToken` | `{ success, data: { push_enabled, categories, muted_hours } }` |
| PUT | `/api/push/preferences` | `authenticateToken` + 0-23 범위 검증 | `{ success, data: ... }` |
| POST | `/api/push/test` | `authenticateToken` + **rate-limit 5/min/user** | `{ success, data: { sent, failed, skipped } }` |
| GET | `/api/push/admin/stats` | `requireRole('System Admin')` | `{ active_subscriptions, sent_24h, failed_24h, by_browser, by_role }` |
| GET | `/api/push/admin/logs` | `requireRole('System Admin')` | `{ data: PushLog[], pagination }` |

### Internal 서비스 (`services/pushService.js`)

```
sendPushToUser(userId, payload)
sendPushToRole(role, payload)
sendPushToRestaurant(restaurantId, payload)
sendPushToBrand(brandId, payload)
sendPushToFoodcourt(foodcourtId, payload)
sendPushToSupplier(supplierCompanyId, payload)
```

각 호출은 (1) push_enabled 마스터 토글, (2) **`notification_preferences[category]` 우선 + `push_preferences.categories[category]` fallback** (v3.30+ 통합 — NotificationSettings UI 의 단일 source of truth. 둘 중 하나라도 false 면 차단), (3) `push_muted_hours`(OS 만), (4) PushLog 기록, (5) 410/404 시 expired_at 마크 자동 처리. **In-app socket emit 은 muted_hours 무시** — 토스트는 항상 표시, OS 알림만 야간 무음.

### Endpoint host 화이트리스트 (PlanQ 개선)

`isValidEndpoint()` 가 다음 host 만 허용:
- `fcm.googleapis.com` (Chrome/Android)
- `updates.push.services.mozilla.com` (Firefox)
- `*.push.apple.com` (Safari/iOS 16.4+)
- `*.notify.windows.com` (Edge legacy)

## 3. DB 스키마

### `push_subscriptions`

| 컬럼 | 타입 | NULL | 인덱스 |
|---|---|---|---|
| id | INT PK | — | PK |
| user_id | INT | NO | FK users.id ON DELETE CASCADE |
| endpoint | TEXT | NO | UNIQUE prefix(255) |
| p256dh | VARCHAR(255) | NO | — |
| auth | VARCHAR(255) | NO | — |
| user_agent | VARCHAR(500) | YES | — |
| expired_at | DATETIME | YES | (활성 조회용 composite) |
| deleted_at | DATETIME | YES | soft delete (endpoint reassign 추적) |
| created_at / updated_at | DATETIME | NO | — |

복합 인덱스: `(user_id, expired_at, deleted_at)` — 활성 구독 조회

### `push_logs`

| 컬럼 | 타입 | NULL | 비고 |
|---|---|---|---|
| id | BIGINT PK | — | 대량 row 대비 |
| user_id | INT | YES | FK ON DELETE SET NULL |
| subscription_id | INT | YES | FK ON DELETE SET NULL |
| category | VARCHAR(50) | NO | NOTIFICATION_CATEGORIES key |
| title / body | VARCHAR/TEXT | YES | — |
| status | ENUM | NO | `sent / failed / expired_endpoint / category_off / muted / no_subscription` |
| error_code | VARCHAR(50) | YES | HTTP 410/404 등 |
| error_message | TEXT | YES | — |
| sent_at | DATETIME | NO | 90일 cron 정리 기준 (별도 sprint) |

복합 인덱스: `(user_id, sent_at)`, `(status, sent_at)`, `(category, sent_at)`

### `users` 컬럼 추가

| 컬럼 | 타입 | Default | 설명 |
|---|---|---|---|
| push_enabled | BOOLEAN | TRUE | 마스터 토글 |
| push_preferences | JSON | NULL | (레거시) `{ categories: { order_new: true, ... } }`. v3.30+ 에서 `notification_preferences` 가 우선 source. 둘 다 검사 — 어느 쪽이든 false 면 차단 (호환). |
| notification_preferences | JSON | NULL | (v3.30+ 통합) NotificationSettings UI 가 저장. 푸시·이메일 공통 카테고리 토글. NULL = ALL_ON 기본. |
| push_muted_hours | JSON | NULL | `{ enabled, start, end, timezone }` (start=end 면 미적용, wrap 자정 OK) |

### NOTIFICATION_CATEGORIES 신규 5개 (push 전용)

| key | label | 기본 | 역할 |
|---|---|---|---|
| order_new | New Order | ON | RA / Staff |
| order_status | Order Status Changes | ON | RA / Staff |
| kitchen_alert | Kitchen Time Alert | ON | RA / Staff |
| inventory_low | Low Stock Alert | ON | RA / BG / FG |
| staff_call | Staff Call from Customer | ON | RA / Staff |

기존 17 카테고리는 push + 이메일 채널 공유. `push_only: true` 로 마킹된 5 개는 이메일 발송 X.

## 4. UI 흐름

| 컴포넌트 / 페이지 | 위치 | 역할 |
|---|---|---|
| `public/manifest.json` | 갱신 | PWA manifest (icons 192/512 maskable, start_url, scope, display=standalone) |
| `public/sw.js` | 신규 | Service Worker — push event + same-origin notificationclick + Badge API + pushsubscriptionchange |
| `services/push.ts` | 신규 | register/subscribe/unsubscribe/reconcilePermissionState/getPreferences/updatePreferences/sendTestPush |
| `contexts/PwaInstallContext.tsx` | 신규 | beforeinstallprompt 이벤트 캡처 + isStandalone + iOS UA 분기 + localStorage 7일 dismiss |
| `components/Common/PwaInstallBanner.tsx` | 신규 | 우측 하단 고정 banner — Android `Install` CTA / iOS 가이드 / 7일 dismiss |
| `components/Common/NotificationToaster.tsx` | 신규 | Socket.IO `/notifications` 연결 + 200ms ping debounce + Web Audio chime + 우상단 토스트 (max 3 stack) |
| `components/Settings/PushPreferencesCard.tsx` | 신규 | 마스터 토글 + 카테고리 + muted hours + 테스트 푸시 |
| `pages/Landing/InstallPage.tsx` | 신규 (`/install`) | UA 분기 가이드 (Android/iOS/macOS/Windows) + iOS 16 미만 경고 + 기능 카드 3개 |
| `index.tsx` | 수정 | SW 등록 |
| `App.tsx` | 수정 | PwaInstallProvider + Toaster + Banner mount + `/install` 라우트 |
| `LandingHeader.tsx` | 수정 | GNB + 모바일 메뉴에 "Install App" 항목 |
| `pages/NotificationSettings` | 수정 | Preferences 탭 맨 위에 PushPreferencesCard mount |
| `locales/{en,ko,zh,ms}/landing.json` | 수정 | installPage.* 28 키 + nav.install 1 키 |
| `locales/{en,ko,zh,ms}/common.json` | 수정 | pwa.installBanner.* 6 키 + close 1 키 |

## 5. Socket.IO 이벤트 카탈로그

새 namespace `/notifications` (JWT auth + scoped room):

| 이벤트 | category | room | trigger |
|---|---|---|---|
| `notification` (generic envelope) | (payload.category) | user/restaurant/brand/foodcourt/supplier | pushService 가 emit |

`pushService.emitInApp(rooms, payload)` 가 단일 통합 채널 — 페이로드 안 category 가 클라이언트 라우팅. 별도 이벤트명 분기 안 함 → 추후 카테고리 추가 시 SW/클라이언트 코드 변경 0 (확장성 ↑).

### Room join 패턴

socket handshake 의 JWT 만 신뢰 (클라이언트가 보낸 user_id 등은 무시):
- `user:{id}` — 본인
- `restaurant:{id}` — JWT.restaurant_id 가 있는 경우
- `brand:{id}`, `foodcourt:{id}`, `supplier:{id}` — 동일 패턴
- `role:system_admin` — System Admin

## 6. PlanQ 개선 적용 매트릭스

| # | PlanQ 결함 | POS 적용 |
|---|---|---|
| 1 | `/test` rate-limit 없음 → abuse | `express-rate-limit` per-user 5/min |
| 2 | endpoint cross-user reassign 만 (audit X) | endpoint 재등록 시 이전 user row `deleted_at` soft-delete |
| 3 | endpoint URL 검증 없음 | host 화이트리스트 (`isValidEndpoint`) |
| 4 | 권한 회수 자동 감지 없음 | `reconcilePermissionState` on focus → denied 면 자동 unsubscribe |
| 5 | ping spam (debounce 없음) | `NotificationToaster` 200ms debounce |
| 6 | PushLog 부재 | 모든 시도 PushLog 기록 + admin/stats/logs |
| 7 | install banner sessionStorage (매 탭 노출) | localStorage 7일 dismiss + 365일 (설치 완료 시) |

미적용 (별도 sprint): BUILD_ID 자동 무효화 시 form dirty 감지 — POS 는 CRA 라 PlanQ 의 Vite 패턴과 빌드 흐름 다름. 무효화 자체를 이번 sprint 에서 안 만듦.

## 7. 환경 변수

```
VAPID_PUBLIC_KEY=...    # web-push generateVAPIDKeys() 결과
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:noreply@purplehere.com
```

**운영 배포 전 주의:** 운영 .env 에 dev 키 절대 그대로 사용 X. 운영 서버에서 `node -e "console.log(require('web-push').generateVAPIDKeys())"` 실행 후 운영 전용 키로 교체.

## 8. 운영 모니터링

- `/api/push/admin/stats` — active subscriptions / 24h sent/failed / by_browser / by_role
- `/api/push/admin/logs` — paginated PushLog
- 90일 PushLog cron 정리는 별도 sprint
