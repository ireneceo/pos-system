# Purple POS Android 앱 (Capacitor) 설계 — RawBT/태블릿 프린트앱 대체

> 작성 2026-07-02. Windows 데스크탑앱(Electron)과 **완전 대칭**. 단일 진실 = 이 문서.
> 목적: 태블릿에서 **기기마다 RawBT 따로 설치하는 고통 제거** → 앱 내장 자동인쇄(다중 프린터·자동발행).

## 0. 한 줄 요약
Capacitor 셸이 운영 웹앱(https://purplehere.com/pos)을 그대로 로드하고, **`window.__NATIVE_PRINT` 브릿지를 Android 네이티브로 주입**한다. billPrint의 P2 분기가 그 브릿지를 그대로 사용 → **프론트 코드 0줄 변경**. Windows(Electron)와 **동일한 §4 계약**을 Android가 구현하는 것뿐.

## 1. 핵심 결정 (Windows 설계 재사용)
- **D1 원격 URL 로드** — 로컬 번들 금지(origin 의존). 웹 배포 = 앱 UI 업데이트.
- **D2 `__NATIVE_PRINT` 투명 대체** — billPrint P2가 이미 feature-detect. Android가 같은 계약 주입 → 프론트 무변경.
- **D3 인쇄 구조 불변** — 폴러/claim/발송순서 그대로. 네이티브는 전송만.
- **D4 대상** — Android 7+ (태블릿 POS). RawBT 미설치로도 인쇄.
- **D5 프레임워크** — Capacitor(웹뷰 셸) + 커스텀 Android 플러그인(Kotlin).

## 2. 브릿지 계약 = Windows와 100% 동일 (§4)
`window.__NATIVE_PRINT` = { available, version, listPrinters, getDefaultPrinter, printHtml, printRaw, openDrawer, diagnostics }. throw 금지·{ok,error}·PRINTER_NOT_FOUND 명시실패·조용한폴백 없음. → billPrint 그대로 동작.

Capacitor 플러그인(`NativePrintPlugin`)이 이 메서드를 JS↔Kotlin 브릿지로 노출하고, 앱 시작 시 preload 스크립트가 `window.__NATIVE_PRINT = Plugin` 주입.

## 3. Android 네이티브 인쇄 구현 (플러그인)

### 확정 스코프 (Irene 2026-07-02): **WiFi(네트워크) + 블루투스. USB 제외.**
태블릿 = 한 기기에 WiFi/블투 프린터 2~3대(주방·바·빌). USB 직결은 대상 아님(필요 고객 생기면 추가).

### 검증 라이브러리 사용 (유지보수 최소화 — 밑바닥 구현 금지)
블투/네트워크 ESC/POS는 직접 짜지 않고 **성숙한 Android 라이브러리(DantSu `ESCPOS-ThermalPrinter-Android` 계열)** 를 쓴다 — BT SPP·TCP 네트워크·ESC/POS 래스터를 검증된 코드로 처리. Kotlin 플러그인은 그 위 **얇은 래퍼**만.

| 메서드 | Android 구현 |
|--------|-------------|
| `printRaw` (kind:'lan'/네트워크) | 라이브러리 TcpConnection(IP:9100) 또는 `java.net.Socket` — Windows LAN과 동일 |
| `printRaw` (kind:'bt') | 라이브러리 BluetoothConnection(주소=BT MAC/이름) SPP ESC/POS 직송 |
| `printHtml` | 라이브러리로 HTML/텍스트 → ESC/POS, 또는 WebView 오프스크린→비트맵→래스터 |
| `listPrinters` | 페어링된 BT 프린터 + (선택)네트워크. 각 프린터 주소 = IP(WiFi) 또는 BT-MAC |
| `openDrawer` | ESC p 펄스(`1B 70 00 64 64`)를 printRaw 타깃에 |
| `diagnostics` | platform/appVersion/발견 프린터 |

**타깃 shape·드로어펄스·base64 전부 Windows와 동일** → billPrint 무변경. 프린터 지정 = `printer_settings.address`(IP 또는 BT주소), 스테이션 라우팅 그대로 재사용.

### 유지보수 관점
- WiFi = 가벼움(윈도우와 동일 소켓). 블투 = 라이브러리 위임이라 부담 낮음. 주 유지보수 = 안드로이드 버전별 **블투 권한(BLUETOOTH_CONNECT 등) 정책 대응**(가끔·소규모).
- 화면·기능·로직은 웹 한 곳 → 앱은 인쇄 전송만, 거의 무변경.

## 4. 개발 단계
| 단계 | 내용 | 필요 |
|---|---|---|
| A0 스캐폴드 | Capacitor 프로젝트 + capacitor.config(원격 로드) + 브릿지 주입 | Node(있음) |
| A1 네이티브 플러그인 | NativePrintPlugin(Kotlin): LAN socket + USB/BT ESC/POS + listPrinters | **JDK + Android SDK** |
| A2 APK 빌드 | `cap add android` + Gradle 빌드 → 서명 APK | **JDK + Android SDK + Gradle** |
| A3 실기기 검증 | 실제 태블릿 + 실 프린터(LAN/USB/BT) 자동인쇄·자동발행 | **실 태블릿 + 프린터** |
| A4 배포 | 사내 APK 직접 배포(사이드로드) 또는 Play Store | 서명키(Play는 심사) |

## 5. 현재 상태 & 남은 작업 (정직)
- **A0 스캐폴드 = 이 폴더에 생성**(config + 브릿지 + 플러그인 스켈레톤).
- **A1~A2 = 서버에 JDK+Android SDK 설치 필요**(wine 설치와 동일 성격, GB급). 네이티브 플러그인(Kotlin) 구현.
- **A3 = 실 태블릿+프린터 필요**(Windows가 매장 PC 필요했던 것과 동일 — 서버서 불가한 유일 부분).
- 배포는 사이드로드(APK 직접 설치)면 Play 심사·서명 불필요(윈도우 SmartScreen과 유사하게 "알 수 없는 출처 허용" 1회).

## 6. 가드레일
- 인쇄 구조 불변(폴러/claim/발송순서 0접촉). billPrint P2 외 프론트 수정 금지.
- POS 코드/운영과 격리(별도 repo, `/var/www/mobile-app/`).
- 실기기 인쇄 확인 전 "완료" 금지.

---

## 7. 기본설계 확정 (Fable 2026-07-03 — 이 절이 A1 구현의 단일 기준. 변경은 Fable 재확인 필요)

> billPrint P2 호출부 실측 완료(sendHTMLViaQZTray/sendViaQZTray/openCashDrawer/getQZTrayPrinters/connectQZTray/runQZDiagnostic/StaticQR 라스터). 프론트는 **0줄 변경** — 아래는 전부 앱(플러그인) 쪽 규격.

### 7-1. 프린터 레지스트리 (Android에는 OS 스풀러가 없다 — 핵심 갭 해결)
billPrint는 비-IP 주소를 `{kind:'os', printerName}` / `printHtml({printerName})` 로 보낸다(이름 기반). Windows는 OS 스풀러가 이름을 해석하지만 Android에는 없음. → 플러그인이 **자체 레지스트리**로 이름을 해석한다:
- **목록 = 페어링된 블루투스 프린터(이름+MAC, bonded만·스캔 불필요) ∪ 앱에 등록한 네트워크 프린터(이름→IP:포트, SharedPreferences 저장)**. 데스크탑앱의 native 프린터설정 화면과 대칭인 **간단한 네이티브 설정 화면**(네트워크 프린터 이름+IP 추가/삭제, 기본 프린터 지정)을 앱에 둔다.
- `listPrinters` = 레지스트리 이름 배열(→ billPrint 프린터 선택 UI 그대로 동작). `getDefaultPrinter` = 레지스트리의 기본 지정(없으면 null).
- 이름 해석: 대소문자 무시 trim 매칭(이름 또는 BT MAC). **미스 = `PRINTER_NOT_FOUND` 명시 실패, 조용한 폴백 절대 금지**(§4 계약 동일). 빈 이름('') = 레지스트리 기본 프린터, 없으면 PRINTER_NOT_FOUND.
- 매장 설정은 그대로: `printer_settings.address` = BT 프린터 이름/MAC **또는** 앱에 등록한 네트워크 프린터 이름 **또는** raw IP(이 경우 기존 LAN raw 경로 — Windows LAN과 동일 동작·한글 제약도 동일).

### 7-2. printHtml = WebView 오프스크린 → 비트맵 → ESC/POS 래스터 (한글 보존 경로)
1. 메인스레드 오프스크린 WebView에 티켓 HTML 로드(loadDataWithBaseURL, UTF-8) → body 높이 측정.
2. 폭 = 576px(80mm@203dpi; 58mm이면 384px), 측정 높이로 Bitmap draw.
3. DantSu `EscPosPrinterCommands.bitmapToBytes` 로 **≤256px 스트립 분할** 래스터 변환 → 대상 전송(BT 또는 LAN) → 컷.
4. 타임아웃 20초 → `{ok:false,error:'TIMEOUT'}`. WebView 인스턴스는 재사용(생성비용).

### 7-3. 전송·직렬화 (Windows serialQueue 대칭 — QZ 단일큐 교훈 유지)
- 레인: `html` 단일 레인(스테이션→통합 발송순서 보존) / `lan:<host>` / `bt:<mac>` — 프린터끼리 병렬, 프린터 안에서는 직렬.
- BT = DantSu BluetoothConnection(SPP), 잡 단위 connect→write→flush→close, 레인 직렬화로 겹침 방지. LAN = TcpConnection(IP:9100, 기존 스켈레톤 유지).
- `openDrawer` = `1B 70 00 64 64` 5바이트를 printRaw와 동일 라우팅(kind:'os' 이름도 레지스트리 해석).
- 모든 메서드 **throw 금지, {ok,error}** — 스켈레톤의 ok() 헬퍼 유지.

### 7-4. 권한·매니페스트 (블투 유지보수 지점)
- API 31+: `BLUETOOTH_CONNECT`(런타임 요청 — 첫 listPrinters/인쇄 시). API ≤30: `BLUETOOTH`/`BLUETOOTH_ADMIN`(maxSdkVersion=30). **스캔 안 함(bonded만) → 위치 권한 불필요.**
- 거부 시 `{ok:false,error:'BT_PERMISSION'}`. `INTERNET` 기본. FLAG_KEEP_SCREEN_ON(태블릿 상시화면=폴러 유지), 배터리 최적화 제외 안내 1회.

### 7-5. 플러그인 등록·브릿지 주입 (스캐폴드의 미배선 갭)
- `cap add android` 후 NativePrintPlugin.kt → `android/app/src/main/java/com/purplehere/pos/mobile/` 이동, `MainActivity.onCreate`에서 `registerPlugin(NativePrintPlugin::class.java)` (super.onCreate 앞).
- 원격 URL 로드 시 Capacitor 런타임은 자동 주입되지만 **nativePrintBridge.js(IIFE)는 자동 실행 안 됨** → 플러그인 `load()`에서 WebViewListener(onPageLoaded)로 `evaluateJavascript(브릿지JS)` 주입. IIFE는 멱등, billPrint는 인쇄 시점에 lazy feature-detect라 로드후 주입으로 충분. 네비게이션마다 재주입.
- URL: **debug 빌드 = dev.purplehere.com/pos, release = purplehere.com/pos** (빌드타입 분기). 검증은 전부 dev로.

### 7-6. 하드웨어 없는 검증 (Fable 게이트 — A3 전 서버에서 끝내는 범위)
서버에 `/dev/kvm` 가용 확인(2026-07-03) → **헤드리스 에뮬레이터 실기동 가능**.
- V1 툴체인: JDK17 + Android SDK(cmdline-tools, API 34) `/opt/android-sdk` 격리 설치(~5GB, 전역 env 오염 금지 — 빌드 스크립트 내 ANDROID_HOME만).
- V2 빌드 게이트: debug+release APK 재현 빌드(Gradle wrapper) + 서명(사이드로드 키).
- V3 **가짜 프린터 바이트 캡처**: dev서버 9100 TCP 리스너(node)로 수신 바이트 캡처, 에뮬레이터(10.0.2.2) →
  ① printRaw(lan) 바이트 = 브라우저 QZ 경로와 **바이트 동일**(sendViaQZTray의 btoa 인코딩 왕복) ② printHtml = 래스터 헤더(GS v 0)+컷 존재·폭 576 ③ openDrawer = 정확히 5바이트 ④ 미등록 이름 = PRINTER_NOT_FOUND ⑤ 3잡 연속 발송순서 보존.
- V4 **E2E(종이 없는 실배선)**: 에뮬레이터가 dev.purplehere.com/pos 로드 → `__NATIVE_PRINT` shape/diagnostics 확인 → 데모 매장 주문 → **폴러 → printRaw → 가짜 프린터 수신**까지 실증.
- V5 BT 경로: 서버서 실검증 불가 — DantSu 위임 + 코드리뷰까지. **실검증은 A3**(이 부분만 하드웨어 블록).
- 게이트 통과 기준: V1~V4 전부 + dev-frontend diff 0(print-guard 8/8 무접촉) + 계약 위반 0.
