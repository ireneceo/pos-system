# [Fable 판정] A안 — 배포 상품은 연결 없이 주문 + 서비스 상품 주문 (2026-10-01 · 설계 1회차)

> Irene 원문(2026-09-30): **「A로 해. 서비스 상품도 주문 넣을 수 있게.」**
> Irene 원문(2026-10-01): **「응응. 하나씩 다 해. 제대로」**
> 작성: Fable 5.1 · 코드 수정 0 · 운영은 읽기만. 구현은 팀원(Opus).

---

## 0. 호출 조건 판정

- A 파급: 운영 발주·재고·청구 금액에 닿는다(PO 87 이 지금 `shipped` 상태로 서비스 줄을 품고 수령 대기).
- B 가역성: 배포 + 운영 재고 숫자가 움직인다.
- C 갈림: «타깃 없는 발주 줄» / «자동 담기(현 구현)» / «서비스 줄의 구매자 재고를 올릴 것인가» — 세 갈래가 실제로 갈린다.
→ **호출 조건 성립.** 이 문서가 1회차(설계). 2회차(게이트)는 **훅이 막을 때만** 1회.

---

## 1. 실측으로 보탠 사실 (팀원 전달 자료의 정정 포함)

### 1-1. A안 판매자 쪽은 **이미 구현돼 운영에 올라가 있다**
- 커밋 `2c06fafbe`(2026-09-29 18:45 UTC auto-save)에 `routes/seller-orders.js` 의 `unlinkedBrandProductsFor()` + `POST /api/seller-orders` 선두의 자동 담기 블록, `services/restaurantCatalogLink.js`(from-catalog 라우트에서 추출), 프론트 `IncomingOrdersView.tsx` 의 `link_brand_product_id` → `−id` 고르기 키가 들어 있다.
- 운영 실측: `production-backend/routes/seller-orders.js` 에 `unlinkedBrandProductsFor` 2곳, `linkCatalogProductToRestaurant` 호출 있음 · `production-frontend/build/static/js/8790.bd84ca0f.chunk.js` 에 `link_brand_product_id` 있음. v3.105/v3.106 배포에 실려 갔다.
- **운영에서 이 경로가 실제로 돈 흔적은 0건.** 재료 1253~1255(매장 8)는 PO 87 보다 2분 32초 앞서(17:06:16 vs 17:08:56), 1259(매장 10, Garbage Bag)는 PO 90 보다 3분 28초 앞서 **사람이 from-catalog 로 담은 것**이다. 자동 담기 = 발주와 같은 초에 생긴 재료 행은 없다.
- 즉 «Fable 판정 대기» 로 적혀 있던 사안이 실제로는 **판정 없이 운영에 간 상태**다. 이 문서는 그 구현을 **사후 판정**하고 남은 갈라짐을 메우는 것이다(되돌리지 않는다 — 아래 §2 가 그 이유).

### 1-2. 선택지 원문 ①「서비스 상품은 재고 품목이 없어 주문 불가」 는 틀렸다
- `linkCatalogProductToRestaurant` 는 `product_kind` 를 보지 않는다. 서비스 상품도 매장 재료 행(단위는 `normalizeUnit` 로 `hour`→`piece`)과 판매 연결이 생기고 발주 줄이 만들어진다.
- 운영 증거: PO-R8-20260929-007(id 87, `shipped`) 줄 510 = 상품 258 «Menu_Paper Matte lamination 20pges»(`service`) 5 × 55.00 = 275.00, 함께 LED 라이트박스 2줄(259·260, `stock`). 물건이 섞였으니 «배송 있는 주문» 으로 간 것도 규칙대로다.
- 운영 서비스 상품은 2개: 249 «Cooking Training (4 hours)»(`external_buyers`, 단위 hour) · 258(`all`). 주문제작 1개: 251.

### 1-3. 구매자(매장) 쪽은 이미 «연결 없이 주문» 이다 — 구조 결함 아님
- 발주 화면 **Supplier Catalog 탭** 에서 브랜드 상품을 클릭하면 `from-catalog` 가 재료+연결을 만들고 카트에 담는다(«it's added to your inventory automatically»). 내 재고 탭 검색이 0건이면 `/api/supplier-catalog?search=` 를 한 번 찔러 «N matching supplier product(s) exist — See them in the catalog» 배너를 띄운다(브랜드 상품도 `brandLikeWhere` 로 검색된다).
- Garbage Bag(PRD-163→257) 건은 **내 재고 탭에서 검색한 것**이고, Irene 이 카탈로그에서 담아(1259) 발주(PO 90, 수령 완료 2 piece)까지 끝냈다. 고칠 구조가 없다.

### 1-4. 남아 있는 갈라짐 (코드 실측)
| # | 갈라짐 | 위치 | 영향 |
|---|---|---|---|
| (a) | **구매자 수령이 서비스 줄의 재고를 올린다.** 판매자 출고는 `service`/`made_to_order` 를 건너뛰는데(`seller-orders.js:712`), 수령 쪽 `services/purchaseOrderReceive.js` 엔 `product_kind` 분기가 **0줄**. | `applyReceiptToStock` → `receiveIntoIngredient` | 운영 PO 87 을 수령하면 재료 1253 «메뉴 라미네이팅» 재고 0 → **5 piece**, 배치·원장·가중평균 원가(55.00)까지 생긴다. Irene 정의(서비스 = 재고관리 안함)와 어긋남 |
| (b) | **품목 수정(amend) 후보에 미연결 배포 상품이 안 뜬다.** `GET /:id/amendable-products` 는 `listAmendableProducts` 만 부른다(`:1194`). 주문 추가와 다른 답. | `seller-orders.js:1186~1200`, `POST /:id/amend` | «주문 추가에선 되는데 수정에선 없음» |
| (c) | 자동 담기 블록이 `POST /` 안에 **인라인**이다(함수 아님). amend 에 같은 일을 하려면 복제하게 된다. | `seller-orders.js:1013~1050` | 두 벌 위험(feedback_check_and_fix_same_sql) |
| (d) | **기계 증명 0.** health-check 에 `GET sellable-products` · `POST /seller-orders` 계약이 없다(있는 건 ship/returns/list 뿐). 운영에 간 경로가 게이트 밖이다. | `scripts/health-check.js` | 다음 변경이 이 경로를 깨도 못 잡는다 |
| (e) | 연결은 있으나 `is_active=false` 인 매핑: 후보 목록엔 «미연결» 로 뜨고(`listAmendableProducts` 가 걸러서), 저장 때 `findAlreadyLinked` 가 그 비활성 매핑을 돌려줘 `PRODUCT_INACTIVE` 400. | `restaurantCatalogLink` + `poAmend.mappingUsableBy` | 드문 edge, 메시지는 정확함 — **고치지 않는다**, 기록만 |
| (f) | 구조 문서에 없다. `docs/TRADE_STRUCTURE.md §4` 는 «매장이 자기 재료 목록에 올리는 단계가 끼어 있다» 까지만. | 문서 | CLAUDE.md «구조 문서 선행» 조항 미이행 |

### 1-5. 돈·청구는 영향 0 (확인)
- 거래 청구서 줄은 `quantity_ordered` · `line_total` 로 만든다(`purchaseOrderService.js:271~275`). 수령 skip 이 금액을 바꾸지 않는다.
- `quantity_received` 는 `applyReceipt` 한 곳에서만 쓰며 `r.ok && !r.skipped` 일 때만 적힌다 — 서비스 줄은 «재고는 안 움직이되 수령량은 적힌» 결과값을 돌려줘야 한다(§3 S2).

---

## 2. 판정

### 2-0. 한 줄
**«연결 없이 주문» 의 구현은 «연결을 서버가 대신 만든다 — 매장이 누를 버튼(from-catalog)을 같은 함수로 누르는 것» 이 맞다. 새 목록·새 경로 0. 발주 줄 = 판매 연결 = 재고 자리(넷 중 정확히 하나) 불변식은 그대로 둔다. 서비스 상품의 매장 재료 행은 «발주 전용 자리» 이고 그 재고는 어느 쪽에서도 움직이지 않는다.**

### 2-1. 거부한 두 길
1. **타깃 없는 발주 줄**(서비스 줄은 `ingredient_id` 등 넷 다 null). — `utils/stockTarget` 의 «넷 중 정확히 하나» 는 쓰기 전부가 통과하는 불변식이고 인스펙션이 DB 에서 다시 잰다. 수령·청구·반품·대조·이메일·화면 조인(`items.ingredient`) 전부에 «타깃 없음» 분기가 생긴다 = 2026-09-02 P4-2 가 없앤 갈라짐을 다시 만드는 것. **기각.**
2. **`brand_product_id` 를 타깃으로 쓰기.** — 그 칸의 뜻은 «BG 가 구매자일 때 자기 프로덕트 재고». 매장이 구매자인 줄에 넣으면 수령이 **판매자의** 프로덕트 재고를 올린다(`receiveIntoProduct` 소유권 검사에서 400 으로 죽거나, 통과하면 역방향 사고). **기각.**

### 2-2. 채택 — 현 구현 유지 + 갈라짐 4개 봉합
- **재료 개념에 새 목록이 생기는가?** 아니다. 생기는 행은 매장이 카탈로그를 클릭했을 때와 **같은 행**(`owner_type='restaurant'`, 출처 = 판매 연결)이다. 2026-08-28 «GIT 판매상품 81건 발주 전용 등록» 과 같은 종류. ING-UNI 검사(브랜드 소유 행 대상)에 걸리지 않는다.
- **판매자 결정성**: `sellerIdForBuyer` = 그 매장의 `brand_id`, `linkCatalogProductToRestaurant` 의 `brandSellerEntityId` 도 `rest.brand_id` — 같은 값. 다브랜드 소유자 결함(BG Stock Items 경로)은 이 경로에 없다.
- **서비스 상품 규칙을 양쪽 대칭으로**: 판매자 출고 skip(이미 있음) ↔ **구매자 수령 skip(이번에 추가)**. `made_to_order` 는 물건이 오므로 구매자 재고는 올린다(판매자만 skip) — 비대칭이 맞다.
- **구매자 발주 화면은 무접촉.**

---

## 3. 절단면 (팀원 실행 · 순서 고정 · 🔒 인쇄 8파일·KDS 0 접촉)

| 순서 | 파일 | 할 일 |
|---|---|---|
| **S1** | `dev-backend/utils/orderFulfillment.js` | 서비스 **줄** 판정을 여기 한 곳에 추가: `serviceLineIdsOf(sequelize, purchaseOrderId, transaction)` → `Set<poi.id>` (`isServiceOnlyOrder` 와 **같은 JOIN** — 매핑 → `brand_products.product_kind='service'`, 매핑 없는 줄은 물건). 라우트·화면에 복사 금지(파일 머리 ⛔ 그대로). |
| **S2** | `dev-backend/services/purchaseOrderReceive.js` | `applyReceiptToStock` 의 **ingredient 분기 앞**에서 서비스 줄이면 `{ ok:true, normalQty: qty, serviceLine:true }` 를 돌려준다 — `skipped` 가 **아니어서** `applyReceipt` 가 `quantity_received` 를 적는다. 배치·원장·가중평균·`applyStock` 전부 무접촉. `markAllReceived` 와 분할 수령(`/receive`)이 둘 다 `applyReceipt` 를 거치는지 확인(둘 다 거친다 — P4-2). 서비스 줄 집합은 호출부가 한 번 구해 넘기거나, 함수 안에서 `item.purchase_order_id` 로 1회 조회해 캐시 — 줄마다 쿼리 1개면 충분, 최적화 금지. |
| **S3** | `dev-backend/routes/seller-orders.js` | ① `POST /` 선두의 자동 담기 블록을 `linkUnlinkedBrandItems(req, restaurantId, rawItems)` 함수로 뺀다(동작 불변: 트랜잭션 **밖**·멱등·`PRODUCT_NOT_YOURS`/배포범위 403 그대로). ② `POST /:id/amend` 가 트랜잭션 앞에서 같은 함수를 부른다(구매자 = `po.entity_id`, 판매자 = `po.seller_entity_id` 와 `sellerIdForBuyer` 일치 확인). ③ `GET /:id/amendable-products` 가 `amendable` 일 때 `unlinkedBrandProductsFor(po.entity_id, po.seller_entity_id, products)` 를 합친다(판매자가 brand 일 때만). |
| **S4** | `dev-frontend/src/pages/IncomingOrders/IncomingOrdersView.tsx` | 품목 수정 모달이 주문 추가와 **같은 −id 규약**을 쓴다: 후보 받을 때 `link_brand_product_id` → `−id`, 저장 때 `key<0 ? { brand_product_id:-key } : { ingredient_seller_product_id:key }`. 표시 변경 없음(배지 추가 금지 — Irene 요구는 «그냥 뜨게»). |
| **S5** | `dev-backend/scripts/health-check.js` | 계약 추가(데모 매장·브랜드 fixture, 원복): §4 P1·P2·P3·P4·P6·P7. 카테고리는 기존 발주 계약이 있는 곳에 붙인다(새 카테고리 만들지 않음). |
| **S6** | `docs/TRADE_STRUCTURE.md` | §4 에 한 문단: «판매자가 매장 대신 주문을 넣을 때 아직 안 담긴 배포 상품은 서버가 **매장의 카탈로그 담기와 같은 함수**로 먼저 담는다(새 경로 아님)». §2-4 표 아래에 «구매자 수령: `service` 줄은 재고·배치·원장·원가 무접촉, 수령량만 적힘 · `made_to_order` 는 올림». 이 문서 경로를 링크. `docs/PURCHASE_ORDER_SYSTEM.md` 엔 작업 기록 1절. 메모리 `reference_seller_add_order_needs_buyer_link` 의 «Fable 판정 대기» 줄을 결론으로 갱신. |
| **S7** | SW 버전 | 프론트 변경이 **다 끝난 뒤** 마지막에 1회. |

**접촉 금지:** `utils/catalogLink.js`(4벌 의미 보존 주석) · `utils/stockTarget.js` 불변식 · `from-catalog` 라우트 계약 · `poAmend.mappingUsableBy` 조건 · 구매자 발주 화면 · 판매자 출고 분기(`seller-orders.js:712`) · 반품 경로.
**하지 않는 것:** (e) 비활성 매핑 edge · 재료 목록에 «Service» 태그 · 내 재고 탭 검색에 카탈로그 섞기 · 서비스 전용 주문 완료 시 청구서 즉시 발행(별건, 후속 후보 그대로).

---

## 4. 증명 기준 (팀원이 기계로 — 이 표가 곧 게이트. 2회차 Fable 은 훅이 막을 때만)

dev 준비: 데모 브랜드에 서비스 상품 1개(`product_kind='service'`, `distribution_mode='all'`, 단위 `hour`) + 주문제작 1개 + 재고 상품 1개를 만들고 끝나면 원복. 데모 매장만 쓴다(운영 매장 0 접촉).

| # | 증명 | 기대 |
|---|---|---|
| P1 | 판매자 `GET /api/seller-orders/sellable-products?entity_type=restaurant&entity_id=<데모매장>` | 미연결 배포 상품 + 서비스 상품 둘 다 `ingredient_seller_product_id:null, link_brand_product_id:<id>` 로 있음. 연결된 것은 매핑 id 로 1번만(중복 0) |
| P2 | `POST /api/seller-orders` items `[{brand_product_id, quantity_ordered}]` 2줄(서비스+재고) | 201 · `ingredients` +2 · `ingredient_seller_products` +2 · 줄 2. **같은 상품으로 두 번째 주문** → 재료·매핑 행 **+0**(멱등) |
| P3 | 남의 브랜드 상품 id / `specific_restaurants` 에 이 매장이 없는 상품 | 400 `PRODUCT_NOT_YOURS` / 403 (from-catalog 와 같은 메시지) · 발주·재료 행 생성 0 |
| P4 | P2 주문을 confirm → ship → 구매자 mark-received(및 분할 `/receive` 1회) | 재고 상품 줄: 매장 재고 + · 배치 1 · 원장 1 / **서비스 줄: 재고 0 유지 · 배치 0 · 원장 0 · 원가행 변동 0 · `quantity_received = quantity_ordered`** · PO `received` · 거래 청구서 총액 = `line_total` 합(수령 전과 동일) |
| P5 | 서비스만 담은 주문 → `POST /:id/complete` | `received` · 재고 무접촉(기존 동작 회귀 0) |
| P6 | 주문제작(`made_to_order`) 줄 수령 | 구매자 재고 **올라감**(판매자만 skip 인 비대칭 확인) |
| P7 | `GET /:id/amendable-products` 에 미연결 상품 포함 → `POST /:id/amend` 로 그 줄 추가(총액 ≤ 승인액) | 200 · 자동 담기 1회 · 총액 초과면 `TOTAL_EXCEEDS` 그대로 |
| P8 | **고장주입 2건**: ① S2 의 서비스 skip 을 지우면 P4 서비스 줄 재고가 5 가 되어 **실패**해야 함 ② S3 함수의 `owners.includes` 검사를 지우면 P3 이 201 로 **실패**해야 함. 주입 → 확인 → 원복, 보고에 pm2 재시작 여부 |
| P9 | `node scripts/check-sensitive-diff.js` · `verify-all --full` 1회(프론트 S4 뒤) · inspection `ingredient-unification` 결과가 작업 전후 **동일** · `check-print-guard` 0건 |
| P10 | 운영 읽기(배포 후): PO 87 을 Irene 이 수령한 뒤 재료 1253 `current_stock = 0`, `inventory_batches`/`inventory_transactions` 에 1253 행 0, 줄 510 `quantity_received = 5` |

---

## 5. Irene 컨펌 요청 (각각 Fable 권고 첨부)

**Q1. 서비스 줄을 수령할 때 매장 재고를 올리지 않는다.**
- 권고: **올리지 않는다.** Irene 정의(2026-09-13 「서비스/기타 = 재고관리 안함」)를 구매자 쪽에도 적용. 올리면 재고 목록에 «메뉴 라미네이팅 5 piece · 원가 55» 가 생겨 재고 가치·저재고에 섞인다.
- 대안(현 상태 유지): 서비스가 재고로 쌓인다. 권하지 않음.

**Q2. 운영 PO-R8-20260929-007(87, shipped, 서비스 1줄 + LED 2줄) 수령 시점.**
- 권고: **이번 배포 뒤에 수령.** 그러면 1253 재고가 0 으로 남는다(P10).
- 배포 전에 수령해야 하면: 1253 에 5 piece 가 생긴다 → 그때는 Irene 이 재고조정으로 0 을 만들면 된다. 코드로 소급 수정하지 않는다(사람이 보고 결정).

**Q3. 품목 수정(amend)에서도 아직 안 담긴 배포 상품을 고를 수 있게.**
- 권고: **허용.** 주문 추가와 수정이 다른 답을 내면 «추가에선 됐는데 수정에선 없다» 가 된다. 총액 게이트(승인액 초과 금지)는 그대로.

**Q4. 매장 발주 화면 «내 재고» 탭 검색에 아직 안 담은 카탈로그 상품을 섞어 보이기.**
- 권고: **이번엔 하지 않는다.** 이미 0건이면 «카탈로그에 N건 있음 → 보기» 배너가 뜨고, 카탈로그 클릭이 곧 담기+주문이다. Garbage Bag 건은 이 흐름으로 끝났다(PO 90 수령 완료). 원하시면 별건으로 받는다.

**Q5. 보고(컨펌 아님).** 판매자 쪽 A안 코드가 Fable 판정 전에 v3.105/3.106 에 실려 운영에 나가 있었다(실사용 흔적 0). 되돌리지 않는 이유는 §2 — 구조가 맞다. 이 문서가 사후 판정이다.

---

## 6. 팀원 지시
1. §3 S1→S7 순서로 구현. 프론트는 S4 하나뿐이니 **빌드 1회 · verify-all --full 1회**(S7 뒤).
2. §4 P1~P9 를 전부 기계로 돌리고 결과 표를 그대로 붙여 보고. 「통과 = 완료」 선언은 하지 않는다.
3. 구현 중 세부(함수 이름·캐시 방식·메시지 문구)는 팀원이 정하고 결과에 붙인다. 되묻지 않는다. 단, §2-1 의 두 길로 가야 하는 상황이 되면 **즉시 중단**하고 사실만 가져온다.
4. 배포는 Irene `/배포` 지시로만. P10 은 배포 뒤 Irene 수령 다음에 읽기만.
