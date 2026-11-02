# Fable 설계 판정 — 직영점 납품 «결제 필요 없음» (2026-11-02 · design)

사실: `/var/www/.claude/fable-facts-20261102-direct-store-billing.md` (Irene 원문 · 개발 DB 실측 · 코드 위치).
Fable 이 직접 읽은 것: `services/purchaseOrderService.js` resolvePaymentTerms/createTradeInvoice · `utils/paymentTerms.js` · `routes/entity-billing.js` · `services/purchaseOrderPayment.js`(recordPayment/mirrorPaidToPurchaseOrders/reversePayment) · `routes/invoices-payment.js` mark-paid-external(SOA 묶음 결제) · `services/soaScheduler.js`·`invoiceOverdueScheduler.js` 필터 · `routes/brand-revenue.js` · `routes/badgeCounts.js` · `utils/invoicePayable.js` · `routes/purchase-orders-crud.js` checkCreditLimit · `models/PurchaseOrder.js`(payment_method ENUM) · `models/Invoice.js`(status ENUM · payment_method STRING(50)) · `components/Billing/BillingTermsModal.tsx`(formatTermsSummary 포함) · `pages/PurchaseOrders/PurchaseOrdersPage.tsx` 결제 줄 · `docs/BG_FG_TRADE_BILLING.md`.

---

## 0. 판정 요지

**«직영 = 브랜드↔매장 결제조건의 한 종류»로 둔다. 새 개념(직영 플래그·새 상태·새 목록)을 만들지 않는다.**

- `Restaurant.brand_billing_terms.terms = 'INTERNAL'` (푸드코트 쪽 `foodcourt_billing_terms` 도 같은 검증기를 쓰므로 함께 열린다 — 코드가 같아 비용 0).
- 거래 청구서는 **지금처럼 발행하되 처음부터 `status='paid'`**, `payment_method='internal'`, `due_date=NULL`. 발주도 `payment_status='paid'`, `payment_method='internal'` 로 거울.
- 그러면 «미지급 알림» 6갈래(연체 전환·메일 / 사이드바 배지 / 오너·대시보드 미지급 합계 / 결제 버튼 / SOA / 신용한도)는 **전부 상태 목록을 그대로 둔 채** 자연히 빠진다. 통계(brand-revenue = 발행 청구서 원장 · sales-report = 발주)는 그대로 잡힌다. 주문 목록·금액도 그대로.
- 운영의 기존 미지급 건은 **BG 가 Billing 모달에서 INTERNAL 로 저장한 뒤 «열린 청구서 N건 내부정산 처리» 버튼을 눌러** 정리한다(명시 행동 1회 · 자동 정리 금지). 운영 id 하드코딩 마이그는 쓰지 않는다.

### 기각한 대안
| 대안 | 기각 이유 |
|---|---|
| B. 직영점은 청구서를 아예 안 만든다 | brand-revenue 진실원장이 «브랜드 발행 청구서»라 매출 통계에서 빠진다. health-check·리포트의 «청구서 없는 수령 발주» 경고에도 잡힌다. Irene «통계는 다 되어야 해» 위반. |
| C. `Invoice.status` 에 `'internal'` 추가 | 상태 목록을 읽는 곳이 백엔드만 10곳+(badge·to-pay·overdue·SOA·credit·PAYABLE·DEAD/PAID·owner·dashboard) + 프론트 상태 맵. 파급이 크고 하나만 빠뜨려도 또 «미지급»으로 샌다. |
| D. `Restaurant.is_direct_store` 같은 매장 플래그 | 같은 개념(«브랜드가 이 매장을 어떻게 청구하는가»)의 두 번째 자리 = CLAUDE.md «기존 개념에 새 목록·경로 금지». 결제조건 JSON 이 이미 그 자리다. 또 직영 여부는 «브랜드↔매장 쌍» 속성이지 매장 단독 속성이 아니다(brand_id 가 바뀌면 같이 끝나야 한다 — brand_billing_terms 는 resolvePaymentTerms 가 `r.brand_id === seller` 일 때만 읽으므로 이 성질이 공짜로 따라온다). |
| E. 저장 즉시 기존 미지급 건 자동 정산 | 되돌릴 길이 없는 변경(paid→미수 복귀 경로 없음)이 클릭 한 번에 일어난다. 명시 버튼 + 확인창(기존 «Generate now» 패턴)으로. |

---

## 1. 데이터·규칙

### 1-1. 결제조건 스키마 (`utils/paymentTerms.js`)
- `VALID_PAYMENT_TERMS` 에 `'INTERNAL'` 을 **더하지 않는다**. 대신 `validatePaymentTerms(pt, { allowInternal = false } = {})` 옵션을 두고, `allowInternal` 일 때만 `terms === 'INTERNAL'` 통과. **`routes/entity-billing.js`(브랜드·푸드코트) 만 `{ allowInternal: true }`** 를 넘긴다. `routes/supplier.js` 두 호출부는 손대지 않는다 → 공급업체 계약에 INTERNAL 을 넣으면 400 (이유 문구: `INTERNAL is only for brand/foodcourt-operated stores`).
- `buildPaymentTerms`: INTERNAL 이면 `invoice_cycle='immediate'` 강제 · `payment_due_day=null` · `soa_issue_day=null` · `credit_limit=null`. `invoice_trigger`(입고 시/확정 시) · `currency` · `notes` 는 그대로 둔다(발행 시점은 직영이어도 의미 있음).
- 헬퍼 1개 추가·export: `isInternalSettlement(terms) → terms?.terms === 'INTERNAL'`. **직영 판정은 이 함수 하나만 쓴다**(백엔드 전부).

### 1-2. 청구서 발행 (`services/purchaseOrderService.js` createTradeInvoice)
- `const internal = !alreadyPaid && isInternalSettlement(paymentTerms);`
  - `alreadyPaid`(발주를 현금 등으로 이미 냈음)가 우선 — 돈이 실제로 나갔으면 그 기록이 1차 원장(기존 규칙).
- internal 이면: `status:'paid'`, `paid_amount: total`, `paid_at: issuedAt`(배송 완료일 = 발행일 — 청구서가 생기는 순간 정산된 것으로 보므로 발행일과 같게), `payment_method:'internal'`, `payment_notes:'Internal settlement — brand-operated store, no payment required'`, `due_date: null`.
- finalize 뒤 `paid_amount` 를 청구서 총액으로 맞추는 기존 블록은 `if (alreadyPaid || internal)` 로 일반화(복제 금지).
- 발주 거울: 기존 `fullPo.update({ trade_invoice_id })` 자리에서 internal 이고 `fullPo.payment_status === 'unpaid'` 이면 `payment_status:'paid', payment_method:'internal', paid_at: issuedAt` 을 같이 쓴다. `recordPayment` 는 쓰지 않는다(결제수단 검증·드로어·409 가 모두 «돈이 움직이는 결제» 전제).
- ⚠ 이 파일에는 다른 방의 미커밋 변경(deliveredAtOf)이 있다 — **Edit 로 해당 줄만** 고친다. checkout/reset/파일 통째 Write 금지. 작업 전 `.claude/session-state.md` 로 그 방이 끝났는지 확인, 진행 중이면 기다린다.

### 1-3. 발주 결제수단 ENUM 확장 (`models/PurchaseOrder.js` + 마이그)
- `payment_method ENUM('cash','bank_transfer','card','personal')` → `'internal'` 추가. 마이그 `scripts/migrate-po-payment-method-internal.js` = `expandEnum(sequelize,'purchase_orders','payment_method',['internal'])` 만(자기 값만 · expand-only), `migrations.registry.json` `deploy` 에 등록.
- `purchaseOrderPayment.PAYMENT_METHODS` 는 **그대로**(사람이 고를 수 없는 값 — 결제조건에서만 파생).
- `reversePayment`: `po.payment_method === 'internal'` 이면 `err('Internal settlement cannot be refunded','INTERNAL_SETTLEMENT',400)`. 환불하면 청구서가 pending_payment 로 되살아나 다시 «미지급»이 되는 뒷문을 막는다(돈이 안 움직였으니 환불이 성립하지 않음).
- `mirrorPaidToPurchaseOrders(invoiceIds, paidAt, t, { method } = {})` 로 옵션 1개 확장 — 1-4 가 `method:'internal'` 로 쓴다. 기존 호출부는 무변경.

### 1-4. 기존 열린 청구서 정리 (명시 행동)
- `POST /api/brand/restaurants/:id/billing-terms/settle-internal` (+ `/api/foodcourt/...` 같은 패턴, `routes/entity-billing.js`). 인증·범위는 PUT 과 동일(`requireBrandScope`/푸드코트 scope · 남의 매장 404).
- 선행조건: 저장된 조건이 INTERNAL 이어야 함 — 아니면 **409 `NOT_INTERNAL`**.
- 한 트랜잭션에서, 쌍(issuer_type/issuer_id = 브랜드·푸드코트, payer_type='restaurant', payer_id=매장) 의 `status IN ('pending_payment','overdue','payment_submitted')` 청구서 중:
  1. `invoice_category='trade' AND parent_soa_invoice_id IS NULL` → `paid / paid_amount=total / paid_at=now / payment_method='internal' / payment_notes`.
  2. `invoice_category='soa'` → 같은 값으로 paid + **`syncSoaChildren(soa,'paid',{transaction, actorId, at})`** 호출(메모리 «SOA 상태 = soaChildSync — 새 길도 반드시 호출»). 자식 trade 는 여기서 따라가므로 1 에서 제외돼 있다.
  3. 발주 거울: `mirrorPaidToPurchaseOrders(모든 paid 된 trade id, now, t, { method:'internal' })`.
- 응답: `{ success, data: { invoices, soa, purchase_orders, total_amount } }`. 두 번째 호출은 0 건(멱등). 메일·알림 없음(handleInvoicePaid 는 부르지 않는다 — 구독 복구·추천 보상은 trade 와 무관, 발주 거울은 이미 함).
- `GET .../billing-terms` 응답에 저장 조건이 INTERNAL 일 때만 `open_invoices: { count, amount }`(위 1·2 와 **같은 where**) 를 덧붙인다 — 모달이 버튼 옆에 «N건 · RM X» 를 보여 준다(검사와 수정은 같은 조건).

### 1-5. 건드리지 않는 것 (상태 목록 무접촉이 이 설계의 핵심)
`badgeCounts.js` · `owner.js` · `dashboard.js` · `invoiceOverdueScheduler.js` · `soaScheduler.js` · `brand-soa.js` · `purchase-invoices.js` · `payViaSoa.js` · `invoicePayable.js` · `checkCreditLimit` · `brand-revenue.js` · `routes/supplier.js` · 🔒 인쇄/KDS 파일 · `BrandReportsPage.tsx`·`BrandPerformance.tsx`(다른 방 미커밋).
- 통계 영향 확인: brand-revenue 는 `paid` → invoiced=paid=금액, outstanding 0 으로 잡힌다(= «받은 것»). sales-report 는 발주 기준이라 무영향. 직영을 리포트에서 **따로 보는 것**은 기존 매장 체크박스로 이미 가능. 리포트 행에 «내부정산» 꼬리표를 붙이는 것은 그 화면을 고치는 방이 끝난 뒤 후속(작고 되돌릴 수 있음 — Fable 불필요).

---

## 2. 화면

### 2-1. `components/Billing/BillingTermsModal.tsx`
- Payment Terms 선택지에 `INTERNAL` 추가: `billing:terms.INTERNAL` = «Internal — brand-operated store (no payment)». 선택 시 Invoice Cycle·Due Day·Issue Day·Credit Limit 칸 숨김, Issue-invoice-when(트리거)·Currency·Notes 는 유지. 저장 payload 는 1-1 대로 서버가 정규화하므로 프론트는 숨긴 값만 안 보내면 된다.
- 저장된 조건이 INTERNAL 이면 «Generate now» 자리 패턴으로: `open_invoices.count > 0` 일 때 «Settle N open invoices (RM X) as internal» 버튼 + `window.confirm`(되돌릴 수 없음 문구) → `POST .../settle-internal` → 결과 줄(«N invoices · M orders marked paid (internal)») → `onSaved` 로 목록 갱신. 0 건이면 «No open invoices» 한 줄.
- `formatTermsSummary`: INTERNAL 이면 `Internal · no payment`(+ `invoice on confirm`). `RestaurantsPage.tsx` 는 이 함수를 쓰므로 무변경.
- i18n: `billing.json` 4언어(`terms.INTERNAL`, `internal.settleAction`, `internal.confirm`, `internal.result`, `internal.none`), `purchaseOrders.json` 4언어 `pay.method.internal` = «Internal»(발주 목록 «Paid · Internal · 날짜» 줄).

### 2-2. 알려진 빈틈(이번 범위 밖 · 보고에 한 줄)
- 직영 매장에서 입고 전 «Receive & Pay» 로 **현금**을 고르면 드로어에서 돈이 나가고 청구서는 cash 로 paid 가 된다(alreadyPaid 우선). 직영에서 그 버튼을 숨기는 것은 발주 목록 API 에 `pay_via_soa` 같은 꼬리표를 하나 더 내려야 해서 다음 묶음. 이번 설계로는 입고(또는 확정 발행)만 하면 자동으로 «Paid · Internal» 이 찍혀 Pay 버튼이 사라진다.

---

## 3. 바꿀 파일

| # | 파일 | 변경 |
|---|---|---|
| 1 | `dev-backend/utils/paymentTerms.js` | `allowInternal` 옵션 · INTERNAL 정규화 · `isInternalSettlement` export |
| 2 | `dev-backend/routes/entity-billing.js` | PUT 2곳 `{allowInternal:true}` · GET 에 `open_invoices` · `POST .../settle-internal` 2개(브랜드·푸드코트, 공통 함수 1개) |
| 3 | `dev-backend/services/purchaseOrderService.js` | createTradeInvoice internal 분기 + 발주 거울 (**Edit 로 줄 단위** · 다른 방 변경 보존) |
| 4 | `dev-backend/services/purchaseOrderPayment.js` | `reversePayment` internal 400 · `mirrorPaidToPurchaseOrders` `{method}` 옵션 |
| 5 | `dev-backend/models/PurchaseOrder.js` | payment_method ENUM `'internal'` |
| 6 | `dev-backend/scripts/migrate-po-payment-method-internal.js` (신규) + `scripts/migrations.registry.json` deploy 등록 | expandEnum 자기 값만 |
| 7 | `dev-backend/scripts/health-check.js` | §4 케이스 추가 (**Edit 로 append** · 다른 방 미커밋 보존) |
| 8 | `dev-frontend/src/components/Billing/BillingTermsModal.tsx` | 2-1 |
| 9 | `dev-frontend/public/locales/{en,ko,zh,ms}/billing.json` · `purchaseOrders.json` | 키 추가 |
| 10 | `docs/BG_FG_TRADE_BILLING.md` | «INTERNAL 결제조건 (2026-11-02)» 절 · `docs/INVOICE_SYSTEM.md` §3.1 에 «internal = 발행 즉시 paid» 한 줄 |
| — | `dev-frontend/public/sw.js` | 프론트 변경이 다 끝난 뒤 마지막에 1회 bump (이미 다른 방이 올렸으면 그대로) |

---

## 4. 검증 (기계로 가르는 것 — Opus 가 돌리고 숫자로 남긴다)

health-check `trade`(또는 기존 billing 카테고리)에 영구 케이스로 넣는다. 데모 매장만(39 또는 38 · 그 매장의 데모 브랜드), **시작 전에 원래 brand_billing_terms 를 읽어 두고 끝에 원복**(메모리 «설정 바꾸는 검사는 원본 먼저»).

1. **조건 저장** — BG 시험 계정으로 PUT INTERNAL(+monthly_soa·credit_limit 섞어 보냄) → 200, 저장값 `invoice_cycle='immediate'`, `credit_limit=null`, `payment_due_day=null`, `invoice_trigger` 보존. 공급업체 계약 PUT INTERNAL → 400. 남의 브랜드 매장 → 404. 익명 401.
2. **발행** — 데모 브랜드 판매 발주 1건 생성→제출→확정→수령 → `createTradeInvoice` 결과: `status='paid'`, `payment_method='internal'`, `due_date=null`, `paid_amount === total_amount`(finalize 뒤 값), `paid_at === issued_at`; 발주 `payment_status='paid'`, `payment_method='internal'`. 같은 발주로 두 번 불러도 청구서 1장(멱등).
3. **알림 길 6개가 조용한가** — 그 매장 RA 토큰으로 `/api/badge-counts` invoices 가 발행 전후 같음 · `/api/invoices/to-pay` 에 없음 · 연체 스케줄러 후보 쿼리(`pending_payment AND due_date < today`) 0건 · 신용한도 outstanding 합에 미포함 · `gatewayPayableError` → 409 ALREADY_PAID · SOA current 에 없음.
4. **먼저 낸 발주 우선** — 같은 조건에서 receive-and-pay(cash) → 청구서 `payment_method='cash'`(internal 아님).
5. **정리 버튼** — 조건을 잠시 NET_15 로 두고 발주 1건 수령(→ pending_payment 청구서) → 조건 INTERNAL 저장 → GET `open_invoices.count=1` → POST settle-internal → `{invoices:1, purchase_orders:1}` · 청구서 paid/internal · 발주 paid/internal → 두 번째 POST → 0 · 조건 NET_15 상태에서 POST → 409 · 익명 401 · 남의 매장 404. SOA 가 있는 쌍은 데모에서 만들기 무거우면 «확인 못 함» 으로 적고 코드 경로만 명시(syncSoaChildren 호출 줄 번호).
6. **환불 차단** — internal 발주 `POST /purchase-orders/:id/refund` → 400 INTERNAL_SETTLEMENT.
7. **고장주입 1회** — 3 의 `internal` 분기를 주석 처리하고 2 가 실제로 실패하는지(pending_payment 로 나오는지) 본 뒤 원복. 백엔드만이라 빌드 불필요.
8. 게이트: `check-enum-parity`(새 ENUM 값) · `check-migration-registry` · `verify-all`; 프론트는 변경 확정 후 **`build:dev` 1회 → `verify-all --full` 1회** · `npm run i18n:verify`. `check-print-guard` 변경 0.
9. 통계 대조: 2 의 발행 뒤 `/api/brand/revenue-report`(해당 브랜드·매장) product_sales.invoiced/paid 가 금액만큼 늘고 outstanding 0 · `/api/brand/sales-report` 에 그 발주가 잡힘.

Fable 미사용 항목: 문구·칸 숨김·색은 실브라우저로 Opus 가 본다.

---

## 5. 운영의 기존 미지급 건

- 마이그로 데이터는 만지지 않는다(운영 매장 id 를 이 방에서 못 보고, «어느 매장이 직영인가» 는 BG 가 정하는 값이다).
- 배포 뒤 **Irene 할 일 1건**(상황판 `/api/todos`): «GIT Consulting 브랜드 계정 → Restaurants → with MIN Cafe → Billing → Payment Terms = Internal → Save → ‹Settle N open invoices as internal› 누르기». `check:true` 로 올리고 `then` 은 «운영 badge/연체 메일이 더 안 오는지 다음 아침 점검에서 확인».
- 마이그는 §1-3 ENUM 확장 1개뿐(deploy 목록 · 멱등).

---

## 6. Irene 에게 물을 것 — 없음

Irene 원문이 요구사항을 다 정한다(«결제할 필요 없음» + «금액·주문리스트·통계는 다»). 되돌리기 어려운 선택(기존 미지급 건을 paid 로 바꾸는 것)은 Irene 본인이 버튼으로 실행하게 설계했으므로 지금 묻지 않는다. 바로 구현.

## 7. 끝난 뒤 Fable 게이트 — 필요 (1회)

돈·주문 무결성(청구서 생성 상태·발주 결제 거울·환불 차단) + 운영 ENUM 마이그 = 공용 기준 `gate` ①②③. `check-sensitive-diff.js` 도 대상으로 분류할 것이다. 게이트에서 볼 것: diff 범위(§3 밖 변경 0 · 다른 방 미커밋 보존) · §4 숫자 · 마이그 멱등·롤백(ENUM 은 expand-only 라 롤백 불필요).
