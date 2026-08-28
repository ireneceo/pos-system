## 현재 작업 상태
**마지막 업데이트:** 2026-08-28 #2
**버전:** v3.79 (2026-08-28 배포). 이번 배포는 버전 미상승 여부를 Irene 이 결정 — 물어보지 못하고 세션 종료
**작업 상태:** 완료 (배포 실행함 — 게이트 16/16 통과 · Fable 마커 dc387b4ffebb)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- PO-10 중복 줄 3건 삭제 (운영) — 9줄 → 6줄, 209.70 → 195.70. "두번씩"의 원인 확정(08-27 08:50·09:48 두 번 담김)
- 발주 수량 병합 패치 적용 — draft 한정, 실호출 10/10 + 고장주입 반증
- 발주 메일 품목표 — `sellerOrderReceivedEmail`·`poApprovalPendingEmail`, items optional, 20줄 상한
- 수량 소수점 제거 7곳 — 공용 `formatQuantity` 통일
- 메뉴명↔페이지 제목 i18n 통일 4개 언어 (`supplier:orders.title`)
- 배포 스크립트 마이그 else 분기 fail-loud (신규 마이그 첫 실행 실패를 삼키던 구멍)
- 운영 실측 5건 — 판매가 오염 / 중복 연결 41종 / pending_approval ENUM 부재 / 알림 누락 1명 / B2B 리포트 부재

### 다음 확정 작업
- **운영 판매가 오염 정리** (아래 🔴 섹션) — Fable 판정 B″ 확정, **Irene 승인만 남음**
- **Irene 미답변 2건**: ①오늘 등록 14종 유지/철회 ②`irene@gitconsulting.group` 의 `is_test` 해제 여부
- **판매 주문(B2B) 매출·원가 리포트** — Fable 설계 완료, Irene 승인 대기. **착수 조건 = 판매가 오염 정리 완료 후**

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 배송 담당자 등 **계정 없는 사람에게 발주 알림** — 판매자 엔티티에 "발주 알림 추가 수신 이메일" (Fable 설계 있음, 미구현)
- 알림 수신자 조회가 `is_active` 미필터 → 비활성 관리자도 수신 / `getBrandManagerIds` 가 `users.brand_id` 단일이라 다중 브랜드 소유자 누락 가능
- `routes/seller-orders.js:327` 구매자 "Order Confirmed" 메일에도 품목표
- draft 장바구니 라인의 담은 날짜 표시
- 판매자 라인 단위 품절/문제 처리 (⛔ `discrepancy_*` 재사용 금지) — `docs/PURCHASE_ORDER_SYSTEM.md` 백로그
- 발주 메일 다국어 (현재 영어 하드코딩 — 기존 템플릿 관례 준수)

### 다음 섹션에서 이어서 할 것 (Irene 지시)

**A. 공급업체 없는 재고 12건 연결** — Irene: "지금 건 다음에 할게. 섹션에 할게."
Irene 이 각 품목의 매입처를 알려주면 연결한다(IKEA 흐름 재사용: 공급업체 등록 → 공급업체 상품(원가) → 거래처 연결).
목록: Anchovy Soup Stock(멸치육수) · Bread_Hokkaido · K-Bulgogi 1kg · K-DINE Hat · K-DINE T-Shirt 2XL/XL ·
K-Yukgaejang Beef 1kg · 양조간장 · Matcha Powderr · 간마늘 · Rice-Jasmin 5kg · (+1건 재확인)

**B. 판매가 0인 프로덕트 채우기** — 원가가 0으로 등록돼 있어 판매가도 0이 된 것들. Irene 이 채운다.
목록 = `docs/archive/2026-08-28-stock-ledger/bp_class.json` · `ugs_registered.json`
화면에 **"판매가 미설정"·"원가 미설정" 배지**가 뜨므로 바로 골라낼 수 있다.

### 🔴 다음 섹션 최우선 — 운영 판매가 오염 정리 (Irene 승인 대기)

**무슨 일이 있었나:** 이번 세션에 UGS 공급업체 상품을 GIT Consulting(brand 1) 판매상품으로 등록하면서,
**공급업체 원가를 판매가 자리에 그대로 복사**했다. 마진을 붙이는 단계가 등록 스크립트에 없었다.
- 증거: `docs/archive/2026-08-28-stock-ledger/ugs_registered.json` 55행 — `supplier_products.unit_price` → `brand_products.unit_price` 직결.
- 실측: 중복 41종 **전부** 오늘 등록 가격 == UGS 원가(41/41). 옛 7/5 상품이 마진 붙은 실제 판매가(원가의 약 1.1~1.24배).
- **코드 결함 아님** — 공급업체상품→브랜드상품 등록 라우트가 아예 없고(`routes/brand-products.js` 에 `supplier_product_id` 0건),
  `utils/catalogLink.js` 의 가격 처리(`unit_price = 판매자 상품 행의 unit_price`)는 설계대로다. 원인은 일회성 스크립트.
- **PO-10(195.70)이 원가로 제출된 상태.** 이미 판매자에게 노출됨.
- Irene 이 앞서 "위드민에 판매가가 나오는 거 맞아? 원가 아니지?" 라고 물었을 때 내가 "판매가 맞다"고 답한 것이 **틀렸다**.

**중복이 생긴 기계적 원인:** `catalogLink.js` 의 `connectExisting()` 중복 판정 키에 `seller_product_id` 가 들어 있다.
같은 재료 × 같은 판매자라도 **상품 행이 다르면** 중복으로 안 보고 새 링크를 만든다. 중복 41건 전부 seller_product_id 상이.
이름 정규화 매칭도 못 잡았다 — 괄호 안이 한글 설명(`(영수증 페이퍼롤)`) vs 포장단위(`(10ROLLS X 10PKTS)`)로 갈리고 대소문자도 다름.

**Fable 최종 판정(B″) — 승인 나면 이 순서 그대로:**
1. 백업 확인
2. **PO-10 취소** → 같은 품목을 7/5 판매가로 draft 재작성(제출은 Irene 이)
3. 오늘 등록분 링크(A 대역) 삭제 — PO-10 참조 4건 선행 해소 후
4. 중복 상품 41종 삭제/비활성 — FK 3테이블 전수 확인 필수:
   `brand_product_brands.product_id` · `brand_product_option_group_products.product_id` · `brand_product_restaurants.product_id`
5. 철회 확정분 제거
6. 증명 쿼리 4종: 중복 활성링크 0 / A대역 잔존 0 / FK 무결성 / 판매가 0·역마진 잔존 수
- ⛔ **0.00 백필 금지** — 오늘 쪽 가격은 원가라서 판매가 자리에 옮기면 마진 0 을 심는다.

**오늘 등록 55종 분류 (숨은 중복 재검증 완료 — 14종 전부 숨은 중복 0건, 연결 재료 기준 대조)**
- 중복 41종 → 제거
- 비중복 14종 → Fable 권고: **유지 4종**(bp 212 갈색 천끈 · 213 12OZ 종이컵 · 218 컵 누수방지 페이퍼 · 237 냅킨 — 테이크아웃 포장 부속) /
  **철회 10종**(187·229 주방세제 · 189 키친타월 · 200 세척액10L · 202 핸드클렌저 · 226·227 오븐클리너 · 228 표백제 · 232 탈취제 · 230 양초 — "판매상품은 패키지랑 소스" 범위 밖)
- **Irene 미답변**: 14종 유지/철회 판정

**가격 정비 목록 25종 (Irene 이 화면에서 채워야 함 — 우리가 정하지 않는다)**
- 역마진 1종: 플라스틱 소스통(L) 원가 8.00 / 판매가 6.50
- 판매가 0 이 24종. 원가가 있는 15종 = 손잡이 종이백 150 · 반반 도시락박스 23 · 갈색 종이 밥그릇(L) 23 · 컵받침 2컵용 18 ·
  사각 플라스틱통 16 · 실리콘장갑(M) 16 · 구멍 손잡이 종이백 12.5 · 음료컵(아이스용) 12 · 갈색 천끈 10.5 · 종이받침 10 ·
  빙수컵 종이 9.9 · 컵덮개 9 · 냉장고용 봉투 7.5 · 비닐봉투(L) 6.5 · 소스통(M) 5.5. 나머지 9종은 원가도 0.
- 유지 확정되는 신규 4종도 가격이 원가 그대로 → 이 목록에 포함
- 전체 데이터: 운영 `/tmp/price-fix-list.json` · `/tmp/cleanup-plan.json`

**재발 방지 2건 (dev 코드 트랙 — 판매 주문 리포트 사이클에 배포)**
1. `catalogLink.js` 활성 연결 유니크 가드 — **같은 재료 × 같은 판매자 = 활성 연결 최대 1개**(상품이 달라도). DB 부분 유니크 제약은 운영 마이그라 리포트 마이그와 같은 사이클.
2. 신규 기능 "공급업체 상품 → 자기 판매상품 등록" 화면. 설계 원칙 확정: **원가는 참고 표시, 판매가는 별도 필수 입력, 마진 즉시 표시.**
3. 규율: 운영 DB 에 쓰는 일회성 스크립트는 그 자체가 운영 쓰기 → 실행 전 스크립트 내용(특히 가격·수량 컬럼 매핑)을 Fable 검토에 올린다. **이번 사고의 진짜 뿌리는 코드가 아니라 이 절차 부재.**

### 다음 섹션 — 판매 주문(B2B) 매출·원가 리포트 (Irene 승인 대기)

Irene 원문: "이 브랜드제너럴이 판매한 이 세일즈오더의 주문에 대한 매출하고 원가관련 리포트는 어딨어? 공급업체도 필요한 건데."

**실측 결론: 없다.** 기존 Reports 6탭(BG/FG/Owner/Restaurant)은 전부 매장 POS `orders` 기반.
판매자 측 집계는 `GET /api/seller-orders/stats` 하나뿐이고 **건수 카운트만** — 금액 SUM 이 라우트 어디에도 없다.
**공급업체는 Reports 메뉴 자체가 없다.**

**Irene 이 확정한 원가 2경로 (RA·BG 공통 — 정책 분기 없음. 평균가/특정가 질문 철회됨):**
1. **재판매 상품** → 공급업체가 가진 가격이 그대로 원가 (`ingredient_seller_products` 의 `seller_type='supplier'` 행 `unit_price`)
2. **레시피 있는 프로덕트** → 레시피 재료비 합계가 그 프로덕트의 원가
> Irene 원문: "브랜드제너럴에 공급업체가 가진 가격이 원가지" / "레시피가 가진 재료비 통합이 해당 프로덕트 원가고" / "이렇게 2가지 경로가 있잖아.레스토랑도 브랜드제너럴도"

**Fable 설계 절단면:**
- 대상 = 판매자 3역할(Supplier Admin · BG · FG). BG·FG 는 기존 Reports 에 **"Sales Orders" 탭 1개 추가**, Supplier 는 **Reports 메뉴 신설**(사이드바 + App.tsx 라우트 + 두 겹 가드를 supplier 네임스페이스에 신설, 기존 라우트 폭 넓히기 금지 — [[reference_frontend_route_guard_two_layers]])
- 매출 = `buildSellerWhere` 스코프 + `SELLER_HIDDEN`(draft·pending_approval) 제외 + cancelled 제외, `purchase_order_items.line_total` SUM
- 원가 = `purchase_order_items.unit_cost_snapshot` **신설**(제출 시점의 공급업체 가격 박제, 멱등 마이그 + registry 등록). 과거 행은 현재 원가 폴백 + 화면에 한계 명시
- API 신규 `routes/seller-orders-reports.js`: `/reports/summary` `/by-buyer` `/by-product` `/trend`. `buildSellerWhere` 등은 utils 로 추출해 공유
- UI: StatCard 4장(매출/원가/이익/마진율) + DateRangeField + 구매자별·상품별 DataTable + 추이. 용어는 **원가/판매가 두 단어만**
- 검증: summary = by-buyer 합 = by-product 합 교차검증 / IDOR / draft·pending_approval·cancelled 제외 / health-check 케이스 추가
- **착수 조건: 위 판매가 오염 정리 완료 후** (오염된 가격 위에 리포트를 얹지 않는다)

### 2026-08-28 이번 섹션 실행 기록

**1. PO-10 중복 줄 정리 (운영 DB, 배포와 무관)**
- Irene 지시: "이것만 남기고 삭제해줘"(50~55 목록) → "이거 삭제 안되었어"(40·41·42 목록)로 대상 확정.
- 삭제: `purchase_order_items` 40(갈색 천끈 0.00) · 41(Glass Noddle 14.00) · 42(컵덮개 0.00).
- PO-R10-20260827-001: 9줄 → **6줄**, subtotal/total **209.70 → 195.70**(라인합계와 일치 확인).
- 스냅샷: `po10_before.json`(12줄 시점) + 운영 `/tmp/po10_before_delete_40_41_42.json`.
- **"두번씩"의 실체 확정**: 스냅샷에 ingredient 480·481·482 가 각각 2줄씩(08-27 08:50 / 08-27 09:48) 있었다.
  같은 품목을 다시 담으면 줄이 새로 생기던 동작 때문. Irene 이 46·47·48 을 손수 지웠고(−14.00), 남은 40·41·42 를 내가 지웠다.
  → **병합 패치가 정확히 이 재발을 막는다.**
- ⚠ "배포 안 해서 삭제가 안 된 것"이 아니다. 운영 DB 작업이라 배포와 무관하며, 대상이 두 갈래로 읽혀 보류했던 것.

**2. 발주 메일 품목표** — Irene: "이메일에 내역이 다 나와야지. 굳이 들어가야만 보이면 불편하지."
- `utils/poEmailItems.js`(신규) — 알림 경로 전용 로더, 실패해도 throw 안 함(빈 배열).
- `utils/notificationTemplates.js` — `poItemsTable()` 추가, `sellerOrderReceivedEmail`·`poApprovalPendingEmail` 에 `items` **optional** 인자.
  안 넘기면 기존과 동일 출력(계약 불변, 실측으로 확인). 20줄 상한 + "+N more item(s)". 표 하단 합계는 PO 총액 우선(헤더와 불일치 방지). HTML 이스케이프 적용.
- 호출부 3곳 전달: `routes/purchase-orders-crud.js` · `services/poNotifications.js` ×2.
  (`routes/seller-orders.js:327` 은 구매자용 확인 메일을 자체 조립 — 품목표 대상 아님.)
- 라벨은 영어 하드코딩 — 기존 템플릿(`wrapTemplate(..., 'en')`, 'PO Number'/'Buyer'/'Status')과 같은 관례.
- ⚠ **실발송 1회는 미실행** — 수신처가 Irene 실주소라 확인 필요. 조립 경로는 실제 로더+템플릿으로 검증(3건 렌더 확인).

**2-b. 수량 소수점 제거 (Irene: "수량인데 소수점이 어딨어")**
공용 `formatQuantity`(정수면 소수점 제거·소수면 유지)로 7곳 통일 — 판매자 주문접수(IncomingOrdersView) ·
발주목록 추천수량(PurchaseOrdersPage) · 공급업체 재고이동(SupplierInventoryPage) · 레시피 재료수량(RecipesTab ×2, ProductRecipesTab ×2).
금액 계산 무접촉(diff 12줄, orderTotals/line_total/unit_price/subtotal 관련 0줄).

**2-c. 메뉴명↔페이지 제목 통일 (Irene 지적)**
`/pos/brand/general/incoming-orders` 메뉴는 "Sales Orders" 인데 페이지 제목이 "Live Orders" 였다.
원인은 하드코딩이 아니라 i18n 값 불일치 — `supplier:orders.title`. 4개 언어를 `common:nav.salesOrders` 와 같게 맞췄다
(en "Sales Orders" / ko "판매 주문" / zh "销售订单" / ms "Pesanan Jualan"). 소비처는 IncomingOrdersView 한 곳(브랜드·푸드코트·공급업체 공용).

**2-d. 관리자 다중 수신 실측 (Irene: "관리자가 여럿이면 메일 알림 같이 못 받냐고 물은 거야")**
구조는 **전원 발송**이 맞다 — 브랜드=Brand General+Manager 전원, 공급업체=Supplier Admin+Staff 전원, 오너=매장 오너 전원.
단 **개인별 관문 6개**(email 없음 / email_verified=false / **is_test** / 데모·테스트 매장 소속 / 개인 알림설정 OFF / SMTP 미해결) 중
하나라도 걸리면 그 사람만 조용히 빠진다.
**실측 결함**: GIT Consulting 관리자 2명 중 `irene@gitconsulting.group`(user 11) 이 **is_test=1** 이라 발주 알림을 못 받는다
(`help@gitconsulting.group` 만 수신). 로그 `[Notification] Skip: user 11 is_test account`. **Irene 지시 대기 — is_test 끄면 둘 다 수신.**
후속 후보 2건(Fable): ①수신자 조회가 `is_active` 를 안 걸러 비활성 관리자도 수신 ②`getBrandManagerIds` 가 `users.brand_id` 단일 컬럼 기준이라 다중 브랜드 소유자는 누락 가능.

**3. 운영 ENUM 재실측 — `pending_approval` 아직 없음**
메모리에 "해결됨"으로 적혀 있었으나 **틀렸다**. 두 계측기로 재확인. 마이그·레지스트리 등록·운영 파일은 전부 정상.
원인 후보: 배포 마이그 루프의 **else 분기(운영에 파일 없을 때)가 `|| true` 로 첫 실행 실패를 삼킨다.**
파일이 이미 운영에 있으므로 다음 배포는 fail-closed 인 if 분기를 탄다 → 배포 후 ENUM 재확인 필수.

**D. 백로그 — Irene 이 "지금 방식 문제 없어"로 닫은 것 (요청 오면 꺼낸다)**
1. ~~같은 품목 재담기 시 수량 합산~~ → **2026-08-28 Irene 지시로 적용 완료**("앞서 만든 병합 패치 적용해").
   실호출 10/10 PASS + 고장주입(병합 분기 무력화) 시 4건 실패로 반증 성립. draft 한정(WHERE status='draft')이라
   submitted PO 는 무접촉 — 경계도 실호출로 확인. 배포 대기.
2. **draft 장바구니 라인의 담은 날짜 표시** — 어제 담은 게 오늘 제출에 섞여 나가는 것을 보이게. 미착수.
3. **판매자 라인 단위 품절/문제 처리** — 지금은 판매자가 **주문 전체 거절만** 가능하고,
   품절 품목 하나만 빼고 사유를 보내는 경로가 없다. 구매자도 라인 단위 빼기 UI 없음(백엔드 PUT 은 허용).
   ⚠ 설계 시 **`discrepancy_*` 재사용 금지 방향** — 그건 구매자 입고 검수용 필드다.
   판매자 발송 전 처리는 라인 상태 신설(예: `removed_by_seller` + 사유)이 맞다.

**E. 발주 알림 이메일에 품목 내역 넣기 (Irene 요청, Fable 판정 대기)**
> "이메일에 내역이 다 나와야지. 굳이 들어가야만 보이면 불편하지."
`utils/notificationTemplates.js:513 sellerOrderReceivedEmail` 이 **PO번호·구매자·총액·상태만** 보내고
**품목 목록이 없다**(함수 인자에 items 자체가 없음). 호출부 = `routes/seller-orders.js` 340·552·619·669.
같은 파일 `infoTable`/`infoRow` 재사용 가능. ⚠ 이 템플릿은 `wrapTemplate(..., 'en')` **영어 고정**.

**C. 작업 3(공급업체 소비자 커머스) 재개** — 설계 6단계 완주·Fable PASS, 백엔드 골격까지 구현됨.
중단 지점 = **주문·구독 생성 라우트 이후**(스케줄러·알림·프론트·i18n·health-check 케이스 남음).
코드는 커밋 `f87cd631` 에 있고 **운영에는 스키마만 배포**(표 6·컬럼 10·ENUM 5값, 쓰는 코드 0).
설계 문서 = `docs/SUPPLIER_CONSUMER_COMMERCE_DESIGN.md`

### 진행 중인 작업
- 없음 (배포 대기 중인 것 없음)

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
