# 정기 발주(Standing Order) 설계 — Fable 2026-10-22

> Irene 원문: «외부공급업체 중에 구독구매의 경우 발주가 정기적으로 생성되게 세팅할 수 있을까? 매번 받고 또 발주하고 받고 발주하는데 사실 매주 1회 항상 같거든. 이런 거 기능 적절하게 추가 가능해? 레스토랑오너 승인도 1번만 하면 그 다음 계속 자동으로 그냥 발주되는거고.»
>
> 판정: **가능하다.** 기존 발주 만들기(`createPurchaseOrderCore`)·보내기(`applySubmitGate`)·오너 승인(§G)·정기 작업 틀(SchedulerRun)을 그대로 쓰고, «발주 틀 + 달력» 한 가지만 새로 둔다. 이름은 **Standing order / 정기 발주** (우리 솔루션 «구독» 과 글자가 겹치지 않게).
>
> 종류: `design` (새 기능 · DB 구조 · 돈·외부 발송·자동 생성). 끝난 뒤 `gate` 검증 1회 별도.

---

## 0. 한 문장 요약

**매장 직원이 지난 발주(또는 대기 초안)에서 «이 발주 반복하기» 를 누르면 정기 발주 틀이 생긴다. 오너 승인이 켜진 매장이면 오너가 그 틀을 1번 승인한다. 그 뒤 매주 정해진 요일 아침에 서버가 같은 품목·같은 수량으로 발주를 만들어 ①그 매장 승인 규칙을 똑같이 타되 «틀이 승인됐고 금액이 승인 때와 크게 다르지 않으면» 승인된 것으로 통과시키고 ②가입 공급업체면 앱 알림, 외부 공급업체면 이메일(있을 때)로 내보낸다. 금액이 허용폭(기본 10%)을 넘게 달라졌거나 틀이 바뀌면 다시 오너 승인으로 돌아온다.**

---

## 1. 범위

### 1-1. 들어가는 것 (v1)
| # | 항목 |
|---|---|
| A | 정기 발주 틀(`purchase_order_schedules`) — 구매자(매장/브랜드/푸드코트) × 판매자 1 × 품목 줄 × 주기 |
| B | 주기: **매주 / 격주 / 매월** (요일 또는 날짜) · 생성 시각은 구매자 시간대 **07:00 고정**(v1 에 시각 칸 없음) |
| C | 틀의 오너 승인 1회(§4) + 생성된 발주마다 «사전 승인 통과» 규칙(§4-2) + 금액 허용폭 재승인(§4-3) |
| D | 생성 = 기존 `createPurchaseOrderCore` → 기존 제출 검사(최소주문·판매중지·배송비 재계산) → `applySubmitGate` **한 길** |
| E | 외부 공급업체로 나가는 길 = 이메일 자동 발송(이메일 있고 가드 통과 시) · 아니면 «보내 주세요» 알림(§5) |
| F | 화면: 틀 목록·만들기·수량/주기 수정·일시정지/재개/종료 (구매자) · 틀 승인/반려·일시정지/종료 (오너) · 발주 목록/상세의 «정기 발주» 표시 |
| G | 실패 처리(§6)·실행 기록(`purchase_order_schedule_runs`)·알림 4종(§7) |

### 1-2. 안 들어가는 것 (의도적)
- **판매자 종류**: v1 은 `seller_type='supplier'` (외부·가입 공급업체 둘 다). 브랜드·푸드코트 판매자는 제외 — Irene 요청이 외부 공급업체이고, 브랜드 판매자는 재고 공유·미러 경로가 얽혀 있어 따로 본다. (코드상 제약은 한 줄 검사라 나중에 풀기 쉽다.)
- **품목 추가/교체 편집**: v1 틀 편집은 **수량·주기·이름·자동이메일** 만. 품목을 바꾸려면 «종료 → 새 발주에서 다시 만들기». (품목 편집 UI 를 새로 짓는 대신 이미 있는 발주 화면을 재사용 — 범위 절반.)
- **WhatsApp 자동 발송**: 서버에서 불가능(`wa.me` 는 브라우저 링크). 사람이 누른다.
- **재고 수준(PAR)에 따라 수량을 바꾸는 자동 발주**: 다른 기능(§4-2 자동 발주 제안)이다. 여기서는 «항상 같은 수량».
- **생성 시각 선택·하루 여러 번·주 여러 번**: v1 없음.
- 세금·결제·수령·청구서: 생성된 발주는 **보통 발주와 완전히 같다.** 수령·인보이스 업로드·거래 청구서·결제 전부 기존 그대로, 코드 변경 0.

---

## 2. 데이터

### 2-1. 새 표 `purchase_order_schedules` (모델 `PurchaseOrderSchedule`, paranoid)
| 칸 | 타입 | 뜻 |
|---|---|---|
| id | INT PK | |
| entity_type / entity_id | ENUM(restaurant,brand,foodcourt) / INT | 구매자 — `purchase_orders` 와 같은 축 |
| seller_type / seller_entity_id | ENUM / INT | v1 `supplier` 만 |
| name | VARCHAR(100) null | 표시 이름(예: «주간 채소») — 비우면 판매자명 |
| lines | JSON NOT NULL | `createPurchaseOrderCore` 가 받는 **raw items 그대로**: `[{ingredient_id\|product_id\|product_ingredient_id, ingredient_seller_product_id, quantity_ordered, option_ids[], notes}]`. **단가는 저장하지 않는다**(§4-3) |
| frequency | ENUM('weekly','biweekly','monthly') | |
| weekday | TINYINT null | 0=일 … 6=토 (weekly/biweekly) |
| day_of_month | TINYINT null | 1~28 (monthly — 29~31 은 받지 않는다, 달마다 밀리는 문제 원천 차단) |
| next_run_date | DATEONLY | **구매자 시간대의 날짜**. 이 날 07:00 이후 첫 정각 틱에 만든다 |
| last_run_date | DATEONLY null | 마지막으로 소비한 run_date |
| last_po_id | INT null | 느슨한 참조(FK 없음 — 데모 초기화가 발주를 지울 수 있다) |
| status | ENUM('pending_approval','active','paused','ended') | |
| paused_reason | VARCHAR(255) null | 사람/시스템이 멈춘 이유 |
| ends_on | DATEONLY null | 선택 종료일(지나면 틱에서 `ended`) |
| approval_required | BOOLEAN | 틀을 만들/고칠 때 그 매장 승인 규칙 스냅샷(`isApprovalRequiredForRestaurant`) |
| approved_by_user_id / approved_at | INT / DATE null | 오너 승인 (§4-1) |
| approved_total | DECIMAL(12,2) null | 승인 시점 **현재가로 계산한 총액**(§4-3 기준선) |
| rejected_by_user_id / rejected_at / rejected_reason | | 발주와 같은 꼴 |
| price_tolerance_pct | DECIMAL(5,2) NOT NULL default 10 | 허용폭. v1 화면 노출 없음(상수처럼 쓰되 칸은 둔다 — 나중에 매장별로 풀 때 마이그 불필요) |
| auto_send_email | BOOLEAN default **true** | 외부 공급업체 이메일 자동 발송(§5 · Irene 결정 §10-1 에 따라 기본값 확정) |
| source_po_id | INT null | 어느 발주에서 만들었나(출처 표시용) |
| created_by_user_id | INT NOT NULL | 생성된 발주의 `created_by_user_id` 가 된다(알림 수신·판매자 관계 검사 주체) |
| consecutive_failures | TINYINT default 0 | 3 이면 `paused` (§6) |
| last_error | VARCHAR(500) null | |
| created_at / updated_at / deleted_at | | |
| 인덱스 | `(status, next_run_date)` · `(entity_type, entity_id)` | |

### 2-2. 새 표 `purchase_order_schedule_runs` (모델 `PurchaseOrderScheduleRun`)
| 칸 | 뜻 |
|---|---|
| id, schedule_id, run_date(DATEONLY) | **UNIQUE(schedule_id, run_date)** — 같은 날 두 번 만들 수 없다(틱 중복·재시작·동시 실행 전부 여기서 막힌다) |
| po_id INT null | 만들어진 발주 |
| outcome ENUM('submitted','pending_approval','needs_send','skipped','failed') | `needs_send` = 발주는 나갔으나(submitted) 외부 이메일을 못 보내 사람이 보내야 함 |
| reason VARCHAR(500) null | 실패·건너뜀 사유(코드 `MAPPING_REQUIRED` 등 + 메시지) |
| total_amount DECIMAL null · drift_pct DECIMAL null | 그때 총액·기준선 대비 변화율 |
| created_at | |

### 2-3. `purchase_orders` 에 칸 1개 추가
- `schedule_id INT NULL` + 인덱스. 정기 발주에서 생성된 발주 표시(목록·상세·오너 큐 배지)·반려 시 틀 일시정지(§4-4)·승인 시 기준선 갱신(§4-3)에 쓴다. 기존 행은 전부 NULL, 동작 변화 0.

### 2-4. 마이그
- `scripts/migrate-po-schedules-20261022.js` — 멱등(`CREATE TABLE IF NOT EXISTS` ×2 · `purchase_orders.schedule_id` 는 information_schema 로 있는지 보고 ADD). `scripts/migrations.registry.json` `deploy` 에 등록. ENUM 은 새 표 안의 것뿐이라 expand 유틸 대상 없음. **`purchase_orders.status` ENUM 은 건드리지 않는다**(새 상태 없음).
- `models/index.js`: PurchaseOrderSchedule hasMany Runs · PurchaseOrder belongsTo Schedule(as 'schedule', constraints:false).
- `operation_settings` 새 키 **없음** — 승인 ON/OFF 는 기존 `requirePoOwnerApproval` 그대로. (settingsGuard 변경 0)

---

## 3. 서버

### 3-1. 제출 본문을 한 함수로 뺀다 (복붙 금지 — 2026-07-13 사고의 재발 방지)
현재 `POST /purchase-orders/:id/submit` 의 트랜잭션 안 본문(잠금 → draft/items 검사 → `assertLinesMeetMinOrder` → `assertLinesSellerProductActive` → `computeTotalsWithDelivery` 로 총액 갱신 → `applySubmitGate`)은 라우트에 박혀 있다. 정기 발주도 **정확히 이 순서**를 타야 하므로:

- `services/purchaseOrderService.js` 에 `submitDraftInTx(po, t, { actor, appendTrackingEvent, preApproved })` 를 만든다 — 위 본문을 **그대로 옮기고**, submit 라우트는 이 함수를 부른다(응답·에러 매핑은 라우트에 남김). 라우트 동작은 바이트 단위로 같아야 한다(검증 §9-③).
- 반환: `{ po, needsApproval }`. 커밋 뒤 알림(판매자/오너/구매자)은 호출부가 기존 그대로 쏜다.

### 3-2. `applySubmitGate` 에 «사전 승인» 입구 하나 (utils/poOwnerApproval.js)
시그니처 `applySubmitGate(po, t, appendTrackingEvent, actor, opts = {})` 에 `opts.preApproved = { scheduleId, approvedByUserId, approvedAt }` 를 더한다.
```
needsApproval 판정은 그대로(매장 + 오너 연결 + 설정)
  └ actor 가 오너면 생략(기존)
  └ 그렇지 않고 preApproved 가 있으면 → 생략하되 기록을 남긴다:
       status 'submitted', submitted_at now,
       approval_required true,                       ← «승인을 거친 발주» 로 남는다
       approved_by_user_id = preApproved.approvedByUserId,
       approved_at = now,                            ← canRevokeApproval 이 이 칸을 본다 → 오너가 개별 발주 승인취소 가능(기존 revoke 그대로)
       tracking 'submitted' 'Pre-approved by Owner via standing order #N (approved <approvedAt>)'
```
- **게이트 바깥에서 판단하는 것**: preApproved 를 넘길지 말지(§4-2 조건)는 스케줄러가 정한다. 게이트는 «넘어온 사전 승인을 어떻게 기록하나» 만 안다. 승인 우회 지점이 여전히 **이 함수 하나**다(§G-5 원칙 유지).
- `applyAmendRaiseGate`·`applyBuyerAmendGate` 무접촉 — 생성된 발주를 나중에 고치면 기존 규칙대로 다시 승인.

### 3-3. 스케줄러 `services/recurringPoScheduler.js`
- `cron.schedule('0 * * * *')` 매 정각(`reservationScheduler`·`demoResetScheduler` 와 같은 꼴). `server.js` 시작 목록에 1줄.
- 내보내는 함수 `runDueSchedules({ now = new Date() } = {})` — **health-check 가 `now` 를 주입해 직접 부른다**(크론을 기다리지 않음).
- 한 틱:
  1. `SchedulerRun` 'recurring_po_hourly' 생성(기존 틀).
  2. `status='active' AND next_run_date <= :maxDate` 후보를 읽는다(maxDate = now 를 UTC+14 로 본 날짜 — 시간대별 «오늘» 을 넉넉히 포함, 정확한 판정은 아래).
  3. 틀마다 **별도 트랜잭션**(하나가 실패해도 다른 틀은 진행):
     - 틀 행 `FOR UPDATE`. `ends_on < 오늘` 이면 `ended` 로 바꾸고 끝.
     - 구매자 시간대 = `restaurant.operation_settings.timeZone || getSiteTimezone()` (브랜드/푸드코트는 사이트 기본). `localDate`·`localHour` 는 `Intl` 로(기존 `dateTimeHelper.getCurrentLocalDate`). **`localDate < next_run_date` 또는 `localHour < 7` 이면 건너뜀**(기록 없음).
     - `run_date = localDate` 로 runs 행을 먼저 INSERT(UNIQUE 충돌이면 이미 했음 → 건너뜀). **밀린 날이 여러 날이어도 발주는 1건** — run_date 는 오늘이고 next 는 오늘 기준 다음 주기(§3-4).
     - 구매자 매장이 `suspended` 면 `skipped` 기록(사유) 후 next 만 진행. (기준: 발주 화면이 막는 상태가 따로 있으면 그 판정 함수를 쓴다 — 구현자가 확인, 없으면 `status==='suspended'` 만.)
     - `createPurchaseOrderCore({ buyerEntity, userId: schedule.created_by_user_id, payload: { seller_type, seller_entity_id, items: lines, notes }, transaction, mergeDraft: **false** })` — ⛔ mergeDraft 를 켜면 **직원이 담아 둔 장바구니 초안에 합쳐진 채 자동 제출된다.** 반드시 false. `notes` = `Standing order #<id> · <주기 글자>` (이메일·PDF·WhatsApp 본문이 notes 를 이미 찍으므로 템플릿 변경 없이 «정기 발주» 가 상대에게 보인다).
     - 실패(`ok:false`) → §6.
     - `submitDraftInTx(po, t, { actor: null, preApproved: <§4-2 판정 결과 또는 null> })`.
     - 틀 갱신: `last_run_date`, `last_po_id`, `next_run_date = nextDate(...)`, `consecutive_failures = 0`. runs 행 `po_id·outcome·total_amount·drift_pct`.
     - 커밋.
  4. 커밋 뒤(트랜잭션 밖):
     - `pending_approval` → `fireOwnerApprovalPendingNotification(po)` (기존) — 메일 본문이 사유를 보여 주도록 tracking 노트에 «금액 +12.4% (허용 10%)» 를 넣는다(템플릿 변경 없이 품목표·총액은 이미 나간다).
     - `submitted` + 가입 공급업체 → `fireSellerSubmittedNotification` + `fireBuyerConfirmNotification` (기존).
     - `submitted` + 외부 공급업체 → §5.
     - 소켓: `emitPoEvent(req, …)` 는 `req.app.get('io')` 를 쓴다. 스케줄러에는 req 가 없다 → `poRealtimeService` 에 `emitPoEventIo(io, po, eventName)` 로 내부를 쪼개고 `emitPoEvent` 는 그것을 부르게 한다(동작 동일). io 는 `server.js` 가 app 에 set 한 것을 스케줄러 start 때 넘긴다. 못 넘기면 생략(알림이 계약, 소켓은 가속).
  5. `SchedulerRun.results = { due, created, submitted, pending_approval, needs_send, skipped, failed, sample[] }`.

### 3-4. 다음 날짜 `nextDate(frequency, weekday|day_of_month, fromLocalDate)` (utils/poScheduleDates.js, 순수 함수 — jest 로 검증)
- weekly: from 다음의 같은 요일(from 자체는 제외) · biweekly: +14일 기준 같은 요일 · monthly: 다음 달 day_of_month.
- 만들 때(§3-5)·재개할 때: `next_run_date = nextDate(…, 오늘)` **단, 오늘이 그 요일이고 아직 07:00 전이면 오늘**. (직원이 월요일 06:00 에 만들면 그날 아침 나간다 — 놀라지 않게 화면이 «첫 발주: <날짜>» 를 보여 준다.)
- 밀림 복구: 틱이 `localDate > next_run_date` 를 만나면 run_date 는 오늘, next 는 `nextDate(…, 오늘)`. 놓친 주 수만큼 쏟아내지 않는다.

### 3-5. API — 새 파일 `routes/purchase-orders-recurring.js` (구매자) + `purchase-orders-approval.js` 에 오너 5개
**barrel 순서 주의**: `routes/purchase-orders.js` 에서 **crud 보다 앞에** `router.use(require('./purchase-orders-recurring'))`. crud 의 `GET /purchase-orders/:id` 가 `/purchase-orders/schedules` 를 먼저 먹으면 `parseInt('schedules')` → 404 다(`pending-approval` 이 별도 라우터를 앞에 둔 것과 같은 이유). 오너 라우터는 이미 전체 앞에 마운트돼 있다.

구매자(`requireBuyerRole` + purchasing 권한은 `/api/purchase-orders*` 접두로 자동 적용 — 추가 가드 불필요):
| 메서드 | 경로 | 하는 일 |
|---|---|---|
| GET | `/purchase-orders/schedules` | 내 구매자 범위 틀 목록 + `seller_name`·`is_external`(`resolveSellers`)·`last_po`(번호·상태)·`next_run_date`·`status` |
| POST | `/purchase-orders/schedules` | `{ source_po_id, frequency, weekday?, day_of_month?, name?, auto_send_email? }`. 출처 발주: 내 범위·`seller_type='supplier'`·`cancelled` 아님·줄 1개 이상. 줄 → lines(옵션은 `options[].option_id` → `option_ids`). **드라이런**: 트랜잭션 안에서 `createPurchaseOrderCore` + `computeTotalsWithDelivery` 를 돌려 현재가 총액·오류를 받고 **롤백**(실제 발주 안 만듦). 오류면 그대로 400(「이 틀은 지금 발주가 안 됩니다: 연결 끊김」 등). 통과면 틀 생성: `approval_required` 스냅샷, 승인 필요 + 작성자가 오너 아님 → `pending_approval` + `fireScheduleApprovalPending`; 아니면 `active`(+ 작성자가 오너면 `approved_*` 를 작성자로 채우고 `approved_total` = 드라이런 총액). `next_run_date` §3-4 |
| PUT | `/purchase-orders/schedules/:id` | `{ name?, auto_send_email?, lines?(quantity_ordered 만), frequency?, weekday?, day_of_month? }`. **수량·주기가 바뀌면** 드라이런 다시 → 승인 필요 매장이면 `pending_approval` 로 되돌리고 `approved_*` 비움(작성자가 오너면 바로 다시 승인 상태). 이름·자동이메일만이면 승인 무관. `ended` 는 수정 불가 |
| POST | `/purchase-orders/schedules/:id/pause` · `/resume` · `/end` | resume 은 `paused` 만, `next_run_date` 재계산 · `consecutive_failures=0`. end 는 되돌릴 수 없음(ConfirmModal) |
| GET | `/purchase-orders/schedules/:id/runs` | 실행 기록(최근 50) |

오너(`authenticateToken + requireOwnerScope`, 소유 매장 틀만 — `ownsSchedule` 은 `ownsPO` 와 같은 판정):
| 메서드 | 경로 | 하는 일 |
|---|---|---|
| GET | `/purchase-orders/schedules/pending-approval` | 승인 대기 틀 + 드라이런 현재가 줄·총액(목록 응답에 `preview` 동봉 — 승인 화면이 보는 금액 = 지금 가격) |
| GET | `/purchase-orders/schedules/owned` | 소유 매장의 모든 틀(상태별) |
| POST | `/purchase-orders/schedules/:id/approve` | `pending_approval → active`, `approved_by/at`, `approved_total` = 지금 드라이런 총액, `next_run_date` §3-4, `fireScheduleApprovalResult(approved)` |
| POST | `/purchase-orders/schedules/:id/reject` | 사유 필수 → `paused`(reason=«Rejected by Owner: …», `rejected_*`), 결과 알림 |
| POST | `/purchase-orders/schedules/:id/pause` · `/end` | 오너의 «승인취소» 에 해당. 재개는 구매자가(재개 시 승인 상태는 그대로 — 틀 내용이 안 바뀌었으므로) |

기존 라우트 2곳 소폭:
- `POST /purchase-orders/:id/approve`(오너, 발주 승인): `po.schedule_id` 가 있으면 커밋 안에서 틀 `approved_total = po.total_amount`(새 기준선 — «다시 1번 승인» 의 뜻) · 커밋 뒤 틀이 외부 공급업체 + `auto_send_email` 이면 §5 이메일도 보낸다(자동이라는 약속 유지).
- `POST /purchase-orders/:id/reject`(오너): `po.schedule_id` 가 있으면 틀 `paused`(reason=«Owner rejected PO <번호>: <사유>») — 매주 같은 반려가 반복되지 않게. 구매자 결과 알림(기존)에 «정기 발주가 일시정지됨» 한 줄.

목록·상세 응답(`GET /purchase-orders`, `/:id`, `/pending-approval`)에 `schedule_id`·`schedule_name` 동봉(배지용). 기존 쿼리에 칸 하나.

---

## 4. 승인 규칙 (Irene «오너 승인도 1번만»)

### 4-1. 틀 승인 1회
- 승인 필요 여부 = 기존 `isApprovalRequiredForRestaurant` **그대로**(오너 연결 + `requirePoOwnerApproval !== false`). 브랜드·푸드코트 구매자는 오너 개념이 없어 항상 `active`.
- 작성자가 그 매장 ownership 오너면 승인 생략(발주 `applySubmitGate` 의 예외와 같은 뜻 — 승인자가 작성자).
- 오너가 승인하는 것 = **품목·수량·현재 단가·현재 총액·주기·판매자**. 화면 문구(§8): «승인하면 이 발주가 매주 <요일> 자동으로 나갑니다. 총액이 <승인 총액> 에서 10% 넘게 달라지면 다시 승인 요청이 옵니다.»

### 4-2. 생성된 발주마다 — 사전 승인이 통과하는 조건 (전부 만족할 때만 `preApproved` 를 게이트에 넘긴다)
1. 틀 `status='active'` 이고 `approved_at` 이 있다(오너가 실제로 승인했다). — 승인 없이 `active` 가 된 틀(오너 미연결 매장)은 나중에 오너가 연결돼 게이트가 승인을 요구하면 **그냥 `pending_approval`** 로 간다(새 오너가 한 번은 본다).
2. 금액 허용폭: `|total_amount − approved_total| / approved_total ≤ price_tolerance_pct` (기본 10%). 넘으면 preApproved 없이 게이트 → `pending_approval` + 사유 기록 + 오너 알림. 틀은 `active` 유지(다음 주는 또 시도 — 오너가 이 발주를 승인하면 기준선이 새 총액으로 바뀌어 다음 주부터 다시 자동).
3. 게이트 자체가 승인을 요구하지 않으면(오너 없음·설정 OFF) preApproved 는 무시되고 평소처럼 `submitted`.

### 4-3. 단가는 «생성 시점 판매자 현재가»
- lines 에 단가를 저장하지 않는다. `createPurchaseOrderCore` 가 매핑(`ingredient_seller_product.unit_price` + 옵션 조정액)으로 단가를 낸다 — **사람이 담을 때와 같은 길**.
- `refresh-prices` 주석(«장바구니가 조용히 바뀌면 사람이 모르는 금액으로 나간다»)과의 관계: 그 경고는 *사람이 보고 있는 초안* 의 이야기다. 정기 발주는 사람이 안 보는 것이 전제라, 대신 **허용폭(§4-2 ②) + 구매자 알림(§7 «발주됨» 에 총액·전주 대비)** 이 그 역할을 한다. 허용폭 밖은 사람이 본다.
- 승인 기준선 `approved_total` 은 «오너가 마지막으로 본 금액». 틀 승인·개별 발주 승인 두 곳에서만 바뀐다.

### 4-4. 반려·취소·수정
| 사건 | 발주 | 틀 |
|---|---|---|
| 오너가 생성된 발주 반려 | draft(기존) | `paused` + 사유(§3-5) |
| 오너가 생성된 발주 승인취소(revoke) | pending_approval(기존 revoke 판정 그대로) | 무접촉 |
| 구매자가 생성된 발주 취소(cancel) | cancelled(기존) | 무접촉(다음 주 또 나감 — 멈추려면 틀을 멈춘다. 상세 화면 «정기 발주 멈추기» 링크로 안내) |
| 구매자가 틀 수량·주기 수정 | — | 승인 필요 매장이면 `pending_approval` (작성자가 오너면 즉시 승인) |
| 구매자가 틀 이름·자동이메일 수정 | — | 승인 무관 |
| 틀 종료(end) | 이미 만든 발주는 그대로 | `ended` (복구 없음) |
| 매장 설정 `requirePoOwnerApproval` 를 끔 | 다음 생성부터 `submitted` | 무접촉 |
| 판매자가 생성된 발주 총액 인상 수정 | 기존 `applyAmendRaiseGate` | 무접촉 |

---

## 5. 외부 공급업체로 «실제로 나가는» 방법

사실: 외부 업체(`is_system_registered=0`, 로그인 없음)에 서버가 닿는 길은 **이메일 하나**다. WhatsApp 은 브라우저 링크라 서버가 못 보낸다. dev 외부 업체 5곳 중 이메일 있는 곳은 2곳(그중 1곳은 `example.com` placeholder → 가드가 막음).

- `send-external-email` 라우트 본문(판매자 로드 → 이메일 검사 → `poExternalSendEmail` → `sendPlatformEmail` → tracking)을 `services/poExternalEmail.js` `sendExternalPoEmail(po)` 로 빼고 라우트가 부른다(§3-1 과 같은 이유 — 길이 둘이면 한쪽만 고쳐진다). 반환 `{ sent, reason, to }`. 언어 'en' 고정·가드(placeholder/바운스) 그대로.
- 스케줄러·오너 승인 라우트는 `submitted` + 외부 + `auto_send_email` 일 때 이 함수를 부른다:
  - `sent` → runs `outcome='submitted'`, tracking «Purchase order emailed to …»(기존 문구), 구매자 알림 «정기 발주가 나갔고 <이메일> 로 보냈습니다».
  - `!sent`(이메일 없음·가드 차단·발송 오류) → runs `outcome='needs_send'`, tracking «Standing order placed — not emailed (<reason>) — send via WhatsApp/Email», 구매자 알림 **«정기 발주가 만들어졌습니다 — 공급업체에 보내 주세요»** + 발주 상세 버튼(기존 WhatsApp/Email 버튼이 거기 있다). 발주 상태는 그대로 `submitted`(오늘 사람이 수동 전송 뒤 `mark-sent-external` 하는 것과 같은 상태).
- `auto_send_email=false` 틀은 항상 `needs_send` 경로.
- 개발서버에서는 **실제 외부 발송을 하지 않는다**: 검증은 placeholder 이메일 업체(→ 가드 skipped → needs_send)로만 한다(§9). 운영 첫 가동은 Irene 매장 틀 1개로.

---

## 6. 실패·예외 (스케줄러 한 틀 기준)
| 상황 | 처리 |
|---|---|
| `createPurchaseOrderCore` 거부 — `MAPPING_REQUIRED`·`NO_ACTIVE_CONTRACT`·`PRODUCT_HAS_RECIPE`·`CURRENCY_MISMATCH`·`CREDIT_LIMIT_EXCEEDED`·`BUYER_PROFILE_INCOMPLETE`·품목 접근 불가 | 롤백 → runs `failed`(code+message) · 틀 `consecutive_failures+1`, `last_error` · 구매자 알림 «정기 발주 실패: 사유» · **3회 연속이면 `paused`**(reason=last_error) · next_run_date 는 진행(같은 날 재시도 없음 — UNIQUE 가 막기도 한다) |
| 제출 검사 — `MinOrderError`·`InactiveSellerProductError` | 위와 같음(코드 그대로 기록) |
| 작성자(`created_by_user_id`) 비활성·매장에서 빠짐 | 판매자 관계·품목 소유 검사가 거부 → 위 실패 경로. 알림은 매장 관리자 전원에게(`getRestaurantAddressees`)도 같이 — 작성자가 없을 수 있으므로 |
| 매장 `suspended` | runs `skipped`, 알림 없음, next 진행 |
| 서버가 07:00 에 꺼져 있었음 | 같은 날 다음 정각 틱에서 만든다(`localDate >= next_run_date && localHour >= 7`) |
| 며칠·몇 주 밀림 | 발주 1건만(run_date=오늘), next 는 오늘 기준(§3-4) |
| 같은 틀을 두 프로세스가 동시에 | 행 잠금 + `UNIQUE(schedule_id, run_date)` → 두 번째는 건너뜀 |
| 생성 뒤 알림·이메일 실패 | 발주는 이미 커밋 — 알림 오류는 기록만(`console.error`, 기존 fire* 패턴). 이메일 실패는 `needs_send`(§5) |
| 데모 매장 자정 초기화가 발주를 지움 | `last_po_id` 는 FK 없음. 틀 이름에 `[확인용]` 이면 7일 뒤 정리 대상(기존 `checkDataTag` 규칙에 틀 표를 추가 — 작은 변경, `resetDemoOrders` 에서 7일 지난 `[확인용]` 틀 삭제) |
| 승인 대기 중인 발주가 쌓임(오너가 안 봄) | 허용폭 밖 발주가 매주 하나씩 `pending_approval` 로 쌓일 수 있다 → 틀에 **승인 대기 발주가 1건이라도 있으면 그 주는 `skipped`(reason=`awaiting_owner`)** — 같은 공급업체에 미승인 발주를 겹쳐 두지 않는다(입고예정 수량 중복 방지 §G-5 취지와 같음) |

---

## 7. 알림 (`sendNotification` 자격 꼬리표·`notificationLinks` 표 규칙 그대로)
| 카테고리(키) | 받는 사람 | 언제 | 버튼 |
|---|---|---|---|
| `po_approval_pending` (**재사용**) | 오너 전원 | 틀 승인 요청 · 허용폭 밖 발주(기존 템플릿) | 기존 `po_approvals` |
| `po_approval_result` (**재사용**) | 틀 작성자 | 틀 승인/반려 | 새 링크 키 `po_schedules` |
| `po_schedule_placed` (신규) | 작성자 + 매장 관리자 | 발주 생성됨 — 본문에 «보냈음(이메일)/**보내 주세요**/승인 대기» 분기 + 총액·전주 대비 | `po_detail` |
| `po_schedule_failed` (신규) | 작성자 + 매장 관리자 | 실패·3회 정지 | `po_schedules` |
- `routes/notification-settings.js` NOTIFICATION_CATEGORIES 2건 추가(section 'Supply Chain'). 템플릿 `utils/notificationTemplates.js` 2개(기존 `poBuyerConfirmEmail` 과 같은 품목표 사용, 4언어 백엔드 locales).
- `utils/notificationLinks.js` 에 `po_schedules: { restaurant: '/pos/purchase-orders/recurring', brand…, foodcourt… }`, 오너 쪽은 기존 `po_approvals` 페이지 안의 탭.

---

## 8. 화면 (RA 기준 · 공용 컴포넌트 · `purchaseOrders` 네임스페이스 4언어 · glossary «Standing order / 정기 발주 / 定期采购 / Pesanan tetap»)

### 8-1. 만들기 — `RecurringOrderModal`(공용 Modal) 한 컴포넌트, 진입 2곳
- **발주 상세(`PurchaseOrderDetailPage`, 구매자 뷰)** 헤더 액션 «Repeat this order» — `cancelled` 아니고 `seller_type='supplier'` 일 때. Irene 동선(«매번 받고 또 발주») = 지난 발주에서.
- **대기 초안(`PurchaseOrderStagingPage`)** 각 초안 카드에 같은 버튼 — 지금 담은 것을 틀로.
- 모달 내용: 판매자명(고정) · 품목 표(이름·수량·현재 단가·줄 합계, 읽기 전용) · 주기(세그먼트: 매주/격주/매월) · 요일 또는 날짜(Select, 기본 = 출처 발주 생성 요일) · 이름(선택) · 외부 업체면 «이메일로 자동 발송» 토글(이메일 없으면 비활성 + «이메일 없음 — 매번 WhatsApp 으로 보내 주세요») · **첫 발주 예정일**(§3-4 계산값) · 승인 필요 매장이면 안내 «오너 승인 후 시작됩니다». 저장 → POST(드라이런 오류는 그 문구 그대로 표시).

### 8-2. 목록 — `/pos/purchase-orders/recurring` (`RecurringOrdersPage`, lazy, `App.tsx` 라우트)
- 진입: `PurchaseOrdersPage`·`PurchaseOrderStagingPage` 헤더에 «Standing orders (N)» 링크(사이드바 항목 추가 없음 — 발주 메뉴 아래 하위 화면).
- DataTable: 이름/판매자 · 품목 수 · 주기(«매주 월») · 다음 발주일 · 마지막 발주(번호 링크 + 상태 배지) · 상태 배지(승인 대기/진행 중/일시정지(사유)/종료) · 행 액션 IconButton: 수정(모달 — 수량·주기·이름·자동이메일) · 일시정지/재개 · 종료(ConfirmModal) · 기록(runs 드로어/Modal: 날짜·결과·총액·사유).
- 빈 상태 `DataTableEmpty` «정기 발주가 없습니다. 발주 상세에서 ‹Repeat this order› 로 만듭니다.»

### 8-3. 오너 — `OwnerPoApprovalsPage` 에 탭 2개 추가(탭 vs 아코디언 규칙: 종류가 다르면 탭)
- «Orders»(기존) · «Standing orders — awaiting approval» · «Standing orders — active».
- 승인 모달: 판매자·품목·수량·**지금 단가·지금 총액**(preview)·주기·첫 발주일·안내 문구(§4-1) → 승인(ConfirmModal)/반려(사유 Modal). active 탭: 일시정지/종료.
- 기존 발주 승인 큐 행에 «정기» 배지 + 허용폭 밖이면 사유 한 줄(tracking 마지막 노트).

### 8-4. 표시
- 발주 목록·상세·오너 큐: `schedule_id` 있으면 «정기» 배지(텍스트 글리프 `↻` 허용 — 장식 이모지 아님) + 상세에 «정기 발주 ‹이름› 에서 생성 · 멈추려면 →» 링크.
- 상세의 외부 업체 WhatsApp/Email 버튼은 기존 조건 그대로(needs_send 발주도 submitted 라 보인다).

---

## 9. 검증 기준 (구현자가 돌리고, 숫자로 보고 · Fable gate 가 본다)

### 9-1. 자동 — health-check `inventory` 카테고리에 계약 7건 (fixture 는 기존 `dpCtx(true)`(오너 있는 데모 매장) 재사용 · 표지 `ZZ-HC-RPO-` · 시작/끝 정리 멱등)
1. **틀 만들기**: 오너 매장 초안에서 POST schedules → `pending_approval`, `approved_at` null, 실제 발주 수 **증가 0**(드라이런 롤백 증명 — 전후 `COUNT(purchase_orders)` 같음).
2. **오너 승인** → `active`, `approved_total` > 0, `next_run_date` 계산값 = `nextDate()` 와 일치.
3. **생성 1회·멱등**: `runDueSchedules({ now: next_run_date 07:30 매장시각 })` → 발주 1건 `submitted`, `approved_by_user_id` = 오너, `approval_required=1`, `schedule_id` 세팅, runs 1행. **같은 now 로 다시 호출 → 발주 +0, runs +0.**
4. **허용폭**: 매핑 단가 ×1.2 → 다음 run → `pending_approval`, runs `drift_pct ≈ 20`, 틀 `active` 유지 → 단가 원복. 오너 approve → 틀 `approved_total` = 그 발주 총액.
5. **승인 없는 틀은 통과 못 함**: `approved_at` 을 null 로 지운 뒤 run → `pending_approval`(preApproved 무시).
6. **반려 → 정지**: 생성된 pending_approval 발주를 reject → 틀 `paused`, reason 에 PO 번호.
7. **외부 needs_send**: placeholder 이메일 업체 틀(`auto_send_email=true`) run → 발주 `submitted`, runs `needs_send`, 실제 메일 0(가드 skipped). 판매자 목록(`/seller-orders`)에 pending_approval 발주 미노출(기존 §G-6 계약 그대로 통과).
- 06:59 매장시각으로 `now` 를 주면 **아무것도 안 만든다**(시각 게이트) — 3번 안에 선행 호출로 포함.
- 고장주입 2건(의무): ① `applySubmitGate` 의 preApproved 분기를 지우면 3번이 실패해야 한다 ② runs UNIQUE 를 빼면 3번 두 번째 호출에서 발주 +1 이 되어 실패해야 한다. 결과를 보고에 숫자로.
- `utils/poScheduleDates.js` jest 6건(weekly/biweekly/monthly·오늘 요일 07:00 전후·밀림 복구) — 화면 jest 는 게이트 밖이므로 백엔드 `tests/` 에.

### 9-2. 회귀
- `verify-all`(프론트 빌드 1회 뒤 `--full` 1회) · `check-print-guard` 변경 0 · `check-sensitive-diff` 는 **gate 대상으로 뜨는 것이 정상**(돈·자동 생성·외부 발송) · health-check 기존 `inventory`(직접구매 3건)·`security`·`trade` 전부 통과 — submit 라우트 본문 이동(§3-1) 뒤 기존 발주 제출 계약이 그대로인지 여기서 갈린다.
- 외부 메일 실발송 0(개발서버) — `sendPlatformEmail` 로그에 `[email-guard:transport] 발송 차단` 만 있어야 한다.

### 9-3. 사람 확인(Irene «확인할 곳»)
- 데모 매장 2(Downtown Pizza, 오너 연결·tz 있음) — RA 로 지난 발주에서 틀 만들기 → `[as=restaurant store=2]` 화면 X. 하지만 restaurant 역할키는 38·1 만 닿는다 → 틀 만들기는 38(오너 없음, 즉시 active)에서, 오너 승인 흐름은 2·3 에서 `[as=owner store=2]`. 구현자가 둘 다 링크로.

---

## 10. Irene 가 정할 것 (1건) — 나머지는 전부 지금 구현 시작 가능

### 10-1. 외부 공급업체에 이메일을 **자동으로** 보낼까?
| 선택지 | 결과 |
|---|---|
| **A. 보낸다** — 업체에 이메일이 있고 가드를 통과하면 발주 생성 즉시 이메일 발송, 없으면 «보내 주세요» 알림 | 진짜 «그냥 자동 발주». 단 잘못된 틀이 외부로 나가면 되돌릴 수 없다 — 그래서 허용폭·승인·3회 정지가 붙어 있다 |
| B. 안 보낸다 — 항상 «만들어졌으니 보내 주세요» 알림만, 사람이 WhatsApp/이메일 버튼을 누른다 | 외부로 나가는 건 사람 손. 매주 클릭 1번은 남는다(절반 자동) |

**Fable 권고: A.** Irene 의 말이 «그 다음 계속 자동으로 그냥 발주» 이고, 이메일 없는 업체는 어차피 B 와 같다. 틀마다 토글(`auto_send_email`)이 있어 업체별로 B 로 돌릴 수 있다.
**구현은 막히지 않는다** — 토글을 두고 **기본값만** 답에 따라 정한다(A=true · B=false). 답이 오기 전에는 true 로 만들고, 개발서버에서는 어차피 실발송이 없다.

**Irene 님, 외부 공급업체에 정기 발주 이메일을 자동으로 보낼까요(A)?**

### 10-2. Fable 이 정한 것(묻지 않음 — 되돌릴 수 있는 선택)
- 허용폭 10% · 생성 07:00 매장시각 · 3회 연속 실패 시 정지 · v1 판매자 = 공급업체만 · 품목 편집 없음(수량·주기만) · 밀림 복구 1건 · 승인 대기 발주가 남아 있으면 그 주 건너뜀.

---

## 11. 구현 순서 (프론트 빌드 1회 규칙)
1. 백엔드: 마이그 + 모델 + registry → `poScheduleDates` + jest → §3-1 submit 본문 추출(기존 health-check 통과 확인) → §3-2 게이트 입구 → §5 이메일 함수 추출 → 스케줄러 + server.js → 라우트(구매자·오너·기존 approve/reject 2줄) → 알림 2종 + links → health-check 7건 + 고장주입.
2. 프론트: 모달·목록 페이지·오너 탭·배지·i18n 4언어 → 빌드 1회 → `verify-all --full` 1회 → SW bump 마지막.
3. `docs/PURCHASE_ORDER_SYSTEM.md` 에 §J «정기 발주» 절(이 문서 요지 + 결정) · `docs/TRADE_STRUCTURE.md` 는 구조 변화 없음(발주 생성 경로 하나 추가, 재료·상품·가격 목록 신설 없음) — 한 줄 참조만.
4. 끝나면 Fable gate 1회: diff 범위 대조(이 문서 밖 변경 0) · print-guard · health-check 숫자 · 고장주입 2건 결과 · 배포 안전(마이그 멱등·롤백 = 표 2개·칸 1개 추가뿐이라 코드 롤백만으로 안전).


---

## 12. Irene 답 (2026-10-22, §10-1) — 원문 그대로 · 구현 반영
> «무슨 말이야? 이메일을 내가 왜 보내? 구독설정된 업체라서 이미 계속 알아서 우리한테 인보이스 주고 진행하는데. 우리가 수동으로 반복처리 하는 거 안하려는 건데. 무슨 이메일을 자동 발송해? 우리가 받았다고 알려? 외부업체에 그러는 일도 없잖아. 이해가 안가. 너가 왜 이런 소리를 하는지»

반영(팀원 구현): §5 «외부 업체로 실제로 나가는 방법» 전체 폐기 — 외부 구독 업체 정기 발주는 submitted 로 **기록만**, 업체로 아무것도 보내지 않음. `auto_send_email`·`needs_send`·«보내 주세요» 알림 제거, 구매자 알림은 «기록됨 — 오면 수령 처리». 오너가 허용폭 밖 정기 발주를 승인할 때도 같은 함수(`notePlaced`). 판정은 gate 에서.
