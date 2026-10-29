# Fable 설계 — 발주 내역 · 원가 대조 · 청구서의 결제 동선 정리 (2026-10-29)

> Irene 원문: «https://purplehere.com/pos/purchase-orders/history 여기도 Pay 버튼은 녹색으로 나오게 해줘. 그리고 인보이스 비교하고 토탈비용 바꾸는 곳 옆에 페이버튼 추가해줘. Confirm this total (lines later) 이 버튼 옆에. 그리고 리스트에서 페이했는지 안했는지도 좀 알게 필터 넣어줄래? 여기서 페이했다고 표시해도 인보이스에 동기화가 안되고 있어. 동기화해줘. 혹시 지금 구조 이상하면 오더히스토리에는 페이버튼 넣지 말고 인보이스에서 인보이스를 비교하는 거 여기서 할까? 오더히스토리는 말 그대로 히스토리이고 인보이스에서 인보이스 체크하고 가격 최종 확정하고 결제하는데 지금 왔다갔다 해야 해. 오너 역할도 마찬가지야. 제대로 검토해서 정리 좀 해줘. 처음에 말한 곳은 다 레스토랑관리자고 이 페이지 https://purplehere.com/restaurant/10/invoices»
> 입력: 팀원 실측 `~/.claude/jobs/b15040ba/tmp/fable-input.md`(운영 DB 읽기 전용) · 앞 판정 `docs/PURCHASE_ORDER_SYSTEM.md` §8-1·§8-3·§8-5(E-2′)·§8-6·§8-7 · `.claude/fable-design-20261009-invoice-page-actions.md`
> 이 판정은 코드를 읽어 확인한 사실과 팀원의 운영 읽기 실측만 근거로 한다. 제품 코드 수정·운영 쓰기 0.

## 0. 한 줄 결론
**구조는 바꾸지 않는다 — 어색한 자리는 «대조 화면» 하나다.** 결제 손은 이미 하나(`recordPayment`)이고 발주↔청구서 거울은 **양방향 모두 작동 중**이다(10-28 5건 전부 거울, 운영 어긋남은 09-11 이전 건 **PO 29 하나**). 청구서 화면(매장·오너·브랜드·푸드코트)은 10-09 로 올리기·보기·대조·총액 수정·«결제함»(초록)을 다 가졌다. 그런데 **«가격 확인»을 누르면 대조 화면으로 나가고, 거기엔 결제가 없고, 끝나면 발주로 돌아간다** — Irene 가 말한 «왔다갔다»의 실체다. 답은 발주 내역 Pay 를 빼는 것(B안)이 아니라 **대조 화면을 «확인 → 총액 확정 → 결제»가 한 자리에서 끝나는 정거장으로 만들고 청구서로 되돌아오게** 하는 것(A안)이다. 발주 내역 Pay 는 Irene 09-10 규칙(«선불로 결제하는 경우도 많아서 … 그냥 둬도 좋아») 그대로 두고 **색만 초록**으로. «동기화 안 됨»은 DB 거울 결함이 아니라 **PO 29 의 옛 어긋남을 Pay 로 누르면 409 가 뜨는 증상**이 가장 유력 — 멱등 마이그 1개로 닫고 409 문구를 사람 말로. 새 결제 경로 0 · 새 모달 0 · 새 DB 칸 0 · 권한 문 변경 0.

## 1. 실측으로 확정한 사실
1. **결제 = 한 손, 거울 = 양방향.** 발주 `/pay`·`/receive-and-pay` → `recordPayment` 가 같은 트랜잭션에서 연결 청구서를 paid 로(`services/purchaseOrderPayment.js` 160~172). 청구서 «결제함» `POST /invoices/:id/mark-paid-external` 도 연결 발주가 있으면 **같은 `recordPayment`** 를 부른다(`routes/invoices-payment.js` 423~447). 가입 판매자 쪽은 `handleInvoicePaid → mirrorPaidToPurchaseOrders`. 팀원 운영 읽기: 10-28 이체 5건(PO 174·156·36·99·117) 전부 청구서 paid·같은 초·총액 일치.
2. **운영에서 어긋난 행은 PO 29 하나**(PO-R10-20260904-001 · 발주 unpaid / 청구서 TRD-SUP28-20260908-001 paid 09-10 17:22Z) — 청구서→발주 거울을 모든 경로로 옮긴 09-11(§8-3 A-4) **이전** 건. 이 발주는 발주 내역에 Pay 가 보이고, 누르면 `recordPayment` A-3 검사가 **409 `ALREADY_PAID` «The linked invoice is already paid»** 를 돌려준다(의도된 방어). 화면은 그 영어 문구를 그대로 띄운다(`ReceivePayModal.tsx` 121). → 사람 눈엔 «여기서 페이해도 인보이스에 반영이 안 된다»로 읽힌다. **Irene 가 본 화면·건은 확인 못 함** — 운영 DB 로 재현되는 어긋남이 이것뿐이라 가장 유력한 원인으로 둔다.
   - 기각한 후보: 2초 GET 캐시(화면 이동 사이라 무관) · 사이드바 배지(15초 주기 자동 갱신 `MainLayout.tsx`) · 청구서 «연체» 표시(`isInvoiceOverdue` 는 `pending_payment` 만 — paid 를 연체로 안 그림).
3. **발주 내역 Pay 가 보라인 이유**: `PurchaseOrdersPage.tsx` 가 `components/Theme/ThemedButton`(styled.button · variant 목록에 `success` 없음)을 쓴다. 청구서 화면은 `LocalActionButton variant="success"`(#10B981) · 공용 `components/UI/Button` 에는 `success` 가 있다(`t.colors.status.successAlt`). 색 규칙 커밋 4df7f07bf «Pay·Confirm·Mark paid=초록».
4. **대조 화면(`InvoiceReconcilePage.tsx`)**: 결제 버튼 없음. 700행 도움말이 «실제로 지불한 뒤 청구서에서 결제함으로 표시» 라고 **다른 화면으로 보낸다.** `GET /purchase-orders/:id/reconcile` 응답(`cost-reconciliation.js` 99~118)에 `trade_invoice_id`·`payable_amount/basis`·`pay_via_soa`·`entity_type`·`payment_method`·`paid_at` 이 **없다**(payment_status·seller_is_external 은 있음). 돌아가기는 scopeQS 있으면 `navigate(-1)`, 없으면 발주 상세(307행). 청구서 창의 «가격 확인»은 `withTradeInvoiceScope` 로 항상 scope 를 붙이므로(`SupplierInvoiceTotalFix.tsx` 49~62 — 매장도 `restaurantId` 로 붙음) 청구서에서 들어온 사람은 -1 로 청구서로 돌아간다. 라우트에 오너 포함(App.tsx 1591, 10-09 §3-1).
5. **발주 내역 필터**: 상태 select · 업체 · 검색 · «개인금액 미정산» 토글 · (오너)승인됨. **결제 여부 필터·표시 없음** — 결제됨 여부는 «Reverse payment» 버튼이 보이는지로만 추정 가능. 서버 목록 라우트(`purchase-orders-crud.js` 234~293) 쿼리: status·seller_type·approved·from/to·receivable·limit(최대 100). `payment_status` 쿼리 없음 → 클라이언트 필터만 두면 100건 밖이 빠진다.
6. **오너**: 발주 내역에 Pay 없음(`!isOwner` — 10-05 설계: 수령·결제 403). 결제는 오너 청구서 화면 «Mark paid»(초록, 청구서 문). 오너 청구서 창에도 `TradeInvoiceActions` 네 버튼이 이미 있다(`OwnerInvoicesPage.tsx` 1228). **오너 흐름은 매장과 같은 조각이라 이번 변경이 그대로 적용된다.**
7. 문서 정정 1건: `TradeInvoiceActions.tsx` 머리 주석이 «§8-8» 을 가리키지만 `docs/PURCHASE_ORDER_SYSTEM.md` 에 §8-8 이 **없다**(grep 0건). 10-09 판정이 문서로 안 옮겨졌다.
8. 외부 공급업체 발주의 거래 청구서는 **수령 때** 발행된다(`purchaseOrderService.js issueTradeInvoiceAfterCommit when='received'`, 멱등). 수령 전 발주는 청구서가 없다 → 그때의 결제는 발주 내역 «Receive & pay» 길뿐이다(선불).

## 2. 판정 — Irene 질문 «발주내역 Pay 를 빼고 청구서에서 비교할까?»
- **A안(권고): 발주 내역 Pay 는 두고 초록 · 대조 화면에 결제를 넣고 청구서로 되돌아오게.** 근거 ①Irene 09-10 원문이 이미 «발주내역은 확인, 청구서는 결제, 발주내역 Pay 는 선불용으로 둬도 좋아»로 구조를 정했고 서버·청구서 화면은 그 구조대로 완성돼 있다 ②수령 전 선불은 청구서가 아직 없어 **발주 내역에서만** 낼 수 있다(사실 8) — Pay 를 빼면 선불 길이 사라진다 ③«왔다갔다»는 대조 화면이 결제를 못 하고 발주로 돌아가는 **한 자리**의 문제라 그 자리만 고치면 된다 ④되돌리기 쉬운 선택(버튼 노출)이라 ⏸ 로 세우지 않는다.
- B안(발주 내역 Pay 제거): 선불 길 상실 + 09-10 결정 번복. 기각. Irene 가 그래도 B 를 고르면 `PurchaseOrdersPage` 의 Pay 분기 1줄 숨김으로 끝난다(되돌리기 쉬움).
- 「인보이스 비교하고 토탈비용 바꾸는 곳」 = 대조 화면(«Confirm this total (lines later)»)이다. 청구서 창의 작은 «총액 수정» 창은 같은 창 footer 에 «결제함»이 이미 있으므로 손대지 않는다.

## 3. 절단면 (구현 범위 — 이 밖은 건드리지 않는다)

**R-1 발주 내역 Pay 초록.** `PurchaseOrdersPage.tsx` 의 «Pay» / «Receive & pay» 두 버튼만 공용 `components/UI/Button variant="success" size="small"`(이미 import 돼 있음)으로 바꾼다. `Theme/ThemedButton` 에 variant 를 새로 더하지 않는다(디자인 규칙 2 — 공용 Button). «개인금액 정산»(상환) · «Receive all» 은 그대로. **실측 의무**: `UI/Button` success 색 토큰(`status.successAlt`)이 청구서 `LocalActionButton success` #10B981 과 같은지 grep 으로 확인하고 다르면 토큰 쪽에 맞춘다(인라인 hex 금지).

**R-2 발주 내역 결제 필터 + 표시 (매장·직원·오너·브랜드·푸드코트 공통 — 같은 화면).**
- 필터: 상태 select 옆에 «Payment» select — 전체 / 미결제(unpaid) / 결제됨(paid) / 되돌림(refunded). URL 쿼리 `payment_status` 로 서버에 보낸다. 서버 `GET /api/purchase-orders` where 에 1줄(ENUM 세 값만 허용, 다른 값 400 `INVALID_PAYMENT_STATUS`). «개인금액 미정산» 토글은 그대로(결제됨의 부분집합).
- 표시: 상태 칸(StatusBadge) 아래 작은 줄 — «Paid · Bank transfer · 10/28» / «Unpaid» / «Refunded». 초안·취소·승인대기 행엔 안 찍는다. 월결제 행의 «Monthly · SOA» 문구는 유지. 모양은 그 화면의 기존 EXT 배지와 같은 패턴(새 로컬 styled 금지 — design-guard). 날짜는 매장 타임존(`formatDate`).
- 오너 화면은 같은 컴포넌트라 자동 적용. 오너의 매장 전환(`entity_type/entity_id`)과 함께 보내도 서버 where 는 독립.

**R-3 대조 화면에 결제 — «Confirm this total (lines later)» 바로 옆에 초록 «Record payment».**
- **뜨는 조건** = `po.seller_is_external && po.trade_invoice_id && status ∉ {draft, cancelled, pending_approval} && payment_status !== 'paid' && !pay_via_soa`. 이 화면의 결제는 **청구서 문 하나**(`ReceivePayModal` mode `pay` + `invoiceId` → `mark-paid-external`) — §8-5 E-2′ 규칙 그대로라 **매장·직원·오너·둘째 브랜드가 같은 길**(권한 = 청구서 payer, 스코프 쿼리 불필요). 발주 문(`/pay`)은 이 화면에서 쓰지 않는다 — 오너 403·둘째 브랜드 404 를 다시 만들지 않기 위해.
  - 청구서가 아직 없으면(수령 전) 버튼 대신 회색 한 줄: «Receive the order first — pay from Order history (Receive & pay) or from Invoices after receiving.» 선불 길은 발주 내역 그대로.
  - `payment_status === 'paid'` 면 버튼 대신 «Paid · 수단 · 날짜» 한 줄(기존 «Already paid — confirming also corrects the paid amount» 안내는 그대로 아래에).
  - `pay_via_soa` 면 «Monthly · SOA» 문구(발주 내역과 같은 키).
  - 가입 공급업체(`seller_is_external=false`)는 버튼·문구 없음(그쪽 청구서는 기존 Pay → submit-payment 경로, 이 화면 밖).
- **순서 안내(막지 않는다)**: 총액 칸에 값이 있는데 아직 확정 전이거나(`!invoice_reconciled_at`) 적은 값이 저장된 `invoice_total` 과 다르면 버튼 옆 작은 글씨 «Confirm the total first so the payment uses the invoice amount.» 모달은 이미 `payable_basis` 로 «Supplier invoice RM X / Ordered RM Y» 를 보여 준다. 선불 허용 규칙(§8-3 B-4)대로 확정 전 결제도 열어 둔다.
- 모달에 `onGoReconcile` 을 넘기지 않는다(여기가 대조 화면). `onDone` → `load()` 로 다시 그림 + `drawerSkipped` 면 발주 내역과 같은 안내.
- **서버**: `GET /purchase-orders/:id/reconcile` 응답 `purchase_order` 에 6칸 추가 — `trade_invoice_id` · `payable_amount` · `payable_basis`(`payableFrom(po, sellerIsExternal)` — §8-1 단일 소스, 화면 재계산 금지) · `pay_via_soa`(목록 라우트가 쓰는 같은 판정 `utils/payViaSoa`) · `payment_method` · `paid_at`. 새 DB 칸 0.
- **돌아가기**: 버튼 문구를 «Back»(청구서에서 왔으면 «Back to invoices», 발주에서 왔으면 «Back to order»)로 — 판정은 기존 `scopeQS` 유무 그대로(307행), 로직 변경 없음. 700행 도움말의 «청구서에서 결제함으로 표시합니다» 는 «여기서 바로 결제를 기록할 수 있습니다» 로 고친다.

**R-4 «동기화 안 됨» 처리.**
- ①데이터: 멱등 마이그 `dev-backend/scripts/migrate-po-payment-mirror-backfill.js` — `mirrorPaidToPurchaseOrders` 와 같은 의미를 SQL 로: `UPDATE purchase_orders po JOIN invoices i ON i.id = po.trade_invoice_id SET po.payment_status='paid', po.paid_at=COALESCE(i.paid_at, po.paid_at, NOW()), po.payment_method=COALESCE(po.payment_method, i.payment_method) WHERE po.payment_status='unpaid' AND i.status='paid' AND po.deleted_at IS NULL AND po.status <> 'cancelled'`. `refunded` 는 건드리지 않는다(되돌린 결제를 되살리면 안 됨 — 기존 규칙). 드로어 이동은 만들지 않는다(09-10 결제의 수단을 알 수 없고, 거울 규칙도 드로어 없음). `scripts/migrations.registry.json` **`deploy`** 분류 — 매 배포 재실행이라 앞으로 생기는 드리프트도 배포마다 닫힌다. 운영에서는 1행(PO 29)이 바뀐다 — **운영 쓰기는 Irene «/배포» 때 배포 루프가 실행**(별도 지시 불필요, 보고에 1행 명시). 실행 로그에 바뀐 발주 번호를 찍는다.
- ②문구: `ReceivePayModal` 의 오류 분기에 `ALREADY_PAID` 1개 추가 — «This order's invoice is already marked paid, so it was not charged again. Refresh the list — the order will show as paid.»(4언어). 서버 코드 변경 없음.
- ③확인: Irene 가 본 번호가 PO-R10-20260904-001 이 아니면 그 건을 운영 읽기로 다시 실측(§5 질문).

**R-5 하지 않는 것.** 발주 내역 Pay 제거 안 함 · 청구서/대조 화면에 Reverse payment 추가 안 함(§8-3 «되돌리기는 발주 화면 하나») · 새 모달·새 결제 라우트·새 DB 칸 0 · `buyerScope`·`checkPaymentPermission`·`recordPayment` 무접촉 · 브랜드·푸드코트 청구서 화면 무변경(같은 조각) · 🔒 인쇄·KDS 보호파일 무접촉 · `Theme/ThemedButton` 무변경.

## 4. Irene 결정 — 되돌리기 어려운 선택은 없다
- Irene 가 직접 물은 «발주내역 Pay 를 뺄까» → **Fable 권고: 두되 초록(A안)**. 이유는 §2. B 로 바꾸는 것은 1줄이라 ⏸ 로 세우지 않고 A 로 진행한다.
- 운영 1행(PO 29) 바로잡기 → 배포 때 마이그로(권고). 지금 당장 고치려면 운영 접속이 필요한 Irene 할 일이지만, 그 전까지 Irene 가 보는 증상은 409 문구뿐이라 배포까지 기다려도 손해가 없다.
- **사실 확인 질문 1개(답 없어도 진행):** **«동기화 안 됨» 을 본 발주가 PO-R10-20260904-001 (2026-09-04 발주 · 청구서 TRD-SUP28-20260908-001) 이었나요, 아니면 다른 발주 번호인가요?** — 다른 번호면 팀원이 그 건을 운영 읽기로 실측해 이 문서에 추가한다.

## 5. 구현 순서 (팀원)
1. 서버: 목록 라우트 `payment_status` where 1줄 + 400 · reconcile GET +6칸 · 마이그 + 레지스트리 `deploy` 등록.
2. 프론트(코드 전부 확정 뒤 빌드 1회): `PurchaseOrdersPage`(R-1 두 버튼 · R-2 select + 표시) · `InvoiceReconcilePage`(R-3 버튼·상태 문구·돌아가기 문구·도움말) · `ReceivePayModal`(R-4 ② 오류 분기 1개) · i18n `purchaseOrders` 4언어 + `npm run i18n:verify`.
3. 빌드 1회 → `verify-all --full` 1회 → §6 → `check-sensitive-diff`(돈 경로 응답·마이그 → 게이트 대상) → **Fable 게이트 판정 1회**. SW bump 는 프론트 변경이 다 끝난 뒤 마지막 1회.
4. 문서(배포 뒤 — 게이트 지문): `docs/PURCHASE_ORDER_SYSTEM.md` 에 **§8-8**(10-09 청구서 창 네 가지 일 — 아직 없음, 판정 파일 요지 옮김) + **§8-9** «결제 동선 정리 2026-10-29»(이 문서 §0·§3). `TradeInvoiceActions.tsx` 주석의 §8-8 참조가 그제야 맞는다.

## 6. 검증 기준 (기계 게이트 + 반증 — 코드 리뷰만으론 통과 아님)
health-check(픽스처는 기존 `makeExternalPoReceived`·§8-3 ③ «청구서만 paid» 픽스처 재사용, 임시 계정 @example.com, 데모 매장만):
- **T1 결제 필터**: `GET /purchase-orders?payment_status=paid` 행 전부 `payment_status==='paid'` · `=unpaid` 전부 unpaid · `=nope` → 400 `INVALID_PAYMENT_STATUS`.
- **T2 단일 소스**: 같은 발주를 목록 라우트와 `GET …/reconcile` 로 읽어 `payable_amount`·`payable_basis`·`pay_via_soa`·`trade_invoice_id` 가 **일치**(총액 확정 전·후 각 1회 — 후에는 basis `supplier_invoice`).
- **T3 마이그 멱등**: «청구서 paid · 발주 unpaid» 픽스처 → 마이그 실행 → 발주 paid · `paid_at` = 청구서 `paid_at` · `cash_movements` 0행 → 재실행 변경 0행 · `refunded` 픽스처 불변 · 청구서 `pending_payment` 인 unpaid 발주 불변.
- **T4 대조 화면 결제 = 청구서 문**: 외부 발주 수령 → 총액 확정(`total_only`) → `mark-paid-external`(bank_transfer) 200 → 발주 paid · 청구서 paid · `paid_amount` = 확정 총액 · 재시도 409. **오너**(`restaurant_id` NULL · 소유 매장) 같은 호출 200(기존 §8-5 ③ 재사용으로 충분하면 중복 작성 금지).
- **고장주입 3종(의무 · pm2 restart 뒤 · 보고에 재시작 여부)**: ①목록 where 의 `payment_status` 줄 제거 → T1 `paid` 단언 실패 ②마이그 WHERE 의 `i.status='paid'` 제거 → T3 «pending_payment 발주 불변» 실패 ③reconcile GET 의 `payable_amount` 를 `total_amount` 로 바꿈 → T2 확정 후 단언 실패.
- **실브라우저(빌드 1회 뒤, 데모 38)**: ⓐ발주 내역 Pay·Receive & pay 의 computed background 가 초록 토큰(#10B981 또는 맞춘 토큰) ⓑ결제 select 3값으로 행이 바뀜 + 행마다 Paid/Unpaid 줄 ⓒ청구서 → «Check prices against invoice» → 대조 화면 → 총액 입력 → Confirm → 옆 «Record payment» 모달에 «Supplier invoice» = 확정 총액 → 결제 → 화면 «Paid · …» → Back 이 **청구서 목록**으로 → 그 청구서 Paid · 발주 내역 Paid ⓓ오너(demo-owner, 매장 2·3 중 외부 발주 픽스처) 오너 청구서 → 대조 → Record payment 200 ⓔ«청구서만 paid» 픽스처 발주에서 Pay → 사람말 409 문구(ko/en) ⓕ수령 전 외부 발주의 대조 화면엔 버튼 없이 안내 한 줄.
- `check-print-guard` 0건 · `check-design-guard`(새 로컬 styled 0) · `check-sensitive-diff` → 게이트 · `npm run i18n:verify` · 미커밋 변경(tracking.ts·index.html 등 마케팅 추적) 덮어쓰지 않고 그 위에.

## 7. 이 판정이 안 다루는 것 (기록)
가입 판매자 청구서의 결제 흐름(submit → confirm) · 대조 화면의 AI 판독(§8-6 C, Irene 결정 대기) · Staff 의 청구서 결제 권한(기존 백로그) · 오너 선불(수령 전 결제 — 10-05 «수령·결제 403» 그대로) · 발주 목록 행에 청구서 상태를 싣는 것(마이그가 닫으므로 불필요).
