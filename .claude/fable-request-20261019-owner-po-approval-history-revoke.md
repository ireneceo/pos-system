# Fable 설계 요청 — 오너 발주내역·승인 화면 승인 전/후·승인취소 (2026-10-19, 작업방 f001fc2a)

## Irene 원문 (그대로)
«레스토랑오너도 발주내역 봐야 해. 그 내역이 승인메뉴에서 승인전, 후로 나와서 승인완료가 발주내역이랑 동일하게 하자. 그리고 승인취소 기능도 있어야 해. 만약 승인취소 가능한 타이밍은. 외부공급업체는 다 가능해야 하고.»
(원문에서 «승인취소 가능한 타이밍은.» 뒤 문장이 끊겨 있음 — 가입 공급업체 쪽 타이밍 조건이 비어 있다)

## 실측 (개발서버, 읽기만)
- 오너 메뉴(MainLayout 🔒 인쇄 보호파일 · 무접촉 대상): Operations › Invoices · Performance · **PO Approvals(/pos/owner/po-approvals)** · Purchase Order(/pos/purchase-orders) · **Order History(/pos/purchase-orders/history)**. 데모 오너(27, 매장 2·3) 허용 경로에 셋 다 있음(모듈 buyer_purchase_orders). 즉 오너용 «발주내역» 화면은 이미 있다 — PurchaseOrdersPage.tsx, 소유 매장 전체/한 매장 고르기, 상태 필터(all/draft/submitted/confirmed/shipped/partial_received/received/cancelled — pending_approval 옵션 없음), 행 클릭 → 상세 패널. GET /api/purchase-orders 는 오너면 소유 매장 전체를 준다(실호출 200).
- 승인 화면 OwnerPoApprovalsPage.tsx: GET /api/purchase-orders/pending-approval(status=pending_approval 만) 한 표. 승인 → POST /:id/approve → status 'submitted' + approved_by_user_id/approved_at + 판매자 통지(가입 업체) / 반려 → POST /:id/reject → 'draft' + rejected_reason. 승인 직후 행은 화면 상태로만 «방금 승인» 띠(외부 업체면 WhatsApp·Email 보내기 버튼 열림), 떠나면 사라짐. 탭 없음.
- 라우터: routes/purchase-orders-approval.js (authenticateToken + requireOwnerScope, purchaseOrdersRouter 앞에 마운트 — 블랭킷 requireBuyerRole 회피).
- 상태 ENUM: draft, pending_approval, submitted, confirmed, shipped, in_transit, delivered, partial_received, received, cancelled, closed, delivery_failed.
- 가입 공급업체 흐름: submitted → (판매자) POST /seller-orders/:id/confirm → confirmed → shipped → 구매자 수령. 외부 공급업체(is_system_registered=false): 승인 → submitted, 시스템이 안 보냄 — 사람이 WhatsApp/PDF/이메일(send-external-email)로 보냄. 판매자 confirm 단계 없음. 구매자가 mark-received/receive(재고 반영 applyReceipt)·pay/receive-and-pay(돈 이동, 취소 시 reversePayment 로 반대 이동)·반품(returns).
- 현재 «발주 취소» POST /:id/cancel: draft·submitted·pending_approval 만(그 뒤는 «returns flow» 안내 400). 오너도 매장 전환으로 취소 가능(«Cancelled by Owner»). 결제가 있으면 reversePayment.
- 입고 가능 상태 RECEIVABLE_STATUSES (utils/poStatuses) — draft·pending_approval 제외(승인 우회 방지 2026-07-13 판정).
- 오너 본인 제출은 승인 생략(«Submitted by Owner (approval skipped)», approved_at 안 찍힘). 판매자 총액 인상·매장 수정도 pending_approval 로 되돌아감(applyAmendRaiseGate/applyBuyerAmendGate, tracking 에 status_before).
- 개발 DB 매장 발주: approved_at 찍힌 행 0건(승인 이력 시험 데이터 없음). 상태별: received 159 · draft 39 · submitted 23 · cancelled 12 · confirmed 10 · shipped 9 · partial_received 1.
- badgeCounts.poApprovals = pending_approval 개수.

## 기계적 제약
- 🔒 MainLayout.tsx·인쇄 보호파일 무접촉(사이드바 항목 추가·변경은 bless 필요 → 피하는 쪽).
- 새 ENUM 값이 필요하면 expandEnum 만. 운영 쓰기·배포 없음(개발서버만).
- 이 일은 돈·주문 무결성(게이트 대상) — 구현 뒤 Fable 검증 1회 예정.

## Fable 이 정해 줄 것
승인 화면 «승인 전/승인 후» 구성과 «승인 후 = 발주내역과 동일» 의 뜻, 승인취소의 결과 상태·가능 타이밍(가입/외부)·재고·돈·판매자 통지 처리, 원문에서 끊긴 타이밍을 Irene 에게 물을지 여부.
