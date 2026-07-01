# Purple POS Windows 데스크탑앱 (Electron) 설계 — QZ Tray 대체

> **작성:** 2026-07-01 (Fable 5, 전체 점검 후 설계) · **지시:** Irene 2026-07-01 "네이티브 앱 개발 진행하자"
> **개발 담당:** Opus (Irene 노트북/Mac에서 개발, Windows 검증은 VM 또는 매장 실기기)
> **상태:** 설계 확정 대기 → 개발 착수

---

## 0. 한 줄 요약

**Electron 셸이 운영 웹앱(https://purplehere.com/pos)을 그대로 로드하고, QZ Tray가 하던 "브라우저 → 프린터" 전송 계층만 네이티브(IPC)로 대체한다.** 웹앱 코드 재사용률 ~99%, billPrint.js 수정은 절단면 함수 몇 개의 feature-detect 분기뿐. 인쇄 구조(POS1 폴러 단일경로)는 1도 안 바뀐다 — 바뀌는 건 "바이트를 프린터로 보내는 방법"뿐.

---

## 1. 배경 · 왜 QZ를 없애나

QZ Tray는 "브라우저는 프린터에 직접 못 보낸다"의 우회로(로컬 Java 앱 + WebSocket + 인증서 서명)다. 그 우회 자체가 반복 사고의 뿌리였다:

| QZ 문제 (실제 겪음) | 네이티브에서 |
|---|---|
| idle 시 WebSocket 끊김 → 첫 인쇄 16초 매달림 (keepalive 20s ping으로 땜빵, SW 4.33) | 앱이 OS 프린터에 직접 접근. 연결 개념 자체가 없음 |
| Win7 SHA1/SHA512 서명 핸드셰이크, "허용" 팝업 | 서명·인증서·핸드셰이크 전부 소멸 |
| Java 설치 필요 (Win7은 JRE 11 별도) | Java 불필요 |
| 프린터 이름 못 찾으면 **기본프린터로 조용히 폴백** → "성공처럼 보이는 미인쇄" (thefire BAR 사고) | 이름 불일치 시 명시적 실패 반환 가능 (미도달을 숨기지 않음) |
| QZ Tray 프로세스가 죽어있으면 인쇄 전멸 | 앱 = POS 자체. 별도 프로세스 없음 |
| 브라우저 백그라운드 탭 타이머 스로틀 → 폴러 지연 가능 | `backgroundThrottling: false` 로 폴러 항상 정속 |

---

## 2. 확정 결정 (설계의 뼈대)

### D1. 셸 방식 = **원격 URL 로드** (로컬 번들 ❌)
Electron BrowserWindow가 `https://purplehere.com/pos` (dev: `https://dev.purplehere.com/pos`)를 로드한다. 로컬 번들(`file://`/`app://`)로 가지 않는 이유 — 조사에서 확인된 origin 의존이 전부 깨지기 때문:
- IndexedDB 오프라인 DB(`purple_pos_offline`)·localStorage(auth_token 등 20+ 파일 산재)가 **origin 기준 격리** → origin 바뀌면 전부 리셋
- API 호출이 상대경로(`/api/*`, `config/api.ts`) + 쿠키 `credentials:'include'` + socket.io `/orders` 상대 네임스페이스 → 전부 same-origin 전제
- Service Worker(sw.js)의 origin 비교(line 96), 오프라인 캐시(F1) → https origin이면 Electron에서도 브라우저와 동일 작동

원격 로드면 **웹앱 무수정 + 웹 배포가 곧 앱 UI 업데이트**(SW_VERSION bump 흐름 그대로). 앱(셸) 자체 업데이트는 인쇄 계층이 바뀔 때만.

### D2. 인쇄 통합 방식 = **QZ 계층 투명 대체 (impersonation)**
프린터 설정의 `method: 'qztray'` 를 그대로 둔다. 네이티브 브릿지(`window.__NATIVE_PRINT`)가 있으면 billPrint.js의 QZ 절단면 함수들이 브릿지로 위임하고, 없으면(일반 브라우저) 기존 QZ 경로 그대로. → **설정 마이그레이션 0, 웹/PWA 기기 영향 0, 운영 웹 번들에 먼저 배포해도 안전** (브라우저에선 `__NATIVE_PRINT` undefined = 기존과 바이트 단위 동일 동작).

### D3. 인쇄 구조 불변 — 🔒 절대 가드레일
**POS1 폴러 단일경로(주문 1개 = 주인 1명)는 그대로.** 네이티브앱은 "누가/언제 찍나"를 절대 건드리지 않는다. 폴러·claim·needs_print·발송순서·통합티켓 가드 전부 웹 코드 그대로 재사용. 네이티브가 대체하는 것은 오직 **전송(transport)**: "이 HTML/이 ESC/POS 바이트를 이 프린터로" 그 한 줄. (하이브리드 다이렉트/히트비트 재도입 금지 — CLAUDE.md 🔒)

### D4. Windows 버전 = **Win10/11 전용. Win7 기기는 기존 웹+QZ 유지 (공존)**
Electron 23+는 Windows 10 이상만 지원 (Chromium이 Win7/8 지원 종료). thefire POS2 등 Win7 실기기는 네이티브앱 대상이 아니다 → **당분간 웹+QZ 경로 공존** (D2 덕에 자동 공존: 같은 매장에서 POS1=네이티브앱, POS2=브라우저+QZ 혼용 가능). 백엔드 `/api/qz-tray/*` 유지. Win7 기기의 근본 해법은 하드웨어 교체(별도 비즈니스 결정).

### D5. 프레임워크 = **Electron + electron-builder(NSIS)**
세션 결정대로 Electron. Tauri(WebView2)는 Win7 이하 완전 불가 + Rust 스택 추가라 배제. Mac에서 개발·실행 가능(Irene 노트북), Windows 인쇄 검증만 VM/실기기.

---

## 3. 아키텍처

```
┌─ Electron Main Process ──────────────────────────────────────┐
│  BrowserWindow ──loadURL──▶ https://purplehere.com/pos       │
│  │  (contextIsolation:ON, nodeIntegration:OFF,               │
│  │   backgroundThrottling:false, preload.js)                 │
│  │                                                           │
│  ├─ print/htmlPrinter.js   숨김 BrowserWindow에 티켓 HTML    │
│  │                         렌더 → webContents.print(silent,  │
│  │                         deviceName) — 한글=Chromium 렌더  │
│  ├─ print/rawLan.js        net.Socket → IP:9100 ESC/POS 직송 │
│  ├─ print/rawWindows.js    OS 등록 프린터에 RAW 바이트       │
│  │                         (winspool WritePrinter,           │
│  │                          PowerShell Add-Type 헬퍼)        │
│  ├─ display/customer.js    고객 디스플레이 창 → 2번 모니터   │
│  └─ updater.js             electron-updater (generic, 정적)  │
└──────────────────────────────────────────────────────────────┘
        ▲ IPC (invoke/handle)
┌─ preload.js ─────────────────────────────────────────────────┐
│  contextBridge.exposeInMainWorld('__NATIVE_PRINT', {...})    │
└──────────────────────────────────────────────────────────────┘
        ▲ feature-detect
┌─ 웹앱 (기존, 원격 로드) ─────────────────────────────────────┐
│  billPrint.js 절단면 함수들만 분기 — 나머지 4,000줄 무수정   │
│  폴러/claim/라우팅/렌더/설정/오프라인 전부 기존 그대로       │
└──────────────────────────────────────────────────────────────┘
```

**중요 원칙:** 설정(어느 프린터, 자동인쇄, 스테이션 매핑)은 지금처럼 웹앱 localStorage + DB `printer_settings`가 단일 진실. 네이티브 쪽에는 설정을 두지 않는다(설정 이원화 금지 — wipe 사고 계열 예방).

---

## 4. 네이티브 브릿지 API 스펙 (`window.__NATIVE_PRINT`)

preload에서 contextBridge로 노출. **모든 메서드는 절대 throw하지 않고 `{ok, error?}` 반환** (billPrint의 boolean 계약과 맞춤).

```typescript
interface NativePrint {
  available: true;
  version: string;                     // 앱 버전 (진단용)

  listPrinters(): Promise<string[]>;               // OS 프린터 이름 목록
  getDefaultPrinter(): Promise<string | null>;

  // HTML pixel 인쇄 (기존 sendHTMLViaQZTray 대체) — OS 등록 프린터 전용
  printHtml(job: {
    html: string;                      // 완성된 티켓 HTML (기존 렌더러 산출물 그대로)
    printerName: string;               // ''이면 기본 프린터
    widthMm?: number;                  // 용지폭 (기본 80mm 계열, 기존 QZ config 대응)
    copies?: number;                   // 매수 (station copies 대응, 기본 1)
  }): Promise<{ ok: boolean; error?: string }>;

  // RAW ESC/POS 인쇄 (기존 sendViaQZTray 대체)
  printRaw(job: {
    data: string;                      // base64 인코딩 바이트 (기존과 동일 인코딩)
    target:
      | { kind: 'lan'; host: string; port: number }   // net.Socket 직송
      | { kind: 'os'; printerName: string };          // winspool RAW ('' = 기본)
  }): Promise<{ ok: boolean; error?: string }>;

  // 캐시드로어 (ESC p pulse). billPrinter 대상으로 발송
  openDrawer(target: /* printRaw와 동일 target */): Promise<{ ok: boolean; error?: string }>;

  diagnostics(): Promise<{
    platform: string; appVersion: string; electron: string;
    printers: string[]; defaultPrinter: string | null;
  }>;
}
```

계약 사항:
- **프린터 이름 불일치 = 명시적 실패.** `printerName`이 OS 목록에 없으면 `{ok:false, error:'PRINTER_NOT_FOUND'}` — QZ처럼 기본프린터로 조용히 폴백하지 **않는다** (thefire BAR "성공처럼 보이는 미인쇄" 재발 방지). 빈 문자열('')만 명시적 기본프린터 의미.
- `printHtml`은 숨김 BrowserWindow 풀에서 순차 처리(내부 큐 직렬화) — QZ 한 줄 큐에서 배운 것: **발송 순서는 호출 순서를 보존**해야 한다(스테이션 먼저 → 통합 뒤, SW 4.34 결정 유지). 단 LAN raw와 HTML 큐는 분리해도 된다(서로 다른 물리 프린터).
- 타임아웃: LAN 소켓 connect 5초 / HTML 렌더+스풀 20초. 초과 시 `{ok:false}` — 호출측(billPrint)의 기존 실패 처리(print-rearm 등)가 그대로 작동.

---

## 5. billPrint.js 절단면 (🔒 보호 파일 — 정확히 이만큼만)

> 이 수정은 **Irene 명시 지시(네이티브앱)에 따른 정식 인쇄 변경**. 절차: 구현 → dev 검증 → **실프린터 종이 확인** → `check-print-guard.js --bless`. 브라우저에선 분기 자체가 죽은 코드(undefined check)라 웹 동작 불변.

패턴 (모든 절단면 동일):

```javascript
const _np = typeof window !== 'undefined' && window.__NATIVE_PRINT;
if (_np) { /* 브릿지 위임 */ } else { /* 기존 QZ 코드 무수정 */ }
```

| # | 함수 (billPrint.js) | 라인(현재) | 네이티브 분기 |
|---|---|---|---|
| 1 | `sendHTMLViaQZTray(html, printerName, opts)` | ~670 | `_np.printHtml({html, printerName})` + `opts.drawerPulse`면 이어서 `_np.openDrawer()` |
| 2 | `sendViaQZTray(escpos, printerAddress)` | ~724 | 기존 IP 정규식 그대로 판정 → lan/os target 구성 → `_np.printRaw({data: base64, target})` (base64 인코딩 라인 재사용) |
| 3 | `connectQZTray()` | ~373 | `return true` (연결 개념 없음. keepalive `_startQZKeepalive` 시작 안 함) |
| 4 | `isQZTrayConnected()` / `disconnectQZTray()` | ~595/585 | `true` / no-op `true` |
| 5 | `getQZTrayPrinters()` | ~603 | `_np.listPrinters()` |
| 6 | `openCashDrawer()` | ~233 | qztray 분기에서 `_np.openDrawer(target)` (2번과 같은 target 판정) |
| 7 | `printTableQR()` 내 직접 `qz.print()` (LAN raster) | ~3226 | QR canvas → ESC/POS raster(GS v 0) 변환을 렌더러 유틸로 추가 후 `_np.printRaw` (직접 qz.print 유일 잔존처) |
| 8 | `runQZDiagnostic` 류 (Settings 진단) | SettingsPage 경유 | `_np.diagnostics()` 결과로 대체 표시 |

**건드리지 않는 것 (전부 그대로):** `printBillViaRawBT` / `printKitchenTicketViaRawBT` / `printKitchenTicketsByStation` / `sendUnifiedTickets`(통합 atomic claim) / 취소 줄긋기 / 회차(order_group) 스코프 / mirror / emergencyMode / RawBT 경로 / browser 경로 / `useAutoPrintPoller` / MainLayout `_printPollFn` / orders-crud — **0줄 수정**.

참고: `consolidatedTicket.ts`에도 직접 qz.print가 있으나 **미사용 경로**(sendUnifiedTickets가 실경로) — 수정하지 않는다.

---

## 6. Main process 인쇄 구현 스펙

### 6-1. HTML pixel (`print/htmlPrinter.js`)
1. 숨김 BrowserWindow(재사용 풀 1개, `show:false`) 에 `loadURL('data:text/html;charset=utf-8,...')` 또는 `webContents.loadURL` + 완료 대기.
2. `webContents.print({silent:true, deviceName, margins:{marginType:'none'}, pageSize:{width: widthMm*1000, height: 자동}}, cb)` — 콜백 성공/실패를 `{ok}`로.
3. 잡 단위 직렬 큐(호출 순서 = 발송 순서). 연속 티켓(스테이션 3장 등)도 순서 보존.
4. 한글: Chromium이 OS 드라이버로 픽셀 렌더 → QZ HTML pixel과 동일 원리. **폰트가 서버 웹폰트면 숨김 창에서도 로드됨(원격 origin CSS 그대로)** — 단, 기존 티켓 HTML이 inline style 기반이므로 대부분 무의존.

### 6-2. LAN raw (`print/rawLan.js`)
`net.Socket` → `connect(port, host)` (기본 9100) → base64 decode한 Buffer write → end. connect 5초/전체 10초 타임아웃. QZ의 host/port raw와 동일 결과, 중간층 제거.

### 6-3. OS 프린터 raw (`print/rawWindows.js`) — 캐시드로어·이름지정 ESC/POS용
Windows에서 이름 지정 프린터에 RAW datatype 쓰기. **네이티브 모듈(node-printer류) 금지** — 빌드/유지보수 리스크. 대신 PowerShell `Add-Type` C# winspool 헬퍼(OpenPrinter → StartDocPrinter(RAW) → WritePrinter) 스크립트를 앱에 번들, `child_process.execFile('powershell', ...)`로 호출. 바이트는 임시파일(`app.getPath('temp')`) 경유. Mac 개발 중엔 이 경로만 스텁(`{ok:false, error:'WIN_ONLY'}`) — 드로어는 Windows 검증 항목.

### 6-4. 고객 디스플레이 (`display/customer.js`)
현 웹 `customerDisplay.ts`는 `window.open()` + Window Management API(getScreenDetails) 사용. Electron에선 `mainWindow.webContents.setWindowOpenHandler`로 해당 window.open을 가로채 **2번 모니터에 fullscreen BrowserWindow** 배치(`screen.getAllDisplays()`). 웹 코드 무수정으로 동작하는 것이 목표 — getScreenDetails 미지원이어도 open 자체는 성공하므로 창 배치만 main이 책임.

### 6-5. 셸 공통
- `app.requestSingleInstanceLock()` — 중복 실행 방지 (이중 폴러 = 이중 인쇄 위험 차단. **필수**)
- `backgroundThrottling: false` — 폴러 인터벌 정속 보장 (최소화 상태에서도)
- 렌더러 크래시/화이트스크린 시 자동 reload(`render-process-gone` 핸들러), 앱 크래시 시 재시작
- 자동 시작(옵션): `app.setLoginItemSettings({openAtLogin:true})`
- `powerSaveBlocker.start('prevent-display-sleep')` — 설정으로 토글 (매장 모니터 sleep = 소켓 끊김 원인이던 것)
- 메뉴/단축키 최소화, F11 전체화면, DevTools는 숨김 단축키로만
- URL 고정: 외부 내비게이션 차단(`will-navigate`에서 purplehere.com 외 domain은 shell.openExternal)

### 6-6. 업데이트 · 설치
- electron-builder **NSIS** (perMachine 아님, 사용자 설치 — 매장 PC 권한 이슈 회피), 자동 업데이트 = electron-updater generic provider → `https://purplehere.com/desktop/` 정적 경로에 latest.yml + 설치본 (nginx 정적 서빙, 기존 구조 그대로)
- 코드사이닝: 미서명이면 SmartScreen 경고 → **Irene 결정 필요** (§10). 초기 파일럿은 미서명 + "추가 정보 → 실행" 안내로 가능.
- 앱 업데이트는 UI와 무관(UI는 웹 배포) — 인쇄 계층 변경 시에만 릴리즈.

---

## 7. 개발 단계 (Opus 실행 플랜)

> 위치: 리포 최상위 `desktop-pos/` (독립 package.json, dev-frontend와 빌드 무결합). Mac에서 개발·실행, Windows 검증은 VM/실기기.
>
> **역할 분담 (Irene 2026-07-01 확정):** 개발 = Opus(노트북, 앱 실행·실출력 가능한 쪽). 점검 = 서버 세션(Fable) — 각 단계 완료 커밋 후 diff 리뷰. **특히 P2(billPrint 절단면)는 구현 후 반드시 멈추고 서버 점검(diff + print-guard + 회귀) 통과 후에만 다음 단계 진행** (🔒 생명선 게이트). P0/P1/P3는 신규 폴더라 완료 보고 후 후속 점검으로 충분.

| 단계 | 내용 | 완료 기준 (검증) |
|---|---|---|
| **P0 스캐폴드** | electron + electron-builder, main/preload 골격, 원격 URL 로드(dev/prod 전환: 환경변수 또는 시작옵션), single-instance, contextIsolation, 크래시 복구, 창 상태 복원 | Mac에서 dev.purplehere.com/pos 로그인 → POS 정상 조작(주문 생성/KDS/설정). SW·IndexedDB·socket.io 동작 확인 (DevTools) |
| **P1 브릿지+Main 인쇄** | §4 API 전체 + §6-1/6-2 구현(6-3은 스텁), 진단창(브릿지 자체 테스트 UI — 앱 메뉴에서 열리는 로컬 페이지, 웹앱 무접촉) | Mac: `listPrinters` 실목록 / `printHtml` 한글 티켓이 Mac 연결 프린터(또는 PDF 프린터)로 출력 / `printRaw` lan은 로컬 TCP 목서버(nc -l 9100)로 바이트 검증 |
| **P2 billPrint 절단면** | §5의 8개 지점 feature-detect 분기 (기존 코드 블록 무수정, 분기만 추가) | ① 브라우저 번들 동작 불변(브릿지 없음 = 기존 경로, dev 데모매장 회귀) ② 앱에서 POS 주문 → 폴러 → 네이티브 인쇄 전 구간 (Mac 프린터/PDF로) ③ `check-print-guard.js` 변경 감지됨 = 정상(정식 변경), **실프린터 확인 후 --bless** |
| **P3 셸 완성** | 고객 디스플레이 2모니터, 자동 시작, powerSaveBlocker, 자동 업데이트, NSIS 설치본, 앱 아이콘/이름(Purple POS) | Windows VM: 설치 → 로그인 → 인쇄(6-3 포함 — 드로어 펄스, OS명 raw) → 업데이트 채널 동작 |
| **P4 파일럿** | 매장 1대(POS1, Win10/11)에 설치, **QZ와 공존**(문제 시 브라우저+QZ로 즉시 복귀 = 롤백이 "앱 대신 브라우저 열기"라 무위험) | 실매장 티켓/빌/드로어/통합/취소/QR/마감 전 종류 종이 확인 → print-guard bless → 안정 확인 후 확대 |
| P5(후속) | RawBT/Android(=Capacitor) 검토, Win7 기기 하드웨어 교체 계획 | — |

**Mac에서 가능:** P0~P2 전부, P3 대부분. **Windows 필요:** 6-3(winspool raw/드로어), NSIS 설치, SmartScreen, 실프린터 매트릭스(PRINT_RULES_MATRIX §10 체크리스트).

---

### 7-1. Fable 점검 체크리스트 (게이트 항목 — 점검자용)

**P2 게이트 (필수 — 통과 전 P3 진행 금지):**
- [ ] diff 범위: billPrint.js 수정이 §5의 8개 절단면**뿐**인지 (그 외 1줄이라도 = 반려)
- [ ] 각 분기: 브릿지 없을 때(`__NATIVE_PRINT` undefined) 기존 코드와 100% 동일 경로인지 — 기존 QZ 블록 내부 무수정 확인 (웹/PWA 회귀 0 보장)
- [ ] `check-print-guard.js`: 절단면 파일 외 지문 변동 0 (bless는 실프린터 후로 보류)
- [ ] 인쇄 구조 불변: 폴러(useAutoPrintPoller/MainLayout)·claim·발송순서·hybridKitchenPrint 비활성 게이트 접촉 0
- [ ] `health-check.js --category=print` + 데모매장(dev rid=38) 브라우저 경로 인쇄 회귀
- [ ] 브릿지 계약(§4): throw 금지·`{ok,error}`·PRINTER_NOT_FOUND 명시 실패·조용한 기본프린터 폴백 없음

**P1 후속 점검:** 브릿지 API 시그니처 §4 일치 / HTML 큐 순서 보존(스테이션→통합) / 타임아웃 값 / LAN 소켓 에러 처리.
**P3 후속 점검:** single-instance lock(이중 폴러 차단) / `backgroundThrottling:false` / 외부 내비게이션 차단 / 크래시 자동복구 / 설정 이원화 없음(§3 원칙).
**P4 (운영 관여):** 절단면 포함 웹 번들 운영 배포 전 = 기존 배포 게이트 전부 + 실프린터 종이 확인 후 `--bless` + PRINT_RULES_MATRIX §10 체크리스트.

## 8. 가드레일 (Opus 절대 준수 — CLAUDE.md 🔒 연동)

1. **인쇄 구조 불변**: 폴러 단일경로/claim/발송순서/통합가드/회차스코프 로직 수정 금지. 네이티브는 전송만. `window.__ENABLE_HYBRID_DIRECT` 활성화 금지. 히트비트/다이렉트 재도입 금지.
2. **billPrint.js는 §5 절단면 외 1줄도 수정 금지.** `useAutoPrintPoller.ts`/`MainLayout._printPollFn`/`KitchenDisplayPage`/`POSTerminalPage` 인쇄블록/`orders-crud.js` = **0줄**. 수정 후 `node scripts/check-print-guard.js`로 지문 확인 — §5 외 파일이 떴으면 사고.
3. **KDS = 표시 전용** 유지. 네이티브앱에서도 KDS 기기는 인쇄 주체 아님.
4. **설정 이원화 금지**: 네이티브 쪽에 프린터 설정 저장 금지. 단일 진실 = 웹 printer_settings.
5. **조용한 폴백 금지**: 프린터 미도달은 명시적 실패로 반환 (§4 계약).
6. **검증 없이 완료 보고 금지**: 각 단계 완료 기준 실측(실호출/실출력) 필수. build 통과 ≠ 완료.
7. 웹앱 배포 관련 기존 규칙 전부 적용 (build:dev, 운영 배포는 Irene `/배포`만, SW_VERSION bump 등).

---

## 9. 점검에서 확인된 사실 (설계 근거, 2026-07-01 실측)

- 시스템 건강: git clean(v3.66) · print-guard 8/8 · health-check 107/107 · 디스크 14% · 메모리 여유.
- QZ 접점 전수: 최종 송신 = `sendHTMLViaQZTray`(:670)/`sendViaQZTray`(:724) 단 2개 + 직접 qz.print는 `printTableQR`(:3226, LAN raster)와 미사용 `consolidatedTicket.ts`뿐. 캐시드로어=ESC p pulse를 sendViaQZTray로. keepalive(:359)는 네이티브에서 불필요.
- 프린터 지정 = `printer_settings.*.address` (IP 정규식 → LAN raw / 그 외 → OS명 HTML pixel / 빈값 → 기본프린터). 모델 무변경으로 재사용.
- 브라우저 의존(원격 로드로 전부 해소): 상대 API·쿠키 include·socket.io `/orders`·SW origin 비교·IndexedDB origin·localStorage 산재. **로컬 번들이면 전부 깨짐** → D1 근거.
- CORS: purplehere.com/dev.purplehere.com 화이트리스트 존재 — 원격 로드는 origin이 그대로라 이슈 없음.
- Win7 실사용 증거: thefire POS2 (QZ 2.1.6/SHA1/JRE11 대응 이력) → D4 근거.
- 기존 네이티브/Electron 코드·문서 0 — 본 문서가 첫 설계.

## 10. Irene 결정 (2026-07-01 확정)

1. **코드사이닝 인증서 = 나중에.** 파일럿은 미서명 설치본 + SmartScreen "추가 정보 → 실행" 안내로 진행. 확대 배포 전 재검토.
2. **파일럿 = thefire POS1** (Irene 확정). ⚠ P4 착수 전 POS1의 Windows 버전 확인 필수 — Win10/11이어야 함(Win7이면 기기 변경/교체 필요, D4).
3. Win7 기기(thefire POS2 등) 하드웨어 교체 시기 — 미정. 교체 전까지 웹+QZ 공존 유지.

---

## 11. Opus 개발 킥오프 프롬프트 (Irene가 노트북에서 붙여넣기)

```
Purple POS Windows 데스크탑앱(Electron, QZ Tray 대체) 개발을 시작해줘.

필독 (순서대로):
1. /var/www/docs/DESKTOP_APP_DESIGN.md — 이 설계가 단일 진실. 결정(D1~D5)·브릿지 API(§4)·
   billPrint 절단면(§5)·구현 스펙(§6)·단계 플랜(§7)·가드레일(§8) 전부 이 문서대로.
2. /var/www/CLAUDE.md — 🔒 인쇄 보호 규칙 (billPrint.js 등은 §5 절단면 외 수정 절대 금지)
3. /var/www/docs/PRINT_RULES_MATRIX.md — 인쇄 계약 (검증 시나리오 출처)

작업 지시:
- P0(스캐폴드)부터 시작, 단계 순서대로. 위치는 리포 최상위 desktop-pos/ 신규 폴더.
- 설계에 없는 것 임의 추가 금지. 인쇄 "구조"(폴러/claim/발송순서)는 절대 건드리지 말 것 —
  네이티브는 전송 계층만.
- 각 단계 완료 기준(§7 표)을 실측으로 증명하고 넘어갈 것. Mac에서 가능한 검증 먼저,
  Windows 필요 항목(§6-3, NSIS)은 스텁+체크리스트로 남길 것.
- billPrint.js 수정(P2) 후 반드시 cd /var/www/dev-backend && node scripts/check-print-guard.js
  실행 — §5 절단면 파일 외가 떴으면 사고이므로 되돌릴 것. bless는 실프린터 확인 후에만.
- **P2는 구현·커밋 후 거기서 멈출 것** — 서버 세션(Fable) 점검(diff+print-guard+회귀) 통과 후에만
  P3 진행 (설계 §7 역할 분담). P0/P1/P3는 단계 완료 커밋 + 검증 결과 요약 남기고 계속 진행.
- 완료 시 /var/www/.claude/session-state.md 갱신.
```

---

*관련 문서: PRINT_RULES_MATRIX.md · PRINT_DEVICE_SETUP_STANDARD.md · OFFLINE_MODE_DESIGN.md · 메모리 [[reference_print_single_poller_architecture]]*
