# Purple POS — 개발 세션 상태

### 진행 중(DEV·미배포, 2026-06-24 오전): KDS 전용 PIN 게이트 제거 → 헤더 PIN 모달 통일
> /개발시작(6/24) STALE 배너 정정: auto-save 8b82c5f1 에 narrative 없던 6/24 오전 KDS 작업이 담김. git HEAD 대조해 아래로 정정.
- **변경**: KDS 전용 직원 PIN 게이트 제거 — `KdsPinGate.tsx`·`useKdsStaff.ts` 삭제, `KitchenDisplayPage.tsx` 의 kdsStaff/kdsBody(kds_staff_id) 제거. 헤더 "Logged in" PIN 모달(`CashierPinModal`)로 직원 전환 통일(POS/FloorPlan 과 동일 방식). 모바일 메뉴 뒤로가기 탭복원 포함.
- **CLAUDE.md + docs/KITCHEN_DISPLAY_RULES.md**: 🔒 "KDS 단계 표시/이동 보호" 절대규칙 섹션 신설(2026-06-24).
- **상태**: print-guard 08:12 re-bless 8/8 통과, SW `4.00-kds-switchstaff-mobilebacktab-20260624` bump 완료. **운영 미배포**(HEAD=auto-save). 빌드/`/검증` 실행 여부 불명 → 배포 전 /검증 재실행 필요.

## 현재 작업 상태
**마지막 업데이트:** 2026-06-24 (thefire 인쇄지연 운영 진단 + 테스트주문 정리 + 다음작업 확정)
**버전:** **v3.62 + 백스테이지 다수 운영 배포**. 최종 SW=**4.00**(KDS switchstaff·미배포). 스키마 dev=운영 완전일치(144=144 identical, no migration).
**작업 상태:** 완료

### 진행 중(DEV·미배포, 2026-06-24): 서버(홀) 역할 — 결제·취소 분리 권한
- **요구(Irene)**: 서버 직원이 "결제·주문취소만 빼고 다" 가능해야. 기존 access_pos 하나가 주문+결제+취소/void 다 묶여 불가였음. 정석=권한 분리(임시조치 금지 [[feedback_always_canonical_no_stopgap]]).
- **설계**: `access_payment`(결제)·`access_void`(취소/품목void) 신설. access_pos=주문/품목추가/테이블이동/POS/인쇄. 서버=access_pos+access_serving(payment/void 없음). 하위호환 마이그(기존 access_pos 전원 +payment+void). Admin/RA/Owner는 역할로 항상 허용.
- **백엔드**: `middleware/auth.js`(requirePaymentAccess/requireVoidAccess/userCanTakePayment/userCanVoid) · `orders-payment.js`(결제→requirePaymentAccess) · `orders-crud.js`🔒(취소 게이트 userCanVoid·품목삭제 requireVoidAccess, 인쇄블록 무관) · `scripts/migrate-staff-payment-void-perms.js`(신규) · deploy 9a-2 등록.
- **프론트**: `AuthContext`(canTakePayment/canVoid) · POSTerminal(Pay Now 숨김→Pay Later primary) · LiveOrders+OrderDetailModal(결제·취소 버튼 게이트) · FloorPlan TableDetailPanel(결제/취소/품목삭제 게이트, 결제권한 없으면 Full티켓 노출) · StaffManagement/StaffPage(체크박스 2개) · i18n 4언어 · SW **4.01**.
- **검증**: 백엔드 게이트 실API **7/7**(서버 주문OK·결제403 PAYMENT_ACCESS_REQUIRED·취소403 VOID_ACCESS_REQUIRED·결제/void권한시 허용·권한복원) · build 통과(신규경고0) · health **107/107** · print-guard re-bless 8/8(게이트만, 인쇄 무관 diff 확인) · i18n 0 err · dev 마이그 12명 · 4페이지 mount crash0(pageerror0/ErrorBoundary0). **운영 배포 대기(Irene /배포)+실기기 눈확인**.
- **POS 오버레이(검정바) 안 닫힘/2줄 버그 — 수정 완료(DEV·미배포)**: 근본=닫힘이 `from=floor-plan-overlay` 쿼리파라미터 의존 → iframe 내부 navigate 시 유실 → 닫힘메시지 미발신 + iframe 안에서 floor-plan navigate되어 중첩(2줄). 수정 2건: ①POSTerminal OrderCompleteModal onClose 가 `window.parent !== window`(iframe 직접판정)로 항상 부모에 닫힘메시지+iframe 내부 navigate 금지 ②FloorPlan 메시지 리스너를 fetchStatusesRef 로 1회만 등록(소켓 재생성 때 리스너 탈부착 사이 메시지 유실 창 제거). SW **4.02**. print-guard re-bless(POSTerminal 보호파일, 인쇄 무관 확인). build 통과. 실기기 클릭 검증은 Irene.
- **LiveOrders "Proceed Without Payment"는 서버도 가능**(취소·결제 아님)로 둠.
- **미결정(Irene)**: ① 현금관리(Cash drawer/정산)는 아직 access_pos라 서버도 접근됨 — "결제 빼고 다"에 현금취급 포함할지. ② 리프레시 버튼 추가(FloorPlan/LiveOrders/KDS) — Irene 의견 대기. ③ "Live/Offline" 표시는 소켓연결 상태(이미 online/offline 표시 정상). 오프라인 큐는 별도 task#3.

### 완료된 작업 (이번 세션, 2026-06-24 — 코드 무변경 운영/조사)
- **thefire01 인쇄지연 사고 운영 진단**: "T-28 주문 3~5분 지연 후 추가주문 미출력" → 운영서버 직접조사. needs_print 누적 0(윈도우 막힘 아님), T-28(#14152)은 08:38 출력됨(8분 지연), 추가주문은 **DB에 아예 없음**(인터넷 끊김 중 생성요청 실패=오프라인 재전송 큐 부재). 근본=06:41 MySQL 재기동 + 08:32 백엔드 수동재시작 + 운영 4GB/PlanQ공유/swap946MB/buffer128MB. 인쇄코드 버그 아님. 메모리 [[reference_prod_server_resource_constraint]].
- **thefire01 테스트주문 삭제(운영)**: rid=16 지난주~지금(06-14↑) active 주문 **10건**(id 14061~14152) 백업후 하드삭제 + 자식 order_actions 69건. payments/points/reservations 0. 5월말 active 101건은 "지난주" 범위밖이라 **보존**(Irene 추가지시 시 삭제 가능). 백업 운영+dev `/var/www/backups/thefire16-{orders,orderchildren}-testdelete-2026-06-24T0909.json`.
- **6/24 오전 KDS 작업 STALE 정정**: auto-save 8b82c5f1 에 묻혀있던 KDS 전용 PIN게이트 제거→헤더 PIN모달 통일. SW 4.00 bump·print-guard 8/8. **DEV·미배포**(아래 진행중 블록).

### 오늘(6/23) 운영 배포 전체 (시간순)
1. **v3.62**(Backup 124849,SW3.95): PIN전환·시재모드(이월/고정)·마감폰트·통합티켓"Full"·로그인PIN우선·QR인쇄·QZ Win7설치.
2. **QZ Win7 자바루프**(Backup 131424): /api/qz-tray/java 프록시+.bat Step0 Java무인설치(Temurin11). POS2 설치성공.
3. **A버전감지서명+B POS1자동인쇄전담**(Backup 140943,SW3.97): QZ<2.2→SHA1(POS2 Allow해소), 다중POS중복제거. print-guard bless.
4. **모바일탭복원+서빙직원Full버튼**(Backup 144753,SW3.99): 메뉴상세→뒤로 탭유지(history.state보존), FloorPlan items 서빙직원 결제자리 큰Full버튼. 운영 lazy청크 라이브확인.
- **thefire(16)**: POS1=POS-80C, POS2=KitBar(자동OFF). PIN: POS0000/KQ1 4567/KQ2 1234/SERVER1 3456. 시재마감 테스트데이터 삭제(백업 thefire16-cash-backup-20260623.json).
- **미해결**: POS2 통합티켓 미출력 → POS1이 KitBar 못닿음. 정석=POS2 토글끄기 or POS1에 "KitBar" 이름맞추기(코드X). Irene 결정대기.

### 진행 중인 작업
- 없음 (2026-06-23 thefire 실사용 준비 묶음 7건 **운영 배포 완료**)

### ✅ 운영 배포 완료 (2026-06-23, v3.62 예정 — 버전확정 대기): thefire 실사용 준비 7건
- Backup 20260623_124849, Smoke 9/9, SW 3.95, 운영 SW/번들/헬스/QZ Win7 엔드포인트 라이브 검증.
- 7건: ①PIN 전환 수정 ②시재 개시모드(자동이월/고정) ③마감 폰트 빌·티켓 통일 ④수동 통합오더티켓 "Full" ⑤로그인 직원 PIN 우선(묶인 기기) ⑥QR Print(테이블+Quick-entry) ⑦QZ Win7 설치 수정.
- **남은 실프린터 눈확인(저위험, billPrint 무수정)**: 마감 폰트 / "Full" 통합티켓 / QR Print 종이 / 마감 2매(코드상 1매=확인).
- **POS2 후속**: 운영 배포됨 → POS2에서 설정>프린터 "Download Printer Setup" 재다운→실행(Win7용 2.1.6 설치) → 진짜 프린터 이름 선택 + 자동인쇄 ON.

### ✅ 배포됨(백스테이지, 버전무변): QZ Tray Win7 자바 루프 수정 — 정석 (2026-06-23)
- Backup 20260623_131424, Smoke 9/9. 운영 /api/qz-tray/java(x64 31MB/x86 27MB)·.bat Java단계·도메인 라이브 검증.
- **증상**: v3.62 후 POS2가 QZ 2.1.6 설치 시 "Java is required → adoptium.net OpenJDK11" 팝업 무한반복(adoptium 다운로드 Win7서 실패). QZ 2.1.x는 JRE 미내장.
- **정석 해결**: ①백엔드 `GET /api/qz-tray/java?arch=x64|x86` 프록시 — Temurin OpenJDK 11.0.21+9 JRE MSI 스트리밍. ②.bat **Step 0** — Win7/8/8.1 감지 시 Java 없으면 우리도메인서 JRE MSI 받아(certutil+TLS폴백) **msiexec /qn 무인설치**(ADDLOCAL=...,OracleJavaSoft=레지스트리)+현재세션 JAVA_HOME/PATH → **QZ보다 먼저** 깔아 루프 제거. 비트수 ARCHITECTURE/ARCHITEW6432 감지.
- **POS2 후속**: 설정>프린터 "Download Printer Setup" 재다운→실행하면 Java+QZ 자동설치. 막히면 팝업문구·비트수 확인. (Win7 실기 테스트는 Irene만 가능)

### 완료(배포됨 v3.62): QZ Tray Windows 7 설치 수정 1차 (OS감지→2.1.6, certutil)
- **증상**: POS2(thefire01)가 Windows 7이라 QZ Tray 설치 실패, 에러는 "인터넷"으로 표시.
- **원인 2가지**: ①설치 .bat가 QZ 2.2.6 받음(2.2.x=Win10+ 전용) ②.bat의 GitHub 다운로드가 `[Net.SecurityProtocolType]::Tls12` 엔진名을 Win7 구 .NET이 인식 못해 예외→"인터넷" 오표시.
- **해결**: ①백엔드 프록시 `GET /api/qz-tray/app?win7=1|arch=` 추가 — 서버(TLS1.2 정상)가 GitHub QZ 설치파일 스트리밍(win7→2.1.6+3 62MB, else→2.2.6 x86_64). ②.bat가 우리 도메인에서 **certutil(WinINet=브라우저와 같은 TLS)** 로 받음 + PowerShell 숫자TLS(3072) + bitsadmin 폴백. ③`ver|findstr 6.1/6.2/6.3` 로 Win7/8/8.1 감지→2.1.x. ④32-bit(Program Files(x86)) cert/exe 경로 보강.
- **검증**: 서버 레벨만(Win7 실기 테스트 불가) — /app 프록시 200+스트리밍(62MB/103MB), .bat 생성에 Win7로직 확인, health107/107, print-guard 8/8(qz-tray 보호파일 아님). `routes/qz-tray.js`. **운영 배포해야 POS2가 새 .bat 받음.**

### thefire 운영 셋업 안내(코드 무관)
- **POS2 인쇄 안됨 원인**: POS2 컴퓨터에 QZ Tray 미설치(전용프린터는 있음). 운영 printer_settings 확인: POS1=qztray/POS-80C/auto ON(정상), POS2=qztray/"AnyDesk Printer"(가상프린터!)/auto OFF. → POS2에 QZ Tray 설치(설정>프린터 원클릭 installer) + 진짜 프린터 이름 선택 + auto ON 필요. 설치 후 이름 주면 운영 설정 교정 예정.
- **QR/빌 라우팅**: 이미 워크스테이션 라우팅(getActiveBillPrinter). 각 디바이스 WorkstationChip에서 자기것 선택해야 분리출력. 미선택시 레거시 단일프린터 폴백.

### 완료된 작업 (2026-06-23 thefire 실사용 준비 — DEV·미배포, 배포 대기)
- **🔴 PIN 전환 회귀 수정(긴급)**: thefire01pos→FloorPlan PIN 전환(3456=SERVER1) 400 실패. 원인=CashierPinModal 이 restaurant_id 미전송 + /verify-pin 공개라우트(6/20)라 토큰만으론 req.user 없음. 수정=모달이 pos_device_restaurant 에서 restaurant_id 읽어 전송. 운영 verify-pin 16+3456→SERVER1 확인. `components/POSTerminal/CashierPinModal.tsx`. SW 3.90→3.91.
- **항목 1 시재 개시 모드 설정(자동이월/고정)**: operation_settings.cashFloat={openingMode,fixedAmount}. shift/open+shift/current 모드 분기(computeSuggestedFloat), 시작화면 pre-fill. settingsGuard 화이트리스트 등록. 검증 실API 6/6(fixed=350·carryover·guard 보존). `routes/cash-management.js`·`utils/settingsGuard.js`·`CashDrawerOps.tsx`·`Settings/SettingsPage.tsx`.
- **항목 3 thefire 시재/마감 데이터 삭제(운영)**: rid=16 shift1+recon1+movement3 백업후 삭제(잔여0). 백업 `/var/www/backups/thefire16-cash-backup-20260623.json`(운영+dev). 타 thefire(5/24/25)는 0건.
- **항목 5·6 답변**: thefire01=rid16, 서버스탭 SERVER1 PIN 3456(매장16+PIN 로그인). KQ1=4567 KQ2=1234 POS=0000. 마감 저장=CashierShift+CashReconciliation(zreport), 데일리는 미저장(실시간 계산).
- **항목 4 마감 가독성**: Z-Report(buildZReportHTML)·Daily Settlement(generateSettlementHTML) 폰트 monospace→빌/티켓과 동일 'Noto Sans KR' sans-serif. 정렬은 flex라 유지. 실프린터 종이 확인 권장.
- **수동 통합오더티켓 버튼(신규)**: FloorPlan 테이블패널에 "Full" 버튼 추가 — 전체 주문 한 장을 누른 그 포스 빌 프린터로. 🔒billPrint 무수정: exported 빌더(tagTicketWithStations/generateHTMLKitchenTicket/generateKitchenTicketContent)+printSettlementReport(bill 스코프=누른 포스) 조합. 토글 켠 포스 아닌 누른 포스로. `pages/FloorPlan/TableDetailPanel.tsx`. print-guard 8/8 유지.
- **로그인 직원 PIN 우선(신규)**: 이미 매장 묶인 기기(pos_device_restaurant 있음, 로그아웃해도 유지)면 로그인화면(/pos)이 PIN 패드를 먼저 연다(pinMode lazy-init from localStorage). 관리자 이메일 폼은 "Use email sign-in" 한 탭. 처음 1회 관리자 로그인으로 기기 묶은 뒤엔 직원이 관리자 안 거치고 PIN만. 보안: 새통로 아님(PIN 원래 한탭), 기본 저권한이라 더 안전, /verify-pin은 pinLimiter 보호. 검증: mount /pos 묶인기기→PIN패드/안묶인→이메일폼 OK(pageerror0). ⚠️로그인 라우트는 /login 아니라 **/pos**. `pages/Login/LoginPage.tsx`.
- **설정 QR Print 버튼(신규)**: 고정 QR 다운로드만 있고 Print 없던 것 추가 — ①테이블 QR(ZonesAndGroupsCard) ②Quick-entry QR(픽업/테이크아웃/예약, SettingsPage). 둘 다 기존 숨김 canvas + printTableQR(테이블 QR과 동일=이 단말 활성 빌 프린터, thermal). timeZone 전달, i18n 4언어(zonesGroups.print/printTitle). External QR은 이미 Print 보유(browser print, 미변경). `Settings/components/ZonesAndGroupsCard.tsx`·`Settings/SettingsPage.tsx`. billPrint 무수정(printTableQR import만).
- **/검증 전체 통과**: hydration0·timezone신규0·build exit0·health107/107·시재API 6/6·print-guard 8/8(billPrint 무수정 일관)·design신규0·i18n0·mount(floor-plan/settings-operations/settings-tablesQr/cash-up/pos로그인) pageerror0·QR Print버튼 3/3 렌더. SW 3.90→**3.95**. **운영 배포 대기(Irene /배포 → v3.62 예정)**.

### 완료된 작업 (이번 세션 추가, 2026-06-23 — DEV·미배포)
- **발주/재고 개선 묶음** (auto-save 2c01c798 마무리 + 검증):
  1. 입고예정(on-order) 뱃지 — 활성 발주(submitted~partial_received)의 (ordered−received)×conversion 을 ingredient별 집계해 재고 목록에 "↧ N incoming" + 가장 빠른 입고예정일. `inventory-core.js`·`Inventory/types.ts`·`Inventory/sections/StockListSection.tsx`
  2. "Add to My Stock" 양방향 등록 — 카탈로그 상품을 주문 없이 스톡아이템으로 등록(stockOnly) + 셀러 SearchableSelect·미분류 버킷·최신순 정렬. `NewPurchaseOrderPage.tsx`·`supplier-directory.js`(catalog created_at DESC)·purchaseOrders.json(4언어)
  - 검증: build exit0+dev배포(SW 현행)·on_order 실API 8/8(수식 (5-2)×3=9 정확+정리복귀)·supplier-catalog 200 서버정렬·RA/BG ingredients created_at 확인·print-guard 8/8·design 신규0·i18n 0·health 107/107. 운영 배포 대기(Irene /배포).

### 완료된 작업 (이번 세션, v3.61)
- 이메일 바운스 차단 — notificationService is_test 가드 + 데모계정 정규화 (surgical 운영배포)
- 자동프린트 Q1/Q2 — OFF→ON 옛티켓 폭주(MainLayout cutoff) + 밀릴때 미인쇄(backlog) 수정. billPrint 무수정
- 발주 같은 공급업체 합치기(merge + staging consolidate, 공급업체당 1 PO) + 아이템/PO 삭제 + 카트 영속화 + "Planned Order" 개명 + Pending POs 링크
- 외부공급업체 — 디렉토리 프라이버시 + 재료에서 선택방식 등록 + from-legacy 브리지 + WhatsApp/Email 품목목록 + ConnectSellerModal 정렬 + 품목 이름표시
- 플로어플랜 핫픽스 — 새주문 알림음 모든 주문(테이블 포함) + 헤더 반응형(≤1440 gear 수납·테마 축약)
- 스키마 정합 — 고아 컬럼 users.push_preferences 제거 → dev=운영 완전일치
- with MIN QZ 진단 티켓 168건 정리 + 응대 (운영)

### 다음 확정 작업 (Irene 확정 순서 2026-06-24: 서버분리 → 애드온 → 오프라인대응)
> 배경: 6/24 thefire 인쇄지연 사고 조사 → 운영서버(4GB, PlanQ 공유, swap 946MB 이미 사용, MySQL buffer pool 128MB) 자원 부족이 근본. 인쇄 코드 버그 아님.

1. **[1순위] 운영서버에서 PlanQ 분리** — 운영 박스(87.106.78.146)가 PlanQ(q-note 495MB + planq-backend 194MB ≈ 690MB, 재시작 110회=불안정 이웃)와 4GB RAM/2코어 공유. 분리하면 메모리 ~700MB 즉시 확보 + 불안정 제거. 후속(여유생기면): RAM 8~16GB 증설 → MySQL innodb_buffer_pool 1~2GB, 디스크 81%(여유23G) 정리, 백엔드 PM2 cluster. ⚠️ **인프라 작업 — PlanQ는 절대 건드리지 말 것 규칙 있음([[reference_planq_server]]). 분리는 Irene/인프라 협의 필요.**
2. **[2순위] 모바일오더 애드온(Add-on) 기능** — 모바일 주문을 유료 애드온 모듈로. 패턴: tier-gating 3계층([[reference_tier_gating]]: requireModule 미들웨어 + MODULE_GATED_ROUTES + hasModule UI) + 신기능 롤아웃 체크리스트([[feedback_new_feature_rollout]]: AddonModule 등록 + Plan template + sidebar + 랜딩 + FAQ + i18n). **착수 시 범위 상세(무엇을 게이트할지: 모바일메뉴 전체 vs 특정기능) Irene에게 1회 확인 필요.**
3. **[3순위] 오프라인 대응 설계 문서(`docs/`)** — 6/24 인쇄지연 사고 근본대응. 그린필드(현재 sw.js 오프라인 캐싱 의도적 미적용, 설계문서 0). 3덩어리: ①주문 오프라인 큐+재전송(IndexedDB 영속, 재연결 시 자동전송) ②서버 dedup(클라 생성 고유키로 중복주문/🔒중복인쇄 차단 — 인쇄 생명선 직결, 신중) ③미전송 상태 UX("전송대기/미전송" 표시). 설계 단계만 — 구현은 승인 후. /기능설계 급.

### 다음 확정 작업 (대기, 위 3건 이후)
- **브랜드제너럴(BG) 오퍼레이션 메뉴 동일 적용 (Irene 확정 2026-06-22)** — RA 발주·공급업체 흐름을 BG에 맞게. 상당부분 buyer-agnostic이라 이미 동작(검증 필요) + BG 재고(ProductIngredient) 화면 진입점 대응. 계획서 `docs/BG_OPERATION_MENU_PARITY.md`. 발주 전체 `docs/PURCHASE_ORDER_SYSTEM.md §H`.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **[thefire 미해결] POS2 통합티켓 미출력** — POS1이 POS2프린터 "KitBar"를 다른 로컬이름으로 잡아 못 닿음. 정석=POS2 토글끄기 or POS1에 "KitBar" 이름통일(코드X). Irene 결정 대기.
- **[thefire 확인대기] POS2 Allow 팝업** — 버전감지 SHA1 서명 배포됨(SW3.99). POS2 새로고침 후 Allow 안 뜨는지 실기기 확인. 여전하면 SHA1 가설 재조정(진단 재요청).
- **[thefire 확인대기] 실프린터 눈확인** — 마감폰트/Full티켓/QR인쇄 종이 + 자동인쇄 POS1 1장만(중복0).
- 실프린터 종이 확인 — autoprint Q1/Q2(방식코드 무변경 저위험) Z-Report·주방티켓 현장 눈확인
- 플로어플랜 새주문 소리 — 운영 실주문 + 스피커 ON 귀확인
- 브랜드공유 외부공급업체 상품 동반 + 활성/비활성 토글 (docs EXTERNAL_SUPPLIER_PRODUCTS §9-2)
- 쿠폰/외부공급업체 페이지 i18n (영어 하드코딩 → 4언어)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

### 진행 중(DEV·미배포, 2026-06-23 밤): 다중 POS 자동인쇄 중복 + QZ Allow
- **B 자동인쇄 중복(구현완료·미배포)**: POS2(QZ PC)가 두번째 폴러로 돌아 모바일/QR 주문을 POS1과 POS2가 각각 인쇄→폰트 다른 2장. 수정=두 폴러(useAutoPrintPoller·MainLayout._printPollFn)에 게이트: 워크스테이션>1 && active billPrinter.autoPrint===false 면 자동인쇄 skip. POS2(autoPrint=false)=주문입력 전용, POS1(autoPrint=true)=전담. **POS1 게이트 미작동→무변경**. 순수추가20줄. print-guard bless+8/8, health107/107, hydration0. SW 3.96. Irene 승인("메인 POS1 전담"). **배포+실프린터(POS1 1장만/POS2 안찍힘) 확인 필요.**
- **A QZ Allow(서명, 미구현)**: POS2 QZ 2.1.6 ↔ 웹앱 SDK 2.2.5 불일치로 서명 invalid→anonymous→Allow 팝업. B 적용 후엔 자동인쇄는 POS1(silent)이라 무관, POS2 **수동 빌/QR 인쇄**에만 Allow 남음. 수정안=QZ 버전감지→2.1.x엔 SHA1, 2.2.x엔 SHA512(POS1 무변경) 버전분기. 백엔드 /sign?algorithm=. 미구현.
- thefire(16) 프린터: stations KQ1=KITCHEN/KQ2=KITCHEN 2/BARPR=BAR, POS1=POS-80C(auto), POS2=KitBar(auto OFF). 둘 다 consolidatedTicket=true.

### ✅ 배포됨(백스테이지, 2026-06-23 밤): 다중 POS 자동인쇄 중복 + QZ Allow 둘 다
- Backup 20260623_140943, Smoke 9/9, SW 3.97. 운영 /sign 버전분기·번들 라이브 검증.
- **B POS1 자동인쇄 전담**: 두 폴러 게이트(ws>1 && active autoPrint=false → skip). POS2 자동인쇄 안함→중복0, POS1이 POS2 통합티켓도 KitBar로 보냄. POS1 무변경. print-guard bless.
- **A QZ 버전감지 서명**: connectQZTray 가 qz.api.getVersion()→ <2.2(Win7 2.1.x)면 SHA1, else SHA512(POS1 무변경). 백엔드 /sign?algorithm=. 서명 promise 가 _qzSignAlgo 전달. POS2 2.1.6 anonymous/Allow 해소 목적. `billPrint.js`·`qz-tray.js`.
- **POS2 테스트 필요**: 새번들 받게 새로고침 → ①모바일/QR주문: POS1만 1장씩+POS2 통합티켓 받음, 중복0 ②POS2 수동 빌/QR: Allow 없이 인쇄. 안되면 팝업문구/QZ버전 보고 → A는 SHA1 가설이라 iterate 가능.
