# 재고 화면 발주 → 발주 대기 — 팀원 실측 증거 (2026-11-10, 작업방 50a53562)
설계: .claude/fable-design-20261110-stock-order-to-staging.md

## 바뀐 파일 (이번 작업분만)
- dev-backend/routes/purchase-orders-crud.js — bulk `source:'stock'` 기록(events 1건, 트랜잭션 안) · suggestions `in_staging`/`in_staging_order_qty` (buildSuggestionRows staging 인자) · auto_submit 분기 무변경
- dev-backend/routes/purchase-orders-workflow.js — consolidate-drafts: 지워지는 초안의 source:'stock' 이벤트를 남는 초안으로 옮김
- dev-backend/utils/reorderMath.js — stagingQty / stagingQtyBrand (onOrderQty 와 같은 범위, status='draft') · classify/compute 무변경
- dev-backend/scripts/health-check.js — K1~K3 케이스 1건 추가
- dev-frontend: hooks/useOrderModal.ts(단건 → bulk source:'stock', 자동 닫힘 제거) · hooks/useBulkOrder.ts(auto_submit 제거, 기본 수량 − 발주 대기, 이미 담김 묶음) · modals/OrderModal.tsx · modals/BulkOrderModal.tsx · InventoryManager.tsx · sections/StockListSection.tsx(«In Pending POs · n» 링크 + 행 Order 버튼 수량 버그) · pages/PurchaseOrders/PurchaseOrderStagingPage.tsx(«From Stock» 꼬리표) · components/Inventory/DeliveryTimeline.tsx(stock 이벤트 품목 표시) · pages/IncomingOrders/IncomingOrdersView.tsx(판매자 타임라인 buyer_only 제외) · locales 4언어(inventory toStaging.* · purchaseOrders staging.fromStock*)
- 설계 밖 1건: StockListSection 행 «Order» 버튼이 칸에 제안 수량(15)이 보여도 min_order «0.00»(글자)를 읽어 눌러도 아무 일 없던 원래 버그 — 실브라우저 시험 중 발견. 칸에 보이는 값(직접 입력 → 제안 수량 → 최소주문>0 → 1)을 쓰도록 수정(일반 재고 행도 같은 «0.00» 처리).
- 문구: 설계의 «Order Staging» 대신 기존 화면 이름 «Pending POs / 발주 대기 / 待提交采购单 / PO Menunggu» 사용(같은 화면을 두 이름으로 부르지 않으려고).

## 실측
1. health-check «재고 화면 발주…(K1~K3)» 통과: bulk source:stock → status draft · submitted_at null · BG 판매자 /seller-orders 목록에 없음 · events source:stock 1건(qty 3, buyer_only) · 같은 품목 두 번 → 줄 1개 수량 5 + 이벤트 2 · suggestions in_staging_order_qty 0→5, status·on_order 담기 전과 동일.
2. 고장주입: 서버에서 source:stock 이면 auto submit 하도록 되살림 → K1 실패(«K1 상태 submitted … 기대 draft») → 원복 → 통과. 잔재 0 확인.
3. consolidate: 같은 판매자 초안 2개(새 쪽에 stock 이벤트) → consolidate-drafts 200 {mergedGroups:1, removed:1} → 남은 초안 70805 에 재고 기록 1건 보존.
4. 브랜드(BG demo-brand): bulk product_ingredient_id 줄 → 201 draft · stock 기록 1 (product_ingredient_id 10672) · in_staging 0→18 · status out→out · /purchase-orders?status=draft 에 보임(같은 /pos/purchase-orders/staging 화면이 브랜드 초안을 보여 줌). 정리 완료.
5. 실브라우저(데모 매장 38, RA): 재고 목록 «Order» → 창 버튼 «Add to Pending POs» → 결과 «Added to Pending POs — not sent yet» + «Review & Send» → DB draft·submitted_at null·재고기록 1 → «Review & Send» → /pos/purchase-orders/staging 에 «From Stock» 꼬리표 1 → 재고 목록에 «In Pending POs · 15.00 pack» 링크. pageerror 0. 시험 데이터 정리.
6. check-print-guard 8/8 무변경 · design-guard 신규 0 · i18n verify 통과 · 빌드 성공(경고 3건은 무관 기존 파일).
7. verify-all --full(1차, 행 버튼 수정 전 번들): 23/24 — 실패 1 = deploy-ready(배포 기록 파일·SW 버전, 배포 때 채우는 항목). mount sweep 크래시 0. 2차(최종 번들) 실행 중.

## 확인 못 함
- 실제 판매자/오너 메일·소켓 통지가 «담기» 때 0건인지 로그로 직접 보지는 않음 — 코드상 통지 호출은 auto_submit 분기 안에만 있고 재고 화면은 auto_submit 을 안 보냄(고장주입으로 그 분기를 켰을 때만 submitted 됨을 확인).
- 일괄 창(«Order these») 실브라우저 클릭은 데모 매장 다른 품목까지 담겨 안 함 — API 경로(bulk source:stock)는 health-check·BG 실호출로 확인.
- 발주 상세 타임라인 «Added from Stock — 품목 × 수량» 화면 표시는 브라우저로 안 봄(컴포넌트가 events 를 그대로 그리는 것만 코드로 확인).
