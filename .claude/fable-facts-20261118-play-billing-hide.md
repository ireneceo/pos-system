# 사실 정리 — Purple POS 안드로이드 앱(Play)에서 요금제 구매 화면 숨기기 (2026-11-18 · 작업방 19fcc2c8 · [Claude Code])

## Irene 원문 (상황판 지시 그대로)
Purple POS 앱(Play 내부 테스트 시작, com.purplehere.pos.mobile)에서 요금제 구매 화면 숨기기 — 정식 공개 전 필수. 이유: 앱은 Capacitor로 https://purplehere.com/pos 를 그대로 띄움 → 웹의 «Plans & Payments»(/pos/brand/plans, 브랜드 구독 결제)가 앱 안에서도 보임. Google Play 결제 정책상 앱 안에서 디지털 서비스(구독)를 Play 결제가 아닌 수단으로 팔면 반려·정지 위험. 할 일: ① 앱으로 열렸는지 판별(Capacitor isNativePlatform 또는 User-Agent) ② 앱일 때 메뉴에서 Plans & Payments 숨기고, 그 주소로 직접 들어와도 막기(빈 안내만, «웹에서 결제하세요» 같은 유도 문구·링크 넣지 말 것) ③ 체험 만료·요금제 업그레이드 안내 팝업/버튼 등 결제로 이어지는 다른 경로도 전부 찾아 같은 처리 ④ 손님 음식값 결제(POS 본기능)는 그대로 ⑤ 실제 안드로이드 기기(또는 에뮬레이터)에서 메뉴·직접 주소 둘 다 막히는지 확인 후 보고. 웹 브라우저에서는 지금처럼 보여야 함. 정식 공개 심사 전에 Google Play 결제 정책 원문과도 대조.

## Google Play Payments 정책 원문 (support.google.com/googleplay/android-developer/answer/9858738, 2026-11-18 읽음 · 요약 모델 경유)
- 앱 내 디지털 상품·서비스 구매는 Play 결제 필수. 목록에 «cloud software and services (such as data storage services, business productivity software…)» 명시 → 우리 SaaS 구독 해당.
- 예외(3절): 실물 상품 구매/대여, 실물 서비스 구매, P2P 결제 등 → 손님 음식값·공급업체 실물 발주 청구서는 예외.
- 4절 anti-steering: «apps may not lead users to a payment method other than Google Play's billing system» — 웹뷰·버튼·링크·메시지·광고 등 모든 유도.
- B2B/엔터프라이즈 예외 문구 없음. 9절(일부 국가 대체결제 프로그램)은 등록 시에만.

## 앱 판별 (코드 실측)
- mobile-app/capacitor.config.ts: server.url = https://purplehere.com/pos (원격 웹 그대로). appId com.purplehere.pos.mobile (디버그 .dev → dev.purplehere.com).
- 앱 브릿지 nativePrintBridge.js 가 window.__PURPLE_DESKTOP = {platform:'android'} 를 **onPageLoaded 뒤** 주입 → 첫 그림에선 없음. 기존 훅 hooks/useNativeShell.ts useIsNativeShell('android') 가 10초간 0.5초 재확인(LoginPage·LandingLayout 이미 사용 — 회원가입 링크 이미 앱에서 숨김).
- window.Capacitor 는 Capacitor 런타임이 페이지에 먼저 넣음(설정 origin 한정) — 첫 그림에서도 있을 가능성(에뮬에서 확인 예정).
- 윈도우 Electron 앱도 __PURPLE_DESKTOP 를 씀(platform≠'android') — Play 아님.

## 화면 전수 조사 (Explore 에이전트 · 읽기만 · dev-frontend/src)
### 사이드바 (components/Layout/MainLayout.tsx = 🔒 인쇄 보호파일 — 편집 불가)
- 사이드바 표시는 hooks/useAllowedRoutes.ts isRouteAllowed 가 정함. 맨 앞 isRouteDenied(utils/roleRouteDeny.ts) — 같은 목록을 AuthContext.canAccessRoute(:1124, 진입 차단)도 읽음 → 한 곳에 넣으면 메뉴 숨김+진입 차단 동시. 단 진입 차단 시 ProtectedRoute 는 역할 대시보드로 튕김(빈 안내 아님).
- 브랜드 «Plans & Payments» 절(:1787–1797) = /pos/brand/plans(브랜드가 가맹점에 파는 자기 플랜 EntityPlan · /api/brands/:id/plans) · /pos/brand/general/subscriptions · /pos/brand/payment-settings(브랜드 수금 계정 설정). 각 항목·절 모두 isRouteAllowed.
- 푸드코트 같은 절(:1883–1889) /pos/foodcourt/plans · /general/subscriptions · payment-settings — 항목은 isRouteAllowed, 절 표시는 hasManagerPermission 뿐 → 항목 다 숨기면 빈 제목 남을 수 있음.
- 매장 «잠긴» 메뉴(무료 등급) → /restaurant/:id/upgrade 하드코딩 링크(:2689·:2761·:4130·:4167). 메뉴 자체는 보임.
- «My Profile»(/restaurant/:id/profile · /pos/profile) 전 역할 무조건 보임 → 구독 탭.
- 공급업체 «Plans & Payments» 항목(/pos/supplier/invoices) 무조건 보임(보기 전용 · 결제 버튼 없음).
- 구독 미보유 오버레이 MainLayout:2433–2511 «View Invoices» 버튼(:2479) · PaymentStatusModals(:2518 마운트) «Pay Now»/«Pay Outstanding Invoices» → /invoices(없는 주소) · AccessBlocked «View & Pay Invoices»(→ /invoices 없는 주소, 결제수단 목록 표시).
### 우리(플랫폼) 구독을 사고·바꾸는 곳
- pages/Profile/SubscriptionTab.tsx: Change Plan(:687) → 업/다운 확인 → POST /api/subscriptions/change-plan(:608·:636) · «Limit reached — upgrade to add more»(:747…:787) · «Go to Invoices»(:822·:1091). ProfilePage 탭 버튼은 RA·BG·FG·Owner(데모 제외)만, 내용은 ?tab=subscription 이면 역할 무관(공급업체 링크가 이걸로 옴).
- pages/Manager/ManagerSubscriptionsPage.tsx (/pos/manager/subscriptions) change-plan · pages/Manager/PlansPage.tsx (/pos/manager/plans, /api/plans 플랫폼 플랜) — 사이드바에 없음, 고아 /pos/manager/dashboard 빠른 버튼으로만.
- pages/Manager/RestaurantsPage.tsx 매장 만들 때 «Solution Subscription» 플랜 고르기(:2077–2115 · :2322–2360) — 결제는 안 함(나중 청구서).
- pages/Restaurant/UpgradeGuidePage.tsx «See plans» → /pricing → /signup·/packages.
- 공개 /pricing · /packages · /signup — 게이트 없음(LandingLayout 은 bareInApp 아니면 헤더·가입 CTA).
- 대시보드 배지: Owner(:628–635 체험/만료 → /pos/profile?tab=subscription · 배너 :652–667 «Please pay your invoice»), BG(:741–749 → 구독 탭), FG(:832–839), 매장(:649–663 표시만), 공급업체(:350 → 구독 탭 · 상품 한도 «Upgrade Plan» SupplierProductsTab :822·:1320).
- 시작 체크리스트 useSetupStatus.ts:410–437 Owner «Activate a Subscription Plan» → /pos/owner/subscriptions(없는 주소).
- SuspendedBanner 문구 «Pay any overdue invoice below…»(4 청구서 화면).
### 청구서 화면 (실물 발주 청구서와 플랫폼 구독 청구서가 한 화면에 섞임)
- 구분 칸 issuerType: 'system_admin'(=우리 플랫폼) | 'brand' | 'foodcourt' | 'supplier'. ⚠ 매퍼가 값 없으면 'system_admin' 으로 채움(Restaurant :475 · Owner :406 · services/invoiceService.ts:33). invoiceCategory 'subscription'|'service'|'consulting'|'trade'|'soa'|'others'. issuerIsExternal.
- 결제수단: brand/foodcourt 외(=supplier 포함)는 /api/admin/payment-settings(우리 게이트웨이).
- Restaurant InvoicesPage: 행 Pay/Pay All(:1317–1334) · 상세 Pay Now(:1503–1528) · HostedCheckoutLauncher(Stripe/PayPal 호스티드) · SubscriptionPanel(:1414 — 게이트웨이 정기구독 목록·결제수단 관리·해지, 운영 subscriptions 0행).
- Owner :1074–1090 Pay · :1240 Pay Now · Stripe :1491. Brand to_pay 탭 :1378–1391 Pay · Stripe/PayPal · SubscriptionPanel :1438 (issued 탭은 브랜드가 매장에 청구 — 유지). Foodcourt :1407–1414 · SubscriptionPanel :1236. Manager InvoicesPage :859 Pay Now. Supplier 청구서: 결제 버튼 없음.
- ProtectedRoute 정지 계정(suspended, 데모·SA 제외) → 역할별 청구서 화면에 고정(결제하라고).
### 그 밖 (메모리)
- 플랫폼 구독 청구는 인보이스 기반(invoiceScheduler → 건별 결제). 게이트웨이 정기구독 운영 0행. 플랜 2계통: ①PlanTemplate(우리가 파는 POS 구독) ②EntityPlan(BG/FG 가 산하 매장에 파는 플랜 — 매장이 브랜드에 내는 로열티·마케팅비 청구서).

## 기계적 제약
- MainLayout.tsx·POSTerminal·billPrint 등 인쇄 보호파일 8개 편집 불가(check-print-guard 지문).
- 웹 브라우저 동작 무변경. 운영 배포·운영 DB 쓰기 없음.
- 에뮬레이터 있음(/opt/android-sdk, AVD purplepos*, 디버그 APK 0.4.2-dev → dev.purplehere.com).
