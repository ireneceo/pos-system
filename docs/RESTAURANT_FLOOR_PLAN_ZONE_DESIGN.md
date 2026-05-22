# Restaurant Floor Plan — Zone & Table Group 설계

> **Created:** 2026-05-22
> **Status:** Design — pending Irene approval
> **Scale:** Large (DB 구조 확장 + Settings UI + Floor Plan 페이지 + QR 흐름 + 마이그)
> **Backward compatibility:** 필수 — 기존 매장 (옛 floor_plan) 손대지 않고 작동
> **Related docs:** `ENTITY_FLOOR_PLAN_SYSTEM.md` (Brand/Foodcourt — 본 작업과 별개)

---

## 1. 요구사항 (Irene 보고)

매장 운영자가 보고:
1. **Floor Plan 의 Zone 분리** — 홀(indoor) / 밖(outdoor) 같은 영역을 나눠서 별도 관리. 각 zone 별 담당자 존재. 통합으로도 보고 싶음.
2. **테이블 약어 prefix** — 실내는 `I`, 밖은 `O` 같은 prefix. 같은 zone 안에서도 group 별 다른 약어 가능 (예: indoor 의 main hall = `I`, indoor 의 private room = `P`).
3. **계층 구조**: Restaurant → Zone (여러 개) → Table Group (각 group 별 prefix) → Tables
4. **테이블 QR 연동** — Zone/Group prefix 가 반영된 테이블 번호로 QR 생성 (예: `?table=I-5`).
5. **통합 + Zone 별 보기** — Floor Plan 페이지에서 전체 / zone 별 filter

---

## 2. 현재 구조 (Before)

### 2-1. DB
```
Restaurant
├── table_settings (JSON)
│   ├── enableTableNumbers: bool
│   ├── tablePrefix: 'T'            ← 단일 prefix
│   ├── totalTables: 20
│   └── qrCodeBaseUrl
└── floor_plan (JSON medium)
    └── tables: [{ id, x, y, width, height, shape, seats }, ...]
```

### 2-2. UI
- **Settings → Operations 탭 → Table Management 카드**: tablePrefix + totalTables 입력
- **Settings → Operations 탭 → Tables Grid**: 자동 생성 테이블 1~totalTables (T-1, T-2, ...) + 각각 QR Copy/SVG/PNG
- **Floor Plan 페이지**: 테이블 드래그 배치, table 별 주문 status 표시

### 2-3. Backward compat 영향 데이터
- 기존 매장 약 N건 (운영 + dev 데모) 모두 `tablePrefix: 'T'` 또는 매장 지정 단일 prefix 사용
- 새 구조 적용 시 자동 마이그 필요

---

## 3. 신규 구조 (After)

### 3-1. floor_plan JSON 구조 확장 (version 2)

```jsonc
{
  "version": 2,                          // 옛 데이터(version 미존재 또는 1)와 구분
  "zones": [
    {
      "id": "z_indoor",                  // 안정적 stable id (UI 식별용)
      "name": "Indoor Hall",
      "sort_order": 1,
      "manager_user_ids": []             // optional, Phase 2 에서 활용 (Zone 별 권한)
    },
    {
      "id": "z_outdoor",
      "name": "Outdoor Patio",
      "sort_order": 2,
      "manager_user_ids": []
    }
  ],
  "table_groups": [
    {
      "id": "g_indoor_main",
      "zone_id": "z_indoor",
      "name": "Main Hall",
      "prefix": "I",                     // table number = "I-1", "I-2" ...
      "sort_order": 1
    },
    {
      "id": "g_indoor_private",
      "zone_id": "z_indoor",
      "name": "Private Rooms",
      "prefix": "P",                     // 같은 zone 내 다른 prefix
      "sort_order": 2
    },
    {
      "id": "g_outdoor_patio",
      "zone_id": "z_outdoor",
      "name": "Patio",
      "prefix": "O",
      "sort_order": 1
    }
  ],
  "tables": [
    {
      "id": "t_1",                       // 안정적 stable id
      "group_id": "g_indoor_main",
      "number": "1",                     // group prefix 와 합쳐 표시 "I-1"
      "label": "I-1",                    // computed (저장 시 같이 저장 — 빠른 표시용)
      "seats": 4,
      "x": 120, "y": 80,
      "width": 80, "height": 80,
      "shape": "rectangle",
      "rotation": 0                      // optional
    }
    // ... 기타 테이블
  ],
  "canvas": {                            // optional, Floor Plan 캔버스 메타데이터
    "width": 1200,
    "height": 800,
    "background_image_url": null         // 향후 배경 이미지 placement 지원 시
  }
}
```

### 3-2. table_settings 호환성 유지 (변경 최소화)

기존 `tablePrefix: 'T'` 필드는 그대로 유지 (legacy fallback).
신규 매장은 floor_plan.table_groups[].prefix 가 source of truth.
`enableTableNumbers`, `tableNumberRequired`, `qrCodeBaseUrl` 등은 그대로.

### 3-3. 별도 모델 추가 X — JSON 확장 채택

| 안 | 장점 | 단점 |
|----|------|------|
| **JSON 확장 (채택)** | 마이그 단순, schema migration 최소, dev/prod 동일 코드 | floor_plan JSON 비대화 우려 (large 매장 100+ tables) — `TEXT('medium')` 16MB 한도 충분 |
| 정규화 모델 (Zone/Group/Table) | 쿼리 유연, 인덱싱 | 신규 모델 3개 + association + 마이그 + 운영 DB schema 변경 ↑ |

결론: **JSON 확장** — 매장당 floor_plan 평균 1-5KB 수준, scale 충분. Phase 2 에서 large 매장 ↑ 시 정규화 고려.

---

## 4. UI 변경 사항

### 4-1. Settings → Operations 탭 — "Table Management" 카드 재설계

**Before** (현재):
```
[Table Prefix: T ]  [Total tables: 20]
[Auto-generated tables grid: T-1, T-2, ... T-20]
[ Each table: Copy URL | SVG | PNG ]
```

**After** (신규):
```
┌─ Zones ─────────────────────────────────────────────┐
│ [+ Add Zone]                                         │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Indoor Hall          [Rename] [Delete] [≡ Drag] │ │
│ │   Table Groups:                                  │ │
│ │     • Main Hall (prefix: I, 12 tables)  [Edit]  │ │
│ │     • Private Rooms (prefix: P, 3 tables) [Edit]│ │
│ │   [+ Add Table Group]                            │ │
│ └─────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Outdoor Patio         [Rename] [Delete]          │ │
│ │   Table Groups:                                  │ │
│ │     • Patio (prefix: O, 8 tables) [Edit]         │ │
│ │   [+ Add Table Group]                            │ │
│ └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘

┌─ Table QR Codes (filter: All | Indoor | Outdoor) ───┐
│ [I-1] [I-2] ... [I-12]  [P-1] [P-2] [P-3]          │
│ [O-1] [O-2] ... [O-8]                                │
│  Each: Copy URL | SVG | PNG                          │
└──────────────────────────────────────────────────────┘
```

**Group 편집 모달**:
- Name (e.g., "Main Hall")
- Prefix (1-3 글자, e.g., "I", "P", "VIP")
- Table count (자동 생성 / 수동 추가 둘 다 지원)
- Seats per table (default 4, 테이블 별 override 가능)

### 4-2. Floor Plan 페이지 — Zone Filter 탭 추가

**Header**:
```
[All Zones (32 tables)]  [Indoor (15)]  [Outdoor (8)]  [Private (3)] ... | [Edit Layout]
```
- Tab/chip 선택 → 해당 zone 의 tables 만 canvas 표시
- All Zones: 모든 zone tables 한 화면 (현재 동작 유지)
- 통계 패널: 선택된 zone 의 occupancy / 매출 등

**Editor 모드**:
- 새 테이블 추가 시 → Zone + Group 선택 dropdown 표시 (현재는 zone 단일 추정)
- 기존 테이블 드래그 — 자유 (zone 변경은 Group 변경 액션 별도)

### 4-3. Table QR 흐름 — Group prefix 반영

기존 URL: `https://purplehere.com/mobile/{slug}?table=T-5`
신규 URL: `https://purplehere.com/mobile/{slug}?table=I-5`

QR 생성 코드: `table.label` 사용 (이미 computed 저장).
**옛 QR 호환**: 옛 매장 마이그 후 default zone="Main", group prefix=옛 tablePrefix → 같은 라벨 (T-5) 유지. 옛 인쇄된 QR 그대로 작동.

---

## 5. 마이그레이션 (Backward compat 핵심)

### 5-1. 자동 마이그 (서버 read 시 lazy migrate)

`Restaurant.floor_plan` getter 에서 `version` 필드 검사:
- `version === 2` → 신규 구조 그대로 반환
- `version` 없음 (옛 데이터) → 즉시 v2 구조로 변환 + DB 저장
  - default zone 1개 생성 (`name: "Main", id: "z_main", sort_order: 1`)
  - default group 1개 생성 (`name: "Tables", id: "g_main", prefix: <옛 tablePrefix 또는 'T'>, sort_order: 1`)
  - 옛 tables → 새 tables 배열 (group_id="g_main", number 유지, label 계산)

### 5-2. Bulk 마이그 스크립트 (선택)

`scripts/migrate-floor-plan-v2.js`:
- 모든 매장 iterate
- `version` 없으면 v2 변환 + DB update
- idempotent (이미 v2 면 skip)
- dev/prod 모두 실행

**또는** lazy migrate 만 (read 시 자동) — 운영 안전성 위해 권장.

### 5-3. table_settings 호환

`Restaurant.table_settings.tablePrefix` 는 옛 매장에 그대로 둠 (legacy fallback). 신규 매장은 floor_plan.table_groups[].prefix 가 source of truth. UI는 신규 구조 우선 표시.

---

## 6. 권한 (Zone Manager) — Phase 2

**Phase 1 에서는 view filter 만** (zone 별 보기). 모든 staff/admin 은 모든 zone 보기 가능.

**Phase 2 (별도 사이클)**:
- `User.zone_ids: number[]` (또는 `restaurant_zone_assignments` 테이블) 추가
- Manager 로그인 시 자신의 zone tables/orders 만 보기
- Restaurant Admin / Brand General / Owner 는 모든 zone 보기

---

## 7. 영향 분석 (회귀 안전)

### 7-1. 코드 변경 위치

| 영역 | 파일 | 변경 종류 |
|------|------|----------|
| 모델 | `models/Restaurant.js` | floor_plan getter 에 lazy migrate (v1 → v2) 추가 |
| 라우트 | `routes/store.js` 또는 `restaurants-crud.js` | Floor plan PUT 검증 (zone/group 무결성) |
| Settings UI | `pages/Settings/SettingsPage.tsx` | Operations 탭 — Tables 카드 재설계 + Zone 관리 |
| Floor Plan | `pages/FloorPlan/FloorPlanPage.tsx` | Zone filter tab + Group prefix 반영 |
| QR 생성 | `pages/Settings/SettingsPage.tsx` (Tables Grid) | `table.label` 사용 |
| Mobile order | `pages/PaymentPage` / `mobile-orders.js` | URL `?table=I-5` parsing — 기존 코드 호환 (table number string 그대로 보존) |

### 7-2. 비변경 영역 (안전 보장)

- 주문 흐름 (orders-crud): `table_number` 컬럼은 그대로 string. "I-5" 그대로 저장.
- KDS / LiveOrders: `table_number` 표시 — string 그대로
- 빌 출력 (billPrint.js): table_number 그대로
- Table QR session: 기존 동작 유지

### 7-3. 잠재 회귀 risk

| Risk | 완화 방안 |
|------|----------|
| 옛 floor_plan v1 데이터 매장이 신규 코드 진입 시 깨짐 | lazy migrate (getter) 로 first read 시 자동 v2 변환 |
| Settings UI 갱신 후 옛 매장 자동 생성된 default zone 이 매장 의도와 다름 | 사용자에게 "Migration completed: 1 default zone created. Customize?" 알림 카드 표시 (1회) |
| Floor Plan editor 가 옛 데이터 load 실패 | `version` 미존재 시 v2 inline 변환 후 render |
| Total tables 입력 ↔ table_groups[].table_count 동기화 | UI 에 명시 "Total tables across all groups: X" 표시 |

---

## 8. 단계적 구현 plan (Phase 1만)

| 단계 | 작업 | 작업량 |
|------|------|--------|
| **1** | `Restaurant.floor_plan` getter 에 v1→v2 lazy migrate 로직 추가 + 단위 테스트 | 1h |
| **2** | `models/Restaurant.js` JSDoc + TypeScript 인터페이스 (`FloorPlanV2`) | 30분 |
| **3** | Settings UI — Zones 카드 (CRUD) + Table Groups 카드 (CRUD) | 2h |
| **4** | Settings UI — Table QR Grid 재설계 (group prefix 사용, zone filter) | 1h |
| **5** | Floor Plan 페이지 — Zone filter tab + group prefix 표시 | 1.5h |
| **6** | bulk 마이그 스크립트 (idempotent, dev/prod) | 30분 |
| **7** | 실 API 검증 (옛 매장 first read → v2 변환 확인, 새 zone/group CRUD, QR 생성) | 1h |
| **8** | 회귀 검증 (KDS / LiveOrders / Mobile order table_number 표시 정상) | 30분 |
| **9** | i18n 4 langs (zone, table group 신규 키 약 15개) | 30분 |
| | **합계** | **약 9시간** (한 사이클) |

---

## 9. 검증 시나리오 (구현 후)

1. **옛 매장 마이그 검증**
   - 매장 (id=16) GET → floor_plan 응답에 `version: 2` + default zone "Main" + default group "Tables" + 옛 tables 보존 확인

2. **신규 zone 추가**
   - POST /api/restaurants/16/zones → "Outdoor Patio" 추가
   - GET 으로 floor_plan 응답에 zone 추가됨 확인

3. **신규 table group 추가**
   - "Outdoor Patio" zone 에 "Patio" group (prefix=O, 5 tables) 추가
   - tables[] 에 O-1 ~ O-5 5개 추가 확인

4. **Table QR URL 검증**
   - QR Copy → `https://purplehere.com/mobile/{slug}?table=O-3`
   - 모바일 진입 → `?table=O-3` parsing → 주문 생성 시 `table_number: 'O-3'` 저장

5. **Floor Plan zone filter**
   - 페이지 진입 → All Zones 디폴트
   - "Outdoor" 탭 클릭 → 5 tables 만 canvas 표시
   - 통계: 5/5 vacant

6. **옛 QR 호환**
   - 마이그 후 옛 인쇄 QR (`?table=T-3`) 진입 → table number "T-3" 그대로 주문 생성 (없는 group prefix 면 warning 만, 거부 안 함)

---

## 10. 결정 필요 사항 (사용자 결정)

| # | 결정 항목 | 옵션 | 권장 |
|---|----------|------|------|
| 1 | DB 구조 — JSON 확장 vs 정규화 모델 | JSON 확장 / Zone Group Table 별도 모델 | **JSON 확장** (마이그 단순) |
| 2 | 마이그 방식 | lazy migrate / bulk script / 둘 다 | **lazy migrate** (안전) + 선택적 bulk script |
| 3 | 옛 단일 tablePrefix UI | 완전 제거 / legacy 표시만 | **legacy 표시만** (기존 매장 혼란 없음) |
| 4 | Zone Manager 권한 (Phase 2) | 즉시 구현 / 별도 사이클 | **별도 사이클** (Phase 1 후 결정) |
| 5 | Group prefix 형식 제약 | 1-3 글자 / 자유 | **1-3 글자** (QR / 빌 출력 정렬 안정) |
| 6 | Group 간 number 중복 | 허용 (I-1 + O-1 OK) / 매장 전체 unique | **허용** (자연스러움) |

---

## 11. 변경 후 새 매장 예시 흐름

1. 매장 admin 이 Settings → Operations → "Zones" 카드에서:
   - "Indoor Hall" zone 추가
   - "Outdoor Patio" zone 추가

2. 각 zone 에 table group 추가:
   - Indoor Hall → "Main" (prefix=I, 12 tables)
   - Outdoor Patio → "Patio" (prefix=O, 8 tables)

3. 자동 생성된 tables:
   - I-1, I-2, ... I-12 (12개)
   - O-1, O-2, ... O-8 (8개)

4. Floor Plan 페이지 진입:
   - "All Zones" 탭 → 20 tables 캔버스 표시 (모두 같은 화면)
   - "Indoor" 탭 → 12 tables
   - "Outdoor" 탭 → 8 tables

5. 각 테이블 QR:
   - I-1 QR → `?table=I-1`
   - O-3 QR → `?table=O-3`

6. 손님이 O-3 테이블 QR 스캔 → 주문 생성 시 `table_number: 'O-3'` 저장 → 매장 KDS/LiveOrders 에서 "Table O-3" 표시

---

## 12. 작업 시작 조건

- [ ] Irene 가 10번 결정 사항 확인
- [ ] DB JSON 확장 안 승인
- [ ] lazy migrate 안 승인
- [ ] Phase 1 범위 (Zone Manager 권한 제외) 확인

승인 받은 후 Phase 1 9시간 작업 시작.
