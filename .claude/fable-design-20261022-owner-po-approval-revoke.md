# Fable 설계 — 오너 발주 승인 «승인 전/후» + 승인취소 (2026-10-22 · 작업방 f001fc2a 가 받음 · 원문 그대로)

요청서 `/var/www/.claude/fable-request-20261019-owner-po-approval-history-revoke.md` · 코드 읽기만 함(수정 0 · 운영 접속 0).

## 0. 판정 요지
- **«승인 후 = 발주내역과 동일»** 은 **새 표를 만들지 않고 Order History 화면 그 자체**를 «승인 후» 탭으로 쓴다는 뜻으로 확정한다. 승인 화면과 발주내역 화면 위에 **같은 탭 띠 하나**(«승인 전 N» · «승인 후»)를 얹어 두 화면이 한 메뉴처럼 오간다. 1456줄짜리 PurchaseOrdersPage 를 복제하거나 안에 끼워 넣지 않는다.
- **승인취소(revoke) = «승인 전 상태로 되돌리기»(`pending_approval`)** 다. 발주를 죽이는 것이 아니다(그건 기존 취소 cancel). 근거: 이미 같은 전이가 둘 있다 — 판매자 인상 수정 `applyAmendRaiseGate`·매장 수정 `applyBuyerAmendGate` 가 submitted/confirmed → pending_approval 로 되돌리며 `status_before` 를 기록한다. 되돌리면 ① 승인 대기 탭에 다시 보이고 ② 판매자 포털에서 숨겨지고(§G-6 SELLER_HIDDEN) ③ 오너가 다시 승인(→ submitted) 또는 반려(→ draft) 할 수 있다 — 전부 기존 길.
- **타이밍**: 외부 공급업체 = **물건을 받기 전까지 전부**(Irene «다 가능») · 가입 공급업체 = **판매자가 확인(confirm)하기 전까지**(= 기존 cancel 과 같은 경계 `submitted` 만). 결제된 발주(`payment_status='paid'`)는 둘 다 불가 — 돈이 움직인 뒤의 «승인 되돌림» 은 결제 되돌리기부터 해야 하는 매장 재무 행동이라 이 기능이 돈을 만지지 않는다.
- 재고·돈 코드 **0줄 변경**: 수령 전(RECEIVABLE 중 partial_received 제외)만 허용하니 재고 장부에 닿은 발주는 애초에 400, 결제된 발주는 400. `reversePayment`·`applyReceipt` 호출 없음.

## 1. 구현 설계

### 1-1 서버 — 판정 함수 하나 (`utils/poOwnerApproval.js`)
```js
// 승인취소 가능 판정 — 라우트와 목록/상세 플래그가 **같은 함수**를 본다(검사와 수정은 같은 조건).
const REVOKABLE_EXTERNAL   = ['submitted','confirmed','shipped','in_transit','delivered']; // 받기 전 전부
const REVOKABLE_REGISTERED = ['submitted'];                                                // 판매자 확인 전
function canRevokeApproval(po, isExternal) {
  if (!po.approved_at)                       return { ok:false, code:'NOT_APPROVED' };   // 오너 승인을 거친 발주가 아니다(오너 본인 제출·승인 OFF 매장)
  if (po.payment_status === 'paid')          return { ok:false, code:'PAID' };
  if (['received','partial_received','closed'].includes(po.status)) return { ok:false, code:'RECEIVED' };
  const allowed = isExternal ? REVOKABLE_EXTERNAL : REVOKABLE_REGISTERED;
  if (!allowed.includes(po.status))          return { ok:false, code: isExternal ? 'BAD_STATUS' : 'SELLER_CONFIRMED' };
  return { ok:true };
}
```
export 추가. `isExternal` 은 기존 `utils/sellerNames.isExternalSeller(sellerMap, …)` 로만 구한다(새 판정 로직 금지).

### 1-2 서버 — 엔드포인트 `POST /purchase-orders/:id/revoke-approval` (`routes/purchase-orders-approval.js`, approve/reject 와 같은 모양)
- 가드: `authenticateToken + requireOwnerScope`, 트랜잭션 안 `findByPk(lock UPDATE, include items)` → `ownsPO` 아니면 404.
- `resolveSellers([locked])` → `isExternal` → `canRevokeApproval`. 실패면 400 `{ success:false, code, message }`(코드별 문구: NOT_APPROVED «This order did not go through owner approval» · PAID «Already paid — reverse the payment first» · RECEIVED «Goods already received — use the returns flow» · SELLER_CONFIRMED «The supplier has already confirmed this order» · BAD_STATUS 일반).
- body `reason` 선택(sanitizeString, 1000 자, 없어도 됨 — 반려와 달리 필수 아님).
- 갱신(한 update):
  ```js
  tracking = appendTrackingEvent(locked, 'pending_approval',
    `Approval revoked by Owner${reason ? ': ' + reason.slice(0,200) : ''}`, null,
    { approval_revoked:true, status_before: locked.status, approved_at_before: locked.approved_at,
      approved_by_before: locked.approved_by_user_id, by_user_id: req.user.id });
  await locked.update({ status:'pending_approval', approval_required:true,
    approved_at:null, approved_by_user_id:null, tracking_info: tracking }, { transaction:t });
  ```
  `submitted_at` 은 두고(정렬 기준 `poOrderedAt`, 재승인 때 덮어씀 — amend 게이트와 같음), `cancelled_*`·결제 칸 무접촉.
- 커밋 뒤: `emitPoEvent(req, po, 'seller-order-updated')`(pending 이라 판매자 룸은 서비스가 알아서 생략, 구매자 룸만) · `setImmediate` 통지 2건:
  - 가입 판매자만: 새 함수 `fireSellerApprovalRevokedNotification(po)` — `fireSellerAmendedByBuyerNotification` 과 같은 수신자 해석·`wrapTemplate` 'en'·카테고리 `seller_order_received`, 내용 «{buyer} withdrew purchase order {po} pending owner re-approval — do not fulfil it until it is re-sent.» 외부 공급업체면 호출하지 않는다(보낼 계정 없음).
  - 매장 작성자: `fireOwnerApprovalResultNotification(po, { revoked:true, reason })` — `poApprovalResultEmail` 에 `revoked` 변형 추가(«Owner revoked the approval of {po}; it is awaiting approval again» · 이미 WhatsApp 으로 보냈다면 공급업체에 알리라는 한 줄). 템플릿이 언어별이면 4개 언어 전부, 아니면 'en'.
- `approve`·`reject` 라우트는 **무변경** — 되돌린 발주가 그대로 그 둘로 이어진다.

### 1-3 서버 — 읽기 칸 2개 (`routes/purchase-orders-crud.js`)
- `GET /purchase-orders` 에 쿼리 `approved=1` → `approved_at IS NOT NULL AND status <> 'pending_approval'`(수정으로 다시 대기 중인 건 제외). 기존 status/from/to 와 `Op.and` 로 합친다. 오너 전체 보기(owner 실체)·한 매장 전환 둘 다 그대로 통과(buyerScope 변경 0).
- 목록 행·상세 응답에 `approval_revocable: boolean` 추가 = `canRevokeApproval(p, is_external).ok`(이미 계산된 `is_external` 재사용, 추가 쿼리 0). 화면은 이 플래그로만 버튼을 켠다(상태 목록을 프론트에 복사하지 않는다).

### 1-4 프론트
1. **탭 띠** `components/PurchaseOrders/OwnerPoTabs.tsx`(새 작은 컴포넌트, 오너만 렌더): 탭 2개 — «승인 전 (N)» → `/pos/owner/po-approvals` · «승인 후» → `/pos/purchase-orders/history?approved=1`. N 은 `/api/badge-counts` 의 `poApprovals`(MainLayout 이 쓰는 같은 주소) 또는 부모가 준 `pendingCount` prop. 공용 탭 스타일(RA 기준 — 기존 탭 컴포넌트가 있으면 그것, 없으면 PageComponents 계열) · 새 색 금지.
   - `OwnerPoApprovalsPage`: Header 아래에 띠(active='pending', pendingCount=rows 수). 표·승인·반려·«방금 승인» 띠는 그대로.
   - `PurchaseOrdersPage`: `isOwner` 일 때 Header 아래에 띠(active='approved'). 사이드바 Order History 로 들어와도 같은 띠가 보이고 «승인 후» 가 켜진 상태다(이력은 전부 승인 뒤 또는 승인 무관 발주).
2. **«승인 완료만» 토글**(`PurchaseOrdersPage`, 오너만, 기존 `owedOnly` 버튼과 같은 패턴): URL `?approved=1` 이면 초기 ON → `fetchList` 가 `approved=1` 을 보낸다. OFF 면 전체 이력. 오너 제출(승인 생략)·승인 OFF 매장 발주는 토글 OFF 에서만 보인다 — 보고에 한 줄 안내.
3. **승인취소 버튼** 두 자리(둘 다 `row.approval_revocable === true` 일 때만):
   - `PurchaseOrdersPage` 오너 행 액션(기존 «영수증 보기» 옆) — ThemedButton small `danger-outline`.
   - `PurchaseOrderDetailPage` `ownerView` 블록(기존 cancel 버튼 옆, 1184 근처) — 같은 조건 `detail.approval_revocable`.
   - 클릭 → `ConfirmDialog`(variant warning): 외부 «"{{po}}" 승인을 취소할까요? 발주는 승인 대기로 돌아갑니다. 이미 WhatsApp·이메일로 보냈다면 공급업체에 직접 알려 주세요.» / 가입 «… 승인 대기로 돌아가고 공급업체 앱에서 주문이 빠집니다(공급업체에 알림).» 사유 입력란 없음(선택 body 는 안 보냄).
   - 성공 → 목록 재조회(행이 승인 완료에서 빠짐) + 띠의 N 갱신. 실패 → 서버 `message` 를 AlertDialog 로(fetchAPI 가 본문을 버리므로 이 호출은 직접 fetch — 메모리 규칙).
4. 발주내역 상태 필터에 `pending_approval` 옵션 추가(한 줄 — 되돌린 발주를 이 화면에서 걸러 볼 수 있어야 한다).
5. i18n 4개 언어(`purchaseOrders.json`): 탭 2 · 토글 · 버튼 · 확인 제목/본문 ext·reg · 실패 문구. `npm run i18n:verify`.
6. 🔒 `MainLayout.tsx`·인쇄 보호파일·`buyerScope.js`·`poStatuses.js` **무접촉**. SW bump 는 프론트 확정 뒤 마지막 1회.

### 1-5 상태 전이·가능 목록 요약
| 공급업체 | 승인취소 가능 상태 | 불가(400 코드) |
|---|---|---|
| 외부 | submitted · confirmed · shipped · in_transit · delivered | partial_received/received/closed → RECEIVED · paid → PAID · approved_at 없음 → NOT_APPROVED |
| 가입 | submitted | confirmed 이후 → SELLER_CONFIRMED · 나머지 같음 |
결과 상태는 항상 `pending_approval`(approved_at/by 비움, 이전 값은 tracking 이벤트에 보존). 재고 이동 0 · 돈 이동 0 · 입고예정(on-order) 집계는 pending_approval 포함이라 변동 없음.

## 2. 하지 않는 것
- 승인 이력 전용 표·전용 엔드포인트·새 ENUM 값·새 DB 칸(`approval_revoked` 칸 없음 — tracking 이벤트가 기록) · 마이그 0.
- `PurchaseOrdersPage` 를 승인 화면 안에 끼워 넣기(이중 Container·사이드 패널 충돌) — 탭은 경로 이동.
- 결제된 발주의 승인취소(돈 되돌리기 포함) · 수령 뒤 승인취소 · 판매자 확인 뒤(가입) 승인취소 — 각각 기존 결제 되돌리기·반품·판매자 협의 흐름.
- 승인취소 때 cancel 처럼 상태를 `cancelled` 로 만들기 · `submitted_at` 비우기 · approve/reject/cancel 라우트 변경 · buyerScope OWNER_ACTING_ROUTES 변경(새 라우트는 approval 라우터에 있어 불필요).
- 매장(RA) 쪽에 승인취소 버튼(오너 전용) · 외부 공급업체에게 시스템 통지(계정 없음).
- 문서 갱신(`docs/PURCHASE_ORDER_SYSTEM.md` §G 에 «G-7 승인취소» 절)은 게이트 지문 때문에 **배포 뒤**.

## 3. Irene 에게 물을 것
**없음 — 권고안으로 진행 가능.** 끊긴 문장(가입 공급업체 타이밍)은 기존 cancel 경계와 같은 «판매자가 확인하기 전까지» 로 정했다. 완료 보고(✅)에 질문이 아니라 사실로 한 줄만: «가입 공급업체 승인취소는 공급업체가 확인하기 전까지로 했습니다(외부는 받기 전까지 전부). 다르게 원하시면 상태 목록 한 줄만 바꾸면 됩니다.»

## 4. 게이트에서 증명할 것 (health-check `pos` 영구 케이스로 — 기존 10-04 오너 픽스처(매장 38 임시 오너 + ext/reg 업체 + mk 헬퍼, 615~657줄) 재사용)
1. 외부 pending → approve(approved_at 찍힘) → revoke 200 · status pending_approval · approved_at null · tracking 마지막 이벤트 `approval_revoked:true, status_before:'submitted', approved_at_before` 있음 · `/pending-approval` 큐에 다시 보임 · `GET /purchase-orders?approved=1` 에서 빠짐 · `approved_at IS NOT NULL` 이던 행이 `approved=1` 에 있었음(전후 대조).
2. 가입: submitted → revoke 200 · 판매자 목록(`/seller-orders`)에서 사라짐 · confirmed 로 바꾼 뒤 revoke → 400 `SELLER_CONFIRMED`.
3. 외부: shipped → revoke 200 · received → 400 `RECEIVED` · payment_status=paid → 400 `PAID`.
4. 오너 본인 제출(approved_at null) → 400 `NOT_APPROVED` · 같은 발주 revoke 두 번 → 두 번째 400 `NOT_APPROVED`(멱등).
5. 남의 매장 발주 → 404 · RA 토큰 → 403(requireOwnerScope) · 익명 → 401.
6. 되돌린 발주 → approve 200 → submitted·approved_at 새로 찍힘 · 다른 하나는 reject 200 → draft.
7. **플래그=판정 동일성**: 목록 행 `approval_revocable:true` 인 것은 revoke 200, `false` 인 것(received·paid·confirmed-가입)은 전부 400 — 같은 함수임을 실호출로.
8. 무변경 증명: revoke 전후 `payment_status`·`paid_at`·재고 장부 행 수·`stock_items` 수량 동일(외부 shipped 케이스).
9. **고장주입 2건**(각각 pm2 restart 뒤, cp 원복 후 cmp): (a) `canRevokeApproval` 의 PAID 검사 제거 → 3번 paid 케이스가 200 되어 ✗ 검출 (b) 가입 목록을 외부 목록과 같게 바꿈 → 2번 confirmed 가 200 되어 ✗ 검출.
10. 기계: `check-sensitive-diff`(돈·주문 무결성 → Fable 게이트 대상 맞음) · `check-print-guard` 0 · `verify-all`; 프론트는 코드 전부 확정 → `build:dev` 1회 → `verify-all --full` 1회 · `i18n:verify` 0.
11. 클릭 흐름 1회(데모 오너 as=owner, 데모 매장에 `[확인용]` 외부 pending 발주 1건 만들어 승인): PO Approvals → 탭 «승인 후» → 이력에 «승인 완료만» ON 으로 그 행 · «승인 취소» → 확인 → 행이 빠지고 «승인 전» 탭 N 이 1 늘고 그 행이 다시 보임 · 상세 ownerView 에도 버튼 보임. 시험 데이터는 지우지 않는다.
12. 운영 DB 쓰기 0 · 데모 매장만.

Fable 검증 1회는 구현 뒤 위 11항 결과 숫자와 diff 를 그대로 넘겨 주면 판정한다.
