# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-07 #2 (**운영 배포 완료** — 데스크탑앱 5이슈+빌프린트 우측잘림+**주방 자동인쇄 네이티브 무인화**(Fable PASS x3, print-guard bless). SW 4.61, Backup 20260707_082835, 게이트6/6, health110/110, 스모크9/9, desktop 0.1.1 자동업데이트 동기화. **but 매장 실사용서 근본 UX 갭 드러남 → 다음 최우선 = 네이티브앱 프린터 선택 UX(아래).**)
**버전:** 운영=**배포됨 / SW 4.61**. 이번 배포 편승분: 데스크탑앱5+빌여백+자동인쇄+비전AI TrackA/B1(신규2테이블)+하니스+인벤토리클러스터.
**작업 상태:** ✅ 배포 완료. **Irene 복귀 후 실프린터 확인:** ①빌 우측숫자 ②자동인쇄 1장. **⚠️ 다음 최우선 확정작업 = 네이티브앱 프린터 선택 UX(라이브 매장 with MIN #10 블로커, Irene "다시 파악해서 저장" 지시 2026-07-07). 아래 상세.** 그 다음 #8→#24→비전AI B2.

### 🎯🎯 다음 최우선 확정작업 — 네이티브앱 프린터 선택 UX (USB 다중 프린터) [2026-07-07, 라이브 매장 블로커]
> Irene with MIN Cafe(운영 #10) 네이티브 윈도우앱 실사용서 발견. "앱 다시 켜도 프린터 선택 없고 그냥 브라우저 출력, 어떻게 자동인쇄를 아는데? 주방 2번째는 왜 IP 넣으래? 첫번째는? 메인POS·주방1·주방2 다 다를 수 있는데." → **라이브 수정 말고 정확히 파악해 저장(Irene 지시)**. 설계 후 Fable 게이트.

**측정된 현재 상태(운영 #10, 2026-07-07):**
- `kitchenPrinter`: enabled=t, **autoPrint=FALSE**(마스터게이트 OFF — 이거만으로도 자동인쇄 꺼짐), name="", method=browser
- `billPrinter`: enabled=t, autoPrint=f, name="", method=browser
- `kitchenStationPrinters`: **2개** — "9" Kitchen(method=browser,name="") + "22" BAR(method=qztray,address="")
- workstations: Main POS(bp method=browser, name="")

**근본 UX 갭 (SettingsPage.tsx 프린터 섹션, ~7229·7305·7338·7414):**
1. **browser 방식** = 프린터 선택칸 아예 없음("OS 기본 프린터 씀" 안내만, 7414-7417). → 특정 프린터 지정 불가, 다중 프린터 구분 불가.
2. **qztray 방식** = **IP 입력칸이 먼저**(7343, monospace placeholder=IP, USB엔 부적합) + 프린터명 드롭다운은 `qzTrayPrinters.length>0`일 때만(7384, "Or pick a detected printer" 보조), 그것도 "Find Printers"(getQZTrayPrinters→네이티브 listPrinters) 눌러야 채워짐.
3. **스테이션마다 방식 달라 UI 불일치** → "주방 1번(browser)은 칸 없고 2번(qztray)은 IP 넣으래" 혼란.
4. **다중 USB 프린터**(메인POS 빌 + 주방1 + 주방2 서로 다른 물리 USB) 스테이션별 지정 경로가 사실상 없음. browser=OS기본 1개뿐, qztray=IP지향.

**이미 배포된 부분해결(2026-07-07 #2):** `printTicketHTML`(billPrint.js) — 네이티브앱에서 browser 방식이 **대화상자 대신 OS기본 프린터로 무인인쇄**. → **USB 1대를 Windows 기본으로 두면** browser 방식 스테이션 자동인쇄 동작. 단 ①마스터 autoPrint ON 필요(현재 OFF) ②다중 프린터는 OS기본 1개라 구분 못 함.

**설계(다음 세션, Fable 게이트):** 네이티브앱(`__NATIVE_PRINT`)일 때 각 프린터(빌+각 주방스테이션)에 **listPrinters()로 채운 프린터명 드롭다운을 기본 노출**(mount 자동로드, Find Printers 클릭 불필요) → 선택명을 `address`에 저장 + 방식은 명명프린터 native dispatch(qztray 경로, `if(!address)return false` 가드 충족). **IP칸은 네이티브에서 숨김/고급토글.** 방식 라벨 네이티브용 정리("프린터 선택"). 마스터 autoPrint 게이트 명확화. 검증=스테이션별 다른 USB 라우팅+자동인쇄 1장. 🔒 SettingsPage는 인쇄 인접 → 절단면 최소·Fable.


### ✅ 데스크탑앱 5이슈 + 빌프린트 우측잘림 수리 (2026-07-07, dev·미배포·Fable PASS 2회)
> Irene 매장서 윈도우 데스크탑앱(Electron `desktop-pos/`, QZ대체) 실사용 점검 중 보고한 5건 + 빌프린트 우측 숫자 잘림. 🔒인쇄 폴러 무접촉(단일창=단일폴러 유지가 설계 핵심).

**웹(dev-frontend, 즉시반영):**
- **#3/#4팝업**: 풀스크린 POS페이지(POS터미널/플로어플랜/주방/디스플레이/모바일)가 앱 안에서 **새창 대신 같은창 전환**. 새창=preload없는 창→설치배너 오표시+2번째 폴러(주방티켓중복) 위험이라 navigate-in-place가 정답. 신규 `utils/nativeDesktop.ts`(`__PURPLE_DESKTOP` 감지)+`utils/appShell.ts`(`isInAppShell`/`openSecondaryPage`). 수정: `MainLayout.tsx`(🔒, 네비만 4hunk, `_printPollFn` 무접촉) + **`RestaurantDashboard.tsx` Quick Action 타일 5개**(Fable가 잡은 결함A=로그인 착지화면, 원인지점) + `FoodcourtFloorPlanPage.tsx` 에디터버튼 + `PwaInstallContext.tsx`(감지 헬퍼화, `?v=0.1.1`).
- **결함C**(손님 디스플레이 창 설치배너): `PwaInstallBanner.tsx` `/display`·`/checkout-display` 경로 배너 억제(웹, exe 재빌드 불필요).
- **빌프린트 우측잘림**(별건, Irene 요청): `billPrint.js`(🔒전용) `PRINT_STYLES` body `padding 8px→16px`(좌우 ~2mm→~4mm 안쪽). 80mm 감열 우측 비인쇄여백 3~4mm에 가격열이 물려 잘리던 것. **여백만, 파이프라인 함수 무접촉**. 영수증+주방티켓 공통(주방 station박스 테두리도 같이 안전해짐). ⚠Fable 주의: 이 CSS는 **HTML픽셀 경로(sendHTMLViaQZTray=OS/QZ명 프린터)만** — LAN-IP raw ESC/POS(`sendViaQZTray`)는 미적용. 빌프린터가 QZ HTML프린터인지 확인.

**셸(desktop-pos, 새 설치파일 0.1.1):**
- **#1 아이콘**: 보라 그라데이션 placeholder→실제 로고(`logo512.png`). (256단일 ico, 도구부재로 멀티사이즈는 후속)
- **#2 창크기**: 첫실행 최대화(`main.js`+`windowState.js` maximized 기본힌트), 이후 마지막상태 복원.
- **#4 메뉴바**: `Menu.setApplicationMenu(null)` — File/Window 메뉴 제거(=브라우저 느낌 제거).
- **#5 업데이트**: 0.1.1 빌드+`latest.yml` 갱신, `dev-frontend-build/desktop/`에 스테이징(versioned+stable+blockmap). 이후 electron-updater 자동업데이트. 배포 스크립트가 desktop/ 를 운영 동기화.

**검증(전부 PASS):** desktop 스모크6/6·웹빌드 exit0(내파일 경고0)·print-guard=의도한 2파일(billPrint+MainLayout, `_printPollFn` diff무접촉 증명)·design 신규0·health 109/110(1=동일 print-guard 지문플래그)·**mount sweep 49/49 OK**(대시보드 포함)·**Fable 게이트**: 데스크탑델타(A/C/E) PASS + billPrint 여백 merit PASS(8→16px 물리계산 정확·과인셋 아님·주방티켓 net positive).
**남은 것(Irene):** ①`/배포`(print-guard 게이트는 승인된 인쇄변경이라 bless 또는 --skip-safety) ②데스크탑앱 0.1.1 재설치 or 자동업데이트 ③**실프린터 빌 우측 종이확인** ④확인되면 `check-print-guard.js --bless`(billPrint+MainLayout 신규기준 등록).
**미결/후속:** 데스크탑 아이콘 멀티사이즈 ico(이미지툴 필요)·park한 폴러없는 페이지(디스플레이/픽업)선 자동인쇄 정지(기존 트레이드오프, POS1은 POS터미널 주차 전제).

### ✅ AI 음식인식 서빙 Track A + Track B(B1) — 구현·검증 완료 (2026-07-06 #4, dev·미배포)
> Fable 설계 → Opus 구현 패턴. 설계 = `docs/AI_FOOD_RECOGNITION_DESIGN.md` §A(TrackA)·§B(TrackB). 🔒 인쇄 보호파일 8개 무접촉.

**Track A (사진 표시, AI 없음) — dev 반영·미배포** (auto-save 5ce25bb4 포함):
- 신규 `productImageMap.ts`·`MenuThumb.tsx`·`ItemPhotoSheet.tsx`·`MenuPhotoGallery.tsx` + FloorPlanPage/ItemListView/TableDetailPanel 썸네일 배선. 신규 API/DB 0(기존 /api/menu 재사용). 검증: mount 9/9+상호작용·print-guard8/8·health107·i18n·design bless. 실이미지 브라우저 표시는 dev 이미지데이터 없어 미캡처(표준 img+계약 검증됨, Irene 실매장 눈확인 권장).

**Track B (AI 카메라 서빙, B1=로컬 프로바이더) — dev 반영·미배포·Fable PASS**:
- 실환경 실측: **AI 프로바이더 키 0개** → B1(LocalColorProvider 색히스토그램 임베딩, 키0·비용0)/B2(Vertex, 키확보후 배선만) 분할.
- 백엔드: `migrate-ai-serving.js`(테이블2+plan id=3 seed)·모델2·`services/ai/`(4파일+ranking)·`routes/ai-serving.js`(7엔드포인트)·server.js 마운트·settingsGuard `aiServing`·health-check `--category=ai`. 서빙전이=기존 `PATCH /orders/:id/items` 재사용(무수정).
- 프론트: `AIServeCameraOverlay.tsx`(뷰파인더→촬영→recognize→모드별결과→서빙 연속) + FloorPlanPage 배선(hasModule('ai_serving') 게이트·[Serve Cam]칩) + MenuPhotoGallery RA 레퍼런스 스트립 + i18n 15키×4언어. SW 4.60.
- **검증**: jest 19/19·health-check **110/110**(ai 3)·AI 계약 실API 전경로(recognize 색매칭→top1정확·무보존·outcome)·mount(Serve Cam칩·오버레이 크래시0)·print-guard8/8·design bless·i18n0·build0.
- **Fable 게이트 PASS**: 모듈게이트(basic 403/enterprise 200)·IDOR(타매장 403/404)·무보존(디스크쓰기0·이미지컬럼0 라이브증명)·플랜마이그(멱등·id1/2 무접촉·id3 1회)·인쇄무접촉 전부 실측통과. 경미2건(i18n 2키→수정완료, AddBtn + 글리프=수용) 비차단.
- **미결(B2, Irene 결정)**: ①Vertex 키/비용($1-7/월·매장) 언제 켤지 ②Enterprise 월가 RM99(dev실측) vs RM179 정정 ③파일럿(데모→실매장) 시점. B1은 어느 것도 안 막음(로컬 무비용 동작).
- **배포**: Irene `/배포` 지시 시. (i18n 2키는 다음 build:dev 에 반영 — 현재 defaultValue 폴백.)

### ✅ 운영 배포 + 4흐름 검증 완료 (2026-07-06 #3)
- **배포**: `deploy-to-production.sh --auto` — 안전게이트 6/6 통과(인쇄보호8·인쇄필드·디자인·**IDOR가드(신규)**·health107·**하니스22/24(신규)**), DB스키마 동일(마이그0), Backup 20260706_134639, Smoke 9/9. 포함분=모바일중복주문 수리(멱등키+ER_DUP catch)+하니스 확장(order-integrity/유저스코프FK/route-guard)+deploy게이트 5→6.
- **운영 4흐름 실검증**(데모매장 id=1, 실API, 마커정리): 주문관리(생성/재조회/+Round)✓ · **멱등(동시8→1주문,500=0)✓**(배포한 수리 운영실증) · 단계이동(pending→preparing→ready→served)✓ · 결제(cash /payments completed)✓ · 프린트계약(pending-print→printed→재인쇄0,kitchen_items2)✓. health-check 106/107(1=print-guard가 운영 dev-frontend경로부재로 뜨는 아티팩트, 인쇄회귀 아님).
- **정리**: 검증 테스트주문 0(mysql FK-safe), 운영에 쌓여있던 좀비 `node -e` 33개 종료(DB연결 물던 것), 임시파일 0. 앱 정상(production-backend online, HTTP200).
- **미결**: ①버전 상승 여부(모바일중복=사용자체감 → 릴리즈노트 대상 가능, Irene 확인) ②실물 프린터 종이확인(매장, Irene 눈) — 인쇄코드 무변경이라 회귀위험은 없음.

### 진행 중인 작업 — 모바일 중복주문(2번 주문) 수정 [dev 반영·미배포]

**구현 완료 (autosave 커밋 b6ff2545에 포함, HEAD 기준):**
- `dev-frontend/src/utils/offlineOrderQueue.ts`: 카트-안정 멱등키(`getStableIdempotencyKey`/`cartSignature`/`clearStableIdempotencyKey`) + `fetchWithTimeout(20s)`
- `dev-frontend/src/mobile/pages/PaymentPage.tsx`: handlePayment서 `stableIdemKey` 계산→counter/QR-Bank/online 3경로 사용, fetch→fetchWithTimeout, 성공 시 clear, 미사용 import 제거
- `dev-backend/routes/orders-crud.js`(🔒보호파일): 재시도 catch서 ER_DUP_ENTRY→기존주문 조회 반환(동시요청 500 제거). **9줄, 인쇄 블록 무접촉 확인됨**
- P3 가독성: MobileLayout 카트뱃지=총수량(reduce), CartPage 수량 18px bold, PaymentPage 요약수량 bold

**검증 완료:**
- ✅ 동시/순차 같은키 3요청 → 주문 1개(중복0), 동시 500 사라짐 (dev 실호출, 데모매장3)
- ✅ health-check 106/107 (1=orders-crud 보호파일 감지=승인됨) · order-totals 20/20 · 빌드 클린(경고는 기존부채 타파일)
- ✅ orders-crud diff = 멱등 9줄만(16e73e1b→HEAD), pending-print/printed/print-claim/kitchen_items 무접촉

### 🎯 다음 확정 작업 — 추천 순서대로 (Irene 승인 2026-07-06, 다음 세션서 시작)
> 2026-07-06 전 영역 실측 검증 후 확정한 할일 총정리. 감사문서·메모리 낡아서 여러 항목이 "후속"으로 잘못 남아있었음(아래 정정 반영). Irene "추천 순서대로 다음 세션서 시작".

**추천 실행 순서:**
1. **[유료출시 필수] #8 매니저 리포트 가짜 매출 제거** — `ManagerReportsPage.tsx:266-267` `Math.round(baseSales*multiplier*(0.8+Math.random()*0.4))` = 새로고침마다 랜덤 매출/주문. 실주문 기반 엔드포인트로 교체(#9 `manager-sales.js` 패턴 재사용). *Opus 구현.*
2. **[유료출시 필수·돈] #24 매니저 구독 변경/취소 배선** — `ManagerSubscriptionsPage.tsx:431-441` handleUpgradePlan/ManageSubscription/SuspendSubscription 전부 "Coming Soon"뿐, 실 API 0. `pending_plan_type` 인프라 있음→매니저 액션 배선. *Opus 구현 → 돈이라 Fable 검증.*
3. **[비전AI B2] 색깔뇌→진짜AI뇌 교체** (Irene 확정 "다 붙일 거야") — 골격 완료, **파일1개+API키**만. ①Irene: Vertex(빠름0.3s) vs Claude비전(똑똑·새계정불필요) 결정+키발급 ②Opus: 프로바이더 어댑터 채우기(`services/ai/VertexEmbeddingProvider.js` 스켈레톤 있음 or 신규 ClaudeVisionProvider)+refresh-embeddings 재임베딩(반나절~1일) ③필수수정: confidence margin 캘리브레이션(색벡터 코사인과열, auto해금 전, Fable §5-⑧ 갭) ④thefire id=16 파일럿(recognition_logs 채택률). *비용 거의0(하루~16접시, 안쓰면 0원).*
4. **[마무리] 오프라인 주문 편집 배선** — `OfflineOrdersPanel` 현재 읽기전용(생성만). 백엔드 opId 가드 준비됨→add/cancel/pay/stage 편집 배선. + 모바일 dine-in 자동머지 멱등 구멍(orders-crud.js:640-693, 비차단 후속).

**미배포 dev분(다음 /배포 때 편승)**: 비전AI Track A+B1(Fable PASS) · 인스펙션 하니스 확장(Fable PASS) · 인벤토리 클러스터. 전부 working-tree(autosave)에 있음, 커밋 불필요.

### 📊 전 영역 실측 상태 (2026-07-06, 두 조사 에이전트 검증)
- **유료출시 감사**: 40건 중 **38건 완료·배포**(보안5·#9매니저매출·#31전화·인벤토리클러스터#5/6/23/35/36 전부 v3.67에 배포됨 — **감사문서·메모리가 stale해서 "후속"으로 잘못 남음, 정정필요**). 진짜 잔여=#8·#24(필수) + #38 고객분석스텁·Owner Operations Math.random(선택).
- **오프라인 모드**: 코어6단계 **운영배포 완료(v3.65)**. 잔여=오프라인주문 편집배선·실프린터 종이확인(Irene 매장)·7단계 데모.
- **안드로이드 앱**: 네이티브 플러그인 실구현+디버그APK 빌드됨(07-03 중단), **미배포**. 로드맵 최후순위. 잔여=A3 실기기검증(Irene)·V1~V4 게이트 실행·릴리즈서명APK·배포.
- **백로그(기획/미구현, 확정X)**: 매출대조마감·운영시간+라스트오더·모바일QR테이블리셋·브랜드세트그룹검증·통합티켓MASTER.

### 👥 업무 분담 (확정)
- **Irene**: 사업·우선순위·결정(AI 프로바이더/키/가격 RM179)·`/배포` 명령·현장 실물확인(프린터종이·태블릿카메라).
- **Fable**: 큰 기능 설계 + 위험영역(돈·주문·보안·신규시스템·DB마이그) 배포전 적대적 검증 + 사업 전략기획.
- **Opus**: 구현·배선·테스트·`/검증`·상태추적·문서정리. 위험영역 만지면 Fable 게이트로 올림.
- 흐름: Irene "이거 해" → (큰거면)Fable 설계 → Opus 구현 → (위험하면)Fable 검증 → Irene `/배포`.

### ✅ 인벤토리 브랜드모드 클러스터 #5/6/23/35/36 — 검증 완료 (2026-07-06, 코드 변경 0)
> Irene 지시로 착수 → **조사 결과 이미 07-04 auto-save(272075de)에 프론트·백엔드 전부 구현돼 있었음**(session-state엔 "잔여"로만 남아 미검증·미보고 상태였음). 재작업 없이 실 API로 end-to-end 증명 후 기록.
- #5 설정 404: `useSettingsModal` 브랜드 분기 → `PUT /product-ingredients/:id`(settings 필드 수용). 실 API PUT+GET 왕복 저장확인 ✅
- #6 발주 seller-sources 404: `useOrderModal` 브랜드 분기 → `GET /product-ingredients/:id/seller-sources`(200, 404 제거) + PO 전송은 `product_ingredient_id` 사용. 백엔드 purchase-orders-crud:731-757·workflow:424/758 처리확인 ✅
- #36 History 미기록: `POST /product-ingredients/:id/adjust-stock`가 InventoryTransaction 기록 → `GET /product-ingredients/transactions`(History 탭)에 노출. 실 API 재고 100→105 이동+거래행 매칭 ✅
- #23 route nav: `InventoryManager`·`TransactionHistorySection` 브랜드 경로(`/brand/product-recipe`·`/product-ingredients/transactions`) ✅(프론트)
- #35 Dismiss no-op: `useAlertResolver` 브랜드=클라 생성 alert 로컬 제거 ✅(프론트)
- **검증**: demo-brand(id=22,brand_id=10) 실 API 5/5 PASS(데이터 원복)·print-guard 8/8 무접촉·코드 변경 0. Fable 게이트 비대상(인쇄/KDS/돈·주문 무접촉).
- **배포**: 이미 main(auto-save 조상)에 포함 → 다음 배포에 자연 편승. 별도 커밋 불필요.

### ✅ 인스펙션 하니스 확장 — 돈·주문 무결성 + 유저스코프 + IDOR 가드 (2026-07-06 #2, dev 검증완료·**Fable PASS**·미배포)
> 후속후보 "하니스 추가 스위트(돈/주문·보안경계)"를 실행. Irene "다해/문제찾아/막 바꾸지 말고 문서화된 규칙 근거로". 단일진실 = 메모리 [[reference_inspection_harness]] · [[reference_idor_sweep]].

**추가/수정 파일 (dev only, 커밋/배포 안 함):**
- `dev-backend/scripts/inspection/suites/order-integrity.js` (신규): 돈·주문 무결성 6불변식 — O-INT-001 최근주문(≥2026-06-06 고정컷) 금액재구성 일치(orderTotals 공식 동형), 002 음수금액, 003 중복 idempotency_key(=모바일중복수리 계약), 004 고아결제, 005 비취소 결제합=total, 006 완료주문 품목존재(창+SEED/IMP제외 라이브게이트). **전부 현재 0.**
- `dev-backend/scripts/inspection/suites/referential.js` (수정): S-REF-006 유저 매장스코프 FK(baseline 2=삭제매장 가리키는 옛 테스트계정), S-REF-007 유저 브랜드/푸드코트/공급사 스코프 FK(0 라이브).
- `dev-backend/scripts/check-route-guard.js` (신규): IDOR(cross-tenant) 정적 가드 — `/restaurant/:param` 무방비 라우트를 print/design-guard 모델(baseline)로 상시화. 인라인검사(req.user.restaurant_id 비교/ensureRestaurant) 감지로 오탐0. **현재 무방비 0.**
- `dev-backend/scripts/inspection/baseline.json`: baseline 2건(R-SC-006, S-REF-006).
- `deploy-to-production.sh`: 안전게이트 **5→6개**(route-guard 4/6 추가, 전부 fail-closed).
- 메모리 3건 갱신(reference_inspection_harness, reference_idor_sweep).

**검증:** 하니스 22/24(신규0·exit0)·order-integrity 6/6·route-guard 무방비0(주입 exit1 실증)·print-guard **8/8 무접촉**·deploy 문법OK. 각 불변식 위반주입→감지→정리 실증.

**Fable 게이트: CONDITIONAL→PASS.** 1차서 **치명 B-1 발견**(route-guard `--summary`가 판정 건너뛰고 exit0=게이트 fail-open, 취약라우트 감지하고도 배포통과). 수정(판정 항상실행)+주입으로 fail-closed 실증→**PASS**. 부수수정: B-3 주석-only false-SAFE 차단(V4 보너스 닫힘), B-2 스코프한계 문서화, O-INT-006 baseline뮤트→라이브게이트화. 잔여 비차단: B-3 우측관용구 false-fail(안전방향·현코드 무영향), O-INT-001 subtotal-NULL 블라인드(Fable 수용동의).

**미결(선택):** 삭제매장 가리키는 옛 RA 테스트계정 2건(irenetest001→r20, reprox→r176) 정리는 유저계정 건드림이라 Irene 지시 대기. route-guard 정규식 우측관용구 양방향 확장(선택). 이 하니스 확장분은 다음 배포에 자연 편승(별도 커밋 불필요, working-tree 배포).

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님.

- 설정 operations 레이아웃: `SettingsGrid`에 `align-items:start`+`grid-auto-flow:dense` 적용(dev 반영). Irene 확인 대기 — 홀수/전폭 경계 빈칸 남으면 operations만 masonry(CSS columns, 전폭=column-span:all) 에스컬레이션. SettingsGrid 13곳 공유·전폭카드 12개라 전면변경은 눈검증 후.
- `dev-frontend/scripts/ui-layout-sweep.js`: UI 반응형/레이아웃 스위트 — 헤드리스가 무거운 라이브 설정페이지 로드서 hang. 재접근: **localhost 빌드 대상 로드** 또는 더 가벼운 대기/평가.
- ~~인스펙션 하니스 추가 스위트(돈/주문 무결성·보안경계 도메인)~~ → **✅ 2026-07-06 #2 완료**(위 참조: order-integrity 스위트 + 유저스코프 FK + IDOR route-guard, Fable PASS). 보안경계 라우트계층은 health-check가 이미 커버라 DB불변식 대신 IDOR 정적가드만 추가. R-SC-006 dev 미분류 정리(선택)는 잔여.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
