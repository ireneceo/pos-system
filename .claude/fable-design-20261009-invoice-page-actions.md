# Fable 판정 — 청구서 화면에서 네 가지 일(올리기·보기·대조·총액 수정)을 모든 역할이 + 브랜드 발주 흐름 비교 (2026-10-09)

> Irene 원문: «브랜드제너럴도 발주하는 과정 레스토랑처럼 제대로 같이 개발된건지 비교해주고. 인보이스페이지에서는 어떤 역할이든 인보이스업로드(있을경우 재업로드) 가격확인 비교수정 인보이스 보기 기능 토탈금액 변경이 다 있어야 해. 주문내역에만 있으면 불편해. 오너 레스토랑관리자 다.»
> 입력: 팀원 실측 `~/.claude/jobs/e9818ea9/tmp/fable-input.md` · 이전 판정 `.claude/fable-design-20261007-invoice-total-fix.md` · `docs/PURCHASE_ORDER_SYSTEM.md` §8-5·§8-7
> 이 판정은 코드를 읽어 확인한 사실만 근거로 한다(운영 쓰기 0 · 개발 DB 브랜드 발주 0건이라 브랜드 흐름은 실행 검증 없음).

## 0. 한 줄 결론
**새 저장 경로 0 · 새 DB 칸 0 · 마이그 0 으로 된다.** 서버는 네 가지 일을 이미 다 할 줄 안다(올리기는 덮어쓰기까지 허용, 대조·총액 수정도 있음). 빠진 것은 ①**화면에 버튼이 없다**(브랜드·푸드코트 창은 «닫기» 하나, 오너 창엔 올리기·대조 없음, «다시 올리기»는 **어디에도** 없음) ②**누구 자격으로 부르는지**를 화면이 안 알려 줘서 오너·둘째 브랜드가 403/404 를 맞는다. 답은 **공용 조각 하나**(네 버튼을 한 곳이 정함)와 **스코프 규칙 하나**(그 청구서에 붙은 **발주의 주인**을 항상 붙임)다.
Irene 결정이 필요한 것은 둘: **오너의 줄 단가 대조 허용(10-07 D3 번복)** 과 **브랜드 매입가가 재고아이템 원가로 자동 반영**. 둘 다 Fable 권고는 «한다». 이 둘을 빼고는 전부 지금 착수한다.

## 1. 실측으로 확정한 사실 (팀원 입력에 대한 정정 2건 포함)
- **다시 올리기는 어디에도 없다.** 발주 목록 Upload Inv. 도 `canUploadInvoice = … && !row.external_invoice_url` 이라 파일이 있으면 숨는다(PurchaseOrdersPage.tsx:1001). 팀원 입력의 «다시 올리기 포함» 은 틀림. 서버 `POST /purchase-orders/:id/upload-invoice` 는 `po.update(...)` 로 **덮어쓰기를 이미 허용**(purchase-orders-workflow.js:627~) — 화면만 없다.
- **브랜드·푸드코트 청구서 화면은 데이터를 이미 다 받는다.** `/invoices/to-pay`(invoices-list.js:1066~1128) 가 `issuerIsExternal`·`invoiceCategory`·`purchaseOrderFieldsCamel(…)`(발주 id·외부 여부·올린 파일 URL·대조 시각·청구 총액·줄 기록 수)·`modificationHistory` 를 내려준다. 보기 창(`BrandInvoiceViewModal`·`FoodcourtInvoiceViewModal`)이 **버튼을 안 그릴 뿐**. 수정 이력도 브랜드 창은 이미 그린다(BrandInvoiceViewModal.tsx:327).
- **오너 목록도 칸은 있다**(routes/owner.js `attachOwnerInvoicePurchaseOrders`: `uploaded_invoice_url`·`reconcile_invoiced_lines`·`modification_history`·`purchase_order_entity_type`). 오너 창에 «올린 인보이스 보기»·«총액 수정»은 있고 **올리기·대조가 없다.**
- **빠진 칸 하나: 발주 주인 id.** `purchaseOrderFieldsCamel` 에 `purchaseOrderEntityType` 은 있는데 `entity_id` 가 없다(services/invoicePurchaseOrderAttach.js:52~71). 오너·둘째 브랜드가 «누구 자격으로» 부를지 화면이 알 수 없는 뿌리.
- **구매자 문(`middleware/buyerScope.js requireBuyerRole`)의 전환 규칙** — Brand General 은 `?entity_type=brand&entity_id=N` 이면 소유 확인 뒤 그 브랜드로(160~175), 오너는 `?entity_type=restaurant&entity_id=N` 이면 ownership 확인 뒤 **OWNER_ACTING_ROUTES 만** 그 매장으로(104~125). 매장 관리자·푸드코트는 쿼리를 **무시**하고 자기 실체로 간다 → 모든 역할이 같은 쿼리를 붙여도 해롭지 않다.
- **OWNER_ACTING_ROUTES(48~62)** 에 `upload-invoice` 가 없다 → 오너 올리기 403. `reconcile` 은 있으나 라우트가 `req.buyerIsOwnerView && total_only !== true` 면 403 `OWNER_TOTAL_ONLY`(cost-reconciliation.js:173 — 10-07 D3). 대조 화면 라우트(App.tsx:1555)에 Restaurant Owner 없음. 대조 화면의 fetch 2개(InvoiceReconcilePage.tsx:329·562)는 스코프 쿼리를 안 붙인다.
- 줄 대조의 원가 반영은 `po.entity_type === 'restaurant'` 일 때만(cost-reconciliation.js:306) → 발주 **주인 매장**에만 쓴다. 오너가 불러도 다른 매장으로 새지 않는다.
- 브랜드 발주 비교(팀원 실측 C)는 코드로 **전부 재확인했다**: #1 수령 문제분 조용히 버림(purchase-orders-workflow.js:1182 `if (split.reason !== null) continue;` — 반품·기록 0, 화면은 5버튼 그대로) · #5 제안이 `Ingredient.brand_id` 를 읽음(purchase-orders-crud.js:436 — BG 가 실제 사는 건 `ProductIngredient`, 모델에 `min_stock` 있음) · #6 재고 화면 카트 키 `pi:${id}` vs 발주 화면 `pi-${id}` + `available_sellers: []`(InventoryManager.tsx:76~96 vs NewPurchaseOrderPage.tsx:1276) · #8 재고 알림 해제 매장만(workflow 1289) · #9 드로어 문구 · 공통결함 «청구서 보기 `?id=`» vs RA `searchParams.get('invoice')`(PurchaseOrderDetailPage.tsx:1536 vs InvoicesPage.tsx:364).

## 2. 결정 — 사안 A «청구서 화면 네 가지 일, 역할 무관» (지금 착수)
**A-1. 공용 조각 하나 `components/Invoices/TradeInvoiceActions.tsx`.** 네 버튼(올리기/다시 올리기 · 올린 인보이스 보기 · 대조하기/대조 내역 보기 · 총액 수정)을 이 조각 하나가 그리고, **네 보기 창**(RA `InvoicesPage` footer · 오너 `OwnerInvoicesPage` footer · `BrandInvoiceViewModal` footer · `FoodcourtInvoiceViewModal` footer)이 같은 조각을 쓴다. RA 창에 인라인으로 있는 업로드 코드(InvoicesPage.tsx:427~457·1558~1580)는 조각으로 **옮긴다**(복제 금지). `SupplierInvoiceTotalFix` 는 조각 안에서 그대로 쓴다. 공용 Button·ConfirmModal 만(로컬 styled 금지).
**A-2. 버튼이 뜨는 조건 = 지금 `canFixSupplierInvoiceTotal` 과 같다**(거래 청구서 + 연결 발주 + 외부 공급업체 발행 + 취소 아님). 함수 하나를 네 버튼이 공유한다(이름을 넓혀 `isExternalTradeInvoice` 로 export, 기존 이름도 유지). 올리기만 추가 조건: 발주 상태 draft·cancelled 아님(`purchaseOrderStatus`). 가입 판매자 청구서는 그쪽이 발행 주체라 네 버튼 모두 없음(서버도 400/무접촉).
**A-3. 다시 올리기 = 같은 라우트, 서버 무변경.** 파일이 있으면 «보기» + «다시 올리기» 둘 다. 다시 올리기 전 확인창 1회: «기존 파일을 새 파일로 바꿉니다. 이미 적어 둔 대조·총액 기록은 그대로 남습니다.» **대조 기록(`invoice_reconciled_at`·청구 총액·줄 단가)은 리셋하지 않는다** — 파일은 증거고 숫자는 장부다, 파일을 바꿨다고 돈 기록을 지우면 안 된다. 다시 대조는 사람이 대조 화면에서 저장한다. 서버가 `external_invoice_uploaded_at` 을 갱신하므로 대조 화면의 파일 캐시 버스터(fileSrc)는 자동으로 새 파일을 본다.
**A-4. 스코프 규칙 하나 — «그 청구서에 붙은 발주의 주인».** 조각의 모든 호출(upload-invoice · reconcile · 대조 화면 이동 URL)에 `?entity_type=<purchaseOrderEntityType>&entity_id=<purchaseOrderEntityId>` 를 붙인다. 세션 저장값(`ownerPoScope`)·로그인 사용자의 primary 가 아니라 **발주 행의 값**이다. 서버: `invoicePurchaseOrderAttach.js purchaseOrderFieldsCamel` 에 `purchaseOrderEntityId`, `routes/owner.js attachOwnerInvoicePurchaseOrders` 에 `purchase_order_entity_id` **1칸씩**(SELECT 에 `entity_id` 가 없으면 그것만 더함 — 새 칸 아님). 매장·푸드코트는 서버가 무시하고, 둘째 브랜드는 소유 확인 뒤 전환, 오너는 ownership 확인 뒤 전환, System Admin 은 그 실체로 본다 — **역할별 분기 0.** `SupplierInvoiceTotalFix` 의 `ownerMode` 분기(`restaurantId` 로 쿼리 만들기)도 이 한 함수(`tradeInvoiceScopeQS(inv)`)로 바꾼다.
**A-5. 대조 화면이 스코프를 받아 넘긴다.** `InvoiceReconcilePage` 가 `location.search` 의 `entity_type`·`entity_id` 를 자기 fetch 2개(GET·POST `/api/purchase-orders/:id/reconcile`)에 그대로 붙인다. 쿼리가 없으면 오늘과 동일(발주 목록·상세에서 들어오는 기존 길 무변경).
**A-6. 오너 올리기 허용.** `OWNER_ACTING_ROUTES` 에 `['POST', /^\/api\/purchase-orders\/\d+\/upload-invoice$/]` 1줄 + 주석(2026-10-09 Fable 판정). 파일 붙이기는 되돌릴 수 있는 일이라 결정 없이 연다. **오너의 줄 대조는 §3-1 Irene 결정 뒤**(그때까지 오너 창의 «대조하기» 버튼은 숨김 — 조각에 `allowLineReconcile` 같은 플래그 하나로, 결정 나면 그 플래그만 뺀다).
**A-7. 하지 않는 것.** 발주 목록·상세의 버튼 무변경(다시 올리기를 거기에도 붙이지 않음 — 청구서 창 한 자리). 목록 행 «올린 인보이스 보기» 링크는 RA 에만 있는 지금 그대로(상세 창이 네 역할 공통 자리). 브랜드·푸드코트 창에 결제 버튼 추가 안 함(목록 행 `ExternalInvoicePayAction` 그대로 — Irene 목록에 없음). Staff 권한(RA 창의 버튼이 Staff 에게 보이지만 서버가 403)은 기존 상태 유지·기록만. 다브랜드 BG 의 **발주 화면 전체** 스코프(§8-5 백로그 #7)는 별도 사안 — 이번엔 청구서 창에서 나가는 길만 닫는다.
**A-8. i18n** `settings:invoicesPage.tradeActions.*` 4언어 + `npm run i18n:verify`. SW 버전은 프론트 변경이 다 끝난 뒤 마지막 1회.

## 3. Irene 결정 2건 (Fable 권고 붙임 — 답이 올 때까지 이 둘만 멈추고 나머지는 진행)
**3-1. 오너의 줄 단가 대조(가격 확인·비교·수정 → 그 매장 원가 반영) 허용 여부 — 10-07 D3 «오너 총액만» 번복.**
- A안(허용): `cost-reconciliation.js:173` 의 `OWNER_TOTAL_ONLY` 게이트 제거 · App.tsx 대조 화면 라우트에 `Restaurant Owner` 추가 · health-check T2 의 «줄 대조 403» 기대를 «200 + 그 매장 재료 원가 변경 + `cost_change_logs.changed_by_name` = 오너 이름 · 남의 매장 403» 으로 바꿈 · §8-5 10-05 갱신문·§8-7 D3 갱신. 수령·결제·반품 403 은 그대로.
- B안(유지): 오너는 총액 수정만, 오너 창에 «대조하기» 안 뜸(지금과 같음).
- **Fable 권고: A안.** 이유 ①Irene 원문이 «오너 레스토랑관리자 다» 로 명시 ②D3 의 근거 «장부는 매장 몫» 은 Irene 지시가 아니라 내 추론이었다 ③서버가 원가를 **발주 주인 매장**에만 쓰므로(cost-reconciliation.js:306 `po.entity_id`) 오너가 불러도 다른 매장으로 새지 않는다 ④대조는 종이 일이지 물건 일이 아니다(수령과 다름) ⑤덮어쓴 원가는 `cost_change_logs` 에 남고 다시 대조하면 되돌아간다. 되돌리기 어려운 변경이 아니다.

**3-2. 브랜드 발주의 매입가 → 재고아이템 원가(`product_ingredients.unit_cost`) 자동 반영(수령·줄 대조 둘 다) — 실측 C #3·#4.**
- 지금: 매장은 «원가 = 마지막 실제 매입가»(10-08 Irene 컨펌 ③)인데 브랜드는 수령·대조 어디서도 원가가 안 움직인다(purchaseOrderReceive.js:70~89 장부 금액만 · cost-reconciliation.js:306 매장만).
- **Fable 권고: 매장과 같은 규칙으로 한다** — 재고아이템 행 `unit_cost` 를 **기준양 가격**으로 덮어쓰고(수령·대조 둘 다, `cost_change_logs` 기록), 새 전파 코드는 만들지 않는다(§8-4 원칙: 전파는 기존 `services/costSync`·`storeCost` 경로만). 주의 1건을 붙인다: 브랜드 상품→매장 재료 동기화가 사람 결정을 덮어쓰는 미착수 문제(08-22, 메모리 project_brand_ingredient_sync_overwrite)가 있으니 **착수 세션이 재고아이템 원가가 어디까지 흘러가는지 1회 실측**해 §8-4 식으로 한 줄 적고, 매장 오버레이를 덮는 경로가 나오면 그 자리에서 멈춘다.

## 4. 사안 C «브랜드 발주 흐름 ↔ 매장 비교» 판정 + 수정 범위 (사안 A 뒤, 같은 빌드에)
**결론 — 뼈대는 같다, 갈라진 자리가 셋 고장이다.** 작성·카트·staging·보내기 3경로·판매자 표시·수령/수령+결제·Upload·대조 버튼·결제·되돌리기·영수증·개인금액·월결제·반품·사이드바는 공용 코드라 동일. 브랜드만 다른 길로 간 곳이 문제다.
**C-1. 고장 3개 — 지금 고친다.**
- #1 **수령 문제분 버림**: `/receive` 의 split 처리에서 파손·오배송→`PurchaseOrderReturn` 자동 생성, 부족·보류→줄 `discrepancy_*` 기록 블록을 재료 전용 블록 밖으로 꺼내 **재고아이템 줄도 같은 블록**을 탄다(`PurchaseOrderReturn` 은 이미 `product_ingredient_id` 를 받고, 브랜드 반품 되돌림도 이미 있음). 수량 반영은 정상분만(지금처럼). 화면 무변경.
- #5 **발주 제안이 엉뚱한 표를 읽음**: `purchase-orders-crud.js:436` 브랜드 분기를 `ProductIngredient`(`owner_user_id` = 그 BG, `is_active`, `min_stock > 0`, 현재 재고 < min_stock) 로 바꾸고, 응답 행에 `product_ingredient_id` 를 실어 발주 화면 제안 패널·«Create PO» 가 재고아이템 줄로 담게 한다.
- #6 **재고 화면 «카트에 담기»가 다른 모양으로 저장**: 카트 행을 만드는 코드를 `utils/poCart.ts` 하나로 빼서 재고 화면(InventoryManager)과 발주 화면(NewPurchaseOrderPage `namespacedKeyOf`·CartRow)이 **같은 함수**를 쓴다 — 키 `pi-${id}`, 판매자 목록은 발주 화면이 로드 시 채우거나(hydrate) 담을 때 넣는다. **착수 전 dev 에서 1회 재현**(실행 검증이 없었던 항목): 담기 → 발주 화면에서 안 보이는지 확인한 뒤 고친다.
**C-2. 작은 것 — 같은 묶음에.** #8 수령 뒤 재고 알림 해제: `StockAlert` 가 브랜드 스코프 칸을 가지면 1줄로 함께, 아니면 기록만. #9 브랜드·푸드코트 정산 창의 «열린 시프트 드로어» 문구는 `purchaseOrderEntityType !== 'restaurant'` 면 숨김. 공통결함 ① «Create PO» 가 `items=` 를 넘기는데 작성 화면이 안 읽음 → 읽어 프리필(재현 후). 공통결함 ② 발주 상세 «청구서 보기» 딥링크를 **`?invoice=`** 하나로 통일 — 상세가 `?invoice=` 를 보내고, 오너·브랜드·푸드코트 청구서 화면도 RA 처럼 `invoice` 쿼리를 읽어 그 청구서 상세 창을 연다.
**C-3. 별도 사안으로 남김.** #7 다브랜드 BG 발주 화면 전체 스코프(§8-5 백로그 그대로 — 발주 목록·상세·작성·대조에 브랜드 선택기와 쿼리 전달). #10 오너 승인은 브랜드에 해당 없음(정상).

## 5. 구현 순서 · 범위 (팀원)
1. **사안 A** 서버 2칸(attach camel·owner snake) + OWNER_ACTING_ROUTES 1줄 → 조각 `TradeInvoiceActions` + 스코프 함수 → 네 보기 창 교체(RA 인라인 제거) → `InvoiceReconcilePage` 쿼리 전달 → `SupplierInvoiceTotalFix` 스코프 통일 → i18n.
2. **사안 C-1·C-2**(백엔드 receive·suggest, 프론트 poCart·제안·문구·딥링크).
3. **Irene 답(§3)이 오면** 3-1 A안이면 게이트 제거·라우트 역할·T2 반전, 3-2 «같게» 면 receive/reconcile 브랜드 분기에 `unit_cost` 쓰기 + 로그. 답이 이 세션 안에 안 오면 **답 없이 빌드하고 게이트**, §3 은 작업기록 «답 기다림» + 상황판 asks 로 올리고 나중에 작은 묶음으로.
4. 코드 전부 확정 → **빌드 1회** → `verify-all --full` 1회 → 아래 §6 → Fable 게이트 판정 1회(이 사안 2회차 — `buyerScope` 변경이라 `check-sensitive-diff` 가 찍힌다). 🔒 인쇄 보호파일 8개 무접촉. 운영 배포는 Irene «/배포» 때만.
5. 문서(배포 뒤 — 게이트 지문): `docs/PURCHASE_ORDER_SYSTEM.md` **§8-8** «청구서 화면 네 가지 일 · 역할 무관 · 스코프 = 발주 주인 (2026-10-09 Fable 판정)» + §4 브랜드 비교 표 요약, §8-5 백로그 갱신(청구서 창 길은 닫힘 · 발주 화면 전체는 남음), §8-7 D3 갱신(3-1 답대로). `docs/RESTAURANT_OWNER_PLAN.md`·`SUPPLIER_CONTRACT_SYSTEM.md` 의 «수령·결제·원가대조 403» 문구를 답대로.

## 6. 검증 기준 (기계 게이트 + 반증 — 코드 리뷰만으론 통과 아님)
health-check(기존 픽스처 `makeExternalPoReceived`·오너 픽스처·브랜드 구매자 픽스처(§8-5 ①) 재사용, 임시 계정은 @example.com):
- **T-A1 브랜드 올리기·다시 올리기**: BG 외부 발주 청구서 → `/to-pay` 행에 `purchaseOrderEntityId` = 브랜드 id → `upload-invoice`(자기 브랜드 스코프 쿼리) 200 → total_only 대조 1회 → 다시 `upload-invoice`(다른 URL) 200 → `external_invoice_url` 바뀜 **AND** `invoice_reconciled_at`·`invoice_total` 그대로(A-3).
- **T-A2 오너 올리기**: 오너(restaurant_id NULL · 38 소유) `upload-invoice?entity_type=restaurant&entity_id=38` 200 · 쿼리 없음 403 · 남의 매장 id 403.
- **T-A3 둘째 브랜드**: BG 소유 두 번째 브랜드(픽스처 `brands.owner_id` = BG, primary 아님) 발주 `upload-invoice` — 쿼리 없음 404(기존) · 쿼리 있음 200 · 남의 브랜드 id 403. `GET …/reconcile` 도 같은 셋.
- **T-A4 가입 공급업체 무접촉**: 가입 공급업체 발주 `upload-invoice` 400 유지.
- **T-B(3-1 A안일 때만)**: 오너 줄 대조 `lines` 200 → 그 매장 재료 원가 변경(`writeStoreCost`) · `cost_change_logs.changed_by_name` = 오너 full_name · 남의 매장 403. 기존 T2 «403 OWNER_TOTAL_ONLY» 기대는 삭제.
- **T-C1 브랜드 수령 문제분**: 브랜드 발주 `/receive` 에 damaged 2 + 정상 3 + short 1 → `purchase_order_returns` 1행(`product_ingredient_id` 채워짐·auto_generated) · 줄 `discrepancy_reason='short'` · 재고아이템 재고는 **정상 3 만** 증가 · 상태 partial_received.
- **T-C5 브랜드 제안**: 재고아이템 `min_stock 10 · 현재 2` → 제안 라우트 `groups` 에 `product_ingredient_id` 로 뜸(브랜드 공유 `ingredients` 는 안 섞임).
- **T-C3(3-2 «같게» 일 때만)**: 브랜드 발주 수령(단가 5, 기준양 1) → `product_ingredients.unit_cost` 5 · 로그 1행 · 줄 대조 6 → 6 · 로그 2행.
- **고장주입 3종(의무, pm2 restart 뒤 · 보고에 재시작 여부)**: ①OWNER_ACTING_ROUTES upload 줄 제거 → T-A2 200 기대 실패 ②receive 공통 split 블록을 재고아이템에서 빼면 → T-C1 반품 1행 기대 실패 ③attach 의 `purchaseOrderEntityId` 제거 → T-A1 첫 단계 실패.
- **프론트**: 빌드 1회 → `verify-all --full` 1회(mount sweep). **실브라우저 클릭 흐름 — 네 역할 각 1회**: 청구서 상세 창 → 올리기 → 보기 → 다시 올리기(확인창) → 대조하기(화면이 열리고 저장이 200) → 총액 수정 → 목록 갱신. BG 는 **둘째 브랜드 청구서로** 1회. 가입 판매자 청구서엔 네 버튼 모두 없음. 재고 화면 담기 → 발주 화면에 보이고 보내지는지 1회(#6).
- `check-print-guard` 0건 · `check-design-guard` · `check-sensitive-diff`(buyerScope → 게이트 대상) · `npm run i18n:verify`. 미커밋 변경 있으면 덮어쓰지 않고 그 위에.

## 7. 이 판정이 안 다루는 것 (기록)
브랜드·푸드코트 보기 창의 결제 버튼 · Staff 의 청구서 버튼 권한 · 다브랜드 BG 발주 화면 전체 스코프(#7) · 오너 화면의 외부 SOA 대조 패널(현재 RA 만) · 브랜드 상품→매장 재료 동기화 덮어쓰기(08-22 미착수).
