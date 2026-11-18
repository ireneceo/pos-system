# 검증 기록 — 앱 안 결제 경로 숨기기 (2026-11-18 · 작업방 19fcc2c8 · [Claude Code])

설계: `.claude/fable-design-20261118-play-billing-hide.md` · 사실: `.claude/fable-facts-20261118-play-billing-hide.md`

## 바뀐 파일 (프론트만 · 서버·DB·APK·🔒 보호파일 8개 무접촉)
- 신규: `src/utils/playApp.ts`(판별·막는 주소·청구서 판정 + 페이지 감시) · `components/Common/PlayUnavailable.tsx`(+PlayGate) · `utils/__tests__/playApp.test.ts` · `e2e/play-billing-hide.spec.js`
- 메뉴/직접 주소: `hooks/useAllowedRoutes.ts`(isRouteAllowed 한 줄) · `components/ProtectedRoute.tsx`(인증 직후 안내) · `App.tsx`(/pricing·/packages·/signup PlayGate)
- 구독 없음 선점: `components/Layout/PosLayout.tsx` — 설계는 ProtectedRoute 였으나 실측상 MainLayout(구독 없음 화면)이 PosLayout 안·ProtectedRoute 바깥이라 ProtectedRoute 로는 못 가로챔 → PosLayout(보호파일 아님)에서 같은 조건으로 선점. 앱일 때만 훅에 값을 넘겨 웹은 요청·화면 무변경.
- 결제 안내: `PaymentStatusModals.tsx` · `AccessBlocked.tsx` · `SuspendedBanner.tsx`
- 청구서 5화면: Restaurant/Owner/Brand/Foodcourt/Manager InvoicesPage — `canPayInvoiceHere(playApp, inv)` 로 Pay·Pay Now 와 handlePayInvoice 막기, SubscriptionPanel 숨김
- 그 밖: ProfilePage(구독 탭) · Owner/BG/FG/Supplier 대시보드 배지·Owner 배너 · SupplierProductsTab(Upgrade Plan) · useSetupStatus(Owner 구독 항목) · ManagerDashboard(빠른 버튼 2) · Manager RestaurantsPage(새 매장 버튼·요금제 칸 숨김 + **앱에서는 저장 요청에서 plan_type·plan_amount·billing_cycle·payment_model 을 뺌** — 서버 PUT 은 빠진 칸을 안 바꿈(restaurants-crud.js «!== undefined»))
- 번역: common `appUnavailable.*` 6키 ×4 · supplier `products.planLimitReachedApp` ×4

## 설계와 다르게 한 것 · 실측으로 알게 된 것
1. 신호 ②(window.Capacitor) — 에뮬 실측 2회: 원격 페이지에 **없음**(cap undefined). 판별은 브릿지(①)+걸쇠(③)로만 된다. 브릿지는 page load(13~17초) 뒤 붙음.
2. 첫 실행 걸쇠 — 1차 에뮬: 로그인 화면엔 훅이 없어 걸쇠 안 써짐 + 화면 훅 재확인 10초가 브릿지(13초+)보다 먼저 끝날 수 있음 → `playApp.ts` 에 «읽힌 뒤 2분까지 0.5초 감시 → 걸쇠 + ph-play-app 이벤트» 추가, usePlayApp 이 이벤트를 받음. 2차 에뮬: 로그인 화면에서 걸쇠 '1'.
3. 실제 청구서 종류가 설계 표보다 많음(개발 DB): pos_subscription · subscription · plan_upgrade · service · others · hardware(system_admin) · brand_plan · brand_royalty · brand_marketing · credit_note · trade · soa. 앱 결제는 trade·soa 만. hardware(우리가 파는 실물 기기)도 앱에선 결제 버튼 없음(안전 쪽 · 웹은 그대로).
4. 푸드코트 «Plans & Payments» 빈 제목 — 에뮬 실측: 제목 글자 없음(안 남음).

## 기계 검증 숫자
- jest playApp 24/24 · 고장주입 4종(판정 false 3실패 · 목록 한 줄 1실패 · 청구서 항상 true 3실패 · 페이지 감시 끔 1실패) 모두 잡힘 → 원복 cmp 일치
- Playwright 비교(웹 vs 앱 흉내) 5건 × 3회 연속 5/5 · 고장주입: 앱 흉내 끔 4실패/1통과 · platform win32 4실패/1통과(통과 1 = POS 열림 단언, 원래 양쪽 통과가 맞음)
- 웹 사이드바 8역할 전후(레일 클릭 펼침 전 항목 주소·글자): **글자 단위 동일**(`.claude/play-billing-baseline-web-before.json` vs `-after.json`)
- 에뮬레이터(purplepos-ci-36 · 디버그 0.4.2-dev → dev): 2차 25검사 중 24 통과, 1 = 위 1번 사실(Capacitor 없음). 사이드바 5역할 결제 메뉴 0 · 직접 주소 12개 전부 안내·주소 그대로·안내 글에 pay/web/upgrade/plan 없음 · SPA 이동 3초 16ms 관찰 결제 화면 0회 · 새로고침 첫 화면 = 안내 · 매장 청구서 구독 0/로열티 0/실물 1 · POS 계산대 열림 · 한국어 안내
- print-guard 8/8 변경 없음 · design-guard 신규 0 · i18n:verify 오류 0 · health-check 497/497 · verify-all --full: (아래)

## 확인 못 함
- 실제 손님 주문 1건 현금 결제를 앱 안에서 끝까지(설계 §7-2 4): POS 계산대가 앱에서 열리고 결제 글자가 보이는 것까지만. POS 코드는 이번에 한 줄도 안 바뀜(playApp 분기 없음).
- 실기기(태블릿) — 에뮬레이터만.
- Play 정책 원문은 요약 모델 경유로 읽음(정식 공개 직전 재대조 필요).

## Fable gate 1차 FAIL(4건) → 고침 (2026-11-18 오후)
1. 청구서 상세 은행·결제 안내 칸 — 매장 `InvoicesPage` · 오너 `OwnerInvoicesPage` · `BrandGeneral/invoices/BrandInvoiceViewModal` · `FoodcourtGeneral/invoices/FoodcourtInvoiceViewModal` 에 `canPayInvoiceHere(playApp, invoice)` 조건 추가(trade·soa 는 그대로 · PDF·인쇄 무변경). 브랜드·푸드코트 /api/invoices/to-pay 응답에 `invoiceCategory` 있음(실호출: INV-DEMO-007 pos_subscription 등).
   - e2e: 데모 청구서엔 발행자 은행 정보가 없어 웹 대조 불가 → 시험 안에서 청구서 GET 응답에 시험용 은행 정보를 끼움(DB 무변경). 매장: 웹 구독=있음/실물=있음 · 앱 구독=없음/실물=있음. 오너: 데모 오너(289) 청구서 0건 → **확인 못 함**(코드 대조만).
2. 요금제 없음 선점(PosLayout) — 요금제 없는 시험 계정이 개발 DB 에 없음(소속 없는 계정은 사용자 자체 구독 active) → 시험 안에서 allowed-routes 응답만 plan_type null 로 바꿔치기(DB 무변경). 결과: 오너 요금제 없음 = 웹 기존 오버레이 / 앱 빈 안내(No active plan · «check your invoices» 글 없음) · 요금제 있음 = 오너·브랜드·푸드코트 웹·앱 모두 안 뜸 · 브랜드·푸드코트 데모는 사용자 자체 구독 active 라 요금제 없음이어도 웹·앱 모두 안 뜸(MainLayout 조건과 같음).
3. SW 버전 6.21 → `6.22-play-billing-hide-20261118` · 빌드 1회(배포 폴더 sw 6.22 확인).
4. verify-all --full (최종 번들): 24 중 23 ✓ — mount sweep ✓(787.6s) · health-check ✓ · 인쇄 라우트 ✓ · 타입 기준선 ✓ · i18n ✓ · 보호파일 ✓. ✗ 1 = «배포 준비»(이번 배포 기록 파일 releases/2026-11-18-*.json 없음 — /개발완료·배포 준비가 채우는 칸).
- POS 계산대 e2e: 실시간 연결로 networkidle 25초 초과 1회 → domcontentloaded + 6초로 바꿈(앞선 3회는 통과).
- e2e 최종(7건: 사이드바·직접 주소 12·프로필·매장 청구서 Pay·은행 안내·요금제 없음·POS): **3회 연속 7/7** (로그 /home/irene/.claude/jobs/19fcc2c8/tmp/e2e-final{1,2,3}.log)
