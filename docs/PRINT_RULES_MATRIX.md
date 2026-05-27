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

## 2026-05-27 — v3.42 변경

### C. Additional-items 자동 인쇄 (Auto-merge 라운드 ticket)

> 관련: `docs/ORDER_MERGE_RULES.md` § "2026-05-27 — v3.42 변경" (백엔드 머지 정책), `docs/KITCHEN_DISPLAY_RULES.md` § 9 (KDS divider/socket)

#### 트리거 흐름

```
backend mergeItemsIntoOrder() 성공
  └─ socket emit 'order-items-added' (room: restaurant_{id})
       └─ KDS 수신 (KitchenDisplayPage.tsx:~1644-1670)
            └─ console.log '[KDS] order-items-added'
            └─ printKitchenTicketViaRawBT(orderData, storeInfo)
                 └─ added_at 기반 필터로 신규 아이템 추출
                      └─ billPrint.js  generateAdditionalItemsTicketContent
                           └─ '** ADDITIONAL ORDER **' 헤더 ticket 만 인쇄
```

#### 핵심 규칙

| 항목 | 값 |
|------|---|
| 트리거 | socket `order-items-added` (수동 X) |
| 필터 | item.`order_group` > 0 + item.`added_at` 기준 (latest round) |
| 헤더 | `** ADDITIONAL ORDER **` (분기 표시) |
| 인쇄 경로 | 기존 Kitchen Ticket 경로 (A/B/C) 그대로 — Station 분리 + printPerItem 모두 그대로 동작 |
| 첫 주문 ticket | 기존 흐름 유지 (변경 없음) |

#### 코드

| 파일 | 함수 |
|------|------|
| `dev-backend/routes/orders-crud.js` | `mergeItemsIntoOrder()` — `order_group` + `added_at` 첨부 후 emit |
| `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx:1005-1054` | ItemsContainer 그룹화 + `+ ROUND N` divider |
| `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx:~1644-1670` | `order-items-added` listener → `printKitchenTicketViaRawBT` 자동 호출 |
| `dev-frontend/src/utils/billPrint.js` | `generateAdditionalItemsTicketContent` — group/added_at 필터 ticket 생성 |

---

### D. Receipt logo 인쇄 (운영 critical fix)

#### Bug 1: backend file path resolution

- **파일**: `dev-backend/routes/restaurants-crud.js:34`
- **잘못된 경로**:
  ```js
  path.join(__dirname, '..', logoRef.replace(/^\//, ''))
  // = <backend>/uploads/... (존재 안 함)
  ```
- **Fix**: `path.resolve('/var/www/uploads', rel)` — `server.js:340` 의
  ```js
  app.use('/uploads', express.static('/var/www/uploads'))
  ```
  와 일치시킴.
- **추가 가드**:
  - `data:` URL 입력 시 base64 디코드 후 변환
  - Path traversal 방어: `!filePath.startsWith(uploadsRoot)` → 403

#### Bug 2: frontend img src 정규식

- **파일**: `dev-frontend/src/utils/billPrint.js:1151`
- **잘못된 정규식**:
  ```js
  /^https?:\/\//.test(receiptLogo) ? receiptLogo : window.location.origin + receiptLogo
  ```
- **문제**: StoreContext 가 만든 `receiptLogoDataUrl` (= `data:image/png;base64,...`) 은 false → `https://.../data:image/...` 깨진 URL 합성됨.
- **Fix**:
  ```js
  /^(data:|https?:\/\/)/.test(receiptLogo)
  ```

#### 엔드포인트 사양

| 항목 | 값 |
|------|---|
| 경로 | `GET /api/restaurants/:id/receipt-logo` (확장자 없음) |
| 인증 | 익명 (no auth) — nginx 가 `.png` 확장자를 static 우선 라우팅하므로 endpoint 에는 확장자 X |
| 변환 | sharp 가 SVG/JPG/PNG 무관 → 480x160 PNG raster + `flatten(#fff)` — 80mm thermal-friendly |
| 입력 종류 | 파일 경로, `data:` URL 모두 처리 |
| Path traversal | uploadsRoot 외부 → 403 |

#### 자동 fix 영향 인쇄 경로

- POS 빌 인쇄 (Browser / RawBT / QZ Tray)
- LiveOrders 의 Reprint
- OrderDetailModal "View Receipt" (주문 상세 뷰영수증)
- 모바일 ReceiptShare

#### 코드

| 파일 | 함수/위치 |
|------|----------|
| `dev-backend/routes/restaurants-crud.js:34` | receipt-logo endpoint (path resolve + data: 가드 + traversal 방어) |
| `dev-backend/server.js:340` | `app.use('/uploads', express.static('/var/www/uploads'))` (path 기준점) |
| `dev-frontend/src/utils/billPrint.js:1151` | img src 정규식 `/^(data:|https?:\/\/)/.test(...)` |
| `dev-frontend/src/contexts/StoreContext.tsx` | `receiptLogoDataUrl` 생성 (data: URL) |
| `dev-frontend/src/mobile/components/common/ReceiptShare.tsx` | 모바일 ReceiptShare 렌더 |

---

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-03-17 | Kitchen Station 시스템 Phase 5: Station별 분리 인쇄 추가 |
| 2026-03-17 | 프린팅 규칙 매트릭스 초판 작성 |
| 2026-05-27 | § C Additional-items 자동 인쇄 (`order-items-added` socket → `generateAdditionalItemsTicketContent`) + § D Receipt logo path resolution (`/var/www/uploads` 기준) 및 img src 정규식 (`data:` 통과) fix |
