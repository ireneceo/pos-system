# QZ Tray 연동 설계서

> **작성일**: 2026-03-24
> **목적**: 기존 LAN 네트워크 프린터를 브라우저에서 사용할 수 있도록 QZ Tray 연동
> **영향 범위**: 프론트엔드만 (백엔드 변경 없음, DB 스키마 변경 없음)

---

## 1. 배경

### 문제
- 기존 레스토랑들은 LAN 케이블로 연결된 네트워크 프린터(ESC/POS)를 사용 중
- 브라우저는 보안상 네트워크 장비에 직접 데이터를 보낼 수 없음
- 현재 시스템은 RawBT(Android 블루투스) / Browser Print(window.print)만 지원

### 해결
- **QZ Tray**: 브라우저와 네트워크 프린터 사이의 다리 역할을 하는 오픈소스 프로그램
- 매장 메인 PC/태블릿에 QZ Tray 설치 → 브라우저가 localhost로 QZ Tray에 요청 → QZ Tray가 LAN을 통해 프린터로 ESC/POS 데이터 전송
- **"네트워크 프린터 IP"**: LAN 포트에 할당된 사설 IP. 같은 공유기에 연결된 기기마다 고유한 내부 IP를 받으며, 프린터도 동일하게 IP를 받음

---

## 2. 현재 프린터 시스템

### 프린트 방식 (2가지)
| 방식 | 대상 | 동작 |
|------|------|------|
| **RawBT** | Android 태블릿/폰 | ESC/POS → Base64 → RawBT Intent → 블루투스 프린터 |
| **Browser Print** | PC | HTML → window.print() → USB/네트워크 프린터 (OS 프린터 대화상자) |

### 설정 저장 구조
```javascript
// restaurants.printer_settings (JSON)
{
  printerMode: 'rawbt' | 'browser',   // ← 여기에 'qztray' 추가
  billPrinter: {
    enabled: boolean,
    name: string,
    autoPrint: boolean
  },
  kitchenPrinter: {
    enabled: boolean,
    name: string,
    autoPrint: boolean,
    printPerItem: boolean
  }
}
```

### 프린트 호출 경로
1. **POS 결제 완료** → `printBillViaRawBT()` + `printKitchenTicketViaRawBT()`
2. **Kitchen Display WebSocket** → `printKitchenTicketViaRawBT()`
3. **수동 프린트 버튼** → 각 함수 직접 호출

### 핵심 파일
- `billPrint.js`: 프린트 유틸 (ESC/POS 생성 + 전송)
- `SettingsPage.tsx`: Printer 탭 UI
- `POSTerminalPage.tsx`: POS 자동 프린트
- `KitchenDisplayPage.tsx`: Kitchen 자동 프린트

---

## 3. 변경 설계

### 3.1 프린트 방식 3가지로 확장

```
Settings > Printer > Print Method:
  ○ RawBT (Android)        ← 현재
  ○ Browser Print (PC)     ← 현재
  ○ QZ Tray (Network)      ← 신규
```

- QZ Tray 선택 시에만 프린터 IP 입력 필드 표시
- 다른 방식 선택 시 현재와 100% 동일

### 3.2 설정 구조 확장

```javascript
{
  printerMode: 'rawbt' | 'browser' | 'qztray',  // 신규 값 추가
  billPrinter: {
    enabled: boolean,
    name: string,
    autoPrint: boolean,
    address: string       // QZ Tray용: 프린터 IP (예: '192.168.1.100:9100')
  },
  kitchenPrinter: {
    enabled: boolean,
    name: string,
    autoPrint: boolean,
    printPerItem: boolean,
    address: string       // QZ Tray용: 프린터 IP (예: '192.168.1.101:9100')
  }
}
```

- `address` 필드: QZ Tray 모드에서만 사용
- 기존 `name` 필드: QZ Tray에서 연결 프린터 식별명으로 활용 가능
- **포트 9100**: ESC/POS 네트워크 프린터의 표준 RAW 포트

### 3.3 billPrint.js 변경

#### 새로 추가할 함수들

```javascript
// QZ Tray 연결 관리
async function connectQZTray()          // QZ WebSocket 연결
async function disconnectQZTray()       // 연결 해제
function isQZTrayConnected()            // 연결 상태 확인

// QZ Tray로 ESC/POS 전송
async function sendToQZTray(escposContent, printerAddress)

// 프린터 목록 조회 (Settings용)
async function getQZTrayPrinters()      // 연결된 프린터 목록 반환
```

#### 기존 함수 분기 추가

`printBillViaRawBT()`, `printKitchenTicketViaRawBT()` 등 기존 함수에 qztray 분기 추가:

```javascript
// 기존 구조
if (shouldUseBrowserPrint()) {
  printHTMLContent(htmlContent);
} else {
  // RawBT intent
}

// 변경 후
const mode = getPrinterMode();  // 'rawbt' | 'browser' | 'qztray'

if (mode === 'qztray') {
  await sendToQZTray(escposContent, printerAddress);
} else if (mode === 'browser') {
  printHTMLContent(htmlContent);
} else {
  // RawBT intent (기존)
}
```

**핵심**: ESC/POS 콘텐츠 생성 함수(`generateBillContent`, `generateKitchenTicketContent` 등)는 변경 없음. 전송 방식만 분기.

### 3.4 Settings > Printer 탭 UI 변경

#### Print Method 라디오 (기존 2개 → 3개)

```
Print Method
  ○ RawBT (Android)
    Set your bill printer as default in RawBT app.

  ○ Browser Print (PC)
    Connect a receipt printer via USB or network.

  ○ QZ Tray (Network)                          ← 신규
    Use network printers via QZ Tray.
    Requires QZ Tray installed on this device.
```

#### QZ Tray 선택 시 추가 UI

```
┌─ QZ Tray Connection ─────────────────────┐
│  Status: ● Connected  /  ○ Not Connected │
│  [Test Connection]                        │
│                                           │
│  ⓘ QZ Tray must be running on this       │
│    device. Download: qz.io/download       │
└───────────────────────────────────────────┘

┌─ Bill Printer ────────────────────────────┐
│  [✓] Enable                               │
│  Printer: [ Select printer ▼ ]            │
│    or manually enter IP:                  │
│  Address: [ 192.168.1.100:9100 ]          │
│  [✓] Auto-print after payment             │
│  [Test Print]                             │
└───────────────────────────────────────────┘

┌─ Kitchen Printer ─────────────────────────┐
│  [✓] Enable                               │
│  Printer: [ Select printer ▼ ]            │
│    or manually enter IP:                  │
│  Address: [ 192.168.1.101:9100 ]          │
│  [✓] Auto-print on new order             │
│  [Test Print]                             │
└───────────────────────────────────────────┘
```

- **Select printer 드롭다운**: QZ Tray가 감지한 설치된 프린터 목록 (OS에 등록된 프린터)
- **Address 수동 입력**: 드롭다운 대신 네트워크 프린터 IP:포트 직접 입력 가능
- **Test Print**: 테스트 영수증 출력
- **Test Connection**: QZ Tray 연결 확인

### 3.5 QZ Tray 라이브러리 연동

#### npm 패키지
```bash
npm install qz-tray
```

#### 연결 방식
```javascript
import qz from 'qz-tray';

// QZ Tray는 localhost:8182에서 WebSocket 서버를 실행
// 브라우저에서 qz.websocket.connect()로 연결
await qz.websocket.connect();

// 프린터 목록 조회
const printers = await qz.printers.find();

// 네트워크 프린터로 RAW 데이터 전송
const config = qz.configs.create('192.168.1.100:9100', { type: 'socket' });
await qz.print(config, [{ type: 'raw', data: escposContent }]);
```

#### 인증서 (보안)
- QZ Tray는 WebSocket 연결 시 서명 인증을 요구
- 개발 단계: QZ Tray의 `Override certificate` 옵션 사용
- 프로덕션: 자체 서명 인증서 생성 또는 QZ 무료 인증서 사용

---

## 4. 수정 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `utils/billPrint.js` | QZ Tray 연결/전송 함수 추가, 기존 프린트 함수에 qztray 분기 추가 |
| `pages/Settings/SettingsPage.tsx` | Print Method에 QZ Tray 옵션 추가, QZ Tray 설정 UI |
| `package.json` | `qz-tray` 패키지 추가 |

**변경하지 않는 파일:**
- `POSTerminalPage.tsx` — 기존대로 `printBillViaRawBT()` 호출, billPrint.js 내부에서 분기
- `KitchenDisplayPage.tsx` — 기존대로 `printKitchenTicketViaRawBT()` 호출
- 백엔드 전체 — 변경 없음
- DB 스키마 — 변경 없음 (printer_settings는 JSON 필드)

---

## 5. 동작 흐름

### QZ Tray 모드 프린트 흐름
```
1. POS 결제 완료 (또는 새 주문 WebSocket)
2. billPrint.js → getPrinterMode() → 'qztray'
3. generateBillContent() / generateKitchenTicketContent() → ESC/POS 문자열 생성
4. sendToQZTray(escposContent, '192.168.1.100:9100')
5. qz-tray npm → WebSocket → localhost:8182 (QZ Tray)
6. QZ Tray → TCP/IP → 192.168.1.100:9100 (네트워크 프린터)
7. 프린터 출력
```

### 기존 모드 (변경 없음)
```
RawBT: generateContent() → Base64 → Intent URL → RawBT 앱 → 블루투스 프린터
Browser: generateContent() → HTML → window.print() → OS 프린터 대화상자
```

---

## 6. 고객 설치 가이드 (향후 작성)

1. QZ Tray 다운로드 및 설치 (qz.io)
2. QZ Tray 자동 시작 설정
3. Settings > Printer > QZ Tray 선택
4. 프린터 IP 입력 (기존 POS에서 사용하던 것과 동일)
5. Test Print로 확인

---

## 7. 구현 단계

| 단계 | 작업 | 예상 파일 수 |
|------|------|------------|
| 1 | `qz-tray` npm 설치 + billPrint.js에 QZ 연결/전송 함수 추가 | 2 |
| 2 | billPrint.js 기존 함수들에 qztray 분기 추가 | 1 |
| 3 | SettingsPage Printer 탭 QZ Tray UI 추가 | 1 |
| 4 | 테스트 프린트 + 연결 상태 표시 | 1 |
| 5 | 빌드 + 검증 | - |
