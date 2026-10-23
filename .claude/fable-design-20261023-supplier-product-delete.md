# [Fable 설계] 공급업체 상품 삭제 — «연결된 것이 있으면 다른 상품으로 바꾸고 삭제» (2026-10-23)

> 호출 조건: `design`(여러 화면이 같은 삭제 규칙을 나눔 · 연결 줄(ingredient_seller_products)을 옮기는 되돌리기 어려운 동작 · 원가 전파에 닿음). 구현 뒤 `gate` 1회(②돈·주문 무결성 — 발주가 읽는 연결 줄 가격·환산을 서버가 고쳐 쓴다). 한 사안 2회로 끝낸다.
> Irene 원문: «https://purplehere.com/pos/suppliers?tab=products. 역할마다 공급업체 상품보는 곳 있으면 삭제도 되게 해. 지울 수가 없잖아. 지울 때 연결된 거 있으면 바꾸게 하고. 스톡아이템 처럼»
> 내가 직접 읽은 것: `routes/supplier-directory.js`(DELETE :1697 · `loadOwnedExternalSupplier` :1263 · `loadVisibleExternalSupplier` :1287 · `GET /external-suppliers/:id/products` :1612 · 카탈로그 GET :654~) · `routes/supplier-products.js` DELETE :861 · `routes/brand-products.js` DELETE :1337 · `routes/product-ingredients.js` `collectStockItemUses`·`deleteStockItem`·`replaceStockItem` :826~1067 · `services/mirrorMerge.js` 전문 · `utils/poSellerProductActive.js` 전문 · `services/costSync.js recomputeUnitCost`·`recomputeForSellerProduct` :112~245 · `services/sellerLinkConversion.js` :105~256 · `services/poScheduleService.js` :15~45·200~260 · `utils/supplierShare.js` :1~120 · `routes/ingredient-seller-products.js` PUT/DELETE :228~358 · `pages/Suppliers/AllSupplierProductsView.tsx` 행 버튼 :385~395 · `pages/SupplierDirectory/SupplierProfilePage.tsx` :560~572·851~856 · `pages/BrandProductRecipe/ProductIngredientsTab.tsx` 교체 창 :1647~1745 · 이전 판정 `fable-verdict-20261011-stock-item-replace-on-delete.md` · `…-20261016-stock-item-replace-2nd-gate.md` · `fable-design-20261015-supplier-catalog.md` · `docs/EXTERNAL_SUPPLIER_PRODUCTS.md` · `docs/TRADE_STRUCTURE.md` ⑥(가격은 등록 주체 소유 · §H-3 오너 업체 상속).
> 내가 직접 센 것(개발 DB): 아래 §1.

## 0. 한 줄 결론

**만든다 — 재고아이템 «다른 재료로 바꾸고 삭제» 와 같은 모양으로, 대상은 «내가 등록한 외부 공급업체의 상품».** 지금 삭제 버튼이 없는 «전체 상품» 탭(`/pos/suppliers?tab=products`)에 삭제를 붙이고, 업체 상세 화면의 기존 삭제와 **같은 흐름 하나**를 쓴다. 서버 DELETE 는 연결(재고아이템·재료가 이 상품을 공급처로 붙인 줄)이 있으면 지우지 않고 그 목록을 돌려주며, 새 길 `…/replace` 가 그 연결들을 **같은 업체의 다른 상품으로 옮기고**(연결 줄 id 는 그대로 → 발주 줄·정기 발주가 안 깨진다) 가격·환산을 새 상품 기준으로 맞춘 뒤 상품을 지운다. 미리보기 기본 · 하나라도 막히면 무변화 — 재고아이템 교체와 같은 규율. 새 표·새 목록·새 계산식 0(가격은 `costSync`, 환산은 `sellerLinkConversion`, 복사 칸은 `catalogLink.mappingAttrs` 그대로).

## 1. 실측으로 보탠 사실 (설계에 영향)

| # | 사실 | 뜻 |
|---|---|---|
| S1 | 외부 업체 상품 삭제 DELETE 는 `product.destroy()`(소프트) 한 줄 — 연결 검사 0. 화면(업체 상세)은 실패해도 조용히 무시(`catch noop` · `res.ok` 아니면 아무것도 안 함). | 지금도 «지워지긴» 하는데 연결은 지운 상품을 가리킨 채 남는다(= 재고아이템엔 «꺼진 공급처», 발주는 400 `SELLER_PRODUCT_INACTIVE`). 실패를 알려주지도 않는다. |
| S2 | 개발 DB: 살아있는 외부 업체 상품 12개, **전부 연결 1줄씩**(매장 재료 5 · BG 재고아이템 7). 업체 8곳 중 **3곳은 상품이 하나뿐**(대체 후보 없음). 이미 지운 상품을 가리키는 연결 1줄 + 그것을 쓰는 취소 발주 줄 1줄. | 「대체할 상품이 없는 업체」 가 흔하다 — 교체만 있으면 그 업체 상품은 여전히 못 지운다. §3 D4. |
| S3 | `purchase_order_items.ingredient_seller_product_id` FK = **SET NULL** · 정기 발주 `purchase_order_schedules.line_items` JSON 이 `ingredient_seller_product_id` 를 품고 실행 때 **판매자 현재가**로 발주를 만든다(`linesForCore` · 단가·환산 안 싣음). 실행이 `InactiveSellerProductError` 면 `recordFailure`(3회 연속이면 멈춤). | 연결 줄 **id 를 보존**하며 상품만 바꾸면 발주 이력·정기 발주가 저절로 새 상품을 따라간다. 연결 줄을 지우면 발주 줄은 NULL 로 끊기고 정기 발주는 실패 누적. → 이력이 있는 연결은 지우지 않는다. |
| S4 | `costSync.recomputeUnitCost` 는 가격을 **판매 상품 현재가**에서 읽고 연결 줄 `unit_price` 사본을 현재가로 맞춘다(발주가 사본을 읽기 때문). 환산 기본값은 `sellerLinkConversion.deriveLinkConversion`(사람 값 > 같은 단위 pack 은 기준양 > `classifyConversion` D 값 > 1), 확인 칸은 `buildConfirmationFields`(단위쌍 `conversion_confirmed_pair`). | 교체 뒤 가격·환산·원가는 **이 셋을 부르면 끝**이다. 새 식을 쓰지 않는다. |
| S5 | 외부 업체 상품을 가리키는 다른 표: `supplier_inventory_transactions`(판매자 자기 재고 — 외부 업체엔 뜻 없음, 사본은 0 에서 시작) · `supplier_shop_order_items`·`supplier_subscriptions`(가입 공급업체 상점 전용 · 개발 DB 0건) · `supplier_products.copied_from_supplier_product_id`(브랜드→매장 공유 **사본** · 이후 동기화 없음 · 개발 0건) · 옵션 그룹 junction(CASCADE · 소프트삭제엔 무관). | 외부 업체 상품에서 **막을 것은 `ingredient_seller_products` 하나**다. 나머지는 무접촉·비차단. |
| S6 | 삭제 권한: 등록 주체만(`loadOwnedExternalSupplier` — `registered_by_entity` = 내 buyerEntity). 오너 업체는 매장이 **보기만**(§H-3 «수정은 오너만») · 매장 재고아이템 연결은 매장이 붙인다. 소속 매장 없는 오너의 buyerEntity 는 `('owner', user.id)` 이고 그 범위엔 «전체 상품» 탭이 없다(업체 상세에서 관리). 가입 공급업체(SA) 는 자기 화면 `SupplierProductsTab` 에 삭제가 이미 있다(연결 검사 없음). | «역할마다 … 삭제도 되게» 의 실제 빈칸은 **구매자 역할의 전체 상품 탭**이다. 가입 공급업체 상품은 구매자가 지울 수 없는 게 맞다(남의 카탈로그). |
| S7 | «꺼진 공급처» 표시(`seller_product_active`)는 서버가 재고 목록 3곳에 싣지만 화면은 **발주 화면(NewPurchaseOrderPage)만** 읽는다. | 지운 상품을 가리키는 연결은 재고아이템 화면에선 티가 안 난다 — 삭제 때 치우는 게 맞다(D4). |
| S8 | 화면 쪽 공용 `fetchAPI` 는 실패 본문을 버린다(메모리 `reference_fetchapi_drops_error_body`). 재고아이템 교체 화면은 raw `fetch` 로 `error.uses` 를 읽는다. | 새 흐름도 raw `fetch`. |

## 2. Irene 원문 → 요구

| 원문 | 읽은 것 |
|---|---|
| «역할마다 공급업체 상품보는 곳 있으면 삭제도 되게 해. 지울 수가 없잖아» | 전체 상품 탭(RA·Staff·Owner 매장범위·BG·BM·FG·FM)에서 **내가 등록한 외부 업체 상품**은 그 자리에서 지울 수 있어야 한다. 지금은 업체 상세로 들어가야 하고, 거기서도 연결이 있으면 결과가 조용히 이상해진다(S1). |
| «지울 때 연결된 거 있으면 바꾸게 하고. 스톡아이템 처럼» | 연결(재고아이템·재료의 공급처 줄)이 있으면 막힘 창 대신 **바로 «다른 상품 고르기 → 미리보기 → 바꾸고 삭제»**(2026-10-16 2차 게이트에서 Irene 이 «이렇게 다 오픈해서 뭘 하라는 거야?» 로 정한 모양). |

## 3. 갈래 — 결정

**D1. 누가 무엇을 지우나 — 등록 주체만, 지금 Edit 과 같은 문.**
- 전체 상품 탭의 **`isMine` 행**(내가 등록한 외부 업체 상품)에만 «Delete». 가입 공급업체 상품·오너에게서 받은 업체 상품·브랜드/푸드코트 판매상품 행은 지금처럼 «Open supplier» 만.
- 서버 게이트 = `loadOwnedExternalSupplier`(POST/PUT 상품과 같은 함수) — 새 권한 칸 0. 오너는 업체 상세(공통 범위)에서 지운다 — 오너가 지우면 소유 매장들의 연결이 영향을 받는다. **이건 허용한다**: 상품은 오너 것이고 지우는 순간 매장 연결은 어차피 죽는다. 교체는 매장 연결의 «상품» 만 바꾸고 매장이 정한 칸(선호·켜짐·메모·`buyer_restaurant_id`)은 그대로 둔다(§H-4 «오너가 소유 매장의 공급업체·가격까지 관리» 와 같은 쪽).
- 가입 공급업체(SA) 쪽 삭제는 **이번 무접촉**(§6).

**D2. «연결된 것» = `ingredient_seller_products` 에서 `seller_type='supplier' AND seller_product_id = 이 상품` 인 줄 전부(켜진 것·꺼진 것·매장이 브랜드 재료에 붙인 것 포함).** 각 줄에 대상 이름·주인·상태를 싣는다.
- 대상 4종: `ingredient_id`(매장/브랜드 재료 → 이름 + 매장/브랜드 이름) · `product_ingredient_id`(BG 재고아이템) · `product_id` · `brand_product_id`(레시피 없는 상품 직결 — 드묾).
- 함께 싣는 **정보(막지 않음)**: 그 연결 줄을 쓰는 **열린 발주**(`draft·pending_approval·submitted·confirmed` — PO 번호·상태) 수 · **정기 발주**(`line_items` 에 그 줄 id · status active/paused) 수. 받은 발주·취소 발주는 이력이라 세지도 건드리지도 않는다.
- S5 의 다른 표는 세지 않는다(외부 업체에 뜻 없음). 응답 모양은 재고아이템 삭제와 **같은 꼴**: `409 { success:false, error:{ code:'IN_USE', message, uses:[{type:'seller_link', link_id, target:{kind,id,name,owner_name}, is_active, is_preferred, unit_price, unit_conversion, open_po_count, schedule_count}] } }`. (재고아이템은 400 을 쓰지만 브랜드 프로덕트 삭제가 409 `inUseBody` 를 쓴다 — 삭제 충돌은 409 가 맞고 화면은 `error.code` 로 분기하므로 상태코드에 안 묶인다.)

**D3. 교체 = 연결 줄을 같은 업체의 다른 상품으로 옮긴다. 줄 id 보존.**
- `POST /api/external-suppliers/:id/products/:productId/replace` body `{ target_product_id, dry_run }` · `dry_run` 기본 **true**(전부 해 보고 롤백 — «적용 + 증명 + 롤백»).
- 대상 검사(400 `TARGET_INVALID`): 같은 `supplier_company_id` · 살아있음(`deleted_at IS NULL`) · `is_active` · 자기 자신 아님. **다른 업체 상품으로는 못 옮긴다** — 발주 머리(`seller_entity_id`)·계약·정기 발주 틀의 판매자가 달라져 다른 문서가 된다.
- 줄마다 바꾸는 칸: `seller_product_id := 대상` · **연결을 만들 때 판매 상품에서 복사하는 칸은 대상에서 다시 복사**(`catalogLink.mappingAttrs` 가 복사하는 칸 그대로 — 팀원은 그 함수를 읽고 **그 목록을 export 해서 쓴다**, 여기 새 목록을 적지 않는다; 현재 코드로는 `unit_price`·`min_order_quantity` 류) · 환산 = 옛 상품과 대상의 `(unit, base_quantity, order_mode)` 가 **같으면 그대로**(사람이 확인한 값 보존), 다르면 `deriveLinkConversion({ raw: undefined, stock, sellerProduct: 대상 })` 로 다시 정하고 `conversion_confirmed_*` 를 **비운다**(확인은 옛 단위쌍에 대한 것 — 재고 목록이 «확인 필요» 로 보여 준다, 기존 장치). 구매자가 정한 칸(`is_preferred`·`is_active`·`notes`·`lead_time_days`·`buyer_restaurant_id`)은 무접촉.
- 막는 것(400 `REPLACE_BLOCKED` · `uses[]` 꼴로 사유 · **아무것도 적용하지 않음**): ① 같은 대상(재고아이템/재료, 같은 `buyer_restaurant_id`)에 **대상 상품 연결이 이미 있음** — «둘 중 하나를 재고아이템에서 먼저 지우세요»(재고아이템 교체의 «한 레시피가 두 줄을 다 씀» 과 같은 선 — 합치기는 사람 몫) ② 대상 상품 단위와 재고 단위가 **환산 불가**(`linkConversionOf(...).compatible === false` — 질량↔부피 등) — 틀린 환산 1 을 조용히 넣지 않는다.
- 옮긴 뒤 같은 트랜잭션에서: 대상 재고 행마다 `costSync.recomputeUnitCost(kind, id, { transaction, ctx })` — ctx 는 외부 상품 가격 PUT 과 **같은 ctx**(`source:'seller_product_replace'` · `actor` = 요청 buyerEntity → 브랜드 공유 재료는 D-3 규칙으로 건너뛴다, 지금 PUT 과 같다) · 이력은 `cost_change_logs` 에 자동.
- 그 다음 **다시 센다**(`collectUses` 같은 함수·같은 트랜잭션) → 0 이 아니면 롤백 400 · 0 이면 `product.destroy({transaction})`(소프트) → `dry_run` 이면 롤백.
- 응답: `{ dry_run, moved:[{link_id, target, price:{from,to}, conversion:{from,to,needs_confirm}, cost:{from,to}|skip}], open_po_count, schedule_count, deleted }`.
- **발주 줄은 건드리지 않는다.** 보낸 발주(submitted 이상)는 상대에게 간 문서다. 임시저장(draft·pending_approval) 줄도 이번엔 무접촉 — 줄의 이름·단가는 발주 화면에서 사람이 다시 보고 제출한다. 미리보기에 «열린 발주 N건이 이 연결을 씁니다 — 보낸 것은 그대로, 임시저장은 열어서 확인» 한 줄로 알린다. 정기 발주는 실행 때 현재가·현재 상품으로 만들어지므로 저절로 따라간다(S3) — 미리보기에 «정기 발주 N개가 다음 실행부터 ‹대상› 으로 주문» 한 줄.

**D4. 대체할 상품이 없을 때(또는 원치 않을 때) — «연결 끊고 삭제».** *(Irene 컨펌 Q1)*
- `POST /api/external-suppliers/:id/products/:productId/unlink` body `{ dry_run }`(기본 true).
- 줄마다: **발주 줄·정기 발주가 하나도 안 가리키는 연결 → 행 삭제**(구매자가 재고아이템 화면에서 직접 하는 DELETE 와 같은 결과) · **이력이 있는 연결 → `is_active=0` 으로 끄고 남긴다**(FK SET NULL 로 발주 줄을 끊거나 정기 발주를 실패시키지 않는다 — S3). 그 다음 상품 소프트삭제.
- 왜 넣나: S2 — 업체 8곳 중 3곳이 상품 하나뿐이라 교체만 있으면 **지금보다 더 못 지운다**. 그리고 지금 삭제가 남기는 «지운 상품을 가리키는 켜진 연결»(S1·S7) 보다 이 결과가 깨끗하다(원가·레시피 무영향 — 공급처 줄은 레시피 줄이 아니므로 F8 과 다른 칸).
- 화면 문구에 «무엇이 지워지고(N줄) 무엇이 꺼지는지(M줄 · 발주 이력 있음)» 를 미리보기로 보여 준 뒤 확인.

**D5. 화면 — 흐름 하나, 입구 둘.**
- 새 공용 부품 `pages/Suppliers/DeleteSupplierProductFlow.tsx`(제어 컴포넌트: `supplierId · product · onDone`) — ①확인창(`ConfirmModal`) → DELETE → 성공이면 끝 / `error.code==='IN_USE'` 면 ②**바로 교체 창**(막힘 창 거치지 않음 — 10-16 수용 이탈 1 과 같게): 위 = 쓰는 곳 목록(이름 · 주인 · 켜짐/꺼짐 · 열린 발주/정기 발주 수) · 가운데 = 같은 업체 다른 상품 `SearchableSelect`(출처 `GET /api/external-suppliers/:id/products` · `is_active` · 자기 제외; 비어 있으면 «이 업체에 다른 상품이 없습니다 — 먼저 추가하거나 아래 ‹연결 끊고 삭제›») · «Preview» → 줄마다 `가격 a → b · 환산 c → d (확인 필요)` + 열린 발주·정기 발주 한 줄 → **«Switch & delete»**(danger) · 보조 **«Unlink & delete»**(D4 · 자기 미리보기 → 확인). `REPLACE_BLOCKED` 는 창 안에 사유 목록(재고아이템 교체 창의 `blockReasons` 와 같은 자리).
- 입구 ① `AllSupplierProductsView.tsx` `isMine(r)` 행 버튼에 «Delete»(기존 `Button size="small"` 열 — 공용 Button 의 danger 변형, 로컬 styled 금지) → 끝나면 `fetchRows()`·`fetchMyItems()`.
- 입구 ② `SupplierProfilePage.tsx` 기존 `deletingProduct` ConfirmModal + `doDeleteProduct`(조용한 실패) 를 **이 부품으로 교체** → 실패 메시지가 보이게 된다(S1 결함 해소).
- i18n `supplierDirectory` ns `extProduct.*` 새 키 4언어(en→ko→zh→ms) · `npm run i18n:verify`.
- 디자인: 공용 Modal/ModalButton/ConfirmModal/SearchableSelect · 색은 Button 변형 · 장식 이모지 0 · `check-design-guard` 신규 0.

**D6. 서버 파일 배치 — 규칙은 서비스 한 곳.**
- 새 `services/supplierProductDelete.js`: `collectSupplierProductUses(productId, {transaction})` · `replaceSupplierProductLinks({product, target, actor, userId, transaction})` · `unlinkSupplierProductLinks({product, transaction})`. DELETE·replace·unlink 세 라우트와 health-check 가 **같은 함수**를 쓴다(검사와 수정은 같은 술어). 함수는 «외부 업체» 를 가정하지 않는다(가입 공급업체 쪽이 뒤에 같은 함수를 쓸 수 있게 — 이번엔 호출 안 함).
- `routes/supplier-directory.js`: DELETE 에 `collect` → 409 추가 · `/replace`·`/unlink` 라우트 2개(게이트 `loadOwnedExternalSupplier` + `product.supplier_company_id === sc.id`).
- 모델·마이그·ENUM 변경 **0**. 🔒 인쇄 8파일·KDS 무접촉. `supplier-products.js`(SA)·`ingredient-seller-products.js`·`costSync`·`sellerLinkConversion`·`catalogLink` 는 **읽기만**(export 한 줄 추가는 허용 — mappingAttrs 복사 칸 목록을 밖에서 쓰기 위해).

## 4. 코드 변경 범위 (팀원)

| # | 파일 | 변경 |
|---|---|---|
| 1 | `dev-backend/services/supplierProductDelete.js` 신규 | D2·D3·D4 함수 3개 · 트랜잭션 인자 · dry_run 은 라우트가 롤백으로 처리 |
| 2 | `dev-backend/routes/supplier-directory.js` | DELETE :1697 에 사용처 검사 → 409 IN_USE · `POST …/replace` · `POST …/unlink` |
| 3 | `dev-backend/utils/catalogLink.js` | `mappingAttrs` 가 판매 상품에서 복사하는 칸을 함수 하나로 export(동작 변경 0) |
| 4 | `dev-backend/scripts/health-check.js` | `supplier` 카테고리에 §5 (a)~(f) · 고장주입 2 |
| 5 | `dev-frontend/src/pages/Suppliers/DeleteSupplierProductFlow.tsx` 신규 | D5 흐름 |
| 6 | `dev-frontend/src/pages/Suppliers/AllSupplierProductsView.tsx` | isMine 행 «Delete» + 흐름 연결 |
| 7 | `dev-frontend/src/pages/SupplierDirectory/SupplierProfilePage.tsx` | 기존 삭제 확인창·`doDeleteProduct` → 공용 흐름 |
| 8 | `dev-frontend/public/locales/{en,ko,zh,ms}/supplierDirectory.json` | `extProduct.*` 새 키 |
| 9 | `docs/EXTERNAL_SUPPLIER_PRODUCTS.md` | §4 DELETE 줄에 «연결 있으면 409 · replace/unlink» 한 줄(배포 뒤) · `TRADE_STRUCTURE` 무변경(새 목록·경로 아님) |

순서(프론트 빌드 1회): 1→2→3→4(health 실호출·고장주입 끝내기) → 5→6→7→8 → `build:dev` 1회 → `verify-all --full` 1회 → 클릭 흐름 1회(데모 매장 38 · `[확인용]` 상품) → `check-sensitive-diff` → Fable gate 1회.

## 5. 증명 기준 (gate 에서 볼 것 — 미리 정함)

데모 매장 38 RA 로 `[확인용]` 외부 업체 + 상품 A(1 kg/pack · RM 5)·B(10 kg/BOX · RM 48) + 재료(kg) 에 A 연결(환산 1 · 확인됨) + A 연결을 쓰는 발주 1건(submitted) 을 만들고:
- **(a)** DELETE A → **409 IN_USE** · `uses` 1줄(target 이름·open_po_count 1) · A 살아있음 · 연결 무변화.
- **(b)** `replace` dry_run(기본) → `moved[0]` = 가격 5→48 · 환산 1→10 · needs_confirm true · 원가 숫자 · **DB 무변화**(연결은 A · A `deleted_at` NULL).
- **(c)** `replace dry_run:false` → 연결 `seller_product_id`=B · `unit_price`=48 · `unit_conversion`=10 · `conversion_confirmed_at` NULL · 재료 `unit_cost` = `convertPrice` 값(숫자로 적는다) · `cost_change_logs` +1 · **발주 줄의 `ingredient_seller_product_id` 그대로** · A `deleted_at` 찍힘 · 재고 목록 GET 에서 그 연결이 `conversion_status: needs_confirm`.
- **(d)** 막힘 4: 다른 업체 상품 → 400 TARGET_INVALID · 자기 자신 → 400 · 같은 재료에 B 연결이 이미 있음 → 400 REPLACE_BLOCKED **무변화** · B 를 L 단위로 바꿔 두면(kg↔L) → REPLACE_BLOCKED 무변화.
- **(e)** `unlink`: 이력 없는 연결 → 행 삭제 · 발주가 가리키는 연결 → `is_active=0` 으로 남음(행 수 유지) · 상품 삭제 · 발주 줄 FK 그대로.
- **(f)** 보안: 다른 매장 RA → 403/404 · 가입 공급업체 상품 → 403 NOT_EXTERNAL · 오너 업체 상품을 소유 매장 RA 가 → 403.
- **고장주입 2**: «같은 업체» 검사 제거 → (d)① 실패 · 중복 연결 검사 제거 → (d)③ 실패. 원복 grep 0.
- 기계 게이트: `verify-all --full`(mount sweep — `/pos/suppliers?tab=products` RA·BG·FG·owner 크래시 0) · print-guard 8/8 · design-guard 신규 0 · i18n verify · `check-sensitive-diff`(②대상 — 예상).
- 실브라우저 1회: 탭에서 `[확인용]` 상품 Delete → 교체 창 → B 선택 → Preview → Switch & delete → 목록에서 사라짐 · 재료의 공급처가 B. 업체 상세에서도 같은 창이 뜨는지 1회.

## 6. 하지 않는 것 (범위 밖 · 이유)

- **가입 공급업체(SA) 자기 상품 삭제**(`supplier-products.js` DELETE) — 구매자 연결은 구매자 것이라 공급업체가 옮길 수 없고, 지금도 «판매 중지» 로 발주가 막힌다(`poSellerProductActive`). 다음에 같은 `collectSupplierProductUses` 로 «구매자 N곳이 이 상품을 공급처로 쓰고 있습니다» 경고 한 줄만 붙이면 된다 — 이번 묶음 아님.
- 다른 업체 상품으로 옮기기 · 발주 줄(임시저장 포함) 이름·단가 고쳐 쓰기 · 정기 발주 `line_items` 고쳐 쓰기(id 보존으로 불필요) · 브랜드→매장 사본 동기화(설계상 독립) · 하드 삭제 · 지운 상품 되살리기 화면 · 재고아이템 쪽 화면 변경 · 가입 공급업체 상품을 구매자가 지우기.
- 모델·마이그 0 · 🔒 인쇄·KDS 무접촉 · 운영 쓰기 0.

## 7. Irene 컨펌 (Fable 권고 첨부)

**Q1. 대체할 상품이 없거나 원치 않을 때 «연결 끊고 삭제»(D4) 도 같이 넣을까요?** — 이력 없는 연결은 지우고, 발주·정기 발주가 가리키는 연결은 끈 채 남기고, 상품을 지운다. 넣지 않으면 상품 하나뿐인 업체(개발 8곳 중 3곳)의 상품은 여전히 못 지운다. **Fable 권고: 예** — 지금 삭제가 남기는 «지운 상품을 가리키는 켜진 연결» 보다 깨끗하고, 레시피·원가에는 닿지 않는다(공급처 줄은 레시피 줄이 아니다).

그 밖은 질문 없음 — 가입 공급업체 쪽은 이미 자기 화면에서 지울 수 있고(§6), 오너가 지우면 매장 연결까지 옮기는 것은 §H-4 와 같은 쪽이라 Fable 이 정했다(D1).
