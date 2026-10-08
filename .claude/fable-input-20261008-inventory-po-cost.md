# Fable 입력 — 재고 → 발주 → 원가 측정 구조 검토 (2026-10-08 · 작업방 98b2ea7c · 팀원 실측)

## Irene 원문
«재고관리부터 발주관리 코스트 측정까지 완벽하게 관리 가능한 상태로 필요한 구조가 잘 된건지 확장해야할 기능이 뭔지 파악하고 검토해. Fable이 할 필요한 확장기능 검토랑 설계 다해.»

## 기계적 제약
- 이 방은 조사·설계 문서만. 코드 변경 0 · 운영 DB 접근 없음(운영 실사용 수치는 **확인 못 함** — 아래 숫자는 전부 dev DB `purple_dev_db` SELECT).
- 지금 다른 작업방 2곳이 미커밋 변경 중: 359d0949(외부 월별 SOA · 직원식 분류 `ingredient_categories.is_staff_meal` · purchase-cost-report by_purpose), 0ec1e1c3(판매자 배송 지역 `delivery_zones`). 이 구간 파일은 그 방 몫.
- 관련 단일 진실 문서: `docs/TRADE_STRUCTURE.md`(구조 대조 의무 — 같은 개념에 새 목록·경로 금지), `docs/INVENTORY_MANAGEMENT_SYSTEM.md`, `docs/PURCHASE_ORDER_SYSTEM.md`, `docs/RECIPE_MANAGEMENT_SYSTEM.md`, `docs/BRAND_STOCK_SHARING_DESIGN.md`, `docs/INGREDIENT_UNIFICATION_DESIGN.md`. 🔒 인쇄/KDS 보호 파일(orders-crud.js 의 pending-print/printed/kitchen_items 포함)은 무접촉 대상.
- 경로 약어: BE=/var/www/dev-backend, FE=/var/www/dev-frontend/src

---

## A. 재고(STOCK)

### A1. 현재고 위치 — 여러 테이블
- 매장 소유 재료 `ingredients.current_stock` / 브랜드 공유 재료의 매장분 `restaurant_ingredient_stocks.current_stock` / 그 밖은 행 자체(`utils/brandStockAccess.js:25-27, applyStock :160-184`).
- BG 재고아이템 `product_ingredients.current_stock`(owner_user_id), 판매상품 자체 재고 `products / brand_products / foodcourt_products / supplier_products .current_stock`(TRADE_STRUCTURE §5-7 «정석 밖, 숨은 재고»), 일반재고 `general_stock` + 별도 원장 `general_stock_transactions`.
- 단위 다섯 칸(unit·base_quantity·package_unit·package_quantity·unit_cost=기준양의 값, TRADE_STRUCTURE §2-2). 발주단위→취급단위 = `ingredient_seller_products.unit_conversion`(PO 라인에 스냅샷). **레시피단위→재고단위 환산 없음 — 대신 단위 잠금**(레시피 걸린 재료 단위 변경 409, `routes/ingredients.js:432-450`). dev recipe_ingredients 25줄 단위 전부 일치.
- `ingredients.track_stock` 은 2026-09-01 폐기(로직에서 안 읽음).

### A2. 원장
- `inventory_transactions` 유형 ENUM: initial, purchase, order_deduct, stock_take, waste, adjustment, return_in, return_out, production. **transfer·staff_meal 없음.** `order_id` 칸은 있으나 차감은 notes 에 문자열로 씀(`inventoryDeductionService.js:226,316`). **원장에 원가/금액 칸 없음**(`models/InventoryTransaction.js:7-95`).
- 원장과 같이 쓰는 경로: inventory-core initial/receive/waste/adjust/실사완료, inventory-extra 수동 FIFO 차감·배치폐기, inventory-produce, PO 수령, 판매 차감, seller-orders 출고, po-returns.
- **원장 없이 현재고를 바꾸는 경로 5:**
  1. `PUT /api/product-ingredients/:id` 허용필드에 current_stock(`routes/product-ingredients.js:619`) — **BG 재고 화면 인라인 수정이 실제로 이 경로**(`FE/components/Inventory/hooks/useInlineStockEdit.ts:66-69`). 생성 POST 도(:578).
  2. 일반재고 PUT current_stock(`inventory-extra.js:305`, `general-stock.js:360`).
  3. 푸드코트 adjust/receive — FoodcourtProduct 만 갱신, 원장 0(`foodcourt-inventory.js:239,285`), transactions API 빈 스텁(:303-326).
  4. 메뉴 상품 PUT `{...req.body}` 그대로(`menu.js:682,758`) — current_stock 안 거름(보내는 화면 존재 여부 미확인).
  5. foodcourt-products.js:629,724 · brand-products.js:1020,1182 생성/수정.
- 원자성 약함: 일반재고 receive/adjust(트랜잭션 없음, 원장 실패 무시 `inventory-extra.js:146-240`), product-ingredients adjust-stock(:1100-1131).
- 어긋남: waste 는 재고 max(0) 로 자르는데 원장엔 -wasteQty 그대로(`inventory-core.js:565-574`), waste 는 FIFO 배치 안 줄임. 수동 deduct 유형=클라이언트 reason(`inventory-extra.js:634`).

### A3. 실사
- `stock_takes / stock_take_items`(theoretical/actual/variance/variance_value, variance_reason ENUM waste·breakage·recipe_variance·unrecorded·measurement·other).
- 이론재고는 생성 시점 스냅샷, 그 사이 판매·입고 보정 없음(`inventory-core.js:855-866`, 완료 :1036-1046 actual 로 덮어씀).
- **부분 실사 불가**(전 재료 입력 강제 :1001-1008), **승인 단계 없음**, 매장당 진행 1건, 주기·스케줄 없음, **RA 만** (BG·FG 실사 API 없음).
- variance_value = variance × unit_cost — **base_quantity 로 안 나눔**(`inventory-core.js:952`, `StockTakePage.tsx:401`, theoreticalValue :1023). 이번 달 합 = `monthly_loss`(:258-269, `DashboardSection.tsx:98`).
- dev stock_takes **0건**.

### A4. 폐기·직원식·이동·브랜드 공유
- 폐기 `POST inventory/waste` 수량+자유 메모만(사유코드·금액·배치 소진 없음), 폐기 리포트 없음.
- 직원식: 재고 유형 없음. 주문 `payment_method='staffMeal'`(dashboard.js:579-623). (발주 쪽 직원식 분류는 359d0949 진행 중, «직원식 사용 입력»은 TRADE_STRUCTURE ⑪ 2단계 미착수.)
- **매장 간 이동 미구현.** 브랜드→매장 공급은 PO/seller-orders 출고로만.
- 브랜드 공유 재고: 매장은 읽기·발주·입고·폐기·조정 가능, 수량·PAR 은 매장 오버레이. 브랜드 화면은 매장 재고를 합산하지 않음(`brand-inventory.js:300-338`).

### A5. PAR·발주점·알림·유통기한
- 발주점 공식 3벌이 서로 다름: `inventory/reorder-suggestions`(일평균×리드타임+min, 제안=발주점−현재+일평균×7, `inventory-core.js:1132`) / `par-level`(사용량×리드타임×(1+안전%), `inventory-extra.js:355`) / PO `suggestions`(cur<min 이면 min×1.5−cur, `purchase-orders-crud.js:419-552` — 실제 대량발주 `useBulkOrder.ts` 가 쓰는 것). 문서 4-2 PAR 공식은 미사용. `StockAlert.suggested_order_qty` 로직 미구현.
- **일평균 사용량은 판매 차감이 아니라 `purchase`(입고) 원장으로 계산**(`inventory-extra.js:451-546`), 수동 호출만.
- stock_alerts low/out 생성 함수 2벌(`utils/stockAlerts.js:21`, `inventoryDeductionService.js:90`), 푸시/메일 발송 없음.
- 배치 `inventory_batches`(expiry, unit_cost, status active/depleted/expired/disposed) — `'expired'` 로 바꾸는 코드 0, 스케줄러 0. FIFO 는 수량 차감에만(expiry→received 순), 배치 부족 시 notes `[batch_shortfall]`.

### A6. 판매 차감
- 트리거: 주문이 `completed` 로 바뀔 때 1곳(`routes/orders-crud.js:1712-1822` — 🔒보호 파일). 별도 트랜잭션, 실패해도 주문 완료. orders-payment/views 는 import 만.
- 우선순위: 레시피(products.recipe_id→recipe_ingredients) → 직결(products.ingredient_id 1:1) → 상품 자체 재고. 세트=set_components 펼침, 옵션=option_ingredients×수량. **단위 환산 없음**(qty×주문수량).
- 차감은 `Recipe`(recipe_id) 계통만 — `ProductRecipe` 계통은 차감에 안 씀.
- **void/취소/환불 시 재고 복원 미구현**(취소는 포인트 환불만, :1847).
- dev: 완료 주문 706 vs order_deduct **4건**(2026-07-12 매장 38). 매장 5 완료 315건 차감 0. 원인 = 메뉴 140 중 **레시피/재료 연결 10개, 무연결 130**. `Order #null - undefined x2` 원장 2건.

### A7. 재고 평가
- **RA·BG 재고 총액 API 없음**(요약은 건수·monthly_loss 만). FC/공급업체 `total_stock_value` = 재고×**판매가**(원가 아님).
- 가중평균 원가는 **매장 구매자의 PO 수령 때만** `writeStoreCost`(`purchaseOrderReceive.js:131-151`; 매장 소유=ingredients.unit_cost, 브랜드 공유=restaurant_ingredient_costs). 브랜드/FG 수령은 원가 안 바뀜. 수동 입고는 배치 unit_cost 만.
- `writeStoreCost` 는 `cost_change_logs` 를 안 씀(costSync·reconcile·retroApply 만 씀).
- 배치 unit_cost 는 기록만 — FIFO 원가 계산 없음.

### A8. 화면·권한
- RA `/restaurant/:id/inventory`, `/stock-take`(SA·FG·BG·FM·BM·RA·Staff), BG `/pos/brand-inventory`, FG `/pos/foodcourt/general/inventory`, 공급업체 `/pos/supplier/inventory`, `/pos/stock-ledger`(일괄 링크).
- 문서는 Staff 입고/실사 X 인데 백엔드 inventory-core 역할 검사 0(checkRestaurantAccess 가 Staff 통과).
- 요금제 게이트: `inventory_management` / `fc_inventory`.

## B. 발주(PO)

### B1. 상태
- ENUM: draft, pending_approval, submitted, confirmed, shipped, in_transit, delivered, partial_received, received, cancelled, closed, delivery_failed. `RECEIVABLE_STATUSES`(utils/poStatuses.js:11).
- 제출 게이트 `applySubmitGate` 단일(submit·bulk auto_submit·mark-sent-external·direct-purchase·seller on-behalf). 오너 승인 기본 ON(소유 링크 있을 때).
- **`closed` 는 어디서도 안 씀**(읽기만). 구매자 취소는 draft/submitted/pending_approval 만, 이후는 반품.
- **예산·지출한도·승인 금액기준 없음.** 금전 게이트는 판매자별 credit_limit 하나 + MOQ(2026-10-05 구현·미배포).

### B2. 생성
- 수동/카트(localStorage)→bulk(판매자별 1 PO, 같은 판매자 초안 머지), 대기(staging) 화면, 직접구매(한 트랜잭션에 수령·결제), 판매자 대리 주문.
- 매핑(`IngredientSellerProduct`) 필수(시스템관리자 판매자 제외). **클라이언트가 unit_price 를 보내면 그 값 사용**(crud.js:974).
- **정기 발주·템플릿 없음.** 저재고 제안은 B1 의 1.5×min 공식.

### B3. 수령
- `/receive` 라인별 split(정상·short·damaged·wrong_item·pending), 초과 수령 차단. damaged/wrong_item → 자동 반품요청(재고 무변화), short/pending → discrepancy 칸만.
- 재고 = qty×unit_conversion, InventoryBatch(unit_cost = split 단가 또는 라인 단가) + 원장 purchase. Product/BrandProduct/ProductIngredient 라인은 current_stock+원장만(배치·원가 없음).
- 원가: 매장 구매자만 가중평균, 입고가 = `invoiced_unit_price ?? unit_price` ÷conv ×base_quantity. **수령 split 단가는 배치에만, 가중평균엔 안 들어감**(:110 vs :138).

### B4. 반품
- received 이후, 누적 ≤ 수령량, 판매자 승인(외부는 구매자 자가 승인). 승인 시 재고 return_out(+판매자 쪽 return_in), credit note 인보이스 발행.
- **반품은 배치·원가를 되돌리지 않음.**

### B5. 청구서·대조·결제
- 거래 청구서 자동 발행은 status==received 일 때만 — **partial_received 는 청구서 없음**, 줄은 **quantity_ordered** 기준(`purchaseOrderService.js:288-347`). 배송비는 additional_charges.
- PO↔공급업체 인보이스 대조(`routes/cost-reconciliation.js`, `InvoiceReconcilePage.tsx`, 브라우저 OCR) — invoiced_unit_price/qty 기록, 매장 원가 덮어씀, 소급 반영(retroApplyPrice), 외부 상품가 갱신→costSync. **2-way(PO↔인보이스)만 — 수령량 대조 없음(3-way 없음).** 오너는 총액 대조만. (메모리 «원가 대조 미착수» 와 PURCHASE_ORDER_SYSTEM.md:2412 «미구현» 은 낡음.)
- **PO 세금 계산 없음 — tax_amount 항상 0**; 세금은 대조 때 invoice_tax 로만.
- 결제: PO 행에 기록, 현금+열린 시프트 1개면 CashMovement out. 개인금액(personal) → 상환 때 금고 이동. 월별 SOA 판매자는 건별 결제 400(PAY_VIA_SOA). 외부 월별 SOA 는 359d0949 진행 중.

### B6. 가격
- 판매자 카탈로그가 + 구매자 매핑가. 가격 이력 테이블 없음 — 수령 PO 라인에서 파생(`services/priceHistory.js`). 원가 변경 로그 `cost_change_logs`(costSync).
- 원가 정책: 우선 판매자 현재가 → costSync (TRADE_STRUCTURE.md:32-41 «매장 원가 = 공급업체 현재가 2경로») — **실제로는 수령 가중평균·대조 덮어쓰기가 매장 층을 다시 씀** → 문서와 코드가 다름(가중평균 vs 현재가 중 무엇이 정답인지 정해진 기록 미발견).

### B7. 구매 비용 리포트 (`routes/purchase-cost-report.js`)
- 발생주의(수령 상태 기준, 날짜 COALESCE(received_at, updated_at), 기본 90일), 품목별 횟수·수량·지출·평균/최저/최고/마지막가, 월별 추이, 직원식 분리(진행 중). 주석 `observation_only`.
- **판매자별·카테고리별·매장별 축 없음.** qty = COALESCE(invoiced_quantity, quantity_ordered) — **부분 수령도 주문량 전체로 계산**. 배송비·세금·반품(credit note) 제외. **LIMIT 200 행에서 합계 계산.**

## C. 원가 측정

### C1. 레시피 원가
- 공용식 `utils/recipeCost.js:56-71` 줄원가 = (unit_cost ÷ base_quantity) × 환산(레시피단위→재료단위); 0 단가=미정 null.
- 레시피 2계통: `Recipe`(차감에 쓰임, 저장 시 계산) / `ProductRecipe`(BG 판매상품, recalculate-cost 엔드포인트). `total_ingredient_cost` 는 **저장 시 스냅샷 — 재료 원가 바뀌어도 재계산 안 함**(costSync 는 거울 재료까지만).
- 조회 시 계산하는 곳 중 **단위 환산 빠진 곳 3**: `routes/recipes.js:631-634`, `routes/product-recipe.js:38-42,162`, `services/prepIngredientSync.js:53-70`.
- 옵션 원가·세트 원가 계산 없음(차감만). 수율/손실률 % 칸 없음(yield_amount/unit 만; prep 만들기 때 실수율 입력이 유일).
- 프론트 `productMargin.ts` 는 BG 판매상품 화면 1곳만 사용, `recipe_id` 연결은 원가 못 읽어 noCost.
- 매장 메뉴 마진 = `GET /restaurants/:rid/products/recipe-status` (`product-recipe.js:132-182`, price 0 방어 없음), 화면 `ProductRecipePage`.
- 미사용 테이블 `recipe_costs`, `ingredient_costs` 0행.

### C2. 이론 원가(매출×레시피) — **없음.** 매출 리포트 menuSales 에 원가 없음(dashboard.js:679), 원장에 금액 칸 없음.
### C3. 실제 원가(기초+매입−기말) — **없음.** 기간 마감·재고 스냅샷·월말 평가 0건.
### C4. 차이 분석(재료별 실제 vs 이론 사용량) — **없음.** 폐기 리포트·조정 금액 리포트 없음. 실사 손실 합계만(단위 버그 위 A3).
### C5. 원가율·메뉴 — 카테고리별 원가율·메뉴 엔지니어링·가격변경 영향 **없음**. 공급가 변동 알림 없음, `GET /api/cost-changes` 프론트 호출 0.
### C6. 손익 — P&L·인건비·경비 분류 **없음**. CashMovement 는 in/out·reason·source 만. 랜딩 `FeaturesPage.tsx:619` 가 «Expense tracking / Profit margins» 광고하나 OwnerReportsPage 에 없음.
### C7. 브랜드 다매장 원가 비교·합산 **없음**(매출·주문수만).

## D. dev 실측 요약(운영 미측정)
- products 140(레시피/재료 연결 10, 무연결 130) · recipes 18(총원가 0 인 것 7) · ingredients 87(활성 unit_cost 0 = 6) · product_ingredients 27(unit_cost 0 = 11)
- inventory_transactions 2111(purchase 1079 · adjustment 1021 · waste 5 · order_deduct 4 · production 2; 매장 1 의 2027행은 테스트 반복) · inventory_batches 1054 · stock_takes 0 · stock_alerts 1010(매장 1 out_of_stock 1004)
- PO 199(삭제 제외): received 152(그중 128 = 매장 1 줄 없는 헤더뿐 테스트성) · 줄 127 · 대조된 줄 0 · 세금>0 0 · 배송비>0 0 · 반품 3 · 최근 30일 발주 매장 1곳
- cost_change_logs 82(09-08~) · restaurant_ingredient_costs 13

## E. 문서·메모 낡은 곳(팀원이 발견, 고치지 않음)
- INVENTORY_MANAGEMENT_SYSTEM.md 헤더 «개발 예정», 파일위치 routes/inventory.js — 실제와 다름
- STOCK_LEDGER_UNIFICATION_DESIGN.md «코드 변경 0» — 실제 구현됨(주제는 목록 이관·일괄 링크)
- PURCHASE_ORDER_SYSTEM.md 4-3 생명주기·«어느 단계든 취소»·:2412 «원가 대조 미구현» — 낡음
- RECIPE_MANAGEMENT_SYSTEM.md :427-473 옛 식, :605-618 메뉴원가 3단계 미구현
- 메모리 project_po_invoice_cost_variance «미착수»·supplier-directory costSync 누락 — 낡음
