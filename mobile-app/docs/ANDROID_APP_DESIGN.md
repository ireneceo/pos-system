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

---

## 8. P0 재설계 확정 (Fable 2026-07-13 — §7과 다른 부분은 이 절이 이긴다)

> 2026-07-13 Opus 감사(P0-1~P0-5) 후 Fable 설계 게이트. 코드 실측 완료:
> `NativePrintPlugin.kt` / `PrinterRegistry.kt` / `PrinterSettingsActivity.kt` / `MainActivity.java` /
> `nativePrintBridge.js` / `capacitor.config.ts` / billPrint.js(🔒 읽기만) / SettingsPage.tsx(NativePrinterSelect) /
> desktop-pos preload+print / check-print-guard.js / check-desktop-feed.js / scripts/verify.
> **billPrint.js 및 보호파일 8개는 이번 작업에서 0줄 변경**(→ §8-5). §4 계약도 무변경.

### 8-0. 평결 요약
1. **프린터 레지스트리 = 기기 로컬 유지(정당), 단 관리 UI = 웹 Settings 페이지가 전담.** 네이티브 설정 Activity(`PrinterSettingsActivity`)는 **삭제**.
2. §4 계약(`__NATIVE_PRINT`)은 확장하지 않는다. 등록/권한 관리는 **Android 전용 별도 객체 `window.__NATIVE_PRINT_SETUP`** 로 — Windows에는 존재하지 않으므로 Windows 동작은 바이트 단위 동일.
3. P0-2~P0-5 전부 인정 + 감사에 없던 결함 4건 추가 확인(§8-4-B): printHtml 레인 설계 결함(죽은 프린터 1대가 **모든** HTML 인쇄를 막음), release URL 스왑의 Capacitor 브릿지 소실 위험, 버전 상수 드리프트 재유입(오늘 데스크탑 CTA 사고와 동일 클래스), 중복 플러그인 사본 드리프트.
4. 하드웨어 없이 "인쇄가 맞다"까지 증명 가능(V3/V4 구체 판정 = §8-6). 실기기 필요 = BT 경로 + 종이 품질 + 운영 origin 로그인·안정성뿐 — **매장 방문 1회로 묶는다.**

### 8-1. 결정 ①: 레지스트리는 어디에 사는가

**채택: (b′) 데이터는 기기 로컬(SharedPreferences) 유지 + 관리 UI는 웹 Settings 페이지.**

레지스트리 데이터 자체가 필요한가 — **네트워크 프린터에 한해 필수다.** 근거(전부 🔒 보호 동작이라 우회 불가):
- billPrint는 비-IP 주소를 **이름만** 브릿지로 넘긴다(`{kind:'os', printerName}` — billPrint.js:806, 253).
- 한글 보존 경로(printHtml)는 **IP 주소를 거부**한다(billPrint.js:730-733). 즉 한글 티켓을 찍으려면 주소가 이름이어야 하고, 이름→IP 해석이 기기 어딘가에 있어야 한다.
- Windows도 사실 동일 구조다: `printer_settings`(공유, 역할→이름) + **OS 스풀러(기기 로컬, 이름→물리 전송)**. OS 프린터 "KITCHEN"은 PC마다 제어판에서 따로 잡는다. Android 레지스트리는 그 스풀러의 대체물 — **이원화가 아니라 Windows와 같은 2층 모델.**
- 드리프트 걱정(오늘 CTA 사고 클래스)은 데이터가 **서로소**라 성립하지 않는다: printer_settings는 "어느 역할이 어느 이름"만, 레지스트리는 "그 이름이 이 기기에서 어느 IP/MAC"만 갖는다. 겹치는 값이 없다. 게다가 기존 `NativePrinterSelect`가 이미 저장된 이름이 listPrinters에 없으면 **savedButUndetected 경고를 띄운다**(SettingsPage.tsx:668) — 드리프트가 나면 화면에서 보인다.
- 서버측(printer_settings에 host 필드 추가) 대안 기각: billPrint가 이름만 넘기므로(🔒) 플러그인이 직접 API를 불러야 함 → 네이티브에 인증·fetch·캐시가 생기는 새 실패 모드 + Windows와 비대칭 + "설정은 웹이 단일 진실, 네이티브에 설정 저장 금지"(DESKTOP §8-4)와 충돌. 그리고 이름→IP는 본질상 기기 스코프 정보다(같은 이름이라도 기기마다 도달 가능성이 다름).

**기각: (a) 네이티브 설정 Activity.** 이유:
- **웹의 권한 게이트를 우회하는 뒷문.** "프린터 설정은 레스토랑 관리자만 변경"(CLAUDE.md 🔒 4번) + wipe 자물쇠 3개가 전부 웹에 산다. 현재 Kotlin Activity는 무인증으로 프린터 추가/삭제/기본지정이 가능하다.
- 자유입력 "Name (must match POS printer name)" 폼 = 손으로 이름을 맞추는 드리프트 유발 패턴 그 자체.
- 영어 하드코딩(i18n 4개 언어 불가), RA 디자인 표준 밖, 수정마다 APK 재배포 필요(웹이면 웹 배포로 끝).
- 설정 화면 이원화(웹 Settings + 네이티브 Activity 두 개의 문) — 금지된 클래스.

정밀 교정 한 가지: 감사 P0-1의 "`exported=false`라 열 수 없다"는 부정확 — 같은 앱 내 `startActivity`는 exported와 무관하게 동작하고, 실제 갭은 **JS 노출 + 호출부 부재**뿐이다. 어쨌든 결론(등록 경로 전무)은 동일하고, 해법은 Activity 노출이 아니라 삭제다.

### 8-2. 결정 ②: 계약 — §4 무확장, Android 전용 `__NATIVE_PRINT_SETUP`

`__NATIVE_PRINT`(7메서드 + available/version)는 **한 글자도 안 바뀐다.** billPrint.js는 SETUP 객체를 절대 읽지 않는다(읽는 곳 = SettingsPage뿐 — 비보호 파일). Windows는 이 객체를 주입하지 않으므로 Windows 앱/웹 동작은 바이트 동일.

`nativePrintBridge.js` IIFE가 함께 주입하는 Android 전용 객체:
```typescript
window.__NATIVE_PRINT_SETUP = {
  platform: 'android',
  getState(): Promise<{ btPermission:'granted'|'denied'|'denied_forever'|'not_needed',
                        net:[{name,host,port}], bonded:[{name,mac,likelyPrinter:boolean}],
                        defaultPrinter:string|null }>,
  addNetPrinter({name,host,port}): Promise<{ok,error?}>,   // upsert by name(case-insens.)
  removeNetPrinter(name): Promise<{ok,error?}>,
  setDefaultPrinter(name|null): Promise<{ok,error?}>,
  requestBtPermission(): Promise<{state}>,                  // Capacitor @PermissionCallback 경유(P0-3 해결)
  openSystemBluetoothSettings(): Promise<{ok}>,             // ACTION_BLUETOOTH_SETTINGS 인텐트
  openAppSettings(): Promise<{ok}>                          // denied_forever 시 안내용
};
```
- 웹 쪽 소비자 = SettingsPage.tsx 단 1곳: `__NATIVE_PRINT_SETUP` feature-detect 시 프린터 섹션에 "이 기기의 프린터(태블릿)" 카드 렌더 — 네트워크 프린터 추가/삭제 목록, 페어링된 BT 목록(+ "블루투스 설정 열기" 버튼), BT 권한 상태/요청 버튼. 프린터 **선택**은 기존 `NativePrinterSelect` 드롭다운이 이미 처리한다(listPrinters → address=이름 저장, MIN Cafe 패턴 그대로) — 새 선택 UI 불필요.
- Android에서는 드롭다운의 "이 PC 기본 프린터(자동)" 옵션(`__DEFAULT__` → method='browser')을 숨긴다 — Android의 browser 인쇄 = 시스템 인쇄 다이얼로그(PDF)라 매장 사용 불가. 항상 이름 지정. (§4의 기본프린터 해석 자체는 계약대로 유지.)
- 카드 접근은 페이지 자체의 역할 게이트(레스토랑 관리자)와 wipe 자물쇠를 그대로 상속 — 별도 보안 작업 불필요.

### 8-3. 결정 ③: 블루투스 페어링/선택 UX
- **페어링 = Android 시스템 설정**(bonded만, 스캔 없음 → 위치권한 불필요, §7-4 유지). 웹 카드의 "블루투스 설정 열기" 버튼이 시스템 화면으로 보낸다. 앱 안에 자체 스캐너/페어링 UI를 만들지 않는다(정석: OS가 하는 일은 OS에).
- 페어링된 프린터는 `listPrinters()`에 **BT 기기 이름**으로 자동 등장 → 매장은 그 이름을 기존 드롭다운에서 고름 → `printer_settings.address = <BT 이름>`(또는 MAC — resolve가 둘 다 매칭, PrinterRegistry.kt:94-96). 즉 "BT 프린터가 printer_settings가 참조할 이름이 되는" 경로 = bonded 이름 그대로, 등록 절차 0.
- bonded 목록에는 헤드셋 등 잡기기도 섞인다 → `BluetoothClass` major IMAGING(0x600)이면 `likelyPrinter:true`로 표시·상단 정렬하되 **하드 필터는 금지**(싸구려 프린터가 클래스를 엉터리로 보고하는 사례 흔함).
- 권한: 앱 시작 시 선요청 제거(현재 `load()`의 `ensureBtPermissionRequested` — 맥락 없는 첫 실행 팝업). 요청 시점 = Settings 카드의 명시 버튼 or 첫 BT 인쇄 시. Capacitor `requestPermissionForAlias` + `@PermissionCallback`으로 결과를 받아 상태 반환(P0-3 근본 해결). 2회 거부(denied_forever) → 카드가 `openAppSettings()` 안내.

### 8-4. P0 수정 명세

**A. 감사 P0 인정분**
- **P0-2 (LAN 타임아웃):** `Socket(t.host, t.port)`(NativePrintPlugin.kt:203) → `Socket().connect(InetSocketAddress(host,port), 5000)` + `soTimeout=10000`. §4 계약값(5s/20s) 준수. 판정 = V3-6.
- **P0-3 (BT 권한):** §8-3 방식으로 대체. `BT_PERMISSION` 에러는 유지(billPrint 실패 처리 그대로).
- **P0-4 (diagnostics shape):** §4 일치로 교정 — `{ platform:'android', appVersion: BuildConfig.VERSION_NAME, printers, defaultPrinter }` (+ `btPermission` 추가 필드는 additive라 무해). 하드코딩 `"0.1.0"` 2곳(NativePrintPlugin.kt:173, nativePrintBridge.js:21) 제거 — App.tsx:489가 이 값을 배지로 표시한다. runQZDiagnostic의 "Electron ?" 표기는 billPrint(🔒) 소관이라 그대로 둔다(코스메틱).
- **P0-5 (release URL):** MainActivity의 `loadUrl("https://purplehere.com/pos")` 스왑(MainActivity.java:54-57) **삭제**. 이 핵은 ① release가 dev를 먼저 로드했다가 갈아타고(이중 로드) ② `allowNavigation` 없이는 외부 브라우저로 튕기며 ③ 설령 webview에 남아도 **Capacitor 런타임 주입이 설정된 server origin에 묶여 있어 새 origin에서 `Capacitor.Plugins.NativePrint`가 사라질 수 있다** — 그러면 IIFE가 조용히 리턴(nativePrintBridge.js:13)해 release에서 인쇄가 통째로 죽는다. 정석 = **빌드 시점에 URL 확정**: `capacitor.config.ts`의 `server.url = process.env.PURPLE_APP_URL || 'https://dev.purplehere.com/pos'`, release 빌드 스크립트가 `PURPLE_APP_URL=https://purplehere.com/pos npx cap sync android` 후 gradle. `allowNavigation` 불필요(단일 origin — 결제 리다이렉트 등 외부 origin 요부는 V4에서 실측 후 필요 시 최소 추가).

**B. 감사가 놓친 결함 (이번에 같이 고친다)**
1. **printHtml 레인 설계 결함(운영 위험 최상):** 현재 렌더+**전송까지** 공용 `"html"` 레인에서 실행(NativePrintPlugin.kt:122-135). Windows는 HTML이 OS 스풀러로 가서 프린터별 직렬화가 공짜였지만 Android는 HTML도 같은 LAN/BT 소켓이다. 결과: ① 죽은 KITCHEN 하나가 **빌 인쇄까지 전 HTML 인쇄를 블록**(P0-2와 결합 시 잡당 ~2분) ② 같은 프린터에 raw(레인 lan:host)와 html(레인 html)이 **동시 접속해 인터리브 가능**. 수정: **렌더는 html 레인(WebView 직렬화), 전송은 목적지 레인으로 핸드오프.** html 레인이 FIFO라 호출 순서가 목적지 레인 enqueue 순서로 보존됨(발송순서 계약 유지). 판정 = V3-5/6.
2. **버전 상수 드리프트 재유입:** gradle `versionName "1.0"` vs 하드코딩 `"0.1.0"` 2곳 — 오늘 데스크탑 CTA 사고와 동일 클래스. 단일 소스 = `BuildConfig.VERSION_NAME`(P0-4에 포함).
3. **중복 플러그인 사본:** `mobile-app/native/NativePrintPlugin.kt`가 live 사본(`android/app/src/...`)과 **이미 diff남**. `native/` 사본 삭제(단일 사본 = android/ 트리).
4. **브릿지 fail-silent:** 플러그인 부재 시 IIFE 무언 리턴 + inject 실패 시 log만 — 매장은 "인쇄만 안 되는 앱"을 본다. V4-1이 상시 게이트로 잡고, Settings 진단 카드(getState 실패 = 브릿지 부재 표시)가 현장 신호. 추가로 MainActivity와 plugin `load()` 양쪽의 이중 주입 리스너는 MainActivity 1곳으로 정리(IIFE 멱등이라 무해했지만 단일화).

### 8-5. 절단면 (파일 단위 — 이 목록 밖 변경 = 반려)

**변경 (mobile-app/):**
- `android/.../NativePrintPlugin.kt` — §8-4 전부 + SETUP 메서드군 + `openPrinterSettings` 삭제
- `android/.../PrinterSettingsActivity.kt` — **삭제** / `AndroidManifest.xml` — activity 엔트리 삭제
- `android/.../MainActivity.java` — release loadUrl 블록 삭제, 주입 리스너 단일화
- `capacitor.config.ts` — `server.url` env 분기 / `android/app/build.gradle` — signingConfig + versionName 규율
- `src/nativePrintBridge.js` — SETUP 객체 노출, version을 diagnostics에서
- `native/NativePrintPlugin.kt` — 삭제(중복 사본)
- `scripts/build-release.sh`(신규) + `scripts/verify/*` 하니스 완성(§8-6)

**변경 (dev-frontend/): `src/pages/Settings/SettingsPage.tsx` 단 1파일** — §8-2 카드 + Android에서 `__DEFAULT__` 숨김 + i18n 키(en/ko/zh/ms 4언어). (A4 단계에서 `PwaInstallContext.tsx` — P0 아님.)

**변경 (dev-backend/):** `scripts/check-mobile-feed.js`(신규, §8-7 — 배포 단계에서).

**불가침 (0줄 — print-guard 8/8 그대로, --bless 불필요):** `billPrint.js` · `useAutoPrintPoller.ts` · `stationEnrichment.js` · `orderTotals.js` · `MainLayout.tsx` · `KitchenDisplayPage.tsx` · `POSTerminalPage.tsx` · `orders-crud.js` + `hybridKitchenPrint.ts` + 폴러/claim/발송순서 로직 일체. billPrint의 §4 소비 코드는 이미 운영 배포된 상태 그대로 재사용한다.

### 8-6. 검증 게이트 확정 (§7-6의 V3/V4를 이 판정으로 구체화)

셋업: 호스트에서 `fake-printer.js` 2대(:9100=KITCHEN, :9101=BAR), 에뮬레이터 → `10.0.2.2`. `__NATIVE_PRINT_SETUP.addNetPrinter`로 등록. cdp-eval의 `exprFile`들(현재 부재 = 하니스 미완)을 리포에 커밋해 재현 가능하게.

**V3 — 가짜 프린터 바이트 판정 (전부 PASS여야 통과):**
- **V3-1 raw 바이트 동일성:** 실제 티켓 ESC/POS(한글 포함) + 바이너리 엣지(0x00~0xFF 샘플)를 base64로 `printRaw` → 캡처 bytes ≡ `Buffer.from(data,'base64')` (sha256 일치). lan 직접 + `{kind:'os',printerName:'KITCHEN'}` 이름 경유 둘 다. QZ도 base64 디코드 바이트를 그대로 쏘므로 이것이 곧 "QZ 경로와 바이트 동일" 증명. *(주의: 바이트 동일성 판정은 raw/드로어에만 유효 — printHtml은 Windows=OS 드라이버 래스터, Android=WebView 래스터라 바이트가 다른 게 정상. HTML은 구조 판정 + 종이 확인.)*
- **V3-2 printHtml 구조:** 실제 `generateHTMLKitchenTicket` 산출물 인쇄 → ① 선두 `1B 40` ② `GS v 0`(1D 76 30 00) 블록 존재, xL/xH=72/0(=576px) ③ 스트립 높이 ≤256 ④ 잉크 비트수 > 임계(백지 아님) + 서로 다른 티켓 2종의 래스터가 상이(글리프 실렌더 증명) ⑤ 말미 feed+`1D 56 42 00` ⑥ copies=2 → 프레임 정확히 2회.
- **V3-3 드로어:** `openDrawer` → 캡처가 **정확히 5바이트 `1B 70 00 64 64`**, 단일 커넥션, 그 외 0바이트.
- **V3-4 명시 실패:** 미등록 이름 → `{ok:false,error:'PRINTER_NOT_FOUND'}` **그리고 어느 가짜 프린터에도 0바이트**. 빈 이름+기본 미지정 동일. 대소문자 무시 매칭('kitchen' → KITCHEN) PASS.
- **V3-5 레인/순서:** 같은 프린터 3잡 = 도착순==호출순(시퀀스 마커). 동시 BAR 잡은 KITCHEN 큐를 기다리지 않음.
- **V3-6 죽은 프린터 격리(P0-2+§8-4-B1 판정):** DEAD=10.255.255.1 등록 → DEAD에 printHtml 직후 KITCHEN에 printHtml: DEAD는 ≤6s 내 `{ok:false}`, KITCHEN 잡은 <3s 도착(블록 안 됨).
- **V3-7 레지스트리 왕복:** add → listPrinters 반영 → remove → PRINTER_NOT_FOUND. 앱 재시작 후 잔존(SharedPreferences).

**V4 — 에뮬레이터 E2E (dev, 데모 매장 rid=38):**
- **V4-1 브릿지 존재(상시 게이트):** 실 페이지에서 `Capacitor.Plugins.NativePrint` 정의 + `__NATIVE_PRINT` 7메서드 + `available===true` + `__NATIVE_PRINT_SETUP` 존재.
- **V4-2 진단 계약:** `diagnostics().appVersion === <gradle versionName>` (상수 드리프트 게이트).
- **V4-3 폴러 전 구간:** printer_settings 주방 프린터 address='KITCHEN' 설정 → 결제 주문 생성 → 폴러 claim → 가짜 프린터에 **정확히 1잡**(60s 내 중복 0) + pending-print 소진. +Round → 잡 정확히 +1.
- **V4-4 무언 성공 없음:** address='GHOST' → 어디에도 0바이트 + printed 스탬프 없음(재시도 arm 유지).
- **V4-5 release 파이프라인:** `PURPLE_APP_URL=dev` 로 빌드한 **서명 release APK**가 V4-1 통과(디버그 전용 검증 금지) + 운영용 APK의 `assets/capacitor.config.json`에 `https://purplehere.com/pos` 포함을 정적 검사.

**"하드웨어 없이 인쇄가 맞다" 선언 기준:** V1·V2 + V3-1~7 + V4-1~5 전부 PASS + `check-print-guard.js` 8/8 무변경 + `health-check.js --category=print` PASS + `npm run build:dev` 후 verify-all(--full, SettingsPage 변경분 mount).

#### 8-6-1. 구현된 V4 하니스가 위 설계와 다른 점 (2026-07-13, 실행하며 드러난 것)
> V4 가 3회 연속 실패했는데 **원인은 전부 게이트 쪽**이었다. 설계가 못 짚은 부분을 여기 박아둔다 — 다음 사람이 같은 함정에 빠지지 않도록.

- **매장은 스테이션 프린터를 쓴다 — 마스터 주소만 설정하면 앱은 그리로 안 찍는다.** `billPrint.printKitchenTicketViaRawBT` 는 `kitchenStationPrinters` 가 하나라도 있으면 마스터(`kitchenPrinter.address`)를 **아예 건너뛴다**. 데모 매장엔 스테이션 2개가 'BAR' 로 잡혀 있어, 'KITCHEN' 만 등록한 하니스는 **미등록 프린터로 인쇄를 시도하고 0바이트**를 받았다(= "앱이 못 찍는다"로 오보고). → 하니스는 **판정 대상 설정을 전부 명시**(마스터+스테이션)하고, **앱이 실제로 읽는 API GET 으로 되읽기 검증**한다. 실매장 표준 경로인 **스테이션 라우팅 판정(V4-6)** 을 추가: 가짜 프린터 2대(9100=KITCHEN, 9101=KQ1)로 **스테이션 1장 + 마스터 0장** — "티켓이 나왔나"가 아니라 "**옳은 프린터로** 나왔나".
- **`needs_print` 스냅샷으로 티켓 유실을 판정하면 안 된다.** `print-claim` 이 인쇄 **시작** 시점에 `needs_print=0` 을 만든다 → "인쇄 중"과 "인쇄됐다고 도장 찍음"이 구분되지 않아, 정상 동작을 **티켓 유실로 오탐**했다. 판정은 **품목 `printed_at`**(PATCH `/printed` 만 찍는다) + **폴러가 재무장할 때까지 대기** 후.
- **AVD 는 GMS 없는 AOSP 이미지(`purplepos-ci`).** google_apis 이미지는 메모리 압박에서 GMS 가 ANR→사망하며 **앱을 함께 kill** 한다(`Killing ...: depends on provider ...FontsProvider in dying proc com.google.android.gms.persistent`) → "bridge timeout" 으로 보인다. 게이트에 필요한 건 WebView 이지 Google Play 가 아니다.
- **에뮬레이터는 RSS 약 4.5GB — 서버를 굶긴다.** dev-backend·MySQL·PlanQ 가 같은 7.9GB 박스에 산다. V3·V4 는 **가용 3GB 미만이면 기동을 거부**한다(fail-loud). 에뮬레이터 실행 중 프론트 빌드 등 동시 실행 금지.
- **게이트는 데모 매장 프린터를 실제로 갈아끼운다 → 모든 종료 경로에서 원복.** 중단된 실행이 매장 스테이션 설정을 지운 채 남긴 사고가 실제로 났다. 크래시·SIGINT/TERM/HUP 전부에서 설정 원복 + 테스트 주문 정리.
- **설정 API 로는 스테이션 프린터를 지울 수 없다**(`utils/settingsGuard` 가 빈 맵/키 누락을 "미로드"로 보고 보존 — thefire wipe 사고 자물쇠). 의도된 동작이므로 하니스 픽스처만 **DB 직접 쓰기**로 만든다.

**2026-07-15 추가 (Fable 검증 — V3 13/13 PASS 달성 과정에서 확정된 함정 4개):**
- **웹앱은 PWA — 첫 설치 후 SW 가 페이지를 1회 강제 리로드한다**(`index.tsx` controllerchange → reload). 브릿지가 보이자마자 판정을 시작하면 리로드가 실행 컨텍스트를 파괴해 초반 표현식이 undefined 로 증발(→ "브릿지 없음"으로 오보고)하고, 프린터 등록이 증발해 이후 전부 정직한 PRINTER_NOT_FOUND(10/13 실패 시그니처). → 브릿지 대기 식이 `performance.now() > 45000` 을 함께 요구(리로드 시 uptime 리셋 = 자가 증명). **Opus 세션의 "독립 스크립트는 브릿지를 보는데 하니스는 못 본다" 모순의 주범이 이 타이밍이었다.**
- **신선한 에뮬레이터의 첫 내비게이션은 게스트 네트워크 준비와 경합** — 실패하면 WebView 가 `chrome-error://chromewebdata` 에 **영구 정지**(재시도 없음). 페이지 타깃 체크는 통과한 뒤라 "브릿지 타임아웃"으로 보인다. → 브릿지 폴에서 chrome-error 감지 시 `am force-stop` + `am start` 재기동(최대 4회).
- **게이트 동시 실행 = 파국.** 두 실행이 같은 adb/에뮬레이터/포트를 공유하고, 지는 쪽 cleanup 의 `adb emu kill` 이 이기는 쪽 에뮬레이터를 죽인다(PASS 하던 V3 로그가 실패 로그로 덮이고, 부팅 중인 V4 가 살해당함). 배경 실행 래퍼가 같은 명령을 재실행하는 사고가 실제로 났다. → `/tmp/purple-android-gate.lock` 단일 인스턴스 락(V3·V4 공유, stale pid 자동 해제, cleanup 에서 해제).
- **dev-backend models 의 자체 SIGTERM/SIGINT 핸들러가 DB 풀을 즉시 닫는다** — 게이트의 (async) 매장 원복이 그 밑에서 "ConnectionManager was closed" 로 죽어 픽스처가 매장에 남는다(4am 백업 `/var/backups/dev-db/daily/` 에서 수동 복구했음). → require(models) 직후 해당 시그널 리스너 전부 제거 후 게이트 핸들러만 재등록. 그 외: 중단된 실행이 남긴 fake-printer 가 포트를 물고 있으면 새 스폰이 조용히 EADDRINUSE 로 죽어 "0바이트" 오판 → 기동 전 `pkill -f verify/fake-printer.js`.

**V4 진단 확정(2026-07-15, print-trace + DB 직접조회로 측정) — 순차 블로커 2개:**

V3 = 13/13 PASS. V4 는 두 개의 별개 블로커가 순차로 겹쳐 있었다. **블로커 #1 은 측정으로 확정·수정됨(하니스), #2 는 특성만 규명(추가 측정 1회 필요).**

- **블로커 #1 = 자동인쇄 백로그 컷오프의 조용한 DISMISS (확정·수정).** 원 증상("claim 되는데 0바이트")의 정체. 측정 근거:
  - run5(수정 전): `needs_print=false, print_claimed_at=NULL, printed_at=0, 0바이트, print-trace 0` = **print-dismiss** 시그니처(claim 은 `print_claimed_at=NOW`, dismiss 는 `NULL` — 이 필드가 둘을 가른다). billPrint 는 아예 호출 안 됨(trace 0).
  - 원인: 백로그 컷오프(`_ordMs < kitchenAutoPrintEnabledAt`, MainLayout.tsx:1370 / useAutoPrintPoller.ts)는 autoPrint 켠 시각 이전 주문만 인쇄 제외하는 **OFF→ON 폭주 방지 게이트(=정상 앱 동작)**. 하니스가 `/pos` 를 여러 번 reload 하는데, 매 reload 마다 폴러 첫 tick 이 그 스탬프를 재무장 → "폴러 재무장 시각" vs "테스트 주문 생성 시각" 관계가 비결정적 → 주문이 컷오프 반대편에 떨어져 backlog 로 dismiss.
  - **반증된 오답: 시계 스큐(측정 0~±1s, 무관) · 네이티브 라우팅(dismiss 케이스는 billPrint 자체가 실행 안 됨).**
  - **수정(하니스 전용, 앱 무변경):** `reloadAndWaitForPrinter` 말미에 `kitchenAutoPrintEnabledAt='1'`(=오래전부터 autoPrint ON = 정상 매장 상태) 고정. 폴러는 이 키를 매 tick 재독하고 값이 있으면 덮어쓰지 않으므로 고정 유지 → 어떤 테스트 주문도 backlog 아님. 시계/타임존/tick 레이스 완전 면역.
  - **효과 확인(run7):** 시그니처가 `print_claimed_at=NULL → SET` 으로 뒤집힘 = dismiss 소멸, 주문이 **실제 claim** 됨.

- **블로커 #2 = claim 은 되는데 0바이트 + printed_at 0 + route-qz/html trace 0 (특성 규명, 미확정).** #1 을 고치니 드러난 별개 문제. run7 측정: `print_claimed_at` 이 하트비트로 갱신되는 상태(=인쇄 진행중/보류) + 가짜프린터 0바이트 + `_printTrace` 전무. 즉 폴러가 claim 후 `printKitchenTicketViaRawBT` 를 호출했으나 **billPrint 의 네이티브 발송(sendTicketAutoFormat/sendHTMLViaQZTray→`__NATIVE_PRINT`) 지점에 도달한 흔적이 없다.** 코드상 데모매장 method='qztray'(setKitchen)→`shouldUseQZTray('kitchen')`=true→route-qz trace 가 떠야 하는데 안 뜸 = 코드 예측과 실측이 불일치. **미해결 모순.**
  - 다음 측정(에뮬 1회): 폴러 인쇄 경로에 **_printTrace 독립 로그**(console→서버 or logcat) 를 심어 ①`printKitchenTicketViaRawBT` 진입 여부 ②`getPrinterMethod('kitchen')` 실제 반환값(localStorage.printerSettings.kitchenPrinter.method) ③어느 분기(qztray/rawbt)로 갔는지 ④`__NATIVE_PRINT.printHtml` 호출·완료 여부 를 직접 찍어 확정. V3 는 printHtml 을 **CDP 직접호출**로 증명했을 뿐 **폴러→billPrint 경로**를 증명하지 않으므로, 차이는 이 경로에 있다.
  - **billPrint 수정 승인됨(Irene 2026-07-15, 브라우저 경로 바이트 불변 조건)** — #2 원인이 네이티브 분기 결함으로 확정되면 그 분기만 수정. 단 현재는 **미확정**이라 앱 무변경 유지.

**환경 주의(측정 중 확인):** full V4 게이트는 이 7.9GB 박스에서 에뮬 부팅이 ~50% 실패(모델 in-process 로드+에뮬 동시 메모리 압박). 독립 부팅은 안정(24s). 반복 재실행 대신 에뮬 1회 유지 상태에서 측정할 것.

**그래도 실기기(매장 태블릿+프린터, 방문 1회)가 필요한 것:** ① BT SPP 실전(V5 — 에뮬레이터에 BT 없음) ② 종이 품질: 한글 글리프/농도/576px 폭 정합/컷 ③ 드로어 물리 킥 ④ 실프린터의 래스터 프레이밍 수용 ⑤ 태블릿 시스템 폰트의 한글 렌더 ⑥ 운영 origin 로그인+폴러 장시간 안정 ⑦ 사이드로드 설치 UX. 전부 한 방문에 묶는다(CLAUDE.md 인쇄 프로세스 5).

### 8-7. 릴리즈·배포
- **서명키:** 사이드로드 전용 keystore 1개 생성(RSA4096, 유효 30년+), 리포 밖 `/opt/secrets/`(root 전용, 일일 백업 세트 포함), `keystore.properties`는 git-ignore. **키 변경 = 전 매장 재설치**이므로 영구 고정. Play 스토어는 안 간다(Windows 미서명 파일럿과 동일 결정).
- **버전 단일 소스 = `build.gradle` versionName/versionCode.** diagnostics.appVersion·브릿지 version·App.tsx 배지 전부 여기서 파생. 웹 소스에 APK 버전 상수 금지.
- **피드:** `build-release.sh`가 빌드 산출물에서 `latest.json`{versionName,versionCode,file,sha256,size}을 **생성**(손 편집 금지) + 항상-최신 별칭 `PurplePOS.apk` → `dev-frontend-build/mobile/`(배포 rsync가 운영 `/mobile/`로). `check-mobile-feed.js` = check-desktop-feed.js의 3불변식 미러(피드↔파일 sha 일치 / 별칭 바이트 동일 / 프론트 소스 버전 상수 0) → verify-all·배포 게이트 편입.
- **CTA(A4, P0 아님):** PwaInstallContext에 Android 분기 — `/mobile/latest.json`을 읽는다. 데스크탑과 동일 패턴, 상수 재도입 불가.
- 인앱 자동업데이트는 사이드로드 특성상 불가 — 앱이 자기 versionName과 latest.json을 비교해 넛지 배너(후속, 이것도 피드 기반).

### 8-8. 작업 순서
| 단계 | 내용 | 블로커 |
|---|---|---|
| **M1 코드 절단면** | §8-4 전부 + SETUP 브릿지 + SettingsPage 카드(i18n 4언어) + config/gradle/서명 + 중복사본 삭제 | 없음(서버) |
| **M2 게이트** | 하니스 완성(exprFile 커밋) → V1·V2 → V3-1~7 → V4-1~5 | 없음(서버, KVM 확인됨) |
| **M3 실기기 A3** | §8-6 하드웨어 목록 ①~⑦, 매장 방문 1회 | **하드웨어** (진입조건: M2 전부 PASS) |
| **M4 배포** | 피드+가드+CTA. 준비는 M3와 병행 가능, CTA 공개는 M3 PASS 후 | M3 |
