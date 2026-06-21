# 다매장 쿠폰 발행 (Coupon Multi-Restaurant Targeting)

작성: 2026-06-21 · 대상 역할: Foodcourt General(FG), Brand General(BG)

## 1. 배경 / 문제
FG·BG 의 `operation → coupons` 페이지(`pages/Manager/ManagerPromotionsPage.tsx`)가 **미구현 스텁**이었다
(restaurants 배열이 항상 빈 배열, API 미연결 TODO, 저장이 로컬 state 뿐, 레이아웃 80px 고정 overflow).
FG/BG 는 산하 매장이 여럿이라 "전 매장 / 선택 매장"에 한 번에 쿠폰을 거는 기능이 필요하다.

## 2. 데이터 모델 결정 — materialize (매장당 1행)
쿠폰은 원래 **매장당 1행**이고(`coupons.restaurant_id` + `code` UNIQUE), 주문 할인·검증이 전부
`(restaurant_id, code)` 로 조회된다(`coupons.js validate`, `orders-crud.js resolveCouponMeta`,
`mobile-orders.js`). 따라서 "전/선택 매장" 쿠폰은 **대상 매장마다 동일 쿠폰을 1행씩 materialize**하고
`scope_group_id` 로 묶어서 관리한다. → 결제/검증/주문 생성 레이어(인쇄 인접 `orders-crud` 포함) **무변경**.
(대안인 parent+join 테이블은 위 3곳의 조회를 전부 바꿔야 해 인쇄 인접 코드 리스크 ↑ → 기각.)

선례: 브랜드메뉴 `scope_mode('all','selected')` + `brand_menu_restaurants` allowlist 패턴과 동일 사상.

## 3. 스키마 (migrate-coupon-scope.js, 멱등)
`coupons` 테이블에 컬럼 추가 (NULL = 매장관리자가 만든 기존 단일매장 쿠폰, 영향 없음):

| 컬럼 | 타입 | 의미 |
|------|------|------|
| `scope_group_id` | VARCHAR(40) | 같이 만든 형제 행 묶음 id (`cg_<b/f><ownerId>_<ts36>_<hex>`) |
| `scope_owner_type` | ENUM('brand','foodcourt') | 발행 주체 |
| `scope_owner_id` | INT | 해당 brand_id / foodcourt_id |
| `scope_mode` | ENUM('all','selected') | 발행 시 타게팅 방식 |

인덱스: `coupons_scope_group_id(scope_group_id)`, `coupons_scope_owner(scope_owner_type, scope_owner_id)`.
deploy-to-production.sh 9a-2 에 `scripts/migrate-coupon-scope.js` 등록(운영은 --alter 안 돎).

## 4. API — routes/coupon-groups.js (`/api/coupon-groups`)
소유권은 `resolveOwnerScope`(Brand.owner_id / Foodcourt.owner_id) + 매장별 `userCanAccessRestaurant` 이중 검증.

- `GET ?ownerType=brand|foodcourt&ownerId=ID` → `{ data: 그룹[], restaurants: 산하매장[] }`. 그룹 = scope_group_id 로 묶은 대표값 + `restaurant_ids/names/count` + `usage_count_total`.
- `POST` body `{ ownerType, ownerId, scope_mode, restaurant_ids?, code, type, value, ... }` → 대상 매장(all=산하전체 / selected=교집합) 마다 fan-out create. 코드 충돌(같은 매장에 동일 code) 400 `CODE_EXISTS`.
- `PUT /:groupId` → 정의 일괄 수정 + 매장 reconcile(유지/추가 upsert, 빠진 매장 행 삭제). usage_count 보존.
- `DELETE /:groupId` → 형제 행 일괄 삭제.

단일매장 쿠폰(scope_group_id NULL)은 이 API 에 안 잡힘 — 매장 관리자 `/restaurant/:id/coupons`(PromotionsPage) 그대로.

## 5. UI — ManagerPromotionsPage.tsx (스텁 전면 교체)
공용 컴포넌트(Modal/DataTable/PageHeader/DateRangeField/ConfirmModal/FormGroup) 사용. FG/BG 동일 페이지.
- 발행 주체: FG=`user.foodcourt_id`, BG=`user` 소유 브랜드(`/api/brands`) + 브랜드 선택기(localStorage `bg.selectedBrandId` 공유, 다른 BG 페이지와 일관).
- 쿠폰 폼(code/name/type/value/min_order/max_discount/usage_limit/validity/status) + **"적용 대상: 전 매장 / 선택 매장"** 선택 + 선택 시 매장 체크박스.
- 목록: 코드/이름/할인/적용범위/상태/사용수 + 행 수정·삭제.

## 6. 검증 (2026-06-21)
- 백엔드 실API 9/9: fan-out(brand1→4매장)·validate 작동·목록·PUT reconcile(4→1행)·코드충돌 400·소유권가드(BG→foodcourt 403)·FG 발행·역할격리(FG가 BG그룹 삭제 404)·삭제.
- health 107/107, print-guard 8/8(인쇄 무관).

## 7. 향후
- i18n: 현재 영어 라벨(쿠폰 도메인은 PromotionsPage 도 영어). 필요 시 4언어 키 추가.
- 고객/등급 타게팅(target_type customers/tiers)은 매장별 고객목록이라 다매장 발행에선 제외 — 필요 시 매장별 단일쿠폰(PromotionsPage)에서.
