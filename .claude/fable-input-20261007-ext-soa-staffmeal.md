# Fable 입력 — 10-04 잔여 3건 (2026-10-07 · 팀원 실측 · [Claude Code · 백그라운드 작업방 359d0949])

작업 지시(작업기록 «다음 확정 작업» 7번): «(10-04 잔여) 외부 공급업체 월별 SOA 대조 · 발주 스탭밀 구분 · 승인 메일 문구(외부 공급업체에 «보냈습니다» 거짓)»
기계적 제약: 운영 쓰기 0 · 운영 배포는 Irene 지시로만 · 이번 방은 설계 + 바로 할 수 있는 것만.

---

## A. 외부 공급업체 월별 SOA 대조

### Irene 원문 (2026-10-04)
「외부공급업체 중에 1달 기준으로 SOA 보내는 곳이 있어. 이것도 정리한 후 SOA 결제 인보이스 뜨게 하고 최종 받은 SOA랑 대조해서 결제정리할 수 있게 해줄 수 있어?」

### 기존 원칙 (메모리·문서)
- 외부 공급업체(`supplier_companies.is_system_registered=0`)는 **업로드한 인보이스가 원본**, 우리가 수령 때 자동 발행한 `TRD-SUP*` 청구서는 추정치. 결제는 **체크만**(`POST /invoices/:id/mark-paid-external`, 게이트웨이 400). (Irene 2026-09-08 「외부공급업체는 결제했는지 안했는지도 모르잖아 … 업로드된 인보이스가 진짜인거지」)
- SOA = 별도 청구서 행(`invoice_category='soa'`, 자식 `parent_soa_invoice_id`), 월결제면 Pay 는 SOA 에만, 자식은 숨기지 않음(feedback_invoice_soa_unified). 정산서엔 확정 주문 전부(feedback_soa_includes_all_confirmed_orders).

### 코드 실측 (dev)
- 자동 SOA: `services/soaScheduler.js` `processMonthlySoa`(L419) 매일 00:30, 세 갈래 — 공급업체(L476-498, `SupplierContract.payment_terms.invoice_cycle==='monthly_soa'`, is_system_registered 미검사) · 브랜드 · 푸드코트. `issueSoaForPair`(L163)는 같은 발행자·지불자 trade 청구서 중 `parent_soa_invoice_id IS NULL`·미결제를 묶어 SOA 행 생성(L197-262).
- 수동 발행 `generateSoaNow`(L600) = 브랜드·푸드코트만(공급업체면 `bad_issuer_type`). **구매자 쪽에서 SOA 를 만드는 경로는 없다.**
- 월결제 판정 `utils/payViaSoa.js monthlySoaTermsFor`(L20-59): 공급업체 발행자가 `!is_system_registered` 면 **null**(L24-25, 주석 L10-11 «외부는 SOA 도 게이트웨이도 없고 체크만»).
- 외부 공급업체 결제조건 자리: 구매자가 외부 공급업체를 등록하면(`routes/supplier-directory.js:1012-1057`) 활성 계약이 자동 생성되지만 `payment_terms` 없음. `payment_terms` 를 쓰는 곳은 공급업체 쪽 라우트뿐(`routes/supplier.js:1312, 1472`). `VALID_INVOICE_CYCLES`(supplier-directory.js:122) 선언만, 미사용. `supplier_companies` 에 결제주기 칸 없음(`billing_cycle` L148 은 플랫폼 구독용).
- 외부 청구서 흐름: 수령 → `issueTradeInvoiceAfterCommit`(purchaseOrderService L334) → `createTradeInvoice`, 외부·조건 없음이면 `due_date=null`(L172). 업로드는 **발주 행**에 `external_invoice_url`(purchase-orders-workflow L627). 대조 `POST /purchase-orders/:id/reconcile`(total_only, cost-reconciliation L161) → `reconcileInvoiceSync` 가 'Supplier invoice difference' 줄 + `modification_history`(PURCHASE_ORDER_SYSTEM §8-6·§8-7). 결제 체크 `mark-paid-external`(invoices-payment L318) → 연결 발주 있으면 `recordPayment`(발주·청구서 paid + 현금이면 시프트 출금, L360-392).
- 받는 쪽 화면: RA InvoicesPage 는 `parentSoaInvoiceId||payViaSoa` 면 Pay 숨기고 «Pay via SOA»(L1343, L1363). Owner·BG·FG 화면은 `issuerIsExternal`(Mark paid) / Pay 두 갈래만, SOA 자식 Pay 숨김 분기 없음(서버 `blockPayViaSoa` 는 막음).
- 공급업체 SOA 결제 라우트 `POST /purchase-invoices/soa/:supplierCompanyId/pay`(purchase-invoices L251) — monthly_soa 계약 필요.

### 운영 실측 (읽기 전용, 2026-10-07)
- 외부 공급업체 발주가 있는 업체 24곳. 상위: TaiYangFresh(#63) 8건(업로드 5) · Guan Kee Poultry(#67) 7(업로드 5) · Lee's Fandbee Frozen(#60) 6(4) · LSH(#73) 5(3) · Valley Fresh Salad(#44) 5(4) · TaiYang Fresh(#45) 5(0) · EH Foodart(#46) 4 · New Seoul Mart(#76) 3(3) … (같은 이름 두 행: TaiYangFresh #63/#45, LSH #73/#48, New Seoul Mart #76/#28, Direct #52/#13 — 매장별 등록으로 보임)
- 외부 발행자 청구서: trade paid 38 · trade pending_payment 9 · **SOA 0**.
- 어느 업체가 월 SOA 를 보내는지는 데이터에 없다(Irene 만 앎).

### dev 데이터
외부 공급업체 24 · 그 발주 1건 · 외부 발행 trade 0 · 외부 계약 21 전부 payment_terms 없음.

---

## B. 발주 품목 «스탭밀» 구분 + 재고 분리

### Irene 원문 (2026-10-04)
「발주할 때 스탭밀인 것도 항목에 표시할 수 있어? 스탭주문인지 실 비용인지 모르는데. 스탭밀은 재고관리도 따로 해야 하잖아. 안그래? 이거 재고아이템도 스탭밀을 따로 연결해야 할까? 이것도 제대로 fable 설계를 다음 섹션에 받아.」
규칙: 재료·상품·가격 작업은 `docs/TRADE_STRUCTURE.md` 대조, 같은 개념에 새 목록·테이블·자동복제 금지(CLAUDE.md).

### 코드 실측 (dev)
- 발주 줄 `PurchaseOrderItem`: 대상은 `ingredient_id`/`product_ingredient_id`/`product_id`/`brand_product_id` 중 정확히 하나(utils/stockTarget.js) · 자유 글 `description`·`notes` · 용도/분류/비용센터 칸 없음. 헤더 `PurchaseOrder` 도 용도 칸 없음(`payment_method` 에 'personal' 있음).
- 수령 → `services/purchaseOrderReceive.js` `transaction_type:'purchase'` + InventoryBatch(unit_cost) + 매장 가중평균원가(`RestaurantIngredientCost`).
- 재고는 매장×재료 한 줄(`RestaurantIngredientStock` unique(restaurant_id, ingredient_id)) · 위치/창고 개념 없음 · `InventoryTransaction.transaction_type` ENUM: initial, purchase, order_deduct, stock_take, waste, adjustment, return_in, return_out, production (직원 소비 없음) · 거래 행에 금액 칸 없음.
- POS 결제수단 `staffMeal`: 매출 제외(dashboard.js:849-871), 하루 «Staff Meal Settlement»(dashboard.js:606-669, 메뉴가 기준), 품목별 직원 이름. 재고 차감은 일반 판매와 똑같이 레시피로(`inventoryDeductionService` 는 payment_method 를 안 봄).
- 구매 비용 보고서는 `routes/purchase-cost-report.js` 하나 — 판매자 상품·월 기준 집계, 분류/용도 축 없음. 원가율·손익 보고서 없음.

### 운영 실측 (읽기 전용, 2026-10-07) — **이미 «직원식 전용 재료 줄»로 쓰고 있다**
- with MIN Cafe(매장 10)에 이름에 «직원식/Staff» 붙은 재료 **12개**, 전부 `track_stock=1`, 레시피 사용 **0**:
  #204 Staff (적달(직원식)) · #205 staff (큐민가루) · #212 Baba's Meat Curry Powder (카레가루(직원식)) · #213 Staff (녹색달(직원식)) · #848 Halal chicken (chunk cut) (직원식) · #861 Sawah Mas (Staff Meal) (쌀 다른 버전) · #913 Dried India Dhal (달_직원식) · #973 Yakin Chilli Sauce (칠리소스(직원식)) · #981 Eggplant (긴가지(직원식)) · #990 Shallot (미니적양파(직원식)) · #993 Ladies finger ((직원식)) · #994 Green Beans (롱빈(직원식))
- 이 중 카테고리 «Staff Meal»(ingredient_categories #23, 매장 10)에 든 건 **4개**뿐, 나머지 8개는 다른 카테고리.
- 발주에 나온 직원식 줄: #990 8줄 RM23.62 · #848 7줄 RM175.00 · #981 2줄 · #994 2줄 · #993 1줄 · #861 1줄 RM43.00 (공급업체 #63 TaiYangFresh·#67 Guan Kee·#1). 
- POS 스탭밀 결제 주문: 매장 5·13·16·25 에 1~6건(매장 10 은 0).
- TRADE_STRUCTURE.md:579·596·706 — «Staff Meal» 은 매장 쪽에만 있는 카테고리 5개 중 하나(브랜드 14개 분류엔 없음).

---

## C. 승인 메일 문구 — 팀원이 이미 수정함 (판단 개입 없는 문구 분기, 사실 보고)
- 원인: `services/poNotifications.js fireBuyerConfirmNotification` / `fireOwnerApprovalResultNotification` 이 판매자 종류와 상관없이 «has been sent to {{seller}}» / «approved and sent to the seller». 외부 공급업체는 시스템이 보내지 않는다(화면은 이미 `justApprovedExternal` «앱을 안 쓰는 공급업체 — WhatsApp·PDF·이메일로 보내세요»).
- 수정: 판정은 기존 단일 소스 `utils/sellerNames.isExternalSeller`(화면 `is_external` 과 같은 것) · 외부면 `po.buyerConfirm.*External` 키(제목 «보낼 준비 완료» · 본문 «아직 보내지 않았습니다» · 상태 «아직 안 보냄» · 안내 «WhatsApp·PDF·이메일로 보내 주세요») · 승인 결과 메일 `bodyApprovedExternal` · 4언어. 가입 판매자·브랜드는 기존 문구 그대로.
- 검증: 실제 dev 발주(외부 PO-R5-20260622-014 · 가입 공급업체 PO-R5-20260623-001 · 브랜드 ZZ-HC-Q6-995011)로 함수 실행, 발송 함수만 가로채 4언어 렌더 확인 24/24 · 고장주입(외부 판정 끔 → 외부 8건 FAIL) → 원복 통과 · health-check 306/306 · print-guard 8/8.
- diff: `dev-backend/services/poNotifications.js`(+13) · `dev-backend/utils/notificationTemplates.js`(분기) · `dev-backend/locales/{en,ko,zh,ms}/email.json`(키 추가만).

## 게이트 상태 (사실)
- `check-sensitive-diff` 가 «대상»으로 찍는 파일은 앞 방(결제 설정 = 계정 하나)의 것뿐(BrandPaymentSettingsPage · migrate-brand-account-payment-settings · health-check · inspection) — 그 방은 Fable 2회차 PASS, 마커 지문 16d2d5f28a09. 위 C 수정이 작업트리에 더해져 지문이 cc6c3aca3ef8 로 바뀌어 마커 무효. C 파일들은 비대상(일반 변경).
- 작업트리에 다른 방(판매자 배송 지역, 0ec1e1c3 — 답 기다림 중)의 문서 변경도 있음(session-state·TRADE_STRUCTURE 1줄·fable 입력/판정 파일).
