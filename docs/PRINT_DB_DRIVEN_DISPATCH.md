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
