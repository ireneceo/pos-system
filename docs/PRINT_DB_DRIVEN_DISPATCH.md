# 인쇄 디스패치 — DB 기준 / 기기 독립 (설계, 미구현)

> **상태:** 설계 제안 (2026-06-24). Irene 승인 + 단계별 실프린터 확인 후에만 구현.
> **절대 제약 (Irene 2026-06-24):** **현재 인쇄 "방식(method)"은 1바이트도 안 건드린다.** `billPrint.js` 의
> 실제 인쇄 함수(QZ HTML pixel / station 라우팅 / `printKitchenTicketViaRawBT` / `printCancellationTicketsByStation`
> / `sendUnifiedTickets` 등)는 그대로 호출만. 바꾸는 건 **"인쇄 트리거/조건"** 뿐. **중복·오발행·미발행 절대 금지.**
> **관련:** `PRINT_RULES_MATRIX.md`, `TABLE_MOVE_AND_VOID_TICKET.md`, `KITCHEN_DISPLAY_RULES.md`, 메모리 [[reference_kitchen_print_pipeline]].

## 1. 문제 (2026-06-24 운영 진단)

매장 스탭이 **여러 기기**(카운터 POS, 서버 태블릿, 노트북)에서 주문/이동/취소를 한다. 현재 인쇄 트리거가 **액션을 한 기기에 묶여** 있어, **프린터 없는 기기에서 한 액션의 티켓이 분실**된다.

| 액션 | 현재 트리거 | 기기 독립? |
|------|-----------|:---:|
| 신규 주문 / +Round | 백엔드 `needs_print=true` → 기기 폴러가 인쇄 | △ (원칙 독립이나 아래 버그로 깨짐) |
| 테이블 이동 | **누른 기기가 직접** `printKitchenTicketViaRawBT` 호출 | ✗ |
| 아이템 void | **누른 기기가 직접** `printCancellationTicketsByStation` | ✗ |
| 주문 취소 | **누른 기기가 직접** 취소표 발행 | ✗ |

**근본 버그(신규주문도 깸):** `getActiveBillPrinter()`(`billPrint.js:161-171`)가 **워크스테이션 미선택 기기**에 `workstations[0]`(=POS1, autoPrint=true)을 폴백으로 물려줌 → 프린터 없는 기기가 자기를 POS1로 착각하고 claim(needs_print→false) 후 인쇄 실패(fail-silent) → 진짜 POS1이 못 받아 **분실**. (실제 사례: 운영 #14157 T-9, claim됐으나 printed_at=NEVER.)

## 2. 목표 모델 — 인쇄는 DB가 시킨다, POS1만 인쇄한다

> 어느 기기에서 액션하든 → **DB만 바뀐다** → **인쇄 전담 기기(POS1)가 DB를 보고 인쇄**. 누른 기기는 인쇄 안 함.

### 2-1. 인쇄 작업 큐 (DB) — `print_jobs`
신규 테이블 `print_jobs` (또는 orders 의 JSON 큐). 한 행 = 한 인쇄 의도.
```
print_jobs(
  id, restaurant_id, order_id,
  type ENUM('kitchen_new','kitchen_round','move_reprint','void_item','cancel_order'),
  payload JSON,            -- 인쇄에 필요한 스냅샷(대상 아이템/이전·새 테이블/사유 등)
  claimed_by VARCHAR NULL, -- 원자적 claim (한 기기만)
  claimed_at DATETIME NULL,
  printed_at DATETIME NULL,-- 인쇄 성공 스탬프
  created_at, updated_at
)
```
- 액션 라우트(주문/이동/void/취소)가 **DB 행만 추가**한다. **인쇄 함수는 호출 안 한다.**
- 기존 `needs_print` 모델은 그대로 두고 점진 흡수하거나, `kitchen_new/round` 를 이 큐로 통일(2단계에서 결정).

### 2-2. POS1 전담 폴러가 인쇄 (방식 무변경)
인쇄 전담 기기의 기존 폴러(`MainLayout._printPollFn` / `useAutoPrintPoller`)가 `print_jobs` 의 **미claim 행**을 가져와:
1. 원자적 claim (UPDATE claimed_by=this WHERE id=? AND claimed_by IS NULL) — **한 기기만 성공**.
2. `type` 별로 **기존 인쇄 함수 그대로** 호출:
   - `kitchen_new/round` → `printKitchenTicketViaRawBT()` (현행)
   - `move_reprint` → 현행 이동 재인쇄가 쓰던 함수 그대로
   - `void_item`/`cancel_order` → `printCancellationTicketsByStation()` (현행)
3. 성공 시 `printed_at` 스탬프. 실패 시 claim 해제(재시도) — **fail-silent 금지, 재무장**.

### 2-3. "누가 POS1 인가" — 인쇄 전담 판정 (오발행·미발행 동시 방지)
- **claim 자격 = 명시적으로 프린터 워크스테이션(autoPrint=true·enabled)을 고른 기기만.**
- **미선택/프린터 없는 기기는 claim 0건**(현 `workstations[0]` 폴백을 claim 경로에서만 제거 — 인쇄 함수/표시엔 무영향).
- ⚠️ **미발행 사고 방지 전제:** POS1(카운터)이 **반드시 자기 워크스테이션을 명시 선택**해야 한다. (구현 전 점검 필수 — 8장.)
- 단일 워크스테이션/미구성 매장은 현행 유지(영향 0).

## 3. 기기 독립 검증 계약 (데모 + 실프린터)
- 노트북/서버 태블릿(프린터 없음)에서 주문/이동/void/취소 → **그 기기 0장**, **POS1 정확히 1장**.
- 동시 N기기가 같은 job → **1장만**(claim-once).
- POS1 미가동 시 job 은 큐에 남아(분실 0) 재가동 시 인쇄.
- 기존 단일 POS 매장: 동작·장수 **현행과 동일**(회귀 0).

## 4. 단계별 구현 (한 번에 하나, 각 단계 실프린터 눈확인)
0. **(선행)** POS1 워크스테이션 명시 선택 여부 확인 + 보강(미선택이면 인쇄 전담 지정 UX). **이거 먼저 안 풀면 어떤 코드도 손대지 않는다.**
1. **워크스테이션 claim 판정 수정** (가장 큰 효과·최소 변경): 미선택/프린터없음 기기는 자동인쇄 claim 안 함. 신규주문 분실부터 차단. → 데모+실프린터.
2. `print_jobs` 큐 신설 + POS1 폴러가 `kitchen_new` 처리(기존 needs_print 와 병행/대체). → 검증.
3. **테이블 이동** 트리거를 직접인쇄 → DB job 으로. 누른 기기 직접인쇄 제거. → 검증.
4. **아이템 void** 동일 전환. → 검증.
5. **주문 취소** 동일 전환. → 검증.

각 단계: `check-print-guard.js`(트리거 파일 변경분만, 인쇄 방식 diff 0 확인 후 bless) + `health-check --category=print` + 데모 계약 + **운영 배포 후 실프린터 종이 눈확인**.

## 5. 절대 안 건드리는 것 (방식 동결)
`billPrint.js` 의 인쇄 실행 함수 본문, station 라우팅(`stationEnrichment`), HTML pixel/QZ/RawBT 선택, 티켓 포맷, 통합표/취소표 발행 로직. **이 큐는 "언제·누가 호출하느냐"만 바꾼다.**

---

## 6. 하이브리드 모델 (2026-06-25 — 표준 정렬, Irene 결정)

> **상태:** 설계 (2026-06-25). 시간 압박 없음 — 매장은 **안정화·실프린터 검증 완료 후** 사용 시작. 단계별 실프린터 종이 확인 필수.
> **왜 바꾸나:** §2 의 "POS1 한 대가 서버 폴링으로 **전부**(자기 카운터 주문까지) 인쇄" 모델은 과교정이었다. **프린터 없는 기기·모바일 주문을 지정 POS가 인쇄**하는 건 옳았지만, **프린터 달린 POS가 자기 손님 주문까지 서버를 왕복해 폴링으로 받는** 부분이 ① 지연(서버 왕복) ② 서버 의존 ③ 단일 실패점(POS1 설정 하나 꺼지면 전체 정지 — 2026-06-24 thefire 무인쇄)을 만들었다. 업계 표준(Square/Toast)은 **단말이 받은 주문은 그 자리에서 즉시 로컬 인쇄**하고, 폴링/푸시는 **다른 출처(모바일·온라인)** 주문에만 쓴다.

### 6-1. 원칙 — "주문의 출처(origin)가 인쇄 경로를 정한다"
| 주문 출처 | 인쇄 주체 | 경로 |
|-----------|-----------|------|
| **프린터 달린 POS가 받은 주문** | 그 POS | **즉시·로컬** (생성 응답 enriched 데이터로 바로 인쇄, 서버 왕복·폴링 대기 없음) |
| 모바일/QR 주문 | 지정 프린터 POS | 폴러/소켓 (현행, 서버 경유 — 출처에 프린터가 없으니 당연) |
| **프린터 없는 기기**(서버 태블릿/노트북)가 받은 주문 | 지정 프린터 POS | 폴러/소켓 (§2 가 옳게 풀던 그 케이스 — 유지) |
| 테이블 이동 / 아이템 void / 주문 취소 (재발행) | 지정 프린터 POS | 폴러 (현행 유지 — 빈도 낮고 라우팅 적합) |

### 6-2. 기반은 이미 있다 (신규 인프라 최소)
- **생성 응답 = enriched**: `routes/orders-crud.js` 주문 생성이 `enrichItemsWithStation`(stationName 부착) 후 `res.json({data: order})` 로 enriched order 를 그대로 반환(line ~905). → 그 POS는 **추가 fetch 없이** 이 데이터로 즉시 인쇄. (옛 6/4 이전 "raw 장바구니" 버그 없음 — 이게 핵심 차이.)
- **실시간 push 존재**: 생성 시 `order-created` 소켓 이벤트로 enriched plainOrder 를 이미 emit(line ~883). 표준의 "푸시"가 이미 깔려 있음.
- **claim 존재**: `PATCH /orders/:id/print-claim` (원자적). 중복방지 재사용.

### 6-3. 중복 0 · 분실 0 (계약)
- 프린터 POS 가 **자기 주문을 로컬 인쇄하기 직전 `print-claim`** → 성공해야 인쇄. → 폴러는 claim 된 주문 skip(**중복 없음**).
- **로컬 인쇄 실패 시 claim 안 함/재무장** → 폴러가 폴백으로 인쇄(**분실 없음**). fail-silent 절대 금지(§2-2 와 동일 원칙).
- 모바일/프린터없는기기 주문 = 출처에서 claim 안 됨 → 지정 POS 폴러가 claim 후 인쇄(**정확히 1장**).
- 즉 **"먼저 잡는 쪽이 인쇄, 한 번만"** — 출처 POS(즉시) 또는 지정 POS(폴러), 둘 중 하나만.

### 6-4. §2-3 게이트(6/23) 재작업
- 현행: 다중 POS → autoPrint=true 단말만 인쇄(자기 주문 포함 **전부**). → 프린터 POS 가 자기 주문을 즉시 못 찍음(서버 경유). **이 부분만 바꾼다.**
- 하이브리드: **프린터 달린(워크스테이션 명시 선택·enabled) POS 는 자기 주문을 즉시 로컬 인쇄** + **지정 POS(primary)는 추가로 모바일·프린터없는기기·재발행 주문을 폴러로 인쇄**. 프린터 없는 기기는 여전히 claim 0(인쇄 안 함).
- thefire 현실: 주방 프린터(KITCHEN/KQ2/BAR)가 POS1 에 물려 있으므로 — **POS1 자기 주문 = 즉시 로컬**(개선), POS2/모바일 주문 = POS1 폴러(현행 유지, 옳음). 가장 잦은 케이스(POS1 카운터 주문)가 빨라지고 서버 의존이 사라진다.

### 6-5. 단계별 구현 (한 번에 하나, 각 단계 실프린터 눈확인)
1. **프린터 POS 자기 주문 즉시 로컬 인쇄** 경로 추가(생성 응답 enriched → `print-claim` → 기존 인쇄함수 호출). 폴러는 claim된 것 skip(중복 0 확인). → 데모+실프린터.
2. 로컬 인쇄 실패 → 폴러 폴백 검증(분실 0). → 검증.
3. 모바일·프린터없는기기·재발행이 지정 POS 로 정확히 1장 가는지 회귀(현행 동작 보존). → 검증.
4. (선택) 소켓 `order-created` 기반 즉시화로 폴링 의존 추가 축소.

### 6-6. 검증 계약 (데모 + 실프린터)
- 프린터 POS 자기 주문 → **그 POS 즉시 1장**, 폴러 0(claim됨). 한글 OK, 세트 구성품 정상(enriched).
- 모바일 주문 → 지정 POS 1장(현행).
- 프린터 없는 기기 주문 → 그 기기 0장, 지정 POS 1장(§2 계약 유지).
- 로컬 인쇄 강제 실패 → 폴러가 1장(분실 0).
- 동시/다중 → 항상 1장(claim-once). 단일 POS 매장 회귀 0.
- 각 단계: `check-print-guard.js`(트리거 변경분만, 방식 diff 0 후 bless) + `health-check --category=print` + **운영 실프린터 종이 눈확인**.

### 6-7. 동결(§5 그대로)
`billPrint.js` 인쇄 실행 함수·station 라우팅·HTML pixel/QZ 선택·티켓 포맷 **1바이트도 안 건드림.** 바꾸는 건 **"누가·언제 호출하느냐"(트리거/claim 조건)** 뿐.
