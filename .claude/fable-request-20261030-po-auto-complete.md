# Fable 설계 요청 — 배송 완료 뒤 구매자가 수령을 안 누르면 (2026-10-30 · 작업방 d5ebceff)

## Irene 원문 (그대로)
https://purplehere.com/pos/brand/general/incoming-orders  고객이 안받았다고 주문완료가 안되면 어떻게 해? 일정기간이 지나면 그냥 완료처리 되어야 해. 인보이스가 안나오잖아. 배송완료되면 인보이스 나와야 하는 거 아니야?

## 실측 사실 (팀원 Opus 조사 · 코드 변경 0)
- 화면: `/pos/brand/general/incoming-orders` = `dev-frontend/src/pages/IncomingOrders/IncomingOrdersView.tsx` (판매자 «받은 주문»). 판매자 버튼 «배송 완료» → `POST /api/seller-orders/:id/deliver` (`routes/seller-orders.js:1078`) — shipped → delivered, 전 품목 발송 확인, 구매자에게 «Confirm Receipt» 메일(`seller_order_received`, action confirm_receipt_now). 청구서 발행 없음.
- 발주 상태 ENUM(`models/PurchaseOrder.js:19`): draft, pending_approval, submitted, confirmed, shipped, in_transit, delivered, partial_received, received, cancelled, closed, delivery_failed. 시각 칸: shipped_at, received_at(delivered_at 칸은 없음 — tracking_info 에 delivered 이벤트 시각).
- 거래 청구서 발행 단일 함수: `services/purchaseOrderService.js` `createTradeInvoice(po)`(멱등 — trade_invoice_id 있으면 기존 것) · `issueTradeInvoiceAfterCommit(po, {when='received'})` — po.status === when 일 때만.
  - 부르는 곳: 구매자 수령 3길(`/receive` · `/mark-received` · `/receive-and-pay`, `routes/purchase-orders-workflow.js` 808·882·944·1325) + 판매자 «주문 확정»(`seller-orders.js:641`, 브랜드 판매자 + 구매 매장 `brand_billing_terms.invoice_trigger === 'on_confirmed'` 일 때만 — 2026-09-29).
  - 청구 조건 칸 `invoice_trigger`: 'on_received'(기본) | 'on_confirmed' (`utils/paymentTerms.js:16` · 화면 `components/Billing/BillingTermsModal.tsx` — 브랜드만 고를 수 있음).
- 월 정산서(SOA) 스케줄러 `services/soaScheduler.js:315` `issueMissingTradeInvoices` — 브랜드·푸드코트 판매자 + 매장 구매자에 한해, 정산서 만들 때 청구서 없는 발주(BILLABLE = confirmed·shipped·in_transit·delivered·partial_received·received·closed)에 청구서를 먼저 발행. → 월 정산 거래는 결국 들어가지만, «즉시 청구» 거래·공급업체 판매자는 구매자가 수령 누를 때까지 청구서 0.
- 수령 = 재고 반영: `services/purchaseOrderReceive.js` `markAllReceived(po,{userId,note,trackingSource},t)` — 남은 수량(주문−수령) 전부를 구매자 재고(재료 배치·원장·가중평균원가·브랜드 재고)에 넣고 status received, received_at, actual_delivery_date. 수령 뒤 `fireBuyerReceivedNotification`(판매자에게 «받았다» 알림 — 판매자 재고는 출고에서만 빠짐).
- 수령 가능 상태 `utils/poStatuses.js` RECEIVABLE_STATUSES = submitted, confirmed, shipped, in_transit, delivered, partial_received. 구매자는 품목별 부족·불량(discrepancy `PUT /purchase-orders/:id/items/:itemId/discrepancy`)·반품(po-returns)을 수령 때/뒤에 남길 수 있음.
- 스케줄러 틀: `services/recurringPoScheduler.js`(node-cron 매 정각 + SchedulerRun 기록) · server.js 732~ 에서 시작.
- 개발 DB(참고만 — 운영 숫자 아님): 브랜드 판매 발주 received 136(청구서 없음 128 = 옛 데이터) · shipped 2 · 공급업체 shipped 7. 운영 DB 숫자는 이 방에서 못 읽음(운영 읽기 명령이 허락 창에서 거부된 이력).

## 기계적 제약
- 개발서버만 · 운영 배포·운영 DB 쓰기 없음.
- 🔒 인쇄·KDS 보호파일 무관(무접촉).
- ENUM 은 expand-only · 새 마이그는 레지스트리 등록.

## 부탁
위 Irene 원문에 대한 설계(무엇을 언제 자동으로 할지 · 청구서 발행 시점 · 재고 · 알림 · 화면 표시 · 검증 기준)와, Irene 에게 물을 것이 있으면 «Fable 권고» 를 붙여 주세요.
결과 파일: `/var/www/.claude/fable-design-20261030-po-auto-complete.md`
