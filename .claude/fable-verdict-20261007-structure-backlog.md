# Fable 판정 — 구조정리 접수 잔여 4건 (2026-10-07)

> 작성: Fable(리더). 근거는 전부 **오늘 현재 코드와 개발DB** 로 다시 쟀다(2026-09-14 측정값은 참고로만 인용).
> 코드·DB 변경 0 (판정만). 운영 서버 미접속.

---

## Irene 에게 보내는 보고문

**✅ 완료 — 남아 있던 «Fable 판정 대기» 4건을 전부 판정했습니다.** 결론은 **2건 종결 · 1건 작은 안전장치 추가 · 1건 원인 찾음(수정 필요)** 입니다. Irene 님이 정할 것은 **딱 하나**(맨 아래)입니다.

| 항목 | 결론 | 한 줄 이유 |
|---|---|---|
| **A. 브랜드 메뉴에 레시피 칸이 두 개** | **종결** (죽은 칸, 위험 없음) | 화면은 새 칸(`recipe_id`)만 쓰고, 재고 차감도 새 칸만 봅니다. 옛 칸(`product_recipe_id`)은 운영 0건·개발 0건이고 아무 화면도 안 씁니다. 지우는 마이그레이션은 이득 없이 위험만 있어 **안 지웁니다.** 팀원이 «문서에 레거시 표기 + 서버가 옛 칸 값을 더 이상 받지 않게» 두 줄만 정리합니다. |
| **B. 브랜드 메뉴 ↔ 매장 상품 1:1 보장 장치 없음** | **살아 있음 → 안전장치 추가** (길은 하나, 선택 없음) | 09-17 «메뉴 주인은 매장» 뒤에도 브랜드→매장 «내려보내기» 는 그대로라 1:1 이 깨지면 잘못된 상품이 갱신됩니다. 지금 사고를 낼 수 있는 길은 **수동 도구(`adopt` 스크립트) 하나뿐**이고 운영은 현재 공유 0건입니다. 팀원이 ① 배포 게이트 검사(공유 묶음 = 0 이 아니면 배포 차단) ② DB 유일 규칙(한 매장에 같은 브랜드 메뉴는 한 상품만) 둘을 한 묶음으로 넣습니다. 둘 다 되돌릴 수 있습니다. |
| **C. 매장8(K-DINE IPC) 이월렛 결제 금액이 기록 안 됨** | **원인 찾음 → 수정 필요** | 7-31 에 «결제 완료 경로 4개» 를 결제 원장으로 모았는데, **다섯 번째 경로를 놓쳤습니다**: POS 에서 **주문을 넣는 순간 바로 결제 완료로 저장**하는 경로(계산대에서 먼저 받는 매장 = K-DINE IPC 가 딱 이 방식)입니다. 이 경로는 원장을 안 쓰고 `amount_paid` 도 안 채웁니다. 매장10 은 «주문 먼저, 결제 나중» 이라 정상이었던 것과 정확히 맞아떨어집니다. **매출 총액·대시보드·IOI Mall 보고는 영향 0** (원장이 없으면 주문 금액으로 집계하는 안전망이 이미 있음). 빠진 건 «결제 시각·원장 한 줄·잔액 칸» 입니다. 고치는 길은 하나(주문 생성 직후 같은 원장 기록 함수를 한 번 더 부름)이고 팀원이 구현합니다. 단, 그 파일이 🔒 인쇄 보호 파일이라 **인쇄 무접촉 증명 + Fable 게이트 1회** 를 거칩니다. |
| **D. 브랜드 재료 목록 두 벌(ingredients vs product_ingredients)** | **BG 쪽 종결 · FG 쪽 보류** | 09-04 «재료 통합»(거울 모델) 이 바로 이 문제의 답이었습니다: 목록은 Stock Items 하나, 브랜드 재료 행은 기계가 유지하는 거울, 반쪽짜리 연결칸(`linked_ingredient_id`) 은 폐기되고 읽기 경로까지 거울 열쇠로 바뀌었습니다. 표를 물리적으로 안 합친 것은 인쇄 보호 코드 때문에 **의도된 결정**입니다. 푸드코트(FG) 는 구조상 여전히 갈라져 있지만(화면은 FG 상품표, 발주 수령은 재료표) 개발DB 에 FG 재료 0건이고 운영도 쓰는 흔적을 못 찾아 **쓰기 시작할 때 같은 거울 모델을 적용**하기로 하고 보류합니다. |

**Irene 님이 정할 것 (1개) — C 의 과거 기록 채우기 여부**
- 선택지 ① **과거 주문은 안 채우고, 지금부터 기록 시작** (7-31 결정과 같은 방식) — 집계 숫자 변화 0, 운영 데이터 쓰기 0.
- 선택지 ② 매장8 과거 주문 수천 건에 원장을 거꾸로 채움 — 집계는 안 바뀌지만 운영 쓰기 수천 행이고 «결제 시각 = 주문 시각» 을 추정으로 적는 셈.
- **Fable 권고: ①.** 매장8 은 마감(교대) 기록을 한 번도 안 써서 과거 원장이 있어도 쓰일 곳이 없고, 매출 보고는 이미 맞습니다.
→ ①로 컨펌해 주시면 팀원이 바로 구현·검증에 들어갑니다. (운영 배포는 별도 지시 때.)

**확인할 곳** (지금 당장 볼 화면은 없습니다 — 판정만이라 개발서버 변경 0)
- 판정문 전문: `/home/irene/.claude/jobs/5cdb5680/tmp/fable-verdict-20261007-structure-backlog.md`

---

## 판정문 (팀원용 — 사실·판정·지시)

### 공통 전제
- Fable 호출 횟수: 이 판정 1회. 아래 C 만 게이트 판정 1회가 더 필요하다(🔒 보호파일 + 돈). A·B·D 는 기계 게이트로 끝낸다.
- 구현 중 세부 질문은 되묻지 않는다 — 팀원이 판단해 결과에 붙인다. 되돌리기 어려운 결정(운영 쓰기)만 예외.
- 운영 DB 읽기는 Irene 허락이 있을 때만. 아래 «선택 조사» 는 전부 허락 전제.

---

### A. 브랜드 메뉴 레시피 2계통 — **종결**

**① 살아 있는가 — 아니다 (구조 부채만, 동작 위험 0).**
- `models/BrandMenu.js:19-20` — `product_recipe_id` 는 모델 주석부터 «Legacy — product BOM link (not the "Linked Recipe" UI)», `recipe_id` 가 «"Linked Recipe" … the field inventory deduction resolves».
- 쓰기: 프론트에서 `brand_menus.product_recipe_id` 를 보내는 곳 **0건** (`grep product_recipe_id dev-frontend/src` 결과 전부 `BrandProductsTab`/`ProductRecipesTab` = **brand_products** 표의 같은 이름 칸, 다른 테이블). `BrandMenusPage.tsx:1366-1371` 은 `recipe_id` 만 쓴다.
- 서버: `routes/brand-menus.js:327,392,466` POST/PUT 이 body 의 `product_recipe_id` 를 **그대로 받아 저장**한다(화면은 안 보내지만 API 직접 호출이면 들어간다). 그 값은 `brandMenuSyncService.js:230,251` 에서 매장 `Product.product_recipe_id` 로 복사된다 — 차감(`inventoryDeductionService`)은 `Product.recipe_id` 만 읽으므로 **복사돼도 아무 동작에 안 닿는다.**
- 데이터: 운영 2026-09-14 브랜드2 104건 중 `product_recipe_id` **0건** / 개발DB `brand_menus` **0행**.

**② 종결 문구 (TRADE_STRUCTURE.md ② 항목에 적을 것):**
> ② **종결(2026-10-07 Fable)**. `brand_menus.product_recipe_id` 는 레거시 BOM 링크로 **화면 쓰기 0·운영 0건·차감 미참조**. «Linked Recipe» 는 `recipe_id` 단일 경로(2026-07-15). 칸 제거 마이그는 이득 없이 비가역이라 **하지 않는다**. 서버 POST/PUT 은 이 칸을 더 이상 받지 않는다(쓰기 봉인). 단일 진실: 메모리 [[reference_two_recipe_systems]].

**③ 길이 갈리는가 — 아니다.** 칸 제거(마이그·FK 해제)는 비가역인데 얻는 게 없다. 쓰기 봉인은 되돌릴 수 있고 영향 0. Irene 컨펌 **불필요**.

**④ 팀원이 할 일 (소 규모, 판단 개입 없음):**
1. `routes/brand-menus.js` POST(`:327,392`)·PUT(`:466` updatable 목록) 에서 `product_recipe_id` 를 **받지 않게** 한다. 읽기 include(`recipe`=ProductRecipe, `:114,143`)와 복제(`:596,638`)·sync 복사는 **그대로** 둔다(응답 모양 불변).
2. 검증: 데모 브랜드로 POST `{product_recipe_id: <아무 값>}` → 저장 행 `product_recipe_id` NULL · `recipe_id` 는 정상 저장(정·반 1회씩) · `health-check` · `verify-all`.
3. 문서: 위 ② 문구를 TRADE_STRUCTURE ② 에, `docs/BRAND_MENU_SYSTEM.md` 에 한 줄.

---

### B. 브랜드 메뉴 ↔ 매장 상품 1:1 보장 장치 — **살아 있음, 안전장치 2개 추가 (길 하나)**

**① 살아 있는가 — 그렇다 (지금 사고 0건이지만 막는 장치가 없다).**
- 09-17 방향 전환 뒤에도 의미가 있다: «메뉴 주인은 매장» 은 **매장→브랜드 역방향을 없앤 것**이지 브랜드→매장 **내려보내기(push) 는 그대로**다(`brandMenuSyncService.js:153` `Product.findOne({restaurant_id, brand_menu_id})` 로 한 행만 집어 갱신·잠금·retract). 한 메뉴에 매장 상품이 둘 붙으면 **갱신은 임의의 한 행에만** 가고 다른 행은 영원히 옛값이다.
- 쓰기 경로 전수(`grep brand_menu_id:`): ① `brandMenuSyncService.js:262` 생성 — findOne 뒤 create, 한 트랜잭션 → 정상 사용에선 1:1. ② `routes/restaurant-brand-menus.js:102,134` — 전부 ①을 부른다. ③ **`scripts/adopt-restaurant-menus-to-brand.js:153`** — 이름 매칭으로 붙이는 **수동 도구**, 09-13 공유 7묶음의 원인. 지금은 `--fix-shared`(`:110`) 와 계획 단계 건너뛰기(`:308,360`) 가 있다.
- DB: `products` 인덱스 `idx_brand_menu` 는 **비유일**(`SHOW INDEX` 실측). 유일 규칙 없음.
- 데이터: 개발DB 연결 상품 0건(공유 0) · 운영 09-13 수선 후 공유 0.
- 인스펙션(`scripts/inspection/suites/*`) 9개 중 `brand_menu` 를 보는 것 **0개**.

**② (해당 없음 — 종결 아님)**

**③ 길이 갈리는가 — 아니다.** 1:1 은 설계 전제(sync 가 findOne 한 행 가정)라 «허용할지» 가 갈릴 여지가 없다. 장치는 두 겹이 정석이고 둘 다 되돌릴 수 있다(인덱스 drop · 검사 제거). Irene 컨펌 **불필요**(배포 자체는 평소대로 Irene 지시).
- 유일 인덱스 `UNIQUE(restaurant_id, brand_menu_id)` — MySQL 은 NULL 을 유일성에서 제외하므로 `brand_menu_id NULL` 인 매장 자체 상품은 무제한. `products` 에 `deleted_at` 없음(실측) · retract 는 `brand_scope_active=false` 로 숨기고 행을 남기며 sync findOne 은 `is_active` 를 안 거르므로 재push 가 두 번째 행을 만들지 않는다 → 인덱스가 정상 흐름을 막지 않는다.

**④ 팀원이 할 일 (중 규모, 마이그 포함):**
1. 인스펙션 `referential.js`(또는 신규 `brand-menu.js`) 에 **BM-LINK-001 «한 매장에 같은 brand_menu_id 상품 2개 이상 = 0»** 추가(배포 게이트 fail-closed).
2. 마이그 `scripts/migrate-products-brand-menu-unique.js` 멱등: ① 공유 묶음이 있으면 **인덱스 안 만들고 실패**(`--fix-shared` 를 먼저 돌리라는 메시지) ② 없으면 `ALTER TABLE products ADD UNIQUE INDEX uq_products_restaurant_brand_menu (restaurant_id, brand_menu_id)`. `migrations.registry.json` 에 `deploy` 로 등록. 모델 `Product.js` indexes 에도 같은 유일 인덱스 선언(sync 드리프트 방지).
3. `adopt-restaurant-menus-to-brand.js` 는 무접촉(이미 건너뛰기+수선 있음).
4. 검증: 개발DB 에서 ① 동일 (restaurant_id, brand_menu_id) 두 번째 INSERT → 거부 ② `brand_menu_id NULL` 상품 2개 INSERT → 허용 ③ 검사 고장주입(공유 행 1쌍 임시 생성 → BM-LINK-001 실패 → 정리 → 통과) ④ push 흐름 실호출(데모 브랜드 메뉴 1건 push → 상품 1 · 재push → 여전히 1) ⑤ `check-enum-parity`·`verify-all`.
5. 문서: TRADE_STRUCTURE ③ 을 «장치 2개(유일 인덱스 + BM-LINK-001) · 공유는 adopt 수동 도구만 만들 수 있었고 지금은 막힘» 으로 갱신.
- 운영 배포 시 주의: 마이그가 운영에서 공유 묶음을 만나면 **배포가 멈추는 게 맞다**(그때 `adopt --fix-shared` 먼저). 운영 09-13 수선 뒤 0건이므로 기대값은 통과.

---

### C. 매장8 이월렛 249건 completed · amount_paid 0 · 원장 0 — **원인 확정, 수정 필요 (길 하나 + Irene 결정 1개)**

**① 살아 있는가 — 그렇다. 원인을 코드로 확정했다 (운영 읽기 없이).**
- 7-31 `utils/orderPaymentLedger.js`(v3.73) 는 «결제 완료 경로 4개» 를 원장으로 모았다: ①분할결제 POST `/orders/:id/payments` ②PATCH `/orders/:id {payment_status:'completed'}`(`orders-crud.js:1117`) ③PayPal ④Stripe(`orders-payment.js:209,288`). `recordOrderPayment` 호출부는 **이 3곳이 전부**(grep 실측).
- **놓친 다섯 번째 경로 = 주문 생성과 동시에 완납.** `POSTerminalPage.tsx:2771 paymentStatus:'completed'` → `OrderContext.tsx:178 payment_status: order.paymentStatus || 'pending'` 로 POST `/api/orders` → `orders-crud.js:900 Order.create({...orderData, …})` 가 **body 의 payment_status='completed' 를 그대로 저장**. 이 경로엔 `recordOrderPayment` 가 없고 `amount_paid` 도 안 채운다(전이가 아니라 처음부터 completed 라 PATCH 헬퍼의 «전이일 때만» 조건과도 무관).
- 왜 매장8 만: 계산대에서 **먼저 받고 주문을 넣는** 운영(픽업·푸드코트형)은 POS «Pay» 가 곧 생성이라 경로⑤. 매장10 은 «주문 먼저(pending) → 나중에 PATCH 완납» 이라 경로② 로 원장이 정확히 맞았다(09-14 실측 card 1,087.16·ewallet 281.92 일치). 결제수단과 무관 — 매장8 이월렛이 눈에 띈 것뿐이고 **현금·카드도 같은 경로면 같이 빠진다.**
- 개발DB 방증: 완납 주문 중 원장 없는 비율이 cash 170/179 · card 171/171 · ewallet 139/139 — POS 테스트 주문이 대부분 생성 즉시 완납이라 경로⑤를 탄 모양 그대로.
- 오프라인 재생도 같다: 오프라인에서 생성+결제한 POS 주문은 재생 시 POST `/orders` 로 들어간다(분할결제 재생만 `/payments` 경로).
- **돈 영향 범위**: 매출 총액(`orders.total_amount`) 정상. 집계 3곳(`cash-management.computeExpected`·`dashboard.js`·`mallSalesService`)은 «원장 있으면 원장, 없으면 주문» 폴백이라 **IOI Mall 보고·대시보드·마감 기대금액 모두 맞다**. 빠진 것 = 결제 시각(`paid_at`)·원장 1행·`amount_paid`. 매장8 은 마감 기록 0건이라 교대 경계 오류의 피해도 현재 없다.

**② (종결 아님)**

**③ 길이 갈리는가 — 수정 방법은 하나, 백필만 갈린다.**
- 수정(단일 경로): `orders-crud.js` POST 생성 트랜잭션 안, `Order.create` 직후에 `payment_status==='completed'` 면 `recordOrderPayment(order, {prevPaymentStatus:'pending', cashierId:req.user?.id, cashierName:…}, t)` 호출. 헬퍼가 멱등·비치명·재시도 에러 재던지기를 이미 보장하므로 새 로직 0줄. v3.73 과 같은 모양.
  - ⚠ `orders-crud.js` 는 🔒 보호파일(pending-print/printed/kitchen_items). 삽입 지점은 `:900` Order.create 블록 **뒤**, 인쇄 필드(needs_print/print_needed_at/printed_at) 무접촉. 지문이 바뀌므로 Irene 승인 후 `check-print-guard --bless`. v3.73 도 같은 절차였다.
- 백필(갈림): ① 안 함(7-31 결정 유지 — «옛 주문엔 결제 시각이 없어 채우면 날조» · 폴백이 집계를 덮음) / ② 경로⑤ 주문은 «결제 시각=생성 시각» 이 사실이므로 채움 — 운영 쓰기 수천 행, 집계 불변(폴백도 order_date 를 쓴다). **권고 ①**: 매장8 은 마감을 안 쓰고 보고는 이미 맞아 효용이 없고, 운영 쓰기만 는다. → **Irene 컨펌 1개(보고문에 올림).**

**④ 팀원이 할 일:**
1. **선택 조사(운영 읽기, Irene 허락 시만 · 수정에 필수는 아님)**: 매장8 최근 7일 완납 주문을 `source`(pos/mobile/kiosk) 별로 세어 `source='pos'` 가 지배적임을 1회 확인. 더불어 전 매장 «완납인데 원장 0» 을 `createdAt > 2026-08-01` 로 세어 경로⑤ 규모를 적는다(보고용).
2. 구현: 위 ③ 단일 경로. 프론트 무변경.
3. 검증(데모 38): ① POST `/api/orders` `payment_status:'completed'` → `order_payments` 1행(`paid_at` 채움, `receipt_number` `-P1`) · `orders.amount_paid = total_amount` ② 같은 주문 PATCH `{payment_status:'completed'}` 재전송 → 행 **그대로 1**(멱등) ③ `payment_status:'pending'` 생성 → 행 0 ④ 총액 0 주문 → 행 0 ⑤ 고장주입: 호출 제거 → ①이 실패함을 1회 증명 ⑥ `check-print-guard`(지문 변경 1건 = 이 파일, 인쇄 블록 diff 0 을 diff 로 첨부) ⑦ `health-check --category=print` ⑧ `verify-all`. health-check 에 ①② 를 영구 케이스로 추가.
4. 문서: `docs/CASH_MANAGEMENT_SHIFT_CLOSE.md` §7 «경로 4개» → «경로 5개(⑤ 생성 즉시 완납 = POS pay-first, 2026-10-07 봉합)», TRADE_STRUCTURE ⑤ 를 «원인 확정·수정 (v?) · 백필 안 함» 으로.
5. **Fable 게이트 1회**(돈 + 🔒 보호파일) — 구현·검증 끝나면 diff·검증 결과·print-guard 출력 경로만 넘길 것.
6. 운영 배포는 Irene 지시 때. 배포 후 운영검증 항목: 매장8 당일 완납 주문 ↔ 원장 행 수 일치.

---

### D. ingredients(브랜드) vs product_ingredients 목록 이원화 · linked_ingredient_id 반쪽 · FG — **BG 축 종결, FG 축 보류**

**① 살아 있는가 — BG 는 아니다 / FG 는 구조상 남아 있으나 사용 근거 없음.**
- BG: `docs/INGREDIENT_UNIFICATION_DESIGN.md`(상태: 구현·운영 이관 완료 2026-09-04, SW 4.78) §1 «여섯 줄» — Stock Item = 유일한 재료 목록, 브랜드 `ingredients` 행 = 거울(`source_product_ingredient_id`), 기계 유지, 사람이 못 고침, 방향은 Stock Item→거울 한 방향(`services/stockItemMirror.js` 주석, F3 403). `linked_ingredient_id` 는 «1:1 이라 못 쓴다 — 폐기» 로 명시, **읽기 경로까지** 거울 역조회로 교체됨(`routes/product-ingredients.js:95-105` F7). 남은 참조는 `routes/stock-ledger.js:13,510-521`(담기 화면 표시용 `already_linked_ingredient_id`) 뿐. 게이트 ING-UNI-001~004·027~030 이 재발을 막는다(고장주입 실증 기록 §6).
- 표를 물리적으로 합치지 않은 것은 **의도된 결정**(`ingredients` 에 인쇄 상품 해석(🔒 보호파일 공용) 이 물려 있음, 문서 §1 «왜 테이블을 물리적으로 합치지 않는가»). 따라서 INVENTORY 문서 787 의 «이원화» 는 결함이 아니라 설계다.
- 개발DB 실측: 브랜드 재료 28행 중 거울 열쇠 3 · `product_ingredients` 27행 · `linked_ingredient_id` **0**(폐기 유지).
- FG: `routes/foodcourt-inventory.js` 는 **`FoodcourtProduct.current_stock` 만** 읽고(`Ingredient` 참조 0), FG 가 **구매자**로 수령하면 `purchase-orders-workflow.js:104-106` 이 `ingredients.foodcourt_id` 행에 넣는다 → 갈라짐은 사실. 그러나 개발DB FG 재료 **0행**·FG 상품 3행, 운영 측정 없음, FG 설계는 «판매자»(메모리 [[project_bg_fg_as_seller]]) 가 본류라 **FG 가 구매자로 쓰인 근거가 없다.**

**② 종결 문구 (INVENTORY_MANAGEMENT_SYSTEM.md:787 «미해결» 을 아래로 교체):**
> **해소(2026-10-07 Fable 판정)** — BG 축은 2026-09-04 재료 통합(`docs/INGREDIENT_UNIFICATION_DESIGN.md`, SW 4.78)으로 닫혔다: 목록은 Stock Items 하나, 브랜드 `ingredients` 행은 거울(`source_product_ingredient_id`, 기계 유지), `linked_ingredient_id` 는 폐기(쓰기·읽기 모두 거울 열쇠로 대체, 운영 0건 유지). 표 2개는 결함이 아니라 설계(인쇄 보호 코드가 `ingredients` 를 공용) — 재발은 ING-UNI 게이트가 막는다.
> **FG 축은 보류** — 화면(`foodcourt_products.current_stock`) 과 구매 수령(`ingredients.foodcourt_id`) 이 갈라져 있으나 FG 가 구매자로 쓰인 데이터가 없다. FG 가 발주 구매자로 실제 쓰이기 시작하면 **BG 거울 모델을 그대로 적용**한다(새 표·새 경로 금지). 그때까지 FG 수령 경로는 건드리지 않는다.

**③ 길이 갈리는가 — 아니다.** BG 는 이미 결정·실행·게이트까지 끝났고, FG 는 쓸 때 같은 모델을 쓴다는 원칙으로 닫힌다. Irene 컨펌 **불필요**.

**④ 팀원이 할 일 (문서 정리 + 작은 확인):**
1. INVENTORY_MANAGEMENT_SYSTEM.md:787 교체(위 ②) · TRADE_STRUCTURE §5-2 «재료 테이블이 둘» 절에 «BG 종결·FG 보류» 한 줄 · 메모리 `project_brand_stock_two_lists_split` 에 «2026-10-07 종결(BG) » 갱신.
2. 코드 변경 없음 — 추가 실측으로 확인: `routes/stock-ledger.js` 의 `linked_ingredient_id` 언급은 **`:13` 쓰기 금지 주석 하나뿐**이고, `:510` `already_linked_ingredient_id` 의 `linked` 는 `alreadyLinkedSet`(`:492`, 공급처 연결 `ingredient_seller_products` 기준) 이라 옛 칸을 읽지 않는다. 즉 옛 칸의 **읽기·쓰기 코드 경로는 0** 이다(폐기 완료). 문서에 그 사실만 한 줄 적는다.
3. 선택 조사(운영 읽기, Irene 허락 시): `ingredients WHERE foodcourt_id IS NOT NULL` 건수 · 구매자 foodcourt 발주 건수 — 0 이면 FG 보류 문구에 «운영 0건(날짜)» 을 붙인다.

---

### 이번 판정이 닫는 것 / 남기는 것
- 닫음: A(종결) · D-BG(종결) · B(장치 추가, 판단 끝) · C(원인 확정, 수정 경로 확정).
- 남김: C 백필 여부 Irene 컨펌 1개(권고 ①) · C 게이트 판정 1회(구현 후) · D-FG 보류(조건부).
- 순서 권고: **C 먼저**(돈 기록·운영 매장 매일 쌓임) → B → A·D(문서·봉인). C 와 B 는 프론트 빌드가 없다(백엔드·마이그·문서만) → mount sweep 불필요, `verify-all` 기본으로 충분.
