# Fable gate — 판매 주문 반품 (2026-11-17)
설계: .claude/fable-design-20261117-po-returns-seller-and-deduct.md

## 1차 — 불통과(조건부) · 고칠 것 2건
1. 전체 반품으로 0원이 된 청구서가 «미결제»로 남음 → 마감 뒤 연체·RM 0.00 연체 메일 · 카드 0원 거부. 고침: closeIfFullyReturned(총액 0·직영 아님·정산서 미묶임·pending_payment/overdue → paid·paid_amount 0 · 발주 paid) + invoiceOverdueScheduler total_amount > 0.
2. 승인 때 청구서가 없던 주문은 나중 createTradeInvoice 가 반품을 모르고 전액 청구. 고침: attachPendingReturnsToInvoice(배송비 줄 뒤·finalize 앞, 반품 행 deducted_invoice_id 기록).
증거 요구: R11 · R12 + 고장주입.
1차 직접 실행: 반품 6/6 · R9 1/1 · 여러 줄 전체 반품 실호출 14/14 · 차감 불변식 위반 0 · print-guard 8/8.

## 2차 — PASS (마커 지문 97f005eeb413)
- 두 건 확인. 반품 8/8(R11·R12) · print-guard 8/8 직접 실행. 고장주입 5건·health 497/497·verify-all·실브라우저는 팀원 실행분 수용.
- 새로 찾은 것(막지 않음): 0원 줄이 뒤에 있는 주문의 전체 반품이 400 ALREADY_PAID 로 통째 거부(첫 줄에서 청구서 0 → 닫힘 → 다음 줄 결제 막기). 돈·재고 안전, 개발 DB 해당 발주 0건. 고칠 방법: closeIfFullyReturned 를 applyReturnDeduction 밖으로 — 판매자 직접 반품은 줄 루프 뒤, 승인은 본체 뒤 한 번(커밋 전).
- 확인 못 함: 운영 «수령됐는데 청구서 없는 발주» 건수 · 현금 드로어 실제 출금(코드상 payable.amount) · createTradeInvoice 반품 붙이기 실패 시 로그만 남고 전액 청구서.
- 후속: 반품 목록 청구서 번호 · 구매자 «판매자가 반품 처리함» 배너 · 대조 재저장 시 반품 줄 이름 · brand-revenue·foodCostReport 반품 미차감(Fable calc).
- 설계 §9 소급 질문: 운영 승인 반품 0건 → 올리지 않음.
