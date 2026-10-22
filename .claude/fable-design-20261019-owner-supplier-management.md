# [Fable 설계] 레스토랑 오너 공급업체·가격 관리 · 발주/관리 권한 분리 · 브랜드 연동 끊김 확인 (2026-10-22 · 요청 10-19 방 3259bc08)

> 요청서: `.claude/fable-request-20261019-owner-supplier-management.md` · 규칙: `/var/www/CLAUDE.md` §0 · `~/dev-server/FABLE.md`
> 호출 종류: `design`(여러 화면·입구가 같은 규칙을 나눠 씀 · 권한 경계) + `decision`(Irene 컨펌 항목). **구현 뒤 `gate` 1회**(권한 경계 ⑤ · 운영 행 소유 변경).
> 코드는 고치지 않았다. 읽기·개발 DB 읽기 조회만.

## 0. 한 줄 결론

**새 실체·새 표·사본 없음.** ① 오너의 매장 업체 관리 = 이미 있는 «매장 전환»(`?entity_type=restaurant&entity_id=N`) 문을 공급업체 관리 라우트까지 여는 것(서버 1파일) ② «같은 업체를 다른 내 매장에 연결» = 매장 업체 행을 **오너 공통으로 올리기**(행 id 유지 → 소유 매장 전부가 §H-3 상속으로 같이 씀 — 브랜드처럼 복사하지 않는다) ③ 발주/관리 권한 분리 = 직원 키 `purchasing` 신설 + 서버에 공급업체 라우트 직원 게이트(지금은 **없다**) ④ 재고아이템 연결은 계속 매장(RA) 몫 — 오너 전환으로도 403 유지 ⑤ 브랜드→매장 연동은 코드·데이터 모두 끊김, 보기 전용 잔재 1종만 남음.

## 1. 코드·개발 DB 실측으로 보탠 사실 (요청서 10-19 정정·보강)

| # | 사실 | 근거 |
|---|---|---|
| 1 | **10-19 이후 변경 1건** — 외부 업체 등록 창에 배송 조건 2칸(`min_order_amount`·`delivery_fee`), 프로필 GET 에 같은 칸 실림. 이 설계와 충돌 없음 | `git show 018cb7ccb` — `AllSuppliersView.tsx` +29 · `supplier-directory.js:326` · `SupplierProfilePage.tsx` +79 |
| 2 | 오너 «매장 전환» 허용 목록은 **발주 13개 라우트뿐**. 공급업체·계약·카탈로그·재료 라우트는 전환해도 403(fail-closed). 전환 없는 오너 실체는 `/api/external-suppliers*` + `GET /api/supplier-directory/:id` + 발주 목록만 | `middleware/buyerScope.js:48-67` `OWNER_ACTING_ROUTES` · `:140-160` |
| 3 | 외부 업체 «등록자=나» 검사는 `req.buyerEntity` 로만 본다 → **매장으로 전환하면 매장 소유 업체(자기 등록·브랜드 사본)의 수정·상품·가격·삭제·켜기끄기가 코드 0줄 변경으로 RA 와 같이 돈다** | `supplier-directory.js:1257 loadOwnedExternalSupplier` · `:1281 loadVisibleExternalSupplier` |
| 4 | **브랜드 상속 분기 = 0.** 발주 자격·목록·카탈로그·보기 전부 «자기 계약 ∪ 오너 상속» 만. `shared_with_stores` 는 쓰기만 하고 읽는 곳 없음(09-27 판정대로 칸 유지) | `utils/supplierAccess.js:52-63` · `supplier-directory.js:1345-1365` · `:656-672` |
| 5 | **보기 전용 잔재 1종**: 옛 방식 `suppliers` 표(OWN) 브랜드 소유 행이 `GET /restaurants/:id/all-suppliers → brand_suppliers` 로 매장 All 탭 «BRAND SHARED» 카드가 된다. 상품·계약·발주 경로 없음(옛 방식은 상품을 못 담음). 개발 4행 — 전부 `supplier_company_id` 있어 화면에서 숨김. **운영 `suppliers` 표 brand 행 수는 요청서에 없음** | `routes/suppliers.js:433-480` · `AllSuppliersView.tsx:239-243` · 개발 DB `suppliers WHERE owner_type='brand'` 4행 |
| 6 | 개발 DB: 오너 289 = 매장 2·3 소유 · 오너 등록 업체 0 · 매장 2·3 자기 등록 외부 업체 0 · 가입 공급업체 20 계약 active 각 1 · 월결제 외부 계약 0 → **검증 픽스처는 전부 새로 만들어야 한다** | 개발 DB 조회 |
| 7 | 소유 행(`restaurant_managers ownership`)은 개발 전부 Restaurant Owner 역할. 운영 매장 10 소유자 = BG 사용자 23(요청서) — **오너 모자**(`/auth/switch-context` owner)를 쓰면 요청의 역할이 'Restaurant Owner'·`restaurant_id` null 로 투영돼 이 설계의 오너 경로가 **그대로** 적용된다(health-check «오너 모자» 가 이미 검사) | `middleware/auth.js:49-66` · `routes/auth.js:753` · `scripts/health-check.js:380` |
| 8 | 직원 메뉴 키는 6개(`menu_management · inventory · marketing · reports · support · settings`) + 작업 접근 5개. **`inventory` 하나가 Suppliers·Stock Items·Inventory·Purchase Order 를 다 연다.** 서버 직원 게이트는 `/api/purchase-orders*` 에만 있고 **공급업체·계약·카탈로그 라우트에는 직원 게이트가 없다**(어느 직원이든 API 로 외부 업체 등록·가격 수정 가능) | `components/Staff/StaffPermissionPicker.tsx:16-23` · `services/userContexts.js:79-82` · `buyerScope.js:100-106` · `MainLayout.tsx:2042-2050` |
| 9 | 매니저: 브랜드는 이미 분리(발주=`operations`, 공급업체=`products`). **푸드코트는 발주·공급업체 둘 다 `management`**. 매니저 키는 화면 전용(서버는 역할만 봄) | `MainLayout.tsx:1745·1753·1839·1849` · `BrandStaffPage.tsx:32-34` · `FoodcourtStaffPage.tsx:28-29` |
| 10 | 오너 요금제 3종 모두 `buyer_supplier_directory` 포함 → `isRouteAllowed('/pos/suppliers')` 참. 사이드바에만 항목이 없다(🔒 MainLayout) — 지금은 발주 화면 «내 공급업체» 버튼으로 진입 | 개발 DB `plan_templates(plan_target='owner')` · `addon_modules.ui_routes` · `MainLayout.tsx:1901-1916` |
| 11 | 오너 매장 전환 값은 이미 **한 곳**(`utils/ownerPoScope.ts` — sessionStorage · `withOwnerPoScope(url)`)에 산다. 발주 목록·작성·상세·인쇄가 같은 값을 본다 | `dev-frontend/src/utils/ownerPoScope.ts` |
| 12 | 공급업체 화면 5개가 부르는 구매자 라우트: `AllSuppliersView`(3) · `SupplierDirectoryPage`(2) · `SupplierProfilePage`(5) · `MySuppliersPage`(3) · `AllSupplierProductsView`(6). 전부 쿼리 없이 부른다 | 각 파일 fetch 목록 |
| 13 | `supplier_contracts` 에 (업체, 구매자) 고유 색인 없음 — 코드는 `ORDER BY id DESC` 최신 행. `supplier_companies` 에 `uq_supplier_company_live_copy(registered_by_entity_type, registered_by_entity_id, copy_live_key)` 고유 색인 있음 | SHOW INDEX |
| 14 | health-check security «오너 발주 보기 — … **공급업체 전환 403**» 이 지금 동작을 고정하고 있다 → 이 설계로 그 단언이 뒤집힌다(아래 §5 에서 고쳐 쓴다) | `scripts/health-check.js:580` |
| 15 | 오너 등록 업체는 월결제(`monthly_soa`) 거부(계약 행이 오너 것 하나라 정산서 발행기가 매장을 못 찾음, 운영 0곳) | `supplier-directory.js:118-121 · 1096-1099` |

## 2. Irene 원문 → 요구 7개와 답

| 원문 | 요구 | 답(§3) |
|---|---|---|
| «레스토랑 오너가 공급업체랑 공급업체 가격도 관리하게» | ① 오너가 매장 업체·상품·가격·계약까지 | A — 매장 전환 문 확장 |
| «재고아이템이랑 연결하는 건 레스토랑 관리자 몫» | ② 연결은 RA 만 | A — 재료·연결 라우트는 전환해도 403 **유지** |
| «발주관리에서 발주하는 거랑 관리하는 걸 권한을 나눠야» | ③ 발주 vs 업체 관리 권한 분리 | C — 직원 키 `purchasing` 신설 + 서버 게이트 · FC 매니저 메뉴 정리 |
| «같은 공급업체와 그들의 상품을 레스토랑 오너가 다른 자기 레스토랑에 연결되게» | ④ 한 매장 업체를 다른 내 매장도 | B — «오너 공통으로 올리기»(상속) |
| «브랜드제너럴에 전에 연동되던건 제대로 끊긴 건지 확인» | ⑤ 끊김 판정 | G — 끊김 + 보기 잔재 1종 |
| «오너가 발주/결제/업체관리에 주로 참여 가능하게 구조를 확인» | ⑥ 참여 구조 | F — 표(변경 없음 + 이번 추가) |
| «전체 구조도 … 다시 정리 … 클로드코드 페이지 있지?» | ⑦ 구조도 | §8 — 예, SA › Solution Issues › Dev Issues › «구조도» 탭(10-19), 원본 `dev-backend/content/structure-map.html` |

## 3. 판정 — 갈림 7개

### A. 오너의 매장 업체 관리 = «매장 전환» 문을 공급업체 라우트까지 연다 (새 실체·새 판정 함수 없음)

- **열 것** (`buyerScope.OWNER_ACTING_ROUTES` 에 추가 · 전환 = `?entity_type=restaurant&entity_id=N`, ownership 확인은 기존 코드):
  - `GET|POST|PUT|DELETE /api/external-suppliers*` (등록·수정·삭제·상품·가격·켜기끄기·청구방식)
  - `GET /api/supplier-contracts*` · `POST /api/supplier-contracts` · `POST /api/supplier-contracts/:id/terminate` (가입 공급업체 계약 신청·종료)
  - `GET /api/supplier-directory*` (찾기·프로필)
  - `GET /api/supplier-catalog` (상품 전체 보기 — 읽기)
- **닫아 두는 것(변경 없음, Irene ②)**: `/api/ingredients*` · `/api/ingredient-seller-products*` · `/seller-catalog` · `/api/product-ingredients*` · 수령·결제·반품. 전환해도 403.
- 왜 전환인가: 매장 업체는 **매장 소유 행**이다(§H-2 사본 포함). «등록자=나» 검사가 `req.buyerEntity` 하나로 돌아가므로(사실 3) 문만 열면 RA 와 똑같이 동작한다. 오너 실체에 «소유 매장 업체도 보이게» 하는 길은 판정 함수를 새로 만드는 길(매장 접근판정 4중화 → 5중화)이라 기각.
- 오너 **자기 실체**(전환 없음)의 범위는 그대로: 자기 공통 업체 등록·관리 + 발주 전체 표.
- 브랜드 사본 업체(`copied_from_supplier_company_id`)도 매장 소유라 똑같이 관리된다.

### B. «같은 업체를 다른 내 매장에» = 매장 업체를 **오너 공통으로 올리기** — 사본 금지

Irene 09-24 원문 «오너가 공급업체를 같이 관리하면 레스토랑마다 같은 공급업체 있어도 다 여러 개 나오잖아» → 브랜드식 복사는 바로 그 «여러 개» 다. 오너 = 상속(§H-3)이 이미 정석이므로, 매장이 먼저 등록해 둔 업체를 **오너 행으로 바꿔** 상속에 태운다.

- **라우트 1개**: `POST /api/external-suppliers/:id/promote-to-owner` — 오너가 **매장 전환 상태**에서 부른다(그 매장 카드의 버튼). 검사: `req.buyerIsOwnerView` + 역할 Owner · 업체가 그 매장 등록(`registered_by = restaurant,N`) · `!is_system_registered`(가입 공급업체는 계약이 매장 각자 — §H-3 «상속 안 함» 그대로 → 400 `MEMBER_SUPPLIER_NOT_PROMOTABLE`) · 그 매장 active 계약이 월결제가 아님(→ 400 `MONTHLY_BILLING_STORE_ONLY`, 사실 15) · 이미 오너 것 아님.
- **한 트랜잭션**: ① `supplier_companies.registered_by_entity_type='owner', registered_by_entity_id=req.user.id`(행 **id 유지**) ② 오너 계약 1행 `active`(매장 active 계약의 `payment_terms` 복사, `requested_by_user_id` 오너) ③ 그 매장의 계약 행 **삭제**(모든 status — §H-3 «다시 켜기 = 자기 행 삭제» 와 같은 손. 남기면 매장 active 행이 상속을 가려 오너가 꺼도 그 매장만 계속 발주한다).
- **무접촉**: `supplier_products`(상품·가격·옵션) · `ingredient_seller_products`(연결, id 그대로) · 발주 `seller_entity_id` · 청구서 `issuer_id` · 원가 이력 — 전부 업체 id 를 가리키므로 옮길 것이 **없다**(브랜드 복사 §H-2 가 옮겨야 했던 6가지가 여기선 0). `copied_from_*` 는 추적용으로 둔다.
- **자연 가드**: 같은 브랜드 원본의 사본을 두 매장에서 각각 올리면 두 번째가 `uq_supplier_company_live_copy` 위반 → 409 `ALREADY_PROMOTED_COPY`(«이미 오너 공통에 같은 원본이 있습니다 — 이 매장은 그 업체를 쓰고 이 사본은 끄세요»). 자동 병합은 하지 않는다(§H-3 §1-C).
- **결과**: 소유 매장 전부에 «FROM OWNER» 로 보이고 발주 가능 · 수정·상품·가격은 오너만(§H-3) · 올린 매장이 쓰던 연결·발주·청구서 그대로 · 매장이 원하면 자기 행 terminated 로 끄기.
- **되돌림**: 이 절단면에 «매장으로 돌려주기» 버튼은 넣지 않는다(§6-1 컨펌). 되돌릴 길은 SA 스크립트(같은 함수의 역순, 운영 사례 0).
- 원가 대조 규칙은 그대로: 매장(또는 오너가 그 매장으로 전환해)이 대조해도 `ownedExternal`(등록자 ≠ 발주 구매자)이라 오너 정가는 안 움직이고 매장 원가 층에만(§H-3 · `cost-reconciliation.js`).

### C. 발주 vs 관리 — 권한 분리

**직원(Staff)**
- 키 1개 신설 **`purchasing`** = «Purchase Orders (발주 작성·제출·내역·수령·결제)». `inventory` 는 **Stock Management (Stock Items · Inventory · Suppliers · 연결)** 로 남는다 — 라벨만 바뀜.
- 서버 (`buyerScope.requireBuyerRole` 직원 분기, 같은 자리):
  - `/api/purchase-orders*` → `purchasing` (지금 `inventory`)
  - **신설** `/api/external-suppliers*` · `/api/supplier-contracts*` · `/api/supplier-directory*` · `/api/supplier-catalog` → `inventory` (지금 게이트 0 — 열린 문을 닫는 것)
  - `/api/ingredients*` · `/seller-catalog` 는 **그대로**(주석대로 레시피 편집 직원이 막힌다).
- 키 목록 **3곳 동시**: `StaffPermissionPicker.MENU_GROUPS` · `userContexts.STAFF_PERMISSION_KEYS` · `tests/context-requests.test.js ⑪`(소스 대조).
- **백필 마이그** `scripts/migrate-staff-purchasing-permission.js`(registry `deploy`, 멱등): `permissions` 에 `inventory` 있고 `purchasing` 없는 Staff 행에 `purchasing` 추가 — 오늘 발주하던 직원이 배포 다음 날 못 하면 안 된다(§6-2 컨펌).
- 화면: `MainLayout.tsx:2042-2043` 발주 2줄 `hasMenuPermission('inventory')` → `'purchasing'` (🔒 D 와 한 번에).

**매니저** — 브랜드는 이미 분리. **푸드코트 매니저 발주 2줄 `management` → `operations`**(`MainLayout.tsx:1849-1850`) + `FoodcourtStaffPage` 라벨 «Operations (Invoices / Statistics / Customers / Coupons / Purchase Order)». 매니저 서버 게이트는 이 사안에서 만들지 않는다(현 구조 = 매니저 키는 표시 전용, 기록만).

**오너·RA** — 역할이 둘 다 가진다. 오너 쪽 «분리» 는 사이드바에서 **발주(Purchase Order·Order History) 와 공급업체(Suppliers) 가 다른 항목**이고 서버 허용 목록이 둘을 따로 든다는 것으로 충분.

### D. 오너 사이드바 «Suppliers» — 🔒 MainLayout 1회 접촉

`ownerCategories.operations.items` 에 `{ path: '/pos/suppliers', label: t('nav.suppliers'), visible: isRouteAllowed('/pos/suppliers') }` 1줄. C 의 직원 2줄·FC 2줄과 **같은 편집·같은 bless**(인쇄 보호 파일, Irene 승인 §6-4). 인쇄 코드 무접촉 — `check-print-guard.js` 지문 변경은 이 5줄뿐이어야 한다.

### E. 오너 공급업체 화면 — 범위 선택 하나

- `UnifiedSuppliersPage` 오너 분기: 상단에 범위 선택 **«내 공통 업체(전 매장)» | 매장 A | 매장 B …**(`GET /api/owner/restaurants`, 발주 화면과 같은 저장소 `ownerPoScope` — «지금 보는 매장» 은 하나).
  - **공통 범위** = 지금 오너 화면 그대로(외부 업체만 · 탭 없음 · 카드 «매장 N곳 중 M곳 사용»).
  - **매장 범위** = RA 와 같은 5탭(All · All Products · External · Contracts · Find) 전부. 5개 화면의 구매자 fetch 에 `withOwnerPoScope(url, role)` 를 붙인다(사실 12 의 19곳 — 새 헬퍼 없음, 있는 것 재사용). `AllSuppliersView`·`AllSupplierProductsView` 가 `user.restaurantId` 로 매장을 잡는 자리는 prop `actingRestaurantId` 로 받는다(`/api/restaurants/:id/*` 는 `checkRestaurantAccess` 가 오너 소유를 이미 통과시킨다).
  - 매장 범위의 **자기 등록·브랜드 사본 카드**(`scope:'own'`)에 **«오너 공통으로 올리기»** 버튼 + 확인창: «소유 매장 N곳 전부에서 쓰게 되고 수정은 오너만 합니다. 이 매장의 연결·발주·청구서는 그대로입니다.» 상속 카드(FROM OWNER)·가입 공급업체 카드엔 없음. 서버 400/409 메시지를 그대로 보인다.
- 프로필 화면(`/pos/suppliers/directory/:id`)은 별도 주소라 범위를 sessionStorage 로 이어받는다(발주 상세와 같은 방식).
- i18n 4언어(`supplier`·`supplierDirectory`·`nav`).

### F. 오너의 발주/결제/업체관리 참여 — 구조 확인 결과

| 일 | 지금 | 이번 설계 |
|---|---|---|
| 발주 작성·제출·취소·수정·인보이스 올리기·총액/줄 대조 | ✓ 매장 전환(10-05~10-15) | 변경 없음 |
| 발주 승인(오너 승인 매장) | ✓ `/pos/owner/po-approvals` | 변경 없음 |
| 청구서 결제 | ✓ 청구서 화면 `mark-paid-external`(8-5 E-2′) · 가입 판매자 Pay | 변경 없음 |
| 수령 | ✗ 물건이 있는 매장 몫 | 유지 |
| 재고아이템 연결 | ✗ (Irene ②) | 유지 — 전환해도 403 |
| 자기 공통 업체 등록·상품·가격·끄기 | ✓ 오너 실체 | 변경 없음 |
| **매장 업체·상품·가격·계약·켜기끄기** | ✗ 403 | **✓ 매장 전환(A)** |
| **매장 업체를 다른 내 매장도** | ✗ | **✓ 올리기(B)** |
| 사이드바 진입 | 발주 화면 버튼 | **Suppliers 항목(D)** |

### G. 브랜드제너럴 연동 — 끊김 판정

- **코드**: 상속 판정·목록·카탈로그·보기 모두 브랜드 분기 0(사실 4). 09-24 §H-2 그대로.
- **데이터(운영, 요청서)**: 브랜드 등록 업체 29 중 매장 연결 0 · 매장 발주 0 · 매장 지불 청구서 0 · 발행자 어긋남 0 · 매장 계약 terminated 3(전환 전 끈 흔적, 자격 없음) → **끊김.**
- **잔재 1종(보기만)**: 옛 방식 `suppliers` 브랜드 행 카드(사실 5). 팀원이 **운영 읽기 1회**로 `suppliers WHERE owner_type='brand' AND supplier_company_id IS NULL` 수를 센다 → 0 이면 `AllSuppliersView` 매장 분기의 `brand_suppliers` 카드(`source:'brand_shared'`)를 빼고 `SourceKey` 는 남긴다(브랜드 사본 표시 `copied_from_brand_at` 는 별개 — 그대로). 0 이 아니면 컨펌 §6-5 로.
- 더 하지 않는 것: `shared_with_stores` 드롭 ✗(09-27) · `GET /restaurants/:id/brand-suppliers` 라우트 삭제 ✗(다른 화면 사용 여부 미확인 — 이 사안 밖).

## 4. 절단면 (팀원 실행 · 순서 고정 · 인쇄 보호 파일은 D 의 5줄만)

1. **서버 `middleware/buyerScope.js`** — ① `OWNER_ACTING_ROUTES` 에 A 의 라우트 추가(정규식 하나씩, 주석에 이 문서 §3-A) ② 직원 게이트: `/api/purchase-orders*` → `purchasing` · 공급업체 4경로 → `inventory`(C). 파일 1개.
2. **서버 `routes/supplier-directory.js`** — `POST /external-suppliers/:id/promote-to-owner`(B). 검사 → 트랜잭션 3단계 → 응답 `{ id, scope:'owner', owner_contract_id }`. 고유 색인 위반은 409 코드로 번역.
3. **서버 키 목록** `services/userContexts.STAFF_PERMISSION_KEYS` + `purchasing` · **마이그** `scripts/migrate-staff-purchasing-permission.js`(deploy·멱등·`--dry-run`) + `migrations.registry.json`.
4. **프론트(한 번에 확정 후 빌드 1회)** — `StaffPermissionPicker.MENU_GROUPS`(`purchasing` 추가·`inventory` 라벨) · `FoodcourtStaffPage` 라벨 · `UnifiedSuppliersPage` 범위 선택 · 5개 화면 `withOwnerPoScope` + `actingRestaurantId` · 올리기 버튼·확인창 · i18n 4언어.
5. **🔒 `MainLayout.tsx` 5줄**(D + C) — Irene 승인 뒤 편집 · 실프린터 무관(인쇄 코드 0줄)이지만 규칙대로 `check-print-guard.js --bless` 는 Fable 게이트 통과 뒤.
6. **문서** — `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-4 신설(이 판정 요지 + 라우트 목록) · `docs/PURCHASE_ORDER_SYSTEM.md` 8-5 끝 «2026-10-05 갱신» 줄 아래 한 줄 · `docs/TRADE_STRUCTURE.md` ⑥ 표에 «올리기» 행 · 구조도(§8).
7. **검증(§5)** → Fable 게이트 1회 → bless → `/개발완료`. 운영 반영: 다음 배포 때(마이그 1개 포함 → 배포 게이트 대상).

## 5. 증명 기준 (게이트에서 볼 것 — 미리 정함 · 전부 데모 매장 2·3 / 오너 289 / `[확인용]` 이름)

| # | 시나리오 | 기대 |
|---|---|---|
| ① | 오너 289 가 매장 2 로 전환해 외부 업체 등록·상품 추가·가격 수정·끄기·삭제 | 201/200 · 매장 2 RA 목록 `scope:'own'` · 매장 3 에 안 보임 · **남의 매장(38) 전환 403** · 전환 없이 매장 2 업체 PUT 403 |
| ② | 전환 상태로 `POST /api/ingredients/:id/seller-sources` · `/api/ingredient-seller-products` | **403 유지**(Irene ②) |
| ③ | 매장 2 업체(상품 2 · 매장 2 연결 1 · 발주 1 · 청구서 1) 올리기 | 200 · `registered_by = owner,289` · 매장 2·3 목록 `scope:'owner'` · 연결 id·발주 seller·청구서 issuer **동일** · 매장 2 계약 행 0 · 오너 계약 1(payment_terms 복사) · 다시 올리기 400 · 가입 공급업체 20 → 400 · 월결제 계약 → 400 · 남의 매장 업체 403 · 같은 브랜드 원본 사본 2개째 → 409 |
| ④ | 직원: `inventory` 만 → `/api/purchase-orders` 403 · `/api/external-suppliers` 200 / `purchasing` 만 → 발주 200 · 업체 403 / 둘 다 → 둘 다 200 | 마이그 `--dry-run` 건수 = 실제 적용 건수 · 두 번째 실행 0건 |
| ⑤ | health-check `security` 기존 «오너 발주 보기 … 공급업체 전환 403» → **«재료 연결 전환 403 · 공급업체 전환 200»** 으로 고쳐 쓰고, ③·④ 를 새 검사 2건으로 | 395+2 |
| 고장주입 3 | ⓐ `OWNER_ACTING_ROUTES` 추가분 제거 → ① 실패 ⓑ promote 의 «그 매장 등록» 검사 제거 → ③ 남의 매장 200 ⓒ 직원 공급업체 게이트 제거 → ④ 업체 403 이 200 | 셋 다 ✗ 가 떠야 한다 |
| 실브라우저 | 오너 데모 → `/pos/suppliers` 범위 선택 → 매장 2 → 등록 → 올리기 → 공통 범위에 보임 · RA 매장 3 에 FROM OWNER · 직원 사이드바(purchasing 유/무) · `verify-all --full` 1회 | 콘솔 오류 0 |

가드 스크립트: `check-print-guard.js`(MainLayout 5줄 외 변경 0) · `check-sensitive-diff.js`(권한 경계 → FABLE 게이트 대상 — 정상) · `check-migration-registry.js`.

## 6. Irene 컨펌 항목 (각각 Fable 권고 첨부)

1. **올리기의 되돌림** — A) 이 절단면엔 없음, 필요하면 SA 스크립트 · B) «매장으로 돌려주기» 버튼도 함께. **Fable 권고 A** — 운영 사례 0 이고 돌려주는 길(같은 함수 역순)은 열려 있다. 버튼을 두면 올렸다 내렸다 하며 다른 매장 연결이 끊기는 길이 생긴다.
2. **직원 `purchasing` 키 신설 + 기존 `inventory` 직원에게 자동 부여** — A) 자동 부여(오늘 발주하던 직원이 내일도 됨) · B) 부여 없이 RA 가 다시 체크. **Fable 권고 A.**
3. **푸드코트 매니저 발주 메뉴를 Management → Operations 로** — **권고 예**(브랜드와 같은 모양, 화면만).
4. **🔒 MainLayout 5줄 접촉 승인**(오너 Suppliers 1 · 직원 발주 2 · FC 발주 2) + Fable 게이트 뒤 bless. **권고 승인** — 인쇄 코드 0줄.
5. **옛 방식 브랜드 공유 카드(보기 잔재)** — 운영 수가 0 이면 **권고 제거**(보기만 남은 잔재는 «끊겼다» 를 흐린다). 0 이 아니면 그 수와 함께 다시 묻는다.
6. **오너 공통 업체의 월결제** — 지금처럼 거부 유지(올리기도 월결제 매장 업체는 거부). **권고 유지**, 필요해지면 별건(계약 행을 매장별로 두는 설계가 따로 필요).

## 7. 하지 않는 것 (기록)

- 오너 실체에 매장 업체를 «합쳐 보이는» 새 조회 ✗(판정 5중화) · 사본 ✗ · 자동 병합 ✗ · 매니저 서버 게이트 ✗ · `shared_with_stores` 드롭 ✗ · `brand-suppliers` 라우트 삭제 ✗ · 오너 수령·재료 연결 ✗ · 월결제 오너 업체 ✗.

## 8. 구조도 반영 지시 (`dev-backend/content/structure-map.html` · 표시 규칙 그대로)

1. **변경 기록 맨 위** `log-row` 추가 `2026-10-22`(지금은 `tag-wip`, 완료·배포 뒤 `tag-new` 로 바꾸고 날짜 줄 갱신):
   - «**오너 공급업체 관리** — 오너가 소유 매장으로 전환해 그 매장의 업체·상품·가격·계약까지 관리(재고아이템 연결은 매장만)» `tag-wip`
   - «매장 업체를 **오너 공통으로 올리기** — 행 하나를 소유 매장 전부가 상속(사본 아님), 연결·발주·청구서 무접촉» `tag-wip`
   - «직원 권한 **발주(purchasing) / 재고·업체 관리(inventory)** 분리 · 서버에 공급업체 라우트 직원 게이트 신설» `tag-wip`
   - «브랜드→매장 공급업체 연동 끊김 재확인(코드 분기 0 · 운영 사용 0) — 옛 방식 카드 1종만 보기로 남음»
2. header eyebrow `… → 09-30 보완` 뒤에 `→ 10-22` · lede 에 «10-22 보완에서 **오너·공급업체·발주 권한** 표를 더했습니다».
3. **새 절** «오너 · 공급업체 · 발주 — 누가 무엇을 <span class="tag-wip">10-22 진행 중</span>» 을 «공급업체 활성/비활성» 절 **앞**에. `rule chg` 한 줄: «오너는 **자기 공통 업체**(상속) + **매장 전환**(그 매장 자격)으로 관리 · 재고아이템 연결은 매장만 · 발주와 업체 관리는 직원 키가 다르다». 표(`tw`) — 행: 업체 등록·수정·상품·가격 / 가입 공급업체 계약 / 켜기·끄기 / 재고아이템 연결 / 발주 작성·제출 / 수령 / 청구서 결제 / 오너 공통으로 올리기 — 열: 매장 관리자 · 오너(공통) · 오너(매장 전환) · 직원 `purchasing` · 직원 `inventory`. 값은 §3-F 표와 §3-C 대로(✓/✗/«오너만»). 표 아래 `n-note` 식 한 줄: 서버 단일 소스 `middleware/buyerScope.js OWNER_ACTING_ROUTES` · 상속 판정 `utils/supplierAccess.findParentContract`. (새 SVG 는 만들지 않는다 — 표로 충분.)
4. **«공급업체 활성/비활성» 표**에 `tr.wip` 행 추가: «매장 업체를 오너 공통으로 올림 <span class="tag-wip">10-22</span> | 이후 끄기·켜기는 «오너가 등록한 외부» 행과 같음 | 업체 행 id 유지 · 올린 매장의 계약 행은 삭제(상속으로) · 연결·발주·청구서 무접촉 · 같은 원본 사본 두 번째는 거부».
5. **«지금 정석과 다른 곳»** 에 `flag wip` 추가: «브랜드→매장 옛 방식 공유 카드가 아직 보인다(보기만) — 운영 수 확인 뒤 제거 예정». 기존 flag «외부 공급업체 가격 수정도 같은 문이 열려 있다 — 보완 대상» 은 그대로(이 사안 밖).
6. footer 날짜 열거에 «오너·공급업체 권한은 **10-22**(개발 중)» 추가.
7. 구현이 끝나 배포되면: 위 `tag-wip` → `tag-new`, `flag wip` → 잔재 제거했으면 `flag done`, 변경 기록 날짜 줄 갱신 — 같은 커밋에서.

## 9. 팀원에게 (사실 전달 요청 2건 — 설계 전제 확인)

- 운영 읽기 1회: `SELECT COUNT(*) FROM suppliers WHERE owner_type='brand' AND supplier_company_id IS NULL` (§3-G 잔재 수). 쓰기 없음.
- 구현 중 설계와 다른 판단이 필요해지면 즉시 중단하고 이 문서 경로와 사실만 돌려보낸다.

## 10. 게이트 정정 (2026-10-22 · Fable 게이트 `fable-gate-20261022-owner-supplier-management.md`)

- **§3-C 구멍 1개**: «공급업체 4경로 → `inventory`» 로 적었는데, 발주 작성 화면(`NewPurchaseOrderPage.tsx` `fetchCatalog`)의 상품 목록이 `GET /api/supplier-catalog` 다 → `purchasing` 만 가진 직원은 카탈로그가 403 이라 **발주를 만들 수 없었다**(팀원 실호출 ④ 의 «purchasing 만: 업체 403» 이 바로 그 값). 설계 자체의 오류.
- **정정(게이트에서 Fable 이 직접 적용)**: 공급업체 4경로의 **읽기(GET)** 는 `inventory` 또는 `purchasing` · **쓰기(POST/PUT/DELETE)** 는 `inventory` 만. 분리의 뜻(«발주하는 것» 과 «관리하는 것»)은 그대로 — 관리 = 쓰기. 바뀐 곳: `middleware/buyerScope.js` 직원 분기 · health-check «직원 발주/업체 권한 분리» · 증거 스크립트 ④ · 구조도 표 «보기» 행 · `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-4. 화면 변경 0(사이드바는 그대로 — Suppliers 메뉴는 `inventory` 만).
- 알려진 결과: 청구서 화면의 «외부 월정산서 발행» 단추(`ExternalSoaIssueButton`, `GET /api/external-suppliers`)는 이제 `inventory`·`purchasing` 어느 것도 없는 직원(예: `support` 만)에게는 숨는다(403 → 목록 0 → 단추 없음, 오류 아님). 전엔 직원 게이트가 없어 누구나 보였다. 이 사안 범위 밖 — 필요해지면 별건.
