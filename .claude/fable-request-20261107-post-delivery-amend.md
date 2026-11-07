# Fable 설계 요청 — 배송 완료 뒤 판매자(브랜드제너럴) 주문 수정·정정 (2026-11-07 · 작업방 51367c8d)

## Irene 원문 (그대로)
«고객이 받은 거 완료하거나 인보이스 결제 전에는 그대로 브랜드제너럴에서 주문내역 수정할 수 있어야 하는데 배송하고 나면 안되네. 그럼 미스했을 때 해결을 못하잖아. 운영서버에서 git consulting 이 주문에서 우리가 육개장 소스 2kg인데 모르고 1kg 보냈고 그대로 끝났어. 어떻게 반영해? 방법 찾아줘. 너가 바꾸지 말고 해결할 수 잇게 개발 보완.
PO-R28-20261104-001 / RESTAURANT / K-DINE Noodles Pavilion / 12 items / K-Jjajang Sauce no meat 1kg, K-Yukgaejang Sauce +10 / Self Delivery / Delivered / Auto-completes 10/11/2026, 11:15 PM / Unpaid / 3d ago / RM 453.50»
(화면 = 판매자 «받은 주문» 목록. 날짜 표기 10/11/2026 = 11월 10일.)

## 팀원이 실측한 사실 (개발 코드)
- 판매자 수정 POST /api/seller-orders/:id/amend — routes/seller-orders.js:1480~. 거부 조건: status ∉ AMENDABLE_STATUSES ['submitted','confirmed'] (utils/poAmend.js:24) · trade_invoice_id 있음 · quantity_received>0 줄 · shipped_at 있는 줄. 수정은 줄 전부 지우고 다시 만듦 + 총액 재계산(computeTotalsWithDelivery) + 인상은 confirm_increase · 오너 승인 매장이면 applyAmendRaiseGate.
- 구매자 수정 판정 buyerAmendBlock (utils/poAmend.js:270) — 별개.
- 10-30 자동 완료 설계 .claude/fable-design-20261030-po-auto-complete.md: /deliver 커밋 뒤 issueTradeInvoiceAfterCommit(po,{when:'delivered'}) 로 청구서 즉시 발행 → 배송 완료 뒤엔 trade_invoice_id 가 붙어 수정 길이 닫힘. 72h 뒤 서버가 markAllReceived(재고 반영) — services/poAutoReceiveService.js. 그 설계 §2-1 은 «부족·불량은 반품 승인 때 크레딧 노트가 상쇄» 라고 적었음.
- 반품 routes/po-returns.js: 생성은 status received/partial_received/delivered 허용이나 수량 한도 = quantity_received(배송 완료·미수령이면 0 → 사실상 불가). 승인 = 판매자 재고 되돌림 + 구매자 재고 차감 + credit_note 청구서(status 'credit'). 메모리: 크레딧 노트는 SOA 에 상계 안 됨(미해결 백로그).
- 불량 보고 PUT /purchase-orders/:id/items/:itemId/discrepancy (routes/purchase-orders-workflow.js:1353): reason short/damaged/wrong_item. short 는 기록만(돈 정정 없음), damaged/wrong_item 은 반품 요청 자동 생성.
- 청구서 계산: utils/invoiceCalculation.js finalizeInvoice(라인 합으로 재계산) · services/reconcileInvoiceSync.js(인보이스 대조가 청구서 줄을 고치는 기존 예) · 청구서 발행 services/purchaseOrderService.js createTradeInvoice:173 · 정산서 자식 상태 soaChildSync(메모리 reference_soa_confirm_patch_status_no_cascade) · Invoice.parent_soa_invoice_id.
- 판매자 재고 차감은 출고(ship) 때(브랜드 = BrandProduct→BOM→ProductIngredient). 구매자 재고는 수령(received) 때.
- 문서: docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md · docs/PURCHASE_ORDER_SYSTEM.md · docs/TRADE_STRUCTURE.md.
- 운영 데이터: 이 방은 운영 읽기가 허락 창에서 막혀 해당 발주 실데이터 못 읽음(확인 불가). 화면상 Delivered·Unpaid·자동 완료 예정 11/10 23:15 → 아직 수령 전으로 보임.

## 기계적 제약
- 코드 변경은 개발서버만. 운영 DB 쓰기·운영 배포 없음(Irene 요구도 «너가 바꾸지 말고» — 이 운영 건은 Irene/판매자가 새 기능으로 직접 처리).
- 🔒 인쇄·KDS 보호파일 8개 무접촉. ENUM 은 expand-only. 마이그는 registry 등록.
- 이 발주는 11/10 23:15 자동 완료됨(그 전 배포 여부는 Irene 수동 배포 몫) — 설계는 수령 전·수령 후 둘 다 다뤄야 함.
