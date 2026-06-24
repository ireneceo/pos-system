# 모바일 크로스셀(추천/애드온) 시스템 — 기획설계

> 2026-06-24 Irene 지시. 모바일 주문에서 상품을 담으면 "함께 주문하면 좋은 상품"을 추천해 **객단가(AOV)** 를 올린다. 인쇄 코드와 완전 무관. 본 문서 = 1~4단계 설계(구현 전). 구현은 별도 승인 후.

---

## 1. 기능 정의

| 항목 | 내용 |
|------|------|
| 기능명 | 모바일 크로스셀(추천 애드온) |
| 목적 | 모바일 주문 객단가 상승 — 담을 때 함께 살 상품 추천 |
| 핵심 사용자 | ① 레스토랑 관리자(RA) = 매장 추천 연결/설정 ② 브랜드 제너럴(BG) = 브랜드 차원 추천 연결 → 가맹점 동기화 ③ 모바일 주문 고객 = 추천 소비 |
| 성공 기준 | 무설정 매장도 Dessert/Drink 카테고리만 있으면 자동 추천 + 수동연결로 맞춤 + BG 추천이 가맹점에 동기화 + 모바일에서 한 탭 담기 |
| 비범위 | 주문이력 기반 자동추천(후속, 우리 데이터로 가능하나 별도 집계작업) · 장바구니 결제직전 추천줄(후속) · 푸드코트(FG, 메뉴 가맹점 공유 구조 없음) · POS/키오스크(모바일 전용) · 인쇄(무변경) |

### 1.1 추천 결정 로직 (핵심)
손님이 상품 A 를 담았을 때, 추천 목록을 아래 **우선순위**로 1개 소스만 채운다:

```
① A 에 수동 연결한 추천상품이 있으면        → 그걸 표시 (맞춤, 최우선)
② 없으면 → "추천 카테고리"의 상품을 표시      → (Dessert/Drink 자동감지 + 카테고리 체크)
③ 그것도 없으면 → 추천 안 뜸 (그냥 담기고 끝)
```
- 공통 필터(모든 소스): `is_active=true`, 재고 있는 것(`track_stock=false` 또는 `current_stock>0`), **담은 상품 자신 제외**, **이미 장바구니에 있는 상품 제외**(프론트), 최대 6개.

### 1.2 "추천 카테고리" 판정 (②)
- **자동 감지**: 카테고리 이름이 키워드(`dessert, desserts, 디저트, drink, drinks, 음료, beverage, beverages, 음료수` — 대소문자·공백 무시)에 매칭되면 자동으로 추천 카테고리.
- **관리자 조정**: 카테고리에 `is_recommendation_source` 플래그 — 명시 지정/해제(이름 무관). 값이 있으면 자동감지보다 우선.
- 결과: 매장이 아무것도 안 해도 Dessert/Drink 이름 카테고리는 자동 추천. 이름이 다르면 체크 한 번.

---

## 2. 데이터 구조 (Database Schema)

### 2.1 신규 테이블: `product_recommendations` (① 수동 연결)
| 컬럼 | 타입 | null | default | 설명 |
|------|------|------|---------|------|
| id | INT PK AI | | | |
| restaurant_id | INT | N | | 소유 매장(가드) |
| product_id | INT | N | | 기준 상품(이걸 담으면) |
| recommended_product_id | INT | N | | 추천 상품 |
| sort_order | INT | Y | 0 | 표시 순서 |
| origin | ENUM('restaurant','brand') | N | 'restaurant' | 출처 — brand 동기화분 구분 |
| brand_menu_recommendation_id | INT | Y | NULL | brand 동기화분의 원본 링크 id(재동기화 추적) |
| is_locked | BOOL | N | false | brand 잠금분(가맹점 수정 불가) |
| created_at / updated_at | DATETIME | | | |

- 인덱스: `UNIQUE(product_id, recommended_product_id)`, `INDEX(restaurant_id)`, `INDEX(origin, brand_menu_recommendation_id)`
- 관계: product_id / recommended_product_id → products.id (N:N 방향성). FK 제약은 앱 레벨 검증(기존 패턴 일치).

### 2.2 신규 컬럼: `categories.is_recommendation_source` (② 추천 카테고리)
| 컬럼 | 타입 | null | default | 설명 |
|------|------|------|---------|------|
| is_recommendation_source | BOOL | Y | NULL | NULL=자동감지(이름) / true=강제 추천 / false=강제 제외 |

### 2.3 신규 테이블: `brand_menu_recommendations` (BG 브랜드 차원 ① )
| 컬럼 | 타입 | null | 설명 |
|------|------|------|------|
| id | INT PK AI | | |
| brand_id | INT | N | 소유 브랜드(가드) |
| brand_menu_id | INT | N | 기준 브랜드메뉴 |
| recommended_brand_menu_id | INT | N | 추천 브랜드메뉴 |
| sort_order | INT | Y | |
| created_at / updated_at | | | |
- 인덱스: `UNIQUE(brand_menu_id, recommended_brand_menu_id)`, `INDEX(brand_id)`

### 2.4 마이그레이션 전략
- 전용 멱등 마이그 3종(각 `CREATE TABLE IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` 가드) — `sync-database --alter` 의존 금지([[reference_sync_alter_drops_columns]]).
  - `scripts/migrate-product-recommendations.js` (테이블 2개)
  - `scripts/migrate-category-recommendation-flag.js` (컬럼 1개)
- `models/index.js` association + `deploy-to-production.sh` SPRINT_MIG 등록.

---

## 3. API 설계

응답 표준 `{ success, data }`. 보안 3단계(authenticateToken → requireRole/소유권 → checkRestaurantAccess).

### 3.1 레스토랑 관리자 (RA)
| METHOD / PATH | 인증 | Body | 응답 | 비고 |
|---|---|---|---|---|
| GET `/api/restaurants/:restaurantId/products/:productId/recommendations` | token + checkRestaurantAccess | — | `{success,data:[{id,recommended_product_id,name,sort_order,origin,is_locked}]}` | 연결 목록(브랜드분 포함, 잠금표시) |
| PUT `/api/restaurants/:restaurantId/products/:productId/recommendations` | token + checkRestaurantAccess | `{recommended_ids:[..]}` (순서=배열순서) | `{success,data}` | origin='restaurant' 분만 통째 교체. brand/lock 분은 보존 |
| PATCH `/api/restaurants/:restaurantId/categories/:id/recommendation-source` | token + checkRestaurantAccess | `{value: true\|false\|null}` | `{success}` | 추천 카테고리 토글 |

### 3.2 브랜드 제너럴 (BG)
| METHOD / PATH | 인증 | Body | 응답 |
|---|---|---|---|
| GET `/api/brand-menus/:id/recommendations` | token + requireRole(BG) + 브랜드 소유권 | — | `{success,data:[..]}` |
| PUT `/api/brand-menus/:id/recommendations` | token + requireRole(BG) + 소유권 | `{recommended_brand_menu_ids:[..]}` | `{success}` (저장 후 가맹점 동기화 트리거) |

### 3.3 모바일 (공개, restaurant 스코프)
| METHOD / PATH | 인증 | 응답 |
|---|---|---|
| GET `/api/mobile/:slug/products/:productId/recommendations` | 없음(공개), slug→restaurant 해석 | `{success,data:[{id,name,price,image,...}]}` — 1.1 로직 적용(①→②→[]), 활성·재고·자신제외, 최대 6 |
- 위치: `routes/mobile-public.js` (또는 menu.js 인접). inventory-core fall-through 회피 위해 mount 순서 주의([[reference_external_qr_coupon]] 패턴).

---

## 4. 브랜드 동기화 설계 (핵심 난점)

BG가 브랜드메뉴 추천을 정의하면 가맹점에 내려가야 한다. 기존 **brandMenuSyncService** 구조 재사용.

### 4.1 동기화 트리거
- BG가 `PUT /brand-menus/:id/recommendations` 저장 시 + 기존 브랜드메뉴 push/scope 적용 시(`applyScopeToBrandMenu`) 함께 호출.

### 4.2 동기화 로직 `syncBrandRecommendationsToRestaurant({brandId, restaurantId})`
1. 해당 브랜드의 `brand_menu_recommendations` 전부 로드.
2. 각 행의 `brand_menu_id` / `recommended_brand_menu_id` 를 그 매장의 로컬 product 로 매핑:
   `products.brand_menu_id = <brand_menu_id>` 인 활성 product 찾기(이미 브랜드메뉴 sync로 생성됨).
3. 양쪽 다 매핑되면 `product_recommendations` 에 upsert: `origin='brand'`, `brand_menu_recommendation_id=<원본 id>`, `is_locked=<브랜드 설정>`.
4. 더 이상 존재하지 않는 브랜드 추천(원본 삭제분)은 그 매장의 `origin='brand'` 분 중 매칭 안 되는 것 제거.
5. **가맹점 자기 추천(origin='restaurant')은 절대 안 건드림** — 공존(합쳐서 표시, 브랜드분 먼저).

### 4.3 잠금/덮어쓰기 규칙
- `is_locked=true` 브랜드 추천: 가맹점이 삭제/수정 불가(표시만). 브랜드메뉴 locks_snapshot 패턴과 동일.
- `is_locked=false`: 가맹점이 추가 추천을 더 얹을 수 있음(브랜드분 + 매장분 합산, 6개 상한).
- 카테고리 자동감지(②)는 **매장 로컬**로만 동작(브랜드 동기화 대상 아님 — 카테고리 이름은 매장마다 다를 수 있어 로컬 판정이 안전).

---

## 5. UI 흐름

### 5.1 레스토랑 관리자 — `pages/MenuManagement`
- 상품 편집 모달에 **"함께 추천할 상품"** 섹션: 같은 매장 활성 상품 다중선택(공용 `SelectComponents`), 순서 조정, 브랜드 잠금분은 회색+자물쇠(수정 불가).
- 카테고리 관리에 **"추천에 보여주기"** 토글(자동감지 상태를 회색 힌트로 표시, 클릭 시 강제 on/off).

### 5.2 브랜드 제너럴 — `pages/BrandGeneral/BrandMenusPage`
- 브랜드메뉴 편집에 **"추천 메뉴 연결"** 다중선택(같은 브랜드 메뉴들). 저장 시 가맹점 동기화 안내.

### 5.3 모바일 — `mobile/pages/ItemDetailPage` + 신규 `RecommendationSheet`
- 담기(`addToCart`) 직후: `GET /mobile/:slug/products/:id/recommendations` 호출 → 결과 있으면 **바텀시트(슬라이드업)** 표시.
  - 카드(이미지·이름·가격) 탭 = 즉시 담기.
  - 하단 버튼 2개: **`계속 담기`**(시트 닫고 직전 메뉴 탭 복귀) / **`장바구니 (N)`**(장바구니로 이동).
  - 결과 없으면 시트 미표시(기존 "담음" 피드백 유지) — 데드엔드 없음.
- 공용 Modal/시트 컴포넌트 재사용, 풀페이지 라우트 추가 없음.

### 5.4 i18n
- 모바일 ns + 메뉴관리 ns 에 키 추가(4개 언어 en→ko→zh→ms): "함께 주문하면 좋아요", "계속 담기", "장바구니", "함께 추천할 상품", "추천에 보여주기" 등.

---

## 6. 테스트 시나리오 (구현 시 6단계)
- 실API: RA 연결 저장→조회 라운드트립 / 모바일 ①·② 폴백·자신제외·재고0제외 / 소유권 403 / BG 저장→가맹점 동기화 row 생성 / 브랜드 잠금분 가맹점 수정 차단.
- 모바일 mount(ItemDetail/Cart) 크래시 0, 바텀시트 표시·담기·이동.
- health-check + print-guard 8/8(인쇄 무관) + /검증 10단계.

---

## 7. 구현 순서(승인 후)
1. 마이그 2개 + 모델 2개 + index.js
2. 백엔드 라우트(RA·BG·모바일) + server.js
3. brandMenuSyncService 동기화 함수
4. RA UI(상품편집·카테고리토글)
5. BG UI(브랜드메뉴 추천연결)
6. 모바일 RecommendationSheet + ItemDetailPage 연결
7. i18n 4언어
8. 6단계 테스트 + /검증
