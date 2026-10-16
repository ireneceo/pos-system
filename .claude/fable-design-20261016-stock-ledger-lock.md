# Fable 판정·설계 — 재고 장부 동시 쓰기 경합 (services/stockLedger.record 잠금 없음)

- 날짜: 2026-10-16 · 작성: Fable(리더) · 구현: Opus(팀원) · 코드 변경 0(읽기·조회만으로 판정)
- 출처: 배포 방 원문 «개발 DB 장부 30830~30833 … 같은 초에 겹친 두 쓰기가 옛 재고를 읽고 계산한 것으로 보임 — stockLedger.record 가 재고 행을 잠그지 않는지 확인. 운영에도 10-11 배포부터 있는 코드.» + Opus 실측 6건(재현 포함)
- 분류: 공용 기준 `cause`(원인 판정) + `design`(고침 설계). 돈·재고 무결성 → 구현 뒤 **Fable 게이트 검증 1회** 대상.

---

## 0. 결론 한 줄

**원인 확정: `stockLedger.record()` 가 «읽고(일반 SELECT) → 계산 → 쓰기(UPDATE)» 를 행 잠금 없이 하기 때문에 생긴 고전적 lost update 다.** 같은 대상(재료·상품)을 두 트랜잭션이 동시에 바꾸면 둘 다 옛 재고를 읽어 한쪽 변화가 증발하고, 장부 줄의 `stock_after` 사슬이 끊긴다. 고침은 **record() 안에서 대상의 마스터 행을 `SELECT … FOR UPDATE` 로 잠그고, 잠근 뒤 잠금 읽기로 재고를 다시 읽어 계산**하는 것 하나다(35개 호출부는 손대지 않거나 «사전 읽기» 가 있는 3곳만 잠금 읽기로 바꾼다). 부수 결함(풀 고갈)은 같은 묶음에서 2개 함수에 `transaction` 을 넘겨 해결한다.

---

## 1. 원인 판정 (확정)

### 1-1. 메커니즘

`services/stockLedger.js record()` 101~108행:
```
before = currentStockOf(target)        // ① 일반 SELECT 또는 호출부가 넘긴 인스턴스의 current_stock — 잠금 없음
after  = before + delta (또는 setTo)    // ②
applyNewStock(after)                    // ③ UPDATE … SET current_stock = after   ← 여기서 처음 행 잠금을 잡는다
InventoryTransaction.create({ quantity_change: after - before, stock_after: after })
```
두 트랜잭션 A·B 가 같은 대상을 겹쳐 처리하면 A·B 모두 ①에서 같은 옛 값을 읽고, ③에서 늦은 쪽이 먼저 쓴 쪽을 **덮어쓴다**. 장부 줄은 각자 자기 계산대로 남으니 «앞 줄 stock_after + 이 줄 변화 = 이 줄 stock_after» 가 깨진다(LEDGER-004 가 잡은 것이 정확히 이것).

증거:
- 30830~33(개발 DB · 데모 매장 1 · 브랜드 재료 2 · 오버레이): +3→3, +3→6, **−3→0(앞 줄 6)**, −6→0. 세 번째 줄은 before 를 3 으로 읽었다 = 두 번째 입고가 커밋되기 전(또는 그 스냅샷)에 읽은 값. health-check 두 개가 같은 초에 겹쳐 돈 것(`scripts/health-check.js` 2106~2133 «브랜드 재고 오버레이» 시험: receive +3 → adjust new_quantity=원래값)과 정확히 일치. 이 4줄은 배포 방이 백업(`backups/deploy-tools/ledger-rows-30830-30833-20261016.json`) 뒤 Irene 허락으로 삭제했고, 지금 개발 DB `chainBreakSql('2026-10-08')` = **0줄**(내가 재확인).
- Opus 재현(데모 38 · 재료 46 · 시작 100 · 입고+1 ×10 과 조정−1 ×10 동시): 커밋된 4줄 +1→101 · −1→99 · −1→99 · +1→101, **장부 합 0 인데 최종 재고 101** = 실제 수량 손실(lost update) 확정. 시험 데이터는 원복됨.
- 코드: 잠금(`lock: t.LOCK.UPDATE`)은 `services/purchaseOrderReceive.js` 41·214행(PO 수령)과 po-returns·seller-orders·brand-stock-takes 의 ProductIngredient/Ingredient 조회에만 있다. **입고(`/inventory/receive`)·조정(`/inventory/adjust`)·폐기·수동 차감·주문 차감(`inventoryDeductionService`)·실사 확정·만들기(produce)·메뉴/푸드코트 초기재고** 는 전부 잠금 없는 행을 넘긴다.

### 1-2. 격리수준에 대한 사실 (설계가 기대지 않는 이유)

- `config/database.js` 119행: Sequelize 옵션 `isolationLevel: READ_COMMITTED`. Sequelize 6.37.7 mysql 방언은 `settingIsolationLevelDuringTransaction: false` 라 **`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;` → `START TRANSACTION`** 순서로 내린다 → MySQL 규칙상 그 다음 트랜잭션 하나가 READ COMMITTED 로 돈다고 판단한다.
- 서버 기본(`@@transaction_isolation`)은 REPEATABLE-READ(MySQL 8.0.46). 트랜잭션 안에서 `@@session.transaction_isolation` 을 읽어도 REPEATABLE-READ 로 나오지만 이 변수는 «다음 트랜잭션용» 설정을 비추지 않으므로 결정적 증거가 아니다. `information_schema.innodb_trx` 는 PROCESS 권한이 없어 못 봤다. → **실측은 Opus 검증 V5** 로 남긴다.
- **어느 쪽이든 결함은 같다**(일반 SELECT 는 두 수준 모두 다른 트랜잭션의 미커밋 변경을 못 보고 잠그지도 않는다). 단 REPEATABLE-READ 라면 «잠근 뒤 일반 SELECT 로 다시 읽기» 도 **트랜잭션 첫 읽기 때 스냅샷**을 돌려주므로 틀린다. 그래서 설계는 **재읽기도 잠금 읽기(FOR UPDATE)** 로 고정한다 — 격리수준에 기대지 않는다.

### 1-3. 왜 지금 드러났나 · 운영 영향

- 10-08 장부 단일 함수 도입 전에도 각 호출부가 제각각 «읽고 쓰기» 를 했으니 **결함은 그때부터 있었다.** 단일 함수가 장부 사슬(stock_after)을 만들었고 LEDGER-004 가 그 사슬을 검사하기 시작해서 **보이게 된 것**이다 — 안전망이 일한 사례다.
- 운영에서 겹칠 수 있는 실제 장면: POS 와 모바일 주문이 같은 재료를 같은 순간 차감(주문 완료 → `deductInventoryForOrder`), 입고하는 중에 판매 차감, 두 기기에서 같은 재료 조정. 겹치면 **재고가 실제보다 많게 남는다**(차감 증발) 또는 입고분이 증발한다. 금액(cost_value)도 같은 줄에 같이 틀어진다.
- 운영 코드는 10-11 배포부터 같다. 운영 DB 에 끊긴 줄이 있는지는 **운영검증/정기 점검 방이 읽기 전용으로** `utils/ledgerDrift.chainBreakSql('2026-10-11')` 을 돌려 본다(메모리 reference_prod_readonly_script_pattern). 이 방(Opus 구현)의 일은 아니다.

### 1-4. 부수 결함 B — 연결 풀 고갈 (별개이지만 같은 묶음에서 고친다)

- `routes/inventory-core.js` 13행 `getRestaurantCostMap(restaurantId)` 는 `transaction` 을 안 받는다. receive 라우트 514행이 **트랜잭션 연결을 쥔 채** 이 함수를 불러 **두 번째 연결**을 요구한다. 동시 요청이 풀(`max 20`) 만큼이면 모두 첫 연결을 쥐고 둘째를 기다려 **서로 막힌다**(Opus 실측: 16건 60초 뒤 `SequelizeConnectionAcquireTimeoutError`).
- 같은 모양이 **주문 차감**에도 있다: `services/inventoryDeductionService.js` `getProductRecipeIngredients(productId)` 가 트랜잭션 없이 조회한다(트랜잭션 시작 뒤 호출). 가장 바쁜 경로다.
- 잠금을 넣으면 트랜잭션이 잠금 대기 동안 연결을 더 오래 쥐므로 **이 결함을 같이 고치지 않으면 풀 압박이 커진다.** 그래서 분리하지 않고 한 묶음이다. 풀 크기·격리수준 설정은 바꾸지 않는다(원인이 아니다).

---

## 2. 설계 원칙 (Opus 는 이 원칙 밖 판단이 필요해지면 즉시 멈추고 보고)

1. **잠금은 `record()` 안에서 한 번.** 35개 호출부가 각자 잠그게 하지 않는다 — 한 곳이 책임진다(«재고를 바꾸는 단일 함수» 약속의 연장).
2. **잠금 대상 = 대상의 마스터 행 1개**: `ingredients.id` / `product_ingredients.id` / `products.id` / `brand_products.id` / `foodcourt_products.id` 를 `SELECT id, current_stock FROM <표> WHERE id = ? FOR UPDATE`. **브랜드 공유 재료의 매장 오버레이(`restaurant_ingredient_stocks`)도 마스터 `ingredients` 행이 뮤텍스다** — 오버레이 행은 없을 수 있고(생성 경합), PO 수령(`purchase-orders-workflow.js` 1250행)이 이미 같은 `ingredients` 행을 잠그므로 잠금 순서가 하나로 모인다. 대가는 «같은 브랜드 재료를 여러 매장이 동시에 바꾸면 매장끼리도 줄을 선다» 인데 트랜잭션이 ms 단위라 받아들인다(2-7 참고).
3. **before 는 잠근 뒤 잠금 읽기로 다시 읽는다.** 호출부가 넘긴 인스턴스의 `current_stock` 은 쓰지 않는다. 오버레이도 `findOne({ lock: t.LOCK.UPDATE })` 로 읽는다(일반 SELECT 금지 — 1-2).
4. **쓰기는 PK 기준 정적 UPDATE.** Sequelize 인스턴스 `row.update()` 는 «인스턴스 값과 같으면 SQL 을 안 낸다»(`model.js` 2472행 `if (!this.changed() && !this.isNewRecord) return this`). 옛 값을 든 인스턴스가 우연히 after 와 같으면 **쓰기가 조용히 빠진다.** `Model.update({...}, { where: { id }, transaction })` 로 쓰고, 호출부 인스턴스는 `row.set(fields, { raw: true })` 로 맞춰 둔다(호출부가 뒤에 `ingredient.update({ last_actual_stock })` 등을 해도 어긋나지 않게).
5. **사전 읽기로 «얼마를 뺄지» 정하는 호출부는 먼저 잠근다.** 주문 차감·수동 차감은 `stockFor()` 로 읽은 값으로 `min(요청, 현재고)` 와 FIFO 배치 차감을 record() **앞에서** 한다. 이 읽기가 잠금 없이 남으면 record() 가 잠근 뒤 다른 값을 보게 되어 배치 차감·장부가 갈라진다. → 새로 내보내는 `lockAndReadStock()` 을 그 자리에 쓴다(한 트랜잭션 안 재잠금은 비용 0).
6. **데드락은 한 곳만 재시도한다.** 한 트랜잭션에서 대상 여러 개를 잠그는 경로(주문 차감: 레시피 재료 여러 개)는 두 주문이 같은 재료들을 다른 순서로 잠그면 MySQL 이 한쪽을 `ER_LOCK_DEADLOCK` 으로 끊는다. `deductInventoryForOrder` 만 트랜잭션 전체를 최대 3회 재시도한다(실사 확정·만들기는 사람이 가끔 누르는 길 — 재시도 없음, 에러는 500 으로 그대로). ⛔ 호출부 `routes/orders-crud.js` 는 🔒 인쇄 보호파일 — **절대 무접촉**, 재시도는 서비스 안에서 끝낸다.
7. **트랜잭션 안에서 트랜잭션 없는 쿼리 0.** `getRestaurantCostMap`·`getProductRecipeIngredients` 두 함수에 `transaction` 을 넘긴다. 다른 곳에서 같은 모양을 발견하면 **고치지 말고 보고에 적는다**(지목된 것만).
8. 바꾸지 않는 것: 풀 크기 · 격리수준 설정 · 모델 파일 · `scripts/inspection/suites/stock-ledger.js` · `utils/ledgerDrift.js` · `routes/orders-crud.js`(🔒) · `routes/purchase-orders-workflow.js`(돈 클래스, 이미 잠금 있음) · 프론트(변경 0 → 빌드 불필요 · SW 버전 그대로).

---

## 3. 바꿀 파일·함수 (절단면 — 이 범위 밖 변경 0)

### A. `dev-backend/services/stockLedger.js` (핵심)

```js
const { QueryTypes } = require('sequelize');
const TABLE_OF = {
  ingredient: 'ingredients', product_ingredient: 'product_ingredients', product: 'products',
  brand_product: 'brand_products', foodcourt_product: 'foodcourt_products',
};
const MODEL_OF = { ingredient: 'Ingredient', product_ingredient: 'ProductIngredient', product: 'Product',
  brand_product: 'BrandProduct', foodcourt_product: 'FoodcourtProduct' };

/** 대상 마스터 행을 잠그고(FOR UPDATE) 그 행의 current_stock 을 돌려준다. 같은 트랜잭션에서 여러 번 불러도 된다. */
async function lockTarget(target, transaction) {
  if (!transaction) throw new Error('stockLedger.lockTarget: transaction 필요');
  const table = TABLE_OF[target.kind];
  const rows = await InventoryTransaction.sequelize.query(
    `SELECT id, current_stock FROM ${table} WHERE id = :id FOR UPDATE`,
    { replacements: { id: target.row.id }, type: QueryTypes.SELECT, transaction });
  if (!rows.length) throw new Error(`stockLedger: ${target.kind} ${target.row.id} not found`);
  return parseFloat(rows[0].current_stock) || 0;
}

/** 잠근 뒤의 «지금 재고» — 브랜드 재료+매장이면 오버레이를 잠금 읽기로, 아니면 잠근 마스터 행 값. */
async function lockAndReadStock(target, restaurantId, transaction) {
  const master = await lockTarget(target, transaction);
  const { kind, row } = target;
  if (kind === 'ingredient' && restaurantId && row.owner_type === 'brand') {
    const o = await RestaurantIngredientStock.findOne({
      where: { restaurant_id: restaurantId, ingredient_id: row.id },
      transaction, lock: transaction.LOCK.UPDATE,
    });
    return o ? parseFloat(o.current_stock) || 0 : 0;
  }
  return master;
}
```
- `record()` 101행: `const before = round2(await currentStockOf(...))` → `round2(await lockAndReadStock(target, restaurantId, transaction))`.
- `applyNewStock()` 비재료·비오버레이 경로(72행 `row.update(...)`) → `require('../models')[MODEL_OF[kind]].update({ current_stock: newStock, ...extra }, { where: { id: row.id }, transaction })` 뒤 `row.set({ current_stock: newStock, ...extra }, { raw: true })`.
- `currentStockOf()` 는 남겨 둔다(수출 유지 · 읽기 전용 용도). 단 record() 는 더 이상 쓰지 않는다. 헤더 주석에 규칙 한 단락 추가: «잠금은 이 함수 안에서(마스터 행 FOR UPDATE → 잠금 읽기 → 정적 UPDATE). 호출부가 사전 읽기로 수량을 정하면 `lockAndReadStock` 을 먼저 부른다. 2026-10-16 Fable 판정 (이 문서 경로).»
- `module.exports` 에 `lockTarget`, `lockAndReadStock` 추가.
- `row.owner_type` 은 재료 인스턴스에 항상 있다(findByPk / include 전부 전체 속성). `attributes` 를 좁혀 읽은 인스턴스를 넘기는 호출부가 있으면 Opus 는 그 자리만 보고하고 멈춘다(지금 조사로는 없음).

### B. `dev-backend/utils/brandStockAccess.js` `applyStock()` (164~185행)

- 전제 주석 추가: «호출자는 `stockLedger.lockTarget` 으로 마스터 행을 잠근 상태다(지금 호출자는 stockLedger 하나 — 직접 호출 0 확인).»
- 브랜드 경로: `findOrCreate` → **`findOne({ where, transaction, lock: transaction.LOCK.UPDATE })` 후 없으면 `create({ ..., current_stock: rounded, ...stamp }, { transaction })`, 있으면 `row.update({ current_stock: rounded, ...stamp }, { transaction })`**(이 row 는 방금 잠금 읽기로 가져온 신선한 인스턴스라 인스턴스 update 가 안전하다). findOrCreate 를 버리는 이유: REPEATABLE-READ 스냅샷에서는 «있는 행을 못 보고 INSERT → 중복키 → 재조회도 못 봄» 이 가능하고, 마스터 잠금 덕에 생성 경합 자체가 없어 findOrCreate 가 필요 없다.
- 매장 재료 경로(183행 `ing.update`) → `Ingredient.update({ current_stock: rounded, ...stamp }, { where: { id: ing.id }, transaction })` + `ing.set({ current_stock: rounded, ...stamp }, { raw: true })`.
- `applySettings`(설정 저장, 236행) 의 findOrCreate 는 **그대로**(재고 아님 · 범위 밖).

### C. `dev-backend/services/inventoryDeductionService.js`

1. `getProductRecipeIngredients(productId)` → `getProductRecipeIngredients(productId, transaction)` 로 바꾸고 `findByPk(productId, { include, transaction })`. 호출부(196행 근처) 에서 `transaction` 전달. `calculateRequiredIngredients` 등 다른 호출부가 있으면 인자 없이 호출해도 되게 기본값 `transaction = null`.
2. 283행 `const currentStock = await stockFor(ingredient, restaurantId, transaction)` → `await stockLedger.lockAndReadStock({ kind: 'ingredient', row: ingredient }, restaurantId, transaction)`.
3. 363행 `oiCurrentStock = await stockFor(oi.ingredient, ...)` → 같은 교체.
4. 224행 `Product.findByPk(productId, { transaction })` (상품 자체 재고 경로) → `{ transaction, lock: transaction.LOCK.UPDATE }` 추가(그 뒤 `cur = prod.current_stock` 을 쓰므로 신선해야 한다).
5. 데드락 재시도: 지금 `deductInventoryForOrder` 본문(트랜잭션 시작~commit/rollback)을 `deductOnce(restaurantId, orderItems, orderRef)` 로 빼고, 바깥에서
   ```js
   const isDeadlock = (e) => ['ER_LOCK_DEADLOCK'].includes(e && (e.original && e.original.code || e.parent && e.parent.code));
   for (let attempt = 1; ; attempt++) {
     try { return await deductOnce(...); }
     catch (e) {
       if (!isDeadlock(e) || attempt >= 3) throw e;
       console.warn(`[INVENTORY] deadlock, retry ${attempt}/3 order ${orderRef.label}`);
       await new Promise(r => setTimeout(r, 50 * attempt));
     }
   }
   ```
   `deductOnce` 안의 기존 `catch` 는 rollback 뒤 **데드락이면 다시 throw**, 아니면 지금처럼 `{ success:false, error }` 반환(호출부 orders-crud 의 처리 모양을 바꾸지 않기 위해 반환 계약 유지).
   `stockLedger` import 는 파일에 이미 있다.

### D. `dev-backend/routes/inventory-core.js`

- 13행 `getRestaurantCostMap(restaurantId)` → `getRestaurantCostMap(restaurantId, transaction = null)`; 안에서 `loadOverlayMap(restaurantId, undefined, { transaction })`.
- 514행(receive, 트랜잭션 안) `getRestaurantCostMap(restaurantId)` → `getRestaurantCostMap(restaurantId, transaction)`.
- 842행(실사 시작, 트랜잭션 안) → 같이 `transaction` 전달. 1144행(재주문 조회, 트랜잭션 밖) → 그대로.
- receive/adjust/waste/initial/stock-take complete 라우트의 record 호출은 **변경 없음**(record 가 잠근다). waste(574행)는 이미 `change` 를 받아 FIFO 를 record 뒤에 하므로 올바른 순서다.

### E. `dev-backend/routes/inventory-extra.js` 수동 차감(533~560행)

- 543행 `const currentStock = await stockFor(ingredient, restaurantId, transaction)` → `await stockLedger.lockAndReadStock({ kind: 'ingredient', row: ingredient }, restaurantId, transaction)`. (이 값으로 400 판정과 FIFO 를 record 앞에서 한다.)
- 배치 폐기(615~625행)는 `clampAtZero: true` 로 record 가 결정하므로 변경 없음.

### F. 변경 없음(확인만)

- `services/purchaseOrderReceive.js` — receive 는 이미 `ingredients` 행을 잠근 뒤 들어오고, mark-received(`lockIngredient:false`)는 record 가 잠그므로 둘 다 맞는다. 넘기는 `currentStock` 은 반환값 연결용이지 record 계산엔 안 쓰인다.
- `routes/inventory-produce.js`(만들기), `routes/inventory-core.js` 실사 확정(1040행대) — 대상 여러 개를 한 트랜잭션에서 잠근다. 데드락은 드물고 사람이 다시 누르면 되므로 재시도 없이 둔다(보고에 한 줄).
- po-returns·seller-orders·brand-stock-takes 는 이미 FOR UPDATE 로 읽은 인스턴스를 넘긴다 → record 의 재잠금은 같은 트랜잭션이라 즉시 통과.

### G. `dev-backend/scripts/health-check.js` — 영구 케이스 3개 추가(카테고리 `inventory`, 데모 매장만, 뒷정리 포함)

③ **장부 잠금 계약(결정적 · DB 직접)** — `ZZ-HC-LEDGER-LOCK-<ts>` 매장 소유 재료를 INSERT(current_stock 100, 장부 initial 1줄은 record 로). T1 = `sequelize.transaction()`; T2 = `sequelize.transaction()` 에서 **먼저 `Ingredient.findByPk(id, { transaction: t2 })` 로 일반 읽기 1회**(스냅샷 고정). T1 에서 `record({ delta:+1 })` (커밋 안 함). T2 에서 `record({ delta:-1 })` 를 **await 없이** 시작하고 300ms 뒤 아직 끝나지 않았는지 확인(끝났으면 실패 = 잠금 없음). T1 commit → T2 결과 `before === 101 && after === 100` → T2 commit. 장부 3줄 사슬 OK(`chainBreakSql` 을 그 재료 id 로 좁혀 0) · 최종 current_stock 100. **브랜드 재료 판** 도 같은 시험 1회(ingredient owner_type='brand', brand_id = 데모 38 의 brand_id, restaurantId=38, 오버레이 경로) — 두 판 모두 통과해야 OK.
④ **동시 HTTP 요청** — 같은 식 스크래치 재료(시작 100)에 `/inventory/receive {quantity:1}` ×6 과 `/inventory/adjust {quantity:-1}` ×6 을 `Promise.all` 로 동시에. 기대: 12/12 200 · 장부 12줄 · 사슬 끊김 0 · Σ quantity_change = 0 · 최종 100. 뒷정리: inventory_transactions · inventory_batches · stock_alerts · (오버레이) restaurant_ingredient_stocks · ingredients.
⑤ **풀 고갈 없음** — `/inventory/receive {quantity:1}` ×20 동시 → 20/20 200, 전체 완료 15초 이내(60초 acquire 타임아웃이 한 번이라도 나면 실패).
- 세 시험 모두 `demoRaToken/demoRestId` 없으면 기존 관례대로 «건너뜀» 로그 + true.

### H. `dev-backend/scripts/check-sensitive-diff.js` money 클래스 패턴 보강 (안전망 · 근거 = 이 문서)

- 지금 패턴엔 `services/stockLedger` · `services/inventoryDeductionService` · `services/purchaseOrderReceive` · `utils/brandStockAccess` · `utils/ledgerDrift` 가 **없다** → 이번 변경(재고 수량·금액의 본체)이 Fable 게이트 분류에 안 걸린다. 2026-09-10 `purchaseOrderPayment` 누락과 같은 구멍이다. money 클래스 `match` 에
  `|| /dev-backend\/(services\/(stockLedger|inventoryDeductionService|purchaseOrderReceive)|utils\/(brandStockAccess|ledgerDrift))/i.test(f)` 를 추가한다. 반증: 이번 변경 파일만 바뀐 상태에서 `node scripts/check-sensitive-diff.js` 가 «FABLE 게이트 대상» 으로 판정하는지 1회.

---

## 4. 구현 순서

1. A → B → C → D → E (백엔드만 · 프론트 0) → `pm2 restart dev-backend`.
2. G(health-check 3건) → H(분류기).
3. 검증 §5 → 보고 → **Fable 게이트 검증 1회**(§6) → 마커는 Fable 세션이 찍는다.
4. 작업 기록: `.claude/session-state.md` 진행 중 항목을 완료로 · 메모리에 «record() 가 잠근다 · 사전 읽기는 lockAndReadStock» 한 줄. 새 docs 파일 만들지 않는다(단일 진실 = `services/stockLedger.js` 헤더 + 이 문서).

---

## 5. 검증·반증 (Opus 실행 · 전부 숫자로 보고 · 못 한 것은 «확인 불가»)

| # | 무엇 | 통과 기준 | 반증(깨뜨려서 확인 · 1회 뒤 원복) |
|---|---|---|---|
| V1 | health-check ③ 잠금 계약(매장 재료·브랜드 오버레이 2판) | T2 가 T1 커밋 전 300ms 동안 끝나지 않음 · before 101/after 100 · 사슬 0 · 최종 100 | `lockAndReadStock` 을 옛 `currentStockOf` 로 되돌리면(또는 `FOR UPDATE` 삭제) T2 즉시 끝나고 before 100 → **실패해야** 함 |
| V2 | health-check ④ 동시 12건 ×3회 | 3회 모두 12/12 200 · 끊김 0 · Σ=0 · 최종 100 | 잠금 제거 상태로 3회 → ≥1회 실패. 3/3 통과면 6+6 → 10+10 으로 올려 다시(확률적 — 횟수와 결과를 보고) |
| V3 | health-check ⑤ 풀 20 동시 | 20/20 200 · 15초 이내 · pm2 로그 `SequelizeConnectionAcquireTimeoutError` 0 | D 의 `transaction` 전달을 빼면 Opus 가 이미 본 60초 타임아웃이 재현되어야 함(1회) |
| V4 | 데드락 재시도 | ① `isDeadlock` 단위: `{ original: { code: 'ER_LOCK_DEADLOCK' } }` 를 두 번 던지는 가짜 `deductOnce` 로 3회 호출·성공 ② 임시 스크립트로 두 트랜잭션이 재료 A→B, B→A 를 FOR UPDATE 로 교차 잠가 MySQL 이 실제로 `e.original.code === 'ER_LOCK_DEADLOCK'` 을 주는지 1회(코드 문자열 확정) — 스크립트는 삭제 | ①에서 코드 문자열을 틀리게 바꾸면 재시도 없이 throw |
| V5 | 격리수준 실측(사실 확정) | 스크래치 재료: T2 일반 SELECT → T1 UPDATE+commit → T2 다시 일반 SELECT. 새 값이면 READ COMMITTED, 옛 값이면 REPEATABLE-READ. **결과를 보고에 적는다**(설계는 둘 다 안전 — 수정 아님) | — |
| V6 | 게이트 | `node scripts/verify-all.js`(health 전체 + inspection stock-ledger LEDGER-001~004 + print-guard **변경 0** — orders-crud 무접촉 증명) · `node scripts/check-sensitive-diff.js` → FABLE 대상 판정(H 반증 겸) · `npx jest tests/order-totals.test.js` 영향 없음 확인 | — |
| V7 | 기존 시험 회귀 | health-check 2106행 «브랜드 재고 오버레이» · 3405행 «장부 ①» · «원가 ①» 그대로 통과 | — |

- 시험 데이터는 전부 데모 매장(38 또는 `is_demo=1` 첫 매장) 스크래치 재료만 · 끝나면 삭제. 실매장 쓰기 0.
- 프론트 빌드 없음 → `--full` 불필요. health-check 전 `pm2 restart dev-backend` 필수(HTTP 시험이 새 코드를 쳐야 한다).

---

## 6. Fable 게이트(구현 뒤 검증 1회)에서 볼 것

① diff 가 §3 A~H 범위 안인지(🔒 `orders-crud.js`·`purchase-orders-workflow.js`·모델·설정 무접촉) ② V1~V7 숫자(특히 V1 반증 실패 1회, V2 반증 ≥1회 실패) ③ `applyNewStock`/`applyStock` 이 정적 UPDATE 인지(인스턴스 `changed()` 함정) ④ `lockAndReadStock` 오버레이 읽기가 `lock: LOCK.UPDATE` 인지 ⑤ 배포 안전성: 마이그 0 · SW bump 불필요 · 롤백 = 코드만.

---

## 7. 운영 반영·후속

- 운영 반영: 다음 배포 때(이 방은 배포를 묻지 않는다).
- 배포 뒤 **운영검증/정기 점검 방**: 운영 DB 읽기 전용으로 `chainBreakSql('2026-10-11')` 실행 → 끊긴 줄이 있으면 dev 와 같은 절차(백업 → Irene 허락 → 정리 또는 `reason_code='ledger_reconcile'` 기준점 줄). 이 문서의 코드 수정과 별건.
- Irene 결정 필요 사항: **없음**(되돌릴 수 있는 코드 변경 · 설계 확정). Fable 안 쓴 부분 없음 — 이 사안은 cause+design 1회, gate 1회로 2회 소진.
