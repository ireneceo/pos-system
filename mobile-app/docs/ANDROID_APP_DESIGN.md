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
