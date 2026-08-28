## 현재 작업 상태
**마지막 업데이트:** 2026-08-28
**버전:** **v3.79** (2026-08-28 운영 배포 · Fable 판정으로 상승 — 신규 화면 + 대량 기능 = 정식 기능 배포)
**작업 상태:** 완료 — 운영 배포 + 이관 실행 + 매장 시점 실증까지 종결

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 · 2026-08-28)

**with MIN 재고 장부 정렬(이관) + 재고·업체상품 일괄 링크 도구 — 운영 배포 완료**
> Irene 원문: "git consulting에 있는 재고아이템이랑 공급업체 및 상품이 with min에도 있어야 해… 대량으로 할 수가
> 없어서 너무 불편해. 레시피 재고 업체상품도 한번에 링크걸 수 있기를 받고 싶어." / "위드민은 with MIN 브랜드야."
> / "깃컨설팅은 브랜드컴퍼니야. 브랜드제너럴이잖아. 위드민은 위드민 브랜드의 레스토랑이잖아."

- 설계 문서 `docs/STOCK_LEDGER_UNIFICATION_DESIGN.md`(613줄, `/기능설계` 6단계 완주). 실행 기록 = §14
- **배포** `EXIT_CODE=0` · 백업 `20260828_083607` · 마이그 **57/57** · 스모크 **10/10**
- **이관 batch `13381394-f0c7-469f-b94b-8a85782e8f78`**: created 226 · connected 62 · failed 0 · link_seller **305**
- **모드2 batch `04338ebd-1180-41d2-a0e2-0653ee03deb5`**: created 81 · skipped 5(기연결 4 + 담기불가 1) · failed 0
- **결과**: with MIN Cafe 재고 **157 → 460건**, 발주 가능 **66 → 432건**
- **실증**: 매장 계정 실발주 `PO-R10-20260828-001`(201, 27.90) → 삭제(200). 실브라우저 3페이지 pageerror 0
- **롤백**: `node scripts/rollback-stock-ledger-batch.js --batch=<uuid> [--apply]` (dry-run 기본)
- 정리: `supplier_companies` **36 삭제**(전참조 0 재확인 후) / **37 보존**(레거시 suppliers id=5 경유로 재료 12건이 참조 — 문서 §7)
- **원본 유래 중복 19건** 무접촉 — 목록은 문서 §14-1

**검증**: `verify-all --full` **16/16 EXIT 0** · 신규 API 실호출 14/14 · 중간 회귀 **12/12**(from-catalog 4패밀리 동작 불변) ·
rollback 반증 5/5 · **고장주입 양방향 2건** · health-check 신규 케이스 8건 추가 · 인쇄 계약 10/10 · 인쇄루트 34/34 ·
IDOR 신규 0 · design 신규 0 · i18n Errors 0. **Fable 게이트 4종 PASS + 마커 발급**.

**⚠ 내가 만든 결함 2건 (게이트가 적발 → 수정 완료)**
1. **신규 라우터가 `/api` 전체에 인증 가드를 덮어씌움** — `router.use()` 를 `app.use('/api', ...)` 라우터 최상단에 걺.
   Supplier Admin 의 `/api/supplier/*`·owner 화면이 통째로 403. mount sweep 이 적발.
   → 라우트마다 `...GATES` 부착으로 수정 + health-check 영구 케이스 추가.
   **처음에 "잔존 프로세스 탓"이라고 보고했는데 틀렸다 — 재현이 원인 규명을 대신하지 못한다.**
2. **매장 스코프 라우트에 `checkRestaurantAccess` 누락** — IDOR 정적 가드가 적발, 추가 후 신규 0.

**⚠ 내 검사기가 가짜로 통과한 사고 1건 (고장주입으로 자가 적발)**
health-check 새 케이스의 탐침을 `/api/auth/me` 로 잡았는데 **stock-ledger 보다 상류 마운트**라 결함이 있어도 통과했다.
하류 라우트(`/notices`·`/badge-counts`·`/inbox`·`/work-manuals`)로 교체 → 주입 시 실패 / 제거 시 통과 **양방향 재수립**.

**⚠ 그 밖의 내 실수 3건 (전부 자가 적발·정정)**
- 낡은 메모리를 믿고 `pending_approval` ENUM 미작성을 P0 로 올림 → 실측하니 **이미 배포 반영 완료**
- 캡처 스크립트가 connect 대상(기존 재고)까지 삭제 대상에 넣음 → FK 가 막아 손실 0, `created` 확인으로 수정
- 검증 중 `sellers` vs **`sellerSources`** 필드명 차이를 몰라 "브랜드 공유 발주 불가"로 오독할 뻔 → 코드 실측으로 정정

### 완료된 작업 (이전 세션 · 2026-08-27)

**운영 배포 1회 (05:48 UTC · 스모크 10/10 · 백업 `20260827_053408` · DB 스키마 변경 0)**

**① 발주서에 공급업체 상품명·SKU 표시** (Irene 지시 8/25 → 8/27 구현·배포)
> Irene 원문: **"발주할 때 발주관리에서는 한글이름 들어간 우리 재고표시 말고 공급업체 상품 이름으로
> 표시해야 하는 거 아니야?"** + **"기존에 발주한 발주리스트에서도 바꿔줘."**

- 공급업체에게 **실제로 나가는 문서**(인쇄본·WhatsApp·이메일)에 판매품목명+SKU 가 주(主),
  내부명은 **이름이 다를 때만** `Buyer ref:` 로 병기. 인쇄본에 **SKU 열 신설**.
- **기존 발주에도 데이터 마이그 없이 적용** — FK read-time 조인. 6월 생성 PO#170 실브라우저 확인.
- 조인을 **단일 소스** `dev-backend/utils/sellerProductIdentity.js` 로 통일 — 기존엔 같은 조인이
  `purchase-orders-crud`(sellerSource 연관)와 `seller-orders`(FK) **두 곳에 서로 다른 방식**으로 복사돼 있었다.
- 설계 근거 = `docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md` ③-4 / ⑥ P0-3 의 **미착수 잔여분**(문서에 구현이력 반영함).
- ⚠️ **내부 화면 3개(발주 상세·카트·staging)는 무접촉** — 주/부를 뒤집는 2안은 Irene 이 **아직 안 골랐다.**

**② 공급업체 발주서 Print 버튼 미동작 (검증 중 발견한 기존 결함, 함께 수정)**
- 수신함 버튼이 구매자 경로를 열었는데 공급업체 허용 경로는 `/pos/supplier/*` 뿐이라 목록으로 튕겼다.
- **프론트 가드가 두 겹**(라우트 requiredRole + AuthContext ROLE_ROUTES)이라 한 줄로는 안 고쳐진다(실측).
  → 내가 "한 줄이면 된다"고 판단했다가 틀렸고, 즉시 중단하고 Fable 판정을 받았다.
- Fable 판정 **갈래 B**: 공급업체 전용 경로 `/pos/supplier/orders/:id/print` 신설.
  **ROLE_ROUTES 무접촉 = 권한 폭 안 넓힘**(갈래 A = 구매자 경로 개방은 프론트 폭 > 서버 폭이라 기각).
  판매자 모드는 쿼리가 아니라 **경로로 강제**(`forceSellerView` — 쿼리 유실 시 반대편 API 를 때려 에러 화면).
  Supplier Staff 는 서버 `SELLER_ROLES` 밖(403)이라 **프론트에도 미추가**.
- 단일 진실 = 메모리 [[reference_frontend_route_guard_two_layers]] (이번에 신규 작성).

**검증 (양쪽 공통)** — `verify-all --full` **16/16**(mount sweep 8역할 659초, 🔒 인쇄 8/8 무접촉) ·
실 API 11/11 · 공급업체 수신함 4/4 · 역할별 seller API 실호출(SupAdmin 200 / RA 403 / BG 404) ·
**타사 발주 차단 3/3**(404·누출 0, API+브라우저) · e2e **6케이스 3회 연속** · 단위테스트 5/5 ·
**고장주입 반증 4건 전부 성립**(백엔드 조인 / 인쇄본 렌더 / 공유 문자열 / 버튼 분기) ·
design·route·dead-handler·print-field·migration-registry 신규 0 · i18n Errors 0 · 민감도 판정 **비대상**.
Fable 게이트 **PASS 확정(①② 각각)**.

**⚠️ 확인 못 한 것 (감추지 않고 명시)**
1. **A4 인쇄 종이 확인 미실시** — Irene 눈 필요. 운영 배포됐으니 운영에서 발주 1건 인쇄해 보면 된다.
2. WhatsApp·이메일 **실발송 미확인** — `window.open`/`mailto:` 라 헤드리스 불가. 문자열 계약 테스트 5/5 로 갈음.
3. draft/pending_approval 판매자 비노출 — dev 에 해당 상태 PO 없어 **확인 불가**(데이터 만들지 않음).
4. Supplier Staff 403 — dev 에 계정 없어 실호출 미확인. `SELLER_ROLES` 선언 기준 판단.
5. **SW 버전 bump 미적용** — Fable 은 배포 시 bump 를 권했으나 Irene 이 **버전 유지**를 선택.
   매장에서 "안 바뀌었다" 오면 강력 새로고침 안내 또는 bump 재검토. [[reference_sw_version_stale_bundle]]

**⚠️ 내 실수 2건 (정정 완료 — 재발 방지용 기록)**
1. **"빌드가 메모리 게이트로 거부됐는데 exit 0" 보고가 틀렸다.** `deploy-dev.sh` 는 정확히 `exit 1` 을 낸다.
   내가 명령을 `npm run build:dev; echo $?` 로 체이닝해 껍데기 종료코드가 마지막 `echo` 의 0 이 됐고
   그 값을 확인하지 않았다. 이 때문에 **고장주입 1회차가 옛 번들을 검증하는 헛테스트**가 됐다
   (번들 타임스탬프 대조로 자력 적발 → 재빌드 후 반증 재수립).
   **교훈: 종료코드는 체이닝 말고 변수로 직접 받는다.**
2. **공급업체 Print 결함을 "라우트 한 줄"로 판단했다가 틀렸다** — 가드가 두 겹이었다.
   설계와 다른 판단이 필요해진 시점에 **중단하고 Fable 에 사실만 올린 것**은 규율대로였다.

### 다음 확정 작업

**작업 3: 공급업체 B2C·구독 커머스 — 설계 대화 진행 중, Irene 답변 2건 대기.**
Irene 원문: **"공급업체에게 영업을 하고 싶어… 구독상품 기능이 추가되어야 해. 지역에 따라 해당 주문이
묶여서 발송관리도 되어야 하고… 후불이 되는 고객은 우리 솔루션 가입한 레스토랑고객으로 하라고 해서
해야 한다고 안내할까?… 이 공급업체가 싫을까? 무엇보다 레스토랑관리자 말고 발주하고 상품받고만 하는
다른 구입권한 유저를 만들어야할까?"** → **"작업 3은 기획설계 의견 줘."**

**⛔ 코드 착수 금지(Fable 지시). 설계 확정 후 `/기능설계` 6단계.**

**Fable 이 답을 기다리는 질문 2개 (다음 세션 여기서 이어감):**
1. **정기배송 결제 장치** — 첫 판을 **A(묶음 선결제 + 연장 알림)** 만 만들고 **B(카드 자동결제)** 는
   나중에 얹을까? **Fable 권고: A 먼저**(자동 카드 인출은 사고 시 바로 고객 컴플레인. A 위에 B 를
   얹으면 버리는 작업 없음). 공급업체가 자동결제를 꼭 원하면 B 부터 가도 됨(기간 증가).
2. **계정 구조 설명이 이해됐는지** — Fable 이 "여권 하나 + 가게마다 도장 카드" 비유로 설명함.

**이미 확정된 것 (Irene 발안 포함):**
- **정기배송 판매 조건(주기·묶음 단위·가격)은 공급업체가 상품 등록 때 직접 설정** ← Irene 발안, Fable 수용.
  플랫폼은 "결제 장치"만 제공. "4주치"는 Fable 이 든 예시일 뿐.
- **소비자 계정은 새로 만들 것 없음** — 이미 플랫폼 공용. 공급업체마다 아이디 만들지 않는다.
- **레스토랑 모바일오더 무접촉**, 공급업체 가게는 별도 새 페이지. 공유하는 건 로그인 하나뿐.

**계정 구조 실측 (재조사 불필요 — 내가 확인함):**
- `models/Customer.js`: `phone`·`email` **전역 unique**(컬럼 unique + 인덱스 2개). `restaurant_id` 컬럼 **없음**.
  → 같은 전화번호로 매장마다 계정 생성 **불가**. Irene 인식("자기 레스토랑에만 가입")과 실제가 다르다.
- 매장 관계는 별도 연결표 `models/RestaurantCustomer.js`: `restaurant_id, customer_id, points, total_orders,
  total_spent, loyalty_tier, first_order_at, last_order_at, points_expiring, points_expiry_date,
  reservation_count, no_show_count, last_reservation_at, allergies, birthday, vip_notes`
  → **포인트·등급·방문이력·알레르기·VIP메모가 매장별로 따로.**
- `routes/customers-auth.js`: 가입(:139~)·로그인(:24~)이 `restaurantId` 를 **선택 파라미터**로 받아
  있으면 `RestaurantCustomer` 행 생성/조회(:77-90, :246-258). 없으면 계정만 생성.
- **dev 실데이터**: 고객 34 / 매장연결 34행 / **2개 이상 매장에 연결된 고객 3명 실재**.
- 아직 미실측: `customers-self.js` 의 주문내역·계정 화면이 매장별로 갈리는지.

**기타 실측 (재조사 불필요):**
- `SupplierProduct` 컬럼에 **구독·지역 필드 0** / `Customer` 에 주소·지역 컬럼 0 /
  배송지역 개념 모델 151개 중 **0건**(`delivery_policy` 자유 텍스트뿐)
- 기존 `Subscription` 모델은 **솔루션 이용료용**(payer 에 customer 없음) → **재사용 금지, 신규 모델**
- `SupplierCompany.payment_settings`(stripe·paypal·계좌이체·QR) · `customers-auth.js` **이미 존재**
- 공급업체 상품 **옵션그룹 체계 완비**(재사용 가능) / 공급업체 카탈로그는 전부 로그인+구매자 전용
  = **소비자 공개 화면 현재 0개**

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **[별건 결함 · Fable 접수 · 지금 고치지 말 것]** 공급업체 역할에서 전역 프로바이더가 구매자용 주문 API
  (`GET /api/orders?limit=100`)를 호출해 **403 잡음**. 기존 `/pos/supplier/orders` 화면에서도 동일 발생 =
  이번 변경과 무관한 기존 결함. 데이터 누출 없음·화면 동작 정상·콘솔 잡음뿐이라 긴급 아님.
  **수정 시 절단면 = 프로바이더의 역할 게이트 추가.** e2e 계약에서 분리하고 사유를 주석에 남김.
  ⚠️ 방치하면 다음에 공급업체 화면 만지는 세션이 "403 이 뜬다"에 낚여 헛수사를 한다.
- **발주서 SKU 2안(내부 화면도 주/부 뒤집기)** — Irene 미결정. 물어보되 재촉하지 말 것.
- `docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md` ⑥ P0 **미구현 잔여**: 1(`?include=sellers` 응답에
  판매품목명·SKU 추가) · 2(재고아이템 seller-source 목록/피커 표기) · 3의 **장바구니 부라인** ·
  4(외부상품 등록 폼에 판매품목명·SKU 입력칸)
- **[Fable 설계 대기] 브랜드 재고 목록 이원화** — `ingredients`(브랜드 88) vs `product_ingredients`(286).
  단일 진실 = [[project_brand_stock_two_lists_split]]
- **[Fable 설계 대기] `linked_ingredient_id` 반쪽 구현** — 읽기만 연결을 따르고 쓰기는 전부 무시.
  **채우면 숫자가 안 움직인다**
- **[Fable 설계 대기] FG(푸드코트) 같은 어긋남** — 입고는 `ingredients`, 화면은 `foodcourt_products`
- **미배포 코드 1건** — `useInventoryData.ts` 가 브랜드 수량에 매장 값을 더하던 계산 제거.
  현재 연결이 비어 있어 운영 영향 없으나 누가 연결을 채우면 두 배로 보인다
- **[코드 결함] 상품 삭제가 발주 연결을 안 치운다** — `DELETE /api/brand-products/:id`
  (`routes/brand-products.js:1133`)가 `ingredient_seller_products` 를 그대로 둔다
- **채번을 max 기반으로** — SKU/코드가 건수 기반이라 삭제 뒤 등록하면 번호 재발급.
  운영 재고 코드에 이미 중복 12종. [[reference_count_based_code_numbering]]
- **이름 표기 통일 남은 것 — Irene 이 직접 본다(8/25 지시, 개발 대상 아님). 다시 물어보지 말 것.**
  Irene 원문: **"한글 안보이는 건 두고 가격 다른 거 둬. 내가 나중에 볼게. 레시피나 소스랑 연결하는 거나
  알아서 할게. 개발문제 아니면 넘어가. 비활성 두고."**
- 식자재 쪽 이름 중복(id 384 / 385) 정리
- Brand Manager 는 재고 목록이 전부 비어 보인다(읽기는 `owner_user_id`, 쓰기는 `brand_id` 기준)
- 데이터 작업(매장 몫): 재료 수량 입력 → 그 뒤 메뉴↔레시피 연결 84건. 순서 반대면 품절 알림 폭주
- 프로필·구독 통합 / POS 기기 고정 해제 옵션 / 흩어진 계정 통합

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
