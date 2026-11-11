# 인쇄 디바이스 설정 표준 (솔루션 개발 기준)

> 2026-06-27. 문제 = 하이브리드(POS 자기주문 즉시인쇄) 중복. 다른 오더티켓 경로는 정상.
> 기준: 멀티테넌트 솔루션 표준으로 고정 — 매장별 JSON 손수정 금지. 관리자 UX는 평이한 하드웨어 용어만.

## 1. 문제 (좁게)

POS에서 넣은 주문은 2장, 모바일 주문은 1장. 모바일은 손님 폰에 프린터가 없어 **서버 폴러만** 찍고, POS는 **자기 주문 즉시 로컬 인쇄(하이브리드) + 서버 폴러**가 둘 다 찍어서 중복. 원래 atomic claim(`print-claim`, needs_print true→false)으로 한쪽만 이기게 돼 있으나, **디바이스 역할이 설정에서 암묵적으로 추론**(workstations[] + billPrinter.autoPrint + getActiveWorkstationId + consolidatedTicket 토글)되어 매장마다 어긋나면 새거나 겹친다. → 역할을 **명시·평이하게** 만들고, dedup을 **설정 무관하게 보장**한다.

## 2. 관리자 UX 표준 — 평이한 하드웨어 유무만

내부 용어("하이브리드 POS" 등) 화면 노출 금지. 디바이스마다 **두 가지만** 표시(자동 감지 + 어긋나면 알림 = 크로스체크):

- **PC(화면) 있음?**  예 / 아니오   ← 이 단말이 브라우저로 접속한 화면이면 자동 예
- **프린터 연결됨?**  연결됨 / 안 됨   ← QZ에서 실제 연결된 프린터 목록을 받아 자동 판정·표시 (가짜초록 차단: 설정한 이름이 목록에 없으면 "안 됨")

매니저는 "이 자리에 PC 있나, 프린터 붙어 있나"만 확인하면 끝.

## 3. 동작은 시스템이 내부 도출 (화면 비노출)

| PC | 프린터 | 시스템 동작 (내부) |
|----|--------|------|
| 예 | 예 | 주문 받기 + **자기 주문 즉시 인쇄** + 통합/빌 1부 |
| 아니오 | 예 | **스테이션 프린터** — 자기 스테이션 티켓만. 즉시인쇄 안 함, 통합 안 받음 |
| 예 | 아니오 | 주문/표시 전용 — 인쇄 안 함 |

## 4. 중복 1회 보장 (불변식)

주문 × 스테이션 단위로 **딱 한 번**. 단말 수·설정 모양과 무관하게 백엔드 claim이 단일 진실 → 즉시인쇄(하이브리드)와 서버 폴러가 절대 두 번 안 찍힘. (현재 claim이 역할 추론에 의존해 새는 지점을 제거.)

## 5. 연결 가시성 = 크로스체크

설정/단말 화면에 프린터별 "연결됨 / 미도달" 표시. 미도달 시 조용히 다른(기본) 프린터로 흘리지 않고 명시. (진행 중 #7 인쇄 가시성과 합류.)

## 6. 안전 (생명선)

인쇄 코드는 매장 생명선. 구현은 보호규칙대로 — 자동검증 전부 + 실프린터 1회(방향 확인이 아니라 종이 출력 확인). 매장 JSON 손수정 0.

## 7. 설정 안내 화면 (2026-11-08)

설계 원문: `.claude/fable-design-20261108-printer-setup-guide.md` (Fable). 구현: `dev-frontend/src/pages/Settings/PrinterSetupGuide.tsx` · `AndroidPrinterSetup.tsx`(표준 프린터 블록) · `utils/printDiagnostics.ts detectSetupDevice()`.

- **이 기기 자동 판정**(설정 › 프린터 §1 맨 위 한 줄): 안드로이드 앱(`__NATIVE_PRINT_SETUP`) · Windows 앱(`__NATIVE_PRINT`) · PC 브라우저 · 안드로이드 브라우저 · iPad, PWA 면 한 줄 덧붙임. 앱은 바꿀 수 없고 브라우저만 «아니에요?» 로 고침(이 기기 브라우저 저장 `printer_setup_device` — 매장 설정 아님).
- **연결 방식 고르기**: 안드로이드 앱은 기존(`android_printer_conn`: wifi·lan·bluetooth·builtin) · PC/Windows 앱은 `printer_setup_conn`(wifi·lan·usb). 고른 방식의 번호 순서만 보인다. Wi-Fi 에 «추천 — PurpleHere 표준 프린터».
- **«어느 방식을 고를까?» 표 · Browser/RawBT/QZ 3탭 없앰** — 기기가 정한다(PC=QZ 3단계 · 안드로이드 브라우저=앱 설치 권고 + RawBT 접힘 · iPad=인쇄 창 + 자동 인쇄 불가 안내 · PC 에 «인쇄 창으로» 접힘 한 줄).
- **PurpleHere 표준 프린터**(셀프테스트 V6.22F · 80 mm · USB + Wi-Fi 2.4 GHz): 셀프테스트에 «WIFI distribution network method» 가 있으면 EspTouch(SmartConfig) 방식 — 설정 모드 = 전원 끄고 FEED 누른 채 켜서 삐 소리 멈출 때까지(약 10초) · 셀프테스트 = 2초만. 다른 기종은 제조사 앱 소목록. 모델명은 로케일 키 `printer.setupGuide.std.model` 하나(비우면 안 보임).
- **PC 등록 두 길**: A 영어·말레이어 메뉴만 → IP 그대로(raw, 한글·로고 안 됨) / B 한글·중문·로고 → 제조사 드라이버 + TCP/IP 포트 + 이름 KITCHEN(권고 B).
- **프린터 2대 · 기기 섞임 규칙**(접힘 상자, POS 자리 2개 이상이면 펼침): 인쇄 기기 1대가 두 프린터에 다 닿아야 · 영수증은 POS 자리마다 · Windows PC + 안드로이드 태블릿이면 PC 가 인쇄 기기 · **프린터 이름 = 자리 영문 대문자(COUNTER·KITCHEN·BAR), 인쇄 기기를 바꾸면 새 기기에 같은 이름** → 매장 설정 그대로 · 블루투스 1기기 1프린터 · «지금 이 기기» 읽기 줄.
- 매장 설정(printer_settings) 모양·저장·자물쇠·🔒 인쇄 보호파일 무변경. §2 카드의 영어 하드코딩 글자만 번역 키로(저장 값 `browser|qztray|rawbt` 그대로).

- **설정 앱 = Espressif 공식 EspBluFi (2026-11-09 · EspTouch 대체):** Irene «왜 다른 걸 다운받게 해? 공식 안드로이드 다운로드 앱 있어. EspBluFi 라고 있단말야. 제대로 안내 해». 블루투스로 Wi-Fi 이름·비밀번호를 보내는 방식(폰이 2.4 GHz 에 붙어 있을 필요 없음). 안드로이드 = Espressif GitHub 릴리즈 APK `EspBlufiForAndroid v1.7.1`(Google Play 에는 EspBluFi 없음 — Play 의 «BluFi» 는 다른 개발자 앱, 2026-11-09 실측) · iPhone = App Store «EspBlufi» id1450614082. 순서: 설치 → 설정 모드(FEED 10초, 그대로) → EspBluFi: 아래로 당겨 찾기 → 프린터 → Connect → Configure → Station → Select Wi-Fi(2.4 GHz) → 비밀번호 → OK → 셀프테스트로 IP. 버튼 이름은 앱 원문(strings.xml). 목록에 안 뜨면 앱 Settings «BLE devices filter» 비우기. 코드 `printerGuideKit.tsx` `BLUFI_*` · 로케일 `printer.setupGuide.std.e1*·e3*·trouble1`.

### 7-b. 상자 없는 안내 + 설정 매칭 점검 (2026-11-08 b)

설계·판정 원문: `.claude/fable-design-20261108b-printer-guide-ux-audit.md` (Irene «박스 안에 박스 … 가독성 엉망» · «기능 문제 없는지 … 매칭 … 테스트» · «배포해도 기존 레스토랑들 설정 바뀌는 일 없는지»).

- **틀:** §1 안내 안 테두리 상자 0개 — 기기 줄 → 고르기 두 줄(연결 방식 · **내 프린터 기종** std/Epson/Star/기타, 이 기기 저장 `printer_setup_model`) → 번호 목록 하나(폭 760) → 글 접힘(«프린터 2대», PC 는 «브라우저 인쇄 창»). 공용 틀 = `dev-frontend/src/pages/Settings/printerGuideKit.tsx`(Seg · StepList · TroubleLink · TextFold · ModelPicker · 안내 데이터).
- **단계 수:** PC/Windows 앱 Wi-Fi+표준 9(EspBluFi 4단계가 목록 안에 평면) · Wi-Fi+다른 기종 7 · LAN 7 · USB 5 / 안드로이드 앱 Wi-Fi+표준 8 · Wi-Fi+다른 기종 6. QZ Tray 설치·연결 확인·프린터 찾기는 «인쇄 도우미» 단계의 버튼 줄(핸들러 그대로). «추천 기종» 접힘 · 녹색 «Direct printing» 띠 · 안드로이드 둘째 카드의 중복 연결 방식 고르기 없앰.
- **매칭 고침:** M1 Windows 앱 등록 문구 = 앱 드롭다운 글자 · **M3 설정 불러올 때 `billPrinter.method`·`kitchenPrinter.method` 를 버리던 기존 결함**(화면은 qztray 로 보이고 다음 저장 때 method 가 빠져 서버가 옛 printerMode 로 되돌림) → 서버 값이 있을 때만 그대로 · M4 POS 자리 ≥2 면 «결제 후 자동인쇄» 토글 아래 «이 스위치가 주방 티켓 찍는 기기도 정함» · M5 이름 다르면 Test 실패 · M6 스테이션 Test 빈 주소 안내 · **스테이션 칸 채우기 저장이 설정 불러오기 전에 돌던 경합** → 불러온 뒤에만.
- **배포 안전 증명(데모 38, 실브라우저 56/56):** 모양 3가지(지금 값 · 옛 모양(method 없음) · 섞인 모양) × «불러오기 → 저장 → 다시 불러오기» 동일(읽는 쪽 동치 기본값 채움 제외) · 열기만 했을 때 쓰기 0(기기 6종 + 원본 5회) · §2 표시 = 저장값 · 반증(method 뺀 저장은 검사가 잡음) · 원본 바이트 복원.
- **알고 둔 기존 동작(이번에 안 고침 · Fable §9):** 매장 JSON 에 `receiptSettings` 가 없으면 설정에서 아무 저장 1회에 화면 기본값(결제 후 영수증 2장)이 들어감 — 읽는 쪽은 없을 때 1장. 2026-05-26 부터 · 운영 동일. 운영 해당 매장 수는 `scripts/report-printer-settings-fp.js` 의 `rcpt_missing_autoOn`(배포 방·정기 점검이 배포 전·후 실행 · 0 이면 끝, >0 이면 Irene 결정).

### 7-c. «프린터 설정 기기» — 매장 설정은 한 벌, 바로 바꾸는 곳은 한 기기 (2026-11-10)

설계 원문: `.claude/fable-design-20261110-printer-settings-device-scope.md` (Fable · Irene «레스토랑 프린터 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게»).

- **기기별로 쪼개지 않는다.** `restaurants.printer_settings` 한 벌 그대로(인쇄 경로 🔒 무변경). 기기별인 것(자리 바인딩 `workstation_id` · 앱 등록부 · 안내 고르기)도 그대로.
- **꼬리표 `printer_settings.setupDevice`** `{ id(=print_device_id), kind, name, at, byId, byName, otherEdit? }` — 전용 길 `POST /api/store/printer-setup-device` 로만 써진다. 설정 저장에 실려 온 값은 서버가 무시(`keepSetupDevice`). 인쇄 경로는 안 읽는다.
- **상태 3가지:** N(아직 없음 — 잠김, «이 기기를 설정 기기로») · M(이 기기 — 열림) · O(다른 기기 — 잠김, 확인 창 뒤 그 방문 동안만 열림 · 체크하면 설정 기기를 이 기기로 옮김). 배포 뒤 모든 매장 N 에서 시작(인쇄 영향 없음).
- **잠금 세 겹:** 화면(`PrinterAutoSave` 래퍼 + 자리 추가·삭제·«Turn on auto-print» disabled) · 저장 본문(`!printerEditable` 이면 어떤 저장에도 `printer_settings` 안 실음 + `printer_device` 동봉) · 서버(`utils/printerSetupDevice.applyPrinterWrite` — `store.js PUT /settings` · `restaurants-crud.js PUT /:id` 같은 함수. 다른 기기가 확인 없이 보낸 저장 = 비상 두 칸만 + 응답 `printerSettingsSkipped`).
- **잠그지 않음:** §1 이 기기 연결 · «Use on this device» · Test 버튼 · §4 비상(전용 길 `POST /api/store/printer-emergency` · 직원 포함) · 미리보기 · 자가진단.
- **스테이션 칸 채우기(5-28 사고 수리)** = 전용 길 `POST /api/store/printer-station-seed`(빠진 칸만 · 0 이면 안 씀 · 관리자).
- **함께 막은 기존 구멍:** `PUT /api/restaurants/:id` 에 «관리자만» 문이 없어 직원 저장이 프린터 설정을 통째로 덮을 수 있었다(실측 — 고장 주입으로 확인) → 같은 판정. health-check security 2건.
- **알고 둔 한계:** 기기 정보를 안 보내는 옛 번들 저장은 지금처럼 통과(꼬리표는 보존 · 로그 `[printer-scope] no device info`).
- 화면 `pages/Settings/PrinterDeviceScope.tsx` · 단위 시험 `dev-backend/tests/printer-setup-device.test.js`.
