# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-22 (Floor Plan Zone/Group + /검증 11단계 + CLAUDE.md critical 박제 — 미배포 dev 완료)
**버전:** **v3.37** 운영 (이후 dev 누적). 다음 배포 시 v3.38 후보.
**작업 상태:** dev 완료 (Settings UI + Floor Plan zone filter + backend lazy migrate). 운영 미배포.

## 🚨 새로 박제된 CRITICAL 룰 (다음 세션 절대 잊지 말 것)

**Build 통과 ≠ Runtime 안전** — v3.37 TDZ 크래시 교훈 영구 박제:
- CLAUDE.md 에 critical 섹션 추가
- /검증 skill 에 10단계 (운영 critical 페이지 mount) + 11단계 (옵션 --e2e) 추가
- 운영 critical 페이지 (POS/모바일/KDS/Floor Plan/결제) 변경 시 **실 브라우저 mount 의무**
- e2e 룰: flaky 100% (95% X), auto-fix selector/waitFor 만, 결제 sandbox만, 운영 데이터 e2e 절대 금지

## 미배포 dev 변경 (2026-05-22)

**Floor Plan Zone & Table Group 시스템 (대규모)**
- DB: Restaurant.floor_plan JSON v1→v2 lazy migrate (zones, table_groups, tables.group_id)
- Settings UI: `ZonesAndGroupsCard` 신규 — Zone CRUD + Table Group CRUD (prefix 자동, table 자동생성) + Zone filter Table QR Grid (group prefix 사용)
- Settings UI: 기존 자동생성 grid + tablePrefix/totalTables 입력 제거 (single source of truth = floor_plan.tables)
- Floor Plan 페이지: Zone filter chip (All Zones / Zone별)
- 설계 문서: `docs/RESTAURANT_FLOOR_PLAN_ZONE_DESIGN.md`

**검증 — 모든 단계 PASS**:
- state-hydration 0 warning · health-check 80/80 · 빌드 OK
- 실 API 7/7 PASS (lazy migrate / PUT-GET roundtrip / cross-group dup number / order with new label / 옛 QR 호환)
- Playwright UI 6/6 PASS (Settings zone+group CRUD + Floor Plan zone filter + Cleanup)
- 운영 critical 8 페이지 mount ALL CLEAN (TDZ/ReferenceError 0)

**운영 v1 매장 영향 (다음 배포 시)**: with-min-cafe, demo-korean-bbq, luatest — lazy migrate 자동, 매장 입장 변화 0 (default zone "Main" + 옛 prefix 보존)

## 🚨 critical 보고 (다음 세션 잊지 말 것)
- 2026-05-22 v3.37 1차 배포 (`main.201da990.js`) — 모바일 메뉴 페이지 TDZ 크래시. Cancel access 'K' before initialization.
- 원인: `useEffect(() => ..., [updateCatInUrl])` 가 `updateCatInUrl` const 선언보다 위 → JavaScript TDZ.
- 운영 영향: 모바일 메뉴 진입 시 즉시 ErrorBoundary fallback. 매장 모바일 주문 차단.
- 같은 날 hotfix 배포로 복구 (`main.adc11a78.js`).
- 교훈: **state-hydration / health-check 통과해도 runtime TDZ 잡지 못함**. 운영 critical 페이지(모바일 메뉴/POS) 변경 시 dev 브라우저 실 mount 검증 필수.

---

## 🚨 매장 CRITICAL 메모 (다음 세션 절대 잊지 말 것)

> **"POS 에서 POS (Customer Display) 가 안 열리는 건 절대 일어나면 안 되는 일"** — Irene 2026-05-20 명시.
> Customer Display 는 우리 서비스 기본 기능. 매장이 다음에 켰을 때 또 안 되면 신뢰 큰 손상.

- 매장 (한 매장, 운영 사용 중) 이 2026-05-20 Customer Display 안 뜨는 문제 호소
- 우리가 같은 날 3 hotfix 운영 배포까지 진행했지만 **매장에서 실제 동작 확인 못 함** (Irene 매장 떠남)
- 매장 환경 정보 미파악: PWA 새 설치 여부 / 두 번째 모니터 변경 이력 / Chrome 버전 / Windows 버전
- 가능 시나리오: 매장이 내일 켰을 때 fix 가 작동 → 해결 / 또는 여전히 안 됨 → AnyDesk 원격 진단 필요

---

## 진행 중인 작업

- **없음** — Customer Display 3차 운영 배포 완료. 10-13" POS 반응형 dev 완료 (미배포). 매장 실환경 검증만 미수행.

### 10-13" POS 반응형 (2026-05-20 저녁, dev 완료, 미배포)

**Irene 지시**: "반응형 10-13인치까지 포스, 설정들, 랜딩페이지 헤더까지. 좌측 메뉴 가로 사이즈 줄이면 안돼? 메뉴길이보다 우측 공백 불필요. 1뎁스 2뎁스 모두."

**변경**:
- `MainLayout.tsx`: SIDEBAR_ADMIN_EXPANDED 220→**180**, SECONDARY_PANEL_W 220→**180** (Irene 재요청으로 196→180 한 번 더 축소), `SIDEBAR_AUTOCOLLAPSE_BREAKPOINT=1366` 신규
- RailItem/RailButton padding 14→10, gap 10→8 (BG "Products & Inventory" 20글자 ellipsis 해결 — 가용 130→136px)
- 초기 mount 시 `window.innerWidth <= 1366` 이면 자동 collapsed (일반 사용자: 0px + open 버튼 / 2단 구조 역할: 64px 아이콘 only)
- `SettingsPage.tsx` Printer 탭: QZ Tray 상태 행 flexWrap, Bill/Kitchen Printer/Station input+버튼 행 flexWrap + `flex: '1 1 180px'`, Network diagram overflowX:auto

**검증**:
- 빌드: main.* 1.6M, dev 반영 (총 3 라운드 — 220→196, 196→180, padding 추가 축소)
- Playwright 18 페이지 (1280×800 / 1366×768 / 1920×1080 × 6 페이지 RA): overflow 0 + 콘솔 에러 0
- Playwright 7 역할 × 2 viewport (1280×800 / 1920×1080): 1280 사이드바 64px / 1920 사이드바 180px 일관, mount 에러 0 (Supplier/BM 의 API 403 은 별개 권한 이슈, mount 영향 0). Owner 만 dev DB 미존재 → 코드 자동 적용
- health-check 80/80 PASS · state-hydration 0 warning
- 캡처 도구 추가: `dev-frontend/scripts/capture-responsive.js` (향후 반응형 회귀 점검용으로 정착)

**남은 작업**:
- 운영 배포 (Irene `/배포` 명령 시)
- Customer Display 매장 실환경 검증 1순위 잔존

### 3차 운영 배포 결과 (2026-05-20 08:23 UTC)

- Deployment Complete, 10/10 smoke
- Backup: `/var/www/backups/20260520_082207`
- 운영 `main.a8abd661.js` 200 / chunk `3694.242148d4` 200 / chunk `9641.29520257` 200
- 4 langs settings.json `resetPosition` 키 모두 운영에 반영 (en/ko/zh/ms)

---

## 다음 세션 (2026-05-21~) 첫 작업 — 우선순위 순

### 1. 매장 상태 재확인 (1순위, 가장 시급)

- 매장에 3차 hotfix 적용 (Ctrl+R 새로고침 또는 PWA 재시작) 후 Customer Display 정상 작동 여부 확인
- **안 되면 AnyDesk / TeamViewer 원격 접속 진단** (Irene 가 매장에 사전 동의 받기) — 매장 실환경 직접 보는 게 유일하게 100% 확실한 방법
- 매장 환경 정보 수집:
  - PWA 데스크탑 앱 새로 설치/재설치한 적 있나?
  - 두 번째 모니터 분리/재연결/해상도/위치 변경한 적 있나?
  - Chrome 버전 / Windows 버전 / 모니터 모델
  - 작업관리자에 떠도는 PurpleHereCustomerDisplay popup 있나?

### 2. 매장 안내 가이드 작성 (Irene 명시 — "혼선없게")

> "포스나 시스템 설정을 제대로 안내해서 혼선없게 하던지" — Irene 2026-05-20

**작성 대상 (우선 결정 필요)**:
- (A) Settings 페이지 안의 안내 카드 — Customer Display 카드 안에 단계별 setup 가이드 (Window Management 권한 / 모니터 배치 / popup 드래그 / Reset Position 사용법)
- (B) FAQ / 블로그 포스트 — "Customer Display 가 안 뜨면" 문제 해결 가이드 (4 langs)
- (C) 매장 초기 onboarding wizard — 가맹 시 1회 setup 마법사
- 추천: A + B 동시 (in-app 안내 + 검색 가능한 문서)
- 형식 결정 + 4 langs 작성

**가이드 핵심 콘텐츠**:
- 두 번째 모니터 연결 + Windows/macOS Display 설정 ("Extend" 모드)
- Customer Display 첫 클릭 시 Chrome 의 "Window Management" 권한 prompt → "허용" 안내
- popup 떴는데 메인에 있으면 두 번째 모니터로 드래그 (또는 Win + Shift + → / ←)
- 모니터 환경 변경 후 안 뜨면 → Settings → "Reset Position" 버튼 / 또는 F12 콘솔 명령
- AutoOpen 토글 안내

### 3. 잔존 미해결 / 추가 보강

- **Chrome PWA standalone 의 `window.open` 좌표 무시** 알려진 제약 web search (Chromium 버그 트래커, Stack Overflow)
- **Window Management API permission 명시적 요청 UI** 추가 (Settings 의 안내 카드 안에 "Grant Permission" 버튼)
- **Sentry / 에러 트래킹** 추가 — Customer Display 호출 결과 (reason 별 카운트) 익명 수집해서 운영 매장 패턴 파악 (PII 0)

### 4. 이번 사이클 행정 정리

- 버전 표기: v3.36 hotfix 로 올림 (매장 critical fix 라 backstage 분류 아님)
- CHANGELOG / DEVELOPMENT_PLAN 업데이트 (3 hotfix 통합 항목)
- 공지 포스트: "Customer Display 안정성 강화 + Reset Position 추가" (4 langs)
- git commit: 미커밋 7 파일 (utils + 2 page + 4 i18n) — 3 hotfix 가 누적되어 한 커밋이 자연스러움
- 매장 안내 메시지 최종본 (Ctrl+R + Reset Position 사용법)

---

## 미커밋 파일 (이번 사이클 3 hotfix 누적, 다른 작업 섞이지 않음)

```
M dev-frontend/src/utils/customerDisplay.ts                   # 1차+2차+3차 누적
M dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx      # 1차 (OpenResult 호출자 update)
M dev-frontend/src/pages/Settings/SettingsPage.tsx            # 1차 (alert→setInfoModal) + 3차 (Reset Position 버튼)
M dev-frontend/public/locales/en/settings.json                # 3차 (resetPosition 4키 추가 + popupBlocked dead key 제거)
M dev-frontend/public/locales/ko/settings.json                # 3차 (동일)
M dev-frontend/public/locales/zh/settings.json                # 3차 (동일)
M dev-frontend/public/locales/ms/settings.json                # 3차 (동일)
```

---

## 완료된 작업 (2026-05-20 — Customer Display 안정성 hotfix 3차 누적)

### 문제 흐름 (시간순)

1. 매장 보고: "POS Terminal 우측 상단 Customer Display 버튼 눌러도 두 번째 모니터에 안 뜸"
2. 1차 fix 운영 배포 후: 매장 재시도 → "새 데스크탑앱(popup)으로 열렸는데 다른 모니터에는 안 뜸. 모달도 안 뜸"
3. 추가 보고: "이제 기존 메인 모니터에 뜨던 것도 아무리 눌러도 표시 안되고 안 올라옴" (Windows 환경)
4. 2차 fix 운영 배포 후: 매장 응답 전 Irene "여전히 앱 켜도 화면 안 나와. 잘 나오던 게 안 나옴"
5. 3차 fix 운영 배포 진행 중 — Irene 매장 떠남, 검증 못 함

### root cause 2가지 (분석 완료)

- **(A) localStorage `cd.lastBounds` stale**: 매장이 이전에 popup 을 두 번째 모니터로 드래그 → 그 좌표 저장됨. 두 번째 모니터 disconnect / 해상도 변경 / PWA 새 설치 등으로 좌표가 stale 됨 → popup 이 더 이상 존재하지 않는 모니터 영역에 뜸 → 화면 영역 밖.
- **(B) `openedWindow.focus()` early return silent fail**: 한 번 popup 잃어버리면 `openedWindow` 변수에 그 참조가 살아있어서, 다시 클릭해도 `focus()` + URL 변경만 시도. popup 이 hidden/minimize/화면 밖에 있으면 시각적 변화 없음 → 매장 입장 "아무 반응 없음" 무한 반복.
- A + B 시너지로 stuck.

### 3개 hotfix 누적

**1차 — Silent fail → 안내 모달** (운영 배포 완료, main.9ca490f0.js, 2026-05-20 07:51 UTC)
- `openCustomerDisplay()` 가 `Promise<boolean>` → `Promise<OpenResult>` 로 변경
- 5 시나리오별 안내 모달 (`permission-denied` / `no-secondary-screen` / `popup-blocked` / `opened-fallback` (Firefox/Safari) / `opened`)
- Window Management permission API 명시 체크
- 호출자 2곳 (POSTerminalPage:2387, SettingsPage:5352) update
- SettingsPage 의 `alert()` → `setInfoModal()` ([Standard modal components] 메모리 준수)
- 효과: silent fail 제거. 단 매장은 "popup 떴는데 모달 안 떴고 두 번째 모니터에도 안 뜸" 보고 → reason 이 'opened' 라 모달 없음 (Chrome PWA 좌표 무시 케이스).

**2차 — Hidden popup reuse 제거** (운영 배포 완료, main.5fcee7a5.js, 2026-05-20 08:13 UTC)
- `openedWindow.focus()` early return 제거 → 매번 `window.open()` 재호출 + 즉시 `moveTo` + `resizeTo` + `focus` 강제
- `forcePlacement` 헬퍼: immediate + addEventListener('load') 양쪽에서 호출
- 효과: root cause B 완전 해결. 단 root cause A (stale bounds) 잔존 → Irene "여전히 안 나옴".

**3차 — Stale bounds 자동 검증 + Reset Position UI** (운영 배포 진행 중, main.a8abd661.js)
- `isBoundsOnAttachedScreen()` 추가: `getScreenDetails()` 로 모든 모니터 영역과 비교. fallback: 현재 `window.screen` 영역과 비교.
- `getValidatedStoredBounds()`: stale 이면 localStorage 자동 삭제 + null 리턴
- `resetCustomerDisplayPosition()` export: 매장 자가 해결 수단
- SettingsPage Customer Display 카드에 "Reset Position" 버튼 추가 (보라 outline 버튼)
- i18n 4 langs (en/ko/zh/ms) — `resetPosition`/`resetPositionTitle`/`resetDoneTitle`/`resetDoneMessage` 4 키 × 4 langs = 16 entries
- Dead i18n key `popupBlocked` 4 langs 모두 cleanup (이번 fix 로 사용처 0건)
- 효과: root cause A 자동 해결. 매장이 직접 리셋 가능.

### 미해결 / 미검증

- **매장 실환경에서 fix 작동 확인** (Irene 매장 떠남) — 가장 큰 위험
- **Chrome PWA standalone 의 `window.open` 좌표 무시** 케이스 — web search 미수행. 알려진 제약이면 우리 코드만으론 100% 해결 불가, 매장이 popup 드래그 1회 필수
- **매장 환경 정보** (PWA 새 설치 여부, 모니터 변경 이력) 미파악

### 매장 우회 안내 (3차 배포 전 Irene 가 매장에 제공한 메시지)

```
PWA 안에서 F12 또는 Ctrl+Shift+I → Console 탭 →
localStorage.removeItem('cd.lastBounds'); location.reload();
```

또는 일반 Chrome 으로 https://purplehere.com 접속 → 같은 명령 (PWA 와 일반 Chrome localStorage 도메인 공유).

3차 배포 후엔: **Settings → Customer Display → "Reset Position" 버튼** 으로 가능 (매장 직원도 가능, console 불필요).

### 참고 코드 위치 / 키 [reference]

- `utils/customerDisplay.ts` — 모든 hotfix 의 중심
- `KEY_BOUNDS` = `'cd.lastBounds'` (localStorage)
- `KEY_AUTO` = `'cd.autoOpen'` (localStorage)
- `WINDOW_NAME` = `'PurpleHereCustomerDisplay'`
- routes: `/restaurant/:id/display` (CustomerDisplayPage) + `/restaurant/:id/checkout-display` (CheckoutDisplayPage)
- 호출자: POSTerminalPage.tsx (line 2385~2395) + SettingsPage.tsx (line 5352~5395)
- i18n 키: `settings:settingsPage.customerDisplay.*`

### 메모리 새로 만들 후보 (다음 세션 결정)

- `[Customer Display popup pattern]` — popup window + Window Management API + stale bounds validation + Reset 버튼 패턴. 향후 다른 보조 모니터 페이지 (Kitchen Display 등) 에도 적용 가능

### 완료된 작업 (2026-05-19 — v3.35)

### 완료된 작업 (2026-05-19 — v3.35)

**v3.35 운영 배포**
- SNS 썸네일 OG 이미지 정식 로고 적용 (1200×630 표준 + "Solving Real F&B Problems" 슬로건 + URL 푸터, 351KB → 19.6KB)
- `color_logo-slogan.svg` 신규 추가 (17.6KB, 향후 다른 곳에서도 활용 가능)
- 모바일 메뉴 헤더 정리 (상단 우측 "🍽️ Dine-In" 중복 라벨 제거, 매장 카드 한 줄 flex 정렬, 상태 도트화)

### 완료된 작업 (2026-05-19 — v3.34)

**v3.34 운영 배포**
- 모바일 메뉴 "How to order" 3-step 안내 배너 제거 (`FirstVisitHint` 컴포넌트 + 사용처 둘 다 삭제)
- 모바일 메뉴 카테고리 idle prefetch (`requestIdleCallback` 으로 init 완료 후 백그라운드 데이터+썸네일 prefetch, 두 번째 탭부터 즉시 표시). 추가 only · 기존 컴포넌트 무수정 · 실패 시 fallback

### 완료된 작업 (이전 세션 누적, 2026-05-18)

**v3.32 운영 배포 (점심)**
- 테이블 QR 무조건 dine-in 고정
- Reservation 기능 base 격상 (paywall 제거, AddonModule basic, 마이그)
- Mobile Order Settings 탭 전수 보강 (7 카드 + 27 i18n 키 × 4 langs)
- RA support 페이지 타이틀 `t('nav.systemInquiry')` 로 일치

**v3.33 운영 배포 (저녁)**
- Admin Invoices Cancel + Revert to Draft 버튼 (dead modal trigger 연결 + Revert 모달 신규)
- PWA standalone 데스크탑 앱 같은 창 전환 (`utils/runtime.isStandalone()` + `openSecondaryWindow` helper)
- 4 풀화면 페이지 Back 버튼 표준화 (PageHeader backHref prop + Customer/Kitchen/Floor Plan)
- KDS 정확성 보완 4건 (formatPickupTimeRange timezone · Pickup scheduled_pickup_time 정렬 · URL station stationId 우선 · Backend status 콤마 다중 필터)

**v3.33 hotfix 운영 배포 (밤)**
- **RA Recipe Management 5 탭 ReferenceError fix** (운영 매장 4곳 Recipe 페이지 즉시 복구) — v3.32 alert sweep 잔여 결함
- 모바일 OrderTypePage Footer 링크 (Back to Dashboard / Visit Homepage)
- BG/FG/Owner Reports `/api/menu` aggregation fix (Owner 정상화, BG/FG 는 backend 미들웨어 한계로 부분 적용)
- 헤드리스 자동 mount sweep 도구 (Playwright, 95 페이지 검증) — 안정화 사이클 표준 도구로 정착

### 다음 확정 작업
- 없음 — 지시 대기

### 다음 확정 작업 (전수 점검 결과 — 2026-05-19 audit)

> 2026-05-19 보안 + 코드 품질 전수 audit 완료. 결과 priority 순서.

**1. IDOR 결함 전수 재검증 + fix (운영 critical, 반나절)**
- Agent 주장: 43건 IDOR (Type A — `:id` 라우트에 `checkRestaurantAccess` 누락) + 9건 RBAC (Type C — DELETE/status 변경에 `requireRole` 누락)
- 직접 검증 시 일부 false positive 발견 (`restaurants-crud.js:1787 DELETE /:id` 는 이미 `requireRole('System Admin')` 보호됨)
- **실제 결함 확정 sample**: `orders-crud.js:112 GET /:id` (authenticateToken 만), `invoices-crud.js:580 DELETE /:id` (Foodcourt Manager 만 branch scope, 타 역할 무방어)
- 작업 절차: 각 보고된 라우트 직접 검증 → true positive 만 fix → 메모리 `reference_idor_sweep` 패턴 (`authenticateToken + checkRestaurantAccess` 동시) 적용 → health-check 에 영구 케이스 추가
- 핵심 파일: orders-crud.js / invoices-crud.js / contracts.js / users.js

**2. alert() / window.confirm() 18건 sweep (UX, 1시간)**
- v3.32 alert sweep 후에도 잔존
- alert(): BrandFranchiseMapPage(614), FoodcourtTenancyMapPage(736), FoodcourtFloorPlanPage(689), CheckoutDisplayPage(207), FoodcourtInvoicesPage(416), NotificationSettings(256), BrandProductsTab(676), HardwareQuotesPage(962), MainLayout(2794)
- window.confirm(): FoodcourtFloorPlanPage(678), Manager/RestaurantsPage(2436), IncomingOrdersView(513), FoodcourtSubscriptionsPage(488), BrandSubscriptionsPage(529), BrandFranchiseMapPage(603), ImportDataTab(152), Admin/CarriersPage(234), BrandMenuUpdatesPage(132)
- 패턴: ConfirmModal singleButton 또는 setSuccessMessage 적용

**3. API 응답 표준화 (일관성, 중)**
- 비표준 ~144건, 상위 8 파일에 집중: invoices-list.js(16) / brands-core.js(17) / foodcourts-core.js(17) / contents.js(15) / restaurants-crud.js(14) / public.js(8) / plans.js(7) / addon-modules.js(5)
- 표준: `{ success: true, data }` / `{ success: false, message }`. 비표준 `res.json({ error })` 또는 raw object 잔존
- 수정하는 파일 범위 내에서 정리 (CLAUDE.md 점진 적용 룰)

**4. 거대 파일 분리 (유지보수, 대)**
- backend 23개 > 500줄, 최대 `restaurants-crud.js` 2064줄
- frontend 102개 > 800줄, **최대 `SettingsPage.tsx` 6349줄** (압도적)
- 우선순위: SettingsPage > MainLayout(3370) > POSTerminalPage(3013) > MenuManagementPage(2263)
- 신규 작업 시 함께 분리 (대규모 리팩토링 별도 권장 X)

### 자동 검증 도구 (현재 통과 상태)
- health-check 80/80 ✅ · state-hydration 0 warning ✅ · headless mount sweep 95 페이지 0 크래시 ✅
- npm audit: backend moderate 1 (socket.io transitive, 영향 미미) / frontend high 1 (babel transitive, 빌드 only 런타임 무영향)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- Backend `checkRestaurantAccess` 미들웨어에 BG/FG brand_id/foodcourt_id scope 분기 추가 → BG/FG 의 `/api/menu?restaurantId=X` 403 해소 + Reports 차트 카테고리 분석 정상화
- OrderContext `/api/orders?limit=100` 자동 호출 — BM/Supplier 권한 분기 (현재 console error 노출, mount 영향 0)
- BM Dashboard / BG/FG Reports networkidle timeout (페이지 mount 는 정상 — sweep marker 한계)
- 헤드리스 sweep CI 통합 (배포 전 자동 mount 검증)
- 다른 역할의 인터랙션 후 발생 가능한 결함 — 헤드리스 sweep 으로 잡지 못함. 별도 검증 도구 필요 시
- zh/ms i18n 영어 잔존 690건 sweep (운영 critical 아님)
- BG → 산하 매장 operation_settings PUT 200 — design vs 결함 비즈니스 결정 필요
- Reservation 후속 — deposit / 캘린더 monthly view / WaitingList / 환불 cron (스프린트 규모, `/기능설계` 필요)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
