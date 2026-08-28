# 재고 장부 정렬 + 일괄 링크 도구 — 설계

> 상태: **1단계(기능 정의) 초안 — Fable 판정 대기 / Irene 승인 전.** 코드 변경 0.
> 작성 2026-08-28. 판정 주체 = Fable. 실행 = Opus.
> 관련 문서(중복 금지, 각각 다른 주제):
> - `STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md` — 이름/코드 표기 분리 (표시 규칙)
> - `BRAND_STOCK_SHARING_DESIGN.md` — 브랜드→매장 공유 권한 모델
> - `PURCHASE_ORDER_SYSTEM.md` — 발주 파이프라인
> 이 문서 주제 = **두 재고 목록의 정렬(이관)과 일괄 링크 도구**. 위 세 문서와 주제가 겹치지 않는다.

---

## 0. 이 작업의 출발점 (Irene 원문 · 2026-08-28)

> "git consulting에 있는 재고아이템이랑 공급업체 및 상품이 with min에도 있어야 해. 그거 위드민에도 가져와야 해.
> 기존에 위드민에 있는 거 레시피랑 연결된 거 파악해서 같은 거면 맞춰주고 발주할 수 있게 해줘.
> 그리고 git consulting 에서 판매하는 상품은 재고로 넣으면 안되지. 그대로 git consulting에 발주할 수 있어야 해.
> 그런데 이런 거 등록할 때 대량으로 할 수가 없어서 너무 불편해. 레시피 재고 업체상품도 한번에 링크걸 수 있기를 받고 싶어."

> "위드민은 with MIN 브랜드야. K-DINE with min 아닌데."

---

## 1. 정체 (운영 실측으로 확정 · 읽기 전용 조회)

| Irene 호칭 | 실체 |
|---|---|
| **깃컨설팅** | **브랜드 회사(Brand General 작업공간)**. `users.id=23`(role Brand General) / `brands.id=1` 의 `company_name` = "GIT Consulting" |
| **위드민** | **그 브랜드의 매장** `restaurants.id=10` "with MIN Cafe" (`brand_id=1`) |
| K-DINE with MIN | `brands.id=2`. 같은 owner(user 23) 의 **형제 브랜드**. Irene 이 "위드민 아님"이라 명시 — **대상 아님** |

> 호칭 정정 2026-08-28 (Irene): "깃컨설팅은 브랜드컴퍼니야. 브랜드제너럴이잖아. 위드민은 위드민 브랜드의 레스토랑이잖아."
> **호칭의 정정이지 구조의 정정이 아니다** — 실측 행(user 23 / brand 1 / restaurant 10)은 동일하다(Fable 판정).

**→ 두 회사가 아니라 한 소유자의 한 살림.** 이 사실이 설계를 크게 단순화한다(§4).

**이관 목적지 = brand 1 장부 (Fable 결정, 변경 없음).**
매장에 직접 넣지 않는다. 브랜드 장부는 소속 매장이 **공유받아 보고 발주·입고하는** 구조(기확립 표준,
`utils/brandStockAccess.js`)라서 brand 1 에 넣으면 **위드민 매장 화면에 보이고 발주된다** —
Irene 이 요구한 "위드민에도 있어야"가 그대로 충족된다.
매장에 직접 넣으면 행이 매장별로 복제되고, 이름 겹침 62건이 있는 brand 1 기존 재료와도 어긋난다.

## 2. 실측 물량 (운영, 2026-08-28)

| 대상 | 건수 | 공급처 연결 | 레시피 연결 |
|---|---|---|---|
| BG Stock Items (`product_ingredients`, owner_user_id=23) | **288** | **285** | — |
| 브랜드 with MIN 재료 (`ingredients` brand_id=1) | 89 | **0** | **0** |
| with MIN Cafe 재료 (`ingredients` restaurant_id=10) | 68 | 66 | **0** |
| K-DINE 브랜드 재료 (`ingredients` brand_id=2) | 146 | — | 267링크 / 재료 53 |
| BG 판매상품 (`brand_products`, owner_user_id=23) | 90 (active 86) | — | — |
| 공급업체 계약 (`supplier_contracts` brand 1) | 26 (active **24**) | — | — |
| with MIN Cafe 레시피 | **126** | — | **재료 링크 0** |
| K-DINE 브랜드 레시피 | 42 (재료 있는 것 36) | — | 267링크 |

**이름 겹침 (NFKC + 유니코드 공백 정규화 + trim + 소문자):**
- Stock Items 288 → 목록 내부 중복 **0**, 브랜드 with MIN 재료와 **62개 일치**, with MIN Cafe 재료와 2개 일치
- → **자동 이관 후보 225개 / 화면 확정 대상 63개**
- ⚠ 이 자동/확정 분류는 **§6 정규화 규칙**을 따른다. 위 63 은 **하한값**이며 규칙 확정 후 **재산출**한다. 정규화를 넓히면 항목이 "겹침(사람 확정)" 쪽으로 이동하므로 안전한 방향이다.
- with MIN Cafe 레시피 126 ↔ K-DINE 레시피 42: **이름 일치 5개뿐**(그 5개가 가진 재료 링크 합계 34)

⚠ 이름 필드에 non-breaking space(U+00A0) 오염이 실재한다. NFKC 정규화 적용 후에도 겹침 수치는 62/2 로 동일했다(정규화가 수치를 바꾸지 않음을 실측으로 확인).

## 3. 진단

문제의 몸통은 "공급업체가 없어서"가 아니라 **연결이 안 걸려 있어서**다.
잘 갖춰진 지식(공급처 매핑 285건)은 **BG Stock Items 목록에만** 있고, 레시피가 붙고 매장이 공유받는 **`ingredients` 목록은 비어 있다**.
이것은 기존에 "구조 결정 대기"로 기록해 둔 **재고 목록 이원화 부채**가 사용자 화면에서 드러난 것이다.

## 4. 실측이 없앤 작업 2건

1. **공급업체 신규 계약 불필요** — brand 1 에 active 계약 24건이 이미 있고 매장이 상속한다(`utils/supplierAccess.findEffectiveContract`).
2. **깃컨설팅을 외부 공급업체로 등록할 필요 없음** — restaurant 10 은 `brand_id=1` 이라 brand 판매자 경로로 이미 발주 가능(`verifySellerRelation`).
   → 운영에 남은 `supplier_companies` 36·37 "GIT Consult"(상품 0·연락처 0, 34초 간격 생성)는 **이 잘못된 길의 잔재**다. §7 참조.

---

## 5. 1단계 — 기능 정의

| 항목 | 내용 |
|---|---|
| **기능명** | 재고 장부 정렬(이관) + 재고·업체상품·레시피 일괄 링크 도구 |
| **목적** | 갈라진 두 재고 목록을 브랜드 `ingredients` 단일 장부로 정렬하고, 앞으로 재고·업체상품·레시피 연결을 한 화면에서 일괄 처리한다 |
| **핵심 사용자** | Brand General(user 23) = 주 사용자 / Restaurant Admin(with MIN Cafe) = 결과를 발주로 사용 |
| **성공 기준** | ①브랜드 장부 하나에서 288+89 가 중복 없이 보인다 ②이관된 공급처 연결 285건이 살아 있고 매장이 실제로 발주를 넣는다 — 그리고 **과거 발주 이력이 깨지지 않는다**(재배선은 `ingredient_seller_products` 만, `purchase_order_items.product_ingredient_id` 과거 행은 **무접촉**) ③판매자 상품 N개를 한 번 제출로 연결하고 두 번 눌러도 중복이 없다 ④커버리지 리포트가 미연결 항목을 정확히 집어낸다 ⑤수량·원가가 사람이 정한 값 그대로다(자동 덮어쓰기 0) ⑥**with MIN Cafe(매장) 화면에서 이 항목들이 보이고 실제 발주가 된다** — 검증은 **매장 계정 시점**으로 한다 ⑦**이관은 멱등이고 롤백 경로가 있다** — 재실행해도 중복 0, 되돌리기 절차가 문서에 명시된다 |

### 핵심 유스케이스

1. **모드 1 — Stock Items → 브랜드 재료 이관** (일회성 정렬의 본체)
   **기본 목적지 = brand 1(with MIN) 장부.**
   ⚠ Stock Items 288 은 `owner_user_id=23` 기준이라 brand 1/2 로 갈라져 있지 않다 —
   일부가 실제로는 K-DINE(brand 2) 사업 몫일 수 있다. 따라서 확정 화면에서 **행별 [제외 / 보류]** 가 가능하고,
   **brand 2 몫으로 판단되는 항목은 보류**한다(brand 2 이관은 비범위 유지).
   288개를 [기존에 연결(connect 기본 제안) / 신규 생성 / 제외 / 보류] 로 확정.
   각 행의 공급처 매핑(`ingredient_seller_products`)을 **ingredient 기준으로 복제** — 같은 판매자상품·같은 계약을 가리키므로 발주가 즉시 된다.
2. **모드 2 — 판매자 카탈로그 → 발주 전용 항목**
   깃컨설팅 판매상품 90개를 매장에 connect(기존 재고 있으면) 또는 create(`track_stock:false`, `seller_type='brand'`).
   Irene 확인 사항: "재고에 연결" = 기존 재고 있으면 연결, 없으면 발주 전용 생성.
3. **커버리지 리포트** — 레시피에 쓰이는데 공급처가 없어 발주 못 하는 재료를 화면 상단에 표시.
4. **원가 반영 opt-in** — 공급가를 재고 원가에 반영할지 행마다 선택. **기본 끔**(수동 원가를 동기화가 덮어쓴 기존 사고 패턴 때문).
5. **기연결 표시 · 멱등** — 이미 연결된 행은 "연결됨"으로 표시, 재제출해도 중복 매핑이 안 생긴다.

### 레시피 연결 — 실측으로 범위 축소

with MIN Cafe 레시피 126개 중 K-DINE 레시피와 이름이 겹치는 것은 **5개뿐**(가져올 수 있는 재료 링크 34건).
Fable 이 정한 분기("겹침이 작으면")에 따라 **"대응 레시피에서 재료 구성 복사"는 일괄 액션으로 만들지 않는다.**
→ 커버리지 리포트에 "재료가 안 붙은 레시피"로 **노출만** 하고, 실제 연결은 기존 레시피 편집기에서 한다.
(수량은 도구가 추측할 수 없는 내용 작업이다.)

### 기존 시스템과의 관계

- 정본 경로 `ingredients` + `ingredient_seller_products` 위에만 구축
- 브랜드 공유 규칙(`utils/brandStockAccess.js`) 그대로 — 정의는 브랜드, 발주·입고는 매장
- 발주 라인은 계속 재고아이템 경유(`purchase-orders-crud.js buildOrderPayload` **무접촉**). `track_stock:false` = 발주 전용
- 기존 단건 `from-catalog` 4패밀리(`ingredients.js:202`/`:1086`, `restaurants-ingredients.js:274`, `product-ingredients.js:176`) 로직을 공용 함수로 추출해 재사용

### 비범위 (선 긋기)

- 발주에서 재고아이템 경유를 없애는 구조 변경 — **기각 확정**(돈·주문 무결성)
- `product_ingredients` ↔ `ingredients` **테이블 통합 공사** — 데이터만 옮기고 표는 안 건드림
- **`linked_ingredient_id` 쓰기** — 읽기만 따르고 쓰기는 무시하는 반쪽 구현. 채우면 숫자가 안 움직인다. **무접촉 유지**
- 레시피 재료 구성 일괄 복사(위 실측으로 제외)
- CSV/엑셀 업로드
- 푸드코트(FG)의 같은 어긋남 / K-DINE 브랜드(brand 2) 데이터 이관
- **user 23 은 이관 후 브랜드 장부만 사용하도록 전환**(화면 안내/리다이렉트).
  Stock Items 기능 자체의 전면 쓰기 중단은 **비범위 — 별도 구조 결정**. user 24 등 다른 BG 는 **무접촉**.
  과거 발주 이력의 `product_ingredient_id` 참조는 **보존**

---

## 6. 이름 정규화 규칙 (Fable 확정) — 매칭용과 저장용을 **구분**한다

**매칭(제안)용** — 넓게 잡는다. 확정은 사람이 하므로 오병합 위험 없이 재현율만 오른다.
NFKC 유니코드 정규화(U+00A0 등 비가시 공백·전각 처리) → trim → 내부 연속 공백 1개로 축약 → lowercase.

**저장 데이터용** — 좁게, 그리고 기록을 남긴다.
이관 **대상 행에 한해** 비가시 공백(U+00A0 등)을 일반 공백으로 치환 + trim 하고,
**바뀐 행은 전부 변경 로그로 남긴다.** 대소문자 등 그 외 이름 변경은 **하지 않는다**.

**매칭은 제안까지만. 확정은 사람.** 자동 병합 금지
(운영에 채번 중복 12종이 이미 있어 이름만 믿는 병합은 오병합 위험).
**편집거리·유사도 기반 퍼지 매칭은 v1 자동 분류에 넣지 않는다** — 오병합 위험이 검토 절감보다 크다.
화면의 "제안" 표시도 v1 은 **정확 일치만**. 퍼지는 후속 검토.
겹침 실제 건수는 NFKC 매칭 기준으로 **2단계 설계 때 재집계**한다.

## 7. 전제 조건 · 분리된 별건

**전제 조건 — 실측 결과 이미 해결됨 (2026-08-28 확인, 추가 작업 없음):**
- `purchase_orders.status` ENUM 의 `pending_approval` 값은 **운영에 이미 존재**한다.
  운영 실측: `enum('draft','pending_approval','submitted','confirmed','shipped','in_transit','delivered',
  'partial_received','received','cancelled','closed','delivery_failed')`
- 마이그 `scripts/migrate-po-status-pending-approval.js` 가 **작성돼 있고** `migrations.registry.json` 의
  `deploy`(매 배포 재실행·멱등)에 **등록돼 있으며**, 운영서버에 파일도 존재한다 → 2026-08-27 배포 때 반영된 것으로 판단.
- 즉 **"마이그 미작성" 기록은 낡은 정보였다.** 이번 작업의 P0 동반 항목에서 **제외**한다.
- (참고: 운영 발주 상태 분포 = draft 3 / submitted 1. `pending_approval` 행은 아직 0건.)

**이 문서에 넣지 않는 별건 (Irene 승인 후 별도 실행):**
- **`supplier_companies` 37 "GIT Consult" 는 고아가 아니다 (2026-08-28 실측으로 판정 수정)** —
  레거시 `suppliers` id=**5**("GIT Consult", 2026-01-13 생성, 회사 행보다 6개월 선행)가 37 을 가리키고,
  그 supplier 를 **재료 12건이 `ingredients.supplier_id` 로 참조**한다. `supplier_companies` 참조 FK 는 0건이라
  **DB 가 막아주지 않는다** — 지우면 조용히 깨진다. 레거시 supplier 정책은 "쓰기 중단 + 자연 이관, 백필 안 함"
  ([[reference_legacy_supplier_writestop_natural_migration]])이므로 **강제 정리 금지**.
  정리하려면 **재료 12건 재지정이 선행 조건**. (36 은 참조 0 이라 2026-08-28 삭제 완료.)
- **원본 유래 중복 19건** — §14-1 목록 참조. 이번 범위 무접촉.
- `supplier_companies` 36·37 "GIT Consult" 고아 행 정리. 정체가 확정된 지금 **이 supplier 행들은 존재 이유가 없다** —
  "깃컨설팅에 발주"는 brand 1 판매자 경로(restaurant 10 의 `brand_id=1` 이라 이미 허용)로 가는 것이지
  자기 자신을 공급업체 회사로 등록하는 게 아니다. 2026-07-05 34초 간격 생성 = 등록 시행착오 잔재로 판단.
  36 은 참조 0 인 완전 고아 → 삭제. 37 은 상품 0·발주 0·연락처 0 에 계약 1건(`supplier_contracts` id=35)뿐 → 계약과 함께 삭제.
  **운영 쓰기이므로 Irene 승인 + `/배포` 절차로만.** 삭제 후 채번 중복 점검 필수.
- **`GET /api/seller-catalog` brand 분기 파라미터 불일치 (잠복 · 호출자 0곳)** —
  `routes/ingredient-seller-products.js:307~` 이 `seller_entity_id` 를 `owner_user_id` 로 해석하는데
  쓰기 경로(`restaurants-ingredients.js` from-catalog)는 같은 값을 **brand id** 로 쓴다.
  `seller_entity_id=1` 로 부르면 0건이 나온다. **현재 프론트 호출자가 0곳이라 발현되지 않는다.**
  최소 범위 원칙에 따라 **이번 작업에서 조용히 고치지 않는다** — 기록만 남긴다.
- **`seller_entity_id`(brand) 의미 불일치 3건 (전부 잠복 · 해당 행 0건 · 미발현)** — §9-0 ① 대조표 참조
  1. **brand buyer 죽은 삼항** `bp.owner_user_id ? bid : bid` — 두 분기가 같다. 동작 등가라 단순화만 허용
  2. **foodcourt buyer 가 user id 를 저장** — 만들어지면 `verifySellerRelation`(brand id 비교)과 어긋나 **발주 불가**
  3. **BG 경로 `Brand.findOne({owner_id})` 비결정** — 정렬 미지정. **user 23 이 정확히 이 케이스**(브랜드 2개 소유:
     brand 1 with MIN / brand 2 K-DINE with MIN) → 판매자가 둘 중 어느 쪽인지 임의로 정해진다.
     ⚠ 다만 **이번 작업이 user 23 을 Stock Items 신규 쓰기에서 브랜드 장부로 전환**시키므로
     유일한 실사용자의 노출 창은 **설계상 닫힌다**(Fable 판단). 지금 고치지 않는다.

## 8. 다음 단계

규모 **"대" 유지, 6단계 전부 수행**(Fable 판정). 신규 테이블이 0개여도
①운영 데이터 마이그레이션(285개 연결 재배선) ②발주 도메인 신규 엔드포인트 ③운영 마이그 동반 배포 —
Fable 게이트 기준 3번(운영 DB 마이그)에 정면으로 걸린다.

3단계(DB)는 "신규 테이블 명세" 대신 **이관 명세** 중심으로 작성한다:
대상 행 · 재배선 규칙 · **멱등 키** · **롤백 절차** · 검증 쿼리.
(단계를 줄이는 게 아니라 내용물을 바꾼다.)

각 단계 산출물은 **Fable 판정 후 Irene 승인**.

---

## 9. 2단계 — API 설계 (초안 · Fable 판정 대기)

### 9-0. 이월 확인 2건 실측 결과 (Fable 지정)

**① `brand_products` 형제 브랜드 판매자 신원 — 쓰기도 4벌이 서로 다르다 (2026-08-28 정정)**

> ⚠ 초판에 "쓰기 경로는 정상, 읽기만 불일치"라고 썼으나 **부정확했다.** 구현 착수 후 실측으로 정정한다.

`seller_type='brand'` 일 때 `seller_entity_id` 에 무엇을 쓰는가 — **패밀리마다 다르다**:

| 경로 | 코드 | 실제 의미 |
|---|---|---|
| brand buyer `ingredients.js:231` | `bp.owner_user_id ? bid : bid` | **양쪽 분기가 같은 값**(죽은 삼항). 항상 구매자 자기 brand id |
| foodcourt buyer `ingredients.js:1113` | `bp.owner_user_id \|\| 0` | **user id** (brand id 아님) |
| restaurant buyer `restaurants-ingredients.js:321` | `rest.brand_id` | **구매자 부모 brand id** ← `verifySellerRelation` 과 일치하는 유일한 경로 |
| BG stock items `product-ingredients.js:212~` | `Brand.findOne({owner_id: bp.owner_user_id}).id` | 상품 소유자의 브랜드 id — **정렬 미지정 `findOne`** |

**운영 데이터는 아직 일관적이다(실측)**: `ingredient_seller_products` 의 brand 행 **19건 전부 brand_id 의미** —
restaurant 10(brand_id=1)→`1` 4건 / restaurant 8(brand_id=2)→`2` 9건 / brand 4→`4` 6건.
**전부 restaurant 경로로 만들어진 것**이고, foodcourt·BG 경로로 만들어진 brand 행은 **0건**이라 불일치가 데이터에 없다.

**처리(Fable 승인)**: `utils/catalogLink.js` 는 **패밀리별 전략 주입**으로 4벌 동작을 **그대로 보존**한다.
하나로 통일하면 foodcourt·BG 동작이 바뀌어 "동작 불변" 위반이다. 통일은 §7 별건.
접근 판정은 `distribution_mode` 별(실측 user 23 의 90개 = `all` 61 / `specific_brands` 29,
`brand_product_brands` 링크 brand 1 = **28**) → restaurant 10 이 담을 수 있는 것 **최대 89/90**.

- **읽기 불일치**: `GET /api/seller-catalog` brand 분기(`ingredient-seller-products.js:307~`)는
  `where={owner_user_id: sellerEntityId}` 로 해석 → `seller_entity_id=1` 이면 0건. **프론트 호출자 0곳.**
  이 도구는 seller-catalog 를 쓰지 않고 전용 preview 를 쓴다. 수정은 **별건**(§7).

**② 동명 레시피 — 실재한다.** restaurant 10 에 이름이 겹치는 레시피 **5쌍 / 10행**
(`jjimdak rice bowl`, `bibimbap`, `jjajang tteokbokki`, `bulgogi`, `gochujang fried chicken drumsticks (4pcs)`).
→ 커버리지 리포트는 **`recipe.id` 기준으로 각각 별개 행**으로 표시한다. 이름 기준 병합·자동 매칭 **금지**(기존 원칙 유지).

### 9-1. 공용화 (신규 코드 아님 — 기존 로직 추출)

기존 단건 from-catalog 4벌(`ingredients.js:202`/`:1086`, `restaurants-ingredients.js:274`, `product-ingredients.js:176`)의
공통부를 **`utils/catalogLink.js`** 로 추출. 기존 4개 라우트는 이 함수를 호출하도록만 바꾼다(**동작 불변**).
- `resolveSellerProduct({ seller_type, product_id, buyerEntity, transaction })` → 신원·접근 판정 + 판매자 식별자 확정
- `linkOrCreateIngredient({ buyerEntity, sellerRef, mode, existing_ingredient_id, unit_conversion, apply_cost, transaction })`
- **멱등 키** = `(ingredient_id, seller_type, seller_entity_id, seller_product_id)` — 기존 unique 조회와 동일

### 9-2. 신규 엔드포인트

모두 `routes/stock-ledger.js` (신규 파일). 공통 게이트: `authenticateToken` + 구매자 스코프 확정(`resolveBuyerEntity`)
+ 쓰기는 **소유자 본인만**(`writableIngredient` 규칙 — 매장이 브랜드 장부에 쓰기 불가).

| # | 엔드포인트 | 역할 | 인증/권한 | 요청 | 응답 | 에러 |
|---|---|---|---|---|---|---|
| 1 | `GET /api/brands/:brandId/stock-ledger/migration-preview` | BG | `authenticateToken` + `isBrandManager` | `?limit&offset&filter=auto\|review\|all` | `{success,data:{items:[{source_id,name,unit,unit_cost,track_stock,seller_sources:[…],match:{type:'exact'\|'none',ingredient_id,ingredient_name,recipe_usage_count}}],summary:{total,auto,review}}}` | 401/403(타 브랜드)/404 |
| 2 | `POST /api/brands/:brandId/stock-ledger/migrate` | BG | 위 + 소유자 | `{decisions:[{source_id,mode:'connect'\|'create'\|'skip'\|'hold',existing_ingredient_id?,apply_cost?:false}], dry_run?:boolean}` | `{success,data:{applied,skipped,held,failed:[{source_id,reason}],batch_id}}` | 400(형식)/403/409(동시 실행) |
| 3 | `GET /api/brands/:brandId/catalog-link/preview`<br>**+ `/api/restaurants/:restaurantId/catalog-link/preview`** | BG / RA | 브랜드=`isBrandManager` · 매장=`checkRestaurantAccess` | `?seller_type&seller_entity_id&search&limit&offset` | 1번과 같은 형태(판매자 카탈로그 기준) | 400(`seller_type`)/403(`NO_ACTIVE_CONTRACT`) |
| 4 | `POST /api/brands/:brandId/catalog-link/bulk`<br>**+ `/api/restaurants/:restaurantId/catalog-link/bulk`** | BG / RA | 위 + 소유자 | `{seller_type,seller_entity_id,items:[{seller_product_id,mode:'connect'\|'create'\|'skip',existing_ingredient_id?,unit_conversion?,apply_cost?:false,track_stock?:false}]}` | `{success,data:{created,connected,skipped,failed:[{seller_product_id,reason}]}}` | 400/403/409 |
| 5 | `GET /api/brands/:brandId/stock-ledger/coverage`<br>**+ `/api/restaurants/:restaurantId/stock-ledger/coverage`** | BG / RA | 위 | (스코프는 경로가 결정 — 쿼리 파라미터 신뢰 안 함) | `{success,data:{unmapped_ingredients:[…],recipes_without_ingredients:[{recipe_id,name}],summary:{…}}}` | 401/403 |

**규칙**
- 응답은 전부 `{ success, data }` / 실패는 `{ success:false, message }` (CLAUDE.md 표준)
- `restaurant_id`·`brand_id` 파라미터를 신뢰하지 않는다 — 스코프는 서버가 확정
- 2·4·6 은 **항목별 트랜잭션 + 부분성공 리포트**. 전체 롤백 아님(한 행 실패가 나머지를 막지 않는다)
- 2·4 는 **멱등** — 같은 입력 재제출 시 `connected` 로 응답, 중복 매핑 생성 0
- `apply_cost` 기본 `false`(원가 자동 덮어쓰기 금지). `track_stock` 기본 `false`(발주 전용)
- 동시 실행 방지: 브랜드당 진행 중 배치 1개(409)

### 9-3. 건드리지 않는 것 (무접촉 확인 대상)

`purchase-orders-crud.js`(발주 라인 계약) / `brandStockAccess.js` / 🔒 인쇄 보호파일 8개 /
`product_ingredients.linked_ingredient_id` 쓰기 / `seller-catalog` 엔드포인트 / `verifySellerRelation`.

### 9-4. 확정 사항 (Fable 판정 2026-08-28)

1. **`batch_id` 저장 = 신규 경량 표 1개** `stock_ledger_batch_items`
   (`batch_id, action, target_table, target_id, payload_before, payload_after, created_at`).
   배치 헤더 표는 만들지 않고 `batch_id` 그룹핑으로 충분. 멱등 재실행·롤백·감사가 이 표 하나로 된다.
   `activity_logs`(로그용·정리 대상) / `import_history`(다른 도메인) 재사용은 **기각**.
   → "신규 모델 0" 관측은 **1개**로 갱신(규모 판정엔 영향 없음).
2. **rollback = API 미노출.** `scripts/rollback-stock-ledger-batch.js`(batch 단위, **dry-run 기본**, 위 표 기반)
   + 문서 절차. 롤백은 예외 복구지 사용자 기능이 아니고, 대량 삭제를 HTTP 로 여는 것은 보안 경계 확장 대비 이득이 없다.
   → 엔드포인트 **6 → 5개**.
3. **모드 2 구매자 = 매장 스코프.** §1 목적지 결정과 충돌 없음 — 역할이 다르다:
   - **모드 1** = 재료 **정의** 이관 → **브랜드 장부**(매장은 공유로 본다)
   - **모드 2** = 매장의 **발주 전용 담기** → **매장 소유 행**. brand 판매자로부터의 구매는 매장 buyer 만 가능한
     기존 규칙 그대로이고, 기존 restaurant from-catalog 경로가 정본이다.
   → 3·4·5 는 매장 스코프로도 연다. 기존 4패밀리처럼 **얇은 래퍼 + 공용 `utils/catalogLink.js`**,
     인증은 기존 미들웨어(`checkRestaurantAccess`) 그대로.
4. **담기 불가 항목을 숨기지 않는다.** `specific_brands` 상품 중 brand 1 링크가 없는 **1건**은
   preview 에서 **"담기 불가 — 배포 링크 없음"** 사유와 함께 표시한다.
   90개 중 89개가 담긴다는 사실이 화면에서 설명돼야 한다. 조용히 빼지 말 것.
5. **`seller-catalog` 잠복 결함은 §7 별건 기록만.** 이번 작업에서 고치지 않는다.

---

## 10. 3단계 — 이관 명세 (초안 · Fable 판정 대기)

> 이 단계는 "스키마 설계"가 아니라 **데이터 이동 설계**다(Fable 판정 §8).
> 이 작업의 위험 본체는 화면이 아니라 **운영 데이터 재배선 285건**이다.

### 10-1. 신규 표 1개

`stock_ledger_batch_items` — 이관·일괄링크의 **모든 쓰기 1건 = 1행**.

| 컬럼 | 타입 | null | 설명 |
|---|---|---|---|
| `id` | INT PK AI | NO | |
| `batch_id` | CHAR(36) | NO | UUID. 한 번의 제출 = 한 batch. **헤더 표 없음** |
| `entity_type` | ENUM('brand','restaurant','foodcourt') | NO | 구매자 스코프(서버 확정). ⚠ **v1 코드는 `foodcourt` 값을 절대 쓰지 않는다(쓰기 경로 없음)** — 나중에 ENUM 을 늘리면 운영 ALTER 가 한 번 더 필요하므로 값만 미리 둔다 |
| `entity_id` | INT | NO | |
| `action` | ENUM('create_ingredient','link_seller','update_cost','skip','hold') | NO | |
| `target_table` | VARCHAR(64) | NO | `ingredients` / `ingredient_seller_products` |
| `target_id` | INT | YES | 생성·수정된 행 id. skip/hold 면 NULL |
| `source_ref` | VARCHAR(64) | YES | `product_ingredient:288` / `supplier_product:41` 등 출처 |
| `payload_before` | JSON | YES | 수정 전(신규 생성이면 NULL) |
| `payload_after` | JSON | YES | 수정 후 |
| `status` | ENUM('applied','failed','reverted') | NO | 기본 `applied` |
| `error` | VARCHAR(255) | YES | 실패 사유 |
| `created_by_user_id` | INT | NO | |
| `created_at` | DATETIME | NO | |

**인덱스**: `(batch_id)`, `(entity_type, entity_id, created_at)`, `(target_table, target_id)`.
MySQL 64-key 한도 여유 — 3개만. **soft delete 없음**(이력 표라 지우지 않는다).
**마이그**: 신규 표 1개라 `sync-database.js` 로 생성되나, **멱등 `scripts/migrate-stock-ledger-batch-items.js` 를
별도 작성 + `migrations.registry.json` 의 `deploy` 에 등록**한다
([[reference_deploy_schema_drift]]: sync 는 스키마를 만드는 단일 경로가 아니다).

### 10-2. 대상 행

| 소스 | 건수 | 목적지 | 기본 판정 |
|---|---|---|---|
| `product_ingredients` (owner_user_id=23) | 288 | `ingredients` (owner_type='brand', brand_id=1) | 이름 정확 일치 → `connect` 제안 / 무일치 → `create` 제안 |
| ↳ 그중 brand 1 재료와 이름 일치 | 62 | | `connect` (기존 행에 매핑만 추가) |
| ↳ 무일치 | 225 | | `create` (신규 ingredient) |
| `ingredient_seller_products` (product_ingredient_id 경유) | 305 | 같은 표, `ingredient_id` 경유로 **복제** | 재배선 본체 |
| `brand_products` (owner_user_id=23) | 90 (담기 가능 89) | `ingredients` (restaurant 10) | 모드 2, `track_stock:false` |

⚠ Stock Items 288 은 `owner_user_id` 기준이라 brand 1/2 로 안 갈린다. **brand 2 몫 판단 항목은 `hold`.**

### 10-3. 재배선 규칙

원본 `ingredient_seller_products` 행(`product_ingredient_id=P`)에 대해:

```
새 행 = {
  ingredient_id: <이관된 ingredient id>,   // product_ingredient_id 는 NULL
  seller_type, seller_entity_id, seller_product_id,  // 원본 그대로 (판매자 신원 불변)
  unit_price, unit_conversion, min_order_quantity, lead_time_days,  // 원본 그대로
  is_preferred: 대상 ingredient 에 활성 매핑이 없으면 true, 있으면 false,
  is_active: true
}
```

- **원본 행은 지우지 않는다.** 과거 발주(`purchase_order_items.product_ingredient_id`) 조회가 깨지면 안 된다.
- `unit_cost` 는 **덮어쓰지 않는다**(`apply_cost=true` 로 명시 선택한 행만).
- `track_stock`: `connect` 는 대상 ingredient 값 유지 / `create` 는 **false**.
- `linked_ingredient_id` **쓰기 금지**(반쪽 구현 — 채우면 숫자가 안 움직인다).

### 10-4. 멱등 키

`(ingredient_id, seller_type, seller_entity_id, seller_product_id)`.
INSERT 전 이 조합으로 활성 행을 조회해 있으면 **생성 없이 `connected`** 로 리포트.
`ingredients` 생성의 멱등 키는 `(owner_type, owner_id, 정규화된 name)` — 같은 이름 재생성 방지.

### 10-5. 롤백 절차

`node scripts/rollback-stock-ledger-batch.js --batch=<uuid> [--apply]`
1. `--apply` 없으면 **dry-run**(무엇을 되돌릴지 출력만) — 기본값
2. `stock_ledger_batch_items` 를 `created_at` **역순**으로 읽음
3. `action='link_seller'` → 그 `target_id` 의 `ingredient_seller_products` 행 삭제
4. `action='create_ingredient'` → 그 ingredient 가 **다른 곳에서 참조되지 않을 때만** 삭제
   (`recipe_ingredients` / `purchase_order_items` / 다른 배치의 매핑 → 하나라도 있으면 **skip** 후 사유 보고)
5. `action='update_cost'` → `payload_before` 로 복원
6. 되돌린 행은 `status='reverted'` 로 표시(행 자체는 안 지운다)

### 10-6. 검증 쿼리 (배포 후 실행)

```sql
-- ① 재배선 누락 0: 이관된 ingredient 중 매핑이 없는 것
SELECT COUNT(*) FROM ingredients i
 WHERE i.owner_type='brand' AND i.brand_id=1
   AND i.id IN (SELECT target_id FROM stock_ledger_batch_items
                WHERE batch_id=? AND action='create_ingredient')
   AND NOT EXISTS (SELECT 1 FROM ingredient_seller_products s
                   WHERE s.ingredient_id=i.id AND s.is_active=1);
-- ② 중복 매핑 0 (멱등 증명)
SELECT ingredient_id,seller_type,seller_entity_id,seller_product_id,COUNT(*) c
  FROM ingredient_seller_products WHERE is_active=1
 GROUP BY 1,2,3,4 HAVING c>1;
-- ③ 과거 발주 이력 무손상
SELECT COUNT(*) FROM purchase_order_items poi
 WHERE poi.product_ingredient_id IS NOT NULL
   AND NOT EXISTS (SELECT 1 FROM product_ingredients p WHERE p.id=poi.product_ingredient_id);
-- ④ 원가 무단 변경 0
SELECT COUNT(*) FROM stock_ledger_batch_items
 WHERE batch_id=? AND action='update_cost';   -- apply_cost 선택분과 일치해야 함
```

**⑤ 발주 화면 이중 노출 0 (매장 계정 시점 실브라우저)**
ISP 원본 행(`product_ingredient_id` 경유)을 **보존한 채** `ingredient_id` 경유 행을 새로 만들므로,
같은 판매자상품이 발주 화면에 **두 번 뜨는지**를 확인해야 한다.
매장(with MIN Cafe) 계정으로 로그인 → 발주 담기 화면 → 같은 판매자상품이 1행만 보이는지 실측으로 **0 을 증명**한다.
(구발주 화면이 `product_ingredient` 매핑을 계속 읽는다면 노출 경로가 두 개가 된다.)

**고장주입(반증) 계획** — 통과만으로는 방어를 증명 못 한다:
① 멱등 키를 일부러 깨고 재제출 → 검증 ②가 **실패해야** 한다
② `linked_ingredient_id` 에 값을 써 보고 가드가 **잡는지**
③ `apply_cost=false` 인데 원가가 바뀌면 검증 ④가 **실패해야** 한다

---

## 11. 4단계 — UI 흐름 (초안 · Fable 판정 대기)

### 11-1. 페이지 1개 · 탭 2개

`pages/StockLedger/StockLedgerLinkPage.tsx` — **일괄 연결**
사이드바: 재고/구매 그룹 아래 "일괄 연결". 라우트 `App.tsx` `React.lazy`.
가드: BG(브랜드 스코프) + RA(매장 스코프). `ProtectedRoute` 역할 가드 + `ROLE_ROUTES` 양쪽 등록
(가드가 두 겹이라 한쪽만 고치면 튕긴다 — [[reference_frontend_route_guard_two_layers]]).

| 탭 | 내용 |
|---|---|
| **① 구매 연결** | 소스 선택(본사 재고아이템 / 판매자 카탈로그) → 행별 [기존에 연결 ▾ / 새로 만들기 / 제외 / 보류] → 한 번에 제출 |
| **② 커버리지** (별도 페이지 아님 — 같은 워크플로우의 보조 시점이라 사이드바 1항목 유지, Fable 확정) | 공급처 없는 재료 · 재료 안 붙은 레시피(`recipe.id` 기준, 동명 5쌍도 각각) 목록 |

### 11-2. 탭 ① 행 구성

각 행: `[체크] 판매품목명 (SKU) | 단위 | 단가 | → 대상: [기존 재고 선택 ▾ / 새로 만들기] | 레시피 사용 N건 | [원가 반영 ☐]`
- **매칭 제안**은 정확 일치만. 제안된 행은 `기존에 연결` 이 **미리 선택**돼 있고 배지 "이름 일치"
- 이미 연결된 행 → 배지 **"연결됨"**, 기본 `제외`, 다시 눌러도 중복 안 생김
- **담기 불가** 행(배포 링크 없음 1건) → 회색 처리 + 사유 표시, **숨기지 않음**
- 상단 요약 바: `총 288 · 자동 225 · 확인 필요 63 · 제외 0 · 담기 불가 1`
- 제출 후 **결과 패널**: 생성 N / 연결 N / 건너뜀 N / 실패 N(행별 사유). 실패만 재시도 가능

### 11-3. 공용 컴포넌트 (신규 styled 금지)

표=`components/UI/DataTable` · 버튼=`components/UI/Button`(async 중복제출 자동잠금) ·
행 액션=`IconButton`(32×32) · 모달=`Modal`/`ConfirmModal` · Select=`SelectComponents` ·
페이지 헤더=`PageComponents` · 빈 상태=`DataTableEmpty`(순수 텍스트).
색: primary `#635BFF` / danger `#EF4444`. **장식 이모지 금지**, 기하 글리프만.
성공 시 `alert`·toast 금지 → 결과 패널 표시 + 목록 리프레시.

### 11-4. 상태·로딩·에러

- 주요 상태: `sourceType`, `sellerRef`, `rows[]`(행별 decision), `summary`, `submitting`, `result`
- 데이터: §9 의 preview 엔드포인트. 288행이라 **서버 페이지네이션**(limit/offset) + 선택 상태는 클라이언트 유지
- 로딩=스켈레톤 / 에러=배너(`NO_ACTIVE_CONTRACT` 는 "계약이 필요합니다" 안내로 번역)
- 제출 중 이탈 방지(`beforeunload`), 409(동시 배치)는 "다른 작업이 진행 중" 배너

### 11-5. i18n

신규 namespace `stockLedger` — **en → ko → zh → ms 4개 언어 전부**.
`public/locales/glossary.json` 에 신규 용어(일괄 연결 / 담기 불가 / 커버리지) 먼저 등재.
모듈 스코프 `t()` 호출 금지(컴포넌트 안에서만).

### 11-6. 반응형

BG/RA 관리 화면이라 데스크톱 우선. 태블릿(9~10인치)에서 가로 스트립이 흔들리지 않게
표는 `overflow-x:auto` 컨테이너 안에 둔다. 모바일 전용 레이아웃은 비범위.

---

## 12. 5단계 — 코드 설계 (초안 · Fable 판정 대기)

### 12-1. 신규 파일

| # | 파일 | 내용 |
|---|---|---|
| 1 | `dev-backend/utils/catalogLink.js` | 기존 from-catalog 4벌의 공통부 추출 — `resolveSellerProduct()` / `linkOrCreateIngredient()`. **동작 불변** |
| 2 | `dev-backend/models/StockLedgerBatchItem.js` | §10-1 표. `models/index.js` export + association(User) |
| 3 | `dev-backend/routes/stock-ledger.js` | §9-2 엔드포인트 5개(브랜드·매장 스코프 각각) |
| 4 | `dev-backend/scripts/migrate-stock-ledger-batch-items.js` | 멱등 표 생성. `process.exit` 필수 |
| 5 | `dev-backend/scripts/rollback-stock-ledger-batch.js` | §10-5. dry-run 기본 |
| 6 | `dev-frontend/src/pages/StockLedger/StockLedgerLinkPage.tsx` | §11. 800줄 넘으면 `LinkTab`/`CoverageTab` 분리 |
| 7 | `dev-frontend/src/interfaces/stockLedger.ts` | 응답 타입 |
| 8 | `dev-frontend/public/locales/{en,ko,zh,ms}/stockLedger.json` | 4개 언어 |

### 12-2. 수정 파일 (절단면 명시 — 이 범위 밖 변경 0)

| 파일 | 절단면 |
|---|---|
| `dev-backend/routes/ingredients.js` (`:202`, `:1086`) | from-catalog 본문을 `catalogLink` 호출로 치환. **입출력 계약 불변** |
| `dev-backend/routes/restaurants-ingredients.js` (`:274`) | 위와 동일 |
| `dev-backend/routes/product-ingredients.js` (`:176`) | 위와 동일 |
| `dev-backend/models/index.js` | `StockLedgerBatchItem` export + association 추가 **1곳** |
| `dev-backend/server.js` (`:361~`, `:523~` 부근) | `stockLedgerRouter` require + `app.use('/api', ...)` **2줄**. 마운트 순서는 기존 `/api` 라우터 뒤 |
| `dev-backend/scripts/migrations.registry.json` | `deploy` 배열에 4번 스크립트 **1줄** |
| `dev-frontend/src/App.tsx` | `React.lazy` import + `<Route>` + **`ROLE_ROUTES` 등록** |
| `dev-frontend/src/contexts/AuthContext.tsx` | `ROLE_ROUTES` 두 번째 겹 등록 — **가드가 두 겹이라 한쪽만 고치면 튕긴다** |
| `dev-frontend/src/components/Layout/MainLayout.tsx` | BG·RA 사이드바에 "일괄 연결" **1항목**. 기존 재고/구매 그룹(`:1667~`, `:1957~` 부근) 안 |
| `dev-frontend/public/locales/glossary.json` | 신규 용어 3개 |

### 12-3. 절대 무접촉 (경로 명시 — 지문 검사 대상)

🔒 **인쇄 보호파일 8개**
`dev-frontend/src/utils/billPrint.js` · `dev-frontend/src/hooks/useAutoPrintPoller.ts` ·
`dev-frontend/src/components/Layout/MainLayout.tsx` 의 `_printPollFn` 블록 ·
`dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx` ·
`dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` ·
`dev-backend/routes/orders-crud.js` · `dev-backend/utils/stationEnrichment.js` · `dev-backend/utils/orderTotals.js`

> ⚠ `MainLayout.tsx` 는 **보호파일이자 수정 대상**이다. 사이드바 1항목 추가는 `_printPollFn` 과 무관하지만
> `check-print-guard.js` 지문이 뜬다 → **diff 를 Fable 에 제시하고 `--bless` 는 판정 후에만.**

그 외 무접촉: `dev-backend/routes/purchase-orders-crud.js`(발주 라인 계약) ·
`dev-backend/utils/brandStockAccess.js` · `dev-backend/utils/supplierAccess.js` ·
`dev-backend/routes/ingredient-seller-products.js`(seller-catalog 잠복 결함 — §7 별건) ·
`product_ingredients.linked_ingredient_id` 쓰기 경로.

### 12-4. 구현 순서

5-1 모델 → 5-2 마이그 스크립트 실행(dev) → 5-3 `catalogLink.js` 추출 + 기존 4라우트 치환 →
**여기서 기존 from-catalog 회귀 테스트 먼저**(동작 불변 증명) → 5-4 `stock-ledger.js` →
5-5 server.js 마운트 → 5-6 프론트 인터페이스 → 5-7 페이지 → 5-8 사이드바 → 5-9 App.tsx + ROLE_ROUTES 양쪽 →
5-10 i18n 4개 언어 → 5-11 rollback 스크립트

---

## 13. 6단계 — 테스트 시나리오 (초안 · Fable 판정 대기)

### 13-1. 기계 게이트

```bash
cd /var/www/dev-backend && node scripts/verify-all.js            # 프론트 변경 후엔 build:dev 뒤 --full
cd /var/www/dev-frontend && npm run build:dev                    # ⚠ 종료코드는 변수로 받는다(체이닝 금지)
cd /var/www/dev-backend && node scripts/check-print-guard.js     # MainLayout 지문 → Fable 제시 후에만 --bless
cd /var/www/dev-backend && node scripts/check-design-guard.js
cd /var/www/dev-backend && node scripts/check-migration-registry.js
cd /var/www/dev-backend && node scripts/check-sensitive-diff.js  # Fable 게이트 대상 여부 기계 판정
cd /var/www/dev-frontend && npm run i18n:verify
```

### 13-2. API 실호출 (`dev-backend/test-stock-ledger.js` 임시 스크립트 → 실행 후 삭제)

| # | 시나리오 | 기대 |
|---|---|---|
| 1 | 기존 from-catalog 4경로 **회귀** (치환 전/후 응답 동일) | 계약 불변 |
| 2 | migration-preview 조회 | `summary.auto + review + 담기불가 = 총건수` |
| 3 | migrate `dry_run:true` | DB 쓰기 **0행** |
| 4 | migrate 실제 제출 → **같은 입력 재제출** | 2회차 `connected`, 중복 매핑 **0** |
| 5 | catalog-link bulk (매장 스코프) | `track_stock:false` 로 생성, 발주 가능 |
| 6 | 담기 불가 1건 포함 제출 | 해당 행 `failed` + 사유, 나머지는 성공(부분성공) |
| 7 | `apply_cost` 미지정 | `unit_cost` 변경 **0** |
| 8 | 타 브랜드 `brandId` 로 호출 | **403** |
| 9 | 익명 호출 | **401** |
| 10 | 매장 계정이 브랜드 장부에 쓰기 시도 | **403**(`writableIngredient`) |
| 11 | 동시 배치 2개 | 두 번째 **409** |
| 12 | rollback dry-run → apply | 되돌림 정확, 참조 있는 행은 skip+사유 |

### 13-3. 데이터 검증 (§10-6 쿼리 4개 + ⑤)

배치 실행 후 ①재배선 누락 0 ②중복 매핑 0 ③과거 발주 이력 무손상 ④원가 무단변경 0.
**⑤ 매장 계정 실브라우저**: with MIN Cafe 로 로그인 → 발주 담기 화면 → 같은 판매자상품 **1행만** 노출(이중 노출 0).

### 13-4. 고장주입 (반증 — 통과만으로는 방어를 증명 못 한다)

| # | 주입 | 실패해야 하는 것 |
|---|---|---|
| 1 | 멱등 키 조회를 제거하고 재제출 | 검증 ②(중복 매핑 0) |
| 2 | `linked_ingredient_id` 에 값 쓰기 | 가드/검토가 잡아야 함 |
| 3 | `apply_cost=false` 인데 원가 갱신 | 검증 ④ |
| 4 | 재배선에서 `seller_entity_id` 를 owner_user_id 로 바꿔치기 | 매장 발주가 **막혀야** 함(`verifySellerRelation`) |

### 13-5. 실브라우저 mount

`scripts/headless-page-sweep.js` — 신규 페이지 진입 크래시 0 / `console.error` 0 / ErrorBoundary 0.
역할별: BG(브랜드 스코프) · RA(매장 스코프) · 권한 없는 역할은 **진입 차단** 확인.

### 13-6. 운영 데이터 안전

- dev 검증은 **데모 매장**에서만(운영 매장 쓰기 0)
- 운영 반영은 Irene `/배포` 명령 때만. 배포 전 백업 확인 + 마이그 registry 통과
- 배포 후 §10-6 검증 쿼리를 **운영에서 읽기 전용으로 1회** 실행해 보고


---

## 14. 실행 기록 (2026-08-28 운영 반영 완료)

**배포**: `EXIT_CODE=0` · 백업 `20260828_083607` · 마이그 57/57(신규 `migrate-stock-ledger-batch-items.js` 포함) · 스모크 10/10.

**모드 1 이관** — batch `13381394-f0c7-469f-b94b-8a85782e8f78`
`created 226 · connected 62 · skipped 0 · failed 0` · 배치 이력 `create_ingredient` 226 + `link_seller` **305**(원본 매핑 전량 복제).
원본 `product_ingredients` 288건과 매핑 305건 **무손상 보존**. `update_cost` 0(원가 덮어쓰기 없음).

**모드 2 발주 전용 등록** — batch `04338ebd-1180-41d2-a0e2-0653ee03deb5`
restaurant 10: `created 81 · skipped 5 · failed 0`. skip 5 = 기연결 4 + **담기 불가 1**(`RECLOSABLE LID 12OZ BLACK`, `NO_DISTRIBUTION_LINK`).

**결과** — with MIN Cafe 화면: 재고 **460건**(자기 149 + 브랜드 공유 311), 발주 가능 **432건**
(이관 전 157건 표시 / 66건 발주 가능). 브랜드 판매자 발주 가능 85건(신규 81 + 기연결 4).

**실증** — 매장 계정으로 실제 발주 생성 `PO-R10-20260828-001` (201, total 27.90, 라인 1) → 삭제(200, `deleted_at` 확인).
`verifySellerRelation`·`MAPPING_REQUIRED` 실통과. 실브라우저 3페이지 pageerror 0.

**§10-6 검증**: ①매핑 없는 신규 3건 = **원본에도 매핑 0이던 항목**(Light soy sauce / Minced garlic / Anchovy Soup Stock)
②재고 기준 중복 **0** ③과거 발주 고아 **0** ④원가 무단변경 **0** ⑤**이중 노출 0**(Stock Items 매핑 섞임 0 · 자기재고↔공유 교차 0).

**롤백**: `node scripts/rollback-stock-ledger-batch.js --batch=<uuid> [--apply]` (dry-run 기본).

**정리**: `supplier_companies` **36 삭제**(전참조 0 재확인 후) · **37 보존**(§7 참조).

### 14-1. 원본 유래 중복 19건 (이번 범위 무접촉 · 정리 착수 시 작업 목록)

같은 판매자상품이 **이름이 다른 두 재고**에 붙어 있다. 원본 Stock Items 에 이미 그렇게 등록돼 있던 것을
충실히 복제한 결과이며 이관이 만든 중복이 아니다. 이름이 달라 정확일치 매칭에도 걸리지 않는다.
병합은 **어느 이름을 남길지·수량을 어떻게 합칠지의 내용 판단**이라 도구가 대신할 수 없다(자동 병합 금지 원칙).

| 판매자상품 | ingredient id | 이름 |
|---|---|---|
| `supplier:7:96` | 491, 703 | AUS BRISKET(호주산 양지) / Aust Midfield Brisket Pedo (소고기_호주_양지) |
| `supplier:10:247` | 501, 716 | Peeled Garlic(깐마늘) / Peeled Garlic(Bawang Putih Kopek) (깐마늘) |
| `supplier:24:115` | 498, 704 | Cooking Oil(식용유) / High Oleic Sunflower & Canola Oil Clear Vall |
| `supplier:24:121` | 507, 705 | MSG / Monosodium Glutamate Ajinomoto |
| `supplier:24:126` | 505, 706 | Extra Fine Salt(고운소금) / Extra Fine Salt_Double Swallow (고운 소금) |
| `supplier:24:127` | 505, 706 | Extra Fine Salt(고운소금) / Extra Fine Salt_Double Swallow (고운 소금) |
| `supplier:24:156` | 597, 707 | Heavy Duty Garbage Bag (L) / Heavy Duty Garbage Bag[XL Size] (쓰레기봉투_L) |
| `supplier:24:157` | 598, 708 | Heavy Duty Garbage Bag (XL) / Heavy Duty Garbage Bag[L Size] (쓰레기봉투_XL) |
| `supplier:28:172` | 494, 709 | Gochujang(고추장) / Gochujang (Korean Chili Paste) (고추장_해찬들태양초알찬 |
| `supplier:28:173` | 499, 710 | Cooking Vinegar(미향) / Cooking Vinegar (미향 오뚜기18L) |
| `supplier:28:176` | 496, 711 | Coarse Pepper Powder(굵은 고춧가루) / Coarse Pepper Powder (굵은 고춧가루1kg) |
| `supplier:28:177` | 497, 712 | Fine Pepper Powder(고운 고춧가루) / Fine Pepper Powder (고운 고춧가루1kg) |
| `supplier:28:179` | 615, 640 | Kimchi (포기김치 10kg) / Kimchi (K1 할랄김치) |
| `supplier:28:189` | 500, 713 | Anchovi Sauce (멸치액젓 하선정) / Anchovi Sauce (멸치액젓 하선정 800g) |
| `supplier:28:194` | 628, 629 | Hotteok / Hotteok (삼립미니꿀호떡) |
| `supplier:28:204` | 500, 714 | Anchovi Sauce (멸치액젓 하선정) / Anchovi Sauce (멸치액젓 하선정 2.5kg) |
| `supplier:28:214` | 504, 715 | Beef Stock(소고기 다시다) / Beef Stock (소고기다시다 2kg) |
| `supplier:28:216` | 651, 655 | Glass Noodle (당면 14kg) / Glass Noodle (당면 백설햇 1kg) |
| `supplier:28:218` | 653, 654 | Dried seaweed sheet for KImbob (김밥용김_100매) / Dried seaweed sheet for KImbob (김밥용 김) |


---

## 15. 2026-08-28 재작업 — Irene 정정 반영 (모델 변경)

> ⚠ **§1 의 "이관 목적지 = brand 1 장부" 결정은 폐기됐다.** Irene 정정: "각각 서로의 재고야 연동도 아니고" ·
> "브랜드는 재고를 가지고 있지 않아" · "브랜드에서 빼". 아래가 현재 유효한 모델이다.

### 15-1. 확정 모델 (Fable, Irene 정정 반영)
| # | 결정 |
|---|---|
| ① | **위드민 매장 재고 = 깃컨설팅 Stock Items 사본 전량.** 브랜드 공유(읽기전용) 아님 — 매장이 **소유**한다 |
| ② | **브랜드 층 재고 0.** 기존 89행도 매장으로 흡수(겹침 63 비활성·비겹침 26 소유전환) |
| ③ | **수량은 복사하지 않는다**(전부 0). `track_stock` 은 **원본 미러**(원본 288 전부 ON) |
| ④ | 일반 외부 공급업체(21개사)는 **매장에 직접 연결** |
| ⑤ | **UGS 는 깃컨설팅의 공급업체.** UGS 물품은 깃컨설팅 프로덕트로 등록하고, 위드민 거래처는 **깃컨설팅** |
| ⑥ | 깃컨설팅 프로덕트 중 **패키지·소스만** 매장에 담는다(기타 33건은 담지 않되 상품 행은 존치) |
| ⑦ | **거래처 표시 = 회사명 단독**("GIT Consulting"). 브랜드명 병기 금지 |

### 15-2. 용어 규율 (Irene 지적)
**원가**(사는 값) / **판매가**(파는 값) **두 단어만** 쓴다. "매입가·단가" 같은 제3의 단어 금지.
- `supplier_products.unit_price` = 원가 · `brand_products.unit_price` = **판매가** ·
  `ingredients.unit_cost` = 원가 · `ingredient_seller_products.unit_price` = 그 거래처 원가
- 구조: **프로덕트**(판매가) / **재고**(원가) / **공급업체 상품**(원가) 은 서로 다르고,
  레시피가 있으면 **프로덕트 ↔ 재고 사이에 레시피**가 들어간다(`Product.recipe_id → Recipe → RecipeIngredient → ingredients`).

### 15-3. 실행 결과 (운영)
| 단계 | 결과 |
|---|---|
| 모드 1 롤백 | 531건(재고 226 + 매핑 305) · brand 1 기준선 89 복귀 |
| 모드 2 롤백 | 162건 |
| **매장 소유 재이관** `654399fc-…` | **created 286 · skipped 2(중복 무접촉) · failed 0** |
| **브랜드 89행 흡수** | 병합 63(비활성) · 소유전환 26 · 오버레이 정리 22 · **수량 보존 대조 0=0** |
| **UGS 프로덕트 등록** | 신규 **55**(판매가 초기값 = 원가, 마진 0) · 프로덕트 90 → 145 |
| **깃컨설팅 연결** | 매장 55건 연결 후 **UGS 직접 매핑 55 비활성** · 원본 UGS 매핑 57 **활성 유지** |
| **모드 2 재실행** | 패키지·소스 108 중 신규 3 · 기존 연결 57 (기타 33 제외) |
| **IKEA 티슈** | 공급업체 IKEA(41) 신규 · 브랜드 계약 · 공급업체 상품 원가 RM5.50 · 매장 재고 · 거래처 연결 |
| **최종** | 매장 재료 **380** · 브랜드 활성 재고 **0** · 중복 표시 **0** · 치킨 13 · MTP 2 · 거래처 "GIT Consulting" |

### 15-4. 근본 원인 기록 — "왜 없어"
초기 이관이 `track_stock: false` 를 **강제**했고(원본은 288 전부 ON), 발주 화면 `My Stock Items` 탭이
`if (!showUntracked && r.track_stock === false) return false;`(`NewPurchaseOrderPage.tsx`)로 **기본 숨김**한다.
→ 226행이 통째로 안 보였다. 데이터·번들·API 문제가 아니었다(전부 용의선상에서 제거 실증).
**교훈: `track_stock=false` 로 만드는 모든 행은 잠재적 "왜 없어"다.**

### 15-5. 남은 것 (다음 섹션)
**A. 공급업체 없는 재고 12건** — Irene 이 매입처를 알려주면 연결(IKEA 흐름 재사용):
  1. Anchovy Soup Stock (면사랑 멸치밑국물육수1.8L)
  2. Bread_Hokkaido
  3. K-Bulgogi 1kg
  4. K-DINE Hat
  5. K-DINE T-Shirt / 2XL
  6. K-DINE T-Shirt / XL
  7. K-Yukgaejang Beef 1kg
  8. Light soy sauce(양조간장)
  9. Matcha Powderr
  10. Minced garlic (간마늘)
  11. Rice-Jasmin cal fresh 5kg/pkt
  12. (1건 추가 — 목록 재확인 필요)

**B. 판매가 0인 프로덕트** — 원가가 0으로 등록돼 있어 판매가도 0. Irene 이 채울 예정.
목록: `docs/archive/2026-08-28-stock-ledger/bp_class.json` · `ugs_registered.json`

**C. 감사 기록** — `docs/archive/2026-08-28-stock-ledger/` (7파일, /tmp 에서 이전 완료)
