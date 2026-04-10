## 현재 작업 상태
**마지막 업데이트:** 2026-04-10 (오후 — 추가 버그 수정 + 운영 2차 배포)
**현재 버전:** v3.12 (Irene 결정 — 보안/안정화 작업이라 버전 미증가)
**작업 상태:** 완료 — Phase A/B/D + 추가 4건 모두 운영 배포 완료. **다음 세션에서 Phase C 시작 예정**

### 이번 세션 추가 완료 작업 (2026-04-10 오후)

1. **모바일 메뉴 로딩 속도 개선**
   - `dev-frontend/src/mobile/pages/MenuPage.tsx`
   - 백그라운드 `limit=500` 전체 메뉴 fetch 제거
   - 첫 호출 `limit=1`로 categories만 빠르게 받기
   - 검색용 전체 메뉴는 검색창 onFocus/onChange 시 lazy load (`loadAllMenuItemsForSearch`)

2. **My Coupons 필터링 (본인 명시 타겟만)**
   - `dev-backend/routes/coupons.js` 응답 구조 확장: `myCoupons` (명시 타겟) / `promotions` (전체공개) / `available` (호환)
   - `dev-frontend/src/mobile/pages/AccountPage.tsx`: `myCoupons` 필드 사용 + `mobileFetch`로 변경
   - dual auth 적용 (`authenticateAdminOrCustomerSelf`) — POS Admin 또는 customer 본인 (IDOR 방어)

3. **모바일 멤버십 비활성 매장 points UI 숨김**
   - `AccountPage.tsx`: `pointsEnabled` 기본값 `true` → `false` (깜빡임 방지)
   - `PaymentPage.tsx`: 비회원 결제 폼의 "Register as a Member (Earn points & benefits)" 체크박스를 `membershipSettings?.is_active` 조건부로 렌더링

4. **운영 2차 배포 09:32**
   - 백업: `/var/www/backups/20260410_093107`
   - 운영 health-check: **39/39 통과**
   - smoke test: 9/10 (1건 false negative)

### POS Terminal "고객정보 아래 pt" 표시 - 보류
- Irene이 POS Terminal에서 "고객정보 아래에 pt 같은 거" 표시가 멤버십 비활성 시에도 안 가려진다고 보고
- 코드 검색 결과 POSTerminalPage 메인 화면에는 customerPoints 직접 노출이 없음
- **위치 확인 필요** — 다음 세션에서 Irene에게 정확한 위치(스크린샷 권장) 받아서 처리

### 큰 그림 (Phase 계획)

Irene의 우려: "기능 개발이 기존 기능을 망가뜨리는 패턴이 반복됨"
→ 정석 4단계로 정리:

| Phase | 내용 | 상태 |
|-------|------|------|
| **A** | 보안 패치 + 모바일 고객 JWT 시스템 정석 구축 | ✅ 운영 배포 완료 (2026-04-10 08:24) |
| **D-1** | Sentry 도입 (프론트 + 백엔드) | ✅ 운영 배포 완료 |
| **D-2** | health-check 스크립트 구축 (39개 자동 테스트) | ✅ 운영 배포 완료 |
| **B** | 깨진 기능 복구 (포인트 UI, activityLogs, NotificationSettings token 키, 인쇄 이중 트리거) | ✅ 운영 배포 완료 |
| **C** | 구조 개선 (httpClient 추출, CustomerContext 분리, 거대 파일 분할) | ⏳ 대기 |

### 운영 배포 결과 (2026-04-10)
- 배포 스크립트: smoke test 9/10 (1건은 비표준 응답 형식의 false negative)
- 운영 health-check: **39/39 통과**
- 외부 도메인 페이지: 4/4 (200)
- 보안 검증: 익명 customers 차단 (401), 모바일 slug 정상 (200)
- 백업: `/var/www/backups/20260410_082227`
- 버전: v3.12 유지 (Irene 결정)

**순서**: A → B → D → C
**이유**: D(안전망) 먼저 깔고 C(구조개선) 진행 — 안전망 없이 구조 개선하면 또 깨짐

---

### Phase A: 보안 패치 + 모바일 고객 JWT 시스템 (✅ 완료)

#### 백엔드 신규
- `dev-backend/utils/customerJwt.js` — 모바일 고객 JWT 발급/검증
- `dev-backend/middleware/customerAuth.js` — `authenticateCustomer`, `requireCustomerSelf`, `authenticateAdminOrCustomerSelf`

#### 백엔드 변경
- `routes/customers.js`:
  - `POST /auth`, `/register` 응답에 customer JWT 포함
  - 라우트별 명시적 미들웨어 (router.use 일괄 X)
  - 공개: `/auth`, `/register`, `/find-email`, `/forgot-password`, `/reset-password`, `/verify-reset-token`
  - POS Admin: `/:rid` (목록), `/:rid/:cid`, `POST /:rid/:cid/points`, `DELETE /:cid`, `GET /phone/:phone`
  - Customer self: `PUT /:cid/password`
  - Admin or Customer self: `GET /stats/:cid`, `GET /:cid/orders`, `PUT /:cid`
- `routes/membership.js`:
  - `router.use(authenticateToken)` 제거 → 라우트별 정책
  - 공개: `GET /settings/:rid`, `POST /points/calculate-discount`
  - Customer self or Admin: `GET /customer/:rid/:cid`, `/points/history`, `/tier/info`
  - Admin: 그 외 (포인트 적립/사용/조정/환불)
- `routes/restaurants.js`:
  - `manager/:id`, `:id/company-info`, `:id`, `:id/categories`, `:id/allowed-routes` → `authenticateToken` 추가
  - `slug/:slug` 응답 정리 (admin_id 등 민감정보 제거)
- `routes/orders.js`:
  - 결제 라우트 4개: 30분 시간 윈도우 + 중복결제 방어 + 임의 PayPal orderId 차단
- `routes/inventory-routes.js`:
  - `:restaurantId` 패턴에 `checkRestaurantAccess` 일괄 적용 (IDOR 방어)
- `routes/addon-modules.js`:
  - GET 3개 라우트에 `authenticateToken` 추가
- `routes/mobile.js`:
  - `GET /orders`에 `restaurant_id` 필수화

#### 프론트엔드 신규
- `dev-frontend/src/mobile/utils/mobileApi.ts` — `mobileFetch`, `getMobileToken`, `setMobileToken`, `clearMobileToken`

#### 프론트엔드 변경
- `mobile/pages/LoginPage.tsx` — 응답 token을 `mobile_token`에 저장
- `mobile/pages/RegisterPage.tsx` — 동일
- `mobile/pages/AccountPage.tsx` — `/customers/stats`, `/customers/:cid/password` → `mobileFetch`
- `mobile/pages/OrdersPage.tsx` — `/customers/:cid/orders` → `mobileFetch`
- `mobile/pages/PaymentPage.tsx` — `/restaurants/:id` → `/restaurants/slug/:slug`, `/membership/customer` → `mobileFetch`
- `mobile/pages/QRPaymentPage.tsx` — `/restaurants/:id` → slug
- `mobile/pages/BankTransferPage.tsx` — `/restaurants/:id` → slug
- `mobile/pages/DeliveryAddressPage.tsx` — `/restaurants/:id` → slug
- `contexts/CustomerContext.tsx` — logout 시 `mobile_token` 정리
- `contexts/AuthContext.tsx` — fetch 인터셉터 정리, customer/membership 401이 POS 세션 보호

#### 검증 결과
- API 실호출 25/25 통과
- 권한 매트릭스 16/16 통과
- 9단계 검증 모두 통과
- 빌드 성공, 개발서버 배포 완료

#### ⚠️ 다음 액션 (Phase A 마무리)
- **운영 배포 필요** — Irene이 `/배포` 명령으로 직접 진행
- 운영서버에도 동일 보안 구멍이 있을 가능성이 매우 높음

---

### Phase B: 깨진 기능 복구 (✅ 2026-04-10 완료)

#### B-1: Activity Log Stats 500 에러 (수정 완료)
- **파일**: `dev-backend/routes/activityLogs.js:4`
- **수정**: `const sequelize = require('../config/database')` → `const { sequelize } = require('../config/database')`
- **검증**: `GET /api/activity-logs/restaurant/1/stats` → 200 + byActionType/byEntityType/topUsers 정상 반환
- **영구 안전망**: health-check 스크립트의 POS 카테고리에 케이스 2건 추가 (회귀 방지)

#### B-2: NotificationSettings 잘못된 token 키 (수정 완료)
- **파일**: `dev-frontend/src/components/Settings/NotificationSettings.tsx:199, 223, 249`
- **수정**: `localStorage.getItem('token')` → `localStorage.getItem('auth_token')` (3곳)
- **영향**: 알림 설정 페이지가 dead-key 사용으로 익명 요청 보내던 문제 해결

#### B-4: 브라우저 인쇄 다이얼로그 이중 트리거 (수정 완료)
- **증상 (사용자 보고)**: "프린트가 취소해도 또 떠. 닫으면 다시 또 떠." (브라우저 프린트 모드에서)
- **원인**: `dev-frontend/src/utils/billPrint.js:printHTMLContent`의 `iframe.onload` 핸들러가 두 번 트리거됨
  - 1차: `appendChild(iframe)` → `about:blank` 로드 시
  - 2차: `doc.open/write/close` → 새 콘텐츠 로드 시
  - 결과: print() 다이얼로그가 두 번 큐잉되어 첫 번째 취소 시 두 번째가 즉시 표시됨
- **수정**: onload 핸들러 사용 폐기 → doc.close() 직후 `setTimeout` + `hasPrinted` flag로 단 한 번 호출
- **영향**: POSTerminal 결제 후 자동 영수증 인쇄, FloorPlan QR 인쇄, Daily Settlement 인쇄, Table QR 인쇄 모두 한 번만 트리거
- **부가 개선**: `iframe.contentWindow.focus()` 추가 — 일부 브라우저에서 다이얼로그 포커스 보장

#### B-3: 포인트 사용 UI 복구 (수정 완료)
- **파일 1**: `dev-frontend/src/components/POSTerminal/PaymentModal.tsx`
  - Props에 `selectedCustomerId?: number` 추가 (자체 fetch 트리거 안 함, 조건 표시용만)
  - Line 559 조건: `customerPoints > 0` → `(customerPoints > 0 || selectedCustomerId || customerId)`
  - 0 pts 회원 안내 (구 line 651): `customerId` 외에 `selectedCustomerId`도 인식
- **파일 2**: `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx:2865`
  - `<PaymentModal>`에 `selectedCustomerId={selectedCustomerForOrder?.id}` 전달
- **결과**:
  - 회원 선택 시 0 pts여도 "Members earn..." 안내 표시
  - 100 pts 미만일 때 "Minimum 100 points required" 안내 표시
  - 100 pts 이상일 때 사용 토글 정상 표시
- **모바일 PaymentPage**: 비회원 안내 UI 부재는 낮은 우선순위로 보류 (Phase C 또는 별도 개선)
- **테스트 데이터 공백**: restaurant 10에 RestaurantCustomer 시드 추가는 별도 (코드 버그 아님)

### Phase B 검증 결과
- 빌드 성공 (타입 에러 0건)
- health-check 39/39 통과 (Phase D-2 안전망 정상 작동)
- Activity Log stats API 200 응답 + 데이터 정합성 확인
- **운영 배포 대기 중** (Phase A + D-1 + D-2 + B 한꺼번에 배포 권장)

---

### Phase D: 안정화 인프라

#### 1. Sentry 도입 (✅ 2026-04-10 완료 — 개발서버)

**DSN**: 프론트엔드/백엔드 동일 프로젝트 공유, `component:` 태그로 구분

**프론트엔드** (`@sentry/react@10.x`)
- `dev-frontend/src/index.tsx` Sentry.init + ErrorBoundary
- `dev-frontend/src/contexts/AuthContext.tsx` 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 환경 자동 감지: `purplehere.com` → production, `dev.purplehere.com` → development, `localhost` → 비활성화
- `tags: { component: 'frontend' }`
- Session Replay (운영에서 에러 세션 100% 녹화)
- 민감정보 마스킹 (password, token, cardNumber)
- ErrorBoundary 폴백 UI ("Try again" 버튼)

**백엔드** (`@sentry/node@10.48.0`)
- `dev-backend/server.js` 최상단 init (다른 require보다 먼저)
- `Sentry.setupExpressErrorHandler(app)` 연결 (모든 5xx 자동 캡처)
- `dev-backend/middleware/auth.js` admin user context
- `dev-backend/middleware/customerAuth.js` customer user context
- `tags: { component: 'backend' }`
- 민감정보 마스킹 (password, Authorization header, cookie)

**검증**
- 백엔드 테스트 이벤트 전송 성공 (Event ID: `6446b42ca9474336b873ae96dd36ca68`)
- Sentry 대시보드에서 `component:backend` 필터로 확인 가능

**운영 배포 시 필요한 작업**
- 운영서버에도 같은 코드 배포 (Phase A 배포와 함께)
- 운영서버 환경: `process.env.NODE_ENV=production` 자동 설정 또는 hostname=`purplehere.com`로 자동 감지
- `SENTRY_DSN` 환경변수는 코드에 fallback 있어 별도 설정 불필요 (필요시 운영 .env에 추가)

#### 2. Health-check 스크립트 (✅ 2026-04-10 완료)

**위치**: `/var/www/dev-backend/scripts/health-check.js`

**사용법**:
```bash
cd /var/www/dev-backend
node scripts/health-check.js                  # 전체 (37 tests)
node scripts/health-check.js --category=auth  # 카테고리만
node scripts/health-check.js --quiet          # 실패만
node scripts/health-check.js --host=https://purplehere.com  # 운영서버
```

**5개 카테고리 / 37개 테스트**:
- `auth` (4): admin /auth/me, customer JWT 본인 stats, cross-access, 잘못된 토큰
- `security` (12): 익명 차단 9건, IDOR 방어 2건, customer 토큰으로 admin 차단 1건
- `pos` (10): dashboard, orders, menu, invoices, restaurants, customers, coupons, membership, staff, addon-modules
- `mobile` (8): slug 라우트 (payment_settings/operation_settings 포함 검증), mobile/store, mobile/menu, membership 공개, customer 인증 실패 404, customer self-service 3건
- `payment` (3): create-payment-intent, create-paypal-order, capture-paypal-order 위변조 방어

**검증**: 37/37 통과 ✅

**CLAUDE.md에 규칙 추가**: 모든 검증 단계의 마지막에 health-check 실행 필수.

**확장 방법**: 새 라우트 추가 시 health-check.js의 해당 카테고리에 케이스 추가 → 영구 안전망 강화
- `dev-backend/scripts/health-check.js`
- 핵심 기능 30개 + 보안 체크 10개를 매번 자동 검증
- 체크 항목:
  - 로그인 (POS 모든 역할)
  - 모바일 고객 로그인 (customer JWT 발급)
  - 주문 생성 → 조회 (Read/Write 왕복)
  - 메뉴 조회
  - 인보이스 생성
  - 포인트 적립/사용
  - 멤버십 settings/customer 조회
  - 결제 흐름 (Stripe/PayPal/QR/Bank)
  - 보안: 익명 customers 차단, 익명 inventory 차단, 익명 결제 라우트 시간 윈도우, IDOR 방어
- CLAUDE.md에 "개발 완료 시 health-check 필수 통과" 규칙 추가
- `/검증` 슬래시 명령에 health-check 통합 검토

---

---

## 🎯 다음 세션 시작 시 — Phase C 작업 가이드

### 시작 방법
다음 세션에서 Irene이 `/개발시작` 또는 "Phase C 진행해" 라고 말하면:
1. 이 파일(session-state.md) 읽고 컨텍스트 파악
2. "Phase C: 구조 개선을 시작합니다" 안내
3. 아래 작업 순서 제시 + 첫 번째 작업 우선순위 확인
4. Irene 승인 후 진행

### 작업 전 필수 확인사항
- ✅ Sentry가 활성화되어 있음 → 운영 에러 실시간 감지 가능
- ✅ health-check 39 tests 통과 → 회귀 즉시 감지 가능
- ✅ Phase A/B/D 모두 운영 배포 완료
- ⚠️ 작업 중 자주 health-check 실행 (`cd /var/www/dev-backend && node scripts/health-check.js --quiet`)
- ⚠️ 운영 에러 발생 시 Sentry 대시보드 확인 (component:frontend, component:backend)

### 권장 작업 순서 (위험도 낮은 것부터)

**C-1: 토큰 키 단일 진입점 (`utils/auth.ts`)** — 가장 안전, 30분
- `dev-frontend/src/utils/auth.ts` 신규
- `getAuthToken()`, `setAuthToken()`, `clearAuthToken()` (POS 관리자용)
- `getMobileToken()`, `setMobileToken()`, `clearMobileToken()` (모바일 고객용 — 이미 mobileApi.ts에 있음, 통합)
- `clearAllTokens()` (전체 로그아웃)
- 모든 컴포넌트의 `localStorage.getItem('auth_token')` 직접 호출을 이 함수로 교체
- 영향: AuthContext, CustomerContext, 인터셉터, NotificationSettings, POSTerminalPage 등 다수
- 이점: 향후 토큰 키 변경 시 한 곳만 수정. dead-key 버그 방지

**C-2: CustomerContext의 `restaurantId = 1` 하드코딩 fallback 제거** — 매우 안전, 10분
- `dev-frontend/src/contexts/CustomerContext.tsx:178`
- `if (!restaurantId) { restaurantId = 1; }` → 명시적 에러 또는 빈 상태 반환
- 위험: 1번 레스토랑이 없거나 다른 레스토랑인 경우 엉뚱한 데이터 표시 방지

**C-3: Fetch 인터셉터 단일화 (`utils/httpClient.ts` 추출)** — 중간 위험, 1~2시간
- 현재: `dev-frontend/src/index.tsx`와 `AuthContext.tsx` 두 곳에서 `window.fetch` 패치
- StrictMode/HMR 시 인터셉터 누락/중복 가능성 있음
- 추출 방법:
  - `dev-frontend/src/utils/httpClient.ts` 신규 — `installFetchInterceptor()` 함수
  - `index.tsx`에서 한 번만 호출
  - `AuthContext`의 `useEffect` fetch 패치 제거 + 401 콜백만 등록
- 검증: 모든 모바일/POS 페이지 동작 확인

**C-4: CustomerContext를 모바일/POS 분리** — 높은 위험, 2~3시간
- 현재: `CustomerContext`가 POS 고객 목록(`customers[]`) + 모바일 고객 인증(`currentCustomer`) 두 책임
- 분리 후: `MobileCustomerContext` (모바일 전용) + `PosCustomersContext` (POS 고객 목록 전용)
- 영향 범위: AuthContext 트리, MobileApp, POSTerminalPage, CustomersPage, AccountPage 등
- 주의: `localStorage.getItem('user')` 같은 dead key 정리

**C-5: 거대 라우트 파일 분할** — 낮은 위험 (단순 분리), 각 파일 30분~1시간
- `routes/invoices.js` (3170줄) → `invoices-crud.js` + `invoices-generation.js` + `invoices-payment.js`
- `routes/restaurants.js` (2219줄) → `restaurants-crud.js` + `restaurants-settings.js` + `restaurants-public.js`
- `routes/orders.js` (2113줄) → `orders-crud.js` + `orders-payment.js` + `orders-kitchen.js`
- `routes/mobile.js` (1295줄) → `mobile-public.js` + `mobile-orders.js`
- `routes/customers.js` (1242줄) → `customers-auth.js` (공개) + `customers-admin.js` (POS) + `customers-self.js` (모바일)
- 각 분할 후 `server.js`에서 마운트 경로 동일 유지 (`app.use('/api/invoices', ...)`)
- 분할 후 health-check 39/39 통과 확인

**C-6: 거대 프론트 컴포넌트 분할** — 중간 위험, 각 컴포넌트 1~2시간
- `LiveOrdersPage.tsx` (1689줄)
- `InventoryManager.tsx` (3014줄)
- `BrandInvoicesPage.tsx` (3179줄)
- `PaymentPage.tsx` (모바일, 1800줄)
- `InvoicesPage.tsx` (2380줄)
- 분할 방법: 하위 컴포넌트 + 커스텀 훅 추출

### 권장 진행 방식
- **각 작업 단위로 health-check 실행** (`--quiet` 옵션)
- 실패 시 즉시 롤백 또는 수정
- 각 작업 완료 후 session-state.md 업데이트
- 큰 변경(C-3, C-4, C-6) 후에는 운영 배포 1주일 정도 기다려서 Sentry로 안정성 확인

---

### Phase C: 구조 개선 (대기 중) — 상세 분석

조사 보고서에서 식별된 구조적 위험:

1. **Fetch 인터셉터 이중 설치** (index.tsx + AuthContext.tsx)
   - 위험: StrictMode/HMR 시 인터셉터 누락/중복
   - 해결: `src/utils/httpClient.ts`로 단일 추출

2. **AuthContext가 너무 많은 책임**
   - POS 인증 + 글로벌 fetch 인터셉터 + 모바일 예외 처리
   - 해결: 인터셉터 분리, AuthContext는 POS 사용자 상태만

3. **CustomerContext가 POS+모바일 양쪽 사용**
   - 위험: 한쪽 수정이 다른 쪽 깨뜨림
   - 해결: `MobileCustomerContext` (모바일 전용) + `PosCustomersContext` (POS 고객 목록 전용) 분리

4. **거대 라우트 파일** (500줄 룰 위반)
   - `routes/invoices.js` 3170줄
   - `routes/restaurants.js` 2219줄
   - `routes/orders.js` 2113줄
   - `routes/mobile.js` 1295줄
   - `routes/customers.js` 1242줄
   - 해결: 기능별 분리 (예: invoices-crud, invoices-generation, invoices-payment)

5. **거대 프론트 컴포넌트**
   - `LiveOrdersPage.tsx` 1689+줄
   - `InventoryManager.tsx` 3014+줄
   - `BrandInvoicesPage.tsx` 3179+줄
   - `PaymentPage.tsx` 1800+줄
   - `InvoicesPage.tsx` 2380+줄

6. **하드코딩 fallback**
   - `CustomerContext.tsx:178` `restaurantId = 1` 기본값 → 제거

7. **여러 토큰 키 공존** (`auth_token`, `mobile_customer`, `mobile_token`, `mobileToken`, `user`, `token`)
   - `src/utils/auth.ts` 단일 진입점 만들기

---

### 진행 중인 작업
- 없음 (Phase A 완료, 다음 결정 대기)

### 다음 액션 (우선순위)
1. **운영 배포 (Phase A)** ← 즉시 — Irene이 `/배포`
2. **Sentry DSN 전달** ← Irene 액션
3. **Phase D 시작 (Sentry + health-check)** ← Sentry DSN 받으면 진행
4. **Phase B (깨진 기능 복구)** ← Phase D 후
5. **Phase C (구조 개선)** ← Phase B 후

---

## 복구 가이드 (세션 끊김 시)
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

세션 복구 시 Claude는:
1. 이 파일 전체를 읽고 큰 그림 파악
2. "현재 작업 상태" + "다음 액션" 확인
3. Irene에게 이전 진행 상황을 요약 보고
4. 다음 액션 진행 여부 확인 후 재개
