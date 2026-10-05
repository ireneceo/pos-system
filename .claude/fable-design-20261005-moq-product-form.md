# [Fable 설계] GIT 「육개장 고기 45g」 등록 · 최소주문 강제 · 등록 화면 명칭 — 2026-10-05

작성 Fable(리더) · 코드 변경 0 · 근거 = 팀원 실측(HEAD 760c8c886 + 운영 읽기) + 아래 Fable 코드 실측.
단일 진실로 삼는 문서: `docs/TRADE_STRUCTURE.md` §2-2(다섯 칸) · §2-4(상품 종류) · §5-7 · §5-12 / `docs/PURCHASE_ORDER_SYSTEM.md` «백로그 — 서버가 최소주문을 강제하지 않음(2026-08-30)».
⛔ 이 설계는 **새 칸·새 표·새 경로를 만들지 않는다.** 전부 이미 있는 칸과 이미 있는 규칙 함수 위에서 끝난다.

---

## 0. 호출 조건 판정

- A 파급: 돈(발주 금액·최소주문) · 매장 재고(연결 환산) · 운영 상품 데이터 → **크다**.
- B 가역성: 서버 차단 규칙 추가 · 환산 기본값 변경은 배포 뒤 발주·입고에 바로 작용 → **되돌리기 어렵다**.
- C 판단 분기: 기존 수정 vs 신규 / 하한 vs 배수 / 차단 범위 / stock_unit 칸 운명 / 명칭 교체 vs 설명 추가 → **갈린다**.
→ 호출 조건 성립. 이 사안의 Fable 호출은 ①이 문서(설계) ②게이트 판정 — 2회로 끝낸다. 구현 중 세부는 팀원이 정하고 결과에 붙인다.

---

## 1. 한 줄 결론

**육개장 45g 은 지금 화면으로도 등록된다(값은 §3 표).** 그러나 Irene 가 「강제」라고 한 최소주문은 **안내만 있고 어디서도 막지 않으며**, 매장이 이 상품을 자기 재료에 연결할 때 **환산이 45 가 아니라 1 로 들어가** 입고가 45배 어긋난다. 등록 화면은 영어 하드코딩 + 전문용어 + «이 가격이 무엇의 가격인지» 설명 부재라 개발자도 못 읽는다. → **한 묶음(배포 1회)** 으로 ①최소주문 차단 ②연결 환산에 기준양 반영 ③등록 화면 어휘·설명·순서 정리 ④자체재고 «재고 단위» 칸 제거(§5-12 = A)를 한다. 소분·분할 기능은 **만들지 않는다**(Irene 원문 ②).

---

## 2. Fable 코드 실측으로 보탠 사실 (팀원 실측에 추가·정정)

| # | 사실 | 위치 |
|---|---|---|
| F1 | 브랜드 등록 폼의 가격·기준양·단위·최소주문·자체재고 라벨은 **`t()` 없이 영어 하드코딩** — 한글 UI 에서도 영어로 뜬다. 번역이 있는 것은 주문방식·포장단위·상품종류 3묶음만 | `BrandProductsTab.tsx:1310-1480`, `locales/*/brand.json products.*` |
| F2 | 공급업체 폼에는 「이 가격은 무엇 1개의 가격인가」 문장(`PriceMeaning` — «Price per 1 unit of 45 g/pack»)이 2026-08-30 에 들어갔는데 **브랜드 폼엔 없다.** Irene 의 「어떻게 넣으라는 거야」는 정확히 이 공백 | `SupplierProductsTab.tsx:1058-1072` vs `BrandProductsTab.tsx:1335` |
| F3 | 규격 문구 규칙은 이미 하나다: `sellerSpecLabel` → unit=g · base=45 · package=pack · pack 모드면 **«45 g/pack»**, 수량 접미 = `pack`, 금액 = 수량 × RM4.50. 서버 `utils/poLineSpec.js` 동일 규칙. **45g 팩 상품은 지금 모델이 그대로 표현한다** — 새 칸 불필요 | `utils/unitConversion.ts:238-272` |
| F4 | 최소주문 서버 검사 **0건** — `createPurchaseOrderCore`(POST·bulk) · `PUT /purchase-orders/:id` · `POST /:id/submit` · `seller-orders POST /` · `/amend` 전부 `quantity_ordered > 0` 만 본다 | `purchase-orders-crud.js:823,880,919,1306` · `workflow.js:924-960` |
| F5 | 화면은 담을 때 `Math.max(1, MOQ)` 로 시작하고 «Min 22» 글자를 보여줄 뿐, 수량칸 `min={0}` · «−» 가 0 까지 내려가고 제출도 막지 않는다 | `NewPurchaseOrderPage.tsx:1615,1852,2296-2316,2445,2653-2663` |
| F6 | 2026-08-30 Fable 백로그 판정이 「안내만 유지, 실사용에서 문제 생기면 차단 도입」이었다. **지금이 그 시점이다**(Irene 원문 ④). 선행조건 3개(경고/차단 · 적용 시점 · 기존 26건 실측)는 이 문서가 정한다 | `PURCHASE_ORDER_SYSTEM.md:1267-1283` |
| F7 | 링크의 `min_order_quantity` 는 **연결 시점 사본**이고 `costSync` 는 가격만 따라가며 **MOQ 는 동기화하지 않는다** → 판매자가 1→22 로 바꿔도 이미 연결된 매장 링크는 1 로 남는다. (상품 16 은 연결 0 이라 이번 건엔 영향 없음. 규칙은 **판매자 상품의 현재 MOQ** 를 읽어야 한다) | `utils/catalogLink.js:153` · `services/costSync.js` grep 0 |
| F8 | 연결 환산 — 옳은 함수는 **이미 있다**: 화면 `defaultLinkConversion(base_quantity, 내용물단위, 재고단위)`(Fable 2026-09-11) · 서버 `unitConversionRule.classifyConversion`(Fable 2026-09-17 ③, pack-measure 갈래 `want = seller_base × factor`). 그런데 카탈로그 연결 두 화면은 옛 `detectConversion`(기준양 무시)을 쓰고, 서버 `catalogLink.resolveUnitConversion` 은 body 없으면 **1**. 옳은 함수를 쓰는 곳은 `RegisterExternalSupplierModal` 하나 | `ConnectSellerModal.tsx:115-127,188` · `NewPurchaseOrderPage.tsx:1734-1793` · `restaurantCatalogLink.js:94-95,184-185` · `unitConversion.ts:300-310` |
| F9 | 그래서 매장이 «45 g/pack» 을 g 재료에 연결(또는 카탈로그에서 새 재료 생성: unit=g, base=1)하면 conv=1 → **1팩 입고 = 재고 +1 g**(맞는 값 45). 원가는 `단가 ÷ conv` = RM4.50/g (맞는 값 RM0.10/g). 사후에 `conversionStatusFor` 가 D(제안 45)로 «확인 필요» 를 띄우긴 하나 **막지는 않는다** | `purchaseOrderReceive.js:96,106-108` · `sellerLinkConversion.js:150-178` |
| F10 | 자체재고 차감 = `current_stock -= quantity_ordered`(주문 단위 = 팩). 즉 45g 상품의 재고 숫자는 **팩 수**다. `stock_unit` 은 원장 라벨뿐(§5-12 팀원 실측 1~6 재확인) | `seller-orders.js:534-542` |
| F11 | 발주 대기(staging) 화면은 수량을 **읽기 전용**으로만 보여준다 — 제출 단계에서 막히면 거기서 고칠 수 없다 | `PurchaseOrderStagingPage.tsx:552` |
| F12 | `brand_products` 에 `package_quantity` 칸이 없다(네 칸: unit·base_quantity·package_unit·order_mode). 브랜드 상품은 기준양 1 고정 — §2-2 의 다섯째 칸은 재고아이템 전용. 45g 건엔 필요 없다 | `models/BrandProduct.js` |

---

## 3. Irene 질문 1~8 답 (지금 코드 기준 · 사실과 판정 구분)

| Q | 답 | 근거 |
|---|---|---|
| 1 기존 1kg 수정 vs 신규 | **기존 id 16 을 수정.** 연결 0행·발주줄 0행이라 이력이 없고, 신규로 만들면 같은 물건 두 줄(§5-3 에서 걷어낸 사고)이 된다. | 팀원 운영 읽기 |
| 2 필드 | 아래 «입력값 표». 영문명·보관방식 칸은 **없다 → 만들지 않는다.** 이름 하나(영문)·설명(한글명·냉동·1인분 소분). | F12 · TRADE_STRUCTURE 대전제 |
| 3 22팩 미만 차단 가능? | **지금은 불가**(F4·F5). 이 설계 §4-A 로 차단. | |
| 4 22팩 단위 vs 최초 22 후 1팩씩 | **최초 22 후 1팩씩** = 하한(min). 요청서 문구 「최소 주문은 22팩으로 제한」은 하한이고, 배수 칸은 없으며 새로 만들지 않는다. **Irene 확인 ②** | |
| 5 재고를 팩 vs 중량 | **팩 수.** 코드가 그렇게 센다(F10). 중량으로 바꾸는 길(§5-12 B)은 81행 의미 변경+마이그라 기각. | F10 |
| 6 1kg↔45g 소분 기능 | **불필요.** Irene 원문 ②와 일치. 1kg 재고가 남아 있으면 팩 수로 환산한 숫자(1kg≈22팩)를 재고 칸에 직접 적는다. 코드 0. | |
| 7 입력값 | 아래 표 | |
| 8 최소 수정 제안 | §4 | |

**입력값 표 (상품 16 수정 — 배포 전·후 동일하게 유효한 값):**

| 칸 (현재 영어 라벨) | 값 | 뜻 |
|---|---|---|
| Name | `K-Yukgaejang Beef 45g` | 이름 칸 하나 |
| Description | `육개장 고기 45g · 1인분 소분 · 냉동` | 한글명·보관은 여기 |
| Order Method | **By count (pack / box)** | 팩 개수로 주문 |
| Unit (취급단위) | **g** | 묶음 안 내용물 단위 |
| Base Qty (취급 기준숫자) | **45** | 한 묶음에 든 양 |
| Package Unit (기준단위·포장) | **pack** | 구매자가 세는 단위 |
| Unit Price (RM) | **4.50** | **1 pack 가격** (45 g 의 가격) |
| Min Order Qty | **22** | 22 pack 부터 |
| Product type | Stocked goods | 재고 세고 배송 |
| Stock for this product | 보유 팩 수 (없으면 0) · 단위 칸 **비움** | 팩 수로 센다(F10) |
| Distribution | 그대로 (specific_brands) | |

→ 화면이 만드는 규격 «45 g/pack», 담을 때 «22 pack», 금액 22 × 4.50 = **RM 99.00** — 요청서와 일치.
가격 환산 참고: 4.50 ÷ 45 g = **RM 100.00/kg** (기존 97.90/kg 보다 2.1% 높음) — 사실만 적음, 판단은 GIT.

---

## 4. 설계 — 네 블록, 배포 1회

### 4-A. 최소주문 강제 (구매자 경로 · 차단)

**의미 확정:** `min_order_quantity` = **주문 단위의 하한.** 그 이상은 1 스텝(measure 는 0.01 스텝) 자유. 배수 아님. 판매자 상품의 **현재 값**이 기준(F7 — 링크 사본이 아니다).

**서버 — 규칙 한 곳:** `dev-backend/utils/poMinOrder.js`
- `assertLinesMeetMinOrder(items, { transaction })` : 줄의 `ingredient_seller_product_id` → 매핑 → `seller_type` 별 JOIN(`refresh-prices` 와 같은 패턴, 다형 참조 함정 주의)으로 **판매자 상품 현재 MOQ** 를 읽어 `quantity_ordered < MOQ` 면 던진다. 비교 전 `parseMinOrderQty` 로 정규화, 소수 비교는 `Math.round(x*100)/100`.
- 응답: `400 { success:false, message:'Below minimum order quantity', data:{ violations:[{ item_id|description, quantity, min, unit }] } }` — 화면이 줄 이름과 «최소 22 pack» 을 그대로 보여줄 수 있게. (`fetchAPI` 가 본문을 버리는 함정(메모리) — 이 호출만 직접 fetch 로 사유 표시.)
- 호출 3곳(구매자): ① `createPurchaseOrderCore`(POST + bulk 공유) ② `PUT /purchase-orders/:id` ③ `POST /purchase-orders/:id/submit`(옛 초안·사후 MOQ 변경 안전망).
- **호출하지 않는 곳(판매자):** `seller-orders POST /`(대리주문) · `/amend`(품목 수정). 판매자는 규칙의 주인이고, 보충·조정 주문을 자기 규칙에 묶으면 매장 대리주문 A안(2026-10-01)이 막힌다. **Irene 확인 ③.**
- 외부 공급업체(가입 안 한) 줄은 매핑에 판매자 상품이 없으면 **검사 대상 아님**(MOQ 가 매핑 사본에만 있음 — 그 경우만 사본 사용).

**화면 — 장바구니 하한:** `NewPurchaseOrderPage.tsx`
- 수량칸 `min` = 선택 판매자 MOQ · «−» 는 하한에서 비활성 · 직접 입력 후 blur 에 하한으로 되돌리고 칸 아래 «최소 22 pack» 한 줄. 하한 계산 헬퍼 1개(`minQtyOf(seller)` — `parseMinOrderQty` 재사용, `utils/unitConversion.ts`).
- 줄을 없애는 길은 × 하나. 담을 때 시작값은 지금처럼 MOQ.
- 판매자 바꾸면 하한도 그 판매자 것으로 다시 계산(지금 1329·1379·1422 가 판매자별 값을 이미 들고 있다).

**선행 실측(S1 · 운영 읽기 · 코드 0):** ① MOQ>1 인 판매자 상품·매핑 수(08-30 은 15+11) ② 미제출 초안(`draft`·`pending_approval`·`submitted`) 중 현재 MOQ 미달 줄 수 ③ 그 줄의 매장. ②가 0 이 아니면 제출 차단 메시지 뒤 「대기 화면에서 수량을 못 고친다(F11)」가 사용자에게 걸린다 → ②>0 이면 **차단 메시지에 「이 줄을 지우고 다시 담아 주세요」 를 넣고, 수량 편집 UI 는 이번에 만들지 않는다**(범위 확대 금지). **Irene 확인 ⑥.**

### 4-B. 연결 환산 — 기준양 반영 (매장 재고 무결성)

**원칙:** 환산 규칙은 서버 `unitConversionRule.classifyConversion` · 화면 `defaultLinkConversion` 둘뿐. 셋째 사본 금지. 둘은 같은 답을 낸다 — 45 g/pack → g 재료 **45**, kg 재료 **0.045**(서버 `45×1/1000`, 화면 `convertUnit(45,'g','kg')`).

- **서버:** `services/sellerLinkConversion.js` 에 `deriveLinkConversion({ raw, stock, sellerProduct })` 추가 — `raw>0` 이면 그 값(사람 입력 우선), 없으면 `classifyConversion` → `D` 면 `want`, `N`/`H` 면 1(H 는 지금처럼 «확인 필요»가 뜬다). 카탈로그 연결 생성부(`restaurantCatalogLink.js` 두 자리 + BG `product-ingredients` 경로 — 팀원이 R-SC-007 주석의 «4벌» 을 전수 확인해 결과에 붙임)가 `catalogLink.resolveUnitConversion(raw)` 대신 이것을 부른다. `resolveUnitConversion` 은 삭제하지 않고 내부에서만 쓰거나 호출 0 이면 제거.
- **화면:** `ConnectSellerModal.tsx` · `NewPurchaseOrderPage.tsx` 의 `detectConversion` 두 사본을 **`defaultLinkConversion(seller.base_quantity, seller.unit, 재고단위)`** 로 교체(measure 모드는 base 1 과 같으니 같은 함수가 단위비를 돌려준다). null 이면 지금처럼 사람 입력 강제. 자동값 안내 문구는 «1 pack = 45 g» 형태.
- 기존 틀린 링크 소급 **없음**(2026-09-17 정리 스크립트 영역). 운영 D 건수만 S1 에서 같이 읽어 보고.

### 4-C. 등록 화면 — 어휘·설명·순서 (브랜드 + 공급업체 폼 한 벌)

**원칙:** §2-2 정식 명칭(취급단위·취급 기준숫자·기준단위(포장)·가격)은 **바꾸지 않는다** — 문서·재고아이템 화면·발주 화면이 같은 말을 쓰고 있어 여기만 바꾸면 갈라진다. 대신 **①칸마다 한 줄 쉬운 설명 ②전부 합친 «구매자가 보는 문장» 미리보기 ③채우는 순서**를 고친다. **Irene 확인 ⑤.**

순서(판매자가 생각하는 순서 = 결정이 다음 칸을 정하는 순서):
1. **주문 방식** — 「구매자가 이 상품을 어떻게 담나요?」 ○ 개수로 (pack·box) ○ 무게·부피로 (kg·g·L·ml)
2. **한 묶음 규격** — `[취급 기준숫자 45] [취급단위 g]` 가 `[기준단위(포장) pack]` 하나 → 미리보기 **«1 pack = 45 g»**. 설명: «취급단위 = 묶음 안에 든 것의 단위(g·kg·ml·L·piece). 기준단위 = 구매자가 세는 포장 이름.» 무게로 주문이면 포장 칸이 접히고 «kg 단위로 담습니다».
3. **가격** — 라벨 «1 pack 가격 (RM)» (포장 이름이 라벨에 들어간다) + 공급업체 폼의 `PriceMeaning` 그대로 이식: «RM 4.50 / pack (45 g · RM 0.10/g)».
4. **최소 주문** — 라벨 «최소 주문 수량», 접미 `pack`, 설명 «구매자는 22 pack 아래로 담을 수 없습니다. 그 위로는 1 pack 씩 더할 수 있습니다.»
5. **상품 종류** — 그대로(재고 상품 / 주문제작 / 서비스·기타).
6. **현재 재고**(재고 상품 + 레시피·재고아이템 없음일 때) — 라벨 «현재 재고 (pack 수)», 숫자 하나. **«재고 단위» 글자 칸 제거**(4-D).
7. 맨 위 고정 **요약 문장(미리보기)**: «구매자는 **1 pack = 45 g** 을 **RM 4.50** 에, **22 pack** 부터 담습니다.» — 칸을 바꾸면 즉시 갱신. 이 한 문장이 Irene 의 「완전 쉽게 알 수 없어?」에 대한 답이다.

구현 범위: `BrandProductsTab.tsx` 하드코딩 영어 라벨(F1) → `t()` 키로 · 설명·미리보기 키 신설 · `SupplierProductsTab.tsx` 는 같은 키 묶음을 **같이** 쓴다(이미 `products.*` 네임스페이스 공유). `MenuManagementPage` 는 **같은 키를 쓰는 칸만** 따라오고 아니면 무접촉(팀원이 키 공유 여부로 판단해 결과에 붙임). 4개 언어(en·ko·zh·ms) + `npm run i18n:verify`. 디자인 가드(공용 컴포넌트·danger 색) 준수, 새 styled 금지.

### 4-D. §5-12 판정 — **A.** 「자체 재고는 주문 단위(포장단위)로 센다」 를 못 박고 «재고 단위» 칸을 없앤다

- 근거: 코드가 이미 그렇게 센다(F10) · 운영 81행 중 78행 빈 칸, 3행은 package_unit 과 같은 말 → **옮길 데이터 0** · B(중량 환산)는 숫자 의미 변경+마이그+원장 재해석이라 비가역성 큼 · C(설명만)는 Irene 가 「왜 또 따로 넣어?」라고 한 칸을 남긴다.
- 변경: 화면 칸 제거(브랜드 폼) · 저장 시 `stock_unit: null` 유지(쓰기 중단) · 원장 라벨을 쓰는 4자리(`seller-orders.js:548`, `inventoryDeductionService.js:255,266,273`, `purchaseOrderReceive.js:51`)는 `stock_unit || 포장단위(poLineSpec 의 주문단위 규칙) || unit` 로 폴백 — 서버 규칙 함수 재사용, 새 규칙 금지. **DB 컬럼은 남긴다**(마이그 0 · 운영 쓰기 0). 공급업체 쪽은 칸이 원래 없으니 비대칭이 이것으로 **사라진다**(쟁점①). `min_stock` 저재고 기준도 같은 팩 수(쟁점②) — 라벨만 «pack» 으로 맞춘다. 입고(`purchaseOrderReceive`)는 판매자 자체재고에 들어오지 않으니 무접촉(쟁점③). 여섯째 칸 이유 없음(쟁점④).
- **Irene 확인 ④.**

---

## 5. 기각한 길 (다시 열지 않는다)

- 「소분·분할(1kg→45g×22)」 기능 — Irene 원문 ② · `inventory-produce.js` 는 매장 준비재고 전용, 브랜드 상품 간 변환 경로 신설은 「기존 개념에 새 경로」 금지.
- 「22팩 배수(pack-of-22)」 칸 — 요청서는 하한이고, 칸을 더하면 §2-2 다섯 칸 밖의 여섯째가 된다.
- 「영문명·보관방식」 칸 — 이름 1칸·설명으로 충분. 다국어 상품명은 별건이며 이번 범위 밖.
- 「MOQ 를 경고만」 — Irene 원문 ④ 「강제하는 거 아니야? … 안되어야지」로 결정됨. 08-30 백로그의 「안내만」 판정은 이 지시로 대체.
- 「§5-12 B(재고를 중량으로)」 — 위 4-D.
- 「판매자 경로까지 차단」 — 대리주문 A안 충돌 · 규칙 주인은 판매자. 다만 Irene 가 원하면 같은 util 한 줄 추가로 켤 수 있다(설계상 가역).
- 「명칭 자체 교체(취급단위→내용물 단위)」 — 문서·재고아이템·발주 화면과 어휘가 갈라진다. 설명+미리보기로 해결.

---

## 6. 절단면 · 순서 (팀원 실행 · 빌드 1회 · 운영 쓰기 0)

| 단계 | 내용 | 코드 |
|---|---|---|
| S1 | **운영 읽기 실측**: MOQ>1 판매자상품·매핑 수 / 미제출 초안의 MOQ 미달 줄 수·매장 / R-SC-007 D 건수 / stock_unit 비어있지 않은 행 재확인 / 상품 16 연결·발주줄 0 재확인 | 0 |
| S2 | 서버 MOQ: `utils/poMinOrder.js` + 호출 3곳 + health-check 케이스(demo 38: bulk qty<MOQ→400 · qty=MOQ→201 · PUT 미달→400 · submit 미달→400 · 판매자 POST 는 통과) | 백엔드 |
| S3 | 서버 환산: `deriveLinkConversion` + 연결 생성부 전수(«4벌» 확인) + health-check 케이스(45 g/pack ↔ g 재료 연결 → `unit_conversion=45` · kg 재료 → 0.045 · tray↔kg → 1 + needs_confirm) | 백엔드 |
| S4 | 프론트 일괄 확정: 장바구니 하한 · `detectConversion`×2 → `defaultLinkConversion` · 등록 폼 어휘·설명·미리보기·순서 · stock_unit 칸 제거 · 공급업체 폼 동기 · 4개 언어 · 프론트 고장주입(한 번에) · 마지막에 SW bump | 프론트 |
| S5 | `npm run build:dev` **1회** → `verify-all --full` **1회** → `check-sensitive-diff`(돈·주문 → 게이트 대상) → 결과 Fable 게이트 판정 1회 → Irene `/배포` | |
| S6 | 배포 후 **Irene 가 화면에서** 상품 16 을 §3 표대로 수정(데이터, 코드 아님). 등록 뒤 demo 매장 1곳에서 담기 → «22 pack» 하한 · 연결 환산 45 확인 | 0 |

🔒 인쇄 8파일 · KDS 무접촉. 마이그 0. ENUM 0. 새 표 0. 새 칸 0.

---

## 7. 증명 기준 (게이트에서 볼 것 — 미리 정함)

1. **diff 범위**: §4 네 블록 밖 변경 0. `check-print-guard` 변경 0. `check-design-guard` 신규 위반 0.
2. **고장주입(의무)**: ① `assertLinesMeetMinOrder` 호출 1곳 제거 → 해당 health-check 케이스 **실패** 확인 후 원복 ② `deriveLinkConversion` 을 항상 1 → 환산 케이스 실패 ③ 장바구니 `min` 을 0 으로 → 프론트 유틸 테스트(`packSpec.test.ts` 옆에 `minQtyOf` 1건) 실패. pm2 restart 뒤 HTTP 주입(메모리 규율).
3. **실호출 왕복**: demo 매장에서 S2·S3 케이스 전부 + 판매자 대리주문은 MOQ 무관 통과.
4. **화면**: mount sweep 0 crash + 브랜드 등록 폼 1회 클릭 흐름(미리보기 문장이 45/g/pack/4.50/22 로 갱신되는지 — sweep 은 «열 수 없는 화면» 을 못 잡는다).
5. **i18n**: `i18n:verify` 통과, 하드코딩 영어 라벨 0(해당 폼 한정).
6. **배포 안전**: 마이그 0 · SW bump 1회 · 롤백 = 직전 배포 레이아웃. S1 수치가 보고에 붙어 있어야 판정한다 — 없으면 «확인 불가»로 적는다.

---

## 8. Irene 컨펌 요청 (각각 Fable 권고 첨부)

① **기존 상품 16 수정 vs 신규 등록** — 권고 **수정**. 연결 0·발주 0 이라 이력 손실 없고, 신규면 같은 물건 두 줄이 된다.
② **최소주문의 뜻** — 권고 **하한(22 부터, 그 위는 1팩씩)**. 배수 칸은 없고 만들지 않는다. 배수가 꼭 필요하면 별건 설계.
③ **차단 범위** — 권고 **구매자 경로(담기·생성·수정·제출) 차단, 판매자 대리주문·품목수정은 비차단**. 판매자가 규칙 주인.
④ **자체재고 «재고 단위» 칸** — 권고 **제거(§5-12 A)**. 재고는 팩 수로 센다는 사실을 화면이 그대로 말하게. 컬럼은 남기고 마이그 없음.
⑤ **등록 화면 명칭** — 권고 **정식 명칭 유지 + 칸마다 쉬운 설명 + 맨 위 «구매자는 1 pack = 45 g 을 RM 4.50 에, 22 pack 부터 담습니다» 미리보기 문장**. 명칭 교체는 문서·다른 화면과 갈라져서 비권고.
⑥ **옛 초안 처리** — S1 실측에서 MOQ 미달 초안이 있으면, 제출 차단 메시지에 「줄을 지우고 다시 담아 주세요」만 넣고 **대기 화면 수량 편집은 이번에 만들지 않는다** — 권고 그대로(범위 확대 금지). 0 건이면 쟁점 소멸.
⑦ **등록 시점** — 권고 **배포 뒤 등록**. 지금 등록해도 되지만(§3 표 유효) 매장이 연결하는 순간 환산 1(F9)·하한 미적용(F4) 두 구멍이 열려 있다. 상품 16 은 아직 어느 매장도 안 담았으니 서두를 이유가 없다.
