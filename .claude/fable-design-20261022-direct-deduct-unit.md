# [Fable 판정] 재고아이템 다이렉트 상품의 출고 차감 단위 — 차감식이 틀렸다 (2026-10-22 · 작업방 669bfa10)

> 요청서 `.claude/fable-request-20261022-direct-deduct-unit.md` · 앞 일 `.claude/fable-design-20261021-product-form-cost-stock.md`(PASS gate `.claude/fable-gate-20261022-product-form-cost-stock.md`)
> 판정자 Fable · 읽기·개발 DB 읽기만(코드 수정 0 · 운영 쓰기 0 · 배포 0).
> 기준 문서: `docs/TRADE_STRUCTURE.md` §2-1 · §2-2 · §5-12 · `services/sellerLinkConversion.js` · `utils/unitConversionRule.js` · `dev-frontend/src/utils/productMargin.ts` 머리 주석.

## 0. 호출 조건

- **cause + calc** — 재고 차감 수식(돈·주문 무결성)을 바꾸는 판정. 라벨/생성 규칙/데이터 세 갈래 중 어느 쪽이 정석인지 원인을 가르고, 바뀐 수식의 검산 사례를 정한다.
- 구현 뒤 **gate 1회**(재고 차감·반품 환원 수식 변경 = «되돌리기 어려운 변경» ②). 한 사안 2회(판정 1 + gate 1) 안.

## 1. 한 줄 결론

**차감식이 틀렸다. 라벨과 생성 규칙은 정석이고, 데이터(9 g)는 라벨이 맞게 말한 값이다.** `routes/seller-orders.js` 다이렉트 분기 `delta: -quantity_ordered` 의 «1개» 는 2026-09-04 당시 «상품 판매 단위 = 재고아이템 취급단위» 였을 때의 말이고, 09-11 에 판매 상품이 다섯 칸 규격(«500 g/pack», 주문 수량 = pack 수)을 갖게 된 뒤 이 분기만 안 따라왔다. 고치는 식은 **주문 수량 × (상품 1 주문단위에 든 재고아이템 취급단위 양)** — 구매자 입고가 이미 쓰는 바로 그 규칙(`deriveLinkConversion`)이다. 새 규칙 0.

## 2. 코드·DB 실측으로 보탠 사실 (팀원 실측 ①~④ 에 추가)

- **F1. 1:1 규칙은 규격보다 먼저 쓰였다.** 다이렉트 도입 커밋 `6c87b1095`(2026-09-04)은 «프로덕트 = 재고아이템 그대로 · 환산 없음». 그때 `register-as-product` 가 만드는 상품은 `unit = stockItem.unit · base_quantity = 1`(지금도 `services/sellStockItemDirect.js:118~121` 그대로) — 즉 **판매 1단위 = 취급단위 1** 이라 1:1 이 참이었다. 판매 상품 다섯 칸(`unit`=내용물·`base_quantity`·`package_unit`, 주문 수량 = 포장 수)은 커밋 `2659ff1c2`(2026-09-11, §2-2 «판매 상품·발주 줄도 다섯 칸을 따른다»)에서 생겼고, 출고·반품의 다이렉트 분기는 그 뒤 한 번도 안 바뀌었다.
- **F2. 같은 상품을 읽는 다른 네 곳은 전부 «1 pack = base_quantity × unit» 으로 읽는다.** 차감식 하나만 다르다.
  | 읽는 곳 | 13939(g/500/pack) → 6393(g) 를 어떻게 보나 |
  |---|---|
  | 마진 `productMargin.ts` ② «프로덕트 원가 = 1단위 원가 × 프로덕트 기준양 환산» | 1 pack 원가 = 6.5/500 × 500 = **RM 6.50** (500 g 어치) |
  | 구매자 연결 환산 `sellerLinkConversion.deriveLinkConversion`(pack + 같은 단위 → `sellerBase`) | 매장이 3 pack 받으면 매장 재료 **+1500 g** |
  | 장부 금액 `stockLedger.record` `costValue = change/base × unit_cost` | −3 g 는 **−RM 0.04** — 3 pack(RM 19.50 어치)이 나갔는데 장부엔 4 센 |
  | 재고아이템 생성 `brand-products.js /stock-item`·`catalogLink.stockFieldsFromSellerProduct` | 상품 규격 그대로 g/500 (§2-2 항등식 «500 g = 1 pack = unit_cost») |
  | **출고 `seller-orders.js:798~815` · 반품 `po-returns.js:344~355`** | **−3 g / +3 g** ← 여기만 |
  판매자 창고 −3 g, 구매자 창고 +1500 g — 같은 발주 한 장의 양쪽이 1497 g 어긋난다. 이것이 «어느 쪽이 정석인가» 의 답이다: 다수가 아니라 **문서(§2-2)와 구매자 입고가 같은 식**이고, 차감식만 혼자 다르다.
- **F3. 라벨 «개시 재고 (g)» 는 §2-2 그대로다** («재고는 어디서나 취급단위로 센다 · 브랜드 창고도 g»). 레시피 줄·원가·입고·장부 전부 g 기준이라 재고아이템을 pack 으로 세게 바꾸는 길은 네 곳을 같이 뒤집는 일 — 기각(§5 ①).
- **F4. 생성 규칙(상품 규격을 재고아이템에 복사)도 정석이다.** 사는 것도 파는 것도 같은 물건이면 다섯 칸이 같다(§2-2 «세 표가 똑같이 갖는다»). 단, 설계 D1 B 상태의 «base_quantity>1 이면 괄호 «= N {포장단위}»» 환산 힌트가 **구현에서 빠졌다**(`BrandProductsTab.tsx renderStockItemFields` 에 환산 계산 없음 · gate 가 못 봤다). 9 를 «9 pack» 으로 알고 적는 실수를 막는 장치가 그것이다 → §4 ⑤.
- **F5. 지금 영구 검사는 base 1 만 본다.** `health-check.js:7200~` «P3 ship»: 재고아이템 unit pack → `register-as-product`(unit pack · base 1) → 3 출고 → −3. 환산값 1 인 경우라 **고친 식으로도 −3 이 그대로 나온다**(회귀 0 증명 자리). base≠1 검사는 없다 → §6.
- **F6. 환산 규칙은 이미 한 곳에 있다.** `utils/unitConversionRule.classifyConversion`(«판매자 1 주문단위를 받으면 내 재고가 몇 단위 느는가» — 같은 단위면 `seller_base`, kg↔g·L↔ml 는 `× factor`, 질량↔개수 같은 비호환은 H «사람 몫, 추측값 금지») 과 그것을 부르는 `sellerLinkConversion.deriveLinkConversion`. 판매자의 다이렉트 재고아이템은 «판매자 자신의 재고행» 이므로 **같은 함수에 (stock = 재고아이템, sellerProduct = 상품) 을 넣으면 답이 나온다.** 셋째 사본을 만들 이유가 없다(2026-10-05 설계 4-B «환산 규칙은 둘뿐, 셋째 사본 금지»).
- **F7. dev 수치(2026-10-22 SELECT).** 활성 브랜드 상품 51 · 다이렉트 8(재고아이템 살아 있는 것 6) · base≠1 은 시험 13931·13939 뿐 · 재고아이템 35 중 base≠1 **7**(앞으로 다이렉트로 붙을 수 있는 후보). `inventory_transactions` 에 `Sold on PO` 로 남은 재고아이템 차감 줄 **0**(시험 줄은 팀원이 지움 — 6393 장부는 initial 9 한 줄) → **dev 에 보정할 과거 줄 없음.** 매장 메뉴 다이렉트(`products.ingredient_id`) 2건 모두 재료 kg/1. **운영 미측정**(읽기 허락 없음).
- **F8. 매장 메뉴 쪽은 같은 식이 아니다 — 규격 칸이 없다.** `products` 표에 `unit`·`base_quantity`·`package_unit` 이 없다(`SHOW COLUMNS`). `inventoryDeductionService.js:218~233` 다이렉트는 «메뉴 1개 = 재료 취급단위 1» 로 깎는데, 메뉴에 «500 g 팩» 같은 규격을 적을 자리가 없어 환산할 값 자체가 없다. 이번 범위 밖(§4 ⑥) — 기록만.

## 3. Irene 원문 → 답

> «전체 연동 제대로 확인하고 진행»

- ①②④ 는 맞다(팀원 실측 그대로). ③ 출고 차감은 **어긋났고 원인은 차감식**이다. 상품 창에 적는 «개시 재고 (g)» 와 재고아이템 생성 규칙은 바꾸지 않는다. 고치면 «3 pack 출고 = −1500 g» 이 되어 마진·장부 금액·구매자 입고와 한 식이 된다.

## 4. 설계 — 결정 D1~D6

### D1. 차감량 = 주문 수량 × 환산값, 환산값은 `deriveLinkConversion` 하나

`services/sellerLinkConversion.js` 안에서 `deriveLinkConversion` 의 본체를 **«값 + 호환 여부»** 를 돌려주는 내부 함수로 쪼개고(이름 재량 — 예 `directDeductConversion({ stock, sellerProduct })` → `{ conv, compatible }`), `deriveLinkConversion` 은 그 함수를 불러 `conv` 만 돌려준다(**기존 서명·반환 무변경**). 규칙:

| 상품(판매자) ↔ 재고아이템 | conv | compatible |
|---|---|---|
| pack · 같은 단위(문자열 같거나 개수 동의어 `sameUnit`) | `base_quantity` (13939: 500) | true |
| pack · kg↔g · L↔ml | `base_quantity × factor` (kg/1 ↔ g: 1000) | true |
| measure(무게 주문) · 같은 차원 | factor 만 (kg 주문 ↔ g 재고: 1000) | true |
| 비호환(개수↔질량·질량↔부피·포장 낱말이 다른 개수) = `classifyConversion` H | **1** | **false** |

- 출고 `seller-orders.js` 다이렉트 분기: `delta = -(Math.round(soldQtyD × conv × 100) / 100)` — 입고 `purchaseOrderReceive.js:84` 와 같은 반올림(재고 칸 DECIMAL(10,2)). `compatible === false` 면 notes 끝에 ` [unit_mismatch ${bp.unit}↔${pIngD.unit}]` — 자체 재고 분기의 `[stock_shortfall N]` 과 같은 자리·같은 방식. **출고를 막지 않는다**(§5 ②).
- 반품 `po-returns.js` 다이렉트 분기: 같은 함수, `delta × conv` — «출고의 정확한 역방향» 주석 그대로 참이 된다.
- 주석 «1:1, 환산 없음» 두 곳을 «주문 수량 × 상품 규격(§2-1 2026-10-22)» 으로 고친다.

### D2. 연결할 때 비호환이면 400 — 새 연결만

`brand-products.js` 의 링크 패치 함수(`:51~72`, POST·PUT 공용)와 `/stock-item` 의 `existing_stock_item_id` 가지에서 **다이렉트 연결이 새로 생기거나 바뀔 때만**(`nextDirect !== current.product_ingredient_id`) D1 함수를 불러 `compatible === false` 면 400 `{ code:'UNIT_INCOMPATIBLE', message:'This product sells in {unit} but the stock item counts in {unit} — use the same unit family (g/kg, ml/L, or pieces)' }`. 이름 수정 같은 PUT 은 안 걸린다(옛 행을 못 고치게 되는 것을 막는다). `register-as-product`·from-catalog «Add as product» 는 재고아이템 단위를 그대로 복사하므로 언제나 호환 — 무접촉.

### D3. 과거 줄 보정 없음 · 운영 건수는 읽기 보고

기계가 숫자를 지어내지 않는다(D5 10-21 과 같은 결). 읽기 전용 `scripts/report-direct-deduct-unit.js`(새 스크립트 1개 · 쓰기 0): ① 다이렉트 브랜드 상품 중 `conv ≠ 1` 또는 `compatible=false` 인 행(상품·재고아이템·단위·base) ② 그 재고아이템에 남은 `Sold on PO`/`Return #` 장부 줄 수와 수량 합. `운영검증` 때 돌려 숫자만 보고 — 0 이면 끝, 있으면 Irene 가 재고 조정(장부 adjustment)으로 맞춘다. dev 는 F7 대로 0.

### D4. 인스펙션 — 비차단 목록 1건

`ingredient-unification` 에 **013**(번호 재량) «다이렉트 상품 ↔ 재고아이템 단위 비호환 행» — 010 과 같은 비차단 목록. D2 가 새 행을 막고, 013 이 옛 행을 드러낸다.

### D5. 구조 문서 §2-1 문장 교체 (같은 커밋)

`docs/TRADE_STRUCTURE.md` §2-1 첫 항목의 «1개 팔면 그 재고아이템 1개가 빠진다. … **수량·단위 환산 없음** — "그대로"다.» 를 아래로 바꾼다:

> 1 **주문단위**(포장 1개 = `base_quantity × unit`) 팔면 그 양만큼 재고아이템에서 빠진다. 재고아이템은 취급단위로 세므로(§2-2) **차감 = 주문 수량 × 상품 1 주문단위에 든 취급단위 양** — 구매자 입고 환산과 같은 규칙(`sellerLinkConversion.deriveLinkConversion`). 상품 규격이 재고아이템 취급단위와 같고 base 1 이면 그 값이 1 이라 «그대로» 다(2026-09-04 에는 모든 다이렉트가 이 꼴이었고, 09-11 다섯 칸 뒤 2026-10-22 Fable 판정으로 식을 맞췄다). 비호환 단위는 1 로 빼고 장부에 `[unit_mismatch]` 를 남기며 연결 시점에 400.

매장 메뉴 줄(«매장 메뉴도 같은 규칙»)에 괄호 한 줄: «(매장 메뉴는 규격 칸이 없어 1 메뉴 = 취급단위 1 — F8, 별건)».

### D6. 앞 일(10-21 설계 D1) 보완 — «= N {포장단위}» 환산 힌트

`renderStockItemFields` 의 재고 칸 힌트에, `base_quantity > 1` 이고 입력값 > 0 이면 ` = {입력값 ÷ base} {package_unit ?? 'pack'}` 를 붙인다(B·C 공통 · 소수 2자리 · 계산만, 저장 0). 설계에 있었고 구현에서 빠진 것 — 새 결정 아님. i18n 키 1개 × 4언어.

## 5. 기각한 길 (다시 열지 않는다)

1. **재고아이템을 포장 수(pack)로 세게 라벨·생성 규칙을 바꾸기** — §2-2 위반. 레시피 줄·원가식·입고·거울 다섯 칸 복사가 전부 취급단위라 네 곳을 같이 뒤집어야 하고, 09-05 운영 실측(254/310 행이 취급단위 칸에 포장 이름)의 반대편 사고를 새로 만든다.
2. **비호환 단위면 출고 400** — 매장 출고가 데이터 위생 때문에 멈춘다(발주 흐름의 생명선). 입고 쪽 선례도 막지 않고 환산 1 + 확인 요청으로 간다. 대신 D2(연결 때 400)·D4(목록)·장부 표시로 드러낸다.
3. **출고 분기 안에 base × FACTOR 를 직접 쓰기** — 환산 규칙 셋째 사본(10-05 설계 4-B 금지).
4. **과거 장부 자동 백필** — 운영 수치 미측정 + 단위 비호환 행은 기계가 값을 못 정한다.
5. **상품 규격을 재고아이템과 강제로 같게 묶기(저장 시 복사)** — 같은 물건이라도 «사는 규격(10 kg/BOX)» 과 «파는 규격(1 kg/pack)» 이 다를 수 있다(2026-09-20 김치 사례 — 마진 계산기가 그 전제로 산다). 환산으로 푸는 게 맞다.

## 6. 절단면 (팀원 실행 · 순서 고정 · 프론트 빌드 1회 · 운영 쓰기 0)

1. **서버** `services/sellerLinkConversion.js` — 내부 함수 쪼개기 + `{conv, compatible}` 함수 export(D1). `deriveLinkConversion` 반환 무변경.
2. **서버** `routes/seller-orders.js` 다이렉트 분기 · `routes/po-returns.js` 다이렉트 분기 — 수량 × conv · 비호환 표시(D1). 🔒 인쇄 보호파일 아님 확인(`check-print-guard`).
3. **서버** `routes/brand-products.js` — 링크 패치 함수·`/stock-item` 기존 연결 가지에 D2 400. 같은 파일의 앞 일 미커밋 diff 위에 얹는다(이 방 것).
4. **서버** 인스펙션 013(D4) · `scripts/report-direct-deduct-unit.js`(D3, 읽기만).
5. **문서** `docs/TRADE_STRUCTURE.md` §2-1(D5).
6. **화면** `BrandProductsTab.tsx` 환산 힌트(D6) + i18n 4언어.
7. **health-check** 끝에 덧붙이기(§7) — 기존 «P3 ship» 검사는 **고치지 않는다**(base 1 회귀 증명).
8. `npm run build:dev` 1회 → `verify-all --full` 1회 → `check-sensitive-diff`(② 돈·주문 무결성 = gate 대상) → **Fable gate 1회**.

## 7. 증명 기준 (gate 에서 볼 것 — 전부 숫자 · 못 한 것은 «확인 불가»)

- **P1 환산 출고**: 재고아이템 g/500 · 재고 2000 g · 원가 6.5 → 상품 g/500/pack → 매장 3 pack 발주 → `/ship` → 재고 **500 g** · 장부 `order_deduct` 1줄 `quantity_change −1500 · unit g · cost_value −19.50`(= 3 × 6.5) · 상품 자체 재고 0 그대로.
- **P2 환산 반품**: P1 뒤 1 pack 반품 승인 → **+500 g** · `return_in` 1줄.
- **P3 단위 환산**: 상품 kg/1/pack ↔ 재고아이템 g/1000 → 2 pack 출고 → **−2000 g**.
- **P4 비호환**: 상품 piece/1 ↔ 재고아이템 g → 출고 200 · **−2** · notes 에 `[unit_mismatch piece↔g]` / 같은 조합으로 PUT 연결 → **400 UNIT_INCOMPATIBLE** / 이름만 고치는 PUT → 200.
- **P5 회귀**: 기존 «P3 ship»(pack/1 → −3) 그대로 통과 · 레시피 분기·자체 재고 분기·supplier·foodcourt 분기 무접촉(diff 로) · 인스펙션 008/009 0건 · 013 dev 0건.
- **P6 화면**: B 상태 base 500 에 900 입력 → 힌트 «= 1.8 pack».
- **고장주입 2건(의무)**: ① 출고 분기 conv 를 1 로 고정 → P1·P3 실패 ② D2 검사 제거 → P4 의 400 이 200 → 실패. pm2 재시작 뒤 HTTP 주입, 원복은 사본 cp.
- **기계**: `verify-all --full` · `check-print-guard` 변경 0 · `check-design-guard` · `i18n:verify` · `health-check` 전체.
- **수량 보고**: dev `report-direct-deduct-unit.js` → 상품 2(13931·13939, conv 500) · 과거 줄 0.

## 8. Irene 컨펌 요청 (각각 Fable 권고)

① **차감 규칙** — 다이렉트 상품 출고·반품을 «주문 수량 × 상품 규격» 으로 재고아이템 취급단위에서 뺀다(3 pack × 500 g = 1500 g). **권고: 그대로.** 마진·장부 금액·구매자 입고와 한 식이 된다. 라벨 «개시 재고 (g)» 와 재고아이템 생성 규칙은 안 바꾼다.
② **단위가 안 맞는 상품(개수↔g 등)** — 출고를 막지 않고 1:1 로 빼며 장부에 표시 + 점검 목록. **권고: 그대로.** 출고가 데이터 정리 때문에 서면 안 된다.
③ **연결할 때 단위 비호환이면 400** (새로 연결·바꿀 때만, 옛 행 수정은 통과). **권고: 추가.**
④ **과거 장부 보정 없음** — 운영 건수는 다음 `운영검증` 때 읽기 스크립트로 숫자만 보고, 있으면 Irene 가 재고 조정으로. **권고: 그대로.** dev 는 0.
⑤ **매장 메뉴 다이렉트(메뉴 = 재료 그대로)** — 메뉴에 규격 칸이 없어 «메뉴 1개 = 재료 취급단위 1» 그대로 두고 기록만(dev 2건 모두 kg/1). **권고: 그대로 — 별건.** 메뉴 규격이 필요해지면 구조 문서부터.

**⑤까지 «권고대로» 면 팀원이 §6 순서로 구현한다. 운영 반영: 다음 배포 때(§7 통과 + Fable gate 1회 뒤).**

## 9. 자기 점검

- 새 테이블·컬럼·라우트·마이그 0. 새 환산 규칙 0(기존 함수 재사용). 새 스크립트 1(읽기 보고). 되돌리기: 코드 되돌리기만 — 데이터는 장부 줄로 남는다.
- 범위 밖(기록만): F8 매장 메뉴 규격 칸 없음 · 운영 §5-7·D3 수치 미측정 · 공급업체·푸드코트 자체 재고는 주문 단위로 세므로(§5-12 A) 이 문제 없음.
