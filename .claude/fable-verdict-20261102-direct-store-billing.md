# Fable 게이트 판정 — 직영점 납품 «결제 필요 없음» INTERNAL (2026-11-02 · gate)

설계: `.claude/fable-design-20261102-direct-store-billing.md` · 사실: `.claude/fable-gate-facts-20261102-direct-store-billing.md` · 작업방 0c838bc5

## 판정: **PASS**

## 1. diff 범위 대조 (설계 §3 밖 변경 0)
`git diff` 로 직접 대조. 설계 표 10항목 전부 해당 파일에서만 바뀌었고, 설계가 «무접촉» 으로 못박은 상태 목록 파일(badgeCounts·owner·dashboard·overdue/soa 스케줄러·brand-soa·purchase-invoices·payViaSoa·invoicePayable·checkCreditLimit·brand-revenue·supplier.js)은 작업 트리에 변경 없음. 🔒 인쇄 보호파일 `check-print-guard` 8/8 변경 없음.
- `paymentTerms.js` — `VALID_PAYMENT_TERMS` 에 안 넣고 `allowInternal` 옵션으로만 연다 · `buildPaymentTerms` INTERNAL 정규화(immediate · due/soa/credit null · trigger/currency/notes 보존) · `isInternalSettlement` export. 설계 §1-1 그대로.
- `entity-billing.js` — PUT 2곳만 `{allowInternal:true}` · GET 은 INTERNAL 일 때만 `open_invoices` · settle-internal 2개가 공통 `settleInternal` 1개 사용 · 검사(GET)와 수정(POST)이 같은 `openInternalWhere` · SOA 는 `syncSoaChildren` 호출 · 발주 거울 `mirrorPaidToPurchaseOrders(..., {method:'internal'})` · 409 NOT_INTERNAL. §1-4 그대로.
- `purchaseOrderService.js` — 줄 단위 Edit. `internal = !alreadyPaid && isInternalSettlement(...)` · status/paid_amount/paid_at/payment_method/payment_notes/due_date=null · finalize 뒤 paid_amount 맞춤 블록 `alreadyPaid || internal` 로 일반화(복제 없음) · 발주 거울은 `unpaid` 일 때만. 같은 파일의 `deliveredAtOf`/`issuedAt` 은 끝난 방 d5ebceff(10-30 배송 완료 청구서 · Fable 조건부 PASS · 미커밋)의 것이며 보존됨. `computeDueDate` 는 INTERNAL 에서 기본 7일로 떨어지지만 바로 null 로 덮여 무해.
- `purchaseOrderPayment.js` — `reversePayment` internal 400 (unpaid-noop 뒤 · 드로어 전) · `mirrorPaidToPurchaseOrders` `{method}` 옵션, 기존 호출부 무변경. 취소 경로(draft/submitted/pending_approval 만)는 internal(수령·확정 시점에 생김)과 만나지 않으므로 취소가 막히는 부작용 없음.
- `PurchaseOrder.js` ENUM + `migrate-po-payment-method-internal.js`(expandEnum 자기 값만 · process.exit) + registry deploy. `PAYMENT_METHODS` 무변경(사람이 못 고름).
- `route-guard-baseline.json` — settle-internal 2줄 추가, owner claim/unclaim 2줄 보존 확인(정렬만 바뀜).
- 프론트 `BillingTermsModal.tsx` — INTERNAL 선택 시 Cycle/DueDay/IssueDay/CreditLimit 숨김 · 트리거/통화/메모 유지 · 저장 payload 최소 · `savedInternal` 일 때만 open_invoices 읽고 «Settle N» + `window.confirm` · `formatTermsSummary` INTERNAL 분기(RestaurantsPage 무변경). 4언어 billing.json 8키·purchaseOrders.json `pay.method.internal` 전부 존재(en/ko/zh/ms 각 9·2 grep).
- docs 2건 추가 절. sw.js 는 다른 방이 6.05 로 이미 올림(미배포) — 이 프론트 변경이 그 bump 에 실린다.

## 2. 가드·기계 게이트 (Fable 직접 실행)
- `check-print-guard` 8/8 변경 없음 · `check-sensitive-diff` = 게이트 대상(①②③ — 예상대로) · `check-migration-registry` 통과 · 마이그 재실행 멱등(`enum('cash','bank_transfer','card','personal','internal')`).
- Opus 보고: verify-all --full 21/24 → 실패 3 중 route-guard 는 baseline 등록 뒤 0, deploy-ready 는 배포 준비 몫, inspection O-INT-001 1건은 다른 방 98b32450 시험 주문 41909(이 일과 무관). health-check 전체·mount sweep 8역할·design-guard·i18n·타입 통과. 빌드 1회.

## 3. 실호출·반증 (Fable 직접 재현)
- `health-check --grep=직영` **4/4** 통과 · 잔재 감시 고아청구서 0→0 · 시험 뒤 `ZZ-HC-INTERNAL` 발주 0 · internal 청구서 0 · 데모 매장 38/39 `brand_billing_terms` 원복(null).
- **고장주입 1(재현):** `createTradeInvoice` 의 `internal` 분기를 `false` 로 → ② 만 정확히 실패(`pending_payment / due 11-09 / paid 0 of 37.5`), ①③④ 통과 → `cp` 원복(백업과 diff 동일) → 4/4. 검사기가 그 한 줄을 실제로 보고 있다.
- 고장주입 2(Opus 보고): `reversePayment` 차단 제거 + pm2 restart → ② 환불 200 으로 실패 → 원복 4/4. HTTP 경로라 restart 뒤 주입한 것 맞음.
- 실브라우저(Opus 보고): demo-brand · 매장 38 · 칸 숨김·안내·Settle 확인창·결과 줄·요약 «Internal · no payment» · console.error 0.

## 4. 배포 안전성
- 마이그 1개(ENUM expand-only · deploy 목록 · 멱등 · 롤백 불필요 — 값 하나 더 있어도 옛 코드 무해). 배포 게이트의 `check-enum-parity` 가 dev `internal` 을 보고 마이그가 운영에 먼저 돌아야 통과한다 — 배포 순서 게이트(4f)가 보장.
- 운영 데이터는 건드리지 않음. 운영 미지급 건은 BG 가 창에서 명시 1회(§5).
- 코드 롤백 = 이전 번들/백엔드로 복귀. 이미 internal 로 찍힌 청구서·발주는 그대로 «paid» 로 남는다(되돌릴 필요 없음 — 돈이 안 움직였고 상태 목록은 옛 코드도 그대로 읽음).

## 5. 확인 못 한 것 (판정에 영향 없음 · 기록)
- **SOA 묶인 쌍의 settle** — 데모에 열린 SOA 쌍이 없어 실호출 없음. 코드 대조: `settleInternal` soa 분기가 SOA 를 paid 로 쓰고 `syncSoaChildren(inv,'paid',{transaction,actorId,at})` 호출 — 서명·옵션 이름이 `soaChildSync.js` 와 일치. 자식은 기존 confirm-payment 경로와 같은 규칙(status/paid_at/confirmed_*)을 받고 `payment_method` 는 안 찍힌다 — 기존 SOA 결제 경로와 동일한 동작이라 회귀 아님. 운영검증 때 실제 SOA 쌍이 있으면 그때 숫자 확인.
- 운영 with MIN Cafe 미지급 건수 — 이 방 운영 읽기 거부. 창의 `open_invoices` 가 보여 준다.
- `check-enum-parity` 운영 비교 — 배포 게이트 몫.

## 6. 알려진 빈틈 (설계 §2-2 · 이번 범위 밖)
직영 매장에서 입고 전 «Receive & Pay» 로 현금을 고르면 드로어에서 돈이 나가고 청구서는 cash 로 paid(alreadyPaid 우선). 직영에서 그 버튼을 숨기는 것은 다음 묶음.

## 7. 마커
`fable-gate.js pass` — 이 지문은 작업 트리 전체(98b32450 브랜드 Performance 진행 중 · GTM 보류 · playwright · oneoff 포함)를 덮지만 **판정 범위는 이 일(direct-store-billing)뿐**이다. 98b32450 은 그 방이 끝날 때 따로 게이트.
