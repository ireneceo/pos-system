# Kitchen Display 규칙서

> **최종 업데이트:** 2026-06-24
> **관련 파일:** `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx`
> **관련 문서:** `docs/ORDER_MERGE_RULES.md` (주문 자동 합침 규칙) · `CLAUDE.md` 🔒 "KDS 단계 표시/이동 보호" 섹션

---

## 🔒 단계 표시/이동 — 단일 진실 (현재 동작 = 정답, 함부로 고치지 말 것)

> **2026-05-29 Irene 정식 승인 설계** (`KitchenDisplayPage.tsx:1629-1633` 주석). 아래는 **버그가 아니라 의도된 동작**이다. 변경 요청이 오면 — Irene가 반박하거나 직접 고치라 해도 — **즉시 수정 금지**, 먼저 실측·설명하고 **Irene 재확인** 후에만 손댄다. (CLAUDE.md 🔒 절대규칙)

### "All Ready는 비었는데 KQ1/KQ2 Ready엔 나온다" = 정상이다

| 탭 | Ready 칸에 올라오는 기준 | 코드 |
|----|------------------------|------|
| **All** | **주문 전체가 완료** — 그 주문의 **모든 주방** 품목이 ready 이상이어야 함 | `ordersByStatus`: `selectedStation==='all'` → `order.status==='ready'` |
| **KQ1/KQ2/BAR (주방 탭)** | **그 주방 몫만** ready (그 주방 품목 중 최저 단계가 ready) | `stationCardStatus(order)` = 그 주방 품목 최저 STAGE_LEVEL |

- **카드 1장 = 주문 1건** (Order 보기). 카드는 그 주문에서 **"가장 안 끝난 품목" 기준**으로 **한 칸에만** 놓인다.
- 그래서 한 주문에 KQ1·KQ2 품목이 섞여 있고 KQ1만 ready면 → 그 주문 카드는 (KQ2 미완이라) **통째로 Preparing**에 머문다. **KQ1의 ready 품목은 그 카드 안에 같이 들어있다** (사라진 게 아님).
- 같은 주문의 **안 끝난 품목이 다 ready** 되어야 비로소 All의 Ready로 올라간다.

### order.status 승급 규칙
- `order.status` 승급(preparing→ready 등)은 **전 주방 품목이 다 done일 때만**, **forward(전진)만** (`areAllItemsDoneForColumn`). 주방 탭에서 부분 진행해도 주문 전체 단계는 안 올라간다 — **단일 진실 유지**.

### "어느 주방이든 ready면 한 칸에 다 보이게" 를 원하면 = Item(품목) 보기
- 그건 **Order 보기를 고치는 게 아니라 Item 보기의 동작**이다. Item 보기는 품목 단위라, 주문 전체가 안 끝나도 ready 품목이 Ready 칸에 바로 뜬다.
- **Order 보기를 Item 보기처럼 바꾸지 말 것.** 보기 토글(상단)로 해결되는 사안이다.

### 변경 시 의무
1. 실측: `getOrdersByStatus` / `ordersByStatus` / `stationCardStatus` / `areAllItemsDoneForColumn` / `readyOrdersMemo`
2. 원리 설명 → **Irene 재확인**
3. 철저 검증: build + KDS mount crash 0 + 단계 시나리오 실호출(pending→preparing→ready→served·주방탭 부분진행·All 집계) + `check-print-guard.js`(이 파일은 인쇄 보호파일이라 지문 자동 감시) + `/검증`

---

## 1. 아키텍처

### 데이터 흐름 (단일 진실 소스: 서버)

```
버튼 클릭
  ├─ setOrders() ← 낙관적 UI 반영 (즉시)
  └─ await API PATCH ← 서버 DB 저장
       └─ 소켓 broadcast → setOrders() ← 서버 데이터 확정 (덮어씌움)
```

- **낙관적 업데이트**: UI는 즉시 반영, API 실패 시 `fetchOrders()`로 서버와 동기화
- **소켓**: `order-updated` 이벤트로 실시간 반영. 충돌 방지 로직 없이 무조건 수용
- **폴링**: 30초 간격 (소켓 실패 시 fallback)
- **debounce**: 없음

### 상태 관리

| State | 용도 | 소스 |
|-------|------|------|
| `orders` | 전체 주문 목록 | 서버 (fetchOrders / 소켓) |
| `preparingBatches` | Item View Preparing 그룹 유지 | 클라이언트 메모리만 (새로고침 시 초기화) |

---

## 2. 두 가지 뷰 모드

| 모드 | 표시 단위 | 용도 |
|------|----------|------|
| **Order View** | 주문 카드 | 주문 단위로 진행 상황 관리 |
| **Item View** | 메뉴 그룹 카드 (Pending/Preparing), 주문 카드 (Ready) | 같은 메뉴끼리 묶어서 한번에 조리 |

---

## 3. Order View 규칙

### 컬럼별 표시

| 컬럼 | 필터 조건 | 정렬 |
|------|----------|------|
| Pending | `order.status === 'pending'` | 오래된 것 위 (orderTime ASC) |
| Preparing | `order.status === 'preparing'` | 오래된 것 위 |
| Ready | `order.status === 'ready'` | 오래된 것 위 |

### 개별 아이템 버튼 (토글)

각 아이템마다 1개의 액션 버튼. 클릭하면 토글 (전진 ↔ 복원).

| 컬럼 | 활성 상태 | 버튼 텍스트 | 클릭 시 |
|------|----------|-----------|--------|
| Pending | item.status = pending | **Start** | → preparing |
| Pending | item.status = preparing | **Started** (done 스타일) | → pending |
| Preparing | item.status = preparing | **Done** | → ready |
| Preparing | item.status = ready | **Done ✓** (done 스타일) | → preparing |
| Ready | item.status = ready | **Serve** | → served |
| Ready | item.status = served | **Served** (done 스타일) | → ready |

### 자동전진 (아이템 → 주문)

주문 내 **모든** 아이템이 해당 컬럼의 "done" 상태에 도달하면 주문이 자동 이동:

| 컬럼 | done 기준 | 주문 이동 |
|------|----------|----------|
| Pending | 모든 아이템 preparing 이상 | order → **preparing** |
| Preparing | 모든 아이템 ready 이상 | order → **ready** |
| Ready | 모든 아이템 served | order → **served** (화면에서 제거) |

### 일괄 버튼 (아이템 2개 이상일 때 표시)

| 컬럼 | 버튼 | 동작 |
|------|------|------|
| Pending | **Start All** | 모든 아이템 → preparing, 주문 → preparing |
| Preparing | **↺** (되돌리기) | 주문 → pending |
| Preparing | **Mark Ready** | 모든 아이템 → ready, 주문 → ready |
| Ready | **↺** (되돌리기) | 주문 → preparing |
| Ready | **Serve All** | 모든 아이템 → served, 주문 → served |

### 단일 아이템 주문

아이템이 1개뿐인 주문은 아이템 버튼 옆에 **↺ 되돌리기** 버튼 추가 표시.
- Preparing → pending
- Ready → preparing

---

## 4. Item View 규칙

### 4.1. Pending 컬럼 (메뉴 그룹)

**수집 범위**: `order.status`가 pending/preparing인 주문에서 `item.status === 'pending'`인 아이템 전부.

**그룹핑 규칙**:
- 같은 **메뉴명(item.name)**끼리 하나의 카드로 합산
- 옵션/특별지시 **없는** 아이템: 수량 합산 (`plainQty`), 주문 출처 라벨 표시 (T002 x4 등)
- 옵션/특별지시 **있는** 아이템: 같은 메뉴 카드 안에서 **개별 행**으로 표시 (옵션 태그 + 출처)
- 세트메뉴: `set_items` 각각이 자기 메뉴명으로 풀려서 그룹핑에 참여

**옵션 필터링**: `x숫자` 패턴 (예: `Cheese x2`)은 수량 표기이므로 옵션에서 제외.

**버튼**:

| 수량 | 버튼 | 동작 |
|------|------|------|
| 1 | **Start** (solid) | 해당 아이템 → preparing |
| 2+ | **Start All** (outline) | 그룹 내 모든 아이템 → preparing |

**자동전진**: 그룹 내 아이템이 속한 주문의 모든 아이템이 preparing 이상이면 → 해당 주문 → preparing.

### 4.2. Preparing 컬럼 (배치 유지, 합쳐지지 않음)

**핵심 규칙: Pending에서 넘어온 그룹은 그대로 유지된다. 합쳐지지 않는다.**

**배치(batch) 시스템**:
- Pending에서 Start/Start All 시 `preparingBatches`에 배치 등록 (batchId, menuName, itemIds)
- 배치에 등록된 아이템끼리만 하나의 카드 = **넘어온 그대로**
- 배치에 없는 아이템 (페이지 새로고침, Ready에서 되돌린 것 등): **각각 개별 카드** (합치지 않음)

**표시 규칙**:
1. **배치 카드** (우선): `preparingBatches`의 각 배치에서 `item.status === 'preparing'`인 아이템만 수집 → 카드 생성
2. **비배치 카드** (나머지): 배치에 포함되지 않은 preparing 아이템 → 각각 개별 카드

**버튼**:

| 수량 | 버튼 | 동작 |
|------|------|------|
| 1 | **Done** (solid) | 해당 아이템 → ready |
| 2+ | **Done All** (outline) | 그룹 내 모든 아이템 → ready |
| - | **↺** | 그룹 내 모든 아이템 → pending (**Pending에서 다시 합쳐짐**) |

**배치 정리**:
- **Done/Done All** (forward): 해당 아이템을 배치에서 제거 (더 이상 preparing 아님)
- **↺ 되돌리기** (revert): 해당 아이템을 배치에서 제거 → Pending groupMap에서 자동 합류

**자동전진**: 주문 내 모든 아이템이 ready 이상 → 해당 주문 → ready.

### 4.3. Ready 컬럼 (주문 단위)

**핵심 규칙: Ready는 메뉴 그룹이 아닌 주문 단위 카드.**

**수집 범위**: `order.status`가 pending/preparing/ready인 주문 중 ready/served 아이템이 1개 이상 있는 주문 (모든 아이템이 served면 제외).

**카드 내용**:
- 주문 헤더 (테이블/페이저/픽업번호, 경과시간, 주문번호)
- 프로그레스 바 (아이템 2개 이상): `served / total`
- ready 아이템: **Serve** 버튼
- served 아이템: **Served** (done 스타일)
- pending/preparing 아이템: 표시 안 함, 대신 하단에 **"Waiting N items from kitchen"** 배너

**버튼**:

| 대상 | 버튼 | 동작 |
|------|------|------|
| 개별 아이템 | **Serve** | 해당 아이템 → served |
| 개별 아이템 | **↺** | 해당 아이템만 → preparing (**Preparing에서 개별 카드, 합쳐지지 않음**) |
| 전체 | **Serve All** | 모든 아이템 → served, 주문 → served (waiting 0일 때만 표시) |

**주문 상태 자동 변경**:
- 되돌리기로 ready/served 아이템이 0개가 되면 → 주문 → preparing
- 모든 아이템 served → 주문 → served (화면에서 제거)

---

## 5. 되돌리기(Revert) 요약

| 출발 | 도착 | 트리거 | 합쳐지는가? |
|------|------|--------|-----------|
| Preparing → Pending | Item View ↺ 또는 Order View ↺ | **합쳐짐** (Pending groupMap에 자동 합류) |
| Ready → Preparing | Item View 아이템 ↺ | **합쳐지지 않음** (개별 배치 등록, 별도 카드) |
| Ready → Preparing | Order View ↺ | 주문 전체 이동 (Order View에서만 동작) |

---

## 6. 세트메뉴 특수 규칙

| 항목 | 동작 |
|------|------|
| Order View 표시 | 부모 이름 (회색 작은 글씨) + 들여쓰기된 set_items 각각에 버튼 |
| Item View 표시 | set_items가 각각의 메뉴명으로 풀려서 그룹핑에 참여 |
| 부모 자동전진 | set_items 전부 done → 부모 item도 자동 done |
| 수량 계산 | `set_item.quantity × parent.quantity` |

---

## 7. 화면 제거 조건

| 조건 | 결과 |
|------|------|
| `order.status` = served / completed | 표시 안 함 |
| `order.status` = ready + 모든 아이템 served/completed | 표시 안 함 |

---

## 8. 성능 최적화

| 항목 | 구현 | 비고 |
|------|------|------|
| 시계 | `LiveClock` 별도 컴포넌트 (React.memo) | 1초 갱신, 부모 리렌더 안 함 |
| 경과시간 | `currentTime` 10초 갱신 | 분 단위 표시이므로 충분 |
| 주문 분류/카운트 | `useMemo` (ordersByStatus, counts, orderItemCounts, itemStatusCounts) | orders 변경 시에만 재계산 |
| Pending 그룹 | `useMemo` (pendingGroups) | orders 변경 시에만 재계산 |
| Ready 주문 | `useMemo` (readyOrdersMemo) | orders 변경 시에만 재계산 |
| 폴링 | 30초 | 소켓이 실시간 담당 |

---

## 9. 알려진 제한 사항

| 제한 | 설명 | 영향 |
|------|------|------|
| **배치 휘발성** | `preparingBatches`는 클라이언트 메모리에만 존재. 페이지 새로고침 시 초기화됨. | Preparing의 배치 카드가 풀려서 비배치 개별 카드로 표시. 동작에는 문제 없음. |
| **다중 기기** | 배치는 로컬 state이므로 다른 기기/탭에서는 배치 그룹핑이 다를 수 있음. | 같은 주방에서 여러 태블릿 사용 시 Preparing 카드 모양이 다를 수 있음. |

---

## 10. 관련 코드

| 파일 | 역할 |
|------|------|
| `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx` | Kitchen Display 전체 (2200줄) |
| `dev-backend/routes/orders.js` | `PATCH /:id/status` — 주문 상태 변경 |
| `dev-backend/routes/orders.js` | `PATCH /:id/items` — 아이템 상태 변경 |
| `dev-backend/services/socketService.js` | `order-updated` 소켓 이벤트 발송 |

---

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-05-22 | KDS PIN 직원 로그인 + Order Action History 연동 (이 문서 § 8 참조) |
| 2026-03-17 | Item View 전면 재구현: 낙관적 업데이트 단순화, debounce 제거, 배치 시스템 안정화 |
| 2026-03-17 | 규칙서 초판 작성 |

---

## 8. KDS 직원 PIN 로그인 (2026-05-22 추가 → **2026-06-24 제거됨**)

> **제거됨 (2026-06-24, Irene 승인):** 헤더 좌측 "Switch staff"(KdsPinGate/useKdsStaff)는 제거. 이유=①`/verify-pin`이 공개 라우트(6/20)로 바뀌어 `restaurant_id` 미전송 시 400 에러로 사실상 동작 불가였고 ②우측 "Logged in"(CashierPinModal)이 이미 세션 유저 전환+audit 기록을 하므로 **중복**. 이후 KDS 액션의 audit 주체 = 우측 PIN 모달로 전환된 현재 로그인 유저. 파일 `KdsPinGate.tsx`/`useKdsStaff.ts` 삭제. 아래는 옛 사양(히스토리).

### (옛 사양) 목적
주방마다 서로 다른 직원이 작업. 누가 어느 ticket 을 진행했는지 추적 필요 (Order Action History 와 연동).

### 흐름
1. KDS 페이지 진입 → PIN 로그인 화면 표시 (POS 와 동일 패턴)
2. 직원이 PIN 입력 → `/api/auth/pin` 호출 → User 식별
3. **`sessionStorage`** 에 staff 정보 저장 (`kds_staff_id`, `kds_staff_name`, `kds_login_at`)
4. 모든 KDS 액션 (status 변경, item 완료, ticket 재인쇄) → 백엔드로 staff 정보 전달
5. Backend 가 OrderAction 에 `performed_by_id` + `performed_by_name` 기록

### 저장 단위
- **기기별** — 같은 매장 안 KDS 1 (그릴) / KDS 2 (튀김) 다른 staff 가능
- localStorage X — sessionStorage 만 (다른 탭 격리, 브라우저 종료 시 자동 만료)

### 타임아웃
- **30분 idle timeout** — 마지막 액션 후 30분 무활동 시 자동 logout
- 명시적 logout 버튼 (헤더 우상단)
- KDS 페이지 재진입 시 PIN 재입력

### 보안
- PIN 은 매장 admin 이 staff 등록 시 발급 (User.pin 필드, 4-6자 숫자)
- PIN 인증 backend endpoint — rate limit (10/min per IP)
- PIN 매장 admin 만 reset 가능

### Order Action History 연동
모든 KDS 액션이 OrderAction 에 자동 기록 (자세한 사양은 `ORDER_MANAGEMENT_IMPROVEMENTS.md` § 7 참조).

| KDS 액션 | OrderAction.action_type | source |
|----------|------------------------|--------|
| status 변경 (pending→preparing 등) | `status_change` | `kds` |
| item 완료 표시 | `item_modified` | `kds` |
| ticket 재인쇄 | `printed` | `kds` |
| 주문 취소 (KDS 에서) | `cancelled` (reason 필수) | `kds` |

### UI/UX 원칙
- PIN 입력 화면 — POS 와 동일 디자인 (사용자 친숙)
- 로그인된 staff 이름 헤더 표시 — 우상단 작은 텍스트 + logout 버튼
- 30분 idle 경고 — 25분 시점 toast 알림 (5분 전 경고)
- PIN 화면은 매장 critical — TDZ 안전, mount 검증 필수 (메모리 `feedback_debug_real_calls`)

---

## 9. Auto-merge 라운드 표시 (2026-05-27 추가)

> 관련: `docs/ORDER_MERGE_RULES.md` § "2026-05-27 — v3.42 변경" (백엔드 정책)

### 9.1 데이터 모델 (backend)

같은 테이블에 후속 머지가 발생하면, 추가된 아이템에 두 필드가 첨부됨:

| 필드 | 출처 | 의미 |
|------|------|------|
| `order_group` | `mergeItemsIntoOrder()` (orders-crud.js) | 라운드 번호 (1=최초 추가, 2=두 번째, …). 원본 아이템은 0 또는 미설정 |
| `added_at` | 동일 | 머지 시각 (ISO). 매장 타임존 기준 표시 |

`nextGroup = Math.max(...existingGroups) + 1`.

### 9.2 KDS ItemsContainer 그룹화

`KitchenDisplayPage.tsx:1005-1054` 의 ItemsContainer 가 아이템을 `order_group` 으로 정렬해 렌더. **`group > 0` 이고 `group !== prevGroup`** 인 첫 아이템 앞에 divider 삽입:

```
┌────────────────────────────────────────┐
│  + ROUND N        · added HH:MM AM/PM  │   ← 노란 띠
└────────────────────────────────────────┘
```

스타일 토큰:
- bg `#FEF3C7`, border `#FCD34D`, color `#92400E`
- 시각은 매장 타임존 (`storeInfo.timeZone`) 으로 포맷 — CLAUDE.md 타임존 규칙 준수

### 9.3 Socket 트리거 + 자동 ticket 인쇄

| 단계 | 동작 |
|------|------|
| 1. backend `mergeItemsIntoOrder` 성공 | socket `order-items-added` emit (room: restaurant_{id}) |
| 2. KDS 수신 (`KitchenDisplayPage.tsx:~1644-1670`) | `console.log('[KDS] order-items-added')` |
| 3. KDS 가 `printKitchenTicketViaRawBT` 호출 | `added_at` 기반 필터로 신규 아이템만 추출 |
| 4. `billPrint.js`의 `generateAdditionalItemsTicketContent` | `** ADDITIONAL ORDER **` 헤더 ticket 출력 |

> 인쇄 경로 상세는 `docs/PRINT_RULES_MATRIX.md` § "2026-05-27 — v3.42 변경" 의 § C 참조.

### 9.4 Order View / Item View 표시

| 뷰 | 표시 |
|----|------|
| Order View | 같은 주문 카드 내부 ItemsContainer 에 라운드 divider 삽입 |
| Item View Pending/Preparing | 그룹핑 키에 `order_group` 영향 없음 (메뉴명 기준 유지). divider 는 Order View 만 |

---

## 10. Floor Plan TableDetailPanel item-level status (2026-05-27 추가, 분리 영역)

> Floor Plan 의 패널에서 item 체크박스 동작이 변경됨. **KDS 의 progression (pending→preparing→ready→served) 과 의미가 분리되므로 cross-link 메모만 남김.**

### 10.1 차이점 요약

| 영역 | 진행 단계 | 사용자 |
|------|----------|--------|
| **KDS** (이 문서) | pending → preparing → ready → served (4단계, 자동전진 포함) | 주방 |
| **Floor Plan TableDetailPanel** | `ready ↔ served` 토글만. `ready` 이전 (pending/preparing) 은 disabled + dot 표시 | 홀 서버 |

### 10.2 4단계 dot 디자인 (Floor Plan 측, 참고용)

| 단계 | bg | dot | 라벨 |
|------|------|------|------|
| queued (pending) | #F3F4F6 | #9CA3AF | Queued |
| cooking (preparing) | #FEF3C7 | #F59E0B | Cooking |
| ready | #ECFDF5 | #10B981 | Ready |
| served | #059669 (solid) | white check | Served |

- 모든 `item.status === 'served'` → order.status 자동 `served` 승급
- 레거시 `completed` 데이터는 `served` 로 매핑 (`toDisplayStatus`)
- i18n: `floorplan:tableDetailPanel.itemStatus.*` (en/ko/zh/ms)
- 코드: `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx`

### 10.3 KDS 와의 상호작용

- Floor Plan 에서 `ready → served` 토글 시 동일한 `PATCH /:id/items` 사용 → KDS Ready 컬럼에서도 즉시 반영 (소켓 broadcast).
- KDS Ready 컬럼의 Serve 버튼과 Floor Plan 의 served 토글은 동일 endpoint, 동일 의미. UI 만 다름.
- **KDS 흐름의 의미적 충돌 (예전 `completed ↔ pending` 토글) 은 해소됨.** 더 이상 KDS 가 Floor Plan 측 토글로 인해 역행하지 않음.

---

## 변경 이력 (보강)

| 날짜 | 변경 |
|------|------|
| 2026-05-27 | § 9 Auto-merge 라운드 표시 (order_group/added_at) + `+ ROUND N` divider + `order-items-added` socket + § 10 Floor Plan item-level status (ready↔served) cross-link 메모 추가 |
