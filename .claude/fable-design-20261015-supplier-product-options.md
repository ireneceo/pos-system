# [Fable 설계] 공급업체 상품 옵션 — «옵션마다 가격이 다르다 · 1팩/20팩» 기본세팅 검토 (2026-10-15)

> Fable 판정 원문. 팀원(Opus)은 사실만 전달했고(개발서버 실측 8항목), 이 문서의 판단·권고는 Fable 것이다.
> 호출 조건: `design`(여러 화면이 같은 규칙을 나눔 — 판매자 옵션 화면·발주 담기·발주 저장·판매자 수신함·청구서 — 그리고 돈 경로). 끝난 뒤 `gate` 1회(발주 줄 단가 계산 변경 + 운영 DB 컬럼 추가). 한 사안 2회로 끝낸다.
> 단일 기준: `docs/TRADE_STRUCTURE.md` §2-2 «단위 다섯 칸» · `docs/PURCHASE_ORDER_SYSTEM.md` «단위 주문(UoM) 설계 (2026-08-30)» ③ **«옵션으로 규격/가격 넣기 — 비권고(채택 금지)»**. 이 설계는 그 두 기준을 **바꾸지 않는다** — 2026-08-30 판정 ①(«팩 규격이 여러 개면 판매상품을 따로 등록») 이 Irene 컨펌 대기로 남아 있던 것을, 오늘 Irene 질문이 정확히 그 자리라 다시 올리는 것이다.

## 0. 한 줄 결론

**«1팩은 비싸고 20팩은 싸다»는 옵션이 아니라 규격(변형)이다 → 판매 상품 행을 따로 둔다(새 표·새 칸 0).** 옵션은 **양을 바꾸지 않는 속성**(손질·등급·숙성·브랜드)에만 쓴다. 그리고 지금 옵션 기능은 **반만 만들어져 있다** — 옵션을 골라 화면에 보인 가격이 발주에 저장되지 않고(기본가로 저장), 판매자 수신함은 고른 옵션을 보지도 못한다. 옵션에 가격을 붙여 쓰려면 이 두 결함부터 닫아야 한다.

## 1. 실측으로 보탠 사실 (팀원 전달 8항목 위에 Fable 이 코드·DB 로 확인한 것)

- **S1. 같은 판정이 이미 있다.** `docs/PURCHASE_ORDER_SYSTEM.md` 1317·1404 — 2026-08-30 Fable: «③ 옵션(`price_adjustment`)은 `unit_conversion` 을 못 문다. 1kg/5kg 옵션으로 규격을 흉내내면 같은 장바구니 줄의 환산비 하나로 다른 규격이 입고돼 재고 수치가 깨진다. → 팩 규격이 여러 개면 판매상품을 여러 개 등록». 그날 ①은 «Irene 컨펌 대기»로 남았고, ②(무게 주문)·④(RA 먼저)는 진행됐다.
- **S2. 옵션 가격은 어디에도 저장되지 않는다.** `purchase-orders-crud.js` `createPurchaseOrderCore` 세 경로(재료·브랜드 재고아이템·프로덕트) 모두 `unit_price = 연결(ingredient_seller_products).unit_price`. 화면(`NewPurchaseOrderPage.tsx` 2037~2080)은 `option_ids` 도 조정 단가도 보내지 않고 **발주 머리 `notes` 에 «[Options]\n재료명: 그룹=옵션» 글자만** 넣는다. `purchase_order_items` 에 옵션 칸 없음(SHOW COLUMNS 실측).
- **S3. 그 글자는 판매자 수신함에 안 보인다.** 머리 `notes` 를 그리는 곳 = 구매자 상세(`PurchaseOrderDetailPage` 1579)·인쇄(`PurchaseOrderPrintPage` 377)·PDF(`purchase-orders-workflow.js` 352). **판매자 수신함 `IncomingOrdersView.tsx` 는 머리 notes 를 그리지 않는다.** 즉 판매자는 «Sliced» 를 고른 줄을 «Whole» 과 구분 못 한다.
- **S4. 청구서는 발주 줄 단가를 그대로 쓴다.** `services/purchaseOrderService.js` 283 `InvoiceItem.unit_price = item.unit_price`, 설명 = `seller_product_name || description`. → **발주 줄 `unit_price`·`description` 만 맞으면 청구서·SOA·판매자 수신함·PDF·메일 8표면이 추가 변경 없이 따라온다.**
- **S5. 가격 다시 불러오기·수정은 옵션을 모른다.** `refresh-prices`(workflow 474~523) 는 초안 줄 단가를 판매자 현재가로 **덮어쓴다**. `utils/poAmend.js` 163 «단가는 판매자 카탈로그의 현재 값을 서버가 채운다». 옵션 조정액을 줄에 숫자로만 넣으면 이 두 길이 조용히 지운다 → **조정액은 줄에 «무엇을 골랐나» 스냅샷으로 남아야** 두 길이 다시 더할 수 있다.
- **S6. 서버가 화면의 `unit_price` 를 믿는 자리가 있다.** `createPurchaseOrderCore` 931·972·1032 `raw.unit_price != null ? raw : 연결가`, `PUT /purchase-orders/:id` 1428. **보내는 화면은 0**(grep: 재고 일괄발주·제안·수정 전부 안 보냄) — 잠자는 구멍. 이번 범위 밖, 별건(§6).
- **S7. 한 재료에 같은 판매자 상품 여러 개 연결은 이미 된다.** `ingredient_seller_products` 유니크 없음(SHOW INDEX), dev 에 재료 111→상품 31·32, 112→34·35·40 (같은 공급업체 14). 발주 줄은 상품이 아니라 **연결 id** 를 문다 → 규격별 상품 행 = 연결 행 하나씩 = 환산·단가 각자. **구조 변경 0 으로 «1 kg 봉지 / 10 kg 포대» 가 된다.**
- **S8. 다만 장바구니 판매자 고르기가 구분을 못 보여 준다.** `NewPurchaseOrderPage.tsx` 2823 드롭다운 라벨 = `{판매자명} {가격}` 뿐 → 같은 판매자 상품 둘이면 «S4 Sup Co. 8.50 / S4 Sup Co. 26.50» 으로만 보인다. 카드의 «N vendors» 도 연결 수를 센다(2393).
- **S9. 데모 옵션 5그룹 중 2그룹이 «틀린 예시»다.** 공급업체 14: «Pack Size: Small(1 kg) 0 / Medium(5 kg) +8 / Large(10 kg) +18»(상품 31·32, unit kg · base 1 · package_unit NULL) · «Container Size: 250 ml 0 / 500 ml +12 / 1 L +20»(상품 36, unit L · base 1 — 1 L 상품에 250 ml 가 +0 이라 뜻도 안 맞음). 양을 바꾸는 옵션인데 환산은 상품 하나 값 — 10 kg 를 골라도 입고는 1 kg. 나머지 «Aging Level·Cut Style·Trim Style» 은 양을 안 바꾸는 올바른 옵션. 옵션 들어간 발주 = PO 82 한 건(Cut Style=Whole +0, 금액 차 0).
- **S10. 옵션 화면 안내문이 틀린 예시를 권한다.** `SupplierProductOptionsTab.tsx` 461 빈 상태 «size, packaging, grade» · 그룹 이름 placeholder «Size, Grade, Packaging»(하드코딩 영문, i18n 아님). «size·packaging» 이 바로 S9 를 만든 안내다.
- **S11. 옵션은 다른 기능도 막고 있다.** 브랜드가 공급업체를 매장에 복사할 때 옵션 그룹이 있으면 `OPTIONS_NOT_COPIED` 로 거부(`supplier-directory.js` 1508). 규격을 상품 행으로 풀면 복사 가능한 업체가 늘어난다.
- **S12. 운영 실사용은 모른다.** 운영 DB 는 읽지 않았다(기계적 제약). 옵션 기능은 2026-04-26 부터 있었고, 운영 공급업체가 가격 붙은 옵션을 썼다면 그 발주는 **기본가로 저장·청구**됐다(S2·S4). 측정 전에는 «없다»고 말하지 않는다.

## 2. 갈래 — 결정

**D1. «1팩 / 20팩 / 1 kg / 10 kg» = 규격 → 판매 상품 행을 따로 등록한다. 옵션 금지.** (2026-08-30 ③ 재확인)
- 이유 셋: ① 다섯 칸 모델(§2-2)에서 규격은 `unit · base_quantity · package_unit · 가격` 네 칸의 조합이고 옵션은 그중 가격 한 칸만 건드린다 — 입고 환산(`unit_conversion`)·단위당 원가·인보이스 대조 이름(`invoice_name`)·SKU 가 전부 규격마다 달라야 한다. ② 발주 줄이 **연결 id** 를 무는 현 구조와 정확히 맞물린다(S7) — 새 칸·새 표·새 경로 0. ③ 업계 관행도 이렇다 — 공급업체 가격표는 «1 kg 봉지 RM 8.50 / 10 kg 포대 RM 60» 처럼 **포장마다 절대가**로 적지, «기본가 + 18» 로 적지 않는다.
- 상품 이름은 다섯 칸을 보여 주는 `sellerSpecText`(«10 kg/BOX») 로 구분된다 — 이름에 «10kg» 을 박을 필요 없음(2026-08-30 ① «이름 오염 종료» 그대로). SKU 는 같은 날 다른 방(ebe3a0ff) 이 정비한 규칙(`SP-{업체}-NNNN` 자동·업체 안 중복 409)을 그대로 쓴다.
- 20팩 **카톤**은 «unit = 내용물 단위 · base_quantity = 20팩분 내용물 · package_unit = carton · 가격 = 카톤 값» 한 행이다. 기준양(package_quantity)은 판매 상품에서 항상 1 — §2-2 «기준양은 판매 상품에서 항상 1 이라 칸이 없다» 그대로.

**D2. 옵션의 정의를 못 박는다 = «양을 바꾸지 않는 선택».** 손질(Whole/Sliced/Cubed)·등급·숙성(Mild/Sharp)·손질(Skinless/Boneless)·브랜드 지정. 가격은 지금처럼 **덧셈 조정**(`price_adjustment`, 음수 불가 — 현 서버 검증 유지). 양을 바꾸는 선택(크기·용량·묶음 수)은 옵션 화면이 **글로 막는다**(D5) — 기계로는 «크기» 의 뜻을 못 가르므로 안내문이 유일한 장치다. 구조 문서 `TRADE_STRUCTURE.md` §2-2 끝에 한 줄 추가: 「옵션은 양을 바꾸지 않는다. 규격이 다르면 판매 상품 행이다.」

**D3. 옵션 가격이 발주에 실리게 한다(«Phase D» 완성) — 줄 스냅샷 + 서버 계산. 화면은 고른 옵션 번호만 보낸다.**
- `purchase_order_items.options` **JSON NULL** 한 칸 추가 — 스냅샷 `[{group_id, group_name, option_id, option_name, price_adjustment}]`. 2026-09-11 `base_quantity·base_unit` 스냅샷과 같은 성격(«주문 시점에 판매자가 뭘 팔았나»). 새 목록이 아니라 기존 줄의 스냅샷이다(TRADE_STRUCTURE «새 목록·경로 금지» 와 충돌 없음). 마이그 `scripts/migrate-po-item-options.js`(멱등 · information_schema 확인 후 ADD COLUMN · 레지스트리 `deploy` · 선례 `migrate-po-item-shipped-at.js`). 모델 `PurchaseOrderItem.options: DataTypes.JSON`.
- 규칙 한 곳 **`dev-backend/utils/poLineOptions.js`**:
  - `resolveLineOptions({ mapping, optionIds, transaction })` → 연결이 `supplier` 가 아닌데 optionIds 가 있으면 400 `OPTIONS_NOT_SUPPORTED`(BG·FG·외부 공급업체는 옵션 없음 — 팀원 사실 2 그대로). `supplier_product_option_group_products` 로 그 판매 상품에 붙은 그룹과 **활성 옵션**을 읽고 검증: 모든 optionId 가 그 그룹들 안에 있나(`OPTION_INVALID`) · 그룹마다 개수 ≤ max(`OPTION_TOO_MANY`) · `is_required` 그룹은 ≥ max(1, min)(`OPTION_REQUIRED`). 반환 `{ options: 스냅샷, adjustment: 합 }`. **조정액은 DB 값이다 — 화면이 보낸 price_adjustment·adjusted_unit_price 는 읽지 않는다.**
  - `optionsAdjustment(optionsJson)` = 스냅샷 합. `descriptionWithOptions(name, options)` = `Beef Rib (Cut Style: Sliced, Trim Style: Boneless)` 255자 절단.
- `createPurchaseOrderCore` 세 경로 + 재료 경로(네 재고 대상 전부 공급업체 상품에 연결될 수 있다): `raw.option_ids`(정수 배열) 를 받아 연결이 있고 `seller_type==='supplier'` 면 위 함수로 → `unit_price = 연결 unit_price + adjustment` · `line_total` 재계산 · `description` 에 옵션 표기 · `options` 저장. **옵션이 있는 줄은 `raw.unit_price` 를 보지 않는다**(S6 구멍이 옵션 줄로 번지지 않게). 옵션 없는 줄은 현행 그대로(S6 는 별건).
- 발주 머리 `notes` 의 «[Options]» 직렬화는 **없앤다**(줄에 실리므로 중복). 사용자 메모 칸은 그대로.
- 8표면(판매자 수신함·구매자 상세·Staging·인쇄·PDF·WhatsApp/메일·공급업체 알림메일·인보이스 대조) 은 **무접촉** — `description` 과 `unit_price` 를 이미 그린다(S4). 청구서·SOA 도 같은 이유로 무접촉.

**D4. 가격 다시 불러오기·수정 경로는 조정액을 다시 더한다.**
- `refresh-prices`: `live + optionsAdjustment(it.options)` — 판매자 현재 기본가에 **스냅샷 조정액**을 더한다(옵션 가격이 그새 바뀌었어도 스냅샷 값 — 줄의 «그때 고른 값» 이고, 보낸 뒤 차이는 인보이스 대조 몫이라는 그 라우트의 원칙과 같다).
- `utils/poAmend.js`: 유지되는 줄의 단가 = 연결 현재가 + 그 줄 스냅샷 조정액. 수정 화면은 옵션을 고르지 못하므로 **새로 넣는 줄에는 옵션 없음**(범위 밖). ⚠ `poAmend.js` 는 다른 방(ebe3a0ff)이 미커밋 수정 중 — §4 순서 제약.

**D5. 옵션 관리 화면 안내문 교체 + i18n.** `SupplierProductOptionsTab.tsx` 빈 상태·그룹 이름 placeholder·모달 첫 줄 힌트를 「옵션은 양을 바꾸지 않는 선택(손질·등급·숙성·브랜드)입니다. 포장·용량이 다르면(1 kg / 5 kg, 1팩 / 20팩 카톤) 옵션이 아니라 상품을 따로 등록하세요 — 규격·가격이 각자 들어갑니다」 로. 건드리는 블록의 하드코딩 영문은 `t('products.optionHint…')` 로 바꾸고 4언어(`supplier.json` en·ko·zh·ms) 추가. 판매자 상품 폼(`SupplierProductsTab`)은 무접촉.

**D6. 장바구니 판매자 고르기에 규격을 붙인다.** `NewPurchaseOrderPage.tsx` 2823 드롭다운 라벨: 같은 판매자(seller_type+entity)가 둘 이상이면 `{판매자명} · {specTextOf(s) || seller_product_name} · {가격}`, 하나면 지금처럼. 카드 «N vendors» 는 **판매자 수(중복 제거)** 로(2393). 인쇄·KDS 보호파일 무접촉.

**D7. 데모 데이터(개발)의 틀린 예시를 바로잡는다.** 공급업체 14 — «Pack Size»(1)·«Container Size»(4) 그룹과 연결 행 삭제, 대신 상품 행 추가: Fresh Tomato 5 kg (16.50)·10 kg (26.50) / Yellow Onion 5 kg (13.20)·10 kg (23.20) — 기존 1 kg 행은 그대로(가격 = 옛 기본가 + 조정액, unit kg · base 5/10 · package_unit `bag`) / Olive Oil 은 250 ml (28.00)·500 ml (40.00)·1 L (48.00) 세 행(unit ml · base 250/500/1000 · package_unit `bottle`; 기존 36 행은 1 L 행으로 고친다). SKU 는 자동 채번. «Aging·Cut·Trim» 과 PO 82 는 그대로. 일회성 스크립트(dev 전용 가드, 레지스트리 `manual`). **운영은 건드리지 않는다.**

**D8. 수량 구간 가격(«같은 상품을 20개 이상 사면 단가가 내려간다»)은 이번 범위 밖.** 그건 옵션도 규격도 아닌 **가격 규칙**(수량 → 단가)이고 지금 구조에 자리가 없다(`unit_price` 한 칸). 필요하면 `TRADE_STRUCTURE.md` 에 자리를 먼저 정하고 설계 1회. Irene 의 «20팩» 이 어느 쪽인지 §5 에서 묻는다. **Fable 권고: 카톤 상품(D1)으로 충분하다** — 공급업체는 실제로 «카톤 가격» 으로 판다.

**Fable 작은 결정:** 옵션 JSON 칸 이름 `options` / 설명 칸에 옵션 표기 괄호 형식 / 조정액은 스냅샷 기준 / 음수 조정 불허 유지 / 드롭다운 라벨은 같은 판매자 중복일 때만 길어짐 / 데모 변환 수치는 옛 기본가+조정액.

## 3. 절단면 — 순서 고정 (프론트 빌드 1회)

**⛔ 착수 조건: 작업방 ebe3a0ff 의 미커밋 변경이 커밋된 뒤.** 겹치는 파일 — `supplier.json`×4 · `utils/poAmend.js` · `routes/supplier-directory.js` · `routes/ingredients.js`(그 방이 수정 중). 한 솔루션에서 파일을 고치는 방은 하나.

1. 서버 — 마이그 `migrate-po-item-options.js` + 레지스트리 `deploy` + 모델 `options` → dev 실행 2회(멱등 증명).
2. 서버 — `utils/poLineOptions.js` + `createPurchaseOrderCore` 네 경로 + `refresh-prices` + `poAmend` → jest `tests/po-line-options.test.js`(검증 4갈래·조정 합) → health-check `po`(또는 `pos`) 카테고리 6건(§4 ①②③⑤⑥) → 고장주입 1회.
3. 프론트 — 제출 본문 `option_ids` · «[Options]» notes 제거 · 드롭다운 라벨·vendors 수 · 옵션 탭 안내문 + i18n 4언어.
4. 데모 변환 스크립트(dev 전용) 실행 → 카탈로그 재조회로 규격 3행 확인.
5. 읽기 전용 운영 보고서 `scripts/report-supplier-options-usage.js`(SELECT 만 — 업체별 그룹 수 · 조정액 ≠ 0 옵션 수 · notes LIKE '%[Options]%' 발주의 번호·상태·금액) — 운영 실행은 Irene 터미널(`[[reference_prod_readonly_script_pattern]]`), 결과는 보고만.
6. `TRADE_STRUCTURE.md` §2-2 한 줄 + `PURCHASE_ORDER_SYSTEM.md` 2026-08-30 ① «컨펌 대기» 를 Irene 답으로 닫기(배포 뒤 — 게이트 지문 규칙).
7. build:dev 1회 → verify-all --full 1회 → 클릭 흐름 1회 → check-sensitive-diff → **Fable gate 1회**.
- 🔒 인쇄 8파일 · KDS 무접촉. 운영 쓰기 0. 배포는 다음 정기 배포.

## 4. 증명 기준 (gate)

① **돈**: Beef Rib(연결가 95) + Cut Style=Sliced(+3) 로 bulk 제출 → 줄 `unit_price 98` · `line_total 98×qty` · `description "Beef Rib (Cut Style: Sliced)"` · `options` 스냅샷 1개 · 머리 notes 에 «[Options]» 없음 → 판매자 수신함 GET 같은 줄 98 → 판매자 확정 뒤 청구서 줄 98(§S4 경로).
② **검증**: 남의 그룹 옵션 id → 400 `OPTION_INVALID` / 필수 그룹 빠짐 → 400 `OPTION_REQUIRED` / max 초과 → 400 `OPTION_TOO_MANY` / 브랜드 판매자에 option_ids → 400 `OPTIONS_NOT_SUPPORTED`.
③ **다시 불러오기**: 판매 상품 95→100 뒤 refresh-prices → 줄 103(조정 유지). amend 로 수량만 바꿔도 103.
④ **화면 값 불신**: 본문에 `unit_price 1`·`adjusted_unit_price 1` 을 섞어 보내도 결과 98.
⑤ **마이그**: 두 번 실행 OK · 기존 줄 `options NULL` · PO 82 무변동.
⑥ **고장주입**: `+ adjustment` 를 빼면 ① 이 실패한다(1회 증명 후 원복, 빌드 전).
⑦ **브라우저**: `/pos/purchase-orders/new` 카탈로그 옵션 모달 → 장바구니 → 제출 → Staging 줄 98 표시 · mount 오류 0 · 같은 판매자 상품 둘(재료 111)의 드롭다운에 규격이 보임 · 공급업체 옵션 탭 안내문 4언어.
⑧ check-sensitive-diff · print-guard 0 · design-guard 0 · i18n:verify.

## 5. Irene 에게 (Fable 권고 붙임)

- **Q1. «20팩» 의 뜻** — (가) 20팩이 든 카톤을 **카톤 가격으로 파는 상품** → D1, 구조 변경 0, 지금 등록 가능 / (나) 같은 상품을 **20개 이상 담으면 단가가 내려가는 수량 할인** → D8, 지금 구조에 자리 없음, 별도 설계. **Fable 권고: (가).** 공급업체 가격표가 실제로 그렇게 생겼고, (나)는 구조 문서부터 고쳐야 한다.
- **Q2. 옵션 가격을 발주에 실리게 하는 구현(D3~D6)을 지금 할지** — 지금은 «화면에 보인 값 ≠ 저장된 값» 이라 가격 붙은 옵션은 **쓰면 안 되는 상태**다. **Fable 권고: 한다** — 옵션을 쓸 거면 필수이고, 쓰지 않을 거면 가격 칸 자체를 숨겨야 하는데 손질·등급 옵션의 가격 차는 실제 거래에 있다. 단 착수는 ebe3a0ff 방 커밋 뒤.
- 보고만(답 불필요): 운영 실사용 측정(§3-5) 은 읽기 전용 보고서로, Irene 터미널 1회. 결과에 «가격 붙은 옵션이 들어간 발주» 가 있으면 그 발주는 기본가로 청구된 것 — 소급 수정은 하지 않고 목록만 보고(인보이스 대조가 담당).

## 6. 범위 밖 (별건으로 적어 둔다)

- **서버가 화면의 `unit_price` 를 믿는 자리 4곳**(S6) — 보내는 화면 0 인 잠자는 구멍. 닫는 것은 돈·보안 경계 변경이라 별건 1회(작은 변경 + 고장주입). 이번에는 옵션 줄에서만 무시.
- 수량 구간 가격(D8) · 옵션이 양을 바꾸는 모델(채택 금지) · 수정(amend) 화면의 옵션 선택 · 판매자 자체재고의 옵션별 재고 · 소비자 커머스 옵션 재사용(`SUPPLIER_CONSUMER_COMMERCE_DESIGN.md`) · 운영 데이터 변환.
