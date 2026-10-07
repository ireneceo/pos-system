# Fable 입력 — 판매자 배송 지역별 설정 (2026-10-07 · 팀원 실측 사실만)

## Irene 원문
- 2026-10-05: «그리고 배송은 지역별로 달라야 하는데 왜 지역표시가 그냥 텍스트야? 이건 나중에 레스토랑처럼 추가해서 세팅하게 해야 해.»
- (참고, 이전) 2026-09-28: «배송지역은 자동계산하는 것도 아니고 주문하는 사람이 설정한 거랑 매칭만 하는 건데 복잡해? 왜 안해? GIT은 우리인데 다른 공급업체는 어떻게 사용해? 이 솔루션을. 그냥 범위 정해진대로 선택하면 그 주소가 배송지로 저장하고 공유만 되면 되는 거 아니야? 어떤 가격 조치도 필요없지 왜냐하면 그냥 배송 가능지역이니까. 레스토랑처럼 지역마다 가격기준 넣더라도 고정배송비 넣게 하면 되는 거 아니야? 무료배송 금액만 고정하고? 아니면 그냥 지역설정은 기본 정보로만 하고 배송비는 통합으로 하던 이 중 가장 간단한 방법을 추천해.»
- (참고) 2026-09-25: «배송비 fable에게 정의해 보통 얼마 이상 무료, 지역 설정도 있는데 이거 레스토랑에 모바일 오더에 있는 거 가져다 쓸 수 있어?»
- 작업기록 지시: «6. 판매자 배송 지역별 설정 — 설계부터»

## 지난 Fable 판정 (문서)
- `docs/TRADE_STRUCTURE.md` ⑦ (배송비 2026-09-17 확정 · §5 2026-09-25 재확인 · 2026-09-28 지역 = 자유 텍스트 `delivery_policy`)
- `.claude/fable-verdict-20260928.md` §3 — 지역별 배송비를 뺀 이유: ①구매자가 제일 싼 지역을 고를 수 있음 ②판매자 정정은 «구매자 승인 금액 초과 금지» 잠금에 막힘 ③배송비 적은 판매자 0곳. «나중에 PJ 밖 매장이 생기면 그때 지역별로 넓힘(칸은 그대로)». 09-25 판정의 예상 모양: `delivery_zones` JSON `[{name, fee, states[]}]` + 구매자 주소 state 자동 매칭 + 실패 시 `delivery_fee` 폴백, 계산은 한 곳.

## 코드 실측 (dev, 2026-10-07)
- 배송비 계산 단일 자리: `dev-backend/utils/purchaseOrderTotals.js` — `computeDeliveryFee(subtotal, terms{delivery_fee,min_order_amount,currency}, {orderCurrency})`, `computeTotalsWithDelivery(items, seller{seller_type,seller_entity_id}, opts)` 가 `utils/sellerNames.js resolveSellers` 로 판매자 행을 읽음. 화면 사본 `dev-frontend/src/utils/deliveryFee.ts`.
- `computeTotalsWithDelivery` 호출 7곳: purchase-orders-crud.js 1041·1130·1365 / seller-orders.js 1286(판매자 정정 — 총액이 구매자 승인액 넘으면 `TOTAL_EXCEEDS` 400) / purchase-orders-workflow.js 522·1500·1554. 이 함수는 지금 **구매자(매장)를 모른다** — 판매자만 받는다(po 객체는 넘어오므로 buyer 정보는 po 에 있음).
- 판매자 칸(3종 같은 이름): `Brand`·`Foodcourt`·`SupplierCompany` 의 `min_order_amount` · `delivery_fee` · `delivery_policy`(TEXT 안내). 화면: BrandPaymentSettingsPage · FoodcourtPaymentSettingsPage · SupplierCompanyInfoPage · 외부공급업체 SupplierDirectoryPage.
- 판매자 결제·배송 설정은 오늘(10-07) «계정 하나»로 묶임 — `utils/brandAccountSettings.js` 가 같은 주인 브랜드 전부에 배송 3칸 포함 6칸을 펼쳐 저장(개발서버만, 운영 배포 대기).
- 판매자↔매장 «쌍» 단위 거래조건 자리가 이미 있음(판매자가 매장마다 적는 곳):
  - 브랜드→매장 `restaurants.brand_billing_terms` JSON (`routes/entity-billing.js:184`), 푸드코트→매장 `restaurants.foodcourt_billing_terms` JSON
  - 가입 공급업체→매장 `supplier_contracts.payment_terms` JSON (`routes/supplier.js:1490`)
  - 외부 공급업체: 계약 없음(구매자 매장이 직접 등록·관리하는 업체, 판매자는 사용자 아님)
- 매장 모바일오더 배달 설정(재사용 후보로 Irene 언급): `restaurants.operation_settings.deliveryPricing = {enabled, minimumOrder, freeAbove, zones:[{id,name,description,fee}]}` — 화면 `pages/Settings/SettingsPage.tsx` «Add Delivery Zone»(이름·설명·배송비), **손님이 결제 때 zone 을 고른다**(주소 매칭 없음). 방향: 매장이 파는 쪽.
- 발주 배송지: `purchase_orders.delivery_address` TEXT — 생성 시 매장 `delivery_address || address` 를 글로 복사(crud.js:757). 구조화된 state 칸 없음.
- 매장 주소 `restaurants.state` 는 자유 입력(dev 실측): null 14 · '' 6 · Selangor 4 · null/null 4 · 'WP' 2 · 'Wilayah Persekutuan' 1 · 'WP Kuala Lumpur' 1 · 'Kuala Lumpur' 1. 같은 곳이 4가지로 적혀 있음.

## 데이터 실측
- dev: 공급업체 35곳 중 delivery_fee 적은 곳 0 · delivery_policy 2곳. 브랜드·푸드코트 배송칸 적은 곳 0. 발주 248건 중 배송비>0 은 2건(공급업체).
- 운영: 2026-09-27 Irene 지시로 GIT 브랜드(with MIN #1·K-DINE #2)에 «300 이상 무료 · 미만 10» 입력됨(09-28 판정문 기준). 운영 지금 값은 **확인 못 함**(운영 읽기 조회 권한 거부 이력 · 이번엔 조회 안 함). 운영 실거래 판매자(GIT) 구매 매장은 PJ(Petaling Jaya) 주변.

## 기계적 제약
- 운영 배포·운영 DB 쓰기 금지(Irene 지시 전). 🔒 인쇄 보호파일 8개·KDS 무접촉. ENUM expand-only. 새 개념에 새 목록 금지 규칙(`docs/TRADE_STRUCTURE.md`).
- 이번 사안 Fable 호출 한도: 설계 1회 + 게이트 1회.
