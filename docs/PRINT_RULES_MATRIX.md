# 프린팅 규칙 매트릭스

> **최종 업데이트:** 2026-03-17
> **관련 파일:** `dev-frontend/src/utils/billPrint.js`, `dev-frontend/src/pages/Settings/SettingsPage.tsx`

---

## 1. 설정 항목 (Settings > Printer 탭)

### 공통
| 설정 | 값 | 설명 |
|------|---|------|
| **Printer Mode** | `rawbt` / `browser` | RawBT 앱 또는 브라우저 인쇄 대화상자 |

### Bill Printer
| 설정 | 기본값 | 설명 |
|------|-------|------|
| **enabled** | false | Bill 프린터 활성화 |
| **name** | '' | RawBT 프린터 이름 (빈 값 = RawBT 기본 프린터) |
| **autoPrint** | false | 결제 완료 후 자동 인쇄 (현재 UI에만 저장, 자동 트리거 미구현) |

### Kitchen Printer (Station 없을 때)
| 설정 | 기본값 | 설명 |
|------|-------|------|
| **enabled** | false | Kitchen 프린터 활성화 |
| **name** | '' | RawBT 프린터 이름 |
| **autoPrint** | false | 새 주문 시 자동 인쇄 (현재 UI에만 저장) |
| **printPerItem** | false | 아이템별 개별 티켓 인쇄 |

### Kitchen Station Printers (Station 있을 때)
| 설정 | 설명 |
|------|------|
| **kitchenStationPrinters[stationId].name** | 해당 Station의 RawBT 프린터 이름 |
| **kitchenStationPrinters[stationId].autoPrint** | 해당 Station 자동 인쇄 |
| **kitchenStationPrinters[stationId].stationName** | Station 이름 (티켓 헤더용) |

### Kitchen Ticket Options
| 설정 | 설명 |
|------|------|
| **printPerItem** | ON: 아이템마다 별도 티켓 / OFF: 주문 1장 합본 티켓 |

---

## 2. Bill 프린트 흐름

```
printBillViaRawBT(orderData, storeInfo, printerName?)
  │
  ├─ billPrinter.enabled === false → SKIP (return true)
  │
  ├─ printerMode === 'browser' → 브라우저 인쇄 대화상자
  │
  └─ printerMode === 'rawbt' → RawBT Intent
       └─ 프린터: printerName || billPrinter.name || RawBT 기본
```

**Bill은 항상 1장. Station 분리 없음.**

---

## 3. Kitchen Ticket 프린트 흐름 — 결정 트리

```
printKitchenTicketViaRawBT(orderData, storeInfo, printerName?)
  │
  ├─ kitchenPrinter.enabled === false → SKIP
  │
  ├─ kitchenStationPrinters 있음 && printerName 없음
  │   └─ [경로 A] printKitchenTicketsByStation() → Station별 분리 인쇄
  │       │
  │       ├─ printPerItem ON → 각 Station 프린터로 아이템별 개별 티켓
  │       └─ printPerItem OFF → 각 Station 프린터로 Station 합본 1장
  │
  └─ kitchenStationPrinters 없음 (기존 동작)
      │
      ├─ printPerItem === true
      │   └─ [경로 B] 아이템별 개별 티켓 (같은 프린터)
      │
      └─ printPerItem === false
          └─ [경로 C] 주문 1장 합본 티켓
```

---

## 4. 경로별 상세

### 경로 A: Station별 분리 인쇄 (kitchenStationPrinters 있을 때)

```
주문 아이템 분류:
  menuStationMap[아이템명] → stationId 매핑 (localStorage에서)

  매핑 우선순위:
    1순위: product.kitchen_station_id (메뉴 개별 지정)
    2순위: category.kitchen_station_id (카테고리 배정)
    3순위: null → 미배정

분류 결과:
  Station A 아이템 → Station A 프린터 (kitchenStationPrinters[A].name)
  Station B 아이템 → Station B 프린터 (kitchenStationPrinters[B].name)
  미배정 아이템   → 기본 프린터 (kitchenPrinter.name)

티켓 형식:
  Station 티켓: [ Station Name ] 헤더 + 해당 아이템만 + "Ticket N of M"
  미배정 티켓: 기존 합본 형식 (Station 헤더 없음)

프린터 간 딜레이: 800ms
```

**printPerItem도 적용됨:** Station 분리 + per-item 둘 다 ON이면, 각 Station 프린터로 아이템별 개별 티켓이 나감.

### 경로 B: 아이템별 개별 티켓 (printPerItem ON, Station 없을 때)

```
주문의 각 아이템마다 별도 티켓 생성
  → 모두 같은 프린터 (kitchenPrinter.name)
  → 각 티켓에 "Item N of M" 표시
  → 아이템 간 딜레이: 800ms
```

### 경로 C: 주문 합본 티켓 (기본, Station 없음 + printPerItem OFF)

```
주문의 모든 아이템을 1장에 합쳐서 인쇄
  → 프린터: kitchenPrinter.name
  → 기존과 100% 동일
```

---

## 5. 호출 위치별 매트릭스

| 호출 위치 | 트리거 | 함수 |
|----------|--------|------|
| **POS Terminal > OrderCompleteModal** | 수동 (Kitchen Ticket 버튼) | `printKitchenTicketViaRawBT(orderData, storeInfo)` |
| **Live Orders > 주문 카드** | 수동 (Kitchen Ticket 버튼) | `printKitchenTicketViaRawBT(orderData, storeInfo)` |
| **Floor Plan > TableDetailPanel** | 수동 (Print Kitchen 버튼) | `printKitchenTicketViaRawBT(orderData, getStoreInfo())` |
| **Kitchen Display > Order View** | 수동 (Print 버튼) | `printKitchenTicketViaRawBT(orderData, getStoreInfo())` |
| **Kitchen Display > Item View** | 수동 (Print 버튼) | `printKitchenTicketViaRawBT(orderData, getStoreInfo())` |

**모든 호출이 동일한 `printKitchenTicketViaRawBT` 함수를 사용.** Station 분리 인쇄는 함수 내부에서 자동 분기.

---

## 6. Station 유무에 따른 동작 비교

### Station 0개 (기존 운영 환경)

| 설정 | 동작 | 기존과 차이 |
|------|------|-----------|
| Kitchen Printer OFF | 인쇄 안 함 | **동일** |
| Kitchen Printer ON + printPerItem OFF | 주문 1장 합본 | **동일** |
| Kitchen Printer ON + printPerItem ON | 아이템별 개별 | **동일** |
| Printer 탭 UI | 기존 단일 Kitchen Printer 카드 | **동일** |
| Kitchen Display | Station 탭 없음 | **동일** |

**Station 0개이면 기존 코드와 100% 동일하게 동작. 변경 없음.**

### Station 1개 이상

| 설정 | 동작 |
|------|------|
| Kitchen Printer OFF | 인쇄 안 함 (Station과 무관) |
| Kitchen Printer ON | Station별 분리 인쇄 |
| printPerItem ON | Station별 분리 + 각 Station 내 아이템별 개별 티켓 |
| printPerItem OFF | Station별 분리 + 각 Station 합본 1장 |
| Printer 탭 UI | Station별 프린터 카드로 자동 전환 |
| Kitchen Display | [All] + Station 탭 표시 |

---

## 7. 데이터 저장 위치

| 데이터 | 저장 위치 | 용도 |
|--------|----------|------|
| printer_settings | DB `restaurants.printer_settings` (JSON) | 영구 저장 |
| printerSettings | `localStorage['printerSettings']` | billPrint.js에서 사용 |
| printerMode | `localStorage['printerMode']` | rawbt/browser 판별 |
| kitchenStationMenuMap | `localStorage['kitchenStationMenuMap']` | 메뉴명→stationId 매핑 |

### localStorage 동기화 타이밍
| 타이밍 | 동기화 대상 |
|--------|-----------|
| Settings > Printer 탭 Save | printerSettings + printerMode |
| Settings 페이지 로드 (DB→localStorage) | printerSettings + printerMode |
| StoreContext 초기화 (앱 로드) | printerSettings + printerMode |
| Kitchen Display 로드 | kitchenStationMenuMap |

---

## 8. 안전 체크리스트 (운영 배포 전)

| # | 체크 항목 | 확인 방법 |
|---|----------|----------|
| 1 | Station 0개일 때 기존과 동일 동작 | `kitchenStationPrinters` 없으면 경로 B/C로 진입 |
| 2 | `kitchenPrinter.enabled = false`면 인쇄 안 함 | 함수 진입 직후 첫 번째 체크 |
| 3 | `printPerItem` 기존 동작 유지 | Station 없을 때만 경로 B로 진입 |
| 4 | Bill 프린터 영향 없음 | `printBillViaRawBT`는 변경 없음 |
| 5 | Station 삭제 후 정상 복귀 | DB에서 Station 삭제 → kitchenStationPrinters 제거 → 기존 동작 |
| 6 | `kitchenStationMenuMap` 없어도 오류 안 남 | try/catch로 빈 객체 fallback |

---

## 관련 코드

| 파일 | 함수/역할 |
|------|----------|
| `utils/billPrint.js` | `printBillViaRawBT` — Bill 인쇄 |
| `utils/billPrint.js` | `printKitchenTicketViaRawBT` — Kitchen Ticket 진입점 |
| `utils/billPrint.js` | `printKitchenTicketsByStation` — Station별 분리 인쇄 |
| `utils/billPrint.js` | `generateStationKitchenTicket` — Station 티켓 ESC/POS 생성 |
| `utils/billPrint.js` | `generateKitchenTicketContent` — 합본 티켓 ESC/POS 생성 |
| `utils/billPrint.js` | `generateSingleItemKitchenTicket` — per-item 티켓 ESC/POS 생성 |
| `utils/billPrint.js` | `getPrinterSettings` — localStorage에서 설정 로드 |
| `contexts/StoreContext.tsx` | 앱 로드 시 DB→localStorage 동기화 |
| `pages/Settings/SettingsPage.tsx` | Printer 탭 UI + Save |

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-03-17 | Kitchen Station 시스템 Phase 5: Station별 분리 인쇄 추가 |
| 2026-03-17 | 프린팅 규칙 매트릭스 초판 작성 |
