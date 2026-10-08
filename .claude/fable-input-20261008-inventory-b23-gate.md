# Fable 게이트 입력 — 재고→원가 묶음 2(측정층) + 묶음 3(발주 보강) (2026-10-08 · 작업방 98b2ea7c · 팀원 실측)

설계 = `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-3 · Ⅱ-4. 묶음 0+1 게이트 = `.claude/fable-verdict-20261008-inventory-ledger-gate.md`(PASS, 그 뒤 Ⅲ-B 2건 반영: 수동 입고 장부 금액·원가 log / LEDGER-002 분모).
코드 변경은 개발서버만 · 운영 쓰기 0 · 운영 읽기 1회(prod-query, 아래 준비도 실측).

## 운영 준비도 실측(읽기 전용, 2026-10-08)
활성 메뉴 758 중 레시피/재료 연결 75(전부 K-DINE 매장 8: 75/110) · with MIN Cafe 223·The Fire 126×3 연결 0 · 활성 재료 703 중 원가 0 = 98 · 최근 90일 판매 차감 1,025줄 · 완료 실사 0 · 90일 장부 있는 매장 2곳 · MySQL 8.0.46

## 묶음 2 — 바꾼 것
- 신규 서비스·유틸: `services/inventoryValuation.js`(재고 총액 RA=매장 소유+브랜드 공유 오버레이·storeCost 원가 / BG=product_ingredients 소유자 · 준비도) · `services/foodCostReport.js`(기간 원가·폐기·BG 창고판) · `utils/foodCostMath.js`(순수 계산) · `utils/productCost.js`(메뉴 1인분 지금 원가)
- 라우트: `routes/inventory-valuation.js`(GET /restaurants/:rid/inventory/valuation · /readiness — inventory-routes barrel, 재고 모듈 게이트 아래) · `routes/cost-report.js`(GET /restaurants/:rid/reports/food-cost · /waste — Staff 제외 COST_VIEW_ROLES + 재고 모듈 게이트, server.js 마운트 1줄) · product-ingredients `GET /valuation` · `GET /stock-cost` · `routes/brand-stock-takes.js`(BG 창고 실사 6개, /api/product-ingredients/stock-takes, server.js 1줄) · dashboard.js reports-summary 의 menuSales/categorySales 에 unit_cost·cost·margin_pct·cost_pct(try/catch — 실패해도 매출 숫자 그대로)
- 실사(inventory-core): 생성 시 category_ids(부분) · 완료는 센 항목만(안 센 것 skipped, 하나도 안 셌으면 400) · 시작 뒤 움직임 보정(차이 = (시작 이론 + 그 뒤 장부 변화, stock_take 제외) − 실측, variance·variance_value 를 완료 때 다시 써 둠) · 응답 skipped_count·movement_since_start
- 마이그 `scripts/migrate-stock-take-bg-warehouse.js`(deploy 등록 · dev 적용 · 2회차 0): stock_takes.owner_user_id 추가·restaurant_id NULL 허용 / stock_take_items.product_ingredient_id 추가·ingredient_id NULL 허용(expand-only) + 모델·연관 1줄
- 화면: `components/Inventory/sections/CostReadinessPanel.tsx`(재고 대시보드 위 카드: 재고 총액 · 레시피 연결 메뉴 · 원가 있는 재료 · 마지막 실사 / BG 는 총액 + 창고 실사 입구) · `pages/Reports/FoodCostTab.tsx`(보고서 «원가» 탭, Staff 숨김) · 메뉴 분석 표 «1개 원가·마진» 칸 · 실사 화면 분류 고르기·결과 한 줄·mode='brand'(/pos/brand-stock-take — App 라우트 + AuthContext 2곳·ProtectedRoute 1곳 허용 목록) · FC/공급업체 total_stock_value 라벨 «재고 판매가치»(supplier.json 값만) · 번역 inventory.json(costPanel·costReport·stockTakePage 키) 4언어 + glossary 3개

## 묶음 3 — 바꾼 것
- `utils/reorderMath.js`(compute·pickDailyUsage·ledgerUsage·onOrderQty) → inventory reorder-suggestions · par-level · calculate-usage(입고 기반 → 판매·폐기 장부 기반) 세 곳이 같은 답. reorder-suggestions 의 estimated_cost 가 기준양을 안 나누던 것(×1000 계열)도 같이 고침
- 부분 수령 청구서(`services/purchaseOrderService.js` createTradeInvoice): status received 이고 받은 양 0 < received < ordered 인 줄만 받은 양·금액으로. 수령 전 발행(브랜드 확정 시점)·받은 양 0(서비스) 은 주문량 그대로
- 대조 화면 `InvoiceReconcilePage.tsx`: 줄마다 «수령 N» + 청구 수량 ≠ 받은 수량이면 표시(서버 변경 0) · purchaseOrders.json reconcile 키 2개
- `inventoryDeductionService` 의 재고 알림 사본 제거 → utils/stockAlerts 한 곳
- 발주 창(OrderModal): `GET /api/cost-changes` 첫 화면 소비 — «원가 변경 N건 · 마지막 old → new (±%)»

## 설계와 다르게 한 것 / 안 한 것 (팀원 판단 — 판정 요청)
1. **BG 재고 총액·창고 원가·창고 실사의 범위 = 소유 계정(product_ingredients.owner_user_id)** — 설계는 `/brands/:bid/...`. BG 재고 화면이 소유 계정 범위라 같은 범위로 맞춤. stock_takes 에 entity_type 대신 owner_user_id 칸
2. **«설명 안 되는 차이» 에 실사 차이를 넣음** — 설계 Ⅱ-3-B 정의는 stock_take 를 «설명 가능» 쪽에 넣었으나, 같은 절 증명 예시(설명 불가 0.05 = 실사에서 5 g 모자람)와 맞추려면 실사 차이는 «원인 모름» 이어야 함. 그래서 설명 가능 = 폐기·조정·만들기·초기재고, 설명 불가 = 실사 차이 + 원가 변동분(따로 표시)
3. **기초·기말 = 장부 역산 × 지금 원가 한 길** — 설계는 «실사가 있으면 그 실사 값». 장부 단일화 뒤엔 실사가 장부를 실측으로 맞추므로 역산이 같은 수량을 낸다 → source 만 'stock_take'/'ledger' 로 표시. 기간 중 원가가 바뀐 몫은 «원가 변동분» 으로 보임
4. 메뉴 원가: 레시피 합을 **수율로 나누지 않음**(판매 차감이 수율로 안 나누므로 이론 원가와 같은 질문). 옵션·세트 구성품 원가 제외. 화면 productMargin.ts 와의 동일 케이스 jest 는 **안 함**(productMargin.ts 는 BG 판매상품용 — 대상이 다름)
5. 매출 = utils/revenueOrders(완료+서빙) — reports-summary 는 'completed' 만 쓰고 있어 같은 기간 두 화면 매출이 다를 수 있음(기존 불일치, 고치지 않음)
6. **유통기한 자동 처리 안 함** — 배치 status 를 'expired' 로 바꾸면 판매 차감 FIFO(status active)와 임박 목록(status active)이 그 배치를 빼 버려 동작이 바뀜. 기존 임박 목록이 지난 날짜도 이미 보여 줌. 만료 stock_alerts 유형도 안 함 — 알림이 «재료당 미해결 1건» 구조라 부족 알림과 서로 덮음
7. **PO suggestions(purchase-orders-crud.js) 를 reorderMath 로 안 바꿈 · 0-③ 구매 비용 보고서 안 함** — 두 파일 다 방 359d0949 미커밋 변경 중(설계의 «그 방 커밋 뒤»)

## 실측 결과
- jest: food-cost-math 8/8 · reorder-math 7/7
- 실호출(데모 38/브랜드, 끝에 원복): 원가 리포트 줄 기초 0·매입 1.00·기말 0.45·실제 0.55·이론 0.40·폐기 0.10·설명 불가 0.05·원가 변동 0 · 폐기 리포트 spoiled 10 g 0.10 · 날짜 형식 오류 400 · BG 창고 원가 200 (4/4) / 실사: 부분 2개만 · 센 1개만 반영·안 센 것 그대로·skipped 1 · 움직임 보정(기대 80=100−20, 차이 5, 0.1) · BG 창고 실사(7 반영·장부 −3 금액 −6) · RA 가 본사 실사 접근 403 (5/5) / 메뉴 원가 레시피 150 g@20/1000=3 · 직결 0.02 · reports-summary 200 + 칸(매장 5: 30메뉴 중 26 상품 매칭) / 발주점: 재고 100>발주점 70 제안 없음 · 재고 60 → 80 · 장부 사용량 10 · 금액 1.6 · PAR 같은 답 (3/3) / 부분 수령 청구 8×2=16·5 → 총 21 · 수령 전 발행 주문량 그대로 (2/2) / 재고 총액 38=9,852.74·준비도 0/19 메뉴·남의 매장 403
- health-check 새 2건: 원가 ① 기간 원가 리포트 = 장부 · 원가 ② 재고 총액·준비도·원가 리포트 남의 매장 403 (남의 매장 = 재고 모듈 켜진 곳으로 고름) → inventory 55/55 · security 73/73 · 전체(verify-all 안) 통과
- 고장주입(pm2 재시작 뒤): F1 이론 부호 뒤집기 → jest 4 실패 + health 원가 ① ✗ · F2 움직임 보정 끄기 → 실사 테스트 ✗(차이 25) · F4 오는 중 발주량 무시 → jest ✗ · F5 부분수령 끄기 → 청구 테스트 ✗ · **F3 cost-report 의 매장 접근 검사 제거 → 여전히 403(반증 불가)**: inventory 라우터(`/api/restaurants`)의 `router.use('/:restaurantId', checkRestaurantAccess)` 가 같은 주소 앞단에서 먼저 막음 = 이중 방어. 전부 원복 후 통과
- verify-all --full: 실브라우저 mount sweep 직전까지 전부 통과(✗ 배포 준비 = 배포 기록 파일) — 타입 기준선 99.8s 통과 · health-check · 인스펙션 · 인쇄 라우트 · i18n · 매출 정의 · 통화 · 타임존 · 디자인. **mount sweep 은 서버 메모리 부족으로 시스템이 중간 정지 → 확인 못 함**(Irene 재실행 허락 대기). **실브라우저 클릭 흐름도 아직 못 돌림**(스크립트 준비됨: 재고 대시보드 카드·원가 탭·메뉴 원가 칸·실사 분류·BG 창고 실사 시작→완료)
- build:dev 1회(이 방 파일 경고 0) · print-guard 8/8 · design-guard 신규 0 · timezone 신규 0 · inspection stock-ledger 002·003·004 통과
