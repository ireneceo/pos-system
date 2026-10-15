# Fable 설계 판정 — 판매자 주문 수정에서 «총액 인상» 허용 (2026-10-15)

> 종류: `design` (Fable 1회). 구현 뒤 돈·주문 무결성 + 오너 승인 경계를 건드리므로 **Fable 검증(gate) 1회** 더 — 한 사안 2회로 끝낸다.
> 코드 변경 없음. 아래는 판정·설계만.

## 0. Irene 원문 (상황판 2026-10-15)

«이렇게 무조건 안되게 하면 안돼. 브랜드제너럴이 추가하고 수정하는게 자유로워야 해. 이거 확인 누르면 바뀌게 해줘야 해. Items total RM 804.60 → RM 830.50 This exceeds the amount the buyer approved. Lower the quantities, or reject the order so the buyer can reorder. https://purplehere.com/pos/brand/general/incoming-orders 이 페이지에서 에디트할 때»

## 1. 판정 요지

**인상 허용. 단, «확인 1번» + «오너 승인이 켜진 매장이면 새 주문과 같은 승인 게이트».**

- 2026-09-24 원칙 «판매자는 구매자 동의 없이 늘릴 수 없다» 는 **폐기**한다. 그 원칙이 지키려던 것은 두 가지였다 — ① 오너 승인 우회 방지, ② 구매자가 모르는 사이 금액이 바뀌는 것 방지. 둘 다 **인상을 막지 않고도** 지킬 수 있다: ①은 이미 있는 오너 승인 게이트(`pending_approval`)를 인상에도 태우면 되고, ②는 이미 있는 «Order Amended» 안내(소켓·메일·배너)가 전후 총액을 보여 준다.
- 판매자가 **대리 주문 추가**(`POST /api/seller-orders`)로는 금액 상한 없이 새 주문을 만들 수 있는데, 같은 사람이 기존 주문을 RM 26 올리는 것만 막는 것은 일관성이 없다. 대리 주문이 타는 길(오너 승인 매장이면 `pending_approval`)을 인상 수정도 똑같이 탄다 — 이게 이 설계의 전부다.
- 새 원칙 한 줄 (`utils/poAmend.js` 머리글·문서에 교체):
  > **발주서는 구매자의 돈 약속이다. 판매자는 그 약속을 줄이거나 바꿀 수 있고, 늘릴 때는 ①판매자가 확인하고 ②구매자에게 전후 금액이 안내되며 ③오너 승인이 켜진 매장이면 새 주문과 같은 승인을 다시 받는다.**

## 2. 설계

### 2-1. 서버 — `POST /api/seller-orders/:id/amend` (`routes/seller-orders.js` 1391~1402 돈 게이트)

| 경우 | 요청 | 결과 |
|---|---|---|
| 새 총액 ≤ 기존 총액 (+0.005 오차) | 그대로 | **지금과 같음** — 200, 상태 불변, 승인 게이트 안 탐 |
| 새 총액 > 기존 총액, `confirm_increase` 없음 | — | **400 `TOTAL_EXCEEDS`** (코드 유지) + `requires_confirmation: true`, `approval_required: <bool>`, `total_before`, `total_after`. 메시지: `Raising the order total needs confirmation` |
| 새 총액 > 기존 총액, `confirm_increase: true` | body 에 `confirm_increase: true` | 200. 줄 교체·총액 갱신은 지금과 같음. 그 뒤 **2-2 게이트** |

- `confirm_increase` 는 **서버가 꼭 요구**한다 — 옛 번들(SW 캐시)·API 직접 호출이 모르고 올리지 못하게. 화면의 확인 창이 이 값을 보낸다.
- `TOTAL_EXCEEDS` 코드를 바꾸지 않는 이유: 옛 번들이 받으면 지금 빨간 문구(«exceeds…»)가 그대로 떠서 **틀린 말은 아니고**, health-check 정규식(`/exceeds/i`)도 메시지에 «exceeds» 가 남게 쓰면 된다 — 메시지는 `Amended total exceeds the current total — confirm the increase to proceed`.
- 이력 이벤트 `amended` 의 eventFields 에 `total_increased: true|false` 를 더한다(기존 `changes·reason·by_user_id·total_before·total_after` 유지). 구매자 배너·메일이 «올랐음» 을 구분할 수 있게.

### 2-2. 오너 승인 매장 — 인상이면 «새 주문과 같은 승인»

- `utils/poOwnerApproval.js` 에 **새 함수 `applyAmendRaiseGate(po, t, appendTrackingEvent, { totalBefore, totalAfter })`** 를 둔다 (같은 파일 — «게이트를 라우트에 복붙하면 우회된다» 원칙 그대로. `applySubmitGate` 를 재사용하지 않는 이유: 그 함수의 else 가지가 `submitted` + `submitted_at` 을 다시 쓰는데, 인상 수정은 승인이 필요 없으면 **상태를 건드리면 안 된다**).
  - `po.entity_type !== 'restaurant'` → false.
  - `isApprovalRequiredForRestaurant(restaurant)` (오너 연결 AND `requirePoOwnerApproval !== false`) 가 false → false, 상태 불변.
  - true → `status: 'pending_approval'`, `approval_required: true`, 이력 `appendTrackingEvent(po, 'pending_approval', 'Awaiting Owner approval — seller raised the total RM a → RM b', null, { raised_by_seller: true, status_before: <submitted|confirmed>, total_before, total_after, by_user_id })` → true.
  - 행위자 예외(제출자가 오너면 생략)는 **적용하지 않는다** — 대리 주문 추가와 같다(판매자 라우트는 actor 를 넘기지 않는다).
- amend 라우트는 `po.update(...)` 뒤 트랜잭션 **안에서** 이 함수를 부른다(잠금 유지). 커밋 뒤:
  - `emitPoEvent(req, po, 'seller-order-updated')` (지금과 같음) — 판매자 목록은 refetch 로 그 행이 빠진다(`SELLER_HIDDEN`).
  - `needsApproval` 이면 `fireOwnerApprovalPendingNotification(po)` (`services/poNotifications.js:130`, 기존 템플릿 그대로 — 품목표+총액이라 오너가 볼 것이 그대로 들어 있다).
  - 응답 `message: 'Order amended — awaiting buyer Owner approval'`, `data.status === 'pending_approval'`.
- **승인 뒤**: `POST /purchase-orders/:id/approve` 는 **그대로 둔다** (`submitted` + 판매자 «새 주문» 통지 + 구매자 확인 통지). `confirmed` 였던 주문도 `submitted` 로 돌아오므로 판매자가 **다시 확인(confirm)** 한다 — 청구서 «확정 시 발행» 매장이면 그때 새 총액으로 청구서가 난다(인상 전에 청구서가 있었으면 amend 자체가 `ALREADY_INVOICED` 로 막혀 있으니 이중 발행 없음). `status_before` 를 복원하지 않는 이유: 승인 라우트(보안 경계)를 건드리지 않고, 판매자가 바뀐 주문을 한 번 더 보고 확인하는 것이 맞다.
- **반려 뒤**: `reject` 도 그대로 — `draft` + `rejected_reason`. 인상된 줄이 그대로 draft 에 남고 구매자(RA)가 고쳐 다시 보내거나 버린다. 판매자에게는 그 주문이 돌아오지 않는다 — 확인 창 문구가 이것을 미리 말한다(2-4). 판매자에게 반려 메일은 **이번 범위 밖**(새 알림 카테고리·템플릿이 필요하고, 재주문 주체는 구매자다. 필요해지면 그때 사안).

### 2-3. 후보 조회 응답 — `GET /api/seller-orders/:id/amendable-products`

- `raise_requires_approval: boolean` 을 더한다 = `po.entity_type === 'restaurant' && isApprovalRequiredForRestaurant(Restaurant.findByPk(po.entity_id, {attributes:['id','operation_settings']}))`. 화면이 확인 창 문구를 가른다. 저장 판정과 **같은 함수**를 쓰므로 «화면 말과 서버 행동이 다른» 경우가 없다.

### 2-4. 화면 — `pages/IncomingOrders/IncomingOrdersView.tsx` (1188 `amendExceeds` · 1193 `amendCanSave` · 1967 경고)

1. `amendCanSave` 에서 `!amendExceeds` 조건을 **뺀다**. 저장 버튼은 인상이어도 살아 있다.
2. 1967 빨간 경고를 **호박색 안내**로 바꾼다 (`#FFFBEB`/`#92400E`, 구매자 상세의 승인 대기 배너와 같은 톤):
   - 기본: «Order total rises RM 804.60 → RM 830.50. The buyer will be notified of the change.»
   - `raise_requires_approval` 이면 한 줄 더: «This buyer requires Owner approval for the new total — the order leaves your list until it is approved.»
3. «Save changes» 클릭 시 `amendExceeds` 이면 **`components/UI/ConfirmModal`** 을 띄운다(표준 모달, 새 styled 금지):
   - 제목 «Raise the order total?»
   - 본문: «RM 804.60 → RM 830.50 (+RM 25.90). The buyer is told what changed.» + 승인 매장이면 «The buyer's Owner must approve the new total. Until then the order is not in your list. If declined, it returns to the buyer as a draft and the buyer reorders. Once approved it comes back as Submitted — confirm it again.»
   - 확인 → `POST …/amend` 에 `confirm_increase: true` 를 붙여 보낸다. 취소 → 수정 창으로 돌아간다(입력 유지).
   - 인상이 아니면 확인 창 없이 지금처럼 바로 저장.
4. 성공 응답이 `pending_approval` 이면 성공 문구를 «Saved — waiting for the buyer's Owner to approve the new total» 로(일반 «Order amended» 와 구분). 목록 refetch 로 행이 빠지는 것은 지금 동작.
5. `orders.amend.hint`(«You cannot raise the order total…») 문구를 «The buyer is told what changed. Raising the total asks you to confirm; if the buyer's Owner approval is on, the new total waits for that approval.» 로 바꾼다.
6. i18n: `supplier.json` 4개 언어(en→ko→zh→ms) — 바꾸는 키 `orders.amend.hint`·`orders.amend.exceeds`(문구 교체), 새 키 `orders.amend.raiseNotice`·`raiseNeedsApproval`·`confirmRaiseTitle`·`confirmRaiseBody`·`confirmRaiseApprovalBody`·`savedPendingApproval`. `npm run i18n:verify`.
7. 구매자 상세 배너(`PurchaseOrderDetailPage.tsx` 1285~ 마지막 `amended` 이벤트) — 문구는 그대로, `total_increased` 면 전후 총액 줄을 **굵게**만. 승인 대기 배너(1250)는 이미 상태로 뜬다.

### 2-5. 기록·안내 (새 테이블·ENUM 없음)

- 이력: `amended` 이벤트(+`total_increased`) → 승인 매장이면 `pending_approval` 이벤트(+`raised_by_seller`·`status_before`) → 오너 `submitted`(«Approved by Owner») 또는 `draft`(«Rejected by Owner: …»). 전부 `tracking_info.events` 안.
- 구매자 메일 «Order Amended»(seller-orders.js 1452~): 전후 총액은 이미 있다. `needsApproval` 이면 대리 주문 메일과 **같은 호박색 블록** «This change is waiting for Owner approval before it is confirmed.» 를 넣는다(1268 줄 마크업 재사용).
- 오너 메일: 기존 `po_approval_pending`(«Purchase Order Awaiting Approval») 그대로.
- 소켓: 기존 `seller-order-updated` 그대로.

### 2-6. health-check 계약 변경 (`scripts/health-check.js`)

**P7 (5905~5913) 수정:**
1. 인상(100개) + `confirm_increase` 없음 → **400 `TOTAL_EXCEEDS`** 이고 `body.requires_confirmation === true` (기존 `/exceeds/i` 검사 유지).
2. 인상 + `confirm_increase: true` → **200**, `total_amount` 가 올랐고(100 × 단가), 마지막 `amended` 이벤트 `total_increased === true`, **상태는 `submitted` 그대로**(오너 승인 없는 매장).
3. 그 뒤 감량(4개) → 200, `confirm_increase` 없이(지금 `ok` 케이스 유지). 줄 1개·수량 4 검사 유지.
4. 남의 상품 `PRODUCT_NOT_YOURS` 유지.

**새 케이스 1개** (`pos` 카테고리, 2691 «오너 연결+ON» 케이스의 고정물 패턴 그대로 — 데모 매장 + demo/test 오너 + `requirePoOwnerApproval: true`, finally 에서 ownership 행·설정·주문 원복):
- 승인 **켜기 전에** 판매자 대리 주문 생성(→ `submitted`, 판매자에게 보임).
- 오너 연결 + 설정 ON.
- 감량 amend → 200, 상태 `submitted` 그대로 (**감량은 게이트 안 탐**).
- 인상 amend + `confirm_increase` → 200, `data.status === 'pending_approval'`, `approval_required === true`, 마지막 이벤트 `raised_by_seller === true`.
- 판매자 `GET /seller-orders/:id` → **404** · 목록에 없음(«승인 전 미노출» 계약 그대로).
- 오너 `GET /purchase-orders/pending-approval` 에 있음 → `approve` → `submitted` → 판매자 `GET` 200.
- **고장주입(의무)**: ① amend 의 `confirm_increase` 요구를 빼면 P7-1 이 실패해야 한다. ② `applyAmendRaiseGate` 호출을 빼면 새 케이스의 `pending_approval` 검사가 실패해야 한다. 둘 다 1회 반증 후 원복(pm2 restart 뒤 — watch 꺼짐).

### 2-7. 문서·주석 갱신 범위

- `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` «판매자 주문 수정 (amend) — 2026-09-24» 절: 원칙 블록을 1절의 새 원칙으로 교체(옛 원칙은 «2026-10-15 Irene 지시로 대체» 로 남김) · 계약 표 «🔒 돈 게이트» 행을 2-1 표로 · «지원 범위 밖» 에서 «총액 인상 수정» 삭제 · 새 소절 «총액 인상 — 2026-10-15» 에 2-2~2-6 요약. 새 문서 만들지 않는다.
- `utils/poAmend.js` 머리글 원칙 한 줄 교체. `utils/poOwnerApproval.js` 머리글 «나가는 경로 세 곳» 에 «+ 판매자 인상 수정(`applyAmendRaiseGate`)» 추가.
- `docs/PURCHASE_ORDER_SYSTEM.md` 오너 승인 절에 한 줄: «판매자가 총액을 올리는 수정도 같은 게이트(`pending_approval`)».
- 메모리: `reference_po_owner_approval.md` 에 «인상 수정도 게이트» 한 줄.

### 2-8. 하지 않는 것 (의도적)

- **`SELLER_HIDDEN` 은 손대지 않는다** — 승인 대기 주문을 «이미 본 주문이면 보여 주기» 로 열면 보안 경계(«승인 전 유출 금지» health-check)와 목록 필터를 다 건드린다. 판매자는 확인 창에서 «승인될 때까지 목록에서 빠진다» 를 미리 듣는다. Irene 가 «빠지면 안 된다» 고 하면 그때 별도 사안.
- 승인·반려 라우트(`purchase-orders-approval.js`) 무접촉. `status_before` 복원 없음(2-2).
- 판매자용 반려 메일 없음(2-2). 인상 상한·비율 제한 없음(오너 승인이 그 역할). 새 테이블·ENUM·상태값 없음.
- 🔒 인쇄·KDS 보호파일 무접촉. 운영 쓰기 없음.

## 3. 바뀔 파일 (구현자가 이 밖을 건드리면 설계 이탈 — 즉시 중단)

백엔드 `routes/seller-orders.js`(amend 돈 게이트·게이트 호출·메일 블록·amendable-products 필드) · `utils/poOwnerApproval.js`(새 함수) · `utils/poAmend.js`(주석) · `scripts/health-check.js`(P7 + 새 케이스)
프론트 `pages/IncomingOrders/IncomingOrdersView.tsx` · `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx`(굵게 1줄, 선택) · `public/locales/{en,ko,zh,ms}/supplier.json`
문서 `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` · `docs/PURCHASE_ORDER_SYSTEM.md`

## 4. 구현 뒤 검증 (Fable gate 1회에 넘길 것)

1. `check-sensitive-diff` → 돈·주문 무결성 + 승인 경계 → gate 대상(예상).
2. health-check `--category=pos` P7 + 새 케이스 통과 **+ 고장주입 2건 반증 로그**.
3. 실호출 1회(데모 매장 38, `[확인용]`): 브랜드 판매자로 주문 → 인상 amend 확인 없이 400 → 확인으로 200 → 구매자 상세 배너 전후 총액 → 메일 발송 로그(sendNotification 가드 안에서).
4. 프론트: 코드 확정 → `build:dev` 1회 → `verify-all --full` 1회. 수정 창 클릭 흐름 1회(인상 → 확인 창 → 저장 → 목록 반영).
5. `check-print-guard` 0건 · `check-design-guard`(ConfirmModal 사용, 로컬 styled 신규 0) · `i18n:verify`.
6. 운영 반영: 다음 배포 때(마이그 없음, SW bump 는 프론트 변경 끝에 1회).
