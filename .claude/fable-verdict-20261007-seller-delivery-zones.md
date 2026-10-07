# Fable 판정 원문 (2026-10-07) — 판매자 배송 지역별 설정 · 설계 1회차

> 팀원은 이 문서를 **가공 없이** Irene 에게 전달하고, Ⅱ 를 구현 지시로 쓴다.
> 이 사안의 Fable 호출은 이번(설계) + 구현 후 게이트 1회 = 2회로 끝낸다. 구현 중 세부 질문은 팀원이 정하고 결과에 붙인다.

---

## Ⅰ. Irene 에게 올리는 보고문

### 0. 한 줄 결론
**판매자가 「배송 지역」을 레스토랑 모바일오더처럼 줄 단위로 추가합니다(지역 이름 · 그 지역 배송비 · 어느 주(州)가 속하는지). 주문이 들어오면 시스템이 매장 주소의 주(州)를 보고 지역을 자동으로 고릅니다 — 구매자가 고르지 않습니다. 무료배송 기준 금액은 판매자당 하나(지금 칸 그대로), 지역에 안 맞는 매장은 지금 쓰는 기본 배송비 그대로입니다. 지역을 안 적은 판매자는 아무것도 달라지지 않습니다.**

### 1. 왜 Fable 이 보는 사안인가
- 파급: 발주 총액(돈)이 바뀌고, 운영 판매자 표 3개에 칸이 하나씩 늘어납니다 — 되돌리기 어려운 쪽.
- 길이 갈림: 「지역을 누가 정하나」에 길이 셋(자동 매칭 / 판매자가 매장마다 지정 / 구매자가 주문 때 선택)이고, 지금까지 두 번(09-25 · 09-28) 「아직 안 한다」로 미뤄 둔 사안이라, 이번엔 모양을 확정해야 합니다.

### 2. Irene 말씀 → 이번에 하는 것
| Irene 원문 | 뜻 | 이번 판정 |
|---|---|---|
| 10-05 「배송은 지역별로 달라야 하는데 왜 지역표시가 그냥 텍스트야? 레스토랑처럼 추가해서 세팅하게」 | 지역이 글이 아니라 **줄(항목)** 이어야 하고, 지역마다 **배송비가 달라야** 한다 | ✅ 판매자 설정에 「배송 지역」 줄 추가 — 레스토랑 모바일오더의 「Add Delivery Zone」 과 같은 생김새 |
| 09-28 「주문하는 사람이 설정한 거랑 매칭만 하는 건데」 | 구매자가 이미 적어 둔 것(= 매장 주소)과 맞춰 보기만 하면 된다 | ✅ 매장 주소의 **주(州)** 로 자동 매칭. 구매자가 매번 고르지 않음 |
| 09-28 「지역마다 고정배송비 … 무료배송 금액만 고정하고」 | 지역별 고정 배송비 + 무료배송 기준은 하나 | ✅ 그대로. 지역마다 배송비 한 칸, 무료 기준은 판매자당 하나(지금 칸) |
| 09-28 「어떤 가격 조치도 필요없지 … 그냥 배송 가능지역이니까」 | 배송비 0 인 지역도 있을 수 있다 | ✅ 지역 배송비 0 = 그 지역은 무료배송 |

### 3. 결정 — 갈림마다 답
1. **지역을 누가 정하나 → 시스템이 매장 주소로 자동.** 판매자는 지역을 만들 때 「이 지역엔 어느 주(州)가 들어가나」를 고르고(예: Klang Valley = Selangor + Kuala Lumpur + Putrajaya), 주문 때 시스템이 매장 주소의 주(州)를 보고 맞춥니다.
   - 「구매자가 주문 때 선택」은 **세 번째로 기각**합니다 — 제일 싼 지역을 고를 수 있고, 판매자는 「구매자 승인 금액 초과 금지」 잠금 때문에 고쳐 올릴 수 없습니다(09-25·09-28 이유 그대로).
   - 「판매자가 매장마다 지정」은 **대안**으로 남깁니다 — 판매자 손이 매장 수만큼 가고, 화면이 3곳(브랜드 매장 조건·푸드코트 매장 조건·공급업체 계약 조건)에 더 생겨 코드가 두 배입니다. 자동 매칭이 안 맞는 매장이 실제로 생기면 그때 덧붙입니다.
2. **지역 단위 = 주(州).** 말레이시아 13개 주 + 3개 연방직할구(쿠알라룸푸르·푸트라자야·라부안) 목록을 시스템이 갖고, 판매자는 체크로 고릅니다. 시(市)·우편번호 단위는 이번에 안 합니다 — GIT 처럼 「PJ 주변 vs 그 밖」이면 Selangor/KL 수준으로 충분하고, 더 잘게 가르는 판매자가 아직 없습니다.
3. **무료배송 기준은 판매자당 하나**(지금 「무료배송 기준 금액」 칸). 지역별 무료 기준은 두지 않습니다(Irene 09-28 말씀 그대로).
4. **안 맞는 매장은 기본 배송비** — 지역에 안 들어가는 매장(주 자체가 안 적혀 있거나, 어느 지역에도 안 속함)은 지금 쓰는 「기준 미만 배송비」 칸 값을 그대로 씁니다. 화면엔 「그 외 지역(기본)」 또는 「매장 주소에 주(州)가 없어 지역을 못 정함」 으로 이유가 보입니다. **주문을 막지는 않습니다.**
5. **같은 주(州)가 두 지역에 동시에 들어갈 수 없습니다**(저장 때 거절). 그래야 답이 하나로 정해집니다.
6. **외부 공급업체(매장이 직접 등록한 업체)에는 지역 설정을 안 둡니다** — 사는 매장이 하나뿐이라 지역을 나눌 뜻이 없습니다. 지금처럼 배송비 한 칸.
7. **지금 있는 「배송 가능 지역」 글 칸은 「배송 안내 메모」로 이름만 바꿉니다**(요일·시간 같은 안내용). 지역은 이제 줄로 적으니 글 칸이 지역을 겸하지 않게 합니다. 적어 둔 글은 지워지지 않습니다.
8. **지역 배송비도 판매자 확인 때 동결** — 지금 규칙(판매자 확인 전엔 다시 계산, 확인 후 고정) 그대로. 판매자가 나중에 지역이나 금액을 바꿔도 이미 확인한 주문은 안 움직입니다.
9. **레스토랑 모바일오더의 배달 지역은 그대로 두고 빌려 쓰지 않습니다**(그건 매장이 손님에게 파는 쪽, 이건 매장이 사는 쪽 — 09-25 판정 유지). 생김새만 같게 합니다.

### 4. 지금 자료 상태 — 알고 계셔야 할 것
- 개발서버 매장 33곳 중 **주(州)가 적힌 곳 9곳**(그중 쿠알라룸푸르가 「WP」「Wilayah Persekutuan」「WP Kuala Lumpur」「Kuala Lumpur」 네 가지로 적혀 있음). 우편번호 적힌 곳 9곳.
  → 시스템이 네 가지 표기를 같은 것으로 읽게 하고, 주가 비어 있으면 우편번호(앞 두 자리로 주가 정해짐)로 대신 알아냅니다. 그래도 모르면 「기본 배송비」(= 지금과 동일).
  → **주소가 비어 있는 매장은 지역 배송비가 자동으로 붙지 않습니다.** 매장 주소에 주(州)를 적는 것이 운영 일이며, 주소 입력칸의 추천 목록에 16개 주 이름을 넣어 바른 표기로 적히게 합니다.
- 운영 실거래 판매자는 GIT(브랜드) 하나, 사는 매장은 with MIN · K-DINE(PJ 주변). 두 매장 주소에 주가 적혀 있는지는 확인 못 했습니다(운영 조회 안 함). 비어 있으면 배포 뒤에도 지금 값(300 이상 무료 · 미만 10) 그대로 돕니다 = 회귀 없음.

### 5. Irene 이 보게 되는 화면
- **판매자(브랜드·푸드코트·가입 공급업체) 설정 → 배송 조건 카드**: 지금의 두 칸(무료배송 기준 · 기준 미만 배송비) 아래에 「배송 지역」 목록. 줄마다 「지역 이름 · 배송비 · 포함되는 주(체크)」, 「+ 지역 추가」 버튼. 맨 아래 자동으로 「그 외 지역 → 기본 배송비 RM 10.00」 한 줄. 미리보기 문장이 지역별로 바뀝니다.
- **매장 발주 담기 화면**: 판매자 묶음마다 배송비 줄 옆에 지역 이름이 붙습니다 — 「배송비 RM 10.00 · Klang Valley」 / 「RM 300 이상 무료」 / 「그 외 지역(기본) RM 15.00」 / 「매장 주소에 주(州)가 없어 기본 배송비 적용」.
- **발주 상세·발주서(PDF)·청구서**: 배송비 줄은 지금과 같고, 상세의 근거 줄에 지역 이름이 더 보입니다.

### 6. Irene 컨펌 요청 (Fable 권고 첨부)
1. **지역은 시스템이 매장 주소로 자동 판정 (구매자 선택 없음)** — Fable 권고: **이대로.** 대안 「판매자가 매장마다 지정」은 안 맞는 매장이 실제로 나오면 그때 덧붙임. 「구매자 선택」은 권고하지 않음(가격 조작 길).
2. **지금 구현할지** — 10-05 말씀은 「나중에」였고 작업기록 지시는 「설계부터」입니다. Fable 권고: **지금 개발서버에 구현.** 지역을 안 적은 판매자는 동작이 0 바뀌므로 다음 배포 묶음에 실어도 안전하고, 배포는 Irene `/배포` 때만.
3. (결정 사항 — 다른 뜻이면 한 줄만) 지역 단위 = 주(州) / 무료 기준은 판매자당 하나 / 외부 공급업체 제외 / 「배송 가능 지역」 글 칸 → 「배송 안내 메모」 이름 변경.

### 7. 배포 뒤 운영 일 (Irene 지시 뒤에만)
- with MIN · K-DINE 매장 주소의 주(州)를 채움(Selangor 또는 Kuala Lumpur) — 팀원이 채우고 사후 조회 첨부.
- GIT 브랜드 설정에서 Irene 이 지역을 추가(예: Klang Valley = Selangor·Kuala Lumpur·Putrajaya → RM 10). 안 추가하면 지금과 똑같이 돕니다.

---

## Ⅱ. 팀원 실행 지시 (구현 범위 · 순서 고정)

### R0. 구조 문서 먼저
`docs/TRADE_STRUCTURE.md` ⑦ §5(b) 아래에 «2026-10-07 Fable: 지역별 배송비 = 판매자 3종 `delivery_zones` JSON · 매칭은 구매자 주소 state(별칭 정규화·우편번호 폴백) · 미매칭은 `delivery_fee` 폴백 · 무료 기준은 판매자당 하나 · 계산은 여전히 `computeDeliveryFee` 한 곳» 블록 추가. 코드보다 먼저.

### R1. 그릇 — 컬럼 1개 × 판매자 모델 3개 (새 표 없음)
- `models/Brand.js` · `models/Foodcourt.js` · `models/SupplierCompany.js` 에 **같은 이름** `delivery_zones: { type: JSON, allowNull: true }`.
  주석: «배송 지역 목록 [{id, name, fee, states[], description?}] · 매칭은 utils/deliveryZones.js 한 곳 · null/[] = 지역 없음(기본 배송비만)».
- `sync-database.js` 로 컬럼 추가(ENUM 없음·백필 없음·마이그 스크립트 불필요). 운영 배포는 Irene `/배포` 때.
- `utils/brandAccountSettings.js` `ACCOUNT_LEVEL_FIELDS` 에 `'delivery_zones'` 추가(계정 하나 = 같은 주인 브랜드 전부 같은 값). **`sameValue` 가 JSON(객체)을 비교하는지 실측** — 문자열/숫자만 비교하면 안정 직렬화(`JSON.stringify` 정렬) 로 비교하게 그 함수 안에서 고친다. 고장주입: 두 브랜드 중 하나만 바꾼 뒤 `findDrift` 가 잡는지.

### R2. 지역 해석 — 새 유틸 1개 (순수 함수 · DB 안 읽음)
`dev-backend/utils/deliveryZones.js` 에 네 가지, 전부 순수 함수:
1. `MY_STATES` — 16개 정본 `[{code, name}]`: Johor · Kedah · Kelantan · Melaka · Negeri Sembilan · Pahang · Penang · Perak · Perlis · Sabah · Sarawak · Selangor · Terengganu · Kuala Lumpur · Labuan · Putrajaya. 저장·매칭·화면 전부 이 `name` 문자열을 쓴다(코드 신설해서 두 벌 만들지 말 것).
2. `normalizeState(raw, {postal_code, country})` → 정본 name 또는 null.
   - 별칭(대소문자·공백·마침표 무시): `WP Kuala Lumpur`·`W.P. Kuala Lumpur`·`Wilayah Persekutuan Kuala Lumpur`·`Federal Territory of Kuala Lumpur`·`KL` → Kuala Lumpur / `Pulau Pinang` → Penang / `Malacca` → Melaka / `N. Sembilan` → Negeri Sembilan / `WP Putrajaya`→Putrajaya / `WP Labuan`→Labuan.
   - **`WP`·`Wilayah Persekutuan` 단독은 모호**(KL/푸트라자야/라부안) → state 로는 null, 우편번호로 넘긴다.
   - state 가 null 이면 `postal_code` 앞 두 자리로: 01–02 Perlis · 05–09 Kedah · 10–14 Penang · 15–18 Kelantan · 20–24 Terengganu · 25–28·39·49·69 Pahang · 30–36 Perak · 40–48·63–64·68 Selangor · 50–60 KL · 62 Putrajaya · 70–73 Negeri Sembilan · 75–78 Melaka · 79–86 Johor · 87 Labuan · 88–91 Sabah · 93–98 Sarawak. **구현 전 Pos Malaysia 공식 범위와 대조해 파일 머리에 출처·날짜를 적는다.** 자유 텍스트 `address` 줄에서 숫자를 긁어내지 않는다(이번 범위 밖 — 필요해지면 별도).
   - `country` 가 MY 가 아니면 별칭·우편번호 없이 `normalizePlaceName` 수준(공백 정리·대소문자 무시)으로만 비교.
   - 반환에 `matched_by: 'state' | 'postal_code' | null` 포함.
3. `normalizeZonesForSave(input)` → `{zones, error}` — 저장 라우트 3곳이 같은 규칙:
   배열 아니면 거절 · 최대 20개 · `name` 필수(sanitize·60자) · `fee` 숫자 ≥ 0(2자리 반올림) · `states` 는 정본 name 만(모르는 값 거절) · 빈 states 거절 · **같은 state 가 두 지역에 있으면 400 `ZONE_STATE_DUPLICATE`** · `id` 없으면 `zone-<ts>-<i>` 부여 · `description` 선택 200자 · `[]`/null → null.
4. `resolveDeliveryZone(zones, buyerLocation)` → `{zone: {id,name,fee} | null, reason: 'no_zones' | 'buyer_location_unknown' | 'no_match' | null, buyer_state, matched_by}`.

### R3. 계산 — `utils/purchaseOrderTotals.js` (돈 공식 · 게이트 대상)
- **`computeDeliveryFee` 본문 무접촉.** 지역은 «유효 배송비»를 정해 주는 전처리다.
- `computeTotalsWithDelivery(items, seller, opts)` 에 `opts.buyer = { entity_type, entity_id }` 추가. 없으면 `seller.entity_type/entity_id`(po 객체가 넘어오는 6곳) 에서 읽는다. 구매자 행(restaurant/brand/foodcourt 전부 `state·postal_code·country` 보유)을 attributes 3개만으로 읽어 `normalizeState` → `resolveDeliveryZone(row.delivery_zones, …)`.
- 유효 terms = `{ ...row, delivery_fee: zone ? zone.fee : row.delivery_fee }` 로 `computeDeliveryFee` 호출. basis 에 `zone`(id·name·fee 또는 null) · `zone_reason` · `buyer_state` · `matched_by` 를 **덧붙인다**(기존 키·rule 값은 그대로 — 프론트 `DeliveryRule` 타입 불변).
- 구매자 조회 실패는 배송비 조회 실패와 같은 태도: 막지 않고 `zone_reason: 'buyer_lookup_failed'`.
- 호출 7곳: `purchase-orders-crud.js:1041` 만 `{seller_type, seller_entity_id}` 를 넘기므로 `opts.buyer = { entity_type: buyerEntity.type, entity_id: buyerEntity.id }` 추가. 나머지 6곳(`crud 1130·1365` / `seller-orders 1286` / `workflow 522·1500·1554`)은 po 객체가 가니 무변경이어야 한다 — 실측으로 확인.
- **제출 때 1회 재계산 추가**: `purchase-orders-workflow.js:925 POST /:id/submit` 은 지금 총액을 다시 안 센다. 매장이 주소를 고친 뒤 제출하면 지역이 반영돼야 하므로 제출 트랜잭션 안에서 `computeTotalsWithDelivery` 1회 → `delivery_fee·delivery_fee_basis·total_amount` 갱신(subtotal 은 품목 불변이라 같아야 함 — 같지 않으면 버그, 테스트로 잠근다). 판매자 확인 후 동결 규칙은 그대로.
- `retroApplyPrice`·청구서 `additional_charges 'Delivery'`·신용한도·PDF 는 `delivery_fee` 값만 읽으므로 무변경. 변경이 필요해 보이면 멈추고 보고.

### R4. 단일 소스 전달 — `utils/sellerNames.js`
- `resolveSellers` attributes 에 `'delivery_zones'` 추가, map 값에 `delivery_zones: Array.isArray(row.delivery_zones) ? row.delivery_zones : null`. 별도 조회 금지.
- `routes/restaurants-ingredients.js:185~` 판매자 조건 옆에 `seller_delivery_zone`(이 매장에 대해 `resolveDeliveryZone` 한 결과 `{id,name,fee}` 또는 null) · `seller_delivery_zone_reason`. 구매자 = 그 라우트의 매장(이미 안다). 브랜드가 구매자인 담기 경로가 따로 있으면(실측) 같은 패턴.

### R5. 판매자 쓰기 라우트 — 3곳 수용 · 1곳 제외
- `routes/brands-core.js:726 PUT /:id/payment-settings` · `routes/foodcourts-core.js:588 PUT` · `routes/supplier.js:61 ALLOWED + :393~` — `delivery_zones` 를 `normalizeZonesForSave` 로 받고, GET(`brands-core 686` · `foodcourts-core 553` · `supplier.js GET /company`) 응답에 포함. 브랜드는 `brandAccountSettings` 경유(계정 전파).
- `routes/supplier-directory.js:1116` 외부 공급업체 PUT 은 **받지 않는다**(결정 6). 보내와도 무시하고 400 은 내지 않는다.
- `routes/address-suggestions.js:86` — `field=state && country=MY` 일 때 `MY_STATES` 16개 이름을 **앞에** 붙여 돌려준다(기존 DISTINCT 값은 뒤에, 중복 제거). 다른 country·field 무변경.

### R6. 백엔드 검증 (빌드 불필요 · 초 단위)
- `tests/delivery-zones.test.js` 신설: 별칭 4종→KL · `WP` 단독+우편번호 50xxx→KL · `WP` 단독·우편번호 없음→null · 우편번호 47820→Selangor · 중복 state 거절 · 음수 fee 거절 · 모르는 state 거절 · 매칭/미매칭/zones 없음 세 reason.
- `tests/purchase-order-totals.test.js` 기존 12건 그대로 + 지역 케이스: zone fee 10·기본 15·기준 300 — Selangor 매장 subtotal 250 → 260 / 300 → 300 / 주 없는 매장 250 → 265 / zones 있고 delivery_fee null·미매칭 → 0·rule unset·zone_reason no_match.
- 실호출(데모 38·dev 브랜드): PUT zones 저장 → GET 그대로 / 중복 state 400 / 담기 목록 API 에 `seller_delivery_zone` / 발주 생성 → `delivery_fee_basis.zone.name` / 매장 state 비움 → 재계산 시 기본 배송비 + reason / 제출 때 재계산 반영 / 판매자 확인 후 zones 변경 → 총액 불변.
- 고장주입 3건: ① `resolveDeliveryZone` 결과를 무시하게 바꾸면 지역 테스트가 잡는다 ② submit 재계산을 빼면 «주소 고친 뒤 제출» 테스트가 잡는다 ③ 중복 state 검사를 빼면 400 테스트가 잡는다.

### F1~F4. 프론트 (코드 전부 확정 → `i18n:verify` → SW bump → `build:dev` 1회 → `verify-all --full` 1회)
- **용어**: `glossary.json` 에 «Delivery zone» 먼저 추가, 4개 언어 키 동시. 화면 단어는 «배송 지역» 하나.
- **F1 판매자 설정 3곳** — `BrandPaymentSettingsPage.tsx:656~710` · `FoodcourtPaymentSettingsPage.tsx` 같은 카드 · `SupplierCompanyInfoPage.tsx:444~463`: 두 칸 아래 «배송 지역» 목록. 줄 = 이름(Input) · 배송비(숫자) · 포함 주(16개 체크, 다른 지역이 이미 가진 주는 비활성+툴팁) · 설명(선택) · 삭제(IconButton). «+ 지역 추가» 버튼은 `SettingsPage.tsx:5620` 의 «Add Delivery Zone» 과 같은 생김새이되 **공용 Button**(새 styled 금지). 맨 아래 읽기 전용 한 줄 «그 외 지역 → 기본 배송비 …»(delivery_fee null 이면 «미설정»). 저장은 **같은 PUT** 한 번에. `delivery_policy` 라벨·placeholder → «배송 안내 메모 (요일·시간 등)» / 값 무변경.
- **F2 `DeliveryTermsText`** — props 에 `zoneName?: string | null` 선택 추가: 있으면 문장 뒤 « · {zoneName}», 없으면 지금 문장 그대로. 분기 추가 금지.
- **F3 담기 화면 `NewPurchaseOrderPage.tsx:1929~1940`** — `g.terms.delivery_fee = seller_delivery_zone ? seller_delivery_zone.fee : seller_delivery_fee`, `g.zone_name`·`g.zone_reason` 보관. `computeDeliveryFee`·`deliveryFee.ts` **무접촉**. 배송비 줄에 지역 이름, reason 이 `buyer_location_unknown` 이면 11px 회색 한 줄 «매장 주소에 주(State)가 없어 기본 배송비가 적용됩니다» (settings 링크). `:2608` «Delivery areas» 줄 → «배송 안내 메모» 라벨.
- **F4 `PurchaseOrderDetailPage.tsx:127·718`** — basis 타입에 `zone?` 추가, 근거 줄에 지역 이름. 그 외 목록·PDF·ReceivePay 무변경(배송비 값 동일).
- 검증: 실브라우저 BG 설정에서 지역 2개 추가·중복 주 막힘·저장·새로고침 유지 / RA 담기 화면 지역 이름 줄 / mount sweep 1회.

### 문서·기록 (게이트 마커 전에)
`docs/TRADE_STRUCTURE.md` ⑦(R0) · `docs/PURCHASE_ORDER_SYSTEM.md` §2 배송비 문단에 지역 한 줄 · 메모리 갱신은 게이트 뒤.

### 하지 말 것
- 🔒 인쇄 보호파일 8개·KDS 무접촉. `utils/orderTotals.js` 무접촉. `computeDeliveryFee` 본문·`deliveryFee.ts` 계산 무접촉.
- 새 표·pair 단위 지역 지정·구매자 지역 선택 UI·자유 텍스트 주소 파싱·시/우편번호 단위 지역·지역별 무료 기준 — 전부 0줄.
- 모바일오더 `deliveryPricing.zones` 코드 재사용·공유 금지(생김새만 같게).
- 운영 배포·운영 쓰기 금지(Irene `/배포`·지시 뒤). 매장 state 자료 정리 스크립트도 이번엔 안 만든다(별칭 정규화가 대신한다).

### 게이트 2회차에서 볼 것 (미리 정함)
1. diff 가 위 범위 밖 0건 · `check-sensitive-diff` 가 `purchaseOrderTotals` 를 찍는 것 확인(찍혀야 정상).
2. R6 테스트·실호출·고장주입 3/3 결과 원문.
3. 판매자 확인 후 동결 증명(zones 변경 → 확인된 발주 총액 불변) · 제출 재계산 증명.
4. `verify-all --full` 통과 · 기존 12건 불변 · i18n 4개 언어.
5. 운영 회귀 0 논증: zones 비어 있으면 `resolveDeliveryZone → no_zones` 로 유효 배송비 = 기존 `delivery_fee` — 테스트 1건으로 박아 둘 것.

---

## Ⅲ. Irene 컨펌
위 Ⅰ-6 의 1·2 두 가지(자동 판정 · 지금 구현). 3 은 결정 사항이라 다른 뜻일 때만 한 줄. 둘 다 「그대로」면 팀원은 R0 부터 시작한다.
