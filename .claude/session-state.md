# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-24 08:40, idle 2021s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: CLAUDE.md,print-guard.manifest.json sw.js,MenuPage.tsx KdsPinGate.tsx,KitchenDisplayPage.tsx useKdsStaff.ts,KITCHEN_DISPLAY_RULES.md
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-23 (야간 thefire 실사용 셋업)
**버전:** **v3.62 + 백스테이지 다수 운영 배포**. 최종 SW=**3.99**. 스키마 dev=운영 완전일치(144=144 identical, no migration).
**작업 상태:** 완료 (배터리 부족 — /개발완료)

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

### 다음 확정 작업
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
