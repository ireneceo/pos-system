# 프린팅 규칙 매트릭스

> **최종 업데이트:** 2026-06-01 (§ 9 주문루트 × 주요설정 검증 매트릭스 추가 — 4-케이스 오더티켓 포함)
> **관련 파일:** `dev-frontend/src/utils/billPrint.js`, `dev-frontend/src/pages/Settings/SettingsPage.tsx`
> **검증 계약:** **§ 9** 가 `/검증`·`/운영검증` 이 "그대로 대조" 하는 단일 표. 동작이 § 9 와 다르면 코드를 고친다(규칙 X). § 0~8 은 경로 상세, § 9 는 루트×설정 종합.

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

## 9. 주문루트 × 주요설정 검증 매트릭스 (2026-06-01 — 검증 계약)

> `/검증`(DEV)·`/운영검증`(운영) 이 **이 표 그대로** 대조한다. 동작이 다르면 코드를 고친다.

### 9-1. 축 정의

**주문루트 (11)**
| 코드 | 루트 | 인쇄 주체 기기 |
|------|------|----------------|
| R1 | POS 직접 주문 (카운터) | 카운터 POS |
| R2 | Floor Plan 오버레이 POS 주문 | **부모 Floor Plan** (오버레이 poller off — Issue 1 fix) |
| R3 | 모바일 — 테이블 QR (dine-in) | 카운터 POS / Floor Plan (poller) |
| R4 | 모바일 — 공용 슬러그 (dine-in, 테이블 강제 시) | 〃 |
| R5 | 모바일 — takeaway/pickup | 〃 |
| R6 | 추가주문 +Round (auto-merge) | 〃 (socket `order-items-added`) |
| R7 | 테이블 이동 → **빈 테이블** | Floor Plan |
| R8 | 테이블 이동 → **점유(머지)** | Floor Plan |
| R9 | **아이템 단일 취소** | LiveOrders / Floor Plan |
| R10 | **주문 전체 취소** | LiveOrders |
| R11 | 결제완료 (빌/영수증) | 결제 단말 |

**주요설정**
| 코드 | 설정 | 값 |
|------|------|---|
| S1 | `kitchenPrinter.autoPrint` (**master**) | ON / OFF |
| S2 | station printers 유무 | 0 / 1+ |
| S3 | `printPerItem` | ON / OFF |
| S4 | `mirrorToBillPrinter` | ON / OFF |
| S5 | `printCancellationTicket` | ON / OFF |
| S6 | `billPrinter.autoPrint` | ON / OFF |
| S7 | `printerMode` | rawbt / browser / qz |
| S8 | 멀티존(zone별 station 분리) | 유 / 무 |

### 9-2. 게이트 요약 (어떤 설정이 무엇을 켜고 끄나)

| 출력 | 게이트 | OFF 시 |
|------|--------|--------|
| 주방 오더티켓(자동) | **S1 master** + station/kitchen enabled | 자동 X → **수동 버튼으로만** |
| station별 분배 | S2 (1+ → 경로 A) | S2=0 → 합본/per-item (경로 B/C) |
| 아이템별 개별 티켓 | S3 | OFF → 합본 1장 |
| POS 미러(통합 1장) | S4 | 미러 X |
| 취소표(R9/R10) | S1 + S5 + `wasInKitchen`(주방 진입분만) | 취소표 X |
| 결제 영수증(자동) | S6 | 자동 X (수동 인쇄) |
| 한글 정상 | S7=qz(HTML pixel) | raw ESC/POS=한글 깨짐(LAN IP 전용) |

> **핵심**: **S1(master)** 가 모든 주방 자동발행의 최상위 게이트. OFF면 R1~R10 어떤 주방티켓도 **자동으로 안 나감** → 수동 경로만. (KDS 는 항상 표시 전용, 인쇄 주체 아님.)

### 9-3. 주문루트별 출력 (핵심 계약)

> "자동발행 ON" = S1 ON 기준. "수동(OFF)" = S1 OFF 시 동작.

| 루트 | 자동발행 ON (S1 ON) | 수동 (S1 OFF) | 헤더 | 미러(S4 ON) |
|------|--------------------|--------------|------|------------|
| R1/R3/R4/R5 신규주문 | station별 오더티켓 1장씩(S2 1+) / 합본·per-item(S2 0) | OrderComplete·LiveOrders **Kitchen Ticket 버튼** | (없음/일반) | 빌프린터 통합 1장 |
| R2 오버레이 주문 | **부모만** 발행 (오버레이 중복 poller off) → 1장 | 〃 | 일반 | 〃 |
| R6 +Round | **추가 품목만** 1장 (`added_at` 필터) | 수동 버튼 | `** ADDITIONAL ORDER **` | 추가분 미러 |
| R7 이동→빈 | 옛 station **VOID** 1장 + 새 station **재발행** 1장 (station 동일 시 재발행 skip) | confirm 모달 `확인+인쇄` | `** TABLE CHANGED **` | 해당 |
| R8 이동→머지 | 〃 + 머지 합본 | 〃 | `** TABLE CHANGED + MERGED **` | 해당 |
| R9 아이템 취소 | 그 아이템 **station 에만** 취소표(줄긋기). 주방 미진입분은 발행 X | 사유 모달 `확인+인쇄` | `*** ITEM CANCELLED ***` | — |
| R10 전체 취소 | **station별** 각 station 아이템만 줄긋기 취소표 | confirm 모달 `확인+인쇄` | `*** ORDER CANCELLED ***` | — |
| R11 결제 | (주방 무관) S6 ON → 영수증 자동, 설정 매수 | 수동 인쇄 | 영수증 | — |

**4-케이스 티켓 내용** (R7~R10): `docs/TABLE_MOVE_AND_VOID_TICKET.md` § 설계 2 단일 진실. 줄긋기 = HTML `line-through` / ESC-POS `~~`·reverse. station 라우팅 = `stationEnrichment`(resolveProductId+이름폴백) 재사용 — **인쇄 방식/주소 무변경, 콘텐츠·신규필드(`noticeHeader`)만**.

### 9-4. 설정 조합 상세 (S2 × S3 은 § 6 표 재사용)
- **S2/S3** (station 유무 × printPerItem): § 6 "Station 유무에 따른 동작 비교" 그대로. R7~R10 도 동일 분배 로직.
- **S7 한글**: qz(HTML pixel)=정상 / raw ESC-POS=깨짐 → LAN IP 프린터만 raw. 취소표/재발행도 같은 경로 따름.
- **S5 OFF**: R9/R10 취소표 자체를 안 냄(주방이 손으로 확인). R7/R8 재발행은 S5 무관(정규 발행).
- **S8 멀티존**: 이동 시 옛/새 station 다를 수 있음 → R7/R8 의 VOID+재발행이 의미. 단일존이면 station 동일 → 재발행 skip.

### 9-5. 검증 분담 (API vs 실프린터)
| 검증 가능 (API/백엔드 — `/검증`) | 실프린터 눈 (Irene — `/운영검증`) |
|----------------------------------|-----------------------------------|
| pending-print 큐 / `printed_at` 도장 / `needs_print` clear | 종이 1장 정확히 (중복 0) |
| station_id 분배 결과 / removedItem payload / `noticeHeader` 플래그 | 헤더 문구·줄긋기 시각 |
| 게이트 분기 (S1~S6 조합별 호출 여부) | 한글 raster 정상 |
| 동시 print-claim N개→1개 (중복 방지) | Issue 1 오버레이 1장 |
| 금액 공식 / 익명 401 / 보호파일 무결성 | 자동발행 OFF 매장 무음(수동만) |

---

### 9-6. 런타임 대조 결과 (2026-06-01 하니스 — billPrint 실제 dispatch 가로채기)

billPrint 의 송신(qz.print / RawBT intent)을 스텁으로 가로채 **설정조합별 실제 발행 건수·대상·내용**을 §9 와 1:1 대조 (멀티 station 한글 데이터: 비빔밥@KITCHEN / 된장찌개@KITCHEN 2 / 소주@BAR).

| 케이스 | 설정 | 실제 dispatch | §9 기대 | 판정 |
|--------|------|--------------|---------|:----:|
| C1 | QZ · 3 station · perItem OFF · mirror OFF | 3장 (station별 자기 아이템) | station별 합본 | ✓ |
| C2 | QZ · station 0 · perItem OFF | 1장 (합본, 3 아이템) → kitchenPrinter | 합본 1장 | ✓ |
| C3 | QZ · station 0 · perItem ON | 3장 (아이템별) → kitchenPrinter | 아이템별 | ✓ |
| C4 | QZ · 3 station · **mirror ON** | 3 station + **빌프린터(POS-80C) 통합 1장** = 4 | station N + 빌미러 1 | ✓ |
| C5 | **R10 전체취소** · QZ · 3 station | 3장 (station별 라우팅, 내용=ORDER CANCELLED 줄긋기 — 별도 캡처검증) | station별 취소표 | ✓ |
| C6 | **kitchenPrinter.enabled=false** + station 有 | **3장 발행됨** | 0장(인쇄 안 함) | **✗ 불일치** |

**C6 불일치 (확인된 코드 사실)**: `printKitchenTicketViaRawBT` 에서 **station 라우팅 분기(`hasStationPrinters && !printerName` → `return printKitchenTicketsByStation`)가 `kitchenPrinter.enabled` 체크보다 먼저** 실행됨(billPrint.js ~2364 vs ~2369). 따라서 station 설정 매장은 `kitchenPrinter.enabled=false` 여도 station 발행이 멈추지 않는다.
- **단, 실운영 자동인쇄의 진짜 master 게이트는 `kitchenPrinter.autoPrint`(상위 호출부 useAutoPrintPoller/POS)** 이므로, autoPrint OFF 면 애초에 이 함수가 안 불려 발행되지 않는다(회귀테스트 44 통과). `.enabled` 는 station 설정 시 station 분기에 의해 우회되는 2차 플래그.
- **조치**: `.enabled` 가 station 까지 하드 게이트하길 원하면 billPrint.js 2364/2369 순서 교체 필요 = 🔒 보호코드 변경 → **Irene 승인 + 실프린터 확인 후에만**(과거 이 분기는 "station 매장 결제 후 아무것도 안 나옴" 버그 수정용으로 추가됨 — 순서 변경 시 회귀 주의). 현 매트릭스는 **코드 실제 동작**(station 발행)을 기준으로 기록.

C1~C5 모두 §9 일치 확인 (라우팅·건수·미러·취소 station별).

---

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-06-01 | § 9-6 런타임 대조 결과 추가 (C1~C5 §9 일치 / C6 kitchenPrinter.enabled+station 불일치 = 코드 우회, 실게이트는 autoPrint) |
| 2026-06-01 | § 9 주문루트(11) × 주요설정(8) 검증 매트릭스 추가 — R7~R10 4-케이스 오더티켓(이동 빈/머지, 아이템/전체 취소) + 자동/수동 게이트 |
| 2026-03-17 | Kitchen Station 시스템 Phase 5: Station별 분리 인쇄 추가 |
| 2026-03-17 | 프린팅 규칙 매트릭스 초판 작성 |
| 2026-05-27 | § C Additional-items 자동 인쇄 (`order-items-added` socket → `generateAdditionalItemsTicketContent`) + § D Receipt logo path resolution (`/var/www/uploads` 기준) 및 img src 정규식 (`data:` 통과) fix |

---

## 🔒 자동 인쇄 규칙 (2026-05-29 고정 — Irene 확정 스펙, 변경 금지)

> 이 6개 규칙이 자동 인쇄의 **단일 진실**. 코드는 항상 이 규칙을 따른다. 동작이 규칙과 다르면 코드를 고친다 (규칙을 바꾸지 않는다).

| # | 규칙 |
|---|------|
| 1 | **주방 자동발행 ON**: 주문 들어오면 즉시 **모든 주방 station 에 발행**. 각 station 은 자기 메뉴만 (station 별 라우팅). 이것도 "오더티켓". |
| 2 | **"POS 미러링" ON** (`kitchenPrinter.mirrorToBillPrinter`): POS(빌프린터)에 **통합 오더티켓 1장** 추가 발행. #1 과 독립. |
| 3 | **빌 자동발행 ON** (`billPrinter.autoPrint`): 결제되면 영수증 자동발행, 설정한 매수대로. |
| 4 | **출처 무관 동일**: POS / Floor Plan / 모바일오더 어디서 온 주문이든 #1~#3 동일하게 동작. |
| 5 | **추가 주문(+Round)**: 추가된 품목만 발행 (이전 품목 재발행 금지). `printed_at` per-item 히스토리. |
| 6 | **안정성 최우선**: 절대 "아무것도 안 나옴" 금지. 인쇄 실패 시 **POS 가 알아야 함** (실패 배너 + 조치 안내 + 다시 인쇄). |

### 구현 원칙 (이 규칙을 어떻게 보장하나)

- **post-print 기록 방식** (사전 claim 금지): 인쇄를 *성공*한 뒤에만 `printed_at` 도장 + `needs_print` clear. 사전 선점(claim)은 인쇄 못 하는 기기가 먹고 막아버려 "아무것도 안 나옴"을 유발 → **금지**.
- **KDS 는 표시 전용**: KDS 는 자동 인쇄하지 않는다. 프린터(주방 station / 빌)를 가진 **카운터 POS / Floor Plan 기기**가 자동발행 담당. (KDS 기기엔 프린터가 없을 수 있어 인쇄 주체가 되면 안 됨.)
- **중복 방지**: 같은 기기 내 `window.__autoPrintInflight[orderId]` + 영속 `printed_at`. 인쇄 주체 기기가 1대면 정확히 1회.
- **#2 미러는 #1 과 한 함수**(`printKitchenTicketViaRawBT` 내 mirror 블록)지만, 인쇄 주체가 항상 카운터(빌프린터 보유) 기기이므로 미러가 항상 같이 나온다.
- **실패 알림**: 인쇄 실패(`ok===false` / throw) 시 `window` 이벤트 `autoprint-failed` 발생 → POS/레이아웃이 배너로 표시 + needs_print 유지(다음 주기 재시도).

### 인쇄 주체 기기 = 프린터를 가진 기기 (전제)
카운터 POS 기기의 QZ Tray 가 주방 station 프린터(예: `KITCHEN`/`KITCHEN 2`/`BAR`)와 빌프린터(`POS-80C`)를 **모두 인식**해야 한다. station address 는 그 기기 QZ Tray 의 실제 프린터명과 일치해야 무음 실패가 없다.
