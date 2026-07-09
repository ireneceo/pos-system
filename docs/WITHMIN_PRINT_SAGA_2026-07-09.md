# with MIN(#10) 인쇄 문제 — 2026-07-09 전체 히스토리 (Fable 판단용, 정직 기록)

> 목적: 하루 종일 발생한 문제·진단·시도·실패를 **빠짐없이·시간순**으로 남겨 Fable가 다음 실행을 제대로 지시할 수 있게 함. Irene 지시(2026-07-09): "오늘 문제 히스토리 다 저장, Fable가 판단 가능하게 공유, 그리고 검증할 것."
>
> ⚠ **작업 방식(확정)**: Opus는 혼자 판단해 실행 금지. **실행 지시는 Fable에게 받아 그대로만.** 라이브 추측배포·왕복·미검증 "됐다" 금지. 매장별 특별처리 금지(표준 서비스). 브라우저 같은 대체방법을 정답인 양 들이밀지 말 것 — 목표는 **네이티브 앱 자동인쇄가 제대로 되는 것**.

---

## 0. 매장 환경 (with MIN Cafe, restaurant_id=10)
- 윈도우 PC + **네이티브 데스크탑 앱**(Electron `desktop-pos/`, QZ Tray 대체용) + **USB POS-80 감열 프린터** + **로고 있는 영수증**.
- 운영 `printer_settings`(실측): billPrinter/kitchenStation(9,22)/workstation 대부분 **method=qztray, address=POS-80**, `printFormat=auto`, `receiptLogo` 있음. **QZ Tray는 미설치.**
- 메뉴는 영문(라틴). 프린터/OS 설정은 정상(**브라우저 인쇄가 디자인 제대로 나오는 것으로 증명됨**).

---

## 1. 시간순 히스토리

### (1) 최초 보고 — 수동 오더티켓 BAR 미인쇄 + LiveOrders Full 버튼 요청
- 증상: 라이브오더/플로어플랜에서 **수동 "오더티켓" 버튼** 누르면 **주방1만 나오고 BAR 안 나옴**. "Full"은 다 나옴. + LiveOrders 리스트에도 Full 오더티켓 아이콘 원함.
- **Fable 진단**: BAR 미인쇄 = **스테이션에 실제 프린터명 미지정**(qztray+빈주소 가드로 조용히 skip / 현재는 browser+빈값이라 기본프린터 1대로만). 코드 아님, 설정 문제. Full은 스테이션 라우팅 안 타고 빌 프린터로 1장이라 됨.
- 조치: **LiveOrders에 Full 오더티켓 버튼 추가**(`LiveOrdersPage.tsx`, TableDetailPanel의 `printSettlementReport` 재사용, 🔒 billPrint 무접촉).

### (2) 인쇄 통일 규칙(printFormat) + 폰트 축소 — 운영 배포(08:14)
- Irene 요구: 모든 경로 같은 디자인 + 글자 0.5~1pt 축소.
- 구현: store단위 `printerSettings.printFormat`(auto/graphic/text) — billPrint `_ticketIsTextSafe`/`_getPrintFormat` 1곳 판정, 20+ 호출처 무변경. HTML 폰트 ≈×0.9 축소. settingsGuard 보존. SettingsPage UI + i18n.
- **Fable 게이트가 D1 결함 발견·수정**: printFormat이 StoreContext 하이드레이션에서 미러 누락 → 리로드 시 auto로 증발. StoreContext에 printFormat 미러 추가로 수정 + 런타임 실증.
- 배포됨(Backup 20260709_081443, 게이트 7/7, route-guard 34/34, 스모크 9/9, main.a91d41d6.js). **이 시점의 "통일/축소"는 실프린터 미확인.**

### (3) Irene 네이티브 앱 실사용 → 새 증상
- **앱 빌 = 흰 종이(백지) 2장.** 오더티켓 = **내용 나오나 디자인 이상(raw 텍스트)**. "왜 윈도우앱만 다르냐."
- **Fable 진단(2차)**: 빌은 로고 때문에 이미지(HTML-pixel) 경로 강제(`_receiptHasImage`) → 앱 `htmlPrinter`가 백지. 오더티켓은 로고無·ASCII → text-safe → raw. **2026-07-08 "cheap 드라이버가 이미지 못 찍음" 결론은 오진**(프린터는 브라우저로는 디자인 정상 = 이미지 가능).
- **Opus 실수①**: `printFormat=text`를 with MIN에 **직접 세팅**(운영 DB) → Irene "매장별 특별처리 하지마" → **원복(auto)**. text=디자인 버리는 다운그레이드라 오답.

### (4) 앱 htmlPrinter 1차 수정 (0.1.4/0.1.5) — pageSize 제거
- **Fable 근본원인**: `htmlPrinter.doPrint`가 **커스텀 microns pageSize(측정 콘텐츠높이) 강제** → cheap POS-80 드라이버가 거부해 백지. 브라우저는 드라이버 기본 용지라 정상.
- 조치: 커스텀 pageSize + 높이측정 **제거**(2b) + 이미지 decode 대기. → 0.1.4 빌드, 이어서 updater 알림 추가하며 0.1.5로.
- **Fable 경고(중요)**: 2b는 "실측 전 채택 금지" — 드라이버 기본용지가 롤이 아니면(A4) 과피드/백지 가능. 브라우저가 되는 건 대화상자서 사용자가 롤을 고르기 때문일 수 있음.
- **Opus 실수②**: 경고에도 미검증 0.1.4/0.1.5를 본선처럼 밀었고, **자동업데이트가 안 돼 앱에 도달도 안 함**.

### (5) 브라우저 무출력·먹통·지연
- 증상: 일반 브라우저(QZ 미설치)에서 **아무것도 안 나옴, 버튼 먹통, (수동) 인쇄창 몇 분 뒤 뜸**.
- **Fable 진단(3차)**: 설정 qztray인데 QZ 미설치 → `sendViaQZTray/sendHTMLViaQZTray` false, **대화상자 폴백 없음** → 무출력. + `connectQZTray` 재시도로 **~16초 매달림**(스테이션마다 반복→몇 분) + 공용 Button async가드로 버튼 잠김.
- 조치(운영 배포): billPrint에 **브라우저 인쇄창 폴백**(qztray 실패+수동+웹이면 `printTicketHTML`/`printHTMLContent`) + **QZ 2.5초 빠른 컷**(수동+웹 한정). `allowBrowserFallback` 4th param(수동 호출처만 true, 폴러/자동인쇄 무영향). **route-guard 34/34, Fable 게이트 통과(무회귀).**
- 결과: **브라우저 인쇄 = 됨(Irene 실사용 확인).** 단 Fable·Irene 모두 "브라우저 대화상자는 비상용이지 본선(앱 자동인쇄)이 아님".
- **Opus 실수③**: Irene가 급하다고 대체방법 요청한 적 없는데 브라우저를 자꾸 정답처럼 들이밈.

### (6) 앱 자동업데이트 지옥 + 0.1.5→여전히 백지
- with MIN **0.1.2에 갇힘**(자동업데이트가 **한 번도 안 됨**). 피드·박힌 URL(`https://purplehere.com/desktop/`)·latest.yml sha512 **다 정상 확인**했는데도 0.1.2 그대로. 원인 미확정(조용한 다운로드 + 앱 오래 안 켜둠 추정).
- Irene가 **수동 설치로 0.1.5** → **빌 여전히 백지** = **2b(pageSize 제거)만으론 실패 확정.**
- **Fable 전략 재판단**: 접근이 반은 틀림. 앱(native)이 본선, method 무의미(native가 가로챔). 빌 백지 진짜 원인 후보에 **숨은 창 미렌더** 추가. 자동업데이트를 매끄럽게(알림+설치) 만들 것. 브라우저는 비상용.

### (7) 앱 0.1.6 — 숨은 창 렌더 수정 (미검증)
- **원인 재특정**(Irene "왜 인쇄 자체가 안 나오는데" → 명확화): 프린터는 정상(종이 나옴), **빈 페이지를 인쇄**하는 것. 앱은 영수증을 **숨은 창(show:false)에서 그림 → 안 그린 채 인쇄 → 흰 종이.** 브라우저는 보이는 창이라 정상.
- 조치(0.1.6): `htmlPrinter` 숨은 창을 **화면 밖(-32000)에서 `showInactive`로 표시 + `paintWhenInitiallyHidden` + requestAnimationFrame 2회 대기** → 실제 paint 후 인쇄. feed 스테이징(0.1.6 최신).
- **미검증** — Irene 실프린터 확인 전 "그만".

### (8) 자동업데이트 UX + 배지 + 배너 (혼란)
- `updater.js`: "업데이트 준비됨 → 지금 재시작" 알림 추가(0.1.5부터). 30분 재확인.
- App.tsx **버전 배지**(좌상단 native 앱버전) — Irene 화면서 0.1.5 확인됨(웹은 앱에 도달함 증명).
- 다운로드 버튼 버전화(`PurplePOS-Setup-<v>.exe`) + **인앱 업데이트 배너** 추가 → **Opus 실수④**: 배너가 **수동 다운로드**를 시킴(자동업데이트 아님). Irene "그냥 자동 업데이트 시켜줘야지" → **배너 제거(cleanup 배포)**. 또 캐시로 버튼이 0.1.5 받는 혼란.

---

## 2. 근본원인 (Fable 확정)
1. **앱 빌 백지** = htmlPrinter가 ⓐ커스텀 용지크기 강제(→cheap 드라이버 거부) + ⓑ**숨은 창 미렌더(빈 페이지 인쇄)**. (ⓐ는 0.1.4/0.1.5서 제거했으나 0.1.5서도 백지 → ⓑ가 주범 유력. 0.1.6서 ⓑ 수정, **미검증**.)
2. **앱 오더티켓 raw** = text-safe 판정이라 raw 경로. htmlPrinter 고쳐진 뒤 HTML(graphic)로 내야 디자인.
3. **브라우저 무출력·먹통** = qztray 설정+QZ 미설치 → 폴백 없음 + 16초 탐색. (폴백+2.5초컷으로 **해결·배포됨**.)
4. **앱 자동업데이트 실패** = 0.1.2 조용히 실패, 원인 **미확정**(피드/URL/sha512 정상).

---

## 3. 검증 상태 (정직: ✓검증 / ✗실패확정 / ⏳미검증)
| 조치 | 위치 | 검증 |
|---|---|---|
| 브라우저 대화상자 폴백 + QZ 2.5초 컷 | 운영배포 | ✓ route-guard 34/34 + **Irene 실브라우저 인쇄 됨** |
| LiveOrders Full 버튼 | 운영배포 | ⏳ 실사용 미확인(코드·mount만) |
| printFormat(통일)+폰트축소 | 운영배포 | ⏳ 실프린터 미확인 |
| 앱 pageSize 제거 (0.1.4/0.1.5) | feed | ✗ **실패확정**(0.1.5 설치 후 빌 백지) |
| 앱 숨은창 렌더수정 (0.1.6) | feed(최신) | ⏳ **미검증**(핵심) |
| 앱 자동업데이트 알림(0.1.5 updater) | feed | ⏳ **미검증**(0.1.2→0.1.5 수동설치였음) |
| 버전 배지 | 운영배포 | ✓ Irene 0.1.5 보임 |
| 다운로드 배너 제거 | cleanup 배포 | ⏳ 게이트 통과 확인 중 |

---

## 4. 남은 검증 = "제대로 됐는지" (실기기로만 — 코드로 "됐다" 금지)
1. **앱 빌 백지 해결?** — with MIN 앱 **0.1.6**에서 빌 인쇄 → 백지 아닌 **내용 나오면 = 숨은창 렌더수정 성공**. 여전히 백지면 → **printToPDF**(Fable 2c). **진단 화면 `Ctrl+Shift+D`의 `printHtml()` 테스트로 실기기 에러/결과 확보 가능** — blind 재빌드 대신 이걸로 원인 확정.
2. **자동업데이트 제대로?** — 0.1.5 앱 켜두고 electron-updater가 0.1.6 **스스로 받아 "재시작" 알림 뜨는지**. 안 뜨면 → **자동업데이트 근본수정이 1순위**(다운로드 버튼 아님). 0.1.2가 왜 안 됐는지도 규명 필요.
3. **오더티켓 디자인?** — 위 1 성공 후 앱이 오더티켓을 **HTML(graphic)**로. 순서: htmlPrinter 확인 먼저.
4. **BAR 개별 오더티켓?** — 스테이션 실제 프린터명 지정(설정) 또는 통합 경로.

---

## 5. Fable 판단 필요 (열린 질문)
1. **0.1.6 숨은창 렌더수정이 정답인가, 아니면 처음부터 printToPDF(2c)로 갈 것인가?** (blind 반복 방지 — 진단화면 결과 우선 받을지.)
2. **앱 자동업데이트 근본**: 0.1.2가 왜 안 됐나(electron-updater generic provider + unsigned NSIS의 알려진 이슈?). 사용자에게 매끄러운 표준 auto-update의 정답 설계.
3. **오더티켓/빌 디자인 통일**: 앱이 HTML로 낼 때 순서·조건(native면 항상 graphic?).
4. printFormat/폰트축소 등 (2) 배포분이 실프린터에서 문제 없는지 검증 계획.

## 5.5 Fable 개발검증 + 0.1.7 (2026-07-09 오후, Fable 직접 수행)

**열린 질문 1 (숨은창 vs printToPDF) 판정: 숨은창 유지가 정답.**
- 근거(실측): 이 서버에서 Xvfb + 실제 Electron으로 smoke-main.js 실행 → 0.1.6 htmlPrinter 파이프라인이 CUPS PDF 프린터로 **실내용(한글 포함) 인쇄 성공** — 출력 PDF를 pdftotext로 검사, 백지 아님. 렌더 파이프라인 자체는 건강함을 실출력물로 증명(단, Windows POS-80 드라이버 leg는 실기기만 증명 가능 → ⏳).
- printToPDF로 "인쇄"하는 전환은 오히려 무거움: Windows에서 PDF를 무소음 인쇄할 표준 수단이 없음(SumatraPDF 동봉 필요). **드라이버 raster가 범인으로 확정될 때만 플랜B.**
- 그 판정을 종이 없이 하도록 **0.1.7에 진단 Render check 추가**: 진단화면(Ctrl+Shift+D)에 "Render check (PDF, no paper)" 버튼 — 실제 빌과 동일한 숨은창 파이프라인으로 렌더 후 PDF 저장+화면에 자동 오픈. PDF에 내용 있는데 종이가 백지면 = 드라이버 raster 문제(플랜B), PDF도 비면 = 렌더 문제.

**0.1.6 코드 실측에서 발견·수정한 결함 (→ 0.1.7):**
1. `showInactive()`된 숨은창이 `skipTaskbar`/`focusable` 미설정 → 첫 인쇄 후 **Windows 작업표시줄/Alt-Tab에 유령 "Purple POS" 영구 노출**. → `skipTaskbar:true, focusable:false` 추가.
2. 업데이트 재시작 프롬프트가 30분 재확인마다 재출현(electron-updater가 캐시 다운로드에 update-downloaded 재발화) → **버전당 1회만 프롬프트**, 이후는 종료 시 자동설치.
3. updater 이벤트가 console에만 → 패키지 앱에서 증거 0 (0.1.2 규명 불가의 원인) → **`<userData>/updater.log` 파일 로그** 추가(체크/available/downloaded/error 전부).

**자동업데이트 0.1.2 실패 근본원인 (규명 완료):**
- 0.1.2 updater = **시작 시 1회만 체크, 재확인 없음, UI 없음** (git fe86f384 실측). 타임라인: 0.1.2 설치=7/8(피드도 0.1.2=정상 무동작) → 0.1.3+는 7/8 오후~7/9 영업 중 발행 → 종일 켜두는 POS는 **발행 시점 이후 재체크가 없어 영영 못 봄**. 재시작 타이밍이 맞아도 78MB 조용한 다운로드+종료시 설치라 사용자에겐 아무것도 안 보임. **피드/URL/sha512는 무결(실측: prod latest.yml·exe·blockmap·app-update.yml 전부 정상).**
- 0.1.5+에서 이미 표준 설계로 수정됨(30분 재확인 + 다운로드 완료 시 "지금 재시작" 프롬프트 + 종료 시 자동설치). 0.1.5→0.1.7 자동업데이트가 성공하면 이 규명이 실증됨.

**개발검증 결과**: print-units 6/6 ✓ / 실Electron smoke 9/9 ✓ (printHtml 실출력 내용검사 + renderCheck PDF 233KB 내용검사 + PRINTER_NOT_FOUND 계약) / 전 변경파일 syntax ✓ / 웹 🔒 인쇄 보호파일 무접촉(desktop-pos만 변경).

## 5.6 오더티켓 HTML화 + BAR 스테이션 (Irene 반론 반영, Fable 2차)

Irene: "이 둘은 디자인·실물표시 문제지 인쇄방식 문제가 아니다. 백지 뒤로 미루지 말고 다 하라." — 코드 실측으로 재판정:

**오더티켓 HTML화 — 코드변경 0 (기존 표준설정으로 이미 가능), 백지와 같은 물리테스트로 동시검증.**
- 현재: with MIN 오더티켓은 ASCII(영문) → `_ticketIsTextSafe` auto=true → **raw ESC/POS**(plain). HTML/디자인으로 내려면 `_ticketIsTextSafe`=false 경로 = `generateHTMLKitchenTicket` → `sendHTMLViaQZTray`/`printTicketHTML` → native `printHtml`(숨은창).
- **전환 레버는 이미 존재**: 스토어 설정 `printFormat='graphic'` → 모든 티켓 HTML(디자인). billPrint 라우팅을 native전용으로 바꾸는 건 🔒보호파일 수정이라 금지 — 표준 설정이 정답 경로. **∴ 코드변경 불필요가 옳음.**
- **회귀 시나리오(실재)**: 오더티켓 HTML은 빌 백지와 **동일한 htmlPrinter 숨은창 leg**를 탄다. POS-80 드라이버가 그 leg를 백지로 만들면(0.1.7이 고치려는 것, 실기기 미검증), `graphic`을 켜는 순간 **지금 잘 나오는 raw 주방/오더티켓이 백지**로 = 주방인쇄 마비(생명선). 그래서 leg 증명 전 blind로 켜면 안 됨.
- **단, 별도 방문 불필요**: 그 증명 = 빌 백지와 **같은 1회 물리테스트**. 0.1.7 설치 후 `printFormat=graphic` 세팅 → 빌·오더티켓 둘 다 디자인으로 나오면 동시 해결, 백지면 auto로 되돌려(티켓 raw 안전) 플랜B. → Irene "다 하라"가 맞음. 정정: "빌 먼저 확인 후 나중"이 아니라 "같은 테스트로 함께".
- dev검증: 라우팅 로직 재확인(graphic→false→HTML, billPrint 2044–2074), native printHtml 디자인 렌더 실증(smoke PDF 233KB, 한글+디자인 pdftotext 확인). 코드변경 없어 신규 빌드 불필요.

**BAR 스테이션 — 즉시 처리(백지와 무관), SettingsPage 경고 추가.**
- **근본원인 코드 확정**: `billPrint sendToRawBTPrinter` L3767 `if(!address) return false` — qztray 스테이션 주소 빈값이면 **조용히 스킵**. with MIN BAR는 시드(SettingsPage L1784–1790: method='qztray', address='')라 스킵 = 안 나온 정확한 이유. 빌 백지와 완전 무관(라우팅/설정 갭).
- **고치는 걸 막는 코드갭 없음**: native 프린터 드롭다운(`NativePrinterSelect`, OS목록 자동로드)이 이미 있음 → BAR에 프린터 지정하면 address+method 기록되어 인쇄됨. 유일한 갭 = **조용한 실패(피드백 0)**.
- **실행**: SettingsPage native 스테이션 블록에 "프린터 미지정 → 이 스테이션 인쇄 안 됨" **경고 추가**(`dev-frontend/src/pages/Settings/SettingsPage.tsx`, isNativePrint 스테이션 서브블록, ~L7567). 🔒 billPrint 무접촉. build:dev exit0/경고0, print-guard 8/8.
- Irene 실기기: Settings→Printer→Kitchen Stations→각 스테이션(BAR 포함) 드롭다운에서 USB감열(POS-80) 선택. 단일프린터 카페면 이미 배포된 "Full 오더티켓"(전품목 1장)이 더 간단한 등가물.
- (미실행·Irene 결정대기) native 시드 기본을 '스킵' 대신 'OS기본 프린터'로 바꾸는 라우팅 기본값 변경 — 다중프린터 native 매장 오라우팅 회귀경로 있어 blind 금지. 옵션으로만 제시.

## 6. Opus 실행 실패 (정직)
- 미검증 앱빌드 반복 배포(pageSize 제거 밀어붙임), 브라우저 대체방법 반복 제시, printFormat=text 매장 직접세팅, 다운로드 배너로 혼란, 배포 waiter 자기매칭 버그로 지연, 버전 번갈아 올려 다운로드 혼선, "됐다" 조급. → **핵심: 라이브 추측·왕복·미검증. 분석(Fable)은 정확했으나 실행이 문제.**
