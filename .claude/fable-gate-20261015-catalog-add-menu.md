# [Fable gate] 카탈로그 «Add as menu / Add as product» = 재고아이템 + 그대로 파는 메뉴/프로덕트 (2026-10-15)

> 설계 `.claude/fable-design-20261015-catalog-add-menu.md` (Irene 상황판 답 «권고대로 진행해 줘» = (가)). 팀원(Opus) 구현·자체 검증 뒤 Fable 검증 1회. 한 사안 2회로 끝.
> 운영 쓰기 0 · 배포 없음. 개발 DB(데모 1·38 · 데모 브랜드 10)만 건드렸고, 내가 만든 시험 행은 전부 지웠다(아래 ③).

## 판정: **PASS** (비차단 후속 2건)

## ① diff 범위 대조 — 설계 밖 변경 0

| 설계 | 구현 위치 | 대조 |
|---|---|---|
| D1 공용 함수(판매가 400 · 중복 ①직접FK ②×1레시피 → 409 · `Product.create({ingredient_id})` / `BrandProduct.create({product_ingredient_id})`+`BrandProductBrand.findOrCreate` · 레시피 안 만듦) | 새 `services/sellStockItemDirect.js` | 일치. 호출자 트랜잭션·실패 반환(던지지 않음)·판매가 복사 금지 그대로 |
| D1 소유 판정 단일 소스 | `menu.js` 끝 `module.exports.isIngredientInScope` · `restaurants-ingredients.js register-as-product` 가 그걸로 404 판정 | 일치(매장 소유 + 부모 브랜드 공유 재료). 화면 `isItemReadOnly` 숨김은 무접촉 |
| D1 문 ① from-catalog `new_product` = 재고아이템 흐름(already / 거울 / create) 뒤 같은 트랜잭션에서 팔기 · 자체재고 가지 삭제 · 응답 `{…, product, created:{ingredient,product}}` | `restaurantCatalogLink.js finish()` · `product-ingredients.js finish()` | 일치. 판매가·카테고리(매장)/브랜드(BG) 사전검사가 재고아이템 생성 **앞**에 있어 400 이면 재료 +0 |
| D1 문 ② register-as-product 2벌 → 공용 함수 · 응답 `{product}`(`recipe` 없음) | 두 라우트 교체 | 일치. `RegisterAsProductModal.tsx` 는 `onRegistered()` 만 부르고 응답 본문을 읽지 않음(확인) |
| D1 기존 ×1 레시피 프로덕트는 그대로 · `existing_*_id` 연결 모드 · `stock-products` 목록 유지 | 삭제된 것은 `new_product` 자체재고 생성 가지만 | 일치 |
| D2 `linkedSellerProductMap(buyerEntity)` 네 칸 · 카탈로그 교체 · `mapped_ingredient_id` 는 ingredient 일 때만 · `mapped_target` 추가 | `utils/catalogLink.js` · `supplier-directory.js` 4곳 | 일치. 매장의 부모 브랜드 출처 연결 규칙(10-04·10-11)과 덮어쓰기 순서(자체재고 → 브랜드 출처 → 자기 재고)가 옛 코드와 같은 결과 |
| D2 브랜드 소유자 = `req.bgOwnerId` 와 같은 사람 | `brandOwnerUserIds(brand)` = owner_id ∪ 배정 BG/BM | `requireBGScope` 의 bgOwnerId(BG 본인 / BM 은 홈 브랜드 소유자)는 이 집합의 부분집합 → 포함. 적법 |
| D4 매장 재료 목록 `sold_as_menu` · `IngredientsTab` «Sold as: 이름» | `soldAsMenuMap` 두 반환 경로 · 화면 두 곳 | 일치(`ingredients:stock.alreadyProduct` 키 재사용, 번역 두 벌 없음) |
| D5 읽기 전용 보고 스크립트 | `scripts/report-self-stock-product-links.js` | SELECT 만. 개발 0·0 |
| D6 문구 4언어 · 키 그대로 | `purchaseOrders.json` ×4 · 기본문구 | 일치. 빌드 산출물(`dev-frontend-build/locales/en/purchaseOrders.json` 11:46)에 새 문구 2건 들어감 |
| D7 서비스 상품 특별 분기 없음 | — | 없음 |

**설계와 다른 점 4건 — 모두 수용:**
1. `findAlreadyLinked` 범위 좁힘(매장 재료 / 소유자 PI 서브쿼리) — 설계가 «재사용» 을 요구했는데 범위 없는 findOne 이 남의 매장 연결을 집어 «안 담음» 으로 떨어뜨리던 **원래 결함**을 드러낸 것. 설계 D1 ⒜ 를 지키기 위한 최소 수정이고, 브랜드 거울 경로의 `findOrCreate` 가 거울 연결은 그대로 멱등 처리한다.
2. BG from-catalog 브랜드 결정(body.brand_id → 범위 밖 404 / 1개면 자동 / 아니면 400 BRAND_REQUIRED) — `register-as-product`(BG) 와 같은 규칙. 프론트가 `buyerEntity.id` 를 보낸다.
3. D3 Linked 배지 title 생략 — 설계가 «선택» 으로 둔 것.
4. 매장 «Also sell as menu» 소유 범위 확대 — 설계 D1 그대로.

🔒 인쇄 8파일·KDS 무접촉 — print-guard 8/8(내가 재실행).

## ② 가드 — 내가 돌린 것
- `check-sensitive-diff` → FABLE 게이트 대상(①②③⑤ 접촉 — 같은 작업 트리의 다른 방 변경 포함). `health-check.js` 가 «안전망 자체 변경» 으로 뜸 — 근거: P3 2건의 계약을 설계대로 ×1 레시피 → 직접 FK 로 바꾼 것 + 새 검사 1건 추가. 검사가 약해진 곳 없음(레시피 줄 검사 → `ingredient_id`=재료 · `recipe_id` null · 브랜드 귀속 1행 검사로 바뀜).
- `check-print-guard` 8/8 변경 없음.
- 인스펙션 `ingredient-unification` 27/35 · 신규 0(baseline 3) · **ING-UNI-008 ✅ · 009 ✅**(직접 FK 만 세우므로 «레시피+재고 동시» 0 유지).

## ③ 실호출·반증 — 내가 돌린 것
- health-check `--category=inventory` **70/70** (새 검사 «카탈로그 Add as menu/product → … 409 · 브랜드는 Add to My Stock 뒤 Linked» 포함).
- **고장주입(팀원과 다른 지점)**: `sellStockItemDirect.js` 의 직접 FK 중복검사(D1 ①) 두 함수 모두 무력화 → pm2 재시작 → inventory **3건 실패 / 67 통과**(새 검사: again1=201·regAgain=201 · P3 매장 «중복 가드가 없다: 201, 프로덕트 31 → 32» · P3 BG 중복 409 실패). 사본 cp 로 원복 → `cmp` 동일 → pm2 재시작 → **70/70**. 가드가 실제로 막고 있음을 반증으로 확인.
- 팀원 고장주입(D2 PI 집합 제거 → linked4:false 실패 · D1+D2 동시 제거 → 3건 실패)은 팀원 보고 숫자 그대로 받음.
- 시험 행 정리: 고장주입 상태에서 «다시 누르면» 이 201 로 통과해 생긴 두 번째 메뉴 4건(`ZZ-HC-SELLDIRECT-… dup / ra2`, 매장 1, 팀원 1회 + 나 1회, 연결 0 · 재료는 이미 삭제됨)이 검사의 정리 블록에 안 잡혀 남아 있었다 → 내가 삭제(4행, 남은 0). 정상 상태(409)에선 생기지 않는다.
- 팀원 자체 검증(API 16/16 · 판매 차감 10→9 · 전체 health 373/377 — 실패 4건은 이전부터 있는 [po] 수령 stock_alerts FK · verify-all --full 21/24 — 실패 3 은 이전부터의 배포 준비 기록·LEDGER-004 같은 2줄 · mount sweep 8역할 · build EXIT 0)은 보고 숫자 그대로 받음. 전체 health-check 는 내가 다시 돌리지 않음(이번 변경이 닿는 inventory 카테고리를 두 번 직접 돌렸다).
- 확인용 데이터(데모 38): 메뉴 24727 «[확인용] Premium Tomato» → `ingredient_id=21458` · `recipe_id=null` — 직접 FK 꼴 확인. 남겨 둠.

## ④ 배포 안전성
- 스키마·ENUM·마이그레이션 없음(기존 컬럼 `products.ingredient_id` · `brand_products.product_ingredient_id` · 기존 중간표만 사용). 백필 없음(기존 ×1 레시피 프로덕트 그대로).
- 프론트 변경 포함 → 다음 배포 때 SW 버전 bump 는 배포 방 규칙대로.
- 롤백 = 코드 되돌리기만(데이터 변환 없음). 새 길로 만들어진 메뉴/프로덕트는 롤백 뒤에도 옛 코드가 이미 읽는 직접 FK 꼴이라 깨지지 않음.
- 운영 D5 보고 스크립트는 `운영검증` 때 실행(쓰기 0).

## 비차단 후속 (팀원 몫 · 이 판정에 영향 없음)
1. health-check 새 검사의 정리 블록이 `again1` · `regAgain` 응답의 `product.id` 도 거두게 — 가드가 깨졌을 때만 새는 자리지만 다음 고장주입 때 또 손으로 지워야 한다.
2. 이 마커는 작업 트리 전체 지문이라 같은 폴더의 다른 방 미커밋(옵션 가격 등)도 덮는다 — 그 방들의 조건(커밋 전 클릭 흐름 등)은 그대로 유효(이전 마커 note 와 같은 한계).

— Fable 5.1 · 2026-10-15
