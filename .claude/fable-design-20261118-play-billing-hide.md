# 설계 — Purple POS 안드로이드 앱 안에서 요금제 구매 경로 숨기기 (2026-11-18 · Fable)

사실 문서: `/var/www/.claude/fable-facts-20261118-play-billing-hide.md` · 코드 직접 확인: `useNativeShell.ts` · `roleRouteDeny.ts` · `useAllowedRoutes.ts` · `ProtectedRoute.tsx` · `MainLayout.tsx`(읽기만) · `PaymentStatusModals.tsx` · `AccessBlocked.tsx` · `SuspendedBanner.tsx` · `UpgradeGuidePage.tsx` · `nativeAppUpdate.ts` · `capacitor.config.ts` · `AndroidManifest.xml`

## 0. 한 줄 원칙

**안드로이드 앱 안에서는 «디지털 서비스(우리 구독·브랜드/푸드코트 플랜·수수료)를 사거나 바꾸거나 돈 내는 것, 그리로 이끄는 글·버튼» 이 하나도 없다. 실물(음식값 · 공급업체 발주 청구서)은 그대로.** 판별은 함수 하나, 막는 주소 목록은 파일 하나. 🔒 보호파일 8개는 한 줄도 안 건드린다. 서버·DB·앱(APK) 변경 없음 — 웹 프론트만.

## 1. 앱 판별 — `utils/playApp.ts` (새 파일 · 단일 진실)

```ts
export function isPlayApp(): boolean      // 동기 판정
export function usePlayApp(): boolean     // 화면용 훅(늦게 붙는 브릿지 따라잡기)
```

`isPlayApp()` = 아래 중 하나라도 참:
1. `window.__PURPLE_DESKTOP?.platform === 'android'` (지금 쓰는 신호)
2. `window.Capacitor?.getPlatform?.() === 'android'` (Capacitor 런타임 — 첫 그림에도 있는지는 에뮬레이터 실측 항목 §7-1. 없어도 설계는 성립)
3. **걸쇠**: `localStorage['ph_android_app'] === '1'`

걸쇠 규칙: 1 또는 2 를 **본 순간에만** `'1'` 을 쓴다(그 외 어디서도 쓰지 않음 · 지우지 않음). 앱 WebView 의 저장소는 크롬과 분리돼 있어 일반 브라우저에는 이 값이 생길 수 없다. 효과: 두 번째 실행부터는 브릿지가 붙기 전 첫 그림에서도 앱으로 안다. try/catch 로 감싼다(저장소 막힘 → 걸쇠 없이 1·2 만).

`usePlayApp()`: 처음 값 `isPlayApp()`, 거짓이면 `useIsNativeShell('android')` 와 같은 0.5초×20회 재확인(그 훅을 안에서 불러 쓰고 폴링을 새로 짓지 않는다), 참이 되면 걸쇠 기록.

판단:
- **Play 설치본과 사이드로드본(디버그 .dev 포함)을 가르지 않는다** — 모든 안드로이드 앱에 적용. `installedFromPlay()` 로 가르면 디버그 APK 로 검증한 것이 Play 판에서 다르게 동작한다. 앱 실사용이 거의 없어 잃는 것 없음.
- 윈도우 앱(`platform ≠ 'android'`)·PWA·일반 브라우저 = 거짓 = 지금 그대로.
- User-Agent 꼬리표(`appendUserAgent`)는 쓰지 않는다 — APK 재빌드·재심사 대상이 되고, 위 셋으로 충분.
- 모를 때(첫 설치 첫 실행의 브릿지 전 몇 초)는 «웹» 으로 둔다 — 웹 무변경 보장이 우선. 그 구간은 로그인 화면이고(가입 링크는 이미 숨김) 로그인 뒤 화면은 훅이 따라잡는다.

## 2. 범위 — 숨길 것 / 그대로 둘 것

| 구분 | 앱에서 | 근거 |
|---|---|---|
| 우리 구독 사기·바꾸기(Change Plan · 플랜 고르기 · 가격표 · 가입) | **숨김/막음** | 정책 «cloud software and services» 해당 |
| 우리 구독 청구서 결제(Pay · Pay All · Pay Now · 결제수단 안내) | **숨김** — 청구서 «보기» 는 유지 | 결제만 문제. 내역 보기는 구매가 아님 |
| 브랜드·푸드코트 «Plans & Payments» 3항목(plans · subscriptions · payment-settings) | **숨김/막음** (양 역할 · 3항목 전부) | Irene 지시가 이 메뉴를 지목. plans·subscriptions 는 가격 붙은 구독 화면이라 심사자 눈엔 구독 판매. payment-settings 는 구매는 아니나 같은 제목 아래 혼자 남기지 않는다(규칙 단순 · 앱에서 쓸 일 없음) |
| 브랜드·푸드코트가 매장에 보낸 **실물 아닌** 청구서(로열티·마케팅비·플랜 구독료) 결제 | **숨김** (보기 유지) | 디지털/서비스 성격을 화면이 가를 수 없음 → 안전 쪽. 웹에서는 그대로 |
| 체험·만료·한도 «업그레이드» 안내, «Please pay your invoice», «Pay any overdue invoice» | **유도 문구·버튼 제거**, 상태 표시(체험 중·만료·정지)만 유지 | 4절 anti-steering — 글도 유도 |
| 손님 음식값 결제(POS·모바일·키오스크·카드단말) | **그대로** | 3절 실물 예외 · 무접촉 |
| 공급업체 발주 청구서·정산서(`invoiceCategory` 'trade'·'soa') 결제 | **그대로** | 실물 상품 |
| 브랜드 «issued» 탭(브랜드가 매장에 청구) · 공급업체 청구서 화면(결제 버튼 없음) | **그대로** | 사는 화면 아님 |
| System Admin 화면(/pos/admin/*) | **그대로** | 판매자인 우리 쪽 관리 화면 |
| 서버 API | **무변경** | 화면 정책. 웹 사용자가 같은 API 를 씀 |

청구서 결제 가능 판정은 함수 하나: `invoicePayableInApp(inv) = inv.invoiceCategory === 'trade' || inv.invoiceCategory === 'soa'`. 값이 없으면 거짓(앱에서는 닫는 쪽). `playApp.ts` 에 둔다. 화면은 `!playApp || invoicePayableInApp(inv)` 일 때만 결제 버튼을 그린다.

## 3. 막는 주소 — `utils/playApp.ts` 의 `PLAY_BLOCKED_ROUTES` (목록 한 곳)

```
/pos/brand/plans            /pos/brand/general/subscriptions      /pos/brand/payment-settings
/pos/foodcourt/plans        /pos/foodcourt/general/subscriptions  /pos/foodcourt/payment-settings
/pos/manager/plans          /pos/manager/subscriptions
/restaurant/:id/upgrade     (정규식: ^/restaurant/\d+/upgrade)
/pricing   /packages   /signup
```
`isPlayBlockedRoute(pathname)` — 접두 매칭(하위 주소 포함). 이 목록을 **두 곳이 같이 읽는다**(roleRouteDeny 와 같은 교훈 — 복사 금지):

- **메뉴 숨김**: `hooks/useAllowedRoutes.ts` — 훅 안에서 `const playApp = usePlayApp()`, `isRouteAllowed` 맨 앞(`isRouteDenied` 바로 다음, `skipFiltering` 앞)에 `if (playApp && isPlayBlockedRoute(route)) return false;`. MainLayout 이 이 훅을 쓰므로 🔒 파일을 안 건드리고 사이드바가 바뀌고, 브릿지가 늦게 붙어도 다시 그려진다.
- **직접 주소**: `components/ProtectedRoute.tsx` — 인증 확인 **바로 뒤**(정지 계정 고정·역할 튕김보다 앞)에 `if (playApp && isPlayBlockedRoute(location.pathname)) return <PlayUnavailable />;`. 대시보드로 튕기지 않고 빈 안내를 보인다(Irene ②). `AuthContext.canAccessRoute`·`ROLE_ROUTE_DENY` 에는 넣지 않는다(거긴 튕김 경로).
- 공개 3주소(`/pricing`·`/packages`·`/signup`)는 ProtectedRoute 밖이므로 `App.tsx` 에서 `<PlayGate>` 로 감싼다(`playApp` 이면 `<PlayUnavailable />`, 아니면 children 그대로). 앱에 주소창·딥링크는 없지만(Manifest 에 LAUNCHER 필터뿐) 화면 안 링크로 닿을 수 있어 닫아 둔다.

## 4. 안내 화면 — `components/Common/PlayUnavailable.tsx` (새 파일)

가운데 카드 1장: 제목 + 한 줄 + 버튼 1개(«대시보드로 돌아가기» → 역할 대시보드, 비로그인이면 `/pos`). 공용 `Button`. 아이콘·이모지·링크·«웹»·«purplehere.com»·«결제»·«문의» 글자 없음. prop `variant: 'page' | 'noPlan'`.

i18n — `common.json` 4개 언어 모두(없으면 영어로 보이는 사고 주의 — 한국어 실화면으로 확인):

| 키 | en | ko | zh | ms |
|---|---|---|---|---|
| `appUnavailable.title` | Not available in the app | 앱에서 제공하지 않는 화면입니다 | 应用内不提供此页面 | Tidak tersedia dalam aplikasi |
| `appUnavailable.body` | This page isn't available in the Purple POS app. | 이 화면은 Purple POS 앱에서 볼 수 없습니다. | 此页面无法在 Purple POS 应用中查看。 | Halaman ini tidak tersedia dalam aplikasi Purple POS. |
| `appUnavailable.noPlanTitle` | No active plan | 사용 중인 요금제가 없습니다 | 没有有效的套餐 | Tiada pelan aktif |
| `appUnavailable.noPlanBody` | This account has no active plan. | 이 계정에는 사용 중인 요금제가 없습니다. | 此账户没有有效的套餐。 | Akaun ini tiada pelan aktif. |
| `appUnavailable.suspended` | This account is suspended. Some features are unavailable. | 이 계정은 정지 상태입니다. 일부 기능을 쓸 수 없습니다. | 此账户已被暂停，部分功能无法使用。 | Akaun ini digantung. Sesetengah ciri tidak tersedia. |
| `appUnavailable.overdue` | This account has overdue invoices. | 이 계정에 기한이 지난 청구서가 있습니다. | 此账户有逾期账单。 | Akaun ini mempunyai invois tertunggak. |

버튼은 기존 `common:backToDashboard`, 로그아웃은 기존 키.

## 5. 화면별 변경 (파일 단위 · 전부 `playApp` 일 때만 갈라짐)

| 파일 | 앱에서 바뀌는 것 |
|---|---|
| `utils/playApp.ts` (신규) | §1 · §2 판정 · §3 목록 |
| `components/Common/PlayUnavailable.tsx` (신규) · `PlayGate` | §4 |
| `hooks/useAllowedRoutes.ts` | §3 메뉴 숨김 한 줄 |
| `components/ProtectedRoute.tsx` | ① §3 직접 주소 → 안내 ② **구독 없음 선점**: `playApp` 이고 역할이 BG·BM·FG·FM·Owner 이고 `!modulesLoading && !hasActiveSubscription && !userHasOwnPlan` 이면 children(MainLayout) 대신 `<PlayUnavailable variant="noPlan" />` + 로그아웃. — MainLayout:2433–2511 의 «check your invoices to activate…» · «View Invoices» 문구는 🔒 파일 하드코딩이라 못 고치므로 그 앞에서 가로챈다. 조건식은 MainLayout:2440–2444 와 같게(예외 주소 목록은 넣지 않음 — 앱에선 결제할 것이 없다). Owner 는 이 훅 호출에 id 가 필요 없고 BG/FG 는 같은 brandId/foodcourtId 를 넘기므로 같은 답이 나온다 — 구현자가 구독 없는 시험 계정으로 «웹=MainLayout 오버레이 / 앱=noPlan 안내» 를 실측 |
| `App.tsx` | `/pricing` · `/packages` · `/signup` 을 `<PlayGate>` 로 감쌈 |
| `components/PaymentStatus/PaymentStatusModals.tsx` | 앱이면 «Pay Now»·«Pay Outstanding Invoices»·«Pay Now to Restore Access» 버튼을 그리지 않고, 본문은 `appUnavailable.overdue` 한 줄(닫기 버튼만). 금액·«if not paid» 문장 제거 |
| `components/PaymentStatus/AccessBlocked.tsx` | 앱이면 «View & Pay Invoices» 버튼과 «Payment Methods» 목록을 그리지 않음. `appUnavailable.suspended` + 로그아웃만 |
| `components/Common/SuspendedBanner.tsx` | 앱이면 본문을 `appUnavailable.suspended` 로(«Pay any overdue invoice below…» 대신) |
| `pages/Profile/ProfilePage.tsx` | 앱이면 «Subscription» 탭 버튼(:772) 숨김, `?tab=subscription` 으로 와도 내용(:881) 자리에 `<PlayUnavailable />`(카드만, 페이지 틀 유지). `SubscriptionTab.tsx` 는 무변경(안 그려지므로) — 탭 안의 Change Plan·한도 문구·Go to Invoices 를 하나씩 따라다니지 않는다 |
| `pages/Restaurant/UpgradeGuidePage.tsx` | 주소 목록(§3)으로 통째 막힘 — 파일 무변경. (MainLayout 의 «잠긴» 메뉴 4곳이 이 주소로 오므로 누르면 안내 화면) |
| `pages/Restaurant/InvoicesPage.tsx` · `Owner/OwnerInvoicesPage.tsx` · `BrandGeneral/BrandInvoicesPage.tsx`(to_pay 탭) · `FoodcourtGeneral/FoodcourtInvoicesPage.tsx` · `Manager/InvoicesPage.tsx` | 앱이면 ① 행 Pay·상세 Pay Now 는 `invoicePayableInApp(inv)` 일 때만 ② Pay All 은 결제 가능한 줄만 대상으로, 0건이면 버튼 없음 ③ `SubscriptionPanel` 그리지 않음 ④ 결제 불가 청구서 상세의 결제수단·은행 안내 블록 그리지 않음. 목록·상세·PDF·상태는 그대로. 브랜드 issued 탭 무변경 |
| 대시보드: `Owner`(:628–635 배지 · :652–667 배너) · `BrandGeneral`(:741–749) · `FoodcourtGeneral`(:832–839) · `Supplier`(:350) | 앱이면 배지는 글자만(누르기 없음 · 포인터 없음), Owner 배너 «Please pay your invoice» 는 그리지 않음 |
| `Supplier` `SupplierProductsTab.tsx`(:822 · :1320) | 앱이면 «Upgrade Plan» 버튼 숨김(한도 도달 사실 문구는 유지, «upgrade» 단어 든 문장은 숨김) |
| `hooks/useSetupStatus.ts`(:410–437) | 앱이면 Owner «Activate a Subscription Plan» 항목을 목록에서 뺌(훅이라 `isPlayApp()` 동기 판정 사용 — 걸쇠 덕에 로그인 뒤엔 참) |
| `pages/Manager/RestaurantsPage.tsx`(:2077–2115 · :2322–2360) | 앱이면 «Solution Subscription» 플랜 고르기 블록을 그리지 않고, **새 매장 만들기 버튼도 숨김**(플랜을 골라 나중에 청구되는 것 = 앱 안 구독 주문). 수정 모달은 블록만 숨김 — ⚠ 블록이 없을 때 저장이 기존 플랜 값을 지우거나 기본값으로 덮지 않는지 실호출로 확인(«부분 저장이 안 보낸 칸을 덮음» 전례). 덮으면 앱에서는 그 칸을 요청에서 빼도록 |
| `pages/Manager/ManagerSubscriptionsPage.tsx` · `PlansPage.tsx` | 주소 목록으로 통째 막힘 — 파일 무변경. 고아 `/pos/manager/dashboard` 의 빠른 버튼 2개는 앱이면 숨김 |

**MainLayout 에 남는 것(🔒 무접촉 · 판단)**
- «잠긴» 메뉴 → 누르면 안내 화면. 수용.
- `/pos/supplier/invoices`(보기 전용) · «My Profile» → 탭이 숨겨져 수용.
- 푸드코트 «Plans & Payments» **빈 제목**이 남을 수 있음(절 표시가 `hasManagerPermission` 뿐). 에뮬레이터에서 실측해 보고에 사실로 적는다. 남아도 누를 것이 없어 정책 문제 아님 — 이것 하나 때문에 🔒 파일을 열지 않는다. 다음에 Irene 승인으로 MainLayout 을 여는 일이 있을 때 한 줄(`&& (isRouteAllowed…)`) 같이.
- 설계와 달리 «🔒 파일을 고쳐야만 막히는 결제 경로» 가 구현 중 나오면 **즉시 중단**하고 돌아온다.

## 6. 웹 무변경 보장

1. 구조: 모든 변경이 `playApp` 참일 때만 갈라진다. 참이 되는 길은 §1 의 셋뿐이고 일반 브라우저·윈도우 앱에서는 셋 다 생기지 않는다.
2. **변경 전 기준 뜨기(코드 고치기 전에)**: Playwright 로 8개 시험 역할(dev-login)마다 ① 사이드바 항목 글자 목록 ② 아래 «있어야 하는 것» 목록의 존재 여부를 JSON 으로 저장. 변경 후 같은 스크립트 결과가 **글자 단위로 같아야** 한다.
3. jest(`utils/__tests__/playApp.test.ts`): 신호 없음 → false · 브릿지 android → true + 걸쇠 기록 · Capacitor android → true · 브릿지 `platform:'win32'` → false + 걸쇠 안 씀 · 걸쇠만 → true · `isPlayBlockedRoute` 목록 전 항목/하위 주소/비슷한 주소(`/pos/brand/plans-x`, `/restaurant/38/upgradeX`) · `invoicePayableInApp` 6개 category + 값 없음.
4. `verify-all --full`(mount sweep) · `check-print-guard` 변경 0 · `check-design-guard` · `i18n:verify` + 한국어 실화면.

## 7. 증명 — Playwright(같은 빌드) · 에뮬레이터 · 고장주입

**7-1. Playwright «앱 흉내» 스펙** (`e2e/play-billing-hide.spec.js` · 데모 계정만 · 쓰기 없음)
`addInitScript(() => { window.__PURPLE_DESKTOP = {isDesktop:true, platform:'android'} })` 를 넣은 컨텍스트와 안 넣은 컨텍스트를 나란히:

| 확인 | 웹(안 넣음) = 있어야 | 앱(넣음) = 없어야 |
|---|---|---|
| brand·foodcourt 사이드바 Plans/Subscriptions/Payment Settings | 있음 | 없음 |
| §3 주소 12개 직접 진입(역할별) | 원래 화면 | `appUnavailable.title` · 주소 그대로(튕김 아님) |
| 프로필 Subscription 탭 · `?tab=subscription` | 탭·Change Plan 있음 | 탭 없음 · 안내 |
| 청구서 화면 4역할: 구독 청구서 Pay / SubscriptionPanel | 있음 | 없음 |
| 청구서 화면: trade 청구서 Pay | 있음 | **있음**(④ 실물 유지) |
| POS 결제 화면 열림(데모 38) | 열림 | **열림**(본기능 유지) |
| 앱 컨텍스트 전 화면 글자에 `upgrade|Pay Now|See plans|pricing|요금제 보기` | — | 0건(실물 Pay 버튼 제외) |

웹 열이 «있음» 인 것이 곧 **양성 대조**다 — 웹 열에서 못 찾으면 검사기가 고장(통과 아님). 시험 데이터가 없어 대조가 비면(예: 데모에 구독 청구서 0건) `[확인용]` 메모로 데모 매장에 만들어 두고 지우지 않는다. 3회 연속 100%.

**7-2. 에뮬레이터 실기**(디버그 APK → dev.purplehere.com · `mem-slot` 자리표 · WebView 원격 디버깅으로 주소 이동)
1. 실측: 첫 그림 시점 `window.Capacitor` 유무, `__PURPLE_DESKTOP` 가 붙는 시각, 걸쇠가 써지는지 — 숫자로 기록.
2. 앱 데이터 지운 **첫 실행**: 로그인 → 브랜드·푸드코트·매장·오너·공급업체 각 사이드바 캡처(Plans & Payments 없음 · 푸드코트 빈 제목 여부).
3. 직접 주소 12개(`location.assign`) → 안내 화면 캡처. 새로고침(걸쇠 경로)해도 결제 화면이 **깜빡 보이지 않는지**.
4. 손님 주문 1건 결제(데모 38 · 현금) 끝까지.
5. 한국어로 바꿔 안내 화면 글자 확인.
확인 못 한 항목은 «확인 못 함» 으로.

**7-3. 고장주입** (빌드 1회 규칙 — 빌드가 필요한 주입은 하지 않는다)
- jest: `isPlayApp` 을 항상 false 로 → §6-3 테스트가 떨어지는지 · `PLAY_BLOCKED_ROUTES` 에서 한 줄 빼기 → 떨어지는지 · `invoicePayableInApp` 을 항상 true 로 → 떨어지는지. (주입 → 확인 → 원복, 최종 빌드 전에 몰아서)
- Playwright(재빌드 없이): 7-1 «앱» 단언을 초기 스크립트 **없이** 돌려 전부 실패하는지(검사가 실제로 화면을 본다는 증명) · `platform:'win32'` 로 넣으면 웹과 같은지.

## 8. 순서 · 게이트

1. 기준 뜨기(§6-2) → 2. 코드 전부 + jest + jest 고장주입 → 3. SW 버전 → 4. `build:dev` 1회 → 5. `verify-all --full` + 7-1 → 6. 에뮬레이터 7-2 → 7. `check-sensitive-diff`(ProtectedRoute 를 고치므로 gate 대상으로 뜰 수 있음 — 뜨면 결과를 Fable 검증 1회로 넘긴다).
- 운영 반영: 다음 배포 때. **앱은 운영 웹을 띄우므로 Play 정식 공개 심사 요청은 운영 배포 뒤여야 한다** — 보고에 한 줄.
- 정식 공개 직전 정책 원문 재대조(Irene 지시 끝 문장)는 그때 한 번.

## 9. Irene 에게 물을 것

**막는 질문 없음.** 아래는 이 설계가 안전한 쪽으로 정한 것이고(전부 웹 배포만으로 되돌릴 수 있음) 보고에 사실로 적는다:
- 앱에서는 정지·연체 계정이 결제할 길도, «어디서 결제하라» 는 안내도 없다(지시 ②의 귀결 · 웹에서는 그대로).
- 앱에서는 브랜드·푸드코트가 매장에 보낸 로열티·플랜 청구서도 결제 버튼이 없다(보기만). **Fable 권고: 유지** — 실물 아님을 화면이 가를 수 없고 앱 사용자가 거의 없어 잃는 것이 없다. 실물 발주 청구서는 앱에서도 결제된다.
- 앱에서는 브랜드/푸드코트 매니저의 «새 매장 만들기»(플랜 고르기 포함)가 없다.
- 사이드로드 앱(Play 아님)도 똑같이 숨긴다.
