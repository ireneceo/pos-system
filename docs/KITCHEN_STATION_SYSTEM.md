# Kitchen Station 시스템 설계서

> **작성일:** 2026-03-17
> **상태:** Phase 1~2 완료 (Station 등록 + Display 필터 + 자동 프린트 + Printer 탭 단순화), Phase 3~5 대기
> **중요:** RawBT는 S.s= 파라미터로 프린터 선택 불가 (항상 기본 프린터 1개로만 출력). 멀티 프린터는 디바이스 분리 방식으로 운영.
> **2026-03-19 변경:** Printer 탭 Station별 프린터 카드 제거. Station 유무 관계없이 Kitchen Printer 단일 설정. 미배정 아이템은 모든 Station에 표시.
> **관련 파일:** KitchenDisplayPage.tsx, SettingsPage.tsx, billPrint.js

---

## 1. 개요

하나의 레스토랑에 여러 주방(Station)을 등록하고, 각 주방이 담당하는 메뉴만 Kitchen Display에 표시하며, 주문 시 주방별 오더티켓을 분리 인쇄한다.

### 핵심 원칙
- **기존 Printer 탭 건드리지 않음** — 프린터 설정은 Printer 탭에 유지
- **Kitchen Stations 탭은 주방 등록 + 메뉴 배정만**
- **Station 0개면 현재와 100% 동일하게 동작** (하위 호환)
- **RawBT를 통해 Wi-Fi/LAN(IP) 프린터로 전송** — 네트워크 프린터 직접 TCP 전송 안 함

---

## 2. 설정 구조 — 무엇을 어디서 설정하나

| 설정 항목 | 위치 | 변경 여부 |
|----------|------|-----------|
| Printer Mode (RawBT / Browser) | Settings > Printer 탭 | **그대로** |
| Bill Printer (이름, 자동인쇄) | Settings > Printer 탭 | **그대로** |
| Kitchen Printer (이름, 자동인쇄) | Settings > Printer 탭 | **그대로** — Station 유무 관계없이 동일한 단일 카드 |
| Kitchen Ticket Options (아이템별 분리) | Settings > Printer 탭 | **그대로** |
| 주방 등록 + 이름 | Settings > **Kitchen Stations 탭 (신규)** | 신규 |
| 주방별 메뉴/카테고리 배정 | Settings > **Kitchen Stations 탭 (신규)** | 신규 |
| 배정 모드 (카테고리/메뉴) | Settings > **Kitchen Stations 탭 (신규)** | 신규 |

---

## 3. Printer 탭 Kitchen Printer 확장

### Station 0개일 때 (기존 그대로)
```
Kitchen Printer
  ☑ Enable Kitchen Printer
  Printer Address: [Kitchen-Printer     ]
  ☑ Auto-print on new order
```

### Station 1개 이상 등록되면
```
Kitchen Printers
  ⓘ Kitchen Stations이 등록되어 있어 주방별 프린터를 설정합니다.

  Grill Station
  ┌──────────────────────────────────────────┐
  │ Printer Address: [Kitchen-Grill       ]  │
  │ ☑ Auto-print on new order               │
  └──────────────────────────────────────────┘

  Cold Station
  ┌──────────────────────────────────────────┐
  │ Printer Address: [Kitchen-Cold        ]  │
  │ ☑ Auto-print on new order               │
  └──────────────────────────────────────────┘

  Noodle Station
  ┌──────────────────────────────────────────┐
  │ Printer Address: [Kitchen-Noodle      ]  │
  │ ☑ Auto-print on new order               │
  └──────────────────────────────────────────┘
```

기존 Kitchen Printer 카드 1개 → Station별 프린터 카드 N개로 자동 전환.
Station을 모두 지우면 다시 기존 단일 카드로 복원.

---

## 4. Kitchen Stations 탭 (신규)

### 기본 동작 (v3.14+)

신규 레스토랑은 Kitchen Stations 탭에 **처음 진입하는 순간 백엔드가 "Kitchen" default station 을 자동으로 생성**한다 (`GET /api/kitchen-stations` 가 lazy-create). 사용자가 별도로 설정하지 않아도 온보딩 체크리스트의 "Set up Kitchen Stations" 가 즉시 완료로 표시된다.

**stations 개수에 따른 UI 분기**:
- `stations.length ≤ 1`: 초록색 안내 배너 ("You have 1 kitchen station. All orders will be routed here. No setup needed.") + **Assignment Mode 카드/Unassigned 경고 숨김**. 라우팅 선택지가 의미 없으므로 복잡도 제거
- `stations.length > 1`: 아래 화면 구성처럼 Assignment Mode + Unassigned 경고 전부 표시

### 화면 구성 (stations ≥ 2 일 때)
```
┌─────────────────────────────────────────────────────┐
│  Kitchen Stations                                    │
│                                                      │
│  ⓘ 주방을 등록하면 Kitchen Display에서 주방별로      │
│    필터링되고, 주문 시 주방별 오더티켓이 분리됩니다.   │
│    주방을 등록하지 않으면 현재와 동일하게 동작합니다.  │
│    프린터 설정은 Printer 탭에서 합니다.               │
│                                                      │
│  ── Assignment Mode ─────────────────────────────    │
│                                                      │
│  ○ By Category (권장)                                │
│    카테고리 단위로 주방 배정.                          │
│    새 메뉴 추가 시 자동으로 해당 주방에 배정.          │
│                                                      │
│  ○ By Menu Item                                      │
│    메뉴 하나하나에 주방을 지정.                        │
│    정밀하지만 새 메뉴마다 수동 배정 필요.              │
│                                                      │
│  ── Stations ──────────────────── [+ Add Station]    │
│                                                      │
│  ┌─────────────────────────────────────────────┐     │
│  │ 🟢 Grill Station                            │     │
│  │    Categories: BBQ, Steak, Grilled Seafood  │     │
│  │                          [Edit] [Delete]    │     │
│  ├─────────────────────────────────────────────┤     │
│  │ 🟢 Cold Station                             │     │
│  │    Categories: Salad, Dessert               │     │
│  │                          [Edit] [Delete]    │     │
│  ├─────────────────────────────────────────────┤     │
│  │ 🟡 Noodle Station                           │     │
│  │    Categories: (none assigned)              │     │
│  │                          [Edit] [Delete]    │     │
│  └─────────────────────────────────────────────┘     │
│                                                      │
│  ⚠️ Unassigned: Beverages, Snacks                    │
│     미배정 메뉴는 모든 주방 화면에 표시됩니다.         │
└─────────────────────────────────────────────────────┘
```

### Station 추가/편집 모달
```
┌─────────────────────────────────────────────┐
│  Add Kitchen Station                         │
│                                              │
│  Station Name *                              │
│  ┌──────────────────────────────────────┐    │
│  │ Grill Station                        │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ── Assign Categories ─────────────────────  │
│  (카테고리 모드일 때)                         │
│                                              │
│  ☑ BBQ              ☑ Steak                  │
│  ☑ Grilled Seafood  ☐ Salad                  │
│  ☐ Dessert          ☐ Drinks                 │
│                                              │
│  ── Assign Menu Items ─────────────────────  │
│  (메뉴 모드일 때)                             │
│                                              │
│  ☑ Beef Burger       ☑ Chicken Steak         │
│  ☑ Grilled Salmon    ☐ Caesar Salad          │
│  ...                                         │
│                                              │
│              [Cancel]  [Save]                │
└─────────────────────────────────────────────┘
```

프린터 설정은 여기에 없음. Printer 탭에서 설정.

---

## 5. 메뉴 배정 모드

### By Category (권장, 기본값)
- 카테고리에 kitchen_station_id를 지정
- 해당 카테고리의 모든 메뉴가 자동으로 해당 주방에 배정
- 새 메뉴 추가 시 자동 배정 (카테고리를 선택하면 주방도 따라옴)

### By Menu Item
- 메뉴 하나하나에 kitchen_station_id를 지정
- 정밀하지만 새 메뉴마다 수동 배정 필요

### 오버라이드 규칙
카테고리 모드에서도 특정 메뉴만 다른 주방으로 보내고 싶으면 메뉴에서 직접 지정 가능.

**주방 결정 우선순위:**
```
1순위: product.kitchen_station_id (메뉴 개별 지정 — 오버라이드)
2순위: category.kitchen_station_id (카테고리 배정)
3순위: NULL → 미배정 (All에서만 표시)
```

---

## 6. Kitchen Display 변경

### Station 탭 추가
```
[All] [Grill Station] [Cold Station] [Noodle Station]
```

| 조건 | 동작 |
|------|------|
| Station 0개 | 탭 미표시, 현재와 동일 |
| Station 1개 이상 | [All] + Station 탭 표시 |
| All 탭 | 모든 아이템 (현재와 동일) |
| Station 탭 | 해당 Station 배정 아이템만 필터 |
| 미배정 아이템 | All 탭에서만 보임 |

**Order View**: 해당 주방 아이템이 포함된 주문만 표시. 다른 주방 아이템은 회색 처리 + 축소.
**Item View**: 해당 주방 아이템만 그룹핑.

### Station 직접 접속 URL
`/restaurant/{id}/kitchen?station={순서}` — 순서는 1부터 시작 (DB ID가 아닌 표시 순서).
Station 버튼 클릭 시 URL도 동기화됨. 기본 탭은 항상 Order View.

### Item View Merge 설정 (2026-04-03)
Settings > Kitchen Stations 탭에서 설정.
- **Time Limit (분)**: 주문 시간 기준 N분 이내 아이템만 합침. 초과 시 별도 행.
- **Max Count (개수)**: 한 그룹 수량이 N개 초과 시 분리. 예: max 3, 같은 메뉴 7개 → 3+3+1.
- 미설정(0) = 무제한 (기존 동작).
- 기존 그룹핑 로직은 미수정, 후처리(applyMergeLimits)로 제한 적용.
- Kitchen Display Item 탭 좌측에 현재 설정값 표시 + Settings 바로가기.
- DB: `restaurants.kitchen_item_merge` JSON (`{time_limit, max_count}`).

---

## 7. 오더티켓 분리 인쇄

### 동작 흐름
```
주문 접수 (예: 스테이크 + 샐러드 + 라멘)
  ↓
아이템별 주방 결정 (우선순위: 메뉴 > 카테고리 > 미배정)
  ↓
주방별로 묶기:
  Grill Station → [스테이크]
  Cold Station  → [샐러드]
  Noodle Station → [라멘]
  ↓
각 주방의 프린터 설정 확인 (Printer 탭):
  auto_print ON? → RawBT intent 자동 전송
  auto_print OFF? → 수동 프린트 버튼으로만 전송
  ↓
RawBT intent (기본 프린터로 전송):
  ⚠️ RawBT는 S.s= 파라미터 미지원 — 항상 앱 기본 프린터로만 출력
  → 멀티 프린터 사용 시: 각 Station별 별도 디바이스 + Kitchen Display 필터
  → 각 디바이스의 RawBT 기본 프린터를 해당 Station 프린터로 설정
```

### 오더티켓 레이아웃
```
================================
  [ Grill Station ]
  Order #123 / Table 5
  12:34 PM
================================
 1x Beef Steak
   - Well done
   - No sauce
================================
  Ticket 1 of 3
================================
```

### Station 없으면?
기존과 100% 동일: Kitchen Printer 1개로 전체 주문 티켓 인쇄.

### 프린터 연결 방식
RawBT 앱이 중간 다리 역할. 블루투스/Wi-Fi(IP)/USB 모두 RawBT에서 등록한 프린터명으로 구분.
```
브라우저 → RawBT 앱 → 프린터 (BT/Wi-Fi/USB)  ✅
브라우저 → 직접 TCP → 프린터                   ❌ (브라우저 보안 제한)
```

---

## 8. DB 설계

### 새 테이블: kitchen_stations

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT AUTO_INCREMENT PK | |
| restaurant_id | INT NOT NULL FK | restaurants.id |
| name | VARCHAR(100) NOT NULL | "Grill Station" |
| display_order | INT DEFAULT 0 | 정렬 순서 |
| is_active | BOOLEAN DEFAULT true | 활성/비활성 |
| created_at | DATETIME | |
| updated_at | DATETIME | |

프린터 정보는 여기에 저장하지 않음 → 기존 `restaurants.printer_settings` JSON에 확장.

### 기존 테이블 변경

| 테이블 | 추가 컬럼 | 용도 |
|--------|----------|------|
| categories | kitchen_station_id INT NULL FK | 카테고리 모드 배정 |
| products | kitchen_station_id INT NULL FK | 메뉴 모드 또는 오버라이드 |
| restaurants | kitchen_assignment_mode VARCHAR(20) DEFAULT 'category' | 배정 모드 |

### printer_settings JSON 확장

```javascript
// Station 0개 (기존 — 변경 없음)
{
  printerMode: 'rawbt',
  billPrinter: { enabled: true, name: 'Bill-Printer', autoPrint: false },
  kitchenPrinter: { enabled: true, name: 'Kitchen-Printer', autoPrint: true, printPerItem: false }
}

// Station 있을 때 (확장)
{
  printerMode: 'rawbt',
  billPrinter: { enabled: true, name: 'Bill-Printer', autoPrint: false },
  kitchenPrinter: { enabled: true, name: 'Kitchen-Printer', autoPrint: true, printPerItem: false },
  kitchenStationPrinters: {
    "1": { name: 'Kitchen-Grill', autoPrint: true },
    "2": { name: 'Kitchen-Cold', autoPrint: true },
    "3": { name: 'Kitchen-Noodle', autoPrint: false }
  }
}
```

`kitchenStationPrinters`가 있으면 Station별 프린터 사용, 없으면 기존 `kitchenPrinter` 사용.

---

## 9. API 설계

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/kitchen-stations?restaurant_id=5 | Station 목록 (배정된 카테고리/메뉴 포함) |
| POST | /api/kitchen-stations | Station 생성 |
| PUT | /api/kitchen-stations/:id | Station 수정 (이름, 순서, 배정 변경) |
| DELETE | /api/kitchen-stations/:id | Station 삭제 (연결된 카테고리/메뉴 배정 해제) |
| GET | /api/kitchen-stations/unassigned?restaurant_id=5 | 미배정 카테고리/메뉴 목록 |
| PUT | /api/restaurants/:id | kitchen_assignment_mode 변경 (기존 API 확장) |

---

## 10. UX 안내 메시지

| 상황 | 위치 | 메시지 |
|------|------|--------|
| Station 0개 | Kitchen Stations 탭 | "주방을 등록하지 않으면 현재와 동일하게 동작합니다." |
| Station 추가 후 | Printer 탭 | Kitchen Printer 영역이 Station별 프린터 카드로 자동 전환 |
| 미배정 카테고리 있음 | Kitchen Stations 탭 | "⚠️ Unassigned: Beverages, Snacks — 미배정 메뉴는 모든 주방 화면에 표시됩니다." |
| 모드 전환 | Kitchen Stations 탭 | "배정 모드를 변경하시겠습니까? 기존 배정은 유지되지만 새 모드의 배정이 적용됩니다." |
| Station 삭제 | 확인 모달 | "Grill Station을 삭제하면 연결된 3개 카테고리가 미배정됩니다." |
| 프린터 미설정 | Printer 탭 | Station 카드에 🟡 "프린터 주소를 입력하세요" |

### Station 카드 상태 시각화

| 상태 | 표시 |
|------|------|
| 프린터 설정됨 + 메뉴 배정됨 | 🟢 정상 |
| 프린터 미설정 | 🟡 "프린터가 설정되지 않았습니다 (Printer 탭에서 설정)" |
| 카테고리/메뉴 미배정 | 🟡 "배정된 메뉴가 없습니다" |
| 비활성 | 🔴 Inactive 배지 |

---

## 11. 구현 Phase

| Phase | 내용 | 수정 파일 | 규모 |
|-------|------|-----------|------|
| **Phase 1** | DB 테이블 + Model + API CRUD | 백엔드 3~4파일 신규 | 중 |
| **Phase 2** | Settings → Kitchen Stations 탭 UI | SettingsPage.tsx | 중 |
| **Phase 3** | Printer 탭 Station별 프린터 확장 | SettingsPage.tsx | 소 |
| **Phase 4** | Kitchen Display 주방 필터 탭 | KitchenDisplayPage.tsx | 중 |
| **Phase 5** | 오더티켓 주방별 분리 인쇄 | billPrint.js | 중 |

### Phase 간 의존성
```
Phase 1 (DB/API) → Phase 2 (주방설정 UI) → Phase 3 (프린터 확장)
                                          → Phase 4 (Display 필터)
                                          → Phase 5 (분리 인쇄)
```
Phase 3, 4, 5는 Phase 2 이후 독립적으로 진행 가능.
