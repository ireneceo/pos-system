# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-09 16:15, idle 1902s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: package.json,index.html preload.js,renderer.js htmlPrinter.js,index.js updater.js,smoke-main.js
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태

### 🔴🔴 with MIN(#10) 인쇄 문제 — 정리 + 검증 상태 (2026-07-09 저녁, Irene "오늘 그만". 다음세션 여기부터)
> 📄 **전체 하루 히스토리(Fable 판단용, 정직 기록) = `docs/WITHMIN_PRINT_SAGA_2026-07-09.md`** — 증상·진단·시도·실패·검증상태·열린질문·Opus 실행실패까지 시간순 전부. Irene: "Fable이 제대로 판단 가능하게 공유, 그리고 검증할 것." **다음 실행은 Fable 지시로만.**
> ⚠ **작업 방식(Irene 확정 2026-07-09)**: Opus는 **혼자 판단해 실행 금지**. **실행 지시는 Fable에게 받아 그대로만** 수행. 라이브 추측배포·왕복·미검증 "됐다" 금지. 매장별 특별처리 금지(=표준 서비스). 대체방법(브라우저) 들이밀지 말 것 — 목표는 **네이티브 앱 자동인쇄가 제대로**.

#### A. 문제 (증상)
1. **앱 빌 = 흰 종이(백지)** — 종이는 나오는데 내용 없음.
2. **앱 오더티켓 = 내용 O, 디자인 X** (raw 텍스트로 나옴).
3. **브라우저 = 인쇄 안 됨 / 버튼 먹통 / 몇 분 지연**.
4. **앱 자동업데이트 안 됨** — 0.1.2에 갇혀 있었음(수동설치로 겨우 0.1.5).
5. (초기) 수동 오더티켓 **BAR 미인쇄** = 스테이션 프린터명 미지정(설정).

#### B. 근본원인 (Fable 분석 — 정확)
1. 앱 빌 백지 = `desktop-pos htmlPrinter.js`가 ⓐ드라이버에 **커스텀 용지크기(microns) 강제**(→cheap 드라이버 거부) + ⓑ**숨은 창이 영수증을 안 그린 채(빈 페이지) 인쇄**. 브라우저는 기본용지+보이는 창이라 정상.
2. 오더티켓 raw = text-safe 판정이라 raw 경로. htmlPrinter 고쳐야 HTML(디자인)로 낼 수 있음.
3. 브라우저 = 설정이 qztray인데 **QZ Tray 미설치** → 폴백 없어 무출력 + QZ 연결 16초 탐색×스테이션.
4. 자동업데이트 = 0.1.2가 조용히 실패(피드·박힌URL·sha512는 정상 확인됨 → 원인 미확정).

#### C. 시도 + 검증 상태 (정직: ✓검증 / ✗실패확정 / ⏳미검증)
| 조치 | 위치 | 검증 상태 |
|---|---|---|
| 브라우저 대화상자 폴백 + QZ 2.5초 컷 | **운영배포** | ✓ route-guard 34/34(코드) + **Irene 실브라우저 인쇄 됨 확인** |
| 앱 htmlPrinter 커스텀 pageSize 제거 (0.1.4/0.1.5) | feed | ✗ **실패확정** — 0.1.5 설치 후에도 빌 백지(Irene 확인). 2b만으론 부족. |
| 앱 htmlPrinter 숨은창 `showInactive`+paint대기 (0.1.6) | feed(최신) | ⏳ **미검증** — Irene 실프린터 확인 전 종료. |
| 앱 자동업데이트 "준비됨→재시작" 알림 (0.1.5 updater.js) | feed | ⏳ **미검증** — 0.1.2→0.1.5는 수동설치였음. 0.1.5→0.1.6 자동 여부 미확인. |
| 버전 배지(App.tsx 좌상단 native버전) | 운영배포 | ✓ Irene 화면서 0.1.5 보임 |
| 다운로드 버튼 버전화 / **다운로드 배너 제거** | 운영배포/cleanup진행 | ⏳ 배너제거 배포 게이트 통과 확인 중(미완) |

#### D. 남은 검증 = "제대로 됐는지" 확인 방법 (실기기로만, 코드로 "됐다" 금지)
1. **앱 빌 백지 해결?** → with MIN 앱 **0.1.6**에서 빌 인쇄 → 백지 아닌 **내용 나오면 = 숨은창 렌더수정 성공**. 여전히 백지면 → **printToPDF**(Fable 2c)로 전환. (앱 진단화면 `Ctrl+Shift+D`의 `printHtml()` 테스트로 실기기 에러 확보 가능.)
2. **자동업데이트 제대로?** → 0.1.5 앱 켜두고 electron-updater가 0.1.6 **스스로 받아 "재시작" 알림 뜨는지**. 뜨고 눌러 0.1.6 되면 성공. 안 뜨면 → **자동업데이트 근본수정이 1순위**(다운로드 버튼 아님).
3. **오더티켓 디자인?** → 위 1 성공 후, 앱이 오더티켓을 **HTML(디자인)**로 내게(웹: native→graphic). 순서: htmlPrinter 확인 먼저.
4. **BAR 개별 오더티켓?** → 스테이션에 실제 프린터명 지정(설정) 또는 통합 경로.
> 🔒 billPrint 변경분(폴백 param) bless 완료. 🔴 **미검증 blind 앱 재빌드 반복 절대 금지** — 실기기 에러/결과 받고 Fable 지시로만 고칠 것.

### 🔴 2026-07-09 오후 — with MIN 인쇄 대응 (진행중·미해결, 몇시간 왕복·Irene 격앙). 다음 세션 최우선.
> Irene가 with MIN(#10, 윈도우앱, USB POS-80, 로고영수증) 실사용서 인쇄 문제 계속 보고. **핵심 교훈: 매장별 특별처리 금지(솔루션=표준), 라이브에 추측배포 금지, Fable 체크 후 배포, 앱 자동업데이트가 사용자에게 매끄럽게(링크수동다운 금지).**
- **확정 근본원인(Fable)**: ①앱 빌백지 = `desktop-pos htmlPrinter.js`가 드라이버에 **커스텀 용지크기(microns) 강제** → 싸구려 드라이버 백지(브라우저는 드라이버 기본용지라 정상). 07-08 "드라이버가 이미지 못찍음"은 **오진**. ②앱 오더티켓=raw텍스트라 디자인없음(HTML 아님). ③브라우저 무출력·먹통 = 설정 qztray인데 QZ미설치 → 폴백없어 무출력 + QZ 16초×스테이션 반복탐색으로 몇분지연.
- **한 것(배포됨)**: 브라우저 대화상자 폴백 + **QZ 2.5초 빠른컷**(수동+웹만, 자동인쇄/QZ정상/타매장 무영향, route-guard 34/34, prod main.c74e0b1d.js). → **브라우저 인쇄는 2초만에 인쇄창 뜸=됨.** billPrint printBillViaRawBT/printKitchenTicketViaRawBT에 `allowBrowserFallback` 4th param(수동호출처만 true), printSettlementReport 무조건폴백.
- **앱(desktop-pos)**: **0.1.5 빌드·feed 스테이징됨**(prod latest.yml=0.1.5, sha512일치확인) = htmlPrinter 커스텀pageSize제거(=브라우저처럼) + **updater.js "업데이트준비됨→재시작" 알림 추가**(0.1.5부터 매끄러움). **그러나 with MIN은 아직 0.1.2**(자동업데이트가 한번도 안됨=앱 오래 안켜둬 78MB 다운로드 미완+조용해서 인지불가). 앱 feed·박힌주소 다 정상 → 앱 10분켜두고 닫았다열면 0.1.5 되어야. 안되면 0.1.2 자체버그→1회재설치.
- **버전 배지**: App.tsx에 네이티브앱 버전 좌측상단 표시(웹, 배포중) — Irene가 업데이트 됐는지 눈으로 확인용.
- **되돌린 것**: printFormat=text를 with MIN에 직접 세팅했다가 Irene "매장별처리 하지마"로 **auto로 원복**(prod DB, 나머지설정 보존확인). text=디자인버리는 다운그레이드라 오답.
- **표준 해법(Fable, 미완)**: 앱을 "브라우저처럼" 찍게=htmlPrinter수정(0.1.5), **실프린터 확인 필요**(pageSize제거로 백지 실제 해결되는지 or 드라이버 기본용지 안맞아 과피드→그럼 printToPDF 2c로). 확인후 앱이 오더티켓도 HTML로(웹변경, 순서: htmlPrinter확인 먼저). 브라우저 대화상자=비상용, 본선아님.
- **미해결/다음**: ①with MIN 0.1.5로 업데이트(또는 자동업데이트 진짜 고장인지) ②0.1.5 앱 빌 실프린터 확인(백지해결? 절단길이?) ③되면 오더티켓 HTML화 ④앱 자동업데이트 신뢰성. **Irene 극도 피로 — 왕복 최소, 확인된것만 보고, 표준으로.**

### ✅ 2026-07-09 인쇄 통일 규칙 + 빌 백지 수정 + LiveOrders Full버튼 (운영 배포 완료, Irene 종이확인 대기)
> **배포됨** (Backup 20260709_081443, 게이트 7/7·health 110/110·route-guard 34/34·스모크 9/9, 번들 main.a91d41d6.js). Fable 게이트가 **D1(text 설정이 리로드시 증발) 잡아 수정**(StoreContext 미러에 printFormat 추가) + 런타임 실증(하이드레이션 후 localStorage 잔존). print-guard bless 완료(billPrint+orders-crud). LiveOrders에 Full 오더티켓 버튼 추가(TableDetailPanel printSettlementReport 재사용, 🔒무접촉). **Irene 실물확인 대기**: with MIN 앱 설정→프린터→인쇄형식=텍스트 선택→빌 종이 나옴(백지X)·전경로 동일디자인·글자 축소 확인 + BAR는 스테이션 프린터명 지정(별개). 배포 스키마드리프트 2테이블(menu_reference_photos/recognition_logs=비전AI, 게이트기능·core무영향, 활성화시 migrate-ai-serving.js).
> Irene with MIN(#10) 네이티브앱 실사용: ①수동 오더티켓 BAR 안 나옴(Full은 됨) ②앱 빌프린트 백지 2장(디폴트/실프린터명 둘 다) ③오더티켓 앱≠브라우저 디자인 ④글자 너무 큼, 0.5~1pt 축소 ⑤"통일된 규칙+가이드, 매장별 별도처리 금지"(우린 솔루션). Fable 4라운드 원인규명 → 확정설계 → Opus 구현.
- **근본**: with MIN USB 드라이버가 이미지(HTML-pixel) 인쇄 불가 → 로고 있는 빌이 이미지 강제(`_receiptHasImage`)→백지 / 오더티켓은 raw(text-safe)라 나오지만 앱=raw·브라우저=HTML 렌더러 달라 디자인 갈림. BAR 미인쇄(별건)=프린터 이름 미지정(설정) + 웹은 피커 네이티브전용 게이팅.
- **통일 규칙(코드)**: store단위 `printerSettings.printFormat` = **auto(기본=레거시 무변경)/graphic(항상 이미지)/text(ASCII면 항상 raw, 로고→상호명 텍스트헤더=백지해결)**. 🔒`billPrint.js` `_ticketIsTextSafe`(→`_getPrintFormat`) **1곳만** 판정 → 20+ 호출처 무변경 = 절단면 최소·무회귀. CJK는 text모드여도 HTML 폴백(한글 안전).
- **글자 축소**: HTML 전 경로(공유 `PRINT_STYLES` + 주방/추가/취소 인라인) 모든 폰트 ~1pt(≈×0.9) 일괄, 비율유지. raw(앱 오더티켓)는 무변경(비율 적정).
- **설정 UI**: SettingsPage.tsx 인쇄형식 셀렉트+가이드(공용 Select/AutoSaveField, RA권한·로드게이트, additive) + i18n 4언어(`settings:printer.printFormat.*`). settingsGuard `printFormat` wipe-lock 보존.
- **검증**: print-route-guard **34/34**(신규 PRINT FORMAT 5: text+로고→raw FIX·auto+로고→image 백지재현·graphic강제·text한글→여전히image·web / 기존 29 무회귀) · health print계약 7/7 · build:dev exit0(신규경고0, 기존 POStatus부채만) · **Settings/Printer 포함 전 페이지 mount clean** · i18n:verify 0 · 배포번들에 printFormat+16px폰트 확인. 설계문서=`docs/PRINT_RULES_MATRIX.md` 🔒 신규 섹션.
- **수정파일**: `dev-frontend/src/utils/billPrint.js`(🔒), `dev-backend/utils/settingsGuard.js`, `dev-frontend/scripts/print-route-guard/{run.js,cases.js}`, `dev-frontend/src/pages/Settings/SettingsPage.tsx`, `public/locales/{en,ko,zh,ms}/settings.json`, `docs/PRINT_RULES_MATRIX.md`.
- **남은 것(코드 아님)**: ①**Fable 게이트**(🔒 billPrint 코어 diff 적대검증 — 진행) ②**Irene 실프린터 종이확인**(with MIN 인쇄형식=텍스트 선택→빌 나옴·전 경로 동일디자인·글자 작아짐, 정확히 1장) ③`check-print-guard.js --bless`(billPrint 신규지문, 종이확인 후). print-guard 현재 2건(billPrint=이번건 / orders-crud=이전 오프라인작업). **BAR 미인쇄는 인쇄형식과 별개 = 프린터 이름 지정 필요**(텍스트모드로 빌 살린 뒤 스테이션 프린터명 지정 안내).

**마지막 업데이트:** 2026-07-08 #2 (**큐 대량 구현 세션 — dev 반영·미배포, 검증 완료. 결제·리포트·구독=Fable 게이트 대기**. 데스크탑 0.1.3 + 페이지네이션 8페이지 + 매니저리포트 실집계 + 결제 자동반영 + 캐시관리 재구성 + 구독변경 배선. health 110/110·print-guard 8/8·FE빌드 exit0. 아래 ✅블록 참조.)
**버전:** 운영=배포됨(웹 다회 + 데스크탑 0.1.2). **미배포 dev: 데스크탑 0.1.3 스테이징됨 + 아래 6건.** 버전 미상승 — Irene 결정 대기.
**작업 상태:** 🎯🎯 큐 대부분 구현 완료(아래). 잔여=오프라인 편집(Fable 설계 선행)·비전AI B2(Irene 키)·user23(회사명)·버전/릴리즈노트(배포 결정).

### ✅ 2026-07-08 #2 세션 — 큐 대량 구현 (dev·미배포, 검증완료)
> Irene "다 해, 순서대로 완성도 있게" + 윈도우앱 재설치 문제 추가지시. 순서대로 6건 구현·검증. **결제·리포트·구독=돈경로→배포 전 Fable 게이트.**

1. **데스크탑앱 설치 견고화 (0.1.3)** — 재설치 시 좀비/기존 프로세스 강제종료(`build/installer.nsh` customInit taskkill + customCheckAppRunning 무팝업) + `deleteAppDataOnUninstall:false`. wine 재빌드·makensis 컴파일검증·dev 스테이징(`PurplePOS-Setup.exe`+latest.yml=0.1.3)·PwaInstallContext 0.1.3. 오늘 재설치 안 되던 근본(좀비 파일잠금) 해소. **배포하면 프로덕션 반영.**
2. **인보이스 페이지네이션** — 신규 `components/UI/Pagination.tsx`(`usePagination` 훅+숫자네비, RA스타일) → Restaurant/Owner/Manager/Admin/Brand(+Trade)/Foodcourt/SupplierTrade 8페이지 적용(클라 슬라이싱, 백엔드 무변경). 빌드 exit0.
3. **매니저 리포트 실집계 (#8)** — ManagerReportsPage Math.random·하드코딩매장·목업(고객분석/직원성과) 제거. 신규 `GET /api/manager/reports-summary`(기간·매장 실집계, revenue=completed+served). 실API 검증(매장5·매출257.8·주문7·AOV정확·시간대라벨). 소스없는 섹션 정직 제거.
4. **결제 후 자동반영 (#2, 돈=Fable)** — StripePaymentForm: confirmPayment 성공 후 paid까지 폴링(신규 읽기전용 `GET /api/invoices/:id/payment-status`, IDOR안전) 후 onSuccess. 웹훅 경합 해소. 실테스트 200/403/404. PayPal은 capture inline이라 무변경.
5. **캐시관리 재구성 (큐1)** — CashDrawerOps 운영화면 액션 클러스터 통합(캐시인/드롭/서랍열기) + Drop 라벨 + `cashDrawerAutoOpen` 설정(서랍 자동열림 매장→수동버튼 숨김). settingsGuard 화이트리스트 등록(silent-strip 함정 회피)·i18n 4언어. 검증 PASS.
6. **구독 변경/취소 배선 (#24, 돈=Fable)** — Irene "업/다운그레이드만". 백엔드: `POST /change-plan`에 `restaurant_id` 타겟분기(신규 `managerCanManageRestaurant` authz + `buildRestaurantSubscription` 추출, billing엔진 재사용) + 신규 `GET /manager/restaurant/:id/plan-options`. 프론트: ManagerSubscriptionsPage 플랜픽커 모달 배선(Change Plan/Manage), suspend=System Admin 안내. 실테스트 IDOR403·자격게이트·plan-options200.

**검증(전체):** health-check 110/110 · print-guard 8/8 무접촉 · i18n 0오류 · FE빌드 exit0(경고=기존 POStatus 부채) · 각 신규엔드포인트 실API.
**Floor Plan 헤더(큐1①):** 실측 판단=의도된 태블릿 넘침보호(flex-wrap), 0.1.3 최대화 배포본서 사라졌을 것 → **Irene 최대화 앱 눈확인 대기**(반응패치 보류).
**국가통화(#4):** UAE/Saudi(AED/SAR) dev 확인됨 → 다음 배포 편승.
**✅ Fable 게이트 PASS(2026-07-08 #2):** 돈경로 A/B/D/E(구독변경·결제·프론트·settingsGuard) PASS — IDOR 라이브403·트랜잭션 무누수·webhook 유일 paid소스·인쇄8 무접촉. **Fable 발견 버그 1건 수정·실증**: reports-summary 날짜범위 UTC자정→tz 종일경계(getDateBounds) 미정규화로 "오늘"필터 8am이후 누락 → 수정(주문6345 KL13시 단일일필터 포함 실증). +self-service 안내문구 원복. 재검증 health110/print-guard8. **→ 배포 가능(Irene /배포).**
### 🔧 오프라인 편집 A안 완전판 구현 착수 (2026-07-08 #2, Fable 설계 §15) — P0·P1 완료·검증
> Irene "정석·완벽한 완전 솔루션 구현. fable에게 확인." → Fable 설계도 `docs/OFFLINE_MODE_DESIGN.md §15`(6페이즈). Fable 검증 중 잠복결함 3건 발견.
- **P0 완료·검증**(§15-1): ①offlineSync serverId 'srv-' 해석버그(동기화 큐 영구정지 근본) 수정 ②add_items 키 items 정합 ③forceMerge 멱등봉합(orders-crud, 이중머지·이중인쇄 구멍). +offlineSync endpointFor(cancel_order→PATCH status)·_serverId strip·skipped처리·오버레이 이벤트. FE빌드 exit0.
- **P1 완료·실증**(§15-3 A·C·F·G): /status(멱등+터미널 무후퇴 게이트)·/move-table·/items op_id 멱등 + /payments settle_full. **실증**: replay 2회→1회 적용·터미널 completed→preparing skipped(주문 유지)·**인쇄블록 diff접촉 0**(순수 op_id 가드). health 1건=orders-crud 플래그(P2 실프린터 후 bless#1).
- **P0+P1 Fable 게이트 PASS**(적대검증: I2 증명·멱등 라이브14/14·인쇄무접촉확인·터미널게이트. 조건: 터미널 같은상태스킵·forceMerge meta반환→P2에 반영완료 / offlineStore 항목→P3전 / health --category=offline→P5). 별건정리: route-guard plan-options baseline(검증된 안전)·test-fable-gate.js 삭제.
- **P2🔒 코드완성·검증**(§15-3-E printedOffline: printed_at스탬프+needs_print보존[zero-ticket 방지]·B취소표스킵·C이동스킵·D forceMerge meta하드닝). 실증: 온라인 add-items 불변(needs_print켜짐·printed_at없음)·오프라인 printed_at스탬프·**print-route-guard 29/29**(온라인 인쇄 무회귀). **bless#1+#2 + Irene 실프린터 종이확인(정확히 1장)이 배포게이트** — 코드로 종이 못 봄.
- **P3 완료**(§15-5): 16 편집사이트 오프라인분기(OrderContext ①②·LiveOrders ③~⑦⑯·PaymentModal ⑧·TableDetail ⑨~⑫⑯·FloorPlan ⑫~⑮) 전부 additive·게이트(isOffline&&isOfflineMainPos) + 로컬인쇄 헬퍼 2개(printOfflineAddedItems/Notice, billPrint 재사용). 서브에이전트 4 + 직접(OrderContext).
- **P4 완료**(§15-5): offlineOverlay.ts(순수 읽기전용, overlayOrders/overlayTableStatuses) + seam①(OrdersRealtimeContext effectiveOrders+pendingOps+refetch+스냅샷 하이드레이션 재부팅생존) + seam②(FloorPlan effectiveTableStatuses) + §15-6 실패/충돌 표면화(OfflineOrdersPanel getFailedOps+dismiss). Fable P3전 조건(offlineStore markOpSyncedKeepError·set_stage passthrough·방어스킵) 완료.
- **검증**: 빌드 exit0·i18n 0오류·**print-route-guard 29/29(온라인 인쇄 무회귀)**·**mount sweep 배선페이지 크래시0**(live-orders/floor-plan/pos-terminal/cash-management)·print-guard orders-crud만(P0~P2 정식 인쇄변경).
- **P5 진행중**: Fable 최종 게이트(전체 기능 적대검증) 실행. **잔여**: __offlinePending 배지(경미)·health --category=offline·**Irene 실프린터 종이확인(정확히 1장)+bless#1#2**(코드로 불가한 유일 항목)·오프라인 E2E.

**이전 잔여:** 오프라인 편집배선=**정밀 설계 완성**(`docs/OFFLINE_MODE_DESIGN.md §14` — 실측: 큐/재생/op_id 인프라 완비, 갭=편집핸들러 오프라인분기+서버주문 낙관적오버레이. A안(오버레이) vs B안(편집비허용) Irene/Fable 결정 대기 + op_id 하드닝) · 비전AI B2(Irene 키) · user23 실회사명(Irene) · 버전상승/릴리즈노트(배포 결정).

### ✅ with MIN 인쇄 백지 긴급수정 + 데스크탑앱 0.1.2 (2026-07-08, 운영 배포, Fable PASS ×2)
> with MIN Cafe(운영 #10, USB POS-80, 윈도우 네이티브앱) 실제 티켓 전부 백지(테스트만 나옴). 근본=이미지(HTML-pixel) 인쇄가 그 드라이버서 백지, raw ESC/POS 텍스트는 정상. 단일진실 = 메모리 [[reference_print_auto_text_image_format]].

1. **인쇄 자동 텍스트/이미지 (`billPrint.js` 🔒, 디스패치 20곳)** — OS드라이버 프린터: text-safe(순수ASCII·로고없음)→raw텍스트, 한글/로고→이미지. `_asciiFold`(é→e·★→*·→→>)로 액센트/기호 fold + `_ticketIsTextSafe`=순수ASCII 게이트. **Fable D1/D2 결함(CJK만 걸러 é/★ 백지→글자깨짐 위험, with MIN 메뉴에 "Café Latte"·"★Joy Set" 24개) 발견→수정.** `print-route-guard` 29/29(액센트→raw 실증), print-guard `--bless`. 웹 배포=앱 즉시반영(재설치 불필요).
2. **데스크탑앱 0.1.2 (`desktop-pos/`)** — 좀비 수정: 메인창 닫을 때 숨은 인쇄창(`htmlPrinter._win`)까지 정리(`destroy()`+`mainWindow.closed→app.quit`+`will-quit`) → 닫고 바로 재실행(재부팅 불필요, 단일인스턴스락 좀비 해소). +0.1.1분(메뉴제거·실로고아이콘·첫실행 최대화). 자동업데이트 켜짐(latest.yml→0.1.2, `purplehere.com/desktop/` 공개). Fable PASS. **with MIN 1회 수동 재설치 필요(먼저 좀비 종료/재부팅), 이후 전부 자동.**
3. **앱 내 PWA 설치버튼/배너 숨김 (`PwaInstallContext`)** — 네이티브앱(`isNativeDesktop`)이면 canInstall=false → 사이드바 Install버튼·배너 숨김(중복 PWA=인쇄없는 함정 방지).
4. **윈도우 브라우저 Install버튼=네이티브앱 다운로드 (`PwaInstallContext`)** — promptInstall이 isWindowsDesktop면 `.exe` 다운로드(PWA 아님), DESKTOP_APP_VERSION 0.1.1→0.1.2(낡은 캐시버전 수정).

**검증:** 웹 3회 배포(스모크 9/9·게이트 7/7·health 110/110·라우트가드 29/29). 🔒MainLayout·인쇄폴러 무접촉(print-guard 8/8, PWA수정은 context 파일만).
**미결(범위밖, 아직 이미지=백지 가능):** 마감(Z)리포트 `escposContent=null` 콜러(FinalSettlementPanel/DailySettlementPrint) · `utils/consolidatedTicket.ts` 별도 미전환 경로 — 필요 시 같은 방식 이어서.
**⏳ Irene 실물확인 대기(코드로 불가):** ①with MIN 앱 새로고침→빌/오더티켓 **텍스트로 정상**(Café 등) ②0.1.2 설치→메뉴없음·아이콘정상·닫았다 바로 재실행 ③윈도우 브라우저 Install버튼→.exe 받아지는지.

### 🎯🎯 다음 세션 확정 작업 (Irene "다 해, 모든 걸 다, 다음 섹션에서" — 2026-07-07 #4)
> Irene가 이번 세션 끝에 "다 해. 모든 걸 다 하자. 그런데 다음 섹션에 할게" 지시. 아래 전부 = 다음 세션 확정 작업 큐. **/개발시작 시 이 목록으로 시작.**

1. **네이티브앱 반응형 ①②** ([[project_native_app_floorplan_cashmgmt_backlog]], Irene 오늘 후순위→이제 착수 승인). ①Floor Plan 헤더 2줄+우측정렬 안 감(★먼저 **첫실행 최대화 배포본**으로 재확인 — 앱이 작게 떠서였을 수 있음) ②Cash-up UX→"캐시관리" 재구성(캐시드로우↔오픈드로우 너무 멂, 기본=캐시드로우+드롭, 오픈드로우 자동안하는 매장 옵션).
2. **#2 결제 후 자동반영** — Stripe 결제성공 클라이언트 콜백이 **웹훅 마킹 전**에 목록 refetch→pending 보여 "안 바뀜"(새로고침해야 됨). 원인=웹훅 타이밍 경합. 수정=성공 후 paid될 때까지 폴링 or PaymentIntent 직접확인 후 즉시반영. **결제=Fable.** 위치: `StripePaymentForm`/`BrandInvoicesPage` onSuccess, `invoices-payment.js`.
3. **#6 인보이스 페이지네이션** — 12 인보이스목록 중 SupplierInvoicesPage만 있고 **11페이지 무페이지네이션**(Brand/Foodcourt/Owner/Admin/Restaurant/Manager+Trade). 공용 Pagination 컴포넌트 신설→적용. + Paid탭 기본 'month'→'All'.
4. **#7 국가·통화 배포** — UAE+Saudi(AED/SAR) dev 완료·미배포 → 다음 /배포 편승. (AED 플랜가격은 Irene 나중에 → 그때 DB `supported_countries`에 AE/SA 추가하면 랜딩 가격에도 노출.)
5. **버전 상승 + 릴리즈노트** — 방금 배포분(버튼중복제출·PayPal·최소금액·BG배지 등 사용자체감) 버전업+CHANGELOG+공지/블로그 등록.
6. **user23 "Unknown Company" DB 정리** — 운영 gitconsulting company_name=literal "Unknown Company"(코드 폴백은 이미 배포). 실회사명으로 교정 or null.
7. (이전 큐 유지) **#8 매니저리포트 가짜매출**(ManagerReportsPage Math.random)·**#24 구독변경배선**(돈,Fable)·**비전AI B2**(Vertex/Claude 키)·**오프라인 편집배선**.

### ✅ 이번 세션(2026-07-07 #4) 완료·배포 요약
- **네이티브 프린터 선택 UX**(SettingsPage, 아래 상세) + **인쇄 라우트가드**(dev-frontend/scripts/print-route-guard, 배포게이트 7/7, [[reference_print_route_guard]]) + 21루트 자동프린팅 검증.
- **버튼 중복제출 근본수정**: 공용 `Button`을 async onClick 진행중 자동비활성(동기 ref가드) → Create/Send/결제 등 전앱 중복제출 차단. 단위테스트 `Button.guard.test.tsx` 3/3(3연타→1회), mount sweep clean, `${Button}`인터폴레이션0·`as`0이라 안전. **Fable PASS.**
- 인보이스 수정: PayPal 빈공간(브랜드결제창 렌더블록)·최소금액안내(StripePaymentForm, 카드 MYR≈RM2)·캘린더 잘림(DateField dropdownPortal)·회사명 폴백·**BG/FG 좌측 인보이스배지**(badgeCounts 분기, DB검증 brand_general 7).
- **Stripe/PayPal 진단(코드무변경)**: GrabPay만 뜬 원인=**RM1 초소액**(카드 MYR 최소RM2, RM2+엔 카드 정상 — 라이브API 실증). PayPal 안뜬 건 **토글 off+sandbox**(플랫폼 payment_settings 행). 결제=주체별키(각 매장 자기 Stripe/PayPal로 손님결제 수금, 토글ON+live 필수).
- **#7 국가·통화** UAE+Saudi(dev·미배포, 8소스).
- **미결 잡무**: MEMORY.md 163줄 컴팩션 알림(비긴급).

### ✅ 네이티브앱 프린터 선택 UX (USB 다중 프린터) — 구현·검증 완료 (2026-07-07 #3, dev·미배포·**Fable 게이트 대기**)
> Irene with MIN Cafe(운영 #10) 네이티브 윈도우앱 블로커 해결. SettingsPage.tsx **단일 파일**, 🔒인쇄 protected 8파일·billPrint.js 디스패치 **무접촉**(print-guard 8/8).

**핵심 실측 결론:** 디스패치(billPrint.js)는 이미 다중 프린터 지원 — method=`qztray`+address=OS프린터명이면 그 프린터로 라우팅(`sendHTMLViaQZTray`/`sendViaQZTray` 네이티브 `printHtml/printRaw`). 근본 갭은 **설정 UI**뿐이었음(IP 먼저·드롭다운 숨김·browser=기본1개).

**구현(SettingsPage.tsx만):**
- 신규 module-scope `NativePrinterSelect`(리마운트 방지) — 프린터 하나당 드롭다운: [이 PC 기본(자동)]+[감지된 OS프린터명들]+[네트워크 IP직접]. 선택→`address` 저장, **method 규칙 = `address ? 'qztray' : 'browser'`**(★중요: qztray+빈address는 bill 2024·kitchen 2705·station 3596 전부 `if(!address)return false`라 인쇄 안 됨 → 기본프린터는 browser=printTicketHTML=OS기본으로 라우팅).
- mount 자동로드 useEffect: native면 `getQZTrayPrinters()`(listPrinters) 자동 호출, Find Printers 클릭 불필요.
- 3곳 전부 `isNativePrint` 분기: 워크스테이션 빌·주방 스테이션·단일주방. **웹은 `!isNativePrint`로 100% 현행 유지**(회귀0 검증).
- 마스터 autoPrint OFF 배너+원탭 켜기(기존 토글의 backlog-cutoff 로직 재사용), native 전용.
- i18n `printer.native.*` 7키×4언어(en/ko/zh/ms).

**검증 전부 PASS:** build:dev exit0(신규경고0, 5경고는 기존부채 타파일)·**print-guard 8/8 무접촉**·design 신규0·**health 110/110**(print8)·mount(Playwright, __NATIVE_PRINT 주입): **웹=크래시0+레거시UI유지+네이티브UI숨김 / 네이티브=크래시0+콘솔에러0+드롭다운3렌더+감지프린터(POS-80C)목록**, 정밀 leaf-probe로 native connMethod-leak=0 확증.

**남은 것:** ①**Fable 게이트**(인쇄 인접+매장 블로커 — diff 절단면 대조[SettingsPage 1파일·웹경로 무변경·method규칙 correctness]) ②Irene `/배포`(print-guard 무변경이라 bless 불필요) ③실기기 확인: MIN Cafe 네이티브앱에서 주방1/2 서로 다른 USB 지정→자동인쇄 1장씩 + 마스터 autoPrint 켜기. **⚠ 현재 세션=Opus라 Fable 검증 대상 — Fable 세션 점검 후 배포 권장.**

### ✅ 인쇄 라우트 가드 = 영구 회귀 게이트 신설 (2026-07-07 #4, Irene 지시)
> "모든 인쇄방식 자동프린팅 문제없나 실제 다 시도" → 21루트 실증 통과 → Irene "영구 회귀 게이트로 승격".
- 신규 `dev-frontend/scripts/print-route-guard/`(run.js+cases.js+qz-spy.js+README) — 진짜 billPrint.js 를 webpack 번들(qz-tray→기록스파이 alias)해 폴러 디스패치(printKitchenTicketViaRawBT/printBillViaRawBT)를 **21루트 실제 실행**, 트랜스포트 경계 관찰. 방식(browser/qztray-이름/qztray-LAN-IP/rawbt)×프린터(빌/단일주방/멀티스테이션)×native/웹×매수×비상모드×빈주소가드. 자체완결(로컬 origin서버+tmp번들, QZ/프린터/네트워크 불필요). **21/21, fail-closed 실증(고장주입→exit1, 복원→exit0).**
- **배선:** 배포 게이트 **7/7**(`deploy-to-production.sh`, 라벨 6→7 갱신, fail-closed) + `/검증` 0-c단계. 단일진실 메모리 [[reference_print_route_guard]].
- 종이 물리출력만 실기기 Irene 확인 남음(코드로 불가능한 유일 항목). print-guard 8/8 무접촉(게이트는 billPrint 읽기만).

<details><summary>원래 요구/측정 (참고)</summary>

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
> 정정: 설계의 "빈 address라도 qztray가 `if(!address)return false` 가드 충족" 은 **틀림** — bill/kitchen/station 세 경로 다 빈 address면 인쇄 안 됨. 구현서 기본프린터=browser method로 라우팅(printTicketHTML=OS기본)해 해결. 위 완료 블록 참조.
</details>


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
