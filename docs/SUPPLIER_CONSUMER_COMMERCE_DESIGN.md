# 공급업체 소비자 커머스 + 정기배송 — 설계

> ## 🛑 보류 (2026-09-12 Irene 결정 — 착수 금지)
> Irene 원문: **「소비자용 공개가게는 안해도 돼. 장기적으로 B를 전략적으로 유도하자. 공급업체들과 b2b 전략 제대로 가자.」**
> - **일반 소비자에게 파는 공개 가게·정기배송·배송권역은 하지 않는다.** 이 문서는 그때 판정·실측을 잃지 않기 위해 보존용으로만 둔다.
> - 대신 가는 길 = **무료 구매자 등급(B2B 유입)** → `docs/BUYER_FREE_TIER_DESIGN.md`.
> - 2026-08-28 백엔드 골격(모델 6 · `routes/shop-public.js` · `routes/supplier-shop.js` · `middleware/supplierShopScope.js` ·
>   `services/supplierShopStock.js` · `utils/shopSlug.js` · `SupplierCustomersPage.tsx`)은 **`main` 브랜치 커밋 `f87cd631f` 에만** 있고
>   현재 작업 브랜치(`deploy-isolation`)에는 없다. 되살릴 일이 생기면 그 커밋에서 꺼낸다.
> - **DB 는 이미 운영에 들어가 있다**(표 6 · `supplier_companies.shop_slug`/`shop_enabled`/`shop_description` ·
>   `supplier_products.shop_*`/`subscription_*` · 마이그 `migrate-supplier-shop.js` 는 배포 목록에 등록됨). 전부 0행이라 **지워도 되는 상태지만 건드리지 않는다**(expand-then-use).
> - 이 문서 아래 내용(§0~)은 2026-08-28 시점 그대로다. **재논의·재설계 금지, 보류 해제는 Irene 지시로만.**

> 상태: **1단계(기능 정의) 초안 — Fable 판정 대기 / Irene 승인 전.** 코드 변경 0.
> 작성 2026-08-28. 판정 = Fable / 실행 = Opus.
> 관련 문서(주제 구분): `SUPPLIER_CONTRACT_SYSTEM.md`(B2B 계약) · `EXTERNAL_SUPPLIER_PRODUCTS.md`(외부업체 상품)
> · `FEATURE_BASED_SUBSCRIPTION_PLAN.md`·`SUBSCRIPTION_*`(**솔루션 이용료** 구독 — 이 문서와 무관).
> 이 문서 주제 = **공급업체가 일반 소비자에게 파는 가게 + 정기배송 + 지역별 발송관리**.

---

## 0. 출발점 (Irene 원문)

> "공급업체에게 영업을 하고 싶어… 구독상품 기능이 추가되어야 해. 지역에 따라 해당 주문이 묶여서
> 발송관리도 되어야 하고… 후불이 되는 고객은 우리 솔루션 가입한 레스토랑고객으로 하라고 해서
> 해야 한다고 안내할까?… 이 공급업체가 싫을까? 무엇보다 레스토랑관리자 말고 발주하고 상품받고만
> 하는 다른 구입권한 유저를 만들어야할까?" → "작업 3은 기획설계 의견 줘." → "작업 3 기획설계 진행해줘"

---

## 1. Fable 확정 결정 (2026-08-28 · 재논의 대상 아님)

| # | 결정 | 근거 |
|---|---|---|
| ① | **결제 = A안(묶음 선결제 + 연장 알림)만 v1.** 카드 자동결제(B)는 **v2 확장 슬롯으로 문서 예약** | B 는 카드 저장·off-session 결제 인프라가 필요해 주체별 키 결제 표준 위에 얹을 공사가 크다. A 는 기존 체크아웃 그대로. A 위에 B 를 얹는 구조로 설계해 **버리는 작업 0** |
| ② | **계정 = 전역 계정 + 관계 카드.** 공급업체 관계는 `SupplierCustomer` 연결표 신설(`RestaurantCustomer` 패턴 복제) | 검증된 패턴. `Customer.phone/email` 이 전역 unique 라 공급업체별 계정 생성은 불가 |
| ③ | **지역 발송 = "묶어 보여주기"까지.** 물류(경로 최적화·택배 연동) 비범위 | 배송지역 개념 모델이 0건 = 신규. 물류까지 가면 범위가 폭발 |
| ④ | **후불 = 신규 신용 시스템 만들지 않는다.** 소비자는 선결제만, 후불은 **솔루션 가입 레스토랑이 기존 B2B 채널**(발주·Trade Invoice·SOA)로 살 때만 | 이미 있는 인프라가 곧 후불 장치. Irene 질문("안내할까?")의 답 = **그렇게 안내하는 게 맞고, 공급업체에게 불리한 게 아니라 영업 포인트**(소비자 미수 위험 0, 후불은 검증된 회원 매장에만) |
| ⑤ | **구입권한 유저 = 신규 전역 역할 금지.** 기존 직원 권한 키 1개 추가 | 6역할에 역할을 더하면 사이드바·라우트 가드·미들웨어 전면에 닿는다. Irene 질문의 답 = **"만들되 역할이 아니라 직원 권한으로"** |
| ⑥ | **소비자 주문 = 신규 표.** 기존 `orders` 재사용 **기각** | `orders` 는 매장 주문 도메인의 심장이고 🔒 인쇄 폴러(pending-print)·KDS·라이브오더 소켓·매출 리포트·금액 재계산이 전부 물려 있다. 새 주문 유형이 들어가면 **보호 대상 전부가 그걸 모르는 채 읽는다** — 필터 하나 빠지면 인쇄 폴러가 집어가거나 매장 매출에 섞인다. 표를 분리하면 보호 영역 접촉이 **구조적으로 0** |
| ⑦ | **v1 은 애드온/유료 게이트 없음** | 공급업체 유치용 영업 도구라 문턱을 만들지 않는다. v2 검토 항목으로만 기록 |
| ⑧ | **소비자 판매가는 공개 노출.** 단 **공개 응답 직렬화는 화이트리스트 방식(허용 필드 열거) — 제외 목록 방식 금지** | 두 가격을 혼동하면 안 된다. 가게에 뜨는 건 공급업체가 이 가게용으로 설정한 **소비자 판매가**이고, 경쟁사에 새면 안 되는 건 **B2B 도매·계약가**다(화이트리스트로 구조적 제외). 가격 없는 상점은 전환이 죽는다. 화이트리스트여야 **새 필드가 추가돼도 기본이 비노출** |
| ⑨ | **취소는 v1 필수 · 환불은 수동 폴백.** 미발송 회차만 취소, 환불액 = **남은 회차 × 회차 단가** | 묶음 선결제에서 미발송분 취소가 없으면 컴플레인이 공급업체와 Irene 에게 직행. **실측 결과 게이트웨이 환불 API 는 존재하지 않는다**(§6-1) → 공급업체 수동 환불 + 상태 기록 |
| ⑩ | **주문 도메인 완전 분리 + 재고는 단일 소스 공유.** `SupplierShopOrder` 는 `purchase_orders` 를 모른다. 재고는 **`SupplierProduct.current_stock` 하나**를 양 채널이 차감 | 같은 `supplier_products` 행이라 자연 공유. 따로 놀면 **초과판매**. v1 은 예약/홀드 없음(주문 확정 시 단순 차감) + **재고 0 미만 방지 조건부 UPDATE 가드**, 그 가드는 **고장주입 대상** |

**Irene 발안으로 이미 확정된 것**: 정기배송 판매 조건(주기·묶음 단위·가격)은 **공급업체가 상품 등록 때 직접 설정**. 플랫폼은 결제 장치만 제공.

---

## 2. 실측 (재조사 불필요)

- `Customer`: `phone`·`email` **전역 unique**, `restaurant_id` 컬럼 **없음** → 같은 번호로 주체별 계정 생성 불가
- `RestaurantCustomer`: 매장별 포인트·등급·방문이력·알레르기·VIP메모 분리 보관 (복제할 패턴)
- `customers-auth.js`: 가입·로그인이 `restaurantId` **선택 파라미터**로 관계행 생성/조회
- ⚠ `customers-self.js` 라우트 4개: 매장 구분이 **`restaurant_id` 쿼리 파라미터로만** 갈린다.
  `stats` 는 없으면 조기 반환, `orders` 는 없으면 **전 매장 통합 조회**가 기본
  → **공급업체 가게 화면에서는 supplier 스코프를 서버가 강제**해야 한다(프라이버시 절단면, §5 성공기준)
- `SupplierProduct` 에 구독·지역 필드 **0** / 배송지역 개념 모델 **0건**(`delivery_policy` 자유 텍스트뿐)
- 기존 `Subscription` = `payment_subscriptions` 표, `payer_type`/`payer_id` 에 customer 없음
  → **솔루션 이용료용. 재사용 금지. 이름 충돌 주의**(신규는 `SupplierSubscription` 등 별칭)
- `SupplierCompany.payment_settings`(stripe·paypal·계좌이체·QR) **이미 존재** → 주체별 키 그대로 사용
- 공급업체 상품 **옵션그룹 체계 완비**(재사용) / 공급업체 카탈로그는 전부 로그인+구매자 전용 = **소비자 공개 화면 0개**
- 직원 권한은 `User.permissions`(JSON 배열) + 프론트 `hasManagerPermission`/`hasMenuPermission` 키
  (현행 키: management · operations · products · inventory · reports · support) → **키 1개 추가로 확장 가능**

---

## 3. 1단계 — 기능 정의

| 항목 | 내용 |
|---|---|
| **기능명** | 공급업체 소비자 가게 + 정기배송 + 지역별 발송관리 |
| **목적** | 공급업체가 플랫폼 위에서 일반 소비자에게 직접 팔고, 정기배송을 판매하고, 주문을 지역·배송일로 묶어 내보낼 수 있게 한다 |
| **핵심 사용자** | Supplier Admin(판매·발송) · 일반 소비자(구매) · Restaurant Admin/직원(후불 B2B 구매는 기존 채널) |

### 핵심 유스케이스
1. **소비자가 공급업체 가게에서 산다** — 로그인 하나로 어느 공급업체 가게에서도 구매. 첫 구매 시 `SupplierCustomer` 관계가 생김
2. **공급업체가 정기배송 상품을 등록한다** — 주기·묶음 회차·가격을 상품 등록 화면에서 직접 설정
3. **소비자가 정기배송을 구독한다** — **정해진 회차분을 한 번에 선결제**, 배송지 지정. 종료 전 **연장 알림**
4. **공급업체가 발송을 관리한다** — 주기 도래 건이 **지역 × 배송일**로 묶여 보이고, 패킹 → 발송 → 완료 상태 처리
5. **매장 직원이 발주·수령만 한다** — 신규 역할 없이 **직원 권한 키 1개**로 그 화면만 열림

### 성공 기준
1. 소비자가 공급업체 가게에서 단품·정기배송을 **선결제로** 구매 완료할 수 있다
2. 구독이 주기마다 **발송 건으로 떨어지고**, 회차 소진 시 연장 알림이 나간다
3. 발송관리에서 **지역 × 배송일 묶음**으로 처리할 수 있다
4. **소비자는 자기 것만 본다** — 공급업체 가게 화면에서 다른 공급업체·매장 이력이 새지 않는다(서버 강제)
5. 매장 직원 계정이 **발주·수령 화면만** 열리고 나머지는 차단된다
6. 결제는 **공급업체 자기 계정으로 수금**된다(`payment_settings` 주체별 키)

### 비범위 (선 긋기)
- **카드 자동결제(B)** — v2 슬롯 예약만
- **물류** — 경로 최적화·택배사 연동·송장 출력
- **신규 전역 역할** 추가
- **신용/후불 판정 시스템** — 후불은 기존 B2B 채널(발주·Trade Invoice·SOA) 그대로
- 기존 `Subscription`(`payment_subscriptions`) **재사용·변경**
- **레스토랑 모바일오더 무접촉** · 발주 파이프라인 무접촉 · 🔒 인쇄 보호파일 무접촉
- `Customer` 에 주소·지역 컬럼 추가 (배송지는 **구독 속성**으로 저장)

### 신규 모델 후보 (3개 이상 → `/기능설계` 6단계 전체 대상)
`SupplierCustomer`(관계) · `SupplierSubscription`(구독) · `SupplierSubscriptionDelivery`(회차별 발송) ·
`SupplierDeliveryZone`(지역) · **`SupplierShopOrder`(소비자 단품 주문 — 신규 표 확정, §1 ⑥)** — 컬럼은 3단계에서 확정.

---

## 4. 다음 단계
2단계(API) → 3단계(DB) → 4단계(UI) → 5단계(구현) → 6단계(테스트). 각 단계 **Fable 판정 후 Irene 승인**.
주소 입력은 `<AddressFields>` 표준, 국가 CHAR(2) ISO. 결제는 주체별 키 표준(`reference_payment_standard`).

---

## 5. 2단계 — API 설계 (초안 · Fable 판정 대기)

### 5-0. 마운트 원칙 (사고 예방 — 설계 단계에서 봉쇄)

**전용 prefix 로만 마운트한다.** `app.use('/api', router)` 금지.
```js
app.use('/api/supplier-shop', supplierShopRouter);          // 공급업체(판매자) 운영
app.use('/api/shop', shopPublicRouter);                     // 소비자(구매자)
```
그리고 **라우터 최상단 `router.use(가드)` 금지** — 미들웨어는 라우트마다 붙인다.
근거: 2026-08-28 `routes/stock-ledger.js` 를 `/api` 에 마운트하고 `router.use()` 를 걸어
**공급업체·오너 화면이 통째로 403** 이 됐다. 단일 진실 = [[reference_router_use_leaks_to_api_root]].

### 5-1. 스코프 강제 미들웨어 (신규) — `checkRestaurantAccess` 의 대칭

| 미들웨어 | 역할 |
|---|---|
| `requireSupplierScope` | Supplier Admin/Staff 의 `supplier_company_id` 를 **서버가 확정**. 경로 파라미터 불신 |
| `requireShopCustomer` | 소비자 JWT(`customerJwt`) 검증 + `req.shopCustomer` 확정 |
| `checkSupplierCustomerAccess` | **`SupplierCustomer` 관계가 있는 자원만** 통과. §2 프라이버시 절단면의 구현체 |

⚠ `customers-self.js` 는 `restaurant_id` 쿼리가 없으면 **전 매장 통합 조회**가 기본이다.
소비자 가게 화면은 그 경로를 **쓰지 않고**, 위 전용 라우트로만 조회한다(supplier 스코프를 서버가 강제).

### 5-2. 엔드포인트

**소비자 (구매자)** — `/api/shop`
| # | 엔드포인트 | 인증 | 비고 |
|---|---|---|---|
| 1 | `GET /suppliers/:supplierId/catalog` | **공개(무인증)** | ⚠ **보안 경계 변경 항목** — 현행 공급업체 카탈로그는 전부 구매자 전용. 소비자 공개 카탈로그는 **신규 공개 라우트**. 노출 필드 화이트리스트(원가·계약가·재고 실수량 **제외**), rate limit 필수 |
| 2 | `GET /suppliers/:supplierId/products/:productId` | 공개 | 옵션그룹 재사용 |
| 3 | `POST /orders` | `requireShopCustomer` | 단품 주문 → `SupplierShopOrder` 생성 + 결제 |
| 4 | `POST /subscriptions` | `requireShopCustomer` | 정기배송 구독 — **묶음 회차 선결제**, 배송지 포함 |
| 5 | `GET /me/orders` · `GET /me/subscriptions` | `requireShopCustomer` + `checkSupplierCustomerAccess` | **자기 것만**. supplier 스코프 서버 강제 |
| 6 | `POST /subscriptions/:id/renew` | 위와 동일 | 연장(다음 묶음 선결제) |
| 7 | `POST /subscriptions/:id/cancel` | 위와 동일 | 남은 회차 처리 정책은 3단계 |

**공급업체 (판매자)** — `/api/supplier-shop`
| # | 엔드포인트 | 인증 | 비고 |
|---|---|---|---|
| 8 | `GET/POST/PUT /zones` | `requireSupplierScope` | 지역 정의(이름 + 우편번호 접두/주 목록, 말레이시아 기준) |
| 9 | `PUT /products/:id/subscription-plan` | 위 | 주기·묶음 회차·가격 — **공급업체가 상품 등록 때 직접 설정**(Irene 발안) |
| 10 | `GET /deliveries` | 위 | **zone × 배송일 묶음** 목록 |
| 11 | `PUT /deliveries/:id/status` | 위 | 패킹 → 발송 → 완료 |
| 12 | `GET /customers` | 위 | `SupplierCustomer` 목록 — **자기 고객만** |

**공통 규칙**: 응답 `{ success, data }` / 실패 `{ success:false, message }` · 경로의 id 는 **서버 확정값과 대조 후 불일치 403** · 목록은 서버 페이지네이션.

### 5-3. 결제

**주체별 키 표준 그대로** — 공급업체 자기 `SupplierCompany.payment_settings`(stripe·paypal·계좌이체·QR)로 **자기 계정 수금**.
카드 MYR **최소 RM2** 제약 준수. 검증은 **sandbox 카드만**(운영 webhook e2e 금지).
정기배송 = **묶음 회차분 1회 결제**(A안). 카드 저장·off-session 인출 **없음**(B는 v2 슬롯).

### 5-4. 연장 알림

`SchedulerRun` 패턴으로 일 1회 — 잔여 회차가 임계 이하인 구독에 안내.
**신규 알림 카테고리 2건**을 `NOTIFICATION_CATEGORIES`(`routes/notification-settings.js`)에 추가:
| key | label | section | roles |
|---|---|---|---|
| `shop_subscription_expiring` | Subscription Ending Soon | Supplier Shop | 소비자 |
| `shop_order_shipped` | Order Shipped | Supplier Shop | 소비자 |
이메일은 `emailLayout(bodyContent)` + `getLogoAttachment()`, URL 은 `FRONTEND_URL` 환경변수(하드코딩 금지),
백엔드 `locales/` **4개 언어** 템플릿.

### 5-5. 유료화 게이트
**v1 없음(확정)** — 공급업체 유치용 영업 도구라 문턱을 만들지 않는다. 애드온 게이트는 **v2 검토 항목**으로만 기록.

### 5-6. 무접촉 (경로 명시)
`routes/orders-crud.js` · `routes/purchase-orders-crud.js` · `models/Order.js` · `utils/orderTotals.js` ·
🔒 인쇄 보호파일 8개 · `models/Subscription.js`(`payment_subscriptions`) · `routes/customers-self.js` ·
레스토랑 모바일오더(`routes/mobile*.js`).

### 5-7. 미결 (Fable 판정 요청)
1. **공개 카탈로그의 노출 범위** — 로그인 없이 가격까지 보이게 할지, 가격은 로그인 후로 할지.
2. **소비자 주문 취소·환불** — v1 범위에 넣을지(결제 표준의 환불 경로 재사용 여부).
3. **`SupplierShopOrder` 와 발주(`purchase_orders`) 의 관계** — 완전 분리인지, 공급업체 재고 차감은 공유하는지.

---

## 6. 3단계 — DB / 데이터 설계 (초안 · Fable 판정 대기)

### 6-1. 선행 실측 (지시 2건 — 추측 없이 확인함)

**① 환불 경로 — 게이트웨이 환불 API 는 이 저장소에 없다.**
`routes/` · `services/` · `utils/` 전수 검색에서 `stripe.refunds.create` / PayPal refund 호출 **0건**.
존재하는 "refund" 는 전부 **포인트 환불**(`services/pointService.js:267 refundPointsForOrder`)과
인보이스/플랜 상태 되돌리기뿐이다.
→ **결정 ⑨의 "수동 폴백" 분기로 확정.** v1 은 게이트웨이 자동 환불을 만들지 않는다.
공급업체가 자기 게이트웨이 콘솔/계좌로 환불하고, 우리는 **환불 상태와 금액만 기록**한다.

**② B2B 재고 차감 지점 — `routes/seller-orders.js:400~425` (발주 `shipped` 전이 시).**
`status==='confirmed'` 인 발주를 배송 처리할 때, 라인의 `ingredient_seller_product_id` → 매핑 →
`SupplierProduct` 를 **`lock: t.LOCK.UPDATE` 로 잠그고** `current_stock` 을 갱신한 뒤
`SupplierInventoryTransaction`(`transaction_type:'po_shipped'`, `reference_type:'purchase_order'`)을 남긴다.
→ **재고 단일 소스 = `SupplierProduct.current_stock` + `SupplierInventoryTransaction` 원장.**
shop 주문도 **같은 쌍**을 쓰되 `transaction_type`/`reference_type` 만 다르게 남긴다.
⛔ **`routes/seller-orders.js` 는 무접촉** — B2B 차감 경로를 건드리지 않는다.

### 6-2. 신규 표 (5개)

**`supplier_customers`** — 공급업체 × 소비자 관계 (`RestaurantCustomer` 패턴 복제)
`id · supplier_company_id · customer_id · first_order_at · last_order_at · total_orders · total_spent · notes · created_at · updated_at`
UNIQUE `(supplier_company_id, customer_id)` · INDEX `(customer_id)`

**`supplier_delivery_zones`** — 공급업체가 정의하는 배송 지역
`id · supplier_company_id · name · postcode_prefixes(JSON) · states(JSON) · delivery_days(JSON) · is_active · sort_order · created_at · updated_at`
INDEX `(supplier_company_id, is_active)` · 말레이시아 기준(우편번호 접두 / 주 목록)

**`supplier_shop_orders`** — 소비자 단품 주문 (⛔ `orders` 와 무관)
`id · order_no · supplier_company_id · customer_id · zone_id · status(ENUM) · subtotal · delivery_fee · total_amount · currency · payment_status · payment_ref · delivery_address(JSON) · delivery_date · notes · created_at · updated_at · deleted_at`
+ `supplier_shop_order_items`: `id · order_id · supplier_product_id · product_name_snapshot · options(JSON) · quantity · unit_price · line_total`
INDEX `(supplier_company_id, status, delivery_date)` · `(customer_id, created_at)`
**이름 스냅샷 보관** — 상품명이 나중에 바뀌어도 주문서가 안 흔들린다

**`supplier_subscriptions`** — 정기배송 구독 (⛔ `payment_subscriptions` 와 **다른 표**)
`id · supplier_company_id · customer_id · supplier_product_id · zone_id · cycle(ENUM weekly/biweekly/monthly) · cycles_total · cycles_delivered · unit_price · total_paid · currency · payment_status · payment_ref · delivery_address(JSON) · next_delivery_date · status(ENUM active/completed/cancelled) · cancelled_at · refund_amount · refund_status(ENUM none/pending/done) · refund_note · created_at · updated_at`
INDEX `(supplier_company_id, status, next_delivery_date)` · `(customer_id)`
**환불액 공식(결정 ⑨)**: `refund_amount = (cycles_total − cycles_delivered) × unit_price` — 단순 공식, 문서 고정

**`supplier_subscription_deliveries`** — 회차별 발송 건
`id · subscription_id · cycle_no · zone_id · scheduled_date · status(ENUM pending/packing/shipped/delivered/skipped) · shipped_at · delivered_at · notes · created_at · updated_at`
UNIQUE `(subscription_id, cycle_no)` · INDEX `(zone_id, scheduled_date, status)` ← **zone × 배송일 묶음 조회의 근거**

### 6-3. 기존 표 변경 (최소)

| 표 | 변경 | 비고 |
|---|---|---|
| `supplier_products` | 소비자 판매 필드 추가: `shop_enabled`(bool, 기본 false) · `shop_price` · `shop_description` · `subscription_enabled`(bool) · `subscription_cycle` · `subscription_cycles_default` · `subscription_price` | **B2B 가격(`unit_price`) 무접촉** — 소비자가는 별도 컬럼. 결정 ⑧ |
| `users` | 없음 | 직원 권한은 기존 `permissions` JSON 배열에 **키 1개 추가**(스키마 변경 0) |
| `supplier_companies` | 가게 설정 3컬럼 추가: **`shop_slug`(UNIQUE, 발행 전 NULL)** · `shop_enabled`(default false — 공개 라우트 필터 키) · `shop_description`(TEXT) | Fable 판정 2026-08-28(A안). slug 는 공개 진입 키라 **UNIQUE 를 DB 가 보장**해야 한다 — JSON 설정 컬럼에 넣으면 앱 레벨 경합으로만 막혀 "중복 차단" 결정 위반. 별도 표(C안)는 컬럼 3개를 위해 표 1개 + 모든 공개 요청에 JOIN 1개라 과설계. **v2 로 설정이 늘면 그때 `shop_settings` JSON 추가**(관행 일치) |
| `supplier_inventory_transactions` | **ENUM 값 추가만** — `transaction_type` += `shop_order`·`subscription_delivery`·`shop_restock` / `reference_type` += `supplier_shop_order`·`supplier_subscription_delivery` | §6-4 가 명시한 신규 값의 구현. **현재 값을 information_schema 에서 읽어 더하는 방식**(목록 하드코딩 금지) + 값 손실 검증. B2B `po_shipped` 경로 **무접촉** |
| `Customer` | **없음** | 주소·지역 컬럼 추가 금지(배송지는 주문/구독 속성) |

### 6-4. 재고 차감 규칙 (결정 ⑩)

```
UPDATE supplier_products
   SET current_stock = current_stock - :qty
 WHERE id = :id AND current_stock >= :qty      -- 조건부: 0 미만이면 0행
```
- `affectedRows === 0` → **재고 부족으로 주문 거절**(초과판매 차단). 트랜잭션 롤백
- 성공 시 `SupplierInventoryTransaction` 기록(`transaction_type:'shop_order'` / `'subscription_delivery'`,
  `reference_type:'supplier_shop_order'` / `'supplier_subscription_delivery'`)
- v1 **예약/홀드 없음** — 주문 확정 시점 단순 차감
- ⚠ **차감 시점이 채널별로 다르다(의도된 비대칭 — 통일하지 말 것)**:
  **shop = 결제 확정 시** / **B2B 발주 = `shipped` 전이 시**(`seller-orders.js` 기존 동작, 무접촉).
  소비자는 결제와 동시에 확정되고 B2B 는 판매자가 확인 후 보내는 흐름이라 시점이 같을 수 없다.
- ⚠ 이 조건부 UPDATE 가드는 **고장주입 대상**(조건절을 제거하면 동시 주문에서 음수 재고가 나야 한다)

### 6-5. 마이그레이션
신규 표 5개 + `supplier_products` 컬럼 7개 → **멱등 `scripts/migrate-supplier-shop.js`** 1개 +
`migrations.registry.json` `deploy` 등록. `sync-database` 에 맡기지 않는다([[reference_deploy_schema_drift]]).
ENUM 은 모델 파일 + 마이그 양쪽에 정의. MySQL 64-key 한도 여유 확인(표당 인덱스 2~3개).

### 6-6. 확정 사항 (Fable 판정 2026-08-28)

1. **배송비 = zone 별 고정액.** `supplier_delivery_zones` 에 `delivery_fee` 컬럼 1개(기본 0).
   0/수동 방식은 배송비를 상품가에 뭉개게 만들어 **기각**. 무료배송 기준액(threshold)은 **v2 기록만**.
2. **주문번호 채번 = `MAX(seq)` 방식. 건수 기반 금지.**
   `(supplier_id, 날짜)` 스코프에서 **INSERT 트랜잭션 안에서** `MAX(seq)+1`.
   형식 `SO-{supplierId}-{YYYYMMDD}-{seq}`. 근거: 건수 기반 채번이 운영에 **중복 12종**을 냈다
   ([[reference_count_based_code_numbering]]). **삭제 후 번호 재사용 없음**이 검증 항목.
3. **구독 취소 = 미발송 회차만 `cancelled`. 발송 완료 회차는 상태 그대로 역사 보존.**
   `skipped` 상태값은 **만들지 않는다** — skip 은 "회차 건너뛰기(일시정지)"의 의미론인데 v1 에 일시정지가
   없다. 안 쓰는 상태값은 나중에 오용된다. **행 삭제는 어떤 경우에도 없음**, 취소 상태·환불 기록은 구독 행에.

---

## 7. 4단계 — UI 흐름 (초안 · Fable 판정 대기)

### 7-1. 두 세계, 다른 기준 (중요)

| | 소비자 가게 | 공급업체 관리 |
|---|---|---|
| 기준 | **모바일 우선** — 소비자는 폰으로 산다 | 데스크톱 우선 (기존 어드민과 동일) |
| 결 | 기존 **모바일오더**(`src/mobile/`, `MOBILE_ORDER_PATTERNS.md`)의 결을 따른다 | **RA 디자인 기준** + 공용 컴포넌트 의무 |
| 진입 | `/shop/:supplierSlug` (MainLayout 없음, 전체화면) | `/pos/supplier/shop/*` (기존 공급업체 사이드바 안) |

⛔ 소비자 화면에 RA 어드민 컴포넌트를 끌어오지 않는다. ⛔ 공급업체 관리 화면에 모바일오더 컴포넌트를 끌어오지 않는다.

### 7-2. 소비자 화면 (모바일 우선 · 전체화면)

| 화면 | 내용 |
|---|---|
| 가게 홈 `/shop/:supplierSlug` | **로그인 없이 열림**. 상품 그리드(사진·이름·**소비자 판매가**), 카테고리 탭, 검색 |
| 상품 상세 | 옵션그룹(기존 체계 재사용) · 수량 · [장바구니] / [정기배송으로 받기] |
| 정기배송 설정 | 주기·회차 수(공급업체가 정한 범위 내) → **총액 미리보기** → 배송지·배송지역 선택 |
| 장바구니 / 결제 | 배송지 입력(`<AddressFields>`) · zone 자동 판정(우편번호) · **배송비 표시** · 결제(주체별 키) |
| 내 주문 / 내 정기배송 | 진행 상태, 남은 회차, **[취소]**(미발송분만) → 환불 예정액 = 남은 회차 × 회차 단가 **미리 표시** |
| 로그인/가입 | 기존 소비자 계정 그대로 — "한 번 가입하면 어느 가게에서도 같은 아이디" |

### 7-3. 공급업체 관리 화면 (`/pos/supplier/shop/*`)

| 화면 | 내용 |
|---|---|
| 가게 설정 | 가게 공개 여부 · 소개 · slug |
| 배송 지역 | zone CRUD — 이름 · 우편번호 접두/주 · **배송비** · 배송 요일 |
| 상품 판매 설정 | 상품별 `shop_enabled` · 소비자가 · 정기배송 켜기(주기·회차·가격) — **B2B 가격과 나란히 보이되 별개 칸** |
| **발송관리** | **zone × 배송일 묶음** 목록. 묶음 펼치면 주문/구독 회차 목록, 일괄 [패킹] → [발송] → [완료] |
| 주문/구독 | 목록·상세, 취소·환불 상태 기록(**환불 실행은 공급업체가 자기 게이트웨이에서** — 화면은 기록만) |
| 고객 | `SupplierCustomer` 목록 — **자기 고객만** |

### 7-4. 상태·에러·i18n
- 신규 namespace 2개: `shop`(소비자) · `supplierShop`(관리). **4개 언어** + glossary 선등재
- 소비자 화면 문구는 **구조 용어 금지** — "여권/도장카드" 같은 설명 대신 보이는 동작만
- 재고 부족(조건부 UPDATE 실패) → **"방금 품절되었습니다"** 안내 + 장바구니 유지
- alert/toast 금지, 성공은 화면 전환 + 목록 갱신
- 결제 실패는 배너 + 재시도. 카드 MYR **최소 RM2** 안내

### 7-5. 반응형
소비자 = 모바일 기준으로 만들고 태블릿·데스크톱은 중앙 정렬 확장. 관리 = 데스크톱 기준, 표는 `overflow-x:auto`.

### 7-6. 확정 사항 (Fable 판정 2026-08-28)

1. **가게 주소(slug) = 자동 제안 + 최초 1회 수정 · 발행 후 잠금.**
   회사명 정규화(소문자·하이픈)로 자동 생성, 중복 시 숫자 접미, **예약어 차단**(`admin` `api` `shop` `pos` `mobile` 등).
   개설 시 1회 수정 기회, **발행 후 변경 불가**(변경은 System Admin 경유만).
   근거: 이 링크는 공급업체가 인쇄물·채팅으로 뿌리는 **영업 자산**이다. 자유 변경을 허용하면 뿌려진 링크가 전부 깨진다.
   리다이렉트 표를 만드는 것보다 변경을 막는 게 v1 정답.
2. **장바구니 = 브라우저 `localStorage`, 키는 가게(slug) 스코프.** 서버 카트 **기각**.
   비로그인 탐색 → 로그인 → 결제 흐름에서 **로그인 리다이렉트를 견뎌야** 하므로 sessionStorage 가 아니다.
   가게별 키로 가게 간 섞임 방지. 읽기·쓰기 **try/catch** + **저장값이 없어도 정상 렌더**(차단 브라우저 대비).
3. **v1 노출 = 링크 접근만.** 가게 목록·검색·랜딩 노출 **없음**.
   이 기능의 정체는 **공급업체가 자기 고객에게 뿌리는 영업 도구**이지 마켓플레이스가 아니다.
   목록 페이지를 만드는 순간 큐레이션·경쟁 노출 문제가 따라오고 범위가 커진다. **v2 검토로만 기록.**
   (랜딩/블로그의 기능 소개 콘텐츠는 콘텐츠 체크리스트에 따라 별도 — 기능 노출과 무관.)

---

## 8. 5단계 — 코드 설계 (초안 · Fable 판정 대기)

### 8-0. 마운트·가드 규칙 (코드 레벨 재명시 — 설계에서 이미 정했지만 여기서 한 번 더)

```js
app.use('/api/supplier-shop', supplierShopRouter);   // 판매자 운영
app.use('/api/shop', shopPublicRouter);              // 소비자
```
⛔ `app.use('/api', ...)` **금지** · ⛔ 라우터 최상단 `router.use(가드)` **금지**.
미들웨어는 **라우트마다** `...GATES` 로 붙인다.
근거: 2026-08-28 `routes/stock-ledger.js` 가 그렇게 만들어져 **공급업체·오너 화면이 통째로 403** 이 됐다
([[reference_router_use_leaks_to_api_root]]).

### 8-1. 직원 권한 키 (확정)
신규 키 **`purchasing`** — "발주·수령만 하는 계정"(결정 ⑤).
저장은 기존 `User.permissions`(JSON 배열) — **스키마 변경 0**.
프론트는 `hasMenuPermission('purchasing')` 로 발주·입고 메뉴만 노출.
기존 키(`management`·`operations`·`products`·`inventory`·`reports`·`support`)와 나란히 추가.

### 8-2. 신규 파일

| 파일 | 내용 |
|---|---|
| `models/SupplierCustomer.js` · `SupplierDeliveryZone.js` · `SupplierShopOrder.js` · `SupplierShopOrderItem.js` · `SupplierSubscription.js` · `SupplierSubscriptionDelivery.js` | §6-2 표 6개 (+`models/index.js` export·association) |
| `middleware/supplierShopScope.js` | `requireSupplierScope` · `requireShopCustomer` · `checkSupplierCustomerAccess` |
| `routes/supplier-shop.js` | 판매자 운영 5 엔드포인트 |
| `routes/shop-public.js` | 소비자 7 엔드포인트 (공개 2 + 인증 5) |
| `services/supplierShopStock.js` | **조건부 UPDATE 차감 + 원장 기록 단일 소스** (§6-4) |
| `services/supplierSubscriptionScheduler.js` | 회차 생성 + 연장 알림 (`SchedulerRun` 패턴) |
| `utils/shopSlug.js` | slug 정규화·중복 회피·**예약어 차단** |
| `scripts/migrate-supplier-shop.js` | 멱등 마이그 + registry `deploy` 등록 |
| 프론트 `src/shop/**` | 소비자 가게 (모바일오더 결, MainLayout 밖) |
| 프론트 `pages/SupplierShop/**` | 판매자 관리 (RA 기준·공용 컴포넌트) |
| `locales/{en,ko,zh,ms}/shop.json` · `supplierShop.json` | 4개 언어 |

### 8-3. 수정 파일 (절단면)

| 파일 | 절단면 |
|---|---|
| `models/supplier_products` 모델 | 소비자 판매 필드 7개 추가. **`unit_price` 무접촉** |
| `models/index.js` | 신규 6모델 export + association |
| `server.js` | 라우터 **2줄**(전용 prefix). 공개 라우터에 **rate limit 적용** |
| `routes/notification-settings.js` | `NOTIFICATION_CATEGORIES` **2건 추가** |
| `scripts/migrations.registry.json` | **1줄** |
| `scripts/health-check.js` | 신규 케이스(§9-2) |
| `App.tsx` · `AuthContext.tsx` | `/shop/*` 공개 라우트 + `/pos/supplier/shop/*` **ROLE_ROUTES 두 겹 동시** |
| `MainLayout.tsx` | 공급업체 사이드바 항목 — 🔒 보호파일이므로 **diff 국한 증명 + 인쇄 회귀 후 Fable 판정 하에만 bless** |
| `locales/*/common.json` · `glossary.json` | 메뉴 라벨·용어 |

### 8-4. 절대 무접촉
`routes/orders-crud.js` · `routes/purchase-orders-crud.js` · **`routes/seller-orders.js`**(B2B 차감 경로) ·
`models/Order.js` · `utils/orderTotals.js` · `models/Subscription.js`(`payment_subscriptions`) ·
`routes/customers-self.js` · `routes/mobile*.js` · 🔒 인쇄 보호파일 8개.

### 8-5. 구현 순서
모델 → 마이그(dev) → `supplierShopStock` 서비스 + **차감 가드 단위검증 먼저** → 미들웨어 →
`shop-public`(공개 2개는 화이트리스트 직렬화부터) → `supplier-shop` → 마운트+rate limit → 스케줄러 →
알림 카테고리 → 프론트 소비자 → 프론트 관리 → 사이드바 → 라우트·ROLE_ROUTES → i18n

---

## 9. 6단계 — 테스트 시나리오 (초안 · Fable 판정 대기)

### 9-1. 기계 게이트
`verify-all --full`(16종) · 프론트 변경 시 `build:dev` **종료코드를 변수로 받아 확인**(체이닝 금지) ·
`check-print-guard`(MainLayout) · `check-design-guard` · `check-route-guard`(IDOR) ·
`check-migration-registry` · `i18n:verify` · `check-sensitive-diff`.

### 9-2. health-check 영구 케이스 (신규 라우트)
- 공개 2개: **익명으로 200** 이 나오는지(공개가 의도임을 계약으로 고정)
- 공개 응답에 **화이트리스트 밖 필드가 없는지** — `unit_price`(B2B 도매가)·원가·재고 실수량 **부재 검증**
- 인증 5개: 익명 **401**
- **타 공급업체 자원 접근 403**(`checkSupplierCustomerAccess`)
- **가드 누출 방지** — 하류 라우트가 영향받지 않는지(상류 탐침 금지, 2026-08-28 교훈)
- **rate limit 실측** — 공개 카탈로그 연속 호출 시 제한이 실제로 걸리는지

### 9-3. API 실호출 (임시 스크립트 → 실행 후 삭제)
소비자 가입·로그인 / 공개 카탈로그 / 단품 주문+결제(sandbox) / 정기배송 구독(묶음 선결제) /
회차 생성 / zone × 배송일 묶음 조회 / 상태 전이 / **취소 → 환불 예정액 공식 검증** /
**재고 부족 시 주문 거절** / 채번 연속·삭제 후 **번호 재사용 없음** / 멱등 재제출.

### 9-4. 고장주입 (반증 — 최소 4건)
| # | 주입 | 실패해야 하는 것 |
|---|---|---|
| 1 | 조건부 UPDATE 의 `WHERE current_stock >= :qty` 제거 | 동시 주문에서 **음수 재고**가 나야 함 |
| 2 | 공개 직렬화 화이트리스트 제거 | **도매가(`unit_price`) 노출**이 검출돼야 함 |
| 3 | `checkSupplierCustomerAccess` 우회 | 타 공급업체 고객 자원 접근이 **뚫려야** 함 |
| 4 | slug 예약어 목록 제거 | `admin`·`api` 등으로 가게 생성이 **되어야** 함 |

### 9-5. 실브라우저
`headless-page-sweep` — 관리 화면 진입 크래시 0.
소비자 가게는 **모바일 뷰포트**로 별도 확인(가게 홈·상품·장바구니·결제·내 주문).
**e2e 1 시나리오 추가**(큰 변경 기준): 소비자 구매 전체 흐름 — 가게 → 상품 → 장바구니 → 로그인 → **sandbox 결제** → 주문 확인.
⛔ 운영 webhook e2e 금지 · 데모 데이터만.

### 9-6. 운영 안전
dev·데모만. 운영 반영은 Irene `/배포` 때만. 배포 후 읽기 전용 검증 쿼리 1회.
