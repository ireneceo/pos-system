# Fable 설계 — 설정 › 프린터 §1 «이 기기와 프린터 연결» 안내 재설계 (2026-11-08)

> 작성: Fable(리더). 구현: Opus(팀원) — 이 문서 그대로. 설계와 다른 판단이 필요해지면 **즉시 중단**하고 사실만 들고 돌아온다.
> Irene 원문(2026-11-08): «EspTouch"(제작사 Espressif) 와이파이 프린터 쓸건지 말건지 안드로이드앱인지 아닌지 뭔가 제대로 안내가 되어서 프린터 설정에 혼란 없게 하고 EspTouch 다운받고 설정하는 거 다 제대로 알려줘야 하는 거 아니야? 프린터마다 다름이라고 하고 이게 맞는 건 알려주고. 우리가 쓰는 기종은 이건데 추천도 하고 말이야. 바로 바로 따라하면 끝나게 제대로 알려줘. 2대 프린터 쓰는 경우도 제대로. 안드로이드앱 쓰는 경우랑 아닌 경우의 디바이스 또는 pwa, 웹브라우저랑 PC랑 다 제대로 자동체크되거나 선택해서 설정하게(여러 종류 쓸 수도 있을 때 레스토랑 설정 문제 안되게) 혼란 없고 심플하게 바로 설정되게 도와달라고»

---

## 0. 한 줄 결론

§1 카드를 **«이 기기(자동 판정) → 프린터 연결 방식(고르기) → 그 조합의 순서만 → 행동 버튼»** 한 흐름으로 바꾼다. 지금의 «어느 방식을 고를까?» 표와 Browser/RawBT/QZ Tray 3탭은 없앤다(사용자가 방식 이름을 알 필요가 없다 — 기기가 정한다). 와이파이 1단계에 **우리 표준 프린터의 EspTouch 순서**를 정확히 넣고, 「프린터마다 다름 — 셀프테스트 종이에 이 문구가 있으면 이 방법」으로 내 프린터를 찾게 한다. **추천 기종** 상자와 **프린터 2대(계산대+주방)·기기 섞임** 상자를 모든 기기에 공통으로 둔다. 매장 설정(printer_settings)의 모양·저장 경로는 **한 글자도 바꾸지 않는다** — 기기 판정·연결 방식·펼침 상태는 이 기기 브라우저 저장(편의값)만.

---

## 1. 실측 사실 (설계의 근거 — 구현 전 다시 읽을 것)

### 1-1. 지금 화면 (`SettingsPage.tsx` 프린터 탭 §1, 6052–6622행)
- 안드로이드 앱(`window.__NATIVE_PRINT_SETUP`)일 때: 첫 카드 = `AndroidPrintGuide`(연결 방식 4개 고르기 → PLAN 순서) + `AndroidPrintReadiness`. 둘째 카드(methodGuide) 안에 «✓ Direct printing is active» 띠 + `AndroidPrinterSetupCard`(자동 찾기·IP 등록·블루투스).
- Windows 앱(`__NATIVE_PRINT` 만): methodGuide 카드에 «Direct printing is active» 띠 + «Find your printers»(3단계 블록) — OS 프린터 목록은 mount 때 자동 로드(`getQZTrayPrinters`, 992–1008행).
- 브라우저: methodGuide 카드 = 설명문 + «Which method should I pick?» 아코디언 표(5행) + 3탭(Browser · RawBT · QZ Tray). QZ 탭 = 설치(`/api/qz-tray/installer?os=windows|mac`) → Check Connection(`runQZDiagnostic`) → Find Printers(`connectQZTray`+`getQZTrayPrinters`).
- `showQzGuide` 모달(6455–6621행)은 **여는 코드가 없다**(`setShowQzGuide(true)` 0건) = 죽은 코드.
- §2 카드의 method select 옵션 글자·placeholder·팁은 **하드코딩 영어**(6779–6781 · 6795 · 6811 · 7086–7088 · 7307 · 7312 · 7328 · 7339 · 7367).
- 와이파이 기종별 안내(`AndroidPrinterSetup.tsx` 445–454행 `wifiJoin`)에 Epson/Star/«기타: 상자 설명서»/LAN 만 있다 — **우리 표준 프린터(EspTouch 방식)가 없다.** 셀프테스트 목록(436–443)도 «대부분 80mm» 로만.
- 기기 신호: `__NATIVE_PRINT_SETUP`(안드로이드 앱) · `__NATIVE_PRINT`(앱 공통) · `isStandalone()`(PWA, `utils/runtime.ts`) · `navigator.userAgent` · `activeWorkstationId`(이 기기가 어느 POS 자리인지, localStorage). `printDiagnostics.detectPlatform()` 은 OS 가 아니라 인쇄 모드 기준이라 그대로는 못 쓴다(새 함수 추가).

### 1-2. 구조 제약 (바꾸지 않는다)
- `printer_settings` 는 **매장 단위**. 자리(워크스테이션 빌 · 주방 스테이션)의 `address` = **프린터 이름**(Windows OS 프린터 이름 · 안드로이드 앱 등록 이름) **또는 IP**. 이름→실제 프린터는 **기기마다** 해석(Windows 스풀러 · 안드로이드 앱 레지스트리). 두 층 모델(`mobile-app/docs/ANDROID_APP_DESIGN.md` §7).
- 주방 티켓은 **자동 인쇄가 켜진 POS 자리 1곳(POS1 폴러)** 만 찍는다(CLAUDE.md 🔒). 그 기기가 주방 프린터 이름/IP 에 물리적으로 닿아야 한다.
- **IP 로 적으면 raw ESC/POS** → 한글·중문·로고 못 찍음(영문·말레이어 텍스트만). **이름으로 적으면 그림 경로** → 한글·중문·로고 됨 (Windows: 드라이버 프린터 · 안드로이드 앱 0.4.1+: 등록 이름). 안드로이드 앱은 이름 등록이 곧 IP 를 품으므로 Wi-Fi 프린터도 드라이버 없이 한글이 된다.
- 블루투스 = 1기기 1프린터. 안드로이드 **앱은 USB 프린터 미지원**(연결 방식 wifi·lan·bluetooth·builtin 만). 안드로이드 **브라우저**는 RawBT 로 USB OTG 가능.
- 저장 자물쇠(`project_printer_settings_wipe_locks`) · 인쇄 보호파일 8개 **무접촉**.

### 1-3. 우리 표준 프린터 — 셀프테스트 종이 사실 (Irene 첨부)
- Version V6.22F · 200 mm/s · **Interface: USB Print, WIFI** · 폭 80 mm · 64자/줄 · 커터 있음 · 내장 글꼴 영숫자 + 간체 GB18030 (= 한글은 그림으로만 찍힘 → 위 «이름으로» 규칙과 일치).
- **WIFI 2.4 GHz 만.** 초록 불 천천히 깜빡임 = Wi-Fi 연결됨. 셀프테스트에 «WIFI ID …2.4G» · «WIFI IP 192.168.0.104» 찍힘.
- **네트워크 설정 모드 진입(종이에 인쇄된 원문):** ① 프린터 전원 끄기 ② FEED(종이 넘기기) 버튼을 누른 채 ③ 전원 켜기 → **삐 소리가 멈추면 손 떼기(약 10초)** → 초록 불 깜빡임 = 설정 모드.
- 이 방식 = Espressif 모듈 SmartConfig → 설정 앱 **«EspTouch: SmartConfig for ESP8266, ESP32»**(제작사 Espressif Systems, Google Play · App Store). 폰이 같은 2.4 GHz Wi-Fi 에 붙어 있어야 하고, 안드로이드는 위치 권한이 필요(Wi-Fi 이름을 읽기 위해). 성공하면 앱에 기기 BSSID 와 IP(InetAddress) 가 뜬다. 탭은 «EspTouch»(V1) — V2 아님.
- **모델명은 종이에 없다.** 리포 `docs/SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE.md` 는 패키지 프린터를 «Xprinter XP-T80B» 로 적었지만 같은 기기인지 미확인 → §8 질문.

---

## 2. 설계 결정

### D1. 기기 자동 판정 + «아니에요?» 바꾸기
`utils/printDiagnostics.ts` 에 추가(읽기 전용 파일이라 적합):
```ts
export type SetupDevice = 'android-app' | 'windows-app' | 'pc-browser' | 'android-browser' | 'ipad-browser';
export type SetupOs = 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'other';
export function detectSetupDevice(): { device: SetupDevice; os: SetupOs; standalone: boolean; overridable: boolean }
```
- `__NATIVE_PRINT_SETUP` → `android-app` · `__NATIVE_PRINT`(만) → `windows-app` — 앱 존재는 사실이라 **바꿀 수 없음**(`overridable:false`).
- 브라우저: UA `Android` → `android-browser` · `iPad|iPhone|iPod` 또는 (`Macintosh` && `navigator.maxTouchPoints > 1`) → `ipad-browser` · 그 외 → `pc-browser`(os = windows/mac/linux/other). `standalone = isStandalone()`.
- 바꾸기: localStorage `printer_setup_device`(값 = 세 브라우저 종류 중 하나). 앱이면 무시. 이 값은 **안내 문구만** 바꾼다 — 설정 저장과 무관.
- 화면 한 줄: «이 기기: **Windows PC · 웹브라우저**» / «**홈 화면에 설치한 웹앱(PWA)** — 인쇄는 브라우저와 같습니다» / «**Purple POS 안드로이드 앱**» / «**Purple POS Windows 앱**» / «**안드로이드 태블릿 · 웹브라우저**» / «**iPad · 웹브라우저**». 오른쪽에 작은 select «아니에요?»(브라우저일 때만).

### D2. §1 카드 구조 — 모든 기기 한 틀
```
[CardTitle] 이 기기와 프린터 연결
[기기 줄]   이 기기: … (아니에요? ▾)
[권고 상자] (android-browser 만) «Purple POS 앱을 설치하면 가장 쉽습니다» + [앱 받기] → /download
            (ipad-browser 만)   «iPad 는 브라우저 인쇄(AirPrint 창)만 됩니다 — 자동 인쇄 기기가 될 수 없습니다. 주방 자동 인쇄는 Windows PC 또는 안드로이드 태블릿(앱)에서.»
[연결 방식] 프린터는 어떻게 연결하나요?  ○ Wi-Fi(추천)  ○ LAN 케이블  ○ USB  (○ 블루투스 / ○ 내장 — 기기별 §D3)
[순서]      그 기기 × 그 방식의 번호 순서만 (§D5)
[행동]      기기별 행동 블록 — pc-browser: QZ 3단계(설치·확인·Find Printers, 지금 코드 그대로 이동) / windows-app: «앱이 직접 인쇄 — 프린터 목록 자동» 띠 + Find Printers 블록 / android-app: 둘째 카드의 등록 카드 그대로 / android-browser: RawBT 5단계(접힘) / ipad: Browser print 3단계
[아코디언]  ▸ PurpleHere 표준 프린터 — 추천 기종 (§D4)
[아코디언]  ▸ 프린터 2대(계산대 + 주방) · 기기가 여러 대일 때 (§D6)
```
- 안드로이드 앱은 **지금 첫 카드(AndroidPrintGuide+Readiness)를 유지**하고 [기기 줄]·두 아코디언만 그 카드 위/아래에 더한다. 연결 방식 고르기는 기존 `AndroidConnPicker` 그대로(값 키 `android_printer_conn` 유지 — 바꾸면 매장 태블릿 선택이 날아감).
- 비-앱·Windows 앱의 연결 방식 값은 새 키 `printer_setup_conn`(wifi|lan|usb|bluetooth). 안드로이드 앱 키와 **분리**(앱엔 usb 가 없고, 브라우저엔 builtin 이 없다).

### D3. 기기별 연결 방식 선택지와 추천 표시
| 기기 | 선택지 (순서 = 화면 순서) | 기본 추천 표시 |
|---|---|---|
| android-app | Wi-Fi · LAN · 블루투스 · 내장 (기존) | Wi-Fi 에 «추천» 꼬리표 |
| windows-app | USB · Wi-Fi · LAN | 계산대=USB, 주방=Wi-Fi (2대 상자가 설명) |
| pc-browser | USB · Wi-Fi · LAN | 같음 |
| android-browser | 블루투스 · USB(OTG) · Wi-Fi — 전부 RawBT 안에서 고름 | 권고 상자(앱 설치)가 위 |
| ipad-browser | 없음(브라우저 인쇄만) | — |
«추천» 꼬리표 문구: «추천 — PurpleHere 표준 프린터». 고르기 전엔 «하나 고르면 그 방식의 순서만 보입니다»(기존 문구 재사용).

### D4. «PurpleHere 표준 프린터 — 추천 기종» 상자 + EspTouch 정확 순서
상자(아코디언, 기본 **접힘**; Wi-Fi 를 고르면 와이파이 1단계 안에 같은 EspTouch 블록이 **펼쳐져** 보인다 — 한 컴포넌트 두 자리).

**머리:** «PurpleHere 표준 프린터 — 80 mm 영수증·주방 겸용 · USB + Wi-Fi(2.4 GHz) · 자동 커터 · 200 mm/s. 저희가 매장 패키지에 넣는 기종입니다.» (모델명 글자는 §8 Irene 답 뒤 한 키로 넣는다: `setupGuide.std.model`)
**내 프린터가 이 기종인지:** «셀프테스트 종이에 **«WIFI distribution network method»** 와 **«Press and hold the paper feed button»** 이 적혀 있으면 아래 방법이 맞습니다. 다른 프린터(Epson·Star 등)는 각 제조사 앱 — 아래 «다른 기종» 참고.»

**EspTouch 로 매장 Wi-Fi 에 붙이기 — 한 번만, 프린터마다**
- 준비(한 줄): 매장 Wi-Fi 이름·비밀번호. **2.4 GHz** 여야 함 — 공유기 이름이 둘(«Shop», «Shop-5G»)이면 5G 없는 것. 손님용 Wi-Fi 아님. 폰(또는 이 태블릿)을 **그 Wi-Fi** 에 먼저 연결.
1. **EspTouch 앱 설치** (2026-11-08 실측 뒤 확정 — Google Play 에는 Espressif 공식 EspTouch 가 **없다**. 검색 첫 결과는 개인 개발자 KhoaZero123 의 앱이라 매장에 권하지 않는다.)
   - **iPhone/iPad 가 있으면 이게 가장 쉽습니다:** App Store «Espressif Esptouch»(판매자 Espressif Systems) [버튼: App Store 열기 → `https://apps.apple.com/my/app/espressif-esptouch/id1071176700`]
   - **안드로이드 폰·태블릿:** Espressif 공식 설치 파일(APK) [버튼: EspTouch 받기(안드로이드) → `https://github.com/EspressifApp/EsptouchForAndroid/releases/download/v2.4.0/esptouch-v2.4.0.apk`] → 받은 파일을 열어 설치 — «출처를 알 수 없는 앱 허용» 을 한 번 묻습니다(Purple POS 앱을 받을 때와 같은 절차). 한 줄 설명: «Google Play 에는 Espressif 공식 앱이 없습니다 — Play 에서 검색해 나오는 «EspTouch» 는 다른 개발자의 앱입니다.»
   - Google Play 열기 버튼은 **없앤다**. 무료.
   - 링크 2개는 로케일 글자가 아니라 코드 상수(`ESPTOUCH_IOS_URL` · `ESPTOUCH_ANDROID_APK_URL`, `PrinterSetupGuide.tsx` 맨 위)로 둔다 — 버전이 바뀌면 한 곳만 고친다. 안드로이드 앱(android-app) 안에서는 이 태블릿으로 바로 받을 수 있으니 같은 버튼을 보인다(`window.open(_, '_blank')` — 서비스워커가 .apk 를 가로채지 않는 것은 2026-11-08 bd1a16bb0 로 이미 보장).
2. **프린터를 설정 모드로** — 프린터 전원 끄기 → FEED(종이 넘기기) 버튼을 **누른 채** 전원 켜기 → **삐 소리가 멈출 때까지 계속 누르기(약 10초)** → 손 떼기 → **초록 불이 깜빡이면** 설정 모드.
3. **EspTouch 열기** → 위 탭 **«EspTouch»**(«EspTouch V2» 아님) → 화면에 **매장 Wi-Fi 이름**이 보이는지 확인(안 보이면: 폰 Wi-Fi 를 매장 2.4 GHz 로 · 안드로이드는 «위치» 허용) → **Password** 에 Wi-Fi 비밀번호 → Device count **1** → **Confirm**. (앱 버튼은 영어 그대로.)
4. **기다리기(최대 1분)** — 앱에 기기 1개와 **IP 주소(192.168.x.x)** 가 뜨면 성공. 프린터 초록 불 = **천천히 깜빡임**(연결됨).
5. **확인 — 셀프테스트 종이** — 전원 끄기 → FEED 누른 채 전원 켜기 → **2초쯤 뒤 바로 손 떼기**(삐 소리 멈출 때까지 잡으면 다시 설정 모드로 들어감 — 그러면 끄고 다시) → 종이에 **«WIFI IP 192.168.x.x»** 가 찍히면 끝. **이 종이는 보관**(주소를 직접 넣을 때 씀).
- 안 될 때(한 줄씩): 앱이 Timeout → 폰이 5G 에 붙어 있음 / 프린터가 설정 모드가 아님(2번 다시) / 비밀번호 틀림 / 공유기와 멀다 — 가까이서 다시. 셀프테스트에 IP 가 없음 → 2~4 다시. 종이가 IP 를 찍는데 Purple 에서 못 찾음 → 이 기기가 같은 Wi-Fi 인지(손님 Wi-Fi 아님).

**그 다음 — Purple 에 등록 (기기별 한 문단, 선택된 기기 것만 보임):**
- android-app: «아래 «프린터 자동 찾기» → 찾은 주소에 **KITCHEN**(또는 COUNTER) 이름 → 추가. 못 찾으면 셀프테스트 IP 로 «IP 주소로 추가».» (한글·중문 그대로 됨.)
- windows-app / pc-browser: 두 길 중 하나 —
  - **A. 메뉴가 영어·말레이어만**: §2 에서 «Network printer (enter IP)…» → 셀프테스트 IP 입력(`192.168.x.x:9100`). 드라이버 불필요. **한글·중문·로고는 안 찍힘.**
  - **B. 한글·중문 메뉴 또는 로고**: 제조사 Windows 드라이버 설치(상자 QR·설명서) → 설치 중 포트 = **Network/TCP-IP**, 주소 = 셀프테스트 IP → 프린터 이름을 **KITCHEN** 으로 → Purple «Find Printers» → §2 에서 KITCHEN 선택. **권고: 메뉴에 영문 아닌 글자가 하나라도 있으면 B.**
- android-browser: «RawBT 앱 → Settings → Connection → Network → 셀프테스트 IP» (RawBT 기존 단계로 연결).

**다른 기종(접힘 소목록, 기존 `wifiJoin` 재사용):** Epson TM(TM Utility) · Star(Quick Setup Utility) · 기타(상자 설명서) · «LAN 포트도 있으면 랜선이 더 쉽습니다».

### D5. 기기 × 연결 방식 순서표 (화면에 번호로 보이는 것 — 그대로 구현)
공통 끝단계(모든 기기): **[고르기]** §2 에서 자리마다 프린터 고르기 → Test 로 종이 확인 → **[자동]** 주방 자동 인쇄 켜기 · POS 가 2대 이상이면 자동 인쇄 켜진 POS 에 «이 기기에서 사용» → **[켜 두기]** 인쇄 기기는 전원·화면·(브라우저면 Purple 탭) 켜 둔 채.

| 기기 | 방식 | 1 | 2 | 3 | 4 | 끝단계 |
|---|---|---|---|---|---|---|
| android-app | wifi/lan/bt/builtin | **기존 PLAN 그대로** (wifiJoin 소목록 맨 위에 §D4 표준 프린터 항목 추가 · selfTest 목록 맨 위에 표준 프린터 셀프테스트 항목 추가) |||||
| pc-browser | wifi | 프린터를 매장 Wi-Fi 에(§D4·기종별) | 셀프테스트로 IP 확인 | 이 PC 에 등록 — A IP / B 드라이버+이름(§D4) | 인쇄 도우미(QZ Tray) 설치 → 연결 확인 → Find Printers (아래 행동 블록) | 고르기·자동·켜 두기 |
| pc-browser | lan | 랜선: 프린터 LAN 포트 ↔ 공유기, 1분 대기 | 셀프테스트로 IP 확인 | 같음 | 같음 | 같음 |
| pc-browser | usb | USB 연결 → Windows 가 자동 설치(안 되면 제조사 드라이버) → Windows 설정›프린터에서 이름 확인(원하면 COUNTER 로 바꾸기 · macOS 는 시스템 설정›프린터에 추가) | QZ 설치 → 확인 → Find Printers | — | — | 고르기·자동·켜 두기 (+ 백지면 §3 Print Format = Text) |
| windows-app | wifi/lan | pc-browser 와 같되 4번 = «앱이 직접 인쇄합니다 — 프린터 목록은 자동으로 읽힙니다(§2 드롭다운). 안 보이면 [프린터 다시 읽기]» | | | | |
| windows-app | usb | USB 연결·이름 확인 | 앱이 목록 자동 — §2 드롭다운에서 고르기 | — | — | 같음 |
| android-browser | (RawBT) | Purple POS 앱 설치 권고 상자 **위** · 그대로 쓰려면: RawBT 설치 → Connection(블루투스/USB/Network) → Default print service ON → §2 method = RawBT → 테스트 (기존 5단계) | | | | 같음 (블루투스는 1기기 1프린터 주의) |
| ipad-browser | — | 브라우저 인쇄 3단계(기존) + 「자동 인쇄 기기 불가」 상자 | | | | — |

### D6. «프린터 2대(계산대 + 주방) · 기기가 여러 대일 때» 상자 (모든 기기 공통 · 기본 접힘 · 워크스테이션 2개 이상이면 **기본 펼침**)
문장 그대로(한 줄씩, 번호):
1. **인쇄 기기는 매장에 1대.** 주방 티켓은 «자동 인쇄» 가 켜진 POS 자리 1곳의 기기만 찍습니다(어느 기기·손님 폰에서 주문해도). 그 기기가 **주방 프린터와 계산대 프린터 둘 다** 에 닿아야 합니다.
2. **영수증 프린터는 POS 자리마다 하나.** 그 자리에 «이 기기에서 사용» 한 기기가 찍습니다. 프린터 없는 POS 자리는 영수증 프린터를 끕니다.
3. **가장 쉬운 조합(추천):** 인쇄 기기 1대(안드로이드 태블릿 앱 또는 계산대 Windows PC) + 계산대 프린터(USB 또는 Wi-Fi) + 주방 프린터(Wi-Fi). 다른 POS 기기는 프린터 없이 주문만.
4. **섞어 쓸 때(Windows PC 계산대 + 안드로이드 태블릿):** 항상 켜 두는 **계산대 PC 를 인쇄 기기**로. PC 가 주방 Wi-Fi 프린터에 닿게(이름 또는 IP). 태블릿은 다른 POS 자리로 «이 기기에서 사용», 영수증 프린터 없으면 끄기. 태블릿에서 넣은 주문도 PC 가 찍습니다 — 정상입니다.
5. **이름 규칙:** 프린터 이름은 **자리 이름을 영문 대문자**로 — **COUNTER · KITCHEN · BAR**. 매장 설정은 «어느 자리 = 어느 이름» 만 기억하고, 그 이름이 어느 프린터인지는 **기기마다**(Windows 프린터 이름 · 안드로이드 앱 등록 이름) 정합니다. 인쇄 기기를 바꾸면 **새 기기에 같은 이름으로** 프린터를 잡으면 매장 설정은 그대로 씁니다. 이름이 다르면 §2 에 «saved (not detected now)» 가 뜨고 안 찍힙니다.
6. **블루투스 프린터는 한 기기에 하나만** 붙습니다 — 프린터 2대면 주방은 Wi-Fi 로.
7. **지금 이 기기:** (activeWorkstationId 가 있으면) «이 기기 = POS 자리 **{name}** · 자동 인쇄 {켜짐/꺼짐}» / (없으면) «이 기기는 아직 POS 자리를 고르지 않았습니다 — §2 에서 «이 기기에서 사용»». (읽기만 — 바꾸는 버튼은 §2 에 있다. 중복 버튼 금지.)

### D7. 지우는 것 · 남기는 것 (`SettingsPage.tsx`)
**지움:** «Which method should I pick?» 아코디언 표 전체(6100–6156) + state `methodMatrixOpen` · 3탭 UI(6161–6188) + state `printerGuideTab`/`guideTab` 분기 · `methodGuide.desc` 문단 · **죽은 `showQzGuide` 모달**(6454–6621) + state `showQzGuide`·`qzScenario`(그 모달 전용 키 `settingsPage.qz*`·`whatIsQzTray*`·`whereToInstall*` 는 4언어에서 지워도 되나 **선택** — 다른 곳에서 안 쓰는지 grep 0 확인 뒤).
**남김(자리만 옮김):** QZ 3단계 블록(설치·확인·Find Printers — 코드 그대로, pc-browser 행동 블록으로) · RawBT 5단계(android-browser 행동 블록, 접힘) · Browser 3단계(ipad 행동 블록 + pc 에서 «무음 인쇄가 필요 없으면» 접힘 한 줄) · «Direct printing is active» 띠(windows-app) · `AndroidPrinterSetupCard` 카드(android-app, 지금 자리) · `AndroidPrintGuide`/`AndroidPrintReadiness`(android-app 첫 카드) · `showPrinterTroubleshoot` 모달(§4 에서 연다 — 무관).
**로케일 키 정리:** `printer.methodGuide.matrix*`·`matrixOr` 는 4언어에서 삭제. `browserLabel/rawbtLabel/qzLabel` 은 글자로 계속 쓰이면 유지.

### D8. §2 카드 하드코딩 영어 → 쉬운 말 + i18n (작은 범위, 이번에 같이)
method select 옵션 3개(워크스테이션 6779–6781 · 주방 7086–7088) · placeholder(6795 · 7339) · 팁(6811 · 6834 · 6837 · 7307 · 7312 · 7367) · 라벨 «Connection Method»(6772 · 7075) · «Printer Address»(7328) · «Or pick a detected printer…»(6815 · 7277 · 7373) · «Test»/«Test Print» 버튼(7272 · 7363) 을 `settings:printer.assign.*` 키로. 옵션 글자:
- browser → «브라우저 인쇄 창 (이 기기 기본 프린터)»
- qztray → «프린터 이름 또는 IP (PC 인쇄 도우미 QZ Tray)»
- rawbt → «RawBT (안드로이드 브라우저)»
저장되는 값(`browser|qztray|rawbt`)·동작은 **그대로**. 글자만.

### D9. 코드 구조 · 파일
- **새 파일** `dev-frontend/src/pages/Settings/PrinterSetupGuide.tsx` (UI, 보호 파일 아님): `DeviceLine` · `SetupConnPicker`(브라우저·Windows 앱용, 키 `printer_setup_conn`) · `SetupSteps(device, conn)` · `StdPrinterBlock`(EspTouch — `variant: 'inline' | 'accordion'`) · `TwoPrintersBlock(props: workstations, activeWorkstationId, kitchenAutoPrint)` · `RecommendAppBox` · `IpadBox`. 스타일은 `AndroidPrinterSetup.tsx` 의 `stepNo`/`btn`/`subList` 와 같은 모양(그 파일에서 export 해 재사용 — 중복 정의 금지). 인라인 스타일 패턴 유지(이 탭 기존 방식), **로컬 styled.button/table 금지**, 장식 이모지 금지(글리프 ○ ● ▸ ✓ ! 만), danger `#EF4444`, primary `#635BFF`.
- `utils/printDiagnostics.ts`: `detectSetupDevice()` 추가(읽기 전용, 위 D1).
- `AndroidPrinterSetup.tsx`: ① `wifiJoin` 소목록 **맨 위**에 표준 프린터 항목(제목 «PurpleHere 표준 프린터 (셀프테스트에 'WIFI distribution network method' 가 있는 프린터)» · 본문 = EspTouch 5단계 요약 한 문단 + «자세히» 로 `StdPrinterBlock inline` 펼침) ② `selfTest` 소목록 맨 위에 표준 프린터 셀프테스트 항목(«FEED 누른 채 켜고 2초 뒤 손 떼기 — 삐 소리 멈출 때까지 잡으면 설정 모드로 들어가니 짧게») ③ `wifiJoinBody` 에 «이 태블릿도 그 Wi-Fi» 이미 있음 — 유지. ④ `stepNo`·`btn`·`subList` export.
- `SettingsPage.tsx`: §1 카드 재조립(D2·D7) + §2 글자(D8). **저장 로직·AutoSaveField·handleSave·NativePrinterSelect 무변경.**
- 로케일 4언어 `public/locales/{en,ko,zh,ms}/settings.json`: 새 키는 `printer.setupGuide.*`(중첩 객체, `printer.androidGuide` 와 같은 방식) · `printer.assign.*`. **en 먼저, ko → zh → ms.** 문구는 이 문서의 한국어/영어를 기준으로 번역(의미 보존·짧게).
- 문서: `docs/PRINT_DEVICE_SETUP_STANDARD.md` 끝에 «## 7. 설정 안내 화면(2026-11-08)» 절 추가 — D1~D6 요약 + 이 문서 경로. `mobile-app/docs/ANDROID_APP_DESIGN.md` 는 §8-2 머리 갱신 한 줄(«와이파이 1단계에 표준 프린터 EspTouch 항목 추가»).
- 안드로이드 앱 다운로드 링크 = `/download`(기존 `DownloadPage`, APK `/desktop/PurplePOS.apk`). 새 경로 만들지 않음.

### D10. 안 하는 것 (범위 밖 — 다음)
- 브라우저/Windows 용 «자동 인쇄 준비됐나» 상자(안드로이드 Readiness 의 PC 판) — 다음 건. 이번엔 D6-7 «지금 이 기기» 한 줄만.
- IP 고정 안내 금지(메모리 `feedback_auto_over_manual_setup`) — «주소가 바뀌었을 수 있음 → §4» 로만.
- 인쇄 경로·저장 자물쇠·printer_settings 모양·앱(APK) 변경 없음. DB 변경 없음. SW 버전 그대로.

---

## 3. 화면 사본 (기기별, 위→아래)

**A. Windows PC · 웹브라우저 (pc-browser) — Wi-Fi 고른 상태**
```
① 이 기기와 프린터 연결
이 기기: Windows PC · 웹브라우저                          [아니에요? ▾]
프린터는 어떻게 연결하나요?   (●) Wi-Fi  추천 — PurpleHere 표준 프린터   ( ) LAN 케이블   ( ) USB
 1  프린터를 매장 Wi-Fi 에 붙이기 — 기종마다 방법이 다릅니다
    ┌ PurpleHere 표준 프린터 (셀프테스트에 «WIFI distribution network method» 가 있으면 이 방법) — EspTouch 5단계 … [Google Play 열기]
    ├ Epson TM … ├ Star … ├ 다른 기종 … └ LAN 포트도 있으면 랜선이 더 쉽습니다
 2  셀프테스트 종이로 IP 확인 (WIFI IP 192.168.x.x)
 3  이 PC 에 프린터 등록 — A 영어·말레이어 메뉴만: IP 로 / B 한글·중문·로고: 드라이버 + 이름 KITCHEN (권고 B)
 4  인쇄 도우미 설치 → 연결 확인 → Find Printers      [기존 QZ 3단계 블록이 바로 아래]
 5  §2 에서 자리마다 프린터 고르기 → Test
 6  주방 자동 인쇄 켜기 · POS 2대 이상이면 «이 기기에서 사용»
 7  이 PC 와 Purple 탭을 켜 두기
[QZ 3단계 블록: 1 설치(Windows/macOS) · 2 Check Connection · 3 Find Printers · 상태 줄]
▸ PurpleHere 표준 프린터 — 추천 기종
▸ 프린터 2대(계산대 + 주방) · 기기가 여러 대일 때
```
**B. Purple POS 안드로이드 앱** — 지금 첫 카드(연결 방식 → PLAN → 안 나올 때 → 준비 상자) 위에 «이 기기: Purple POS 안드로이드 앱» 줄, 아래에 두 아코디언. Wi-Fi 1단계 소목록 맨 위 = 표준 프린터 EspTouch. 둘째 카드(등록 카드) 그대로.
**C. Purple POS Windows 앱** — A 와 같되 4번이 «앱이 직접 인쇄 — 목록 자동» 띠, QZ 블록 없음, Find Printers 블록 유지.
**D. 안드로이드 태블릿 · 웹브라우저** — 기기 줄 → 권고 상자 «Purple POS 앱을 설치하면 가장 쉽습니다 — 앱이 직접 찍고 Wi-Fi 프린터를 자동으로 찾습니다 [앱 받기]» → «브라우저 그대로 쓰기(RawBT)» 접힘 → 두 아코디언.
**E. iPad** — 기기 줄 → 안내 상자 → 브라우저 인쇄 3단계 → 두 아코디언.

---

## 4. 구현 순서 (한 번에 · 빌드 1회)
1. `printDiagnostics.ts` `detectSetupDevice()`.
2. `AndroidPrinterSetup.tsx` export + 표준 프린터 항목 2곳.
3. `PrinterSetupGuide.tsx` 컴포넌트.
4. `SettingsPage.tsx` §1 재조립 · 삭제(D7) · §2 글자(D8).
5. 로케일 4언어 · `npm run i18n:verify`.
6. 문서 2곳.
7. 빌드 1회 `npm run build:dev`(자리표 안에서) → `verify-all --full` 1회.

---

## 5. 인수 체크리스트 (구현자가 실브라우저로 — 데모 매장 38 · `[as=restaurant store=38]`)
주소: `https://dev.purplehere.com/restaurant/38/settings?tab=printer` (탭 파라미터는 현재 코드 기준으로 확인)

**브라우저(실제):**
- [ ] §1 에 «어느 방식을 고를까?» 표 **없음** · Browser/RawBT/QZ 3탭 **없음** · 기기 줄 보임(«PC · 웹브라우저» — Playwright Linux UA 면 «PC»).
- [ ] 연결 방식 미선택 → 순서 없음 + «하나 고르면…» 안내. Wi-Fi 선택 → 7단계 + 1단계 안 소목록 맨 위 «PurpleHere 표준 프린터» + EspTouch 5단계 + [Google Play 열기] 가 새 탭으로 Play 검색 결과를 연다. 새로고침 뒤 선택 유지(`printer_setup_conn`).
- [ ] LAN · USB 각각 표의 단계 수·제목과 일치. USB 는 QZ 블록이 2단계로.
- [ ] «아니에요?» → 안드로이드 태블릿 선택 → 권고 상자 + [앱 받기] 가 `/download` 로 · RawBT 접힘 열림/닫힘. iPad 선택 → 안내 상자 + 브라우저 3단계, 연결 방식 고르기 **없음**. 되돌리기 가능.
- [ ] 두 아코디언 열림/닫힘 · 2대 상자 7줄 · 7번 줄이 «이 기기에서 사용» 상태를 맞게 보임(§2 에서 POS 자리 바꾸면 즉시 바뀜 — `workstation-changed` 이벤트).
- [ ] 워크스테이션이 2개 이상인 매장 상태에서 2대 상자가 **기본 펼침**(38 번에 자리가 1개면 임시로 하나 추가해 보고 지운다 — 자리 추가/삭제는 기존 버튼, 이름 `[확인용] POS2`).
- [ ] 기기 줄·연결 방식·아코디언을 아무리 눌러도 **네트워크에 `PUT /api/restaurants/38` 또는 `/settings` 가 나가지 않는다**(DevTools Network 0건) — 매장 설정 무변경 증명.
- [ ] §2 method select 옵션 3개·placeholder·팁이 쉬운 말 + 언어 전환(ko/zh/ms)에 따라 바뀐다. 값 저장은 전과 같음(옵션 고르고 PUT 본문의 `method` 값이 `browser|qztray|rawbt`).
- [ ] 설정 페이지 mount console.error 0 · ErrorBoundary 0 (sweep).

**시뮬레이션(Playwright `addInitScript` — 실제 앱은 못 돌림, 그래서 «시뮬레이션» 이라고 보고에 쓴다):**
- [ ] 안드로이드 앱: `window.__NATIVE_PRINT = {available:true, version:'0.4.1', listPrinters: async()=>['KITCHEN'], getDefaultPrinter: async()=>null, diagnostics: async()=>({})}` + `window.__NATIVE_PRINT_SETUP = {platform:'android', getState: async()=>({net:[{name:'KITCHEN',host:'192.168.0.104',port:9100}], btPermission:'granted', bonded:[]}), addNetPrinter: async()=>({ok:true}), removeNetPrinter: async()=>({ok:true}), requestBtPermission: async()=>({state:'granted'}), openSystemBluetoothSettings: async()=>({ok:true}), openAppSettings: async()=>({ok:true})}` → 기기 줄 «Purple POS 안드로이드 앱»(바꾸기 없음) · 첫 카드 PLAN 유지 · Wi-Fi 고르면 `wifiJoin` 맨 위 표준 프린터 항목 · `selfTest` 맨 위 표준 프린터 항목 · 준비 상자 있음 · 등록 카드 있음 · 두 아코디언 있음.
- [ ] Windows 앱: `__NATIVE_PRINT` 만(UA 는 그대로) → 기기 줄 «Purple POS Windows 앱» · «직접 인쇄» 띠 · QZ 설치/확인 블록 **없음** · Find Printers 블록 있음 · §2 드롭다운에 `listPrinters` 이름.
- [ ] 안드로이드 브라우저 UA(`Mozilla/5.0 (Linux; Android 13; Pad) … Chrome`) → 권고 상자 + RawBT 접힘. iPad UA → iPad 상자.
- [ ] PWA: `matchMedia('(display-mode: standalone)')` 를 true 로 흉내 → 기기 줄에 «홈 화면에 설치한 웹앱(PWA) — 인쇄는 브라우저와 같습니다».

**기계 게이트:** `check-print-guard.js` 변경 0 · `check-design-guard.js` 신규 위반 0 · `npm run i18n:verify` 0 · `verify-all --full` 통과(빌드 1회 뒤). `check-sensitive-diff.js` → 비대상이어야 함(UI·문구만). Fable 게이트(gate) **비대상** — 보호파일·돈·보안 경계·마이그 없음. 그래도 완성 화면 UX 점검 1회(공용 기준 ④ «새 화면 완성 점검»)는 받는다 — 구현 뒤 스크린샷 5장(A~E) 과 이 체크리스트 결과를 Fable 에 넘긴다.

---

## 6. 구현자가 확인해야 할 외부 사실 (설계가 못 박지 못한 것 — 사실 그대로 보고)
- ~~Google Play 검색 URL~~ → **실측 결과(Opus 2026-11-08):** Play 에 Espressif 공식 EspTouch 없음(첫 결과 = KhoaZero123 개인 앱, 그 외 Espressif 의 다른 Provisioning 앱들). 공식 안드로이드 = GitHub `EspressifApp/EsptouchForAndroid` v2.4.0 APK(라이선스 Espressif MIT · Fable 이 URL 200 확인) · 공식 iOS = App Store id1071176700(판매자 Espressif Systems Shanghai · 200 확인). → §D4 1단계를 위처럼 **확정**. 인수 체크리스트에 추가: [ ] EspTouch 1단계에 버튼 2개(App Store · APK) · Play 버튼 없음 · 두 링크가 새 탭으로 열림.
- APK 를 우리 `/desktop/` 에 다시 호스팅하지 **않는다**(배포 산출물·버전 관리가 늘고, 라이선스 표기 의무가 생김). GitHub 릴리즈 링크 그대로. 나중에 Purple POS 앱 자체에 SmartConfig(Espressif 라이브러리 MIT)를 넣는 것은 별건(앱 심사 포함) — 다음.
- EspTouch 앱의 버튼 글자(«Password» · «Device count» · «Confirm» · 탭 «EspTouch»/«EspTouch V2») — Irene 설명과 Espressif 공개 앱 기준. 다르면 글자만 고친다.
- 표준 프린터 셀프테스트 FEED 짧게 누르는 시간(2초)은 일반 80mm 관행 — 실기기 1회 확인은 Irene 가 보고 «확인할 곳» 으로(할 일로 올리지 않음).

---

## 7. 보고 양식 (Opus → Fable → Irene)
«확인할 곳» 에 A~E 다섯 화면 중 실브라우저로 보이는 A·D·E 는 주소+«무엇을 볼지», B·C 는 «시뮬레이션 스크린샷 경로». 끝에 «Fable UX 점검 결과» 그대로.

---

## 8. Irene 가 정할 것 (하나)

**화면에 추천 기종 이름을 «Xprinter XP-T80B» 로 적을까요, 아니면 모델명 확정 전까지 «PurpleHere 표준 프린터(80 mm · USB + Wi-Fi)» 로만 적을까요?**
- 사실: 셀프테스트 종이에 모델명이 없고, 리포 문서의 «Xprinter XP-T80B» 가 같은 기기인지 확인된 바 없다. 틀린 모델명을 화면에 박으면 매장이 다른 프린터를 사 올 수 있다(되돌리기 어려운 쪽은 «틀린 이름»).
- **Fable 권고:** 모델명 확정 전까지 **«PurpleHere 표준 프린터(80 mm · USB + Wi-Fi 2.4 GHz)» + 셀프테스트 식별 문구**로 구현한다(로케일 키 `printer.setupGuide.std.model` 하나만 비워 둠). Irene 가 프린터 바닥 라벨의 모델명을 알려 주면 그 키만 채운다 — 구현은 이 답을 기다리지 않고 진행한다.
