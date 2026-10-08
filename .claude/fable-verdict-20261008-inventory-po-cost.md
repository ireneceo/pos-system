# [Fable 판정] 재고 → 발주 → 원가 측정 — 구조 검토·확장 설계 (2026-10-08)

> 입력: `.claude/fable-input-20261008-inventory-po-cost.md`(팀원 실측 · dev DB) · 단일 기준 `docs/TRADE_STRUCTURE.md` · 관련 `INVENTORY_MANAGEMENT_SYSTEM.md` · `PURCHASE_ORDER_SYSTEM.md` · `RECIPE_MANAGEMENT_SYSTEM.md`
> 작성: Fable 5.1 · 코드·docs·DB 수정 0 · 운영 쓰기 0. 이 사안의 Fable 호출 1회차(설계). 2회차는 묶음별 게이트 판정으로만.
> 내가 직접 다시 읽은 것: `utils/recipeCost.js` · `services/purchaseOrderReceive.js:95-160` · `services/storeCost.js` · `routes/inventory-core.js`(실사 840-1050 · 폐기 555-580) · `routes/product-ingredients.js:610-625, 1090-1131` · `routes/orders-crud.js:1712-1822`(🔒 읽기만) · `services/inventoryDeductionService.js` · `models/InventoryTransaction.js` · `routes/purchase-cost-report.js` · `services/priceHistory.js` · `routes/recipes.js:625-640` · `routes/product-recipe.js:30-48,155-170` · `utils/poStatuses.js` · `TRADE_STRUCTURE.md` 전체. dev DB 는 건수 몇 개만 다시 세었다(활성 메뉴 97 중 레시피 7·다이렉트 1 — 입력의 140/10 은 비활성 포함 수치, 결론 동일).
> 운영 실사용 수치는 **아무도 측정하지 못했다**(이 판정의 한계 — Ⅱ-0 에 측정 지시를 넣었다).

---

# Ⅰ. Irene 보고문 (팀원이 그대로 전달)

## 0. 한 줄 결론

**뼈대는 맞게 짜여 있습니다. 재료·단위·원가·장부·발주의 «그릇»은 더 만들 것이 없습니다. 지금 없는 것은 그릇이 아니라 ① 장부가 새지 않게 막는 마개와 ② 장부 위에 돈을 얹어 «얼마 들어왔고 · 얼마 쓰였고 · 얼마가 사라졌나»를 읽어 내는 **측정층**입니다. 그리고 그 어떤 기능보다 먼저, 운영 매장의 메뉴가 레시피에 거의 연결돼 있지 않으면 측정은 0 으로 나옵니다 — 이것이 가장 큰 변수입니다.**

## 1. 구조는 잘 된 건가 — 뼈대 다섯은 ○

| 뼈대 | 지금 상태 | 판정 |
|---|---|---|
| 재료는 한 목록(Stock Items), 출처는 셋 중 하나(사는 것·파는 것·만드는 것) | 통합 완료, 배포 게이트가 재발을 막음 | ○ 그대로 |
| 단위 다섯 칸(취급단위·기준숫자·포장단위·기준양·가격), 레시피=취급단위, 발주=포장단위 | 확정·구현됨 | ○ 그대로 |
| 원가 2경로(재판매=공급업체 가격 · 레시피=재료비 합), 매장 층/브랜드 층 분리 | 구현됨 | ○ (단 아래 «가중평균» 한 가지는 원칙과 어긋남 — 컨펌 ③) |
| 재고 변동은 한 장부(`inventory_transactions`)에 남긴다 | 장부는 하나이나 **장부를 안 거치고 숫자를 바꾸는 문이 5개** | △ 마개 필요 |
| 발주 → 수령 → 재고·원가 반영 → 청구서 → 대조 → 결제 | 전 구간 구현됨, 반품·개인금액·월별 SOA 까지 | ○ 작은 보강만 |

즉 **«새 테이블·새 개념»은 필요 없습니다.** 재료·원가에 네 번째 목록을 만들지 말라는 규칙(`TRADE_STRUCTURE`)에도 이번 설계는 새 목록을 하나도 만들지 않습니다.

## 2. 지금 «완벽 관리»를 막는 것 — 세 등급

**A. 숫자가 틀리는 결함 (바로 고칠 것 · 판단 불필요)**
1. 실사 손실 금액이 기준양으로 안 나뉘어 **1000 g 짜리 재료는 1000배**로 나옵니다(`variance_value`). 재고 화면의 «이번 달 손실»이 이 값입니다.
2. 레시피 원가를 조회 때 다시 계산하는 자리 3곳이 단위 환산을 빼먹었습니다(저장 때는 맞게 계산하는데 보여 줄 때 틀립니다).
3. 구매 비용 보고서가 **부분 수령도 주문량 전체**로 계산하고, 상위 200줄에서 합계를 냅니다. 보고서 합계가 보고서 줄 합과 안 맞을 수 있습니다.
4. 폐기할 때 재고는 0 아래로 안 내려가게 자르는데 장부엔 요청량 그대로 적혀 둘이 어긋납니다.

**B. 장부가 새는 구멍 (측정의 전제 · 이것부터 막아야 측정이 의미 있음)**
- 장부를 거치지 않고 재고 숫자를 바꾸는 문이 5개 — 브랜드 재고 화면의 **인라인 수정**(가장 자주 쓰는 길), 일반재고 수정, 푸드코트 입고·조정(장부 0건), 메뉴 수정 API 가 재고 칸을 거르지 않음, 상품 생성·수정.
- 장부에 **금액 칸이 없습니다.** 그래서 «재고 총액 · 폐기 금액 · 기간 사용 금액» 어느 것도 지금 구조로는 못 셉니다. (배치에 입고 단가는 있으나 계산엔 안 쓰입니다.)
- 폐기 사유 코드가 없고(자유 메모만), 유통기한 지난 배치를 «만료»로 바꾸는 자동 처리가 0 입니다.

**C. 없는 기능 (측정층)**
- 재고 총액(원가 기준) · 기간 원가(기초 + 매입 − 기말) · 이론 원가(판매량 × 레시피) · 재료별 차이 분석(이론 사용량 vs 실제 사용량) · 폐기 리포트 · 메뉴·카테고리별 원가율 — **전부 없음.**
- 발주점 공식이 3벌이고 서로 다르며, 일평균 사용량을 **판매 차감이 아니라 입고 기록**으로 계산합니다(많이 산 재료가 많이 쓴 것으로 보임).
- 실사는 전 재료 입력 강제(부분 실사 불가), 실사 시작 후 판매·입고 변동을 보정하지 않음, 브랜드 창고 실사 없음.

## 3. 확장할 기능 — 네 묶음, 이 순서로

| 묶음 | 내용 | 끝나면 Irene 이 보게 되는 것 | 크기(대략) |
|---|---|---|---|
| **0. 결함 수정** | 위 A 1~4 | 실사 손실 금액·레시피 원가·구매 보고서 숫자가 맞아짐 | 1일 |
| **1. 장부 = 단일 진실** | 장부에 금액 칸(그때 원가 스냅샷) 추가 · 모든 재고 변동이 한 함수로 장부 통과 · 새는 문 5개 봉인 · 폐기 사유 코드 · «장부 합 = 현재고» 자동 검사 | 재고 이력에 금액이 붙고, 재고 숫자가 이유 없이 바뀌는 일이 사라짐. 여기서 **매장 원가 = 마지막 매입가**로 정리(컨펌 ③) | 2~3일 |
| **2. 측정층** | 재고 총액 · 기간 원가(기초+매입−기말, 기말=실사) · 이론 원가(판매×레시피) · 재료별 차이 · 폐기 리포트 · 메뉴·카테고리 원가율 · 실사 보강(부분 실사·시작 후 변동 보정·브랜드 창고 실사) · **«원가 측정 준비도»** 표시 | 보고서 탭에 «원가» 가 생겨 월별로 «매출 ↔ 재료비 ↔ 원가율 ↔ 어디서 샜나»를 봄 | 3~4일 |
| **3. 발주 보강** | 발주점 공식 1벌로 통일(사용량=판매 차감 기준·발주 중 수량 반영) · 부분 수령 청구서·보고서 = 받은 양 · 수령량 vs 청구량 대조 표시(3-way) · 유통기한 만료 자동 처리·알림 | 저재고 제안이 실제 사용량대로 나오고, 부분 수령·청구 숫자가 맞음 | 2일 |

0 → 1 → 2 → 3 순서가 고정인 이유: 2 는 1 의 금액 칸 없이는 못 만들고, 3 의 발주점은 1 의 장부가 정확해야 맞습니다. **1·2 는 돈·장부·마이그레이션이라 묶음마다 Fable 게이트 판정 1회**가 붙습니다.

## 4. 만들지 않기로 한 것 (이유)

- **손익(P&L)·인건비·경비 분류** — «재고→발주→원가»의 바깥입니다. 이번엔 **재료 원가율까지**가 경계이고, P&L 은 별도 설계 1회가 맞습니다(랜딩 페이지가 «Expense tracking / Profit margins» 를 광고하고 있어 — 컨펌 ①).
- **매장 간 재고 이동** — 지금 브랜드→매장은 발주로 흐르고, 매장↔매장 이동 실수요가 확인되지 않았습니다. 필요해지면 장부 유형 하나 추가로 됩니다(1 의 구조가 그 자리를 비워 둡니다).
- **정기 발주·발주 템플릿·예산 한도** — 원가 측정과 무관하고 요청도 없었습니다. 목록만 남깁니다.
- **완료 주문 취소 시 재고 되살리기** — 차감은 «완료» 때 한 번이고, 완료 뒤 취소는 음식이 이미 나간 것이라 되살리지 않는 것이 맞습니다. 결함이 아니라 규칙으로 문서에 적습니다.
- **가격 변동 알림 메일** — 원가 변경 기록(`cost_change_logs`)은 이미 쌓이므로 발주 줄 가격 이력 표시(이미 있음)로 충분. 알림은 뒤로.

## 5. 기능보다 먼저 — 데이터 준비

dev 기준 활성 메뉴 97개 중 레시피 연결 7 · 재고아이템 직결 1. 완료 주문 706건에 재고 차감 기록은 4건입니다. **운영 매장은 측정 못 했습니다.** 연결이 없는 메뉴는 팔려도 재고가 안 빠지고, 이론 원가도 0 입니다 — 측정층을 다 만들어도 그 매장 숫자는 비어 있습니다.

그래서 묶음 2 에 **«원가 측정 준비도»**(메뉴 연결률 · 원가 있는 재료 비율 · 공급처 연결률 · 마지막 실사일)를 넣어 매장마다 «지금 몇 % 가 측정되는가»를 먼저 보이게 합니다. 운영 K-DINE 의 메뉴 연결은 화면에서 사람이 하는 일이라 Irene(또는 매장) 몫입니다 — 컨펌 ⑤.

## 6. Irene 컨펌 요청 (각각 Fable 권고 첨부)

| # | 정할 것 | 선택지 | Fable 권고 |
|---|---|---|---|
| ① | 이번 범위의 끝 | (a) 재료 원가율까지 / (b) P&L(인건비·경비)까지 | **(a).** P&L 은 입력 데이터(급여·경비) 자체가 없어 별도 설계. 랜딩 문구는 그때 맞추거나 지금 «원가 추적»으로 고침 |
| ② | 네 묶음 순서·착수 | (a) 0→1→2→3 순서대로 / (b) 2(보고서)부터 | **(a).** 금액 칸·새는 문 없이 만든 보고서는 틀린 숫자를 예쁘게 보여 줄 뿐 |
| ③ | **매장 원가의 뜻** | (a) 지금처럼 수령 때 **가중평균** / (b) **마지막 실제 매입가**(수령·대조 때 그 값으로 덮어씀) | **(b).** Irene 원칙 «평균가 같은 정책 분기 없다 · 매장 원가 = 공급업체(GIT) 판매가»와 일치. 가중평균은 아무도 낸 적 없는 숫자(GIT 가 15.00 인데 원가 15.06)라 설명이 안 됨. 재고 총액은 장부 금액 스냅샷으로 세므로 평균이 없어도 됨. 코드가 문서와 달랐던 자리를 문서 쪽으로 맞추는 것 |
| ④ | 재고 작업 권한 | (a) 지금처럼 매장 접근만 있으면 전부 가능(Staff 포함) / (b) 입고·실사 입력·폐기 = Staff 가능, **초기재고·조정·실사 확정 = 매니저 이상** | **(b).** 주방 일상 작업은 막지 않고, 숫자를 통째로 바꾸는 세 가지만 잠금. 승인 단계를 따로 만드는 것보다 가볍고 충분 |
| ⑤ | 운영 메뉴 연결 작업 | (a) 준비도 화면이 나온 뒤 Irene/매장이 화면에서 연결 / (b) 팀원이 이름 매칭 스크립트로 일괄 연결 | **(a).** 이름 매칭 자동 연결은 2026-09 에 네 번 사고 난 길. 준비도 화면이 «무엇이 안 걸렸나»를 목록으로 주면 연결은 사람이 한다 |

⑥(보고용·결정 아님): 묶음 1 과 2 는 운영 DB 마이그레이션(장부 칸 2개 추가·폐기 사유 ENUM)과 돈 계산이 들어가므로 묶음마다 Fable 게이트 1회 · 운영 배포는 묶음 단위로 Irene 지시 때만.

---

# Ⅱ. 팀원 설계 (구현 착수 시 따를 절단면)

## Ⅱ-0. 원칙 · 금지 · 사전 측정

**원칙**
- 새 테이블 0 · 재료/원가 목록 신설 0(`TRADE_STRUCTURE` «같은 개념에 새 목록 금지»). 장부 칸 2개와 폐기 사유 칸 1개만 늘린다. ENUM 은 `lib/enumExpand` 로 expand-only.
- 재고를 바꾸는 코드는 **한 함수**(`services/stockLedger.js` 신설 — 아래 Ⅱ-2-A)를 거친다. 직접 `current_stock` 을 쓰는 코드는 이 함수 안에만 남는다.
- 원가 읽기는 기존 `services/storeCost.effectiveStoreCost`(매장) · `product_ingredients.unit_cost`(브랜드 재고아이템) 그대로. 새 원가 소스 금지.
- 단위 의미는 §2-2 그대로: 장부 `quantity_change` 는 취급단위, `unit_cost` 는 **기준양의 가격**, 금액 = `quantity_change ÷ base_quantity × unit_cost`.

**금지(🔒)**
- `routes/orders-crud.js` 무접촉. 차감 호출부가 `order.order_number || order.id` 만 넘기므로 장부에 `order_id` 를 채우려면 **`services/inventoryDeductionService.js` 안에서** `(restaurant_id, order_number)` 로 주문을 1회 조회한다(🔒 파일 수정 없이 해결). `KitchenDisplayPage.tsx`·`POSTerminalPage.tsx` 등 보호 8파일 무접촉. 각 묶음 끝에 `check-print-guard.js` 8/8.
- 다른 작업방 범위(359d0949: `ingredient_categories.is_staff_meal`·purchase-cost-report `by_purpose`·external SOA / 0ec1e1c3: `delivery_zones`) 파일은 그 방이 커밋한 뒤에만 손댄다. 묶음 0-③(purchase-cost-report) 은 359d0949 커밋 후 착수.
- docs/ 수정은 두 방의 게이트가 끝난 뒤 한 번에(Ⅱ-6).

**사전 측정(묶음 2 착수 전 · 읽기 전용)**
- 운영 준비도 숫자를 `scripts/prod-query.js`(읽기 전용 계정)로 1회 센다: 활성 메뉴 수 · 레시피/다이렉트 연결 수 · 원가 0 인 활성 재료 수 · 최근 90일 `order_deduct` 건수 · 완료 실사 수 · 가격 ≠ 공급업체 현재가인 매장 원가행 수. 결과는 작업기록에 «운영 실측» 으로 적고 Irene 보고에 붙인다. 이 방이 운영 읽기 권한이 없으면 «Irene 할 일»로 남긴다.

## Ⅱ-1. 묶음 0 — 결함 수정 (판단 없음 · 기계 게이트로 증명)

| # | 자리 | 고침 | 증명 |
|---|---|---|---|
| 0-① | `routes/inventory-core.js:952`(variance_value) · `:1023`(theoreticalValue) · `StockTakePage.tsx:401` · 요약 `monthly_loss :258-269` | 금액 = `variance ÷ (base_quantity‖1) × unit_cost`. `StockTakeItem` 에 `base_quantity` 스냅샷 칸이 없으므로 생성 시 `unit_cost` 와 함께 저장하는 칸 추가 **대신** 재료 JOIN 으로 읽는다(실사 중 기준숫자는 레시피 잠금으로 거의 안 바뀜 — 바뀌면 다음 실사부터 맞음. 칸 추가 안 함) | jest: base_quantity 1000 재료 variance 500 g · unit_cost 27.9 → 13.95 (예전 13,950). dev 데모 38 실사 1회 생성→완료 실호출 |
| 0-② | `routes/recipes.js:631-634` · `routes/product-recipe.js:38-42,162` · `services/prepIngredientSync.js:53-70` | 전부 `utils/recipeCost.computeLineCost(ingredient, qty, unit)` 호출로 교체(0 단가 → null → «미정» 표시, 0 으로 덮지 않음) | 레시피 줄 `kg` ↔ 재료 `g` 인 데모 데이터 1건으로 GET 값 = 저장값 일치. 세 자리에 제 계산 남아 있으면 실패하는 grep 게이트 1줄(`check-design-guard` 식의 패턴 검사에 `unit_cost\s*/\s*baseQty` 직접 계산 금지 추가는 과함 — 대신 jest 로 세 핸들러 결과 비교) |
| 0-③ | `routes/purchase-cost-report.js:73-75,135-139` | 수량 = `COALESCE(invoiced_quantity, quantity_received, quantity_ordered)`(`quantity_received` 는 NULL 일 때만 주문량 폴백 — 0 수령은 0). 합계·월별은 **LIMIT 없는 집계 쿼리**로 따로, 품목 표만 LIMIT 200 + `has_more` | 데모 매장에 부분 수령 PO 1건 만들어 spend 가 받은 양 기준인지 실호출. 201번째 품목이 합계에 들어가는지(합성 데이터) |
| 0-④ | `routes/inventory-core.js:565-574` 폐기 | 장부 `quantity_change = -(currentStock - newStock)`(실제 깎인 양). 요청량 > 재고면 응답에 `clamped: true` | 재고 3 에 폐기 5 → 장부 −3, 응답 clamped |
| 0-⑤ | `services/inventoryDeductionService.js:226,316` | `Order #null - undefined` 방지: orderNumber 없으면 `Order #${id}` · 장부 `order_id` 채움(위 🔒 우회 조회) | 데모 주문 완료 1건 → 장부 `order_id` 非null |

묶음 0 은 `check-sensitive-diff.js` 가 «돈» 으로 찍어도 **길이 하나**라 게이트 없이 팀원이 끝낸다(§「파급 크다·길이 하나 = 팀원 실행 + 기계 게이트」).

## Ⅱ-2. 묶음 1 — 장부 = 단일 진실

### A. 장부 칸 2개 + 기록 함수 1개
- 마이그 `scripts/migrate-ledger-cost-columns.js`(deploy · 멱등 · registry 등록): `inventory_transactions` 에 `unit_cost DECIMAL(12,4) NULL`(그 순간 기준양 가격 스냅샷) · `cost_value DECIMAL(12,2) NULL`(부호 = quantity_change 부호). 기존 행은 NULL 로 둔다 — **백필 금지**(그때 원가를 모른다). 리포트는 NULL 을 «금액 미상 N건» 으로 센다.
- `services/stockLedger.js` 신설 — `record({ target, entity, type, quantityChange, unit, costBasis, refs:{order_id, purchase_order_id, stock_take_id, batch?}, notes, userId, transaction })`.
  - `target` = 넷 중 하나(§2-1·PO 줄 타깃 불변식과 같은 넷): `ingredient`(매장 소유/브랜드 공유 → `applyStock` 오버레이 규칙 그대로) · `product_ingredient` · `product` · `brand_product`. `foodcourt_product` 는 entity ENUM 에 `foodcourt` 가 이미 있으므로 `product` 계열로 받되 칸은 `product_id` 를 쓰지 않고 — ⚠ FoodcourtProduct 는 장부에 FK 칸이 없다. **칸 추가 대신** `notes` 아닌 `entity_type='foodcourt'` + `product_id`(foodcourt_products.id) 로 적고 주석에 명시. (칸을 늘리는 쪽이 깨끗하지만 푸드코트 재고는 «정석 밖·운영 수치 미측정»(§5-7)이라 최소 변경.)
  - `costBasis`: `{ unit_cost, base_quantity }` 를 호출부가 주면 그대로, 없으면 함수가 **그 순간 원가**를 읽는다 — 매장 재료 `effectiveStoreCost` · 재고아이템 `unit_cost` · 상품 자체 재고는 `cost_price`(없으면 NULL). `cost_value = round(qty ÷ base_quantity × unit_cost, 2)`.
  - 함수 안에서 **같은 트랜잭션으로** 현재고 갱신 + 장부 insert. 트랜잭션을 호출부가 안 주면 함수가 연다. 장부 insert 실패 = 전체 롤백(현행 «장부 실패 무시» 제거).
- 기존 기록 경로를 전부 이 함수로 옮긴다: `inventory-core`(initial·receive·waste·adjust·실사 완료) · `inventory-extra`(일반재고 receive/adjust·수동 deduct·배치 폐기) · `inventory-produce` · `purchaseOrderReceive.applyReceiptToStock` · `inventoryDeductionService` · `seller-orders` 출고 · `po-returns` · `product-ingredients adjust-stock`. 각 자리의 금액 근거: 입고 = 들어온 가격(`invoiced_unit_price ?? unit_price` ÷ conv × base) · 반품 = 그 PO 줄 가격 · 그 밖 전부 = 그 순간 원가.

### B. 새는 문 5개 봉인
| 문 | 조치 |
|---|---|
| `PUT /api/product-ingredients/:id` `current_stock`(:619) · POST(:578) | PUT 허용필드에서 `current_stock` 제거. 화면 `useInlineStockEdit.ts:66-69` 는 `POST /:id/adjust-stock`(장부 있음)으로 교체, `adjustment = new − current`, `transaction_type:'adjustment'`, reason 필수(«Inline edit»). POST 생성은 `current_stock>0` 이면 생성 직후 `record(type:'initial')` |
| 일반재고 PUT `current_stock`(`inventory-extra.js:305`, `general-stock.js:360`) | 허용필드 제거 → adjust 경로만. `general_stock_transactions` 별도 원장은 **그대로 두되** adjust 가 두 원장 모두 쓰지 않도록 — 일반재고는 자기 원장 하나만 쓴다(장부 둘에 같은 사건 금지). 금액 칸은 일반재고 원장에도 같은 두 칸 추가 |
| 푸드코트 adjust/receive(`foodcourt-inventory.js:239,285`) | `record()` 호출 추가(entity foodcourt). transactions 스텁(:303-326)은 장부 조회로 교체 |
| `menu.js:682,758` `{...req.body}` | `current_stock`·`unit_cost` 등 재고 칸을 화이트리스트로 거른다(보내는 화면 유무와 무관하게 봉인) |
| `foodcourt-products.js:629,724` · `brand-products.js:1020,1182` | 생성 시 `current_stock>0` → `record('initial')`. 수정 시 `current_stock` 무시(adjust 경로 안내 400 `USE_ADJUST`) |

### C. 폐기 사유 코드 · 배치 소진
- `inventory_transactions.reason_code VARCHAR(32) NULL`(마이그 같은 파일) — 값 어휘는 코드 상수 `utils/wasteReasons.js`: `spoiled · expired · overcooked · breakage · prep_loss · other` (DB ENUM 아님 — 어휘가 늘 때 마이그 없이. 실사 `variance_reason` ENUM 은 그대로).
- 폐기 요청은 `reason_code` 필수. 폐기도 `deductStockFIFO` 로 배치를 줄인다(지금은 수량만 줄고 배치는 안 줄어 유통기한 리포트가 부푼다). 배치 폐기(`batches/:id/dispose`)는 `reason_code='expired'` 기본.

### D. 매장 원가 = 마지막 실제 매입가 (컨펌 ③ (b) 승인 시)
- `services/purchaseOrderReceive.js:131-151` 가중평균 블록 → `writeStoreCost(entity_id, ingredient, incomingCostPerIng)`. `weighted` 계산 삭제. 대조(`cost-reconciliation`)·수동(`ingredients.js:760,797`)은 이미 덮어쓰기라 변경 0.
- `writeStoreCost` 가 `cost_change_logs` 를 쓰도록(현재 안 씀 — 입력 A7) `source:'receive'|'reconcile'|'manual'` 로 1줄. 되돌리기는 기존 `restoreCosts` 경로가 그대로 읽는다.
- 재고 총액은 **장부 금액 스냅샷**(Ⅱ-3-A) 으로 세므로 평균이 필요 없다. 문서 §2-3 «쓰는 손 3개 … 수령(가중평균)» 은 Ⅱ-6 에서 «수령(마지막 매입가)» 로 고친다.
- (컨펌 ③ (a) 유지 시) D 전체 생략, 대신 문서 §2 에 «매장 층은 수령 가중평균» 예외를 명시해 문서와 코드를 맞춘다.

### E. 권한 (컨펌 ④ (b) 승인 시)
- `inventory-core.js` `initial`·`adjust`·`stock-takes/:id/complete`·`stock-takes/:id/cancel` 에 `requireRole('System Admin','Restaurant Admin','Restaurant Manager','Brand General','Brand Manager','Foodcourt General','Foodcourt Manager')`(실제 역할명은 `middleware/auth.js` 의 값으로 — 추측 금지, grep 후). `receive`·`waste`·`stock-takes/:id/items`(입력) 는 그대로 Staff 허용. BG `adjust-stock` 도 매니저 이상.
- health-check `--category=security` 에 Staff 토큰으로 `adjust` 403 1건 추가.

### F. 자동 검사
- 인스펙션 스위트 `scripts/inspection/suites/stock-ledger.js` 신설:
  - **LEDGER-001** 장부 합 = 현재고: 대상별 `Σ quantity_change`(initial 포함) vs `current_stock`(매장 오버레이 포함) 차이 > 0.01 인 행 수. **첫 배포는 비차단 목록**(과거 누수로 어긋난 행이 있다). 배포 후 `scripts/reconcile-ledger-drift.js`(manual · 드라이런→Irene 표→`--apply`)가 차이를 `adjustment` 장부 1줄(`reason_code:'ledger_reconcile'`, 금액 = 그 순간 원가)로 맞춘 뒤 **차단으로 승격**(baseline.json 갱신).
  - **LEDGER-002** 2026-10-배포일 이후 생성 장부 중 `cost_value IS NULL` 행 수 = 0(원가 미정 재료는 `unit_cost=0` 이 아니라 NULL 로 적되 LEDGER-002 는 «원가 0 재료 분모 제외» — 미정 재료 수는 준비도가 따로 센다).
  - **LEDGER-003** 폐기 행 `reason_code IS NULL` = 0(배포일 이후).
- 고장주입(의무): ① `record()` 의 장부 insert 를 주석 처리 → LEDGER-001 이 데모 매장에서 터지는지 ② `useInlineStockEdit` 옛 PUT 으로 `current_stock` 보내면 400/무시되는지(health-check 1건) ③ 가중평균 삭제 뒤 수령 2회(가격 10→12) 하면 원가 12 인지.

### G. 묶음 1 증명 기준(게이트 2회차에서 볼 것)
- 마이그 멱등(2회 실행 결과 동일) · registry 등록 · `check-enum-parity`(ENUM 변경 0 이므로 통과) · `check-migration-registry`.
- 데모 38 흐름 실호출: 초기 → 발주 수령(가격 A) → 판매 완료(레시피 메뉴) → 폐기(사유) → 실사 완료 → 반품. 각 단계 장부 1줄, `cost_value` 부호·금액 수식 일치, LEDGER-001 0.
- 보호파일 8/8 · health-check 전체 · verify-all --full 1회(프론트 변경은 `useInlineStockEdit` 1곳뿐 — 빌드 1회).

## Ⅱ-3. 묶음 2 — 측정층

### A. 재고 총액 (RA · BG)
- `GET /restaurants/:rid/inventory/valuation` · `GET /brands/:bid/inventory/valuation`: 활성 대상별 `qty_on_hand(취급단위) ÷ base_quantity × 원가(그 순간)` 합. 응답 `{ total_value, items:[{id,name,qty,unit,unit_cost,base_quantity,value}], uncosted_count }`. 원가 0/NULL 은 합계 제외 + `uncosted_count`.
- 카테고리별 소계 포함(재료 카테고리 = 매장 소유 한 벌 ⑧). 화면: 재고 대시보드 StatCard «재고 총액(원가)» + `uncosted_count` 경고 문구. FC/공급업체 `total_stock_value`(판매가 기준)는 **이번 무접촉**, 라벨만 «재고 판매가치» 로 바꿔 혼동 제거.

### B. 기간 원가 리포트 (실제 vs 이론)
- `GET /restaurants/:rid/reports/food-cost?start&end` (`routes/cost-report.js` 신설 · 보고서 탭 «원가»).
- 정의(단일 소스 `utils/foodCostMath.js`, jest 포함):
  - **기초 재고액** = 기간 시작 직전 완료 실사가 있으면 그 실사의 `Σ actual ÷ base × unit_cost`, 없으면 장부 역산(현재고 − Σ장부(start 이후)) × 그때 원가 → 응답에 `opening_source: 'stock_take'|'ledger'`.
  - **매입액** = Σ 장부 `purchase.cost_value` + `return_in` − `return_out`(기간 내).
  - **기말 재고액** = 기간 끝 완료 실사 있으면 그것, 없으면 장부 역산 → `closing_source`.
  - **실제 사용액** = 기초 + 매입 − 기말.
  - **이론 사용액** = Σ 장부 `order_deduct.cost_value`(기간 내, 음수의 절댓값).
  - **설명 가능한 차이** = Σ `waste` + `production`(원재료 쪽 −) + `stock_take` + `adjustment` 의 `cost_value`; **설명 안 되는 차이** = 실제 − 이론 − 설명 가능.
  - **매출** = 완료 주문 `total_amount` 합(기존 `reports-summary` 와 같은 정의 — `check-revenue-definition.js` 가 지키는 그 정의를 재사용, 새 매출식 금지). **원가율** = 실제 사용액 ÷ 매출 · 이론 원가율 = 이론 ÷ 매출.
  - 재료별 표: 기초·매입·기말·실제 사용·이론 사용·차이(수량·금액). 정렬 = 차이 금액 큰 순.
- 실사가 양끝에 없으면 상단 안내 «이 기간엔 실사가 없어 기말을 장부로 추정했습니다 — 월말 실사를 하면 실제 원가가 됩니다».
- 브랜드 창고(BG): 같은 리포트의 BG 판(`/brands/:bid/reports/stock-cost`) — 이론 사용 = `production`·seller-orders 출고. 매출 대신 «출고액».

### C. 메뉴·카테고리 원가율 (현재 레시피 기준 — B 와 다른 질문이라 다른 숫자, 라벨로 구분)
- `reports-summary`(`dashboard.js`) `menuSales` 항목에 `unit_cost`(현재 레시피 `total_ingredient_cost ÷ yield` 또는 다이렉트 재료 1단위 원가 — `productMargin.ts` 서버판 `utils/productCost.js` 로 한 곳) · `cost = unit_cost × quantity` · `margin_pct` 를 붙인다. 원가 모르면 null(0 금지). 카테고리 합계도.
- 화면 ReportsPage 메뉴 표에 «원가 · 마진 %» 두 칸, 카테고리 표에 «원가율». 라벨 «현재 레시피 기준».
- `productMargin.ts`(화면) 와 `utils/productCost.js`(서버) 식 동일 — jest 양쪽 같은 케이스 5건(김치·Sawah Mas 포함).

### D. 폐기 리포트
- `GET /restaurants/:rid/reports/waste?start&end`: 장부 `waste` + 배치 dispose 를 `reason_code × 재료` 로 집계(수량·금액), 월별 추이. 화면은 «원가» 탭 안의 하위 섹션(새 페이지 금지).

### E. 실사 보강
- **부분 실사**: 생성 시 `category_ids[]` 선택 가능 → 그 분류 재료만 항목 생성. 완료 시 «전 항목 입력 강제»(:1001-1008) → **입력된 항목만 반영**, 미입력은 `skipped`(수량·장부 무변화) + 응답 `skipped_count`. (브랜드 공유 재료 포함 규칙 그대로.)
- **시작 후 변동 보정**: 완료 시 `expected = theoretical_stock + Σ장부(start_at ~ now, 그 재료, stock_take 제외)`; `variance = expected − actual`. 응답에 `movement_since_start` 를 항목별로 돌려 화면이 «실사 중 −3 판매» 를 보여 준다.
- **BG 창고 실사**: `routes/brand-inventory.js` 에 stock-takes 4개 엔드포인트(RA 와 같은 모델 — `stock_takes.entity_type/entity_id` 가 이미 있는지 확인 후, 없으면 마이그로 추가; `restaurant_id` nullable). 화면은 RA StockTakePage 재사용(모드 prop).
- 실사 `unit_cost` 스냅샷은 그대로(그 순간 원가) — 금액 = ÷ base_quantity (묶음 0-①).

### F. «원가 측정 준비도»
- `GET /restaurants/:rid/inventory/readiness`: `{ menus_total, menus_linked(recipe|direct), menus_unlinked:[...20], ingredients_total, ingredients_uncosted:[...], ingredients_unmapped(공급처 없음 — 기존 coverage 재사용), last_stock_take_at, deduct_rows_30d }`. BG 판도.
- 화면: 재고 대시보드 상단 한 줄 «측정 준비도 — 메뉴 연결 7/97 · 원가 있는 재료 81/87 · 마지막 실사 없음» + 각 숫자 클릭 → 미연결 목록(기존 ProductRecipePage / 재료 목록으로 링크). 새 페이지 금지.

### G. 묶음 2 증명 기준
- `utils/foodCostMath.js` jest: 실사 양끝 있음/없음/한쪽만 · 반품 · 폐기 · 원가 미정 재료 제외 · 이론 = order_deduct 합 (8건 이상).
- 데모 38 시나리오 실호출: 실사(기초) → 수령 100 g @ RM 10/1000 g → 판매 2건(레시피 20 g) → 폐기 10 g → 실사(기말, 실측 = 이론 − 5 g) → 리포트에서 실제 1.05 · 이론 0.40 · 설명 가능 0.10 · 설명 불가 0.05 가 정확히 나오는지(숫자는 데이터에 맞춰 팀원이 계산해 보고에 적는다).
- 매출 정의 게이트 `check-revenue-definition.js` 통과(새 매출식 0). 보호파일 8/8. 프론트 빌드 1회 · verify-all --full 1회.

## Ⅱ-4. 묶음 3 — 발주 보강

- **발주점 1벌** `utils/reorderMath.js`: `daily_usage = (Σ|order_deduct| + Σ|waste| + Σ|production 원재료 −|) 최근 28일 ÷ 데이터 있는 날 수(최소 7일, 없으면 `manual_daily_usage`)` · `reorder_point = daily_usage × lead_time_days + safety(= min_stock 이 있으면 min_stock, 없으면 daily_usage × lead × safety_stock_percent)` · `suggest = max(0, reorder_point + daily_usage × 7 − on_hand − on_order)`. `on_order` = 열린 PO 줄(`open-po-lines` 로직 재사용 · RECEIVABLE_STATUSES). 세 엔드포인트(`inventory/reorder-suggestions` · `par-level` · PO `suggestions`) 모두 이 함수. `calculate-usage` 의 purchase 기반 계산 삭제. 문서 4-2 PAR 식은 «폐기» 로 표기.
- **부분 수령**: 거래 청구서 줄 = `quantity_received`(`purchaseOrderService.js:288-347`), 발행 시점은 `received` 그대로(부분 때 청구서 금지 — 대조 혼란). 보고서는 묶음 0-③ 로 끝.
- **3-way 표시**: 대조 화면(`InvoiceReconcilePage.tsx`) 줄에 «주문 · 수령 · 청구» 세 수량 나란히, 수령 ≠ 청구 줄 강조. 데이터는 이미 있음(`quantity_received`·`invoiced_quantity`) — 서버 변경 0.
- **유통기한**: `SchedulerRun` 에 일 1회 `inventory_batches` `expiry_date < today AND status='active' → 'expired'`(수량은 안 깎는다 — 폐기는 사람이 사유 `expired` 로) + `stock_alerts` 유형 `expiring`(7일 전)·`expired` 생성(생성 함수는 `utils/stockAlerts.js` **한 곳**으로 합치고 `inventoryDeductionService.js:90` 중복 제거). 푸시/메일은 이번 범위 밖.
- `cost_change_logs` 화면 소비: 발주 담기 줄의 가격 이력 아이콘(이미 있음)에 «원가 변경 N건·마지막 ±%» 툴팁 — `GET /api/cost-changes` 첫 프론트 호출. 작게.

증명: reorderMath jest(사용량 0·7일 미만·on_order 반영) · 세 엔드포인트 같은 입력 → 같은 제안 · 스케줄러 드라이런 1회 · health-check 1건(만료 배치 상태 전이).

## Ⅱ-5. 운영 배포 순서 · 마이그 · 롤백
- 묶음 0 → 단독 배포 가능(스키마 0). 묶음 1 → 마이그 1개(`inventory_transactions` 칸 3 · `general_stock_transactions` 칸 2) · Fable 게이트 · 배포 후 `reconcile-ledger-drift` 드라이런 표를 Irene 에게 → 승인 → apply → LEDGER-001 차단 승격. 묶음 2 → (BG 실사 칸이 필요하면) 마이그 1개 · 게이트. 묶음 3 → 스키마 0(stock_alerts 유형이 ENUM 이면 expandEnum).
- 롤백: 칸 추가는 NULL 허용이라 옛 코드와 공존. 가중평균 → 마지막 매입가는 데이터 되돌리기 없음(다음 수령부터 적용되는 성질) — `cost_change_logs` 로 추적.
- SW 버전은 묶음의 프론트 변경이 다 끝난 뒤 마지막에.

## Ⅱ-6. 문서 갱신 (두 방의 게이트가 끝난 뒤 · 한 번에)
- `TRADE_STRUCTURE.md` §2-3 «수령(가중평균)» → 컨펌 ③ 결과대로 · §5 에 «5-13 장부 단일 진실·금액 칸» 한 절 · ⑫ 로 이 판정 요약.
- `INVENTORY_MANAGEMENT_SYSTEM.md` 헤더 «개발 예정» → 구현 상태 · 파일 위치 `inventory-core/extra/produce` · 4-2 PAR 식 폐기 · 완료 후 취소 미복원 규칙 명시.
- `PURCHASE_ORDER_SYSTEM.md` 4-3 생명주기·«어느 단계든 취소»·:2412 «원가 대조 미구현» 정정.
- `RECIPE_MANAGEMENT_SYSTEM.md` :427-473 옛 식 → `recipeCost.js` 참조 · :605-618 3단계 중 실제 구현 표기.
- `STOCK_LEDGER_UNIFICATION_DESIGN.md` «코드 변경 0» 정정.
- 메모리: `project_po_invoice_cost_variance` «미착수» → 구현됨 · `reference_cost_two_paths` 에 «매장 층 = 마지막 매입가(또는 ③ 결과)» 추가 · 새 메모리 `reference_stock_ledger_single_truth`.

---

# Ⅲ. Irene 컨펌 항목 (Ⅰ-6 과 동일 · 권고 포함)

| # | 정할 것 | Fable 권고 | 답에 따라 달라지는 것 |
|---|---|---|---|
| ① 범위 | **재료 원가율까지** (P&L 별도) | (b) 면 급여·경비 입력 설계가 먼저 필요 — 이번 묶음 밖 |
| ② 순서 | **0 → 1 → 2 → 3** | (b) 면 묶음 2 를 장부 금액 없이 «현재 원가 × 수량» 근사치로 만들어야 하고 실제 원가는 못 냄 |
| ③ 매장 원가의 뜻 | **마지막 실제 매입가** | (a) 면 Ⅱ-2-D 생략 + 문서를 코드에 맞춤 |
| ④ 재고 권한 | **입고·실사 입력·폐기 = Staff 가능 / 초기재고·조정·실사 확정 = 매니저 이상** | (a) 면 Ⅱ-2-E 생략 |
| ⑤ 운영 메뉴 연결 | **준비도 화면 보고 사람이 화면에서** | (b) 면 드라이런·승인 절차 별도 설계 |

«그대로» 한 마디면 ①(a)·②(a)·③(b)·④(b)·⑤(a) 로 착수한다.
