# Fable 설계 — 발주 배송비: 판매자 수정 창 금액 표시 · 판매자 «배송비 없이» · 구매자 «셀프픽업» (2026-11-20)

(작업방 a8dd4b40 · Fable 설계 보고 원문의 결정·범위·검증 부분을 옮김)

## 0. 원인 판정
1. 수정 창 화면 버그 — `amendOriginalTotal`(배송비 포함 total_amount) 과 `amendNewSubtotal`(품목 합계)을 «Items total 앞 → 뒤» 로 나란히 놓음. `amendExceeds` 도 같은 비교 → 서버(`TOTAL_EXCEEDS`)와 기준이 달라짐.
2. 판매자가 배송비를 뺄 길 없음. 3. 셀프픽업 개념 없음.

## 1. 결정
| # | 결정 |
|---|---|
| D1 | 발주에 `delivery_method`('delivery'/'pickup', STRING) · `delivery_fee_waived`(BOOLEAN). ENUM 아님 |
| D2 | 0 처리는 `computeTotalsWithDelivery` 한 곳. 픽업이거나 면제면 0, 둘 다면 픽업 |
| D3 | 근거 `rule:'pickup'|'waived_by_seller'`, `rule_without_override`, `fee_without_override` |
| D4 | 픽업 = 구매자만(초안), 면제 = 판매자만(주문 추가·품목 수정). 구매자가 `delivery_fee_waived` 보내도 무시 |
| D5 | 구매자 픽업 선택은 장바구니·발주 대기. 제출 뒤 변경 불가 |
| D6 | 픽업 선택은 system_admin 제외 모든 판매자 |
| D7 | 판매자 창 미리보기 = 서버가 유효 배송 조건 주고 화면이 utils/deliveryFee.ts 로 계산 |
| D8 | 수정 창 3줄(품목 합계·배송비·주문 총액), 인상 판정 총액끼리 |
| D9 | 서버 TOTAL_EXCEEDS 응답의 total_before/after 로 확인 창 |
| D10 | 면제는 이후 재계산에서도 유지. 다시 켜면 confirm_increase + 오너 승인 게이트 그대로 |
| D11 | 범위 밖: 판매자별 «픽업 안 받음» · 정기 발주 픽업 · BulkOrderModal 선택 칸 · 제출 뒤 방식 변경 |
| D12 | 불변: 출고 뒤 정정·retroApplyPrice 배송비 그대로 · 인쇄 보호파일 무접촉 |

## 2~5. 바뀌는 곳
- DB: 모델 2칸 · `scripts/migrate-po-delivery-method.js`(멱등) · 레지스트리 deploy · docs/PURCHASE_ORDER_SYSTEM.md 단락
- 백엔드: `utils/purchaseOrderTotals.js`(resolveSellerDeliveryTerms 추출 + 덮어쓰기) · `purchase-orders-crud.js`(createPurchaseOrderCore 별도 인자 deliveryFeeWaived · payload delivery_method · 초안 합치기 나중 선택 · PUT delivery_method 초안만 / DELIVERY_METHOD_LOCKED) · `seller-orders.js`(POST / waive · amend waive boolean 때만 · amendable-products·sellable-products delivery · 이력 meta · 구매자 메일 배송비 줄) · 발주서 HTML(Self-pickup 줄·꼬리표) · 판매자 새 주문 메일 픽업 한 줄
- 프론트: deliveryFee.ts effectiveDeliveryFee · IncomingOrdersView(3줄·체크·목록 incl. delivery·Self-pickup) · NewPurchaseOrderPage(묶음 체크·delivery_method 항상 명시) · PurchaseOrderStagingPage(카드 배송비 줄·체크 PUT) · PurchaseOrderDetailPage(꼬리표) · 4언어 + glossary

## 6. 검증 사례
U1~U7(jest) · V1~V14(실호출) · F1~F3(고장주입) · S1~S6(화면) — 설계 원문 그대로.
