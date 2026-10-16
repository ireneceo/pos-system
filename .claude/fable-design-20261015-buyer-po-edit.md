# Fable 설계 — 발주 뒤 매장 쪽 품목 수정 (buyer amend) · 2026-10-15

> 종류: `design` (새 기능 · 돈 약속(발주 총액)을 바꾸는 경로 · 오너 승인 상태 전이). 구현 끝나면 `gate` 1회(아래 §9).
> 전달 사실: `/home/irene/.claude/jobs/736a78f9/tmp/fable-brief.md`. Irene 원문은 그 문서 맨 위.
> 이 문서가 단일 진실. 구현 중 여기와 다른 판단이 필요해지면 **즉시 중단하고 Fable 에게**.

## 0. 결론 한 줄

**판매자 amend(`routes/seller-orders.js POST /:id/amend` + `utils/poAmend.js`)를 구매자 쪽에 거울로 세운다.** 같은 판정 함수(`mappingUsableBy`·`listAmendableProducts`·`buildAmendedLine`·`diffLines`)·같은 금액 재계산(`computeTotalsWithDelivery`)·같은 이력 이벤트(`amended`)를 쓰고, 다른 점은 셋뿐이다 — ①누가(구매자 역할 가드) ②언제(판매자 확인 전까지) ③오너 승인 매장이면 **모든 수정이 다시 승인을 받는다**(인상만이 아니다 — Irene «수정도 승인하게»).

새 길을 하나 더 파지 않는다: `PUT /purchase-orders/:id`(화면 호출 0 · 화면 단가를 믿음)는 **품목 수정 경로로 살리지 않는다**(§8).

## 1. Irene 원문 → 요구 항목 (대조표 — 완료 보고 때 이 표를 ✅/❌ 로)

| # | 원문 | 설계 |
|---|---|---|
| R1 | 외부공급업체 발주는 언제나 수정 가능 | 외부: `submitted`·`pending_approval` 에서 수정. 외부 발주는 판매자가 confirm 하지 않으므로 수령 전까지 계속 `submitted` = «언제나» 가 된다. 단 **돈·물건이 움직인 뒤**(받은 수량>0 · 결제됨 · 청구서 붙음 · 인보이스 대조됨)는 막는다 — 그건 «수정» 이 아니라 반품·대조 흐름(§3-2). |
| R2 | 우리 솔루션 공급업체는 오너 승인 뒤 넘어가기 전까지만 | 가입 판매자: `pending_approval`·`submitted`(판매자 **확인 전**) 에서 수정, `confirmed` 부터 불가. «submitted 도 허용» 은 Fable 해석 — Irene 질문 §10 Q1 (상수 하나라 답에 따라 1줄). |
| R3 | 레스토랑관리자나 발주권한 있는 스탭이 수정 | `requireBuyerRole` 그대로 — RA · Staff(`inventory` 권한) 통과. 오너 «소유 매장으로 행동» 도 허용(OWNER_ACTING_ROUTES 추가, §4-3). |
| R4 | 오너 승인 설정 매장은 수정도 승인 | 수정 저장 → `applyBuyerAmendGate` → `pending_approval`(인상·감량 불문). 오너 본인이 고치면 생략(승인자=작성자, `applySubmitGate` 와 같은 예외). |
| R5 | 아이템별 삭제 · 해당 공급업체 것 추가를 발주내역에서 | 상세 화면(`PurchaseOrderDetailPage`) «Edit items» 모달: 줄 빼기·수량 고치기·**이 판매자 상품 중 내 재고에 연결된 것** 추가. 후보 = `listAmendableProducts(po, buyerEntity)`(판매자 화면과 같은 함수). |
| R6 | 승인 절차가 있으면 수정 요청이 제출되고 오너가 상황 확인하고 승인 | 오너 승인 큐(`OwnerPoApprovalsPage`)에 «Edited» 표시 + 상세(embedded)에 «매장이 고침 · 바뀐 줄 · 총액 전→후» 박스. 승인/반려 라우트는 **무변경**. |

## 2. 상태 전이 (단일 그림)

```
                     구매자 수정(amend) 가능 구간
draft ──submit/mark-sent──▶ pending_approval ──approve──▶ submitted ──seller confirm──▶ confirmed ▶ shipped ▶ …
  ▲                            ▲       │                     │
  │ (Staging 이 맡음·무변경)     │       └─ reject → draft      │
  │                            │                             │
  │                            └──── buyer amend (승인 매장·오너 아님) ◀──┘
  │                                   = «수정 요청» — 상태 pending_approval, approval_required=true
  │
  └ 비승인 매장: buyer amend 는 상태를 **안 바꾼다**(submitted 그대로), 줄·총액·이력만 바뀜
```

- `pending_approval` 에서 수정 → `pending_approval` 그대로(이벤트만 추가). 오너는 최신 내용으로 승인한다.
- `submitted` 에서 수정 + 승인 매장 + 행위자가 오너 아님 → `pending_approval`. 가입 판매자 발주는 이 순간 판매자 화면에서 **사라진다**(`SELLER_HIDDEN` 봉인 3지점이 이미 처리) → 오너 승인 → `submitted` + 판매자에게 «주문 받음» 통지 다시(기존 approve 라우트 그대로 — 판매자는 같은 번호의 주문을 다시 받는 셈. 수용한다; 판매자 인상 수정 게이트와 같은 동작).
- `submitted` 에서 수정 + (비승인 매장 또는 오너 본인) → `submitted` 유지. 가입 판매자에게 «구매자가 고쳤다» 통지(§6).
- `confirmed` 이후: 400 `BAD_STATUS`. 안내 문구: 판매자에게 수정 요청하거나 취소.
- `draft`: 400 `BAD_STATUS` — 초안은 Staging(품목 빼기 `DELETE /items/:itemId`·장바구니)이 맡는다. 상세 화면에서도 draft 는 버튼을 숨긴다.

## 3. 판정 — 단일 소스는 `utils/poAmend.js` 에 추가

### 3-1. 상수
```js
// 구매자가 고칠 수 있는 상태 = 판매자가 확인하기 전. (판매자 AMENDABLE_STATUSES 와 다르다 — 판매자는 confirmed 도 고친다)
//   외부 공급업체는 confirm 이 없어 수령 전까지 submitted 에 머문다 → 사실상 «언제나»(Irene R1).
//   Irene Q1(§10) 답이 «승인 뒤엔 불가» 면 isExternal=false 쪽에서 'submitted' 를 뺀다 — 이 한 줄.
function buyerAmendableStatuses(isExternal) {
  return ['pending_approval', 'submitted'];
}
```

### 3-2. 막는 조건 — `buyerAmendBlock(po, lines, { isExternal })` → `null | { code, message, http }`
순서대로 첫 번째 걸리는 것 하나를 돌려준다(상세 GET 의 버튼 숨김과 POST 거부가 **같은 함수**를 부른다 — feedback_check_and_fix_same_sql).

| 순서 | 조건 | code | http |
|---|---|---|---|
| 1 | `!buyerAmendableStatuses(isExternal).includes(po.status)` | `BAD_STATUS` | 400 |
| 2 | `po.trade_invoice_id` | `ALREADY_INVOICED` | 400 |
| 3 | `po.invoice_reconciled_at` | `ALREADY_RECONCILED` | 400 |
| 4 | `po.payment_status === 'paid'` (부분결제 `partial` 도 막는다: `!== 'unpaid'` 가 아니라 **`['paid','partial'].includes`** — 실제 ENUM 값은 `models/PurchaseOrder.js:59` 읽고 맞출 것) | `ALREADY_PAID` | 400 |
| 5 | `lines.some(r => quantity_received > 0)` | `ALREADY_RECEIVED` | 400 |
| 6 | `lines.some(r => r.shipped_at)` | `ALREADY_SHIPPED` | 409 |

«결제됨» 을 막는 이유: 외부 발주는 수령 전 결제(`pay`·`direct-purchase`)가 있다. 낸 돈과 발주 총액이 어긋나면 장부가 갈라진다 — 되돌리려면 «Reverse payment» 뒤에 고치게 한다(화면 안내 문구).

### 3-3. 줄 입력 규격 (판매자 amend 와 같은 «전체 교체»)
```
POST body: {
  items: [
    { item_id?: number,                       // 남기는 줄 — 그 줄의 고른 옵션이 그대로 따라간다(carriedOptionsFor)
      ingredient_seller_product_id: number,   // 필수. 후보 목록의 값
      quantity_ordered: number > 0,
      option_ids?: number[],                  // 새 줄만. 가입 공급업체 상품만(resolveLineOptions — 외부·브랜드면 OPTIONS_NOT_SUPPORTED)
      notes?: string }
  ],
  reason?: string   // 선택. 이력·통지에 실린다
}
```
- `items` 비면 400 `EMPTY_ITEMS`(«전부 빼려면 취소를 쓰세요»). 줄 하나라도 남아야 한다.
- 단가는 **서버가** `buildAmendedLine` 으로 채운다(연결 현재가 + 옵션 조정액). 요청의 `unit_price` 는 읽지 않는다.
- 새 줄 옵션: `const opts = Number.isFinite(parseInt(raw.item_id,10)) ? carriedOptionsFor(raw, mappingId, beforeRows) : (await resolveLineOptions({ mapping, optionIds: raw.option_ids, transaction: t })).options;` → `buildAmendedLine(po, raw, mapping, stockRow, target, t, opts)` (함수 시그니처 무변경). V1 화면은 옵션을 고르지 않는다(§5) — 서버만 받는다.
- 후보 검증 = `mappingUsableBy(mapping, po, buyerEntity, t)` (판매자 일치·재고 자리 연결). 남의 판매자 상품 → `PRODUCT_NOT_YOURS`.
- 구매자 경로는 **최소주문·판매중지를 강제**한다: `assertLinesMeetMinOrder(validated)` · `assertLinesSellerProductActive(validated)` (제출 라우트와 같은 두 함수. 판매자 amend 는 규칙 주인이라 안 걸지만 구매자는 건다).
- 금액: `computeTotalsWithDelivery(validated, po, { orderCurrency: po.currency })` → subtotal·tax·delivery_fee·basis·total_amount. 다른 금액식 금지.
- 이력: `appendTrackingEvent(po, 'amended', note, null, { by_buyer: true, by_owner: <bool>, changes: diffLines(beforeRows, validated), reason, by_user_id, total_before, total_after, total_increased })`. 기존 'amended' 이벤트와 **같은 모양 + `by_buyer:true`** 하나만 다르다 — 상세 화면 박스가 이 플래그로 «판매자가/매장이» 문구를 가른다.

### 3-4. 승인 게이트 — `utils/poOwnerApproval.js` 에 `applyBuyerAmendGate` 추가
```js
/**
 * 구매자가 보낸 뒤 발주를 고쳤을 때의 승인 게이트 (2026-10-15 Fable 설계 buyer-po-edit §3-4).
 * 오너 승인 매장이면 인상·감량 불문 pending_approval(Irene «수정도 승인하게»). 행위자가 그 매장 ownership 오너면 생략
 * (applySubmitGate 와 같은 예외 — 승인자가 작성자). 아니면 상태를 건드리지 않고 false.
 * applyAmendRaiseGate(판매자·인상만) 와 다른 함수인 이유: 조건(전부 vs 인상)·행위자 예외(있음 vs 없음)가 다르다.
 */
async function applyBuyerAmendGate(po, t, appendTrackingEvent, { actor, totalBefore, totalAfter }) {
  if (!(await isApprovalRequiredForPo(po, t))) return false;
  if (actor) {
    const owned = await resolveOwnerRestaurantIds(actor);
    if (owned.includes(parseInt(po.entity_id, 10))) return false;
  }
  const tracking = appendTrackingEvent(po, 'pending_approval',
    `Awaiting Owner approval — buyer edited the order ${(+totalBefore||0).toFixed(2)} → ${(+totalAfter||0).toFixed(2)}`,
    null, { edited_by_buyer: true, status_before: po.status, total_before: totalBefore, total_after: totalAfter, by_user_id: actor?.id || null });
  await po.update({ status: 'pending_approval', approval_required: true, tracking_info: tracking }, { transaction: t });
  return true;
}
```
- `status_before === 'pending_approval'` 이어도 이벤트는 남긴다(오너가 «두 번 고쳤다» 를 본다). `submitted_at` 은 건드리지 않는다.
- 응답 `data.status` 로 화면이 «승인 대기로 들어갔다» 안내.

## 4. 서버 경로

### 4-1. 새 파일 `routes/purchase-orders-amend.js` (workflow.js 는 결제 라우트가 든 민감 파일 — 거기 안 넣는다)
- 머리: `router.use('/purchase-orders', authenticateToken, requireBuyerRole)` (crud/workflow 와 동일). `checkPOOwnership` 은 crud 의 4줄 함수와 **같은 본문**을 둔다(현재 crud 는 export 안 함 — export 를 추가해 가져다 써도 됨, 둘 중 하나. 복사하면 주석에 «crud.js:98 과 같아야 한다»).
- `routes/purchase-orders.js` barrel 에 `router.use(require('./purchase-orders-amend'))` 한 줄. 경로 충돌 없음(새 두 경로뿐).

**GET `/api/purchase-orders/:id/amendable-products`**
- 404(없음·남의 것) → `const isExternal = isExternalSeller(await resolveSellers([po]), po.seller_type, po.seller_entity_id)`.
- 응답 `data: { products, can_amend: boolean, blocked: code|null, approval_required_on_edit: boolean, is_external }`
  - `products = listAmendableProducts(po, req.buyerEntity, undefined, { keepMappingIds: 현재 줄들의 mapping id })`. **`utils/poAmend.listAmendableProducts` 출력에 `stock_name: check.stockRow.name` 한 칸 추가**(구매자 화면은 자기 재고 이름으로 고른다; 판매자 화면은 `name` 그대로라 무영향). 브랜드 미연결 배포 상품(`unlinkedBrandProductsFor`)은 **이번 범위 밖**(연결된 것만 — Irene 사례는 매장↔공급업체).
  - `approval_required_on_edit = await isApprovalRequiredForPo(po) && !(오너 본인)`. 오너 본인 판정은 `req.buyerIsOwnerView`.
  - `blocked = buyerAmendBlock(po, lines, { isExternal })?.code ?? null`, `can_amend = !blocked`.

**POST `/api/purchase-orders/:id/amend`**
트랜잭션 안: `findByPk(id, { lock: t.LOCK.UPDATE })` → 404 → `buyerAmendBlock` (code 그대로 http 와 함께) → 줄 검증·빌드(§3-3) → MOQ·판매중지 → `diffLines` → destroy+bulkCreate → totals → `po.update({...totals, tracking_info})` → `applyBuyerAmendGate(po, t, appendTrackingEvent, { actor: req.user, totalBefore, totalAfter })` → 커밋.
커밋 뒤(§6 통지) → 응답 `{ success, data: fresh PO(items 포함), message }`.
에러 매핑: `NOT_FOUND`→404 · `ALREADY_SHIPPED`→409 · `MinOrderError`→`minOrderErrorBody` · `InactiveSellerProductError`→`inactiveSellerProductErrorBody` · `LineOptionError`→`lineOptionErrorBody` · 나머지 코드(BAD_STATUS·ALREADY_*·EMPTY_ITEMS·BAD_ITEM·PRODUCT_*·NOT_LINKED_TO_BUYER·UNSUPPORTED_STOCK_TARGET·STOCK_TARGET_INVALID)→400 `{ success:false, code, message }`.

### 4-2. 상세 GET `/api/purchase-orders/:id` (crud.js:616) — 두 칸 추가
`plain.can_amend` · `plain.amend_blocked`(code|null) — 같은 `buyerAmendBlock` 호출(이미 `is_external` 을 계산하는 자리 crud.js:645 바로 뒤). 화면 버튼은 이 값만 본다(상태 목록을 프론트에 복사하지 않는다 — poStatuses 머리글 원칙).

### 4-3. 권한
- `middleware/buyerScope.js OWNER_ACTING_ROUTES` 에 `['POST', /^\/api\/purchase-orders\/\d+\/amend$/]` 추가 (GET 후보는 기존 GET 정규식이 이미 덮는다). 주석: «2026-10-15 buyer-po-edit §4-3 — 오너가 소유 매장 발주를 고치면 승인 생략(applyBuyerAmendGate)».
- Staff: 기존 `inventory` 권한 검사로 충분(새 코드 없음).
- 판매자 역할(Supplier Admin 등)은 `requireBuyerRole` 403 — 판매자는 자기 amend 를 쓴다.

## 5. 화면

### 5-1. `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx`
- **버튼** «Edit items»(`detail.actions.editItems`): `renderActions()` 에서 `detail.can_amend === true` 일 때, `!ownerView` 블록과 `ownerView` 블록 **둘 다** Cancel 버튼 바로 앞에 `variant="outline"`. `can_amend` 가 false 면 버튼 자체를 숨긴다(비활성 아님). draft 는 서버가 false 를 준다.
- **모달**(`Modal` 공용 · 제목 «Edit items» · 폭은 수령 모달과 같게): 열 때 GET amendable-products.
  - 표: 현재 줄 — 이름(`poItemName`) · 수량 입력(`qtyStepForUnit`) · 단위 · 단가(읽기) · 줄합계 · «×» IconButton(빼기). 옵션 있는 줄은 이름 밑에 옵션 글(기존 `descriptionWithOptions` 결과 = `description`) — 그대로 보존됨을 사용자가 알게.
  - «Add item» 줄: `SelectComponents` 로 후보(`stock_name`, 이미 표에 있는 mapping 은 제외) + 수량 → 표에 추가(새 줄 = `item_id` 없음, 옵션 없음).
  - 아래: 총액 `전 → 후`(줄합계 합. 배송비는 서버가 다시 계산하니 «배송비는 저장 후 반영» 한 줄) · 이유(선택, textarea) · 안내 띠: `approval_required_on_edit` 면 «저장하면 오너 승인 대기로 들어갑니다 — 승인 전엔 판매자에게 가지 않습니다»; `is_external` 이면 «저장 뒤 WhatsApp/Email 로 공급업체에 다시 보내 주세요».
  - 저장 → POST amend → 성공이면 모달 닫고 상세 다시 불러오기. 응답 status 가 `pending_approval` 이면 기존 노란 배너가 뜬다(코드 무변경). 실패 코드별 문구(§7 키).
  - 줄 0개면 저장 비활성 + «전부 빼려면 취소» 안내.
- **상단 박스**(기존 1285~1335줄 'amended' 박스): `last.by_buyer` 면 제목을 `detail.amendedByBuyer`(«This order was edited by the store») / `last.by_owner` 면 `detail.amendedByOwner`. 나머지(변경 목록·총액) 공용. 다른 코드 무변경.
- 호출은 기존 패턴 `fetch(withOwnerPoScope(`/api/purchase-orders/${id}/amend`, poRole), …)`.

### 5-2. `pages/Owner/OwnerPoApprovalsPage.tsx`
- 상태 칸: 마지막 이벤트가 `pending_approval` 이고 `edited_by_buyer` 면 `warning` 배지 글을 `ownerApprovals.editedBadge`(«Edited · awaiting re-approval»)로. (`rows` 는 `tracking_info` 를 이미 받는다 — GET pending-approval 이 `toJSON()` 전체.)
- 상세(«Details» = embedded `PurchaseOrderDetailPage`)에서 §5-1 박스가 바뀐 줄을 보여 준다 → 추가 UI 없음.
- 승인/반려 버튼·라우트 무변경.

### 5-3. 안 하는 것
- Staging 화면·초안 흐름 무변경. 판매자 화면(`IncomingOrdersView`) 무변경(통지 메일만 새로 받음). 인쇄·KDS 보호 파일 무접촉.

## 6. 통지 (`services/poNotifications.js` 에 1개 추가)
`fireSellerAmendedByBuyerNotification(po, { changes, reason, totalBefore, totalAfter })`
- 수신: `fireSellerSubmittedNotification` 과 같은 판매자 사용자 집합(supplier/brand/foodcourt). 외부 공급업체는 사용자 0 → 조용히 종료(그쪽은 화면 안내로 WhatsApp/Email 수동 재전송).
- 카테고리 `seller_order_received`(기존). 본문은 판매자→구매자 amend 메일(seller-orders.js:1457~)과 같은 표(품목·변경·전·후) `wrapTemplate` 'en' 고정 — 그 메일이 이미 'en' 고정이라 같은 수준. (언어별 팩토리는 따로 하지 않는다 — 템플릿 4언어를 새로 만드는 일은 이 범위 밖.)
- 호출 시점: 커밋 뒤 `setImmediate`, **승인 대기로 들어간 경우엔 보내지 않는다**(판매자에게 존재하지 않는 주문이 됨 — 승인 뒤 approve 라우트가 통지). 대신 `fireOwnerApprovalPendingNotification(po)`.
- 소켓: `emitPoEvent(req, po, 'seller-order-updated')` (pending_approval 이면 서비스가 판매자 룸 생략 — 기존 봉인).

## 7. i18n — `public/locales/{en,ko,zh,ms}/purchaseOrders.json` (다른 방이 고치는 중 — **키만 추가**, 덮어쓰기 금지)
`detail.actions.editItems` · `detail.editItems.title` · `detail.editItems.addItem` · `detail.editItems.reason` · `detail.editItems.totalBeforeAfter` · `detail.editItems.deliveryNote` · `detail.editItems.approvalNote` · `detail.editItems.externalResendNote` · `detail.editItems.emptyHint` · `detail.editItems.save` · `detail.amendedByBuyer` · `detail.amendedByOwner` · `detail.editItems.error.{BAD_STATUS,ALREADY_INVOICED,ALREADY_RECONCILED,ALREADY_PAID,ALREADY_RECEIVED,ALREADY_SHIPPED,EMPTY_ITEMS}` · `ownerApprovals.editedBadge`. `npm run i18n:verify` 통과.

## 8. 건드리지 않는 것 · 뒤로 미루는 것
- `PUT /purchase-orders/:id`(crud.js:1393): **무변경**. 품목 수정의 정식 경로는 이제 `/amend` 다. 문서(`docs/PURCHASE_ORDER_SYSTEM.md` «백로그 — 판매자 라인 단위» 절 아래)에 «구매자 줄 수정 = `/amend`(2026-10-15) · PUT 은 화면 진입점 없음 유지» 한 줄. (PUT 이 submitted 에서 화면 단가를 믿는 건 기존 부채 — 이 일에서 고치지 않는다. 다음 정리 후보로만 적는다.)
- `DELETE /items/:itemId`(draft 전용)·Staging: 무변경.
- 판매자 amend·`applyAmendRaiseGate`: 무변경.
- DB 스키마: 없음(tracking_info JSON · 기존 칸만). 마이그 없음.

## 9. 검증 — 무엇을 증명하나 (전부 숫자로 · 고장주입 포함)

### 9-1. health-check 에 블록 1개 추가 (`test('pos', '구매자 발주 수정 …')` — 기존 «오너 발주 취소» 픽스처(health-check.js:566~)를 본떠 임시 오너·외부/가입 공급업체·발주를 만들고 finally 로 전부 삭제. 데모 매장 38 만.)
| # | 시나리오 | 기대 |
|---|---|---|
| B1 | RA · 가입 판매자 · `submitted` · 줄 2개: 후보 GET | 200 · `can_amend:true` · 후보에 연결 상품만(남의 판매자 mapping 없음) · `stock_name` 있음 |
| B2 | B1 발주: 줄 하나 빼고 하나 추가 + 수량 변경 | 200 · DB 줄 = 요청과 일치 · `total_amount === Σline_total + delivery_fee`(`computeTotalsWithDelivery` 재호출값과 1센트 이내) · 마지막 이벤트 `amended` `by_buyer:true` · `changes` 에 removed 1·added 1·changed 1 · 상태 `submitted` 그대로(비승인 매장) |
| B3 | 상태를 `confirmed` 로 바꾸고 다시 | 400 `BAD_STATUS` · 줄 무변경 |
| B4 | 각각 하나씩: `quantity_received=1` / `trade_invoice_id` 세팅 / `payment_status='paid'` / `shipped_at` 세팅 / `invoice_reconciled_at` 세팅 | 400 ALREADY_RECEIVED · 400 ALREADY_INVOICED · 400 ALREADY_PAID · 409 ALREADY_SHIPPED · 400 ALREADY_RECONCILED (각각 상세 GET 의 `amend_blocked` 와 **같은 코드**) |
| B5 | 승인 매장(임시 오너 + `requirePoOwnerApproval:true`, 원본 settings JSON.stringify 로 저장·복원): RA 가 `submitted` 발주 감량 수정 | 200 · 상태 `pending_approval` · `approval_required:true` · `GET /purchase-orders/pending-approval`(오너) 에 보임 · 판매자 목록 `GET /seller-orders`(판매자 토큰 있으면)에서 사라짐 |
| B6 | B5 발주를 오너가 approve | 200 · `submitted` · 줄은 수정된 내용 유지 |
| B7 | 같은 승인 매장에서 **오너**가 `?entity_type=restaurant&entity_id=38` 로 amend | 200 · 상태 `submitted` 유지(승인 생략) · 이벤트 `by_owner:true` |
| B8 | 외부 공급업체 `submitted` 발주: amend | 200 · 상태 유지 · `option_ids:[1]` 주면 400 `OPTIONS_NOT_SUPPORTED` |
| B9 | 거부: items 빈 배열 400 EMPTY_ITEMS · qty 0 → 400 BAD_ITEM · 남의 판매자 mapping → 400 PRODUCT_NOT_YOURS · MOQ 미달 → 400(MinOrderError) · 남의 매장 발주 → 404 · 오너가 소유 안 한 매장 → 403 · `inventory` 없는 Staff → 403 · Supplier Admin 토큰 → 403 |
| B10 | `draft` 발주 amend | 400 BAD_STATUS(초안은 Staging) |

### 9-2. 고장주입 (각 1회, 주입→실패 확인→원복, pm2 restart 뒤 돌릴 것)
1. `buyerAmendBlock` 에서 ALREADY_RECEIVED 줄 제거 → B4 첫 항목이 실패해야 한다.
2. 라우트에서 `applyBuyerAmendGate` 호출 제거 → B5 실패.
3. `OWNER_ACTING_ROUTES` 의 amend 줄 제거 → B7 이 403 으로 실패.
4. `requireBuyerRole` 우회(새 파일 머리 `router.use` 주석) → B9 Supplier Admin 403 이 실패.
세 번째·네 번째는 보고에 «반증 완료» 로 적는다.

### 9-3. 기계 게이트
`cd /var/www/dev-backend && node scripts/verify-all.js` → 프론트 변경 뒤 `npm run build:dev` **1회** → `verify-all --full` **1회**(빌드 1회·sweep 1회 규칙). `check-print-guard` 변경 0건이어야 한다(이 일은 인쇄 무접촉). `check-sensitive-diff.js` 는 ②돈·주문 무결성으로 **FABLE 게이트 대상**으로 나오는 게 정상 — 마커는 Fable 판정 뒤에만.

### 9-4. 실브라우저 1회 (sweep 은 «열 수 없는 화면» 을 못 잡는다)
`[as=restaurant store=38]` 로 submitted 발주 상세 → Edit items → 줄 빼기+추가 → 저장 → 상단 «매장이 고침» 박스·줄·총액 확인. 승인 매장 시나리오는 B5 데이터로 오너 화면(`/pos/owner/po-approvals`)에 «Edited» 배지 → Details 에 변경 목록. 보고 «확인할 곳» 에 두 링크.

### 9-5. 완료 보고에 붙일 것
§1 표 R1~R6 ✅/❌ · B1~B10 통과 수 · 고장주입 4건 결과 · verify-all 수치 · 운영 반영은 «다음 배포 때» 한 줄.

## 10. Irene 질문 (하나) — Fable 권고 포함

**Q1. 우리 솔루션(가입) 공급업체 발주가 오너 승인을 거쳐 판매자에게 간 뒤(`submitted`), 판매자가 아직 «확인(confirm)» 하지 않았으면 매장이 고칠 수 있게 할까요?**
- (가) 허용 — 판매자 확인 전까지 수정 가능. 승인 매장이면 다시 승인 대기로 돌아가고, 판매자 화면에서는 잠시 사라졌다가 재승인 뒤 다시 보인다. 비승인 매장이면 판매자에게 «구매자가 고쳤다» 메일.
- (나) 불허 — 승인 뒤(=판매자에게 간 뒤)는 매장이 못 고치고, 판매자에게 수정을 부탁하거나 취소 후 다시 발주.
- **Fable 권고: (가).** 판매자가 아직 아무 약속도 하지 않은 구간이고, 판매자 쪽 amend 가 `confirmed` 까지 허용하는 것과 균형이 맞다. 미스 발주를 «삭제하고 다시» 하지 않게 하자는 원래 목적에 (나)는 반쪽이다. 구현은 (가)로 두고, (나)면 `buyerAmendableStatuses` 에서 `isExternal=false` 일 때 `'submitted'` 를 빼는 한 줄이다 — 이 질문에 막히지 않고 끝까지 구현한다.
