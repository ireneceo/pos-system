# 사실 — 직영점 납품 «결제 필요 없음» (2026-11-02 · 작업방 0c838bc5 · Opus 실측)

## Irene 원문
«with MIN Cafe는 GIT CONSULTING 브랜드제너럴이 운영하는 직영점이라서 납품한 금액들을 결제할 필요가 없거든. 그래도 금액이나 주문리스트업, 통계는 다 되어야 해. 어떻게 하면 될까? 지금 자꾸 미지급상태로 알림오고 그래서 불편하네.»

## 데이터 (개발 DB · 운영은 읽기 권한 거부로 못 봄)
- 매장 restaurants.id=10 «with MIN Cafe», brand_id=4 (브랜드 «with MIN»), brand_billing_terms = NULL(개발). 메모리: 수신처 표기 «GIT Consulting (with MIN)» = 회사명(브랜드명).
- 개발: 이 매장 발주 brand 4 판매자 7건(draft~received), trade 청구서 brand 4 paid 1건. 운영 미지급 건수·금액은 확인 못 함.

## 지금 흐름 (코드)
- 발주 받음(또는 brand 판매자 on_confirmed) → `services/purchaseOrderService.js` createTradeInvoice(172~) → Invoice invoice_category='trade', issuer_type='brand', issuer_id=브랜드, status = 발주가 이미 결제면 'paid' 아니면 'pending_payment', due_date = computeDueDate(resolvePaymentTerms) — brand 판매자 + brand_billing_terms NULL 이면 기본(NET_15 로 보임).
  - ⚠ 이 파일엔 다른 방(배송 완료일 발행일 deliveredAtOf)의 미커밋 변경이 있음 — 덮어쓰기 금지.
- 청구 조건 저장 = Restaurant.brand_billing_terms JSON(`utils/paymentTerms.js` 검증: terms COD/NET_15/30/60 · invoice_cycle immediate|monthly_soa · payment_due_day · credit_limit · currency · notes · soa_issue_day · invoice_trigger). 편집 화면 = BG Restaurants 매장 카드 Billing → `components/Billing/BillingTermsModal.tsx` · API `routes/entity-billing.js` PUT/GET /api/brand/restaurants/:id/billing-terms.
- Invoice.status ENUM = draft · pending_payment · payment_submitted · paid · overdue · cancelled · credit. payment_method = STRING(50).
- 미지급이 «알림»으로 보이는 길:
  1. `services/invoiceOverdueScheduler.js` — pending_payment + due_date 지남 + category≠subscription → overdue 전환 + invoice_overdue 메일 1통(SOA 자식 제외).
  2. `routes/badgeCounts.js` 207~ — RA/Staff/Owner 사이드바 청구서 배지 = pending_payment|overdue 개수.
  3. `routes/owner.js` 130·777·922 · `routes/dashboard.js` 151~ — 미지급 합계·목록.
  4. `services/invoiceScheduler.js:1219` invoice_created 메일 · `services/soaScheduler.js:303`·`routes/brand-soa.js:202` monthly_soa 메일(월결제일 때).
  5. `utils/invoicePayable.js` PAYABLE_STATUSES = pending_payment·overdue (결제 버튼).
  6. `routes/purchase-orders-crud.js:773` checkCreditLimit — 미수 누적으로 발주 차단(한도 있을 때).
- 통계: `routes/brand-revenue.js` 진실원장 = 브랜드 발행 인보이스(trade = 프로덕트 판매) · DEAD_STATUSES 제외 · PAID_STATUSES 면 금액 전액 «받음». 284~ 판매 리포트는 발주(received 또는 trade_invoice_id) 기준. → 청구서를 안 만들면 매출 통계에서 빠진다.
- 기존 «직영/내부거래» 개념: 코드에 없음(brand-revenue.js:199 주석에 «with MIN 같은 직영점은 따로 봐야 한다» 한 줄뿐).

## 기계 제약
- 운영 DB 읽기·쓰기 이 방에서 안 됨(읽기 권한 거부). 운영 배포 안 함. 운영 기존 미지급 건 정리는 배포 때 마이그 또는 Irene 할 일.
- 관련 문서: docs/BG_FG_TRADE_BILLING.md · docs/INVOICE_SYSTEM.md · docs/TRADE_STRUCTURE.md
