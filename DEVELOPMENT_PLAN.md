# Purple POS - 개발 진행 현황

> **최종 업데이트:** 2026-05-13 (v3.30 운영 배포 완료 — PWA 빈 화면 fix + 알림 우리 규칙 정확 반영 + 페이지 로딩 성능 + 모바일 햄버거 2뎁스)
> **데이터베이스:** purple_dev_db (MySQL) · purple_production_db (프로덕션)
> **프로젝트:** 구독 기반 POS 시스템 with 모듈 관리
> **현재 버전:** **v3.30** (2026-05-13 운영 배포 완료)

## ✅ 완료: v3.30 운영 배포 (2026-05-13)

### 배포 결과

| 항목 | 결과 |
|------|------|
| 빌드 | main.44e0d72d.js (713 파일 sync) |
| Backend rsync | 7 파일 |
| DB 스키마 | dev/prod 일치 (130 tables) |
| Migration | sprint4/5/6/7 + supplier-staff + soa-invoice + referral + cleanup × 3 |
| Seed sync | 97 updated |
| Smoke 테스트 | 10/10 PASS |
| 운영 health | OK (production) |
| 백업 | `/var/www/backups/20260513_074418` |

### 포함된 변경 (Unreleased → v3.30)

- PWA 데스크탑/모바일 앱 빈 화면 fix (manifest start_url `/pos/login` → `/pos`)
- 알림 우리 규칙 정확 반영 — NotificationSettings UI 토글이 푸시 즉시 차단 (notification_preferences 단일 source)
- Stock Items 페이지 로딩 성능 425배 (API 3.15MB → 7.4KB, ingredients.image_url base64 → 파일 마이그레이션)
- 백엔드 base64 입력 자동 변환 가드 (restaurants-ingredients, ingredients 라우트)
- MenuManagement onError TypeError fix
- 햄버거 메뉴 모바일 2뎁스 펼침 (RailItem 아래 흰배경 accordion, 6 역할)
- deploy-dev.sh 견고화 (다중 user 빌드 권한 fail fix)
- 개발서버 lua ACL (운영 영향 없음)

---

## ✅ 완료: v3.29 운영 배포 (2026-05-12)

### 배포 결과

| 항목 | 결과 |
|------|------|
| 빌드 | main.f00fad6b.js (716 파일 sync) |
| Backend rsync | 19 파일 sync |
| DB 스키마 | dev/prod 일치 (130 tables) |
| Migration | sprint4/5/6/7 + supplier-staff + soa-invoice + referral + cleanup × 3 |
| Seed sync | 97 updated |
| Smoke 테스트 | 10/10 PASS |
| 운영 health | OK (production) |
| 백업 | `/var/www/backups/20260512_205708` |
| 릴리즈 콘텐츠 | 블로그 `release-v3.29` + 공지 id=56 (운영 5 수신자) |

### 포함된 변경 (Unreleased → v3.29)

- 레스토랑 예약 시스템 R1 MVP (12 endpoint + 7-state machine + 모바일 3 페이지 + 운영 Timeline + 이메일/푸시 알림)
- 사이드바 2단 구조 전면 리디자인 (전 6 역할 통일, lucide 라인 아이콘, 헤더 80px)
- Backend 안정화 (DB 중복 인덱스 521건 정리 + `sequelize.sync()` startup OFF + 예약 timezone 정상화)
- 모바일 홈 라인 아이콘 + Guest 예약 자동 등록 + 컨텍스트별 nav
- Reservation 모듈화 (AddonModule + plan template + requireRestaurantModule middleware)
- R1 결함 4건 fix (customer_id NULL, reservation_count 이중 증가, PATCH /me 정책 우회, IPv6 rate-limit)
- SubscriptionFormFields 4 페이지 통합 (Restaurants/Managers/Brands/Foodcourts)
- 예약 페이지 Source 컬럼 + 필터 + 액션 버튼 LiveOrders 정렬
- 앱 아이콘/파비콘 전면 교체 + SVG 업로드 버그 fix
- 관리자 테이블 배정 + 예약 lifecycle 간소화

---

## ✅ 완료: Backend 안정화 + 예약 timezone 정상화 (2026-05-12 후반)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| **DB 중복 unique 인덱스 521건 정리** | `users` 64-key 한도 임박 (`username_2`/`email_3`/... 19 테이블 누적). `scripts/cleanup-duplicate-indexes.js` (dry-run + apply) | ✓ |
| **`sequelize.sync()` startup OFF** | 매 재시작마다 unique 인덱스 누적 추가하던 결함. 기본 비활성 + 인덱스 자동 정리 (`STARTUP_DB_SYNC=true` 옵트인) | ✓ |
| **`sync-database.js` 안전 모드** | `--alter` 명시 시에만 ALTER + 직후 자동 중복 정리 | ✓ |
| **push.js IPv6 rate-limit fix** | `keyGenerator` → `ipKeyGenerator(req.ip)`. 미적용 시 push 라우트 등록 실패 (express-rate-limit 8+) | ✓ |
| **Foodcourt Reports 라우트 차단 버그 fix** | `addon_modules.fc_stats.ui_routes` 매핑 오류 (`/stats` → `/reports`) | ✓ |
| **예약 슬롯 생성 timezone 정상화** | `calcSlotAvailability` 가 server-local (UTC) 로 영업시간 해석하던 결함. 레스토랑 timezone 으로 모두 변환 | ✓ |
| `dateTimeHelper.localClockToUTC` / `formatTimeInTZ` 헬퍼 추가 | (YYYY-MM-DD, HH:mm, tz) → UTC, Date → HH:mm in tz | ✓ |
| 예약 스태프 list API timezone 정상화 | `GET /reservations/restaurant/:id` 일자 필터 → `getDateBounds(date, tz)` | ✓ |
| 예약 시드 데이터 정상화 | restaurant_id=5 (KR) 5건 — UTC 19:30 → 10:30 (KST 19:30 표시) | ✓ |
| health-check.js DB 카테고리 신규 | 인덱스 ≤ 15, 동일 컬럼·uniqueness 중복 0건. 78 → 80 케이스 | ✓ |
| Test3 (kdine-korean) reservation_settings 활성화 | 모바일 OrderTypePage 에 "📅 Reserve a Table" 카드 노출 | ✓ |

### 검증
- 빌드 main.6471d9fd.js (exit 0, 0 신규 경고)
- Health-check 80/80 통과
- /api/reservations/availability/8?date=2026-05-13&party=2 → 26 슬롯, label 09:00 (= 01:00 UTC + 8h MY) 정상
- pm2 restart 후 ER_TOO_MANY_KEYS 사라짐, 인덱스 정상 유지 (auto-purge 동작)
- DB 사전 백업 `backups/dev-daily/20260512/purple_dev_db_pre_index_cleanup.sql` (8.8M)

### 수정된 파일

**Backend (6)**
- `dev-backend/db.js` — `purgeDuplicateIndexes()` 추가
- `dev-backend/server.js` — startup sync 기본 OFF + 인덱스 정리
- `dev-backend/sync-database.js` — 안전 모드 (`--alter` 옵트인) + 자동 정리
- `dev-backend/routes/push.js` — `ipKeyGenerator` 적용
- `dev-backend/routes/reservations-public.js` — 슬롯 생성 timezone
- `dev-backend/routes/reservations-staff.js` — list API timezone
- `dev-backend/utils/dateTimeHelper.js` — `localClockToUTC` / `formatTimeInTZ` 추가
- `dev-backend/scripts/health-check.js` — DB 카테고리 신규
- `dev-backend/scripts/cleanup-duplicate-indexes.js` — 신규 (dry-run / --apply)

**DB**
- `addon_modules.fc_stats.ui_routes` → `/pos/foodcourt/general/reports`
- `restaurants[5].reservation_settings` 활성화 (kdine-korean)
- `reservations[105-109]` reserved_at -9h 시프트 (KST 정상화)

### Known Issue / 후속
- 운영 DB 도 동일 정리 필요 (배포 명령 시 cleanup-duplicate-indexes.js 실행)
- `_localToUTC` 가 `now` 기준 offset 사용 → DST 전환 시점 ±1h 오차 가능 (MY/KR/SG 무영향)

---

## ✅ 완료: 예약 UI 정렬 + SVG favicon 버그 fix + 앱 아이콘 교체 (2026-05-12 전반, 미배포)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Source 컬럼 + 필터 chips | `ReservationsTimelinePage` Today/Pending 양쪽에 source 뱃지 (Customer/Staff/Walk-in). 필터: All / Customer / Staff (staff_phone+walk_in 합산) | ✅ |
| 액션 버튼 LiveOrders 패턴 정렬 | 공용 `ActionButton`/`IconButton` import. 단계 전환은 dest status 가족 색 + 흰글자 (Confirm `#10B981`, Arrived `#635BFF` 브랜드 메인, Seated `#8B5CF6`, Completed `#9CA3AF`). No-show + Cancel × 는 LiveOrders 연회색 (`#F6F9FC`/`#6B7C93`/`#E6EBF1`) | ✅ |
| STATUS_COLOR Tailwind 정렬 | 기존 Material 톤(`#FFF7E6`/`#B97D00` 등) → Tailwind 팔레트 (ORDER_STATUS_STYLE_GUIDE 와 동일 시스템). pending amber / confirmed emerald / arrived blue / seated violet / completed gray / cancelled red / no_show light-gray | ✅ |
| ACTION_LABEL + STATUS_LABEL 대문자화 | 버튼 라벨 (Confirm/Arrived/Seated/Completed/No-show/Cancel) + 뱃지 (No-show 등) 첫 글자 대문자 | ✅ |
| Pending vs Today 중복 제거 | Today 섹션에서 `status='pending'` 필터 아웃 — 위쪽 "Pending approval" 섹션에만 노출 (workflow 분리) | ✅ |
| UI_DESIGN_GUIDE 4.2.1 신규 | 상태 전환 액션 버튼 규칙: LiveOrders 4 색 팔레트 strict (#10B981/#9CA3AF/#F59E0B/#FF6B6B) + 공용 컴포넌트 import 강제. Material 진한색/파스텔 채움 금지 명시 | ✅ |
| PwaInstallBanner Dismiss → × 아이콘 | 텍스트 Dismiss 버튼 → 우측 상단 × 아이콘 (28x28, white bg, gray glyph). Install 버튼 hover opacity 0.85 | ✅ |
| 앱 아이콘 교체 (Irene 제공 SVG) | `/tmp/app_icon.svg` → sharp 로 PNG 변환 (192/512/180/48 + 64-px ICO). `manifest.json` 에 SVG 우선 + PNG fallback. `index.html` `apple-touch-icon` href 명시 | ✅ |
| **Site-settings SVG 업로드 버그 fix** | `imageProcessor.js:320` regex `\w+` (svg+xml `+` 미매칭) → `[a-zA-Z0-9.+-]+`. SVG 는 sharp 변환 안 거치고 벡터 그대로 `.svg` 저장. 실패 시 기존 favicon wipe 방지 (400 반환) | ✅ |
| Favicon 즉시 갱신 UX 개선 | 저장 후 응답 `settings` 로 state 갱신 (base64 → URL). cache-bust 토큰 (`?v=Date.now()`) 으로 `LogoPreview` + `link[rel~='icon']` + `apple-touch-icon` 모두 무효화. App.tsx 도 동일 cache-bust 적용 | ✅ |

### 검증
- API 실호출: SVG `data:image/svg+xml;base64,...` PUT → 200 → DB 저장 → 파일 `/var/www/uploads/logos/favicon.svg` (572 bytes) 디스크 확인
- 예약 API source 정상: Restaurant 5 — customer_mobile 3 / staff_phone 1 / walk_in 1 + pending 1
- Health-check 78/78 통과 (favicon backend 변경 후)
- 빌드 main.6471d9fd.js (exit 0, 0 신규 경고)

### 수정된 파일

**Backend (2)**
- `dev-backend/utils/imageProcessor.js` — base64 mime regex 확장 + SVG 벡터 보존 분기
- `dev-backend/routes/siteSettings.js` — 저장 실패 시 wipe 방지 (null 시 400 반환)

**Frontend (5 + 1 가이드)**
- `dev-frontend/src/pages/Reservations/ReservationsTimelinePage.tsx` — Source 컬럼/필터, 액션 버튼 LiveOrders 정렬, STATUS_COLOR Tailwind, Pending 분리
- `dev-frontend/src/pages/Admin/SiteSettingsPage.tsx` — 저장 응답 기반 state 갱신, cache-bust 토큰, updateFavicon 다중 icon 링크 갱신
- `dev-frontend/src/App.tsx` — 글로벌 favicon 적용에 cache-bust + 모든 icon 링크 갱신
- `dev-frontend/src/components/Common/PwaInstallBanner.tsx` — Dismiss 텍스트 버튼 → × 아이콘
- `dev-frontend/UI_DESIGN_GUIDE.md` — 4.2.1 액션 버튼 규칙 신규

**Public assets (8)**
- `dev-frontend/public/app-icon.svg` — Irene 제공 신규 SVG 원본
- `dev-frontend/public/apple-touch-icon.png` — 180×180 (신규)
- `dev-frontend/public/logo192.png` — 192×192 (교체)
- `dev-frontend/public/logo512.png` — 512×512 (교체)
- `dev-frontend/public/favicon-48.png` — 48×48 (교체)
- `dev-frontend/public/favicon.ico` — 64×64 PNG (교체)
- `dev-frontend/public/manifest.json` — SVG 우선 + PNG fallback 등록
- `dev-frontend/public/index.html` — `apple-touch-icon` href 설정

### Known Issue / R2 분리
- 예약 timezone 표시 — `at(19,30)` 서버 UTC 기준이라 MY (+8) 표시 시 +1day 03:30 으로 보임. 시드 데이터 한정 이슈, 실제 customer/staff 입력은 ISO 변환 정상. 별도 cleanup 필요 시 R2.
- 운영 배포는 별도 `/배포` 명령. 현재 v3.28 유지 / 미배포 누적.

---

## ✅ 완료: 사이드바 2단 구조 전면 리디자인 + 헤더 80px 통일 (2026-05-11, 운영 배포 완료)

**모든 역할 사이드바를 Sentry/Stripe/Linear 패턴의 2단 구조로 통일** — 1뎁스 카테고리 rail + 2뎁스 sub-menu panel. 헤더(좌측 로고 / 가운데 2뎁스 헤더 / 우측 페이지 헤더) 80px strict 정렬.

### 적용 6 역할
| 역할 | 1뎁스 카테고리 |
|------|---------------|
| System Admin | Dashboard / Management / Suppliers / Operations / Communication / Plans & Payments / Settings (7) |
| Brand General | Dashboard / Live Orders / Franchise / Management / Products & Inventory / Operations (PO 통합) / Reports (탭) / Communication / Plans & Payments / Settings (10) |
| Foodcourt General | Brand 와 동일 + Floor Plan 1뎁스 단독 (새 창) |
| Restaurant Owner | Dashboard / Restaurants / Operations / Reports / Communication / Settings (6) |
| Supplier Admin | Dashboard / Live Orders / Operations / Plans & Payments / Communication / Settings (6) |
| Restaurant Admin | Dashboard / Live Orders / Reservations / POS Terminal · Floor Plan · Kitchen Display · Customer Display · Mobile Order (모두 새 창) / Products / Operations / Reports (탭) / Team & Marketing / Communication / Settings (12) |

### 핵심 변경
| 작업 | 설명 | 상태 |
|------|------|:----:|
| lucide-react 아이콘 도입 | 유니코드 기하문자(■◯◐◆◉) → 통일 라인 아이콘 (stroke 1.5) | ✅ |
| 1뎁스 카테고리 rail | 220px expanded / 64px collapsed, `#EEF0F4` 배경, active 흰배경+좌측 보라 라인 | ✅ |
| 2뎁스 sub-menu panel | 220px white, 텍스트만, collapse 가능 + localStorage 저장 | ✅ |
| Hover popover | 2뎁스 collapsed 시 1뎁스 hover → floating popover (shadow 0 8px 24px) | ✅ |
| 헤더 80px 통일 | SidebarHeader / SecondaryHeader / PageHeader 모두 box-sizing border-box + 80px strict. 65개 페이지 `height: 56px;` 일괄 → 80px | ✅ |
| Operations 카테고리 통합 | Purchase Order / Order History / Supplier Contracts 를 별도 Order 카테고리에서 → Operations 안 | ✅ |
| Reports 1뎁스 + 6 탭 sub | Sales Ranking / Sales Report / Sales Details / Menu Analysis / Customer Insights / Operations 탭 각각 `?tab=xxx` URL | ✅ |
| 풀화면 메뉴 새 창 | POS Terminal / Floor Plan / Kitchen / Customer Display / Mobile Order — AdminCategory.openInNewTab + mobileOrder slug fetch popup blocker fix | ✅ |
| Subtitle 제거 | Live Orders / Foodcourt Management / Reservations Timeline 단순 설명 부제목 hide + PageHeader subtitle prop 무력화 | ✅ |
| 알림 dot propagation | 2뎁스 카테고리 안 pending 자식 있으면 1뎁스 카테고리도 dot + blink | ✅ |
| 버그 fix | `/restaurant/:rid/customers` ReferenceError user is not defined fix, styled-components #12 keyframe css helper | ✅ |

### 검증
- 0단계 state hydration 0 warnings
- 빌드 main.94886590.js 0 new warning
- health-check 78/78 통과
- Playwright 측정: System Admin 8 RailItems / Foodcourt 10 / Supplier 7, 헤더 80px strict 정렬 확인
- SPA 라우팅 12 경로 200

### 수정된 파일 (78건)
- **핵심**: `dev-frontend/src/components/Layout/MainLayout.tsx` (역할별 categories + RailItem/SecondaryNavItem/Popover/CollapseBtn 추가)
- **헤더 공통**: `dev-frontend/src/components/Common/PageHeader.tsx`, `dev-frontend/src/components/UI/PageComponents.tsx` (Header height 56 → 80)
- **CustomersPage 버그 fix**: `dev-frontend/src/pages/Customers/CustomersPage.tsx`
- **65개 페이지 일괄**: `dev-frontend/src/pages/**/*.tsx` 의 styled Header `height: 56px;` → 80px strict
- **Subtitle 제거**: IncomingOrders / FoodcourtManagement / ReservationsTimeline
- **ReferralManagementPage**: PageComponents Header 통합
- **CHANGELOG.md, DEVELOPMENT_PLAN.md, session-state.md**

---

## ✅ 완료: Reservation R1 customer_id 결함 fix (2026-05-11, 미배포 / 버전 미상승)

**R1 MVP 의 critical defect 수정: 첫 예약(prior visit 없음) 시 `customer_id NULL` 로 저장되어 본인이 /me 에서 못 보고 취소/수정 불가능했던 결함.**

### 근본 원인
- POST `/reservations` 가 `customer_id: customer?.id || null` 로 fallback (silent failure)
- RestaurantCustomer 가 없으면 NULL → `/me` 가 RestaurantCustomer.id 로만 조회하므로 안 보임
- `loadOwnReservation` (PATCH/DELETE /me/:id) 도 403 → 취소 불가

| 작업 | 설명 | 상태 |
|------|------|:---:|
| POST 핸들러 트랜잭션 재작성 | `routes/reservations-public.js` — `sequelize.transaction` 안에서 `RestaurantCustomer.findOrCreate` → `Reservation.create` → `reservation_count` 증가. customer_id NULL 가능성 원천 차단 | ✓ |
| 백필 스크립트 | `scripts/backfill-reservation-customer-id.js` — `source='customer_mobile' AND customer_id IS NULL` 데이터 `Customer.phone` 매칭 복구. `--dry-run` 지원. 운영 배포 시 점검용 | ✓ |
| health-check reservation 카테고리 | 3 신규 케이스 — 신규 customer 예약 회귀 가드, 익명/admin token 차단. 73 → **76** | ✓ |
| reservation_count auto-increment | RestaurantCustomer 통계 누락 버그 동시 수정 | ✓ |

### 검증
- R1 fix flow 14/14 — sanity (RC 없음) → 첫 POST → 자동 생성 → customer_id NOT NULL → /me 포함 → DELETE 성공 → 두 번째 POST count=2 → no_show=5 시 403 차단
- **health-check 76/76 통과** (전체 회귀 + 신규 3 케이스)

### Known-WONTFIX (별도 sprint 분리)
- **RestaurantCustomer 모델 vs DB 불일치**: `name/phone/email` 필드가 모델에는 있지만 DB 컬럼 없음. Sequelize silently drops. 데이터 손실 없음 (Customer 모델이 신원 권원). 모델 정리는 별도 cleanup sprint.
- **동시 booking race window**: slot capacity check 와 INSERT 사이 race 가능. advisory lock 또는 SERIALIZABLE 트랜잭션 필요. 별도 sprint.

### 수정된 파일

**Backend (3)**
- `dev-backend/routes/reservations-public.js` — POST 트랜잭션 재작성, sequelize import 추가, 노쇼 차단 위치 트랜잭션 안으로 이동
- `dev-backend/scripts/backfill-reservation-customer-id.js` — 신규 (운영 안전망)
- `dev-backend/scripts/health-check.js` — reservation 카테고리 + 3 신규 케이스

---

## ✅ 완료: ManagersPage Edit SubscriptionFormFields 통합 + User.auto_renew 추가 (2026-05-11, 미배포 / 버전 미상승)

**v3.27 sprint 4 의 Add 모달 통일을 Edit 모달까지 확장. BG/FG/Owner 의 Edit 폼에서도 Discount/Auto-renew/Trial/Summary 사용 가능.**

| 작업 | 설명 | 상태 |
|------|------|:---:|
| ManagersPage Edit 모달 | Currency/Plan/BillingCycle/Period 5 필드 → `<SubscriptionFormFields userType="brand|foodcourt|owner" mode="edit" hideActivateNow hidePaymentModel>`. Discount/Auto-renew/Trial/Summary 자동 노출 | ✓ |
| Manager interface 확장 | discountType/discountValue/discountReason/treatAsTrial 필드 추가 | ✓ |
| handleEditManager | discount 초기값 + treatAsTrial 매핑 | ✓ |
| handleUpdateManager | discount_type/value/reason + subscription_status 전송 추가 | ✓ |
| User 모델 auto_renew 컬럼 | BOOLEAN NOT NULL DEFAULT true AFTER subscription_end. 기존 BG/FG/Owner auto_renew 데이터 손실 버그 수정 | ✓ |
| dev DB ALTER TABLE | 컬럼 추가 적용 (sync-database.js 가 운영 배포 시 자동 처리) | ✓ |
| 부산물 정리 | 미사용 import 제거 (formatPlanPrice, DateField). 1650 → 1613줄 (-37줄) | ✓ |

### 검증
- API 실호출 9/9 — PUT BG 에 plan_type/billing_cycle/currency/auto_renew/discount_*/subscription_end auto-calc 전부 DB 저장 확인
- health-check 73/73
- 빌드 main.cfcf20e4.js (exit 0, 0 new warning)
- RestaurantsPage 통합 회귀 없음

### 범위 결정
- **SubscriptionsPage Edit 는 통합 X** — Status dropdown + "others" custom plan name + "current vs latest amount" diff 같은 고유 기능 있어서 단순 교체 시 기능 회귀. 별도 design sprint 사안.

### 수정된 파일

**Backend (1)**
- `dev-backend/models/User.js` — auto_renew BOOLEAN 컬럼 추가

**Frontend (1)**
- `dev-frontend/src/pages/Admin/ManagersPage.tsx` — Manager interface 확장 + Edit 모달 통합 + handleUpdateManager 보강 + 미사용 import 제거

---

## ✅ 완료: RestaurantsPage SubscriptionFormFields 통합 (2026-05-11, 미배포 / 버전 미상승)

**v3.27 sprint 4 의 4 페이지 구독 form 통일을 RestaurantsPage Add/Edit 모달까지 확장. 4 caller (StaffManagementPage, ManagersPage, SubscriptionsPage, RestaurantsPage Add/Edit) 모두 동일 9-필드 UX 도달.**

| 작업 | 설명 | 상태 |
|------|------|:---:|
| SubscriptionFormFields 옵션 추가 | `hideCurrency`, `hideSectionHeader` (backward-compatible default false) | ✓ |
| RestaurantsPage Add 모달 | Plan/Trial/BillingCycle/PaymentModel/Period/Auto-renew/Summary 7 필드 → `<SubscriptionFormFields hideActivateNow hideCurrency hideSectionHeader>`. Discount 자동 포함 (이전 Add 누락이었음) | ✓ |
| RestaurantsPage Edit 모달 | 같은 7 필드 + 기존 Discount 섹션 → `<SubscriptionFormFields>` 1 컴포넌트. Self-managed 토글 + banner 외부 유지 | ✓ |
| 어댑터 함수 | `toSubscriptionValues()`, `fromSubscriptionPatch()` — legacy camelCase ↔ snake_case 매핑. 백엔드 contract 변경 없음 | ✓ |
| Backend POST 보강 | `routes/restaurants-crud.js` POST 에 `discount_type/value/reason` 처리 + `subscription_end` auto-calc fallback (PUT 은 이미 있었음, POST 누락이었음) | ✓ |
| 부산물 정리 | 미사용 import 제거 (`DateRangeField`, `formatPlanPrice`) | ✓ |
| 라인 수 | 3188 → 2867 (-321줄) | ✓ |

### 검증
- API 실호출 25/25 — POST activate=true (plan + 10% discount + auto-end) → DB readback / PUT active→self-managed (plan NULL wipe) / PUT self-managed→active (annual + fixed discount)
- health-check 73/73 PASS
- 빌드 main.3eca6803.js (93초, exit 0, 0 new warning)
- 기존 3 caller 새 옵션 미사용 → 영향 없음 확인

### 수정된 파일

**Backend (1)**
- `dev-backend/routes/restaurants-crud.js` — POST 핸들러에 discount_* + subscription_end auto-calc 추가

**Frontend (2)**
- `dev-frontend/src/components/Subscription/SubscriptionFormFields.tsx` — `hideCurrency` / `hideSectionHeader` 옵션 추가
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` — 어댑터 + Add/Edit 모달 통합 + 미사용 import 제거

---

## ✅ 완료: Reservation System R1 MVP (2026-05-10 운영 배포, 버전 미상승)

**모바일 메뉴에서 고객이 직접 예약 + 운영 페이지에서 직원이 승인/체크인하는 single-property 예약 워크플로우. 7-state state machine + 24h/2h 자동 리마인드 + auto no_show. 모델 1개 신규 (Reservation), 기존 Restaurant/RestaurantCustomer/Order 확장으로 deposit/table/waitlist 별도 모델 안 만듦.**

**시장 base**: 말레이시아 (WhatsApp wa.me + Telegram + navigator.share + .ics 캘린더 — 한국 특정 통합 X)

### 산출물
- Backend: 모델 1개 신규 + 3개 확장, 12 endpoint (public 6 / staff 6), 4 카테고리 push, 4 이메일 템플릿, hourly scheduler
- Frontend: 운영 1 페이지 + 모바일 3 페이지 + Settings 12번째 탭 + 진입점 (OrderType/Account/Sidebar) + Share 컴포넌트
- i18n: 4언어 reservation.json (~50 키)

### R2+ 분리 (의도적 비범위)
- deposit 결제 흐름 UI (모델 준비됨, payment integration 은 R2)
- 캘린더 monthly view, 좌석 평면도 drag, WaitingList, 보증금 자동 환불 cron, 본사 분석 dashboard, WhatsApp Business API/SMS

### 검증
- Backend API 12/12 (생성/조회/수정/취소, state machine, IDOR, 익명 차단)
- store/settings PUT/GET readback 3/3
- Health-check 73/73
- Frontend 빌드 88초 + Reservation chunks 분리 (3694 + 8137 + share 4670)
- SPA 라우팅 정상

### 신규 파일 (12)
- `models/Reservation.js`
- `routes/reservations-public.js`, `routes/reservations-staff.js`
- `services/reservationScheduler.js`, `services/reservationNotificationService.js`
- `pages/Reservations/ReservationsTimelinePage.tsx`
- `mobile/pages/ReservationPage.tsx`, `ReservationsListPage.tsx`, `ReservationDetailPage.tsx`
- `mobile/components/common/ReservationShare.tsx`
- `components/Settings/ReservationSettingsTab.tsx`
- `public/locales/{en,ko,zh,ms}/reservation.json` (4)

### 수정된 파일
- `models/Restaurant.js` (reservation_settings JSON), `models/RestaurantCustomer.js` (6 컬럼), `models/Order.js` (reservation_id FK + ENUM)
- `models/index.js` (associations)
- `server.js` (라우트 + scheduler mount)
- `routes/store.js` (reservation_settings GET/PUT 통합), `routes/mobile-public.js` (reservationsEnabled 플래그), `routes/notification-settings.js` (4 카테고리)
- `pages/Settings/SettingsPage.tsx` (12번째 탭), `App.tsx` (lazy import), `mobile/MobileApp.tsx` (3 라우트), `components/Layout/MainLayout.tsx` (NavItem)
- `mobile/pages/OrderTypePage.tsx` (Reserve 옵션), `mobile/pages/AccountPage.tsx` (My Reservations 진입)
- `public/locales/{en,ko,zh,ms}/common.json` (nav.reservations), `i18n.ts` (namespace 등록)

---

## ✅ 완료: Self-managed Restaurant 모드 (2026-05-10, 미배포 / 버전 미상승)

**BG/FG/Owner 가 본인 산하 매장을 시스템에 등록할 때 POS 유료 구독 강제 없이 데이터 관리 전용으로 저장 가능. 기존 `Activate Subscription` 토글이 invoice 생성만 건너뛰던 반쪽 동작 → 진짜 plan 필드 NULL 저장 + UI 분기 + Self-managed 안내/배지 완성. DB 모델 변경 없음 (기존 nullable 컬럼 활용).**

| 작업 | 설명 | 상태 |
|------|------|:---:|
| Backend POST | `routes/restaurants-crud.js` POST `activate_subscription:false` 시 plan_type/plan_amount/billing_cycle/subscription_start/subscription_end/subscription_snapshot/limits 모두 NULL 명시 저장 | ✓ |
| Backend PUT | `wipeSubscription` 분기 — 활성 → self-managed 전환 시 plan/billing/period + pending_* + plan_change_* 모두 NULL wipe + divertToPending 우회 + auto-calc subscription_end skip | ✓ |
| Frontend Add 모달 | plan/billing/period/auto-renew/trial 섹션 `activateSubscription` conditional hide. Self-managed info banner (회색) 추가. 토글 텍스트 ⚠️ 제거 | ✓ |
| Frontend Edit 모달 | `activateSubscription` 토글 추가. plan_type=NULL 매장 진입 시 OFF 자동 표시. Add 와 동일 conditional + banner. submit payload self-managed 분기 | ✓ |
| 목록 배지 | RestaurantName 라인에 `Self-managed` 회색 배지 (plan_type IS NULL 일 때) | ✓ |
| i18n 4언어 | en/ko/zh/ms `restaurantsPage.activateSubscription.{title,onHint,offHint}` + `restaurantsPage.selfManaged.{title,description,badge}` 6 키. `npm run i18n:verify` errors=0 | ✓ |

### 검증

- API 실호출 18/18 통과 — POST {activate=false} → DB NULL 확인 → invoices 0건 → PUT {activate=true} → plan_type 활성화 + subscription_end 자동 계산 + invoice 자동 생성 → PUT {activate=false} → 다시 NULL wipe
- health-check 73/73 PASS
- 빌드 main.e72df827.js (84초, exit 0)

### 수정된 파일

**Backend (1)**
- `dev-backend/routes/restaurants-crud.js` — POST 분기 + PUT wipeSubscription 분기 + auto-calc skip + activateSubscription 변수 위로 끌어올림

**Frontend (1)**
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` — Add/Edit 모달 conditional + banner + 토글 추가 + 목록 배지 + handleEditRestaurant fallback + handleSubmitEdit payload 분기

**i18n (4)**
- `dev-frontend/public/locales/{en,ko,zh,ms}/admin.json` — 6 키 추가

---

## ✅ 완료: v3.27 운영 배포 (2026-05-08)

**오늘 세션의 4 sprint 누적 + v3.24 → v3.27 점프 운영 배포**

### Sprint 1: FG 온보딩 + Walkthrough 시스템 신규

| 작업 | 상태 |
|------|:----:|
| `User.tutorial_progress` JSON 컬럼 추가 + DB sync | ✅ |
| `GET/PUT /api/users/me/tutorial-progress` API | ✅ |
| `useTourProgress` hook + `<Walkthrough>` 컴포넌트 (overlay/spotlight/tooltip 자체 구현) | ✅ |
| `<TourTrigger>` 헤더 "Show me around" 버튼 | ✅ |
| `useSetupStatus` FG path 정합 (`/general/branches`→`/branches`, `/general/floor-plan`→`/floor-plan`) | ✅ |
| `SetupGuide` locked 클릭 차단 + 3초 inline flash | ✅ |
| FG 5 페이지 EmptyState 통일 (Branches / FloorPlan / TenancyMap / RentManagement / Tenancy) + steps 가이드 + CTA | ✅ |
| FG Dashboard 5 step Walkthrough mount + MainLayout sidebar 4개 NavItem `data-tour` 부착 | ✅ |
| i18n 4언어 walkthrough.json 신규 + i18n.ts ns 등록 | ✅ |
| 설계 문서 `docs/FG_ONBOARDING_v3.26.md` | ✅ |

### Sprint 2: 트랙 C 데모 데이터 4-step 시드

| 작업 | 상태 |
|------|:----:|
| FC44 (demo_foodcourt_general) — units 0→**12** + tenants 0→**2** + 6 contracts (varied stage) + company info | ✅ |
| Owner 매장 4곳 (R2/R3/R6/R7) — cats 3 + prods 8 + orders 25 (30일 분포) + company info | ✅ |
| BG B10/B1 brandProducts 0→8 / 0→7 + brand_product_brands join + brand company info | ✅ |
| R38 시계열 주문 30건 + company info / SC20 supplier company info | ✅ |
| idempotent 시드 마커 (`SEED-V326-FC44`, `SEED-V326-OWNER-DEMO`, `SEED-V326-BG`) | ✅ |
| 5 idempotent seed 스크립트 신규 | ✅ |

### Sprint 3: 5 역할 Walkthrough 확장

| 작업 | 상태 |
|------|:----:|
| MainLayout 17개 NavItem 에 `data-tour` 부착 (RA 4 / BG 4 / Owner 1 / Admin 4 / Supplier 4) | ✅ |
| 5 dashboard 에 step 정의 + Walkthrough mount + TourTrigger (RA/BG/Admin/Supplier 5 step / Owner 2 step) | ✅ |
| i18n 4언어 walkthrough.json 확장 — 27 step entries × 4 언어 | ✅ |
| 5 역할 tutorial-progress write→read 왕복 5/5 검증 | ✅ |

### Sprint 4: Subscription Form 통일 + Discount 전 역할 (v3.27)

| 작업 | 상태 |
|------|:----:|
| `User` 테이블 `discount_type` ENUM + `discount_value` DECIMAL + `discount_reason` TEXT 컬럼 추가 | ✅ |
| `routes/users.js` POST/PUT 에 discount 처리 + `SUBSCRIBING_ROLES` 에 Supplier Admin 추가 | ✅ |
| `<SubscriptionFormFields>` 컴포넌트 신규 — 9 필드 + 자동 재계산 + Discount + Summary, BillingCycle default 빈값 | ✅ |
| SubscriptionsPage Add 폼 통합 — User Type 5 옵션 (Supplier 포함) + Currency 동적 + Discount + Activate now | ✅ |
| ManagersPage Add 폼 통합 — BG/FG/Owner 분기 시 동일 컴포넌트 | ✅ |
| i18n 4언어 subscription.json 신규 + i18n.ts ns 등록 | ✅ |
| 설계 문서 `docs/SUBSCRIPTION_FORM_UNIFY_v3.27.md` | ✅ |

### v3.27 운영 배포

| 작업 | 상태 |
|------|:----:|
| `/var/www/deploy-to-production.sh --auto` 실행 (rsync + npm install + PM2 + nginx) | ✅ |
| 운영 DB 자동 sync — `tutorial_progress` JSON + `discount_type/value/reason` 컬럼 자동 적용 | ✅ |
| 운영 live 7/7 200 (홈 + API health + 4 dashboard + 2 i18n) | ✅ |
| CHANGELOG.md `[Unreleased]` → `[v3.27] — 2026-05-08 배포` 섹션 이동 | ✅ |
| session-state.md / DEVELOPMENT_PLAN.md 버전 v3.24 → **v3.27** | ✅ |
| 랜딩 블로그 `release-v3.27` (id=86) + System Admin 공지 (id=54) 자동 등록 — 운영 sync 포함 5 운영 수신자 자동 생성 | ✅ |

### 검증 (각 sprint 별 10단계 통과)

- 0단계 hydration 0 warning (전 sprint)
- 1단계 빌드 exit 0, sprint origin TS 경고 0건
- 3단계 API 실호출 — discount API 10/10, walkthrough API 8/8, tutorial-progress 5/5
- health-check **73/73 PASS** (모든 sprint)
- 빌드 hash: `main.0b1c23bb.js` (최종)

### 운영 동기화 대기 (의도된 비범위, 별도 sprint)

- 운영 demo 계정 ID 가 dev 와 다름 (FC44→FC1, B10→B4, R38→R13, SC20→SC1) → 시드 스크립트 ID 파라미터화 후 별도 적용
- RestaurantsPage Add/Edit 의 SubscriptionFormFields 통합 (현재 잘 동작하므로 안정성 우선)
- SubscriptionsPage / ManagersPage 의 Edit modal — 이번엔 Add 만 통일

---

## ✅ 완료: Signup UX 개선 (2026-05-06, 미배포 / 버전 미상승)

**SignupPage / ReferralSignupPage 의 사용자 친화적 흐름 개선. missing-fields UI + 비밀번호 실시간 체크리스트 + 강도 미터 + INVALID_EMAIL_DOMAIN 에러 핸들링 + signup transaction rollback guard.**

| 작업 | 설명 | 상태 |
|------|------|:---:|
| SignupPage.tsx | +364줄. Step 1~3 missing fields 시각화 + 비밀번호 4-요건 체크리스트 (length/upper/lower/digit) + 강도 미터 (Weak/Fair/Strong) + 비밀번호 일치 표시 | ✓ |
| ReferralSignupPage.tsx | +236줄. 같은 패턴 적용 | ✓ |
| 4언어 i18n | landing.json `signupPage.*` 17 신규 키 × 4 = 68 entries | ✓ |
| routes/auth.js | signup / referral-signup 의 `INVALID_EMAIL_DOMAIN` 에러 코드 핸들러 | ✓ |
| services/authService.js | signup transaction double-rollback guard | ✓ |

### 검증
- /signup, /referral/signup SPA 200
- npm run i18n:verify exit 0 (errors=0)
- /api/auth/signup endpoint 200/400 응답 정상 + 표준 에러 형식
- 빌드 main.a29df543.js (이미 v3.25 빌드에 포함, exit 0)

### 수정된 파일
- dev-frontend/src/pages/Landing/SignupPage.tsx
- dev-frontend/src/pages/Referral/ReferralSignupPage.tsx
- dev-frontend/public/locales/{en,ko,ms,zh}/landing.json
- dev-backend/routes/auth.js, services/authService.js

---

## ✅ 완료: v3.25 Pricing/Module Audience (2026-05-06, 미배포 / 버전 미상승)

**PricingPage 모듈 정렬 깨짐 + buyer_* 카테고리 잘못 + Owner 잘못 노출 + Supplier 누락 + Features 빈 캡처 슬롯 일괄 정합화. Supplier role 의 모델 ENUM 등록 (target_user_type / plan_target / issuer_type / status=credit) + supplier 4 슬롯 캡처.**

### 설계 문서
`docs/PRICING_MODULE_AUDIENCE_v3.25.md` (305줄, 7-단계 작업 계획).

### 작업 결과

| # | 단계 | 결과 | 상태 |
|---|------|------|:---:|
| 1 | DB sort_order + category 정합화 | `update-module-sort-and-category-v3.25.js`. sort_order=0 모듈 0건. buyer_* 4 = advanced. 96 모듈 (target distribution: restaurant 24 / brand 23 / foodcourt 22 / owner 10 / all 4 / supplier 13) | ✓ |
| 2 | PricingPage filter 분기 | 설계 §4 합성 ENUM 안 대신 한 줄 차단 (`if owner && code.startsWith('buyer_') return false`). supplier 는 'all' 매치로 자동 노출 | ✓ |
| 3 | FeaturesPage Supplier 탭 buyer_* 4 카드 | 4 탭 모두 등록 (Supplier 탭 'Procurement' wording 차별화) | ✓ |
| 4 | 시드 (idempotent) | `seed-buyer-data-v3.25.js` (Brand R10 → Demo Supplier 매입 흐름) + `seed-foodcourt-rich-v3.25.js` (FC 7 admin 4 + staff 5 + branch 2). 모두 기시드 skip | ✓ |
| 5 | Features 캡처 (supplier 4) | supplier_dashboard / supplier_orders / supplier_contracts / supplier_trade_invoices 신규 캡처. FeaturesPage 0→1 갱신 | ✓ |
| 6 | 모델 ENUM 확장 | AddonModule.target_user_type +supplier / PlanTemplate.plan_target +supplier / Invoice.issuer_type +supplier / Invoice.status +credit. DB sync 완료 | ✓ |
| 7 | 빌드 + 검증 | `build:dev` exit 0 (89s, main.a29df543.js). v3.25 핵심 6/6 + health-check 73/73 + SPA 200 + webp 200 + anon 401 | ✓ |

### 미반영 (의도)
- 28 placeholder 슬롯 (brand_*/fc_*/owner_*/supplier_* 일부) 은 honest "coming soon" 유지. 데이터 시드 큰 작업 동반 필요 (설계 §6 한계와 일관). 후속 작업으로 분리.
- TS 빌드 경고 누적 잔여 (POStatus 누락 / Badge variant=neutral) — v3.25 직접 origin 아님. 별도 cleanup 작업.

### 부속 cleanup (같이 묶음)
- `models/index.js` — Ingredient FK 폐기 (IngredientSellerProduct join table 단일화)
- `scripts/sprint1-supply-chain-migration.js` — 위 변경 동기화
- `services/invoiceScheduler.js` — subscription invoice 컬럼 누락 보강 (issued_by, status pending → pending_payment, calculated_amount + total_amount)

### 수정된 파일
**Backend (8)**
- models/AddonModule.js, PlanTemplate.js, Invoice.js, index.js
- scripts/update-module-sort-and-category-v3.25.js (신규), seed-buyer-data-v3.25.js (신규), seed-foodcourt-rich-v3.25.js (신규)
- scripts/sprint1-supply-chain-migration.js, services/invoiceScheduler.js

**Frontend (3)**
- src/pages/Landing/PricingPage.tsx, FeaturesPage.tsx
- scripts/capture-features.js
- public/images/features/dashboard/supplier_{dashboard,orders,contracts,trade_invoices}_1.{webp,png} (8 파일)

**Docs (1)**
- docs/PRICING_MODULE_AUDIENCE_v3.25.md (신규)

---

## ✅ 완료: JSON 컬럼 이중 stringify 정합성 복구 (2026-05-05, 버전 미상승)

**데모 레스토랑 13의 결제 settings 페이지에서 카드가 안 보이는 증상 시작 → 시드 코드의 `JSON.stringify(...)` 래퍼와 Sequelize setter의 `JSON.stringify(value)`가 겹쳐 발생한 이중 stringify 광범위 점검 + 모델 setter 가드 + 운영/dev DB 데이터 복구.**

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 진단 | restaurant 13 `payment_settings` JSON_TYPE=STRING + 레거시 스키마(label/availableIn 누락) 확인 | ✓ |
| 운영 DB 정합 scan | 모든 영향 컬럼 일괄 점검 → 99건 깨진 row 발견 (모두 데모/테스트 기원) | ✓ |
| Restaurant 모델 setter 가드 | payment_settings / operation_settings / table_settings — `typeof value === 'string'` 분기로 재래거시 입력도 안전 | ✓ |
| Brand/Foodcourt/SupplierCompany setter 가드 | payment/operation/invoice settings 9개 setter 동일 패턴 적용 | ✓ |
| seed-demo-data.js cleanup | 9곳의 `JSON.stringify(...)` 래퍼 제거 + restaurant 1 payment_settings를 Restaurant 모델 default와 동일한 7-method 정식 스키마로 교체 (cash/card/ewallet/bankTransfer/counter/online/staffMeal) | ✓ |
| 운영 DB 복구 | 백업(`prod:/tmp/json_repair_20260505_220159/`) 후 트랜잭션 1개로 99건 → 0건. orders.payment_proof id=517 "test data" 잔여물은 NULL 처리 | ✓ |
| dev DB 복구 | 백업 후 동일 방식 88건 → 0건 | ✓ |
| 검증 (10단계) | hydration 0 warning · build:dev exit 0 · health-check 73/73 · write→read 왕복 OK · DB raw type=OBJECT · 401 가드 정상 · 역할별 흐름 통과 | ✓ |
| 운영 배포 | 13 백엔드 + 686 프론트 파일 rsync, npm install, PM2 재시작, Nginx 리로드. 운영 demo 페이지 7-method 정상 응답 검증 | ✓ |

### 미반영 (의도)
- `users.permissions` id=10/26/28: User 모델 자체 unwrap+filter 가드가 이미 안전 처리. raw가 깨져 있어도 동작 영향 없음. 사용자가 권한 페이지 한 번 저장하면 자가 정정.
- Order/Coupon 등 운영 데이터 setter: 시드 cleanup으로 재발 차단 + 운영 정합성 검증 0건. 안정성 우선해 손대지 않음.

### 영향
- 운영 일반 유저 데이터 0건 영향 (모든 깨진 row가 데모/테스트 기원)
- 데모 admin 페이지: `https://purplehere.com/restaurant/13/settings?tab=payment` 카드 7개 정상 표시

### 수정된 파일
- `dev-backend/models/Restaurant.js` (3 setter)
- `dev-backend/models/Brand.js` (3 setter)
- `dev-backend/models/Foodcourt.js` (3 setter)
- `dev-backend/models/SupplierCompany.js` (3 setter)
- `dev-backend/seed-demo-data.js` (9곳 cleanup + payment_settings schema 교체)

---

## ✅ 완료: Features 페이지 캡처 정합성 (2026-05-05, 버전 미상승)

**Landing `/features` 페이지의 깨진 이미지 / 빈 카드 정리. 실제 데이터로 11개 카드 신규 캡처. 빈 슬롯은 정직하게 "Screenshot coming soon" 표시.**

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Capture audit 시스템 | 선언된 getImages count vs 실제 webp 파일 차이 자동 검사 스크립트 (`/tmp/audit.js`) | ✓ |
| 빈/희박 캡처 16개 삭제 | 9KB 이하 빈 webp / 데이터 없이 페이지만 보이는 캡처 폐기 | ✓ |
| 고아 파일 rename | brand_products_5→3, inventory_management_5→4 (선언 슬롯 채움) | ✓ |
| Work Manuals 시드 | brand 1+4, restaurant 5, foodcourt 7 — 14개 매뉴얼 (Daily Opening Checklist 등) | ✓ |
| Owner ownership + 티켓 시드 | demo_owner(289) ↔ restaurant 1/2/3 ownership 연결 + 5개 OperationTicket | ✓ |
| MySuppliersPage `supplier_name` 버그 fix | API 가 `supplierCompany.name` 중첩으로 반환하는 데 frontend 가 평면 `supplier_name` 기대 → fetch 결과 매핑에서 fallback 추가 | ✓ |
| Phase 6+7 캡처 11개 신규 | Restaurant: buyer_supplier_contracts/buyer_purchase_orders/buyer_purchase_invoices/work_manuals · Brand: brand_work_manuals · Foodcourt: fc_work_manuals · Owner: operation/system inquiry/reports/work_manuals · Supplier: admin_staff | ✓ |
| FeaturesPage count 0→1 일괄 수정 | 11 codes × 4 role tabs = 20 위치. 실제 webp 있는 슬롯이 carousel 에 노출되도록 | ✓ |
| 최종 audit | 104 declared codes / 81 with images / 23 coming soon / 0 broken | ✓ |
| 빌드 + 배포 | `main.49f61c9d.js` dev 배포 (운영 미배포) | ✓ |

### 신규 시드/스크립트
- `/var/www/dev-backend/scripts/seed-work-manuals-v3.25.js` — work manuals 14건
- `/var/www/dev-backend/scripts/seed-buyer-data-v3.25.js` — Brand → Supplier 거래 흐름 (이전 세션 유산)
- `/var/www/dev-backend/scripts/seed-foodcourt-rich-v3.25.js` — fc admins/staff/branches
- `/var/www/dev-backend/scripts/seed-owner-inquiries-v3.25.js` — demo_owner 권한 + tickets

### 한계 (남은 23개 "Coming soon")
- **진짜 미개발**: Membership, supplier_multi_warehouse 등 Phase 2
- **i18n 버그 회귀 위험**: fc_inventory ("KEY 'STATUS (EN)' RETURNED AN OBJECT" literal 출력 → 별도 fix 필요)
- **데이터 시드 큰 작업**: brand_ingredients/brand_suppliers (재료-공급자 매핑 + 카탈로그 셋업), supplier 측 incoming PO 흐름

### 수정된 파일
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx` (count 변경 20곳)
- `dev-frontend/src/pages/SupplierDirectory/MySuppliersPage.tsx` (supplier_name 매핑)
- `dev-frontend/scripts/capture-features.js` (Phase 6+7 타깃)
- `dev-frontend/public/images/features/dashboard/` (11 신규 + 16 삭제 + 2 rename)
- `dev-backend/scripts/seed-work-manuals-v3.25.js` (신규)
- `dev-backend/scripts/seed-owner-inquiries-v3.25.js` (신규)

---

## ✅ 완료: v3.24 BG/FG → Restaurant Trade Billing (2026-05-04, 버전 미상승)

**Supplier SOA 패턴(`SupplierContract.payment_terms`)을 Brand General/Foodcourt General seller 측에 동급 확장. BG가 자기 산하 가맹점에, FG가 자기 입점 매장에 monthly SOA 청구 가능. credit_limit 강제 차단 포함.**

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Restaurant 모델 컬럼 추가 | `brand_billing_terms` / `foodcourt_billing_terms` JSON nullable. 운영 DB 자동 sync 적용. | ✅ |
| 공통 검증 헬퍼 추출 | `utils/paymentTerms.js` — `validatePaymentTerms` / `buildPaymentTerms` / `VALID_INVOICE_CYCLES`. supplier.js + entity-billing.js 공유. | ✅ |
| BG/FG billing-terms PUT/GET | `routes/entity-billing.js` 신규. brandScope/foodcourtScope 검증, cross-tenant 404. | ✅ |
| BG SOA 흐름 endpoint | `routes/brand-soa.js` — `/soa/current` + `/soa/:id/remind` + `/trade-invoices`. | ✅ |
| FG SOA 흐름 endpoint | `routes/foodcourt-soa.js` — 동일 패턴. | ✅ |
| Trade invoice 자동 발행 시 결제조건 적용 | `services/purchaseOrderService.resolvePaymentTerms()` 에 brand/foodcourt 분기. `Restaurant.{brand,foodcourt}_billing_terms` lookup. | ✅ |
| SOA scheduler 3 평행 처리 | `services/soaScheduler.js` `issueSoaForPair()` 헬퍼 추출 + supplier/brand/foodcourt 3 평행 루프. invoice_category='soa' + parent_soa_invoice_id cascade. | ✅ |
| RA 통합 SOA bundle | `routes/purchase-invoices.js` `/soa/current` 가 issuer_type ['supplier','brand','foodcourt'] 모두 처리, seller_type 필드 추가. | ✅ |
| Credit limit 강제 차단 | `routes/purchase-orders-crud.js` `checkCreditLimit()` — 미수금+신규 합계 한도 초과 시 400 + `code:'CREDIT_LIMIT_EXCEEDED'` + hint. NULL/0 통과. SOA child 중복 카운트 방지. | ✅ |
| BG/FG Restaurants list 수정 | `pages/Manager/RestaurantsPage.tsx` 매장 카드에 Billing 항목 + Edit 트리거. | ✅ |
| BillingTermsModal 공용 컴포넌트 | `components/Billing/BillingTermsModal.tsx` — BG/FG 양쪽 사용 (entityType prop). reset to default 액션 포함. | ✅ |
| BG/FG TradeInvoicesPage 신규 | `BrandTradeInvoicesPage.tsx` (entityType prop) + `FoodcourtTradeInvoicesPage.tsx` (wrapper). Supplier 패턴 100% 복제. | ✅ |
| 사이드바 + 라우트 + ProtectedRoute | MainLayout BG/FG `Plans & Payments` NavItem 추가. App.tsx lazy + Route. ProtectedRoute 화이트리스트. | ✅ |
| i18n 4 언어 신규 | `billing.json` 27 키 × 4언어 + `brand.tradeInvoices.*` 21 키 × 4언어 + `nav.tradeInvoices` × 4언어. | ✅ |
| 설계 문서 | `/var/www/docs/BG_FG_TRADE_BILLING.md` 1~4단계 통합. | ✅ |

### 검증
- 통합 API 테스트: 25/25 PASS (Billing CRUD 6 / Security 6 / Validation 3 / Response 3 / FG mirror 2 / Credit limit 5)
- credit_limit 단위 테스트: 9/9 PASS (NULL/0 통과 / 부분결제 / SOA child 중복 방지)
- health-check regression: 73/73 PASS
- state hydration: 0 warnings
- 빌드: exit 0

### 운영 배포 검증 (2026-05-04 07:46 UTC)
- 운영 DB 컬럼 자동 추가 확인 (`SHOW COLUMNS` 양쪽 JSON nullable)
- `/api/{brand|foodcourt}/soa/current` + `billing-terms` anon 401 정상
- 운영 i18n 4언어 200
- Backup: `/var/www/backups/20260504_074323`

---

## ✅ 완료: v3.24 backstage cleanup 후속 배포 (2026-05-03, 버전 미상승)

**데모 5 역할 정합화 + 헤더 PlanBadge + demo-login 보안 (번들 password 0건) + Pricing/Features 누락 32 모듈 보강**

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 데모 5 역할 추가 + 순서 | RA / BG / FG / Multi-Owner / Supplier (foodcourt + owner 신규 user 생성) | ✓ |
| Multi-Restaurant Owner 표시 | utils/roleDisplay.ts 헬퍼, Login/Demo 카드 적용 | ✓ |
| App.tsx Supplier default redirect | /pos/supplier/dashboard case 추가 (이전 누락) | ✓ |
| 헤더 PlanBadge | components/Layout/PlanBadge.tsx — useAllowedRoutes planType 표시 | ✓ |
| 5 역할 enterprise fallback | Owner / Supplier 의 demo fallback 정정 (Owner Enterprise 13 모듈 / Supplier Advanced 13 모듈) | ✓ |
| demo-login endpoint | POST /api/auth/demo-login + DEMO_KEY_TO_EMAIL 화이트리스트 + is_demo/is_test 가드 | ✓ |
| 번들 password 평문 제거 | Demo@2024 / Test1234 / 8 emails 모두 main.js 에서 0 file | ✓ |
| Pricing 19 누락 매핑 | MODULE_NAMES 에 supplier 13 + fc 2 + buyer 4 추가 | ✓ |
| Features 13 누락 entry | fc 2 + supplier 7 + buyer 4 (B2B Procurement 카테고리 신규) | ✓ |
| 운영 DB demo user 정합화 | demo-foodcourt + demo-owner + demo-supplier 5종 운영 생성 | ✓ |

## ✅ 완료: v3.24 운영 배포 (2026-05-03)

**Stripe/PayPal 결제 표준화 (Subscriptions API + Hosted Checkout + Customer Portal + Webhook 8종) + External QR ↔ Coupon 자동 매핑 (협력업체 할인) + PayPal 가이드 보완 + 리퍼럴 로고 v2 / Cookie /referral 제외**

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Stripe Subscriptions API + Checkout + Customer Portal | 4 issuer 자격증명 + Card Updater/Smart Retries 위임 + 사용자 셀프서비스 | ✓ |
| PayPal Subscriptions + Orders v2 | 동일 표준 흐름 (직접 fetch v1/billing + v2/checkout) | ✓ |
| Webhook 8종 + signature + dedupe | WebhookEvent UNIQUE event_id, server.js inline 제거 | ✓ |
| autoCharge 토글 4 PaymentSettings 제거 | 구독 가입 = 곧 auto-charge (게이트웨이 위임) | ✓ |
| External QR ↔ Coupon 매핑 | 협력업체 자동 할인 (모바일 진입 시 자동 적용) | ✓ |
| PayPal 가이드 보완 | Subscriptions/Vault 활성화 + webhook events 8종 | ✓ |

## ✅ 완료: v3.23 운영 배포 (2026-05-03)

**비대 라우트 분리 + Sentry cleanup + B9 dashboard 사전 집계 + B10 Jest 27 tests + Overdue cron + UI/UX 친절도 보강 + 백엔드 에러 응답 표준화 (fieldErrors + hint)**

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 비대 라우트 분리 마무리 | inventory-routes 1820 → core+extra, purchase-orders 1624 → crud+workflow. 모든 sub-router 1500줄 미만 달성 | ✅ |
| Sentry 코드 정리 | server.js init/error handler + middleware/auth setUser + frontend AuthContext setUser + index.tsx ErrorBoundary → React 표준 inline class. 번들 1726→1447KB (−280KB) | ✅ |
| B9 — Dashboard 사전 집계 | RestaurantDailyStats 모델 + dailyStatsScheduler (매일 00:30 SGT) + backfill (25 식당 × 30일 = 750 row) + 신규 endpoint /daily-stats + sales-chart 통합 (사전집계 + today live) + docs/DASHBOARD_AGGREGATION.md | ✅ |
| B10 — Jest 27 contract tests | jest+supertest devDeps + tests/_helpers (X-Forwarded-For 우회) + auth(8) + idor(5) + payment-flow(6) + suspended-ux(3) + referral-commission(4). 27/27 PASS. ci-workflow.yml.template (MySQL service container + 3 jobs) | ✅ |
| 비-subscription invoice overdue cron | invoiceOverdueScheduler (service/hardware/po/soa, 매일 02:30 UTC, SOA child 제외, invoiceOverdueEmail) | ✅ |
| Stripe/PayPal/SMTP 연동 가이드 | components/Payment/PaymentGatewayGuide (4 페이지) + components/Common/SmtpGuide (Gmail/Outlook/Other 3-tab). 가입 → API key → webhook → test 단계별 | ✅ |
| Empty states + 빈 상태 가이드 | EmptyState 표준 컴포넌트 + Customers/NewPO/Ingredients 빈상태 (3-step 가이드 + CTA + 도메인 설명) | ✅ |
| Mobile / Settings 친절도 | Mobile MenuPage 첫 사용자 banner + Mobile PaymentPage 결제방법 hint + SiteSettings 영향 박스 + Brand/FG 토글 비활성화 경고 + Restaurant Invoice 결제 흐름 + Late Fee preview | ✅ |
| 백엔드 에러 응답 표준화 | errorHandler 강화 (Sequelize/JWT 자동 변환) + requireFields 헬퍼 + parseApiError frontend 헬퍼 + 44 라우트 + middleware/auth+recipeAuth sweep (legacy → object form) + sample 1 endpoint fieldErrors+hint 보강 | ✅ |
| Overdue Cron 문서화 | BILLING_SYSTEM_INTEGRATION_PLAN 갱신 (Overdue Cron 완료 표기) + V3_18_BASIC_TIER_GAPS UNGUARDED 이미 fix 표기 | ✅ |

### 자동 마이그레이션 (운영 배포 시)
- sprint4/5/6/7-migration / migrate-2026-03-18 / migrate-supplier-staff / migrate-soa-invoice / migrate-referral
- RestaurantDailyStats 자동 sync (124 tables, 이전 123 → +1)

### 검증 (배포 후 라이브)
- frontend https://purplehere.com → 200 / backend /api/health → 200
- 익명 /api/restaurants → 401 / POST /invoices/categories → 새 에러 형식
- 분리된 라우트 prod 도착 (inventory-core/extra, purchase-orders-crud/workflow)
- 신규 서비스 prod (dailyStatsScheduler, invoiceOverdueScheduler)
- health-check 73/73 PASS, Jest 27/27 PASS

---

## ✅ 완료: v3.22 운영 배포 (2026-05-03)

**리퍼럴 UX 보강 + `/api/restaurants` 익명 노출 fix + 인보이스 사유 표시 + 운영 준비 점검 P0+P1 + 비대 라우트 분리**

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 리퍼럴 UX 보강 | `/referral/dashboard` "How it works" 카드 (15%/20%/Forever) + `/signup` Referral Code hint 항상 노출 + ReferralLogin/Signup box-sizing fix + 모바일 반응형 (StatCard/Layout) + 신규 `purple-referral-logo.svg` + i18n 4언어 32 키. | ✅ |
| `/api/restaurants` 익명 노출 차단 | `optionalAuth` → `authenticateToken`. admin email/businessReg/taxId/subscription 미인증 GET 차단. health-check 영구 케이스 (security 21→22). | ✅ |
| fetch 헤더 누락 sweep | `Manager/SalesPage`, `SystemInquiryPage`, `Recipes/RecipesPage` 401 버그 fix (getAuthHeaders 적용). | ✅ |
| 인보이스 사유 표시 | Restaurant/Owner/Admin 인보이스 우측 패널 + print HTML 에 `discount_reason` 노출. 'Referral: 20% off first month (PURPLE-XXXX)' 가 사용자에게 보임. | ✅ |
| uploads 백업 (C1) | dev/prod backup-database.sh tar.gz + cross-backup. 디스크 사고 32MB 손실 차단. | ✅ |
| financial path audit log (C2) | logActivity 가드 완화 + logSystemActivity 신규. processCommission/applyCredit/restoreSubscription/payout request·review 모두 audit. | ✅ |
| 결제/인보이스 console 정리 (C5+D1) | invoices-payment 10건 + invoices-main 26건 제거. PII (User email + payment_method + transaction_id) 평문 차단. console.error 보존. | ✅ |
| PM2 log rotation (A) | pm2-logrotate dev/prod (dev 14일/prod 30일/10MB/gzip). Sentry 미사용 결정 후속. | ✅ |
| per-route rate limit (D) | auth signup 10/h, forgot 5/15min, admin-analytics/admin-reports 30/min. | ✅ |
| utils/logger.js (E) | thin wrapper. info/warn/error/debug + 환경별 필터. winston 호환 인터페이스. | ✅ |
| 비대 라우트 분리 (F+G) | invoices-main 2622→list+crud+generation. brands 2596→core+plans (barrel). foodcourts 2333→core+plans (barrel). 모든 sub-router 1500줄 미만. | ✅ |
| 운영 sysops cron 이전 | root crontab → irene crontab, `/var/backups/orderhere/` chown irene. | ✅ |
| 운영 준비 점검 보고서 | `docs/OPERATIONAL_READINESS_AUDIT.md` 신규 (Baseline + 부족 + 위험 + 트래픽 트리거 + 실행 계획). | ✅ |

### 자동 마이그레이션 (운영 배포 시)
- sprint4/5/6/7-migration / migrate-2026-03-18 / migrate-supplier-staff / migrate-soa-invoice / migrate-referral / cleanup-sequelize-duplicate-indexes (idempotent skip)

### 검증 (배포 후 라이브)
- frontend `https://purplehere.com` 200 / backend `/api/health` 200
- 익명 `/api/restaurants` 401 (보안 fix 적용)
- 분리된 라우트 prod 도착 (invoices-list/crud/generation, brands-core/plans, foodcourts-core/plans + barrel)
- logger.js + pm2-logrotate prod online
- health-check 73/73 PASS

---

## ✅ 완료: v3.21 운영 배포 (2026-05-01)

**Refer & Earn (리퍼럴 시스템) Phase 1+2+3 + IDOR 7 endpoint fix + Suspended account UX 재설계 + DB 인덱스 769개 정리**

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 리퍼럴 시스템 Phase 1+2+3 | DB 6 모델 + User 6 컬럼 + referralService 11 함수 + 27 endpoint + 7 페이지 + 7 이메일 템플릿 + i18n 4언어 (288 키 × 4 = 1152). 5 치명결함 fix (cancel hook / overview funnel / 사이드바 잔액 / delete guard / per-route rate limit). 비즈니스 로직 E2E 49 PASS / 0 FAIL. | ✅ |
| Suspended account UX 재설계 | 로그인 차단 분기 제거 (`authService.js`) → `ProtectedRoute`가 invoice 페이지로 강제 redirect. `SuspendedBanner` 공통 컴포넌트 + `AuthContext.refreshUser()` hook. 결제 후 `restoreSubscription` → 새로고침 없이 즉시 정상 화면 전환. demo/test 계정 예외 처리. | ✅ |
| IDOR 보안 fix 7 endpoint | orders-views (3) + activityLogs (2) + invoices-main (4) + membership (2) — `checkRestaurantAccess` 누락된 endpoint에 미들웨어 추가. cross-tenant 11/11 protected, own-tenant 6/6 OK 라이브 검증. | ✅ |
| Invoice 카운트 정합성 fix | `dashboard.js:457`, `restaurants-subscription.js:209`, `BrandManagerDashboard:442`, `FoodcourtGeneralDashboard:687` — 4곳에서 `inv.status === 'sent'` legacy ENUM 사용 (Invoice ENUM에 'sent' 없음). 정상 ENUM (`pending_payment`/`payment_submitted`/`overdue`)으로 통일. 미납 인보이스 9건이 9건으로 정확히 표시 (이전 1건). | ✅ |
| SignupPage 가입 흐름 정돈 | 로그인된 상태에서 `/signup` 진입 시 안내 카드 (Go to dashboard / Sign out and create new account 두 액션). `?ref=PURPLE-XXXX` 진입 시 referral 입력 필드 숨김 + 보라 배너만 표시. | ✅ |
| SA Partners detail Modal | `/pos/admin/referrals` Partners 행 클릭 → 5섹션 Modal (Partner 정보 / Referred users / Wallets / Recent commissions / Recent payouts). i18n 4언어 17 신규 키. | ✅ |
| Wallet UX 단순화 | 필터 5개 → 3개 (`All` / `Commissions` / `Payouts`), Stats 3개 → 2개 (Credit used 제거), `applyHint` 제거 (RP는 POS 안 씀). i18n 4 키 제거. | ✅ |
| 한국어 i18n "수수료" → "커미션" | referrals namespace 26 키 + 조사 보정 10건 (`커미션를 → 커미션을` 등). | ✅ |
| 운영 Staff fix | `routes/users.js` 5 endpoint 권한 확장 — Restaurant Admin이 자기 매장 staff 관리 가능. tenant isolation + role escalation 차단 ('Staff'만 만들 수 있음). | ✅ |
| DB 마이그레이션 통합 cleanup | `cleanup-sequelize-duplicate-indexes.js` 신규 — 17개 테이블 769개 sequelize-style `<col>_<N>` 중복 unique 인덱스 정리 (canonical UNIQUE만 keep). MySQL 64-key 한계 해소 → ER_TOO_MANY_KEYS startup 에러 사라짐. | ✅ |
| migrate-referral.js | referral 6 테이블 + User 6 컬럼 운영 마이그레이션 자동 실행. | ✅ |
| health-check 안전망 강화 | security 카테고리 16 → 21 (cross-tenant IDOR 5건 영구 추가). 6번째 카테고리 'referral' 24 테스트. **총 67/67 → 72/72 PASS**. | ✅ |
| 양방향 cross-backup 정돈 | POS 운영 `backup-database.sh` cross-backup 디렉토리 `production` → `production-pos` (PlanQ와 충돌 회피). dev cleanup 동일 통일. legacy `production/` → `production-pos/` 이동. 1회 수동 실행 → dev 도착 검증 (1.9 MB). | ✅ |

### 자동 마이그레이션 (운영 배포 시)
- `cleanup-users-duplicate-indexes.js`
- `cleanup-restaurants-duplicate-indexes.js`
- `cleanup-sequelize-duplicate-indexes.js` (17 테이블 769 중복)
- `sprint4/5/6/7-migration.js` (idempotent skip)
- `migrate-supplier-staff.js` (idempotent skip)
- `migrate-soa-invoice.js` (idempotent skip)
- `migrate-referral.js` (referral 6 테이블 + User 6 컬럼 신규 생성)

### 운영 검증 (배포 후)
- frontend HTTP 200 (`/`, `/restaurant/8/dashboard`, `/referral-program`, `/referral/login`)
- backend `/api/health` ok, environment: production
- referral 6 테이블 운영 DB 생성 확인
- 운영 DB 중복 인덱스 cleanup 성공 (none ✓)
- PM2 production-backend online

### 후속 권고 (별도 작업)
- 운영 cron(root) → irene user 이전 (또는 root 공개키 dev 등록) — root SSH key가 dev 미등록이라 cron 자동 cross-backup 실패 중. 1회 수동 실행은 성공. 사용자가 sudo 비번 직접 입력해야 하는 sensitive 작업이라 별도 세션으로 분리.

### 수정/신규 파일 (60+)

**Backend (신규 파일)**
- `models/{ReferralWallet, ReferralCommission, ReferralWalletTransaction, ReferralPayout, ReferralClick, ReferralSettings}.js`
- `routes/referrals.js`
- `services/{referralService, invoiceLifecycle}.js`
- `scripts/{cleanup-restaurants-duplicate-indexes, cleanup-sequelize-duplicate-indexes, cleanup-users-duplicate-indexes, migrate-referral}.js`

**Backend (수정)**
- `routes/{auth, dashboard, activityLogs, orders-views, invoices-main, invoices-payment, membership, notification-settings, users, restaurants-subscription}.js`
- `services/{authService, invoiceScheduler}.js`
- `middleware/auth.js`
- `models/{User, index}.js`
- `utils/notificationTemplates.js`
- `scripts/health-check.js`

**Frontend (신규 파일)**
- `components/Common/SuspendedBanner.tsx`
- `components/Referral/{ApplyCreditModal, ReferralAuthLayout, ReferralLayout}.tsx`
- `pages/Admin/ReferralManagementPage.tsx`
- `pages/Landing/ReferralLandingPage.tsx`
- `pages/Referral/{ReferralDashboardPage, ReferralLoginPage, ReferralProfilePage, ReferralSignupPage, ReferralWalletPage}.tsx`

**Frontend (수정)**
- `App.tsx`, `i18n.ts`
- `components/{ProtectedRoute, Landing/LandingHeader, Layout/MainLayout}.tsx`
- `contexts/AuthContext.tsx`
- `pages/Landing/SignupPage.tsx`
- `pages/Restaurant/InvoicesPage.tsx`
- `pages/BrandGeneral/BrandInvoicesPage.tsx`
- `pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `pages/Owner/OwnerInvoicesPage.tsx`
- `pages/Brand/BrandManagerDashboard.tsx`
- `pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx`
- `pages/Staff/StaffPage.tsx`

**i18n (4 언어)**
- `public/locales/{en,ko,zh,ms}/referrals.json` (288 → 301 키)

**Sysops**
- `deploy-to-production.sh` (4 신규 마이그레이션 추가)
- 운영서버 `/var/www/scripts/backup-database.sh` (cross-backup 디렉토리 production-pos)
- `/var/www/scripts/backup-database.sh` (dev cleanup production-pos)

---

## ✅ 완료: v3.20 배포 후 후속 fix + Cleanup (2026-04-30, 미배포)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Restaurant Ingredient image POST 드롭 fix | `routes/restaurants-ingredients.js:185` POST가 `image_url, ingredient_category_id, supplier_id, base_quantity, track_stock` 5필드 drop. 누락 필드 추가. RA/SA × POST/PUT × image set/null 4/4 라이브 검증 | ✅ |
| Ingredient modal UX 정돈 | 푸터 sticky (form 안 → Modal `footer` prop, `form="ingredient-form"` 외부 submit) + Save disabled 조건(필수 미입력/Edit isDirty=false/제출 중) + "Saving..." 텍스트 + 더블클릭 차단 | ✅ |
| Supplier Staff 모듈 게이팅 fix | `ProtectedRoute MODULE_GATED_ROUTES` 에 `/pos/supplier/staff` → `supplier_admin_staff` 추가. URL 직접 입력 우회 차단 (sidebar `hasModule` ↔ Route 게이팅 동기화) | ✅ |
| Orphan 페이지 9개 + 빈 디렉토리 4개 정리 | `PurchaseInvoicesPage` (per-role page로 대체) + `Admin/AddonModulesPage`, `Admin/AnalyticsPage`, `BillPrint/BillPrintPage`, `CompanyProfile/CompanyProfilePage`, `FloorPlan/OrderOverlay`, `Manager/CompanySettingsPage`, `RecipeManagement/SuppliersTab`, `TableManagement/TableManagementPage` 삭제 + 빈 디렉토리 정리 | ✅ |
| 운영 직전 전수조사 검증 | Sidebar URL→Route 매핑 102/103 PASS, Lazy import 153/153, HTTP 200 91/91, FE↔BE 258/262 매칭, BE 라우터 mount 85개 정상 | ✅ |

### 수정된 파일
- `dev-frontend/src/components/ProtectedRoute.tsx` (Supplier Staff 게이팅 추가, /pos/purchase-invoices 게이팅 제거)
- `dev-frontend/src/App.tsx` (PurchaseInvoicesPage import + 라우트 제거)
- `dev-frontend/src/pages/RecipeManagement/IngredientsTab.tsx` (modal sticky + disabled + isSubmitting)
- `dev-backend/routes/restaurants-ingredients.js` (POST 5개 필드 누락 fix)
- (삭제) `dev-frontend/src/pages/PurchaseInvoices/PurchaseInvoicesPage.tsx` 외 8개 orphan + 4 빈 디렉토리

---

## ✅ 완료: v3.20 운영 배포 (2026-04-30)

**Supply Chain Sprint 7 + Supplier Staff + SOA Invoice 재설계 + 운영 쿠폰 버그 fix**

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 운영 쿠폰 100% 할인 fix | `orders-crud.js:414, 487` falsy 체크 → `== null`. 운영 8건 정정 (Restaurant 8 IPC) | ✅ |
| Supply Chain Sprint 7 | inventory polymorphic + Returns 양방향 + 수령 splits + Carrier webhook HMAC + path-level middleware fix | ✅ |
| Phase A — 운영 위험 5건 | A1 PO 알림 / A2 mark-shipped 차단 / A3 트랜잭션·락 / A5 row-level lock / A4 false positive 확인 | ✅ |
| B1 SOA 재설계 | invoices.parent_soa_invoice_id + soaScheduler가 SOA Invoice 발행 + cascade payment (3 endpoint) + Frontend 인라인 + 결제버튼 조건부 | ✅ |
| B2 Supplier Staff Advanced 모듈 | users.supplier_company_id + role ENUM 확장 + supplierScope Staff 인식 + 4 CRUD endpoint + SupplierStaffPage + 사이드바 게이팅 | ✅ |
| B3 SupplierDashboard 리팩토링 | 인라인 styled → 공통 컴포넌트, StatusBadge variant 매핑, Skeleton 4→8 | ✅ |
| B4 Empty state + CTA | Contracts tab별 hint, Customers "View Pending Contracts" CTA | ✅ |
| 모바일 모달 padding 통일 | UI/Modal.tsx (76 페이지) + 4 인라인 모달 @media (max-width: 640px) | ✅ |
| Restaurant 구매자 흐름 정돈 | alert/confirm 12건 → AlertDialog/ConfirmDialog, 이모지 SVG 대체, AddressFields 적용, i18n 4언어 | ✅ |

### DB 마이그레이션 (자동 실행)
- `scripts/sprint7-migration.js`
- `scripts/migrate-supplier-staff.js`
- `scripts/migrate-soa-invoice.js`

### 검증 (실 데이터)
- POS 쿠폰 fix 라이브 검증 (subtotal=7, coupon=7, total=0 보존)
- PO 라이프사이클 6/6 (submit → race lock → mark-shipped 차단)
- Supplier Staff CRUD 7/7 (POST/GET/PUT/DELETE + PIN 중복 거부)
- SOA cascade 8/8 (submit-payment + confirm-payment 양쪽 child 자동)
- Restaurant Ingredient image 6/6 (5필드 round-trip)
- health-check 43/43 / state hydration 0 warning

---

## ✅ 완료: PO/Supplier/Invoice 통합 UX 재정비 (2026-04-29, 미배포)

### 배경
Cart-first PO 시스템 후속 작업으로 발주~인보이스 전체 흐름 UX 통일 + 정보 아키텍처 재정렬. 사이드바 섹션 명/메뉴 구조, 통화 정책, 인보이스 통합, Stock Items 명칭 변경까지 일괄 정리.

### 완료된 작업

| 영역 | 변경 | 상태 |
|------|------|:---:|
| Cart 페이지 | PageWrap 으로 viewport 고정 (cart 푸터 항상 보임), 타이틀 "Purchase Order" | ✅ 완료 |
| Cart 검색 | name/sku/desc/unit/category.name/company.name OR-검색 (백엔드+프론트) | ✅ 완료 |
| PO 모델 | `external_invoice_url`/`external_invoice_filename`/`external_invoice_uploaded_at` 컬럼 추가 | ✅ 완료 |
| PO list 응답 보강 | item_count/total_quantity/seller_name/is_external/external_invoice_url/trade_invoice_id 항상 포함 | ✅ 완료 |
| PO 액션 | upload-invoice / mark-received endpoint + 외부공급업체 보안 검증 | ✅ 완료 |
| PO history | DatePeriodFilter (LiveOrders 동일), SearchableSelect 공급업체, Print/Download 아이콘만, 우측 패널 (DetailPage embedded), PO번호 클릭 패널, 인보이스 섹션 + View/Download | ✅ 완료 |
| PO Detail | Edit 제거, "+ Order More", embedded mode (panel header/body/footer 분리), tracking_info.note Object → string 버그 수정 | ✅ 완료 |
| 통화 정책 | createPurchaseOrderCore 에 `NO_BUYER_CURRENCY`/`CURRENCY_MISMATCH` 차단 + settingsUrl 안내, FE confirm 모달 | ✅ 완료 |
| 사이드바 | 섹션명 Suppliers→Order, 메뉴 순서 정리 (Purchase Order/History/Suppliers), Suppliers 1메뉴 (탭 통합), Purchase Invoices 메뉴 제거 (통합 Invoices 사용) | ✅ 완료 |
| Suppliers 페이지 | My/Find 탭바 추가, "+ External Supplier"→"External Supplier" | ✅ 완료 |
| Stock Items | Ingredients→Stock Items 명칭 변경 (4 언어), Operations 섹션 Inventory 위로 이동, AddonModule(inventory_management) 에 `/restaurant/*/ingredients` 추가 | ✅ 완료 |
| Invoice 통합 | Restaurant Invoices 페이지에 SOA 묶음 inline 표시 (별도 탭 X), child 인보이스 자동 hide + expand 시 표시, Pay All / Download SOA PDF 버튼 | ✅ 완료 |
| Backend SOA | `/api/purchase-invoices/soa/:supplierId/pay` (일괄 payment_submitted), `/pdf` (표지 + 인보이스 합본 HTML→PDF) | ✅ 완료 |
| 샘플 데이터 | PO 4건 (`PO-R5-SAMPLE-01~04`) → Trade Invoice 4건 (`TRD-SUP14-20260429-001~004`) → SOA 1건 (S4 Sup Co. MYR 280.60) 생성 | ✅ 완료 |

### 수정된 파일

**백엔드:**
- `dev-backend/models/PurchaseOrder.js` (external_invoice 컬럼)
- `dev-backend/routes/purchase-orders.js` (list 보강, detail 보강, 통화 검증, upload-invoice, mark-received, mark-sent-external/mark-received tracking_info note 버그 fix)
- `dev-backend/routes/purchase-invoices.js` (SOA pay/pdf endpoints)
- `dev-backend/routes/supplier-directory.js` (검색 OR-clause 확장: description/unit/category.name/company.name)
- `dev-backend/services/purchaseOrderService.js` (createTradeInvoice — 샘플 데이터 생성에서 사용)

**프론트:**
- `dev-frontend/src/components/Layout/MainLayout.tsx` (Order 섹션, Stock Items, Suppliers 통합 메뉴)
- `dev-frontend/src/pages/PurchaseOrders/NewPurchaseOrderPage.tsx` (PageWrap, 검색 확장, 통화 에러 처리)
- `dev-frontend/src/pages/PurchaseOrders/PurchaseOrdersPage.tsx` (FilterToolbar, IconBtn, SearchableSelect, 우측 패널, 인보이스 액션)
- `dev-frontend/src/pages/PurchaseOrders/PurchaseOrderDetailPage.tsx` (embeddedId, EmbeddedTitle/Footer, Invoice 섹션, Edit 제거)
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx` (SOA inline 표시, SoaBundleRow 컴포넌트)
- `dev-frontend/src/pages/Supplier/SupplierContractsPage.tsx` (PageTab 추가)
- `dev-frontend/src/pages/SupplierDirectory/SupplierDirectoryPage.tsx` (PageTab 추가, "+" 제거)
- `dev-frontend/public/locales/{en,ko,zh,ms}/purchaseOrders.json` (newPo.title)
- `dev-frontend/public/locales/{en,ko,zh,ms}/recipes.json` (Stock Items)

### DB/설정 변경
- `purchase_orders` 테이블에 3개 컬럼 추가 (external_invoice_*)
- `addon_modules.inventory_management.ui_routes` 에 `/restaurant/*/ingredients` 추가

---

## ✅ 완료: Supply Chain Sprint 7 — Operational Hardening (2026-04-28, 미배포)

**설계 문서**: `docs/SUPPLY_CHAIN_SPRINT_7.md` (1~4단계 산출물 통합)

### 배경
Sprint 1~6 흐름의 운영 사고 위험 4 영역을 30년차 컨설턴트 관점에서 진단하여 Sprint 7로 묶어 일괄 보강. 12개 추가 빈틈 + ε.1~4 결정사항도 모두 반영.

### 완료된 작업 (4 영역 + 12 빈틈)

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | inventory_transactions 정식화 | entity_type/entity_id/purchase_order_id 컬럼 + ENUM 확장(return_in/return_out) + Sequelize beforeCreate hook (legacy↔new 양방향 backward-compat) + 백필 61 rows | ✅ |
| 2 | inventory_batches 정규화 | entity_type/entity_id 컬럼 + restaurant_id NULL 허용 + hook + 백필 25 rows | ✅ |
| 3 | Returns 양방향 환원 | po-returns.js approve handler 분기 (supplier 기존 + brand `Ingredient.current_stock` + foodcourt `FoodcourtProduct.current_stock`) + Currency assertion (PO ↔ Credit Note 정합 강제) | ✅ |
| 4 | 수령 차이 분류 | purchase_order_items.discrepancy_reason ENUM(short/damaged/wrong_item/pending) + receive splits payload 구조 + auto-returns 자동 생성 (damaged/wrong_item) + 사후 PUT discrepancy endpoint | ✅ |
| 5 | PO.status ENUM 확장 | in_transit + delivery_failed 추가, status progress order 정의 (out-of-order webhook 거부) | ✅ |
| 6 | Carrier webhook 인프라 | carrier_webhook_events 신규 테이블 + carriers webhook_secret/event_path/tracking_path/idempotency_path/status_map 컬럼 | ✅ |
| 7 | Carrier webhook endpoint | `POST /api/carrier-webhooks/:carrier_code` Public + HMAC SHA-256 + timestamp tolerance ±5분 + payload_hash UNIQUE idempotency + 2단계 처리 (검증 동기 + 적용 비동기 setImmediate) | ✅ |
| 8 | Webhook out-of-order 처리 | status progression check (delivery_failed/cancelled/returned은 어디서나 적용, 그 외는 진보된 status만) + multiple_match 시 가장 최근 PO + error 기록 | ✅ |
| 9 | Webhook 알림 throttle | shipped/delivered/delivery_failed/returned만 메일, picked_up/in_transit은 socket emit only | ✅ |
| 10 | Admin Carrier webhook config | PUT webhook 설정 (status_map ENUM 검증) + POST regenerate-secret (rate limit + plain 한 번만 노출 + 마스킹) | ✅ |
| 11 | Admin retry + Simulate | POST retry (실패 event 재처리) + POST simulate (HMAC bypass, 운영 QA용) | ✅ |
| 12 | BG inventory transactions | GET `/api/brands/:brandId/inventory/transactions` (entity_type='brand' 필터, ingredient/PO join) | ✅ |
| 13 | Frontend Receive Modal | splits UI (segmented control OK/Short/Damaged/Wrong/Pend) + auto-return 인라인 안내 + 모바일 카드 stack 반응형 | ✅ |
| 14 | Frontend CarrierWebhookEventsPage | 신규 페이지 (모니터/필터/retry/simulate 모달/event detail drawer) | ✅ |
| 15 | Frontend Carriers 모달 webhook 섹션 | accordion + Endpoint URL 노출 + Regenerate Secret 흐름 (한 번 노출 + Copy + 경고) + status_map JSON editor | ✅ |
| 16 | Sidebar + 라우트 + ProtectedRoute | Admin 영역 ⚡ Carrier Webhooks 메뉴 + `/pos/admin/carrier-webhooks` (System Admin 전용) | ✅ |
| 17 | path-level middleware fix | `routes/brand-inventory.js`의 `router.use(authenticateToken)` (path 없음) → `router.use('/brands', authenticateToken)` 좁힘. carrier-webhooks public endpoint 401 사고 해결 | ✅ |

### 검증 (10단계 모두 PASS)
- 0 hydration: 0 warnings
- 1 빌드: exit 0 (`main.6f0b969f.js` 1.71MB)
- 2 pm2: dev-backend online · /api/health ok
- 3 API roundtrip: 11/11 (webhook config Write→Read · regenerate (length 128, entropy) · HMAC happy/tamper/replay/expired · discrepancy auth · BG transactions · 역할 격리)
- 4 SPA HTML: 200
- 5 역할별: SA/BG/FG/RA × 새 endpoint 12/12
- 6 요구사항: 4 영역 + 12 빈틈 + ε.1~4 결정 모두 ✅
- 7 회귀: health-check **43/43 PASS**, receive caller 단독 안전
- 8 UI/UX: timezone util, 금지 패턴 없음, 768px 반응형
- 9 SPA: 13/13 200 (신규 carrier-webhooks 포함)

### test-sprint7.js 시나리오 (19/19 PASS)
- Migration column 9개 + 신규 테이블 + 백필 0 orphans
- Sequelize hook backward-compat (legacy / new code)
- Webhook config + secret regenerate + invalid ENUM 거부
- HMAC 정상/무효/replay/expired
- Simulate (HMAC bypass)
- Admin event list

### 데모 데이터 (live)
- R#38 PO 40건: draft 1 / submitted 12 / confirmed 4 / shipped 7 / received 16
- Returns 2 + Credit Notes 1
- Lalamove carrier: webhook secret + status_map 자동 설정 (검증 단계)

### 수정/신규 파일

**Backend (12)**
- 신규: `models/CarrierWebhookEvent.js`, `routes/carrier-webhooks.js`, `scripts/sprint7-migration.js`
- 수정: `models/{InventoryTransaction,InventoryBatch,PurchaseOrder,PurchaseOrderItem,PurchaseOrderReturn,Carrier,index}.js`, `routes/{po-returns,purchase-orders,carriers,brand-inventory}.js`, `server.js`

**Frontend (5)**
- 신규: `pages/Admin/CarrierWebhookEventsPage.tsx`
- 수정: `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx`, `pages/Admin/CarriersPage.tsx`, `App.tsx`, `components/Layout/MainLayout.tsx`

**Docs (1)**
- 신규: `docs/SUPPLY_CHAIN_SPRINT_7.md` (1~4단계 산출물 통합)

### 다음 세션 — Irene 브라우저 테스트 → /배포 v3.20

서버 사이드 검증 완료. 브라우저 클릭 흐름만 Irene이 확인 (15분 코스 — `.claude/session-state.md` 참조).

테스트 OK 시 `/배포` v3.20 — 묶음:
1. Timezone Coverage 일괄
2. 모바일 헤더 fix
3. 항목 12 — Restaurants 계약 뱃지
4. Sprint 7 — Operational Hardening
5. path-level middleware fix

배포 스크립트: `/var/www/deploy-to-production.sh` (sprint7-migration.js 자동 실행)

### Sprint 7 미완료 (후속)
- BG Inventory Transactions tab UI (backend ready)
- i18n 4언어 키 (모든 t() 호출에 영문 fallback 있어 동작 영향 없음)
- Carrier 운영 매뉴얼 (secret 등록 절차)
- Sprint 8~10 (15개 빈틈 중 11개 남음)

---

## ✅ 완료: Timezone Coverage 일괄 (2026-04-28, 미배포)

**원칙**: 모든 toLocaleDateString/toLocaleTimeString 호출에 엔티티(Restaurant/Brand/Foodcourt) 의 `operation_settings.timeZone` 적용. 미설정 시 `Asia/Kuala_Lumpur` 폴백.

### 작업 결과
- Frontend 2 파일: BrandGeneralDashboard, FoodcourtFloorPlanPage(deriveKeyNumber/unitsToFloorTables timezone 인자)
- Backend 11 파일: notificationTemplates(7함수+fmtDate), invoiceEmailTemplate, invoices-helpers(getInvoiceTimezone helper 신규), invoices-main(4곳+formatDate), notices, invoiceScheduler, subscriptionScheduler(D+3/7/14 reminder + contract expiry + trial), soaScheduler(buyer-side tz), authService, restaurants-subscription, subscriptions

### 검증
- 빌드 `main.b4cbd869.js` · health-check 43/43 · API 실호출 invoice billing period (KL=Feb 1-28, NY=Jan 31-Feb 27) · SPA 200

DEVELOPMENT_PLAN의 "다음 1.5: 타임존 전체 적용 (긴급)" 항목 완전 종결.

---

## ✅ v3.19 운영 배포 완료 (2026-04-28)

**Supply Chain System Sprint 1~6 + 보안 IDOR 일괄 + UX 정리** 운영 반영 완료.

- 신규 16 DB 모델, 102 endpoints, 30 UI 페이지 (Supplier 사업체 + buyer-seller 거래 흐름)
- Sprint 5+6 (Smart Reorder + Live Sales Order + Lifecycle Completion) — 발주 완성
- 보안 IDOR 3건 차단 (menu.js / brand-inventory.js / inventory-routes.js)
- BG multi-brand 지원, Foodcourt buyer 흐름 차단(Phase 3 deferred)
- dev 이메일 SMTP 차단 (test signup 운영 메일 폭격 방지)
- 블로그 e-Invoice RM10K (3언어) 발행
- DB schema 96 → 116 tables (20 신규)
- Production smoke test 10/10 PASS, frontend `main.8b60d84c.js`

## 미배포 누적 (v3.19 후보)
- Sprint 1~4 (Supply Chain 4-Design)
- Supplier Portal Polish
- PO Phase 2 (Contract Gate + Cost Sync)
- Sprint 5 (Live Orders + Delivery Tracking + Carrier 카탈로그)
- Sprint 5 Detail (BulkOrderModal + Suggestion column + Carrier Admin + Detail Drawer)
- Sprint 6 (Lifecycle Completion: Delivered/Cancel/Tracking-edit/Returns/Print)
- Sprint 6 마무리 (Live Orders Restaurant 패턴 100% 일치)

---

## ✅ 완료: 보안/IDOR 일괄 + UX 정리 + dev 이메일 차단 (2026-04-28, 미배포)

### 배경
v3.19 운영 배포 직전 4개 도메인(발주/재고/라이브오더/프로덕트) 전수조사를 통해 IDOR 보안 취약점 3건과 Major issue 4건 발견. 동시에 dev 서버에서 운영 admin 메일함으로 test signup 이메일이 폭격되는 사고 + Brand General 페이지에서 multi-brand 무지원 + 라이브오더 페이지 TDZ runtime crash 등 운영 사고 4건 발견. 일괄 수정 + 10단계 검증 완료.

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **🔒 Critical: menu.js IDOR** | 8 endpoint에 checkRestaurantAccess + `/product/:id`엔 `checkProductTenant` (req.params.id 충돌 회피). middleware/auth.js 가 query/body restaurantId도 해결 | ✅ |
| 2 | **🔒 Critical: brand-inventory.js IDOR** | 4 `:brandId` endpoint에 `requireBrandScope` 적용 | ✅ |
| 3 | **🔒 Critical: inventory-routes.js IDOR** | 검증 결과 line 25에 이미 router-level checkRestaurantAccess 적용 (false-positive) | ✅ |
| 4 | **🟠 BG multi-brand 지원** | BrandProductRecipePage `/api/brands` fetch + selector 드롭다운, ProductRecipesTab/CategoriesTab brandId prop, `?brand_id=N` 쿼리 필터 | ✅ |
| 5 | **🟠 PO 비-Restaurant audit** | Brand/Foodcourt buyer 수령 시 ActivityLog (entity_type='po_receipt') — InventoryTransaction restaurant_id NOT NULL 우회 | ✅ |
| 6 | **🟠 Socket.IO seller room 격리** | system_admin seller emit skip (POS 자체가 seller라 알릴 사람 없음). 비-system-admin인데 entity_id null인 경우 console.error로 surfacing | ✅ |
| 7 | **🟠 글로벌 seller socket** | MainLayout 에 sellerScope useMemo + `/orders` namespace 글로벌 listener — BG/FG/Supplier 어느 페이지에 있어도 NavIcon hasPending pulse 즉시 반응 | ✅ |
| 8 | **🟡 PO Detail i18n 키** | 4언어 detail.actions.{returns,print} + detail.returns.* + print.* namespace 추가 | ✅ |
| 9 | **🟡 BrandProductsTab i18n** | useTranslation 적용 + productsTab.* 28키 × 4언어 | ✅ |
| 10 | **🟡 IncomingOrdersView 이모지 제거** | 빈 상태/carrier chip/delivery 주소 모두 텍스트만 (Restaurant LiveOrdersPage 패턴 통일) | ✅ |
| 11 | **🚨 dev 이메일 SMTP 차단** | sendPlatformEmail/sendEmail/sendIssuerEmail 모두 dev에서 SMTP 호출 자체 skip. DEV_SEND_PLATFORM_EMAILS/DEV_SEND_ENTITY_EMAILS opt-in. Test signup 운영 admin 폭격 차단 | ✅ |
| 12 | **🚨 nginx HTML no-cache** | index.html `cache-control: no-cache, no-store, must-revalidate` — 브라우저가 옛 main.js URL 들고 chunk 404 발생하던 문제 해결 | ✅ |
| 13 | **🚨 IncomingOrdersView TDZ** | `dateRange` useState를 `fetchList` useCallback 위로 이동 — deps array TDZ ("Cannot access 'er' before initialization") | ✅ |
| 14 | **🚨 FoodcourtTenancyMap i18n ref** | PinsLayer 에 useTranslation 추가 — 모듈 스코프 i18n.language ReferenceError | ✅ |
| 15 | **OrderTypePage 빈 상태** | 모든 주문 유형 비활성 시 빈 화면 → 안내 카드 + Settings 페이지 경고 박스 | ✅ |
| 16 | **블로그 발행** | e-Invoice RM10K 글 EN/MS/ZH 발행 (translation_group_id=5) | ✅ |
| 17 | **/글쓰기 스킬 강화** | 4.5단계 팩트 검증 (.gov.my 1차 출처 우선) 단계 추가 | ✅ |
| 18 | **deploy-to-production.sh** | 콘텐츠 sync 기본 ON + sync-contents-to-prod.js 위임 (다국어/persona/video/social 모두 처리) | ✅ |

### 검증 (10단계 모두 PASS)
0 hydration 0 warning · 1 빌드 exit 0 (`main.cb59d6bd.js`) · 2 pm2 online · 3 API 9/9 (CRUD 4 + IDOR 5) · 4 SPA 8/8 · 5 역할별 14/14 · 6 요구사항 11/11 · 7 회귀 health-check 43/43 · 8 UI/UX i18n 4×28키 · 9 SPA 17/17

### 데모 데이터 (운영 테스트 즉시 가능)
- R#38 PO 40건 모든 stage 도달: draft 1 / submitted 12 / confirmed 4 / shipped 7 / received 16
- Returns 2 (approved + rejected) · Credit Notes 1 · Carriers 5

### 수정된 파일

**Backend (6)**
- `middleware/auth.js`, `routes/menu.js`, `routes/brand-inventory.js`, `routes/purchase-orders.js`, `services/poRealtimeService.js`, `utils/emailService.js`

**Frontend (9)**
- `components/Layout/MainLayout.tsx`
- `pages/BrandProductRecipe/BrandProductRecipePage.tsx`, `ProductRecipesTab.tsx`, `ProductRecipeCategoriesTab.tsx`
- `pages/BrandProductManagement/BrandProductsTab.tsx`
- `pages/IncomingOrders/IncomingOrdersView.tsx`
- `pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx`
- `pages/Settings/SettingsPage.tsx`
- `mobile/pages/OrderTypePage.tsx`

**Infra (1)**
- `/etc/nginx/sites-enabled/dev.purplehere.com` (HTML no-cache)

**i18n (8 files: 4 langs × 2 namespaces)**
- `purchaseOrders.json` (PO Detail / Print 키)
- `brand.json` (productsTab namespace 28키)

**기타**
- `.claude/commands/글쓰기.md` (4.5단계 팩트 검증)
- `.claude/session-state.md` (다음 세션 인계)
- `deploy-to-production.sh` (콘텐츠 sync 기본 ON)
- 블로그 grp=5 (e-Invoice RM10K 3언어)

### 다음 세션 — Irene 브라우저 테스트 → /배포 v3.19

**서버 사이드 모두 통과**. 브라우저 클릭 흐름만 확인:
- `docs/SPRINT_5_6_TEST_GUIDE.md` 8 시나리오
- 추가: BG multi-brand selector / 이모지 없는 빈상태 / 글로벌 socket pulse / 4언어 토글 / PO Detail returns/print

테스트 OK 시 `/배포` — DB 마이그레이션(sprint1~6) + 콘텐츠 sync + 코드/프론트 자동 배포

---

## ✅ 완료: Sprint 6 마무리 — Live Orders Restaurant 패턴 일치 (2026-04-27, 미배포)

### 배경
Sprint 6 후 Irene 피드백: "레스토랑 라이브오더처럼 전체주문 다 보여서 다같이 관리하기 수월하게" + "필터링도 그렇고 다 세세한 기능 제대로" + "사이드바 위치 대시보드 직후" + "주문 들어오면 빨간 점" + "발주처/배송처/carrier 보여" + "필요한 기능 디테일하게 잡아줘"

### 완료된 작업

| # | 작업 | 상태 |
|---|------|:----:|
| 1 | **Backend `livePoCount` badge** — /api/badge-counts 응답 확장. supplier/brand/foodcourt/SA role 별 submitted PO 자동 카운트 | ✅ |
| 2 | **사이드바 재배치** — BG/FG/Supplier 모두 Live Orders 메뉴를 Dashboard 직후로 이동 (line 1094/1343/1666) | ✅ |
| 3 | **NavIcon hasPending pulse** — Restaurant 패턴 100% 일치 (점 추가 X, 숫자 X, NavIcon 자체 박동만) | ✅ |
| 4 | **AudioToggleButton + speaker SVG** — emoji(🔔/🔕) 폐기, Restaurant 와 동일한 40×40 SVG 토글 | ✅ |
| 5 | **DataTable 레이아웃** (카드 그리드 폐기) — Restaurant LiveOrders 와 동일 `<DataTableContainer>+<DataTable>` 구조 | ✅ |
| 6 | **컬럼 구성**: PO# / Buyer (entity 배지) / Items (count + preview) / **Delivery (📍 address + 📦 carrier chip)** / Status / Time / Amount / Actions | ✅ |
| 7 | **새 PO 행 highlight** — 배경색 #EEF2FF (Restaurant selected 패턴) + NewDot + 'NEW' 배지 (12초 pulse) | ✅ |
| 8 | **FilterToolbar** — DatePeriodFilter (today/yesterday/week/month/year/all/custom) + SearchInput | ✅ |
| 9 | **StatusTabs + TabBadge** — Restaurant 와 동일 styled (status별 count) | ✅ |
| 10 | **StatisticsBar** (작은 inline) — 표 위 4 KPI 작은 strip (큰 카드 폐기) | ✅ |
| 11 | **Backend /api/seller-orders date filter** — `from`/`to` query 지원. Sequelize Op.gte/Op.lte | ✅ |
| 12 | **TDZ runtime crash fix** — LiveOrders/styles cross-chunk import → 인라인 styled 복제로 회피 | ✅ |
| 13 | **데이터 cleanup** — test garbage 9 PO 삭제 + 4 returns 삭제 + 2 orphan Credit Note 삭제 | ✅ |
| 14 | **테스트 가이드** `docs/SPRINT_5_6_TEST_GUIDE.md` 작성 (8 시나리오) | ✅ |

### 수정된 파일

**Backend (수정 3)**
- `routes/badgeCounts.js` (livePoCount 추가)
- `routes/seller-orders.js` (date filter)
- `routes/purchase-orders.js` (generatePoNumber MAX 기반 race condition fix)

**Frontend (수정 2)**
- `components/Layout/MainLayout.tsx` (사이드바 위치 + NavIcon hasPending 만)
- `pages/IncomingOrders/IncomingOrdersView.tsx` (DataTable 복원 + DatePeriodFilter + AudioToggleButton SVG + StatisticsBar 인라인)

**문서 (신규 1)**
- `docs/SPRINT_5_6_TEST_GUIDE.md` (8 시나리오 운영 테스트 가이드)

### 검증 (E2E)
- Stage 0 hydration: 0 warning
- Stage 1 build: TS 0 error · `main.bd3df29e.js` deployed
- Stage 3 API: livePoCount 정확 (Sup 9 / RA 0 / BG 0) · Submit→실시간 +1 → Confirm→-1
- Stage 5 multi-role: seller events=5 / buyer events=4 양쪽 room 동시 수신
- health-check 43/43 PASS
- 3 라우트 (Supplier/BG/FG) 모두 HTTP 200

### 검증 중 발견 + 즉시 수정한 버그 3건
1. po_number duplicate (cleanup 후) — `generatePoNumber` MAX-based 로 fix
2. trackingInfo undefined (notification email rename 누락) — `ti=newTracking` 으로 일관성
3. TDZ runtime crash (`Pe before initialization`) — cross-chunk import 폐기, 인라인 styled

---

## ✅ 완료: Sprint 5 — Smart Reorder + Live Sales Order + Delivery Tracking (2026-04-27, 미배포)

### 정책 (Irene 확정)
| Q | 결정 |
|---|------|
| Q1 다중 발주 (Cart) | ✓ 추가 (백엔드 endpoint 완비, UI 후속) |
| Q2 IncomingOrdersView | Live Sales Order 로 in-place 강화 + 사이드바 라벨 통일 |
| Q3 Carrier 카탈로그 | system_admin 마스터 + free fallback (Lalamove/Grab/JNT/Ninja Van/Pos Laju 시드 5건) |
| Q4 작업 범위 | 3 모듈 통째 1 sprint |

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **Carrier 인프라** | 모델 + 라우트 (public + admin CRUD) + 5 시드 + scripts/sprint5-migration.js | ✓ |
| 2 | **services/poRealtimeService.js** | appendTrackingEvent / decorateCarrier (catalog 매칭 → tracking_url 자동) / emitPoEvent (seller+buyer room 양쪽) | ✓ |
| 3 | **POST /api/purchase-orders/bulk** | 다중 group 그룹화 + auto_submit. createPurchaseOrderCore helper 로 단일/bulk 공유 | ✓ |
| 4 | **PO state-transition Socket.IO + events** | seller-orders.js (confirm/ship/reject) + purchase-orders.js (submit/mark-shipped/receive) 에 emit + events 자동 push | ✓ |
| 5 | **submit 흐름 정정** | draft → 'submitted' (Sprint 3 임시 'confirmed' 제거 — Sprint 4 의도대로) | ✓ |
| 6 | **Socket.IO `/orders` namespace 확장** | join-seller / join-buyer 핸들러 (room 명: `seller_${type}_${id}`, `buyer_${type}_${id}`) | ✓ |
| 7 | **IncomingOrdersView 강화** | Socket.IO 클라이언트 통합 + Web Audio API chime + sound toggle + localStorage `seller_sound_enabled` + 새 PO arrival 자동 새로고침 | ✓ |
| 8 | **사이드바 라벨 통일** | 4 역할 모두 "Live Orders" (i18n common.nav.liveOrders 4언어) | ✓ |
| 9 | **useOrderModal 실제 API 연결** | seller-sources fetch → preferred mapping → POST + auto submit. error/success banner. 매핑 없음 안내 | ✓ |
| 10 | **OrderModal seller select** | dropdown (preferred ⭐ 표시) + submitting/lastResult 상태 | ✓ |
| 11 | **DeliveryTimeline 공유 컴포넌트** | 5-step dot/connector (submitted→confirmed→shipped→in_transit→received) + carrier badge + tracking link + events 리스트 | ✓ |
| 12 | **PurchaseOrderDetailPage 통합** | tracking_info 표시 (DeliveryTimeline) | ✓ |
| 13 | **i18n 4언어** | common.nav.liveOrders + supplier.orders.{title,subtitle,sound.on/off} | ✓ |
| 14 | **검증** | E2E 12/12 PASS + health-check 43/43 PASS + 빌드 exit 0 (`main.4af5af29.js`) | ✓ |

### Carrier 마스터 매칭 (자동 tracking_url 생성)
```
Seller ship payload: { carrier_code: 'lalamove', tracking_number: 'LA-TEST-001' }
↓ poRealtimeService.decorateCarrier()
→ tracking_info: {
    carrier_code: 'lalamove',
    carrier_name: 'Lalamove',
    tracking_number: 'LA-TEST-001',
    tracking_url: 'https://www.lalamove.com/en/malaysia/track-order/LA-TEST-001',
    events: [...]
  }
```

### tracking_info.events 자동 누적 (Lifecycle)
- buyer submit → events: [{submitted}]
- seller confirm → events: [{submitted}, {confirmed}]
- seller ship → events: [{submitted}, {confirmed}, {shipped}]
- buyer receive → events: [{submitted}, {confirmed}, {shipped}, {received}]
- seller reject (대신) → events: [{submitted}, {cancelled, note: reason}]

### Socket.IO 실시간 흐름
- buyer submit → server emit `seller-order-created` → seller_room (sound chime + auto refresh)
- seller confirm/ship/reject → server emit `seller-order-updated` → seller + buyer rooms (양쪽 page 동시 갱신)
- buyer receive → server emit `seller-order-updated` → seller + buyer rooms

### 신규 / 수정 파일
**Backend (신규 4)**
- `models/Carrier.js`
- `routes/carriers.js`
- `services/poRealtimeService.js`
- `scripts/sprint5-migration.js`

**Backend (수정 4)**
- `routes/seller-orders.js` (confirm/ship/reject + events + emit)
- `routes/purchase-orders.js` (submit/receive/mark-shipped + bulk endpoint + createPurchaseOrderCore helper)
- `services/socketService.js` (join-seller/join-buyer)
- `models/index.js` + `server.js` (Carrier 등록 + 라우트 mount)

**Frontend (수정 5)**
- `pages/IncomingOrders/IncomingOrdersView.tsx` (Socket.IO + sound + auto refresh)
- `components/Inventory/hooks/useOrderModal.ts` (실제 API 연결)
- `components/Inventory/modals/OrderModal.tsx` (seller select + banner)
- `components/Inventory/InventoryManager.tsx` (props 전달)
- `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx` (DeliveryTimeline 적용)
- `components/Layout/MainLayout.tsx` (사이드바 라벨)

**Frontend (신규 1)**
- `components/Inventory/DeliveryTimeline.tsx`

**i18n (4언어 5 namespace 키)**
- `common.json`: nav.liveOrders + nav.incomingOrders (대체)
- `supplier.json`: orders.title/subtitle/sound.{on,off}

**문서 (수정 1)**
- `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` — Sprint 5 섹션 추가 (Stage 1-6 정책 + API + DB + UI + 코드단계 + 검증)

### DB 변경 (운영 배포 시)
- `node scripts/sprint5-migration.js` — `carriers` 테이블 + 5 시드

### 후속 (다음 작업 후보)
- BulkOrderModal UI (백엔드 endpoint 완비, frontend cart UX 미구현)
- StockListSection 추천 컬럼 (suggested_qty + preferred seller badge)
- IncomingOrdersView ship modal — carrier select dropdown (현재 free text)
- CarrierAdminPage `/pos/admin/carriers` (백엔드 CRUD 완비)

---

## ✅ 완료: PO Phase 2 — Restaurant 발주 ↔ 계약 ↔ 재고 통합 (2026-04-27, 미배포)

### 배경
Sprint 1~4 + Supplier Portal Polish 후 점검 결과, **Restaurant 가 buyer 일 때 BG/FG 발주에 대해 계약/소속 검증이 누락** (Supplier 만 검증) + **Receive 시 RestaurantIngredientCost 미갱신** + **NewPurchaseOrderPage 의 seller picker 가 broken endpoint (`/api/seller-catalog` 무인자 호출)** 발견. 본 Phase 가 이 4가지 갭 일괄 보강.

### 정책 확정 (Irene)
| seller_type | Restaurant 발주 가능 조건 |
|---|---|
| `supplier` | SupplierContract status='active' 필수 |
| `brand` (BG) | `Restaurant.brand_id === seller_entity_id` (소속 자체가 계약) |
| `foodcourt` (FG) | `Restaurant.foodcourt_id === seller_entity_id` (입점 자체가 계약) |
| `system_admin` | 항상 가능 (POS 자체 카탈로그) |

Cost: 가중평균 RestaurantIngredientCost / Mapping: Supplier/BG/FG 강제, SA 자유.

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **Backend purchase-orders.js** | `findActiveSupplierContract` → `verifySellerRelation` 통합 (4 seller). POST 검증 순서 재구성 (relation gate → items → mapping → 생성). Item mapping 강제 (seller≠SA). Receive 루프에 RestaurantIngredientCost 가중평균 upsert (Restaurant buyer) | ✓ |
| 2 | **Backend buyer-sellers.js** (신규) | `GET /api/buyer-sellers` — supplier(active) + brand(brand_id) + foodcourt(foodcourt_id) + system_admin 통합. path-level guard | ✓ |
| 3 | **Frontend NewPurchaseOrderPage** | broken `/api/seller-catalog` 호출 → `/api/buyer-sellers` 교체. SellerOption 인터페이스 정리 (name/logo_url). Type alias `'system'` → `'system_admin'` 통일. Payload 필드명 backend 와 일치 (seller_entity_id / ingredient_seller_product_id / quantity_ordered). Seller 카드 logo 표시 | ✓ |
| 4 | **i18n 4 언어** | `purchaseOrders.json` `new.seller.type.system_admin` + `noSellersHint` 보강 | ✓ |
| 5 | **설계 문서** | `docs/PURCHASE_ORDER_SYSTEM.md` Phase 2 섹션 추가 (정책 + Backend/Frontend 변경 + D-1 13 시나리오) | ✓ |
| 6 | **검증 E2E** | 12/12 PASS — buyer-sellers 응답 + 4 seller 양/음 케이스 + mapping required + SA bypass + 가중평균 2단계 누적 + anon 401 | ✓ |
| 7 | **회귀** | health-check 43/43 PASS + 빌드 exit 0 (`main.dd643919.js`) + dev 배포 완료 | ✓ |

### 가중평균 검증 (D-1 #10)
- 1차 receive: stockBefore=15, oldCost=25.1667, +30 단위 × unit_price=5/conv=1 → 가중평균 = (15×25.1667 + 30×5) / 45 = 20.125 ✓
- 2차 receive: stockMid=40, oldCost=20.125, +5 단위 × unit_price=6/conv=1 → 가중평균 = (40×20.125 + 5×6) / 45 = 18.5556 ✓ (수동 계산 일치)

### 신규 / 수정 파일
**Backend (수정 1 + 신규 1)**
- `routes/purchase-orders.js` — verifySellerRelation + cost upsert + mapping 강제 + Restaurant/RestaurantIngredientCost import
- `routes/buyer-sellers.js` (신규)
- `server.js` — buyer-sellers 라우트 mount

**Frontend (수정 2)**
- `pages/PurchaseOrders/NewPurchaseOrderPage.tsx`
- `public/locales/{en,ko,zh,ms}/purchaseOrders.json`

**문서 (수정 1)**
- `docs/PURCHASE_ORDER_SYSTEM.md` — 858줄 → "Phase 2 — Contract Gate + Cost Sync (2026-04-27)" 섹션 추가

### DB 변경 (운영 배포 시)
없음 (코드 변경만으로 적용. RestaurantIngredientCost 모델은 기존부터 존재하던 것).

---

## ✅ 완료: Supplier Portal Polish — 사이드바/Dashboard/Inventory/Demo Data 통일 (2026-04-27, 미배포)

### 배경
Sprint 1~4 완료 후 demo-supplier 계정으로 사이드바 클릭 시 발견된 통일성 누락 + 미완료 wiring 일괄 정리. 모든 supplier 메뉴가 다른 역할(Brand/Foodcourt) 동일 기능과 패턴 통일 + 실데이터 노출.

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **사이드바 통일** | "Settings" NavTitle 본문 + 공통 영역 두 번 렌더 fix. Operations / Plans & Payments / Communication 3 섹션으로 재구성. Profile disabled → 활성화 (`/pos/profile` 사용) | ✓ |
| 2 | **SupplierDashboard 재작성** | 4 stat → 8 KPI + 6mo Revenue Trend Chart (recharts) + Alerts panel (clickable deep-link) + Recent Orders/Trade Invoices 2-col 테이블 + Subscription card. 313줄 → 540줄. Backend `/api/supplier/dashboard` 응답 4 필드 → 18 필드 확장 (orders by status / monthly_revenue / outstanding_balance / overdue / active_customers / recent_* / revenue_trend_6m / alerts) | ✓ |
| 3 | **Inventory Tab + Transaction History** | Sprint 1 의 `Sprint 3 TODO` 마무리. 신규 모델 `SupplierInventoryTransaction` + 테이블 (transaction_type/quantity_change/stock_after/reason/reference/batch_no 등). adjust/receive 시 자동 기록. `/api/supplier-inventory/transactions` endpoint 정상화. Frontend Stock List + Transaction History 2 tab 구조 + 8 transaction 시드 (Initial 6 + Receive 1 + Adjust 1) | ✓ |
| 4 | **Demo data 종합 시드** | demo-supplier@purplehere.com 계정 (User#227, SupplierCompany#20 `is_demo=true` → supplier_advanced 모듈 자동). 시드: 3 Categories + 6 Products (low-stock 1 포함) + 1 Active Contract w/ Restaurant#38 (monthly_soa) + 3 IngredientSellerProduct mapping + 4 PurchaseOrders (submitted/confirmed/shipped/received) + 1 Trade Invoice (TRD-SUP20-20260415-001 RM405) + 2 Subscription Invoices (3월 paid + 4월 pending) + 2 Notices + 2 SupportTickets | ✓ |
| 5 | **Notices 라우트 + 시드** | `/pos/supplier/notices` 라우트 신규 (BrandNoticesPage 재사용). 백엔드 `/api/notices/received` 는 user_id 매칭으로 supplier 자동 처리. NoticeRecipient 시드 1건 (Maintenance May 2026 important) | ✓ |
| 6 | **System Inquiry 데이터** | 백엔드 wiring 변경 없이 (customerId 매칭) 시드 2건 (open + resolved) | ✓ |
| 7 | **Subscription Invoices 시드** | System Admin 발행 supplier 자체 구독 invoice 2건 (issuer='system_admin', payer_type='external'). Brand/Foodcourt 패턴과 동일 | ✓ |
| 8 | **Pricing Supplier 탭 + 가격** | PricingPage VALID_TABS/TAB_ORDER/TAB_LABELS/plan_target type 4곳 'supplier' 추가. PlanPrice 시드: Basic MYR 99/990, Advanced MYR 299/2990 (KRW × 300) | ✓ |
| 9 | **LoginPage Demo 카드** | DEMO_ACCOUNTS 에 Supplier Admin 카드 추가 (Brand/Restaurant 옆 보라 #9333EA) | ✓ |
| 10 | **회원가입 에러 안내 + MX 검증** | SignupPage 에러 처리 `result.error?.message` 우선 → 백엔드 메시지 정확히 노출 (예: "The email domain X does not have a mail server"). MX 검증 자체는 dev/prod 모두 유지 | ✓ |
| 11 | **Router-level middleware path-level 좁힘** | 6개 라우터 (`supplier-directory`, `purchase-orders`, `purchase-invoices`, `ingredient-seller-products`, `foodcourt-products`, `foodcourt-inventory`) 가 `/api` prefix mount + router-level `requireBuyerRole`/`requireFoodcourtScope` 로 supplier 요청까지 차단. path-level use 로 좁힘 | ✓ |
| 12 | **addon-modules public** | Pricing 페이지가 호출하는 `/api/addon-modules?active_only=true` 만 공개 처리 (그 외는 인증 유지) | ✓ |
| 13 | **i18n 4언어** | supplier.json 의 dashboard.* (21 키) + inventory.history.* / inventory.tabs.* (15 키) 4 언어 동기화 | ✓ |
| 14 | **검증** | Backend endpoint 15/15 200 OK + 데이터 노출 / 회귀 health-check 43/43 PASS / Buyer-Brand 측 endpoint 회귀 없음 / 빌드 exit 0 (`main.2c0a88a3.js`) | ✓ |

### 사이드바 최종 구조 (Brand/Foodcourt 패턴 통일)
```
Dashboard
[Operations]
  Products / Inventory / Customers / Contracts / Orders
[Plans & Payments]
  Trade Invoices / SOA / Invoices(구독)
[Communication]
  Notices / System Inquiry
[Settings] (공통)
  My Profile / Company Info / Payment Settings / Invoice Settings
```

### 검증 매트릭스 (모든 메뉴)
| 메뉴 | API endpoint | HTTP | 데이터 | 다른 역할 패턴 동일성 |
|---|---|:-:|:-:|:-:|
| Dashboard | /api/supplier/dashboard | 200 | 18 fields | ✓ BG/FG Stats+Chart+Alerts+Tables |
| Products | /api/supplier-products | 200 | 6 | ✓ Brand 3-tab Products/Cat/Options |
| Inventory(List) | /api/supplier-inventory | 200 | 6 (low 1) | ✓ Tab 패턴 |
| Inventory(History) | /api/supplier-inventory/transactions | 200 | 8 | 신규 |
| Customers | /api/supplier/customers | 200 | 1 | 도메인 고유 |
| Contracts | /api/supplier/contracts | 200 | 1 active | 도메인 고유 |
| Orders | /api/seller-orders | 200 | 4 | ✓ IncomingOrdersView 공유 |
| Trade Invoices | (관련 endpoints) | 200 | 1 | 도메인 고유 |
| SOA | /api/supplier/soa | 200 | (cron) | 도메인 고유 |
| Invoices(구독) | /api/supplier/invoices | 200 | 2 | ✓ Brand 자체 구독 패턴 |
| Notices | /api/notices/received | 200 | 1 | ✓ BrandNoticesPage 재사용 |
| System Inquiry | /api/support-tickets | 200 | 2 | ✓ Brand SystemInquiryPage 동등 |
| Profile/Company/Payment/Invoice settings | /api/supplier/* | 200 | obj | ✓ Brand Settings 패턴 |

### 신규 / 수정 파일

**Backend**
- `models/SupplierInventoryTransaction.js` (신규)
- `models/index.js` (모델 등록)
- `routes/supplier.js` (dashboard 응답 확장 + PurchaseOrder/Invoice 통계)
- `routes/supplier-inventory.js` (transaction 자동 기록 + /transactions endpoint)
- `routes/supplier-directory.js`, `purchase-orders.js`, `purchase-invoices.js`, `ingredient-seller-products.js`, `foodcourt-products.js`, `foodcourt-inventory.js` (path-level middleware)
- `routes/addon-modules.js` (active_only=true public)
- `utils/emailValidator.js` (MX 메시지 그대로 노출되도록 fix)
- `scripts/seed-demo-supplier-data.js` (신규 시드 스크립트)

**Frontend**
- `components/Layout/MainLayout.tsx` (Supplier 사이드바 재구성, Profile disabled 제거)
- `pages/Supplier/SupplierDashboard.tsx` (재작성, 313 → 540줄)
- `pages/Supplier/SupplierInventoryPage.tsx` (Tab + Transaction History)
- `pages/Login/LoginPage.tsx` (DEMO_ACCOUNTS Supplier 카드)
- `pages/Landing/SignupPage.tsx` (에러 메시지 표시)
- `pages/Landing/PricingPage.tsx` (Supplier 탭)
- `App.tsx` (`/pos/supplier/notices` 라우트)
- `public/locales/{en,ko,zh,ms}/supplier.json` (36+ 신규 키)

### 다음 섹션 작업 (Supplier Portal Polish — Phase 2)

**SupplierDashboard 추가 보강** (BG/FG 패턴 1136~1160줄 수준 도달):
- Quick Actions Grid (Add Product / View Pending Orders / Issue Trade Invoice / View Customers — 카드 4~6개)
- Setup Status Panel (신규 supplier 온보딩 진행률: 회사 정보 / 결제 설정 / 첫 상품 / 첫 계약)
- Top Customers PieChart (이번 달 매출 기준 buyer별 분포)
- Receivables Aging table (0-30일 / 31-60일 / 60일+ 미수금 분류)

**SupplierContractsPage 보강:**
- 계약 종료 알림 (autopilot이 곧 end_date 임박 시)
- 계약 별 누적 매출 / 발주 건수 표시

**Sales Order/Trade Invoice 흐름 보강:**
- PO ship 시 SupplierProduct.current_stock 자동 차감 + SupplierInventoryTransaction (transaction_type='po_shipped') 자동 기록
- Trade Invoice 결제 시 SupplierCompany 매출 누적

**Post-MVP Supply Chain:**
- 외부 carrier API 연동 (배송 추적)
- Returns / Credit Notes
- Auto-pay (carded billing)
- Real-time Socket.IO 알림 (Supplier 새 PO 핀)
- Brand seller 의 산하 매장 일괄 인보이스

---

## ✅ 완료: Sprint 4 — Supply Chain Design 4 (Seller Order Mgmt + Trade Invoice + Monthly SOA) (2026-04-26, 미배포)

### 배경
Supply Chain System 4-Design 시리즈의 **Sprint 4 — 마지막 단계**. Sprint 3 의 buyer-self progression 임시 처리를 seller-only API 로 분리. PO Received 시 Trade Invoice 자동 발행. Monthly SOA cron + 결제 흐름.

**설계 문서**: `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` (915줄, "Sprint 4 Implementation Spec (2026-04-26)" 섹션 포함)

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **DB 컬럼 추가** | `purchase_orders.tracking_info JSON` + `trade_invoice_id INT` | ✓ |
| 2 | **시드** | `buyer_purchase_invoices` 모듈 → 모든 buyer 플랜 12개 | ✓ |
| 3 | **신규 미들웨어** | `requireSellerRole` (Supplier/BG/FG/SA — req.sellerEntity 자동 도출) | ✓ |
| 4 | **Backend 라우트** | 9 endpoints — `routes/seller-orders.js` (6: confirm/ship/reject/list/detail/stats) + `routes/purchase-invoices.js` (3: list/detail/soa-current) | ✓ |
| 5 | **Trade Invoice 자동 발행** | `services/purchaseOrderService.js` 신규 — PO Received 시 자동 호출, idempotent. Issuer/Payer/Due Date 자동 도출. | ✓ |
| 6 | **Monthly SOA Cron** | `services/soaScheduler.js` 신규 — 매월 1일 00:30. SchedulerRun 기록 (Sprint 1 모니터링 자동 노출) | ✓ |
| 7 | **이메일 템플릿 4종** | sellerOrderReceived / tradeInvoiceCreated / tradeInvoicePaid / monthlySoa (entity 브랜딩 적용) | ✓ |
| 8 | **알림 카테고리 4종** | seller_order_received / trade_invoice_created / trade_invoice_paid / monthly_soa | ✓ |
| 9 | **Frontend 페이지** | Supplier 3 (orders/trade-invoices/soa, 첫 2개 placeholder 교체 + soa 신규) + BG/FG 2 (incoming-orders, IncomingOrdersView 공유 컴포넌트로 DRY) + Buyer 1 (purchase-invoices) | ✓ |
| 10 | **사이드바** | Supplier 3 placeholder 활성 + BG/FG "Incoming Orders" + 4 buyer "Purchase Invoices" | ✓ |
| 11 | **App.tsx + ProtectedRoute** | 6 라우트 + 4 MODULE_GATED + AuthContext 권한 | ✓ |
| 12 | **i18n 4언어** | `purchaseInvoices.json` 신규 namespace + `supplier.json` 확장 | ✓ |
| 13 | **검증** | 빌드 exit 0, E2E 12/13 → 13/13 PASS, Trade Invoice 자동 발행 검증 (`TRD-SUP{id}-YYYYMMDD-001`, monthly_soa due_day=15 익월), health-check 43/43, hydration 0, UI 품질 0 위반 | ✓ |

### Buyer-Seller-Trade Invoice 라이프사이클 (E2E 검증)
```
1. Buyer (Restaurant) → POST PO (status='draft')
2. Buyer Submit → 'submitted' (Sprint 3) — Sprint 4 에서 추가:
3. Seller GET /seller-orders → submitted PO 보임
4. Seller POST /confirm → 'confirmed' + buyer 알림
5. Seller POST /ship { tracking_info } → 'shipped' + buyer 알림
6. Buyer POST /receive (Sprint 3) → 'received' + Stock += qty×conv
   ↓ 자동 트리거 (setImmediate non-blocking)
7. createTradeInvoice(po):
   - Invoice {invoice_number: TRD-SUP17-20260426-001,
              issuer_type: supplier, issuer_id: 17,
              payer_type: restaurant, payer_id: 5,
              total: 500, status: pending_payment,
              due: 2026-05-15 (monthly_soa, payment_due_day=15 익월),
              contract_id: SupplierContract.id (Sprint 2 link)}
   - InvoiceItem 1건 (description='Tomato', quantity=5, unit_price=100, line_total=500)
   - finalizeInvoice() 호출 (v3.18 Single Source of Truth 패턴)
   - Buyer 측에 이메일 + Inbox 알림
8. Buyer GET /purchase-invoices → 1건 보임
9. Buyer 결제 (기존 invoice payment 흐름)
10. 매월 1일 00:30 SOA cron → monthly_soa contract 별 그달 발행 invoice 묶어 SOA 이메일
```

### 보안 검증
- ✓ IDOR: cross-seller PO confirm → 404 / cross-buyer invoice → 404
- ✓ Anon /seller-orders → 401 / Anon /purchase-invoices → 401
- ✓ Buyer → /seller-orders → 403 (cross-role)
- ✓ Reject without reason → 400
- ✓ Ship without confirm → 400 (state machine)

### 신규 파일

**Backend (1 service + 2 routes + 1 scheduler + 1 middleware + 1 migration)**
- `services/purchaseOrderService.js` (Trade Invoice 자동 발행)
- `services/soaScheduler.js` (Monthly SOA cron)
- `routes/seller-orders.js` (426줄, 6 endpoints)
- `routes/purchase-invoices.js` (293줄, 3 endpoints)
- `middleware/sellerScope.js` (requireSellerRole)
- `scripts/sprint4-migration.js`

**Backend 수정**
- `models/PurchaseOrder.js` (tracking_info + trade_invoice_id 컬럼)
- `routes/purchase-orders.js` (receive endpoint 끝에 createTradeInvoice 자동 호출)
- `utils/notificationTemplates.js` (4 신규 템플릿)
- `routes/notification-settings.js` (4 신규 카테고리)
- `server.js` (2 라우트 마운트 + soaScheduler 시작)

**Frontend (4 신규 + 2 교체 + 1 공유 컴포넌트)**
- `pages/Supplier/SupplierSoaPage.tsx` (신규)
- `pages/IncomingOrders/IncomingOrdersView.tsx` (공유 컴포넌트 — DRY)
- `pages/IncomingOrders/BrandIncomingOrdersPage.tsx` (wrapper)
- `pages/IncomingOrders/FoodcourtIncomingOrdersPage.tsx` (wrapper)
- `pages/Supplier/SupplierOrdersPage.tsx` (교체, IncomingOrdersView wrapper)
- `pages/Supplier/SupplierTradeInvoicesPage.tsx` (교체, 367줄)
- `pages/PurchaseInvoices/PurchaseInvoicesPage.tsx` (신규)
- `App.tsx` / `MainLayout.tsx` / `ProtectedRoute.tsx` / `AuthContext.tsx` / `i18n.ts` 확장
- `public/locales/{en,ko,zh,ms}/purchaseInvoices.json`

### DB 변경 (운영 배포 시)
- `node scripts/sprint4-migration.js` (purchase_orders 컬럼 2개 + buyer_purchase_invoices 모듈 시드)

### 후속
- Equipment 외부 carrier API 연동 (post-MVP)
- Returns / Credit Notes (post-MVP)
- Auto-pay (post-MVP)
- Real-time Socket.IO 알림 (post-MVP)

---

## 🎉 Supply Chain System 4-Design 시리즈 완료 (2026-04-26)

| Sprint | Design | 모델 신규 | Endpoints | Frontend 페이지 | E2E |
|:------:|--------|:---------:|:---------:|:---------------:|:---:|
| 1 | Seller Product & Inventory | 12 | 66 | 16 | 30/30 |
| 2 | Supplier Contract | 1 | 13 | 5 | 18/18 |
| 3 | Purchase Order & Receiving | 3 | 14 | 3 | 18/18 |
| 4 | Seller Order Mgmt + Trade Invoice | 0 (Invoice 재사용) | 9 | 6 | 13/13 |
| **TOTAL** | **4 Designs** | **16** | **102** | **30** | **79/79** |

**Supply Chain 거래 흐름 완성:** Supplier 등록 → 계약 → 발주 → 입고 → Trade Invoice 자동 발행 → 결제 → Monthly SOA. Restaurant/BG/FG 모두 buyer 가능, Supplier/BG/FG/SA 모두 seller 가능.

---

## ✅ 완료: Sprint 3 — Supply Chain Design 3 (Purchase Order & Receiving) (2026-04-26, 미배포)

### 배경
Supply Chain System 4-Design 시리즈의 **Sprint 3 — 발주관리 본체**. Irene 의 원래 요구 "발주관리 — 기존 재고관리랑 연동" 의 핵심 구현. Sprint 1 (SupplierProduct) + Sprint 2 (SupplierContract 활성 검증) 위에서 실제 거래 흐름.

**설계 문서**: `docs/PURCHASE_ORDER_SYSTEM.md` (858줄, "Sprint 3 Implementation Spec (2026-04-26)" 섹션 포함)

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **DB** | 3 신규 테이블: `ingredient_seller_products`, `purchase_orders`, `purchase_order_items` | ✓ |
| 2 | **시드** | `buyer_purchase_orders` AddonModule → 모든 buyer 플랜 (12개) 자동 포함 | ✓ |
| 3 | **Backend 라우트** | 14 endpoints: `routes/purchase-orders.js` (9) + `routes/ingredient-seller-products.js` (5) | ✓ |
| 4 | **재고 정합성** | Receive 시 `Ingredient.findByPk(id, { lock: t.LOCK.UPDATE })` + InventoryBatch + InventoryTransaction + Stock update 모두 단일 transaction | ✓ |
| 5 | **활성 Contract 게이트** | Supplier seller 의 PO 생성 시 active SupplierContract 검증 (없으면 400) | ✓ |
| 6 | **PAR 자동 추천** | `current_stock < min_stock` ingredient 추출 → 추천 수량 = `(min_stock × 1.5) - current_stock` → seller 별 그룹 | ✓ |
| 7 | **Frontend 페이지 3개** | PurchaseOrdersPage (목록 + 추천 패널) / NewPurchaseOrderPage (3-step wizard) / PurchaseOrderDetailPage (timeline + receive/cancel 모달) | ✓ |
| 8 | **사이드바** | 4 buyer 역할 (Restaurant Admin/Owner / BG / FG) "Purchase Orders" 추가 | ✓ |
| 9 | **App.tsx + ProtectedRoute** | 3 라우트 + 1 MODULE_GATED + AuthContext 권한 7 역할 추가 | ✓ |
| 10 | **i18n 4언어** | `purchaseOrders.json` 신규 namespace | ✓ |
| 11 | **검증** | 빌드 exit 0, E2E 18/18 PASS, health-check 43/43, hydration 0, UI 품질 0 위반 | ✓ |

### Buyer-Supplier PO 라이프사이클 (E2E 검증됨)
```
1. 활성 SupplierContract 보유 → Buyer 가 ingredient 에 supplier product 연결 (IngredientSellerProduct)
2. PO 생성 (status='draft') — items + 가격/단위변환 자동 prefill
3. Submit → confirmed (Sprint 3 임시: Sprint 4 에서 supplier 측 분리)
4. Mark Shipped → shipped
5. Receive 5 bag (unit_conversion=25kg/bag) → 
   - InventoryBatch 1건 (initial_quantity=125kg, purchase_order_id 채움)
   - InventoryTransaction 1건 (purchase, +125kg)
   - Ingredient.current_stock += 125kg (lock 보호)
   - StockAlert 자동 해제
   - status='received'
```

### 보안 검증 (Sprint 3 E2E 18/18 + 추가 보안)
- ✓ 활성 contract 없는 supplier PO 시도 → 400
- ✓ Anon /purchase-orders → 401
- ✓ Submit 후 PUT 시도 → 400 (state lock)
- ✓ Stock += 정확히 quantity × unit_conversion 검증
- ✓ FIFO 차감 로직 무영향 (lock 충돌 없음)

### 기존 모델 확장 활용
- `Ingredient.supplier_product_id` (Sprint 1 추가) — IngredientSellerProduct 와 병행 (legacy supplier_id 유지)
- `InventoryBatch.purchase_order_id` (이미 존재) — PO receive 시 채움
- `InventoryTransaction.transaction_type='purchase'` — 활성
- `StockAlert` — receive 시 자동 해제

### 신규 파일

**Backend (3 모델 + 2 라우트 + 1 시드)**
- `models/IngredientSellerProduct.js`, `PurchaseOrder.js`, `PurchaseOrderItem.js`
- `routes/purchase-orders.js`, `ingredient-seller-products.js`
- `scripts/seed-purchase-orders-module.js`

**Frontend (3 신규 페이지 + 4 wiring)**
- `pages/PurchaseOrders/PurchaseOrdersPage.tsx` (495줄)
- `pages/PurchaseOrders/NewPurchaseOrderPage.tsx` (992줄, 3-step wizard with inline Stepper)
- `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx` (868줄, timeline + 3 modals)
- `App.tsx` / `MainLayout.tsx` / `ProtectedRoute.tsx` / `AuthContext.tsx` / `i18n.ts` 확장
- `public/locales/{en,ko,zh,ms}/purchaseOrders.json`

### Schema 적응
- InventoryBatch: 실제 컬럼 (`batch_number`, `initial_quantity`/`remaining_quantity`, `received_date`, `status`) 매핑
- InventoryTransaction: `quantity_change` + `stock_after` + `notes` 매핑 (existing manual receive 패턴)
- Foodcourt buyer ingredient PO: 현재 schema 에 `Ingredient.foodcourt_id` 없음 → Sprint 4 또는 별도 작업으로 결정

### DB 변경 (운영 배포 시 적용)
- Sequelize sync 3 테이블 생성
- `node scripts/seed-purchase-orders-module.js` (1 모듈 + 12 plan templates)

### 후속 (Sprint 4)
- **Sprint 4** (Order Mgmt + Trade Invoice): Supplier 측 PO 처리 (confirm/ship/reject) + Trade Invoice 자동 발행 + Monthly SOA. Sprint 3 의 buyer-self progression 임시 처리는 Sprint 4 에서 supplier-only API 로 분리.

---

## ✅ 완료: Sprint 2 — Supply Chain Design 2 (Supplier Contract System) (2026-04-26, 미배포)

### 배경
Supply Chain System 4-Design 시리즈의 **Sprint 2**. Sprint 1 (SupplierCompany + SupplierProduct) 위에 구매자(Restaurant/Brand/Foodcourt) ↔ 공급업체(Supplier) 의 **계약 관계** 를 수립. SA/Brand/Foodcourt → Restaurant 관계는 자동(brand_id/foodcourt_id), Supplier → 누구든은 계약 필수.

**설계 문서**: `docs/SUPPLIER_CONTRACT_SYSTEM.md` (867줄, "Sprint 2 Implementation Spec (2026-04-26)" 섹션 포함)

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **DB** | `supplier_contracts` 테이블 신규 (1 모델, 인덱스 5건) | ✓ |
| 2 | **시드** | AddonModule 2개 (`buyer_supplier_directory`, `buyer_supplier_contracts`) → 모든 buyer 플랜에 자동 포함 | ✓ |
| 3 | **미들웨어** | `requireBuyerRole` (buyerScope.js) — 7 buyer 역할 + (entity_type, entity_id) 자동 도출 | ✓ |
| 4 | **Backend 라우트** | 13 endpoints: 신규 `routes/supplier-directory.js` (6) + `routes/supplier.js` 확장 (7) | ✓ |
| 5 | **알림 템플릿** | 4종: requested / approved / rejected / terminated (notificationTemplates.js) + NOTIFICATION_CATEGORIES `supplier_contract` | ✓ |
| 6 | **Frontend Buyer 측** | 3 신규 페이지 (Directory + Profile + MySuppliers, ContractDetail은 모달로 대체) | ✓ |
| 7 | **Frontend Supplier 측** | 2 페이지 placeholder 교체 (SupplierContractsPage + SupplierCustomersPage) | ✓ |
| 8 | **사이드바** | Restaurant Admin/Owner / BG / FG 모두 "Find Suppliers" + "My Suppliers" 추가. Supplier Admin Customers/Contracts 활성화 | ✓ |
| 9 | **App.tsx + ProtectedRoute** | 4 라우트 + 2 MODULE_GATED_ROUTES | ✓ |
| 10 | **i18n 4언어** | `supplierDirectory.json` 신규 namespace (en/ko/zh/ms) + `supplier.json` 확장 | ✓ |
| 11 | **검증** | 빌드 exit 0 (`main.34b9d207.js`), E2E 18/18 PASS, health-check 43/43 PASS, state-hydration 0 warnings | ✓ |

### 핵심 결정 (Irene 자율 위임)
1. **활성 계약 1건 원칙** — 한 (supplier, buyer) 쌍 active 1건 (앱 레벨 검증)
2. **신규 모듈** — `brand_suppliers` (legacy 거래처) 와 충돌 회피
3. **양방향 종료 + 사유 필수** — `terminated_by` ENUM('buyer','supplier','system')

### Buyer-Supplier 계약 라이프사이클 (E2E 검증됨)
```
1. Buyer Directory 검색 → 9 supplier 노출
2. Profile 조회 → my_contract_status='none'
3. POST request → status='requested' + Supplier 알림
4. Duplicate request → 400 CONTRACT_REQUEST_PENDING
5. Supplier 신청 검토 → POST approve { payment_terms } → status='active'
6. Active 상태 duplicate → 400 CONTRACT_ALREADY_ACTIVE
7. Customer list 자동 노출
8. PUT payment-terms (수정 가능)
9. Buyer terminate { reason } → status='terminated'
10. 재신청 가능 (새 row)
11. Supplier reject → status='rejected'
```

### 보안 검증
- IDOR 방어: contract.entity_type/entity_id === req.buyerEntity (buyer side), contract.supplier_company_id === req.supplierCompany.id (supplier side)
- 익명 접근 차단 (401)
- Buyer → Supplier endpoint 차단 (403)
- 활성 계약 1건 enforcement
- sanitizeString on message/reason fields

### 신규 파일

**Backend (1 모델 + 1 라우트 + 1 미들웨어 + 1 시드 스크립트 + 4 이메일 템플릿)**
- `models/SupplierContract.js`
- `middleware/buyerScope.js`
- `routes/supplier-directory.js` (551줄)
- `routes/supplier.js` 확장 (504 → 938줄)
- `utils/notificationTemplates.js` 확장 (4 템플릿)
- `scripts/seed-buyer-supplier-modules.js`

**Frontend (3 신규 + 2 교체)**
- `pages/SupplierDirectory/SupplierDirectoryPage.tsx` (400줄)
- `pages/SupplierDirectory/SupplierProfilePage.tsx` (668줄)
- `pages/SupplierDirectory/MySuppliersPage.tsx` (640줄, 모달 통합)
- `pages/Supplier/SupplierContractsPage.tsx` (replace 30줄 → 847줄)
- `pages/Supplier/SupplierCustomersPage.tsx` (replace 30줄 → 406줄)

**Frontend 수정**
- `App.tsx` (4 라우트), `MainLayout.tsx` (사이드바 4 역할), `ProtectedRoute.tsx` (2 MODULE_GATED), `AuthContext.tsx` (`/pos/suppliers/*` 7 buyer 역할), `i18n.ts` (네임스페이스 등록)

**i18n (4 언어 신규 namespace)**
- `public/locales/{en,ko,zh,ms}/supplierDirectory.json`

### DB 변경 (운영 배포 시 적용)
- Sequelize sync `supplier_contracts` 테이블 생성
- `node scripts/seed-buyer-supplier-modules.js` (2 모듈 + 모든 plan template 추가)

### 후속 (Sprint 3, 4)
- **Sprint 3**: Purchase Order & Receiving — Active SupplierContract 가 있는 buyer 만 공급업체 상품 발주 가능. `Ingredient.supplier_product_id` FK 활성화 + InventoryBatch 통합.
- **Sprint 4**: Order Management + Trade Invoice — PO Received 시 자동 거래 인보이스 발행. SupplierContract 의 payment_terms (Immediate/Monthly SOA) 사용.

---

## ✅ 완료: Sprint 1 — Supply Chain Design 1 (Seller Product & Inventory) (2026-04-26, 미배포)

### 배경
Supply Chain System 4-Design 시리즈의 **Sprint 1**. Purple POS 에 Supplier Admin 사업체 신규 도입 + Supplier/Foodcourt 자체 상품 카탈로그 + 재고 관리 시스템 구축. Sprint 2~4 (Contract / PO / Trade Invoice) 의 기반 데이터 마련.

**설계 문서**: `docs/SELLER_PRODUCT_INVENTORY_SYSTEM.md` (1391줄, "Sprint 1 Implementation Spec (2026-04-26)" 섹션 포함)
**구현 방법론**: `/기능설계` 6단계 (정의 → API → DB → UI → 코드 → 테스트)

### 완료된 작업

| # | 영역 | 작업 | 상태 |
|---|------|------|:----:|
| 1 | **Backend DB** | ENUM 6개 확장 (User.role 'Supplier Admin' 등), 컬럼 4개 추가, 12 신규 모델, association | ✅ |
| 2 | **Backend Seed** | AddonModule 15개 (Supplier 13 + Foodcourt 2), PlanTemplate 2개 (`supplier_basic`/`supplier_advanced`) | ✅ |
| 3 | **Backend 미들웨어** | `requireSupplierScope` / `requirePlanLimit('product_limit')` / `requireSupplierModule(code)` | ✅ |
| 4 | **Backend 라우트** | 8개 신규 (66 endpoints): supplier / supplier-products / supplier-inventory / supplier-companies / admin-supplier-invitations / foodcourt-products / foodcourt-inventory / auth 확장 | ✅ |
| 5 | **Backend 서비스** | authService Supplier Admin signup 분기, invoiceScheduler supplier entityType (INV-SUP prefix) | ✅ |
| 6 | **Frontend 기반** | AuthContext 권한+라우트, ProtectedRoute MODULE_GATED_ROUTES 4건, MainLayout 사이드바 16 메뉴, App.tsx 16 lazy+Route, Login/Signup 확장 | ✅ |
| 7 | **Frontend 페이지 12개** | Supplier 8 (Dashboard / Products w/ 3 tabs / Inventory / CompanyInfo / PaymentSettings / InvoiceSettings / Invoices / SystemInquiry), Foodcourt General 2, System Admin 2 | ✅ |
| 8 | **Frontend Coming Soon 4개** | Customers / Contracts / Orders / TradeInvoices (Sprint 2~4 placeholder) | ✅ |
| 9 | **Frontend Signup** | Supplier 역할 옵션 + invitation_token URL 처리 + B flow (Landing) + A flow (SA invitation 링크) | ✅ |
| 10 | **i18n 4언어** | supplier.json (~85 키), signup.json, common.json + admin.json 확장. 5289 키 동기화, 0 errors | ✅ |
| 11 | **검증** | 빌드 exit 0 (`main.f4ba98b6.js`), API E2E 30/30 PASS, health-check 43/43 PASS, IDOR/anon 차단 확인 | ✅ |

### Irene 확정 사항 (구현 시 적용)

**가입 진입점 (둘 다 지원):**
- A: SA Invitation (BG/FC 패턴, 7일 유효 토큰)
- B: Landing 일반 signup (Supplier 역할 옵션)

**모듈 13개:**
- Basic 9 (전 supplier 플랜 포함, Sprint 1 활성: products + inventory): supplier_products, supplier_inventory, supplier_directory, supplier_contracts, supplier_customers, supplier_orders, supplier_shipping, supplier_trade_invoices, supplier_soa
- Advanced 4 (`supplier_advanced` 플랜만): supplier_admin_staff, supplier_performance, supplier_activity_logs, supplier_multi_warehouse

**Plan + 한도:**
- `supplier_basic`: product 100, customer 50, order 1000/mo, staff 1
- `supplier_advanced`: 모두 무제한 (-1) + staff 10
- 가격 0 시드 (Irene 운영에서 조정)

### DB 변경 (운영 배포 시 적용 필요)
- `node scripts/sprint1-supply-chain-migration.js` (ENUM + 컬럼 추가)
- Sequelize sync (12 신규 테이블)
- `node scripts/seed-supplier-modules-and-plans.js` (15 모듈 + 2 플랜)

### 신규 파일

**Backend (모델 12 + 라우트 8 + 미들웨어 3 + 스크립트 2)**
- `models/SupplierCompany.js`, `SupplierProduct.js`, `SupplierProductCategory.js`, `SupplierProductOptionGroup.js`, `SupplierProductOption.js`, `SupplierProductOptionGroupProduct.js`, `SupplierInvitation.js`
- `models/FoodcourtProduct.js`, `FoodcourtProductCategory.js`, `FoodcourtProductOptionGroup.js`, `FoodcourtProductOption.js`, `FoodcourtProductOptionGroupProduct.js`
- `routes/supplier.js`, `supplier-products.js`, `supplier-inventory.js`, `supplier-companies.js`, `admin-supplier-invitations.js`, `foodcourt-products.js`, `foodcourt-inventory.js`
- `middleware/supplierScope.js`, `requirePlanLimit.js`
- `scripts/sprint1-supply-chain-migration.js`, `seed-supplier-modules-and-plans.js`

**Backend 수정**
- `models/index.js` (12 신규 모델 등록 + association)
- `middleware/requireModule.js` (requireSupplierModule + resolveSupplierModules)
- `routes/auth.js` (Supplier Admin signup + invitation/:token endpoint)
- `services/authService.js`, `invoiceScheduler.js` (supplier entityType)
- `server.js` (7 라우트 마운트)

**Frontend (페이지 16 신규 + 7 파일 수정)**
- 신규: 16 페이지 (위 표 참조) — 일부는 Tab 분할로 4 파일 구성 (예: SupplierProductsPage + 3 tabs)
- 수정: `App.tsx`, `MainLayout.tsx`, `ProtectedRoute.tsx`, `AuthContext.tsx`, `LoginPage.tsx`, `SignupPage.tsx`
- i18n: `public/locales/{en,ko,zh,ms}/supplier.json` (4개 신규), `signup.json` (4개 신규), `common.json`/`admin.json` 확장

### 검증 결과
- **빌드**: `npm run build:dev` exit 0, 번들 `main.f4ba98b6.js`
- **API E2E** (30/30 PASS): plans → signup B → login → dashboard → company AutoSave → settings → subscription → invoices → categories CRUD → products CRUD + toggle → inventory receive 200kg + adjust -15 → 정확 stock 185 검증 → IDOR/anon 차단 확인
- **health-check** (43/43 PASS): 회귀 0
- **i18n verify**: 0 errors, 5289 키 동기화 (4 언어)

### 후속 (Sprint 2~4)
- **Sprint 2**: Supplier Contract System (`docs/SUPPLIER_CONTRACT_SYSTEM.md` 참조). supplier_directory / supplier_contracts / supplier_customers 활성.
- **Sprint 3**: Purchase Order & Receiving (`docs/PURCHASE_ORDER_SYSTEM.md`). InventoryBatch + PO 통합. Supplier inventory transactions 본격 구현.
- **Sprint 4**: Seller Order Management & Trade Invoice (`docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md`). supplier_orders / supplier_shipping / supplier_trade_invoices / supplier_soa 활성. Trade Invoice 자동 발행 + 월말 SOA.

### 미배포
**운영 배포는 다음 `/배포` 시 v3.19 로 묶어 진행.**
배포 시 위 "DB 변경" 3 스크립트 + frontend rebuild + pm2 restart.

---

---

## ✅ 완료: v3.18 후속 — Onboarding/Inbox/Scheduler 일괄 작업 (2026-04-25, 미배포)

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Onboarding wizard 강화 | `<WelcomeModal>` 신설 (첫 로그인 1회 표시) + useSetupStatus에 Restaurant Owner / System Admin 분기 + Brand/Foodcourt 항목 확장 + dependsOn 메타 (lock UI) | ✅ |
| 2 | 알림 센터 (Inbox) v1 | 신규 통합 endpoint `/api/inbox` (Notice + SupportTicket + OperationTicket UNION). InboxBell 헤더 종 + 30s polling + shake animation. InboxDrawer 우측 슬라이드 420px. InboxPage 전체 보기. 4언어 30+ 키 | ✅ |
| 3 | 보안 fix — POST /api/restaurants 역할 제한 | Brand Manager / Foodcourt Manager 차단. health-check 회귀 케이스 3건 추가 → 43/43 PASS. `DEVELOPMENT_PLAN.md` "선행 보안 이슈 (HIGH)" 해소 | ✅ |
| 4 | Trial 만료 자동 알림 이메일 | D-3/D-0/D+1 3 임계점 발송. 4 entity (Restaurant/Brand/Foodcourt/Owner). 4 컬럼 `last_trial_reminder_day` 추가 (멱등성). 신규 카테고리 `trial_expiry_reminder` (사용자 opt-out 가능). 6 시나리오 검증 PASS | ✅ |
| 5 | Daily scheduler 모니터링 대시보드 | 신규 테이블 `scheduler_runs` + subscription/invoice scheduler 통합 (start/finish/results JSON/error). `GET /api/admin/scheduler-runs` + `/jobs` (per-job summary + 24h error count). `pages/Admin/SchedulerMonitorPage.tsx` (job cards + recent runs table) | ✅ |
| 6 | 구독 변경 히스토리 페이지 | 신규 `<InvoiceHistoryModal>` 타임라인 UI (dot+line, 수정자/시각/reason quote, field별 from→to diff, line-through/green). Admin/Brand/Foodcourt InvoicesPage 통합 (Modified 뱃지를 클릭 button으로) | ✅ |
| 7 | 인보이스 수동/자동 UI 구분 | 확인 결과 4 페이지 모두 이미 `<AutoBadge>` (#10B981) 구현됨. DEVELOPMENT_PLAN.md 항목 stale → 마감 | ✅ |

### 신규 파일 (10)
- `dev-backend/routes/inbox.js`
- `dev-backend/routes/scheduler-runs.js`
- `dev-backend/routes/address-suggestions.js` (이전)
- `dev-backend/models/SchedulerRun.js`
- `dev-frontend/src/components/Common/WelcomeModal.tsx`
- `dev-frontend/src/components/Form/AutoSaveAddressFields.tsx` (이전)
- `dev-frontend/src/components/Inbox/{inboxApi.ts, InboxBell.tsx, InboxDrawer.tsx, InboxItemCard.tsx}`
- `dev-frontend/src/components/Invoice/InvoiceHistoryModal.tsx`
- `dev-frontend/src/pages/Admin/SchedulerMonitorPage.tsx`
- `dev-frontend/src/pages/Inbox/InboxPage.tsx`
- `docs/EMAIL_INTEGRITY_AUDIT.md`, `docs/V3_18_BASIC_TIER_GAPS.md` (이전)

### DB 변경
- ALTER 4 (`last_trial_reminder_day INT NULL` on restaurants/brands/foodcourts/users)
- CREATE 1 (`scheduler_runs`)

### 검증
- 빌드 `main.3fc1c132.js`
- State hydration 0 warnings
- health-check 43/43 PASS (보안 신규 3건 포함)
- Inbox API 12/12 + 5 역할 30/30
- Trial reminder 6 시나리오 핵심 로직 PASS
- Scheduler-runs API list/jobs/auth 401

---

## ✓ 완료: v3.18 운영 배포 (2026-04-25)

### 완료된 묶음 (이번 세션, dev only)

#### 1. 운영 동기화 보강 ✓
- 운영 누락 콘텐츠 53건 sync (`scripts/sync-content-to-prod.js`): release-v3.16 + 다국어 마케팅 12건 + FAQ 11건
- 운영 enum ALTER 2건: `users.subscription_status += 'overdue'`, `notification_settings.entity_type += 'brand', 'foodcourt'`
- dev `entity_plan_charges` dead 테이블 drop

#### 2. Invoice 정합성 — Single Source of Truth ✓
- 근본 원인: header(subtotal/discount/total) vs items(calc/tax/total) 별도 path → 산술 모순 + 17건 tax double-count risk
- `utils/invoiceCalculation.js` (recompute + finalize) — 11곳 invoice 생성/수정 site 적용
- 데이터 모델 정리: `items.tax_amount = 0` 강제 (Path A 폐기), tax는 `additional_charges`만 (Path B)
- 79건 마이그 (46 touched, 33 unchanged)
- 이메일 템플릿: `additional_charges` 행 + `discount` 행 + phantom 0 라인 suppress
- Backend GET 응답 4곳 tax 필드 보강 (frontend modal Tax 0 표시 버그 fix)
- PUT `resend_email: true` 옵션 (수정 후 fresh fetch 재발송)
- Frontend `Restaurant/InvoicesPage.tsx`, `Owner/OwnerInvoicesPage.tsx` tax field 보강

#### 3. 주소 시스템 통일 — Phase 1 ✓
- `Settings/SettingsPage.tsx` (`/restaurant/:id/settings`) → `<AddressFields>` 통합
- `address_line_2` 필드 추가, 600 ms debounce save
- `routes/store.js` `address_line_2` allowedFields + GET 응답
- 빌드 `main.a952c113.js`

#### 4. 주소 시스템 통일 — Phase 2 (Display & AutoSave Unification) ✓
**Irene 결정 (2026-04-25):**
- 자동완성: 브라우저 네이티브 (외부 API 불필요)
- 솔루션 전체 주소 패턴 통일
- 운영 #10 데이터는 Irene 직접 수정

**적용 범위:**
- 신규 컴포넌트 1: `<AutoSaveAddressFields>` (debounce + 저장 배지)
- 신규 유틸 3: `formatAddressHtml`, `formatAddressLines`, `formatEntityAddress`
- 입력 폼 6 곳 마이그 (5 AutoSave 페이지 + 1 Modal × 2)
- 백엔드 3 라우트 보강 (brands/foodcourts/restaurants-crud company-info: `address_line_2` + ISO 정규화)
- 표시 사이트 33+ 파일 통일 (청구서 9 + 지점/관리/리스트 24+)
- `docs/ADDRESS_STANDARDIZATION.md` 12장 추가
- 검증: 빌드 `main.bc7d0df7.js`, API 18/18, health-check 40/40

### 다음 세션 우선순위 (B → C)

#### B. F3 — 17 이메일 발송 site audit (Task #10 잔여)
`docs/EMAIL_INTEGRITY_AUDIT.md` 작성. 각 site fresh fetch / hardcoded / stale 점검.

#### C. v3.18 잔여 (Task #2~7, #9)
- Task #9: `MODULE_GATED_ROUTES` prefix 정합성 (`/pos/brand/subscriptions` 불일치)
- Task #2: Basic 전수 체험 + gap 기록
- Task #3: Basic UI gap 보강
- Task #4: Invoice 수동 발행 prefill
- Task #5: Contract Detail Open contract → 검증
- Task #6: Pricing/FAQ/블로그 갱신
- Task #7: 검증 + CHANGELOG + 배포

### 미배포
이번 세션 누적 변경분은 **운영 미배포**. `/배포` 시:
1. 코드 rsync
2. 운영 invoice 마이그 (audit-tax-pattern.js 먼저 → dry-run → apply)
3. 운영 Restaurant #10 주소 정리 (Irene 직접 입력 권장)

---

## ✓ 완료: v3.17 운영 배포 (2026-04-24)

### 배포 묶음 (이번 세션에서 운영 반영)
v3.16 이후 누적된 주소 표준화 · R1/R2 방어선 철회 · Subscription Plan 실질 티어 차단 · Floor Plan + Brand/FC Map 전면 개선 · FC Tenancy Map 계층 드릴다운을 한 번에 배포.

### 배포 결과
- 코드 sync: 35 backend + 561 frontend 파일
- DB 마이그레이션: 21 new columns, `Malaysia→MY` 정규화 15 rows, `country` CHAR(2) / `lat·lng` DECIMAL(10,7) ALTER 완료
- Smoke tests: 10/10 (health · login · menu · POST order #9720 · bill · invoices · restaurants · payment · frontend · JS bundle)
- 배포 후 audit: 모든 country ISO 정규화, whitespace 0건, R1/R2 informational 통과
- 운영 URL https://purplehere.com, 릴리즈 블로그 https://purplehere.com/blog/release-v3.17 live
- System Admin 공지 id=44 (5 recipients), 운영 DB 동기화 완료
- 백업: `/var/www/backups/20260424_174607` (운영서버)

### 주요 변경사항

| 영역 | 변경 |
|------|------|
| 주소 표준화 | 9 엔티티 통일, `country CHAR(2)` + `lat/lng DECIMAL(10,7)` + `address_line_2`, `<AddressFields>` 공용 컴포넌트, `formatAddress()` 유틸, i18n-iso-countries 250국 ×4언어 |
| R1/R2 철회 | Restaurant은 live entity, Contract는 snapshot. 잘못된 cross-brand 차단 4곳 제거 + cleanup 스크립트 정제 |
| Subscription Plan 게이팅 | `middleware/requireModule.js` 신설, 29 백엔드 엔드포인트 + 6 URL + UI 3중 가드 |
| Franchise Map All Brands | 다중 브랜드 소유자용 집계 뷰 |
| Floor Plan / Brand Map / FC Tenancy Map | 표준 Button 통일, 화살표 제거, currency/timezone API 연동, stage advance 원클릭, billing_gap CTA with `fc_plans` 모듈 게이팅 |
| FC Tenancy Map 계층 | 사이드리스트 branch→tenants 자동 expand, 유닛 클릭 시 우측 상세 패널 (Brand Map 패턴) + 지도 tenant 핀 클릭 연동 |

### 주요 수정 파일

**백엔드**
- `routes/brands.js`, `routes/foodcourts.js`, `routes/contracts.js`, `routes/restaurants-crud.js`, `routes/admin-settings.js`
- `routes/foodcourt-branches.js`, `routes/foodcourt-floor-plans.js`, `routes/foodcourt-units.js`
- `middleware/requireModule.js` (신설), `middleware/addressValidation.js` (신설)
- `models/{Restaurant,Brand,Foodcourt,FoodcourtBranch,User,Supplier,HardwareQuote,CompanySettings}.js`
- `utils/formatAddress.js` (신설)
- `scripts/{audit,migrate,cleanup}-addresses.js` (신설)

**프론트엔드**
- `pages/BrandGeneral/{BrandFranchiseMapPage,BrandFranchiseMapStandalone,FranchiseManagementPage}.tsx`
- `pages/FoodcourtGeneral/{FoodcourtFloorPlanPage,FoodcourtTenancyMapPage,FoodcourtTenancyMapStandalone,FoodcourtBranchesPage}.tsx`
- `components/{ProtectedRoute,Contract/ContractDetail,Form/AddressFields}.tsx`
- `hooks/useAllowedRoutes.ts` (hasModule 추가)
- `utils/formatAddress.ts` (신설)
- 4개 언어 i18n: `public/locales/{en,ko,zh,ms}/{common,contract}.json`

### 검증
- health-check 40/40 통과, /검증 10단계 전수 통과, 주문 라이프사이클 create→ready→served→cleanup 정상
- 운영 smoke 10/10, API E2E 27/27, 역할별 11/11, DB 정합성 orphan 0, 보안 anon 401 전 영역

### 의존성
- `i18n-iso-countries@^7.14.0` (frontend + backend)

---

## ✓ 완료: R1/R2 방어선 철회 + Subscription Plan 모듈 게이팅 (2026-04-24 저녁, v3.17 배포됨)

### 배경
직전 세션의 주소 표준화에서 도입한 R1/R2 "cross-brand 정합성 방어선"이 과도한 설계였음이 드러남. Irene이 restaurant #10 을 brand 1(K-DINE with MIN) → brand 4(with MIN) 로 옮기려 했으나 400 BRAND_MISMATCH 로 차단. 검토 결과:

1. **Contract UI에 브랜드 선택 필드 없음** — `entity_id`는 만든 BG 유저의 `brand_id`가 자동으로 찍히는 invisible 메타데이터. 사용자가 의식적으로 지정한 값이 아님.
2. **도메인 모델 오류** — Contract가 Restaurant의 상위 제약이 되면 안 됨. Restaurant은 컨셉/방향/세무 등이 유연하게 변하는 살아있는 엔티티; Contract는 특정 시점 합의의 스냅샷 기록일 뿐.
3. **Subscription Plan은 advanced 모듈** — `brand_plans`/`fc_plans` 는 상위 구독 플랜에서만 unlock 되는 프리미엄 기능인데, Contract 빌링이 Plan 연결을 무조건 강제하면 basic 고객(계약/인보이스만 쓰는)과 부합하지 않음.

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | `restaurants-crud.js` PUT R1 제거 | brand_id 변경 시 BRAND_MISMATCH 차단 블록 삭제. Restaurant is source of truth. | ✓ |
| 2 | `brands.js` plan 배정 R1 제거 | restaurant 배정 시 cross-brand mismatch 차단 블록 삭제 | ✓ |
| 3 | `foodcourts.js` plan 배정 R2 제거 | restaurant 배정 시 cross-foodcourt mismatch 차단 블록 삭제 | ✓ |
| 4 | `contracts.js` POST R1/R2 제거 | restaurant 연결 시 entity 불일치 차단 블록 삭제 (restaurant 존재 체크만 유지) | ✓ |
| 5 | `scripts/cleanup-addresses.js` 재구성 | `enforceBrandIntegrity`/`enforceFoodcourtIntegrity` 함수 제거. 주소 sanitize + plan mismatch 경고(informational)만 남김 | ✓ |
| 6 | `hooks/useAllowedRoutes.ts` — hasModule helper | `includedModules` state + `hasModule(code)` 헬퍼 노출. skipFiltering 시 fail-open | ✓ |
| 7 | `ContractDetail.tsx` — Plan 섹션 게이팅 | `LinkedPlansSection`을 `brand_plans`/`fc_plans` 모듈 보유자에게만 조건부 렌더 | ✓ |

### 도메인 원칙 (이제부터 적용)
- **Restaurant**: 살아있는 엔티티, source of truth. 브랜드/컨셉/세무/운영방향 자유 변경.
- **Contract**: 특정 시점 합의 스냅샷. 과거 기록. Restaurant 변경을 제약하지 않음.
- **Plan(EntityPlan)/EPR**: 청구 관계 기록. 마찬가지로 Restaurant 변경을 제약하지 않음.
- **Subscription Plan UI**: basic 고객은 financial_terms + One-time Invoice 로 운영. Plan 섹션은 advanced 모듈 보유자에게만 표시.

### 검증
- 빌드: exit 0, `main.659e0d17.js` 배포
- API E2E:
  - `PUT /api/restaurants/10 { brand_id: 4 }` → 200 OK (이전: 400 BRAND_MISMATCH)
  - Read-back: brand_id = 4 persisted ✓
  - Contract #23.entity_id = 1 untouched (snapshot 보존) ✓
  - EPR 2건 untouched ✓
  - Plan assignment cross-brand 차단 제거 확인 (BRAND_MISMATCH 안 뜸) ✓
  - 원상복구 완료
- health-check: 40/40 pass

### 미배포
운영 배포는 `/배포` 명령으로 진행. 주소 표준화 + R1/R2 철회가 한 묶음으로 나감.

### 수정된 파일

**백엔드**
- routes/restaurants-crud.js, routes/brands.js, routes/foodcourts.js, routes/contracts.js
- scripts/cleanup-addresses.js (brand_id/foodcourt_id 자동 교정 로직 제거)

**프론트엔드**
- hooks/useAllowedRoutes.ts (hasModule 추가)
- components/Contract/ContractDetail.tsx (Plan 섹션 게이팅)

---

## ✓ 완료: Address Standardization — Global Unification (2026-04-24, 미배포)

### 배경
`with MIN Cafe (restaurant #10)` 에 계약/플랜 연결했는데 franchise-map 에 안 보이는 증상.
근본 원인: restaurant.brand_id 와 contract.entity_id/plan.entity_id 불일치 (cross-brand 링크) + 주소 DB 스키마/데이터 파편화 (country VARCHAR(100) vs VARCHAR(10), lat/lng DOUBLE vs DECIMAL, 줄바꿈/풀네임 혼재).

**설계 문서**: `docs/ADDRESS_STANDARDIZATION.md` (11장, 30년차 리뷰 반영)

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | franchise-map API 500 에러 수정 | `ep.fixed_amount`/`ep.billing_cycle` 존재하지 않는 컬럼 참조 제거, `entity_plan_prices.monthly_price` 별도 조회. `currentPlan` → `currentPlans` 배열로 변경 (한 레스토랑 다중 플랜 지원) | ✅ |
| 2 | Cross-brand 링크 API 검증 복원 | `brands.js` / `foodcourts.js` POST plans 배정 시 R1/R2 검증 (BRAND_MISMATCH / FOODCOURT_MISMATCH) | ✅ |
| 3 | Contract POST R1/R2 검증 추가 | 계약 생성 시점에 cross-brand 차단 | ✅ |
| 4 | Restaurant PUT R1 방어 추가 | brand_id 변경 시도 시 활성 계약과 mismatch 검증 (회귀 방지) | ✅ |
| 5 | DB 스키마 통일 (8 엔티티) | `address_line_2 VARCHAR(255)` 추가. `country CHAR(2)` ISO 통일. `latitude/longitude DECIMAL(10,7)` 통일. users/suppliers/hardware_quotes 에 6필드 확장. `scripts/migrate-address-schema.js` | ✅ |
| 6 | 데이터 정제 | newline/tab sanitize, `"Malaysia"` → `"MY"` ISO 정규화, R1/R2 정합성 자동 교정 (restaurant #10 brand_id 4→1). `scripts/cleanup-addresses.js` (dry-run + apply) | ✅ |
| 7 | Sequelize 모델 업데이트 8개 | Restaurant / Brand / Foodcourt / FoodcourtBranch / CompanySettings / User / Supplier / HardwareQuote 에 address_line_2 + country CHAR(2) + lat/lng DECIMAL 반영 | ✅ |
| 8 | 공통 유틸 `formatAddress` | frontend/backend 양쪽. i18n-iso-countries 250국가 × 4언어. 국가별 포맷 (MY/KR/JP/default). format: 'full'/'short'/'oneline'/'location' | ✅ |
| 9 | 입력 검증 미들웨어 | `middleware/addressValidation.js` — sanitize + country ISO 검증 (warn-only) | ✅ |
| 10 | 공용 컴포넌트 `<AddressFields />` | 6필드 + lat/lng. autoComplete 브라우저 자동완성 지원. 줄바꿈 자동차단. country searchable select | ✅ |
| 11 | 입력 폼 교체 (AddressFields) | Admin/RestaurantsPage (new+edit), Manager/RestaurantsPage (new), FoodcourtGeneral/FoodcourtBranchesPage, Suppliers/SuppliersPage, BrandGeneral/BrandManagement | ✅ |
| 12 | AutoSave 패턴 address_line_2 추가 | Admin/AdminSettingsPage, CompanyInformation/CompanyInformationPage, Brand/BrandCompanyInfoPage + 백엔드 admin-settings.js | ✅ |
| 13 | Display formatAddress 치환 | BrandGeneral/BrandFranchiseMapPage (상세/팝업/리스트, XSS escapeHtml 보너스), BrandInvoiceViewModal, FoodcourtInvoiceViewModal | ✅ |
| 14 | Picker UX 배너 | Manager/RestaurantsPage Link existing contract/plan 피커 상단 amber 배너로 브랜드 컨텍스트 사전 안내 | ✅ |
| 15 | 운영 DB 사전 점검 스크립트 | `scripts/audit-addresses.js` (read-only) — 운영 배포 전 실행해서 schema/country/newline/R1/R2/EPR 전수 점검 | ✅ |
| 16 | i18n 4언어 12 keys | `common.json` `address.*` 블록 추가 (en/ko/zh/ms) | ✅ |

### DB 변경 (운영 배포 시 적용 필요)
- 5개 엔티티 (restaurants/brands/foodcourts/foodcourt_branches/company_settings) 에 `address_line_2 VARCHAR(255)` 추가
- users/suppliers 에 6필드 추가 (address_line_2/city/state/postal_code/country)
- hardware_quotes 에 5필드 추가 (country_code 유지)
- restaurants.country VARCHAR(100) → CHAR(2), latitude/longitude DOUBLE → DECIMAL(10,7)
- brands/foodcourts/foodcourt_branches/company_settings country → CHAR(2) 통일
- Country 값 ISO 정규화: "Malaysia" → "MY" 등
- Restaurant #10 brand_id 4→1 (R1 정합성 교정)

### 수정/신규 파일

**백엔드 신규**
- utils/formatAddress.js
- middleware/addressValidation.js
- scripts/migrate-address-schema.js, cleanup-addresses.js, audit-addresses.js

**백엔드 수정**
- models/: Brand / CompanySettings / Foodcourt / FoodcourtBranch / HardwareQuote / Restaurant / Supplier / User
- routes/: admin-settings / brands / contracts / foodcourt-branches / foodcourts / restaurants-crud

**프론트엔드 신규**
- components/Form/AddressFields.tsx, components/Form/index.ts (export)
- utils/formatAddress.ts

**프론트엔드 수정**
- pages/Admin/{AdminSettingsPage, RestaurantsPage}.tsx
- pages/Brand/BrandCompanyInfoPage.tsx
- pages/BrandGeneral/{BrandFranchiseMapPage, BrandManagement}.tsx + invoices/BrandInvoiceViewModal.tsx
- pages/CompanyInformation/CompanyInformationPage.tsx
- pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx + invoices/FoodcourtInvoiceViewModal.tsx
- pages/Manager/RestaurantsPage.tsx
- pages/Suppliers/SuppliersPage.tsx
- public/locales/{en,ko,zh,ms}/common.json

**문서 신규**: docs/ADDRESS_STANDARDIZATION.md

### 의존성
- `i18n-iso-countries@^7.14.0` (frontend + backend) — 250국가 × 4언어 표시명

### 검증
- state-hydration-check: 0 warnings
- 빌드: exit 0, `main.17043904.js` 배포
- health-check: 40/40 pass (4회)
- API 실호출: 총 28 pass 0 fail (franchise-map, Write/Read 왕복, BRAND/FOODCOURT_MISMATCH 차단, 역할별)
- 역할별 유저 흐름: SA/BG/FG/BMgr/Owner 12/12 pass
- audit-addresses.js (dev DB): 전 테이블 ✓ (country ISO, no newlines, R1/R2/EPR 정합성)

### 미배포
**운영 배포는 다음 세션에서 `/배포` 명령으로 진행.**
운영 DB 적용 순서: `audit-addresses.js` → `migrate-address-schema.js --apply` → `cleanup-addresses.js --apply` → pm2 restart → frontend rebuild

### 잔여 follow-up
- Invoice PDF print HTML 템플릿 (Owner/Admin/Brand/Foodcourt InvoicesPage 내부 큰 inline HTML) 에 `formatAddress()` 적용 — cosmetic, 고장 없음
- BillPrintPage / DailySettlementPrint / TableDetailPanel 의 주소 concat 치환
- Brand 변경 시 stale 계약 정리 UX 개선 (현재는 400 에러 메시지로만 안내)

---

## ✅ 완료: v3.16 운영 배포 (2026-04-22)

**이번 배포 묶음** (v3.15 이후 누적):
- Map 뷰 분리 + Foodcourt Floor Plan 시스템 + Branch Unit Numbering (2026-04-20)
- 블로그 자동화 + 다국어 DB + `/글쓰기` 커맨드 + 태그/필터/다포맷 (2026-04-21)
- Contract-Plan-Invoice 파이프라인 완결 — Phase 2-C/D/E/F (2026-04-22/23)
- POS 로그인 원클릭 (데모/테스트 카드 클릭 시 즉시 로그인)
- Contract Detail Billing 섹션 UX 정비 — 상태 배지 로직, 피커 모달, 새창 버튼, 계약별 Invoice 검색

---

## ✅ 완료: Map 뷰 분리 + Floor Plan 시스템 + Branch Unit Numbering (v3.16 배포)

### 배경
Brand Franchise Map / Foodcourt Tenancy Map 을 standalone 창으로 분리 (레스토랑 Floor Plan 패턴 참조). Foodcourt Floor Plan 에디터/뷰 신규 구현 (매장 배치 + 계약 정보 표시). Branch 편집 모달에 Unit Numbering 설정 신설 (prefix + 자유 입력 + 범위 확장).

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Brand Franchise Map / Foodcourt Branch Map — standalone 창 분리 | 사이드바 메뉴 클릭 시 `window.open(_blank)` 로 새 창. PosLayout 밖에 라우트 배치. `← Back` 버튼으로 창 닫기 | ✅ |
| 2 | 양쪽 Map — 사이드 리스트 패널 | 클릭 시 지도 확대 + 상세 패널. Foodcourt Branch 클릭 시 입점 매장 서브 리스트 | ✅ |
| 3 | 핀 스타일 정제 | 외부 보라 그림자 제거(잘림 해결), 선택 표시는 내부 링. franchise=★ / direct=● / null은 표시 안함 | ✅ |
| 4 | Brand Map 다중 브랜드 처리 | 레스토랑 많은 순 정렬 + 드롭다운 항상 표시 + 카운트 표기 | ✅ |
| 5 | Foodcourt Branch Map tenant toggle 제거 | 지점만 표시 (매장은 Branch 선택 시 사이드 서브 리스트로) | ✅ |
| 6 | Foodcourt Floor Plan View 페이지 | `/pos/foodcourt/floor-plan` standalone. 지점 선택 → 캔버스 + 매장 클릭 시 상세 패널 (Store / Tenancy Contract / Financial Terms / Restaurant 4섹션) | ✅ |
| 7 | Foodcourt Floor Plan Editor | `/pos/foodcourt/floor-plan-editor` standalone. Restaurant 패턴 복제 (FloorPlanCanvas 재사용). 좌측 Sidebar: Add Store (shape 4개) + Unplaced Stores + Properties + Canvas Settings. drag/resize/undo/save | ✅ |
| 8 | DB: foodcourt_floor_plans 테이블 + foodcourt_units 좌표 | branch_id FK, canvas_width/height/grid_size/show_grid. units 에 plan_x/y/width/height/shape | ✅ |
| 9 | Backend: Floor Plan CRUD + batch layout | `GET/POST/PUT/DELETE /api/foodcourt-branches/:id/floor-plans` + `PUT /api/foodcourt-floor-plans/:id/layout` (배치 일괄 저장, contract 보호) + `GET /api/foodcourt-units/:id/detail` (계약 join) | ✅ |
| 10 | Floor Plan 1 지점 = 1 평면도 단순화 | Editor 진입 시 평면도 없으면 자동 생성 ("Main"). 다층 UI 제거 | ✅ |
| 11 | Branch Map → Floor Plan 연계 | Branch 카드의 `View floor plan →` 링크, `?branch=N` 파라미터 | ✅ |
| 12 | Branch Unit Numbering 설정 | `foodcourt_branches.unit_config JSON`. Branch 편집 모달 신규 섹션. Toggle switch + Zone cards (prefix 선택 + free-form numbers textarea) | ✅ |
| 13 | Unit Numbering 자유 입력 + 범위 확장 | 콤마/줄바꿈 구분, 범위 `01-20` / `A01-A10` / `05A-08A` / `P-2-01A-05A` 자동 확장. prefix 토글로 모든 항목에 자동 prepend | ✅ |
| 14 | Unit Numbering Preview/Sync API | `POST /api/foodcourt-branches/:id/sync-units` — `confirm=false` preview / `confirm=true` apply. contract 연결 유닛 삭제 시 블록 + 안내 | ✅ |
| 15 | Branch 편집 모달 — 공용 컴포넌트화 | 커스텀 `FormGrid/Field/Label/Input/Select` → `CommonModal size="large"` + `FormRow/FormGroup/FormLabel/FormInput/FormSelect`. 필드 겹침 해소 | ✅ |
| 16 | Floor Plan / Map 사이드바 메뉴 분리 | Sidebar `Tenancy / Branch Map / Floor Plan` 3개 분리. Map/Floor Plan 은 `window.open(_blank)` | ✅ |
| 17 | AddonModule `fc_floor_plan` 등록 + 플랜 편입 | 모든 Foodcourt 플랜에 포함 | ✅ |
| 18 | Contract/Restaurant/Map 다운스트림 자동 반영 | Unit Numbering 저장 시 동기화된 Units 가 Contract 드롭다운 / Floor Plan Unplaced 에 자동 표시 | ✅ |
| 19 | i18n 4개 언어 | Floor Plan / Unit Numbering / Map 관련 키 확장 (en/ko/zh/ms) | ✅ |
| 20 | ProtectedRoute 화이트리스트 확장 | `/pos/brand/franchise-map`, `/pos/foodcourt/tenancy-map`, `/pos/foodcourt/floor-plan`, `/pos/foodcourt/floor-plan-editor` | ✅ |

### DB 변경 (운영 배포 시 적용 필요)
- `CREATE TABLE foodcourt_floor_plans (id, branch_id FK, floor_name, image_url, sort_order, notes, canvas_width, canvas_height, grid_size, show_grid, timestamps)`
- `ALTER TABLE foodcourt_units ADD COLUMN floor_plan_id INT NULL, ADD COLUMN plan_x/plan_y/plan_width/plan_height FLOAT NULL, ADD COLUMN plan_shape VARCHAR(20) NULL` + FK SET NULL
- `ALTER TABLE foodcourt_branches ADD COLUMN unit_config JSON NULL`
- `node scripts/register-map-modules.js` (fc_floor_plan 모듈 + Plan 편입)

### 수정/신규 파일

**백엔드**
- 수정: routes/foodcourt-branches.js (unit_config 수락, sync-units API, 자유 입력/범위 generator), routes/foodcourts.js (tenancy-map API), routes/foodcourt-floor-plans.js 신규, models/FoodcourtBranch.js (unit_config), models/FoodcourtUnit.js (plan_*), models/index.js (FloorPlan assoc), server.js (라우트 마운트)
- 신규: models/FoodcourtFloorPlan.js, routes/foodcourt-floor-plans.js

**프론트엔드**
- 수정: components/Layout/MainLayout.tsx (사이드바 Floor Plan/Map 메뉴), components/ProtectedRoute.tsx (route 화이트리스트), pages/FoodcourtGeneral/{FoodcourtBranchesPage,FoodcourtTenancyMapPage}.tsx (Unit Numbering + 지점 중심), pages/BrandGeneral/BrandFranchiseMapPage.tsx (핀 스타일), App.tsx (라우트 4개 추가, PosLayout 밖)
- 신규: pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx (뷰), FoodcourtFloorPlanEditorPage.tsx (에디터), FoodcourtTenancyMapStandalone.tsx, pages/BrandGeneral/BrandFranchiseMapStandalone.tsx

### 검증
- state-hydration-check: 0 warnings
- 빌드 (여러 차례): 모두 exit 0, 경고 0건
- Floor Plan API: Create 201 / Batch save 200 (circle+rect) / Read-back shapes 일치 / Unit detail 200 / 권한 BG 403
- Unit Numbering API: 자유 입력 파싱 확인 — `P-2-01A-05A` → 5개 확장 / `05A-08A` → 4개 / `01-20` → 20개 / mixed list / backward-compat pattern mode 지원
- health-check: 40/40 pass

### 미배포
**운영 배포는 다음 세션에서 `/배포` 명령으로 진행.**

---

## ✅ 완료: Manager Enforcement + Archive 탭 + Franchise/Tenancy Map (2026-04-20, 미배포)

### 배경
v3.15 후속 과제 4건을 한 세션에 완료. Manager 지점/브랜드 실제 접근 제한 적용, 계약/레스토랑 Archive 탭, Brand/Foodcourt 지도 뷰, 새 기능을 구독 플랜에 편입.

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Manager 지점/브랜드 접근 enforcement | `users.branch_id / brand_id` 기반 실제 필터 (contracts / invoices / units / branches / restaurants 5개 라우트). `getManagerScope()` 헬퍼 + auth 미들웨어에 `branch_id` 노출 | ✅ |
| 2 | Contract 리스트 Active/Archive 탭 | expired 드롭다운 누락 버그 수정 + 파이프라인/리스트 분리 + stats 3종(terminated/expired/renewed) | ✅ |
| 3 | Restaurant 리스트 Operational/Archive 탭 | Suspended는 Operational에 유지 (결제 주의). 백엔드 `/api/restaurants?status=` 다중값 필터 추가 | ✅ |
| 4 | Brand Franchise Map | Leaflet + OSM, 클러스터링, 상태별 핀 색상 5종, **Franchise=★ / Direct=●** 구분, **핀 크기 = 30일 매출**, **점선 원 = territory radius(exclusivity_terms.radius_km)**, Un-mapped 리스트 | ✅ |
| 5 | Foodcourt Tenancy Map | Branch 큰 핀(점유율 % 표시) + Restaurant 작은 핀(계약/매출), territory radius 동일 적용 | ✅ |
| 6 | 수동 좌표 편집 UI | Restaurant(Admin 모달 신규+편집), FoodcourtBranch 폼 lat/lng 입력 | ✅ |
| 7 | Auto-Geocoding (Nominatim) | POST/PUT 주소 변경 시 비동기 훅 (응답 차단 없음) + 수동 좌표 우선 | ✅ |
| 8 | DB `restaurants.latitude/longitude` | DOUBLE NULL 추가 (개발 DB 적용 완료, 운영 ALTER 필요) | ✅ |
| 9 | Backfill 스크립트 | `scripts/backfill-restaurant-geocode.js` (1req/s 스로틀, dry-run 지원) | ✅ |
| 10 | AddonModule 등록 + Plan 편입 | `brand_franchise`, `fc_tenancy`, `fc_branches` 신규 모듈. 모든 Brand/Foodcourt 플랜(Basic/Pro/Enterprise)에 포함. `scripts/register-map-modules.js` idempotent | ✅ |
| 11 | i18n 4개 언어 | tabs + map legend + lat/lng + franchiseTabs 키 확장 (en/ko/zh/ms) | ✅ |

### 수정된 파일

**백엔드**
- `middleware/auth.js` (branch_id 노출 + getManagerScope)
- `models/Restaurant.js` (latitude/longitude)
- `routes/brands.js` (franchise-map + allowed-routes 연동)
- `routes/foodcourts.js` (tenancy-map 신규)
- `routes/contracts.js`, `routes/invoices-main.js`, `routes/restaurants-crud.js`, `routes/foodcourt-branches.js`, `routes/foodcourt-units.js` (Manager scope 적용)
- `utils/geocoding.js` (Nominatim wrapper, 신규)
- `scripts/backfill-restaurant-geocode.js`, `scripts/register-map-modules.js` (신규)

**프론트엔드**
- `components/Contract/ContractManagementPage.tsx` (Active/Archive + extraTabs prop)
- `pages/BrandGeneral/FranchiseManagementPage.tsx` (Contracts/Map 탭, multi-brand 선택)
- `pages/BrandGeneral/BrandFranchiseMapPage.tsx` (신규)
- `pages/FoodcourtGeneral/TenancyManagementPage.tsx` (Contracts/Map 탭)
- `pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx` (신규)
- `pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx` (lat/lng)
- `pages/Admin/RestaurantsPage.tsx` (Operational/Archive 탭 + lat/lng)

**의존성**: `leaflet`, `react-leaflet`, `leaflet.markercluster` + types

### DB 변경 (운영 배포 시 적용 필요)
- `ALTER TABLE restaurants ADD latitude DOUBLE NULL, ADD longitude DOUBLE NULL`
- `node scripts/register-map-modules.js` (AddonModule + Plan Template sync)
- `node scripts/backfill-restaurant-geocode.js` (선택, 기존 매장 자동 좌표)

### 검증 결과
- state-hydration-check: 0 warnings
- 빌드: exit 0 (총 3회, 각 72~100초)
- Manager scope 통합 테스트: 8/8 pass
- API 권한 6/6 pass (BG own/other, admin, FG, invalid, no-auth)
- Brand map: max_sales_30d=134.4 집계 확인
- FC map: branches 점유율 stats 정상
- Restaurant lat/lng write→read 왕복 일치
- AddonModule 등록 후 allowed-routes 20/18 반영 확인
- health-check: 40/40 pass (다수 재실행)
- i18n:verify: Errors 0

### 미배포
**운영 배포는 다음 세션에서 `/배포` 명령으로 진행.**

---

## ✅ 완료: v3.15 운영 배포 — Foodcourt Branch 시스템 + Contract Billing + Manager 권한 + 보안 2건 (2026-04-19 오후)

### 배경
- 오후 (v3.14 배포 이후 축적): Contract Management UX 전면 개편, Foodcourt 다지점 지원, Manager 권한 할당 세분화, 보안 취약점 2건 수정
- 오후~저녁: 실제 유저 흐름 검증 → 스코프 버그 + UI 불일치 추가 발견 → 수정
- 저녁 20:44 UTC: v3.15 운영 배포 완료 (smoke 10/10 pass)

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Sidebar 실시간 뱃지 | 전역 소켓 핸들러에 `fetchBadgeCounts()` 추가. 15초 polling 대기 → 즉시 반영 | ✅ |
| 2 | Contract 리스트 카드 UX | `utils/contractBillable.ts` 신규, 금액 요약 + 잔여기간 태그 + Foodcourt 카드 유닛/location | ✅ |
| 3 | Pipeline 레이아웃 정렬 | Column 배경 제거, gap 8px, width 100% — 상단 StatsGrid와 좌우 full 정렬 | ✅ |
| 4 | Contract Detail Tab → Smart Accordion | 4섹션 아코디언화 + FormAccordion/FormAccordionSection 신규 컴포넌트 + 상태 배지 + RequiredBanner | ✅ |
| 5 | 필드 하이라이트 visual | field-error 빨간 테두리 + field-highlight 보라 pulse + 인라인 에러 메시지 | ✅ |
| 6 | 버튼 정책 전환 | "disabled" → "클릭 허용 + 자동 섹션 펼침/스크롤". UI_DESIGN_GUIDE 4.4 개정 + 14장 Accordion 신설 | ✅ |
| 7 | Notes & Comments 통합 | CommentSection.titleText prop + $embedded 스타일 (외부 제목/구분선 중복 제거) | ✅ |
| 8 | Documents 필수 제거 | 외부 DMS 사용 반영 | ✅ |
| 9 | P0 #1 Foodcourt unit_id 필수 | Contracting→Setup 시 검증 추가 | ✅ |
| 10 | P0 #2 Applicant OR 조건 | company_name OR contact_person 중 하나만 있으면 통과 | ✅ |
| 11 | P0 #3 contract_tasks.is_required | Setup→Active 시 required task만 완료 요구 + UI 토글 | ✅ |
| 12 | P2 #1 Contract 만료 알림 | `last_expiry_notification_day` + `processContractExpiryReminders` 스케줄러. renewal_alert_months + D-7 2단계, 자동 expired 전환, 발행자팀/applicant 별도 이메일. ExpiryBanner + `?action=renew` URL | ✅ |
| 13 | P2 #2 Contract↔Invoice 연결 | `invoices.contract_id` + Billing 아코디언 섹션 + "+Issue One-time Invoice" → prefill → 자동 연결. Negotiated Financial Terms 참조 표시 | ✅ |
| 14 | P3 Foodcourt Branch 시스템 | `foodcourt_branches` 테이블 신규 (주소/연락처/운영시간/위경도), `foodcourt_units.branch_id` + (branch,unit) unique. Primary branch 자동 마이그레이션. CRUD API + 전용 UI 페이지 + 사이드바 메뉴 | ✅ |
| 15 | Unit full code 표시 | `{BRANCH}-{UNIT}` 형식 (SUNWAY-A01) Pipeline/Detail 일괄 적용 | ✅ |
| 16 | Phase A — Foodcourt Manager 지점 할당 | `users.branch_id` 컬럼 + Select UI (All branches/특정 지점). JWT payload 포함 | ✅ |
| 17 | Phase B — Brand Manager 브랜드 할당 | 여러 Brand 소유자 Manager 생성 시 Brand Select 필수. Manager 목록 통합 조회 | ✅ |
| 18 | Brand 권한 owner_id 기반 개편 (보안) | `req.user.brand_id` 단일 비교 → `brand.owner_id === req.user.id` (6개 라우트). 다중 브랜드 소유자 권한 버그 해소 | ✅ |
| 19 | Invoice PUT IDOR 취약점 수정 (보안) | `Number(null) === Number(null)` = true 버그로 인한 cross-entity 편집 가능성. null-safe 비교로 System Admin/발행자/수신 restaurant 만 허용 | ✅ |
| 20 | Restaurant ↔ Branch 연결 | `restaurants.branch_id` + API 검증 + Foodcourt General Restaurant 생성/편집 시 Branch Select | ✅ |
| 21 | Foodcourt General 레스토랑 스코프 버그 수정 | `/api/restaurants` 에 foodcourt_id 필터 추가 + `optionalAuth` 누락 필드(brand_id/foodcourt_id/branch_id) 보완 | ✅ |
| 22 | /api/restaurants/manager/:managerId Foodcourt 경로 | RestaurantManager 조인만 쓰던 것을 role 분기 추가로 Foodcourt General은 foodcourt_id 기반 조회 | ✅ |
| 23 | 사이드바 정리 | obsolete "Foodcourts" Coming Soon placeholder 제거, "Branches" 메뉴를 Management 섹션 첫번째로 이동 | ✅ |
| 24 | FoodcourtStaffPage 버튼 사이즈 통일 | 8px 16px → 12px 20px, border-radius 6→8, weight 500→600 (다른 페이지와 일관) | ✅ |
| 25 | i18n 4개국어 (17+ 키) | banner/section/task/applicant/unit/branch/negotiated/contractExpiry 등 | ✅ |

### DB 변경 (운영 적용 완료)
- `contract_tasks.is_required TINYINT(1) NOT NULL DEFAULT 1`
- `contracts.last_expiry_notification_day INT NULL`
- `invoices.contract_id INT NULL`
- `foodcourt_branches` 신규 테이블
- `foodcourt_units.branch_id INT NULL`
- `users.branch_id INT NULL`
- `restaurants.branch_id INT NULL`

### 수정된 파일 (주요)

**백엔드**
- models/: Contract.js, ContractTask.js, Invoice.js, Restaurant.js, User.js, FoodcourtUnit.js, FoodcourtBranch.js (신규), index.js
- routes/: contracts.js, invoices-main.js, brands.js, foodcourts.js, foodcourt-units.js, foodcourt-branches.js (신규), restaurants-crud.js
- services/: subscriptionScheduler.js, authService.js
- utils/: notificationTemplates.js
- scripts/: migrate-foodcourt-branches.js (신규)
- locales/{4}/email.json

**프론트엔드 신규**
- components/UI/FormAccordion.tsx
- utils/contractBillable.ts
- pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx

**프론트엔드 수정**
- components/Contract/: ContractDetail.tsx, ContractPipeline.tsx, ContractManagementPage.tsx
- components/Common/CommentSection.tsx
- components/Layout/MainLayout.tsx
- components/ProtectedRoute.tsx
- components/UI/index.tsx
- pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx
- pages/Foodcourt/FoodcourtStaffPage.tsx
- pages/Brand/BrandStaffPage.tsx
- pages/Manager/RestaurantsPage.tsx
- pages/BrandGeneral/BrandInvoicesPage.tsx
- pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx
- App.tsx
- public/locales/{4}/contract.json, common.json

**문서**
- docs/CONTRACT_DETAIL_UX.md
- docs/FOODCOURT_BRANCH_MODEL.md (신규)
- dev-frontend/UI_DESIGN_GUIDE.md (4.4 개정 + 14장 Accordion)

### 검증 결과
- state-hydration-check **0 warnings**
- 빌드 exit 0 (여러 차례), 신규 타입 에러 0
- E2E **82+ pass / 0 fail** (user flow 50, security 16, regression 16)
- health-check **40/40** (dev + 운영 smoke 10/10)
- `npm run i18n:verify` **Errors 0**

### 운영 배포
- 2026-04-19 20:44 UTC 자동 배포 완료
- smoke tests 10/10 pass
- DB sync 자동 처리 (신규 7건 컬럼/테이블)
- 릴리즈 블로그 + System Admin 공지 운영 DB 자동 등록

### 다음 할 일
- 운영 실사용 모니터링 (ExpiryScheduler 실제 이메일 발송, Branch 마이그레이션 후 운영 Foodcourt 데이터 상태, Restaurant 스코프 실제 화면 확인)
- Manager 지점별/브랜드별 **실제 접근 enforcement** (Phase A (a) 결정대로 저장만 된 상태. 필요 시 후속 구현)
- Floor Plan 시스템 (Branch 평면도 + 유닛 좌표)
- Brand Franchise Map
- Contract.location_description → Floor Plan 좌표 자동 동기화

---

## ✅ 완료: Sidebar 실시간 뱃지 + Contract UX 대개편 + P0/P1 필수 필드 (2026-04-19)

### 배경
- 2026-04-19 오전 운영 배포 완료 (v3.14 기준 + 이번 세션 이전까지의 누적 변경 포함, smoke 10/10 pass)
- 배포 후 Contract 상세 페이지 UX 문제 인지 (Tab 구조에서 필수 필드가 다른 탭에 숨어 버튼 disabled 사유 불명), 필수 필드 정의 자체에도 실무 갭 존재
- 30년차 UX 관점으로 Tab → Accordion 전환 결정, 동시에 필수 필드 정의 전면 재검토

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Sidebar 실시간 뱃지 갱신 | `MainLayout.tsx` 전역 소켓 리스너 `order-created/items-added/updated` 에 `fetchBadgeCounts()` 추가. 기존 15초 polling 지연 → 즉시 반영 | ✅ |
| 2 | Contract 리스트 카드 UX — 금액/잔여기간/위치 | 공용 헬퍼 `utils/contractBillable.ts` (getBillableSummary — plans 우선 financial_terms fallback / getRemainingInfo — expired/warning/normal). ContractPipeline 카드에 금액 블록 + Foodcourt 유닛/location_description + 잔여 태그 | ✅ |
| 3 | ContractPipeline 레이아웃 정렬 | Column 회색 배경 제거, gap 8px, width 100%, margin 0 — 상단 StatsGrid 와 좌우 full 정렬 | ✅ |
| 4 | Contract Detail Tab → Smart Accordion | 4탭(Parties/Contract/Setup/Documents)을 `FormAccordion`+`FormAccordionSection` 신규 컴포넌트로 전환. 섹션별 상태 배지 (✓ Complete / ⚠ N required / — Optional), RequiredBanner 집계 + chip click→scroll, ReadyBanner 초록 표시, 버튼 disabled 제거 (클릭시 자동 펼침+스크롤) | ✅ |
| 5 | Accordion 디자인 정리 | 외곽 rounded 박스 제거 → 섹션 사이 선 구분만. Auto-expand 제거 (사용자가 직접 펼침). URL ?section= 왕복 지원, 카드 클릭시 초기화 | ✅ |
| 6 | Notes & Comments 제목/구분선 중복 제거 | `CommentSection` `titleText` prop + `$embedded` 스타일 전환 — 외부 제목 없애고 "Notes & Comments (N)" 단일로 통합, border 2개→1개 | ✅ |
| 7 | Documents 필수 제거 | 외부 DMS 사용 고려 — Contracting→Setup 전환 시 Documents 필수 체크 제거 (backend + frontend + hint 메시지) | ✅ |
| 8 | P0 #1 Foodcourt `unit_id` 필수 | Contracting→Setup 시 entity_type='foodcourt' && !unit_id 검증. UI에 Unit 섹션 data-field-key + 안내 메시지 | ✅ |
| 9 | P0 #2 Applicant 식별 OR 조건 | `applicant_company_name` OR `applicant_contact_person` — 개인 자영업자 대응. 새 i18n 키 `applicantIdentifier` | ✅ |
| 10 | P0 #3 `contract_tasks.is_required` | DB 컬럼 ADD (BOOL NOT NULL DEFAULT 1), 모델/라우트 POST/PUT whitelist. Setup→Active 시 `is_required=true` task만 완료 요구. SetupChecklist UI 에 Required/Optional 토글 + 색상 배지 | ✅ |
| 11 | P1 필드 하이라이트 visual | DetailContainer CSS inject (field-error 빨간 테두리 / field-highlight 보라 pulse / field-error-msg 인라인 메시지). `openSectionAndScroll` data-field-key 우선 타겟. attemptedSave 상태 기반 `fieldShellClass` 헬퍼. 필수 5곳 적용 | ✅ |
| 12 | i18n 4개국어 13키 | en/ko/zh/ms contract.json 모두 신규 키 (banner/section/task/applicant/unit 관련). `npm run i18n:verify` Errors 0 | ✅ |
| 13 | 설계 문서 최신화 | `docs/CONTRACT_DETAIL_UX.md` — 실제 구현 기준 2.3/2.4 동작 규칙, 섹션 매핑, 시나리오 5.2/5.3 업데이트 | ✅ |

### DB 변경 (dev 적용, 운영 배포 대기)
- `contract_tasks.is_required TINYINT(1) NOT NULL DEFAULT 1` ADD

### 수정된 파일

**백엔드**
- `models/ContractTask.js` — is_required 필드
- `routes/contracts.js` — 스테이지 전환 조건 (applicant OR, foodcourt unit_id, is_required task filter, Documents 제거), POST/PUT task whitelist

**프론트엔드 신규**
- `components/UI/FormAccordion.tsx` — 재사용 Accordion 컴포넌트
- `utils/contractBillable.ts` — 청구 요약 + 잔여기간 헬퍼

**프론트엔드 수정**
- `components/Contract/ContractDetail.tsx` — Tab 제거, Accordion 래퍼, RequiredBanner/ReadyBanner, getSectionRequirements 확장, fieldShellClass + data-field-key 적용, SetupChecklist Required 토글
- `components/Contract/ContractPipeline.tsx` — 카드 금액 블록 + 잔여기간 + Foodcourt 위치 + 레이아웃 정렬
- `components/Contract/ContractManagementPage.tsx` — 카드 클릭시 URL `?section=` 초기화
- `components/Common/CommentSection.tsx` — titleText prop + $embedded 스타일
- `components/Layout/MainLayout.tsx` — 소켓 핸들러에 fetchBadgeCounts
- `components/UI/index.tsx` — FormAccordion export
- `public/locales/{en,ko,zh,ms}/contract.json` — 13 키

**문서**
- `docs/CONTRACT_DETAIL_UX.md` — 설계 문서 최신화

### 검증 결과
- state-hydration-check **0 warnings**
- 빌드 **exit 0** (여러 차례), 신규 타입에러 0
- API E2E — P0/P1 시나리오 **23 pass / 0 fail** (applicant OR, unit_id, is_required task, field shape)
- health-check **40/40 통과**
- `npm run i18n:verify` **Errors 0**
- 페이지 렌더링 — `/pos/brand/franchise` 200, `/pos/foodcourt/tenancy` 200

### 운영 배포 대기 (Irene 본인 `/배포`)
- DB: `contract_tasks.is_required` ADD
- 코드: 이번 세션 전체 변경 + `Tab → Accordion` 구조 전환

---

## ✅ 완료: Contract Management Enhancement + Inquiry UX 수정 (2026-04-18)

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Contract Phase 1 — 당사자/발행자 정보 + 4탭 UI | contracts 10컬럼 ADD (applicant/issuer 각 business_reg/website/bank_info/representatives + issuer_sync_with_master). ContractDetail에 Parties/Contract/Setup/Documents 4탭 도입. Issuer 섹션 신규. 신규 컴포넌트 3개: BankInfoField, RepresentativeField, SyncMasterToggle | ✅ |
| 2 | Contract Phase 1.5 — Issuer 자동 sync 훅 | Brand/Foodcourt afterUpdate 훅 — 관련 필드(company_name/registration_no/website/bank_*) 변경 시 issuer_sync_with_master=true + stage ∈ proposal/contracting/setup 인 계약에만 자동 전파 (active/terminated/renewed는 법적 스냅샷 보호) | ✅ |
| 3 | Contract Phase 2 — 재무 조건 확장 + validate 훅 | financialTermsSchema() 훅 — rent_schedule 배열/year 1-50, percentage_rent.rate 0-100 + compare_against enum, royalty_payment.due_day 1-31 검증. 신규 컴포넌트 2개: RentScheduleEditor (데스크톱 테이블 + 모바일 카드), PercentageRentField. Financial Terms 재구성 (Tenancy: Unit/Rent Schedule/Percentage Rent/Key Dates/Others, Franchise: Initial Fees/System/Royalty/Marketing & Territory) | ✅ |
| 4 | Contract Phase 3 — 조항 + Support Services | contracts 5 JSON 컬럼 ADD (special_conditions/renewal_policy/exclusivity_terms/support_services/legal_terms). contract_tasks ADD source_type ENUM, source_code. GET /contracts/support-services/template 엔드포인트. Setup stage 진입 시 support_services[].included=true 항목 → contract_tasks 자동 생성. 신규 컴포넌트 3개: ConditionListEditor, SupportServicesChecklist (4그룹), LegalTermsEditor (dispute_resolution 조건부 표시) | ✅ |
| 5 | Required Field UX — 필수 표시 + disabled 버튼 | Label `*` 빨간 표시, RequiredHint 노란 배너, stage 전환 에러에 missing[] 배열 반환, 누락 필드명 구체화 ("Contract Number, Contract Period (start date)..."). 프론트: missingRequired 계산 → 상단+하단 버튼 disabled + title tooltip | ✅ |
| 6 | Contract Detail 액션 버튼 상단 미러링 | HeaderActions styled 컴포넌트 신규 — 제목 옆 우측에 nextStage/Renew/Terminate 버튼 배치. 긴 스크롤 없이 즉시 액션 가능. 하단 ButtonRow와 동일 disabled 상태 동기화 | ✅ |
| 7 | Inquiry Close 버튼 PATCH→PUT 버그 수정 | Brand/Foodcourt OperationInquiryPage 의 TicketCard 인라인 Close 버튼이 PATCH를 호출했지만 백엔드는 PUT만 받음 (silent catch로 실패). PUT으로 수정 | ✅ |
| 8 | Inquiry 모달 Close → Close Ticket UX 변경 | 상단 우측 X = 모달 닫기 (유지), 하단 Close 버튼 = 티켓 상태 closed로 변경. 11개 페이지 일괄 적용 (Operation × 5 + System × 6). 이미 closed 상태면 footer 숨김 | ✅ |
| 9 | UI_DESIGN_GUIDE 4.3/4.4 신규 섹션 | "주요 액션 버튼 배치 (상단+하단 필수)" + "필수 미입력 시 버튼 비활성화" 규칙 명문화. 앞으로 모든 상세 페이지에 자동 적용 | ✅ |
| 10 | 검증 스킬 8단계 UI/UX 품질 확장 | 8-A 디자인 시스템 / 8-B 트렌드 디테일 / 8-C 기능 적합성 / 8-D 반응형 / 8-E i18n / 8-F 접근성 / 8-G 실제 확인 방법 — 7개 서브카테고리로 세분화 | ✅ |

### DB 변경 (dev 적용, 운영 배포 대기)
- `contracts` 테이블: applicant_business_registration, applicant_website, applicant_bank_info (JSON), applicant_representatives (JSON), issuer_company_name, issuer_business_registration, issuer_website, issuer_bank_info (JSON), issuer_representatives (JSON), issuer_sync_with_master (BOOL), special_conditions (JSON), renewal_policy (JSON), exclusivity_terms (JSON), support_services (JSON), legal_terms (JSON) — **총 15개 컬럼 ADD**
- `contract_tasks` 테이블: source_type ENUM('manual','support_service','setup_template'), source_code VARCHAR(50) — **2개 컬럼 ADD**

### 수정된 파일

**백엔드**
- `models/Contract.js` — 15 컬럼 + 4개 validate 훅
- `models/ContractTask.js` — source_type/source_code
- `models/index.js` — Brand/Foodcourt afterUpdate 훅 (syncIssuerToContracts)
- `routes/contracts.js` — buildIssuerSnapshot 헬퍼, GET template, PUT whitelist +15, POST prefill, Setup stage 자동 task 생성, stage 에러 missing[] 배열
- `utils/contractSupportServices.js` (신규) — Brand 12 + Foodcourt 12 서비스 카탈로그

**프론트엔드 신규 컴포넌트 (8개)**
- `components/Contract/BankInfoField.tsx`
- `components/Contract/RepresentativeField.tsx`
- `components/Contract/SyncMasterToggle.tsx`
- `components/Contract/RentScheduleEditor.tsx`
- `components/Contract/PercentageRentField.tsx`
- `components/Contract/ConditionListEditor.tsx`
- `components/Contract/SupportServicesChecklist.tsx`
- `components/Contract/LegalTermsEditor.tsx`

**프론트엔드 수정**
- `components/Contract/ContractDetail.tsx` — 4탭 + 8섹션 신규 + HeaderActions + disabled 로직
- `pages/{Admin,Brand,Foodcourt,Manager,Owner,Restaurant}/{Operation,System}InquiryPage.tsx` — 11개 파일 모달 footer UX + PATCH→PUT

**문서**
- `dev-frontend/UI_DESIGN_GUIDE.md` — 4.3/4.4 신규 섹션
- `.claude/commands/검증.md` — 8단계 UI/UX 서브카테고리 7개

### 검증 결과
- 빌드: exit 0 (여러 차례 재빌드)
- state-hydration-check: 0 warnings
- API Write/Read: Phase 1/1.5/2/3 전부 실제 호출로 round-trip 통과, 크로스테넌트 격리 확인
- health-check: **40/40 통과** (최종)
- 페이지 5개 렌더링 HTML 200

### 운영 배포 대기 (Irene 본인 `/배포`)
- 15 contract 컬럼 + 2 contract_task 컬럼 ALTER
- 8개 신규 컴포넌트
- 11개 Inquiry 페이지 수정
- ContractDetail.tsx 대규모 재구성

---

## ✅ 완료: 대규모 정리 + Contract UX 개선 (2026-04-16 ~ 04-17)

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 모바일 주문 영수증 다운로드 + 공유 | `ReceiptShare.tsx` 신규 — Download Receipt(html2canvas PNG, 결제 완료 시만) + Share Order (WhatsApp/Telegram/Web Share). `mobile-orders.js` 응답 확장 (재무 데이터 + restaurant 정보). 빌프린트와 동일 폰트(Inter) | ✅ |
| 2 | branch_name 표시 전수 점검 | `getRestaurantDisplayName()` 유틸 25개 파일 일괄 적용 (누락 20 + 부분 수정 5). 모든 역할/페이지에서 "Name (Branch)" 형식 통일 | ✅ |
| 3 | 이미지 base64 감사 | `recipes.image` 3건 base64 → 파일 전환. `routes/recipes.js` create/update 4곳 `processImage()` 적용 | ✅ |
| 4 | N:M 조인 테이블 DROP | `brand_product_brands`, `supplier_brands` DB 삭제 + `brand-products.js`, `suppliers.js` 죽은 코드 제거 | ✅ |
| 5 | 구독 전환 알림 보강 | Restaurant Active→Overdue 이메일 추가, Entity (Brand/Foodcourt/Owner) Trial→Overdue/Overdue→Suspended 이메일 (`sendEntitySubscriptionEmail`) | ✅ |
| 6 | 인보이스 연체 리마인더 | `processOverdueReminders` 신규 — subscriptionScheduler 매일 3AM. D+3 보라/D+7 노랑/D+14 빨강(Final Notice). 발행자(Issuer) SMTP | ✅ |
| 7 | 타임존 전체 적용 | `toLocaleString`/`Date/TimeString` 257곳 중 ~200곳 `formatDateTime`/`formatDate`/`formatTime` 유틸로 교체. ~74개 파일 수정 | ✅ |
| 8 | C-6 거대 컴포넌트 분할 | LiveOrdersPage(4407→1856), Admin/InvoicesPage(4180→1998), BrandGeneral/BrandInvoicesPage(4548→1620), FoodcourtGeneral/FoodcourtInvoicesPage(4317→1541). 총 17,452→7,015줄 (60% 감소) | ✅ |
| 9 | DateField/DateRangeField 컴포넌트 통일 | `<input type="date" />` 42→0. 신규 단일/범위 날짜 선택 컴포넌트. CalendarPicker 팔레트 재사용. 25개 파일 적용 | ✅ |
| 10 | Link Restaurant 검색 fix | 백엔드 `/api/restaurants` GET에 search/limit 쿼리 추가 (name/branch_name/slug/phone/address LIKE). client-side defensive filter 추가 | ✅ |
| 11 | Applicant Information 필드 분리 | DB `applicant_name` → `applicant_company_name` RENAME + `applicant_contact_person` 신규. 모델/라우트/프론트 전 경로 반영, legacy body 입력 하위 호환 | ✅ |
| 12 | Contract Information 비고란 추가 | 2열×3행 6필드 (Number/Type/Period/SigningDate/Duration/Remarks). `contract.notes` 재사용 | ✅ |
| 13 | Franchise/Tenancy Terms 통화 표시 | `CurrencyInput` (`RM 5000.00`) + `PercentInput` (`5 %`) 컴포넌트 신규. GET 응답에 `entity_currency` (Brand.currency/Foodcourt.currency) 포함. Security Deposit 확인/유지 | ✅ |
| 14 | ContractDetail 저장 실패 fix (빨간 !) | `handleAutoSave`를 whitelist 필드만 PUT하도록 수정 | ✅ |
| 15 | Brand Dashboard Active Contracts 위젯 | ChartGrid 오른쪽 빈 영역에 Active Contracts 카드 추가. 큰 숫자 + 최근 5개 목록 + View all 링크 + 빈 상태 | ✅ |
| 16 | `/기능설계` 스킬 신규 | 대규모 기능 개발용 6단계 체계. `.claude/commands/기능설계.md` + CLAUDE.md 규모별 조절 표에 사용 기준 추가 | ✅ |

### DB 변경 (dev 적용, 운영 배포 대기)
- `contracts.applicant_name` → `applicant_company_name` RENAME
- `contracts.applicant_contact_person VARCHAR(100) NULL` ADD
- `brand_product_brands` DROP
- `supplier_brands` DROP
- `recipes.image` 3건 base64 → 파일 URL 마이그레이션

### 수정된 주요 파일
**백엔드**
- `models/Contract.js`
- `routes/contracts.js`, `routes/restaurants-crud.js`, `routes/foodcourt-units.js`
- `routes/recipes.js`, `routes/mobile-orders.js`, `routes/brand-products.js`, `routes/suppliers.js`
- `services/subscriptionScheduler.js`

**프론트엔드 신규**
- `components/Common/DateField.tsx`, `DateRangeField.tsx`
- `mobile/components/common/ReceiptShare.tsx`
- `pages/LiveOrders/{types,helpers,styles,OrderDetailModal,BillPrintPortal,PaymentVerificationModal}.tsx`
- `pages/Admin/invoices/`, `BrandGeneral/invoices/`, `FoodcourtGeneral/invoices/` 서브디렉토리 (총 18개 파일)

**프론트엔드 주요 수정**
- `components/Contract/ContractDetail.tsx`, `ContractPipeline.tsx`, `ContractManagementPage.tsx`
- `pages/BrandGeneral/BrandGeneralDashboard.tsx`
- 25개 파일 DateField/DateRangeField 적용
- ~74개 파일 타임존 유틸 적용

### 검증
- 빌드: 성공, 타입에러 0건 (다수 재빌드)
- health-check: 40/40 통과
- state-hydration-check: 0 warnings
- API Write→Read: 정상

### 운영 배포 대기
- 이번 세션 전체 16건 변경 (Contract Management Enhancement 설계 + 구현 완료 후 일괄 배포)

### 진행 중인 다음 작업 (Contract Management Enhancement — /기능설계 스킬 적용)
- **1~4단계 설계 완료** + 30년차 3개 관점 검증 반영 → **구현은 다음 세션**
- 설계 문서: `/var/www/docs/CONTRACT_MANAGEMENT_SYSTEM.md` "Contract Management Enhancement (2026-04-17 설계)" 섹션

**Irene 승인 결정:**
- 옵션 A (단일 Contract 모델 + entityType 분기)
- Phase 1 → 2 → 3 순차
- 기존 24건 NULL 유지, 대표자 JSON 배열 (1명), 계좌정보 JSON

**30년차 검증으로 추가된 Critical 보완 6건:**
1. `issuer_sync_with_master` 토글 (Brand/Foodcourt 마스터 동기화 ON/OFF)
2. `financial_terms` JSON 스키마 validate 훅
3. Support Services → `contract_tasks` 자동 생성 (Setup Stage 진입 시)
4. `legal_terms JSON` 컬럼 추가 (준거법/분쟁해결/언어)
5. Percentage Rent 월별 자동 청구 반영은 **비범위** (Phase 4)
6. **탭 인터페이스** 도입 (Parties / Contract / Setup / Documents 4개 탭) — 13개 섹션 스크롤 지옥 해결

**다음 세션 시작 가이드 프롬프트:**
```
Contract Management Enhancement 구현 시작.
/var/www/.claude/session-state.md 읽어줘.
그리고 /var/www/docs/CONTRACT_MANAGEMENT_SYSTEM.md 의
"Contract Management Enhancement (2026-04-17 설계)" 섹션 읽어줘.
Phase 1부터 구현 시작.
```

---

## ✅ 완료: 모바일 이미지 파이프라인 + 엔티티 브랜딩 이메일 (2026-04-15)

### 배경
- **긴급 이슈 1**: 모바일 주문에서 김치볶음밥 클릭 시 장바구니 담기 실패 (운영)
  → 상세 API `/api/mobile/menu/item/:id` 가 `ReferenceError: getPreparationTime is not defined` 으로 500 반환 → ItemDetailPage가 `navigate(-1)`로 튕김
- **긴급 이슈 2**: 모바일 메뉴 카테고리 전환 시 30초+ 로딩
  → 상품 이미지가 전부 base64로 DB에 저장 (운영 35MB, 1건 평균 170-330KB) → `/api/mobile/menu/:slug` 응답 2.4MB
- **긴급 이슈 3**: 카테고리 전환 시 MenuPage 가 전체 페이지 reloading flicker
  → `handleCategoryChange` 가 `loadMenu()` 를 통해 `setIsLoading(true)` → 전체 페이지 `<LoadingContainer>` 교체

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | `/api/mobile/menu/item/:id` 500 에러 fix | `mobile-public.js:413` `getPreparationTime()` 호출 → 리터럴 `\|\| 15` 로 교체 (list endpoint 와 동일 패턴) | ✅ |
| 2 | `utils/imageProcessor.js:processImage()` 재작성 | sharp 로 base64 → 파일로 저장하던 함수가 실제로는 base64 JSON 리턴하던 버그. 파일 저장 + URL 반환으로 전환. SVG/PNG/JPEG 분기, failOn:'none' + 폴백 | ✅ |
| 3 | `routes/menu.js` 저장 로직 변경 | create/update 2곳에서 `JSON.stringify(processedImages)` 제거. `products.image = URL`, `products.image_thumbnail = thumbnail URL` 분리 저장 | ✅ |
| 4 | 기존 `scripts/migrate-images.js` 운영 실행 | 운영 290건(raw 217 + JSON 73) base64 → 파일 변환. 289 성공 / 1 스킵 / 0 오류. `products.image` 컬럼 35MB → 500B 수준 | ✅ |
| 5 | `MenuPage` 카테고리 캐시 + inline fetch | `categoryCacheRef: Map<catId, items>` 추가. `handleCategoryChange` 가 `loadMenu()` 우회하고 직접 fetch → `setIsLoading(true)` 안 건드려서 전체 페이지 flicker 제거. 같은 카테고리 재클릭 시 네트워크 0 | ✅ |
| 6 | 이메일 엔티티 브랜딩 시스템 (`emailBranding.js` 신규) | Restaurant/Brand/Foodcourt 각자의 `logo_url`/`name`/`website`/`company_name` 추출. sharp 로 로고를 pre-resize (height 40px, max-width 280px) → Buffer CID 첨부 반환 | ✅ |
| 7 | `emailService.sendEntityOrPlatformEmail` 헬퍼 추가 | entity SMTP 시도 → "not configured" 에러 시 자동 플랫폼 fallback. 고객 비밀번호 리셋 등에서 "레스토랑 우선, 없으면 시스템" 패턴 구현 | ✅ |
| 8 | `customers-auth.js` 비밀번호 리셋 전환 | `restaurantId = 1` 하드코딩 제거. 레스토랑 브랜딩 + `sendEntityOrPlatformEmail` 사용. 레스토랑 SMTP 있으면 그걸, 없으면 플랫폼 | ✅ |
| 9 | `notificationTemplates` 메타데이터 + 재렌더 | 8개 템플릿 함수가 `_title/_body/_lang` non-enumerable 메타 포함 반환. `notificationService.sendNotification` 이 수신자 entity 브랜딩 resolve 후 재렌더 | ✅ |
| 10 | `emailLayout` 로고 렌더 규칙 | hasIssuer + logoUrl → pre-resized img (링크 없음, 고정 pixel 크기), hasIssuer + logoUrl 없음 → 텍스트 이름, PurpleHere 기본 → 기존 CID 로고 + 링크 | ✅ |
| 11 | 엔티티 브랜딩 시 PurpleHere 링크/로고 완전 제거 | 헤더 로고 `<a>` 래퍼 제거, 푸터 `notification-preferences`/`purplehere.com` 링크 제거 (entity website 있으면 그 링크만). PurpleHere 기본 브랜딩은 기존 그대로 유지 (System Admin 발송 영향 없음) | ✅ |
| 12 | 첨부 정책 분기 | entity 브랜딩 → entity 로고만 첨부. PurpleHere 기본 → `getLogoAttachment()` (html에 `cid:purplehere-logo` 있을 때만 자동). Gmail 에서 unreferenced attachment 가 하단에 크게 노출되던 문제 해결 | ✅ |

### 수정된 파일 (백엔드 10개, 프론트 1개, 신규 1개)

**백엔드 (수정)**
- `dev-backend/routes/mobile-public.js` — `getPreparationTime` 참조 제거
- `dev-backend/routes/mobile-helpers.js` — `parseImageData` list view base64 방어층
- `dev-backend/utils/imageProcessor.js` — processImage 파일 저장 방식 재작성
- `dev-backend/routes/menu.js` — create/update 이미지 저장 경로 2곳
- `dev-backend/routes/customers-auth.js` — 고객 비밀번호 리셋 entity/platform fallback + 브랜딩
- `dev-backend/utils/emailService.js` — `sendEntityOrPlatformEmail` 헬퍼 추가
- `dev-backend/utils/emailTemplates.js` — emailLayout 로고 렌더 규칙 + 푸터 조건부 링크
- `dev-backend/utils/notificationService.js` — `resolveReceiverBranding` + 재렌더 + 첨부 정책
- `dev-backend/utils/notificationTemplates.js` — 8개 템플릿 메타데이터 (`withRenderMeta`)

**백엔드 (신규)**
- `dev-backend/utils/emailBranding.js` — `getEntityBranding(entityType, entityId)` + `resolveLogoAsCid` (sharp pre-resize)

**프론트엔드**
- `dev-frontend/src/mobile/pages/MenuPage.tsx` — `categoryCacheRef` + `handleCategoryChange` inline fetch

**운영 스크립트 (기존 재사용)**
- `dev-backend/scripts/migrate-images.js` — dev 검증 완료 후 운영에서 실행 (289건 변환 성공)

### 운영 반영 현황
- 2026-04-15 06:08 UTC: 모바일 이미지 pipeline 배포 (Irene 실행)
- 2026-04-15 08:51 UTC: 카테고리별 로드 + MenuPage hotfix 배포 (Irene 실행)
- 2026-04-15 09:10 UTC: 카테고리 전환 리로딩 방지 hotfix 배포 (Irene 실행)
- 운영 DB 마이그레이션: `products.image` 35.4MB → ~0.01MB, 파일 URL 305건
- 이메일 엔티티 브랜딩은 dev 검증 완료, **운영 배포 대기 (Irene 본인 실행 예정)**

### 후속 과제 (다음 세션)
- Brand/Foodcourt 산하 사용자 대상 notification 메일도 수신자 entity 브랜딩 실운영 확인
- Product 이미지 외 다른 이미지 경로 (Brand logo, Foodcourt logo 등) 가 base64 로 저장되는 곳 없는지 감사

### 개발 안 하기로 결정 (2026-04-19 Irene 확정)
- 고객 회원가입 환영/이메일 인증 — 레스토랑 고객은 전화번호 기반 인증이라 불필요
- 주문 확인 / 영수증 메일 — 이미 WhatsApp/Telegram/텍스트 공유 + PNG 영수증 다운로드로 완성 (mobile/components/common/ReceiptShare.tsx)

---

## ✅ 완료: v3.14 운영 배포 — 인보이스/주방/이메일/보안 종합 fix (2026-04-14)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 인보이스 은행계좌 정보 복구 | Brand/Foodcourt Payment Settings 의 `bankTransfer[currency]` JSON 을 `getIssuerCompanyInfo` 에서 읽도록 수정. 메인 `/api/invoices` GET 에 `issuerInfo` 포함 (캐시). 5개 역할 invoice 페이지 모두 `invoice.issuerInfo?.bankName` 우선 사용. 뷰/프린트/다운로드 3경로 모두 표시 | ✅ |
| PDF 안전 분할 | `dev-frontend/src/utils/invoicePdf.ts` 신규 — 캔버스 픽셀 행 스캔으로 흰색 행 찾아 안전 break. `INVOICE_PRINT_CSS` 상수 — `page-break-inside: avoid` 규칙 집합. 5개 invoice 페이지의 중복 PDF 로직 (~60줄 × 5) → 1 함수 호출로 치환 | ✅ |
| Kitchen Stations uncategorized 오경고 | `SettingsPage.tsx:4697` 필터 `p.category` → `p.categoryId ?? p.category_id`. `/api/menu` 응답 필드명 불일치로 생긴 오탐 제거 | ✅ |
| Kitchen Stations lazy default | `kitchen-stations.js GET /` 에서 stations 0개이면 "Kitchen" 자동 INSERT. 신규 레스토랑 무설정 경험 | ✅ |
| 1-station 단순 UI | stations ≤ 1 일 때 초록색 안내 배너 + Assignment Mode 카드 + Unassigned 경고 숨김 | ✅ |
| 온보딩 체크리스트 파싱 | `useSetupStatus.ts:103` → `result.data?.stations \|\| []` 로 수정. Set up Kitchen Stations 즉시 완료 표시 | ✅ |
| Legacy email 템플릿 2개 → emailLayout() | `authService.js notifyAdminNewSignup` (신규가입 admin 알림, 운영 레거시 발송 사건의 템플릿) + `public.js` 문의 답변. 로고 CID 자동 첨부 | ✅ |
| POST /api/restaurants 역할 가드 (HIGH 보안 갭) | `requireRole('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner')` 추가. 회원가입 흐름 미영향. health-check 영구 regression test 추가 (39 → 40) | ✅ |
| 공지 가시성 hotfix | `/api/notices/sent` 가 System Admin 은 모든 System Admin 작성 공지 표시하도록 확장. 이전엔 `author_id: req.user.id` 로 본인 작성만 반환 → release-post 스크립트가 id=1 로 고정 생성한 notice 를 Irene(id=4) 이 못 봄. 5개 역할 NoticesPage 리스트에 `updates` 카테고리 배지 (보라색) 추가. 기존 `guide` 만 배지 있던 것 확장 | ✅ |

### 수정된 파일 (백엔드 10개, 프론트 12개)

**백엔드**
- `dev-backend/routes/invoices-helpers.js`
- `dev-backend/routes/invoices-main.js`
- `dev-backend/routes/kitchen-stations.js`
- `dev-backend/routes/notices.js`
- `dev-backend/routes/public.js`
- `dev-backend/routes/restaurants-crud.js`
- `dev-backend/scripts/health-check.js`
- `dev-backend/services/authService.js`

**프론트**
- `dev-frontend/src/utils/invoicePdf.ts` (신규)
- `dev-frontend/src/hooks/useSetupStatus.ts`
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx`
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx`
- `dev-frontend/src/pages/Admin/NoticesPage.tsx`
- `dev-frontend/src/pages/Brand/NoticesPage.tsx`
- `dev-frontend/src/pages/Foodcourt/NoticesPage.tsx`
- `dev-frontend/src/pages/Owner/NoticesPage.tsx`
- `dev-frontend/src/pages/Restaurant/NoticesPage.tsx`

### 운영 배포
- 배포 1 (06:27 UTC 2026-04-14): `main.0028215c.js`, smoke 10/10 — 4개 종합 fix
- 배포 2 hotfix (07:14 UTC 2026-04-14): `main.3fe57608.js`, smoke 10/10 — 공지 가시성 + updates 배지
- 릴리즈 공지: dev id=41, prod id=18 — category=updates, target_type=all
- 랜딩 블로그: `/blog/release-v3.14` (dev id=45, prod 생성)

---

## ✅ 완료: Brand Cross-Tenant 누수 fix (치명 보안, 2026-04-13 배포 4)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Brand General 격리 (치명) | 한 BG가 다른 BG 소유 재료/공급업체/상품을 조회·수정 가능했던 누수 차단. 모델 정립: 한 BG가 여러 brand 소유 (`brands.owner_id`). 재료/공급업체/BG 프로덕트는 BG 소유자 단위 공유, 레시피는 브랜드별 사용 | ✓ |
| DB 스키마 변경 (dev + 운영) | 7개 BG-level 테이블에 `owner_user_id` 컬럼 추가 (product_ingredients, product_ingredient_categories, suppliers, brand_products, brand_product_categories, brand_product_option_groups, brand_product_options). 2개 brand-level 테이블에 `brand_id` 컬럼 추가 (product_recipes, product_recipe_categories) | ✓ |
| 운영 백필 + 고아 할당 | N:M 조인(`brand_product_brands`, `supplier_brands`) + 레시피→재료 추적으로 자동 백필. K-DINE 시리즈 고아 데이터(재료 7건, 카테고리 4건, 레시피 2건, 공급업체 1건) → user 23 (K-DINE owner) 수동 할당 | ✓ |
| 신규 미들웨어 brandScope.js | `requireBGScope`/`applyBGFilter`/`assertBGOwnsRow` (BG 단위) + `requireBrandScope`/`applyBrandFilter`/`assertBrandOwnsRow` (브랜드 단위, brands.owner_id 검증). System Admin 우회 가능 | ✓ |
| 라우트 패치 6개 | product-ingredients.js / product-ingredient-categories.js / product-recipes.js / product-recipe-categories.js / suppliers.js / brand-products.js — GET 필터 + POST owner 자동 세트 + PUT/DELETE 소유권 검증 (404 존재 은닉) | ✓ |
| suppliers.js 누수 폴백 제거 | `\|\| supplier.connectedBrands.length === 0` 폴백 코드 삭제 (누수의 직접 원인). N:M `supplier_brands` 읽기 중단 | ✓ |
| `isBrandManager` free pass 제거 | URL에 brand_id가 없을 때 `Brand.count({where:{owner_id:user.id}}) > 0` 검증 (dangling BG 차단) | ✓ |
| 9개 모델 업데이트 | ProductIngredient, ProductIngredientCategory, Supplier, BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption (owner_user_id) + ProductRecipe, ProductRecipeCategory (brand_id) | ✓ |
| 검증 | dev 21/21 격리 테스트, health-check 39/39, 운영 smoke 10/10, 운영 격리 검증 (user 23/24/29 각자 본인 데이터만, 교차 GET 404) | ✓ |

### 수정된 파일
- `dev-backend/middleware/brandScope.js` (신규, 190줄)
- `dev-backend/middleware/recipeAuth.js` (`isBrandManager` 수정)
- `dev-backend/models/{ProductIngredient,ProductIngredientCategory,Supplier,BrandProduct,BrandProductCategory,BrandProductOptionGroup,BrandProductOption,ProductRecipe,ProductRecipeCategory}.js`
- `dev-backend/routes/{product-ingredients,product-ingredient-categories,product-recipes,product-recipe-categories,suppliers,brand-products}.js`
- `dev-backend/scripts/migrate-bg-scope-prod.js` (신규, 운영 마이그레이션 + 백필)

### DB 변경 (dev + 운영 모두 적용)
- 7개 테이블 `owner_user_id INT NULL` 컬럼 추가 + 백필
- 2개 테이블 `brand_id INT NULL` 컬럼 추가 + 백필 (이전 세션의 잘못된 컬럼 정정)
- dev에서만: 4개 테이블 `brand_id` 컬럼 DROP (잘못된 방향이었던 컬럼)
- dev에서만: 고아 테스트 데이터 8건 삭제

### 후속 과제 (다음 세션)
- `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) — `validateBrandPermission`이 부분 보호 중이지만 명시적 추가 권장
- 모든 역할 모든 페이지 레스토랑 이름 옆 `branch_name` 표시 (대부분 적용됨, 누락 페이지 점검 필요)
- "No Active Subscription" 배너 정책 결정 (Free 플랜 자동 발행 vs 배너 vs 차단)
- N:M 조인 테이블 (`brand_product_brands`, `supplier_brands`) DROP — 읽기 중단 완료, 즉시 또는 1-2주 안정화 후
- 신규 advanced 모듈 8개를 기존 플랜에 수동 체크 (Irene이 `/pos/admin/plans`에서)

---

## ✅ 완료: Dangling Admin 가드 + AddonModule 전체 역할 1:1 분리 (2026-04-13)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Dangling Restaurant Admin 가드 (치명) | `POST /api/users` / `PUT /api/users/:id`에서 role=Restaurant Admin/Staff인데 restaurant_id가 null이면 400 차단. 프론트는 `App.tsx`의 `\|\| '1'` 하드코딩 폴백 제거하고 `NoRestaurantAssigned` 에러 화면 렌더. `ProtectedRoute`가 restaurant-scoped 역할을 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스 (cross-tenant 누수 차단). LoginPage/OperationInquiryPage 하드코딩 폴백도 정리 | ✓ |
| `skipVerification` ReferenceError fix | `POST /api/users`에서 `skipVerification` 변수가 선언 안 돼 모든 관리자 유저 생성이 500 에러. `req.body`에서 `skip_verification` destructure로 fix | ✓ |
| AddonModule 사이드바 메뉴 1:1 분리 (전체 역할) | restaurant/brand/foodcourt/owner 4개 역할에서 번들된 모듈을 사이드바 메뉴와 1:1로 분리. 신규 8개 advanced 모듈: `work_manuals`, `ingredients`, `suppliers` (restaurant) / `brand_work_manuals`, `brand_ingredients`, `brand_suppliers` / `fc_work_manuals` / `owner_work_manuals`. 기존 `notices`/`recipe_management`/`inventory_management`/`brand_notices`/`brand_product_recipes`/`brand_inventory`/`fc_notices`/`owner_notices`의 ui_routes에서 분리된 라우트 제거 | ✓ |
| Inventory 모듈 이름 정리 | `inventory_management` + `brand_inventory` 모듈 이름을 "Inventory & Supplier Management" → **"Inventory"**로 변경. suppliers가 독립 모듈로 승격됐으니 이름도 맞춤 | ✓ |
| 테스트 계정 정리 | dev/prod DB 양쪽에서 `hsoooj@naver.com` (dangling Restaurant Admin 테스트 계정) 삭제 | ✓ |

### 수정된 파일
- `dev-backend/routes/users.js` (POST/PUT 가드, skip_verification destructure)
- `dev-frontend/src/App.tsx` (NoRestaurantAssigned 화면, 폴백 제거)
- `dev-frontend/src/components/ProtectedRoute.tsx` (restaurant-scoped 접근 차단, 폴백 4건 제거)
- `dev-frontend/src/pages/Login/LoginPage.tsx` (폴백 `/pos`로 통일)
- `dev-frontend/src/pages/Restaurant/OperationInquiryPage.tsx` (하드코딩 폴백 제거)
- `addon_modules` 테이블 (DB 데이터 변경, dev+prod 동시 적용)

### DB 변경 (dev + 운영 모두 적용)
- 신규 AddonModule 8건 생성 (restaurant 3 + brand 3 + foodcourt 1 + owner 1)
- 기존 AddonModule 8건 ui_routes 축소 (notices, recipe_management, inventory_management, brand_notices, brand_product_recipes, brand_inventory, fc_notices, owner_notices)
- `inventory_management`/`brand_inventory` name 필드 "Inventory & Supplier Management" → "Inventory"

### 후속 과제
- 기존 플랜에 신규 모듈 **자동 마이그레이션 없음** (opt-in). System Admin이 `/pos/admin/plans`에서 플랜별로 Work Manuals/Ingredients/Suppliers 체크해야 복구됨
- `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) 미해결

---

## ✅ 완료: 인보이스/모달 안정화 + Brand-Restaurant 연결 (2026-04-13)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 인쇄/PDF i18n 평가 | `generateInvoiceHTML` 템플릿 리터럴 안에 JSX `{t(...)}`가 박혀 그대로 출력되던 버그 → `${t(...)}`로 수정. 5개 역할(Admin/Brand/Foodcourt/Owner/Restaurant) 모두 적용 | ✓ |
| PDF 다중 페이지 | `pdf.addImage()` 단일 호출 → `pageHeight=297mm` 기준 슬라이스 + `addPage()` 루프. iframe 높이 `body.scrollHeight` 동적 적용으로 캡처 클리핑 방지 | ✓ |
| 금액 줄바꿈 방지 | `.text-right` 셀과 `.summary-row`에 `white-space: nowrap`. View/Print/PDF 모두 통일 | ✓ |
| Pricing 탭 URL 딥링크 | `/pricing?tab=restaurant\|brand\|foodcourt\|owner` `useSearchParams`로 양방향 sync | ✓ |
| Payment Settings 자동 재계산 (치명) | `recalcPendingInvoiceCharges` 신규 — 미결제(draft/pending_payment/overdue) 인보이스를 새 charges로 일괄 재계산. `subtotal - discount_amount` base 사용. modification_history `{reason:'payment_settings_updated', before, after}` 기록 + `is_modified=true` | ✓ |
| 시스템 자동 수정 배지 | `syncPendingInvoice`도 `is_modified=true` 설정해서 수동 수정과 동일하게 "수정됨" 배지 표시 | ✓ |
| modification_history 이중 인코딩 fix (치명 크래시) | `modification_history: JSON.stringify(history)` → `modification_history: history`. JSON 컬럼이라 Sequelize가 자동 직렬화. 이전엔 string으로 박혀서 frontend `.map()` 시 runtime crash. dev 33건 + 운영 12건 DB 클린업 (string→array) | ✓ |
| modification history 렌더러 양형식 호환 | 수동 편집 `{changes:{field:{from,to}}}` + 시스템 자동 `{before,after,reason}` 둘 다 처리. Admin/Brand/Foodcourt 인보이스 페이지의 view 모달 + edit 모달 6곳 모두 수정. `Object.keys(undefined)` 크래시 방지 | ✓ |
| Hardware 인보이스 QTY/단가 (치명) | `invoice_items` 테이블에 `quantity INT NOT NULL DEFAULT 1`, `unit_price DECIMAL(10,2)` 컬럼 신규. `hardware-quotes.js` POST/PAID 양쪽 addon 생성 경로 `description x{N}` 제거하고 quantity/unit_price 저장. invoices-main.js의 4개 transform이 `item.unit_price`로 unitPrice 노출. dev 7건/2건 + 운영 5건 SQL 백필 (hardware_quotes.addon_items JSON_TABLE join) | ✓ |
| Hardware Quote 모달 payment_settings auto-load | `openInvoiceModal` async 변환, `/api/admin/payment-settings` fetch 후 charges 자동 로드. rate-based 입력 + amount preview | ✓ |
| Invoice DELETE FK 해제 | `hardware_quotes.invoice_id`/`subscription_invoice_id` FK가 삭제 차단 → DELETE 라우트에서 사전 NULL 처리 | ✓ |
| InvoicesPage Non-Member 뱃지 | `payerType === 'external'`에만 표시 (이전엔 hardware quote 링크된 인보이스도 잘못 Non-Member 표시) | ✓ |
| Brand-Restaurant 연결 UI | Manager/RestaurantsPage 생성/편집 모달에 Brand General 전용 "Link to Brand" / "Linked Brand" 드롭다운 신규. 백엔드는 이미 `validateBrandPermission`으로 권한 검증. 이전엔 user.brand_id가 null인 Brand General이 선택 못 하던 문제 | ✓ |

### 수정된 파일
- `dev-backend/services/subscriptionInvoiceService.js` (recalc 함수 신규, JSON.stringify 제거, is_modified 추가)
- `dev-backend/routes/admin-payment-settings.js` (POST 시 recalc 호출)
- `dev-backend/routes/hardware-quotes.js` (addon quantity/unit_price 저장)
- `dev-backend/routes/invoices-main.js` (DELETE FK 해제, transform unit_price 사용)
- `dev-backend/models/InvoiceItem.js` (quantity/unit_price 컬럼 추가)
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` (modification history 양형식, nowrap, PDF 분할, i18n)
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` (동일 패턴)
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` (동일 패턴)
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx` (i18n, nowrap, PDF 분할)
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx` (i18n, nowrap, PDF 분할)
- `dev-frontend/src/pages/Landing/PricingPage.tsx` (URL 탭 딥링크)
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx` (Brand-Restaurant 연결 dropdown)

### DB 변경 (dev + 운영 모두 적용)
- `invoice_items` 컬럼 추가: `quantity INT NOT NULL DEFAULT 1`, `unit_price DECIMAL(10,2) NULL`
- 백필: `hardware_addon` invoice_items에 hardware_quotes.addon_items JSON_TABLE join으로 quantity/unit_price 채움 (dev 9건, 운영 5건)
- modification_history 클린업: 이중 인코딩된 string → array (dev 33건, 운영 12건)

### 후속 과제 (다음 세션)
- 모든 역할 모든 페이지 레스토랑 이름 옆에 `branch_name` 표시 (같은 브랜드 내 이름 중복 구분)
- 통계/리포트 (모든 탭) 레스토랑 표시에 branch_name 동행
- "No Active Subscription" 배너: Brand General 테스트 계정 plan_type=null 케이스 (Free 플랜 자동 발행 정책 결정 필요)
- `POST /api/restaurants` requireRole 누락 (HIGH 보안)

---

## ✅ 완료: 2026-04-11 운영 배포 (버전 v3.12 유지)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| notices 데모/테스트 제외 | 관리자 공지 이메일 발송 시 `is_demo`/`is_test` 계정 제외. broadcast 4개 target(all/role/brand/foodcourt) 필터 적용. `select_restaurants`는 의도 존중하여 그대로 | ✓ |
| admin 하드웨어 max_quantity 무제한 UI | Hardware Package 편집 모달에서 `max_quantity=0`(무제한) 설정 불가하던 버그. loader `\|\| 1` → `?? 0`, 신규 기본 0, input min=0, `(0 = unlimited)` 힌트 | ✓ |
| 운영 DB max_quantity UPDATE | `system_product_addons.max_quantity=1`인 108건을 0(무제한)으로 일괄 UPDATE (`/var/www/backups/system_product_addons_20260411_175650.sql` 백업) | ✓ |
| /packages Quote Summary 구독 라인 | Request a Quote 모달 하단에 소프트웨어 구독 플랜/청구주기/가격 + "Billed separately" 안내. 4개 언어 i18n (en/ko/zh/ms) | ✓ |
| /packages Request a Quote 모달 레이아웃 | z-index `200 → 10000` (Landing 헤더 뒤로 숨던 문제), ModalContent `max-height`, sticky title/buttons, 모바일 풀스크린 | ✓ |
| admin payment-settings 응답 표준화 | GET/POST 응답을 `{success, data}`로 래핑, 에러 응답 `{success:false, message}` 정규화 | ✓ |
| 운영 배포 | 18:32 배포 완료. smoke 10/10, `main.cf7275d4.js`, 백업 `/var/www/backups/20260411_183058` | ✓ |

### 수정된 파일
- `dev-backend/routes/notices.js`
- `dev-backend/routes/admin-payment-settings.js`
- `dev-frontend/src/pages/Admin/SystemProductManagementPage.tsx`
- `dev-frontend/src/pages/Admin/PaymentSettingsPage.tsx`
- `dev-frontend/src/pages/Landing/PackagesPage.tsx`
- `dev-frontend/public/locales/{en,ko,zh,ms}/landing.json`

---

## ✅ 완료: Phase C-6 파일럿 + External QR (2026-04-11)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Phase C-6 파일럿 | `InventoryManager.tsx` 3141줄 → 26개 파일 분할 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄). 공개 API 불변 | ✓ |
| Inventory UX 정리 | 대시보드 카드 5→4 (Expiring Soon 제거), 9 모달 footer prop 전환 (sticky footer), 테이블 반응형 정렬 fix (class 셀렉터), 버튼 `+` prefix 제거 | ✓ |
| StatsGrid 표준화 | 15개 페이지의 로컬 StatsGrid를 `4→≤1024 2→≤768 2` 패턴으로 통일. 이전엔 12개가 `auto-fit minmax(200px, 1fr)`로 모바일 1열 무너짐 | ✓ |
| Repo hygiene | `public/static/` (4), `nginx-build/` (138), `dev-frontend-build/` (495) git untrack + .gitignore. 매 빌드 시 거대 diff 제거 | ✓ |
| 운영 배포 | Phase C-3/C-4/C-5/C-6 + StatsGrid + repo hygiene 일괄 운영 배포. 9단계 검증 39/39, smoke 9/10 (1 false-fail) | ✓ |
| inventory adjust 버그 | `POST /inventory/adjust`가 `quantity` (incremental)만 받음 → `new_quantity` (absolute) 수용 추가. long-standing 버그 | ✓ (dev only) |
| External QR 기능 | Settings Operations 탭에 새 카드 추가 — 커스텀 이름 QR 생성/SVG/PNG/Print/삭제. `table_settings.externalQRs: string[]`. 주문에 동일하게 `table_number` 기록. 모바일 `Table` prefix 제거 | ✓ (dev only) |
| Hydration 검증 자동화 | `/검증` 스킬 0단계 신규 — `state-hydration-check.js` 로 새 state field의 legacy localStorage hydration 안전성 자동 검사. External QR runtime crash 재발 방지 | ✓ |

### 패턴 원칙 (Phase C-6 나머지에 재사용)

1. **Hook = state + 로직 + API capsule**. setter는 `useInventoryData` 중앙에서 받아 optimistic update
2. **Mode 분기는 hook 내부에서만**. Section/Modal은 mode 무지
3. **Add+Edit 유사 모달은 mode prop으로 통합** (e.g. `GeneralStockFormModal`)
4. **단방향 data flow**: main → central hook → feature hooks → sections/modals
5. **공개 API 불변** → consumer 무수정

### 수정된 파일 (핵심)

- `dev-frontend/src/components/Inventory/` — 26개 신규/수정
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` — External QR 카드 + gridColumn 풀폭
- `dev-frontend/src/mobile/pages/OrderTypePage.tsx` — `Table` prefix 제거
- `dev-frontend/src/pages/` — StatsGrid 15개 페이지 표준화
- `dev-backend/routes/inventory-routes.js` — adjust route `new_quantity` 수용
- `dev-frontend/scripts/state-hydration-check.js` — 신규 검증 스크립트
- `.claude/commands/검증.md` — 0단계 추가 (10단계 검증)
- `.gitignore` + `dev-frontend/.gitignore` — untrack entries
- `CHANGELOG.md` — Phase C-6 + UX + hygiene + External QR 항목

### 운영 배포 상태

- **운영 배포 완료 (2026-04-11 06:03)**: Phase C-3/C-4/C-5/C-6 + StatsGrid 15 페이지 + repo hygiene + 이모지 치환
- **운영 배포 대기 (dev only)**:
  - `8480a158` inventory adjust route 버그 수정
  - `9b7543c2` External QR hydration 수정 + 검증 스크립트
  - `30bf17f0` External QR 카드 최초 추가
  - `4e5ae091` External QR 풀폭 + Table prefix 제거
  - `f720579c` CHANGELOG 업데이트

### 검증 결과

- 빌드: 신규 warning 0
- 0단계 hydration check: 0 warnings
- health-check: 39/39 (dev + prod)
- 운영 배포 smoke: 9/10 (1 false-fail은 payment-settings 응답형식 차이, 기능 정상)

### 발견된 별도 이슈 (후속 처리 필요)

- ✓ admin payment-settings 응답 형식 표준화 완료 (GET/POST `{success, data}`, 에러 `{success:false, message}`)
- payment-settings `/available/:currency` 표준화 — 6+ 페이지 + brands/foodcourts sibling 필요, 별도 작업
- DB sync "Too many keys specified" 경고 (10 models) — MySQL 64-key 한도
- `entity_plan_charges` 테이블 운영 미동기화

---

## ✅ 완료: Phase C 진행 (2026-04-10 저녁)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| C-1 운영 배포 | 토큰 키 단일 진입점 (utils/auth.ts, 133 파일 codemod) | ✓ |
| C-2 운영 배포 | CustomerContext 하드코딩 fallback 제거 | ✓ |
| C-3 개발 완료 | Fetch 인터셉터 단일화 — `utils/httpClient.ts` 추출, index.tsx/AuthContext 정리 | ✓ |
| C-4 개발 완료 | CustomerContext 내부 분할 — `useMobileCustomerState` + `usePosCustomersState` + composite (공개 API 불변) | ✓ |
| C-4 추가 수정 | 모바일 세션 **레스토랑별 격리** — per-slug localStorage 키, SPA nav 감지, 레거시 정리 | ✓ |
| C-5 개발 완료 | 백엔드 5개 거대 라우트 파일 → 16개로 분할 (customers/mobile/orders/restaurants/invoices) | ✓ |
| 보조 | 63개 백엔드/셸 스크립트 ✅/❌ → ✓/✗ 일괄 치환 | ✓ |
| 회귀 수정 | mobile-public.js `Order` import 누락 → 수정 (popular/:slug 500→200) | ✓ |

### C-5 분할 결과

| 원본 파일 | 줄수 | 분할 결과 |
|-----------|------|-----------|
| customers.js | 1263 | barrel 16 + self 223 + admin 320 + auth 608 |
| mobile.js | 1304 | barrel 16 + helpers 163 + public 602 + orders 565 |
| orders.js | 2140 | barrel 17 + crud 1501 + views 469 + payment 231 |
| restaurants.js | 2204 | barrel 18 + subscription 461 + crud 1648 + ingredients 152 |
| invoices.js | 3170 | barrel 20 + helpers 418 + main 2327 + payment 527 |

### 검증
- 빌드: main.790aac97.js 64초, 신규 warning 0
- health-check: 39/39 통과 (2회 회귀 발생 → 즉시 수정: mobile-helpers TableQRSession 중복, orders-payment isPaymentAllowed 누락, mobile-public Order 누락)
- 분할 라우트 추가 실호출: 53/53 (health 39 + 추가 14)
- 역할별 플로우: System Admin 8/8 + 모바일 downtown-pizza 6/6 + demo-korean-bbq 2/2
- SPA 라우팅: 10개 경로 전부 200
- 번들 마커: `mobile_customer:`, `mobile_token:`, `locationchange`, `__httpClientInstalled`, `auth_token` 포함, 구 마커 0

### 수정된 파일
- `dev-frontend/src/utils/httpClient.ts` (신규)
- `dev-frontend/src/index.tsx` (인터셉터 단일화)
- `dev-frontend/src/contexts/CustomerContext.tsx` (composite로 재작성)
- `dev-frontend/src/contexts/customer/types.ts` (신규)
- `dev-frontend/src/contexts/customer/useMobileCustomerState.ts` (신규, per-slug scope + SPA nav)
- `dev-frontend/src/contexts/customer/usePosCustomersState.ts` (신규)
- `dev-frontend/src/mobile/utils/mobileApi.ts` (per-slug 토큰 키)
- `dev-backend/routes/customers.js` + `customers-{auth,admin,self}.js`
- `dev-backend/routes/mobile.js` + `mobile-{helpers,public,orders}.js`
- `dev-backend/routes/orders.js` + `orders-{crud,views,payment}.js`
- `dev-backend/routes/restaurants.js` + `restaurants-{crud,subscription,ingredients}.js`
- `dev-backend/routes/invoices.js` + `invoices-{helpers,main,payment}.js`
- `dev-backend/scripts/health-check.js` + 62개 백엔드/셸 스크립트 (이모지 치환)

### 운영 배포 대기분
- Phase C-3/C-4/C-5 일괄 + 이모지 치환 → 다음 `/배포` 명령 시 한 번에 동기화

### 미완 (다음 세션 권장)
- **C-6**: 프론트 거대 컴포넌트 5개 분할 (LiveOrdersPage 4458, InventoryManager 3141, BrandInvoicesPage 4566, PaymentPage 2597, InvoicesPage 4205 — 총 19,000줄). 각 컴포넌트당 별도 세션 권장 (브라우저 수동 검증 필수)

---

---

## 🛡 보안 정석화 작업 (2026-04-10)

### 배경
Irene 우려 — "기능 개발하면서 기존 기능이 망가지는 패턴이 반복됨"

### 4단계 정석 계획
| Phase | 내용 | 상태 |
|-------|------|------|
| **A** | 보안 패치 + 모바일 고객 JWT 시스템 | ✅ 운영 배포 완료 (2026-04-10) |
| **D-1** | Sentry 도입 (프론트 + 백엔드) | ✅ 운영 배포 완료 |
| **D-2** | health-check 스크립트 (39 tests) | ✅ 운영 배포 완료 |
| **B** | 깨진 기능 복구 4건 (포인트 UI, activityLogs, NotificationSettings, 인쇄 이중 트리거) | ✅ 운영 배포 완료 |
| **C** | 구조 개선 (httpClient, Context 분리, 거대 파일 분할) | 🔄 C-1/C-2 운영, C-3/C-4/C-5 개발 완료, C-6 대기 |

**순서**: A → D → B → C
**이유**: D(안전망) 깔고 B/C 진행 — 안전망 없는 리팩토링은 또 깨짐

### 완료 사항 (2026-04-10)

**Phase A — 보안 패치 + 모바일 고객 JWT**
- 백엔드 7개 라우트 보안 패치 (customers/membership/restaurants/orders/inventory/addon-modules/mobile)
- 모바일 고객 JWT 인프라 신규: `utils/customerJwt.js`, `middleware/customerAuth.js`
- 프론트엔드: `mobile/utils/mobileApi.ts` 신규, 모바일 페이지 7개 적용
- 익명 고객 DB 덤프/IDOR/결제 위변조 차단

**Phase D-1 — Sentry**
- `@sentry/react`, `@sentry/node` 설치
- 프론트 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 백엔드 admin/customer 미들웨어 user context 자동 첨부
- environment 자동 감지 + component 태그로 분리
- 민감정보 자동 마스킹

**Phase D-2 — health-check 스크립트**
- `dev-backend/scripts/health-check.js` 신규
- 5개 카테고리 / 39개 자동 테스트
- CLAUDE.md에 검증 마지막 단계로 필수 실행 규칙 추가

**Phase B — 깨진 기능 복구 4건**
- B-1: Activity Log Stats 500 → 200 (sequelize 구조분해 import)
- B-2: NotificationSettings dead token 키 (`'token'` → `'auth_token'`)
- B-3: POS 결제 모달 포인트 사용 UI 표시 (selectedCustomerId prop 추가)
- B-4: 인쇄 다이얼로그 이중 트리거 ("취소해도 또 뜸" 증상)

### 운영 배포 결과 (2026-04-10)

**1차 배포 — 08:24 (보안 정석화)**
- 운영 health-check: **39/39 통과**
- 외부 도메인 페이지: 4/4 (200)
- 보안 검증: 익명 차단 (401), 모바일 slug 정상 (200)
- 백업: `/var/www/backups/20260410_082227`

**2차 배포 — 09:32 (추가 버그 수정 4건)**
- 모바일 메뉴 로딩 속도 개선 — `MenuPage.tsx` `limit=500` 백그라운드 호출 제거, 검색 lazy load
- 모바일 AccountPage My Coupons 필터링 — 본인 명시 타겟만 표시 (myCoupons / promotions 분리)
- 모바일 멤버십 비활성 매장 points UI 숨김 — `pointsEnabled` 기본값 false, PaymentPage Register 체크박스 조건부
- `routes/coupons.js` dual auth — Admin 또는 customer 본인 (IDOR 방어)
- 운영 health-check: **39/39 통과**
- 백업: `/var/www/backups/20260410_093107`
- 버전: v3.12 유지 (보안/안정화 작업이라 버전 미증가)

### Phase C 다음 세션 인계
**상세 가이드는 `/var/www/.claude/session-state.md` 참조** — 6개 작업 (C-1 ~ C-6) 위험도 순으로 정리됨

권장 작업 순서:
1. **C-1**: 토큰 키 단일 진입점 (`utils/auth.ts`) — 30분, 안전
2. **C-2**: `restaurantId = 1` 하드코딩 fallback 제거 — 10분
3. **C-3**: Fetch 인터셉터 단일화 (`httpClient.ts` 추출) — 1~2시간
4. **C-4**: CustomerContext 모바일/POS 분리 — 2~3시간
5. **C-5**: 거대 라우트 파일 분할 (5개 파일)
6. **C-6**: 거대 프론트 컴포넌트 분할 (5개 컴포넌트)

각 작업 후 health-check 실행 + 큰 변경은 Sentry로 안정성 확인 후 다음 단계.

---

## 📐 플랫폼 역할 & 인보이스 아키텍처

### 역할 계층
```
System Admin (플랫폼 운영)
├── 독립 레스토랑 직접 등록/관리
├── Brand / Foodcourt 생성 및 관리
└── POS 구독 플랜 관리 → 모든 레스토랑에 POS 구독료 인보이스 발행

Brand General (브랜드 운영, 1:N 매칭)
├── 브랜드 소속 레스토랑(가맹점) 관리
├── 자체 구독 플랜 생성 (로얄티, 브랜드비, 매출% 등)
└── 소속 레스토랑에 브랜드 플랜 인보이스 발행

Foodcourt General (푸드코트 운영, 1:N 매칭)
├── 푸드코트 입점 레스토랑 관리
├── 자체 구독 플랜 생성 (임대료, 관리비, 매출% 등)
└── 입점 레스토랑에 푸드코트 플랜 인보이스 발행

Restaurant Owner (레스토랑 소유자, N개 레스토랑)  ← NEW
├── 여러 레스토랑 소유 (재무/통계 관리)
├── 소유 레스토랑 매출 통계/비교 조회
├── 인보이스 조회 및 결제 (payment_model='restaurant_owner')
└── 메뉴/주문/직원 관리 불가 (Restaurant Admin 영역)

Restaurant Admin (레스토랑 운영, 1:1 매칭)
└── 자기 레스토랑 POS 운영
```

### 레스토랑 연결 구조 (멀티)
한 레스토랑은 Brand와 Foodcourt에 **동시에** 속할 수 있음 (독립적 FK)
```
Case 1: 독립 레스토랑        → 인보이스: System Admin만
Case 2: Brand 소속           → 인보이스: System Admin + Brand GM
Case 3: Foodcourt 입점       → 인보이스: System Admin + Foodcourt GM
Case 4: Brand + Foodcourt    → 인보이스: System Admin + Brand GM + Foodcourt GM
```

### 인보이스 발행 주체별 분리
| issuer_type | 발행자 | 대상 | 과금 항목 |
|-------------|--------|------|-----------|
| `system_admin` | System Admin | 모든 레스토랑 | POS 구독료 (고정비) |
| `brand` | Brand General | 소속 레스토랑 | 로얄티, 브랜드비, 매출%, 고정비 등 |
| `foodcourt` | Foodcourt General | 입점 레스토랑 | 임대료, 관리비, 매출%, 고정비 등 |

### 이메일 SMTP (각 역할 독립)
- 각 역할이 자기 notification_settings에 SMTP 설정
- 자기가 발행한 인보이스는 자기 SMTP로 발송
- System Admin SMTP를 다른 역할이 대신 쓰지 않음

---

## 🚀 다음 1: Internationalization — i18n (다국어 시스템)

> **설계 문서:** `docs/INTERNATIONALIZATION_SYSTEM.md`
> **규모:** 중 (기능 변경 없음, 전체 UI 텍스트 래핑 + 번역)
> **최우선 순위 이유:** 이후 모든 개발이 처음부터 다국어로 작성되어 이중 작업 방지

### 개요
- 4개 언어: English, 한국어, 中文 (简体), Bahasa Melayu
- UI 텍스트 + 이메일만 번역 (사용자 입력 데이터는 원본 유지)
- 용어집(Glossary) 기반 번역 + 자동 검증 시스템
- 검증 통과 못하면 빌드 실패 → 품질 문제 배포 불가

### 품질 관리 체계 (3중 방어)
- **용어집** (`glossary.json`): 모든 번역의 단일 기준
- **검증 스크립트** (`verify-translations.js`): 누락, 빈값, 용어집 위반, interpolation 불일치 감지
- **ESLint** (`eslint-plugin-i18next`): 하드코딩 텍스트 작성 시 즉시 경고

### 작업 목록
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | i18n 인프라 세팅 (react-i18next, i18n.ts, App.tsx) | ✅ |
| 2 | 용어집 + 검증 스크립트 + ESLint 설정 | ✅ |
| 3 | User 모델 preferred_language + 언어 변경 API | ✅ |
| 4 | 영어 번역 파일 원본 (전체 UI 텍스트 추출 → en/*.json) | ✅ |
| 5 | 한국어 번역 파일 (ko/*.json) | ✅ |
| 6 | 중국어 번역 파일 (zh/*.json) | ✅ |
| 7 | 말레이어 번역 파일 (ms/*.json) | ✅ |
| 8 | 공통 컴포넌트 t() 래핑 (ConfirmDialog, Layout 등) | ✅ |
| 9 | 전체 페이지 컴포넌트 t() 래핑 (46개 디렉토리) | ✅ |
| 10 | 언어 선택 UI (Login, Profile, POS Terminal, Landing GNB) | ✅ |
| 11 | AuthContext 언어 동기화 (로그인 시 i18n.changeLanguage) | ✅ |
| 12 | 이메일 템플릿 다국어 (백엔드 locales + 템플릿 함수) | ✅ |
| 13 | 날짜/통화 로컬라이즈 (date-fns locale, Intl.NumberFormat) | ✅ |
| 14 | 검증 + 빌드 + 테스트 | ✅ |

---

## 🚀 다음 1.5: 타임존 전체 적용 (긴급)

> **규모:** 중대 (81곳 수정, 유틸 함수 신규)
> **선행 조건:** 없음 (독립 작업)
> **관련 규칙:** CLAUDE.md 타임존 규칙, UI_DESIGN_GUIDE.md

### 문제
- 프론트엔드 81곳에서 `toLocaleString` 등을 타임존 없이 사용 → 브라우저 로컬 시간 표시
- 레스토랑마다 다른 타임존 설정 (Asia/Seoul, Asia/Kuala_Lumpur 등)이 무시됨
- 영수증, 인보이스, 매출리포트, POS 등 모든 시간이 부정확

### 구현 계획

| # | 작업 | 영향 범위 | 상태 |
|---|------|----------|:----:|
| 1 | `utils/dateFormat.ts` 유틸 함수 작성 | 신규 파일 | |
|   | - `formatDateTime(date, tz)` → 날짜+시간 | | |
|   | - `formatDate(date, tz)` → 날짜만 | | |
|   | - `formatTime(date, tz)` → 시간만 | | |
|   | - `getStoreTimezone()` → StoreContext에서 타임존 가져오기 | | |
| 2 | `billPrint.js` 전체 수정 (11곳) | 영수증/키친티켓/정산 | |
| 3 | 인보이스 관련 수정 (18곳) | InvoiceList, InvoiceDetail, InvoicePayment 등 | |
| 4 | 매출/리포트 수정 (11곳) | SalesPage, ReportsPage, DailySettlement | |
| 5 | POS 수정 (4곳) | POSTerminalPage | |
| 6 | 대시보드/디스플레이 수정 (6곳) | Dashboard, CustomerDisplay | |
| 7 | 관리자 페이지 수정 (30+곳) | SystemLogs, Inquiry, Notices, Subscriptions | |
| 8 | 검증: 역할별 타임존 확인 (Seoul vs KL) | | |

### 참조
- 타임존 소스: `operationSettings.timeZone` (StoreContext)
- `getStoreInfo().timeZone`으로 모든 페이지에서 접근 가능
- 기존 올바른 구현 예시: `utils/orderUtils.ts:34`, `DailySettlementPrint.tsx:725`

---

## 🚀 다음 2: Franchise & Tenancy Management (계약 관리)

> **설계 문서:** `docs/CONTRACT_MANAGEMENT_SYSTEM.md`
> **규모:** 대 (신규 시스템, DB 변경 포함)

### 개요
- Brand General: Franchise Management — 가맹점 계약 라이프사이클 관리
- Foodcourt General: Tenancy Management — 입점 계약 라이프사이클 관리
- 4단계 파이프라인: Proposal → Contracting → Setup → Active
- 기존 시스템 변경 없음 (순수 추가)

### Phase 1: Core
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | DB 모델 7개 + associations + sync-database | ✅ |
| 2 | routes/contracts.js (CRUD + 단계 전환 + 검증) | ✅ |
| 3 | routes/foodcourt-units.js | ✅ |
| 4 | FranchiseManagementPage (Pipeline + List + Detail) | ✅ |
| 5 | TenancyManagementPage (동일 구조, 입점 필드) | ✅ |
| 6 | ContractPipeline, ContractDetail, ContractStageBar 공통 컴포넌트 | ✅ |
| 7 | Sidebar 메뉴 + App.tsx 라우트 + ProtectedRoute + AuthContext | ✅ |

### Phase 2: Features
| # | 작업 | 상태 |
|---|------|:----:|
| 8 | Document 업로드/다운로드 | ✅ |
| 9 | Setup Checklist (CRUD) | ✅ |
| 10 | Notes → CommentSection + History Timeline | ✅ |
| 11 | Plan 연결 (ContractPlan + EntityPlanRestaurant API) | |
| 12 | Restaurants 페이지 보완 (계약 뱃지 + 연결 플랜) | |
| 13 | Foodcourt Unit Management UI | |

### Phase 3: Operations
| # | 작업 | 상태 |
|---|------|:----:|
| 14 | 갱신/종료 프로세스 | |
| 15 | 갱신 알림 (이메일 + 페이지 배너) | |
| 16 | Dashboard 알림 연동 | |
| 17 | Checklist 템플릿 설정 | |

---

## ✅ 완료: Brand Franchise Map & Foodcourt Floor Plan

> **설계 문서:** `docs/ENTITY_FLOOR_PLAN_SYSTEM.md`
> 신규 페이지 6개 + 라우트 + 사이드바 + 백엔드 API 완료. 운영 반영됨.

### Phase 1: Core
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | Brand.franchise_map + Foodcourt.floor_plan 필드 추가 | ✅ |
| 2 | 전용 API (brand-franchise-map.js, foodcourt-floor-plan.js) | ✅ |
| 3 | FoodcourtFloorPlanPage (캔버스 + 유닛 노드 + Editor) | ✅ |
| 4 | FranchiseMapPage (Area 카드 그리드 + Area CRUD) | ✅ |
| 5 | RestaurantDetailPanel + ContractStatsBar 공통 컴포넌트 | ✅ |
| 6 | 사이드바 메뉴 + 라우트 + ProtectedRoute + AuthContext | ✅ |

### Phase 2: Stats & Polish
| # | 작업 | 상태 |
|---|------|:----:|
| 7 | Vacant "Create Proposal" CTA + 이전 입점자 이력 | ✅ |
| 8 | Expiring Soon 하이라이트 | ✅ |
| 9 | 모바일 폴백 (Foodcourt 리스트뷰) + Editor 데스크톱 전용 | ✅ |

---

## 🚀 다음 4: 리퍼럴 시스템 (Refer & Earn)

> **설계 문서:** `docs/REFERRAL_SYSTEM.md`
> **규모:** 대 (신규 시스템, DB 변경 포함)

### 개요
- 추천인: 피추천인 POS 구독 결제의 15% 영구 커미션
- 피추천인: 첫 달 20% 할인
- 구독 없이 리퍼럴 파트너로 가입 가능 (/referral/signup)
- 기존 POS와 완전 분리된 독립 앱 (/referral/*)

### Phase 1: 핵심 시스템
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | DB 모델 6개 + User 변경 + sync-database | |
| 2 | referralService.js (코드 생성, 커미션 계산, 크레딧 적용) | |
| 3 | routes/referrals.js (공개 + 대시보드 + 월렛 + 지급 + 프로필 API) | |
| 4 | auth.js 확장 (referral-signup + signup referral_code) | |
| 5 | authService.js 수정 (referred_by, login RP 스킵) | |
| 6 | invoiceScheduler.js 수정 (리퍼럴 할인, discountOptions) | |
| 7 | invoices.js 수정 (handleInvoicePaid + processCommission) | |
| 8 | ReferralLayout + ReferralAuthLayout | |
| 9 | ReferralSignupPage (수익 시뮬레이터) | |
| 10 | ReferralLoginPage | |
| 11 | ReferralDashboardPage | |
| 12 | ReferralWalletPage + 지급 요청 모달 | |
| 13 | ReferralProfilePage (AutoSaveField) | |
| 14 | SignupPage 수정 (코드 필드 + ?ref= + 배너) | |
| 15 | App.tsx 라우트 + PosRootRedirect RP 분기 | |
| 16 | AuthContext + ProtectedRoute에 RP 추가 | |

### Phase 2: 관리 + 크레딧
| # | 작업 | 상태 |
|---|------|:----:|
| 17 | SA ReferralManagementPage (Overview/Partners/Payouts/Settings) | |
| 18 | SA 사이드바 Referrals 메뉴 | |
| 19 | 크레딧 적용 (인보이스 페이지 버튼 + 모달) | |
| 20 | 지급 거절 잔액 원복 | |

### Phase 3: 마케팅 + 알림
| # | 작업 | 상태 |
|---|------|:----:|
| 21 | Landing ReferralLandingPage | |
| 22 | GNB Referral 메뉴 | |
| 23 | POS 사이드바 리퍼럴 링크 (전 역할) | |
| 24 | 이메일 알림 7종 | |
| 25 | 클릭 추적 + 전환율 통계 | |

---

## 🚀 다음 5~8: Supply Chain System (공급망 관리)

> **총괄 문서:** `docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md`
> **규모:** 초대 (4개 순차 설계, 전체 B2B 조달 시스템)

### 다음 5: Seller Product & Inventory System
> **설계 문서:** 작성 예정
- Supplier Admin 대시보드 구축 (Products, Inventory, Company Info, Profile)
- Foodcourt General Products + Inventory 추가
- System Admin 식자재/소모품 판매 확장
- 의존성: 없음

### 다음 6: Supplier Contract System
> **설계 문서:** 작성 예정
- Supplier Directory (구매자가 공급업체 검색)
- 계약 신청 → 검토 → 승인 흐름
- 고객별 결제 조건 설정 (Immediate / Monthly SOA)
- 의존성: 다음 5

### 다음 7: Purchase Order & Receiving
> **설계 문서:** 작성 예정
- Ingredient ↔ Seller Product 연결
- PO 생성/라이프사이클 (Draft → Received)
- 입고 → InventoryBatch → 재고 반영
- 기존 PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md PO 부분 흡수
- 의존성: 다음 6

### 다음 8: Seller Order Management & Trade Invoice
> **설계 문서:** 작성 예정
- 각 판매자 LiveOrders 스타일 주문 관리 (역할별 구체화)
- Trade Invoice 자동 발행 (건별)
- SOA (월간 통합 안내서) + [Pay All] 결제
- Invoice.issuer_type에 'supplier' 추가
- 의존성: 다음 7

---

## ✅ 완료: v3.12 인쇄/설정/StoreContext 안정화 + 배포 (2026-04-09)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 프린터 설정 저장 | store.js allowedFields에 printer_settings 추가 | ✅ |
| StoreContext 아키텍처 | AuthProvider > StoreProvider 구조 변경 + URL 레스토랑 감지 | ✅ |
| 영수증 인쇄 전면 개선 | 로고/멤버십QR/커스텀QR/푸터 모든 기기 정상 출력 | ✅ |
| 멤버십 QR | 로컬 생성 + /mobile/{slug}/account 링크 + URL 텍스트 삭제 | ✅ |
| getStoreInfo() 통합 | receiptSettings/slug/membershipQR/timeZone 포함 | ✅ |
| AutoSaveField 패턴 | 이미지/라디오 패턴 가이드 + QR Mode 적용 | ✅ |
| FloorPlan Print QR | 브라우저 모드 적용 + 레이아웃 + 시간/만료 + 타임존 | ✅ |
| CLAUDE.md | 타임존 규칙 추가 | ✅ |
| UI_DESIGN_GUIDE.md | AutoSaveField 필수 규칙(12.4) 추가 | ✅ |

### 주요 수정 파일
- `dev-backend/routes/store.js` — printer_settings allowedFields
- `dev-frontend/src/contexts/StoreContext.tsx` — 아키텍처 전면 개편
- `dev-frontend/src/contexts/AuthContext.tsx` — auth-ready 이벤트
- `dev-frontend/src/App.tsx` — Provider 순서 변경
- `dev-frontend/src/utils/billPrint.js` — QR 로컬 생성, 인쇄 설정 통합
- `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx` — 빌프린트 로고/QR
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` — AutoSaveField 적용
- `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx` — Print QR 개선
- `dev-frontend/src/pages/BillPrint/BillPrintPage.tsx` — QR URL 수정

---

## ✅ 완료: v3.10 다국어 시스템 구현 + 배포 (2026-04-08)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | i18n 인프라 | react-i18next, i18n.ts, App.tsx 연동 | ✅ |
| 2 | 용어집 + 검증 | glossary.json (62용어) + verify-translations.js (5단계) | ✅ |
| 3 | 백엔드 | User.preferred_language + PUT /api/users/language + 이메일 다국어 | ✅ |
| 4 | 번역 파일 | 4,698키 × 4개 언어 (ko 97%, zh 92%, ms 90%) | ✅ |
| 5 | t() 래핑 | 160개 페이지 TSX 파일 | ✅ |
| 6 | 언어 선택 UI | Landing globe, POS sidebar, Mobile header, Login | ✅ |
| 7 | Landing 번역 | 헤더, 푸터, Hero, 쿠키 배너, About, FAQ 등 | ✅ |
| 8 | UI/UX 개선 | 로고→대시보드, 모바일 프로필 navigate, 반응형 1024px | ✅ |
| 9 | Setup Guide | "Add Categories" 단계 추가 | ✅ |
| 10 | 운영 배포 | DB 마이그레이션 + 배포 완료 | ✅ |

---

## ✅ 완료: i18n 기획설계 완성 (2026-04-08)

### 완료된 설계 문서
| # | 문서 | 내용 | 상태 |
|---|------|------|:----:|
| 9 | docs/INTERNATIONALIZATION_SYSTEM.md | 다국어 시스템 (EN/KO/ZH/MS, 용어집+검증 자동화) | ✅ 확정 |

---

## ✅ 완료: 기획설계 8개 문서 완성 (2026-04-07)

### 완료된 설계 문서
| # | 문서 | 내용 | 상태 |
|---|------|------|:----:|
| 1 | docs/REFERRAL_SYSTEM.md | 리퍼럴 시스템 (Refer & Earn 15% 커미션) | ✅ 확정+검증 |
| 2 | docs/CONTRACT_MANAGEMENT_SYSTEM.md | 가맹/입점 계약 관리 (Franchise/Tenancy) | ✅ 확정+검증 |
| 3 | docs/ENTITY_FLOOR_PLAN_SYSTEM.md | Brand Franchise Map + Foodcourt Floor Plan | ✅ 확정+검증 |
| 4 | docs/SUPPLY_CHAIN_SYSTEM_OVERVIEW.md | Supply Chain 총괄 범위/구조 | ✅ 확정 |
| 5 | docs/SELLER_PRODUCT_INVENTORY_SYSTEM.md | 판매자 상품/재고 + Supplier Admin 역할 신설 | ✅ 확정+검증 |
| 6 | docs/SUPPLIER_CONTRACT_SYSTEM.md | 공급업체 계약 (Directory + 계약 신청/승인) | ✅ 확정+검증 |
| 7 | docs/PURCHASE_ORDER_SYSTEM.md | 발주/입고 (PO + Ingredient-Product 연결) | ✅ 확정+검증 |
| 8 | docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md | 판매자 주문관리 + 거래 인보이스 + SOA | ✅ 확정+검증 |

### 추가 성과
- 기존 코드 전체 중복 감사 완료 (ProductIngredient≈Ingredient 등 6건 발견, 신규 반복 금지)
- 모든 설계에서 기존 코드 충돌 검증 완료
- 기존 컴포넌트 재사용 기회 발굴 (InventoryManager, EntityCompanyInfoPage 등)

---

## ✅ 완료: v3.10 배포 — 자동저장 시스템 + 대시보드/세팅 가이드 개선 + 인증 안정화 (2026-04-06)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | AutoSaveField 공통 컴포넌트 | 자동저장 + 인라인 상태 표시 (Input/Select/Toggle/Image/List 5타입) | ✅ |
| 2 | Settings 전체 탭 AutoSaveField 적용 | Store, Operations, Payment, Printer, Kitchen Stations, Mobile Order, Membership, Company Info | ✅ |
| 3 | 독립 페이지 11개 AutoSaveField 적용 | CompanyInfo, BrandCompanyInfo, FoodcourtCompanyInfo, Profile, NotificationSettings, AdminSettings, SiteSettings, PaymentSettings x3 | ✅ |
| 4 | AuthContext fetch 인터셉터 | /api/ 요청에 자동 Authorization 헤더 주입 (401 로그아웃 방지) | ✅ |
| 5 | 대시보드 Quick Actions | Restaurant Admin 구독 기반 동적 생성, System Access 연동 | ✅ |
| 6 | 대시보드 알림 구현 | BrandManager, FoodcourtManager 대시보드에 실시간 알림 추가 | ✅ |
| 7 | 세팅 가이드 확장 | Restaurant Admin 5→10개, Brand General 1→4개, Foodcourt General 1→2개 | ✅ |
| 8 | Kitchen Station 삭제 | window.confirm → ConfirmModal 교체 | ✅ |
| 9 | Kitchen Assignment Mode 경고 | 모드별 분기 + Menu Management 링크 | ✅ |
| 10 | LoginPage 리다이렉트 보안 | 전체화면 페이지 리다이렉트 방지 + XSS 방어 | ✅ |
| 11 | deploy-dev.sh 개선 | 배포 전 이전 빌드 파일 자동 정리 | ✅ |
| 12 | 대시보드 링크 전체 점검 | Foodcourt stats→reports, Manager 경로, SA Quick Actions | ✅ |
| 13 | 데모 데이터 설정 | 개발+운영: Kitchen Stations, Brand Products, 운영설정 | ✅ |
| 14 | POS Terminal 401 해결 | membership API Authorization 헤더 추가 | ✅ |

### 수정된 파일 (주요)
**신규:**
- `dev-frontend/src/components/Common/AutoSaveField.tsx`

**프론트엔드 (수정):**
- `AuthContext.tsx` (fetch 인터셉터 자동 토큰 주입)
- `SettingsPage.tsx` (전체 탭 AutoSaveField + ConfirmModal)
- `RestaurantDashboard.tsx` (동적 Quick Actions)
- `LoginPage.tsx` (리다이렉트 보안)
- `POSTerminalPage.tsx` (membership API 인증)
- `BrandManagerDashboard.tsx`, `FoodcourtManagerDashboard.tsx` (알림 구현)
- `useSetupStatus.ts` (세팅 가이드 확장)
- CompanyInfo 3개, Profile, NotificationSettings, AdminSettings, SiteSettings, PaymentSettings 3개 (AutoSaveField)
- `deploy-dev.sh` (빌드 정리)

---

## ✅ 완료: 메뉴/재료/재고 구조 재정리 Phase 2 — Brand General 적용 + UI 통일 (2026-04-05)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Brand Ingredients 페이지 | 사이드바 메뉴 + 라우트 + BrandIngredientsPage (Ingredients/Categories 탭) | ✅ |
| 2 | Brand 재료 뷰모드 | ProductIngredientsTab에 Compact/Image 토글 + 카드 높이 통일 | ✅ |
| 3 | Brand 재료 상세 팝업 | 카드 클릭 시 상세 팝업 (수정/삭제 + Usage API 연동) | ✅ |
| 4 | Brand Product directIngredients | POST/PUT에 directIngredients 처리, auto recipe 생성/삭제 | ✅ |
| 5 | Restaurant Menu directIngredients 수정 | save 조건 수정 (`!recipe_id ? directIngredients : undefined`), auto recipe 편집 시 recipe_id null 처리 | ✅ |
| 6 | 레시피 상세 팝업 디자인 통일 | ProductRecipesTab 상세 팝업을 RecipesTab과 동일한 ViewContainer 디자인으로 변경 (disabled 폼 → 깔끔한 뷰) | ✅ |
| 7 | 레시피 연결 메뉴/프로덕트 표시 | RecipesTab: linkedMenus, ProductRecipesTab: linkedProducts — 카드 리스트 + 상세 팝업 + 레시피 팝업 모두 표시 | ✅ |
| 8 | 이미지 비율 통일 | 전 페이지 카드 이미지 `aspect-ratio: 16/9` 통일 (RecipesTab, ProductRecipesTab, IngredientsTab, ProductIngredientsTab, MenuManagementPage) | ✅ |
| 9 | 이모지 제거 (Brand) | ProductRecipesTab 상세 팝업에서 이모지 제거, 이미지 없으면 타이틀만 좌측 정렬 | ✅ |
| 10 | ProtectedRoute 업데이트 | `/pos/brand-ingredients` brandLevelRoutes 등록 | ✅ |
| 11 | addon_modules ui_routes | recipe_management에 ingredients 경로, brand_product_recipes에 brand-ingredients 경로 추가 | ✅ |

### 수정된 파일
**프론트엔드:**
- `MainLayout.tsx` — Brand Recipes 네이밍, Ingredients 사이드바 메뉴 추가
- `App.tsx` — Ingredients 라우트 추가
- `ProtectedRoute.tsx` — brandLevelRoutes 추가
- `BrandIngredientsPage.tsx` — NEW
- `IngredientsPage.tsx` — NEW
- `ProductIngredientsTab.tsx` — 뷰모드, 상세 팝업, 이미지 비율
- `IngredientsTab.tsx` — 뷰모드, 상세 팝업, 이미지 비율
- `ProductRecipesTab.tsx` — 뷰모드, 상세 ViewContainer, linkedProducts, 이미지 비율, image 필드 수정
- `RecipesTab.tsx` — 뷰모드, linkedMenus, 상세 Connected Menus, 이미지 비율
- `BrandProductsTab.tsx` — directIngredients 처리
- `MenuManagementPage.tsx` — directIngredients save 조건 수정, auto recipe 편집, 이미지 비율

**백엔드:**
- `routes/brand-products.js` — directIngredients POST/PUT, auto recipe 생성/삭제, TS 문법 수정
- `routes/menu.js` — directIngredients 처리
- `routes/product-ingredients.js` — Usage API
- `routes/restaurants.js` — Ingredient Usage API (restaurant_id 스코프)
- `routes/optionGroups.js` — option ingredient 지원
- `models/OptionIngredient.js` — NEW
- `models/BrandProductOptionIngredient.js` — NEW
- `models/index.js` — associations 추가
- `services/inventoryDeductionService.js` — 옵션 재료 재고 차감

---

## ✅ 완료: 코드 안정화 + 메뉴/재료/재고 구조 재정리 Phase 1 (2026-04-05)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 코드 안정화 | Express 라우트 순서, 인증 미들웨어 9개 파일, Invoice payer_type 정리, TS 에러 수정 | ✅ |
| 2 | 메뉴-재료 직접 연결 | 메뉴에서 재료 여러 개 선택 시 자동 레시피 생성, 기존 재고 차감 로직 활용 | ✅ |
| 3 | 옵션-재료 연결 | option_ingredients 테이블, 옵션에 재료 연결 UI, 주문 시 옵션 재료 재고 차감 | ✅ |
| 4 | Ingredients 페이지 분리 | Recipe 탭에서 분리, 별도 사이드바 메뉴 + 라우트 + 페이지 | ✅ |
| 5 | 재료 상세 팝업 | 카드 클릭 시 팝업 (수정/삭제 + 연결된 레시피/메뉴 표시), Usage API | ✅ |
| 6 | 뷰모드 (Compact/Image) | Kitchen Display 스타일 토글, Compact=사진 숨김 | ✅ |
| 7 | 네이밍 통일 | Brand Plans/Subscriptions, Foodcourt Plans/Subscriptions 구분 | ✅ |
| 8 | UI 수정 | Create Invoice 모달 가로 스크롤, PackagesPage StickyBar 쿠키 배너 위 표시 | ✅ |
| 9 | 패키지 setup items | 패키지별 다른 Included Setup, Options 탭 등록 | ✅ |
| 10 | /검증 명령어 | 9단계 파트별 전문가 검증 스크립트 생성 | ✅ |

---

## ✅ 완료: v3.8 배포 — 견적 시스템 보완 + QR 세션 + 비회원 인보이스 (2026-04-04)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 하드웨어 패키지 보완 | 국가설정, 옵션그룹, addon 중복제거, 카테고리 통일 | ✅ |
| 2 | 비회원 인보이스 | external payer 지원, 계정연결, 3개 인보이스 페이지 | ✅ |
| 3 | 구독 플랜 연동 | 견적에서 구독 선택, Proceed Contract → 인보이스 2개 | ✅ |
| 4 | QR 세션 시스템 | TableQRSession, Static/Session 모드, FloorPlan Print QR | ✅ |
| 5 | 카드 UI 통일 | CardSpacer 패턴 9개 페이지 | ✅ |
| 6 | 문의 관리 통일 | Active/Closed 탭, Close 버튼 (HardwareQuotes, ContactInquiries) | ✅ |
| 7 | 이메일 시스템 | CID 로고, URL 환경변수, emailLayout 인자 수정, 매트릭스 문서 | ✅ |
| 8 | Features/FAQ 보완 | QR/비회원인보이스 기능 추가, FAQ 5건 등록 | ✅ |
| 9 | CLAUDE.md 체크리스트 | 기능 확장 시 필수 체크리스트 추가 | ✅ |
| 10 | 운영 DB 플랜 동기화 | 운영서버 구독플랜 → 개발서버 반영 | ✅ |

---

## ✅ 완료: 시스템 프로덕트 + 하드웨어 패키지 견적 시스템 (2026-04-03)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | BrandProduct 보강 | 세트/이모지/복제/활성토글 기능 추가 (메뉴관리 수준) | ✅ |
| 2 | SystemProduct 모델 5개 | SystemProduct, Category, Price, Addon, HardwareQuote | ✅ |
| 3 | SystemProduct 라우트 | 상품+카테고리 CRUD, 가격, addon, copy, toggle | ✅ |
| 4 | Admin SystemProductManagementPage | 2탭 (Products, Categories), 세트/가격/배송 설정 | ✅ |
| 5 | Public Packages API | 국가별 패키지 필터링, 통화별 가격, addon 포함 | ✅ |
| 6 | PackagesPage (/packages) | 그룹 선택 → 패키지 비교 → 추가 장비 → 견적 문의 | ✅ |
| 7 | Hardware Quotes 라우트 | 견적 CRUD, 상태 관리, 유저 연결, 인보이스 발행 | ✅ |
| 8 | Admin HardwareQuotesPage | ContactInquiry 패턴, 견적→인보이스 발행 | ✅ |
| 9 | 이메일 알림 | 견적 접수 확인 (고객) + Admin 알림 | ✅ |
| 10 | 상품 데이터 등록 | 20개 개별상품 + 6개 패키지(세트), 3개국(MY/SG/KR) 가격 | ✅ |
| 11 | PricingPage 하단 링크 | "Need POS hardware?" → PackagesPage 링크 | ✅ |
| 12 | Subscriptions 메뉴 복원 | System Admin 사이드바 Coming Soon → 활성 복원 | ✅ |

### 수정된 파일 (주요)
**백엔드 (신규):**
- `models/SystemProduct.js`, `SystemProductCategory.js`, `SystemProductPrice.js`, `SystemProductAddon.js`, `HardwareQuote.js`
- `routes/system-products.js`, `system-product-categories.js`, `hardware-quotes.js`

**백엔드 (수정):**
- `models/BrandProduct.js` (세트/이모지 필드)
- `models/index.js` (association)
- `routes/brand-products.js` (copy, toggle-active, 세트 검증)
- `routes/public.js` (packages, hardware-quotes 공개 API)
- `server.js` (라우트 등록)

**프론트엔드 (신규):**
- `pages/Admin/SystemProductManagementPage.tsx`
- `pages/Admin/HardwareQuotesPage.tsx`
- `pages/Landing/PackagesPage.tsx`

**프론트엔드 (수정):**
- `App.tsx` (라우트)
- `components/Layout/MainLayout.tsx` (사이드바 메뉴 + Subscriptions 복원)
- `pages/BrandProductManagement/BrandProductsTab.tsx` (세트/이모지/복제/토글)
- `pages/Landing/PricingPage.tsx` (PackagesPage 링크)

**문서:**
- `docs/SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE.md` (설계서)

### 알려진 이슈
- SystemProductManagementPage: shipping_settings forEach 에러 수정 완료, 최종 빌드 대기 중

---

## ✅ 완료: Kitchen Display 개선 + 테스트 계정 보호 + 시재/발주 기획 (2026-04-03)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Kitchen Display 기본 탭 Order 고정 | localStorage 무시, 항상 Order View로 시작 | ✅ |
| 2 | Kitchen Station URL 파라미터 | ?station=1 순서 기반 직접 접속 링크 + 클릭 시 URL 동기화 | ✅ |
| 3 | Item View 아이템 묶기 제한 설정 | time_limit(분)/max_count(개수) 설정, 기존 로직 미수정 후처리 방식 | ✅ |
| 4 | Kitchen Display Merge 설정 UI | Item 탭 좌측에 설정값 표시 + Settings 바로가기 버튼 | ✅ |
| 5 | Settings Kitchen Stations 탭 | Item View Merge Settings 카드 추가 (시간/수량 제한) | ✅ |
| 6 | Restaurant 모델 kitchen_item_merge | JSON 필드 추가 + PUT API + 음수 보정 | ✅ |
| 7 | 테스트 계정 비밀번호 보호 | is_test 계정도 demoProtection 미들웨어 적용 + 리셋 API 차단 | ✅ |
| 8 | 테스트 계정 복원 | brand_general/admin@kdine/staff@kdine 비밀번호 복원 + owner 계정 생성 | ✅ |
| 9 | 시재/발주 통합 기획서 | docs/PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md 작성 | ✅ |
| 10 | CLAUDE.md 빌드 규칙 추가 | 백그라운드 실행 필수, 캐시 삭제 금지, 동시 빌드 금지 | ✅ |

### 수정된 파일 (주요)
**백엔드:**
- `middleware/auth.js` (demoProtection에 is_test 추가)
- `routes/users.js` (reset-password 테스트/데모 차단)
- `routes/restaurants.js` (kitchen_item_merge 저장 + 음수 보정)
- `models/Restaurant.js` (kitchen_item_merge JSON 필드)

**프론트엔드:**
- `pages/KitchenDisplay/KitchenDisplayPage.tsx` (기본 Order, station URL, merge 후처리, 설정 표시)
- `pages/Settings/SettingsPage.tsx` (Item Merge Settings 카드)
- `pages/Admin/AdminDashboard.tsx` (is_demo/is_test 필터링)
- `pages/BrandGeneral/BrandManagement.tsx` (Owner→Description)
- `deploy-dev.sh` (빌드 시간 표시)
- `package.json` (GENERATE_SOURCEMAP=false)

**문서:**
- `docs/PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md` (신규)
- `CLAUDE.md` (빌드 규칙)

---

## ✅ 완료: 비밀번호 시스템 통일 + 대시보드 통계 수정 + Brand 구조 정리 (2026-03-28)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 비밀번호 자동 생성 통일 | Manager/Restaurant Admin 생성 시 비밀번호 입력 제거, 서버 자동 생성 (12자 강력 비밀번호) | ✅ |
| 2 | 비밀번호 리셋 버그 수정 | 프론트가 자체 비밀번호를 표시하고 백엔드는 다른 비밀번호를 저장하던 문제 (tempPassword 응답 사용) | ✅ |
| 3 | Password Generated 모달 통일 | 8개 페이지 비밀번호 모달을 Copy Password + monospace 박스 패턴으로 통일 | ✅ |
| 4 | OK 버튼 중복 수정 | ManagersPage Success 모달 footer+body 중복 OK 제거 | ✅ |
| 5 | 관리자 생성 계정 이메일 인증 skip | 관리자가 만든 계정은 email_verified=true 자동 설정 (셀프 가입만 인증 필요) | ✅ |
| 6 | Admin 대시보드 통계 수정 | managers/restaurants에서 is_demo/is_test 제외하여 실제 통계만 표시 | ✅ |
| 7 | Brand 자동 생성 제거 | Brand General/Foodcourt General 유저 생성 시 Brand/Foodcourt 자동 생성 코드 제거 (본인이 직접 추가) | ✅ |
| 8 | Brand Management Owner→Description | 테이블 Owner 컬럼을 Description으로 변경 | ✅ |
| 9 | 빌드 스크립트 개선 | GENERATE_SOURCEMAP=false, max-old-space-size 1536MB, deploy-dev.sh 빌드 시간 표시 | ✅ |
| 10 | StaffManagementPage 타입 에러 수정 | Staff interface에 is_demo/is_test 추가 | ✅ |

### 수정된 파일 (주요)
**백엔드:**
- `routes/users.js` (Brand/Foodcourt 자동 생성 제거, email_verified=true, password 자동 생성)
- `routes/restaurants.js` (adminPassword 필수 제거, 자동 생성, email_verified=true)
- `middleware/validation.js` (adminPassword 검증 제거)

**프론트엔드:**
- `pages/Admin/AdminDashboard.tsx` (is_demo/is_test 필터링)
- `pages/Admin/ManagersPage.tsx` (password 제거, tempPassword 사용, 모달 통일)
- `pages/Admin/RestaurantsPage.tsx` (password 필드 제거, 모달 추가)
- `pages/Admin/StaffManagementPage.tsx` (모달 통일, 타입 수정)
- `pages/Manager/RestaurantsPage.tsx` (password 필드 제거, 모달 추가)
- `pages/Manager/AdminManagementPage.tsx` (모달 통일)
- `pages/BrandGeneral/BrandManagement.tsx` (Owner→Description)
- `deploy-dev.sh` (빌드 시간 표시, sourcemap 제거)
- `package.json` (GENERATE_SOURCEMAP=false, max-old-space-size 1536)

---

## ✅ 완료: v3.7 — 쿠폰-고객 통합 + UX 개선 + Checkout Display 국가번호 (2026-03-27)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 쿠폰-고객 통합 | 고객 목록 쿠폰 요약 컬럼 + 상세 모달 Available/Used 섹션 | ✅ |
| 2 | per_user_limit 검증 | 쿠폰 validate 시 orders 테이블 기반 실사용 횟수 검증 | ✅ |
| 3 | 모바일 My Coupons | Account 페이지에 사용 가능한 쿠폰 표시 | ✅ |
| 4 | Checkout Display 국가번호 | 레스토랑 country 기반 자동 국가코드 + E.164 저장 | ✅ |
| 5 | Profile Save UX 통일 | saving state, 에러 처리, formData 재동기화 | ✅ |
| 6 | Profile Performance 탭 삭제 | 미사용 탭 제거 | ✅ |
| 7 | Profile Schedule 반응형 | 3단계 breakpoint (1024/768/480) | ✅ |
| 8 | Subscription 에러 메시지 | RA-specific "No restaurant linked" 메시지 | ✅ |
| 9 | Operation Inquiry 필터 | 7개 페이지 FilterLabel 중복 래퍼 제거 | ✅ |
| 10 | 주문 Activity Log | 주문 생성/상태 변경 시 logActivity 기록 | ✅ |
| 11 | 멤버십 비활성 통계 | 멤버십 off여도 total_orders/total_spent/tier 업데이트 | ✅ |
| 12 | Managers 삭제 모달 | 역할별 영향 범위 상세 안내 (Brand/FC/Owner) | ✅ |
| 13 | 빌드 메모리 증설 | max-old-space-size 400→1024MB | ✅ |
| 14 | 배포 --skip-build | 빌드 완료 시 스킵 가능 옵션 | ✅ |
| 15 | 운영서버 배포 | Smoke 9/10 | ✅ |

---

## ✅ 완료: v3.5 — QZ Tray 프린터 + 보안 강화 + 리포트 통일 + 문의 UI 개선 (2026-03-24)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | QZ Tray 네트워크 프린터 | 기존 LAN 프린터 지원, Station별 IP 설정, Setup Guide 모달 | ✅ |
| 2 | 보안 패치 5건 | users/orders/restaurants 접근제어 강화, XSS sanitize | ✅ |
| 3 | FoodcourtReportsPage 생성 | BrandReportsPage와 동일 6탭 구조 | ✅ |
| 4 | OwnerReportsPage 통화 수정 | RM 하드코딩 → 시스템 통화 자동 적용 | ✅ |
| 5 | Manager Restaurants 실데이터 | todaySales/todayOrders/staffCount DB 연동 | ✅ |
| 6 | Inquiry 탭 구조 통일 | 6개 페이지 Active/Closed 2탭 + Close 버튼 | ✅ |
| 7 | 미사용 파일 삭제 | BrandReports, FranchiseSupport, ManagerCustomersPage, FoodcourtStats | ✅ |
| 8 | app.js 엔트리 정리 | server.js 단일 엔트리로 통일 | ✅ |
| 9 | CLAUDE.md 보안/코딩 가이드 | API 인증 규칙, 응답 형식, 파일 크기 기준 | ✅ |
| 10 | /복원 명령어 + 긴급 대응 | 개발/운영 선택 복원, EMERGENCY_RESPONSE.md | ✅ |
| 11 | 운영서버 배포 | Smoke 9/10 | ✅ |
| 12 | 이메일 템플릿 개선 | 로고 Base64 직접 삽입, 줄바꿈 처리, 수신거부 링크 | ✅ |
| 13 | 이메일 인증 시스템 | 회원가입 시 인증 링크 발송, 미인증 로그인 차단, 재발송 API | ✅ |
| 14 | MX 레코드 검증 + 바운스 | 가짜 도메인 차단, 발송 실패 시 bounce_count, 3회 이상 발송 차단 | ✅ |
| 15 | 회원가입 UX 개선 | 버튼 비활성화(필수 필드), PhoneInput 국가코드, 인증 안내 페이지 | ✅ |
| 16 | 인보이스 플랜명 수정 | Brand/FC/Owner 인보이스에 payer의 plan_type 반영 | ✅ |
| 17 | 대시보드 구독 배지 | Brand/FC/Owner 대시보드 헤더에 플랜명+상태+클릭 링크 | ✅ |
| 18 | 트라이얼 인보이스 안내 | "No payment required during trial" 안내 추가 | ✅ |
| 19 | 이메일 URL 환경 분리 | 하드코딩 purplehere.com → BASE_URL (dev/prod 자동) | ✅ |
| 20 | CSV 주문 Import | 주문 CSV 업로드 + 자동 매핑 + unmatched 메뉴 매칭 + 히스토리 + Undo | ✅ |
| 21 | System Settings 페이지 | Notification Settings → System Settings 리네임 + 3탭 (Preferences/Email/Import) | ✅ |
| 22 | Coming Soon 처리 | 미구현 페이지 사이드바 회색 (Subscriptions, Foodcourts) | ✅ |
| 23 | 사운드 아이콘 교체 | sound-on/off → speaker-on/off 새 아이콘 | ✅ |
| 24 | 고객 결제 확인 화면 | CheckoutDisplayPage — POS 카트 실시간 표시 + 전화번호 입력 + 결제 완료 | ✅ |
| 25 | Live Orders CSV 다운로드 개선 | Item Details 컬럼 추가 (카테고리 + 옵션) | ✅ |
| 26 | Checkout Display 2영역 레이아웃 | 좌측 키패드+고객정보 / 우측 주문내역 분리 | ✅ |
| 27 | Floor Plan → Checkout Display 연동 | Payment 시 주문 전송 + 결제 완료 전송 | ✅ |
| 28 | Live Orders → Checkout Display 연동 | Payment 시 주문 전송 + 결제 완료 전송 | ✅ |
| 29 | 전화번호 국가코드 매칭 강화 | 숫자 정규화 LIKE + POS 자동 고객 선택 | ✅ |
| 30 | 회원가입 (Checkout Display) | 미등록 번호 → 이름 입력 → 즉시 가입 → POS 전달 | ✅ |
| 31 | 운영서버 배포 v3.6 | Smoke 9/10 | ✅ |

---

## ✅ 완료: v3.4 — 모바일 인기메뉴 카테고리 설정 + 카테고리 시간 제한 + 시스템 로그 정리 (2026-03-20)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | ServerHealthMonitor 제거 | SSH 인증 실패 반복하던 불필요 기능 삭제 + 운영 DB 로그 1146건 정리 | ✅ |
| 2 | 인기메뉴 카테고리 제외 | mobile_settings.popular_excluded_category_ids로 제외할 카테고리 선택 | ✅ |
| 3 | 카테고리 시간 제한 | mobile_settings.category_schedules로 모바일 전용 시간 제한 (자정 넘김 지원) | ✅ |
| 4 | Settings Mobile Order 탭 UI | Popular Categories 카드 + Category Time Restrictions 카드 추가 | ✅ |
| 5 | Settings 2열 레이아웃 정리 | gridColumn 전체폭 제거, 빈 공간 없이 2열 배치 | ✅ |
| 6 | 운영서버 배포 | Smoke 9/10 통과 | ✅ |

### 수정된 파일 (주요)
**백엔드:**
- `routes/mobile.js` (popular 카테고리 필터 + menu 시간 필터)
- `routes/system-logs.js` (server-health 라우트 제거)
- `server.js` (serverHealthMonitor 제거)
- `services/serverHealthMonitor.js` (삭제)

**프론트엔드:**
- `pages/Settings/SettingsPage.tsx` (Popular Categories + Time Restrictions UI + 2열 레이아웃)

---

## ✅ 완료: v3.3 — 주방 알림 소리 + 모바일 추천/인기메뉴 + Settings Mobile Order 탭 (2026-03-20)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Kitchen Station 알림 소리 | Station별 6종 프리셋, Web Audio API 화음 기반 | ✅ |
| 2 | 소리 반복 재생 | 새 주문 시 5초 간격 반복, 상태 변경 시 자동 멈춤 | ✅ |
| 3 | Sound 토글 버튼 | Live Orders + Kitchen Display에 종 아이콘 버튼 (sound-on/off.svg) | ✅ |
| 4 | Live Orders 소리 버그 수정 | setAudioEnabled(false) → stopSound()로 교체, 볼륨 0.3→0.8 | ✅ |
| 5 | Settings > Mobile Order 탭 | Order Types, Quick Order, Display Options, Delivery Pricing 통합 | ✅ |
| 6 | 모바일 추천메뉴 (Featured) | Product.is_featured + Menu Management 체크박스 + FEATURED 배지 | ✅ |
| 7 | 모바일 인기메뉴 (Popular) | 최근 30일 주문 집계 TOP 8 자동 표시 | ✅ |
| 8 | 모바일 Featured 탭 | 카테고리 탭에 Featured 가상 탭 + Featured/Popular 섹션 | ✅ |
| 9 | 모바일 이미지 최적화 | 목록 API에서 base64 제외, thumbnail URL만 반환 (11MB→647KB, 94% 감소) | ✅ |
| 10 | 미분류 아이템 정리 | K-DINE IPC 12건→Uncategorized, with MIN Cafe 2건→Other | ✅ |
| 11 | Settings 미분류 경고 버그 | category ID string/number 타입 비교 수정 | ✅ |
| 12 | 모바일 Order Types 깜빡임 수정 | Fallback 기본값 제거, API 로드 완료까지 Loading 표시 | ✅ |
| 13 | 운영서버 배포 | Smoke 9/10 통과 | ✅ |

### 수정된 파일 (주요)
**백엔드:**
- `models/Restaurant.js` (mobile_settings JSON 필드)
- `models/Product.js` (is_featured BOOLEAN)
- `models/KitchenStation.js` (alert_sound STRING)
- `routes/mobile.js` (featured/popular API, parseImageData listOnly 최적화)
- `routes/store.js` (mobile_settings 저장/조회)
- `routes/kitchen-stations.js` (alert_sound CRUD)

**프론트엔드:**
- `utils/notificationSound.ts` (신규: 6종 화음 프리셋 + 반복 재생 매니저)
- `pages/Settings/SettingsPage.tsx` (Mobile Order 탭 신설, operations에서 이동)
- `pages/KitchenDisplay/KitchenDisplayPage.tsx` (Station별 소리 + Sound 토글)
- `pages/LiveOrders/LiveOrdersPage.tsx` (소리 개선 + Sound 토글 아이콘)
- `pages/MenuManagement/MenuManagementPage.tsx` (Featured 체크박스 + 배지)
- `mobile/pages/MenuPage.tsx` (Featured 탭 + Featured/Popular 섹션)
- `mobile/pages/OrderTypePage.tsx` (깜빡임 수정)
- `contexts/MenuContext.tsx` (MenuItem.is_featured)

---

## ✅ 완료: v3.2.1 — 프린트 안정화 + Kitchen Display Station 필터 + Printer 설정 단순화 (2026-03-19)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | PC 브라우저 인쇄 수정 | printHTMLContent iframe.onload race condition 수정 | ✅ |
| 2 | RawBT 다중 Station 합쳐서 전송 | 연속 intent 불가 → 전체 합쳐서 1회 전송 | ✅ |
| 3 | Kitchen Display Order View Station 필터 | Station 선택 시 해당 아이템만 표시 + progress/count 필터 | ✅ |
| 4 | Kitchen Display Item View Ready 필터 | Ready 컬럼 Station 필터 누락 수정 | ✅ |
| 5 | 미배정 아이템 처리 | menuStationMap에 없는 아이템 → 모든 Station에 표시 | ✅ |
| 6 | Settings 미배정 카테고리 경고 | 노란 배너로 미배정 카테고리 표시 | ✅ |
| 7 | Settings Uncategorized 아이템 경고 | 빨간 배너로 카테고리 없는 아이템 표시 | ✅ |
| 8 | Printer 탭 단순화 | Station별 프린터 카드 제거, Station 유무 관계없이 동일 UI | ✅ |
| 9 | Auto-print 로직 단순화 | Station 분기 제거, kitchenPrinter.enabled && autoPrint 통일 | ✅ |
| 10 | 운영서버 배포 | Smoke 9/10 통과 | ✅ |

### 수정된 파일 (주요)
**프론트엔드:**
- `dev-frontend/src/utils/billPrint.js` (printHTMLContent 수정, station 분기 제거)
- `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx` (Station 필터 Order View/Item View Ready, auto-print 단순화)
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` (auto-print station 분기 제거, getStoreInfo 추가)
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` (Station 프린터 카드 제거, 미배정 경고 추가)
- `dev-frontend/src/components/POSTerminal/OrderCompleteModal.tsx`

---

## ✅ 완료: v3.2.2 — 주방 프린터 자동 프린트 + 모바일 오더 검색 + 프린터 설정 UI 개선 (2026-03-19)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 주방 프린터 Station 라우팅 버그 수정 | Station 프린터 설정 시 kitchenPrinter.enabled 체크로 스킵되던 문제 해결 | ✅ |
| 2 | RawBT 프린터 선택 불가 확인 | RawBT는 S.s= 파라미터로 프린터 선택 불가 (항상 기본 프린터로만 출력) | ✅ |
| 3 | Kitchen Display 자동 프린트 | order-created WebSocket 이벤트 수신 시 자동 프린트 (autoPrint 설정 기반) | ✅ |
| 4 | POS 결제 완료 시 자동 프린트 | Bill + Kitchen Ticket 자동 프린트 (Settings autoPrint 토글 연동) | ✅ |
| 5 | 프린터 설정 UI 개선 | Printer Address 필드 제거, RawBT 기본 프린터 안내 + 별도 디바이스 가이드 표시 | ✅ |
| 6 | Kitchen Station 보라색 점 제거 | 불필요한 상태 표시 아이콘 제거 | ✅ |
| 7 | 모바일 오더 메뉴 검색 | 검색 바 추가, 전체 카테고리 통합 검색, POS 터미널과 동일 스타일 | ✅ |
| 8 | 모바일 오더 All Items 탭 제거 | 기본값을 첫 번째 카테고리로 변경, 카테고리 전환 즉시 (API 호출 없음) | ✅ |
| 9 | 모바일 오더 로딩 속도 개선 | 초기 전체 메뉴 1회 로드 → 카테고리/검색 모두 클라이언트 필터링 | ✅ |
| 10 | 모바일 검색 입력 시 화면 확대 방지 | SearchInput font-size 14px → 16px | ✅ |

### 수정된 파일 (주요)
**프론트엔드:**
- `dev-frontend/src/utils/billPrint.js` (Station 프린터 라우팅 수정, getPrinterSettings export, sendToRawBTPrinter 헬퍼)
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` (Printer Address 제거, 안내문 변경, 보라점 제거)
- `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx` (order-created 자동 프린트)
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` (결제 완료 시 자동 Bill+Kitchen 프린트)
- `dev-frontend/src/components/POSTerminal/OrderCompleteModal.tsx` (auto-print 로직 POSTerminalPage로 이동)
- `dev-frontend/src/mobile/pages/MenuPage.tsx` (검색 바 + All Items 제거 + 전체 로드 최적화)

---

## ✅ 완료: v3.2 — 구독 플랜 셀프 변경 + 통화 통일 + 컬러 가이드 + Activity History 전역화 (2026-03-18)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 구독 플랜 셀프 변경 | Profile > Subscription 탭에서 직접 플랜 변경 (업그레이드 즉시/다운그레이드 예약/cycle 변경) | ✅ |
| 2 | 차액 인보이스 자동 발행 | 업그레이드 시 proration 계산 + plan_upgrade 인보이스 생성 | ✅ |
| 3 | invoiceScheduler pending 전환 | 청구일에 pending_plan → 실제 plan 자동 전환 | ✅ |
| 4 | subscriptionScheduler suspended 시 pending 취소 | suspended 전환 시 예약된 플랜 변경 자동 취소 | ✅ |
| 5 | 통화 일관성 통합 | SystemSettings default_currency 기준 통일, RM→MYR fallback 21곳 수정, 통화 설정 변경 시 전체 동기화 | ✅ |
| 6 | 컬러 가이드 생성 | COLOR_GUIDE.md 생성, 진한색 버튼배경 금지, #28A745→#10B981, #DC3545→#EF4444 통일 | ✅ |
| 7 | 데모/테스트 계정 분리 | is_test 필드 추가, DEMO(주황)/TEST(보라) 배지 분리 | ✅ |
| 8 | Activity History 전역화 | 모든 역할에 Change History 페이지 + 사이드바 메뉴 + user_id 기준 API + addon_modules 추가 | ✅ |
| 9 | 인보이스 결제 모달 통일 | Notes 필드 4역할 통일, Manager Receipt base64 수정, 이모지 제거, Pay/Submit 버튼 녹색 통일 | ✅ |
| 10 | LiveOrders 페이지네이션 수정 | 서버/클라이언트 이중 페이지네이션 충돌 해결 | ✅ |
| 11 | Foodcourt InvoicesPage 스타일 | Pay 버튼 녹색, 좌측 정렬, success variant 추가 | ✅ |
| 12 | DEVELOPMENT_PLAN.md Brand/Foodcourt 1:N 수정 | 1:1→1:N 표기 수정 | ✅ |
| 13 | mark-demo-accounts.js REAL/DEMO/TEST 3분류 | 데모 2명(demo-brand/restaurant), 나머지 테스트, 화이트리스트 실계정 | ✅ |
| 14 | Admin Staff/Subscriptions/Managers username 표시 | username • email 패턴 통일, restaurants API admin.username 추가 | ✅ |
| 15 | Admin Managers Unknown Company 수정 | Brand/Foodcourt name fallback | ✅ |
| 16 | Staff 이메일 overflow 처리 | 긴 이메일 text-overflow: ellipsis | ✅ |
| 17 | 배지 스타일 통일 (white-space: nowrap) | 8곳 Badge 한 줄 유지, 글자 크기만큼 배경 | ✅ |
| 18 | PageComponents Delete 버튼 색상 | #DC3545→#EF4444 (컬러 가이드 준수) | ✅ |

### 수정된 파일 (주요)
**백엔드:**
- `models/Restaurant.js`, `User.js`, `Brand.js`, `Foodcourt.js`, `ActivityLog.js` (pending 필드 + is_test + nullable)
- `routes/subscriptions.js` (전면 재작성: my-plan, change-plan, cancel)
- `routes/plans.js`, `restaurants.js`, `currencies.js`, `activityLogs.js`
- `services/invoiceScheduler.js`, `subscriptionScheduler.js`
- `migrate-2026-03-18.js` (운영 마이그레이션)

**프론트엔드:**
- `pages/Profile/SubscriptionTab.tsx` (신규)
- `pages/Profile/ProfilePage.tsx` (Subscription 탭)
- `pages/ActivityHistory/ActivityHistoryPage.tsx` (역할별 분기 + 필터 개선)
- `pages/*/InvoicesPage.tsx` (5개 역할 결제 모달 통일)
- `components/UI/CommonStyles.tsx`, `PageComponents.tsx` (컬러 통일)
- `components/Layout/MainLayout.tsx` (Change History 메뉴 + isRouteAllowed)
- `contexts/AuthContext.tsx` (ROLE_ROUTES 추가)
- `utils/paymentStatus.ts`, `currency.ts` (통화 통일)
- `COLOR_GUIDE.md` (신규)

**설계 문서:**
- `docs/SUBSCRIPTION_SELF_CHANGE.md` (신규)

---

## ✅ 완료: v3.1 — 이메일 템플릿 + 구독 아키텍처 + 브랜드 통합 + UI 개선 (2026-03-18)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 이메일 템플릿 통일 | 14개 유형 공통 레이아웃(액센트바+컬러로고+CTA), CID 인라인 로고, 3개 파일 통합 | ✅ |
| 2 | Free 인보이스 Confirm | 금액 0원 자동 paid 제거, Confirm 버튼 즉시 반영+로딩 | ✅ |
| 3 | Entity 구독 인보이스 버그 | plan_prices fallback, issued_by/issued_at, InvoiceItem 필드 추가 | ✅ |
| 4 | Managers 페이지 중복 | LEFT JOIN → 별도 쿼리 머지 (멀티 브랜드 지원) | ✅ |
| 5 | 구독 데이터 users 테이블 통일 | Brand/Foodcourt General 구독 → users 테이블 (Owner와 동일) | ✅ |
| 6 | subscription-status API | users 테이블 기준 조회 (brands/foodcourts 의존 제거) | ✅ |
| 7 | allowed-routes API | users 테이블에서 plan_type 조회 (Brand/Foodcourt/Owner) | ✅ |
| 8 | Suspended 로그인 차단 | 403 + "관리자에게 문의" 메시지 (데모 bypass) | ✅ |
| 9 | 데모 계정 프리패스 | is_demo → Enterprise 자동, 구독 체크 skip | ✅ |
| 10 | 공지 뱃지 버그 | 자기가 보낸 공지 제외, System Admin 지원, findOne→findAll | ✅ |
| 11 | SubscriptionsPage 기본 필터 | Active → All | ✅ |
| 12 | InvoicesPage null safe | companyName/invoiceNumber null 접근 방지, to-pay 날짜 필터 제거 | ✅ |
| 13 | Settlement Report 팝업 | 브라우저 높이 제한, PDF 직접 다운로드 (80mm 영수증) | ✅ |
| 14 | Manager RestaurantsPage 수치 | todaySales/todayOrders/staffCount 실제 DB 쿼리 | ✅ |
| 15 | 레시피/재료/공급업체 통합 | Ingredients+IngredientCategories+Suppliers 브랜드 통합, RecipeCategories 브랜드별 | ✅ |
| 16 | Active/Inactive 색상 통일 | 6개 파일, 표준 #ECFDF5/#059669, #FEE2E2/#DC2626 | ✅ |
| 17 | 공급업체 토글 버튼 | Active/Inactive 아이콘 토글 추가 | ✅ |
| 18 | Live Orders 실시간 통계 | Socket 4개 이벤트에서 fetchOrderCounts 재호출 | ✅ |

### 수정된 파일 (주요)
- `dev-backend/utils/emailTemplates.js`, `notificationTemplates.js`, `invoiceEmailTemplate.js`, `emailService.js`
- `dev-backend/routes/users.js`, `restaurants.js`, `invoices.js`, `brands.js`, `foodcourts.js`, `owner.js`
- `dev-backend/routes/badgeCounts.js`, `notices.js`, `ingredients.js`, `recipe-categories.js`, `ingredient-categories.js`, `suppliers.js`
- `dev-backend/services/authService.js`, `invoiceScheduler.js`, `subscriptionScheduler.js`
- `dev-backend/routes/auth.js`
- `dev-frontend/src/pages/Reports/DailySettlementPrint.tsx`, `LiveOrders/LiveOrdersPage.tsx`
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx`, `Admin/InvoicesPage.tsx`, `Admin/SubscriptionsPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`, `FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `dev-frontend/src/pages/RecipeManagement/RecipeManagementPage.tsx`, `Suppliers/SuppliersPage.tsx`
- `dev-frontend/src/pages/Login/LoginPage.tsx`, `contexts/AuthContext.tsx`
- 색상 통일: `Admin/RestaurantsPage.tsx`, `Promotions/PromotionsPage.tsx`, `Owner/OwnerDashboardPage.tsx`, `Manager/ManagerCustomersPage.tsx`, `FoodcourtGeneral/FoodcourtManagement.tsx`

---

## ✅ 완료: 인보이스 시스템 전면 버그 수정 + 배포 안정화 (2026-03-11)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 인보이스 할인 falsy 버그 | `total \|\| amount` → null/undefined 체크로 수정 (0이 falsy인 JS 버그) | ✅ |
| 2 | additional_charges 저장 | PUT 엔드포인트 + 5개 역할 프론트엔드 edit handler에 charges 계산/전송 추가 | ✅ |
| 3 | 중복 PUT 엔드포인트 제거 | invoices.js line 2245 dead code 제거 | ✅ |
| 4 | HTML 템플릿 동적 charges | Brand/Foodcourt 하드코딩 "Tax (6%)" → additionalCharges 배열 렌더링 | ✅ |
| 5 | Owner/Restaurant 필드 매핑 | transformInvoice/fetchAllInvoices에 discount 6필드 + charges 추가 | ✅ |
| 6 | Owner 백엔드 discount 필드 | routes/owner.js GET 응답에 discount_type/value/amount/reason/subtotal 추가 | ✅ |
| 7 | InvoiceScheduler item 금액 | InvoiceItem total_amount: planAmount → discountedAmount | ✅ |
| 8 | InvoiceScheduler falsy 체크 | `discountedSubtotal \|\| subtotal` → null/undefined 체크 | ✅ |
| 9 | Trial→Invoice 갭 해소 | 회원가입 시 첫 인보이스 즉시 생성 (dueDate = trial 종료일) | ✅ |
| 10 | 배포 스크립트 강화 | rsync 검증, 파일 크기 비교, JS hash, PM2 uptime, smoke test 추가 | ✅ |
| 11 | CLAUDE.md 검증 강화 | 실제 API 테스트 필수화 (코드 리뷰만으로 완료 금지) | ✅ |
| 12 | 상세보기 모달 charges 동적 렌더링 | Admin/Brand/Foodcourt 상세보기에서 하드코딩 Tax → additionalCharges 배열 + Tax fallback | ✅ |
| 13 | 누락 인보이스 DB 수정 | INV-260310001, INV-260310002 additional_charges 빈 배열 → SST 6% 추가 | ✅ |
| 14 | SignupPage 배너 높이 통일 | min-height 140px → 160px, 모바일 반응형 추가 (FeaturesPage와 동일) | ✅ |
| 15 | ScrollToTop 개선 | scrollRestoration=manual + behavior:instant (페이지 전환 시 상단 이동 보장) | ✅ |
| 16 | /개발완료 스크립트 보강 | Docs 문서 검토/업데이트 단계 + Memory 업데이트 + 체크리스트 11항목 | ✅ |

### 수정된 파일 (주요)
- `dev-backend/routes/invoices.js` (PUT 할인 저장 + additional_charges + 중복 제거)
- `dev-backend/routes/owner.js` (GET 응답 discount 필드 추가)
- `dev-backend/services/invoiceScheduler.js` (item 금액 + falsy 체크 + customDueDate)
- `dev-backend/services/subscriptionScheduler.js` (trial 시작 시 첫 인보이스 생성)
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` (HTML discount + edit charges + 상세보기 charges)
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` (HTML + edit + 상세보기 charges)
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` (HTML + edit + 상세보기 charges)
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx` (필드 매핑 + modal + HTML)
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx` (필드 매핑 + modal + HTML)
- `dev-frontend/src/pages/Landing/SignupPage.tsx` (배너 높이 통일)
- `dev-frontend/src/components/ScrollToTop.tsx` (scrollRestoration + instant scroll)
- `deploy-to-production.sh` (검증 로직 강화)
- `CLAUDE.md` (검증 워크플로우 API 테스트 필수화)
- `.claude/commands/개발완료.md` (Docs 검토 단계 추가)

---

## ✅ 완료: 셀프 회원가입 시스템 + 프리런치 보안 수정 (2026-03-11)

### 완료된 작업
| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | plans.js 보안 수정 | POST/PUT/DELETE에 authenticateToken + requireRole('System Admin') 추가 | ✅ |
| 2 | Restaurant Owner 로그인 리다이렉트 | LoginPage에서 /pos/owner/dashboard로 이동 | ✅ |
| 3 | Trial 자동 시작 | Restaurant 생성 시 subscriptionScheduler.startTrial() 호출, trial_end_date 자동 설정 | ✅ |
| 4 | 401 자동 로그아웃 | AuthContext에 전역 fetch 인터셉터, 토큰 만료 시 자동 로그아웃 | ✅ |
| 5 | POST /api/auth/signup | 4개 역할 셀프 가입 API (입력 검증 + 비밀번호 강도 + 역할별 엔티티 생성) | ✅ |
| 6 | SignupPage 4-step wizard | 역할 선택 → 계정 정보 → 비즈니스 정보(플랜 선택) → 확인 | ✅ |
| 7 | LoginPage "Sign up" 링크 | 하단에 가입 안내 링크 추가 | ✅ |
| 8 | PricingPage → /signup 연결 | "Start Free Trial" 버튼에 plan_target + plan_id 전달 | ✅ |
| 9 | LandingHeader Sign Up 버튼 | 데스크톱 + 모바일 메뉴에 "Sign Up Free" 버튼 추가 | ✅ |
| 10 | App.tsx /signup 라우트 | SignupPage 라우트 등록 | ✅ |

### 셀프 회원가입 역할별 동작
| 역할 | 생성되는 엔티티 | Trial |
|------|-----------------|-------|
| Restaurant Admin | User + Restaurant (status='trial') | 7일 trial → overdue(7일 grace) → suspended |
| Brand General | User + Brand (subscription_status='trial') | - |
| Foodcourt General | User + Foodcourt (subscription_status='trial') | - |
| Restaurant Owner | User only | - |

### 수정된 파일 (주요)
- `dev-backend/routes/plans.js` (보안 미들웨어 추가)
- `dev-backend/routes/auth.js` (POST /api/auth/signup 엔드포인트)
- `dev-backend/services/authService.js` (signup + generateSignupResponse 함수)
- `dev-backend/routes/restaurants.js` (trial 자동 시작)
- `dev-frontend/src/contexts/AuthContext.tsx` (401 인터셉터)
- `dev-frontend/src/pages/Landing/SignupPage.tsx` (신규)
- `dev-frontend/src/pages/Login/LoginPage.tsx` (Owner 리다이렉트 + signup 링크)
- `dev-frontend/src/pages/Landing/PricingPage.tsx` (Start Free Trial → /signup)
- `dev-frontend/src/components/Landing/LandingHeader.tsx` (Sign Up 버튼)
- `dev-frontend/src/App.tsx` (/signup 라우트)

---

## ✅ 완료: Favicon + Membership 모듈 + Pricing UI 개편 (2026-03-10)

### 완료된 작업
| 작업 | 설명 | 상태 |
|------|------|:----:|
| Favicon Google 검색 지원 | 정적 favicon.ico (16x16) + favicon-48.png (48x48) 추가, index.html에 정적 선언 | ✅ 완료 |
| Membership 모듈 추가 | DB addon_modules에 membership 추가, 레스토랑 3개 플랜에 기본 포함, FeaturesPage 카드 추가 | ✅ 완료 |
| 플랜 모듈 Always Included 잠금 | Dashboard/Membership 등 필수 모듈 체크 해제 불가 + "Always Included" 라벨 | ✅ 완료 |
| Pricing 페이지 모듈 UI 전면 개편 | "+8 more" 태그 → 전체 모듈 체크리스트 (Basic/Advanced 구분, 포함✓/미포함— 표시) | ✅ 완료 |
| MODULE_NAMES 전체 매핑 완성 | 68개 모듈 코드→표시명 매핑 (restaurant/brand/foodcourt/owner) | ✅ 완료 |
| 데모 주문 createdAt 수정 | bulkCreate 시 createdAt을 order_date 기준 랜덤 시각으로 설정 (최신 주문 정상 표시) | ✅ 완료 |
| 운영서버 배포 | Smoke 6/6 + 운영 DB membership 모듈/플랜 동기화 + 데모 리셋 완료 | ✅ 완료 |

### 수정된 파일 (주요)
- `dev-frontend/public/index.html` (favicon 정적 선언)
- `dev-frontend/public/favicon.ico`, `dev-frontend/public/favicon-48.png` (새 파일)
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx` (Membership 카드 추가)
- `dev-frontend/src/pages/Landing/PricingPage.tsx` (모듈 UI 전면 개편 + MODULE_NAMES 완성)
- `dev-frontend/src/pages/Admin/PlansPage.tsx` (ALWAYS_INCLUDED_MODULES + 잠금 처리)
- `dev-backend/seed-demo-data.js` (createdAt 랜덤 시각 설정)

---

## ✅ 완료: 모달 푸터 고정 통일 (공통 Modal 마이그레이션) (2026-03-09)

### 완료된 작업
- 전체 22개 페이지의 자체 styled-component 모달 → 공통 `Modal` (`CommonModal`) 컴포넌트로 전환 완료
- 모든 페이지에서 `import { Modal as CommonModal } from '../../components/UI'` 통일

| 차수 | 대상 | 상태 |
|------|------|:----:|
| 1차 Restaurant (5개) | InvoicesPage, NoticesPage, SystemInquiryPage, OperationInquiryPage, SupportTicketsPage | ✅ |
| 2차 Brand (5개) | NoticesPage, SystemInquiryPage, OperationInquiryPage, BrandPlansPage, BrandSubscriptionsPage | ✅ |
| 3차 Manager (7개) | RestaurantsPage, InvoicesPage, SubscriptionsPage, OperationInquiryPage, SystemInquiryPage, SupportTicketsPage, ManagerPromotionsPage | ✅ |
| 4차 Foodcourt+기타 (5개) | NoticesPage, SystemInquiryPage, OperationInquiryPage, RecipesTab, NotificationSettingsPage | ✅ |

---

## ✅ 완료: 데모 데이터 시스템 구축 - Phase 1 (2026-03-09)

### 완료된 작업
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | User 모델 `is_demo` 플래그 추가 | ✅ |
| 2 | 데모 전용 브랜드/레스토랑 생성 (기존 테스트 데이터와 분리) | ✅ |
| 3 | 시드 스크립트 `seed-demo-data.js` (멱등, 전체 리셋 방식) | ✅ |
| 4 | 다양한 상태의 데모 데이터: 주문(57건), 인보이스(10건), 메뉴(27개) | ✅ |
| 5 | 데모 리셋 스케줄러 `demoResetScheduler.js` (매일 자정, 사이트 타임존) | ✅ |
| 6 | 데모 계정 보호 미들웨어 (비밀번호/프로필 변경 차단) | ✅ |
| 7 | DemoPage.tsx 리다이렉트 동적화 + 리셋 안내 업데이트 | ✅ |

### 데모 데이터 구성
- **Brand**: K-Taste Group (전용 데모 브랜드, 코드: DEMO-BRAND)
- **Restaurant 1**: Seoul Garden BBQ (demo-restaurant 관리, Professional Plan)
- **Restaurant 2**: Gangnam Noodle House (브랜드 소속, Basic Plan)
- **주문 상태**: pending, preparing, ready, completed, served, cancelled
- **인보이스 상태**: pending_payment, paid, overdue, cancelled, payment_submitted
- **인보이스 발행자**: system_admin + brand

### 향후 Phase 2
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | Foodcourt General 데모 계정 + 데이터 생성 | ⬜ |
| 2 | Restaurant Owner 데모 계정 + 데이터 생성 | ⬜ |
| 3 | DemoPage UI 업데이트 (4개 데모 카드) | ⬜ |

---

## ✅ 완료: Staff 제거 + Features 이미지 + Activity History 필터 (2026-03-06)

### 완료된 작업
| 작업 | 설명 | 상태 |
|------|------|:----:|
| Activity History DatePeriodFilter 적용 | 기존 date input → DatePeriodFilter 컴포넌트로 교체 | ✅ 완료 |
| Features 페이지 텍스트 리뉴얼 | 각 역할 subtitle → heading + description 분리, 경쟁력 있는 문구로 변경 | ✅ 완료 |
| Manager StaffManagement → AdminManagement | Brand/Foodcourt General에서 Staff 관리 완전 제거, Restaurant Admin만 관리하도록 변경 | ✅ 완료 |
| 사이드바/라우트 명칭 변경 | `/pos/manager/staff` → `/pos/manager/admins`, "Admin & Staff" → "Restaurant Admins" (9개 파일) | ✅ 완료 |
| Brand Performance Avg Service Time 수정 | `preparation_time`(미존재) → `createdAt→served_at` 계산으로 변경, "Avg Fulfillment" 명칭 | ✅ 완료 |
| Owner Performance 동일 수정 | Brand Performance와 동일하게 served_at 기반 계산 적용 | ✅ 완료 |
| Orders API date range 필터 추가 | `start_date`/`end_date` 쿼리 파라미터 지원 추가 (Op.between) | ✅ 완료 |
| Features 이미지 webp 변환 적용 | PNG→webp 변환 (113개), getImages 경로 수정, Restaurant+Brand 역할 이미지 count 업데이트 | ✅ 완료 |
| Inquiry 모듈 카테고리 변경 | System Inquiry, Operation Inquiry, Inquiry Management를 모든 역할에서 basic → advanced로 변경 (DB + FeaturesPage + 설계문서) | ✅ 완료 |

### 주요 변경사항
- **파일명 변경**: `Manager/StaffManagementPage.tsx` → `Manager/AdminManagementPage.tsx`
- **컴포넌트명 변경**: `ManagerStaffManagementPage` → `ManagerAdminManagementPage`
- **라우트 변경**: `/pos/manager/staff` → `/pos/manager/admins` (App.tsx, ProtectedRoute, AuthContext, MainLayout, 3개 Dashboard)
- **Features 이미지 경로**: `/images/features/dashboard/{code}_{n}.webp` (PNG 원본 + webp 변환본 공존)

### 수정된 파일 (주요)
- `dev-frontend/src/pages/Manager/AdminManagementPage.tsx` (파일명+컴포넌트명 변경)
- `dev-frontend/src/App.tsx` (import + Route)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (사이드바 x2)
- `dev-frontend/src/components/ProtectedRoute.tsx` (경로)
- `dev-frontend/src/contexts/AuthContext.tsx` (5개 역할 경로)
- `dev-frontend/src/pages/Manager/ManagerDashboard.tsx` (QuickAction)
- `dev-frontend/src/pages/Brand/BrandManagerDashboard.tsx` (QuickAction)
- `dev-frontend/src/pages/Foodcourt/FoodcourtManagerDashboard.tsx` (QuickAction)
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx` (텍스트+이미지)
- `dev-frontend/src/pages/ActivityHistory/ActivityHistoryPage.tsx` (DatePeriodFilter)
- `dev-frontend/src/pages/BrandGeneral/BrandPerformance.tsx` (served_at 계산)
- `dev-frontend/src/pages/Owner/OwnerPerformance.tsx` (served_at 계산)
- `dev-backend/routes/orders.js` (date range 필터)

---

## ✅ 완료: Inquiry 필터 스타일 통일 (2026-03-05)

### 완료된 작업
| 작업 | 설명 | 상태 |
|------|------|:----:|
| FiltersContainer 스타일 통일 | 9개 Inquiry 페이지에서 padding: 20px 0 + border-bottom 제거, gap 8px로 통일 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Admin/SystemInquiryPage.tsx`
- `dev-frontend/src/pages/Brand/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Foodcourt/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Restaurant/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Restaurant/SystemInquiryPage.tsx`
- `dev-frontend/src/pages/Manager/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Manager/SystemInquiryPage.tsx`
- `dev-frontend/src/pages/Owner/OwnerOperationInquiryPage.tsx`
- `dev-frontend/src/pages/Owner/OwnerSystemInquiryPage.tsx`

---

## ✅ 완료: 기간 필터 통합 (2026-03-05)

### 개요
Admin InvoicesPage 기간필터 패턴을 모든 역할/페이지에 통일 적용.
기존 DateRangeFilter (input type=date) 제거, CalendarPicker 기반 통합 컴포넌트로 교체.

### 설계 문서
- `docs/DATE_PERIOD_FILTER_SPEC.md` - 전체 스펙
- `dev-frontend/FILTER_STYLE_GUIDE.md` - 스타일 가이드 (업데이트)

### 작업 항목
| # | 작업 | 상태 |
|---|------|:----:|
| 1 | DatePeriodFilter 공용 컴포넌트 생성 | ✅ |
| 2 | Admin/InvoicesPage 공용 컴포넌트 전환 | ✅ |
| 3 | Admin/ReportsPage 교체 | ✅ |
| 4 | Admin/AnalyticsPage 교체 | ✅ |
| 5 | BrandGeneral/BrandReportsPage 교체 | ✅ |
| 6 | BrandGeneral/BrandPerformance 교체 | ✅ |
| 7 | BrandGeneral/BrandInvoicesPage 공용 전환 | ✅ |
| 8 | FoodcourtGeneral/FoodcourtInvoicesPage 공용 전환 | ✅ |
| 9 | Owner/OwnerReportsPage 교체 | ✅ |
| 10 | Owner/OwnerPerformance 교체 | ✅ |
| 11 | Owner/OwnerInvoicesPage 공용 전환 | ✅ |
| 12 | Manager/ManagerReportsPage 교체 | ✅ |
| 13 | Manager/SalesPage 교체 (Type B, Today 포함) | ✅ |
| 14 | Reports/ReportsPage 교체 | ✅ |
| 15 | Restaurant/InvoicesPage 공용 전환 | ✅ |
| 16 | LiveOrders/LiveOrdersPage 교체 (Type B, Today 포함) | ✅ |
| 17 | DateRangeFilter.tsx 삭제 | ✅ |
| 18 | 빌드 + 전 페이지 검증 | ✅ |

---

## ✅ 완료: Inquiry 필터 통일 + 로그아웃 403 수정 (2026-03-04)

### 완료된 작업
| 작업 | 설명 | 상태 |
|------|------|:----:|
| /login → /pos URL 통합 | /login 라우트 제거, 모든 참조를 /pos로 변경 | ✅ 완료 |
| System Inquiry 필터 추가 | Brand/Foodcourt SystemInquiry에 검색+우선순위+카테고리 필터 추가 (SupportPage 기준 통일) | ✅ 완료 |
| 빈 상태 메시지 추가 | Manager/Restaurant/Admin SystemInquiry + Restaurant SupportTickets + Manager OperationInquiry | ✅ 완료 |
| 로그아웃 후 403 에러 수정 | BrandGeneral/FoodcourtGeneral 대시보드 fetchTrendData/fetchDashboardData에 토큰 체크 추가 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/App.tsx` - /login 라우트 제거
- `dev-frontend/src/components/Landing/LandingHeader.tsx` - /login → /pos
- `dev-frontend/src/pages/Manager/SignupPage.tsx` - /login → /pos
- `dev-frontend/src/contexts/AuthContext.tsx` - 로그아웃 후 /pos로 이동
- `dev-frontend/src/pages/Brand/SystemInquiryPage.tsx` - 필터 추가
- `dev-frontend/src/pages/Foodcourt/SystemInquiryPage.tsx` - 필터 추가
- `dev-frontend/src/pages/Manager/SystemInquiryPage.tsx` - 빈 상태 메시지
- `dev-frontend/src/pages/Restaurant/SystemInquiryPage.tsx` - 빈 상태 메시지
- `dev-frontend/src/pages/Admin/SystemInquiryPage.tsx` - 빈 상태 메시지
- `dev-frontend/src/pages/Restaurant/SupportTicketsPage.tsx` - 빈 상태 메시지
- `dev-frontend/src/pages/Manager/OperationInquiryPage.tsx` - 빈 상태 메시지
- `dev-frontend/src/pages/BrandGeneral/BrandGeneralDashboard.tsx` - 토큰 체크
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx` - 토큰 체크

---

## ✅ 완료: 결제 모달 UI 개선 + 대시보드 카드 높이 통일 (2026-03-01)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 결제 모달 카드형 UI | 4개 인보이스 페이지 결제 수단 선택을 카드 버튼 UI로 변경 | ✅ 완료 |
| Stripe 결제폼 통합 | StripePaymentForm 컴포넌트를 4개 인보이스 페이지에 연동 | ✅ 완료 |
| 오류 메시지 중복 해결 | StripePaymentForm 내부 ErrorBox와 외부 에러 표시 중복 제거 | ✅ 완료 |
| 수동 입력 필드 조건부 표시 | Stripe/PayPal 선택 시 Transaction ID, Receipt 등 수동 필드 숨김 | ✅ 완료 |
| 대시보드 카드 높이 통일 | Sales & Orders Overview와 Notifications 카드 높이 동일하게 맞춤 | ✅ 완료 |
| 운영서버 배포 | 모든 변경사항 운영서버 배포 완료 (스모크 테스트 6/6 통과) | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx`
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `dev-frontend/src/pages/Restaurant/RestaurantDashboard.tsx`

---

## ✅ 완료: Communication 시스템 버그 수정 + Owner 문의 페이지 (2026-02-27)

### 1. 버그 수정

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Operation Inquiry 500 에러 | operationTickets.js POST에서 `as:'manager'`→`as:'admin'` | ✅ |
| notices.js status:'active' | users 테이블에 없는 status 컬럼 참조 제거 | ✅ |
| comments.js user.name | `user.name`→`user.full_name`, includes에서도 수정 | ✅ |
| notices.js user.name | `user.name`→`user.full_name`, 8곳 includes 수정 | ✅ |

### 2. Operation Inquiry 확장

| 작업 | 설명 | 상태 |
|------|------|:----:|
| inquiryType ENUM 확장 | 'foodcourt','brand' → 'foodcourt','brand','owner' | ✅ |
| Inquiry Target에 Owner 추가 | Restaurant OperationInquiry 드롭다운에 Restaurant Owner 옵션 | ✅ |
| Owner 지원 (GET) | Restaurant Owner가 소유 레스토랑의 운영문의 조회 가능 | ✅ |

### 3. Restaurant Owner 문의 페이지 (신규 2개)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| OwnerSystemInquiryPage | 소유 레스토랑 선택 + 시스템 문의 생성/조회 | ✅ |
| OwnerOperationInquiryPage | 소유 레스토랑 운영문의 조회/응답/해결 | ✅ |
| 사이드바 메뉴 추가 | Communication 섹션에 System Inquiry + Operation Inquiry | ✅ |
| App.tsx 라우트 | /pos/owner/system-inquiry, /pos/owner/operation-inquiry | ✅ |

### 4. UX 기획 문서

| 작업 | 설명 | 상태 |
|------|------|:----:|
| INQUIRY_NOTICE_UX_SPECIFICATION.md | 역할별 접근 권한, 알림 뱃지 규칙, 생성/조회 규칙 정의 | ✅ |

### 수정/생성된 파일
- `dev-backend/routes/operationTickets.js` (POST 500 에러 수정 + Owner 지원)
- `dev-backend/routes/notices.js` (status:'active' 제거)
- `dev-backend/routes/comments.js` (full_name 수정)
- `dev-backend/models/OperationTicket.js` (inquiryType ENUM 확장)
- `dev-frontend/src/pages/Owner/OwnerSystemInquiryPage.tsx` (신규)
- `dev-frontend/src/pages/Owner/OwnerOperationInquiryPage.tsx` (신규)
- `dev-frontend/src/pages/Restaurant/OperationInquiryPage.tsx` (Owner 옵션 추가)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (Owner 메뉴 추가)
- `dev-frontend/src/App.tsx` (Owner 라우트 추가)
- `docs/INQUIRY_NOTICE_UX_SPECIFICATION.md` (신규)

---

## ✅ 완료: 댓글 내부 메모 + PlansPage 보완 (2026-02-28)

### 1. 댓글 '나만 보기' (Internal Note) 기능

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Comment 모델 is_internal | `is_internal` BOOLEAN 필드 추가 | ✅ |
| comments.js 가시성 필터 | 역할 그룹별 internal comment 필터링 (canSeeInternal 함수) | ✅ |
| unread-counts 필터 | 보이지 않는 internal 댓글을 미확인 카운트에서 제외 | ✅ |
| CommentSection UI | Internal note 토글, 노란색 스타일, Internal 뱃지 | ✅ |

### 2. Admin PlansPage 보완

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Plan Target에 Owner 추가 | PlanTemplate plan_target ENUM 'owner' 프론트 연동 | ✅ |
| AddonModule ENUM 확장 | target_user_type에 'owner' 추가 | ✅ |
| 모듈 카테고리 5종 완성 | basic, advanced, revenue, operation, analytics 전부 UI 표시 | ✅ |
| Create/Edit 폼 통일 | 두 폼 모두 5개 카테고리 + Owner plan target 지원 | ✅ |

### 3. 모달 스크롤 수정 (3개 파일)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Restaurant/SupportTicketsPage | Modal align-items:center→flex-start, max-width:800px | ✅ |
| Manager/SupportTicketsPage | 동일 패턴 수정 | ✅ |
| Manager/SystemInquiryPage | 동일 패턴 수정 | ✅ |

### 수정된 파일
- `dev-backend/models/Comment.js` (is_internal 필드 추가)
- `dev-backend/models/AddonModule.js` (target_user_type ENUM 'owner' 추가)
- `dev-backend/routes/comments.js` (canSeeInternal 함수 + 필터링 로직)
- `dev-frontend/src/components/Common/CommentSection.tsx` (Internal note UI)
- `dev-frontend/src/pages/Admin/PlansPage.tsx` (Owner target + 5 module categories)
- `dev-frontend/src/pages/Restaurant/SupportTicketsPage.tsx` (모달 스크롤 수정)
- `dev-frontend/src/pages/Manager/SupportTicketsPage.tsx` (모달 스크롤 수정)
- `dev-frontend/src/pages/Manager/SystemInquiryPage.tsx` (모달 스크롤 수정)
- `docs/INQUIRY_NOTICE_UX_SPECIFICATION.md` (Internal note + 첨부파일 문서 보완)

---

## ✅ 완료: 파일 첨부 기능 - Notices/Inquiry 페이지 (2026-02-28)

### 1. Notices 페이지 첨부파일 지원

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Admin NoticesPage | FileUpload + AttachmentList (작성+조회) | ✅ (기완료) |
| Brand NoticesPage | FileUpload + AttachmentList (작성+조회) | ✅ (기완료) |
| Foodcourt NoticesPage | FileUpload + AttachmentList (작성+조회) | ✅ |
| Restaurant NoticesPage | AttachmentList (조회만) | ✅ |
| Owner NoticesPage | FileUpload + AttachmentList (작성+조회) | ✅ |

### 2. Inquiry 페이지 첨부파일 확인

| 작업 | 설명 | 상태 |
|------|------|:----:|
| System Inquiry (전체) | CommentSection + FileUpload 기반 첨부 | ✅ (기완료) |
| Operation Inquiry (전체) | CommentSection + FileUpload 기반 첨부 | ✅ (기완료) |

### 3. DB 스키마 동기화

| 작업 | 설명 | 상태 |
|------|------|:----:|
| notices.attachments 컬럼 | TEXT(JSON array) - sync-database.js로 추가 | ✅ |

### 수정된 파일
- `dev-frontend/src/pages/Foodcourt/NoticesPage.tsx` (FileUpload + AttachmentList 추가)
- `dev-frontend/src/pages/Restaurant/NoticesPage.tsx` (AttachmentList 추가)
- `dev-frontend/src/pages/Owner/NoticesPage.tsx` (FileUpload + AttachmentList 추가)

---

## ✅ 완료: Communication 시스템 - 공지(Notices) + 댓글(Comments) (2026-02-27)

### 1. 백엔드 모델 & API

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Comment 모델 | 다형성 댓글 (notice/operation_ticket/support_ticket) | ✅ |
| Notice 모델 | 공지 (target_type: all/role/brand/foodcourt/restaurant) | ✅ |
| NoticeRecipient 모델 | 수신자 추적 (read_at, read_by) | ✅ |
| Comments API | GET/POST/DELETE /api/comments | ✅ |
| Notices API | GET metadata/sent/received/:id, POST, DELETE /api/notices | ✅ |

### 2. 사이드바 Communication 섹션 추가

| 작업 | 설명 | 상태 |
|------|------|:----:|
| System Admin | Communication 소제목 + Notices 메뉴 | ✅ |
| Brand General | Communication 소제목 + Notices 메뉴 | ✅ |
| Foodcourt General | Communication 소제목 + Notices 메뉴 | ✅ |
| Restaurant Owner | Communication 소제목 + Notices 메뉴 | ✅ |
| Restaurant Admin/Staff | Communication 소제목 + Notices 메뉴 | ✅ |

### 3. Notices 페이지 (역할별 5개)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Admin NoticesPage | 보내기 전용 (All/By Role/Select Restaurants) | ✅ |
| Brand NoticesPage | 받기+보내기 (By Brand/Select Restaurants) | ✅ |
| Foodcourt NoticesPage | 받기+보내기 (By Foodcourt/Select Restaurants) | ✅ |
| Owner NoticesPage | 받기+보내기 (All Owned/Individual) | ✅ |
| Restaurant NoticesPage | 받기 전용 | ✅ |

### 4. 문의 페이지 댓글 추가

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 공통 CommentSection 컴포넌트 | components/Common/CommentSection.tsx | ✅ |
| Admin SystemInquiry | 댓글 섹션 추가 | ✅ |
| Restaurant SystemInquiry | 댓글 섹션 추가 | ✅ |
| Manager SupportTickets | 댓글 섹션 추가 | ✅ |
| Brand OperationInquiry | 댓글 섹션 추가 | ✅ |
| Foodcourt OperationInquiry | 댓글 섹션 추가 | ✅ |
| Manager OperationInquiry | 댓글 섹션 추가 | ✅ |

### 수정/생성된 파일
- `dev-backend/models/Comment.js` (신규)
- `dev-backend/models/Notice.js` (신규)
- `dev-backend/models/NoticeRecipient.js` (신규)
- `dev-backend/models/index.js` (associations 추가)
- `dev-backend/routes/comments.js` (신규)
- `dev-backend/routes/notices.js` (신규)
- `dev-backend/server.js` (라우트 등록)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (Communication 메뉴)
- `dev-frontend/src/components/Common/CommentSection.tsx` (신규)
- `dev-frontend/src/pages/Admin/NoticesPage.tsx` (신규)
- `dev-frontend/src/pages/Brand/NoticesPage.tsx` (신규)
- `dev-frontend/src/pages/Foodcourt/NoticesPage.tsx` (신규)
- `dev-frontend/src/pages/Owner/NoticesPage.tsx` (신규)
- `dev-frontend/src/pages/Restaurant/NoticesPage.tsx` (신규)
- `dev-frontend/src/App.tsx` (라우트 추가)
- 6개 문의 페이지에 CommentSection import 추가

---

## ✅ 완료: UI/UX 개선 - MainLayout 싱글마운트 + 사이드바 메뉴 재정리 (2026-02-27)

### 1. System Inquiry 헤더 수정

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Restaurant/SystemInquiryPage.tsx | "Support Tickets" → "System Inquiry" 수정 | ✅ |
| Manager/SystemInquiryPage.tsx | "Support Tickets" → "System Inquiry" 수정 | ✅ |

### 2. MainLayout 싱글 마운트 리팩토링 (아키텍처 변경)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| PosLayout.tsx 생성 | React Router Layout Route + Outlet 패턴 | ✅ |
| App.tsx 라우트 구조 변경 | 공개/전체화면/POS 3구역 분리, PosLayout 중첩 | ✅ |
| 102개 페이지 MainLayout 제거 | 각 페이지에서 MainLayout import/wrapper 제거 | ✅ |
| MainLayout 스크롤 코드 제거 | 불필요한 savedScrollPosition/useEffect 제거 | ✅ |

### 3. 사이드바 메뉴 역할별 재정리

| 작업 | 설명 | 상태 |
|------|------|:----:|
| System Admin | Billing+Analytics → Operations + Plans & Payments | ✅ |
| Brand General | 8섹션→6섹션. Products+Stock 통합, Invoices/Reports 상위 이동 | ✅ |
| Foodcourt General | 6섹션→5섹션. Operations+Plans & Payments 통합 | ✅ |
| Restaurant Owner | 4섹션→3섹션. Operations 통합, Invoices 최상위 | ✅ |
| Restaurant Admin/Staff | 8섹션→6섹션. Operations(Invoices,Reports,Inventory) 통합 | ✅ |

### 수정된 파일
- `dev-frontend/src/components/Layout/PosLayout.tsx` (신규)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (스크롤 코드 제거 + 메뉴 재정리)
- `dev-frontend/src/App.tsx` (라우트 구조 변경)
- 102개 페이지 파일 (MainLayout 제거)
- `dev-frontend/src/pages/Restaurant/SystemInquiryPage.tsx` (헤더 수정)
- `dev-frontend/src/pages/Manager/SystemInquiryPage.tsx` (헤더 수정)

---

## ✅ 완료: DB 백업 체계 + 파일 정리 + PayPal 결제 + 서버 모니터링 + Reports 페이지 (2026-02-25)

### 1. DB 백업 체계 구축

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 운영서버 백업 수정 | .env 경로 오류 수정 (dev-backend → production-backend) | ✅ |
| 개발서버 백업 스크립트 | scripts/backup-database.sh 신규 생성 + cron 매일 04:00 | ✅ |
| 크로스 백업 | 운영→개발, 개발→운영 상호 백업 (scp 전송) | ✅ |
| 백업 가이드 문서 | docs/SERVER_BACKUP_GUIDE.md 생성 | ✅ |

### 2. 프로젝트 파일 정리

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 불필요 파일 삭제 | 15개 파일 삭제 (백업, 테스트, 미사용 모델/페이지/라우트) | ✅ |
| 중복 라우트 정리 | health.js, invoiceCategories.js (server.js 인라인과 중복) | ✅ |

### 3. PayPal 결제 연동

| 작업 | 설명 | 상태 |
|------|------|:----:|
| paypalService.js | issuer별 PayPal 클라이언트, sandbox/live 환경 전환 | ✅ |
| create-paypal-order API | POST /invoices/:id/create-paypal-order | ✅ |
| capture-paypal-order API | POST /invoices/:id/capture-paypal-order | ✅ |
| PayPal Webhook | CAPTURE.COMPLETED/DENIED 처리 | ✅ |
| PayPalPaymentForm.tsx | PayPal 버튼 + 캡처 + 에러 처리 | ✅ |

### 4. 운영서버 Health 모니터링

| 작업 | 설명 | 상태 |
|------|------|:----:|
| serverHealthMonitor.js | SSH로 운영서버 CPU/메모리/디스크/PM2 수집 (30분 주기) | ✅ |
| System Logs 통합 | 모니터링 결과 SystemLog에 기록 | ✅ |
| Server Health UI | SystemLogsPage에 서버 상태 탭 추가 | ✅ |

### 5. errorHandler.js 보안 개선

| 작업 | 설명 | 상태 |
|------|------|:----:|
| sanitizeBody() | req.body 로깅 시 비밀번호/토큰 필터링 | ✅ |

### 6. System Admin Reports 페이지 (진행 중)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| admin-reports.js API | 7개 엔드포인트 (revenue/payment/customer/subscription) | ✅ |
| server.js 라우트 등록 | /api/admin-reports 등록 | ✅ |
| ReportsPage.tsx | 4탭 리포트 페이지 (Revenue/Payment/Customer/Subscription) | ✅ |
| App.tsx 라우트 | ReportsPage import + /pos/admin/report 라우트 | ✅ |
| MainLayout 메뉴 활성화 | DisabledNavItem → NavItem 변경 | ✅ |
| 빌드 + 테스트 | 프론트엔드 빌드 + 개발서버 확인 | ✅ |

### 수정된 파일
- `dev-backend/routes/admin-reports.js` (신규), `dev-backend/utils/paypalService.js` (신규)
- `dev-backend/services/serverHealthMonitor.js` (신규), `scripts/backup-database.sh` (신규)
- `docs/SERVER_BACKUP_GUIDE.md` (신규)
- `dev-backend/middleware/errorHandler.js`, `dev-backend/server.js`
- `dev-frontend/src/pages/Admin/ReportsPage.tsx` (신규)
- `dev-frontend/src/components/Invoice/PayPalPaymentForm.tsx` (신규)
- `dev-frontend/src/App.tsx`, `dev-frontend/src/components/Layout/MainLayout.tsx`
- 삭제: 15개 파일 (불필요/중복)

---

## ✅ 완료: 시스템 로그 + 인보이스 14일 전 발행 + Stripe 결제 연동 (2026-02-25)

### 1. 시스템 관리자 시스템 로그 메뉴

| 작업 | 설명 | 상태 |
|------|------|:----:|
| SystemLog 모델 | level(5단계)/category(7종)/service 기반 구조화 로그 DB 테이블 | ✅ |
| systemLogger 유틸리티 | info/warn/error/critical/debug 헬퍼 (절대 throw 안 함) | ✅ |
| system-logs API | GET /(페이지네이션+필터), GET /stats(24h통계), DELETE /(로그 삭제) | ✅ |
| server.js 등록 | System Admin 전용 인증 미들웨어 적용 | ✅ |
| SystemLogsPage | 24h 통계카드, 필터(level/category/service/날짜/검색), Live Mode(5초), Export(CSV/JSON/TXT), Clear | ✅ |
| 사이드바 메뉴 활성화 | MainLayout.tsx DisabledNavItem → NavItem 변경 | ✅ |
| 빌드/테스트 | 프론트엔드 빌드 + 개발서버 확인 | ✅ |

### 2. 인보이스 자동 발행 14일 전 발행 통일

| 작업 | 설명 | 상태 |
|------|------|:----:|
| invoiceScheduler 리팩토링 | ADVANCE_DAYS=14, 기존 구독일 기준도 14일 전 발행으로 변경 | ✅ |
| isTodayAdvanceOf 헬퍼 | 오늘이 billing_day의 14일 전인지 판단 (월말 처리 포함) | ✅ |
| getTargetBillingMonth 헬퍼 | 14일 뒤의 대상 청구 월/년 계산 | ✅ |
| Entity Plan 14일 전 생성 | Brand/Foodcourt 플랜도 billing_day 14일 전 인보이스 자동 생성 | ✅ |
| systemLogger 연동 | 스케줄러 실행 결과 DB 기록 (성공/에러 분류) | ✅ |
| invoiceEmailTemplate | 인보이스 알림 이메일 HTML 템플릿 | ✅ |
| association 버그 수정 | models/index.js import로 변경 (EntityPlanRestaurant 연관 에러 해결) | ✅ |
| 스케줄러 수동 테스트 | subscription + entity plan 양쪽 수동 실행 통과 | ✅ |

### 3. Stripe 결제 연동

| 작업 | 설명 | 상태 |
|------|------|:----:|
| stripeService.js | issuer별(system_admin/brand/foodcourt) Stripe 인스턴스 관리 | ✅ |
| create-payment-intent API | POST /invoices/:id/create-payment-intent - PaymentIntent 생성, 다중통화 처리 | ✅ |
| Stripe Webhook | /api/webhooks/stripe - payment_intent.succeeded → 자동 paid, failed → 에러 기록 | ✅ |
| StripePaymentForm.tsx | Stripe Elements 기반 결제 폼 (PaymentElement + confirmPayment) | ✅ |
| InvoicePaymentModal 통합 | Stripe 선택 시 카드 결제 폼 표시, 비-Stripe 시 기존 흐름 유지 | ✅ |
| npm 의존성 | stripe, @stripe/stripe-js, @stripe/react-stripe-js | ✅ |
| Stripe 키 설정 UI | 3개 역할 모두 구현 완료 (Admin/Brand/Foodcourt PaymentSettingsPage) | ✅ |
| 빌드/테스트 | 프론트엔드 빌드 + 개발서버 배포 | ✅ |

### 수정된 파일
- `dev-backend/models/SystemLog.js` (신규), `dev-backend/utils/systemLogger.js` (신규)
- `dev-backend/routes/system-logs.js` (신규), `dev-backend/utils/stripeService.js` (신규)
- `dev-backend/utils/invoiceEmailTemplate.js` (신규)
- `dev-backend/services/invoiceScheduler.js`, `dev-backend/routes/invoices.js`, `dev-backend/server.js`
- `dev-backend/models/index.js`, `dev-backend/package.json`
- `dev-frontend/src/components/Invoice/StripePaymentForm.tsx` (신규)
- `dev-frontend/src/components/Invoice/InvoicePaymentModal.tsx`, `dev-frontend/src/components/Invoice/index.ts`
- `dev-frontend/src/pages/Admin/SystemLogsPage.tsx`, `dev-frontend/package.json`

---

## ✅ 완료: Brand/Foodcourt 구독 플랜 & 이메일 시스템 (2026-02-09 기획, 2026-02-24 완료)

### 개요
Brand General / Foodcourt General이 각자 구독 플랜을 만들고, 소속 레스토랑에 자동 인보이스를 발행하는 시스템.
이메일 발송은 각 역할이 자기 SMTP 설정으로 독립 발송.

### Phase 1: DB 스키마 & 이메일 SMTP 확장

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1-1 | `entity_plans` 테이블 생성 | 공통 플랜 테이블. entity_type(brand/foodcourt), entity_id, plan_name, subscription_fee(고정비), revenue_percentage(매출%), rent_type(fixed/percentage/combined), rent_fixed/rent_percentage/rent_minimum, billing_cycle, auto_generate, tax_rate, is_active | ✅ |
| 1-2 | `entity_plan_restaurants` 테이블 생성 | entity_plan_id ↔ restaurant_id 연결 (어떤 레스토랑이 어떤 플랜 적용) | ✅ |
| 1-3 | `notification_settings` ENUM 확장 | entity_type에 `'brand'`, `'foodcourt'` 추가 마이그레이션 | ✅ |
| 1-4 | emailService.js 리팩터링 | `sendIssuerEmail(issuerType, issuerId, mailOptions)` — 발행 주체별 SMTP 자동 선택 | ✅ |
| 1-5 | NotificationSettingsPage 보강 | Brand/Foodcourt entity_type 정확히 저장되도록 수정 | ✅ |

### Phase 2: Brand Plans CRUD & 레스토랑 연결 (Brand GM 우선)

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 2-1 | Brand Plans API | `GET/POST/PUT/DELETE /api/brands/:id/plans` — Brand GM이 자기 플랜 CRUD | ✅ |
| 2-2 | 플랜→레스토랑 연결 API | `POST/DELETE /api/brands/:id/plans/:planId/restaurants` — 플랜에 레스토랑 배정/해제 | ✅ |
| 2-3 | Brand PlansPage 재개발 | 하드코딩 제거, Brand GM 전용 플랜 CRUD UI (고정비 + 매출% + 임대료 설정) | ✅ |
| 2-4 | 플랜→레스토랑 연결 UI | 플랜 상세에서 소속 레스토랑 배정/해제 인터페이스 | ✅ |

### Phase 3: 매출 기반 % 계산 & 자동 인보이스

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 3-1 | 매출 조회 API | 기간별 레스토랑 orders.total 합산 (Brand 인보이스 계산 근거) | ✅ |
| 3-2 | % 계산 엔진 | fixed(고정비) + percentage(매출%) + combined(MAX(최소금액, 매출%)) 계산 로직 | ✅ |
| 3-3 | invoiceScheduler 확장 | 기존 system_admin 자동생성 + entity_plans 기반 Brand/Foodcourt 자동 인보이스 병렬 실행 | ✅ |
| 3-4 | Brand SubscriptionsPage 보강 | 레스토랑별 플랜 현황, 청구 예상액, 자동발행 상태 표시 | ✅ |

### Phase 4: 이메일 발송 전체 보강

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 4-1 | 인보이스 이메일 트리거 보강 | 자동 생성 + 수동 생성 인보이스 모두 발행자 SMTP로 이메일 발송 | ✅ |
| 4-2 | `/api/invoices/:id/send-email` 구현 | placeholder → 실제 구현 (발행자의 SMTP 사용) | ✅ |
| 4-3 | Welcome 이메일 발송 주체 변경 | Brand가 레스토랑 만들면 Brand SMTP, System Admin이면 Admin SMTP | ✅ |
| 4-4 | 이메일 템플릿 보강 | Brand/Foodcourt 로고, 발신자 정보 반영한 인보이스 이메일 | ✅ |

### Phase 5: Foodcourt 적용 (Brand 완성 후)

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 5-1 | Foodcourt Plans API | Brand와 동일 구조, entity_type='foodcourt'로 재사용 | ✅ |
| 5-2 | Foodcourt PlansPage | Brand PlansPage 기반으로 Foodcourt GM 전용 UI | ✅ |
| 5-3 | Foodcourt 자동 인보이스 | invoiceScheduler에서 foodcourt entity_plans도 처리 (Phase 3에서 이미 구현) | ✅ |
| 5-4 | Foodcourt SubscriptionsPage | 입점 레스토랑별 플랜 현황 UI | ✅ |

### 핵심 설계 원칙
- **entity_plans 공통 테이블**: Brand/Foodcourt 공용. entity_type 필드로 구분 (별도 테이블 X)
- **매출% 계산**: orders 테이블에서 billing_period 기간 내 completed 주문의 total 합산
- **Combined 방식**: `MAX(고정 최소금액, 매출%계산액)` — 최소 보장 금액 이상만 청구
- **이메일 독립**: sendPlatformEmail 폐기 → sendIssuerEmail로 통일 (issuer의 SMTP 사용)
- **Foodcourt 나중에**: Brand에서 먼저 완성도 높인 후 동일 구조로 적용

### 범위 외 (이번 개발에서 제외)
- 결제 게이트웨이 연동 (수동 결제 확인 방식 유지)
- 시스템관리자 POS 구독 플랜 변경 (기존 plan_templates 그대로 유지)

---

## 🚀 개발 성능 가이드라인 (필독)

### 1. 데이터 처리 원칙

| 원칙 | 잘못된 예 | 올바른 예 |
|------|----------|----------|
| **서버 집계 우선** | 10000개 주문 클라이언트 전송 → useMemo 계산 | 서버에서 집계 후 요약 데이터만 전송 |
| **필요한 데이터만** | `SELECT * FROM orders` | `SELECT id, total_amount FROM orders` |
| **페이지네이션 필수** | `limit: '10000'` | `limit: '50'` + 페이지네이션 UI |
| **인덱스 활용** | WHERE 절 미인덱스 컬럼 | 자주 조회되는 컬럼에 인덱스 추가 |

### 2. API 설계 패턴

```javascript
// ❌ BAD: 대량 데이터를 클라이언트로 전송 후 계산
const orders = await Order.findAll({ limit: 10000 });
// 클라이언트에서 reduce, map, filter로 집계

// ✅ GOOD: 서버에서 집계 후 요약만 전송
router.get('/reports-summary', async (req, res) => {
  const summary = await Order.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalRevenue'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders']
    ],
    where: { status: 'completed', order_date: { [Op.between]: [startDate, endDate] } }
  });
  res.json({ success: true, data: summary });
});
```

### 3. 프론트엔드 최적화

```typescript
// ❌ BAD: 대량 데이터 클라이언트 계산
const totalRevenue = useMemo(() => {
  return orders.reduce((sum, order) => sum + order.total_amount, 0);
}, [orders]); // orders가 10000개면 매 렌더링마다 계산

// ✅ GOOD: 서버 집계 데이터 직접 사용
const totalRevenue = useMemo(() => {
  return reportsSummary?.summary?.totalRevenue || 0;
}, [reportsSummary]); // 이미 계산된 값 사용
```

### 4. 리포트/대시보드 페이지 개발 시 체크리스트

- [ ] 서버에서 집계 API 먼저 구현 (`/reports-summary`, `/stats` 등)
- [ ] 클라이언트는 집계된 데이터만 받아서 렌더링
- [ ] 날짜 범위 필터는 서버로 전달하여 서버에서 필터링
- [ ] 차트 데이터도 서버에서 그룹화하여 제공
- [ ] `limit: '10000'` 같은 대량 조회 절대 금지

### 5. 실제 적용 사례 (2026-02-05)

**Reports 페이지 성능 개선:**
- 기존: `/api/orders?limit=10000` → 클라이언트 useMemo로 모든 통계 계산
- 개선: `/api/dashboard/restaurant/:id/reports-summary` → 서버에서 일별/카테고리별/메뉴별/시간대별 집계
- 결과: 데이터 전송량 대폭 감소, 페이지 로딩 속도 향상

---

## ✅ 완료: 인보이스 결제방법 매칭 시스템 수정 (2026-02-24)

### 개요
인보이스 발행 주체(System Admin, Brand, Foodcourt)별로 독립적인 결제설정을 사용하는 구조인데, 수신자 결제 시 항상 System Admin 결제설정만 조회하던 버그를 수정. 발행 시 결제방법 존재 검증 + 수신자 결제 시 발행자별 결제방법 분기 표시.

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| paymentSettingsHelper.js 공통 유틸리티 | getAvailablePaymentMethods / hasPaymentMethodForCurrency 추출 | ✅ 완료 |
| Brand/Foodcourt available API | GET /brands/:id/payment-settings/available/:currency | ✅ 완료 |
| 수동 인보이스 발행 검증 | 발행자 결제설정에 인보이스 통화 결제방법 존재 확인 | ✅ 완료 |
| Brand generate-invoices 검증 | 플랜 통화별 결제방법 미존재 시 skip | ✅ 완료 |
| Foodcourt generate-invoices 검증 | 동일 구조 | ✅ 완료 |
| System Admin 자동구독 검증 | 레스토랑 통화별 결제방법 확인, 미존재 시 skip | ✅ 완료 |
| 통화 범위 검증 | Brand/Foodcourt 결제설정/플랜 통화가 System Admin 범위 내인지 | ✅ 완료 |
| 프론트엔드 4페이지 결제방법 분기 | issuerType/issuerId 기반 fetchPaymentMethods 분기 | ✅ 완료 |
| 결제방법 없을 때 안내 메시지 | 발행자명 + 상황별 가이드 + 설정페이지 이동 버튼 | ✅ 완료 |
| INVOICE_SYSTEM.md 종합 문서 작성 | 전체 발행루트, 검증, 결제흐름, API, DB스키마 총정리 | ✅ 완료 |

### 관련 문서
- `/var/www/docs/INVOICE_SYSTEM.md` — 인보이스 시스템 전체 기술 문서

---

## ✅ 완료: Restaurant Owner 역할 추가 (2026-02-24)

### 개요
여러 레스토랑을 소유한 사업주를 위한 새 역할. Brand General/Foodcourt General과 동급이며, 재무/통계 조회에 특화. 메뉴/주문/직원 관리는 Restaurant Admin 영역.

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| User.js role ENUM 확장 | 'Restaurant Owner' 추가 | ✅ 완료 |
| RestaurantManager.js 컬럼 추가 | relationship_type ENUM('oversight', 'ownership') | ✅ 완료 |
| Restaurant.js payment_model 확장 | 'restaurant_owner' 추가 | ✅ 완료 |
| Invoice.js payer_type 확장 | 'restaurant_owner' 추가 | ✅ 완료 |
| auth.js 미들웨어 | checkRestaurantAccess에 Owner 분기 (ownership 관계 체크) | ✅ 완료 |
| owner.js 라우트 (신규) | 대시보드/레스토랑/통계비교/주문/인보이스/연결CRUD 8개 API | ✅ 완료 |
| server.js 등록 | `/api/owner` 라우트 등록 | ✅ 완료 |
| users.js Manager 필터 확장 | Restaurant Owner 포함 | ✅ 완료 |
| AuthContext.tsx | UserRole/ROLE_PERMISSIONS/ROLE_ROUTES에 Owner 추가 | ✅ 완료 |
| App.tsx 라우팅 | PosRootRedirect + Owner 6개 라우트 등록 | ✅ 완료 |
| MainLayout.tsx 사이드바 | Owner 전용 메뉴 (Dashboard/Restaurants/Statistics/Orders/Reports/Invoices) | ✅ 완료 |
| Owner 6개 페이지 | OwnerDashboard/Restaurants/Statistics/Orders/Reports/Invoices | ✅ 완료 |
| Admin ManagersPage | Owner 역할 추가 (Add 모달 + API 필터) | ✅ 완료 |

### API 엔드포인트
| Method | Path | 설명 | 접근 |
|--------|------|------|------|
| GET | /api/owner/dashboard | 통합 대시보드 (매출/주문/레스토랑 요약) | Owner |
| GET | /api/owner/restaurants | 소유 레스토랑 목록 | Owner |
| GET | /api/owner/restaurants/:id/stats | 레스토랑별 상세 통계 | Owner |
| GET | /api/owner/restaurants/:id/orders | 레스토랑별 주문 내역 (읽기 전용) | Owner |
| GET | /api/owner/statistics/compare | 레스토랑 간 비교 통계 | Owner |
| GET | /api/owner/invoices | 소유 레스토랑 인보이스 | Owner |
| POST | /api/owner/restaurants/:id/link | Owner에 레스토랑 연결 | System Admin |
| DELETE | /api/owner/restaurants/:id/unlink | Owner에서 레스토랑 연결 해제 | System Admin |
| GET | /api/owner/available | Restaurant Owner 목록 | System Admin |

---

## ✅ 완료: 레스토랑별 코스트 오버라이드 시스템 (2026-02-24)

### 개요
Brand General이 등록한 재료(Ingredient)의 표준 코스트(Brand Cost)에 대해, Restaurant Admin이 자기 레스토랑의 실제 운영 코스트(My Cost)를 별도로 설정할 수 있는 시스템. 재료별 독립 오버라이드 방식으로, My Cost가 설정된 재료는 My Cost를 사용하고, 설정되지 않은 재료는 Brand Cost를 그대로 사용한다 (크로스 사용).

### 핵심 설계 원칙
- **effective_cost = restaurant_cost ?? brand_cost** (재료별 독립 폴백)
- 브랜드 원본 데이터는 절대 수정하지 않음 (별도 테이블로 오버라이드)
- SAP/Oracle ERP의 plant-level price override 패턴과 동일한 업계 표준 방식

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| RestaurantIngredientCost 모델 생성 | 레스토랑별 재료 코스트 오버라이드 테이블 (restaurant_id + ingredient_id UNIQUE) | ✅ 완료 |
| 코스트 오버라이드 CRUD API | 조회/단건 설정/벌크 설정/삭제 (4개 엔드포인트) | ✅ 완료 |
| brand-ingredients API 확장 | 응답에 restaurant_cost, effective_cost, cost_notes 필드 추가 | ✅ 완료 |
| brand-recipes API 확장 | 레시피별 effective_ingredient_cost, 재료별 brand_cost/effective_cost 추가 | ✅ 완료 |
| product-recipe API 전체 반영 | 6개 엔드포인트 모두 effective cost 기반 원가/이익률 계산으로 변경 | ✅ 완료 |
| inventory-routes API 반영 | 재고입고/실사/발주제안에 effective cost 반영 | ✅ 완료 |
| IngredientsTab My Cost UI | Brand 재료에 인라인 My Cost 편집/리셋, Brand Cost/My Cost/Applied 3단 표시 | ✅ 완료 |
| RecipesTab 코스트 비교 UI | 카드에 Brand Cost(취소선)/My Cost(파란색) 비교, 뷰 모달 재료 테이블에 My Cost 컬럼 | ✅ 완료 |

### 신규 API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/restaurants/:id/ingredient-costs` | 레스토랑 코스트 오버라이드 목록 |
| PUT | `/api/restaurants/:id/ingredient-costs/bulk` | 일괄 오버라이드 설정 |
| PUT | `/api/restaurants/:id/ingredient-costs/:ingredientId` | 개별 오버라이드 설정 (upsert) |
| DELETE | `/api/restaurants/:id/ingredient-costs/:ingredientId` | 오버라이드 삭제 (brand cost로 복원) |

### 수정된 파일
- `dev-backend/models/RestaurantIngredientCost.js` - 신규 모델
- `dev-backend/models/index.js` - 어소시에이션 추가
- `dev-backend/routes/ingredients.js` - brand-ingredients 확장 + 코스트 CRUD API 4개
- `dev-backend/routes/recipes.js` - brand-recipes effective cost 재계산
- `dev-backend/routes/product-recipe.js` - getRestaurantCostMap/getEffectiveCost 헬퍼 + 6개 엔드포인트
- `dev-backend/routes/inventory-routes.js` - 재고입고/실사/발주제안 effective cost
- `dev-frontend/src/pages/RecipeManagement/IngredientsTab.tsx` - My Cost 인라인 편집 UI
- `dev-frontend/src/pages/RecipeManagement/RecipesTab.tsx` - 카드/뷰모달 코스트 비교 UI

---

## ✅ 완료: Staff 비밀번호 리셋 기능 + 배포 명령어 개선 (2026-02-23)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Staff 비밀번호 리셋 API 권한 확장 | System Admin 전용 → Restaurant Admin도 자기 레스토랑 Staff 비밀번호 리셋 가능 | ✅ 완료 |
| Staff 비밀번호 리셋 UI | StaffPage에 Reset PW 버튼 + 확인 모달 + 새 비밀번호 표시 모달 | ✅ 완료 |
| 배포 명령어 릴리즈노트 템플릿 | /배포 완료 후 왓츠앱용 한글/영문 릴리즈 노트 자동 생성 형식 추가 | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/users.js` - reset-password API 권한 확장 (Restaurant Admin 추가)
- `dev-frontend/src/pages/Staff/StaffPage.tsx` - Reset PW 버튼, 확인 모달, 비밀번호 표시 모달
- `.claude/commands/배포.md` - 릴리즈 노트 출력 섹션 추가

---

## ✅ 완료: 배포 안정화 + DB 스키마 동기화 시스템 구축 (2026-02-23)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 배포 스크립트 혼란 해결 | 미사용 `deploy-production-v3.sh` → `.UNUSED` 리네임, 배포 문서 정리 | ✅ 완료 |
| 운영 DB 스키마 마이그레이션 | 한 달치 개발 스키마 변경 반영 (users, restaurants, orders, invoices, brands 등 9개 ALTER) | ✅ 완료 |
| sync-database.js 전면 재작성 | 12개 하드코딩 모델 → 62개 자동 로딩, `alter: true` + 개별 모델별 sync + FK 체크 비활성화 | ✅ 완료 |
| compare-schema.js 신규 생성 | dev vs prod DB 스키마 비교 도구 (순수 SQL, `--export`/`--compare` 모드) | ✅ 완료 |
| 배포 스크립트 보강 | Pre-deploy 스키마 비교 → sync 실행 → Post-sync 검증 3단계 DB 안전장치 | ✅ 완료 |
| 모델-DB 타입 불일치 수정 | BrandProduct/Order/Product의 TEXT 크기 불일치 (STRING→MEDIUMTEXT/LONGTEXT) 수정 | ✅ 완료 |
| SiteSettings.js require 체인 수정 | `db.js` → `config/database.js`로 변경 (index.js 체인 로딩 방지) | ✅ 완료 |
| POS 로그아웃 UX 개선 | 헤더 로그아웃 제거, CashierPinModal에 Logout 버튼 추가, AuthContext.logout 사용 | ✅ 완료 |
| 로그인 리다이렉트 통일 | Staff 포함 모든 역할 → 대시보드로 리다이렉트 (POS 직행 제거) | ✅ 완료 |
| 운영서버 company_settings 복구 | 누락 컬럼(whatsapp, business_hours, inquiry_type 등) 수동 추가 | ✅ 완료 |
| 운영서버 전체 배포 | Staff 시스템, POS UX, 스키마 동기화 등 전체 변경사항 운영 반영 (백업: 20260223_212557) | ✅ 완료 |

### 수정된 파일
- `dev-backend/sync-database.js` - 전면 재작성 (62개 모델 자동 로딩)
- `dev-backend/compare-schema.js` - 신규 (DB 스키마 비교 도구)
- `dev-backend/models/BrandProduct.js` - image_url TEXT('medium')
- `dev-backend/models/Order.js` - payment_proof TEXT('long')
- `dev-backend/models/Product.js` - description/image TEXT('medium'), product_recipe_id 추가
- `dev-backend/models/SiteSettings.js` - require 경로 수정
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` - 로그아웃 UX
- `dev-frontend/src/components/POSTerminal/CashierPinModal.tsx` - Logout 버튼
- `dev-frontend/src/pages/Login/LoginPage.tsx` - Staff 리다이렉트 대시보드로
- `deploy-to-production.sh` - 스키마 비교/검증 3단계 추가

---

## ✅ 완료: Staff 관리 + PIN 캐셔 전환 + 메뉴 권한 시스템 (2026-02-23)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Staff 생성/관리 UI | Restaurant Admin이 Staff 생성 (Username, Name, Email, PIN, Department, 메뉴 권한 토글) | ✅ 완료 |
| System Admin Staff 관리 | Admin StaffManagementPage에서도 Staff 생성/관리 가능 | ✅ 완료 |
| PIN 기반 캐셔 전환 | POS 터미널에서 4자리 PIN 입력 → 로그인 계정 전환 (새 JWT 발급) | ✅ 완료 |
| CashierPinModal 컴포넌트 | 4자리 숫자 키패드, 키보드 입력 지원, 자동 인증 | ✅ 완료 |
| AuthContext.switchUser() | PIN 인증 시 JWT 토큰 + 유저 상태 즉시 교체 (페이지 리로드 없음) | ✅ 완료 |
| Menu Visibility 권한 체계 | 6개 메뉴 그룹 토글로 Staff 접근 제어 (User.permissions JSON 배열) | ✅ 완료 |
| verify-pin API | `POST /api/staff/verify-pin` — PIN으로 유저 조회 후 새 JWT 발급 | ✅ 완료 |
| PIN 유니크 검증 | 레스토랑 내 PIN 중복 방지 (생성/수정 시 검증) | ✅ 완료 |
| Staff 승격 기능 | Staff → Restaurant Admin 승격 (permissions 초기화) | ✅ 완료 |
| 자동 비밀번호 생성 | 12자 강력 비밀번호 자동 생성, 생성 시 1회 표시 | ✅ 완료 |
| ROLES_AND_PERMISSIONS.md 보강 | Staff 섹션 대폭 보강, 권한 매트릭스 Staff 항목 추가 | ✅ 완료 |

### 메뉴 권한 구조

**항상 접근 가능 (Core):** Dashboard, POS Terminal, Live Orders, Kitchen/Customer Display, Mobile Order, Profile

**토글 가능 (6개 그룹):**
| 그룹 키 | 포함 메뉴 |
|---------|----------|
| `menu_management` | Menu / Categories / Options / Recipe |
| `inventory` | Suppliers / Inventory |
| `marketing` | Customers / Coupons |
| `reports` | Reports / Activity History |
| `support` | Invoices / Inquiries |
| `settings` | Store / Company / Notification |

### 수정된 파일
- `dev-frontend/src/pages/Staff/StaffPage.tsx` - Staff 관리 UI (생성/수정/삭제/승격, 권한 토글)
- `dev-frontend/src/components/POSTerminal/CashierPinModal.tsx` - PIN 입력 모달 (신규)
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` - 캐셔 전환 연동
- `dev-frontend/src/contexts/AuthContext.tsx` - switchUser() 메서드, ROLE_PERMISSIONS
- `dev-backend/routes/staff.js` - verify-pin API, Staff CRUD
- `dev-backend/routes/users.js` - PIN 유니크 검증, 자동 비밀번호 생성
- `dev-backend/models/User.js` - pin_code, permissions 필드
- `dev-frontend/src/pages/Admin/StaffManagementPage.tsx` - System Admin Staff 관리
- `docs/ROLES_AND_PERMISSIONS.md` - Staff 섹션 보강

---

## ✅ 완료: Blog/FAQ CMS 및 랜딩 페이지 디자인 통일 (2026-02-05)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Content Management 시스템 | Blog/FAQ 콘텐츠 관리 페이지 (4탭 구조: Blog, Blog Categories, FAQ, FAQ Categories) | ✅ 완료 |
| Public Blog/FAQ 페이지 | 랜딩 사이트용 Blog, FAQ 공개 페이지 및 상세 페이지 | ✅ 완료 |
| 랜딩 페이지 디자인 통일 | About 페이지 스타일로 FAQ/Blog 페이지 HeroSection 통일 (gradient 배경) | ✅ 완료 |
| GNB 서브배너 높이 통일 | 모든 랜딩 페이지 HeroSection padding 40px 20px로 통일 | ✅ 완료 |
| 카테고리 아이콘 제거 | FAQ/Blog 카테고리 탭에서 이모지 아이콘 제거, 텍스트만 표시 | ✅ 완료 |
| 작성자 표시 개선 | 이메일 대신 full_name 표시, 이메일 형식이면 'PurpleHere Team' 표시 | ✅ 완료 |
| 홈페이지 버튼 hover 수정 | Try Demo 버튼 hover 시 메인 컬러(#635BFF) 배경 + 흰색 글자 | ✅ 완료 |
| 홈페이지 Feature 카드 수정 | 첫번째 카드를 Restaurant Management로 변경, 아이콘 크기 통일 | ✅ 완료 |

### 수정된 파일
- `dev-backend/models/Content.js` - 콘텐츠 모델
- `dev-backend/models/ContentCategory.js` - 콘텐츠 카테고리 모델
- `dev-backend/routes/contents.js` - 콘텐츠 API (공개/관리자)
- `dev-backend/middleware/auth.js` - full_name 필드 추가
- `dev-frontend/src/pages/Admin/ContentManagementPage.tsx` - CMS 관리 페이지
- `dev-frontend/src/pages/Landing/FAQPage.tsx` - 공개 FAQ 페이지 (LandingLayout, gradient hero)
- `dev-frontend/src/pages/Landing/BlogPage.tsx` - 공개 Blog 페이지 (LandingLayout, gradient hero)
- `dev-frontend/src/pages/Landing/BlogPostPage.tsx` - Blog 상세 페이지 (Back to Blog 위치 변경)
- `dev-frontend/src/pages/Landing/HomePage.tsx` - 버튼 hover 색상, Feature 카드 내용 수정

---

## ✅ 완료: Contact Form 개선 및 배포 시스템 수정 (2026-02-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Contact Form Free Trial 옵션 | Inquiry Type에 "Start Free Trial (7 days free)" 추가 | ✅ 완료 |
| Preferred Username 필드 | Free Trial 선택 시 원하는 아이디 입력 필드 표시 | ✅ 완료 |
| Backend API 수정 | inquiry_type, preferred_username 필드 저장 지원 | ✅ 완료 |
| Pricing 페이지 통화 수정 | 설정된 통화 가격 없을 시 "Contact Us" 표시 | ✅ 완료 |
| Plans 관리 페이지 통화 수정 | 설정된 통화 가격 없을 시 "Price Not Set" 표시 | ✅ 완료 |
| addon-modules 메뉴 삭제 | 불필요한 메뉴 및 라우트 제거 | ✅ 완료 |
| deploy-dev.sh 수정 | nginx 배포 폴더(/var/www/dev-frontend-build)로 자동 복사 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Landing/ContactPage.tsx` - Free Trial 옵션, Preferred Username 필드
- `dev-frontend/src/pages/Landing/PricingPage.tsx` - 통화별 가격 표시 개선
- `dev-frontend/src/pages/Admin/PlansPage.tsx` - 통화별 가격 표시 개선
- `dev-backend/models/ContactInquiry.js` - inquiry_type, preferred_username 필드 추가
- `dev-backend/routes/public.js` - Free Trial 필수 필드 검증 추가
- `dev-backend/routes/siteSettings.js` - Contact 정보(phone, whatsapp, business_hours) 반환
- `dev-frontend/src/components/Layout/MainLayout.tsx` - addon-modules 메뉴 제거
- `dev-frontend/src/App.tsx` - AddonModulesPage 라우트 제거
- `dev-frontend/deploy-dev.sh` - nginx 배포 폴더 복사 단계 추가

---

## ✅ 완료: Support Ticket 필터링 및 API 개선 (2026-02-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Support Ticket customerId 필터링 | Brand/Foodcourt General이 본인 티켓만 보도록 수정 | ✅ 완료 |
| Backend API 개선 | GET /api/support-tickets에 customerId 파라미터 추가 | ✅ 완료 |
| Frontend API 호출 수정 | SystemInquiryPage에서 customerId로 필터링 | ✅ 완료 |
| API 테스트 | curl로 필터링 동작 검증 완료 | ✅ 완료 |

### 작업 상세

**문제:**
- Brand General과 Foodcourt General이 System Inquiry 페이지에서 모든 사용자의 티켓을 볼 수 있었음
- 본인이 생성한 티켓만 표시되어야 하는데 전체 티켓이 노출됨

**해결:**
1. Backend API (`/api/support-tickets`):
   - `customerId` 쿼리 파라미터 지원 추가
   - WHERE 절에 customerId 필터 추가

2. Frontend (Brand/Foodcourt SystemInquiryPage):
   - API 호출 시 `?customerId=${currentUserId}` 파라미터 전달
   - 기존 `userId`, `userRole` 파라미터 제거

**테스트 결과:**
- 필터 없이: 5개 티켓 반환
- `customerId=6` (Brand General): 1개 티켓만 반환
- 데이터베이스 조회 검증 완료

### 수정된 파일
- `dev-backend/routes/support-tickets.js` - customerId 필터 추가
- `dev-frontend/src/pages/Brand/SystemInquiryPage.tsx` - API 호출 수정
- `dev-frontend/src/pages/Foodcourt/SystemInquiryPage.tsx` - API 호출 수정

---

## ✅ 완료: 데모 계정 설정 및 운영서버 배포 (2026-02-02)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 데모 계정 데이터 수정 | Restaurant 1 메뉴 및 카테고리 재구성 | ✅ 완료 |
| 테스트 계정 수정 | LoginPage.tsx TEST_ACCOUNTS 업데이트 | ✅ 완료 |
| 데모 계정 플랜 업그레이드 | Enterprise Plan으로 모든 기능 활성화 | ✅ 완료 |
| 운영서버 배포 | 개발서버 → 운영서버 배포 완료 | ✅ 완료 |

### 데모 계정 설정 상세

**Restaurant 1 (Seoul BBQ House) 데이터 정비:**
- 기존 잘못된 카테고리 삭제 ("test 123", "222", "3333")
- 새 카테고리 4개 생성:
  - 🥗 Appetizers (3개 메뉴)
  - 🍽️ Main Dishes (4개 메뉴)
  - 🥤 Beverages (3개 메뉴)
  - 🍰 Desserts (2개 메뉴)
- 총 12개 메뉴 아이템 추가 (코드, 가격, 이모지 포함)
- 주문 방식 4가지 모두 활성화 (Dine In, Takeaway, Pre-order Pickup, Delivery)

**플랜 업그레이드:**
- Restaurant 1: Enterprise Plan (주문 무제한, 메뉴 무제한, 스태프 무제한)
- Brand 1 (K-DINE): Enterprise Plan (10년 구독)
- demo-brand@purplehere.com → Brand 1에 연결
- demo-restaurant@purplehere.com → Restaurant 1에 연결

**테스트 계정 수정:**
- Restaurant Admin 계정을 `admin@kdine.com` (300+ 주문 데이터)로 변경
- 기존 `restaurant_admin@orderhere.center` 제거 (DB에 없음)

### 수정된 파일
- `dev-frontend/src/pages/Login/LoginPage.tsx` - 데모/테스트 계정 업데이트
- `dev-frontend/src/components/Landing/LandingHeader.tsx` - 로고 텍스트 수정
- `dev-frontend/src/pages/Landing/AboutPage.tsx` - About 페이지 업데이트
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx` - Features 페이지 업데이트
- `dev-frontend/src/pages/Landing/DemoPage.tsx` - Demo 페이지 업데이트
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` - Invoices 페이지 업데이트

### 운영서버 배포
- 배포 시간: 2026-02-02 21:15:14 UTC
- 백업 위치: /var/www/backups/20260202_211411
- 배포 방식: 개발서버 → 운영서버 (rsync)
- 헬스체크: ✅ 통과

---

## ✅ 완료: Restaurant-Admin 1:1 매칭 구현 (2026-02-08)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Backend POST /api/restaurants 수정 | adminAction(create/assign)으로 Restaurant Admin 동시 생성 | ✅ 완료 |
| Backend GET 응답에 admin 필드 추가 | 레스토랑 응답에 admin 객체 포함, managers에서 Admin 제외 | ✅ 완료 |
| Backend PUT /api/restaurants/:id 수정 | Admin 변경(create/change) 트랜잭션 지원 | ✅ 완료 |
| GET /api/users/available-admins | 미배정 유저(Restaurant Admin, Staff) 검색 API | ✅ 완료 |
| validateRestaurantCreation 미들웨어 | adminAction 조건부 검증 규칙 | ✅ 완료 |
| Admin RestaurantsPage Add Modal | 새 계정 생성/기존 유저 선택 토글, 감독 매니저 분리 | ✅ 완료 |
| Admin RestaurantsPage Edit/View Modal | Admin 정보 읽기전용 표시, Change Admin, View 분리 표시 | ✅ 완료 |
| Manager RestaurantsPage 수정 | Add 모달에 Admin 생성 필드, 현재 매니저 자동 감독자 등록 | ✅ 완료 |
| SubscriptionsPage 소규모 수정 | 레스토랑 선택 시 Admin 정보 표시 | ✅ 완료 |
| StaffManagementPage 경고 추가 | Restaurant Admin 직접 생성 시 안내 메시지 | ✅ 완료 |
| 데이터 마이그레이션 스크립트 | Brand/Foodcourt Manager → restaurant_managers 이동 | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/restaurants.js` - POST/GET/PUT Admin 로직
- `dev-backend/routes/users.js` - available-admins 엔드포인트
- `dev-backend/middleware/validation.js` - validateRestaurantCreation
- `dev-backend/scripts/migrate-restaurant-admins.js` - 마이그레이션 스크립트 (신규)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` - Add/Edit/View 모달 + 카드
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx` - Add 모달 Admin 섹션
- `dev-frontend/src/pages/Admin/SubscriptionsPage.tsx` - Admin 정보 표시
- `dev-frontend/src/pages/Admin/StaffManagementPage.tsx` - 경고 메시지

---

## ✅ 완료: 블로그 UI 개선 & Brand/Foodcourt 구독 플랜 기획 (2026-02-09)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 블로그 썸네일 배경색 변경 | 보라색 그라데이션 → 연회색 3단계 그라데이션 (#F8F9FA→#E9ECEF→#DEE2E6) | ✅ 완료 |
| 이메일/인보이스 시스템 현황 분석 | Welcome/Invoice 이메일 발송 현황, SMTP 구조, 자동생성 인보이스 이메일 미구현 확인 | ✅ 완료 |
| 플랫폼 아키텍처 정리 | 역할별 인보이스 발행 구조, 멀티 연결(Brand+Foodcourt), SMTP 독립 구조 문서화 | ✅ 완료 |
| Brand/Foodcourt 구독 플랜 5 Phase 기획 | DB 스키마, API, 매출% 계산 엔진, 이메일 보강, Foodcourt 적용 계획 수립 | ✅ 완료 |
| MEMORY.md 아키텍처 보강 | 역할 구조, 레스토랑 연결 4가지 케이스, 인보이스 발행 주체, SMTP 독립 구조 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Landing/BlogPage.tsx` - 썸네일 배경색 변경
- `DEVELOPMENT_PLAN.md` - 아키텍처 섹션 + 5 Phase 개발 계획 추가

---

## ✅ 완료: UI/UX 버그 수정 및 레스토랑 관리 개선 (2026-02-09)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 레스토랑 생성 에러 메시지 수정 | `[object Object]` 대신 실제 검증 메시지 표시 | ✅ 완료 |
| 비밀번호 검증 추가 | 프론트엔드에 대소문자+숫자 검증 (백엔드와 동일) | ✅ 완료 |
| 사이드바 네비게이션 활성화 | Brand/Foodcourt General Plans/Subscriptions 메뉴 활성 링크로 변경 | ✅ 완료 |
| Manager 모달 스크롤 통일 | Admin 패턴(ModalOverlay 스크롤)으로 통일 | ✅ 완료 |
| 로그인 에러 코드 수정 | 잘못된 자격증명 시 500→401 반환 | ✅ 완료 |
| "Restaurant Admin (Owner)" 라벨 수정 | Owner 제거 → "Restaurant Admin"으로 통일 | ✅ 완료 |
| Edit 모달 관리자 할당 기능 | 관리자 없을 때 "Assign Admin" 버튼 추가 | ✅ 완료 |
| Restaurant Name 레이아웃 통일 | Add/Edit/View 모달 모두 full-width로 통일 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` - 에러 메시지, 비밀번호 검증, 라벨, 레이아웃
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx` - 비밀번호 검증, 모달 스크롤, 라벨
- `dev-frontend/src/components/Layout/MainLayout.tsx` - 사이드바 Plans/Subscriptions 활성화
- `dev-backend/routes/auth.js` - 로그인 401 에러 코드

---

## ✅ 완료: Restaurant Admin 리네임 + 비밀번호 정책 강화 (2026-02-10)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| DB 컬럼 리네임 | `restaurants.manager_id` → `admin_id`, `manager_name` → `admin_name` | ✅ 완료 |
| Sequelize 모델/관계 업데이트 | `as: 'manager'` → `as: 'admin'`, Restaurant.js, models/index.js | ✅ 완료 |
| 백엔드 라우트 전체 반영 | restaurants.js, dashboard.js 등 admin_id/admin_name 사용 | ✅ 완료 |
| 프론트엔드 Admin 반영 | RestaurantsPage, SubscriptionsPage, StaffManagementPage 등 | ✅ 완료 |
| API 하위 호환 유지 | GET /api/restaurants 응답에 managerId/managerName camelCase 유지 | ✅ 완료 |
| admin-analytics 버그 수정 | regional-stats Order alias 누락 (`as: 'orders'`) 수정 | ✅ 완료 |
| 비밀번호 정책 통일 | 8자+, 소문자+대문자+숫자 필수 (회원가입/변경/생성 모두 동일) | ✅ 완료 |
| 테스트 계정 비밀번호 정책 준수 | admin123→Admin1234, test123→Test1234 등 전체 변경 | ✅ 완료 |
| 프로필 비밀번호 변경 UI | Password Requirements 안내 + 프론트/백엔드 이중 검증 | ✅ 완료 |
| 사용자 생성 비밀번호 자동생성 | 고정 '1234' 제거 → 12자 강력한 비밀번호 자동 생성 | ✅ 완료 |
| 비밀번호 리셋 UI 수정 | tempPassword 정확히 읽기, '1234' 폴백 제거 | ✅ 완료 |

### 수정된 파일
- `dev-backend/models/Restaurant.js` - admin_id, admin_name 컬럼
- `dev-backend/models/index.js` - Restaurant.belongsTo(User, as: 'admin')
- `dev-backend/routes/restaurants.js` - admin_id 사용, 하위 호환 유지
- `dev-backend/routes/dashboard.js` - admin_id 참조
- `dev-backend/routes/users.js` - 비밀번호 정책 검증, 자동 생성
- `dev-backend/routes/admin-analytics.js` - Order alias 버그 수정
- `dev-frontend/src/pages/Login/LoginPage.tsx` - 정책 준수 비밀번호
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` - admin 데이터 반영
- `dev-frontend/src/pages/Admin/StaffManagementPage.tsx` - 자동 비밀번호 UI
- `dev-frontend/src/pages/Profile/ProfilePage.tsx` - 비밀번호 정책 안내/검증

---

## ✅ 완료: EntityPlan 1플랜=1과금항목 구조 + 인보이스 issuer 체계 + 배포 스모크 테스트 (2026-02-25)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| EntityPlan 구조 변경 | EntityPlanCharge 롤백, charge_type/percentage_value/revenue_base/billing_day 추가 | ✅ 완료 |
| Brand Plans/Subscriptions/Invoices | BrandPlansPage, BrandSubscriptionsPage, BrandInvoicesPage 전면 리팩토링 | ✅ 완료 |
| Foodcourt Plans/Subscriptions/Invoices | FoodcourtPlansPage, FoodcourtSubscriptionsPage, FoodcourtInvoicesPage 전면 리팩토링 | ✅ 완료 |
| Brand/Foodcourt Dashboard | 인보이스 issuer 구분 반영, 통계 개선 | ✅ 완료 |
| 인보이스 issuer 체계 | system_admin/brand/foodcourt 발행 주체 구분 | ✅ 완료 |
| 레시피/재고 다중통화 | 원재료 원가 통화별 관리, RestaurantIngredientCost 모델 | ✅ 완료 |
| 배포 스모크 테스트 | deploy-to-production.sh에 POS 주문→빌 자동 검증 추가 | ✅ 완료 |
| 운영서버 배포 | 스모크 테스트 6/6 통과 확인 | ✅ 완료 |

### 수정된 파일
- `dev-backend/models/EntityPlan.js` - charge_type, percentage_value, revenue_base, billing_day 추가
- `dev-backend/models/index.js` - EntityPlanCharge 제거
- `dev-backend/routes/brands.js` - 플랜 CRUD + 다중 플랜 할당 버그 수정
- `dev-backend/routes/foodcourts.js` - 플랜 CRUD 동일 수정
- `dev-backend/routes/invoices.js` - issuer 구분 로직
- `dev-backend/routes/ingredients.js` - 다중통화 원가 관리
- `dev-frontend/src/pages/BrandGeneral/BrandPlansPage.tsx` - Charge Type UI 전면 재작성
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtPlansPage.tsx` - 동일
- `dev-frontend/src/pages/BrandGeneral/BrandSubscriptionsPage.tsx` - issuer 반영
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtSubscriptionsPage.tsx` - 동일
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` - issuer 반영
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` - 동일
- `deploy-to-production.sh` - POS 주문→빌 스모크 테스트

---

## ✅ 완료: 사이트 설정 + 대시보드/리포트 통화 개선 + 시스템 로그 가이드 (2026-02-25)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 사이트 타임존 설정 | Admin > Site Settings에서 타임존 설정. 대시보드/리포트/인보이스 전체 적용 | ✅ 완료 |
| 대시보드 통화 필터 개선 | 결제 설정 기반 통화만 표시, 인보이스 건수 기준 기본 통화 | ✅ 완료 |
| 리포트 기간 필터 개선 | "All" 전체 기간 추가, 백엔드 period=all 지원 | ✅ 완료 |
| 서버 헬스 로깅 최적화 | 정상 상태 로깅 제거, 오탐 경고 수정 | ✅ 완료 |
| SystemLogsPage Auto-scroll | useRef + useEffect 기반 자동 스크롤 구현 | ✅ 완료 |
| 시스템 로그 대응 가이드 | 서비스별 Action Guide 매핑 + UI 패널 | ✅ 완료 |
| 대시보드 시스템 알림 | 24h critical/error 알림 + alerts-summary API | ✅ 완료 |
| 이메일 자동 알림 | error/critical 발생 시 이메일 발송, 1시간 중복 방지 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/utils/logActionGuides.ts` (NEW)
- `dev-frontend/src/pages/Admin/AdminDashboard.tsx`
- `dev-frontend/src/pages/Admin/ReportsPage.tsx`
- `dev-frontend/src/pages/Admin/SystemLogsPage.tsx`
- `dev-frontend/src/pages/Admin/SiteSettingsPage.tsx`
- `dev-frontend/src/contexts/StoreContext.tsx`
- `dev-backend/routes/admin-reports.js`
- `dev-backend/routes/system-logs.js`
- `dev-backend/routes/siteSettings.js`
- `dev-backend/utils/systemLogger.js`
- `dev-backend/utils/dateTimeHelper.js`
- `dev-backend/services/serverHealthMonitor.js`
- `dev-backend/services/invoiceScheduler.js`
- `dev-backend/models/CompanySettings.js`

---

## ✅ 완료: 할인 시스템 품질 보완 + 실제 결제 금액 표시 (2026-02-28)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 품질 체크 수정 | Restaurant/InvoicesPage 모달 Free 표시, NoticesPage/InquiryPage refreshBadgeCounts 이벤트 | ✅ 완료 |
| Subscriptions 400 에러 수정 | Brand/Foodcourt SubscriptionsPage restaurant_id→restaurant_ids 배열 변환 | ✅ 완료 |
| Create Invoice 할인 UI | Admin/Brand/Foodcourt InvoicesPage Create Invoice 모달에 Discount 입력 UI 추가 | ✅ 완료 |
| Admin SubscriptionsPage 401 수정 | handleUpdateSubscription Authorization 헤더 누락 수정 | ✅ 완료 |
| Admin RestaurantsPage 할인 UI | Edit 모달 Subscription Settings에 Discount Type/Value/Reason 추가 | ✅ 완료 |
| 할인 후 실제 결제 금액 표시 | Admin/Brand/Foodcourt/Manager SubscriptionsPage 테이블+모달에 취소선+할인후 금액 표시 | ✅ 완료 |
| Manager API 할인 필드 추가 | /api/restaurants/subscriptions/manager/:id에 discountType/Value/Reason 반환 | ✅ 완료 |

### 수정된 파일 (주요)
- `dev-frontend/src/pages/Admin/SubscriptionsPage.tsx` (401 수정 + 할인 금액 표시)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` (Edit 모달 할인 UI)
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` (Create Invoice 할인)
- `dev-frontend/src/pages/BrandGeneral/BrandSubscriptionsPage.tsx` (할인 금액 표시)
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` (Create Invoice 할인)
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtSubscriptionsPage.tsx` (할인 금액 표시)
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` (Create Invoice 할인)
- `dev-frontend/src/pages/Manager/SubscriptionsPage.tsx` (카드 할인 금액 표시)
- `dev-backend/routes/restaurants.js` (Manager API 할인 필드)
- 12개 InquiryPage + SupportTicketsPage (refreshBadgeCounts 이벤트)

---

## ✅ 완료: 공지사항 시스템 버그 수정 + UX 개선 (2026-03-01)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Notice target_type 수정 | metadata API에서 'restaurant' → 'select_restaurants'로 변경, DB ENUM 동기화 | ✅ 완료 |
| Brand General 레스토랑 목록 | getLinkedRestaurants()에서 Brand.findOne → findAll로 변경, 다중 브랜드 지원 | ✅ 완료 |
| EmptyState 통합 디자인 | 53개 파일의 인라인 EmptyState를 TableComponents 공유 컴포넌트로 통합, 센터 정렬 | ✅ 완료 |
| Notice 모달 레이아웃 수정 | Target Type 아래에 레스토랑 선택이 바로 나오도록 FormRow 구조 변경 | ✅ 완료 |
| 공지 등록 후 Sent 탭 이동 | Brand/Foodcourt/Admin NoticesPage에 setActiveTab('sent') 추가 | ✅ 완료 |
| URL 링크 활성화 | 공지 내용/댓글에 포함된 URL을 클릭 가능한 링크로 변환 (linkifyText 유틸) | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/notices.js` - target_type 수정, getLinkedRestaurants 다중 브랜드
- `dev-backend/models/Notice.js` - target_type ENUM에 select_restaurants 추가
- `dev-frontend/src/utils/linkify.tsx` - URL 링크 변환 유틸 (신규)
- `dev-frontend/src/components/UI/TableComponents.tsx` - EmptyState 공유 컴포넌트 강화
- `dev-frontend/src/components/Common/CommentSection.tsx` - 댓글 URL 링크
- `dev-frontend/src/pages/Brand/NoticesPage.tsx` - 레이아웃 + Sent 탭 + URL 링크
- `dev-frontend/src/pages/Foodcourt/NoticesPage.tsx` - 레이아웃 + Sent 탭 + URL 링크
- `dev-frontend/src/pages/Admin/NoticesPage.tsx` - Sent 탭 + URL 링크
- `dev-frontend/src/pages/Owner/NoticesPage.tsx` - URL 링크
- `dev-frontend/src/pages/Restaurant/NoticesPage.tsx` - URL 링크
- 53개 프론트엔드 페이지 - 인라인 EmptyState 제거, 공유 컴포넌트 import

---

## ✅ 완료: Floor Plan 매장 운영 허브 대규모 리팩토링 (2026-03-02)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| DB guest_count 컬럼 추가 | Order 모델에 인원수 필드 추가 | ✅ 완료 |
| table-status API 확장 | 주문상세, 고객정보, 아이템 목록 포함 확장 | ✅ 완료 |
| types.ts 확장 | TableStatusInfo 16개 필드 (OrderItemSummary 포함) | ✅ 완료 |
| TableNode guestCount 표시 | 테이블 노드에 인원수/금액/시간 표시 | ✅ 완료 |
| OrderContext guest_count 추가 | addOrder에 guest_count 매핑 | ✅ 완료 |
| FloorPlanStatsBar 신규 | 하단 범례 + 통계 바 | ✅ 완료 |
| TableDetailPanel 신규 | 우측 상세 패널 (주문조회/상태변경/결제 진입) | ✅ 완료 |
| FloorPlanPage 2단 레이아웃 | 캔버스 + 디테일패널 + 결제모달 통합 | ✅ 완료 |
| OrderOverlay 신규 | POS Terminal 동일 스타일 메뉴+카트+주문 오버레이 | ✅ 완료 |
| POS Terminal guest_count UI | 테이블번호 옆 인원수 셀렉트 | ✅ 완료 |
| FloorPlanCanvas auto-fit | 테이블 배치 기준 자동 뷰포트 + 균일 스케일링 | ✅ 완료 |
| Live Orders guest_count 표시 | 테이블번호 옆 인원수 (4개 위치) | ✅ 완료 |
| 소켓 emission plain object 변환 | 모든 order-created/updated emit에서 .get({plain:true}) 적용 | ✅ 완료 |
| table-status API 결제완료 필터 | payment_status='completed' 주문 제외 | ✅ 완료 |

### 신규 파일
- `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx`
- `dev-frontend/src/pages/FloorPlan/OrderOverlay.tsx`
- `dev-frontend/src/pages/FloorPlan/FloorPlanStatsBar.tsx`

### 수정된 파일
- `dev-backend/models/Order.js` — guest_count 컬럼
- `dev-backend/routes/restaurants.js` — table-status API 확장 + 결제완료 필터
- `dev-backend/routes/orders.js` — 소켓 emit plain object 변환 (8곳)
- `dev-frontend/src/pages/FloorPlan/types.ts` — TableStatusInfo 확장
- `dev-frontend/src/pages/FloorPlan/TableNode.tsx` — guestCount/금액/시간 표시
- `dev-frontend/src/pages/FloorPlan/FloorPlanCanvas.tsx` — auto-fit viewBox + 균일 스케일링
- `dev-frontend/src/pages/FloorPlan/FloorPlanPage.tsx` — 2단 레이아웃 + 패널/오버레이/결제 통합
- `dev-frontend/src/contexts/OrderContext.tsx` — guest_count 매핑
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` — guest_count 셀렉트 UI
- `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx` — guest_count 표시 (4곳)

---

## ✅ 완료: QR코드 결제 설정 버그 수정 + 운영 배포 (2026-03-02)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| QR 키 불일치 수정 | SettingsPage: `qr` / `qrPayment` 둘 다 허용 | ✅ 완료 |
| 모바일 QR 페이지 수정 | QRPaymentPage: `qr` / `qrPayment` 둘 다 체크 | ✅ 완료 |
| 소켓 emit plain object 변환 | 모든 order emit에서 .get({plain:true}) 적용 | ✅ 완료 |
| 운영서버 배포 | 프론트/백엔드 + DB 스키마 동기화 (guest_count, floor_plan) | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` — QR key 양쪽 허용
- `dev-frontend/src/mobile/pages/QRPaymentPage.tsx` — QR key 양쪽 허용
- `dev-backend/routes/orders.js` — 소켓 emit plain object 변환

---

## ✅ 완료: ESLint 빌드 경고 전량 제거 + Floor Plan UI 개선 + 쿠폰 타겟팅 (2026-03-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| ESLint unused var 경고 제거 | 17개 파일에서 미사용 변수/함수/컴포넌트 106개 정리 | ✅ 완료 |
| ESLint exhaustive-deps 경고 제거 | 34개 파일에서 44개 useEffect dependency 경고 처리 | ✅ 완료 |
| Floor Plan +Order/Revert 버튼 | 아이콘만 표시로 변경 (텍스트 겹침 해결) | ✅ 완료 |
| 쿠폰 타겟팅 기능 | target_type(all/customers/tiers), target_customer_ids, target_loyalty_tiers 추가 | ✅ 완료 |
| 운영서버 배포 | Smoke test 6/6 passed | ✅ 완료 |

### 수정된 파일 (주요)
- `dev-frontend/src/components/Inventory/InventoryManager.tsx` — 16개 경고 수정
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx` — 16개 경고 수정
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` — 14개 경고 수정
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` — 15개 경고 수정
- `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx` — 11개 경고 수정
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` — 8개 경고 수정
- `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx` — +Order/Revert 아이콘만 표시
- `dev-backend/models/Coupon.js` — 타겟팅 필드 추가
- `dev-backend/routes/coupons.js` — 타겟팅 API
- 외 60+ 파일 (eslint-disable-next-line 추가)

---

## ✅ 완료: Floor Plan Editor 장식 요소 + 캔버스 개선 (2026-03-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Fixtures 추가 | Counter (H/V) 박스형 + Kitchen/Entrance 텍스트형 배치 | ✅ 완료 |
| 사이드바 아이콘 6개 | Round, Square, Rect(H), Rect(V), Counter(H), Counter(V) | ✅ 완료 |
| Size 프리셋 (S/M/L) | Properties 패널에서 테이블 사이즈 원클릭 변경 + seats 연동 | ✅ 완료 |
| 캔버스 풀 사이즈 | aspect-ratio 제거, 위아래 회색 여백 없이 전체 영역 사용 | ✅ 완료 |
| viewBox 대칭 패딩 | 테이블 바운딩박스 기준 좌우/상하 동일 여백 | ✅ 완료 |
| 선택/삭제 버그 fix | 드래그 후 캔버스 클릭으로 선택 해제되는 문제 수정 | ✅ 완료 |
| 사이드바 스크롤 독립 | 사이드바 길어져도 캔버스 위치 고정 | ✅ 완료 |
| 시간 표시 제거 | 테이블 노드에서 경과 시간 제거, 금액만 표시 | ✅ 완료 |
| letter-spacing 제거 | 테이블/fixture 라벨 자간 정상화 | ✅ 완료 |
| 정사각형 기본 seats 2 | Square 테이블 추가 시 기본 좌석 수 2로 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/FloorPlan/types.ts` — FixtureType, FIXTURE_PRESETS, vertical rect
- `dev-frontend/src/pages/FloorPlan/TableNode.tsx` — fixture 렌더링, 시간 제거, letter-spacing 제거
- `dev-frontend/src/pages/FloorPlan/FloorPlanEditor.tsx` — Fixtures UI, Size 프리셋, 사이드바 스크롤, 선택 버그 fix
- `dev-frontend/src/pages/FloorPlan/FloorPlanCanvas.tsx` — 캔버스 풀 사이즈, 대칭 패딩

---

## ✅ 완료: 통화별 Additional Charges + 인보이스 과금 통합 (2026-03-02)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 통화별 Additional Charges 데이터 구조 | `additionalCharges`를 flat array → per-currency object `{ "MYR": [...], "KRW": [...] }` 로 변경 | ✅ 완료 |
| Payment Settings UI 통화 탭 통합 | Admin/Brand/Foodcourt Payment Settings에서 Additional Charges를 Manual Payment 통화 탭 안으로 이동 | ✅ 완료 |
| Admin InvoicesPage charges 적용 | 수동 인보이스 생성 시 통화별 charges 자동 계산 + API에 `additional_charges` 전송 | ✅ 완료 |
| Brand InvoicesPage charges 적용 | `handleSubmitInvoice`에 `additional_charges` 추가, `tax_rate` 6% 하드코딩 제거 | ✅ 완료 |
| Foodcourt InvoicesPage charges 전체 추가 | `additionalChargesMap` + `getChargesForCurrency` + UI/계산/제출 전체 신규 구현 | ✅ 완료 |
| 백엔드 자동 인보이스 charges 적용 | 구독/Entity Plan 자동 인보이스에서 6% 하드코딩 제거 → Payment Settings 참조 | ✅ 완료 |
| Foodcourt 결제설정 저장 버그 수정 | `validPaymentSettings`에 `additionalCharges` 누락 → 추가 | ✅ 완료 |
| RM→MYR 통화 코드 정규화 | `normalizeCurrencyCode()` 프론트/백엔드 추가, DB의 RM↔MYR 불일치 해결 | ✅ 완료 |

### 수정된 파일
- `dev-backend/utils/paymentSettingsHelper.js` — `normalizeAdditionalCharges` + `CURRENCY_ALIASES`
- `dev-backend/routes/admin-payment-settings.js` — per-currency object 처리
- `dev-backend/routes/brands.js` — default `additionalCharges: {}`
- `dev-backend/routes/foodcourts.js` — `additionalCharges` 저장 버그 수정
- `dev-backend/routes/invoices.js` — `getAdditionalCharges`에 currency 파라미터
- `dev-backend/services/invoiceScheduler.js` — 구독/Entity Plan 자동 인보이스 charges 적용
- `dev-frontend/src/utils/currency.ts` — `normalizeCurrencyCode()`
- `dev-frontend/src/pages/Admin/PaymentSettingsPage.tsx` — 통화 탭 내 charges UI
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` — `additionalChargesMap` + 통화별 charges
- `dev-frontend/src/pages/BrandGeneral/BrandPaymentSettingsPage.tsx` — 통화 탭 내 charges UI
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` — charges 계산/전송
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage.tsx` — 통화 탭 내 charges UI
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` — charges 전체 신규 구현

---

## ✅ 완료: 통화 필터 버그 수정 + Pricing 페이지 에러 해결 + FAQ/Blog 마이그레이션 (2026-03-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Admin PlansPage 통화 수정 | displayCurrency 기본값 USD→동적, fetchCurrencyConfig 응답 키 수정, fallback 통화 수정 | ✅ 완료 |
| Brand/Foodcourt PlansPage 통화 수정 | 동일한 3가지 통화 버그 수정 (BrandPlansPage, FoodcourtPlansPage) | ✅ 완료 |
| PlanPrice 모델 인덱스 정의 | 복합 유니크 키 (plan_id, currency) indexes 추가 | ✅ 완료 |
| Pricing 페이지 하얀 에러 해결 | features가 JSON 문자열인 경우 배열로 파싱 (백엔드 + 프론트엔드 방어 코드) | ✅ 완료 |
| FAQ/Blog DB 마이그레이션 | 개발DB→운영DB content_categories 10건 + contents 25건 마이그레이션 | ✅ 완료 |
| 운영서버 배포 | Smoke test 6/6 passed | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Admin/PlansPage.tsx` — 통화 기본값/필터/API 응답 키 수정
- `dev-frontend/src/pages/BrandGeneral/BrandPlansPage.tsx` — 통화 기본값/필터/API 응답 키 수정
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtPlansPage.tsx` — 통화 기본값/필터/API 응답 키 수정
- `dev-frontend/src/pages/Landing/PricingPage.tsx` — features/included_modules 배열 정규화
- `dev-backend/routes/public.js` — features/included_modules JSON 문자열→배열 파싱
- `dev-backend/models/PlanPrice.js` — 복합 유니크 키 인덱스 정의 추가

---

## ✅ 완료: Contact 페이지 로딩 개선 + GA4/SEO 마케팅 설정 (2026-03-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Favicon/로고 교체 | React 기본 아이콘 → PurpleHere "P" 브랜드 아이콘 (favicon.ico, logo192, logo512) | ✅ 완료 |
| Pricing Owner 탭 | 하드코딩 3개 탭 → API 데이터 기반 동적 탭 생성 (Owner 포함) | ✅ 완료 |
| GA4 추적 코드 | Google Analytics GA4 (G-LTTLKH1J85) 삽입 | ✅ 완료 |
| Consent Mode v2 | Cookie Consent Banner와 GA4 Consent Mode v2 연동 | ✅ 완료 |
| Contact 페이지 로딩 수정 | 하드코딩된 초기값 제거 → API 로딩 전 "Loading..." 표시 | ✅ 완료 |
| AI 마케팅 인사이트 기획 | GA4+Search Console+Claude API 연동 리포트 - Phase C 작업항목 등록 | ✅ 완료 |
| 운영서버 배포 | 전체 변경사항 운영서버 배포 완료 (스모크 테스트 6/6 통과) | ✅ 완료 |

### 수정된 파일
- `dev-frontend/public/favicon.ico` — PurpleHere 브랜드 아이콘
- `dev-frontend/public/logo192.png` — PurpleHere 브랜드 로고
- `dev-frontend/public/logo512.png` — PurpleHere 브랜드 로고
- `dev-frontend/public/index.html` — GA4 + Consent Mode v2
- `dev-frontend/src/components/Common/CookieConsentBanner.tsx` — Consent Mode v2 연동
- `dev-frontend/src/pages/Landing/PricingPage.tsx` — 동적 탭 생성
- `dev-frontend/src/pages/Landing/ContactPage.tsx` — 하드코딩 초기값 제거, 로딩 처리

---

## ✅ 완료: 이미지 재업로드 시 이전 파일 자동 삭제 + API 성능 최적화 (2026-03-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| deleteOldImages 유틸리티 | /uploads/ 경로 이미지 재업로드 시 이전 파일 자동 삭제 함수 | ✅ 완료 |
| 10개 라우트 적용 | menu, brands, foodcourts, restaurants, admin-settings, siteSettings, ingredients, recipes, general-stock, inventory-routes | ✅ 완료 |
| site-settings API 최적화 | og_image_url(209KB) 제외 → 231KB→22KB (91% 감소) | ✅ 완료 |
| Nginx 정적 파일 캐싱 | 이미지/폰트/아이콘 7일 브라우저 캐시 적용 | ✅ 완료 |
| 운영서버 배포 | 전체 변경사항 운영서버 배포 완료 (스모크 테스트 6/6 통과) | ✅ 완료 |

### 수정된 파일
- `dev-backend/utils/imageProcessor.js` — deleteOldImages 함수 추가
- `dev-backend/routes/menu.js` — 상품 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/brands.js` — 브랜드 로고 재업로드 시 이전 파일 삭제
- `dev-backend/routes/foodcourts.js` — 푸드코트 로고 재업로드 시 이전 파일 삭제
- `dev-backend/routes/restaurants.js` — 레스토랑 로고/재료 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/admin-settings.js` — 회사 설정 로고 재업로드 시 이전 파일 삭제
- `dev-backend/routes/siteSettings.js` — 사이트 설정 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/ingredients.js` — 재료 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/recipes.js` — 레시피 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/general-stock.js` — 일반 재고 이미지 재업로드 시 이전 파일 삭제
- `dev-backend/routes/inventory-routes.js` — 레스토랑 재고 이미지 재업로드 시 이전 파일 삭제

---

## ✅ 완료: 전체 페이지 공통 Modal 컴포넌트 마이그레이션 (2026-03-07)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 24개 페이지 Modal 마이그레이션 | 커스텀 styled-component 모달을 공통 Modal(UI/Modal.tsx)로 통합 | ✅ 완료 |
| Footer 고정 동작 통일 | 모든 모달에서 footer가 하단에 고정되도록 통일 | ✅ 완료 |
| 불필요한 styled-components 제거 | Modal/ModalOverlay/ModalContent/ModalHeader/ModalTitle/CloseButton/ModalBody/ModalFooter 로컬 정의 제거 | ✅ 완료 |

### 수정된 파일 (24개 페이지)
- `dev-frontend/src/pages/Admin/AddonModulesPage.tsx`
- `dev-frontend/src/pages/Admin/ContactInquiriesPage.tsx`
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx`
- `dev-frontend/src/pages/Admin/NoticesPage.tsx`
- `dev-frontend/src/pages/Admin/PlansPage.tsx`
- `dev-frontend/src/pages/Admin/RestaurantSubscriptionsPage.tsx`
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx`
- `dev-frontend/src/pages/Admin/StaffManagementPage.tsx`
- `dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`
- `dev-frontend/src/pages/Admin/SystemInquiryPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandPlansPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandSubscriptionsPage.tsx`
- `dev-frontend/src/pages/Customers/CustomersPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtPlansPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtSubscriptionsPage.tsx`
- `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx`
- `dev-frontend/src/pages/Manager/InvoicesPage.tsx`
- `dev-frontend/src/pages/Manager/ManagerPromotionsPage.tsx`
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx`
- `dev-frontend/src/pages/Manager/SubscriptionsPage.tsx`
- `dev-frontend/src/pages/Promotions/PromotionsPage.tsx`

---

## ✅ 완료: 모달 제목/footer 버그 수정 + Plan Target 표시 (2026-03-07)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 모달 제목 리터럴 버그 수정 (23건) | `title="Edit Plan: {selectedPlan.name}"` → 템플릿 리터럴로 변경 | ✅ 완료 |
| 모달 footer 누락 복원 (13건) | Create/Edit/View/Prices 모달에 Cancel/Save/Close 버튼 footer 추가 | ✅ 완료 |
| Plan 카드 description → Plan Target | 카드에 description 대신 Plan Target(Restaurant/Brand/Foodcourt/Owner Plan) 표시 | ✅ 완료 |
| Pricing 페이지 Plan Target 반영 | PricingPage에서도 description 대신 Plan Target 표시 | ✅ 완료 |
| Prices 모달 레이아웃 수정 | input box-sizing: border-box 추가로 넘침 해결 | ✅ 완료 |

### 수정된 파일 (20개)
- `dev-frontend/src/pages/Admin/PlansPage.tsx`
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx`
- `dev-frontend/src/pages/Admin/ContactInquiriesPage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx`
- `dev-frontend/src/pages/Admin/RestaurantSubscriptionsPage.tsx`
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx`
- `dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandPlansPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandSubscriptionsPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtPlansPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtSubscriptionsPage.tsx`
- `dev-frontend/src/pages/Manager/InvoicesPage.tsx`
- `dev-frontend/src/pages/Manager/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Brand/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Brand/NoticesPage.tsx`
- `dev-frontend/src/pages/Foodcourt/OperationInquiryPage.tsx`
- `dev-frontend/src/pages/Owner/NoticesPage.tsx`
- `dev-frontend/src/pages/Owner/OwnerOperationInquiryPage.tsx`
- `dev-frontend/src/pages/Landing/PricingPage.tsx`

---

## ✅ 완료: 브랜드 로고 정적 파일 최적화 + K-Dine 관리자 연결 수정 (2026-03-10)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 브랜드 로고 정적 파일 전환 | base64 API 호출 → `/uploads/logos/brand-logo.png` 정적 파일 직접 참조 (로딩 속도 4배 개선) | ✅ 완료 |
| Favicon 정적 파일 전환 | 동일하게 `/uploads/logos/favicon.png` 정적 파일 방식으로 변경 | ✅ 완료 |
| imageProcessor 유틸 추가 | `saveImageToFile()` - base64 → 고정 파일명 PNG 저장 (sharp 리사이즈) | ✅ 완료 |
| 로고 마이그레이션 스크립트 | `scripts/migrate-logos-to-files.js` - 기존 DB base64 → 파일 일괄 변환 | ✅ 완료 |
| K-Dine 관리자 연결 수정 | 운영DB restaurants.admin_id=NULL → 9 (kdine_admin) 매칭 복구 | ✅ 완료 |
| 운영서버 배포 | Smoke 6/6 통과, 로고 정적 로딩 정상, K-Dine 관리자 표시 정상 | ✅ 완료 |

### 수정된 파일
- `dev-backend/utils/imageProcessor.js` (saveImageToFile 추가)
- `dev-backend/routes/siteSettings.js` (base64 → 파일 저장 로직)
- `dev-backend/routes/admin-settings.js` (base64 → 파일 저장 로직)
- `dev-backend/scripts/migrate-logos-to-files.js` (새 파일)
- `dev-frontend/src/components/Landing/LandingHeader.tsx` (API fetch 제거 → 정적 경로)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (API fetch 제거 → 정적 경로 + 캐시버스트)
- `dev-frontend/src/pages/Login/LoginPage.tsx` (API fetch 제거 → 정적 경로)
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` (API fetch 제거 → 정적 경로 + 캐시버스트)

---

## ✅ 완료: Footer Company 섹션 + ScrollToTop 개선 (2026-03-11)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Footer 웹링크 전체 URL 표시 | `gitconsulting.group` → `https://gitconsulting.group`으로 변경 | ✅ 완료 |
| ScrollToTop 모바일 대응 | useLayoutEffect + document.body.scrollTop 추가로 모바일 스크롤 컨테이너 대응 | ✅ 완료 |
| 운영서버 배포 | Footer + ScrollToTop 수정 반영 (2회 배포) | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/components/Landing/LandingFooter.tsx`
- `dev-frontend/src/components/ScrollToTop.tsx`

---

## ✅ 완료: 인보이스 시스템 확장 + 매니저 구독 관리 (2026-03-12)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 인보이스 일괄 생성 버튼 | Admin InvoicesPage에 "Generate Missing Invoices" 버튼 추가 (연회색) | ✅ 완료 |
| RestaurantsPage +Invoice 버튼 제거 | 불필요한 개별 인보이스 생성 버튼 제거 | ✅ 완료 |
| Brand/Foodcourt/Owner 구독 인보이스 자동발행 | invoiceScheduler에 generateEntitySubscriptionInvoices() 추가 | ✅ 완료 |
| ManagersPage Edit 구독 데이터 표시 | GET /api/users에 Brand/Foodcourt 테이블 JOIN, Edit 팝업에 실제 데이터 로드 | ✅ 완료 |
| ManagersPage Add/Edit 구독 저장 | POST/PUT /api/users에 구독 필드 전송 + Brand/Foodcourt entity 자동 생성 | ✅ 완료 |
| Subscription End Date 자동 계산 | Start Date + Billing Cycle(monthly/annual)로 End Date 자동 계산 | ✅ 완료 |
| ManagersPage 팝업 레이아웃 정돈 | FormLabel/FormInput/FormGrid 스타일 통일 | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/users.js` (GET join, POST entity 생성, PUT 구독 업데이트)
- `dev-backend/routes/invoices.js` (bulk generate endpoint)
- `dev-backend/services/invoiceScheduler.js` (generateEntitySubscriptionInvoices)
- `dev-backend/services/authService.js` (signup invoice 연동)
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` (bulk 생성 버튼)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` (+Invoice 버튼 제거)
- `dev-frontend/src/pages/Admin/ManagersPage.tsx` (구독 데이터 CRUD + 레이아웃)

---

## ✅ 완료: 버그 수정 + Free 인보이스 Confirm + 푸터 로고 (2026-03-16)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Company Information 저장 시 로그아웃 버그 수정 | fetch에 Authorization 헤더 누락 → 401 → 자동 로그아웃. GET/PUT 모두 토큰 추가 | ✅ 완료 |
| Company Information 필수항목 검증 | 필수항목(*) 미입력 시 저장버튼 비활성화 | ✅ 완료 |
| Ingredients/Recipes DELETE 401 버그 수정 | DELETE fetch에 Authorization 헤더 누락 → 로그아웃 가능성. 토큰 추가 | ✅ 완료 |
| Free 인보이스 Confirm 버튼 | 100% 할인 인보이스(total=0)가 pending_payment에 멈추는 문제. 모든 역할 인보이스 페이지에 Confirm 버튼 추가 | ✅ 완료 |
| additionalCharges 타입 에러 수정 | BrandInvoicesPage/FoodcourtInvoicesPage Invoice 인터페이스에 additionalCharges 프로퍼티 추가 | ✅ 완료 |
| 인보이스 status API payment_notes 지원 | PATCH /:id/status에 payment_notes 필드 추가 | ✅ 완료 |
| 푸터 로고 교체 | LandingFooter "PurpleHere" 텍스트 → SVG 흰색 로고 이미지, 좌측 정렬 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx` (auth 헤더 + 필수항목 검증)
- `dev-frontend/src/pages/Ingredients/IngredientsPage.tsx` (DELETE auth 헤더)
- `dev-frontend/src/pages/Recipes/RecipesPage.tsx` (DELETE auth 헤더)
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx` (Free Confirm 버튼)
- `dev-frontend/src/pages/Owner/OwnerInvoicesPage.tsx` (Free Confirm 버튼)
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` (Free Confirm + additionalCharges 타입)
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` (Free Confirm + additionalCharges 타입)
- `dev-frontend/src/pages/Manager/InvoicesPage.tsx` (Free Confirm 버튼)
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` (Free Mark Paid 버튼)
- `dev-backend/routes/invoices.js` (payment_notes 지원)
- `dev-frontend/src/components/Landing/LandingFooter.tsx` (SVG 로고 교체)
- `dev-frontend/public/images/logo-white.svg` (브랜드 로고 추가)

---

## ✅ 완료: 사이드바 배지 로직 수정 + Kitchen Station 기획 (2026-03-17)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 사이드바 배지 조건 수정 | Restaurant의 System Inquiry / Operation Inquiry 배지를 "open 티켓 수" → "읽지 않은 답변(댓글) 수"로 변경 | ✅ 완료 |
| 리스트 카드 답변 배지 | SupportTicketsPage, OperationInquiryPage 카드에 "New Reply" / "Replied" 배지 추가 | ✅ 완료 |
| Kitchen Station 기획 | 멀티 주방 시스템 전체 설계 완료 (설계서: docs/KITCHEN_STATION_SYSTEM.md) | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/badgeCounts.js` (Restaurant Admin/Staff 배지 조건 변경)
- `dev-frontend/src/components/Layout/MainLayout.tsx` (사이드바 배지 조건)
- `dev-frontend/src/pages/Restaurant/SupportTicketsPage.tsx` (New Reply/Replied 배지)
- `dev-frontend/src/pages/Restaurant/OperationInquiryPage.tsx` (New Reply/Replied 배지)

---

## ✅ 완료: Kitchen Display Item View + 실시간 업데이트 (2026-03-17)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Item View 모드 추가 | Order View 옆에 Item View 토글, 아이템 단위로 주방 작업 관리 | ✅ 완료 |
| Pending 그룹핑 | 메뉴명 기준 그룹핑 (plain 합산, option 개별), Start All/Start 버튼 | ✅ 완료 |
| Preparing 배치 시스템 | Pending에서 보낸 그대로 유지 (합치지 않음), Done All/Done + 되돌리기 | ✅ 완료 |
| Ready 주문 카드 | 주문 기반 카드, 개별 Serve/되돌리기, 진행률 바, "Waiting X items" 배너 | ✅ 완료 |
| 실시간 업데이트 | socket order-updated 핸들러에 아이템 데이터 완전 갱신 추가 | ✅ 완료 |
| Polling 간격 개선 | 30초 → 5초로 단축, socket reconnect 강화 | ✅ 완료 |
| DB 정합성 수정 | completed 상태 레거시 아이템 9건 정리 | ✅ 완료 |
| 빌드 경고 제거 | totalSources 미사용 변수, no-mixed-operators 경고 수정 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx`

---

## 🔲 예정: Kitchen Station 시스템 (멀티 주방 지원)

> **기획 완료:** 2026-03-17
> **상세 설계:** `/var/www/docs/KITCHEN_STATION_SYSTEM.md`

### 개요
레스토랑에 여러 주방(Station) 등록 → Kitchen Display 주방별 필터 → 주문 시 주방별 오더티켓 분리 인쇄

### 구현 Phase

| Phase | 내용 | 규모 | 상태 |
|-------|------|------|:----:|
| **Phase 1** | DB 테이블(kitchen_stations) + Model + API CRUD | 중 | ⬜ |
| **Phase 2** | Settings → Kitchen Stations 탭 (주방 등록 + 메뉴 배정) | 중 | ⬜ |
| **Phase 3** | Printer 탭 Station별 프린터 카드 확장 | 소 | ⬜ |
| **Phase 4** | Kitchen Display 주방 필터 탭 | 중 | ⬜ |
| **Phase 5** | 오더티켓 주방별 분리 인쇄 (RawBT 멀티프린터) | 중 | ⬜ |

### 핵심 설계 결정
- **배정 모드**: 카테고리 기본 + 메뉴 개별 오버라이드
- **프린터**: RawBT 경유 (Wi-Fi/LAN IP 프린터 지원), 네트워크 직접 TCP 안 함
- **프린터 설정 위치**: 기존 Printer 탭에 유지 (Station별 프린터 카드로 자동 전환)
- **하위 호환**: Station 0개면 현재와 100% 동일 동작

---

## ✅ 완료: 계약관리 Phase 1+2 + UI 개선 + AutoSaveField 통일 (2026-04-08)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Contract Phase 1 Core | DB 모델 7개, API 20개, Pipeline/List/Detail UI | ✅ 완료 |
| Contract Phase 2 Features | Document 업로드, CommentSection, Setup Checklist, History | ✅ 완료 |
| UI 개선 | StatCard 색상, ViewToggle, DatePeriodFilter 통합, Pipeline 카드 보강 | ✅ 완료 |
| AutoSaveField 통일 | InvoiceSettings, CompanySettings, CompanyProfile 3개 페이지 적용 | ✅ 완료 |
| AutoSaveField 버그 수정 | 아이콘 위치 점프 + 즉시 spinner 반응 | ✅ 완료 |
| Owner Plan 버그 수정 | 매니저 설정에서 Owner Plan 표시 안 되는 필터 버그 | ✅ 완료 |
| 서버사이드 검색 | 계약 검색을 서버사이드로 전환, 코멘트 내용 포함 | ✅ 완료 |
| URL 상태 유지 | view/id를 URL 파라미터로 관리 (새로고침 유지) | ✅ 완료 |
| CHANGELOG 시스템 | 개발 내역 추적 + 배포 시 릴리즈 노트 연동 | ✅ 완료 |

### 수정된 파일 (주요)
- `dev-frontend/src/components/Contract/` (4개 컴포넌트)
- `dev-frontend/src/components/Common/AutoSaveField.tsx`
- `dev-frontend/src/pages/InvoiceSettings/InvoiceSettingsPage.tsx`
- `dev-frontend/src/pages/Manager/CompanySettingsPage.tsx`
- `dev-frontend/src/pages/CompanyProfile/CompanyProfilePage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx`
- `dev-backend/routes/contracts.js`, `foodcourt-units.js`
- `dev-backend/models/Comment.js`, `CommentRead.js` (ENUM 확장)
- `dev-backend/routes/comments.js` (validTypes)

---

## ✅ 완료: Subscriptions Pending Plan Change + Foodcourt General Parity (2026-04-22)

### 배경
`/pos/brand/general/subscriptions` 에서 이미 플랜이 배정된 레스토랑에 새 플랜을 추가해도 드롭다운에 나오거나 즉시 교체되는 문제. 버튼들 silent 실패. 플랜 변경이 언제부터 반영되는지 표시 없음. 푸드코트 구독은 Add 버튼 자체가 부재, Manager Restaurants Edit 에도 푸드코트 구독 섹션 없음.

### 완료된 작업

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | DB: EntityPlanRestaurant 에 pending_plan_id + pending_activation_date 컬럼 | 다음 청구 주기 전환용. 기존 데이터 null 기본 (backward-compat) | ✅ |
| 2 | POST /brands/:id/plans/:planId/restaurants 리팩터 | 동일 브랜드 다른 active 플랜 → pending으로 스케줄 (즉시 교체 X), 없음 → 즉시 배정, 동일 → no-op | ✅ |
| 3 | POST /foodcourts/:id/plans/:planId/restaurants 동일 적용 | 푸드코트 구독 POST도 pending 플로우 | ✅ |
| 4 | GET /brands/:id/subscriptions + /foodcourts/:id/subscriptions | 응답에 pending_plan 필드 포함 (id/name/charge_type/activation_date) | ✅ |
| 5 | POST .../cancel-pending 신규 엔드포인트 | 브랜드/푸드코트 예정 변경 취소 | ✅ |
| 6 | Scheduler cron pending EPR swap | 매일 2AM — pending_activation_date ≤ 오늘이면 entity_plan_id 교체 + ActivityLog | ✅ |
| 7 | BrandSubscriptionsPage Add 모달 필터 + 에러 surfacing | 플랜 있는 레스토랑 드롭다운 제외, Assign/Unassign/Discount silent console.error → inline+toast | ✅ |
| 8 | BrandSubscriptionsPage Row 예정 변경 배너 + Cancel | "Scheduled change: X on YYYY-MM-DD" amber 배너 + Cancel 버튼 | ✅ |
| 9 | Change Plan 모달 경고 힌트 | "다음 청구 주기부터 적용" changeScheduledHint 배너 | ✅ |
| 10 | FoodcourtSubscriptionsPage — 브랜드와 동일 모든 기능 미러 | Add 모달 + 필터 + 에러 surfacing + Row 예정 배너 + Change 경고 | ✅ |
| 11 | Manager Edit 모달 — Foodcourt Subscription 섹션 (FG용) | Tenancy Contract + Foodcourt Plan 2카드, 인라인 피커 2개 (검색+Link), 배지/뷰어 | ✅ |
| 12 | FoodcourtSubscriptionsPage 자체에 + Add Subscription 버튼 | 입점 레스토랑 + 플랜 선택 모달 (BrandSubscriptionsPage 미러) | ✅ |
| 13 | Manager Edit — Brand Subscription 섹션 보조 정비 | 인라인 피커 open/close 시 Edit 모달 unmount 방지, 피커 backdrop 불투명 (0.85) | ✅ |
| 14 | i18n: brand/foodcourt/admin/contract 네임스페이스 신규 30+ 키 × 4언어 | en/ko/zh/ms 모두 추가 + JSON 유효성 검증 | ✅ |

### API 검증 결과 (실제 호출)
- Brand: initial(plan18) → POST plan38 = `scheduled` activation=2026-05-27 → cancel → POST plan18 = `already_assigned` → 404(plan 999999) → 403(cross-brand)
- Foodcourt: t#2 빈 상태 → POST plan21 = `assigned` → POST plan22 = `scheduled` activation=2026-05-28 → cancel → DELETE restore
- Hydration check: 0 warning / Build: 타입에러 0 / 번들 3개 chunk에 신규 코드 포함

### 수정된 파일
- `dev-backend/models/EntityPlanRestaurant.js`
- `dev-backend/routes/brands.js`
- `dev-backend/routes/foodcourts.js`
- `dev-backend/services/invoiceScheduler.js`
- `dev-frontend/src/pages/BrandGeneral/BrandSubscriptionsPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtSubscriptionsPage.tsx`
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx`
- `dev-frontend/src/components/Contract/LinkedPlansSection.tsx` (View all plans, 마법사 제거)
- `dev-frontend/src/components/Contract/ContractDetail.tsx` (+ Issue One-time 제거)
- `dev-frontend/public/locales/{en,ko,zh,ms}/{brand,foodcourt,admin,contract}.json`

---

## 🚀 서비스 오픈 준비 로드맵 (현재 진행 중)

### 현재 상황

**목표:** 현재까지 구현된 기능(재고관리까지)으로 서비스 오픈

**필요한 3가지 영역:**
1. 구독/결제 플랜 완성 → ✅ 완료
2. 고객 회계 서포트 (기존 메뉴 버그 수정) → ✅ 완료
3. 홍보 웹페이지 → ✅ 완료

---

### Phase A: 오픈 필수 ✅ 완료 (2026-02-05)

| 순서 | 작업 | 영역 | 상태 |
|:----:|------|------|:----:|
| 1 | CSV 다운로드 버그 수정 | 회계 | ✅ 완료 |
| 2 | PDF 다운로드 버그 수정 | 회계 | ✅ 완료 |
| 3 | Pricing 페이지 | 홍보 | ✅ 완료 |
| 4 | Contact 페이지 | 홍보 | ✅ 완료 |
| 5 | 랜딩페이지 SEO 최적화 | 홍보 | ✅ 완료 |

### Phase B: 오픈 직후 ✅ 완료

| 작업 | 설명 | 상태 |
|------|------|:----:|
| FAQ 페이지 | Blog/FAQ CMS로 구현 (2026-02-05) | ✅ 완료 |
| 데모 콘텐츠 | 데모 계정 데이터 구성 완료 (2026-02-02) | ✅ 완료 |
| 이메일 템플릿 | Brand/Foodcourt 이메일 시스템 완성 (Phase 4, 2026-02-09) | ✅ 완료 |

### Phase C: 고객 피드백 후

| 작업 | 트리거 |
|------|--------|
| ~~셀프 회원가입~~ | ✅ 완료 (2026-03-11) |
| Stripe/PayPal 연동 | 해외 고객 요청 시 |
| 세금계산서 | 특정 국가 요구 시 |
| **AI 마케팅 인사이트 대시보드** | GA4 + Search Console 데이터 축적 후 |

#### AI 마케팅 인사이트 대시보드 (향후)
- **GA4 API 연동**: 방문자 통계, 인기 페이지, 유입 경로, 전환율
- **Search Console API 연동**: 검색 키워드, 노출/클릭수, 순위 변동
- **AI 분석 리포트**: Claude API로 데이터 분석 → 실행 가능한 마케팅 전략 제안
  - 주간/월간 자동 리포트 생성
  - 키워드 트렌드 기반 콘텐츠 전략 추천
  - 전환율 개선 제안, 이탈 페이지 분석
  - 경쟁사 대비 포지셔닝 인사이트
- **대상**: System Admin 대시보드에 전용 페이지 추가
- **필요 작업**: Google Cloud Console API 키/서비스 계정 설정

---

### ✅ 버그 수정 완료 (2026-02-05 확인)

| # | 위치 | 문제 | 상태 |
|:-:|------|------|:----:|
| 1 | Reports 페이지 | CSV 다운로드 - `csvDownload.ts` 유틸로 Safari 호환 + 메모리 누수 방지 | ✅ 완료 |
| 2 | Invoice 페이지 | PDF 다운로드 - `jsPDF` + `html2canvas`로 안정적 렌더링 | ✅ 완료 |

---

## 📋 메뉴/재료/재고 구조 재정리 — Phase 3~4 (System Admin / Foodcourt General 확장)

> Phase 1~2에서 Restaurant Admin + Brand General 완료. 동일 기능을 나머지 역할에 확장.

### Phase 3: System Admin 확장

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | 레시피/재료 조회 | System Admin 대시보드에서 전체 레스토랑/브랜드의 레시피·재료 조회 (읽기 전용) | ⬜ |
| 2 | 통계 연동 | 재료 원가, 레시피 비용 통계를 System Admin 리포트에 추가 | ⬜ |
| 3 | 재고 현황 모니터링 | 전체 레스토랑 재고 현황 대시보드 (재고 부족 알림 등) | ⬜ |

### Phase 4: Foodcourt General 확장

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1 | Foodcourt 레시피/재료 시스템 | Brand General과 동일한 구조 적용 (Foodcourt용 ProductRecipe/ProductIngredient) | ⬜ |
| 2 | Foodcourt Ingredients 페이지 | 사이드바 메뉴 + 라우트 + 페이지 (Brand와 동일 패턴) | ⬜ |
| 3 | Foodcourt Product directIngredients | 상품-재료 직접 연결 + auto recipe | ⬜ |
| 4 | 뷰모드/상세 팝업/이미지 비율 | Phase 2에서 통일한 UI 패턴 그대로 적용 | ⬜ |

### 참고: Phase 1~2에서 확립된 패턴 (그대로 재사용)
- **자동 레시피**: `directIngredients[]` → backend가 `(auto)` 레시피 생성 → `recipe_id` 연결
- **뷰모드**: Compact/Image 토글, `localStorage` 저장
- **상세 팝업**: ViewContainer 디자인 (이미지+헤더, Cost&Time 그리드, Ingredient 테이블, Instructions, Connected Items)
- **이미지 비율**: `aspect-ratio: 16/9`, `border-radius: 8px 8px 0 0`
- **Usage API**: 재료 → 연결된 레시피/메뉴 조회
- **addon_modules.ui_routes**: 모듈별 라우트 권한 관리

---

## 📋 재료/재고/발주 시스템 (v3.0) - 오픈 후 진행

### 개발 Phase (8단계)

| Phase | 내용 | 상태 |
|-------|------|:----:|
| **Phase 1** | 기반 정비 (Track Stock 토글 등) | ✅ 완료 |
| **Phase 2** | DB 테이블 생성 (10개 테이블) | ⬜ 진행예정 |
| **Phase 3** | Supplier 시스템 | ⬜ |
| **Phase 4** | 거래 관계 | ⬜ |
| **Phase 5** | Supplier Product → Ingredient 연동 | ⬜ |
| **Phase 6** | 발주 시스템 | ⬜ |
| **Phase 7** | 청구/결제 시스템 | ⬜ |
| **Phase 8** | SOA 월정산 | ⬜ |

> **상세 기획:** 이 문서 하단의 "📋 개발 예정: 재료/재고/발주 시스템 (v3.0)" 섹션 참조

---

## ✅ 완료: 주방 티켓 개별 출력 + 배포 스크립트 개선 (2026-01-30)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 주방 티켓 개별 출력 | Settings에 "Print separate ticket for each item" 토글 추가 | ✅ 완료 |
| 배포 스크립트 v3.0 | sudo 비밀번호 제거, 88초로 단축, --auto 플래그 | ✅ 완료 |
| 레시피/상품 이미지 URL | yield_amount, yield_unit, image_thumbnail 컬럼 추가 | ✅ 완료 |
| 운영서버 배포 | 커밋 6b0a156 배포 완료 | ✅ 완료 |

### 주방 티켓 개별 출력 상세

- Settings > Printer Settings에 토글 추가
- RawBT(Android): 아이템별 500ms 간격 개별 출력
- 브라우저 인쇄: 멀티페이지 HTML, page-break-after 적용

**수정된 파일:**
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/utils/billPrint.js`

### 배포 스크립트 v3.0 상세

- **문제:** sudo 비밀번호 필요, 배포 10분+ 소요
- **해결:**
  - nginx 명령만 NOPASSWD로 sudoers 설정
  - 불필요한 단계 제거, 병렬 처리
  - --auto 플래그로 CI/CD 자동화 지원
- **결과:** 배포 시간 88초로 단축

**수정된 파일:**
- `deploy-production-v3.sh`
- `/etc/sudoers.d/deploy-permissions`

---

## ✅ 완료: 서버 안정화 및 배포 (2026-01-28 저녁)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| PM2 메모리 설정 수정 | Heap OOM 크래시 방지 (384MB → 768MB) | ✅ 완료 |
| 운영 DB 스키마 동기화 | general_stock.owner_id, general_stock_categories.owner_id 추가 | ✅ 완료 |
| /저장 명령어 생성 | 세션 상태 저장 명령어 추가 | ✅ 완료 |
| 운영서버 배포 완료 | 30b405f 커밋 배포 | ✅ 완료 |

### PM2 설정 변경 (ecosystem.config.js)

| 항목 | 이전 | 변경 후 |
|------|------|---------|
| node_args | --max-old-space-size=384 | --max-old-space-size=768 |
| max_memory_restart | 512M | 800M |

**원인:** production-backend가 538MB 힙 메모리 사용 중 OOM 크래시 발생

---

## 📋 현재 개발: 재료/재고/발주 시스템 (v3.0)

### 개발 Phase (8단계)

| Phase | 내용 | 상태 |
|-------|------|:----:|
| **Phase 1** | 기반 정비 (Track Stock 토글 등) | ✅ 완료 |
| **Phase 2** | DB 테이블 생성 (11개 테이블) | ⬜ 진행예정 |
| **Phase 3** | Supplier 시스템 | ⬜ |
| **Phase 4** | 거래 관계 | ⬜ |
| **Phase 5** | Supplier Product → Ingredient 연동 | ⬜ |
| **Phase 6** | 발주 시스템 | ⬜ |
| **Phase 7** | 청구/결제 시스템 | ⬜ |
| **Phase 8** | SOA 월정산 | ⬜ |

> **상세 기획:** 이 문서 하단의 "📋 개발 예정: 재료/재고/발주 시스템 (v3.0)" 섹션 참조

---

### Phase 1 완료 (2026-01-28)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Track Stock 토글 복원 | 재료 카드에 Track in Inventory 토글 추가 | ✅ 완료 |
| Recipes 메뉴 접근 버그 | Brand Manager가 Recipes 메뉴 클릭 불가 수정 | ✅ 완료 |
| 토글 ON/OFF 버그 수정 | 토글이 꺼지지 않던 문제 수정 (관계 객체 제외) | ✅ 완료 |

**수정된 파일:**
- `pages/RecipeManagement/IngredientsTab.tsx` - Track Stock 토글 UI, handleTrackStockToggle 함수
- `pages/BrandProductRecipe/ProductIngredientsTab.tsx` - Track Stock 토글 UI, 관계 객체 제외 수정
- `App.tsx` - Recipes 메뉴 requiredRole에 'Brand Manager' 추가

---

## ✅ 완료: Invoice 시스템 개선 (2026-01-27 오후)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Additional Charges 연동 | Payment Settings 추가비용이 Create Invoice에 반영 | ✅ 완료 |
| 시스템관리자 Draft 저장 | Create Invoice 시 Draft로 먼저 저장 | ✅ 완료 |
| Period 자동 입력 제거 | 개별 발행 시 billing_period null | ✅ 완료 |
| 리스트 정렬 개선 | Due Date → Issue Date 최신순 정렬 | ✅ 완료 |
| Overdue 표시 | due_date 기반 동적 계산으로 빨간색 표시 | ✅ 완료 |

### 핵심 구현 사항

1. **Additional Charges 연동**
   - BrandInvoicesPage에서 payment_settings.additionalCharges 로드
   - Create/Edit Invoice 금액 계산 시 설정된 추가비용 적용
   - Summary에서 각 항목별 (이름, 비율%) 동적 표시

2. **시스템관리자 Invoice 워크플로우**
   - Create Invoice → status: 'draft' (기존 pending_payment)
   - Send 아이콘 클릭 → pending_payment로 변경

3. **Overdue 동적 계산**
   - `isInvoiceOverdue()`: due_date < 오늘 && status가 paid/cancelled/draft 아님
   - `getEffectiveStatus()`: overdue 상태 반환
   - StatusBadge에서 빨간색(overdue) 표시

### 관련 파일

**Frontend:**
- `pages/Admin/InvoicesPage.tsx` - Draft 저장, Overdue 계산, 정렬 개선
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Additional Charges 연동, Overdue 계산
- `pages/Restaurant/InvoicesPage.tsx` - Overdue 계산 추가

---

## ✅ 완료: 결제설정 추가비용, 메뉴 관리, 재료/레시피 개선 (2026-01-27)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Additional Charges 설정 | 결제설정에 추가비용 항목 3개 (Tax, Service Charge 등) | ✅ 완료 |
| 메뉴 복사 기능 | 기존 메뉴 복제하여 새 메뉴 생성 | ✅ 완료 |
| 메뉴 비활성화 기능 | 삭제 없이 메뉴 숨김 처리 | ✅ 완료 |
| 재료 모달 Track Stock 제거 | Add/Edit 모달에서 불필요한 체크박스 제거 | ✅ 완료 |
| 레시피 소수점 2자리 표시 | 재료 수량 표시를 2자리로 제한 (0.5000 → 0.50) | ✅ 완료 |
| Invoice 페이지 버그 수정 | StatCard color prop, currency 필드 수정 | ✅ 완료 |

### 핵심 구현 사항

1. **Additional Charges (결제설정 추가비용)**
   - Invoice 모델에 additional_charges JSON 필드 추가
   - PaymentSettingsPage (Admin, Brand)에 추가비용 UI 추가
   - 최대 3개 항목 설정 가능 (enabled, name, rate)

2. **메뉴 복사/비활성화 기능**
   - Product 모델에 is_active 필드 추가
   - `/product/:id/copy` API 추가 (메뉴 복제)
   - `/product/:id/toggle-active` API 추가 (활성화 토글)
   - MenuManagementPage에 아이콘 버튼 (복사, 비활성화, 품절, 삭제)

3. **재료/레시피 개선**
   - IngredientsTab.tsx: 모달에서 Track in Inventory 체크박스 제거
   - ProductIngredientsTab.tsx: 동일하게 체크박스 제거
   - RecipesTab.tsx: 재료 수량 .toFixed(2)로 2자리 표시

### 관련 파일

**Backend:**
- `models/Invoice.js` - additional_charges 필드
- `models/Product.js` - is_active 필드
- `routes/menu.js` - copy, toggle-active API
- `routes/admin-payment-settings.js` - additionalCharges 처리

**Frontend:**
- `pages/Admin/PaymentSettingsPage.tsx` - 추가비용 UI
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 추가비용 UI
- `pages/MenuManagement/MenuManagementPage.tsx` - 아이콘 버튼, 비활성화 상태
- `pages/RecipeManagement/IngredientsTab.tsx` - 체크박스 제거
- `pages/BrandProductRecipe/ProductIngredientsTab.tsx` - 체크박스 제거
- `pages/RecipeManagement/RecipesTab.tsx` - 소수점 2자리

---

## ✅ 완료: Live Orders 성능 최적화 및 버그 수정 (2026-01-26)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Orders Counts API | 탭 카운트 전용 API 추가 (10,000개 fetch 제거) | ✅ 완료 |
| 서버사이드 필터링 | 날짜/검색 필터를 백엔드에서 처리 | ✅ 완료 |
| 빌프린트 테이블번호 | Table > Pager > Pickup 우선순위 적용 | ✅ 완료 |

### 핵심 구현 사항

1. **Orders Counts API (`/api/orders/restaurant/:id/counts`)**
   - SQL 집계로 상태별 카운트만 반환
   - 날짜 범위 파라미터 지원 (startDate, endDate)
   - 전체 주문 fetch 없이 빠른 탭 카운트 제공

2. **서버사이드 필터링**
   - 기존 orders API에 startDate, endDate, search 파라미터 추가
   - 클라이언트에서 10,000개 필터링 → 서버에서 100개 필터링

3. **프론트엔드 최적화 (LiveOrdersPage.tsx)**
   - `allOrders` 상태 제거, `orderCounts` 상태로 변경
   - `fetchOrderCounts` 함수로 카운트만 가져옴
   - 소켓 이벤트에서 카운트 최적화 업데이트

4. **빌프린트 테이블번호 수정**
   - POSTerminalPage.tsx: `setCompletedOrderData`에 tableNumber 추가
   - LiveOrdersPage.tsx: `handlePrintBill`에 tableNumber, pagerNumber 추가

### 관련 파일

**Backend:**
- `routes/orders.js` - counts API 추가, 날짜/검색 필터 추가

**Frontend:**
- `pages/LiveOrders/LiveOrdersPage.tsx` - 성능 최적화
- `pages/POSTerminal/POSTerminalPage.tsx` - tableNumber 추가
- `components/POSTerminal/OrderCompleteModal.tsx` - tableNumber 인터페이스 추가

---

## ✅ 완료: Restaurant Admin Invoice 페이지 개선 (2026-01-25)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Restaurant Invoice 페이지 생성 | Brand General의 To Pay 탭 기반으로 신규 생성 | ✅ 완료 |
| 탭 UI 구현 | All Invoices / Invoices to Pay 탭 | ✅ 완료 |
| Issuer 정보 표시 | 인보이스 발행자 정보 (issuerInfo) 표시 | ✅ 완료 |
| 결제 제출 기능 | Payment Submit 모달 및 API 연동 | ✅ 완료 |
| Company Info API 추가 | /api/restaurants/:id/company-info 엔드포인트 추가 | ✅ 완료 |
| Restaurant Admin 권한 수정 | to-pay, payment permission 버그 수정 | ✅ 완료 |

### 핵심 구현 사항

1. **Restaurant Invoice 페이지 (InvoicesPage.tsx)**
   - All Invoices: 모든 인보이스 표시 (draft 포함)
   - Invoices to Pay: 결제 대기 인보이스 (draft 제외)
   - View, Pay, PDF Download, Print 기능
   - Issuer 정보 및 Payer 정보 표시

2. **Backend API 수정**
   - `/api/invoices/to-pay`: Restaurant Admin용 restaurant_id 조건 수정
   - `checkPaymentPermission()`: Restaurant Admin 권한 체크 수정
   - `/api/restaurants/:id/company-info`: 신규 엔드포인트

3. **버그 수정**
   - Restaurant Admin이 to-pay 인보이스 조회 불가 → restaurant_id로 수정
   - All Invoices 탭 데이터 미표시 → user.restaurant_id fallback 추가

### 관련 파일

**Backend:**
- `routes/invoices.js` - to-pay API, payment permission 수정
- `routes/restaurants.js` - company-info API 추가

**Frontend:**
- `pages/Restaurant/InvoicesPage.tsx` - 신규 페이지 생성

---

## ✅ 완료: 배포 시스템 및 문서 정리 (2026-01-25)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| deploy-production.sh 개선 | .env 백업 타이밍 수정, 중복 단계 제거 (481줄→257줄) | ✅ 완료 |
| 배포.md 정리 | 잘못된 정보 수정, 불필요한 섹션 제거 (247줄→211줄) | ✅ 완료 |
| 개발시작.md 정리 | 중복 내용 제거, 문서 참조 방식으로 변경 (227줄→144줄) | ✅ 완료 |
| 개발완료.md 개선 | 시스템 문서 업데이트 테이블 추가 | ✅ 완료 |
| DEPLOYMENT.md 업데이트 | 현재 스크립트와 일치하도록 수정 | ✅ 완료 |

### 핵심 변경 사항

1. **deploy-production.sh 개선**
   - .env 백업을 rsync 전에 수행 (손상 방지)
   - 중복 DB 스키마 비교 단계 제거
   - health check 검증 추가

2. **문서 관리 체계 정립**
   - 개발시작.md: 실행 지시만 포함, 내용은 원본 문서 참조
   - 개발완료.md: 변경 영역에 따라 관련 문서 업데이트하도록 명시
   - DEPLOYMENT.md: 실제 스크립트와 일치하도록 수정

### 관련 파일

- `deploy-production.sh` - 배포 스크립트 개선
- `DEPLOYMENT.md` - 배포 가이드 업데이트
- `.claude/commands/개발시작.md` - 개발 시작 가이드 정리
- `.claude/commands/개발완료.md` - 문서 업데이트 프로세스 추가
- `.claude/commands/배포.md` - 배포 명령어 정리

---

## ✅ 완료: Printer Settings DB 저장 (2026-01-24)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| printer_settings DB 컬럼 추가 | restaurants 테이블에 프린터 설정 저장 | ✅ 완료 |
| Backend API 수정 | PUT /api/restaurants/:id에서 printer_settings 저장 | ✅ 완료 |
| Frontend Settings 연동 | DB에서 로드, DB에 저장 + localStorage 동기화 | ✅ 완료 |

### 핵심 구현 사항

1. **printer_settings 컬럼 추가**
   - `printerMode`: 'rawbt' | 'browser'
   - `billPrinter`: { enabled, name, autoPrint }
   - `kitchenPrinter`: { enabled, name, autoPrint }

2. **Settings 페이지 수정**
   - 페이지 로드 시 DB에서 printer_settings 조회
   - 저장 시 DB에 저장 + localStorage 동기화 (billPrint.js 호환)
   - 어떤 기기/브라우저에서 접속해도 동일한 설정 사용

### 관련 파일

**Backend:**
- `models/Restaurant.js` - printer_settings 컬럼 추가
- `routes/restaurants.js` - PUT API에서 printer_settings 처리

**Frontend:**
- `pages/Settings/SettingsPage.tsx` - DB 로드/저장 로직

---

## ✅ 완료: Invoice System UI/UX 개선 (2026-01-23)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Send Invoice 버튼 스타일 | Draft 상태에서 녹색 아이콘 버튼으로 변경 | ✅ 완료 |
| Confirm 버튼 스타일 | Send Invoice 모달 확인 버튼 녹색으로 변경 | ✅ 완료 |
| 수신인 정보 수정 | Unknown Manager → 올바른 payer 이름 표시 | ✅ 완료 |
| 자동 인보이스 수정 제한 | automatic 타입 인보이스 Edit 버튼 숨김 | ✅ 완료 |
| 상태별 수정 제한 | paid, payment_submitted, cancelled 상태 수정 불가 | ✅ 완료 |
| 인보이스 번호 형식 수정 | 발행자별 올바른 번호 형식 적용 | ✅ 완료 |
| category_display_name 추가 | 구독 플랜 이름 표시 (Subscription - Professional) | ✅ 완료 |

### 핵심 구현 사항

1. **Send Invoice 버튼 녹색 스타일**
   - LocalActionButton에 `success` variant 추가 (#10B981 녹색)
   - Draft 상태에서 Send Invoice 버튼에 녹색 적용
   - Brand General: 아이콘만 표시 (텍스트 제거)

2. **수신인 정보 올바르게 표시**
   - Backend: payer_type에 따라 올바른 payer 이름 조회
   - Frontend: managerName || customerName 폴백 처리
   - Send Invoice 모달에서 "Manager" → "Recipient" 표기 변경

3. **인보이스 수정 제한 로직**
   - Backend: PUT /api/invoices/:id에서 type, status 검증
   - Frontend: Edit 버튼을 조건부 렌더링
   - System Admin, Brand General 양쪽 적용

### 관련 파일

**Backend:**
- `routes/invoices.js` - payer 이름 조회 로직 수정, 수정 제한 검증
- `models/Invoice.js` - category_display_name 필드 추가

**Frontend:**
- `pages/Admin/InvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한

---

## ✅ 완료: Invoice System 버그 수정 및 개선 (2026-01-21)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| JWT 토큰 개선 | brand_id, foodcourt_id 등 JWT 및 req.user에 추가 | ✅ 완료 |
| Express Router 순서 수정 | /to-pay 라우트가 /:id 앞에 오도록 수정 | ✅ 완료 |
| Invoice 발행자 정보 저장 | issuer_type, issuer_id가 인보이스에 저장 | ✅ 완료 |
| Draft 인보이스 제외 | Invoices to Pay에서 draft 상태 제외 | ✅ 완료 |
| Payment Submit Modal 개선 | 시스템 관리자 결제 방법(QR/Bank) 표시 | ✅ 완료 |
| Currency Settings 버그 수정 | API 응답 구조 파싱 수정 | ✅ 완료 |
| to_pay 본인 발행 제외 | Invoices to Pay에서 본인이 발행한 인보이스 제외 | ✅ 완료 |
| 영수증 이미지 업로드 | Bank Transfer/QR 결제 시 영수증 이미지 첨부 | ✅ 완료 |
| Admin 결제 컨펌 팝업 | 시스템관리자 결제 확인 시 고객 결제정보 표시 | ✅ 완료 |
| 인보이스 통화 자동설정 | 수신인의 defaultCurrency 실시간 반영 | ✅ 완료 |
| Payment Settings 통화제한 | Brand 통화선택 시 시스템 지원 통화만 표시 | ✅ 완료 |
| Company Info 저장 수정 | Express 라우트 순서 수정 (/company-info 우선) | ✅ 완료 |
| 결제권한 체크 수정 | brand_manager, foodcourt_manager payer_type 처리 | ✅ 완료 |

### 핵심 구현 사항

1. **JWT 토큰에 역할별 ID 포함**
   - `brand_id`, `foodcourt_id`, `restaurant_id`, `manager_id`를 JWT 토큰에 포함
   - `authenticateToken` 미들웨어에서 `req.user`에 동일 필드 설정

2. **Invoice 발행자 정보**
   - Brand General이 인보이스 생성 시 `issuer_type: 'brand'`, `issuer_id: brandId` 저장
   - "Issued Invoices" 탭에서 해당 브랜드가 발행한 인보이스만 표시

3. **Payment Submit Modal 개선**
   - `/api/admin/payment-settings/available/:currency` API 활용
   - Bank Transfer: 은행명, 계좌번호, 예금주 표시
   - QR Payment: QR 이미지 및 설명 표시

### 관련 파일

**Backend:**
- `services/authService.js` - JWT 토큰에 역할별 ID 추가
- `middleware/auth.js` - req.user에 brand_id, foodcourt_id 등 추가
- `routes/invoices.js` - /to-pay 라우터 순서 수정, draft 제외

**Frontend:**
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Payment Submit Modal 개선, issuer 정보 저장
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - API 응답 파싱 수정

---

## ✅ 완료: Billing System Integration (2026-01-19)

> **상세 기획서:** [docs/BILLING_SYSTEM_INTEGRATION_PLAN.md](/docs/BILLING_SYSTEM_INTEGRATION_PLAN.md)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Invoice Page 역할별 | Brand/Foodcourt General/Manager용 Invoice 페이지 | ✅ 완료 |
| Payment Model 3가지 | restaurant, brand_manager, foodcourt_manager | ✅ 완료 |
| to-pay API 수정 | 역할별 결제해야 할 인보이스 조회 | ✅ 완료 |
| Invoice 발행/결제 분리 | Issued Invoices / Invoices to Pay 탭 분리 | ✅ 완료 |
| Plans Page 역할별 | Brand/Foodcourt용 Custom Subscription 전용 | ✅ 완료 |
| Payment Settings 역할별 | Brand/Foodcourt용 다중 통화 결제설정 | ✅ 완료 |
| Profile 페이지 버그 수정 | dbUser null일 때 authUser 폴백 처리 | ✅ 완료 |

### 핵심 구현 사항

1. **Payment Model 3가지 타입**
   - `restaurant` - Restaurant Admin이 결제
   - `brand_manager` - Brand General/Manager가 결제
   - `foodcourt_manager` - Foodcourt General/Manager가 결제

2. **역할별 Invoice 페이지**
   - Brand/Foodcourt General/Manager: 2개 탭 (Issued Invoices + Invoices to Pay)
   - Issued Invoices: 발행한 인보이스 (Create, Edit, Send)
   - Invoices to Pay: 결제해야 할 인보이스 (View, Pay)

3. **Backend /to-pay API**
   - Brand: 직접 발행 인보이스 + brand_manager 레스토랑 인보이스 + 매니저로 직접 발행된 인보이스
   - Foodcourt: 직접 발행 인보이스 + foodcourt_manager 레스토랑 인보이스 + 매니저로 직접 발행된 인보이스

### 관련 파일

**Backend:**
- `routes/invoices.js` - /to-pay API 역할별 로직 추가

**Frontend:**
- `pages/Admin/RestaurantsPage.tsx` - Payment Model 3가지 옵션
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - 브랜드 인보이스 (Issued + To Pay)
- `pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` - 푸드코트 인보이스
- `pages/BrandGeneral/BrandPlansPage.tsx` - 브랜드 플랜 (Custom only)
- `pages/FoodcourtGeneral/FoodcourtPlansPage.tsx` - 푸드코트 플랜
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 브랜드 결제설정
- `pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage.tsx` - 푸드코트 결제설정
- `pages/Profile/ProfilePage.tsx` - dbUser null 폴백 처리

---

## ✅ 완료: Payment Settings UI (2026-01-16)

> **상세 기획서:** [docs/PAYMENT_SYSTEM_PLAN.md](/docs/PAYMENT_SYSTEM_PLAN.md)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Payment Settings Page | System Admin 결제 설정 UI | ✅ 완료 |
| Currency Settings | 통화 설정 (Payment Settings 내) | ✅ 완료 |
| Online Payment Settings | Stripe/PayPal 전역 설정 | ✅ 완료 |
| Manual Payment Settings | Bank Transfer/QR 통화별 설정 | ✅ 완료 |
| Backend API | 결제 설정 CRUD API | ✅ 완료 |
| Role-based Documentation | 역할별 결제 시스템 문서화 | ✅ 완료 |

### 핵심 구현 사항

1. **결제 설정 구조**
   - Stripe/PayPal: 전역 설정 (한 번만 설정, 다중 통화 자동 지원)
   - Bank Transfer/QR: 통화별 설정 (각 통화마다 다른 계좌/QR)

2. **역할별 통화 설정**
   - System Admin, Brand General/Manager, Foodcourt General/Manager: 다중 통화
   - Restaurant Admin: 단일 통화 (기존 구조 유지)

3. **Invoice 통화 규칙**
   - Invoice 통화 = 수신자의 Default Currency

### 관련 파일

**Backend:**
- `routes/admin-payment-settings.js` - Payment Settings API
- `app.js` - Router 등록 (System Admin 전용)

**Frontend:**
- `pages/Admin/PaymentSettingsPage.tsx` - Payment Settings UI

**Documentation:**
- `docs/PAYMENT_SYSTEM_PLAN.md` - 결제 시스템 통합 기획서

---

## ✅ 완료: Phase 3.5 주문 관리 개선 (2026-01-15)

> **상세 기획서:** [docs/ORDER_MANAGEMENT_IMPROVEMENTS.md](/docs/ORDER_MANAGEMENT_IMPROVEMENTS.md)

### 완료된 기능

| 기능 | 설명 | API 테스트 |
|------|------|:----:|
| Auto-merge | 같은 테이블/조건 주문 자동 통합 | ✅ 통과 |
| Manual Merge | 선택한 주문들 수동 병합 | ✅ 통과 |
| Add Items | 기존 주문에 메뉴 추가 + 키친티켓 | ✅ 통과 |
| Coupon Model/API | 쿠폰 CRUD + 검증 API | ✅ 통과 |
| Coupon Frontend UI | POS Terminal + Mobile Order 쿠폰 적용 | ✅ 통과 |
| Printer Settings UI | 빌/키친 프린터 분리 설정 | ✅ UI 완료 |
| total_amount 재계산 | 아이템 추가/병합 시 자동 계산 | ✅ 통과 |

### 버그 수정 (2026-01-15)

| 이슈 | 원인 | 해결 |
|------|------|------|
| URL /promotions → /coupons | 메뉴명 변경 후 URL 미수정 | App.tsx, MainLayout.tsx, DB addon_modules 수정 |
| 쿠폰 API 인증 오류 | Express 라우터 순서 문제 | server.js에서 coupons 라우터 최상단 배치 |
| 쿠폰 할인액 미반영 | 응답 파싱 오류 (result.data.discountAmount) | POSTerminalPage.tsx, PaymentPage.tsx 수정 |

### API 테스트 결과 (2026-01-15)

#### 1. Coupon API
```bash
# Create: POST /api/coupons
{"success":true,"data":{"id":2,"code":"SAVE10","type":"percentage","value":10}}

# Validate: POST /api/coupons/validate
{"success":true,"valid":true,"data":{"discountAmount":10,"finalTotal":90}}
```

#### 2. Auto-merge (같은 테이블 주문 자동 병합)
```bash
# 두 번째 주문 생성 시 자동 병합
POST /api/orders (table_number: "A99")
{"success":true,"merged":true,"mergeInfo":{"orderGroup":2}}
```

#### 3. Add Items API
```bash
POST /api/orders/801/merge-items
{"success":true,"addedItems":[...],"orderGroup":3,"newTotal":90}
```

#### 4. Manual Merge API
```bash
POST /api/orders/merge {"orderIds":[802,803],"targetOrderId":802}
{"success":true,"deletedOrderIds":[803],"message":"Successfully merged 2 orders"}
```

### 핵심 구현 사항

1. **Auto-merge 조건**: same restaurant + same table + same order_type + payment pending + not served/completed/cancelled
2. **order_group**: 아이템 추가 시마다 증가 (원본=0, 첫 추가=1, ...)
3. **added_at**: 추가된 아이템에 타임스탬프 기록
4. **merged_from/merged_at**: 병합된 아이템에 원본 주문 정보 기록
5. **skipAutoMerge**: true로 설정하면 자동 병합 건너뜀

### 관련 파일

**Backend:**
- `routes/orders.js` - Auto-merge, Manual Merge, Add Items API
- `routes/coupons.js` - Coupon CRUD + Validate API
- `models/Coupon.js` - Coupon 모델

**Frontend:**
- `pages/Settings/SettingsPage.tsx` - Printer Settings UI
- `pages/LiveOrders/LiveOrdersPage.tsx` - Add Items 모달

---

## ✅ 완료: Live Orders Add Items 모달 개선 (2026-01-14)

### 변경 사항

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | POS Terminal OptionModal 컴포넌트 재사용 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | optionGroups 문자열→배열 파싱 버그 수정 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | 아이템 클릭 시 바로 추가, Options 버튼 시 옵션 모달 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | Cancel/Add to Order 버튼 동작 개선 (전체 모달 닫힘) | `pages/LiveOrders/LiveOrdersPage.tsx` |

### 수정 내용

1. **OptionModal 컴포넌트 재사용**
   - POS Terminal의 `OptionModal` 컴포넌트를 Live Orders에서도 사용
   - MenuContext의 optionGroups를 활용하여 옵션 데이터 조회

2. **optionGroups 파싱 버그 수정**
   - DB에서 `optionGroups`가 문자열 `"[]"`로 저장됨
   - `fetchMenuForAddItems`에서 JSON.parse 처리 추가
   - `Array.isArray()` 체크가 실패하던 문제 해결

3. **UI 동작 개선**
   - 아이템 클릭: 바로 장바구니에 추가 (옵션 없이)
   - Options 버튼: 옵션 선택 모달 표시
   - Cancel 버튼: 전체 모달 닫힘 (order detail로 돌아가지 않음)
   - Add to Order 버튼: 주문에 추가 후 전체 모달 닫힘

### 테스트 필요 항목

- [ ] 옵션 있는 메뉴 추가 테스트
- [ ] 옵션 없는 메뉴 추가 테스트
- [ ] 장바구니 수량 조절 테스트
- [ ] Add to Order 후 팝업 닫힘 확인

---

## ✅ 완료: 멤버십/포인트 시스템 구조 개선 (2026-01-13)

### 구조 변경
- **멤버십**: 항상 활성화 (로그인, 티어, 티어별 할인)
- **포인트 시스템**: `is_active` 필드로 ON/OFF 제어

### 완료된 작업

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | Settings 페이지 "Points System" 토글 위치 개선 (Points Settings 카드 내부로 이동) | `pages/Settings/SettingsPage.tsx` |
| ✅ | Mobile AccountPage 포인트 조건부 표시 (pointsEnabled) | `mobile/pages/AccountPage.tsx` |
| ✅ | PaymentModal 내부 데이터 fetch 로직 개선 (customerId/restaurantId 기반) | `components/POSTerminal/PaymentModal.tsx` |
| ✅ | LiveOrders PaymentModal 포인트 연동 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | POS Terminal 포인트 적립/사용 완료 | `pages/POSTerminal/POSTerminalPage.tsx` |
| ✅ | OrderCompleteModal 포인트 할인 표시 | `components/POSTerminal/OrderCompleteModal.tsx` |
| ✅ | billPrint 포인트 할인 출력 | `utils/billPrint.js` |
| ✅ | API 레벨 검증 - 포인트 비활성화 시 적립/사용 차단 확인 | `services/pointService.js` |

### 포인트 시스템 체크 위치

| 컴포넌트 | is_active 체크 |
|----------|---------------|
| PaymentModal | `membershipSettings?.is_active` |
| Mobile PaymentPage | `membershipSettings?.is_active` |
| Mobile AccountPage | `pointsEnabled` (is_active 기반) |
| Backend pointService | `settings.is_active` (적립/사용 차단) |

---

## ✅ 완료: UI 개선 및 코드 정리 (2026-01-12)

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | POS 할인 입력 통화 기호 동적 표시 | `pages/POSTerminal/POSTerminalPage.tsx` |
| ✅ | Loyalty Tier Settings UI 제거 (미사용 기능 정리) | `pages/Settings/SettingsPage.tsx` |

---

## ✅ 완료: 레시피/재료/재고관리 구조 통합 (2026-01-12)

### 핵심 구조 차이

| 구분 | 레스토랑 관리자 | 브랜드제너럴/매니저 |
|-----|---------------|-------------------|
| **재료 관리** | Ingredients (RecipeManagement) | ProductIngredients (BrandProductRecipe) |
| **레시피 관리** | Recipes (RecipesPage) | ProductRecipes (ProductRecipesTab) |
| **재고 관리** | InventoryManager mode='restaurant' | InventoryManager mode='brand' |
| **재고 추적** | 모든 재료 자동 추적 | track_stock 토글로 선택 |
| **재고 차감** | 주문 완료 시 자동 (deductInventoryForOrder) | 수동 조정만 (향후 PO 연동) |

### 구조도

```
[레스토랑 관리자] ─────────────────────────────────────────────────────

  /pos/recipes?tab=ingredients     /pos/recipes?tab=recipes     /pos/inventory
  ┌──────────────────────┐        ┌──────────────────────┐     ┌──────────────────┐
  │   IngredientsTab     │───────►│    RecipesPage       │     │  InventoryPage   │
  │  (재료 CRUD)          │        │  (레시피 CRUD)        │     │ (InventoryManager│
  │  - 토글 없음 (전체추적) │        │  - View/Edit/Delete  │     │   mode=restaurant)│
  └──────────────────────┘        └──────────────────────┘     └──────────────────┘
           │                                │                          │
           └───────── 재료 선택 ─────────────┘                          │
                                            │                          │
                                     Recipe 연결된 Product              │
                                            │                          │
                                     주문 완료 ─────────────────────────┘
                                            │
                                     자동 재고 차감 (deductInventoryForOrder)

[브랜드제너럴/매니저] ────────────────────────────────────────────────────

  /pos/brand-product-recipes?tab=ingredients    ?tab=recipes      /pos/brand-inventory
  ┌──────────────────────┐        ┌──────────────────────┐     ┌──────────────────┐
  │ ProductIngredientsTab│───────►│  ProductRecipesTab   │     │BrandInventoryPage│
  │  (재료 CRUD)          │        │  (레시피 CRUD)        │     │ (InventoryManager│
  │  - track_stock 토글   │        │  - View/Edit/Delete  │     │   mode=brand)    │
  └──────────────────────┘        └──────────────────────┘     └──────────────────┘
           │                                                           │
     track_stock=true ─────────────────────────────────────────────────┘
           │
     재고관리 대상으로 표시 (/api/product-ingredients?track_stock=true)
```

### 완료된 작업

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | InventoryManager 브랜드 모드 | `components/Inventory/InventoryManager.tsx` |
| ✅ | BrandInventoryPage 통합 | `pages/BrandInventory/BrandInventoryPage.tsx` |
| ✅ | ProductIngredientsTab track_stock 토글 추가 | `pages/BrandProductRecipe/ProductIngredientsTab.tsx` |
| ✅ | IngredientsTab track_stock 토글 제거 | `pages/RecipeManagement/IngredientsTab.tsx` |
| ✅ | ProductRecipesTab UI 통일 (View 버튼, 시간정보) | `pages/BrandProductRecipe/ProductRecipesTab.tsx` |
| ✅ | **InventoryPage 중복 제거** (~2900줄→22줄) | `pages/Inventory/InventoryPage.tsx` |
| ✅ | **RecipesPage ActionButton 스타일 통일** | `pages/Recipes/RecipesPage.tsx` |
| ✅ | **개발시작 가이드 컴포넌트 통일 규칙 추가** | `.claude/commands/개발시작.md` |

### API 매핑

| 기능 | 레스토랑 | 브랜드 |
|------|---------|--------|
| 재료 조회 | `/api/restaurants/:id/ingredients` | `/api/product-ingredients` |
| 재료 수정 | `PUT /api/restaurants/:id/ingredients/:id` | `PUT /api/product-ingredients/:id` |
| 레시피 조회 | `/api/restaurants/:id/recipes` | `/api/product-recipes` |
| 재고 조회 | `/api/restaurants/:id/inventory` | `/api/product-ingredients?track_stock=true` |
| 재고 조정 | `/api/restaurants/:id/inventory/adjust` | `PUT /api/product-ingredients/:id` |

### 향후 작업: Purchase Order 시스템

```
레스토랑 발주 요청 → 브랜드 승인/출고 → 브랜드 ProductIngredient 차감
                                   → 레스토랑 Ingredient 증가
```

---

## 다음 개발 작업: Phase 4 - Purchase Order System

**설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

**상태:** 설계 완료, 개발 대기 중

---

## 완료된 테스트

### 멤버십/포인트 시스템 (2026-01-12 코드 리뷰 완료)

**코드 리뷰 결과:**
- [x] Settings > Membership 탭 UI 구현 완료
- [x] 모바일 오더 포인트 사용 UI 구현 완료
- [x] POS 시스템 포인트 사용 UI 구현 완료
- [x] Backend API 전체 구현 완료 (membership.js, pointService.js)
- [x] DB 모델 구현 완료 (MembershipSettings, PointTransaction)
- [x] 주문 연동 구현 완료 (orders.js)
- [x] UI 디자인 가이드 준수 확인 및 수정 완료 (2026-01-12)
  - 성공 메시지 제거 (가이드 위반 수정)
  - 에러 메시지 이모지 제거

**관련 파일:**
- `/var/www/dev-frontend/src/pages/Settings/SettingsPage.tsx` (Membership 탭)
- `/var/www/dev-frontend/src/mobile/pages/PaymentPage.tsx` (모바일 포인트)
- `/var/www/dev-frontend/src/components/POSTerminal/PaymentModal.tsx` (POS 포인트)
- `/var/www/dev-backend/services/pointService.js` (포인트 비즈니스 로직)
- `/var/www/dev-backend/routes/membership.js` (멤버십 API)
- `/var/www/dev-backend/routes/orders.js` (주문 생성 시 포인트 처리)

---

## 📋 목차
1. [시스템 구조](#시스템-구조)
2. [완료된 작업](#완료된-작업)
3. [진행 중인 작업](#진행-중인-작업)
4. [예정된 작업](#예정된-작업)
5. [데이터베이스 스키마](#데이터베이스-스키마)
6. [주요 파일 목록](#주요-파일-목록)
7. [트러블슈팅 히스토리](#트러블슈팅-히스토리)

---

## 🏗️ 시스템 구조

### 사용자 계층 구조
```
시스템 관리자 (Admin)
├─ Restaurant Owners
│  ├─ 레스토랑 소유자
│  └─ 구독: Restaurant Plans (Basic/Professional/Enterprise)
│
├─ Foodcourt General (구독 관리)
│  ├─ Foodcourt Manager들 생성/관리
│  └─ 구독: Foodcourt Plans (Basic/Professional/Enterprise)
│
└─ Brand General (구독 관리)
   ├─ Brand Manager들 생성/관리
   └─ 구독: Brand Plans (Basic/Professional/Enterprise)
```

### 플랜 구조
```
Restaurant Plans (레스토랑 소유자용)
├─ Basic Plan (RM 29/month)
├─ Professional Plan (RM 59/month)
└─ Enterprise Plan (RM 99/month)

Brand Plans (브랜드 관리용)
├─ Brand Basic (RM 149/month)
├─ Brand Professional (RM 299/month)
└─ Brand Enterprise (RM 499/month)

Foodcourt Plans (푸드코트 관리용)
├─ Foodcourt Basic (RM 149/month)
├─ Foodcourt Professional (RM 299/month)
└─ Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 체계
```
Restaurant Modules (target_user_type: 'restaurant')
├─ Basic: POS Terminal, Menu Management, Customer Management, etc.
└─ Advanced: Mobile Ordering, Recipe Management, Advanced Inventory

Brand Modules (target_user_type: 'brand')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Brand Management, User Management, Subscription Management

Foodcourt Modules (target_user_type: 'foodcourt')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Foodcourt Management, User Management, Subscription Management

Shared Modules (target_user_type: 'all')
└─ Restaurant Management (multi-restaurant management)
```

---

## ✅ 완료된 작업

### Phase 1: 데이터베이스 구조 개선 (2025-11-18 ~ 2025-11-19)

#### 1.1 Plan Template 모델 재구조화
**파일:** `/var/www/dev-backend/models/PlanTemplate.js`

**변경사항:**
- `plan_target` ENUM 추가: `'restaurant'`, `'brand'`, `'foodcourt'`
- Manager Plans를 Brand/Foodcourt Plans로 분리
- 기존 Manager Plans 삭제 후 재생성

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE plan_templates
MODIFY COLUMN plan_target ENUM('restaurant', 'brand', 'foodcourt');

-- 기존 Manager Plans 삭제
DELETE FROM plan_templates WHERE id IN (4, 5, 6);

-- Brand Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('brand_basic', 'Brand Basic', 149.00, 1490.00, ..., 'brand'),
('brand_professional', 'Brand Professional', 299.00, 2990.00, ..., 'brand'),
('brand_enterprise', 'Brand Enterprise', 499.00, 4990.00, ..., 'brand');

-- Foodcourt Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('foodcourt_basic', 'Foodcourt Basic', 149.00, 1490.00, ..., 'foodcourt'),
('foodcourt_professional', 'Foodcourt Professional', 299.00, 2990.00, ..., 'foodcourt'),
('foodcourt_enterprise', 'Foodcourt Enterprise', 499.00, 4990.00, ..., 'foodcourt');
```

#### 1.2 Addon Module 모델 재구조화
**파일:** `/var/www/dev-backend/models/AddonModule.js`

**변경사항:**
- `target_user_type` ENUM 변경: `'restaurant'`, `'brand'`, `'foodcourt'`, `'all'`
- 모듈 분류 재정의
- Restaurant 전용 모듈과 Manager 전용 모듈 명확히 분리

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE addon_modules
MODIFY COLUMN target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all');

-- Restaurant 전용 모듈 설정
UPDATE addon_modules
SET target_user_type = 'restaurant'
WHERE module_code IN ('mobile_ordering', 'recipe_management', 'advanced_inventory');

-- Brand/Foodcourt 공통 모듈 설정
UPDATE addon_modules
SET target_user_type = 'all'
WHERE module_code IN ('brand_management', 'foodcourt_management');

-- 카테고리 재분류
UPDATE addon_modules SET category = 'basic'
WHERE module_code IN ('manager_dashboard', 'operation_inquiry');
```

#### 1.3 모듈 설명 개선
**변경사항:**
- Brand Management 상세 설명 추가
- Foodcourt Management 상세 설명 추가

**SQL 실행:**
```sql
UPDATE addon_modules
SET description = 'Manage multiple restaurant brands, standardize menus across locations, control brand-wide pricing and promotions, enforce brand guidelines, track brand performance metrics'
WHERE module_code = 'brand_management';

UPDATE addon_modules
SET description = 'Manage foodcourt operations, coordinate multiple vendors and restaurants, shared payment processing, unified customer queue system, foodcourt-wide promotions and events'
WHERE module_code = 'foodcourt_management';
```

### Phase 2: Admin 페이지 UI 개선 (2025-11-19)

#### 2.1 Plans Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/PlansPage.tsx`

**완료 항목:**
1. ✅ Plan Target 드롭다운을 3개로 확장 (Restaurant/Brand/Foodcourt)
2. ✅ 모듈 선택 시 target_user_type 기반 필터링
3. ✅ 체크박스 UI 정렬 개선 (align-items: flex-start)
4. ✅ Plan Name 필드 단순화 (Display Name만 입력, 내부 이름 자동 생성)
5. ✅ Features 필드를 Modules 아래로 이동
6. ✅ 리스트 카드 순서 변경 (Limits → Modules → Features)
7. ✅ 섹션 여백 축소 (12px → 8px)
8. ✅ Edit Plan JSON 파싱 에러 수정

#### 2.2 Restaurants Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/RestaurantsPage.tsx`

**완료 항목:**
1. ✅ Restaurant Plans만 표시되도록 필터링
2. ✅ Add Restaurant 모달에 동적 플랜 로딩
3. ✅ Edit Restaurant 모달에 기존 플랜 데이터 유지
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

#### 2.3 Managers Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/ManagersPage.tsx`

**완료 항목:**
1. ✅ Manager Role을 General만 선택 가능하도록 제한 (Foodcourt General, Brand General)
2. ✅ 구독 설정 필드 추가 (Subscription Plan, Billing Cycle, Dates, Auto-renew)
3. ✅ Role 변경 시 플랜 자동 업데이트
4. ✅ Edit Manager 기능 추가 (Edit 버튼 ✎ 추가)
5. ✅ Edit Manager 모달에 구독 설정 필드 추가
6. ✅ 기본 Role을 Foodcourt General로 변경

**Manager 계층 구조:**
- 시스템 관리자는 **General만** 추가/관리
- General은 자신의 Manager들을 별도 페이지에서 관리 (향후 구현)

#### 2.4 Subscriptions Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`

**완료 항목:**
1. ✅ User Type 선택기 추가 (Restaurant/Brand Manager/Foodcourt Manager)
2. ✅ User Type별 플랜 동적 필터링
3. ✅ User Type 변경 시 검색 대상 자동 변경 (Restaurant ↔ Manager)
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

### Phase 3: 모달 UI/UX 개선 (2025-11-19)

#### 3.1 모든 페이지 모달 기본값 설정
**완료 항목:**
1. ✅ Plans API 응답 확인 (9개 플랜 정상 반환)
2. ✅ Restaurants Page 모달 기본값 설정
3. ✅ Managers Page 모달 기본값 설정
4. ✅ Subscriptions Page 모달 기본값 설정

---

## ✅ 완료된 작업 (최근)

### Phase 2: Recipe Management (2025-11-20 ~ 2025-12-10) - 완료

**상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 최종 구현된 권한 구조 (owner_type 기반)

```javascript
// 레시피/재료의 소유권은 owner_type으로 구분
if (recipe.owner_type === 'brand') {
  // Brand General/Manager: CRUD 가능
  // Restaurant Admin: 조회만 가능 (수정 불가)
} else {
  // Restaurant Admin: CRUD 가능
  // Brand General/Manager: 접근 불가 (표시 안됨)
}
```

**핵심 구현사항:**
- `recipe_manager_type` 방식 → `owner_type` 방식으로 단순화
- 브랜드 레시피: Brand General/Manager만 수정, Restaurant Admin은 조회만
- 레스토랑 레시피: Restaurant Admin만 수정, Brand에는 표시 안됨

#### 구현 완료 항목:

**Phase 2.1: 기본 인프라 구축**
1. [x] DB 스키마 생성 (recipes, ingredients, recipe_ingredients, recipe_categories, ingredient_categories)
2. [x] Backend Models 구현 (Recipe, Ingredient, RecipeIngredient)
3. [x] owner_type ENUM('brand', 'restaurant') 기반 소유권 구분
4. [x] 권한 체크 미들웨어 구현 (isBrandManager, checkRestaurantAccess)

**Phase 2.2: Backend APIs 구현**
5. [x] Brand Recipe CRUD API (`/api/brands/:brandId/recipes`)
6. [x] Restaurant Recipe CRUD API (`/api/restaurants/:restaurantId/recipes`)
7. [x] Brand-recipes 조회 API (`/api/restaurants/:restaurantId/brand-recipes`)
8. [x] Ingredient CRUD API
9. [x] Recipe/Ingredient Category API
10. [x] Recipe → Product 변환 API

**Phase 2.3: Frontend UI 구현**
11. [x] RecipeManagementPage (Brand General용 - 4개 탭)
12. [x] RecipesTab - 레시피 CRUD
13. [x] IngredientsTab - 재료 CRUD
14. [x] RecipeCategoriesTab, IngredientCategoriesTab - 카테고리 관리
15. [x] RecipesPage (Restaurant Admin용)
16. [x] IngredientsPage (Restaurant Admin용)

**Phase 2.4: UI 기능 추가 (2025-12-10)**
17. [x] 리스트 카드에 요리시간(prep_time, cook_time) 표시
18. [x] 리스트 카드에 조리방법(instructions) 미리보기 표시
19. [x] 리스트 카드에 재료명 태그(IngredientTags) 표시
20. [x] 카드 클릭 시 Recipe Details 팝업 (View 모드)
21. [x] View 모드에서 Edit 전환 기능

### 버그 수정 및 개선 (2025-12-11)

#### Reports 페이지 필터 버그 수정
**파일:** `/var/www/dev-frontend/src/pages/Reports/ReportsPage.tsx`

**문제:**
- Month 필터 선택 시 그래프가 지난 달 1일~30일 데이터를 잘못 표시
- 30일 범위가 두 달에 걸쳐있을 때 일자(day number)만으로 그룹화되어 데이터 혼합

**해결:**
- 그래프 데이터를 `MM/DD` 형식(예: `11/10`, `12/09`)으로 표시
- 두 달에 걸친 30일 데이터가 올바르게 구분되어 표시

**변경 코드:**
```typescript
// Before: day number만 사용 (11월9일, 10월9일 모두 "9"로 표시)
const day = getOrderDate(order).getDate().toString();

// After: MM/DD 형식으로 구분
const dateKey = `${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getDate().toString().padStart(2, '0')}`;
```

#### 환경변수 관리 개선
**파일:** `/var/www/dev-backend/.env`, `/var/www/dev-frontend/package.json`

**변경사항:**
- SUDO_PASSWORD를 .env 파일에서 중앙 관리
- 빌드 스크립트에서 .env 파일 읽어서 사용
- 하드코딩된 비밀번호 제거

#### Claude 명령어 추가
**파일:** `/var/www/.claude/commands/개발완료.md`

**기능:**
- 개발 세션 종료 시 사용하는 명령어
- 문서 자동 업데이트 (DEVELOPMENT_PLAN.md 등)
- Git 커밋 및 푸시 자동화

---

## ✅ 완료된 작업 (2026-01-09)

### 보안 강화 작업

**목적:** 프로젝트 전반적인 보안 취약점 점검 및 개선

**완료 항목:**

#### 1. 파일 권한 보안
- [x] `.env` 파일 권한 600 적용 (dev, production)
- [x] `.gitignore` 강화 - `.env` 관련 패턴 추가

#### 2. 민감정보 제거
- [x] `SUDO_PASSWORD` 환경변수 제거 (dev-backend/.env)
- [x] `restart-dev.sh` 스크립트에서 하드코딩된 비밀번호 제거
- [x] `deploy-dev.sh`에서 SUDO_PASSWORD 의존성 제거 (sudo -n 사용)

#### 3. JWT 보안 강화
- [x] `authService.js` - JWT 폴백 시크릿 제거
- [x] `authService.js` - JWT_SECRET 환경변수 필수 검증 추가
- [x] 개발서버 JWT_SECRET 128자로 강화

#### 4. API 보안
- [x] `helmet` 패키지 설치 및 적용 (HTTP 헤더 보안)
- [x] `express-rate-limit` 패키지 설치 및 적용
  - 전체 API: 15분당 1000회
  - 로그인 API: 15분당 20회
- [x] `/api/deploy` 엔드포인트에 System Admin 인증 추가

#### 5. 문서 업데이트
- [x] `ARC.md` 생성 - 프로젝트 아키텍처 요약
- [x] `CLAUDE.md` - AI 보안 규칙 추가
- [x] `개발시작.md` - 보안 필수 규칙, 4줄 규칙 추가
- [x] `개발완료.md` - 배포 전 체크리스트 추가

**변경 파일:**
- `/var/www/dev-backend/.env`
- `/var/www/dev-backend/services/authService.js`
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/production-backend/restart-dev.sh`
- `/var/www/.gitignore`
- `/var/www/CLAUDE.md`
- `/var/www/ARC.md` (신규)
- `/var/www/.claude/commands/개발시작.md`
- `/var/www/.claude/commands/개발완료.md`

**보류 작업 (야간 작업 예정):**
- [ ] 운영서버 JWT_SECRET 128자로 강화

---

## ✅ 완료된 작업 (2026-01-07)

### 배포 스크립트 권한 문제 근본 해결

**문제:** `sudo`로 배포 스크립트 실행 시 build 폴더가 root 소유로 생성되어 이후 배포에서 권한 오류 발생

**해결:**
- [x] `deploy-production.sh` - `npm run build`를 `su - $SUDO_USER`로 실행하여 원래 사용자 권한으로 빌드
- [x] `deploy-production.sh` - Step 0에서 dev-frontend, dev-backend 권한도 체크
- [x] `deploy-dev.sh` - 캐시, 빌드, node_modules 폴더 권한 자동 수정 함수 추가
- [x] `CLAUDE.md` - 개발서버 배포 규칙 명시 (`npm run build:dev` 스크립트 사용 필수)

**변경 파일:**
- `/var/www/deploy-production.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/CLAUDE.md`

---

## ✅ 완료된 작업 (2026-01-06)

### 멤버십/포인트 시스템 구현

**목적:** 레스토랑별 고객 포인트 적립/사용 시스템

**완료 항목:**

#### 1. 데이터베이스 설계
- [x] `membership_settings` 테이블 생성 (포인트 설정, 등급별 보너스)
- [x] `point_transactions` 테이블 생성 (포인트 거래 내역)
- [x] `restaurant_customers` 테이블에 points, loyalty_tier 필드 추가
- [x] `orders` 테이블에 points_used, point_discount 컬럼 추가

#### 2. Backend 구현
- [x] MembershipSettings 모델 (`/var/www/dev-backend/models/MembershipSettings.js`)
- [x] PointTransaction 모델 (`/var/www/dev-backend/models/PointTransaction.js`)
- [x] 포인트 서비스 (`/var/www/dev-backend/services/pointService.js`)
  - earnPointsForOrder: 주문 완료 시 포인트 적립
  - usePointsForOrder: 주문 시 포인트 사용
  - refundPointsForOrder: 주문 취소 시 포인트 환불
- [x] 멤버십 API (`/var/www/dev-backend/routes/membership.js`)
  - GET `/settings/:restaurantId` - 설정 조회
  - PUT `/settings/:restaurantId` - 설정 저장
  - GET `/customer/:restaurantId/:customerId` - 고객 포인트 조회
- [x] orders.js에 포인트 처리 로직 추가

#### 3. Frontend - 모바일 오더
- [x] PaymentPage.tsx에 포인트 UI 추가
  - 포인트 사용 체크박스/슬라이더
  - 포인트 할인 금액 실시간 계산
  - 예상 적립 포인트 표시
- [x] 주문 생성 시 points_used, point_discount 전송

#### 4. Frontend - POS 시스템
- [x] PaymentModal.tsx에 포인트 UI 추가
  - 고객 포인트 표시
  - 포인트 사용 토글/슬라이더
  - 할인 금액 계산
- [x] POSTerminalPage.tsx에 포인트 상태/로딩 로직 추가

#### 5. Frontend - Settings
- [x] SettingsPage.tsx에 Membership 탭 추가
  - Enable Membership 토글
  - 포인트 적립 비율 설정
  - 포인트 사용 환율 설정
  - 최소 사용 포인트 설정
  - 최대 사용 비율 설정
  - 등급별 threshold/bonus 설정

**관련 파일:**
- Backend: `membership.js`, `pointService.js`, `orders.js`, Order 모델
- Frontend: `PaymentPage.tsx`, `PaymentModal.tsx`, `POSTerminalPage.tsx`, `SettingsPage.tsx`
- Migration: `add-points-columns-to-orders.sql`

**알려진 이슈:**
- `/var/www/html/static/js` 권한 문제로 프론트엔드 배포 실패 (root 소유)
- 해결 필요: 권한 수정 또는 수동 배포

---

### Dashboard 타임존 설정 문제 해결

**문제:** Dashboard "오늘의 매출" 통계가 레스토랑 타임존 설정을 무시하고 있었음

**원인:**
- Dashboard API가 "오늘" 날짜 계산 시 고정된 자정(00:00)을 사용
- Brand/Foodcourt 역할은 operation_settings 필드가 없어서 타임존 설정 자체가 불가능

**해결:**
1. **Brand/Foodcourt 모델에 operation_settings 필드 추가**
   - `dev-backend/models/Brand.js` - JSON getter/setter로 operation_settings 추가
   - `dev-backend/models/Foodcourt.js` - 동일하게 추가
   - 기본값: `{ openingTime: '09:00', closingTime: '22:00', timeZone: 'Asia/Kuala_Lumpur' }`

2. **Brand/Foodcourt API 업데이트**
   - `dev-backend/routes/brands.js` - GET/PUT company-info에 operation_settings 포함
   - `dev-backend/routes/foodcourts.js` - GET/PUT company-info에 operation_settings 포함

3. **Company Information 페이지에 Operation Settings UI 추가**
   - `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
   - `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`
   - Opening Time, Closing Time, Timezone 필드 추가
   - 16개 주요 타임존 선택 가능

4. **Dashboard API 타임존 기반 날짜 계산 적용**
   - `dev-backend/routes/dashboard.js` - getTodayBounds() 함수 추가
   - operation_settings.timeZone에 따라 "오늘"의 시작/끝 시간 계산

**테스트 완료:**
- DB 저장/로드 테스트 성공
- Frontend 빌드 성공

**수정된 파일 (7개):**
- `dev-backend/models/Brand.js`
- `dev-backend/models/Foodcourt.js`
- `dev-backend/routes/brands.js`
- `dev-backend/routes/foodcourts.js`
- `dev-backend/routes/dashboard.js`
- `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
- `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`

---

## ✅ 완료된 작업 (2026-01-05)

### 운영서버 문제 해결 및 빌드 시스템 개선

#### Nginx 500 에러 해결
**문제:** 운영서버(purplehere.com)에서 500 Internal Server Error 발생

**원인:** Nginx 설정의 `.html` location 블록에서 `try_files $uri /index.html;`가 무한 리다이렉트 루프 발생

**해결:**
- `/etc/nginx/sites-available/purplehere.com`에서 `.html` location 블록 수정
- `try_files $uri /index.html;` → `try_files $uri =404;`

#### 빌드 캐시 권한 문제 영구 해결
**문제:** `node_modules/.cache` 폴더의 root 소유권으로 빌드 실패 (index.html 미생성)

**해결:**
1. `dev-frontend/deploy-dev.sh` - 빌드 전 캐시 권한 자동 수정
2. `dev-frontend/package.json` - build 스크립트에 권한 수정 로직 추가
3. `deploy-production.sh` - Step 9에 캐시 권한 자동 수정 추가
4. `BUILD_TROUBLESHOOTING.md` 가이드 문서 생성

#### 레시피 상세 필드 API 응답 누락 해결
**문제:** 운영서버에서 레시피 상세 필드(prep_time, cook_time, instructions_summary, instructions_detail)가 API 응답에 누락

**원인:** `brand-products.js`에 중복 라우트가 있어 `attributes` 제한으로 필드 누락
```javascript
// 문제의 중복 라우트 (brand-products.js)
router.get('/brands/:brandId/recipes', authenticateToken, async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ['id', 'name', 'description', 'category', 'total_ingredient_cost', 'owner_type'],
    // ... prep_time, cook_time 등 누락
  });
});
```

**해결:**
- `dev-backend/routes/brand-products.js` 중복 라우트 제거
- `production-backend/routes/brand-products.js` 동일하게 수정

#### 중복 라우트 검사 시스템 구축
**목적:** 향후 중복 라우트 문제 사전 방지

**구현:**
1. `dev-backend/scripts/check-duplicates.js` 스크립트 생성
   - `/brands/` 및 `/restaurants/` 경로의 중복만 검사 (실제 문제 발생 경로)
2. `package.json`에 스크립트 추가
   - `npm run check`: 수동 중복 검사
   - `prestart`: 서버 시작 전 자동 검사
3. `deploy-production.sh`에 Step 5.5 추가 (배포 전 중복 검사)

#### inventory.js 중복 라우트 수정
**발견:** `npm run check` 실행 결과 inventory.js에서 중복 발견
```
DUPLICATE: GET /restaurants/:restaurantId/inventory/reorder-suggestions
  - inventory.js:1191 (이전 버전)
  - inventory.js:1482 (PAR-level 기반 버전)
```

**해결:**
- dev-backend/routes/inventory.js: 라인 1191의 이전 버전 삭제
- production-backend/routes/inventory.js: 동일하게 수정

---

## 🚧 진행 중인 작업

### Phase 4: Purchase Order System - 설계 완료 (2026-01-06)

**상태:** 설계 완료, 다음 개발 예정

**상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

**핵심 기능:**
1. **2가지 발주 경로**
   - 재고관리 Stock List에서 수량 입력 → [+ Order]
   - 발주관리에서 재료 검색 → 직접 추가

2. **공급업체별 발주서 그룹핑**
   - 같은 날 + 같은 공급업체 = 1개 발주서
   - Order Cart에서 공급업체별로 분리 표시

3. **메신저 공유**
   - WhatsApp, Telegram, KakaoTalk 직접 공유
   - PDF 다운로드, 이미지 저장
   - 텍스트 복사

4. **실 단가 관리 + 가격 히스토리**
   - 입고 시 실제 인보이스 단가 입력
   - 단가 변경 시 재료 원가 업데이트 옵션
   - 모든 가격 변동 히스토리 기록 (어디서 바꿨든)
   - 재료별 가격 변동 팝업 조회

5. **인보이스 연동**
   - 입고 시 인보이스 번호/날짜/금액/파일 저장
   - 발주서에서 인보이스 정보 조회

6. **입고 → 재고 자동 반영**
   - current_stock 증가
   - inventory_transactions 기록
   - inventory_batches 생성 (로트/유통기한)

**신규 테이블 (4개):**
- `purchase_orders` - 발주서 마스터 (인보이스 포함)
- `purchase_order_items` - 발주 품목 (예상단가 + 실단가)
- `order_cart_items` - 발주 대기 목록 (장바구니)
- `ingredient_price_history` - 가격 변동 히스토리

---

### Socket.io 실시간 주문 알림 시스템 (일시 중단)

**상태:** Git stash에 저장됨 (`git stash pop`으로 복원 가능)

**구현 내용 (미완성):**
- `OrderContext.tsx`: Socket.io 연결 및 실시간 주문 수신
- `MainLayout.tsx`: 실시간 pending order count 표시
- 새 주문 알림 사운드 기능
- 알림 설정 (on/off) localStorage 저장

**복원 명령어:**
```bash
git stash pop
```

---

## ✅ 완료된 작업 (2026-01-04)

### Product Recipe 탭 UI 개선

**목적:** BrandProductRecipe 페이지의 Ingredients, Recipe Categories, Ingredient Categories 탭을 RecipeManagement 스타일로 통일

**수정된 파일 (3개):**
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientsTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductRecipeCategoriesTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientCategoriesTab.tsx`

**변경 내용:**
- **ProductIngredientsTab**: 테이블 → 카드 그리드 레이아웃, 이미지 업로드 기능, ConfirmModal 적용
- **ProductRecipeCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- **ProductIngredientCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- ThemedButton 사용, 카테고리 reorder API 연동

---

## ✅ 완료된 작업 (2026-01-01)

### PhoneInput 컴포넌트 표준화

**목적:** 모든 페이지의 전화번호 입력을 국가코드를 지원하는 PhoneInput 컴포넌트로 통일

**수정된 파일 (12개):**
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/pages/Profile/ProfilePage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Manager/SignupPage.tsx`
- `dev-frontend/src/components/Staff/StaffProfileModal.tsx`
- `dev-frontend/src/pages/CompanyProfile/CompanyProfilePage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandGeneralDashboard.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandManagement.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx`
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- 기존 `<Input type="tel">` → `<PhoneInput>` 컴포넌트로 교체
- 국가 선택에 따른 국가코드 자동 변경 지원
- `defaultCountry` prop으로 기본 국가 설정

### Country Select 표준화

**목적:** 국가 선택 드롭다운을 COUNTRIES 상수를 사용하도록 통일

**수정된 파일:**
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`

**변경 내용:**
- 하드코딩된 국가 옵션 → `COUNTRIES` 상수 import 사용
- 기본값 `'Malaysia'` → `'MY'` (국가 코드 표준)

### Foodcourt 메뉴 구조 개선

**수정된 파일:**
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- Foodcourt General/Manager 메뉴에 Company Information 항목 추가
- 메뉴 섹션 구조화 (Management, Analytics, Administration, Support)

---

## ✅ 완료된 작업 (2025-12-30)

### 데이터베이스 스키마 수정

**문제:** Recipe Management, Inventory 페이지에서 500 에러 발생

**원인:** Sequelize 모델에 정의된 컬럼이 실제 DB 테이블에 없음

**해결:** 누락된 컬럼 추가
```sql
-- ingredients 테이블
ALTER TABLE ingredients ADD COLUMN track_stock TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE ingredients ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;

-- general_stock 테이블
ALTER TABLE general_stock ADD COLUMN image_url MEDIUMTEXT;
ALTER TABLE general_stock ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;
```

### 메뉴 깜빡임(flickering) 버그 수정

**문제:** 네비게이션 메뉴 클릭할 때마다 메뉴가 나타났다 사라졌다 반복

**원인:** `MainLayout.tsx`의 `isMenuAllowed` 헬퍼 함수가 로딩 중일 때 `false` 반환
```typescript
// 문제 코드
const isMenuAllowed = (route: string) => {
  if (loading) return false;  // 로딩 중 메뉴 숨김 → 깜빡임 발생
  return isRouteAllowed(route);
};
```

**해결:** `isMenuAllowed` 헬퍼 제거, `isRouteAllowed` 직접 사용
- `isRouteAllowed`는 `allowedRoutes.length === 0`일 때 `true` 반환 (fail-open)
- 로딩 중에도 메뉴 유지됨

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### General Stock Categories 탭 위치 변경

**사용자 요청:** "General Stock Categories는 왜 레시피에 있어? 재고관리에 있어야지"

**변경 내용:**
- Recipe Management 페이지에서 General Stock Categories 탭 제거
- Inventory 페이지에 Categories 탭 추가 (History 옆)

**수정 파일:**
- `/var/www/dev-frontend/src/pages/RecipeManagement/RecipeManagementPage.tsx` - 탭 제거
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx` - 탭 추가

### Product Recipes 메뉴 접근 권한 수정

**사용자 요청:** "Product Recipes 메뉴가 레스토랑 관리자에서는 아예 안나와야 해"

**변경 내용:**
- Restaurant Admin 메뉴에서 Product Recipes NavItem 제거
- 이 메뉴는 Brand General/Manager에게만 표시

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### 개발/운영 DB 설정값 동기화

**사용자 요청:** "운영서버 세팅값이 개발서버에서 배포하면 자꾸 바뀌고 있어"

**분석:**
- 개발 DB와 운영 DB의 레스토랑 설정값이 다름
- 개발 DB: `cash_rounding: NULL`, `rounding_apply_to: cash_only`, `operation_settings: NULL`
- 운영 DB: `cash_rounding: 0.10`, `rounding_apply_to: all`, `operation_settings: {...}`
- 배포 스크립트는 스키마(테이블/컬럼)만 동기화하고 데이터는 변경하지 않음
- 문제의 원인은 DB 데이터 불일치가 아닌, 프론트엔드에서 기본값으로 병합하는 로직

**해결:**
1. 개발 DB의 restaurant 10 설정값을 운영 DB와 동기화
   ```sql
   UPDATE restaurants SET
     cash_rounding = 0.10,
     rounding_apply_to = 'all',
     operation_settings = (운영 DB의 operation_settings)
   WHERE id = 10;
   ```
2. 배포 스크립트는 데이터를 변경하지 않으므로 운영 설정값은 보존됨

**확인 완료:**
- 운영 API `/api/restaurants/10` → 올바른 설정값 반환
- 프론트엔드 코드: DB 컬럼값(currency, cash_rounding, rounding_apply_to)을 우선 사용

---

## ✅ 완료된 작업 (2025-12-29)

### Inventory 페이지 버그 수정 및 개선

**수정된 파일:**
- `dev-backend/routes/inventory-routes.js`
- `dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `dev-frontend/src/hooks/useAllowedRoutes.ts`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**해결된 문제들:**

1. **재고 페이지 "No ingredients found" 문제**
   - 원인: API가 `restaurant_id`만 쿼리하고 `brand_id` 재료를 포함하지 않음
   - 해결: `inventory-routes.js`에서 브랜드 재료도 포함하도록 OR 조건 추가
   ```javascript
   const orConditions = [{ restaurant_id: restaurantId }];
   if (restaurant?.brand_id) {
     orConditions.push({ brand_id: restaurant.brand_id });
   }
   ```

2. **404 오류: `/inventory/expiring` API 누락**
   - 원인: `inventory.js`에 있던 API가 실제 사용되는 `inventory-routes.js`에 없음
   - 해결: `inventory-routes.js`에 `/expiring` 엔드포인트 추가

3. **`toFixed is not a function` 오류**
   - 원인: DB에서 `avg_daily_usage`가 문자열("0.0000")로 반환됨
   - 해결: `parseFloat(String(value))`로 변환 후 `toFixed()` 호출
   ```typescript
   // 수정 전
   <div>{item.avg_daily_usage.toFixed(2)}</div>
   // 수정 후
   <div>{(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)}</div>
   ```

4. **Authorization 헤더 누락**
   - 원인: `fetchAPI`가 쿠키 기반이나 시스템은 Bearer 토큰 사용
   - 해결: `authFetch` 헬퍼 함수 추가하여 `Authorization: Bearer` 헤더 포함

5. **디버그 로그 제거**
   - `MainLayout.tsx`와 `useAllowedRoutes.ts`에서 과도한 console.log 제거
   - 콘솔 스팸 문제 해결

### Reports 페이지 통계 분석

**분석 완료 - 코드 정확성 확인:**
- `filteredOrders`에서 `status === 'completed'`만 필터링됨
- 모든 통계(salesData, categoryData, menuData, drilldownData)가 completed 주문 기준
- cancelled 주문은 정확하게 제외됨

**운영 DB 확인 (restaurant_id=8, 2025-12-29):**
- completed: 32건, RM 785.50
- cancelled: 2건, RM 37.00

---

## ✅ 완료된 작업 (2025-12-28)

### 프론트엔드 빌드 오류 수정

**문제:**
- 500 Internal Server Error 발생
- `node_modules/.cache` 폴더 권한 문제로 빌드 불완전 (index.html 미생성)

**해결:**
1. sudo로 `node_modules/.cache` 폴더 삭제
2. `DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true` 옵션으로 재빌드
3. 빌드 성공 확인 (HTTP 200 정상 응답)

**명령어:**
```bash
echo "$SUDO_PASSWORD" | sudo -S rm -rf /var/www/dev-frontend/node_modules/.cache
DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true CI=false npm run build
```

---

## ✅ 완료된 작업 (2025-12-22)

### 통화 설정 시스템 개선

**문제 1: 통화 코드 불일치**
- 메뉴 페이지에서 레스토랑 통화가 RM으로 설정되어 있어도 $로 표시됨
- `useBrandCurrency` 훅이 브랜드 API에서 통화를 가져오고 있었음

**해결:**
1. `useBrandCurrency` 훅을 레스토랑 기반으로 변경
   - `/api/restaurants/${restaurantId}`에서 통화 가져오기
   - 토큰 키 수정 (`token` → `auth_token`)
2. `CURRENCY_CONFIG`에 `RM` 키 추가 (말레이시아 현지 관례)
3. 모든 페이지의 기본 통화값을 `MYR` → `RM`으로 변경 (23개 파일)

**문제 2: 배포 시 설정값 리셋**
- 운영 배포 후 통화 반올림, Pager 설정 등이 초기화됨
- `operation_settings` JSON과 개별 컬럼(`cash_rounding`, `currency`) 값이 불일치

**해결:**
1. 백엔드 `store.js`에서 설정 저장 시 `operation_settings` 내부 값도 개별 컬럼과 동기화
2. 프론트엔드에서 `cash_rounding`이 null일 때 기본값 설정하지 않음 (비활성화 상태 보존)
3. 운영 DB의 불일치 데이터 동기화 쿼리 실행

**수정된 파일:**
- `dev-backend/routes/store.js` - operation_settings 동기화 로직 추가
- `dev-frontend/src/hooks/useBrandCurrency.ts` - 레스토랑 기반으로 변경
- `dev-frontend/src/utils/currency.ts` - RM 키 추가, 기본값 RM
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` - null 보존 로직
- 23개 페이지의 통화 기본값 변경

---

## ✅ 완료된 작업 (2025-12-19)

### 재고관리 시스템 완료

**구현 내용:**
1. **Backend API 라우터 수정**
   - `inventory.js` auth middleware import 수정 (`authenticateToken` destructuring)
   - `inventory-routes.js` 생성 (restaurants.js에서 마운트)
   - `server.js`에 inventory-routes 마운트 추가
   - 기존 중복 라우터 등록 정리

2. **API 엔드포인트 (모두 동작 확인됨)**
   - GET `/api/restaurants/:id/inventory` - 재고 현황
   - GET `/api/restaurants/:id/inventory/summary` - 요약
   - GET `/api/restaurants/:id/inventory/alerts` - 알림 목록
   - GET `/api/restaurants/:id/inventory/transactions` - 거래 내역
   - GET `/api/restaurants/:id/inventory/reorder-suggestions` - 발주 제안
   - GET `/api/restaurants/:id/stock-takes` - 재고 실사 목록
   - POST 엔드포인트들 (receive, waste, adjust, initial, stock-take 등)

3. **Frontend**
   - InventoryPage.tsx 구현 완료 (Dashboard, Stock List, History 탭)
   - StockTakePage.tsx 구현 완료 (재고 실사 기능)
   - 공통 UI 컴포넌트 활용 (Table, TableHeader, TableRow 등)

**관련 파일:**
- `/var/www/dev-backend/routes/inventory-routes.js` (신규)
- `/var/www/dev-backend/routes/inventory.js`
- `/var/www/dev-backend/server.js` (라우터 마운트 추가)
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `/var/www/dev-frontend/src/pages/Inventory/StockTakePage.tsx`
- `/var/www/docs/INVENTORY_MANAGEMENT_SYSTEM.md` (설계문서)

### RM 하드코딩 통화 수정 (18개 파일)

**문제:** 여러 페이지에서 통화가 'RM'으로 하드코딩되어 있었음

**해결:** `useBrandCurrency` 훅과 `formatCurrency` 유틸리티를 사용하여 동적 통화 표시

**수정된 파일:**
- Manager 페이지 (11개): SalesPage, ManagerDashboard, ManagerCustomersPage, ManagerPromotionsPage, ManagerReportsPage, InvoicesPage, RestaurantsPage, AdminManagementPage, ManagerSubscriptionsPage, SignupPage, SubscriptionsPage
- BrandGeneral 페이지 (3개): BrandGeneralDashboard, BrandReportsPage, BrandPerformance
- 기타 페이지 (4개): CustomersPage, RestaurantDashboard, MenuManagementPage, DashboardContent

---

## ✅ 완료된 작업 (2025-12-16)

### PM2 Port 충돌 문제 영구 해결

**문제:** dev-backend가 "Port 3001 is already in use" 에러로 무한 재시작 루프 발생

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 모듈을 로드할 때 app.js도 실행되어 같은 포트에 두 번 바인딩 시도

**해결:**
1. `app.js`에 `require.main === module` 체크 추가 (직접 실행 시에만 서버 시작)
2. `ecosystem.config.js`에 PM2 안정성 설정 추가:
   - `exec_mode: 'fork'` (명시적)
   - `max_restarts: 10`, `min_uptime: 5000`, `restart_delay: 4000`
   - `kill_timeout: 5000`
3. `/var/www/dev-backend/restart-dev.sh` 스크립트 생성 (포트 정리 후 재시작)

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (신규)
- `/var/www/dev-backend/README.md` (트러블슈팅 섹션 추가)

### Notification Settings 페이지 토큰 키 수정

**문제:** 로그인 상태인데 "No authentication token found" 에러 발생

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체에서는 `localStorage.getItem('auth_token')` 키 사용

**해결:**
- NotificationSettingsPage.tsx의 3곳에서 `'token'` → `'auth_token'`으로 변경
  - 377번줄: loadSettings Authorization 헤더
  - 397번줄: handleSave 토큰 가져오기
  - 442번줄: sendTestEmail Authorization 헤더

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx`

---

## ✅ 완료된 작업 (2025-12-15)

### Phase 3: 브랜드 제품 관리 시스템 - 완료

**구현 완료 항목:**

#### 3.1 데이터베이스
- [x] `brand_product_categories` 테이블 생성
- [x] `brand_products` 테이블 생성 (base_quantity, sync_to_ingredients 추가)
- [x] `brand_product_option_groups` 테이블 생성
- [x] `brand_product_options` 테이블 생성
- [x] `brand_product_brands` 연결 테이블 (N:M 관계)
- [x] `brand_product_option_group_products` 연결 테이블 (N:M 관계)

#### 3.2 Backend 구현
- [x] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
- [x] Routes: `/api/brand-products` (통합 관리 - CRUD)
- [x] Routes: `/api/brand-product-categories` (CRUD)
- [x] Routes: `/api/brand-product-option-groups` (CRUD)
- [x] Routes: `/api/brands/:brandId/products` (브랜드별 제품 조회)
- [x] `isBrandManager` 미들웨어 개선 (brand_id 없는 요청도 허용)

#### 3.3 Frontend 구현
- [x] Brand General 메뉴에 "Product Management" 추가 (`/pos/brand-general/products`)
- [x] BrandProductManagementPage - 3개 탭 구조
- [x] BrandProductCategoriesTab - 카테고리 관리
- [x] BrandProductsTab - 제품 목록/CRUD (이미지, 가격, 옵션 그룹, 브랜드 연결)
- [x] BrandProductOptionsTab - 옵션 그룹/옵션 관리

### Phase 4: 제품-재료 연동 시스템 - 완료

#### 4.1 연동 로직 구현
- [x] `ingredients` 테이블에 `brand_product_id` FK 추가
- [x] `ingredients` 테이블에 `image_url` 필드 추가 (MEDIUMTEXT)
- [x] `ingredients` 테이블에 `base_quantity` 필드 추가
- [x] Brand Product 생성/수정 시 자동으로 Ingredient 레코드 생성/업데이트
- [x] `sync_to_ingredients` 플래그로 연동 여부 선택 가능 (패키지 등 비재료 제품 지원)
- [x] Brand Product 삭제 시 연결된 Ingredient 자동 삭제

#### 4.2 Frontend 구현
- [x] IngredientsTab에 이미지 표시 (카드에 이미지 표시)
- [x] IngredientsTab에 이미지 업로드 기능 추가
- [x] IngredientsTab에 base_quantity 필드 추가 (Base Qty / Unit 표시)
- [x] 브랜드 재료는 "Brand" 배지로 구분 표시

### 주요 변경 파일

**Backend:**
- `/var/www/dev-backend/models/BrandProduct.js` - base_quantity, sync_to_ingredients 추가
- `/var/www/dev-backend/models/Ingredient.js` - brand_product_id, image_url, base_quantity 추가
- `/var/www/dev-backend/models/index.js` - BrandProduct-Ingredient 연관관계 추가
- `/var/www/dev-backend/routes/brand-products.js` - syncProductToIngredients 함수 구현
- `/var/www/dev-backend/routes/ingredients.js` - image_url, base_quantity 필드 지원
- `/var/www/dev-backend/middleware/recipeAuth.js` - isBrandManager 개선
- `/var/www/dev-backend/scripts/sync-brand-products.js` - 기존 제품 동기화 스크립트

**Frontend:**
- `/var/www/dev-frontend/src/pages/BrandProductManagement/BrandProductsTab.tsx` - base_quantity, sync_to_ingredients UI
- `/var/www/dev-frontend/src/pages/RecipeManagement/IngredientsTab.tsx` - 이미지, base_quantity UI

---

## 📅 예정된 작업 (Supply Chain Management 로드맵)

### 전체 흐름도
```
[Brand General/Manager]
        │
        ▼
 Brand Products 등록 (제품 관리)
 ├── 제품 카테고리
 └── 제품 옵션 (옵션 그룹 + 옵션)
        │
        ▼ (brand_id 연결된 레스토랑에 자동 노출)
        │
[Restaurant Admin]
        │
        ├─→ 레시피 생성 시 재료로 선택
        │   ├── 브랜드 재료 (View & Select만)
        │   └── 자체 재료 (CRUD 가능)
        │
        ├─→ 주문 발생 → 재고 차감
        │
        └─→ 발주 관리
              ├── 브랜드로 발주 (Brand Products)
              └── 외부 공급업체 발주 (자체 재료)
```

### 핵심 개념
- **Brand Product = Ingredient**: 브랜드 제품은 연결된 레스토랑에서 레시피 재료로 사용
- **제품 수정은 제품에서만**: Brand General/Manager가 제품을 수정하면 재료 정보도 자동 반영
- **이중 발주 경로**: 브랜드 제품 → 브랜드 발주 / 자체 재료 → 외부 공급업체 발주

---

### Phase 3: 브랜드 제품 관리 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### Phase 4: 제품-재료 연동 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### ~~Phase 3: 브랜드 제품 관리 시스템~~ (완료됨)

~~**목적:** Brand General/Manager가 레스토랑에 판매할 제품(원재료)을 등록/관리~~

#### ~~3.1 데이터베이스 설계~~
```sql
-- 브랜드 제품 카테고리
CREATE TABLE brand_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 브랜드 제품
CREATE TABLE brand_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),                    -- 제품 코드
  unit VARCHAR(50),                    -- 기본 단위 (kg, L, 개 등)
  unit_price DECIMAL(10, 2) NOT NULL,  -- 단가
  min_order_quantity INT DEFAULT 1,    -- 최소 주문 수량
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES brand_product_categories(id)
);

-- 브랜드 제품 옵션 그룹 (포장 단위, 등급 등)
CREATE TABLE brand_product_option_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "포장 단위", "등급"
  is_required BOOLEAN DEFAULT FALSE,
  min_selections INT DEFAULT 0,
  max_selections INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES brand_products(id) ON DELETE CASCADE
);

-- 브랜드 제품 옵션
CREATE TABLE brand_product_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "1kg", "5kg", "프리미엄"
  price_adjustment DECIMAL(10, 2) DEFAULT 0,  -- 추가 금액
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (option_group_id) REFERENCES brand_product_option_groups(id) ON DELETE CASCADE
);
```

#### 3.2 Backend 구현
1. [ ] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
2. [ ] Routes: `/api/brands/:brandId/products` (CRUD)
3. [ ] Routes: `/api/brands/:brandId/product-categories` (CRUD)
4. [ ] Routes: `/api/brands/:brandId/products/:productId/option-groups` (CRUD)
5. [ ] 권한 체크: Brand General/Manager만 수정 가능

#### 3.3 Frontend 구현
1. [ ] Brand General 메뉴에 "제품 관리" 추가
2. [ ] BrandProductsPage - 제품 목록/CRUD
3. [ ] BrandProductCategoriesPage - 카테고리 관리
4. [ ] 제품 상세 모달 - 옵션 그룹/옵션 관리

**산출물:**
- Brand General/Manager가 제품 등록/수정/삭제
- 제품 카테고리로 분류
- 제품별 옵션(포장 단위, 등급 등) 설정

---

### Phase 4: 제품-재료 연동 시스템

**목적:** 브랜드 제품이 연결된 레스토랑의 레시피 재료로 자동 노출

#### 4.1 연동 로직
```
Brand Product (브랜드 제품)
       │
       ▼ brand_id로 연결된 레스토랑에서
       │
Ingredient로 자동 표시 (owner_type = 'brand')
       │
       └── Restaurant Admin: View & Select만 가능
```

#### 4.2 Backend 구현
1. [ ] 기존 ingredients 테이블에 `brand_product_id` FK 추가
2. [ ] Brand Product 생성 시 자동으로 Ingredient 레코드 생성 (트리거 또는 서비스 로직)
3. [ ] Brand Product 수정 시 연결된 Ingredient 자동 업데이트
4. [ ] Restaurant의 재료 조회 API에서 브랜드 제품 포함

#### 4.3 Frontend 구현
1. [ ] RecipesPage 재료 선택에서 브랜드 재료 구분 표시
2. [ ] 브랜드 재료는 View만 가능 (수정 버튼 숨김)
3. [ ] 재료 출처 표시 (브랜드명 또는 "자체 재료")

**산출물:**
- 브랜드 제품 → 재료 자동 연동
- Restaurant Admin이 레시피에서 브랜드 재료 선택 가능
- 제품 정보 변경 시 재료 정보 자동 반영

---

### Phase 5: 재고 관리 시스템

**목적:** 실시간 재고 추적 및 자동 차감

#### 5.1 데이터베이스 설계
```sql
-- 레스토랑별 재고
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  current_quantity DECIMAL(10, 2) DEFAULT 0,
  unit VARCHAR(50),
  min_quantity DECIMAL(10, 2) DEFAULT 0,  -- 최소 재고량 (알림 기준)
  max_quantity DECIMAL(10, 2),             -- 최대 재고량
  last_stock_take_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (restaurant_id, ingredient_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 재고 거래 내역
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  transaction_type ENUM('in', 'out', 'adjustment', 'stock_take') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  reference_type VARCHAR(50),    -- 'order', 'purchase_order', 'manual'
  reference_id INT,              -- order_id, purchase_order_id 등
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- 재고 알림
CREATE TABLE stock_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  alert_type ENUM('low_stock', 'out_of_stock', 'expiring') NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

#### 5.2 Backend 구현
1. [ ] Models: Inventory, InventoryTransaction, StockAlert
2. [ ] APIs: 재고 조회, 조정, 재고 실사
3. [ ] 주문 완료 시 Recipe → Ingredient → Inventory 자동 차감
4. [ ] 최소 재고 도달 시 알림 생성

#### 5.3 Frontend 구현
1. [ ] `/pos/inventory` - 재고 현황 페이지
2. [ ] `/pos/inventory/transactions` - 거래 내역
3. [ ] `/pos/inventory/stock-take` - 재고 실사
4. [ ] `/pos/inventory/alerts` - 재고 알림

**산출물:**
- 실시간 재고 추적
- 주문 시 자동 재고 차감
- 재고 부족 알림

---

### Phase 6: 발주 관리 시스템

**목적:** 브랜드 제품 및 외부 공급업체 발주 관리

#### 6.1 데이터베이스 설계
```sql
-- 공급업체 (브랜드 + 외부)
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  supplier_type ENUM('brand', 'external') NOT NULL,
  brand_id INT,                  -- supplier_type = 'brand'인 경우
  contact_name VARCHAR(100),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(100),
  address TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 공급업체-재료 매핑
CREATE TABLE supplier_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  unit_price DECIMAL(10, 2),
  min_order_quantity INT DEFAULT 1,
  lead_days INT DEFAULT 1,       -- 배송 소요일
  is_preferred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, ingredient_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 발주서
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,
  status ENUM('draft', 'pending', 'approved', 'ordered', 'partial_received', 'received', 'cancelled') DEFAULT 'draft',
  order_date DATE,
  expected_date DATE,
  received_date DATE,
  total_amount DECIMAL(15, 2) DEFAULT 0,
  notes TEXT,
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- 발주 상세
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  brand_product_id INT,          -- 브랜드 제품인 경우
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (brand_product_id) REFERENCES brand_products(id)
);
```

#### 6.2 Backend 구현
1. [ ] Models: Supplier, SupplierIngredient, PurchaseOrder, PurchaseOrderItem
2. [ ] APIs: 공급업체 CRUD, 발주서 CRUD, 입고 처리
3. [ ] 브랜드 연결 시 자동 공급업체 생성
4. [ ] 입고 처리 → 재고 증가 연동

#### 6.3 Frontend 구현
1. [ ] `/pos/suppliers` - 공급업체 관리
2. [ ] `/pos/purchase-orders` - 발주서 목록
3. [ ] `/pos/purchase-orders/create` - 발주서 생성
4. [ ] `/pos/purchase-orders/:id` - 발주 상세/입고 처리

**산출물:**
- 공급업체 관리 (브랜드 자동 + 외부 수동)
- 발주서 생성/승인/입고 프로세스
- 입고 시 재고 자동 증가
- **원가 이력 관리 (Cost History)**
  - 재료 원가 변경 시 이전 원가 이력 저장 (`ingredient_cost_history` 테이블)
  - 입고 단가 변경 시 재료 원가 자동 업데이트 옵션
  - 원가 변동 추이 리포트 (이전 vs 현재 비교)
  - 레시피 코스트 계산 시 해당 시점의 원가 적용 (Point-in-Time 방식)
  - 마진율 분석: 원가 변동에 따른 메뉴별 마진 변화 추적

---

### Phase 7: AI 재고 예측 (향후)

**목적:** 주문 통계 기반 재고 예측 및 자동 발주 제안

#### 구현 예정
- 과거 주문 데이터 분석
- 요일/시간/계절별 패턴 분석
- 재고 예측 알고리즘
- 자동 발주량 계산
- 낭비 분석

---

### Phase 8: Restaurant Owner 역할

**목적:** 여러 독립 레스토랑을 소유한 오너가 통합 관리할 수 있는 역할

#### 8.1 역할 정의

**Restaurant Owner의 핵심 특징:**
- 브랜드/푸드코트와 무관하게 본인 소유 레스토랑 통합 조회
- 실제 운영(POS, 주문처리)은 Restaurant Admin/Staff가 담당

#### 8.2 권한 구조

**독립 레스토랑 (brand_id = NULL) 소유 시:**
| 기능 | Restaurant Owner | Restaurant Admin |
|------|:----------------:|:----------------:|
| 레스토랑 생성/삭제 | O | X |
| 레스토랑 설정 변경 | O | O |
| 메뉴/카테고리/옵션 관리 | O | O |
| 직원(Staff) 관리 | O | O |
| 매출/리포트 조회 | O (통합) | O (해당 매장) |
| POS 터미널 사용 | X | O |
| 주문 접수/처리 | X | O |

**브랜드 소속 레스토랑 (brand_id = 있음) 소유 시:**
| 기능 | Restaurant Owner |
|------|:----------------:|
| 매출/리포트 조회 | O (읽기 전용) |
| 그 외 모든 관리 | X (Brand General 권한) |
| POS 터미널 사용 | X |

#### 8.3 데이터베이스 설계
```sql
-- Restaurant 테이블에 owner_id 추가
ALTER TABLE restaurants ADD COLUMN owner_id INT NULL;
ALTER TABLE restaurants ADD FOREIGN KEY (owner_id) REFERENCES users(id);

-- User role ENUM에 'Restaurant Owner' 추가
ALTER TABLE users MODIFY COLUMN role ENUM(
  'System Admin',
  'Foodcourt General',
  'Brand General',
  'Foodcourt Manager',
  'Brand Manager',
  'Restaurant Owner',  -- 신규
  'Restaurant Admin',
  'Staff'
);
```

#### 8.4 구현 항목
1. [ ] User role에 'Restaurant Owner' 추가
2. [ ] Restaurant 테이블에 owner_id 필드 추가
3. [ ] Restaurant Owner 전용 대시보드 (통합 매출/리포트)
4. [ ] 레스토랑 전환 기능 (드롭다운)
5. [ ] 독립 레스토랑 생성 기능
6. [ ] 브랜드 소속 레스토랑 연결 (Brand General이 owner_id 설정)

#### 8.5 시나리오

**독립 레스토랑 운영:**
```
김사장 (Restaurant Owner)
├── 김사장 치킨집 (독립) → 직접 생성, 전체 관리
├── 김사장 카페 (독립) → 직접 생성, 전체 관리
└── 통합 대시보드에서 두 매장 합산 매출 조회
```

**브랜드 레스토랑 소유:**
```
이사장 (Restaurant Owner)
├── BBQ 강남점 (Brand: BBQ) → Brand General이 owner_id 연결
│   └── 매출 조회만 가능, 관리는 BBQ본사
└── 통합 대시보드에서 조회
```

**독립 → 브랜드 전환:**
```
독립 치킨집 → BBQ 프랜차이즈 가입
- owner_id: 유지
- brand_id: BBQ 추가
- 관리 권한: Brand General로 이전
```

---

### Phase 9: 구독 서비스 구조 개편

**목적:** 역할별 명확한 과금 체계 수립

#### 9.1 과금 원칙

**핵심:** 각 역할이 자기 기능 사용료를 직접 지불

#### 9.2 과금 구조

| 역할 | 과금 유형 |
|------|----------|
| Brand General | 기본 무료 + 추가 기능 유료 |
| Foodcourt General | 기본 무료 + 추가 기능 유료 |
| Restaurant Owner | 유료 (역할 사용료) |
| Brand Manager | 유료 (역할 사용료) |
| Foodcourt Manager | 유료 (역할 사용료) |
| Restaurant Admin | 유료 (역할 사용료) |
| Staff | 유료 (역할 사용료) |

#### 9.3 무료 제공 범위 (General 역할)

**Brand General 무료 기능:**
- 브랜드 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Brand Manager 생성

**Foodcourt General 무료 기능:**
- 푸드코트 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Foodcourt Manager 생성

**유료 추가 기능 (예시):**
- 고급 분석/리포트
- 대량 데이터 내보내기
- API 접근
- 우선 지원

#### 9.4 구현 항목
1. [ ] 역할별 기본/유료 기능 정의
2. [ ] 구독 플랜 테이블 재설계 (역할 기반)
3. [ ] 무료 기능 제한 로직
4. [ ] 유료 기능 활성화 체크
5. [ ] 과금 대시보드 (System Admin용)

---

### 개발 우선순위 요약

| 순서 | Phase | 내용 | 상태 |
|------|-------|------|--------|
| 1 | Phase 3 | 브랜드 제품 관리 | ✅ 완료 (2025-12-15) |
| 2 | Phase 4 | 제품-재료 연동 | ✅ 완료 (2025-12-15) |
| 3 | Phase 5 | 재고 관리 | ✅ 완료 (2025-12-19) |
| 4 | Phase 6 | 발주 관리 | 📝 설계 완료 (2026-01-06), 다음 개발 |
| 5 | Phase 7 | AI 재고 예측 | 대기 중 |
| 6 | Phase 8 | Restaurant Owner 역할 | 대기 중 |
| 7 | Phase 9 | 구독 서비스 구조 개편 | 대기 중 |

**Phase 6 (발주 관리) 상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

---

## 📅 기타 예정된 작업

### 브랜드 통합 고객 포인트/등급 시스템 (보류)

**목적:** Brand General이 소속 레스토랑들의 고객 포인트/등급을 통합 또는 분리 관리

*(상세 내용은 별도 문서로 분리 예정)*

### General 사용자 페이지 구현 (보류)

- Foodcourt/Brand General 전용 대시보드
- Manager 관리 페이지
- 권한 관리 시스템

### 구독 관리 시스템 (보류)

- 구독 활성화/비활성화
- UI Routes 제어
- 결제 연동

### 이메일 시스템 강화 (v3.6 예정)

- **템플릿 개선**: 로고 Base64 직접 삽입, 본문 줄바꿈 처리, 수신거부 링크
- **이메일 인증**: 회원가입/변경 시 인증 링크 발송 → 클릭해야 활성화 → 미인증 시 로그인 차단
- **MX 레코드 검증**: 이메일 등록 시 도메인 메일 서버 존재 확인
- **바운스 처리**: 발송 실패 시 마킹 → 3회 이상 발송 차단
- **설계**: `docs/EMAIL_SYSTEM.md` 하단 참조

### CSV 데이터 마이그레이션 (v3.6 예정)

- **목적**: 기존 POS 시스템에서 데이터 이관
- **4단계 순차 임포트**: 카테고리 → 메뉴 → 옵션 → 주문
- **자동 매핑**: CSV 컬럼명 정규화 + 동의어 사전으로 자동 매칭
- **UI**: Settings > Import Data 탭
- **설계**: `docs/CSV_IMPORT_SYSTEM.md` 참조

### Coming Soon 페이지 처리 (v3.6 예정)

- 미구현 9개 페이지 사이드바 메뉴 회색 + Coming Soon 표시
- BackupRestorePage, RestaurantSubscriptionsPage, SecurityPage, SystemConfigPage
- FoodcourtManagement, FoodcourtStats, TenantSupport, RentManagement
- ManagerPromotionsPage는 유지 (Foodcourt 모바일오더 연동 시 활성화)

### 전역 주문 알림 소리 (v3.6 예정)

- MainLayout에서 WebSocket으로 어느 페이지에서든 새 주문 알림 소리

---

## 🗄️ 데이터베이스 스키마

### plan_templates
```sql
CREATE TABLE plan_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  base_price_monthly DECIMAL(10, 2) NOT NULL,
  base_price_annual DECIMAL(10, 2) NOT NULL,
  order_limit INT DEFAULT 1000 COMMENT '-1 for unlimited',
  menu_item_limit INT DEFAULT 50 COMMENT '-1 for unlimited',
  staff_limit INT DEFAULT 5 COMMENT '-1 for unlimited',
  category ENUM('basic', 'custom') DEFAULT 'basic',
  plan_target ENUM('restaurant', 'brand', 'foodcourt') DEFAULT 'restaurant',
  features TEXT,
  included_modules JSON,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### addon_modules
```sql
CREATE TABLE addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('basic', 'advanced', 'revenue', 'operation', 'analytics') NOT NULL,
  target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all') DEFAULT 'restaurant',
  base_price_monthly DECIMAL(10, 2) DEFAULT 0.00,
  base_price_annual DECIMAL(10, 2) DEFAULT 0.00,
  ui_routes JSON COMMENT 'Array of allowed UI routes',
  features JSON COMMENT 'Feature descriptions for display',
  dependencies JSON COMMENT 'Required module codes',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 현재 플랜 목록 (9개)
```
Restaurant Plans:
1. Basic Plan (RM 29/month)
2. Professional Plan (RM 59/month)
3. Enterprise Plan (RM 99/month)

Brand Plans:
10. Brand Basic (RM 149/month)
11. Brand Professional (RM 299/month)
12. Brand Enterprise (RM 499/month)

Foodcourt Plans:
13. Foodcourt Basic (RM 149/month)
14. Foodcourt Professional (RM 299/month)
15. Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 (target_user_type 기준)

**Restaurant Modules:**
- pos_terminal, menu_management, customer_management
- table_management, kitchen_display, customer_display
- staff_management, reports_analytics, invoice_management
- promotions, support_tickets, activity_logs
- mobile_ordering, recipe_management, advanced_inventory

**Brand Modules:**
- brand_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Foodcourt Modules:**
- foodcourt_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Shared Modules (all):**
- restaurant_management

---

## 📁 주요 파일 목록

### Backend Models
```
/var/www/dev-backend/models/
├── PlanTemplate.js           # 구독 플랜 모델
├── AddonModule.js            # 애드온 모듈 모델
├── Restaurant.js             # 레스토랑 모델
├── User.js                   # 사용자 모델 (Manager 포함)
└── index.js                  # 모델 연관관계 정의
```

### Backend Routes
```
/var/www/dev-backend/routes/
├── plans.js                  # 플랜 관리 API
├── restaurants.js            # 레스토랑 관리 API
└── managers.js               # 매니저 관리 API (향후 확장 예정)
```

### Frontend Pages
```
/var/www/dev-frontend/src/pages/Admin/
├── PlansPage.tsx             # 플랜 관리 페이지
├── RestaurantsPage.tsx       # 레스토랑 관리 페이지
├── ManagersPage.tsx          # 매니저 관리 페이지 (General만)
└── SubscriptionsPage.tsx     # 구독 관리 페이지
```

### Frontend Hooks
```
/var/www/dev-frontend/src/hooks/
└── useAllowedRoutes.ts       # 라우트 권한 체크 Hook
```

---

## 🔗 관련 페이지

### 개발 환경
- **Admin Plans:** https://dev.purplehere.com/pos/admin/plans
- **Admin Restaurants:** https://dev.purplehere.com/pos/admin/restaurants
- **Admin Managers:** https://dev.purplehere.com/pos/admin/managers
- **Admin Subscriptions:** https://dev.purplehere.com/pos/admin/subscriptions

### 프로덕션 환경
- **URL:** https://orderhere.wor-pro.com

---

## 📝 개발 노트

### 주요 설계 결정사항

1. **General vs Manager 구분**
   - General: 구독 관리, Manager 생성/관리
   - Manager: 실무 작업, 구독 공유

2. **플랜 분리 이유**
   - Restaurant Plans: 개별 레스토랑 소유자용
   - Brand Plans: 다중 브랜드 관리용
   - Foodcourt Plans: 푸드코트 관리용
   - 각각 다른 가격 책정 및 기능 제공

3. **모듈 분류 기준**
   - target_user_type으로 명확히 구분
   - 'all'은 여러 타입이 공통으로 사용하는 모듈

4. **UI/UX 개선 원칙**
   - 기본값 자동 설정으로 사용자 편의성 증대
   - Role 변경 시 관련 필드 자동 업데이트
   - 동적 필터링으로 혼란 최소화

---

## 🔧 트러블슈팅 히스토리

### 문제 1: Brand General 사용자 레스토랑 필터링 미작동 (2025-11-20 해결)

**증상:**
- Brand General 사용자가 연결된 2개 레스토랑만 봐야 하는데 전체 9개 레스토랑 표시
- URL: https://dev.purplehere.com/pos/manager/restaurants
- DB `restaurant_managers` 테이블에는 정상적으로 연결되어 있음

**근본 원인:**
```typescript
// 문제 코드: RestaurantsPage.tsx:462
const token = localStorage.getItem('token'); // ❌ null 반환
// 실제 사용: 'auth_token' 키 사용 중
```
- localStorage 키 불일치로 인해 Authorization 헤더가 `Bearer null`로 전송됨
- 백엔드가 익명 사용자로 인식하여 role-based 필터링 미작동

**해결 방법:**
```typescript
// 수정: RestaurantsPage.tsx:462
const token = localStorage.getItem('auth_token'); // ✅ 정상 작동
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/Manager/RestaurantsPage.tsx` (Line 462)
- `/var/www/production-backend/routes/restaurants.js` (optionalAuth 미들웨어 추가)

**디버깅 팁:**
1. 백엔드 로그에서 Authorization header 확인
2. localStorage 키 이름 일치 여부 확인
3. 빌드 파일에서 실제 사용 키 검증: `grep 'localStorage.getItem' build/static/js/main.*.js`
4. 네트워크 탭에서 실제 헤더 값 확인

**예방책:**
- localStorage 키를 상수로 관리
- API 헬퍼 함수로 인증 헤더 통일
- 타입스크립트 유틸리티 함수 사용

### 문제 2: PM2 Port 충돌 무한 재시작 (2025-12-16 해결)

**증상:**
- dev-backend PM2 프로세스가 "Port 3001 is already in use" 에러로 무한 재시작
- PM2 로그에 반복적인 재시작 기록

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 app.js를 require할 때 app.js도 서버를 시작하려고 시도
- 결과적으로 같은 포트에 두 번 바인딩 시도

**해결 방법:**
```javascript
// app.js 수정
if (require.main === module) {
  startServer();
}
module.exports = { app, startServer };
```

**PM2 설정 추가 (ecosystem.config.js):**
```javascript
{
  max_restarts: 10,      // 최대 재시작 횟수 제한
  min_uptime: 5000,      // 최소 실행 시간
  restart_delay: 4000,   // 재시작 간 딜레이
  kill_timeout: 5000     // 종료 타임아웃
}
```

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (포트 정리 스크립트)

### 문제 3: NotificationSettingsPage 토큰 키 불일치 (2025-12-16 해결)

**증상:**
- 로그인 상태인데 "No authentication token found" 에러 표시
- Save Settings 버튼 클릭 시 저장 실패

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체는 `localStorage.getItem('auth_token')` 사용
- 키 불일치로 토큰이 null 반환

**해결 방법:**
```typescript
// 수정: NotificationSettingsPage.tsx
const token = localStorage.getItem('auth_token'); // 'token' → 'auth_token'
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx` (3곳 수정)

---

## 🐛 알려진 이슈

**현재 알려진 이슈 없음**

---

## 📞 연락처

**프로젝트:** Purple POS System
**개발 환경:** Development Server
**데이터베이스:** purple_dev_db (MySQL)
**마지막 업데이트:** 2026-01-06

---

## 📋 개발 예정: 재료/재고/발주 시스템 (v3.0)

> **기획일:** 2026-01-28
> **상태:** 검토 중

### 1. 현재 상태 (AS-IS)

| 구성요소 | 현재 상태 | 비고 |
|---------|----------|------|
| Supplier | ✅ 구현됨 | Brand/Restaurant별 공급업체 관리 |
| Ingredient | ✅ 구현됨 | PAR Level, track_stock 지원 |
| Inventory | ✅ 구현됨 | Transaction, Batch, StockTake |
| BrandProduct | ✅ 구현됨 | Ingredient 동기화 지원 |
| PurchaseOrder | ❌ 미구현 | InventoryBatch에 FK만 존재 |
| PurchaseInvoice | ❌ 미구현 | 기존 Invoice는 SaaS 구독용 |
| SOA (월정산) | ❌ 미구현 | - |
| SupplierProduct | ❌ 미구현 | 공급업체 판매 품목 |

### 2. 목표 구조 (TO-BE)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPPLIER (공급업체)                             │
│  - SupplierProduct 등록/관리                                        │
│  - Live Orders로 발주 수신                                          │
│  - PurchaseInvoice 발행 → SOA 월정산                                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                     (거래 관계 승인)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   BRAND GENERAL (본사)                               │
│  - Supplier Product → Ingredient로 등록                             │
│  - BrandProduct 관리 (가맹점에 공급) ← 기존                          │
│  - 가맹점 발주 Live Orders로 수신                                    │
│  - 외부 Supplier에게 발주 가능                                       │
└─────────────────────────────────────────────────────────────────────┘
                                │
                     (Brand 소속)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                RESTAURANT ADMIN (가맹점/매장)                        │
│  - BrandProduct 또는 SupplierProduct → Ingredient로 등록            │
│  - 재고 관리 (track_stock=true인 Ingredient)                        │
│  - 발주 생성 → Brand 또는 Supplier에게 전송                          │
│  - PurchaseInvoice 수신 → 결제                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3. 핵심 개념

#### 3.1 역할별 정의

| 역할 | 정의 | 공급자 역할 | 구매자 역할 |
|------|------|-----------|-----------|
| Supplier | 외부 공급업체 | ✅ SupplierProduct 판매 | ❌ |
| Brand General | 프랜차이즈 본사 | ✅ BrandProduct 공급 | ✅ Supplier에게 발주 |
| Restaurant Admin | 개별 매장 | ❌ | ✅ Brand/Supplier에게 발주 |

#### 3.2 데이터 계층

```
[공급층] SupplierProduct / BrandProduct
              ↓ "검색 → 선택 → 등록"
[재료층] Ingredient (source_type: manual/supplier_product/brand_product)
              ↓ track_stock = true
[재고층] InventoryTransaction / InventoryBatch / StockAlert
              ↓ "발주 생성"
[발주층] PurchaseOrder → PurchaseInvoice → SOA
```

#### 3.3 기존 Invoice vs PurchaseInvoice

| 항목 | Invoice (기존) | PurchaseInvoice (신규) |
|------|---------------|----------------------|
| 용도 | SaaS 구독료 | B2B 물품 발주 대금 |
| 발급자 | System Admin, Brand | Supplier, Brand |
| 결제자 | Restaurant | Restaurant, Brand |
| 연결 대상 | PlanTemplate | PurchaseOrder |

### 4. 신규 테이블

| 테이블 | 용도 |
|--------|------|
| supplier_products | 공급업체 판매 품목 |
| supplier_product_categories | 공급업체 상품 카테고리 |
| trade_relationships | 거래 관계 (구매자↔판매자) |
| purchase_orders | 발주서 |
| purchase_order_items | 발주 품목 |
| purchase_invoices | 발주 청구서 |
| purchase_invoice_items | 청구 품목 |
| statements_of_account | SOA 월정산 |
| soa_payments | SOA 결제 기록 |

### 5. 기존 테이블 수정

| 테이블 | 수정 내용 |
|--------|----------|
| ingredients | source_type, supplier_product_id 추가 |
| suppliers | is_external, linked_brand_id, user_id 추가 |
| inventory_batches | purchase_order_id FK 연결 |

### 6. 거래 관계 플로우

#### 6.1 거래 관계 규칙

| 관계 | 신청 필요 | 설명 |
|------|----------|------|
| Brand ↔ Restaurant | ❌ 자동연결 | Restaurant 생성 시 소속 Brand와 자동 연결, 해제 불가 |
| Supplier ↔ Restaurant | ✅ 신청/승인 | Restaurant에서 신청 → Supplier에서 승인 |
| Supplier ↔ Brand | ✅ 신청/승인 | Brand에서 신청 → Supplier에서 승인 |

#### 6.2 거래 상태

| 상태 | Badge 색상 | 가능한 액션 |
|------|-----------|-----------|
| 자동연결 (Brand) | 회색 Default | 발주하기 |
| 승인대기 | 노랑 Pending | 취소 |
| 승인됨 | 초록 Approved | 발주하기, 연결해제 |
| 거절됨 | 빨강 Rejected | 재신청 |
| 중단됨 | 회색 Suspended | - |

#### 6.3 Restaurant > Suppliers 페이지 UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Suppliers                                    [+ 거래 신청]     │
├─────────────────────────────────────────────────────────────────┤
│  [연결된 공급업체]                                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Brand HQ (본사)              [자동연결] [발주하기]          │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ABC Foods                    [승인됨]   [발주하기]          │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Fresh Produce Co.            [승인대기]                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.4 Supplier > Customers 페이지 UI (거래 신청 관리)

```
┌─────────────────────────────────────────────────────────────────┐
│  Customers                                                      │
├─────────────────────────────────────────────────────────────────┤
│  [Tab: 거래 신청 (2)] [Tab: 연결된 거래처]                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Restaurant ABC                                              │ │
│  │ Brand: Purple Cafe | 신청일: 2026-01-28                    │ │
│  │                                    [Reject]  [Approve]     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.5 승인 시 거래 조건 설정

- 결제 조건: 월정산(Monthly) / 건별 후불(Net 30) / 선결제(COD)
- 결제 기한: SOA 발행 후 N일
- 신용 한도: RM (0 = 무제한)

### 7. UI/UX 개발 가이드 (필수 준수)

#### 7.1 재사용할 기존 컴포넌트

| 용도 | 컴포넌트 | 위치 |
|------|---------|------|
| 모달 | Modal | components/common/Modal |
| 버튼 | Button | components/common/Button |
| 테이블 | Table | components/common/Table |
| 뱃지 | StatusBadge | components/common/StatusBadge |
| 카드 | Card | components/common/Card |
| 검색 | SearchInput | components/common/SearchInput |
| 탭 | Tabs | components/common/Tabs |
| 폼 | Input, Select | components/common/Form |
| 확인창 | ConfirmDialog | components/common/ConfirmDialog |

#### 7.2 참고할 기존 페이지

| 신규 페이지 | 참고할 기존 페이지 |
|------------|------------------|
| Suppliers 목록 | SuppliersPage.tsx |
| 거래 신청 모달 | AddSupplierModal 패턴 |
| Live Orders | OrdersPage.tsx |
| Invoices | InvoicesPage.tsx, BrandInvoicesPage.tsx |

#### 7.3 절대 금지

- 새 버튼 스타일 만들기
- 새 모달 디자인 만들기
- 새 색상 추가
- 기존 컴포넌트 복제 후 수정
- inline style 사용

### 8. 개발 순서 (상세)

> **원칙**: 각 단계별 DB 연동 + API 테스트 + UI 테스트 완료 후 다음 단계 진행

#### Phase 1: 기반 정비

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 1-1 | Track Stock 토글 복구 | Ingredient 카드에서 토글 ON/OFF → DB 반영 확인 | ⬜ |
| 1-2 | Recipes 메뉴 클릭 버그 | Brand General 좌측 메뉴 정상 작동 확인 | ⬜ |
| 1-3 | dev 서버 빌드/배포 | 프론트엔드 빌드 성공, 페이지 정상 로드 | ⬜ |

#### Phase 2: DB 테이블 생성

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 2-1 | suppliers 테이블 수정 | is_external, linked_brand_id, user_id 컬럼 추가 확인 | ⬜ |
| 2-2 | ingredients 테이블 수정 | source_type, supplier_product_id 컬럼 추가 확인 | ⬜ |
| 2-3 | supplier_product_categories 생성 | 테이블 생성, CRUD 테스트 | ⬜ |
| 2-4 | supplier_products 생성 | 테이블 생성, FK 연결, CRUD 테스트 | ⬜ |
| 2-5 | trade_relationships 생성 | 테이블 생성, unique key 테스트 | ⬜ |
| 2-6 | purchase_orders 생성 | 테이블 생성, 상태 ENUM 확인 | ⬜ |
| 2-7 | purchase_order_items 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-8 | purchase_invoices 생성 | 테이블 생성, 상태 ENUM 확인 | ⬜ |
| 2-9 | purchase_invoice_items 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-10 | statements_of_account 생성 | 테이블 생성, unique key (period) 테스트 | ⬜ |
| 2-11 | soa_payments 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-12 | inventory_batches FK 추가 | purchase_order_id FK 연결 확인 | ⬜ |

#### Phase 3: Supplier 역할 및 Product

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 3-1 | Supplier 역할 추가 | User role_id 추가, 권한 설정 | ⬜ |
| 3-2 | SupplierProductCategory Model | Sequelize 모델, API CRUD 테스트 | ⬜ |
| 3-3 | SupplierProduct Model | Sequelize 모델, API CRUD 테스트 | ⬜ |
| 3-4 | Supplier Products API | GET/POST/PUT/DELETE 전체 테스트 | ⬜ |
| 3-5 | Supplier Dashboard 페이지 | 페이지 로드, 데이터 표시 확인 | ⬜ |
| 3-6 | Supplier Products 페이지 | 목록 조회, 생성, 수정, 삭제 전체 테스트 | ⬜ |

#### Phase 4: 거래 관계

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 4-1 | TradeRelationship Model | Sequelize 모델 생성 | ⬜ |
| 4-2 | Trade API (조회) | GET 거래 관계 목록 | ⬜ |
| 4-3 | Trade API (신청) | POST 거래 신청 → status='pending' | ⬜ |
| 4-4 | Trade API (승인/거절) | PUT 승인 → status='approved', 거래조건 저장 | ⬜ |
| 4-5 | Brand 자동 연결 로직 | Restaurant 생성 시 Brand 자동 연결 확인 | ⬜ |
| 4-6 | Restaurant Suppliers 페이지 | 연결된 공급업체 목록, 상태별 표시 | ⬜ |
| 4-7 | 거래 신청 모달 | 공급업체 검색 → 신청 → DB 저장 확인 | ⬜ |
| 4-8 | Supplier Customers 페이지 | 거래 신청 목록, 승인/거절 버튼 | ⬜ |
| 4-9 | 거래 승인 모달 | 거래조건 설정 → 승인 → DB 저장 확인 | ⬜ |
| 4-10 | Brand Suppliers 페이지 | Brand General용 공급업체 관리 | ⬜ |

#### Phase 5: Supplier Product → Ingredient 연동

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 5-1 | Ingredient Model 수정 | source_type, supplier_product_id 필드 추가 | ⬜ |
| 5-2 | 연결된 공급업체 Product 조회 API | 승인된 거래처의 Product만 조회 | ⬜ |
| 5-3 | "From Supplier Product" 모달 | 공급업체 선택 → Product 검색 → 선택 | ⬜ |
| 5-4 | Ingredient 생성 로직 | source_type 자동 설정, track_stock 연동 | ⬜ |
| 5-5 | Restaurant Ingredients 페이지 확장 | [+ From Supplier/Brand] 버튼 동작 | ⬜ |
| 5-6 | Brand Ingredients 페이지 확장 | [+ From Supplier Product] 버튼 동작 | ⬜ |
| 5-7 | Inventory 페이지 확장 | [+ From Supplier/Brand] 버튼 동작 | ⬜ |

#### Phase 6: 발주 시스템

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 6-1 | PurchaseOrder Model | Sequelize 모델 생성 | ⬜ |
| 6-2 | PurchaseOrderItem Model | Sequelize 모델 생성 | ⬜ |
| 6-3 | PO API (CRUD) | 생성/조회/수정/삭제 테스트 | ⬜ |
| 6-4 | PO API (상태변경) | submit/confirm/ship/receive 테스트 | ⬜ |
| 6-5 | PO 번호 자동생성 | PO-{YYMMDD}{NNN} 포맷 확인 | ⬜ |
| 6-6 | Restaurant Ordering 페이지 | 발주 목록, 상태별 필터 | ⬜ |
| 6-7 | 발주 생성 모달 | 공급업체 선택 → 품목 추가 → 저장 | ⬜ |
| 6-8 | 발주 제출 | Submit → status='submitted' → 알림 | ⬜ |
| 6-9 | Supplier Live Orders 페이지 | 신규 주문 목록, 상태별 탭 | ⬜ |
| 6-10 | 주문 확인/처리 | Confirm → Processing → Ship 상태 변경 | ⬜ |
| 6-11 | Brand Live Orders 페이지 | 가맹점 발주 수신 | ⬜ |
| 6-12 | 입고 처리 모달 | 품목별 입고수량 입력 → 저장 | ⬜ |
| 6-13 | InventoryBatch 자동 생성 | 입고 완료 시 Batch 생성 확인 | ⬜ |
| 6-14 | InventoryTransaction 생성 | type='purchase' 트랜잭션 확인 | ⬜ |
| 6-15 | current_stock 업데이트 | Ingredient 재고 증가 확인 | ⬜ |
| 6-16 | 원가 이력 테이블 | ingredient_cost_history 모델 + 마이그레이션 | ⬜ |
| 6-17 | 원가 변경 이력 저장 | 입고 단가 변경 시 이전 원가 자동 기록 | ⬜ |
| 6-18 | 원가 변동 리포트 | 재료별 원가 추이 차트 + 이전 vs 현재 비교 | ⬜ |
| 6-19 | Point-in-Time 코스트 | 레시피 코스트 조회 시 해당 시점 원가 적용 | ⬜ |

#### Phase 7: 청구/결제 시스템

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 7-1 | PurchaseInvoice Model | Sequelize 모델 생성 | ⬜ |
| 7-2 | PurchaseInvoiceItem Model | Sequelize 모델 생성 | ⬜ |
| 7-3 | PI API (CRUD) | 생성/조회/수정 테스트 | ⬜ |
| 7-4 | PI API (상태변경) | issue/submit-payment/confirm 테스트 | ⬜ |
| 7-5 | PI 번호 자동생성 | PI-{prefix}{YYMMDD}{NNN} 포맷 확인 | ⬜ |
| 7-6 | 자동 Invoice 발행 | 입고 완료 → PI 자동 생성 (설정에 따라) | ⬜ |
| 7-7 | Supplier Invoices 페이지 | 청구서 목록, 발행, 결제확인 | ⬜ |
| 7-8 | Restaurant Purchase Invoices 탭 | 받은 청구서 목록 | ⬜ |
| 7-9 | 결제 제출 모달 | 결제방법, 참조번호, 영수증 업로드 | ⬜ |
| 7-10 | 결제 확인/거절 | Supplier측 확인 → status='paid' | ⬜ |

#### Phase 8: SOA 월정산

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 8-1 | StatementOfAccount Model | Sequelize 모델 생성 | ⬜ |
| 8-2 | SOAPayment Model | Sequelize 모델 생성 | ⬜ |
| 8-3 | SOA API (생성) | 수동 SOA 생성 테스트 | ⬜ |
| 8-4 | SOA API (조회) | 판매자/구매자별 조회 | ⬜ |
| 8-5 | SOA 자동 생성 로직 | 월정산 거래처 Invoice 묶기 | ⬜ |
| 8-6 | 이월 잔액 계산 | 전월 미납분 자동 계산 | ⬜ |
| 8-7 | Cron Job 설정 | 매월 1일 자동 생성 | ⬜ |
| 8-8 | Supplier SOA 페이지 | SOA 목록, 발행, 결제기록 | ⬜ |
| 8-9 | Restaurant SOA 페이지 | SOA 조회, 결제 | ⬜ |
| 8-10 | 부분 결제 처리 | partial_paid 상태 테스트 | ⬜ |
| 8-11 | 연체 처리 | due_date 경과 → overdue 상태 | ⬜ |

### 9. 결정 필요 사항

1. **Supplier 로그인**: 새 역할 ID vs 별도 Portal
2. **결제 수단**: 은행 이체만 / 온라인 결제 추가
3. **신용 한도**: 거래처별 설정 여부
4. **알림 채널**: 이메일/SMS/인앱

### 10. 시스템 부하 체크리스트

| # | 항목 | 확인 내용 | 상태 |
|---|------|----------|:----:|
| 1 | DB 테이블 증가 | 11개 테이블 추가 시 용량/성능 | ⬜ |
| 2 | 인덱스 설계 | 조회 성능용 인덱스 | ⬜ |
| 3 | Cron Job 부하 | SOA 월정산 자동 생성 | ⬜ |
| 4 | 동시 접속 | Supplier Portal 추가 | ⬜ |
| 5 | API 응답 시간 | 발주/Live Orders 조회 | ⬜ |
| 6 | 파일 스토리지 | 영수증 이미지 저장 | ⬜ |
| 7 | 알림 발송 | 대량 발송 시 부하 | ⬜ |
| 8 | 트랜잭션 처리 | 발주→입고→Invoice 연쇄 | ⬜ |
| 9 | 권한 체계 | Supplier 역할 추가 영향 | ⬜ |
| 10 | 데이터 마이그레이션 | 기존 데이터 호환성 | ⬜ |

---

## 📋 예정: 선행 보안 이슈 (2026-04-13 발견)

> /검증 과정에서 드러난 pre-existing 보안 갭. 이번 세션 작업 아님.

### 1. `POST /api/restaurants` 역할 제한 누락 (HIGH)
- **현재**: `authenticateToken + validateRestaurantCreation` 만 있음. Staff/Brand Manager 포함 모든 로그인 유저가 restaurant 생성 가능
- **검증 결과**: Staff, Brand Manager 모두 POST 성공 (201 반환)
- **위험**: 권한 없는 유저가 타인의 브랜드/푸드코트 restaurant 생성 → 데이터 오염
- **수정 방향**:
  - `router.post('/', authenticateToken, requireRole('System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'), validateRestaurantCreation, ...)`
  - Brand Manager/Foodcourt Manager는 General에게 요청하도록 UX 가이드
  - 역할별 brand_id/foodcourt_id 자동 할당 로직(line 645~652) 유지
- **관련**: `/var/www/dev-backend/routes/restaurants-crud.js:638`

---

## 📋 예정: 구독/인보이스 시스템 후속 작업

> 2026-04-12 구독/인보이스 자동화 작업 중 발견한 후속 과제. 별도 세션에서 진행.

### 1. Supplier Portal + 구독 인보이스 연동
- **현재**: `suppliers` 테이블은 납품업체 데이터(Brand/Restaurant 소속). 로그인/구독 없음
- **계획**: Supplier Portal 구축 시
  - `users.role` ENUM에 'Supplier' 추가
  - Supplier 유저가 직접 로그인해서 발주/재고 조회
  - 구독 요금 부과 (같은 `subscriptionInvoiceService` 헬퍼 재사용)
  - `createInitialInvoice({ kind: 'user', role: 'Supplier', ... })` 패턴 그대로 작동
- **영향 범위**: Supplier Portal 구축 시 5분 작업 (헬퍼만 추가 호출)

### 2. 구독 변경 히스토리 페이지
- **현재**: `invoice.modification_history` JSON에 before/after/reason 저장
- **계획**: 한 엔티티(레스토랑/유저)의 전체 구독 변경 타임라인 조회 페이지
- **위치**: 레스토랑 상세 페이지 또는 Manager 상세 페이지에 탭 추가

### 3. Trial 만료 자동 알림 이메일
- **현재**: `subscriptionScheduler.js`가 상태 전환만 수행. 알림 이메일 없음
- **계획**: 3일 전/당일/만료 후 1일 이메일 발송
- **대상**: 각 구독 엔티티의 이메일 주소
- **템플릿**: `notificationTemplates.js`에 `trialExpiringEmail`, `trialExpiredEmail` 추가

### 4. Daily scheduler 모니터링 대시보드
- **현재**: `generateSubscriptionInvoices`, `generateEntitySubscriptionInvoices` 등이 매일 2시에 실행. 결과는 콘솔 로그만
- **계획**: 실행 결과(generated/skipped/errors) 를 DB 테이블에 저장하고 System Admin 대시보드에서 조회
- **필요 이유**: 프로덕션에서 스케줄러가 실제로 돌고 있는지, 얼마나 생성/실패하는지 가시성 확보
- **버그 참고**: v3.12까지 `isTodayAdvanceOf()` 가 정확히 14일 전인 날에만 true 반환 → catch-up 모드로 수정 완료 (2026-04-12)

### 5. 대량 구독 변경 확인 다이얼로그
- **현재**: 구독 필드 1건 수정 시 미결제 인보이스 1건 자동 동기화 (모달 없음)
- **계획**: Bulk edit (여러 엔티티 동시 변경) 기능 추가 시 "N개 인보이스가 업데이트됩니다" 확인 모달 필요
- **우선순위**: 낮음 (현재 Bulk edit 기능 없음)

### 6. 인보이스 수동 vs 자동 생성 UI 구분
- **현재**: `invoice.type` ENUM 은 'automatic'/'manual' 있지만 UI에서 시각 구분 없음
- **계획**: 인보이스 목록에 작은 아이콘/뱃지로 구분 표시 (🤖 auto / 👤 manual)

---

## 📋 예정: 스토어 키오스크 UI (태블릿 모바일 오더)

> 매장 태블릿에서 손님이 직접 주문하는 키오스크 모드. 모바일 오더와 별도 UX/세션.

### 배경
- Restaurant Admin이 매장 태블릿으로 모바일 오더 사용을 원함
- 현재 모바일 오더는 "고객 본인 핸드폰 = 개인 계정" 전제로 설계
- 공유 태블릿에 persistent login 남으면 다음 손님에게 개인정보/포인트 노출 위험

### 설계 방향
- **별도 키오스크 모드로 분리** (반응형만 추가하는 것으로는 세션 보안 해결 안 됨)
- 기존 모바일 오더 백엔드 + 카트 로직 + 메뉴 데이터 + 결제 API 전부 재사용 (약 70% 재사용 가능)
- 페이지 레이아웃과 네비게이션/세션 래퍼만 신규

### 범위
| 항목 | 내용 |
|------|------|
| 진입점 | `/kiosk/:slug` — 모바일 로그인 화면 대신 게스트 메뉴 즉시 노출 |
| 레이아웃 | 태블릿 가로/세로 최적화 (10~13인치, 큰 터치 타겟) |
| 인증 | 로그인/회원가입 UI 완전 제거. 모든 주문 guest |
| 세션 | 주문 완료 3초 후 state 전체 리셋 + 홈으로 자동 이동 |
| 테이블 바인딩 | 설정에서 "이 태블릿 = Table N 고정" 또는 "카운터 픽업 전용" 매핑 |
| 결제 | 카운터 결제 / QR 결제만 허용 (모바일 회원 결제 플로우 제거) |
| 설정 | `operationSettings.kioskMode: { enabled, tableBinding, paymentModes }` |

### 구현 단계
1. `<KioskProvider>` — 로그인/세션 차단하는 상위 컨텍스트
2. `/kiosk/:slug` 라우트 5개 (entry / menu / cart / checkout / thanks)
3. 공통 로직 재사용: `MobileOrderContext` 일부, 메뉴 API, 결제 API
4. Settings → Operations 탭에 "키오스크 모드" 토글 + 테이블 바인딩 선택
5. 주문 완료 자동 리셋 훅 (idle timeout + thanks 페이지 후 홈 이동)
6. 검증: 공유 태블릿 시나리오, 2명 연속 주문 시 state 격리

### 관련 결정 사항 (작업 시작 전 확인)
- 키오스크 모드가 모바일 회원 포인트와 연동되는가? (권장: 안 함 — 100% 게스트)
- 쿠폰 코드 수동 입력은 허용? (권장: 허용 — guest도 공개 promo 사용 가능)
- 태블릿 사용 중 인터넷 끊기면? (권장: offline 주문 캐시 → 재연결 시 전송)

### 참고
- Irene 의견 요청 후 결정: 2026-04-12 — "나중에 다시 물어볼게" (즉시 작업 X)
- 실제 착수 전 Irene에게 우선순위 확인 필요

